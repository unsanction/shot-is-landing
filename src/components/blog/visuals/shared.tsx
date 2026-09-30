import { createContext, useContext, type CSSProperties, type ReactNode } from 'react';
import type { BlogVisual, VisualTone } from '../../../data/blogVisuals';

export type VisualProps<K extends BlogVisual['kind']> = {
  spec: Extract<BlogVisual, { kind: K }>;
  reduced: boolean;
};

/**
 * The few words drawn inside the figures themselves. Everything else comes from
 * the scene spec, which the post author writes in the post's language; these are
 * the fixed axis and state labels a Spanish post would otherwise show in English.
 */
const visualStrings = {
  en: { reference: 'REFERENCE', drift: 'DRIFT →', kept: 'KEPT', generated: 'GENERATED', locked: 'LOCKED', attention: 'ATTENTION HELD' },
  es: { reference: 'REFERENCIA', drift: 'DERIVA →', kept: 'SE QUEDAN', generated: 'GENERADOS', locked: 'FIJADO', attention: 'ATENCIÓN RETENIDA' },
} as const;

export type VisualLang = keyof typeof visualStrings;

/** Provided once by the article so no visual needs a `lang` prop threaded through. */
export const VisualLangContext = createContext<VisualLang>('en');

export const useVisualStrings = () => visualStrings[useContext(VisualLangContext)];

export const INK = '#17130e';
export const ACCENT = '#ff1100';

export const toneColor = (tone: VisualTone | undefined) =>
  tone === 'accent' ? ACCENT : tone === 'muted' ? 'rgba(23,19,14,0.32)' : INK;

/**
 * Per-item slice of the section's scroll progress.
 *
 * Every visual animates off one inherited `--p`, so staggering has to happen in
 * CSS rather than JS. `--lp` is item `i`'s own 0→1 window carved out of `--p`
 * split `n` ways — item 0 finishes before item 1 starts moving. `--hold` keeps
 * the whole set from starting until `--p` clears a threshold, used where a visual
 * needs a beat before it begins.
 */
export const step = (i: number, n: number, extra?: CSSProperties): CSSProperties =>
  ({ '--i': i, '--n': n, ...extra }) as CSSProperties;

/** Deterministic pseudo-random in [0,1) — keeps SSR and client markup identical. */
export const jitter = (seed: number) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

/** Mono label baked into the SVG so it scales with the drawing. */
export function Label({
  x,
  y,
  children,
  anchor = 'start',
  tone = 'ink',
  size = 11,
  style,
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: 'start' | 'middle' | 'end';
  tone?: 'ink' | 'accent' | 'muted';
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className="bx-label"
      style={{ fontSize: size, fill: tone === 'accent' ? ACCENT : INK, opacity: tone === 'muted' ? 0.45 : 0.8, ...style }}
    >
      {children}
    </text>
  );
}

/** Two-digit counter used to number stages, frames and candidates. */
export const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Formats a counting value in the shape of its final display string, so
 * "$31,000" counts as "$4,120" and "3.4×" counts as "1.7×" without every spec
 * having to carry a format descriptor.
 *
 * Only counts when the display's number *is* the value. A display like
 * "~3 weeks" charted at value 21 (days) is a label, not a number to animate —
 * reshaping 21 into it printed "~21weeks". Those render the display verbatim.
 */
export const formatLike = (value: number, display: string, target: number) => {
  const match = display.match(/\d[\d.,]*/);
  if (!match || Number(match[0].replace(/,/g, '')) !== target) return display;
  if (value === target) return display;
  const core = match[0];
  const prefix = display.slice(0, match.index);
  const suffix = display.slice((match.index ?? 0) + core.length);
  const decimals = (core.split('.')[1] ?? '').length;
  const fixed = value.toFixed(decimals);
  const body = core.includes(',') ? Number(fixed).toLocaleString('en-US', { minimumFractionDigits: decimals }) : fixed;
  return `${prefix}${body}${suffix}`;
};

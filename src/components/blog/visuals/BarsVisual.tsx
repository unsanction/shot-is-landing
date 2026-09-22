import { INK, Label, formatLike, step, toneColor, type VisualProps } from './shared';
import { useId } from 'react';
import { useCountUp } from '../../../hooks/useSceneDriver';

const PAD = 20;
const TRACK_X = 150;
const TRACK_W = 330;
const BAR_H = 20;

/**
 * Comparative bars. The numbers count up once on entry rather than tracking scroll
 * position, because a figure that ticks backwards when you scroll up reads as a
 * bug rather than as an animation.
 */
export function BarsVisual({ spec, reduced }: VisualProps<'bars'>) {
  // Pattern ids are document-global, so two bar charts on one page would share fills.
  const hatchId = `bx-hatch-${useId().replace(/:/g, '')}`;
  const values = spec.series.map((s) => s.value);
  const { ref, shown } = useCountUp<SVGSVGElement>(values, reduced);
  const max = Math.max(...values, 1);
  const pitch = spec.series.some((s) => s.note) ? 62 : 48;
  const height = PAD * 2 + spec.series.length * pitch + (spec.unit || spec.note ? 40 : 0);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 520 ${height}`}
      className="bx-svg"
      role="img"
      aria-label={spec.series.map((s) => `${s.label}: ${s.display}`).join('; ')}
    >
      {spec.series.map((s, i) => {
        const y = PAD + i * pitch;
        const w = Math.max(3, (s.value / max) * TRACK_W);
        const color = toneColor(s.tone);

        return (
          <g key={i} className="bx-step" style={step(i, spec.series.length)}>
            <text x={PAD} y={y + BAR_H - 5} className="bx-body" style={{ fontSize: 13, fill: INK, fontWeight: 700 }}>
              {s.label}
            </text>

            <rect x={TRACK_X} y={y} width={TRACK_W} height={BAR_H} rx={2} fill={INK} fillOpacity={0.05} />
            <rect
              x={TRACK_X}
              y={y}
              width={w}
              height={BAR_H}
              rx={2}
              fill={color}
              fillOpacity={s.tone === 'accent' ? 1 : 0.78}
              className="bx-bars__fill"
            />
            {/* Hatching on the accent bar so the two series stay apart in print and greyscale. */}
            {s.tone === 'accent' ? (
              <rect x={TRACK_X} y={y} width={w} height={BAR_H} rx={2} fill={`url(#${hatchId})`} className="bx-bars__fill" />
            ) : null}

            <text
              x={520 - PAD}
              y={y + BAR_H - 5}
              textAnchor="end"
              className="bx-label"
              style={{ fontSize: 13, fill: color, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}
            >
              {formatLike(shown[i] ?? s.value, s.display)}
            </text>

            {s.note ? (
              <Label x={TRACK_X} y={y + BAR_H + 15} size={10} tone="muted">
                {s.note}
              </Label>
            ) : null}
          </g>
        );
      })}

      <defs>
        <pattern id={hatchId} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#ffffff" strokeOpacity="0.24" strokeWidth="2" />
        </pattern>
      </defs>

      {spec.unit || spec.note ? (
        <>
          <line x1={PAD} y1={height - 32} x2={520 - PAD} y2={height - 32} stroke={INK} strokeOpacity={0.12} />
          {spec.unit ? (
            <Label x={PAD} y={height - 14} size={10} tone="muted">
              {spec.unit}
            </Label>
          ) : null}
          {spec.note ? (
            <Label x={520 - PAD} y={height - 14} size={10} anchor="end" tone="accent" style={{ opacity: 1, fontWeight: 700 }}>
              {spec.note}
            </Label>
          ) : null}
        </>
      ) : null}
    </svg>
  );
}

import { useId, type CSSProperties } from 'react';
import { ACCENT, INK, Label, pad, step, type VisualProps } from './shared';

const PHONE_X = 322;
const PHONE_Y = 14;
const PHONE_W = 178;
const PHONE_H = 382;
const SCREEN_X = PHONE_X + 8;
const SCREEN_Y = PHONE_Y + 8;
const SCREEN_W = PHONE_W - 16;
const SCREEN_H = PHONE_H - 16;
const CARD_H = 76;
const PITCH = 84;
/** Fraction of section progress spent scrolling before the thumb stops. */
const STOP_AT = 0.55;

/**
 * A feed being thumbed past until something earns the stop. The phone scrolls
 * with the section and then *stops moving* at the hook card while the attention
 * meter keeps filling — the two-second argument, staged rather than stated.
 */
export function FeedVisual({ spec }: VisualProps<'feed'>) {
  // Unique per instance: the sticky stage and the mobile figures can both be in the
  // document, and a shared clip id would have one phone clipping to the other's screen.
  const clipId = `bx-feed-${useId().replace(/:/g, '')}`;
  const travel = (SCREEN_H - CARD_H) / 2 - spec.stopAt * PITCH;

  return (
    <svg
      viewBox="0 0 520 420"
      className="bx-svg"
      role="img"
      aria-label={`A feed stopping on: ${spec.cards[spec.stopAt]?.label}`}
      // `--stop` lives on the root so the meter and the thumb, which sit outside the
      // scrolling strip, share the same idea of when the thumb stopped.
      style={{ '--stop': STOP_AT } as CSSProperties}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x={SCREEN_X} y={SCREEN_Y} width={SCREEN_W} height={SCREEN_H} rx={18} />
        </clipPath>
      </defs>

      {/* Left column: the same feed as a list, so the labels are actually readable. */}
      {spec.cards.map((card, i) => {
        const y = 24 + i * 46;
        const isHook = i === spec.stopAt;
        return (
          <g key={i} className="bx-step" style={step(i, spec.cards.length)}>
            {/* Drawn first: the flag is a background, and painting it over the row
                number hid the digit behind its accent edge. */}
            {isHook ? (
              <g className="bx-feed__flag">
                <rect x={16} y={y - 6} width={270} height={30} rx={3} fill={ACCENT} fillOpacity={0.08} />
                <rect x={16} y={y - 6} width={3} height={30} fill={ACCENT} />
              </g>
            ) : null}
            <Label x={26} y={y + 14} size={9} tone="muted">
              {pad(i + 1)}
            </Label>
            <text
              x={52}
              y={y + 15}
              className="bx-body"
              style={{ fontSize: 13, fill: isHook ? ACCENT : INK, fontWeight: isHook ? 800 : 600, opacity: isHook ? 1 : 0.55 }}
            >
              {card.label}
            </text>
            <line x1={20} y1={y + 28} x2={286} y2={y + 28} stroke={INK} strokeOpacity={0.1} />
          </g>
        );
      })}

      {/* Attention meter — only starts once the thumb has stopped. */}
      <g className="bx-feed__meter">
        <Label x={20} y={402} size={9} tone="muted">
          {spec.meterLabel ?? 'ATTENTION HELD'}
        </Label>
        <rect x={20} y={408} width={266} height={6} rx={3} fill={INK} fillOpacity={0.08} />
        <rect x={20} y={408} width={266} height={6} rx={3} fill={ACCENT} className="bx-feed__meter-fill" />
      </g>

      <rect x={PHONE_X} y={PHONE_Y} width={PHONE_W} height={PHONE_H} rx={26} fill="#ffffff" stroke={INK} strokeOpacity={0.3} strokeWidth={2} />
      <rect x={PHONE_X + 62} y={PHONE_Y + 3} width={54} height={5} rx={2.5} fill={INK} fillOpacity={0.25} />

      <g clipPath={`url(#${clipId})`}>
        <rect x={SCREEN_X} y={SCREEN_Y} width={SCREEN_W} height={SCREEN_H} rx={18} fill={INK} fillOpacity={0.035} />
        <g className="bx-feed__strip" style={{ '--travel': travel } as CSSProperties}>
          {spec.cards.map((_, i) => {
            const y = SCREEN_Y + i * PITCH;
            const isHook = i === spec.stopAt;
            return (
              <g key={i}>
                <rect
                  x={SCREEN_X + 10}
                  y={y}
                  width={SCREEN_W - 20}
                  height={CARD_H}
                  rx={4}
                  fill="#ffffff"
                  stroke={INK}
                  strokeOpacity={0.14}
                />
                {/* Abstract card art — a frame with a subject, not a placeholder box. */}
                <line x1={SCREEN_X + 22} y1={y + CARD_H - 22} x2={SCREEN_X + SCREEN_W - 32} y2={y + CARD_H - 22} stroke={INK} strokeOpacity={0.18} />
                <circle cx={SCREEN_X + 46} cy={y + CARD_H - 40} r={11} fill="none" stroke={INK} strokeOpacity={0.3} strokeWidth={1.3} />
                <rect x={SCREEN_X + 70} y={y + CARD_H - 48} width={62} height={5} rx={2.5} fill={INK} fillOpacity={0.18} />
                <rect x={SCREEN_X + 70} y={y + CARD_H - 37} width={40} height={5} rx={2.5} fill={INK} fillOpacity={0.12} />
                {isHook ? (
                  <rect
                    x={SCREEN_X + 10}
                    y={y}
                    width={SCREEN_W - 20}
                    height={CARD_H}
                    rx={4}
                    fill="none"
                    stroke={ACCENT}
                    strokeWidth={2}
                    className="bx-feed__hook"
                  />
                ) : null}
              </g>
            );
          })}
        </g>
      </g>

      {/* Thumb: rides the scroll, lifts off once the hook lands. */}
      <g className="bx-feed__thumb">
        <rect x={PHONE_X + PHONE_W - 58} y={PHONE_H - 34} width={30} height={54} rx={15} fill={ACCENT} fillOpacity={0.9} />
        <rect x={PHONE_X + PHONE_W - 58} y={PHONE_H - 34} width={30} height={54} rx={15} fill="none" stroke={INK} strokeOpacity={0.25} />
      </g>
    </svg>
  );
}

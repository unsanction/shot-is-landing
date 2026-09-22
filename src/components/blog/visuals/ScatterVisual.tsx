import type { CSSProperties } from 'react';
import { ACCENT, INK, Label, jitter, step, type VisualProps } from './shared';

const FIELD_X = 34;
const FIELD_W = 452;
const FIELD_Y = 118;
const FIELD_H = 216;
const SHELF_Y = 66;

/**
 * The volume argument: fire a lot, keep a few. Every attempt lands in the field,
 * then the winners lift onto the shelf — which is also the honest version of the
 * story, because the losers stay on screen instead of being quietly cropped out.
 */
export function ScatterVisual({ spec }: VisualProps<'scatter'>) {
  const winners = new Set(spec.winners);
  const shelfSlots = spec.winners.length;
  const shelfX = (k: number) => FIELD_X + 40 + ((FIELD_W - 80) / Math.max(1, shelfSlots - 1 || 1)) * (shelfSlots === 1 ? 0.5 : k);

  // Positions are seeded rather than random so the server and the client agree on
  // every dot, and so a rebuild does not silently reshuffle the figure.
  const dots = Array.from({ length: spec.total }, (_, i) => {
    const cols = Math.ceil(Math.sqrt(spec.total * 1.9));
    const rows = Math.ceil(spec.total / cols);
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = FIELD_X + 22 + (col + 0.5 + (jitter(i + 3) - 0.5) * 0.7) * ((FIELD_W - 44) / cols);
    const y = FIELD_Y + 16 + (row + 0.5 + (jitter(i + 91) - 0.5) * 0.7) * ((FIELD_H - 32) / rows);
    return { x, y };
  });

  let slot = 0;

  return (
    <svg viewBox="0 0 520 400" className="bx-svg" role="img" aria-label={`${spec.winners.length} winners out of ${spec.total} attempts`}>
      <line x1={FIELD_X} y1={SHELF_Y + 20} x2={FIELD_X + FIELD_W} y2={SHELF_Y + 20} stroke={INK} strokeOpacity={0.22} />
      <Label x={FIELD_X} y={SHELF_Y - 16} size={9} tone="accent" style={{ opacity: 1, fontWeight: 700 }}>
        KEPT
      </Label>
      <Label x={FIELD_X} y={FIELD_Y + 2} size={9} tone="muted">
        GENERATED
      </Label>
      <rect
        x={FIELD_X}
        y={FIELD_Y + 10}
        width={FIELD_W}
        height={FIELD_H}
        rx={3}
        fill={INK}
        fillOpacity={0.025}
        stroke={INK}
        strokeOpacity={0.09}
      />

      {dots.map((dot, i) => {
        const isWinner = winners.has(i);
        const target = isWinner ? { x: shelfX(slot++), y: SHELF_Y + 20 } : null;
        return (
          <g
            key={i}
            className={isWinner ? 'bx-step bx-scatter__dot bx-scatter__dot--win' : 'bx-step bx-scatter__dot'}
            style={
              {
                ...step(i, spec.total),
                '--dx': target ? target.x - dot.x : 0,
                '--dy': target ? target.y - dot.y : 0,
              } as CSSProperties
            }
          >
            <g style={{ transform: `translate(${dot.x}px, ${dot.y}px)` }}>
              <g className="bx-scatter__move">
                {isWinner ? (
                  <>
                    <circle r={10} fill="none" stroke={ACCENT} strokeWidth={1.4} className="bx-scatter__halo" />
                    <circle r={5.5} fill={ACCENT} />
                  </>
                ) : (
                  <circle r={4.5} fill={INK} fillOpacity={0.32} />
                )}
              </g>
            </g>
          </g>
        );
      })}

      {spec.note ? (
        <Label x={FIELD_X} y={FIELD_Y + FIELD_H + 38} size={10} tone="muted">
          {spec.note}
        </Label>
      ) : null}
      <Label x={FIELD_X + FIELD_W} y={FIELD_Y + FIELD_H + 38} size={10} anchor="end" tone="accent" style={{ opacity: 1, fontWeight: 700 }}>
        {spec.winners.length}/{spec.total}
      </Label>
    </svg>
  );
}

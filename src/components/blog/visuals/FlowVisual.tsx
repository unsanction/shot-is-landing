import { ACCENT, INK, Label, pad, step, type VisualProps } from './shared';

const ROW = 52;
const GAP = 12;
const PAD = 18;
const RAIL_X = 58;
const BOX_X = 78;
const BOX_W = 420;

/**
 * An ordered pipeline read top to bottom, with a token descending the rail as the
 * section scrolls. Gate stages get a rejection loop drawn back to the stage above
 * them, which is the whole point of the diagram for our process posts: the work
 * is not a straight line, it is a line with a place where things get thrown away.
 */
export function FlowVisual({ spec }: VisualProps<'flow'>) {
  const n = spec.steps.length;
  const height = PAD * 2 + n * ROW + (n - 1) * GAP;
  const rowY = (i: number) => PAD + i * (ROW + GAP);
  const midY = (i: number) => rowY(i) + ROW / 2;
  const railTop = midY(0);
  const railLen = midY(n - 1) - railTop;
  const firstGate = spec.steps.findIndex((s) => s.gate);

  return (
    <svg viewBox={`0 0 520 ${height}`} className="bx-svg" role="img" aria-label={spec.steps.map((s) => s.label).join(' → ')}>
      <line x1={RAIL_X} y1={railTop} x2={RAIL_X} y2={midY(n - 1)} stroke={INK} strokeOpacity={0.16} strokeWidth={2} />
      <line
        x1={RAIL_X}
        y1={railTop}
        x2={RAIL_X}
        y2={midY(n - 1)}
        stroke={ACCENT}
        strokeWidth={2}
        pathLength={1}
        className="bx-draw"
      />

      {spec.steps.map((s, i) => {
        const y = rowY(i);
        return (
          <g key={i} className="bx-step" style={step(i, n)}>
            <circle cx={RAIL_X} cy={midY(i)} r={5} fill="#faf7f1" stroke={INK} strokeOpacity={0.3} strokeWidth={2} />
            <circle cx={RAIL_X} cy={midY(i)} r={5} fill={ACCENT} className="bx-step__lit" />

            <rect
              x={BOX_X}
              y={y}
              width={BOX_W}
              height={ROW}
              rx={3}
              fill="#ffffff"
              stroke={INK}
              strokeOpacity={0.14}
              strokeWidth={1}
            />
            <rect x={BOX_X} y={y} width={3} height={ROW} fill={ACCENT} className="bx-step__bar" />
            <rect
              x={BOX_X}
              y={y}
              width={BOX_W}
              height={ROW}
              rx={3}
              fill="none"
              stroke={s.gate ? ACCENT : INK}
              strokeOpacity={s.gate ? 1 : 0.34}
              strokeWidth={s.gate ? 1.5 : 1}
              strokeDasharray={s.gate ? '5 4' : undefined}
              className="bx-step__ring"
            />

            <Label x={BOX_X + 18} y={s.note ? y + 22 : y + 31} size={10} tone="muted">
              {pad(i + 1)}
            </Label>
            <text
              x={BOX_X + 46}
              y={s.note ? y + 23 : y + 32}
              className="bx-body"
              style={{ fontSize: 14, fill: INK, fontWeight: 700 }}
            >
              {s.label}
            </text>
            {s.note ? (
              <Label x={BOX_X + 46} y={y + 40} size={10} tone="muted">
                {s.note}
              </Label>
            ) : null}
          </g>
        );
      })}

      {/* Rejection loop: only drawn for the first gate, because two of them turn the
          diagram into spaghetti and the reader has already got the idea. */}
      {firstGate > 0 && spec.loopLabel ? (
        <g className="bx-flow__loop">
          <path
            d={`M ${BOX_X - 4} ${midY(firstGate)} C ${BOX_X - 44} ${midY(firstGate)}, ${BOX_X - 44} ${midY(firstGate - 1)}, ${BOX_X - 8} ${midY(firstGate - 1)}`}
            fill="none"
            stroke={ACCENT}
            strokeWidth={1.5}
            strokeDasharray="4 3"
            pathLength={1}
            className="bx-draw bx-draw--late"
          />
          <path
            d={`M ${BOX_X - 8} ${midY(firstGate - 1)} l -7 -4 l 0 8 z`}
            fill={ACCENT}
            className="bx-flow__arrow"
          />
          <Label x={BOX_X - 52} y={(midY(firstGate) + midY(firstGate - 1)) / 2 + 4} size={9} anchor="end" tone="accent">
            {spec.loopLabel}
          </Label>
        </g>
      ) : null}

      {/* The travelling token — a diamond so it reads as a unit of work, not a dot. */}
      <g className="bx-flow__token" style={{ '--rail': railLen } as React.CSSProperties}>
        <rect x={RAIL_X - 6} y={railTop - 6} width={12} height={12} fill={ACCENT} transform={`rotate(45 ${RAIL_X} ${railTop})`} />
      </g>
    </svg>
  );
}

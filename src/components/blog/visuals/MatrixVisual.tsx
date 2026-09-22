import { ACCENT, INK, Label, step, type VisualProps } from './shared';

const PAD = 20;
const LABEL_W = 132;
const HEAD_H = 42;
const ROW_H = 40;
const ROW_GAP = 8;

/**
 * Rows × columns strength grid — which tool wins which job. The per-row winner
 * gets the ring rather than the darkest fill, because "best here" and "good here"
 * are different claims and a heatmap alone conflates them.
 */
export function MatrixVisual({ spec }: VisualProps<'matrix'>) {
  const cols = spec.cols.length;
  const cellW = (520 - PAD * 2 - LABEL_W) / cols;
  const height = HEAD_H + spec.rows.length * (ROW_H + ROW_GAP) + (spec.legend ? 44 : 16);

  return (
    <svg
      viewBox={`0 0 520 ${height}`}
      className="bx-svg"
      role="img"
      aria-label={`Comparison of ${spec.rows.map((r) => r.label).join(', ')} across ${spec.cols.join(', ')}`}
    >
      {spec.cols.map((col, c) => {
        const x = PAD + LABEL_W + c * cellW + cellW / 2;
        const words = col.split(' ');
        return (
          <g key={col}>
            {words.length > 1 ? (
              <>
                <Label x={x} y={HEAD_H - 24} size={9} anchor="middle" tone="muted">
                  {words.slice(0, -1).join(' ')}
                </Label>
                <Label x={x} y={HEAD_H - 12} size={9} anchor="middle" tone="muted">
                  {words[words.length - 1]}
                </Label>
              </>
            ) : (
              <Label x={x} y={HEAD_H - 14} size={9} anchor="middle" tone="muted">
                {col}
              </Label>
            )}
          </g>
        );
      })}
      <line x1={PAD} y1={HEAD_H - 4} x2={520 - PAD} y2={HEAD_H - 4} stroke={INK} strokeOpacity={0.2} />

      {spec.rows.map((row, r) => {
        const y = HEAD_H + r * (ROW_H + ROW_GAP);
        const top = Math.max(...row.cells);
        // A tie has no winner: ringing the first of three equal cells would assert
        // a ranking the numbers do not contain.
        const best = row.cells.filter((c) => c === top).length === 1 ? row.cells.indexOf(top) : -1;

        return (
          <g key={r} className="bx-step bx-matrix__row" style={step(r, spec.rows.length)}>
            <text x={PAD} y={y + ROW_H / 2 + 5} className="bx-body" style={{ fontSize: 13, fill: INK, fontWeight: 700 }}>
              {row.label}
            </text>

            {row.cells.map((strength, c) => {
              const x = PAD + LABEL_W + c * cellW;
              const isBest = c === best && strength > 0;
              return (
                <g key={c} className="bx-matrix__cell">
                  <title>{`${row.label} — ${spec.cols[c]}: ${strength}/3`}</title>
                  <rect
                    x={x + 3}
                    y={y}
                    width={cellW - 6}
                    height={ROW_H}
                    rx={2}
                    fill={INK}
                    fillOpacity={0.04}
                    stroke={INK}
                    strokeOpacity={0.1}
                  />
                  <rect
                    x={x + 3}
                    y={y}
                    width={cellW - 6}
                    height={ROW_H}
                    rx={2}
                    fill={ACCENT}
                    fillOpacity={strength === 0 ? 0 : 0.14 + (strength / 3) * 0.7}
                    className="bx-matrix__fill"
                  />
                  {isBest ? (
                    <rect
                      x={x + 3}
                      y={y}
                      width={cellW - 6}
                      height={ROW_H}
                      rx={2}
                      fill="none"
                      stroke={INK}
                      strokeWidth={1.8}
                      className="bx-matrix__best"
                    />
                  ) : null}
                  {/* Strength also printed as pips so the grid survives greyscale. */}
                  <g className="bx-matrix__pips">
                    {[0, 1, 2].map((p) => (
                      <circle
                        key={p}
                        cx={x + cellW / 2 - 8 + p * 8}
                        cy={y + ROW_H / 2}
                        r={2.6}
                        fill={p < strength ? (strength >= 2 ? '#ffffff' : INK) : INK}
                        fillOpacity={p < strength ? (strength >= 2 ? 0.95 : 0.55) : 0.12}
                      />
                    ))}
                  </g>
                </g>
              );
            })}
          </g>
        );
      })}

      {spec.legend ? (
        <Label x={PAD} y={height - 14} size={10} tone="muted">
          {spec.legend}
        </Label>
      ) : null}
    </svg>
  );
}

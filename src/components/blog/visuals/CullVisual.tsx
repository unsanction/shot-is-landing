import { ACCENT, INK, Label, jitter, pad, step, type VisualProps } from './shared';

const COLS = 4;
const GAP = 14;
const PAD = 20;
const TILE_W = (520 - PAD * 2 - GAP * (COLS - 1)) / COLS;
const TILE_H = 84;

/** Mini compositions so a contact sheet reads as footage rather than empty boxes. */
function TileArt({ kind, seed }: { kind: 'frame' | 'face' | 'product'; seed: number }) {
  const a = jitter(seed);
  const b = jitter(seed + 7);

  if (kind === 'face') {
    const cx = TILE_W / 2 + (a - 0.5) * 10;
    return (
      <g stroke={INK} strokeOpacity={0.5} strokeWidth={1.4} fill="none">
        <circle cx={cx} cy={TILE_H * 0.4} r={13 + b * 2} />
        <path d={`M ${cx - 22} ${TILE_H - 6} q 22 -18 44 0`} />
        <circle cx={cx - 5} cy={TILE_H * 0.38} r={1.4} fill={INK} stroke="none" />
        <circle cx={cx + 5} cy={TILE_H * 0.38} r={1.4} fill={INK} stroke="none" />
      </g>
    );
  }

  if (kind === 'product') {
    const w = 20 + a * 6;
    const cx = TILE_W / 2;
    return (
      <g stroke={INK} strokeOpacity={0.5} strokeWidth={1.4} fill="none">
        <rect x={cx - w / 2} y={TILE_H * 0.3} width={w} height={TILE_H * 0.52} rx={4} />
        <rect x={cx - 3} y={TILE_H * 0.18} width={6} height={TILE_H * 0.13} />
        <rect x={cx - w / 2} y={TILE_H * 0.48} width={w} height={11} fill={INK} fillOpacity={0.12} stroke="none" />
      </g>
    );
  }

  const subjectX = TILE_W * (0.3 + a * 0.35);
  return (
    <g stroke={INK} strokeOpacity={0.5} strokeWidth={1.4} fill="none">
      <line x1={6} y1={TILE_H * 0.66} x2={TILE_W - 6} y2={TILE_H * 0.66} />
      <rect x={subjectX} y={TILE_H * 0.66 - (16 + b * 10)} width={14 + a * 8} height={16 + b * 10} />
      <circle cx={TILE_W * 0.8} cy={TILE_H * 0.26} r={6 + b * 3} />
    </g>
  );
}

/**
 * The contact sheet that gets culled. Candidates are struck out one at a time as
 * the section scrolls and the survivor is promoted into a playing clip — the
 * cheap-rejection argument made literal, which is why the reject order puts the
 * keeper last no matter where it sits in the grid.
 */
export function CullVisual({ spec }: VisualProps<'cull'>) {
  const rows = Math.ceil(spec.total / COLS);
  const height = PAD * 2 + rows * TILE_H + (rows - 1) * GAP + 54;
  const tiles = Array.from({ length: spec.total }, (_, i) => i);
  // Rejections run in grid order; the keeper is always the last beat so the
  // survivor is revealed against an already-empty sheet.
  let rejectSeen = 0;
  const order = tiles.map((i) => (i === spec.keep ? spec.total - 1 : rejectSeen++));

  return (
    <svg viewBox={`0 0 520 ${height}`} className="bx-svg" role="img" aria-label={`${spec.total} candidates, one kept`}>
      {tiles.map((i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const x = PAD + col * (TILE_W + GAP);
        const y = PAD + row * (TILE_H + GAP);
        const keeper = i === spec.keep;

        return (
          // Placement lives on the outer group as an SVG attribute and animation on
          // the inner one as a CSS transform — a CSS transform on the same element
          // would replace the attribute outright and stack every tile at the origin.
          <g key={i} transform={`translate(${x} ${y})`}>
            <g
              className={keeper ? 'bx-cull__tile bx-cull__tile--keep' : 'bx-cull__tile'}
              style={step(order[i], spec.total)}
            >
            <g className="bx-cull__body">
              <rect width={TILE_W} height={TILE_H} rx={3} fill="#ffffff" stroke={INK} strokeOpacity={0.16} />
              <TileArt kind={spec.tile ?? 'frame'} seed={i + 1} />
              <Label x={6} y={12} size={8} tone="muted">
                {pad(i + 1)}
              </Label>
            </g>

            {keeper ? (
              <g>
                <rect
                  width={TILE_W}
                  height={TILE_H}
                  rx={3}
                  fill="none"
                  stroke={ACCENT}
                  strokeWidth={2}
                  className="bx-cull__ring"
                />
                <g className="bx-cull__play">
                  <circle cx={TILE_W / 2} cy={TILE_H / 2} r={15} fill={ACCENT} />
                  <path
                    d={`M ${TILE_W / 2 - 4} ${TILE_H / 2 - 7} l 11 7 l -11 7 z`}
                    fill="#ffffff"
                  />
                </g>
                <rect x={8} y={TILE_H - 9} width={TILE_W - 16} height={2.5} rx={1.25} fill={INK} fillOpacity={0.15} />
                <rect
                  x={8}
                  y={TILE_H - 9}
                  width={TILE_W - 16}
                  height={2.5}
                  rx={1.25}
                  fill={ACCENT}
                  className="bx-cull__scrub"
                />
              </g>
            ) : (
              <g className="bx-cull__kill">
                <line x1={8} y1={8} x2={TILE_W - 8} y2={TILE_H - 8} stroke={ACCENT} strokeWidth={1.5} pathLength={1} />
                <line x1={TILE_W - 8} y1={8} x2={8} y2={TILE_H - 8} stroke={ACCENT} strokeWidth={1.5} pathLength={1} />
              </g>
            )}
            </g>
          </g>
        );
      })}

      <line x1={PAD} y1={height - 38} x2={520 - PAD} y2={height - 38} stroke={INK} strokeOpacity={0.12} />
      {spec.rejectNote ? (
        <Label x={PAD} y={height - 20} size={10} tone="muted">
          {spec.rejectNote}
        </Label>
      ) : null}
      {spec.keepNote ? (
        <Label x={520 - PAD} y={height - 20} size={10} anchor="end" tone="accent" style={{ opacity: 1, fontWeight: 700 }}>
          {spec.keepNote}
        </Label>
      ) : null}
    </svg>
  );
}

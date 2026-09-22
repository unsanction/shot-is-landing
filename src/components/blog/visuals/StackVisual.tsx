import { ACCENT, INK, Label, step, type VisualProps } from './shared';

const CX = 150;
const TILE_W = 196;
const TILE_H = 60;
const TOP_CY = 104;
/** Tighten the spacing as layers are added so a seven-item stack still fits the frame. */
const riseFor = (n: number) => Math.min(46, Math.max(24, 252 / Math.max(1, n)));

const rhombus = (cx: number, cy: number, w: number, h: number) =>
  `${cx},${cy - h / 2} ${cx + w / 2},${cy} ${cx},${cy + h / 2} ${cx - w / 2},${cy}`;

/**
 * Constraints stacking into one locked look. Each layer flies in and settles on
 * the one below it, so the argument lands physically: consistency is not one
 * decision, it is a pile of them that has to stay put across every shot.
 *
 * Laid out top-down from a fixed first layer rather than up from a fixed floor,
 * so a three-layer stack and a seven-layer stack both fill their card instead of
 * leaving a block of dead space above the short one.
 */
export function StackVisual({ spec }: VisualProps<'stack'>) {
  const n = spec.layers.length;
  const rise = riseFor(n);
  const showNotes = rise >= 34;
  const baseY = TOP_CY + (n - 1) * rise;
  const height = baseY + TILE_H / 2 + (spec.baseLabel ? 54 : 24);
  const labelX = CX + TILE_W / 2 + 48;

  return (
    <svg
      viewBox={`0 0 520 ${height}`}
      className="bx-svg"
      role="img"
      aria-label={`Locked layers: ${spec.layers.map((l) => l.label).join(', ')}`}
    >
      <polygon points={rhombus(CX, baseY + 14, TILE_W + 26, TILE_H + 8)} fill={INK} fillOpacity={0.05} />
      {spec.baseLabel ? (
        <Label x={CX} y={baseY + 50} size={9} anchor="middle" tone="muted">
          {spec.baseLabel}
        </Label>
      ) : null}

      {spec.layers.map((layer, i) => {
        // Index 0 is the top of the stack, so it lands last and reads as the capstone.
        const cy = baseY - (n - 1 - i) * rise;
        const labelY = cy - 4;
        return (
          <g key={i} className="bx-step bx-stack__layer" style={step(n - 1 - i, n)}>
            <polygon
              points={rhombus(CX, cy, TILE_W, TILE_H)}
              fill="#ffffff"
              stroke={INK}
              strokeOpacity={0.22}
              strokeWidth={1.2}
            />
            <polygon points={rhombus(CX, cy, TILE_W, TILE_H)} fill={ACCENT} fillOpacity={0.1 + (n - 1 - i) * 0.05} />
            {/* Side walls — give the tile thickness so the stack reads as a stack. */}
            <path
              d={`M ${CX - TILE_W / 2} ${cy} L ${CX} ${cy + TILE_H / 2} L ${CX} ${cy + TILE_H / 2 + 7} L ${CX - TILE_W / 2} ${cy + 7} Z`}
              fill={INK}
              fillOpacity={0.1}
            />
            <path
              d={`M ${CX + TILE_W / 2} ${cy} L ${CX} ${cy + TILE_H / 2} L ${CX} ${cy + TILE_H / 2 + 7} L ${CX + TILE_W / 2} ${cy + 7} Z`}
              fill={INK}
              fillOpacity={0.05}
            />

            <line x1={CX + TILE_W / 2 - 6} y1={labelY} x2={labelX - 10} y2={labelY} stroke={INK} strokeOpacity={0.2} />
            <circle cx={labelX - 10} cy={labelY} r={2.5} fill={ACCENT} />
            <text
              x={labelX}
              y={showNotes && layer.note ? labelY + 1 : labelY + 4}
              className="bx-body"
              style={{ fontSize: 12.5, fill: INK, fontWeight: 700 }}
            >
              {layer.label}
            </text>
            {/* Notes are dropped once the stack is tall enough that they would collide. */}
            {showNotes && layer.note ? (
              <Label x={labelX} y={labelY + 15} size={9} tone="muted">
                {layer.note}
              </Label>
            ) : null}
          </g>
        );
      })}

      <g className="bx-stack__lock">
        <rect x={CX - 52} y={TOP_CY - TILE_H / 2 - 40} width={104} height={24} rx={3} fill={ACCENT} />
        <text
          x={CX}
          y={TOP_CY - TILE_H / 2 - 24}
          textAnchor="middle"
          className="bx-label"
          style={{ fontSize: 10, fill: '#ffffff', fontWeight: 800, letterSpacing: '0.18em' }}
        >
          {spec.lockedLabel ?? 'LOCKED'}
        </text>
      </g>
    </svg>
  );
}

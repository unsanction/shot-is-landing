import type { CSSProperties } from 'react';
import { ACCENT, INK, Label, type VisualProps } from './shared';

const X0 = 62;
const X1 = 492;
const Y0 = 300;
const Y1 = 48;

const px = (i: number, n: number) => X0 + (i / Math.max(1, n - 1)) * (X1 - X0);
const py = (v: number) => Y0 - v * (Y0 - Y1);

/**
 * A Catmull-Rom-ish smoothed path. Straight polylines make a five-point series
 * look like a sawtooth; a light smoothing keeps the shape honest without
 * pretending we measured every point in between.
 */
const smooth = (points: number[]) => {
  const n = points.length;
  if (n < 2) return '';
  let d = `M ${px(0, n)} ${py(points[0])}`;
  for (let i = 0; i < n - 1; i += 1) {
    const x = px(i, n);
    const xn = px(i + 1, n);
    const cx = (x + xn) / 2;
    d += ` C ${cx} ${py(points[i])}, ${cx} ${py(points[i + 1])}, ${xn} ${py(points[i + 1])}`;
  }
  return d;
};

/**
 * A line drawn on as you read. Markers pop in when the pen passes them, so the
 * annotations arrive in the order the prose makes its points rather than all at
 * once.
 */
export function CurveVisual({ spec }: VisualProps<'curve'>) {
  const n = spec.points.length;

  return (
    <svg viewBox="0 0 520 360" className="bx-svg" role="img" aria-label={spec.seriesLabel ?? 'Trend over time'}>
      {[0, 0.25, 0.5, 0.75, 1].map((g) => (
        <line key={g} x1={X0} y1={py(g)} x2={X1} y2={py(g)} stroke={INK} strokeOpacity={g === 0 ? 0.25 : 0.07} />
      ))}
      <line x1={X0} y1={Y1 - 8} x2={X0} y2={Y0} stroke={INK} strokeOpacity={0.25} />

      {spec.baseline?.length ? (
        <>
          <path
            d={smooth(spec.baseline)}
            fill="none"
            stroke={INK}
            strokeOpacity={0.4}
            strokeWidth={1.6}
            strokeDasharray="6 5"
            pathLength={1}
            className="bx-draw"
          />
          {spec.baselineLabel ? (
            <Label x={X1} y={py(spec.baseline[spec.baseline.length - 1]) - 10} size={10} anchor="end" tone="muted">
              {spec.baselineLabel}
            </Label>
          ) : null}
        </>
      ) : null}

      <path d={smooth(spec.points)} fill="none" stroke={ACCENT} strokeWidth={2.6} pathLength={1} className="bx-draw" />
      {spec.seriesLabel ? (
        <Label
          x={X1}
          y={py(spec.points[n - 1]) + (spec.points[n - 1] > 0.5 ? 22 : -12)}
          size={10}
          anchor="end"
          tone="accent"
          style={{ opacity: 1, fontWeight: 700 }}
        >
          {spec.seriesLabel}
        </Label>
      ) : null}

      {spec.markers?.map((m) => {
        const x = px(m.at, n);
        const y = py(spec.points[m.at] ?? 0);
        const flip = x > X1 - 120;
        return (
          <g key={m.label} className="bx-curve__marker" style={{ '--at': m.at / Math.max(1, n - 1) } as CSSProperties}>
            <line x1={x} y1={y} x2={x} y2={Y0} stroke={ACCENT} strokeOpacity={0.3} strokeDasharray="3 3" />
            <circle cx={x} cy={y} r={5} fill="#ffffff" stroke={ACCENT} strokeWidth={2.4} />
            <text
              x={flip ? x - 12 : x + 12}
              y={y - 10}
              textAnchor={flip ? 'end' : 'start'}
              className="bx-body"
              style={{ fontSize: 12, fill: INK, fontWeight: 700 }}
            >
              {m.label}
            </text>
          </g>
        );
      })}

      {spec.xLabels ? (
        <>
          <Label x={X0} y={Y0 + 22} size={10} tone="muted">
            {spec.xLabels[0]}
          </Label>
          <Label x={X1} y={Y0 + 22} size={10} anchor="end" tone="muted">
            {spec.xLabels[1]}
          </Label>
        </>
      ) : null}
      {spec.yLabel ? (
        <text
          transform={`translate(24 ${(Y0 + Y1) / 2}) rotate(-90)`}
          textAnchor="middle"
          className="bx-label"
          style={{ fontSize: 10, fill: INK, opacity: 0.45 }}
        >
          {spec.yLabel}
        </text>
      ) : null}
    </svg>
  );
}

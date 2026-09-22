import { useId } from 'react';
import { ACCENT, INK, Label, pad, step, type VisualProps } from './shared';

const PAD = 20;
const GAP = 6;
const STRIP_Y = 34;
const FRAME_H = 96;

/** The thing that is supposed to stay the same, drawn at a given amount of wrong. */
function Glyph({ kind, d, w }: { kind: 'face' | 'label' | 'logo'; d: number; w: number }) {
  const cx = w / 2;
  const cy = FRAME_H / 2;

  const art =
    kind === 'label' ? (
      <>
        <rect x={cx - 15} y={cy - 16} width={30} height={32} rx={2} />
        <line x1={cx - 9} y1={cy - 6} x2={cx + 9 - d * 9} y2={cy - 6} />
        <line x1={cx - 9} y1={cy + 1} x2={cx + 5 - d * 4} y2={cy + 1} />
        <line x1={cx - 9} y1={cy + 8} x2={cx + 7 - d * 10} y2={cy + 8} />
      </>
    ) : kind === 'logo' ? (
      <>
        <path d={`M ${cx} ${cy - 15} l 14 24 l -28 0 z`} />
        <rect x={cx - 7} y={cy + 1} width={14} height={14} />
      </>
    ) : (
      <>
        <circle cx={cx} cy={cy - 4} r={13} />
        <circle cx={cx - 5 - d * 3} cy={cy - 7 + d * 2} r={1.6} fill={INK} stroke="none" />
        <circle cx={cx + 5 + d * 4} cy={cy - 7 - d * 3} r={1.6} fill={INK} stroke="none" />
        <path d={`M ${cx - 6} ${cy + 2 + d * 3} q 6 ${4 - d * 8} 12 0`} />
        <path d={`M ${cx - 17} ${cy + 26} q 17 -13 34 0`} />
      </>
    );

  return (
    <g>
      {/* Ghost: where the model has wandered to, in accent, growing with drift. */}
      <g
        stroke={ACCENT}
        strokeWidth={1.4}
        fill="none"
        opacity={d * 0.85}
        transform={`translate(${d * 6} ${d * 3}) rotate(${d * 9} ${cx} ${cy}) scale(${1 + d * 0.12})`}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        {art}
      </g>
      <g stroke={INK} strokeOpacity={0.62} strokeWidth={1.4} fill="none">
        {art}
      </g>
    </g>
  );
}

/**
 * A clip laid out as a filmstrip, with the subject drifting further from the
 * reference frame by frame. Anchors snap it back — the diagram for why we cut
 * rather than extend, and why our clips are short.
 */
export function DriftVisual({ spec }: VisualProps<'drift'>) {
  // The sticky stage and the mobile figures render different scenes at the same
  // time, so a hardcoded clip id would have every strip on the page clipping to
  // whichever one mounted first.
  const clipId = `bx-drift-${useId().replace(/:/g, '')}`;
  const n = spec.frames;
  const frameW = (520 - PAD * 2 - GAP * (n - 1)) / n;
  const anchors = new Set([0, ...(spec.anchors ?? [])]);

  // Drift is distance from the last anchor, normalised by the worst run in the
  // strip, so a strip that re-anchors often never reaches full distortion.
  const runs: number[] = [];
  let last = 0;
  for (let i = 0; i < n; i += 1) {
    if (anchors.has(i)) last = i;
    runs.push(i - last);
  }
  const worst = Math.max(1, ...runs);

  const height = 236;
  const stripBottom = STRIP_Y + FRAME_H;

  return (
    <svg viewBox={`0 0 520 ${height}`} className="bx-svg" role="img" aria-label="Subject drifting across a clip, reset at each anchor">
      <defs>
        {/* Drift is drawn as an offset ghost, which by definition leaves the frame.
            Clipping keeps it inside its own frame instead of smearing into the next. */}
        <clipPath id={clipId}>
          <rect x={1} y={STRIP_Y + 1} width={frameW - 2} height={FRAME_H - 2} rx={2} />
        </clipPath>
      </defs>
      <Label x={PAD} y={20} size={9} tone="muted">
        REFERENCE
      </Label>
      <Label x={520 - PAD} y={20} size={9} anchor="end" tone="accent" style={{ opacity: 1, fontWeight: 700 }}>
        DRIFT →
      </Label>

      {runs.map((run, i) => {
        const x = PAD + i * (frameW + GAP);
        const d = run / worst;
        const anchored = anchors.has(i);

        return (
          <g key={i} className="bx-step bx-drift__frame" style={step(i, n)} transform={`translate(${x} 0)`}>
            {/* Sprockets — cheap, and they make the row unmistakably a strip of film. */}
            {[0, 1].map((r) => (
              <rect
                key={r}
                x={frameW / 2 - 4}
                y={r === 0 ? STRIP_Y - 11 : stripBottom + 4}
                width={8}
                height={6}
                rx={1}
                fill={INK}
                fillOpacity={0.18}
              />
            ))}

            <rect
              y={STRIP_Y}
              width={frameW}
              height={FRAME_H}
              rx={2}
              fill="#ffffff"
              stroke={anchored ? ACCENT : INK}
              strokeOpacity={anchored ? 1 : 0.16}
              strokeWidth={anchored ? 1.6 : 1}
            />
            <g clipPath={`url(#${clipId})`}>
              <g transform={`translate(0 ${STRIP_Y})`}>
                <Glyph kind={spec.glyph ?? 'face'} d={d} w={frameW} />
              </g>
            </g>

            <Label x={frameW / 2} y={stripBottom + 24} size={8} anchor="middle" tone="muted">
              {pad(i + 1)}
            </Label>

            {anchored && i > 0 ? (
              <g className="bx-drift__anchor">
                <path d={`M ${frameW / 2} ${stripBottom + 30} l 5 8 l -10 0 z`} fill={ACCENT} />
              </g>
            ) : null}
          </g>
        );
      })}

      <line x1={PAD} y1={height - 42} x2={520 - PAD} y2={height - 42} stroke={INK} strokeOpacity={0.12} />
      {spec.driftNote ? (
        <Label x={PAD} y={height - 24} size={10} tone="muted">
          {spec.driftNote}
        </Label>
      ) : null}
      {spec.anchorNote ? (
        <Label x={520 - PAD} y={height - 24} size={10} anchor="end" tone="accent" style={{ opacity: 1, fontWeight: 700 }}>
          {spec.anchorNote}
        </Label>
      ) : null}
    </svg>
  );
}

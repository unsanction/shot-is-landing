import { useId } from 'react';
import { ACCENT, INK, Label, pad, step, useCanvas, type VisualProps, useVisualStrings } from './shared';

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
  const vs = useVisualStrings();
  // The sticky stage and the mobile figures render different scenes at the same
  // time, so a hardcoded clip id would have every strip on the page clipping to
  // whichever one mounted first.
  const clipId = `bx-drift-${useId().replace(/:/g, '')}`;
  const { W, narrow } = useCanvas();
  const PAD = narrow ? 6 : 20;
  const GAP = narrow ? 5 : 6;
  const n = spec.frames;
  // A phone fits five legible frames across; longer strips wrap into a second
  // row of film rather than shrinking every face to a smudge.
  const perRow = narrow && n > 5 ? Math.ceil(n / 2) : n;
  const rows = Math.ceil(n / perRow);
  const ROW_PITCH = FRAME_H + 58;
  const frameW = (W - PAD * 2 - GAP * (perRow - 1)) / perRow;
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

  const stackedNotes = narrow && Boolean(spec.driftNote && spec.anchorNote);
  const footer = stackedNotes ? 86 : 68;
  const height = STRIP_Y + FRAME_H + 38 + (rows - 1) * ROW_PITCH + footer;
  const stripBottom = STRIP_Y + FRAME_H;

  return (
    <svg viewBox={`0 0 ${W} ${height}`} className="bx-svg" role="img" aria-label="Subject drifting across a clip, reset at each anchor">
      <defs>
        {/* Drift is drawn as an offset ghost, which by definition leaves the frame.
            Clipping keeps it inside its own frame instead of smearing into the next. */}
        <clipPath id={clipId}>
          <rect x={1} y={STRIP_Y + 1} width={frameW - 2} height={FRAME_H - 2} rx={2} />
        </clipPath>
      </defs>
      <Label x={PAD} y={20} size={9} tone="muted">
        {vs.reference}
      </Label>
      <Label x={W - PAD} y={20} size={9} anchor="end" tone="accent" style={{ opacity: 1, fontWeight: 700 }}>
        {vs.drift}
      </Label>

      {runs.map((run, i) => {
        const x = PAD + (i % perRow) * (frameW + GAP);
        const rowY = Math.floor(i / perRow) * ROW_PITCH;
        const d = run / worst;
        const anchored = anchors.has(i);

        return (
          <g key={i} className="bx-step bx-drift__frame" style={step(i, n)} transform={`translate(${x} ${rowY})`}>
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

      <line x1={PAD} y1={height - footer + 26} x2={W - PAD} y2={height - footer + 26} stroke={INK} strokeOpacity={0.12} />
      {spec.driftNote ? (
        <Label x={PAD} y={height - footer + 44} size={10} tone="muted">
          {spec.driftNote}
        </Label>
      ) : null}
      {spec.anchorNote ? (
        <Label
          x={stackedNotes ? PAD : W - PAD}
          y={height - footer + (stackedNotes ? 62 : 44)}
          size={10}
          anchor={stackedNotes ? 'start' : 'end'}
          tone="accent"
          style={{ opacity: 1, fontWeight: 700 }}
        >
          {spec.anchorNote}
        </Label>
      ) : null}
    </svg>
  );
}

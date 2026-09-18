/**
 * Subtitle frames, rendered after the screencast rather than during it.
 *
 * The capture stays clean: no overlay, no text, just the studio. Subtitles are
 * burned in afterwards from the lesson's caption list. That separation is what
 * makes the Spanish lessons cheap — one recording, two burns — instead of
 * requiring the whole take to be shot again in another language.
 *
 * ffmpeg here has neither libass nor drawtext, so each caption is rendered to a
 * transparent full-frame PNG with satori + resvg (the same pair that draws the
 * OG cards) and composited with `overlay`, gated by its time range.
 */
import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { projectRoot } from './config.mjs';

const ACCENT = '#e11d2e';
const fontsDir = join(projectRoot, 'assets', 'fonts');

/** Minimal element factory satori understands (no JSX in .mjs). */
const el = (type, style, children) => ({ type, props: { style, ...(children !== undefined ? { children } : {}) } });

const loadFonts = async () => {
  const [unbounded, manrope] = await Promise.all([
    fs.readFile(join(fontsDir, 'Unbounded-Bold.ttf')),
    fs.readFile(join(fontsDir, 'Manrope-SemiBold.ttf')),
  ]);
  return [
    { name: 'Unbounded', data: unbounded, weight: 700, style: 'normal' },
    { name: 'Manrope', data: manrope, weight: 600, style: 'normal' },
  ];
};

/**
 * One full-frame overlay: the caption bar, the lesson badge, and a progress bar
 * filled to this caption's point in the lesson. Progress advances a step per
 * caption, which is enough motion to read as a timeline without animating.
 */
const frame = ({ text, badge, progress, width, height }) =>
  el('div', { width, height, display: 'flex', position: 'relative', fontFamily: 'Manrope' }, [
    el(
      'div',
      {
        position: 'absolute',
        top: 26,
        right: 30,
        display: 'flex',
        backgroundColor: 'rgba(0,0,0,0.8)',
        color: '#ffffff',
        padding: '9px 15px',
        fontFamily: 'Unbounded',
        fontSize: 12,
        letterSpacing: '0.24em',
      },
      badge,
    ),
    el(
      'div',
      {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 46,
        display: 'flex',
        justifyContent: 'center',
      },
      [
        el(
          'div',
          {
            display: 'flex',
            maxWidth: Math.round(width * 0.78),
            backgroundColor: 'rgba(0,0,0,0.88)',
            borderBottom: `3px solid ${ACCENT}`,
            color: '#ffffff',
            padding: '16px 28px',
            fontSize: 27,
            fontWeight: 600,
            lineHeight: 1.32,
            letterSpacing: '-0.01em',
            textAlign: 'center',
          },
          text,
        ),
      ],
    ),
    el('div', {
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: Math.max(1, Math.round(width * progress)),
      height: 4,
      backgroundColor: ACCENT,
    }),
  ]);

/**
 * Render one PNG per caption and return the cue list the encoder needs.
 * A caption holds the screen until the next one starts, and the last one runs
 * to the end of the lesson.
 */
export const renderCaptionFrames = async ({ captions, badge, width, height, videoSeconds, outDir }) => {
  await fs.mkdir(outDir, { recursive: true });
  const fonts = await loadFonts();
  const cues = [];

  for (const [index, caption] of captions.entries()) {
    const until = captions[index + 1]?.at ?? videoSeconds;
    const file = join(outDir, `caption-${String(index).padStart(3, '0')}.png`);
    const svg = await satori(
      frame({
        text: caption.text,
        badge,
        progress: videoSeconds > 0 ? caption.at / videoSeconds : 0,
        width,
        height,
      }),
      { width, height, fonts },
    );
    await fs.writeFile(file, new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng());
    cues.push({ file, from: caption.at, until });
  }

  return cues;
};

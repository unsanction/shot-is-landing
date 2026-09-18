import { execFile } from 'node:child_process';
import { promises as fs } from 'node:fs';
import { promisify } from 'node:util';

const run = promisify(execFile);

/** Wall-clock duration of a media file, in seconds. */
export const probeDuration = async (file) => {
  const { stdout } = await run('ffprobe', [
    '-v',
    'error',
    '-show_entries',
    'format=duration',
    '-of',
    'default=noprint_wrappers=1:nokey=1',
    file,
  ]);
  return Number.parseFloat(stdout.trim());
};

/**
 * Playwright writes VP8 webm at whatever framerate it managed to capture.
 * Normalize to a constant-framerate H.264 MP4 that plays inline everywhere,
 * scaled to the lesson's declared frame size.
 *
 * `music` is optional and mixed in quietly — the lessons have no voice-over, so
 * the track only has to keep the clip from feeling like a dead screen capture.
 */
export const encodeLesson = async ({
  input,
  output,
  width,
  height,
  music,
  fps = 30,
  trimStart = 0,
  duration,
  cropBottom = 20,
}) => {
  const args = ['-y', '-i', input];
  if (music) args.push('-stream_loop', '-1', '-i', music);

  // Capture begins when the page opens, before the lesson clock starts, so the
  // head holds navigation and canvas warm-up. Seek on the output side: slower,
  // but frame-accurate, and the page promises this runtime to the viewer.
  if (trimStart > 0) args.push('-ss', trimStart.toFixed(3));
  if (duration) args.push('-t', String(duration));

  // Playwright's capture leaves a ~17px grey band along the bottom that is not
  // in the page at all. Crop it off, then pad back to size in black, which is
  // invisible against the studio's own background.
  args.push(
    '-vf',
    `crop=iw:ih-${cropBottom}:0:0,scale=${width}:${height}:force_original_aspect_ratio=decrease,` +
      `pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2:black,fps=${fps}`,
    '-c:v',
    'libx264',
    '-preset',
    'slow',
    '-crf',
    '20',
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
  );

  if (music) {
    // -shortest stops at the (looping) music's partner stream: the screencast.
    args.push('-c:a', 'aac', '-b:a', '128k', '-af', 'volume=0.12', '-shortest');
  } else {
    args.push('-an');
  }

  args.push(output);
  await run('ffmpeg', args, { maxBuffer: 1024 * 1024 * 32 });
  return probeDuration(output);
};

/** A poster frame, taken far enough in that the canvas has drawn something. */
/**
 * Burn caption frames onto a finished master.
 *
 * One `overlay` per cue, each gated to its own time range. The chain is long
 * (a lesson carries ~20 captions) but ffmpeg handles it fine, and it keeps the
 * master untouched — re-burning in another language is a re-run of this step,
 * not a re-shoot.
 */
export const burnCaptions = async ({ input, output, cues, fps = 30 }) => {
  if (cues.length === 0) throw new Error('no caption cues to burn');

  const args = ['-y', '-i', input];
  for (const cue of cues) args.push('-i', cue.file);

  const steps = cues.map((cue, i) => {
    const prev = i === 0 ? '[0:v]' : `[v${i}]`;
    const label = i === cues.length - 1 ? '[out]' : `[v${i + 1}]`;
    // `between` is inclusive on both ends; shave the tail so two captions
    // never occupy the same frame.
    return `${prev}[${i + 1}:v]overlay=0:0:enable='between(t,${cue.from},${(cue.until - 0.04).toFixed(2)})'${label}`;
  });

  args.push(
    '-filter_complex',
    steps.join(';'),
    '-map',
    '[out]',
    ...(await hasAudio(input) ? ['-map', '0:a?', '-c:a', 'copy'] : []),
    '-c:v',
    'libx264',
    '-preset',
    'slow',
    '-crf',
    '20',
    '-pix_fmt',
    'yuv420p',
    '-r',
    String(fps),
    '-movflags',
    '+faststart',
    output,
  );

  await run('ffmpeg', args, { maxBuffer: 1024 * 1024 * 64 });
  return probeDuration(output);
};

const hasAudio = async (file) => {
  const { stdout } = await run('ffprobe', [
    '-v',
    'error',
    '-select_streams',
    'a',
    '-show_entries',
    'stream=index',
    '-of',
    'csv=p=0',
    file,
  ]);
  return stdout.trim().length > 0;
};

export const posterFrame = async ({ input, output, atSec = 3 }) => {
  await run('ffmpeg', [
    '-y',
    '-ss',
    String(atSec),
    '-i',
    input,
    '-frames:v',
    '1',
    '-q:v',
    '3',
    output,
  ]);
  await fs.access(output);
};

/**
 * The lesson page promises a runtime, so the encoded file has to honour it.
 * A second of slack absorbs frame-boundary rounding; anything beyond that
 * means the page is lying to the viewer and the caption timings are off too.
 */
export const assertDuration = (actual, declared, slack = 1.0) => {
  if (Math.abs(actual - declared) > slack) {
    throw new Error(
      `Encoded runtime ${actual.toFixed(2)}s does not match the declared videoSeconds ${declared}s. ` +
        `Update videoSeconds in src/data/lessons.ts (and the caption timings) or re-record.`,
    );
  }
};

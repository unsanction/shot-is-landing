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

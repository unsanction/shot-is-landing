/**
 * Record one lesson screencast from the real studio.
 *
 *   node scripts/lessons/record.mjs <lesson-slug> [--keep-raw]
 *
 * The lesson's captions and steps come from src/data/lessons.ts (via the SSR
 * bundle), so the page and the video are driven by one timeline: a caption
 * appears in the recording at exactly the second the transcript says it does.
 *
 * Requires a signed-in profile — run scripts/lessons/login.mjs once first.
 */
import { execFile } from 'node:child_process';
import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { promisify } from 'node:util';
import { chromium } from 'playwright';
import { CAPTURE_DIR, MEDIA_DIR, MUSIC_FILE, PROFILE_DIR, VIEWPORT, projectRoot } from './config.mjs';
import { OVERLAY_INIT_SCRIPT } from './overlay.mjs';
import { assertDuration, encodeLesson, posterFrame } from './encode.mjs';
import { lessonPlans } from './plans.mjs';

const run = promisify(execFile);

/** Build the SSR bundle so lesson data is read from the same source the site uses. */
const loadLessons = async () => {
  await run('npm', ['run', 'build:server'], { cwd: projectRoot, maxBuffer: 1024 * 1024 * 32 });
  const entry = await import(join(projectRoot, 'dist-ssr', 'entry-server.js'));
  return entry.lessonRecordingPlans();
};

/**
 * Merge captions and UI actions into one list of wall-clock cues, then execute
 * each at its scheduled offset. Running both off one clock is what keeps the
 * subtitle honest: it cannot describe a click that has not happened yet.
 */
const buildTimeline = (lesson, plan) => {
  const cues = [
    ...lesson.captions.map((caption) => ({
      at: caption.at,
      kind: 'caption',
      run: async (page) => {
        await page.evaluate((text) => window.__shotisCaption?.show(text), caption.text);
      },
    })),
    ...(plan?.actions ?? []).map((action) => ({
      at: action.at,
      kind: 'action',
      label: action.label,
      run: action.run,
    })),
  ];
  // Captions win ties. A cue's action can take a second to play out, and the
  // page publishes these timestamps as a transcript — so the line has to land
  // on its own `at`, with the camera move following it rather than delaying it.
  return cues.sort((a, b) => a.at - b.at || (a.kind === 'caption' ? -1 : 1));
};

const sleepUntil = async (startedAt, offsetSec) => {
  const target = startedAt + offsetSec * 1000;
  const delay = target - Date.now();
  if (delay > 0) await new Promise((r) => setTimeout(r, delay));
};

const main = async () => {
  const slug = process.argv[2];
  const keepRaw = process.argv.includes('--keep-raw');
  if (!slug) {
    console.error('usage: node scripts/lessons/record.mjs <lesson-slug>');
    process.exit(1);
  }

  const lessons = await loadLessons();
  const lesson = lessons.find((l) => l.slug === slug);
  if (!lesson) {
    console.error(`No lesson "${slug}". Known: ${lessons.map((l) => l.slug).join(', ')}`);
    process.exit(1);
  }

  const plan = lessonPlans[slug];
  if (!plan) {
    console.error(`No recording plan for "${slug}" in scripts/lessons/plans.mjs.`);
    process.exit(1);
  }

  await fs.mkdir(CAPTURE_DIR, { recursive: true });
  await fs.mkdir(MEDIA_DIR, { recursive: true });
  const rawDir = join(CAPTURE_DIR, slug);
  await fs.rm(rawDir, { recursive: true, force: true });
  await fs.mkdir(rawDir, { recursive: true });

  console.log(`Recording "${lesson.title}" — ${lesson.videoSeconds}s, ${lesson.captions.length} captions`);

  // Capture begins with the browser, not with the first cue: a persistent
  // context already owns a page at launch, so the recorder is writing frames
  // through startup and setup. Measure from here or the trim comes up short.
  const captureStartedAt = Date.now();

  const context = await chromium.launchPersistentContext(PROFILE_DIR, {
    headless: false,
    viewport: VIEWPORT,
    args: ['--hide-scrollbars', '--force-device-scale-factor=1'],
    recordVideo: { dir: rawDir, size: VIEWPORT },
  });

  await context.addInitScript(OVERLAY_INIT_SCRIPT);

  const page = context.pages()[0] ?? (await context.newPage());
  let leadInSec = 0;

  try {
    // Everything before the clock starts: navigation, waiting for the canvas.
    await plan.setup({ page, lesson });
    await page.evaluate(
      (label) => window.__shotisCaption?.brand(label),
      `SHOT.IS <span>·</span> Lesson ${lesson.order}`,
    );

    const startedAt = Date.now();
    leadInSec = (startedAt - captureStartedAt) / 1000;
    const timeline = buildTimeline(lesson, plan);

    for (const cue of timeline) {
      await sleepUntil(startedAt, cue.at);
      const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
      try {
        await cue.run(page, lesson);
        if (cue.kind === 'action') console.log(`  ${elapsed}s  ${cue.label ?? 'action'}`);
      } catch (error) {
        // A missed click should not abandon a recording that is otherwise fine;
        // the log tells you which cue to fix before the next take.
        console.warn(`  ${elapsed}s  FAILED ${cue.kind} ${cue.label ?? ''}: ${error.message}`);
      }
      await page
        .evaluate((f) => window.__shotisCaption?.progress(f), cue.at / lesson.videoSeconds)
        .catch(() => {});
    }

    await sleepUntil(startedAt, lesson.videoSeconds);
    await page.evaluate(() => window.__shotisCaption?.hide()).catch(() => {});
  } finally {
    await context.close();
  }

  const files = await fs.readdir(rawDir);
  const webm = files.find((f) => f.endsWith('.webm'));
  if (!webm) throw new Error(`No capture was written to ${rawDir}`);
  const rawPath = join(rawDir, webm);

  const mp4 = join(MEDIA_DIR, `${slug}.mp4`);
  const jpg = join(MEDIA_DIR, `${slug}.jpg`);

  console.log(`Encoding… (trimming ${leadInSec.toFixed(2)}s of lead-in)`);
  const duration = await encodeLesson({
    input: rawPath,
    output: mp4,
    width: lesson.video.width,
    height: lesson.video.height,
    music: MUSIC_FILE,
    trimStart: leadInSec,
    duration: lesson.videoSeconds,
  });
  await posterFrame({ input: mp4, output: jpg, atSec: Math.min(3, lesson.videoSeconds / 4) });

  if (!keepRaw) await fs.rm(rawDir, { recursive: true, force: true });

  console.log(`\n  ${mp4}  (${duration.toFixed(2)}s)`);
  console.log(`  ${jpg}`);
  assertDuration(duration, lesson.videoSeconds);
  console.log(`\nRuntime matches videoSeconds. Clear videoPending for "${slug}" in src/data/lessons.ts.`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

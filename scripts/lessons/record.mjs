/**
 * Record one lesson screencast from the real studio.
 *
 *   node scripts/lessons/record.mjs <lesson-slug> [--keep-raw]
 *
 * Produces two files. The master in .lesson-capture/masters/ is the clean
 * take — the studio and nothing else. The shipped file under public/media is
 * that master with one language's subtitles burned on, which is why a second
 * language costs a re-burn (scripts/lessons/burn.mjs) and not another take.
 *
 * Camera moves come from scripts/lessons/plans.mjs and the caption timings
 * from src/data/lessons.ts, both on the lesson's own clock, so the picture and
 * the subtitle still describe the same second.
 *
 * Requires a signed-in profile — run scripts/lessons/login.mjs once first.
 */
import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';
import { CAPTURE_DIR, MASTERS_DIR, MUSIC_FILE, PROFILE_DIR, VIEWPORT } from './config.mjs';
import { CAPTURE_INIT_SCRIPT } from './overlay.mjs';
import { assertDuration, encodeLesson } from './encode.mjs';
import { burnLesson, loadLessons } from './burn.mjs';
import { lessonPlans } from './plans.mjs';

/**
 * The camera choreography on the lesson's own clock.
 *
 * Captions are no longer part of this timeline — they are burned on afterwards
 * from the same `at` values, so the picture and the subtitles still share one
 * source without the take having to carry text.
 */
const buildTimeline = (plan) =>
  [...(plan?.actions ?? [])].sort((a, b) => a.at - b.at);

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

  await context.addInitScript(CAPTURE_INIT_SCRIPT);

  const page = context.pages()[0] ?? (await context.newPage());
  let leadInSec = 0;

  try {
    // Everything before the clock starts: navigation, waiting for the canvas.
    await plan.setup({ page, lesson });

    const startedAt = Date.now();
    leadInSec = (startedAt - captureStartedAt) / 1000;

    for (const cue of buildTimeline(plan)) {
      await sleepUntil(startedAt, cue.at);
      const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
      try {
        await cue.run(page, lesson);
        console.log(`  ${elapsed}s  ${cue.label ?? 'action'}`);
      } catch (error) {
        // A missed click should not abandon a take that is otherwise fine; the
        // log names the cue to fix before the next one.
        console.warn(`  ${elapsed}s  FAILED ${cue.label ?? 'action'}: ${error.message}`);
      }
    }

    await sleepUntil(startedAt, lesson.videoSeconds);
  } finally {
    await context.close();
  }

  const files = await fs.readdir(rawDir);
  const webm = files.find((f) => f.endsWith('.webm'));
  if (!webm) throw new Error(`No capture was written to ${rawDir}`);
  const rawPath = join(rawDir, webm);

  await fs.mkdir(MASTERS_DIR, { recursive: true });
  const master = join(MASTERS_DIR, `${slug}.mp4`);

  console.log(`Encoding master… (trimming ${leadInSec.toFixed(2)}s of lead-in)`);
  const duration = await encodeLesson({
    input: rawPath,
    output: master,
    width: lesson.video.width,
    height: lesson.video.height,
    music: MUSIC_FILE,
    trimStart: leadInSec,
    duration: lesson.videoSeconds,
  });
  assertDuration(duration, lesson.videoSeconds);

  if (!keepRaw) await fs.rm(rawDir, { recursive: true, force: true });
  console.log(`  master: ${master}  (${duration.toFixed(2)}s, no text)`);

  // The master is the deliverable of this script; the shipped file is the same
  // picture with one language's subtitles burned on.
  console.log(`Burning ${lesson.captions.length} captions…`);
  const burned = await burnLesson(lesson, { lang: 'en' });
  console.log(`\n  ${burned.out}  (${burned.duration.toFixed(2)}s)`);
  console.log(`  ${burned.poster}`);
  console.log(`\nAnother language: node scripts/lessons/burn.mjs ${slug} es  (no re-shoot needed)`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

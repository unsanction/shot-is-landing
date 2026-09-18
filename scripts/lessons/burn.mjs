/**
 * Burn a language's subtitles onto a lesson's clean master.
 *
 *   node scripts/lessons/burn.mjs <lesson-slug> [lang]
 *
 * Masters live in .lesson-capture/masters/ and carry no text at all, so a new
 * language is this step re-run — not another take. Captions come from
 * src/data/lessons.ts, which is also what the page renders as its transcript,
 * so the two can never disagree.
 */
import { promises as fs } from 'node:fs';
import { execFile } from 'node:child_process';
import { join } from 'node:path';
import { promisify } from 'node:util';
import { CAPTURE_DIR, MASTERS_DIR, MEDIA_DIR, projectRoot } from './config.mjs';
import { renderCaptionFrames } from './subtitles.mjs';
import { assertDuration, burnCaptions, posterFrame } from './encode.mjs';

const run = promisify(execFile);

export const loadLessons = async (lang = 'en') => {
  await run('npm', ['run', 'build:server'], { cwd: projectRoot, maxBuffer: 1024 * 1024 * 32 });
  const entry = await import(`${join(projectRoot, 'dist-ssr', 'entry-server.js')}?t=${Date.now()}`);
  return entry.lessonRecordingPlans(lang);
};

export const burnLesson = async (lesson, { lang = 'en' } = {}) => {
  const master = join(MASTERS_DIR, `${lesson.slug}.mp4`);
  await fs.access(master).catch(() => {
    throw new Error(`No master at ${master}. Record it first: node scripts/lessons/record.mjs ${lesson.slug}`);
  });

  const framesDir = join(CAPTURE_DIR, 'frames', `${lesson.slug}-${lang}`);
  await fs.rm(framesDir, { recursive: true, force: true });

  const cues = await renderCaptionFrames({
    captions: lesson.captions,
    badge: `SHOT.IS · LESSON ${lesson.order}`,
    width: lesson.video.width,
    height: lesson.video.height,
    videoSeconds: lesson.videoSeconds,
    outDir: framesDir,
  });

  // English keeps the canonical filename; other languages get a suffix so both
  // can ship side by side.
  const base = lang === 'en' ? lesson.slug : `${lesson.slug}.${lang}`;
  const out = join(MEDIA_DIR, `${base}.mp4`);
  const poster = join(MEDIA_DIR, `${base}.jpg`);

  await fs.mkdir(MEDIA_DIR, { recursive: true });
  const duration = await burnCaptions({ input: master, output: out, cues });
  await posterFrame({ input: out, output: poster, atSec: Math.min(3, lesson.videoSeconds / 4) });
  await fs.rm(framesDir, { recursive: true, force: true });

  assertDuration(duration, lesson.videoSeconds);
  return { out, poster, duration, captions: cues.length };
};

const main = async () => {
  const slug = process.argv[2];
  const lang = process.argv[3] ?? 'en';
  if (!slug) {
    console.error('usage: node scripts/lessons/burn.mjs <lesson-slug> [lang]');
    process.exit(1);
  }

  const lessons = await loadLessons(lang);
  const lesson = lessons.find((l) => l.slug === slug);
  if (!lesson) {
    console.error(`No ${lang} lesson "${slug}". Known: ${lessons.map((l) => l.slug).join(', ')}`);
    process.exit(1);
  }

  console.log(`Burning ${lesson.captions.length} ${lang} captions onto "${lesson.title}"`);
  const result = await burnLesson(lesson, { lang });
  console.log(`  ${result.out}  (${result.duration.toFixed(2)}s)`);
  console.log(`  ${result.poster}`);
};

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}

import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const projectRoot = resolve(__dirname, '..', '..');

/** Dedicated browser profile, kept outside the repo so it is never committed. */
export const PROFILE_DIR = process.env.SHOTIS_LESSON_PROFILE ?? join(homedir(), '.shot', 'lesson-profile');

export const STUDIO_ORIGIN = process.env.SHOTIS_STUDIO_ORIGIN ?? 'https://studio.shot.is';

/**
 * 1440x900 matches the lesson `video` dimensions in src/data/lessons.ts. The
 * canvas needs the width — at anything narrower the studio collapses panels
 * that the lessons point at.
 */
export const VIEWPORT = { width: 1440, height: 900 };

/** Raw captures and intermediate files; only the encoded MP4 leaves this. */
export const CAPTURE_DIR = join(projectRoot, '.lesson-capture');

/**
 * Clean, text-free masters. Keeping these is what makes a second language a
 * re-burn rather than a re-shoot, so do not treat them as scratch.
 */
export const MASTERS_DIR = join(CAPTURE_DIR, 'masters');

/** Where the shipped screencasts land, matching lesson.video.src. */
export const MEDIA_DIR = join(projectRoot, 'public', 'media', 'lessons');

/** Optional bed music mixed in quietly. Unset means a silent screencast. */
export const MUSIC_FILE = process.env.SHOTIS_LESSON_MUSIC ?? null;

export type LessonLang = 'en' | 'es';

/**
 * A lesson is a short screencast of studio.shot.is plus the text that explains it.
 *
 * The captions below are the single source of truth for three surfaces:
 *   1. the subtitles burned into the MP4 by scripts/record-lesson.mjs,
 *   2. the on-page transcript (readable, indexable, accessible), and
 *   3. VideoObject.transcript in the page schema.
 * Editing a caption here changes all three — never retype a line into the video.
 */
export type LessonCaption = {
  /** Seconds into the clip when the line appears. Must be ascending. */
  at: number;
  text: string;
};

/** A chapter of the screencast. `at` powers the "jump to" chips under the player. */
export type LessonStep = {
  at: number;
  title: string;
  body: string;
};

export type LessonFaq = { question: string; answer: string };

/**
 * `basics` lessons teach the canvas itself and are meant to be watched in order.
 * `micro-case` lessons rebuild one recognizable ad format end to end.
 */
export type LessonKind = 'basics' | 'micro-case';

export type LessonVideo = {
  src: string;
  poster: string;
  width: number;
  height: number;
};

export type Lesson = {
  slug: string;
  lang: LessonLang;
  /** Shared across the EN/ES versions of the same lesson — this is how hreflang pairs are linked. */
  translationKey: string;
  /** Position in the learning path. */
  order: number;
  kind: LessonKind;
  title: string;
  /** Override for <title> if it should differ from the on-page h1. */
  metaTitle?: string;
  description: string;
  excerpt: string;
  /** The one thing the viewer can do afterwards. Written as a promise, not a topic. */
  outcome: string;
  /** Node types from GET /api/graph/catalog that the lesson actually touches. */
  nodes: string[];
  datePublished: string;
  dateModified?: string;
  ogImageKey: string;
  tags: string[];
  /**
   * Runtime of the shipped screencast, in seconds. Kept honest by
   * scripts/record-lesson.mjs, which fails the build when the encoded MP4
   * drifts from this number — the page promises a length, so it must be true.
   */
  videoSeconds: number;
  /** Hands-on minutes to redo the lesson yourself. Learning time = video + practice. */
  practiceMinutes: number;
  video: LessonVideo;
  /**
   * True while the screencast is still being recorded. The lesson page then
   * ships the written steps and hides the player rather than pointing a
   * <video> at a file that does not exist yet.
   */
  videoPending?: boolean;
  prerequisites?: string[];
  steps: LessonStep[];
  captions: LessonCaption[];
  faq?: LessonFaq[];
};

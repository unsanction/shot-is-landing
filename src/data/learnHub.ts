import { blogPostPath, blogPostsByTranslationKey, readingTime, type BlogPost } from './blog';
import {
  learnIndexPath,
  learningMinutes,
  lessonPath,
  lessonsByTranslationKey,
  type Lesson,
  type LessonLang,
} from './lessons';
import { siteBaseUrl } from './seo';
import type { Alternate } from './blog';

/*
 * The Learn hub: one surface over both screencasts and articles, cut into
 * sections by what the reader is trying to do rather than by format.
 *
 * Two deliberate choices:
 *
 * 1. Entries reference `translationKey`, not `slug`. EN and ES slugs differ
 *    ("ai-ugc-ads-guide" vs "guia-anuncios-ugc-ia"), so keying on the shared
 *    translation key means the Spanish hub assembles itself from the same
 *    taxonomy, showing only what exists in Spanish.
 *
 * 2. URLs are untouched. Lessons stay on /learn/*, articles stay on /blog/*.
 *    This file merges the *shelf*, not the addresses — the blog's indexed URLs,
 *    hreflang pairs, sitemap entries and feed all keep working unchanged.
 *
 * Every lesson and every article must appear in exactly one section.
 * `hubCoverage()` enforces that at build time (see scripts/prerender.mjs), so a
 * new post cannot be published into a hub that silently never lists it.
 */

export const hubStrings: Record<
  LessonLang,
  {
    sectionsLabel: string;
    watch: string;
    read: string;
    counts: (lessons: number, posts: number) => string;
    totalTime: (label: string) => string;
    archiveLede: string;
    archiveCta: string;
    backToHub: string;
    archiveTitle: string;
    groupedByTopic: string;
    seoTitle: string;
  }
> = {
  en: {
    sectionsLabel: 'Sections',
    watch: 'Watch',
    read: 'Read',
    // A zero segment is dropped rather than printed: "0 screencasts" advertises a
    // gap. Spanish has articles but no lessons yet and should not lead with that.
    counts: (lessons, posts) =>
      [
        lessons ? `${lessons} ${lessons === 1 ? 'screencast' : 'screencasts'}` : '',
        posts ? `${posts} ${posts === 1 ? 'article' : 'articles'}` : '',
      ]
        .filter(Boolean)
        .join(' · '),
    totalTime: (label) => `${label} end to end`,
    archiveLede: 'Prefer to browse everything by date instead of by topic?',
    archiveCta: 'All articles, newest first',
    backToHub: 'Learn',
    archiveTitle: 'Every article, newest first',
    groupedByTopic: 'Browse Learn, grouped by topic',
    seoTitle: 'Learn SHOT.IS: Screencasts and Field Notes on AI Video Ads',
  },
  es: {
    sectionsLabel: 'Secciones',
    watch: 'Ver',
    read: 'Leer',
    counts: (lessons, posts) =>
      [
        lessons ? `${lessons} ${lessons === 1 ? 'screencast' : 'screencasts'}` : '',
        posts ? `${posts} ${posts === 1 ? 'artículo' : 'artículos'}` : '',
      ]
        .filter(Boolean)
        .join(' · '),
    totalTime: (label) => `${label} de principio a fin`,
    archiveLede: '¿Prefieres verlo todo por fecha en vez de por tema?',
    archiveCta: 'Todos los artículos, del más reciente',
    backToHub: 'Learn',
    archiveTitle: 'Todos los artículos, del más reciente',
    groupedByTopic: 'Explora Learn, agrupado por tema',
    seoTitle: 'Aprende SHOT.IS: screencasts y notas de campo sobre anuncios con IA',
  },
};

export type HubEntry = { kind: 'lesson' | 'post'; key: string };

export type HubSection = {
  id: string;
  /** Mono eyebrow. Written as a job to be done, not a topic noun. */
  title: Record<LessonLang, string>;
  blurb: Record<LessonLang, string>;
  entries: HubEntry[];
};

export const hubSections: HubSection[] = [
  {
    id: 'start-here',
    title: { en: 'Start here', es: 'Empieza aquí' },
    blurb: {
      en: 'What this format actually is, whether it works, and how it compares to a shoot.',
      es: 'Qué es este formato, si funciona y cómo se compara con un rodaje.',
    },
    entries: [
      { kind: 'lesson', key: 'first-ai-video' },
      { kind: 'post', key: 'ai-ugc-ads-guide' },
      { kind: 'post', key: 'do-ai-ugc-ads-work' },
      { kind: 'post', key: 'creatividad-ia-para-marcas' },
    ],
  },
  {
    id: 'run-the-studio',
    title: { en: 'Run the studio', es: 'Maneja el estudio' },
    blurb: {
      en: 'The canvas itself: references, re-running one node, and the pipeline a finished ad travels through.',
      es: 'El lienzo en sí: referencias, reejecutar un nodo y el pipeline que recorre un anuncio terminado.',
    },
    entries: [
      { kind: 'lesson', key: 'lock-your-product' },
      { kind: 'lesson', key: 'fix-one-shot' },
      { kind: 'post', key: 'canvas-mode-node-based-ai-video-workflow' },
      { kind: 'post', key: 'ai-ad-production-pipeline' },
    ],
  },
  {
    id: 'keep-it-consistent',
    title: { en: 'Keep it consistent', es: 'Mantén la consistencia' },
    blurb: {
      en: 'The hard part: one face, one label and one world across every shot in a set.',
      es: 'La parte difícil: una cara, una etiqueta y un mundo en todos los planos.',
    },
    entries: [
      { kind: 'post', key: 'keyframe-to-video-workflow' },
      { kind: 'post', key: 'brand-consistency-ai-ads' },
      { kind: 'post', key: 'ai-character-consistency' },
      { kind: 'post', key: 'beat-synced-video-ads' },
    ],
  },
  {
    id: 'rebuild-a-format',
    title: { en: 'Rebuild a format', es: 'Reconstruye un formato' },
    blurb: {
      en: 'One recognizable ad format taken apart and put back together, end to end.',
      es: 'Un formato de anuncio reconocible, desmontado y reconstruido de principio a fin.',
    },
    entries: [
      { kind: 'lesson', key: 'strobe-product-ad' },
      { kind: 'lesson', key: 'ugc-testimonial-one-scene' },
      { kind: 'post', key: 'ugc-hook-patterns' },
    ],
  },
  {
    id: 'models-and-budget',
    title: { en: 'Pick models, plan budget', es: 'Elige modelos y presupuesto' },
    blurb: {
      en: 'Which generator earns which shot, and what a batch of variants actually costs.',
      es: 'Qué generador merece cada plano y cuánto cuesta realmente un lote de variantes.',
    },
    entries: [
      { kind: 'post', key: 'best-ai-video-generator-for-ads' },
      { kind: 'post', key: 'veo-3-for-ad-creative' },
      { kind: 'post', key: 'ai-ugc-ads-cost' },
      { kind: 'post', key: 'ai-video-ads-vs-traditional' },
    ],
  },
  {
    id: 'virtual-influencers',
    title: { en: 'Virtual influencers', es: 'Influencers virtuales' },
    blurb: {
      en: 'A recurring AI character as an owned channel: what one is, how to build it, what it costs.',
      es: 'Un personaje de IA recurrente como canal propio: qué es, cómo construirlo y cuánto cuesta.',
    },
    entries: [
      { kind: 'post', key: 'virtual-influencers-explained' },
      { kind: 'post', key: 'how-to-create-a-virtual-influencer' },
      { kind: 'post', key: 'virtual-influencer-cost' },
    ],
  },
];

export type HubItem = {
  kind: 'lesson' | 'post';
  href: string;
  title: string;
  excerpt: string;
  /** Minutes to watch-and-do, or to read. Same unit either way, on purpose. */
  minutes: number;
  /** Position in the learning path — lessons only. */
  order?: number;
  lesson?: Lesson;
  post?: BlogPost;
};

export type ResolvedHubSection = Omit<HubSection, 'entries'> & { items: HubItem[] };

const resolveEntry = (entry: HubEntry, lang: LessonLang): HubItem | undefined => {
  if (entry.kind === 'lesson') {
    const lesson = lessonsByTranslationKey.get(entry.key)?.[lang];
    if (!lesson) return undefined;
    return {
      kind: 'lesson',
      href: lessonPath(lesson),
      title: lesson.title,
      excerpt: lesson.excerpt,
      minutes: learningMinutes(lesson),
      order: lesson.order,
      lesson,
    };
  }

  const post = blogPostsByTranslationKey.get(entry.key)?.[lang];
  if (!post) return undefined;
  return {
    kind: 'post',
    href: blogPostPath(post),
    title: post.title,
    excerpt: post.excerpt,
    minutes: readingTime(post),
    post,
  };
};

/**
 * The hub for one language. Entries with no translation yet are dropped, and a
 * section left empty disappears rather than rendering an empty shelf — which is
 * what keeps the Spanish hub honest while only three articles exist there.
 */
export const hubSectionsForLang = (lang: LessonLang): ResolvedHubSection[] =>
  hubSections
    .map(({ entries, ...section }) => ({
      ...section,
      items: entries.map((entry) => resolveEntry(entry, lang)).filter((item): item is HubItem => Boolean(item)),
    }))
    .filter((section) => section.items.length > 0);

/**
 * Languages the hub exists in — distinct from `learnLangs`, which means "has
 * screencasts". Spanish has articles but no lessons yet, so it gets a hub while
 * staying out of anything that claims a course exists there.
 */
export const hubLangs: LessonLang[] = (['en', 'es'] as LessonLang[]).filter(
  (lang) => hubSectionsForLang(lang).length > 0,
);

/** hreflang alternates for the hub, covering every language that now has one. */
export const hubIndexAlternates = (): Alternate[] => [
  ...hubLangs.map((lang) => ({ hreflang: lang, href: `${siteBaseUrl}${learnIndexPath(lang)}` })),
  { hreflang: 'x-default', href: `${siteBaseUrl}${learnIndexPath('en')}` },
];

/** Hub index routes, one per language that has content. Lesson pages come from `learnRoutes`. */
export const hubRoutes = (): string[] => hubLangs.map((lang) => learnIndexPath(lang));

/**
 * Whole-hub durations run to hours, where "164 min" stops being a number anyone
 * pictures. Per-item times stay in minutes via `formatMinutes` — that is the
 * unit you budget a single lesson or article in.
 */
export const formatDuration = (minutes: number): string => {
  const rounded = Math.round(minutes);
  if (rounded < 90) return `${rounded} min`;
  const hours = Math.floor(rounded / 60);
  const rest = rounded % 60;
  return rest ? `${hours} h ${rest} min` : `${hours} h`;
};

export const hubTotals = (lang: LessonLang) => {
  const items = hubSectionsForLang(lang).flatMap((section) => section.items);
  return {
    lessons: items.filter((item) => item.kind === 'lesson').length,
    posts: items.filter((item) => item.kind === 'post').length,
    minutes: items.reduce((total, item) => total + item.minutes, 0),
  };
};

/**
 * Build-time guard: anything published but not placed in a section, and anything
 * placed twice or pointing at nothing. The hub is the only way in from the nav,
 * so an unplaced article is an article nobody can reach.
 */
export const hubCoverage = () => {
  const placed = hubSections.flatMap((section) => section.entries);
  const seen = new Set<string>();
  const duplicated: string[] = [];
  for (const entry of placed) {
    const id = `${entry.kind}:${entry.key}`;
    if (seen.has(id)) duplicated.push(id);
    seen.add(id);
  }

  const unknown = placed
    .filter((entry) =>
      entry.kind === 'lesson' ? !lessonsByTranslationKey.has(entry.key) : !blogPostsByTranslationKey.has(entry.key),
    )
    .map((entry) => `${entry.kind}:${entry.key}`);

  const orphaned = [
    ...[...lessonsByTranslationKey.keys()].filter((key) => !seen.has(`lesson:${key}`)).map((k) => `lesson:${k}`),
    ...[...blogPostsByTranslationKey.keys()].filter((key) => !seen.has(`post:${key}`)).map((k) => `post:${k}`),
  ];

  return { orphaned, duplicated, unknown };
};

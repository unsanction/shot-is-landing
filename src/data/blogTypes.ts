import { founder, siteBaseUrl } from './seo';

export type BlogLang = 'en' | 'es';

/*
 * Editorial pattern for citable content (GEO):
 * - The first block after every h2 answers the heading's implied question in
 *   1–2 self-contained sentences that name the entity ("AI UGC ads are…").
 * - Every numeric claim gets a `stat` block with a `sourceUrl` when the number
 *   comes from outside our own pipeline.
 * - Comparison-shaped posts carry one `table` block — tables are the single
 *   most-extracted structure by answer engines.
 * - `tldr` bullets are standalone quotable sentences, not fragments.
 */
export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string; id: string }
  | { type: 'h3'; text: string; id: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'callout'; title: string; body: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'table'; caption?: string; headers: string[]; rows: string[][] }
  | { type: 'stat'; value: string; label: string; source?: string; sourceUrl?: string };

export type BlogFaq = { question: string; answer: string };

export type BlogAuthor = {
  name: string;
  url?: string;
  /** Schema.org author type. Defaults to 'Organization' for backwards compatibility. */
  authorType?: 'Person' | 'Organization';
  /** Profile URLs (e.g. LinkedIn) emitted as schema sameAs — E-E-A-T signal. */
  sameAs?: string[];
};

export type BlogPost = {
  slug: string;
  lang: BlogLang;
  /** Shared across the EN/ES versions of the same article — this is how hreflang pairs are linked. */
  translationKey: string;
  title: string;
  /** Override for <title> if it should differ from the on-page h1. */
  metaTitle?: string;
  description: string;
  excerpt: string;
  /** ISO yyyy-mm-dd */
  datePublished: string;
  dateModified?: string;
  author: BlogAuthor;
  heroImage?: string;
  /** Key used by the OG generator -> /og/<ogImageKey>.png */
  ogImageKey: string;
  tags: string[];
  readingMinutes?: number;
  /** Key-takeaways bullets — surfaced near the top for citability (GEO). */
  tldr: string[];
  blocks: BlogBlock[];
  faq?: BlogFaq[];
};

export const defaultAuthor: BlogAuthor = {
  name: 'SHOT.IS Editorial',
  url: `${siteBaseUrl}/about`,
  authorType: 'Organization',
};

/**
 * Person authorship for experience-led posts. Resolves to the real founder
 * once `founder` in data/seo.ts is filled; falls back to the Organization
 * author until then, so posts can reference it unconditionally.
 */
export const founderAuthor: BlogAuthor = founder
  ? {
      name: founder.name,
      url: `${siteBaseUrl}/about#founder`,
      authorType: 'Person',
      ...(founder.linkedIn ? { sameAs: [founder.linkedIn] } : {}),
    }
  : defaultAuthor;

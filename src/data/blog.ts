import { siteBaseUrl } from './seo';
import type { BlogLang, BlogPost } from './blogTypes';
import { blogPosts } from './posts';

export * from './blogTypes';
export { blogPosts };

export const blogBasePath: Record<BlogLang, string> = { en: '/blog', es: '/es/blog' };

export const blogStrings: Record<BlogLang, {
  blogTitle: string;
  blogLede: string;
  keyTakeaways: string;
  readTime: (n: number) => string;
  onThisPage: string;
  faqTitle: string;
  relatedTitle: string;
  backToBlog: string;
  switchLabel: string;
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  publishedOn: string;
}> = {
  en: {
    blogTitle: 'SHOT.IS Blog',
    blogLede:
      'Field notes on AI UGC ads, AI video ads, and virtual influencers — what is working in short-form performance creative, and how brands ship more of it.',
    keyTakeaways: 'Key takeaways',
    readTime: (n) => `${n} min read`,
    onThisPage: 'On this page',
    faqTitle: 'Frequently asked questions',
    relatedTitle: 'Keep reading',
    backToBlog: 'All articles',
    switchLabel: 'Leer en español',
    ctaTitle: 'Ready to test AI content?',
    ctaBody: 'SHOT.IS helps brands generate AI UGC ads, AI video ads, and virtual influencers without traditional shoots.',
    ctaButton: 'Start an AI content sprint',
    publishedOn: 'Published',
  },
  es: {
    blogTitle: 'Blog de SHOT.IS',
    blogLede:
      'Notas sobre anuncios UGC con IA, anuncios de video con IA e influencers virtuales: qué funciona en la creatividad de performance y cómo las marcas producen más.',
    keyTakeaways: 'Puntos clave',
    readTime: (n) => `${n} min de lectura`,
    onThisPage: 'En esta página',
    faqTitle: 'Preguntas frecuentes',
    relatedTitle: 'Seguir leyendo',
    backToBlog: 'Todos los artículos',
    switchLabel: 'Read in English',
    ctaTitle: '¿Listo para probar contenido con IA?',
    ctaBody: 'SHOT.IS ayuda a las marcas a generar anuncios UGC, anuncios de video e influencers virtuales sin rodajes tradicionales.',
    ctaButton: 'Empezar un sprint de contenido',
    publishedOn: 'Publicado',
  },
};

// ── Derived lookups ─────────────────────────────────────────────────────────

const byDateDesc = (a: BlogPost, b: BlogPost) => (a.datePublished < b.datePublished ? 1 : -1);

export const blogPostsByLang: Record<BlogLang, BlogPost[]> = {
  en: blogPosts.filter((p) => p.lang === 'en').sort(byDateDesc),
  es: blogPosts.filter((p) => p.lang === 'es').sort(byDateDesc),
};

export const blogPostPath = (post: BlogPost): string =>
  post.lang === 'en' ? `/blog/${post.slug}` : `/es/blog/${post.slug}`;

export const blogIndexPath = (lang: BlogLang): string => blogBasePath[lang];

export const blogPostByPath: Map<string, BlogPost> = new Map(
  blogPosts.map((post) => [blogPostPath(post), post]),
);

export const blogPostsByTranslationKey: Map<string, Partial<Record<BlogLang, BlogPost>>> = (() => {
  const map = new Map<string, Partial<Record<BlogLang, BlogPost>>>();
  for (const post of blogPosts) {
    const entry = map.get(post.translationKey) ?? {};
    entry[post.lang] = post;
    map.set(post.translationKey, entry);
  }
  return map;
})();

/** Sibling translation of a post in the other language, if one exists. */
export const blogSibling = (post: BlogPost): BlogPost | undefined => {
  const pair = blogPostsByTranslationKey.get(post.translationKey);
  const other: BlogLang = post.lang === 'en' ? 'es' : 'en';
  return pair?.[other];
};

const absolute = (path: string) => `${siteBaseUrl}${path}`;

export type Alternate = { hreflang: string; href: string };

/**
 * hreflang alternates for a post. Always emits a self-referential alternate and an
 * x-default so reciprocity is valid even for single-language posts (Search Console
 * flags "no return tag" otherwise). x-default points to the EN version when it exists.
 */
export const blogAlternates = (post: BlogPost): Alternate[] => {
  const pair = blogPostsByTranslationKey.get(post.translationKey) ?? { [post.lang]: post };
  const alternates: Alternate[] = [];

  (Object.keys(pair) as BlogLang[]).forEach((lang) => {
    const p = pair[lang];
    if (p) alternates.push({ hreflang: lang, href: absolute(blogPostPath(p)) });
  });

  const xDefault = pair.en ?? post;
  alternates.push({ hreflang: 'x-default', href: absolute(blogPostPath(xDefault)) });

  return alternates;
};

/** hreflang alternates for the blog index pages (both languages always exist). */
export const blogIndexAlternates = (): Alternate[] => [
  { hreflang: 'en', href: absolute(blogIndexPath('en')) },
  { hreflang: 'es', href: absolute(blogIndexPath('es')) },
  { hreflang: 'x-default', href: absolute(blogIndexPath('en')) },
];

const countWords = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

export const readingTime = (post: BlogPost): number => {
  if (post.readingMinutes) return post.readingMinutes;
  let words = countWords(post.title) + countWords(post.description) + post.tldr.reduce((n, t) => n + countWords(t), 0);
  for (const block of post.blocks) {
    if ('text' in block && typeof block.text === 'string') words += countWords(block.text);
    if ('items' in block) words += block.items.reduce((n, i) => n + countWords(i), 0);
    if (block.type === 'callout') words += countWords(block.title) + countWords(block.body);
  }
  for (const f of post.faq ?? []) words += countWords(f.question) + countWords(f.answer);
  return Math.max(1, Math.round(words / 200));
};

/** All indexable blog routes: both index pages + every post path. */
export const blogRoutes = (): string[] => [
  blogIndexPath('en'),
  blogIndexPath('es'),
  ...blogPosts.map(blogPostPath),
];

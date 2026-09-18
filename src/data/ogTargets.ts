import { blogPosts } from './blog';
import { comparisonPages } from './comparisons';
import { servicePages } from './seo';
import { useCasePages } from './useCases';

export type OgKind = 'home' | 'service' | 'page' | 'article';

export type OgTarget = {
  /** Output file key -> /og/<key>.png */
  key: string;
  /** Large headline drawn on the card. */
  title: string;
  /** Small label above the headline. */
  eyebrow: string;
  kind: OgKind;
};

const staticPages: OgTarget[] = [
  { key: 'about', title: 'About SHOT.IS', eyebrow: 'AI UGC Platform + Studio', kind: 'page' },
  { key: 'contact', title: 'Start an AI content sprint', eyebrow: 'Contact', kind: 'page' },
  { key: 'pricing', title: 'AI Videos from $4.99', eyebrow: 'SHOT.IS Pricing', kind: 'page' },
  { key: 'faq', title: 'Questions, answered straight', eyebrow: 'FAQ', kind: 'page' },
  { key: 'privacy', title: 'Privacy Policy', eyebrow: 'SHOT.IS', kind: 'page' },
  { key: 'terms', title: 'Terms of Service', eyebrow: 'SHOT.IS', kind: 'page' },
];

/** Every page that needs a generated OG image, with the text drawn on it. */
export const ogTargets: OgTarget[] = [
  {
    key: 'home',
    title: 'AI UGC Ad Generator & Production Studio',
    eyebrow: 'Self-serve from $4.99',
    kind: 'home',
  },
  ...servicePages.map(
    (page): OgTarget => ({ key: page.slug, title: page.navLabel, eyebrow: page.eyebrow, kind: 'service' }),
  ),
  ...useCasePages.map(
    (page): OgTarget => ({ key: page.slug, title: page.navLabel, eyebrow: page.eyebrow, kind: 'service' }),
  ),
  ...comparisonPages.map(
    (page): OgTarget => ({ key: page.slug, title: page.navLabel, eyebrow: page.eyebrow, kind: 'page' }),
  ),
  { key: 'blog-index', title: 'SHOT.IS Blog', eyebrow: 'AI content, ads & creators', kind: 'page' },
  ...staticPages,
  ...blogPosts.map(
    (post): OgTarget => ({ key: post.ogImageKey, title: post.title, eyebrow: 'SHOT.IS Blog', kind: 'article' }),
  ),
];

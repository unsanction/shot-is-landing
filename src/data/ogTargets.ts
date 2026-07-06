import { blogPosts } from './blog';
import { servicePages } from './seo';

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
  { key: 'about', title: 'About SHOT.IS', eyebrow: 'AI Content Studio', kind: 'page' },
  { key: 'contact', title: 'Start an AI content sprint', eyebrow: 'Contact', kind: 'page' },
  { key: 'faq', title: 'Questions, answered straight', eyebrow: 'FAQ', kind: 'page' },
  { key: 'privacy', title: 'Privacy Policy', eyebrow: 'SHOT.IS', kind: 'page' },
  { key: 'terms', title: 'Terms of Service', eyebrow: 'SHOT.IS', kind: 'page' },
];

/** Every page that needs a generated OG image, with the text drawn on it. */
export const ogTargets: OgTarget[] = [
  {
    key: 'home',
    title: 'AI UGC Ads, AI Video Ads & Virtual Influencers',
    eyebrow: 'AI Content Studio',
    kind: 'home',
  },
  ...servicePages.map(
    (page): OgTarget => ({ key: page.slug, title: page.navLabel, eyebrow: page.eyebrow, kind: 'service' }),
  ),
  { key: 'blog-index', title: 'SHOT.IS Blog', eyebrow: 'AI content, ads & creators', kind: 'page' },
  ...staticPages,
  ...blogPosts.map(
    (post): OgTarget => ({ key: post.ogImageKey, title: post.title, eyebrow: 'SHOT.IS Blog', kind: 'article' }),
  ),
];

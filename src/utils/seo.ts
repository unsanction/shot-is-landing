import {
  buildDate,
  defaultImage,
  founder,
  homeSeo,
  organizationEmail,
  organizationFoundingDate,
  organizationKnowsAbout,
  organizationSameAs,
  servicePages,
  servicePagesByPath,
  siteBaseUrl,
  type ServicePageContent,
} from '../data/seo';
import {
  blogAlternates,
  blogIndexAlternates,
  blogIndexPath,
  blogPostByPath,
  blogPostPath,
  blogPostsByLang,
  blogRoutes,
  blogStrings,
  type Alternate,
  type BlogLang,
  type BlogPost,
} from '../data/blog';
import { allFaqItems, faqPageMeta } from '../data/faq';

type PageSeo = {
  path: string;
  title: string;
  description: string;
  robots?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonical?: string;
  alternates?: Alternate[];
  structuredData?: Record<string, unknown>;
  /** ISO yyyy-mm-dd — emitted as article:published_time when ogType is 'article'. */
  publishedTime?: string;
  modifiedTime?: string;
};

const absoluteUrl = (path: string) => new URL(path, siteBaseUrl).toString();

/** Strip the inline `[label](href)` / `**bold**` markup used in content strings — schema text must be plain. */
const plainText = (text: string) =>
  text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1');

/** FAQPage node for a page's visible Q&A blocks. Only emit for questions actually rendered on the page. */
export const buildFaqSchema = (url: string, faqs: Array<{ question: string; answer: string }>) => ({
  '@type': 'FAQPage',
  '@id': `${url}#faq`,
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: plainText(faq.question),
    acceptedAnswer: { '@type': 'Answer', text: plainText(faq.answer) },
  })),
});

const upsertMeta = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const upsertLink = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLLinkElement>(selector);

  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const upsertJsonLd = (id: string, data: Record<string, unknown>) => {
  let element = document.getElementById(id) as HTMLScriptElement | null;

  if (!element) {
    element = document.createElement('script');
    element.id = id;
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
};

const founderPersonSchema = founder
  ? {
      '@type': 'Person',
      '@id': `${siteBaseUrl}/about#founder`,
      name: founder.name,
      jobTitle: founder.role,
      description: founder.bio,
      url: `${siteBaseUrl}/about#founder`,
      worksFor: { '@id': `${siteBaseUrl}/#organization` },
      ...(founder.linkedIn ? { sameAs: [founder.linkedIn] } : {}),
    }
  : null;

const organizationSchema: Record<string, unknown> = {
  '@type': 'Organization',
  '@id': `${siteBaseUrl}/#organization`,
  name: 'SHOT.IS',
  url: siteBaseUrl,
  logo: `${siteBaseUrl}/favicon.svg`,
  description: 'AI content studio for UGC-style ads, virtual influencers, AI video ads, and campaign creative.',
  email: organizationEmail,
  knowsAbout: organizationKnowsAbout,
  ...(organizationFoundingDate ? { foundingDate: organizationFoundingDate } : {}),
  ...(founderPersonSchema ? { founder: { '@id': `${siteBaseUrl}/about#founder` } } : {}),
  ...(organizationSameAs.length > 0 ? { sameAs: organizationSameAs } : {}),
};

/** studio.shot.is (Forge) — the self-serve app built on the SHOT.IS pipeline. Emitted on the home page. */
const softwareApplicationSchema = {
  '@type': 'SoftwareApplication',
  '@id': 'https://studio.shot.is/#app',
  name: 'SHOT.IS Studio (Forge)',
  url: 'https://studio.shot.is/',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web',
  description:
    'Self-serve studio for generating AI ad video: reusable AI creators, product and outfit references, keyframe-to-video generation across multiple AI models, and ad assembly.',
  featureList: [
    'Reusable AI creator personas',
    'Product, outfit, and background reference images',
    'Keyframe-first image-to-video generation',
    'Multi-model routing (Veo 3, Grok Imagine, Kling)',
    'Hook variants and ad assembly',
  ],
  publisher: { '@id': `${siteBaseUrl}/#organization` },
};

const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${siteBaseUrl}/#website`,
  url: siteBaseUrl,
  name: 'SHOT.IS',
  publisher: { '@id': `${siteBaseUrl}/#organization` },
  inLanguage: 'en',
};

const buildHomeSchema = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema,
    ...(founderPersonSchema ? [founderPersonSchema] : []),
    websiteSchema,
    softwareApplicationSchema,
    {
      '@type': 'WebPage',
      '@id': `${siteBaseUrl}/#webpage`,
      url: siteBaseUrl,
      name: homeSeo.title,
      description: homeSeo.description,
      isPartOf: { '@id': `${siteBaseUrl}/#website` },
      about: { '@id': `${siteBaseUrl}/#organization` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: defaultImage,
      },
      dateModified: buildDate,
    },
    {
      '@type': 'Service',
      '@id': `${siteBaseUrl}/#ai-content-studio`,
      name: 'AI UGC ads and AI content studio',
      provider: { '@id': `${siteBaseUrl}/#organization` },
      areaServed: 'Worldwide',
      serviceType: 'AI content creation, AI UGC ads, AI video ads, virtual influencer campaigns',
      description: homeSeo.description,
      isRelatedTo: { '@id': 'https://studio.shot.is/#app' },
      offers: {
        '@type': 'OfferCatalog',
        name: 'AI content services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'AI UGC ads' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'AI video ads' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Virtual influencer campaigns' },
          },
        ],
      },
    },
    {
      '@type': 'VideoObject',
      name: 'SHOT.IS AI content studio reel',
      description: 'A short visual reel for AI UGC ads, AI video ads, and virtual creator campaigns by SHOT.IS.',
      thumbnailUrl: `${siteBaseUrl}/media/reel/visual-overload-poster.jpg`,
      uploadDate: buildDate,
      contentUrl: `${siteBaseUrl}/media/reel/visual-overload.mp4`,
      embedUrl: `${siteBaseUrl}/media/reel/visual-overload.mp4`,
      duration: 'PT12S',
    },
  ],
});

export const buildServiceSchema = (page: ServicePageContent) => ({
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema,
    websiteSchema,
    {
      '@type': 'WebPage',
      '@id': `${absoluteUrl(page.path)}#webpage`,
      url: absoluteUrl(page.path),
      name: page.title,
      description: page.description,
      isPartOf: { '@id': `${siteBaseUrl}/#website` },
      about: { '@id': `${siteBaseUrl}/#organization` },
      dateModified: buildDate,
      breadcrumb: { '@id': `${absoluteUrl(page.path)}#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${absoluteUrl(page.path)}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'SHOT.IS',
          item: siteBaseUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: page.navLabel,
          item: absoluteUrl(page.path),
        },
      ],
    },
    {
      '@type': 'Service',
      '@id': `${absoluteUrl(page.path)}#service`,
      name: page.navLabel,
      provider: { '@id': `${siteBaseUrl}/#organization` },
      areaServed: 'Worldwide',
      serviceType: page.eyebrow,
      description: page.description,
      url: absoluteUrl(page.path),
    },
    buildFaqSchema(absoluteUrl(page.path), page.questions),
  ],
});

const buildSimplePageSchema = (path: string, title: string, description: string) => ({
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema,
    websiteSchema,
    {
      '@type': 'WebPage',
      '@id': `${absoluteUrl(path)}#webpage`,
      url: absoluteUrl(path),
      name: title,
      description,
      isPartOf: { '@id': `${siteBaseUrl}/#website` },
      about: { '@id': `${siteBaseUrl}/#organization` },
      dateModified: buildDate,
    },
  ],
});

// ── Blog SEO ─────────────────────────────────────────────────────────────────

export const ogImageUrl = (key: string) => `${siteBaseUrl}/og/${key}.png`;

const blogPostMetaTitle = (post: BlogPost) => post.metaTitle ?? `${post.title} | SHOT.IS`;

export const buildBlogPostSchema = (post: BlogPost) => {
  const path = blogPostPath(post);
  const url = absoluteUrl(path);
  const image = ogImageUrl(post.ogImageKey);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      websiteSchema,
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: post.title,
        description: post.description,
        image,
        datePublished: post.datePublished,
        dateModified: post.dateModified ?? post.datePublished,
        inLanguage: post.lang,
        author: {
          '@type': post.author.authorType ?? 'Organization',
          name: post.author.name,
          url: post.author.url ?? siteBaseUrl,
        },
        publisher: { '@id': `${siteBaseUrl}/#organization` },
        mainEntityOfPage: { '@id': `${url}#webpage` },
        keywords: post.tags.join(', '),
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: blogPostMetaTitle(post),
        description: post.description,
        inLanguage: post.lang,
        isPartOf: { '@id': `${siteBaseUrl}/#website` },
        about: { '@id': `${siteBaseUrl}/#organization` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
        dateModified: post.dateModified ?? post.datePublished,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'SHOT.IS', item: siteBaseUrl },
          { '@type': 'ListItem', position: 2, name: blogStrings[post.lang].blogTitle, item: absoluteUrl(blogIndexPath(post.lang)) },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
      ...(post.faq?.length ? [buildFaqSchema(url, post.faq)] : []),
    ],
  };
};

export const buildBlogIndexSchema = (lang: BlogLang) => {
  const path = blogIndexPath(lang);
  const url = absoluteUrl(path);
  const posts = blogPostsByLang[lang];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      websiteSchema,
      {
        '@type': 'Blog',
        '@id': `${url}#blog`,
        url,
        name: blogStrings[lang].blogTitle,
        description: blogStrings[lang].blogLede,
        inLanguage: lang,
        publisher: { '@id': `${siteBaseUrl}/#organization` },
        blogPost: posts.map((post) => ({
          '@type': 'BlogPosting',
          headline: post.title,
          url: absoluteUrl(blogPostPath(post)),
          datePublished: post.datePublished,
          inLanguage: post.lang,
        })),
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: blogStrings[lang].blogTitle,
        description: blogStrings[lang].blogLede,
        inLanguage: lang,
        isPartOf: { '@id': `${siteBaseUrl}/#website` },
        about: { '@id': `${siteBaseUrl}/#organization` },
      },
    ],
  };
};

export const buildBlogPostSeo = (post: BlogPost): PageSeo => {
  const path = blogPostPath(post);
  return {
    path,
    title: blogPostMetaTitle(post),
    description: post.description,
    ogImage: ogImageUrl(post.ogImageKey),
    ogType: 'article',
    canonical: absoluteUrl(path),
    alternates: blogAlternates(post),
    structuredData: buildBlogPostSchema(post),
    publishedTime: post.datePublished,
    modifiedTime: post.dateModified ?? post.datePublished,
  };
};

export const buildBlogIndexSeo = (lang: BlogLang): PageSeo => {
  const path = blogIndexPath(lang);
  return {
    path,
    title: `${blogStrings[lang].blogTitle} — AI UGC Ads, AI Video Ads & Virtual Influencers`,
    description: blogStrings[lang].blogLede,
    ogImage: ogImageUrl('blog-index'),
    ogType: 'website',
    canonical: absoluteUrl(path),
    alternates: blogIndexAlternates(),
    structuredData: buildBlogIndexSchema(lang),
  };
};

const buildAboutSchema = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema,
    ...(founderPersonSchema ? [founderPersonSchema] : []),
    websiteSchema,
    {
      '@type': 'AboutPage',
      '@id': `${siteBaseUrl}/about#webpage`,
      url: `${siteBaseUrl}/about`,
      name: 'About SHOT.IS — AI Content Studio',
      description:
        'SHOT.IS is an AI content studio building UGC-style ads, AI video ads, and virtual influencer systems for performance marketing teams.',
      isPartOf: { '@id': `${siteBaseUrl}/#website` },
      about: { '@id': `${siteBaseUrl}/#organization` },
      mainEntity: { '@id': `${siteBaseUrl}/#organization` },
      dateModified: buildDate,
    },
  ],
});

export const aboutSeo: PageSeo = {
  path: '/about',
  title: 'About SHOT.IS — AI Content Studio',
  description:
    'SHOT.IS is an AI content studio building UGC-style ads, AI video ads, and virtual influencer systems for performance marketing teams.',
  structuredData: buildAboutSchema(),
};

export const contactSeo: PageSeo = {
  path: '/contact',
  title: 'Contact SHOT.IS — Start an AI Content Sprint',
  description:
    'Reach SHOT.IS to scope AI UGC ads, AI video ads, virtual influencer campaigns, or a creative testing pipeline.',
};

export const privacySeo: PageSeo = {
  path: '/privacy',
  title: 'Privacy Policy | SHOT.IS',
  description: 'How SHOT.IS handles personal data, contact form submissions, and analytics.',
};

export const termsSeo: PageSeo = {
  path: '/terms',
  title: 'Terms of Service | SHOT.IS',
  description: 'Terms of service governing use of SHOT.IS, including AI content output rights and disclaimers.',
};

const buildFaqPageSchema = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema,
    websiteSchema,
    {
      '@type': 'WebPage',
      '@id': `${absoluteUrl(faqPageMeta.path)}#webpage`,
      url: absoluteUrl(faqPageMeta.path),
      name: faqPageMeta.title,
      description: faqPageMeta.description,
      isPartOf: { '@id': `${siteBaseUrl}/#website` },
      about: { '@id': `${siteBaseUrl}/#organization` },
      dateModified: buildDate,
      breadcrumb: { '@id': `${absoluteUrl(faqPageMeta.path)}#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${absoluteUrl(faqPageMeta.path)}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SHOT.IS', item: siteBaseUrl },
        { '@type': 'ListItem', position: 2, name: 'FAQ', item: absoluteUrl(faqPageMeta.path) },
      ],
    },
    buildFaqSchema(absoluteUrl(faqPageMeta.path), allFaqItems),
  ],
});

export const faqSeo: PageSeo = {
  path: faqPageMeta.path,
  title: faqPageMeta.title,
  description: faqPageMeta.description,
  structuredData: buildFaqPageSchema(),
};

const STATIC_PAGES: PageSeo[] = [aboutSeo, contactSeo, faqSeo, privacySeo, termsSeo];
const STATIC_PAGES_BY_PATH = new Map(STATIC_PAGES.map((p) => [p.path, p]));

export const applySeoMeta = ({
  path,
  title,
  description,
  robots = 'index,follow,max-image-preview:large',
  ogImage,
  ogType = 'website',
  canonical,
  alternates = [],
  structuredData,
}: PageSeo) => {
  if (typeof document === 'undefined') return;

  const url = canonical ?? absoluteUrl(path);
  const image = ogImage ?? defaultImage;

  document.title = title;

  upsertMeta('meta[name="description"]', { name: 'description', content: description });
  upsertMeta('meta[name="robots"]', { name: 'robots', content: robots });
  upsertMeta('meta[property="og:type"]', { property: 'og:type', content: ogType });
  upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'SHOT.IS' });
  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
  upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
  upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url });
  upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image });
  upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
  upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
  upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });

  upsertLink('link[rel="canonical"]', { rel: 'canonical', href: url });

  // Reset hreflang alternates each call so they do not accumulate across SPA navigations.
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
  alternates.forEach(({ hreflang, href }) =>
    upsertLink(`link[rel="alternate"][hreflang="${hreflang}"]`, { rel: 'alternate', hreflang, href }),
  );

  upsertJsonLd('shot-schema', structuredData ?? buildHomeSchema());
};

export const notFoundSeo: PageSeo = {
  path: '/404',
  title: '404 · SHOT.IS',
  description: 'The requested SHOT.IS page could not be found.',
  robots: 'noindex,follow',
};

export const homeStructuredData = buildHomeSchema();

export type ResolvedPageSeo = Required<Pick<PageSeo, 'path' | 'title' | 'description' | 'robots'>> & {
  ogImage: string;
  ogType: 'website' | 'article';
  canonical: string;
  alternates: Alternate[];
  structuredData: Record<string, unknown>;
  publishedTime?: string;
  modifiedTime?: string;
};

const robotsDefault = 'index,follow,max-image-preview:large';

/** Fill PageSeo defaults into a fully-resolved object the client + prerenderer can rely on. */
const resolve = (seo: PageSeo): ResolvedPageSeo => ({
  path: seo.path,
  title: seo.title,
  description: seo.description,
  robots: seo.robots ?? robotsDefault,
  ogImage: seo.ogImage ?? defaultImage,
  ogType: seo.ogType ?? 'website',
  canonical: seo.canonical ?? absoluteUrl(seo.path),
  alternates: seo.alternates ?? [],
  structuredData: seo.structuredData ?? buildHomeSchema(),
  publishedTime: seo.publishedTime,
  modifiedTime: seo.modifiedTime,
});

/** OG key for a static page is its path without the leading slash (e.g. /about -> about). */
const staticOgKey = (path: string) => path.replace(/^\//, '') || 'home';

export const getPageSeo = (rawPath: string): ResolvedPageSeo => {
  const path = (() => {
    const trimmed = rawPath.replace(/\/+$/, '');
    return trimmed === '' || trimmed === '/index.html' ? '/' : trimmed;
  })();

  if (path === '/') {
    return resolve({
      path: '/',
      title: homeSeo.title,
      description: homeSeo.description,
      ogImage: ogImageUrl('home'),
      canonical: absoluteUrl('/'),
      structuredData: homeStructuredData,
    });
  }

  const service = servicePagesByPath.get(path);
  if (service) {
    return resolve({
      path: service.path,
      title: service.title,
      description: service.description,
      ogImage: ogImageUrl(service.slug),
      canonical: absoluteUrl(service.path),
      structuredData: buildServiceSchema(service),
    });
  }

  const blogPost = blogPostByPath.get(path);
  if (blogPost) {
    return resolve(buildBlogPostSeo(blogPost));
  }

  if (path === blogIndexPath('en') || path === blogIndexPath('es')) {
    return resolve(buildBlogIndexSeo(path === blogIndexPath('es') ? 'es' : 'en'));
  }

  const staticPage = STATIC_PAGES_BY_PATH.get(path);
  if (staticPage) {
    return resolve({
      path: staticPage.path,
      title: staticPage.title,
      description: staticPage.description,
      robots: staticPage.robots,
      ogImage: staticPage.ogImage ?? ogImageUrl(staticOgKey(staticPage.path)),
      canonical: absoluteUrl(staticPage.path),
      structuredData:
        staticPage.structuredData ?? buildSimplePageSchema(staticPage.path, staticPage.title, staticPage.description),
    });
  }

  return resolve({
    path: notFoundSeo.path,
    title: notFoundSeo.title,
    description: notFoundSeo.description,
    robots: notFoundSeo.robots ?? 'noindex,follow',
    ogImage: defaultImage,
    canonical: absoluteUrl(notFoundSeo.path),
    structuredData: buildSimplePageSchema(notFoundSeo.path, notFoundSeo.title, notFoundSeo.description),
  });
};

export const getIndexableRoutes = (): string[] => [
  '/',
  ...servicePages.map((p) => p.path),
  ...STATIC_PAGES.map((p) => p.path),
  ...blogRoutes(),
];

export type SitemapEntry = {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
  alternates: Alternate[];
};

const sitemapMeta = (path: string): { changefreq: string; priority: string } => {
  if (path === '/') return { changefreq: 'weekly', priority: '1.0' };
  if (servicePagesByPath.has(path)) return { changefreq: 'weekly', priority: '0.9' };
  if (path === faqPageMeta.path) return { changefreq: 'weekly', priority: '0.8' };
  if (path === blogIndexPath('en') || path === blogIndexPath('es')) return { changefreq: 'weekly', priority: '0.7' };
  if (blogPostByPath.has(path)) return { changefreq: 'monthly', priority: '0.6' };
  if (path === '/privacy' || path === '/terms') return { changefreq: 'yearly', priority: '0.3' };
  return { changefreq: 'monthly', priority: '0.6' };
};

/** Sitemap rows for every indexable route, with hreflang alternates + per-post lastmod. */
export const buildSitemapEntries = (): SitemapEntry[] =>
  getIndexableRoutes().map((path) => {
    const seo = getPageSeo(path);
    const post = blogPostByPath.get(path);
    const lastmod = post ? post.dateModified ?? post.datePublished : buildDate;
    const { changefreq, priority } = sitemapMeta(path);
    return { loc: seo.canonical, lastmod, changefreq, priority, alternates: seo.alternates };
  });

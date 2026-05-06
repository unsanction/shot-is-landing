import {
  buildDate,
  defaultImage,
  homeSeo,
  organizationSameAs,
  servicePages,
  servicePagesByPath,
  siteBaseUrl,
  type ServicePageContent,
} from '../data/seo';

type PageSeo = {
  path: string;
  title: string;
  description: string;
  robots?: string;
  ogImage?: string;
  structuredData?: Record<string, unknown>;
};

const absoluteUrl = (path: string) => new URL(path, siteBaseUrl).toString();

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

const organizationSchema: Record<string, unknown> = {
  '@type': 'Organization',
  '@id': `${siteBaseUrl}/#organization`,
  name: 'SHOT.IS',
  url: siteBaseUrl,
  logo: `${siteBaseUrl}/favicon.svg`,
  description: 'AI content studio for UGC-style ads, virtual influencers, AI video ads, and campaign creative.',
  ...(organizationSameAs.length > 0 ? { sameAs: organizationSameAs } : {}),
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
    websiteSchema,
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

export const aboutSeo: PageSeo = {
  path: '/about',
  title: 'About SHOT.IS — AI Content Studio',
  description:
    'SHOT.IS is an AI content studio building UGC-style ads, AI video ads, and virtual influencer systems for performance marketing teams.',
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

const STATIC_PAGES: PageSeo[] = [aboutSeo, contactSeo, privacySeo, termsSeo];
const STATIC_PAGES_BY_PATH = new Map(STATIC_PAGES.map((p) => [p.path, p]));

export const applySeoMeta = ({
  path,
  title,
  description,
  robots = 'index,follow,max-image-preview:large',
  ogImage,
  structuredData,
}: PageSeo) => {
  if (typeof document === 'undefined') return;

  const url = absoluteUrl(path);
  const image = ogImage ?? defaultImage;

  document.title = title;

  upsertMeta('meta[name="description"]', { name: 'description', content: description });
  upsertMeta('meta[name="robots"]', { name: 'robots', content: robots });
  upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
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
  canonical: string;
  structuredData: Record<string, unknown>;
};

export const getPageSeo = (rawPath: string): ResolvedPageSeo => {
  const path = (() => {
    const trimmed = rawPath.replace(/\/+$/, '');
    return trimmed === '' || trimmed === '/index.html' ? '/' : trimmed;
  })();

  const robotsDefault = 'index,follow,max-image-preview:large';

  if (path === '/') {
    return {
      path: '/',
      title: homeSeo.title,
      description: homeSeo.description,
      robots: robotsDefault,
      ogImage: defaultImage,
      canonical: absoluteUrl('/'),
      structuredData: homeStructuredData,
    };
  }

  const service = servicePagesByPath.get(path);
  if (service) {
    return {
      path: service.path,
      title: service.title,
      description: service.description,
      robots: robotsDefault,
      ogImage: service.ogImage,
      canonical: absoluteUrl(service.path),
      structuredData: buildServiceSchema(service),
    };
  }

  const staticPage = STATIC_PAGES_BY_PATH.get(path);
  if (staticPage) {
    return {
      path: staticPage.path,
      title: staticPage.title,
      description: staticPage.description,
      robots: staticPage.robots ?? robotsDefault,
      ogImage: staticPage.ogImage ?? defaultImage,
      canonical: absoluteUrl(staticPage.path),
      structuredData: buildSimplePageSchema(staticPage.path, staticPage.title, staticPage.description),
    };
  }

  return {
    path: notFoundSeo.path,
    title: notFoundSeo.title,
    description: notFoundSeo.description,
    robots: notFoundSeo.robots ?? 'noindex,follow',
    ogImage: defaultImage,
    canonical: absoluteUrl(notFoundSeo.path),
    structuredData: buildSimplePageSchema(notFoundSeo.path, notFoundSeo.title, notFoundSeo.description),
  };
};

export const getIndexableRoutes = (): string[] => ['/', ...servicePages.map((p) => p.path), ...STATIC_PAGES.map((p) => p.path)];

import { useEffect } from 'react';
import { homeSeo, servicePagesByPath } from './data/seo';
import { useCasePagesByPath } from './data/useCases';
import { comparisonPagesByPath } from './data/comparisons';
import { ComparisonPage } from './pages/ComparisonPage';
import { giftPagesBySlug } from './data/gifts';
import { blogIndexPath, blogPostByPath, blogPostsByLang } from './data/blog';
import { learnIndexPath, learnLangs, lessonByPath, lessonsByLang } from './data/lessons';
import { bespokeGiftPages } from './gifts/registry';
import { GiftPage } from './pages/GiftPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import { AboutPage } from './pages/AboutPage';
import { BlogIndexPage } from './pages/BlogIndexPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { LearnIndexPage } from './pages/LearnIndexPage';
import { LessonPage } from './pages/LessonPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { PricingPage } from './pages/PricingPage';
import { ServicePage } from './pages/ServicePage';
import { TermsPage } from './pages/TermsPage';
import {
  applySeoMeta,
  buildBlogIndexSeo,
  buildBlogPostSeo,
  buildLearnIndexSeo,
  buildLessonSeo,
  buildServiceSchema,
  getPageSeo,
  homeStructuredData,
  notFoundSeo,
} from './utils/seo';

const normalizePath = (pathname: string) => {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
};

const HOME_PATHS = new Set(['/', '/index.html']);
const STATIC_PAGES: Record<string, () => JSX.Element> = {
  '/about': () => <AboutPage />,
  '/contact': () => <ContactPage />,
  '/faq': () => <FaqPage />,
  '/pricing': () => <PricingPage />,
  '/privacy': () => <PrivacyPage />,
  '/terms': () => <TermsPage />,
};

type AppProps = {
  path?: string;
};

const giftHostnames = new Set(['gift.shot.is', 'gift.localhost']);

const getGiftSlug = (pathname: string, hostname?: string) => {
  const cleanPath = normalizePath(pathname);
  const segments = cleanPath.split('/').filter(Boolean);
  const isGiftHost = hostname ? giftHostnames.has(hostname) : false;
  const isLocalDevHost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';

  if (isGiftHost) {
    return segments[0];
  }

  if (isLocalDevHost && segments[0] === 'gift') {
    return segments[1];
  }

  return undefined;
};

const isGiftSurface = (pathname: string, hostname?: string) => {
  const cleanPath = normalizePath(pathname);
  const segments = cleanPath.split('/').filter(Boolean);
  const isLocalDevHost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';

  return Boolean(hostname && giftHostnames.has(hostname)) || (isLocalDevHost && segments[0] === 'gift');
};

function App({ path }: AppProps = {}) {
  const incoming = path ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
  const hostname = typeof window !== 'undefined' ? window.location.hostname : undefined;
  const pathname = normalizePath(incoming);
  const onGiftSurface = isGiftSurface(pathname, hostname);
  const giftSlug = getGiftSlug(pathname, hostname);
  const giftPage = giftSlug ? giftPagesBySlug.get(giftSlug) : undefined;
  const servicePage = onGiftSurface
    ? undefined
    : servicePagesByPath.get(pathname) ?? useCasePagesByPath.get(pathname);
  const comparisonPage = onGiftSurface ? undefined : comparisonPagesByPath.get(pathname);
  const blogPost = onGiftSurface ? undefined : blogPostByPath.get(pathname);
  const blogIndexLang = onGiftSurface
    ? undefined
    : pathname === blogIndexPath('en')
      ? 'en'
      : pathname === blogIndexPath('es')
        ? 'es'
        : undefined;
  const lesson = onGiftSurface ? undefined : lessonByPath.get(pathname);
  const learnIndexLang = onGiftSurface
    ? undefined
    : learnLangs.find((lang) => learnIndexPath(lang) === pathname);
  const isHome = !onGiftSurface && HOME_PATHS.has(pathname);
  const staticPage = onGiftSurface ? undefined : STATIC_PAGES[pathname];
  const isNotFound =
    !giftPage &&
    !isHome &&
    !servicePage &&
    !comparisonPage &&
    !staticPage &&
    !blogPost &&
    !blogIndexLang &&
    !lesson &&
    !learnIndexLang;

  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (giftPage) {
      applySeoMeta({
        path: `/${giftPage.slug}`,
        title: `${giftPage.businessName} video gift | SHOT.IS`,
        description: `A private SHOT.IS mini ad pack prepared for ${giftPage.businessName}.`,
        robots: 'noindex,follow',
        canonical: `https://gift.shot.is/${giftPage.slug}`,
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `${giftPage.businessName} video gift | SHOT.IS`,
          description: `A private SHOT.IS mini ad pack prepared for ${giftPage.businessName}.`,
          url: `https://gift.shot.is/${giftPage.slug}`,
        },
      });
      return;
    }

    if (servicePage) {
      applySeoMeta({
        path: servicePage.path,
        title: servicePage.title,
        description: servicePage.description,
        structuredData: buildServiceSchema(servicePage),
      });
      return;
    }

    if (comparisonPage) {
      applySeoMeta(getPageSeo(pathname));
      return;
    }

    if (blogPost) {
      applySeoMeta(buildBlogPostSeo(blogPost));
      return;
    }

    if (blogIndexLang) {
      applySeoMeta(buildBlogIndexSeo(blogIndexLang));
      return;
    }

    if (lesson) {
      applySeoMeta(buildLessonSeo(lesson));
      return;
    }

    if (learnIndexLang) {
      applySeoMeta(buildLearnIndexSeo(learnIndexLang));
      return;
    }

    if (staticPage) {
      applySeoMeta(getPageSeo(pathname));
      return;
    }

    if (isNotFound) {
      applySeoMeta(notFoundSeo);
      return;
    }

    applySeoMeta({ ...homeSeo, structuredData: homeStructuredData });
  }, [
    blogIndexLang,
    blogPost,
    comparisonPage,
    giftPage,
    isNotFound,
    learnIndexLang,
    lesson,
    pathname,
    servicePage,
    staticPage,
  ]);

  if (giftPage) {
    const BespokeGiftPage = bespokeGiftPages[giftPage.slug];
    return BespokeGiftPage ? <BespokeGiftPage page={giftPage} /> : <GiftPage page={giftPage} />;
  }

  if (servicePage) {
    return <ServicePage page={servicePage} />;
  }

  if (comparisonPage) {
    return <ComparisonPage page={comparisonPage} />;
  }

  if (blogPost) {
    return <BlogPostPage post={blogPost} />;
  }

  if (blogIndexLang) {
    return <BlogIndexPage lang={blogIndexLang} posts={blogPostsByLang[blogIndexLang]} />;
  }

  if (lesson) {
    return <LessonPage lesson={lesson} />;
  }

  if (learnIndexLang) {
    return <LearnIndexPage lang={learnIndexLang} lessons={lessonsByLang[learnIndexLang]} />;
  }

  if (staticPage) {
    return staticPage();
  }

  if (isNotFound) {
    return <NotFoundPage />;
  }

  return <HomePage />;
}

export default App;

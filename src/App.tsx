import { useEffect } from 'react';
import { homeSeo, servicePagesByPath } from './data/seo';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { ServicePage } from './pages/ServicePage';
import { TermsPage } from './pages/TermsPage';
import { applySeoMeta, buildServiceSchema, homeStructuredData, notFoundSeo } from './utils/seo';

const normalizePath = (pathname: string) => {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
};

const HOME_PATHS = new Set(['/', '/index.html']);
const STATIC_PAGES: Record<string, () => JSX.Element> = {
  '/about': () => <AboutPage />,
  '/contact': () => <ContactPage />,
  '/privacy': () => <PrivacyPage />,
  '/terms': () => <TermsPage />,
};

type AppProps = {
  path?: string;
};

function App({ path }: AppProps = {}) {
  const incoming = path ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
  const pathname = normalizePath(incoming);
  const servicePage = servicePagesByPath.get(pathname);
  const isHome = HOME_PATHS.has(pathname);
  const staticPage = STATIC_PAGES[pathname];
  const isNotFound = !isHome && !servicePage && !staticPage;

  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (servicePage) {
      applySeoMeta({
        path: servicePage.path,
        title: servicePage.title,
        description: servicePage.description,
        structuredData: buildServiceSchema(servicePage),
      });
      return;
    }

    if (isNotFound) {
      applySeoMeta(notFoundSeo);
      return;
    }

    applySeoMeta({ ...homeSeo, structuredData: homeStructuredData });
  }, [isNotFound, servicePage]);

  if (servicePage) {
    return <ServicePage page={servicePage} />;
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

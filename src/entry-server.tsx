import { renderToString } from 'react-dom/server';
import App from './App';
import {
  buildSitemapEntries,
  getIndexableRoutes,
  getPageSeo,
  type ResolvedPageSeo,
  type SitemapEntry,
} from './utils/seo';
import { ogTargets, type OgTarget } from './data/ogTargets';

export type RenderedRoute = {
  path: string;
  appHtml: string;
  seo: ResolvedPageSeo;
};

export const render = (path: string): RenderedRoute => {
  const seo = getPageSeo(path);
  const appHtml = renderToString(<App path={path} />);
  return { path, appHtml, seo };
};

export const routesToPrerender = (): string[] => getIndexableRoutes();

/** Sitemap rows (incl. hreflang alternates) for the prerender step to serialize. */
export const sitemapEntries = (): SitemapEntry[] => buildSitemapEntries();

/** OG image targets for the build-time generator. */
export { ogTargets };
export type { OgTarget };

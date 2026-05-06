import { renderToString } from 'react-dom/server';
import App from './App';
import { getIndexableRoutes, getPageSeo, type ResolvedPageSeo } from './utils/seo';

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

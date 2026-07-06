/**
 * Site-wide GA4 event plumbing. Same SSR-safe gtag guard as the gift pages
 * (src/gifts/shared.ts), generalized for the whole landing.
 *
 * Event names are snake_case (cta_click, studio_outbound_click, blog_read);
 * params are snake_case per GA4 convention so they can be registered as
 * custom dimensions. Params are invisible in GA4 reports until registered
 * in Admin → Custom definitions.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type TrackParams = Record<string, string | number>;

export const track = (eventName: string, params: TrackParams = {}) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params);
};

export type CtaLocation =
  | 'nav'
  | 'hero'
  | 'footer'
  | 'join_section'
  | 'service_page'
  | 'blog_post'
  | 'faq_page'
  | 'comparison_page'
  | 'use_case_page';

const pageContext = (): TrackParams => {
  if (typeof window === 'undefined') return { page_path: '', language: 'en' };
  const path = window.location.pathname;
  return { page_path: path, language: path === '/es' || path.startsWith('/es/') ? 'es' : 'en' };
};

/**
 * Decorate a studio.shot.is href so the studio's own analytics
 * (which captures utm_* into Postgres) can attribute the visit
 * back to the landing and the exact CTA.
 */
export const withUtm = (url: string, location: CtaLocation): string => {
  try {
    const u = new URL(url);
    u.searchParams.set('utm_source', 'shot.is');
    u.searchParams.set('utm_medium', 'landing');
    u.searchParams.set('utm_campaign', 'site');
    u.searchParams.set('utm_content', location);
    return u.toString();
  } catch {
    return url;
  }
};

export const isStudioUrl = (url: string) => url.startsWith('https://studio.shot.is');

export const trackCta = (location: CtaLocation, ctaLabel: string) =>
  track('cta_click', { location, cta_label: ctaLabel, ...pageContext() });

/** The landing's conversion: an outbound click to the studio. gtag transports
 *  via sendBeacon, so no navigation delay is needed. */
export const trackStudioClick = (location: CtaLocation) =>
  track('studio_outbound_click', { location, ...pageContext() });

import { useEffect } from 'react';
import type { GiftPageContent, GiftVideo } from '../data/gifts';

/**
 * Low-opinion shared logic for gift pages.
 *
 * IMPORTANT: this file must stay visual-style-free. Bespoke brand pages own
 * their own layout, type, color, and motion. Everything here is plumbing only:
 * analytics, download naming, and the view event. Putting visual defaults here
 * is what made every gift page look the same — don't reintroduce that.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const trackGiftEvent = (eventName: string, params: Record<string, string>) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params);
};

export const trackVideoPlay = (page: GiftPageContent, video: GiftVideo) => {
  trackGiftEvent('gift_video_play', {
    businessSlug: page.slug,
    businessName: page.businessName,
    videoTitle: video.title,
    videoAngle: video.angle,
  });
};

export const trackVideoDownload = (page: GiftPageContent, video: GiftVideo) => {
  trackGiftEvent('gift_video_download', {
    businessSlug: page.slug,
    businessName: page.businessName,
    videoTitle: video.title,
  });
};

const slugifyFilePart = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9а-яё]+/gi, '-').replace(/^-|-$/g, '');

export const getDownloadName = (page: GiftPageContent, video: GiftVideo, index = 0) =>
  video.downloadName ?? `${page.slug}-${slugifyFilePart(video.title) || `concept-${index + 1}`}.mp4`;

/** Fire a single gift_view event on mount. */
export const useGiftView = (page: GiftPageContent) => {
  useEffect(() => {
    trackGiftEvent('gift_view', {
      businessSlug: page.slug,
      businessName: page.businessName,
    });
  }, [page.slug, page.businessName]);
};

import { useEffect } from 'react';
import { track } from '../lib/track';

const MILESTONES = [25, 50, 75, 100];

/** Fire blog_read at 25/50/75/100% scroll depth, once per milestone per mount. */
export const useReadProgress = (slug: string, language: string) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const fired = new Set<number>();
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const pct = scrollable <= 0 ? 100 : Math.round((window.scrollY / scrollable) * 100);
      for (const milestone of MILESTONES) {
        if (pct >= milestone && !fired.has(milestone)) {
          fired.add(milestone);
          track('blog_read', { slug, language, milestone });
        }
      }
      if (fired.size === MILESTONES.length) window.removeEventListener('scroll', onScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [slug, language]);
};

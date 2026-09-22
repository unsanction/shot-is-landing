import { useEffect, useRef } from 'react';

/**
 * Hairline progress bar pinned under the nav. Written straight to the DOM on a
 * rAF, never through state, so it costs nothing on a page that already has a
 * scroll-driven stage doing real work.
 */
export function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;

    let queued = false;
    const update = () => {
      queued = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const pct = scrollable <= 0 ? 1 : Math.min(1, Math.max(0, window.scrollY / scrollable));
      el.style.transform = `scaleX(${pct.toFixed(4)})`;
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="bx-progress" aria-hidden="true">
      <div ref={ref} className="bx-progress__fill" />
    </div>
  );
}

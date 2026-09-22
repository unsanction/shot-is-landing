import { useEffect, useRef, useState } from 'react';

/**
 * Drives the scrollytelling stage.
 *
 * Two jobs, deliberately split by cost:
 *  - **Which scene is on stage** is React state, because swapping the visual is a
 *    render. It changes a handful of times per article.
 *  - **How far through that scene you are** is written straight to the DOM as the
 *    `--p` custom property, never through React. Visuals consume it in CSS, so
 *    scrolling costs one style write per frame instead of a render pass.
 *
 * `--p` starts at 1 (the CSS initial value), which is also what the server
 * renders: a no-JS or pre-hydration reader sees every diagram in its finished
 * state rather than an empty frame. The driver eases into the real value on mount
 * instead of snapping, so that correction reads as the intro animation.
 */

/** Fraction of the viewport height that counts as the reader's eye line. */
const READ_LINE = 0.45;
/** A section's progress saturates before its end so the finished state is legible. */
const SATURATE_AT = 0.72;
/** Per-frame easing toward the scroll-derived target. Also smooths the hydration jump. */
const LERP = 0.18;
const EPSILON = 0.0008;

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

type Driven = { el: HTMLElement; target: number; current: number };

export function useSceneDriver(rootRef: React.RefObject<HTMLElement>, reduced: boolean) {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === 'undefined') return;

    const sections = Array.from(root.querySelectorAll<HTMLElement>('[data-scene-section]'));
    if (!sections.length) return;

    const stage = root.querySelector<HTMLElement>('[data-scene-stage]');
    // Mobile renders the visual inline under each heading instead of on the sticky
    // stage, so those figures need their own progress rather than the stage's.
    const figures = sections.map((s) => s.querySelector<HTMLElement>('[data-scene-figure]'));

    if (reduced) {
      // Reduced motion keeps the morphing stage (it is information, not decoration)
      // but every diagram sits at its finished state.
      stage?.style.setProperty('--p', '1');
      figures.forEach((f) => f?.style.setProperty('--p', '1'));
    }

    const driven: Driven[] = [];
    if (stage) driven.push({ el: stage, target: 0, current: 1 });
    figures.forEach((f) => f && driven.push({ el: f, target: 0, current: 1 }));

    let frame = 0;
    let queued = false;

    const measure = () => {
      const viewport = window.innerHeight;
      const readLine = viewport * READ_LINE;

      let nextActive = 0;
      for (let i = 0; i < sections.length; i += 1) {
        if (sections[i].getBoundingClientRect().top <= readLine) nextActive = i;
      }

      if (nextActive !== activeRef.current) {
        activeRef.current = nextActive;
        setActive(nextActive);
      }

      if (stage) {
        const rect = sections[nextActive].getBoundingClientRect();
        const span = Math.max(1, rect.height * SATURATE_AT);
        const entry = driven.find((d) => d.el === stage);
        if (entry) entry.target = clamp01((readLine - rect.top) / span);
      }

      sections.forEach((_, i) => {
        const fig = figures[i];
        if (!fig) return;
        const entry = driven.find((d) => d.el === fig);
        if (!entry) return;
        // Hidden at this breakpoint — offsetParent is null, so there is nothing to drive.
        if (fig.offsetParent === null) return;
        const rect = fig.getBoundingClientRect();
        const travel = viewport * 0.55;
        entry.target = clamp01((viewport - rect.top) / Math.max(1, travel));
      });
    };

    const tick = () => {
      let settled = true;
      for (const d of driven) {
        const delta = d.target - d.current;
        if (Math.abs(delta) < EPSILON) {
          d.current = d.target;
        } else {
          d.current += delta * LERP;
          settled = false;
        }
        d.el.style.setProperty('--p', d.current.toFixed(4));
      }
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        measure();
        if (!reduced && !frame) frame = requestAnimationFrame(tick);
      });
    };

    measure();
    if (!reduced) frame = requestAnimationFrame(tick);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced, rootRef]);

  return active;
}

/**
 * Counts a set of numbers up once, the first time `el` is on screen.
 *
 * Kept separate from the scroll driver on purpose: a number that races backwards
 * when you scroll up reads as a bug, so these run once and stay put. Returns the
 * final values until mount, which is what the server renders.
 */
export function useCountUp<T extends Element>(values: number[], reduced: boolean) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(values);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || done.current || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || done.current) return;
        done.current = true;
        observer.disconnect();

        const start = performance.now();
        const duration = 900;
        const step = (now: number) => {
          const t = clamp01((now - start) / duration);
          // easeOutCubic — fast off the line, settles rather than stops dead.
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(values.map((v) => v * eased));
          if (t < 1) requestAnimationFrame(step);
        };
        setShown(values.map(() => 0));
        requestAnimationFrame(step);
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
    // `values` is spread into the dep list so a spec change restarts the count.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, ...values]);

  return { ref, shown };
}

import { useEffect, useRef, useState } from 'react';
import { trackStudioClick, withUtm } from '../../lib/track';

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const widthQuery = window.matchMedia('(min-width: 768px)');

    const evaluate = () => {
      const wantsMotion = !motionQuery.matches;
      const isWide = widthQuery.matches;
      setShouldPlay(wantsMotion && isWide);
    };

    evaluate();
    motionQuery.addEventListener('change', evaluate);
    widthQuery.addEventListener('change', evaluate);

    return () => {
      motionQuery.removeEventListener('change', evaluate);
      widthQuery.removeEventListener('change', evaluate);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!shouldPlay) {
      video.pause();
      return;
    }

    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    const start = () => {
      void video.play().catch(() => {
        // Autoplay may be blocked; the poster remains visible as fallback.
      });
    };

    if (typeof idle === 'function') {
      idle(start);
    } else {
      window.setTimeout(start, 250);
    }
  }, [shouldPlay]);

  return (
    <section className="relative flex min-h-[100dvh] w-full scroll-mt-16 flex-col items-center justify-center overflow-hidden px-5 pb-28 pt-32 text-center md:px-8">
      <div className="hero-stage" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero-stage__video"
          loop
          muted
          playsInline
          preload="none"
          poster="/media/hero/shot-hero-poster.webp"
        >
          {shouldPlay ? <source src="/media/hero/shot-hero-loop.mp4" type="video/mp4" /> : null}
        </video>
        <div className="hero-stage__veil" />
        <div className="hero-stage__grid" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <h1 className="mb-12 text-[clamp(2.05rem,9vw,8.75rem)] font-extrabold uppercase leading-[0.88] tracking-tight md:leading-[0.82]">
          AI UGC ADS <br />
          <span className="text-exclusion-fill italic">
            THAT SHIP <br className="sm:hidden" />
            IN DAYS.
          </span>
        </h1>
        <p className="mx-auto mb-16 max-w-3xl text-lg font-medium leading-tight text-white/40 sm:text-xl md:text-3xl">
          SHOT.IS is an AI video studio for paid social — UGC-style ad variants, human-reviewed before they ship,
          built in days instead of the weeks a traditional shoot takes.
        </p>
        <a
          href={withUtm('https://studio.shot.is/', 'hero')}
          onClick={() => trackStudioClick('hero')}
          className="inline-block bg-white px-8 py-5 text-xs font-black uppercase tracking-[0.3em] text-black transition-all hover:-rotate-1 hover:bg-accent hover:text-white active:scale-95 md:px-12 md:py-6 md:text-sm"
        >
          Start Creating AI Content
        </a>
      </div>

      <div className="absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-4 opacity-30">
        <span className="font-mono text-[9px] uppercase tracking-widest">Scroll</span>
        <div className="h-16 w-px bg-white" />
      </div>
    </section>
  );
}

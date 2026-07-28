import { FilmStrip } from './FilmStrip';

export function VisionSection() {
  return (
    <section id="vision" className="relative bg-black px-5 py-28 md:px-8 md:py-40" style={{ marginTop: '-1px' }}>
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-16 md:mb-24">
          <h2 className="mb-8 text-4xl font-black uppercase tracking-tight italic sm:text-5xl md:text-[72px] lg:text-[84px] xl:text-8xl">
            Feed-Native <span className="text-exclusion-fill">AI Content.</span>
          </h2>
          <p className="text-lg font-medium italic text-white/55 md:text-xl">
            &quot;We build AI visuals and videos that feel native to social platforms, clear enough for ads, and
            distinctive enough for brands.&quot;
          </p>
        </div>
      </div>

      <FilmStrip />
    </section>
  );
}

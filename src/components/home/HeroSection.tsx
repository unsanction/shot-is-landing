export function HeroSection() {
  return (
    <section className="relative flex min-h-[100dvh] scroll-mt-16 flex-col items-center justify-center px-5 pb-28 pt-32 text-center md:px-8">
      <div className="hero-stage" aria-hidden="true">
        <video
          className="hero-stage__video"
          autoPlay
          loop
          muted
          playsInline
          poster="/media/hero/shot-hero-poster.webp"
        >
          <source src="/media/hero/shot-hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="hero-stage__veil" />
        <div className="hero-stage__grid" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <h1 className="mb-12 text-5xl font-extrabold uppercase leading-[0.82] tracking-tight sm:text-6xl md:text-[72px] lg:text-[110px] xl:text-[140px]">
          THE SHOT IS <br />
          <span className="text-outline italic">YOUR POWER.</span>
        </h1>
        <p className="mx-auto mb-16 max-w-3xl text-lg font-medium leading-tight text-white/40 sm:text-xl md:text-3xl">
          We are a digital foundry forging the next era of creators. No rules. No limits. Just pure visual dominance.
        </p>
        <a
          href="#join"
          className="inline-block bg-white px-8 py-5 text-xs font-black uppercase tracking-[0.3em] text-black transition-all hover:-rotate-1 hover:bg-accent hover:text-white active:scale-95 md:px-12 md:py-6 md:text-sm"
        >
          Apply for Whitelist
        </a>
      </div>

      <div className="absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-4 opacity-30">
        <span className="font-mono text-[9px] uppercase tracking-widest">Scroll to descend</span>
        <div className="h-16 w-px bg-white" />
      </div>
    </section>
  );
}

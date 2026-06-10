import { HomeNav } from '../components/home/HomeNav';

function NotFoundPage() {
  return (
    <div className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-black text-white">
      <div className="grain" aria-hidden="true" />
      <HomeNav />

      <main className="relative flex flex-1 flex-col items-center justify-center px-5 pb-28 pt-32 text-center md:px-8">
        <div className="hero-stage" aria-hidden="true">
          <div className="hero-stage__grid" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <p className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-accent md:text-xs">
            Error 404 — Frame not found
          </p>
          <h1 className="mb-12 text-[clamp(2.05rem,9vw,8.75rem)] font-extrabold uppercase leading-[0.88] tracking-tight md:leading-[0.82]">
            The shot <br />
            <span className="text-exclusion-fill italic">is gone.</span>
          </h1>
          <p className="mx-auto mb-16 max-w-2xl text-lg font-medium leading-tight text-white/40 sm:text-xl md:text-2xl">
            The page you&apos;re looking for has wandered off the set. Head back to base and keep creating.
          </p>
          <a
            href="/"
            className="inline-block bg-white px-8 py-5 text-xs font-black uppercase tracking-[0.3em] text-black transition-all hover:-rotate-1 hover:bg-accent hover:text-white active:scale-95 md:px-12 md:py-6 md:text-sm"
          >
            Return to base
          </a>
        </div>

        <div className="absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-4 opacity-30">
          <span className="font-mono text-[9px] uppercase tracking-widest">Signal lost</span>
          <div className="h-16 w-px bg-white" />
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;

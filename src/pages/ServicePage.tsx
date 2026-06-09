import { HomeFooter } from '../components/home/HomeFooter';
import { HomeNav } from '../components/home/HomeNav';
import type { ServicePageContent } from '../data/seo';
import { servicePages } from '../data/seo';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

type ServicePageProps = {
  page: ServicePageContent;
};

export function ServicePage({ page }: ServicePageProps) {
  useRevealOnScroll();

  const relatedPages = servicePages.filter((candidate) => candidate.path !== page.path);

  return (
    <div className="min-h-screen bg-black text-white selection:text-accent">
      <div className="grain" aria-hidden="true" />
      <HomeNav />

      <main>
        <section className="relative w-full overflow-hidden px-5 pb-24 pt-36 md:px-8 md:pb-32 md:pt-44">
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

          <div className="relative z-10 mx-auto max-w-7xl">
            <p className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-accent">
              {page.eyebrow}
            </p>
            <h1 className="max-w-6xl text-[clamp(2.05rem,8.5vw,7.375rem)] font-extrabold uppercase leading-[0.9] tracking-tight sm:leading-[0.88]">
              {page.h1}
            </h1>
            <p className="mt-10 max-w-3xl text-lg font-medium leading-tight text-white/50 md:text-2xl">
              {page.lede}
            </p>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <a
                href="https://studio.shot.is/"
                className="inline-flex items-center justify-center bg-white px-8 py-5 text-xs font-black uppercase tracking-[0.26em] text-black transition-all hover:-rotate-1 hover:bg-accent hover:text-white md:px-10"
              >
                {page.primaryCta}
              </a>
              <a
                href="#workflow"
                className="inline-flex items-center justify-center border border-white/15 px-8 py-5 text-xs font-black uppercase tracking-[0.26em] text-white transition-colors hover:border-accent hover:text-accent md:px-10"
              >
                {page.secondaryCta}
              </a>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-24 text-black md:px-8 md:py-32">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div data-reveal className="reveal-text">
              <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
                Campaign outputs
              </p>
              <h2 className="text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-[72px]">
                What clients can create.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {page.outputs.map((output, index) => (
                <article
                  key={output}
                  data-reveal
                  className="reveal-text rounded-[4px] border border-black/10 p-6 md:p-8"
                  style={{ transitionDelay: `${index * 0.07}s` }}
                >
                  <div className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
                    0{index + 1}
                  </div>
                  <p className="text-base font-bold leading-relaxed text-black/70 md:text-lg">{output}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="bg-[#050505] px-5 py-24 text-white md:px-8 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 max-w-4xl">
              <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
                Workflow
              </p>
              <h2 className="text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-[72px]">
                From brief to campaign-ready assets.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {page.workflow.map((step, index) => (
                <article
                  key={step.title}
                  data-reveal
                  className="reveal-text rounded-[4px] border border-white/10 bg-white/[0.03] p-6 md:p-8"
                  style={{ transitionDelay: `${index * 0.07}s` }}
                >
                  <div className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                    0{index + 1}
                  </div>
                  <h3 className="text-2xl font-black uppercase leading-none tracking-tight md:text-3xl">{step.title}</h3>
                  <p className="mt-5 text-sm font-medium leading-relaxed text-white/48 md:text-base">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-black px-5 py-24 text-white md:px-8 md:py-32">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-3">
            {page.proof.map((item, index) => (
              <article
                key={item.label}
                data-reveal
                className="reveal-text rounded-[4px] border border-white/10 p-6 md:p-8"
                style={{ transitionDelay: `${index * 0.07}s` }}
              >
                <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                  {item.label}
                </p>
                <p className="text-sm font-medium leading-relaxed text-white/55 md:text-base">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#050505] px-5 py-24 text-white md:px-8 md:py-32">
          <div className="mx-auto max-w-5xl">
            <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
              Case in motion
            </p>
            <h2 className="mb-10 text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-[64px]">
              {page.caseStudy.client}
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <article data-reveal className="reveal-text rounded-[4px] border border-white/10 p-6 md:p-8">
                <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/45">
                  Challenge
                </p>
                <p className="text-base font-medium leading-relaxed text-white/70">{page.caseStudy.challenge}</p>
              </article>
              <article data-reveal className="reveal-text rounded-[4px] border border-accent/40 bg-accent/5 p-6 md:p-8">
                <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                  Outcome
                </p>
                <p className="text-base font-medium leading-relaxed text-white/80">{page.caseStudy.outcome}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-24 text-black md:px-8 md:py-32">
          <div className="mx-auto max-w-5xl">
            <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
              Questions
            </p>
            <h2 className="mb-12 text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-[72px]">
              What teams ask before starting.
            </h2>
            <div className="space-y-4">
              {page.questions.map((item, index) => (
                <article
                  key={item.question}
                  data-reveal
                  className="reveal-text rounded-[4px] border border-black/10 p-6 md:p-8"
                  style={{ transitionDelay: `${index * 0.07}s` }}
                >
                  <h3 className="text-2xl font-black uppercase leading-tight tracking-tight">{item.question}</h3>
                  <p className="mt-5 text-base font-medium leading-relaxed text-black/58">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-accent px-5 py-24 text-white md:px-8 md:py-32">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-10 text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-[72px]">
              Related AI content services.
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {relatedPages.map((related) => (
                <a
                  key={related.path}
                  href={related.path}
                  className="rounded-[4px] border border-white/20 bg-black/20 p-6 transition-colors hover:bg-black/40 md:p-8"
                >
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-white/65">
                    {related.eyebrow}
                  </p>
                  <h3 className="mt-5 text-2xl font-black uppercase leading-none tracking-tight md:text-3xl">
                    {related.navLabel}
                  </h3>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <HomeFooter />
    </div>
  );
}

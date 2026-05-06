import { homeAnswerBlocks, servicePages } from '../../data/seo';

const workflowSteps = [
  {
    title: 'Research the intent',
    body: 'We define the audience, platform, product promise, search demand, and creative angles before generating assets.',
  },
  {
    title: 'Create the system',
    body: 'Each sprint gets creator personas, scripts, visual rules, hooks, captions, and variants that can keep scaling.',
  },
  {
    title: 'Ship campaign assets',
    body: 'The output is built for paid social testing, landing pages, social posts, launch moments, and localized creative.',
  },
];

export function SeoGrowthSection() {
  return (
    <>
      <section id="services" className="bg-[#050505] px-5 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-4xl md:mb-20">
            <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
              AI content services
            </p>
            <h2 className="text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-[76px] lg:text-[96px]">
              Start creating AI content that can rank, sell, and scale.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {servicePages.map((page, index) => (
              <a
                key={page.path}
                data-reveal
                href={page.path}
                className="reveal-text group flex min-h-[320px] flex-col justify-between rounded-[4px] border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-accent hover:bg-accent/10 md:p-8"
                style={{ transitionDelay: `${index * 0.08}s` }}
              >
                <div>
                  <p className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-white/35">
                    {page.eyebrow}
                  </p>
                  <h3 className="break-words text-[1.65rem] font-black uppercase leading-none tracking-tight sm:text-3xl xl:text-4xl">
                    {page.navLabel}
                  </h3>
                  <p className="mt-6 text-sm font-medium leading-relaxed text-white/45 md:text-base">{page.description}</p>
                </div>
                <span className="mt-10 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-accent transition-colors group-hover:text-white">
                  Open service
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="bg-white px-5 py-24 text-black md:px-8 md:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 xl:grid-cols-[0.9fr_1.1fr] xl:gap-20">
          <div data-reveal className="reveal-text">
            <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
              AI SEO + creative workflow
            </p>
            <h2 className="text-[2rem] font-black uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-[72px]">
              Built for search intent and ad testing.
            </h2>
            <p className="mt-8 max-w-xl text-base font-semibold leading-relaxed text-black/55 md:text-lg">
              The same content system can support Google discovery, AI answer engines, short-form ads, social posts,
              product explainers, and campaign landing pages.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {workflowSteps.map((step, index) => (
              <article
                key={step.title}
                data-reveal
                className="reveal-text rounded-[4px] border border-black/10 p-6 md:p-8"
                style={{ transitionDelay: `${index * 0.08}s` }}
              >
                <div className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                  0{index + 1}
                </div>
                <h3 className="break-words text-2xl font-black uppercase leading-none tracking-tight md:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm font-medium leading-relaxed text-black/55 md:text-base">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="answers" className="bg-black px-5 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-4xl">
            <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
              Direct answers
            </p>
            <h2 className="text-[2rem] font-black uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-[72px]">
              For brands searching where to start.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {homeAnswerBlocks.map((block, index) => (
              <article
                key={block.title}
                data-reveal
                className="reveal-text rounded-[4px] border border-white/10 bg-white/[0.03] p-6 md:p-8"
                style={{ transitionDelay: `${index * 0.08}s` }}
              >
                <h3 className="text-2xl font-black uppercase leading-none tracking-tight">{block.title}</h3>
                <p className="mt-5 text-sm font-medium leading-relaxed text-white/48 md:text-base">{block.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

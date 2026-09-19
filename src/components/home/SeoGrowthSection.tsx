import { homeAnswerBlocks, servicePages } from '../../data/seo';

const workflowSteps = [
  {
    title: 'Brief the campaign',
    body: 'Define the audience, the offer, the platform, the product truth, and the creative hypothesis each variant tests.',
  },
  {
    title: 'Generate with references',
    body: 'Lock the creator, product, scene, and approved keyframes before you spend on motion. Change only the branch that needs another take.',
  },
  {
    title: 'Ship named variants',
    body: 'Export platform-ready videos with clear hook and angle names, then expand the concepts that earn a stronger signal.',
  },
];

export function SeoGrowthSection() {
  return (
    <>
      <section id="services" className="bg-[#050505] px-5 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-4xl md:mb-20">
            <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
              Managed AI ad services
            </p>
            <h2 className="text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-[64px] lg:text-[82px] xl:text-[96px]">
              One production system. Three commercial jobs.
            </h2>
          </div>

          {/* Two-up until xl: at md a third of the row is too narrow for
              "Virtual Influencers" and the title breaks mid-word. */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {servicePages.map((page, index) => (
              <a
                key={page.path}
                data-reveal
                href={page.path}
                className="reveal-text group flex min-h-[320px] flex-col justify-between rounded-[4px] border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-accent hover:bg-accent/10 md:p-8"
                style={{ transitionDelay: `${index * 0.08}s` }}
              >
                <div>
                  <p className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-white/55">
                    {page.eyebrow}
                  </p>
                  <h3 className="break-words text-[clamp(1.25rem,5.5vw,1.55rem)] font-black uppercase leading-none tracking-tight xl:text-[1.65rem]">
                    {page.navLabel}
                  </h3>
                  <p className="mt-6 text-sm font-medium leading-relaxed text-white/62 md:text-base">{page.description}</p>
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
              AI ad production workflow
            </p>
            <h2 className="text-[2rem] font-black uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-[72px]">
              Built for creative testing, not one-off renders.
            </h2>
            <p className="mt-8 max-w-xl text-base font-semibold leading-relaxed text-black/55 md:text-lg">
              References, prompts, models, QA, and final assembly stay connected, so a winning direction turns into
              more hooks, formats, and markets without rebuilding the campaign from zero.
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
                <p className="mt-5 text-sm font-medium leading-relaxed text-white/62 md:text-base">{block.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

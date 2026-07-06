import { HomeFooter } from '../components/home/HomeFooter';
import { HomeNav } from '../components/home/HomeNav';
import { faqGroups, faqPageMeta } from '../data/faq';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { trackStudioClick, withUtm } from '../lib/track';

export function FaqPage() {
  useRevealOnScroll();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="grain" aria-hidden="true" />
      <HomeNav />

      <main>
        <section className="px-5 pt-36 pb-16 md:px-8 md:pt-44 md:pb-24">
          <div className="mx-auto max-w-5xl">
            <p className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-accent">
              {faqPageMeta.eyebrow}
            </p>
            <h1 className="text-[clamp(2rem,7vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-tight">
              {faqPageMeta.h1}
            </h1>
            <p className="mt-10 max-w-3xl text-lg font-medium leading-relaxed text-white/55 md:text-xl">
              {faqPageMeta.lede}
            </p>
          </div>
        </section>

        {faqGroups.map((group, groupIndex) => (
          <section
            key={group.heading}
            className={
              groupIndex % 2 === 0
                ? 'bg-white px-5 py-20 text-black md:px-8 md:py-28'
                : 'bg-[#050505] px-5 py-20 text-white md:px-8 md:py-28'
            }
          >
            <div className="mx-auto max-w-5xl">
              <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-3xl font-black uppercase leading-[0.92] tracking-tight sm:text-4xl md:text-[52px]">
                  {group.heading}
                </h2>
                {group.relatedPath ? (
                  <a
                    href={group.relatedPath}
                    className="font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-accent transition-colors hover:opacity-70"
                  >
                    {group.relatedLabel} →
                  </a>
                ) : null}
              </div>
              <div className="space-y-4">
                {group.items.map((item, index) => (
                  <article
                    key={item.question}
                    data-reveal
                    className={
                      groupIndex % 2 === 0
                        ? 'reveal-text rounded-[4px] border border-black/10 p-6 md:p-8'
                        : 'reveal-text rounded-[4px] border border-white/10 bg-white/[0.03] p-6 md:p-8'
                    }
                    style={{ transitionDelay: `${index * 0.07}s` }}
                  >
                    <h3 className="text-xl font-black uppercase leading-tight tracking-tight md:text-2xl">
                      {item.question}
                    </h3>
                    <p
                      className={
                        groupIndex % 2 === 0
                          ? 'mt-5 text-base font-medium leading-relaxed text-black/58'
                          : 'mt-5 text-base font-medium leading-relaxed text-white/55'
                      }
                    >
                      {item.answer}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="bg-accent px-5 py-20 text-white md:px-8 md:py-28">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl">
              Still deciding? Test it.
            </h2>
            <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-white/85 md:text-lg">
              The fastest answer is a real variant in your ad account. Start a sprint or generate in the studio
              yourself.
            </p>
            <a
              href={withUtm('https://studio.shot.is/', 'faq_page')}
              onClick={() => trackStudioClick('faq_page')}
              className="mt-8 inline-flex items-center justify-center bg-white px-9 py-5 text-xs font-black uppercase tracking-[0.26em] text-black transition-all hover:-rotate-1 hover:bg-black hover:text-white"
            >
              Open the studio
            </a>
          </div>
        </section>
      </main>

      <HomeFooter />
    </div>
  );
}

export default FaqPage;

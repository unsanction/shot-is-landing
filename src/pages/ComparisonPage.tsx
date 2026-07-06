import { HomeFooter } from '../components/home/HomeFooter';
import { HomeNav } from '../components/home/HomeNav';
import type { ComparisonPageContent } from '../data/comparisonTypes';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { trackStudioClick, withUtm } from '../lib/track';

type ComparisonPageProps = {
  page: ComparisonPageContent;
};

const formatAsOf = (iso: string) =>
  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).format(new Date(`${iso}T00:00:00Z`));

export function ComparisonPage({ page }: ComparisonPageProps) {
  useRevealOnScroll();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="grain" aria-hidden="true" />
      <HomeNav />

      <main>
        <section className="px-5 pt-36 pb-16 md:px-8 md:pt-44 md:pb-24">
          <div className="mx-auto max-w-5xl">
            <p className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-accent">
              {page.eyebrow}
            </p>
            <h1 className="text-[clamp(1.9rem,6vw,4.75rem)] font-extrabold uppercase leading-[0.92] tracking-tight">
              {page.h1}
            </h1>
            <p className="mt-10 max-w-3xl text-lg font-medium leading-relaxed text-white/55 md:text-xl">
              {page.lede}
            </p>
          </div>
        </section>

        {/* Verdict — the extractable "short answer" comes first */}
        <section className="bg-white px-5 py-20 text-black md:px-8 md:py-28">
          <div className="mx-auto max-w-5xl">
            <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
              The short answer
            </p>
            <p className="max-w-4xl text-xl font-bold leading-relaxed text-black/80 md:text-2xl">{page.verdict}</p>
          </div>
        </section>

        {page.kind === 'vs' ? (
          <>
            <section className="bg-[#050505] px-5 py-20 text-white md:px-8 md:py-28">
              <div className="mx-auto max-w-5xl">
                <h2 className="mb-10 text-3xl font-black uppercase leading-[0.92] tracking-tight sm:text-4xl md:text-[52px]">
                  Side by side
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <caption className="mb-4 text-left font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-white/40">
                      {page.tableCaption} · facts checked {formatAsOf(page.asOf)}
                    </caption>
                    <thead>
                      <tr className="border-b-2 border-white/60">
                        <th className="py-4 pr-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                          Feature
                        </th>
                        <th className="py-4 pr-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                          SHOT.IS
                        </th>
                        <th className="py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                          {page.competitor.name}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {page.rows.map((row) => (
                        <tr key={row.feature} className="border-b border-white/10 align-top">
                          <th scope="row" className="py-4 pr-4 text-sm font-bold text-white/85 md:text-base">
                            {row.feature}
                          </th>
                          <td className="py-4 pr-4 text-sm font-medium leading-relaxed text-white/65 md:text-base">
                            {row.shotIs}
                          </td>
                          <td className="py-4 text-sm font-medium leading-relaxed text-white/65 md:text-base">
                            {row.competitor}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-6 max-w-3xl text-sm font-medium leading-relaxed text-white/40">
                  {page.competitor.name}: {page.competitor.oneLiner} Features and pricing change — verify current
                  details at{' '}
                  <a
                    href={page.competitor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 underline underline-offset-4 hover:text-accent"
                  >
                    {page.competitor.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                  </a>
                  .
                </p>
              </div>
            </section>

            <section className="bg-black px-5 py-20 text-white md:px-8 md:py-28">
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
                <article data-reveal className="reveal-text rounded-[4px] border border-white/10 p-6 md:p-8">
                  <p className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/45">
                    Choose {page.competitor.name} if
                  </p>
                  <ul className="space-y-4">
                    {page.whenToChooseThem.map((item) => (
                      <li key={item} className="flex gap-3.5 text-base font-medium leading-relaxed text-white/65">
                        <span aria-hidden="true" className="mt-[0.55em] h-[7px] w-[7px] flex-none bg-white/40" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
                <article data-reveal className="reveal-text rounded-[4px] border border-accent/40 bg-accent/5 p-6 md:p-8">
                  <p className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                    Choose SHOT.IS if
                  </p>
                  <ul className="space-y-4">
                    {page.whenToChooseUs.map((item) => (
                      <li key={item} className="flex gap-3.5 text-base font-medium leading-relaxed text-white/80">
                        <span aria-hidden="true" className="mt-[0.55em] h-[7px] w-[7px] flex-none bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </section>
          </>
        ) : (
          <section className="bg-[#050505] px-5 py-20 text-white md:px-8 md:py-28">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-4 text-3xl font-black uppercase leading-[0.92] tracking-tight sm:text-4xl md:text-[52px]">
                The options, honestly
              </h2>
              <p className="mb-10 font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-white/40">
                Facts checked {formatAsOf(page.asOf)} · each tool is strongest at something different
              </p>
              <ol className="space-y-4">
                {page.alternatives.map((alt, index) => (
                  <li key={alt.name}>
                    <article
                      data-reveal
                      className="reveal-text rounded-[4px] border border-white/10 bg-white/[0.03] p-6 md:p-8"
                      style={{ transitionDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <h3 className="text-2xl font-black uppercase leading-none tracking-tight md:text-3xl">
                          <span aria-hidden="true" className="mr-3 font-mono text-sm font-bold text-accent">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          {alt.name}
                        </h3>
                        <a
                          href={alt.url}
                          {...(alt.url.startsWith('/') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                          className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white/45 transition-colors hover:text-accent"
                        >
                          {alt.url.replace(/^https?:\/\//, '').replace(/\/$/, '')} →
                        </a>
                      </div>
                      <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-accent">
                        Best for: {alt.bestFor}
                      </p>
                      <p className="mt-4 max-w-3xl text-base font-medium leading-relaxed text-white/60">
                        {alt.summary}
                      </p>
                    </article>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        <section className="bg-white px-5 py-20 text-black md:px-8 md:py-28">
          <div className="mx-auto max-w-5xl">
            <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
              Questions
            </p>
            <h2 className="mb-12 text-3xl font-black uppercase leading-[0.92] tracking-tight sm:text-4xl md:text-[56px]">
              Asked before deciding.
            </h2>
            <div className="space-y-4">
              {page.faq.map((item, index) => (
                <article
                  key={item.question}
                  data-reveal
                  className="reveal-text rounded-[4px] border border-black/10 p-6 md:p-8"
                  style={{ transitionDelay: `${index * 0.07}s` }}
                >
                  <h3 className="text-xl font-black uppercase leading-tight tracking-tight md:text-2xl">
                    {item.question}
                  </h3>
                  <p className="mt-5 text-base font-medium leading-relaxed text-black/58">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-accent px-5 py-20 text-white md:px-8 md:py-28">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl">
              Compare with your own brief.
            </h2>
            <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-white/85 md:text-lg">
              The honest test is a variant in your ad account. See the{' '}
              <a href="/ai-ugc-ads" className="underline underline-offset-4 hover:text-black">
                AI UGC ads service
              </a>{' '}
              or generate in the studio yourself.
            </p>
            <a
              href={withUtm('https://studio.shot.is/', 'comparison_page')}
              onClick={() => trackStudioClick('comparison_page')}
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

export default ComparisonPage;

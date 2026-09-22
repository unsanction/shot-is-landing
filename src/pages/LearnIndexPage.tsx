import { HomeFooter } from '../components/home/HomeFooter';
import { HomeNav } from '../components/home/HomeNav';
import { blogIndexPath } from '../data/blog';
import { formatDuration, hubSectionsForLang, hubStrings, hubTotals, type HubItem } from '../data/learnHub';
import {
  formatMinutes,
  learnIndexPath,
  learnStrings,
  type LessonLang,
} from '../data/lessons';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { trackStudioClick, withUtm } from '../lib/track';

type LearnIndexPageProps = {
  lang: LessonLang;
};

/** Format marker, drawn rather than typed: a glyph would depend on the font stack. */
function FormatMark({ kind }: { kind: HubItem['kind'] }) {
  return kind === 'lesson' ? (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5">
      <path d="M4 2.5 L13 8 L4 13.5 Z" fill="currentColor" />
    </svg>
  ) : (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5">
      <rect x="2" y="3" width="12" height="1.8" fill="currentColor" />
      <rect x="2" y="7.1" width="12" height="1.8" fill="currentColor" />
      <rect x="2" y="11.2" width="8" height="1.8" fill="currentColor" />
    </svg>
  );
}

export function LearnIndexPage({ lang }: LearnIndexPageProps) {
  useRevealOnScroll();

  const t = learnStrings[lang];
  const h = hubStrings[lang];
  const sections = hubSectionsForLang(lang);
  const totals = hubTotals(lang);
  const otherLang: LessonLang = lang === 'en' ? 'es' : 'en';

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="grain" aria-hidden="true" />
      <HomeNav />

      <main>
        <section className="px-5 pb-14 pt-36 md:px-8 md:pb-16 md:pt-44">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-accent">SHOT.IS · Learn</p>
              <a
                href={learnIndexPath(otherLang)}
                className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white/50 transition-colors hover:text-accent"
              >
                {t.switchLabel}
              </a>
            </div>
            <h1 className="max-w-5xl text-[clamp(2.2rem,7vw,6rem)] font-extrabold uppercase leading-[0.88] tracking-tight">
              {t.hubTitle}
            </h1>
            <p className="mt-9 max-w-3xl text-lg font-medium leading-relaxed text-white/55 md:text-2xl md:leading-tight">
              {t.hubLede}
            </p>
            <p className="mt-8 font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-white/45">
              {h.counts(totals.lessons, totals.posts)} · {h.totalTime(formatDuration(totals.minutes))}
            </p>

            {/* Jump list — six sections is past the point where scrolling to find one is fine. */}
            {sections.length > 1 ? (
              <nav aria-label={h.sectionsLabel} className="mt-10 flex flex-wrap gap-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="rounded-[3px] border border-white/15 px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 transition-colors hover:border-accent/60 hover:text-accent"
                  >
                    {section.title[lang]}
                  </a>
                ))}
              </nav>
            ) : null}
          </div>
        </section>

        <section className="px-5 pb-20 md:px-8 md:pb-28">
          <div className="mx-auto max-w-7xl">
            {sections.map((section, sectionIndex) => (
              <section key={section.id} id={section.id} className="scroll-mt-28 border-t border-white/10 pt-10 md:pt-12">
                <div className="grid grid-cols-1 gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
                      {String(sectionIndex + 1).padStart(2, '0')}
                    </p>
                    <h2 className="mt-4 text-2xl font-black uppercase leading-[0.95] tracking-tight md:text-[2rem]">
                      {section.title[lang]}
                    </h2>
                    <p className="mt-4 max-w-sm text-base font-medium leading-relaxed text-white/45">
                      {section.blurb[lang]}
                    </p>
                  </div>

                  <ul className="pb-10 [&>li:last-child>a]:border-b-0 md:pb-12">
                    {section.items.map((item, index) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          data-reveal
                          className="reveal-text group grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-5 border-b border-white/10 py-6 transition-colors hover:border-accent/40"
                          style={{ transitionDelay: `${index * 0.05}s` }}
                        >
                          <span
                            aria-hidden="true"
                            className="mt-1 flex h-7 w-7 items-center justify-center rounded-[3px] border border-white/15 text-white/45 transition-colors group-hover:border-accent/60 group-hover:text-accent"
                          >
                            <FormatMark kind={item.kind} />
                          </span>

                          <div className="min-w-0">
                            <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                              <span className="text-accent">{item.kind === 'lesson' ? h.watch : h.read}</span>
                              <span aria-hidden="true">·</span>
                              <span>{formatMinutes(item.minutes)}</span>
                              {/* Lessons 4–5 are micro-cases, not basics — label from the
                                  lesson's own kind rather than assuming the path order. */}
                              {item.lesson ? (
                                <>
                                  <span aria-hidden="true">·</span>
                                  <span>
                                    {item.lesson.kind === 'basics' ? t.basicsLabel : t.microCaseLabel} {item.order}
                                  </span>
                                </>
                              ) : null}
                            </div>
                            <h3 className="text-xl font-extrabold leading-tight tracking-tight transition-colors group-hover:text-accent md:text-[1.4rem]">
                              {item.title}
                            </h3>
                            <p className="mt-2 text-base font-medium leading-relaxed text-white/50">{item.excerpt}</p>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}

            {/* The archive stays a real page: it is what the feed, the sitemap and
                every already-indexed /blog URL point at. */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/10 pt-10">
              <p className="text-base font-medium text-white/45">{h.archiveLede}</p>
              <a
                href={blogIndexPath(lang)}
                className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-accent transition-colors hover:text-white"
              >
                {h.archiveCta} →
              </a>
            </div>
          </div>
        </section>

        <section className="bg-accent px-5 py-16 text-white md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">
            <h2 className="max-w-3xl text-3xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl">
              {t.ctaTitle}
            </h2>
            <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-white/85 md:text-lg">{t.ctaBody}</p>
            <a
              href={withUtm('https://studio.shot.is/', 'learn_hub')}
              onClick={() => trackStudioClick('learn_hub')}
              className="mt-8 inline-flex items-center justify-center bg-white px-9 py-5 text-xs font-black uppercase tracking-[0.26em] text-black transition-all hover:-rotate-1 hover:bg-black hover:text-white"
            >
              {t.ctaButton}
            </a>
          </div>
        </section>
      </main>

      <HomeFooter />
    </div>
  );
}

export default LearnIndexPage;

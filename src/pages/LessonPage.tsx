import { HomeFooter } from '../components/home/HomeFooter';
import { HomeNav } from '../components/home/HomeNav';
import { LessonPlayer } from '../components/learn/LessonPlayer';
import {
  formatMinutes,
  formatSeconds,
  formatTimestamp,
  learnIndexPath,
  learnStrings,
  learningMinutes,
  lessonPath,
  lessonSibling,
  lessonsByLang,
  nextLesson,
  type Lesson,
} from '../data/lessons';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { trackStudioClick, withUtm } from '../lib/track';

type LessonPageProps = {
  lesson: Lesson;
};

export function LessonPage({ lesson }: LessonPageProps) {
  useRevealOnScroll();

  const lang = lesson.lang;
  const t = learnStrings[lang];
  const sibling = lessonSibling(lesson);
  const next = nextLesson(lesson);
  const total = lessonsByLang[lang].length;
  const kindLabel = lesson.kind === 'basics' ? t.basicsLabel : t.microCaseLabel;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="grain" aria-hidden="true" />
      <HomeNav />

      <main>
        <article>
          <header className="px-5 pb-10 pt-32 md:px-8 md:pb-12 md:pt-40">
            <div className="mx-auto max-w-5xl">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <a
                  href={learnIndexPath(lang)}
                  className="font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-accent transition-colors hover:text-white"
                >
                  ← {t.backToHub}
                </a>
                {sibling ? (
                  <a
                    href={lessonPath(sibling)}
                    className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white/50 transition-colors hover:text-accent"
                  >
                    {t.switchLabel}
                  </a>
                ) : null}
              </div>

              <nav
                aria-label="Breadcrumb"
                className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white/40"
              >
                <a href="/" className="transition-colors hover:text-accent">
                  SHOT.IS
                </a>
                <span aria-hidden="true" className="mx-2">
                  /
                </span>
                <a href={learnIndexPath(lang)} className="transition-colors hover:text-accent">
                  {t.hubTitle}
                </a>
                <span aria-hidden="true" className="mx-2">
                  /
                </span>
                <span className="text-white/60">{lesson.title}</span>
              </nav>

              <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                {kindLabel} · {lesson.order}/{total}
              </p>

              <h1 className="max-w-4xl text-[clamp(2rem,5.5vw,3.75rem)] font-extrabold uppercase leading-[0.92] tracking-tight">
                {lesson.title}
              </h1>

              <p className="mt-7 max-w-2xl text-lg font-medium leading-relaxed text-white/60">{lesson.excerpt}</p>

              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">
                <span className="text-accent">{t.learningTime(formatMinutes(learningMinutes(lesson)))}</span>
                <span aria-hidden="true">·</span>
                <span>{t.watchTime(formatSeconds(lesson.videoSeconds))}</span>
              </div>
            </div>
          </header>

          <section className="px-5 md:px-8">
            <div className="mx-auto max-w-5xl">
              <LessonPlayer lesson={lesson} lang={lang} />
            </div>
          </section>

          <section className="px-5 pt-16 md:px-8 md:pt-20">
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 lg:grid-cols-3">
              <div data-reveal className="reveal-text rounded-[4px] border border-accent/30 bg-accent/[0.06] p-6 lg:col-span-2">
                <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
                  {t.whatYouLearn}
                </p>
                <p className="text-xl font-bold leading-snug tracking-tight text-white md:text-2xl">{lesson.outcome}</p>
              </div>

              <div data-reveal className="reveal-text rounded-[4px] border border-white/10 bg-white/[0.02] p-6">
                <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-white/40">
                  {t.nodesUsed}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {lesson.nodes.map((node) => (
                    <li
                      key={node}
                      className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] font-bold tracking-[0.12em] text-white/55"
                    >
                      {node}
                    </li>
                  ))}
                </ul>
                {lesson.prerequisites?.length ? (
                  <>
                    <p className="mb-3 mt-7 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-white/40">
                      {t.prerequisites}
                    </p>
                    <ul className="space-y-2">
                      {lesson.prerequisites.map((item) => (
                        <li key={item} className="text-sm font-medium leading-relaxed text-white/55">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </div>
            </div>
          </section>

          {/* Steps — the written lesson. Complete on its own, so the page is useful with the sound off. */}
          <section className="px-5 pt-16 md:px-8 md:pt-24">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-10 text-3xl font-black uppercase leading-none tracking-tight md:text-5xl">
                {t.inThisLesson}
              </h2>
              <ol className="space-y-px overflow-hidden rounded-[4px] border border-white/10">
                {lesson.steps.map((step, index) => (
                  <li
                    key={step.at}
                    data-reveal
                    className="reveal-text grid grid-cols-1 gap-x-8 gap-y-3 bg-white/[0.02] p-6 md:grid-cols-[6rem_1fr] md:p-8"
                    style={{ transitionDelay: `${index * 0.05}s` }}
                  >
                    <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                      <span className="tabular-nums">{formatTimestamp(step.at)}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-black uppercase leading-tight tracking-tight md:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-base font-medium leading-relaxed text-white/55">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Transcript — the same lines burned into the video, readable and indexable. */}
          <section className="px-5 pt-16 md:px-8 md:pt-24">
            <div className="mx-auto max-w-5xl">
              <details className="group rounded-[4px] border border-white/10 bg-white/[0.02]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 md:p-8">
                  <span>
                    <span className="block text-xl font-black uppercase tracking-tight md:text-2xl">{t.transcript}</span>
                    <span className="mt-2 block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                      {t.transcriptNote}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex-none font-mono text-lg text-accent transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="border-t border-white/10 p-6 md:p-8">
                  <ol className="space-y-3">
                    {lesson.captions.map((caption) => (
                      <li key={caption.at} className="grid grid-cols-[3.5rem_1fr] gap-4">
                        <span className="font-mono text-[10px] font-bold tabular-nums tracking-[0.12em] text-white/30">
                          {formatTimestamp(caption.at)}
                        </span>
                        <span className="text-base font-medium leading-relaxed text-white/60">{caption.text}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </details>
            </div>
          </section>

          {lesson.faq?.length ? (
            <section className="px-5 pt-16 md:px-8 md:pt-24">
              <div className="mx-auto max-w-5xl">
                <h2 className="mb-10 text-3xl font-black uppercase leading-none tracking-tight md:text-5xl">
                  {t.faqTitle}
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {lesson.faq.map((item) => (
                    <article
                      key={item.question}
                      data-reveal
                      className="reveal-text rounded-[4px] border border-white/10 bg-white/[0.02] p-6 md:p-8"
                    >
                      <h3 className="text-lg font-bold leading-snug tracking-tight text-white">{item.question}</h3>
                      <p className="mt-4 text-base font-medium leading-relaxed text-white/55">{item.answer}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ) : null}
        </article>

        <section className="mt-20 bg-accent px-5 py-16 text-white md:mt-28 md:px-8 md:py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl">{t.ctaTitle}</h2>
            <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-white/85 md:text-lg">{t.ctaBody}</p>
            <a
              href={withUtm('https://studio.shot.is/', 'lesson')}
              onClick={() => trackStudioClick('lesson')}
              className="mt-8 inline-flex items-center justify-center bg-white px-9 py-5 text-xs font-black uppercase tracking-[0.26em] text-black transition-all hover:-rotate-1 hover:bg-black hover:text-white"
            >
              {t.ctaButton}
            </a>
          </div>
        </section>

        {next ? (
          <section className="px-5 py-16 md:px-8 md:py-24">
            <div className="mx-auto max-w-5xl">
              <a
                href={lessonPath(next)}
                className="group flex flex-col gap-6 rounded-[4px] border border-white/10 p-7 transition-colors hover:border-accent/50 hover:bg-white/[0.03] md:flex-row md:items-center md:justify-between md:p-10"
              >
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
                    {t.nextLesson} · {next.order}/{total}
                  </p>
                  <h2 className="mt-4 text-2xl font-black uppercase leading-tight tracking-tight transition-colors group-hover:text-accent md:text-4xl">
                    {next.title}
                  </h2>
                  <p className="mt-3 max-w-xl text-base font-medium leading-relaxed text-white/50">{next.excerpt}</p>
                </div>
                <span className="flex-none font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
                  {t.learningTime(formatMinutes(learningMinutes(next)))}
                </span>
              </a>
            </div>
          </section>
        ) : null}
      </main>

      <HomeFooter />
    </div>
  );
}

export default LessonPage;

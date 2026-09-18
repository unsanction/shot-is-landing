import { HomeFooter } from '../components/home/HomeFooter';
import { HomeNav } from '../components/home/HomeNav';
import { blogIndexPath } from '../data/blog';
import {
  formatMinutes,
  formatSeconds,
  learnStrings,
  learningMinutes,
  lessonPath,
  pathMinutes,
  type Lesson,
  type LessonLang,
} from '../data/lessons';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { trackStudioClick, withUtm } from '../lib/track';

type LearnIndexPageProps = {
  lang: LessonLang;
  lessons: Lesson[];
};

export function LearnIndexPage({ lang, lessons }: LearnIndexPageProps) {
  useRevealOnScroll();

  const t = learnStrings[lang];
  const basics = lessons.filter((lesson) => lesson.kind === 'basics');
  const microCases = lessons.filter((lesson) => lesson.kind === 'micro-case');

  const renderCard = (lesson: Lesson, index: number) => (
    <a
      key={lesson.slug}
      href={lessonPath(lesson)}
      data-reveal
      className="reveal-text group flex flex-col rounded-[4px] border border-white/10 bg-white/[0.02] p-7 transition-colors hover:border-accent/50 hover:bg-white/[0.04] md:p-9"
      style={{ transitionDelay: `${index * 0.06}s` }}
    >
      <div className="mb-5 flex items-center justify-between gap-4 font-mono text-[10px] font-bold uppercase tracking-[0.24em]">
        <span className="text-accent">
          {lesson.kind === 'basics' ? t.basicsLabel : t.microCaseLabel} · {lesson.order}
        </span>
        <span className="text-white/40">{formatSeconds(lesson.videoSeconds)}</span>
      </div>

      <h3 className="text-2xl font-black uppercase leading-[0.95] tracking-tight transition-colors group-hover:text-accent md:text-[2rem]">
        {lesson.title}
      </h3>

      <p className="mt-4 flex-1 text-base font-medium leading-relaxed text-white/55">{lesson.excerpt}</p>

      <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-5 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
        <span className="text-accent">{t.learningTime(formatMinutes(learningMinutes(lesson)))}</span>
      </div>
    </a>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="grain" aria-hidden="true" />
      <HomeNav />

      <main>
        <section className="px-5 pb-16 pt-36 md:px-8 md:pb-20 md:pt-44">
          <div className="mx-auto max-w-7xl">
            <p className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-accent">
              SHOT.IS · Learn
            </p>
            <h1 className="max-w-5xl text-[clamp(2.2rem,7vw,6rem)] font-extrabold uppercase leading-[0.88] tracking-tight">
              {t.hubTitle}
            </h1>
            <p className="mt-9 max-w-3xl text-lg font-medium leading-relaxed text-white/55 md:text-2xl md:leading-tight">
              {t.hubLede}
            </p>
            <p className="mt-8 font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-white/45">
              {t.lessonCount(lessons.length)} · {t.pathTotal(formatMinutes(pathMinutes(lang)))}
            </p>
          </div>
        </section>

        <section className="px-5 pb-20 md:px-8 md:pb-28">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
              {t.basicsLabel}
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">{basics.map(renderCard)}</div>

            {microCases.length ? (
              <>
                <h2 className="mb-8 mt-16 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                  {t.microCaseLabel}
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{microCases.map(renderCard)}</div>
              </>
            ) : null}

            <p className="mt-16 flex flex-wrap items-center gap-x-4 gap-y-2 text-base font-medium text-white/45">
              {t.blogBridge}
              <a
                href={blogIndexPath(lang)}
                className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-accent transition-colors hover:text-white"
              >
                {t.blogBridgeCta} →
              </a>
            </p>
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

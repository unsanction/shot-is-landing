import {
  formatMinutes,
  formatSeconds,
  learnIndexPath,
  learningMinutes,
  lessonPath,
  lessonsByLang,
  pathMinutes,
} from '../../data/lessons';
import { trackCta } from '../../lib/track';

/**
 * Home-page teaser for the lesson hub. Every card leads with its learning time,
 * because "how long will this take me" is the objection that decides whether a
 * visitor starts at all.
 */
export function LessonsSection() {
  const lessons = lessonsByLang.en;
  if (lessons.length === 0) return null;

  return (
    <section id="learn" className="bg-black px-5 py-24 text-white md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
              Video lessons
            </p>
            <h2 className="max-w-5xl text-[2.35rem] font-black uppercase leading-[0.9] tracking-tight sm:text-5xl md:text-[72px] lg:text-[84px]">
              Learn the studio in a minute at a time.
            </h2>
          </div>
          <p className="max-w-xl text-base font-medium leading-relaxed text-white/60 md:text-lg lg:justify-self-end">
            Real screencasts of the canvas — no slides, no talking head. Each one rebuilds a single thing end to end and
            says up front how long it takes: {formatMinutes(pathMinutes('en'))} for the whole path.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {lessons.slice(0, 3).map((lesson, index) => (
            <a
              key={lesson.slug}
              href={lessonPath(lesson)}
              onClick={() => trackCta('lessons_section', lesson.title)}
              data-reveal
              className="reveal-text group flex flex-col rounded-[4px] border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-accent/50 hover:bg-white/[0.05] md:p-8"
              style={{ transitionDelay: `${index * 0.08}s` }}
            >
              <div className="flex items-center justify-between gap-4 font-mono text-[10px] font-bold uppercase tracking-[0.24em]">
                <span className="text-accent">Lesson {lesson.order}</span>
                <span className="text-white/40">{formatSeconds(lesson.videoSeconds)}</span>
              </div>
              <h3 className="mt-6 text-2xl font-black uppercase leading-[0.95] tracking-tight transition-colors group-hover:text-accent md:text-3xl">
                {lesson.title}
              </h3>
              <p className="mt-4 flex-1 text-base font-medium leading-relaxed text-white/55">{lesson.excerpt}</p>
              <p className="mt-7 border-t border-white/10 pt-5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                {formatMinutes(learningMinutes(lesson))} to learn
              </p>
            </a>
          ))}
        </div>

        <a
          href={learnIndexPath('en')}
          onClick={() => trackCta('lessons_section', 'All lessons')}
          className="mt-10 inline-flex items-center justify-center border border-white/20 px-9 py-5 text-[11px] font-black uppercase tracking-[0.26em] text-white transition-all hover:-rotate-1 hover:border-accent hover:bg-accent"
        >
          All {lessons.length} lessons
        </a>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { formatTimestamp, lessonMomentPath, type Lesson, type LessonLang } from '../../data/lessons';
import { learnStrings } from '../../data/lessons';

type LessonPlayerProps = {
  lesson: Lesson;
  lang: LessonLang;
};

/**
 * The screencast plus chapter chips that seek into it.
 *
 * Subtitles are burned into the MP4, so there is no <track> here — the same
 * caption lines are rendered as a readable transcript further down the page.
 * preload="none" keeps the poster cheap; the file is only fetched on play.
 */
export function LessonPlayer({ lesson, lang }: LessonPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const t = learnStrings[lang];

  /*
   * `?t=<seconds>` opens the lesson at that moment. These are the URLs the
   * VideoObject's key-moment Clips point at, so a reader arriving from a key
   * moment in search lands on the step it named rather than at 0:00.
   * Assigning currentTime before metadata loads sets the default playback start
   * position, so preload="none" stays and nothing is fetched until play.
   */
  useEffect(() => {
    if (lesson.videoPending || typeof window === 'undefined') return;
    const t = Number(new URLSearchParams(window.location.search).get('t'));
    if (!Number.isFinite(t) || t <= 0 || t >= lesson.videoSeconds) return;
    const video = videoRef.current;
    if (!video) return;
    const apply = () => {
      video.currentTime = t;
    };
    apply();
    video.addEventListener('loadedmetadata', apply, { once: true });
    const index = lesson.steps.reduce((found, step, i) => (step.at <= t ? i : found), 0);
    setActiveChapter(index);
    video.scrollIntoView({ block: 'center', behavior: 'instant' });
    return () => video.removeEventListener('loadedmetadata', apply);
  }, [lesson]);

  const seekTo = (seconds: number, index: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = seconds;
    setActiveChapter(index);
    // Keep the address bar on the moment, so copying it shares this step. The
    // canonical stays the clean lesson URL, so this creates no new page to index.
    window.history.replaceState(null, '', lessonMomentPath(lesson, seconds));
    void video.play().catch(() => {
      /* Autoplay can be refused after a seek; the poster stays and the user can press play. */
    });
  };

  if (lesson.videoPending) {
    return (
      <div className="overflow-hidden rounded-[4px] border border-white/10 bg-white/[0.02]">
        <div
          className="flex items-center justify-center bg-black/40 px-6 py-20 text-center"
          style={{ aspectRatio: `${lesson.video.width} / ${lesson.video.height}` }}
        >
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
              {t.recordingLabel}
            </p>
            <p className="mx-auto mt-4 max-w-md text-base font-medium leading-relaxed text-white/55">
              {t.noVideoNote}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-hidden rounded-[4px] border border-white/10 bg-black">
        <video
          ref={videoRef}
          className="block w-full"
          src={lesson.video.src}
          poster={lesson.video.poster}
          width={lesson.video.width}
          height={lesson.video.height}
          controls
          playsInline
          preload="none"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {lesson.steps.map((step, index) => (
          <button
            key={step.at}
            type="button"
            onClick={() => seekTo(step.at, index)}
            className={`rounded-full border px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition-colors ${
              activeChapter === index
                ? 'border-accent/60 bg-accent/10 text-accent'
                : 'border-white/10 text-white/50 hover:border-accent/40 hover:text-accent'
            }`}
          >
            <span className="tabular-nums">{formatTimestamp(step.at)}</span>
            <span className="mx-2 text-white/20" aria-hidden="true">
              ·
            </span>
            {step.title}
          </button>
        ))}
      </div>
    </div>
  );
}

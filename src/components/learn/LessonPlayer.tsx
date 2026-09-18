import { useRef, useState } from 'react';
import { formatTimestamp, type Lesson, type LessonLang } from '../../data/lessons';
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

  const seekTo = (seconds: number, index: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = seconds;
    setActiveChapter(index);
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

import { useMemo } from 'react';
import { reelVideos } from '../../data/landing';
import { useVideoPlayback } from '../../hooks/useVideoPlayback';

export function FilmStrip() {
  const reelItems = useMemo(() => {
    const expanded = Array.from({ length: 14 }, (_, index) => reelVideos[index % reelVideos.length]);
    return [...expanded, ...expanded];
  }, []);
  const { handleVideoHover, setVideoRef } = useVideoPlayback(reelItems);

  return (
    <div className="film-strip">
      <div className="film-strip__gate">
        <div className="film-strip__reel">
          {reelItems.map((item, index) => (
            <div
              key={index}
              className="film-cell"
              onMouseEnter={() => handleVideoHover(index, true)}
              onMouseLeave={() => handleVideoHover(index, false)}
            >
              <div className="film-cell__perf" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="film-cell__window">
                <video
                  ref={(el) => setVideoRef(index, el)}
                  src={item.src}
                  poster={item.poster}
                  muted
                  loop
                  playsInline
                  preload="none"
                  className="film-cell__video"
                />
                <div className="film-cell__grain" />
                <div className="film-cell__vignette" />
                <div className="film-cell__pause-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                </div>
              </div>
              <div className="film-cell__perf" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

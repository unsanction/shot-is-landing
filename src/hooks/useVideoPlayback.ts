import { useCallback, useEffect, useRef } from 'react';

export function useVideoPlayback(observedKey: unknown) {
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 },
    );

    videoRefs.current.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, [observedKey]);

  const setVideoRef = useCallback((index: number, video: HTMLVideoElement | null) => {
    if (video) {
      videoRefs.current.set(index, video);
    } else {
      videoRefs.current.delete(index);
    }
  }, []);

  const handleVideoHover = useCallback((index: number, isHovering: boolean) => {
    const video = videoRefs.current.get(index);
    if (!video) {
      return;
    }

    if (isHovering) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  }, []);

  return { handleVideoHover, setVideoRef };
}

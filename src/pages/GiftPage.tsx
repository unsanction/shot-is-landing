import { useEffect, type CSSProperties } from 'react';
import { BrandLink } from '../components/common/BrandLink';
import { fallbackGiftTheme, type GiftPageContent, type GiftVideo } from '../data/gifts';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type GiftPageProps = {
  page: GiftPageContent;
};

const trackGiftEvent = (eventName: string, params: Record<string, string>) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params);
};

const trackVideoPlay = (page: GiftPageContent, video: GiftVideo) => {
  trackGiftEvent('gift_video_play', {
    businessSlug: page.slug,
    businessName: page.businessName,
    videoTitle: video.title,
    videoAngle: video.angle,
  });
};

const trackVideoDownload = (page: GiftPageContent, video: GiftVideo) => {
  trackGiftEvent('gift_video_download', {
    businessSlug: page.slug,
    businessName: page.businessName,
    videoTitle: video.title,
  });
};

const slugifyFilePart = (value: string) => value.toLowerCase().replace(/[^a-z0-9а-яё]+/gi, '-').replace(/^-|-$/g, '');

const getDownloadName = (page: GiftPageContent, video: GiftVideo, index = 0) =>
  video.downloadName ?? `${page.slug}-${slugifyFilePart(video.title) || `concept-${index + 1}`}.mp4`;

const getProofPoints = (page: GiftPageContent) =>
  page.proofPoints ?? [
    { value: 'Free', label: 'gift for your team' },
    { value: 'MP4', label: 'download included' },
    { value: 'Post', label: 'try it on your channels' },
  ];

const getSprintOutputs = (page: GiftPageContent) =>
  page.sprintOutputs ?? [
    'Download the files and share them with your team.',
    'Try posting one organically or use it as a paid-social draft.',
    'If it gets a signal, ask us for a cleaner batch in the same direction.',
  ];

const defaultBrandReasons = (page: GiftPageContent) => [
  {
    title: `Built around ${page.businessName}`,
    body: 'The ideas on this page should feel specific to the brand, not like generic AI ad samples.',
  },
  {
    title: 'Free to review',
    body: 'The page is framed as a useful sample: watch, download, test, and only then decide whether to continue.',
  },
  {
    title: 'Easy to expand',
    body: 'If one direction works, SHOT.IS can turn it into a larger batch of hooks, captions, and edit variants.',
  },
];

const VideoFrame = ({
  page,
  video,
  featured = false,
  isRu = false,
}: {
  page: GiftPageContent;
  video: GiftVideo;
  featured?: boolean;
  isRu?: boolean;
}) => {
  if (!video.src) {
    return (
      <div
        className={`flex aspect-[4/5] w-full flex-col justify-between border border-white/10 bg-[var(--gift-dark)] p-5 ${
          featured ? 'min-h-[340px] md:min-h-[420px]' : 'min-h-[300px] md:min-h-[360px]'
        }`}
      >
        <div>
          <p className="gift-label text-[10px] font-black uppercase text-[var(--gift-accent)]">
            {isRu ? 'Место для видео' : 'Video placeholder'}
          </p>
          <h3 className="gift-title mt-5 text-3xl uppercase leading-[0.95] text-white md:text-4xl">
            {video.title}
          </h3>
        </div>
        <p className="gift-copy max-w-sm text-sm font-bold leading-relaxed text-white/58 md:text-base">
          {isRu
            ? 'Финальный MP4 и poster можно добавить позже. Заглушка держит верстку стабильной до готовых роликов.'
            : 'MP4 and poster can be added later. The page keeps the layout stable before final video assets are ready.'}
        </p>
      </div>
    );
  }

  return (
    <video
      className={`aspect-[9/16] w-full bg-black object-cover ${featured ? '' : 'max-h-[680px] md:max-h-[560px]'}`}
      controls
      playsInline
      preload="metadata"
      poster={video.poster}
      onPlay={() => trackVideoPlay(page, video)}
    >
      <source src={video.src} type="video/mp4" />
    </video>
  );
};

export function GiftPage({ page }: GiftPageProps) {
  const heroVideo = page.videos[0];
  const theme = page.theme ?? fallbackGiftTheme;
  const isRu = page.language === 'ru';
  const proofPoints = getProofPoints(page);
  const sprintOutputs = getSprintOutputs(page);
  const brandReasons = page.brandReasons ?? defaultBrandReasons(page);
  const ctaParams = {
    businessSlug: page.slug,
    businessName: page.businessName,
  };
  const themeStyle = {
    '--gift-accent': theme.accent,
    '--gift-hero-from': theme.heroFrom,
    '--gift-hero-to': theme.heroTo,
    '--gift-light': theme.light,
    '--gift-dark': theme.dark,
  } as CSSProperties;

  useEffect(() => {
    trackGiftEvent('gift_view', ctaParams);
  }, [page.businessName, page.slug]);

  return (
    <div style={themeStyle} className="gift-page min-h-screen bg-black text-white selection:bg-[var(--gift-accent)] selection:text-white">
      <div className="grain" aria-hidden="true" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 px-4 py-4 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <BrandLink />
          <div className="hidden gift-label text-[10px] font-bold uppercase text-white/45 md:block">
            {isRu ? `Бесплатные видео для ${page.businessName}` : `Free videos for ${page.businessName}`}
          </div>
          <a
            href={page.ctaHref}
            onClick={() => trackGiftEvent('gift_cta_click', { ...ctaParams, ctaLocation: 'nav' })}
            className="gift-label inline-flex shrink-0 items-center justify-center bg-white px-3 py-2.5 text-[9px] font-black uppercase text-black transition-colors hover:bg-[var(--gift-accent)] hover:text-white sm:px-4 md:px-6 md:py-3 md:text-[10px]"
          >
            {page.ctaLabel}
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-white/10 px-4 py-14 md:px-8 md:py-20">
          <div className="absolute inset-0" aria-hidden="true">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_14%,color-mix(in_srgb,var(--gift-accent)_36%,transparent),transparent_34%),linear-gradient(135deg,var(--gift-hero-from)_0%,#111_52%,var(--gift-hero-to)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:84px_84px] opacity-18" />
          </div>

          <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:items-center">
            <div>
              <div className="gift-label mb-5 inline-flex border border-[var(--gift-accent)]/45 bg-white/5 px-3 py-2.5 text-[9px] font-black uppercase text-[var(--gift-accent)] md:mb-6 md:px-4 md:py-3 md:text-[10px]">
                {page.heroEyebrow ?? (isRu ? 'Бесплатный видео-подарок' : 'Free video gift')}
              </div>
              <h1 className="gift-display max-w-5xl text-[2.75rem] uppercase leading-[0.92] sm:text-[3.6rem] md:text-[5rem] xl:text-[5.7rem]">
                {page.heroTitle ?? (isRu ? `Мы сделали эти видео для ${page.businessName}.` : `We made these videos for ${page.businessName}.`)}
              </h1>
              <p className="gift-copy mt-6 max-w-2xl text-base font-bold leading-snug text-white/70 md:mt-7 md:text-2xl md:leading-tight">
                {page.note}
              </p>

              <div className="mt-7 grid max-w-2xl grid-cols-3 gap-2 md:mt-8 md:gap-3">
                {proofPoints.map((point) => (
                  <div key={point.label} className="border border-white/10 bg-white/[0.05] p-3 md:p-4">
                    <p className="gift-title text-xl uppercase leading-none text-white md:text-3xl">{point.value}</p>
                    <p className="gift-label mt-2 text-[8px] font-bold uppercase leading-tight text-white/48 md:text-[10px]">
                      {point.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#gift-videos"
                  className="gift-label inline-flex items-center justify-center bg-[var(--gift-accent)] px-7 py-5 text-xs font-black uppercase text-white transition-colors hover:bg-white hover:text-black"
                >
                  {isRu ? 'Посмотреть видео' : 'Watch the videos'}
                </a>
                {heroVideo?.src ? (
                  <a
                    href={heroVideo.src}
                    download={getDownloadName(page, heroVideo)}
                    onClick={() => trackVideoDownload(page, heroVideo)}
                    className="gift-label inline-flex items-center justify-center border border-white/18 px-7 py-5 text-xs font-black uppercase text-white transition-colors hover:border-[var(--gift-accent)] hover:text-[var(--gift-accent)]"
                  >
                    {isRu ? 'Скачать MP4 бесплатно' : 'Download free MP4'}
                  </a>
                ) : (
                  <span className="gift-label inline-flex items-center justify-center border border-white/18 px-7 py-5 text-xs font-black uppercase text-white/42">
                    {isRu ? 'MP4 скоро добавим' : 'MP4 coming soon'}
                  </span>
                )}
              </div>
            </div>

            <div className="mx-auto w-full max-w-[440px] lg:mr-0">
              <div className="border border-white/14 bg-white/[0.06] p-3 shadow-[0_28px_90px_color-mix(in_srgb,var(--gift-accent)_24%,transparent)]">
                <VideoFrame page={page} video={heroVideo} featured isRu={isRu} />
                <div className="flex items-center justify-between gap-4 bg-white px-4 py-4 text-black">
                  <div>
                    <p className="gift-label text-[9px] font-black uppercase text-[var(--gift-accent)]">
                      {isRu ? 'Главная идея' : 'Featured concept'}
                    </p>
                    <p className="gift-title mt-1 text-lg uppercase leading-none">{heroVideo.title}</p>
                  </div>
                  <span className="gift-label shrink-0 bg-black px-3 py-2 text-[10px] font-black uppercase text-white">
                    {heroVideo.src ? (isRu ? 'Free' : 'Free') : 'Soon'}
                  </span>
                </div>
                {heroVideo.src ? (
                  <a
                    href={heroVideo.src}
                    download={getDownloadName(page, heroVideo)}
                    onClick={() => trackVideoDownload(page, heroVideo)}
                    className="gift-label flex items-center justify-center bg-[var(--gift-accent)] px-5 py-4 text-xs font-black uppercase text-white transition-colors hover:bg-white hover:text-black"
                  >
                    {isRu ? 'Скачать это видео' : 'Download this video'}
                  </a>
                ) : (
                  <div className="gift-label flex items-center justify-center bg-white/10 px-5 py-4 text-xs font-black uppercase text-white/45">
                    {isRu ? 'Финальный MP4 добавим позже' : 'Final MP4 coming soon'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="gift-videos" className="bg-[var(--gift-light)] px-4 py-14 text-black md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div>
                <p className="gift-label mb-4 text-[10px] font-black uppercase text-[var(--gift-accent)]">
                  {page.videoSectionEyebrow ?? (isRu ? 'Готово к просмотру' : 'Ready to review')}
                </p>
                <h2 className="gift-display max-w-3xl text-[2.25rem] uppercase leading-[0.95] md:text-[4.25rem]">
                  {page.videoSectionTitle ?? (isRu ? 'Скачайте. Попробуйте. Оставьте себе.' : 'Download them. Try them. Keep them.')}
                </h2>
              </div>
              <p className="gift-copy max-w-2xl text-base font-bold leading-relaxed text-black/62 md:text-lg">
                {page.videoSectionBody ??
                  (isRu
                    ? 'Эти видео можно бесплатно посмотреть, скачать и протестировать после проверки командой.'
                    : 'These videos are free for you to review and experiment with. You can post one, send it to your team, or use it as a reference for the kind of content SHOT.IS can produce.')}
              </p>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-5 border border-black/10 bg-white/70 p-5 md:grid-cols-[0.55fr_1.45fr] md:p-6">
              <div>
                <p className="gift-label text-[10px] font-black uppercase text-[var(--gift-accent)]">
                  {isRu ? 'AI-примечание' : 'AI content note'}
                </p>
                <h3 className="gift-title mt-3 text-2xl uppercase leading-none md:text-3xl">
                  {page.aiNoteTitle ?? (isRu ? 'Сгенерировано с помощью AI.' : 'Generated with AI.')}
                </h3>
              </div>
              <div className="gift-copy space-y-3 text-sm font-bold leading-relaxed text-black/64 md:text-base">
                <p>
                  {page.aiNoteBody ??
                    (isRu
                      ? `Эти sample-видео были сгенерированы с помощью AI-инструментов как бесплатный креативный preview для ${page.businessName}. Перед публикацией проверьте тексты, визуалы, факты и правила площадок.`
                      : `These sample videos were generated with AI tools and prepared as a free creative preview for ${page.businessName}. Please review the copy, claims, visuals, and platform rules before publishing.`)}
                </p>
                <p>
                  {page.aiNoteFollowup ??
                    (isRu
                      ? 'Если направление подходит для реальной кампании, SHOT.IS может доработать монтаж, captions и варианты для теста.'
                      : 'If you want to use the direction in a real campaign, SHOT.IS can refine the edit, adjust messaging, add captions, and prepare cleaner variants for testing.')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
              {page.videos.map((video, index) => (
                <article
                  key={`${video.title}-${index}`}
                  className="flex h-full min-h-0 flex-col overflow-hidden border border-black/10 bg-black text-white"
                >
                  <div className="bg-black">
                    <VideoFrame page={page} video={video} isRu={isRu} />
                  </div>
                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <p className="gift-label text-[10px] font-black uppercase text-[var(--gift-accent)]">
                      {isRu ? `Концепт 0${index + 1}` : `Concept 0${index + 1}`}
                    </p>
                    <h3 className="gift-title mt-4 text-[1.9rem] uppercase leading-[0.95] md:text-3xl">
                      {video.title}
                    </h3>
                    <p className="gift-copy mt-4 text-sm font-medium leading-relaxed text-white/66 md:text-base">{video.angle}</p>
                    {video.caption ? (
                      <p className="gift-copy mt-5 border-t border-white/10 pt-4 text-[11px] font-bold uppercase leading-relaxed text-white/48 md:text-xs">
                        {video.caption}
                      </p>
                    ) : null}
                    {video.src ? (
                      <a
                        href={video.src}
                        download={getDownloadName(page, video, index)}
                        onClick={() => trackVideoDownload(page, video)}
                        className="gift-label mt-auto inline-flex w-full items-center justify-center bg-white px-5 py-4 text-xs font-black uppercase text-black transition-colors hover:bg-[var(--gift-accent)] hover:text-white"
                      >
                        {isRu ? 'Скачать MP4' : 'Download MP4'}
                      </a>
                    ) : (
                      <div className="gift-label mt-auto inline-flex w-full items-center justify-center bg-white/10 px-5 py-4 text-xs font-black uppercase text-white/42">
                        {isRu ? 'Видео добавим позже' : 'Video coming soon'}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-black px-4 py-16 text-white md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <p className="gift-label mb-4 text-[10px] font-black uppercase text-[var(--gift-accent)]">
              {isRu ? `Почему именно ${page.businessName}` : `Why ${page.businessName}`}
            </p>
            <h2 className="gift-display max-w-4xl text-[2.25rem] uppercase leading-[0.95] md:text-[4.25rem]">
              {isRu ? 'Оффер привязан к реальному бренду, а не к шаблону.' : 'The offer is built around the real brand, not a template.'}
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
              {brandReasons.map((reason) => (
                <article key={reason.title} className="border border-white/10 bg-white/[0.04] p-6">
                  <h3 className="gift-title text-2xl uppercase leading-none">{reason.title}</h3>
                  <p className="gift-copy mt-5 text-sm font-bold leading-relaxed text-white/58 md:text-base">{reason.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--gift-dark)] px-4 py-16 text-white md:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 xl:grid-cols-[0.95fr_1.05fr] xl:items-center">
            <div>
              <p className="gift-label mb-4 text-[10px] font-black uppercase text-[var(--gift-accent)]">
                {page.howToUseEyebrow ?? (isRu ? 'Как использовать' : 'How to use it')}
              </p>
              <h2 className="gift-display text-[2.25rem] uppercase leading-[0.95] md:text-[4.25rem]">
                {page.howToUseTitle ?? (isRu ? 'Относитесь к этому как к бесплатному креативному sample.' : 'Treat it like a free creative sample.')}
              </h2>
              <p className="gift-copy mt-6 max-w-2xl text-lg font-bold leading-tight text-white/64 md:text-2xl">
                {page.howToUseBody ??
                  (isRu
                    ? 'Скачайте MP4, протестируйте один ролик в безопасном посте или используйте их как черновики для маркетинговой команды.'
                    : 'Download the MP4s, test one in a low-risk post, or use them as drafts for your marketing team. If the direction feels close, we can polish and expand it.')}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {sprintOutputs.map((output, index) => (
                <article key={output} className="border border-white/10 bg-white/[0.04] p-5 md:p-6">
                  <div className="flex gap-4">
                    <span className="gift-label flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--gift-accent)] text-[10px] font-black uppercase text-white">
                      0{index + 1}
                    </span>
                    <p className="gift-copy text-base font-black leading-tight text-white/80 md:text-xl">{output}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--gift-accent)] px-4 py-16 text-white md:px-8 md:py-24">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-4xl">
              <p className="gift-label mb-4 text-[10px] font-black uppercase text-white/72">
                {page.finalEyebrow ?? (isRu ? 'Следующий шаг' : 'Next step')}
              </p>
              <h2 className="gift-display text-[2.25rem] uppercase leading-[0.95] md:text-[4.5rem]">
                {page.finalTitle ?? (isRu ? `Хотите более чистую пачку для ${page.businessName}?` : `Want a cleaner batch for ${page.businessName}?`)}
              </h2>
              <p className="gift-copy mt-5 max-w-3xl text-lg font-bold leading-tight text-white/78 md:text-2xl">
                {page.offer ??
                  (isRu
                    ? `Мы можем расширить это в более чистые short-form варианты для ${page.businessName}, готовые к review и тесту.`
                    : `We can expand this into more polished short-form variants for ${page.businessName}, ready for your team to review and test.`)}
              </p>
            </div>
            <a
              href={page.ctaHref}
              onClick={() => trackGiftEvent('gift_cta_click', { ...ctaParams, ctaLocation: 'footer' })}
              className="gift-label inline-flex shrink-0 items-center justify-center bg-black px-8 py-5 text-xs font-black uppercase text-white transition-colors hover:bg-white hover:text-black"
            >
              {page.ctaLabel}
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

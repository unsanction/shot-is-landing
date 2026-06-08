import type { CSSProperties } from 'react';
import { BrandLink } from '../../components/common/BrandLink';
import type { GiftPageContent, GiftVideo } from '../../data/gifts';
import { getDownloadName, trackGiftEvent, trackVideoDownload, trackVideoPlay, useGiftView } from '../shared';

/**
 * Bespoke gift page for VARKA — «крупнейшая сеть кофеен Беларуси», «уют кофейни у дома».
 *
 * Co-branding model: a constant SHOT.IS signature frame (dark header/footer + the
 * AI-disclosure block, in SHOT.IS styling) wraps a brand-native VARKA body.
 *
 * VARKA identity captured from varkacoffee.by + brand photos (neon + "to go" kiosks):
 * warm orange #ef7d24, golden amber #f9b732, charcoal #1b1b1b, cream #fff7e8, font Comfortaa.
 * SHOT.IS chrome uses its own system: black, red #ff1100, Unbounded + JetBrains Mono.
 */

const brandStyle = {
  '--v-cream': '#fff7e8',
  '--v-card': '#fffdf6',
  '--v-ink': '#1b1b1b',
  '--v-ink-soft': '#2d2d2d',
  '--v-orange': '#ef7d24',
  '--v-orange-deep': '#d96a14',
  '--v-amber': '#f9b732',
  '--v-muted': '#7d7d7d',
  '--shot-red': '#ff1100',
  fontFamily: "'Comfortaa', system-ui, sans-serif",
} as CSSProperties;

const display = "font-['Comfortaa',_system-ui,_sans-serif]";
const mono = "font-['JetBrains_Mono',_ui-monospace,_monospace]";

const ConceptCard = ({ page, video, index }: { page: GiftPageContent; video: GiftVideo; index: number }) => (
  <article className="flex h-full flex-col overflow-hidden rounded-[28px] bg-[var(--v-card)] shadow-[0_18px_50px_-26px_rgba(27,27,27,0.32)] ring-1 ring-[var(--v-ink)]/8">
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--v-ink)]">
      {video.poster ? (
        <img src={video.poster} alt={video.title} loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <div className="h-full w-full bg-[linear-gradient(150deg,var(--v-orange)_0%,var(--v-amber)_120%)]" />
      )}
      {video.src ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          controls
          playsInline
          preload="metadata"
          poster={video.poster}
          onPlay={() => trackVideoPlay(page, video)}
        >
          <source src={video.src} type="video/mp4" />
        </video>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/15" />
          <div className="absolute left-4 top-4">
            <span className={`${mono} inline-flex items-center rounded-full bg-black/55 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur`}>
              превью-кадр
            </span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
              <span className="ml-1 h-0 w-0 border-y-[11px] border-l-[18px] border-y-transparent border-l-[var(--v-orange)]" />
            </span>
          </div>
        </>
      )}
    </div>

    <div className="flex flex-1 flex-col p-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--v-orange-deep)]">
        Концепт 0{index + 1}
      </p>
      <h3 className={`${display} mt-3 text-2xl font-bold leading-tight text-[var(--v-ink)]`}>{video.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-[var(--v-ink)]/75">{video.angle}</p>
      {video.caption ? (
        <p className="mt-4 border-t border-[var(--v-ink)]/10 pt-4 text-[13px] leading-relaxed text-[var(--v-muted)]">
          {video.caption}
        </p>
      ) : null}

      {video.src ? (
        <a
          href={video.src}
          download={getDownloadName(page, video, index)}
          onClick={() => trackVideoDownload(page, video)}
          className={`${display} mt-auto inline-flex w-full items-center justify-center rounded-full bg-[var(--v-ink)] px-5 py-3.5 text-sm font-bold text-[var(--v-cream)] transition-colors hover:bg-[var(--v-ink-soft)]`}
        >
          Скачать MP4
        </a>
      ) : (
        <div className={`${display} mt-auto inline-flex w-full items-center justify-center rounded-full border-2 border-dashed border-[var(--v-ink)]/20 px-5 py-3 text-sm font-bold text-[var(--v-ink)]/45`}>
          Финальный ролик добавим позже
        </div>
      )}
    </div>
  </article>
);

export function VarkaGiftPage({ page }: { page: GiftPageContent }) {
  useGiftView(page);
  const ctaParams = { businessSlug: page.slug, businessName: page.businessName };

  return (
    <div style={brandStyle} className="min-h-screen bg-[var(--v-cream)] text-[var(--v-ink)] antialiased selection:bg-[var(--v-orange)] selection:text-white">
      {/* ===== SHOT.IS signature header (constant chrome) ===== */}
      <header className="sticky top-0 z-50 bg-black text-white">
        <div className="h-1 w-full bg-[var(--shot-red)]" />
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 md:px-8">
          <div className="flex items-center gap-3 md:gap-4">
            <BrandLink />
            <span className="hidden h-5 w-px bg-white/20 sm:block" />
            {page.logo ? (
              <img src={page.logo} alt={page.businessName} className="hidden h-5 w-auto opacity-90 sm:block" />
            ) : null}
          </div>
          <div className="flex items-center gap-3 md:gap-5">
            <span className={`${mono} hidden text-[10px] font-bold uppercase tracking-[0.18em] text-white/55 md:inline`}>
              gift for {page.businessName}
            </span>
            <a
              href={page.ctaHref}
              onClick={() => trackGiftEvent('gift_cta_click', { ...ctaParams, ctaLocation: 'nav' })}
              className={`${mono} inline-flex shrink-0 items-center justify-center bg-[var(--shot-red)] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90`}
            >
              {page.ctaLabel}
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* ===== Hero (VARKA body) ===== */}
        <section className="relative overflow-hidden">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[var(--v-orange)]/30 blur-3xl" aria-hidden />
          <div className="absolute -bottom-28 -left-24 h-96 w-96 rounded-full bg-[var(--v-amber)]/35 blur-3xl" aria-hidden />
          <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--v-orange)]/15 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--v-orange-deep)]">
                {page.heroEyebrow}
              </span>
              <h1 className={`${display} mt-6 text-[2.1rem] font-bold leading-[1.1] tracking-tight text-[var(--v-ink)] sm:text-[2.7rem] md:text-[3.3rem]`}>
                {page.heroTitle}
              </h1>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[var(--v-ink)]/75 md:text-lg">{page.note}</p>

              <div className="mt-8 grid max-w-md grid-cols-3 gap-3">
                {(page.proofPoints ?? []).map((point) => (
                  <div key={point.label} className="rounded-2xl bg-white p-4 ring-1 ring-[var(--v-ink)]/8">
                    <p className={`${display} text-xl font-bold leading-none text-[var(--v-orange-deep)]`}>{point.value}</p>
                    <p className="mt-2 text-[12px] font-medium leading-tight text-[var(--v-muted)]">{point.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#gift-videos"
                  className={`${display} inline-flex items-center justify-center rounded-full bg-[var(--v-orange)] px-7 py-4 text-base font-bold text-white transition-transform hover:-translate-y-0.5`}
                >
                  Посмотреть концепты
                </a>
                <a
                  href={page.ctaHref}
                  onClick={() => trackGiftEvent('gift_cta_click', { ...ctaParams, ctaLocation: 'hero' })}
                  className={`${display} inline-flex items-center justify-center rounded-full border-2 border-[var(--v-ink)]/15 px-7 py-4 text-base font-bold text-[var(--v-ink)] transition-colors hover:border-[var(--v-ink)] hover:bg-[var(--v-ink)] hover:text-[var(--v-cream)]`}
                >
                  {page.ctaLabel}
                </a>
              </div>
            </div>

            {/* Hero image — real VARKA café */}
            <div className="mx-auto w-full max-w-[460px]">
              <div className="overflow-hidden rounded-[32px] bg-[var(--v-card)] p-3 shadow-[0_40px_90px_-44px_rgba(27,27,27,0.5)] ring-1 ring-[var(--v-ink)]/8">
                <div className="overflow-hidden rounded-[24px]">
                  <img
                    src="/media/gifts/varka/cafe-cozy.jpg"
                    alt="Кофейня VARKA"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between gap-4 px-3 py-3.5">
                  <p className={`${mono} text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--v-muted)]`}>
                    реальная кофейня VARKA
                  </p>
                  <span className="shrink-0 rounded-full bg-[var(--v-orange)]/15 px-3 py-1.5 text-[12px] font-bold text-[var(--v-orange-deep)]">
                    уют у дома
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== WHY US — the selling argument ===== */}
        <section className="bg-[var(--v-ink)] text-[var(--v-cream)]">
          <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
            <div className="max-w-3xl">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--v-amber)]">{page.whyEyebrow}</p>
              <h2 className={`${display} mt-3 text-[1.9rem] font-bold leading-tight md:text-[2.9rem]`}>{page.whyTitle}</h2>
              <p className="mt-5 text-[17px] leading-relaxed text-[var(--v-cream)]/80">{page.whyBody}</p>
            </div>

            {/* real metrics = the argument */}
            <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {(page.metrics ?? []).map((m) => (
                <div key={m.label} className="rounded-[22px] bg-white/[0.06] p-5 ring-1 ring-white/10">
                  <p className={`${display} text-3xl font-bold leading-none text-[var(--v-amber)] md:text-4xl`}>{m.value}</p>
                  <p className="mt-2 text-[13px] font-medium leading-tight text-[var(--v-cream)]/65">{m.label}</p>
                </div>
              ))}
            </div>

            {/* content engines mapped to real VARKA surfaces */}
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {(page.contentEngines ?? []).map((engine) => (
                <article key={engine.title} className="overflow-hidden rounded-[24px] bg-white/[0.05] ring-1 ring-white/10">
                  {engine.image ? (
                    <img src={engine.image} alt={engine.title} loading="lazy" className="aspect-[16/11] w-full object-cover" />
                  ) : null}
                  <div className="p-5">
                    <h3 className={`${display} text-base font-bold leading-tight text-[var(--v-cream)]`}>{engine.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-[var(--v-cream)]/65">{engine.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Gift concepts + AI note ===== */}
        <section id="gift-videos" className="bg-[var(--v-cream)]">
          <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
            <div className="max-w-3xl">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--v-orange-deep)]">
                {page.videoSectionEyebrow}
              </p>
              <h2 className={`${display} mt-3 text-[1.9rem] font-bold leading-tight text-[var(--v-ink)] md:text-[2.9rem]`}>
                {page.videoSectionTitle}
              </h2>
              <p className="mt-4 text-[17px] leading-relaxed text-[var(--v-ink)]/70">{page.videoSectionBody}</p>
            </div>

            {/* AI disclosure = SHOT.IS signature block (NOT recolored to brand) */}
            <div className="mt-10 overflow-hidden rounded-[24px] bg-black text-white">
              <div className="h-1 w-full bg-[var(--shot-red)]" />
              <div className="grid grid-cols-1 gap-6 p-7 md:grid-cols-[0.5fr_1.5fr] md:p-9">
                <div>
                  <p className={`${mono} text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--shot-red)]`}>
                    SHOT.IS · AI note
                  </p>
                  <h3 className={`${display} mt-3 text-2xl font-bold leading-tight`}>{page.aiNoteTitle}</h3>
                </div>
                <div className="space-y-3 text-[15px] leading-relaxed text-white/80">
                  <p>{page.aiNoteBody}</p>
                  <p>{page.aiNoteFollowup}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {page.videos.map((video, index) => (
                <ConceptCard key={`${video.title}-${index}`} page={page} video={video} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* ===== Why this brand (exclusivity reasons) ===== */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--v-orange-deep)]">
              Почему именно {page.businessName}
            </p>
            <h2 className={`${display} mt-3 max-w-3xl text-[1.9rem] font-bold leading-tight text-[var(--v-ink)] md:text-[2.9rem]`}>
              Сделано под реальный бренд, а не по шаблону.
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {(page.brandReasons ?? []).map((reason) => (
                <article key={reason.title} className="rounded-[28px] bg-[var(--v-cream)] p-7 ring-1 ring-[var(--v-ink)]/8">
                  <div className="h-1.5 w-12 rounded-full bg-[var(--v-orange)]" />
                  <h3 className={`${display} mt-5 text-xl font-bold leading-tight text-[var(--v-ink)]`}>{reason.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--v-ink)]/75">{reason.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== How to use ===== */}
        <section className="bg-[var(--v-cream)]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--v-orange-deep)]">
                {page.howToUseEyebrow}
              </p>
              <h2 className={`${display} mt-3 text-[1.9rem] font-bold leading-tight text-[var(--v-ink)] md:text-[2.9rem]`}>
                {page.howToUseTitle}
              </h2>
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[var(--v-ink)]/75">{page.howToUseBody}</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {(page.sprintOutputs ?? []).map((output, index) => (
                <article key={output} className="flex items-center gap-5 rounded-[24px] bg-white p-5 ring-1 ring-[var(--v-ink)]/8">
                  <span className={`${display} flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--v-orange)] text-base font-bold text-white`}>
                    0{index + 1}
                  </span>
                  <p className="text-[16px] font-medium leading-snug text-[var(--v-ink)]/90">{output}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Final offer (orange band) ===== */}
        <section className="bg-[var(--v-orange)] text-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-16 md:flex-row md:items-end md:justify-between md:px-8 md:py-24">
            <div className="max-w-3xl">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-white/75">{page.finalEyebrow}</p>
              <h2 className={`${display} mt-3 text-[2.1rem] font-bold leading-tight md:text-[3.2rem]`}>{page.finalTitle}</h2>
              <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/90">{page.offer}</p>
            </div>
            <a
              href={page.ctaHref}
              onClick={() => trackGiftEvent('gift_cta_click', { ...ctaParams, ctaLocation: 'offer' })}
              className={`${display} inline-flex shrink-0 items-center justify-center rounded-full bg-[var(--v-ink)] px-8 py-4 text-base font-bold text-white transition-colors hover:bg-black`}
            >
              {page.ctaLabel}
            </a>
          </div>
        </section>
      </main>

      {/* ===== SHOT.IS signature footer (constant chrome) ===== */}
      <footer className="bg-black text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 px-5 py-8 md:flex-row md:items-center md:px-8">
          <div className="flex items-center gap-4">
            <BrandLink />
            <span className={`${mono} text-[10px] uppercase tracking-[0.16em] text-white/45`}>
              gift for {page.businessName} · made by SHOT.IS
            </span>
          </div>
          <a
            href={page.ctaHref}
            onClick={() => trackGiftEvent('gift_cta_click', { ...ctaParams, ctaLocation: 'footer' })}
            className={`${mono} inline-flex items-center justify-center bg-[var(--shot-red)] px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90`}
          >
            {page.ctaLabel}
          </a>
        </div>
      </footer>
    </div>
  );
}

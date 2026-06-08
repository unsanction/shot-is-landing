# Architecture Contract

A gift page = **shared plumbing** + **a bespoke per-brand component**. Visual design is never shared.

## File map

```
src/data/gifts.ts                 # GiftPageContent records (data + SEO/meta). Facts must be true.
src/gifts/shared.ts               # plumbing only: analytics, download naming, useGiftView. NO visual styles.
src/gifts/registry.ts             # slug -> bespoke component map
src/gifts/<slug>/<Brand>GiftPage.tsx  # the bespoke, brand-native page (owns all design)
src/pages/GiftPage.tsx            # generic fallback template (low-touch pages only)
src/App.tsx                       # renders bespoke component if registered, else fallback
src/index.css                     # add brand fonts to the Google Fonts @import here
```

## 1. Data record (`src/data/gifts.ts`)

```ts
{
  slug: 'brand',
  businessName: 'Brand',
  website: 'https://brand.example',
  language: 'en' | 'ru',
  heroEyebrow, heroTitle, note, offer,
  ctaHref, ctaLabel,
  theme: { accent, heroFrom, heroTo, light, dark },   // REAL captured palette
  proofPoints: [{ value, label }, ...],
  videoSectionEyebrow, videoSectionTitle, videoSectionBody,
  aiNoteTitle, aiNoteBody, aiNoteFollowup,
  howToUseEyebrow, howToUseTitle, howToUseBody,
  sprintOutputs: [string, string, string],
  brandReasons: [{ title, body }, ...],
  finalEyebrow, finalTitle,
  videos: [{ title, angle, caption, downloadName, src?, poster? }, x3],
}
```

This feeds SEO/meta (`App.tsx`) and the bespoke component. Keep every fact real (city, products, positioning).

## 2. Bespoke component (`src/gifts/<slug>/<Brand>GiftPage.tsx`)

- Owns 100% of layout, color, type, shape, motion.
- Put the captured palette as CSS vars on the root element; use the brand fonts (Tailwind arbitrary `font-['Comfortaa',_sans-serif]` or a scoped class). Load the brand font in `index.html`.
- Read content from the `page` prop; do not hardcode facts the data record already holds.
- Import plumbing from `../shared`: `useGiftView`, `trackGiftEvent`, `trackVideoPlay`, `trackVideoDownload`, `getDownloadName`.
- **Never** copy visual classes from another brand's component.

### Placeholder videos
Omit `src`/`poster` → render a brand-styled placeholder + disabled "coming soon" control (no broken player, no fake download). Finished video → set `src`, `poster`, `downloadName`.

### Required sections (content contract; visual treatment is free per brand)
- personalized hero
- free / download / test framing
- **AI disclosure before any download**
- video cards
- brand-fit reasoning ("why this brand, not a template")
- practical "how to use it"
- exclusive next-step offer

## 3. Register (`src/gifts/registry.ts`)

```ts
export const bespokeGiftPages = {
  varka: VarkaGiftPage,
  // brand: BrandGiftPage,
};
```

`App.tsx`: `bespokeGiftPages[slug]` if present, else `<GiftPage />` fallback.

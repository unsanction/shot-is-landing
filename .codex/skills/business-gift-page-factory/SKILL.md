---
name: business-gift-page-factory
description: Research a specific business deeply, capture its real identity and assets, and build a SUPER-EXCLUSIVE co-branded SHOT.IS gift landing page that (1) looks like the recipient brand designed it, (2) argues WHY that business specifically needs a stream of short video, and (3) makes a concrete offer. Each page is a bespoke React component wrapped in a constant SHOT.IS signature frame. Use when asked to build gift.shot.is seed pages or brand-seamless outbound landing pages for a named company.
---

# Business Gift Page Factory

## The job

A `gift.shot.is/{business}` page is a **seed page** sent to one business to open a conversation. It must pass one test:

> **"If I owned this business and got this link, would I say yes to a call?"**

If the answer is no, the page failed. Three things make the answer yes — all required:

1. **It looks like their brand.** Real palette, real fonts, real logo, real photos — not a SHOT.IS template with swapped colors.
2. **It argues why THEY need us.** Not "we make AI videos." A specific case, built on the brand's real scale and surfaces, for why this business needs a constant stream of short video and why AI/SHOT.IS is how to get it.
3. **It's clearly a SHOT.IS product.** A constant SHOT.IS signature frame wraps the brand-themed body, so every gift page reads as one product line and fits shot.is.

We **do not generate videos** in this skill. Video slots are placeholders — but they must never look empty (use the brand's real photos as preview frames).

## What went wrong before (don't repeat)

- **Template sameness:** one shared skin + a data row → every brand looked like SHOT.IS. Personalized, not exclusive.
- **Fabricated brand data:** a draft invented colors/fonts/positioning that weren't on the real site. Confidently wrong is worse than generic. **Capture and verify — never fill plausible values.**
- **Empty gift, no argument:** grey "video coming soon" boxes, no logo, no real photos, and no reason for the owner to care. It didn't sell. The page must show real brand imagery and make the case.

## Workflow

1. **Research deep** — what they sell, scale (locations, cities, volume), surfaces (products, app, hiring, franchise), tone, real numbers.
2. **Capture** — palette + fonts + positioning + **logo (light & dark) + real photos**, from the live site. Verify everything.
3. **Build the argument** — why THIS business needs a stream of short video (their scale × their surfaces), why AI/SHOT.IS.
4. **Build the page** — bespoke brand body inside the constant SHOT.IS frame; real assets; concrete offer.
5. **Validate** — build + brand fidelity + the "would the owner buy?" gate + responsive.

References: `brand-profile.md` (capture method + filled VARKA), `page-spec.md` (architecture), `varka-case.md` (canonical build), `research.md` (source checklist).

## 1. Research (go deep — this is the ammunition)

Pull concrete, quotable facts. For the "why us" argument you specifically need **scale and surfaces**:
- Scale: number of locations, cities, monthly volume (visits/sales), growth.
- Surfaces that each generate content needs: new/seasonal products, every location/city, the app, loyalty, self-service, hiring/school, franchise/B2B, events.
- Tone & taglines (verbatim), signature products, brand story.
- Credible proof points with sources. Never invent stats, awards, or endorsements.

Example (VARKA, verified from varkacoffee.by): 120 seated cafés + 350+ self-service points, 16 cities, ~95 in Minsk, ~200k drinks & ~140k visits/month, loyalty app (5 BYN bonus), barista school, franchise, tone "молодой и яркий", "Варим для вас". Each of those is a content engine.

## 2. Capture (palette, fonts, AND assets — verify everything)

Do the technical capture from the live site (see `brand-profile.md` for commands):
- `theme-color`, frequency-ranked palette, `--font-*` vars / `font-family`.
- **Logo:** download the real SVG/PNG (get BOTH a dark-bg and light-bg version). Save to `public/media/gifts/<slug>/`.
- **Photos:** download 3–5 real brand photos (interiors, product, people). Save to the same folder. These become hero imagery and video-card preview frames.

> Integrity rule: never encode a color, font, slogan, metric, city, or product you did not verify this session. If extraction fails (empty/404/truncated), re-capture or say so. Do not guess.

## 3. The selling argument — "why you need us" (REQUIRED section)

This is the part that was missing. The page must explicitly answer, for the owner:
- **Why a stream of short video at all?** Tie it to their real scale: "X locations across Y cities, Z visits/month — that's dozens of content moments every month (new drinks, seasons, local promos, app, hiring), and shooting each one is slow and expensive."
- **Why AI / why now?** Volume + cadence + cost: test dozens of hooks cheaply, localize per city, keep their tone, scale without a production team.
- **Content engines:** map 3–4 of the brand's real surfaces to concrete video streams (e.g. VARKA → new menu, per-city local, app/retention, barista-school hiring).

Lead with the owner's problem, not SHOT.IS's product. Use the real numbers as the argument.

## 4. Co-branding model — SHOT.IS frame + brand body

Every gift page = a **constant SHOT.IS signature layer** wrapping a **brand-themed body**.

Constant SHOT.IS layer (same on every page, so it reads as a SHOT.IS product and fits shot.is):
- **Header:** dark SHOT.IS band — `BrandLink` logo + red accent `#ff1100` + JetBrains Mono label (`GIFT FOR {BRAND}`), with the brand's own logo shown as the recipient.
- **Footer:** dark SHOT.IS band — "made by SHOT.IS · shot.is" + CTA.
- **AI-disclosure:** a SHOT.IS signature block (dark, red accent, mono) — NOT recolored per brand. This is the honest platform signature.

Brand-themed body (the recipient's real identity):
- Hero, why-us, video concept cards, how-to-use, offer — in the brand's palette, fonts, shapes, with real logo + photos.

## Offer Design (concrete, not vague)

Avoid "we can make AI videos." Make it specific and owner-shaped: what they get, in their world. Good shapes: scale an existing content style, turn each new product/season into short-form, localize per city/store, feed app/retention/hiring/franchise. Always state the sample pack is free, downloadable, and testable after review, and give a concrete next step.

## Architecture

- **Data** in `src/data/gifts.ts` (`GiftPageContent`): slug, businessName, website, `logo`, language, ctaHref/Label, real `theme`, copy, metrics/why-us fields, and `videos` (with real photo `poster`s). Feeds SEO + the component. Keep facts true.
- **Bespoke component** `src/gifts/<slug>/<Brand>GiftPage.tsx`: brand body inside the SHOT.IS frame. Import plumbing from `src/gifts/shared.ts` (analytics/downloads/view). Never copy another brand's visual classes.
- **Register** slug → component in `src/gifts/registry.ts`. `App.tsx` renders bespoke if present, else the generic fallback.
- Load brand fonts in `index.html`. Put brand assets in `public/media/gifts/<slug>/`.

### Required sections
SHOT.IS header · personalized hero (real logo/photo) · **why-you-need-us argument with real metrics** · free/download/test framing · **AI disclosure (SHOT.IS signature) before any download** · video concept cards (real photos as preview frames, never empty) · brand-fit reasoning · how-to-use · concrete offer · SHOT.IS footer.

## UX & integrity rules

- AI disclosure (SHOT.IS signature) before any download.
- Video cards never look empty: real brand photo poster + "превью-кадр / финальный ролик добавим позже". Equal-height cards; control pinned to bottom.
- No sticky bottom CTA on mobile unless requested.
- Use the brand's real logo and photos (public marketing assets, for a pitch to that brand). Mark the page as a draft preview; don't imply endorsement.
- Keep gift pages `noindex`; never add to sitemap/prerender.
- The SHOT.IS frame stays in SHOT.IS styling; the body stays in the brand's.

## Validation

`npm run build` (exit 0). Then:
- **The buy gate:** read the page as the owner — does it look like my brand, does it argue why I need this, is the next step clear? If any "no", fix before shipping.
- Brand fidelity: side-by-side with the brand site — palette/type/logo/photos match.
- Facts: every metric/city/product is real and sourced.
- Responsive 320/390/768/1440: no overflow, no overlap; AI note before downloads; placeholders show real photos; downloads work only when `src` exists.

If browser automation is unavailable, state what was verified via build/static inspection and what remains visually unverified.

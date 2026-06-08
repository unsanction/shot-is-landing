# Canonical case — VARKA

The reference build for a bespoke, brand-seamless gift page.

Live: `gift.shot.is/varka` · local `/gift/varka`
Component: `src/gifts/varka/VarkaGiftPage.tsx`
Data: `varka` record in `src/data/gifts.ts`
Profile: `references/brand-profile.md`

## Brand truth (verified from live varkacoffee.by)

- Positioning: «Крупнейшая сеть кофеен VARKA в Беларуси», «уют кофейни у дома» — young & bright.
- Geography: 16 cities, **Minsk-dominant (~95 locations)** — country-wide, not one city.
- Products: вкусный кофе, свежая выпечка, аппетитные десерты, перекусы; самообслуживание; приложение.
- Font: **Comfortaa** (rounded geometric sans).
- Palette: amber `#f9b732` · lime `#d1cc52` · ink `#1b1b1b` · cream `#fff7e8` · white.

## Two failure modes this case teaches

**1. Template sameness (v1).** v1 was the shared SHOT.IS skin (black, Unbounded/JetBrains Mono, UPPERCASE, grain) with two colors swapped → personalized, never exclusive.

**2. Fabricated brand data (a worse v2 draft).** A draft "fixed" v1 by inventing an identity — forest green `#1f3d2b`, Onest/Manrope, "кофейни здорового питания", focus on Брест, смузи/ПП-десерты — none of which exist on the real site. It *looked* bespoke but was confidently wrong, which is worse than generic for a seed page. The cause: claiming to extract values from a CSS file that had actually 404'd.

**Lesson: capture → verify → only then encode.** If extraction fails, re-capture; never fill plausible values.

## Correct build (v2, verified)

| | v1 (template) | fabricated draft (❌) | v2 verified (✅) |
|---|---|---|---|
| Canvas | black | forest green | cream `#fff7e8` / white |
| Ink | white | cream | near-black `#1b1b1b` |
| Accent | red + amber | terracotta + sage | amber `#f9b732` + lime `#d1cc52` |
| Font | Unbounded + JetBrains Mono | Onest + Manrope | **Comfortaa** (rounded) |
| Positioning | generic | "healthy eating" | «крупнейшая сеть», «уют у дома» |
| Geography | — | Брест | Belarus-wide, Minsk-led |
| Feel | techno startup | earthy health café | bright, cozy, friendly VARKA |

## What to copy from this case

1. Capture first (`brand-profile.md` method), verify every value, design last.
2. Pick canvas/ink/accent from the real frequency-ranked palette, by role.
3. Use the brand's real font (here Comfortaa; load it in `index.html`).
4. Match the brand's shape language (here: rounded + bright, not grain/brutalist, not earthy).
5. Keep the content contract (hero → free framing → AI note before downloads → cards → brand-fit → how-to-use → offer); restyle it brand-natively.
6. Keep every fact true and sourced.

# Brand Profile — capture before you design

A gift page is only exclusive if it is built from the brand's **real** identity. Guessing colors/fonts is how pages end up generic — or worse, wrong. Capture them, and verify before you encode anything.

> ⚠️ Integrity rule: never write a color, font, slogan, city, or product into the page that you did not verify from a real source this session. If extraction failed (empty/truncated/404), say so and re-capture — do **not** fill in plausible-looking values. (This skill's first VARKA build shipped a fabricated forest-green/Onest/"healthy-eating"/Brest identity that did not exist. Don't repeat it.)

## Capture method

1. **Fetch the HTML head.**
   ```bash
   curl -sL -A "Mozilla/5.0" https://BRAND_SITE/ -o /tmp/b.html
   ```
   Read from it:
   - `<meta name="theme-color">` → often the primary brand color.
   - `<title>` + `<meta og:description>` → positioning line, location, product language (use verbatim).
   - inline `font-family:` declarations and the page builder (Tilda, Vite/React, Wix…).

2. **Rank the palette by frequency from the rendered HTML/CSS** — frequency ≈ how much the brand leans on a color:
   ```bash
   grep -oiE '#[0-9a-f]{6}|#[0-9a-f]{3}\b' /tmp/b.html | tr 'A-F' 'a-f' | sort | uniq -c | sort -rn | head -24
   ```
   Separate neutrals (white/black/grey) from the real brand accents.

3. **Extract fonts:**
   ```bash
   grep -oiE 'font-family:[^;}{]+' /tmp/b.html | sort | uniq -c | sort -rn | head
   ```
   For SPAs (Vite/React/Next), the markup may be near-empty — then read the linked CSS bundle, or use the browser to read computed styles. Confirm the `<link>`/`@import` Google Fonts URL actually exists (a 404 returns a tiny junk file — that is NOT data).

4. **Confirm products/locations/tone** from the rendered site, reviews, and social.

5. If shell output truncates on odd characters, route through `python3` + `json.dumps`, or write to a file and Read it.

## Profile template

```
Brand:        <exact wordmark + casing>
Positioning:  <one line, verbatim from site>
Geography:    <cities/regions — and which dominates>
Products:     <real items>
Tone:         <3 words>
Fonts:        display=<>, body=<>
Palette (with roles):
  canvas/bg   #......
  ink/heading #......
  accent      #......      (the signature)
  secondary   #......
  muted/text  #......
Shapes/motifs: <sharp/rounded, grain/soft-shadow, organic/flat, icons/patterns>
Source:       <how each value was verified>
```

## Filled example — VARKA (verified from live varkacoffee.by, a Tilda site)

```
Brand:        VARKA (all caps; from "варить" — to brew)
Positioning:  «Крупнейшая сеть кофеен VARKA в Беларуси» · «уют кофейни у дома» · молодой и яркий бренд
Geography:    16 cities in Belarus; Minsk dominates (~95 locations), then Grodno/Brest/Gomel/Vitebsk
Products:     вкусный кофе, свежая выпечка, аппетитные десерты, перекусы; самообслуживание; loyalty app
Tone:         young, bright, cozy
Fonts:        display + body = Comfortaa (rounded geometric), Arial fallback
Palette (with roles):
  canvas/bg   #ffffff white  /  #fff7e8 cream
  ink/heading #1b1b1b        (also #2d2d2d)
  accent      #ef7d24 warm orange   (physical signature: neon + "to go" kiosks; CSS golden #f9b732)
  secondary   #f9b732 golden amber  (+ greenery/wood from interiors)
  muted/text  #848484 / #9d9d9d grey
Mascot:       corgi dog (orange/cream)
Shapes/motifs: rounded everything (Comfortaa is round), pill buttons, soft shadows,
               warm wood + plant walls + copper. Cozy & friendly — NOT earthy-health, NOT brutalist.
Real assets:  download logo (b/w) + photos (cafe interiors, "to go" kiosk, "4 стихии" seasonal
              menu, people) → public/media/gifts/varka/. These become hero + concept preview frames.
Source:       curl of varkacoffee.by <head> + frequency-ranked inline colors + font-family scan + viewing real brand photos
```

This profile is what `src/gifts/varka/VarkaGiftPage.tsx` is built from. The amber `#f9b732` + lime `#d1cc52` on cream, in Comfortaa, is what reads as VARKA.

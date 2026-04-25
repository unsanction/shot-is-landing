# Storyboard — SHOT.IS Viral Ad

**Format:** 1080×1920 (Portrait — Instagram Reels / TikTok)
**Duration:** ~20 seconds
**Audio:** ElevenLabs TTS voiceover + no underscore (pure silence makes it hit harder on mute-autoplaying feeds)
**VO direction:** Cold, confident, slightly robotic. Like an AI reading its own manifesto. Flat affect with power behind each word. Think: Nike Volt era campaign meets an AI overlord broadcast.
**Style basis:** DESIGN.md — void black, acid red #FF1100, Syne 900, JetBrains Mono

**Global guardrails:**
- Every beat: dense, alive — 8+ visual elements layered
- Motion: fast and aggressive. Nothing slower than 0.4s. This is a hype ad, not ambient art.
- Transitions: whip pans and hard smash cuts — no soft crossfades
- Text: ALL CAPS everywhere. Syne 900 for headlines, JetBrains Mono for labels
- The red (#FF1100) arrives ONCE as a shock — the CTA beat. It must feel like a slap.

---

## Asset Audit

| Asset | Type | Beat | Role |
|---|---|---|---|
| `captures/shot-is/assets/photo-1550684848-fac1c5b4e853.jpg` | Portrait photo | Beat 2 | KAI_OS character card |
| `captures/shot-is/assets/photo-1614850523296-d8c1af93d400.jpg` | Portrait photo | Beat 2 | VEXA-9 character card |
| `captures/shot-is/assets/photo-1618005182384-a83a8bd57fbe.jpg` | Portrait photo | Beat 2 | LUNA_CORE character card |
| `captures/shot-is/assets/visual-overload-poster.jpg` | Poster image | Beat 3 | Background texture behind stats |
| `captures/shot-is/assets/shot-hero-poster.webp` | Hero poster | Beat 1 | Hero background sphere glow |
| `captures/shot-is/assets/favicon.svg` | SVG | Beat 4, Beat 6 | Brand mark |
| `captures/shot-is/assets/svgs/film-cell-pause-icon.svg` | SVG icon | Beat 1 | Scattered decorative FG elements |

---

## BEAT 1 — HOOK (0:00–2.5s)

**VO:** "The next era of creators isn't human."

**Concept:** We drop into the void. No title card, no fade — we're ALREADY IN the dark world. The brand sphere glows ominously. Massive white type crashes in line by line, each word a detonation. The viewer is disoriented on purpose. This isn't an ad — it's a transmission.

**Visual description:** Full-bleed void black canvas (#000000). Background: `shot-hero-poster.webp` at 40% opacity, slow scale 1.0→1.05 over beat. Radial red-purple glow (#FF1100 at 8% opacity) blooms from center. Three `film-cell-pause-icon.svg` scattered at ±15° rotation, opacity 30%, floating slowly. Over the glow: two lines of Syne 900 WHITE text — "THE NEXT ERA" (top) and "OF CREATORS" (bottom), each line 96px. Third line "ISN'T HUMAN." in #FF1100 at 96px — arrives last, 0.1s after line 2 settles.

**Animation choreography:**
- Beat starts: BG poster at opacity 0 → 0.4 over 0.5s, ease power2.out
- Radial glow: scale 0→1 over 0.8s, ease power3.out
- Film icons: float in from y:30 → 0, opacity 0→0.3, staggered 0.15s, ease power2.out
- "THE NEXT ERA": SLAMS in from y:-60 → 0, opacity 0→1, 0.25s, power3.out, at t=0.3s
- "OF CREATORS": SLAMS in from y:-60 → 0, 0.25s, power3.out, at t=0.6s
- "ISN'T HUMAN.": CRASHES in from y:60→0 + scale 1.15→1, opacity 0→1, 0.2s, power3.out, at t=0.9s — color #FF1100, then immediately color-shifts white at t=1.4s (0.1s transition)

**Techniques:** Per-word typography (technique 4) + Canvas 2D glow particle field behind sphere (technique 2)

**Depth layers:** BG: poster + radial glow canvas. MG: main headline text. FG: film icons scattered.

**SFX:** Sub-bass thump on each word slam. Silence between.

**Transition OUT:** Hard smash cut to Beat 2 at t=2.5s — instantaneous, no transition animation. The white-to-white section of Beat 2 creates the "impact" of the cut.

---

## BEAT 2 — ROSTER (2.5s–4.0s)

**VO:** "Meet the New Gods."

**Concept:** White world — a sudden inversion from the void. Three B&W character portraits line up like a police booking or a Gods-of-Olympus reveal. Each character's name types itself in JetBrains Mono. The contrast from black-to-white is the visual hit.

**Visual description:** Background pure white (#FFFFFF). Three portrait photos stacked vertically at 33% height each, filling the frame — B&W desaturated filter (grayscale 100%). Each photo: top 33% VEXA-9, mid 33% KAI_OS, bottom 33% LUNA_CORE — full-bleed edge-to-edge. Over each: character name in Syne 900 black, 48px, centered, with JetBrains Mono descriptor "12.4M REACH / TREND SABOTEUR / HIGH-CONCEPT VIDEO" at 14px below. Left vertical edge: thin 2px #000 border line draws itself top to bottom over 0.3s. Between each photo: 1px #000 horizontal divider line.

**Animation choreography:**
- Photos: staggered SLAM IN from x:1080→0, 0.2s each, staggered 0.05s gaps, power3.out
- Character names: TYPE ON via per-character animation, 0.015s per char, mono font, starting at t=0.2s staggered per card
- Divider lines: SVG path draw left-to-right, 0.15s each, staggered 0.1s, at t=0.1s
- Vertical edge line: SVG path draw top-to-bottom, 0.3s, at t=0s

**Techniques:** Per-word typography (technique 4) + SVG path drawing on dividers (technique 1)

**Depth layers:** BG: white. MG: photos with grayscale filter. FG: names + dividers.

**SFX:** Three quick camera shutter clicks — one per character reveal.

**Transition OUT:** Whip pan right — x:1080, blur:30px, 0.2s power3.in at t=4.0s

---

## BEAT 3 — STATS (4.0s–10.0s)

**VO:** "Eight hundred forty seven million reach. Three hundred forty percent more ROI. Zero human limitations."

**Concept:** We're back in the void. The numbers are the product. Giant counters SLAM into existence and count up while the VO delivers the proof. The visual-overload poster bleeds through the background as texture — indistinct, industrial, dark gold. This beat feels like a data war room.

**Visual description:** Background: `visual-overload-poster.jpg` at 15% opacity, desaturated, blurred 20px — pure texture. Over it: three stat blocks stacked centered:
- Top stat: "847M+" in Syne 900 white 120px, label "TOTAL REACH" in JetBrains Mono 14px #E5E7EB
- Mid stat: "340%" in Syne 900 white 120px, label "ROI INCREASE" in JetBrains Mono 14px #E5E7EB
- Bottom stat: "0" → "ZERO" in Syne 900 white 96px, label "HUMAN LIMITATIONS" in JetBrains Mono 14px #FF1100
Each block separated by a 1px white/20% horizontal line. Background canvas: animated particle field — 80 white dots drifting slowly, 0.3px radius, 20% opacity (technique 2).

**Animation choreography:**
- Particle canvas: active entire beat, slow drift
- Stat 1 "847M+": counter counts 0→847 over 1.5s (COUNTS UP), then "M+" snaps in, ease power2.out. Arrives at t=0.5s
- Stat 1 label: fades in at t=0.3s, 0.2s duration
- Stat 2 "340%": SLAMS from y:80→0, opacity 0→1, 0.25s power3.out, at t=2.5s. Counter 0→340, 1.2s
- Stat 3 "ZERO": types on letter by letter at t=5.0s, 0.08s per letter, JetBrains Mono style
- "HUMAN LIMITATIONS" label in red: pulses scale 1→1.03→1, 0.4s, at t=5.5s

**Techniques:** Canvas 2D particles (technique 2) + Counter animation (type-on variant, technique 7) + Per-word typography (technique 4)

**Depth layers:** BG: blurred poster texture + particle canvas. MG: stat blocks. FG: red label accent.

**SFX:** Ascending tone on each stat reveal. Bass drop on "ZERO."

**Transition OUT:** Zoom through — scale 1→1.3, blur 0→30px, 0.25s power3.in at t=10.0s

---

## BEAT 4 — BRAND (10.0s–12.5s)

**VO:** "This is SHOT dot IS."

**Concept:** Identity reveal. Just the brand. After the proof, we need the name to land. Maximum negative space — Syne 900 at full-frame scale with the SHOT.IS mark. A 3D rotational reveal makes it feel like a stamp being pressed into reality.

**Visual description:** Black void canvas. Center: "SHOT.IS" in Syne 900 white at 140px — fills 90% of frame width. At 0.3s: `favicon.svg` appears top-left (cyan star mark) at 40px. Bottom-center: "shot.is" in JetBrains Mono 18px #E5E7EB appears at t=1.0s. Faint red underline #FF1100 2px draws beneath "SHOT.IS" wordmark from left to right over 0.4s at t=0.5s. Background: SHOT.IS text ghost watermark at 4% opacity, 300px, gray (#111), centered — static.

**Animation choreography:**
- "SHOT.IS" main: CSS 3D reveal — rotationX: 90→0, opacity 0→1, 0.4s power2.out, at t=0s (technique 3)
- Favicon: scale 0→1, opacity 0→1, 0.2s back.out(1.7), at t=0.3s
- Red underline: SVG path draw left→right, 0.4s power2.out, at t=0.5s (technique 1)
- "shot.is" mono: fade + y:10→0, 0.25s, at t=1.0s
- Entire frame: subtle slow scale 1.0→1.02 over entire beat duration (breathing)

**Techniques:** CSS 3D transform (technique 3) + SVG path drawing (technique 1)

**Depth layers:** BG: ghost watermark text. MG: main SHOT.IS headline. FG: favicon + underline + URL.

**SFX:** Low resonant boom as SHOT.IS lands. Single clean tone on underline draw.

**Transition OUT:** Hard smash cut to Beat 5 at t=12.5s

---

## BEAT 5 — TICKER MANIFESTO (12.5s–17.0s)

**VO:** "The shot is viral. The shot is perfect. The shot is yours."

**Concept:** The rotating ticker from the site — live. Three declarations cycle through the center of frame like a slot machine landing on PERFECT every time. Kinetic, repetitive, hypnotic. The word that SLAMS into place each time is the payload.

**Visual description:** Void black canvas. Center frame: three-line slot machine arrangement. Top line: ghost text "THE SHOT IS" in Syne 900 white/40%, 72px — static, decorative. Center line: rotating word — "VIRAL" → "PERFECT" → "YOURS" — Syne 900 white 110px. Bottom line: ghost "THE SHOT IS" mirrored at white/40%, 72px — static. Background: horizontal scanline texture at 5% opacity (CSS repeating gradient). Left/right edges: thin 1px #FF1100 vertical accent lines.

**Animation choreography:**
- "VIRAL": CRASHES from y:-120→0, opacity 0→1, 0.2s power3.out, at t=0.3s after beat start; holds 1.2s; exits y:120, blur 10px, 0.15s power2.in
- "PERFECT": same crash in from y:-120→0, 0.2s, after VIRAL exits; holds 1.2s; exits same
- "YOURS": crashes in, holds longer (1.8s); at t=4.0s scale pulses 1→1.08→1, 0.5s elastic.out
- Red accent lines: draw in from top→bottom simultaneously at t=0, SVG path, 0.3s
- Scanline overlay: present from t=0, opacity animation none

**Techniques:** Per-word slam typography (technique 4) + SVG edge lines (technique 1)

**Depth layers:** BG: scanline texture. MG: slot machine text stack. FG: red accent lines.

**SFX:** Mechanical click/thud on each word slam. On "YOURS" — a higher-pitched sharp click + brief reverb tail.

**Transition OUT:** Whip pan downward — y:300, blur:30px, 0.2s power3.in at t=17.0s

---

## BEAT 6 — CTA (17.0s–20.0s)

**VO:** "Apply for whitelist."

**Concept:** THE RED MOMENT. Full-bleed acid red — the only time #FF1100 owns the entire canvas. This is the shock terminus. Everything so far has been black-and-white. Now: the brand's pulse. One button. One URL. Nothing else competes.

**Visual description:** Full-bleed #FF1100 background. Giant SHOT.IS watermark in near-black (#0D0D0D) at 300px Syne 900, centered, 60% opacity — decorative ghost. Center: "APPLY FOR" in Syne 900 white 64px. Below: "WHITELIST" in Syne 900 white 96px — bold enough to feel like a VIP rope. Below that: 200px gap. Single button shape — white outline 2px rectangle 500px wide, "REQUEST ACCESS" in JetBrains Mono 18px white, centered. Top-left: SHOT.IS logo in white (favicon.svg + "SHOT.IS" wordmark) at 32px.

**Animation choreography:**
- Red BG: wipes in from bottom y:1920→0, 0.3s power2.out — arriving like a wall slamming up (technique: CSS transform on full-bleed div)
- SHOT.IS watermark ghost: fades in at 0.2s, opacity 0→0.6, 0.4s
- "APPLY FOR": SLAMS from y:-60→0, 0.2s power3.out, at t=0.4s
- "WHITELIST": SLAMS from y:60→0, 0.2s power3.out, at t=0.6s — scale 1.1→1 simultaneously
- Button outline: SVG path draw around the rectangle perimeter, 0.5s, at t=1.0s (technique 1)
- "REQUEST ACCESS": fade in at t=1.3s, 0.2s
- Logo: scale 0→1, 0.2s back.out(1.5), at t=0s
- Final hold: entire frame breathes — subtle scale 1.0→1.015 over last 1.5s

**Techniques:** SVG path draw on button (technique 1) + CSS 3D transform on BG reveal (technique 3)

**Depth layers:** BG: red fill + SHOT.IS ghost watermark. MG: headline stack. FG: button + logo.

**SFX:** Bass-heavy THUD on red arrival. Clean high tone on button outline draw. Silence after.

---

## Production Architecture

```
shot-is-ad/my-video/
├── index.html                    root — VO + beat orchestration
├── DESIGN.md                     brand reference
├── SCRIPT.md                     narration text
├── STORYBOARD.md                 THIS FILE
├── transcript.json               word-level timestamps (Step 5)
├── narration.wav                 TTS audio (Step 5)
├── captures/shot-is/             captured website data (symlinked from root)
└── compositions/
    ├── beat-1-hook.html
    ├── beat-2-roster.html
    ├── beat-3-stats.html
    ├── beat-4-brand.html
    ├── beat-5-ticker.html
    ├── beat-6-cta.html
    └── captions.html
```

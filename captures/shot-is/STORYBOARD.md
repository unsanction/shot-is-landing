# STORYBOARD — SHOT.IS Social Ad

**Format:** 1080×1920 (TikTok / Instagram Reels / YouTube Shorts — portrait)
**Duration:** ~22 seconds
**Beats:** 7
**Audio:** TTS voiceover (deep, commanding male voice) + punchy trap/drill underscore with sub-bass
**VO direction:** Deep, measured, each line lands like a statement of fact — no hype inflection. Pauses between lines feel deliberate, not empty.
**Style basis:** DESIGN.md — black/white/red (#FF1100), Syne 800-900, no softness

**Music:** Dark, minimal drill instrumental. Sub-bass pulse. Hits on beat 1 and beat 6. Near-silence under stats (let the numbers breathe). Crescendo into the CTA.

---

## Asset Audit

| Asset | Type | Beat | Role |
|-------|------|------|------|
| `assets/videos/shot-hero-loop.mp4` | Video | Beat 1 | Full-bleed atmospheric background loop |
| `assets/shot-hero-poster.webp` | Poster | Beat 1 | Fallback frame during load |
| `assets/photo-1614850523296-d8c1af93d400.jpg` | Photo | Beat 3 | VEXA-9 character card |
| `assets/photo-1550684848-fac1c5b4e853.jpg` | Photo | Beat 3 | KAI_OS character card |
| `assets/photo-1618005182384-a83a8bd57fbe.jpg` | Photo | Beat 3 | LUNA_CORE character card |
| `assets/visual-overload-poster.jpg` | Photo | Beat 5 | Full-bleed editorial AI content visual |
| `assets/svgs/film-cell-pause-icon.svg` | SVG | Beat 6 | Decorative UI accent |

**All 7 assets deployed. Opening beat has video asset. Logo (SHOT.IS wordmark) appears in Beat 1 and Beat 7.**

---

## BEAT 1 — COLD OPEN / STAT HOOK (0.00s–2.80s | duration: 2.80s)

**VO:** *"Eight hundred forty-seven million eyes."*

### Concept
We open already in the void. The camera doesn't fade in — it arrives. A dark cinematic sphere hangs in deep space — the SHOT.IS hero loop — glowing deep crimson-maroon, breathing. Out of nothing, a single massive number materializes from scatter particles, coalesces, STAMPS into place. This isn't a slide deck. This is a transmission.

### Visual Description
- Full-bleed `shot-hero-loop.mp4` as background — 2016×1134 source, scaled to fill 1080×1920, slow imperceptible drift (scale 1.0→1.03 over 3s)
- Canvas particle field (300 particles): white dots scattered from center, coalescing inward into the stat — like data assembling itself
- "847M+" SLAMS in at center frame, Syne 900wt, 180px, white — starts at scale 0.6 + blur 30px, CRASHES to scale 1 + no blur in 0.25s power4.out
- Below it: "TOTAL REACH" — Syne 700, 32px, #E5E7EB, types on character-by-character at 0.04s delay per char
- SHOT.IS logo (text wordmark): top-left, 20px from edges, Syne 800, 28px white — fades in at opacity 0→1 over 0.3s at t=0.5
- Thin horizontal `#FF1100` line: 3px, draws left-to-right under "847M+" over 0.4s using stroke-dashoffset

### Mood Direction
Cyberpunk gravity. "Arrival." Like a satellite signal locked in. A fact so large it has its own mass.

### Animation Choreography
| Element | Action |
|---------|--------|
| Background video | Slow zoom 1.0→1.03 over duration |
| Particles (300) | Scatter from center outward at t=0, reverse-orbit inward t=0.3–1.0, dissolve at t=1.0 |
| "847M+" | STAMPS in t=1.0 — scale 0.6→1, blur 30→0, 0.25s power4.out |
| Red underline | DRAWS left→right t=1.25→1.65 via stroke-dashoffset |
| "TOTAL REACH" | TYPES on char-by-char t=1.4, 0.04s/char |
| SHOT.IS logo | FADES in t=0.5 opacity 0→1, 0.3s |

### Techniques
- **Canvas 2D Procedural**: particle coalesce effect
- **Per-Word Kinetic Typography**: "847M+" with scale + blur entrance
- **Character-by-Character Typing**: "TOTAL REACH" sublabel
- **SVG Path Drawing**: red underline draw-on

### Depth Layers
- BG: hero video loop (maroon sphere atmosphere)
- MG: particle canvas overlay (mix-blend-mode: screen)
- FG: "847M+" stat + red line + sublabel + SHOT.IS logo

### Transition OUT
Smash cut to Beat 2 — hard cut, no blur. The abruptness IS the message.

**SFX:** Sub-bass hit on first frame. Particles have a faint "whoosh" building to the STAMP. On STAMP — a single concussive bass thud.

---

## BEAT 2 — THE TWIST (2.43s–4.57s | duration: 2.14s)

**VO:** *"Zero human influencers."*

### Concept
Pure black canvas. The word "ZERO" occupies the entire frame like a verdict. No decoration. No mercy. The viewer expects another stat — instead they get a confrontation. The word almost shakes with the weight of it.

### Visual Description
- Full black (#000000) background
- "ZERO" in Syne 900wt, 220px, white — enters from slightly above, DROPS to center with slight y-overshoot (−8px, then settle), scale 0.9→1.0, 0.3s power3.out
- "HUMAN INFLUENCERS." below in Syne 700, 52px, #E5E7EB — staggered entry: each word slides from x:60→0, opacity 0→1, 0.25s power2.out, 0.12s stagger
- Subtle canvas noise grain overlaid at 3% opacity (full-frame, animated hash noise)
- Thin 1px horizontal white line (full width) above "HUMAN INFLUENCERS." — draws left-to-right 0.4s at t=0.6
- At t=1.4: "ZERO" briefly glitches — two 40ms flashes of x:±4 translate, color flickers #FF1100 then back to white

### Mood Direction
Cold certainty. "The future happened and you missed it." Brutalist. The silence after a statement that needs no elaboration.

### Animation Choreography
| Element | Action |
|---------|--------|
| "ZERO" | DROPS in t=0 — y:-40→0 with overshoot, scale 0.9→1, 0.3s power3.out |
| "HUMAN INFLUENCERS." | Words CASCADE t=0.5, 0.12s stagger, x:60→0, opacity 0→1 |
| White divider line | DRAWS t=0.4 left→right, 0.35s |
| Glitch on "ZERO" | t=1.4 — x:±4 twice (40ms each), color flash #FF1100 |
| Grain canvas | Continuous hash noise at 3% opacity whole duration |

### Techniques
- **Canvas 2D Procedural**: animated grain/noise overlay
- **Per-Word Kinetic Typography**: "HUMAN INFLUENCERS." cascade
- **SVG Path Drawing**: white divider line draw-on

### Depth Layers
- BG: pure black
- MG: grain canvas overlay
- FG: "ZERO" + divider + "HUMAN INFLUENCERS."

### Transition OUT
Glitch wipe — x:±6 noise burst + blur:16px 0.2s — hard into Beat 3.

**SFX:** Silence. The drop in music is intentional. A low, held tone under the VO. On the glitch — brief digital artifact sound.

---

## BEAT 3 — THE PRODUCT (4.07s–8.00s | duration: 3.93s)

**VO:** *"SHOT.IS builds AI creators that look better than reality."*

### Concept
Three legends materialize. VEXA-9. KAI_OS. LUNA_CORE. They don't slide in — they ASCEND from below the frame, like gods rising. Each one gets their own cinematic card: dark overlay, name in impact type, descriptor as a badge. They feel real. Better than real.

### Visual Description
- Dark (#0D0D0D) background with a subtle horizontal gradient (left: #0D0D0D, center: #111111, right: #0D0D0D)
- Three portrait cards stacked vertically (1080×580px each), overlapping by 40px — they rise in from y:200→0, staggered 0.25s between each
- Each card:
  - Portrait image fills card (`object-fit: cover`) — dark cinematic vignette overlay (radial gradient rgba(0,0,0,0) center → rgba(0,0,0,0.7) edges)
  - Name tag bottom-left: Syne 900wt, 52px, WHITE ("VEXA-9", "KAI_OS", "LUNA_CORE") — punches in scale 0.8→1 0.2s after card lands
  - Descriptor: Syne 700, 22px, #E5E7EB — types on 0.3s after name
  - Top-right badge: thin 1px white border pill, "AI CREATOR", 18px Syne — fades in at opacity 0→1
- Behind cards: three thin vertical `#FF1100` line accents (2px), one behind each card at x:offset positions, draw top-to-bottom over 0.4s

### Mood Direction
Editorial magazine meets cyberpunk legend dossier. Each character is a product reveal. "These aren't avatars — these are forces."

### Assets
- Card 1: `photo-1614850523296-d8c1af93d400.jpg` (VEXA-9)
- Card 2: `photo-1550684848-fac1c5b4e853.jpg` (KAI_OS)
- Card 3: `photo-1618005182384-a83a8bd57fbe.jpg` (LUNA_CORE)

### Animation Choreography
| Element | Action |
|---------|--------|
| Card 1 (VEXA-9) | ASCENDS t=0 — y:200→0, 0.5s power3.out |
| Card 2 (KAI_OS) | ASCENDS t=0.25 — y:200→0, 0.5s power3.out |
| Card 3 (LUNA_CORE) | ASCENDS t=0.5 — y:200→0, 0.5s power3.out |
| Name tags | PUNCH IN 0.2s after each card lands, scale 0.8→1 |
| Descriptors | TYPE ON 0.3s after names |
| Red vertical lines | DRAW top→bottom 0.4s, staggered 0.1s each |
| AI CREATOR badges | FADE IN opacity 0→1, 0.25s, after each card |

### Techniques
- **Video Compositing** (images in full-bleed portrait frames)
- **Per-Word Kinetic Typography**: name PUNCH + cascade descriptor
- **Character-by-Character Typing**: descriptor lines
- **SVG Path Drawing**: red vertical accent lines

### Depth Layers
- BG: dark gradient canvas
- MG: portrait cards with vignette
- FG: name tags, badges, red lines

### Transition OUT
Velocity-matched upward — cards exit y:-150 + blur:20px, 0.3s power2.in → Beat 4 enters from y:120→0, 0.5s power2.out.

**SFX:** Each card landing has a soft "weight" impact — a padded low thud. Cards ASCENDING = rising synthesizer tone. Names PUNCH in with a sharp click.

---

## BEAT 4 — THE PROOF (7.69s–14.00s | duration: 6.31s)

**VO:** *"Three hundred forty percent higher ROI than traditional creators."*

### Concept
A dark stats command center. The number "340%" erupts into the frame — and underneath, two more statistics materialize like confirmation signals blinking in. The viewer is looking at a control dashboard for a machine that prints results. The numbers are the argument.

### Visual Description
- Full black (#000000) background
- "340%" CRASHES in center-frame: Syne 900wt, 200px, white — scale 0.5 + blur 40px → scale 1, blur 0, 0.3s power4.out
- Below "340%": "ROI INCREASE" Syne 700, 38px, #E5E7EB — slides up y:30→0, 0.25s power2.out
- "vs. traditional creators" — Syne 400, 24px, rgba(255,255,255,0.5) — fades in 0.2s
- Right: stat mini-block "96%" + "CLIENT RETENTION" — Syne 900wt 80px + Syne 700 24px — slides from x:80→0, 0.35s power2.out at t=1.5
- Canvas 2D: animated dot-grid (12×20 grid, 1920×1080 mapped to portrait), dots pulse white with 2px radius, activated left-to-right like a progress bar at t=0.8→2.0
- Thin red (#FF1100) horizontal glow line (4px, radial glow blur 8px): draws under "340%" left→right 0.4s at t=0.4

### Mood Direction
Bloomberg terminal meets Fight Club. "These are facts. Argue with them." Cold, precise, no decoration for decoration's sake.

### Animation Choreography
| Element | Action |
|---------|--------|
| "340%" | CRASHES t=0 — scale 0.5+blur 40→scale 1+blur 0, 0.3s power4.out |
| "ROI INCREASE" | SLIDES UP t=0.3 — y:30→0, 0.25s power2.out |
| "vs. traditional..." | FADES IN t=0.5 — opacity 0→1, 0.2s |
| Dot grid | ACTIVATES t=0.8→2.0 — sweeps left→right |
| "96% / CLIENT RETENTION" | SLIDES IN t=1.5 — x:80→0, 0.35s power2.out |
| Red glow line | DRAWS t=0.4 — left→right, 0.4s |

### Techniques
- **Canvas 2D Procedural**: dot-grid activation sweep
- **Per-Word Kinetic Typography**: stats crash-in entrance
- **SVG Path Drawing**: red glow underline

### Depth Layers
- BG: black + subtle dot grid canvas (10% opacity)
- MG: "340%" primary stat + secondary stat block
- FG: red line + sublabels

### Transition OUT
Zoom through — scale 1→1.15, blur:24px, 0.25s power3.in → Beat 5 enters scale 0.9→1, blur:24→0, 0.4s expo.out.

**SFX:** Bass drop on "340%" CRASH. Dot grid activating has a soft electrical hiss. "96%" slides in with a secondary thud.

---

## BEAT 5 — THE ETHOS (13.70s–17.37s | duration: 3.67s)

**VO:** *"No rules. No limits. Just pure visual dominance."*

### Concept
`visual-overload-poster.jpg` fills the frame — the editorial AI content photo, warm and cinematic. This is the PRODUCT. This is what SHOT.IS makes. Over it, three staggered lines land like declarations, each separated by a deliberate pause. Not a tagline — a manifesto.

### Visual Description
- `visual-overload-poster.jpg` (portrait-oriented) fills full 1080×1920 — slow Ken Burns drift: scale 1.0→1.06, x:0→-20px over 4s, power1.inOut
- Dark gradient overlay: top 40% of frame = rgba(0,0,0,0.7), middle transparent, bottom 60% = rgba(0,0,0,0.85) — ensures text readability
- Bottom text block:
  - "NO RULES." — Syne 900wt, 96px, white — SLAMS from y:60→0 at t=0, 0.3s power3.out
  - "NO LIMITS." — same spec — SLAMS from y:60→0 at t=0.5
  - "JUST PURE VISUAL DOMINANCE." — Syne 800, 52px, #FF1100 — PUNCHES in at t=1.2, scale 0.95→1, opacity 0→1, 0.25s power2.out
- Three thin white divider lines (full-width, 1px) draw between each line at t=0.3, t=0.8 respectively — left→right, 0.25s
- Particle burst on "DOMINANCE." landing: 30 white particles radiate from text center, travel outward 80px, fade over 0.4s

### Mood Direction
"A magazine cover that declares war." Beautiful but brutal. The image is aspirational; the words are commands. "The Economist cover energy mixed with a Supreme drop."

### Assets
- `assets/visual-overload-poster.jpg` — full-bleed, Ken Burns pan

### Animation Choreography
| Element | Action |
|---------|--------|
| BG image | Ken Burns: scale 1→1.06, x:0→-20px, 4s power1.inOut |
| "NO RULES." | SLAMS t=0 — y:60→0, 0.3s power3.out |
| "NO LIMITS." | SLAMS t=0.5 — y:60→0, 0.3s power3.out |
| "JUST PURE VISUAL DOMINANCE." | PUNCHES t=1.2 — scale 0.95→1, opacity 0→1, 0.25s, color #FF1100 |
| Divider lines | DRAW t=0.3 and t=0.8 — left→right, 0.25s each |
| Particle burst | RADIATES on "DOMINANCE" land, 30 particles outward |

### Techniques
- **Per-Word Kinetic Typography**: three-line staggered SLAM entrance
- **Canvas 2D Procedural**: particle burst on "DOMINANCE"
- **SVG Path Drawing**: white divider lines draw-on
- **Video Compositing**: image Ken Burns with overlay gradient

### Depth Layers
- BG: editorial photo with Ken Burns pan
- MG: gradient overlay canvas
- FG: three manifesto lines + dividers + particle burst

### Transition OUT
Smash cut to black. The silence after "dominance" is intentional — the hard cut creates the impact.

**SFX:** On each line SLAM: a weight impact sound (low thud). "DOMINANCE" — a sharp reverb-tailed hit. After: silence.

---

## BEAT 6 — THE POWER STATEMENT (17.07s–18.49s | duration: 1.42s)

**VO:** *"The shot is viral."*

### Concept
Pure black. Four words. Maximum type size. The statement fills the frame like a prophecy. Each word appears separately — stacked — and on "VIRAL" the entire frame flashes crimson for one frame, then resolves white. Nobody will skip this.

### Visual Description
- Full black background
- "THE" — Syne 700, 64px, #E5E7EB — fades t=0, 0.15s
- "SHOT IS" — Syne 900wt, 140px, white — STAMPS from center outward, scale 0.8→1, blur 20→0, 0.25s power4.out at t=0.3
- "VIRAL" — Syne 900wt, 180px, #FF1100 — SLAMS from below y:80→0, scale 0.7→1, 0.3s power4.out at t=0.7
- On "VIRAL" land (t=0.7): single-frame canvas flash — full frame fills `#FF1100` at 80% opacity for one frame (0.033s), then back to black
- "VIRAL" gets a secondary pulse: scale 1→1.02→1 over 0.3s after land
- SVG film-cell pause icon appears left of "VIRAL" — small, 32px, white, rotates 360° at t=0.8 over 0.4s

### Mood Direction
"A stamp of approval from the algorithm itself." Maximum authority. The typography IS the emotion. Red on black is the only color needed.

### Animation Choreography
| Element | Action |
|---------|--------|
| "THE" | FADES t=0 — opacity 0→1, 0.15s |
| "SHOT IS" | STAMPS t=0.3 — scale 0.8→1, blur 20→0, 0.25s power4.out |
| "VIRAL" | SLAMS t=0.7 — y:80→0, scale 0.7→1, 0.3s power4.out, color #FF1100 |
| Frame flash | t=0.7 — canvas rgba(255,17,0,0.8) for 0.033s |
| "VIRAL" pulse | t=1.0 — scale 1→1.02→1, 0.3s sine.inOut |
| Film-cell icon | ROTATES 360° t=0.8, 0.4s power2.inOut |

### Techniques
- **Per-Word Kinetic Typography**: stacked word reveal
- **Canvas 2D Procedural**: single-frame crimson flash
- **CSS 3D Transforms**: film-cell icon rotation

### Depth Layers
- BG: black + flash canvas layer
- FG: typographic stack + film icon

### Transition OUT
Velocity-matched: y:-100, blur:20px, opacity 0, 0.25s power2.in → Beat 7 enters from y:80→0, blur:20→0, 0.4s power2.out.

**SFX:** "SHOT IS" — a reverb-tailed impact. "VIRAL" — the biggest hit in the video, with a 808 sub-bass thud and the frame flash. Then: music rises for CTA.

---

## BEAT 7 — THE CTA (18.19s–21.00s | duration: 2.81s)

**VO:** *"Apply for whitelist at shot dot is."*

### Concept
Crimson red (#FF1100) fills everything. The brand's highest energy color. "JOIN THE INNER CIRCLE" energy. The SHOT.IS logo and URL appear on the red field — white on red, maximum contrast. A simple outlined button pulses once. Access is a privilege.

### Visual Description
- Full `#FF1100` background — canvas fills with red from center outward (radial sweep from center, 0.3s)
- "SHOT.IS" — Syne 900wt, 120px, white — STAMPS center from scale 0.7→1, blur 20→0, 0.25s at t=0.3
- Below: "APPLY FOR WHITELIST" — Syne 800, 44px, white — types on character-by-character, 0.03s/char at t=0.6
- URL badge: outlined white pill button, 1px border, "shot.is" in Syne 700 28px — FLOATS up from y:30→0, opacity 0→1, 0.3s at t=1.2
- URL badge then PULSES: scale 1→1.03→1, 0.4s sine.inOut, repeat:2
- "ACCESS IS A PRIVILEGE, NOT A RIGHT." — Syne 400, 20px, rgba(255,255,255,0.7) — fades in bottom of frame at t=1.5
- Canvas: 50 tiny white particles slowly orbiting the SHOT.IS wordmark in elliptical path (MotionPath-style via canvas) — subtle, atmospheric

### Mood Direction
"The velvet rope. The red carpet. The invitation you had to earn." The red isn't aggressive here — it's powerful. Exclusive. The entire frame says: you want in.

### Animation Choreography
| Element | Action |
|---------|--------|
| Red background | RADIAL SWEEP center out, 0.3s |
| "SHOT.IS" | STAMPS t=0.3 — scale 0.7→1, blur 20→0, 0.25s |
| "APPLY FOR WHITELIST" | TYPES ON t=0.6 — 0.03s/char |
| URL badge | FLOATS UP t=1.2 — y:30→0, opacity 0→1, 0.3s |
| Badge pulse | PULSES t=1.5 — scale 1→1.03→1, repeat:2 |
| "ACCESS IS..." | FADES IN t=1.8 — opacity 0→0.7, 0.4s |
| Orbit particles | CONTINUOUS — 50 particles elliptical path around wordmark |

### Techniques
- **Canvas 2D Procedural**: radial red sweep + orbiting particle field
- **Character-by-Character Typing**: "APPLY FOR WHITELIST"
- **GSAP MotionPath**: particle orbit paths

### Depth Layers
- BG: #FF1100 canvas with radial sweep
- MG: particle orbit canvas (screen blend)
- FG: SHOT.IS logo + CTA text + badge

### Transition OUT
Hold on final frame (freeze). No exit transition — video ends here.

**SFX:** Music swells and holds on a sustained chord. No hard drop. The red frame is the resolution — let it breathe.

---

## Production Architecture

```
captures/shot-is/
├── DESIGN.md
├── SCRIPT.md
├── STORYBOARD.md               ← THIS FILE
├── narration.wav               (Step 5)
├── transcript.json             (Step 5)
└── compositions/
    ├── beat-1-hook.html
    ├── beat-2-twist.html
    ├── beat-3-creators.html
    ├── beat-4-proof.html
    ├── beat-5-ethos.html
    ├── beat-6-viral.html
    ├── beat-7-cta.html
    └── captions.html
```

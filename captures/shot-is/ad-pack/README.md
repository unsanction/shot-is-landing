# SHOT.IS Ad Pack

Vertical social ad pack for TikTok, Instagram Reels, YouTube Shorts, and paid social tests.

## Ads

- `ad-01-power-core` - 22s manifesto/proof ad with the full brand argument.
- `ad-02-creator-machine` - 15s direct-response ad focused on replacing influencer logistics.
- `ad-03-proof-loop` - 10s fast paid-social hook for retargeting and cold tests.

Each ad is a standalone HyperFrames project with:

- `index.html` - source composition.
- `script.txt` - voiceover script.
- `assets/images/` - local visual assets from the landing capture.
- `assets/audio/` - generated narration, music bed, raw mix, and normalized `mix-master.wav` used by the final renders.

## Final MP4s

- `ad-01-power-core/renders/shot-is-power-core.mp4`
- `ad-02-creator-machine/renders/shot-is-creator-machine.mp4`
- `ad-03-proof-loop/renders/shot-is-proof-loop.mp4`

## Render

From an ad folder:

```bash
npx hyperframes lint
npx hyperframes validate
npx hyperframes render --quality high --fps 30 --output renders/ad.mp4
```

The Sora prompt specs in `sora-prompts/` are optional replacement or expansion shots. No live Sora jobs were started because `OPENAI_API_KEY` was not set in this shell.

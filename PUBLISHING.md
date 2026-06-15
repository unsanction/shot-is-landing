# Blog publishing schedule

10 cluster articles were produced on 2026-06-10. They ship in three batches so Google sees a
steady publishing cadence instead of a one-day content dump (better discovery, spreads the
GSC request-indexing quota, repeated sitemap/IndexNow pings).

All article files already exist in `src/data/posts/`. Publishing a batch = uncommenting its
imports + array entries in `src/data/posts/index.ts`, fixing dates, and pushing to `main`
(GitHub Actions deploys to Firebase automatically).

## Batch A — LIVE (published 2026-06-10)

- ai-ad-production-pipeline (cluster hub)
- best-ai-video-generator-for-ads
- ai-ugc-ads-cost
- ugc-hook-patterns

## Batch B — LIVE (published 2026-06-15)

- veo-3-for-ad-creative
- keyframe-to-video-workflow
- beat-synced-video-ads

## Batch C — target ~2026-06-17

- ai-character-consistency
- brand-consistency-ai-ads
- do-ai-ugc-ads-work

## Per-batch checklist

1. In `src/data/posts/index.ts`: uncomment the batch's imports and array entries.
2. In each post file: set `datePublished`/`dateModified` to the ACTUAL merge date (never future-date).
3. `npm run build` — confirm the prerender log lists the new routes and the sitemap/feed/llms counts grew.
4. Commit + push to `main` → auto-deploy.
5. After deploy: `npm run ping:indexnow` (Bing/Yandex), then in Google Search Console run
   URL Inspection → Request indexing for each new URL (quota ~10/day).
6. Optional: add 1-2 links from older relevant posts to the new articles and bump their `dateModified`.

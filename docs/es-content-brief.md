# Brief: expand the Spanish article cluster

A self-contained task brief. Read it end to end before writing anything — most of the
mistakes available here are structural, not editorial.

## Why this work exists

Search Console, 28 days to 2026-09-22: 251 impressions, average position 30.5, 2 clicks.
The site is indexed and shown; it ranks on page three. Two things in that data drive this
brief:

- **Spanish queries already produce impressions off three articles.** `anuncios ugc` (9
  impressions) and `ugc para anuncios` (3). That is demand arriving at a near-empty shelf.
- **Demand concentrates in the virtual-influencer cluster.** Roughly 76 of 251 impressions:
  `what are the top marketing agencies developing ai influencers for high-stakes digital
  campaigns?` (55), `virtual content creator` (10), `virtual brand ambassador` (8),
  `virtual ambassador` (3). That is also the only English cluster Google has indexed in
  full, and the only one linked from a landing page before 2026-09-22.

So: extend Spanish, and extend it into the cluster that already earns impressions rather
than into the production-craft cluster, where nine English articles sit in "crawled —
currently not indexed".

## What exists today

Three Spanish posts, in `src/data/posts/`:

| slug | translationKey | pairs with |
|---|---|---|
| `guia-anuncios-ugc-ia` | `ai-ugc-ads-guide` | EN `ai-ugc-ads-guide` |
| `que-es-un-influencer-virtual` | `virtual-influencers-explained` | EN `what-is-a-virtual-influencer` |
| `creatividad-ia-para-marcas` | `creatividad-ia-para-marcas` | nothing — Spanish-only |

Fourteen English posts have no Spanish version.

## The task, in priority order

Write Spanish posts for these translation keys, in this order. Stop and hand back after
each one rather than batching four half-finished drafts.

1. **`how-to-create-a-virtual-influencer`** — completes the virtual-influencer cluster,
   which is where the demand and the existing indexing both are.
2. **`virtual-influencer-cost`** — same cluster; cost queries convert.
3. **`ai-ugc-ads-cost`** — pairs with the `anuncios ugc` demand already arriving.
4. **`do-ai-ugc-ads-work`** — closes the UGC cluster.

Do not start on the production-craft posts (`keyframe-to-video-workflow`,
`ai-ad-production-pipeline`, `beat-synced-video-ads`, `brand-consistency-ai-ads`,
`ai-character-consistency`, `veo-3-for-ad-creative`, `ugc-hook-patterns`). Their English
originals are not indexed; translating them adds pages the domain cannot currently get
indexed anyway.

## These are not translations

Write for Spanish search intent, not from the English sentence order. The English post is
the source of *facts and structure*, not of phrasing. Concretely:

- Headings must answer questions a Spanish speaker would type. `anuncios ugc`, `ugc para
  anuncios`, `influencer virtual`, `creador virtual` are the observed entry terms — use the
  ones that fit the post naturally, do not stuff all of them.
- Keep every number, claim and field note from the English original exactly as it is. Never
  invent a statistic, a price or a result that the English post does not contain. If the
  English text hedges ("roughly", "in our pipeline"), the Spanish must hedge too.
- Spanish from Spain and Latin America both read this. Prefer neutral vocabulary; avoid
  regionalisms that would trip either.

## Repo mechanics

### Creating the file

One file per post: `src/data/posts/<spanish-slug>.ts`, exporting `post: BlogPost`. Copy the
shape from `src/data/posts/que-es-un-influencer-virtual.ts`. The type lives in
`src/data/blogTypes.ts`; read its top-of-file comment — it documents the editorial pattern
this blog is built on (first block after every h2 answers the heading's implied question in
self-contained sentences; `stat` blocks carry `sourceUrl` for outside numbers; comparison
posts carry one `table`; `tldr` bullets are standalone quotable sentences).

Required fields: `slug`, `lang: 'es'`, `translationKey`, `title`, `description`, `excerpt`,
`datePublished`, `author`, `ogImageKey`, `tags`, `tldr`, `blocks`. Plus `faq` — every
existing post has one and the FAQ schema depends on it being rendered.

### The three things that will bite

1. **`translationKey` is the join key, and it is load-bearing.** Set it to the *English
   post's* key, not to the Spanish slug. That one field creates the hreflang pair, the
   "Read in English" switcher, and the post's placement in the Learn hub. Getting it wrong
   produces an orphan, not an error.

2. **A Spanish-only post needs a Learn hub entry; a paired one does not.** The hub
   (`src/data/learnHub.ts`) places content by `translationKey`. If you reuse an English
   key, the post inherits that key's existing section automatically. If you invent a new
   key — as `creatividad-ia-para-marcas` did — you must also add
   `{ kind: 'post', key: '<new-key>' }` to the right section in `hubSections`, or the build
   fails with `Learn hub coverage failed`. That failure is deliberate: the hub is the only
   nav entry into the blog, so an unplaced post is a post no reader can reach.

3. **Register the post.** Import it in `src/data/posts/index.ts` and add it to the
   `blogPosts` array. Nothing finds it otherwise.

### What happens by itself

Do not hand-edit any of these; they are generated and hand-edits will be overwritten:

- `sitemap.xml`, `feed.xml`, `llms.txt`, `llms-full.txt`
- hreflang alternates, including the self-referential and `x-default` tags
- the OG image at `/og/<ogImageKey>.png` (set `ogImageKey` to `blog-<slug>` and it appears)
- reading time, the `/es/blog` archive listing, the `/es/learn` hub section
- canonical, robots meta, the Article and FAQPage schema

### Optional: scrollytelling

`scenes` is optional. Posts that declare it render with a sticky visual stage; see
`src/data/blogVisuals.ts` for the spec types and `src/data/posts/keyframe-to-video-workflow.ts`
for a worked example. Skip it on a first draft — the prose ships fine without it, and a scene
whose `anchor` does not match an h2 `id` in the same post is a silent no-op.

## Verify before handing back

```
npx tsc -b          # must be clean
npm run build       # must complete; fails loudly on hub coverage problems
```

Then confirm, for a post with slug `<s>`:

```
grep -o '<link rel="alternate" hreflang="[^"]*"' dist/es/blog/<s>/index.html   # en, es, x-default
grep -c '<loc>https://shot.is/es/blog/<s></loc>' dist/sitemap.xml              # 1
ls dist/og/blog-<s>.png                                                        # exists
```

And open `/es/learn` and `/es/blog` to confirm the post appears in both, in the right
section.

## Out of scope

Do not touch `sitemap.xml`, `canonical`, `robots.txt` or the hreflang logic. They were
verified correct against live Googlebot responses on 2026-09-22; the indexing problem is
external authority, not markup, and "fixing" correct markup only risks breaking what works.

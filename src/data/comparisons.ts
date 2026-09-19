import type { ComparisonPageContent } from './comparisonTypes';

export * from './comparisonTypes';

/**
 * Comparison & alternatives pages. Competitor facts verified 2026-07-06
 * (official pricing pages where public; third-party reports flagged in copy).
 * Arcads does not publish pricing — every Arcads price is hedged as reported.
 * Re-verify facts when `asOf` ages past a quarter.
 */
export const comparisonPages: ComparisonPageContent[] = [
  {
    kind: 'vs',
    path: '/vs/heygen',
    slug: 'vs-heygen',
    navLabel: 'SHOT.IS vs HeyGen',
    title: 'SHOT.IS vs HeyGen: AI UGC Ads vs Avatar Video Platform',
    description:
      'HeyGen renders avatar spokesperson video and translation. SHOT.IS generates full-scene AI UGC ads with a studio pipeline. An honest comparison for ad teams.',
    eyebrow: 'SHOT.IS VS HEYGEN',
    h1: 'DIFFERENT JOBS, DIFFERENT TOOLS.',
    lede:
      'HeyGen is the most mature AI avatar platform, covering talking heads, translation, and a strong API. SHOT.IS is an AI ad studio that generates full scenes rather than presenters in front of a background. Which one you need depends on the ad you are making.',
    competitor: {
      name: 'HeyGen',
      url: 'https://www.heygen.com/',
      oneLiner:
        'a general-purpose AI avatar video platform with best-in-class lip-sync and 175+ language translation, built for spokesperson-style video at scale.',
    },
    verdict:
      'Choose HeyGen when the ad is a person talking to camera, especially one presenter localized into many languages, or video generated programmatically through an API. Choose SHOT.IS when the ad has to look like real UGC footage: a creator in a real scene, product in hand, cut to music, delivered as a tested variant pack rather than a rendered avatar clip.',
    tableCaption: 'SHOT.IS vs HeyGen for performance ad creative',
    rows: [
      {
        feature: 'What it is',
        shotIs: 'AI ad studio + self-serve app (studio.shot.is): full-scene UGC-style ads via keyframe-to-video generation',
        competitor: 'AI avatar video platform: talking-head videos from 500+ stock avatars or custom digital twins',
      },
      {
        feature: 'Visual approach',
        shotIs: 'Generated scenes: creator, location, product, and camera movement are synthesized and QA-gated per shot',
        competitor: 'Avatar composited over backgrounds; realism is in the face and lip-sync, not the scene',
      },
      {
        feature: 'Strongest at',
        shotIs: 'Native-feeling UGC ads for TikTok/Meta; hook variant volume; brand and character consistency across campaigns',
        competitor: 'Multilingual spokesperson video (175+ languages with lip-synced translation); API-driven generation',
      },
      {
        feature: 'Consistency system',
        shotIs: 'Scene Bible (locked location, outfit, look constants) + product reference images + vision QA on every frame',
        competitor: 'Consistent avatar identity by design; scene/product context is limited to what compositing allows',
      },
      {
        feature: 'Pricing model',
        shotIs: 'Self-serve launch offer from $4.99/video; volume video packs in Studio; managed campaigns scoped per brief',
        competitor: 'Public plans from $29/mo (Creator) with credit metering; Avatar IV/V burns ~20 credits per minute',
      },
      {
        feature: 'Editing & delivery',
        shotIs: 'Delivered as campaign-ready variants: beat-synced edit, captions, hook alternates, platform formats',
        competitor: 'Renders a clip; ad assembly, music, and variant testing happen in your own tools',
      },
      {
        feature: 'Common complaints to check',
        shotIs: 'Managed production is custom-quoted; self-serve and pack pricing stay public in Studio',
        competitor: 'Credit drain on failed renders and queue delays are the top user complaints (Trustpilot ~2.4/5 vs G2 4.8/5)',
      },
    ],
    whenToChooseThem: [
      'Your ad is a presenter explaining something to camera and polish matters more than UGC texture.',
      'You need one video localized into dozens of languages with lip-sync, where HeyGen’s translation leads the category.',
      'You want a self-serve API to generate video programmatically inside your own product or workflow.',
      'You need a custom digital twin of a real, consenting spokesperson.',
    ],
    whenToChooseUs: [
      'The ad has to read as native UGC in the feed: a creator in a scene with your product rather than an avatar in front of a background.',
      'You test creative at volume and care about marginal cost per variant, hook refreshes, and weekly batches.',
      'Product fidelity is critical: readable labels, correct packaging, the same face across every shot.',
      'You want one accountable pipeline from brief to campaign-ready files, covering generation, QA, music, edit, and formats.',
    ],
    faq: [
      {
        question: 'Is SHOT.IS a HeyGen alternative?',
        answer:
          'For UGC-style performance ads, yes. For avatar spokesperson video, no. SHOT.IS generates full scenes with a studio QA pipeline, while HeyGen renders avatar-led clips. Some teams run both: HeyGen for multilingual explainer content, SHOT.IS for feed-native ad creative.',
      },
      {
        question: 'Which is cheaper, SHOT.IS or HeyGen?',
        answer:
          'For a single talking-head clip, HeyGen wins: its Creator plan starts at $29/month. For a tested pack of ad variants, compare the full cost. HeyGen’s credits cover the render only, while a SHOT.IS engagement covers generation candidates, QA, music, assembly, and hook variants. The honest comparison unit is a campaign-ready variant rather than a rendered minute.',
      },
      {
        question: 'Can HeyGen make UGC-style ads?',
        answer:
          'It approximates them with UGC-styled avatars, and for some offers that is enough. The gap shows in scene realism: hands using a product, real locations, camera energy. Avatar compositing does not generate that layer, and it is what the SHOT.IS keyframe-to-video pipeline produces.',
      },
    ],
    asOf: '2026-07-06',
  },
  {
    kind: 'vs',
    path: '/vs/arcads',
    slug: 'vs-arcads',
    navLabel: 'SHOT.IS vs Arcads',
    title: 'SHOT.IS vs Arcads: AI UGC Ad Studio vs AI Actor Platform',
    description:
      'Arcads offers 1,000+ realistic AI actors. SHOT.IS runs a full-scene pipeline with QA, edit, and variant packs. An honest comparison for performance teams.',
    eyebrow: 'SHOT.IS VS ARCADS',
    h1: 'AI ACTORS VS A FULL AD PIPELINE.',
    lede:
      'Arcads is the premium AI-actor platform, with the most natural synthetic performers in the category. SHOT.IS is an ad studio that generates the whole ad: scene, creator, product, edit. The right pick depends on where your bottleneck sits.',
    competitor: {
      name: 'Arcads',
      url: 'https://www.arcads.ai/',
      oneLiner:
        'a premium AI UGC platform with 1,000+ AI actors known for the most natural expressions and delivery in the category.',
    },
    verdict:
      'Choose Arcads when actor realism decides your ad. Its performers’ micro-expressions are the hardest to clock as AI in short clips, and you finish the edit yourself with captions, music, and B-roll. Choose SHOT.IS when you need the whole ad produced, covering scene generation with product fidelity, QA, beat-synced edit, and hook variants, or when unpublished pricing around $11+ per clip breaks a high-volume testing budget.',
    tableCaption: 'SHOT.IS vs Arcads for UGC-style ad production',
    rows: [
      {
        feature: 'What it is',
        shotIs: 'AI ad studio + self-serve app: full-scene ads generated keyframe-first with vision QA at every stage',
        competitor: 'AI actor platform: pick a synthetic performer, script the ad, render UGC-style clips',
      },
      {
        feature: 'Visual approach',
        shotIs: 'Whole scene generated and locked via a Scene Bible: location, outfit, product, camera movement',
        competitor: 'Actor-led clips with strong facial performance; scene and product context is thinner',
      },
      {
        feature: 'Strongest at',
        shotIs: 'End-to-end variant packs: product fidelity, consistency across shots, edit and music included',
        competitor: 'Performer realism: expressions, blink timing, natural delivery in sub-60-second ads',
      },
      {
        feature: 'Editing & delivery',
        shotIs: 'Campaign-ready files: beat grid edit, captions, formats, hook alternates named for testing',
        competitor: 'Renders clips; users typically finish captions, music, and B-roll in CapCut or similar',
      },
      {
        feature: 'Pricing model',
        shotIs: 'Self-serve launch offer from $4.99/video; volume video packs in Studio; managed campaigns scoped per brief',
        competitor: 'Not published. Third-party reports put entry around $110/mo for ~10 videos; verify at signup',
      },
      {
        feature: 'Trial',
        shotIs: 'Self-serve studio app lets you generate before committing to a studio engagement',
        competitor: 'No free trial reported; first clip requires a paid plan',
      },
      {
        feature: 'Common complaints to check',
        shotIs: 'Managed production is custom-quoted; self-serve and pack pricing stay public in Studio',
        competitor: 'Credits burned on unusable generations, most-realistic actors gated to custom Pro tiers, email-only cancellation',
      },
    ],
    whenToChooseThem: [
      'Actor realism is your one deciding factor and reviewers’ consensus on Arcads’ performers matches what your ads need.',
      'You already have an editing workflow (CapCut, Premiere) and only need strong raw performance clips.',
      'Your team wants a pure self-serve tool and your budget clears roughly $11+ per video (as third-party reports suggest).',
    ],
    whenToChooseUs: [
      'You need finished ads rather than raw clips, with QA, music, captions, beat-synced edit, and platform formats included.',
      'Product accuracy matters: labels, packaging, and the same product in every shot survive our keyframe QA gate.',
      'You want hook-variant economics: regenerate the first two seconds several ways instead of re-rendering whole clips.',
      'You want to try before committing: the self-serve studio at studio.shot.is generates under your own account.',
    ],
    faq: [
      {
        question: 'Is SHOT.IS a cheaper Arcads alternative?',
        answer:
          'Yes for self-serve generation: the SHOT.IS launch offer starts at $4.99 per video, while Arcads pricing is reported around $11+ per clip and remains unpublished. Managed SHOT.IS production is a different-shaped product because it also covers creative direction, QA, editing, and named testing variants.',
      },
      {
        question: 'Are Arcads’ AI actors more realistic than SHOT.IS creators?',
        answer:
          'In facial performance for close-up talking segments, Arcads is strong, and reviewers rank its actors highest in the category. SHOT.IS optimizes a different realism: the scene. A creator holding your actual product in a coherent location, consistent across eight shots, reads as real UGC even when the face is not the star of the frame.',
      },
      {
        question: 'Can I use both SHOT.IS and Arcads?',
        answer:
          'Yes, and performance teams do mix tools, because no single platform covers the whole pipeline in 2026. A workable split: Arcads for actor-led testimonial angles, SHOT.IS for scene-led product demos, lifestyle formats, and the assembly and QA layer.',
      },
    ],
    asOf: '2026-07-06',
  },
  {
    kind: 'vs',
    path: '/vs/creatify',
    slug: 'vs-creatify',
    navLabel: 'SHOT.IS vs Creatify',
    title: 'SHOT.IS vs Creatify: Studio Pipeline vs URL-to-Video Volume',
    description:
      'Creatify turns product URLs into bulk avatar ads from $39/mo. SHOT.IS builds full-scene AI UGC ads with QA and editing. Compared for ecommerce and UA teams.',
    eyebrow: 'SHOT.IS VS CREATIFY',
    h1: 'BULK RENDERS VS BUILT ADS.',
    lede:
      'Creatify is the volume play: paste a product URL, get batches of avatar-fronted video ads at the lowest entry price in the category. SHOT.IS is a studio pipeline that builds fewer, stronger, scene-real ads. The trade is throughput versus fidelity.',
    competitor: {
      name: 'Creatify',
      url: 'https://creatify.ai/',
      oneLiner:
        'a URL-to-video ad generator with 1,500+ stock avatars, batch variant output, and the cheapest serious entry price in the category ($39/mo Starter).',
    },
    verdict:
      'Choose Creatify when you want maximum cheap throughput: dozens of quick avatar variants from a product link to smoke-test offers, accepting template-look creative and credit-metered re-renders. Choose SHOT.IS when your test measures creative quality, with scene-real UGC, accurate products, QA-gated generation, and finished edits. You get fewer variants, and each one competes in the feed.',
    tableCaption: 'SHOT.IS vs Creatify for ecommerce ad creative',
    rows: [
      {
        feature: 'What it is',
        shotIs: 'AI ad studio + self-serve app: keyframe-first scene generation with vision QA and finished edits',
        competitor: 'URL-to-video generator: scripts, avatars, and batch ad variants auto-built from a product link',
      },
      {
        feature: 'Visual approach',
        shotIs: 'Generated scenes with locked product references; label readability passes a QA gate rather than luck',
        competitor: 'Stock avatar presenters (1,500+) over product footage/images; template-driven look',
      },
      {
        feature: 'Strongest at',
        shotIs: 'Creative that has to compete on quality: product demos, lifestyle scenes, brand-consistent campaigns',
        competitor: 'Throughput and price: many variants fast, plus extras like competitor ad tracking and ad launching',
      },
      {
        feature: 'Pricing model',
        shotIs: 'Self-serve launch offer from $4.99/video; volume video packs in Studio; managed campaigns scoped per brief',
        competitor: 'Public plans from $39/mo Starter, 100 credits; real avatar generations reportedly burn 50–90 credits each',
      },
      {
        feature: 'Editing & delivery',
        shotIs: 'Beat-synced edit, captions, hook alternates, and platform formats, delivered campaign-ready',
        competitor: 'Auto-assembled videos; script and template rework commonly done by hand afterwards',
      },
      {
        feature: 'Common complaints to check',
        shotIs: 'Managed production is custom-quoted; self-serve and pack pricing stay public in Studio',
        competitor: 'Credit opacity (headline video counts vs real credit burn), lip-sync re-renders, billing disputes; Trustpilot rating currently suspended',
      },
    ],
    whenToChooseThem: [
      'You are smoke-testing many offers or SKUs and need the cheapest possible variant volume today.',
      'Template-look avatar ads are acceptable for your vertical and platforms.',
      'You value the bundled extras: competitor ad tracking and pushing ads directly to ad accounts.',
    ],
    whenToChooseUs: [
      'Your test measures creative quality itself: scene-real UGC with your actual product rather than a presenter over a slideshow.',
      'Brand consistency across a campaign matters: same creator, same world, every shot QA-checked.',
      'You want finished ads with music and captions instead of assembling renders yourself.',
      'You have been burned by credit-metered re-renders and prefer QA gates before generation spend.',
    ],
    faq: [
      {
        question: 'Is Creatify cheaper than SHOT.IS?',
        answer:
          'At the entry point, yes: $39/month is the lowest serious price in the category. Reviewers flag credit burn as the caveat, since real avatar generations reportedly cost 50–90 credits, so a 100-credit plan covers one or two polished videos rather than the headline number. SHOT.IS competes on cost per variant worth testing rather than cheapest render.',
      },
      {
        question: 'When is URL-to-video good enough?',
        answer:
          'When you are testing the offer rather than the creative, quick avatar variants answer that cheaply: new SKUs, price points, headline angles. Once a winner emerges and creative quality becomes the growth lever, scene-real UGC production is the next step up.',
      },
      {
        question: 'Do platforms penalize AI-generated ads like these?',
        answer:
          'TikTok and Meta allow AI creative but require disclosure labels in defined cases, and some Creatify users report distribution issues with obviously synthetic output. The mitigation is the same everywhere: disclose where required, and make creative that earns its place in the feed regardless of how you made it. That is the whole argument for scene realism.',
      },
    ],
    asOf: '2026-07-06',
  },
  {
    kind: 'vs',
    path: '/vs/hiring-ugc-creators',
    slug: 'vs-hiring-ugc-creators',
    navLabel: 'AI UGC vs Hiring Creators',
    title: 'SHOT.IS vs Hiring UGC Creators: Cost, Speed, Trust',
    description:
      'Human UGC creators charge $150–$500+ per video before usage rights. See when to hire humans, when to generate, and how variant costs really compare.',
    eyebrow: 'AI UGC VS HUMAN CREATORS',
    h1: 'THE HONEST SPLIT: HUMANS FOR TRUST, AI FOR VOLUME.',
    lede:
      'Nobody here is telling you to replace your creators. Human creators win specific jobs that AI should not attempt. The economics of variant testing favor generation, though, because hooks fatigue in days, and pretending otherwise wastes budget in both directions.',
    competitor: {
      name: 'Human UGC creators',
      url: 'https://www.billo.app/',
      oneLiner:
        'independent creators and marketplaces (e.g. Billo at ~$99/video, typical market rates $150–$500+ before usage rights) filming authentic product content.',
    },
    verdict:
      'Hire human creators for genuine testimonials, founder stories, and audience trust, where the whole value of the content is that it is true. Use SHOT.IS AI UGC for the testing workload around it: hook variants, format experiments, localization, and seasonal refreshes. Variant five from a human costs most of a re-shoot; variant five from the pipeline costs a couple of regenerated shots.',
    tableCaption: 'AI UGC (SHOT.IS) vs hiring human UGC creators',
    rows: [
      {
        feature: 'Cost per video',
        shotIs: 'From low hundreds per finished studio video; marginal variants cost a fraction of the first',
        competitor: '$150–$500+ per video typical market rate, before usage rights for paid placements',
      },
      {
        feature: 'Cost of variant #5',
        shotIs: 'A few regenerated shots dropped into the existing edit, with Scene Bible and music already paid for',
        competitor: 'Close to the cost of variant #1: re-brief, re-shoot, re-edit, new usage negotiation',
      },
      {
        feature: 'Turnaround',
        shotIs: 'Days; ongoing programs ship ~6 hook variants per week per persona',
        competitor: '1–3 weeks per round: casting, shipping product, filming, revisions',
      },
      {
        feature: 'Authenticity',
        shotIs: 'Synthetic and disclosed as such; strongest in scene-led formats where the face is not the proof',
        competitor: 'Real people and real reactions, irreplaceable for testimonials and trust-led angles',
      },
      {
        feature: 'Consistency & control',
        shotIs: 'Same persona, same world, any week, with no scheduling, usage windows, or creator churn',
        competitor: 'Dependent on individual creators’ availability, style drift, and renewal terms',
      },
      {
        feature: 'Usage rights',
        shotIs: 'Delivered assets are yours for commercial use, with no per-placement rights negotiation',
        competitor: 'Usage rights are a separate, recurring line item that often exceeds the filming fee',
      },
    ],
    whenToChooseThem: [
      'Testimonials and reviews. A fabricated testimonial is both ineffective and a policy violation, so this job stays humans-only.',
      'Founder and brand-story content where the person is the point.',
      'Influencer partnerships where you are buying the creator’s audience and credibility rather than footage.',
      'Categories where platform or legal rules restrict synthetic people (verify per vertical).',
    ],
    whenToChooseUs: [
      'Hook and format testing at the pace ad accounts fatigue, which means several fresh openings per week.',
      'Localization: winning variants re-generated for new markets without re-casting.',
      'Product demo and lifestyle formats where the scene sells and the presenter is interchangeable.',
      'Seasonal refreshes and offer swaps on proven concepts.',
    ],
    faq: [
      {
        question: 'Do AI UGC ads perform as well as human creator ads?',
        answer:
          'Where testing velocity decides outcomes, yes. In SHOT.IS programs, a mobile gaming studio cut CPI 31% with six AI hook variants a week, and a DTC brand lifted ROAS 1.7x on its best AI variant. Where audience trust is the mechanism, as in testimonials and reviews, human creators keep the advantage, and honest AI shops say so.',
      },
      {
        question: 'What does the hybrid setup look like in practice?',
        answer:
          'A common split: two or three human creators on retainer for testimonial and story content, plus an AI pipeline feeding the ad account weekly hook variants and demo formats. Human content anchors trust, AI volume finds winners cheaply, and winning AI angles sometimes get re-shot with humans for scale.',
      },
      {
        question: 'Is it legal and platform-compliant to run AI creators in ads?',
        answer:
          'Yes, with disclosure. TikTok and Meta require AI labels in defined cases, and the EU AI Act adds transparency obligations. Two lines stay uncrossed: impersonating real people and fabricating testimonials. SHOT.IS does neither.',
      },
    ],
    asOf: '2026-07-06',
  },
  {
    kind: 'alternatives',
    path: '/alternatives/heygen',
    slug: 'alternatives-heygen',
    navLabel: 'HeyGen Alternatives',
    title: 'Best HeyGen Alternatives for UGC-Style Ads (2026)',
    description:
      'HeyGen alternatives by job: SHOT.IS for scene-real AI UGC ads, Arcads for actor realism, Creatify for cheap volume, Synthesia for training video.',
    eyebrow: 'HEYGEN ALTERNATIVES',
    h1: 'HEYGEN ALTERNATIVES, SORTED BY JOB.',
    lede:
      'Most "HeyGen alternatives" lists compare feature checkboxes. Sort by job instead: what ad are you making, and which tool was built for it? HeyGen is excellent at its core job. Your question is whether that job is yours.',
    verdict:
      'Teams look for a HeyGen alternative for three reasons: the output looks like an avatar video when the job needed native UGC; credit metering (Avatar IV/V at ~20 credits per minute) makes volume testing expensive; or render queues slow a weekly creative cadence. Pick by job: SHOT.IS for scene-real UGC ad production, Arcads for maximum actor realism, Creatify for cheapest bulk variants, Synthesia for enterprise training video, Captions when you have real footage and need AI editing.',
    alternatives: [
      {
        name: 'SHOT.IS',
        url: '/',
        bestFor: 'scene-real AI UGC ads, produced end to end',
        summary:
          'A self-serve AI UGC ad generator plus managed studio that generates full scenes, covering creator, location, and product, keyframe-first with vision QA. Self-serve video starts at a $4.99 launch price, volume packs live in Studio, and managed campaign work is scoped per brief.',
      },
      {
        name: 'Arcads',
        url: 'https://www.arcads.ai/',
        bestFor: 'the most realistic AI actors in short ads',
        summary:
          'A premium platform with 1,000+ AI actors whose expressions and delivery reviewers rank hardest to clock as synthetic. You get strong raw clips and finish captions, music, and B-roll yourself. Pricing stays unpublished; third-party reports suggest ~$110/month entry with no free trial.',
      },
      {
        name: 'Creatify',
        url: 'https://creatify.ai/',
        bestFor: 'cheapest bulk ad variants from a product URL',
        summary:
          'Paste a product link and get batches of avatar-fronted ads from $39/month, plus competitor ad tracking and direct ad launching. You trade that for template-look creative and credit burn, with real generations reportedly costing 50–90 credits each. Good for smoke-testing offers at volume.',
      },
      {
        name: 'Synthesia',
        url: 'https://www.synthesia.io/',
        bestFor: 'enterprise training and internal comms video',
        summary:
          'The enterprise-grade avatar platform (from $29/month, enterprise deals far higher) with strong compliance, SCORM export, and team workflows. Usually the wrong tool for performance ads, and the right one for L&D at scale, where it beats every entry on this list.',
      },
      {
        name: 'Captions',
        url: 'https://www.captions.ai/',
        bestFor: 'AI editing on real creator footage',
        summary:
          'If your gap is editing rather than generation, Captions covers it better than an avatar generator: you have real creator videos and need captions, dubbing, and AI-assisted cuts. Reviewers in 2026 pick it for teams with real creator partners.',
      },
      {
        name: 'MakeUGC',
        url: 'https://www.makeugc.ai/',
        bestFor: 'first AI UGC tests on a small budget',
        summary:
          'A budget entry into AI UGC ads, reported around $29/month for ~10 videos across 35+ languages. Avatars and voices come out less polished than Arcads or HeyGen, so treat it as a low-risk way to learn whether AI UGC formats suit your offer before you spend real budget.',
      },
    ],
    faq: [
      {
        question: 'What is the best HeyGen alternative for TikTok and Meta ads?',
        answer:
          'For ads that need to read as native UGC: SHOT.IS if you want finished, scene-real ads produced end to end; Arcads if you want maximum actor realism and will edit yourself; Creatify if you want the most variants per dollar and can accept template-look output.',
      },
      {
        question: 'Why do teams leave HeyGen for ads specifically?',
        answer:
          'Three patterns repeat in reviews. Avatar-over-background output underperforms in feeds that reward authentic-looking footage. Credit metering makes weekly variant testing expensive, with Avatar IV/V at roughly 20 credits per minute. Render queues conflict with a testing cadence. Most of those teams keep HeyGen for spokesperson and localization jobs, where the platform stays strong.',
      },
      {
        question: 'Is there a free HeyGen alternative?',
        answer:
          'Creatify has a watermarked free tier (10 credits/month) and HeyGen itself offers 3 free videos a month. For ad-grade output, budget realistically instead: entry points run $29–$110/month across the category, and the cheap tiers meter credits aggressively.',
      },
    ],
    asOf: '2026-07-06',
  },
  {
    kind: 'alternatives',
    path: '/alternatives/arcads',
    slug: 'alternatives-arcads',
    navLabel: 'Arcads Alternatives',
    title: 'Best Arcads Alternatives by Budget and Job (2026)',
    description:
      'Arcads alternatives compared: SHOT.IS for full-pipeline scene-real ads, Creatify for cheap volume, HeyGen for languages, Billo for real human creators.',
    eyebrow: 'ARCADS ALTERNATIVES',
    h1: 'ARCADS ALTERNATIVES, WITHOUT THE SPIN.',
    lede:
      'Arcads makes the most realistic AI actors in the category, and it earned that reputation. Teams still shop for alternatives over unpublished pricing (~$110/month reported entry, no trial), credits burned on unusable renders, and the missing editing layer. Here is the honest map.',
    verdict:
      'Leaving Arcads over price? Creatify ($39/month) and MakeUGC (~$29/month reported) trade realism for throughput. Leaving over the incomplete workflow, where raw clips still need captions, music, and B-roll? SHOT.IS delivers finished scene-real ads with QA and edit included, and you can try the pipeline self-serve first. If your job was never UGC ads, HeyGen covers spokesperson and localization work, and Billo books real human creators.',
    alternatives: [
      {
        name: 'SHOT.IS',
        url: '/',
        bestFor: 'finished scene-real ads rather than raw actor clips',
        summary:
          'An AI ad studio that generates the whole ad, with creator, scene, and product held to QA-gated fidelity, then delivers beat-synced, caption-ready variant packs. It answers the two gaps reviewers cite most with Arcads: the missing edit layer and credit burn on unusable renders, since QA gates come before generation spend. Try it self-serve at studio.shot.is; studio work is scoped per brief.',
      },
      {
        name: 'Creatify',
        url: 'https://creatify.ai/',
        bestFor: 'volume testing on a real budget',
        summary:
          'From $39/month with 1,500+ avatars and URL-to-video batch generation, plus competitor ad tracking. The actors look visibly less natural than Arcads’, which is the trade for roughly a third of the reported entry price and a public pricing page.',
      },
      {
        name: 'HeyGen',
        url: 'https://www.heygen.com/',
        bestFor: 'multilingual spokesperson video and API workflows',
        summary:
          'HeyGen skips UGC specialization and wins on translation (175+ languages with lip-sync) and API depth. If your "Arcads use case" was localized presenter video all along, HeyGen from $29/month fits better.',
      },
      {
        name: 'MakeUGC',
        url: 'https://www.makeugc.ai/',
        bestFor: 'the smallest budgets',
        summary:
          'Reported around $29/month for ~10 videos across 35+ languages. Output looks noticeably less polished than Arcads, and it remains the cheapest way to check whether AI UGC formats move your metrics before you commit serious spend.',
      },
      {
        name: 'Billo',
        url: 'https://www.billo.app/',
        bestFor: 'real human creators at marketplace prices',
        summary:
          'The non-AI benchmark: real creators filming your product from ~$99/video. Shipping, filming, and revisions make it slower, and variants stay expensive, but the authenticity is structural. Pick it for testimonial-led strategies where synthetic actors have no place.',
      },
      {
        name: 'Icon',
        url: 'https://icon.com/',
        bestFor: 'funded DTC brands wanting humans + software workflow',
        summary:
          'Pivoted from AI generation to "The Human Admaker": real creators film your ads, reported around $999 for 6 ads, while its software handles briefs, editing, and Meta launch. It sits between marketplaces and agencies as a managed human option.',
      },
    ],
    faq: [
      {
        question: 'What is the cheapest Arcads alternative?',
        answer:
          'Creatify at $39/month is the cheapest with a public price and serious features, and MakeUGC is reported around $29/month. Both trade actor realism for price. Watch the credit mechanics on any cheap tier, because headline video counts rarely survive contact with real credit burn.',
      },
      {
        question: 'Which alternative fixes Arcads’ missing editing workflow?',
        answer:
          'SHOT.IS is the only option here that delivers finished ads with music, captions, beat-synced cuts, and platform formats instead of raw renders. If you like Arcads’ actors and only miss the editing, the lighter fix is keeping Arcads and finishing in CapCut, which is what most of its users do.',
      },
      {
        question: 'Should I switch from Arcads to a human creator marketplace?',
        answer:
          'Split rather than switch, if your best-performing angles are testimonial-shaped. Fabricated testimonials are off-limits for synthetic actors, so that job belongs to real people through Billo, Icon, or direct creator relationships. Keep AI generation for the volume jobs: hooks, demos, localization, refreshes.',
      },
    ],
    asOf: '2026-07-06',
  },
  {
    kind: 'alternatives',
    path: '/compare/ai-ugc-ad-tools',
    slug: 'compare-ai-ugc-ad-tools',
    navLabel: 'AI UGC Ad Tools Compared',
    title: 'Best AI UGC Ad Tools in 2026: An Honest Category Map',
    description:
      'AI UGC ad tools in 2026 compared by what each does best: SHOT.IS, Arcads, Creatify, HeyGen, MakeUGC, Captions, and Billo, with real pricing.',
    eyebrow: 'CATEGORY MAP',
    h1: 'AI UGC AD TOOLS: WHO IS BEST AT WHAT.',
    lede:
      'Every tool in this category claims to be the best AI UGC ad generator. None of them holds that title outright. Each one leads at something, and performance teams in 2026 run two or three of them rather than one. Here is the honest map, including where we sit on it.',
    verdict:
      'Pick by bottleneck rather than brand: Arcads for actor realism, Creatify for cheapest volume, HeyGen for languages and API, SHOT.IS for finished scene-real ads with QA and edit included, MakeUGC for first tests on small budgets, Captions for editing real footage, and Billo when the job needs humans. Most teams pair a volume tool with a quality tool, which is the split this page describes.',
    alternatives: [
      {
        name: 'SHOT.IS',
        url: '/',
        bestFor: 'finished, scene-real UGC ads (studio + self-serve)',
        summary:
          'Generates the whole ad rather than only an actor clip: keyframe-first scenes with locked product references, vision QA, beat-synced edits, and hook variants named for testing. Self-serve video starts at a $4.99 launch price, volume packs are available in Studio, and managed campaigns are scoped per brief.',
      },
      {
        name: 'Arcads',
        url: 'https://www.arcads.ai/',
        bestFor: 'AI actor realism in short ads',
        summary:
          'The performer-realism leader, with 1,000+ AI actors whose delivery is hardest to clock as synthetic. Trade-offs: unpublished pricing (reported ~$110/month entry), no trial, no editing layer, and the most realistic actors reportedly gated to custom tiers.',
      },
      {
        name: 'Creatify',
        url: 'https://creatify.ai/',
        bestFor: 'bulk variants from a product URL, lowest entry price',
        summary:
          'From $39/month: URL-to-video generation, 1,500+ avatars, competitor ad tracking, direct ad launching. Trade-offs: template-look output, credit burn well above headline video counts, and billing complaints loud enough that its Trustpilot rating is currently suspended.',
      },
      {
        name: 'HeyGen',
        url: 'https://www.heygen.com/',
        bestFor: 'multilingual spokesperson video and the strongest API',
        summary:
          'From $29/month; 175+ languages with lip-synced translation, custom digital twins, mature API. Trade-offs for ads: avatar-over-background output reads as corporate video in a UGC feed, and Avatar IV/V credit burn (~20 credits/minute) makes volume testing expensive.',
      },
      {
        name: 'MakeUGC',
        url: 'https://www.makeugc.ai/',
        bestFor: 'validating AI UGC on the smallest budget',
        summary:
          'Reported ~$29/month for ~10 videos in 35+ languages. Visibly less polished than the premium tools, and the cheapest way to learn whether AI UGC formats work for your offer.',
      },
      {
        name: 'Captions',
        url: 'https://www.captions.ai/',
        bestFor: 'AI editing, captions, and dubbing on real creator footage',
        summary:
          'An AI editing layer rather than a generator. Reviewers in 2026 pick it for teams that already have human creator partners and need captions, cuts, and localization on real footage.',
      },
      {
        name: 'Billo',
        url: 'https://www.billo.app/',
        bestFor: 'real human UGC at marketplace prices',
        summary:
          'The non-AI benchmark: real creators from ~$99/video, where typical market rates run $150–$500+ elsewhere before usage rights. Slow and expensive per variant, structurally authentic, and the only legitimate option for real testimonials.',
      },
    ],
    faq: [
      {
        question: 'What is the best AI UGC ad tool overall in 2026?',
        answer:
          'No single tool wins, because they optimize different bottlenecks. The honest heuristic: Arcads if actor realism decides your ads, Creatify if variant volume per dollar does, HeyGen if languages or API access do, and SHOT.IS if finished quality per variant does. Most performance teams run a volume tool plus a quality tool.',
      },
      {
        question: 'How much do AI UGC ad tools cost in 2026?',
        answer:
          'Public entry points: HeyGen $29/month, Creatify $39/month, MakeUGC ~$29/month (reported), Arcads ~$110/month (reported, unpublished), and Billo ~$99/video for real humans. Studio pipelines like SHOT.IS scope per brief. For paid social, the number that decides your budget is marginal cost per tested variant rather than the subscription line.',
      },
      {
        question: 'Do I need disclosure labels for AI UGC ads?',
        answer:
          'On TikTok and Meta, yes in defined cases. Both platforms require AI content labels, and the EU AI Act adds transparency obligations. Two hard lines apply everywhere: no impersonating real people, and no fabricated testimonials presented as real customer experiences.',
      },
    ],
    asOf: '2026-07-06',
  },
];

export const comparisonPagesByPath = new Map(comparisonPages.map((page) => [page.path, page]));

import { siteBaseUrl, type ServicePageContent } from './seo';

/**
 * Vertical use-case pages. They reuse ServicePageContent so ServicePage.tsx
 * and buildServiceSchema render them with zero extra component work.
 * Rule: each page must carry vertical-specific substance (platform mix,
 * the funnel metric that vertical optimizes, format examples, its own FAQ) —
 * a page that only re-states the service pages is thin content and should
 * not ship.
 */
export const useCasePages: ServicePageContent[] = [
  {
    path: '/use-cases/ecommerce',
    slug: 'use-cases-ecommerce',
    dateModified: '2026-07-06',
    navLabel: 'AI Ads for Ecommerce',
    title: 'AI UGC Ads for Ecommerce & DTC Brands | SHOT.IS',
    description:
      'How ecommerce and DTC brands use SHOT.IS AI UGC ads: product demo variants, offer-led hooks, seasonal launches, and ROAS-driven creative testing without shoots.',
    eyebrow: 'AI ADS FOR ECOMMERCE',
    h1: 'PRODUCT CREATIVE THAT KEEPS UP WITH YOUR CATALOG.',
    lede:
      'Ecommerce teams buy testing velocity: more product demos, more offer angles, more seasonal refreshes. SHOT.IS turns product pages and reference photos into UGC-style ad variants with the label always readable and the product always right.',
    primaryCta: 'Start an ecommerce sprint',
    secondaryCta: 'See the workflow',
    ogImage: `${siteBaseUrl}/media/hero/shot-hero-poster.webp`,
    outputs: [
      'UGC-style product demos and unboxing-format videos for TikTok, Reels, and Shorts — built from product reference images so labels and packaging stay accurate.',
      'Offer-led hook variants for launches, bundles, and seasonal promotions: same body, new opening, priced for testing rather than re-production.',
      'Before/after, problem-solution, and social-proof angle packs mapped to ROAS and CPA goals per funnel stage.',
      'Localized versions of winning variants for new markets without re-shooting.',
    ],
    workflow: [
      {
        title: 'Product fidelity first',
        body: 'We lock product reference images and a Scene Bible so every generated shot shows your actual product — the make-or-break QA gate for ecommerce creative.',
      },
      {
        title: 'Angle map per SKU',
        body: 'Each product gets hooks mapped to buyer awareness: problem call-outs for cold traffic, comparison and objection-handling for retargeting.',
      },
      {
        title: 'Generate variant packs',
        body: 'Concepts become platform-ready vertical videos with captions, in batches sized for a real creative test, not a single hero asset.',
      },
      {
        title: 'Refresh by signal',
        body: 'Winners get hook refreshes and seasonal re-skins in days — creative fatigue is answered with variants, not new productions.',
      },
    ],
    proof: [
      {
        label: 'The metric',
        body: 'Ecommerce buys on ROAS and CPA. The lever is marginal cost per variant: testing five more angles should not cost five more productions.',
      },
      {
        label: 'Platform mix',
        body: 'TikTok and Meta placements first (Reels, Stories, feed), with cutdowns for YouTube Shorts and landing-page loops.',
      },
      {
        label: 'Where AI wins',
        body: 'Catalog breadth and speed: seasonal refreshes, bundle offers, and localization — jobs where a human re-shoot per variant never pays back.',
      },
    ],
    caseStudy: {
      client: 'DTC ecommerce brand (anonymized)',
      challenge:
        'A holiday launch required 12 ad concepts across three product lines in two weeks. Traditional shoot turnaround was four weeks.',
      outcome:
        'AI video ads delivered 18 concepts in eight days. Best-performing variant lifted ROAS by 1.7x and was iterated into six retargeting cutdowns.',
    },
    questions: [
      {
        question: 'Can AI ads show my actual product accurately?',
        answer:
          'Yes, with reference discipline. SHOT.IS generates keyframes from your product reference images and QA-checks label readability and packaging fidelity before any animation. Identity-critical shots — hands holding the product, readable labels — are regenerated until they pass.',
      },
      {
        question: 'What does an ecommerce creative testing pack look like?',
        answer:
          'A typical pack is one product, three to five angles (problem call-out, demo, social proof, offer), with two to three hook variants each — enough distinct creative to run a clean test on TikTok or Meta and find a scalable winner within one or two fatigue cycles.',
      },
      {
        question: 'When should an ecommerce brand still shoot with humans?',
        answer:
          'For founder stories, genuine customer testimonials, and flagship brand films. The practical split: humans for trust assets that need to be true, AI for the testing volume around them.',
      },
    ],
  },
  {
    path: '/use-cases/mobile-apps',
    slug: 'use-cases-mobile-apps',
    dateModified: '2026-07-06',
    navLabel: 'AI Ads for Mobile Apps',
    title: 'AI UGC Ads for Mobile Apps & Games | SHOT.IS',
    description:
      'How mobile apps and games use SHOT.IS AI UGC ads: hook-led UA creative, CPI-driven variant testing, creator personas, and always-on refresh for ad accounts.',
    eyebrow: 'AI ADS FOR MOBILE APPS',
    h1: 'UA CREATIVE AT THE PACE HOOKS FATIGUE.',
    lede:
      'User acquisition is a hook-testing game: creative fatigues in days and CPI punishes slow refresh. SHOT.IS gives UA teams a reusable creator persona and a weekly stream of hook variants without managing a creator roster.',
    primaryCta: 'Start a UA creative sprint',
    secondaryCta: 'See the workflow',
    ogImage: `${siteBaseUrl}/media/hero/shot-hero-poster.webp`,
    outputs: [
      'Creator-style hook variants for TikTok, AppLovin, Unity, and Meta app campaigns — reaction formats, POV setups, and problem call-outs built for the first two seconds.',
      'A reusable AI creator persona that stays consistent across months of ads, so winning styles compound instead of resetting with every casting.',
      'Gameplay-adjacent and lifestyle framings that wrap store assets and screen recordings into native-feeling UGC.',
      'Localized variants for new geos from the same persona and scene system.',
    ],
    workflow: [
      {
        title: 'Persona before ads',
        body: 'We build the creator persona and scene system once — face, tone, world — so every subsequent batch reuses approved constants and ships faster.',
      },
      {
        title: 'Hook backlog',
        body: 'UA angles become a ranked hook backlog: pattern interrupts, social proof, curiosity gaps — each with a testable hypothesis against current CPI.',
      },
      {
        title: 'Weekly variant batches',
        body: 'Batches of hook-first variants ship on a weekly cadence sized to your spend, so the account never waits on production.',
      },
      {
        title: 'Iterate winners',
        body: 'Hooks that beat control get body variations and geo versions; losers are retired without sunk-cost pressure because variants are cheap.',
      },
    ],
    proof: [
      {
        label: 'The metric',
        body: 'UA buys on CPI and payback. The bottleneck is rarely spend — it is fresh creative. Six variants a week beats one polished ad a month.',
      },
      {
        label: 'Platform mix',
        body: 'TikTok and Meta app campaigns first, with formats adapted for AppLovin, Unity, and Google App Campaigns.',
      },
      {
        label: 'Where AI wins',
        body: 'Hook iteration speed and persona consistency: re-generating the first two seconds several ways costs a fraction of one ad but multiplies what a UA team can test.',
      },
    ],
    caseStudy: {
      client: 'Mobile gaming studio (anonymized)',
      challenge:
        'The team needed 30+ creator-style UGC variants per month to keep CPI under target without scaling a creator pipeline.',
      outcome:
        'A reusable AI creator persona produced six hook angles per week. Top variants reduced CPI by 31% over four-week test windows compared to baseline static ads.',
    },
    questions: [
      {
        question: 'How many creative variants does a UA account actually need?',
        answer:
          'Enough to refresh before fatigue: for most spend levels that means several new hooks per week, not per month. Hooks fatigue in days on TikTok and Meta app campaigns, so the winning operation is the one that keeps feeding fresh openings — which is exactly the marginal-cost game AI variants win.',
      },
      {
        question: 'Can AI UGC work for games, not just utility apps?',
        answer:
          'Yes. Games use creator-reaction formats, POV setups, and lifestyle wraps around gameplay capture. The AI persona carries the hook and the reaction; real gameplay footage stays real — a hybrid that reads native on feed.',
      },
      {
        question: 'Does one AI creator persona get stale?',
        answer:
          'Personas fatigue slower than hooks because the variation lives in the opening, the scene, and the angle. When a persona does wear out, a second persona reuses the same pipeline — that is a new character sheet, not a new production system.',
      },
    ],
  },
];

export const useCasePagesByPath = new Map(useCasePages.map((page) => [page.path, page]));

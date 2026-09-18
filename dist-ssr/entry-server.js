import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { useState, useEffect, useRef, useCallback, useMemo, useLayoutEffect } from "react";
const siteBaseUrl = "https://shot.is";
const defaultImage = `${siteBaseUrl}/media/hero/shot-hero-poster.webp`;
const homeReelUploadDate = "2026-04-15";
const privacyPolicyLastUpdated = "2026-06-10";
const termsLastUpdated = "2026-06-10";
const organizationSameAs = [
  // Populate with real social profiles to strengthen entity disambiguation.
  // e.g. 'https://www.linkedin.com/company/shot-is', 'https://x.com/shotis',
  // 'https://www.crunchbase.com/organization/shot-is'
];
const founder = {
  name: "Ivan Kapeykin",
  role: "Founder",
  bio: "Ivan Kapeykin is the founder of SHOT.IS, a self-serve AI UGC ad generator and managed production studio. He runs the platform’s generation pipeline daily — keyframe-first workflows, multi-model routing across Veo 3, Grok Imagine, and Kling, and the QA discipline that keeps AI ad creative consistent — and writes the field notes on the SHOT.IS blog.",
  linkedIn: "https://www.linkedin.com/in/ikapeykin/",
  photo: "/media/team/ivan-kapeykin.png"
};
const organizationEmail = "hello@shot.is";
const organizationKnowsAbout = [
  "AI UGC ads",
  "AI video ads",
  "virtual influencers",
  "AI video generation",
  "creator-style product demos",
  "paid social creative testing",
  "image-to-video workflows",
  "AI character consistency"
];
const homeSeo = {
  path: "/",
  dateModified: "2026-08-25",
  title: "SHOT.IS — AI UGC Ad Generator & Production Studio",
  description: "Create AI UGC videos from $4.99 in the self-serve SHOT.IS Studio, buy video packs for creative testing, or brief the managed production team for finished ad campaigns."
};
const servicePages = [
  {
    path: "/ai-ugc-ads",
    slug: "ai-ugc-ads",
    dateModified: "2026-08-25",
    navLabel: "AI UGC Ads",
    title: "AI UGC Ads Studio for Brands | SHOT.IS",
    description: "Create AI UGC ads with virtual creators, product demos, testimonials, hooks, and paid social variations for TikTok, Reels, Shorts, and performance campaigns.",
    eyebrow: "AI UGC ADS STUDIO",
    h1: "AI UGC ADS WITHOUT THE SHOOT.",
    lede: "SHOT.IS turns product briefs into creator-style AI UGC videos: scroll-stopping hooks, product demos, testimonial formats, voiceover concepts, and variant packs ready for creative testing.",
    primaryCta: "Start an AI UGC sprint",
    secondaryCta: "See the workflow",
    ogImage: `${siteBaseUrl}/media/hero/shot-hero-poster.webp`,
    outputs: [
      "UGC-style product demo videos for TikTok, Reels, Shorts, and paid social placements.",
      "Hook libraries, creator scripts, captions, thumbnails, and visual directions for each concept.",
      "Reusable AI creator systems that keep the same face, tone, and style across campaigns.",
      "Creative testing packs with multiple angles for acquisition, retargeting, launches, and seasonal offers."
    ],
    workflow: [
      {
        title: "Brief the offer",
        body: "We map the product, buyer pain, objection, proof, format, and target platform before anything is generated."
      },
      {
        title: "Build the creator angle",
        body: "Each ad gets a creator persona, hook, visual treatment, script, and performance hypothesis."
      },
      {
        title: "Generate and refine",
        body: "The strongest concepts move into AI video production, edit polish, captions, and variant expansion."
      },
      {
        title: "Prepare for testing",
        body: "Deliverables are packaged as campaign-ready assets with clear angle names and iteration notes."
      }
    ],
    proof: [
      {
        label: "Best for",
        body: "Brands that need more UGC-style ads than a traditional creator production pipeline can supply."
      },
      {
        label: "Use it when",
        body: "Your team needs more creator-style hooks, product demos, and paid-social variants than a traditional shoot can supply."
      },
      {
        label: "Output quality",
        body: "The focus is believable creator footage, clear product messaging, and fast variant generation."
      }
    ],
    caseStudy: {
      client: "Mobile gaming studio (anonymized)",
      challenge: "The team needed 30+ creator-style UGC variants per month to keep CPI under target without scaling a creator pipeline.",
      outcome: "A reusable AI creator persona produced six hook angles per week. Top variants reduced CPI by 31% over four-week test windows compared to baseline static ads."
    },
    questions: [
      {
        question: "Can AI UGC replace human creator ads?",
        answer: "It can replace part of the testing workload. Human creators are still useful for real testimonials and influencer trust, while AI UGC is strongest for fast concept volume, visual variation, localization, and pre-testing hooks before larger spend."
      },
      {
        question: "What brands should start with AI UGC ads?",
        answer: "Startups, mobile apps, ecommerce brands, SaaS tools, creator-led products, and agencies benefit when they need frequent ad variants but do not want every test to require casting, filming, and reshoots."
      }
    ]
  },
  {
    path: "/ai-video-ads",
    slug: "ai-video-ads",
    dateModified: "2026-08-25",
    navLabel: "AI Video Ads",
    title: "AI Video Ads for Paid Social Campaigns | SHOT.IS",
    description: "Produce AI video ads for launches, paid social testing, app campaigns, ecommerce offers, and creator-style ad funnels with SHOT.IS.",
    eyebrow: "AI VIDEO ADS",
    h1: "AI VIDEO ADS BUILT FOR THE FEED.",
    lede: "SHOT.IS creates AI video ad systems for brands that need more concepts, more formats, and more testing velocity across short-form platforms.",
    primaryCta: "Plan AI video ads",
    secondaryCta: "Review outputs",
    ogImage: `${siteBaseUrl}/media/hero/shot-hero-poster.webp`,
    outputs: [
      "Short-form AI video ad concepts for TikTok, Instagram Reels, YouTube Shorts, and mobile-first landing pages.",
      "Hook-first scripts, visual boards, shot lists, caption systems, and cutdown ideas for creative teams.",
      "Ad variants for problem-aware, solution-aware, comparison, objection-handling, and social-proof angles.",
      "Creator, product, lifestyle, before-after, explainer, and offer-led video formats."
    ],
    workflow: [
      {
        title: "Define the campaign job",
        body: "Each concept starts with the funnel stage, buyer awareness level, message hierarchy, and target platform."
      },
      {
        title: "Create the visual system",
        body: "We shape the scene, creator, rhythm, product moment, and edit language so the ad feels native to the placement."
      },
      {
        title: "Generate video assets",
        body: "Concepts become AI video scenes, edit-ready sequences, and campaign variants with captions and visual consistency."
      },
      {
        title: "Iterate by signal",
        body: "Winning hooks and scenes can be expanded into new versions, languages, offers, and creator styles."
      }
    ],
    proof: [
      {
        label: "Best for",
        body: "Teams that need an always-on creative pipeline without waiting for every shoot, location, or creator schedule."
      },
      {
        label: "Use it when",
        body: "You need short-form ad concepts, finished scenes, and reusable variants across TikTok, Reels, Shorts, and paid social."
      },
      {
        label: "Output quality",
        body: "The system prioritizes clear hooks, product context, quick comprehension, and modular creative testing."
      }
    ],
    caseStudy: {
      client: "DTC ecommerce brand (anonymized)",
      challenge: "A holiday launch required 12 ad concepts across three product lines in two weeks. Traditional shoot turnaround was four weeks.",
      outcome: "AI video ads delivered 18 concepts in eight days. Best-performing variant lifted ROAS by 1.7x and was iterated into six retargeting cutdowns."
    },
    questions: [
      {
        question: "What makes a good AI video ad?",
        answer: "A good AI video ad is not just a realistic clip. It has a clear hook, a specific buyer problem, a visible product moment, a believable creator or scene, and a format that matches the platform where it will run."
      },
      {
        question: "Can one AI video concept become many ads?",
        answer: "Yes. A strong concept can be turned into hook variants, creator variants, language variants, cutdowns, static frames, caption tests, and retargeting versions."
      }
    ]
  },
  {
    path: "/virtual-influencers",
    slug: "virtual-influencers",
    dateModified: "2026-08-25",
    navLabel: "Virtual Influencers",
    title: "Create a Virtual Influencer for Your Brand | SHOT.IS",
    description: "SHOT.IS builds custom virtual influencers: consistent AI creators with a locked identity, brand lore, and a repeatable content system. Process, timelines, FAQ.",
    eyebrow: "VIRTUAL INFLUENCERS",
    h1: "CREATE A VIRTUAL INFLUENCER FOR YOUR BRAND.",
    lede: "SHOT.IS designs virtual influencers and AI creators as repeatable brand assets, not one-off images. Each character ships with a locked identity, wardrobe logic, brand lore, and a content system that can carry campaigns week after week.",
    primaryCta: "Build a virtual creator",
    secondaryCta: "Explore creator systems",
    ogImage: `${siteBaseUrl}/media/hero/shot-hero-poster.webp`,
    outputs: [
      "Virtual creator identities with names, roles, visual direction, tone, and audience positioning.",
      "Consistent AI character assets for product posts, UGC-style video, short-form ads, and campaign visuals.",
      "Content pillars, recurring formats, launch concepts, and platform-specific creative packages.",
      "Brand-safe guidelines for how the virtual influencer appears, speaks, and promotes offers."
    ],
    workflow: [
      {
        title: "Position the creator",
        body: "We define the audience, genre, brand fit, visual lane, and campaign purpose before designing the character."
      },
      {
        title: "Lock the identity",
        body: "The creator gets a repeatable face, wardrobe logic, world, tone, and content behavior."
      },
      {
        title: "Create campaign assets",
        body: "The system expands into videos, stills, scripts, captions, and paid social versions."
      },
      {
        title: "Scale the world",
        body: "Strong creator systems can support launches, collabs, seasonal drops, and localized market versions."
      }
    ],
    proof: [
      {
        label: "Best for",
        body: "Brands that want a controllable creator asset, not a single campaign dependent on one external influencer."
      },
      {
        label: "Use it when",
        body: "Your brand needs a controllable creator identity that can stay recognizable across posts, ads, markets, and launches."
      },
      {
        label: "Output quality",
        body: "The emphasis is consistency, recognizability, lore, and content formats that can repeat over time."
      }
    ],
    caseStudy: {
      client: "Fashion-tech startup (anonymized)",
      challenge: "The team wanted a recognizable AI face for product drops without depending on a single human creator schedule.",
      outcome: "A virtual influencer carried four launches across 11 markets. The character now anchors weekly social posts and reusable ad creative without per-campaign casting."
    },
    questions: [
      {
        question: "What is a virtual influencer?",
        answer: "A virtual influencer is a digital creator identity used in social content, campaigns, and brand storytelling — characters like Lil Miquela or Shudu, but scoped to your brand. For performance marketing, the useful part is not only the character design but the ability to create repeatable content quickly."
      },
      {
        question: "Why use a virtual influencer instead of a human influencer?",
        answer: "Virtual influencers give brands more control over timing, format, visuals, localization, and campaign continuity. Human influencers can still provide audience trust; virtual creators are strongest when consistency and production speed matter. Many brands run both: a human creator for reach, a virtual one for always-on content."
      },
      {
        question: "How do you create a virtual influencer?",
        answer: "Our process has four steps: position the creator (audience, genre, brand fit), lock the identity (a canonical face set, wardrobe logic, world, and tone), generate campaign assets with reference-anchored AI production, and QA every output against the identity so the character stays recognizable. The result is a system, not a folder of images."
      },
      {
        question: "How much does a virtual influencer cost?",
        answer: "Far less than the celebrity-grade CGI characters that made the format famous — those are run by full studios. A brand-scoped virtual creator is a one-time identity build plus per-campaign content production, so the comparison that matters is against your ongoing creator sourcing and reshoot costs. Pricing depends on how many formats and markets the character needs to cover; brief us and we will scope it."
      },
      {
        question: "How long does it take to launch one?",
        answer: "A locked identity typically takes days, not months, and the first campaign content pack follows within one to two weeks. After that the character is reusable: new drops, seasonal offers, and localized versions start from the existing identity instead of from zero."
      },
      {
        question: "Can the character actually stay consistent across hundreds of shots?",
        answer: "Yes — this is the hard engineering part and the reason one-off image generation fails as an influencer strategy. We use canonical reference sets, reference-anchored generation, and machine-graded identity QA so the same face, styling, and world survive across posts, ads, formats, and weeks."
      },
      {
        question: "Do virtual influencers need to be disclosed as AI?",
        answer: "In several markets, yes: sponsored content must be labeled as advertising everywhere, and jurisdictions like the US and India require disclosing that the character is not a real person. Platforms are adding their own AI-content labels too. Every SHOT.IS character ships with brand-safety guidelines that include disclosure rules for each market it runs in."
      }
    ],
    showRoster: true,
    reading: [
      { label: "What is a virtual influencer — the complete guide", href: "/blog/what-is-a-virtual-influencer" },
      { label: "How to create a virtual influencer, step by step", href: "/blog/how-to-create-a-virtual-influencer" },
      { label: "Virtual influencer cost: what brands actually pay", href: "/blog/virtual-influencer-cost" },
      { label: "AI character consistency: how one face stays one face", href: "/blog/ai-character-consistency" }
    ]
  }
];
const servicePagesByPath = new Map(servicePages.map((page) => [page.path, page]));
const homeAnswerBlocks = [
  {
    title: "What is SHOT.IS?",
    body: "SHOT.IS is a self-serve AI UGC ad generator and a managed production studio. Generate a video yourself, buy a pack for testing volume, or hand the full campaign to the team."
  },
  {
    title: "How much does it cost?",
    body: "The launch offer starts at $4.99 for one self-serve AI video. Video packs use live volume pricing in Studio, while managed production is scoped to the campaign brief."
  },
  {
    title: "When should I choose managed?",
    body: "Choose managed production when you need creative direction, product and identity QA, editing, and campaign-ready variants — not only a generated clip."
  }
];
const useCasePages = [
  {
    path: "/use-cases/ecommerce",
    slug: "use-cases-ecommerce",
    dateModified: "2026-07-06",
    navLabel: "AI Ads for Ecommerce",
    title: "AI UGC Ads for Ecommerce & DTC Brands | SHOT.IS",
    description: "How ecommerce and DTC brands use SHOT.IS AI UGC ads: product demo variants, offer-led hooks, seasonal launches, and ROAS-driven creative testing without shoots.",
    eyebrow: "AI ADS FOR ECOMMERCE",
    h1: "PRODUCT CREATIVE THAT KEEPS UP WITH YOUR CATALOG.",
    lede: "Ecommerce teams buy testing velocity: more product demos, more offer angles, more seasonal refreshes. SHOT.IS turns product pages and reference photos into UGC-style ad variants with the label always readable and the product always right.",
    primaryCta: "Start an ecommerce sprint",
    secondaryCta: "See the workflow",
    ogImage: `${siteBaseUrl}/media/hero/shot-hero-poster.webp`,
    outputs: [
      "UGC-style product demos and unboxing-format videos for TikTok, Reels, and Shorts — built from product reference images so labels and packaging stay accurate.",
      "Offer-led hook variants for launches, bundles, and seasonal promotions: same body, new opening, priced for testing rather than re-production.",
      "Before/after, problem-solution, and social-proof angle packs mapped to ROAS and CPA goals per funnel stage.",
      "Localized versions of winning variants for new markets without re-shooting."
    ],
    workflow: [
      {
        title: "Product fidelity first",
        body: "We lock product reference images and a Scene Bible so every generated shot shows your actual product — the make-or-break QA gate for ecommerce creative."
      },
      {
        title: "Angle map per SKU",
        body: "Each product gets hooks mapped to buyer awareness: problem call-outs for cold traffic, comparison and objection-handling for retargeting."
      },
      {
        title: "Generate variant packs",
        body: "Concepts become platform-ready vertical videos with captions, in batches sized for a real creative test, not a single hero asset."
      },
      {
        title: "Refresh by signal",
        body: "Winners get hook refreshes and seasonal re-skins in days — creative fatigue is answered with variants, not new productions."
      }
    ],
    proof: [
      {
        label: "The metric",
        body: "Ecommerce buys on ROAS and CPA. The lever is marginal cost per variant: testing five more angles should not cost five more productions."
      },
      {
        label: "Platform mix",
        body: "TikTok and Meta placements first (Reels, Stories, feed), with cutdowns for YouTube Shorts and landing-page loops."
      },
      {
        label: "Where AI wins",
        body: "Catalog breadth and speed: seasonal refreshes, bundle offers, and localization — jobs where a human re-shoot per variant never pays back."
      }
    ],
    caseStudy: {
      client: "DTC ecommerce brand (anonymized)",
      challenge: "A holiday launch required 12 ad concepts across three product lines in two weeks. Traditional shoot turnaround was four weeks.",
      outcome: "AI video ads delivered 18 concepts in eight days. Best-performing variant lifted ROAS by 1.7x and was iterated into six retargeting cutdowns."
    },
    questions: [
      {
        question: "Can AI ads show my actual product accurately?",
        answer: "Yes, with reference discipline. SHOT.IS generates keyframes from your product reference images and QA-checks label readability and packaging fidelity before any animation. Identity-critical shots — hands holding the product, readable labels — are regenerated until they pass."
      },
      {
        question: "What does an ecommerce creative testing pack look like?",
        answer: "A typical pack is one product, three to five angles (problem call-out, demo, social proof, offer), with two to three hook variants each — enough distinct creative to run a clean test on TikTok or Meta and find a scalable winner within one or two fatigue cycles."
      },
      {
        question: "When should an ecommerce brand still shoot with humans?",
        answer: "For founder stories, genuine customer testimonials, and flagship brand films. The practical split: humans for trust assets that need to be true, AI for the testing volume around them."
      }
    ]
  },
  {
    path: "/use-cases/mobile-apps",
    slug: "use-cases-mobile-apps",
    dateModified: "2026-07-06",
    navLabel: "AI Ads for Mobile Apps",
    title: "AI UGC Ads for Mobile Apps & Games | SHOT.IS",
    description: "How mobile apps and games use SHOT.IS AI UGC ads: hook-led UA creative, CPI-driven variant testing, creator personas, and always-on refresh for ad accounts.",
    eyebrow: "AI ADS FOR MOBILE APPS",
    h1: "UA CREATIVE AT THE PACE HOOKS FATIGUE.",
    lede: "User acquisition is a hook-testing game: creative fatigues in days and CPI punishes slow refresh. SHOT.IS gives UA teams a reusable creator persona and a weekly stream of hook variants without managing a creator roster.",
    primaryCta: "Start a UA creative sprint",
    secondaryCta: "See the workflow",
    ogImage: `${siteBaseUrl}/media/hero/shot-hero-poster.webp`,
    outputs: [
      "Creator-style hook variants for TikTok, AppLovin, Unity, and Meta app campaigns — reaction formats, POV setups, and problem call-outs built for the first two seconds.",
      "A reusable AI creator persona that stays consistent across months of ads, so winning styles compound instead of resetting with every casting.",
      "Gameplay-adjacent and lifestyle framings that wrap store assets and screen recordings into native-feeling UGC.",
      "Localized variants for new geos from the same persona and scene system."
    ],
    workflow: [
      {
        title: "Persona before ads",
        body: "We build the creator persona and scene system once — face, tone, world — so every subsequent batch reuses approved constants and ships faster."
      },
      {
        title: "Hook backlog",
        body: "UA angles become a ranked hook backlog: pattern interrupts, social proof, curiosity gaps — each with a testable hypothesis against current CPI."
      },
      {
        title: "Weekly variant batches",
        body: "Batches of hook-first variants ship on a weekly cadence sized to your spend, so the account never waits on production."
      },
      {
        title: "Iterate winners",
        body: "Hooks that beat control get body variations and geo versions; losers are retired without sunk-cost pressure because variants are cheap."
      }
    ],
    proof: [
      {
        label: "The metric",
        body: "UA buys on CPI and payback. The bottleneck is rarely spend — it is fresh creative. Six variants a week beats one polished ad a month."
      },
      {
        label: "Platform mix",
        body: "TikTok and Meta app campaigns first, with formats adapted for AppLovin, Unity, and Google App Campaigns."
      },
      {
        label: "Where AI wins",
        body: "Hook iteration speed and persona consistency: re-generating the first two seconds several ways costs a fraction of one ad but multiplies what a UA team can test."
      }
    ],
    caseStudy: {
      client: "Mobile gaming studio (anonymized)",
      challenge: "The team needed 30+ creator-style UGC variants per month to keep CPI under target without scaling a creator pipeline.",
      outcome: "A reusable AI creator persona produced six hook angles per week. Top variants reduced CPI by 31% over four-week test windows compared to baseline static ads."
    },
    questions: [
      {
        question: "How many creative variants does a UA account actually need?",
        answer: "Enough to refresh before fatigue: for most spend levels that means several new hooks per week, not per month. Hooks fatigue in days on TikTok and Meta app campaigns, so the winning operation is the one that keeps feeding fresh openings — which is exactly the marginal-cost game AI variants win."
      },
      {
        question: "Can AI UGC work for games, not just utility apps?",
        answer: "Yes. Games use creator-reaction formats, POV setups, and lifestyle wraps around gameplay capture. The AI persona carries the hook and the reaction; real gameplay footage stays real — a hybrid that reads native on feed."
      },
      {
        question: "Does one AI creator persona get stale?",
        answer: "Personas fatigue slower than hooks because the variation lives in the opening, the scene, and the angle. When a persona does wear out, a second persona reuses the same pipeline — that is a new character sheet, not a new production system."
      }
    ]
  }
];
const useCasePagesByPath = new Map(useCasePages.map((page) => [page.path, page]));
const comparisonPages = [
  {
    kind: "vs",
    path: "/vs/heygen",
    slug: "vs-heygen",
    navLabel: "SHOT.IS vs HeyGen",
    title: "SHOT.IS vs HeyGen: AI UGC Ads vs Avatar Video Platform",
    description: "SHOT.IS and HeyGen solve different jobs: HeyGen is an avatar and translation platform for spokesperson video; SHOT.IS generates full-scene AI UGC ads with a studio pipeline. An honest comparison.",
    eyebrow: "SHOT.IS VS HEYGEN",
    h1: "DIFFERENT JOBS, DIFFERENT TOOLS.",
    lede: "HeyGen is the most mature AI avatar platform — talking heads, translation, a strong API. SHOT.IS is an AI ad studio that generates full scenes, not presenters in front of a background. Which one you need depends on the ad you are trying to make.",
    competitor: {
      name: "HeyGen",
      url: "https://www.heygen.com/",
      oneLiner: "a general-purpose AI avatar video platform with best-in-class lip-sync and 175+ language translation, built for spokesperson-style video at scale."
    },
    verdict: "Choose HeyGen when the ad is a person talking to camera — especially one presenter localized into many languages, or video generated programmatically through an API. Choose SHOT.IS when the ad has to look like real UGC footage: a creator in a real scene, product in hand, cut to music — produced as a tested variant pack rather than a rendered avatar clip.",
    tableCaption: "SHOT.IS vs HeyGen for performance ad creative",
    rows: [
      {
        feature: "What it is",
        shotIs: "AI ad studio + self-serve app (studio.shot.is): full-scene UGC-style ads via keyframe-to-video generation",
        competitor: "AI avatar video platform: talking-head videos from 500+ stock avatars or custom digital twins"
      },
      {
        feature: "Visual approach",
        shotIs: "Generated scenes — creator, location, product, and camera movement are all synthesized and QA-gated per shot",
        competitor: "Avatar composited over backgrounds; realism is in the face and lip-sync, not the scene"
      },
      {
        feature: "Strongest at",
        shotIs: "Native-feeling UGC ads for TikTok/Meta; hook variant volume; brand and character consistency across campaigns",
        competitor: "Multilingual spokesperson video (175+ languages with lip-synced translation); API-driven generation"
      },
      {
        feature: "Consistency system",
        shotIs: "Scene Bible (locked location, outfit, look constants) + product reference images + vision QA on every frame",
        competitor: "Consistent avatar identity by design; scene/product context is limited to what compositing allows"
      },
      {
        feature: "Pricing model",
        shotIs: "Self-serve launch offer from $4.99/video; volume video packs in Studio; managed campaigns scoped per brief",
        competitor: "Public plans from $29/mo (Creator) with credit metering; Avatar IV/V burns ~20 credits per minute"
      },
      {
        feature: "Editing & delivery",
        shotIs: "Delivered as campaign-ready variants: beat-synced edit, captions, hook alternates, platform formats",
        competitor: "Renders a clip; ad assembly, music, and variant testing happen in your own tools"
      },
      {
        feature: "Common complaints to check",
        shotIs: "Managed production is custom-quoted; self-serve and pack pricing stay public in Studio",
        competitor: "Credit drain on failed renders and queue delays are the top user complaints (Trustpilot ~2.4/5 vs G2 4.8/5)"
      }
    ],
    whenToChooseThem: [
      "Your ad is a presenter explaining something to camera and polish matters more than UGC texture.",
      "You need one video localized into dozens of languages with lip-sync — HeyGen’s translation is the strongest in the category.",
      "You want a self-serve API to generate video programmatically inside your own product or workflow.",
      "You need a custom digital twin of a real, consenting spokesperson."
    ],
    whenToChooseUs: [
      "The ad has to read as native UGC in the feed — a creator in a scene with your product, not an avatar in front of a background.",
      "You test creative at volume and care about marginal cost per variant, hook refreshes, and weekly batches.",
      "Product fidelity is critical: readable labels, correct packaging, the same face across every shot.",
      "You want one accountable pipeline from brief to campaign-ready files — generation, QA, music, edit, formats."
    ],
    faq: [
      {
        question: "Is SHOT.IS a HeyGen alternative?",
        answer: "For UGC-style performance ads, yes; for avatar spokesperson video, not really. SHOT.IS generates full scenes with a studio QA pipeline, while HeyGen renders avatar-led clips. Teams sometimes run both: HeyGen for multilingual explainer content, SHOT.IS for feed-native ad creative."
      },
      {
        question: "Which is cheaper, SHOT.IS or HeyGen?",
        answer: "For a single talking-head clip, HeyGen — its Creator plan starts at $29/month. For a tested pack of ad variants, compare the full cost: HeyGen’s credits cover the render only, while a SHOT.IS engagement includes generation candidates, QA, music, assembly, and hook variants. The honest comparison unit is a campaign-ready variant, not a rendered minute."
      },
      {
        question: "Can HeyGen make UGC-style ads?",
        answer: "It can approximate them with UGC-styled avatars, and for some offers that is enough. The gap shows in scene realism — hands using a product, locations, camera energy — which avatar compositing does not generate. That scene layer is exactly what SHOT.IS’s keyframe-to-video pipeline produces."
      }
    ],
    asOf: "2026-07-06"
  },
  {
    kind: "vs",
    path: "/vs/arcads",
    slug: "vs-arcads",
    navLabel: "SHOT.IS vs Arcads",
    title: "SHOT.IS vs Arcads: AI UGC Ad Studio vs AI Actor Platform",
    description: "Arcads offers 1,000+ realistic AI actors for UGC ads; SHOT.IS runs a full-scene generation pipeline with QA, edit, and variant packs. An honest comparison for performance teams.",
    eyebrow: "SHOT.IS VS ARCADS",
    h1: "AI ACTORS VS A FULL AD PIPELINE.",
    lede: "Arcads is the premium AI-actor platform — the most natural synthetic performers in the category. SHOT.IS is an ad studio that generates the whole ad: scene, creator, product, edit. The right pick depends on where your bottleneck is.",
    competitor: {
      name: "Arcads",
      url: "https://www.arcads.ai/",
      oneLiner: "a premium AI UGC platform with 1,000+ AI actors known for the most natural expressions and delivery in the category."
    },
    verdict: "Choose Arcads when actor realism is the single thing that decides your ad — its performers’ micro-expressions are the hardest to clock as AI in short clips, and you are comfortable finishing the edit (captions, music, B-roll) yourself. Choose SHOT.IS when you need the whole ad produced — scene generation with product fidelity, QA, beat-synced edit, and hook variants — or when unpublished per-video pricing around $11+ per clip does not fit a high-volume testing budget.",
    tableCaption: "SHOT.IS vs Arcads for UGC-style ad production",
    rows: [
      {
        feature: "What it is",
        shotIs: "AI ad studio + self-serve app: full-scene ads generated keyframe-first with vision QA at every stage",
        competitor: "AI actor platform: pick a synthetic performer, script the ad, render UGC-style clips"
      },
      {
        feature: "Visual approach",
        shotIs: "Whole scene is generated and locked via a Scene Bible — location, outfit, product, camera movement",
        competitor: "Actor-led clips with strong facial performance; scene and product context is thinner"
      },
      {
        feature: "Strongest at",
        shotIs: "End-to-end variant packs: product fidelity, consistency across shots, edit and music included",
        competitor: "Performer realism — expressions, blink timing, natural delivery in sub-60-second ads"
      },
      {
        feature: "Editing & delivery",
        shotIs: "Campaign-ready files: beat grid edit, captions, formats, hook alternates named for testing",
        competitor: "Renders clips; users typically finish captions, music, and B-roll in CapCut or similar"
      },
      {
        feature: "Pricing model",
        shotIs: "Self-serve launch offer from $4.99/video; volume video packs in Studio; managed campaigns scoped per brief",
        competitor: "Not published — third-party reports put entry around $110/mo for ~10 videos; verify at signup"
      },
      {
        feature: "Trial",
        shotIs: "Self-serve studio app lets you generate before committing to a studio engagement",
        competitor: "No free trial reported; first clip requires a paid plan"
      },
      {
        feature: "Common complaints to check",
        shotIs: "Managed production is custom-quoted; self-serve and pack pricing stay public in Studio",
        competitor: "Credits burned on unusable generations, most-realistic actors gated to custom Pro tiers, email-only cancellation"
      }
    ],
    whenToChooseThem: [
      "Actor realism is your one deciding factor and reviewers’ consensus on Arcads’ performers matches what your ads need.",
      "You already have an editing workflow (CapCut, Premiere) and only need strong raw performance clips.",
      "Your team wants a pure self-serve tool and your budget clears roughly $11+ per video (as third-party reports suggest)."
    ],
    whenToChooseUs: [
      "You need finished ads, not raw clips — QA, music, captions, beat-synced edit, and platform formats included.",
      "Product accuracy matters: labels, packaging, and the same product in every shot survive our keyframe QA gate.",
      "You want hook-variant economics — regenerating the first two seconds several ways instead of re-rendering whole clips.",
      "You want to try before committing: the self-serve studio at studio.shot.is generates under your own account."
    ],
    faq: [
      {
        question: "Is SHOT.IS a cheaper Arcads alternative?",
        answer: "Yes for self-serve generation: the SHOT.IS launch offer starts at $4.99 per video, while Arcads pricing is reported around $11+ per clip and remains unpublished. Managed SHOT.IS production is a different-shaped product because it also covers creative direction, QA, editing, and named testing variants."
      },
      {
        question: "Are Arcads’ AI actors more realistic than SHOT.IS creators?",
        answer: "In facial performance for close-up talking segments, Arcads is genuinely strong — reviewers consistently rank its actors highest in the category. SHOT.IS optimizes a different realism: the scene. A creator holding your actual product in a coherent location, consistent across eight shots, reads as real UGC even when the face is not the star of the frame."
      },
      {
        question: "Can I use both SHOT.IS and Arcads?",
        answer: "Yes, and performance teams do mix tools — the 2026 consensus is that no single platform covers the whole pipeline. A workable split: Arcads for actor-led testimonial angles, SHOT.IS for scene-led product demos, lifestyle formats, and the assembly/QA layer."
      }
    ],
    asOf: "2026-07-06"
  },
  {
    kind: "vs",
    path: "/vs/creatify",
    slug: "vs-creatify",
    navLabel: "SHOT.IS vs Creatify",
    title: "SHOT.IS vs Creatify: Studio Pipeline vs URL-to-Video Volume",
    description: "Creatify turns product URLs into avatar video ads in bulk from $39/mo; SHOT.IS produces full-scene AI UGC ads with QA and editing. An honest comparison for ecommerce and UA teams.",
    eyebrow: "SHOT.IS VS CREATIFY",
    h1: "BULK RENDERS VS BUILT ADS.",
    lede: "Creatify is the volume play: paste a product URL, get batches of avatar-fronted video ads at the lowest entry price in the category. SHOT.IS is a studio pipeline that builds fewer, stronger, scene-real ads. The trade is throughput versus fidelity.",
    competitor: {
      name: "Creatify",
      url: "https://creatify.ai/",
      oneLiner: "a URL-to-video ad generator with 1,500+ stock avatars, batch variant output, and the cheapest serious entry price in the category ($39/mo Starter)."
    },
    verdict: "Choose Creatify when you want maximum cheap throughput — dozens of quick avatar variants from a product link to smoke-test offers, accepting template-look creative and credit-metered re-renders. Choose SHOT.IS when creative quality is what your test is measuring: scene-real UGC with accurate products, QA-gated generation, and finished edits — fewer variants, each one actually competitive in the feed.",
    tableCaption: "SHOT.IS vs Creatify for ecommerce ad creative",
    rows: [
      {
        feature: "What it is",
        shotIs: "AI ad studio + self-serve app: keyframe-first scene generation with vision QA and finished edits",
        competitor: "URL-to-video generator: scripts, avatars, and batch ad variants auto-built from a product link"
      },
      {
        feature: "Visual approach",
        shotIs: "Generated scenes with locked product references — label readability is a QA gate, not luck",
        competitor: "Stock avatar presenters (1,500+) over product footage/images; template-driven look"
      },
      {
        feature: "Strongest at",
        shotIs: "Creative that has to compete on quality: product demos, lifestyle scenes, brand-consistent campaigns",
        competitor: "Throughput and price: many variants fast, plus extras like competitor ad tracking and ad launching"
      },
      {
        feature: "Pricing model",
        shotIs: "Self-serve launch offer from $4.99/video; volume video packs in Studio; managed campaigns scoped per brief",
        competitor: "Public plans from $39/mo Starter, 100 credits; real avatar generations reportedly burn 50–90 credits each"
      },
      {
        feature: "Editing & delivery",
        shotIs: "Beat-synced edit, captions, hook alternates, platform formats — delivered campaign-ready",
        competitor: "Auto-assembled videos; script and template rework commonly done by hand afterwards"
      },
      {
        feature: "Common complaints to check",
        shotIs: "Managed production is custom-quoted; self-serve and pack pricing stay public in Studio",
        competitor: "Credit opacity (headline video counts vs real credit burn), lip-sync re-renders, billing disputes; Trustpilot rating currently suspended"
      }
    ],
    whenToChooseThem: [
      "You are smoke-testing many offers or SKUs and need the cheapest possible variant volume today.",
      "Template-look avatar ads are acceptable for your vertical and platforms.",
      "You value the bundled extras: competitor ad tracking and pushing ads directly to ad accounts."
    ],
    whenToChooseUs: [
      "Your test is creative quality itself — scene-real UGC with your actual product, not a presenter over a slideshow.",
      "Brand consistency across a campaign matters: same creator, same world, every shot QA-checked.",
      "You want finished ads with music and captions instead of assembling renders yourself.",
      "You have been burned by credit-metered re-renders and prefer QA gates before generation spend."
    ],
    faq: [
      {
        question: "Is Creatify cheaper than SHOT.IS?",
        answer: "At the entry point, yes — $39/month is the lowest serious price in the category. The caveat reviewers flag is credit burn: real avatar generations reportedly cost 50–90 credits, so a 100-credit plan covers one or two polished videos, not the headline number. SHOT.IS does not compete on cheapest render; it competes on cost per variant that is actually worth testing."
      },
      {
        question: "When is URL-to-video good enough?",
        answer: "When the offer, not the creative, is what you are testing — new SKUs, price points, headline angles — quick avatar variants answer that question cheaply. Once a winner emerges and creative quality becomes the growth lever, scene-real UGC production is the next step up."
      },
      {
        question: "Do platforms penalize AI-generated ads like these?",
        answer: "TikTok and Meta allow AI creative but require disclosure labels in defined cases, and some Creatify users have reported distribution issues with obviously synthetic output. The practical mitigation is the same everywhere: disclose where required and make creative that earns its place in the feed regardless of how it was made — which is the entire argument for scene realism."
      }
    ],
    asOf: "2026-07-06"
  },
  {
    kind: "vs",
    path: "/vs/hiring-ugc-creators",
    slug: "vs-hiring-ugc-creators",
    navLabel: "AI UGC vs Hiring Creators",
    title: "SHOT.IS vs Hiring UGC Creators: Cost, Speed, and When Humans Win",
    description: "Human UGC creators charge $150–$500+ per video before usage rights; AI UGC changes the marginal cost of variants. An honest breakdown of when to hire humans and when to generate.",
    eyebrow: "AI UGC VS HUMAN CREATORS",
    h1: "THE HONEST SPLIT: HUMANS FOR TRUST, AI FOR VOLUME.",
    lede: 'This is not a "replace your creators" pitch. Human creators win specific jobs that AI should not attempt. But the economics of variant testing — where hooks fatigue in days — favor generation, and pretending otherwise wastes budget in both directions.',
    competitor: {
      name: "Human UGC creators",
      url: "https://www.billo.app/",
      oneLiner: "independent creators and marketplaces (e.g. Billo at ~$99/video, typical market rates $150–$500+ before usage rights) filming authentic product content."
    },
    verdict: "Hire human creators for genuine testimonials, founder stories, and audience trust — content whose entire value is that it is true. Use SHOT.IS AI UGC for the testing workload around it: hook variants, format experiments, localization, and seasonal refreshes, where variant five from a human costs most of a re-shoot but variant five from the pipeline costs a couple of regenerated shots.",
    tableCaption: "AI UGC (SHOT.IS) vs hiring human UGC creators",
    rows: [
      {
        feature: "Cost per video",
        shotIs: "From low hundreds per finished studio video; marginal variants cost a fraction of the first",
        competitor: "$150–$500+ per video typical market rate, before usage rights for paid placements"
      },
      {
        feature: "Cost of variant #5",
        shotIs: "A few regenerated shots dropped into the existing edit — Scene Bible and music already paid for",
        competitor: "Close to the cost of variant #1: re-brief, re-shoot, re-edit, new usage negotiation"
      },
      {
        feature: "Turnaround",
        shotIs: "Days; ongoing programs ship ~6 hook variants per week per persona",
        competitor: "1–3 weeks per round: casting, shipping product, filming, revisions"
      },
      {
        feature: "Authenticity",
        shotIs: "Synthetic and disclosed as such; strongest in scene-led formats where the face is not the proof",
        competitor: "Real people, real reactions — irreplaceable for testimonials and trust-led angles"
      },
      {
        feature: "Consistency & control",
        shotIs: "Same persona, same world, any week — no scheduling, usage windows, or creator churn",
        competitor: "Dependent on individual creators’ availability, style drift, and renewal terms"
      },
      {
        feature: "Usage rights",
        shotIs: "Delivered assets are for the brand’s commercial use — no per-placement rights negotiation",
        competitor: "Usage rights are a separate, recurring line item that often exceeds the filming fee"
      }
    ],
    whenToChooseThem: [
      "Testimonials and reviews — a fabricated testimonial is both ineffective and a policy violation, so this job is humans-only.",
      "Founder and brand-story content where the person is the point.",
      "Influencer partnerships where you are buying the creator’s audience and credibility, not just footage.",
      "Categories where platform or legal rules restrict synthetic people (verify per vertical)."
    ],
    whenToChooseUs: [
      "Hook and format testing at the pace ad accounts actually fatigue — several fresh openings per week.",
      "Localization: winning variants re-generated for new markets without re-casting.",
      "Product demo and lifestyle formats where the scene sells and the presenter is interchangeable.",
      "Seasonal refreshes and offer swaps on proven concepts."
    ],
    faq: [
      {
        question: "Do AI UGC ads perform as well as human creator ads?",
        answer: "Where testing velocity decides outcomes, yes — a mobile gaming studio cut CPI 31% with six AI hook variants a week, and a DTC brand lifted ROAS 1.7x on its best AI variant in SHOT.IS programs. Where audience trust is the mechanism — testimonials, reviews — human creators keep the advantage, and honest AI shops say so."
      },
      {
        question: "What does the hybrid setup look like in practice?",
        answer: "A common split: two or three human creators on retainer for testimonial and story content, plus an AI pipeline feeding the ad account weekly hook variants and demo formats. The human content anchors trust; the AI volume finds winners cheaply; winning AI angles sometimes get re-shot with humans for scale."
      },
      {
        question: "Is it legal and platform-compliant to run AI creators in ads?",
        answer: "Yes, with disclosure. TikTok and Meta require AI labels in defined cases, and the EU AI Act adds transparency obligations. The lines that must not be crossed: impersonating real people and fabricating testimonials — SHOT.IS does neither."
      }
    ],
    asOf: "2026-07-06"
  },
  {
    kind: "alternatives",
    path: "/alternatives/heygen",
    slug: "alternatives-heygen",
    navLabel: "HeyGen Alternatives",
    title: "Best HeyGen Alternatives for UGC-Style Ads (2026)",
    description: "Honest HeyGen alternatives by job: SHOT.IS for scene-real AI UGC ads, Arcads for actor realism, Creatify for cheap volume, Synthesia for enterprise training, Captions for real-footage editing.",
    eyebrow: "HEYGEN ALTERNATIVES",
    h1: "HEYGEN ALTERNATIVES, SORTED BY JOB.",
    lede: 'Most "HeyGen alternatives" lists compare feature checkboxes. The useful comparison is by job: what ad are you making, and which tool is actually built for it? HeyGen is excellent at what it does — the question is whether what it does is what you need.',
    verdict: "Teams look for a HeyGen alternative for three reasons: the output looks like an avatar video when the job needed native UGC; credit metering (Avatar IV/V at ~20 credits per minute) makes volume testing expensive; or render queues slow a weekly creative cadence. Pick by job: SHOT.IS for scene-real UGC ad production, Arcads for maximum actor realism, Creatify for cheapest bulk variants, Synthesia for enterprise training video, Captions when you have real footage and need AI editing.",
    alternatives: [
      {
        name: "SHOT.IS",
        url: "/",
        bestFor: "scene-real AI UGC ads, produced end to end",
        summary: "A self-serve AI UGC ad generator plus managed studio that generates full scenes — creator, location, product — keyframe-first with vision QA. Self-serve video starts at a $4.99 launch price, volume packs are available in Studio, and managed campaign work is scoped per brief."
      },
      {
        name: "Arcads",
        url: "https://www.arcads.ai/",
        bestFor: "the most realistic AI actors in short ads",
        summary: "A premium platform with 1,000+ AI actors whose expressions and delivery reviewers rank hardest to clock as synthetic. Strong raw clips; you finish captions, music, and B-roll yourself. Pricing is unpublished — third-party reports suggest ~$110/month entry, no free trial."
      },
      {
        name: "Creatify",
        url: "https://creatify.ai/",
        bestFor: "cheapest bulk ad variants from a product URL",
        summary: "Paste a product link, get batches of avatar-fronted ads from $39/month — plus competitor ad tracking and direct ad launching. The trade-off is template-look creative and credit burn (real generations reportedly 50–90 credits each). Right for smoke-testing offers at volume."
      },
      {
        name: "Synthesia",
        url: "https://www.synthesia.io/",
        bestFor: "enterprise training and internal comms video",
        summary: "The enterprise-grade avatar platform (from $29/month, enterprise deals far higher) with strong compliance, SCORM export, and team workflows. Generally the wrong tool for performance ads — and the right one for L&D at scale, where it beats every entry on this list."
      },
      {
        name: "Captions",
        url: "https://www.captions.ai/",
        bestFor: "AI editing on real creator footage",
        summary: "If your gap is editing rather than generation — you have real creator videos and need captions, dubbing, and AI-assisted cuts — Captions covers that job better than an avatar generator. The 2026 roundup consensus pick for teams with real creator partners."
      },
      {
        name: "MakeUGC",
        url: "https://www.makeugc.ai/",
        bestFor: "first AI UGC tests on a small budget",
        summary: "A budget entry into AI UGC ads (~$29/month reported for ~10 videos, 35+ languages). Less polished avatars and voices than Arcads or HeyGen, but a low-risk way to learn whether AI UGC formats work for your offer before spending real budget."
      }
    ],
    faq: [
      {
        question: "What is the best HeyGen alternative for TikTok and Meta ads?",
        answer: "For ads that need to read as native UGC: SHOT.IS if you want finished, scene-real ads produced end to end; Arcads if you want maximum actor realism and will edit yourself; Creatify if you want the most variants per dollar and can accept template-look output."
      },
      {
        question: "Why do teams leave HeyGen for ads specifically?",
        answer: "Three patterns repeat in reviews: avatar-over-background output underperforms in feeds that reward authentic-looking footage; credit metering makes weekly variant testing expensive (Avatar IV/V at ~20 credits per minute); and render queues conflict with a testing cadence. For spokesperson and localization jobs, most of those teams keep HeyGen — the platform is genuinely strong at its core job."
      },
      {
        question: "Is there a free HeyGen alternative?",
        answer: "Creatify has a watermarked free tier (10 credits/month) and HeyGen itself offers 3 free videos a month. For ad-grade output, budget realistically instead: entry points run $29–$110/month across the category, and the cheap tiers meter credits aggressively."
      }
    ],
    asOf: "2026-07-06"
  },
  {
    kind: "alternatives",
    path: "/alternatives/arcads",
    slug: "alternatives-arcads",
    navLabel: "Arcads Alternatives",
    title: "Best Arcads Alternatives: Honest Options by Budget and Job (2026)",
    description: "Arcads alternatives compared honestly: SHOT.IS for full-pipeline scene-real ads, Creatify for cheap volume, HeyGen for multilingual spokespeople, MakeUGC for small budgets, Billo for real humans.",
    eyebrow: "ARCADS ALTERNATIVES",
    h1: "ARCADS ALTERNATIVES, WITHOUT THE SPIN.",
    lede: "Arcads makes the most realistic AI actors in the category — that part of its reputation is earned. Teams still look for alternatives over unpublished pricing (~$110/month reported entry, no trial), credits burned on unusable renders, and the missing editing layer. Here is the honest map.",
    verdict: "If you are leaving Arcads over price, Creatify ($39/month) and MakeUGC (~$29/month reported) trade realism for throughput. If you are leaving over the incomplete workflow — raw clips that still need captions, music, and B-roll — SHOT.IS delivers finished, scene-real ads with QA and edit included, and lets you try the pipeline self-serve first. If your job was never really UGC ads, HeyGen (spokesperson/localization) or Billo (real human creators) fit better.",
    alternatives: [
      {
        name: "SHOT.IS",
        url: "/",
        bestFor: "finished scene-real ads, not raw actor clips",
        summary: "An AI ad studio that generates the whole ad — creator, scene, product with QA-gated fidelity — and delivers beat-synced, caption-ready variant packs. Directly answers Arcads’ two most-cited gaps: the missing edit layer and credit burn on unusable renders (QA gates happen before generation spend). Try self-serve at studio.shot.is; studio work is scoped per brief."
      },
      {
        name: "Creatify",
        url: "https://creatify.ai/",
        bestFor: "volume testing on a real budget",
        summary: "From $39/month with 1,500+ avatars and URL-to-video batch generation, plus competitor ad tracking. Actors are visibly less natural than Arcads’ — that is the trade for roughly a third of the reported entry price and a genuinely public pricing page."
      },
      {
        name: "HeyGen",
        url: "https://www.heygen.com/",
        bestFor: "multilingual spokesperson video and API workflows",
        summary: 'Not a UGC specialist, but the category’s strongest translation (175+ languages with lip-sync) and API. If your "Arcads use case" was actually localized presenter video, HeyGen from $29/month is the better-shaped tool.'
      },
      {
        name: "MakeUGC",
        url: "https://www.makeugc.ai/",
        bestFor: "the smallest budgets",
        summary: "Reported around $29/month for ~10 videos across 35+ languages. Noticeably less polished than Arcads, but the cheapest way to validate whether AI UGC formats move your metrics before committing serious spend."
      },
      {
        name: "Billo",
        url: "https://www.billo.app/",
        bestFor: "real human creators at marketplace prices",
        summary: "The non-AI benchmark: real creators filming your product from ~$99/video. Slower (shipping, filming, revisions) and variants stay expensive, but authenticity is structural — the right call for testimonial-led strategies where synthetic actors should not be used at all."
      },
      {
        name: "Icon",
        url: "https://icon.com/",
        bestFor: "funded DTC brands wanting humans + software workflow",
        summary: 'Pivoted from AI generation to "The Human Admaker": real creators film your ads (~$999 for 6 ads reported) while its software handles briefs, editing, and Meta launch. A managed human alternative sitting between marketplaces and agencies.'
      }
    ],
    faq: [
      {
        question: "What is the cheapest Arcads alternative?",
        answer: "Creatify at $39/month is the cheapest with a public price and serious features; MakeUGC is reported around $29/month. Both trade actor realism for price. Watch credit mechanics on any cheap tier — headline video counts rarely survive contact with real credit burn."
      },
      {
        question: "Which alternative fixes Arcads’ missing editing workflow?",
        answer: "SHOT.IS is the only option on this list that delivers finished ads — music, captions, beat-synced cuts, platform formats — rather than raw renders. If you like Arcads’ actors and only miss editing, the lighter fix is keeping Arcads and finishing in CapCut, which is what most of its users do."
      },
      {
        question: "Should I switch from Arcads to a human creator marketplace?",
        answer: "Switch — or rather, split — if your best-performing angles are testimonial-shaped. Fabricated testimonials are off-limits for synthetic actors, so that job belongs to real people (Billo, Icon, direct creator relationships). Keep AI generation for the volume jobs: hooks, demos, localization, refreshes."
      }
    ],
    asOf: "2026-07-06"
  },
  {
    kind: "alternatives",
    path: "/compare/ai-ugc-ad-tools",
    slug: "compare-ai-ugc-ad-tools",
    navLabel: "AI UGC Ad Tools Compared",
    title: "Best AI UGC Ad Tools in 2026: An Honest Category Map",
    description: "Every notable AI UGC ad tool in 2026 compared by what it is actually best at: SHOT.IS, Arcads, Creatify, HeyGen, MakeUGC, Captions, Billo — with real pricing and real trade-offs.",
    eyebrow: "CATEGORY MAP",
    h1: "AI UGC AD TOOLS: WHO IS ACTUALLY BEST AT WHAT.",
    lede: "Every tool in this category claims to be the best AI UGC ad generator. None of them is — each one is the best at something, and the 2026 consensus among performance teams is running two or three tools, not one. This is the honest map, including where we sit in it.",
    verdict: "Pick by bottleneck, not by brand: Arcads for actor realism, Creatify for cheapest volume, HeyGen for languages and API, SHOT.IS for finished scene-real ads with QA and edit included, MakeUGC for first tests on small budgets, Captions for editing real footage, Billo when the job needs actual humans. Most teams pair a volume tool with a quality tool — the same split this page is honest about.",
    alternatives: [
      {
        name: "SHOT.IS",
        url: "/",
        bestFor: "finished, scene-real UGC ads (studio + self-serve)",
        summary: "Generates the whole ad rather than only an actor clip: keyframe-first scenes with locked product references, vision QA, beat-synced edits, and hook variants named for testing. Self-serve video starts at a $4.99 launch price, volume packs are available in Studio, and managed campaigns are scoped per brief."
      },
      {
        name: "Arcads",
        url: "https://www.arcads.ai/",
        bestFor: "AI actor realism in short ads",
        summary: "The performer-realism leader — 1,000+ AI actors whose delivery is hardest to clock as synthetic. Trade-offs: unpublished pricing (reported ~$110/month entry), no trial, no editing layer, and the most realistic actors reportedly gated to custom tiers."
      },
      {
        name: "Creatify",
        url: "https://creatify.ai/",
        bestFor: "bulk variants from a product URL, lowest entry price",
        summary: "From $39/month: URL-to-video generation, 1,500+ avatars, competitor ad tracking, direct ad launching. Trade-offs: template-look output, credit burn well above headline video counts, and billing complaints loud enough that its Trustpilot rating is currently suspended."
      },
      {
        name: "HeyGen",
        url: "https://www.heygen.com/",
        bestFor: "multilingual spokesperson video and the strongest API",
        summary: "From $29/month; 175+ languages with lip-synced translation, custom digital twins, mature API. Trade-offs for ads: avatar-over-background output reads as corporate video in a UGC feed, and Avatar IV/V credit burn (~20 credits/minute) makes volume testing expensive."
      },
      {
        name: "MakeUGC",
        url: "https://www.makeugc.ai/",
        bestFor: "validating AI UGC on the smallest budget",
        summary: "Reported ~$29/month for ~10 videos in 35+ languages. Visibly less polished than the premium tools — and the cheapest way to learn whether AI UGC formats work for your offer at all."
      },
      {
        name: "Captions",
        url: "https://www.captions.ai/",
        bestFor: "AI editing, captions, and dubbing on real creator footage",
        summary: "Not a generator — an AI editing layer. The consensus 2026 pick for teams that already have human creator partners and need captions, cuts, and localization on real footage."
      },
      {
        name: "Billo",
        url: "https://www.billo.app/",
        bestFor: "real human UGC at marketplace prices",
        summary: "The non-AI benchmark: real creators from ~$99/video (typical market rates $150–$500+ elsewhere, before usage rights). Slow and expensive per variant, structurally authentic — and the only legitimate option for real testimonials."
      }
    ],
    faq: [
      {
        question: "What is the best AI UGC ad tool overall in 2026?",
        answer: "There is no single best — the tools optimize different bottlenecks. The honest heuristic: Arcads if actor realism decides your ads, Creatify if variant volume per dollar does, HeyGen if languages or API access do, SHOT.IS if finished quality per variant does. Most performance teams run a volume tool plus a quality tool."
      },
      {
        question: "How much do AI UGC ad tools cost in 2026?",
        answer: "Public entry points: HeyGen $29/month, Creatify $39/month, MakeUGC ~$29/month (reported), Arcads ~$110/month (reported, unpublished), Billo ~$99/video for real humans. Studio pipelines like SHOT.IS scope per brief. Across all of them, the number that matters for paid social is marginal cost per tested variant, not the subscription line."
      },
      {
        question: "Do I need disclosure labels for AI UGC ads?",
        answer: "On TikTok and Meta, yes in defined cases — both platforms require AI content labels, and the EU AI Act adds transparency obligations. Two hard lines apply on every platform: no impersonating real people, and no fabricated testimonials presented as real customer experiences."
      }
    ],
    asOf: "2026-07-06"
  }
];
const comparisonPagesByPath = new Map(comparisonPages.map((page) => [page.path, page]));
const track = (eventName, params = {}) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
};
const pageContext = () => {
  if (typeof window === "undefined") return { page_path: "", language: "en" };
  const path = window.location.pathname;
  return { page_path: path, language: path === "/es" || path.startsWith("/es/") ? "es" : "en" };
};
const withUtm = (url, location) => {
  try {
    const u = new URL(url);
    u.searchParams.set("utm_source", "shot.is");
    u.searchParams.set("utm_medium", "landing");
    u.searchParams.set("utm_campaign", "site");
    u.searchParams.set("utm_content", location);
    return u.toString();
  } catch {
    return url;
  }
};
const isStudioUrl = (url) => url.startsWith("https://studio.shot.is");
const trackCta = (location, ctaLabel) => track("cta_click", { location, cta_label: ctaLabel, ...pageContext() });
const trackStudioClick = (location) => track("studio_outbound_click", { location, ...pageContext() });
const trackWaitlist = (location, status) => track("waitlist_join", { location, status, ...pageContext() });
const footerLinks = [
  { label: "Open Studio", href: "https://studio.shot.is/" },
  { label: "Pricing", href: "/pricing" },
  { label: "AI UGC Ads", href: "/ai-ugc-ads" },
  { label: "AI Video Ads", href: "/ai-video-ads" },
  { label: "Virtual Influencers", href: "/virtual-influencers" },
  { label: "Lessons", href: "/learn" },
  { label: "Blog", href: "/blog" },
  { label: "Compare", href: "/compare/ai-ugc-ad-tools" },
  { label: "FAQ", href: "/faq" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" }
];
function HomeFooter() {
  return /* @__PURE__ */ jsxs("footer", { className: "relative border-t border-white/5 bg-[#050505] text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-20" }),
    /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-5 pt-24 md:px-8 md:pt-28", children: /* @__PURE__ */ jsx("nav", { "aria-label": "Footer", className: "flex flex-wrap items-center justify-center gap-x-8 gap-y-4", children: footerLinks.map((link) => /* @__PURE__ */ jsx(
      "a",
      {
        href: isStudioUrl(link.href) ? withUtm(link.href, "footer") : link.href,
        onClick: () => isStudioUrl(link.href) ? trackStudioClick("footer") : trackCta("footer", link.label),
        className: "font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-white/55 transition-colors hover:text-accent",
        children: link.label
      },
      link.href
    )) }) }),
    /* @__PURE__ */ jsx("div", { className: "px-5 pb-12 font-mono text-[10px] uppercase tracking-[0.28em] text-white/50 md:px-8", children: "© SHOT.IS" })
  ] });
}
const navLinks = [
  { href: "/#product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/ai-ugc-ads", label: "Managed Studio" },
  { href: "/learn", label: "Learn" },
  { href: "https://studio.shot.is/", label: "Open Studio" }
];
const creators = [
  {
    name: "PRODUCT HERO",
    description: "Packshot campaigns // neon studio look, 9:16",
    alt: "Frame from an AI-generated energy drink packshot ad on a neon backdrop",
    image: "/media/work/case-neon.jpg"
  },
  {
    name: "CHARACTER SPOT",
    description: "Brand mascot as a repeatable persona",
    alt: "Frame from an AI-generated character-led energy drink ad in a retro gaming room",
    image: "/media/work/case-retro.jpg",
    lifted: true
  },
  {
    name: "CREATOR UGC",
    description: "Virtual influencer personas // testimonial ads",
    alt: "Frame from an AI-generated creator UGC ad shot in a bar interior",
    image: "/media/work/case-ugc.jpg"
  }
];
const reelVideos = [
  { src: "/media/work/reel-01.mp4", poster: "/media/work/reel-01.jpg" },
  { src: "/media/work/reel-02.mp4", poster: "/media/work/reel-02.jpg" },
  { src: "/media/work/reel-03.mp4", poster: "/media/work/reel-03.jpg" },
  { src: "/media/reel/visual-overload.mp4", poster: "/media/reel/visual-overload-poster.jpg" },
  { src: "/media/work/reel-04.mp4", poster: "/media/work/reel-04.jpg" },
  { src: "/media/work/reel-05.mp4", poster: "/media/work/reel-05.jpg" },
  { src: "/media/work/reel-06.mp4", poster: "/media/work/reel-06.jpg" }
];
const stats = [
  { value: "8 DAYS", label: "18 ad concepts delivered", sub: "DTC ecommerce launch — vs. a 4-week traditional shoot quote" },
  { value: "31%", label: "Lower CPI", sub: "Mobile gaming studio, 6 AI hook variants shipped per week" },
  { value: "1.7x", label: "ROAS lift", sub: "Best-performing AI variant vs. baseline, DTC ecommerce brand" },
  { value: "6/WK", label: "Hook variants shipped", sub: "Typical ongoing cadence per creator persona" }
];
function BrandLink({ href = "/" }) {
  return /* @__PURE__ */ jsxs("a", { href, className: "group flex items-center gap-4 md:gap-4 lg:gap-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "shutter", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsx("div", { className: "shutter-blade rotate-0" }),
      /* @__PURE__ */ jsx("div", { className: "shutter-blade rotate-[60deg]" }),
      /* @__PURE__ */ jsx("div", { className: "shutter-blade rotate-[120deg]" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-2xl font-extrabold uppercase italic leading-none tracking-tight md:text-[26px] lg:text-3xl", children: [
      "SHOT",
      /* @__PURE__ */ jsx("span", { className: "opacity-40", children: ".IS" })
    ] })
  ] });
}
const menuLinks = navLinks.slice(0, -1);
const studioLink = navLinks[navLinks.length - 1];
function HomeNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("nav", { className: "fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-5 py-6 mix-blend-difference md:px-6 md:py-7 lg:px-8 lg:py-8", children: [
      /* @__PURE__ */ jsx(BrandLink, { href: "/" }),
      /* @__PURE__ */ jsx("div", { className: "hidden items-center gap-7 text-[10px] font-bold uppercase tracking-[0.18em] xl:flex xl:gap-10 xl:text-[11px] xl:tracking-[0.22em]", children: navLinks.map((link) => /* @__PURE__ */ jsx(
        "a",
        {
          href: isStudioUrl(link.href) ? withUtm(link.href, "nav") : link.href,
          onClick: () => isStudioUrl(link.href) ? trackStudioClick("nav") : trackCta("nav", link.label),
          className: "whitespace-nowrap transition-colors hover:text-accent",
          children: link.label
        },
        link.href
      )) }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          "aria-expanded": menuOpen,
          "aria-label": menuOpen ? "Close menu" : "Open menu",
          onClick: () => setMenuOpen((open) => !open),
          className: "relative flex h-10 w-10 items-center justify-center xl:hidden",
          children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: `absolute h-0.5 w-6 bg-white transition-transform duration-300 ${menuOpen ? "rotate-45" : "-translate-y-1"}`
              }
            ),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: `absolute h-0.5 w-6 bg-white transition-transform duration-300 ${menuOpen ? "-rotate-45" : "translate-y-1"}`
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `fixed inset-0 z-[95] flex flex-col justify-between bg-black px-5 pb-8 pt-28 transition-opacity duration-300 xl:hidden ${menuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`,
        "aria-hidden": !menuOpen,
        children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-accent", children: "Menu" }),
            menuLinks.map((link, index) => /* @__PURE__ */ jsxs(
              "a",
              {
                href: link.href,
                onClick: () => {
                  trackCta("nav", link.label);
                  setMenuOpen(false);
                },
                className: `flex items-baseline gap-4 border-b border-white/10 py-5 text-3xl font-extrabold uppercase italic leading-none tracking-tight text-white transition-all duration-300 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`,
                style: { transitionDelay: menuOpen ? `${80 + index * 60}ms` : "0ms" },
                children: [
                  /* @__PURE__ */ jsxs("span", { className: "font-mono text-[10px] font-bold not-italic tracking-[0.2em] text-accent", children: [
                    "0",
                    index + 1
                  ] }),
                  link.label
                ]
              },
              link.href
            ))
          ] }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: withUtm(studioLink.href, "nav"),
              onClick: () => {
                trackStudioClick("nav");
                setMenuOpen(false);
              },
              className: `block bg-white px-8 py-5 text-center text-xs font-black uppercase tracking-[0.3em] text-black transition-all duration-300 active:scale-95 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`,
              style: { transitionDelay: menuOpen ? "320ms" : "0ms" },
              children: studioLink.label
            }
          )
        ]
      }
    )
  ] });
}
function useRevealOnScroll() {
  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}
const formatAsOf = (iso) => new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long" }).format(/* @__PURE__ */ new Date(`${iso}T00:00:00Z`));
function ComparisonPage({ page }) {
  useRevealOnScroll();
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-white", children: [
    /* @__PURE__ */ jsx("div", { className: "grain", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx(HomeNav, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("section", { className: "px-5 pt-36 pb-16 md:px-8 md:pt-44 md:pb-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-accent", children: page.eyebrow }),
        /* @__PURE__ */ jsx("h1", { className: "text-[clamp(1.9rem,6vw,4.75rem)] font-extrabold uppercase leading-[0.92] tracking-tight", children: page.h1 }),
        /* @__PURE__ */ jsx("p", { className: "mt-10 max-w-3xl text-lg font-medium leading-relaxed text-white/55 md:text-xl", children: page.lede })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-white px-5 py-20 text-black md:px-8 md:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent", children: "The short answer" }),
        /* @__PURE__ */ jsx("p", { className: "max-w-4xl text-xl font-bold leading-relaxed text-black/80 md:text-2xl", children: page.verdict })
      ] }) }),
      page.kind === "vs" ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("section", { className: "bg-[#050505] px-5 py-20 text-white md:px-8 md:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-10 text-3xl font-black uppercase leading-[0.92] tracking-tight sm:text-4xl md:text-[52px]", children: "Side by side" }),
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse text-left", children: [
            /* @__PURE__ */ jsxs("caption", { className: "mb-4 text-left font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-white/40", children: [
              page.tableCaption,
              " · facts checked ",
              formatAsOf(page.asOf)
            ] }),
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b-2 border-white/60", children: [
              /* @__PURE__ */ jsx("th", { className: "py-4 pr-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/60", children: "Feature" }),
              /* @__PURE__ */ jsx("th", { className: "py-4 pr-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-accent", children: "SHOT.IS" }),
              /* @__PURE__ */ jsx("th", { className: "py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/60", children: page.competitor.name })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { children: page.rows.map((row) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-white/10 align-top", children: [
              /* @__PURE__ */ jsx("th", { scope: "row", className: "py-4 pr-4 text-sm font-bold text-white/85 md:text-base", children: row.feature }),
              /* @__PURE__ */ jsx("td", { className: "py-4 pr-4 text-sm font-medium leading-relaxed text-white/65 md:text-base", children: row.shotIs }),
              /* @__PURE__ */ jsx("td", { className: "py-4 text-sm font-medium leading-relaxed text-white/65 md:text-base", children: row.competitor })
            ] }, row.feature)) })
          ] }) }),
          /* @__PURE__ */ jsxs("p", { className: "mt-6 max-w-3xl text-sm font-medium leading-relaxed text-white/40", children: [
            page.competitor.name,
            ": ",
            page.competitor.oneLiner,
            " Features and pricing change — verify current details at",
            " ",
            /* @__PURE__ */ jsx(
              "a",
              {
                href: page.competitor.url,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-white/60 underline underline-offset-4 hover:text-accent",
                children: page.competitor.url.replace(/^https?:\/\//, "").replace(/\/$/, "")
              }
            ),
            "."
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "bg-black px-5 py-20 text-white md:px-8 md:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("article", { "data-reveal": true, className: "reveal-text rounded-[4px] border border-white/10 p-6 md:p-8", children: [
            /* @__PURE__ */ jsxs("p", { className: "mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/45", children: [
              "Choose ",
              page.competitor.name,
              " if"
            ] }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: page.whenToChooseThem.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3.5 text-base font-medium leading-relaxed text-white/65", children: [
              /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "mt-[0.55em] h-[7px] w-[7px] flex-none bg-white/40" }),
              /* @__PURE__ */ jsx("span", { children: item })
            ] }, item)) })
          ] }),
          /* @__PURE__ */ jsxs("article", { "data-reveal": true, className: "reveal-text rounded-[4px] border border-accent/40 bg-accent/5 p-6 md:p-8", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent", children: "Choose SHOT.IS if" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: page.whenToChooseUs.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3.5 text-base font-medium leading-relaxed text-white/80", children: [
              /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "mt-[0.55em] h-[7px] w-[7px] flex-none bg-accent" }),
              /* @__PURE__ */ jsx("span", { children: item })
            ] }, item)) })
          ] })
        ] }) })
      ] }) : /* @__PURE__ */ jsx("section", { className: "bg-[#050505] px-5 py-20 text-white md:px-8 md:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-black uppercase leading-[0.92] tracking-tight sm:text-4xl md:text-[52px]", children: "The options, honestly" }),
        /* @__PURE__ */ jsxs("p", { className: "mb-10 font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-white/40", children: [
          "Facts checked ",
          formatAsOf(page.asOf),
          " · each tool is strongest at something different"
        ] }),
        /* @__PURE__ */ jsx("ol", { className: "space-y-4", children: page.alternatives.map((alt, index) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          "article",
          {
            "data-reveal": true,
            className: "reveal-text rounded-[4px] border border-white/10 bg-white/[0.03] p-6 md:p-8",
            style: { transitionDelay: `${index * 0.05}s` },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-baseline justify-between gap-3", children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-black uppercase leading-none tracking-tight md:text-3xl", children: [
                  /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "mr-3 font-mono text-sm font-bold text-accent", children: String(index + 1).padStart(2, "0") }),
                  alt.name
                ] }),
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: alt.url,
                    ...alt.url.startsWith("/") ? {} : { target: "_blank", rel: "noopener noreferrer" },
                    className: "font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white/45 transition-colors hover:text-accent",
                    children: [
                      alt.url.replace(/^https?:\/\//, "").replace(/\/$/, ""),
                      " →"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-accent", children: [
                "Best for: ",
                alt.bestFor
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-3xl text-base font-medium leading-relaxed text-white/60", children: alt.summary })
            ]
          }
        ) }, alt.name)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-white px-5 py-20 text-black md:px-8 md:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent", children: "Questions" }),
        /* @__PURE__ */ jsx("h2", { className: "mb-12 text-3xl font-black uppercase leading-[0.92] tracking-tight sm:text-4xl md:text-[56px]", children: "Asked before deciding." }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: page.faq.map((item, index) => /* @__PURE__ */ jsxs(
          "article",
          {
            "data-reveal": true,
            className: "reveal-text rounded-[4px] border border-black/10 p-6 md:p-8",
            style: { transitionDelay: `${index * 0.07}s` },
            children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-black uppercase leading-tight tracking-tight md:text-2xl", children: item.question }),
              /* @__PURE__ */ jsx("p", { className: "mt-5 text-base font-medium leading-relaxed text-black/58", children: item.answer })
            ]
          },
          item.question
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-accent px-5 py-20 text-white md:px-8 md:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl", children: "Compare with your own brief." }),
        /* @__PURE__ */ jsxs("p", { className: "mt-5 max-w-xl text-base font-medium leading-relaxed text-white/85 md:text-lg", children: [
          "The honest test is a variant in your ad account. See the",
          " ",
          /* @__PURE__ */ jsx("a", { href: "/ai-ugc-ads", className: "underline underline-offset-4 hover:text-black", children: "AI UGC ads service" }),
          " ",
          "or generate in the studio yourself."
        ] }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: withUtm("https://studio.shot.is/", "comparison_page"),
            onClick: () => trackStudioClick("comparison_page"),
            className: "mt-8 inline-flex items-center justify-center bg-white px-9 py-5 text-xs font-black uppercase tracking-[0.26em] text-black transition-all hover:-rotate-1 hover:bg-black hover:text-white",
            children: "Open the studio"
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(HomeFooter, {})
  ] });
}
const defaultTheme = {
  accent: "#ff1100",
  heroFrom: "#000000",
  heroTo: "#250300",
  light: "#f6f6f6",
  dark: "#080808"
};
const giftPages = [
  {
    slug: "gpt",
    businessName: "GPT",
    website: "https://openai.com",
    note: "A small free set of short videos you can watch, download, and test with your team before we ever ask for a call.",
    offer: "If one of these feels useful, we can turn the same direction into a fuller batch: more hooks, cleaner edits, captions, and platform-ready variants.",
    ctaHref: "https://t.me/shotis",
    ctaLabel: "DM founder",
    theme: defaultTheme,
    videos: [
      {
        title: "Creator review",
        angle: "UGC creator reacts to the product and explains the value in a native short-form style.",
        src: "/media/reel/visual-overload.mp4",
        poster: "/media/reel/visual-overload-poster.jpg",
        caption: "Use it as a first creator-style test or as a reference for your team.",
        downloadName: "gpt-creator-review.mp4"
      },
      {
        title: "Feed ad",
        angle: "Fast visual ad built around curiosity, speed, and a clear product moment.",
        src: "/media/reel/visual-overload.mp4",
        poster: "/media/reel/visual-overload-poster.jpg",
        caption: "A direct social ad direction you can try as a quick post or internal preview.",
        downloadName: "gpt-feed-ad.mp4"
      },
      {
        title: "Variant direction",
        angle: "A second creative lane that can expand into hooks, captions, and localization tests.",
        src: "/media/reel/visual-overload.mp4",
        poster: "/media/reel/visual-overload-poster.jpg",
        caption: "A second lane for testing a different hook, rhythm, or audience angle.",
        downloadName: "gpt-variant-direction.mp4"
      }
    ]
  },
  {
    slug: "varka",
    businessName: "VARKA",
    website: "https://varkacoffee.by/",
    logo: "/media/gifts/varka/varka-logo-white.svg",
    language: "ru",
    heroEyebrow: "Подарок для команды VARKA",
    heroTitle: "Поток видео для сети, которая растёт быстрее, чем успевает снимать.",
    note: "120 кофеен с посадкой и 350+ точек VARKA to go в 16 городах. Это десятки контент-поводов каждый месяц — новинки, сезон, локальные акции, самообслуживание. Снимать каждый ролик отдельно — дорого и медленно. Мы показываем, как закрывать это потоком коротких видео в стиле VARKA.",
    offer: "Соберём пилот: ролики под сезонное меню (как «4 стихии»), уют «кофейни у дома», VARKA to go и приложение — в вашем фирменном оранжево-графитовом стиле, готовые к тесту в Reels/TikTok.",
    ctaHref: "https://t.me/shotis",
    ctaLabel: "Обсудить пилот",
    // Real VARKA identity, captured from varkacoffee.by + brand photos (neon/kiosks):
    // warm orange accent #ef7d24, golden amber #f9b732, charcoal #1b1b1b, cream #fff7e8, font Comfortaa.
    theme: {
      accent: "#ef7d24",
      // signature VARKA orange (neon + "to go" kiosks)
      heroFrom: "#fff7e8",
      // cream
      heroTo: "#f9b732",
      // golden amber
      light: "#fff7e8",
      dark: "#1b1b1b"
    },
    proofPoints: [
      { value: "470+", label: "точек по стране" },
      { value: "16", label: "городов" },
      { value: "~140k", label: "визитов в месяц" }
    ],
    videoSectionEyebrow: "Готово к просмотру",
    videoSectionTitle: "Три направления для быстрого теста.",
    videoSectionBody: "Финальные MP4 можно добавить позже. Сначала AI-примечание, затем ролики, затем скачивание файлов для теста.",
    aiNoteTitle: "Сгенерировано с помощью AI.",
    aiNoteBody: "Эти sample-видео готовятся с помощью AI-инструментов как бесплатный креативный preview для VARKA. Перед публикацией важно проверить тексты, визуалы, факты, продуктовые claims и правила площадок.",
    aiNoteFollowup: "Если направление подходит для реальной кампании, SHOT.IS доработает монтаж, captions, офферы и подготовит более чистые варианты для теста.",
    howToUseEyebrow: "Как использовать",
    howToUseTitle: "Не презентация. Контент-тест.",
    howToUseBody: "Скачайте MP4, покажите команде, попробуйте один ролик в organic-посте или используйте как референс для следующей съёмки. Есть сигнал — масштабируем.",
    sprintOutputs: [
      "Ролики под вкусный кофе и сезонное меню.",
      "Свежая выпечка и десерты как повод зайти.",
      "Самообслуживание и приложение VARKA — быстрый заказ и бонусы."
    ],
    metrics: [
      { value: "120", label: "кофеен с посадкой" },
      { value: "350+", label: "точек VARKA to go" },
      { value: "16", label: "городов Беларуси" },
      { value: "~200k", label: "напитков в месяц" }
    ],
    whyEyebrow: "Зачем VARKA поток видео",
    whyTitle: "Сеть растёт быстрее, чем команда успевает снимать.",
    whyBody: "При таком масштабе контент нужен постоянно: каждая новинка, сезон, город и формат — это отдельный повод для ролика. Классическая съёмка под каждый — это дни и бюджет. AI-видео от SHOT.IS даёт черновики за дни, в вашем стиле, и позволяет дёшево протестировать десятки хуков до реальной съёмки.",
    contentEngines: [
      {
        title: "Новинки и сезонное меню",
        body: "Каждый запуск вроде «4 стихии» — это серия роликов под напитки и десерты, а не один пост.",
        image: "/media/gifts/varka/concept-seasonal.jpg"
      },
      {
        title: "Уют «кофейни у дома»",
        body: "Атмосферные ролики под бренд — тёплый свет, дерево, зелень, фирменный неон VARKA.",
        image: "/media/gifts/varka/cafe-neon.jpg"
      },
      {
        title: "VARKA to go и самообслуживание",
        body: "Короткие how-to и промо для 350+ точек: «сделай кофе как профи за 60 секунд».",
        image: "/media/gifts/varka/concept-kiosk.jpg"
      },
      {
        title: "Приложение, бонусы, локальные акции",
        body: "Performance-ролики под установки приложения, ретеншн и акции по городам сети.",
        image: "/media/gifts/varka/concept-people.jpg"
      }
    ],
    brandReasons: [
      {
        title: "Сделано под ваш бренд",
        body: "Оранжево-графитовый стиль, неон с чашкой, корги-маскот, уют «кофейни у дома» — не общий кофейный штамп и не «AI-эстетика»."
      },
      {
        title: "Масштаб = поток поводов",
        body: "470+ точек в 16 городах: новинки, сезон, VARKA to go, приложение и локальные акции дают десятки роликов в месяц."
      },
      {
        title: "Объём и тест дёшево",
        body: "AI даёт десятки вариантов хуков и сценариев быстрее и дешевле полноценной съёмки — проверяете, что заходит, и масштабируете."
      }
    ],
    finalEyebrow: "Эксклюзивный следующий шаг",
    finalTitle: "Соберём пилот видео для VARKA?",
    videos: [
      {
        title: "Сезонное меню",
        angle: "Серия под запуск вроде «4 стихии»: яркие сезонные напитки и десерты крупным планом.",
        caption: "Превью-кадр — реальная кампания VARKA. Финальный ролик добавим позже.",
        poster: "/media/gifts/varka/concept-seasonal.jpg",
        downloadName: "varka-seasonal-menu.mp4"
      },
      {
        title: "Кофейня у дома",
        angle: "Атмосферный ролик: тёплый свет, дерево, зелень, фирменный неон — уют VARKA.",
        caption: "Превью-кадр — реальный интерьер VARKA. Финальный ролик добавим позже.",
        poster: "/media/gifts/varka/cafe-stylish.jpg",
        downloadName: "varka-cozy-cafe.mp4"
      },
      {
        title: "VARKA to go",
        angle: "How-to для самообслуживания: «сделай кофе как профи за 60 секунд» на оранжевом киоске.",
        caption: "Превью-кадр — реальный киоск VARKA to go. Финальный ролик добавим позже.",
        poster: "/media/gifts/varka/concept-kiosk.jpg",
        downloadName: "varka-to-go.mp4"
      }
    ]
  }
];
const giftPagesBySlug = new Map(giftPages.map((page) => [page.slug, page]));
const defaultAuthor = {
  name: "SHOT.IS Editorial",
  url: `${siteBaseUrl}/about`,
  authorType: "Organization"
};
const founderAuthor = founder ? {
  name: founder.name,
  url: `${siteBaseUrl}/about#founder`,
  authorType: "Person",
  ...{ sameAs: [founder.linkedIn] }
} : defaultAuthor;
const post$i = {
  slug: "ai-ugc-ads-guide",
  lang: "en",
  translationKey: "ai-ugc-ads-guide",
  title: "What Are AI UGC Ads? A Practical Guide for Performance Marketers",
  description: "AI UGC ads are creator-style videos generated with AI instead of filmed with a human creator. Learn how they work, when to use them, and how to ship more ad variants without a shoot.",
  excerpt: "Creator-style video without the casting, filming, or reshoots. Here is how AI UGC ads actually work, where they win, and how to brief them.",
  datePublished: "2026-05-20",
  dateModified: "2026-06-10",
  author: defaultAuthor,
  ogImageKey: "blog-ai-ugc-ads-guide",
  tags: ["AI UGC ads", "UGC", "paid social", "creative testing"],
  tldr: [
    "AI UGC ads are creator-style videos generated with AI — a hook, a face, a product moment, and a script — instead of footage filmed with a human creator.",
    "Their main advantage is volume and speed: you can produce many hook and angle variants for creative testing without casting, filming, or reshoots.",
    "They are strongest for top-of-funnel testing, localization, and pre-validating concepts before larger spend; human creators still matter for authentic testimonials and influencer trust.",
    "A good AI UGC ad needs the same fundamentals as any ad: a clear hook, a specific buyer problem, a visible product moment, and a believable delivery."
  ],
  blocks: [
    {
      type: "p",
      text: "AI UGC ads are user-generated-content-style video ads produced with generative AI instead of being filmed with a real creator. The format looks like the casual, phone-shot, talk-to-camera content that performs on TikTok, Instagram Reels, and YouTube Shorts — but the creator, voice, and scene are generated, so a single brief can become many variants in hours instead of weeks."
    },
    {
      type: "h2",
      id: "how-they-work",
      text: "How AI UGC ads work"
    },
    {
      type: "p",
      text: "The pipeline mirrors a normal creative brief, just with generation in the middle. You define the offer and the buyer, write a hook and a short script, choose a creator persona and a scene, then generate the video and iterate on the strongest cuts."
    },
    {
      type: "ol",
      items: [
        "Brief the offer: product, buyer pain, the one objection, proof, format, and target platform.",
        "Write the hook and script: the first two seconds carry the ad, so the hook is the real work.",
        "Choose the creator and scene: a persona, a setting, a tone, and a product moment that feels native to the feed.",
        "Generate and grade: produce several versions, keep what reads as believable, and discard what looks synthetic.",
        "Expand the winners: turn a working concept into hook variants, language variants, and retargeting cutdowns."
      ]
    },
    {
      type: "callout",
      title: "The hook is still the product",
      body: "AI does not change the fundamentals of direct-response creative. Most of the lift comes from the first two seconds and the clarity of the offer — not from how the footage was made."
    },
    {
      type: "h2",
      id: "when-to-use",
      text: "When AI UGC wins (and when it does not)"
    },
    {
      type: "p",
      text: "Think of AI UGC as a volume and speed lever for the top of the testing funnel, not a wholesale replacement for human creators. It is strongest when you need many angles quickly and weakest when authenticity is the whole point of the ad."
    },
    {
      type: "h3",
      id: "use-it-for",
      text: "Use it for"
    },
    {
      type: "ul",
      items: [
        "Volume testing — generating 10+ hook and angle variants per week without a shoot schedule.",
        "Localization — adapting a proven concept into new languages and markets.",
        "Pre-validation — finding the message and hook that works before committing to a bigger production.",
        "Always-on creative — keeping a steady supply of fresh variants so ad fatigue does not stall a campaign."
      ]
    },
    {
      type: "h3",
      id: "be-careful-with",
      text: "Be careful with"
    },
    {
      type: "ul",
      items: [
        "Real testimonials — claims about results are more credible from real customers.",
        "Influencer trust — when the audience follows a specific person, that relationship cannot be generated.",
        "Highly regulated claims — health, finance, and similar categories need careful review regardless of how a video was made."
      ]
    },
    {
      type: "h2",
      id: "what-makes-good",
      text: "What makes a good AI UGC ad"
    },
    {
      type: "p",
      text: "A believable clip is not the goal — a clip that sells is. The strongest AI UGC ads pair a scroll-stopping hook with a specific buyer problem, a visible product moment, and a delivery that feels like a person rather than a script reader."
    },
    {
      type: "quote",
      text: "Realism is table stakes. The ad still has to make one clear argument to one specific person."
    },
    {
      type: "h2",
      id: "getting-started",
      text: "Getting started"
    },
    {
      type: "p",
      text: "Start with one proven offer and write three to five distinct hooks for it. Generate a couple of variants per hook, run them as a small test, and let signal decide what to expand. This is exactly the workflow behind [AI UGC ads at SHOT.IS](/ai-ugc-ads), where one creator persona can produce a steady stream of testable angles. If you want to go deeper, we’ve mapped the [full production pipeline from brief to published ad](/blog/ai-ad-production-pipeline) and published the [20 hook patterns we actually test](/blog/ugc-hook-patterns)."
    }
  ],
  faq: [
    {
      question: "Can AI UGC ads replace human creator ads?",
      answer: "They can replace part of the testing workload, not the entire role of creators. AI UGC is strongest for fast concept volume, visual variation, localization, and pre-testing hooks before larger spend. Human creators remain valuable for authentic testimonials and influencer trust."
    },
    {
      question: "What brands should start with AI UGC ads?",
      answer: "Mobile apps, ecommerce brands, SaaS products, creator-led products, and agencies benefit most — any team that needs frequent ad variants but does not want every test to require casting, filming, and reshoots."
    },
    {
      question: "How many AI UGC variants should I test?",
      answer: "Start small: three to five distinct hooks, one or two versions each. Expand only the variants that show signal, rather than generating dozens at once."
    }
  ]
};
const post$h = {
  slug: "guia-anuncios-ugc-ia",
  lang: "es",
  translationKey: "ai-ugc-ads-guide",
  title: "¿Qué son los anuncios UGC con IA? Guía práctica para marketing de performance",
  description: "Los anuncios UGC con IA son videos estilo creador generados con IA en lugar de grabados con una persona. Aprende cómo funcionan, cuándo usarlos y cómo producir más variantes sin rodaje.",
  excerpt: "Video estilo creador sin casting, rodaje ni regrabaciones. Así funcionan realmente los anuncios UGC con IA, dónde ganan y cómo escribir el brief.",
  datePublished: "2026-05-20",
  dateModified: "2026-06-02",
  author: defaultAuthor,
  ogImageKey: "blog-guia-anuncios-ugc-ia",
  tags: ["anuncios UGC con IA", "UGC", "paid social", "testing creativo"],
  tldr: [
    "Los anuncios UGC con IA son videos estilo creador generados con IA —un hook, un rostro, un momento de producto y un guion— en lugar de grabados con una persona real.",
    "Su mayor ventaja es el volumen y la velocidad: puedes producir muchas variantes de hooks y ángulos para hacer testing sin casting, rodaje ni regrabaciones.",
    "Funcionan mejor para testing de parte superior del embudo, localización y validar conceptos antes de invertir más; los creadores reales siguen siendo clave para testimonios auténticos.",
    "Un buen anuncio UGC con IA necesita lo mismo que cualquier anuncio: un hook claro, un problema concreto, un momento de producto visible y una entrega creíble."
  ],
  blocks: [
    {
      type: "p",
      text: "Los anuncios UGC con IA son anuncios de video con estilo de contenido generado por usuarios, producidos con IA generativa en lugar de grabados con un creador real. El formato se ve como el contenido casual, grabado con el móvil y a cámara que funciona en TikTok, Instagram Reels y YouTube Shorts, pero el creador, la voz y la escena se generan, así que un solo brief puede convertirse en muchas variantes en horas."
    },
    {
      type: "h2",
      id: "como-funcionan",
      text: "Cómo funcionan los anuncios UGC con IA"
    },
    {
      type: "p",
      text: "El proceso es como un brief creativo normal, solo que con generación en el medio. Defines la oferta y el comprador, escribes un hook y un guion corto, eliges un personaje y una escena, y luego generas el video e iteras sobre las mejores versiones."
    },
    {
      type: "ol",
      items: [
        "Define la oferta: producto, dolor del comprador, la objeción principal, prueba, formato y plataforma.",
        "Escribe el hook y el guion: los primeros dos segundos sostienen el anuncio, así que el hook es el trabajo real.",
        "Elige al creador y la escena: un personaje, un entorno, un tono y un momento de producto que se sienta nativo del feed.",
        "Genera y evalúa: produce varias versiones, conserva lo que se ve creíble y descarta lo que parece sintético.",
        "Escala las ganadoras: convierte un concepto que funciona en variantes de hook, de idioma y cortes de retargeting."
      ]
    },
    {
      type: "callout",
      title: "El hook sigue siendo el producto",
      body: "La IA no cambia los fundamentos de la creatividad de respuesta directa. La mayor parte del resultado viene de los primeros dos segundos y la claridad de la oferta, no de cómo se hizo el video."
    },
    {
      type: "h2",
      id: "cuando-usar",
      text: "Cuándo gana el UGC con IA (y cuándo no)"
    },
    {
      type: "p",
      text: "Piensa en el UGC con IA como una palanca de volumen y velocidad para la parte alta del embudo de testing, no como un reemplazo total de los creadores. Gana cuando necesitas muchos ángulos rápido y pierde cuando la autenticidad es todo el punto del anuncio."
    },
    {
      type: "h3",
      id: "usalo-para",
      text: "Úsalo para"
    },
    {
      type: "ul",
      items: [
        "Testing de volumen: generar más de 10 variantes de hooks y ángulos por semana sin agenda de rodaje.",
        "Localización: adaptar un concepto probado a nuevos idiomas y mercados.",
        "Validación previa: encontrar el mensaje y el hook que funciona antes de una producción mayor.",
        "Creatividad siempre activa: mantener un flujo de variantes nuevas para que la fatiga publicitaria no frene la campaña."
      ]
    },
    {
      type: "h3",
      id: "cuidado-con",
      text: "Ten cuidado con"
    },
    {
      type: "ul",
      items: [
        "Testimonios reales: las afirmaciones de resultados son más creíbles de clientes reales.",
        "Confianza del influencer: cuando la audiencia sigue a una persona concreta, esa relación no se puede generar.",
        "Afirmaciones reguladas: salud, finanzas y categorías similares necesitan revisión cuidadosa sin importar cómo se hizo el video."
      ]
    },
    {
      type: "h2",
      id: "que-hace-bueno",
      text: "Qué hace bueno a un anuncio UGC con IA"
    },
    {
      type: "p",
      text: "Un clip creíble no es el objetivo; un clip que vende sí lo es. Los mejores anuncios UGC con IA combinan un hook que detiene el scroll con un problema concreto, un momento de producto visible y una entrega que se siente como una persona y no como alguien leyendo un guion."
    },
    {
      type: "quote",
      text: "El realismo es lo mínimo. El anuncio todavía tiene que hacer un argumento claro a una persona específica."
    },
    {
      type: "h2",
      id: "como-empezar",
      text: "Cómo empezar"
    },
    {
      type: "p",
      text: "Empieza con una oferta probada y escribe de tres a cinco hooks distintos. Genera un par de variantes por hook, lánzalas como un test pequeño y deja que la señal decida qué escalar. Este es exactamente el flujo detrás de los [anuncios UGC con IA en SHOT.IS](/ai-ugc-ads), donde un solo personaje puede producir un flujo constante de ángulos para testear."
    }
  ],
  faq: [
    {
      question: "¿Los anuncios UGC con IA pueden reemplazar a los anuncios con creadores reales?",
      answer: "Pueden reemplazar parte de la carga de testing, no todo el rol de los creadores. El UGC con IA es más fuerte para volumen de conceptos, variación visual, localización y validar hooks antes de invertir más. Los creadores reales siguen siendo valiosos para testimonios auténticos y confianza."
    },
    {
      question: "¿Qué marcas deberían empezar con anuncios UGC con IA?",
      answer: "Apps móviles, ecommerce, productos SaaS, productos liderados por creadores y agencias se benefician más: cualquier equipo que necesite variantes frecuentes pero no quiera que cada test requiera casting, rodaje y regrabaciones."
    },
    {
      question: "¿Cuántas variantes UGC con IA debería testear?",
      answer: "Empieza pequeño: de tres a cinco hooks distintos, una o dos versiones de cada uno. Escala solo las variantes que muestran señal, en lugar de generar docenas a la vez."
    }
  ]
};
const post$g = {
  slug: "what-is-a-virtual-influencer",
  lang: "en",
  translationKey: "virtual-influencers-explained",
  title: "What Is a Virtual Influencer? The Complete Guide for Brands",
  description: "A virtual influencer is a digital creator identity used in social content and campaigns. Types, famous examples, market numbers, how they are built, costs, and disclosure rules.",
  excerpt: "Not a single image — a reusable creator asset with a face, a voice, and a campaign job. The complete guide: types, examples, economics, production, and the rules.",
  datePublished: "2026-05-27",
  dateModified: "2026-07-07",
  author: founderAuthor,
  ogImageKey: "blog-what-is-a-virtual-influencer",
  tags: ["virtual influencers", "AI creators", "brand", "social"],
  tldr: [
    "A virtual influencer is a digital creator identity — a consistent face, tone, and style — used across social content, ads, and campaigns.",
    "The format spans three types: CGI avatars built by studios, AI-native creators generated with modern image and video models, and VTubers performed live by humans.",
    "Virtual influencers reportedly earn around 5.9% Instagram engagement versus 1.9% for human influencers, and 58% of people in the US follow at least one.",
    "For brands the real value is not the character design but the ability to produce repeatable, on-brand content quickly and on your own schedule.",
    "Consistency is the hard part: a virtual influencer only works as a brand asset if the face, voice, and behavior stay recognizable over hundreds of shots.",
    "Disclosure is not optional: several markets, including the US and India, require telling audiences the character is not a real person."
  ],
  blocks: [
    {
      type: "p",
      text: "A virtual influencer is a digital creator identity used in social content, advertising, and brand storytelling. Unlike a one-off AI image, a virtual influencer is designed to be reused — the same recognizable character appears across posts, ads, and campaigns, carrying a consistent face, voice, and personality. Brands treat the character the way they would treat a human creator on retainer: it has an audience, a content calendar, and a commercial job."
    },
    {
      type: "h2",
      id: "history",
      text: "A short history: from virtual idols to AI-native creators"
    },
    {
      type: "p",
      text: "Virtual influencers predate modern AI by decades. The lineage usually starts with Japan’s virtual idol culture — Lynn Minmay, a fictional singer from the 1982 anime Super Dimension Fortress Macross, is often cited as the first virtual idol. The retail brand Magalu created Lu of Magalu in Brazil in 2009, one of the first brand-owned virtual personas. The modern wave began around 2016 with Lil Miquela, and generative AI has since collapsed the production cost from studio-CGI budgets to something a growth team can run."
    },
    {
      type: "h2",
      id: "types",
      text: "The three types of virtual influencer"
    },
    {
      type: "p",
      text: "Not all virtual influencers are built the same way. The three types differ in production method, cost profile, and who is actually behind the character."
    },
    {
      type: "table",
      caption: "Types of virtual influencers compared",
      headers: ["Type", "How it is made", "Who controls it", "Typical use"],
      rows: [
        [
          "CGI avatar",
          "3D modelling, motion capture, studio pipelines",
          "A creative studio or brand team",
          "Flagship brand characters, fashion campaigns"
        ],
        [
          "AI-native creator",
          "Generative image and video models with a locked identity",
          "A brand or studio running an AI pipeline",
          "Always-on social content, UGC-style ads, localization"
        ],
        [
          "VTuber",
          "Real-time animated avatar performed by a human",
          "The human performer behind the avatar",
          "Live streaming, entertainment, community"
        ]
      ]
    },
    {
      type: "p",
      text: "This guide focuses on the first two — characters a brand owns and operates. VTubers are better understood as human creators wearing a digital costume."
    },
    {
      type: "h2",
      id: "examples",
      text: "Famous virtual influencers"
    },
    {
      type: "p",
      text: "A few characters define the category and are worth knowing as reference points for what the format can carry commercially."
    },
    {
      type: "ul",
      items: [
        "**Lil Miquela** — the character that mainstreamed the format: Calvin Klein and Prada campaigns, millions of followers, and reported earnings around $10M a year at peak.",
        "**Lu of Magalu** — created by Brazilian retailer Magalu in 2009 and now one of the most-followed virtual influencers in the world with over 7 million Instagram followers.",
        "**Shudu** — the world’s first virtual supermodel, created by fashion photographer Cameron-James Wilson in 2017, known for luxury fashion collaborations."
      ]
    },
    {
      type: "stat",
      value: "58%",
      label: "of people in the US follow at least one virtual influencer",
      source: "Digital Media Solutions",
      sourceUrl: "https://insights.digitalmediasolutions.com/articles/what-are-virtual-influencers"
    },
    {
      type: "h2",
      id: "why-brands",
      text: "Why brands use virtual influencers"
    },
    {
      type: "p",
      text: "Brands use virtual influencers for control and continuity: the character does not have a calendar, a rate card, or a competing sponsorship, so content can be produced on the brand’s schedule and the same face can anchor every market. The engagement economics are also unusually good for a format this controllable."
    },
    {
      type: "stat",
      value: "5.9% vs 1.9%",
      label: "reported average Instagram engagement rate — virtual influencers vs human influencers",
      source: "YouScan",
      sourceUrl: "https://youscan.io/blog/virtual-influencers/"
    },
    {
      type: "ul",
      items: [
        "Timing — content can be produced whenever a campaign needs it, not when a creator is available.",
        "Continuity — the same character can anchor launches across many months and markets.",
        "Localization — the identity can speak multiple languages while staying recognizable.",
        "Brand safety — what the character says and endorses stays under the brand’s control; there is no off-script scandal risk.",
        "Compounding value — every campaign adds to the character’s recognition instead of renting someone else’s."
      ]
    },
    {
      type: "h2",
      id: "how-built",
      text: "How a virtual influencer is built"
    },
    {
      type: "p",
      text: "A useful virtual influencer is a small system, not a portrait: an identity, a set of rules for how it looks and speaks, and a content plan that gives it something to do. This is the process we run at SHOT.IS for every character we build."
    },
    {
      type: "ol",
      items: [
        "Position the creator: define the audience, genre, brand fit, and the campaign purpose before designing the character.",
        "Lock the identity: a canonical set of reference images, wardrobe logic, world, tone, and content behavior — the source of truth every future asset is generated against.",
        "Create campaign assets: videos, stills, scripts, captions, and paid social versions built from the same identity with reference-anchored generation.",
        "QA every output: each generated shot is checked against the canonical identity, because a character that drifts is a character that stops existing.",
        "Scale the world: launches, collaborations, seasonal drops, and localized versions for new markets."
      ]
    },
    {
      type: "p",
      text: "The full step-by-step version of this process, including the mistakes we made building our own roster, is in [how to create a virtual influencer](/blog/how-to-create-a-virtual-influencer)."
    },
    {
      type: "h2",
      id: "consistency",
      text: "The hard part: consistency"
    },
    {
      type: "p",
      text: "A virtual influencer only works as a brand asset if it stays recognizable. Drifting facial features, an inconsistent voice, or off-brand behavior break the illusion and waste the value of building a character in the first place. In day-to-day production this is the single biggest failure mode: image models will happily generate a slightly different person every time unless the pipeline anchors every shot to a canonical identity. The engineering behind that is covered in [AI character consistency](/blog/ai-character-consistency)."
    },
    {
      type: "h2",
      id: "cost",
      text: "What a virtual influencer costs"
    },
    {
      type: "p",
      text: "The cost range is enormous because the label covers everything from a studio-operated CGI celebrity to an AI-native brand character. Celebrity-grade characters like Lil Miquela are run by full teams; an AI-native brand creator is a one-time identity build plus per-campaign production, which is why the format stopped being a luxury. The honest breakdown by tier is in [virtual influencer cost](/blog/virtual-influencer-cost)."
    },
    {
      type: "h2",
      id: "ethics",
      text: "Disclosure, ethics, and the rules"
    },
    {
      type: "p",
      text: "Sponsored content from a virtual character must be labeled as advertising everywhere, and some jurisdictions — including the US and India — additionally require disclosing that the influencer is not a real person. Platforms are rolling out their own AI-content labels on top of that. Beyond compliance, scholars have criticized the format for entrenching unrealistic beauty standards while diffusing accountability, which is a reputational risk brands should design against rather than ignore."
    },
    {
      type: "callout",
      title: "Virtual does not mean trustless",
      body: "Audiences can connect with a virtual creator, but the brand has to be clear that it is AI. Transparency protects trust; pretending otherwise erodes it — and in several markets, breaks the law."
    },
    {
      type: "h2",
      id: "human-vs-virtual",
      text: "Virtual vs. human influencers"
    },
    {
      type: "p",
      text: "Human influencers still provide something a virtual creator cannot: a real audience relationship and lived credibility. Virtual influencers are strongest when consistency, production speed, and localization matter more than that personal trust."
    },
    {
      type: "table",
      caption: "Virtual vs human influencers for brand campaigns",
      headers: ["Dimension", "Virtual influencer", "Human influencer"],
      rows: [
        ["Audience trust", "Built over time, brand-owned", "Immediate, personal, rented"],
        ["Scheduling", "On demand", "Depends on availability"],
        ["Scandal risk", "None off-script", "Real and uninsurable"],
        ["Localization", "Same face, any language", "One language, one market"],
        ["Cost structure", "Identity build + production", "Fees per post or campaign"],
        ["Long-term value", "Compounds to the brand", "Compounds to the creator"]
      ]
    },
    {
      type: "p",
      text: "Many brands use both — a human creator for reach and trust, a virtual creator for always-on, controllable content. You can read how SHOT.IS builds these as reusable assets on the [virtual influencers](/virtual-influencers) page, and see how a persona moves through production in the [AI ad pipeline walkthrough](/blog/ai-ad-production-pipeline)."
    }
  ],
  faq: [
    {
      question: "What is a virtual influencer?",
      answer: "A virtual influencer is a digital creator identity used in social content, campaigns, and brand storytelling. For performance marketing, the useful part is not only the character design but the ability to create repeatable content quickly and consistently."
    },
    {
      question: "Who are the most famous virtual influencers?",
      answer: "Lil Miquela (Calvin Klein and Prada campaigns, reported $10M yearly earnings at peak), Lu of Magalu (over 7 million Instagram followers, created in 2009), and Shudu (the first virtual supermodel, created in 2017) are the most cited examples."
    },
    {
      question: "Why use a virtual influencer instead of a human influencer?",
      answer: "Virtual influencers give brands more control over timing, format, visuals, localization, and campaign continuity. Human influencers still provide audience trust; virtual creators are strongest when consistency and production speed matter most."
    },
    {
      question: "How are virtual influencers made?",
      answer: "Either with studio CGI pipelines (3D modelling and motion capture) or, increasingly, with generative AI anchored to a locked identity: a canonical set of reference images that every new photo and video is generated against, plus QA that rejects outputs where the character drifts."
    },
    {
      question: "How much does a virtual influencer cost?",
      answer: "Celebrity-grade CGI characters are operated by full studios and cost accordingly. An AI-native brand creator is a one-time identity build plus per-campaign content production — the relevant comparison is against ongoing creator sourcing and reshoot costs, not against Lil Miquela."
    },
    {
      question: "Do you have to disclose that an influencer is AI?",
      answer: "Yes. Sponsored content must be labeled as advertising everywhere, and several markets — including the US and India — require disclosing that the character is not a real person. Platform-level AI labels are also becoming standard."
    }
  ]
};
const post$f = {
  slug: "que-es-un-influencer-virtual",
  lang: "es",
  translationKey: "virtual-influencers-explained",
  title: "¿Qué es un influencer virtual? Cómo funcionan los creadores con IA para marcas",
  description: "Un influencer virtual es una identidad de creador digital usada en contenido y campañas. Aprende cómo se construyen los creadores con IA, por qué las marcas los usan y cómo mantenerlos consistentes.",
  excerpt: "No es una sola imagen: es un activo de creador reutilizable con rostro, voz y un propósito de campaña. Así funcionan los influencers virtuales.",
  datePublished: "2026-05-27",
  dateModified: "2026-05-27",
  author: defaultAuthor,
  ogImageKey: "blog-que-es-un-influencer-virtual",
  tags: ["influencers virtuales", "creadores con IA", "marca", "social"],
  tldr: [
    "Un influencer virtual es una identidad de creador digital —un rostro, tono y estilo consistentes— usada en contenido social, anuncios y campañas.",
    "Para las marcas, el valor real no es el diseño del personaje sino la capacidad de producir contenido de marca repetible, rápido y según tu propia agenda.",
    "Dan a las marcas control sobre tiempos, formato, localización y continuidad que depender de un solo creador humano no permite.",
    "La consistencia es lo difícil: un influencer virtual solo funciona como activo de marca si el rostro, la voz y el comportamiento se mantienen reconocibles con el tiempo."
  ],
  blocks: [
    {
      type: "p",
      text: "Un influencer virtual es una identidad de creador digital usada en contenido social, publicidad y narrativa de marca. A diferencia de una imagen de IA puntual, un influencer virtual está diseñado para reutilizarse: el mismo personaje reconocible aparece en publicaciones, anuncios y campañas, con un rostro, una voz y una personalidad consistentes."
    },
    {
      type: "h2",
      id: "como-se-construye",
      text: "Cómo se construye un influencer virtual"
    },
    {
      type: "p",
      text: "Un influencer virtual útil es más que un buen retrato. Es un pequeño sistema: una identidad, un conjunto de reglas sobre cómo se ve y habla, y un plan de contenido que le da algo que hacer."
    },
    {
      type: "ol",
      items: [
        "Posiciona al creador: define la audiencia, el género, el encaje con la marca y el propósito de campaña antes de diseñar el personaje.",
        "Fija la identidad: un rostro repetible, lógica de vestuario, mundo, tono y comportamiento de contenido.",
        "Crea activos de campaña: videos, fotos, guiones, captions y versiones de paid social desde la misma identidad.",
        "Escala el mundo: lanzamientos, colaboraciones, drops de temporada y versiones localizadas para nuevos mercados."
      ]
    },
    {
      type: "h2",
      id: "por-que-marcas",
      text: "Por qué las marcas usan influencers virtuales"
    },
    {
      type: "p",
      text: "El argumento es control y continuidad. Un influencer virtual no tiene agenda, tarifa ni patrocinios competidores, así que una marca puede producir contenido según su propio calendario y mantener un rostro consistente en cada mercado."
    },
    {
      type: "ul",
      items: [
        "Tiempos: el contenido se produce cuando la campaña lo necesita, no cuando el creador está disponible.",
        "Continuidad: el mismo personaje puede sostener lanzamientos durante muchos meses y mercados.",
        "Localización: la identidad puede hablar varios idiomas y seguir siendo reconocible.",
        "Seguridad de marca: lo que el personaje dice y respalda queda bajo control de la marca."
      ]
    },
    {
      type: "callout",
      title: "Virtual no significa sin confianza",
      body: "La audiencia puede conectar con un creador virtual, pero la marca debe dejar claro que es IA. La transparencia protege la confianza; fingir lo contrario la erosiona."
    },
    {
      type: "h2",
      id: "consistencia",
      text: "Lo difícil: la consistencia"
    },
    {
      type: "p",
      text: "Un influencer virtual solo funciona como activo de marca si se mantiene reconocible. Rasgos faciales que cambian, una voz inconsistente o un comportamiento fuera de marca rompen la ilusión y desperdician el valor de haber construido un personaje. Por eso conviene tratarlo como una identidad mantenida con reglas, no como un prompt que se ejecuta de cero cada vez."
    },
    {
      type: "h2",
      id: "humano-vs-virtual",
      text: "Influencers virtuales vs. humanos"
    },
    {
      type: "p",
      text: "Los influencers humanos aún aportan algo que un creador virtual no puede: una relación real con la audiencia y credibilidad vivida. Los influencers virtuales ganan cuando la consistencia, la velocidad de producción y la localización importan más que esa confianza personal. Muchas marcas usan ambos. Puedes ver cómo SHOT.IS los construye como activos reutilizables en la página de [influencers virtuales](/virtual-influencers)."
    }
  ],
  faq: [
    {
      question: "¿Qué es un influencer virtual?",
      answer: "Un influencer virtual es una identidad de creador digital usada en contenido social, campañas y narrativa de marca. Para el marketing de performance, lo útil no es solo el diseño del personaje sino la capacidad de crear contenido repetible de forma rápida y consistente."
    },
    {
      question: "¿Por qué usar un influencer virtual en lugar de uno humano?",
      answer: "Los influencers virtuales dan más control sobre tiempos, formato, visuales, localización y continuidad de campaña. Los humanos siguen aportando confianza de audiencia; los virtuales ganan cuando la consistencia y la velocidad de producción son lo más importante."
    },
    {
      question: "¿Hay que revelar que un influencer es IA?",
      answer: "Sí: ser transparente sobre que un creador es virtual protege la confianza de la audiencia y se alinea con las expectativas de las plataformas y la publicidad. La divulgación clara es parte de usar influencers virtuales de forma responsable."
    }
  ]
};
const post$e = {
  slug: "ai-video-ads-vs-traditional",
  lang: "en",
  translationKey: "ai-video-ads-vs-traditional",
  title: "AI Video Ads vs. Traditional Production: Cost, Speed, and Quality",
  description: "How AI video ads compare to traditional production on cost, turnaround, and quality — and a practical way to combine both for short-form performance marketing.",
  excerpt: "Faster and cheaper is the easy headline. The real question is where each approach actually wins. A practical comparison.",
  datePublished: "2026-06-02",
  dateModified: "2026-06-10",
  author: defaultAuthor,
  ogImageKey: "blog-ai-video-ads-vs-traditional",
  tags: ["AI video ads", "production", "cost", "paid social"],
  tldr: [
    "AI video ads win on cost and turnaround: many concepts in days instead of one polished shoot in weeks.",
    "Traditional production still wins on hero assets, real people, and footage where physical authenticity is the point.",
    "The strongest setup is hybrid: AI for volume testing and localization, traditional for the few flagship assets that carry the brand.",
    "Compare on the job to be done — testing velocity vs. flagship polish — not on a single cost-per-video number."
  ],
  blocks: [
    {
      type: "p",
      text: "“AI is cheaper and faster” is true but incomplete. The more useful comparison is which approach fits the job: AI video ads are built for testing velocity and volume, while traditional production is built for a small number of high-polish, high-trust assets. Most brands do not have to choose one."
    },
    {
      type: "h2",
      id: "cost",
      text: "Cost"
    },
    {
      type: "p",
      text: "A traditional shoot front-loads cost — crew, talent, location, and edit — into a small number of finished videos. AI video ads spread a much lower marginal cost across many variants, so the economics flip from “one expensive video” to “many cheap tests.” For creative testing, where most variants are meant to be discarded, that difference is the whole point."
    },
    {
      type: "h2",
      id: "speed",
      text: "Speed"
    },
    {
      type: "p",
      text: "Turnaround is where the gap is widest. A traditional concept can take weeks from brief to delivery once scheduling and reshoots are included. AI video ads collapse that to days, which means creative can keep pace with paid social instead of lagging behind it."
    },
    {
      type: "callout",
      title: "Speed compounds",
      body: "Faster turnaround is not just convenient — it means more test cycles per month, and more test cycles is how you find winning creative sooner."
    },
    {
      type: "h2",
      id: "quality",
      text: "Quality"
    },
    {
      type: "p",
      text: "Quality is the most nuanced axis. AI video has closed much of the gap for feed-native, casual formats, but physical authenticity — a real person handling a real product, a specific location, a genuine reaction — is still where traditional production leads. The right question is not “which looks better in the abstract” but “what does this specific placement need.”"
    },
    {
      type: "h2",
      id: "hybrid",
      text: "The hybrid approach"
    },
    {
      type: "p",
      text: "In practice the best setup blends both. Use AI video ads to test angles, hooks, and languages at volume, find what works, and only then invest traditional production budget into the few flagship assets that deserve it. This is the philosophy behind [AI video ads at SHOT.IS](/ai-video-ads): treat AI as the testing engine and reserve expensive production for proven winners. For a look at how that engine actually runs, see the [AI ad production pipeline](/blog/ai-ad-production-pipeline) and our [working comparison of Veo 3, Grok Imagine, and Kling](/blog/best-ai-video-generator-for-ads)."
    },
    {
      type: "ul",
      items: [
        "Use AI for: volume testing, localization, retargeting cutdowns, and always-on variants.",
        "Use traditional for: hero brand films, real testimonials, and footage where authenticity is the message.",
        "Combine them: validate cheaply with AI, then produce the proven concept at higher polish."
      ]
    }
  ],
  faq: [
    {
      question: "Are AI video ads cheaper than traditional production?",
      answer: "Per variant, yes — AI video ads have a much lower marginal cost, which is why they suit volume testing. Traditional production concentrates higher cost into a few finished assets, which suits flagship brand work."
    },
    {
      question: "Is AI video quality good enough for ads?",
      answer: "For feed-native, casual short-form formats, AI video is often good enough and improving quickly. For footage where physical authenticity is the whole point, traditional production still leads."
    },
    {
      question: "Should I replace my whole production pipeline with AI?",
      answer: "Usually no. The strongest approach is hybrid: AI for testing velocity and localization, traditional production for the small number of flagship assets that carry the brand."
    }
  ]
};
const post$d = {
  slug: "creatividad-ia-para-marcas",
  lang: "es",
  translationKey: "creatividad-ia-para-marcas",
  title: "Creatividad con IA para marcas: cómo escalar anuncios de video",
  description: "Cómo las marcas usan la creatividad con IA para producir más anuncios de video, testear más rápido y localizar campañas sin multiplicar el presupuesto de producción.",
  excerpt: "Más conceptos, más formatos y más velocidad de testing. Así escalan las marcas su creatividad de video con IA sin disparar el presupuesto.",
  datePublished: "2026-06-05",
  dateModified: "2026-06-05",
  author: defaultAuthor,
  ogImageKey: "blog-creatividad-ia-para-marcas",
  tags: ["creatividad con IA", "anuncios de video", "marcas", "paid social"],
  tldr: [
    "La creatividad con IA permite a las marcas producir muchos más conceptos y formatos sin multiplicar el presupuesto de producción.",
    "Su mayor impacto está en la velocidad de testing: más ciclos de prueba al mes significan encontrar antes la creatividad ganadora.",
    "La localización se vuelve barata: un concepto probado puede adaptarse a varios idiomas y mercados rápidamente.",
    "El objetivo no es reemplazar a los equipos creativos, sino darles una palanca de volumen para explorar más ideas con el mismo presupuesto."
  ],
  blocks: [
    {
      type: "p",
      text: "La creatividad con IA cambia la economía del video para marcas. En lugar de elegir entre pocos anuncios bien producidos, los equipos pueden explorar muchos conceptos, formatos y ángulos con el mismo presupuesto, y dejar que los datos decidan en qué invertir más."
    },
    {
      type: "h2",
      id: "volumen",
      text: "Volumen sin disparar el presupuesto"
    },
    {
      type: "p",
      text: "El cuello de botella tradicional de la creatividad es la producción: cada concepto nuevo cuesta tiempo y dinero. La IA reduce el coste marginal de cada variante, así que producir diez ideas deja de ser un lujo y pasa a ser parte normal del proceso de testing."
    },
    {
      type: "h2",
      id: "velocidad-testing",
      text: "Velocidad de testing"
    },
    {
      type: "p",
      text: "El mayor impacto no es el ahorro por video, sino la cantidad de ciclos de prueba que puedes correr. Más variantes lanzadas más rápido significan más aprendizaje por mes, y eso es lo que acelera encontrar la creatividad que funciona."
    },
    {
      type: "callout",
      title: "Testear es el verdadero producto",
      body: "La ventaja de la IA no es hacer un video perfecto, sino permitirte fallar barato muchas veces hasta encontrar el ángulo que convierte."
    },
    {
      type: "h2",
      id: "localizacion",
      text: "Localización barata"
    },
    {
      type: "p",
      text: "Una vez que un concepto funciona, adaptarlo a nuevos mercados solía requerir nuevas grabaciones. Con IA, un concepto ganador puede convertirse en variantes de idioma y de cultura rápidamente, manteniendo el mensaje que ya demostró funcionar."
    },
    {
      type: "ul",
      items: [
        "Más conceptos por campaña con el mismo presupuesto.",
        "Adaptación rápida a varios idiomas y mercados.",
        "Variantes de retargeting y cortes nuevos sin volver a grabar.",
        "Un flujo constante de creatividad fresca contra la fatiga publicitaria."
      ]
    },
    {
      type: "h2",
      id: "equipos",
      text: "Una palanca para los equipos, no un reemplazo"
    },
    {
      type: "p",
      text: "La creatividad con IA funciona mejor como herramienta para los equipos creativos, no como sustituto. Da volumen y velocidad para explorar más ideas, mientras la estrategia, el criterio y la marca siguen siendo humanos. Así enfocamos los [anuncios de video con IA en SHOT.IS](/ai-video-ads): la IA como motor de testing, el equipo como dirección."
    }
  ],
  faq: [
    {
      question: "¿La creatividad con IA reemplaza a los equipos creativos?",
      answer: "No. Funciona mejor como una palanca de volumen y velocidad para los equipos creativos. La estrategia, el criterio y la voz de marca siguen siendo humanos; la IA amplía cuántas ideas se pueden explorar."
    },
    {
      question: "¿Cuál es el mayor beneficio de la creatividad con IA para una marca?",
      answer: "La velocidad de testing. Poder lanzar más variantes más rápido significa más ciclos de aprendizaje por mes, que es lo que acelera encontrar la creatividad ganadora."
    },
    {
      question: "¿Sirve la IA para localizar campañas?",
      answer: "Sí. Un concepto probado puede adaptarse a varios idiomas y mercados rápidamente, manteniendo el mensaje que ya demostró funcionar, sin necesidad de nuevas grabaciones."
    }
  ]
};
const post$c = {
  slug: "ai-ad-production-pipeline",
  lang: "en",
  translationKey: "ai-ad-production-pipeline",
  title: "From Brief to Published Ad: Inside a Real AI Ad Production Pipeline",
  metaTitle: "AI Ad Production Pipeline: Brief to Published Ad | SHOT.IS",
  description: "How a real AI ad production pipeline turns a brand brief into a finished short-form ad: scene bible, keyframes, vision QA, i2v animation, beat-grid edit.",
  excerpt: "Nine stages sit between a brand brief and a published ad. Here’s the full map of how our studio actually runs them — failure modes included.",
  datePublished: "2026-06-10",
  dateModified: "2026-06-10",
  author: founderAuthor,
  ogImageKey: "blog-ai-ad-production-pipeline",
  tags: ["AI ad production", "pipeline", "AI video ads", "workflow"],
  tldr: [
    "A production AI ad pipeline runs in nine stages: brief, scene bible, reference-aware keyframes, grading and QA, image-to-video animation, beat-grid editing, overlays, export, and creative testing.",
    "Keyframe-first workflows generate and grade still images before animating, because rejecting a bad still costs seconds while rejecting a bad video costs minutes of render time and real money.",
    "A 30–40 second AI ad is typically 6–12 shots of 4–8 seconds each, and in practice you generate 2–4 candidates per shot to keep one.",
    "A scene bible — one locked location, one outfit, and a short list of look constants — is what makes separately generated shots read as one coherent world.",
    "Identity drift (faces, logos, and product labels shifting away from the reference mid-clip) is the main failure mode of image-to-video; short clips and a fresh keyframe anchor per shot are the working mitigations."
  ],
  blocks: [
    {
      type: "p",
      text: "An AI ad production pipeline is the sequence of steps that turns a brand brief into a finished, publishable short-form ad: brief intake, a scene bible that locks the visual world, reference-aware keyframe generation, grading and QA, image-to-video animation, a beat-synced edit, overlays, and export into creative testing. Our studio runs this pipeline daily, and the honest version is less “type a prompt, get an ad” and more a production line with rejection gates at every stage. This article is the full map; the linked deep-dives go further into each part."
    },
    {
      type: "h2",
      id: "pipeline-overview",
      text: "What does the pipeline actually look like, end to end?"
    },
    {
      type: "p",
      text: "Every ad we ship passes through the same nine stages. The order matters: each stage exists to make the next one cheaper, and the expensive operations — video rendering, human review — sit as late as possible."
    },
    {
      type: "ol",
      items: [
        "Brief intake — distill the brand’s product, audience, and offer into a one-page creative brief: what the ad must show, claim, and ask.",
        "Scene bible — lock one location, one outfit, and a short list of look constants (palette, lens feel, lighting) for the whole campaign.",
        "Shot plan — break the ad into 6–12 shots of 4–8 seconds each for a 30–40 second runtime, each shot with a purpose: hook, demo, proof, close.",
        "Keyframe generation — generate still keyframes with reference-aware image models, feeding real product shots and creator identity images as references.",
        "Grading and vision QA — machine-grade every keyframe against a checklist (brand fidelity, identity match, continuity, artifacts); regenerate the ones that fail.",
        "Image-to-video animation — animate only the approved keyframes; a 6-second clip renders in roughly 1–5 minutes depending on model and load.",
        "Beat-grid edit — assemble clips on a beat grid so cuts land on music onsets, then add burned-in text and box overlays.",
        "Export — render 9:16 vertical first, then any other aspect ratios the placements need.",
        "Creative testing — ship multiple variants, read performance, and feed the winners’ patterns back into the next brief."
      ]
    },
    {
      type: "p",
      text: "Nothing in that list is exotic on its own. The leverage comes from running it as one connected system, where a shot rejected at stage 5 never burns render minutes at stage 6."
    },
    {
      type: "h2",
      id: "why-keyframes-first",
      text: "Why generate keyframes first instead of going straight to video?"
    },
    {
      type: "p",
      text: "Because rejection is the core activity of AI production, and you want to reject at the cheapest possible stage. A still keyframe is fast to generate and instant to judge: the logo is wrong or it isn’t, the face matches the reference or it doesn’t. A video clip takes minutes to render and minutes to review, and a flaw baked into its first frame is baked into every frame after it."
    },
    {
      type: "p",
      text: "So we do all identity-critical work at the still stage. Product shots and creator identity images go into reference-aware image models, candidates come out, and only frames that pass QA graduate to animation. In practice we generate 2–4 keyframe candidates per shot to keep one — a hit rate that would be painfully expensive at the video stage and is nearly free at the still stage. The same logic drives our model choices, which we compare in detail in [our breakdown of AI video generators for ads](/blog/best-ai-video-generator-for-ads)."
    },
    {
      type: "h2",
      id: "scene-bible",
      text: "What is a scene bible, and why do AI ads fall apart without one?"
    },
    {
      type: "p",
      text: "Generative models have no memory between shots. Ask for “a woman holding the drink in a cafe” six times and you get six cafes, six tables, six lighting setups — six technically fine shots that don’t form one world. We call the failure mode “4 drinks on 4 different tables”, and it’s the single most common reason a multi-shot AI ad reads as fake even when every individual frame looks good."
    },
    {
      type: "p",
      text: "The fix is boring and editorial, not technical: before generating anything, we write a scene bible that locks one location, one outfit, and a short list of look constants — palette, lens feel, lighting direction. Every keyframe prompt inherits those constants verbatim. This matters most for campaigns built around a recurring AI persona, where the character has to be recognizably the same person across shots, ads, and weeks — the same discipline that makes [virtual influencers](/virtual-influencers) work as an ongoing channel rather than a one-off stunt. If that concept is new, start with [what a virtual influencer actually is](/blog/what-is-a-virtual-influencer)."
    },
    {
      type: "h2",
      id: "identity-drift",
      text: "How do you keep faces and products consistent through animation?"
    },
    {
      type: "p",
      text: "Image-to-video models drift. Over the course of a clip, faces slide away from the reference, logos smear, and product labels mutate into almost-text. This is the main failure mode of i2v animation, and it gets worse with clip length and camera movement. We don’t have a way to eliminate it; we have a way to keep it below the threshold a viewer notices."
    },
    {
      type: "ul",
      items: [
        "Keep clips short — 4–8 seconds. Drift compounds with duration, so we cut before it becomes visible.",
        "Re-anchor every shot on a fresh keyframe instead of extending one clip, so each shot starts from a clean, QA-passed identity.",
        "Keep the subject mid-frame on identity-critical shots; edge-of-frame faces and labels degrade fastest.",
        "Avoid fast camera moves when a logo or face must hold — save the whip-pans for B-roll where nothing needs to stay readable."
      ]
    },
    {
      type: "callout",
      title: "Field note: the label test",
      body: "In our pipeline the fastest drift check is product text. We zoom the final frame of every clip and read the label: if the brand name is still legible and correctly spelled at the end of the shot, faces and palette have almost always held too. When the label has melted, the clip gets cut shorter or the shot gets regenerated from its keyframe — no debate, no exceptions."
    },
    {
      type: "h2",
      id: "vision-qa",
      text: "How does machine-graded QA work?"
    },
    {
      type: "p",
      text: "Every keyframe and every clip is graded by a vision model against a fixed checklist before it can enter the edit: brand fidelity (is the product the actual product?), identity match (is this the same person as the reference?), continuity (does it obey the scene bible?), and artifacts (extra fingers, warped text, impossible geometry). Assets that fail are regenerated automatically; assets that pass move on."
    },
    {
      type: "p",
      text: "The point of automating this isn’t to remove human taste — a human still signs off on the final cut. The point is volume. When a campaign needs 8 shots times 3 candidates times several hook variants, nobody is eyeballing every frame, and the checklist catches the failures that are objective: wrong logo, wrong face, melted hands. Machine QA does the rejection; humans do the selection."
    },
    {
      type: "h2",
      id: "which-models",
      text: "Which video models do we actually run, and when?"
    },
    {
      type: "p",
      text: "We run several video models in production, because no single model wins every shot type. Google Veo 3 has the strongest physics and motion realism we’ve seen, plus native audio — it gets the shots where believable movement carries the ad. Grok Imagine is the fastest and cheapest to iterate, and its reference-aware image generation pairs naturally with the keyframe-first workflow, so it absorbs the bulk of exploration and candidate generation. Kling is strong on character motion and expressiveness — performances, gestures, reaction shots."
    },
    {
      type: "p",
      text: "The operational reality matters as much as the quality ranking: provider rate limits and quotas interrupt large batches, so retries and queueing are part of the pipeline, not an edge case. Some providers restrict aspect ratios or watermark output on lower tiers, which can quietly disqualify them for a 9:16 paid placement. The full comparison lives in [best AI video generator for ads](/blog/best-ai-video-generator-for-ads)."
    },
    {
      type: "h2",
      id: "assembly",
      text: "How do clips become a finished ad?"
    },
    {
      type: "p",
      text: "Assembly is where AI footage starts behaving like an ad instead of a demo reel. We edit on a beat grid: the music track is analyzed for onsets, and cuts land on them. A cut that lands on a beat reads as intentional; the same cut 200 milliseconds off reads as sloppy, and viewers feel it even if they can’t name it. On top of the cut we burn in text and box overlays — hooks, captions, price callouts — directly into the render, because feed viewers watch with sound off more often than not."
    },
    {
      type: "p",
      text: "Everything renders 9:16 vertical first. Vertical is the native shape of the placements that matter for short-form — landscape is the afterthought now, not the master."
    },
    {
      type: "h2",
      id: "testing",
      text: "Why does testing volume beat single-asset polish?"
    },
    {
      type: "p",
      text: "Because hooks fatigue in days on paid social. A winning opening three seconds stops winning fast, and no amount of polish on one asset changes that. The pipeline above is built for exactly this: once the scene bible and keyframes exist, producing a new variant means swapping the hook shot and re-rendering the edit — not re-shooting the campaign. That’s also the economic argument for AI in this format; we’ve broken down [what AI UGC ads actually cost](/blog/ai-ugc-ads-cost) and [how the economics compare to traditional production](/blog/ai-video-ads-vs-traditional) separately."
    },
    {
      type: "p",
      text: "What you test is mostly the hook. We maintain a working library of [hook patterns for UGC ads](/blog/ugc-hook-patterns) and rotate them against the same body footage — in a typical batch, the spread between the best and worst hook on identical mid-rolls is large enough that hook choice matters more than any single craft decision downstream."
    },
    {
      type: "h2",
      id: "getting-started",
      text: "What we’d do in your place"
    },
    {
      type: "p",
      text: "If you’re starting from zero: write the one-page brief and the scene bible before touching any model — those two documents are most of the difference between a campaign and a pile of clips. Plan 6–12 shots, generate stills first, be ruthless at the keyframe gate, and budget 2–4 candidates per shot. Keep clips short, cut on the beat, and ship several hook variants instead of perfecting one."
    },
    {
      type: "p",
      text: "If you’d rather plug into a pipeline that already runs daily — scene bible discipline, vision QA, multi-model rendering, beat-grid assembly included — that’s what we operate as a service. Start with [AI UGC ads](/ai-ugc-ads) for creator-style testimonial formats, or [AI video ads](/ai-video-ads) for the broader short-form production line. Either way, the pipeline on this page is the one your ad will travel through."
    }
  ],
  faq: [
    {
      question: "What is an AI ad production pipeline?",
      answer: "An AI ad production pipeline is the staged workflow that turns a brand brief into a finished short-form ad: scene bible, reference-aware keyframe generation, automated QA, image-to-video animation, beat-synced editing, overlays, and export. Each stage acts as a rejection gate so expensive steps like video rendering only run on approved material."
    },
    {
      question: "How many shots does a 30–40 second AI ad need?",
      answer: "Typically 6–12 shots of 4–8 seconds each. Short clips are deliberate: image-to-video models drift away from reference faces and product labels as clips get longer, so a 30–40 second ad is assembled from many short, re-anchored shots rather than a few long ones."
    },
    {
      question: "Why do AI-generated faces and logos drift during a video?",
      answer: "Image-to-video models generate each clip from a starting frame plus motion, and they gradually lose fidelity to the reference as the clip progresses — faces shift, logos smear, label text mutates. Working mitigations are clips of 4–8 seconds, a fresh keyframe anchor per shot, mid-frame subjects, and slow camera moves on identity-critical shots."
    },
    {
      question: "Which AI video models are used in production ad pipelines?",
      answer: "Our studio runs Google Veo 3, Grok Imagine, and Kling in production. Veo 3 leads on physics, motion realism, and native audio; Grok Imagine is the fastest and cheapest for iteration and pairs well with keyframe-first workflows; Kling is strongest on character motion and expressive performances. No single model wins every shot type."
    },
    {
      question: "What is a scene bible in AI video production?",
      answer: "A scene bible is a short document that locks one location, one outfit, and a list of look constants — palette, lens feel, lighting — for an entire campaign. Because generative models have no memory between shots, the scene bible is what makes separately generated shots read as one coherent world instead of disconnected images."
    }
  ]
};
const post$b = {
  slug: "best-ai-video-generator-for-ads",
  lang: "en",
  translationKey: "best-ai-video-generator-for-ads",
  title: "Kling vs Veo 3 vs Grok Imagine: Best AI Video Generator for Ads?",
  metaTitle: "Kling vs Veo 3 vs Grok Imagine for Ads | SHOT.IS",
  description: "The best AI video generator for ads in 2026 depends on the shot: Veo 3 for physics and audio, Grok Imagine for fast iteration, Kling for character motion.",
  excerpt: "We run Veo 3, Grok Imagine, and Kling in production every day. None of them is the best — each one is the best at something. Here is the split.",
  datePublished: "2026-06-10",
  dateModified: "2026-06-10",
  author: founderAuthor,
  ogImageKey: "blog-best-ai-video-generator-for-ads",
  tags: ["AI video generators", "Veo 3", "Kling", "Grok Imagine", "ad production"],
  tldr: [
    "There is no single best AI video generator for ads in 2026: Veo 3 leads on physics realism and native audio, Grok Imagine on iteration speed and cost, Kling on character motion and expressiveness.",
    "For identity-critical shots — faces, logos, product labels — the workflow matters more than the model: short 4–8 second clips re-anchored on graded keyframes drift far less than long single takes.",
    "A 30–40 second ad is typically 6–12 shots; routing each shot to the model that suits it beats forcing one model to do everything.",
    "In batch ad production, rate limits and reliability matter as much as output quality — large runs need retries and queueing no matter which provider you pick.",
    "Expect to generate 2–4 candidates per shot to keep one, so per-generation cost and render speed compound fast across a campaign."
  ],
  blocks: [
    {
      type: "p",
      text: "There is no single best AI video generator for ads in 2026. After running Google Veo 3, Grok Imagine, and Kling side by side in daily ad production, our honest answer is a split decision: Veo 3 wins on motion physics and native audio, Grok Imagine wins on iteration speed and cost, and Kling wins on character motion and expressiveness. The useful question is not which model is best — it’s which model is best for each shot in your edit."
    },
    {
      type: "p",
      text: "This is not a feature-table comparison assembled from launch announcements. We are a studio that ships AI ad video daily, and all three models sit in our production pipeline at the same time. What follows is where each one actually earns its slot, where each one fails, and the routing logic we use to decide which model animates which shot. If you want the full workflow context, the [AI ad production pipeline](/blog/ai-ad-production-pipeline) post covers how these models fit into the larger keyframe-to-edit process."
    },
    {
      type: "h2",
      id: "what-matters",
      text: "What actually matters when generating ad video?"
    },
    {
      type: "p",
      text: "Demo reels reward spectacle. Ad production rewards repeatability. When a model has to produce shot 7 of 12, matching the same creator, the same product label, and the same location as shots 1 through 6, the evaluation criteria change completely. These are the six axes we grade on:"
    },
    {
      type: "ul",
      items: [
        "Motion and physics realism — do liquids pour, does fabric hang, does weight read as weight?",
        "Identity fidelity under image-to-video — how far do faces, logos, and labels drift from the reference keyframe over the clip?",
        "Speed and iteration cost — how many candidates can you afford to generate per shot?",
        "Audio — does the model generate usable sound, and does that matter for your format?",
        "Aspect ratios — can you get clean 9:16 vertical, and at what tier?",
        "Rate limits and batch reliability — what happens when you queue 40 generations in one run?"
      ]
    },
    {
      type: "h2",
      id: "veo-3",
      text: "Where does Veo 3 win — and where does it fail?"
    },
    {
      type: "p",
      text: "Veo 3 is the model we reach for when the shot has to obey the physical world. Pouring coffee, steam rising, a hand setting a cup down with believable weight, a jacket moving with a turn — Veo handles this class of motion more consistently than anything else we run. It is also the only model in our rotation with native audio worth keeping: ambient sound, foley, and short dialogue lines come out attached to the clip rather than bolted on later."
    },
    {
      type: "p",
      text: "The failure modes are practical rather than visual. Iteration on Veo is slower and more expensive than on Grok Imagine, which makes it a poor fit for the “generate eight hook variants and grade them” phase of a campaign. Tier restrictions are real too: depending on access level, you can run into aspect-ratio limits and watermarked output, which disqualifies a clip for paid placement no matter how good the motion is. Check what your tier actually delivers before you commit a campaign to it."
    },
    {
      type: "h2",
      id: "grok-imagine",
      text: "Where does Grok Imagine win — and where does it fail?"
    },
    {
      type: "p",
      text: "Grok Imagine is our volume engine. It is the fastest and cheapest of the three to iterate on, and its image model is reference-aware — you can feed it brand product shots and creator identity images and get keyframes that respect them. That combination matters more than it sounds: our whole pipeline is keyframe-first, because rejecting a bad still costs far less than rejecting a bad video. A model that produces strong, on-brand keyframes cheaply feeds every downstream step."
    },
    {
      type: "p",
      text: "Its weaknesses show up at the edges. Image-to-video reference drift is more pronounced on longer clips — the face that matched the keyframe at second one is a cousin of it by second eight. And in batch production, per-account quotas bite: queue a large run and you will meet rate-limit errors mid-batch. Neither is fatal — short clips and a retry queue handle both — but you have to build for them rather than hope."
    },
    {
      type: "h2",
      id: "kling",
      text: "Where does Kling win — and where does it fail?"
    },
    {
      type: "p",
      text: "Kling earns its slot on people. When the shot is a creator talking to camera, reacting, gesturing, laughing — performance shots, the backbone of UGC-style ads — Kling produces the most expressive, least mannequin-like character motion of the three. Hands behave, micro-expressions land, and the energy of a take reads as human rather than interpolated. For the testimonial and review formats we produce constantly, that expressiveness is the difference between a clip that converts and one that sits in the reject pile."
    },
    {
      type: "p",
      text: "Where it loses: iteration is slower than Grok Imagine, so it is not the model we burn through exploratory variants on, and for hard physical interactions with products — pour shots, mechanical close-ups — we still trust Veo 3 more. Like the others, it generates silent video in our workflow, which is fine for music-driven edits and a limitation for dialogue."
    },
    {
      type: "h2",
      id: "identity-drift",
      text: "Why do faces and labels drift in image-to-video?"
    },
    {
      type: "p",
      text: "All three models share one failure mode that matters more in advertising than anywhere else: identity drift. Run image-to-video from a perfect keyframe and watch the face, the logo, or the product label slowly migrate away from the reference over the course of the clip. In a meme this is harmless. In an ad, a warped label is a dead asset."
    },
    {
      type: "p",
      text: "No model is immune, so we stopped treating this as a model-selection problem and started treating it as a workflow problem. The mitigations are the same regardless of provider: keep clips short at 4–8 seconds, re-anchor every shot on a fresh graded keyframe instead of extending one clip, keep the identity-critical subject mid-frame, and avoid fast camera moves on shots where the label has to stay legible. This is half the argument for the keyframe-first workflow — and a big part of why [AI UGC ads cost what they cost](/blog/ai-ugc-ads-cost): you pay for the rejected candidates, not just the keepers."
    },
    {
      type: "callout",
      title: "Field note: the mid-batch quota wall",
      body: "In our pipeline, the most common production failure is not a bad clip — it’s a rate limit landing in the middle of a 40-generation batch at 2 a.m. Provider quotas interrupt large runs often enough that retries and queueing are core infrastructure for us, not nice-to-haves. Running three models is partly a quality decision and partly redundancy: when one provider throttles, the run reroutes and keeps moving instead of stalling the whole campaign."
    },
    {
      type: "h2",
      id: "speed-cost",
      text: "How do speed and iteration cost compare in practice?"
    },
    {
      type: "p",
      text: "A 6-second image-to-video clip renders in roughly 1–5 minutes depending on the model and load. That sounds fast until you multiply it out: a 30–40 second ad is typically 6–12 shots, and our vision-QA loop means generating 2–4 candidates per shot to keep one. A single ad is therefore 12–48 video generations before assembly — and a proper campaign tests several ads. At that volume, the per-generation cost and render-time differences between models stop being rounding errors and start shaping the schedule."
    },
    {
      type: "p",
      text: "This is why “cheapest per clip” and “best looking clip” are both the wrong single metric. Grok Imagine lets us explore wide — many keyframes, many candidates — while Veo 3 and Kling are spent more deliberately on the shots that justify them. Hooks fatigue within days on paid social, so testing volume matters more than single-asset polish; the model mix has to support volume first. The economics rhyme with the [AI vs. traditional production comparison](/blog/ai-video-ads-vs-traditional): spend cheap iterations finding the winner, spend expensive generations polishing it."
    },
    {
      type: "h2",
      id: "audio-aspect",
      text: "What about audio and aspect ratios?"
    },
    {
      type: "p",
      text: "Audio is Veo 3’s clearest structural advantage — it is the only model in our rotation whose native sound we ship. In practice this matters less than you might expect for short-form ads, because most of our edits are music-driven: cuts land on beat onsets and the soundtrack carries the energy, so silent clips from Grok Imagine or Kling cost us nothing. The moment a shot needs spoken dialogue or synced sound effects, though, Veo is the only realistic pick."
    },
    {
      type: "p",
      text: "On aspect ratios, we work 9:16 vertical first because that is where ad inventory lives. All three models can serve vertical, but tier matters: some access levels restrict ratios or watermark the output. A watermarked 16:9 clip is not an ad asset, whatever the demo reel implied — verify your tier outputs clean vertical before building a campaign on it."
    },
    {
      type: "h2",
      id: "how-we-route",
      text: "How we route a shot to a model, step by step"
    },
    {
      type: "ol",
      items: [
        "Write the shot list — typically 6–12 shots for a 30–40 second ad — under a locked Scene Bible: one location, one outfit, a short list of look constants.",
        "Tag each shot by its dominant demand: physics-heavy, performance-heavy, identity-critical, dialogue, or volume-test.",
        "Generate keyframes with a reference-aware image model, feeding brand product shots and creator identity images as references, and grade the stills before animating anything.",
        "Route the animation: physics-heavy and dialogue shots to Veo 3, performance shots to Kling, volume-test and iteration-heavy shots to Grok Imagine.",
        "Animate each keyframe as a 4–8 second image-to-video clip and generate 2–4 candidates per shot.",
        "Machine-grade every clip against a checklist — brand fidelity, identity match, continuity, artifacts — regenerate the weak ones, then assemble the keepers on a beat grid."
      ]
    },
    {
      type: "h2",
      id: "decision-guide",
      text: "Which model for which shot? A quick decision guide"
    },
    {
      type: "h3",
      id: "product-physics-shots",
      text: "Product-in-action and physics shots → Veo 3"
    },
    {
      type: "p",
      text: "Pours, splashes, steam, fabric, hands interacting with the product. When believable physics is the shot, pay Veo’s iteration cost."
    },
    {
      type: "h3",
      id: "creator-performance-shots",
      text: "Creator performance and UGC-style shots → Kling"
    },
    {
      type: "p",
      text: "Talking heads, reactions, testimonial energy. Kling’s expressiveness keeps people looking like people instead of animated stills."
    },
    {
      type: "h3",
      id: "hook-volume-testing",
      text: "Hook variants and volume testing → Grok Imagine"
    },
    {
      type: "p",
      text: "When you need eight versions of the first two seconds by tomorrow, the cheapest fast iterator wins. Grade hard, keep the best, reshoot the winner on a stronger model if the shot deserves it."
    },
    {
      type: "h3",
      id: "dialogue-shots",
      text: "Shots that need sound → Veo 3"
    },
    {
      type: "p",
      text: "Spoken lines and synced effects are a one-model category right now. Everything else gets its audio at the edit."
    },
    {
      type: "h3",
      id: "label-closeups",
      text: "Identity-critical close-ups → workflow over model"
    },
    {
      type: "p",
      text: "Logo and label shots are won by discipline, not provider choice: shortest viable clip, fresh keyframe anchor, subject mid-frame, slow camera. Apply that on whichever model is serving you best that week."
    },
    {
      type: "h2",
      id: "getting-started",
      text: "What we’d do in your place"
    },
    {
      type: "p",
      text: "If you are picking one model to start with, pick based on your dominant shot type: performance-led UGC points to Kling, product-physics demos point to Veo 3, and high-volume hook testing points to Grok Imagine. But plan for the multi-model setup from the start — keyframe-first generation, short clips, a grading pass, and a queue that survives rate limits — because that is the part that actually determines output quality, and it transfers across whichever model ships the next leap."
    },
    {
      type: "p",
      text: "Or skip the infrastructure phase entirely. This routing logic — three models, vision-graded shots, beat-synced assembly — is exactly what runs behind [AI video ads at SHOT.IS](/ai-video-ads): you bring the product and the brief, and the pipeline decides which model animates which shot."
    }
  ],
  faq: [
    {
      question: "Which AI video generator is best for ads in 2026?",
      answer: "No single model wins. In production use, Veo 3 is strongest for physics realism and native audio, Grok Imagine for fast cheap iteration and reference-aware keyframes, and Kling for expressive character motion. Studios shipping ad volume typically route each shot type to the model that suits it."
    },
    {
      question: "Is Kling better than Veo 3 for video ads?",
      answer: "It depends on the shot. Kling produces more expressive character motion, which suits UGC-style creator and testimonial shots. Veo 3 handles physical realism — liquids, fabric, product interactions — more consistently and adds native audio. For a typical multi-shot ad, the strongest results come from using both."
    },
    {
      question: "Why do AI video generators distort faces and product labels?",
      answer: "Image-to-video models drift from their reference over the course of a clip, so faces, logos, and labels slowly mutate. The fix is workflow, not model choice: keep clips to 4–8 seconds, re-anchor each shot on a fresh graded keyframe, keep the subject mid-frame, and avoid fast camera moves."
    },
    {
      question: "How long does it take to generate an AI video ad clip?",
      answer: "A 6-second image-to-video clip typically renders in 1–5 minutes depending on the model and load. A full 30–40 second ad is usually 6–12 shots, and production pipelines generate 2–4 candidates per shot to keep one, so a single finished ad means dozens of generations."
    },
    {
      question: "Do AI video generators produce sound?",
      answer: "Veo 3 generates native audio — ambience, effects, and short dialogue — attached to the clip. Grok Imagine and Kling output silent video in typical ad workflows. For music-driven short-form ads this rarely matters, since soundtracks are added at the edit; for dialogue shots, Veo 3 is the practical choice."
    }
  ]
};
const post$a = {
  slug: "ai-ugc-ads-cost",
  lang: "en",
  translationKey: "ai-ugc-ads-cost",
  title: "How Much Do AI UGC Ads Cost in 2026? Real Pipeline Numbers",
  metaTitle: "AI UGC Ads Cost in 2026: Real Numbers | SHOT.IS",
  description: "What AI UGC ads cost in 2026: real pipeline numbers for generation, QA, music, and assembly — and why marginal cost per variant beats cost per video.",
  excerpt: "The raw model bill is the smallest line item. Here is what an AI UGC ad actually costs once you count rejects, QA, music, and assembly.",
  datePublished: "2026-06-10",
  dateModified: "2026-06-10",
  author: founderAuthor,
  ogImageKey: "blog-ai-ugc-ads-cost",
  tags: ["AI UGC ads", "cost", "pricing", "paid social"],
  tldr: [
    "Human UGC creators typically charge $150–$500+ per video in 2026; agencies charge more once usage rights and management are added.",
    "A real AI pipeline generates 2–4 candidates per shot to keep one, so a 6–12 shot ad means roughly 12–48 clip generations — not 6–12.",
    "Raw model compute is the smallest cost line in AI UGC production; iteration/QA time, music licensing, and assembly are where DIY budgets quietly grow.",
    "Marginal cost per variant — not cost per finished video — is the metric that matters for paid social, because hooks fatigue in days and testing volume wins."
  ],
  blocks: [
    {
      type: "p",
      text: "In 2026, an AI UGC ad costs anywhere from a few dollars in raw model compute — if you run everything yourself and count only the API bill — to low hundreds per finished video through a studio or platform, versus the $150–$500+ that human UGC creators typically charge per video before usage rights. The honest number is always higher than the compute bill, because real production burns 2–4 generation candidates per shot to keep one, plus QA, music licensing, and assembly time. And for paid social, the number that actually matters is not cost per video at all — it is marginal cost per variant, which is where AI is cheaper by an order of magnitude."
    },
    {
      type: "h2",
      id: "cost-drivers",
      text: "What actually drives the cost of an AI UGC ad?"
    },
    {
      type: "p",
      text: "Most pricing conversations start and end with the model subscription, which is a bit like estimating a restaurant’s costs from the price of raw vegetables. We run an AI ad pipeline daily, and the real cost stack has five layers:"
    },
    {
      type: "ul",
      items: [
        "Generation compute — keyframes plus image-to-video clips, multiplied by the reject rate. This is the line everyone sees, and it is rarely the biggest one.",
        "Iteration and QA time — grading candidates, catching identity drift and brand errors, regenerating weak shots. Someone (or some system) has to look at everything.",
        "Music licensing — a track you can legally run in paid placements, plus the time to cut to it.",
        "Editing and assembly — sequencing shots, syncing cuts to the music, burning in text overlays, exporting per-platform formats.",
        "Hook variants — the first 1–2 seconds re-shot several ways per concept, because that is what testing actually consumes."
      ]
    },
    {
      type: "p",
      text: "Skip any of these and the cost does not disappear — it moves. Skip QA and you pay in burned ad spend on a clip where the product label melted mid-shot. Skip music licensing and you pay in takedowns. The budget question is never “how cheap can one video be” but “which layers am I doing myself.”"
    },
    {
      type: "h2",
      id: "generation-cost",
      text: "How much does the generation itself cost?"
    },
    {
      type: "p",
      text: "Start with the anatomy of the asset. A 30–40 second UGC-style ad is typically 6–12 shots in our pipeline, each clip 4–8 seconds — short on purpose, because identity drift (faces, logos, product labels wandering away from the reference) gets worse the longer a clip runs. Each shot starts from a still keyframe generated with reference images of the product and creator, and only approved keyframes get animated via image-to-video. It is much cheaper to reject a bad still than a bad video."
    },
    {
      type: "p",
      text: "Now the multiplier nobody puts on the pricing page: expect to generate 2–4 candidates per shot to keep one. Some shots pass first try; identity-critical ones — hands holding the product, a readable label, a face that has to match the previous shot — routinely take several attempts. So a 6–12 shot ad is realistically 12–48 clip generations, plus a larger pile of keyframe stills behind them. Whatever a single generation costs on your provider, multiply by that range before you believe any per-video estimate."
    },
    {
      type: "p",
      text: "Time is a cost too. A 6-second image-to-video clip renders in roughly 1–5 minutes depending on the model and load. Provider rate limits and quotas interrupt large batches, so retries and queueing are part of any serious setup — a batch of 40 generations is not 40 × 3 minutes of wall-clock time, it is an afternoon with babysitting, unless the pipeline handles requeueing for you."
    },
    {
      type: "h2",
      id: "pipeline-steps",
      text: "Where does the money go, step by step?"
    },
    {
      type: "p",
      text: "Here is the path one ad takes through our pipeline, with the cost character of each step. (The full workflow is broken down in our [AI ad production pipeline](/blog/ai-ad-production-pipeline) post.)"
    },
    {
      type: "ol",
      items: [
        "Brief and Scene Bible — lock one location, one outfit, and a short list of look constants. Cheap in compute, expensive to skip: without it a 6-shot ad reads like four drinks on four different tables.",
        "Keyframe generation — reference-aware stills for every shot, several candidates each. Image generations are cheap relative to video, which is exactly why this step exists.",
        "Keyframe QA — machine-graded against a checklist (brand fidelity, identity match, continuity, artifacts). Rejects are regenerated here, where rejection is cheapest.",
        "Image-to-video — approved keyframes are animated into 4–8 second clips, 2–4 candidates per shot. This is the dominant compute line.",
        "Clip QA — the same grading pass on motion: drift, warped hands, melted logos. Weak clips go back to step 4.",
        "Assembly — clips sequenced on a beat grid so cuts land on music onsets, text overlays burned in, 9:16 vertical export first. Mostly time and tooling, minimal compute.",
        "Hook variants — re-generate just the opening 1–2 seconds in several versions per concept. Marginal cost: a couple of shots, not a whole new ad."
      ]
    },
    {
      type: "callout",
      title: "Field note: the reject pile is the real invoice",
      body: "In our pipeline, the gap between the naive estimate and the real cost is almost entirely the reject pile. A clean brief with a locked Scene Bible keeps us near 2 candidates per shot; a vague brief with a tricky product label pushes shots to 4+ attempts, and the ad quietly costs double. The single best cost lever we know is not a cheaper model — it is better keyframe QA, because every bad still you kill is 2–4 video generations you never pay for."
    },
    {
      type: "h2",
      id: "diy-vs-studio-vs-creators",
      text: "DIY vs. studio vs. human creators: how do the cost structures compare?"
    },
    {
      type: "h3",
      id: "diy-subscriptions",
      text: "DIY with raw model subscriptions"
    },
    {
      type: "p",
      text: "Subscriptions to the underlying video models run from tens to a few hundred dollars a month depending on tier and how many providers you stack — and in practice you do stack them, because models have different strengths (we run Google Veo 3 for physics and native audio, Grok Imagine for fast cheap iteration, Kling for character motion). On paper that makes a finished video look like it costs a few dollars. In practice the compute is the visible tenth of the iceberg: you are now the QA department, the editor, the music supervisor, and the retry queue. If your time is worth anything, a single polished ad assembled by hand from raw generations costs hours, and the per-video math stops looking cheap around the third revision."
    },
    {
      type: "h3",
      id: "studio-platform",
      text: "Studio or platform"
    },
    {
      type: "p",
      text: "A studio or platform charges more per finished video than your raw API bill — that delta is the QA loop, the assembly, the licensing, and the pipeline that turns 40 generations into one coherent ad without you watching a queue. Pricing models vary (per video, per batch, subscription), so compare on what a finished, platform-ready variant costs and what is included: music rights, hook variants, revisions, formats. The fair comparison point is not the model subscription — it is what your own time spent replicating those layers would cost."
    },
    {
      type: "h3",
      id: "human-creators",
      text: "Human UGC creators and agencies"
    },
    {
      type: "p",
      text: "Typical market rates for human UGC run $150–$500+ per video, and that is before usage rights, which often add substantially to the bill for paid placements. Agencies managing creator rosters charge more again. None of that makes human UGC wrong — real faces and genuine reactions still win specific jobs, as we argue in [AI video ads vs. traditional production](/blog/ai-video-ads-vs-traditional). But the structural difference matters: with a human creator, variant two costs nearly as much as variant one. With an AI pipeline, variant two costs a couple of regenerated shots."
    },
    {
      type: "h2",
      id: "marginal-cost-per-variant",
      text: "Why is marginal cost per variant the number that matters?"
    },
    {
      type: "p",
      text: "Paid social is a testing game. Hooks fatigue in days, not months, so the winning operation is the one that can keep feeding the account fresh variants — same body, new opening; same concept, new angle; same ad, new language. That means the economic unit of UGC advertising is not “a video,” it is “a variant,” and the question to ask any production option is: what does variant number five cost me?"
    },
    {
      type: "p",
      text: "For a human creator, variant five is most of a full re-shoot. For an AI pipeline, variant five is a handful of regenerated shots dropped into an existing edit — the Scene Bible, the approved keyframes, the music, and the assembly are already paid for. Hook variants are the extreme case: re-generating just the first 1–2 seconds several ways costs a fraction of one ad but multiplies what you can test, which is why we catalogue them in [UGC hook patterns that survive testing](/blog/ugc-hook-patterns). Per-video cost comparisons hide exactly this asymmetry, and it is the asymmetry that decides who finds winning creative first."
    },
    {
      type: "p",
      text: "This is also the honest defense of AI UGC against the “a human video is only $300” objection. One human video for $300 is fine. Twelve variants for testing is $3,000+ and weeks of coordination — or one pipeline run."
    },
    {
      type: "h2",
      id: "getting-started",
      text: "What we’d do in your place"
    },
    {
      type: "p",
      text: "If you are budgeting AI UGC for the first time, ignore per-video sticker prices and run this exercise instead: decide how many variants per week your testing actually needs, then price the three options — your own time on raw subscriptions, a studio or platform, human creators — at that volume. At one video a month, almost anything works. At ten variants a week, the marginal-cost math takes over and the answer picks itself."
    },
    {
      type: "p",
      text: "Budget for the reject pile (2–4 candidates per kept shot), insist on licensed music, and put your iteration money into hooks rather than polish — a mediocre body with a strong hook outtests the reverse. If you want the full production walkthrough first, start with our [complete guide to AI UGC ads](/blog/ai-ugc-ads-guide). And if you would rather skip building the pipeline and just receive tested variants, that is the service: see what is included in [AI UGC ads at SHOT.IS](/ai-ugc-ads)."
    }
  ],
  faq: [
    {
      question: "How much do AI UGC ads cost compared to human UGC creators?",
      answer: "Human UGC creators typically charge $150–$500+ per video before usage rights, and agencies charge more. AI UGC ads range from a few dollars in raw compute (DIY) to low hundreds per finished video via a studio — with the bigger gap on variants, which cost a fraction of a re-shoot."
    },
    {
      question: "Why does an AI UGC ad cost more than the raw model subscription suggests?",
      answer: "Because production burns 2–4 generation candidates per shot to keep one, so a 6–12 shot ad means 12–48 clip generations. On top of compute, real cost includes QA time to catch drift and brand errors, licensed music, beat-synced assembly, and hook variants for testing."
    },
    {
      question: "What is marginal cost per variant and why does it matter for UGC ads?",
      answer: "Marginal cost per variant is what the next test version costs once the first ad exists. It matters because hooks fatigue in days on paid social, so testing volume drives results. With human creators a new variant is most of a re-shoot; with an AI pipeline it is a few regenerated shots."
    },
    {
      question: "Is DIY AI UGC with model subscriptions cheaper than using a studio?",
      answer: "On compute alone, yes — subscriptions run tens to a few hundred dollars a month. But DIY makes you the QA reviewer, editor, music supervisor, and retry queue, which costs hours per finished ad. At low volume DIY can work; at testing volume, pipeline labor usually outweighs the savings."
    },
    {
      question: "How many generations does one finished AI UGC ad actually take?",
      answer: "A 30–40 second ad is typically 6–12 shots of 4–8 seconds each. With a realistic keep rate of one in 2–4 candidates per shot, that is roughly 12–48 video generations plus a larger set of keyframe stills, since each shot starts from an approved reference-anchored still image."
    }
  ]
};
const post$9 = {
  slug: "ugc-hook-patterns",
  lang: "en",
  translationKey: "ugc-hook-patterns",
  title: "20 UGC Hook Patterns We Actually Test in AI Ads",
  description: "A library of 20 UGC hook examples and ad hook formulas we test in AI ads — grouped by family, with templates, when each works, and how to brief variants.",
  excerpt: "The first two seconds decide whether the rest of your ad exists. Here are the 20 hook patterns we keep coming back to, and how we mass-produce variants with AI.",
  datePublished: "2026-06-10",
  dateModified: "2026-06-10",
  author: founderAuthor,
  ogImageKey: "blog-ugc-hook-patterns",
  tags: ["UGC hooks", "ad scripts", "AI UGC", "creative testing"],
  tldr: [
    "A hook is the first 1–2 seconds of a short-form ad; on paid social it decides most of the watch-through, so it deserves more test variants than any other part of the creative.",
    "Most working UGC hooks fall into five families: problem call-out, pattern interrupt, social proof, curiosity gap, and direct claim or demo.",
    "With an AI pipeline, one validated ad body can be re-hooked cheaply — same 25–35 seconds of body, a new first shot — so a single concept becomes 5–10 testable ads.",
    "Hooks fatigue in days on paid social, not weeks, which is why a library of patterns plus cheap variant production beats polishing one opening shot.",
    "Each hook variant needs its own brief: spoken line, on-screen text, first visual, framing, and emotional register — not just a new sentence pasted over the same footage."
  ],
  blocks: [
    {
      type: "p",
      text: "A hook is the first one to two seconds of a short-form ad — the single shot and line that decide whether a viewer keeps watching or scrolls. After producing AI UGC ads daily, we keep returning to roughly 20 hook patterns across five families: problem call-out, pattern interrupt, social proof, curiosity gap, and direct claim or demo. Below is the full library — each pattern with a one-line template and the situation where it earns its keep — plus the part most articles skip: how to turn one validated ad into many hook variants cheaply, because every hook dies within days anyway."
    },
    {
      type: "h2",
      id: "why-hooks-decide-everything",
      text: "Why does the first 2 seconds matter more than the other 28?"
    },
    {
      type: "p",
      text: "On feed placements, the platform makes a keep-or-skip decision for the viewer almost instantly, and the viewer makes one for themselves right after. If the opening shot doesn’t stop the scroll, nothing downstream — the demo, the offer, the edit — ever gets seen. That’s why we treat the hook as a separate creative unit with its own iteration budget. The body of an ad can survive weeks of rotation; the hook is the part that burns out first and the part where a small change moves results the most."
    },
    {
      type: "p",
      text: "This asymmetry is also what makes AI production a good fit for hooks specifically. In our [keyframe-first pipeline](/blog/ai-ad-production-pipeline), a hook variant is one new keyframe, one new 4–6 second i2v clip, and a re-render of the assembly — not a reshoot. The body stays untouched. Cheap variants change how you write hooks: you stop hunting for the one perfect opener and start testing a spread of patterns."
    },
    {
      type: "h2",
      id: "problem-call-out-hooks",
      text: "Family 1: problem call-out hooks"
    },
    {
      type: "p",
      text: "These hooks name the viewer’s pain before naming the product. They self-select hard: people without the problem scroll past, people with it stop. That filtering is a feature — watch-through and intent both rise even if raw hook rate drops."
    },
    {
      type: "ul",
      items: [
        "Direct pain call-out — “If your [X] still does [annoying thing], watch this.” Works when the pain is common, concrete, and slightly embarrassing to admit.",
        "The “stop doing this” opener — “Stop [common behavior] — it’s why your [X] isn’t working.” Works when the audience already tries to solve the problem the wrong way.",
        "Cost-of-inaction — “Every week you keep [doing X], you’re losing [time/money/result].” Works for B2B-ish and utility products where the waste is quantifiable.",
        "The mirror — actor restates the viewer’s exact inner monologue: “I knew I needed [X], I just kept putting it off.” Works for considered purchases with guilt or procrastination attached."
      ]
    },
    {
      type: "h2",
      id: "pattern-interrupt-hooks",
      text: "Family 2: pattern interrupt hooks"
    },
    {
      type: "p",
      text: "Pattern interrupts win the first half-second visually, before a single word lands. They’re the most placement-dependent family — what interrupts a polished feed looks normal in a chaotic one — and the most prone to clickbait decay if the body doesn’t pay off the weirdness."
    },
    {
      type: "ul",
      items: [
        "Mid-action open — the clip starts in the middle of something already happening (pouring, dropping, unboxing half-done). Works because there’s no “intro” to skip; the brain wants to resolve the action.",
        "The wrong-place product — the product appears somewhere it shouldn’t be (a coffee cup on a gym bench, skincare in a car). Works for visually distinctive products with strong brand color.",
        "Whisper or silence open — the actor leans in and whispers, or there’s a beat of dead silence before the line. Works in sound-on placements where every other ad opens loud.",
        "Visual glitch or freeze — a deliberate freeze-frame, rewind, or jump cut in the first second. Works for younger, edit-literate audiences; reads as broken to older ones."
      ]
    },
    {
      type: "h2",
      id: "social-proof-hooks",
      text: "Family 3: social proof hooks"
    },
    {
      type: "p",
      text: "Social proof hooks borrow trust the brand hasn’t earned yet. The honest rule we hold ourselves to: never fabricate numbers, reviews, or named customers. The pattern works fine with real, verifiable claims — and an AI actor delivering a true claim is still a true claim."
    },
    {
      type: "ul",
      items: [
        "The reluctant convert — “I genuinely didn’t believe this would work.” Works for skeptical categories (supplements, productivity tools) where doubt is the default.",
        "Crowd reference — “Everyone keeps asking me about [X], so here it is.” Works when the product is visible in public — bags, drinks, gadgets, anything strangers comment on.",
        "The recommendation relay — “My [sister/trainer/dentist] told me to try this.” Works because borrowed authority feels less like an ad than a first-person pitch.",
        "Honest-review framing — “Real talk: here’s what’s good and what’s not.” Works mid-funnel and for retargeting, where the viewer has seen the polished version already and wants the catch."
      ]
    },
    {
      type: "h2",
      id: "curiosity-gap-hooks",
      text: "Family 4: curiosity gap hooks"
    },
    {
      type: "p",
      text: "Curiosity hooks open a loop the viewer has to keep watching to close. They tend to post the highest hook rates in our tests and the steepest drop-offs when the payoff lands late — the gap buys you seconds, not the full ad. Put the payoff inside the first 10 seconds or the loop snaps."
    },
    {
      type: "ul",
      items: [
        "The withheld object — “I can’t believe nobody talks about this” while the product stays just out of frame. Works when the reveal itself is visually satisfying.",
        "Before-the-after — open on the “after” state with “this took me 12 days” framing, then rewind. Works for transformation products: skin, fitness, home, organization.",
        "The forbidden angle — “My [industry] friends will hate me for sharing this.” Works for products that undercut an expensive incumbent (salon, agency, gym).",
        "The unfinished sentence — the spoken line cuts off at the most loaded word and the next shot answers it. Works as a pure editing trick; pairs with almost any body."
      ]
    },
    {
      type: "h2",
      id: "direct-claim-demo-hooks",
      text: "Family 5: direct claim and demo hooks"
    },
    {
      type: "p",
      text: "The unfashionable family that quietly performs. No misdirection — just the product, the claim, and proof, immediately. These hooks have the lowest hook rates and often the best cost per action, because everyone who stays past second two is already qualified."
    },
    {
      type: "ul",
      items: [
        "Claim plus countdown — “This removes [problem] in under 30 seconds — watch.” Works when the demo is genuinely fast and visual; never use it when it isn’t.",
        "The side-by-side — split screen of with/without from frame one. Works for anything with a visible delta: cleaning, color, texture, speed.",
        "Price anchor open — “This costs less than your [daily coffee/one gym visit].” Works for impulse price points where the objection is purely “is it worth it”.",
        "The blunt demo — no spoken hook at all: hands, product, action, result, in the first two seconds. Works in sound-off placements and as the control variant every test should include."
      ]
    },
    {
      type: "h2",
      id: "one-body-many-hooks",
      text: "How do you turn one concept into ten hook variants with AI?"
    },
    {
      type: "p",
      text: "Traditional UGC makes hook testing expensive: every variant means re-briefing a creator, waiting for a new take, and hoping the energy matches the original. In an AI pipeline the body of the ad — the demo, the proof, the offer — is a fixed, already-validated asset. Re-hooking it is a small, contained production job, and because we anchor every shot on a graded keyframe, the new hook actually matches the world of the body: same actor identity, same location, same outfit, same light. The mechanics (and costs) of that workflow are covered in our [AI UGC cost breakdown](/blog/ai-ugc-ads-cost); the hook-swap process itself looks like this:"
    },
    {
      type: "ol",
      items: [
        "Pick the validated body: a 25–35 second ad where the middle and end already hold retention — only the opening underperforms or has fatigued.",
        "Choose 3–5 hook patterns from different families above. Same-family variants tell you which line is better; cross-family variants tell you which psychology works, which is the more valuable answer early on.",
        "Write each hook as a full micro-brief (spoken line, on-screen text, first visual, framing — see the template below), not just a new sentence.",
        "Generate keyframes for each hook using the same Scene Bible as the body — one locked location, one outfit, the same palette and lens feel — so the cut into the body is invisible.",
        "Grade the stills and animate only the keepers via image-to-video. Expect 2–4 keyframe candidates per hook to keep one; rejecting a bad still costs cents, rejecting a bad clip costs minutes.",
        "Re-render the assembly per variant on the same beat grid so the first cut still lands on a music onset, then ship all variants into the same ad set and let spend decide."
      ]
    },
    {
      type: "callout",
      title: "Field note: the hook is a different shot, not a different caption",
      body: "In our pipeline, the early mistake was treating hook variants as text swaps — same opening clip, new overlay. Hook rate barely moved. Variants only started separating when each hook got its own first shot: a different visual, a different framing, a different first beat of motion. The viewer’s thumb reacts to the frame before it reacts to the words, so a real hook test changes the frame. Since then, every hook variant in our runs is a fresh keyframe and a fresh 4–6 second clip, and the spread between best and worst variant in a batch became large enough to actually act on."
    },
    {
      type: "h2",
      id: "hook-fatigue",
      text: "How fast do hooks fatigue — and what does that mean for volume?"
    },
    {
      type: "p",
      text: "On paid social, a winning hook fatigues in days, not weeks. The audience that responded to it gets reached, frequency climbs, and the scroll-stop effect of the opening — especially for pattern interrupts and curiosity gaps — decays fastest precisely because it depends on surprise. The body of the ad ages much more slowly; the proof and the offer don’t stop being true."
    },
    {
      type: "p",
      text: "That math is the whole argument for volume. If a hook lives roughly a week and you want an always-on account, you need a continuous supply of fresh openings — which is brutal when each one is a shoot, and routine when each one is a keyframe plus a short i2v clip. This is also why we’d rather ship five honest 7-out-of-10 hooks this week than one polished 9 next month: the polished one dies on the same schedule. For how this fits into a full production cadence, see our [complete AI UGC guide](/blog/ai-ugc-ads-guide)."
    },
    {
      type: "h2",
      id: "hook-variant-brief-template",
      text: "What to specify when briefing a hook variant"
    },
    {
      type: "p",
      text: "A vague brief (“make it punchier”) produces interchangeable variants. Each hook variant we generate is specified down to the frame. Per variant, write down:"
    },
    {
      type: "ol",
      items: [
        "Pattern and family — name the pattern from the library (e.g. “reluctant convert”, social proof family) so the intent is explicit and results can be grouped by family later.",
        "Spoken line — the exact words for seconds 0–2, written for speech, not print. Read it aloud once; if it takes longer than two seconds, cut it.",
        "On-screen text — the burned-in overlay, max 5–7 words, and where it sits so it survives platform UI (avoid the bottom third).",
        "First visual — what is literally in frame at 0:00: actor, product, action already in progress, and the camera framing (close-up, medium, POV).",
        "Emotional register — one word: skeptical, excited, conspiratorial, deadpan. This drives the actor’s expression in the keyframe and the motion prompt in i2v.",
        "Continuity constants — which Scene Bible elements must carry over from the body (location, outfit, palette) so the cut from hook to body doesn’t read as two different ads.",
        "The cut point — the exact frame of the body this hook lands into, so the editor (or the assembly script) doesn’t guess."
      ]
    },
    {
      type: "h2",
      id: "getting-started",
      text: "What we’d do in your place"
    },
    {
      type: "p",
      text: "Don’t start by testing all 20 patterns. Take your best existing ad — or one validated concept — and build a first batch of five hooks, one from each family: one problem call-out, one pattern interrupt, one social proof, one curiosity gap, one blunt demo as the control. Run them in one ad set for a few days, note which family wins, then spend the next batch exploring inside that family. Two cycles of this usually tells you more about your audience than a quarter of single-ad testing."
    },
    {
      type: "p",
      text: "If you’d rather not build the pipeline yourself, this loop — validated body, fresh hooks weekly, machine-graded keyframes, beat-synced assembly — is exactly what we run for clients as [AI UGC ads at SHOT.IS](/ai-ugc-ads). Bring one concept; leave with a hook library that refreshes itself."
    }
  ],
  faq: [
    {
      question: "What is a hook in a UGC ad?",
      answer: "A hook is the first one to two seconds of a short-form ad — the opening shot and line that decide whether the viewer keeps watching or scrolls. On paid social placements the hook drives most of the watch-through, so it deserves more test variants than any other part of the creative."
    },
    {
      question: "How many hook variants should I test per concept?",
      answer: "Start with five hook variants per validated concept — one from each family: problem call-out, pattern interrupt, social proof, curiosity gap, and direct demo. The first round tells you which psychology fits your audience; later rounds explore line and visual variations inside the winning family."
    },
    {
      question: "How quickly do ad hooks fatigue on paid social?",
      answer: "Winning hooks typically fatigue within days, not weeks, because their scroll-stopping effect depends on surprise and the responsive audience gets reached fast. The ad body ages slower. That is why a continuous supply of fresh hook variants matters more than polishing one perfect opening shot."
    },
    {
      question: "Can AI generate hook variants without reshooting the whole ad?",
      answer: "Yes. In a keyframe-first AI pipeline, a hook variant is one new graded keyframe animated into a 4–6 second image-to-video clip, cut onto the existing validated body. The actor identity, location, and outfit stay locked via a Scene Bible, so the new opening matches the rest of the ad."
    },
    {
      question: "What should a brief for a single hook variant include?",
      answer: "Seven things: the pattern and family, the exact spoken line for seconds 0–2, the on-screen text and its placement, the first visual and framing, the emotional register in one word, the continuity constants carried from the body, and the exact cut point where the hook lands into the body."
    }
  ]
};
const post$8 = {
  slug: "veo-3-for-ad-creative",
  lang: "en",
  translationKey: "veo-3-for-ad-creative",
  title: "Google Veo 3 for Ad Creative: Production Lessons from Daily Use",
  metaTitle: "Veo 3 for Ad Creative: Production Lessons | SHOT.IS",
  description: "What Veo 3 ads get right — motion realism, native audio — and where it bites in production: aspect ratios, watermarks, quotas. Field notes from daily use.",
  excerpt: "Veo 3 is the strongest motion-and-physics model we run — and the one with the most production gotchas. What a daily pipeline taught us.",
  datePublished: "2026-06-15",
  dateModified: "2026-06-15",
  author: founderAuthor,
  ogImageKey: "blog-veo-3-for-ad-creative",
  tags: ["Veo 3", "AI video ads", "production", "prompting"],
  tldr: [
    "Veo 3 leads the AI video models we run in production on motion and physics realism, and it generates native audio — ambience, foley, and speech — in the same pass as the video.",
    "The main production friction with Veo 3 is operational: aspect-ratio constraints on some tiers, watermarked output on lower tiers, and quota or rate limits that interrupt large batches.",
    "The workflow that gets consistent Veo 3 ad results is keyframe-first: generate and grade a still image for each shot, then animate it with image-to-video in short 4–8 second clips.",
    "Identity drift is real in image-to-video: faces, logos, and product labels wander from the reference over a clip, so re-anchor every shot on a fresh graded keyframe.",
    "A reliable Veo 3 ad prompt names five things explicitly: subject, action, camera, lighting, and an audio cue — vague prompts produce confident-looking but unusable variance."
  ],
  blocks: [
    {
      type: "p",
      text: "Veo 3 is the model we reach for when an ad shot has to move like the real world: liquids pouring, fabric swinging, a hand picking up a product without the fingers melting. It is also the only model in our rotation that generates usable native audio in the same pass. The trade is operational — aspect-ratio limits on some tiers, watermarks on lower ones, quotas that bite mid-batch — so getting consistent ad output is less about the model and more about the workflow wrapped around it."
    },
    {
      type: "h2",
      id: "what-is-veo-3-good-at",
      text: "What is Veo 3 actually good at for ad work?"
    },
    {
      type: "p",
      text: "We run several video models in production daily — Veo 3, Grok Imagine, and Kling — and each earns its slot for a different reason. Veo 3 earns its slot three ways."
    },
    {
      type: "h3",
      id: "motion-and-physics",
      text: "Motion and physics realism"
    },
    {
      type: "p",
      text: "Physics is where AI video usually betrays itself: coffee that pours like syrup, hair that ignores momentum, objects that pass through hands. Veo 3 fails these tests less often than anything else we run. For ad creative this matters more than it sounds, because product shots are disproportionately physics shots — pours, sprays, unboxings, bites, hand-to-product contact. When the brief calls for a believable product interaction, Veo 3 is our default."
    },
    {
      type: "h3",
      id: "native-audio",
      text: "Native audio in the same generation"
    },
    {
      type: "p",
      text: "Veo 3 generates audio with the video — ambience, foley, even short lines of speech. For UGC-style ads this changes the math: a clip that arrives with a believable room tone and a fizz on the pour needs far less post work than a silent clip you have to foley by hand. We still cut most ads to a music track on a beat grid, but native ambience layered under the music adds a texture that silent generations simply do not have."
    },
    {
      type: "h3",
      id: "scene-coherence",
      text: "Scene coherence within a clip"
    },
    {
      type: "p",
      text: "Within a single clip, Veo 3 holds a scene together well — lighting direction stays put, backgrounds do not quietly rearrange themselves, and secondary objects persist instead of flickering in and out. That does not solve coherence across shots (more on that below), but it means fewer clips are rejected for the eerie mid-clip morphing that plagued earlier model generations."
    },
    {
      type: "h2",
      id: "where-veo-3-bites",
      text: "Where does Veo 3 bite in production?"
    },
    {
      type: "p",
      text: "None of the following are dealbreakers. All of them will surprise you mid-campaign if nobody warned you."
    },
    {
      type: "ul",
      items: [
        "Aspect-ratio constraints. Depending on the tier and access path, you may not get native 9:16 vertical — some routes are 16:9-first. For paid social, where vertical is the default placement, that means either cropping (and losing composition) or planning your framing for a center-safe crop from the start.",
        "Watermarking on lower tiers. Lower-tier output carries a visible watermark. Fine for internal previews and concept tests; not shippable as paid creative. Budget for the tier that produces clean output, or treat watermarked passes strictly as drafts.",
        "Quota and rate limits in batches. An ad campaign is a batch workload — 6–12 shots per ad, 2–4 candidates per shot, several ad variants. That is dozens of generations, and provider quotas will interrupt the run partway. Retries and queueing are not an edge case in our pipeline; they are a load-bearing component.",
        "Prompt sensitivity. Veo 3 rewards specific prompts and punishes vague ones — not with errors, but with confident, polished clips of the wrong thing. Two prompts a human would read as equivalent can produce visibly different camera behavior and pacing."
      ]
    },
    {
      type: "callout",
      title: "Field note: the batch that died at shot nine",
      body: "In our pipeline the first serious Veo 3 campaign run taught us the quota lesson the hard way: a multi-shot batch hit a rate limit partway through, and the naive script just stopped. The fix was structural, not heroic — every generation request now goes through a queue with retry and backoff, and a batch is considered done only when every shot has a graded candidate, not when the loop finishes. Since then, quota interruptions cost us minutes, not an afternoon of re-checking what rendered."
    },
    {
      type: "h2",
      id: "consistent-results-workflow",
      text: "How do you get consistent ad results from Veo 3?"
    },
    {
      type: "p",
      text: "The single biggest lever is not prompting harder — it is refusing to ask the video model to do two jobs at once. Text-to-video asks one generation to nail composition, identity, and motion simultaneously. We split that: stills first, motion second. The full version of this is written up in our [keyframe-to-video workflow](/blog/keyframe-to-video-workflow) guide; here is the shape of it as it applies to Veo 3."
    },
    {
      type: "ol",
      items: [
        "Lock a Scene Bible before generating anything: one location, one outfit, and a short list of look constants — palette, lens feel, lighting direction. Without this, a six-shot ad reads like “4 drinks on 4 different tables”: technically fine shots that never form one world.",
        "Generate still keyframes for every shot using a reference-aware image model, feeding brand product shots and creator identity images as references. Stills are cheap and fast to judge.",
        "Grade the keyframes against a checklist — brand fidelity, identity match, continuity with the Scene Bible, artifacts — and regenerate the weak ones. Expect to make 2–4 candidates per shot to keep one. It is far cheaper to reject a bad still than a bad video.",
        "Animate each approved keyframe with Veo 3 image-to-video, keeping clips short — 4–8 seconds. A 6-second clip typically renders in about 1–5 minutes depending on load.",
        "Re-anchor identity on every shot: each new shot starts from a fresh graded keyframe, never from a frame of the previous video. Identity drift compounds; re-anchoring resets it to zero at every cut.",
        "Run the finished clips through the same machine-graded QA pass as the stills, then assemble on a beat grid so cuts land on music onsets."
      ]
    },
    {
      type: "h3",
      id: "why-short-clips",
      text: "Why short clips and re-anchoring matter"
    },
    {
      type: "p",
      text: "Image-to-video identity drift is real on every model we run, Veo 3 included: over the course of a clip, faces soften toward generic, logos smear, and product label text degrades. The drift is roughly proportional to clip length and camera aggression. Our standing mitigations: keep clips in the 4–8 second range, keep the subject mid-frame, avoid fast camera moves on identity-critical shots, and re-anchor every shot on a fresh keyframe. A 30–40 second ad built as 6–12 short re-anchored shots holds identity dramatically better than two long takes — and short shots happen to be what beat-synced vertical editing wants anyway."
    },
    {
      type: "h2",
      id: "prompting-veo-3-for-ads",
      text: "How should you prompt Veo 3 for ad shots?"
    },
    {
      type: "p",
      text: "Veo 3 prompt sensitivity stops being a problem the moment you stop writing prose and start filling in a structure. Every shot prompt we send names five things explicitly:"
    },
    {
      type: "ul",
      items: [
        "Subject — who or what, with the identifying details that must survive: “a woman in a mustard-yellow coat holding a matte black water bottle, label facing camera”.",
        "Action — one verb phrase, one beat: “she unscrews the cap and takes a sip”. One action per clip; if the storyboard needs two beats, that is two shots.",
        "Camera — name the move and the framing: “slow push-in from medium to close-up, eye level, shallow depth of field”. Unspecified camera is where Veo 3 freelances the most.",
        "Lighting — direction and quality, matched to your Scene Bible: “soft window light from the left, warm late-afternoon tone”.",
        "Audio cue — because Veo 3 generates sound, direct it: “quiet café ambience, the click of the cap, no music”. If you skip this, you get arbitrary ambience you may have to bury in the mix."
      ]
    },
    {
      type: "p",
      text: "Two habits compound the structure. First, keep negative space in the brief: say what should not happen (“no camera shake, no other people entering frame”) because the model fills silence with invention. Second, when a prompt works, change one field at a time on the next shot. Treating prompts as structured records rather than prose makes results reproducible enough to debug — which is the entire difference between generating clips and running a pipeline. How this slots into the larger system — briefs, QA gates, assembly — is covered in our [AI ad production pipeline](/blog/ai-ad-production-pipeline) write-up."
    },
    {
      type: "h2",
      id: "veo-3-vs-other-models",
      text: "When do we pick Veo 3 over Grok Imagine or Kling?"
    },
    {
      type: "p",
      text: "Model choice is per-shot, not per-campaign. Veo 3 gets the physics-critical and audio-relevant shots: product interactions, pours, anything where a wrong-looking motion would read as fake. Grok Imagine gets the iteration-heavy work — it is the fastest and cheapest to cycle, and its reference-aware image generation pairs naturally with the keyframe-first approach. Kling gets shots that lean on character motion and expressiveness — gesture, dance, reaction beats. A typical 30–40 second ad in our pipeline mixes models across its 6–12 shots, and because every shot starts from a graded keyframe in the same Scene Bible, the seams do not show. The full comparison lives in our guide to the [best AI video generator for ads](/blog/best-ai-video-generator-for-ads)."
    },
    {
      type: "h2",
      id: "getting-started",
      text: "What we’d do in your place"
    },
    {
      type: "p",
      text: "If you are evaluating Veo 3 for ad creative, do not start by generating videos. Start by locking a Scene Bible for one product, generating and grading a set of still keyframes, and only then animating the survivors as short clips — first on whatever tier you have, accepting watermarks as the cost of a draft, then on a clean tier for the shots that earn it. Plan for quota interruptions from day one, and keep prompts structured: subject, action, camera, lighting, audio cue. That sequence surfaces every production problem on cheap stills instead of expensive video."
    },
    {
      type: "p",
      text: "And if you would rather skip the months of accumulated workarounds — the QA loops, the re-anchoring discipline, the retry queues — that is the pipeline we already run daily for [AI video ads at SHOT.IS](/ai-video-ads): keyframe-first, multi-model, machine-graded, and assembled to the beat."
    }
  ],
  faq: [
    {
      question: "Is Veo 3 good for making ads?",
      answer: "Yes, with caveats. Veo 3 leads the models we run in production on motion and physics realism and generates native audio, which suits product-interaction shots in ads. The friction is operational: aspect-ratio constraints on some tiers, watermarks on lower tiers, and quotas that interrupt batch generation."
    },
    {
      question: "Does Veo 3 generate audio with the video?",
      answer: "Yes. Veo 3 generates ambience, foley, and short speech in the same pass as the video, which reduces post-production for UGC-style ad clips. In an ad workflow it pays to direct the audio explicitly in the prompt — for example “quiet café ambience, no music” — or you get arbitrary sound."
    },
    {
      question: "How long should Veo 3 clips be for ad creative?",
      answer: "Keep clips short — 4 to 8 seconds. Image-to-video identity drift grows with clip length, so faces, logos, and label text degrade in longer takes. A 30–40 second ad built from 6–12 short clips, each re-anchored on a fresh keyframe, holds identity far better than a few long generations."
    },
    {
      question: "Why use keyframes instead of prompting Veo 3 directly with text?",
      answer: "Text-to-video asks one generation to nail composition, identity, and motion at once. Generating a still keyframe first lets you grade and reject cheaply — expect 2–4 candidates per shot — and then Veo 3 image-to-video only has to handle motion. Bad stills cost far less than bad videos."
    },
    {
      question: "What should a Veo 3 ad prompt include?",
      answer: "Name five things explicitly: subject (with identity details that must survive), one action beat, camera move and framing, lighting direction and quality, and an audio cue. Vague prompts do not fail loudly — they return polished clips of the wrong thing, which is harder to catch in a batch."
    }
  ]
};
const post$7 = {
  slug: "keyframe-to-video-workflow",
  lang: "en",
  translationKey: "keyframe-to-video-workflow",
  title: "The Keyframe-to-Video Workflow: Consistent AI Shots with i2v",
  metaTitle: "Keyframe-to-Video: Consistent AI Shots with i2v | SHOT.IS",
  description: "An image to video AI workflow that holds up in production: generate still keyframes with reference-aware models, QA them, then animate with i2v.",
  excerpt: "Text-to-video from a prompt is a lottery for brand work. Generating a keyframe first — then animating it — is how you get control back.",
  datePublished: "2026-06-15",
  dateModified: "2026-06-15",
  author: founderAuthor,
  ogImageKey: "blog-keyframe-to-video-workflow",
  tags: ["keyframe to video", "i2v", "image to video", "AI workflow", "consistency"],
  tldr: [
    "Keyframe-to-video means generating a still image first with a reference-aware image model, approving it, then animating it with an image-to-video (i2v) model.",
    "Rejecting a bad still costs seconds and cents; rejecting a bad video costs minutes and multiples of that — so the QA gate belongs between keyframe and video.",
    "i2v identity drift is real: faces, logos, and product labels wander from the reference over a clip, which is why production clips stay in the 4–8 second range.",
    "For multi-shot ads, each shot is re-anchored on a fresh keyframe (or the last frame of the previous clip) so identity resets instead of compounding drift.",
    "Expect to generate 2–4 keyframe candidates per shot to keep one; that ratio is normal, not a sign the workflow is failing."
  ],
  blocks: [
    {
      type: "p",
      text: "The keyframe-to-video workflow is simple to state: instead of asking a video model to invent a shot from a text prompt, you first generate a still keyframe with a reference-aware image model — your product shots and creator identity images attached as references — approve that still, and only then animate it with an image-to-video (i2v) model. The still becomes a contract: composition, identity, props, and framing are locked before a single second of video is rendered. For brand work, this is the difference between gambling and directing."
    },
    {
      type: "h2",
      id: "why-t2v-is-a-lottery",
      text: "Why is text-to-video a lottery for brand work?"
    },
    {
      type: "p",
      text: "Text-to-video is genuinely impressive for open-ended creative shots. But an ad is not open-ended. It needs a specific product with a specific label, a creator whose face matches the last shot, a composition that leaves room for a text overlay. A text prompt under-specifies all of that, so the model fills the gaps with its own ideas — a different bottle shape, a logo that almost reads correctly, a face that belongs to nobody in particular."
    },
    {
      type: "p",
      text: "The cost structure makes it worse. A video generation takes anywhere from one to five minutes depending on model and load, and you can’t evaluate it until it finishes. When the failure rate per attempt is high and each attempt is slow and expensive, iteration grinds. You end up re-rolling whole videos to fix problems that were visible in the first frame."
    },
    {
      type: "p",
      text: "Keyframe-first inverts the economics. Stills render in seconds, cost a fraction of a video, and expose almost every brand-critical failure — wrong label, wrong face, wrong framing — before you commit to motion. Cheap rejection is the core idea: kill bad shots while they’re still cheap to kill."
    },
    {
      type: "h2",
      id: "what-keyframe-first-buys-you",
      text: "What does generating the keyframe first actually buy you?"
    },
    {
      type: "ul",
      items: [
        "Cheap rejection: a bad still is discarded in seconds for cents; a bad video wastes minutes and a meaningfully larger generation cost.",
        "Identity anchoring per shot: reference-aware image models accept your product photos and creator images directly, so each keyframe starts from the right face and the right label instead of an approximation.",
        "Deliberate composition: you choose where the product sits, where the eyeline goes, and where overlay text will land — at the still stage, where changing it is trivial.",
        "A reviewable artifact: a grid of keyframes is something a human or a vision model can grade in one pass; a folder of half-wrong videos is not."
      ]
    },
    {
      type: "h2",
      id: "step-by-step",
      text: "The keyframe-to-video workflow, step by step"
    },
    {
      type: "p",
      text: "This is the process our studio runs daily, in the same order we run it. It sits inside a larger pipeline — brief, shot plan, assembly — covered in our [AI ad production pipeline](/blog/ai-ad-production-pipeline) post, but these are the steps from shot plan to usable clip."
    },
    {
      type: "ol",
      items: [
        "Lock the references. Collect clean product shots (label readable, neutral background) and creator identity images. These get attached to every keyframe generation, not pasted into the prompt as a description.",
        "Lock the look constants. One location, one outfit, a short palette-and-lighting note shared across all shots — so six shots read as one world, not six worlds.",
        "Generate keyframe candidates. For each shot in the plan, generate 2–4 stills with a reference-aware image model, references attached, composition described per shot.",
        "Grade the stills. Check brand fidelity (label, colors, product geometry), identity match against the creator references, continuity with neighboring shots, and artifacts. Reject and regenerate until one candidate passes. This is the QA gate — nothing animates without passing it.",
        "Animate with i2v. Feed the approved keyframe to an image-to-video model with a motion prompt that describes what moves — and, just as important, what stays still. Keep clips in the 4–8 second range.",
        "Grade the clips. Identity and label fidelity are re-checked across the clip’s duration, not just the first frame, because drift accumulates over time. Weak clips get regenerated from the same approved keyframe.",
        "Anchor the next shot. Start shot N+1 from a fresh keyframe generated against the same references, or from the last frame of clip N when you need direct visual continuity."
      ]
    },
    {
      type: "callout",
      title: "Field note: the 2–4× rule",
      body: "In our pipeline, roughly 2–4 keyframe candidates are generated for every still that survives grading, and a similar ratio holds for the i2v step on identity-critical shots. Early on we treated that as waste to engineer away. It isn’t — it’s the budget. The workflow works because rejection is cheap at the still stage, so pricing in 2–4 attempts per shot up front is what keeps the expensive video stage mostly first-take."
    },
    {
      type: "h2",
      id: "qa-gate",
      text: "How does the QA gate between keyframe and video work?"
    },
    {
      type: "p",
      text: "The gate is a checklist, applied to every still before it earns an i2v render. Ours is machine-graded — a vision model scores each candidate against the checklist and the references — but the checklist works manually too:"
    },
    {
      type: "ul",
      items: [
        "Brand fidelity: is the label legible and correct? Are product proportions and colors right? Logos are where image models lie most confidently.",
        "Identity match: does the face actually match the creator reference, or just the general demographic? Compare side by side; squint tests fail here.",
        "Continuity: same outfit, same location, same lighting direction as the adjacent shots in the plan.",
        "Composition for purpose: subject placed mid-frame if the shot is identity-critical, headroom or negative space reserved if an overlay is planned.",
        "Artifacts: extra fingers, melted text, impossible reflections — anything that reads as obviously synthetic at feed scroll speed."
      ]
    },
    {
      type: "p",
      text: "The discipline that matters most: the gate is binary. A still that “mostly” passes does not get animated on the theory that motion will hide the flaw. Motion amplifies flaws — a slightly-off label in a still becomes a visibly morphing label in a clip."
    },
    {
      type: "h2",
      id: "failure-modes",
      text: "Why do i2v clips drift away from the keyframe?"
    },
    {
      type: "p",
      text: "i2v models are conditioned on your keyframe at frame zero, but every subsequent frame is generated from model priors plus the frames before it. The further the clip runs from the anchor, the more the model’s own ideas leak in. Three failure modes account for most of our rejected clips:"
    },
    {
      type: "h3",
      id: "identity-drift",
      text: "Identity drift over clip duration"
    },
    {
      type: "p",
      text: "Faces, logos, and printed labels gradually wander from the reference as the clip plays. Frame one matches the keyframe; second six is a cousin of it. Mitigations: keep clips short (4–8 seconds), keep the identity-critical subject mid-frame where the model spends its capacity, and avoid fast camera moves on shots where the face or label must hold. If a shot needs a whip pan, make it a shot where identity doesn’t matter."
    },
    {
      type: "h3",
      id: "motion-overshoot",
      text: "Motion overshoot"
    },
    {
      type: "p",
      text: "You ask for “she lifts the cup slightly” and get a toast, a head turn, and a camera orbit. i2v models tend to maximize motion unless told otherwise. The fix is in the motion prompt: state explicitly what stays still (“camera locked, background static”), describe one motion per clip, and scale adjectives down — models read “slowly” as normal speed and “slightly” as a full gesture."
    },
    {
      type: "h3",
      id: "prop-morphing",
      text: "Props morphing"
    },
    {
      type: "p",
      text: "Hands passing in front of a product, a cup being set down, a bag being opened — interaction moments are where props change shape, labels rewrite themselves, and objects merge. Mitigations: minimize occlusion of the product in the keyframe composition, keep hand–product contact brief, and when an interaction is essential, generate extra candidates for that shot specifically. Some models hold props better than others; we run several in production and route shots accordingly — our [comparison of AI video generators for ads](/blog/best-ai-video-generator-for-ads) covers which model wins which shot type."
    },
    {
      type: "h2",
      id: "multi-shot-chaining",
      text: "How do you chain shots without compounding drift?"
    },
    {
      type: "p",
      text: "A 30–40 second ad is typically 6–12 shots. The naive approach — extend one generation, or feed each clip’s output into the next — compounds drift: shot three is anchored on shot two’s already-drifted final frame, and by shot six the creator is a stranger. Two anchoring strategies fix this:"
    },
    {
      type: "ul",
      items: [
        "Fresh-keyframe anchoring (our default): every shot starts from a newly generated keyframe, built against the original product and creator references plus the shared look constants. Drift resets to zero at every cut. Cuts hide the seams; this is how most real ads are edited anyway.",
        "Last-frame anchoring (the exception): shot N+1 is animated from the final frame of clip N. Use it only when two shots must connect continuously — a match cut, a continued gesture. Accept that you’re inheriting whatever drift clip N accumulated, so grade that last frame as strictly as a fresh keyframe before animating from it."
      ]
    },
    {
      type: "p",
      text: "In practice we mix them: fresh keyframes for nearly every cut, last-frame anchoring for the one or two transitions per ad that need continuous motion. Because every fresh keyframe is generated against the same references and look constants, the shots still read as one continuous world — that consistency comes from the references, not from chaining the video frames."
    },
    {
      type: "p",
      text: "Model choice interacts with chaining too. Models with strong physics and native audio are worth spending on hero shots — see our notes on [Veo 3 for ad creative](/blog/veo-3-for-ad-creative) — while faster, cheaper models handle the high-volume keyframe iteration and B-roll shots where you’re burning most of your 2–4 candidates."
    },
    {
      type: "h2",
      id: "getting-started",
      text: "What we’d do in your place"
    },
    {
      type: "p",
      text: "If you’re starting from zero, don’t start by generating videos. Start by generating stills. Take your three best product photos and two clean images of your creator (or spokesperson, or mascot), and spend a session generating keyframes only: one location, one outfit, six compositions from a simple shot list. Grade them hard against the checklist above. Only when you have six stills you’d actually approve as photographs should you animate anything — and when you do, animate with short clips, one motion each, camera locked."
    },
    {
      type: "p",
      text: "That single discipline — never animate an unapproved still — carries most of the value of this workflow. The rest is volume and routing: more candidates per shot, the right model per shot type, a QA pass on every output. That’s the part that stops scaling gracefully by hand, and it’s the part our studio automates end to end, from references to a beat-cut vertical ad. If you’d rather skip building the pipeline and just get the output, that’s what [AI video ads at SHOT.IS](/ai-video-ads) are: the keyframe-to-video workflow, run for you, with the QA gates already in place."
    }
  ],
  faq: [
    {
      question: "What is the keyframe-to-video workflow?",
      answer: "It’s an AI video production method where you first generate a still keyframe with a reference-aware image model — product and creator reference images attached — approve that still against a QA checklist, and only then animate it with an image-to-video (i2v) model. The still locks composition and identity before any video is rendered."
    },
    {
      question: "Why use image-to-video instead of text-to-video for ads?",
      answer: "Text-to-video under-specifies brand-critical details — labels, faces, framing — so each attempt is a slow, expensive gamble. With image-to-video, those details are locked in an approved still first. Rejecting a bad still takes seconds and costs cents; rejecting a bad video takes minutes and costs several times more."
    },
    {
      question: "How do you stop AI video identity drift?",
      answer: "Identity drift — faces, logos, and labels wandering from the reference during a clip — is mitigated by keeping clips short (4–8 seconds), re-anchoring every shot on a fresh keyframe generated from the original references, keeping the subject mid-frame, and avoiding fast camera moves on identity-critical shots."
    },
    {
      question: "How many keyframes should I generate per shot?",
      answer: "Plan for 2–4 candidates per shot to keep one — that rejection rate is normal in production, not a failure of the workflow. Generating and discarding stills is cheap; the whole point of keyframe-first is concentrating iteration at the still stage so the expensive i2v stage is mostly first-take."
    },
    {
      question: "How do you keep a multi-shot AI ad consistent?",
      answer: "Anchor every shot on a fresh keyframe generated against the same product and creator references, with one locked location, outfit, and lighting style shared across shots. Reserve last-frame anchoring — animating shot N+1 from clip N’s final frame — for the rare transitions that need continuous motion."
    }
  ]
};
const post$6 = {
  slug: "beat-synced-video-ads",
  lang: "en",
  translationKey: "beat-synced-video-ads",
  title: "Beat-Synced AI Video Ads: Cutting Generated Footage to Music",
  metaTitle: "Beat-Synced AI Video Ads: Cut to Music | SHOT.IS",
  description: "How beat-synced video ads are built: onset detection, beat grids, energy mapping, and cutting AI-generated clips to music so the edit feels intentional.",
  excerpt: "A cut that lands on a beat reads as a decision. A cut that lands nowhere reads as a render. How we build the beat grid that makes AI footage feel edited on purpose.",
  datePublished: "2026-06-15",
  dateModified: "2026-06-15",
  author: founderAuthor,
  ogImageKey: "blog-beat-synced-video-ads",
  tags: ["beat sync", "video editing", "AI video ads", "music", "short-form"],
  tldr: [
    "Beat-synced video ads place every cut on a music onset, which makes AI-generated footage read as an intentional edit instead of a sequence of renders.",
    "A beat grid is built in three steps: detect onsets in the track, select cut points from those onsets, then slot clips into the resulting time windows.",
    "Generated clips should run roughly 1–2 seconds longer than their slot, because AI video often degrades near the end and trimming needs headroom.",
    "Energy mapping assigns shot types to track sections: calm establishing shots on verses, product hero shots on drops, text overlays landing on beats.",
    "A 35–40 second track typically yields 8–12 cut slots, which sets the shot count for the ad before any footage is generated."
  ],
  blocks: [
    {
      type: "p",
      text: "Beat-synced video ads are edits where every cut lands on a musical onset — a drum hit, a bass note, a vocal stab — instead of wherever a clip happens to end. For AI-generated footage this matters more than for filmed footage: a cut on the beat reads as a deliberate editorial decision, while a cut that lands nowhere reads as “the render stopped here”. The mechanism is a beat grid: detect onsets in the track, choose cut points from them, and slot generated clips into the windows between cuts."
    },
    {
      type: "h2",
      id: "why-beat-sync",
      text: "Why do beat-synced cuts make AI footage feel intentional?"
    },
    {
      type: "p",
      text: "Viewers on short-form platforms have absorbed a grammar of editing without ever naming it. Cuts that land on beats are part of that grammar — trend edits, fan cams, and sneaker ads all use them — so an ad cut to the beat slots into the feed as native content. An ad cut on arbitrary timestamps stands out the wrong way: nothing is visibly wrong with any single frame, but the rhythm is off, and rhythm is the thing people feel before they think."
    },
    {
      type: "p",
      text: "AI footage benefits disproportionately from this. A generated clip carries small tells — slightly synthetic motion, a texture that swims, a hand that almost works. When the edit has no rhythm, the eye lingers on each clip long enough to find those tells. When the edit moves on a beat grid, attention rides the music instead. The cut arrives before scrutiny does. This is not a trick to hide bad footage; it is the same reason music-video editors have cut to the beat for forty years. It just happens to be the cheapest single upgrade you can give generated material."
    },
    {
      type: "p",
      text: "There is a second, less obvious benefit: the beat grid turns editing into a planning problem you can solve before generating anything. Instead of generating footage and then hunting for an edit inside it, you derive the edit from the track first and generate exactly the clips the edit needs. That ordering — structure first, footage second — is the same logic as the keyframe-first approach we described in [our keyframe-to-video workflow](/blog/keyframe-to-video-workflow): commit to the cheap, controllable artifact before paying for the expensive one."
    },
    {
      type: "h2",
      id: "how-a-beat-grid-works",
      text: "How does a beat grid work?"
    },
    {
      type: "p",
      text: "A beat grid is a list of timestamps where cuts are allowed to happen, derived from the music itself. Building one is a three-stage process, and each stage is a filter: the track has hundreds of onsets, the grid keeps a few dozen candidates, and the final edit uses 8–12 of them."
    },
    {
      type: "ol",
      items: [
        "Onset detection. Run the track through an onset detector — software that finds moments where audio energy jumps sharply, which is where drum hits, bass notes, and vocal entrances live. A 35-second track typically produces anywhere from 60 to 150 raw onsets depending on how busy the percussion is.",
        "Cut-point selection. Filter the raw onsets down to usable cut points. We enforce a minimum slot length (rarely under 1.5 seconds — shorter and the viewer registers flicker, not footage) and a maximum (rarely over 6 seconds for a hype edit — longer and momentum dies). We also weight onsets by strength, so cuts prefer the kick and the snare over a hi-hat tick.",
        "Clip slotting. Each window between two consecutive cut points becomes a slot with a fixed duration, and each slot gets assigned a shot from the shot plan. At render time, every clip is trimmed to exactly its slot length, so the cut lands on the onset to the frame."
      ]
    },
    {
      type: "p",
      text: "The output is boring on purpose: a list like “0.00–2.31s: shot 1, 2.31–4.87s: shot 2, …”. Once that list exists, assembly is deterministic — our renderer trims, concatenates, and burns overlays without any creative judgment at render time. All the judgment happened upstream, in selection and slotting, where iterating costs nothing."
    },
    {
      type: "h2",
      id: "why-generate-longer",
      text: "Why generate clips longer than their slot?"
    },
    {
      type: "p",
      text: "Every clip we generate runs longer than the slot it is destined for — usually by 1–2 seconds. If a slot is 2.3 seconds, we generate a 4-second clip; if a slot is 4.9 seconds, we generate 6. This sounds wasteful and is in fact the opposite, for three reasons."
    },
    {
      type: "ul",
      items: [
        "AI video degrades toward the end. Image-to-video models stay closest to the reference keyframe in the first seconds and drift afterward — faces soften, labels smear, motion gets strange. Generating long and using the early portion means the slot is filled with the best part of the clip.",
        "Trimming needs headroom. If the most usable stretch of a clip starts half a second in (a common pattern — many i2v clips open with a brief settle), you can only slide the trim window if there is spare material on both sides.",
        "Slots move. When we swap the track, adjust the grid, or re-slot a shot into a different window, a clip with margin survives the change. A clip generated at exactly slot length is locked to one edit."
      ]
    },
    {
      type: "p",
      text: "The cost of the extra seconds is small compared to the cost of a regeneration. A 6-second clip renders in roughly 1–5 minutes depending on the model and load; regenerating because a 2.5-second clip could not cover a 3-second slot wastes the whole render, not just the margin."
    },
    {
      type: "h2",
      id: "energy-mapping",
      text: "How does energy mapping work?"
    },
    {
      type: "p",
      text: "Cutting on the beat answers “when”. Energy mapping answers “what”. The idea is to read the structure of the track — intro, verse, build, drop, outro — and assign shot types to sections so that visual intensity tracks musical intensity."
    },
    {
      type: "ul",
      items: [
        "Intro and verse: calm establishing shots. Wider framing, slower camera movement, scene-setting material. The viewer is orienting; let them.",
        "Build: tightening shots. Closer crops, faster internal motion, the product entering frame. Slot lengths usually shorten here as onsets get denser.",
        "Drop: the hero hits. Product close-ups, the money shot, the boldest motion you have. The strongest onset in the track should get the strongest image in the ad.",
        "Outro: resolution. Logo, offer, call to action — on screen while the energy decays, not fighting the drop for attention."
      ]
    },
    {
      type: "p",
      text: "Mapping shot energy to track energy is what separates a beat-synced edit from a metronomic one. An edit that cuts on every beat with uniformly intense shots is technically synced and emotionally flat — there is no contrast, so the drop does not land. The drop only feels like a drop because the verse held something back."
    },
    {
      type: "callout",
      title: "Field note: the drop slot is non-negotiable",
      body: "In our pipeline the first slotting decision is always the same: find the strongest onset in the track and reserve that slot for the product hero shot before anything else is placed. Early on we slotted shots in story order and let the drop land on whatever happened to be there — once it was a transitional shot of a door. Technically synced, completely dead. Now the drop is cast first, the story bends around it, and if the hero clip fails vision-QA we regenerate it before touching any other shot, because every other slot is recoverable and that one is not."
    },
    {
      type: "h2",
      id: "text-overlays-on-beats",
      text: "Timing text overlays on beats"
    },
    {
      type: "p",
      text: "The same grid that schedules cuts schedules text. Overlay lines — hooks, claims, the offer — enter on onsets, ideally on strong ones that do not already carry a cut. A line that pops on a snare hit feels punched in; the same line fading in mid-bar feels like a subtitle. Two practical rules from our renders: never let a text entrance and a cut share the same onset if you can avoid it (two simultaneous events read as one muddled event), and keep each line on screen for at least one full bar so it survives a casual read. We burn overlays into the final render rather than relying on platform text, so the timing is guaranteed on every placement."
    },
    {
      type: "h2",
      id: "planning-shot-count",
      text: "How many shots does a track need?"
    },
    {
      type: "p",
      text: "Shot count falls out of the track, not the other way around. For a 35–40 second track at typical hype-edit tempos, the grid yields 8–12 slots — consistent with the 6–12 shots we see across most 30–40 second ads. The practical planning sequence: pick the track first, build the grid, count the slots, and that number is your shot list. Add 2–4 candidate generations per shot to survive [vision-QA grading](/blog/ai-ad-production-pipeline), and a 10-slot ad becomes roughly 20–40 generated clips of which 10 ship."
    },
    {
      type: "p",
      text: "Two planning notes worth stealing. First, slots are not uniform — verse slots run long (3–6 seconds) and drop-section slots run short (1.5–2.5 seconds), so your shot list needs a few clips that can sustain a longer look and several that only need to deliver one strong second. Second, reuse is legitimate: a hero shot can appear twice in one edit — once briefly in the build, once fully on the drop — which means a 10-slot edit might need only 8 distinct shots."
    },
    {
      type: "h2",
      id: "when-a-clip-fails-its-slot",
      text: "What if a clip doesn’t survive its full slot?"
    },
    {
      type: "p",
      text: "It happens constantly: a clip is usable but not for its whole window. A 4-second slot, a 6-second clip, and only about three seconds of it hold up. You have three honest options, in order of preference."
    },
    {
      type: "ol",
      items: [
        "Trim from the tail. Default for i2v footage, because degradation is back-loaded — identity drift, label smearing, and motion weirdness accumulate over the clip. Keeping the head keeps the frames closest to the graded keyframe.",
        "Trim from the head instead. The right call when the clip opens badly — a settle-in wobble, a slow camera ramp, a subject that takes a beat to start moving. If the energy arrives late, cut to where it arrives, even at some cost in reference fidelity. A drop slot would rather have motion than a perfect label.",
        "Re-slot or regenerate. If neither end yields a clean stretch the length of the slot, move the clip to a shorter slot it can actually fill and regenerate for the original window. Stretching a clip with speed ramps to cover a gap is the one option we avoid — slow-motion makes AI motion artifacts easier to see, not harder."
      ]
    },
    {
      type: "p",
      text: "The general principle: trim toward where the clip is strongest, and let the slot type break ties. Identity-critical slots (faces, packaging, logos) favor the head, where the clip is closest to its reference. Energy-critical slots (the build, the drop) favor whichever stretch moves best, even if it is later in the clip."
    },
    {
      type: "h2",
      id: "music-licensing",
      text: "Music licensing for ads, honestly"
    },
    {
      type: "p",
      text: "The uncomfortable part: the trending track that inspired your edit is almost certainly not licensed for advertising. Commercial music in ads requires synchronization rights, and the in-app music libraries on TikTok and Instagram license most tracks for personal content — business accounts are restricted to commercial-cleared libraries, and running paid media behind an unlicensed track is a takedown (or worse) waiting to happen. The workable options: commercially licensed library music from a subscription service, tracks cleared specifically for ads, or commissioned/generated music you hold the rights to. None of this changes the technique — onset detection does not care where the track came from — but it does mean you should pick the cleared track first and build the grid from it, rather than prototyping on a trending sound you will have to swap out. Swapping the track means rebuilding the grid, and rebuilding the grid means re-trimming every slot."
    },
    {
      type: "h2",
      id: "getting-started",
      text: "What we’d do in your place"
    },
    {
      type: "p",
      text: "Start from the track, not the footage. Pick a cleared 30–40 second piece of music with a clear build and drop, run onset detection, and let the grid tell you the shot count — expect 8–12 slots. Reserve the strongest onset for your product hero shot, map calm material to the verse and intense material to the drop, and generate every clip 1–2 seconds over its slot length so trimming has room to work. Trim toward each clip’s strongest stretch, land your text on beats that don’t already carry cuts, and burn the overlays in. This is the assembly stage of how we build [AI video ads](/ai-video-ads) end to end — keyframes first, machine-graded clips second, beat-grid edit last — and it is the stage that decides whether the result reads as a generated slideshow or as an ad someone meant to make."
    }
  ],
  faq: [
    {
      question: "What are beat-synced video ads?",
      answer: "Beat-synced video ads are edits where every cut lands on a musical onset — a drum hit, bass note, or vocal stab — detected in the track. The edit is built from a beat grid: onsets become cut points, and clips are slotted into the windows between them, so the rhythm of the cuts matches the music."
    },
    {
      question: "How do you edit video to the beat automatically?",
      answer: "Run the music through an onset detector to find energy spikes, filter those onsets into cut points with minimum and maximum slot lengths (roughly 1.5–6 seconds), then trim each clip to exactly its slot and concatenate. The grid is computed from the track, so assembly is deterministic rather than hand-timed."
    },
    {
      question: "How many shots do I need for a 35–40 second beat-synced ad?",
      answer: "A 35–40 second track at typical short-form tempos yields 8–12 cut slots, so plan 8–12 shots — fewer if a hero shot repeats across the build and the drop. With 2–4 generated candidates per shot to survive quality grading, expect roughly 20–40 clips generated for one finished ad."
    },
    {
      question: "Why should AI clips be generated longer than their edit slot?",
      answer: "Image-to-video output is strongest near the start, where it stays closest to the reference keyframe, and drifts toward the end. Generating each clip 1–2 seconds longer than its slot leaves headroom to trim toward the strongest stretch and lets clips survive grid changes without regeneration."
    },
    {
      question: "Can I use trending TikTok sounds in beat-synced ads?",
      answer: "Usually not. In-app libraries license most trending tracks for personal content, not advertising — business accounts are limited to commercially cleared music, and paid media behind an unlicensed track risks takedowns. Use licensed library music, ad-cleared tracks, or music you commissioned or generated and hold rights to."
    }
  ]
};
const post$5 = {
  slug: "ai-character-consistency",
  lang: "en",
  translationKey: "ai-character-consistency",
  title: "How We Keep an AI Creator’s Face Consistent Across Hundreds of Shots",
  metaTitle: "AI Character Consistency: Stop Face Drift | SHOT.IS",
  description: "AI character consistency is the hardest problem in virtual influencer work: why faces drift, and the reference + QA system that keeps one face stable.",
  excerpt: "Every generation resamples the face, and image-to-video drifts further with every second. Here is the system that holds one face together across hundreds of shots.",
  datePublished: "2026-06-17",
  dateModified: "2026-06-17",
  author: founderAuthor,
  ogImageKey: "blog-ai-character-consistency",
  tags: ["AI character consistency", "virtual influencers", "face drift", "identity QA", "AI video"],
  tldr: [
    "AI faces drift because every image generation resamples the face from scratch, and image-to-video generation compounds the drift over the length of each clip.",
    "Consistent AI characters are anchored to a canonical identity set: several reference portraits across angles and expressions that are fed into every single keyframe generation.",
    "An identity score in the QA gate — “does this read as the same person?” — catches drift before a shot enters the edit; expect to generate 2–4 candidates per shot to keep one.",
    "Shot design protects identity: subject mid-frame, no fast camera moves across the face, clips kept to 4–8 seconds, every shot re-anchored on a fresh reference-checked keyframe.",
    "Outfit and look locks make the character recognizable beyond the face alone, so small facial variance does not break recognition."
  ],
  blocks: [
    {
      type: "p",
      text: "AI character consistency — keeping the same face across hundreds of generated shots — comes from a system, not from a better prompt. The system has five parts: a canonical identity set of reference portraits, reference-aware generation for every keyframe, an identity score inside the QA gate, shot design that avoids drift-prone motion, and outfit locks so recognition doesn’t hang on the face alone. Without all five, faces drift — because every generation resamples the face, and image-to-video compounds that drift over the length of each clip."
    },
    {
      type: "h2",
      id: "why-ai-faces-drift",
      text: "Why do AI faces drift?"
    },
    {
      type: "p",
      text: "Generative models don’t store your character anywhere. There is no “person record” the model looks up — there is a text prompt, and a prompt is a description, not an identity. “A woman in her mid-20s with auburn hair and freckles” matches thousands of plausible faces, and the model is free to pick a different one every time. That underspecification is the root cause of face drift in every virtual-influencer pipeline we’ve run."
    },
    {
      type: "h3",
      id: "every-generation-resamples",
      text: "Every generation resamples the face"
    },
    {
      type: "p",
      text: "Each image generation is an independent draw. Run the same prompt ten times and you get ten siblings — same vibe, different person. Eyes a few millimeters wider, a softer jaw, a different nose bridge. Any one of them looks fine in isolation; lined up in a feed, they obviously aren’t the same creator. Text alone can’t fix this, because no prose description is precise enough to pin a face. The only reliable fix is giving the model the actual face as input."
    },
    {
      type: "h3",
      id: "i2v-compounds-drift",
      text: "Image-to-video compounds drift over clip time"
    },
    {
      type: "p",
      text: "The second failure mode is sneakier. Even when you start an image-to-video generation from a perfect keyframe, the face is only guaranteed at frame one. From there, the video model invents every subsequent frame, and small errors accumulate: by second six or eight the jawline has narrowed, the eye color has shifted, the face has migrated toward the model’s house average. We see the same compounding with logos and product labels. This is why our [keyframe-to-video workflow](/blog/keyframe-to-video-workflow) re-anchors every shot on a fresh, identity-checked still instead of letting clips run long."
    },
    {
      type: "h2",
      id: "canonical-identity-set",
      text: "What is a canonical identity set?"
    },
    {
      type: "p",
      text: "A canonical identity set is the small library of reference portraits that defines who the character is. It is the single source of truth: every keyframe is generated against it, and every QA check compares back to it. We build one before producing a single shot of content, and we treat it the way a brand treats a logo file — versioned, locked, and never casually replaced."
    },
    {
      type: "ul",
      items: [
        "Several portraits, not one — a single reference overfits one angle and falls apart the moment the character turns her head.",
        "Multiple angles: frontal, three-quarter left and right, and profile, so the model has evidence for how the face reads in 3D.",
        "Multiple expressions: neutral, smiling, mid-speech — expression changes facial geometry, and the references should cover that range.",
        "Consistent, neutral lighting across the set, so the references agree with each other instead of encoding three different color grades.",
        "The same haircut, makeup level, and signature details in every reference — anything that varies inside the set will vary in the output."
      ]
    },
    {
      type: "p",
      text: "Building the set is itself generative work: we generate far more portraits than we keep, pick the face we want as canon, then generate the remaining angles and expressions from that face and discard anything that doesn’t read as the same person. The set is finished when a stranger can shuffle the portraits and confidently say they’re all one human."
    },
    {
      type: "h2",
      id: "identity-safe-shot-process",
      text: "How we generate an identity-safe shot, step by step"
    },
    {
      type: "p",
      text: "Here is the concrete loop we run for every shot in a virtual-influencer production. It’s the same keyframe-first logic we use across our [AI ad production pipeline](/blog/ai-ad-production-pipeline) — it’s far cheaper to reject a bad still than a bad video."
    },
    {
      type: "ol",
      items: [
        "Pick the reference portraits from the canonical set that best match the shot’s intended angle — a three-quarter shot gets the three-quarter references, not just the frontal hero portrait.",
        "Generate the keyframe with a reference-aware image model, feeding the identity references (and product references, if the shot includes one) alongside the scene prompt. Never from text alone.",
        "Generate 2–4 keyframe candidates. Identity is partly a dice roll even with references, and candidates are cheap at the still stage.",
        "Run the identity check: machine-grade each candidate against the canonical set, asking one blunt question — does this read as the same person? Kill anything below threshold, regenerate if nothing passes.",
        "Animate the surviving keyframe with image-to-video, keeping the clip to 4–8 seconds so drift has less runway.",
        "Grade the clip again — identity at the start, middle, and end of the clip, plus artifacts and continuity. A clip that starts on-model and ends off-model fails.",
        "Re-anchor: the next shot starts from a fresh reference-checked keyframe, never by extending a clip that has already drifted."
      ]
    },
    {
      type: "h2",
      id: "identity-scoring-qa",
      text: "How do you score identity in the QA gate?"
    },
    {
      type: "p",
      text: "Identity scoring is a dedicated check in our vision-QA loop, alongside brand fidelity, continuity, and artifact detection. The grader sees the candidate next to the canonical references and answers the question a follower would answer implicitly: same person, or not? It flags the specific tells — eye spacing, nose shape, jawline, hairline — rather than producing a vague vibe score, because specific tells make regeneration decisions fast."
    },
    {
      type: "p",
      text: "The practical effect is a survival rate, not a guarantee. Across identity-critical shots we expect to generate roughly 2–4 candidates to keep one, and the rate gets worse for hard cases: profile angles, wide shots where the face is small in frame, and expressions far from the reference set. Budgeting for that rejection rate up front is what makes hundreds-of-shots consistency achievable instead of aspirational."
    },
    {
      type: "callout",
      title: "Field note: the drift you stop seeing",
      body: "In our pipeline the scariest drift was never the obvious kind. When you review shots one at a time, day after day, your eye acclimates — each shot is only slightly off from yesterday’s slightly-off shot, and a human reviewer approves all of them. Then you place shot 1 next to shot 80 and they’re visibly two different women. That’s why the QA gate always compares against the canonical identity set, never against the previous shot. Machines don’t acclimate; the reference never moves."
    },
    {
      type: "h2",
      id: "shot-design-protects-identity",
      text: "What shot design protects identity?"
    },
    {
      type: "p",
      text: "You can also stop fighting drift where it’s strongest. Some shots are structurally hostile to identity — fast motion across the face gives the video model maximum freedom to reinvent it — and the cheapest mitigation is to not write those shots in the first place."
    },
    {
      type: "ul",
      items: [
        "Keep the subject mid-frame on identity-critical shots. Faces at the frame edge or tiny in a wide shot drift faster and are harder to QA.",
        "No fast pans, whips, or orbit moves across the face. Camera energy belongs in B-roll and product shots, not on the creator’s close-up.",
        "Hold clips to 4–8 seconds. Drift compounds with time; shorter clips plus more cuts beat one long drifting take.",
        "Avoid mid-clip occlusions — hands brushing hair, cups passing in front of the face. The face that re-emerges is often a new one.",
        "Spend identity where it pays: face-forward shots for hooks and direct address, and cutaways or over-the-shoulder angles where the face isn’t load-bearing."
      ]
    },
    {
      type: "h2",
      id: "outfit-locks",
      text: "Why lock the outfit if the face is anchored?"
    },
    {
      type: "p",
      text: "Because recognition is redundant by design. Humans identify people by the whole gestalt — hair, silhouette, wardrobe, palette — not by biometric face-matching. If your character always wears the same signature jacket and the same color story, a frame where the face is 90% on-model still reads instantly as her. If every shot has a new outfit, the face has to carry 100% of recognition, and a 90% face suddenly reads as a stranger."
    },
    {
      type: "p",
      text: "In production we lock one outfit per campaign inside a Scene Bible — one location, one wardrobe, a short list of look constants like palette and lighting feel. It’s the same discipline that keeps [brand consistency in AI ads](/blog/brand-consistency-ai-ads) from collapsing into “four drinks on four different tables”, applied to a person instead of a product. The outfit is also an extra reference signal: wardrobe details fed into generation give the model more to lock onto than the face alone."
    },
    {
      type: "h2",
      id: "consistency-compounds",
      text: "Why consistency is the asset, not the shots"
    },
    {
      type: "p",
      text: "Here is the economic argument for doing all of this work. Individual ads depreciate — hooks fatigue in days on paid social, and last month’s winning video is this month’s skipped one. A recognizable character appreciates. Every consistent post deposits into the same recognition account: the audience learns the face, the silhouette, the voice of the character, and that familiarity transfers to the next post, the next campaign, the next product."
    },
    {
      type: "p",
      text: "An inconsistent character can’t compound. If followers half-register that the face keeps changing, you don’t have [a virtual influencer](/blog/what-is-a-virtual-influencer) — you have a series of disconnected AI clips wearing the same account name. Consistency is the property that turns generated content into a durable brand asset, which is why we treat identity infrastructure as the first build, not a polish pass."
    },
    {
      type: "h2",
      id: "getting-started",
      text: "What we’d do in your place"
    },
    {
      type: "p",
      text: "If you’re starting a virtual creator — or trying to rescue one that’s drifting — the order of operations matters. Don’t generate content first and hope to firm up the identity later; every off-model post you publish is drift your audience has already seen."
    },
    {
      type: "ol",
      items: [
        "Build the canonical identity set first: several portraits across angles and expressions, culled until every image is unambiguously one person.",
        "Lock the look constants: signature outfit, palette, lighting feel, and the handful of details that make the character recognizable at a glance.",
        "Set up the loop: reference-aware keyframes, identity scoring before animation, 4–8 second clips, re-anchor every shot.",
        "Budget for rejection — 2–4 candidates per kept shot is normal, and it’s the price of a face that holds."
      ]
    },
    {
      type: "p",
      text: "This is the system we run daily for [virtual influencer production at SHOT.IS](/virtual-influencers) — canonical identity sets, reference-anchored generation, machine-graded identity QA, and shot design that keeps one face one face across hundreds of shots. If you’d rather inherit the system than rebuild it, that’s what we’re for."
    }
  ],
  faq: [
    {
      question: "Why do AI-generated faces look different in every image?",
      answer: "Because each generation is an independent sample: the model matches your text description, and a description fits thousands of faces. Without reference images of the specific character fed into every generation, the model picks a slightly different face each time — which is why text-only prompting can’t produce a consistent AI character."
    },
    {
      question: "What is AI face drift in image-to-video generation?",
      answer: "Face drift is the gradual change of a character’s face over the course of a generated clip. Image-to-video models only guarantee the reference at the first frame; errors accumulate afterward, so by second six or eight the face has shifted. Mitigations are 4–8 second clips and re-anchoring every shot on a fresh keyframe."
    },
    {
      question: "How many reference images do you need for a consistent AI character?",
      answer: "More than one. A practical canonical identity set covers several portraits: frontal, three-quarter, and profile angles, plus a few expressions, all with consistent lighting and the same hair and signature details. One reference overfits a single angle and breaks down as soon as the character turns her head."
    },
    {
      question: "How do you check that an AI character looks the same across shots?",
      answer: "With an identity score in the QA gate: each generated keyframe and clip is machine-graded against the canonical reference set, asking whether it reads as the same person. Comparing to the fixed references — never to the previous shot — prevents slow drift that human reviewers acclimate to and stop noticing."
    },
    {
      question: "Does the outfit really matter for AI character consistency?",
      answer: "Yes — recognition is a gestalt of face, hair, silhouette, and wardrobe. A locked signature outfit and palette mean a frame with minor facial variance still reads as the same character. If every shot has new wardrobe, the face must carry recognition alone, and small drift becomes much more visible."
    }
  ]
};
const post$4 = {
  slug: "brand-consistency-ai-ads",
  lang: "en",
  translationKey: "brand-consistency-ai-ads",
  title: "Brand Identity in AI Ads: Scene Bibles, Outfit Locks, Product Fidelity",
  metaTitle: "Brand Consistency in AI Ads: Scene Bibles | SHOT.IS",
  description: "How to keep brand consistency in AI ads: the Scene Bible method, outfit locks, and product fidelity rules that make eight generated shots read as one world.",
  excerpt: "Eight shots that are individually fine and collectively incoherent is the default failure mode of AI ads. The fix is boring discipline: a Scene Bible.",
  datePublished: "2026-06-17",
  dateModified: "2026-06-17",
  author: founderAuthor,
  ogImageKey: "blog-brand-consistency-ai-ads",
  tags: ["brand consistency", "AI video ads", "Scene Bible", "product fidelity", "QA"],
  tldr: [
    "Brand consistency in AI ads comes from a Scene Bible: one locked location, one locked outfit, and a short list of look constants (palette, lens feel, lighting) applied to every shot.",
    "Product fidelity rule: always generate from real product reference images — never let the model imagine the product, because it will redraw labels, logos, and type.",
    "Generative models will invent SKUs the brand does not sell unless the prompt and references explicitly constrain them to the real product line.",
    "A 30–40 second AI ad is typically 6–12 shots; without shared constants those shots read as stock-footage soup even when each one passes QA individually.",
    "Expect to generate 2–4 candidates per shot and reject the ones that break continuity — rejecting a still keyframe is far cheaper than rejecting a finished video."
  ],
  blocks: [
    {
      type: "p",
      text: "Brand consistency in AI ads is not a model setting — it is a production discipline. The method that works in practice is a Scene Bible: before generating anything, you lock one location, one outfit, and a short list of look constants, and you feed real product reference images into every single shot so the model never gets to imagine the product. Skip this, and you get eight shots that are each individually fine and collectively incoherent."
    },
    {
      type: "h2",
      id: "why-ai-ads-fall-apart",
      text: "Why do AI ads fall apart as a set?"
    },
    {
      type: "p",
      text: "Generative video models have no memory between shots. Every generation starts from zero: a new kitchen, a new sweater, a new color grade, and — this is the dangerous one — a new version of your product. Each shot can pass review on its own. The failure only appears when you cut them together and the ad reads like stock footage from six different libraries."
    },
    {
      type: "p",
      text: "We learned to describe the failure mode with one phrase: “four drinks on four different tables”. You ask for a six-shot ad about one beverage, and you get six technically competent shots in which the cup changes shape, the lid changes color, the table changes material, and the daylight changes season. No single shot is wrong. The set is."
    },
    {
      type: "p",
      text: "A 30–40 second ad is typically 6–12 shots in our pipeline. That means 6–12 independent chances for the model to reinvent your world. Consistency does not emerge from better prompts shot by shot — it has to be imposed from above, by constants that every shot inherits."
    },
    {
      type: "h2",
      id: "what-is-a-scene-bible",
      text: "What is a Scene Bible?"
    },
    {
      type: "p",
      text: "A Scene Bible is a short document — often under a page — that fixes everything the campaign is not allowed to vary. Ours has three sections: one location, one outfit, and the look constants. Every prompt for every keyframe in the campaign carries these constants verbatim. The Scene Bible is written once, before the first generation, and it does not get edited mid-campaign."
    },
    {
      type: "h3",
      id: "one-location",
      text: "One location"
    },
    {
      type: "p",
      text: "Pick a single, specifically described setting and keep the whole ad in it: “small sunlit café counter, pale oak surfaces, white tile behind the espresso machine” — not “a café”. Specificity is what makes regeneration converge: when shot 4 fails QA and you regenerate it, a vague location description produces a different room every time, while a specific one produces variations of the same room."
    },
    {
      type: "h3",
      id: "one-outfit",
      text: "One outfit lock"
    },
    {
      type: "p",
      text: "If a presenter or creator appears in more than one shot, their outfit is locked to a written description with color, garment type, and one identifying detail — and that description ships in every prompt. Outfits drift even faster than faces: a model will happily move your presenter from a black crewneck to a grey hoodie between shots 2 and 3, and viewers read that instantly as a cut to a different person. Face-level identity is its own problem with its own mitigations — we cover that separately in [how we keep AI characters consistent](/blog/ai-character-consistency) — but the outfit lock is the cheap half of the fix, and teams skip it constantly."
    },
    {
      type: "h3",
      id: "look-constants",
      text: "Look constants"
    },
    {
      type: "ul",
      items: [
        "Palette: 2–3 named colors that should dominate every frame, usually the brand colors plus one neutral.",
        "Lens feel: one phrase like “35mm handheld, shallow depth of field” repeated in every prompt — mixing a phone-camera look with a cinema look across shots is one of the loudest continuity breaks.",
        "Light: time of day and quality (“soft morning window light”) locked once. Light direction changing between shots is the single most common giveaway that an ad was generated piecemeal.",
        "Energy: a one-line note on motion (“slow push-ins, no whip pans”) so the edit cuts together at one tempo."
      ]
    },
    {
      type: "h2",
      id: "how-to-build-one",
      text: "How do you build a Scene Bible? Step by step"
    },
    {
      type: "ol",
      items: [
        "Collect real product reference images first — clean shots of the actual product from 2–3 angles, with labels readable. These get fed into every generation; they are not optional inspiration.",
        "Write the location in one sentence with at least three concrete physical details (surfaces, fixtures, what is behind the subject).",
        "Lock the outfit: garment, color, fit, one identifying detail. If you use a persistent brand character, this is part of its permanent definition — the same logic behind [virtual influencers](/virtual-influencers).",
        "Pick the look constants: palette, lens feel, light, motion energy. Four lines, no more.",
        "Generate 3–4 test keyframes of different moments using the full constant block, side by side. If they look like frames from one film, the bible holds. If not, tighten the vaguest line and retest.",
        "Freeze it. Paste the constant block into every shot prompt for the rest of the campaign, unedited."
      ]
    },
    {
      type: "p",
      text: "This works because our whole process is keyframe-first: we generate still keyframes, grade them, and only then animate the survivors via image-to-video. The Scene Bible is enforced at the keyframe stage, where a rejected image costs cents and seconds — not at the video stage, where a rejected clip costs a render queue slot and 1–5 minutes of waiting. The full flow is described in [our AI ad production pipeline](/blog/ai-ad-production-pipeline)."
    },
    {
      type: "h2",
      id: "product-fidelity",
      text: "How do you keep the product faithful?"
    },
    {
      type: "p",
      text: "The product is the one element where “close enough” is a defect. Three rules cover most of it."
    },
    {
      type: "p",
      text: "First: always generate from real product reference images. Reference-aware image models can hold a product’s shape, color, and label remarkably well — but only if you give them the real thing to hold onto. A text description of your packaging is an invitation to invent."
    },
    {
      type: "p",
      text: "Second: never let the model imagine the product. If a shot does not need the product visible, fine. But the moment the product is in frame, the reference images go into the generation. There is no shot where “roughly our bottle” is acceptable."
    },
    {
      type: "p",
      text: "Third: check labels and logos in QA, every time. Models love to redraw type. A label that reads correctly at a glance will, on inspection, have a mangled letterform, a doubled word, or a logo that is 90% right — which is worse than 0% right, because 90% right ships. Image-to-video adds a second layer of risk: even a perfect keyframe label can drift over the course of a clip, which is one reason we keep identity-critical clips short, 4–8 seconds, and re-anchor every shot on a fresh keyframe."
    },
    {
      type: "h2",
      id: "dont-invent-skus",
      text: "Why does “don’t invent SKUs” need to be a written rule?"
    },
    {
      type: "p",
      text: "Because the model will do it, cheerfully and plausibly. Ask for “a customer enjoying a drink from the brand” without constraints and you may get a frappé with whipped cream, an iced matcha, a smoothie in a branded cup — none of which the brand sells. The model is pattern-matching to “beverage brand ad”, not to your actual menu. The same applies to flavors, sizes, colorways, and bundle packs in any category."
    },
    {
      type: "p",
      text: "The fix is explicit negative scope in the Scene Bible: list what the brand actually sells, name the hero SKU for the campaign, and state that no other products may appear. This sounds pedantic until the first time a client asks why the ad features a drink they have never made."
    },
    {
      type: "callout",
      title: "Field note: the invented-menu problem",
      body: "In our pipeline this rule exists because of a coffee to-go campaign. The brand sold coffee in one signature cup. Early unconstrained generations produced an entire phantom menu — layered iced drinks, cream-topped desserts in glassware the brand does not own. Every shot looked great. Every shot was a product lie. After we locked the bible to the one real cup, fed its reference photos into every generation, and added “no other drinks exist” to the constants, the invented-SKU rate in candidate keyframes dropped to near zero, and QA could focus on label fidelity instead of menu policing."
    },
    {
      type: "h2",
      id: "continuity-checklist",
      text: "The continuity checklist we run on every shot"
    },
    {
      type: "p",
      text: "Every keyframe and every clip is graded against a checklist before it enters the edit — machine-graded first, human spot-checked after. Roughly speaking we generate 2–4 candidates per shot to keep one. This is the checklist; copy it."
    },
    {
      type: "ul",
      items: [
        "Product matches the reference images: shape, proportions, cap/lid, material.",
        "Label and logo are legible and correct — read the actual letters, do not glance.",
        "No invented SKUs, flavors, or packaging variants anywhere in frame, including the background.",
        "Location matches the bible: same surfaces, same fixtures, same room.",
        "Outfit matches the lock: garment, color, identifying detail.",
        "Light direction and quality match the bible and the neighboring shots.",
        "Palette holds: brand colors present, no stray dominant hue.",
        "Lens feel consistent: same focal-length character and depth of field as the rest of the set.",
        "No artifacts: extra fingers, warped text in background signage, melted edges on the product.",
        "For video: identity and label hold for the full clip, not just the first frame."
      ]
    },
    {
      type: "h2",
      id: "cost-of-skipping",
      text: "What does skipping this actually cost?"
    },
    {
      type: "p",
      text: "The trap is that the cost is invisible at the shot level. Each generation looks fine, so nothing flags it. The cost lands at assembly, when the edit refuses to feel like one piece, and the only honest fix is regenerating half the shots — now under constants you should have written on day one. We have watched the no-bible path roughly double the generation volume on a campaign: the same 2–4 candidates per shot, but run twice, once before the bible existed and once after."
    },
    {
      type: "p",
      text: "There is also a softer cost: trust. Viewers cannot articulate “the light direction flipped between shots”, but they feel it, and what they feel is cheapness. For [AI UGC ads](/blog/ai-ugc-ads-guide), where the entire format trades on feeling real and native, incoherence is not a style problem — it is a credibility problem."
    },
    {
      type: "h2",
      id: "getting-started",
      text: "What we would do in your place"
    },
    {
      type: "p",
      text: "Before generating a single frame: write the bible. One location sentence with three concrete details, one outfit lock, four look constants, the real SKU list, and a folder of clean product reference photos. It takes under an hour and it is the highest-leverage hour in the whole production. Then enforce it at the keyframe stage, where rejection is cheap, and run the continuity checklist on everything that survives."
    },
    {
      type: "p",
      text: "Or hand it to a pipeline that already works this way. Scene Bibles, reference-fed product fidelity, and machine-graded continuity QA are built into how we produce [AI UGC ads](/ai-ugc-ads) — every campaign gets one world, not eight shots from eight different ones."
    }
  ],
  faq: [
    {
      question: "What is a Scene Bible in AI ad production?",
      answer: "A Scene Bible is a short pre-production document that locks everything an AI ad campaign is not allowed to vary: one location, one outfit for the presenter, and look constants like palette, lens feel, and lighting. Every shot prompt carries these constants, so 6–12 independently generated shots read as one coherent world."
    },
    {
      question: "How do you stop AI models from changing the product in ads?",
      answer: "Feed real product reference images into every generation where the product appears, and never rely on a text description of the packaging. Then verify labels and logos in QA on every candidate, because models frequently redraw type. For video, keep clips short — 4–8 seconds — since product fidelity drifts over longer image-to-video clips."
    },
    {
      question: "Why do AI ads sometimes show products the brand does not sell?",
      answer: "Generative models pattern-match to the category, not to your actual product line, so an unconstrained prompt for a beverage brand can produce invented drinks, flavors, or packaging. The fix is listing the real SKUs in the Scene Bible, naming the hero product, and explicitly stating that no other products may appear in frame."
    },
    {
      question: "How many shots and candidates does a consistent AI ad take?",
      answer: "A 30–40 second AI ad is typically 6–12 shots. With a Scene Bible in place, expect to generate roughly 2–4 candidates per shot and keep one after continuity QA. Without a bible, teams often regenerate large parts of the campaign at assembly, roughly doubling total generation volume."
    },
    {
      question: "Is brand consistency checked automatically or manually?",
      answer: "In our pipeline, both. Every keyframe and clip is machine-graded against a checklist covering product fidelity, label legibility, location, outfit, light, palette, and artifacts before it enters the edit, and humans spot-check the survivors. Grading at the still-keyframe stage keeps rejection cheap compared to rejecting finished video."
    }
  ]
};
const post$3 = {
  slug: "do-ai-ugc-ads-work",
  lang: "en",
  translationKey: "do-ai-ugc-ads-work",
  title: "Do AI UGC Ads Perform? What Creative Testing Actually Shows",
  metaTitle: "Do AI UGC Ads Work? What Testing Shows | SHOT.IS",
  description: "Do AI UGC ads work? An evidence-led look at AI UGC ad performance: where testing velocity wins, where results disappoint, and what to measure.",
  excerpt: "AI UGC ads don’t perform — testing systems do. Where the gains are real, where they aren’t, and which metrics actually tell you.",
  datePublished: "2026-06-17",
  dateModified: "2026-06-17",
  author: defaultAuthor,
  ogImageKey: "blog-do-ai-ugc-ads-work",
  tags: ["AI UGC ads", "creative testing", "ad performance", "paid social"],
  tldr: [
    "AI UGC ads perform when they’re run as a testing system — more hook variants per week at lower cost per variant — not when one AI video is expected to beat a proven human-shot ad head-to-head.",
    "The measurable advantages of AI UGC are testing velocity, cost per variant, faster response to creative fatigue, and cheap localization of winning concepts.",
    "AI UGC results disappoint when teams clone a single hero ad instead of running volume, put uncanny AI delivery on trust-heavy claims, or skip QA on faces, hands, and product labels.",
    "Judge AI UGC by hook rate (3-second holds), hold rate, and CPA per concept family — not CPA per individual video, because most test variants are supposed to lose.",
    "Meta and TikTok both expect AI-generated or significantly synthetic content to be labeled, and EU AI Act transparency rules point the same direction — disclosure is becoming table stakes, not a penalty."
  ],
  blocks: [
    {
      type: "p",
      text: "Do AI UGC ads work? Yes — but performance is a property of the testing system, not of any single video. Teams that use AI UGC to run more hook tests per week at a lower cost per variant consistently get value from it; teams that generate one AI clip and expect it to outperform a proven human-shot ad usually don’t. The honest answer is that AI UGC changes the economics of creative testing, and the results follow from how you exploit that, not from the pixels themselves."
    },
    {
      type: "h2",
      id: "why-single-video-is-wrong-question",
      text: "Why “does this AI video convert?” is the wrong question"
    },
    {
      type: "p",
      text: "Most disappointment with AI UGC starts with a framing error. A brand has one ad that works — a real creator, a real testimonial — and asks whether an AI version can match it. That’s a one-to-one comparison AI will often lose, because the human ad was itself a survivor: it’s the one variant out of many that happened to connect. Comparing a fresh AI clip against a battle-tested winner is comparing a lottery ticket against a winning ticket."
    },
    {
      type: "p",
      text: "The comparison that actually matters is system against system. On one side: a traditional pipeline that produces a handful of creator videos per month, each expensive enough that you hesitate to kill it. On the other: a pipeline that produces dozens of variants per month, each cheap enough to discard without a meeting. The second system finds winners faster for structural reasons — more shots on goal — and that’s where AI UGC earns its place. We’ve written up the mechanics of running that kind of system in our [AI ad production pipeline breakdown](/blog/ai-ad-production-pipeline)."
    },
    {
      type: "h2",
      id: "where-ai-ugc-helps",
      text: "Where AI UGC measurably helps"
    },
    {
      type: "h3",
      id: "testing-velocity",
      text: "Testing velocity"
    },
    {
      type: "p",
      text: "The single largest gain is the number of hook tests you can run per week. The first three seconds decide most of a short-form ad’s fate, and hooks are exactly the part AI iterates on cheapest: same body, same offer, ten different openings. In our pipeline, producing a new hook variant on an existing concept is a keyframe-plus-one-clip job — a 4–8 second i2v clip renders in roughly 1–5 minutes depending on model and load — so a batch of hook variants is an afternoon, not a casting call. The patterns worth testing first are catalogued in our [UGC hook pattern library](/blog/ugc-hook-patterns)."
    },
    {
      type: "h3",
      id: "cost-per-variant",
      text: "Cost per variant"
    },
    {
      type: "p",
      text: "Creative testing only works if losing is cheap. When a variant costs creator fees plus shipping plus a two-week turnaround, every variant carries sunk-cost gravity — teams keep mediocre ads running because killing them feels wasteful. When the marginal variant costs a few generations and an edit pass, you kill losers on day two without flinching. That behavioral change matters as much as the budget line; the full numbers are in our [AI UGC ads cost breakdown](/blog/ai-ugc-ads-cost)."
    },
    {
      type: "h3",
      id: "creative-fatigue",
      text: "Fighting creative fatigue"
    },
    {
      type: "p",
      text: "Hooks fatigue in days on paid social, not weeks. A winning ad’s frequency climbs, its hook rate sags, and CPA drifts up — and the traditional answer, “brief the creator for a refresh”, takes longer than the decay itself. An AI pipeline can ship a refreshed opening on the same winning body within a day, which means you’re replacing fatigued creative on the algorithm’s schedule instead of a production calendar’s."
    },
    {
      type: "h3",
      id: "localization",
      text: "Localization"
    },
    {
      type: "p",
      text: "Once a concept is proven in one market, AI UGC makes the second and third markets nearly free: same scene, same beats, localized language and on-screen text. This is the least glamorous advantage and often the highest-ROI one, because you’re scaling a known winner rather than gambling on a new concept."
    },
    {
      type: "h2",
      id: "where-results-disappoint",
      text: "Where AI UGC results disappoint"
    },
    {
      type: "ul",
      items: [
        "Cloning a hero ad instead of running volume. Using AI to replicate one proven video produces a slightly-worse copy of something the audience has already seen. The tool’s advantage is breadth, and replication throws breadth away.",
        "Uncanny delivery on trust-heavy claims. A synthetic face making a medical, financial, or before-after claim invites exactly the scrutiny those claims can’t survive. Keep AI presenters on demonstration, lifestyle, and product-context shots; keep heavy trust claims in formats that don’t hinge on a face being believed.",
        "Skipping QA. Warped hands, drifting product labels, and melted logos are conversion killers that take one frame to spot and one comment to amplify. Every clip needs a grading pass before it spends a dollar.",
        "Treating the first generation as final. In our experience you generate 2–4 candidates per shot to keep one. Teams that ship first outputs are shipping their rejects."
      ]
    },
    {
      type: "callout",
      title: "Field note: the QA gate is the performance lever",
      body: "In our pipeline every keyframe and clip is machine-graded against a checklist — brand fidelity, identity match, continuity, artifacts — before it enters the edit, and weak ones are regenerated. When we’ve loosened that gate to move faster, the failures were never subtle: a label that morphed mid-clip, a hand with the wrong geometry holding the product. Viewers don’t consciously log these, but the comments do, and comment sentiment bleeds into delivery. The cheapest performance gain in AI UGC isn’t a better model — it’s refusing to publish the bottom half of what the model produces."
    },
    {
      type: "h2",
      id: "what-to-measure",
      text: "What should you measure?"
    },
    {
      type: "p",
      text: "AI UGC produces volume, and volume breaks per-video reporting. If you judge each variant by its own CPA, small spend per variant gives you noise, and you’ll kill good concepts over bad luck. Measure at two levels instead: fast leading indicators per variant, and money metrics per concept family."
    },
    {
      type: "ul",
      items: [
        "Hook rate (3-second holds ÷ impressions): the per-variant signal that arrives fastest and costs least. This is how you rank ten hooks on the same body within a couple of days.",
        "Hold rate (viewers still present at 50–75% of the video): tells you whether the body sustains the promise the hook made. A high hook rate with a collapsing hold rate means the opening is writing a check the ad doesn’t cash.",
        "CPA per concept family, not per video: group all variants of one concept — every hook, every localization — and judge the family’s blended CPA. Individual variants are samples; the concept is the unit you scale or kill."
      ]
    },
    {
      type: "p",
      text: "A workable testing loop looks like this:"
    },
    {
      type: "ol",
      items: [
        "Pick 2–3 distinct concepts (different angle or claim, not different wallpaper) and lock a scene bible for each — one location, one outfit, consistent palette — so variants read as one world.",
        "Generate 5–10 hook variants per concept on a shared body. Keyframes first: grade the stills, regenerate the weak ones, and only then animate, because rejecting a bad still is far cheaper than rejecting a bad video.",
        "QA every clip for faces, hands, labels, and continuity before anything goes live.",
        "Launch with equal budget per variant and read hook rate after the first meaningful chunk of impressions — usually within 48–72 hours.",
        "Kill the bottom half of hooks, shift budget to the top performers, and read hold rate and concept-family CPA over the following week.",
        "Scale the winning family: new hook refreshes on its body as fatigue sets in, then localizations once it’s proven."
      ]
    },
    {
      type: "h2",
      id: "disclosure-and-policy",
      text: "What about disclosure and platform policy?"
    },
    {
      type: "p",
      text: "This part is moving, so treat the following as orientation, not legal advice. Meta requires advertisers to disclose when ads in certain categories use digitally created or altered content, and applies “AI info” style labeling more broadly to synthetic media. TikTok requires creators and advertisers to label AI-generated content that shows realistic scenes or people, and has its own AI-generated content toggle. In the EU, the AI Act’s transparency provisions point toward a general expectation that synthetic media is marked as such. The direction across all three is the same: realistic AI-generated people in ads should be labeled."
    },
    {
      type: "p",
      text: "In practice we haven’t seen disclosure as the performance penalty teams fear. Feed-native short-form is already a low-trust, high-skip environment — viewers grant or withhold attention based on the first seconds, not the metadata label. What does get punished is being caught pretending: an unlabeled synthetic spokesperson making personal-experience claims is a worse outcome, both with platforms and with comment sections, than a labeled ad that’s upfront about it. Build labeling into your launch checklist the way you build in QA, and design creative that works whether or not the viewer reads the label."
    },
    {
      type: "h2",
      id: "getting-started",
      text: "What we’d do in your place"
    },
    {
      type: "p",
      text: "Don’t start by asking whether one AI video can beat your best ad — start by standing up the smallest testing loop you can run weekly. Two concepts, a handful of hooks each, a hard QA gate, and reporting at the concept-family level. After two or three cycles you’ll know which concepts deserve scale and which advantages — velocity, cost, fatigue response, localization — matter most for your account. If you’d rather plug into a pipeline that already runs this loop daily — keyframe-first generation, machine-graded QA, beat-synced assembly — that’s exactly what our [AI UGC ads service](/ai-ugc-ads) does. And if you’re building the muscle in-house first, our [complete AI UGC ads guide](/blog/ai-ugc-ads-guide) walks through the full workflow end to end."
    }
  ],
  faq: [
    {
      question: "Do AI UGC ads actually work?",
      answer: "Yes, when run as a testing system: more hook variants per week, cheap losers, fast fatigue response, and easy localization. AI UGC ads disappoint when a single generated video is expected to beat a proven human-shot ad head-to-head, because the advantage is volume and iteration speed, not per-video magic."
    },
    {
      question: "How should I measure AI UGC ad performance?",
      answer: "Use hook rate (3-second holds divided by impressions) to rank variants fast, hold rate to check whether the body sustains attention, and CPA measured per concept family rather than per video. Individual variants carry too little spend to judge alone — the concept family is the unit you scale or kill."
    },
    {
      question: "Why do some AI UGC ads perform badly?",
      answer: "The common failure modes are cloning one hero ad instead of testing volume, putting uncanny synthetic delivery on trust-heavy claims like health or finance, and skipping QA so warped hands or drifting product labels reach the feed. Each is a process failure — fixable with volume testing and a hard grading gate."
    },
    {
      question: "Do I have to disclose that an ad is AI-generated?",
      answer: "Increasingly yes. Meta requires disclosure for digitally created or altered content in several ad categories, TikTok requires labeling realistic AI-generated content, and EU AI Act transparency rules point the same way. This is general guidance, not legal advice — but building labeling into your launch checklist is the safe default."
    },
    {
      question: "How many AI UGC variants should I test at once?",
      answer: "A practical starting loop is 2–3 distinct concepts with 5–10 hook variants each, launched with equal budgets. Read hook rate within 48–72 hours, kill the bottom half, and shift budget to winners. Expect to generate 2–4 candidates per shot during production to keep one that passes QA."
    }
  ]
};
const post$2 = {
  slug: "how-to-create-a-virtual-influencer",
  lang: "en",
  translationKey: "how-to-create-a-virtual-influencer",
  title: "How to Create a Virtual Influencer: the Process We Run Daily",
  description: "How to create a virtual influencer step by step: positioning, locking a canonical identity, building the content system, reference-anchored production, identity QA, and launch.",
  excerpt: "The step-by-step process behind our own AI creator roster — from positioning to identity lock to the QA loop that keeps one face one face.",
  datePublished: "2026-07-07",
  author: founderAuthor,
  ogImageKey: "blog-how-to-create-a-virtual-influencer",
  tags: ["virtual influencers", "AI creators", "how-to", "production"],
  tldr: [
    "Creating a virtual influencer is a five-step process: position the character, lock a canonical identity, design the content system, produce with reference-anchored generation, and QA every output against the identity.",
    "The identity lock is the step most teams skip — and the reason most AI characters fall apart after ten posts.",
    "A character without a content system is a portrait; the recurring formats are what make it an influencer.",
    "Budget the QA loop from day one: image models drift, and a character that drifts stops existing.",
    "Plan disclosure before launch — several markets legally require saying the character is not a real person."
  ],
  blocks: [
    {
      type: "p",
      text: "Creating a virtual influencer takes five steps: positioning, identity lock, content system design, reference-anchored production, and identity QA. None of them individually is hard. What is hard is that skipping any one of them produces a character that looks fine for a week and then quietly falls apart. This is the process we run at SHOT.IS for our own roster and for client characters, including the mistakes we paid for so you do not have to."
    },
    {
      type: "h2",
      id: "positioning",
      text: "Step 1 — Position the character before you design it"
    },
    {
      type: "p",
      text: "Positioning means deciding who the character is for and what commercial job it does before generating a single image. A character designed as “beautiful AI woman” has no reason to exist; a character designed as “streetwear creator for a Gen-Z sneaker audience with short-form ad energy” can carry campaigns."
    },
    {
      type: "ul",
      items: [
        "Audience: who follows this character and why would they care?",
        "Genre and lane: fashion, fitness, tech, food — one lane, held consistently.",
        "Brand fit: what products can this character credibly present?",
        "Campaign job: awareness face, UGC-style ad talent, launch anchor, or all three?"
      ]
    },
    {
      type: "h2",
      id: "identity-lock",
      text: "Step 2 — Lock the identity: the canonical reference set"
    },
    {
      type: "p",
      text: "The identity lock is a canonical set of reference images plus written rules that every future asset is generated against. This is the single most important step and the one most teams skip. Modern image models will generate a slightly different person every run unless you anchor them; the canonical set is that anchor."
    },
    {
      type: "ul",
      items: [
        "Face set: multiple angles, expressions, and lighting conditions of the same locked face.",
        "Wardrobe logic: garments, colors, fit, and one or two identifying details that persist.",
        "World: where this character lives and shoots — locations, palette, lens feel.",
        "Voice and behavior: tone of captions, what the character talks about, what it never does."
      ]
    },
    {
      type: "callout",
      title: "From our own roster",
      body: "Every character on the SHOT.IS roster — VEXA-9, KAI_OS, LUNA_CORE — exists as a canonical identity set first and content second. When a generation drifts from the set, the output is rejected, no matter how good it looks in isolation."
    },
    {
      type: "h2",
      id: "content-system",
      text: "Step 3 — Design the content system, not individual posts"
    },
    {
      type: "p",
      text: "A content system is a small set of recurring formats the character repeats: the weekly fit check, the product-in-world post, the launch countdown, the UGC-style ad. Formats are what make a character feel alive between campaigns and what let you produce volume without redesigning every post from scratch."
    },
    {
      type: "ol",
      items: [
        "Pick 3–4 recurring formats matched to the character’s lane.",
        "Define the ad formats separately: hook styles, product moments, CTA behavior.",
        "Map formats to platforms — what runs as a Reel, what runs as a paid placement.",
        "Leave room for campaign one-offs: launches, collabs, seasonal drops."
      ]
    },
    {
      type: "h2",
      id: "production",
      text: "Step 4 — Produce with reference-anchored generation"
    },
    {
      type: "p",
      text: "Reference-anchored generation means every image and video starts from the canonical identity set, not from a text prompt describing the character. Text descriptions drift; references hold. For video, we generate keyframes first and animate them second — the keyframe carries the identity, and the video model inherits it. The mechanics of that pipeline are in the [keyframe-to-video workflow](/blog/keyframe-to-video-workflow) post."
    },
    {
      type: "h2",
      id: "qa",
      text: "Step 5 — QA every output against the identity"
    },
    {
      type: "p",
      text: "Identity QA is a review step where every generated asset is compared to the canonical set before it ships: same face, same styling constants, same world. We machine-grade this in our pipeline because human reviewers stop noticing gradual drift — each output looks “close enough” to the previous one while the character slowly becomes someone else. The full engineering story is in [AI character consistency](/blog/ai-character-consistency)."
    },
    {
      type: "h2",
      id: "launch",
      text: "Launch: disclosure and the first 30 days"
    },
    {
      type: "p",
      text: "Before the first post goes live, decide how the character discloses that it is AI. Several markets — including the US and India — require saying the influencer is not a real person, and platform-level AI labels are becoming standard. Disclosure done confidently is a feature, not a confession: the most successful virtual influencers are openly virtual."
    },
    {
      type: "h2",
      id: "mistakes",
      text: "The mistakes that kill virtual influencers"
    },
    {
      type: "ul",
      items: [
        "No identity lock — regenerating the character from a text prompt each time. It will drift within days.",
        "Portrait thinking — a beautiful character with no formats, no lane, and nothing to say.",
        "Skipping QA — trusting that outputs “look right”. Drift is gradual and invisible until it is embarrassing.",
        "Hidden AI — pretending the character is human. Audiences forgive virtual; they do not forgive deceptive.",
        "One-campaign thinking — treating the character as a stunt instead of an asset that compounds."
      ]
    },
    {
      type: "p",
      text: "If you would rather inherit this system than rebuild it, that is what we do: the [virtual influencers](/virtual-influencers) page covers how SHOT.IS builds characters as reusable brand assets, and [what is a virtual influencer](/blog/what-is-a-virtual-influencer) is the primer if you are earlier in the decision."
    }
  ],
  faq: [
    {
      question: "How long does it take to create a virtual influencer?",
      answer: "A locked identity typically takes days, not months, and the first campaign content pack follows within one to two weeks. After that, new content starts from the existing identity instead of from zero."
    },
    {
      question: "What tools do you need to create a virtual influencer?",
      answer: "At minimum: an image model that supports reference-based generation, a video model for animating keyframes, and a QA process for identity consistency. The tooling matters less than the discipline of the canonical identity set."
    },
    {
      question: "Can you create a virtual influencer without a studio?",
      answer: "Yes, for a single character with modest output. The difficulty scales with volume: keeping one face consistent across hundreds of shots, formats, and markets is where a production system with machine-graded QA earns its keep."
    },
    {
      question: "Do virtual influencers have to be disclosed as AI?",
      answer: "In several markets, yes — including the US and India. Sponsored content must be labeled as advertising everywhere, and openly-virtual positioning consistently outperforms hidden AI anyway."
    }
  ]
};
const post$1 = {
  slug: "virtual-influencer-cost",
  lang: "en",
  translationKey: "virtual-influencer-cost",
  title: "Virtual Influencer Cost: What Brands Actually Pay in 2026",
  description: "What a virtual influencer costs by tier: DIY tools, studio-built AI creators, and celebrity-grade CGI characters — plus the cost comparison against human influencer sourcing.",
  excerpt: "The label covers everything from a $30/month tool to a CGI character with a full studio behind it. An honest cost breakdown by tier.",
  datePublished: "2026-07-07",
  author: founderAuthor,
  ogImageKey: "blog-virtual-influencer-cost",
  tags: ["virtual influencers", "cost", "AI creators", "budgeting"],
  tldr: [
    "Virtual influencer costs span three tiers: DIY generator tools, studio-built AI-native creators, and celebrity-grade CGI characters operated by full teams.",
    "The structural difference from human influencers: you pay to build an asset once, then pay for production — instead of renting someone else’s audience per post.",
    "Celebrity CGI characters like Lil Miquela reportedly earned around $10M a year at peak — that tier is a media business, not a marketing line item.",
    "The real comparison for most brands is against ongoing creator sourcing, briefing, and reshoot costs, not against building Miquela.",
    "Hidden costs live in consistency: identity QA and reference-anchored production are what separate a durable character from a folder of one-off images."
  ],
  blocks: [
    {
      type: "p",
      text: "A virtual influencer costs anywhere from a monthly tool subscription to the operating budget of a small media company — the label covers both, which is why most cost articles are useless. The honest answer depends on which of three tiers you are buying, and on one structural difference from human influencers: a virtual character is an asset you build once and then produce content for, not an audience you rent per post."
    },
    {
      type: "h2",
      id: "tiers",
      text: "The three cost tiers"
    },
    {
      type: "p",
      text: "Virtual influencer production falls into three tiers with fundamentally different economics: self-serve generator tools, studio-built AI-native creators, and CGI characters with full production teams."
    },
    {
      type: "table",
      caption: "Virtual influencer cost tiers compared",
      headers: ["Tier", "What you get", "Cost shape", "Where it breaks"],
      rows: [
        [
          "DIY generator tools",
          "Self-serve AI character images, subscription-priced",
          "Tens of dollars per month",
          "Identity drift at volume; no video system; you are the pipeline"
        ],
        [
          "Studio-built AI creator",
          "Locked identity, content system, reference-anchored production, QA",
          "One-time identity build + per-campaign production",
          "Needs a real brief and a lane; overkill for a one-off stunt"
        ],
        [
          "Celebrity-grade CGI",
          "A flagship character with a dedicated creative team",
          "Studio payroll, ongoing",
          "A media business in itself; years to pay back"
        ]
      ]
    },
    {
      type: "stat",
      value: "~$10M / year",
      label: "reported peak earnings of Lil Miquela — the ceiling of the celebrity CGI tier, not a benchmark for brand characters",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Virtual_influencer"
    },
    {
      type: "h2",
      id: "what-drives-cost",
      text: "What actually drives the cost"
    },
    {
      type: "p",
      text: "Within the studio tier — the one most brands actually buy — cost scales with four things, and none of them is “how pretty the character is”."
    },
    {
      type: "ul",
      items: [
        "Formats: stills only, or UGC-style video, ads, and campaign packs?",
        "Volume: a weekly post needs a lighter system than an always-on ad pipeline.",
        "Markets: each language and market version multiplies production, not identity.",
        "Consistency requirements: the QA depth needed to keep one face one face across hundreds of shots — this is the invisible line item that separates durable characters from disposable ones."
      ]
    },
    {
      type: "h2",
      id: "vs-human",
      text: "The comparison that matters: against human creator sourcing"
    },
    {
      type: "p",
      text: "The relevant benchmark for a brand is not Lil Miquela’s budget — it is what you currently spend sourcing, briefing, shipping product to, and re-shooting with human creators for the same content volume. A virtual creator replaces the per-post rental economics with build-once-produce-many economics: the identity build amortizes across every campaign that reuses it."
    },
    {
      type: "ul",
      items: [
        "Human creator: fees per post or campaign, plus sourcing and management overhead, plus reshoot risk — and the audience equity stays with the creator.",
        "Virtual creator: identity build once, then production per campaign — and every campaign compounds recognition the brand owns.",
        "Break-even logic: the more variants, markets, and repeat campaigns you run, the faster the virtual asset pays back."
      ]
    },
    {
      type: "p",
      text: "The same build-vs-rent logic applies to ad creative volume generally — we wrote up the numbers side of that in [AI UGC ads cost](/blog/ai-ugc-ads-cost)."
    },
    {
      type: "h2",
      id: "hidden-costs",
      text: "The hidden costs nobody quotes"
    },
    {
      type: "ul",
      items: [
        "Identity drift: regenerating a character from prompts instead of a canonical reference set is free until the character stops being recognizable — then it is a full rebuild.",
        "QA time: someone (or something) has to reject the generations where the face is 90% right. Skipping this is how characters die quietly.",
        "Disclosure and compliance: labeling requirements differ by market, and retrofitting disclosure after launch is more expensive than designing for it.",
        "A content system: a character with no recurring formats produces nothing between campaigns and depreciates instead of compounding."
      ]
    },
    {
      type: "p",
      text: "How these costs are avoided by construction — identity lock, reference-anchored generation, machine-graded QA — is covered step by step in [how to create a virtual influencer](/blog/how-to-create-a-virtual-influencer). If you want the scoped number for your brand rather than tiers, [brief us](/virtual-influencers) and we will price the identity build and the content system separately, the way it should be priced."
    }
  ],
  faq: [
    {
      question: "How much does a virtual influencer cost?",
      answer: "It depends on the tier: DIY generator tools run tens of dollars a month, a studio-built AI creator is a one-time identity build plus per-campaign production, and celebrity-grade CGI characters are operated by full teams with ongoing studio costs. Most brands buy the middle tier."
    },
    {
      question: "Is a virtual influencer cheaper than a human influencer?",
      answer: "For repeated campaigns, usually yes — the identity build amortizes across every campaign that reuses the character, while human creator fees repeat per post. For a single one-off campaign, a human creator with an existing audience is often the cheaper and better choice."
    },
    {
      question: "What is the most expensive part of running a virtual influencer?",
      answer: "Consistency. Keeping the same recognizable face, styling, and world across hundreds of generated shots requires reference-anchored production and identity QA — the invisible work that separates a durable brand asset from a folder of AI images."
    },
    {
      question: "Why do virtual influencer costs vary so much?",
      answer: "Because the label covers three different products: a self-serve image tool, a produced brand character with a content system, and a CGI media property. Price quotes are meaningless until you know which tier is being discussed."
    }
  ]
};
const post = {
  slug: "canvas-mode-node-based-ai-video-workflow",
  lang: "en",
  translationKey: "canvas-mode-node-based-ai-video-workflow",
  title: "Canvas Mode: A Node-Based Workflow for AI Video Ads",
  metaTitle: "Canvas Mode — Node-Based AI Video Workflow | SHOT.IS",
  description: "Canvas mode turns AI ad production into a node graph: wire references, prompts, image and video models, and a composer into one re-runnable pipeline that only regenerates what changed.",
  excerpt: "Linear wizards force you to restart when one shot is wrong. Canvas mode lays the whole production out as a node graph — so you re-run one node, not the whole ad.",
  datePublished: "2026-07-08",
  dateModified: "2026-07-08",
  author: founderAuthor,
  ogImageKey: "blog-canvas-mode",
  tags: ["canvas mode", "node-based workflow", "AI video pipeline", "node graph", "AI ad production"],
  readingMinutes: 9,
  tldr: [
    "Canvas mode is a node-based editor for AI video production: media imports, prompts, image models, video models, and a final composer are nodes on a canvas, wired together with typed connections.",
    "Every node caches its output and knows when it is stale — change one prompt and only the shots downstream of it regenerate, while every unchanged branch keeps its result.",
    "Graphs execute server-side: press run, close the laptop, and the pipeline keeps generating; runs survive restarts and resume where they left off.",
    "Each generation node picks its own model, so cheap fast models handle B-roll while premium models handle hero shots — with the credit cost visible on the picker before you commit.",
    "Branching replaces re-doing: one approved keyframe can feed three video variants side by side, which is how A/B testing hooks stops being three separate projects."
  ],
  blocks: [
    {
      type: "p",
      text: "Canvas mode is the node-based way to build an AI video ad: instead of stepping through a linear wizard, you lay the whole production out on a canvas — reference images, prompts, image generations, video generations, and the final edit — as nodes connected by wires. Each node does one job, takes typed inputs from the nodes before it, and hands its output to the nodes after it. The graph is the pipeline, visible all at once, and any part of it can be re-run without touching the rest. If you have used node editors in Blender, Houdini, or ComfyUI, the mental model transfers directly; canvas mode applies it to the full ad production chain, not just a single image."
    },
    {
      type: "h2",
      id: "what-is-canvas-mode",
      text: "What is canvas mode, exactly?"
    },
    {
      type: "p",
      text: "Canvas mode is a graph editor built into the SHOT.IS studio where each node is one production step and each edge carries a typed artifact — an image, a video clip, a piece of text — from one step to the next. A minimal ad graph reads left to right: an import node holds your product photo, a prompt node describes the shot, a generate-image node produces the keyframe, a generate-video node animates it, and a composer node cuts the resulting clips into the finished vertical ad."
    },
    {
      type: "p",
      text: "The ports are typed, so the canvas refuses connections that don’t make sense — you can’t wire a video into a slot expecting an image, and you can’t create a cycle. That sounds like a small thing, but it means a graph that connects is a graph that can run, and a colleague (or a vision model) can read the whole production plan at a glance instead of reconstructing it from a history of wizard screens."
    },
    {
      type: "p",
      text: "Under every node sits its latest output: the generated still, a playable preview of the clip, the prompt text ready to copy. The canvas is simultaneously the plan, the control panel, and the review board."
    },
    {
      type: "h2",
      id: "why-node-graph",
      text: "Why a node graph instead of a linear wizard?"
    },
    {
      type: "p",
      text: "A node graph beats a linear flow for one structural reason: AI video production is not linear. It is iterative and branchy — you regenerate shot three five times while shots one, two, and four are already approved, and you want two hook variants sharing the same body. A wizard models none of that; a graph models all of it natively."
    },
    {
      type: "table",
      caption: "Linear wizard vs. canvas mode for multi-shot AI ad production",
      headers: ["Situation", "Linear wizard", "Canvas mode"],
      rows: [
        [
          "One shot out of six is wrong",
          "Step back through the flow, often regenerating steps that were fine",
          "Re-run that one node; approved branches keep their cached outputs"
        ],
        [
          "Change the shared product photo",
          "Manually find every place it was used",
          "Every downstream node is flagged stale automatically; one click re-runs them in order"
        ],
        [
          "A/B test two hooks",
          "Duplicate the whole project",
          "Branch the graph — two hook nodes feed into the same body and composer"
        ],
        [
          "See the whole production at once",
          "Impossible; the state lives across wizard steps",
          "The graph is the production, on one screen"
        ],
        [
          "Mix models per shot",
          "Usually one model for the whole run",
          "Each generation node picks its own model, with credit cost shown up front"
        ]
      ]
    },
    {
      type: "p",
      text: "None of this changes what gets generated — the shots still come from the same [keyframe-to-video workflow](/blog/keyframe-to-video-workflow) we run everywhere. What changes is the cost of iteration: the graph makes “redo exactly this part” a first-class operation instead of a workaround."
    },
    {
      type: "h2",
      id: "node-types",
      text: "What’s on the canvas: the node types"
    },
    {
      type: "p",
      text: "Canvas mode ships with a small set of node types that cover the whole production chain from raw references to a rendered ad:"
    },
    {
      type: "ul",
      items: [
        "Import — brings media onto the canvas: upload straight from your computer or browse anything already in your library. This is where product photos, creator references, and music land.",
        "Prompt — a plain text node for shot descriptions and look constants you want to reuse across branches.",
        "Video Prompter — an LLM node that takes your ordered reference images plus a one-line intent and writes the motion prompt for you, with timecoded beats and explicit references to each image. It turns “energetic product reveal” into a shot-ready prompt that cites @Image1 and @Image2 at the right moments.",
        "Generate image — produces the keyframe from prompts and reference images, using whichever image model you pick on the node.",
        "Generate video — animates a keyframe (or generates from text) with your chosen video model, with duration, aspect ratio, resolution, and quality knobs that adapt to what that specific model supports.",
        "Composer — the endpoint: takes an ordered list of video clips, optional music, and per-clip in/out trims, and renders the final ad at the resolution and orientation you choose — portrait, landscape, or square, up to 4K."
      ]
    },
    {
      type: "callout",
      title: "Field note: the prompter node earns its place",
      body: "The node we expected to be a gimmick — Video Prompter — turned out to be the one we use on almost every graph. Motion prompts are the highest-skill part of image-to-video work: what moves, what stays locked, when the cut lands. Having an LLM draft that prompt from the actual reference images (not a generic template), with beats timed to the clip, gets a first version that’s right about 80% of the time — and because it’s a node, regenerating the prompt doesn’t disturb anything else on the canvas."
    },
    {
      type: "h2",
      id: "stale-propagation",
      text: "How does canvas mode avoid paying for the same shot twice?"
    },
    {
      type: "p",
      text: "Every node caches its output together with a fingerprint of everything that produced it — its inputs, its parameters, its upstream results. When anything in that fingerprint changes, the node and everything downstream of it are flagged stale, visibly, with dashed connections showing exactly which parts of the graph no longer reflect their inputs. Nothing regenerates until you say so, and when you do, only the stale part runs."
    },
    {
      type: "p",
      text: "This matters because generation is the expensive step. In a six-shot ad where you tweak one shot’s prompt, a linear tool tempts you into regenerating far more than one shot — and video generations cost real money and real minutes each. On the canvas, five approved shots keep their cached results forever; the sixth re-runs. Swap the product photo that feeds all six, and the graph tells you honestly that everything downstream is now stale — then “run stale” executes the whole affected region in the correct order, skipping any branch whose upstream failed, and touching nothing that was already fresh."
    },
    {
      type: "p",
      text: "The same logic runs upstream too: hit run on the final composer and the canvas first executes any stale ancestors it depends on, in dependency order. You never have to remember the right sequence — the graph is the sequence."
    },
    {
      type: "h2",
      id: "server-side-execution",
      text: "What does server-side execution change?"
    },
    {
      type: "p",
      text: "Graphs execute on the server, not in your browser tab. When you run a node — or a whole stale region — the studio backend takes over: it routes each generation through the same provider, credit, and idempotency path as every other generation on the platform, supervises the jobs, and writes results back to the graph. Your browser is just a viewport with a live status: running nodes pulse, finished nodes show their output, and the canvas refreshes itself while work is in flight."
    },
    {
      type: "p",
      text: "Practically, that means you can queue a full ad — keyframes, videos, final composition — and close the laptop. It also means runs are durable: if the service restarts mid-generation, stranded nodes are picked back up or failed honestly on startup, rather than left spinning forever. For anyone who has babysat a browser tab through a 40-minute batch of video generations, this is the difference between a tool and a pipeline."
    },
    {
      type: "h2",
      id: "model-per-node",
      text: "How does per-node model choice work?"
    },
    {
      type: "p",
      text: "Each generation node carries its own model picker — image models on image nodes, video models on video nodes, LLMs on the prompter, music on the composer — grouped by provider, filterable by typing, and annotated with the credit cost of each option before you run anything. Pick a model and the node’s knobs adapt: duration, aspect ratio, resolution, and quality options come from that model’s actual capability profile, so the canvas never offers a setting the model can’t honor."
    },
    {
      type: "p",
      text: "This is what makes shot-level model routing practical. The right answer in production is almost never one model for everything — it’s a premium model with strong physics for the hero shot and cheaper, faster models for B-roll and iteration, a strategy we break down in our [comparison of AI video generators for ads](/blog/best-ai-video-generator-for-ads). In a linear tool, mixing models per shot is friction; on the canvas, it’s just what each node is set to."
    },
    {
      type: "h2",
      id: "branching-and-reuse",
      text: "Branching: the end of “duplicate project to test a variant”"
    },
    {
      type: "p",
      text: "Because nodes are addressable and outputs are reusable, variants stop being copies of the whole production. One approved keyframe can feed three generate-video nodes with three different motion prompts, side by side, compared on one screen. Two hook variants can share the entire body of the ad and diverge only at the first clip feeding the composer. The 80/20 of creative testing — same body, different hook, which we cover in [UGC hook patterns](/blog/ugc-hook-patterns) — maps onto the graph as a literal branch."
    },
    {
      type: "p",
      text: "The composer node closes the loop: ordered clips in, finished ad out, with per-clip trims so you can tighten each shot’s in and out points without leaving the canvas or re-rendering the clips themselves. The output is a rendered file at the aspect and resolution you asked for — a vertical 1080p cut for feeds, a landscape 4K master when you need one."
    },
    {
      type: "h2",
      id: "getting-started",
      text: "Where canvas mode fits, and where to start"
    },
    {
      type: "p",
      text: "Canvas mode doesn’t replace the disciplined process — reference-anchored keyframes, a QA gate before animation, short clips, fresh anchoring per shot, all of it laid out in our [AI ad production pipeline](/blog/ai-ad-production-pipeline). It gives that process a spatial, re-runnable form: the pipeline you were holding in your head (or in a spreadsheet) becomes a picture that executes."
    },
    {
      type: "p",
      text: "If you want to try the shape of it, start smaller than a full ad: one import node with your best product photo, one prompt, one image generation, one video generation. Get a clip you’d approve. Then branch — a second motion prompt off the same keyframe — and notice that the comparison cost you one node, not one project. That’s the habit canvas mode builds: iterate at the node level, pay only for what changed. And if you’d rather have the graph — references, models, QA, and the final cut — built and run for you, that’s exactly what [AI video ads at SHOT.IS](/ai-video-ads) are."
    }
  ],
  faq: [
    {
      question: "What is canvas mode in SHOT.IS?",
      answer: "Canvas mode is a node-based editor for AI video production. Each production step — importing references, writing prompts, generating keyframes, generating video clips, and composing the final ad — is a node on a canvas, connected by typed wires. The graph can be run end to end or one node at a time, and only stale nodes regenerate."
    },
    {
      question: "How is a node-based AI video workflow better than a linear one?",
      answer: "AI ad production is iterative and branchy: you regenerate one shot many times while others are approved, and variants share most of their structure. A node graph models this natively — re-run one node while cached neighbors keep their outputs, branch a keyframe into several video variants, and see the whole production on one screen instead of across wizard steps."
    },
    {
      question: "Does canvas mode regenerate everything when I change one input?",
      answer: "No. Every node caches its output with a fingerprint of its inputs and parameters. Changing something marks only the affected downstream nodes as stale — shown with dashed connections — and a single “run stale” executes just that region in dependency order. Unchanged branches never regenerate and never cost credits again."
    },
    {
      question: "Do canvas graphs keep running if I close my browser?",
      answer: "Yes. Graph execution happens server-side: generations are supervised by the studio backend through the same provider-routing and credit path as the rest of the platform. You can queue a full ad and close the laptop; runs survive restarts and resume or fail honestly instead of hanging."
    },
    {
      question: "Can I use different AI models for different shots in one ad?",
      answer: "Yes — that’s one of the main points of canvas mode. Every generation node has its own model picker, grouped by provider with credit costs shown up front, and its settings (duration, aspect, resolution, quality) adapt to the chosen model. Typical routing: a premium video model for the hero shot, faster and cheaper models for B-roll and iteration."
    },
    {
      question: "What does the composer node do?",
      answer: "The composer is the graph’s endpoint: it takes an ordered list of generated clips, optional music, and per-clip in/out trims, and renders the finished ad at your chosen orientation and resolution — portrait, landscape, or square, from 720p up to 4K — without you leaving the canvas."
    }
  ]
};
const blogPosts = [
  post$i,
  post$h,
  post$g,
  post$f,
  post$e,
  post$d,
  post$c,
  post$b,
  post$a,
  post$9,
  // Batch B:
  post$8,
  post$7,
  post$6,
  // Batch C:
  post$5,
  post$4,
  post$3,
  // Batch D:
  post$2,
  post$1,
  // Canvas mode:
  post
];
const blogBasePath = { en: "/blog", es: "/es/blog" };
const blogStrings = {
  en: {
    blogTitle: "SHOT.IS Blog",
    blogLede: "Field notes on AI UGC ads, AI video ads, and virtual influencers — what is working in short-form performance creative, and how brands ship more of it.",
    keyTakeaways: "Key takeaways",
    readTime: (n) => `${n} min read`,
    onThisPage: "On this page",
    faqTitle: "Frequently asked questions",
    relatedTitle: "Keep reading",
    backToBlog: "All articles",
    switchLabel: "Leer en español",
    ctaTitle: "Ready to test AI content?",
    ctaBody: "SHOT.IS helps brands generate AI UGC ads, AI video ads, and virtual influencers without traditional shoots.",
    ctaButton: "Start an AI content sprint",
    publishedOn: "Published"
  },
  es: {
    blogTitle: "Blog de SHOT.IS",
    blogLede: "Notas sobre anuncios UGC con IA, anuncios de video con IA e influencers virtuales: qué funciona en la creatividad de performance y cómo las marcas producen más.",
    keyTakeaways: "Puntos clave",
    readTime: (n) => `${n} min de lectura`,
    onThisPage: "En esta página",
    faqTitle: "Preguntas frecuentes",
    relatedTitle: "Seguir leyendo",
    backToBlog: "Todos los artículos",
    switchLabel: "Read in English",
    ctaTitle: "¿Listo para probar contenido con IA?",
    ctaBody: "SHOT.IS ayuda a las marcas a generar anuncios UGC, anuncios de video e influencers virtuales sin rodajes tradicionales.",
    ctaButton: "Empezar un sprint de contenido",
    publishedOn: "Publicado"
  }
};
const byDateDesc = (a, b) => a.datePublished < b.datePublished ? 1 : -1;
const blogPostsByLang = {
  en: blogPosts.filter((p) => p.lang === "en").sort(byDateDesc),
  es: blogPosts.filter((p) => p.lang === "es").sort(byDateDesc)
};
const blogPostPath = (post2) => post2.lang === "en" ? `/blog/${post2.slug}` : `/es/blog/${post2.slug}`;
const blogIndexPath = (lang) => blogBasePath[lang];
const blogPostByPath = new Map(
  blogPosts.map((post2) => [blogPostPath(post2), post2])
);
const blogPostsByTranslationKey = (() => {
  const map = /* @__PURE__ */ new Map();
  for (const post2 of blogPosts) {
    const entry = map.get(post2.translationKey) ?? {};
    entry[post2.lang] = post2;
    map.set(post2.translationKey, entry);
  }
  return map;
})();
const blogSibling = (post2) => {
  const pair = blogPostsByTranslationKey.get(post2.translationKey);
  const other = post2.lang === "en" ? "es" : "en";
  return pair?.[other];
};
const absolute$1 = (path) => `${siteBaseUrl}${path}`;
const blogAlternates = (post2) => {
  const pair = blogPostsByTranslationKey.get(post2.translationKey) ?? { [post2.lang]: post2 };
  const alternates = [];
  Object.keys(pair).forEach((lang) => {
    const p = pair[lang];
    if (p) alternates.push({ hreflang: lang, href: absolute$1(blogPostPath(p)) });
  });
  const xDefault = pair.en ?? post2;
  alternates.push({ hreflang: "x-default", href: absolute$1(blogPostPath(xDefault)) });
  return alternates;
};
const blogIndexAlternates = () => [
  { hreflang: "en", href: absolute$1(blogIndexPath("en")) },
  { hreflang: "es", href: absolute$1(blogIndexPath("es")) },
  { hreflang: "x-default", href: absolute$1(blogIndexPath("en")) }
];
const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;
const readingTime = (post2) => {
  if (post2.readingMinutes) return post2.readingMinutes;
  let words = countWords(post2.title) + countWords(post2.description) + post2.tldr.reduce((n, t) => n + countWords(t), 0);
  for (const block of post2.blocks) {
    if ("text" in block && typeof block.text === "string") words += countWords(block.text);
    if ("items" in block) words += block.items.reduce((n, i) => n + countWords(i), 0);
    if (block.type === "callout") words += countWords(block.title) + countWords(block.body);
    if (block.type === "table")
      words += block.rows.reduce((n, row) => n + row.reduce((m, cell) => m + countWords(cell), 0), 0);
    if (block.type === "stat") words += countWords(block.label);
  }
  for (const f of post2.faq ?? []) words += countWords(f.question) + countWords(f.answer);
  return Math.max(1, Math.round(words / 200));
};
const blogRoutes = () => [
  blogIndexPath("en"),
  blogIndexPath("es"),
  ...blogPosts.map(blogPostPath)
];
const learnBasePath = { en: "/learn", es: "/es/learn" };
const learnStrings = {
  en: {
    hubTitle: "Learn SHOT.IS Studio",
    hubLede: "Short screencasts of the real canvas — no slides, no talking head. Each lesson rebuilds one thing end to end, and tells you up front how long it takes to learn.",
    learningTime: (label) => `${label} to learn`,
    watchTime: (label) => `${label} to watch`,
    pathTotal: (label) => `${label} for the whole path`,
    lessonCount: (n) => `${n} lessons`,
    whatYouLearn: "What you can do after this",
    inThisLesson: "In this lesson",
    transcript: "Transcript",
    transcriptNote: "The same lines are burned into the video as subtitles.",
    prerequisites: "Before you start",
    nodesUsed: "Nodes used",
    faqTitle: "Frequently asked questions",
    nextLesson: "Next lesson",
    backToHub: "All lessons",
    switchLabel: "Ver en español",
    basicsLabel: "Basics",
    microCaseLabel: "Micro-case",
    ctaTitle: "Open the canvas and follow along",
    ctaBody: "Every lesson is recorded in the same Studio you get when you sign in. Start a run and rebuild it as you watch.",
    ctaButton: "Open SHOT.IS Studio",
    recordingLabel: "Recording",
    noVideoNote: "Screencast is being recorded — the written steps below are complete.",
    blogBridge: "Looking for the longer written version — strategy, costs, and what actually performs?",
    blogBridgeCta: "Read the blog"
  },
  es: {
    hubTitle: "Aprende SHOT.IS Studio",
    hubLede: "Screencasts cortos del lienzo real: sin diapositivas, sin presentador. Cada lección reconstruye una cosa de principio a fin y dice de antemano cuánto tarda en aprenderse.",
    learningTime: (label) => `${label} para aprender`,
    watchTime: (label) => `${label} de video`,
    pathTotal: (label) => `${label} para la ruta completa`,
    lessonCount: (n) => `${n} lecciones`,
    whatYouLearn: "Qué podrás hacer después",
    inThisLesson: "En esta lección",
    transcript: "Transcripción",
    transcriptNote: "Las mismas líneas van incrustadas en el video como subtítulos.",
    prerequisites: "Antes de empezar",
    nodesUsed: "Nodos utilizados",
    faqTitle: "Preguntas frecuentes",
    nextLesson: "Siguiente lección",
    backToHub: "Todas las lecciones",
    switchLabel: "View in English",
    basicsLabel: "Fundamentos",
    microCaseLabel: "Micro-caso",
    ctaTitle: "Abre el lienzo y sigue el paso a paso",
    ctaBody: "Cada lección está grabada en el mismo Studio al que entras al iniciar sesión. Crea un run y reconstrúyelo mientras miras.",
    ctaButton: "Abrir SHOT.IS Studio",
    recordingLabel: "Grabando",
    noVideoNote: "El screencast se está grabando — los pasos escritos de abajo están completos.",
    blogBridge: "¿Buscas la versión escrita más larga: estrategia, costes y lo que de verdad funciona?",
    blogBridgeCta: "Leer el blog"
  }
};
const lessons = [
  {
    slug: "first-ai-video",
    lang: "en",
    translationKey: "first-ai-video",
    order: 1,
    kind: "basics",
    title: "Your first AI video",
    metaTitle: "Your First AI Video in SHOT.IS Studio | 3 min lesson",
    description: "Build a working AI video in SHOT.IS Studio from four nodes: a scene prompt, a keyframe, a camera-move prompt, and a motion generation. A 72-second screencast of the real canvas.",
    excerpt: "Four nodes, one finished clip. The minimum path through the canvas, with nothing skipped and nothing faked.",
    outcome: "Generate a finished AI video clip from scratch without anyone setting the run up for you.",
    nodes: ["prompt", "generate_image", "generate_video"],
    datePublished: "2026-09-18",
    ogImageKey: "lesson-first-ai-video",
    tags: ["getting started", "canvas", "keyframe"],
    videoSeconds: 72,
    practiceMinutes: 2,
    video: {
      src: "/media/lessons/first-ai-video.mp4",
      poster: "/media/lessons/first-ai-video.jpg",
      width: 1440,
      height: 900
    },
    steps: [
      {
        at: 0,
        title: "Start an empty run",
        body: "Every ad in SHOT.IS lives on a canvas as a graph of nodes. A new run gives you a blank one — there is no template to fight with."
      },
      {
        at: 9,
        title: "Write the direction as a prompt node",
        body: "The prompt node holds plain-English direction: scene, light, camera. It is an input, which means it never regenerates and never costs credits."
      },
      {
        at: 19,
        title: "Turn the direction into a keyframe",
        body: "A generate image node makes the still that the shot is built from. Pick the model and the credit cost appears before you commit to it."
      },
      {
        at: 44,
        title: "Put the keyframe in motion",
        body: "The generate video node needs two things: the keyframe, which fixes what is in the shot, and a prompt, which describes only what moves. Five seconds is enough to judge a direction."
      },
      {
        at: 59,
        title: "Play, download, or keep building",
        body: "A green node holds a real file. Download it as-is, or leave it on the canvas and wire it into an ad in the later lessons."
      }
    ],
    captions: [
      { at: 0, text: "This is the SHOT.IS canvas. Every ad you make lives here as a graph." },
      { at: 4, text: "Start with New run — an empty canvas, no template." },
      { at: 9, text: "Add a prompt node. This is your direction, in plain English." },
      { at: 14, text: '"Coffee cup on wet concrete, neon rim light, slow orbit."' },
      { at: 19, text: "Now a generate image node. This makes your keyframe." },
      { at: 24, text: "Pick a model. The credit cost shows before you commit." },
      { at: 29, text: "Wire the prompt into the image node and hit Run." },
      { at: 34, text: "Amber while it runs, green when it lands." },
      { at: 39, text: "That's your keyframe — the frame the whole shot is built on." },
      { at: 44, text: "Add a generate video node. It needs the keyframe and a prompt." },
      { at: 49, text: "The keyframe says what is in the shot; the prompt says what moves." },
      { at: 54, text: "Run it. Motion is the slow step, and the expensive one." },
      { at: 59, text: "Green. Press play — the clip runs right on the node." },
      { at: 64, text: "Download it, or keep it and build the ad around it." },
      { at: 69, text: "One video, four nodes. Everything else is a variation on this." }
    ],
    faq: [
      {
        question: "Do I need a keyframe to generate video in SHOT.IS Studio?",
        answer: "Yes. The generate video node takes a keyframe as a required input, which is why the first lesson generates an image before it generates motion. Working keyframe-first is also cheaper: a still costs a fraction of a video, so you judge composition at the cheap step."
      },
      {
        question: "How much does the first video cost?",
        answer: "It depends on the model and duration you pick, and Studio shows the credit cost on the node before the run starts. The launch offer covers a single self-serve video at $4.99."
      }
    ]
  },
  {
    slug: "lock-your-product",
    lang: "en",
    translationKey: "lock-your-product",
    order: 2,
    kind: "basics",
    title: "Lock your product with references",
    metaTitle: "Lock Your Real Product in AI Ads with References | 4.5 min lesson",
    description: "A prompt gives you a generic product. A reference node gives you yours. Learn reference roles in SHOT.IS Studio so the label, shape, and colour survive into the finished video.",
    excerpt: "The difference between an AI ad for a cup and an AI ad for your cup is one node and one role.",
    outcome: "Keep your actual product and creator recognizable across every shot in a run.",
    nodes: ["reference", "generate_image", "generate_video"],
    datePublished: "2026-09-18",
    ogImageKey: "lesson-lock-your-product",
    tags: ["references", "product", "brand consistency"],
    videoSeconds: 95,
    practiceMinutes: 3,
    video: {
      src: "/media/lessons/lock-your-product.mp4",
      poster: "/media/lessons/lock-your-product.jpg",
      width: 1440,
      height: 900
    },
    prerequisites: ['Finish "Your first AI video" — this lesson edits that same graph.'],
    steps: [
      {
        at: 0,
        title: "Add the product to your library once",
        body: "A product is a workspace entity with a packshot, not a file you re-upload per run. Add it once and every future run can reach for it."
      },
      {
        at: 10,
        title: "Drop a reference node on the canvas",
        body: 'The reference node resolves a library entity into reference images. Picking your product fills its images output with the packshot, tagged with the role "product".'
      },
      {
        at: 20,
        title: "Understand what a role does",
        body: "Roles tell the model what a reference is for. identity is a face that must repeat, product is an object that must stay identical, scene is a location, style is an outfit or look."
      },
      {
        at: 30,
        title: "Wire references into the keyframe",
        body: "The references port on generate image accepts several inputs and keeps their order, which is the order referenceRoles is read in."
      },
      {
        at: 40,
        title: "Let the prompt describe the scene, not the product",
        body: "Once the packshot is carrying the product, the prompt should stop describing it. Spend the words on light, surface, and camera instead."
      },
      {
        at: 75,
        title: "Check that the lock survives motion",
        body: "Wire the keyframe into generate video as before. Because the identity is settled in the still, the motion step has far less room to invent."
      }
    ],
    captions: [
      { at: 0, text: "A prompt alone gives you a generic cup. This pins your real one." },
      { at: 5, text: "Open the library and add your product once — name, packshot, done." },
      { at: 10, text: "Back on the canvas, add a reference node." },
      { at: 15, text: "Pick the product. It resolves the packshot with role 'product'." },
      { at: 20, text: "Roles matter. product means: this must stay identical." },
      { at: 25, text: "identity, scene, style and product are separate roles." },
      { at: 30, text: "Wire the reference node's images output into generate image." },
      { at: 35, text: "The references port takes several inputs, in order." },
      { at: 40, text: "Now the prompt describes the scene, not the product." },
      { at: 45, text: '"On a cafe counter at golden hour, warm rim light, shallow depth."' },
      { at: 50, text: "Run it. The label, the shape, the colour come from your packshot." },
      { at: 55, text: "Compare it against the prompt-only version from lesson one." },
      { at: 60, text: "Same direction, but now it's your product, not a lookalike." },
      { at: 65, text: "Add a creator reference the same way for a face that repeats." },
      { at: 70, text: "Each reference is reusable across every run in the workspace." },
      { at: 75, text: "Wire the keyframe into generate video as before." },
      { at: 80, text: "The lock holds through motion — that's keyframe-first working." },
      { at: 85, text: "One reference, set once, and every shot stays on brand." },
      { at: 90, text: "Next: what to do when one shot comes back wrong." }
    ],
    faq: [
      {
        question: "How many references can one keyframe use?",
        answer: "The references port is a multi-input, so you can wire in several — typically a creator identity plus a product, and sometimes a scene plate. Their edge order is the order referenceRoles is applied in, so keep identity first when a face is involved."
      },
      {
        question: "Why does my product still drift after adding a reference?",
        answer: "Almost always because the prompt is still describing the product and fighting the packshot. Once a reference carries the object, delete the product adjectives from the prompt and spend the words on lighting and camera instead."
      }
    ]
  },
  {
    slug: "fix-one-shot",
    lang: "en",
    translationKey: "fix-one-shot",
    order: 3,
    kind: "basics",
    title: "Fix one shot without re-running the ad",
    metaTitle: "Re-run a Single Node Instead of the Whole Ad | 3.5 min lesson",
    description: "One bad generation should cost one generation. Learn how stale nodes work in SHOT.IS Studio so you can swap a model, re-run a single shot, and resync the ad.",
    excerpt: "One shot came back wrong. Fix that node, not the run — the canvas is built so you only redo what actually broke.",
    outcome: "Repair a failed shot by re-running one node instead of rebuilding the whole run.",
    nodes: ["generate_image", "generate_video", "composer"],
    datePublished: "2026-09-18",
    ogImageKey: "lesson-fix-one-shot",
    tags: ["canvas", "iteration", "cost control"],
    videoSeconds: 85,
    practiceMinutes: 2,
    video: {
      src: "/media/lessons/fix-one-shot.mp4",
      poster: "/media/lessons/fix-one-shot.jpg",
      width: 1440,
      height: 900
    },
    prerequisites: ["A run with at least one finished generation — lessons one and two both leave you with one."],
    steps: [
      {
        at: 0,
        title: "Find the node that failed, not the run",
        body: "A warped label or a broken hand belongs to one node. The instinct to start the run over is the expensive one, and the canvas exists so you do not have to."
      },
      {
        at: 15,
        title: "Change the model or nudge the prompt",
        body: "Node params open beside the canvas. Different models fail in different ways, so a model swap is often a better first move than a prompt rewrite."
      },
      {
        at: 30,
        title: "Re-run that node alone",
        body: "Inputs — your prompts and references — are hand-authored and never regenerate. Running one node re-bills one generation."
      },
      {
        at: 45,
        title: "Follow the stale marks downstream",
        body: "When a node produces a new result, everything built from it is marked stale: still showing the old output, and flagged as out of date."
      },
      {
        at: 55,
        title: "Resync the ad",
        body: "Run the stale nodes to bring the graph back in sync. The composer picks up the replacement clip without being rewired."
      }
    ],
    captions: [
      { at: 0, text: "One shot came back wrong. You fix that node, not the whole run." },
      { at: 5, text: "This run has ten nodes. One clip came back with a warped label." },
      { at: 10, text: "You don't rebuild the run. You fix the node in place." },
      { at: 15, text: "Click the bad node. Its params open on the side." },
      { at: 20, text: "Switch the model — different models fail in different ways." },
      { at: 25, text: "Or keep the model and change the prompt a little." },
      { at: 30, text: "Hit Run on just this node. Nothing upstream re-runs." },
      { at: 35, text: "Your references and prompt are inputs. They never regenerate." },
      { at: 40, text: "That's why the canvas is a graph and not a timeline." },
      { at: 45, text: "When a node changes, everything downstream goes stale." },
      { at: 50, text: "Stale means: still showing the old result, marked out of date." },
      { at: 55, text: "Run the downstream nodes to bring the ad back in sync." },
      { at: 60, text: "The composer picks up the new clip automatically." },
      { at: 65, text: "You just paid for one generation instead of the whole run." },
      { at: 70, text: "Keep the failures on the canvas — they record what didn't work." },
      { at: 75, text: "Clean them up later, or leave them as a reference." },
      { at: 80, text: "Fix in place, re-run narrow. That's the studio habit." }
    ],
    faq: [
      {
        question: "Does re-running a node charge me again?",
        answer: "Running a generation node bills that generation, which is exactly why the canvas lets you run one node instead of the graph. Input nodes — prompt, import, reference — are hand-authored and free to change as often as you like."
      }
    ]
  },
  {
    slug: "strobe-product-ad",
    lang: "en",
    translationKey: "strobe-product-ad",
    order: 4,
    kind: "micro-case",
    title: "Micro-case: a strobe product ad",
    metaTitle: "Build a TikTok Strobe Product Ad in SHOT.IS Studio | 6 min lesson",
    description: "Rebuild the flicker-background product ad: one anchored hero product, six disposable locations, and a composer full of hard cuts. A 110-second screencast.",
    excerpt: "One product that never moves, six worlds that never stop. The cheapest high-energy format in short-form.",
    outcome: "Ship a fifteen-second strobe ad from one locked hero and a handful of disposable worlds.",
    nodes: ["reference", "generate_image", "generate_video", "composer"],
    datePublished: "2026-09-18",
    ogImageKey: "lesson-strobe-product-ad",
    tags: ["micro-case", "composer", "product ads"],
    videoSeconds: 110,
    practiceMinutes: 4,
    video: {
      src: "/media/lessons/strobe-product-ad.mp4",
      poster: "/media/lessons/strobe-product-ad.jpg",
      width: 1440,
      height: 900
    },
    videoPending: true,
    prerequisites: ["Lesson two — the hero product has to be locked by a reference before any of this works."],
    steps: [
      {
        at: 0,
        title: "Understand the illusion",
        body: "A strobe ad reads as motion, but nothing moves. The product sits dead-centre at a fixed scale and the background is replaced every few frames."
      },
      {
        at: 15,
        title: "Generate one anchored hero, then vary only the world",
        body: "Keep the framing clause of the prompt byte-identical across generations and change only the location. That constant is what keeps the product from jittering."
      },
      {
        at: 50,
        title: "Turn each still into a clip",
        body: "The composer's clips port takes video, so every background gets a generate video node. Do not bother directing the motion — at seventy milliseconds a cut, none of it is legible."
      },
      {
        at: 60,
        title: "Assemble in the composer with hard cuts",
        body: "Wire the clips into the composer's ordered clips port. Set the transition to cut: a fade of any length destroys the effect."
      },
      {
        at: 65,
        title: "Trim to the strobe",
        body: "clipTrims takes a start and end per clip, index-aligned with the wiring order. Short trims are the entire look — if it feels sluggish, trim shorter before you change anything else."
      },
      {
        at: 75,
        title: "Land the cuts near the beat",
        body: "Add music and nudge the trims so cuts fall close to the beat. Exactness is not required; proximity is enough for the eye to read it as synced."
      }
    ],
    captions: [
      { at: 0, text: "Micro-case: the strobe ad. One product, backgrounds flickering behind it." },
      { at: 5, text: "You've seen these on TikTok — a cut every two or three frames." },
      { at: 10, text: "The trick is that the product never moves. Only the world does." },
      { at: 15, text: "Start with the product reference, locked as in lesson two." },
      { at: 20, text: "Generate the hero: dead-centre, fixed scale, plain background." },
      { at: 25, text: "Now the same product against a different location." },
      { at: 30, text: "Same framing prompt, different scene. One variable only." },
      { at: 35, text: "Six of these is plenty for a fifteen second ad." },
      { at: 40, text: "Because the product is anchored, the eye reads it as one object." },
      { at: 45, text: "The backgrounds do all the motion." },
      { at: 50, text: "The composer takes video, so each still becomes a short clip." },
      { at: 55, text: "Don't direct the motion — you'll see seventy milliseconds of it." },
      { at: 60, text: "Wire the clips into a composer node, in order." },
      { at: 65, text: "Set the transition to cut. Fades kill the strobe." },
      { at: 70, text: "Then trim hard. clipTrims takes a start and end per clip." },
      { at: 75, text: "Add a music track and let the cuts land near the beat." },
      { at: 80, text: "Run the composer. It renders server-side." },
      { at: 85, text: "Here it is — same cup, six worlds, fifteen seconds." },
      { at: 90, text: "Feels slow? Trim shorter. Feels cheap? Add colour variety." },
      { at: 95, text: "Promote it as the run's final video when you're happy." },
      { at: 100, text: "The format is one locked hero plus disposable backgrounds." },
      { at: 105, text: "That's a strobe ad." }
    ],
    faq: [
      {
        question: "Does the motion in each strobe clip matter?",
        answer: "No. The composer needs video on its clips port, so each still becomes a clip, but every background holds the screen for roughly seventy milliseconds and no motion is legible in that window. Spend the prompt on the framing constant instead — the cut is producing the energy, not the animation."
      },
      {
        question: "How many backgrounds does a strobe ad need?",
        answer: "Six to eight distinct locations carry a fifteen-second cut comfortably, because the clips repeat. Push past a dozen and the variety stops registering while the generation bill keeps climbing."
      }
    ]
  },
  {
    slug: "ugc-testimonial-one-scene",
    lang: "en",
    translationKey: "ugc-testimonial-one-scene",
    order: 5,
    kind: "micro-case",
    title: "Micro-case: a UGC testimonial in one scene",
    metaTitle: "Build a 3-Shot AI UGC Testimonial Ad | 6 min lesson",
    description: "Hook, demo, payoff — three shots that have to look like one person in one room. Learn the scene bible discipline that keeps an AI UGC testimonial from falling apart.",
    excerpt: "The format that still outperforms polish, and the one constraint that decides whether it survives three shots.",
    outcome: "Produce a three-shot UGC testimonial where the creator, room, and product stay continuous.",
    nodes: ["reference", "generate_image", "generate_video", "extract_frame", "composer"],
    datePublished: "2026-09-18",
    ogImageKey: "lesson-ugc-testimonial",
    tags: ["micro-case", "ugc", "consistency"],
    videoSeconds: 115,
    practiceMinutes: 4,
    video: {
      src: "/media/lessons/ugc-testimonial-one-scene.mp4",
      poster: "/media/lessons/ugc-testimonial-one-scene.jpg",
      width: 1440,
      height: 900
    },
    videoPending: true,
    prerequisites: [
      "Lesson two, for references.",
      "Lesson three, because you will re-run at least one keyframe before this is right."
    ],
    steps: [
      {
        at: 0,
        title: "Name the failure before you start",
        body: "The way UGC ads break is not bad rendering — it is three shots that read as three different people in three different rooms."
      },
      {
        at: 10,
        title: "Write a scene bible first",
        body: "One location, one outfit, one time of day, written down as fixed constants. Every prompt in the run repeats those words verbatim, which is what makes the shots belong to each other."
      },
      {
        at: 20,
        title: "Wire identity and product into the same keyframe",
        body: "A creator reference and a product reference both feed the generate image node. Order matters: identity first, product second, because referenceRoles is read in edge order."
      },
      {
        at: 40,
        title: "Generate all three keyframes before any motion",
        body: "Hook, demo, payoff — as stills, side by side. This is the review gate, and it is the cheap one."
      },
      {
        at: 65,
        title: "Fix drift at the still, never at the video",
        body: "If a face has drifted, re-run that keyframe now. Motion is the expensive step; sending a broken keyframe into it pays twice for the same mistake."
      },
      {
        at: 85,
        title: "Carry continuity with extract_frame",
        body: "Pull the last frame of shot one and use it as the keyframe for shot two. The cut then lands inside a continuous room instead of jumping between two guesses at one."
      },
      {
        at: 95,
        title: "Assemble with cuts",
        body: "Three clips into the composer in order, transition set to cut. UGC does not dissolve — a dissolve is the tell that a shoot was never there."
      }
    ],
    captions: [
      { at: 0, text: "Micro-case: the UGC testimonial. The format that outperforms polish." },
      { at: 5, text: "The failure mode is obvious: three shots, three different people." },
      { at: 10, text: "So before generating anything, write a scene bible." },
      { at: 15, text: "One location, one outfit, one time of day. Non-negotiable." },
      { at: 20, text: "Add a creator reference — the face that has to repeat." },
      { at: 25, text: "Add the product reference next to it." },
      { at: 30, text: "Both wire into the same generate image node." },
      { at: 35, text: "referenceRoles is ordered: identity first, product second." },
      { at: 40, text: "Shot one: the hook. Creator to camera, product in hand." },
      { at: 45, text: "The prompt repeats the scene bible word for word. Every time." },
      { at: 50, text: "Shot two: the demo. Closer in, hands on the product." },
      { at: 55, text: "Shot three: the payoff. Back to the face, product forward." },
      { at: 60, text: "Three keyframes, one world. Check them side by side." },
      { at: 65, text: "If a face drifted, re-run that keyframe now." },
      { at: 70, text: "Motion is expensive. Keyframes are cheap. Fix it at the cheap step." },
      { at: 75, text: "Now each keyframe gets its own generate video node." },
      { at: 80, text: "Five seconds each, phone-camera framing in the prompt." },
      { at: 85, text: "For continuity, extract the last frame of shot one..." },
      { at: 90, text: "...and use it as the keyframe for shot two." },
      { at: 95, text: "Wire all three clips into the composer, in order." },
      { at: 100, text: "Cut, not fade. UGC doesn't dissolve." },
      { at: 105, text: "Fifteen seconds, one creator, one room, one product." },
      { at: 110, text: "A testimonial ad nobody had to shoot." }
    ],
    faq: [
      {
        question: "What is a scene bible?",
        answer: "A scene bible is the short list of constants every prompt in a run must repeat — the location, the outfit, the time of day, the camera treatment. It exists because models re-invent anything you leave unstated, and re-invention between shots is exactly what makes an AI UGC ad look assembled."
      },
      {
        question: "Do I have to disclose that a testimonial is AI-generated?",
        answer: "Treat it as required. A synthetic creator is not a customer, so a generated testimonial should never be presented as a real person's experience, and most ad platforms now carry their own AI disclosure rules on top of that."
      }
    ]
  }
];
const byOrder = (a, b) => a.order - b.order;
const lessonsByLang = {
  en: lessons.filter((l) => l.lang === "en").sort(byOrder),
  es: lessons.filter((l) => l.lang === "es").sort(byOrder)
};
const learnLangs = Object.keys(lessonsByLang).filter(
  (lang) => lessonsByLang[lang].length > 0
);
const lessonPath = (lesson) => `${learnBasePath[lesson.lang]}/${lesson.slug}`;
const learnIndexPath = (lang) => learnBasePath[lang];
const lessonByPath = new Map(lessons.map((l) => [lessonPath(l), l]));
const lessonsByTranslationKey = (() => {
  const map = /* @__PURE__ */ new Map();
  for (const lesson of lessons) {
    const entry = map.get(lesson.translationKey) ?? {};
    entry[lesson.lang] = lesson;
    map.set(lesson.translationKey, entry);
  }
  return map;
})();
const lessonSibling = (lesson) => {
  const pair = lessonsByTranslationKey.get(lesson.translationKey);
  const other = lesson.lang === "en" ? "es" : "en";
  return pair?.[other];
};
const nextLesson = (lesson) => lessonsByLang[lesson.lang].find((l) => l.order === lesson.order + 1);
const absolute = (path) => `${siteBaseUrl}${path}`;
const lessonAlternates = (lesson) => {
  const pair = lessonsByTranslationKey.get(lesson.translationKey) ?? { [lesson.lang]: lesson };
  const alternates = [];
  Object.keys(pair).forEach((lang) => {
    const l = pair[lang];
    if (l) alternates.push({ hreflang: lang, href: absolute(lessonPath(l)) });
  });
  const xDefault = pair.en ?? lesson;
  alternates.push({ hreflang: "x-default", href: absolute(lessonPath(xDefault)) });
  return alternates;
};
const learnIndexAlternates = () => [
  ...learnLangs.map((lang) => ({ hreflang: lang, href: absolute(learnIndexPath(lang)) })),
  { hreflang: "x-default", href: absolute(learnIndexPath("en")) }
];
const learningMinutes = (lesson) => Math.round((lesson.videoSeconds / 60 + lesson.practiceMinutes) * 2) / 2;
const pathMinutes = (lang) => Math.round(lessonsByLang[lang].reduce((total, lesson) => total + learningMinutes(lesson), 0));
const formatMinutes = (minutes) => `${Number(minutes.toFixed(1))} min`;
const formatTimestamp = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
const formatSeconds = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const rest = seconds % 60;
  if (mins === 0) return `${rest}s`;
  return rest === 0 ? `${mins}m` : `${mins}m ${rest}s`;
};
const isoDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const rest = Math.round(seconds % 60);
  if (mins === 0 && rest === 0) return "PT0S";
  return `PT${mins > 0 ? `${mins}M` : ""}${rest > 0 ? `${rest}S` : ""}`;
};
const lessonTranscript = (lesson) => lesson.captions.map((c) => c.text).join(" ");
const learnRoutes = () => [
  ...learnLangs.map((lang) => learnIndexPath(lang)),
  ...lessons.map(lessonPath)
];
const learnPageMeta = {
  dateModified: "2026-09-18"
};
const trackGiftEvent$1 = (eventName, params) => {
  track(eventName, params);
};
const trackVideoPlay$1 = (page, video) => {
  trackGiftEvent$1("gift_video_play", {
    businessSlug: page.slug,
    businessName: page.businessName,
    videoTitle: video.title,
    videoAngle: video.angle
  });
};
const trackVideoDownload$1 = (page, video) => {
  trackGiftEvent$1("gift_video_download", {
    businessSlug: page.slug,
    businessName: page.businessName,
    videoTitle: video.title
  });
};
const slugifyFilePart$1 = (value) => value.toLowerCase().replace(/[^a-z0-9а-яё]+/gi, "-").replace(/^-|-$/g, "");
const getDownloadName$1 = (page, video, index = 0) => video.downloadName ?? `${page.slug}-${slugifyFilePart$1(video.title) || `concept-${index + 1}`}.mp4`;
const useGiftView = (page) => {
  useEffect(() => {
    trackGiftEvent$1("gift_view", {
      businessSlug: page.slug,
      businessName: page.businessName
    });
  }, [page.slug, page.businessName]);
};
const brandStyle = {
  "--v-cream": "#fff7e8",
  "--v-card": "#fffdf6",
  "--v-ink": "#1b1b1b",
  "--v-ink-soft": "#2d2d2d",
  "--v-orange": "#ef7d24",
  "--v-orange-deep": "#d96a14",
  "--v-amber": "#f9b732",
  "--v-muted": "#7d7d7d",
  "--shot-red": "#ff1100",
  fontFamily: "'Comfortaa', system-ui, sans-serif"
};
const display = "font-['Comfortaa',_system-ui,_sans-serif]";
const mono = "font-['JetBrains_Mono',_ui-monospace,_monospace]";
const ConceptCard = ({ page, video, index }) => /* @__PURE__ */ jsxs("article", { className: "flex h-full flex-col overflow-hidden rounded-[28px] bg-[var(--v-card)] shadow-[0_18px_50px_-26px_rgba(27,27,27,0.32)] ring-1 ring-[var(--v-ink)]/8", children: [
  /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/5] w-full overflow-hidden bg-[var(--v-ink)]", children: [
    video.poster ? /* @__PURE__ */ jsx("img", { src: video.poster, alt: video.title, loading: "lazy", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "h-full w-full bg-[linear-gradient(150deg,var(--v-orange)_0%,var(--v-amber)_120%)]" }),
    video.src ? /* @__PURE__ */ jsx(
      "video",
      {
        className: "absolute inset-0 h-full w-full object-cover",
        controls: true,
        playsInline: true,
        preload: "metadata",
        poster: video.poster,
        onPlay: () => trackVideoPlay$1(page, video),
        children: /* @__PURE__ */ jsx("source", { src: video.src, type: "video/mp4" })
      }
    ) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/15" }),
      /* @__PURE__ */ jsx("div", { className: "absolute left-4 top-4", children: /* @__PURE__ */ jsx("span", { className: `${mono} inline-flex items-center rounded-full bg-black/55 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur`, children: "превью-кадр" }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg", children: /* @__PURE__ */ jsx("span", { className: "ml-1 h-0 w-0 border-y-[11px] border-l-[18px] border-y-transparent border-l-[var(--v-orange)]" }) }) })
    ] })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col p-6", children: [
    /* @__PURE__ */ jsxs("p", { className: "text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--v-orange-deep)]", children: [
      "Концепт 0",
      index + 1
    ] }),
    /* @__PURE__ */ jsx("h3", { className: `${display} mt-3 text-2xl font-bold leading-tight text-[var(--v-ink)]`, children: video.title }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 text-[15px] leading-relaxed text-[var(--v-ink)]/75", children: video.angle }),
    video.caption ? /* @__PURE__ */ jsx("p", { className: "mt-4 border-t border-[var(--v-ink)]/10 pt-4 text-[13px] leading-relaxed text-[var(--v-muted)]", children: video.caption }) : null,
    video.src ? /* @__PURE__ */ jsx(
      "a",
      {
        href: video.src,
        download: getDownloadName$1(page, video, index),
        onClick: () => trackVideoDownload$1(page, video),
        className: `${display} mt-auto inline-flex w-full items-center justify-center rounded-full bg-[var(--v-ink)] px-5 py-3.5 text-sm font-bold text-[var(--v-cream)] transition-colors hover:bg-[var(--v-ink-soft)]`,
        children: "Скачать MP4"
      }
    ) : /* @__PURE__ */ jsx("div", { className: `${display} mt-auto inline-flex w-full items-center justify-center rounded-full border-2 border-dashed border-[var(--v-ink)]/20 px-5 py-3 text-sm font-bold text-[var(--v-ink)]/45`, children: "Финальный ролик добавим позже" })
  ] })
] });
function VarkaGiftPage({ page }) {
  useGiftView(page);
  const ctaParams = { businessSlug: page.slug, businessName: page.businessName };
  return /* @__PURE__ */ jsxs("div", { style: brandStyle, className: "min-h-screen bg-[var(--v-cream)] text-[var(--v-ink)] antialiased selection:bg-[var(--v-orange)] selection:text-white", children: [
    /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-50 bg-black text-white", children: [
      /* @__PURE__ */ jsx("div", { className: "h-1 w-full bg-[var(--shot-red)]" }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 md:px-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 md:gap-4", children: [
          /* @__PURE__ */ jsx(BrandLink, {}),
          /* @__PURE__ */ jsx("span", { className: "hidden h-5 w-px bg-white/20 sm:block" }),
          page.logo ? /* @__PURE__ */ jsx("img", { src: page.logo, alt: page.businessName, className: "hidden h-5 w-auto opacity-90 sm:block" }) : null
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 md:gap-5", children: [
          /* @__PURE__ */ jsxs("span", { className: `${mono} hidden text-[10px] font-bold uppercase tracking-[0.18em] text-white/55 md:inline`, children: [
            "gift for ",
            page.businessName
          ] }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: page.ctaHref,
              onClick: () => trackGiftEvent$1("gift_cta_click", { ...ctaParams, ctaLocation: "nav" }),
              className: `${mono} inline-flex shrink-0 items-center justify-center bg-[var(--shot-red)] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90`,
              children: page.ctaLabel
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[var(--v-orange)]/30 blur-3xl", "aria-hidden": true }),
        /* @__PURE__ */ jsx("div", { className: "absolute -bottom-28 -left-24 h-96 w-96 rounded-full bg-[var(--v-amber)]/35 blur-3xl", "aria-hidden": true }),
        /* @__PURE__ */ jsxs("div", { className: "relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[1.05fr_0.95fr]", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "inline-flex items-center gap-2 rounded-full bg-[var(--v-orange)]/15 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--v-orange-deep)]", children: page.heroEyebrow }),
            /* @__PURE__ */ jsx("h1", { className: `${display} mt-6 text-[2.1rem] font-bold leading-[1.1] tracking-tight text-[var(--v-ink)] sm:text-[2.7rem] md:text-[3.3rem]`, children: page.heroTitle }),
            /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-xl text-[17px] leading-relaxed text-[var(--v-ink)]/75 md:text-lg", children: page.note }),
            /* @__PURE__ */ jsx("div", { className: "mt-8 grid max-w-md grid-cols-3 gap-3", children: (page.proofPoints ?? []).map((point) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white p-4 ring-1 ring-[var(--v-ink)]/8", children: [
              /* @__PURE__ */ jsx("p", { className: `${display} text-xl font-bold leading-none text-[var(--v-orange-deep)]`, children: point.value }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-[12px] font-medium leading-tight text-[var(--v-muted)]", children: point.label })
            ] }, point.label)) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-9 flex flex-col gap-3 sm:flex-row", children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "#gift-videos",
                  className: `${display} inline-flex items-center justify-center rounded-full bg-[var(--v-orange)] px-7 py-4 text-base font-bold text-white transition-transform hover:-translate-y-0.5`,
                  children: "Посмотреть концепты"
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: page.ctaHref,
                  onClick: () => trackGiftEvent$1("gift_cta_click", { ...ctaParams, ctaLocation: "hero" }),
                  className: `${display} inline-flex items-center justify-center rounded-full border-2 border-[var(--v-ink)]/15 px-7 py-4 text-base font-bold text-[var(--v-ink)] transition-colors hover:border-[var(--v-ink)] hover:bg-[var(--v-ink)] hover:text-[var(--v-cream)]`,
                  children: page.ctaLabel
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mx-auto w-full max-w-[460px]", children: /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-[32px] bg-[var(--v-card)] p-3 shadow-[0_40px_90px_-44px_rgba(27,27,27,0.5)] ring-1 ring-[var(--v-ink)]/8", children: [
            /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-[24px]", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "/media/gifts/varka/cafe-cozy.jpg",
                alt: "Кофейня VARKA",
                className: "aspect-[4/5] w-full object-cover"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 px-3 py-3.5", children: [
              /* @__PURE__ */ jsx("p", { className: `${mono} text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--v-muted)]`, children: "реальная кофейня VARKA" }),
              /* @__PURE__ */ jsx("span", { className: "shrink-0 rounded-full bg-[var(--v-orange)]/15 px-3 py-1.5 text-[12px] font-bold text-[var(--v-orange-deep)]", children: "уют у дома" })
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "bg-[var(--v-ink)] text-[var(--v-cream)]", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24", children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--v-amber)]", children: page.whyEyebrow }),
          /* @__PURE__ */ jsx("h2", { className: `${display} mt-3 text-[1.9rem] font-bold leading-tight md:text-[2.9rem]`, children: page.whyTitle }),
          /* @__PURE__ */ jsx("p", { className: "mt-5 text-[17px] leading-relaxed text-[var(--v-cream)]/80", children: page.whyBody })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4", children: (page.metrics ?? []).map((m) => /* @__PURE__ */ jsxs("div", { className: "rounded-[22px] bg-white/[0.06] p-5 ring-1 ring-white/10", children: [
          /* @__PURE__ */ jsx("p", { className: `${display} text-3xl font-bold leading-none text-[var(--v-amber)] md:text-4xl`, children: m.value }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-[13px] font-medium leading-tight text-[var(--v-cream)]/65", children: m.label })
        ] }, m.label)) }),
        /* @__PURE__ */ jsx("div", { className: "mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4", children: (page.contentEngines ?? []).map((engine) => /* @__PURE__ */ jsxs("article", { className: "overflow-hidden rounded-[24px] bg-white/[0.05] ring-1 ring-white/10", children: [
          engine.image ? /* @__PURE__ */ jsx("img", { src: engine.image, alt: engine.title, loading: "lazy", className: "aspect-[16/11] w-full object-cover" }) : null,
          /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
            /* @__PURE__ */ jsx("h3", { className: `${display} text-base font-bold leading-tight text-[var(--v-cream)]`, children: engine.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-[13px] leading-relaxed text-[var(--v-cream)]/65", children: engine.body })
          ] })
        ] }, engine.title)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { id: "gift-videos", className: "bg-[var(--v-cream)]", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24", children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--v-orange-deep)]", children: page.videoSectionEyebrow }),
          /* @__PURE__ */ jsx("h2", { className: `${display} mt-3 text-[1.9rem] font-bold leading-tight text-[var(--v-ink)] md:text-[2.9rem]`, children: page.videoSectionTitle }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-[17px] leading-relaxed text-[var(--v-ink)]/70", children: page.videoSectionBody })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-10 overflow-hidden rounded-[24px] bg-black text-white", children: [
          /* @__PURE__ */ jsx("div", { className: "h-1 w-full bg-[var(--shot-red)]" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6 p-7 md:grid-cols-[0.5fr_1.5fr] md:p-9", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: `${mono} text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--shot-red)]`, children: "SHOT.IS · AI note" }),
              /* @__PURE__ */ jsx("h3", { className: `${display} mt-3 text-2xl font-bold leading-tight`, children: page.aiNoteTitle })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-[15px] leading-relaxed text-white/80", children: [
              /* @__PURE__ */ jsx("p", { children: page.aiNoteBody }),
              /* @__PURE__ */ jsx("p", { children: page.aiNoteFollowup })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", children: page.videos.map((video, index) => /* @__PURE__ */ jsx(ConceptCard, { page, video, index }, `${video.title}-${index}`)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-white", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--v-orange-deep)]", children: [
          "Почему именно ",
          page.businessName
        ] }),
        /* @__PURE__ */ jsx("h2", { className: `${display} mt-3 max-w-3xl text-[1.9rem] font-bold leading-tight text-[var(--v-ink)] md:text-[2.9rem]`, children: "Сделано под реальный бренд, а не по шаблону." }),
        /* @__PURE__ */ jsx("div", { className: "mt-10 grid grid-cols-1 gap-6 md:grid-cols-3", children: (page.brandReasons ?? []).map((reason) => /* @__PURE__ */ jsxs("article", { className: "rounded-[28px] bg-[var(--v-cream)] p-7 ring-1 ring-[var(--v-ink)]/8", children: [
          /* @__PURE__ */ jsx("div", { className: "h-1.5 w-12 rounded-full bg-[var(--v-orange)]" }),
          /* @__PURE__ */ jsx("h3", { className: `${display} mt-5 text-xl font-bold leading-tight text-[var(--v-ink)]`, children: reason.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-[15px] leading-relaxed text-[var(--v-ink)]/75", children: reason.body })
        ] }, reason.title)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-[var(--v-cream)]", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--v-orange-deep)]", children: page.howToUseEyebrow }),
          /* @__PURE__ */ jsx("h2", { className: `${display} mt-3 text-[1.9rem] font-bold leading-tight text-[var(--v-ink)] md:text-[2.9rem]`, children: page.howToUseTitle }),
          /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-xl text-[17px] leading-relaxed text-[var(--v-ink)]/75", children: page.howToUseBody })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4", children: (page.sprintOutputs ?? []).map((output, index) => /* @__PURE__ */ jsxs("article", { className: "flex items-center gap-5 rounded-[24px] bg-white p-5 ring-1 ring-[var(--v-ink)]/8", children: [
          /* @__PURE__ */ jsxs("span", { className: `${display} flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--v-orange)] text-base font-bold text-white`, children: [
            "0",
            index + 1
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[16px] font-medium leading-snug text-[var(--v-ink)]/90", children: output })
        ] }, output)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-[var(--v-orange)] text-white", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-6xl flex-col gap-8 px-5 py-16 md:flex-row md:items-end md:justify-between md:px-8 md:py-24", children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[12px] font-bold uppercase tracking-[0.16em] text-white/75", children: page.finalEyebrow }),
          /* @__PURE__ */ jsx("h2", { className: `${display} mt-3 text-[2.1rem] font-bold leading-tight md:text-[3.2rem]`, children: page.finalTitle }),
          /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-2xl text-[17px] leading-relaxed text-white/90", children: page.offer })
        ] }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: page.ctaHref,
            onClick: () => trackGiftEvent$1("gift_cta_click", { ...ctaParams, ctaLocation: "offer" }),
            className: `${display} inline-flex shrink-0 items-center justify-center rounded-full bg-[var(--v-ink)] px-8 py-4 text-base font-bold text-white transition-colors hover:bg-black`,
            children: page.ctaLabel
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "bg-black text-white", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 px-5 py-8 md:flex-row md:items-center md:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(BrandLink, {}),
        /* @__PURE__ */ jsxs("span", { className: `${mono} text-[10px] uppercase tracking-[0.16em] text-white/45`, children: [
          "gift for ",
          page.businessName,
          " · made by SHOT.IS"
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: page.ctaHref,
          onClick: () => trackGiftEvent$1("gift_cta_click", { ...ctaParams, ctaLocation: "footer" }),
          className: `${mono} inline-flex items-center justify-center bg-[var(--shot-red)] px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90`,
          children: page.ctaLabel
        }
      )
    ] }) })
  ] });
}
const bespokeGiftPages = {
  varka: VarkaGiftPage
};
const trackGiftEvent = (eventName, params) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
};
const trackVideoPlay = (page, video) => {
  trackGiftEvent("gift_video_play", {
    businessSlug: page.slug,
    businessName: page.businessName,
    videoTitle: video.title,
    videoAngle: video.angle
  });
};
const trackVideoDownload = (page, video) => {
  trackGiftEvent("gift_video_download", {
    businessSlug: page.slug,
    businessName: page.businessName,
    videoTitle: video.title
  });
};
const slugifyFilePart = (value) => value.toLowerCase().replace(/[^a-z0-9а-яё]+/gi, "-").replace(/^-|-$/g, "");
const getDownloadName = (page, video, index = 0) => video.downloadName ?? `${page.slug}-${slugifyFilePart(video.title) || `concept-${index + 1}`}.mp4`;
const getProofPoints = (page) => page.proofPoints ?? [
  { value: "Free", label: "gift for your team" },
  { value: "MP4", label: "download included" },
  { value: "Post", label: "try it on your channels" }
];
const getSprintOutputs = (page) => page.sprintOutputs ?? [
  "Download the files and share them with your team.",
  "Try posting one organically or use it as a paid-social draft.",
  "If it gets a signal, ask us for a cleaner batch in the same direction."
];
const defaultBrandReasons = (page) => [
  {
    title: `Built around ${page.businessName}`,
    body: "The ideas on this page should feel specific to the brand, not like generic AI ad samples."
  },
  {
    title: "Free to review",
    body: "The page is framed as a useful sample: watch, download, test, and only then decide whether to continue."
  },
  {
    title: "Easy to expand",
    body: "If one direction works, SHOT.IS can turn it into a larger batch of hooks, captions, and edit variants."
  }
];
const VideoFrame = ({
  page,
  video,
  featured = false,
  isRu = false
}) => {
  if (!video.src) {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: `flex aspect-[4/5] w-full flex-col justify-between border border-white/10 bg-[var(--gift-dark)] p-5 ${featured ? "min-h-[340px] md:min-h-[420px]" : "min-h-[300px] md:min-h-[360px]"}`,
        children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "gift-label text-[10px] font-black uppercase text-[var(--gift-accent)]", children: isRu ? "Место для видео" : "Video placeholder" }),
            /* @__PURE__ */ jsx("h3", { className: "gift-title mt-5 text-3xl uppercase leading-[0.95] text-white md:text-4xl", children: video.title })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "gift-copy max-w-sm text-sm font-bold leading-relaxed text-white/58 md:text-base", children: isRu ? "Финальный MP4 и poster можно добавить позже. Заглушка держит верстку стабильной до готовых роликов." : "MP4 and poster can be added later. The page keeps the layout stable before final video assets are ready." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "video",
    {
      className: `aspect-[9/16] w-full bg-black object-cover ${featured ? "" : "max-h-[680px] md:max-h-[560px]"}`,
      controls: true,
      playsInline: true,
      preload: "metadata",
      poster: video.poster,
      onPlay: () => trackVideoPlay(page, video),
      children: /* @__PURE__ */ jsx("source", { src: video.src, type: "video/mp4" })
    }
  );
};
function GiftPage({ page }) {
  const heroVideo = page.videos[0];
  const theme = page.theme ?? defaultTheme;
  const isRu = page.language === "ru";
  const proofPoints = getProofPoints(page);
  const sprintOutputs = getSprintOutputs(page);
  const brandReasons = page.brandReasons ?? defaultBrandReasons(page);
  const ctaParams = {
    businessSlug: page.slug,
    businessName: page.businessName
  };
  const themeStyle = {
    "--gift-accent": theme.accent,
    "--gift-hero-from": theme.heroFrom,
    "--gift-hero-to": theme.heroTo,
    "--gift-light": theme.light,
    "--gift-dark": theme.dark
  };
  useEffect(() => {
    trackGiftEvent("gift_view", ctaParams);
  }, [page.businessName, page.slug]);
  return /* @__PURE__ */ jsxs("div", { style: themeStyle, className: "gift-page min-h-screen bg-black text-white selection:bg-[var(--gift-accent)] selection:text-white", children: [
    /* @__PURE__ */ jsx("div", { className: "grain", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-50 border-b border-white/10 bg-black/90 px-4 py-4 backdrop-blur-xl md:px-8", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsx(BrandLink, {}),
      /* @__PURE__ */ jsx("div", { className: "hidden gift-label text-[10px] font-bold uppercase text-white/45 md:block", children: isRu ? `Бесплатные видео для ${page.businessName}` : `Free videos for ${page.businessName}` }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: page.ctaHref,
          onClick: () => trackGiftEvent("gift_cta_click", { ...ctaParams, ctaLocation: "nav" }),
          className: "gift-label inline-flex shrink-0 items-center justify-center bg-white px-3 py-2.5 text-[9px] font-black uppercase text-black transition-colors hover:bg-[var(--gift-accent)] hover:text-white sm:px-4 md:px-6 md:py-3 md:text-[10px]",
          children: page.ctaLabel
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden border-b border-white/10 px-4 py-14 md:px-8 md:py-20", children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_78%_14%,color-mix(in_srgb,var(--gift-accent)_36%,transparent),transparent_34%),linear-gradient(135deg,var(--gift-hero-from)_0%,#111_52%,var(--gift-hero-to)_100%)]" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:84px_84px] opacity-18" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:items-center", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "gift-label mb-5 inline-flex border border-[var(--gift-accent)]/45 bg-white/5 px-3 py-2.5 text-[9px] font-black uppercase text-[var(--gift-accent)] md:mb-6 md:px-4 md:py-3 md:text-[10px]", children: page.heroEyebrow ?? (isRu ? "Бесплатный видео-подарок" : "Free video gift") }),
            /* @__PURE__ */ jsx("h1", { className: "gift-display max-w-5xl text-[2.75rem] uppercase leading-[0.92] sm:text-[3.6rem] md:text-[5rem] xl:text-[5.7rem]", children: page.heroTitle ?? (isRu ? `Мы сделали эти видео для ${page.businessName}.` : `We made these videos for ${page.businessName}.`) }),
            /* @__PURE__ */ jsx("p", { className: "gift-copy mt-6 max-w-2xl text-base font-bold leading-snug text-white/70 md:mt-7 md:text-2xl md:leading-tight", children: page.note }),
            /* @__PURE__ */ jsx("div", { className: "mt-7 grid max-w-2xl grid-cols-3 gap-2 md:mt-8 md:gap-3", children: proofPoints.map((point) => /* @__PURE__ */ jsxs("div", { className: "border border-white/10 bg-white/[0.05] p-3 md:p-4", children: [
              /* @__PURE__ */ jsx("p", { className: "gift-title text-xl uppercase leading-none text-white md:text-3xl", children: point.value }),
              /* @__PURE__ */ jsx("p", { className: "gift-label mt-2 text-[8px] font-bold uppercase leading-tight text-white/48 md:text-[10px]", children: point.label })
            ] }, point.label)) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-9 flex flex-col gap-3 sm:flex-row", children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "#gift-videos",
                  className: "gift-label inline-flex items-center justify-center bg-[var(--gift-accent)] px-7 py-5 text-xs font-black uppercase text-white transition-colors hover:bg-white hover:text-black",
                  children: isRu ? "Посмотреть видео" : "Watch the videos"
                }
              ),
              heroVideo?.src ? /* @__PURE__ */ jsx(
                "a",
                {
                  href: heroVideo.src,
                  download: getDownloadName(page, heroVideo),
                  onClick: () => trackVideoDownload(page, heroVideo),
                  className: "gift-label inline-flex items-center justify-center border border-white/18 px-7 py-5 text-xs font-black uppercase text-white transition-colors hover:border-[var(--gift-accent)] hover:text-[var(--gift-accent)]",
                  children: isRu ? "Скачать MP4 бесплатно" : "Download free MP4"
                }
              ) : /* @__PURE__ */ jsx("span", { className: "gift-label inline-flex items-center justify-center border border-white/18 px-7 py-5 text-xs font-black uppercase text-white/42", children: isRu ? "MP4 скоро добавим" : "MP4 coming soon" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mx-auto w-full max-w-[440px] lg:mr-0", children: /* @__PURE__ */ jsxs("div", { className: "border border-white/14 bg-white/[0.06] p-3 shadow-[0_28px_90px_color-mix(in_srgb,var(--gift-accent)_24%,transparent)]", children: [
            /* @__PURE__ */ jsx(VideoFrame, { page, video: heroVideo, featured: true, isRu }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 bg-white px-4 py-4 text-black", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "gift-label text-[9px] font-black uppercase text-[var(--gift-accent)]", children: isRu ? "Главная идея" : "Featured concept" }),
                /* @__PURE__ */ jsx("p", { className: "gift-title mt-1 text-lg uppercase leading-none", children: heroVideo.title })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "gift-label shrink-0 bg-black px-3 py-2 text-[10px] font-black uppercase text-white", children: heroVideo.src ? isRu ? "Free" : "Free" : "Soon" })
            ] }),
            heroVideo.src ? /* @__PURE__ */ jsx(
              "a",
              {
                href: heroVideo.src,
                download: getDownloadName(page, heroVideo),
                onClick: () => trackVideoDownload(page, heroVideo),
                className: "gift-label flex items-center justify-center bg-[var(--gift-accent)] px-5 py-4 text-xs font-black uppercase text-white transition-colors hover:bg-white hover:text-black",
                children: isRu ? "Скачать это видео" : "Download this video"
              }
            ) : /* @__PURE__ */ jsx("div", { className: "gift-label flex items-center justify-center bg-white/10 px-5 py-4 text-xs font-black uppercase text-white/45", children: isRu ? "Финальный MP4 добавим позже" : "Final MP4 coming soon" })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { id: "gift-videos", className: "bg-[var(--gift-light)] px-4 py-14 text-black md:px-8 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-10 grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "gift-label mb-4 text-[10px] font-black uppercase text-[var(--gift-accent)]", children: page.videoSectionEyebrow ?? (isRu ? "Готово к просмотру" : "Ready to review") }),
            /* @__PURE__ */ jsx("h2", { className: "gift-display max-w-3xl text-[2.25rem] uppercase leading-[0.95] md:text-[4.25rem]", children: page.videoSectionTitle ?? (isRu ? "Скачайте. Попробуйте. Оставьте себе." : "Download them. Try them. Keep them.") })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "gift-copy max-w-2xl text-base font-bold leading-relaxed text-black/62 md:text-lg", children: page.videoSectionBody ?? (isRu ? "Эти видео можно бесплатно посмотреть, скачать и протестировать после проверки командой." : "These videos are free for you to review and experiment with. You can post one, send it to your team, or use it as a reference for the kind of content SHOT.IS can produce.") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-8 grid grid-cols-1 gap-5 border border-black/10 bg-white/70 p-5 md:grid-cols-[0.55fr_1.45fr] md:p-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "gift-label text-[10px] font-black uppercase text-[var(--gift-accent)]", children: isRu ? "AI-примечание" : "AI content note" }),
            /* @__PURE__ */ jsx("h3", { className: "gift-title mt-3 text-2xl uppercase leading-none md:text-3xl", children: page.aiNoteTitle ?? (isRu ? "Сгенерировано с помощью AI." : "Generated with AI.") })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "gift-copy space-y-3 text-sm font-bold leading-relaxed text-black/64 md:text-base", children: [
            /* @__PURE__ */ jsx("p", { children: page.aiNoteBody ?? (isRu ? `Эти sample-видео были сгенерированы с помощью AI-инструментов как бесплатный креативный preview для ${page.businessName}. Перед публикацией проверьте тексты, визуалы, факты и правила площадок.` : `These sample videos were generated with AI tools and prepared as a free creative preview for ${page.businessName}. Please review the copy, claims, visuals, and platform rules before publishing.`) }),
            /* @__PURE__ */ jsx("p", { children: page.aiNoteFollowup ?? (isRu ? "Если направление подходит для реальной кампании, SHOT.IS может доработать монтаж, captions и варианты для теста." : "If you want to use the direction in a real campaign, SHOT.IS can refine the edit, adjust messaging, add captions, and prepare cleaner variants for testing.") })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3", children: page.videos.map((video, index) => /* @__PURE__ */ jsxs(
          "article",
          {
            className: "flex h-full min-h-0 flex-col overflow-hidden border border-black/10 bg-black text-white",
            children: [
              /* @__PURE__ */ jsx("div", { className: "bg-black", children: /* @__PURE__ */ jsx(VideoFrame, { page, video, isRu }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col p-5 md:p-6", children: [
                /* @__PURE__ */ jsx("p", { className: "gift-label text-[10px] font-black uppercase text-[var(--gift-accent)]", children: isRu ? `Концепт 0${index + 1}` : `Concept 0${index + 1}` }),
                /* @__PURE__ */ jsx("h3", { className: "gift-title mt-4 text-[1.9rem] uppercase leading-[0.95] md:text-3xl", children: video.title }),
                /* @__PURE__ */ jsx("p", { className: "gift-copy mt-4 text-sm font-medium leading-relaxed text-white/66 md:text-base", children: video.angle }),
                video.caption ? /* @__PURE__ */ jsx("p", { className: "gift-copy mt-5 border-t border-white/10 pt-4 text-[11px] font-bold uppercase leading-relaxed text-white/48 md:text-xs", children: video.caption }) : null,
                video.src ? /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: video.src,
                    download: getDownloadName(page, video, index),
                    onClick: () => trackVideoDownload(page, video),
                    className: "gift-label mt-auto inline-flex w-full items-center justify-center bg-white px-5 py-4 text-xs font-black uppercase text-black transition-colors hover:bg-[var(--gift-accent)] hover:text-white",
                    children: isRu ? "Скачать MP4" : "Download MP4"
                  }
                ) : /* @__PURE__ */ jsx("div", { className: "gift-label mt-auto inline-flex w-full items-center justify-center bg-white/10 px-5 py-4 text-xs font-black uppercase text-white/42", children: isRu ? "Видео добавим позже" : "Video coming soon" })
              ] })
            ]
          },
          `${video.title}-${index}`
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-black px-4 py-16 text-white md:px-8 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
        /* @__PURE__ */ jsx("p", { className: "gift-label mb-4 text-[10px] font-black uppercase text-[var(--gift-accent)]", children: isRu ? `Почему именно ${page.businessName}` : `Why ${page.businessName}` }),
        /* @__PURE__ */ jsx("h2", { className: "gift-display max-w-4xl text-[2.25rem] uppercase leading-[0.95] md:text-[4.25rem]", children: isRu ? "Оффер привязан к реальному бренду, а не к шаблону." : "The offer is built around the real brand, not a template." }),
        /* @__PURE__ */ jsx("div", { className: "mt-10 grid grid-cols-1 gap-4 md:grid-cols-3", children: brandReasons.map((reason) => /* @__PURE__ */ jsxs("article", { className: "border border-white/10 bg-white/[0.04] p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "gift-title text-2xl uppercase leading-none", children: reason.title }),
          /* @__PURE__ */ jsx("p", { className: "gift-copy mt-5 text-sm font-bold leading-relaxed text-white/58 md:text-base", children: reason.body })
        ] }, reason.title)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-[var(--gift-dark)] px-4 py-16 text-white md:px-8 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl grid-cols-1 gap-10 xl:grid-cols-[0.95fr_1.05fr] xl:items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "gift-label mb-4 text-[10px] font-black uppercase text-[var(--gift-accent)]", children: page.howToUseEyebrow ?? (isRu ? "Как использовать" : "How to use it") }),
          /* @__PURE__ */ jsx("h2", { className: "gift-display text-[2.25rem] uppercase leading-[0.95] md:text-[4.25rem]", children: page.howToUseTitle ?? (isRu ? "Относитесь к этому как к бесплатному креативному sample." : "Treat it like a free creative sample.") }),
          /* @__PURE__ */ jsx("p", { className: "gift-copy mt-6 max-w-2xl text-lg font-bold leading-tight text-white/64 md:text-2xl", children: page.howToUseBody ?? (isRu ? "Скачайте MP4, протестируйте один ролик в безопасном посте или используйте их как черновики для маркетинговой команды." : "Download the MP4s, test one in a low-risk post, or use them as drafts for your marketing team. If the direction feels close, we can polish and expand it.") })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-3", children: sprintOutputs.map((output, index) => /* @__PURE__ */ jsx("article", { className: "border border-white/10 bg-white/[0.04] p-5 md:p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxs("span", { className: "gift-label flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--gift-accent)] text-[10px] font-black uppercase text-white", children: [
            "0",
            index + 1
          ] }),
          /* @__PURE__ */ jsx("p", { className: "gift-copy text-base font-black leading-tight text-white/80 md:text-xl", children: output })
        ] }) }, output)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-[var(--gift-accent)] px-4 py-16 text-white md:px-8 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-4xl", children: [
          /* @__PURE__ */ jsx("p", { className: "gift-label mb-4 text-[10px] font-black uppercase text-white/72", children: page.finalEyebrow ?? (isRu ? "Следующий шаг" : "Next step") }),
          /* @__PURE__ */ jsx("h2", { className: "gift-display text-[2.25rem] uppercase leading-[0.95] md:text-[4.5rem]", children: page.finalTitle ?? (isRu ? `Хотите более чистую пачку для ${page.businessName}?` : `Want a cleaner batch for ${page.businessName}?`) }),
          /* @__PURE__ */ jsx("p", { className: "gift-copy mt-5 max-w-3xl text-lg font-bold leading-tight text-white/78 md:text-2xl", children: page.offer ?? (isRu ? `Мы можем расширить это в более чистые short-form варианты для ${page.businessName}, готовые к review и тесту.` : `We can expand this into more polished short-form variants for ${page.businessName}, ready for your team to review and test.`) })
        ] }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: page.ctaHref,
            onClick: () => trackGiftEvent("gift_cta_click", { ...ctaParams, ctaLocation: "footer" }),
            className: "gift-label inline-flex shrink-0 items-center justify-center bg-black px-8 py-5 text-xs font-black uppercase text-white transition-colors hover:bg-white hover:text-black",
            children: page.ctaLabel
          }
        )
      ] }) })
    ] })
  ] });
}
function HeroSection() {
  const videoRef = useRef(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const widthQuery = window.matchMedia("(min-width: 768px)");
    const evaluate = () => {
      const wantsMotion = !motionQuery.matches;
      const isWide = widthQuery.matches;
      setShouldPlay(wantsMotion && isWide);
    };
    evaluate();
    motionQuery.addEventListener("change", evaluate);
    widthQuery.addEventListener("change", evaluate);
    return () => {
      motionQuery.removeEventListener("change", evaluate);
      widthQuery.removeEventListener("change", evaluate);
    };
  }, []);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!shouldPlay) {
      video.pause();
      return;
    }
    const idle = window.requestIdleCallback;
    const start = () => {
      void video.play().catch(() => {
      });
    };
    if (typeof idle === "function") {
      idle(start);
    } else {
      window.setTimeout(start, 250);
    }
  }, [shouldPlay]);
  return /* @__PURE__ */ jsxs("section", { className: "relative flex min-h-[100dvh] w-full scroll-mt-16 flex-col items-center justify-center overflow-hidden px-5 pb-28 pt-32 text-center md:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "hero-stage", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsx(
        "video",
        {
          ref: videoRef,
          className: "hero-stage__video",
          loop: true,
          muted: true,
          playsInline: true,
          preload: "none",
          poster: "/media/hero/shot-hero-poster.webp",
          children: shouldPlay ? /* @__PURE__ */ jsx("source", { src: "/media/hero/shot-hero-loop.mp4", type: "video/mp4" }) : null
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "hero-stage__veil" }),
      /* @__PURE__ */ jsx("div", { className: "hero-stage__grid" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto w-full max-w-7xl", children: [
      /* @__PURE__ */ jsx("p", { className: "mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent md:text-xs", children: "Self-serve AI UGC ad generator + managed production" }),
      /* @__PURE__ */ jsxs("h1", { className: "mb-12 text-[clamp(2.05rem,9vw,8.75rem)] font-extrabold uppercase leading-[0.88] tracking-tight md:leading-[0.82]", children: [
        "AI UGC ADS ",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsxs("span", { className: "text-exclusion-fill italic", children: [
          "THAT SHIP ",
          /* @__PURE__ */ jsx("br", { className: "sm:hidden" }),
          "IN DAYS."
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto mb-16 max-w-3xl text-lg font-medium leading-tight text-white/65 sm:text-xl md:text-3xl", children: "Generate an AI video yourself from $4.99, buy a pack for creative testing, or hand the full campaign to the SHOT.IS managed studio." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: withUtm("https://studio.shot.is/", "hero"),
            onClick: () => trackStudioClick("hero"),
            className: "inline-flex min-h-16 w-full items-center justify-center bg-white px-7 py-5 text-center text-[11px] font-black uppercase tracking-[0.24em] text-black transition-all hover:-rotate-1 hover:bg-accent hover:text-white active:scale-95 sm:w-auto md:px-10 md:text-xs",
            children: "Create a $4.99 video"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/contact",
            onClick: () => trackCta("hero", "managed_production"),
            className: "inline-flex min-h-16 w-full items-center justify-center border border-white/25 bg-black/20 px-7 py-5 text-center text-[11px] font-black uppercase tracking-[0.24em] text-white transition-all hover:border-white hover:bg-white hover:text-black active:scale-95 sm:w-auto md:px-10 md:text-xs",
            children: "Managed production"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-white/40", children: "Launch offer · Video packs available in Studio" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-4 opacity-30", children: [
      /* @__PURE__ */ jsx("span", { className: "font-mono text-[9px] uppercase tracking-widest", children: "Scroll" }),
      /* @__PURE__ */ jsx("div", { className: "h-16 w-px bg-white" })
    ] })
  ] });
}
const demoNodes = [
  { id: "reference", kind: "Input · refs", title: "Reference", runtime: 420, inputs: [], isInput: true },
  { id: "direction", kind: "Input · prompt", title: "Direction", runtime: 320, inputs: [], isInput: true },
  { id: "keyframe", kind: "Generate · image", title: "Keyframe", runtime: 1250, inputs: ["reference", "direction"] },
  { id: "motion", kind: "Generate · video", title: "Motion", runtime: 1600, inputs: ["keyframe"] },
  { id: "composer", kind: "Assemble · cut", title: "Composer", runtime: 900, inputs: ["motion"] }
];
demoNodes.map((node) => node.id);
const generatedNodeIds = demoNodes.filter((node) => !node.isInput).map((node) => node.id);
const referenceAssets = [
  {
    id: "mascot",
    label: "Mascot",
    file: "gorilla-mascot.png",
    image: "/media/work/ref-mascot.jpg",
    alt: "Brand mascot reference: the gorilla character"
  },
  {
    id: "product",
    label: "Product",
    file: "gorilla-can-packshot.jpg",
    image: "/media/work/ref-product.jpg",
    alt: "Product reference: the energy drink can"
  },
  {
    id: "creator",
    label: "Creator",
    file: "creator-persona-01.jpg",
    image: "/media/work/ref-creator.jpg",
    alt: "Creator persona reference used for UGC-style variants"
  }
];
const demoPresets = [
  {
    id: "retro",
    usesReference: "mascot",
    label: "Retro arcade",
    prompt: "Late-night bedroom arcade. CRT glow, RGB spill, practical lamps, handheld camera, product on the desk.",
    imageModel: "Grok Imagine · 9:16",
    videoModel: "Kling · 4s · 1080p",
    keyframe: "/media/work/key-retro.jpg",
    keyframeAlt: "Generated keyframe: character at a CRT desk setup lit by RGB spill",
    motionClip: "/media/work/reel-01.mp4",
    motionPoster: "/media/work/reel-01.jpg",
    strip: ["/media/work/reel-01.jpg", "/media/work/reel-03.jpg", "/media/work/reel-05.jpg"],
    output: "/media/work/campaign-retro.mp4",
    outputPoster: "/media/work/campaign-retro-poster.jpg",
    outputName: "retro-arcade-cut.mp4",
    outputAlt: "Final retro arcade campaign cut",
    cuts: 3,
    seconds: 9
  },
  {
    id: "neon",
    usesReference: "product",
    label: "Neon packshot",
    prompt: "Studio packshot on black. Neon rim light, volumetric haze, slow orbit, hard specular on the can.",
    imageModel: "Grok Imagine · 9:16",
    videoModel: "Kling · 4s · 1080p",
    keyframe: "/media/work/key-neon.jpg",
    keyframeAlt: "Generated keyframe: product packshot on a neon grid backdrop",
    motionClip: "/media/work/reel-02.mp4",
    motionPoster: "/media/work/reel-02.jpg",
    strip: ["/media/work/reel-02.jpg", "/media/work/reel-04.jpg", "/media/work/reel-06.jpg"],
    output: "/media/work/campaign-neon.mp4",
    outputPoster: "/media/work/campaign-neon-poster.jpg",
    outputName: "neon-packshot-cut.mp4",
    outputAlt: "Final neon packshot campaign cut",
    cuts: 3,
    seconds: 6
  },
  {
    id: "ugc",
    usesReference: "creator",
    label: "Creator UGC",
    prompt: "Creator holds the product in a warm bar interior. Phone-camera framing, ambient practicals, natural motion.",
    imageModel: "Grok Imagine · 9:16",
    videoModel: "Kling · 5s · 1080p",
    keyframe: "/media/work/key-ugc.jpg",
    keyframeAlt: "Generated keyframe: creator persona in a warm bar interior",
    motionClip: "/media/reel/visual-overload.mp4",
    motionPoster: "/media/reel/visual-overload-poster.jpg",
    strip: ["/media/work/key-ugc.jpg", "/media/reel/visual-overload-poster.jpg", "/media/work/key-ugc.jpg"],
    output: "/media/work/campaign-ugc.mp4",
    outputPoster: "/media/work/campaign-ugc-poster.jpg",
    outputName: "creator-ugc-cut.mp4",
    outputAlt: "Final creator UGC campaign cut",
    cuts: 2,
    seconds: 5
  }
];
const defaultPresetId = "retro";
const nodeLogLines = {
  reference: (preset) => `resolve ${referenceAssets.length} refs → use ${referenceAssets.find((asset) => asset.id === preset.usesReference)?.file}`,
  direction: (preset) => `parse direction "${preset.label.toLowerCase()}"`,
  keyframe: (preset) => `${preset.imageModel.split(" · ")[0].toLowerCase()}: keyframe from 2 refs`,
  motion: (preset) => `${preset.videoModel.split(" · ")[0].toLowerCase()}: image→video, ${preset.videoModel.split(" · ")[1]}`,
  composer: (preset) => `compose ${preset.cuts} cuts → ${preset.seconds}s · 1080×1920`
};
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}
const statusLabel = {
  idle: "idle",
  queued: "queued",
  running: "running",
  fresh: "fresh",
  cached: "cached",
  stale: "stale"
};
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
const idleStatuses = () => Object.fromEntries(demoNodes.map((node) => [node.id, "idle"]));
const zeroProgress = () => Object.fromEntries(demoNodes.map((node) => [node.id, 0]));
const MANUAL_SECONDS_PER_NODE = 14;
function ProgressBar({ value }) {
  return /* @__PURE__ */ jsx("div", { className: "cx-progress", "aria-hidden": "true", children: /* @__PURE__ */ jsx("i", { style: { transform: `scaleX(${value})` } }) });
}
function NodeBody({
  node,
  status,
  preset,
  autoplay
}) {
  const videoRef = useRef(null);
  const settled = status === "fresh" || status === "cached";
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [preset.id, node.id]);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (settled && autoplay) {
      void video.play().catch(() => {
      });
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [settled, autoplay, preset.id]);
  const busy = status === "running" ? "is-generating" : "";
  const placeholder = (label, meta) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "cx-media cx-media--empty", children: /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: label }) }),
    /* @__PURE__ */ jsx("p", { className: "cx-meta", children: meta })
  ] });
  if (!node.isInput && (status === "idle" || status === "queued")) {
    return placeholder(
      status === "queued" ? "queued" : "no output yet",
      node.id === "composer" ? "awaiting upstream" : preset.imageModel.split(" · ")[0]
    );
  }
  if (failed) return placeholder("preview unavailable", "asset not loaded");
  switch (node.id) {
    case "reference": {
      const active = referenceAssets.find((asset) => asset.id === preset.usesReference) ?? referenceAssets[0];
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "cx-media cx-media--refset", children: [
          /* @__PURE__ */ jsx("div", { className: "cx-refset__main", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: active.image,
              alt: active.alt,
              loading: "lazy",
              decoding: "async",
              onError: () => setFailed(true)
            },
            active.image
          ) }),
          /* @__PURE__ */ jsx("div", { className: "cx-refset__chips", children: referenceAssets.map((asset) => /* @__PURE__ */ jsx(
            "span",
            {
              className: asset.id === active.id ? "is-active" : "",
              style: { backgroundImage: `url(${asset.image})` },
              title: asset.label,
              "aria-hidden": "true"
            },
            asset.id
          )) })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "cx-meta", children: [
          referenceAssets.length,
          " refs · using ",
          active.file
        ] })
      ] });
    }
    case "direction":
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "cx-media cx-media--prompt", children: /* @__PURE__ */ jsx("p", { children: preset.prompt }) }),
        /* @__PURE__ */ jsxs("p", { className: "cx-meta", children: [
          /* @__PURE__ */ jsx("span", { className: "cx-chip", children: "editable" }),
          " 1 of ",
          demoPresets.length,
          " directions"
        ] })
      ] });
    case "keyframe":
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: `cx-media cx-media--gen ${busy}`, children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: preset.keyframe,
              alt: preset.keyframeAlt,
              loading: "lazy",
              decoding: "async",
              onError: () => setFailed(true)
            },
            preset.keyframe
          ),
          status === "running" ? /* @__PURE__ */ jsx("span", { className: "cx-scan", "aria-hidden": "true" }) : null
        ] }),
        /* @__PURE__ */ jsx("p", { className: "cx-meta", children: preset.imageModel })
      ] });
    case "motion":
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: `cx-media cx-media--motion ${busy}`, children: [
          /* @__PURE__ */ jsx(
            "video",
            {
              ref: videoRef,
              src: preset.motionClip,
              poster: preset.motionPoster,
              muted: true,
              loop: true,
              playsInline: true,
              preload: "none",
              "aria-hidden": "true",
              onError: () => setFailed(true)
            },
            preset.motionClip
          ),
          status === "running" ? /* @__PURE__ */ jsx("span", { className: "cx-scan", "aria-hidden": "true" }) : null,
          settled ? /* @__PURE__ */ jsx("span", { className: "cx-badge", children: "loop" }) : null
        ] }),
        /* @__PURE__ */ jsx("p", { className: "cx-meta", children: preset.videoModel })
      ] });
    case "composer":
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "cx-media cx-media--strip", children: [
          /* @__PURE__ */ jsx("div", { className: "cx-strip", "aria-hidden": "true", children: preset.strip.map((frame, index) => /* @__PURE__ */ jsx("span", { style: { backgroundImage: `url(${frame})` } }, `${frame}-${index}`)) }),
          /* @__PURE__ */ jsxs("div", { className: "cx-timeline", "aria-hidden": "true", children: [
            /* @__PURE__ */ jsx("i", { style: { width: "38%" } }),
            /* @__PURE__ */ jsx("i", { style: { width: "26%" }, className: "is-accent" }),
            /* @__PURE__ */ jsx("i", { style: { width: "36%" } })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "cx-meta", children: [
          preset.cuts,
          " cuts · ",
          preset.seconds,
          "s · 1080×1920"
        ] })
      ] });
    default:
      return null;
  }
}
function CanvasDemoSection() {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState("idle");
  const [statuses, setStatuses] = useState(idleStatuses);
  const [progress, setProgress] = useState(zeroProgress);
  const [log, setLog] = useState([]);
  const [queue, setQueue] = useState([]);
  const [step, setStep] = useState(0);
  const [selectedId, setSelectedId] = useState(defaultPresetId);
  const [renderedId, setRenderedId] = useState(defaultPresetId);
  const [soundOn, setSoundOn] = useState(false);
  const selected = demoPresets.find((preset) => preset.id === selectedId) ?? demoPresets[0];
  const rendered = demoPresets.find((preset) => preset.id === renderedId) ?? demoPresets[0];
  const isRunning = phase === "running";
  const hasOutput = phase === "done" || phase === "dirty";
  const isDirty = phase === "dirty";
  const cachedCount = Object.values(statuses).filter((status) => status === "cached").length;
  const freshCount = Object.values(statuses).filter((status) => status === "fresh" || status === "cached").length;
  const runningNode = isRunning ? queue[step] : void 0;
  useEffect(() => {
    if (!isRunning) return;
    const nodeId = queue[step];
    if (!nodeId) {
      setPhase("done");
      setRenderedId(selectedId);
      setLog((lines) => [...lines, `done · ${queue.length} node${queue.length === 1 ? "" : "s"} executed`].slice(-40));
      return;
    }
    const node = demoNodes.find((candidate) => candidate.id === nodeId);
    const runtime = reducedMotion ? 120 : node.runtime;
    const tick = 60;
    const started = performance.now();
    setStatuses((current) => ({ ...current, [nodeId]: "running" }));
    const timer = window.setInterval(() => {
      const ratio = Math.min(1, (performance.now() - started) / runtime);
      setProgress((current) => ({ ...current, [nodeId]: ratio }));
      if (ratio < 1) return;
      window.clearInterval(timer);
      setStatuses((current) => ({ ...current, [nodeId]: "fresh" }));
      setLog((lines) => [...lines, nodeLogLines[nodeId](selected)].slice(-40));
      setStep((current) => current + 1);
    }, tick);
    return () => window.clearInterval(timer);
  }, [isRunning, queue, step, reducedMotion, selected, selectedId]);
  const startRun = useCallback(
    (ids, event) => {
      setQueue(ids);
      setStep(0);
      setProgress(zeroProgress());
      setStatuses((current) => {
        const next = { ...current };
        ids.forEach((id) => {
          next[id] = "queued";
        });
        return next;
      });
      setPhase("running");
      track(event, { preset: selectedId, node_count: ids.length });
    },
    [selectedId]
  );
  const runAll = () => {
    setLog([`run graph · ${demoNodes.length} nodes · direction "${selected.label.toLowerCase()}"`]);
    startRun(
      demoNodes.map((node) => node.id),
      "canvas_demo_run"
    );
  };
  const runChanged = () => {
    setLog((lines) => [...lines, `re-run · ${generatedNodeIds.length} stale · ${cachedCount} cached`].slice(-40));
    startRun(generatedNodeIds, "canvas_demo_run_stale");
  };
  const selectPreset = (preset) => {
    if (isRunning || preset.id === selectedId) return;
    setSelectedId(preset.id);
    track("canvas_demo_prompt_change", { preset: preset.id });
    if (phase === "idle") return;
    if (preset.id === renderedId) {
      setPhase("done");
      setStatuses((current) => {
        const next = { ...current };
        demoNodes.forEach((node) => {
          next[node.id] = "fresh";
        });
        return next;
      });
      return;
    }
    setPhase("dirty");
    setStatuses((current) => {
      const next = { ...current };
      next.reference = "cached";
      next.direction = "fresh";
      generatedNodeIds.forEach((id) => {
        next[id] = "stale";
      });
      return next;
    });
    setLog((lines) => [...lines, `direction changed → ${generatedNodeIds.length} nodes stale`].slice(-40));
  };
  const reset = () => {
    setPhase("idle");
    setStatuses(idleStatuses());
    setProgress(zeroProgress());
    setQueue([]);
    setStep(0);
    setLog([]);
    setSelectedId(defaultPresetId);
    setRenderedId(defaultPresetId);
    track("canvas_demo_replay");
  };
  const sectionRef = useRef(null);
  const autoRunRef = useRef(false);
  const runAllRef = useRef(runAll);
  runAllRef.current = runAll;
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting) || autoRunRef.current) return;
        autoRunRef.current = true;
        observer.disconnect();
        runAllRef.current();
      },
      { threshold: 0.25 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  const boardRef = useRef(null);
  const portRefs = useRef(/* @__PURE__ */ new Map());
  const [edges, setEdges] = useState([]);
  const [boardBox, setBoardBox] = useState({ width: 0, height: 0 });
  const setPort = useCallback((key, element) => {
    if (element) portRefs.current.set(key, element);
    else portRefs.current.delete(key);
  }, []);
  const measure = useCallback(() => {
    const board = boardRef.current;
    if (!board) return;
    const box = board.getBoundingClientRect();
    if (!box.width) return;
    const next = [];
    demoNodes.forEach((node) => {
      node.inputs.forEach((input) => {
        const from = portRefs.current.get(`${input}:out`);
        const to = portRefs.current.get(`${node.id}:in`);
        if (!from || !to) return;
        const a = from.getBoundingClientRect();
        const b = to.getBoundingClientRect();
        const x1 = a.left + a.width / 2 - box.left;
        const y1 = a.top + a.height / 2 - box.top;
        const x2 = b.left + b.width / 2 - box.left;
        const y2 = b.top + b.height / 2 - box.top;
        const bend = Math.max(26, (x2 - x1) * 0.55);
        next.push({
          id: `${input}->${node.id}`,
          from: input,
          to: node.id,
          d: `M ${x1},${y1} C ${x1 + bend},${y1} ${x2 - bend},${y2} ${x2},${y2}`
        });
      });
    });
    setBoardBox({ width: box.width, height: box.height });
    setEdges(next);
  }, []);
  useIsomorphicLayoutEffect(() => {
    measure();
  }, [measure, selectedId, statuses]);
  useEffect(() => {
    const board = boardRef.current;
    if (!board || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => measure());
    observer.observe(board);
    board.querySelectorAll(".cx-node").forEach((node) => observer.observe(node));
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);
  const outputRef = useRef(null);
  const [outputFailed, setOutputFailed] = useState(false);
  useEffect(() => setOutputFailed(false), [renderedId]);
  useEffect(() => {
    const video = outputRef.current;
    if (!video || !hasOutput) return;
    video.muted = !soundOn;
    if (reducedMotion) return;
    void video.play().catch(() => {
    });
  }, [hasOutput, renderedId, soundOn, reducedMotion]);
  const edgeState = (edge) => {
    const target = statuses[edge.to];
    if (target === "stale") return "is-stale";
    if (target === "running") return "is-flowing";
    if (target === "fresh" || target === "cached") return "is-live";
    return "";
  };
  const liveMessage = useMemo(() => {
    if (isRunning && runningNode) return `${demoNodes.find((n) => n.id === runningNode)?.title} is running.`;
    if (isDirty) return `Direction changed. ${generatedNodeIds.length} nodes need a re-run, ${cachedCount} stay cached.`;
    if (hasOutput) return `Workflow complete. ${rendered.outputName} is ready.`;
    return "Demo graph ready to run.";
  }, [isRunning, runningNode, isDirty, hasOutput, cachedCount, rendered.outputName]);
  const runLabel = isRunning ? `Running ${step + 1}/${queue.length}…` : isDirty ? `Re-run ${generatedNodeIds.length} stale nodes` : hasOutput ? "All nodes fresh" : "Run workflow";
  return /* @__PURE__ */ jsx("section", { id: "product", className: "cx-section", "data-testid": "canvas-demo", ref: sectionRef, children: /* @__PURE__ */ jsxs("div", { className: "cx-wrap", children: [
    /* @__PURE__ */ jsxs("header", { className: "cx-intro", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "cx-kicker", children: "Canvas mode · interactive demo" }),
        /* @__PURE__ */ jsxs("h2", { children: [
          "Build the whole ad.",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { children: "Re-run only what changed." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "cx-intro__aside", children: [
        /* @__PURE__ */ jsx("p", { children: "References, prompts, image and video models wired into one re-runnable graph. Swap a creative direction and Canvas keeps every approved result that is still valid." }),
        /* @__PURE__ */ jsx("a", { href: "/blog/canvas-mode-node-based-ai-video-workflow", children: "How Canvas works ↗" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "cx-shell", children: [
      /* @__PURE__ */ jsxs("div", { className: "cx-toolbar", children: [
        /* @__PURE__ */ jsxs("span", { className: "cx-toolbar__project", children: [
          /* @__PURE__ */ jsx("i", { className: "cx-dot", "aria-hidden": "true" }),
          "gorilla-energy / 9:16 launch"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "cx-toolbar__meta", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("b", { children: freshCount }),
            "/",
            demoNodes.length,
            " fresh"
          ] }),
          /* @__PURE__ */ jsx("span", { children: "server-side graph" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "cx-workspace", children: [
        /* @__PURE__ */ jsxs("div", { className: "cx-board", ref: boardRef, "aria-label": "Example AI video production graph", children: [
          /* @__PURE__ */ jsx(
            "svg",
            {
              className: "cx-edges",
              viewBox: `0 0 ${boardBox.width || 1} ${boardBox.height || 1}`,
              width: boardBox.width || void 0,
              height: boardBox.height || void 0,
              "aria-hidden": "true",
              children: edges.map((edge) => /* @__PURE__ */ jsxs("g", { className: `cx-edge ${edgeState(edge)}`, children: [
                /* @__PURE__ */ jsx("path", { className: "cx-edge__base", d: edge.d }),
                /* @__PURE__ */ jsx("path", { className: "cx-edge__flow", d: edge.d })
              ] }, edge.id))
            }
          ),
          demoNodes.map((node, index) => {
            const status = statuses[node.id];
            return /* @__PURE__ */ jsxs("article", { className: `cx-node cx-node--${node.id} is-${status}`, "data-node": node.id, children: [
              index > 0 ? /* @__PURE__ */ jsx("span", { className: `cx-rail is-${status}`, "aria-hidden": "true" }) : null,
              /* @__PURE__ */ jsxs("div", { className: "cx-node__head", children: [
                /* @__PURE__ */ jsx("span", { className: "cx-step", "aria-hidden": "true", children: index + 1 }),
                /* @__PURE__ */ jsx("span", { className: "cx-node__kind", children: node.kind }),
                /* @__PURE__ */ jsxs("span", { className: `cx-status cx-status--${status}`, children: [
                  status === "running" ? /* @__PURE__ */ jsx("i", { className: "cx-spinner", "aria-hidden": "true" }) : null,
                  statusLabel[status]
                ] })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "cx-node__title", children: node.title }),
              /* @__PURE__ */ jsx(
                NodeBody,
                {
                  node,
                  status,
                  preset: !node.isInput && status === "stale" ? rendered : selected,
                  autoplay: !reducedMotion
                }
              ),
              status === "running" ? /* @__PURE__ */ jsx(ProgressBar, { value: progress[node.id] }) : null,
              node.inputs.length ? /* @__PURE__ */ jsx(
                "span",
                {
                  className: "cx-port cx-port--in",
                  ref: (element) => setPort(`${node.id}:in`, element),
                  "aria-hidden": "true"
                }
              ) : null,
              node.id !== "composer" ? /* @__PURE__ */ jsx(
                "span",
                {
                  className: "cx-port cx-port--out",
                  ref: (element) => setPort(`${node.id}:out`, element),
                  "aria-hidden": "true"
                }
              ) : null
            ] }, node.id);
          })
        ] }),
        /* @__PURE__ */ jsxs("aside", { className: "cx-output", children: [
          /* @__PURE__ */ jsxs("div", { className: "cx-output__head", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { children: "Final output" }),
              /* @__PURE__ */ jsx("strong", { children: hasOutput ? rendered.outputName : "awaiting render" })
            ] }),
            hasOutput ? /* @__PURE__ */ jsx("span", { className: isDirty ? "cx-tag is-stale" : "cx-tag is-ready", children: isDirty ? "outdated" : "ready" }) : null
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "cx-player", children: [
            hasOutput && !outputFailed ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                "video",
                {
                  ref: outputRef,
                  src: rendered.output,
                  poster: rendered.outputPoster,
                  loop: true,
                  muted: !soundOn,
                  playsInline: true,
                  preload: "metadata",
                  "aria-label": rendered.outputAlt,
                  onError: () => setOutputFailed(true)
                },
                rendered.id
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "cx-sound",
                  onClick: () => setSoundOn((on) => !on),
                  "aria-pressed": soundOn,
                  children: soundOn ? "Sound on" : "Sound off"
                }
              )
            ] }) : hasOutput && outputFailed ? /* @__PURE__ */ jsxs("div", { className: "cx-player__empty", children: [
              /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "!" }),
              /* @__PURE__ */ jsx("p", { children: "Preview unavailable. Open Canvas in Studio to watch the render." })
            ] }) : /* @__PURE__ */ jsxs("div", { className: "cx-player__empty", children: [
              /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "▶" }),
              /* @__PURE__ */ jsx("p", { children: "Run the graph to render the campaign cut." })
            ] }),
            isDirty ? /* @__PURE__ */ jsxs("div", { className: "cx-player__veil", children: [
              /* @__PURE__ */ jsx("span", { children: "previous render" }),
              /* @__PURE__ */ jsxs("strong", { children: [
                generatedNodeIds.length,
                " changes pending"
              ] })
            ] }) : null
          ] }),
          /* @__PURE__ */ jsxs("dl", { className: "cx-specs", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { children: "Format" }),
              /* @__PURE__ */ jsx("dd", { children: "1080×1920" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { children: "Length" }),
              /* @__PURE__ */ jsx("dd", { children: hasOutput ? `${rendered.seconds}s` : "—" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("dt", { children: "Cached" }),
              /* @__PURE__ */ jsxs("dd", { children: [
                cachedCount,
                "/",
                demoNodes.length
              ] })
            ] })
          ] }),
          isDirty ? /* @__PURE__ */ jsxs("p", { className: "cx-saving", children: [
            "Re-running ",
            generatedNodeIds.length,
            " of ",
            demoNodes.length,
            " nodes —",
            " ",
            /* @__PURE__ */ jsxs("b", { children: [
              "~",
              cachedCount * MANUAL_SECONDS_PER_NODE,
              "s of work reused."
            ] })
          ] }) : null
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "cx-console", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx("span", { className: "cx-console__label", children: "log" }),
        /* @__PURE__ */ jsx("div", { className: "cx-console__lines", children: log.length === 0 ? /* @__PURE__ */ jsx("p", { className: "is-muted", children: "waiting for run…" }) : log.slice(-3).map((line, index, all) => /* @__PURE__ */ jsxs("p", { className: index === all.length - 1 ? "is-current" : "", children: [
          /* @__PURE__ */ jsx("i", { children: "›" }),
          line
        ] }, `${line}-${index}`)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "cx-controls", children: [
        /* @__PURE__ */ jsxs("div", { className: "cx-presets", children: [
          /* @__PURE__ */ jsx("span", { children: "Creative direction" }),
          /* @__PURE__ */ jsx("div", { role: "group", "aria-label": "Creative direction presets", children: demoPresets.map((preset) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              disabled: isRunning,
              "aria-pressed": preset.id === selectedId,
              onClick: () => selectPreset(preset),
              children: preset.label
            },
            preset.id
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "cx-actions", children: [
          hasOutput && !isRunning ? /* @__PURE__ */ jsx("button", { type: "button", className: "cx-reset", onClick: reset, children: "Reset" }) : null,
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              className: "cx-run",
              disabled: isRunning || phase === "done",
              onClick: isDirty ? runChanged : runAll,
              children: [
                runLabel,
                /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "▶" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "sr-only", "aria-live": "polite", children: liveMessage })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "cx-foot", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "One graph." }),
        " Every reference, model, branch and final render — visible, cached and reusable."
      ] }),
      /* @__PURE__ */ jsxs("a", { href: withUtm("https://studio.shot.is/", "canvas_demo"), onClick: () => trackStudioClick("canvas_demo"), children: [
        "Open Canvas in Studio ",
        /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "↗" })
      ] })
    ] })
  ] }) });
}
const apiOrigin = () => {
  if (typeof window !== "undefined" && /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname)) {
    return "http://localhost:3001";
  }
  return "https://studio.shot.is";
};
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"];
const captureUtm = () => {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) utm[key] = value;
  }
  return utm;
};
class WaitlistError extends Error {
}
const joinWaitlist = async (email, location, honeypot = "") => {
  let res;
  try {
    res = await fetch(`${apiOrigin()}/api/public/waitlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        consent: true,
        source: location,
        path: typeof window === "undefined" ? void 0 : window.location.pathname,
        referrer: typeof document === "undefined" ? void 0 : document.referrer || void 0,
        utm: captureUtm(),
        website: honeypot || void 0
      })
    });
  } catch {
    throw new WaitlistError("Network error — check your connection and try again.");
  }
  const body = await res.json().catch(() => null);
  if (!res.ok) {
    throw new WaitlistError(
      body?.error?.message ?? (res.status === 429 ? "Too many requests from this network. Try again tomorrow or email hello@shot.is." : "Something broke on our side. Email hello@shot.is and we will add you manually.")
    );
  }
  return {
    alreadyJoined: Boolean(body?.alreadyJoined),
    position: typeof body?.position === "number" ? body.position : 0
  };
};
function JoinSection() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "submitting") return;
    trackCta("join_section", "request_managed_quote");
    setStatus("submitting");
    setMessage("");
    try {
      const result = await joinWaitlist(email, "join_section", website);
      setMessage(
        result.alreadyJoined ? "We already have this email — we will follow up about managed production." : "Request received — we will follow up about managed production."
      );
      setStatus("joined");
      setEmail("");
      trackWaitlist("join_section", result.alreadyJoined ? "already_joined" : "joined");
    } catch (error) {
      setMessage(
        error instanceof WaitlistError ? error.message : "Something broke on our side. Email hello@shot.is and we will add you manually."
      );
      setStatus("error");
      trackWaitlist("join_section", "error");
    }
  };
  return /* @__PURE__ */ jsxs("section", { id: "join", className: "relative overflow-hidden bg-accent px-5 py-32 text-white md:px-8 md:py-60", children: [
    /* @__PURE__ */ jsx("div", { className: "carbon-fibre absolute inset-0 opacity-10 mix-blend-overlay", "aria-hidden": "true" }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto max-w-5xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-20 text-center md:mb-24", children: [
        /* @__PURE__ */ jsxs("h2", { className: "mb-8 text-5xl font-black uppercase leading-[0.85] tracking-tight sm:text-6xl md:text-[88px] lg:text-[120px]", children: [
          "MAKE ONE. ",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "mix-blend-difference", children: "THEN SCALE IT." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg font-bold uppercase italic tracking-[0.35em] opacity-80 md:text-2xl", children: "Start self-serve today, or ask the managed studio to deliver the campaign." })
      ] }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: withUtm("https://studio.shot.is/", "join_section"),
          onClick: () => trackStudioClick("join_section"),
          className: "mx-auto mb-16 flex min-h-16 max-w-2xl items-center justify-center bg-white px-8 py-5 text-center text-sm font-black uppercase tracking-[0.28em] text-black transition-all hover:-rotate-1 hover:bg-black hover:text-white md:text-base",
          children: "Create a $4.99 video"
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "mb-8 text-center font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/70", children: "Need finished variants? Request managed production." }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "mx-auto flex max-w-2xl flex-col items-center", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            value: email,
            onChange: (event) => setEmail(event.target.value),
            placeholder: "YOUR_WORK_EMAIL",
            required: true,
            autoComplete: "email",
            disabled: status === "submitting",
            "aria-describedby": "join-status",
            className: "input-underlined mb-12 text-center font-black uppercase placeholder:text-white/20 disabled:opacity-50"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "website",
            value: website,
            onChange: (event) => setWebsite(event.target.value),
            tabIndex: -1,
            autoComplete: "off",
            "aria-hidden": "true",
            className: "pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: status === "submitting",
            className: "w-full bg-black py-6 text-base font-black uppercase tracking-[0.35em] transition-all hover:bg-white hover:text-black disabled:cursor-wait disabled:opacity-70 md:py-8 md:text-xl md:tracking-[0.5em]",
            children: status === "submitting" ? "Sending…" : status === "joined" ? "Request received" : "Request managed quote"
          }
        ),
        /* @__PURE__ */ jsx(
          "p",
          {
            id: "join-status",
            role: "status",
            "aria-live": "polite",
            className: `mt-8 min-h-[1.5rem] text-center font-mono text-[11px] font-bold uppercase tracking-[0.28em] ${status === "error" ? "text-black" : "opacity-80"}`,
            children: message
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-center font-mono text-[11px] font-bold uppercase tracking-[0.28em] opacity-60", children: "Managed work is scoped per brief. Self-serve video packs are priced live in Studio." }),
        /* @__PURE__ */ jsxs("p", { className: "mt-4 text-center font-mono text-[10px] uppercase tracking-[0.24em] opacity-45", children: [
          "We will email you about SHOT.IS. Unsubscribe any time.",
          " ",
          /* @__PURE__ */ jsx("a", { href: "/privacy", className: "underline underline-offset-4", children: "Privacy" })
        ] })
      ] })
    ] })
  ] });
}
function LessonsSection() {
  const lessons2 = lessonsByLang.en;
  if (lessons2.length === 0) return null;
  return /* @__PURE__ */ jsx("section", { id: "learn", className: "bg-black px-5 py-24 text-white md:px-8 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-14 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent", children: "Video lessons" }),
        /* @__PURE__ */ jsx("h2", { className: "max-w-5xl text-[2.35rem] font-black uppercase leading-[0.9] tracking-tight sm:text-5xl md:text-[72px] lg:text-[84px]", children: "Learn the studio in a minute at a time." })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "max-w-xl text-base font-medium leading-relaxed text-white/60 md:text-lg lg:justify-self-end", children: [
        "Real screencasts of the canvas — no slides, no talking head. Each one rebuilds a single thing end to end and says up front how long it takes: ",
        formatMinutes(pathMinutes("en")),
        " for the whole path."
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-3", children: lessons2.slice(0, 3).map((lesson, index) => /* @__PURE__ */ jsxs(
      "a",
      {
        href: lessonPath(lesson),
        onClick: () => trackCta("lessons_section", lesson.title),
        "data-reveal": true,
        className: "reveal-text group flex flex-col rounded-[4px] border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-accent/50 hover:bg-white/[0.05] md:p-8",
        style: { transitionDelay: `${index * 0.08}s` },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 font-mono text-[10px] font-bold uppercase tracking-[0.24em]", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-accent", children: [
              "Lesson ",
              lesson.order
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-white/40", children: formatSeconds(lesson.videoSeconds) })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "mt-6 text-2xl font-black uppercase leading-[0.95] tracking-tight transition-colors group-hover:text-accent md:text-3xl", children: lesson.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 flex-1 text-base font-medium leading-relaxed text-white/55", children: lesson.excerpt }),
          /* @__PURE__ */ jsxs("p", { className: "mt-7 border-t border-white/10 pt-5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent", children: [
            formatMinutes(learningMinutes(lesson)),
            " to learn"
          ] })
        ]
      },
      lesson.slug
    )) }),
    /* @__PURE__ */ jsxs(
      "a",
      {
        href: learnIndexPath("en"),
        onClick: () => trackCta("lessons_section", "All lessons"),
        className: "mt-10 inline-flex items-center justify-center border border-white/20 px-9 py-5 text-[11px] font-black uppercase tracking-[0.26em] text-white transition-all hover:-rotate-1 hover:border-accent hover:bg-accent",
        children: [
          "All ",
          lessons2.length,
          " lessons"
        ]
      }
    )
  ] }) });
}
const studioUrl = "https://studio.shot.is/";
const launchOffer = {
  price: "$4.99",
  priceValue: "4.99",
  currency: "USD",
  unit: "per video",
  note: "Limited-time self-serve price. The model, duration, and credit cost are shown in Studio before you generate."
};
const pricingOptions = [
  {
    id: "single",
    eyebrow: "Self-serve",
    title: "One AI video",
    price: launchOffer.price,
    unit: launchOffer.unit,
    description: "Start with one real generation instead of a subscription. Bring a prompt or reference, choose the model, and see the cost before the run starts.",
    features: [
      "No monthly plan required for the launch offer",
      "Reference-aware image-to-video workflows",
      "Model and credit cost visible before generation"
    ],
    cta: "Create a $4.99 video",
    href: studioUrl,
    studio: true,
    featured: true
  },
  {
    id: "packs",
    eyebrow: "For testing volume",
    title: "Video packs",
    price: "Volume pricing",
    unit: "live in Studio",
    description: "Buy a video pack when one concept needs several hooks, scenes, or creator variants. Current pack sizes and checkout pricing stay visible inside Studio.",
    features: [
      "Built for multi-variant creative testing",
      "Credits can be routed across supported models",
      "Current package pricing shown at checkout"
    ],
    cta: "See video packs",
    href: studioUrl,
    studio: true
  },
  {
    id: "managed",
    eyebrow: "Done for you",
    title: "Managed production",
    price: "Custom",
    unit: "per campaign brief",
    description: "SHOT.IS plans, generates, reviews, and assembles the campaign for teams that want finished ad variants rather than another production tool to operate.",
    features: [
      "Creative direction and shot planning",
      "Human QA for faces, products, and continuity",
      "Finished edits and named testing variants"
    ],
    cta: "Brief the managed studio",
    href: "/contact",
    studio: false
  }
];
const pricingPageMeta = {
  path: "/pricing",
  dateModified: "2026-08-25",
  title: "SHOT.IS Pricing — AI Videos from $4.99",
  description: "Create one AI video for $4.99 during the SHOT.IS launch offer, choose volume video packs in Studio, or brief the managed production team for campaign-ready ad variants."
};
function PricingCards({ location }) {
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-3", children: pricingOptions.map((option, index) => {
    const href = option.studio ? withUtm(option.href, location) : option.href;
    const priceClass = option.id === "packs" ? "text-[clamp(2rem,3.2vw,2.55rem)]" : option.id === "managed" ? "text-[clamp(2.1rem,3.4vw,2.8rem)]" : "text-[clamp(2.3rem,6vw,4.4rem)]";
    return /* @__PURE__ */ jsxs(
      "article",
      {
        "data-reveal": true,
        className: `reveal-text flex min-h-[500px] flex-col rounded-[4px] border p-6 md:p-8 ${option.featured ? "border-accent bg-accent text-white" : "border-white/10 bg-white/[0.03] text-white"}`,
        style: { transitionDelay: `${index * 0.08}s` },
        children: [
          /* @__PURE__ */ jsx(
            "p",
            {
              className: `font-mono text-[10px] font-bold uppercase tracking-[0.28em] ${option.featured ? "text-white/75" : "text-accent"}`,
              children: option.eyebrow
            }
          ),
          /* @__PURE__ */ jsx("h3", { className: "mt-6 text-3xl font-black uppercase leading-[0.92] tracking-tight md:text-4xl", children: option.title }),
          /* @__PURE__ */ jsxs("div", { className: "mt-10", children: [
            /* @__PURE__ */ jsx("div", { className: `${priceClass} max-w-full break-normal font-black uppercase leading-none tracking-tight`, children: option.price }),
            /* @__PURE__ */ jsx("p", { className: `mt-3 font-mono text-[10px] font-bold uppercase tracking-[0.24em] ${option.featured ? "text-white/70" : "text-white/45"}`, children: option.unit })
          ] }),
          /* @__PURE__ */ jsx("p", { className: `mt-8 text-base font-medium leading-relaxed ${option.featured ? "text-white/85" : "text-white/60"}`, children: option.description }),
          /* @__PURE__ */ jsx("ul", { className: "mt-8 space-y-3", children: option.features.map((feature) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-sm font-semibold leading-relaxed", children: [
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: option.featured ? "text-white" : "text-accent", children: "→" }),
            /* @__PURE__ */ jsx("span", { className: option.featured ? "text-white/85" : "text-white/65", children: feature })
          ] }, feature)) }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href,
              onClick: () => option.studio ? trackStudioClick(location) : trackCta(location, option.cta),
              className: `mt-auto inline-flex min-h-14 items-center justify-center px-6 py-4 text-center text-[11px] font-black uppercase tracking-[0.22em] transition-all hover:-rotate-1 ${option.featured ? "bg-white text-black hover:bg-black hover:text-white" : "bg-white text-black hover:bg-accent hover:text-white"}`,
              children: option.cta
            }
          )
        ]
      },
      option.id
    );
  }) });
}
function PricingSection() {
  return /* @__PURE__ */ jsx("section", { id: "pricing", className: "bg-[#050505] px-5 py-24 text-white md:px-8 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-14 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent", children: "Clear pricing" }),
        /* @__PURE__ */ jsx("h2", { className: "max-w-5xl text-[2.35rem] font-black uppercase leading-[0.9] tracking-tight sm:text-5xl md:text-[72px] lg:text-[84px]", children: "Make one video. Then scale the winners." })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "max-w-xl text-base font-medium leading-relaxed text-white/60 md:text-lg lg:justify-self-end", children: [
        "Start self-serve with the ",
        launchOffer.price,
        " launch offer, move into video packs when you need testing volume, or hand the whole campaign to the managed studio."
      ] })
    ] }),
    /* @__PURE__ */ jsx(PricingCards, { location: "pricing_section" }),
    /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-3xl font-mono text-[10px] font-semibold uppercase leading-relaxed tracking-[0.2em] text-white/35", children: launchOffer.note })
  ] }) });
}
function CreatorCard({ creator, index }) {
  return /* @__PURE__ */ jsxs(
    "article",
    {
      "data-reveal": true,
      className: "reveal-text group cursor-pointer",
      style: { transitionDelay: `${index * 0.1}s` },
      children: [
        /* @__PURE__ */ jsxs("div", { className: `image-card mb-8 ${creator.lifted ? "md:translate-y-12" : ""}`, children: [
          /* @__PURE__ */ jsx("img", { src: creator.image, alt: creator.alt, loading: "lazy", decoding: "async" }),
          /* @__PURE__ */ jsx("div", { className: "image-card__accent" })
        ] }),
        /* @__PURE__ */ jsx(
          "h3",
          {
            className: `${creator.lifted ? "md:mt-12" : ""} break-words text-[clamp(1.75rem,7.5vw,2.25rem)] font-black uppercase leading-[0.95] tracking-tight md:text-[30px] xl:text-4xl`,
            children: creator.name
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "mt-2 font-mono text-[10px] uppercase tracking-widest opacity-40", children: creator.description })
      ]
    }
  );
}
function RosterSection() {
  return /* @__PURE__ */ jsx("section", { id: "roster", className: "bg-white px-5 py-24 text-black md:px-8 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-20 flex flex-col gap-8 md:mb-24 xl:flex-row xl:items-end xl:justify-between", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-[clamp(2.65rem,10vw,7rem)] font-extrabold uppercase leading-none tracking-tight", children: [
        "WHAT ",
        /* @__PURE__ */ jsx("br", { className: "sm:hidden" }),
        "WE ",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "italic text-accent", children: "SHIP." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "max-w-md text-base font-bold uppercase leading-tight md:text-lg xl:text-right", children: "Product heroes, character-led spots, and virtual influencer personas — built as systems, so a brand looks identical across every variant. Frames below are from shipped campaigns." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-3", children: creators.map((creator, index) => /* @__PURE__ */ jsx(CreatorCard, { creator, index }, creator.name)) })
  ] }) });
}
const workflowSteps = [
  {
    title: "Brief the campaign",
    body: "Define the audience, offer, platform, product truth, and the creative hypothesis each variant is meant to test."
  },
  {
    title: "Generate with references",
    body: "Lock the creator, product, scene, and approved keyframes before spending on motion. Change only the branch that needs another take."
  },
  {
    title: "Ship named variants",
    body: "Export platform-ready videos with clear hook and angle names, then expand the concepts that earn a stronger signal."
  }
];
function SeoGrowthSection() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { id: "services", className: "bg-[#050505] px-5 py-24 text-white md:px-8 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-14 max-w-4xl md:mb-20", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent", children: "Managed AI ad services" }),
        /* @__PURE__ */ jsx("h2", { className: "text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-[64px] lg:text-[82px] xl:text-[96px]", children: "One production system. Three commercial jobs." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3", children: servicePages.map((page, index) => /* @__PURE__ */ jsxs(
        "a",
        {
          "data-reveal": true,
          href: page.path,
          className: "reveal-text group flex min-h-[320px] flex-col justify-between rounded-[4px] border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-accent hover:bg-accent/10 md:p-8",
          style: { transitionDelay: `${index * 0.08}s` },
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-white/55", children: page.eyebrow }),
              /* @__PURE__ */ jsx("h3", { className: "break-words text-[clamp(1.25rem,5.5vw,1.55rem)] font-black uppercase leading-none tracking-tight xl:text-[1.65rem]", children: page.navLabel }),
              /* @__PURE__ */ jsx("p", { className: "mt-6 text-sm font-medium leading-relaxed text-white/62 md:text-base", children: page.description })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "mt-10 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-accent transition-colors group-hover:text-white", children: "Open service" })
          ]
        },
        page.path
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "workflow", className: "bg-white px-5 py-24 text-black md:px-8 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl grid-cols-1 gap-14 xl:grid-cols-[0.9fr_1.1fr] xl:gap-20", children: [
      /* @__PURE__ */ jsxs("div", { "data-reveal": true, className: "reveal-text", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent", children: "AI ad production workflow" }),
        /* @__PURE__ */ jsx("h2", { className: "text-[2rem] font-black uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-[72px]", children: "Built for creative testing, not one-off renders." }),
        /* @__PURE__ */ jsx("p", { className: "mt-8 max-w-xl text-base font-semibold leading-relaxed text-black/55 md:text-lg", children: "References, prompts, models, QA, and final assembly stay connected, so a winning direction can become more hooks, formats, and markets without rebuilding the campaign from zero." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4", children: workflowSteps.map((step, index) => /* @__PURE__ */ jsxs(
        "article",
        {
          "data-reveal": true,
          className: "reveal-text rounded-[4px] border border-black/10 p-6 md:p-8",
          style: { transitionDelay: `${index * 0.08}s` },
          children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent", children: [
              "0",
              index + 1
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "break-words text-2xl font-black uppercase leading-none tracking-tight md:text-3xl", children: step.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm font-medium leading-relaxed text-black/55 md:text-base", children: step.body })
          ]
        },
        step.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "answers", className: "bg-black px-5 py-24 text-white md:px-8 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-14 max-w-4xl", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent", children: "Direct answers" }),
        /* @__PURE__ */ jsx("h2", { className: "text-[2rem] font-black uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-[72px]", children: "For brands searching where to start." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-3", children: homeAnswerBlocks.map((block, index) => /* @__PURE__ */ jsxs(
        "article",
        {
          "data-reveal": true,
          className: "reveal-text rounded-[4px] border border-white/10 bg-white/[0.03] p-6 md:p-8",
          style: { transitionDelay: `${index * 0.08}s` },
          children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black uppercase leading-none tracking-tight", children: block.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-5 text-sm font-medium leading-relaxed text-white/62 md:text-base", children: block.body })
          ]
        },
        block.title
      )) })
    ] }) })
  ] });
}
function StatsSection() {
  return /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden bg-black px-5 py-32 md:px-8 md:py-44", children: [
    /* @__PURE__ */ jsx("div", { className: "success-bg", "aria-hidden": "true" }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto max-w-[1400px]", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-16 text-center md:mb-24", children: /* @__PURE__ */ jsxs("h2", { className: "mb-8 text-4xl font-black uppercase tracking-tight italic sm:text-5xl md:text-[72px] lg:text-[84px] xl:text-8xl", children: [
        "Recent",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "text-exclusion-fill", children: "results." })
      ] }) }),
      stats.map((stat, index) => /* @__PURE__ */ jsxs(
        "div",
        {
          "data-reveal": true,
          className: "reveal-text stat-row",
          style: { transitionDelay: `${index * 0.07}s` },
          children: [
            /* @__PURE__ */ jsx("div", { className: "stat-row__line" }),
            /* @__PURE__ */ jsxs("div", { className: "stat-row__content", children: [
              /* @__PURE__ */ jsx("span", { className: "stat-row__number", children: stat.value }),
              /* @__PURE__ */ jsxs("div", { className: "stat-row__info", children: [
                /* @__PURE__ */ jsx("span", { className: "stat-row__label", children: stat.label }),
                /* @__PURE__ */ jsx("span", { className: "stat-row__sub", children: stat.sub })
              ] })
            ] })
          ]
        },
        stat.label
      ))
    ] })
  ] });
}
function useVideoPlayback(observedKey) {
  const videoRefs = useRef(/* @__PURE__ */ new Map());
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );
    videoRefs.current.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, [observedKey]);
  const setVideoRef = useCallback((index, video) => {
    if (video) {
      videoRefs.current.set(index, video);
    } else {
      videoRefs.current.delete(index);
    }
  }, []);
  const handleVideoHover = useCallback((index, isHovering) => {
    const video = videoRefs.current.get(index);
    if (!video) {
      return;
    }
    if (isHovering) {
      video.pause();
    } else {
      video.play().catch(() => {
      });
    }
  }, []);
  return { handleVideoHover, setVideoRef };
}
function FilmStrip() {
  const reelItems = useMemo(() => {
    const expanded = Array.from({ length: 14 }, (_, index) => reelVideos[index % reelVideos.length]);
    return [...expanded, ...expanded];
  }, []);
  const { handleVideoHover, setVideoRef } = useVideoPlayback(reelItems);
  return /* @__PURE__ */ jsx("div", { className: "film-strip", children: /* @__PURE__ */ jsx("div", { className: "film-strip__gate", children: /* @__PURE__ */ jsx("div", { className: "film-strip__reel", children: reelItems.map((item, index) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: "film-cell",
      onMouseEnter: () => handleVideoHover(index, true),
      onMouseLeave: () => handleVideoHover(index, false),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "film-cell__perf", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx("span", {}),
          /* @__PURE__ */ jsx("span", {}),
          /* @__PURE__ */ jsx("span", {})
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "film-cell__window", children: [
          /* @__PURE__ */ jsx(
            "video",
            {
              ref: (el) => setVideoRef(index, el),
              src: item.src,
              poster: item.poster,
              muted: true,
              loop: true,
              playsInline: true,
              preload: "none",
              className: "film-cell__video"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "film-cell__grain" }),
          /* @__PURE__ */ jsx("div", { className: "film-cell__vignette" }),
          /* @__PURE__ */ jsx("div", { className: "film-cell__pause-icon", children: /* @__PURE__ */ jsxs("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "white", "aria-hidden": "true", children: [
            /* @__PURE__ */ jsx("rect", { x: "6", y: "4", width: "4", height: "16", rx: "1" }),
            /* @__PURE__ */ jsx("rect", { x: "14", y: "4", width: "4", height: "16", rx: "1" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "film-cell__perf", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx("span", {}),
          /* @__PURE__ */ jsx("span", {}),
          /* @__PURE__ */ jsx("span", {})
        ] })
      ]
    },
    index
  )) }) }) });
}
function VisionSection() {
  return /* @__PURE__ */ jsxs("section", { id: "vision", className: "relative bg-black px-5 py-28 md:px-8 md:py-40", style: { marginTop: "-1px" }, children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-4xl text-center", children: /* @__PURE__ */ jsxs("div", { className: "mb-16 md:mb-24", children: [
      /* @__PURE__ */ jsxs("h2", { className: "mb-8 text-4xl font-black uppercase tracking-tight italic sm:text-5xl md:text-[72px] lg:text-[84px] xl:text-8xl", children: [
        "Feed-Native ",
        /* @__PURE__ */ jsx("span", { className: "text-exclusion-fill", children: "AI Content." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-lg font-medium italic text-white/55 md:text-xl", children: '"We build AI visuals and videos that feel native to social platforms, clear enough for ads, and distinctive enough for brands."' })
    ] }) }),
    /* @__PURE__ */ jsx(FilmStrip, {})
  ] });
}
function HomePage() {
  useRevealOnScroll();
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-white", children: [
    /* @__PURE__ */ jsx("div", { className: "grain", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx(HomeNav, {}),
    /* @__PURE__ */ jsxs("main", { className: "bg-black", children: [
      /* @__PURE__ */ jsx(HeroSection, {}),
      /* @__PURE__ */ jsx(PricingSection, {}),
      /* @__PURE__ */ jsx(CanvasDemoSection, {}),
      /* @__PURE__ */ jsx(LessonsSection, {}),
      /* @__PURE__ */ jsx(RosterSection, {}),
      /* @__PURE__ */ jsx(VisionSection, {}),
      /* @__PURE__ */ jsx(SeoGrowthSection, {}),
      /* @__PURE__ */ jsx(StatsSection, {}),
      /* @__PURE__ */ jsx(JoinSection, {})
    ] }),
    /* @__PURE__ */ jsx(HomeFooter, {})
  ] });
}
function NotFoundPage() {
  return /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-[100dvh] flex-col overflow-hidden bg-black text-white", children: [
    /* @__PURE__ */ jsx("div", { className: "grain", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx(HomeNav, {}),
    /* @__PURE__ */ jsxs("main", { className: "relative flex flex-1 flex-col items-center justify-center px-5 pb-28 pt-32 text-center md:px-8", children: [
      /* @__PURE__ */ jsx("div", { className: "hero-stage", "aria-hidden": "true", children: /* @__PURE__ */ jsx("div", { className: "hero-stage__grid" }) }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto w-full max-w-7xl", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-accent md:text-xs", children: "Error 404 — Frame not found" }),
        /* @__PURE__ */ jsxs("h1", { className: "mb-12 text-[clamp(2.05rem,9vw,8.75rem)] font-extrabold uppercase leading-[0.88] tracking-tight md:leading-[0.82]", children: [
          "The shot ",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-exclusion-fill italic", children: "is gone." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto mb-16 max-w-2xl text-lg font-medium leading-tight text-white/40 sm:text-xl md:text-2xl", children: "The page you're looking for has wandered off the set. Head back to base and keep creating." }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/",
            className: "inline-block bg-white px-8 py-5 text-xs font-black uppercase tracking-[0.3em] text-black transition-all hover:-rotate-1 hover:bg-accent hover:text-white active:scale-95 md:px-12 md:py-6 md:text-sm",
            children: "Return to base"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-4 opacity-30", children: [
        /* @__PURE__ */ jsx("span", { className: "font-mono text-[9px] uppercase tracking-widest", children: "Signal lost" }),
        /* @__PURE__ */ jsx("div", { className: "h-16 w-px bg-white" })
      ] })
    ] })
  ] });
}
const principles = [
  {
    title: "Performance creative first",
    body: "Every output exists to be tested. We design AI content for paid social testing, hook iteration, and reusable creator systems — not one-off vanity assets."
  },
  {
    title: "Repeatable creator identity",
    body: "A face, voice, and visual lane that can ship weekly. We treat virtual creators like brand assets that compound, not single-use generations."
  },
  {
    title: "Transparent with AI",
    body: "AI content is labelled where platforms require it. We do not impersonate real people, claim AI footage is human-sourced, or fabricate testimonials."
  }
];
function AboutPage() {
  useRevealOnScroll();
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-white", children: [
    /* @__PURE__ */ jsx("div", { className: "grain", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx(HomeNav, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("section", { className: "px-5 pt-36 pb-16 md:px-8 md:pt-44 md:pb-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-accent", children: "About SHOT.IS" }),
        /* @__PURE__ */ jsx("h1", { className: "text-[clamp(2rem,7vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-tight", children: "An AI ad platform with a managed production team." }),
        /* @__PURE__ */ jsx("p", { className: "mt-10 max-w-3xl text-lg font-medium leading-relaxed text-white/55 md:text-xl", children: "SHOT.IS combines a self-serve AI UGC ad generator with a remote-first managed studio. Teams can generate one video from $4.99, buy packs for creative testing, or hand over a campaign brief for creative direction, multi-model generation, human QA, and finished edits." })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-white px-5 py-24 text-black md:px-8 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20", children: [
        /* @__PURE__ */ jsxs("div", { "data-reveal": true, className: "reveal-text", children: [
          /* @__PURE__ */ jsx("p", { className: "mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent", children: "How we work" }),
          /* @__PURE__ */ jsx("h2", { className: "text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-[64px]", children: "Principles, not pitches." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4", children: principles.map((principle, index) => /* @__PURE__ */ jsxs(
          "article",
          {
            "data-reveal": true,
            className: "reveal-text rounded-[4px] border border-black/10 p-6 md:p-8",
            style: { transitionDelay: `${index * 0.08}s` },
            children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black uppercase leading-none tracking-tight", children: principle.title }),
              /* @__PURE__ */ jsx("p", { className: "mt-5 text-base font-medium leading-relaxed text-black/60", children: principle.body })
            ]
          },
          principle.title
        )) })
      ] }) }),
      founder ? /* @__PURE__ */ jsx("section", { id: "founder", className: "bg-[#050505] px-5 py-24 text-white md:px-8 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-[auto_1fr] md:gap-14", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: founder.photo,
            alt: founder.name,
            className: "h-40 w-40 rounded-[4px] object-cover md:h-52 md:w-52"
          }
        ),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent", children: "Founder" }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black uppercase leading-[0.95] tracking-tight sm:text-4xl md:text-[52px]", children: founder.name }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-white/45", children: founder.role }),
          /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-2xl text-base font-medium leading-relaxed text-white/60 md:text-lg", children: founder.bio }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: founder.linkedIn,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "mt-6 inline-block font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-accent transition-colors hover:text-white",
              children: "LinkedIn →"
            }
          )
        ] })
      ] }) }) : null,
      /* @__PURE__ */ jsx("section", { className: "bg-black px-5 py-24 text-white md:px-8 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent", children: "The studio" }),
        /* @__PURE__ */ jsx("h2", { className: "mb-10 text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-[64px]", children: "A small team, a deep stack." }),
        /* @__PURE__ */ jsxs("p", { className: "text-lg font-medium leading-relaxed text-white/55 md:text-xl", children: [
          "SHOT.IS pairs a self-serve generation product with creative direction and post-production when a team needs more than a tool. Generate directly in Studio, or get one managed team responsible for the brief, creator persona, generation, edit, and campaign-ready files. To scope a managed sprint, see",
          " ",
          /* @__PURE__ */ jsx("a", { href: "/contact", className: "text-accent underline-offset-4 hover:underline", children: "contact" }),
          "."
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(HomeFooter, {})
  ] });
}
const locales = { en: "en-US", es: "es-ES" };
function formatDate(iso, lang) {
  const date = /* @__PURE__ */ new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat(locales[lang], { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(
    date
  );
}
function renderInline(text) {
  const nodes = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let key = 0;
  let match;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    if (match[1] && match[2]) {
      const href = match[2];
      const isInternal = href.startsWith("/") || href.startsWith("#");
      nodes.push(
        /* @__PURE__ */ jsx(
          "a",
          {
            href,
            className: "font-semibold text-accent underline decoration-accent/35 underline-offset-4 transition-colors hover:decoration-accent",
            ...isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" },
            children: match[1]
          },
          `l${key++}`
        )
      );
    } else if (match[3]) {
      nodes.push(
        /* @__PURE__ */ jsx("strong", { className: "font-bold", children: match[3] }, `b${key++}`)
      );
    }
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}
function renderBlock(block, index) {
  switch (block.type) {
    case "p":
      return /* @__PURE__ */ jsx("p", { className: "font-serif text-[1.14rem] leading-[1.8] text-ink/85 md:text-[1.19rem]", children: renderInline(block.text) }, index);
    case "h2":
      return /* @__PURE__ */ jsx(
        "h2",
        {
          id: block.id,
          className: "font-body scroll-mt-28 pt-8 text-[1.55rem] font-extrabold leading-[1.12] tracking-tight text-ink md:text-[1.9rem]",
          children: block.text
        },
        index
      );
    case "h3":
      return /* @__PURE__ */ jsx(
        "h3",
        {
          id: block.id,
          className: "font-body scroll-mt-28 pt-4 text-xl font-bold leading-snug tracking-tight text-ink md:text-[1.35rem]",
          children: block.text
        },
        index
      );
    case "ul":
      return /* @__PURE__ */ jsx("ul", { className: "space-y-3.5", children: block.items.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-4 font-serif text-[1.1rem] leading-[1.72] text-ink/85 md:text-[1.14rem]", children: [
        /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "mt-[0.72em] h-[7px] w-[7px] flex-none bg-accent" }),
        /* @__PURE__ */ jsx("span", { children: renderInline(item) })
      ] }, i)) }, index);
    case "ol":
      return /* @__PURE__ */ jsx("ol", { className: "space-y-3.5", children: block.items.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-4 font-serif text-[1.1rem] leading-[1.72] text-ink/85 md:text-[1.14rem]", children: [
        /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "mt-[0.2em] font-mono text-sm font-bold tabular-nums text-accent", children: String(i + 1).padStart(2, "0") }),
        /* @__PURE__ */ jsx("span", { children: renderInline(item) })
      ] }, i)) }, index);
    case "quote":
      return /* @__PURE__ */ jsxs(
        "blockquote",
        {
          className: "border-l-[3px] border-accent py-1 pl-6 font-serif text-[1.3rem] italic leading-[1.4] text-ink md:text-[1.45rem]",
          children: [
            renderInline(block.text),
            block.cite ? /* @__PURE__ */ jsxs("cite", { className: "mt-3 block font-body text-sm not-italic text-ink/50", children: [
              "— ",
              block.cite
            ] }) : null
          ]
        },
        index
      );
    case "callout":
      return /* @__PURE__ */ jsxs("aside", { className: "rounded-[4px] bg-ink px-6 py-6 text-paper shadow-[6px_6px_0_0_rgba(255,17,0,0.9)] md:px-8 md:py-7", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-accent", children: block.title }),
        /* @__PURE__ */ jsx("p", { className: "font-serif text-[1.08rem] leading-[1.7] text-paper/90", children: renderInline(block.body) })
      ] }, index);
    case "image":
      return /* @__PURE__ */ jsxs("figure", { className: "overflow-hidden rounded-[4px] border border-ink/10", children: [
        /* @__PURE__ */ jsx("img", { src: block.src, alt: block.alt, loading: "lazy", className: "w-full" }),
        block.caption ? /* @__PURE__ */ jsx("figcaption", { className: "bg-ink/[0.04] px-4 py-3 font-body text-sm text-ink/55", children: block.caption }) : null
      ] }, index);
    case "table":
      return /* @__PURE__ */ jsx("figure", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse text-left", children: [
        block.caption ? /* @__PURE__ */ jsx("caption", { className: "mb-3 text-left font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-ink/50", children: block.caption }) : null,
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { className: "border-b-2 border-ink", children: block.headers.map((header, i) => /* @__PURE__ */ jsx("th", { className: "py-3 pr-4 font-body text-sm font-extrabold uppercase tracking-wide text-ink", children: header }, i)) }) }),
        /* @__PURE__ */ jsx("tbody", { children: block.rows.map((row, r) => /* @__PURE__ */ jsx("tr", { className: "border-b border-ink/15", children: row.map((cell, c) => /* @__PURE__ */ jsx("td", { className: "py-3.5 pr-4 align-top font-serif text-[1.02rem] leading-[1.55] text-ink/85", children: renderInline(cell) }, c)) }, r)) })
      ] }) }, index);
    case "stat":
      return /* @__PURE__ */ jsxs("figure", { className: "border-l-[3px] border-accent bg-ink/[0.03] py-5 pl-6 pr-5", children: [
        /* @__PURE__ */ jsx("p", { className: "font-body text-4xl font-extrabold tracking-tight text-ink md:text-5xl", children: block.value }),
        /* @__PURE__ */ jsxs("figcaption", { className: "mt-2 font-serif text-[1.05rem] leading-[1.6] text-ink/75", children: [
          renderInline(block.label),
          block.source ? /* @__PURE__ */ jsx("span", { className: "mt-1 block font-body text-sm text-ink/50", children: block.sourceUrl ? /* @__PURE__ */ jsx(
            "a",
            {
              href: block.sourceUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "underline decoration-ink/30 underline-offset-4 hover:decoration-accent",
              children: block.source
            }
          ) : block.source }) : null
        ] })
      ] }, index);
    default:
      return null;
  }
}
function BlogIndexPage({ lang, posts }) {
  useRevealOnScroll();
  const t = blogStrings[lang];
  const otherLang = lang === "en" ? "es" : "en";
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-white", children: [
    /* @__PURE__ */ jsx("div", { className: "grain", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx(HomeNav, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("section", { className: "relative w-full overflow-hidden px-5 pb-16 pt-36 md:px-8 md:pb-20 md:pt-44", children: /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto max-w-7xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsx("p", { className: "font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-accent", children: "SHOT.IS · Blog" }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: blogIndexPath(otherLang),
              className: "font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white/50 transition-colors hover:text-accent",
              children: t.switchLabel
            }
          )
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "max-w-5xl text-[clamp(2rem,7vw,5.5rem)] font-extrabold uppercase leading-[0.9] tracking-tight", children: t.blogTitle }),
        /* @__PURE__ */ jsx("p", { className: "mt-8 max-w-3xl text-lg font-medium leading-tight text-white/50 md:text-2xl", children: t.blogLede })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "px-5 pb-28 md:px-8 md:pb-36", children: /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2", children: posts.map((post2, index) => /* @__PURE__ */ jsxs(
        "a",
        {
          href: blogPostPath(post2),
          "data-reveal": true,
          className: "reveal-text group flex flex-col rounded-[4px] border border-white/10 bg-white/[0.02] p-7 transition-colors hover:border-accent/50 hover:bg-white/[0.04] md:p-9",
          style: { transitionDelay: `${index * 0.06}s` },
          children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-white/45", children: [
              /* @__PURE__ */ jsx("time", { dateTime: post2.datePublished, children: formatDate(post2.datePublished, lang) }),
              /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "·" }),
              /* @__PURE__ */ jsx("span", { children: t.readTime(readingTime(post2)) })
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "font-body text-[1.4rem] font-extrabold leading-snug tracking-tight text-white transition-colors group-hover:text-accent md:text-[1.6rem]", children: post2.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 flex-1 font-serif text-[1.05rem] leading-[1.7] text-white/60", children: post2.excerpt }),
            /* @__PURE__ */ jsx("div", { className: "mt-6 flex flex-wrap gap-2", children: post2.tags.slice(0, 3).map((tag) => /* @__PURE__ */ jsx(
              "span",
              {
                className: "rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/40",
                children: tag
              },
              tag
            )) })
          ]
        },
        post2.slug
      )) }) })
    ] }),
    /* @__PURE__ */ jsx(HomeFooter, {})
  ] });
}
const MILESTONES = [25, 50, 75, 100];
const useReadProgress = (slug, language) => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const fired = /* @__PURE__ */ new Set();
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const pct = scrollable <= 0 ? 100 : Math.round(window.scrollY / scrollable * 100);
      for (const milestone of MILESTONES) {
        if (pct >= milestone && !fired.has(milestone)) {
          fired.add(milestone);
          track("blog_read", { slug, language, milestone });
        }
      }
      if (fired.size === MILESTONES.length) window.removeEventListener("scroll", onScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug, language]);
};
function BlogPostPage({ post: post2 }) {
  useRevealOnScroll();
  useReadProgress(post2.slug, post2.lang);
  const t = blogStrings[post2.lang];
  const sibling = blogSibling(post2);
  const sections = post2.blocks.filter((b) => b.type === "h2");
  const related = blogPostsByLang[post2.lang].filter((p) => p.slug !== post2.slug).slice(0, 2);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-white", children: [
    /* @__PURE__ */ jsx("div", { className: "grain", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx(HomeNav, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("article", { children: [
        /* @__PURE__ */ jsx("header", { className: "relative w-full overflow-hidden px-5 pb-10 pt-32 md:px-8 md:pb-12 md:pt-40", children: /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto max-w-[44rem]", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-wrap items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: blogIndexPath(post2.lang),
                className: "font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-accent transition-colors hover:text-white",
                children: [
                  "← ",
                  t.backToBlog
                ]
              }
            ),
            sibling ? /* @__PURE__ */ jsx(
              "a",
              {
                href: blogPostPath(sibling),
                className: "font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white/50 transition-colors hover:text-accent",
                children: t.switchLabel
              }
            ) : null
          ] }),
          /* @__PURE__ */ jsxs(
            "nav",
            {
              "aria-label": "Breadcrumb",
              className: "mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white/40",
              children: [
                /* @__PURE__ */ jsx("a", { href: "/", className: "transition-colors hover:text-accent", children: "SHOT.IS" }),
                /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "mx-2", children: "/" }),
                /* @__PURE__ */ jsx("a", { href: blogIndexPath(post2.lang), className: "transition-colors hover:text-accent", children: t.blogTitle }),
                /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "mx-2", children: "/" }),
                /* @__PURE__ */ jsx("span", { className: "text-white/60", children: post2.title })
              ]
            }
          ),
          /* @__PURE__ */ jsx("h1", { className: "text-[clamp(1.85rem,5vw,3.25rem)] font-extrabold uppercase leading-[0.98] tracking-tight", children: post2.title }),
          /* @__PURE__ */ jsxs("div", { className: "mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-white/45", children: [
            /* @__PURE__ */ jsx("span", { children: post2.author.name }),
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "·" }),
            /* @__PURE__ */ jsxs("span", { children: [
              t.publishedOn,
              " ",
              /* @__PURE__ */ jsx("time", { dateTime: post2.datePublished, children: formatDate(post2.datePublished, post2.lang) })
            ] }),
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "·" }),
            /* @__PURE__ */ jsx("span", { children: t.readTime(readingTime(post2)) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "border-t-2 border-accent bg-paper text-ink", children: [
          /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[44rem] px-5 pt-12 md:px-8 md:pt-16", children: [
            /* @__PURE__ */ jsxs(
              "section",
              {
                "aria-label": t.keyTakeaways,
                className: "rounded-[4px] border border-ink/15 bg-white/70 p-6 md:p-8",
                children: [
                  /* @__PURE__ */ jsx("p", { className: "mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-accent", children: t.keyTakeaways }),
                  /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: post2.tldr.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3.5 font-body text-[1rem] font-medium leading-relaxed text-ink/85", children: [
                    /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "mt-[0.55em] h-[7px] w-[7px] flex-none bg-accent" }),
                    /* @__PURE__ */ jsx("span", { children: renderInline(item) })
                  ] }, i)) })
                ]
              }
            ),
            sections.length > 2 ? /* @__PURE__ */ jsxs("nav", { "aria-label": t.onThisPage, className: "mt-8 border-l-2 border-ink/15 pl-5", children: [
              /* @__PURE__ */ jsx("p", { className: "mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-ink/45", children: t.onThisPage }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: sections.map((section) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                "a",
                {
                  href: `#${section.id}`,
                  className: "font-body text-sm font-semibold text-ink/60 transition-colors hover:text-accent",
                  children: section.text
                }
              ) }, section.id)) })
            ] }) : null
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[44rem] space-y-6 px-5 pb-16 pt-10 md:px-8 md:pb-20 md:pt-12", children: [
            post2.blocks.map((block, index) => renderBlock(block, index)),
            post2.faq?.length ? /* @__PURE__ */ jsxs("section", { "aria-label": t.faqTitle, className: "pt-8", children: [
              /* @__PURE__ */ jsx("h2", { className: "font-body text-[1.55rem] font-extrabold leading-[1.12] tracking-tight text-ink md:text-[1.9rem]", children: t.faqTitle }),
              /* @__PURE__ */ jsx("div", { className: "mt-6 space-y-4", children: post2.faq.map((item) => /* @__PURE__ */ jsxs("article", { className: "rounded-[4px] border border-ink/15 bg-white/70 p-6 md:p-7", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-body text-lg font-bold leading-snug tracking-tight text-ink", children: item.question }),
                /* @__PURE__ */ jsx("p", { className: "mt-3 font-serif text-[1.08rem] leading-[1.7] text-ink/80", children: renderInline(item.answer) })
              ] }, item.question)) })
            ] }) : null
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "bg-accent px-5 py-16 text-white md:px-8 md:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[44rem]", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl", children: t.ctaTitle }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-xl text-base font-medium leading-relaxed text-white/85 md:text-lg", children: t.ctaBody }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: withUtm("https://studio.shot.is/", "blog_post"),
            onClick: () => trackStudioClick("blog_post"),
            className: "mt-8 inline-flex items-center justify-center bg-white px-9 py-5 text-xs font-black uppercase tracking-[0.26em] text-black transition-all hover:-rotate-1 hover:bg-black hover:text-white",
            children: t.ctaButton
          }
        )
      ] }) }),
      related.length ? /* @__PURE__ */ jsx("section", { className: "px-5 py-16 md:px-8 md:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[44rem]", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-body mb-8 text-2xl font-extrabold tracking-tight md:text-3xl", children: t.relatedTitle }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: related.map((rel) => /* @__PURE__ */ jsxs(
          "a",
          {
            href: blogPostPath(rel),
            className: "group rounded-[4px] border border-white/10 p-6 transition-colors hover:border-accent/50 hover:bg-white/[0.03]",
            children: [
              /* @__PURE__ */ jsx("p", { className: "font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white/40", children: formatDate(rel.datePublished, post2.lang) }),
              /* @__PURE__ */ jsx("h3", { className: "mt-3 text-lg font-black uppercase leading-tight tracking-tight transition-colors group-hover:text-accent", children: rel.title })
            ]
          },
          rel.slug
        )) })
      ] }) }) : null
    ] }),
    /* @__PURE__ */ jsx(HomeFooter, {})
  ] });
}
const contactPaths = [
  {
    label: "Email",
    value: "hello@shot.is",
    href: "mailto:hello@shot.is"
  },
  {
    label: "Press",
    value: "press@shot.is",
    href: "mailto:press@shot.is"
  }
];
function ContactPage() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-white", children: [
    /* @__PURE__ */ jsx("div", { className: "grain", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx(HomeNav, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("section", { className: "px-5 pt-36 pb-16 md:px-8 md:pt-44 md:pb-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-accent", children: "Contact" }),
        /* @__PURE__ */ jsx("h1", { className: "text-[clamp(2rem,7vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-tight", children: "Start an AI content sprint." }),
        /* @__PURE__ */ jsx("p", { className: "mt-10 max-w-3xl text-lg font-medium leading-relaxed text-white/55 md:text-xl", children: "Tell us about the campaign. Brief the offer, the platform, and the testing volume you need. We respond with a creative direction, scope, and timeline within two business days." })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-white px-5 py-24 text-black md:px-8 md:py-32", children: /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2", children: contactPaths.map((item) => /* @__PURE__ */ jsxs("article", { className: "rounded-[4px] border border-black/10 p-8", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent", children: item.label }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: item.href,
            className: "break-all text-3xl font-black uppercase leading-none tracking-tight underline-offset-4 hover:text-accent hover:underline md:text-4xl",
            children: item.value
          }
        )
      ] }, item.label)) }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-black px-5 py-24 text-white md:px-8 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent", children: "What to send" }),
        /* @__PURE__ */ jsxs("ul", { className: "list-disc space-y-3 pl-6 text-base leading-relaxed text-white/65 md:text-lg", children: [
          /* @__PURE__ */ jsx("li", { children: "Brand, product, target audience, and primary platform (TikTok, Reels, Shorts, Meta, app)." }),
          /* @__PURE__ */ jsx("li", { children: "Number of creative variants you want to test in the first sprint." }),
          /* @__PURE__ */ jsx("li", { children: "Whether you want creator-style UGC, AI video ads, or a virtual influencer system." }),
          /* @__PURE__ */ jsx("li", { children: "Any existing creative, brand guidelines, or competitor benchmarks worth referencing." })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(HomeFooter, {})
  ] });
}
const faqPageMeta = {
  path: "/faq",
  title: "SHOT.IS FAQ — AI UGC Ads, Pricing, Models & Policy",
  description: "Answers about SHOT.IS pricing, the $4.99 AI video launch offer, video packs, managed production, supported models, consistency, and platform disclosure rules.",
  eyebrow: "FAQ",
  h1: "QUESTIONS, ANSWERED STRAIGHT.",
  lede: "What SHOT.IS is, what the $4.99 launch offer covers, when to buy a video pack, and when managed production is the better fit."
};
const faqGroups = [
  {
    heading: "About SHOT.IS",
    relatedPath: "/about",
    relatedLabel: "About the studio",
    items: [
      {
        question: "What is SHOT.IS?",
        answer: "SHOT.IS is a self-serve AI UGC ad generator and a managed production studio. Teams can create one AI video from $4.99, buy video packs for testing volume, or brief the SHOT.IS team to deliver campaign-ready AI UGC ads, AI video ads, and virtual influencer content."
      },
      {
        question: "How does SHOT.IS produce an AI ad?",
        answer: "SHOT.IS runs a keyframe-first pipeline: a brand brief becomes a Scene Bible (one location, one outfit, locked look constants), still keyframes are generated and quality-checked before any animation, approved frames are animated with image-to-video models, and clips are cut to a beat grid so the edit feels intentional. Each stage has a QA gate, so rejects are caught while they are still cheap."
      },
      {
        question: "What is the difference between SHOT.IS and studio.shot.is?",
        answer: "SHOT.IS is the company and public product site. studio.shot.is is the self-serve app where teams generate AI video under their own account. Managed production uses the same pipeline but adds creative direction, human QA, editing, and campaign-ready delivery."
      },
      {
        question: "Who is SHOT.IS for?",
        answer: "SHOT.IS is built for teams that test creative at volume: mobile apps managing CPI, ecommerce brands feeding paid social, SaaS products explaining features, and agencies producing for clients. It fits best when you need many ad variants per week, not one flagship film per quarter."
      }
    ]
  },
  {
    heading: "Pricing and speed",
    relatedPath: "/pricing",
    relatedLabel: "See SHOT.IS pricing",
    items: [
      {
        question: "How much does SHOT.IS cost?",
        answer: "The SHOT.IS launch offer starts at $4.99 for one self-serve AI video. Video packs are available in Studio with live volume pricing. Managed production is quoted per campaign brief because it includes creative direction, QA, editing, and finished variants rather than only a generated clip."
      },
      {
        question: "Does SHOT.IS offer video packs?",
        answer: "Yes. Video packs are designed for teams producing several hooks, scenes, creator variants, or product angles. Current pack sizes and checkout prices are shown inside Studio so the published offer and the live purchase flow stay aligned."
      },
      {
        question: "Why does SHOT.IS talk about marginal cost per variant instead of cost per video?",
        answer: "Because paid social is a testing game: hooks fatigue in days, so the economic unit is a variant, not a video. With a human creator, variant five costs most of a re-shoot; with the SHOT.IS pipeline, variant five is a handful of regenerated shots dropped into an existing edit — the Scene Bible, keyframes, music, and assembly are already paid for."
      },
      {
        question: "How fast can SHOT.IS deliver ad creative?",
        answer: "Typical turnaround is days, not weeks. In one engagement, SHOT.IS delivered 18 ad concepts for a DTC ecommerce launch in eight days, where the traditional shoot alternative was quoted at four weeks. Ongoing programs commonly ship around six hook variants per week per creator persona."
      }
    ]
  },
  {
    heading: "Output and quality",
    relatedPath: "/ai-video-ads",
    relatedLabel: "AI video ads service",
    items: [
      {
        question: "Which AI video models does SHOT.IS use?",
        answer: "SHOT.IS routes each shot to the model that is best at it rather than forcing one model everywhere: Google Veo 3 for motion physics and native audio, Grok Imagine for fast, low-cost iteration and reference-aware keyframes, and Kling for expressive character motion. Model routing is re-evaluated as providers ship updates."
      },
      {
        question: "How does SHOT.IS keep faces and products consistent across shots?",
        answer: "Consistency comes from a Scene Bible plus reference discipline: one location, one outfit, locked look constants, product reference images for label fidelity, and reference-aware keyframe generation. Every keyframe and clip passes a vision QA gate, and identity-critical shots are regenerated until the same face and the same product read across the whole ad."
      },
      {
        question: "Who owns the ads SHOT.IS produces?",
        answer: "The brand does. Delivered campaign assets are for the client’s commercial use across paid and organic placements, with licensed music where music is included. Details are covered in the SHOT.IS terms of service."
      }
    ]
  },
  {
    heading: "Performance and policy",
    relatedPath: "/virtual-influencers",
    relatedLabel: "Virtual influencers service",
    items: [
      {
        question: "Do AI UGC ads actually perform?",
        answer: "They perform where testing velocity decides outcomes. In SHOT.IS programs, a mobile gaming studio cut CPI by 31% over four-week windows using six AI hook variants per week, and a DTC brand lifted ROAS 1.7x on its best AI-generated variant. AI UGC underperforms where genuine human trust is the job — real testimonials still belong to real people."
      },
      {
        question: "Is AI-generated UGC allowed on TikTok and Meta?",
        answer: "Yes, with disclosure. TikTok and Meta both allow AI-generated ad creative but require AI content labels in defined cases, and the EU AI Act adds transparency obligations. SHOT.IS labels AI content where platforms require it, does not impersonate real people, and does not fabricate testimonials."
      },
      {
        question: "What is a virtual influencer, and can it replace human creators?",
        answer: "A virtual influencer is a digital creator identity — a consistent face, tone, and world — used in social content and campaigns. It replaces part of the workload: virtual creators win on consistency, scheduling, localization, and production speed, while human creators keep the edge for authentic testimonials and audience trust."
      }
    ]
  }
];
const allFaqItems = faqGroups.flatMap((group) => group.items);
function FaqPage() {
  useRevealOnScroll();
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-white", children: [
    /* @__PURE__ */ jsx("div", { className: "grain", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx(HomeNav, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("section", { className: "px-5 pt-36 pb-16 md:px-8 md:pt-44 md:pb-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-accent", children: faqPageMeta.eyebrow }),
        /* @__PURE__ */ jsx("h1", { className: "text-[clamp(2rem,7vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-tight", children: faqPageMeta.h1 }),
        /* @__PURE__ */ jsx("p", { className: "mt-10 max-w-3xl text-lg font-medium leading-relaxed text-white/55 md:text-xl", children: faqPageMeta.lede })
      ] }) }),
      faqGroups.map((group, groupIndex) => /* @__PURE__ */ jsx(
        "section",
        {
          className: groupIndex % 2 === 0 ? "bg-white px-5 py-20 text-black md:px-8 md:py-28" : "bg-[#050505] px-5 py-20 text-white md:px-8 md:py-28",
          children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-10 flex flex-wrap items-end justify-between gap-4", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black uppercase leading-[0.92] tracking-tight sm:text-4xl md:text-[52px]", children: group.heading }),
              group.relatedPath ? /* @__PURE__ */ jsxs(
                "a",
                {
                  href: group.relatedPath,
                  className: "font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-accent transition-colors hover:opacity-70",
                  children: [
                    group.relatedLabel,
                    " →"
                  ]
                }
              ) : null
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-4", children: group.items.map((item, index) => /* @__PURE__ */ jsxs(
              "article",
              {
                "data-reveal": true,
                className: groupIndex % 2 === 0 ? "reveal-text rounded-[4px] border border-black/10 p-6 md:p-8" : "reveal-text rounded-[4px] border border-white/10 bg-white/[0.03] p-6 md:p-8",
                style: { transitionDelay: `${index * 0.07}s` },
                children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-black uppercase leading-tight tracking-tight md:text-2xl", children: item.question }),
                  /* @__PURE__ */ jsx(
                    "p",
                    {
                      className: groupIndex % 2 === 0 ? "mt-5 text-base font-medium leading-relaxed text-black/58" : "mt-5 text-base font-medium leading-relaxed text-white/55",
                      children: item.answer
                    }
                  )
                ]
              },
              item.question
            )) })
          ] })
        },
        group.heading
      )),
      /* @__PURE__ */ jsx("section", { className: "bg-accent px-5 py-20 text-white md:px-8 md:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl", children: "Still deciding? Test it." }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-xl text-base font-medium leading-relaxed text-white/85 md:text-lg", children: "The fastest answer is a real variant in your ad account. Start a sprint or generate in the studio yourself." }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: withUtm("https://studio.shot.is/", "faq_page"),
            onClick: () => trackStudioClick("faq_page"),
            className: "mt-8 inline-flex items-center justify-center bg-white px-9 py-5 text-xs font-black uppercase tracking-[0.26em] text-black transition-all hover:-rotate-1 hover:bg-black hover:text-white",
            children: "Open the studio"
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(HomeFooter, {})
  ] });
}
function LearnIndexPage({ lang, lessons: lessons2 }) {
  useRevealOnScroll();
  const t = learnStrings[lang];
  const basics = lessons2.filter((lesson) => lesson.kind === "basics");
  const microCases = lessons2.filter((lesson) => lesson.kind === "micro-case");
  const renderCard = (lesson, index) => /* @__PURE__ */ jsxs(
    "a",
    {
      href: lessonPath(lesson),
      "data-reveal": true,
      className: "reveal-text group flex flex-col rounded-[4px] border border-white/10 bg-white/[0.02] p-7 transition-colors hover:border-accent/50 hover:bg-white/[0.04] md:p-9",
      style: { transitionDelay: `${index * 0.06}s` },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-5 flex items-center justify-between gap-4 font-mono text-[10px] font-bold uppercase tracking-[0.24em]", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-accent", children: [
            lesson.kind === "basics" ? t.basicsLabel : t.microCaseLabel,
            " · ",
            lesson.order
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-white/40", children: formatSeconds(lesson.videoSeconds) })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black uppercase leading-[0.95] tracking-tight transition-colors group-hover:text-accent md:text-[2rem]", children: lesson.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 flex-1 text-base font-medium leading-relaxed text-white/55", children: lesson.excerpt }),
        /* @__PURE__ */ jsx("div", { className: "mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-5 font-mono text-[10px] font-bold uppercase tracking-[0.2em]", children: /* @__PURE__ */ jsx("span", { className: "text-accent", children: t.learningTime(formatMinutes(learningMinutes(lesson))) }) })
      ]
    },
    lesson.slug
  );
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-white", children: [
    /* @__PURE__ */ jsx("div", { className: "grain", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx(HomeNav, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("section", { className: "px-5 pb-16 pt-36 md:px-8 md:pb-20 md:pt-44", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-accent", children: "SHOT.IS · Learn" }),
        /* @__PURE__ */ jsx("h1", { className: "max-w-5xl text-[clamp(2.2rem,7vw,6rem)] font-extrabold uppercase leading-[0.88] tracking-tight", children: t.hubTitle }),
        /* @__PURE__ */ jsx("p", { className: "mt-9 max-w-3xl text-lg font-medium leading-relaxed text-white/55 md:text-2xl md:leading-tight", children: t.hubLede }),
        /* @__PURE__ */ jsxs("p", { className: "mt-8 font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-white/45", children: [
          t.lessonCount(lessons2.length),
          " · ",
          t.pathTotal(formatMinutes(pathMinutes(lang)))
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "px-5 pb-20 md:px-8 md:pb-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-8 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/40", children: t.basicsLabel }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-3", children: basics.map(renderCard) }),
        microCases.length ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-8 mt-16 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/40", children: t.microCaseLabel }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: microCases.map(renderCard) })
        ] }) : null,
        /* @__PURE__ */ jsxs("p", { className: "mt-16 flex flex-wrap items-center gap-x-4 gap-y-2 text-base font-medium text-white/45", children: [
          t.blogBridge,
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: blogIndexPath(lang),
              className: "font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-accent transition-colors hover:text-white",
              children: [
                t.blogBridgeCta,
                " →"
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-accent px-5 py-16 text-white md:px-8 md:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "max-w-3xl text-3xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl", children: t.ctaTitle }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-xl text-base font-medium leading-relaxed text-white/85 md:text-lg", children: t.ctaBody }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: withUtm("https://studio.shot.is/", "learn_hub"),
            onClick: () => trackStudioClick("learn_hub"),
            className: "mt-8 inline-flex items-center justify-center bg-white px-9 py-5 text-xs font-black uppercase tracking-[0.26em] text-black transition-all hover:-rotate-1 hover:bg-black hover:text-white",
            children: t.ctaButton
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(HomeFooter, {})
  ] });
}
function LessonPlayer({ lesson, lang }) {
  const videoRef = useRef(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const t = learnStrings[lang];
  const seekTo = (seconds, index) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = seconds;
    setActiveChapter(index);
    void video.play().catch(() => {
    });
  };
  if (lesson.videoPending) {
    return /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-[4px] border border-white/10 bg-white/[0.02]", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "flex items-center justify-center bg-black/40 px-6 py-20 text-center",
        style: { aspectRatio: `${lesson.video.width} / ${lesson.video.height}` },
        children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent", children: t.recordingLabel }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto mt-4 max-w-md text-base font-medium leading-relaxed text-white/55", children: t.noVideoNote })
        ] })
      }
    ) });
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-[4px] border border-white/10 bg-black", children: /* @__PURE__ */ jsx(
      "video",
      {
        ref: videoRef,
        className: "block w-full",
        src: lesson.video.src,
        poster: lesson.video.poster,
        width: lesson.video.width,
        height: lesson.video.height,
        controls: true,
        playsInline: true,
        preload: "none"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: lesson.steps.map((step, index) => /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => seekTo(step.at, index),
        className: `rounded-full border px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition-colors ${activeChapter === index ? "border-accent/60 bg-accent/10 text-accent" : "border-white/10 text-white/50 hover:border-accent/40 hover:text-accent"}`,
        children: [
          /* @__PURE__ */ jsx("span", { className: "tabular-nums", children: formatTimestamp(step.at) }),
          /* @__PURE__ */ jsx("span", { className: "mx-2 text-white/20", "aria-hidden": "true", children: "·" }),
          step.title
        ]
      },
      step.at
    )) })
  ] });
}
function LessonPage({ lesson }) {
  useRevealOnScroll();
  const lang = lesson.lang;
  const t = learnStrings[lang];
  const sibling = lessonSibling(lesson);
  const next = nextLesson(lesson);
  const total = lessonsByLang[lang].length;
  const kindLabel = lesson.kind === "basics" ? t.basicsLabel : t.microCaseLabel;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-white", children: [
    /* @__PURE__ */ jsx("div", { className: "grain", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx(HomeNav, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("article", { children: [
        /* @__PURE__ */ jsx("header", { className: "px-5 pb-10 pt-32 md:px-8 md:pb-12 md:pt-40", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-wrap items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: learnIndexPath(lang),
                className: "font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-accent transition-colors hover:text-white",
                children: [
                  "← ",
                  t.backToHub
                ]
              }
            ),
            sibling ? /* @__PURE__ */ jsx(
              "a",
              {
                href: lessonPath(sibling),
                className: "font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white/50 transition-colors hover:text-accent",
                children: t.switchLabel
              }
            ) : null
          ] }),
          /* @__PURE__ */ jsxs(
            "nav",
            {
              "aria-label": "Breadcrumb",
              className: "mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white/40",
              children: [
                /* @__PURE__ */ jsx("a", { href: "/", className: "transition-colors hover:text-accent", children: "SHOT.IS" }),
                /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "mx-2", children: "/" }),
                /* @__PURE__ */ jsx("a", { href: learnIndexPath(lang), className: "transition-colors hover:text-accent", children: t.hubTitle }),
                /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "mx-2", children: "/" }),
                /* @__PURE__ */ jsx("span", { className: "text-white/60", children: lesson.title })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("p", { className: "mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent", children: [
            kindLabel,
            " · ",
            lesson.order,
            "/",
            total
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "max-w-4xl text-[clamp(2rem,5.5vw,3.75rem)] font-extrabold uppercase leading-[0.92] tracking-tight", children: lesson.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-7 max-w-2xl text-lg font-medium leading-relaxed text-white/60", children: lesson.excerpt }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white/45", children: [
            /* @__PURE__ */ jsx("span", { className: "text-accent", children: t.learningTime(formatMinutes(learningMinutes(lesson))) }),
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "·" }),
            /* @__PURE__ */ jsx("span", { children: t.watchTime(formatSeconds(lesson.videoSeconds)) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "px-5 md:px-8", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-5xl", children: /* @__PURE__ */ jsx(LessonPlayer, { lesson, lang }) }) }),
        /* @__PURE__ */ jsx("section", { className: "px-5 pt-16 md:px-8 md:pt-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-5xl grid-cols-1 gap-4 lg:grid-cols-3", children: [
          /* @__PURE__ */ jsxs("div", { "data-reveal": true, className: "reveal-text rounded-[4px] border border-accent/30 bg-accent/[0.06] p-6 lg:col-span-2", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-accent", children: t.whatYouLearn }),
            /* @__PURE__ */ jsx("p", { className: "text-xl font-bold leading-snug tracking-tight text-white md:text-2xl", children: lesson.outcome })
          ] }),
          /* @__PURE__ */ jsxs("div", { "data-reveal": true, className: "reveal-text rounded-[4px] border border-white/10 bg-white/[0.02] p-6", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-white/40", children: t.nodesUsed }),
            /* @__PURE__ */ jsx("ul", { className: "flex flex-wrap gap-2", children: lesson.nodes.map((node) => /* @__PURE__ */ jsx(
              "li",
              {
                className: "rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] font-bold tracking-[0.12em] text-white/55",
                children: node
              },
              node
            )) }),
            lesson.prerequisites?.length ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("p", { className: "mb-3 mt-7 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-white/40", children: t.prerequisites }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: lesson.prerequisites.map((item) => /* @__PURE__ */ jsx("li", { className: "text-sm font-medium leading-relaxed text-white/55", children: item }, item)) })
            ] }) : null
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "px-5 pt-16 md:px-8 md:pt-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-10 text-3xl font-black uppercase leading-none tracking-tight md:text-5xl", children: t.inThisLesson }),
          /* @__PURE__ */ jsx("ol", { className: "space-y-px overflow-hidden rounded-[4px] border border-white/10", children: lesson.steps.map((step, index) => /* @__PURE__ */ jsxs(
            "li",
            {
              "data-reveal": true,
              className: "reveal-text grid grid-cols-1 gap-x-8 gap-y-3 bg-white/[0.02] p-6 md:grid-cols-[6rem_1fr] md:p-8",
              style: { transitionDelay: `${index * 0.05}s` },
              children: [
                /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent", children: /* @__PURE__ */ jsx("span", { className: "tabular-nums", children: formatTimestamp(step.at) }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-black uppercase leading-tight tracking-tight md:text-2xl", children: step.title }),
                  /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-2xl text-base font-medium leading-relaxed text-white/55", children: step.body })
                ] })
              ]
            },
            step.at
          )) })
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "px-5 pt-16 md:px-8 md:pt-24", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-5xl", children: /* @__PURE__ */ jsxs("details", { className: "group rounded-[4px] border border-white/10 bg-white/[0.02]", children: [
          /* @__PURE__ */ jsxs("summary", { className: "flex cursor-pointer list-none items-center justify-between gap-4 p-6 md:p-8", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("span", { className: "block text-xl font-black uppercase tracking-tight md:text-2xl", children: t.transcript }),
              /* @__PURE__ */ jsx("span", { className: "mt-2 block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35", children: t.transcriptNote })
            ] }),
            /* @__PURE__ */ jsx(
              "span",
              {
                "aria-hidden": "true",
                className: "flex-none font-mono text-lg text-accent transition-transform group-open:rotate-45",
                children: "+"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "border-t border-white/10 p-6 md:p-8", children: /* @__PURE__ */ jsx("ol", { className: "space-y-3", children: lesson.captions.map((caption) => /* @__PURE__ */ jsxs("li", { className: "grid grid-cols-[3.5rem_1fr] gap-4", children: [
            /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] font-bold tabular-nums tracking-[0.12em] text-white/30", children: formatTimestamp(caption.at) }),
            /* @__PURE__ */ jsx("span", { className: "text-base font-medium leading-relaxed text-white/60", children: caption.text })
          ] }, caption.at)) }) })
        ] }) }) }),
        lesson.faq?.length ? /* @__PURE__ */ jsx("section", { className: "px-5 pt-16 md:px-8 md:pt-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-10 text-3xl font-black uppercase leading-none tracking-tight md:text-5xl", children: t.faqTitle }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: lesson.faq.map((item) => /* @__PURE__ */ jsxs(
            "article",
            {
              "data-reveal": true,
              className: "reveal-text rounded-[4px] border border-white/10 bg-white/[0.02] p-6 md:p-8",
              children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold leading-snug tracking-tight text-white", children: item.question }),
                /* @__PURE__ */ jsx("p", { className: "mt-4 text-base font-medium leading-relaxed text-white/55", children: item.answer })
              ]
            },
            item.question
          )) })
        ] }) }) : null
      ] }),
      /* @__PURE__ */ jsx("section", { className: "mt-20 bg-accent px-5 py-16 text-white md:mt-28 md:px-8 md:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl", children: t.ctaTitle }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-xl text-base font-medium leading-relaxed text-white/85 md:text-lg", children: t.ctaBody }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: withUtm("https://studio.shot.is/", "lesson"),
            onClick: () => trackStudioClick("lesson"),
            className: "mt-8 inline-flex items-center justify-center bg-white px-9 py-5 text-xs font-black uppercase tracking-[0.26em] text-black transition-all hover:-rotate-1 hover:bg-black hover:text-white",
            children: t.ctaButton
          }
        )
      ] }) }),
      next ? /* @__PURE__ */ jsx("section", { className: "px-5 py-16 md:px-8 md:py-24", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-5xl", children: /* @__PURE__ */ jsxs(
        "a",
        {
          href: lessonPath(next),
          className: "group flex flex-col gap-6 rounded-[4px] border border-white/10 p-7 transition-colors hover:border-accent/50 hover:bg-white/[0.03] md:flex-row md:items-center md:justify-between md:p-10",
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("p", { className: "font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-accent", children: [
                t.nextLesson,
                " · ",
                next.order,
                "/",
                total
              ] }),
              /* @__PURE__ */ jsx("h2", { className: "mt-4 text-2xl font-black uppercase leading-tight tracking-tight transition-colors group-hover:text-accent md:text-4xl", children: next.title }),
              /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-xl text-base font-medium leading-relaxed text-white/50", children: next.excerpt })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "flex-none font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/45", children: t.learningTime(formatMinutes(learningMinutes(next))) })
          ]
        }
      ) }) }) : null
    ] }),
    /* @__PURE__ */ jsx(HomeFooter, {})
  ] });
}
function PrivacyPage() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-white", children: [
    /* @__PURE__ */ jsx("div", { className: "grain", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx(HomeNav, {}),
    /* @__PURE__ */ jsx("main", { className: "px-5 pb-32 pt-36 md:px-8 md:pt-44", children: /* @__PURE__ */ jsxs("article", { className: "mx-auto max-w-3xl space-y-10 text-white/75", children: [
      /* @__PURE__ */ jsxs("header", { children: [
        /* @__PURE__ */ jsx("p", { className: "mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-accent", children: "Privacy Policy" }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-extrabold uppercase leading-[0.92] tracking-tight md:text-6xl", children: "Privacy Policy" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-4 font-mono text-[11px] uppercase tracking-[0.24em] text-white/45", children: [
          "Last updated: ",
          privacyPolicyLastUpdated
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "space-y-4 text-base leading-relaxed md:text-lg", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-black uppercase tracking-tight md:text-2xl", children: "What we collect" }),
        /* @__PURE__ */ jsx("p", { children: "SHOT.IS collects information you submit through our contact channels (name, email, brand, project details), aggregate analytics about site visits (page views, referrer, device class), and any project files you choose to share when scoping a brief." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "space-y-4 text-base leading-relaxed md:text-lg", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-black uppercase tracking-tight md:text-2xl", children: "How we use it" }),
        /* @__PURE__ */ jsx("p", { children: "We use submitted information to respond to inquiries, scope creative projects, deliver assets, and improve the studio. We do not sell personal information. We do not use AI training pipelines on client briefs or assets without explicit written agreement." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "space-y-4 text-base leading-relaxed md:text-lg", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-black uppercase tracking-tight md:text-2xl", children: "Cookies and analytics" }),
        /* @__PURE__ */ jsx("p", { children: "The site uses minimal first-party storage required for navigation. Analytics, when enabled, are aggregated and do not identify individual visitors. If we add third-party tooling, this policy will be updated and will list the providers." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "space-y-4 text-base leading-relaxed md:text-lg", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-black uppercase tracking-tight md:text-2xl", children: "Your rights" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "You may request access, correction, or deletion of personal information we hold by emailing",
          " ",
          /* @__PURE__ */ jsx("a", { href: "mailto:privacy@shot.is", className: "text-accent underline-offset-4 hover:underline", children: "privacy@shot.is" }),
          ". We respond within 30 days."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "space-y-4 text-base leading-relaxed md:text-lg", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-black uppercase tracking-tight md:text-2xl", children: "Contact" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Questions about this policy:",
          " ",
          /* @__PURE__ */ jsx("a", { href: "mailto:privacy@shot.is", className: "text-accent underline-offset-4 hover:underline", children: "privacy@shot.is" }),
          "."
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(HomeFooter, {})
  ] });
}
const pricingFacts = [
  {
    title: "What the $4.99 offer means",
    body: "It is the limited-time entry price for one self-serve AI video generation in SHOT.IS Studio. The selected model, duration, and credit cost remain visible before the run starts."
  },
  {
    title: "Why video packs exist",
    body: "Paid social rarely needs one render. Packs are for teams testing several hooks, creators, shots, or product angles. Current sizes and prices live in Studio so checkout and this page never disagree."
  },
  {
    title: "When managed production wins",
    body: "Choose managed production when the job includes creative strategy, reference preparation, continuity QA, editing, and campaign-ready variant naming — not just generating a clip."
  }
];
function PricingPage() {
  useRevealOnScroll();
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-white", children: [
    /* @__PURE__ */ jsx("div", { className: "grain", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx(HomeNav, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("section", { className: "px-5 pb-20 pt-36 md:px-8 md:pb-28 md:pt-44", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-accent", children: "SHOT.IS Pricing" }),
        /* @__PURE__ */ jsxs("h1", { className: "max-w-6xl text-[clamp(2.4rem,7vw,6.5rem)] font-extrabold uppercase leading-[0.88] tracking-tight", children: [
          "AI videos from ",
          launchOffer.price,
          ". No mystery math."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-10 max-w-3xl text-lg font-medium leading-relaxed text-white/60 md:text-xl", children: "Generate one video self-serve, buy a pack for creative testing, or brief SHOT.IS to deliver the full campaign. The production mode changes; the price boundary stays explicit." })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-[#050505] px-5 py-20 md:px-8 md:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
        /* @__PURE__ */ jsx(PricingCards, { location: "pricing_page" }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-3xl font-mono text-[10px] font-semibold uppercase leading-relaxed tracking-[0.2em] text-white/35", children: launchOffer.note })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-white px-5 py-24 text-black md:px-8 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-14 max-w-4xl", children: [
          /* @__PURE__ */ jsx("p", { className: "mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent", children: "The honest boundary" }),
          /* @__PURE__ */ jsx("h2", { className: "text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-[68px]", children: "A generation is not the same job as a campaign." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-3", children: pricingFacts.map((fact, index) => /* @__PURE__ */ jsxs(
          "article",
          {
            "data-reveal": true,
            className: "reveal-text rounded-[4px] border border-black/10 p-6 md:p-8",
            style: { transitionDelay: `${index * 0.08}s` },
            children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black uppercase leading-none tracking-tight", children: fact.title }),
              /* @__PURE__ */ jsx("p", { className: "mt-5 text-base font-medium leading-relaxed text-black/60", children: fact.body })
            ]
          },
          fact.title
        )) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(HomeFooter, {})
  ] });
}
function ServicePage({ page }) {
  useRevealOnScroll();
  const relatedPages = [...servicePages, ...useCasePages].filter((candidate) => candidate.path !== page.path);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-white", children: [
    /* @__PURE__ */ jsx("div", { className: "grain", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx(HomeNav, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { className: "relative w-full overflow-hidden px-5 pb-24 pt-36 md:px-8 md:pb-32 md:pt-44", children: [
        /* @__PURE__ */ jsxs("div", { className: "hero-stage", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx(
            "video",
            {
              className: "hero-stage__video",
              autoPlay: true,
              loop: true,
              muted: true,
              playsInline: true,
              poster: "/media/hero/shot-hero-poster.webp",
              children: /* @__PURE__ */ jsx("source", { src: "/media/hero/shot-hero-loop.mp4", type: "video/mp4" })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "hero-stage__veil" }),
          /* @__PURE__ */ jsx("div", { className: "hero-stage__grid" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto max-w-7xl", children: [
          /* @__PURE__ */ jsx("p", { className: "mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-accent", children: page.eyebrow }),
          /* @__PURE__ */ jsx("h1", { className: "max-w-6xl text-[clamp(2.05rem,8.5vw,7.375rem)] font-extrabold uppercase leading-[0.9] tracking-tight sm:leading-[0.88]", children: page.h1 }),
          /* @__PURE__ */ jsx("p", { className: "mt-10 max-w-3xl text-lg font-medium leading-tight text-white/50 md:text-2xl", children: page.lede }),
          /* @__PURE__ */ jsxs("div", { className: "mt-12 flex flex-col gap-4 sm:flex-row", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: withUtm("https://studio.shot.is/", "service_page"),
                onClick: () => trackStudioClick("service_page"),
                className: "inline-flex items-center justify-center bg-white px-8 py-5 text-xs font-black uppercase tracking-[0.26em] text-black transition-all hover:-rotate-1 hover:bg-accent hover:text-white md:px-10",
                children: page.primaryCta
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "#workflow",
                onClick: () => trackCta("service_page", page.secondaryCta),
                className: "inline-flex items-center justify-center border border-white/15 px-8 py-5 text-xs font-black uppercase tracking-[0.26em] text-white transition-colors hover:border-accent hover:text-accent md:px-10",
                children: page.secondaryCta
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "bg-white px-5 py-24 text-black md:px-8 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20", children: [
        /* @__PURE__ */ jsxs("div", { "data-reveal": true, className: "reveal-text", children: [
          /* @__PURE__ */ jsx("p", { className: "mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent", children: "Campaign outputs" }),
          /* @__PURE__ */ jsx("h2", { className: "text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-[72px]", children: "What clients can create." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4", children: page.outputs.map((output, index) => /* @__PURE__ */ jsxs(
          "article",
          {
            "data-reveal": true,
            className: "reveal-text rounded-[4px] border border-black/10 p-6 md:p-8",
            style: { transitionDelay: `${index * 0.07}s` },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-accent", children: [
                "0",
                index + 1
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-base font-bold leading-relaxed text-black/70 md:text-lg", children: output })
            ]
          },
          output
        )) })
      ] }) }),
      page.showRoster ? /* @__PURE__ */ jsx(RosterSection, {}) : null,
      /* @__PURE__ */ jsx("section", { id: "workflow", className: "bg-[#050505] px-5 py-24 text-white md:px-8 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-14 max-w-4xl", children: [
          /* @__PURE__ */ jsx("p", { className: "mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent", children: "Workflow" }),
          /* @__PURE__ */ jsx("h2", { className: "text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-[72px]", children: "From brief to campaign-ready assets." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: page.workflow.map((step, index) => /* @__PURE__ */ jsxs(
          "article",
          {
            "data-reveal": true,
            className: "reveal-text rounded-[4px] border border-white/10 bg-white/[0.03] p-6 md:p-8",
            style: { transitionDelay: `${index * 0.07}s` },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent", children: [
                "0",
                index + 1
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black uppercase leading-none tracking-tight md:text-3xl", children: step.title }),
              /* @__PURE__ */ jsx("p", { className: "mt-5 text-sm font-medium leading-relaxed text-white/48 md:text-base", children: step.body })
            ]
          },
          step.title
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-black px-5 py-24 text-white md:px-8 md:py-32", children: /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-3", children: page.proof.map((item, index) => /* @__PURE__ */ jsxs(
        "article",
        {
          "data-reveal": true,
          className: "reveal-text rounded-[4px] border border-white/10 p-6 md:p-8",
          style: { transitionDelay: `${index * 0.07}s` },
          children: [
            /* @__PURE__ */ jsx("p", { className: "mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent", children: item.label }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium leading-relaxed text-white/55 md:text-base", children: item.body })
          ]
        },
        item.label
      )) }) }),
      page.caseStudy ? /* @__PURE__ */ jsx("section", { className: "bg-[#050505] px-5 py-24 text-white md:px-8 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent", children: "Case in motion" }),
        /* @__PURE__ */ jsx("h2", { className: "mb-10 text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-[64px]", children: page.caseStudy.client }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("article", { "data-reveal": true, className: "reveal-text rounded-[4px] border border-white/10 p-6 md:p-8", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/45", children: "Challenge" }),
            /* @__PURE__ */ jsx("p", { className: "text-base font-medium leading-relaxed text-white/70", children: page.caseStudy.challenge })
          ] }),
          /* @__PURE__ */ jsxs("article", { "data-reveal": true, className: "reveal-text rounded-[4px] border border-accent/40 bg-accent/5 p-6 md:p-8", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent", children: "Outcome" }),
            /* @__PURE__ */ jsx("p", { className: "text-base font-medium leading-relaxed text-white/80", children: page.caseStudy.outcome })
          ] })
        ] })
      ] }) }) : null,
      /* @__PURE__ */ jsx("section", { className: "bg-white px-5 py-24 text-black md:px-8 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent", children: "Questions" }),
        /* @__PURE__ */ jsx("h2", { className: "mb-12 text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-[72px]", children: "What teams ask before starting." }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: page.questions.map((item, index) => /* @__PURE__ */ jsxs(
          "article",
          {
            "data-reveal": true,
            className: "reveal-text rounded-[4px] border border-black/10 p-6 md:p-8",
            style: { transitionDelay: `${index * 0.07}s` },
            children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black uppercase leading-tight tracking-tight", children: item.question }),
              /* @__PURE__ */ jsx("p", { className: "mt-5 text-base font-medium leading-relaxed text-black/58", children: item.answer })
            ]
          },
          item.question
        )) })
      ] }) }),
      page.reading?.length ? /* @__PURE__ */ jsx("section", { className: "bg-black px-5 py-16 text-white md:px-8 md:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent", children: "Go deeper" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: page.reading.map((item) => /* @__PURE__ */ jsxs(
          "a",
          {
            href: item.href,
            onClick: () => trackCta("service_page", item.label),
            className: "block border-b border-white/10 pb-3 text-lg font-bold uppercase tracking-tight text-white/70 transition-colors hover:text-accent md:text-xl",
            children: [
              item.label,
              " →"
            ]
          },
          item.href
        )) })
      ] }) }) : null,
      /* @__PURE__ */ jsx("section", { className: "bg-accent px-5 py-24 text-white md:px-8 md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-10 text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-[72px]", children: "Related AI content services." }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: relatedPages.map((related) => /* @__PURE__ */ jsxs(
          "a",
          {
            href: related.path,
            className: "rounded-[4px] border border-white/20 bg-black/20 p-6 transition-colors hover:bg-black/40 md:p-8",
            children: [
              /* @__PURE__ */ jsx("p", { className: "font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-white/65", children: related.eyebrow }),
              /* @__PURE__ */ jsx("h3", { className: "mt-5 text-2xl font-black uppercase leading-none tracking-tight md:text-3xl", children: related.navLabel })
            ]
          },
          related.path
        )) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(HomeFooter, {})
  ] });
}
function TermsPage() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-white", children: [
    /* @__PURE__ */ jsx("div", { className: "grain", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx(HomeNav, {}),
    /* @__PURE__ */ jsx("main", { className: "px-5 pb-32 pt-36 md:px-8 md:pt-44", children: /* @__PURE__ */ jsxs("article", { className: "mx-auto max-w-3xl space-y-10 text-white/75", children: [
      /* @__PURE__ */ jsxs("header", { children: [
        /* @__PURE__ */ jsx("p", { className: "mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-accent", children: "Terms of Service" }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-extrabold uppercase leading-[0.92] tracking-tight md:text-6xl", children: "Terms of Service" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-4 font-mono text-[11px] uppercase tracking-[0.24em] text-white/45", children: [
          "Last updated: ",
          termsLastUpdated
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "space-y-4 text-base leading-relaxed md:text-lg", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-black uppercase tracking-tight md:text-2xl", children: "Use of the site" }),
        /* @__PURE__ */ jsx("p", { children: "The SHOT.IS site is provided as-is for informational purposes. By using the site you agree not to attempt to disrupt the service, scrape it for unlicensed AI training, or use it to develop competing services that copy proprietary brand creative shown here." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "space-y-4 text-base leading-relaxed md:text-lg", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-black uppercase tracking-tight md:text-2xl", children: "AI content" }),
        /* @__PURE__ */ jsx("p", { children: "AI-generated assets shown on the site are illustrative. Likeness, brand logos, and creative outputs produced under contract belong to the engagement scope agreed in writing with each client. SHOT.IS does not generate content depicting real, identifiable individuals without their consent." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "space-y-4 text-base leading-relaxed md:text-lg", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-black uppercase tracking-tight md:text-2xl", children: "Service engagements" }),
        /* @__PURE__ */ jsx("p", { children: "Paid engagements are governed by a separate statement of work that defines deliverables, timelines, ownership, and revisions. These terms do not replace any signed agreement." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "space-y-4 text-base leading-relaxed md:text-lg", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-black uppercase tracking-tight md:text-2xl", children: "Disclaimers" }),
        /* @__PURE__ */ jsx("p", { children: "SHOT.IS does not guarantee specific advertising outcomes. Performance figures referenced in case studies represent past engagements and are not a forecast for future campaigns." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "space-y-4 text-base leading-relaxed md:text-lg", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-black uppercase tracking-tight md:text-2xl", children: "Contact" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Questions about these terms:",
          " ",
          /* @__PURE__ */ jsx("a", { href: "mailto:legal@shot.is", className: "text-accent underline-offset-4 hover:underline", children: "legal@shot.is" }),
          "."
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(HomeFooter, {})
  ] });
}
const absoluteUrl = (path) => new URL(path, siteBaseUrl).toString();
const plainText = (text) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");
const buildFaqSchema = (url, faqs) => ({
  "@type": "FAQPage",
  "@id": `${url}#faq`,
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: plainText(faq.question),
    acceptedAnswer: { "@type": "Answer", text: plainText(faq.answer) }
  }))
});
const upsertMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};
const upsertLink = (selector, attributes) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};
const upsertJsonLd = (id, data) => {
  let element = document.getElementById(id);
  if (!element) {
    element = document.createElement("script");
    element.id = id;
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
};
const founderPersonSchema = founder ? {
  "@type": "Person",
  "@id": `${siteBaseUrl}/about#founder`,
  name: founder.name,
  jobTitle: founder.role,
  description: founder.bio,
  url: `${siteBaseUrl}/about#founder`,
  worksFor: { "@id": `${siteBaseUrl}/#organization` },
  ...{ image: new URL(founder.photo, siteBaseUrl).toString() },
  ...{ sameAs: [founder.linkedIn] }
} : null;
const organizationSchema = {
  "@type": "Organization",
  "@id": `${siteBaseUrl}/#organization`,
  name: "SHOT.IS",
  url: siteBaseUrl,
  logo: `${siteBaseUrl}/favicon.svg`,
  description: "AI UGC ad generator and managed production studio for self-serve videos, creative testing packs, and campaign-ready ad variants.",
  email: organizationEmail,
  knowsAbout: organizationKnowsAbout,
  ...{},
  ...founderPersonSchema ? { founder: { "@id": `${siteBaseUrl}/about#founder` } } : {},
  ...organizationSameAs.length > 0 ? { sameAs: organizationSameAs } : {}
};
const softwareApplicationSchema = {
  "@type": "SoftwareApplication",
  "@id": "https://studio.shot.is/#app",
  name: "SHOT.IS Studio",
  alternateName: "SHOT.IS AI UGC Ad Generator",
  url: studioUrl,
  applicationCategory: "MultimediaApplication",
  applicationSubCategory: "AI UGC ad generator",
  operatingSystem: "Web",
  description: "Self-serve AI UGC ad generator for creating reference-aware video, reusable AI creators, product shots, keyframe-to-video generations, and ad variants across multiple models.",
  featureList: [
    "Reusable AI creator personas",
    "Product, outfit, and background reference images",
    "Keyframe-first image-to-video generation",
    "Multi-model routing (Veo 3, Grok Imagine, Kling)",
    "Hook variants and ad assembly"
  ],
  offers: {
    "@type": "Offer",
    url: studioUrl,
    price: launchOffer.priceValue,
    priceCurrency: launchOffer.currency,
    availability: "https://schema.org/InStock",
    category: "Limited-time launch offer",
    description: "One self-serve AI video at the SHOT.IS launch price. Video packs with current volume pricing are available in Studio."
  },
  publisher: { "@id": `${siteBaseUrl}/#organization` }
};
const websiteSchema = {
  "@type": "WebSite",
  "@id": `${siteBaseUrl}/#website`,
  url: siteBaseUrl,
  name: "SHOT.IS",
  publisher: { "@id": `${siteBaseUrl}/#organization` },
  inLanguage: "en"
};
const buildHomeSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    ...founderPersonSchema ? [founderPersonSchema] : [],
    websiteSchema,
    softwareApplicationSchema,
    {
      "@type": "WebPage",
      "@id": `${siteBaseUrl}/#webpage`,
      url: siteBaseUrl,
      name: homeSeo.title,
      description: homeSeo.description,
      isPartOf: { "@id": `${siteBaseUrl}/#website` },
      about: { "@id": `${siteBaseUrl}/#organization` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: defaultImage
      },
      dateModified: homeSeo.dateModified
    },
    {
      "@type": "Service",
      "@id": `${siteBaseUrl}/#ai-content-studio`,
      name: "Managed AI UGC ad production",
      provider: { "@id": `${siteBaseUrl}/#organization` },
      areaServed: "Worldwide",
      serviceType: "Managed AI UGC ads, AI video ads, and virtual influencer campaign production",
      description: homeSeo.description,
      isRelatedTo: { "@id": "https://studio.shot.is/#app" },
      offers: {
        "@type": "OfferCatalog",
        name: "AI content services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "AI UGC ads" }
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "AI video ads" }
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Virtual influencer campaigns" }
          }
        ]
      }
    },
    {
      "@type": "VideoObject",
      name: "SHOT.IS AI content studio reel",
      description: "A short visual reel for AI UGC ads, AI video ads, and virtual creator campaigns by SHOT.IS.",
      thumbnailUrl: `${siteBaseUrl}/media/reel/visual-overload-poster.jpg`,
      uploadDate: homeReelUploadDate,
      contentUrl: `${siteBaseUrl}/media/reel/visual-overload.mp4`,
      embedUrl: `${siteBaseUrl}/media/reel/visual-overload.mp4`,
      duration: "PT12S"
    }
  ]
});
const buildServiceSchema = (page) => ({
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    websiteSchema,
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl(page.path)}#webpage`,
      url: absoluteUrl(page.path),
      name: page.title,
      description: page.description,
      isPartOf: { "@id": `${siteBaseUrl}/#website` },
      about: { "@id": `${siteBaseUrl}/#organization` },
      dateModified: page.dateModified,
      breadcrumb: { "@id": `${absoluteUrl(page.path)}#breadcrumb` }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${absoluteUrl(page.path)}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "SHOT.IS",
          item: siteBaseUrl
        },
        {
          "@type": "ListItem",
          position: 2,
          name: page.navLabel,
          item: absoluteUrl(page.path)
        }
      ]
    },
    {
      "@type": "Service",
      "@id": `${absoluteUrl(page.path)}#service`,
      name: page.navLabel,
      provider: { "@id": `${siteBaseUrl}/#organization` },
      areaServed: "Worldwide",
      serviceType: page.eyebrow,
      description: page.description,
      url: absoluteUrl(page.path)
    },
    buildFaqSchema(absoluteUrl(page.path), page.questions)
  ]
});
const buildComparisonSchema = (page) => {
  const url = absoluteUrl(page.path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      websiteSchema,
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.title,
        description: page.description,
        isPartOf: { "@id": `${siteBaseUrl}/#website` },
        about: { "@id": `${siteBaseUrl}/#organization` },
        dateModified: page.asOf,
        breadcrumb: { "@id": `${url}#breadcrumb` }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "SHOT.IS", item: siteBaseUrl },
          { "@type": "ListItem", position: 2, name: page.navLabel, item: url }
        ]
      },
      ...page.kind === "alternatives" ? [
        {
          "@type": "ItemList",
          "@id": `${url}#list`,
          name: page.h1,
          description: page.description,
          itemListElement: page.alternatives.map((alt, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: alt.name,
            url: alt.url.startsWith("/") ? absoluteUrl(alt.url) : alt.url,
            description: `Best for ${alt.bestFor}. ${alt.summary}`
          }))
        }
      ] : [],
      buildFaqSchema(url, page.faq)
    ]
  };
};
const buildSimplePageSchema = (path, title, description, modifiedTime) => ({
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    websiteSchema,
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl(path)}#webpage`,
      url: absoluteUrl(path),
      name: title,
      description,
      isPartOf: { "@id": `${siteBaseUrl}/#website` },
      about: { "@id": `${siteBaseUrl}/#organization` },
      ...modifiedTime ? { dateModified: modifiedTime } : {}
    }
  ]
});
const ogImageUrl = (key) => `${siteBaseUrl}/og/${key}.png`;
const blogPostMetaTitle = (post2) => post2.metaTitle ?? `${post2.title} | SHOT.IS`;
const buildBlogPostSchema = (post2) => {
  const path = blogPostPath(post2);
  const url = absoluteUrl(path);
  const image = ogImageUrl(post2.ogImageKey);
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      websiteSchema,
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post2.title,
        description: post2.description,
        image,
        datePublished: post2.datePublished,
        dateModified: post2.dateModified ?? post2.datePublished,
        inLanguage: post2.lang,
        author: {
          "@type": post2.author.authorType ?? "Organization",
          name: post2.author.name,
          url: post2.author.url ?? siteBaseUrl,
          ...post2.author.sameAs?.length ? { sameAs: post2.author.sameAs } : {}
        },
        publisher: { "@id": `${siteBaseUrl}/#organization` },
        mainEntityOfPage: { "@id": `${url}#webpage` },
        keywords: post2.tags.join(", ")
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: blogPostMetaTitle(post2),
        description: post2.description,
        inLanguage: post2.lang,
        isPartOf: { "@id": `${siteBaseUrl}/#website` },
        about: { "@id": `${siteBaseUrl}/#organization` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        dateModified: post2.dateModified ?? post2.datePublished
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "SHOT.IS", item: siteBaseUrl },
          { "@type": "ListItem", position: 2, name: blogStrings[post2.lang].blogTitle, item: absoluteUrl(blogIndexPath(post2.lang)) },
          { "@type": "ListItem", position: 3, name: post2.title, item: url }
        ]
      },
      ...post2.faq?.length ? [buildFaqSchema(url, post2.faq)] : []
    ]
  };
};
const buildBlogIndexSchema = (lang) => {
  const path = blogIndexPath(lang);
  const url = absoluteUrl(path);
  const posts = blogPostsByLang[lang];
  const dateModified = posts.reduce(
    (latest, post2) => Math.max(latest, Date.parse(post2.dateModified ?? post2.datePublished)),
    0
  );
  const modifiedTime = new Date(dateModified).toISOString().slice(0, 10);
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      websiteSchema,
      {
        "@type": "Blog",
        "@id": `${url}#blog`,
        url,
        name: blogStrings[lang].blogTitle,
        description: blogStrings[lang].blogLede,
        inLanguage: lang,
        dateModified: modifiedTime,
        publisher: { "@id": `${siteBaseUrl}/#organization` },
        blogPost: posts.map((post2) => ({
          "@type": "BlogPosting",
          headline: post2.title,
          url: absoluteUrl(blogPostPath(post2)),
          datePublished: post2.datePublished,
          inLanguage: post2.lang
        }))
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: blogStrings[lang].blogTitle,
        description: blogStrings[lang].blogLede,
        inLanguage: lang,
        dateModified: modifiedTime,
        isPartOf: { "@id": `${siteBaseUrl}/#website` },
        about: { "@id": `${siteBaseUrl}/#organization` }
      }
    ]
  };
};
const buildBlogPostSeo = (post2) => {
  const path = blogPostPath(post2);
  return {
    path,
    title: blogPostMetaTitle(post2),
    description: post2.description,
    ogImage: ogImageUrl(post2.ogImageKey),
    ogType: "article",
    canonical: absoluteUrl(path),
    alternates: blogAlternates(post2),
    structuredData: buildBlogPostSchema(post2),
    publishedTime: post2.datePublished,
    modifiedTime: post2.dateModified ?? post2.datePublished
  };
};
const buildBlogIndexSeo = (lang) => {
  const path = blogIndexPath(lang);
  const modifiedTime = blogPostsByLang[lang].map((post2) => post2.dateModified ?? post2.datePublished).sort().slice(-1)[0];
  return {
    path,
    title: `${blogStrings[lang].blogTitle} — AI UGC Ads, AI Video Ads & Virtual Influencers`,
    description: blogStrings[lang].blogLede,
    ogImage: ogImageUrl("blog-index"),
    ogType: "website",
    canonical: absoluteUrl(path),
    alternates: blogIndexAlternates(),
    structuredData: buildBlogIndexSchema(lang),
    modifiedTime
  };
};
const lessonMetaTitle = (lesson) => lesson.metaTitle ?? `${lesson.title} | SHOT.IS`;
const lessonVideoSchema = (lesson) => {
  if (lesson.videoPending) return [];
  const url = absoluteUrl(lessonPath(lesson));
  return [
    {
      "@type": "VideoObject",
      "@id": `${url}#video`,
      name: lesson.title,
      description: lesson.description,
      thumbnailUrl: absoluteUrl(lesson.video.poster),
      contentUrl: absoluteUrl(lesson.video.src),
      embedUrl: url,
      uploadDate: lesson.datePublished,
      duration: isoDuration(lesson.videoSeconds),
      inLanguage: lesson.lang,
      isFamilyFriendly: true,
      transcript: lessonTranscript(lesson),
      publisher: { "@id": `${siteBaseUrl}/#organization` },
      learningResourceType: "Screencast",
      hasPart: lesson.steps.map((step) => ({
        "@type": "Clip",
        name: step.title,
        startOffset: step.at
      }))
    }
  ];
};
const buildLessonSchema = (lesson) => {
  const url = absoluteUrl(lessonPath(lesson));
  const t = learnStrings[lesson.lang];
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      websiteSchema,
      ...lessonVideoSchema(lesson),
      {
        "@type": "HowTo",
        "@id": `${url}#howto`,
        name: lesson.title,
        description: lesson.description,
        inLanguage: lesson.lang,
        totalTime: isoDuration(learningMinutes(lesson) * 60),
        step: lesson.steps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.title,
          text: step.body,
          url: `${url}#step-${index + 1}`
        }))
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: lessonMetaTitle(lesson),
        description: lesson.description,
        inLanguage: lesson.lang,
        isPartOf: { "@id": `${siteBaseUrl}/#website` },
        about: { "@id": "https://studio.shot.is/#app" },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        dateModified: lesson.dateModified ?? lesson.datePublished
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "SHOT.IS", item: siteBaseUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: t.hubTitle,
            item: absoluteUrl(learnIndexPath(lesson.lang))
          },
          { "@type": "ListItem", position: 3, name: lesson.title, item: url }
        ]
      },
      ...lesson.faq?.length ? [buildFaqSchema(url, lesson.faq)] : []
    ]
  };
};
const buildLearnIndexSchema = (lang) => {
  const url = absoluteUrl(learnIndexPath(lang));
  const lessons2 = lessonsByLang[lang];
  const t = learnStrings[lang];
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      websiteSchema,
      {
        "@type": "Course",
        "@id": `${url}#course`,
        name: t.hubTitle,
        description: t.hubLede,
        url,
        inLanguage: lang,
        isAccessibleForFree: true,
        provider: { "@id": `${siteBaseUrl}/#organization` },
        teaches: lessons2.map((lesson) => lesson.outcome),
        about: { "@id": "https://studio.shot.is/#app" },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
          courseWorkload: isoDuration(pathMinutes(lang) * 60)
        },
        syllabusSections: lessons2.map((lesson, index) => ({
          "@type": "Syllabus",
          position: index + 1,
          name: lesson.title,
          description: lesson.outcome,
          url: absoluteUrl(lessonPath(lesson)),
          timeRequired: isoDuration(learningMinutes(lesson) * 60)
        }))
      },
      {
        "@type": "ItemList",
        "@id": `${url}#list`,
        name: t.hubTitle,
        itemListElement: lessons2.map((lesson, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: lesson.title,
          url: absoluteUrl(lessonPath(lesson))
        }))
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: t.hubTitle,
        description: t.hubLede,
        inLanguage: lang,
        isPartOf: { "@id": `${siteBaseUrl}/#website` },
        about: { "@id": "https://studio.shot.is/#app" },
        dateModified: learnPageMeta.dateModified
      }
    ]
  };
};
const buildLessonSeo = (lesson) => {
  const path = lessonPath(lesson);
  return {
    path,
    title: lessonMetaTitle(lesson),
    description: lesson.description,
    ogImage: ogImageUrl(lesson.ogImageKey),
    ogType: "article",
    canonical: absoluteUrl(path),
    alternates: lessonAlternates(lesson),
    structuredData: buildLessonSchema(lesson),
    publishedTime: lesson.datePublished,
    modifiedTime: lesson.dateModified ?? lesson.datePublished
  };
};
const buildLearnIndexSeo = (lang) => {
  const path = learnIndexPath(lang);
  const modifiedTime = lessonsByLang[lang].map((lesson) => lesson.dateModified ?? lesson.datePublished).sort().slice(-1)[0];
  return {
    path,
    title: `${learnStrings[lang].hubTitle} — Short Screencast Lessons`,
    description: learnStrings[lang].hubLede,
    ogImage: ogImageUrl("learn-index"),
    ogType: "website",
    canonical: absoluteUrl(path),
    alternates: learnIndexAlternates(),
    structuredData: buildLearnIndexSchema(lang),
    modifiedTime: modifiedTime ?? learnPageMeta.dateModified
  };
};
const aboutModifiedTime = "2026-08-25";
const faqModifiedTime = "2026-08-25";
const buildAboutSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    ...founderPersonSchema ? [founderPersonSchema] : [],
    websiteSchema,
    {
      "@type": "AboutPage",
      "@id": `${siteBaseUrl}/about#webpage`,
      url: `${siteBaseUrl}/about`,
      name: "About SHOT.IS — AI UGC Ad Platform & Managed Studio",
      description: "SHOT.IS combines a self-serve AI UGC ad generator with managed production for performance marketing teams.",
      isPartOf: { "@id": `${siteBaseUrl}/#website` },
      about: { "@id": `${siteBaseUrl}/#organization` },
      mainEntity: { "@id": `${siteBaseUrl}/#organization` },
      dateModified: aboutModifiedTime
    }
  ]
});
const aboutSeo = {
  path: "/about",
  modifiedTime: aboutModifiedTime,
  title: "About SHOT.IS — AI UGC Ad Platform & Managed Studio",
  description: "SHOT.IS combines a self-serve AI UGC ad generator with managed production for performance marketing teams.",
  structuredData: buildAboutSchema()
};
const contactSeo = {
  path: "/contact",
  modifiedTime: "2026-06-10",
  title: "Contact SHOT.IS — Start an AI Content Sprint",
  description: "Reach SHOT.IS to scope AI UGC ads, AI video ads, virtual influencer campaigns, or a creative testing pipeline."
};
const buildPricingPageSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    websiteSchema,
    softwareApplicationSchema,
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl(pricingPageMeta.path)}#webpage`,
      url: absoluteUrl(pricingPageMeta.path),
      name: pricingPageMeta.title,
      description: pricingPageMeta.description,
      dateModified: pricingPageMeta.dateModified,
      isPartOf: { "@id": `${siteBaseUrl}/#website` },
      about: { "@id": "https://studio.shot.is/#app" },
      breadcrumb: { "@id": `${absoluteUrl(pricingPageMeta.path)}#breadcrumb` }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${absoluteUrl(pricingPageMeta.path)}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "SHOT.IS", item: siteBaseUrl },
        { "@type": "ListItem", position: 2, name: "Pricing", item: absoluteUrl(pricingPageMeta.path) }
      ]
    }
  ]
});
const pricingSeo = {
  path: pricingPageMeta.path,
  modifiedTime: pricingPageMeta.dateModified,
  title: pricingPageMeta.title,
  description: pricingPageMeta.description,
  structuredData: buildPricingPageSchema()
};
const privacySeo = {
  path: "/privacy",
  modifiedTime: privacyPolicyLastUpdated,
  title: "Privacy Policy | SHOT.IS",
  description: "How SHOT.IS handles personal data, contact form submissions, and analytics."
};
const termsSeo = {
  path: "/terms",
  modifiedTime: termsLastUpdated,
  title: "Terms of Service | SHOT.IS",
  description: "Terms of service governing use of SHOT.IS, including AI content output rights and disclaimers."
};
const buildFaqPageSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    websiteSchema,
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl(faqPageMeta.path)}#webpage`,
      url: absoluteUrl(faqPageMeta.path),
      name: faqPageMeta.title,
      description: faqPageMeta.description,
      isPartOf: { "@id": `${siteBaseUrl}/#website` },
      about: { "@id": `${siteBaseUrl}/#organization` },
      dateModified: faqModifiedTime,
      breadcrumb: { "@id": `${absoluteUrl(faqPageMeta.path)}#breadcrumb` }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${absoluteUrl(faqPageMeta.path)}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "SHOT.IS", item: siteBaseUrl },
        { "@type": "ListItem", position: 2, name: "FAQ", item: absoluteUrl(faqPageMeta.path) }
      ]
    },
    buildFaqSchema(absoluteUrl(faqPageMeta.path), allFaqItems)
  ]
});
const faqSeo = {
  path: faqPageMeta.path,
  modifiedTime: faqModifiedTime,
  title: faqPageMeta.title,
  description: faqPageMeta.description,
  structuredData: buildFaqPageSchema()
};
const STATIC_PAGES$1 = [aboutSeo, contactSeo, pricingSeo, faqSeo, privacySeo, termsSeo];
const STATIC_PAGES_BY_PATH = new Map(STATIC_PAGES$1.map((p) => [p.path, p]));
const applySeoMeta = ({
  path,
  title,
  description,
  robots = "index,follow,max-image-preview:large",
  ogImage,
  ogType = "website",
  canonical,
  alternates = [],
  structuredData
}) => {
  if (typeof document === "undefined") return;
  const url = canonical ?? absoluteUrl(path);
  const image = ogImage ?? defaultImage;
  document.title = title;
  upsertMeta('meta[name="description"]', { name: "description", content: description });
  upsertMeta('meta[name="robots"]', { name: "robots", content: robots });
  upsertMeta('meta[property="og:type"]', { property: "og:type", content: ogType });
  upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "SHOT.IS" });
  upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
  upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
  upsertMeta('meta[property="og:url"]', { property: "og:url", content: url });
  upsertMeta('meta[property="og:image"]', { property: "og:image", content: image });
  upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
  upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
  upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
  upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });
  upsertLink('link[rel="canonical"]', { rel: "canonical", href: url });
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
  alternates.forEach(
    ({ hreflang, href }) => upsertLink(`link[rel="alternate"][hreflang="${hreflang}"]`, { rel: "alternate", hreflang, href })
  );
  upsertJsonLd("shot-schema", structuredData ?? buildHomeSchema());
};
const notFoundSeo = {
  path: "/404",
  title: "404 · SHOT.IS",
  description: "The requested SHOT.IS page could not be found.",
  robots: "noindex,follow"
};
const homeStructuredData = buildHomeSchema();
const robotsDefault = "index,follow,max-image-preview:large";
const resolve = (seo) => ({
  path: seo.path,
  title: seo.title,
  description: seo.description,
  robots: seo.robots ?? robotsDefault,
  ogImage: seo.ogImage ?? defaultImage,
  ogType: seo.ogType ?? "website",
  canonical: seo.canonical ?? absoluteUrl(seo.path),
  alternates: seo.alternates ?? [],
  structuredData: seo.structuredData ?? buildHomeSchema(),
  publishedTime: seo.publishedTime,
  modifiedTime: seo.modifiedTime
});
const staticOgKey = (path) => path.replace(/^\//, "") || "home";
const getPageSeo = (rawPath) => {
  const path = (() => {
    const trimmed = rawPath.replace(/\/+$/, "");
    return trimmed === "" || trimmed === "/index.html" ? "/" : trimmed;
  })();
  if (path === "/") {
    return resolve({
      path: "/",
      title: homeSeo.title,
      description: homeSeo.description,
      ogImage: ogImageUrl("home"),
      canonical: absoluteUrl("/"),
      structuredData: homeStructuredData,
      modifiedTime: homeSeo.dateModified
    });
  }
  const service = servicePagesByPath.get(path) ?? useCasePagesByPath.get(path);
  if (service) {
    return resolve({
      path: service.path,
      title: service.title,
      description: service.description,
      ogImage: ogImageUrl(service.slug),
      canonical: absoluteUrl(service.path),
      structuredData: buildServiceSchema(service),
      modifiedTime: service.dateModified
    });
  }
  const comparison = comparisonPagesByPath.get(path);
  if (comparison) {
    return resolve({
      path: comparison.path,
      title: comparison.title,
      description: comparison.description,
      ogImage: ogImageUrl(comparison.slug),
      canonical: absoluteUrl(comparison.path),
      structuredData: buildComparisonSchema(comparison),
      modifiedTime: comparison.asOf
    });
  }
  const blogPost = blogPostByPath.get(path);
  if (blogPost) {
    return resolve(buildBlogPostSeo(blogPost));
  }
  if (path === blogIndexPath("en") || path === blogIndexPath("es")) {
    return resolve(buildBlogIndexSeo(path === blogIndexPath("es") ? "es" : "en"));
  }
  const lesson = lessonByPath.get(path);
  if (lesson) {
    return resolve(buildLessonSeo(lesson));
  }
  if (path === learnIndexPath("en") || path === learnIndexPath("es")) {
    return resolve(buildLearnIndexSeo(path === learnIndexPath("es") ? "es" : "en"));
  }
  const staticPage = STATIC_PAGES_BY_PATH.get(path);
  if (staticPage) {
    return resolve({
      path: staticPage.path,
      title: staticPage.title,
      description: staticPage.description,
      robots: staticPage.robots,
      ogImage: staticPage.ogImage ?? ogImageUrl(staticOgKey(staticPage.path)),
      canonical: absoluteUrl(staticPage.path),
      structuredData: staticPage.structuredData ?? buildSimplePageSchema(staticPage.path, staticPage.title, staticPage.description, staticPage.modifiedTime),
      modifiedTime: staticPage.modifiedTime
    });
  }
  return resolve({
    path: notFoundSeo.path,
    title: notFoundSeo.title,
    description: notFoundSeo.description,
    robots: notFoundSeo.robots,
    ogImage: defaultImage,
    canonical: absoluteUrl(notFoundSeo.path),
    structuredData: buildSimplePageSchema(notFoundSeo.path, notFoundSeo.title, notFoundSeo.description)
  });
};
const getIndexableRoutes = () => [
  "/",
  ...servicePages.map((p) => p.path),
  ...useCasePages.map((p) => p.path),
  ...comparisonPages.map((p) => p.path),
  ...STATIC_PAGES$1.map((p) => p.path),
  ...blogRoutes(),
  ...learnRoutes()
];
const buildSitemapEntries = () => getIndexableRoutes().map((path) => {
  const seo = getPageSeo(path);
  if (!seo.modifiedTime) {
    throw new Error(`Missing honest lastmod for indexable route: ${path}`);
  }
  return { loc: seo.canonical, lastmod: seo.modifiedTime, alternates: seo.alternates };
});
const normalizePath = (pathname) => {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
};
const HOME_PATHS = /* @__PURE__ */ new Set(["/", "/index.html"]);
const STATIC_PAGES = {
  "/about": () => /* @__PURE__ */ jsx(AboutPage, {}),
  "/contact": () => /* @__PURE__ */ jsx(ContactPage, {}),
  "/faq": () => /* @__PURE__ */ jsx(FaqPage, {}),
  "/pricing": () => /* @__PURE__ */ jsx(PricingPage, {}),
  "/privacy": () => /* @__PURE__ */ jsx(PrivacyPage, {}),
  "/terms": () => /* @__PURE__ */ jsx(TermsPage, {})
};
const giftHostnames = /* @__PURE__ */ new Set(["gift.shot.is", "gift.localhost"]);
const getGiftSlug = (pathname, hostname) => {
  const cleanPath = normalizePath(pathname);
  const segments = cleanPath.split("/").filter(Boolean);
  const isGiftHost = hostname ? giftHostnames.has(hostname) : false;
  const isLocalDevHost = hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
  if (isGiftHost) {
    return segments[0];
  }
  if (isLocalDevHost && segments[0] === "gift") {
    return segments[1];
  }
  return void 0;
};
const isGiftSurface = (pathname, hostname) => {
  const cleanPath = normalizePath(pathname);
  const segments = cleanPath.split("/").filter(Boolean);
  const isLocalDevHost = hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
  return Boolean(hostname && giftHostnames.has(hostname)) || isLocalDevHost && segments[0] === "gift";
};
function App({ path } = {}) {
  const incoming = path ?? (typeof window !== "undefined" ? window.location.pathname : "/");
  const hostname = typeof window !== "undefined" ? window.location.hostname : void 0;
  const pathname = normalizePath(incoming);
  const onGiftSurface = isGiftSurface(pathname, hostname);
  const giftSlug = getGiftSlug(pathname, hostname);
  const giftPage = giftSlug ? giftPagesBySlug.get(giftSlug) : void 0;
  const servicePage = onGiftSurface ? void 0 : servicePagesByPath.get(pathname) ?? useCasePagesByPath.get(pathname);
  const comparisonPage = onGiftSurface ? void 0 : comparisonPagesByPath.get(pathname);
  const blogPost = onGiftSurface ? void 0 : blogPostByPath.get(pathname);
  const blogIndexLang = onGiftSurface ? void 0 : pathname === blogIndexPath("en") ? "en" : pathname === blogIndexPath("es") ? "es" : void 0;
  const lesson = onGiftSurface ? void 0 : lessonByPath.get(pathname);
  const learnIndexLang = onGiftSurface ? void 0 : learnLangs.find((lang) => learnIndexPath(lang) === pathname);
  const isHome = !onGiftSurface && HOME_PATHS.has(pathname);
  const staticPage = onGiftSurface ? void 0 : STATIC_PAGES[pathname];
  const isNotFound = !giftPage && !isHome && !servicePage && !comparisonPage && !staticPage && !blogPost && !blogIndexLang && !lesson && !learnIndexLang;
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (giftPage) {
      applySeoMeta({
        path: `/${giftPage.slug}`,
        title: `${giftPage.businessName} video gift | SHOT.IS`,
        description: `A private SHOT.IS mini ad pack prepared for ${giftPage.businessName}.`,
        robots: "noindex,follow",
        canonical: `https://gift.shot.is/${giftPage.slug}`,
        structuredData: {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `${giftPage.businessName} video gift | SHOT.IS`,
          description: `A private SHOT.IS mini ad pack prepared for ${giftPage.businessName}.`,
          url: `https://gift.shot.is/${giftPage.slug}`
        }
      });
      return;
    }
    if (servicePage) {
      applySeoMeta({
        path: servicePage.path,
        title: servicePage.title,
        description: servicePage.description,
        structuredData: buildServiceSchema(servicePage)
      });
      return;
    }
    if (comparisonPage) {
      applySeoMeta(getPageSeo(pathname));
      return;
    }
    if (blogPost) {
      applySeoMeta(buildBlogPostSeo(blogPost));
      return;
    }
    if (blogIndexLang) {
      applySeoMeta(buildBlogIndexSeo(blogIndexLang));
      return;
    }
    if (lesson) {
      applySeoMeta(buildLessonSeo(lesson));
      return;
    }
    if (learnIndexLang) {
      applySeoMeta(buildLearnIndexSeo(learnIndexLang));
      return;
    }
    if (staticPage) {
      applySeoMeta(getPageSeo(pathname));
      return;
    }
    if (isNotFound) {
      applySeoMeta(notFoundSeo);
      return;
    }
    applySeoMeta({ ...homeSeo, structuredData: homeStructuredData });
  }, [
    blogIndexLang,
    blogPost,
    comparisonPage,
    giftPage,
    isNotFound,
    learnIndexLang,
    lesson,
    pathname,
    servicePage,
    staticPage
  ]);
  if (giftPage) {
    const BespokeGiftPage = bespokeGiftPages[giftPage.slug];
    return BespokeGiftPage ? /* @__PURE__ */ jsx(BespokeGiftPage, { page: giftPage }) : /* @__PURE__ */ jsx(GiftPage, { page: giftPage });
  }
  if (servicePage) {
    return /* @__PURE__ */ jsx(ServicePage, { page: servicePage });
  }
  if (comparisonPage) {
    return /* @__PURE__ */ jsx(ComparisonPage, { page: comparisonPage });
  }
  if (blogPost) {
    return /* @__PURE__ */ jsx(BlogPostPage, { post: blogPost });
  }
  if (blogIndexLang) {
    return /* @__PURE__ */ jsx(BlogIndexPage, { lang: blogIndexLang, posts: blogPostsByLang[blogIndexLang] });
  }
  if (lesson) {
    return /* @__PURE__ */ jsx(LessonPage, { lesson });
  }
  if (learnIndexLang) {
    return /* @__PURE__ */ jsx(LearnIndexPage, { lang: learnIndexLang, lessons: lessonsByLang[learnIndexLang] });
  }
  if (staticPage) {
    return staticPage();
  }
  if (isNotFound) {
    return /* @__PURE__ */ jsx(NotFoundPage, {});
  }
  return /* @__PURE__ */ jsx(HomePage, {});
}
const staticPages = [
  { key: "about", title: "About SHOT.IS", eyebrow: "AI UGC Platform + Studio", kind: "page" },
  { key: "contact", title: "Start an AI content sprint", eyebrow: "Contact", kind: "page" },
  { key: "pricing", title: "AI Videos from $4.99", eyebrow: "SHOT.IS Pricing", kind: "page" },
  { key: "faq", title: "Questions, answered straight", eyebrow: "FAQ", kind: "page" },
  { key: "privacy", title: "Privacy Policy", eyebrow: "SHOT.IS", kind: "page" },
  { key: "terms", title: "Terms of Service", eyebrow: "SHOT.IS", kind: "page" }
];
const ogTargets = [
  {
    key: "home",
    title: "AI UGC Ad Generator & Production Studio",
    eyebrow: "Self-serve from $4.99",
    kind: "home"
  },
  ...servicePages.map(
    (page) => ({ key: page.slug, title: page.navLabel, eyebrow: page.eyebrow, kind: "service" })
  ),
  ...useCasePages.map(
    (page) => ({ key: page.slug, title: page.navLabel, eyebrow: page.eyebrow, kind: "service" })
  ),
  ...comparisonPages.map(
    (page) => ({ key: page.slug, title: page.navLabel, eyebrow: page.eyebrow, kind: "page" })
  ),
  { key: "blog-index", title: "SHOT.IS Blog", eyebrow: "AI content, ads & creators", kind: "page" },
  { key: "learn-index", title: "Learn SHOT.IS Studio", eyebrow: "Short screencast lessons", kind: "page" },
  ...lessons.map(
    (lesson) => ({
      key: lesson.ogImageKey,
      title: lesson.title,
      eyebrow: `SHOT.IS Lesson ${lesson.order}`,
      kind: "article"
    })
  ),
  ...staticPages,
  ...blogPosts.map(
    (post2) => ({ key: post2.ogImageKey, title: post2.title, eyebrow: "SHOT.IS Blog", kind: "article" })
  )
];
const render = (path) => {
  const seo = getPageSeo(path);
  const appHtml = renderToString(/* @__PURE__ */ jsx(App, { path }));
  return { path, appHtml, seo };
};
const routesToPrerender = () => getIndexableRoutes();
const sitemapEntries = () => buildSitemapEntries();
const lessonRecordingPlans = () => lessonsByLang.en.map((lesson) => ({
  slug: lesson.slug,
  title: lesson.title,
  order: lesson.order,
  videoSeconds: lesson.videoSeconds,
  video: lesson.video,
  steps: lesson.steps,
  captions: lesson.captions
}));
const postsByDateDesc = () => [...blogPosts].sort((a, b) => a.datePublished < b.datePublished ? 1 : -1);
const feedItems = () => postsByDateDesc().map((post2) => ({
  title: post2.title,
  url: `${siteBaseUrl}${blogPostPath(post2)}`,
  description: post2.description,
  datePublished: post2.datePublished,
  dateModified: post2.dateModified ?? post2.datePublished,
  lang: post2.lang
}));
const absolutizeLinks = (text) => text.replace(/\]\(\//g, `](${siteBaseUrl}/`);
const blockToMarkdown = (block) => {
  switch (block.type) {
    case "p":
      return absolutizeLinks(block.text);
    case "h2":
      return `## ${block.text}`;
    case "h3":
      return `### ${block.text}`;
    case "ul":
      return block.items.map((item) => `- ${absolutizeLinks(item)}`).join("\n");
    case "ol":
      return block.items.map((item, i) => `${i + 1}. ${absolutizeLinks(item)}`).join("\n");
    case "quote":
      return `> ${block.text}${block.cite ? ` — ${block.cite}` : ""}`;
    case "callout":
      return `**${block.title}.** ${absolutizeLinks(block.body)}`;
    case "image":
      return `![${block.alt}](${block.src})${block.caption ? `
*${block.caption}*` : ""}`;
    case "table": {
      const header = `| ${block.headers.join(" | ")} |`;
      const divider = `| ${block.headers.map(() => "---").join(" | ")} |`;
      const rows = block.rows.map((row) => `| ${row.map((cell) => absolutizeLinks(cell)).join(" | ")} |`);
      return [...block.caption ? [`*${block.caption}*`, ""] : [], header, divider, ...rows].join("\n");
    }
    case "stat":
      return `**${block.value}** — ${absolutizeLinks(block.label)}${block.source ? ` (source: ${block.sourceUrl ?? block.source})` : ""}`;
  }
};
const llmsPageIndex = () => [
  {
    section: "FAQ",
    title: "FAQ",
    url: `${siteBaseUrl}${faqPageMeta.path}`,
    description: faqPageMeta.description
  },
  ...useCasePages.map((page) => ({
    section: "Use Cases",
    title: page.navLabel,
    url: `${siteBaseUrl}${page.path}`,
    description: page.description
  })),
  ...comparisonPages.map((page) => ({
    section: "Comparisons",
    title: page.navLabel,
    url: `${siteBaseUrl}${page.path}`,
    description: page.description
  })),
  {
    section: "Lessons",
    title: "Learn SHOT.IS Studio",
    url: `${siteBaseUrl}${learnIndexPath("en")}`,
    description: "Hub for the short screencast lessons on operating the SHOT.IS Studio canvas, each labelled with its learning time."
  },
  ...lessonsByLang.en.map((lesson) => ({
    section: "Lessons",
    title: `${lesson.title} (${formatMinutes(learningMinutes(lesson))})`,
    url: `${siteBaseUrl}${lessonPath(lesson)}`,
    description: lesson.description
  }))
];
const faqToMarkdown = (faqs) => faqs.map((f) => `**${f.question}**

${absolutizeLinks(f.answer)}`).join("\n\n");
const llmsFullExtraSections = () => {
  const sections = [];
  sections.push(
    [
      `# ${faqPageMeta.title}`,
      `URL: ${siteBaseUrl}${faqPageMeta.path}`,
      ...faqGroups.map((group) => `## ${group.heading}

${faqToMarkdown(group.items)}`)
    ].join("\n\n")
  );
  for (const page of comparisonPages) {
    const parts = [
      `# ${page.title}`,
      [`URL: ${siteBaseUrl}${page.path}`, `Competitor facts verified: ${page.asOf}`].join("\n"),
      page.description,
      `## The short answer

${page.verdict}`
    ];
    if (page.kind === "vs") {
      const header = `| Feature | SHOT.IS | ${page.competitor.name} |`;
      const divider = "| --- | --- | --- |";
      const rows = page.rows.map((row) => `| ${row.feature} | ${row.shotIs} | ${row.competitor} |`);
      parts.push(`## ${page.tableCaption}

${[header, divider, ...rows].join("\n")}`);
      parts.push(
        `## Choose ${page.competitor.name} if

${page.whenToChooseThem.map((i) => `- ${i}`).join("\n")}`
      );
      parts.push(`## Choose SHOT.IS if

${page.whenToChooseUs.map((i) => `- ${i}`).join("\n")}`);
    } else {
      parts.push(
        `## The options

${page.alternatives.map(
          (alt, i) => `${i + 1}. **${alt.name}** (${alt.url.startsWith("/") ? siteBaseUrl + alt.url : alt.url}) — best for ${alt.bestFor}. ${alt.summary}`
        ).join("\n")}`
      );
    }
    parts.push(`## FAQ

${faqToMarkdown(page.faq)}`);
    sections.push(parts.join("\n\n"));
  }
  for (const lesson of lessonsByLang.en) {
    const parts = [
      `# ${lesson.title}`,
      [
        `URL: ${siteBaseUrl}${lessonPath(lesson)}`,
        `Format: ${lesson.kind === "basics" ? "Basics" : "Micro-case"} screencast lesson ${lesson.order}`,
        `Watch time: ${lesson.videoSeconds}s · Learning time: ${formatMinutes(learningMinutes(lesson))}`,
        `Nodes used: ${lesson.nodes.join(", ")}`
      ].join("\n"),
      lesson.description,
      `## What you can do after this

${lesson.outcome}`,
      `## Steps

${lesson.steps.map((step, i) => `${i + 1}. **${step.title}** — ${absolutizeLinks(step.body)}`).join("\n")}`,
      `## Transcript

${lesson.captions.map((c) => `${formatTimestamp(c.at)} ${c.text}`).join("\n")}`
    ];
    if (lesson.faq?.length) parts.push(`## FAQ

${faqToMarkdown(lesson.faq)}`);
    sections.push(parts.join("\n\n"));
  }
  return sections;
};
const llmsFullSections = () => postsByDateDesc().map((post2) => {
  const parts = [
    `# ${post2.title}`,
    [
      `URL: ${siteBaseUrl}${blogPostPath(post2)}`,
      `Published: ${post2.datePublished}`,
      `Language: ${post2.lang}`
    ].join("\n"),
    post2.description,
    `## Key takeaways

${post2.tldr.map((t) => `- ${absolutizeLinks(t)}`).join("\n")}`,
    ...post2.blocks.map(blockToMarkdown)
  ];
  if (post2.faq?.length) {
    parts.push(
      `## FAQ

${post2.faq.map((f) => `**${f.question}**

${absolutizeLinks(f.answer)}`).join("\n\n")}`
    );
  }
  return parts.join("\n\n");
});
export {
  feedItems,
  lessonRecordingPlans,
  llmsFullExtraSections,
  llmsFullSections,
  llmsPageIndex,
  ogTargets,
  render,
  routesToPrerender,
  sitemapEntries
};

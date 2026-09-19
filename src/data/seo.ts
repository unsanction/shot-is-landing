export const siteBaseUrl = 'https://shot.is';
export const defaultImage = `${siteBaseUrl}/media/hero/shot-hero-poster.webp`;
export const homeReelUploadDate = '2026-04-15';
export const privacyPolicyLastUpdated = '2026-06-10';
export const termsLastUpdated = '2026-06-10';

export const organizationSameAs: string[] = [
  // Populate with real social profiles to strengthen entity disambiguation.
  // e.g. 'https://www.linkedin.com/company/shot-is', 'https://x.com/shotis',
  // 'https://www.crunchbase.com/organization/shot-is'
];

export type FounderInfo = {
  name: string;
  role: string;
  /** One-paragraph bio shown on /about and used in Person schema. */
  bio: string;
  linkedIn?: string;
  /** Absolute or root-relative photo URL for the /about founder section. */
  photo?: string;
};

/**
 * The real founder lights up E-E-A-T signals everywhere at once:
 * Person node in Organization schema, the founder section on /about, and
 * Person authorship of flagship blog posts (via founderAuthor in blogTypes).
 * Set to null to fall back to Organization-only signals.
 */
export const founder: FounderInfo | null = {
  name: 'Ivan Kapeykin',
  role: 'Founder',
  bio: 'Ivan Kapeykin founded SHOT.IS, a self-serve AI UGC ad generator and managed production studio. He runs the generation pipeline himself: keyframe-first workflows, model routing across Veo 3, Grok Imagine, and Kling, and the QA passes that keep a face and a product label identical across forty shots. He writes the field notes on the SHOT.IS blog.',
  linkedIn: 'https://www.linkedin.com/in/ikapeykin/',
  photo: '/media/team/ivan-kapeykin.png',
};

/** ISO yyyy-mm-dd (or yyyy) — emitted as Organization foundingDate when set. */
export const organizationFoundingDate: string | null = null;

export const organizationEmail = 'hello@shot.is';

/** Entity-association hints for answer engines — keep aligned with actual service pages. */
export const organizationKnowsAbout = [
  'AI UGC ads',
  'AI video ads',
  'virtual influencers',
  'AI video generation',
  'creator-style product demos',
  'paid social creative testing',
  'image-to-video workflows',
  'AI character consistency',
];

export const homeSeo = {
  path: '/',
  dateModified: '2026-08-25',
  title: 'AI UGC Ad Generator & Video Studio | SHOT.IS',
  description:
    'Make AI UGC ads from $4.99 in the self-serve SHOT.IS Studio, buy video packs for creative testing, or brief our team for finished campaigns.',
};

export type ProofItem = { label: string; body: string };

export type CaseStudy = {
  client: string;
  challenge: string;
  outcome: string;
};

export type ServicePageContent = {
  path: string;
  slug: string;
  /** ISO yyyy-mm-dd. Update only after a significant change to this page's primary content. */
  dateModified: string;
  navLabel: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lede: string;
  primaryCta: string;
  secondaryCta: string;
  ogImage: string;
  outputs: string[];
  workflow: Array<{
    title: string;
    body: string;
  }>;
  proof: ProofItem[];
  caseStudy?: CaseStudy;
  questions: Array<{
    question: string;
    answer: string;
  }>;
  /** Render the AI creator roster gallery (virtual-influencers page). */
  showRoster?: boolean;
  /** Deep-dive blog links rendered after the FAQ — closes the topic cluster loop. */
  reading?: Array<{ label: string; href: string }>;
};

export const servicePages: ServicePageContent[] = [
  {
    path: '/ai-ugc-ads',
    slug: 'ai-ugc-ads',
    dateModified: '2026-08-25',
    navLabel: 'AI UGC Ads',
    title: 'AI UGC Ads Studio for Brands | SHOT.IS',
    description:
      'Create AI UGC ads with virtual creators: product demos, testimonials, hooks, and paid social variants for TikTok, Reels, and Shorts.',
    eyebrow: 'AI UGC ADS STUDIO',
    h1: 'AI UGC ADS WITHOUT THE SHOOT.',
    lede:
      'Send SHOT.IS a product brief and get creator-style AI UGC videos back: hooks that stop the scroll, product demos, testimonial formats, voiceover concepts, and variant packs sized for a real creative test.',
    primaryCta: 'Start an AI UGC sprint',
    secondaryCta: 'See the workflow',
    ogImage: `${siteBaseUrl}/media/hero/shot-hero-poster.webp`,
    outputs: [
      'UGC-style product demo videos for TikTok, Reels, Shorts, and paid social placements.',
      'Hook libraries, creator scripts, captions, thumbnails, and visual directions for each concept.',
      'Reusable AI creator systems that hold the same face, tone, and style across campaigns.',
      'Creative testing packs with several angles for acquisition, retargeting, launches, and seasonal offers.',
    ],
    workflow: [
      {
        title: 'Brief the offer',
        body: 'We map the product, the buyer pain, the objection, the proof, the format, and the target platform before we generate anything.',
      },
      {
        title: 'Build the creator angle',
        body: 'Each ad gets a creator persona, a hook, a visual treatment, a script, and a performance hypothesis you can test.',
      },
      {
        title: 'Generate and refine',
        body: 'The strongest concepts go into AI video production, then edit polish, captions, and variant expansion.',
      },
      {
        title: 'Prepare for testing',
        body: 'You receive campaign-ready assets with clear angle names and iteration notes.',
      },
    ],
    proof: [
      {
        label: 'Best for',
        body: 'Brands that need more UGC-style ads than a creator production pipeline can supply.',
      },
      {
        label: 'Use it when',
        body: 'Your team wants more creator-style hooks, product demos, and paid-social variants than a shoot can deliver.',
      },
      {
        label: 'Output quality',
        body: 'We optimize for believable creator footage, clear product messaging, and fast variant generation.',
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
        question: 'Can AI UGC replace human creator ads?',
        answer:
          'It replaces part of the testing workload. Human creators still win real testimonials and influencer trust. AI UGC wins concept volume, visual variation, localization, and hook pre-testing before you commit larger spend.',
      },
      {
        question: 'What brands should start with AI UGC ads?',
        answer:
          'Startups, mobile apps, ecommerce brands, SaaS tools, creator-led products, and agencies. The fit is strongest when you need frequent ad variants and do not want every test to require casting, filming, and reshoots.',
      },
    ],
  },
  {
    path: '/ai-video-ads',
    slug: 'ai-video-ads',
    dateModified: '2026-08-25',
    navLabel: 'AI Video Ads',
    title: 'AI Video Ads for Paid Social Campaigns | SHOT.IS',
    description:
      'Produce AI video ads for launches, paid social testing, app campaigns, ecommerce offers, and creator-style funnels with SHOT.IS.',
    eyebrow: 'AI VIDEO ADS',
    h1: 'AI VIDEO ADS BUILT FOR THE FEED.',
    lede:
      'SHOT.IS builds AI video ad systems for brands that want more concepts, more formats, and faster testing across short-form platforms.',
    primaryCta: 'Plan AI video ads',
    secondaryCta: 'Review outputs',
    ogImage: `${siteBaseUrl}/media/hero/shot-hero-poster.webp`,
    outputs: [
      'Short-form AI video ad concepts for TikTok, Instagram Reels, YouTube Shorts, and mobile-first landing pages.',
      'Hook-first scripts, visual boards, shot lists, caption systems, and cutdown ideas for creative teams.',
      'Ad variants for problem-aware, solution-aware, comparison, objection-handling, and social-proof angles.',
      'Creator, product, lifestyle, before-after, explainer, and offer-led video formats.',
    ],
    workflow: [
      {
        title: 'Define the campaign job',
        body: 'Every concept starts from the funnel stage, the buyer awareness level, the message hierarchy, and the target platform.',
      },
      {
        title: 'Create the visual system',
        body: 'We shape the scene, the creator, the rhythm, the product moment, and the edit language so the ad reads native to its placement.',
      },
      {
        title: 'Generate video assets',
        body: 'Concepts become AI video scenes, edit-ready sequences, and campaign variants with captions and visual consistency.',
      },
      {
        title: 'Iterate by signal',
        body: 'You can expand winning hooks and scenes into new versions, languages, offers, and creator styles.',
      },
    ],
    proof: [
      {
        label: 'Best for',
        body: 'Teams that want an always-on creative pipeline instead of waiting on the next shoot, location, or creator schedule.',
      },
      {
        label: 'Use it when',
        body: 'You need short-form ad concepts, finished scenes, and reusable variants across TikTok, Reels, Shorts, and paid social.',
      },
      {
        label: 'Output quality',
        body: 'We prioritize clear hooks, product context, quick comprehension, and modular creative testing.',
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
        question: 'What makes a good AI video ad?',
        answer:
          'A realistic clip is the floor, not the ad. A good AI video ad carries a clear hook, a specific buyer problem, a visible product moment, a believable creator or scene, and a format matched to the platform it runs on.',
      },
      {
        question: 'Can one AI video concept become many ads?',
        answer:
          'Yes. One strong concept turns into hook variants, creator variants, language variants, cutdowns, static frames, caption tests, and retargeting versions.',
      },
    ],
  },
  {
    path: '/virtual-influencers',
    slug: 'virtual-influencers',
    dateModified: '2026-08-25',
    navLabel: 'Virtual Influencers',
    title: 'Create a Virtual Influencer for Your Brand | SHOT.IS',
    description:
      'SHOT.IS builds custom virtual influencers: consistent AI creators with a locked identity, brand lore, and a repeatable content system. Process, timelines, FAQ.',
    eyebrow: 'VIRTUAL INFLUENCERS',
    h1: 'CREATE A VIRTUAL INFLUENCER FOR YOUR BRAND.',
    lede:
      'SHOT.IS designs virtual influencers as repeatable brand assets rather than one-off images. Every character ships with a locked identity, wardrobe logic, brand lore, and a content system that carries campaigns week after week.',
    primaryCta: 'Build a virtual creator',
    secondaryCta: 'Explore creator systems',
    ogImage: `${siteBaseUrl}/media/hero/shot-hero-poster.webp`,
    outputs: [
      'Virtual creator identities with names, roles, visual direction, tone, and audience positioning.',
      'Consistent AI character assets for product posts, UGC-style video, short-form ads, and campaign visuals.',
      'Content pillars, recurring formats, launch concepts, and platform-specific creative packages.',
      'Brand-safe guidelines for how the virtual influencer appears, speaks, and promotes offers.',
    ],
    workflow: [
      {
        title: 'Position the creator',
        body: 'We define the audience, the genre, the brand fit, the visual lane, and the campaign purpose before we design the character.',
      },
      {
        title: 'Lock the identity',
        body: 'The creator gets a repeatable face, wardrobe logic, a world, a tone, and rules for how they behave on camera.',
      },
      {
        title: 'Create campaign assets',
        body: 'The system expands into videos, stills, scripts, captions, and paid social versions.',
      },
      {
        title: 'Scale the world',
        body: 'A strong creator system supports launches, collabs, seasonal drops, and localized market versions.',
      },
    ],
    proof: [
      {
        label: 'Best for',
        body: 'Brands that want a controllable creator asset instead of a campaign that depends on one external influencer.',
      },
      {
        label: 'Use it when',
        body: 'Your brand needs a creator identity that stays recognizable across posts, ads, markets, and launches.',
      },
      {
        label: 'Output quality',
        body: 'We emphasize consistency, recognizability, lore, and content formats that repeat over time.',
      },
    ],
    caseStudy: {
      client: 'Fashion-tech startup (anonymized)',
      challenge:
        'The team wanted a recognizable AI face for product drops without depending on a single human creator schedule.',
      outcome:
        'A virtual influencer carried four launches across 11 markets. The character now anchors weekly social posts and reusable ad creative without per-campaign casting.',
    },
    questions: [
      {
        question: 'What is a virtual influencer?',
        answer:
          'A virtual influencer is a digital creator identity used in social content, campaigns, and brand storytelling. Think Lil Miquela or Shudu, scoped to your brand. For performance marketing, the character design matters less than the ability to produce repeatable content quickly.',
      },
      {
        question: 'Why use a virtual influencer instead of a human influencer?',
        answer:
          'You control timing, format, visuals, localization, and campaign continuity. Human influencers still bring audience trust. Virtual creators win when consistency and production speed decide the outcome, and many brands run both: a human creator for reach, a virtual one for always-on content.',
      },
      {
        question: 'How do you create a virtual influencer?',
        answer:
          'Four steps. Position the creator against an audience, genre, and brand fit. Lock the identity with a canonical face set, wardrobe logic, world, and tone. Generate campaign assets with reference-anchored AI production. QA every output against the identity so the character stays recognizable. You end up with a system rather than a folder of images.',
      },
      {
        question: 'How much does a virtual influencer cost?',
        answer:
          'Far less than the celebrity-grade CGI characters that made the format famous, since full studios run those. A brand-scoped virtual creator is a one-time identity build plus per-campaign content production, so compare it against your ongoing creator sourcing and reshoot costs. Price depends on how many formats and markets the character covers. Brief us and we will scope it.',
      },
      {
        question: 'How long does it take to launch one?',
        answer:
          'A locked identity takes days rather than months, and the first campaign content pack follows within one to two weeks. After that, new drops, seasonal offers, and localized versions start from the existing identity instead of from zero.',
      },
      {
        question: 'Can the character stay consistent across hundreds of shots?',
        answer:
          'Yes, and this is the hard engineering part that sinks one-off image generation as an influencer strategy. We use canonical reference sets, reference-anchored generation, and machine-graded identity QA so the same face, styling, and world survive across posts, ads, formats, and weeks.',
      },
      {
        question: 'Do virtual influencers need to be disclosed as AI?',
        answer:
          'In several markets, yes. Sponsored content must be labeled as advertising everywhere, and jurisdictions like the US and India require you to disclose that the character is not a real person. Platforms add their own AI-content labels. Every SHOT.IS character ships with brand-safety guidelines covering disclosure rules for each market it runs in.',
      },
    ],
    showRoster: true,
    reading: [
      { label: 'What is a virtual influencer: the complete guide', href: '/blog/what-is-a-virtual-influencer' },
      { label: 'How to create a virtual influencer, step by step', href: '/blog/how-to-create-a-virtual-influencer' },
      { label: 'Virtual influencer cost: what brands pay', href: '/blog/virtual-influencer-cost' },
      { label: 'AI character consistency: how one face stays one face', href: '/blog/ai-character-consistency' },
    ],
  },
];

export const servicePagesByPath = new Map(servicePages.map((page) => [page.path, page]));

export const homeAnswerBlocks = [
  {
    title: 'What is SHOT.IS?',
    body: 'SHOT.IS is a self-serve AI UGC ad generator and a managed production studio. Generate a video yourself, buy a pack for testing volume, or hand the whole campaign to our team.',
  },
  {
    title: 'How much does it cost?',
    body: 'The launch offer starts at $4.99 for one self-serve AI video. Video packs use live volume pricing in Studio, and managed production is scoped to your campaign brief.',
  },
  {
    title: 'When should I choose managed?',
    body: 'Choose managed production when you need creative direction, product and identity QA, editing, and campaign-ready variants rather than a single generated clip.',
  },
];

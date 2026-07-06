export const siteBaseUrl = 'https://shot.is';
export const defaultImage = `${siteBaseUrl}/media/hero/shot-hero-poster.webp`;

export const buildDate: string =
  (typeof import.meta !== 'undefined' && (import.meta as { env?: { VITE_BUILD_DATE?: string } }).env?.VITE_BUILD_DATE) ||
  new Date().toISOString().slice(0, 10);

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
  bio: 'Ivan Kapeykin is the founder of SHOT.IS, an AI content studio for performance advertising. He runs the studio’s generation pipeline daily — keyframe-first workflows, multi-model routing across Veo 3, Grok Imagine, and Kling, and the QA discipline that keeps AI ad creative consistent — and writes the field notes on the SHOT.IS blog.',
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
  title: 'SHOT.IS | AI UGC Ads, Virtual Influencers & AI Content Studio',
  description:
    'SHOT.IS helps brands start creating AI UGC videos, paid social ads, virtual influencers, product demos, and campaign creative without traditional shoots.',
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
    navLabel: 'AI UGC Ads',
    title: 'AI UGC Ads Studio for Brands | SHOT.IS',
    description:
      'Create AI UGC ads with virtual creators, product demos, testimonials, hooks, and paid social variations for TikTok, Reels, Shorts, and performance campaigns.',
    eyebrow: 'AI UGC ADS STUDIO',
    h1: 'AI UGC ADS WITHOUT THE SHOOT.',
    lede:
      'SHOT.IS turns product briefs into creator-style AI UGC videos: scroll-stopping hooks, product demos, testimonial formats, voiceover concepts, and variant packs ready for creative testing.',
    primaryCta: 'Start an AI UGC sprint',
    secondaryCta: 'See the workflow',
    ogImage: `${siteBaseUrl}/media/hero/shot-hero-poster.webp`,
    outputs: [
      'UGC-style product demo videos for TikTok, Reels, Shorts, and paid social placements.',
      'Hook libraries, creator scripts, captions, thumbnails, and visual directions for each concept.',
      'Reusable AI creator systems that keep the same face, tone, and style across campaigns.',
      'Creative testing packs with multiple angles for acquisition, retargeting, launches, and seasonal offers.',
    ],
    workflow: [
      {
        title: 'Brief the offer',
        body: 'We map the product, buyer pain, objection, proof, format, and target platform before anything is generated.',
      },
      {
        title: 'Build the creator angle',
        body: 'Each ad gets a creator persona, hook, visual treatment, script, and performance hypothesis.',
      },
      {
        title: 'Generate and refine',
        body: 'The strongest concepts move into AI video production, edit polish, captions, and variant expansion.',
      },
      {
        title: 'Prepare for testing',
        body: 'Deliverables are packaged as campaign-ready assets with clear angle names and iteration notes.',
      },
    ],
    proof: [
      {
        label: 'Best for',
        body: 'Brands that need more UGC-style ads than a traditional creator production pipeline can supply.',
      },
      {
        label: 'Search intent',
        body: 'AI UGC ads, AI UGC video generator, creator-style AI ads, product demo ad creative.',
      },
      {
        label: 'Output quality',
        body: 'The focus is believable creator footage, clear product messaging, and fast variant generation.',
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
          'It can replace part of the testing workload. Human creators are still useful for real testimonials and influencer trust, while AI UGC is strongest for fast concept volume, visual variation, localization, and pre-testing hooks before larger spend.',
      },
      {
        question: 'What brands should start with AI UGC ads?',
        answer:
          'Startups, mobile apps, ecommerce brands, SaaS tools, creator-led products, and agencies benefit when they need frequent ad variants but do not want every test to require casting, filming, and reshoots.',
      },
    ],
  },
  {
    path: '/ai-video-ads',
    slug: 'ai-video-ads',
    navLabel: 'AI Video Ads',
    title: 'AI Video Ads for Paid Social Campaigns | SHOT.IS',
    description:
      'Produce AI video ads for launches, paid social testing, app campaigns, ecommerce offers, and creator-style ad funnels with SHOT.IS.',
    eyebrow: 'AI VIDEO ADS',
    h1: 'AI VIDEO ADS BUILT FOR THE FEED.',
    lede:
      'SHOT.IS creates AI video ad systems for brands that need more concepts, more formats, and more testing velocity across short-form platforms.',
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
        body: 'Each concept starts with the funnel stage, buyer awareness level, message hierarchy, and target platform.',
      },
      {
        title: 'Create the visual system',
        body: 'We shape the scene, creator, rhythm, product moment, and edit language so the ad feels native to the placement.',
      },
      {
        title: 'Generate video assets',
        body: 'Concepts become AI video scenes, edit-ready sequences, and campaign variants with captions and visual consistency.',
      },
      {
        title: 'Iterate by signal',
        body: 'Winning hooks and scenes can be expanded into new versions, languages, offers, and creator styles.',
      },
    ],
    proof: [
      {
        label: 'Best for',
        body: 'Teams that need an always-on creative pipeline without waiting for every shoot, location, or creator schedule.',
      },
      {
        label: 'Search intent',
        body: 'AI video ads, AI ad creative, AI ads for TikTok, AI video production for paid social.',
      },
      {
        label: 'Output quality',
        body: 'The system prioritizes clear hooks, product context, quick comprehension, and modular creative testing.',
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
          'A good AI video ad is not just a realistic clip. It has a clear hook, a specific buyer problem, a visible product moment, a believable creator or scene, and a format that matches the platform where it will run.',
      },
      {
        question: 'Can one AI video concept become many ads?',
        answer:
          'Yes. A strong concept can be turned into hook variants, creator variants, language variants, cutdowns, static frames, caption tests, and retargeting versions.',
      },
    ],
  },
  {
    path: '/virtual-influencers',
    slug: 'virtual-influencers',
    navLabel: 'Virtual Influencers',
    title: 'Create a Virtual Influencer for Your Brand | SHOT.IS',
    description:
      'SHOT.IS builds custom virtual influencers: consistent AI creators with a locked identity, brand lore, and a repeatable content system. Process, timelines, FAQ.',
    eyebrow: 'VIRTUAL INFLUENCERS',
    h1: 'CREATE A VIRTUAL INFLUENCER FOR YOUR BRAND.',
    lede:
      'SHOT.IS designs virtual influencers and AI creators as repeatable brand assets, not one-off images. Each character ships with a locked identity, wardrobe logic, brand lore, and a content system that can carry campaigns week after week.',
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
        body: 'We define the audience, genre, brand fit, visual lane, and campaign purpose before designing the character.',
      },
      {
        title: 'Lock the identity',
        body: 'The creator gets a repeatable face, wardrobe logic, world, tone, and content behavior.',
      },
      {
        title: 'Create campaign assets',
        body: 'The system expands into videos, stills, scripts, captions, and paid social versions.',
      },
      {
        title: 'Scale the world',
        body: 'Strong creator systems can support launches, collabs, seasonal drops, and localized market versions.',
      },
    ],
    proof: [
      {
        label: 'Best for',
        body: 'Brands that want a controllable creator asset, not a single campaign dependent on one external influencer.',
      },
      {
        label: 'Search intent',
        body: 'Virtual influencer, AI influencer, AI creator campaign, virtual creator for brands.',
      },
      {
        label: 'Output quality',
        body: 'The emphasis is consistency, recognizability, lore, and content formats that can repeat over time.',
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
          'A virtual influencer is a digital creator identity used in social content, campaigns, and brand storytelling — characters like Lil Miquela or Shudu, but scoped to your brand. For performance marketing, the useful part is not only the character design but the ability to create repeatable content quickly.',
      },
      {
        question: 'Why use a virtual influencer instead of a human influencer?',
        answer:
          'Virtual influencers give brands more control over timing, format, visuals, localization, and campaign continuity. Human influencers can still provide audience trust; virtual creators are strongest when consistency and production speed matter. Many brands run both: a human creator for reach, a virtual one for always-on content.',
      },
      {
        question: 'How do you create a virtual influencer?',
        answer:
          'Our process has four steps: position the creator (audience, genre, brand fit), lock the identity (a canonical face set, wardrobe logic, world, and tone), generate campaign assets with reference-anchored AI production, and QA every output against the identity so the character stays recognizable. The result is a system, not a folder of images.',
      },
      {
        question: 'How much does a virtual influencer cost?',
        answer:
          'Far less than the celebrity-grade CGI characters that made the format famous — those are run by full studios. A brand-scoped virtual creator is a one-time identity build plus per-campaign content production, so the comparison that matters is against your ongoing creator sourcing and reshoot costs. Pricing depends on how many formats and markets the character needs to cover; brief us and we will scope it.',
      },
      {
        question: 'How long does it take to launch one?',
        answer:
          'A locked identity typically takes days, not months, and the first campaign content pack follows within one to two weeks. After that the character is reusable: new drops, seasonal offers, and localized versions start from the existing identity instead of from zero.',
      },
      {
        question: 'Can the character actually stay consistent across hundreds of shots?',
        answer:
          'Yes — this is the hard engineering part and the reason one-off image generation fails as an influencer strategy. We use canonical reference sets, reference-anchored generation, and machine-graded identity QA so the same face, styling, and world survive across posts, ads, formats, and weeks.',
      },
      {
        question: 'Do virtual influencers need to be disclosed as AI?',
        answer:
          'In several markets, yes: sponsored content must be labeled as advertising everywhere, and jurisdictions like the US and India require disclosing that the character is not a real person. Platforms are adding their own AI-content labels too. Every SHOT.IS character ships with brand-safety guidelines that include disclosure rules for each market it runs in.',
      },
    ],
    showRoster: true,
    reading: [
      { label: 'What is a virtual influencer — the full guide', href: '/blog/what-is-a-virtual-influencer' },
      { label: 'AI character consistency: how one face stays one face', href: '/blog/ai-character-consistency' },
      { label: 'How a persona moves through our ad pipeline', href: '/blog/ai-ad-production-pipeline' },
    ],
  },
];

export const servicePagesByPath = new Map(servicePages.map((page) => [page.path, page]));

export const homeAnswerBlocks = [
  {
    title: 'What does SHOT.IS create?',
    body: 'AI UGC ads, AI video ads, virtual influencer content, creator-style product demos, launch visuals, and short-form campaign assets for brands that need more creative volume.',
  },
  {
    title: 'Who is it for?',
    body: 'Mobile apps, ecommerce brands, SaaS products, agencies, and founders who want to test AI content before committing to larger production budgets.',
  },
  {
    title: 'Why use AI content for ads?',
    body: 'AI content speeds up creative exploration. Teams can test hooks, creator personas, visual worlds, and localized versions before scaling the best-performing direction.',
  },
];

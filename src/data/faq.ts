export type FaqItem = { question: string; answer: string };

export type FaqGroup = {
  heading: string;
  items: FaqItem[];
  /** Optional deep-link to the service page that covers this topic. */
  relatedPath?: string;
  relatedLabel?: string;
};

/**
 * Canonical site-wide FAQ. Answers are written definition-first and name
 * "SHOT.IS" explicitly so answer engines can extract entity-answer pairs.
 * Keep claims consistent with the blog posts they summarize.
 */
export const faqPageMeta = {
  path: '/faq',
  title: 'SHOT.IS FAQ — AI UGC Ads, Pricing, Models & Policy',
  description:
    'Answers about SHOT.IS: what the AI content studio does, how much AI UGC ads cost, which video models it uses, how consistency works, and platform disclosure rules.',
  eyebrow: 'FAQ',
  h1: 'QUESTIONS, ANSWERED STRAIGHT.',
  lede:
    'What SHOT.IS is, what AI UGC ads cost, which models power the pipeline, and where the honest limits are.',
};

export const faqGroups: FaqGroup[] = [
  {
    heading: 'About SHOT.IS',
    relatedPath: '/about',
    relatedLabel: 'About the studio',
    items: [
      {
        question: 'What is SHOT.IS?',
        answer:
          'SHOT.IS is an AI content studio that produces AI UGC ads, AI video ads, and virtual influencer campaigns for brands — without traditional shoots. It combines creative direction, multi-model AI video generation, and edit-stage polish to deliver campaign-ready, testable ad variants in days instead of weeks.',
      },
      {
        question: 'How does SHOT.IS produce an AI ad?',
        answer:
          'SHOT.IS runs a keyframe-first pipeline: a brand brief becomes a Scene Bible (one location, one outfit, locked look constants), still keyframes are generated and quality-checked before any animation, approved frames are animated with image-to-video models, and clips are cut to a beat grid so the edit feels intentional. Each stage has a QA gate, so rejects are caught while they are still cheap.',
      },
      {
        question: 'What is the difference between SHOT.IS and studio.shot.is?',
        answer:
          'SHOT.IS is the studio: a team that takes a brief and delivers finished ad creative. studio.shot.is (Forge) is the self-serve app built on the same pipeline, where teams generate AI ad video themselves — creators, products, keyframes, and video shots under their own account.',
      },
      {
        question: 'Who is SHOT.IS for?',
        answer:
          'SHOT.IS is built for teams that test creative at volume: mobile apps managing CPI, ecommerce brands feeding paid social, SaaS products explaining features, and agencies producing for clients. It fits best when you need many ad variants per week, not one flagship film per quarter.',
      },
    ],
  },
  {
    heading: 'Pricing and speed',
    relatedPath: '/ai-ugc-ads',
    relatedLabel: 'AI UGC ads service',
    items: [
      {
        question: 'How much do AI UGC ads cost?',
        answer:
          'AI UGC ads cost from a few dollars in raw model compute (fully DIY, counting only the API bill) to low hundreds of dollars per finished video through a studio or platform — versus the $150–$500+ that human UGC creators typically charge per video before usage rights. The honest number is always above the compute bill: real production burns 2–4 generation candidates per shot to keep one, plus QA, music licensing, and assembly.',
      },
      {
        question: 'Why does SHOT.IS talk about marginal cost per variant instead of cost per video?',
        answer:
          'Because paid social is a testing game: hooks fatigue in days, so the economic unit is a variant, not a video. With a human creator, variant five costs most of a re-shoot; with the SHOT.IS pipeline, variant five is a handful of regenerated shots dropped into an existing edit — the Scene Bible, keyframes, music, and assembly are already paid for.',
      },
      {
        question: 'How fast can SHOT.IS deliver ad creative?',
        answer:
          'Typical turnaround is days, not weeks. In one engagement, SHOT.IS delivered 18 ad concepts for a DTC ecommerce launch in eight days, where the traditional shoot alternative was quoted at four weeks. Ongoing programs commonly ship around six hook variants per week per creator persona.',
      },
    ],
  },
  {
    heading: 'Output and quality',
    relatedPath: '/ai-video-ads',
    relatedLabel: 'AI video ads service',
    items: [
      {
        question: 'Which AI video models does SHOT.IS use?',
        answer:
          'SHOT.IS routes each shot to the model that is best at it rather than forcing one model everywhere: Google Veo 3 for motion physics and native audio, Grok Imagine for fast, low-cost iteration and reference-aware keyframes, and Kling for expressive character motion. Model routing is re-evaluated as providers ship updates.',
      },
      {
        question: 'How does SHOT.IS keep faces and products consistent across shots?',
        answer:
          'Consistency comes from a Scene Bible plus reference discipline: one location, one outfit, locked look constants, product reference images for label fidelity, and reference-aware keyframe generation. Every keyframe and clip passes a vision QA gate, and identity-critical shots are regenerated until the same face and the same product read across the whole ad.',
      },
      {
        question: 'Who owns the ads SHOT.IS produces?',
        answer:
          'The brand does. Delivered campaign assets are for the client’s commercial use across paid and organic placements, with licensed music where music is included. Details are covered in the SHOT.IS terms of service.',
      },
    ],
  },
  {
    heading: 'Performance and policy',
    relatedPath: '/virtual-influencers',
    relatedLabel: 'Virtual influencers service',
    items: [
      {
        question: 'Do AI UGC ads actually perform?',
        answer:
          'They perform where testing velocity decides outcomes. In SHOT.IS programs, a mobile gaming studio cut CPI by 31% over four-week windows using six AI hook variants per week, and a DTC brand lifted ROAS 1.7x on its best AI-generated variant. AI UGC underperforms where genuine human trust is the job — real testimonials still belong to real people.',
      },
      {
        question: 'Is AI-generated UGC allowed on TikTok and Meta?',
        answer:
          'Yes, with disclosure. TikTok and Meta both allow AI-generated ad creative but require AI content labels in defined cases, and the EU AI Act adds transparency obligations. SHOT.IS labels AI content where platforms require it, does not impersonate real people, and does not fabricate testimonials.',
      },
      {
        question: 'What is a virtual influencer, and can it replace human creators?',
        answer:
          'A virtual influencer is a digital creator identity — a consistent face, tone, and world — used in social content and campaigns. It replaces part of the workload: virtual creators win on consistency, scheduling, localization, and production speed, while human creators keep the edge for authentic testimonials and audience trust.',
      },
    ],
  },
];

/** Flat list for schema generation. */
export const allFaqItems: FaqItem[] = faqGroups.flatMap((group) => group.items);

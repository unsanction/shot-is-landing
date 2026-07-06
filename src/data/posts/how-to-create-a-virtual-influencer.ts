import { founderAuthor, type BlogPost } from '../blogTypes';

export const post: BlogPost = {
  slug: 'how-to-create-a-virtual-influencer',
  lang: 'en',
  translationKey: 'how-to-create-a-virtual-influencer',
  title: 'How to Create a Virtual Influencer: the Process We Run Daily',
  description:
    'How to create a virtual influencer step by step: positioning, locking a canonical identity, building the content system, reference-anchored production, identity QA, and launch.',
  excerpt:
    'The step-by-step process behind our own AI creator roster — from positioning to identity lock to the QA loop that keeps one face one face.',
  datePublished: '2026-07-07',
  author: founderAuthor,
  ogImageKey: 'blog-how-to-create-a-virtual-influencer',
  tags: ['virtual influencers', 'AI creators', 'how-to', 'production'],
  tldr: [
    'Creating a virtual influencer is a five-step process: position the character, lock a canonical identity, design the content system, produce with reference-anchored generation, and QA every output against the identity.',
    'The identity lock is the step most teams skip — and the reason most AI characters fall apart after ten posts.',
    'A character without a content system is a portrait; the recurring formats are what make it an influencer.',
    'Budget the QA loop from day one: image models drift, and a character that drifts stops existing.',
    'Plan disclosure before launch — several markets legally require saying the character is not a real person.',
  ],
  blocks: [
    {
      type: 'p',
      text: 'Creating a virtual influencer takes five steps: positioning, identity lock, content system design, reference-anchored production, and identity QA. None of them individually is hard. What is hard is that skipping any one of them produces a character that looks fine for a week and then quietly falls apart. This is the process we run at SHOT.IS for our own roster and for client characters, including the mistakes we paid for so you do not have to.',
    },
    {
      type: 'h2',
      id: 'positioning',
      text: 'Step 1 — Position the character before you design it',
    },
    {
      type: 'p',
      text: 'Positioning means deciding who the character is for and what commercial job it does before generating a single image. A character designed as “beautiful AI woman” has no reason to exist; a character designed as “streetwear creator for a Gen-Z sneaker audience with short-form ad energy” can carry campaigns.',
    },
    {
      type: 'ul',
      items: [
        'Audience: who follows this character and why would they care?',
        'Genre and lane: fashion, fitness, tech, food — one lane, held consistently.',
        'Brand fit: what products can this character credibly present?',
        'Campaign job: awareness face, UGC-style ad talent, launch anchor, or all three?',
      ],
    },
    {
      type: 'h2',
      id: 'identity-lock',
      text: 'Step 2 — Lock the identity: the canonical reference set',
    },
    {
      type: 'p',
      text: 'The identity lock is a canonical set of reference images plus written rules that every future asset is generated against. This is the single most important step and the one most teams skip. Modern image models will generate a slightly different person every run unless you anchor them; the canonical set is that anchor.',
    },
    {
      type: 'ul',
      items: [
        'Face set: multiple angles, expressions, and lighting conditions of the same locked face.',
        'Wardrobe logic: garments, colors, fit, and one or two identifying details that persist.',
        'World: where this character lives and shoots — locations, palette, lens feel.',
        'Voice and behavior: tone of captions, what the character talks about, what it never does.',
      ],
    },
    {
      type: 'callout',
      title: 'From our own roster',
      body: 'Every character on the SHOT.IS roster — VEXA-9, KAI_OS, LUNA_CORE — exists as a canonical identity set first and content second. When a generation drifts from the set, the output is rejected, no matter how good it looks in isolation.',
    },
    {
      type: 'h2',
      id: 'content-system',
      text: 'Step 3 — Design the content system, not individual posts',
    },
    {
      type: 'p',
      text: 'A content system is a small set of recurring formats the character repeats: the weekly fit check, the product-in-world post, the launch countdown, the UGC-style ad. Formats are what make a character feel alive between campaigns and what let you produce volume without redesigning every post from scratch.',
    },
    {
      type: 'ol',
      items: [
        'Pick 3–4 recurring formats matched to the character’s lane.',
        'Define the ad formats separately: hook styles, product moments, CTA behavior.',
        'Map formats to platforms — what runs as a Reel, what runs as a paid placement.',
        'Leave room for campaign one-offs: launches, collabs, seasonal drops.',
      ],
    },
    {
      type: 'h2',
      id: 'production',
      text: 'Step 4 — Produce with reference-anchored generation',
    },
    {
      type: 'p',
      text: 'Reference-anchored generation means every image and video starts from the canonical identity set, not from a text prompt describing the character. Text descriptions drift; references hold. For video, we generate keyframes first and animate them second — the keyframe carries the identity, and the video model inherits it. The mechanics of that pipeline are in the [keyframe-to-video workflow](/blog/keyframe-to-video-workflow) post.',
    },
    {
      type: 'h2',
      id: 'qa',
      text: 'Step 5 — QA every output against the identity',
    },
    {
      type: 'p',
      text: 'Identity QA is a review step where every generated asset is compared to the canonical set before it ships: same face, same styling constants, same world. We machine-grade this in our pipeline because human reviewers stop noticing gradual drift — each output looks “close enough” to the previous one while the character slowly becomes someone else. The full engineering story is in [AI character consistency](/blog/ai-character-consistency).',
    },
    {
      type: 'h2',
      id: 'launch',
      text: 'Launch: disclosure and the first 30 days',
    },
    {
      type: 'p',
      text: 'Before the first post goes live, decide how the character discloses that it is AI. Several markets — including the US and India — require saying the influencer is not a real person, and platform-level AI labels are becoming standard. Disclosure done confidently is a feature, not a confession: the most successful virtual influencers are openly virtual.',
    },
    {
      type: 'h2',
      id: 'mistakes',
      text: 'The mistakes that kill virtual influencers',
    },
    {
      type: 'ul',
      items: [
        'No identity lock — regenerating the character from a text prompt each time. It will drift within days.',
        'Portrait thinking — a beautiful character with no formats, no lane, and nothing to say.',
        'Skipping QA — trusting that outputs “look right”. Drift is gradual and invisible until it is embarrassing.',
        'Hidden AI — pretending the character is human. Audiences forgive virtual; they do not forgive deceptive.',
        'One-campaign thinking — treating the character as a stunt instead of an asset that compounds.',
      ],
    },
    {
      type: 'p',
      text: 'If you would rather inherit this system than rebuild it, that is what we do: the [virtual influencers](/virtual-influencers) page covers how SHOT.IS builds characters as reusable brand assets, and [what is a virtual influencer](/blog/what-is-a-virtual-influencer) is the primer if you are earlier in the decision.',
    },
  ],
  faq: [
    {
      question: 'How long does it take to create a virtual influencer?',
      answer:
        'A locked identity typically takes days, not months, and the first campaign content pack follows within one to two weeks. After that, new content starts from the existing identity instead of from zero.',
    },
    {
      question: 'What tools do you need to create a virtual influencer?',
      answer:
        'At minimum: an image model that supports reference-based generation, a video model for animating keyframes, and a QA process for identity consistency. The tooling matters less than the discipline of the canonical identity set.',
    },
    {
      question: 'Can you create a virtual influencer without a studio?',
      answer:
        'Yes, for a single character with modest output. The difficulty scales with volume: keeping one face consistent across hundreds of shots, formats, and markets is where a production system with machine-graded QA earns its keep.',
    },
    {
      question: 'Do virtual influencers have to be disclosed as AI?',
      answer:
        'In several markets, yes — including the US and India. Sponsored content must be labeled as advertising everywhere, and openly-virtual positioning consistently outperforms hidden AI anyway.',
    },
  ],
};

import { founderAuthor, type BlogPost } from '../blogTypes';

export const post: BlogPost = {
  slug: 'brand-consistency-ai-ads',
  lang: 'en',
  translationKey: 'brand-consistency-ai-ads',
  title: 'Brand Identity in AI Ads: Scene Bibles, Outfit Locks, Product Fidelity',
  metaTitle: 'Brand Consistency in AI Ads: Scene Bibles | SHOT.IS',
  description:
    'How to keep brand consistency in AI ads: the Scene Bible method, outfit locks, and product fidelity rules that make eight generated shots read as one world.',
  excerpt:
    'Eight shots that are individually fine and collectively incoherent is the default failure mode of AI ads. The fix is boring discipline: a Scene Bible.',
  datePublished: '2026-06-17',
  dateModified: '2026-06-17',
  author: founderAuthor,
  ogImageKey: 'blog-brand-consistency-ai-ads',
  tags: ['brand consistency', 'AI video ads', 'Scene Bible', 'product fidelity', 'QA'],
  tldr: [
    'Brand consistency in AI ads comes from a Scene Bible: one locked location, one locked outfit, and a short list of look constants (palette, lens feel, lighting) applied to every shot.',
    'Product fidelity rule: always generate from real product reference images — never let the model imagine the product, because it will redraw labels, logos, and type.',
    'Generative models will invent SKUs the brand does not sell unless the prompt and references explicitly constrain them to the real product line.',
    'A 30–40 second AI ad is typically 6–12 shots; without shared constants those shots read as stock-footage soup even when each one passes QA individually.',
    'Expect to generate 2–4 candidates per shot and reject the ones that break continuity — rejecting a still keyframe is far cheaper than rejecting a finished video.',
  ],
  blocks: [
    {
      type: 'p',
      text: 'Brand consistency in AI ads is not a model setting — it is a production discipline. The method that works in practice is a Scene Bible: before generating anything, you lock one location, one outfit, and a short list of look constants, and you feed real product reference images into every single shot so the model never gets to imagine the product. Skip this, and you get eight shots that are each individually fine and collectively incoherent.',
    },
    {
      type: 'h2',
      id: 'why-ai-ads-fall-apart',
      text: 'Why do AI ads fall apart as a set?',
    },
    {
      type: 'p',
      text: 'Generative video models have no memory between shots. Every generation starts from zero: a new kitchen, a new sweater, a new color grade, and — this is the dangerous one — a new version of your product. Each shot can pass review on its own. The failure only appears when you cut them together and the ad reads like stock footage from six different libraries.',
    },
    {
      type: 'p',
      text: 'We learned to describe the failure mode with one phrase: “four drinks on four different tables”. You ask for a six-shot ad about one beverage, and you get six technically competent shots in which the cup changes shape, the lid changes color, the table changes material, and the daylight changes season. No single shot is wrong. The set is.',
    },
    {
      type: 'p',
      text: 'A 30–40 second ad is typically 6–12 shots in our pipeline. That means 6–12 independent chances for the model to reinvent your world. Consistency does not emerge from better prompts shot by shot — it has to be imposed from above, by constants that every shot inherits.',
    },
    {
      type: 'h2',
      id: 'what-is-a-scene-bible',
      text: 'What is a Scene Bible?',
    },
    {
      type: 'p',
      text: 'A Scene Bible is a short document — often under a page — that fixes everything the campaign is not allowed to vary. Ours has three sections: one location, one outfit, and the look constants. Every prompt for every keyframe in the campaign carries these constants verbatim. The Scene Bible is written once, before the first generation, and it does not get edited mid-campaign.',
    },
    {
      type: 'h3',
      id: 'one-location',
      text: 'One location',
    },
    {
      type: 'p',
      text: 'Pick a single, specifically described setting and keep the whole ad in it: “small sunlit café counter, pale oak surfaces, white tile behind the espresso machine” — not “a café”. Specificity is what makes regeneration converge: when shot 4 fails QA and you regenerate it, a vague location description produces a different room every time, while a specific one produces variations of the same room.',
    },
    {
      type: 'h3',
      id: 'one-outfit',
      text: 'One outfit lock',
    },
    {
      type: 'p',
      text: 'If a presenter or creator appears in more than one shot, their outfit is locked to a written description with color, garment type, and one identifying detail — and that description ships in every prompt. Outfits drift even faster than faces: a model will happily move your presenter from a black crewneck to a grey hoodie between shots 2 and 3, and viewers read that instantly as a cut to a different person. Face-level identity is its own problem with its own mitigations — we cover that separately in [how we keep AI characters consistent](/blog/ai-character-consistency) — but the outfit lock is the cheap half of the fix, and teams skip it constantly.',
    },
    {
      type: 'h3',
      id: 'look-constants',
      text: 'Look constants',
    },
    {
      type: 'ul',
      items: [
        'Palette: 2–3 named colors that should dominate every frame, usually the brand colors plus one neutral.',
        'Lens feel: one phrase like “35mm handheld, shallow depth of field” repeated in every prompt — mixing a phone-camera look with a cinema look across shots is one of the loudest continuity breaks.',
        'Light: time of day and quality (“soft morning window light”) locked once. Light direction changing between shots is the single most common giveaway that an ad was generated piecemeal.',
        'Energy: a one-line note on motion (“slow push-ins, no whip pans”) so the edit cuts together at one tempo.',
      ],
    },
    {
      type: 'h2',
      id: 'how-to-build-one',
      text: 'How do you build a Scene Bible? Step by step',
    },
    {
      type: 'ol',
      items: [
        'Collect real product reference images first — clean shots of the actual product from 2–3 angles, with labels readable. These get fed into every generation; they are not optional inspiration.',
        'Write the location in one sentence with at least three concrete physical details (surfaces, fixtures, what is behind the subject).',
        'Lock the outfit: garment, color, fit, one identifying detail. If you use a persistent brand character, this is part of its permanent definition — the same logic behind [virtual influencers](/virtual-influencers).',
        'Pick the look constants: palette, lens feel, light, motion energy. Four lines, no more.',
        'Generate 3–4 test keyframes of different moments using the full constant block, side by side. If they look like frames from one film, the bible holds. If not, tighten the vaguest line and retest.',
        'Freeze it. Paste the constant block into every shot prompt for the rest of the campaign, unedited.',
      ],
    },
    {
      type: 'p',
      text: 'This works because our whole process is keyframe-first: we generate still keyframes, grade them, and only then animate the survivors via image-to-video. The Scene Bible is enforced at the keyframe stage, where a rejected image costs cents and seconds — not at the video stage, where a rejected clip costs a render queue slot and 1–5 minutes of waiting. The full flow is described in [our AI ad production pipeline](/blog/ai-ad-production-pipeline).',
    },
    {
      type: 'h2',
      id: 'product-fidelity',
      text: 'How do you keep the product faithful?',
    },
    {
      type: 'p',
      text: 'The product is the one element where “close enough” is a defect. Three rules cover most of it.',
    },
    {
      type: 'p',
      text: 'First: always generate from real product reference images. Reference-aware image models can hold a product’s shape, color, and label remarkably well — but only if you give them the real thing to hold onto. A text description of your packaging is an invitation to invent.',
    },
    {
      type: 'p',
      text: 'Second: never let the model imagine the product. If a shot does not need the product visible, fine. But the moment the product is in frame, the reference images go into the generation. There is no shot where “roughly our bottle” is acceptable.',
    },
    {
      type: 'p',
      text: 'Third: check labels and logos in QA, every time. Models love to redraw type. A label that reads correctly at a glance will, on inspection, have a mangled letterform, a doubled word, or a logo that is 90% right — which is worse than 0% right, because 90% right ships. Image-to-video adds a second layer of risk: even a perfect keyframe label can drift over the course of a clip, which is one reason we keep identity-critical clips short, 4–8 seconds, and re-anchor every shot on a fresh keyframe.',
    },
    {
      type: 'h2',
      id: 'dont-invent-skus',
      text: 'Why does “don’t invent SKUs” need to be a written rule?',
    },
    {
      type: 'p',
      text: 'Because the model will do it, cheerfully and plausibly. Ask for “a customer enjoying a drink from the brand” without constraints and you may get a frappé with whipped cream, an iced matcha, a smoothie in a branded cup — none of which the brand sells. The model is pattern-matching to “beverage brand ad”, not to your actual menu. The same applies to flavors, sizes, colorways, and bundle packs in any category.',
    },
    {
      type: 'p',
      text: 'The fix is explicit negative scope in the Scene Bible: list what the brand actually sells, name the hero SKU for the campaign, and state that no other products may appear. This sounds pedantic until the first time a client asks why the ad features a drink they have never made.',
    },
    {
      type: 'callout',
      title: 'Field note: the invented-menu problem',
      body: 'In our pipeline this rule exists because of a coffee to-go campaign. The brand sold coffee in one signature cup. Early unconstrained generations produced an entire phantom menu — layered iced drinks, cream-topped desserts in glassware the brand does not own. Every shot looked great. Every shot was a product lie. After we locked the bible to the one real cup, fed its reference photos into every generation, and added “no other drinks exist” to the constants, the invented-SKU rate in candidate keyframes dropped to near zero, and QA could focus on label fidelity instead of menu policing.',
    },
    {
      type: 'h2',
      id: 'continuity-checklist',
      text: 'The continuity checklist we run on every shot',
    },
    {
      type: 'p',
      text: 'Every keyframe and every clip is graded against a checklist before it enters the edit — machine-graded first, human spot-checked after. Roughly speaking we generate 2–4 candidates per shot to keep one. This is the checklist; copy it.',
    },
    {
      type: 'ul',
      items: [
        'Product matches the reference images: shape, proportions, cap/lid, material.',
        'Label and logo are legible and correct — read the actual letters, do not glance.',
        'No invented SKUs, flavors, or packaging variants anywhere in frame, including the background.',
        'Location matches the bible: same surfaces, same fixtures, same room.',
        'Outfit matches the lock: garment, color, identifying detail.',
        'Light direction and quality match the bible and the neighboring shots.',
        'Palette holds: brand colors present, no stray dominant hue.',
        'Lens feel consistent: same focal-length character and depth of field as the rest of the set.',
        'No artifacts: extra fingers, warped text in background signage, melted edges on the product.',
        'For video: identity and label hold for the full clip, not just the first frame.',
      ],
    },
    {
      type: 'h2',
      id: 'cost-of-skipping',
      text: 'What does skipping this actually cost?',
    },
    {
      type: 'p',
      text: 'The trap is that the cost is invisible at the shot level. Each generation looks fine, so nothing flags it. The cost lands at assembly, when the edit refuses to feel like one piece, and the only honest fix is regenerating half the shots — now under constants you should have written on day one. We have watched the no-bible path roughly double the generation volume on a campaign: the same 2–4 candidates per shot, but run twice, once before the bible existed and once after.',
    },
    {
      type: 'p',
      text: 'There is also a softer cost: trust. Viewers cannot articulate “the light direction flipped between shots”, but they feel it, and what they feel is cheapness. For [AI UGC ads](/blog/ai-ugc-ads-guide), where the entire format trades on feeling real and native, incoherence is not a style problem — it is a credibility problem.',
    },
    {
      type: 'h2',
      id: 'getting-started',
      text: 'What we would do in your place',
    },
    {
      type: 'p',
      text: 'Before generating a single frame: write the bible. One location sentence with three concrete details, one outfit lock, four look constants, the real SKU list, and a folder of clean product reference photos. It takes under an hour and it is the highest-leverage hour in the whole production. Then enforce it at the keyframe stage, where rejection is cheap, and run the continuity checklist on everything that survives.',
    },
    {
      type: 'p',
      text: 'Or hand it to a pipeline that already works this way. Scene Bibles, reference-fed product fidelity, and machine-graded continuity QA are built into how we produce [AI UGC ads](/ai-ugc-ads) — every campaign gets one world, not eight shots from eight different ones.',
    },
  ],
  faq: [
    {
      question: 'What is a Scene Bible in AI ad production?',
      answer:
        'A Scene Bible is a short pre-production document that locks everything an AI ad campaign is not allowed to vary: one location, one outfit for the presenter, and look constants like palette, lens feel, and lighting. Every shot prompt carries these constants, so 6–12 independently generated shots read as one coherent world.',
    },
    {
      question: 'How do you stop AI models from changing the product in ads?',
      answer:
        'Feed real product reference images into every generation where the product appears, and never rely on a text description of the packaging. Then verify labels and logos in QA on every candidate, because models frequently redraw type. For video, keep clips short — 4–8 seconds — since product fidelity drifts over longer image-to-video clips.',
    },
    {
      question: 'Why do AI ads sometimes show products the brand does not sell?',
      answer:
        'Generative models pattern-match to the category, not to your actual product line, so an unconstrained prompt for a beverage brand can produce invented drinks, flavors, or packaging. The fix is listing the real SKUs in the Scene Bible, naming the hero product, and explicitly stating that no other products may appear in frame.',
    },
    {
      question: 'How many shots and candidates does a consistent AI ad take?',
      answer:
        'A 30–40 second AI ad is typically 6–12 shots. With a Scene Bible in place, expect to generate roughly 2–4 candidates per shot and keep one after continuity QA. Without a bible, teams often regenerate large parts of the campaign at assembly, roughly doubling total generation volume.',
    },
    {
      question: 'Is brand consistency checked automatically or manually?',
      answer:
        'In our pipeline, both. Every keyframe and clip is machine-graded against a checklist covering product fidelity, label legibility, location, outfit, light, palette, and artifacts before it enters the edit, and humans spot-check the survivors. Grading at the still-keyframe stage keeps rejection cheap compared to rejecting finished video.',
    },
  ],
};

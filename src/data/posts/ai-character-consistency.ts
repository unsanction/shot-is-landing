import { founderAuthor, type BlogPost } from '../blogTypes';

export const post: BlogPost = {
  slug: 'ai-character-consistency',
  lang: 'en',
  translationKey: 'ai-character-consistency',
  title: 'How We Keep an AI Creator’s Face Consistent Across Hundreds of Shots',
  metaTitle: 'AI Character Consistency: Stop Face Drift | SHOT.IS',
  description:
    'AI character consistency is the hardest problem in virtual influencer work: why faces drift, and the reference + QA system that keeps one face stable.',
  excerpt:
    'Every generation resamples the face, and image-to-video drifts further with every second. Here is the system that holds one face together across hundreds of shots.',
  datePublished: '2026-06-17',
  dateModified: '2026-06-17',
  author: founderAuthor,
  ogImageKey: 'blog-ai-character-consistency',
  tags: ['AI character consistency', 'virtual influencers', 'face drift', 'identity QA', 'AI video'],
  tldr: [
    'AI faces drift because every image generation resamples the face from scratch, and image-to-video generation compounds the drift over the length of each clip.',
    'Consistent AI characters are anchored to a canonical identity set: several reference portraits across angles and expressions that are fed into every single keyframe generation.',
    'An identity score in the QA gate, asking “does this read as the same person?”, catches drift before a shot enters the edit. Expect to generate 2–4 candidates per shot to keep one.',
    'Shot design protects identity: subject mid-frame, no fast camera moves across the face, clips kept to 4–8 seconds, every shot re-anchored on a fresh reference-checked keyframe.',
    'Outfit and look locks make the character recognizable beyond the face alone, so small facial variance does not break recognition.',
  ],
  blocks: [
    {
      type: 'p',
      text: 'AI character consistency, meaning the same face across hundreds of generated shots, comes from a system rather than a better prompt. The system has five parts: a canonical identity set of reference portraits, reference-aware generation for every keyframe, an identity score inside the QA gate, shot design that avoids drift-prone motion, and outfit locks so recognition doesn’t hang on the face alone. Without all five, faces drift, because every generation resamples the face and image-to-video compounds that drift over the length of each clip.',
    },
    {
      type: 'h2',
      id: 'why-ai-faces-drift',
      text: 'Why do AI faces drift?',
    },
    {
      type: 'p',
      text: 'Generative models don’t store your character anywhere. No “person record” exists for the model to look up, only a text prompt, and a prompt describes rather than identifies. “A woman in her mid-20s with auburn hair and freckles” matches thousands of plausible faces, and the model picks a different one every time. That underspecification causes face drift in every virtual-influencer pipeline we have run.',
    },
    {
      type: 'h3',
      id: 'every-generation-resamples',
      text: 'Every generation resamples the face',
    },
    {
      type: 'p',
      text: 'Each image generation is an independent draw. Run the same prompt ten times and you get ten siblings: same vibe, different person. Eyes a few millimeters wider, a softer jaw, a different nose bridge. Any one looks fine in isolation, and lined up in a feed they obviously aren’t the same creator. Text alone can’t fix this, because no prose description pins a face precisely enough. You fix it by giving the model the actual face as input.',
    },
    {
      type: 'h3',
      id: 'i2v-compounds-drift',
      text: 'Image-to-video compounds drift over clip time',
    },
    {
      type: 'p',
      text: 'The second failure mode is sneakier. Even when you start an image-to-video generation from a perfect keyframe, the face is only guaranteed at frame one. From there, the video model invents every subsequent frame, and small errors accumulate: by second six or eight the jawline has narrowed, the eye color has shifted, the face has migrated toward the model’s house average. We see the same compounding with logos and product labels. This is why our [keyframe-to-video workflow](/blog/keyframe-to-video-workflow) re-anchors every shot on a fresh, identity-checked still instead of letting clips run long.',
    },
    {
      type: 'h2',
      id: 'canonical-identity-set',
      text: 'What is a canonical identity set?',
    },
    {
      type: 'p',
      text: 'A canonical identity set is the small library of reference portraits that defines who the character is. It serves as the single source of truth: you generate every keyframe against it, and every QA check compares back to it. We build one before producing a single shot of content and treat it the way you treat a logo file: versioned, locked, and never casually replaced.',
    },
    {
      type: 'ul',
      items: [
        'Several portraits rather than one, because a single reference overfits one angle and falls apart the moment the character turns her head.',
        'Multiple angles: frontal, three-quarter left and right, and profile, so the model has evidence for how the face reads in 3D.',
        'Multiple expressions: neutral, smiling, mid-speech. Expression changes facial geometry, so the references should cover that range.',
        'Consistent, neutral lighting across the set, so the references agree with each other instead of encoding three different color grades.',
        'The same haircut, makeup level, and signature details in every reference, because anything that varies inside the set will vary in the output.',
      ],
    },
    {
      type: 'p',
      text: 'Building the set is itself generative work: we generate far more portraits than we keep, pick the face we want as canon, then generate the remaining angles and expressions from that face and discard anything that doesn’t read as the same person. The set is finished when a stranger can shuffle the portraits and confidently say they’re all one human.',
    },
    {
      type: 'h2',
      id: 'identity-safe-shot-process',
      text: 'How we generate an identity-safe shot, step by step',
    },
    {
      type: 'p',
      text: 'Here is the loop we run for every shot in a virtual-influencer production. It follows the same keyframe-first logic we use across our [AI ad production pipeline](/blog/ai-ad-production-pipeline), because rejecting a bad still costs far less than rejecting a bad video.',
    },
    {
      type: 'ol',
      items: [
        'Pick the reference portraits from the canonical set that match the shot’s intended angle. A three-quarter shot gets the three-quarter references rather than only the frontal hero portrait.',
        'Generate the keyframe with a reference-aware image model, feeding the identity references (and product references, if the shot includes one) alongside the scene prompt. Never from text alone.',
        'Generate 2–4 keyframe candidates. Identity is partly a dice roll even with references, and candidates are cheap at the still stage.',
        'Run the identity check: machine-grade each candidate against the canonical set, asking one blunt question. Does this read as the same person? Kill anything below threshold, and regenerate if nothing passes.',
        'Animate the surviving keyframe with image-to-video, keeping the clip to 4–8 seconds so drift has less runway.',
        'Grade the clip again, checking identity at the start, middle, and end plus artifacts and continuity. A clip that starts on-model and ends off-model fails.',
        'Re-anchor: the next shot starts from a fresh reference-checked keyframe, never by extending a clip that has already drifted.',
      ],
    },
    {
      type: 'h2',
      id: 'identity-scoring-qa',
      text: 'How do you score identity in the QA gate?',
    },
    {
      type: 'p',
      text: 'Identity scoring is a dedicated check in our vision-QA loop, alongside brand fidelity, continuity, and artifact detection. The grader sees the candidate next to the canonical references and answers the question a follower answers implicitly: same person, or not? It flags specific tells like eye spacing, nose shape, jawline, and hairline rather than producing a vague vibe score, because specific tells make regeneration decisions fast.',
    },
    {
      type: 'p',
      text: 'The practical effect is a survival rate, not a guarantee. Across identity-critical shots we expect to generate roughly 2–4 candidates to keep one, and the rate gets worse for hard cases: profile angles, wide shots where the face is small in frame, and expressions far from the reference set. Budgeting for that rejection rate up front is what makes hundreds-of-shots consistency achievable instead of aspirational.',
    },
    {
      type: 'callout',
      title: 'Field note: the drift you stop seeing',
      body: 'In our pipeline the scariest drift was never the obvious kind. When you review shots one at a time, day after day, your eye acclimates: each shot sits only slightly off from yesterday’s slightly-off shot, and a human reviewer approves all of them. Then you place shot 1 next to shot 80 and they are visibly two different women. That is why the QA gate always compares against the canonical identity set and never against the previous shot. Machines don’t acclimate, and the reference never moves.',
    },
    {
      type: 'h2',
      id: 'shot-design-protects-identity',
      text: 'What shot design protects identity?',
    },
    {
      type: 'p',
      text: 'You can also stop fighting drift where it runs strongest. Some shots are structurally hostile to identity, since fast motion across the face gives the video model maximum freedom to reinvent it. The cheapest mitigation is not writing those shots in the first place.',
    },
    {
      type: 'ul',
      items: [
        'Keep the subject mid-frame on identity-critical shots. Faces at the frame edge or tiny in a wide shot drift faster and are harder to QA.',
        'No fast pans, whips, or orbit moves across the face. Camera energy belongs in B-roll and product shots, not on the creator’s close-up.',
        'Hold clips to 4–8 seconds. Drift compounds with time; shorter clips plus more cuts beat one long drifting take.',
        'Avoid mid-clip occlusions like hands brushing hair or cups passing in front of the face. The face that re-emerges is often a new one.',
        'Spend identity where it pays: face-forward shots for hooks and direct address, and cutaways or over-the-shoulder angles where the face isn’t load-bearing.',
      ],
    },
    {
      type: 'h2',
      id: 'outfit-locks',
      text: 'Why lock the outfit if the face is anchored?',
    },
    {
      type: 'p',
      text: 'Because recognition is redundant by design. People identify each other by the whole gestalt of hair, silhouette, wardrobe, and palette rather than by biometric face-matching. If your character always wears the same signature jacket and the same color story, a frame where the face is 90% on-model still reads as her. If every shot brings a new outfit, the face carries 100% of recognition, and a 90% face reads as a stranger.',
    },
    {
      type: 'p',
      text: 'In production we lock one outfit per campaign inside a Scene Bible: one location, one wardrobe, and a short list of look constants like palette and lighting feel. It applies the same discipline that keeps [brand consistency in AI ads](/blog/brand-consistency-ai-ads) from collapsing into “four drinks on four different tables”, aimed at a person instead of a product. The outfit doubles as a reference signal, since wardrobe details fed into generation give the model more to lock onto than the face alone.',
    },
    {
      type: 'h2',
      id: 'consistency-compounds',
      text: 'Why consistency is the asset, not the shots',
    },
    {
      type: 'p',
      text: 'Here is the economic argument for the work. Individual ads depreciate, because hooks fatigue in days on paid social and last month’s winning video becomes this month’s skipped one. A recognizable character appreciates. Every consistent post deposits into the same recognition account: your audience learns the face, the silhouette, and the voice, and that familiarity transfers to the next post, the next campaign, the next product.',
    },
    {
      type: 'p',
      text: 'An inconsistent character can’t compound. If followers half-register that the face keeps changing, you do not have [a virtual influencer](/blog/what-is-a-virtual-influencer). You have a series of disconnected AI clips wearing the same account name. Consistency turns generated content into a durable brand asset, which is why we treat identity infrastructure as the first build rather than a polish pass.',
    },
    {
      type: 'h2',
      id: 'getting-started',
      text: 'What we’d do in your place',
    },
    {
      type: 'p',
      text: 'If you are starting a virtual creator, or rescuing one that is drifting, the order of operations matters. Don’t generate content first and hope to firm up the identity later, because every off-model post you publish is drift your audience has already seen.',
    },
    {
      type: 'ol',
      items: [
        'Build the canonical identity set first: several portraits across angles and expressions, culled until every image is unambiguously one person.',
        'Lock the look constants: signature outfit, palette, lighting feel, and the handful of details that make the character recognizable at a glance.',
        'Set up the loop: reference-aware keyframes, identity scoring before animation, 4–8 second clips, re-anchor every shot.',
        'Budget for rejection. Generating 2–4 candidates per kept shot is normal, and it buys you a face that holds.',
      ],
    },
    {
      type: 'p',
      text: 'This is the system we run daily for [virtual influencer production at SHOT.IS](/virtual-influencers): canonical identity sets, reference-anchored generation, machine-graded identity QA, and shot design that keeps one face one face across hundreds of shots. If you would rather inherit the system than rebuild it, that is what we are for.',
    },
  ],
  faq: [
    {
      question: 'Why do AI-generated faces look different in every image?',
      answer:
        'Because each generation is an independent sample: the model matches your text description, and a description fits thousands of faces. Without reference images of the specific character fed into every generation, the model picks a slightly different face each time, which is why text-only prompting cannot produce a consistent AI character.',
    },
    {
      question: 'What is AI face drift in image-to-video generation?',
      answer:
        'Face drift is the gradual change of a character’s face over the course of a generated clip. Image-to-video models only guarantee the reference at the first frame; errors accumulate afterward, so by second six or eight the face has shifted. Mitigations are 4–8 second clips and re-anchoring every shot on a fresh keyframe.',
    },
    {
      question: 'How many reference images do you need for a consistent AI character?',
      answer:
        'More than one. A practical canonical identity set covers several portraits: frontal, three-quarter, and profile angles, plus a few expressions, all with consistent lighting and the same hair and signature details. One reference overfits a single angle and breaks down as soon as the character turns her head.',
    },
    {
      question: 'How do you check that an AI character looks the same across shots?',
      answer:
        'With an identity score in the QA gate: machine-grade each generated keyframe and clip against the canonical reference set, asking whether it reads as the same person. Comparing to the fixed references, never to the previous shot, prevents the slow drift that human reviewers acclimate to and stop noticing.',
    },
    {
      question: 'Does the outfit really matter for AI character consistency?',
      answer:
        'Yes, because recognition is a gestalt of face, hair, silhouette, and wardrobe. A locked signature outfit and palette let a frame with minor facial variance still read as the same character. If every shot brings new wardrobe, the face carries recognition alone and small drift becomes far more visible.',
    },
  ],
};

import { defaultAuthor, type BlogPost } from '../blogTypes';

export const post: BlogPost = {
  slug: 'keyframe-to-video-workflow',
  lang: 'en',
  translationKey: 'keyframe-to-video-workflow',
  title: 'The Keyframe-to-Video Workflow: Consistent AI Shots with i2v',
  metaTitle: 'Keyframe-to-Video: Consistent AI Shots with i2v | SHOT.IS',
  description:
    'An image to video AI workflow that holds up in production: generate still keyframes with reference-aware models, QA them, then animate with i2v.',
  excerpt:
    'Text-to-video from a prompt is a lottery for brand work. Generating a keyframe first — then animating it — is how you get control back.',
  datePublished: '2026-06-13',
  dateModified: '2026-06-13',
  author: defaultAuthor,
  ogImageKey: 'blog-keyframe-to-video-workflow',
  tags: ['keyframe to video', 'i2v', 'image to video', 'AI workflow', 'consistency'],
  tldr: [
    'Keyframe-to-video means generating a still image first with a reference-aware image model, approving it, then animating it with an image-to-video (i2v) model.',
    'Rejecting a bad still costs seconds and cents; rejecting a bad video costs minutes and multiples of that — so the QA gate belongs between keyframe and video.',
    'i2v identity drift is real: faces, logos, and product labels wander from the reference over a clip, which is why production clips stay in the 4–8 second range.',
    'For multi-shot ads, each shot is re-anchored on a fresh keyframe (or the last frame of the previous clip) so identity resets instead of compounding drift.',
    'Expect to generate 2–4 keyframe candidates per shot to keep one; that ratio is normal, not a sign the workflow is failing.',
  ],
  blocks: [
    {
      type: 'p',
      text: 'The keyframe-to-video workflow is simple to state: instead of asking a video model to invent a shot from a text prompt, you first generate a still keyframe with a reference-aware image model — your product shots and creator identity images attached as references — approve that still, and only then animate it with an image-to-video (i2v) model. The still becomes a contract: composition, identity, props, and framing are locked before a single second of video is rendered. For brand work, this is the difference between gambling and directing.',
    },
    {
      type: 'h2',
      id: 'why-t2v-is-a-lottery',
      text: 'Why is text-to-video a lottery for brand work?',
    },
    {
      type: 'p',
      text: 'Text-to-video is genuinely impressive for open-ended creative shots. But an ad is not open-ended. It needs a specific product with a specific label, a creator whose face matches the last shot, a composition that leaves room for a text overlay. A text prompt under-specifies all of that, so the model fills the gaps with its own ideas — a different bottle shape, a logo that almost reads correctly, a face that belongs to nobody in particular.',
    },
    {
      type: 'p',
      text: 'The cost structure makes it worse. A video generation takes anywhere from one to five minutes depending on model and load, and you can’t evaluate it until it finishes. When the failure rate per attempt is high and each attempt is slow and expensive, iteration grinds. You end up re-rolling whole videos to fix problems that were visible in the first frame.',
    },
    {
      type: 'p',
      text: 'Keyframe-first inverts the economics. Stills render in seconds, cost a fraction of a video, and expose almost every brand-critical failure — wrong label, wrong face, wrong framing — before you commit to motion. Cheap rejection is the core idea: kill bad shots while they’re still cheap to kill.',
    },
    {
      type: 'h2',
      id: 'what-keyframe-first-buys-you',
      text: 'What does generating the keyframe first actually buy you?',
    },
    {
      type: 'ul',
      items: [
        'Cheap rejection: a bad still is discarded in seconds for cents; a bad video wastes minutes and a meaningfully larger generation cost.',
        'Identity anchoring per shot: reference-aware image models accept your product photos and creator images directly, so each keyframe starts from the right face and the right label instead of an approximation.',
        'Deliberate composition: you choose where the product sits, where the eyeline goes, and where overlay text will land — at the still stage, where changing it is trivial.',
        'A reviewable artifact: a grid of keyframes is something a human or a vision model can grade in one pass; a folder of half-wrong videos is not.',
      ],
    },
    {
      type: 'h2',
      id: 'step-by-step',
      text: 'The keyframe-to-video workflow, step by step',
    },
    {
      type: 'p',
      text: 'This is the process our studio runs daily, in the same order we run it. It sits inside a larger pipeline — brief, shot plan, assembly — covered in our [AI ad production pipeline](/blog/ai-ad-production-pipeline) post, but these are the steps from shot plan to usable clip.',
    },
    {
      type: 'ol',
      items: [
        'Lock the references. Collect clean product shots (label readable, neutral background) and creator identity images. These get attached to every keyframe generation, not pasted into the prompt as a description.',
        'Lock the look constants. One location, one outfit, a short palette-and-lighting note shared across all shots — so six shots read as one world, not six worlds.',
        'Generate keyframe candidates. For each shot in the plan, generate 2–4 stills with a reference-aware image model, references attached, composition described per shot.',
        'Grade the stills. Check brand fidelity (label, colors, product geometry), identity match against the creator references, continuity with neighboring shots, and artifacts. Reject and regenerate until one candidate passes. This is the QA gate — nothing animates without passing it.',
        'Animate with i2v. Feed the approved keyframe to an image-to-video model with a motion prompt that describes what moves — and, just as important, what stays still. Keep clips in the 4–8 second range.',
        'Grade the clips. Identity and label fidelity are re-checked across the clip’s duration, not just the first frame, because drift accumulates over time. Weak clips get regenerated from the same approved keyframe.',
        'Anchor the next shot. Start shot N+1 from a fresh keyframe generated against the same references, or from the last frame of clip N when you need direct visual continuity.',
      ],
    },
    {
      type: 'callout',
      title: 'Field note: the 2–4× rule',
      body: 'In our pipeline, roughly 2–4 keyframe candidates are generated for every still that survives grading, and a similar ratio holds for the i2v step on identity-critical shots. Early on we treated that as waste to engineer away. It isn’t — it’s the budget. The workflow works because rejection is cheap at the still stage, so pricing in 2–4 attempts per shot up front is what keeps the expensive video stage mostly first-take.',
    },
    {
      type: 'h2',
      id: 'qa-gate',
      text: 'How does the QA gate between keyframe and video work?',
    },
    {
      type: 'p',
      text: 'The gate is a checklist, applied to every still before it earns an i2v render. Ours is machine-graded — a vision model scores each candidate against the checklist and the references — but the checklist works manually too:',
    },
    {
      type: 'ul',
      items: [
        'Brand fidelity: is the label legible and correct? Are product proportions and colors right? Logos are where image models lie most confidently.',
        'Identity match: does the face actually match the creator reference, or just the general demographic? Compare side by side; squint tests fail here.',
        'Continuity: same outfit, same location, same lighting direction as the adjacent shots in the plan.',
        'Composition for purpose: subject placed mid-frame if the shot is identity-critical, headroom or negative space reserved if an overlay is planned.',
        'Artifacts: extra fingers, melted text, impossible reflections — anything that reads as obviously synthetic at feed scroll speed.',
      ],
    },
    {
      type: 'p',
      text: 'The discipline that matters most: the gate is binary. A still that «mostly» passes does not get animated on the theory that motion will hide the flaw. Motion amplifies flaws — a slightly-off label in a still becomes a visibly morphing label in a clip.',
    },
    {
      type: 'h2',
      id: 'failure-modes',
      text: 'Why do i2v clips drift away from the keyframe?',
    },
    {
      type: 'p',
      text: 'i2v models are conditioned on your keyframe at frame zero, but every subsequent frame is generated from model priors plus the frames before it. The further the clip runs from the anchor, the more the model’s own ideas leak in. Three failure modes account for most of our rejected clips:',
    },
    {
      type: 'h3',
      id: 'identity-drift',
      text: 'Identity drift over clip duration',
    },
    {
      type: 'p',
      text: 'Faces, logos, and printed labels gradually wander from the reference as the clip plays. Frame one matches the keyframe; second six is a cousin of it. Mitigations: keep clips short (4–8 seconds), keep the identity-critical subject mid-frame where the model spends its capacity, and avoid fast camera moves on shots where the face or label must hold. If a shot needs a whip pan, make it a shot where identity doesn’t matter.',
    },
    {
      type: 'h3',
      id: 'motion-overshoot',
      text: 'Motion overshoot',
    },
    {
      type: 'p',
      text: 'You ask for «she lifts the cup slightly» and get a toast, a head turn, and a camera orbit. i2v models tend to maximize motion unless told otherwise. The fix is in the motion prompt: state explicitly what stays still («camera locked, background static»), describe one motion per clip, and scale adjectives down — models read «slowly» as normal speed and «slightly» as a full gesture.',
    },
    {
      type: 'h3',
      id: 'prop-morphing',
      text: 'Props morphing',
    },
    {
      type: 'p',
      text: 'Hands passing in front of a product, a cup being set down, a bag being opened — interaction moments are where props change shape, labels rewrite themselves, and objects merge. Mitigations: minimize occlusion of the product in the keyframe composition, keep hand–product contact brief, and when an interaction is essential, generate extra candidates for that shot specifically. Some models hold props better than others; we run several in production and route shots accordingly — our [comparison of AI video generators for ads](/blog/best-ai-video-generator-for-ads) covers which model wins which shot type.',
    },
    {
      type: 'h2',
      id: 'multi-shot-chaining',
      text: 'How do you chain shots without compounding drift?',
    },
    {
      type: 'p',
      text: 'A 30–40 second ad is typically 6–12 shots. The naive approach — extend one generation, or feed each clip’s output into the next — compounds drift: shot three is anchored on shot two’s already-drifted final frame, and by shot six the creator is a stranger. Two anchoring strategies fix this:',
    },
    {
      type: 'ul',
      items: [
        'Fresh-keyframe anchoring (our default): every shot starts from a newly generated keyframe, built against the original product and creator references plus the shared look constants. Drift resets to zero at every cut. Cuts hide the seams; this is how most real ads are edited anyway.',
        'Last-frame anchoring (the exception): shot N+1 is animated from the final frame of clip N. Use it only when two shots must connect continuously — a match cut, a continued gesture. Accept that you’re inheriting whatever drift clip N accumulated, so grade that last frame as strictly as a fresh keyframe before animating from it.',
      ],
    },
    {
      type: 'p',
      text: 'In practice we mix them: fresh keyframes for nearly every cut, last-frame anchoring for the one or two transitions per ad that need continuous motion. Because every fresh keyframe is generated against the same references and look constants, the shots still read as one continuous world — that consistency comes from the references, not from chaining the video frames.',
    },
    {
      type: 'p',
      text: 'Model choice interacts with chaining too. Models with strong physics and native audio are worth spending on hero shots — see our notes on [Veo 3 for ad creative](/blog/veo-3-for-ad-creative) — while faster, cheaper models handle the high-volume keyframe iteration and B-roll shots where you’re burning most of your 2–4 candidates.',
    },
    {
      type: 'h2',
      id: 'getting-started',
      text: 'What we’d do in your place',
    },
    {
      type: 'p',
      text: 'If you’re starting from zero, don’t start by generating videos. Start by generating stills. Take your three best product photos and two clean images of your creator (or spokesperson, or mascot), and spend a session generating keyframes only: one location, one outfit, six compositions from a simple shot list. Grade them hard against the checklist above. Only when you have six stills you’d actually approve as photographs should you animate anything — and when you do, animate with short clips, one motion each, camera locked.',
    },
    {
      type: 'p',
      text: 'That single discipline — never animate an unapproved still — carries most of the value of this workflow. The rest is volume and routing: more candidates per shot, the right model per shot type, a QA pass on every output. That’s the part that stops scaling gracefully by hand, and it’s the part our studio automates end to end, from references to a beat-cut vertical ad. If you’d rather skip building the pipeline and just get the output, that’s what [AI video ads at SHOT.IS](/ai-video-ads) are: the keyframe-to-video workflow, run for you, with the QA gates already in place.',
    },
  ],
  faq: [
    {
      question: 'What is the keyframe-to-video workflow?',
      answer:
        'It’s an AI video production method where you first generate a still keyframe with a reference-aware image model — product and creator reference images attached — approve that still against a QA checklist, and only then animate it with an image-to-video (i2v) model. The still locks composition and identity before any video is rendered.',
    },
    {
      question: 'Why use image-to-video instead of text-to-video for ads?',
      answer:
        'Text-to-video under-specifies brand-critical details — labels, faces, framing — so each attempt is a slow, expensive gamble. With image-to-video, those details are locked in an approved still first. Rejecting a bad still takes seconds and costs cents; rejecting a bad video takes minutes and costs several times more.',
    },
    {
      question: 'How do you stop AI video identity drift?',
      answer:
        'Identity drift — faces, logos, and labels wandering from the reference during a clip — is mitigated by keeping clips short (4–8 seconds), re-anchoring every shot on a fresh keyframe generated from the original references, keeping the subject mid-frame, and avoiding fast camera moves on identity-critical shots.',
    },
    {
      question: 'How many keyframes should I generate per shot?',
      answer:
        'Plan for 2–4 candidates per shot to keep one — that rejection rate is normal in production, not a failure of the workflow. Generating and discarding stills is cheap; the whole point of keyframe-first is concentrating iteration at the still stage so the expensive i2v stage is mostly first-take.',
    },
    {
      question: 'How do you keep a multi-shot AI ad consistent?',
      answer:
        'Anchor every shot on a fresh keyframe generated against the same product and creator references, with one locked location, outfit, and lighting style shared across shots. Reserve last-frame anchoring — animating shot N+1 from clip N’s final frame — for the rare transitions that need continuous motion.',
    },
  ],
};

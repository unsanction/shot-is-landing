import { founderAuthor, type BlogPost } from '../blogTypes';

export const post: BlogPost = {
  slug: 'keyframe-to-video-workflow',
  lang: 'en',
  translationKey: 'keyframe-to-video-workflow',
  title: 'The Keyframe-to-Video Workflow: Consistent AI Shots with i2v',
  metaTitle: 'Keyframe-to-Video: Consistent AI Shots with i2v | SHOT.IS',
  description:
    'An image to video AI workflow that holds up in production: generate still keyframes with reference-aware models, QA them, then animate with i2v.',
  excerpt:
    'Text-to-video from a prompt is a lottery for brand work. Generate a keyframe first, animate it second, and you get control back.',
  datePublished: '2026-06-15',
  dateModified: '2026-06-15',
  author: founderAuthor,
  ogImageKey: 'blog-keyframe-to-video-workflow',
  tags: ['keyframe to video', 'i2v', 'image to video', 'AI workflow', 'consistency'],
  tldr: [
    'Keyframe-to-video means generating a still image first with a reference-aware image model, approving it, then animating it with an image-to-video (i2v) model.',
    'Rejecting a bad still costs seconds and cents while rejecting a bad video costs minutes and multiples of that, so the QA gate belongs between keyframe and video.',
    'i2v identity drift is real: faces, logos, and product labels wander from the reference over a clip, which is why production clips stay in the 4–8 second range.',
    'For multi-shot ads, each shot is re-anchored on a fresh keyframe (or the last frame of the previous clip) so identity resets instead of compounding drift.',
    'Expect to generate 2–4 keyframe candidates per shot to keep one; that ratio is normal, not a sign the workflow is failing.',
  ],
  blocks: [
    {
      type: 'p',
      text: 'The keyframe-to-video workflow is simple to state. Instead of asking a video model to invent a shot from a text prompt, you generate a still keyframe with a reference-aware image model, attaching your product shots and creator identity images as references. You approve that still, then animate it with an image-to-video (i2v) model. The still becomes a contract that locks composition, identity, props, and framing before a single second of video renders. For brand work, that is the difference between gambling and directing.',
    },
    {
      type: 'h2',
      id: 'why-t2v-is-a-lottery',
      text: 'Why is text-to-video a lottery for brand work?',
    },
    {
      type: 'p',
      text: 'Text-to-video impresses on open-ended creative shots. An ad is not open-ended. It needs a specific product with a specific label, a creator whose face matches the last shot, and a composition that leaves room for a text overlay. A text prompt under-specifies all of that, so the model fills the gaps with its own ideas: a different bottle shape, a logo that almost reads correctly, a face that belongs to nobody in particular.',
    },
    {
      type: 'p',
      text: 'The cost structure makes it worse. A video generation takes anywhere from one to five minutes depending on model and load, and you can’t evaluate it until it finishes. When the failure rate per attempt is high and each attempt is slow and expensive, iteration grinds. You end up re-rolling whole videos to fix problems that were visible in the first frame.',
    },
    {
      type: 'p',
      text: 'Keyframe-first inverts the economics. Stills render in seconds, cost a fraction of a video, and expose almost every brand-critical failure before you commit to motion: wrong label, wrong face, wrong framing. Cheap rejection is the core idea. Kill bad shots while killing them is still cheap.',
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
        'Deliberate composition: you choose where the product sits, where the eyeline goes, and where overlay text lands, all at the still stage where changing it is trivial.',
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
      text: 'This is the process our studio runs daily, in the order we run it. It sits inside a larger pipeline of brief, shot plan, and assembly, covered in our [AI ad production pipeline](/blog/ai-ad-production-pipeline) post. These are the steps from shot plan to usable clip.',
    },
    {
      type: 'ol',
      items: [
        'Lock the references. Collect clean product shots (label readable, neutral background) and creator identity images. These get attached to every keyframe generation, not pasted into the prompt as a description.',
        'Lock the look constants: one location, one outfit, and a short palette-and-lighting note shared across all shots, so six shots read as one world instead of six.',
        'Generate keyframe candidates. For each shot in the plan, generate 2–4 stills with a reference-aware image model, references attached, composition described per shot.',
        'Grade the stills. Check brand fidelity across label, colors, and product geometry, identity match against the creator references, continuity with neighboring shots, and artifacts. Reject and regenerate until one candidate passes. This is the QA gate, and nothing animates without passing it.',
        'Animate with i2v. Feed the approved keyframe to an image-to-video model with a motion prompt that describes what moves and, just as importantly, what stays still. Keep clips in the 4–8 second range.',
        'Grade the clips. Re-check identity and label fidelity across the clip’s full duration rather than the first frame alone, because drift accumulates over time. Weak clips get regenerated from the same approved keyframe.',
        'Anchor the next shot. Start shot N+1 from a fresh keyframe generated against the same references, or from the last frame of clip N when you need direct visual continuity.',
      ],
    },
    {
      type: 'callout',
      title: 'Field note: the 2–4× rule',
      body: 'In our pipeline we generate roughly 2–4 keyframe candidates for every still that survives grading, and a similar ratio holds for the i2v step on identity-critical shots. Early on we treated that as waste to engineer away. It is the budget. The workflow works because rejection is cheap at the still stage, so pricing in 2–4 attempts per shot up front keeps the expensive video stage mostly first-take.',
    },
    {
      type: 'h2',
      id: 'qa-gate',
      text: 'How does the QA gate between keyframe and video work?',
    },
    {
      type: 'p',
      text: 'The gate is a checklist you apply to every still before it earns an i2v render. Ours is machine-graded, with a vision model scoring each candidate against the checklist and the references, and the checklist works manually too:',
    },
    {
      type: 'ul',
      items: [
        'Brand fidelity: is the label legible and correct? Are product proportions and colors right? Logos are where image models lie most confidently.',
        'Identity match: does the face actually match the creator reference, or just the general demographic? Compare side by side; squint tests fail here.',
        'Continuity: same outfit, same location, same lighting direction as the adjacent shots in the plan.',
        'Composition for purpose: subject placed mid-frame if the shot is identity-critical, headroom or negative space reserved if an overlay is planned.',
        'Artifacts: extra fingers, melted text, impossible reflections, or anything that reads as obviously synthetic at feed scroll speed.',
      ],
    },
    {
      type: 'p',
      text: 'One discipline matters most: keep the gate binary. A still that “mostly” passes does not get animated on the theory that motion will hide the flaw. Motion amplifies flaws, and a slightly-off label in a still becomes a visibly morphing label in a clip.',
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
      text: 'You ask for “she lifts the cup slightly” and get a toast, a head turn, and a camera orbit. i2v models maximize motion unless told otherwise. Fix it in the motion prompt: state what stays still (“camera locked, background static”), describe one motion per clip, and scale your adjectives down, because models read “slowly” as normal speed and “slightly” as a full gesture.',
    },
    {
      type: 'h3',
      id: 'prop-morphing',
      text: 'Props morphing',
    },
    {
      type: 'p',
      text: 'Interaction moments break props: hands passing in front of a product, a cup being set down, a bag being opened. That is where props change shape, labels rewrite themselves, and objects merge. Mitigate it by minimizing occlusion of the product in the keyframe composition, keeping hand-to-product contact brief, and generating extra candidates for any shot where interaction is essential. Some models hold props better than others, so we run several in production and route shots accordingly. Our [comparison of AI video generators for ads](/blog/best-ai-video-generator-for-ads) covers which model wins which shot type.',
    },
    {
      type: 'h2',
      id: 'multi-shot-chaining',
      text: 'How do you chain shots without compounding drift?',
    },
    {
      type: 'p',
      text: 'A 30–40 second ad runs 6–12 shots. The naive approach of extending one generation, or feeding each clip’s output into the next, compounds drift: shot three anchors on shot two’s already-drifted final frame, and by shot six the creator is a stranger. Two anchoring strategies fix this:',
    },
    {
      type: 'ul',
      items: [
        'Fresh-keyframe anchoring (our default): every shot starts from a newly generated keyframe, built against the original product and creator references plus the shared look constants. Drift resets to zero at every cut. Cuts hide the seams; this is how most real ads are edited anyway.',
        'Last-frame anchoring (the exception): animate shot N+1 from the final frame of clip N. Use it only when two shots must connect continuously, as in a match cut or a continued gesture. You inherit whatever drift clip N accumulated, so grade that last frame as strictly as a fresh keyframe before animating from it.',
      ],
    },
    {
      type: 'p',
      text: 'In practice we mix them: fresh keyframes for nearly every cut, last-frame anchoring for the one or two transitions per ad that need continuous motion. Because every fresh keyframe generates against the same references and look constants, the shots still read as one continuous world. That consistency comes from the references rather than from chaining the video frames.',
    },
    {
      type: 'p',
      text: 'Model choice interacts with chaining too. Spend models with strong physics and native audio on hero shots, as we describe in our notes on [Veo 3 for ad creative](/blog/veo-3-for-ad-creative). Let faster, cheaper models handle high-volume keyframe iteration and the B-roll shots where you burn most of your 2–4 candidates.',
    },
    {
      type: 'h2',
      id: 'getting-started',
      text: 'What we’d do in your place',
    },
    {
      type: 'p',
      text: 'Starting from zero? Generate stills rather than videos. Take your three best product photos and two clean images of your creator, spokesperson, or mascot, and spend a session on keyframes only: one location, one outfit, six compositions from a simple shot list. Grade them hard against the checklist above. Animate nothing until you have six stills you would approve as photographs, and when you do, use short clips with one motion each and the camera locked.',
    },
    {
      type: 'p',
      text: 'One discipline carries most of the value here: never animate an unapproved still. The rest is volume and routing, meaning more candidates per shot, the right model per shot type, and a QA pass on every output. That part stops scaling gracefully by hand, and our studio automates it end to end, from references to a beat-cut vertical ad. If you would rather skip building the pipeline and get the output, [AI video ads at SHOT.IS](/ai-video-ads) run the keyframe-to-video workflow for you with the QA gates already in place.',
    },
  ],
  scenes: [
    {
      anchor: 'why-t2v-is-a-lottery',
      label: 'The t2v lottery',
      visual: {
        kind: 'scatter',
        total: 24,
        winners: [6, 17],
        note: 'ONE PROMPT · TWENTY-FOUR RENDERS',
      },
      caption:
        'Text-to-video from one prompt: every attempt costs a full render before you can judge it, and the label, the face or the framing is wrong in most of them.',
    },
    {
      anchor: 'what-keyframe-first-buys-you',
      label: 'What the still locks',
      visual: {
        kind: 'stack',
        baseLabel: 'PRODUCT + CREATOR REFERENCES',
        lockedLabel: 'APPROVED',
        layers: [
          { label: 'Cheap rejection', note: 'Kill it while killing it is cheap' },
          { label: 'Identity anchoring', note: 'References attached, not described' },
          { label: 'Deliberate composition', note: 'Room reserved for the overlay' },
          { label: 'A reviewable artifact', note: 'A grid a human can grade in one pass' },
        ],
      },
      caption: 'Four things an approved still holds in place before a single second of video renders.',
    },
    {
      anchor: 'step-by-step',
      label: 'The workflow',
      visual: {
        kind: 'flow',
        loopLabel: 'reject',
        steps: [
          { label: 'Lock the references', note: 'Clean product shots, creator identity' },
          { label: 'Lock the look constants', note: 'One location, one outfit, one palette' },
          { label: 'Generate keyframe candidates', note: '2–4 stills per shot' },
          { label: 'Grade the stills', note: 'Brand, identity, continuity, artifacts', gate: true },
          { label: 'Animate with i2v', note: '4–8 second clips' },
          { label: 'Grade the clips', note: 'Full duration, not the first frame' },
          { label: 'Anchor the next shot', note: 'Fresh keyframe, or last frame' },
        ],
      },
      caption: 'Nothing animates without passing stage 04. Failures loop back to a new still, never forward into a render.',
    },
    {
      anchor: 'qa-gate',
      label: 'The QA gate',
      visual: {
        kind: 'cull',
        total: 8,
        keep: 5,
        tile: 'product',
        rejectNote: 'WRONG LABEL · WRONG FACE · WRONG FRAMING',
        keepNote: 'EARNS AN I2V RENDER',
      },
      caption: 'The gate is binary. A still that “mostly” passes does not get animated on the theory that motion will hide the flaw.',
    },
    {
      anchor: 'failure-modes',
      label: 'Identity drift',
      visual: {
        kind: 'drift',
        frames: 8,
        glyph: 'label',
        driftNote: 'FRAME 01 — MATCHES THE KEYFRAME',
        anchorNote: 'FRAME 08 — A COUSIN OF IT',
      },
      caption: 'The model is conditioned on your keyframe at frame zero only. Every frame after that is generated from its own priors.',
    },
    {
      anchor: 'multi-shot-chaining',
      label: 'Fresh-keyframe anchoring',
      visual: {
        kind: 'drift',
        frames: 9,
        anchors: [3, 6],
        glyph: 'face',
        driftNote: 'DRIFT ACCUMULATES WITHIN A SHOT',
        anchorNote: 'CUT RESETS IT TO ZERO',
      },
      caption: 'The same strip, cut into shots. Each cut re-anchors on a fresh keyframe built from the original references, so drift never compounds past one shot.',
    },
    {
      anchor: 'getting-started',
      label: 'The 2–4× budget',
      visual: {
        kind: 'bars',
        unit: 'ONE SESSION · SIX-SHOT LIST',
        note: 'THE RATIO IS THE BUDGET',
        series: [
          { label: 'Stills generated', value: 18, display: '18', tone: 'muted', note: '2–4 candidates per shot' },
          { label: 'Stills approved', value: 6, display: '6', tone: 'accent', note: 'One per shot, graded hard' },
          { label: 'Clips animated', value: 6, display: '6', tone: 'ink', note: 'Mostly first-take' },
        ],
      },
      caption: 'Pricing in 2–4 attempts per shot up front is what keeps the expensive video stage nearly first-take.',
    },
  ],
  faq: [
    {
      question: 'What is the keyframe-to-video workflow?',
      answer:
        'It is an AI video production method where you generate a still keyframe with a reference-aware image model, attaching product and creator reference images, approve that still against a QA checklist, and only then animate it with an image-to-video (i2v) model. The still locks composition and identity before any video renders.',
    },
    {
      question: 'Why use image-to-video instead of text-to-video for ads?',
      answer:
        'Text-to-video under-specifies brand-critical details like labels, faces, and framing, so each attempt becomes a slow, expensive gamble. With image-to-video, you lock those details in an approved still first. Rejecting a bad still takes seconds and costs cents; rejecting a bad video takes minutes and costs several times more.',
    },
    {
      question: 'How do you stop AI video identity drift?',
      answer:
        'Identity drift means faces, logos, and labels wandering from the reference during a clip. Mitigate it by keeping clips short at 4–8 seconds, re-anchoring every shot on a fresh keyframe generated from the original references, keeping the subject mid-frame, and avoiding fast camera moves on identity-critical shots.',
    },
    {
      question: 'How many keyframes should I generate per shot?',
      answer:
        'Plan for 2–4 candidates per shot to keep one, because that rejection rate is normal in production rather than a failure of the workflow. Generating and discarding stills costs little, and keyframe-first exists to concentrate iteration at the still stage so the expensive i2v stage stays mostly first-take.',
    },
    {
      question: 'How do you keep a multi-shot AI ad consistent?',
      answer:
        'Anchor every shot on a fresh keyframe generated against the same product and creator references, with one locked location, outfit, and lighting style shared across shots. Reserve last-frame anchoring, where you animate shot N+1 from clip N’s final frame, for the rare transitions that need continuous motion.',
    },
  ],
};

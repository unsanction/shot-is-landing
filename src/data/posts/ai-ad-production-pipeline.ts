import { founderAuthor, type BlogPost } from '../blogTypes';

export const post: BlogPost = {
  slug: 'ai-ad-production-pipeline',
  lang: 'en',
  translationKey: 'ai-ad-production-pipeline',
  title: 'From Brief to Published Ad: Inside a Real AI Ad Production Pipeline',
  metaTitle: 'AI Ad Production Pipeline: Brief to Published Ad | SHOT.IS',
  description:
    'How a real AI ad production pipeline turns a brand brief into a finished short-form ad: scene bible, keyframes, vision QA, i2v animation, beat-grid edit.',
  excerpt:
    'Nine stages sit between a brand brief and a published ad. Here is the full map of how our studio runs them, failure modes included.',
  datePublished: '2026-06-10',
  dateModified: '2026-06-10',
  author: founderAuthor,
  ogImageKey: 'blog-ai-ad-production-pipeline',
  tags: ['AI ad production', 'pipeline', 'AI video ads', 'workflow'],
  tldr: [
    'A production AI ad pipeline runs in nine stages: brief, scene bible, reference-aware keyframes, grading and QA, image-to-video animation, beat-grid editing, overlays, export, and creative testing.',
    'Keyframe-first workflows generate and grade still images before animating, because rejecting a bad still costs seconds while rejecting a bad video costs minutes of render time and real money.',
    'A 30–40 second AI ad is typically 6–12 shots of 4–8 seconds each, and in practice you generate 2–4 candidates per shot to keep one.',
    'A scene bible with one locked location, one outfit, and a short list of look constants makes separately generated shots read as one coherent world.',
    'Identity drift (faces, logos, and product labels shifting away from the reference mid-clip) is the main failure mode of image-to-video; short clips and a fresh keyframe anchor per shot are the working mitigations.',
  ],
  blocks: [
    {
      type: 'p',
      text: 'An AI ad production pipeline is the sequence of steps that turns a brand brief into a finished, publishable short-form ad: brief intake, a scene bible that locks the visual world, reference-aware keyframe generation, grading and QA, image-to-video animation, a beat-synced edit, overlays, and export into creative testing. Our studio runs this pipeline daily, and the honest version is less “type a prompt, get an ad” and more a production line with rejection gates at every stage. This article is the full map; the linked deep-dives go further into each part.',
    },
    {
      type: 'h2',
      id: 'pipeline-overview',
      text: 'What does the pipeline actually look like, end to end?',
    },
    {
      type: 'p',
      text: 'Every ad we ship passes through the same nine stages. The order matters: each stage makes the next one cheaper, and the expensive operations of video rendering and human review sit as late as possible.',
    },
    {
      type: 'ol',
      items: [
        'Brief intake: distill the product, audience, and offer into a one-page creative brief covering what the ad must show, claim, and ask.',
        'Scene bible: lock one location, one outfit, and a short list of look constants (palette, lens feel, lighting) for the whole campaign.',
        'Shot plan: break the ad into 6–12 shots of 4–8 seconds each for a 30–40 second runtime, giving every shot a purpose of hook, demo, proof, or close.',
        'Keyframe generation: generate still keyframes with reference-aware image models, feeding real product shots and creator identity images as references.',
        'Grading and vision QA: machine-grade every keyframe against a checklist of brand fidelity, identity match, continuity, and artifacts, then regenerate the ones that fail.',
        'Image-to-video animation: animate only the approved keyframes, where a 6-second clip renders in roughly 1–5 minutes depending on model and load.',
        'Beat-grid edit: assemble clips on a beat grid so cuts land on music onsets, then add burned-in text and box overlays.',
        'Export: render 9:16 vertical first, then any other aspect ratios the placements need.',
        'Creative testing: ship several variants, read performance, and feed the winners’ patterns back into the next brief.',
      ],
    },
    {
      type: 'p',
      text: 'Nothing in that list is exotic on its own. The gain comes from running it as one connected system, where a shot rejected at stage 5 never burns render minutes at stage 6.',
    },
    {
      type: 'h2',
      id: 'why-keyframes-first',
      text: 'Why generate keyframes first instead of going straight to video?',
    },
    {
      type: 'p',
      text: 'Because rejection is the core activity of AI production, and you want to reject at the cheapest possible stage. A still keyframe is fast to generate and instant to judge: the logo is wrong or it isn’t, the face matches the reference or it doesn’t. A video clip takes minutes to render and minutes to review, and a flaw baked into its first frame is baked into every frame after it.',
    },
    {
      type: 'p',
      text: 'So we do all identity-critical work at the still stage. Product shots and creator identity images go into reference-aware image models, candidates come out, and only frames that pass QA graduate to animation. We generate 2–4 keyframe candidates per shot to keep one, a hit rate that would be painfully expensive at the video stage and costs almost nothing at the still stage. The same logic drives our model choices, compared in [our breakdown of AI video generators for ads](/blog/best-ai-video-generator-for-ads).',
    },
    {
      type: 'h2',
      id: 'scene-bible',
      text: 'What is a scene bible, and why do AI ads fall apart without one?',
    },
    {
      type: 'p',
      text: 'Generative models have no memory between shots. Ask for “a woman holding the drink in a cafe” six times and you get six cafes, six tables, and six lighting setups: six technically fine shots that never form one world. We call this failure mode “4 drinks on 4 different tables”, and it is the most common reason a multi-shot AI ad reads as fake even when every frame looks good.',
    },
    {
      type: 'p',
      text: 'The fix is boring and editorial rather than technical. Before generating anything, we write a scene bible that locks one location, one outfit, and a short list of look constants: palette, lens feel, lighting direction. Every keyframe prompt inherits those constants verbatim. This matters most for campaigns built around a recurring AI persona, where the character has to read as the same person across shots, ads, and weeks. That same discipline makes [virtual influencers](/virtual-influencers) work as an ongoing channel rather than a one-off stunt. If the concept is new to you, start with [what a virtual influencer is](/blog/what-is-a-virtual-influencer).',
    },
    {
      type: 'h2',
      id: 'identity-drift',
      text: 'How do you keep faces and products consistent through animation?',
    },
    {
      type: 'p',
      text: 'Image-to-video models drift. Over the course of a clip, faces slide away from the reference, logos smear, and product labels mutate into almost-text. This is the main failure mode of i2v animation, and it gets worse with clip length and camera movement. We don’t have a way to eliminate it; we have a way to keep it below the threshold a viewer notices.',
    },
    {
      type: 'ul',
      items: [
        'Keep clips short at 4–8 seconds. Drift compounds with duration, so we cut before it becomes visible.',
        'Re-anchor every shot on a fresh keyframe instead of extending one clip, so each shot starts from a clean, QA-passed identity.',
        'Keep the subject mid-frame on identity-critical shots; edge-of-frame faces and labels degrade fastest.',
        'Avoid fast camera moves when a logo or face must hold, and save the whip-pans for B-roll where nothing needs to stay readable.',
      ],
    },
    {
      type: 'callout',
      title: 'Field note: the label test',
      body: 'Our fastest drift check is product text. We zoom the final frame of every clip and read the label. If the brand name stays legible and correctly spelled at the end of the shot, faces and palette have almost always held too. When the label has melted, we cut the clip shorter or regenerate the shot from its keyframe, with no debate and no exceptions.',
    },
    {
      type: 'h2',
      id: 'vision-qa',
      text: 'How does machine-graded QA work?',
    },
    {
      type: 'p',
      text: 'Every keyframe and every clip is graded by a vision model against a fixed checklist before it can enter the edit: brand fidelity (is the product the actual product?), identity match (is this the same person as the reference?), continuity (does it obey the scene bible?), and artifacts (extra fingers, warped text, impossible geometry). Assets that fail are regenerated automatically; assets that pass move on.',
    },
    {
      type: 'p',
      text: 'Automating this does not remove human taste, since a human still signs off on the final cut. It buys volume. When a campaign needs 8 shots times 3 candidates times several hook variants, nobody eyeballs every frame, and the checklist catches the objective failures: wrong logo, wrong face, melted hands. Machine QA handles rejection; humans handle selection.',
    },
    {
      type: 'h2',
      id: 'which-models',
      text: 'Which video models do we actually run, and when?',
    },
    {
      type: 'p',
      text: 'We run several video models in production, because no single model wins every shot type. Google Veo 3 has the strongest physics and motion realism we have seen, plus native audio, so it takes the shots where believable movement carries the ad. Grok Imagine iterates fastest and cheapest, and its reference-aware image generation pairs naturally with the keyframe-first workflow, so it absorbs most exploration and candidate generation. Kling is strong on character motion and expressiveness: performances, gestures, reaction shots.',
    },
    {
      type: 'p',
      text: 'The operational reality matters as much as the quality ranking: provider rate limits and quotas interrupt large batches, so retries and queueing are part of the pipeline, not an edge case. Some providers restrict aspect ratios or watermark output on lower tiers, which can quietly disqualify them for a 9:16 paid placement. The full comparison lives in [best AI video generator for ads](/blog/best-ai-video-generator-for-ads).',
    },
    {
      type: 'h2',
      id: 'assembly',
      text: 'How do clips become a finished ad?',
    },
    {
      type: 'p',
      text: 'Assembly is where AI footage starts behaving like an ad instead of a demo reel. We edit on a beat grid: we analyze the music track for onsets and land cuts on them. A cut on the beat reads as intentional, and the same cut 200 milliseconds off reads as sloppy, which viewers feel even when they cannot name it. We burn hooks, captions, and price callouts directly into the render, because feed viewers watch with sound off more often than not.',
    },
    {
      type: 'p',
      text: 'Everything renders 9:16 vertical first. Vertical is the native shape of the placements that matter for short-form, and landscape has become the afterthought rather than the master.',
    },
    {
      type: 'h2',
      id: 'testing',
      text: 'Why does testing volume beat single-asset polish?',
    },
    {
      type: 'p',
      text: 'Because hooks fatigue in days on paid social. A winning opening three seconds stops winning fast, and no amount of polish on one asset changes that. The pipeline above is built for this: once the scene bible and keyframes exist, a new variant means swapping the hook shot and re-rendering the edit rather than re-shooting the campaign. That is also the economic argument for AI in this format. We broke down [what AI UGC ads cost](/blog/ai-ugc-ads-cost) and [how the economics compare to traditional production](/blog/ai-video-ads-vs-traditional) separately.',
    },
    {
      type: 'p',
      text: 'You mostly test the hook. We maintain a working library of [hook patterns for UGC ads](/blog/ugc-hook-patterns) and rotate them against the same body footage. In a typical batch, the spread between the best and worst hook on identical mid-rolls is wide enough that hook choice matters more than any single craft decision downstream.',
    },
    {
      type: 'h2',
      id: 'getting-started',
      text: 'What we’d do in your place',
    },
    {
      type: 'p',
      text: 'Starting from zero? Write the one-page brief and the scene bible before you touch any model, because those two documents are most of the difference between a campaign and a pile of clips. Plan 6–12 shots, generate stills first, stay ruthless at the keyframe gate, and budget 2–4 candidates per shot. Keep clips short, cut on the beat, and ship several hook variants instead of perfecting one.',
    },
    {
      type: 'p',
      text: 'If you would rather plug into a pipeline that already runs daily, with scene bible discipline, vision QA, multi-model rendering, and beat-grid assembly included, that is what we operate as a service. Start with [AI UGC ads](/ai-ugc-ads) for creator-style testimonial formats, or [AI video ads](/ai-video-ads) for the broader short-form production line. Either way, your ad travels through the pipeline on this page.',
    },
  ],
  scenes: [
    {
      anchor: 'pipeline-overview',
      label: 'Nine stages',
      visual: {
        kind: 'flow',
        loopLabel: 'regenerate',
        steps: [
          { label: 'Brief intake', note: 'Show, claim, ask — on one page' },
          { label: 'Scene bible', note: 'One location, one outfit, look constants' },
          { label: 'Shot plan', note: '6–12 shots of 4–8 seconds' },
          { label: 'Keyframe generation', note: 'Reference-aware, product + creator' },
          { label: 'Grading and vision QA', note: 'Fail here, never downstream', gate: true },
          { label: 'Image-to-video', note: 'Approved keyframes only' },
          { label: 'Beat-grid edit', note: 'Cuts on music onsets, overlays burned in' },
          { label: 'Export', note: '9:16 first, other ratios after' },
          { label: 'Creative testing', note: 'Winners feed the next brief' },
        ],
      },
      caption: 'The order is the point: each stage makes the next cheaper, and a shot rejected at stage 05 never burns render minutes at stage 06.',
    },
    {
      anchor: 'why-keyframes-first',
      label: 'Reject where it is cheap',
      visual: {
        kind: 'cull',
        total: 8,
        keep: 3,
        tile: 'frame',
        rejectNote: 'SECONDS AND CENTS TO DISCARD',
        keepNote: 'GRADUATES TO ANIMATION',
      },
      caption: 'Rejection is the core activity. A still is instant to judge; a clip takes minutes to render and minutes to review.',
    },
    {
      anchor: 'scene-bible',
      label: 'The scene bible',
      visual: {
        kind: 'stack',
        baseLabel: 'EVERY KEYFRAME PROMPT INHERITS THESE',
        lockedLabel: 'ONE WORLD',
        layers: [
          { label: 'Lighting direction', note: 'Same key, same time of day' },
          { label: 'Lens feel', note: 'One focal length family' },
          { label: 'Palette', note: 'A short, written list' },
          { label: 'Outfit', note: 'One, for the whole campaign' },
          { label: 'Location', note: 'One, not “a cafe”' },
        ],
      },
      caption: 'Models have no memory between shots. Without these locked, six prompts return six cafes — “4 drinks on 4 different tables”.',
    },
    {
      anchor: 'identity-drift',
      label: 'The label test',
      visual: {
        kind: 'drift',
        frames: 9,
        anchors: [5],
        glyph: 'label',
        driftNote: 'DRIFT COMPOUNDS WITH DURATION',
        anchorNote: 'CUT BEFORE IT IS VISIBLE',
      },
      caption: 'We zoom the final frame of every clip and read the label. If the brand name is still legible, faces and palette have almost always held too.',
    },
    {
      anchor: 'vision-qa',
      label: 'Machine rejects, humans select',
      visual: {
        kind: 'scatter',
        total: 24,
        winners: [2, 7, 9, 14, 18, 21, 22, 5],
        note: '8 SHOTS × 3 CANDIDATES',
      },
      caption: 'Nobody eyeballs every frame at this volume. The checklist catches the objective failures; a human still signs off on the final cut.',
    },
    {
      anchor: 'which-models',
      label: 'Routing a shot',
      visual: {
        kind: 'matrix',
        cols: ['Physics & motion', 'Iteration speed', 'Character performance', 'Native audio'],
        rows: [
          { label: 'Veo 3', cells: [3, 1, 2, 3] },
          { label: 'Grok Imagine', cells: [2, 3, 2, 0] },
          { label: 'Kling', cells: [2, 2, 3, 0] },
        ],
        legend: 'THE RING MARKS WHERE WE ROUTE THAT SHOT TYPE',
      },
      caption: 'No single model wins every shot type, which is why we run several and route per shot rather than picking a favourite.',
    },
    {
      anchor: 'assembly',
      label: 'Assembly',
      visual: {
        kind: 'flow',
        steps: [
          { label: 'Analyse the track for onsets', note: 'The grid comes from the music' },
          { label: 'Land every cut on a beat', note: '200 ms off reads as sloppy' },
          { label: 'Burn in hooks and captions', note: 'Feed viewers watch sound-off' },
          { label: 'Render 9:16 first', note: 'Landscape is the afterthought now' },
        ],
      },
      caption: 'A cut on the beat reads as intentional. Viewers feel the difference even when they cannot name it.',
    },
    {
      anchor: 'testing',
      label: 'Hook fatigue',
      visual: {
        kind: 'curve',
        points: [1, 0.94, 0.78, 0.55, 0.36, 0.24, 0.18],
        baseline: [0.88, 0.87, 0.86, 0.85, 0.84, 0.82, 0.81],
        xLabels: ['LAUNCH', 'DAYS LATER'],
        yLabel: 'RELATIVE PERFORMANCE',
        seriesLabel: 'HOOK',
        baselineLabel: 'AD BODY',
        markers: [{ at: 3, label: 'swap the hook shot' }],
      },
      caption:
        'Schematic, not measured data — the shape of the problem. The opening decays in days; the proof and the offer do not stop being true.',
    },
    {
      anchor: 'getting-started',
      label: 'What one ad costs you',
      visual: {
        kind: 'bars',
        unit: 'TYPICAL 30–40 SECOND AD',
        note: 'BUDGET THE REJECTS UP FRONT',
        series: [
          { label: 'Keyframes generated', value: 27, display: '27', tone: 'muted', note: '2–4 candidates per shot' },
          { label: 'Shots in the cut', value: 9, display: '9', tone: 'accent', note: '6–12 shots of 4–8 seconds' },
          { label: 'Hook variants shipped', value: 5, display: '5', tone: 'ink', note: 'One ad set, spend decides' },
        ],
      },
      caption: 'Write the brief and the scene bible before you touch a model. Those two documents are most of the difference between a campaign and a pile of clips.',
    },
  ],
  faq: [
    {
      question: 'What is an AI ad production pipeline?',
      answer:
        'An AI ad production pipeline is the staged workflow that turns a brand brief into a finished short-form ad: scene bible, reference-aware keyframe generation, automated QA, image-to-video animation, beat-synced editing, overlays, and export. Each stage acts as a rejection gate so expensive steps like video rendering only run on approved material.',
    },
    {
      question: 'How many shots does a 30–40 second AI ad need?',
      answer:
        'Typically 6–12 shots of 4–8 seconds each. Short clips are deliberate: image-to-video models drift away from reference faces and product labels as clips get longer, so a 30–40 second ad is assembled from many short, re-anchored shots rather than a few long ones.',
    },
    {
      question: 'Why do AI-generated faces and logos drift during a video?',
      answer:
        'Image-to-video models generate each clip from a starting frame plus motion, and they lose fidelity to the reference as the clip progresses: faces shift, logos smear, label text mutates. Working mitigations include clips of 4–8 seconds, a fresh keyframe anchor per shot, mid-frame subjects, and slow camera moves on identity-critical shots.',
    },
    {
      question: 'Which AI video models are used in production ad pipelines?',
      answer:
        'Our studio runs Google Veo 3, Grok Imagine, and Kling in production. Veo 3 leads on physics, motion realism, and native audio; Grok Imagine is the fastest and cheapest for iteration and pairs well with keyframe-first workflows; Kling is strongest on character motion and expressive performances. No single model wins every shot type.',
    },
    {
      question: 'What is a scene bible in AI video production?',
      answer:
        'A scene bible is a short document that locks one location, one outfit, and a list of look constants such as palette, lens feel, and lighting for an entire campaign. Because generative models have no memory between shots, the scene bible makes separately generated shots read as one coherent world instead of disconnected images.',
    },
  ],
};

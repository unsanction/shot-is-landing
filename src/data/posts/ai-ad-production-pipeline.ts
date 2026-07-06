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
    'Nine stages sit between a brand brief and a published ad. Here’s the full map of how our studio actually runs them — failure modes included.',
  datePublished: '2026-06-10',
  dateModified: '2026-06-10',
  author: founderAuthor,
  ogImageKey: 'blog-ai-ad-production-pipeline',
  tags: ['AI ad production', 'pipeline', 'AI video ads', 'workflow'],
  tldr: [
    'A production AI ad pipeline runs in nine stages: brief, scene bible, reference-aware keyframes, grading and QA, image-to-video animation, beat-grid editing, overlays, export, and creative testing.',
    'Keyframe-first workflows generate and grade still images before animating, because rejecting a bad still costs seconds while rejecting a bad video costs minutes of render time and real money.',
    'A 30–40 second AI ad is typically 6–12 shots of 4–8 seconds each, and in practice you generate 2–4 candidates per shot to keep one.',
    'A scene bible — one locked location, one outfit, and a short list of look constants — is what makes separately generated shots read as one coherent world.',
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
      text: 'Every ad we ship passes through the same nine stages. The order matters: each stage exists to make the next one cheaper, and the expensive operations — video rendering, human review — sit as late as possible.',
    },
    {
      type: 'ol',
      items: [
        'Brief intake — distill the brand’s product, audience, and offer into a one-page creative brief: what the ad must show, claim, and ask.',
        'Scene bible — lock one location, one outfit, and a short list of look constants (palette, lens feel, lighting) for the whole campaign.',
        'Shot plan — break the ad into 6–12 shots of 4–8 seconds each for a 30–40 second runtime, each shot with a purpose: hook, demo, proof, close.',
        'Keyframe generation — generate still keyframes with reference-aware image models, feeding real product shots and creator identity images as references.',
        'Grading and vision QA — machine-grade every keyframe against a checklist (brand fidelity, identity match, continuity, artifacts); regenerate the ones that fail.',
        'Image-to-video animation — animate only the approved keyframes; a 6-second clip renders in roughly 1–5 minutes depending on model and load.',
        'Beat-grid edit — assemble clips on a beat grid so cuts land on music onsets, then add burned-in text and box overlays.',
        'Export — render 9:16 vertical first, then any other aspect ratios the placements need.',
        'Creative testing — ship multiple variants, read performance, and feed the winners’ patterns back into the next brief.',
      ],
    },
    {
      type: 'p',
      text: 'Nothing in that list is exotic on its own. The leverage comes from running it as one connected system, where a shot rejected at stage 5 never burns render minutes at stage 6.',
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
      text: 'So we do all identity-critical work at the still stage. Product shots and creator identity images go into reference-aware image models, candidates come out, and only frames that pass QA graduate to animation. In practice we generate 2–4 keyframe candidates per shot to keep one — a hit rate that would be painfully expensive at the video stage and is nearly free at the still stage. The same logic drives our model choices, which we compare in detail in [our breakdown of AI video generators for ads](/blog/best-ai-video-generator-for-ads).',
    },
    {
      type: 'h2',
      id: 'scene-bible',
      text: 'What is a scene bible, and why do AI ads fall apart without one?',
    },
    {
      type: 'p',
      text: 'Generative models have no memory between shots. Ask for “a woman holding the drink in a cafe” six times and you get six cafes, six tables, six lighting setups — six technically fine shots that don’t form one world. We call the failure mode “4 drinks on 4 different tables”, and it’s the single most common reason a multi-shot AI ad reads as fake even when every individual frame looks good.',
    },
    {
      type: 'p',
      text: 'The fix is boring and editorial, not technical: before generating anything, we write a scene bible that locks one location, one outfit, and a short list of look constants — palette, lens feel, lighting direction. Every keyframe prompt inherits those constants verbatim. This matters most for campaigns built around a recurring AI persona, where the character has to be recognizably the same person across shots, ads, and weeks — the same discipline that makes [virtual influencers](/virtual-influencers) work as an ongoing channel rather than a one-off stunt. If that concept is new, start with [what a virtual influencer actually is](/blog/what-is-a-virtual-influencer).',
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
        'Keep clips short — 4–8 seconds. Drift compounds with duration, so we cut before it becomes visible.',
        'Re-anchor every shot on a fresh keyframe instead of extending one clip, so each shot starts from a clean, QA-passed identity.',
        'Keep the subject mid-frame on identity-critical shots; edge-of-frame faces and labels degrade fastest.',
        'Avoid fast camera moves when a logo or face must hold — save the whip-pans for B-roll where nothing needs to stay readable.',
      ],
    },
    {
      type: 'callout',
      title: 'Field note: the label test',
      body: 'In our pipeline the fastest drift check is product text. We zoom the final frame of every clip and read the label: if the brand name is still legible and correctly spelled at the end of the shot, faces and palette have almost always held too. When the label has melted, the clip gets cut shorter or the shot gets regenerated from its keyframe — no debate, no exceptions.',
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
      text: 'The point of automating this isn’t to remove human taste — a human still signs off on the final cut. The point is volume. When a campaign needs 8 shots times 3 candidates times several hook variants, nobody is eyeballing every frame, and the checklist catches the failures that are objective: wrong logo, wrong face, melted hands. Machine QA does the rejection; humans do the selection.',
    },
    {
      type: 'h2',
      id: 'which-models',
      text: 'Which video models do we actually run, and when?',
    },
    {
      type: 'p',
      text: 'We run several video models in production, because no single model wins every shot type. Google Veo 3 has the strongest physics and motion realism we’ve seen, plus native audio — it gets the shots where believable movement carries the ad. Grok Imagine is the fastest and cheapest to iterate, and its reference-aware image generation pairs naturally with the keyframe-first workflow, so it absorbs the bulk of exploration and candidate generation. Kling is strong on character motion and expressiveness — performances, gestures, reaction shots.',
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
      text: 'Assembly is where AI footage starts behaving like an ad instead of a demo reel. We edit on a beat grid: the music track is analyzed for onsets, and cuts land on them. A cut that lands on a beat reads as intentional; the same cut 200 milliseconds off reads as sloppy, and viewers feel it even if they can’t name it. On top of the cut we burn in text and box overlays — hooks, captions, price callouts — directly into the render, because feed viewers watch with sound off more often than not.',
    },
    {
      type: 'p',
      text: 'Everything renders 9:16 vertical first. Vertical is the native shape of the placements that matter for short-form — landscape is the afterthought now, not the master.',
    },
    {
      type: 'h2',
      id: 'testing',
      text: 'Why does testing volume beat single-asset polish?',
    },
    {
      type: 'p',
      text: 'Because hooks fatigue in days on paid social. A winning opening three seconds stops winning fast, and no amount of polish on one asset changes that. The pipeline above is built for exactly this: once the scene bible and keyframes exist, producing a new variant means swapping the hook shot and re-rendering the edit — not re-shooting the campaign. That’s also the economic argument for AI in this format; we’ve broken down [what AI UGC ads actually cost](/blog/ai-ugc-ads-cost) and [how the economics compare to traditional production](/blog/ai-video-ads-vs-traditional) separately.',
    },
    {
      type: 'p',
      text: 'What you test is mostly the hook. We maintain a working library of [hook patterns for UGC ads](/blog/ugc-hook-patterns) and rotate them against the same body footage — in a typical batch, the spread between the best and worst hook on identical mid-rolls is large enough that hook choice matters more than any single craft decision downstream.',
    },
    {
      type: 'h2',
      id: 'getting-started',
      text: 'What we’d do in your place',
    },
    {
      type: 'p',
      text: 'If you’re starting from zero: write the one-page brief and the scene bible before touching any model — those two documents are most of the difference between a campaign and a pile of clips. Plan 6–12 shots, generate stills first, be ruthless at the keyframe gate, and budget 2–4 candidates per shot. Keep clips short, cut on the beat, and ship several hook variants instead of perfecting one.',
    },
    {
      type: 'p',
      text: 'If you’d rather plug into a pipeline that already runs daily — scene bible discipline, vision QA, multi-model rendering, beat-grid assembly included — that’s what we operate as a service. Start with [AI UGC ads](/ai-ugc-ads) for creator-style testimonial formats, or [AI video ads](/ai-video-ads) for the broader short-form production line. Either way, the pipeline on this page is the one your ad will travel through.',
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
        'Image-to-video models generate each clip from a starting frame plus motion, and they gradually lose fidelity to the reference as the clip progresses — faces shift, logos smear, label text mutates. Working mitigations are clips of 4–8 seconds, a fresh keyframe anchor per shot, mid-frame subjects, and slow camera moves on identity-critical shots.',
    },
    {
      question: 'Which AI video models are used in production ad pipelines?',
      answer:
        'Our studio runs Google Veo 3, Grok Imagine, and Kling in production. Veo 3 leads on physics, motion realism, and native audio; Grok Imagine is the fastest and cheapest for iteration and pairs well with keyframe-first workflows; Kling is strongest on character motion and expressive performances. No single model wins every shot type.',
    },
    {
      question: 'What is a scene bible in AI video production?',
      answer:
        'A scene bible is a short document that locks one location, one outfit, and a list of look constants — palette, lens feel, lighting — for an entire campaign. Because generative models have no memory between shots, the scene bible is what makes separately generated shots read as one coherent world instead of disconnected images.',
    },
  ],
};

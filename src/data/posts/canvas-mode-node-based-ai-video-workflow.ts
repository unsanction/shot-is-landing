import { founderAuthor, type BlogPost } from '../blogTypes';

export const post: BlogPost = {
  slug: 'canvas-mode-node-based-ai-video-workflow',
  lang: 'en',
  translationKey: 'canvas-mode-node-based-ai-video-workflow',
  title: 'Canvas Mode: A Node-Based Workflow for AI Video Ads',
  metaTitle: 'Canvas Mode: Node-Based AI Video Workflow | SHOT.IS',
  description:
    'Canvas mode turns AI ad production into a node graph: references, prompts, models, and a composer in one pipeline that regenerates only what changed.',
  excerpt:
    'Linear wizards force you to restart when one shot is wrong. Canvas mode lays the whole production out as a node graph, so you re-run one node instead of the whole ad.',
  datePublished: '2026-07-08',
  dateModified: '2026-07-08',
  author: founderAuthor,
  ogImageKey: 'blog-canvas-mode',
  tags: ['canvas mode', 'node-based workflow', 'AI video pipeline', 'node graph', 'AI ad production'],
  readingMinutes: 9,
  tldr: [
    'Canvas mode is a node-based editor for AI video production: media imports, prompts, image models, video models, and a final composer are nodes on a canvas, wired together with typed connections.',
    'Every node caches its output and knows when it is stale. Change one prompt and only the shots downstream of it regenerate, while every unchanged branch keeps its result.',
    'Graphs execute server-side: press run, close the laptop, and the pipeline keeps generating; runs survive restarts and resume where they left off.',
    'Each generation node picks its own model, so cheap fast models handle B-roll while premium models handle hero shots, with the credit cost visible on the picker before you commit.',
    'Branching replaces re-doing: one approved keyframe can feed three video variants side by side, which is how A/B testing hooks stops being three separate projects.',
  ],
  blocks: [
    {
      type: 'p',
      text: 'Canvas mode is the node-based way to build an AI video ad. Instead of stepping through a linear wizard, you lay the whole production out on a canvas as nodes connected by wires: reference images, prompts, image generations, video generations, and the final edit. Each node does one job, takes typed inputs from the nodes before it, and hands its output to the nodes after it. The graph is the pipeline, visible all at once, and you can re-run any part without touching the rest. If you have used node editors in Blender, Houdini, or ComfyUI, the mental model transfers directly, and canvas mode applies it to the full ad production chain rather than a single image.',
    },
    {
      type: 'h2',
      id: 'what-is-canvas-mode',
      text: 'What is canvas mode, exactly?',
    },
    {
      type: 'p',
      text: 'Canvas mode is a graph editor built into the SHOT.IS studio, where each node is one production step and each edge carries a typed artifact from one step to the next, whether an image, a video clip, or a piece of text. A minimal ad graph reads left to right: an import node holds your product photo, a prompt node describes the shot, a generate-image node produces the keyframe, a generate-video node animates it, and a composer node cuts the resulting clips into the finished vertical ad.',
    },
    {
      type: 'p',
      text: 'The ports are typed, so the canvas refuses connections that make no sense. You cannot wire a video into a slot expecting an image, and you cannot create a cycle. That sounds small, and it means a graph that connects is a graph that runs, while a colleague or a vision model reads the whole production plan at a glance instead of reconstructing it from a history of wizard screens.',
    },
    {
      type: 'p',
      text: 'Under every node sits its latest output: the generated still, a playable preview of the clip, the prompt text ready to copy. The canvas is simultaneously the plan, the control panel, and the review board.',
    },
    {
      type: 'h2',
      id: 'why-node-graph',
      text: 'Why a node graph instead of a linear wizard?',
    },
    {
      type: 'p',
      text: 'A node graph beats a linear flow for one structural reason: AI video production runs iterative and branchy rather than linear. You regenerate shot three five times while shots one, two, and four sit approved, and you want two hook variants sharing the same body. A wizard models none of that, and a graph models all of it natively.',
    },
    {
      type: 'table',
      caption: 'Linear wizard vs. canvas mode for multi-shot AI ad production',
      headers: ['Situation', 'Linear wizard', 'Canvas mode'],
      rows: [
        [
          'One shot out of six is wrong',
          'Step back through the flow, often regenerating steps that were fine',
          'Re-run that one node; approved branches keep their cached outputs',
        ],
        [
          'Change the shared product photo',
          'Manually find every place it was used',
          'Every downstream node is flagged stale automatically; one click re-runs them in order',
        ],
        [
          'A/B test two hooks',
          'Duplicate the whole project',
          'Branch the graph so two hook nodes feed into the same body and composer',
        ],
        [
          'See the whole production at once',
          'Impossible; the state lives across wizard steps',
          'The graph is the production, on one screen',
        ],
        [
          'Mix models per shot',
          'Usually one model for the whole run',
          'Each generation node picks its own model, with credit cost shown up front',
        ],
      ],
    },
    {
      type: 'p',
      text: 'None of this changes what gets generated, since the shots still come from the same [keyframe-to-video workflow](/blog/keyframe-to-video-workflow) we run everywhere. It changes the cost of iteration, because the graph makes “redo exactly this part” a first-class operation instead of a workaround.',
    },
    {
      type: 'h2',
      id: 'node-types',
      text: 'What’s on the canvas: the node types',
    },
    {
      type: 'p',
      text: 'Canvas mode ships with a small set of node types that cover the whole production chain from raw references to a rendered ad:',
    },
    {
      type: 'ul',
      items: [
        'Import: brings media onto the canvas, either uploaded from your computer or browsed from your library. Product photos, creator references, and music land here.',
        'Prompt: a plain text node for shot descriptions and look constants you reuse across branches.',
        'Video Prompter: an LLM node that takes your ordered reference images plus a one-line intent and writes the motion prompt, with timecoded beats and explicit references to each image. It turns “energetic product reveal” into a shot-ready prompt that cites @Image1 and @Image2 at the right moments.',
        'Generate image: produces the keyframe from prompts and reference images, using whichever image model you pick on the node.',
        'Generate video: animates a keyframe, or generates from text, with your chosen video model. Duration, aspect ratio, resolution, and quality knobs adapt to what that model supports.',
        'Composer: the endpoint. It takes an ordered list of video clips, optional music, and per-clip in/out trims, then renders the final ad at your chosen resolution and orientation in portrait, landscape, or square, up to 4K.',
      ],
    },
    {
      type: 'callout',
      title: 'Field note: the prompter node earns its place',
      body: 'We expected Video Prompter to be a gimmick, and it became the node we use on almost every graph. Motion prompts are the highest-skill part of image-to-video work: what moves, what stays locked, when the cut lands. Having an LLM draft that prompt from the actual reference images rather than a generic template, with beats timed to the clip, gets a first version that is right about 80% of the time. Because it is a node, regenerating the prompt disturbs nothing else on the canvas.',
    },
    {
      type: 'h2',
      id: 'stale-propagation',
      text: 'How does canvas mode avoid paying for the same shot twice?',
    },
    {
      type: 'p',
      text: 'Every node caches its output together with a fingerprint of everything that produced it: its inputs, its parameters, its upstream results. When anything in that fingerprint changes, the node and everything downstream flags stale, with dashed connections showing which parts of the graph no longer reflect their inputs. Nothing regenerates until you say so, and when you do, only the stale part runs.',
    },
    {
      type: 'p',
      text: 'This matters because generation is the expensive step. In a six-shot ad where you tweak one shot’s prompt, a linear tool tempts you into regenerating far more than one shot, and video generations cost real money and real minutes each. On the canvas, five approved shots keep their cached results and the sixth re-runs. Swap the product photo that feeds all six and the graph tells you honestly that everything downstream is stale. Then “run stale” executes the affected region in the correct order, skipping any branch whose upstream failed and touching nothing already fresh.',
    },
    {
      type: 'p',
      text: 'The same logic runs upstream. Hit run on the final composer and the canvas executes any stale ancestors it depends on first, in dependency order. You never have to remember the right sequence, because the graph is the sequence.',
    },
    {
      type: 'h2',
      id: 'server-side-execution',
      text: 'What does server-side execution change?',
    },
    {
      type: 'p',
      text: 'Graphs execute on the server rather than in your browser tab. When you run a node or a whole stale region, the studio backend takes over: it routes each generation through the same provider, credit, and idempotency path as every other generation on the platform, supervises the jobs, and writes results back to the graph. Your browser becomes a viewport with live status, where running nodes pulse, finished nodes show their output, and the canvas refreshes while work is in flight.',
    },
    {
      type: 'p',
      text: 'You can queue a full ad covering keyframes, videos, and final composition, then close the laptop. Runs are durable too: if the service restarts mid-generation, stranded nodes get picked back up or failed honestly on startup instead of spinning forever. If you have babysat a browser tab through a 40-minute batch of video generations, this is the difference between a tool and a pipeline.',
    },
    {
      type: 'h2',
      id: 'model-per-node',
      text: 'How does per-node model choice work?',
    },
    {
      type: 'p',
      text: 'Each generation node carries its own model picker: image models on image nodes, video models on video nodes, LLMs on the prompter, music on the composer. The pickers group by provider, filter as you type, and show the credit cost of each option before you run anything. Pick a model and the node’s knobs adapt, because duration, aspect ratio, resolution, and quality options come from that model’s capability profile, so the canvas never offers a setting the model cannot honor.',
    },
    {
      type: 'p',
      text: 'This makes shot-level model routing practical. One model for everything is almost never the right answer in production. You want a premium model with strong physics for the hero shot and cheaper, faster models for B-roll and iteration, a strategy we break down in our [comparison of AI video generators for ads](/blog/best-ai-video-generator-for-ads). In a linear tool, mixing models per shot creates friction. On the canvas, it is whatever each node is set to.',
    },
    {
      type: 'h2',
      id: 'branching-and-reuse',
      text: 'Branching: the end of “duplicate project to test a variant”',
    },
    {
      type: 'p',
      text: 'Because nodes are addressable and outputs are reusable, variants stop being copies of the whole production. One approved keyframe feeds three generate-video nodes with three different motion prompts, compared side by side on one screen. Two hook variants share the entire body of the ad and diverge only at the first clip feeding the composer. The 80/20 of creative testing, meaning same body with a different hook as we cover in [UGC hook patterns](/blog/ugc-hook-patterns), maps onto the graph as a literal branch.',
    },
    {
      type: 'p',
      text: 'The composer node closes the loop: ordered clips in, finished ad out, with per-clip trims so you tighten each shot’s in and out points without leaving the canvas or re-rendering the clips. You get a rendered file at the aspect and resolution you asked for, whether a vertical 1080p cut for feeds or a landscape 4K master.',
    },
    {
      type: 'h2',
      id: 'getting-started',
      text: 'Where canvas mode fits, and where to start',
    },
    {
      type: 'p',
      text: 'Canvas mode does not replace the disciplined process of reference-anchored keyframes, a QA gate before animation, short clips, and fresh anchoring per shot, all laid out in our [AI ad production pipeline](/blog/ai-ad-production-pipeline). It gives that process a spatial, re-runnable form, so the pipeline you held in your head or a spreadsheet becomes a picture that executes.',
    },
    {
      type: 'p',
      text: 'To try the shape of it, start smaller than a full ad: one import node with your best product photo, one prompt, one image generation, one video generation. Get a clip you would approve. Then branch a second motion prompt off the same keyframe and notice that the comparison cost you one node instead of one project. That is the habit canvas mode builds: iterate at the node level and pay only for what changed. If you would rather have the whole graph of references, models, QA, and the final cut built and run for you, that is what [AI video ads at SHOT.IS](/ai-video-ads) are.',
    },
  ],
  faq: [
    {
      question: 'What is canvas mode in SHOT.IS?',
      answer:
        'Canvas mode is a node-based editor for AI video production. Every production step becomes a node on a canvas connected by typed wires: importing references, writing prompts, generating keyframes, generating video clips, and composing the final ad. You run the graph end to end or one node at a time, and only stale nodes regenerate.',
    },
    {
      question: 'How is a node-based AI video workflow better than a linear one?',
      answer:
        'AI ad production runs iterative and branchy: you regenerate one shot many times while others sit approved, and variants share most of their structure. A node graph models this natively. Re-run one node while cached neighbors keep their outputs, branch a keyframe into several video variants, and see the whole production on one screen instead of across wizard steps.',
    },
    {
      question: 'Does canvas mode regenerate everything when I change one input?',
      answer:
        'No. Every node caches its output with a fingerprint of its inputs and parameters. Changing something marks only the affected downstream nodes as stale, shown with dashed connections, and a single “run stale” executes that region in dependency order. Unchanged branches never regenerate and never cost credits again.',
    },
    {
      question: 'Do canvas graphs keep running if I close my browser?',
      answer:
        'Yes. Graph execution happens server-side: generations are supervised by the studio backend through the same provider-routing and credit path as the rest of the platform. You can queue a full ad and close the laptop; runs survive restarts and resume or fail honestly instead of hanging.',
    },
    {
      question: 'Can I use different AI models for different shots in one ad?',
      answer:
        'Yes, and that is one of the main points of canvas mode. Every generation node has its own model picker, grouped by provider with credit costs shown up front, and its settings for duration, aspect, resolution, and quality adapt to the chosen model. Typical routing puts a premium video model on the hero shot and faster, cheaper models on B-roll and iteration.',
    },
    {
      question: 'What does the composer node do?',
      answer:
        'The composer is the graph’s endpoint. It takes an ordered list of generated clips, optional music, and per-clip in/out trims, then renders the finished ad at your chosen orientation and resolution, from portrait, landscape, or square at 720p up to 4K, without you leaving the canvas.',
    },
  ],
};

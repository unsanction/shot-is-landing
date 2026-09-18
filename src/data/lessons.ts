import { siteBaseUrl } from './seo';
import type { Alternate } from './blog';
import type { Lesson, LessonLang } from './lessonTypes';

export * from './lessonTypes';

export const learnBasePath: Record<LessonLang, string> = { en: '/learn', es: '/es/learn' };

export const learnStrings: Record<LessonLang, {
  hubTitle: string;
  hubLede: string;
  learningTime: (label: string) => string;
  watchTime: (label: string) => string;
  pathTotal: (label: string) => string;
  whatYouLearn: string;
  inThisLesson: string;
  transcript: string;
  transcriptNote: string;
  prerequisites: string;
  nodesUsed: string;
  faqTitle: string;
  nextLesson: string;
  backToHub: string;
  switchLabel: string;
  basicsLabel: string;
  microCaseLabel: string;
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  recordingLabel: string;
  noVideoNote: string;
  blogBridge: string;
  blogBridgeCta: string;
}> = {
  en: {
    hubTitle: 'Learn SHOT.IS Studio',
    hubLede:
      'Short screencasts of the real canvas — no slides, no talking head. Each lesson rebuilds one thing end to end, and tells you up front how long it takes to learn.',
    learningTime: (label) => `${label} to learn`,
    watchTime: (label) => `${label} to watch`,
    pathTotal: (label) => `${label} for the whole path`,
    whatYouLearn: 'What you can do after this',
    inThisLesson: 'In this lesson',
    transcript: 'Transcript',
    transcriptNote: 'The same lines are burned into the video as subtitles.',
    prerequisites: 'Before you start',
    nodesUsed: 'Nodes used',
    faqTitle: 'Frequently asked questions',
    nextLesson: 'Next lesson',
    backToHub: 'All lessons',
    switchLabel: 'Ver en español',
    basicsLabel: 'Basics',
    microCaseLabel: 'Micro-case',
    ctaTitle: 'Open the canvas and follow along',
    ctaBody: 'Every lesson is recorded in the same Studio you get when you sign in. Start a run and rebuild it as you watch.',
    ctaButton: 'Open SHOT.IS Studio',
    recordingLabel: 'Recording',
    noVideoNote: 'Screencast is being recorded — the written steps below are complete.',
    blogBridge: 'Looking for the longer written version — strategy, costs, and what actually performs?',
    blogBridgeCta: 'Read the blog',
  },
  es: {
    hubTitle: 'Aprende SHOT.IS Studio',
    hubLede:
      'Screencasts cortos del lienzo real: sin diapositivas, sin presentador. Cada lección reconstruye una cosa de principio a fin y dice de antemano cuánto tarda en aprenderse.',
    learningTime: (label) => `${label} para aprender`,
    watchTime: (label) => `${label} de video`,
    pathTotal: (label) => `${label} para la ruta completa`,
    whatYouLearn: 'Qué podrás hacer después',
    inThisLesson: 'En esta lección',
    transcript: 'Transcripción',
    transcriptNote: 'Las mismas líneas van incrustadas en el video como subtítulos.',
    prerequisites: 'Antes de empezar',
    nodesUsed: 'Nodos utilizados',
    faqTitle: 'Preguntas frecuentes',
    nextLesson: 'Siguiente lección',
    backToHub: 'Todas las lecciones',
    switchLabel: 'View in English',
    basicsLabel: 'Fundamentos',
    microCaseLabel: 'Micro-caso',
    ctaTitle: 'Abre el lienzo y sigue el paso a paso',
    ctaBody: 'Cada lección está grabada en el mismo Studio al que entras al iniciar sesión. Crea un run y reconstrúyelo mientras miras.',
    ctaButton: 'Abrir SHOT.IS Studio',
    recordingLabel: 'Grabando',
    noVideoNote: 'El screencast se está grabando — los pasos escritos de abajo están completos.',
    blogBridge: '¿Buscas la versión escrita más larga: estrategia, costes y lo que de verdad funciona?',
    blogBridgeCta: 'Leer el blog',
  },
};

/*
 * The five launch lessons. Lesson order is the learning path: the three
 * `basics` lessons build the canvas vocabulary, then the two `micro-case`
 * lessons spend it on a recognizable ad format.
 *
 * Every node name below is a real type from GET /api/graph/catalog. If the
 * catalog changes, these lessons are wrong and the screencast has to be re-cut.
 */
export const lessons: Lesson[] = [
  {
    slug: 'first-ai-video',
    lang: 'en',
    translationKey: 'first-ai-video',
    order: 1,
    kind: 'basics',
    title: 'Your first AI video',
    metaTitle: 'Your First AI Video in SHOT.IS Studio | 3 min lesson',
    description:
      'Build a working AI video in SHOT.IS Studio from four nodes: a prompt, a keyframe, a motion generation, and a download. A 72-second screencast of the real canvas.',
    excerpt:
      'Four nodes, one finished clip. The minimum path through the canvas, with nothing skipped and nothing faked.',
    outcome: 'Generate a finished AI video clip from scratch without anyone setting the run up for you.',
    nodes: ['prompt', 'generate_image', 'generate_video'],
    datePublished: '2026-09-18',
    ogImageKey: 'lesson-first-ai-video',
    tags: ['getting started', 'canvas', 'keyframe'],
    videoSeconds: 72,
    practiceMinutes: 2,
    video: {
      src: '/media/lessons/first-ai-video.mp4',
      poster: '/media/lessons/first-ai-video.jpg',
      width: 1440,
      height: 900,
    },
    videoPending: true,
    steps: [
      {
        at: 0,
        title: 'Start an empty run',
        body: 'Every ad in SHOT.IS lives on a canvas as a graph of nodes. A new run gives you a blank one — there is no template to fight with.',
      },
      {
        at: 9,
        title: 'Write the direction as a prompt node',
        body: 'The prompt node holds plain-English direction: scene, light, camera. It is an input, which means it never regenerates and never costs credits.',
      },
      {
        at: 19,
        title: 'Turn the direction into a keyframe',
        body: 'A generate image node makes the still that the shot is built from. Pick the model and the credit cost appears before you commit to it.',
      },
      {
        at: 44,
        title: 'Put the keyframe in motion',
        body: 'The generate video node takes a keyframe as its required input. Duration is the knob that matters most — four seconds is enough to judge a direction.',
      },
      {
        at: 59,
        title: 'Play, download, or keep building',
        body: 'A green node holds a real file. Download it as-is, or leave it on the canvas and wire it into an ad in the later lessons.',
      },
    ],
    captions: [
      { at: 0, text: 'This is the SHOT.IS canvas. Every ad you make lives here as a graph.' },
      { at: 4, text: 'Start with New run — an empty canvas, no template.' },
      { at: 9, text: 'Add a prompt node. This is your direction, in plain English.' },
      { at: 14, text: '"Energy drink can on wet concrete, neon rim light, slow orbit."' },
      { at: 19, text: 'Now a generate image node. This makes your keyframe.' },
      { at: 24, text: 'Pick a model. The credit cost shows before you commit.' },
      { at: 29, text: 'Wire the prompt into the image node and hit Run.' },
      { at: 34, text: 'Amber while it runs, green when it lands.' },
      { at: 39, text: "That's your keyframe — the frame the whole shot is built on." },
      { at: 44, text: 'Add a generate video node and wire the keyframe in.' },
      { at: 49, text: 'Set the duration. Four seconds is enough for a first test.' },
      { at: 54, text: 'Run it. Motion is the slow step, and the expensive one.' },
      { at: 59, text: 'Green. Click the node to play the result full size.' },
      { at: 64, text: 'Download it, or keep it and build the ad around it.' },
      { at: 69, text: 'One video, four nodes. Everything else is a variation on this.' },
    ],
    faq: [
      {
        question: 'Do I need a keyframe to generate video in SHOT.IS Studio?',
        answer:
          'Yes. The generate video node takes a keyframe as a required input, which is why the first lesson generates an image before it generates motion. Working keyframe-first is also cheaper: a still costs a fraction of a video, so you judge composition at the cheap step.',
      },
      {
        question: 'How much does the first video cost?',
        answer:
          'It depends on the model and duration you pick, and Studio shows the credit cost on the node before the run starts. The launch offer covers a single self-serve video at $4.99.',
      },
    ],
  },
  {
    slug: 'lock-your-product',
    lang: 'en',
    translationKey: 'lock-your-product',
    order: 2,
    kind: 'basics',
    title: 'Lock your product with references',
    metaTitle: 'Lock Your Real Product in AI Ads with References | 4.5 min lesson',
    description:
      'A prompt gives you a generic product. A reference node gives you yours. Learn reference roles in SHOT.IS Studio so the label, shape, and colour survive into the finished video.',
    excerpt:
      'The difference between an AI ad for a can and an AI ad for your can is one node and one role.',
    outcome: 'Keep your actual product and creator recognizable across every shot in a run.',
    nodes: ['reference', 'generate_image', 'generate_video'],
    datePublished: '2026-09-18',
    ogImageKey: 'lesson-lock-your-product',
    tags: ['references', 'product', 'brand consistency'],
    videoSeconds: 95,
    practiceMinutes: 3,
    video: {
      src: '/media/lessons/lock-your-product.mp4',
      poster: '/media/lessons/lock-your-product.jpg',
      width: 1440,
      height: 900,
    },
    videoPending: true,
    prerequisites: ['Finish "Your first AI video" — this lesson edits that same graph.'],
    steps: [
      {
        at: 0,
        title: 'Add the product to your library once',
        body: 'A product is a workspace entity with a packshot, not a file you re-upload per run. Add it once and every future run can reach for it.',
      },
      {
        at: 10,
        title: 'Drop a reference node on the canvas',
        body: 'The reference node resolves a library entity into reference images. Picking your product fills its images output with the packshot, tagged with the role "product".',
      },
      {
        at: 20,
        title: 'Understand what a role does',
        body: 'Roles tell the model what a reference is for. identity is a face that must repeat, product is an object that must stay identical, scene is a location, style is an outfit or look.',
      },
      {
        at: 30,
        title: 'Wire references into the keyframe',
        body: 'The references port on generate image accepts several inputs and keeps their order, which is the order referenceRoles is read in.',
      },
      {
        at: 40,
        title: 'Let the prompt describe the scene, not the product',
        body: 'Once the packshot is carrying the product, the prompt should stop describing it. Spend the words on light, surface, and camera instead.',
      },
      {
        at: 75,
        title: 'Check that the lock survives motion',
        body: 'Wire the keyframe into generate video as before. Because the identity is settled in the still, the motion step has far less room to invent.',
      },
    ],
    captions: [
      { at: 0, text: 'A prompt alone gives you a generic can. This pins your real one.' },
      { at: 5, text: 'Open the library and add your product once — name, packshot, done.' },
      { at: 10, text: 'Back on the canvas, add a reference node.' },
      { at: 15, text: "Pick the product. It resolves the packshot with role 'product'." },
      { at: 20, text: 'Roles matter. product means: this must stay identical.' },
      { at: 25, text: 'identity, scene, style and product are separate roles.' },
      { at: 30, text: "Wire the reference node's images output into generate image." },
      { at: 35, text: 'The references port takes several inputs, in order.' },
      { at: 40, text: 'Now the prompt describes the scene, not the product.' },
      { at: 45, text: '"On a bar counter at golden hour, condensation, shallow depth."' },
      { at: 50, text: 'Run it. The label, the shape, the colour come from your packshot.' },
      { at: 55, text: 'Compare it against the prompt-only version from lesson one.' },
      { at: 60, text: "Same direction, but now it's your product, not a lookalike." },
      { at: 65, text: 'Add a creator reference the same way for a face that repeats.' },
      { at: 70, text: 'Each reference is reusable across every run in the workspace.' },
      { at: 75, text: 'Wire the keyframe into generate video as before.' },
      { at: 80, text: "The lock holds through motion — that's keyframe-first working." },
      { at: 85, text: 'One reference, set once, and every shot stays on brand.' },
      { at: 90, text: 'Next: what to do when one shot comes back wrong.' },
    ],
    faq: [
      {
        question: 'How many references can one keyframe use?',
        answer:
          'The references port is a multi-input, so you can wire in several — typically a creator identity plus a product, and sometimes a scene plate. Their edge order is the order referenceRoles is applied in, so keep identity first when a face is involved.',
      },
      {
        question: 'Why does my product still drift after adding a reference?',
        answer:
          'Almost always because the prompt is still describing the product and fighting the packshot. Once a reference carries the object, delete the product adjectives from the prompt and spend the words on lighting and camera instead.',
      },
    ],
  },
  {
    slug: 'fix-one-shot',
    lang: 'en',
    translationKey: 'fix-one-shot',
    order: 3,
    kind: 'basics',
    title: 'Fix one shot without re-running the ad',
    metaTitle: 'Re-run a Single Node Instead of the Whole Ad | 3.5 min lesson',
    description:
      'One bad generation should cost one generation. Learn how stale nodes work in SHOT.IS Studio so you can swap a model, re-run a single shot, and resync the ad.',
    excerpt:
      'Generation is a lottery you can re-roll. The canvas exists so you can re-roll exactly one ticket.',
    outcome: 'Repair a failed shot by re-running one node instead of rebuilding the whole run.',
    nodes: ['generate_image', 'generate_video', 'composer'],
    datePublished: '2026-09-18',
    ogImageKey: 'lesson-fix-one-shot',
    tags: ['canvas', 'iteration', 'cost control'],
    videoSeconds: 85,
    practiceMinutes: 2,
    video: {
      src: '/media/lessons/fix-one-shot.mp4',
      poster: '/media/lessons/fix-one-shot.jpg',
      width: 1440,
      height: 900,
    },
    videoPending: true,
    prerequisites: ['A run with at least one finished generation — lessons one and two both leave you with one.'],
    steps: [
      {
        at: 0,
        title: 'Find the node that failed, not the run',
        body: 'A warped label or a broken hand is one node\'s problem. The instinct to start over is the expensive instinct.',
      },
      {
        at: 15,
        title: 'Change the model or nudge the prompt',
        body: 'Node params open beside the canvas. Different models fail in different ways, so a model swap is often a better first move than a prompt rewrite.',
      },
      {
        at: 30,
        title: 'Re-run that node alone',
        body: 'Inputs — your prompts and references — are hand-authored and never regenerate. Running one node re-bills one generation.',
      },
      {
        at: 45,
        title: 'Follow the stale marks downstream',
        body: 'When a node produces a new result, everything built from it is marked stale: still showing the old output, and flagged as out of date.',
      },
      {
        at: 55,
        title: 'Resync the ad',
        body: 'Run the stale nodes to bring the graph back in sync. The composer picks up the replacement clip without being rewired.',
      },
    ],
    captions: [
      { at: 0, text: "Generation is a lottery you can re-roll. Here's how to re-roll once." },
      { at: 5, text: 'This run has five nodes. One video came back with a warped label.' },
      { at: 10, text: "You don't rebuild the run. You fix the node in place." },
      { at: 15, text: 'Click the bad node. Its params open on the side.' },
      { at: 20, text: 'Switch the model — different models fail in different ways.' },
      { at: 25, text: 'Or keep the model and change the prompt a little.' },
      { at: 30, text: 'Hit Run on just this node. Nothing upstream re-runs.' },
      { at: 35, text: 'Your references and prompt are inputs. They never regenerate.' },
      { at: 40, text: "That's why the canvas is a graph and not a timeline." },
      { at: 45, text: 'When a node changes, everything downstream goes stale.' },
      { at: 50, text: 'Stale means: still showing the old result, marked out of date.' },
      { at: 55, text: 'Run the downstream nodes to bring the ad back in sync.' },
      { at: 60, text: 'The composer picks up the new clip automatically.' },
      { at: 65, text: 'You just paid for one generation instead of five.' },
      { at: 70, text: "Keep the failures on the canvas — they record what didn't work." },
      { at: 75, text: 'Clean them up later, or leave them as a reference.' },
      { at: 80, text: "Fix in place, re-run narrow. That's the studio habit." },
    ],
    faq: [
      {
        question: 'Does re-running a node charge me again?',
        answer:
          'Running a generation node bills that generation, which is exactly why the canvas lets you run one node instead of the graph. Input nodes — prompt, import, reference — are hand-authored and free to change as often as you like.',
      },
    ],
  },
  {
    slug: 'strobe-product-ad',
    lang: 'en',
    translationKey: 'strobe-product-ad',
    order: 4,
    kind: 'micro-case',
    title: 'Micro-case: a strobe product ad',
    metaTitle: 'Build a TikTok Strobe Product Ad in SHOT.IS Studio | 6 min lesson',
    description:
      'Rebuild the flicker-background product ad: one anchored hero product, eight disposable locations, and a composer full of hard cuts. A 110-second screencast.',
    excerpt:
      'One product that never moves, eight worlds that never stop. The cheapest high-energy format in short-form.',
    outcome: 'Ship a fifteen-second strobe ad without generating a single second of video.',
    nodes: ['reference', 'generate_image', 'composer', 'generate_music'],
    datePublished: '2026-09-18',
    ogImageKey: 'lesson-strobe-product-ad',
    tags: ['micro-case', 'composer', 'product ads'],
    videoSeconds: 110,
    practiceMinutes: 4,
    video: {
      src: '/media/lessons/strobe-product-ad.mp4',
      poster: '/media/lessons/strobe-product-ad.jpg',
      width: 1440,
      height: 900,
    },
    videoPending: true,
    prerequisites: ['Lesson two — the hero product has to be locked by a reference before any of this works.'],
    steps: [
      {
        at: 0,
        title: 'Understand the illusion',
        body: 'A strobe ad reads as motion, but nothing moves. The product sits dead-centre at a fixed scale and the background is replaced every few frames.',
      },
      {
        at: 15,
        title: 'Generate one anchored hero, then vary only the world',
        body: 'Keep the framing clause of the prompt byte-identical across generations and change only the location. That constant is what keeps the product from jittering.',
      },
      {
        at: 50,
        title: 'Skip video generation entirely',
        body: 'Each background is on screen for about seventy milliseconds. Motion inside a clip that short is invisible, so stills are not a compromise here — they are the correct tool.',
      },
      {
        at: 55,
        title: 'Assemble in the composer with hard cuts',
        body: 'Wire the stills into the composer\'s ordered clips port. Set the transition to cut: a fade of any length destroys the effect.',
      },
      {
        at: 65,
        title: 'Trim to the strobe',
        body: 'clipTrims takes a start and end per clip, index-aligned with the wiring order. Short trims are the entire look — if it feels sluggish, trim shorter before you change anything else.',
      },
      {
        at: 75,
        title: 'Land the cuts near the beat',
        body: 'Add music and nudge the trims so cuts fall close to the beat. Exactness is not required; proximity is enough for the eye to read it as synced.',
      },
    ],
    captions: [
      { at: 0, text: 'Micro-case: the strobe ad. One product, backgrounds flickering behind it.' },
      { at: 5, text: "You've seen these on TikTok — a cut every two or three frames." },
      { at: 10, text: 'The trick is that the product never moves. Only the world does.' },
      { at: 15, text: 'Start with the product reference, locked as in lesson two.' },
      { at: 20, text: 'Generate the hero: dead-centre, fixed scale, plain background.' },
      { at: 25, text: 'Now the same product against a different location.' },
      { at: 30, text: 'Same framing prompt, different scene. One variable only.' },
      { at: 35, text: 'Six to eight of these is plenty for a fifteen second ad.' },
      { at: 40, text: 'Because the product is anchored, the eye reads it as one object.' },
      { at: 45, text: 'The backgrounds do all the motion.' },
      { at: 50, text: 'You can skip video generation entirely. Stills are enough.' },
      { at: 55, text: 'Feed the stills into a composer node as ordered clips.' },
      { at: 60, text: 'Set the transition to cut. Fades kill the strobe.' },
      { at: 65, text: 'Trim each clip short. Seventy milliseconds is the whole look.' },
      { at: 70, text: 'clipTrims takes a start and end per clip, index aligned.' },
      { at: 75, text: 'Add a music track and let the cuts land near the beat.' },
      { at: 80, text: 'Run the composer. It renders server-side.' },
      { at: 85, text: 'Here it is — same can, eight worlds, fifteen seconds.' },
      { at: 90, text: 'Feels slow? Trim shorter. Feels cheap? Add colour variety.' },
      { at: 95, text: "Promote it as the run's final video when you're happy." },
      { at: 100, text: 'The format is one locked hero plus disposable backgrounds.' },
      { at: 105, text: "That's a strobe ad." },
    ],
    faq: [
      {
        question: 'Why does the strobe ad use stills instead of video clips?',
        answer:
          'Each background holds the screen for roughly seventy milliseconds, and no motion is legible in that window. Generating video for frames nobody can read spends the expensive step on an effect the cut is already producing.',
      },
      {
        question: 'How many backgrounds does a strobe ad need?',
        answer:
          'Six to eight distinct locations carry a fifteen-second cut comfortably, because the clips repeat. Push past a dozen and the variety stops registering while the generation bill keeps climbing.',
      },
    ],
  },
  {
    slug: 'ugc-testimonial-one-scene',
    lang: 'en',
    translationKey: 'ugc-testimonial-one-scene',
    order: 5,
    kind: 'micro-case',
    title: 'Micro-case: a UGC testimonial in one scene',
    metaTitle: 'Build a 3-Shot AI UGC Testimonial Ad | 6 min lesson',
    description:
      'Hook, demo, payoff — three shots that have to look like one person in one room. Learn the scene bible discipline that keeps an AI UGC testimonial from falling apart.',
    excerpt:
      'The format that still outperforms polish, and the one constraint that decides whether it survives three shots.',
    outcome: 'Produce a three-shot UGC testimonial where the creator, room, and product stay continuous.',
    nodes: ['reference', 'generate_image', 'generate_video', 'extract_frame', 'composer'],
    datePublished: '2026-09-18',
    ogImageKey: 'lesson-ugc-testimonial',
    tags: ['micro-case', 'ugc', 'consistency'],
    videoSeconds: 115,
    practiceMinutes: 4,
    video: {
      src: '/media/lessons/ugc-testimonial-one-scene.mp4',
      poster: '/media/lessons/ugc-testimonial-one-scene.jpg',
      width: 1440,
      height: 900,
    },
    videoPending: true,
    prerequisites: [
      'Lesson two, for references.',
      'Lesson three, because you will re-run at least one keyframe before this is right.',
    ],
    steps: [
      {
        at: 0,
        title: 'Name the failure before you start',
        body: 'The way UGC ads break is not bad rendering — it is three shots that read as three different people in three different rooms.',
      },
      {
        at: 10,
        title: 'Write a scene bible first',
        body: 'One location, one outfit, one time of day, written down as fixed constants. Every prompt in the run repeats those words verbatim, which is what makes the shots belong to each other.',
      },
      {
        at: 20,
        title: 'Wire identity and product into the same keyframe',
        body: 'A creator reference and a product reference both feed the generate image node. Order matters: identity first, product second, because referenceRoles is read in edge order.',
      },
      {
        at: 40,
        title: 'Generate all three keyframes before any motion',
        body: 'Hook, demo, payoff — as stills, side by side. This is the review gate, and it is the cheap one.',
      },
      {
        at: 65,
        title: 'Fix drift at the still, never at the video',
        body: 'If a face has drifted, re-run that keyframe now. Motion is the expensive step; sending a broken keyframe into it pays twice for the same mistake.',
      },
      {
        at: 85,
        title: 'Carry continuity with extract_frame',
        body: 'Pull the last frame of shot one and use it as the keyframe for shot two. The cut then lands inside a continuous room instead of jumping between two guesses at one.',
      },
      {
        at: 95,
        title: 'Assemble with cuts',
        body: 'Three clips into the composer in order, transition set to cut. UGC does not dissolve — a dissolve is the tell that a shoot was never there.',
      },
    ],
    captions: [
      { at: 0, text: 'Micro-case: the UGC testimonial. The format that outperforms polish.' },
      { at: 5, text: 'The failure mode is obvious: three shots, three different people.' },
      { at: 10, text: 'So before generating anything, write a scene bible.' },
      { at: 15, text: 'One location, one outfit, one time of day. Non-negotiable.' },
      { at: 20, text: 'Add a creator reference — the face that has to repeat.' },
      { at: 25, text: 'Add the product reference next to it.' },
      { at: 30, text: 'Both wire into the same generate image node.' },
      { at: 35, text: 'referenceRoles is ordered: identity first, product second.' },
      { at: 40, text: 'Shot one: the hook. Creator to camera, product in hand.' },
      { at: 45, text: 'The prompt repeats the scene bible word for word. Every time.' },
      { at: 50, text: 'Shot two: the demo. Closer in, hands on the product.' },
      { at: 55, text: 'Shot three: the payoff. Back to the face, product forward.' },
      { at: 60, text: 'Three keyframes, one world. Check them side by side.' },
      { at: 65, text: 'If a face drifted, re-run that keyframe now.' },
      { at: 70, text: 'Motion is expensive. Keyframes are cheap. Fix it at the cheap step.' },
      { at: 75, text: 'Now each keyframe gets its own generate video node.' },
      { at: 80, text: 'Five seconds each, phone-camera framing in the prompt.' },
      { at: 85, text: 'For continuity, extract the last frame of shot one...' },
      { at: 90, text: '...and use it as the keyframe for shot two.' },
      { at: 95, text: 'Wire all three clips into the composer, in order.' },
      { at: 100, text: "Cut, not fade. UGC doesn't dissolve." },
      { at: 105, text: 'Fifteen seconds, one creator, one room, one product.' },
      { at: 110, text: 'A testimonial ad nobody had to shoot.' },
    ],
    faq: [
      {
        question: 'What is a scene bible?',
        answer:
          'A scene bible is the short list of constants every prompt in a run must repeat — the location, the outfit, the time of day, the camera treatment. It exists because models re-invent anything you leave unstated, and re-invention between shots is exactly what makes an AI UGC ad look assembled.',
      },
      {
        question: 'Do I have to disclose that a testimonial is AI-generated?',
        answer:
          'Treat it as required. A synthetic creator is not a customer, so a generated testimonial should never be presented as a real person\'s experience, and most ad platforms now carry their own AI disclosure rules on top of that.',
      },
    ],
  },
];

// ── Derived lookups ─────────────────────────────────────────────────────────

const byOrder = (a: Lesson, b: Lesson) => a.order - b.order;

export const lessonsByLang: Record<LessonLang, Lesson[]> = {
  en: lessons.filter((l) => l.lang === 'en').sort(byOrder),
  es: lessons.filter((l) => l.lang === 'es').sort(byOrder),
};

/** Languages that actually have lessons. ES joins the moment its lessons land. */
export const learnLangs = (Object.keys(lessonsByLang) as LessonLang[]).filter(
  (lang) => lessonsByLang[lang].length > 0,
);

export const lessonPath = (lesson: Lesson): string => `${learnBasePath[lesson.lang]}/${lesson.slug}`;

export const learnIndexPath = (lang: LessonLang): string => learnBasePath[lang];

export const lessonByPath: Map<string, Lesson> = new Map(lessons.map((l) => [lessonPath(l), l]));

export const lessonsByTranslationKey: Map<string, Partial<Record<LessonLang, Lesson>>> = (() => {
  const map = new Map<string, Partial<Record<LessonLang, Lesson>>>();
  for (const lesson of lessons) {
    const entry = map.get(lesson.translationKey) ?? {};
    entry[lesson.lang] = lesson;
    map.set(lesson.translationKey, entry);
  }
  return map;
})();

/** Sibling translation of a lesson in the other language, if one exists yet. */
export const lessonSibling = (lesson: Lesson): Lesson | undefined => {
  const pair = lessonsByTranslationKey.get(lesson.translationKey);
  const other: LessonLang = lesson.lang === 'en' ? 'es' : 'en';
  return pair?.[other];
};

/** The next lesson in the path, same language. */
export const nextLesson = (lesson: Lesson): Lesson | undefined =>
  lessonsByLang[lesson.lang].find((l) => l.order === lesson.order + 1);

const absolute = (path: string) => `${siteBaseUrl}${path}`;

/**
 * hreflang alternates for a lesson. Self-referential plus x-default even while
 * only English exists, so reciprocity stays valid and Search Console does not
 * flag a missing return tag when the Spanish lessons land.
 */
export const lessonAlternates = (lesson: Lesson): Alternate[] => {
  const pair = lessonsByTranslationKey.get(lesson.translationKey) ?? { [lesson.lang]: lesson };
  const alternates: Alternate[] = [];

  (Object.keys(pair) as LessonLang[]).forEach((lang) => {
    const l = pair[lang];
    if (l) alternates.push({ hreflang: lang, href: absolute(lessonPath(l)) });
  });

  const xDefault = pair.en ?? lesson;
  alternates.push({ hreflang: 'x-default', href: absolute(lessonPath(xDefault)) });

  return alternates;
};

/** hreflang alternates for the hub — only languages that have lessons. */
export const learnIndexAlternates = (): Alternate[] => [
  ...learnLangs.map((lang) => ({ hreflang: lang, href: absolute(learnIndexPath(lang)) })),
  { hreflang: 'x-default', href: absolute(learnIndexPath('en')) },
];

// ── Learning time ───────────────────────────────────────────────────────────

/**
 * Learning time is watch time plus the hands-on minutes it takes to redo the
 * lesson yourself — the number a viewer actually budgets. Rounded to the
 * nearest half minute so "1.5 min" stays available and nothing pretends to a
 * precision it does not have.
 */
export const learningMinutes = (lesson: Lesson): number =>
  Math.round((lesson.videoSeconds / 60 + lesson.practiceMinutes) * 2) / 2;

export const pathMinutes = (lang: LessonLang): number =>
  Math.round(lessonsByLang[lang].reduce((total, lesson) => total + learningMinutes(lesson), 0));

/** "3 min" / "1.5 min" — halves survive, trailing zeros do not. */
export const formatMinutes = (minutes: number): string => `${Number(minutes.toFixed(1))} min`;

/** "0:24" — chapter and caption timestamps. */
export const formatTimestamp = (seconds: number): string =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

export const formatSeconds = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const rest = seconds % 60;
  if (mins === 0) return `${rest}s`;
  return rest === 0 ? `${mins}m` : `${mins}m ${rest}s`;
};

/** ISO 8601 duration for schema.org (VideoObject.duration, Course workload). */
export const isoDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const rest = Math.round(seconds % 60);
  if (mins === 0 && rest === 0) return 'PT0S';
  return `PT${mins > 0 ? `${mins}M` : ''}${rest > 0 ? `${rest}S` : ''}`;
};

/** Captions flattened into one paragraph — the transcript property in schema. */
export const lessonTranscript = (lesson: Lesson): string =>
  lesson.captions.map((c) => c.text).join(' ');

/** All indexable learn routes: the hub per language plus every lesson. */
export const learnRoutes = (): string[] => [
  ...learnLangs.map((lang) => learnIndexPath(lang)),
  ...lessons.map(lessonPath),
];

export const learnPageMeta = {
  dateModified: '2026-09-18',
};

/**
 * The graph each lesson is recorded on.
 *
 * These are built fresh rather than filmed on old production runs: a lesson
 * that says "four nodes" has to show four nodes, and a real campaign run
 * carries sixty. Every model here is grok (`creditCost: 0` on this workspace),
 * so building and running these graphs spends nothing.
 *
 * `key` is the logical name scripts/lessons/plans.mjs asks for; the builder
 * maps it to the created node id in runs.json.
 */

export const GROK_IMAGE = 'grok:image-t2i';
export const GROK_VIDEO = 'grok:video-i2v';

/** VARKA coffee to-go — a real packshot with a legible label, which is the
 *  whole point of the reference lessons. */
export const PRODUCT_ID = 'prd_01KXA88EKS71VG3CW6P0F5ADM7';
export const CREATOR_ID = 'crt_01KSZZYB46WM7C9Y6YSF95ATJ3';

const ASPECT = '9:16';

/** Lesson 1 and 2 share this scene so the reference lesson can show a true
 *  before/after instead of two unrelated images. */
const SCENE_PROMPT_LOOSE = 'Coffee cup on wet concrete, neon rim light, slow orbit.';
const SCENE_PROMPT_LOCKED = 'On a cafe counter at golden hour, warm rim light, shallow depth.';

/** grok:video-i2v requires a prompt alongside the keyframe — the keyframe says
 *  what is in the shot, this says what moves. */
const MOTION_PROMPT = 'Slow orbit around the cup, faint steam drift, handheld micro-movement.';

/**
 * The strobe format's one constant: framing that never changes. Only the scene
 * clause after it varies, which is what stops the product from jittering
 * between cuts.
 */
const STROBE_FRAMING =
  'Product dead-centre, same scale, front-on, full product visible, no crop, even exposure on the label.';

const strobeWorlds = [
  { label: 'Hero — studio', scene: 'Seamless studio backdrop, soft box, neutral grey.' },
  { label: 'World 2 — neon alley', scene: 'Wet neon alley at night, magenta and cyan spill.' },
  { label: 'World 3 — beach noon', scene: 'Bright beach sand at noon, hard sun, blue sky.' },
  { label: 'World 4 — pine forest', scene: 'Misty pine forest, cool green light, damp moss.' },
  { label: 'World 5 — retro diner', scene: 'Retro diner counter, warm tungsten, chrome and red vinyl.' },
  { label: 'World 6 — snow field', scene: 'Open snow field at dusk, cold blue light, falling flakes.' },
];

/**
 * The scene bible — repeated verbatim in every shot's prompt. Everything a
 * prompt leaves unstated is re-invented between shots, and that re-invention is
 * exactly what makes an AI testimonial look assembled.
 */
const SCENE_BIBLE =
  'Same small sunlit kitchen, oak counter, white tiles, late morning light. Same woman, mid-20s, olive linen shirt, hair up. Phone-camera framing, handheld, natural skin.';

const ugcShots = [
  {
    key: 'hook',
    label: 'Hook',
    direction: 'She faces camera, holds the cup at chest height, mid-sentence.',
    motion: 'She keeps talking to camera, small natural head movement, handheld sway.',
  },
  {
    key: 'demo',
    label: 'Demo',
    direction: 'Closer in, both hands on the cup, she turns it to show the label.',
    motion: 'She rotates the cup slowly toward camera, slight push in.',
  },
  {
    key: 'payoff',
    label: 'Payoff',
    direction: 'Back to her face, cup forward toward camera, she smiles and nods.',
    motion: 'She lifts the cup toward camera and nods once, handheld settle.',
  },
];

export const lessonSpecs = {
  'first-ai-video': {
    name: 'Lesson 1 — Your first AI video',
    nodes: [
      // A generate_image node grows tall once it holds a preview, so the two
      // prompts share a left column instead of sitting under the generators.
      { key: 'prompt', type: 'prompt', title: 'Direction', x: 0, y: 0, params: { text: SCENE_PROMPT_LOOSE } },
      {
        key: 'motionPrompt',
        type: 'prompt',
        title: 'Camera move',
        x: 0,
        y: 460,
        params: { text: MOTION_PROMPT },
      },
      {
        key: 'keyframe',
        type: 'generate_image',
        title: 'Keyframe',
        x: 480,
        y: 0,
        params: { model: GROK_IMAGE, aspectRatio: ASPECT },
      },
      {
        key: 'motion',
        type: 'generate_video',
        title: 'Motion',
        x: 1000,
        y: 0,
        params: { model: GROK_VIDEO, durationSec: 5 },
      },
    ],
    edges: [
      ['prompt', 'text', 'keyframe', 'prompt'],
      ['keyframe', 'image', 'motion', 'keyframe'],
      ['motionPrompt', 'text', 'motion', 'prompt'],
    ],
  },

  'lock-your-product': {
    name: 'Lesson 2 — Lock your product with references',
    nodes: [
      // Generous vertical gaps: a reference node and a generate_image with a
      // preview are both several hundred pixels tall, and an establishing wide
      // shot of an overlapping graph teaches nothing.
      {
        key: 'promptLoose',
        type: 'prompt',
        title: 'Scene only',
        x: 0,
        y: 1080,
        params: { text: SCENE_PROMPT_LOOSE },
      },
      {
        key: 'keyframeUnreferenced',
        type: 'generate_image',
        title: 'Prompt-only keyframe',
        x: 560,
        y: 1080,
        params: { model: GROK_IMAGE, aspectRatio: ASPECT },
      },
      {
        key: 'reference',
        type: 'reference',
        title: 'Product reference',
        x: 0,
        y: 0,
        params: { productId: PRODUCT_ID },
      },
      { key: 'prompt', type: 'prompt', title: 'Scene', x: 0, y: 560, params: { text: SCENE_PROMPT_LOCKED } },
      {
        key: 'keyframe',
        type: 'generate_image',
        title: 'Referenced keyframe',
        x: 560,
        y: 0,
        params: { model: GROK_IMAGE, aspectRatio: ASPECT, referenceRoles: ['product'] },
      },
      {
        key: 'creatorReference',
        type: 'reference',
        title: 'Creator reference',
        x: 0,
        y: -520,
        params: { creatorId: CREATOR_ID },
      },
      {
        key: 'motionPrompt',
        type: 'prompt',
        title: 'Camera move',
        x: 0,
        y: 820,
        params: { text: MOTION_PROMPT },
      },
      {
        key: 'motion',
        type: 'generate_video',
        title: 'Motion',
        x: 1120,
        y: 0,
        params: { model: GROK_VIDEO, durationSec: 5 },
      },
    ],
    edges: [
      ['promptLoose', 'text', 'keyframeUnreferenced', 'prompt'],
      ['reference', 'images', 'keyframe', 'references', 0],
      ['prompt', 'text', 'keyframe', 'prompt'],
      ['keyframe', 'image', 'motion', 'keyframe'],
      ['motionPrompt', 'text', 'motion', 'prompt'],
    ],
  },

  'fix-one-shot': {
    name: 'Lesson 3 — Fix one shot without re-running the ad',
    nodes: [
      { key: 'promptA', type: 'prompt', title: 'Shot 1 direction', x: 0, y: 0, params: { text: SCENE_PROMPT_LOCKED } },
      {
        key: 'reference',
        type: 'reference',
        title: 'Product reference',
        x: 0,
        y: -180,
        params: { productId: PRODUCT_ID },
      },
      {
        key: 'keyframeA',
        type: 'generate_image',
        title: 'Shot 1 keyframe',
        x: 380,
        y: -80,
        params: { model: GROK_IMAGE, aspectRatio: ASPECT, referenceRoles: ['product'] },
      },
      {
        key: 'badShot',
        type: 'generate_video',
        title: 'Shot 1 clip',
        x: 760,
        y: -80,
        params: { model: GROK_VIDEO, durationSec: 5 },
      },
      {
        key: 'promptB',
        type: 'prompt',
        title: 'Shot 2 direction',
        x: 0,
        y: 300,
        params: { text: 'Same cafe counter, tighter crop, hand lifts the cup toward camera.' },
      },
      {
        key: 'keyframeB',
        type: 'generate_image',
        title: 'Shot 2 keyframe',
        x: 380,
        y: 300,
        params: { model: GROK_IMAGE, aspectRatio: ASPECT, referenceRoles: ['product'] },
      },
      {
        key: 'goodShot',
        type: 'generate_video',
        title: 'Shot 2 clip',
        x: 760,
        y: 300,
        params: { model: GROK_VIDEO, durationSec: 5 },
      },
      {
        key: 'motionPromptA',
        type: 'prompt',
        title: 'Shot 1 camera move',
        x: 380,
        y: 110,
        params: { text: MOTION_PROMPT },
      },
      {
        key: 'motionPromptB',
        type: 'prompt',
        title: 'Shot 2 camera move',
        x: 380,
        y: 480,
        params: { text: 'Push in slowly as the hand lifts the cup, slight handheld sway.' },
      },
      {
        key: 'composer',
        type: 'composer',
        title: 'Assemble',
        x: 1140,
        y: 110,
        params: { transition: 'cut', aspectRatio: ASPECT, resolution: '1080x1920' },
      },
    ],
    edges: [
      ['reference', 'images', 'keyframeA', 'references', 0],
      ['promptA', 'text', 'keyframeA', 'prompt'],
      ['keyframeA', 'image', 'badShot', 'keyframe'],
      ['motionPromptA', 'text', 'badShot', 'prompt'],
      ['reference', 'images', 'keyframeB', 'references', 0],
      ['promptB', 'text', 'keyframeB', 'prompt'],
      ['keyframeB', 'image', 'goodShot', 'keyframe'],
      ['motionPromptB', 'text', 'goodShot', 'prompt'],
      ['badShot', 'video', 'composer', 'clips', 0],
      ['goodShot', 'video', 'composer', 'clips', 1],
    ],
  },

  'strobe-product-ad': {
    name: 'Lesson 4 — Micro-case: a strobe product ad',
    nodes: [
      {
        key: 'reference',
        type: 'reference',
        title: 'Product reference',
        x: 0,
        y: 0,
        params: { productId: PRODUCT_ID },
      },
      ...strobeWorlds.map((world, i) => ({
        key: i === 0 ? 'heroPrompt' : `bg${i}Prompt`,
        type: 'prompt',
        title: `${world.label} prompt`,
        x: 340,
        y: i * 220 - 220,
        params: { text: `${STROBE_FRAMING} ${world.scene}` },
      })),
      ...strobeWorlds.map((world, i) => ({
        key: i === 0 ? 'hero' : `bg${i}`,
        type: 'generate_image',
        title: world.label,
        x: 700,
        y: i * 220 - 220,
        params: { model: GROK_IMAGE, aspectRatio: ASPECT, referenceRoles: ['product'] },
      })),
      // The composer's clips port is typed video, so a still cannot go straight
      // in — each world gets a clip. The motion inside it is irrelevant at a
      // ~70ms cut, which is why one shared prompt serves all six.
      {
        key: 'strobeMotionPrompt',
        type: 'prompt',
        title: 'Shared micro-motion',
        x: 700,
        y: 1120,
        params: { text: 'Almost still, the faintest drift. The product does not move.' },
      },
      ...strobeWorlds.map((world, i) => ({
        key: i === 0 ? 'heroClip' : `bg${i}Clip`,
        type: 'generate_video',
        title: `${world.label} clip`,
        x: 1080,
        y: i * 220 - 220,
        params: { model: GROK_VIDEO, durationSec: 5 },
      })),
      {
        key: 'composer',
        type: 'composer',
        title: 'Strobe cut',
        x: 1500,
        y: 300,
        params: {
          transition: 'cut',
          aspectRatio: ASPECT,
          resolution: '1080x1920',
          // Seventy milliseconds a world — the whole look lives in this trim.
          clipTrims: strobeWorlds.map((_, i) => ({ start: 1 + i * 0.07, end: 1.07 + i * 0.07 })),
        },
      },
    ],
    edges: [
      ...strobeWorlds.flatMap((_, i) => {
        const promptKey = i === 0 ? 'heroPrompt' : `bg${i}Prompt`;
        const imageKey = i === 0 ? 'hero' : `bg${i}`;
        const clipKey = i === 0 ? 'heroClip' : `bg${i}Clip`;
        return [
          ['reference', 'images', imageKey, 'references', 0],
          [promptKey, 'text', imageKey, 'prompt'],
          [imageKey, 'image', clipKey, 'keyframe'],
          ['strobeMotionPrompt', 'text', clipKey, 'prompt'],
          [clipKey, 'video', 'composer', 'clips', i],
        ];
      }),
    ],
  },

  'ugc-testimonial-one-scene': {
    name: 'Lesson 5 — Micro-case: a UGC testimonial in one scene',
    nodes: [
      {
        key: 'creatorReference',
        type: 'reference',
        title: 'Creator reference',
        x: 0,
        y: -160,
        params: { creatorId: CREATOR_ID },
      },
      {
        key: 'productReference',
        type: 'reference',
        title: 'Product reference',
        x: 0,
        y: 60,
        params: { productId: PRODUCT_ID },
      },
      ...ugcShots.map((shot, i) => ({
        key: `${shot.key}Prompt`,
        type: 'prompt',
        title: `${shot.label} direction`,
        x: 340,
        y: i * 260 - 260,
        params: { text: `${SCENE_BIBLE} ${shot.direction}` },
      })),
      ...ugcShots.map((shot, i) => ({
        key: `${shot.key}Keyframe`,
        type: 'generate_image',
        title: `${shot.label} keyframe`,
        x: 700,
        y: i * 260 - 260,
        params: { model: GROK_IMAGE, aspectRatio: ASPECT, referenceRoles: ['identity', 'product'] },
      })),
      ...ugcShots.map((shot, i) => ({
        key: `${shot.key}MotionPrompt`,
        type: 'prompt',
        title: `${shot.label} camera move`,
        x: 700,
        y: i * 260 - 160,
        params: { text: shot.motion },
      })),
      ...ugcShots.map((shot, i) => ({
        key: `${shot.key}Motion`,
        type: 'generate_video',
        title: `${shot.label} clip`,
        x: 1060,
        y: i * 260 - 260,
        params: { model: GROK_VIDEO, durationSec: 5 },
      })),
      {
        key: 'extractFrame',
        type: 'extract_frame',
        title: 'Last frame of the hook',
        x: 1060,
        y: 200,
        params: { position: 'last' },
      },
      {
        key: 'composer',
        type: 'composer',
        title: 'Testimonial cut',
        x: 1420,
        y: 0,
        params: { transition: 'cut', aspectRatio: ASPECT, resolution: '1080x1920' },
      },
    ],
    edges: [
      ...ugcShots.flatMap((shot, i) => [
        ['creatorReference', 'images', `${shot.key}Keyframe`, 'references', 0],
        ['productReference', 'images', `${shot.key}Keyframe`, 'references', 1],
        [`${shot.key}Prompt`, 'text', `${shot.key}Keyframe`, 'prompt'],
        [`${shot.key}Keyframe`, 'image', `${shot.key}Motion`, 'keyframe'],
        [`${shot.key}MotionPrompt`, 'text', `${shot.key}Motion`, 'prompt'],
        [`${shot.key}Motion`, 'video', 'composer', 'clips', i],
      ]),
      ['hookMotion', 'video', 'extractFrame', 'video'],
    ],
  },
};

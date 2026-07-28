/**
 * Data for the interactive Canvas workflow demo on the home page.
 *
 * Everything the demo renders is a real asset produced on studio.shot.is:
 * the reference packshot, the generated keyframes, the motion previews and
 * the three final cuts are all frames/segments of shipped campaign work.
 */

export type DemoNodeId = 'reference' | 'direction' | 'keyframe' | 'motion' | 'composer';

export type DemoNodeStatus = 'idle' | 'queued' | 'running' | 'fresh' | 'cached' | 'stale';

export type DemoNode = {
  id: DemoNodeId;
  kind: string;
  title: string;
  /** Wall-clock the node takes when the graph runs, in ms. */
  runtime: number;
  /** Nodes whose output feeds this one. */
  inputs: DemoNodeId[];
  /** Inputs are authored by hand, so a prompt edit never re-runs them. */
  isInput?: boolean;
};

export const demoNodes: DemoNode[] = [
  { id: 'reference', kind: 'Input · product', title: 'Reference', runtime: 420, inputs: [], isInput: true },
  { id: 'direction', kind: 'Input · prompt', title: 'Direction', runtime: 320, inputs: [], isInput: true },
  { id: 'keyframe', kind: 'Generate · image', title: 'Keyframe', runtime: 1250, inputs: ['reference', 'direction'] },
  { id: 'motion', kind: 'Generate · video', title: 'Motion', runtime: 1600, inputs: ['keyframe'] },
  { id: 'composer', kind: 'Assemble · cut', title: 'Composer', runtime: 900, inputs: ['motion'] },
];

export const demoNodeOrder = demoNodes.map((node) => node.id);

/** The two hand-authored inputs; everything else is generated and can go stale. */
export const generatedNodeIds = demoNodes.filter((node) => !node.isInput).map((node) => node.id);

export type DemoPreset = {
  id: 'retro' | 'neon' | 'ugc';
  label: string;
  /** Shown on the direction node. */
  prompt: string;
  imageModel: string;
  videoModel: string;
  keyframe: string;
  keyframeAlt: string;
  motionClip: string;
  motionPoster: string;
  strip: string[];
  output: string;
  outputPoster: string;
  outputName: string;
  outputAlt: string;
  cuts: number;
  seconds: number;
};

const REFERENCE_IMAGE = '/media/work/ref-product.jpg';
const REFERENCE_FILE = 'gorilla-can-packshot.jpg';

export const referenceImage = REFERENCE_IMAGE;
export const referenceFile = REFERENCE_FILE;

export const demoPresets: DemoPreset[] = [
  {
    id: 'retro',
    label: 'Retro arcade',
    prompt: 'Late-night bedroom arcade. CRT glow, RGB spill, practical lamps, handheld camera, product on the desk.',
    imageModel: 'Grok Imagine · 9:16',
    videoModel: 'Kling · 4s · 1080p',
    keyframe: '/media/work/key-retro.jpg',
    keyframeAlt: 'Generated keyframe: character at a CRT desk setup lit by RGB spill',
    motionClip: '/media/work/reel-01.mp4',
    motionPoster: '/media/work/reel-01.jpg',
    strip: ['/media/work/reel-01.jpg', '/media/work/reel-03.jpg', '/media/work/reel-05.jpg'],
    output: '/media/work/campaign-retro.mp4',
    outputPoster: '/media/work/campaign-retro-poster.jpg',
    outputName: 'retro-arcade-cut.mp4',
    outputAlt: 'Final retro arcade campaign cut',
    cuts: 3,
    seconds: 9,
  },
  {
    id: 'neon',
    label: 'Neon packshot',
    prompt: 'Studio packshot on black. Neon rim light, volumetric haze, slow orbit, hard specular on the can.',
    imageModel: 'Grok Imagine · 9:16',
    videoModel: 'Kling · 4s · 1080p',
    keyframe: '/media/work/key-neon.jpg',
    keyframeAlt: 'Generated keyframe: product packshot on a neon grid backdrop',
    motionClip: '/media/work/reel-02.mp4',
    motionPoster: '/media/work/reel-02.jpg',
    strip: ['/media/work/reel-02.jpg', '/media/work/reel-04.jpg', '/media/work/reel-06.jpg'],
    output: '/media/work/campaign-neon.mp4',
    outputPoster: '/media/work/campaign-neon-poster.jpg',
    outputName: 'neon-packshot-cut.mp4',
    outputAlt: 'Final neon packshot campaign cut',
    cuts: 3,
    seconds: 6,
  },
  {
    id: 'ugc',
    label: 'Creator UGC',
    prompt: 'Creator holds the product in a warm bar interior. Phone-camera framing, ambient practicals, natural motion.',
    imageModel: 'Grok Imagine · 9:16',
    videoModel: 'Kling · 5s · 1080p',
    keyframe: '/media/work/key-ugc.jpg',
    keyframeAlt: 'Generated keyframe: creator persona in a warm bar interior',
    motionClip: '/media/reel/visual-overload.mp4',
    motionPoster: '/media/reel/visual-overload-poster.jpg',
    strip: ['/media/work/key-ugc.jpg', '/media/reel/visual-overload-poster.jpg', '/media/work/key-ugc.jpg'],
    output: '/media/work/campaign-ugc.mp4',
    outputPoster: '/media/work/campaign-ugc-poster.jpg',
    outputName: 'creator-ugc-cut.mp4',
    outputAlt: 'Final creator UGC campaign cut',
    cuts: 2,
    seconds: 5,
  },
];

export const defaultPresetId: DemoPreset['id'] = 'retro';

/** Log lines the execution panel streams while a node runs. */
export const nodeLogLines: Record<DemoNodeId, (preset: DemoPreset) => string> = {
  reference: () => `load ${REFERENCE_FILE} → 1080×1920`,
  direction: (preset) => `parse direction "${preset.label.toLowerCase()}"`,
  keyframe: (preset) => `${preset.imageModel.split(' · ')[0].toLowerCase()}: keyframe from 2 refs`,
  motion: (preset) => `${preset.videoModel.split(' · ')[0].toLowerCase()}: image→video, ${preset.videoModel.split(' · ')[1]}`,
  composer: (preset) => `compose ${preset.cuts} cuts → ${preset.seconds}s · 1080×1920`,
};

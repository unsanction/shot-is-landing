/**
 * Per-lesson recording choreography.
 *
 * A plan is `setup` (everything before the clock starts) plus `actions`, each
 * pinned to the same `at` timeline the captions use. The beats below are
 * written against logical node names — "keyframe", "motion" — which resolve to
 * real graph node ids through scripts/lessons/runs.json, so re-recording a
 * lesson on a different run means editing that file, not this one.
 *
 * Runs are prepared through the studio API before recording. Building a graph
 * is free; *running* a generation node costs credits, so any lesson that has to
 * show a live generation says so in `spends` and is never recorded without the
 * user asking for it.
 */
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { STUDIO_ORIGIN } from './config.mjs';
import {
  closeMenus,
  closePreview,
  fitView,
  hoverNode,
  openAddNodePalette,
  openPreview,
  panToNode,
  playNode,
  selectNode,
  traceGraph,
  waitForCanvas,
  zoomIn,
  zoomOut,
} from './canvas.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** slug -> { runId, nodes: { logicalName: graphNodeId } } */
const loadRuns = async () => {
  const raw = await readFile(join(__dirname, 'runs.json'), 'utf8').catch(() => null);
  if (!raw) {
    throw new Error(
      'scripts/lessons/runs.json is missing. Prepare the lesson runs first:\n' +
        '  node scripts/lessons/prepare-runs.mjs',
    );
  }
  return JSON.parse(raw);
};

let runsCache = null;
const runsFor = async (slug) => {
  runsCache ??= await loadRuns();
  const entry = runsCache[slug];
  if (!entry) throw new Error(`runs.json has no entry for "${slug}"`);
  return entry;
};

/** Open the prepared run's canvas and wait for the graph to settle. */
const openRun = (slug) => async ({ page }) => {
  const { runId } = await runsFor(slug);
  await page.goto(`${STUDIO_ORIGIN}/studio/runs/${runId}`, { waitUntil: 'domcontentloaded' });
  await waitForCanvas(page);
  await fitView(page);
};

/** Resolve a logical node name to its graph id at action time. */
const node = (slug, name) => async () => {
  const { nodes } = await runsFor(slug);
  const id = nodes[name];
  if (!id) throw new Error(`runs.json["${slug}"].nodes is missing "${name}"`);
  return id;
};

/**
 * Press the node's own Run control. Kept separate from canvas.mjs because it is
 * the one primitive that spends credits — it should be obvious in a diff when a
 * lesson starts using it.
 */
const runNode = async (page, nodeId) => {
  const nodeEl = page.locator(`.react-flow__node[data-id="${nodeId}"]`).first();
  await nodeEl.click();
  await nodeEl.getByRole('button', { name: /^run$/i }).click();
  await page.waitForTimeout(600);
};

/** Each beat gets a `resolve(name)` bound to its own lesson's node map. */
const plan = (slug, { spends = false, beats }) => ({
  setup: openRun(slug),
  spends,
  actions: beats.map((beat) => ({
    at: beat.at,
    label: beat.label,
    run: (page, lesson) => beat.run(page, { resolve: (name) => node(slug, name)(), lesson }),
  })),
});

export const lessonPlans = {
  'first-ai-video': plan('first-ai-video', {
    beats: [
      { at: 0, label: 'establish the whole graph', run: async (page) => fitView(page) },
      {
        at: 9,
        label: 'focus the direction prompt',
        run: async (page, { resolve }) => {
          const id = await resolve('prompt');
          await panToNode(page, id);
          await selectNode(page, id);
          await zoomIn(page, 1);
        },
      },
      {
        at: 19,
        label: 'move to the keyframe node',
        run: async (page, { resolve }) => {
          await zoomOut(page, 1);
          const id = await resolve('keyframe');
          await panToNode(page, id);
          await selectNode(page, id);
        },
      },
      { at: 24, label: 'zoom into the model and its cost', run: async (page) => zoomIn(page, 2) },
      { at: 34, label: 'pull back to the wiring', run: async (page) => zoomOut(page, 2) },
      {
        at: 39,
        label: 'open the finished keyframe full screen',
        run: async (page, { resolve }) => openPreview(page, await resolve('keyframe')),
      },
      {
        at: 44,
        label: 'close it and move to the motion node',
        run: async (page, { resolve }) => {
          await closePreview(page);
          const id = await resolve('motion');
          await panToNode(page, id);
          await selectNode(page, id);
        },
      },
      {
        at: 49,
        label: 'show the camera-move prompt feeding it',
        run: async (page, { resolve }) => {
          const id = await resolve('motionPrompt');
          await panToNode(page, id, { centerBias: 0.35 });
          await hoverNode(page, id);
        },
      },
      {
        at: 54,
        label: 'back to the motion node',
        run: async (page, { resolve }) => {
          const id = await resolve('motion');
          await panToNode(page, id);
          await selectNode(page, id);
        },
      },
      {
        at: 59,
        label: 'play the finished clip',
        run: async (page, { resolve }) => playNode(page, await resolve('motion')),
      },
      {
        at: 69,
        label: 'fit the four nodes one last time',
        run: async (page) => {
          await closePreview(page);
          await fitView(page);
        },
      },
    ],
  }),

  'lock-your-product': plan('lock-your-product', {
    beats: [
      { at: 0, label: 'fit the graph', run: async (page) => fitView(page) },
      {
        at: 10,
        label: 'open the add-node palette',
        run: async (page) => {
          await openAddNodePalette(page);
        },
      },
      { at: 14, label: 'close the palette', run: async (page) => closeMenus(page) },
      {
        at: 15,
        label: 'focus the reference node',
        run: async (page, { resolve }) => {
          const id = await resolve('reference');
          await panToNode(page, id);
          await selectNode(page, id);
        },
      },
      { at: 20, label: 'zoom into the roles', run: async (page) => zoomIn(page, 2) },
      { at: 30, label: 'follow the wire into the keyframe', run: async (page) => zoomOut(page, 1) },
      {
        at: 35,
        label: 'show the references port',
        run: async (page, { resolve }) => hoverNode(page, await resolve('keyframe')),
      },
      {
        at: 40,
        label: 'focus the prompt',
        run: async (page, { resolve }) => {
          const id = await resolve('prompt');
          await panToNode(page, id);
          await selectNode(page, id);
        },
      },
      {
        at: 50,
        label: 'reveal the generated keyframe',
        run: async (page, { resolve }) => {
          const id = await resolve('keyframe');
          await panToNode(page, id);
          await selectNode(page, id);
          await zoomIn(page, 2);
        },
      },
      {
        at: 55,
        label: 'compare against the prompt-only keyframe',
        run: async (page, { resolve }) => {
          await zoomOut(page, 2);
          const id = await resolve('keyframeUnreferenced');
          await panToNode(page, id);
          await selectNode(page, id);
        },
      },
      {
        at: 65,
        label: 'show the creator reference',
        run: async (page, { resolve }) => {
          const id = await resolve('creatorReference');
          await panToNode(page, id);
          await selectNode(page, id);
        },
      },
      {
        at: 75,
        label: 'follow through to motion',
        run: async (page, { resolve }) => {
          const id = await resolve('motion');
          await panToNode(page, id);
          await selectNode(page, id);
        },
      },
      { at: 85, label: 'fit the whole reference chain', run: async (page) => fitView(page) },
    ],
  }),

  'fix-one-shot': plan('fix-one-shot', {
    // The only lesson that re-runs a node on camera. One generation.
    spends: true,
    beats: [
      { at: 0, label: 'fit the five-node run', run: async (page) => fitView(page) },
      {
        at: 5,
        label: 'find the failed shot',
        run: async (page, { resolve }) => {
          const id = await resolve('badShot');
          await panToNode(page, id);
          await hoverNode(page, id);
        },
      },
      {
        at: 15,
        label: 'open its params',
        run: async (page, { resolve }) => {
          await selectNode(page, await resolve('badShot'));
          await zoomIn(page, 1);
        },
      },
      { at: 30, label: 'run this node alone', run: async (page, { resolve }) => runNode(page, await resolve('badShot')) },
      {
        at: 45,
        label: 'show the stale downstream',
        run: async (page, { resolve }) => {
          await zoomOut(page, 1);
          await traceGraph(page, [await resolve('badShot'), await resolve('composer')]);
        },
      },
      {
        at: 55,
        label: 'resync the composer',
        run: async (page, { resolve }) => {
          const id = await resolve('composer');
          await panToNode(page, id);
          await selectNode(page, id);
        },
      },
      { at: 70, label: 'pull back over the failures', run: async (page) => fitView(page) },
    ],
  }),

  'strobe-product-ad': plan('strobe-product-ad', {
    beats: [
      { at: 0, label: 'fit the strobe graph', run: async (page) => fitView(page) },
      {
        at: 15,
        label: 'focus the locked product reference',
        run: async (page, { resolve }) => {
          const id = await resolve('reference');
          await panToNode(page, id);
          await selectNode(page, id);
        },
      },
      {
        at: 20,
        label: 'show the anchored hero',
        run: async (page, { resolve }) => {
          const id = await resolve('hero');
          await panToNode(page, id);
          await selectNode(page, id);
          await zoomIn(page, 2);
        },
      },
      {
        at: 25,
        label: 'walk the background variants',
        run: async (page, { resolve }) => {
          await zoomOut(page, 2);
          const ids = await Promise.all([resolve('bg1'), resolve('bg2'), resolve('bg3')]);
          await traceGraph(page, ids, { dwell: 900 });
        },
      },
      { at: 45, label: 'fit all the stills together', run: async (page) => fitView(page) },
      {
        at: 55,
        label: 'open the composer',
        run: async (page, { resolve }) => {
          const id = await resolve('composer');
          await panToNode(page, id);
          await selectNode(page, id);
          await zoomIn(page, 2);
        },
      },
      {
        at: 85,
        label: 'play the finished strobe',
        run: async (page, { resolve }) => selectNode(page, await resolve('composer')),
      },
      { at: 100, label: 'fit the whole format', run: async (page) => { await zoomOut(page, 2); await fitView(page); } },
    ],
  }),

  'ugc-testimonial-one-scene': plan('ugc-testimonial-one-scene', {
    beats: [
      { at: 0, label: 'fit the testimonial graph', run: async (page) => fitView(page) },
      {
        at: 20,
        label: 'focus the creator reference',
        run: async (page, { resolve }) => {
          const id = await resolve('creatorReference');
          await panToNode(page, id);
          await selectNode(page, id);
        },
      },
      {
        at: 25,
        label: 'add the product reference',
        run: async (page, { resolve }) => {
          const id = await resolve('productReference');
          await panToNode(page, id);
          await selectNode(page, id);
        },
      },
      {
        at: 35,
        label: 'show reference order on the keyframe',
        run: async (page, { resolve }) => {
          const id = await resolve('hookKeyframe');
          await panToNode(page, id);
          await selectNode(page, id);
          await zoomIn(page, 1);
        },
      },
      {
        at: 40,
        label: 'walk hook, demo, payoff',
        run: async (page, { resolve }) => {
          await zoomOut(page, 1);
          const ids = await Promise.all([resolve('hookKeyframe'), resolve('demoKeyframe'), resolve('payoffKeyframe')]);
          await traceGraph(page, ids, { dwell: 1400 });
        },
      },
      { at: 60, label: 'fit the three keyframes side by side', run: async (page) => fitView(page) },
      {
        at: 75,
        label: 'follow a keyframe into motion',
        run: async (page, { resolve }) => {
          const id = await resolve('hookMotion');
          await panToNode(page, id);
          await selectNode(page, id);
        },
      },
      {
        at: 85,
        label: 'show the extract_frame handoff',
        run: async (page, { resolve }) => {
          const id = await resolve('extractFrame');
          await panToNode(page, id);
          await selectNode(page, id);
        },
      },
      {
        at: 95,
        label: 'open the composer',
        run: async (page, { resolve }) => {
          const id = await resolve('composer');
          await panToNode(page, id);
          await selectNode(page, id);
          await zoomIn(page, 2);
        },
      },
      { at: 108, label: 'fit the finished testimonial', run: async (page) => { await zoomOut(page, 2); await fitView(page); } },
    ],
  }),
};

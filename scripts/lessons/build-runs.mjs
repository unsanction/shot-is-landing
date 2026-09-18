/**
 * Build (and run) the studio graph a lesson is recorded on.
 *
 *   node scripts/lessons/build-runs.mjs <lesson-slug> [--dry]
 *
 * Creates the run, wires the nodes from scripts/lessons/specs.mjs, executes
 * them in the order the spec lists, and writes the resulting node ids into
 * scripts/lessons/runs.json so plans.mjs can address them during recording.
 *
 * Every model in the specs is grok, which this workspace prices at 0 credits —
 * verify with `GET /api/generate/video-profile?provider=grok&model=video-i2v`
 * before assuming that still holds.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { STUDIO_ORIGIN } from './config.mjs';
import { lessonSpecs } from './specs.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RUNS_FILE = join(__dirname, 'runs.json');

/** Gap between generative node runs, and the wait before retrying failures. */
const PACE_MS = Number(process.env.SHOTIS_LESSON_PACE_MS ?? 25000);
const BACKOFF_MS = Number(process.env.SHOTIS_LESSON_BACKOFF_MS ?? 90000);
/** grok's image-edit path rate-limits and times out under a burst, and a node
 *  that trips it fails rather than queueing — so a lesson may need several
 *  patient passes before every world lands. */
const RETRIES = Number(process.env.SHOTIS_LESSON_RETRIES ?? 2);

let token;
const api = async (path, { method = 'GET', body } = {}) => {
  token ??= (await readFile(join(homedir(), '.shot', 'token'), 'utf8')).trim();
  const res = await fetch(`${STUDIO_ORIGIN}/api${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${text.slice(0, 300)}`);
  return text ? JSON.parse(text) : null;
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Fill a reference node's `images` from the entity it points at.
 *
 * The canvas resolves a picked product or creator into `{url, role}` pairs on
 * the client and saves those; the server executor reads `images`, not the ids.
 * Creating the node over the API means doing that resolution here, or the node
 * fails with "needs at least one selected creator / outfit / background /
 * product" despite carrying a perfectly good productId.
 */
const resolveReferenceImages = async (params) => {
  if (params.images) return params;

  const images = [];
  if (params.productId) {
    const product = await api(`/products/${params.productId}`);
    if (product.packshotUrl) images.push({ url: product.packshotUrl, role: 'product' });
  }
  if (params.creatorId) {
    const creator = await api(`/creators/${params.creatorId}`);
    if (creator.avatarUrl) images.push({ url: creator.avatarUrl, role: 'identity' });
  }
  if (images.length === 0) throw new Error(`reference node resolved no images from ${JSON.stringify(params)}`);
  return { ...params, images };
};

/**
 * Execution order for every node in the spec.
 *
 * Input nodes are not exempt: `prompt`, `import` and `reference` run
 * server-side too (as synchronous echo nodes), and a generate node whose
 * upstream has never run returns 409 upstream_not_ready. So everything runs,
 * ancestors first.
 */
const topoOrder = (spec) => {
  const deps = new Map(spec.nodes.map((n) => [n.key, new Set()]));
  for (const [from, , to] of spec.edges) deps.get(to)?.add(from);

  const ordered = [];
  const done = new Set();
  while (ordered.length < spec.nodes.length) {
    const ready = spec.nodes.filter((n) => !done.has(n.key) && [...deps.get(n.key)].every((d) => done.has(d)));
    if (ready.length === 0) throw new Error('cycle in lesson spec edges');
    for (const n of ready) {
      ordered.push(n.key);
      done.add(n.key);
    }
  }
  return ordered;
};

/**
 * Run one node and wait for it to leave `running`.
 *
 * Re-running a node whose params and upstream are unchanged is free and served
 * from cache, so a re-invocation of this script after a partial failure does
 * not regenerate what already landed.
 */
const runNode = async (runId, nodeId, label) => {
  process.stdout.write(`  ${label} … `);

  // Already landed on an earlier pass: nothing to run, and nothing to pace for.
  // Without this a retry pass spends its whole pacing budget re-confirming
  // work that is already done.
  const before = await api(`/studio/runs/${runId}/graph`);
  if (before.nodes.find((n) => n.id === nodeId)?.status === 'completed') {
    console.log('completed (cached)');
    return 'cached';
  }

  try {
    await api(`/graph/nodes/${nodeId}/run`, { method: 'POST', body: { force: false } });
  } catch (error) {
    if (/node_already_running/.test(error.message)) {
      // Already in flight — fall through and poll it.
    } else if (/upstream_not_ready/.test(error.message)) {
      // An ancestor failed earlier in this pass. Soft-fail so the retry pass
      // can pick this up once the upstream lands, instead of killing the build.
      console.log('upstream not ready');
      return false;
    } else {
      throw error;
    }
  }

  const deadline = Date.now() + 15 * 60 * 1000;
  while (Date.now() < deadline) {
    await sleep(5000);
    const graph = await api(`/studio/runs/${runId}/graph`);
    const node = graph.nodes.find((n) => n.id === nodeId);
    if (!node) throw new Error(`node ${nodeId} vanished`);
    if (node.status === 'running' || node.status === 'queued') continue;
    if (node.status === 'failed') {
      console.log(`FAILED — ${String(node.error).slice(0, 160)}`);
      return false;
    }
    console.log(node.status);
    return node.status === 'completed';
  }
  console.log('TIMED OUT');
  return false;
};

const main = async () => {
  const slug = process.argv[2];
  const dry = process.argv.includes('--dry');
  const spec = lessonSpecs[slug];
  if (!spec) {
    console.error(`usage: node scripts/lessons/build-runs.mjs <${Object.keys(lessonSpecs).join('|')}>`);
    process.exit(1);
  }

  const order = topoOrder(spec);
  console.log(`${spec.name}\n  ${spec.nodes.length} nodes, ${spec.edges.length} edges`);
  if (dry) {
    for (const key of order) {
      const n = spec.nodes.find((x) => x.key === key);
      console.log(`    ${key.padEnd(18)} ${n.type}`);
    }
    return;
  }

  const existing = JSON.parse(await readFile(RUNS_FILE, 'utf8').catch(() => '{}'));
  const reusable = !process.argv.includes('--fresh') && existing[slug];

  // Re-apply spec positions to an existing run. Only x/y move, never params —
  // a param change restales the node and would throw away a good generation.
  if (process.argv.includes('--layout')) {
    if (!reusable) throw new Error(`no existing run for "${slug}" to re-layout`);
    for (const node of spec.nodes) {
      const id = reusable.nodes[node.key];
      if (!id) continue;
      await api(`/graph/nodes/${id}`, { method: 'PATCH', body: { positionX: node.x, positionY: node.y } });
    }
    console.log(`  re-laid out ${spec.nodes.length} nodes on ${reusable.runId}`);
    return;
  }

  let runId;
  let ids;
  if (reusable) {
    ({ runId, nodes: ids } = reusable);
    console.log(`  reusing run: ${runId}`);
  } else {
    const run = await api('/studio/runs', { method: 'POST', body: { name: spec.name, source: 'skill' } });
    runId = run.id ?? run.runId;
    console.log(`  run: ${runId}`);

    ids = {};
    for (const node of spec.nodes) {
      const params = node.type === 'reference' ? await resolveReferenceImages(node.params) : node.params;
      const created = await api(`/studio/runs/${runId}/graph/nodes`, {
        method: 'POST',
        body: { type: node.type, params, title: node.title, positionX: node.x, positionY: node.y },
      });
      ids[node.key] = created.id;
    }
    console.log(`  created ${Object.keys(ids).length} nodes`);

    for (const [from, sourcePort, to, targetPort, sortOrder = 0] of spec.edges) {
      await api(`/studio/runs/${runId}/graph/edges`, {
        method: 'POST',
        body: { sourceNodeId: ids[from], sourcePort, targetNodeId: ids[to], targetPort, sortOrder },
      });
    }
    console.log(`  wired ${spec.edges.length} edges`);

    // Persist before running: if a generation fails the graph is still addressable.
    existing[slug] = { runId, nodes: ids };
    await writeFile(RUNS_FILE, `${JSON.stringify(existing, null, 2)}\n`, 'utf8');
    console.log('  wrote runs.json');
  }

  console.log('  running nodes:');
  const pass = async (keys) => {
    const failed = [];
    for (const key of keys) {
      const result = await runNode(runId, ids[key], key);
      if (result === false) failed.push(key);
      if (result === 'cached') continue;

      // xAI rate-limits a burst of image *edits* (429) and a node that trips it
      // fails outright rather than queueing, so that path needs real spacing.
      // The video path has been reliable back-to-back, so it pays a token gap.
      const type = spec.nodes.find((n) => n.key === key)?.type ?? '';
      if (type === 'generate_image') await sleep(PACE_MS);
      else if (type.startsWith('generate_')) await sleep(Math.min(PACE_MS, 15000));
    }
    return failed;
  };

  let failed = await pass(order);
  for (let attempt = 1; attempt <= RETRIES && failed.length > 0; attempt += 1) {
    console.log(`  retry ${attempt}: ${failed.join(', ')} (after a ${BACKOFF_MS / 1000}s backoff)`);
    await sleep(BACKOFF_MS);
    // Nodes that already completed are served from cache, so a retry only
    // re-bills the ones that actually need another attempt.
    failed = await pass(failed);
  }

  console.log(`\n  ${STUDIO_ORIGIN}/studio/runs/${runId}`);
  if (failed.length) console.log(`  still failing: ${failed.join(', ')} — inspect before recording.`);
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

/**
 * Inspect the studio runs a lesson can be recorded against.
 *
 *   node scripts/lessons/prepare-runs.mjs            # list runs
 *   node scripts/lessons/prepare-runs.mjs <runId>    # show one run's graph
 *
 * This only reads. Building a graph through the API is free, but *running* a
 * generation node spends real credits, so nothing here creates or executes
 * anything — you pick a run whose nodes are already finished, then write its
 * ids into scripts/lessons/runs.json:
 *
 *   {
 *     "first-ai-video": {
 *       "runId": "run_…",
 *       "nodes": { "prompt": "gn_…", "keyframe": "gn_…", "motion": "gn_…" }
 *     }
 *   }
 *
 * The logical names on the right are the ones scripts/lessons/plans.mjs asks
 * for; a lesson fails loudly at record time if one is missing.
 */
import { readFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { STUDIO_ORIGIN } from './config.mjs';

const tokenPath = join(homedir(), '.shot', 'token');

const api = async (path) => {
  const token = (await readFile(tokenPath, 'utf8')).trim();
  const res = await fetch(`${STUDIO_ORIGIN}/api${path}`, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error(`${path} → ${res.status} ${res.statusText}`);
  return res.json();
};

const listRuns = async () => {
  const { items } = await api('/studio/runs?limit=40');
  console.log(`${items.length} runs\n`);
  for (const run of items) {
    const done = run.completedShotCount ?? 0;
    const total = run.shotCount ?? 0;
    const final = run.finalVideoUrl ? ' · has final video' : '';
    console.log(`${run.id}  ${String(run.status).padEnd(8)} ${done}/${total} shots${final}`);
    console.log(`  ${run.name}\n`);
  }
  console.log('Inspect one:  node scripts/lessons/prepare-runs.mjs <runId>');
};

const showGraph = async (runId) => {
  const graph = await api(`/studio/runs/${runId}/graph`);
  const nodes = graph.nodes ?? [];
  const edges = graph.edges ?? [];
  console.log(`${runId} — ${nodes.length} nodes, ${edges.length} edges\n`);

  for (const node of nodes) {
    const title = node.title ? ` "${node.title}"` : '';
    const model = node.params?.model ? ` model=${node.params.model}` : '';
    console.log(`${node.id}  ${String(node.type).padEnd(16)} ${String(node.status ?? '—').padEnd(10)}${title}${model}`);
  }

  console.log('\nEdges:');
  for (const edge of edges) {
    console.log(`  ${edge.sourceNodeId}:${edge.sourcePort} → ${edge.targetNodeId}:${edge.targetPort}`);
  }
};

const main = async () => {
  const arg = process.argv[2];
  if (arg) await showGraph(arg);
  else await listRuns();
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

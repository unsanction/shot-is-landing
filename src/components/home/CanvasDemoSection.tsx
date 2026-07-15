import { useEffect, useMemo, useState } from 'react';
import { track, trackStudioClick, withUtm } from '../../lib/track';

type DemoPhase = 'idle' | 'running-initial' | 'complete' | 'edited' | 'running-stale' | 'variant-complete';
type DemoNodeId = 'import' | 'prompt' | 'image' | 'video' | 'composer';
type DemoNodeStatus = 'waiting' | 'running' | 'fresh' | 'stale';

type PromptPreset = {
  id: 'studio' | 'neon';
  label: string;
  prompt: string;
  poster: string;
  video: string;
};

const presets: PromptPreset[] = [
  {
    id: 'studio',
    label: 'Studio impact',
    prompt: 'Premium product reveal. Hard light, macro texture, fast match cuts.',
    poster: '/media/reel/visual-overload-poster.jpg',
    video: '/media/reel/visual-overload.mp4',
  },
  {
    id: 'neon',
    label: 'Neon energy',
    prompt: 'Night campaign. Red neon, kinetic camera, bold creator energy.',
    poster: '/media/hero/shot-hero-poster.webp',
    video: '/media/hero/shot-hero-loop.mp4',
  },
];

const initialOrder: DemoNodeId[] = ['import', 'prompt', 'image', 'video', 'composer'];
const staleOrder: DemoNodeId[] = ['image', 'video', 'composer'];

const nodeCopy: Record<DemoNodeId, { eyebrow: string; title: string; meta: string }> = {
  import: { eyebrow: 'Input · image', title: 'Product reference', meta: 'product-packshot.jpg' },
  prompt: { eyebrow: 'Input · text', title: 'Creative direction', meta: 'Editable prompt' },
  image: { eyebrow: 'Generation · image', title: 'Generate image', meta: 'Grok Imagine · 9:16' },
  video: { eyebrow: 'Generation · video', title: 'Generate video', meta: 'Kling · 5 sec · 1080p' },
  composer: { eyebrow: 'Assembly · video', title: 'Composer', meta: 'Cut · vertical · 1080p' },
};

const statusLabel: Record<DemoNodeStatus, string> = {
  waiting: 'waiting',
  running: 'running',
  fresh: 'fresh',
  stale: 'stale',
};

function DemoNode({
  id,
  status,
  preset,
}: {
  id: DemoNodeId;
  status: DemoNodeStatus;
  preset: PromptPreset;
}) {
  const copy = nodeCopy[id];

  return (
    <article className={`canvas-demo-node canvas-demo-node--${id} is-${status}`} data-node={id}>
      <div className="canvas-demo-node__head">
        <span>{copy.eyebrow}</span>
        <span className={`canvas-demo-status canvas-demo-status--${status}`}>
          {status === 'running' ? <span className="canvas-demo-spinner" aria-hidden="true" /> : null}
          {statusLabel[status]}
        </span>
      </div>
      <div className="canvas-demo-node__body">
        <h3>{copy.title}</h3>
        {id === 'import' ? (
          <div className="canvas-demo-thumb">
            <img src="/media/reel/visual-overload-poster.jpg" alt="Product reference used by the demo workflow" />
          </div>
        ) : null}
        {id === 'prompt' ? <p className="canvas-demo-prompt">{preset.prompt}</p> : null}
        {id === 'image' ? (
          <div className="canvas-demo-thumb canvas-demo-thumb--generated">
            <img src={preset.poster} alt="Generated campaign keyframe" />
          </div>
        ) : null}
        {id === 'video' ? <div className="canvas-demo-wave" aria-hidden="true"><i /><i /><i /><i /><i /></div> : null}
        {id === 'composer' ? (
          <div className="canvas-demo-timeline" aria-hidden="true"><i /><i /><i /></div>
        ) : null}
        <p className="canvas-demo-node__meta">{copy.meta}</p>
      </div>
      <span className="canvas-demo-port canvas-demo-port--in" aria-hidden="true" />
      <span className="canvas-demo-port canvas-demo-port--out" aria-hidden="true" />
    </article>
  );
}

export function CanvasDemoSection() {
  const [phase, setPhase] = useState<DemoPhase>('idle');
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPresetId, setSelectedPresetId] = useState<PromptPreset['id']>('studio');
  const [renderedPresetId, setRenderedPresetId] = useState<PromptPreset['id']>('studio');
  const [reducedMotion, setReducedMotion] = useState(false);

  const selectedPreset = presets.find((preset) => preset.id === selectedPresetId) ?? presets[0];
  const renderedPreset = presets.find((preset) => preset.id === renderedPresetId) ?? presets[0];
  const isRunning = phase === 'running-initial' || phase === 'running-stale';
  const hasOutput = phase !== 'idle' && phase !== 'running-initial';
  const outputIsStale = phase === 'edited' || phase === 'running-stale';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!isRunning) return;
    const order = phase === 'running-initial' ? initialOrder : staleOrder;
    const delay = reducedMotion ? 80 : 620;
    const timer = window.setTimeout(() => {
      if (activeStep < order.length - 1) {
        setActiveStep((step) => step + 1);
        return;
      }
      setRenderedPresetId(selectedPresetId);
      setPhase(phase === 'running-initial' ? 'complete' : 'variant-complete');
      setActiveStep(0);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [activeStep, isRunning, phase, reducedMotion, selectedPresetId]);

  const statuses = useMemo<Record<DemoNodeId, DemoNodeStatus>>(() => {
    if (phase === 'idle') {
      return { import: 'waiting', prompt: 'waiting', image: 'waiting', video: 'waiting', composer: 'waiting' };
    }
    if (phase === 'running-initial') {
      return Object.fromEntries(
        initialOrder.map((id, index) => [id, index < activeStep ? 'fresh' : index === activeStep ? 'running' : 'waiting']),
      ) as Record<DemoNodeId, DemoNodeStatus>;
    }
    if (phase === 'edited') {
      return { import: 'fresh', prompt: 'fresh', image: 'stale', video: 'stale', composer: 'stale' };
    }
    if (phase === 'running-stale') {
      const downstream = Object.fromEntries(
        staleOrder.map((id, index) => [id, index < activeStep ? 'fresh' : index === activeStep ? 'running' : 'stale']),
      ) as Pick<Record<DemoNodeId, DemoNodeStatus>, 'image' | 'video' | 'composer'>;
      return { import: 'fresh', prompt: 'fresh', ...downstream };
    }
    return { import: 'fresh', prompt: 'fresh', image: 'fresh', video: 'fresh', composer: 'fresh' };
  }, [activeStep, phase]);

  const runInitial = () => {
    if (isRunning) return;
    setActiveStep(0);
    setPhase('running-initial');
    track('canvas_demo_run', { preset: selectedPresetId });
  };

  const runStale = () => {
    if (phase !== 'edited') return;
    setActiveStep(0);
    setPhase('running-stale');
    track('canvas_demo_run_stale', { preset: selectedPresetId, node_count: 3 });
  };

  const selectPreset = (preset: PromptPreset) => {
    if (isRunning || preset.id === selectedPresetId) return;
    setSelectedPresetId(preset.id);
    if (hasOutput) setPhase(preset.id === renderedPresetId ? 'variant-complete' : 'edited');
    track('canvas_demo_prompt_change', { preset: preset.id });
  };

  const replay = () => {
    setSelectedPresetId('studio');
    setRenderedPresetId('studio');
    setActiveStep(0);
    setPhase('idle');
    track('canvas_demo_replay');
  };

  const liveMessage = isRunning
    ? `${nodeCopy[(phase === 'running-initial' ? initialOrder : staleOrder)[activeStep]].title} is running.`
    : outputIsStale
      ? 'Three downstream nodes need to be refreshed.'
      : hasOutput
        ? 'Workflow complete. Final video is ready.'
        : 'Demo ready to run.';

  return (
    <section id="canvas" className="canvas-demo-section" data-testid="canvas-demo">
      <div className="mx-auto max-w-7xl">
        <div className="canvas-demo-intro">
          <div>
            <p className="canvas-demo-kicker">Canvas mode · Interactive demo</p>
            <h2>Build the whole ad.<br /><span>Change only what matters.</span></h2>
          </div>
          <div className="canvas-demo-intro__copy">
            <p>
              Wire references, prompts, image and video models into one re-runnable production graph. Change one input
              and Canvas keeps every approved result that is still fresh.
            </p>
            <a href="/blog/canvas-mode-node-based-ai-video-workflow">How Canvas works ↗</a>
          </div>
        </div>

        <div className="canvas-demo-shell">
          <div className="canvas-demo-toolbar">
            <div>
              <span className="canvas-demo-toolbar__dot" />
              <span>PRODUCT LAUNCH / 9:16 CAMPAIGN</span>
            </div>
            <div className="canvas-demo-toolbar__meta">
              <span>{Object.values(statuses).filter((status) => status === 'fresh').length}/5 fresh</span>
              <span>Server-side graph</span>
            </div>
          </div>

          <div className="canvas-demo-workspace">
            <div className="canvas-demo-board" aria-label="Example AI video production graph">
              <svg className="canvas-demo-edges" viewBox="0 0 1000 550" preserveAspectRatio="none" aria-hidden="true">
                <path className={statuses.image === 'stale' ? 'is-stale' : statuses.image !== 'waiting' ? 'is-active' : ''} d="M220 140 C265 140 245 245 290 245" />
                <path className={statuses.image === 'stale' ? 'is-stale' : statuses.image !== 'waiting' ? 'is-active' : ''} d="M220 415 C265 415 245 300 290 300" />
                <path className={statuses.video === 'stale' ? 'is-stale' : statuses.video !== 'waiting' ? 'is-active' : ''} d="M490 275 C515 275 525 275 550 275" />
                <path className={statuses.composer === 'stale' ? 'is-stale' : statuses.composer !== 'waiting' ? 'is-active' : ''} d="M750 275 C770 275 780 275 800 275" />
              </svg>
              {initialOrder.map((id, index) => (
                <div className="canvas-demo-node-wrap" key={id}>
                  {index > 0 ? <span className="canvas-demo-mobile-connector" aria-hidden="true" /> : null}
                  <DemoNode id={id} status={statuses[id]} preset={selectedPreset} />
                </div>
              ))}
            </div>

            <aside className="canvas-demo-output">
              <div className="canvas-demo-output__head">
                <div>
                  <span>FINAL OUTPUT</span>
                  <strong>{hasOutput ? 'campaign-cut.mp4' : 'Awaiting render'}</strong>
                </div>
                {hasOutput ? <span className={outputIsStale ? 'is-stale' : 'is-ready'}>{outputIsStale ? 'outdated' : 'ready'}</span> : null}
              </div>
              <div className="canvas-demo-video-frame">
                {hasOutput ? (
                  <video
                    key={renderedPreset.id}
                    controls
                    playsInline
                    preload="metadata"
                    poster={renderedPreset.poster}
                    aria-label={`Final video for ${renderedPreset.label}`}
                  >
                    <source src={renderedPreset.video} type="video/mp4" />
                  </video>
                ) : (
                  <div className="canvas-demo-video-empty">
                    <span>▶</span>
                    <p>Run the graph to render<br />your campaign video.</p>
                  </div>
                )}
                {outputIsStale ? <div className="canvas-demo-video-stale">Previous render<br /><strong>3 changes pending</strong></div> : null}
              </div>
              <dl className="canvas-demo-output__specs">
                <div><dt>Format</dt><dd>1080 × 1920</dd></div>
                <div><dt>Pipeline</dt><dd>5 nodes</dd></div>
                <div><dt>Re-run</dt><dd>{outputIsStale ? '3 nodes' : '0 nodes'}</dd></div>
              </dl>
            </aside>
          </div>

          <div className="canvas-demo-controls">
            <div className="canvas-demo-presets" aria-label="Creative direction presets">
              <span>CHANGE PROMPT</span>
              <div>
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    disabled={isRunning}
                    aria-pressed={preset.id === selectedPresetId}
                    onClick={() => selectPreset(preset)}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="canvas-demo-actions">
              {hasOutput && !isRunning ? <button type="button" className="canvas-demo-reset" onClick={replay}>Replay</button> : null}
              <button
                type="button"
                className="canvas-demo-run"
                disabled={isRunning || (hasOutput && phase !== 'edited')}
                onClick={phase === 'edited' ? runStale : runInitial}
              >
                {isRunning ? 'Running…' : phase === 'edited' ? 'Run changed nodes (3)' : hasOutput ? 'All nodes fresh' : 'Run workflow'}
                <span aria-hidden="true">▶</span>
              </button>
            </div>
          </div>
          <p className="sr-only" aria-live="polite">{liveMessage}</p>
        </div>

        <div className="canvas-demo-foot">
          <p><strong>One graph.</strong> Every asset, model, branch and final render — visible and reusable.</p>
          <a
            href={withUtm('https://studio.shot.is/', 'canvas_demo')}
            onClick={() => trackStudioClick('canvas_demo')}
          >
            Open Canvas in Studio <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

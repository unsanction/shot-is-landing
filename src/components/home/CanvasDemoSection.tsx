import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  demoNodes,
  demoPresets,
  defaultPresetId,
  generatedNodeIds,
  nodeLogLines,
  referenceFile,
  referenceImage,
  type DemoNode,
  type DemoNodeId,
  type DemoNodeStatus,
  type DemoPreset,
} from '../../data/canvasDemo';
import { track, trackStudioClick, withUtm } from '../../lib/track';
import { useReducedMotion } from '../../hooks/useReducedMotion';

type Phase = 'idle' | 'running' | 'done' | 'dirty';

type Edge = { id: string; from: DemoNodeId; to: DemoNodeId; d: string };

const statusLabel: Record<DemoNodeStatus, string> = {
  idle: 'idle',
  queued: 'queued',
  running: 'running',
  fresh: 'fresh',
  cached: 'cached',
  stale: 'stale',
};

/* The page is prerendered, and useLayoutEffect is a no-op (and warns) on the
   server. Edge measurement is client-only anyway. */
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const idleStatuses = () =>
  Object.fromEntries(demoNodes.map((node) => [node.id, 'idle'])) as Record<DemoNodeId, DemoNodeStatus>;

const zeroProgress = () =>
  Object.fromEntries(demoNodes.map((node) => [node.id, 0])) as Record<DemoNodeId, number>;

/** Seconds a human would burn re-doing a node by hand — used for the cache readout. */
const MANUAL_SECONDS_PER_NODE = 14;

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="cx-progress" aria-hidden="true">
      <i style={{ transform: `scaleX(${value})` }} />
    </div>
  );
}

function NodeBody({
  node,
  status,
  preset,
  autoplay,
}: {
  node: DemoNode;
  status: DemoNodeStatus;
  preset: DemoPreset;
  autoplay: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const settled = status === 'fresh' || status === 'cached';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (settled && autoplay) {
      void video.play().catch(() => {
        /* Autoplay can be refused; the poster stays visible. */
      });
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [settled, autoplay, preset.id]);

  const busy = status === 'running' ? 'is-generating' : '';

  /* Generated nodes have nothing to show until the graph has run once. */
  if (!node.isInput && (status === 'idle' || status === 'queued')) {
    return (
      <>
        <div className="cx-media cx-media--empty">
          <span aria-hidden="true">{status === 'queued' ? 'queued' : 'no output yet'}</span>
        </div>
        <p className="cx-meta">{node.id === 'composer' ? 'awaiting upstream' : preset.imageModel.split(' · ')[0]}</p>
      </>
    );
  }

  switch (node.id) {
    case 'reference':
      return (
        <>
          <div className="cx-media cx-media--ref">
            <img src={referenceImage} alt="Product packshot used as the campaign reference" loading="lazy" decoding="async" />
          </div>
          <p className="cx-meta">{referenceFile}</p>
        </>
      );

    case 'direction':
      return (
        <>
          <div className="cx-media cx-media--prompt">
            <p>{preset.prompt}</p>
          </div>
          <p className="cx-meta">
            <span className="cx-chip">editable</span> 1 of {demoPresets.length} directions
          </p>
        </>
      );

    case 'keyframe':
      return (
        <>
          <div className={`cx-media cx-media--gen ${busy}`}>
            <img key={preset.keyframe} src={preset.keyframe} alt={preset.keyframeAlt} loading="lazy" decoding="async" />
            {status === 'running' ? <span className="cx-scan" aria-hidden="true" /> : null}
          </div>
          <p className="cx-meta">{preset.imageModel}</p>
        </>
      );

    case 'motion':
      return (
        <>
          <div className={`cx-media cx-media--motion ${busy}`}>
            <video
              ref={videoRef}
              key={preset.motionClip}
              src={preset.motionClip}
              poster={preset.motionPoster}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
            />
            {status === 'running' ? <span className="cx-scan" aria-hidden="true" /> : null}
            {settled ? <span className="cx-badge">loop</span> : null}
          </div>
          <p className="cx-meta">{preset.videoModel}</p>
        </>
      );

    case 'composer':
      return (
        <>
          <div className="cx-media cx-media--strip">
            <div className="cx-strip" aria-hidden="true">
              {preset.strip.map((frame, index) => (
                <span key={`${frame}-${index}`} style={{ backgroundImage: `url(${frame})` }} />
              ))}
            </div>
            <div className="cx-timeline" aria-hidden="true">
              <i style={{ width: '38%' }} />
              <i style={{ width: '26%' }} className="is-accent" />
              <i style={{ width: '36%' }} />
            </div>
          </div>
          <p className="cx-meta">
            {preset.cuts} cuts · {preset.seconds}s · 1080×1920
          </p>
        </>
      );

    default:
      return null;
  }
}

export function CanvasDemoSection() {
  const reducedMotion = useReducedMotion();

  const [phase, setPhase] = useState<Phase>('idle');
  const [statuses, setStatuses] = useState<Record<DemoNodeId, DemoNodeStatus>>(idleStatuses);
  const [progress, setProgress] = useState<Record<DemoNodeId, number>>(zeroProgress);
  const [log, setLog] = useState<string[]>([]);
  const [queue, setQueue] = useState<DemoNodeId[]>([]);
  const [step, setStep] = useState(0);
  const [selectedId, setSelectedId] = useState<DemoPreset['id']>(defaultPresetId);
  const [renderedId, setRenderedId] = useState<DemoPreset['id']>(defaultPresetId);
  const [soundOn, setSoundOn] = useState(false);

  const selected = demoPresets.find((preset) => preset.id === selectedId) ?? demoPresets[0];
  const rendered = demoPresets.find((preset) => preset.id === renderedId) ?? demoPresets[0];

  const isRunning = phase === 'running';
  const hasOutput = phase === 'done' || phase === 'dirty';
  const isDirty = phase === 'dirty';
  const cachedCount = Object.values(statuses).filter((status) => status === 'cached').length;
  const freshCount = Object.values(statuses).filter((status) => status === 'fresh' || status === 'cached').length;

  /* ---- run engine -------------------------------------------------- */

  const runningNode = isRunning ? queue[step] : undefined;

  useEffect(() => {
    if (!isRunning) return;
    const nodeId = queue[step];

    if (!nodeId) {
      setPhase('done');
      setRenderedId(selectedId);
      setLog((lines) => [...lines, `done · ${queue.length} node${queue.length === 1 ? '' : 's'} executed`].slice(-40));
      return;
    }

    const node = demoNodes.find((candidate) => candidate.id === nodeId)!;
    const runtime = reducedMotion ? 120 : node.runtime;
    const tick = 60;
    const started = performance.now();

    setStatuses((current) => ({ ...current, [nodeId]: 'running' }));

    const timer = window.setInterval(() => {
      const ratio = Math.min(1, (performance.now() - started) / runtime);
      setProgress((current) => ({ ...current, [nodeId]: ratio }));

      if (ratio < 1) return;
      window.clearInterval(timer);
      setStatuses((current) => ({ ...current, [nodeId]: 'fresh' }));
      setLog((lines) => [...lines, nodeLogLines[nodeId](selected)].slice(-40));
      setStep((current) => current + 1);
    }, tick);

    return () => window.clearInterval(timer);
  }, [isRunning, queue, step, reducedMotion, selected, selectedId]);

  const startRun = useCallback(
    (ids: DemoNodeId[], event: string) => {
      setQueue(ids);
      setStep(0);
      setProgress(zeroProgress());
      setStatuses((current) => {
        const next = { ...current };
        ids.forEach((id) => {
          next[id] = 'queued';
        });
        return next;
      });
      setPhase('running');
      track(event, { preset: selectedId, node_count: ids.length });
    },
    [selectedId],
  );

  const runAll = () => {
    setLog([`run graph · ${demoNodes.length} nodes · direction "${selected.label.toLowerCase()}"`]);
    startRun(
      demoNodes.map((node) => node.id),
      'canvas_demo_run',
    );
  };

  const runChanged = () => {
    setLog((lines) => [...lines, `re-run · ${generatedNodeIds.length} stale · ${cachedCount} cached`].slice(-40));
    startRun(generatedNodeIds, 'canvas_demo_run_stale');
  };

  const selectPreset = (preset: DemoPreset) => {
    if (isRunning || preset.id === selectedId) return;
    setSelectedId(preset.id);
    track('canvas_demo_prompt_change', { preset: preset.id });

    if (phase === 'idle') return;

    if (preset.id === renderedId) {
      setPhase('done');
      setStatuses((current) => {
        const next = { ...current };
        demoNodes.forEach((node) => {
          next[node.id] = 'fresh';
        });
        return next;
      });
      return;
    }

    setPhase('dirty');
    setStatuses((current) => {
      const next = { ...current };
      next.reference = 'cached';
      next.direction = 'fresh';
      generatedNodeIds.forEach((id) => {
        next[id] = 'stale';
      });
      return next;
    });
    setLog((lines) => [...lines, `direction changed → ${generatedNodeIds.length} nodes stale`].slice(-40));
  };

  const reset = () => {
    setPhase('idle');
    setStatuses(idleStatuses());
    setProgress(zeroProgress());
    setQueue([]);
    setStep(0);
    setLog([]);
    setSelectedId(defaultPresetId);
    setRenderedId(defaultPresetId);
    track('canvas_demo_replay');
  };

  /* The graph plays itself the first time it scrolls into view, so the
     section never sits there as five empty slots waiting for a click. */
  const sectionRef = useRef<HTMLElement>(null);
  const autoRunRef = useRef(false);
  const runAllRef = useRef(runAll);
  runAllRef.current = runAll;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting) || autoRunRef.current) return;
        autoRunRef.current = true;
        observer.disconnect();
        runAllRef.current();
      },
      { threshold: 0.25 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  /* ---- edges measured from the real node ports ---------------------- */

  const boardRef = useRef<HTMLDivElement>(null);
  const portRefs = useRef(new Map<string, HTMLSpanElement>());
  const [edges, setEdges] = useState<Edge[]>([]);
  const [boardBox, setBoardBox] = useState({ width: 0, height: 0 });

  const setPort = useCallback((key: string, element: HTMLSpanElement | null) => {
    if (element) portRefs.current.set(key, element);
    else portRefs.current.delete(key);
  }, []);

  const measure = useCallback(() => {
    const board = boardRef.current;
    if (!board) return;
    const box = board.getBoundingClientRect();
    if (!box.width) return;

    const next: Edge[] = [];
    demoNodes.forEach((node) => {
      node.inputs.forEach((input) => {
        const from = portRefs.current.get(`${input}:out`);
        const to = portRefs.current.get(`${node.id}:in`);
        if (!from || !to) return;
        const a = from.getBoundingClientRect();
        const b = to.getBoundingClientRect();
        const x1 = a.left + a.width / 2 - box.left;
        const y1 = a.top + a.height / 2 - box.top;
        const x2 = b.left + b.width / 2 - box.left;
        const y2 = b.top + b.height / 2 - box.top;
        const bend = Math.max(26, (x2 - x1) * 0.55);
        next.push({
          id: `${input}->${node.id}`,
          from: input,
          to: node.id,
          d: `M ${x1},${y1} C ${x1 + bend},${y1} ${x2 - bend},${y2} ${x2},${y2}`,
        });
      });
    });

    setBoardBox({ width: box.width, height: box.height });
    setEdges(next);
  }, []);

  useIsomorphicLayoutEffect(() => {
    measure();
  }, [measure, selectedId, statuses]);

  useEffect(() => {
    const board = boardRef.current;
    if (!board || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(() => measure());
    observer.observe(board);
    board.querySelectorAll('.cx-node').forEach((node) => observer.observe(node));
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  /* ---- final output video ------------------------------------------ */

  const outputRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = outputRef.current;
    if (!video || !hasOutput) return;
    video.muted = !soundOn;
    if (reducedMotion) return;
    void video.play().catch(() => {
      /* Autoplay can be refused; the poster stays visible. */
    });
  }, [hasOutput, renderedId, soundOn, reducedMotion]);

  const edgeState = (edge: Edge): string => {
    const target = statuses[edge.to];
    if (target === 'stale') return 'is-stale';
    if (target === 'running') return 'is-flowing';
    if (target === 'fresh' || target === 'cached') return 'is-live';
    return '';
  };

  const liveMessage = useMemo(() => {
    if (isRunning && runningNode) return `${demoNodes.find((n) => n.id === runningNode)?.title} is running.`;
    if (isDirty) return `Direction changed. ${generatedNodeIds.length} nodes need a re-run, ${cachedCount} stay cached.`;
    if (hasOutput) return `Workflow complete. ${rendered.outputName} is ready.`;
    return 'Demo graph ready to run.';
  }, [isRunning, runningNode, isDirty, hasOutput, cachedCount, rendered.outputName]);

  const runLabel = isRunning
    ? `Running ${step + 1}/${queue.length}…`
    : isDirty
      ? `Re-run ${generatedNodeIds.length} stale nodes`
      : hasOutput
        ? 'All nodes fresh'
        : 'Run workflow';

  return (
    <section id="canvas" className="cx-section" data-testid="canvas-demo" ref={sectionRef}>
      <div className="cx-wrap">
        <header className="cx-intro">
          <div>
            <p className="cx-kicker">Canvas mode · interactive demo</p>
            <h2>
              Build the whole ad.
              <br />
              <span>Re-run only what changed.</span>
            </h2>
          </div>
          <div className="cx-intro__aside">
            <p>
              References, prompts, image and video models wired into one re-runnable graph. Swap a creative direction
              and Canvas keeps every approved result that is still valid.
            </p>
            <a href="/blog/canvas-mode-node-based-ai-video-workflow">How Canvas works ↗</a>
          </div>
        </header>

        <div className="cx-shell">
          <div className="cx-toolbar">
            <span className="cx-toolbar__project">
              <i className="cx-dot" aria-hidden="true" />
              gorilla-energy / 9:16 launch
            </span>
            <span className="cx-toolbar__meta">
              <span>
                <b>{freshCount}</b>/{demoNodes.length} fresh
              </span>
              <span>server-side graph</span>
            </span>
          </div>

          <div className="cx-workspace">
            <div className="cx-board" ref={boardRef} aria-label="Example AI video production graph">
              <svg
                className="cx-edges"
                viewBox={`0 0 ${boardBox.width || 1} ${boardBox.height || 1}`}
                width={boardBox.width || undefined}
                height={boardBox.height || undefined}
                aria-hidden="true"
              >
                {edges.map((edge) => (
                  <g key={edge.id} className={`cx-edge ${edgeState(edge)}`}>
                    <path className="cx-edge__base" d={edge.d} />
                    <path className="cx-edge__flow" d={edge.d} />
                  </g>
                ))}
              </svg>

              {demoNodes.map((node, index) => {
                const status = statuses[node.id];
                return (
                  <article key={node.id} className={`cx-node cx-node--${node.id} is-${status}`} data-node={node.id}>
                    {index > 0 ? <span className={`cx-rail is-${status}`} aria-hidden="true" /> : null}
                    <div className="cx-node__head">
                      <span className="cx-step" aria-hidden="true">
                        {index + 1}
                      </span>
                      <span className="cx-node__kind">{node.kind}</span>
                      <span className={`cx-status cx-status--${status}`}>
                        {status === 'running' ? <i className="cx-spinner" aria-hidden="true" /> : null}
                        {statusLabel[status]}
                      </span>
                    </div>
                    <h3 className="cx-node__title">{node.title}</h3>
                    <NodeBody
                      node={node}
                      status={status}
                      /* A stale node still shows the result it produced last run —
                         the new direction only lands once it is re-executed. */
                      preset={!node.isInput && status === 'stale' ? rendered : selected}
                      autoplay={!reducedMotion}
                    />
                    {status === 'running' ? <ProgressBar value={progress[node.id]} /> : null}
                    {node.inputs.length ? (
                      <span
                        className="cx-port cx-port--in"
                        ref={(element) => setPort(`${node.id}:in`, element)}
                        aria-hidden="true"
                      />
                    ) : null}
                    {node.id !== 'composer' ? (
                      <span
                        className="cx-port cx-port--out"
                        ref={(element) => setPort(`${node.id}:out`, element)}
                        aria-hidden="true"
                      />
                    ) : null}
                  </article>
                );
              })}
            </div>

            <aside className="cx-output">
              <div className="cx-output__head">
                <div>
                  <span>Final output</span>
                  <strong>{hasOutput ? rendered.outputName : 'awaiting render'}</strong>
                </div>
                {hasOutput ? (
                  <span className={isDirty ? 'cx-tag is-stale' : 'cx-tag is-ready'}>{isDirty ? 'outdated' : 'ready'}</span>
                ) : null}
              </div>

              <div className="cx-player">
                {hasOutput ? (
                  <>
                    <video
                      ref={outputRef}
                      key={rendered.id}
                      src={rendered.output}
                      poster={rendered.outputPoster}
                      loop
                      muted={!soundOn}
                      playsInline
                      preload="metadata"
                      aria-label={rendered.outputAlt}
                    />
                    <button
                      type="button"
                      className="cx-sound"
                      onClick={() => setSoundOn((on) => !on)}
                      aria-pressed={soundOn}
                    >
                      {soundOn ? 'Sound on' : 'Sound off'}
                    </button>
                  </>
                ) : (
                  <div className="cx-player__empty">
                    <span aria-hidden="true">▶</span>
                    <p>Run the graph to render the campaign cut.</p>
                  </div>
                )}
                {isDirty ? (
                  <div className="cx-player__veil">
                    <span>previous render</span>
                    <strong>{generatedNodeIds.length} changes pending</strong>
                  </div>
                ) : null}
              </div>

              <dl className="cx-specs">
                <div>
                  <dt>Format</dt>
                  <dd>1080×1920</dd>
                </div>
                <div>
                  <dt>Length</dt>
                  <dd>{hasOutput ? `${rendered.seconds}s` : '—'}</dd>
                </div>
                <div>
                  <dt>Cached</dt>
                  <dd>
                    {cachedCount}/{demoNodes.length}
                  </dd>
                </div>
              </dl>

              {isDirty ? (
                <p className="cx-saving">
                  Re-running {generatedNodeIds.length} of {demoNodes.length} nodes —{' '}
                  <b>~{cachedCount * MANUAL_SECONDS_PER_NODE}s of work reused.</b>
                </p>
              ) : null}
            </aside>
          </div>

          <div className="cx-console" aria-hidden="true">
            <span className="cx-console__label">log</span>
            <div className="cx-console__lines">
              {log.length === 0 ? (
                <p className="is-muted">waiting for run…</p>
              ) : (
                log.slice(-3).map((line, index, all) => (
                  <p key={`${line}-${index}`} className={index === all.length - 1 ? 'is-current' : ''}>
                    <i>›</i>
                    {line}
                  </p>
                ))
              )}
            </div>
          </div>

          <div className="cx-controls">
            <div className="cx-presets">
              <span>Creative direction</span>
              <div role="group" aria-label="Creative direction presets">
                {demoPresets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    disabled={isRunning}
                    aria-pressed={preset.id === selectedId}
                    onClick={() => selectPreset(preset)}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="cx-actions">
              {hasOutput && !isRunning ? (
                <button type="button" className="cx-reset" onClick={reset}>
                  Reset
                </button>
              ) : null}
              <button
                type="button"
                className="cx-run"
                disabled={isRunning || phase === 'done'}
                onClick={isDirty ? runChanged : runAll}
              >
                {runLabel}
                <span aria-hidden="true">▶</span>
              </button>
            </div>
          </div>

          <p className="sr-only" aria-live="polite">
            {liveMessage}
          </p>
        </div>

        <div className="cx-foot">
          <p>
            <strong>One graph.</strong> Every reference, model, branch and final render — visible, cached and reusable.
          </p>
          <a href={withUtm('https://studio.shot.is/', 'canvas_demo')} onClick={() => trackStudioClick('canvas_demo')}>
            Open Canvas in Studio <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

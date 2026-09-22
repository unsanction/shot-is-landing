import { useRef } from 'react';
import type { BlogBlock, BlogPost, BlogScene } from '../../data/blog';
import { renderBlock } from './BlogProse';
import { BlogVisualFigure } from './visuals';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useSceneDriver } from '../../hooks/useSceneDriver';

type Segment = { anchor?: string; heading?: BlogBlock; blocks: BlogBlock[] };

/**
 * Splits the prose at every h2. The article's own headings define the scroll
 * steps, so a scene can only ever be pinned to a section that exists — no
 * parallel outline to keep in sync with the copy.
 */
const segment = (blocks: BlogBlock[]): Segment[] => {
  const segments: Segment[] = [{ blocks: [] }];
  for (const block of blocks) {
    if (block.type === 'h2') {
      segments.push({ anchor: block.id, heading: block, blocks: [] });
    } else {
      segments[segments.length - 1].blocks.push(block);
    }
  }
  // Drop an empty lead when the post opens straight on a heading.
  return segments[0].blocks.length ? segments : segments.slice(1);
};

function Stage({
  scene,
  index,
  total,
  reduced,
}: {
  scene: BlogScene;
  index: number;
  total: number;
  reduced: boolean;
}) {
  return (
    <figure className="bx-stage__card">
      <figcaption className="bx-stage__head">
        <span className="bx-stage__index">
          {String(index).padStart(2, '0')}
          <span className="bx-stage__index-total">/{String(total).padStart(2, '0')}</span>
        </span>
        <span className="bx-stage__label">{scene.label}</span>
      </figcaption>
      <div className="bx-stage__art">
        <BlogVisualFigure visual={scene.visual} reduced={reduced} />
      </div>
      {scene.caption ? <p className="bx-stage__caption">{scene.caption}</p> : null}
    </figure>
  );
}

export function ScrollyArticle({ post, sceneLabel }: { post: BlogPost; sceneLabel: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const active = useSceneDriver(rootRef, reduced);

  const segments = segment(post.blocks);
  const sceneByAnchor = new Map((post.scenes ?? []).map((s) => [s.anchor, s]));

  // Sections without a scene of their own keep the last one on stage, and the
  // lead-in borrows the first — the stage is never empty mid-article.
  const resolved: BlogScene[] = [];
  let carried: BlogScene | undefined = post.scenes?.[0];
  for (const seg of segments) {
    const own = seg.anchor ? sceneByAnchor.get(seg.anchor) : undefined;
    if (own) carried = own;
    resolved.push(carried as BlogScene);
  }

  const activeScene = resolved[active] ?? post.scenes?.[0];
  const rail = segments
    .map((seg, i) => ({ seg, i }))
    .filter(({ seg }) => seg.anchor && sceneByAnchor.has(seg.anchor));

  if (!activeScene) return null;

  return (
    <div ref={rootRef} className="bx-scrolly">
      <div className="mx-auto grid max-w-[78rem] grid-cols-1 gap-x-14 px-5 md:px-8 lg:grid-cols-[minmax(0,33rem)_minmax(0,1fr)]">
        <div>
          {segments.map((seg) => {
            const scene = seg.anchor ? sceneByAnchor.get(seg.anchor) : undefined;
            return (
              <section key={seg.anchor ?? 'lead'} data-scene-section className="bx-scrolly__section">
                {seg.heading ? renderBlock(seg.heading, -1) : null}

                {/* Below the stage breakpoint the visual travels with its section
                    instead of living on a sticky panel there is no room for. */}
                {scene ? (
                  <figure data-scene-figure className="bx-figure lg:hidden">
                    <div className="bx-stage__head">
                      <span className="bx-stage__label">{scene.label}</span>
                    </div>
                    <div className="bx-stage__art">
                      <BlogVisualFigure visual={scene.visual} reduced={reduced} />
                    </div>
                    {scene.caption ? <figcaption className="bx-stage__caption">{scene.caption}</figcaption> : null}
                  </figure>
                ) : null}

                <div className="space-y-6">{seg.blocks.map((block, bi) => renderBlock(block, bi))}</div>
              </section>
            );
          })}
        </div>

        {/* `data-scene-stage` sits on the wrapper, not the card: the card is keyed by
            scene so it can animate in, and the driver needs a node that survives the
            swap. `--p` inherits down to whatever card is mounted. */}
        <div className="hidden lg:block">
          <div className="bx-stage" data-scene-stage>
            <nav className="bx-stage__rail" aria-label={sceneLabel}>
              {rail.map(({ seg, i }) => (
                <a
                  key={seg.anchor}
                  href={`#${seg.anchor}`}
                  className={`bx-stage__tick${i <= active ? ' is-past' : ''}${i === active ? ' is-current' : ''}`}
                  title={seg.heading && seg.heading.type === 'h2' ? seg.heading.text : undefined}
                >
                  <span className="sr-only">
                    {seg.heading && seg.heading.type === 'h2' ? seg.heading.text : seg.anchor}
                  </span>
                </a>
              ))}
            </nav>
            <Stage
              key={activeScene.anchor}
              scene={activeScene}
              index={Math.max(1, rail.findIndex((r) => r.seg.anchor === activeScene.anchor) + 1)}
              total={rail.length}
              reduced={reduced}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

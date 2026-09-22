/*
 * Scene specs for scrollytelling articles.
 *
 * A post opts into the scrollytelling layout by declaring `scenes`. Each scene
 * binds to an h2 `id` already present in `blocks`, so the prose stays the single
 * source of truth for structure — a scene can never invent a section that the
 * article does not have, and an article without scenes renders the classic
 * single-column layout untouched.
 *
 * Visuals are *specs*, not components: the data here describes the argument the
 * section is making (four candidates, one survives), and the renderer decides how
 * to draw it. That keeps the library small while letting every article read as its
 * own thing, because the numbers, labels and ordering come from the article.
 */

/** Emphasis for a single datum. `accent` is the brand red; use it for the point being made. */
export type VisualTone = 'accent' | 'ink' | 'muted';

export type BlogVisual =
  /** Ordered stages with a token travelling through them. `gate` stages reject and loop back. */
  | {
      kind: 'flow';
      steps: Array<{ label: string; note?: string; gate?: boolean }>;
      /** Label on the rejection loop drawn back from the first gate. */
      loopLabel?: string;
    }
  /** A contact sheet where candidates get culled and one survivor is promoted. */
  | {
      kind: 'cull';
      total: number;
      /** 0-based index of the tile that survives. */
      keep: number;
      tile?: 'frame' | 'face' | 'product';
      rejectNote?: string;
      keepNote?: string;
    }
  /** A filmstrip whose subject degrades frame by frame, optionally re-anchored. */
  | {
      kind: 'drift';
      frames: number;
      /** 0-based frame indices where identity resets to the reference. */
      anchors?: number[];
      glyph?: 'face' | 'label' | 'logo';
      driftNote?: string;
      anchorNote?: string;
    }
  /** Comparative bars with values that count up as the section scrolls. */
  | {
      kind: 'bars';
      series: Array<{ label: string; value: number; display: string; tone?: VisualTone; note?: string }>;
      /** Printed under the chart, e.g. "per finished 30s ad". */
      unit?: string;
      note?: string;
    }
  /** Rows × columns strength grid — which model/approach wins which job. */
  | {
      kind: 'matrix';
      cols: string[];
      /** `cells` are 0–3: 0 = no, 3 = best in row. */
      rows: Array<{ label: string; cells: number[] }>;
      legend?: string;
    }
  /** A phone feed being thumbed past, stopping on the card that earns attention. */
  | {
      kind: 'feed';
      cards: Array<{ label: string; hook?: boolean }>;
      /** 0-based index of the card the thumb stops on. */
      stopAt: number;
      meterLabel?: string;
    }
  /** Constraint layers stacking into one locked look (scene bible, identity set). */
  | {
      kind: 'stack';
      layers: Array<{ label: string; note?: string }>;
      baseLabel?: string;
      lockedLabel?: string;
    }
  /** A drawn-on line chart. `points` are 0–1, left to right. */
  | {
      kind: 'curve';
      points: number[];
      xLabels?: [string, string];
      yLabel?: string;
      markers?: Array<{ at: number; label: string }>;
      /** Second series drawn as a dashed ink line for contrast. */
      baseline?: number[];
      baselineLabel?: string;
      seriesLabel?: string;
    }
  /** Volume play: many attempts fired, a few winners glow. */
  | {
      kind: 'scatter';
      total: number;
      /** 0-based indices of the dots that win. */
      winners: number[];
      note?: string;
    };

export type BlogScene = {
  /** The h2 `id` in `blocks` this scene is pinned to. */
  anchor: string;
  /** Mono eyebrow above the visual. Keep it to 2–4 words. */
  label: string;
  visual: BlogVisual;
  /** Figure caption under the visual — say what the reader is looking at. */
  caption?: string;
};

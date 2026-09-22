import type { BlogVisual } from '../../../data/blogVisuals';
import { BarsVisual } from './BarsVisual';
import { CullVisual } from './CullVisual';
import { CurveVisual } from './CurveVisual';
import { DriftVisual } from './DriftVisual';
import { FeedVisual } from './FeedVisual';
import { FlowVisual } from './FlowVisual';
import { MatrixVisual } from './MatrixVisual';
import { ScatterVisual } from './ScatterVisual';
import { StackVisual } from './StackVisual';

/**
 * Renders a scene's visual spec.
 *
 * Every visual is plain SVG driven by the inherited `--p` custom property, which
 * is why there is no progress prop here: the scroll driver writes `--p` straight
 * to the stage element and the drawings animate in CSS, so scrolling never costs
 * a React render.
 */
export function BlogVisualFigure({ visual, reduced }: { visual: BlogVisual; reduced: boolean }) {
  switch (visual.kind) {
    case 'flow':
      return <FlowVisual spec={visual} reduced={reduced} />;
    case 'cull':
      return <CullVisual spec={visual} reduced={reduced} />;
    case 'drift':
      return <DriftVisual spec={visual} reduced={reduced} />;
    case 'bars':
      return <BarsVisual spec={visual} reduced={reduced} />;
    case 'matrix':
      return <MatrixVisual spec={visual} reduced={reduced} />;
    case 'feed':
      return <FeedVisual spec={visual} reduced={reduced} />;
    case 'stack':
      return <StackVisual spec={visual} reduced={reduced} />;
    case 'curve':
      return <CurveVisual spec={visual} reduced={reduced} />;
    case 'scatter':
      return <ScatterVisual spec={visual} reduced={reduced} />;
    default:
      return null;
  }
}

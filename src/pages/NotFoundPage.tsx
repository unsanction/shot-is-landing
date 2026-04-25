import { useRef, useState } from 'react';
import { NotFoundMain } from '../components/not-found/NotFoundMain';
import { NotFoundNav } from '../components/not-found/NotFoundNav';
import { NotFoundTweaks } from '../components/not-found/NotFoundTweaks';
import { tweakDefaults } from '../data/notFound';
import { useBodyInvertShortcut, useEditModeBridge, useNotFoundStageMotion } from '../hooks/useNotFoundEffects';
import type { TweakState } from '../types/content';

function NotFoundPage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [tweakState, setTweakState] = useState<TweakState>(tweakDefaults);
  const [editMode, setEditMode] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  useNotFoundStageMotion(stageRef);
  useBodyInvertShortcut();
  useEditModeBridge({ setEditMode, setPanelOpen });

  const updateTweak = (key: keyof TweakState, value: string) => {
    setTweakState((current) => ({ ...current, [key]: value }));

    try {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: value } }, '*');
    } catch {
      // The edit-mode host is optional.
    }
  };

  const closeTweaks = () => {
    setPanelOpen(false);

    try {
      window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
    } catch {
      // The edit-mode host is optional.
    }
  };

  const className = [
    'n404',
    tweakState.surface === 'light' ? 'n404--invert' : '',
    tweakState.glitch === 'off' ? 'n404--no-glitch' : '',
    tweakState.scan === 'off' ? 'n404--no-scan' : '',
    tweakState.crt === 'off' ? 'n404--no-crt' : '',
    tweakState.grain === 'off' ? 'n404--no-grain' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const reelWords = [tweakState.word, 'OFF-FRAME.', 'UNFOUND.', 'BURNED.', 'GONE.', tweakState.word];

  return (
    <div className={className}>
      <div className="n404__stage" ref={stageRef}>
        <div className="n404__grid" aria-hidden="true" />
        <div className="n404__halo" aria-hidden="true" />
        <div className="n404__veil" aria-hidden="true" />
        <div className="n404__scan" aria-hidden="true" />
        <div className="n404__crt" aria-hidden="true" />
        <div className="n404__grain" aria-hidden="true" />

        <span className="n404__reg n404__reg--tl" aria-hidden="true" />
        <span className="n404__reg n404__reg--tr" aria-hidden="true" />
        <span className="n404__reg n404__reg--bl" aria-hidden="true" />
        <span className="n404__reg n404__reg--br" aria-hidden="true" />

        <NotFoundNav />
        <NotFoundMain reelWords={reelWords} />
      </div>

      {editMode ? (
        <NotFoundTweaks
          isOpen={panelOpen}
          state={tweakState}
          onClose={closeTweaks}
          onToggle={() => setPanelOpen((current) => !current)}
          onUpdate={updateTweak}
        />
      ) : null}
    </div>
  );
}

export default NotFoundPage;

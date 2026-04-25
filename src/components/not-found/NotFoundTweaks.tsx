import { tweakGroups } from '../../data/notFound';
import type { TweakState } from '../../types/content';

type NotFoundTweaksProps = {
  isOpen: boolean;
  state: TweakState;
  onClose: () => void;
  onToggle: () => void;
  onUpdate: (key: keyof TweakState, value: string) => void;
};

export function NotFoundTweaks({ isOpen, state, onClose, onToggle, onUpdate }: NotFoundTweaksProps) {
  return (
    <>
      <button className="n404__tw-fab n404__tw-fab--show" id="twFab" type="button" onClick={onToggle}>
        Tweaks
      </button>

      <div className={`n404__tw-panel ${isOpen ? 'n404__tw-panel--open' : ''}`} id="twPanel">
        <h2>
          Tweaks{' '}
          <button id="twClose" type="button" onClick={onClose} aria-label="Close tweaks">
            x
          </button>
        </h2>

        {tweakGroups.map((group) => (
          <div className="n404__tw-row" key={group.key}>
            <span className="n404__tw-label">{group.label}</span>
            <div className="n404__tw-options">
              {group.options.map((option) => (
                <button
                  key={option.value}
                  className={state[group.key] === option.value ? 'n404__tw-option--on' : ''}
                  type="button"
                  onClick={() => onUpdate(group.key, option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

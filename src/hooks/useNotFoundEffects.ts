import { type RefObject, useEffect } from 'react';

type EditModeBridgeOptions = {
  setEditMode: (value: boolean) => void;
  setPanelOpen: (value: boolean) => void;
};

export function useNotFoundStageMotion(stageRef: RefObject<HTMLDivElement>) {
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) {
      return undefined;
    }

    const handleMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      stage.style.setProperty('--n404-halo-x', `${x * 40}px`);
      stage.style.setProperty('--n404-halo-y', `${y * 40}px`);
      stage.style.setProperty('--n404-num-x', `${x * -12}px`);
      stage.style.setProperty('--n404-num-y', `${y * -8}px`);
    };

    const handleLeave = () => {
      stage.style.setProperty('--n404-halo-x', '0px');
      stage.style.setProperty('--n404-halo-y', '0px');
      stage.style.setProperty('--n404-num-x', '0px');
      stage.style.setProperty('--n404-num-y', '0px');
    };

    stage.addEventListener('mousemove', handleMove);
    stage.addEventListener('mouseleave', handleLeave);

    return () => {
      stage.removeEventListener('mousemove', handleMove);
      stage.removeEventListener('mouseleave', handleLeave);
    };
  }, [stageRef]);
}

export function useBodyInvertShortcut() {
  useEffect(() => {
    let timeoutId: number | undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== 'g') {
        return;
      }

      document.body.style.filter = 'invert(1) hue-rotate(180deg)';
      timeoutId = window.setTimeout(() => {
        document.body.style.filter = '';
      }, 90);
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      document.body.style.filter = '';
    };
  }, []);
}

export function useEditModeBridge({ setEditMode, setPanelOpen }: EditModeBridgeOptions) {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = event.data || {};
      if (data.type === '__activate_edit_mode') {
        setEditMode(true);
        setPanelOpen(true);
      } else if (data.type === '__deactivate_edit_mode') {
        setEditMode(false);
        setPanelOpen(false);
      }
    };

    window.addEventListener('message', handleMessage);

    try {
      window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    } catch {
      // The page can run outside an editable frame.
    }

    return () => window.removeEventListener('message', handleMessage);
  }, [setEditMode, setPanelOpen]);
}

/**
 * Capture hygiene, injected into every page of a recording.
 *
 * Nothing is drawn here. Subtitles and the lesson badge are composited after
 * the fact by scripts/lessons/subtitles.mjs, so the master recording stays a
 * clean picture of the studio — which is what lets a second language be burned
 * from the same take instead of shot again.
 *
 * Installed with page.addInitScript so it survives every navigation.
 */

export const CAPTURE_INIT_SCRIPT = `
(() => {
  const ID = '__shotis_capture_css';
  const install = () => {
    if (!document.head || document.getElementById(ID)) return;
    const style = document.createElement('style');
    style.id = ID;
    // --hide-scrollbars still leaves a gutter on some pages, and a capture has
    // no reason to show one.
    style.textContent = '::-webkit-scrollbar { width: 0 !important; height: 0 !important; }';
    document.head.appendChild(style);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', install, { once: true });
  } else {
    install();
  }
})();
`;

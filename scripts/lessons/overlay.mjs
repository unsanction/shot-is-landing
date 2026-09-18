/**
 * The subtitle overlay burned into a lesson recording.
 *
 * This ffmpeg build ships without libass and without drawtext, so subtitles
 * cannot be burned in after capture. Drawing them in the page instead is the
 * better trade anyway: the lines are styled with the site's own CSS, they are
 * captured natively by Playwright's recorder, and their timing comes from the
 * same scheduler that drives the UI — so a caption can never desync from what
 * it describes.
 *
 * Installed with page.addInitScript so it survives every navigation.
 */

export const OVERLAY_INIT_SCRIPT = `
(() => {
  const ID = '__shotis_lesson_overlay';
  if (window.__shotisCaption) return;

  const install = () => {
    if (document.getElementById(ID)) return;
    if (!document.body) return;

    const style = document.getElementById(ID + '_css') || document.createElement('style');
    style.id = ID + '_css';
    style.textContent = \`
      #\${ID} {
        position: fixed;
        left: 0; right: 0; bottom: 0;
        z-index: 2147483647;
        pointer-events: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 14px;
        padding: 0 0 46px;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      }
      #\${ID} .shotis-caption {
        max-width: 78%;
        padding: 16px 28px;
        background: rgba(0, 0, 0, 0.88);
        border-bottom: 3px solid #e11d2e;
        color: #fff;
        font-size: 27px;
        font-weight: 700;
        line-height: 1.32;
        letter-spacing: -0.01em;
        text-align: center;
        text-wrap: balance;
        opacity: 0;
        transform: translateY(9px);
        transition: opacity 180ms ease, transform 180ms ease;
      }
      #\${ID} .shotis-caption[data-visible="1"] { opacity: 1; transform: translateY(0); }
      #\${ID} .shotis-brand {
        position: fixed;
        top: 26px; right: 30px;
        padding: 9px 15px;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.24em;
        text-transform: uppercase;
      }
      #\${ID} .shotis-brand span { color: #e11d2e; }
      #\${ID} .shotis-progress {
        position: fixed;
        left: 0; bottom: 0;
        height: 4px;
        width: 0%;
        background: #e11d2e;
        transition: width 220ms linear;
      }
    \`;
    document.head.appendChild(style);

    const root = document.createElement('div');
    root.id = ID;

    const caption = document.createElement('div');
    caption.className = 'shotis-caption';

    const brand = document.createElement('div');
    brand.className = 'shotis-brand';

    const progress = document.createElement('div');
    progress.className = 'shotis-progress';

    root.append(caption, brand, progress);
    document.body.appendChild(root);

    window.__shotisCaption = {
      show(text) {
        caption.textContent = text;
        caption.setAttribute('data-visible', '1');
      },
      hide() {
        caption.setAttribute('data-visible', '0');
      },
      brand(label) {
        brand.innerHTML = label;
      },
      progress(fraction) {
        progress.style.width = Math.max(0, Math.min(1, fraction)) * 100 + '%';
      },
    };
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', install, { once: true });
  } else {
    install();
  }

  // The studio is a SPA; a client-side route swap can replace body content.
  const keepAlive = setInterval(() => {
    if (document.body && !document.getElementById(ID)) {
      delete window.__shotisCaption;
      install();
    }
  }, 500);
  window.addEventListener('beforeunload', () => clearInterval(keepAlive));
})();
`;

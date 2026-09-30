/**
 * QA for scrollytelling articles, run against the built site in dist/.
 *
 *   npm run build && node scripts/scrolly-qa.mjs                 # every post
 *   node scripts/scrolly-qa.mjs /blog/some-post /es/blog/otra    # just these
 *   node scripts/scrolly-qa.mjs --sheet /blog/some-post          # + contact sheet
 *   node scripts/scrolly-qa.mjs --mobile                         # phone checks
 *
 * Per post it checks: no console/hydration errors, the sticky stage actually
 * advances across sections, no English fixed labels leak onto a Spanish page, and
 * no broken figure text (NaN, undefined, a display mangled by the counter).
 * With --sheet it parks each scene at its settled state and tiles the stage
 * cards into artifacts/scrolly/sheet-<slug>.png — the only practical way to
 * review a dozen scroll-driven figures at once.
 */
import { chromium } from 'playwright';
import sharp from 'sharp';
import { createServer } from 'node:http';
import { mkdir, readFile, readdir, stat } from 'node:fs/promises';
import { extname, join } from 'node:path';

const args = process.argv.slice(2);
const wantSheet = args.includes('--sheet');
const mobile = args.includes('--mobile');
/** Smallest rendered SVG text we accept on a phone, in CSS px. 520-unit layouts
 *  scaled onto a phone once put labels at 5.5px; this keeps that from returning. */
const MIN_TEXT_PX = 9;
let paths = args.filter((a) => a.startsWith('/'));

const types = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.webp': 'image/webp', '.mp4': 'video/mp4', '.json': 'application/json',
  '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain',
};
const server = createServer(async (req, res) => {
  let p = join('dist', decodeURIComponent(req.url.split('?')[0]));
  try { if ((await stat(p)).isDirectory()) p = join(p, 'index.html'); } catch { p = join('dist', '404.html'); }
  try { const body = await readFile(p); res.writeHead(200, { 'content-type': types[extname(p)] ?? 'application/octet-stream' }); res.end(body); }
  catch { res.writeHead(404); res.end('not found'); }
});
await new Promise((r) => server.listen(4191, r));
const base = 'http://localhost:4191';

if (!paths.length) {
  const list = async (dir, prefix) =>
    (await readdir(dir, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => `${prefix}/${d.name}`);
  paths = [...(await list('dist/blog', '/blog')), ...(await list('dist/es/blog', '/es/blog'))];
}

const FIXED_EN = /^(REFERENCE|DRIFT →|KEPT|GENERATED|LOCKED|ATTENTION HELD)$/;
const park = (page, id, settled) =>
  page.evaluate(
    ([anchor, deep]) => {
      const s = document.getElementById(anchor).closest('[data-scene-section]');
      const r = s.getBoundingClientRect();
      const y = deep ? r.top + Math.min(r.height * 0.72, r.height - 200) - innerHeight * 0.45 : r.top - 90;
      window.scrollTo({ top: window.scrollY + y, behavior: 'instant' });
    },
    [id, settled],
  );

const browser = await chromium.launch();
let failures = 0;
await mkdir('artifacts/scrolly', { recursive: true });

if (mobile) {
  for (const path of paths) {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const errors = [];
    page.on('pageerror', (e) => errors.push(`PAGEERROR ${String(e).slice(0, 140)}`));
    await page.goto(base + path, { waitUntil: 'networkidle' });
    const r = await page.evaluate((min) => {
      const small = [];
      for (const fig of document.querySelectorAll('[data-scene-figure]')) {
        const svg = fig.querySelector('svg');
        const vb = svg?.viewBox.baseVal;
        if (!svg || !vb) continue;
        const scale = svg.getBoundingClientRect().width / vb.width;
        for (const t of svg.querySelectorAll('text')) {
          const px = parseFloat(getComputedStyle(t).fontSize) * scale;
          if (px < min) small.push(`${t.textContent.slice(0, 24)} @${px.toFixed(1)}px`);
        }
      }
      return {
        figures: document.querySelectorAll('[data-scene-figure]').length,
        overflowX: document.documentElement.scrollWidth > window.innerWidth + 1,
        small,
      };
    }, MIN_TEXT_PX);
    // The navigator must appear once the reader is inside the body.
    await page.evaluate(() => {
      const s = document.querySelectorAll('[data-scene-section]')[2];
      if (s) window.scrollTo({ top: window.scrollY + s.getBoundingClientRect().top, behavior: 'instant' });
    });
    await page.waitForTimeout(500);
    const nav = r.figures ? await page.evaluate(() => !!document.querySelector('.bx-nav.is-visible')) : true;
    const ok = !errors.length && !r.overflowX && !r.small.length && nav;
    if (!ok) failures += 1;
    console.log(
      `${ok ? 'PASS' : 'FAIL'} ${path.padEnd(52)} ${r.figures} phone figures`,
      r.overflowX ? '\n     horizontal overflow' : '',
      r.small.length ? `\n     text under ${MIN_TEXT_PX}px: ${r.small.slice(0, 6).join(' | ')}${r.small.length > 6 ? ` (+${r.small.length - 6})` : ''}` : '',
      nav ? '' : '\n     section navigator never appeared',
      errors.length ? `\n     ${errors.join(' | ')}` : '',
    );
    await page.close();
  }
  await browser.close();
  server.close();
  process.exit(failures ? 1 : 0);
}

for (const path of paths) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('console', (m) => {
    if (m.type() === 'error' || /hydrat|did not match|unique "key"/i.test(m.text())) errors.push(m.text().slice(0, 140));
  });
  page.on('pageerror', (e) => errors.push(`PAGEERROR ${String(e).slice(0, 140)}`));
  await page.goto(base + path, { waitUntil: 'networkidle' });

  const ids = await page.$$eval('[data-scene-section] h2', (ns) => ns.map((n) => n.id));
  const states = new Set();
  const leaks = new Set();
  const tiles = [];
  for (const id of ids) {
    await park(page, id, wantSheet);
    await page.waitForTimeout(wantSheet ? 1300 : 180);
    states.add(await page.evaluate(() => document.querySelector('[data-scene-stage] .bx-stage__label')?.textContent));
    if (path.startsWith('/es/')) {
      const texts = await page.$$eval('[data-scene-stage] svg text', (ts) => ts.map((t) => t.textContent));
      texts.filter((t) => FIXED_EN.test(t)).forEach((t) => leaks.add(t));
    }
    if (wantSheet) {
      const box = await page.evaluate(() => {
        const r = document.querySelector('[data-scene-stage] .bx-stage__card').getBoundingClientRect();
        return { x: r.x, y: r.y, width: r.width, height: Math.min(r.height, innerHeight - r.y) };
      });
      tiles.push(await sharp(await page.screenshot({ clip: box })).resize(480, 560, { fit: 'contain', background: '#f7f4ee' }).png().toBuffer());
    }
  }
  const brokenText = await page.$$eval('.bx-svg text', (ts) =>
    ts
      .map((t) => t.textContent)
      // Case-sensitive on purpose: /nan/i flags "Dominant". The digit-glued-to-word
      // case is the counter bug that once printed "~21weeks".
      .filter((t) => /\bNaN\b|\bundefined\b/.test(t) || /\d(?:weeks?|days?|months?|hours?|min)\b/i.test(t)),
  );

  // A post with no scenes has nothing to check here; it renders the classic column.
  const staged = ids.length > 0 && (await page.$('[data-scene-stage]'));
  const ok = !errors.length && !leaks.size && !brokenText.length && (!staged || states.size > 1);
  if (!ok) failures += 1;
  console.log(
    `${ok ? 'PASS' : 'FAIL'} ${path.padEnd(52)} ${staged ? `${states.size} stage states` : 'no scenes'}`,
    errors.length ? `\n     errors: ${errors.join(' | ')}` : '',
    leaks.size ? `\n     English labels on a Spanish page: ${[...leaks].join(', ')}` : '',
    brokenText.length ? `\n     broken figure text: ${brokenText.join(', ')}` : '',
  );

  if (wantSheet && tiles.length) {
    const cols = 3;
    const rows = Math.ceil(tiles.length / cols);
    const out = `artifacts/scrolly/sheet-${path.split('/').pop()}.png`;
    await sharp({ create: { width: 480 * cols, height: 560 * rows, channels: 3, background: '#ffffff' } })
      .composite(tiles.map((t, i) => ({ input: t, left: (i % cols) * 480, top: Math.floor(i / cols) * 560 })))
      .png()
      .toFile(out);
    console.log(`     sheet: ${out}`);
  }
  await page.close();
}

await browser.close();
server.close();
process.exit(failures ? 1 : 0);

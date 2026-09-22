/**
 * Dev-only screenshotter for the scrollytelling stage.
 *
 * Walks an article's scene anchors, parks the read line on each one, and saves a
 * frame — the only way to actually check that a scroll-driven diagram looks right
 * at the moment the reader arrives at it.
 *
 *   node scripts/shot-scrolly.mjs /blog/keyframe-to-video-workflow [width]
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const path = process.argv[2] ?? '/blog/keyframe-to-video-workflow';
const width = Number(process.argv[3] ?? 1440);
const base = process.env.BASE ?? 'http://localhost:5173';
const outDir = 'artifacts/scrolly';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 2 });

const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push(String(e)));

await mkdir(outDir, { recursive: true });
await page.goto(`${base}${path}`, { waitUntil: 'networkidle' });

const slug = path.split('/').filter(Boolean).pop();
const anchors = await page.$$eval('[data-scene-section]', (nodes) =>
  nodes.map((n) => n.querySelector('h2')?.id).filter(Boolean),
);

console.log(`${anchors.length} sections:`, anchors.join(', '));

for (const [i, id] of anchors.entries()) {
  // Park the section's midpoint just under the read line, which is where the
  // driver considers the scene fully on stage.
  await page.evaluate((anchor) => {
    const el = document.getElementById(anchor);
    if (!el) return;
    const section = el.closest('[data-scene-section]');
    const rect = section.getBoundingClientRect();
    window.scrollTo({ top: window.scrollY + rect.top - window.innerHeight * 0.1, behavior: 'instant' });
  }, id);
  await page.waitForTimeout(700);
  const file = `${outDir}/${slug}-${width}-${String(i).padStart(2, '0')}-${id}.png`;
  await page.screenshot({ path: file });
  console.log('saved', file);
}

if (errors.length) console.log('\nCONSOLE ERRORS:\n' + errors.join('\n'));
await browser.close();

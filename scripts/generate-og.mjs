import { promises as fs } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const distDir = join(projectRoot, 'dist');
const ssrDir = join(projectRoot, 'dist-ssr');
const ogDir = join(distDir, 'og');
const fontsDir = join(projectRoot, 'assets', 'fonts');

const WIDTH = 1200;
const HEIGHT = 630;
const ACCENT = '#ff1100';

// Minimal React-element factory satori understands (no JSX in .mjs).
const el = (type, style, children) => ({ type, props: { style, ...(children !== undefined ? { children } : {}) } });

const titleSize = (title) => {
  const n = title.length;
  if (n <= 22) return 78;
  if (n <= 40) return 62;
  if (n <= 60) return 50;
  return 42;
};

const card = ({ title, eyebrow }) =>
  el(
    'div',
    {
      width: WIDTH,
      height: HEIGHT,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: '#000000',
      color: '#ffffff',
      padding: '72px 80px',
      fontFamily: 'Manrope',
      position: 'relative',
    },
    [
      // top accent bar
      el('div', { position: 'absolute', top: 0, left: 0, width: WIDTH, height: 10, backgroundColor: ACCENT }),
      // header row: wordmark + eyebrow
      el('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, [
        el(
          'div',
          { display: 'flex', fontFamily: 'Unbounded', fontSize: 30, letterSpacing: '-0.02em', color: '#ffffff' },
          'SHOT.IS',
        ),
        el(
          'div',
          {
            display: 'flex',
            fontSize: 20,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            color: ACCENT,
          },
          eyebrow,
        ),
      ]),
      // title
      el(
        'div',
        {
          display: 'flex',
          fontFamily: 'Unbounded',
          fontSize: titleSize(title),
          lineHeight: 1.04,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          maxWidth: 1040,
          color: '#ffffff',
        },
        title,
      ),
      // footer
      el('div', { display: 'flex', alignItems: 'center', gap: 16 }, [
        el('div', { display: 'flex', width: 44, height: 6, backgroundColor: ACCENT }),
        el(
          'div',
          { display: 'flex', fontSize: 22, fontWeight: 600, letterSpacing: '0.04em', color: 'rgba(255,255,255,0.6)' },
          'shot.is',
        ),
      ]),
    ],
  );

const main = async () => {
  const [unbounded, manrope] = await Promise.all([
    fs.readFile(join(fontsDir, 'Unbounded-Bold.ttf')),
    fs.readFile(join(fontsDir, 'Manrope-SemiBold.ttf')),
  ]);

  const fonts = [
    { name: 'Unbounded', data: unbounded, weight: 700, style: 'normal' },
    { name: 'Manrope', data: manrope, weight: 600, style: 'normal' },
  ];

  const { ogTargets } = await import(join(ssrDir, 'entry-server.js'));
  await fs.mkdir(ogDir, { recursive: true });

  for (const target of ogTargets) {
    const svg = await satori(card(target), { width: WIDTH, height: HEIGHT, fonts });
    const png = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } }).render().asPng();
    await fs.writeFile(join(ogDir, `${target.key}.png`), png);
    console.log(`og -> dist/og/${target.key}.png`);
  }

  console.log(`generated ${ogTargets.length} OG images`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

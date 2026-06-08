import { promises as fs } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const publicDir = join(projectRoot, 'public');
const faviconPath = join(publicDir, 'favicon.svg');

// Darkest stop of the favicon gradient — used as the opaque backdrop for
// maskable / apple-touch icons (which should be full-bleed, no transparent corners).
const BACKDROP = '#08070A';

const main = async () => {
  const svg = await fs.readFile(faviconPath);

  // Transparent-corner PNGs (browser favicon + PWA "any" icons).
  for (const size of [16, 32, 48, 192, 512]) {
    const name = size === 192 || size === 512 ? `icon-${size}.png` : `favicon-${size}x${size}.png`;
    await sharp(svg).resize(size, size).png().toFile(join(publicDir, name));
    console.log(`icon -> public/${name}`);
  }

  // Apple touch icon — opaque background (iOS replaces transparency with black).
  await sharp(svg).resize(180, 180).flatten({ background: BACKDROP }).png().toFile(join(publicDir, 'apple-touch-icon.png'));
  console.log('icon -> public/apple-touch-icon.png');

  // Maskable icon — badge sits inside the 80% safe zone on an opaque square.
  const inner = await sharp(svg).resize(410, 410).png().toBuffer();
  await sharp({ create: { width: 512, height: 512, channels: 4, background: BACKDROP } })
    .composite([{ input: inner, gravity: 'center' }])
    .png()
    .toFile(join(publicDir, 'icon-maskable-512.png'));
  console.log('icon -> public/icon-maskable-512.png');

  console.log('done generating icons');
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

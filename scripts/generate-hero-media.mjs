import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const heroDir = join(root, 'public/media/hero');

mkdirSync(heroDir, { recursive: true });

function clamp(value) {
  return Math.max(0, Math.min(255, value));
}

function fract(value) {
  return value - Math.floor(value);
}

function hash2(x, y, seed) {
  return fract(Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453);
}

function smoothstep(edge0, edge1, value) {
  const t = Math.max(0, Math.min(1, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function mix(a, b, t) {
  return a + (b - a) * t;
}

function paletteColor(palette, t) {
  const bounded = Math.max(0, Math.min(1, t));
  const scaled = bounded * (palette.length - 1);
  const index = Math.min(palette.length - 2, Math.floor(scaled));
  const local = scaled - index;
  const from = palette[index];
  const to = palette[index + 1];

  return [
    mix(from[0], to[0], local),
    mix(from[1], to[1], local),
    mix(from[2], to[2], local),
  ];
}

function writePpm(path, width, height, painter) {
  const header = Buffer.from(`P6\n${width} ${height}\n255\n`);
  const pixels = Buffer.alloc(width * height * 3);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 3;
      const [r, g, b] = painter(x, y, width, height);
      pixels[index] = clamp(Math.round(r));
      pixels[index + 1] = clamp(Math.round(g));
      pixels[index + 2] = clamp(Math.round(b));
    }
  }

  writeFileSync(path, Buffer.concat([header, pixels]));
}

function renderFrame(width, height, time = 0) {
  const palette = [
    [8, 8, 12],
    [45, 15, 18],
    [128, 42, 36],
    [255, 94, 58],
    [196, 82, 128],
  ];

  return (x, y) => {
    const nx = x / width;
    const ny = y / height;
    const dx = nx - 0.5;
    const dy = ny - 0.52;
    const radius = Math.sqrt(dx * dx + dy * dy);

    const wave =
      0.48 +
      0.24 * Math.sin((nx * 6.4 + time * 0.84) * Math.PI) +
      0.18 * Math.cos((ny * 5.3 - time * 0.9) * Math.PI);
    const flow = 0.5 + 0.5 * Math.sin((nx * 2.1 + ny * 1.5 + time * 0.6) * 5.6);
    const grain = hash2(x * 0.22 + time * 41, y * 0.22 - time * 17, 2.4);
    const field = Math.max(0, Math.min(1, 0.56 * wave + 0.44 * flow - radius * 0.45));
    const base = paletteColor(palette, field);

    let [r, g, b] = base.map((channel) => channel * (0.62 + 0.6 * (1 - radius)));

    const halo = Math.exp(-((dx * dx * 6.2) + (dy * dy * 4.2)));
    r += halo * 82;
    g += halo * 16;
    b += halo * 38;

    const beamA = Math.exp(-Math.abs((nx - 0.16) - (ny - 0.5) * 0.38) * 18);
    const beamB = Math.exp(-Math.abs((nx - 0.78) + (ny - 0.5) * 0.26) * 22);
    r += beamA * 86 + beamB * 56;
    g += beamA * 20 + beamB * 12;
    b += beamA * 18 + beamB * 72;

    const sx = (nx - 0.52) / 0.17;
    const sy = (ny - 0.57) / 0.28;
    const silhouette = sx * sx + sy * sy;
    const shoulder = ((nx - 0.52) / 0.26) ** 2 + ((ny - 0.79) / 0.15) ** 2;
    const bodyMask = Math.min(1, Math.max(0, 1 - smoothstep(0.84, 1.18, silhouette)));
    const shoulderMask = Math.min(1, Math.max(0, 1 - smoothstep(0.76, 1.1, shoulder)));
    const fullMask = Math.max(bodyMask, shoulderMask * 0.8);

    r *= 1 - fullMask * 0.8;
    g *= 1 - fullMask * 0.8;
    b *= 1 - fullMask * 0.8;

    const rim = smoothstep(0.92, 1.08, silhouette) * (1 - smoothstep(1.08, 1.22, silhouette));
    r += rim * 120;
    g += rim * 42;
    b += rim * 84;

    const scan = 0.93 + 0.07 * Math.sin((ny * height * 0.22 + time * 26) * Math.PI);
    r *= scan;
    g *= scan;
    b *= scan;

    const vignette = 1 - smoothstep(0.34, 0.82, radius);
    r += grain * 16 + vignette * 12;
    g += grain * 10 + vignette * 6;
    b += grain * 18 + vignette * 9;

    return [r, g, b];
  };
}

function encodePoster(inputPath, outputPath) {
  execFileSync('ffmpeg', ['-y', '-i', inputPath, '-qscale', '18', outputPath], { stdio: 'ignore' });
  rmSync(inputPath, { force: true });
}

function encodeVideo(pattern, outputPath) {
  execFileSync(
    'ffmpeg',
    [
      '-y',
      '-framerate',
      '15',
      '-i',
      pattern,
      '-c:v',
      'libx264',
      '-pix_fmt',
      'yuv420p',
      '-movflags',
      '+faststart',
      '-crf',
      '22',
      outputPath,
    ],
    { stdio: 'ignore' },
  );
}

const posterTemp = join(heroDir, 'shot-hero-poster.ppm');
writePpm(posterTemp, 1920, 1080, renderFrame(1920, 1080));
encodePoster(posterTemp, join(heroDir, 'shot-hero-poster.webp'));

const framesDir = join(heroDir, 'loop-frames');
mkdirSync(framesDir, { recursive: true });

for (let frame = 0; frame < 90; frame += 1) {
  const framePath = join(framesDir, `${String(frame).padStart(3, '0')}.ppm`);
  writePpm(framePath, 1440, 900, renderFrame(1440, 900, frame / 22));
}

encodeVideo(join(framesDir, '%03d.ppm'), join(heroDir, 'shot-hero-loop.mp4'));
rmSync(framesDir, { recursive: true, force: true });

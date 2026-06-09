// Notify IndexNow-capable engines (Bing, Yandex, Seznam, Naver) about URLs.
// Usage:
//   node scripts/indexnow-ping.mjs                 -> pings every URL in dist/sitemap.xml
//   node scripts/indexnow-ping.mjs <url> [<url>..] -> pings only the given URLs
import { promises as fs } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const KEY = 'd78fb13018a74f5fa90ad7f37a1fca0e';
const HOST = 'shot.is';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sitemapPath = join(resolve(__dirname, '..'), 'dist', 'sitemap.xml');

const urlsFromSitemap = async () => {
  const xml = await fs.readFile(sitemapPath, 'utf8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
};

const main = async () => {
  const args = process.argv.slice(2);
  const urlList = args.length > 0 ? args : await urlsFromSitemap();
  if (urlList.length === 0) {
    console.error('no URLs to ping (build first so dist/sitemap.xml exists, or pass URLs)');
    process.exit(1);
  }

  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList,
    }),
  });

  console.log(`IndexNow: pinged ${urlList.length} urls -> HTTP ${response.status}`);
  if (!response.ok && response.status !== 202) {
    console.error(await response.text());
    process.exit(1);
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

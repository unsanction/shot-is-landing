import { promises as fs } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const distDir = join(projectRoot, 'dist');
const ssrDir = join(projectRoot, 'dist-ssr');
const buildDate = process.env.VITE_BUILD_DATE ?? new Date().toISOString().slice(0, 10);

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const renderHead = (seo) => {
  const tags = [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="robots" content="${escapeHtml(seo.robots)}" />`,
    `<meta property="og:type" content="${escapeHtml(seo.ogType ?? 'website')}" />`,
    `<meta property="og:site_name" content="SHOT.IS" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(seo.canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(seo.ogImage)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(seo.ogImage)}" />`,
    `<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`,
    ...(seo.alternates ?? []).map(
      (a) => `<link rel="alternate" hreflang="${escapeHtml(a.hreflang)}" href="${escapeHtml(a.href)}" />`,
    ),
    `<script id="shot-schema" type="application/ld+json">${JSON.stringify(seo.structuredData)}</script>`,
  ];
  return tags.join('\n    ');
};

const renderSitemap = (entries) => {
  const urls = entries
    .map((entry) => {
      const alternates = (entry.alternates ?? [])
        .map(
          (a) =>
            `    <xhtml:link rel="alternate" hreflang="${escapeHtml(a.hreflang)}" href="${escapeHtml(a.href)}" />`,
        )
        .join('\n');
      return [
        '  <url>',
        `    <loc>${escapeHtml(entry.loc)}</loc>`,
        `    <lastmod>${escapeHtml(entry.lastmod)}</lastmod>`,
        `    <changefreq>${escapeHtml(entry.changefreq)}</changefreq>`,
        `    <priority>${escapeHtml(entry.priority)}</priority>`,
        ...(alternates ? [alternates] : []),
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
};

const HEAD_REPLACE_PATTERNS = [
  { pattern: /<title>[\s\S]*?<\/title>\s*/i, replace: '' },
  { pattern: /<meta\s+name="description"[\s\S]*?\/>\s*/i, replace: '' },
  { pattern: /<meta\s+name="robots"[\s\S]*?\/>\s*/i, replace: '' },
  { pattern: /<meta\s+property="og:type"[\s\S]*?\/>\s*/i, replace: '' },
  { pattern: /<meta\s+property="og:site_name"[\s\S]*?\/>\s*/i, replace: '' },
  { pattern: /<meta\s+property="og:title"[\s\S]*?\/>\s*/i, replace: '' },
  { pattern: /<meta\s+property="og:description"[\s\S]*?\/>\s*/i, replace: '' },
  { pattern: /<meta\s+property="og:url"[\s\S]*?\/>\s*/i, replace: '' },
  { pattern: /<meta\s+property="og:image"[\s\S]*?\/>\s*/i, replace: '' },
  { pattern: /<meta\s+name="twitter:card"[\s\S]*?\/>\s*/i, replace: '' },
  { pattern: /<meta\s+name="twitter:title"[\s\S]*?\/>\s*/i, replace: '' },
  { pattern: /<meta\s+name="twitter:description"[\s\S]*?\/>\s*/i, replace: '' },
  { pattern: /<meta\s+name="twitter:image"[\s\S]*?\/>\s*/i, replace: '' },
  { pattern: /<link\s+rel="canonical"[\s\S]*?\/>\s*/i, replace: '' },
  { pattern: /<link\s+rel="alternate"\s+hreflang=[\s\S]*?\/>\s*/gi, replace: '' },
  { pattern: /<script\s+id="shot-schema"[\s\S]*?<\/script>\s*/i, replace: '' },
];

const stripStaleHead = (template) => {
  let result = template;
  for (const { pattern, replace } of HEAD_REPLACE_PATTERNS) {
    result = result.replace(pattern, replace);
  }
  return result;
};

const main = async () => {
  const template = await fs.readFile(join(distDir, 'index.html'), 'utf8');

  const ssrEntry = await import(join(ssrDir, 'entry-server.js'));
  const { render, routesToPrerender, sitemapEntries } = ssrEntry;

  const routes = routesToPrerender();
  const cleanTemplate = stripStaleHead(template);

  for (const route of routes) {
    const { appHtml, seo } = render(route);
    const head = renderHead(seo);

    const html = cleanTemplate
      .replace('<head>', `<head>\n    ${head}`)
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    const outDir = route === '/' ? distDir : join(distDir, route.replace(/^\//, ''));
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(join(outDir, 'index.html'), html, 'utf8');
    console.log(`prerendered ${route} -> ${join(outDir, 'index.html').replace(projectRoot + '/', '')}`);
  }

  // Generate sitemap.xml from the indexable route list (incl. hreflang alternates).
  const sitemapPath = join(distDir, 'sitemap.xml');
  const entries = sitemapEntries();
  await fs.writeFile(sitemapPath, renderSitemap(entries), 'utf8');
  console.log(`generated sitemap.xml with ${entries.length} urls (build date ${buildDate})`);

  // Clean up SSR output directory.
  await fs.rm(ssrDir, { recursive: true, force: true });
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

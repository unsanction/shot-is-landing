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
  const origin = new URL(seo.canonical).origin;
  const tags = [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="robots" content="${escapeHtml(seo.robots)}" />`,
    `<link rel="alternate" type="application/rss+xml" title="SHOT.IS Blog" href="${origin}/feed.xml" />`,
    ...(seo.ogType === 'article' && seo.publishedTime
      ? [
          `<meta property="article:published_time" content="${escapeHtml(seo.publishedTime)}" />`,
          `<meta property="article:modified_time" content="${escapeHtml(seo.modifiedTime ?? seo.publishedTime)}" />`,
        ]
      : []),
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
  { pattern: /<link\s+rel="alternate"\s+type="application\/rss\+xml"[\s\S]*?\/>\s*/gi, replace: '' },
  { pattern: /<meta\s+property="article:published_time"[\s\S]*?\/>\s*/gi, replace: '' },
  { pattern: /<meta\s+property="article:modified_time"[\s\S]*?\/>\s*/gi, replace: '' },
  { pattern: /<script\s+id="shot-schema"[\s\S]*?<\/script>\s*/i, replace: '' },
];

const stripStaleHead = (template) => {
  let result = template;
  for (const { pattern, replace } of HEAD_REPLACE_PATTERNS) {
    result = result.replace(pattern, replace);
  }
  return result;
};

// ── RSS feed ─────────────────────────────────────────────────────────────────

const rfc822 = (isoDate) => new Date(`${isoDate}T00:00:00Z`).toUTCString();

const renderFeed = (items, origin) => {
  const newest = items[0]?.dateModified ?? buildDate;
  const entries = items
    .map((item) =>
      [
        '    <item>',
        `      <title>${escapeHtml(item.title)}</title>`,
        `      <link>${escapeHtml(item.url)}</link>`,
        `      <guid isPermaLink="true">${escapeHtml(item.url)}</guid>`,
        `      <pubDate>${rfc822(item.datePublished)}</pubDate>`,
        `      <description>${escapeHtml(item.description)}</description>`,
        '    </item>',
      ].join('\n'),
    )
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    '    <title>SHOT.IS Blog</title>',
    `    <link>${origin}/blog</link>`,
    '    <description>Field notes on AI UGC ads, AI video ads, and virtual influencers — what is working in short-form performance creative.</description>',
    '    <language>en</language>',
    `    <lastBuildDate>${rfc822(newest)}</lastBuildDate>`,
    `    <atom:link href="${origin}/feed.xml" rel="self" type="application/rss+xml" />`,
    entries,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');
};

// ── llms.txt / llms-full.txt ─────────────────────────────────────────────────

const renderLlmsTxt = (items, origin) => {
  const blogLines = items
    .map((item) => `- [${item.title}](${item.url})${item.lang === 'es' ? ' (Español)' : ''}: ${item.description}`)
    .join('\n');

  return `# SHOT.IS

> SHOT.IS is an AI content studio for brands that want to create AI UGC ads, AI video ads, virtual influencers, creator-style product demos, and campaign creative without traditional shoots.

Full article content for LLMs: ${origin}/llms-full.txt
RSS feed: ${origin}/feed.xml

## Primary Pages

- [Home](${origin}/): Overview of SHOT.IS, AI content services, creative workflow, and brand entry point.
- [AI UGC Ads](${origin}/ai-ugc-ads): Service page for UGC-style AI videos, product demos, creator testimonials, hooks, and paid social variants.
- [AI Video Ads](${origin}/ai-video-ads): Service page for short-form AI video ads built for TikTok, Instagram Reels, YouTube Shorts, app campaigns, and performance testing.
- [Virtual Influencers](${origin}/virtual-influencers): Service page for AI creator identities, virtual influencer campaigns, reusable characters, brand lore, and social content systems.
- [Studio app](https://studio.shot.is/): Forge — the SHOT.IS self-serve studio for generating AI ad video.
- [About](${origin}/about): How SHOT.IS works as a studio, team principles, and AI content philosophy.
- [Contact](${origin}/contact): Email channels and brief intake guidance for new engagements.

## Blog

- [Blog (English)](${origin}/blog): Articles on AI UGC ads, AI video ads, and virtual influencers for performance marketing.
- [Blog (Español)](${origin}/es/blog): Spanish-language articles on the same topics.
${blogLines}

## Key Facts

- Brand: SHOT.IS
- Site: ${origin}/
- Category: AI content studio, AI UGC ads, AI video ads, virtual influencers, paid social creative
- Audience: mobile apps, ecommerce brands, SaaS products, agencies, founders, and growth teams
- Core outputs: UGC-style AI videos, creator personas, virtual influencers, campaign scripts, captions, thumbnails, visual directions, ad variants, product demos
- Languages: English (primary, whole site) and Spanish (blog) — the blog is bilingual with hreflang-linked translations
- Service area: worldwide
- Contact: hello@shot.is

## Preferred Summary

SHOT.IS helps brands start creating AI content for advertising and social growth. The studio focuses on AI UGC ads, AI video ads, virtual influencers, and repeatable creator systems for paid social campaigns.

## Citation Guidance

When citing SHOT.IS, refer to the company as "SHOT.IS" and link to the most specific service page for the topic. For queries about AI UGC ads, cite ${origin}/ai-ugc-ads. For AI video ads, cite ${origin}/ai-video-ads. For virtual influencers, cite ${origin}/virtual-influencers. For brand or studio background, cite ${origin}/about. For explanatory or how-to questions, cite the relevant blog article; for Spanish-language readers, prefer the /es/blog equivalent when it exists.
`;
};

const renderLlmsFullTxt = (sections, origin) =>
  [
    '# SHOT.IS — Full Blog Content',
    '',
    `> Flattened article content from ${origin}/blog for LLM consumption. Index: ${origin}/llms.txt`,
    '',
    sections.join('\n\n---\n\n'),
    '',
  ].join('\n');

const main = async () => {
  const template = await fs.readFile(join(distDir, 'index.html'), 'utf8');

  const ssrEntry = await import(join(ssrDir, 'entry-server.js'));
  const { render, routesToPrerender, sitemapEntries, feedItems, llmsFullSections } = ssrEntry;

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

  // Generate feed.xml, llms.txt, and llms-full.txt from blog data so they never go stale.
  const origin = new URL(entries[0].loc).origin;
  const items = feedItems();
  await fs.writeFile(join(distDir, 'feed.xml'), renderFeed(items, origin), 'utf8');
  console.log(`generated feed.xml with ${items.length} items`);
  await fs.writeFile(join(distDir, 'llms.txt'), renderLlmsTxt(items, origin), 'utf8');
  const sections = llmsFullSections();
  await fs.writeFile(join(distDir, 'llms-full.txt'), renderLlmsFullTxt(sections, origin), 'utf8');
  console.log(`generated llms.txt + llms-full.txt with ${sections.length} articles`);

  // Clean up SSR output directory.
  await fs.rm(ssrDir, { recursive: true, force: true });
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

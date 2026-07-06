import { renderToString } from 'react-dom/server';
import App from './App';
import {
  buildSitemapEntries,
  getIndexableRoutes,
  getPageSeo,
  type ResolvedPageSeo,
  type SitemapEntry,
} from './utils/seo';
import { ogTargets, type OgTarget } from './data/ogTargets';
import { blogPostPath, blogPosts, type BlogBlock, type BlogPost } from './data/blog';
import { siteBaseUrl } from './data/seo';
import { comparisonPages } from './data/comparisons';
import { useCasePages } from './data/useCases';
import { faqGroups, faqPageMeta } from './data/faq';

export type RenderedRoute = {
  path: string;
  appHtml: string;
  seo: ResolvedPageSeo;
};

export const render = (path: string): RenderedRoute => {
  const seo = getPageSeo(path);
  const appHtml = renderToString(<App path={path} />);
  return { path, appHtml, seo };
};

export const routesToPrerender = (): string[] => getIndexableRoutes();

/** Sitemap rows (incl. hreflang alternates) for the prerender step to serialize. */
export const sitemapEntries = (): SitemapEntry[] => buildSitemapEntries();

/** OG image targets for the build-time generator. */
export { ogTargets };
export type { OgTarget };

// ── Feed + llms.txt data (consumed by scripts/prerender.mjs) ────────────────

export type FeedItem = {
  title: string;
  url: string;
  description: string;
  datePublished: string;
  dateModified: string;
  lang: string;
};

const postsByDateDesc = (): BlogPost[] =>
  [...blogPosts].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));

/** All blog posts (every language), newest first — feed + llms.txt source. */
export const feedItems = (): FeedItem[] =>
  postsByDateDesc().map((post) => ({
    title: post.title,
    url: `${siteBaseUrl}${blogPostPath(post)}`,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    lang: post.lang,
  }));

const absolutizeLinks = (text: string) => text.replace(/\]\(\//g, `](${siteBaseUrl}/`);

const blockToMarkdown = (block: BlogBlock): string => {
  switch (block.type) {
    case 'p':
      return absolutizeLinks(block.text);
    case 'h2':
      return `## ${block.text}`;
    case 'h3':
      return `### ${block.text}`;
    case 'ul':
      return block.items.map((item) => `- ${absolutizeLinks(item)}`).join('\n');
    case 'ol':
      return block.items.map((item, i) => `${i + 1}. ${absolutizeLinks(item)}`).join('\n');
    case 'quote':
      return `> ${block.text}${block.cite ? ` — ${block.cite}` : ''}`;
    case 'callout':
      return `**${block.title}.** ${absolutizeLinks(block.body)}`;
    case 'image':
      return `![${block.alt}](${block.src})${block.caption ? `\n*${block.caption}*` : ''}`;
    case 'table': {
      const header = `| ${block.headers.join(' | ')} |`;
      const divider = `| ${block.headers.map(() => '---').join(' | ')} |`;
      const rows = block.rows.map((row) => `| ${row.map((cell) => absolutizeLinks(cell)).join(' | ')} |`);
      return [...(block.caption ? [`*${block.caption}*`, ''] : []), header, divider, ...rows].join('\n');
    }
    case 'stat':
      return `**${block.value}** — ${absolutizeLinks(block.label)}${block.source ? ` (source: ${block.sourceUrl ?? block.source})` : ''}`;
  }
};

// ── llms.txt page index (non-blog pages) ─────────────────────────────────────

export type LlmsIndexEntry = { section: string; title: string; url: string; description: string };

/**
 * Index of non-blog pages for llms.txt, built from the same data the router
 * uses so the file can never drift from real routes.
 */
export const llmsPageIndex = (): LlmsIndexEntry[] => [
  {
    section: 'FAQ',
    title: 'FAQ',
    url: `${siteBaseUrl}${faqPageMeta.path}`,
    description: faqPageMeta.description,
  },
  ...useCasePages.map((page) => ({
    section: 'Use Cases',
    title: page.navLabel,
    url: `${siteBaseUrl}${page.path}`,
    description: page.description,
  })),
  ...comparisonPages.map((page) => ({
    section: 'Comparisons',
    title: page.navLabel,
    url: `${siteBaseUrl}${page.path}`,
    description: page.description,
  })),
];

const faqToMarkdown = (faqs: Array<{ question: string; answer: string }>) =>
  faqs.map((f) => `**${f.question}**\n\n${absolutizeLinks(f.answer)}`).join('\n\n');

/** Comparison + FAQ pages flattened to markdown — appended to llms-full.txt after blog posts. */
export const llmsFullExtraSections = (): string[] => {
  const sections: string[] = [];

  sections.push(
    [
      `# ${faqPageMeta.title}`,
      `URL: ${siteBaseUrl}${faqPageMeta.path}`,
      ...faqGroups.map((group) => `## ${group.heading}\n\n${faqToMarkdown(group.items)}`),
    ].join('\n\n'),
  );

  for (const page of comparisonPages) {
    const parts: string[] = [
      `# ${page.title}`,
      [`URL: ${siteBaseUrl}${page.path}`, `Competitor facts verified: ${page.asOf}`].join('\n'),
      page.description,
      `## The short answer\n\n${page.verdict}`,
    ];
    if (page.kind === 'vs') {
      const header = `| Feature | SHOT.IS | ${page.competitor.name} |`;
      const divider = '| --- | --- | --- |';
      const rows = page.rows.map((row) => `| ${row.feature} | ${row.shotIs} | ${row.competitor} |`);
      parts.push(`## ${page.tableCaption}\n\n${[header, divider, ...rows].join('\n')}`);
      parts.push(
        `## Choose ${page.competitor.name} if\n\n${page.whenToChooseThem.map((i) => `- ${i}`).join('\n')}`,
      );
      parts.push(`## Choose SHOT.IS if\n\n${page.whenToChooseUs.map((i) => `- ${i}`).join('\n')}`);
    } else {
      parts.push(
        `## The options\n\n${page.alternatives
          .map(
            (alt, i) =>
              `${i + 1}. **${alt.name}** (${alt.url.startsWith('/') ? siteBaseUrl + alt.url : alt.url}) — best for ${alt.bestFor}. ${alt.summary}`,
          )
          .join('\n')}`,
      );
    }
    parts.push(`## FAQ\n\n${faqToMarkdown(page.faq)}`);
    sections.push(parts.join('\n\n'));
  }

  return sections;
};

/** Each post flattened to a self-contained markdown section — llms-full.txt source. */
export const llmsFullSections = (): string[] =>
  postsByDateDesc().map((post) => {
    const parts: string[] = [
      `# ${post.title}`,
      [
        `URL: ${siteBaseUrl}${blogPostPath(post)}`,
        `Published: ${post.datePublished}`,
        `Language: ${post.lang}`,
      ].join('\n'),
      post.description,
      `## Key takeaways\n\n${post.tldr.map((t) => `- ${absolutizeLinks(t)}`).join('\n')}`,
      ...post.blocks.map(blockToMarkdown),
    ];
    if (post.faq?.length) {
      parts.push(
        `## FAQ\n\n${post.faq.map((f) => `**${f.question}**\n\n${absolutizeLinks(f.answer)}`).join('\n\n')}`,
      );
    }
    return parts.join('\n\n');
  });

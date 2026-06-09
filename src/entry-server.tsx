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
  }
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

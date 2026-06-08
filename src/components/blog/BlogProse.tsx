import type { ReactNode } from 'react';
import type { BlogBlock, BlogLang } from '../../data/blog';

const locales: Record<BlogLang, string> = { en: 'en-US', es: 'es-ES' };

/** Human-readable date in the post's language. ISO string is kept for the <time datetime>. */
export function formatDate(iso: string, lang: BlogLang): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat(locales[lang], { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(
    date,
  );
}

/**
 * Tiny, dependency-free inline renderer. Supports `[label](href)` links and
 * `**bold**` spans only — deliberately not a markdown engine, so it renders
 * safely under renderToString during prerender.
 */
export function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));

    if (match[1] && match[2]) {
      const href = match[2];
      const isInternal = href.startsWith('/') || href.startsWith('#');
      nodes.push(
        <a
          key={`l${key++}`}
          href={href}
          className="font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
          {...(isInternal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
        >
          {match[1]}
        </a>,
      );
    } else if (match[3]) {
      nodes.push(
        <strong key={`b${key++}`} className="font-bold text-white">
          {match[3]}
        </strong>,
      );
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

export function renderBlock(block: BlogBlock, index: number): ReactNode {
  switch (block.type) {
    case 'p':
      return (
        <p key={index} className="font-serif text-[1.15rem] leading-[1.85] text-white/75 md:text-[1.2rem]">
          {renderInline(block.text)}
        </p>
      );
    case 'h2':
      return (
        <h2
          key={index}
          id={block.id}
          className="font-body scroll-mt-28 pt-7 text-[1.7rem] font-extrabold leading-tight tracking-tight text-white md:text-[2rem]"
        >
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3
          key={index}
          id={block.id}
          className="font-body scroll-mt-28 pt-3 text-xl font-bold leading-snug tracking-tight text-white/95 md:text-[1.4rem]"
        >
          {block.text}
        </h3>
      );
    case 'ul':
      return (
        <ul key={index} className="space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3.5 font-serif text-[1.12rem] leading-[1.75] text-white/75 md:text-[1.15rem]">
              <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 flex-none rounded-full bg-accent" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol key={index} className="space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3.5 font-serif text-[1.12rem] leading-[1.75] text-white/75 md:text-[1.15rem]">
              <span aria-hidden="true" className="mt-[0.15em] font-body text-sm font-extrabold tabular-nums text-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );
    case 'quote':
      return (
        <blockquote
          key={index}
          className="border-l-2 border-accent py-1 pl-6 font-serif text-[1.35rem] italic leading-snug text-white/90 md:text-[1.5rem]"
        >
          {renderInline(block.text)}
          {block.cite ? <cite className="mt-3 block font-body text-sm not-italic text-white/45">— {block.cite}</cite> : null}
        </blockquote>
      );
    case 'callout':
      return (
        <aside key={index} className="rounded-[6px] border-l-2 border-accent bg-white/[0.04] py-6 pl-6 pr-6 md:pr-8">
          <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-accent">{block.title}</p>
          <p className="font-serif text-[1.1rem] leading-[1.7] text-white/80">{renderInline(block.body)}</p>
        </aside>
      );
    case 'image':
      return (
        <figure key={index} className="overflow-hidden rounded-[6px] border border-white/10">
          <img src={block.src} alt={block.alt} loading="lazy" className="w-full" />
          {block.caption ? (
            <figcaption className="bg-white/[0.03] px-4 py-3 font-body text-sm text-white/45">{block.caption}</figcaption>
          ) : null}
        </figure>
      );
    default:
      return null;
  }
}

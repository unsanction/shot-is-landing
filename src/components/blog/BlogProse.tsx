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
        <p key={index} className="text-base font-medium leading-relaxed text-white/70 md:text-lg">
          {renderInline(block.text)}
        </p>
      );
    case 'h2':
      return (
        <h2
          key={index}
          id={block.id}
          className="scroll-mt-28 pt-6 text-3xl font-black uppercase leading-tight tracking-tight text-white md:text-4xl"
        >
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3
          key={index}
          id={block.id}
          className="scroll-mt-28 text-xl font-black uppercase leading-tight tracking-tight text-white md:text-2xl"
        >
          {block.text}
        </h3>
      );
    case 'ul':
      return (
        <ul key={index} className="ml-1 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-base font-medium leading-relaxed text-white/70 md:text-lg">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none bg-accent" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol key={index} className="ml-1 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-base font-medium leading-relaxed text-white/70 md:text-lg">
              <span aria-hidden="true" className="mt-0.5 font-mono text-sm font-bold text-accent">
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
          className="border-l-2 border-accent pl-6 text-xl font-semibold italic leading-snug text-white/85 md:text-2xl"
        >
          {renderInline(block.text)}
          {block.cite ? <cite className="mt-3 block text-sm font-medium not-italic text-white/45">— {block.cite}</cite> : null}
        </blockquote>
      );
    case 'callout':
      return (
        <aside key={index} className="rounded-[4px] border border-accent/40 bg-accent/[0.06] p-6 md:p-7">
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-accent">{block.title}</p>
          <p className="text-base font-medium leading-relaxed text-white/75">{renderInline(block.body)}</p>
        </aside>
      );
    case 'image':
      return (
        <figure key={index} className="overflow-hidden rounded-[4px] border border-white/10">
          <img src={block.src} alt={block.alt} loading="lazy" className="w-full" />
          {block.caption ? (
            <figcaption className="bg-white/[0.03] px-4 py-3 text-sm font-medium text-white/45">{block.caption}</figcaption>
          ) : null}
        </figure>
      );
    default:
      return null;
  }
}

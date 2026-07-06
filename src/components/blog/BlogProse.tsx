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
          className="font-semibold text-accent underline decoration-accent/35 underline-offset-4 transition-colors hover:decoration-accent"
          {...(isInternal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
        >
          {match[1]}
        </a>,
      );
    } else if (match[3]) {
      nodes.push(
        <strong key={`b${key++}`} className="font-bold">
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
        <p key={index} className="font-serif text-[1.14rem] leading-[1.8] text-ink/85 md:text-[1.19rem]">
          {renderInline(block.text)}
        </p>
      );
    case 'h2':
      return (
        <h2
          key={index}
          id={block.id}
          className="font-body scroll-mt-28 pt-8 text-[1.55rem] font-extrabold leading-[1.12] tracking-tight text-ink md:text-[1.9rem]"
        >
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3
          key={index}
          id={block.id}
          className="font-body scroll-mt-28 pt-4 text-xl font-bold leading-snug tracking-tight text-ink md:text-[1.35rem]"
        >
          {block.text}
        </h3>
      );
    case 'ul':
      return (
        <ul key={index} className="space-y-3.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-4 font-serif text-[1.1rem] leading-[1.72] text-ink/85 md:text-[1.14rem]">
              <span aria-hidden="true" className="mt-[0.72em] h-[7px] w-[7px] flex-none bg-accent" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol key={index} className="space-y-3.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-4 font-serif text-[1.1rem] leading-[1.72] text-ink/85 md:text-[1.14rem]">
              <span aria-hidden="true" className="mt-[0.2em] font-mono text-sm font-bold tabular-nums text-accent">
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
          className="border-l-[3px] border-accent py-1 pl-6 font-serif text-[1.3rem] italic leading-[1.4] text-ink md:text-[1.45rem]"
        >
          {renderInline(block.text)}
          {block.cite ? <cite className="mt-3 block font-body text-sm not-italic text-ink/50">— {block.cite}</cite> : null}
        </blockquote>
      );
    case 'callout':
      return (
        <aside key={index} className="rounded-[4px] bg-ink px-6 py-6 text-paper shadow-[6px_6px_0_0_rgba(255,17,0,0.9)] md:px-8 md:py-7">
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-accent">{block.title}</p>
          <p className="font-serif text-[1.08rem] leading-[1.7] text-paper/90">{renderInline(block.body)}</p>
        </aside>
      );
    case 'image':
      return (
        <figure key={index} className="overflow-hidden rounded-[4px] border border-ink/10">
          <img src={block.src} alt={block.alt} loading="lazy" className="w-full" />
          {block.caption ? (
            <figcaption className="bg-ink/[0.04] px-4 py-3 font-body text-sm text-ink/55">{block.caption}</figcaption>
          ) : null}
        </figure>
      );
    case 'table':
      return (
        <figure key={index} className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            {block.caption ? (
              <caption className="mb-3 text-left font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-ink/50">
                {block.caption}
              </caption>
            ) : null}
            <thead>
              <tr className="border-b-2 border-ink">
                {block.headers.map((header, i) => (
                  <th key={i} className="py-3 pr-4 font-body text-sm font-extrabold uppercase tracking-wide text-ink">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-b border-ink/15">
                  {row.map((cell, c) => (
                    <td key={c} className="py-3.5 pr-4 align-top font-serif text-[1.02rem] leading-[1.55] text-ink/85">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      );
    case 'stat':
      return (
        <figure key={index} className="border-l-[3px] border-accent bg-ink/[0.03] py-5 pl-6 pr-5">
          <p className="font-body text-4xl font-extrabold tracking-tight text-ink md:text-5xl">{block.value}</p>
          <figcaption className="mt-2 font-serif text-[1.05rem] leading-[1.6] text-ink/75">
            {renderInline(block.label)}
            {block.source ? (
              <span className="mt-1 block font-body text-sm text-ink/50">
                {block.sourceUrl ? (
                  <a
                    href={block.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-ink/30 underline-offset-4 hover:decoration-accent"
                  >
                    {block.source}
                  </a>
                ) : (
                  block.source
                )}
              </span>
            ) : null}
          </figcaption>
        </figure>
      );
    default:
      return null;
  }
}

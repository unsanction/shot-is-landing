import { HomeFooter } from '../components/home/HomeFooter';
import { HomeNav } from '../components/home/HomeNav';
import { formatDate, renderBlock, renderInline } from '../components/blog/BlogProse';
import {
  blogIndexPath,
  blogPostPath,
  blogPostsByLang,
  blogSibling,
  blogStrings,
  readingTime,
  type BlogPost,
} from '../data/blog';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

type BlogPostPageProps = {
  post: BlogPost;
};

export function BlogPostPage({ post }: BlogPostPageProps) {
  useRevealOnScroll();

  const t = blogStrings[post.lang];
  const sibling = blogSibling(post);
  const sections = post.blocks.filter((b) => b.type === 'h2') as Array<{ type: 'h2'; text: string; id: string }>;
  const related = blogPostsByLang[post.lang].filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-black text-white selection:text-accent">
      <div className="grain" aria-hidden="true" />
      <HomeNav />

      <main>
        <article>
          <header className="relative w-full overflow-hidden px-5 pb-10 pt-32 md:px-8 md:pb-12 md:pt-40">
            <div className="relative z-10 mx-auto max-w-[44rem]">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <a
                  href={blogIndexPath(post.lang)}
                  className="font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-accent transition-colors hover:text-white"
                >
                  ← {t.backToBlog}
                </a>
                {sibling ? (
                  <a
                    href={blogPostPath(sibling)}
                    className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white/50 transition-colors hover:text-accent"
                  >
                    {t.switchLabel}
                  </a>
                ) : null}
              </div>

              <h1 className="text-[clamp(1.85rem,5vw,3.25rem)] font-extrabold uppercase leading-[0.98] tracking-tight">
                {post.title}
              </h1>

              <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-white/45">
                <span>{post.author.name}</span>
                <span aria-hidden="true">·</span>
                <span>
                  {t.publishedOn} <time dateTime={post.datePublished}>{formatDate(post.datePublished, post.lang)}</time>
                </span>
                <span aria-hidden="true">·</span>
                <span>{t.readTime(readingTime(post))}</span>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[44rem] px-5 pb-10 md:px-8">
            {/* TL;DR — high-citability key takeaways */}
            <section aria-label={t.keyTakeaways} className="rounded-[6px] border border-white/12 bg-white/[0.03] p-6 md:p-8">
              <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-accent">{t.keyTakeaways}</p>
              <ul className="space-y-3">
                {post.tldr.map((item, i) => (
                  <li key={i} className="flex gap-3 font-body text-[1.02rem] font-medium leading-relaxed text-white/80">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                    <span>{renderInline(item)}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Table of contents */}
            {sections.length > 2 ? (
              <nav aria-label={t.onThisPage} className="mt-6 border-l-2 border-white/10 pl-5">
                <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-white/40">{t.onThisPage}</p>
                <ul className="space-y-2">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-sm font-semibold text-white/55 transition-colors hover:text-accent"
                      >
                        {section.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>

          <div className="mx-auto max-w-[44rem] space-y-6 px-5 pb-16 md:px-8 md:pb-20">
            {post.blocks.map((block, index) => renderBlock(block, index))}
          </div>

          {/* FAQ */}
          {post.faq?.length ? (
            <section className="px-5 pb-16 md:px-8 md:pb-20">
              <div className="mx-auto max-w-[44rem] border-t border-white/10 pt-12">
                <h2 className="font-body mb-6 text-2xl font-extrabold tracking-tight text-white md:text-3xl">{t.faqTitle}</h2>
                <div className="divide-y divide-white/10 border-y border-white/10">
                  {post.faq.map((item) => (
                    <details key={item.question} className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-body text-base font-bold text-white/90 transition-colors hover:text-accent md:text-lg">
                        {item.question}
                        <span
                          aria-hidden="true"
                          className="flex-none text-2xl font-light leading-none text-accent transition-transform group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <p className="pb-5 font-serif text-[1.08rem] leading-[1.75] text-white/70">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </section>
          ) : null}
        </article>

        {/* CTA */}
        <section className="bg-accent px-5 py-16 text-white md:px-8 md:py-20">
          <div className="mx-auto max-w-[44rem]">
            <h2 className="text-3xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl">{t.ctaTitle}</h2>
            <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-white/85 md:text-lg">{t.ctaBody}</p>
            <a
              href="/#join"
              className="mt-8 inline-flex items-center justify-center bg-white px-9 py-5 text-xs font-black uppercase tracking-[0.26em] text-black transition-all hover:-rotate-1 hover:bg-black hover:text-white"
            >
              {t.ctaButton}
            </a>
          </div>
        </section>

        {/* Related */}
        {related.length ? (
          <section className="px-5 py-16 md:px-8 md:py-20">
            <div className="mx-auto max-w-[44rem]">
              <h2 className="font-body mb-8 text-2xl font-extrabold tracking-tight md:text-3xl">{t.relatedTitle}</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {related.map((rel) => (
                  <a
                    key={rel.slug}
                    href={blogPostPath(rel)}
                    className="group rounded-[4px] border border-white/10 p-6 transition-colors hover:border-accent/50 hover:bg-white/[0.03]"
                  >
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white/40">
                      {formatDate(rel.datePublished, post.lang)}
                    </p>
                    <h3 className="mt-3 text-lg font-black uppercase leading-tight tracking-tight transition-colors group-hover:text-accent">
                      {rel.title}
                    </h3>
                  </a>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <HomeFooter />
    </div>
  );
}

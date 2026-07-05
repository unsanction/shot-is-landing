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
import { useReadProgress } from '../hooks/useReadProgress';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { trackStudioClick, withUtm } from '../lib/track';

type BlogPostPageProps = {
  post: BlogPost;
};

export function BlogPostPage({ post }: BlogPostPageProps) {
  useRevealOnScroll();
  useReadProgress(post.slug, post.lang);

  const t = blogStrings[post.lang];
  const sibling = blogSibling(post);
  const sections = post.blocks.filter((b) => b.type === 'h2') as Array<{ type: 'h2'; text: string; id: string }>;
  const related = blogPostsByLang[post.lang].filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-black text-white">
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

              <nav
                aria-label="Breadcrumb"
                className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white/40"
              >
                <a href="/" className="transition-colors hover:text-accent">
                  SHOT.IS
                </a>
                <span aria-hidden="true" className="mx-2">
                  /
                </span>
                <a href={blogIndexPath(post.lang)} className="transition-colors hover:text-accent">
                  {t.blogTitle}
                </a>
                <span aria-hidden="true" className="mx-2">
                  /
                </span>
                <span className="text-white/60">{post.title}</span>
              </nav>

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

          {/* Paper reading surface — dark brand header above, light "print" sheet for the long read */}
          <div className="border-t-2 border-accent bg-paper text-ink">
            <div className="mx-auto max-w-[44rem] px-5 pt-12 md:px-8 md:pt-16">
              {/* TL;DR — high-citability key takeaways */}
              <section
                aria-label={t.keyTakeaways}
                className="rounded-[4px] border border-ink/15 bg-white/70 p-6 md:p-8"
              >
                <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
                  {t.keyTakeaways}
                </p>
                <ul className="space-y-3">
                  {post.tldr.map((item, i) => (
                    <li key={i} className="flex gap-3.5 font-body text-[1rem] font-medium leading-relaxed text-ink/85">
                      <span aria-hidden="true" className="mt-[0.55em] h-[7px] w-[7px] flex-none bg-accent" />
                      <span>{renderInline(item)}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Table of contents */}
              {sections.length > 2 ? (
                <nav aria-label={t.onThisPage} className="mt-8 border-l-2 border-ink/15 pl-5">
                  <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-ink/45">
                    {t.onThisPage}
                  </p>
                  <ul className="space-y-2">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="font-body text-sm font-semibold text-ink/60 transition-colors hover:text-accent"
                        >
                          {section.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : null}
            </div>

            <div className="mx-auto max-w-[44rem] space-y-6 px-5 pb-16 pt-10 md:px-8 md:pb-20 md:pt-12">
              {post.blocks.map((block, index) => renderBlock(block, index))}
            </div>
          </div>
        </article>

        {/* CTA */}
        <section className="bg-accent px-5 py-16 text-white md:px-8 md:py-20">
          <div className="mx-auto max-w-[44rem]">
            <h2 className="text-3xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl">{t.ctaTitle}</h2>
            <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-white/85 md:text-lg">{t.ctaBody}</p>
            <a
              href={withUtm('https://studio.shot.is/', 'blog_post')}
              onClick={() => trackStudioClick('blog_post')}
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

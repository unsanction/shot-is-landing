import { HomeFooter } from '../components/home/HomeFooter';
import { HomeNav } from '../components/home/HomeNav';
import { formatDate } from '../components/blog/BlogProse';
import {
  blogIndexPath,
  blogPostPath,
  blogStrings,
  readingTime,
  type BlogLang,
  type BlogPost,
} from '../data/blog';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

type BlogIndexPageProps = {
  lang: BlogLang;
  posts: BlogPost[];
};

export function BlogIndexPage({ lang, posts }: BlogIndexPageProps) {
  useRevealOnScroll();

  const t = blogStrings[lang];
  const otherLang: BlogLang = lang === 'en' ? 'es' : 'en';

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="grain" aria-hidden="true" />
      <HomeNav />

      <main>
        <section className="relative w-full overflow-hidden px-5 pb-16 pt-36 md:px-8 md:pb-20 md:pt-44">
          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-accent">SHOT.IS · Blog</p>
              <a
                href={blogIndexPath(otherLang)}
                className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white/50 transition-colors hover:text-accent"
              >
                {t.switchLabel}
              </a>
            </div>
            <h1 className="max-w-5xl text-[clamp(2rem,7vw,5.5rem)] font-extrabold uppercase leading-[0.9] tracking-tight">
              {t.blogTitle}
            </h1>
            <p className="mt-8 max-w-3xl text-lg font-medium leading-tight text-white/50 md:text-2xl">{t.blogLede}</p>
          </div>
        </section>

        <section className="px-5 pb-28 md:px-8 md:pb-36">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2">
            {posts.map((post, index) => (
              <a
                key={post.slug}
                href={blogPostPath(post)}
                data-reveal
                className="reveal-text group flex flex-col rounded-[4px] border border-white/10 bg-white/[0.02] p-7 transition-colors hover:border-accent/50 hover:bg-white/[0.04] md:p-9"
                style={{ transitionDelay: `${index * 0.06}s` }}
              >
                <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-white/45">
                  <time dateTime={post.datePublished}>{formatDate(post.datePublished, lang)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{t.readTime(readingTime(post))}</span>
                </div>
                <h2 className="font-body text-[1.4rem] font-extrabold leading-snug tracking-tight text-white transition-colors group-hover:text-accent md:text-[1.6rem]">
                  {post.title}
                </h2>
                <p className="mt-4 flex-1 font-serif text-[1.05rem] leading-[1.7] text-white/60">{post.excerpt}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <HomeFooter />
    </div>
  );
}

import { HomeFooter } from '../components/home/HomeFooter';
import { HomeNav } from '../components/home/HomeNav';
import { founder } from '../data/seo';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

const principles = [
  {
    title: 'Performance creative first',
    body: 'Every output exists to be tested. We design AI content for paid social testing, hook iteration, and reusable creator systems — not one-off vanity assets.',
  },
  {
    title: 'Repeatable creator identity',
    body: 'A face, voice, and visual lane that can ship weekly. We treat virtual creators like brand assets that compound, not single-use generations.',
  },
  {
    title: 'Transparent with AI',
    body: 'AI content is labelled where platforms require it. We do not impersonate real people, claim AI footage is human-sourced, or fabricate testimonials.',
  },
];

export function AboutPage() {
  useRevealOnScroll();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="grain" aria-hidden="true" />
      <HomeNav />

      <main>
        <section className="px-5 pt-36 pb-16 md:px-8 md:pt-44 md:pb-24">
          <div className="mx-auto max-w-5xl">
            <p className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-accent">
              About SHOT.IS
            </p>
            <h1 className="text-[clamp(2rem,7vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-tight">
              An AI content studio built for performance teams.
            </h1>
            <p className="mt-10 max-w-3xl text-lg font-medium leading-relaxed text-white/55 md:text-xl">
              SHOT.IS is a remote-first AI content studio. We help mobile apps, ecommerce brands, SaaS products,
              agencies, and growth teams turn briefs into UGC-style ads, AI video ads, virtual influencer systems, and
              campaign creative. The studio combines creative direction, prompt design, model orchestration, and
              edit-stage polish to ship assets that are testable in real ad accounts.
            </p>
          </div>
        </section>

        <section className="bg-white px-5 py-24 text-black md:px-8 md:py-32">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div data-reveal className="reveal-text">
              <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
                How we work
              </p>
              <h2 className="text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-[64px]">
                Principles, not pitches.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {principles.map((principle, index) => (
                <article
                  key={principle.title}
                  data-reveal
                  className="reveal-text rounded-[4px] border border-black/10 p-6 md:p-8"
                  style={{ transitionDelay: `${index * 0.08}s` }}
                >
                  <h3 className="text-2xl font-black uppercase leading-none tracking-tight">{principle.title}</h3>
                  <p className="mt-5 text-base font-medium leading-relaxed text-black/60">{principle.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {founder ? (
          <section id="founder" className="bg-[#050505] px-5 py-24 text-white md:px-8 md:py-32">
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-[auto_1fr] md:gap-14">
              {founder.photo ? (
                <img
                  src={founder.photo}
                  alt={founder.name}
                  className="h-40 w-40 rounded-[4px] object-cover md:h-52 md:w-52"
                />
              ) : null}
              <div>
                <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
                  Founder
                </p>
                <h2 className="text-3xl font-black uppercase leading-[0.95] tracking-tight sm:text-4xl md:text-[52px]">
                  {founder.name}
                </h2>
                <p className="mt-3 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-white/45">
                  {founder.role}
                </p>
                <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-white/60 md:text-lg">
                  {founder.bio}
                </p>
                {founder.linkedIn ? (
                  <a
                    href={founder.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-accent transition-colors hover:text-white"
                  >
                    LinkedIn →
                  </a>
                ) : null}
              </div>
            </div>
          </section>
        ) : null}

        <section className="bg-black px-5 py-24 text-white md:px-8 md:py-32">
          <div className="mx-auto max-w-5xl">
            <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
              The studio
            </p>
            <h2 className="mb-10 text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-[64px]">
              A small team, a deep stack.
            </h2>
            <p className="text-lg font-medium leading-relaxed text-white/55 md:text-xl">
              SHOT.IS pairs creative direction, AI generation pipelines, and post-production into one delivery system.
              Brands get one studio responsible for the brief, the creator persona, the generation, the edit, and the
              campaign-ready files. To start a project or scope a creative sprint, see{' '}
              <a href="/contact" className="text-accent underline-offset-4 hover:underline">
                contact
              </a>
              .
            </p>
          </div>
        </section>
      </main>

      <HomeFooter />
    </div>
  );
}

export default AboutPage;

import { HomeFooter } from '../components/home/HomeFooter';
import { HomeNav } from '../components/home/HomeNav';

const contactPaths = [
  {
    label: 'Email',
    value: 'hello@shot.is',
    href: 'mailto:hello@shot.is',
  },
  {
    label: 'Press',
    value: 'press@shot.is',
    href: 'mailto:press@shot.is',
  },
];

export function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="grain" aria-hidden="true" />
      <HomeNav />

      <main>
        <section className="px-5 pt-36 pb-16 md:px-8 md:pt-44 md:pb-24">
          <div className="mx-auto max-w-5xl">
            <p className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-accent">Contact</p>
            <h1 className="text-[clamp(2rem,7vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-tight">
              Start an AI content sprint.
            </h1>
            <p className="mt-10 max-w-3xl text-lg font-medium leading-relaxed text-white/55 md:text-xl">
              Tell us about the campaign. Brief the offer, the platform, and the testing volume you need. We respond
              with a creative direction, scope, and timeline within two business days.
            </p>
          </div>
        </section>

        <section className="bg-white px-5 py-24 text-black md:px-8 md:py-32">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2">
            {contactPaths.map((item) => (
              <article key={item.label} className="rounded-[4px] border border-black/10 p-8">
                <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                  {item.label}
                </p>
                <a
                  href={item.href}
                  className="break-all text-3xl font-black uppercase leading-none tracking-tight underline-offset-4 hover:text-accent hover:underline md:text-4xl"
                >
                  {item.value}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-black px-5 py-24 text-white md:px-8 md:py-32">
          <div className="mx-auto max-w-5xl">
            <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
              What to send
            </p>
            <ul className="list-disc space-y-3 pl-6 text-base leading-relaxed text-white/65 md:text-lg">
              <li>Brand, product, target audience, and primary platform (TikTok, Reels, Shorts, Meta, app).</li>
              <li>Number of creative variants you want to test in the first sprint.</li>
              <li>Whether you want creator-style UGC, AI video ads, or a virtual influencer system.</li>
              <li>Any existing creative, brand guidelines, or competitor benchmarks worth referencing.</li>
            </ul>
          </div>
        </section>
      </main>

      <HomeFooter />
    </div>
  );
}

export default ContactPage;

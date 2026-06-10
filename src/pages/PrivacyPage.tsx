import { HomeFooter } from '../components/home/HomeFooter';
import { HomeNav } from '../components/home/HomeNav';
import { buildDate } from '../data/seo';

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="grain" aria-hidden="true" />
      <HomeNav />

      <main className="px-5 pb-32 pt-36 md:px-8 md:pt-44">
        <article className="mx-auto max-w-3xl space-y-10 text-white/75">
          <header>
            <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-accent">
              Privacy Policy
            </p>
            <h1 className="text-4xl font-extrabold uppercase leading-[0.92] tracking-tight md:text-6xl">
              Privacy Policy
            </h1>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.24em] text-white/45">
              Last updated: {buildDate}
            </p>
          </header>

          <section className="space-y-4 text-base leading-relaxed md:text-lg">
            <h2 className="text-xl font-black uppercase tracking-tight md:text-2xl">What we collect</h2>
            <p>
              SHOT.IS collects information you submit through our contact channels (name, email, brand, project
              details), aggregate analytics about site visits (page views, referrer, device class), and any project
              files you choose to share when scoping a brief.
            </p>
          </section>

          <section className="space-y-4 text-base leading-relaxed md:text-lg">
            <h2 className="text-xl font-black uppercase tracking-tight md:text-2xl">How we use it</h2>
            <p>
              We use submitted information to respond to inquiries, scope creative projects, deliver assets, and
              improve the studio. We do not sell personal information. We do not use AI training pipelines on client
              briefs or assets without explicit written agreement.
            </p>
          </section>

          <section className="space-y-4 text-base leading-relaxed md:text-lg">
            <h2 className="text-xl font-black uppercase tracking-tight md:text-2xl">Cookies and analytics</h2>
            <p>
              The site uses minimal first-party storage required for navigation. Analytics, when enabled, are
              aggregated and do not identify individual visitors. If we add third-party tooling, this policy will be
              updated and will list the providers.
            </p>
          </section>

          <section className="space-y-4 text-base leading-relaxed md:text-lg">
            <h2 className="text-xl font-black uppercase tracking-tight md:text-2xl">Your rights</h2>
            <p>
              You may request access, correction, or deletion of personal information we hold by emailing{' '}
              <a href="mailto:privacy@shot.is" className="text-accent underline-offset-4 hover:underline">
                privacy@shot.is
              </a>
              . We respond within 30 days.
            </p>
          </section>

          <section className="space-y-4 text-base leading-relaxed md:text-lg">
            <h2 className="text-xl font-black uppercase tracking-tight md:text-2xl">Contact</h2>
            <p>
              Questions about this policy:{' '}
              <a href="mailto:privacy@shot.is" className="text-accent underline-offset-4 hover:underline">
                privacy@shot.is
              </a>
              .
            </p>
          </section>
        </article>
      </main>

      <HomeFooter />
    </div>
  );
}

export default PrivacyPage;

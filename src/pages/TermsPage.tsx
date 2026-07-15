import { HomeFooter } from '../components/home/HomeFooter';
import { HomeNav } from '../components/home/HomeNav';
import { termsLastUpdated } from '../data/seo';

export function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="grain" aria-hidden="true" />
      <HomeNav />

      <main className="px-5 pb-32 pt-36 md:px-8 md:pt-44">
        <article className="mx-auto max-w-3xl space-y-10 text-white/75">
          <header>
            <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-accent">
              Terms of Service
            </p>
            <h1 className="text-4xl font-extrabold uppercase leading-[0.92] tracking-tight md:text-6xl">
              Terms of Service
            </h1>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.24em] text-white/45">
              Last updated: {termsLastUpdated}
            </p>
          </header>

          <section className="space-y-4 text-base leading-relaxed md:text-lg">
            <h2 className="text-xl font-black uppercase tracking-tight md:text-2xl">Use of the site</h2>
            <p>
              The SHOT.IS site is provided as-is for informational purposes. By using the site you agree not to
              attempt to disrupt the service, scrape it for unlicensed AI training, or use it to develop competing
              services that copy proprietary brand creative shown here.
            </p>
          </section>

          <section className="space-y-4 text-base leading-relaxed md:text-lg">
            <h2 className="text-xl font-black uppercase tracking-tight md:text-2xl">AI content</h2>
            <p>
              AI-generated assets shown on the site are illustrative. Likeness, brand logos, and creative outputs
              produced under contract belong to the engagement scope agreed in writing with each client. SHOT.IS does
              not generate content depicting real, identifiable individuals without their consent.
            </p>
          </section>

          <section className="space-y-4 text-base leading-relaxed md:text-lg">
            <h2 className="text-xl font-black uppercase tracking-tight md:text-2xl">Service engagements</h2>
            <p>
              Paid engagements are governed by a separate statement of work that defines deliverables, timelines,
              ownership, and revisions. These terms do not replace any signed agreement.
            </p>
          </section>

          <section className="space-y-4 text-base leading-relaxed md:text-lg">
            <h2 className="text-xl font-black uppercase tracking-tight md:text-2xl">Disclaimers</h2>
            <p>
              SHOT.IS does not guarantee specific advertising outcomes. Performance figures referenced in case
              studies represent past engagements and are not a forecast for future campaigns.
            </p>
          </section>

          <section className="space-y-4 text-base leading-relaxed md:text-lg">
            <h2 className="text-xl font-black uppercase tracking-tight md:text-2xl">Contact</h2>
            <p>
              Questions about these terms:{' '}
              <a href="mailto:legal@shot.is" className="text-accent underline-offset-4 hover:underline">
                legal@shot.is
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

export default TermsPage;

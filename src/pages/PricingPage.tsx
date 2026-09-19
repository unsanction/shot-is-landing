import { HomeFooter } from '../components/home/HomeFooter';
import { HomeNav } from '../components/home/HomeNav';
import { PricingCards } from '../components/home/PricingSection';
import { launchOffer } from '../data/pricing';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

const pricingFacts = [
  {
    title: 'What the $4.99 offer means',
    body: 'This is the limited-time entry price for one self-serve AI video generation in SHOT.IS Studio. Studio keeps the selected model, duration, and credit cost visible before the run starts.',
  },
  {
    title: 'Why video packs exist',
    body: 'Paid social rarely needs one render. Packs suit teams testing several hooks, creators, shots, or product angles. Sizes and prices live in Studio, so checkout and this page never disagree.',
  },
  {
    title: 'When managed production wins',
    body: 'Choose managed production when the job includes creative strategy, reference preparation, continuity QA, editing, and campaign-ready variant naming, rather than generating a single clip.',
  },
];

export function PricingPage() {
  useRevealOnScroll();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="grain" aria-hidden="true" />
      <HomeNav />

      <main>
        <section className="px-5 pb-20 pt-36 md:px-8 md:pb-28 md:pt-44">
          <div className="mx-auto max-w-6xl">
            <p className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-accent">
              SHOT.IS Pricing
            </p>
            <h1 className="max-w-6xl text-[clamp(2.4rem,7vw,6.5rem)] font-extrabold uppercase leading-[0.88] tracking-tight">
              AI videos from {launchOffer.price}. No mystery math.
            </h1>
            <p className="mt-10 max-w-3xl text-lg font-medium leading-relaxed text-white/60 md:text-xl">
              Generate one video self-serve, buy a pack for creative testing, or brief SHOT.IS to deliver the whole
              campaign. The production mode changes; the price boundary stays explicit.
            </p>
          </div>
        </section>

        <section className="bg-[#050505] px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <PricingCards location="pricing_page" />
            <p className="mt-6 max-w-3xl font-mono text-[10px] font-semibold uppercase leading-relaxed tracking-[0.2em] text-white/35">
              {launchOffer.note}
            </p>
          </div>
        </section>

        <section className="bg-white px-5 py-24 text-black md:px-8 md:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 max-w-4xl">
              <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
                The honest boundary
              </p>
              <h2 className="text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-[68px]">
                A generation is not the same job as a campaign.
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {pricingFacts.map((fact, index) => (
                <article
                  key={fact.title}
                  data-reveal
                  className="reveal-text rounded-[4px] border border-black/10 p-6 md:p-8"
                  style={{ transitionDelay: `${index * 0.08}s` }}
                >
                  <h3 className="text-2xl font-black uppercase leading-none tracking-tight">{fact.title}</h3>
                  <p className="mt-5 text-base font-medium leading-relaxed text-black/60">{fact.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <HomeFooter />
    </div>
  );
}

export default PricingPage;

import { launchOffer, pricingOptions } from '../../data/pricing';
import { trackCta, trackStudioClick, withUtm, type CtaLocation } from '../../lib/track';

type PricingCardsProps = {
  location: CtaLocation;
};

export function PricingCards({ location }: PricingCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {pricingOptions.map((option, index) => {
        const href = option.studio ? withUtm(option.href, location) : option.href;
        const priceClass =
          option.id === 'packs'
            ? 'text-[clamp(2rem,3.2vw,2.55rem)]'
            : option.id === 'managed'
              ? 'text-[clamp(2.1rem,3.4vw,2.8rem)]'
              : 'text-[clamp(2.3rem,6vw,4.4rem)]';
        return (
          <article
            key={option.id}
            data-reveal
            className={`reveal-text flex min-h-[500px] flex-col rounded-[4px] border p-6 md:p-8 ${
              option.featured
                ? 'border-accent bg-accent text-white'
                : 'border-white/10 bg-white/[0.03] text-white'
            }`}
            style={{ transitionDelay: `${index * 0.08}s` }}
          >
            <p
              className={`font-mono text-[10px] font-bold uppercase tracking-[0.28em] ${
                option.featured ? 'text-white/75' : 'text-accent'
              }`}
            >
              {option.eyebrow}
            </p>
            <h3 className="mt-6 text-3xl font-black uppercase leading-[0.92] tracking-tight md:text-4xl">
              {option.title}
            </h3>
            <div className="mt-10">
              <div className={`${priceClass} max-w-full break-normal font-black uppercase leading-none tracking-tight`}>
                {option.price}
              </div>
              <p className={`mt-3 font-mono text-[10px] font-bold uppercase tracking-[0.24em] ${
                option.featured ? 'text-white/70' : 'text-white/45'
              }`}>
                {option.unit}
              </p>
            </div>
            <p className={`mt-8 text-base font-medium leading-relaxed ${
              option.featured ? 'text-white/85' : 'text-white/60'
            }`}>
              {option.description}
            </p>
            <ul className="mt-8 space-y-3">
              {option.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm font-semibold leading-relaxed">
                  <span aria-hidden="true" className={option.featured ? 'text-white' : 'text-accent'}>→</span>
                  <span className={option.featured ? 'text-white/85' : 'text-white/65'}>{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href={href}
              onClick={() => (option.studio ? trackStudioClick(location) : trackCta(location, option.cta))}
              className={`mt-auto inline-flex min-h-14 items-center justify-center px-6 py-4 text-center text-[11px] font-black uppercase tracking-[0.22em] transition-all hover:-rotate-1 ${
                option.featured
                  ? 'bg-white text-black hover:bg-black hover:text-white'
                  : 'bg-white text-black hover:bg-accent hover:text-white'
              }`}
            >
              {option.cta}
            </a>
          </article>
        );
      })}
    </div>
  );
}

export function PricingSection() {
  return (
    <section id="pricing" className="bg-[#050505] px-5 py-24 text-white md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
              Clear pricing
            </p>
            <h2 className="max-w-5xl text-[2.35rem] font-black uppercase leading-[0.9] tracking-tight sm:text-5xl md:text-[72px] lg:text-[84px]">
              Make one video. Then scale the winners.
            </h2>
          </div>
          <p className="max-w-xl text-base font-medium leading-relaxed text-white/60 md:text-lg lg:justify-self-end">
            Start self-serve with the {launchOffer.price} launch offer, move into video packs when you need testing
            volume, or hand the whole campaign to the managed studio.
          </p>
        </div>
        <PricingCards location="pricing_section" />
        <p className="mt-6 max-w-3xl font-mono text-[10px] font-semibold uppercase leading-relaxed tracking-[0.2em] text-white/35">
          {launchOffer.note}
        </p>
      </div>
    </section>
  );
}

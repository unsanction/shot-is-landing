import { creators } from '../../data/landing';
import type { Creator } from '../../types/content';

function CreatorCard({ creator, index }: { creator: Creator; index: number }) {
  return (
    <article
      data-reveal
      className="reveal-text group cursor-pointer"
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className={`image-card mb-8 ${creator.lifted ? 'md:translate-y-12' : ''}`}>
        <img src={creator.image} alt={creator.alt} loading="lazy" decoding="async" />
        <div className="image-card__accent" />
      </div>
      <h3
        /* Fluid below md: at Galaxy-Fold widths a fixed 2.25rem split
           "PRODUCT" across two lines. */
        className={`${creator.lifted ? 'md:mt-12' : ''} break-words text-[clamp(1.75rem,7.5vw,2.25rem)] font-black uppercase leading-[0.95] tracking-tight md:text-[30px] xl:text-4xl`}
      >
        {creator.name}
      </h3>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-widest opacity-40">{creator.description}</p>
    </article>
  );
}

export function RosterSection() {
  return (
    <section id="roster" className="bg-white px-5 py-24 text-black md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 flex flex-col gap-8 md:mb-24 xl:flex-row xl:items-end xl:justify-between">
          <h2 className="text-[clamp(2.65rem,10vw,7rem)] font-extrabold uppercase leading-none tracking-tight">
            WHAT <br className="sm:hidden" />
            WE <br />
            <span className="italic text-accent">SHIP.</span>
          </h2>
          <p className="max-w-md text-base font-bold uppercase leading-tight md:text-lg xl:text-right">
            Product heroes, character-led spots, and virtual influencer personas — built as systems, so a brand looks
            identical across every variant. Frames below are from shipped campaigns.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {creators.map((creator, index) => (
            <CreatorCard key={creator.name} creator={creator} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

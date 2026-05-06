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
        className={`${creator.lifted ? 'md:mt-12' : ''} break-words text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-[30px] xl:text-4xl`}
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
            AI <br className="sm:hidden" />
            CREATOR <br />
            <span className="italic text-accent">ROSTER.</span>
          </h2>
          <p className="max-w-md text-base font-bold uppercase leading-tight md:text-lg xl:text-right">
            Virtual influencers, creator personas, and AI talent systems for campaigns that need repeatable visual
            identity.
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

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
        <img src={creator.image} alt={creator.name} />
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
        <div className="mb-20 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
          <h2 className="text-5xl font-extrabold uppercase leading-none tracking-tight sm:text-6xl md:text-[88px] lg:text-9xl">
            MEET THE <br />
            <span className="italic text-accent">NEW GODS.</span>
          </h2>
          <p className="max-w-md text-base font-bold uppercase leading-tight md:text-lg">
            We don&apos;t just build characters. We build legends with lore, soul, and 100% digital DNA.
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

import { type CSSProperties } from 'react';
import { slotResults } from '../../data/landing';
import { useSlotCycle } from '../../hooks/useSlotCycle';

export function SlotStatementSection() {
  const { slotWords, slotOffset, slotPhase } = useSlotCycle(slotResults, 'INEVITABLE.');

  return (
    <section className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16">
          <div data-reveal className="reveal-text max-w-full">
            <h2 className="mb-12 text-[2.8rem] font-black uppercase leading-[0.9] tracking-tight sm:text-6xl sm:leading-none md:text-[84px] lg:text-8xl">
              THE SHOT IS <br />
              <span
                className="slot-machine text-accent"
                aria-live="polite"
                style={{ '--slot-offset': slotOffset } as CSSProperties}
              >
                <span className={`slot-machine__reel slot-machine__reel--${slotPhase}`}>
                  {slotWords.map((word, index) => (
                    <span key={`${word}-${index}`} className="slot-machine__item">
                      {word}
                    </span>
                  ))}
                </span>
              </span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

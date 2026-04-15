import { type CSSProperties, FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Creator = {
  name: string;
  description: string;
  image: string;
  lifted?: boolean;
};

const creators: Creator[] = [
  {
    name: 'VEXA-9',
    description: 'Cyber-High-End Influencer // 12.4M reach',
    image:
      'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1000',
  },
  {
    name: 'KAI_OS',
    description: 'Digital Rebel // Trend Saboteur',
    image:
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000',
    lifted: true,
  },
  {
    name: 'LUNA_CORE',
    description: 'Virtual Oracle // High-Concept Video',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000',
  },
];

const reelVideos = [
  { src: '/media/reel/visual-overload.mp4', poster: '/media/reel/visual-overload-poster.jpg' },
];

const stats = [
  { value: '847M+', label: 'Total Reach', sub: 'Across all platforms' },
  { value: '12.4M', label: 'Avg. Engagement', sub: 'Per campaign cycle' },
  { value: '340%', label: 'ROI Increase', sub: 'vs. traditional creators' },
  { value: '96%', label: 'Client Retention', sub: 'Year over year' },
  { value: '∞', label: 'Potential', sub: 'No ceiling. No limit.' },
];

const slotResults = ['READY', 'PERFECT', '67', 'VIRAL'];

type SlotPhase = 'idle' | 'spinning' | 'settling';

function App() {
  const [email, setEmail] = useState('');
  const [slotWords, setSlotWords] = useState(['INEVITABLE.']);
  const [slotOffset, setSlotOffset] = useState(0);
  const [slotPhase, setSlotPhase] = useState<SlotPhase>('idle');

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let active = true;
    let outcomeIndex = 0;
    let currentWord = 'INEVITABLE.';
    const timeouts: number[] = [];

    const queue = (callback: () => void, delay: number) => {
      const timeoutId = window.setTimeout(callback, delay);
      timeouts.push(timeoutId);
    };

    const runSlotCycle = () => {
      if (!active) {
        return;
      }

      const targetWord = slotResults[outcomeIndex];
      const reelWords = [
        currentWord,
        ...Array.from({ length: 24 }, (_, index) => slotResults[index % slotResults.length]),
        targetWord,
        targetWord,
      ];
      const targetIndex = reelWords.length - 2;

      setSlotWords(reelWords);
      setSlotOffset(0);
      setSlotPhase('idle');

      queue(() => {
        setSlotPhase('spinning');
        setSlotOffset(targetIndex + 0.22);
      }, 20);

      queue(() => {
        setSlotPhase('settling');
        setSlotOffset(targetIndex);
      }, 2180);

      queue(() => {
        setSlotPhase('idle');
        setSlotWords([targetWord]);
        setSlotOffset(0);
        currentWord = targetWord;
        outcomeIndex = (outcomeIndex + 1) % slotResults.length;
        queue(runSlotCycle, 1800);
      }, 2400);
    };

    queue(runSlotCycle, 1200);

    return () => {
      active = false;
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, []);

    const reelItems = useMemo(() => {
    const expanded = [];
    for (let i = 0; i < 14; i++) {
      expanded.push(reelVideos[i % reelVideos.length]);
    }
    return [...expanded, ...expanded];
  }, []);

  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());

  // Only play videos that are actually visible — pause the rest
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 },
    );

    videoRefs.current.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, [reelItems]);

  const handleVideoHover = useCallback((index: number, isHovering: boolean) => {
    const video = videoRefs.current.get(index);
    if (!video) return;
    if (isHovering) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-black text-white selection:text-accent">
      <div className="grain" aria-hidden="true" />

      <nav className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-5 py-6 mix-blend-difference md:px-6 md:py-7 lg:px-8 lg:py-8">
        <a href="#" className="group flex items-center gap-4 md:gap-4 lg:gap-6">
          <div className="shutter" aria-hidden="true">
            <div className="shutter-blade rotate-0" />
            <div className="shutter-blade rotate-[60deg]" />
            <div className="shutter-blade rotate-[120deg]" />
          </div>
          <div className="text-2xl font-extrabold uppercase italic leading-none tracking-tight md:text-[26px] lg:text-3xl">
            SHOT<span className="opacity-40">.IS</span>
          </div>
        </a>

        <div className="hidden items-center gap-6 text-[10px] font-bold uppercase tracking-[0.22em] md:flex lg:gap-12 lg:text-[11px] lg:tracking-[0.3em]">
          <a href="#roster" className="transition-colors hover:text-accent">
            The Roster
          </a>
          <a href="#vision" className="transition-colors hover:text-accent">
            Vision
          </a>
          <a href="#join" className="transition-colors hover:text-accent">
            Join Circle
          </a>
        </div>

      </nav>

      <main className="bg-black">
        <section className="relative flex min-h-[100dvh] scroll-mt-16 flex-col items-center justify-center px-5 pb-28 pt-32 text-center md:px-8">
          <div className="hero-stage" aria-hidden="true">
            <video
              className="hero-stage__video"
              autoPlay
              loop
              muted
              playsInline
              poster="/media/hero/shot-hero-poster.webp"
            >
              <source src="/media/hero/shot-hero-loop.mp4" type="video/mp4" />
            </video>
            <div className="hero-stage__veil" />
            <div className="hero-stage__grid" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl">
            <h1 className="mb-12 text-5xl font-extrabold uppercase leading-[0.82] tracking-tight sm:text-6xl md:text-[72px] lg:text-[110px] xl:text-[140px]">
              THE SHOT IS <br />
              <span className="text-outline italic">YOUR POWER.</span>
            </h1>
            <p className="mx-auto mb-16 max-w-3xl text-lg font-medium leading-tight text-white/40 sm:text-xl md:text-3xl">
              We are a digital foundry forging the next era of creators. No rules. No limits. Just pure visual
              dominance.
            </p>
            <a
              href="#join"
              className="inline-block bg-white px-8 py-5 text-xs font-black uppercase tracking-[0.3em] text-black transition-all hover:-rotate-1 hover:bg-accent hover:text-white active:scale-95 md:px-12 md:py-6 md:text-sm"
            >
              Apply for Whitelist
            </a>
          </div>

          <div className="absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-4 opacity-30">
            <span className="font-mono text-[9px] uppercase tracking-widest">Scroll to descend</span>
            <div className="h-16 w-px bg-white" />
          </div>
        </section>

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
                <article
                  key={creator.name}
                  data-reveal
                  className="reveal-text group cursor-pointer"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className={`image-card mb-8 ${creator.lifted ? 'md:translate-y-12' : ''}`}>
                    <img src={creator.image} alt={creator.name} />
                    <div className="image-card__accent" />
                  </div>
                  <h3
                    className={`${creator.lifted ? 'md:mt-12' : ''} text-4xl font-black uppercase tracking-tight leading-[0.95] break-words md:text-[30px] xl:text-4xl`}
                  >
                    {creator.name}
                  </h3>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-widest opacity-40">{creator.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="vision" className="relative bg-black px-5 py-28 md:px-8 md:py-40" style={{ marginTop: '-1px' }}>
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-16 md:mb-24">
              <h2 className="mb-8 text-4xl font-black uppercase tracking-tight italic sm:text-5xl md:text-[72px] lg:text-[84px] xl:text-8xl">
                Visual <span className="text-outline">Overload.</span>
              </h2>
              <p className="text-lg font-medium italic text-white/30 md:text-xl">
                &quot;We Forge images that don&apos;t just look real—they look better than reality.&quot;
              </p>
            </div>
          </div>

          <div className="film-strip">
            <div className="film-strip__gate">
              <div className="film-strip__reel">
                {reelItems.map((item, index) => (
                  <div
                    key={index}
                    className="film-cell"
                    onMouseEnter={() => handleVideoHover(index, true)}
                    onMouseLeave={() => handleVideoHover(index, false)}
                  >
                    <div className="film-cell__perf" aria-hidden="true">
                      <span /><span /><span />
                    </div>
                    <div className="film-cell__window">
                      <video
                        ref={(el) => {
                          if (el) videoRefs.current.set(index, el);
                          else videoRefs.current.delete(index);
                        }}
                        src={item.src}
                        poster={item.poster}
                        muted
                        loop
                        playsInline
                        preload="none"
                        className="film-cell__video"
                      />
                      <div className="film-cell__grain" />
                      <div className="film-cell__vignette" />
                      <div className="film-cell__pause-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                          <rect x="6" y="4" width="4" height="16" rx="1" />
                          <rect x="14" y="4" width="4" height="16" rx="1" />
                        </svg>
                      </div>
                    </div>
                    <div className="film-cell__perf" aria-hidden="true">
                      <span /><span /><span />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- SUCCESS CASES --- */}
        <section className="relative overflow-hidden bg-black px-5 py-32 md:px-8 md:py-44">
          <div className="success-bg" aria-hidden="true" />
          <div className="mx-auto max-w-[1400px] relative z-10">
            <div className="mb-16 md:mb-24 text-center">
              {/* <h2 className="mx-auto max-w-[12ch] text-[clamp(3rem,6.5vw,5.5rem)] font-black uppercase leading-[0.85] tracking-tight">
                Numbers<br />
                <span className="text-outline italic">Don&apos;t Lie</span>
              </h2> */}
              <h2 className="mb-8 text-4xl font-black uppercase tracking-tight italic sm:text-5xl md:text-[72px] lg:text-[84px] xl:text-8xl">
                Numbers
                <br />
                <span className="text-outline">Don&apos;t Lie</span>
                </h2>
            </div>

            {stats.map((stat, i) => (
              <div
                key={stat.label}
                data-reveal
                className="reveal-text stat-row"
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <div className="stat-row__line" />
                <div className="stat-row__content">
                  <span className="stat-row__number">{stat.value}</span>
                  <div className="stat-row__info">
                    <span className="stat-row__label">{stat.label}</span>
                    <span className="stat-row__sub">{stat.sub}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

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

        <section id="join" className="relative overflow-hidden bg-accent px-5 py-32 text-white md:px-8 md:py-60">
          <div className="carbon-fibre absolute inset-0 opacity-10 mix-blend-overlay" aria-hidden="true" />

          <div className="relative z-10 mx-auto max-w-5xl">
            <div className="mb-20 text-center md:mb-24">
              <h2 className="mb-8 text-5xl font-black uppercase leading-[0.85] tracking-tight sm:text-6xl md:text-[88px] lg:text-[120px]">
                JOIN THE <br />
                <span className="mix-blend-difference">INNER CIRCLE.</span>
              </h2>
              <p className="text-lg font-bold uppercase italic tracking-[0.35em] opacity-80 md:text-2xl">
                Access is a privilege, not a right.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl flex-col items-center">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="YOUR_PRIVATE_EMAIL"
                required
                className="input-underlined mb-12 text-center font-black uppercase placeholder:text-white/20"
              />
              <button
                type="submit"
                className="w-full bg-black py-6 text-base font-black uppercase tracking-[0.35em] transition-all hover:bg-white hover:text-black md:py-8 md:text-xl md:tracking-[0.5em]"
              >
                Request Access
              </button>
            </form>
          </div>
        </section>
      </main>
      <footer className="py-40 border-t border-white/5 text-center bg-[#050505] relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-20" />
        <div className="font-syne font-extrabold text-[15vw] tracking-tighter uppercase italic opacity-[0.05] select-none mb-16 pointer-events-none">
          SHOT.IS
        </div>
      </footer>
      {/* <footer className="border-t border-white/5 bg-black px-5 py-16 text-center md:px-8 md:py-20">
        <div className="mb-12 flex items-center justify-center gap-4 mix-blend-difference">
          <span className="text-4xl font-black uppercase italic tracking-tight md:text-5xl">SHOT.IS</span>
        </div>
      </footer> */}
    </div>
  );
}

export default App;

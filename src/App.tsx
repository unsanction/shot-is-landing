import { FormEvent, useEffect, useMemo, useState } from 'react';

type Creator = {
  name: string;
  description: string;
  image: string;
  accent?: boolean;
  lifted?: boolean;
};

const creators: Creator[] = [
  {
    name: 'VEXA-9',
    description: 'Cyber-High-End Influencer // 12.4M reach',
    image:
      'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1000',
    accent: true,
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

const samples = Array.from({ length: 10 }, (_, index) => `Video_Sample_${String(index + 1).padStart(2, '0')}`);

function App() {
  const [email, setEmail] = useState('');

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

  const marqueeItems = useMemo(() => [...samples, ...samples], []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.alert('Request Encrypted. Awaiting Clearance.');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-accent">
      <div className="grain" aria-hidden="true" />

      <nav className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-5 py-6 mix-blend-difference md:px-8 md:py-8">
        <a href="#" className="group flex items-center gap-4 md:gap-6">
          <div className="shutter" aria-hidden="true">
            <div className="shutter-blade rotate-0" />
            <div className="shutter-blade rotate-[60deg]" />
            <div className="shutter-blade rotate-[120deg]" />
          </div>
          <div className="text-2xl font-extrabold uppercase italic leading-none tracking-tight md:text-3xl">
            SHOT<span className="opacity-40">.IS</span>
          </div>
        </a>

        <div className="hidden gap-12 text-[11px] font-bold uppercase tracking-[0.3em] md:flex">
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

        <div className="flex items-center gap-3 md:gap-4">
          <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest opacity-50">
            Session_Live
          </span>
        </div>
      </nav>

      <main>
        <section className="relative flex min-h-screen scroll-mt-16 flex-col items-center justify-center px-5 pb-28 pt-32 text-center md:px-8">
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
            <h1 className="mb-12 text-5xl font-extrabold uppercase leading-[0.82] tracking-tight sm:text-6xl md:text-[140px]">
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
              <h2 className="text-5xl font-extrabold uppercase leading-none tracking-tight sm:text-6xl md:text-9xl">
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
                    {creator.accent ? (
                      <div className="absolute inset-0 bg-accent opacity-0 mix-blend-multiply transition-opacity group-hover:opacity-40" />
                    ) : null}
                  </div>
                  <h3 className={`${creator.lifted ? 'md:mt-12' : ''} text-4xl font-black uppercase tracking-tight`}>
                    {creator.name}
                  </h3>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-widest opacity-40">{creator.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative bg-black px-5 py-28 md:px-8 md:py-40">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-16 md:mb-24">
              <h2 className="mb-8 text-4xl font-black uppercase tracking-tight italic sm:text-5xl md:text-8xl">
                Visual <span className="text-outline">Overload.</span>
              </h2>
              <p className="text-lg font-medium italic text-white/30 md:text-xl">
                &quot;We Forge images that don&apos;t just look real—they look better than reality.&quot;
              </p>
            </div>
          </div>

          <div className="-mx-5 overflow-hidden py-12 md:-mx-8">
            <div className="flex rotate-[-2deg] gap-4 whitespace-nowrap">
              <div className="flex min-w-max animate-marquee gap-4">
                {marqueeItems.map((sample, index) => (
                  <div
                    key={`${sample}-${index}`}
                    className="flex h-[320px] w-[240px] items-center justify-center border border-white/10 bg-zinc-900 p-2 grayscale transition-all hover:grayscale-0 sm:h-[360px] sm:w-[270px] md:h-[400px] md:w-[300px]"
                  >
                    <div className="flex h-full w-full items-center justify-center bg-zinc-800 px-4 text-center font-mono text-[10px] uppercase opacity-20">
                      {sample}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="vision" className="px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
              <div data-reveal className="reveal-text">
                <h2 className="mb-12 text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl md:text-8xl">
                  THE SHOT IS <br />
                  <span className="text-accent">INevitable.</span>
                </h2>
                <div className="space-y-12">
                  <div className="border-l-4 border-accent pl-6 md:pl-8">
                    <h3 className="mb-4 text-2xl font-black uppercase">Total Control</h3>
                    <p className="font-medium text-white/40">
                      From personality traits to the exact angle of a light—we define every bit. Your digital fleet
                      acts as one, evolving every second.
                    </p>
                  </div>
                  <div className="border-l-4 border-white/10 pl-6 md:pl-8">
                    <h3 className="mb-4 text-2xl font-black uppercase">Trend Hijacking</h3>
                    <p className="font-medium text-white/40">
                      We don&apos;t follow trends. Our systems detect them before they break, injecting your creators
                      into the core of the cultural conversation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="floating relative flex justify-center">
                <div className="relative flex aspect-square w-full max-w-[28rem] items-center justify-center rounded-full border-2 border-white/5">
                  <div className="absolute h-3/4 w-3/4 animate-pulse rounded-full border border-accent/20" />
                  <div className="text-7xl font-black opacity-10 sm:text-8xl">SHOT</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="join" className="relative overflow-hidden bg-accent px-5 py-32 text-white md:px-8 md:py-60">
          <div className="carbon-fibre absolute inset-0 opacity-10 mix-blend-overlay" aria-hidden="true" />

          <div className="relative z-10 mx-auto max-w-5xl">
            <div className="mb-20 text-center md:mb-24">
              <h2 className="mb-8 text-5xl font-black uppercase leading-[0.85] tracking-tight sm:text-6xl md:text-[120px]">
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

      <footer className="border-t border-white/5 bg-black px-5 py-16 text-center md:px-8 md:py-20">
        <div className="mb-12 flex items-center justify-center gap-4 mix-blend-difference">
          <span className="text-4xl font-black uppercase italic tracking-tight md:text-5xl">SHOT.IS</span>
        </div>
        <div className="mx-auto mb-16 grid max-w-4xl grid-cols-2 gap-6 font-mono text-[10px] uppercase tracking-widest opacity-40 md:mb-20 md:grid-cols-4 md:gap-8">
          <span>No Tools // Just Power</span>
          <span>Local Presence Only</span>
          <span>Forged in Chaos</span>
          <span>© 2026 SHOT_PROTO</span>
        </div>
        <div className="mb-8 h-px w-full bg-white/5" />
        <p className="font-mono text-[8px] uppercase tracking-[0.8em] opacity-20">This is the end of the broadcast.</p>
      </footer>
    </div>
  );
}

export default App;

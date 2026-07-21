import { FormEvent, useState } from 'react';
import { trackCta } from '../../lib/track';

export function JoinSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    trackCta('join_section', 'request_access');
    setEmail('');
  };

  return (
    <section id="join" className="relative overflow-hidden bg-accent px-5 py-32 text-white md:px-8 md:py-60">
      <div className="carbon-fibre absolute inset-0 opacity-10 mix-blend-overlay" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-20 text-center md:mb-24">
          <h2 className="mb-8 text-5xl font-black uppercase leading-[0.85] tracking-tight sm:text-6xl md:text-[88px] lg:text-[120px]">
            GET YOUR FIRST <br />
            <span className="mix-blend-difference">AD MADE.</span>
          </h2>
          <p className="text-lg font-bold uppercase italic tracking-[0.35em] opacity-80 md:text-2xl">
            We onboard a limited number of brands directly each month.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl flex-col items-center">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="YOUR_WORK_EMAIL"
            required
            className="input-underlined mb-12 text-center font-black uppercase placeholder:text-white/20"
          />
          <button
            type="submit"
            className="w-full bg-black py-6 text-base font-black uppercase tracking-[0.35em] transition-all hover:bg-white hover:text-black md:py-8 md:text-xl md:tracking-[0.5em]"
          >
            Request Access
          </button>
          <p className="mt-8 font-mono text-[11px] font-bold uppercase tracking-[0.28em] opacity-60">
            Typical first campaign: a few hundred dollars in finished variants, delivered in days.
          </p>
        </form>
      </div>
    </section>
  );
}

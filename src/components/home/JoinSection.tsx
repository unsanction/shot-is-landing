import { FormEvent, useState } from 'react';
import { trackCta, trackStudioClick, trackWaitlist, withUtm } from '../../lib/track';
import { joinWaitlist, WaitlistError } from '../../lib/waitlist';

type Status = 'idle' | 'submitting' | 'joined' | 'error';

export function JoinSection() {
  const [email, setEmail] = useState('');
  /** Honeypot — hidden from humans, so a filled value means a bot. */
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') return;

    trackCta('join_section', 'request_managed_quote');
    setStatus('submitting');
    setMessage('');

    try {
      const result = await joinWaitlist(email, 'join_section', website);
      setMessage(
        result.alreadyJoined
          ? 'We already have this email — we will follow up about managed production.'
          : 'Request received — we will follow up about managed production.',
      );
      setStatus('joined');
      setEmail('');
      trackWaitlist('join_section', result.alreadyJoined ? 'already_joined' : 'joined');
    } catch (error) {
      setMessage(
        error instanceof WaitlistError
          ? error.message
          : 'Something broke on our side. Email hello@shot.is and we will add you manually.',
      );
      setStatus('error');
      trackWaitlist('join_section', 'error');
    }
  };

  return (
    <section id="join" className="relative overflow-hidden bg-accent px-5 py-32 text-white md:px-8 md:py-60">
      <div className="carbon-fibre absolute inset-0 opacity-10 mix-blend-overlay" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-20 text-center md:mb-24">
          <h2 className="mb-8 text-5xl font-black uppercase leading-[0.85] tracking-tight sm:text-6xl md:text-[88px] lg:text-[120px]">
            MAKE ONE. <br />
            <span className="mix-blend-difference">THEN SCALE IT.</span>
          </h2>
          <p className="text-lg font-bold uppercase italic tracking-[0.35em] opacity-80 md:text-2xl">
            Start self-serve today, or ask the managed studio to deliver the campaign.
          </p>
        </div>

        <a
          href={withUtm('https://studio.shot.is/', 'join_section')}
          onClick={() => trackStudioClick('join_section')}
          className="mx-auto mb-16 flex min-h-16 max-w-2xl items-center justify-center bg-white px-8 py-5 text-center text-sm font-black uppercase tracking-[0.28em] text-black transition-all hover:-rotate-1 hover:bg-black hover:text-white md:text-base"
        >
          Create a $4.99 video
        </a>

        <p className="mb-8 text-center font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
          Need finished variants? Request managed production.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl flex-col items-center">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="YOUR_WORK_EMAIL"
            required
            autoComplete="email"
            disabled={status === 'submitting'}
            aria-describedby="join-status"
            className="input-underlined mb-12 text-center font-black uppercase placeholder:text-white/20 disabled:opacity-50"
          />

          {/* Honeypot: off-screen, never announced, never tab-reachable. */}
          <input
            type="text"
            name="website"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
          />

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-black py-6 text-base font-black uppercase tracking-[0.35em] transition-all hover:bg-white hover:text-black disabled:cursor-wait disabled:opacity-70 md:py-8 md:text-xl md:tracking-[0.5em]"
          >
            {status === 'submitting' ? 'Sending…' : status === 'joined' ? 'Request received' : 'Request managed quote'}
          </button>

          <p
            id="join-status"
            role="status"
            aria-live="polite"
            className={`mt-8 min-h-[1.5rem] text-center font-mono text-[11px] font-bold uppercase tracking-[0.28em] ${
              status === 'error' ? 'text-black' : 'opacity-80'
            }`}
          >
            {message}
          </p>

          <p className="mt-2 text-center font-mono text-[11px] font-bold uppercase tracking-[0.28em] opacity-60">
            Managed work is scoped per brief. Self-serve video packs are priced live in Studio.
          </p>
          <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.24em] opacity-45">
            We will email you about SHOT.IS. Unsubscribe any time.{' '}
            <a href="/privacy" className="underline underline-offset-4">
              Privacy
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}

/**
 * Waitlist capture — the landing's only write to the backend.
 *
 * POST studio.shot.is/api/public/waitlist (see go-backend
 * internal/httpapi/public_waitlist.go). Unauthenticated and cross-origin, so
 * shot.is / www.shot.is must be in the API's CORS_ALLOWED_ORIGINS.
 *
 * The submission carries its own attribution — CTA location, page path,
 * referrer and utm_* off the current URL — because the lead lands in the same
 * table as studio signups and "where did this come from" is the first question
 * anyone asks about it.
 */

import type { CtaLocation } from './track';

/** Dev convenience: a landing running on localhost talks to the local API. */
const apiOrigin = (): string => {
  if (typeof window !== 'undefined' && /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname)) {
    return 'http://localhost:3001';
  }
  return 'https://studio.shot.is';
};

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'] as const;

const captureUtm = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) utm[key] = value;
  }
  return utm;
};

export interface WaitlistResult {
  /** true when this address was already on the list before today's submit. */
  alreadyJoined: boolean;
  /** 1-based rank in the queue; 0 when the backend could not compute it. */
  position: number;
}

export class WaitlistError extends Error {}

/**
 * Joins the early-access waitlist. Throws WaitlistError with a message meant
 * for the user (rate limit, invalid address, backend down).
 *
 * `honeypot` is the value of the hidden field the form renders — a human
 * leaves it empty. The backend fakes a success for anything else.
 */
export const joinWaitlist = async (
  email: string,
  location: CtaLocation,
  honeypot = '',
): Promise<WaitlistResult> => {
  let res: Response;
  try {
    res = await fetch(`${apiOrigin()}/api/public/waitlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        consent: true,
        source: location,
        path: typeof window === 'undefined' ? undefined : window.location.pathname,
        referrer: typeof document === 'undefined' ? undefined : document.referrer || undefined,
        utm: captureUtm(),
        website: honeypot || undefined,
      }),
    });
  } catch {
    throw new WaitlistError('Network error — check your connection and try again.');
  }

  const body = (await res.json().catch(() => null)) as
    | { ok?: boolean; alreadyJoined?: boolean; position?: number; error?: { message?: string } }
    | null;

  if (!res.ok) {
    throw new WaitlistError(
      body?.error?.message ??
        (res.status === 429
          ? 'Too many requests from this network. Try again tomorrow or email hello@shot.is.'
          : 'Something broke on our side. Email hello@shot.is and we will add you manually.'),
    );
  }

  return {
    alreadyJoined: Boolean(body?.alreadyJoined),
    position: typeof body?.position === 'number' ? body.position : 0,
  };
};

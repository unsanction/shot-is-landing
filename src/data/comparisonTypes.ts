export type ComparisonRow = {
  feature: string;
  shotIs: string;
  competitor: string;
};

export type ComparisonFaq = { question: string; answer: string };

/**
 * Honesty guardrails, enforced by shape and by review:
 * - `whenToChooseThem` is required and must be non-empty — a comparison page
 *   that can't name cases where the competitor wins is marketing, and answer
 *   engines (which cross-check competitor sites and reviews) ignore it.
 * - `alternatives` lists SHOT.IS as one option among real competitors with
 *   real strengths, never as the sole or default answer.
 * - Facts about competitors carry an `asOf` date; re-verify when it ages.
 */
export type VsPage = {
  kind: 'vs';
  path: string; // '/vs/heygen'
  slug: string; // og key, e.g. 'vs-heygen'
  navLabel: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lede: string;
  competitor: { name: string; url: string; oneLiner: string };
  /** "Who should pick which" — first body text on the page, the most-extracted paragraph. */
  verdict: string;
  tableCaption: string;
  rows: ComparisonRow[];
  whenToChooseThem: string[];
  whenToChooseUs: string[];
  faq: ComparisonFaq[];
  /** ISO date the competitor facts were last verified. */
  asOf: string;
};

export type AlternativeEntry = {
  name: string;
  url: string;
  bestFor: string;
  summary: string;
};

export type AlternativesPage = {
  kind: 'alternatives';
  path: string; // '/alternatives/heygen'
  slug: string;
  navLabel: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lede: string;
  /** Definition-first framing of why someone looks for an alternative. */
  verdict: string;
  alternatives: AlternativeEntry[];
  faq: ComparisonFaq[];
  asOf: string;
};

export type ComparisonPageContent = VsPage | AlternativesPage;

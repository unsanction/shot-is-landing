import { comparisonPages } from '../../data/comparisons';
import { useCasePages } from '../../data/useCases';
import { isStudioUrl, trackCta, trackStudioClick, withUtm } from '../../lib/track';

type FooterLink = { label: string; href: string };

/*
 * The footer is the site map. It renders on every page, so every page it lists
 * is one link away from anything Google already crawls.
 *
 * That is not decoration: in October 2026 six comparison pages were linked from
 * nowhere at all — reachable only through a sitemap Google had not re-read since
 * June — and URL Inspection reported them "unknown to Google". Comparisons and
 * use cases are read from their data, so a new one is linked the moment it
 * exists; scripts/prerender.mjs fails the build if any indexable page still ends
 * up with no inbound link.
 */
const footerGroups: Array<{ title: string; links: FooterLink[] }> = [
  {
    title: 'Product',
    links: [
      { label: 'Open Studio', href: 'https://studio.shot.is/' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'AI UGC Ads', href: '/ai-ugc-ads' },
      { label: 'AI Video Ads', href: '/ai-video-ads' },
      { label: 'Virtual Influencers', href: '/virtual-influencers' },
      ...useCasePages.map((page) => ({ label: page.navLabel, href: page.path })),
    ],
  },
  {
    title: 'Compare',
    links: comparisonPages.map((page) => ({ label: page.navLabel, href: page.path })),
  },
  {
    title: 'Learn',
    links: [
      { label: 'Learn hub', href: '/learn' },
      { label: 'All articles', href: '/blog' },
      { label: 'Artículos en español', href: '/es/blog' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
];

export function HomeFooter() {
  return (
    <footer className="relative border-t border-white/5 bg-[#050505]">
      <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-20" />

      <nav
        aria-label="Footer"
        className="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-12 px-5 pt-20 md:grid-cols-4 md:px-8 md:pt-24"
      >
        {footerGroups.map((group) => (
          <div key={group.title}>
            <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-accent">{group.title}</p>
            <ul className="space-y-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={isStudioUrl(link.href) ? withUtm(link.href, 'footer') : link.href}
                    onClick={() =>
                      isStudioUrl(link.href) ? trackStudioClick('footer') : trackCta('footer', link.label)
                    }
                    className="text-sm font-medium leading-snug text-white/55 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="mx-auto max-w-7xl px-5 pb-12 pt-16 font-mono text-[10px] uppercase tracking-[0.28em] text-white/50 md:px-8">
        © SHOT.IS
      </div>
    </footer>
  );
}

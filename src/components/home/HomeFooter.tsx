import { trackCta } from '../../lib/track';

const footerLinks = [
  { label: 'AI UGC Ads', href: '/ai-ugc-ads' },
  { label: 'AI Video Ads', href: '/ai-video-ads' },
  { label: 'Virtual Influencers', href: '/virtual-influencers' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

export function HomeFooter() {
  return (
    <footer className="relative border-t border-white/5 bg-[#050505] text-center">
      <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-20" />

      <div className="mx-auto max-w-7xl px-5 pt-24 md:px-8 md:pt-28">
        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => trackCta('footer', link.label)}
              className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-white/55 transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="pointer-events-none my-16 select-none font-syne text-[15vw] font-extrabold uppercase italic tracking-tighter opacity-[0.05]">
        SHOT.IS
      </div>

      <p className="mx-auto max-w-3xl px-5 pb-10 text-sm font-medium leading-relaxed text-white/40 md:px-8">
        SHOT.IS is an AI-powered video generation and content automation platform for businesses and brands.
      </p>

      <div className="px-5 pb-12 font-mono text-[10px] uppercase tracking-[0.28em] text-white/30 md:px-8">
        © SHOT.IS
      </div>
    </footer>
  );
}

import { buildDate } from '../../data/seo';

const footerLinks = [
  { label: 'AI UGC Ads', href: '/ai-ugc-ads' },
  { label: 'AI Video Ads', href: '/ai-video-ads' },
  { label: 'Virtual Influencers', href: '/virtual-influencers' },
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

      <div className="px-5 pb-12 font-mono text-[10px] uppercase tracking-[0.28em] text-white/30 md:px-8">
        © SHOT.IS · Updated {buildDate}
      </div>
    </footer>
  );
}

import { useEffect, useState } from 'react';
import { navLinks } from '../../data/landing';
import { BrandLink } from '../common/BrandLink';
import { isStudioUrl, trackCta, trackStudioClick, withUtm } from '../../lib/track';

const menuLinks = navLinks.slice(0, -1);
const studioLink = navLinks[navLinks.length - 1];

type HomeNavProps = {
  /**
   * For pages whose body is light (the article "paper"). The default nav is
   * transparent with mix-blend-difference, which reads on dark pages and lies on
   * top of body text on light ones. Solid gives it an opaque bar, a tighter
   * height, and tucks it away while the reader scrolls down.
   */
  solid?: boolean;
};

export function HomeNav({ solid = false }: HomeNavProps = {}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tucked, setTucked] = useState(false);

  useEffect(() => {
    if (!solid || typeof window === 'undefined') return;
    let last = window.scrollY;
    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        const y = window.scrollY;
        // Hide on a deliberate scroll down past the header, show on any scroll up.
        if (y > 240 && y - last > 6) setTucked(true);
        else if (last - y > 6 || y < 240) setTucked(false);
        last = y;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [solid]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={
          solid
            ? `fixed inset-x-0 top-0 z-[100] flex items-center justify-between border-b border-white/10 bg-black/90 px-5 py-3 backdrop-blur-md transition-transform duration-300 md:px-6 md:py-4 lg:px-8 ${
                tucked && !menuOpen ? '-translate-y-full' : 'translate-y-0'
              }`
            : 'fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-5 py-6 mix-blend-difference md:px-6 md:py-7 lg:px-8 lg:py-8'
        }
      >
        <BrandLink href="/" />

        {/* Five links plus the wordmark only clear the logo from xl up; below
            that the burger takes over, so nothing overlaps or wraps. */}
        <div className="hidden items-center gap-7 text-[10px] font-bold uppercase tracking-[0.18em] xl:flex xl:gap-10 xl:text-[11px] xl:tracking-[0.22em]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={isStudioUrl(link.href) ? withUtm(link.href, 'nav') : link.href}
              onClick={() => (isStudioUrl(link.href) ? trackStudioClick('nav') : trackCta('nav', link.label))}
              className="whitespace-nowrap transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
          className="relative flex h-10 w-10 items-center justify-center xl:hidden"
        >
          <span
            className={`absolute h-0.5 w-6 bg-white transition-transform duration-300 ${
              menuOpen ? 'rotate-45' : '-translate-y-1'
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-white transition-transform duration-300 ${
              menuOpen ? '-rotate-45' : 'translate-y-1'
            }`}
          />
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-[95] flex flex-col justify-between bg-black px-5 pb-8 pt-28 transition-opacity duration-300 xl:hidden ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!menuOpen}
      >
        <div>
          <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.34em] text-accent">Menu</p>
          {menuLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                trackCta('nav', link.label);
                setMenuOpen(false);
              }}
              className={`flex items-baseline gap-4 border-b border-white/10 py-5 text-3xl font-extrabold uppercase italic leading-none tracking-tight text-white transition-all duration-300 ${
                menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
              }`}
              style={{ transitionDelay: menuOpen ? `${80 + index * 60}ms` : '0ms' }}
            >
              <span className="font-mono text-[10px] font-bold not-italic tracking-[0.2em] text-accent">
                0{index + 1}
              </span>
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={withUtm(studioLink.href, 'nav')}
          onClick={() => {
            trackStudioClick('nav');
            setMenuOpen(false);
          }}
          className={`block bg-white px-8 py-5 text-center text-xs font-black uppercase tracking-[0.3em] text-black transition-all duration-300 active:scale-95 ${
            menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
          }`}
          style={{ transitionDelay: menuOpen ? '320ms' : '0ms' }}
        >
          {studioLink.label}
        </a>
      </div>
    </>
  );
}

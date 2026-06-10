import { useEffect, useState } from 'react';
import { navLinks } from '../../data/landing';
import { BrandLink } from '../common/BrandLink';

const menuLinks = navLinks.slice(0, -1);
const studioLink = navLinks[navLinks.length - 1];

export function HomeNav() {
  const [menuOpen, setMenuOpen] = useState(false);

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
      <nav className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-5 py-6 mix-blend-difference md:px-6 md:py-7 lg:px-8 lg:py-8">
        <BrandLink href="/" />

        <div className="hidden items-center gap-5 text-[10px] font-bold uppercase tracking-[0.18em] md:flex lg:gap-10 lg:text-[11px] lg:tracking-[0.24em]">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-accent">
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
          className="relative flex h-10 w-10 items-center justify-center md:hidden"
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
        className={`fixed inset-0 z-[95] flex flex-col justify-between bg-black px-5 pb-8 pt-28 transition-opacity duration-300 md:hidden ${
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
              onClick={() => setMenuOpen(false)}
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
          href={studioLink.href}
          onClick={() => setMenuOpen(false)}
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

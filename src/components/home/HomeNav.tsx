import { navLinks } from '../../data/landing';
import { BrandLink } from '../common/BrandLink';

export function HomeNav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-5 py-6 mix-blend-difference md:px-6 md:py-7 lg:px-8 lg:py-8">
      <BrandLink href="#" />

      <div className="hidden items-center gap-6 text-[10px] font-bold uppercase tracking-[0.22em] md:flex lg:gap-12 lg:text-[11px] lg:tracking-[0.3em]">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="transition-colors hover:text-accent">
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

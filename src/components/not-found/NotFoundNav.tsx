import { BrandLink } from '../common/BrandLink';
import { navLinks } from '../../data/landing';

export function NotFoundNav() {
  return (
    <nav className="n404__nav" aria-label="404 navigation">
      <BrandLink href="/" variant="not-found" />

      <div className="n404__nav-right">
        {navLinks.map((link) => (
          <a key={link.href} href={`/${link.href}`}>
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

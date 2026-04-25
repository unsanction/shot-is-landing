type BrandLinkProps = {
  href?: string;
  variant?: 'home' | 'not-found';
};

export function BrandLink({ href = '/', variant = 'home' }: BrandLinkProps) {
  if (variant === 'not-found') {
    return (
      <a className="n404__brand" href={href}>
        <div className="n404__shutter" aria-hidden="true">
          <div className="n404__blade" />
          <div className="n404__blade" />
          <div className="n404__blade" />
        </div>
        <div className="text-2xl font-extrabold uppercase italic leading-none tracking-tight md:text-[26px] lg:text-3xl">
          SHOT<span className="opacity-40">.IS</span>
        </div>
      </a>
    );
  }

  return (
    <a href={href} className="group flex items-center gap-4 md:gap-4 lg:gap-6">
      <div className="shutter" aria-hidden="true">
        <div className="shutter-blade rotate-0" />
        <div className="shutter-blade rotate-[60deg]" />
        <div className="shutter-blade rotate-[120deg]" />
      </div>
      <div className="text-2xl font-extrabold uppercase italic leading-none tracking-tight md:text-[26px] lg:text-3xl">
        SHOT<span className="opacity-40">.IS</span>
      </div>
    </a>
  );
}

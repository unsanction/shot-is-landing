import { stats } from '../../data/landing';

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-black px-5 py-32 md:px-8 md:py-44">
      <div className="success-bg" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="mb-16 text-center md:mb-24">
          <h2 className="mb-8 text-4xl font-black uppercase tracking-tight italic sm:text-5xl md:text-[72px] lg:text-[84px] xl:text-8xl">
            Numbers
            <br />
            <span className="text-outline">Don&apos;t Lie</span>
          </h2>
        </div>

        {stats.map((stat, index) => (
          <div
            key={stat.label}
            data-reveal
            className="reveal-text stat-row"
            style={{ transitionDelay: `${index * 0.07}s` }}
          >
            <div className="stat-row__line" />
            <div className="stat-row__content">
              <span className="stat-row__number">{stat.value}</span>
              <div className="stat-row__info">
                <span className="stat-row__label">{stat.label}</span>
                <span className="stat-row__sub">{stat.sub}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

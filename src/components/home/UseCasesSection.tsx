const useCases = [
  'AI ads for businesses',
  'AI UGC videos for social media',
  'AI TikTok and Reels videos',
  'AI product demo videos',
  'AI video localization',
  'AI spokesperson and virtual influencer videos',
  'AI branded campaign creative',
  'AI short-form performance ads',
];

export function UseCasesSection() {
  return (
    <section id="use-cases" className="bg-black px-5 py-24 text-white md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-4xl md:mb-20">
          <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
            Use cases
          </p>
          <h2 className="text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-[72px]">
            What businesses generate with SHOT.IS.
          </h2>
          <p className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-white/55 md:text-xl">
            SHOT.IS is built for marketing, growth, and creative teams who need AI video content at the pace of
            paid social.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((item, index) => (
            <li
              key={item}
              data-reveal
              className="reveal-text rounded-[4px] border border-white/10 bg-white/[0.03] p-6 text-base font-semibold uppercase tracking-tight text-white/80 md:text-lg"
              style={{ transitionDelay: `${index * 0.05}s` }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

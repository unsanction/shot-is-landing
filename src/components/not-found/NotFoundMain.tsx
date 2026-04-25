type NotFoundMainProps = {
  reelWords: string[];
};

export function NotFoundMain({ reelWords }: NotFoundMainProps) {
  return (
    <main className="n404__main" aria-labelledby="not-found-title">
      <h1 id="not-found-title" className="sr-only">
        404 signal lost
      </h1>
      <div className="n404__num-wrap" aria-hidden="true">
        <span className="n404__num" data-text="404">
          404
        </span>
        <div className="n404__slice n404__slice--s1">
          <span className="n404__slice-inner">404</span>
        </div>
        <div className="n404__slice n404__slice--s2">
          <span className="n404__slice-inner">404</span>
        </div>
        <div className="n404__slice n404__slice--s3">
          <span className="n404__slice-inner">404</span>
        </div>
      </div>

      <div className="n404__signal" aria-hidden="true">
        <span className="n404__signal-static">THE SHOT IS</span>
        <span className="n404__slot">
          <span className="n404__reel">
            {reelWords.map((word, index) => (
              <span key={`${word}-${index}`}>{word}</span>
            ))}
          </span>
        </span>
      </div>

      <p className="n404__lede">The page you&apos;re looking for has wandered off</p>

      <div className="n404__cta-row">
        <a className="n404__btn n404__btn--primary" href="/">
          <span>Return to Base</span>
          <svg className="n404__arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
            <path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="2" />
          </svg>
        </a>
      </div>
    </main>
  );
}

import { useEffect, useState, type RefObject } from 'react';

type Section = { id: string; text: string };

/**
 * Phone-only section navigator for scrollytelling posts.
 *
 * Desktop readers have the stage rail to see where they are and jump around; on
 * a phone the stage is gone and a long post becomes one undifferentiated column.
 * This pins the current section to the bottom of the screen — thumb reach — and
 * opens the full outline on tap. It only shows while the article body is on
 * screen, so it never sits over the header, the FAQ or the CTA.
 */
export function SectionNavigator({
  sections,
  activeId,
  rootRef,
  label,
}: {
  sections: Section[];
  activeId: string | undefined;
  rootRef: RefObject<HTMLElement>;
  label: string;
}) {
  const [inside, setInside] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === 'undefined') return;
    let queued = false;
    const update = () => {
      queued = false;
      const r = root.getBoundingClientRect();
      const mid = window.innerHeight * 0.5;
      setInside(r.top < mid && r.bottom > mid);
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [rootRef]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  if (sections.length < 2) return null;
  const index = Math.max(0, sections.findIndex((s) => s.id === activeId));
  const current = sections[index];
  const visible = inside || open;

  return (
    <div className="lg:hidden">
      {open ? <button type="button" aria-label="Close" className="bx-nav__scrim" onClick={() => setOpen(false)} /> : null}

      <div className={`bx-nav${visible ? ' is-visible' : ''}${open ? ' is-open' : ''}`}>
        {open ? (
          <nav aria-label={label} className="bx-nav__sheet">
            <p className="bx-nav__sheet-label">{label}</p>
            <ol>
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className={i === index ? 'is-current' : i < index ? 'is-past' : undefined}
                    aria-current={i === index ? 'location' : undefined}
                  >
                    <span className="bx-nav__num">{String(i + 1).padStart(2, '0')}</span>
                    <span>{s.text}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <button
          type="button"
          className="bx-nav__bar"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          tabIndex={visible ? 0 : -1}
        >
          <span className="bx-nav__num">
            {String(index + 1).padStart(2, '0')}
            <span className="bx-nav__total">/{String(sections.length).padStart(2, '0')}</span>
          </span>
          <span className="bx-nav__title">{current?.text}</span>
          <span aria-hidden="true" className="bx-nav__chevron">
            {open ? '×' : '☰'}
          </span>
          {/* Progress through the outline, so the bar doubles as "how far in am I". */}
          <span aria-hidden="true" className="bx-nav__track">
            <span style={{ transform: `scaleX(${(index + 1) / sections.length})` }} />
          </span>
        </button>
      </div>
    </div>
  );
}

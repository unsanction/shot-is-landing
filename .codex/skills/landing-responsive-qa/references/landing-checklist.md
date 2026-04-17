# Landing Checklist

## Default Pass

- Desktop: `1440x1200`
- Tablet: `1024x1366`
- Mobile: `390x844`

Run these first with the `browser-qa` responsive checker.

## Common Extra Viewports

- iPad Air portrait: `820x1180`, `--dpr 2`, `--mobile`
- Narrow laptop: `1280x900`
- Wide desktop: `2048x1230`
- Any user-reported size from DevTools or a screenshot

## Checks

- No horizontal overflow: `document.documentElement.scrollWidth === clientWidth`
- Fixed nav fits without clipping or pushing the page wider
- Hero heading, subcopy, and CTA fit without overlap
- Hero media does not extend the document width
- Oversized section headings still fit their containers
- Marquees, film strips, and decorative media are clipped intentionally
- Forms and CTA buttons remain fully visible and clickable
- Footer wordmarks or oversized background type do not widen the page

## Debug Order

1. Record viewport width, `clientWidth`, and `scrollWidth`.
2. Find the widest visible block first: nav, hero, section title, or transformed media.
3. Compare `clientWidth` vs `scrollWidth` on suspicious headings and wrappers.
4. If a device-specific issue appears, debug at that exact viewport before changing code.
5. Re-test the same viewport after the patch, then run the default pass again.

## Frequent Causes

- `md` styles that are already too large for 820-900px widths
- `transform: scale(...)` on full-bleed video or images
- Long uppercase headings with negative or wide tracking
- `white-space: nowrap` or `min-width: max-content`
- Fixed nav gaps or tracking tuned only for wide desktop
- Decorative wordmarks or background text without a max width

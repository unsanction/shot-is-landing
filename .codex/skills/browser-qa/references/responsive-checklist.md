# Responsive Checklist

## Recommended Viewports

- desktop: `1440x1200`
- tablet: `1024x1366`
- mobile: `390x844`

Add one narrower mobile viewport such as `375x812` when the screen is dense or the app targets iPhone layouts closely.

## Global Checks

- Verify there is no accidental horizontal scroll.
- Verify the primary CTA stays visible or is reachable without layout breakage.
- Verify header, nav, and sidebar collapse into a usable mobile pattern.
- Verify important text is readable and not clipped or overlapped.
- Verify fixed toasts, banners, or sticky bars do not cover the submit button.
- Verify dialogs, drawers, and popovers fit inside the viewport and can be dismissed.
- Verify inputs remain usable when focused and the action button is still reachable.
- Verify images, video, canvas, and previews keep sane aspect ratios.

## Pattern-Specific Checks

### Forms

- Check label, field, helper text, and error text stacking.
- Check multiline inputs and date pickers for clipping.
- Check keyboard-driven focus order if the issue touches accessibility or complex forms.

### Tables And Dashboards

- Check whether columns intentionally scroll, wrap, or collapse.
- Check whether filters, badges, and row actions remain reachable.
- Check whether sticky headers or pinned columns create double scroll traps.

### Modals And Drawers

- Check initial focus and close behavior.
- Check whether body scroll is locked correctly.
- Check whether the footer action bar stays visible.

### Media And Editors

- Check preview panels, toolbars, timelines, and drag handles.
- Check whether any canvas or video area collapses below a usable size.
- Check whether upload or picker controls still work without hover.

## Fast Failure Signals

- `document.documentElement.scrollWidth > window.innerWidth`
- a submit button sits below an unscrollable footer
- a drawer opens off-screen
- two nested scroll containers fight each other
- a toast covers the only primary action
- a sidebar remains permanently expanded on mobile

## Evidence Rules

- Capture at least one screenshot per viewport.
- Note whether the bug reproduces on desktop only, mobile only, or both.
- If responsive behavior is intentionally deferred, state that explicitly instead of implying coverage.

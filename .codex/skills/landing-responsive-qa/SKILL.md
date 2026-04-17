---
name: landing-responsive-qa
description: Responsive browser QA for landing pages and marketing sites. Use when Codex needs to verify a landing page across desktop, tablet, mobile, iPad-class custom widths, or wide desktop; catch horizontal overflow, clipped hero copy, off-screen nav, oversized headings, CTA/layout drift, and breakpoint-specific regressions; capture screenshots and metrics; isolate the element causing overflow; and confirm the fix after code changes.
---

# Landing Responsive QA

## Overview

Use this skill for landing pages where typography, hero media, nav spacing, and section headers must fit cleanly across breakpoints. Start from code, run the standard responsive pass, then add custom device widths whenever a screenshot or user report points to a breakpoint-specific failure.

## Workflow

1. Inspect the diff and the page structure before opening the browser.
   Focus on fixed nav, hero headings, transformed media, `md` or `lg` font jumps, `max-content`, `white-space: nowrap`, and marquee or film-strip sections.
2. Make sure the page is reachable locally.
   Start the dev server if needed and note the exact URL you are testing.
3. Prefer visible Chrome with remote debugging on `9222`.
   If launching or attaching to Chrome needs approval, ask before doing it.
4. Run the standard pass first with the existing Browser QA tooling:

   ```bash
   BROWSER_QA_FAIL_ON_OVERFLOW=1 \
   node .codex/skills/browser-qa/scripts/responsive-check.mjs \
     http://127.0.0.1:5176/
   ```

5. If the user names a specific device or the failure sits between presets, run the custom viewport probe:

   ```bash
   node .codex/skills/landing-responsive-qa/scripts/inspect_custom_viewport.mjs \
     http://127.0.0.1:5176/ 820 1180 --dpr 2 --mobile --prefix ipad-air
   ```

6. Capture before and after evidence.
   Keep at least one screenshot and one JSON summary for the failing viewport and the fixed viewport.
7. If `scrollWidth > clientWidth`, inspect the top offenders.
   Prioritize headings with `scrollWidth > clientWidth`, nav rows wider than the viewport, transformed hero media, and long uppercase copy with aggressive tracking.
8. Fix the smallest breakpoint range that matches the bug.
   Treat tablet widths `768-1023` as their own layout tier instead of forcing desktop styles to fit there.
9. Re-run the exact failing viewport, then re-run the standard desktop/tablet/mobile pass.
10. Report the tested URL, viewports exercised, before/after metrics, screenshot names, and the files changed.

## Fix Heuristics

- Reduce `md` typography and delay larger sizes to `lg` when iPad-class widths fail.
- Tighten nav gap, padding, and tracking before hiding links.
- Remove hero `transform: scale(...)` below desktop if it inflates `scrollWidth`.
- Prefer breakpoint-specific font size or `clamp()` adjustments over relying on `overflow-x: hidden`.
- Use `max-width` on dramatic two-line headings when wide desktop barely fits.
- Confirm that the fix does not create a new overflow at another breakpoint.

## Resources

- Read [references/landing-checklist.md](references/landing-checklist.md) before testing dense landing pages or marketing sites.
- Use [scripts/inspect_custom_viewport.mjs](scripts/inspect_custom_viewport.mjs) for custom widths such as iPad Air or wide desktop.

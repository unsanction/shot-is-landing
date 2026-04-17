---
name: browser-qa
description: Global browser testing and UI regression skill for any web app. Use when Codex must inspect code or a diff to infer impacted routes and states, test the feature in a visible browser, capture screenshots, verify console and network behavior, and check responsive or mobile layout before sign-off. Trigger on requests to test a UI task, verify frontend work in a browser, reproduce a browser bug, run smoke or E2E passes, or confirm that a feature works on desktop and mobile.
---

# Browser QA

## Overview

Start from the code, not from blind clicking. Infer the impacted pages, state transitions, and backend calls first, then confirm them in a visible browser with desktop and mobile evidence.

## Workflow

1. Read [references/workflow.md](references/workflow.md).
2. Read [references/responsive-checklist.md](references/responsive-checklist.md) before the mobile pass or when the page has dense layout.
3. Inspect the user request, local diff, and the code that controls the target flow.
4. Write a short test matrix before opening the browser:
   - happy path
   - nearest regression-adjacent path
   - empty, loading, validation, or error state
   - responsive or mobile pass
5. Prefer a visible Chrome session with `--remote-debugging-port=9222`. If launching or attaching to a GUI browser needs approval, ask before doing it.
6. Run the task on desktop first, then repeat the relevant parts on tablet or mobile.
7. On any failure, capture the failing screen first, then isolate frontend vs backend vs config/data through console, network, and API checks.
8. Re-test the exact broken step after a fix and then the next downstream step.

## Code Recon First

- Inspect the local diff first when the task is about recent changes.
- Map the flow through router entries, page components, stores/hooks, form schemas, API clients, and backend routes.
- Identify success signals before testing: navigation, toast, persisted data, preview, downloaded file, changed row, updated card, rendered media.
- Identify likely failure modes before testing: disabled buttons, hidden prerequisites, missing provider/config, validation errors, optimistic state drift, stale cache, or route params.
- Use existing tests as hints for intent, not as proof that the browser flow works.

## Browser Rules

- Avoid headless mode by default for UI validation.
- Capture screenshots for landing state, filled state, success state, and every failure or timeout.
- Prefer selectors from visible labels, roles, headings, or stable `data-*` hooks.
- Do not declare success from API responses alone when the user asked for browser validation.
- For auth-heavy or setup-heavy apps, confirm prerequisites early and record what could not be exercised.

## Reusable Scripts

- `scripts/browser-page-shot.mjs`: open one page in a visible browser tab, wait for the page to settle, save a screenshot, and write a JSON summary with layout metrics.
- `scripts/responsive-check.mjs`: run the same page through desktop, tablet, and mobile presets and record screenshots plus overflow signals.
- `scripts/lib/browser-session.mjs`: reusable CDP helper for custom flows that need navigation, waits, screenshots, and summary files.

Examples:

```bash
node skills/browser-qa/scripts/browser-page-shot.mjs http://localhost:3000/settings

BROWSER_QA_READY_SELECTOR='[data-testid="settings-form"]' \
node skills/browser-qa/scripts/responsive-check.mjs http://localhost:3000/settings
```

Useful environment variables:

- `BROWSER_QA_ARTIFACT_DIR=artifacts/browser-qa`
- `BROWSER_QA_SCREENSHOT_PREFIX=settings`
- `BROWSER_QA_VIEWPORT=desktop|tablet|mobile`
- `BROWSER_QA_VIEWPORTS=desktop,tablet,mobile`
- `BROWSER_QA_READY_SELECTOR='[data-testid="root"]'`
- `BROWSER_QA_DELAY_MS=750`
- `BROWSER_QA_FAIL_ON_OVERFLOW=1`
- `BROWSER_QA_DEVTOOLS_ORIGIN=http://127.0.0.1:9222`

## Reporting

Always report:

- tested URL or route
- viewports exercised
- last successful step
- failing step with expected vs actual behavior
- screenshot names or artifact directory
- suspected files or layers
- what remains unverified

If everything passes, still say what was covered and what was intentionally not exercised.

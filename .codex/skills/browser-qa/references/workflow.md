# Browser QA Workflow

## 1. Scope The Work From Code

Start with the request and whatever source artifact is closest to the change:

- `git diff` for recent changes
- router or navigation config for entry points
- page component for visible states
- store, hook, reducer, or query layer for state transitions
- API client and backend route for mutations and data shape
- schema or validator for required fields and error messages

Build a quick map before opening the browser:

- entry URL or route
- user actions
- network calls
- expected success signal
- likely failure signals
- persisted side effect after refresh

Use that map to decide what must be exercised in the browser. This prevents shallow smoke passes that miss the actual risk.

## 2. Write A Minimal Test Matrix

For most tasks, cover at least these rows:

- happy path
- closest regression path touched by the same code
- invalid, empty, loading, or failure state
- refresh or revisit check if the feature persists state
- responsive or mobile pass

Expand the matrix when the feature includes:

- file upload or drag and drop
- modal or drawer flows
- multi-step wizard behavior
- generated media or long-running jobs
- route params or deep links
- tables, grids, or dashboards with dense layout

## 3. Run The Browser Pass

Prefer a visible browser with remote debugging enabled. Confirm the real app URL before attaching if multiple dev servers exist.

During the run:

- capture a landing screenshot
- capture a screenshot after filling the key form state
- capture a screenshot on success
- capture a screenshot before and after any ambiguous click
- capture a screenshot immediately when a toast, console error, or timeout appears

Do not jump to API-only debugging before reproducing the issue in the UI at least once.

## 4. Triage Failures In A Tight Loop

Use this order unless the failure source is already obvious:

1. Inspect the DOM state and visible UI text.
2. Check console errors and failed requests.
3. Inspect the request payload, response payload, and status code.
4. Reproduce the same call directly if needed to split frontend from backend.
5. Check config, seed data, permissions, or provider availability.

Keep the reproduction step stable. Fixes are easier to verify when the same exact click path is repeated after each change.

## 5. Verify Responsive Behavior

Run the important part of the flow at desktop first, then test the same screen at tablet or mobile widths.

Look for:

- horizontal overflow
- clipped primary actions
- off-screen dialogs or drawers
- sticky bars covering inputs or buttons
- broken scroll locking
- nav or sidebar collapse bugs
- hover-only actions with no touch fallback

Read [responsive-checklist.md](responsive-checklist.md) for the detailed pass.

## 6. Decide Done vs Not Done

The task is not done until all of the following are true:

- the user-visible outcome works in the browser
- the exact bug or feature path was exercised, not only nearby UI
- evidence exists in screenshots or summaries
- the downstream step after the fix was also re-tested
- mobile or responsive status is either verified or explicitly called out as untested

## 7. Reporting Template

Use a compact result structure:

- scope: route, feature, and code areas reviewed
- coverage: flows and viewports tested
- findings: expected vs actual, with evidence
- triage: likely layer and candidate files
- residual risk: what was not exercised

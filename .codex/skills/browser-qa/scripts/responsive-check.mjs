import {
  BrowserSession,
  getViewportPreset,
  layoutMetricsExpression,
  parseViewportList,
  shotName,
  sleep,
  summaryName,
} from './lib/browser-session.mjs'

const PAGE_URL = process.argv[2] || process.env.BROWSER_QA_PAGE_URL || 'http://localhost:3000/'
const ARTIFACT_DIR = process.env.BROWSER_QA_ARTIFACT_DIR || 'artifacts/browser-qa'
const PREFIX = process.env.BROWSER_QA_SCREENSHOT_PREFIX || 'responsive'
const READY_SELECTOR = process.env.BROWSER_QA_READY_SELECTOR || ''
const DEVTOOLS_ORIGIN = process.env.BROWSER_QA_DEVTOOLS_ORIGIN || 'http://127.0.0.1:9222'
const DELAY_MS = Number.parseInt(process.env.BROWSER_QA_DELAY_MS || '500', 10)
const FAIL_ON_OVERFLOW = process.env.BROWSER_QA_FAIL_ON_OVERFLOW === '1'
const VIEWPORT_NAMES = parseViewportList(process.env.BROWSER_QA_VIEWPORTS || 'desktop,tablet,mobile')

async function runViewport(viewportName, step) {
  const session = new BrowserSession({
    pageUrl: PAGE_URL,
    artifactDir: ARTIFACT_DIR,
    screenshotPrefix: PREFIX,
    devtoolsOrigin: DEVTOOLS_ORIGIN,
    viewport: getViewportPreset(viewportName),
  })

  try {
    await session.open()
    const landing = await session.waitFor(
      `${viewportName} landing`,
      `(() => document.body ? { url: location.href, title: document.title || null } : null)()`,
      10000,
      200,
    )

    const readyState = READY_SELECTOR
      ? await session.waitForSelector(READY_SELECTOR, 20000, 200)
      : null

    if (DELAY_MS > 0) {
      await sleep(DELAY_MS)
    }

    const metrics = await session.waitFor(
      `${viewportName} layout metrics`,
      layoutMetricsExpression(),
      10000,
      200,
    )

    const screenshotName = shotName(PREFIX, step, viewportName)
    await session.screenshot(screenshotName)

    return {
      viewport: viewportName,
      landing,
      readyState,
      metrics,
      screenshotName,
    }
  } finally {
    await session.close()
  }
}

async function main() {
  const results = []

  for (const [index, viewportName] of VIEWPORT_NAMES.entries()) {
    results.push(await runViewport(viewportName, index + 1))
  }

  const summary = {
    pageUrl: PAGE_URL,
    artifactDir: ARTIFACT_DIR,
    readySelector: READY_SELECTOR || null,
    viewports: VIEWPORT_NAMES,
    results,
  }

  const session = new BrowserSession({
    pageUrl: PAGE_URL,
    artifactDir: ARTIFACT_DIR,
    screenshotPrefix: PREFIX,
    devtoolsOrigin: DEVTOOLS_ORIGIN,
  })
  await session.writeJson(summaryName(PREFIX), summary)
  console.log(`SUMMARY ${JSON.stringify(summary, null, 2)}`)

  if (FAIL_ON_OVERFLOW && results.some((result) => result.metrics?.horizontalOverflow)) {
    process.exitCode = 2
  }
}

main().catch((error) => {
  console.error(`RESPONSIVE_QA_ERROR ${error?.stack || error?.message || String(error)}`)
  process.exit(1)
})

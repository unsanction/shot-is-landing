import {
  BrowserSession,
  getViewportPreset,
  layoutMetricsExpression,
  shotName,
  sleep,
  summaryName,
} from './lib/browser-session.mjs'

const PAGE_URL = process.argv[2] || process.env.BROWSER_QA_PAGE_URL || 'http://localhost:3000/'
const ARTIFACT_DIR = process.env.BROWSER_QA_ARTIFACT_DIR || 'artifacts/browser-qa'
const PREFIX = process.env.BROWSER_QA_SCREENSHOT_PREFIX || 'browser-qa'
const VIEWPORT_NAME = process.env.BROWSER_QA_VIEWPORT || 'desktop'
const READY_SELECTOR = process.env.BROWSER_QA_READY_SELECTOR || ''
const DEVTOOLS_ORIGIN = process.env.BROWSER_QA_DEVTOOLS_ORIGIN || 'http://127.0.0.1:9222'
const DELAY_MS = Number.parseInt(process.env.BROWSER_QA_DELAY_MS || '500', 10)

async function main() {
  const session = new BrowserSession({
    pageUrl: PAGE_URL,
    artifactDir: ARTIFACT_DIR,
    screenshotPrefix: PREFIX,
    devtoolsOrigin: DEVTOOLS_ORIGIN,
    viewport: getViewportPreset(VIEWPORT_NAME),
  })

  try {
    await session.open()
    const landing = await session.waitFor(
      'page landing',
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
      'layout metrics',
      layoutMetricsExpression(),
      10000,
      200,
    )

    const screenshotName = shotName(PREFIX, 1, VIEWPORT_NAME)
    await session.screenshot(screenshotName)

    const summary = {
      pageUrl: PAGE_URL,
      artifactDir: session.artifactDir,
      viewport: VIEWPORT_NAME,
      readySelector: READY_SELECTOR || null,
      landing,
      readyState,
      metrics,
      screenshotName,
    }

    await session.writeJson(summaryName(PREFIX), summary)
    console.log(`SUMMARY ${JSON.stringify(summary, null, 2)}`)
  } finally {
    await session.close()
  }
}

main().catch((error) => {
  console.error(`BROWSER_QA_ERROR ${error?.stack || error?.message || String(error)}`)
  process.exit(1)
})

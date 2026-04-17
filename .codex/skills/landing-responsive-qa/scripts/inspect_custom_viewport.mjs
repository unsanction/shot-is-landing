#!/usr/bin/env node

import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

function usage() {
  console.error(
    'Usage: inspect_custom_viewport.mjs <url> <width> <height> [--dpr <n>] [--mobile] [--prefix <name>] [--delay-ms <n>] [--artifact-dir <dir>] [--devtools-origin <origin>] [--ready-selector <css>]',
  )
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function parseArgs(argv) {
  if (argv.length < 3) {
    usage()
    process.exit(1)
  }

  const [pageUrl, widthRaw, heightRaw, ...rest] = argv
  const width = Number.parseInt(widthRaw, 10)
  const height = Number.parseInt(heightRaw, 10)

  if (!pageUrl || Number.isNaN(width) || Number.isNaN(height)) {
    usage()
    process.exit(1)
  }

  const options = {
    pageUrl,
    width,
    height,
    dpr: 1,
    mobile: false,
    prefix: null,
    delayMs: 300,
    artifactDir: 'artifacts/browser-qa',
    devtoolsOrigin: 'http://127.0.0.1:9222',
    readySelector: null,
  }

  for (let index = 0; index < rest.length; index += 1) {
    const arg = rest[index]

    if (arg === '--mobile') {
      options.mobile = true
      continue
    }

    const next = rest[index + 1]
    if (!next) {
      usage()
      process.exit(1)
    }

    if (arg === '--dpr') {
      options.dpr = Number.parseFloat(next)
      index += 1
      continue
    }

    if (arg === '--prefix') {
      options.prefix = next
      index += 1
      continue
    }

    if (arg === '--delay-ms') {
      options.delayMs = Number.parseInt(next, 10)
      index += 1
      continue
    }

    if (arg === '--artifact-dir') {
      options.artifactDir = next
      index += 1
      continue
    }

    if (arg === '--devtools-origin') {
      options.devtoolsOrigin = next
      index += 1
      continue
    }

    if (arg === '--ready-selector') {
      options.readySelector = next
      index += 1
      continue
    }

    usage()
    process.exit(1)
  }

  return options
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const options = parseArgs(process.argv.slice(2))
const codexHome = process.env.CODEX_HOME || path.join(os.homedir(), '.codex')
const localBrowserSessionUrl = new URL('../../browser-qa/scripts/lib/browser-session.mjs', import.meta.url)
let browserSessionModuleUrl = localBrowserSessionUrl.href

try {
  await fs.access(localBrowserSessionUrl)
} catch {
  const browserSessionPath = path.join(codexHome, 'skills', 'browser-qa', 'scripts', 'lib', 'browser-session.mjs')
  browserSessionModuleUrl = pathToFileURL(browserSessionPath).href
}

const { BrowserSession } = await import(browserSessionModuleUrl)

const prefix =
  options.prefix ||
  `${slugify(new URL(options.pageUrl).hostname || 'page')}-${options.width}x${options.height}`
const artifactDir = path.resolve(process.cwd(), options.artifactDir)
const screenshotName = `${prefix}.png`
const summaryName = `${prefix}-summary.json`
const screenshotPath = path.join(artifactDir, screenshotName)
const summaryPath = path.join(artifactDir, summaryName)

const session = new BrowserSession({
  pageUrl: options.pageUrl,
  artifactDir,
  screenshotPrefix: prefix,
  devtoolsOrigin: options.devtoolsOrigin,
  viewport: {
    width: options.width,
    height: options.height,
    deviceScaleFactor: options.dpr,
    mobile: options.mobile,
  },
})

try {
  await fs.mkdir(artifactDir, { recursive: true })
  await session.open()

  if (options.readySelector) {
    const selector = JSON.stringify(options.readySelector)
    await session.waitFor(
      `selector ${options.readySelector}`,
      `(() => document.querySelector(${selector}) ? { found: true } : null)()`,
      30000,
      200,
    )
  }

  await sleep(options.delayMs)

  const metrics = await session.evaluate(`(() => {
    const doc = document.documentElement
    const horizontalOverflow = doc.scrollWidth > doc.clientWidth + 1
    const topOverflowingElements = [...document.querySelectorAll('*')]
      .map((el) => {
        const rect = el.getBoundingClientRect()
        const style = getComputedStyle(el)
        const text = (el.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 80)
        return {
          tag: el.tagName.toLowerCase(),
          className: typeof el.className === 'string' ? el.className : '',
          text,
          clientWidth: el.clientWidth,
          scrollWidth: el.scrollWidth,
          rectWidth: Math.round(rect.width),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          overflowX: style.overflowX,
          whiteSpace: style.whiteSpace,
          fontSize: style.fontSize,
          letterSpacing: style.letterSpacing,
          transform: style.transform,
          position: style.position,
        }
      })
      .filter((item) => {
        if (item.clientWidth <= 0) {
          return false
        }

        const internalOverflow = item.scrollWidth > item.clientWidth + 1
        const protrudes =
          horizontalOverflow && (item.right > window.innerWidth + 1 || item.left < -1)
        const meaningfulInternalOverflow =
          internalOverflow &&
          (
            item.text ||
            item.whiteSpace === 'nowrap' ||
            (item.overflowX !== 'hidden' && item.overflowX !== 'clip')
          )

        return meaningfulInternalOverflow || protrudes
      })
      .sort((a, b) => {
        const aDelta = Math.max(a.scrollWidth - a.clientWidth, a.right - window.innerWidth)
        const bDelta = Math.max(b.scrollWidth - b.clientWidth, b.right - window.innerWidth)
        return bDelta - aDelta
      })
      .slice(0, 30)

    return {
      url: location.href,
      title: document.title || null,
      viewport: {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio,
      },
      document: {
        clientWidth: doc.clientWidth,
        clientHeight: doc.clientHeight,
        scrollWidth: doc.scrollWidth,
        scrollHeight: doc.scrollHeight,
      },
      horizontalOverflow,
      topOverflowingElements,
    }
  })()`)

  const screenshot = await session.client.send('Page.captureScreenshot', { format: 'png' })
  await fs.writeFile(screenshotPath, Buffer.from(screenshot.data, 'base64'))

  const summary = {
    pageUrl: options.pageUrl,
    viewport: {
      width: options.width,
      height: options.height,
      deviceScaleFactor: options.dpr,
      mobile: options.mobile,
    },
    artifactDir,
    screenshotName,
    metrics,
  }

  await fs.writeFile(summaryPath, `${JSON.stringify(summary, null, 2)}\n`)

  console.log(`screenshot:${screenshotName}`)
  console.log(`summary:${summaryName}`)
  console.log(JSON.stringify(summary, null, 2))
} finally {
  await session.close()
}

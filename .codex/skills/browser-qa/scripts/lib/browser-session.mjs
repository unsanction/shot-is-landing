import fs from 'node:fs/promises'
import path from 'node:path'

export const VIEWPORT_PRESETS = {
  desktop: {
    width: 1440,
    height: 1200,
    deviceScaleFactor: 1,
    mobile: false,
  },
  tablet: {
    width: 1024,
    height: 1366,
    deviceScaleFactor: 1,
    mobile: false,
  },
  mobile: {
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    mobile: true,
  },
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function jsString(value) {
  return JSON.stringify(value)
}

export function shotName(prefix, step, suffix) {
  return `${prefix}-${String(step).padStart(2, '0')}-${suffix}.png`
}

export function summaryName(prefix) {
  return `${prefix}-summary.json`
}

export function getViewportPreset(name = 'desktop') {
  const preset = VIEWPORT_PRESETS[name]
  if (!preset) {
    throw new Error(`Unknown viewport preset: ${name}`)
  }
  return { ...preset }
}

export function parseViewportList(rawValue = 'desktop,tablet,mobile') {
  return rawValue
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export function layoutMetricsExpression() {
  return `(() => {
    const doc = document.documentElement
    const body = document.body
    const fixedOrSticky = [...document.querySelectorAll('*')]
      .map((el) => {
        const style = getComputedStyle(el)
        const rect = el.getBoundingClientRect()
        if (!style) return null
        if (!['fixed', 'sticky'].includes(style.position)) return null
        if (rect.width <= 0 || rect.height <= 0) return null
        return {
          tag: el.tagName.toLowerCase(),
          text: (el.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 80),
          position: style.position,
          top: Math.round(rect.top),
          bottom: Math.round(rect.bottom),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
        }
      })
      .filter(Boolean)
      .slice(0, 12)

    return {
      url: location.href,
      title: document.title || null,
      viewport: {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio,
      },
      document: {
        clientWidth: doc?.clientWidth || null,
        clientHeight: doc?.clientHeight || null,
        scrollWidth: doc?.scrollWidth || null,
        scrollHeight: doc?.scrollHeight || null,
      },
      horizontalOverflow: Boolean(doc && doc.scrollWidth > window.innerWidth + 1),
      bodyTextPreview: (body?.innerText || '').trim().replace(/\\s+/g, ' ').slice(0, 500),
      fixedOrSticky,
    }
  })()`
}

async function fetchJson(url, options) {
  const res = await fetch(url, options)
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`)
  }
  return res.json()
}

async function ensureTarget(devtoolsOrigin, pageUrl) {
  let targets = await fetchJson(`${devtoolsOrigin}/json/list`)
  let target = targets.find((item) => item.type === 'page' && item.url.startsWith(pageUrl))

  if (!target) {
    await fetchJson(`${devtoolsOrigin}/json/new?${encodeURI(pageUrl)}`, { method: 'PUT' })
    await sleep(1000)
    targets = await fetchJson(`${devtoolsOrigin}/json/list`)
    target = targets.find((item) => item.type === 'page' && item.url.startsWith(pageUrl))
  }

  if (!target) {
    throw new Error(`Chrome DevTools page target not found for ${pageUrl}`)
  }

  return target
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl
    this.ws = null
    this.nextId = 0
    this.pending = new Map()
  }

  async connect() {
    await new Promise((resolve, reject) => {
      const ws = new WebSocket(this.wsUrl)
      this.ws = ws

      ws.addEventListener('open', () => resolve(), { once: true })
      ws.addEventListener('error', reject, { once: true })
      ws.addEventListener('message', (event) => {
        const message = JSON.parse(event.data)
        if (!message.id) return

        const pending = this.pending.get(message.id)
        if (!pending) return

        this.pending.delete(message.id)
        if (message.error) {
          pending.reject(new Error(message.error.message || JSON.stringify(message.error)))
          return
        }

        pending.resolve(message.result)
      })

      ws.addEventListener('close', () => {
        for (const pending of this.pending.values()) {
          pending.reject(new Error('CDP socket closed'))
        }
        this.pending.clear()
      })
    })
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++this.nextId
      this.pending.set(id, { resolve, reject })
      this.ws.send(JSON.stringify({ id, method, params }))
    })
  }

  async evaluate(expression, { awaitPromise = false } = {}) {
    const result = await this.send('Runtime.evaluate', {
      expression,
      awaitPromise,
      returnByValue: true,
    })

    if (result.exceptionDetails) {
      throw new Error(result.exceptionDetails.text || 'Runtime.evaluate failed')
    }

    return result.result.value
  }

  async close() {
    if (!this.ws) return
    this.ws.close()
    await sleep(100)
  }
}

export class BrowserSession {
  constructor({
    pageUrl,
    artifactDir = 'artifacts/browser-qa',
    screenshotPrefix = 'browser-qa',
    devtoolsOrigin = 'http://127.0.0.1:9222',
    viewport = getViewportPreset('desktop'),
  }) {
    this.pageUrl = pageUrl
    this.artifactDir = path.resolve(process.cwd(), artifactDir)
    this.screenshotPrefix = screenshotPrefix
    this.devtoolsOrigin = devtoolsOrigin
    this.viewport = viewport
    this.client = null
  }

  async open() {
    if (!this.pageUrl) {
      throw new Error('BrowserSession requires a pageUrl')
    }

    await fs.mkdir(this.artifactDir, { recursive: true })
    const target = await ensureTarget(this.devtoolsOrigin, this.pageUrl)
    this.client = new CDPClient(target.webSocketDebuggerUrl)
    await this.client.connect()
    await this.client.send('Page.enable')
    await this.client.send('Runtime.enable')
    await this.client.send('DOM.enable')
    await this.client.send('Page.bringToFront')
    await this.setViewport(this.viewport)
    await this.navigate(this.pageUrl)
    return this
  }

  async setViewport(viewport) {
    this.viewport = viewport
    await this.client.send('Emulation.setDeviceMetricsOverride', this.viewport)
  }

  async navigate(url = this.pageUrl) {
    await this.client.send('Page.navigate', { url })
    return this.waitFor(
      `document ready for ${url}`,
      `(() => document.readyState === 'complete' ? { url: location.href, title: document.title } : null)()`,
      30000,
      200,
    )
  }

  evaluate(expression, options) {
    return this.client.evaluate(expression, options)
  }

  async waitFor(label, expression, timeoutMs = 30000, intervalMs = 250) {
    const deadline = Date.now() + timeoutMs
    let lastValue = null

    while (Date.now() < deadline) {
      try {
        lastValue = await this.evaluate(expression)
        if (lastValue) return lastValue
      } catch (error) {
        lastValue = { error: error.message }
      }

      await sleep(intervalMs)
    }

    throw new Error(`Timed out waiting for ${label}. Last value: ${JSON.stringify(lastValue)}`)
  }

  async waitForSelector(selector, timeoutMs = 30000, intervalMs = 250) {
    return this.waitFor(
      `selector ${selector}`,
      `(() => {
        const node = document.querySelector(${jsString(selector)})
        if (!node) return null
        const rect = node.getBoundingClientRect()
        return {
          tag: node.tagName.toLowerCase(),
          text: (node.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 120),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        }
      })()`,
      timeoutMs,
      intervalMs,
    )
  }

  async screenshot(name) {
    const result = await this.client.send('Page.captureScreenshot', {
      format: 'png',
      fromSurface: true,
      captureBeyondViewport: true,
    })
    const filePath = path.join(this.artifactDir, name)
    await fs.writeFile(filePath, Buffer.from(result.data, 'base64'))
    console.log(`screenshot:${name}`)
    return filePath
  }

  async writeJson(name, data) {
    const filePath = path.join(this.artifactDir, name)
    await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
    console.log(`summary:${path.basename(filePath)}`)
    return filePath
  }

  async close() {
    if (!this.client) return
    await this.client.close()
  }
}

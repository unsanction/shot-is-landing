import { chromium } from 'playwright'
import { readFile } from 'node:fs/promises'
import { PROFILE_DIR, STUDIO_ORIGIN, VIEWPORT } from './scripts/lessons/config.mjs'
import { OVERLAY_INIT_SCRIPT } from './scripts/lessons/overlay.mjs'

const runs = JSON.parse(await readFile('./scripts/lessons/runs.json', 'utf8'))
const { runId, nodes } = runs['first-ai-video']

const ctx = await chromium.launchPersistentContext(PROFILE_DIR, { headless: true, viewport: VIEWPORT })
await ctx.addInitScript(OVERLAY_INIT_SCRIPT)
const page = ctx.pages()[0] ?? await ctx.newPage()
await page.goto(`${STUDIO_ORIGIN}/studio/runs/${runId}`, { waitUntil: 'domcontentloaded' })
await page.waitForSelector('.react-flow__pane', { timeout: 45000 })
await page.waitForSelector('.react-flow__node', { timeout: 45000 })
await page.waitForTimeout(4000)

const ids = await page.$$eval('.react-flow__node', els => els.map(e => e.getAttribute('data-id')))
console.log('nodes on canvas:', ids.length)
for (const [key, id] of Object.entries(nodes)) console.log(`  ${key.padEnd(14)} ${id}  present=${ids.includes(id)}`)
console.log('Add node button:', await page.getByRole('button', { name: /add node/i }).count())
await page.evaluate(l => window.__shotisCaption?.brand(l), 'SHOT.IS <span>·</span> Lesson 1')
await page.evaluate(t => window.__shotisCaption?.show(t), 'This is the SHOT.IS canvas. Every ad you make lives here as a graph.')
await page.waitForTimeout(600)
await page.screenshot({ path: '/tmp/canvas-recon.png' })
await ctx.close()

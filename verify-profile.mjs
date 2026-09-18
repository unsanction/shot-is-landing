import { chromium } from 'playwright'
import { PROFILE_DIR, STUDIO_ORIGIN, VIEWPORT } from './scripts/lessons/config.mjs'

const ctx = await chromium.launchPersistentContext(PROFILE_DIR, { headless: true, viewport: VIEWPORT })
const page = ctx.pages()[0] ?? await ctx.newPage()
await page.goto(`${STUDIO_ORIGIN}/studio/runs`, { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(6000)
console.log('URL:', page.url())
console.log('authed:', await page.evaluate(() => Boolean(localStorage.getItem('shot.devAuthToken'))))
console.log('BODY:', (await page.evaluate(() => document.body.innerText)).slice(0, 400).replace(/\n+/g,' | '))
await page.screenshot({ path: '/tmp/profile-check.png' })
await ctx.close()

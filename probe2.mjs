import { chromium } from 'playwright'
import { readFile } from 'node:fs/promises'
import { PROFILE_DIR, STUDIO_ORIGIN, VIEWPORT } from './scripts/lessons/config.mjs'
const runs = JSON.parse(await readFile('./scripts/lessons/runs.json','utf8'))
const ctx = await chromium.launchPersistentContext(PROFILE_DIR,{headless:true,viewport:VIEWPORT,args:['--hide-scrollbars']})
const page = ctx.pages()[0] ?? await ctx.newPage()
await page.goto(`${STUDIO_ORIGIN}/studio/runs/${runs['first-ai-video'].runId}`,{waitUntil:'domcontentloaded'})
await page.waitForSelector('.react-flow__node',{timeout:45000}); await page.waitForTimeout(3000)
console.log(await page.evaluate(() => {
  const el = document.elementFromPoint(700, 893)
  const se = document.scrollingElement
  return {
    atBottom: el ? `${el.tagName}.${el.className}`.slice(0,90) : null,
    bodyScroll: { sw: se.scrollWidth, cw: se.clientWidth, sh: se.scrollHeight, ch: se.clientHeight },
    innerH: window.innerHeight,
  }
}))
const pane = await page.locator('.react-flow__pane').first().boundingBox()
console.log('pane box:', pane)
console.log('FIT button count:', await page.getByRole('button', { name: /^fit$/i }).count())
await ctx.close()

/**
 * One-time login for the lesson-recording browser profile.
 *
 * Recordings run from a dedicated Chrome profile that is never shared with the
 * user's day-to-day browser, so a capture can't sweep up unrelated tabs or
 * cookies. You sign in here by hand once; every later recording reuses the
 * profile. No token is ever read, printed, or passed through the script — this
 * only waits until the studio reports an authenticated session.
 *
 *   node scripts/lessons/login.mjs
 */
import { chromium } from 'playwright';
import { PROFILE_DIR, STUDIO_ORIGIN, VIEWPORT } from './config.mjs';

const TIMEOUT_MS = 10 * 60 * 1000;

const main = async () => {
  console.log(`Profile: ${PROFILE_DIR}`);
  console.log('Opening the studio. Sign in in the window that appears — this script waits.\n');

  const context = await chromium.launchPersistentContext(PROFILE_DIR, {
    headless: false,
    viewport: VIEWPORT,
    args: ['--hide-scrollbars'],
  });

  const page = context.pages()[0] ?? (await context.newPage());
  await page.goto(STUDIO_ORIGIN, { waitUntil: 'domcontentloaded' });

  const startedAt = Date.now();
  let authed = false;

  while (Date.now() - startedAt < TIMEOUT_MS) {
    await page.waitForTimeout(2000);
    // Existence check only — the value is never read out of the page.
    authed = await page
      .evaluate(() => Boolean(window.localStorage?.getItem('shot.devAuthToken')))
      .catch(() => false);
    if (authed) break;
  }

  if (!authed) {
    console.error('\nTimed out waiting for a signed-in session. Nothing was saved.');
    await context.close();
    process.exit(1);
  }

  // Give the app a moment to persist everything it writes on first load.
  await page.waitForTimeout(3000);
  console.log('\nSigned in. The profile is saved — recordings can run headless from here.');
  await context.close();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

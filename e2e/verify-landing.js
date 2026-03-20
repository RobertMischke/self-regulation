const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('http://localhost:4201', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'e2e/screenshots/landing-hero.png', fullPage: false });
  await page.screenshot({ path: 'e2e/screenshots/landing-full.png', fullPage: true });
  await browser.close();
  console.log('Screenshots saved');
})();

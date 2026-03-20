const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  
  // Landing mode
  await page.goto('http://localhost:4201', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'e2e/screenshots/landing-mode.png', fullPage: false });
  
  // Click tool mode toggle
  const toolBtn = page.locator('button', { hasText: 'Tool-Modus' });
  await toolBtn.click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'e2e/screenshots/tool-mode.png', fullPage: false });
  await page.screenshot({ path: 'e2e/screenshots/tool-mode-full.png', fullPage: true });
  
  // Click Anmelden
  const loginBtn = page.locator('button', { hasText: 'Anmelden' });
  await loginBtn.click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'e2e/screenshots/login-dialog.png', fullPage: false });

  await browser.close();
  console.log('Screenshots saved');
})();

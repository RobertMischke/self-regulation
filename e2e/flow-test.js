const { chromium } = require('playwright');

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.setViewportSize({ width: 1440, height: 900 });

  await p.goto('http://localhost:4201/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(1000);
  await p.keyboard.press('Escape');
  await p.waitForTimeout(300);

  await p.screenshot({ path: 'e2e/screenshots/home-flows.png', fullPage: true });
  console.log('home done');

  // Click first Starten button via JS
  await p.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const starten = btns.find(b => b.textContent.trim() === 'Starten');
    if (starten) starten.click();
  });
  await p.waitForTimeout(500);
  await p.screenshot({ path: 'e2e/screenshots/flow-modal-step1.png' });
  console.log('modal step1 done');

  // If modal is open, interact with it
  const modal = p.locator('app-flow-modal');
  if (await modal.count() > 0) {
    // Click first option inside modal
    await p.evaluate(() => {
      const modal = document.querySelector('app-flow-modal');
      if (!modal) return;
      const btns = Array.from(modal.querySelectorAll('button'));
      const opt = btns.find(b => b.textContent.includes('Gedankenkarussell'));
      if (opt) opt.click();
    });
    await p.waitForTimeout(300);

    // Click Weiter
    await p.evaluate(() => {
      const modal = document.querySelector('app-flow-modal');
      if (!modal) return;
      const btns = Array.from(modal.querySelectorAll('button'));
      const weiter = btns.find(b => b.textContent.trim() === 'Weiter');
      if (weiter) weiter.click();
    });
    await p.waitForTimeout(400);
    await p.screenshot({ path: 'e2e/screenshots/flow-modal-step2.png' });
    console.log('modal step2 done');
  }

  await b.close();
  console.log('all done');
})();

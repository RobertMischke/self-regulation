import { test } from '@playwright/test';
import { join } from 'path';

const SCREENSHOT_DIR = join(__dirname, 'screenshots');

const pages = [
  { name: 'home', path: '/' },
  { name: 'dashboard-adhs', path: '/dashboard/adhs-regulation' },
  { name: 'dashboard-emotion', path: '/dashboard/emotion-regulation' },
  { name: 'cofounder', path: '/cofounder' },
  { name: 'validierung', path: '/validierung' },
];

for (const page of pages) {
  test(`screenshot: ${page.name}`, async ({ page: p }) => {
    await p.goto(page.path, { waitUntil: 'networkidle' });
    await p.waitForTimeout(500);
    await p.screenshot({
      path: join(SCREENSHOT_DIR, `${page.name}.png`),
      fullPage: true,
    });
  });
}

test('screenshot: modal-verlauf', async ({ page: p }) => {
  await p.goto('/dashboard/adhs-regulation', { waitUntil: 'networkidle' });
  await p.waitForTimeout(300);
  // Save two snapshots so the wave has data
  for (let i = 0; i < 3; i++) {
    const btn = p.getByRole('button', { name: 'Moment speichern' });
    await btn.click();
    await p.waitForTimeout(200);
  }
  // Open the modal
  const verlauf = p.getByRole('button', { name: 'Verlauf öffnen' });
  await verlauf.click();
  await p.waitForTimeout(400);
  await p.screenshot({
    path: join(SCREENSHOT_DIR, 'modal-verlauf.png'),
  });
});

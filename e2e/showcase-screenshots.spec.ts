import { test } from '@playwright/test';
import { join } from 'path';

const OUT = join(__dirname, '..', 'public', 'showcase');

test('showcase: dashboard-adhs', async ({ page }) => {
  await page.goto('/dashboard/adhs-regulation', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  // Set some slider values for a more interesting screenshot
  const sliders = page.locator('input[type="range"]');
  const count = await sliders.count();
  const values = [72, 35, 60, 85, 40];
  for (let i = 0; i < Math.min(count, values.length); i++) {
    await sliders.nth(i).fill(String(values[i]));
    await page.waitForTimeout(100);
  }
  await page.waitForTimeout(400);

  await page.screenshot({
    path: join(OUT, 'dashboard.png'),
    fullPage: false,
  });
});

test('showcase: dashboard-emotion', async ({ page }) => {
  await page.goto('/dashboard/emotion-regulation', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  const sliders = page.locator('input[type="range"]');
  const count = await sliders.count();
  const values = [65, 45, 80, 30, 55];
  for (let i = 0; i < Math.min(count, values.length); i++) {
    await sliders.nth(i).fill(String(values[i]));
    await page.waitForTimeout(100);
  }
  await page.waitForTimeout(400);

  await page.screenshot({
    path: join(OUT, 'dashboard-emotion.png'),
    fullPage: false,
  });
});

test('showcase: verlauf', async ({ page }) => {
  await page.goto('/dashboard/adhs-regulation', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  // Save several snapshots with varying values to create interesting history
  const sliders = page.locator('input[type="range"]');
  const count = await sliders.count();
  const profiles = [
    [70, 30, 55, 80, 45],
    [40, 60, 75, 35, 65],
    [85, 50, 40, 60, 30],
    [55, 45, 65, 50, 70],
    [30, 70, 50, 75, 55],
  ];

  for (const profile of profiles) {
    for (let i = 0; i < Math.min(count, profile.length); i++) {
      await sliders.nth(i).fill(String(profile[i]));
    }
    await page.waitForTimeout(200);
    const saveBtn = page.getByRole('button', { name: 'Moment speichern' });
    await saveBtn.click();
    await page.waitForTimeout(300);
  }

  // Open the history modal
  const historyBtn = page.getByRole('button', { name: 'Verlauf öffnen' });
  await historyBtn.click();
  await page.waitForTimeout(500);

  await page.screenshot({
    path: join(OUT, 'verlauf.png'),
    fullPage: false,
  });
});

test('showcase: flows', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  // Scroll to flows section
  await page.locator('#flows').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);

  await page.screenshot({
    path: join(OUT, 'flows.png'),
    fullPage: false,
  });
});

test('showcase: flow-active', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  // Find "Wieder ins Arbeiten kommen" flow and start it
  // First go to the "Fokus & Arbeit" category
  const fokusChip = page.locator('button', { hasText: 'Fokus & Arbeit' });
  await fokusChip.click();
  await page.waitForTimeout(300);

  // Click "Starten" on the "Wieder ins Arbeiten kommen" card
  const card = page.locator('app-flow-card', { hasText: 'Wieder ins Arbeiten kommen' });
  const startBtn = card.locator('button', { hasText: 'Starten' });
  await startBtn.click();
  await page.waitForTimeout(500);

  // Step 1: choice — select "Zu viel auf einmal"
  const option = page.locator('button', { hasText: 'Zu viel auf einmal' });
  await option.click();
  await page.waitForTimeout(200);
  await page.locator('button', { hasText: 'Weiter' }).click();
  await page.waitForTimeout(400);

  // Step 2: action "Finde die lächerlich kleinste Einstiegshandlung" — advance
  await page.locator('button', { hasText: 'Hab eine' }).click();
  await page.waitForTimeout(400);

  // Step 3: action with timer "Mach genau das jetzt" — start the timer
  const timerBtn = page.locator('button', { hasText: 'Timer starten' });
  await timerBtn.click();
  await page.waitForTimeout(1200);

  // Now we're on step 3 with timer running, "Noch nicht" (back) visible
  await page.screenshot({
    path: join(OUT, 'flow-active.png'),
    fullPage: false,
  });
});

test('showcase: flow-graph', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  // Go to Fokus & Arbeit category
  const fokusChip = page.locator('button', { hasText: 'Fokus & Arbeit' });
  await fokusChip.click();
  await page.waitForTimeout(300);

  // Find "Wieder ins Arbeiten kommen" card and click the graph icon
  const card = page.locator('app-flow-card', { hasText: 'Wieder ins Arbeiten kommen' });
  const graphBtn = card.locator('button[title="Flow-Karte"]');
  await graphBtn.click({ force: true });
  await page.waitForTimeout(600);

  await page.screenshot({
    path: join(OUT, 'flow-graph.png'),
    fullPage: false,
  });
});

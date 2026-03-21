import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  outputDir: './e2e/results',
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:4205',
    screenshot: 'off',
    viewport: { width: 1440, height: 900 },
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
  webServer: {
    command: 'npx ng serve',
    port: 4205,
    reuseExistingServer: true,
    timeout: 60_000,
  },
});

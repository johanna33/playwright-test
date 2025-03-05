import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/ui/specs',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  /* Shared settings for all the projects below.*/
  use: {
    baseURL: 'https://parabank.parasoft.com/parabank/index.htm',
    trace: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

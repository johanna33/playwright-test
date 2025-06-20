import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [["html", { title: "Regression Test Report" }]],
  // timeout: 30000,
  // expect: {
  //   timeout: 10000,
  // },

  use: {
    baseURL: "https://parabank.parasoft.com/parabank/index.htm",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "setup",
      testDir: "./tests/setup",
      testMatch: "**/global-setup.ts",
    },
    {
      name: "chromium",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "./session.json",
      },
    },
  ],
});

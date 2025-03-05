import { test as base } from "@playwright/test";
import { PageManager } from "../ui/pages/page-manager";

export type TestOptions = {
  openPage: string;
  pm: PageManager;
};

export const test = base.extend<TestOptions>({
  openPage: async ({ page }, use) => {
    const URL = await page.goto("");
    console.log("========= Opening ", URL?.url());
    await use("");
  },

  pm: async ({ page, openPage }, use) => {
    const pageManager = new PageManager(page);
    await use(pageManager);
  },
});

export { expect } from "@playwright/test";

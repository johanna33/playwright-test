import { credentials } from "../common/test-data/user-data";
import { test } from "./base-fixture"

test.describe.configure({ mode: "serial" });

test.describe("Global setup", () => {
    test("login and get session details", async ({ pm, page }) => {
        const authFile = './session.json';
        await pm.getLoginPage().doLogin(credentials.username, credentials.password);
        await pm.getLoginPage().assertSuccessUserLogin();
        await page.context().storageState({ path: authFile });
    });
});
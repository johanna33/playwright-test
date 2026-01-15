import { getCredentials } from "../common/test-data/user-data";
import { test } from "./base-fixture";
import { newUser } from "../common/test-data/user-data";

test.describe.configure({ mode: "serial" });

test.describe("Global setup", () => {
  test("login or register and save session details", async ({ pm, page }) => {
    const authFile = "./session.json";
    await pm.getLoginPage().doLogin(getCredentials().username, getCredentials().password);
    
    const isLoginFailed = await pm.getLoginPage().isUserLoginFailed();
    if (isLoginFailed) {
      newUser.username = getCredentials().username;
      newUser.password = getCredentials().password;
      await pm.getRegistrationPage().openRegistrationPage();
      await pm.getRegistrationPage().fillRegistrationForm(newUser);
      console.log("New user registered");
    } 

    await pm.getLoginPage().assertSuccessUserLogin();
    await page.context().storageState({ path: authFile });
  });
});

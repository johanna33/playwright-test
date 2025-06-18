import { test } from "../../setup/base-fixture";
import { credentials, newUser } from "../../common/test-data/user-data";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("User Login", { tag: ["@login"] }, () => {
  test.afterEach(async ({ pm }) => {
    await test.step("Validate user logout succesfully", async () => {
      await pm.getLoginPage().doLogout();
    });
  });

  test("Verify user can login with valid credentials and logout", async ({ pm }) => {
    await test.step("Enter valid username and password and click login button", async () => {
      await pm.getLoginPage().doLogin(credentials.username, credentials.password);
    });

    await test.step("Validate account services page is loaded", async () => {
      await pm.getLoginPage().assertSuccessUserLogin();
    });
  });

  test("Verify new user registration", async ({ pm }) => {
    await test.step("Navigate to registration page", async () => {
      await pm.getRegistrationPage().openRegistrationPage();
    });

    await test.step("Fill registration form", async () => {
      await pm.getRegistrationPage().fillRegistrationForm(newUser);
    });

    await test.step("Validate welcome message is displayed", async () => {
      await pm.getRegistrationPage().assertWelcomeMessage();
      await pm.getRegistrationPage().assertAccountCreatedText();
    });
  });
});

import { test } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { UserAccountData } from "../../common/interfaces/user-interface";
import { RegistrationPage } from "../pages/registration-page";

const credentials = {
    username: 'mary22',
    password: 'test1234'
};
const newUser: UserAccountData = {
    firstName: 'maria',
    lastName: 'popa',
    street: '123 strret',
    city: 'austin',
    state: 'tx',
    zipCode: '78777',
    phoneNumber: '6195553333',
    ssn: '12345678',
    username: 'mary23',
    password: 'test1234'
}

test.describe("User Login", { tag: ["@login"] }, () => {

    test.beforeEach(async ({ page }) => {
        await test.step("Navigate to login page", async () => {
            await page.goto("");
        });
    });

    test("Verify user can login with valid credentials and logout", async ({ page }) => {
        const pm = new LoginPage(page);

        await test.step("Enter valid username and password and click login button", async () => {
            await pm.doLogin(credentials.username, credentials.password);
        });

        await test.step("Validate account services page is loaded", async () => {
            await pm.assertSuccessUserLogin();
        });

        await test.step("Validate user logout succesfully", async () => {
            await pm.doLogout();
        });

    });

    test("Verify new user registration", async ({ page }) => {
        const pm = new RegistrationPage(page);
        const pm1 = new LoginPage(page);

        await test.step("Navigate to registration page", async () => {
            await pm.openRegistrationPage();
        });

        await test.step("Fill registration form", async () => {
            await pm.fillRegistrationForm(newUser);
        });

        await test.step("Validate welcome message is displayed", async () => {
            await pm.assertWelcomeMessage();
            await pm.assertAccountCreatedText();
        });

        await test.step("Validate user logout succesfully", async () => {
            await pm1.doLogout();
        });
        
    });

    test("Verify login failure with incorrect credentials", async ({ page }) => {

    });

    test("Verify ‘Forgot login info?’", async ({ page }) => {

    });


});
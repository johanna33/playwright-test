import { expect, type Locator, type Page } from "@playwright/test";
import { UserAccountData } from "../../common/interfaces/user-interface";

export class RegistrationPage {
    readonly page: Page;
    readonly registerLink: Locator;
    readonly firstNameTextBox: Locator;
    readonly lastNameTextBox: Locator;
    readonly streetTextBox: Locator;
    readonly cityTextBox: Locator;
    readonly stateTextBox: Locator;
    readonly zipCodeTextBox: Locator;
    readonly phoneNumberTextBox: Locator;
    readonly ssnTextBox: Locator;
    readonly usernameTextBox: Locator;
    readonly passwordTextBox: Locator;
    readonly repeatedPasswordTextBox: Locator;
    readonly registerButton: Locator;
    readonly welcomeHeading: Locator;
    readonly accountCreatedText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.registerLink = page.getByRole('link', { name: 'Register' });
        this.firstNameTextBox = page.locator('[id="customer\\.firstName"]');
        this.lastNameTextBox = page.locator('[id="customer\\.lastName"]');
        this.streetTextBox = page.locator('[id="customer\\.address\\.street"]');
        this.cityTextBox = page.locator('[id="customer\\.address\\.city"]');
        this.stateTextBox = page.locator('[id="customer\\.address\\.state"]');
        this.zipCodeTextBox = page.locator('[id="customer\\.address\\.zipCode"]');
        this.phoneNumberTextBox = page.locator('[id="customer\\.phoneNumber"]');
        this.ssnTextBox = page.locator('[id="customer\\.ssn"]');
        this.usernameTextBox = page.locator('[id="customer\\.username"]');
        this.passwordTextBox = page.locator('[id="customer\\.password"]');
        this.repeatedPasswordTextBox = page.locator('#repeatedPassword');
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.welcomeHeading = page.getByRole('heading', { name: /Welcome/ });
        this.accountCreatedText = page.getByText('Your account was created');
    }

    async openRegistrationPage() {
        await this.registerLink.click();
    }

    async fillRegistrationForm(user: UserAccountData) {
        await this.fillUserAccountData(user);
        await this.clickRegisterButton();
    }

    async fillUserAccountData(user: UserAccountData) {
        await this.firstNameTextBox.fill(user.firstName);
        await this.lastNameTextBox.fill(user.lastName);
        await this.streetTextBox.fill(user.street);
        await this.cityTextBox.fill(user.city);
        await this.stateTextBox.fill(user.state);
        await this.zipCodeTextBox.fill(user.zipCode);
        await this.phoneNumberTextBox.fill(user.phoneNumber);
        await this.ssnTextBox.fill(user.ssn);
        await this.usernameTextBox.fill(user.username);
        await this.passwordTextBox.fill(user.password);
        await this.repeatedPasswordTextBox.fill(user.password);
    }

    async clickRegisterButton() {
        await this.registerButton.click();
    }

    async assertWelcomeMessage() {
        await expect(this.welcomeHeading).toBeVisible();
    }

    async assertAccountCreatedText() {
        await expect(this.accountCreatedText).toBeVisible();
    }

}
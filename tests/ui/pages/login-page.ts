import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameTextBox: Locator;
  readonly passwordTextBox: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMessage: Locator;
  readonly menuTitle: Locator;
  readonly logOutLink: Locator;
  readonly loginPageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameTextBox = page.locator("input[name='username']");
    this.passwordTextBox = page.locator("input[name='password']");
    this.loginButton = page.getByRole("button", { name: "Log In" });
    this.loginErrorMessage = page.getByRole("heading", { name: "Error!" });
    this.menuTitle = page.getByRole("heading", { name: "Account Services" });
    this.logOutLink = page.getByRole("link", { name: "Log Out" });
    this.loginPageTitle = page.getByRole("heading", { name: "Welcome, Please Sign In" });
    this.loginPageTitle = page.getByRole("heading", { name: "Customer Login" });
  }

  async doLogin(username: string, password: string) {
    await this.fillUserName(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  async doLogout() {
    await this.clickLogOutLink();
    await this.assertLoginPage();
  }

  async assertSuccessUserLogin() {
    await expect(this.menuTitle).toBeVisible();
  }

  async assertLoginPage() {
    await expect(this.loginPageTitle).toBeVisible();
  }

  async fillUserName(userName: string) {
    await this.usernameTextBox.fill(userName);
  }

  async fillPassword(password: string) {
    await this.passwordTextBox.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async clickLogOutLink() {
    await this.logOutLink.click();
  }
}

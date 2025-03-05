import { type Page } from "@playwright/test";
import { LoginPage } from "./login-page";
import { AccountsPage } from "./accounts-page";
import { RegistrationPage } from "./registration-page";
import { TransfersPage } from "./transfers-page";

export class PageManager {
  readonly page: Page;
  private readonly loginPage: LoginPage;
  private readonly accountsPage: AccountsPage;
  private readonly registrationPage: RegistrationPage;
  private readonly transfersPage: TransfersPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.accountsPage = new AccountsPage(this.page);
    this.registrationPage = new RegistrationPage(this.page);
    this.transfersPage = new TransfersPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getAccountsPage() {
    return this.accountsPage;
  }

  getRegistrationPage() {
    return this.registrationPage;
  }

  getTransfersPage() {
    return this.transfersPage;
  }
}

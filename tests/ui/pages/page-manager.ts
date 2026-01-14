import { type Page } from "@playwright/test";
import { LoginPage } from "./login-page";
import { AccountsPage } from "./accounts-page";
import { RegistrationPage } from "./registration-page";
import { TransfersPage } from "./transfers-page";
import { NewAccountPage } from "./new-account-page";
import { UpdateContactPage } from "./update-contact-page";

export class PageManager {
  readonly page: Page;
  private readonly loginPage: LoginPage;
  private readonly accountsPage: AccountsPage;
  private readonly registrationPage: RegistrationPage;
  private readonly transfersPage: TransfersPage;
  private readonly newAccountPage: NewAccountPage;
  private readonly updateContactPage: UpdateContactPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.accountsPage = new AccountsPage(this.page);
    this.registrationPage = new RegistrationPage(this.page);
    this.transfersPage = new TransfersPage(this.page);
    this.newAccountPage = new NewAccountPage(this.page);
    this.updateContactPage = new UpdateContactPage(this.page);
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

  getNewAccountPage() {
    return this.newAccountPage;
  }

  getUpdateContactPage() {
    return this.updateContactPage;
  }
}

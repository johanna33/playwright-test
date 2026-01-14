import { expect, type Locator, type Page } from "@playwright/test";
import { UserAccountData } from "../../common/interfaces/user-interface";

export class UpdateContactPage {
  readonly page: Page;
  readonly updateContactInfoLink: Locator;
  readonly firstNameTextBox: Locator;
  readonly lastNameTextBox: Locator;
  readonly streetTextBox: Locator;
  readonly cityTextBox: Locator;
  readonly stateTextBox: Locator;
  readonly zipCodeTextBox: Locator;
  readonly phoneNumberTextBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.updateContactInfoLink = page.getByRole("link", { name: "Update Contact Info" });
    this.firstNameTextBox = page.locator('[id="customer.firstName"]');
    this.lastNameTextBox = page.locator('[id="customer.lastName"]');
    this.streetTextBox = page.locator('[id="customer.address.street"]');
    this.cityTextBox = page.locator('[id="customer.address.city"]');
    this.stateTextBox = page.locator('[id="customer.address.state"]');
    this.zipCodeTextBox = page.locator('[id="customer.address.zipCode"]');
    this.phoneNumberTextBox = page.locator('[id="customer.phoneNumber"]');
  }

  async openUpdateContactInfoPage() {
    await this.updateContactInfoLink.click();
  }

  async fillContactInfoForm(user: UserAccountData) {
    await this.firstNameTextBox.fill(user.firstName);
    await this.lastNameTextBox.fill(user.lastName);
    await this.streetTextBox.fill(user.street);
    await this.cityTextBox.fill(user.city);
    await this.stateTextBox.fill(user.state);
    await this.zipCodeTextBox.fill(user.zipCode);
    await this.phoneNumberTextBox.fill(user.phoneNumber);
  }
}

import { expect, type Locator, type Page } from "@playwright/test";

export class NewAccountPage {
  readonly page: Page;
  readonly openNewAccountLink: Locator;
  readonly openNewAccountButton: Locator;
  readonly successMessage: Locator;
  readonly newAcocuntIdLink: Locator;
  readonly accountTypeDropdown: Locator;
  readonly existingAccountInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openNewAccountLink = page.getByRole("link", { name: "Open New Account" });
    this.openNewAccountButton = page.getByRole("button", { name: "Open New Account" });
    this.successMessage = page.getByText("Congratulations, your account is now open.");
    this.newAcocuntIdLink = page.locator("#newAccountId");
    this.accountTypeDropdown = page.locator("#type");
    this.existingAccountInput = page.locator("#fromAccountId");
  }

  async openNewAccountPage() {
    await this.openNewAccountLink.click();
    await this.assertExistingAccountInputHasValue();
  }

  async assertExistingAccountInputHasValue() {
    await expect(this.existingAccountInput).toHaveValue(/[0-9]/);
  }

  async selectAccountType(accountType: string) {
    await this.accountTypeDropdown.selectOption(accountType);
  }

  async assertSuccessMessage() {
    await expect(this.successMessage).toBeVisible();
  }

  async clickOpenNewAccountButton() {
    await this.openNewAccountButton.click({ timeout: 20000 });
  }

  async assertNewAccountId() {
    await expect(this.newAcocuntIdLink).toBeVisible();
    const newAccountId = await this.newAcocuntIdLink.innerText();
    expect(newAccountId).toMatch(/^[0-9]+$/);
    return newAccountId;
  }
}

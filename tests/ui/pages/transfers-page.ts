import { expect, type Locator, type Page } from "@playwright/test";

export class TransfersPage {
    readonly page: Page;
    readonly transferFundsLink: Locator;
    readonly amountInput: Locator;
    readonly fromAccountSelect: Locator;
    readonly toAccountSelect: Locator;
    readonly transferButton: Locator;
    readonly transferConfirmationText: Locator;
    readonly accountActivityMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.transferFundsLink = page.getByRole('link', { name: 'Transfer Funds' });
        this.amountInput = page.locator('#amount');
        this.fromAccountSelect = page.locator('#fromAccountId');
        this.toAccountSelect = page.locator('#toAccountId');
        this.transferButton = page.getByRole('button', { name: 'Transfer' });
        this.transferConfirmationText = page.getByText(/\$\d+\.\d{2} has been transferred/);
        this.accountActivityMessage = page.getByText('See Account Activity for more');
    }

    async openTransferFundsPage() {
        await this.transferFundsLink.click();
    }

    async fillTransferForm(amount: string, fromAccount: string, toAccount: string) {
        await this.amountInput.fill(amount);
        await this.fromAccountSelect.selectOption(fromAccount);
        await this.toAccountSelect.selectOption(toAccount);
    }

    async clickTransferButton() {
        await this.transferButton.click();
    }

    async assertTransferConfirmation(amount: string) {
        await expect(this.transferConfirmationText).toContainText(amount);
        await expect(this.accountActivityMessage).toBeVisible();
    }
}

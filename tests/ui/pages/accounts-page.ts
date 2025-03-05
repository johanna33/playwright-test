import { expect, type Locator, type Page } from "@playwright/test";

export class AccountsPage {
    readonly page: Page;
    readonly accountsOverviewLink: Locator;
    readonly accountTable: Locator;
    readonly accountDetailsHeading: Locator;
    readonly accountActivityHeading: Locator;
    readonly accountNumberValue: Locator;
    readonly accountTypeValue: Locator;
    readonly balanceValue: Locator;
    readonly availableBalanceValue: Locator;
    readonly transactionTable: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountsOverviewLink = page.getByRole('link', { name: 'Accounts Overview' });
        this.accountTable = page.locator('#accountTable');
        this.accountActivityHeading = page.getByRole('heading', { name: 'Account Activity' });
        this.accountDetailsHeading = page.getByRole('heading', { name: 'Account Details' });
        this.accountNumberValue = page.locator('#accountId');;
        this.accountTypeValue = page.locator('#accountType');
        this.balanceValue = page.locator('#balance');
        this.availableBalanceValue = page.locator('#availableBalance');
        this.transactionTable = page.locator("#transactionTable");
    }

    async openAccountOverviewPage() {
        await this.accountsOverviewLink.click();
    }

    /*
     * This function opens the account details page only for the first account in the table.
     */
    async openAccountDetailsPage() {
        const rows = await this.getAllRowsInTable(this.accountTable);
        const firstRow = rows[0];
        const cells = await this.getAllCellsInARow(firstRow);
        const accountNumber = await cells[0].textContent();
        if (accountNumber) {
            const accountNumberLink = this.page.getByRole('link', { name: accountNumber });
            await accountNumberLink.click();
        }
    }

    async getTableHeaderLocators(table: Locator): Promise<Locator[]> {
        return await table.locator('thead tr th').all();
    }

    async getAllRowsInTable(table: Locator): Promise<Locator[]> {
        return await this.accountTable.locator('tbody tr').all();
    }

    async getAllCellsInARow(row: Locator): Promise<Locator[]> {
        return await row.locator('td').all();
    }

    async assertAccountTableDataHasNumberValues() {
        const rows = await this.getAllRowsInTable(this.accountTable);

        for (const [rowIndex, row] of rows.entries()) {
            const cells = await this.getAllCellsInARow(row);
            for (const [colIndex, cell] of cells.entries()) {
                const cellText = await cell.textContent();
                console.log(cellText);

                if (cellText?.trim() && cellText !== "Total") {
                    const hasNumber = /\d/.test(cellText);
                    await expect(hasNumber,
                        `Cell at row ${rowIndex + 1}, column ${colIndex + 1} should contain a number`
                    ).toBeTruthy();
                }
            }
        }
    }

    async assertAccountDetailsArePresent() {
        await expect(this.accountDetailsHeading).toBeVisible();
        await expect(this.accountNumberValue).toBeVisible();
        await expect(this.accountTypeValue).toBeVisible();
        await expect(this.balanceValue).toBeVisible();
        await expect(this.availableBalanceValue).toBeVisible();
    }

    async assertTransactionTableDataIsPresent() {
        await expect(this.accountActivityHeading).toBeVisible();
        await expect(this.transactionTable).toBeVisible();
    }
}

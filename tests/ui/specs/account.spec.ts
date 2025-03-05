import { test } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { AccountsPage } from "../pages/accounts-page";
import { TransfersPage } from "../pages/transfers-page";
import { credentials } from "../../common/test-data/user-data";
import { transferData } from "../../common/test-data/account-data";

test.describe("Account transactions", { tag: ["@account"] }, () => {

    test.beforeEach(async ({ page }) => {
        const pm = new LoginPage(page);

        await test.step("Navigate to login page", async () => {
            await page.goto("");
        });

        await test.step("Enter valid username and password and click login button", async () => {
            await pm.doLogin(credentials.username, credentials.password);
        });

        await test.step("Validate account services page is loaded", async () => {
            await pm.assertSuccessUserLogin();
        });
    });

    test.afterEach(async ({ page }) => {
        const pm = new LoginPage(page);
        await test.step("Validate user logout succesfully", async () => {
            await pm.doLogout();
        });
    });

    test("Verify the account details", async ({ page }) => {
        const pm = new AccountsPage(page);

        await test.step("Navigate to the Accounts Overview page", async () => {
            await pm.openAccountOverviewPage();
        });

        await test.step("Validate displayed balance and available amount", async () => {
            await pm.assertAccountTableDataHasNumberValues();
        });

        await test.step("Open one of the account listed.", async () => {
            await pm.openAccountDetailsPage();
        });

        await test.step("Validate account number, type, balance, available and account activity", async () => {
            await pm.assertAccountDetailsArePresent();
            await pm.assertTransactionTableDataIsPresent();
        });

    });

    test("Verify fund transfer between accounts", async ({ page }) => {
        const pm = new TransfersPage(page);
        const pm1 = new AccountsPage(page);
        let accountNumber: string | null;

        await test.step("Navigate to the Accounts Overview page and get the account number", async () => {
            await pm1.openAccountOverviewPage();
            accountNumber = await pm1.getFirstRowAccountNumber();
            if (accountNumber) {
                transferData.fromAccount = accountNumber;
                transferData.toAccount = accountNumber;
            }
        });

        await test.step("Navigate to transfer funds page", async () => {
            await pm.openTransferFundsPage();
        });

        await test.step("Enter valid transfer details and submit", async () => {
            await pm.fillTransferForm(transferData.amount, transferData.fromAccount, transferData.toAccount);
            await pm.clickTransferButton();
        });

        await test.step("Validate transfer confirmation message", async () => {
            await pm.assertTransferConfirmation(transferData.amount);
        });

    });
});
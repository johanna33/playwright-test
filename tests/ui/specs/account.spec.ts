import { test } from "../../setup/base-fixture";
import { credentials } from "../../common/test-data/user-data";
import { transferData } from "../../common/test-data/account-data";

test.describe("Account transactions", { tag: ["@account"] }, () => {

    // test.beforeEach(async ({ pm }) => {
    //     await test.step("Enter valid username and password and click login button", async () => {
    //         await pm.getLoginPage().doLogin(credentials.username, credentials.password);
    //     });

    //     await test.step("Validate account services page is loaded", async () => {
    //         await pm.getLoginPage().assertSuccessUserLogin();
    //     });
    // });

    test.afterEach(async ({ pm }) => {
        await test.step("Validate user logout succesfully", async () => {
            await pm.getLoginPage().doLogout();
        });
    });

    test("Verify the account details", async ({ pm }) => {
        await test.step("Navigate to the Accounts Overview page", async () => {
            await pm.getAccountsPage().openAccountOverviewPage();
        });

        await test.step("Validate displayed balance and available amount", async () => {
            await pm.getAccountsPage().assertAccountTableDataHasNumberValues();
        });

        await test.step("Open one of the account listed.", async () => {
            await pm.getAccountsPage().openAccountDetailsPage();
        });

        await test.step("Validate account number, type, balance, available and account activity", async () => {
            await pm.getAccountsPage().assertAccountDetailsArePresent();
            await pm.getAccountsPage().assertTransactionTableDataIsPresent();
        });

    });

    test("Verify fund transfer between accounts", async ({ pm }) => {
        let accountNumber: string | null;

        await test.step("Navigate to the Accounts Overview page and get the account number", async () => {
            await pm.getAccountsPage().openAccountOverviewPage();
            accountNumber = await pm.getAccountsPage().getFirstRowAccountNumber();
            if (accountNumber) {
                transferData.fromAccount = accountNumber;
                transferData.toAccount = accountNumber;
            }
        });

        await test.step("Navigate to transfer funds page", async () => {
            await pm.getTransfersPage().openTransferFundsPage();
        });

        await test.step("Enter valid transfer details and submit", async () => {
            await pm.getTransfersPage().fillTransferForm(transferData.amount, transferData.fromAccount, transferData.toAccount);
            await pm.getTransfersPage().clickTransferButton();
        });

        await test.step("Validate transfer confirmation message", async () => {
            await pm.getTransfersPage().assertTransferConfirmation(transferData.amount);
        });

    });
});
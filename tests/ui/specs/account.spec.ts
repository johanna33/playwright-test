import { test } from "../../setup/base-fixture";
import { transferData, checkingAccountData, savingsAccountData } from "../../common/test-data/account-data";

const accountTypes = [checkingAccountData, savingsAccountData];
test.describe("Account transactions", { tag: ["@account"] }, () => {
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
      await pm
        .getTransfersPage()
        .fillTransferForm(transferData.amount, transferData.fromAccount, transferData.toAccount);
      await pm.getTransfersPage().clickTransferButton();
    });

    await test.step("Validate transfer confirmation message", async () => {
      await pm.getTransfersPage().assertTransferConfirmation(transferData.amount);
    });
  });

  for (const type of accountTypes) {
    test(`Verify new ${type.label} account creation`, async ({ pm }) => {
      let newAccountId = "";

      await test.step("Navigate to the Create New Account page", async () => {
        await pm.getNewAccountPage().openNewAccountPage();
      });

      await test.step(`Select the account type ${type.label}`, async () => {
        await pm.getNewAccountPage().selectAccountType(type.value);
      });

      await test.step("Click the Open New Account button", async () => {
        await pm.getNewAccountPage().clickOpenNewAccountButton();
      });

      await test.step("Validate the account is created successfully", async () => {
        await pm.getNewAccountPage().assertSuccessMessage();
        newAccountId = await pm.getNewAccountPage().assertNewAccountId();
      });

      await test.step("Navigate to the Accounts Overview page", async () => {
        await pm.getAccountsPage().openAccountOverviewPage();
      });

      await test.step("Validate the new account is listed in the account overview", async () => {
        await pm.getAccountsPage().assertAccountNumberIsPresent(newAccountId);
      });
    });
  }
});

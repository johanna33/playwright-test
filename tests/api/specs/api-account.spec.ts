import { test, expect } from "../../setup/base-fixture";
import { getAccountDetails, getAccounts, updateCustomer } from '../request/account';

test.describe.configure({ mode: "serial" });

test.describe("Account API", () => {
    let customerId: string;
    let accountId: string;
  
    test.beforeEach("get the customerId in the update contact info page", async ({ pm }) => {
        await pm.getAccountsPage().openAccountOverviewPage();
        await pm.getAccountsPage().openUpdateContactInfoPage();
        customerId = await pm.getAccountsPage().getCustomerId();
    });

    test('Verify account overview request', async () => {
        const response = await getAccounts(customerId);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody[0]).toHaveProperty('id');
        expect(responseBody[0]).toHaveProperty('customerId');
        expect(responseBody[0]).toHaveProperty('type', 'CHECKING');
        expect(responseBody[0]).toHaveProperty('balance');
        accountId = responseBody[0].id;
    });

    test('Verify account details request', async () => {
        const response = await getAccountDetails(accountId);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('id', accountId);
        expect(responseBody).toHaveProperty('customerId');
        expect(responseBody).toHaveProperty('type', 'CHECKING');
        expect(responseBody).toHaveProperty('balance');
    });

    test('Verify update customer request', async () => {
        const response = await updateCustomer(customerId);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toEqual("Successfully updated customer profile");
    });

});

import { test, expect } from "../../setup/base-fixture";
import { getAccounts } from '../request/account';

test.describe("Account API", () => {
    let customerId: string;
  
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
    });

});

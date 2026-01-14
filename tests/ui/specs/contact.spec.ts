import { test, expect } from "../../setup/base-fixture";
import apiPaths from "../../common/api/api-paths";
import { newUser } from "../../common/test-data/user-data";

test.describe("Contact Info Tests", {}, () => {
  let customerId: string;
  const mockedUser = newUser;
  test.beforeEach("get the customerId in the update contact info page", async ({ pm }) => {
    if (!customerId) {
      await pm.getAccountsPage().openAccountOverviewPage();
      await pm.getAccountsPage().openUpdateContactInfoPage();
      customerId = await pm.getAccountsPage().getCustomerId();
    }
  });
  test("Verify the contact information update is displayed correctly", async ({ pm, page }, testInfo) => {
    await test.step("overwrite contact information", async () => {
      const url = `${apiPaths.baseUrl}customers/${customerId}`;
      await page.route(url, async (route) => {
        const response = await route.fetch({ maxRetries: 2 });
        const jsonResponse = await response.json();
        jsonResponse.firstName = mockedUser.firstName;
        jsonResponse.lastName = mockedUser.lastName;
        jsonResponse.phoneNumber = mockedUser.phoneNumber;
        jsonResponse.address.street = mockedUser.street;
        console.log(`jsonResponse modified: ${JSON.stringify(jsonResponse)}`);
        await route.fulfill({ body: JSON.stringify(jsonResponse) });
      });
    });

    await test.step("validate contact info has the changes we modfied", async () => {
      await page.goto("https://parabank.parasoft.com/parabank/updateprofile.htm");

      await expect(pm.getUpdateContactPage().firstNameTextBox).toHaveValue(mockedUser.firstName);
      await expect(pm.getUpdateContactPage().lastNameTextBox).toHaveValue(mockedUser.lastName);
      await expect(pm.getUpdateContactPage().phoneNumberTextBox).toHaveValue(mockedUser.phoneNumber);
      await expect(pm.getUpdateContactPage().streetTextBox).toHaveValue(mockedUser.street);
    });

    await testInfo.attach("updated-contact-info", {
      body: await page.screenshot(),
      contentType: "image/png",
    });
  });
});

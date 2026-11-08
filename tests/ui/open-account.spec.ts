import { test, expect } from '../../src/fixtures';
import { OPENING_DEPOSIT, toCurrency } from '../../src/test-data/account';
import { getExistingUser } from '../../src/test-data/existing-user';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.logIn(getExistingUser());
});

test('a customer can open a savings account funded from an existing account', async ({
  accounts: { source: fundingAccount },
  parabankApi,
  openAccountPage,
  accountDetailsPage,
  accountsOverviewPage,
}) => {
  await openAccountPage.goto();
  await openAccountPage.openAccount('SAVINGS', fundingAccount.id);

  await expect(openAccountPage.confirmationHeading).toBeVisible();
  await expect(openAccountPage.newAccountLink).toHaveText(/^\d+$/);
  const newAccountId = await openAccountPage.newAccountLink.innerText();

  await openAccountPage.newAccountLink.click();

  await expect(accountDetailsPage.accountType).toHaveText('SAVINGS');
  await expect(accountDetailsPage.balance).toHaveText(toCurrency(OPENING_DEPOSIT));

  await accountsOverviewPage.goto();

  await expect(accountsOverviewPage.balanceOf(fundingAccount.id)).toHaveText(
    toCurrency(fundingAccount.balance - OPENING_DEPOSIT),
  );

  // Return the deposit so that repeated runs don't use up the existing user's funds.
  await parabankApi.transfer(Number(newAccountId), fundingAccount.id, OPENING_DEPOSIT);
});

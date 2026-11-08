import { test, expect } from '../../src/fixtures';
import { TRANSFER_AMOUNT, toCurrency } from '../../src/test-data/account';
import { getExistingUser } from '../../src/test-data/existing-user';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.logIn(getExistingUser());
});

test('a customer can transfer funds between their own accounts', async ({
  accounts: { source, target },
  transferFundsPage,
  accountsOverviewPage,
}) => {
  await transferFundsPage.goto();
  await transferFundsPage.transfer(TRANSFER_AMOUNT, source.id, target.id);

  await expect(transferFundsPage.confirmation).toContainText(
    `${toCurrency(TRANSFER_AMOUNT)} has been transferred from account #${source.id} to account #${target.id}.`,
  );

  await accountsOverviewPage.goto();

  await expect(accountsOverviewPage.balanceOf(source.id)).toHaveText(toCurrency(source.balance - TRANSFER_AMOUNT));
  await expect(accountsOverviewPage.balanceOf(target.id)).toHaveText(toCurrency(target.balance + TRANSFER_AMOUNT));
});

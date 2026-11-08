import { expect, test as base } from '@playwright/test';
import { ParaBankApi } from './api/parabank-api';
import { AccountDetailsPage } from './pages/account-details-page';
import { AccountsOverviewPage } from './pages/accounts-overview-page';
import { LoginPage } from './pages/login-page';
import { OpenAccountPage } from './pages/open-account-page';
import { RegisterPage } from './pages/register-page';
import { TransferFundsPage } from './pages/transfer-funds-page';
import type { Account } from './test-data/account';
import { getExistingUser } from './test-data/existing-user';

type Fixtures = {
  accountDetailsPage: AccountDetailsPage;
  accountsOverviewPage: AccountsOverviewPage;
  loginPage: LoginPage;
  openAccountPage: OpenAccountPage;
  registerPage: RegisterPage;
  transferFundsPage: TransferFundsPage;
  parabankApi: ParaBankApi;
  /**
   * The existing user's accounts with the highest and lowest balances. Moving money from source
   * to target evens the balances out, so repeated runs don't drain any one account.
   */
  accounts: { source: Account; target: Account };
};

export const test = base.extend<Fixtures>({
  accountDetailsPage: async ({ page }, use) => use(new AccountDetailsPage(page)),
  accountsOverviewPage: async ({ page }, use) => use(new AccountsOverviewPage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  openAccountPage: async ({ page }, use) => use(new OpenAccountPage(page)),
  registerPage: async ({ page }, use) => use(new RegisterPage(page)),
  transferFundsPage: async ({ page }, use) => use(new TransferFundsPage(page)),
  parabankApi: async ({ request }, use) => use(new ParaBankApi(request)),

  accounts: async ({ parabankApi }, use) => {
    const { username, password } = getExistingUser();
    const { id } = await parabankApi.login(username, password);
    const accounts = await parabankApi.getAccounts(id);
    expect(accounts.length, 'the existing user needs at least two accounts').toBeGreaterThanOrEqual(2);

    const byBalance = accounts.toSorted((a, b) => b.balance - a.balance);
    await use({ source: byBalance[0], target: byBalance[byBalance.length - 1] });
  },
});

export { expect };

import { test as setup, expect } from '../../src/fixtures';
import { getExistingUser } from '../../src/test-data/existing-user';

// ParaBank's public database is reset from time to time, which deletes the user. This step runs
// before the tests and registers the user again only when it's missing.
setup('the existing user is registered and has two accounts', async ({ parabankApi, registerPage }) => {
  const user = getExistingUser();

  if (!(await parabankApi.canLogIn(user.username, user.password))) {
    await registerPage.goto();
    await registerPage.register(user);
    await expect(
      registerPage.successMessage,
      `could not register ${user.username}; the username may have been taken by someone else`,
    ).toBeVisible();
  }

  const { id } = await parabankApi.login(user.username, user.password);
  const accounts = await parabankApi.getAccounts(id);
  if (accounts.length < 2) {
    await parabankApi.createAccount(id, 'CHECKING', accounts[0].id);
  }
});

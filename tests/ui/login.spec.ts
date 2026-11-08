import { test, expect } from '../../src/fixtures';
import { getExistingUser } from '../../src/test-data/existing-user';

test('an existing customer can log in and sees a welcome message', async ({
  parabankApi,
  loginPage,
  accountsOverviewPage,
}) => {
  const user = getExistingUser();
  const { firstName, lastName } = await parabankApi.login(user.username, user.password);

  await loginPage.goto();
  await loginPage.logIn(user);

  await expect(accountsOverviewPage.heading).toBeVisible();
  await expect(accountsOverviewPage.welcomeMessage).toHaveText(`Welcome ${firstName} ${lastName}`);
});

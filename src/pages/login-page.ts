import type { Locator, Page } from '@playwright/test';
import type { User } from '../test-data/existing-user';

export class LoginPage {
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly logInButton: Locator;

  constructor(private readonly page: Page) {
    this.username = page.locator('input[name="username"]');
    this.password = page.locator('input[name="password"]');
    this.logInButton = page.getByRole('button', { name: 'Log In' });
  }

  async goto(): Promise<void> {
    await this.page.goto('index.htm');
  }

  /** Logs in and waits for the Accounts Overview page, which ParaBank opens after a successful login. */
  async logIn({ username, password }: Pick<User, 'username' | 'password'>): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.logInButton.click();
    await this.page.waitForURL('**/overview.htm');
  }
}

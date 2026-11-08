import type { Locator, Page } from '@playwright/test';

export class AccountsOverviewPage {
  readonly heading: Locator;
  readonly welcomeMessage: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Accounts Overview' });
    this.welcomeMessage = page.locator('#leftPanel .smallText');
  }

  async goto(): Promise<void> {
    await this.page.goto('overview.htm');
  }

  balanceOf(accountId: number): Locator {
    const accountLink = this.page.getByRole('link', { name: String(accountId), exact: true });
    return this.page.getByRole('row').filter({ has: accountLink }).getByRole('cell').nth(1);
  }
}

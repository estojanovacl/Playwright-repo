import type { Locator, Page } from '@playwright/test';
import type { AccountType } from '../test-data/account';

export class OpenAccountPage {
  readonly confirmationHeading: Locator;
  readonly newAccountLink: Locator;
  private readonly accountType: Locator;
  private readonly fromAccount: Locator;
  private readonly openAccountButton: Locator;

  constructor(private readonly page: Page) {
    this.confirmationHeading = page.getByRole('heading', { name: 'Account Opened!' });
    this.newAccountLink = page.locator('#newAccountId');
    this.accountType = page.locator('#type');
    this.fromAccount = page.locator('#fromAccountId');
    this.openAccountButton = page.getByRole('button', { name: 'Open New Account' });
  }

  async goto(): Promise<void> {
    await this.page.goto('openaccount.htm');
  }

  async openAccount(type: AccountType, fromAccountId: number): Promise<void> {
    await this.accountType.selectOption({ label: type });
    await this.fromAccount.selectOption(String(fromAccountId));
    await this.openAccountButton.click();
  }
}

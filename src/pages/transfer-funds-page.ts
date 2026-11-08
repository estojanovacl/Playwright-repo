import type { Locator, Page } from '@playwright/test';

export class TransferFundsPage {
  readonly confirmation: Locator;
  private readonly amount: Locator;
  private readonly fromAccount: Locator;
  private readonly toAccount: Locator;
  private readonly transferButton: Locator;

  constructor(private readonly page: Page) {
    this.confirmation = page.locator('#showResult');
    this.amount = page.locator('#amount');
    this.fromAccount = page.locator('#fromAccountId');
    this.toAccount = page.locator('#toAccountId');
    this.transferButton = page.getByRole('button', { name: 'Transfer' });
  }

  async goto(): Promise<void> {
    await this.page.goto('transfer.htm');
  }

  async transfer(amount: number, fromAccountId: number, toAccountId: number): Promise<void> {
    await this.amount.fill(String(amount));
    await this.fromAccount.selectOption(String(fromAccountId));
    await this.toAccount.selectOption(String(toAccountId));
    await this.transferButton.click();
  }
}

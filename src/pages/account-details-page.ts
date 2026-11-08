import type { Locator, Page } from '@playwright/test';

export class AccountDetailsPage {
  readonly accountType: Locator;
  readonly balance: Locator;

  constructor(page: Page) {
    this.accountType = page.locator('#accountType');
    this.balance = page.locator('#balance');
  }
}

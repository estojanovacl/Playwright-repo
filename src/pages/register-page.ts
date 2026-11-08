import type { Locator, Page } from '@playwright/test';
import type { User } from '../test-data/existing-user';

export class RegisterPage {
  readonly successMessage: Locator;

  constructor(private readonly page: Page) {
    this.successMessage = page.getByText('Your account was created successfully. You are now logged in.');
  }

  async goto(): Promise<void> {
    await this.page.goto('register.htm');
  }

  async register(user: User): Promise<void> {
    await this.field('customer.firstName').fill(user.firstName);
    await this.field('customer.lastName').fill(user.lastName);
    await this.field('customer.address.street').fill(user.street);
    await this.field('customer.address.city').fill(user.city);
    await this.field('customer.address.state').fill(user.state);
    await this.field('customer.address.zipCode').fill(user.zipCode);
    await this.field('customer.phoneNumber').fill(user.phoneNumber);
    await this.field('customer.ssn').fill(user.ssn);
    await this.field('customer.username').fill(user.username);
    await this.field('customer.password').fill(user.password);
    await this.field('repeatedPassword').fill(user.password);
    await this.page.getByRole('button', { name: 'Register' }).click();
  }

  private field(id: string): Locator {
    return this.page.locator(`[id="${id}"]`);
  }
}

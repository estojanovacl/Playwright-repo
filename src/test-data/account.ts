export type AccountType = 'CHECKING' | 'SAVINGS';

export type Account = {
  id: number;
  customerId: number;
  type: AccountType;
  balance: number;
};

/** The amount ParaBank moves from the funding account when a new account is opened. */
export const OPENING_DEPOSIT = 100;

export const TRANSFER_AMOUNT = 25;

/** Formats an amount the way the UI displays it, e.g. 25 -> "$25.00" and -25 -> "-$25.00". */
export function toCurrency(amount: number): string {
  return `${amount < 0 ? '-' : ''}$${Math.abs(amount).toFixed(2)}`;
}

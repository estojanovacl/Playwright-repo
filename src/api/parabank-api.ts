import { expect, type APIRequestContext, type APIResponse } from '@playwright/test';
import type { Account, AccountType } from '../test-data/account';

const SERVICES_PATH = 'services/bank';
const JSON_HEADERS = { Accept: 'application/json' };
const ACCOUNT_TYPE_CODES: Record<AccountType, number> = { CHECKING: 0, SAVINGS: 1 };

export class ParaBankApi {
  constructor(private readonly request: APIRequestContext) {}

  async login(username: string, password: string): Promise<{ id: number; firstName: string; lastName: string }> {
    return this.parseOk(await this.requestLogin(username, password));
  }

  /** Returns false when ParaBank doesn't recognise the credentials, for example after its database was reset. */
  async canLogIn(username: string, password: string): Promise<boolean> {
    const response = await this.requestLogin(username, password);
    if (response.status() === 400) {
      return false;
    }
    await expect(response).toBeOK();
    return true;
  }

  async getAccount(accountId: number): Promise<Account> {
    const path = `${SERVICES_PATH}/accounts/${accountId}`;
    return this.parseOk(await this.request.get(path, { headers: JSON_HEADERS }));
  }

  async getAccounts(customerId: number): Promise<Account[]> {
    const path = `${SERVICES_PATH}/customers/${customerId}/accounts`;
    return this.parseOk(await this.request.get(path, { headers: JSON_HEADERS }));
  }

  /** The response reports a balance of 0 for the new account, so read the balance with getAccount. */
  async createAccount(customerId: number, type: AccountType, fromAccountId: number): Promise<Account> {
    const response = await this.request.post(`${SERVICES_PATH}/createAccount`, {
      headers: JSON_HEADERS,
      params: { customerId, newAccountType: ACCOUNT_TYPE_CODES[type], fromAccountId },
    });
    return this.parseOk(response);
  }

  /** Returns the confirmation message, which the service sends as plain text. */
  async transfer(fromAccountId: number, toAccountId: number, amount: number): Promise<string> {
    const response = await this.request.post(`${SERVICES_PATH}/transfer`, {
      headers: JSON_HEADERS,
      params: { fromAccountId, toAccountId, amount },
    });
    await expect(response).toBeOK();
    return response.text();
  }

  private requestLogin(username: string, password: string): Promise<APIResponse> {
    const path = `${SERVICES_PATH}/login/${encodeURIComponent(username)}/${encodeURIComponent(password)}`;
    return this.request.get(path, { headers: JSON_HEADERS });
  }

  private async parseOk<T>(response: APIResponse): Promise<T> {
    await expect(response).toBeOK();
    return response.json();
  }
}

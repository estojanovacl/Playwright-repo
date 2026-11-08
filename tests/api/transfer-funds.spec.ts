import { test, expect } from '../../src/fixtures';
import { TRANSFER_AMOUNT } from '../../src/test-data/account';

test('POST /transfer moves the amount between two accounts', async ({
  accounts: { source, target },
  parabankApi,
}) => {
  const message = await parabankApi.transfer(source.id, target.id, TRANSFER_AMOUNT);

  expect(message).toBe(`Successfully transferred $${TRANSFER_AMOUNT} from account #${source.id} to account #${target.id}`);

  const sourceAfter = await parabankApi.getAccount(source.id);
  const targetAfter = await parabankApi.getAccount(target.id);

  expect(sourceAfter.balance).toBeCloseTo(source.balance - TRANSFER_AMOUNT, 2);
  expect(targetAfter.balance).toBeCloseTo(target.balance + TRANSFER_AMOUNT, 2);
});

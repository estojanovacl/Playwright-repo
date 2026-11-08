# Test cases: Transfer Funds

**Feature:** moving money between the customer's own accounts (`transfer.htm`).

**Environment:** https://parabank.parasoft.com/parabank/

**Common precondition (TC-01 to TC-08):** the customer is logged in and has at least two accounts: account A with a balance of at least $100.00, and account B.

## Summary

| ID | Title | Priority | Type | Automated |
|---|---|---|---|---|
| TC-01 | Transfer a valid amount | High | Positive | Partly (`25` only) |
| TC-02 | Transfer the full balance of an account | Medium | Boundary | No |
| TC-03 | Transfer appears in the activity of both accounts | High | Positive | No |
| TC-04 | Account lists contain only the customer's accounts | High | Positive | No |
| TC-05 | Amount larger than the balance is rejected | High | Negative | No |
| TC-06 | Zero or negative amount is rejected | High | Negative | No |
| TC-07 | Transfer to the same account is rejected | Medium | Negative | No |
| TC-08 | Empty or non-numeric amount shows a validation message | Medium | Negative | No |
| TC-09 | Page can't be opened without logging in | High | Security | No |

## Positive cases

### TC-01: Transfer a valid amount
- **Test data:** from account A to account B, with each of these amounts:
  - `25` (whole amount)
  - `10.50` (amount with cents)
- **Steps:**
  1. Open **Accounts Overview** and note the balances of A and B.
  2. Open **Transfer Funds**.
  3. Enter the amount, and choose account A as "from" and account B as "to".
  4. Click **Transfer**.
  5. Open **Accounts Overview** again.
- **Expected:** "Transfer Complete! $&lt;amount&gt; has been transferred from account #A to account #B", with the amount shown with two decimals (for example $25.00 or $10.50). A's balance decreases and B's increases by the amount.

### TC-02: Transfer the full balance of an account
- **Precondition:** B has a balance greater than $0.00, for example after TC-01.
- **Test data:** amount equal to B's whole balance, from B to A
- **Steps:** as in TC-01, entering the balance of B noted in step 1 as the amount.
- **Expected:** the transfer succeeds, B's balance is $0.00, and A's increases by the same amount.

### TC-03: Transfer appears in the activity of both accounts
- **Precondition:** TC-01 has been done with the amount `25`.
- **Steps:**
  1. Open **Accounts Overview** and click account A.
  2. Look at the transaction list.
  3. Repeat for account B.
- **Expected:** A shows "Funds Transfer Sent" for $25.00 under today's date, and B shows "Funds Transfer Received" for $25.00.

### TC-04: Account lists contain only the customer's accounts
- **Steps:**
  1. Open **Transfer Funds**.
  2. Open the "from" list, then the "to" list.
  3. Compare them with the accounts on **Accounts Overview**.
- **Expected:** both lists show exactly the customer's accounts.

## Negative cases

### TC-05: Amount larger than the balance is rejected
- **Test data:** amount larger than A's balance, for example `99999`, from A to B
- **Steps:** as in TC-01.
- **Expected:** the transfer is refused with an "insufficient funds" message, and no balance changes.
- **Note:** the expected result is based on usual banking rules, because ParaBank has no written requirement about overdrafts.

### TC-06: Zero or negative amount is rejected
- **Test data:** from A to B, with each of these amounts:
  - `0`
  - `-25`
- **Steps:** as in TC-01.
- **Expected:** a validation message saying the amount must be greater than zero. No transfer is recorded, and no balance changes.

### TC-07: Transfer to the same account is rejected
- **Test data:** amount `10`, from A to A
- **Steps:** as in TC-01, but choose account A in both lists.
- **Expected:** a validation message saying the accounts must be different, or the same account can't be chosen in both lists.

### TC-08: Empty or non-numeric amount shows a validation message
- **Test data:** from A to B, with each of these amounts:
  - left empty
  - `abc`
- **Steps:** as in TC-01. For the empty case, leave the amount field empty.
- **Expected:**
  - Empty amount: "The amount cannot be empty."
  - `abc`: "Please enter a valid amount."

  In both cases the form stays on screen, and no balance changes.

### TC-09: Page can't be opened without logging in
- **Precondition:** the customer is **not** logged in.
- **Steps:** open https://parabank.parasoft.com/parabank/transfer.htm directly.
- **Expected:** the customer is sent to the login page, or sees a message asking them to log in.

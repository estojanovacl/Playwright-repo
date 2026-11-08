# Bug reports

## BUG-01: Transfer with a negative amount succeeds and moves money in the opposite direction

| Field | Value |
|---|---|
| ID | BUG-01 |
| Status | New |
| Severity | Critical |
| Priority | High |
| Feature | Transfer Funds (`transfer.htm`) |
| Environment | https://parabank.parasoft.com/parabank/, Chromium 158, Windows 11 |
| Reported by | Elena Stojanova |
| Date found | 7 November 2026 |
| Reproducibility | Always |
| Related test case | [TC-06](test-cases.md#tc-06-zero-or-negative-amount-is-rejected) |

**Preconditions:** a logged-in customer with two accounts. In the run below, account A was #39762 ($415.50) and account B was #39873 ($100.00).

**Steps to reproduce:**
1. Open **Transfer Funds**.
2. Enter `-25` in **Amount**.
3. Choose account A in **From account #** and account B in **to account #**.
4. Click **Transfer**.
5. Open **Accounts Overview**.

**Expected result:** the transfer is refused with a message such as "The amount must be greater than zero", and no balance changes.

**Actual result:** the page says "Transfer Complete! -$25.00 has been transferred from account #39762 to account #39873." The money moves the opposite way:

| Account | Before | After |
|---|---|---|
| A (#39762, the "from" account) | $415.50 | **$440.50** |
| B (#39873, the "to" account) | $100.00 | **$75.00** |

**Impact:** money moves in the opposite direction, and the "to" account can go negative if its balance is lower than the amount.

**Evidence:**

![Transfer Complete message showing -$25.00](images/bug-01-negative-amount.png)

---

## BUG-02: Empty or non-numeric amount shows an internal error instead of a validation message

| Field | Value |
|---|---|
| ID | BUG-02 |
| Status | New |
| Severity | Medium |
| Priority | Medium |
| Feature | Transfer Funds (`transfer.htm`) |
| Environment | https://parabank.parasoft.com/parabank/, Chromium 158, Windows 11 |
| Reported by | Elena Stojanova |
| Date found | 7 November 2026 |
| Reproducibility | Always |
| Related test case | [TC-08](test-cases.md#tc-08-empty-or-non-numeric-amount-shows-a-validation-message) |

**Preconditions:** a logged-in customer with two accounts.

**Steps to reproduce:**
1. Open **Transfer Funds**.
2. Leave **Amount** empty.
3. Choose two different accounts and click **Transfer**.
4. Open **Transfer Funds** again, enter `abc` in **Amount**, and click **Transfer**.

**Expected result:**
- After step 3: "The amount cannot be empty."
- After step 4: "Please enter a valid amount."

The form stays on screen so the customer can correct the amount.

**Actual result:** in both cases the form disappears, and the page shows "Error! An internal error has occurred and has been logged." No money is moved.

**Impact:** the customer isn't told what's wrong with the amount.

**Notes:** both expected messages already exist in the page's HTML, but they're never shown.

**Evidence:**

| Empty amount | Amount `abc` |
|---|---|
| ![Internal error after an empty amount](images/bug-02-empty-amount.png) | ![Internal error after a non-numeric amount](images/bug-02-text-amount.png) |

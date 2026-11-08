# ParaBank QA challenge

Manual and automated testing of [ParaBank](https://parabank.parasoft.com/parabank/), a demo online banking application. The submission contains test cases and bug reports for the Transfer Funds feature, and UI and API tests written in TypeScript with Playwright.

## Manual testing

- [Test cases for Transfer Funds](docs/test-cases.md): 9 test cases
- [Bug reports](docs/bug-reports.md): 2 bugs, with steps to reproduce and screenshots

## Automated tests

| Type | File | Scenario |
| ---- | ---- | -------- |
| UI | [tests/ui/login.spec.ts](tests/ui/login.spec.ts) | An existing customer logs in and sees a welcome message |
| UI | [tests/ui/open-account.spec.ts](tests/ui/open-account.spec.ts) | A customer opens a savings account, and the deposit moves from the funding account |
| UI | [tests/ui/transfer-funds.spec.ts](tests/ui/transfer-funds.spec.ts) | A customer transfers funds, and both balances update |
| API | [tests/api/transfer-funds.spec.ts](tests/api/transfer-funds.spec.ts) | `POST /transfer` moves the amount between two accounts |

## Running the tests

Requires Node.js 20.12 or later and access to the public ParaBank site. Choose any username and password for `.env`: if that user doesn't exist yet, the setup step registers it.

```bash
npm ci
npx playwright install chromium
cp .env.example .env   # then fill in the ParaBank username and password

npm test            # all tests
npm run test:ui     # UI tests only
npm run test:api    # API tests only
npm run report      # open the last HTML report
```

## Project structure

```
docs/
  test-cases.md   Manual test cases for Transfer Funds
  bug-reports.md  Bug reports
  images/         Screenshots for the bug reports
src/
  api/          REST API client
  pages/        Page Objects (Page Object Model): locators and actions, while tests hold the assertions
  test-data/    Existing user credentials, account types and amounts
  fixtures.ts   Page Objects, API client and the accounts under test, provided as Playwright fixtures
tests/
  setup/        Makes sure the user exists before the tests run
  ui/           End-to-end tests
  api/          API tests
```

## Design decisions

- **One user for all tests.** Credentials come from `.env` locally, or repository secrets in CI, so the tests don't add customers to the shared database.
- **Setup recreates the user after a reset.** ParaBank's public database is wiped from time to time. The setup step registers the user only if login fails, so a normal run adds nothing.
- **Balances stay intact.** Transfers go from the highest balance to the lowest, and the open-account test returns its deposit.
- **API for test data, UI for the behaviour under test.** Expected balances are calculated from the balances read before each action, not hardcoded.
- **Chromium only, one test at a time,** to limit the load on the shared public site.

## Known limitations

- **Username taken after a reset:** the setup step fails with "could not register". Choose another username in `.env`.
- **Cloudflare:** the site sometimes shows automated browsers a "Verify you are human" page, and the test then fails with a missing element. Re-run after a short wait.

# Property Financials

A compact, mobile-friendly property financial statement hosted on GitHub Pages. Needham is the first property; the application brand is independent of the property name.

## Run and test

Run `node scripts/serve.mjs` to serve `dist` on port 4173. Run `node --test` for financial and period-selection checks. GitHub Actions tests and deploys `dist` on main.

## Data and accounting

- The authorized Google Apps Script endpoint in `dist/config.js` refreshes spreadsheet records on load, on demand, and every five minutes while visible.
- Monthly and YTD views use the selected through-month; lifetime uses all available records. Availability is not a claim of complete property history.
- Rent collections are assigned to workbook months. Ending rent balances use the last period sheet, not a sum of monthly balance snapshots.
- Expense filters use recorded dates or service-period ending months, not inferred payment dates. Incomplete dates remain in a separate review section.
- Paid/unpaid source columns mix operating costs, capital costs, deposits, and possible owner reimbursements. They are not a verified profit-and-loss statement or payable total.
- All unpaid source entries stay visible regardless of period. Clear them in the workbook only after matching invoice, payer, and settlement/reimbursement evidence.
- `dist/review.js` contains explanations and dated review observations from November 12, 2026. Explanations apply only to matching source row/category/amounts. Private bank reconciliation remains local and is not published. Utility current balances require separate verification.
- Monthly budget assumptions stay separate from actual records. The displayed plan totals -$665.67; the original source net-loss cell differs by one cent.
- Mortgage funding is a transfer to the mortgage-paying account, not a second operating expense. Its amount/due date require confirmation; no payment is scheduled by this site.
- Appearance defaults to the operating-system preference, with Light/Dark/System overrides saved in this browser.

## Privacy and hosting

The existing site remains a public summary with no login. No bank credentials, full account numbers, tenant names/contact details, or receipt links are included. The source workbook remains private. The repository URL remains `jsun102/needham-dashboard` for link continuity; the displayed website name is Property Financials.

The Apps Script code is in `google-apps-script/`. It publishes selected financial fields only, using read-only spreadsheet access. Updating this website does not redeploy that script or alter source records.


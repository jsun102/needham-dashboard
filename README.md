# Needham financial dashboard

Responsive public dashboard for Needham property financials. Built with HTML, CSS, and JavaScript; no build dependencies.

## Run and verify

Run `node scripts/serve.mjs` and open http://127.0.0.1:4173. Run `node --test` to verify calculations and public data fields.

## Publish

In GitHub repository Settings → Pages, select **GitHub Actions** as the source. The included workflow tests and publishes `dist` on pushes to `main`.

## Automatic spreadsheet refresh

1. Create a Google Apps Script project using the Google account that can read the source workbook.
2. Paste `google-apps-script/Code.gs` into the script editor. Enable the manifest in Project Settings and copy `google-apps-script/appsscript.json` into the manifest to restrict spreadsheet access to read-only.
3. Deploy as a **Web app**, executing as yourself, with access set to **Anyone**. Review and authorize the spreadsheet read permission.
4. Put the deployed `/exec` URL in `dist/config.js` as `endpoint` and commit the change.

The page refreshes on load, manually, and every five minutes while visible. Until configured, it explicitly displays a saved snapshot rather than claiming live data. Failed refreshes keep the last loaded data and show an error. New tabs named `RentM.YYYY` are picked up automatically.

Only financial fields selected by the script are published. Names, emails, phone numbers, payment notes, transaction IDs, and receipt links are omitted. The workbook itself does not need to be made public. The public endpoint and repository contain public financial information; the site is not access-controlled. The noindex tag is a search-engine preference, not a privacy mechanism.

## Accounting boundaries

- Rent collections are assigned to the rent-sheet month, not the cash receipt date. Cash App Payments is not added again.
- Positive unit balances and negative credits are tracked separately. Paid-up units do not represent a verified occupancy rate.
- The standing monthly plan is separate from actual rent and does not change with the month filter.
- The displayed plan line items total **-$665.67**. The source's **-$665.66** net-loss cell differs by one cent.
- Expense entries are not summed into actual profit: the sheet includes acquisitions, deposits, undated items, and potentially overlapping paid/unpaid entries.
- Source layout changes may require updating the Apps Script mapping. The script fails closed when the known monthly plan cannot be identified.

The initial snapshot was read November 12, 2026. Source: NeedHamOperation.

// Reviewed explanations are applied only while the source row matches its reviewed fingerprint.
const notes={
 'Expenses:3':[610699.71,0,'Acquisition / closing','Property acquisition and closing','Acquisition cash outlay, not a recurring operating cost. Obtain the closing statement to split purchase price, fees, prepaid costs, and escrow.'],
 'Expenses:4':[0,2000,'Grounds / equipment','Lawnmower purchase','Equipment purchase. Owner confirms this is reimbursement owed to Michael, not an unpaid vendor bill. Match the receipt, reimburse once, and record the settlement. This is not monthly lawn service.'],
 'Expenses:5':[0,1040,'Utility / deposit','Utility setup / deposits — MUD and SUD','The description combines $700 + $340. These may overlap rows 12–13 and paid rows 38–39. Owner confirms reimbursement is owed to Michael. Match deposit receipts and resolve overlapping source entries before reimbursing once.'],
 'Expenses:6':[0,638,'Appliance','Refrigerator — Trailer 1','Appliance purchase for Trailer 1. Owner confirms reimbursement is owed to Michael. Match the receipt and record the reimbursement when settled.'],
 'Expenses:7':[450,0,'Uncategorized','Unexplained payment / possible reimbursement','The sheet has no description. Obtain the underlying invoice and payment record; identify whether this was an expense or reimbursement before including it in expense totals.'],
 'Expenses:8':[210,0,'Grounds / equipment','Lawn service — October','Recorded October 15 payment matches the $210 property-bank payment for lawn care. Operating maintenance; separate from the lawnmower purchase.'],
 'Expenses:9':[0,4138.04,'Insurance','Property insurance — owner reimbursement','Owner confirms this amount is owed to Michael. The paid entry in row 34 records the underlying insurance payment; the unpaid entry is an owner reimbursement, not a second insurance expense. Match the receipt and reimburse once.'],
 'Expenses:10':[0,35110,'Capital improvement','Trailer 6 purchase / improvement','Capital expenditure. Owner confirms reimbursement is owed to Michael. Match the purchase invoice and funding evidence before reimbursement. The reference in row 35 has no amount and does not establish owner settlement.'],
 'Expenses:11':[0,1500,'Engineering','InPipe engineering — owner reimbursement','Owner confirms reimbursement is owed to Michael. Match the $1,500 vendor payment in row 37 to this claim; reimburse once without counting a second engineering expense.'],
 'Expenses:12':[0,700,'Utility / deposit','Porter MUD setup / deposit','May overlap the combined $1,040 in row 5 and $700 paid in row 38. Owner reimbursement is owed to Michael. Match the receipt, distinguish deposit from fees, and eliminate overlapping reimbursement claims.'],
 'Expenses:13':[0,340,'Uncategorized','Unidentified $340 utility-related entry','No description. May be the $340 component in row 5 and paid row 39. Owner reimbursement is owed to Michael. Confirm provider and receipt, then eliminate overlapping claims before reimbursing.'],
 'Expenses:34':[4138.04,0,'Insurance','Property insurance — recorded payment','Corresponds to an unpaid entry in row 9. The unpaid entry is confirmed owed to Michael. Confirm coverage period; the reimbursement settles a liability and is not another insurance expense.'],
 'Expenses:37':[1500,0,'Engineering','InPipe engineering — recorded payment','Recorded October 8. Match to the $1,500 reimbursement owed to Michael in row 11 and identify the invoice or milestone.'],
 'Expenses:38':[700,0,'Utility / deposit','Porter MUD setup / deposit — recorded payment','The date lacks a year. Potential overlap with rows 5 and 12. Receipt needed to distinguish a refundable deposit from a service charge.'],
 'Expenses:39':[340,0,'Uncategorized','Unidentified $340 recorded payment','No complete date or description. Match receipt to rows 5 and 13 before assigning a provider or accounting treatment.'],
 'Expenses:42':[3000,0,'Engineering','Porter engineering / plan review','Recorded July 26. Verify invoice and scope; may be development-related rather than ordinary operating maintenance.'],
 'Utilities:3':[164.98,0,'Water / sewer','Porter MUD sewer + payment fee','Bank payment October 14: $163.03 sewer plus $1.95 payment fee. This is sewer, not proof of a separate Porter SUD water payment. Sheet service dates are September; paid date is October.'],
 'Utilities:4':[445.99,0,'Trash service','Ecowaste trash — source service-period entry','Source service period: September 9–October 31. Compare this $445.99 record with the $630.85 November bank payment and Ecowaste invoices. Do not add them as distinct costs without reconciling the coverage.']
};
export function explain(r){const n=notes[`${r.source}:${r.row}`];if(n&&r.paid===n[0]&&r.unpaid===n[1]&&r.category===n[2])return {title:n[3],detail:n[4]};return {title:r.category||'Unidentified item',detail:'This entry has not been individually reconciled, or the source changed since review. Check invoice, service period, payer, and payment evidence.'}}
export const reviewedPayments=[
 {date:'9/22/2026',category:'Lawn service',paid:240,unpaid:0,source:'Bank review',row:'Sep 22',title:'Lawn service — September',detail:'$240 posted September 22; purpose confirmed by owner. Not present in the expense sheet reviewed November 12. Add the supporting invoice and record the payment once.'},
 {date:'11/6/2026',category:'Trash service',paid:630.85,unpaid:0,source:'Bank review',row:'Nov 6',title:'Ecowaste / Live Oak Environmental — payment',detail:'$630.85 posted November 6; garbage-service purpose confirmed by owner, overriding the incorrect bank merchant label. Reconcile to the $445.99 source trash record and invoices; monthly rate and current balance remain unverified.'}
];
export const recurring=[
 ['Porter MUD · sewer','$0 due in portal on Nov 12; displayed due date Nov 16. Last matched bank payment: $163.03 + $1.95 fee on Oct 14.','Current at review. Autopay reported enrolled; next charge and schedule not independently verified.'],
 ['Ecowaste · garbage','$630.85 bank payment Nov 6. Sheet separately records $445.99 for Sep–Oct service.','Sign in to verify outstanding balance, invoices, billing cycle, and autopay. Avoid duplicate payment.'],
 ['Porter SUD · water','No separate payment identified in the reviewed property-bank records. Spreadsheet account lookup did not match.','Obtain current bill and exact account name. Balance, due date, and autopay are unverified.'],
 ['Mortgage funding','Budget: $3,260.92 per month. Planned funding: Chase •6741 to Global One •3942.','Confirm amount and lender due date. Proposed funding: 3 business days before due. No transfer scheduled.']
];



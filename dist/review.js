// Reviewed explanations are applied only while the source row matches its reviewed fingerprint.
const notes={
 'Expenses:3':[610699.71,0,'Acquisition / closing','Property acquisition and closing','Acquisition cash outlay, not a recurring operating cost. Obtain the closing statement to split purchase price, fees, prepaid costs, and escrow.'],
 'Expenses:4':[0,2000,'Grounds / equipment','Lawnmower purchase','Equipment purchase. The source shows an amount owed to an owner; verify who paid the vendor and whether reimbursement remains due. Do not treat this as monthly lawn service.'],
 'Expenses:5':[0,1040,'Utility / deposit','Utility setup / deposits — MUD and SUD','The description combines $700 + $340. These may overlap rows 12–13 and paid rows 38–39. Confirm deposit receipts and owner reimbursement before paying or clearing.'],
 'Expenses:6':[0,638,'Appliance','Refrigerator — Trailer 1','Appliance purchase for Trailer 1. Obtain receipt and confirm whether this is a vendor balance or owner reimbursement.'],
 'Expenses:7':[450,0,'Uncategorized','Unexplained payment / possible reimbursement','The sheet has no description. Obtain the payment record and underlying invoice. Determine whether this is an operating expense, transfer, or reimbursement before including it in expense totals.'],
 'Expenses:8':[210,0,'Grounds / equipment','Lawn service — October','The source identifies this as October 15 lawnmowing. Operating maintenance; separate from the lawnmower purchase. Verify against a payment receipt.'],
 'Expenses:9':[0,4138.04,'Insurance','Property insurance — unpaid source entry','Same date and amount appear as paid in row 34. Verify whether the insurer was paid and an owner is still owed reimbursement. Do not pay the insurer twice.'],
 'Expenses:10':[0,35110,'Capital improvement','Trailer 6 purchase / improvement','Capital expenditure. Verify purchase invoice, payment status, and any owner funding. The reference in row 35 has no payment amount and does not establish settlement.'],
 'Expenses:11':[0,1500,'Engineering','InPipe engineering — unpaid source entry','A $1,500 paid entry appears in row 37. Match invoice and payer; determine whether a separate owner reimbursement remains due.'],
 'Expenses:12':[0,700,'Utility / deposit','Porter MUD setup / deposit','May overlap the combined $1,040 in row 5 and $700 paid in row 38. Match the receipt and distinguish refundable deposit from fees.'],
 'Expenses:13':[0,340,'Uncategorized','Unidentified $340 utility-related entry','No description. May be the $340 component in row 5 and paid row 39. Confirm the provider, receipt, and payment purpose.'],
 'Expenses:34':[4138.04,0,'Insurance','Property insurance — recorded payment','Corresponds to an unpaid entry in row 9. Confirm coverage period and payer; do not count both entries as separate insurance costs.'],
 'Expenses:37':[1500,0,'Engineering','InPipe engineering — recorded payment','Recorded October 8. Match to the unpaid $1,500 in row 11 and identify the invoice or milestone.'],
 'Expenses:38':[700,0,'Utility / deposit','Porter MUD setup / deposit — recorded payment','The date lacks a year. Potential overlap with rows 5 and 12. Receipt needed to distinguish a refundable deposit from a service charge.'],
 'Expenses:39':[340,0,'Uncategorized','Unidentified $340 recorded payment','No complete date or description. Match receipt to rows 5 and 13 before assigning a provider or accounting treatment.'],
 'Expenses:42':[3000,0,'Engineering','Porter engineering / plan review','Recorded July 26. Verify invoice and scope; may be development-related rather than ordinary operating maintenance.'],
 'Utilities:3':[164.98,0,'Water / sewer','Utility service — provider / fees to verify','The source labels this Water/Sewer, with September service dates and an October paid date. Confirm which provider billed it and whether payment fees are included. Track water and sewer separately.'],
 'Utilities:4':[445.99,0,'Trash service','Ecowaste trash — source service-period entry','Source service period: September 9–October 31. Match the invoice and payment receipt, and separate recurring service from delivery or other one-time charges.']
};
export function explain(r){const n=notes[`${r.source}:${r.row}`];if(n&&r.paid===n[0]&&r.unpaid===n[1]&&r.category===n[2])return {title:n[3],detail:n[4]};return {title:r.category||'Unidentified item',detail:'This entry has not been individually reconciled, or the source changed since review. Check invoice, service period, payer, and payment evidence.'}}
export const reviewedPayments=[];
export const recurring=[
 ['Porter MUD · sewer','Source workbook contains utility setup/deposit and service entries.','Confirm latest statement, amount due, payment receipt, and autopay. Keep deposits separate from recurring service.'],
 ['Ecowaste · garbage','Workbook records $445.99 for Sep–Oct service; setup note says $100 delivery + $150 monthly.','Confirm current rate and invoice coverage. Do not treat delivery fees as recurring monthly costs.'],
 ['Porter SUD · water','Water needs a separate recurring line from sewer.','Obtain current bill and exact account name. Verify balance, due date, and autopay.'],
 ['Mortgage funding','Standing workbook budget: $3,260.92 per month.','Confirm amount and lender due date. Proposed funding: 3 business days before due. No transfer scheduled.']
];

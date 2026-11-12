// Deploy as a web app: execute as yourself; audience Anyone.
// Only explicitly selected financial fields leave this script. Never return raw rows.
const SPREADSHEET_ID = '1tIfNxvYqqs657UYD9ZJziAC7vIya1pSDt4cghci9HE4';
function amount(value) {
  if (value === '' || value === null || value === undefined) return 0;
  const n = Number(String(value).replace(/[$,]/g, ''));
  if (!Number.isFinite(n)) throw new Error('Invalid financial amount');
  return n;
}
function category(description) {
  const s=String(description || '');
  if (/closing/i.test(s)) return 'Acquisition / closing';
  if (/insurance/i.test(s)) return 'Insurance';
  if (/engineer/i.test(s)) return 'Engineering';
  if (/refrig/i.test(s)) return 'Appliance';
  if (/lawn/i.test(s)) return 'Grounds / equipment';
  if (/trailer/i.test(s)) return 'Capital improvement';
  if (/mud|sud/i.test(s)) return 'Utility / deposit';
  return 'Uncategorized';
}
function publicData() {
  const properties=Sheets.Spreadsheets.get(SPREADSHEET_ID,{fields:'sheets.properties'}).sheets.map(s=>s.properties);
  const selected=properties.filter(s=>/^Rent\d{1,2}\.\d{4}$/.test(s.title)||['Expenses','Utility Expenses'].includes(s.title));
  const ranges=selected.map(s=>"'"+s.title+"'!A1:J"+s.gridProperties.rowCount);
  const result=Sheets.Spreadsheets.Values.batchGet(SPREADSHEET_ID,{ranges:ranges,valueRenderOption:'FORMATTED_VALUE'}).valueRanges;
  const sheets=selected.map((s,i)=>({getName:()=>s.title,getDataRange:()=>({getDisplayValues:()=>result[i].values||[]})}));
  const book={getSheets:()=>sheets,getSheetByName:name=>sheets.find(s=>s.getName()===name)};
  const months=book.getSheets().filter(s=>/^Rent\d{1,2}\.\d{4}$/.test(s.getName())).map(sheet=>{
    const match=sheet.getName().match(/^Rent(\d{1,2})\.(\d{4})$/);
    const rows=sheet.getDataRange().getDisplayValues();
    return {key:match[2]+'-'+match[1].padStart(2,'0'),units:rows.filter(r=>/^\d{4,6}$/.test(r[1])).map(r=>({address:r[1],unit:/^Main House$/i.test(r[2])?'Main House':/^Trailer\s+\d+$/i.test(r[2])?r[2]:'Unit '+r[1],rent:amount(r[5]),paid:amount(r[6]),balance:amount(r[7])}))};
  }).sort((a,b)=>a.key.localeCompare(b.key));
  const rows=book.getSheetByName('Expenses').getDataRange().getDisplayValues();
  const planStart=rows.findIndex(r=>String(r[3]).trim().toLowerCase()==='rent income');
  if(planStart<0) throw new Error('Monthly planning section not found');
  const expenses=rows.slice(2,planStart).map((r,i)=>({date:/^[\d/ -]+$/.test(r[1])?r[1]:'',category:category(r[2]),paid:amount(r[4]),unpaid:amount(r[5]),source:'Expenses',row:i+3})).filter(r=>r.paid||r.unpaid);
  const utility=book.getSheetByName('Utility Expenses').getDataRange().getDisplayValues();
  utility.slice(2).forEach((r,i)=>{if(amount(r[3]))expenses.push({date:/^[a-zA-Z\d/ ,–-]+$/.test(r[1])?r[1]:'',category:/trash/i.test(r[2])?'Trash service':'Water / sewer',paid:amount(r[3]),unpaid:0,source:'Utilities',row:i+3})});
  const labels={'rent income':'Rent income','mortgage':'Mortgage','insurance':'Insurance','tax':'Tax','utility':'Utility','maintenance':'Maintenance','loan 250k@7%':'Additional loan payment'};
  const budget=rows.slice(planStart,planStart+10).filter(r=>labels[String(r[3]).trim().toLowerCase()]).map(r=>({label:labels[String(r[3]).trim().toLowerCase()],amount:amount(r[4])}));
  if(budget.length!==7) throw new Error('Monthly plan layout changed; review required');
  return {asOf:Utilities.formatDate(new Date(),'America/Chicago','MMMM d, yyyy HH:mm'),months,expenses,budget};
}
function doGet() {
  try {return ContentService.createTextOutput(JSON.stringify(publicData())).setMimeType(ContentService.MimeType.JSON);}
  catch (e) {return ContentService.createTextOutput(JSON.stringify({error:'Source data requires review. Refresh could not complete.'})).setMimeType(ContentService.MimeType.JSON);}
}

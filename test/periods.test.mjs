import test from 'node:test';
import assert from 'node:assert/strict';
import {periodMonths,aggregateUnits,expenseMonth,inPeriod} from '../dist/periods.js';
import {explain} from '../dist/review.js';
const months=['2025-12','2026-01','2026-02','2026-03'].map((key,i)=>({key,units:[{unit:'A',address:'1',rent:100,paid:i===2?120:100,balance:i===1?20:i===2?-20:0}]}));
test('YTD excludes prior year and future months; lifetime includes available history',()=>{assert.deepEqual(periodMonths(months,'ytd','2026-02').map(m=>m.key),['2026-01','2026-02']);assert.equal(periodMonths(months,'month','2026-02').length,1);assert.equal(periodMonths(months,'lifetime','2026-02').length,4)});
test('Period collections sum but balances are ending snapshots',()=>{const [u]=aggregateUnits(periodMonths(months,'ytd','2026-02'));assert.equal(u.rent,200);assert.equal(u.paid,220);assert.equal(u.balance,-20)});
test('Ambiguous dates excluded; service periods use ending month',()=>{assert.equal(expenseMonth('9/9/'),null);assert.equal(expenseMonth(''),null);assert.equal(expenseMonth('9/8/26-9/15/2026'),'2026-09');assert.equal(expenseMonth('Sep 9 – Oct 31, 2026'),'2026-10');assert.equal(inPeriod('2025-11','ytd','2026-11'),false);assert.equal(inPeriod(null,'lifetime','2026-11'),false)});
test('Changed source amounts invalidate reviewed explanations',()=>{assert.match(explain({source:'Expenses',row:9,paid:0,unpaid:4138.04,category:'Insurance'}).detail,/row 34/);assert.match(explain({source:'Expenses',row:9,paid:0,unpaid:5000,category:'Insurance'}).detail,/source changed/)});

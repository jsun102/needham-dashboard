import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {metrics,sum,validate} from '../dist/finance.js';
const data=JSON.parse(await readFile(new URL('../dist/data.json',import.meta.url)));
test('November matches source rent totals',()=>{assert.equal(metrics(data.months[2]).collected,7371);assert.equal(metrics(data.months[2]).outstanding,0);assert.equal(metrics(data.months[2]).settled,6)});
test('October credits are distinct from outstanding debt',()=>{const m=metrics(data.months[1]);assert.equal(m.scheduled,7095);assert.equal(m.credits,276);assert.equal(m.outstanding,0);assert.ok(m.rate>1)});
test('Monthly debt-service plan reconciles',()=>assert.equal(sum(data.budget,'amount'),-665.67));
test('No revenue does not divide by zero',()=>assert.equal(metrics({units:[]}).rate,null));
test('Rejects malformed source feed',()=>{assert.throws(()=>validate({}));assert.throws(()=>validate({...data,months:[{key:'2026-11',units:[{unit:'A',rent:'oops'}]}]}));assert.equal(validate(data),data)});
test('Public records use only allowed fields',()=>{for(const m of data.months)for(const u of m.units)assert.deepEqual(Object.keys(u).sort(),['address','balance','paid','rent','unit']);for(const e of data.expenses)assert.deepEqual(Object.keys(e).sort(),['category','date','paid','row','source','unpaid']);assert.ok(!JSON.stringify(data).includes('@'))});

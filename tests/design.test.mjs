import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const sources=JSON.parse(await readFile(new URL('sources.json',root),'utf8'));
test('four spread-out TECs fit their water blocks and enlarged plate',()=>{
 const d=sources.design,halfTEC=20,halfBlockLength=60,halfBlockWidth=20;
 assert.equal(sources.parts.find(p=>p.part==='TEC2-25408').quantity,4);
 for(const x of d.tec_centers_mm)for(const z of d.tec_centers_mm){
  assert.ok(Math.abs(x)+halfTEC<=d.plate_mm[0]/2);
  assert.ok(Math.abs(z)+halfTEC<=d.plate_mm[1]/2);
  assert.ok(Math.abs(x)+halfTEC<=halfBlockLength);
  assert.ok(d.water_block_row_centers_mm.some(row=>Math.abs(z-row)+halfTEC<=halfBlockWidth));
 }
 assert.equal(halfBlockLength-Math.max(...d.tec_centers_mm)-halfTEC,2);
});
test('larger hood and gasket fit the plate and custom housing',()=>{
 const d=sources.design;
 assert.ok(d.clear_floor_mm[0]<d.hood_mm[0]);
 assert.ok(d.hood_mm[0]<d.plate_mm[0]);assert.ok(d.plate_mm[0]<d.housing_mm[0]-8);
 assert.equal(d.plate_mm[2],6);
 const area=d.clear_floor_mm.reduce((a,b)=>a*b),oldArea=d.previous_clear_floor_mm.reduce((a,b)=>a*b);
 assert.ok(Math.abs(area/oldArea-3.44898)<0.00001);
});
test('published radiator and fans are represented consistently',()=>{
 assert.deepEqual(sources.parts.find(p=>p.part==='Syscooling AS240').body_mm,[269,120,36]);
 const fans=sources.parts.find(p=>p.part.includes('ARCTIC'));assert.equal(fans.quantity,2);assert.ok(fans.body_mm[0]*2<=269);
});
test('local browser module imports resolve without network dependencies',async()=>{
 for(const file of ['app.js','vendor/OrbitControls.js','vendor/three.module.js']){const text=await readFile(new URL(file,root),'utf8');for(const m of text.matchAll(/from\s+['"]([^'"]+)['"]/g)){if(m[1]==='three')continue;if(m[1].startsWith('.'))await readFile(new URL(m[1],new URL(file,root)));}}
});

test('perimeter reservoir leaves the center of the roof unobstructed',()=>{
 const f=sources.design.felt;
 assert.equal(f.quantity_each*2,4);
 assert.equal(sources.design.hood_mm[0]-2*3-2*f.strip_long_mm[2],128);
 assert.deepEqual(f.clear_top_aperture_mm,[128,128]);
 assert.equal(f.strip_short_mm[0],128);
});

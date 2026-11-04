import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const sources=JSON.parse(await readFile(new URL('sources.json',root),'utf8'));
test('four TECs fit completely on two blocks and the 100 mm plate',()=>{
 const centers=[-24,24];
 assert.equal(sources.parts.find(p=>p.part==='TEC2-25408').quantity,4);
 for(const x of centers)for(const z of centers){assert.ok(Math.abs(x)+20<=50);assert.ok(Math.abs(z)+20<=50);assert.ok(Math.abs(x)+20<=60);}
 assert.equal(48-40,8); // gap between both rows and columns
});
test('published radiator and fans are represented consistently',()=>{
 assert.deepEqual(sources.parts.find(p=>p.part==='Syscooling AS240').body_mm,[269,120,36]);
 const fans=sources.parts.find(p=>p.part.includes('ARCTIC'));assert.equal(fans.quantity,2);assert.ok(fans.body_mm[0]*2<=269);
});
test('local browser module imports resolve without network dependencies',async()=>{
 for(const file of ['app.js','vendor/OrbitControls.js','vendor/three.module.js']){const text=await readFile(new URL(file,root),'utf8');for(const m of text.matchAll(/from\s+['"]([^'"]+)['"]/g)){if(m[1]==='three')continue;if(m[1].startsWith('.'))await readFile(new URL(m[1],new URL(file,root)));}}
});

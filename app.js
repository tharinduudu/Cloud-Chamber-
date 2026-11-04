import * as THREE from 'three';
import {OrbitControls} from './vendor/OrbitControls.js';
const $=id=>document.getElementById(id);
const parts=[
 ['housing','Custom acrylic housing','200 × 200 × 260 mm overall; 4 mm panels. Vented outer housing only. Glass contains the alcohol vapor. Panel cut list is in Design.','Custom fabrication',''],
 ['cooler','2 × aluminum water blocks','CLYXGS 40 × 120 × 12 mm class; two blocks, each beneath two TECs. ABRA HS-WCB-40X120 documents this envelope and 10 mm barbs. Clamping and port geometry must match the purchased variant.','Supplier-sized body; fittings approximate','CLYXGS water cooling block 40 120 12'],
 ['tec','4 × TEC2-25408 Peltier modules','Four two-stage modules in a 2 × 2 array, 76 mm center spacing. Each nominally 40 × 40 × 6.4 mm. All cold faces point upward. Match thicknesses and qualify each module under load.','Amazon stock not verified','TEC2-25408 two stage peltier'],
 ['insulation','Thermal insulation','Closed-cell foam surrounds the TEC and covers the unused underside of the plate. Keep it outside the vapor chamber.','Cut to fit','closed cell foam insulation sheet'],
 ['plate','Copper cold plate','150 × 150 × 6 mm. The four TEC centers are at (±38, ±38) mm. Thin, IPA-compatible dark finish on top; no thick insulating layer. Contact probes sit near the center and at the hot interface.','Off the shelf','copper plate 150mm 150mm 6mm'],
 ['gasket','Chamber gasket','Thin PTFE gasket, 140 mm square outside, 130 mm square opening. Glass hood rests on it. Vapor-limiting seal, not a pressurized vessel.','Cut to fit','PTFE sheet 0.5mm'],
 ['glass','Glass vapor hood','140 × 140 × 90 mm outside; nominal 3 mm walls, open bottom. Fabricator must qualify joints for 99% IPA and temperature cycling. Removable for cleaning and filling.','Custom glass fabrication',''],
 ['felt','Alcohol reservoir','Four mechanically retained polyester felt strips along the upper inner glass walls; the center of the glass roof stays clear for viewing from above. Use enough 99% IPA to wet the strips without dripping; start with about 5 mL. No acrylic or exposed electrical heater inside.','Cut to fit','polyester felt sheet'],
 ['light','External side illumination','Small LED flashlight illuminates the thin region above the plate. All power connections stay outside the vapor hood.','Off the shelf','small LED flashlight'],
 ['radiator','Syscooling AS240 radiator','Manufacturer: 269 × 120 × 36 mm, aluminum, G1/4 ports, two 120 mm fans per side. Shown externally so intake and exhaust are unobstructed. Fins and port locations are visual approximations.','Manufacturer-sized envelope','Syscooling AS240 aluminum radiator'],
 ['fans','2 × ARCTIC P12 PWM PST','ARCTIC ACFAN00120A: 120 × 120 × 25 mm each. Two fans on the radiator. Blade and hub profiles are illustrative; mounting envelope follows the manufacturer.','Manufacturer-sized envelope','ARCTIC P12 PWM PST ACFAN00120A'],
 ['pump','Syscooling SC-300T pump / reservoir','Retail variant envelope: 66 × 56 × 86 mm excluding fittings and base; published variants differ. Approx. 150 mL tank. 12 V. 300 L/h is free flow, not installed flow. Confirm the specific seller drawing.','Variant dimensions; confirm before purchase','Syscooling SC-300T 12V pump reservoir'],
 ['tubing','Coolant tubing and fittings','One series loop: pump → block A → block B → radiator → reservoir. Nominal 10 mm OD block barbs need matched hose, clamps and radiator/pump adapters. Tube route and bend radii are illustrative. Use aluminum-compatible inhibited coolant, never IPA.','Match actual barb sizes','10mm ID coolant tubing hose clamps'],
 ['power','4 × adjustable current-limited supplies','One current-limited channel per TEC; Jesverty SPS-3010 class is a sourcing candidate. Around 8 V / 4 A per module is a tuning reference, not a guaranteed operating point. Separate rated 12 V pump/fan supply. Readouts and supplies are outside this geometry.','Off the shelf; individual TEC tuning','Jesverty SPS-3010 DC power supply'],
 ['probe','Temperature measurement','Dual K-type contact thermometer rated below −40 °C. Probe attachment and readout are not shown in the concept geometry.','Off the shelf','dual K type thermometer'],
];
const steps=[
 ['1 · Prepare the housing','Cut and deburr the acrylic panels. Add tube exits and a rigid, coplanar two-block support after measuring the purchased parts.','Keep the external radiator intake and exhaust clear. Panel sizes omit tube exits and mounting details.',['housing']],
 ['2 · Plumb the water loop','Mount the two 40 × 120 mm blocks, external AS240 radiator, two P12 fans and SC-300T pump. Route pump → block A → block B → radiator → reservoir.','Fill with aluminum-compatible inhibited coolant. Leak-test with only the pump powered. Confirm installed flow; never run the pump dry.',['housing','cooler','radiator','fans','pump','tubing']],
 ['3 · Place four Peltier modules','Add thin thermal paste and four matched TEC2-25408 modules, two on each block, all cold faces upward. Add insulation around the array.','Check all four polarities, matched stack heights and full ceramic support. Use individual current-limited channels.',['housing','cooler','radiator','fans','pump','tubing','tec','insulation']],
 ['4 · Seat the cold plate','Add a thin paste film, center the copper plate and fit even spring clamps. Clamping hardware is not yet detailed in this model.','Avoid bending the ceramic or making metal heat bridges. Validate the dry cooling stack before introducing alcohol.',['housing','cooler','radiator','fans','pump','tubing','tec','insulation','plate']],
 ['5 · Fit the chamber seal','Place the thin PTFE perimeter gasket. Keep the central dark floor exposed. The hood must lift off without disturbing the TEC.','Check seating, material compatibility and that the plate supports the complete glass rim.',['housing','cooler','radiator','fans','pump','tubing','tec','insulation','plate','gasket']],
 ['6 · Add the glass hood','Mechanically retain four 15 mm tall felt strips along the upper inner glass walls, leaving the roof center clear and place the hood on its gasket. Acrylic remains outside the alcohol volume.','Qualify glass joints, felt retention and a stable removable fit. Keep power off while adding IPA.',['housing','cooler','radiator','fans','pump','tubing','tec','insulation','plate','gasket','glass','felt']],
 ['7 · Illuminate and qualify','Fit the external light. Measure the hot face and active floor while tuning TEC input. Once qualified, add IPA with power off, replace the hood and allow the gradient to settle.','Require a stable active floor below −25 °C for 15 minutes with alcohol present. Use ventilation and keep alcohol away from sparks and flames.',['housing','cooler','radiator','fans','pump','tubing','tec','insulation','plate','gasket','glass','felt','light']],
];
let selectedTab='inspect',step=0,explosion=0,shellVisible=true,paused=false;
const bom=$('bom');
for(const p of parts){const row=document.createElement('div');row.className='part';const name=document.createElement('strong');name.textContent=p[1];const desc=document.createElement('p');desc.textContent=p[3];row.append(name,desc);if(p[4]){const a=document.createElement('a');a.href='https://www.amazon.com/s?k='+encodeURIComponent(p[4]);a.target='_blank';a.rel='noreferrer';a.textContent='Search Amazon ↗';row.append(a);}bom.append(row);}
function select(id){const p=parts.find(p=>p[0]===id);if(!p)return;$('partName').textContent=p[1];$('partText').textContent=p[2];if(selectedTab!=='inspect')tab('inspect');}
function tab(name){selectedTab=name;document.querySelectorAll('.panel').forEach(p=>p.hidden=p.id!==name);document.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab===name));visibility();}
document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>tab(b.dataset.tab));
function setStep(n){step=Math.max(0,Math.min(6,n));const s=steps[step];$('stepTitle').textContent=s[0];$('stepBody').textContent=s[1];$('stepCheck').textContent=s[2];$('stepCount').textContent=`${step+1} / 7`;$('stepSlider').value=step;$('prev').disabled=step===0;$('next').disabled=step===6;visibility();}
$('prev').onclick=()=>setStep(step-1);$('next').onclick=()=>setStep(step+1);$('stepSlider').oninput=e=>setStep(+e.target.value);$('all').onclick=()=>{setStep(6);tab('inspect');};
const container=$('scene');let renderer;
try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});}catch(e){$('fallback').hidden=false;}
const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(38,1,1,3000),model=new THREE.Group();scene.add(model);
const groups={};const moving=[];let controls;
function group(id,level){const g=new THREE.Group();g.userData.part=id;g.userData.level=level;groups[id]=g;model.add(g);moving.push(g);return g;}
const metal=new THREE.MeshStandardMaterial({color:0x8499a7,metalness:.72,roughness:.35});
const dark=new THREE.MeshStandardMaterial({color:0x162126,roughness:.8});
const copper=new THREE.MeshStandardMaterial({color:0xc9814d,metalness:.65,roughness:.35});
const clear=new THREE.MeshPhysicalMaterial({color:0x95cdd7,transparent:true,opacity:.11,roughness:.1,depthWrite:false,side:THREE.DoubleSide});
const glassMat=new THREE.MeshPhysicalMaterial({color:0x8dd7d0,transparent:true,opacity:.13,roughness:.08,depthWrite:false,side:THREE.DoubleSide});
function box(g,w,h,d,x,y,z,mat){const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);mesh.position.set(x,y,z);g.add(mesh);return mesh;}
function edges(mesh,color=0x63828b){const e=new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry),new THREE.LineBasicMaterial({color,transparent:true,opacity:.45}));mesh.add(e);}
function rod(g,r,h,x,y,z,mat){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,16),mat);m.position.set(x,y,z);g.add(m);return m;}
const housing=group('housing',0);
box(housing,192,4,192,0,30,0,dark);
// Lower sides are split to expose broad airflow openings.
for(const x of [-98,98]){edges(box(housing,4,90,192,x,245,0,clear));for(const z of [-89,89])edges(box(housing,4,166,14,x,117,z,clear));}
for(const z of [-98,98]){edges(box(housing,200,90,4,0,245,z,clear));for(const x of [-92,92])edges(box(housing,16,166,4,x,117,z,clear));}
for(const x of [-85,85])for(const z of [-85,85])rod(housing,8,14,x,21,z,dark);
const cooler=group('cooler',0);
// Illustrative cradle supports the blocks from below; no holes in water channels.
for(const z of [-38,38]){box(cooler,120,3,40,0,166.5,z,dark);for(const x of [-52,52])rod(cooler,4,133,x,98.5,z,metal);}
// Two supplier-sized aluminum blocks, long axis x; two TECs per block.
for(const z of [-38,38]){box(cooler,120,12,40,0,174,z,metal);for(const dz of [-10,10]){const barb=rod(cooler,5,18,-69,174,z+dz,metal);barb.rotation.z=Math.PI/2;for(const x of [-75,-70,-65]){const rib=rod(cooler,5.5,1.5,x,174,z+dz,metal);rib.rotation.z=Math.PI/2;}}}
const radiator=group('radiator',0);for(const y of [37.5,291.5])box(radiator,120,15,36,205,y,0,dark);for(const x of [148,262])box(radiator,6,239,36,x,164.5,0,dark);
for(let y=48;y<282;y+=3)box(radiator,110,.65,34,205,y,0,metal);
for(const x of [175,235]){const port=rod(radiator,7,15,x,291,0,metal);}
const fans=group('fans',0),rotors=[];const bladeMat=new THREE.MeshStandardMaterial({color:0x35434b,roughness:.6});
for(const y of [104,224]){const fan=new THREE.Group();fan.position.set(205,y,30.5);fans.add(fan);
for(const x of [-57,57])box(fan,6,120,25,x,0,0,dark);for(const dy of [-57,57])box(fan,120,6,25,0,dy,0,dark);
const rotor=new THREE.Group();fan.add(rotor);rotors.push(rotor);const hub=new THREE.Mesh(new THREE.CylinderGeometry(17,17,13,32),dark);hub.rotation.x=Math.PI/2;rotor.add(hub);
for(let i=0;i<5;i++){const shape=new THREE.Shape();shape.moveTo(9,12);shape.quadraticCurveTo(54,15,49,40);shape.quadraticCurveTo(24,53,9,12);const blade=new THREE.Mesh(new THREE.ShapeGeometry(shape),bladeMat);blade.rotation.z=i*Math.PI*2/5;rotor.add(blade);}
for(const x of [-52.5,52.5])for(const dy of [-52.5,52.5]){const screw=new THREE.Mesh(new THREE.CylinderGeometry(3,3,3,12),metal);screw.rotation.x=Math.PI/2;screw.position.set(x,dy,14);fan.add(screw);}}
const pump=group('pump',0);box(pump,66,24,56,-135,45,0,dark);box(pump,66,62,56,-135,88,0,clear);box(pump,57,34,47,-135,74,0,new THREE.MeshStandardMaterial({color:0x4c9fbd,transparent:true,opacity:.45}));rod(pump,8,5,-135,121,0,dark);
const tubing=group('tubing',0);
function hose(points){const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));tubing.add(new THREE.Mesh(new THREE.TubeGeometry(curve,80,6.5,12,false),new THREE.MeshPhysicalMaterial({color:0x67b7ce,transparent:true,opacity:.55,roughness:.25})));}
hose([[-102,58,0],[-89,75,-45],[-95,145,-45],[-78,174,-48]]);
hose([[-78,174,-28],[-104,174,-28],[-104,174,28],[-78,174,28]]);
hose([[-78,174,48],[-110,152,72],[105,120,100],[270,220,78],[235,305,0]]);
hose([[175,305,0],[120,318,-65],[-145,240,-65],[-170,120,-45],[-168,70,0]]);
const tec=group('tec',1);const ceramic=new THREE.MeshStandardMaterial({color:0xdee8e7,roughness:.5});
for(const x of [-38,38])for(const z of [-38,38]){box(tec,40,2,40,x,181,z,ceramic);box(tec,37,2.4,37,x,183.2,z,dark);box(tec,40,2,40,x,185.4,z,ceramic);
for(const offset of [-1,1]){const points=[new THREE.Vector3(x+18,183,z+offset*3),new THREE.Vector3(x+20,183,z+offset*3),new THREE.Vector3(x+20,146,z+offset*3)];tec.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color:offset<0?0xc46e65:0x171e23})));}}
const ins=group('insulation',1);box(ins,36,6.4,150,0,183.2,0,dark);box(ins,150,6.4,36,0,183.2,0,dark);for(const x of [-66.5,66.5])box(ins,17,6.4,150,x,183.2,0,dark);for(const z of [-66.5,66.5])box(ins,116,6.4,17,0,183.2,z,dark);
const plate=group('plate',2);box(plate,150,6,150,0,189.4,0,copper);box(plate,150,.1,150,0,192.45,0,new THREE.MeshStandardMaterial({color:0x080f13,roughness:.95}));
const gasket=group('gasket',3);for(const x of [-67.5,67.5])box(gasket,5,.5,140,x,192.75,0,ceramic);for(const z of [-67.5,67.5])box(gasket,130,.5,5,0,192.75,z,ceramic);
const glass=group('glass',4);for(const x of [-68.5,68.5])edges(box(glass,3,87,134,x,236.5,0,glassMat),0x8ad1c6);for(const z of [-68.5,68.5])edges(box(glass,140,87,3,0,236.5,z,glassMat),0x8ad1c6);edges(box(glass,140,3,140,0,281.5,0,glassMat),0x8ad1c6);
const felt=group('felt',4);const feltMat=new THREE.MeshStandardMaterial({color:0xb9b8a4,roughness:1});
// Vertical wall strips: 134 mm inner width minus two 3 mm strips = 128 mm clear.
for(const x of [-65.5,65.5])box(felt,3,15,134,x,269.5,0,feltMat);
for(const z of [-65.5,65.5])box(felt,128,15,3,0,269.5,z,feltMat);
const light=group('light',3);box(light,8,9,100,78,201,0,dark);box(light,.5,5,92,73.8,201,0,new THREE.MeshBasicMaterial({color:0xe9d9a3}));scene.add(new THREE.PointLight(0x86daca,9000,260));scene.children.at(-1).position.set(70,208,0);
// Track lines illustrate condensation in the central volume; no event-rate claim.
const tracks=new THREE.Group();model.add(tracks);let elapsed=0;
for(let i=0;i<12;i++){const points=[];const x=-55+Math.random()*100,z=-55+Math.random()*100;for(let k=0;k<7;k++)points.push(new THREE.Vector3(x+k*2.2,195+Math.sin(k*.6+i)*.9,z+k*.6));const m=new THREE.LineBasicMaterial({color:0xd9f9f3,transparent:true,opacity:0});const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),m);line.userData.phase=i*.57;tracks.add(line);}
scene.add(new THREE.HemisphereLight(0xc3e1eb,0x34454a,2));const key=new THREE.DirectionalLight(0xf8eee2,3);key.position.set(150,400,200);scene.add(key);const rim=new THREE.DirectionalLight(0x62bea9,2);rim.position.set(-200,220,-100);scene.add(rim);
const grid=new THREE.GridHelper(680,34,0x36515f,0x203541);grid.position.y=12;scene.add(grid);
function visibility(){for(const [id,g]of Object.entries(groups))g.visible=(id!=='housing'||shellVisible)&&(selectedTab!=='assembly'||steps[step][3].includes(id));tracks.visible=selectedTab!=='assembly'&&explosion<.05;$('modeLabel').textContent=(selectedTab==='assembly'?`ASSEMBLY ${step+1}/7`:explosion>.05?'EXPLODED':'ASSEMBLED')+' · mm';}
function home(){camera.position.set(510,370,610);if(controls){controls.target.set(45,173,0);controls.update();}}
if(renderer){renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor(0,0);container.append(renderer.domElement);controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.minDistance=170;controls.maxDistance=1000;home();new ResizeObserver(()=>{const w=container.clientWidth,h=container.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();}).observe(container);
const ray=new THREE.Raycaster(),pointer=new THREE.Vector2();let down;
renderer.domElement.addEventListener('pointerdown',e=>{down=[e.clientX,e.clientY]});renderer.domElement.addEventListener('pointerup',e=>{if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>5)return;const r=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);for(const hit of ray.intersectObjects(model.children,true)){let o=hit.object;if(!o.isMesh)continue;let visible=true;while(o&&!o.userData.part){if(!o.visible)visible=false;o=o.parent;}if(o&&o.visible&&visible){select(o.userData.part);break;}}});
let last=0;function animate(t){requestAnimationFrame(animate);const dt=Math.min((t-last)/1000,.05);last=t;if(document.hidden)return;if(!paused){elapsed+=dt;for(const rotor of rotors)rotor.rotation.z-=dt*8;}if(controls.autoRotate)controls.autoRotateSpeed=.6;for(const g of moving)g.position.y=g.userData.level*explosion*28;for(const tr of tracks.children)tr.material.opacity=Math.max(0,Math.sin(elapsed*1.6+tr.userData.phase))**10*.8;controls.update();renderer.render(scene,camera);}requestAnimationFrame(animate);}
$('home').onclick=home;$('top').onclick=()=>{explosion=0;$('explode').value=0;camera.position.set(0,820,.1);if(controls){controls.autoRotate=false;$('rotate').setAttribute('aria-pressed','false');controls.target.set(0,235,0);controls.update();}visibility();};$('rotate').onclick=e=>{if(controls){controls.autoRotate=!controls.autoRotate;e.target.setAttribute('aria-pressed',controls.autoRotate);}};$('shell').onclick=e=>{shellVisible=!shellVisible;e.target.setAttribute('aria-pressed',shellVisible);visibility();};$('pause').onclick=e=>{paused=!paused;e.target.setAttribute('aria-pressed',paused);e.target.textContent=paused?'Resume tracks':'Pause tracks';};$('explode').oninput=e=>{explosion=+e.target.value;visibility();};setStep(0);visibility();

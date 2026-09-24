// ── DATA ──────────────────────────────────────────────────────────────────────
const COUNTRIES = [
  {name:'United States',  code:'US',flag:'🇺🇸',lat:37.09,  lng:-95.71, w:10},
  {name:'China',          code:'CN',flag:'🇨🇳',lat:35.86,  lng:104.19, w:10},
  {name:'Russia',         code:'RU',flag:'🇷🇺',lat:61.52,  lng:105.31, w:9},
  {name:'Germany',        code:'DE',flag:'🇩🇪',lat:51.16,  lng:10.45,  w:7},
  {name:'Brazil',         code:'BR',flag:'🇧🇷',lat:-14.23, lng:-51.92, w:6},
  {name:'United Kingdom', code:'GB',flag:'🇬🇧',lat:55.37,  lng:-3.43,  w:7},
  {name:'India',          code:'IN',flag:'🇮🇳',lat:20.59,  lng:78.96,  w:8},
  {name:'France',         code:'FR',flag:'🇫🇷',lat:46.22,  lng:2.21,   w:6},
  {name:'Japan',          code:'JP',flag:'🇯🇵',lat:36.20,  lng:138.25, w:7},
  {name:'South Korea',    code:'KR',flag:'🇰🇷',lat:35.90,  lng:127.76, w:6},
  {name:'Australia',      code:'AU',flag:'🇦🇺',lat:-25.27, lng:133.77, w:5},
  {name:'Canada',         code:'CA',flag:'🇨🇦',lat:56.13,  lng:-106.34,w:6},
  {name:'Netherlands',    code:'NL',flag:'🇳🇱',lat:52.13,  lng:5.29,   w:6},
  {name:'Singapore',      code:'SG',flag:'🇸🇬',lat:1.35,   lng:103.81, w:6},
  {name:'Ukraine',        code:'UA',flag:'🇺🇦',lat:48.37,  lng:31.16,  w:5},
  {name:'Iran',           code:'IR',flag:'🇮🇷',lat:32.42,  lng:53.68,  w:7},
  {name:'North Korea',    code:'KP',flag:'🇰🇵',lat:40.33,  lng:127.51, w:8},
  {name:'Nigeria',        code:'NG',flag:'🇳🇬',lat:9.08,   lng:8.67,   w:4},
  {name:'Mexico',         code:'MX',flag:'🇲🇽',lat:23.63,  lng:-102.55,w:4},
  {name:'Sweden',         code:'SE',flag:'🇸🇪',lat:60.12,  lng:18.64,  w:4},
  {name:'Poland',         code:'PL',flag:'🇵🇱',lat:51.91,  lng:19.14,  w:4},
  {name:'Israel',         code:'IL',flag:'🇮🇱',lat:31.04,  lng:34.85,  w:5},
  {name:'Turkey',         code:'TR',flag:'🇹🇷',lat:38.96,  lng:35.24,  w:5},
  {name:'Argentina',      code:'AR',flag:'🇦🇷',lat:-38.41, lng:-63.61, w:3},
  {name:'South Africa',   code:'ZA',flag:'🇿🇦',lat:-30.55, lng:22.93,  w:3},
  {name:'Portugal',       code:'PT',flag:'🇵🇹',lat:39.39,  lng:-8.22,  w:5},
  {name:'Spain',          code:'ES',flag:'🇪🇸',lat:40.46,  lng:-3.74,  w:5},
  {name:'Italy',          code:'IT',flag:'🇮🇹',lat:41.87,  lng:12.56,  w:5},
  {name:'Romania',        code:'RO',flag:'🇷🇴',lat:45.94,  lng:24.96,  w:4},
  {name:'Czech Republic', code:'CZ',flag:'🇨🇿',lat:49.81,  lng:15.47,  w:4},
  {name:'Saudi Arabia',   code:'SA',flag:'🇸🇦',lat:23.88,  lng:45.07,  w:5},
  {name:'Pakistan',       code:'PK',flag:'🇵🇰',lat:30.37,  lng:69.34,  w:5},
  {name:'Indonesia',      code:'ID',flag:'🇮🇩',lat:-0.78,  lng:113.92, w:5},
  {name:'Vietnam',        code:'VN',flag:'🇻🇳',lat:14.05,  lng:108.27, w:4},
  {name:'Thailand',       code:'TH',flag:'🇹🇭',lat:15.87,  lng:100.99, w:4},
];

const CABLES = [
  {from:{lat:38.7,lng:-9.14},  to:{lat:40.7,lng:-74.0},  name:'EllaLink'},
  {from:{lat:38.7,lng:-9.14},  to:{lat:14.7,lng:-17.4},  name:'Atlantis-2'},
  {from:{lat:40.7,lng:-74},    to:{lat:51.5,lng:-0.1},   name:'MAREA'},
  {from:{lat:40.7,lng:-74},    to:{lat:48.8,lng:2.3},    name:'AEConnect'},
  {from:{lat:25.7,lng:-80},    to:{lat:51.5,lng:-0.1},   name:'AC-1'},
  {from:{lat:37.7,lng:-122.4}, to:{lat:35.6,lng:139.6},  name:'FASTER'},
  {from:{lat:37.7,lng:-122.4}, to:{lat:1.3,lng:103.8},   name:'SEA-ME-WE 5'},
  {from:{lat:34.0,lng:-118.2}, to:{lat:22.3,lng:114.1},  name:'APG'},
  {from:{lat:51.5,lng:-0.1},   to:{lat:1.3,lng:103.8},   name:'FLAG'},
  {from:{lat:1.3,lng:103.8},   to:{lat:-25.2,lng:133.7}, name:'JASURUS'},
  {from:{lat:51.5,lng:-0.1},   to:{lat:-33.9,lng:18.4},  name:'SAT-3'},
  {from:{lat:40.7,lng:-74},    to:{lat:9.0,lng:8.6},     name:'WACS'},
];

const CDN_NODES = [
  {lat:37.7,  lng:-122.4, name:'San Francisco', prov:'Cloudflare'},
  {lat:40.7,  lng:-74.0,  name:'New York',      prov:'AWS'},
  {lat:51.5,  lng:-0.1,   name:'London',        prov:'Akamai'},
  {lat:48.8,  lng:2.3,    name:'Paris',         prov:'Fastly'},
  {lat:52.5,  lng:13.4,   name:'Berlin',        prov:'Cloudflare'},
  {lat:1.3,   lng:103.8,  name:'Singapore',     prov:'AWS'},
  {lat:35.6,  lng:139.6,  name:'Tokyo',         prov:'Akamai'},
  {lat:22.3,  lng:114.1,  name:'Hong Kong',     prov:'CDN77'},
  {lat:-23.5, lng:-46.6,  name:'São Paulo',     prov:'AWS'},
  {lat:-33.8, lng:151.2,  name:'Sydney',        prov:'Cloudflare'},
  {lat:55.7,  lng:37.6,   name:'Moscow',        prov:'Yandex CDN'},
  {lat:19.0,  lng:72.8,   name:'Mumbai',        prov:'AWS'},
  {lat:37.5,  lng:127.0,  name:'Seoul',         prov:'KT Network'},
  {lat:38.7,  lng:-9.14,  name:'Lisboa',        prov:'NOS / Cloudflare'},
];

const ATTACK_TYPES = ['DDoS','SQL Injection','Port Scan','Brute Force','Ransomware','Phishing','Zero-Day','Botnet','Malware C2','MITM'];
const THREATS      = ['LOW','MEDIUM','HIGH','CRITICAL'];

const cdata = {};
COUNTRIES.forEach(c => {
  cdata[c.code] = {
    ...c,
    recv: Math.floor(Math.random() * 4000 * c.w),
    sent: Math.floor(Math.random() * 2000 * c.w),
    bw:   (Math.random() * 80 * c.w).toFixed(1),
    thr:  THREATS[Math.min(3, Math.floor(c.w / 3))],
  };
});

let filters    = {attacks:true, flows:true, cables:true, cdn:true};
let autoRotate = true;
let rotSpeed   = 1;
let atkDensity = 3;

// ── THREE.JS ─────────────────────────────────────────────────────────────────
const R        = 1;
const canvas   = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
camera.position.set(0, 0, 2.8);

// Stars
const sv = [];
for (let i = 0; i < 3000; i++) {
  const a = Math.random()*Math.PI*2, b = Math.acos(2*Math.random()-1), r = 15+Math.random()*20;
  sv.push(r*Math.sin(b)*Math.cos(a), r*Math.sin(b)*Math.sin(a), r*Math.cos(b));
}
const sGeo = new THREE.BufferGeometry();
sGeo.setAttribute('position', new THREE.Float32BufferAttribute(sv, 3));
scene.add(new THREE.Points(sGeo, new THREE.PointsMaterial({color:0xffffff, size:0.05, sizeAttenuation:true})));

// Globe
const globeMat  = new THREE.MeshPhongMaterial({color:0xffffff, specular:0x333333, shininess:12});
const globeMesh = new THREE.Mesh(new THREE.SphereGeometry(R, 64, 64), globeMat);
const tl = new THREE.TextureLoader();
tl.load('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-day.jpg',
  t => { globeMat.map=t; globeMat.needsUpdate=true; }, undefined,
  ()  => { globeMat.color.set(0x1a4a2a); globeMat.needsUpdate=true; });
tl.load('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png',
  t => { globeMat.bumpMap=t; globeMat.bumpScale=0.05; globeMat.needsUpdate=true; });
tl.load('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-water.png',
  t => { globeMat.specularMap=t; globeMat.specular=new THREE.Color(0x226688); globeMat.shininess=25; globeMat.needsUpdate=true; });

// Atmosphere
scene.add(new THREE.Mesh(
  new THREE.SphereGeometry(R*1.06, 64, 64),
  new THREE.MeshPhongMaterial({color:0x003366, emissive:0x001133, transparent:true, opacity:0.18, side:THREE.FrontSide})
));

scene.add(new THREE.AmbientLight(0x001122, 0.8));
const sun = new THREE.DirectionalLight(0x4488ff, 1.2);
sun.position.set(5, 3, 5);
scene.add(sun);

// Pivot — all rotating objects live here
const pivot = new THREE.Group();
scene.add(pivot);
pivot.add(globeMesh);

// ── COORDINATE CONVERSION ─────────────────────────────────────────────────────
function ll2v(lat, lng, r = R) {
  const phi = lat * Math.PI / 180, th = lng * Math.PI / 180;
  return new THREE.Vector3(r*Math.cos(phi)*Math.cos(th), r*Math.sin(phi), -r*Math.cos(phi)*Math.sin(th));
}

// ── GRID ─────────────────────────────────────────────────────────────────────
const gm = new THREE.LineBasicMaterial({color:0x003355, transparent:true, opacity:0.3});
for (let lat=-80; lat<=80; lat+=20) {
  const pts=[], ph=(90-lat)*Math.PI/180;
  for (let l=0; l<=360; l+=3) { const la=l*Math.PI/180; pts.push(new THREE.Vector3(R*Math.sin(ph)*Math.cos(la),R*Math.cos(ph),R*Math.sin(ph)*Math.sin(la))); }
  pivot.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gm));
}
for (let lng=0; lng<360; lng+=30) {
  const pts=[], la=lng*Math.PI/180;
  for (let lat=-90; lat<=90; lat+=3) { const ph=(90-lat)*Math.PI/180; pts.push(new THREE.Vector3(R*Math.sin(ph)*Math.cos(la),R*Math.cos(ph),R*Math.sin(ph)*Math.sin(la))); }
  pivot.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gm));
}

// ── COUNTRY MARKERS ───────────────────────────────────────────────────────────
const markersGrp = new THREE.Group(); pivot.add(markersGrp);
const markerMeshes = [];
COUNTRIES.forEach(c => {
  const pos  = ll2v(c.lat, c.lng, R*1.005);
  const isPT = c.code === 'PT';
  const col  = isPT ? 0x00f5ff : (c.w>=8 ? 0xff003c : c.w>=5 ? 0xff9500 : 0x00ff88);
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.018, 0.030, 16),
    new THREE.MeshBasicMaterial({color:col, transparent:true, opacity:isPT?0.95:0.6, side:THREE.DoubleSide})
  );
  ring.position.copy(pos); ring.lookAt(new THREE.Vector3(0,0,0)); markersGrp.add(ring);
  const dot = new THREE.Mesh(
    new THREE.SphereGeometry(isPT?0.018:0.010, 8, 8),
    new THREE.MeshBasicMaterial({color:col})
  );
  dot.position.copy(pos); dot.userData = {country:c}; markersGrp.add(dot); markerMeshes.push(dot);
  if (isPT) {
    const dir = pos.clone().normalize();
    const spk = new THREE.Mesh(
      new THREE.ConeGeometry(0.006, 0.06, 6),
      new THREE.MeshBasicMaterial({color:0x00f5ff, transparent:true, opacity:0.8})
    );
    spk.position.copy(pos.clone().add(dir.clone().multiplyScalar(0.03)));
    spk.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), dir);
    spk.userData = {ptBeacon:true, phase:0};
    markersGrp.add(spk);
  }
});

// ── CDN NODES ─────────────────────────────────────────────────────────────────
const cdnGrp = new THREE.Group(); pivot.add(cdnGrp);
CDN_NODES.forEach(node => {
  const pos = ll2v(node.lat, node.lng, R*1.008);
  const m   = new THREE.Mesh(new THREE.SphereGeometry(0.018,8,8), new THREE.MeshBasicMaterial({color:0xffe500}));
  m.position.copy(pos); m.userData={type:'cdn',node}; cdnGrp.add(m);
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.020, 0.030, 16),
    new THREE.MeshBasicMaterial({color:0xffe500, transparent:true, opacity:0.6, side:THREE.DoubleSide})
  );
  ring.position.copy(pos); ring.lookAt(new THREE.Vector3(0,0,0));
  ring.userData = {pulse:true, phase:Math.random()*Math.PI*2}; cdnGrp.add(ring);
});

// ── SUBMARINE CABLES ──────────────────────────────────────────────────────────
const cableGrp = new THREE.Group(); pivot.add(cableGrp);
function arcCurve(la1, lo1, la2, lo2, lift=0.08) {
  const p1=ll2v(la1,lo1,R+0.002), p2=ll2v(la2,lo2,R+0.002);
  const mid=p1.clone().add(p2).multiplyScalar(0.5).normalize().multiplyScalar(R+lift);
  return new THREE.QuadraticBezierCurve3(p1, mid, p2);
}
CABLES.forEach(c => {
  const geo = new THREE.BufferGeometry().setFromPoints(arcCurve(c.from.lat,c.from.lng,c.to.lat,c.to.lng,0.15).getPoints(80));
  cableGrp.add(new THREE.Line(geo, new THREE.LineBasicMaterial({color:0xff9500,transparent:true,opacity:0.75,linewidth:2})));
  cableGrp.add(new THREE.Line(geo.clone(), new THREE.LineBasicMaterial({color:0xff6600,transparent:true,opacity:0.25})));
});

// ── ANIMATED ARCS ─────────────────────────────────────────────────────────────
const arcGrp = new THREE.Group(); pivot.add(arcGrp);
const activeArcs = [];
function spawnArc(type) {
  const src=COUNTRIES[Math.floor(Math.random()*COUNTRIES.length)];
  let dst; do{dst=COUNTRIES[Math.floor(Math.random()*COUNTRIES.length)];}while(dst===src);
  const lift = type==='attack' ? 0.35+Math.random()*0.45 : 0.18+Math.random()*0.25;
  const allPts = arcCurve(src.lat+(Math.random()-.5)*6,src.lng+(Math.random()-.5)*6,dst.lat+(Math.random()-.5)*6,dst.lng+(Math.random()-.5)*6,lift).getPoints(80);
  const color = type==='attack' ? 0xff003c : 0x00ff88;
  const mat   = new THREE.LineBasicMaterial({color,transparent:true,opacity:0.92});
  const geo   = new THREE.BufferGeometry();
  const line  = new THREE.Line(geo,mat); arcGrp.add(line);
  const matG  = new THREE.LineBasicMaterial({color,transparent:true,opacity:0.25});
  const glow  = new THREE.Line(new THREE.BufferGeometry(),matG); arcGrp.add(glow);
  const bytes   = (Math.random()*900+50).toFixed(0)+(Math.random()>.5?' MB':' GB');
  const atkType = ATTACK_TYPES[Math.floor(Math.random()*ATTACK_TYPES.length)];
  activeArcs.push({line,glow,geo,mat,matG,allPts,nPts:80,type,src,dst,bytes,atkType,born:Date.now(),ttl:type==='attack'?3000+Math.random()*3000:5000+Math.random()*4000});
  return {type,src,dst,bytes,atkType};
}
function updateArcs() {
  for (let i=activeArcs.length-1; i>=0; i--) {
    const a=activeArcs[i], life=(Date.now()-a.born)/a.ttl;
    if (life>1) { arcGrp.remove(a.line); arcGrp.remove(a.glow); a.geo.dispose(); a.mat.dispose(); a.matG.dispose(); activeArcs.splice(i,1); continue; }
    const h=Math.min(a.nPts,Math.floor(life*a.nPts*2)), tail=Math.max(0,h-30), vis=a.allPts.slice(tail,h+1);
    if (vis.length>1) {
      a.geo.setFromPoints(vis); a.line.geometry=a.geo; a.glow.geometry.setFromPoints(vis);
      const f=life<0.7?1:1-((life-0.7)/0.3); a.mat.opacity=0.92*f; a.matG.opacity=0.30*f;
    }
  }
}

// ── INTERACTION ───────────────────────────────────────────────────────────────
let isDrag=false, pm={x:0,y:0}, rotX=0.3, rotY=0;
const tooltip=document.getElementById('tooltip');
const cPos3D=COUNTRIES.map(c=>({c,v:ll2v(c.lat,c.lng,R)}));

function hitTest(e) {
  const W=canvas.clientWidth, H=canvas.clientHeight;
  const rc=new THREE.Raycaster();
  rc.setFromCamera(new THREE.Vector2((e.clientX/W)*2-1,-(e.clientY/H)*2+1), camera);
  const hits=rc.intersectObject(globeMesh);
  if (!hits.length) return null;
  pivot.updateMatrixWorld(true);
  const local=hits[0].point.clone().applyMatrix4(pivot.matrixWorld.clone().invert());
  let best=null, bestD=Infinity;
  cPos3D.forEach(({c,v})=>{const d=local.distanceTo(v);if(d<bestD){bestD=d;best=c;}});
  return bestD<0.6 ? best : null;
}

canvas.addEventListener('mousedown', e=>{isDrag=true; pm={x:e.clientX,y:e.clientY}; autoRotate=false;});
canvas.addEventListener('mouseup',   ()=>isDrag=false);
canvas.addEventListener('mouseleave',()=>{isDrag=false; tooltip.classList.remove('vis');});
canvas.addEventListener('mousemove', e=>{
  tooltip.style.left=(e.clientX+16)+'px'; tooltip.style.top=(e.clientY-40)+'px';
  if (isDrag) {
    rotY+=(e.clientX-pm.x)*0.005; rotX+=(e.clientY-pm.y)*0.005;
    rotX=Math.max(-Math.PI/2,Math.min(Math.PI/2,rotX)); pm={x:e.clientX,y:e.clientY};
  } else {
    const c=hitTest(e);
    if (c) {
      const d=cdata[c.code];
      document.getElementById('tt-name').textContent=c.flag+' '+c.name;
      document.getElementById('tt-atk').textContent=d.recv.toLocaleString()+'/hr';
      document.getElementById('tt-bw').textContent=d.bw+' Tbps';
      document.getElementById('tt-thr').textContent=d.thr;
      tooltip.classList.add('vis');
    } else { tooltip.classList.remove('vis'); }
  }
});
canvas.addEventListener('click', e=>{const c=hitTest(e); if(c) selectCountry(c.code);});
canvas.addEventListener('wheel', e=>{camera.position.z=Math.max(1.5,Math.min(5,camera.position.z+e.deltaY*0.002));},{passive:true});

// ── RESIZE ────────────────────────────────────────────────────────────────────
function resize(){const W=window.innerWidth,H=window.innerHeight;renderer.setSize(W,H);camera.aspect=W/H;camera.updateProjectionMatrix();}
resize(); window.addEventListener('resize',resize);

// ── RENDER LOOP ───────────────────────────────────────────────────────────────
let lt=0;
function animate(t){
  requestAnimationFrame(animate);
  const dt=t-lt; lt=t;
  if(autoRotate) rotY+=0.0008*rotSpeed;
  pivot.rotation.x=rotX; pivot.rotation.y=rotY;
  const cp=camera.getWorldPosition(new THREE.Vector3());
  cdnGrp.children.forEach(c=>{
    if(!c.userData.pulse) return;
    c.userData.phase+=dt*0.002;
    c.scale.setScalar(1+0.4*Math.sin(c.userData.phase));
    c.material.opacity=0.4+0.3*Math.sin(c.userData.phase);
    c.lookAt(cp);
  });
  markersGrp.children.forEach(c=>{
    if(!c.userData.ptBeacon) return;
    c.userData.phase=(c.userData.phase||0)+dt*0.004;
    c.scale.setScalar(1+0.4*Math.abs(Math.sin(c.userData.phase)));
    c.material.opacity=0.5+0.5*Math.abs(Math.sin(c.userData.phase));
  });
  updateArcs();
  renderer.render(scene,camera);
}
animate(0);

// ── COUNTRY DETAIL ────────────────────────────────────────────────────────────
function selectCountry(code) {
  const d=cdata[code]; if(!d) return;
  document.getElementById('country-detail').innerHTML=`
    <div class="p-label" style="margin:15px 15px 10px">Country Details</div>
    <div style="padding:0 15px">
      <div class="c-flag">${d.flag}</div>
      <div class="c-name">${d.name}</div>
      <div class="d-row"><span class="d-key">Threat Level</span><span class="d-val r">${d.thr}</span></div>
      <div class="d-row"><span class="d-key">Attacks recv/hr</span><span class="d-val r">${d.recv.toLocaleString()}</span></div>
      <div class="d-row"><span class="d-key">Attacks sent/hr</span><span class="d-val">${d.sent.toLocaleString()}</span></div>
      <div class="d-row"><span class="d-key">Bandwidth</span><span class="d-val g">${d.bw} Tbps</span></div>
      <div class="d-row"><span class="d-key">Top Vector</span><span class="d-val">${ATTACK_TYPES[Math.floor(Math.random()*ATTACK_TYPES.length)]}</span></div>
    </div>`;
}

// ── ALERTS + FEED ─────────────────────────────────────────────────────────────
const alertsEl=document.getElementById('alerts-list');
const feedEl=document.getElementById('traffic-feed');
function utc(){return new Date().toUTCString().slice(17,25);}
function addAlert(type,txt){
  const d=document.createElement('div');
  d.className='alert-item'+(type==='info'?' info':'');
  d.innerHTML=`<div class="a-time">${utc()} UTC</div><div class="a-tag">${type==='info'?'INFO':'THREAT'}</div><div class="a-txt">${txt}</div>`;
  alertsEl.insertBefore(d,alertsEl.firstChild);
  if(alertsEl.children.length>20) alertsEl.removeChild(alertsEl.lastChild);
}
function addFeed(arc){
  const d=document.createElement('div');
  d.className='feed-item '+arc.type;
  d.innerHTML=arc.type==='attack'
    ?`<span style="color:var(--cyan);font-size:9px">${utc()}</span> <span style="color:var(--red)">${arc.src.code}</span>→<span style="color:var(--green)">${arc.dst.code}</span> <b>${arc.atkType}</b><br><span style="color:var(--orange);font-size:9px">${arc.bytes}</span>`
    :`<span style="color:var(--cyan);font-size:9px">${utc()}</span> <span style="color:var(--green)">${arc.src.code}</span>→<span style="color:var(--cyan)">${arc.dst.code}</span><br><span style="color:var(--orange);font-size:9px">${arc.bytes}</span>`;
  feedEl.insertBefore(d,feedEl.firstChild);
  if(feedEl.children.length>30) feedEl.removeChild(feedEl.lastChild);
}

// ── ANOMALY ───────────────────────────────────────────────────────────────────
const anomEl=document.getElementById('anomaly');
function showAnom(txt){document.getElementById('an-txt').textContent=txt;anomEl.classList.add('show');setTimeout(closeAnom,6000);}
function closeAnom(){anomEl.classList.remove('show');}

// ── FILTERS ───────────────────────────────────────────────────────────────────
function toggleFilter(k){
  filters[k]=!filters[k];
  document.getElementById('tgl-'+k).classList.toggle('on');
  if(k==='cables') cableGrp.visible=filters.cables;
  if(k==='cdn')    cdnGrp.visible=filters.cdn;
}

// ── STATS ─────────────────────────────────────────────────────────────────────
let sa={atk:0,flw:0};
function updateStats(){
  sa.atk+=Math.floor(Math.random()*8); sa.flw+=Math.floor(Math.random()*5);
  document.getElementById('s-atk').textContent=sa.atk%1000;
  document.getElementById('s-flw').textContent=sa.flw%500;
  document.getElementById('s-bw').textContent=(840+Math.random()*40).toFixed(1);
}

// ── CLOCK ─────────────────────────────────────────────────────────────────────
function updateClock(){document.getElementById('time-display').textContent=new Date().toUTCString().slice(17,25)+' UTC';}
setInterval(updateClock,1000); updateClock();

// ── UI ────────────────────────────────────────────────────────────────────────
function toggleFS(){
  const btn=document.getElementById('fs-btn');
  if(!document.fullscreenElement){document.documentElement.requestFullscreen();btn.textContent='✕ EXIT';}
  else{document.exitFullscreen();btn.textContent='⛶ FULLSCREEN';}
}
function toggleTweaks(){document.getElementById('tweaks-panel').classList.toggle('vis');}

// ── SIM LOOP ──────────────────────────────────────────────────────────────────
let tick=0;
function simStep(){
  tick++;
  const n=filters.attacks?Math.min(atkDensity,Math.floor(Math.random()*atkDensity)+1):0;
  for(let i=0;i<n;i++){const a=spawnArc('attack');if(Math.random()<0.12)addFeed(a);}
  if(filters.flows&&Math.random()<0.55){const a=spawnArc('flow');if(Math.random()<0.07)addFeed(a);}
  updateStats();
  if(tick%7===0){const s=COUNTRIES[Math.floor(Math.random()*COUNTRIES.length)],d=COUNTRIES[Math.floor(Math.random()*COUNTRIES.length)];addAlert('threat',`${ATTACK_TYPES[Math.floor(Math.random()*ATTACK_TYPES.length)]}: ${s.name} → ${d.name}`);}
  if(tick%18===0){const c=COUNTRIES[Math.floor(Math.random()*COUNTRIES.length)];addAlert('info',`${c.name}: bandwidth spike +${(Math.random()*40+10).toFixed(0)}%`);}
  if(tick%85===0){const c=COUNTRIES[Math.floor(Math.random()*COUNTRIES.length)];showAnom(`Massive ${ATTACK_TYPES[Math.floor(Math.random()*ATTACK_TYPES.length)]} surge from ${c.name} — ${(Math.random()*800+100).toFixed(0)} Gbps`);}
}
setInterval(simStep,600);

// ── BOOTSTRAP ────────────────────────────────────────────────────────────────
for(let i=0;i<20;i++) spawnArc(Math.random()>.45?'attack':'flow');
setTimeout(()=>addAlert('info','System online. Monitoring 195 countries.'),400);
setTimeout(()=>addAlert('info','Portugal (PT) — nó ativo em Lisboa (NOS/Cloudflare)'),800);
setTimeout(()=>addAlert('threat','DDoS detected: China → United States (890 Gbps)'),900);
setTimeout(()=>addAlert('threat','Brute Force: Russia → Germany (22 400 req/s)'),1600);
setTimeout(()=>addAlert('info','Submarine cable MAREA — nominal throughput'),2400);
setTimeout(()=>showAnom('Coordinated attack wave — 47 source IPs across 12 nations'),3500);
for(let i=0;i<8;i++) setTimeout(()=>addFeed(spawnArc(Math.random()>.4?'attack':'flow')),i*250);
setTimeout(()=>selectCountry('PT'),1000);

// ── EVENT LISTENERS (externalized from inline on* attributes) ─────────────────
document.getElementById('tweaks-btn').addEventListener('click', toggleTweaks);
document.getElementById('fs-btn').addEventListener('click', toggleFS);
document.getElementById('filter-row-attacks').addEventListener('click', () => toggleFilter('attacks'));
document.getElementById('filter-row-flows').addEventListener('click', () => toggleFilter('flows'));
document.getElementById('filter-row-cables').addEventListener('click', () => toggleFilter('cables'));
document.getElementById('filter-row-cdn').addEventListener('click', () => toggleFilter('cdn'));
document.getElementById('an-close').addEventListener('click', closeAnom);
document.getElementById('tw-rotspeed').addEventListener('input', function () {
  rotSpeed = +this.value;
  this.nextElementSibling.textContent = this.value + '×';
});
document.getElementById('tw-atkdensity').addEventListener('input', function () {
  atkDensity = +this.value;
  this.nextElementSibling.textContent = this.value;
});
document.getElementById('tw-autorotate').addEventListener('click', function () {
  autoRotate = !autoRotate;
  this.querySelector('.tgl').classList.toggle('on');
});

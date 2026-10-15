/* ==========================================================
   LOT 2 — Arcade et sport (9 jeux)
   Astéroïdes, Gobeur, Saute-nuages, Chasseur, Air hockey,
   Tirs au but, Jongleur, Basket, Tir à l'arc
   ========================================================== */
(function(){
'use strict';
const U = SCCG.util, rnd = U.rnd, rndf = U.rndf, shuffle = U.shuffle, pick = U.pick, el = U.el;
const R = d=>{ d.isNew = true; SCCG.register(d); };
const clamp = (v,a,b)=> Math.max(a, Math.min(b, v));
const TAU = Math.PI*2;
const rrect = (g,x,y,w,h,r)=>{ g.beginPath(); g.moveTo(x+r,y); g.arcTo(x+w,y,x+w,y+h,r); g.arcTo(x+w,y+h,x,y+h,r); g.arcTo(x,y+h,x,y,r); g.arcTo(x,y,x+w,y,r); g.closePath(); };
const emoji = (g,ch,x,y,size)=>{ g.font = size+'px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(ch,x,y); };
function followX(api, c, set){ const h = e=>{ set(c.pos(e).x); }; api.on(api.root,'pointerdown',h); api.on(api.root,'pointermove',h); }

/* ---------------------------------------------------------- ASTÉROÏDES */
R({ id:'asteroides', name:'Astéroïdes', emoji:'🚀', cat:'Arcade', hue:230,
  desc:'Pilote ton vaisseau et pulvérise les rochers.',
  how:"Tourne avec ◀ ▶, accélère avec ▲ et tire avec 🔥 (ou flèches + espace). Les gros rochers se brisent en morceaux plus petits. Quand tu sors de l'écran, tu réapparais de l'autre côté. 3 vies : évite les chocs !",
  create(api){
    const W = 320, H = 480, c = api.canvas(W,H), g = c.g, hold = { left:false, right:false, up:false };
    let ship, rocks = [], bullets = [], wave = 0, lives = 3, score = 0, fireT = 0, inv = 0, dead = 0, parts = [];
    const RAD = { 3:34, 2:20, 1:11 };
    function mkRock(x,y,size){
      const sp = rndf(25,60)+wave*6, a = rndf(0,TAU), r = RAD[size];
      return { x, y, size, r, vx:Math.cos(a)*sp, vy:Math.sin(a)*sp, rot:rndf(0,TAU), vr:rndf(-1,1), pts:Array.from({length:11},(_,i)=>({ a:i/11*TAU, k:rndf(.72,1.1) })) };
    }
    function resetShip(){ ship = { x:W/2, y:H/2, vx:0, vy:0, a:0 }; inv = 3; }
    function spawnWave(){
      wave++; rocks = []; const n = Math.min(8,3+wave);
      for(let i=0;i<n;i++){ let x, y, tries = 0; do { x = rnd(W); y = rnd(H); tries++; } while(Math.hypot(x-ship.x,y-ship.y)<130 && tries<30); rocks.push(mkRock(x,y,3)); }
      api.setInfo('Vague '+wave+' • '+'❤️'.repeat(lives));
    }
    const wrap = o=>{ if(o.x<0) o.x += W; else if(o.x>W) o.x -= W; if(o.y<0) o.y += H; else if(o.y>H) o.y -= H; };
    function fire(){
      if(dead>0 || fireT>0 || api.ended) return; fireT = .24;
      bullets.push({ x:ship.x+Math.sin(ship.a)*14, y:ship.y-Math.cos(ship.a)*14, vx:ship.vx+Math.sin(ship.a)*430, vy:ship.vy-Math.cos(ship.a)*430, life:.95 }); api.sfx('shoot');
    }
    function boom(x,y,n){ for(let i=0;i<n;i++){ const a = rndf(0,TAU), s = rndf(30,120); parts.push({ x, y, vx:Math.cos(a)*s, vy:Math.sin(a)*s, life:rndf(.3,.7) }); } }
    function update(dt){
      if(fireT>0) fireT -= dt; if(inv>0) inv -= dt;
      if(dead>0){ dead -= dt; if(dead<=0){ resetShip(); } }
      else {
        const L = hold.left || api.keys.left, Rr = hold.right || api.keys.right, T = hold.up || api.keys.up;
        if(L) ship.a -= 3.8*dt; if(Rr) ship.a += 3.8*dt;
        if(T){ ship.vx += Math.sin(ship.a)*260*dt; ship.vy -= Math.cos(ship.a)*260*dt; }
        const sp = Math.hypot(ship.vx,ship.vy); if(sp>300){ ship.vx *= 300/sp; ship.vy *= 300/sp; }
        const f = Math.pow(.55,dt); ship.vx *= f; ship.vy *= f; ship.x += ship.vx*dt; ship.y += ship.vy*dt; wrap(ship);
        if(api.keys.space) fire();
      }
      rocks.forEach(r=>{ r.x += r.vx*dt; r.y += r.vy*dt; r.rot += r.vr*dt; wrap(r); });
      bullets.forEach(b=>{ b.x += b.vx*dt; b.y += b.vy*dt; b.life -= dt; wrap(b); }); bullets = bullets.filter(b=>b.life>0);
      parts.forEach(p=>{ p.x += p.vx*dt; p.y += p.vy*dt; p.life -= dt; }); parts = parts.filter(p=>p.life>0);
      bullets.forEach(b=>{
        for(let i=0;i<rocks.length;i++){ const r = rocks[i]; if(Math.hypot(b.x-r.x,b.y-r.y)<r.r){
          b.life = 0; rocks.splice(i,1); score += r.size===3 ? 20 : r.size===2 ? 50 : 100; api.setScore(score); api.sfx('boom'); boom(r.x,r.y,8);
          if(r.size>1){ rocks.push(mkRock(r.x,r.y,r.size-1)); rocks.push(mkRock(r.x,r.y,r.size-1)); } break; } }
      });
      if(dead<=0 && inv<=0){
        for(const r of rocks){ if(Math.hypot(ship.x-r.x,ship.y-r.y)<r.r+8){
          lives--; boom(ship.x,ship.y,18); api.sfx('boom'); api.vibrate(150); dead = 1.3; api.setInfo('Vague '+wave+' • '+'❤️'.repeat(Math.max(0,lives)));
          if(lives<=0){ api.end(score,{ title:'Vaisseau détruit', msg:'Tu as atteint la vague '+wave+'.' }); return; } break; } }
      }
      if(!rocks.length){ score += 50; api.setScore(score); api.sfx('win'); api.toast('Vague terminée ! +50'); spawnWave(); }
    }
    function draw(){
      g.fillStyle = '#04060f'; g.fillRect(0,0,W,H); g.strokeStyle = '#e8f0ff'; g.lineWidth = 1.6; g.lineJoin = 'round';
      rocks.forEach(r=>{ g.beginPath(); r.pts.forEach((p,i)=>{ const x = r.x+Math.cos(p.a+r.rot)*r.r*p.k, y = r.y+Math.sin(p.a+r.rot)*r.r*p.k; if(i) g.lineTo(x,y); else g.moveTo(x,y); }); g.closePath(); g.stroke(); });
      g.fillStyle = '#ffd166'; bullets.forEach(b=>{ g.beginPath(); g.arc(b.x,b.y,2.2,0,TAU); g.fill(); });
      parts.forEach(p=>{ g.globalAlpha = clamp(p.life*2,0,1); g.fillStyle = '#ffb347'; g.fillRect(p.x,p.y,2,2); }); g.globalAlpha = 1;
      if(dead<=0 && (inv<=0 || Math.floor(inv*8)%2)){
        g.save(); g.translate(ship.x,ship.y); g.rotate(ship.a); g.strokeStyle = '#7fe0b3'; g.lineWidth = 2;
        g.beginPath(); g.moveTo(0,-14); g.lineTo(9,10); g.lineTo(0,5); g.lineTo(-9,10); g.closePath(); g.stroke();
        if(hold.up || api.keys.up){ g.strokeStyle = '#ffb347'; g.beginPath(); g.moveTo(-4,8); g.lineTo(0,18+Math.random()*6); g.lineTo(4,8); g.stroke(); }
        g.restore();
      }
    }
    api.loop(dt=>{ update(dt); draw(); });
    api.onKey(k=>{ if(k==='space') fire(); });
    api.buttons([
      { t:'◀', label:'Gauche', down:()=>{ hold.left = true; }, up:()=>{ hold.left = false; } },
      { t:'▲', label:'Accélérer', down:()=>{ hold.up = true; }, up:()=>{ hold.up = false; } },
      { t:'▶', label:'Droite', down:()=>{ hold.right = true; }, up:()=>{ hold.right = false; } },
      { t:'🔥', label:'Tirer', down:fire, repeat:240 }
    ]);
    resetShip(); inv = 2; spawnWave(); draw();
  }
});

/* ---------------------------------------------------------- GOBEUR (type Pac-Man) */
const MAZE = [
  '###############','#o.....#.....o#','#.###.###.###.#','#.............#','#.###.#.#.###.#','#.....#.#.....#','#.###.#.#.###.#','#.............#',
  '#.###.#.#.###.#','#.....#.#.....#','#.###.#.#.###.#','#.............#','#.###.###.###.#','#o.....#.....o#','###############'
];
SCCG.lab.gobeurMaze = MAZE;
R({ id:'gobeur', name:'Gobeur', emoji:'🟡', cat:'Arcade', hue:55,
  desc:'Mange tous les points, évite les fantômes.',
  how:"Guide le Gobeur en glissant ton doigt (ou flèches / boutons) pour manger tous les points. Les grosses boules ⚪ rendent les fantômes vulnérables pendant quelques secondes : mange-les ! Si un fantôme te touche, tu perds une vie (3 vies).",
  create(api){
    const CS = 22, NC = 15, NR = 15, W = NC*CS, H = NR*CS, c = api.canvas(W,H), g = c.g;
    let grid, pellets, p, ghosts, score = 0, lives = 3, level = 1, fright = 0, nextDir = [0,0], readyT = 0;
    const wall = (x,y)=> x<0||y<0||x>=NC||y>=NR||grid[y][x]==='#';
    function build(){
      grid = MAZE.map(r=>r.split('')); pellets = 0; grid.forEach(r=>r.forEach(ch=>{ if(ch==='.'||ch==='o') pellets++; }));
      resetPos();
    }
    function resetPos(){
      p = { x:7, y:11, d:[0,0], sp:4.6 }; nextDir = [0,0]; fright = 0; readyT = 1;
      ghosts = [[1,3,'#ef4444'],[13,3,'#f472b6'],[7,3,'#22d3ee']].map((s,i)=>({ x:s[0], y:s[1], d:[i%2?-1:1,0], sp:Math.min(4.3,3.3+level*.15), col:s[2], home:[s[0],s[1]], eaten:0 }));
    }
    function step(e,dt,choose){
      let rem = e.sp*dt;
      while(rem>1e-9){
        const atC = Math.abs(e.x-Math.round(e.x))<1e-7 && Math.abs(e.y-Math.round(e.y))<1e-7;
        if(atC){ e.x = Math.round(e.x); e.y = Math.round(e.y); choose(e); if(!(e.d[0]||e.d[1])) return; if(wall(e.x+e.d[0],e.y+e.d[1])){ e.d = [0,0]; return; } }
        let dist;
        if(atC) dist = 1;
        else if(e.d[0]>0) dist = Math.ceil(e.x+1e-9)-e.x; else if(e.d[0]<0) dist = e.x-Math.floor(e.x-1e-9);
        else if(e.d[1]>0) dist = Math.ceil(e.y+1e-9)-e.y; else dist = e.y-Math.floor(e.y-1e-9);
        const mv = Math.min(rem,dist); e.x += e.d[0]*mv; e.y += e.d[1]*mv; rem -= mv;
      }
    }
    function playerChoose(e){ if((nextDir[0]||nextDir[1]) && !wall(e.x+nextDir[0],e.y+nextDir[1])) e.d = nextDir.slice(); }
    function ghostChoose(gh){
      const dirs = [[1,0],[-1,0],[0,1],[0,-1]].filter(d=>!wall(gh.x+d[0],gh.y+d[1]));
      let opts = dirs.filter(d=>!(d[0]===-gh.d[0] && d[1]===-gh.d[1])); if(!opts.length) opts = dirs; if(!opts.length){ gh.d = [0,0]; return; }
      if(gh.eaten>0){ const hx = gh.home[0], hy = gh.home[1]; opts.sort((a,b)=>(Math.abs(gh.x+a[0]-hx)+Math.abs(gh.y+a[1]-hy))-(Math.abs(gh.x+b[0]-hx)+Math.abs(gh.y+b[1]-hy))); gh.d = opts[0]; return; }
      if(fright>0 || Math.random()<.3){ gh.d = pick(opts); return; }
      opts.sort((a,b)=>(Math.abs(gh.x+a[0]-p.x)+Math.abs(gh.y+a[1]-p.y))-(Math.abs(gh.x+b[0]-p.x)+Math.abs(gh.y+b[1]-p.y))); gh.d = opts[0];
    }
    function setDir(d){
      const m = { left:[-1,0], right:[1,0], up:[0,-1], down:[0,1] }[d]; if(!m) return; nextDir = m;
      if(p.d[0]===-m[0] && p.d[1]===-m[1] && (m[0]||m[1])) p.d = m.slice();
      if(!(p.d[0]||p.d[1]) && !wall(Math.round(p.x)+m[0],Math.round(p.y)+m[1])) p.d = m.slice();
    }
    const info = ()=> api.setInfo('Niveau '+level+' • '+'❤️'.repeat(lives));
    function hurt(){
      lives--; api.sfx('boom'); api.vibrate(150); info();
      if(lives<=0){ api.end(score,{ title:'Gobé !', msg:'Niveau atteint : '+level }); return; }
      resetPos();
    }
    function update(dt){
      if(readyT>0){ readyT -= dt; return; }
      if(fright>0) fright -= dt;
      step(p,dt,playerChoose);
      const cx = Math.round(p.x), cy = Math.round(p.y);
      if(Math.abs(p.x-cx)<.3 && Math.abs(p.y-cy)<.3){
        const ch = grid[cy][cx];
        if(ch==='.'){ grid[cy][cx] = ' '; pellets--; score += 10; api.setScore(score); api.sfx('tap'); }
        else if(ch==='o'){ grid[cy][cx] = ' '; pellets--; score += 50; api.setScore(score); fright = 6.5; api.sfx('good'); }
      }
      ghosts.forEach(gh=>{
        gh.sp = gh.eaten>0 ? 6 : fright>0 ? 2.4 : Math.min(4.3,3.3+level*.15);
        step(gh,dt,ghostChoose);
        if(gh.eaten>0 && Math.abs(gh.x-gh.home[0])<.1 && Math.abs(gh.y-gh.home[1])<.1) gh.eaten = 0;
      });
      for(const gh of ghosts){
        if(gh.eaten>0) continue;
        if(Math.hypot(gh.x-p.x,gh.y-p.y)<.6){
          if(fright>0){ gh.eaten = 1; score += 200; api.setScore(score); api.sfx('win'); api.toast('+200'); }
          else { hurt(); return; }
        }
      }
      if(pellets<=0){ level++; score += 100; api.setScore(score); api.sfx('win'); api.toast('Niveau '+level+' !'); lives = Math.min(5,lives+1); build(); info(); }
    }
    function draw(){
      g.fillStyle = '#05050f'; g.fillRect(0,0,W,H);
      for(let y=0;y<NR;y++) for(let x=0;x<NC;x++){
        const ch = grid[y][x];
        if(ch==='#'){ g.fillStyle = '#1d4ed8'; rrect(g,x*CS+2,y*CS+2,CS-4,CS-4,5); g.fill(); }
        else if(ch==='.'){ g.fillStyle = '#ffe9b0'; g.beginPath(); g.arc(x*CS+CS/2,y*CS+CS/2,2.2,0,TAU); g.fill(); }
        else if(ch==='o'){ g.fillStyle = '#fff'; g.beginPath(); g.arc(x*CS+CS/2,y*CS+CS/2,5.5+Math.sin(Date.now()/140)*1,0,TAU); g.fill(); }
      }
      const mouth = (Math.sin(Date.now()/70)+1)/2*.6+.05, ang = p.d[0]>0 ? 0 : p.d[0]<0 ? Math.PI : p.d[1]>0 ? Math.PI/2 : p.d[1]<0 ? -Math.PI/2 : 0;
      g.fillStyle = '#ffd23f'; g.beginPath(); g.moveTo(p.x*CS+CS/2,p.y*CS+CS/2); g.arc(p.x*CS+CS/2,p.y*CS+CS/2,CS/2-2,ang+mouth,ang+TAU-mouth); g.closePath(); g.fill();
      ghosts.forEach(gh=>{
        const x = gh.x*CS+CS/2, y = gh.y*CS+CS/2, fr = fright>0 && gh.eaten<=0, blink = fright<2 && Math.floor(fright*6)%2;
        if(gh.eaten>0){ g.fillStyle = '#fff'; g.fillRect(x-5,y-2,3,3); g.fillRect(x+2,y-2,3,3); return; }
        g.fillStyle = fr ? (blink ? '#fff' : '#2563eb') : gh.col; g.beginPath(); g.arc(x,y-1,CS/2-2,Math.PI,0); g.lineTo(x+CS/2-2,y+CS/2-2); g.lineTo(x+CS/4,y+CS/2-5); g.lineTo(x,y+CS/2-2); g.lineTo(x-CS/4,y+CS/2-5); g.lineTo(x-CS/2+2,y+CS/2-2); g.closePath(); g.fill();
        g.fillStyle = '#fff'; g.fillRect(x-5,y-4,4,4); g.fillRect(x+1,y-4,4,4);
      });
      if(readyT>0){ g.fillStyle = '#ffd23f'; g.font = '800 18px sans-serif'; g.textAlign = 'center'; g.fillText('PRÊT !',W/2,H/2+30); }
    }
    api.loop(dt=>{ update(dt); draw(); });
    api.swipe(api.root, setDir, { continuous:true, threshold:16 }); api.onKey(k=>setDir(k));
    api.buttons([{ t:'◀', down:()=>setDir('left') },{ t:'▲', down:()=>setDir('up') },{ t:'▼', down:()=>setDir('down') },{ t:'▶', down:()=>setDir('right') }]);
    build(); info(); draw();
  }
});

/* ---------------------------------------------------------- SAUTE-NUAGES */
R({ id:'sautenuages', name:'Saute-nuages', emoji:'🦘', cat:'Arcade', hue:195,
  desc:'Rebondis de nuage en nuage le plus haut possible.',
  how:"Ton personnage rebondit tout seul. Fais glisser ton doigt (ou flèches ◀ ▶) pour le diriger vers la gauche ou la droite et atterrir sur les nuages. Les nuages bleus bougent, les bruns se brisent, les ressorts rouges te propulsent très haut. Ne tombe pas !",
  create(api){
    const W = 320, H = 480, c = api.canvas(W,H), g = c.g;
    let p = { x:160, y:400, vy:-520 }, plats = [], cam = 0, best = 0, score = 0, targetX = 160, topY = 480;
    function addPlat(y){
      const t = Math.random(); const level = Math.min(1,score/1500);
      const type = t<.12+level*.12 ? 'move' : t<.2+level*.2 ? 'break' : t<.27 ? 'spring' : 'norm';
      plats.push({ x:rndf(10,W-70), y, w:60, type, dir:Math.random()<.5?-1:1, gone:false });
    }
    plats.push({ x:130, y:440, w:60, type:'norm', dir:1, gone:false }); topY = 440;
    while(topY>-200){ topY -= rndf(55,95); addPlat(topY); }
    function update(dt){
      if(api.keys.left) targetX = p.x-80; if(api.keys.right) targetX = p.x+80;
      p.x += clamp(targetX-p.x,-420*dt,420*dt); if(p.x<-10) p.x += W+20; else if(p.x>W+10) p.x -= W+20;
      const prev = p.y; p.vy += 1050*dt; p.y += p.vy*dt;
      if(p.vy>0){
        for(const pl of plats){ if(pl.gone) continue;
          if(p.x>pl.x-8 && p.x<pl.x+pl.w+8 && prev+14<=pl.y+2 && p.y+14>=pl.y){
            if(pl.type==='break'){ pl.gone = true; api.sfx('bad'); continue; }
            p.vy = pl.type==='spring' ? -860 : -540; p.y = pl.y-14; api.sfx(pl.type==='spring' ? 'win' : 'jump'); break; } }
      }
      plats.forEach(pl=>{ if(pl.type==='move'){ pl.x += pl.dir*60*dt; if(pl.x<0||pl.x+pl.w>W) pl.dir *= -1; } });
      if(p.y<cam+200) cam = p.y-200;
      const h = Math.floor((400-p.y)/10); if(h>best){ best = h; score = h; api.setScore(score); }
      while(topY>cam-100){ topY -= rndf(55,95)+Math.min(35,score/60); addPlat(topY); }
      plats = plats.filter(pl=>pl.y<cam+H+60);
      if(p.y>cam+H+40){ api.sfx('lose'); api.end(score,{ title:'Tu es tombé !', msg:'Altitude : '+score+' m' }); }
    }
    function draw(){
      const k = clamp(score/2500,0,1); const sky = g.createLinearGradient(0,0,0,H); sky.addColorStop(0,`hsl(${210+k*30},70%,${60-k*40}%)`); sky.addColorStop(1,`hsl(${200+k*30},70%,${85-k*50}%)`); g.fillStyle = sky; g.fillRect(0,0,W,H);
      plats.forEach(pl=>{ if(pl.gone) return; const y = pl.y-cam; g.fillStyle = pl.type==='move' ? '#3b82f6' : pl.type==='break' ? '#a16207' : pl.type==='spring' ? '#e5e7eb' : '#fff'; rrect(g,pl.x,y,pl.w,12,6); g.fill();
        if(pl.type==='spring'){ g.fillStyle = '#ef4444'; g.fillRect(pl.x+pl.w/2-8,y-8,16,8); } });
      const y = p.y-cam; g.fillStyle = '#ff9d6c'; g.beginPath(); g.arc(p.x,y-4,13,0,TAU); g.fill(); g.fillStyle = '#fff'; g.beginPath(); g.arc(p.x-4,y-7,4,0,TAU); g.arc(p.x+4,y-7,4,0,TAU); g.fill(); g.fillStyle = '#111'; g.beginPath(); g.arc(p.x-3,y-7,1.8,0,TAU); g.arc(p.x+5,y-7,1.8,0,TAU); g.fill();
      g.fillStyle = '#ff9d6c'; g.fillRect(p.x-8,y+7,5,8); g.fillRect(p.x+3,y+7,5,8);
    }
    followX(api, c, x=>{ targetX = x; });
    api.loop(dt=>{ update(dt); draw(); });
    draw();
  }
});

/* ---------------------------------------------------------- CHASSEUR */
R({ id:'chasseur', name:'Chasseur', emoji:'✈️', cat:'Arcade', hue:210,
  desc:'Pilote un avion de chasse et abats les ennemis.',
  how:"Fais glisser ton doigt (ou flèches) pour piloter l'avion : il tire tout seul. Détruis les ennemis, ramasse les ⭐ pour tirer plus fort et les ❤️ pour gagner une vie. Évite les tirs ennemis ! 3 vies.",
  create(api){
    const W = 320, H = 480, c = api.canvas(W,H), g = c.g, pl = { x:160, y:430 };
    let bullets = [], en = [], eb = [], items = [], lives = 3, score = 0, power = 1, fireT = 0, spT = 1, t = 0, inv = 0, sx = 160;
    const info = ()=> api.setInfo('❤️'.repeat(lives)+' • Puissance '+power);
    function spawn(){
      const r = Math.random(), x = rndf(24,W-24);
      if(r<.55) en.push({ k:'a', x, y:-20, hp:1, r:14, vy:rndf(80,120)+t*.8, ph:rndf(0,6), x0:x });
      else if(r<.8 || t<20) en.push({ k:'c', x, y:-20, hp:1, r:12, vy:rndf(130,180)+t, vx:(x<W/2?1:-1)*rndf(30,70) });
      else en.push({ k:'b', x, y:-24, hp:4, r:18, vy:55, sh:rndf(.5,1.2) });
    }
    function hurt(){
      if(inv>0) return; lives--; inv = 2; api.sfx('boom'); api.vibrate(150); info();
      if(lives<=0) api.end(score,{ title:'Avion abattu', msg:'Puissance atteinte : '+power });
    }
    function update(dt){
      t += dt; if(inv>0) inv -= dt;
      if(api.keys.left) sx -= 300*dt; if(api.keys.right) sx += 300*dt; sx = clamp(sx,16,W-16);
      pl.x += clamp(sx-pl.x,-420*dt,420*dt);
      if(api.keys.up) pl.y = Math.max(300,pl.y-240*dt); if(api.keys.down) pl.y = Math.min(450,pl.y+240*dt);
      fireT -= dt; if(fireT<=0){ fireT = .2; api.sfx('shoot');
        if(power===1) bullets.push({ x:pl.x, y:pl.y-16, vx:0 }); else if(power===2){ bullets.push({ x:pl.x-8, y:pl.y-14, vx:0 }); bullets.push({ x:pl.x+8, y:pl.y-14, vx:0 }); }
        else { bullets.push({ x:pl.x, y:pl.y-16, vx:0 }); bullets.push({ x:pl.x-8, y:pl.y-12, vx:-70 }); bullets.push({ x:pl.x+8, y:pl.y-12, vx:70 }); } }
      bullets.forEach(b=>{ b.y -= 520*dt; b.x += b.vx*dt; }); bullets = bullets.filter(b=>b.y>-10);
      spT -= dt; if(spT<=0){ spawn(); spT = Math.max(.35,1.15-t*.012); }
      en.forEach(e=>{
        e.y += e.vy*dt; if(e.k==='a') e.x = e.x0+Math.sin(t*2+e.ph)*40; else if(e.k==='c') e.x += e.vx*dt;
        if(e.k==='b'){ e.sh -= dt; if(e.sh<=0){ e.sh = 1.3; const a = Math.atan2(pl.y-e.y,pl.x-e.x); eb.push({ x:e.x, y:e.y+10, vx:Math.cos(a)*150, vy:Math.sin(a)*150 }); } }
      });
      eb.forEach(b=>{ b.x += b.vx*dt; b.y += b.vy*dt; }); eb = eb.filter(b=>b.y<H+10&&b.y>-10&&b.x>-10&&b.x<W+10);
      items.forEach(i=>{ i.y += 90*dt; }); items = items.filter(i=>i.y<H+20);
      bullets.forEach(b=>{ for(const e of en){ if(e.hp>0 && Math.abs(b.x-e.x)<e.r && Math.abs(b.y-e.y)<e.r){ e.hp--; b.y = -99; api.sfx('tap');
        if(e.hp<=0){ score += e.k==='b' ? 40 : 15; api.setScore(score); api.sfx('boom'); if(Math.random()<.14) items.push({ x:e.x, y:e.y, k:Math.random()<.7?'s':'h' }); } break; } } });
      en = en.filter(e=>e.hp>0 && e.y<H+30);
      if(inv<=0){
        for(const b of eb){ if(Math.hypot(b.x-pl.x,b.y-pl.y)<10){ b.y = 999; hurt(); break; } }
        for(const e of en){ if(Math.hypot(e.x-pl.x,e.y-pl.y)<e.r+8){ e.hp = 0; hurt(); break; } }
      }
      items = items.filter(i=>{ if(Math.hypot(i.x-pl.x,i.y-pl.y)<20){ if(i.k==='s'){ power = Math.min(3,power+1); score += 20; } else lives = Math.min(5,lives+1); api.setScore(score); api.sfx('win'); info(); return false; } return true; });
    }
    function draw(){
      g.fillStyle = '#071226'; g.fillRect(0,0,W,H); g.fillStyle = '#ffffff55'; for(let i=0;i<40;i++) g.fillRect((i*89)%W,((i*47)+t*60*(1+i%3))%H,1.5,1.5);
      g.fillStyle = '#ffd166'; bullets.forEach(b=>g.fillRect(b.x-1.5,b.y-7,3,10)); g.fillStyle = '#ff6b6b'; eb.forEach(b=>{ g.beginPath(); g.arc(b.x,b.y,3.5,0,TAU); g.fill(); });
      en.forEach(e=>{ g.fillStyle = '#fff'; emoji(g, e.k==='a' ? '🛸' : e.k==='c' ? '👾' : '🛩️', e.x, e.y, e.k==='b' ? 36 : 26); });
      items.forEach(i=>{ g.fillStyle = '#fff'; emoji(g, i.k==='s' ? '⭐' : '❤️', i.x, i.y, 22); });
      if(inv<=0 || Math.floor(inv*10)%2){ g.fillStyle = '#7fe0b3'; g.beginPath(); g.moveTo(pl.x,pl.y-18); g.lineTo(pl.x+14,pl.y+12); g.lineTo(pl.x,pl.y+6); g.lineTo(pl.x-14,pl.y+12); g.closePath(); g.fill(); g.fillStyle = '#ffb347'; g.fillRect(pl.x-2,pl.y+8,4,5+Math.random()*5); }
    }
    followX(api, c, x=>{ sx = x; });
    api.loop(dt=>{ update(dt); draw(); });
    info(); draw();
  }
});

/* ---------------------------------------------------------- AIR HOCKEY */
R({ id:'airhockey', name:'Air hockey', emoji:'🏒', cat:'Sport', hue:200, scoreLabel:'Points',
  desc:'Envoie le palet dans le but adverse.',
  how:"Fais glisser ton doigt pour déplacer ta raquette (en bas) et frapper le palet. Marque dans le but du haut ! Le premier à 5 buts gagne la manche : +5 points. Une défaite met fin à la partie.",
  create(api){
    const W = 320, H = 480, GOAL = 110, c = api.canvas(W,H), g = c.g, MR = 24, PR = 13;
    const me = { x:160, y:410, vx:0, vy:0 }, ai = { x:160, y:70, vx:0, vy:0 }, puck = { x:160, y:240, vx:0, vy:0 };
    let sc = [0,0], round = 0, pts = 0, wait = 0, tx = 160, ty = 410, serve = 1;
    const info = ()=> api.setInfo('Manche '+round+' • Toi '+sc[0]+' – IA '+sc[1]);
    function resetPuck(dir){ puck.x = 160; puck.y = 240; puck.vx = 0; puck.vy = 0; wait = .9; serve = dir; }
    function hit(m){
      const dx = puck.x-m.x, dy = puck.y-m.y, d = Math.hypot(dx,dy), min = MR+PR;
      if(d<min && d>0){
        const nx = dx/d, ny = dy/d; puck.x = m.x+nx*min; puck.y = m.y+ny*min;
        let rvx = puck.vx-m.vx, rvy = puck.vy-m.vy; const dot = rvx*nx+rvy*ny;
        if(dot<0){ rvx -= 1.9*dot*nx; rvy -= 1.9*dot*ny; puck.vx = m.vx+rvx; puck.vy = m.vy+rvy; }
        const sp = Math.hypot(puck.vx,puck.vy); if(sp<200){ puck.vx = nx*220; puck.vy = ny*220; } if(sp>720){ puck.vx *= 720/sp; puck.vy *= 720/sp; }
        api.sfx('tap');
      }
    }
    function score(w){
      sc[w]++; api.sfx(w===0 ? 'good' : 'bad'); info();
      if(sc[0]>=5){ pts += 5; api.setScore(pts); api.sfx('win'); api.toast('Manche gagnée ! +5'); wait = 99; api.after(1500,newRound); return; }
      if(sc[1]>=5){ wait = 99; api.end(pts,{ title:"L'IA gagne la manche", msg:'Tu as gagné '+(round-1)+' manche(s).' }); return; }
      resetPuck(w===0 ? -1 : 1);
    }
    function update(dt){
      // raquette du joueur : suit le doigt (moitié basse)
      const nx = clamp(tx,MR,W-MR), ny = clamp(ty,H/2+MR,H-MR);
      me.vx = (nx-me.x)/dt; me.vy = (ny-me.y)/dt; const ms = Math.hypot(me.vx,me.vy); if(ms>900){ me.vx *= 900/ms; me.vy *= 900/ms; }
      me.x += me.vx*dt; me.y += me.vy*dt;
      // IA
      const sp = 190+round*35, home = { x:W/2, y:62 }; let gx = home.x, gy = home.y;
      if(puck.y<H/2 || Math.abs(puck.vy)<30){ gx = puck.x; gy = Math.min(puck.y-30, H/2-MR); if(puck.y<H/2 && puck.y>ai.y){ gy = puck.y-24; } }
      gx = clamp(gx,MR,W-MR); gy = clamp(gy,MR,H/2-MR);
      const dx = gx-ai.x, dy = gy-ai.y, dist = Math.hypot(dx,dy) || 1, mv = Math.min(dist,sp*dt);
      ai.vx = dx/dist*mv/dt; ai.vy = dy/dist*mv/dt; ai.x += dx/dist*mv; ai.y += dy/dist*mv;
      if(wait>0){ wait -= dt; if(wait<=0 && wait>-5){ puck.vy = serve*220; puck.vx = rndf(-60,60); } return; }
      puck.x += puck.vx*dt; puck.y += puck.vy*dt; const f = Math.pow(.78,dt); puck.vx *= f; puck.vy *= f;
      if(puck.x<PR){ puck.x = PR; puck.vx = Math.abs(puck.vx); api.sfx('move'); } if(puck.x>W-PR){ puck.x = W-PR; puck.vx = -Math.abs(puck.vx); api.sfx('move'); }
      const inGoal = Math.abs(puck.x-W/2)<GOAL/2;
      if(puck.y<PR && !inGoal){ puck.y = PR; puck.vy = Math.abs(puck.vy); } if(puck.y>H-PR && !inGoal){ puck.y = H-PR; puck.vy = -Math.abs(puck.vy); }
      if(puck.y<-PR) return score(0); if(puck.y>H+PR) return score(1);
      hit(me); hit(ai);
    }
    function draw(){
      g.fillStyle = '#0b3b5e'; g.fillRect(0,0,W,H); g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = 3; g.strokeRect(2,2,W-4,H-4);
      g.beginPath(); g.moveTo(0,H/2); g.lineTo(W,H/2); g.stroke(); g.beginPath(); g.arc(W/2,H/2,46,0,TAU); g.stroke();
      g.fillStyle = '#0b3b5e'; g.fillRect(W/2-GOAL/2,0,GOAL,6); g.fillRect(W/2-GOAL/2,H-6,GOAL,6); g.fillStyle = '#e74c3c'; g.fillRect(W/2-GOAL/2,0,GOAL,3); g.fillRect(W/2-GOAL/2,H-3,GOAL,3);
      [[ai,'#ff9d6c'],[me,'#7fe0b3']].forEach(([m,col])=>{ g.fillStyle = col; g.beginPath(); g.arc(m.x,m.y,MR,0,TAU); g.fill(); g.fillStyle = 'rgba(0,0,0,.25)'; g.beginPath(); g.arc(m.x,m.y,MR*.5,0,TAU); g.fill(); });
      g.fillStyle = '#111'; g.beginPath(); g.arc(puck.x,puck.y,PR,0,TAU); g.fill(); g.strokeStyle = '#fff'; g.lineWidth = 2; g.stroke();
    }
    function newRound(){ round++; sc = [0,0]; ai.x = 160; ai.y = 70; me.x = 160; me.y = 410; tx = 160; ty = 410; info(); resetPuck(round%2 ? 1 : -1); }
    const move = e=>{ const p = c.pos(e); tx = p.x; ty = p.y; };
    api.on(api.root,'pointerdown',move); api.on(api.root,'pointermove',move);
    api.loop(dt=>{ update(dt); draw(); });
    newRound();
  }
});

/* ---------------------------------------------------------- TIRS AU BUT */
R({ id:'penalty', name:'Tirs au but', emoji:'⚽', cat:'Sport', hue:120,
  desc:'Marque un maximum de penalties.',
  how:"Touche le but à l'endroit où tu veux tirer : plus tu vises les coins hauts, plus c'est dur pour le gardien ! 5 tirs par série. Il faut marquer au moins 3 buts pour continuer, mais le gardien apprend tes habitudes… Chaque but = 10 points.",
  create(api){
    const W = 320, H = 480, c = api.canvas(W,H), g = c.g, GX = 40, GW = 240, GY = 110, GH = 100;
    let shot = 0, goals = 0, serie = 1, score = 0, busy = false, ball = { x:160, y:400, r:14 }, keeper = { x:160, y:GY+GH-20, tx:160 }, anim = null, msg = '', history = [0,0,0];
    function zoneOf(x){ return x<GX+GW/3 ? 0 : x<GX+2*GW/3 ? 1 : 2; }
    const info = ()=> api.setInfo('Série '+serie+' • tir '+Math.min(5,shot+1)+'/5 • buts '+goals);
    function shoot(tx,ty){
      if(busy || api.ended) return; busy = true; api.sfx('shoot');
      const inGoal = tx>GX && tx<GX+GW && ty>GY && ty<GY+GH; const z = inGoal ? zoneOf(tx) : -1; if(inGoal) history[z]++;
      const sum = history[0]+history[1]+history[2]; let kz;
      const smart = Math.min(.55,.12+serie*.08);
      if(Math.random()<smart && sum>1){ const r = Math.random()*sum; kz = r<history[0] ? 0 : r<history[0]+history[1] ? 1 : 2; } else kz = rnd(3);
      const kx = GX+GW/6+kz*GW/3;
      const topCorner = inGoal && ty<GY+GH*.38 && (tx<GX+GW*.16 || tx>GX+GW*.84);
      const saved = inGoal && z===kz && !topCorner && Math.hypot(tx-kx,ty-(GY+GH*.6))<110;
      anim = { t:0, sx:ball.x, sy:ball.y, tx, ty, kx, saved, inGoal };
    }
    function result(){
      shot++;
      if(anim.inGoal && !anim.saved){ goals++; score += 10; api.setScore(score); api.sfx('win'); msg = 'BUT ! ⚽'; }
      else { api.sfx('bad'); msg = anim.inGoal ? 'ARRÊTÉ ! 🧤' : 'À CÔTÉ ! 😬'; }
      info(); anim = null; ball.x = 160; ball.y = 400; ball.r = 14; keeper.x = 160;
      api.after(1100,()=>{
        msg = '';
        if(shot>=5){ if(goals>=3){ api.toast('Série réussie ! Suivante…'); serie++; shot = 0; goals = 0; busy = false; info(); } else api.end(score,{ title:'Série terminée', msg:goals+' but'+(goals>1?'s':'')+' sur 5 : il en faut 3 pour continuer.' }); }
        else busy = false;
      });
    }
    function draw(){
      g.fillStyle = '#2e8b57'; g.fillRect(0,0,W,H); g.fillStyle = '#35a064'; for(let i=0;i<8;i++) g.fillRect(0,i*60,W,30);
      g.fillStyle = 'rgba(255,255,255,.12)'; g.fillRect(GX,GY,GW,GH); g.strokeStyle = '#fff'; g.lineWidth = 5; g.strokeRect(GX,GY,GW,GH);
      g.strokeStyle = 'rgba(255,255,255,.25)'; g.lineWidth = 1; for(let x=GX;x<=GX+GW;x+=16){ g.beginPath(); g.moveTo(x,GY); g.lineTo(x,GY+GH); g.stroke(); } for(let y=GY;y<=GY+GH;y+=16){ g.beginPath(); g.moveTo(GX,y); g.lineTo(GX+GW,y); g.stroke(); }
      g.fillStyle = '#fff'; g.fillRect(150,395+14,20,2); g.beginPath(); g.arc(160,400,3,0,TAU); g.fill();
      const kx = anim ? keeper.x : 160; g.fillStyle = '#fff'; emoji(g,'🧤',kx,GY+GH-28,42);
      g.fillStyle = '#fff'; emoji(g,'⚽',ball.x,ball.y,ball.r*2);
      if(msg){ g.fillStyle = 'rgba(0,0,0,.55)'; rrect(g,40,250,240,56,12); g.fill(); g.fillStyle = '#fff'; g.font = '800 26px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(msg,W/2,279); }
      if(!busy){ g.fillStyle = '#fff'; g.font = '700 14px sans-serif'; g.textAlign = 'center'; g.fillText('Touche le but pour tirer !',W/2,300); }
    }
    api.loop(dt=>{
      if(anim){
        anim.t += dt/.55; const k = Math.min(1,anim.t), e = 1-Math.pow(1-k,2);
        ball.x = anim.sx+(anim.tx-anim.sx)*e; ball.y = anim.sy+(anim.ty-anim.sy)*e; ball.r = 14-6*e;
        keeper.x += (anim.kx-keeper.x)*Math.min(1,dt*9);
        if(k>=1){ const a = anim; result(); }
      }
      draw();
    });
    api.on(api.root,'pointerdown',e=>{ const p = c.pos(e); shoot(p.x,p.y); });
    info(); draw();
  }
});

/* ---------------------------------------------------------- JONGLEUR */
R({ id:'jongleur', name:'Jongleur', emoji:'🥅', cat:'Sport', hue:140,
  desc:'Garde le ballon en l\'air le plus longtemps possible.',
  how:"Touche le ballon pour le renvoyer en l'air. Touche-le sur le côté pour l'envoyer de l'autre côté : plus tu tapes loin du centre, plus il part de côté. Chaque touche = +1 point. Si le ballon tombe, c'est fini !",
  create(api){
    const W = 320, H = 480, c = api.canvas(W,H), g = c.g, R = 24;
    let b = { x:160, y:200, vx:0, vy:0, rot:0 }, score = 0, tm = 0, started = false;
    function kick(p){
      const dx = b.x-p.x, dy = b.y-p.y; if(Math.hypot(dx,dy)>R+24 || api.ended) return;
      started = true; b.vy = -540-Math.min(60,score); b.vx = clamp(dx*7,-260,260)+rndf(-12,12); b.rot += dx*.03;
      score++; api.setScore(score); api.sfx(score%10===0 ? 'win' : 'tap'); api.vibrate(15);
    }
    api.on(api.root,'pointerdown',e=>kick(c.pos(e)));
    api.loop(dt=>{
      tm += dt;
      if(started){ b.vy += (950+score*6)*dt; b.x += b.vx*dt; b.y += b.vy*dt; b.rot += b.vx*dt*.02; }
      else b.y = 200+Math.sin(tm*3)*8;
      if(b.x<R){ b.x = R; b.vx = Math.abs(b.vx); } if(b.x>W-R){ b.x = W-R; b.vx = -Math.abs(b.vx); }
      if(b.y<R){ b.y = R; b.vy = Math.abs(b.vy)*.5; }
      if(b.y>H-R+10){ api.sfx('lose'); api.end(score,{ title:'Le ballon est tombé !', msg:score+' touches.' }); return; }
      const sky = g.createLinearGradient(0,0,0,H); sky.addColorStop(0,'#5bb8f0'); sky.addColorStop(1,'#bfe8ff'); g.fillStyle = sky; g.fillRect(0,0,W,H);
      g.fillStyle = '#3aa655'; g.fillRect(0,H-36,W,36);
      g.fillStyle = 'rgba(0,0,0,.18)'; g.beginPath(); g.ellipse(b.x,H-30,R*(1-Math.min(.6,(H-b.y)/700)*.0),6,0,0,TAU); g.fill();
      g.save(); g.translate(b.x,b.y); g.rotate(b.rot); g.fillStyle = '#fff'; emoji(g,'⚽',0,0,R*2); g.restore();
      if(!started){ g.fillStyle = '#17304a'; g.font = '700 16px sans-serif'; g.textAlign = 'center'; g.fillText('Touche le ballon !',W/2,120); }
    });
  }
});

/* ---------------------------------------------------------- BASKET */
R({ id:'basket', name:'Basket', emoji:'🏀', cat:'Sport', hue:25,
  desc:'Tire à la fronde et marque un maximum de paniers.',
  how:"Pose ton doigt sur le ballon, tire vers le bas pour viser (les points montrent la trajectoire) puis relâche pour lancer. Fais entrer le ballon par le haut du panier : +2 points. Tu as 60 secondes ! Le panier se met à bouger quand tu marques beaucoup.",
  create(api){
    const W = 320, H = 480, c = api.canvas(W,H), g = c.g, BR = 13;
    let ball = { x:160, y:410, vx:0, vy:0, fly:false }, hoop = { x:160, y:150, w:70, dir:1 }, drag = null, score = 0, tLeft = 60, made = 0, wait = 0, scored = false, prevY = 410;
    const G = 900;
    const vel = d=>({ vx:clamp((ball.x-d.x)*5.2,-520,520), vy:clamp((ball.y-d.y)*5.2,-950,-120) });
    function reset(){ ball = { x:rndf(90,230), y:410, vx:0, vy:0, fly:false }; scored = false; }
    function update(dt){
      tLeft -= dt; api.setInfo('⏱️ '+Math.max(0,Math.ceil(tLeft))+' s • 🏀 '+made); if(tLeft<=0){ api.end(score,{ title:'Temps écoulé !', msg:made+' panier'+(made>1?'s':'')+' marqué'+(made>1?'s':'')+'.' }); return; }
      if(made>=4){ hoop.x += hoop.dir*Math.min(90,30+made*5)*dt; if(hoop.x<70){ hoop.x = 70; hoop.dir = 1; } if(hoop.x>W-70){ hoop.x = W-70; hoop.dir = -1; } }
      if(ball.fly){
        prevY = ball.y; ball.vy += G*dt; ball.x += ball.vx*dt; ball.y += ball.vy*dt;
        const L = hoop.x-hoop.w/2, Rr = hoop.x+hoop.w/2;
        [[L,hoop.y],[Rr,hoop.y]].forEach(([rx,ry])=>{ const dx = ball.x-rx, dy = ball.y-ry, d = Math.hypot(dx,dy); if(d<BR+4 && d>0){ const nx = dx/d, ny = dy/d, dot = ball.vx*nx+ball.vy*ny; if(dot<0){ ball.vx -= 1.6*dot*nx; ball.vy -= 1.6*dot*ny; api.sfx('move'); } ball.x = rx+nx*(BR+4); ball.y = ry+ny*(BR+4); } });
        if(!scored && ball.vy>0 && prevY<hoop.y && ball.y>=hoop.y && ball.x>L+3 && ball.x<Rr-3){ scored = true; made++; score += 2; api.setScore(score); api.sfx('win'); api.toast('Panier ! +2'); wait = .9; }
        if(ball.x<BR){ ball.x = BR; ball.vx = Math.abs(ball.vx)*.7; } if(ball.x>W-BR){ ball.x = W-BR; ball.vx = -Math.abs(ball.vx)*.7; }
        if(wait>0){ wait -= dt; if(wait<=0){ wait = 0; reset(); return; } }
        if(ball.y>H+30) reset();
      }
    }
    function draw(){
      g.fillStyle = '#ffedd5'; g.fillRect(0,0,W,H); g.fillStyle = '#c2763a'; g.fillRect(0,H-30,W,30);
      g.fillStyle = '#fff'; g.fillRect(hoop.x-hoop.w/2-6,hoop.y-70,hoop.w+12,60); g.strokeStyle = '#ef4444'; g.lineWidth = 3; g.strokeRect(hoop.x-18,hoop.y-48,36,28);
      g.strokeStyle = '#e5e7eb'; g.lineWidth = 1.5; for(let i=0;i<=6;i++){ g.beginPath(); g.moveTo(hoop.x-hoop.w/2+i*hoop.w/6,hoop.y); g.lineTo(hoop.x-hoop.w/2+10+i*(hoop.w-20)/6,hoop.y+34); g.stroke(); }
      g.strokeStyle = '#ef4444'; g.lineWidth = 5; g.beginPath(); g.moveTo(hoop.x-hoop.w/2,hoop.y); g.lineTo(hoop.x+hoop.w/2,hoop.y); g.stroke();
      if(drag && !ball.fly){ const v = vel(drag); let x = ball.x, y = ball.y, vx = v.vx, vy = v.vy; g.fillStyle = 'rgba(194,118,58,.7)'; for(let i=0;i<16;i++){ x += vx*.045; y += vy*.045; vy += G*.045; g.beginPath(); g.arc(x,y,3,0,TAU); g.fill(); } }
      g.fillStyle = '#fff'; emoji(g,'🏀',ball.x,ball.y,BR*2.2);
    }
    api.on(api.root,'pointerdown',e=>{ if(ball.fly) return; const p = c.pos(e); if(Math.hypot(p.x-ball.x,p.y-ball.y)<60) drag = p; });
    api.on(api.root,'pointermove',e=>{ if(drag) drag = c.pos(e); });
    api.on(window,'pointerup',()=>{ if(drag && !ball.fly){ const v = vel(drag); if(drag.y-ball.y>10){ ball.vx = v.vx; ball.vy = v.vy; ball.fly = true; api.sfx('jump'); } drag = null; } });
    api.loop(dt=>{ update(dt); draw(); });
    draw();
  }
});

/* ---------------------------------------------------------- TIR À L'ARC */
R({ id:'arc', name:"Tir à l'arc", emoji:'🏹', cat:'Sport', hue:90,
  desc:'Vise le centre de la cible.',
  how:"Maintiens ton doigt appuyé pour bander l'arc : le viseur se stabilise peu à peu (mais ta force s'épuise !). Relâche pour tirer. Le vent dévie la flèche. Plus tu touches près du centre, plus tu marques (jusqu'à 10). 10 flèches.",
  create(api){
    const W = 320, H = 480, TX = 160, TY = 170, c = api.canvas(W,H), g = c.g, RR = 60;
    let arrows = 0, score = 0, hold = false, hT = 0, stamina = 1, t = 0, wind = rndf(-14,14), shots = [], lock = false, aim = { x:160, y:170 };
    const ringPts = d=> d<RR*.1 ? 10 : d<RR*.3 ? 8 : d<RR*.5 ? 6 : d<RR*.75 ? 4 : d<RR ? 2 : 0;
    const info = ()=> api.setInfo('Flèche '+Math.min(10,arrows+1)+'/10 • vent '+(wind<0?'⬅️':'➡️')+Math.abs(Math.round(wind)));
    function release(){
      if(!hold || lock || api.ended) return; hold = false; lock = true; api.sfx('shoot');
      const x = aim.x+wind, y = aim.y, d = Math.hypot(x-TX,y-TY), p = ringPts(d);
      shots.push({ x, y }); arrows++; score += p; api.setScore(score);
      api.toast(p===10 ? '🎯 Plein centre ! +10' : p>0 ? '+'+p : 'Raté…'); if(p>=8) api.sfx('win'); else if(p>0) api.sfx('good'); else api.sfx('bad');
      wind = clamp(wind+rndf(-8,8),-20,20); hT = 0; stamina = 1;
      api.after(900,()=>{ if(arrows>=10) api.end(score,{ win:score>=70, title:'Concours terminé !', msg:score+' points sur 100.' }); else { lock = false; info(); } });
    }
    api.on(api.root,'pointerdown',()=>{ if(!lock && !api.ended){ hold = true; hT = 0; } });
    api.on(window,'pointerup',release); api.onKey(k=>{ if(k==='space') { hold = true; api.after(450,release); } });
    api.loop(dt=>{
      t += dt;
      if(hold){ hT += dt; stamina = Math.max(0,1-hT/3.2); }
      const amp = hold ? Math.max(4,46*(1-Math.min(hT,1.8)/2.2))+(stamina<.2 ? (1-stamina*5)*34 : 0) : 62;
      aim.x = TX+Math.sin(t*2.1)*amp; aim.y = TY+Math.cos(t*1.7)*amp*.8;
      const sky = g.createLinearGradient(0,0,0,H); sky.addColorStop(0,'#8fd3f4'); sky.addColorStop(1,'#d8f0c8'); g.fillStyle = sky; g.fillRect(0,0,W,H); g.fillStyle = '#4caf50'; g.fillRect(0,H-90,W,90);
      g.fillStyle = '#8a5a2f'; g.fillRect(TX-4,TY+RR,8,H-90-TY-RR);
      ['#fff','#111','#3b82f6','#ef4444','#facc15'].forEach((col,i)=>{ g.fillStyle = col; g.beginPath(); g.arc(TX,TY,RR*(1-i*.2),0,TAU); g.fill(); });
      shots.forEach(s=>{ g.fillStyle = '#7a4b1c'; g.beginPath(); g.arc(s.x,s.y,3.5,0,TAU); g.fill(); g.strokeStyle = '#fff'; g.lineWidth = 1; g.stroke(); });
      g.strokeStyle = hold ? '#ff3b3b' : 'rgba(255,255,255,.9)'; g.lineWidth = 2; g.beginPath(); g.arc(aim.x,aim.y,12,0,TAU); g.moveTo(aim.x-18,aim.y); g.lineTo(aim.x+18,aim.y); g.moveTo(aim.x,aim.y-18); g.lineTo(aim.x,aim.y+18); g.stroke();
      g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(40,H-40,240,10); g.fillStyle = stamina>.3 ? '#7fe0b3' : '#ef4444'; g.fillRect(40,H-40,240*stamina,10);
      g.fillStyle = '#fff'; g.font = '700 12px sans-serif'; g.textAlign = 'center'; g.fillText(hold ? 'Relâche pour tirer !' : 'Appuie et maintiens pour viser',W/2,H-50);
      g.fillStyle = '#fff'; emoji(g,'🏹',W/2,H-100,34);
    });
    info();
  }
});
})();

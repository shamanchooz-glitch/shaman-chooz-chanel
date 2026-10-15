/* ==========================================================
   LOT 4 — Puzzles et logique (12 jeux)
   Sokoban, Plomberie, Picross, Glissade, Embouteillage, Le 24,
   Suites logiques, Mots cachés, Éclairs, Compte vite, Orthographe,
   Taureaux & Vaches
   ========================================================== */
(function(){
'use strict';
const U = SCCG.util, rnd = U.rnd, rndf = U.rndf, shuffle = U.shuffle, pick = U.pick, el = U.el, esc = U.esc;
const R = d=>{ d.isNew = true; SCCG.register(d); };
const clamp = (v,a,b)=> Math.max(a, Math.min(b, v));
const TAU = Math.PI*2;
const rrect = (g,x,y,w,h,r)=>{ g.beginPath(); g.moveTo(x+r,y); g.arcTo(x+w,y,x+w,y+h,r); g.arcTo(x+w,y+h,x,y+h,r); g.arcTo(x,y+h,x,y,r); g.arcTo(x,y,x+w,y,r); g.closePath(); };
const emoji = (g,ch,x,y,size)=>{ g.font = size+'px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(ch,x,y); };
const DIRS4 = { up:[0,-1], down:[0,1], left:[-1,0], right:[1,0] };
function numpad(api, root, onKey){
  const box = el('div','g-num'); root.appendChild(box);
  ['1','2','3','4','5','6','7','8','9','⌫','0','✔'].forEach(k=>{ const b = el('button',null,k); api.on(b,'click',()=>{ api.sfx('tap'); onKey(k==='⌫' ? 'back' : k==='✔' ? 'ok' : k); }); box.appendChild(b); });
  api.onKey(k=>{ if(k.length===1 && k>='0' && k<='9') onKey(k); else if(k==='backspace') onKey('back'); else if(k==='enter') onKey('ok'); }, true);
}

/* ---------------------------------------------------------- SOKOBAN */
const SK = (function(){
  const W = 8, H = 8;
  function gen(level){
    for(let attempt=0; attempt<300; attempt++){
      const wall = Array.from({length:H},(_,y)=>Array.from({length:W},(_,x)=> x===0||y===0||x===W-1||y===H-1));
      const nIn = 2+rnd(4); for(let i=0;i<nIn;i++) wall[1+rnd(H-2)][1+rnd(W-2)] = true;
      const free = []; for(let y=1;y<H-1;y++) for(let x=1;x<W-1;x++) if(!wall[y][x]) free.push([x,y]);
      if(free.length<20) continue;
      const seen = {}, st = [free[0]]; seen[free[0].join()] = 1;
      while(st.length){ const [x,y] = st.pop(); for(const d of [[1,0],[-1,0],[0,1],[0,-1]]){ const nx = x+d[0], ny = y+d[1], k = nx+','+ny; if(!wall[ny][nx] && !seen[k]){ seen[k] = 1; st.push([nx,ny]); } } }
      const cells = free.filter(p=>seen[p.join()]); if(cells.length<18) continue;
      free.forEach(p=>{ if(!seen[p.join()]) wall[p[1]][p[0]] = true; });
      const k = Math.min(5,1+Math.floor(level/2)), sh = shuffle(cells), goals = sh.slice(0,k).map(p=>p.slice()), boxes = goals.map(p=>p.slice());
      let pl = sh[k].slice();
      const hasBox = (x,y)=> boxes.some(b=>b[0]===x&&b[1]===y), isFree = (x,y)=> !wall[y][x] && !hasBox(x,y);
      const steps = 60+level*16;
      for(let s=0;s<steps;s++){
        const d = pick([[1,0],[-1,0],[0,1],[0,-1]]), bx = pl[0]+d[0], by = pl[1]+d[1], px = pl[0]-d[0], py = pl[1]-d[1];
        const bi = boxes.findIndex(b=>b[0]===bx&&b[1]===by);
        if(bi>=0 && isFree(px,py) && Math.random()<.65){ boxes[bi] = [pl[0],pl[1]]; pl = [px,py]; }
        else if(isFree(bx,by)){ pl = [bx,by]; }
      }
      const off = boxes.filter(b=>!goals.some(g=>g[0]===b[0]&&g[1]===b[1])).length;
      if(off>=Math.min(k,level>2?2:1)) return { wall, goals, boxes, player:pl };
    }
    return { wall:Array.from({length:H},(_,y)=>Array.from({length:W},(_,x)=>x===0||y===0||x===W-1||y===H-1)), goals:[[5,3]], boxes:[[3,3]], player:[2,3] };
  }
  function solve(lv,limit){
    const key = (p,bs)=> p.join()+'|'+bs.map(b=>b.join()).sort().join(';');
    const start = { p:lv.player, bs:lv.boxes.map(b=>b.slice()) }, q = [start], seen = {}; seen[key(start.p,start.bs)] = 1; let n = 0;
    const done = bs=> bs.every(b=>lv.goals.some(g=>g[0]===b[0]&&g[1]===b[1]));
    if(done(start.bs)) return 0;
    for(let qi=0; qi<q.length && n<(limit||400000); qi++){
      const s = q[qi]; n++;
      for(const d of [[1,0],[-1,0],[0,1],[0,-1]]){
        const nx = s.p[0]+d[0], ny = s.p[1]+d[1]; if(lv.wall[ny][nx]) continue;
        const bi = s.bs.findIndex(b=>b[0]===nx&&b[1]===ny); let bs = s.bs;
        if(bi>=0){ const bx = nx+d[0], by = ny+d[1]; if(lv.wall[by][bx] || s.bs.some(b=>b[0]===bx&&b[1]===by)) continue; bs = s.bs.map((b,i)=>i===bi?[bx,by]:b); }
        const k = key([nx,ny],bs); if(seen[k]) continue; seen[k] = 1; if(done(bs)) return true; q.push({ p:[nx,ny], bs });
      }
    }
    return false;
  }
  return { gen, solve };
})();
SCCG.lab.sokoban = SK;
R({ id:'sokoban', name:'Sokoban', emoji:'📦', cat:'Réflexion', hue:30,
  desc:'Pousse les caisses sur les cibles.',
  how:"Pousse chaque caisse 📦 sur une case cible ⭕ en glissant ton doigt (ou flèches / boutons). Tu ne peux que POUSSER, jamais tirer : attention à ne pas coincer une caisse dans un coin ! Bouton ↩ pour annuler, ⟲ pour recommencer. Tu as 4 minutes pour résoudre un maximum de niveaux.",
  create(api){
    const CS = 40, c = api.canvas(8*CS,8*CS), g = c.g;
    let lv, wall, goals, boxes, pl, level = 0, score = 0, hist = [], tLeft = 240, done = false, moves = 0;
    const hasBox = (x,y)=> boxes.findIndex(b=>b[0]===x&&b[1]===y);
    function load(){ level++; lv = SK.gen(level); wall = lv.wall; goals = lv.goals; boxes = lv.boxes.map(b=>b.slice()); pl = lv.player.slice(); hist = []; moves = 0; info(); }
    const info = ()=> api.setInfo('Niveau '+level+' • ⏱️ '+Math.max(0,Math.ceil(tLeft))+' s');
    function move(dn){
      if(done || api.ended) return; const d = DIRS4[dn]; if(!d) return; const nx = pl[0]+d[0], ny = pl[1]+d[1]; if(wall[ny][nx]) return;
      const bi = hasBox(nx,ny); const snap = { pl:pl.slice(), boxes:boxes.map(b=>b.slice()) };
      if(bi>=0){ const bx = nx+d[0], by = ny+d[1]; if(wall[by][bx] || hasBox(bx,by)>=0){ api.sfx('bad'); return; } boxes[bi] = [bx,by]; api.sfx('tap'); } else api.sfx('move');
      hist.push(snap); pl = [nx,ny]; moves++;
      if(boxes.every(b=>goals.some(gl=>gl[0]===b[0]&&gl[1]===b[1]))){ done = true; score += 100; api.setScore(score); api.sfx('win'); api.toast('Niveau réussi ! +100'); api.after(900,()=>{ done = false; load(); }); }
    }
    function undo(){ if(done||!hist.length) return; const s = hist.pop(); pl = s.pl; boxes = s.boxes; api.sfx('move'); }
    function restart(){ if(done) return; pl = lv.player.slice(); boxes = lv.boxes.map(b=>b.slice()); hist = []; api.sfx('move'); }
    api.swipe(api.root, move, { threshold:22 }); api.onKey(k=>move(k));
    api.buttons([{ t:'◀', down:()=>move('left'), repeat:150 },{ t:'▲', down:()=>move('up'), repeat:150 },{ t:'▼', down:()=>move('down'), repeat:150 },{ t:'▶', down:()=>move('right'), repeat:150 },{ t:'↩', cls:'sm', down:undo },{ t:'⟲', cls:'sm', down:restart }]);
    api.every(1000,()=>{ if(done) return; tLeft--; info(); if(tLeft<=0) api.end(score,{ title:'Temps écoulé !', msg:(level-1)+' niveau(x) résolu(s).' }); });
    api.loop(()=>{
      g.fillStyle = '#1c1409'; g.fillRect(0,0,8*CS,8*CS);
      for(let y=0;y<8;y++) for(let x=0;x<8;x++){
        if(wall[y][x]){ g.fillStyle = '#5b4630'; rrect(g,x*CS+1,y*CS+1,CS-2,CS-2,5); g.fill(); g.fillStyle = '#6d5539'; g.fillRect(x*CS+4,y*CS+4,CS-8,5); }
        else { g.fillStyle = (x+y)%2 ? '#c9b28a' : '#d6c19a'; g.fillRect(x*CS,y*CS,CS,CS); }
      }
      goals.forEach(gl=>{ g.strokeStyle = '#e74c3c'; g.lineWidth = 4; g.beginPath(); g.arc(gl[0]*CS+CS/2,gl[1]*CS+CS/2,11,0,TAU); g.stroke(); });
      boxes.forEach(b=>{ const on = goals.some(gl=>gl[0]===b[0]&&gl[1]===b[1]); g.fillStyle = on ? '#2f8f5f' : '#a8672a'; rrect(g,b[0]*CS+4,b[1]*CS+4,CS-8,CS-8,6); g.fill(); g.strokeStyle = on ? '#7fe0b3' : '#6f4420'; g.lineWidth = 2; g.strokeRect(b[0]*CS+10,b[1]*CS+10,CS-20,CS-20); });
      g.fillStyle = '#fff'; emoji(g,'🙂',pl[0]*CS+CS/2,pl[1]*CS+CS/2+1,28);
    });
    api.setScore(0); load();
  }
});

/* ---------------------------------------------------------- PLOMBERIE */
const PIPE = (function(){
  const N = 1, E = 2, S = 4, Wd = 8;
  const rot = m=> ((m<<1)|(m>>3))&15;
  function gen(n){
    const mask = Array.from({length:n},()=>Array(n).fill(0)), seen = Array.from({length:n},()=>Array(n).fill(false));
    const sr = rnd(n), sc = rnd(n), st = [[sr,sc]]; seen[sr][sc] = true;
    while(st.length){
      const [r,c] = st[st.length-1], opts = [];
      if(r>0 && !seen[r-1][c]) opts.push([r-1,c,N,S]); if(c<n-1 && !seen[r][c+1]) opts.push([r,c+1,E,Wd]);
      if(r<n-1 && !seen[r+1][c]) opts.push([r+1,c,S,N]); if(c>0 && !seen[r][c-1]) opts.push([r,c-1,Wd,E]);
      if(!opts.length){ st.pop(); continue; }
      const o = pick(opts); mask[r][c] |= o[2]; mask[o[0]][o[1]] |= o[3]; seen[o[0]][o[1]] = true; st.push([o[0],o[1]]);
    }
    return { mask, src:[sr,sc] };
  }
  function reach(mask,n,src){
    const seen = Array.from({length:n},()=>Array(n).fill(false)); const st = [src.slice()]; seen[src[0]][src[1]] = true; let cnt = 1;
    while(st.length){
      const [r,c] = st.pop(), m = mask[r][c];
      if((m&N) && r>0 && (mask[r-1][c]&S) && !seen[r-1][c]){ seen[r-1][c] = true; cnt++; st.push([r-1,c]); }
      if((m&E) && c<n-1 && (mask[r][c+1]&Wd) && !seen[r][c+1]){ seen[r][c+1] = true; cnt++; st.push([r,c+1]); }
      if((m&S) && r<n-1 && (mask[r+1][c]&N) && !seen[r+1][c]){ seen[r+1][c] = true; cnt++; st.push([r+1,c]); }
      if((m&Wd) && c>0 && (mask[r][c-1]&E) && !seen[r][c-1]){ seen[r][c-1] = true; cnt++; st.push([r,c-1]); }
    }
    return { seen, cnt };
  }
  return { gen, reach, rot };
})();
SCCG.lab.pipes = PIPE;
R({ id:'plomberie', name:'Plomberie', emoji:'🔧', cat:'Réflexion', hue:200,
  desc:'Tourne les tuyaux pour faire circuler l\'eau partout.',
  how:"L'eau part de la source 💧. Touche un tuyau pour le faire tourner d'un quart de tour. Connecte TOUS les tuyaux à la source (ils deviennent bleus). Chaque grille réussie ajoute du temps. Les grilles grandissent !",
  create(api){
    let level = 0, n, mask, src, score = 0, tLeft = 90, cs, done = false;
    const c = api.canvas(320,320), g = c.g;
    function load(){
      level++; n = 4+Math.min(4,Math.floor((level-1)/2)); const gen = PIPE.gen(n); mask = gen.mask; src = gen.src; cs = 320/n;
      do { for(let r=0;r<n;r++) for(let cc=0;cc<n;cc++){ const k = rnd(4); for(let i=0;i<k;i++) mask[r][cc] = PIPE.rot(mask[r][cc]); } } while(PIPE.reach(mask,n,src).cnt===n*n);
      done = false;
    }
    function draw(){
      const rc = PIPE.reach(mask,n,src);
      g.fillStyle = '#0f172a'; g.fillRect(0,0,320,320);
      for(let r=0;r<n;r++) for(let cc=0;cc<n;cc++){
        const x = cc*cs, y = r*cs, m = mask[r][cc], on = rc.seen[r][cc];
        g.fillStyle = '#1e293b'; rrect(g,x+2,y+2,cs-4,cs-4,8); g.fill();
        g.strokeStyle = on ? '#38bdf8' : '#64748b'; g.lineWidth = cs*.2; g.lineCap = 'round'; g.beginPath();
        const mx = x+cs/2, my = y+cs/2;
        if(m&1){ g.moveTo(mx,my); g.lineTo(mx,y+3); } if(m&2){ g.moveTo(mx,my); g.lineTo(x+cs-3,my); } if(m&4){ g.moveTo(mx,my); g.lineTo(mx,y+cs-3); } if(m&8){ g.moveTo(mx,my); g.lineTo(x+3,my); }
        g.stroke(); g.fillStyle = on ? '#38bdf8' : '#64748b'; g.beginPath(); g.arc(mx,my,cs*.13,0,TAU); g.fill();
      }
      g.fillStyle = '#fff'; emoji(g,'💧',src[1]*cs+cs/2,src[0]*cs+cs/2,cs*.45);
    }
    api.on(api.root,'pointerdown',e=>{
      if(done || api.ended) return; const p = c.pos(e), cc = Math.floor(p.x/cs), r = Math.floor(p.y/cs); if(r<0||r>=n||cc<0||cc>=n) return;
      mask[r][cc] = PIPE.rot(mask[r][cc]); api.sfx('tap');
      if(PIPE.reach(mask,n,src).cnt===n*n){ done = true; const pts = 100+n*10; score += pts; tLeft += 18; api.setScore(score); api.sfx('win'); api.toast('Réseau connecté ! +'+pts+' et +18 s'); api.after(900,load); }
    });
    api.every(1000,()=>{ if(done) return; tLeft--; api.setInfo('Grille '+level+' ('+n+'×'+n+') • ⏱️ '+Math.max(0,tLeft)+' s'); if(tLeft<=0) api.end(score,{ title:'Temps écoulé !', msg:(level-1)+' réseau(x) connecté(s).' }); });
    api.loop(draw); api.setScore(0); load();
  }
});

/* ---------------------------------------------------------- PICROSS */
const PX = (function(){
  const runs = line=>{ const r = []; let k = 0; line.forEach(v=>{ if(v===1) k++; else if(k){ r.push(k); k = 0; } }); if(k) r.push(k); return r.length ? r : [0]; };
  const same = (a,b)=> a.length===b.length && a.every((v,i)=>v===b[i]);
  function gen(n){
    for(;;){ const sol = Array.from({length:n},()=>Array.from({length:n},()=>Math.random()<.56?1:0));
      if(sol.every(r=>r.some(v=>v)) && sol[0].map((_,c)=>sol.some(r=>r[c])).every(Boolean)) return { sol, rows:sol.map(runs), cols:sol[0].map((_,c)=>runs(sol.map(r=>r[c]))) }; }
  }
  function solved(grid,rows,cols){ const n = grid.length; for(let r=0;r<n;r++) if(!same(runs(grid[r].map(v=>v===1?1:0)),rows[r])) return false; for(let c=0;c<n;c++) if(!same(runs(grid.map(r=>r[c]===1?1:0)),cols[c])) return false; return true; }
  return { gen, solved, runs };
})();
SCCG.lab.picross = PX;
R({ id:'picross', name:'Picross', emoji:'🖼️', cat:'Réflexion', hue:260,
  desc:'Retrouve le dessin caché grâce aux nombres.',
  how:"Les nombres au bord indiquent les blocs de cases noires consécutives de chaque ligne et colonne. Touche (ou glisse sur) les cases pour les noircir. Le bouton ✖ permet de marquer les cases que tu sais vides. Termine la grille avant la fin du temps (5 minutes pour en faire un maximum).",
  create(api){
    const W = 320, H = 400, c = api.canvas(W,H), g = c.g;
    let level = 0, n, sol, rows, cols, grid, cs, ox, oy, mode = 1, score = 0, tLeft = 300, paint = null, done = false;
    function load(){
      level++; n = 5+Math.min(5,Math.floor((level-1)/2)); const p = PX.gen(n); rows = p.rows; cols = p.cols; sol = p.sol; grid = Array.from({length:n},()=>Array(n).fill(0));
      const mr = Math.max.apply(null,rows.map(r=>r.length)), mc = Math.max.apply(null,cols.map(r=>r.length));
      cs = Math.floor(Math.min((W-14)/(n+mr*.6),(H-14)/(n+mc*.6))); ox = W-cs*n-6; oy = H-cs*n-6; done = false;
    }
    function cellAt(p){ const cc = Math.floor((p.x-ox)/cs), r = Math.floor((p.y-oy)/cs); return (r>=0&&r<n&&cc>=0&&cc<n) ? [r,cc] : null; }
    function apply(cell){
      if(!cell || done) return; const cur = grid[cell[0]][cell[1]];
      if(paint===null) paint = cur===mode ? 0 : mode;
      if(grid[cell[0]][cell[1]]!==paint){ grid[cell[0]][cell[1]] = paint; api.sfx('tap'); }
      if(PX.solved(grid,rows,cols)){ done = true; const pts = n*n*2; score += pts; api.setScore(score); api.sfx('win'); api.toast('Dessin trouvé ! +'+pts); api.after(1000,load); }
    }
    api.on(api.root,'pointerdown',e=>{ paint = null; apply(cellAt(c.pos(e))); });
    api.on(api.root,'pointermove',e=>{ if(paint!==null && (e.buttons||e.pressure>0)) apply(cellAt(c.pos(e))); });
    api.on(window,'pointerup',()=>{ paint = null; });
    api.buttons([{ t:'⬛ Remplir', cls:'wide', down:()=>{ mode = 1; } },{ t:'✖ Marquer', cls:'wide', down:()=>{ mode = 2; } }]);
    api.every(1000,()=>{ if(done) return; tLeft--; api.setInfo('Grille '+level+' ('+n+'×'+n+') • ⏱️ '+Math.max(0,tLeft)+' s'); if(tLeft<=0) api.end(score,{ title:'Temps écoulé !', msg:(level-1)+' dessin(s) trouvé(s).' }); });
    api.loop(()=>{
      g.fillStyle = '#f6efe4'; g.fillRect(0,0,W,H); g.fillStyle = '#2b2118'; g.textBaseline = 'middle'; g.font = '700 '+Math.max(10,cs*.45)+'px sans-serif';
      for(let r=0;r<n;r++){ g.textAlign = 'right'; g.fillText(rows[r].join(' '),ox-6,oy+r*cs+cs/2); }
      g.textAlign = 'center'; for(let cc=0;cc<n;cc++){ cols[cc].forEach((v,i)=>{ g.fillText(String(v),ox+cc*cs+cs/2,oy-6-(cols[cc].length-1-i)*cs*.5-cs*.2); }); }
      for(let r=0;r<n;r++) for(let cc=0;cc<n;cc++){
        const x = ox+cc*cs, y = oy+r*cs, v = grid[r][cc];
        g.fillStyle = v===1 ? '#2b2118' : '#fffaf0'; g.fillRect(x,y,cs,cs);
        if(v===2){ g.strokeStyle = '#c0392b'; g.lineWidth = 2; g.beginPath(); g.moveTo(x+cs*.28,y+cs*.28); g.lineTo(x+cs*.72,y+cs*.72); g.moveTo(x+cs*.72,y+cs*.28); g.lineTo(x+cs*.28,y+cs*.72); g.stroke(); }
        g.strokeStyle = (r%5===0||cc%5===0) ? '#8a7a64' : '#cdbfa6'; g.lineWidth = 1; g.strokeRect(x+.5,y+.5,cs,cs);
      }
      g.strokeStyle = '#2b2118'; g.lineWidth = 2; g.strokeRect(ox,oy,cs*n,cs*n);
    });
    api.setScore(0); load();
  }
});

/* ---------------------------------------------------------- GLISSADE */
const GL = (function(){
  const N = 8;
  function slide(rocks,goal,x,y,dx,dy){
    let cx = x, cy = y, steps = 0;
    for(;;){ const nx = cx+dx, ny = cy+dy; if(nx<0||ny<0||nx>=N||ny>=N||rocks[ny][nx]) break; cx = nx; cy = ny; steps++; if(cx===goal[0] && cy===goal[1]) break; }
    return { x:cx, y:cy, steps };
  }
  function bfs(rocks,start,goal){
    const dist = {}, q = [start]; dist[start.join()] = 0;
    for(let i=0;i<q.length;i++){ const [x,y] = q[i]; if(x===goal[0]&&y===goal[1]) return dist[x+','+y];
      for(const d of Object.values(DIRS4)){ const r = slide(rocks,goal,x,y,d[0],d[1]); if(!r.steps) continue; const k = r.x+','+r.y; if(dist[k]===undefined){ dist[k] = dist[x+','+y]+1; q.push([r.x,r.y]); } } }
    return -1;
  }
  function gen(level){
    const want = clamp(3+level,4,11); let best = null, bd = 99;
    for(let t=0;t<250;t++){
      const rocks = Array.from({length:N},()=>Array(N).fill(false)); const nr = 12+rnd(6); for(let i=0;i<nr;i++) rocks[rnd(N)][rnd(N)] = true;
      const free = []; for(let y=0;y<N;y++) for(let x=0;x<N;x++) if(!rocks[y][x]) free.push([x,y]);
      const s = pick(free), goal = pick(free); if(s[0]===goal[0]&&s[1]===goal[1]) continue;
      const d = bfs(rocks,s,goal); if(d<0) continue;
      const diff = Math.abs(d-want); if(diff<bd){ bd = diff; best = { rocks, start:s, goal, min:d }; } if(diff===0) break;
    }
    return best || { rocks:Array.from({length:N},()=>Array(N).fill(false)), start:[0,0], goal:[7,0], min:1 };
  }
  return { gen, slide, bfs, N };
})();
SCCG.lab.glissade = GL;
R({ id:'glissade', name:'Glissade', emoji:'🐧', cat:'Réflexion', hue:195,
  desc:'Glisse sur la glace jusqu\'au poisson.',
  how:"Glisse ton doigt (ou flèches) pour envoyer le pingouin dans une direction : il glisse sur la glace jusqu'à heurter un rocher ou le bord, sans pouvoir s'arrêter avant ! Arrête-toi pile sur le poisson 🐟. Trouve le chemin le plus court pour un bonus. Tu as 3 minutes.",
  create(api){
    const CS = 40, c = api.canvas(8*CS,8*CS), g = c.g;
    let level = 0, lv, pos, moves = 0, score = 0, tLeft = 180, anim = null, done = false;
    const info = ()=> api.setInfo('Niveau '+level+' • coups '+moves+' (mini '+lv.min+') • ⏱️ '+Math.max(0,tLeft)+' s');
    function load(){ level++; lv = GL.gen(level); pos = lv.start.slice(); moves = 0; anim = null; done = false; info(); }
    function go(dn){
      if(done||anim||api.ended) return; const d = DIRS4[dn]; if(!d) return;
      const r = GL.slide(lv.rocks,lv.goal,pos[0],pos[1],d[0],d[1]); if(!r.steps){ api.sfx('bad'); return; }
      moves++; anim = { fx:pos[0], fy:pos[1], tx:r.x, ty:r.y, t:0, dur:Math.max(.12,r.steps*.05) }; api.sfx('move'); info();
    }
    api.swipe(api.root, go, { threshold:22 }); api.onKey(k=>go(k));
    api.buttons([{ t:'◀', down:()=>go('left') },{ t:'▲', down:()=>go('up') },{ t:'▼', down:()=>go('down') },{ t:'▶', down:()=>go('right') }]);
    api.every(1000,()=>{ if(done) return; tLeft--; info(); if(tLeft<=0) api.end(score,{ title:'Temps écoulé !', msg:(level-1)+' niveau(x) réussi(s).' }); });
    api.loop(dt=>{
      let px = pos[0], py = pos[1];
      if(anim){ anim.t += dt/anim.dur; const k = Math.min(1,anim.t); px = anim.fx+(anim.tx-anim.fx)*k; py = anim.fy+(anim.ty-anim.fy)*k;
        if(k>=1){ pos = [anim.tx,anim.ty]; anim = null;
          if(pos[0]===lv.goal[0] && pos[1]===lv.goal[1]){ done = true; const pts = 100+(moves<=lv.min?50:0); score += pts; api.setScore(score); api.sfx('win'); api.toast(moves<=lv.min ? 'Chemin parfait ! +'+pts : 'Poisson ! +'+pts); api.after(1000,load); } } }
      g.fillStyle = '#cfeefc'; g.fillRect(0,0,8*CS,8*CS); g.strokeStyle = '#b4e0f5'; g.lineWidth = 1; for(let i=0;i<=8;i++){ g.beginPath(); g.moveTo(i*CS,0); g.lineTo(i*CS,8*CS); g.stroke(); g.beginPath(); g.moveTo(0,i*CS); g.lineTo(8*CS,i*CS); g.stroke(); }
      for(let y=0;y<8;y++) for(let x=0;x<8;x++) if(lv.rocks[y][x]){ g.fillStyle = '#64748b'; rrect(g,x*CS+3,y*CS+3,CS-6,CS-6,9); g.fill(); g.fillStyle = '#94a3b8'; g.fillRect(x*CS+9,y*CS+8,12,6); }
      g.fillStyle = '#fff'; emoji(g,'🐟',lv.goal[0]*CS+CS/2,lv.goal[1]*CS+CS/2,28); emoji(g,'🐧',px*CS+CS/2,py*CS+CS/2,30);
    });
    api.setScore(0); load();
  }
});

/* ---------------------------------------------------------- EMBOUTEILLAGE (Rush Hour) */
const RH = (function(){
  const N = 6;
  function occ(cars,skip){ const o = Array.from({length:N},()=>Array(N).fill(-1)); cars.forEach((c,i)=>{ if(i===skip) return; for(let k=0;k<c.len;k++){ const x = c.x+(c.h?k:0), y = c.y+(c.h?0:k); o[y][x] = i; } }); return o; }
  const keyOf = cs=> cs.map(c=>c.h?c.x:c.y).join(',');
  const clone = cs=> cs.map(c=>({ x:c.x, y:c.y, len:c.len, h:c.h, red:c.red }));
  /* tous les états atteignables en UN déplacement (une voiture glisse d'une ou plusieurs cases) */
  function nbrs(cs){
    const out = [];
    for(let i=0;i<cs.length;i++){
      const o = occ(cs,i), c = cs[i];
      for(const d of [-1,1]){
        for(let k=1;;k++){
          const hx = c.h ? (d>0 ? c.x+c.len-1+k : c.x-k) : c.x, hy = c.h ? c.y : (d>0 ? c.y+c.len-1+k : c.y-k);
          if(hx<0||hy<0||hx>=N||hy>=N||o[hy][hx]>=0) break;
          const nc = cs.map((cc,j)=> j===i ? { x:cc.x+(cc.h?d*k:0), y:cc.y+(cc.h?0:d*k), len:cc.len, h:cc.h, red:cc.red } : cc); out.push(nc);
        }
      }
    }
    return out;
  }
  function solve(cars,limit){
    const q = [clone(cars)], seen = {}; seen[keyOf(q[0])] = 0;
    for(let qi=0; qi<q.length && qi<(limit||300000); qi++){
      const cs = q[qi], d0 = seen[keyOf(cs)]; if(cs[0].x===4) return d0;
      for(const nc of nbrs(cs)){ const k = keyOf(nc); if(seen[k]===undefined){ seen[k] = d0+1; q.push(nc); } }
    }
    return -1;
  }
  function solvedLayout(){
    const cars = [{ x:4, y:2, len:2, h:true, red:true }], tries = 11+rnd(5);
    for(let i=0, k=0; k<tries && i<500; i++){
      const h = Math.random()<.55, len = Math.random()<.32 ? 3 : 2, x = rnd(N-(h?len-1:0)), y = rnd(N-(h?0:len-1));
      if(h && y===2) continue; const o = occ(cars,-1); let ok = true;
      for(let q=0;q<len;q++){ const cx = x+(h?q:0), cy = y+(h?0:q); if(o[cy][cx]>=0) ok = false; }
      if(ok){ cars.push({ x, y, len, h }); k++; }
    }
    return cars;
  }
  function gen(level){
    const want = clamp(Math.round(4+level*1.1),5,12), inG = cs=> cs[0].x===4;
    let best = null, bd = -1;
    for(let t=0;t<9;t++){
      // exploration "à rebours" : on part d'une position gagnée et on s'en éloigne (les déplacements sont réversibles, donc tout état trouvé est résoluble).
      // Passer d'une position gagnée à une autre ne coûte rien : on mesure la distance jusqu'à la sortie la plus proche.
      const start = solvedLayout(), dist = {}, buckets = [[start]]; dist[keyOf(start)] = 0; const cand = []; let seen = 1;
      for(let d=0; d<buckets.length && seen<4500; d++){
        const bk = buckets[d]; if(!bk) continue;
        for(let i=0;i<bk.length && seen<4500;i++){
          const cs = bk[i]; if(dist[keyOf(cs)]!==d) continue; if(!inG(cs)){ cand.push([d,cs]); }
          for(const nc of nbrs(cs)){
            const nd = d+((inG(cs)&&inG(nc)) ? 0 : 1), k = keyOf(nc);
            if(dist[k]===undefined || nd<dist[k]){ if(dist[k]===undefined) seen++; dist[k] = nd; (buckets[nd] = buckets[nd] || []).push(nc); }
          }
        }
      }
      let mx = 0; cand.forEach(x=>{ if(x[0]>mx) mx = x[0]; });
      const top = cand.filter(x=>x[0]>=Math.min(want,mx-1)).map(x=>x[1]), pool = shuffle(top).slice(0,3);
      for(const cs of pool){ const d = solve(cs,40000); if(d>=Math.max(4,want-3)) return clone(cs); if(d>bd){ bd = d; best = clone(cs); } }
    }
    return best || [{ x:0, y:2, len:2, h:true, red:true },{ x:3, y:1, len:2, h:false }];
  }
  return { gen, solve, occ, N };
})();
SCCG.lab.rushhour = RH;
R({ id:'embouteillage', name:'Embouteillage', emoji:'🚗', cat:'Réflexion', hue:355,
  desc:'Fais sortir la voiture rouge du parking.',
  how:"Fais glisser les voitures avec ton doigt, uniquement dans le sens de leur longueur, pour libérer la voie de la voiture rouge 🚗. Amène-la tout à droite, face à la sortie. Moins tu fais de déplacements, plus tu gagnes de points ! Tu as 4 minutes.",
  create(api){
    const CS = 52, W = RH.N*CS, c = api.canvas(W+10,W+10), g = c.g, OFF = 5;
    const COL = ['#ef4444','#3b82f6','#22c55e','#f2c94c','#a855f7','#f97316','#14b8a6','#ec4899','#84cc16','#06b6d4','#8b5cf6','#eab308','#64748b','#fb7185'];
    let cars = [], level = 0, moves = 0, score = 0, tLeft = 240, drag = null, done = false;
    const info = ()=> api.setInfo('Niveau '+level+' • déplacements '+moves+' • ⏱️ '+Math.max(0,tLeft)+' s');
    function load(){ level++; cars = RH.gen(level); moves = 0; done = false; drag = null; info(); }
    const carAt = (x,y)=>{ for(let i=0;i<cars.length;i++){ const cr = cars[i]; for(let k=0;k<cr.len;k++){ const cx = cr.x+(cr.h?k:0), cy = cr.y+(cr.h?0:k); if(cx===x&&cy===y) return i; } } return -1; };
    api.on(api.root,'pointerdown',e=>{ if(done||api.ended) return; const p = c.pos(e), x = Math.floor((p.x-OFF)/CS), y = Math.floor((p.y-OFF)/CS); const i = carAt(x,y); if(i<0) return; drag = { i, sx:p.x, sy:p.y, ox:cars[i].x, oy:cars[i].y, fx:cars[i].x, fy:cars[i].y }; api.sfx('move'); });
    api.on(api.root,'pointermove',e=>{
      if(!drag) return; const p = c.pos(e), cr = cars[drag.i], o = RH.occ(cars,drag.i); const delta = Math.round((cr.h ? p.x-drag.sx : p.y-drag.sy)/CS);
      let pos = (cr.h ? drag.ox : drag.oy), target = pos+delta, cur = pos;
      const step = delta>0 ? 1 : -1;
      while(cur!==target){ const nx = cur+step; const hx = cr.h ? (step>0 ? nx+cr.len-1 : nx) : cr.x, hy = cr.h ? cr.y : (step>0 ? nx+cr.len-1 : nx); if(hx<0||hy<0||hx>=RH.N||hy>=RH.N||o[hy][hx]>=0) break; cur = nx; }
      if(cr.h) cr.x = cur; else cr.y = cur;
    });
    api.on(window,'pointerup',()=>{
      if(!drag) return; const cr = cars[drag.i]; const changed = cr.x!==drag.ox || cr.y!==drag.oy; drag = null;
      if(changed){ moves++; info(); api.sfx('tap'); }
      if(cars[0].x===4){ done = true; const pts = 100+Math.max(0,60-moves*2); score += pts; api.setScore(score); api.sfx('win'); api.toast('Sortie libérée ! +'+pts); api.after(1000,load); }
    });
    api.every(1000,()=>{ if(done) return; tLeft--; info(); if(tLeft<=0) api.end(score,{ title:'Temps écoulé !', msg:(level-1)+' niveau(x) réussi(s).' }); });
    api.loop(()=>{
      g.fillStyle = '#2a2a2f'; g.fillRect(0,0,W+10,W+10); g.fillStyle = '#3d3d45'; g.fillRect(OFF,OFF,W,W);
      g.strokeStyle = '#4b4b55'; g.lineWidth = 1; for(let i=0;i<=RH.N;i++){ g.beginPath(); g.moveTo(OFF+i*CS,OFF); g.lineTo(OFF+i*CS,OFF+W); g.stroke(); g.beginPath(); g.moveTo(OFF,OFF+i*CS); g.lineTo(OFF+W,OFF+i*CS); g.stroke(); }
      g.fillStyle = '#7fe0b3'; g.fillRect(OFF+W,OFF+2*CS+8,5,CS-16);
      cars.forEach((cr,i)=>{ const x = OFF+cr.x*CS+3, y = OFF+cr.y*CS+3, w = (cr.h?cr.len*CS:CS)-6, h = (cr.h?CS:cr.len*CS)-6; g.fillStyle = cr.red ? '#ef4444' : COL[1+(i%(COL.length-1))]; rrect(g,x,y,w,h,10); g.fill(); g.fillStyle = 'rgba(255,255,255,.35)'; rrect(g,x+6,y+6,w-12,h-12,7); g.fill(); if(cr.red){ g.fillStyle = '#fff'; emoji(g,'🚗',x+w/2,y+h/2,26); } });
    });
    api.setScore(0); load();
  }
});

/* ---------------------------------------------------------- LE 24 */
const G24 = (function(){
  function solvable(nums){
    let found = false;
    (function rec(a){
      if(found) return; if(a.length===1){ if(a[0]===24) found = true; return; }
      for(let i=0;i<a.length;i++) for(let j=0;j<a.length;j++){ if(i===j) continue;
        const rest = a.filter((_,k)=>k!==i&&k!==j), x = a[i], y = a[j], res = [x+y,x*y]; if(x-y>=0) res.push(x-y); if(y!==0 && x%y===0) res.push(x/y);
        res.forEach(v=>rec(rest.concat([v]))); }
    })(nums);
    return found;
  }
  function gen(){ for(;;){ const n = [1,2,3,4].map(()=>1+rnd(13)); if(solvable(n)) return n; } }
  return { solvable, gen };
})();
SCCG.lab.g24 = G24;
R({ id:'le24', name:'Le 24', emoji:'🧮', cat:'Réflexion', hue:45,
  desc:'Combine 4 nombres pour obtenir exactement 24.',
  how:"Utilise les 4 nombres avec + − × ÷ (chaque nombre une seule fois) pour obtenir 24. Touche un nombre, puis une opération, puis un autre nombre : ils fusionnent en un seul. Pas de nombre à virgule ni de résultat négatif. Chaque réussite = 100 points. Tu as 2 minutes ; « Passer » coûte 30 points.",
  create(api){
    let tiles, sel = -1, op = null, score = 0, tLeft = 120, base, solved = 0;
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    function newPuzzle(){ base = G24.gen(); reset(); }
    function reset(){ tiles = base.map((v,i)=>({ v, id:i })); sel = -1; op = null; draw(); }
    function draw(){
      wrap.innerHTML = `<div class="g-line" style="gap:10px;">${tiles.map((t,i)=>`<button data-t="${i}" class="g-chip ${sel===i?'on':''}" style="min-width:64px;height:64px;font-size:28px;">${t.v}</button>`).join('')}</div>
        <div class="g-line" style="gap:10px;">${['+','−','×','÷'].map(o=>`<button data-o="${o}" class="g-chip ${op===o?'on':''}" style="min-width:56px;height:56px;font-size:28px;">${o}</button>`).join('')}</div>
        <div class="hint" style="color:#f6efe4;margin:0;">Objectif : 24</div>`;
    }
    function compute(a,o,b){ if(o==='+') return a+b; if(o==='−') return a-b; if(o==='×') return a*b; if(b!==0 && a%b===0) return a/b; return null; }
    api.on(wrap,'click',e=>{
      if(api.ended) return;
      const o = e.target.closest('[data-o]'); if(o){ if(sel>=0){ op = o.dataset.o; api.sfx('tap'); draw(); } return; }
      const t = e.target.closest('[data-t]'); if(!t) return; const i = +t.dataset.t;
      if(sel<0 || !op){ sel = i; op = null; api.sfx('move'); draw(); return; }
      if(i===sel){ sel = -1; op = null; draw(); return; }
      const r = compute(tiles[sel].v,op,tiles[i].v);
      if(r===null || r<0){ api.sfx('bad'); api.toast(r===null ? 'Division non entière' : 'Résultat négatif'); sel = -1; op = null; draw(); return; }
      tiles[i] = { v:r, id:tiles[i].id }; tiles.splice(sel,1); sel = -1; op = null; api.sfx('tap');
      if(tiles.length===1){
        if(tiles[0].v===24){ solved++; score += 100; api.setScore(score); api.sfx('win'); api.toast('24 ! +100'); api.after(700,newPuzzle); draw(); }
        else { api.sfx('bad'); api.toast(tiles[0].v+' ≠ 24 : on recommence'); api.after(700,reset); draw(); }
        return;
      }
      draw();
    });
    api.buttons([{ t:'↺ Recommencer', cls:'wide', down:reset },{ t:'⏭ Passer (−30)', cls:'wide', down:()=>{ score = Math.max(0,score-30); api.setScore(score); newPuzzle(); } }]);
    api.every(1000,()=>{ tLeft--; api.setInfo('⏱️ '+Math.max(0,tLeft)+' s'); if(tLeft<=0) api.end(score,{ title:'Temps écoulé !', msg:solved+' réussite(s).' }); });
    api.setScore(0); newPuzzle();
  }
});

/* ---------------------------------------------------------- SUITES LOGIQUES */
const SEQ = (function(){
  const gens = [
    ()=>{ const a = 1+rnd(9), d = 2+rnd(7); return Array.from({length:6},(_,i)=>a+d*i); },
    ()=>{ const a = 1+rnd(4), q = 2+rnd(2); return Array.from({length:6},(_,i)=>a*Math.pow(q,i)); },
    ()=>{ const o = rnd(4); return Array.from({length:6},(_,i)=>(i+1+o)*(i+1+o)); },
    ()=>{ const o = rnd(3); return Array.from({length:6},(_,i)=>(i+1+o)*(i+2+o)/2); },
    ()=>{ const a = 1+rnd(3), b = 1+rnd(4), s = [a,b]; for(let i=2;i<6;i++) s.push(s[i-1]+s[i-2]); return s; },
    ()=>{ const a = 1+rnd(9), x = 2+rnd(4), y = 3+rnd(5), s = [a]; for(let i=1;i<6;i++) s.push(s[i-1]+(i%2 ? x : y)); return s; },
    ()=>{ const a = 40+rnd(60), d = 3+rnd(9); return Array.from({length:6},(_,i)=>a-d*i); },
    ()=>{ const o = rnd(3); return Array.from({length:6},(_,i)=>Math.pow(i+1+o,3)); },
    ()=>{ const a = 1+rnd(5), d = 1+rnd(3), s = [a]; for(let i=1;i<6;i++) s.push(s[i-1]+d*i); return s; }
  ];
  function make(level){
    const seq = pick(gens.slice(0,Math.min(gens.length,3+Math.floor(level/2))))();
    const ans = seq[5], opts = new Set([ans]); let guard = 0; while(opts.size<4 && guard++<200){ const d = (1+rnd(Math.max(3,Math.round(ans*.25))))*(Math.random()<.5?-1:1); const v = ans+d; if(v>0) opts.add(v); } for(let k=1; opts.size<4; k++) opts.add(ans+k);
    return { seq:seq.slice(0,5), ans, opts:shuffle(Array.from(opts)) };
  }
  return { make, gens };
})();
SCCG.lab.suites = SEQ;
R({ id:'suites', name:'Suites logiques', emoji:'🔢', cat:'Réflexion', hue:215,
  desc:'Trouve le nombre qui continue la suite.',
  how:"Une suite de nombres suit une règle (addition, multiplication, carrés, Fibonacci…). Trouve la règle et choisis le nombre suivant parmi 4 propositions. Tu as 20 secondes par suite et 3 vies. Plus tu réponds vite, plus tu gagnes de points !",
  create(api){
    let q, level = 0, score = 0, lives = 3, tLeft = 20000, locked = false, n = 0;
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    const info = ()=> api.setInfo('Suite '+(n+1)+' • '+'❤️'.repeat(lives));
    function next(){ q = SEQ.make(level); locked = false; tLeft = 20000; wrap.innerHTML = `<div class="g-bar"><i id="sqBar"></i></div><div class="g-big-text" style="font-size:34px;letter-spacing:2px;">${q.seq.join(' , ')} , ?</div><div class="g-col" style="gap:8px;">${q.opts.map(o=>`<button class="g-ans" data-v="${o}" style="text-align:center;font-size:20px;">${o}</button>`).join('')}</div>`; info(); }
    function answer(v){
      if(locked||api.ended) return; locked = true; const ok = v===q.ans;
      wrap.querySelectorAll('.g-ans').forEach(b=>{ if(+b.dataset.v===q.ans) b.classList.add('ok'); else if(+b.dataset.v===v) b.classList.add('ko'); });
      if(ok){ n++; if(n%2===0) level++; score += 100+Math.ceil(tLeft/1000)*5; api.setScore(score); api.sfx('good'); }
      else { lives--; api.sfx('bad'); }
      info(); api.after(1100,()=>{ if(lives<=0) api.end(score,{ title:'Plus de vies !', msg:n+' suite(s) trouvée(s).' }); else next(); });
    }
    api.on(wrap,'click',e=>{ const b = e.target.closest('.g-ans'); if(b) answer(+b.dataset.v); });
    api.every(100,()=>{ if(locked) return; tLeft -= 100; const bar = wrap.querySelector('#sqBar'); if(bar) bar.style.width = Math.max(0,tLeft/200)+'%'; if(tLeft<=0){ locked = true; lives--; info(); api.sfx('bad'); wrap.querySelectorAll('.g-ans').forEach(b=>{ if(+b.dataset.v===q.ans) b.classList.add('ok'); }); api.after(1100,()=>{ if(lives<=0) api.end(score,{ title:'Plus de vies !' }); else next(); }); } });
    next();
  }
});

/* ---------------------------------------------------------- MOTS CACHÉS */
const WS = (function(){
  const ALL = [[0,1],[1,0],[1,1],[-1,1],[0,-1],[-1,0],[-1,-1],[1,-1]];
  function make(words,N,dirs){
    const g = Array.from({length:N},()=>Array(N).fill('')), placed = [];
    for(const w of words){
      for(let t=0;t<300;t++){
        const d = pick(dirs), r = rnd(N), c = rnd(N), er = r+d[0]*(w.length-1), ec = c+d[1]*(w.length-1);
        if(er<0||er>=N||ec<0||ec>=N) continue; let fit = true;
        for(let i=0;i<w.length;i++){ const ch = g[r+d[0]*i][c+d[1]*i]; if(ch && ch!==w[i]){ fit = false; break; } }
        if(!fit) continue; for(let i=0;i<w.length;i++) g[r+d[0]*i][c+d[1]*i] = w[i]; placed.push({ w, r, c, d }); break;
      }
    }
    const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; for(let r=0;r<N;r++) for(let c=0;c<N;c++) if(!g[r][c]) g[r][c] = A[rnd(26)];
    return { g, placed };
  }
  function read(g,a,b){
    const dr = b[0]-a[0], dc = b[1]-a[1]; if(!(dr===0||dc===0||Math.abs(dr)===Math.abs(dc)) || (dr===0&&dc===0)) return null;
    const n = Math.max(Math.abs(dr),Math.abs(dc))+1, sr = Math.sign(dr), sc = Math.sign(dc); let s = '';
    for(let i=0;i<n;i++) s += g[a[0]+sr*i][a[1]+sc*i]; return s;
  }
  return { make, read, ALL };
})();
SCCG.lab.wordsearch = WS;
R({ id:'motscaches', name:'Mots cachés', emoji:'🔎', cat:'Mots & quiz', hue:175,
  desc:'Retrouve tous les mots cachés dans la grille.',
  how:"Des mots sont cachés dans la grille (horizontalement, verticalement, en diagonale, parfois à l'envers). Glisse ton doigt de la première à la dernière lettre d'un mot pour le sélectionner. Trouve tous les mots de la liste avant la fin du temps !",
  create(api){
    const N = 10, CS = 32, W = N*CS, H = 440, c = api.canvas(W,H), g = c.g, data = (SCCG.lab.data && SCCG.lab.data.WORDS) || ['MAISON','ECOLE','POISSON','VOITURE','SOLEIL','JARDIN','CAHIER','PLANTAIN'];
    let grid, placed, found, level = 0, score = 0, tLeft = 180, sel = null, words = [], done = false;
    const COLS = ['#f87171','#fbbf24','#34d399','#60a5fa','#a78bfa','#f472b6','#fb923c','#2dd4bf'];
    function load(){
      level++; const pool = data.filter(w=>w.length>=4 && w.length<=8); words = shuffle(pool).slice(0,7).sort((a,b)=>b.length-a.length);
      const dirs = WS.ALL.slice(0, level<2 ? 3 : level<3 ? 4 : 8); const m = WS.make(words,N,dirs); grid = m.g; placed = m.placed; found = {}; done = false; words = placed.map(p=>p.w);
    }
    const cellAt = p=>{ const cc = Math.floor(p.x/CS), r = Math.floor(p.y/CS); return (r>=0&&r<N&&cc>=0&&cc<N) ? [r,cc] : null; };
    function check(a,b){
      const s = WS.read(grid,a,b); if(!s) return; const rv = s.split('').reverse().join('');
      const hit = placed.find(p=>!found[p.w] && (p.w===s || p.w===rv)); if(!hit){ api.sfx('bad'); return; }
      found[hit.w] = { a, b, col:COLS[Object.keys(found).length%COLS.length] }; score += 10; api.setScore(score); api.sfx('good');
      if(placed.every(p=>found[p.w])){ done = true; score += 50; api.setScore(score); api.sfx('win'); api.toast('Grille terminée ! +50'); api.after(1000,load); }
    }
    api.on(api.root,'pointerdown',e=>{ if(done) return; const cc = cellAt(c.pos(e)); if(cc) sel = { a:cc, b:cc }; });
    api.on(api.root,'pointermove',e=>{ if(sel){ const cc = cellAt(c.pos(e)); if(cc) sel.b = cc; } });
    api.on(window,'pointerup',()=>{ if(sel){ const s = sel; sel = null; if(s.a[0]!==s.b[0]||s.a[1]!==s.b[1]) check(s.a,s.b); } });
    api.every(1000,()=>{ if(done) return; tLeft--; api.setInfo('Grille '+level+' • ⏱️ '+Math.max(0,tLeft)+' s'); if(tLeft<=0) api.end(score,{ title:'Temps écoulé !', msg:(level-1)+' grille(s) terminée(s).' }); });
    const line = (a,b,col,w)=>{ g.strokeStyle = col; g.lineWidth = w; g.lineCap = 'round'; g.beginPath(); g.moveTo(a[1]*CS+CS/2,a[0]*CS+CS/2); g.lineTo(b[1]*CS+CS/2,b[0]*CS+CS/2); g.stroke(); };
    api.loop(()=>{
      g.fillStyle = '#fffaf0'; g.fillRect(0,0,W,H);
      Object.keys(found).forEach(k=>{ const f = found[k]; line(f.a,f.b,f.col+'99',CS*.78); });
      if(sel){ const ok = WS.read(grid,sel.a,sel.b); line(sel.a,sel.b,ok ? 'rgba(242,184,75,.7)' : 'rgba(150,150,150,.4)',CS*.78); }
      g.fillStyle = '#2b2118'; g.font = '700 '+Math.floor(CS*.55)+'px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
      for(let r=0;r<N;r++) for(let cc=0;cc<N;cc++) g.fillText(grid[r][cc],cc*CS+CS/2,r*CS+CS/2+1);
      g.font = '700 14px sans-serif'; g.textAlign = 'left'; const cols = 3, cw = W/cols;
      words.forEach((w,i)=>{ const x = 10+(i%cols)*cw, y = N*CS+22+Math.floor(i/cols)*24; g.fillStyle = found[w] ? '#2f8f5f' : '#2b2118'; g.fillText(w,x,y); if(found[w]){ const tw = g.measureText(w).width; g.fillRect(x,y,tw,2); } });
    });
    api.setScore(0); load();
  }
});

/* ---------------------------------------------------------- ÉCLAIRS (mémoire de grille) */
R({ id:'eclairs', name:'Éclairs', emoji:'⚡', cat:'Réflexion', hue:55,
  desc:'Mémorise les cases qui s\'allument.',
  how:"Des cases s'allument quelques instants. Retiens leur position, puis touche-les toutes (dans n'importe quel ordre). À chaque réussite, il y a plus de cases à retenir. Une erreur te coûte une vie ❤️ (3 vies).",
  create(api){
    let level = 0, n = 3, k = 3, targets = [], found = {}, phase = 'show', lives = 3, score = 0;
    const board = el('div','g-board'); api.root.appendChild(board); api.fit(board,1);
    let cells = [];
    const info = ()=> api.setInfo('Niveau '+level+' • '+k+' cases • '+'❤️'.repeat(lives));
    function build(){
      board.innerHTML = `<div class="g-grid" style="grid-template-columns:repeat(${n},1fr);grid-template-rows:repeat(${n},1fr);">${Array.from({length:n*n},(_,i)=>`<button class="g-cell" data-i="${i}"></button>`).join('')}</div>`;
      cells = [].slice.call(board.querySelectorAll('.g-cell'));
    }
    function round(){
      level++; n = Math.min(6,3+Math.floor((level-1)/3)); k = Math.min(Math.floor(n*n/2),2+level); build(); info();
      targets = shuffle(Array.from({length:n*n},(_,i)=>i)).slice(0,k); found = {}; phase = 'show';
      api.after(700,()=>{ targets.forEach(i=>{ cells[i].style.background = '#F2B84B'; }); api.sfx('good');
        api.after(900+k*160,()=>{ cells.forEach(c=>{ c.style.background = ''; }); phase = 'play'; api.toast('À toi !'); }); });
    }
    api.on(board,'click',e=>{
      const c = e.target.closest('.g-cell'); if(!c || phase!=='play' || api.ended) return; const i = +c.dataset.i; if(found[i]) return;
      if(targets.indexOf(i)>=0){ found[i] = 1; c.style.background = '#2f8f5f'; api.sfx('tap');
        if(Object.keys(found).length===k){ phase = 'wait'; score += 10*k; api.setScore(score); api.sfx('win'); api.after(900,round); } }
      else { c.style.background = '#a8372b'; api.sfx('bad'); api.vibrate(60); lives--; info(); phase = 'wait';
        targets.forEach(t=>{ if(!found[t]) cells[t].style.background = '#F2B84B'; });
        api.after(1300,()=>{ if(lives<=0) api.end(score,{ title:'Plus de vies !', msg:'Niveau atteint : '+level }); else { level--; round(); } }); }
    });
    api.setScore(0); round();
  }
});

/* ---------------------------------------------------------- COMPTE VITE */
R({ id:'comptevite', name:'Compte vite', emoji:'👁️', cat:'Réflexes', hue:285,
  desc:'Combien y a-t-il d\'objets ? Tu n\'as qu\'un instant !',
  how:"Des symboles apparaissent quelques instants à des endroits au hasard. Compte-les le plus vite possible, puis choisis le bon nombre ! Il y en a de plus en plus. Une erreur te coûte une vie ❤️ (3 vies).",
  create(api){
    const EMO = ['⭐','🍎','🐟','🌸','⚽','🔔','🍋','🐝'];
    let level = 0, lives = 3, score = 0, locked = true;
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    const info = ()=> api.setInfo('Niveau '+level+' • '+'❤️'.repeat(lives));
    function round(){
      level++; const n = 3+Math.floor(level*.9)+rnd(2), e = pick(EMO), ms = 900+n*130; info(); locked = true;
      const pts = []; let guard = 0; while(pts.length<n && guard++<500){ const x = rndf(6,88), y = rndf(6,88); if(pts.every(p=>Math.hypot(p[0]-x,p[1]-y)>13)) pts.push([x,y]); }
      const cnt = pts.length;
      wrap.innerHTML = `<div style="position:relative;width:min(88vw,340px);height:min(88vw,340px);background:rgba(255,255,255,.07);border-radius:18px;">${pts.map(p=>`<span style="position:absolute;left:${p[0]}%;top:${p[1]}%;font-size:30px;line-height:1;">${e}</span>`).join('')}</div>`;
      api.after(ms,()=>{
        const opts = new Set([cnt]); while(opts.size<4){ const v = cnt+rnd(5)-2; if(v>0) opts.add(v); }
        wrap.innerHTML = `<div class="g-q">Combien y en avait-il ?</div><div class="g-line" style="gap:10px;">${shuffle(Array.from(opts)).map(o=>`<button class="g-chip" data-v="${o}" style="min-width:70px;font-size:26px;">${o}</button>`).join('')}</div>`; locked = false;
        wrap.onclick = ev=>{ const b = ev.target.closest('[data-v]'); if(!b||locked||api.ended) return; locked = true; const ok = +b.dataset.v===cnt;
          if(ok){ score += 10*level; api.setScore(score); api.sfx('good'); b.classList.add('on'); } else { lives--; api.sfx('bad'); api.toast('Il y en avait '+cnt); info(); }
          api.after(1000,()=>{ if(lives<=0) api.end(score,{ title:'Plus de vies !', msg:'Niveau atteint : '+level }); else round(); }); };
      });
    }
    api.setScore(0); round();
  }
});

/* ---------------------------------------------------------- ORTHOGRAPHE */
const ORTHO = [
  ['développement','dévelopement'],['rythme','rithme'],['appartement','apartement'],['accueil','acceuil'],['ennemi','enemi'],['occasion','ocasion'],
  ['dictionnaire','dictionaire'],['pharmacie','farmacie'],['bibliothèque','bibliotèque'],['ambiance','ambience'],['aujourd\'hui','aujourdhui'],
  ['beaucoup','beacoup'],['bizarre','bizzare'],['boulangerie','boullangerie'],['calendrier','calandrier'],['connaissance','connaisance'],
  ['correspondant','correspondent'],['embarrasser','embarasser'],['exceptionnel','exeptionnel'],['gymnastique','gymnatique'],['immédiatement','immédiatemment'],
  ['intelligent','inteligent'],['magnifique','magnifik'],['mystère','mistère'],['nécessaire','nécéssaire'],['occuper','occupper'],['oiseau','oizeau'],
  ['persévérance','persévérence'],['recommencer','recomencer'],['sincèrement','sincèrment'],['sympathique','simpathique'],['technique','tecnique'],
  ['téléphone','téléfone'],['tranquille','tranquile'],['université','univercité'],['vacances','vaccances'],['vraiment','vraiement'],['xylophone','xilophone'],
  ['énorme','énnorme'],['fenêtre','fenètre'],['grammaire','gramaire'],['hippopotame','hipopotame'],['imaginer','imaginner'],['maintenant','maintenent'],
  ['orchestre','orquestre'],['parapluie','paraplui'],['échelle','échèle'],['kilomètre','kilométre'],['janvier','jenvier'],['souvenir','souvenire']
];
SCCG.lab.ortho = ORTHO;
R({ id:'orthographe', name:'Orthographe', emoji:'✍️', cat:'Mots & quiz', hue:340, translate:false,
  desc:'Quelle est la bonne orthographe ?',
  how:"Deux écritures d'un même mot s'affichent : une seule est correcte ! Touche la bonne le plus vite possible. Tu as 45 secondes et 3 vies : une erreur te coûte une vie ❤️.",
  create(api){
    let list = shuffle(ORTHO), idx = 0, lives = 3, score = 0, tLeft = 45, streak = 0, locked = false, cur;
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    const info = ()=> api.setInfo('⏱️ '+Math.max(0,tLeft)+' s • '+'❤️'.repeat(lives)+(streak>1?' • 🔥 '+streak:''));
    function next(){
      if(idx>=list.length){ list = shuffle(ORTHO); idx = 0; } const p = list[idx++], flip = Math.random()<.5; cur = { ok:p[0], opts:flip ? [p[1],p[0]] : [p[0],p[1]] }; locked = false;
      wrap.innerHTML = `<div class="g-q">Quelle est la bonne orthographe ?</div>${cur.opts.map((o,i)=>`<button class="g-ans" data-i="${i}" style="text-align:center;font-size:24px;">${esc(o)}</button>`).join('')}`; info();
    }
    api.on(wrap,'click',e=>{
      const b = e.target.closest('.g-ans'); if(!b||locked||api.ended) return; locked = true; const ok = cur.opts[+b.dataset.i]===cur.ok;
      wrap.querySelectorAll('.g-ans').forEach((x,i)=>{ if(cur.opts[i]===cur.ok) x.classList.add('ok'); else if(x===b) x.classList.add('ko'); });
      if(ok){ streak++; score += 10+Math.min(streak,10); api.setScore(score); api.sfx('good'); } else { streak = 0; lives--; api.sfx('bad'); }
      info(); api.after(ok ? 450 : 1100,()=>{ if(lives<=0) api.end(score,{ title:'Plus de vies !' }); else next(); });
    });
    api.every(1000,()=>{ tLeft--; info(); if(tLeft<=0) api.end(score,{ title:'Temps écoulé !' }); });
    api.setScore(0); next();
  }
});

/* ---------------------------------------------------------- TAUREAUX & VACHES */
R({ id:'taureaux', name:'Taureaux & Vaches', emoji:'🐂', cat:'Réflexion', hue:20,
  desc:'Devine le code secret à 4 chiffres.',
  how:"L'ordinateur cache un code de 4 chiffres tous différents. Propose un code : 🐂 = un chiffre juste ET bien placé, 🐄 = un chiffre juste mais mal placé. Trouve le code en 10 essais maximum. Moins d'essais et plus de rapidité = plus de points.",
  create(api){
    const secret = shuffle([0,1,2,3,4,5,6,7,8,9]).slice(0,4).join(''); const rows = []; let typed = '', done = false; const t0 = Date.now();
    api.scroll(true);
    const wrap = el('div','g-col'); api.root.appendChild(wrap); const hist = el('div'); hist.style.cssText = 'width:100%;max-width:320px;'; wrap.appendChild(hist); const cur = el('div','g-big-text'); cur.style.cssText = 'font-size:40px;letter-spacing:8px;color:#F2B84B;'; wrap.appendChild(cur);
    function score(g){ let b = 0, c = 0; for(let i=0;i<4;i++){ if(g[i]===secret[i]) b++; else if(secret.indexOf(g[i])>=0) c++; } return [b,c]; }
    function draw(){
      hist.innerHTML = rows.map((r,i)=>`<div class="g-line" style="justify-content:space-between;background:rgba(255,255,255,.07);border-radius:10px;padding:6px 14px;margin:3px 0;"><b>${i+1}.</b><span style="font-size:24px;letter-spacing:6px;">${r.g}</span><span>🐂${r.b} 🐄${r.c}</span></div>`).join('');
      cur.textContent = typed.padEnd(4,'·').split('').join(' '); api.setInfo('Essai '+Math.min(rows.length+1,10)+'/10');
    }
    function submit(){
      if(typed.length<4){ api.toast('4 chiffres'); return; }
      if(new Set(typed).size<4){ api.toast('Chiffres tous différents'); return; }
      const s = score(typed); rows.push({ g:typed, b:s[0], c:s[1] }); typed = ''; api.sfx(s[0]===4 ? 'win' : 'tap'); draw();
      if(s[0]===4){ done = true; const secs = Math.round((Date.now()-t0)/1000), sc = (11-rows.length)*100+Math.max(0,180-secs); api.setScore(sc); api.end(sc,{ win:true, title:'Code trouvé !', msg:'En '+rows.length+' essai'+(rows.length>1?'s':'')+'.' }); }
      else if(rows.length>=10){ done = true; api.end(0,{ title:'Perdu !', msg:'Le code était '+secret }); }
    }
    numpad(api, wrap, k=>{ if(done||api.ended) return; if(k==='back') typed = typed.slice(0,-1); else if(k==='ok'){ submit(); return; } else if(typed.length<4) typed += k; draw(); });
    SCCG.lab._taureaux = { secret:()=>secret };
    draw();
  }
});
})();

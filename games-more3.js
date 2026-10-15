/* ==========================================================
   LOT 3 — Billard, Bulles, Bonbons, Grille de blocs, Zigzag,
   Couteaux, Course, Coupe-fruits, Artillerie (9 jeux)
   ========================================================== */
(function(){
'use strict';
const U = SCCG.util, rnd = U.rnd, rndf = U.rndf, shuffle = U.shuffle, pick = U.pick, el = U.el;
const R = d=>{ d.isNew = true; SCCG.register(d); };
const clamp = (v,a,b)=> Math.max(a, Math.min(b, v));
const TAU = Math.PI*2;
const rrect = (g,x,y,w,h,r)=>{ g.beginPath(); g.moveTo(x+r,y); g.arcTo(x+w,y,x+w,y+h,r); g.arcTo(x+w,y+h,x,y+h,r); g.arcTo(x,y+h,x,y,r); g.arcTo(x,y,x+w,y,r); g.closePath(); };
const emoji = (g,ch,x,y,size)=>{ g.font = size+'px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(ch,x,y); };

/* ---------------------------------------------------------- BILLARD */
R({ id:'billard', name:'Billard', emoji:'🎱', cat:'Sport', hue:150,
  desc:'Empoche toutes les boules en un minimum de coups.',
  how:"Pose ton doigt près de la boule blanche, tire en arrière pour viser (la ligne montre la direction, plus tu tires loin plus c'est fort) puis relâche. Empoche les 6 boules de couleur : +10 points chacune, et un bonus pour chaque coup non utilisé. Tu as 12 coups. Attention à ne pas empocher la blanche !",
  create(api){
    const W = 320, H = 480, M = 22, BR = 10, c = api.canvas(W,H), g = c.g;
    const pockets = [[M,M],[W-M,M],[M,H-M],[W-M,H-M],[M,H/2],[W-M,H/2]];
    const COL = ['#ef4444','#f2c94c','#3b82f6','#22c55e','#a855f7','#f97316'];
    let balls = [], cue, shots = 12, score = 0, drag = null, moving = false, pocketed = 0, scratched = false;
    function rack(){
      balls = []; let k = 0;
      for(let r=0;r<3;r++) for(let i=0;i<=r;i++){ balls.push({ x:W/2+(i-r/2)*(BR*2+.6), y:170+r*(BR*1.75+.5), vx:0, vy:0, col:COL[k++%6], alive:true }); }
      cue = { x:W/2, y:385, vx:0, vy:0, col:'#fff', alive:true, cue:true }; balls.push(cue);
    }
    const info = ()=> api.setInfo('Coups : '+shots+' • boules : '+(6-pocketed)+'/6');
    function physics(dt){
      let maxS = 0; balls.forEach(b=>{ if(b.alive) maxS = Math.max(maxS,Math.hypot(b.vx,b.vy)); });
      const n = Math.max(1,Math.ceil(maxS*dt/5)), h = dt/n;
      for(let s=0;s<n;s++){
        balls.forEach(b=>{
          if(!b.alive) return; b.x += b.vx*h; b.y += b.vy*h;
          if(b.x<M+BR){ b.x = M+BR; b.vx = Math.abs(b.vx)*.86; } if(b.x>W-M-BR){ b.x = W-M-BR; b.vx = -Math.abs(b.vx)*.86; }
          if(b.y<M+BR){ b.y = M+BR; b.vy = Math.abs(b.vy)*.86; } if(b.y>H-M-BR){ b.y = H-M-BR; b.vy = -Math.abs(b.vy)*.86; }
        });
        for(let i=0;i<balls.length;i++) for(let j=i+1;j<balls.length;j++){
          const a = balls[i], b = balls[j]; if(!a.alive || !b.alive) continue;
          const dx = b.x-a.x, dy = b.y-a.y, d = Math.hypot(dx,dy);
          if(d<BR*2 && d>0){
            const nx = dx/d, ny = dy/d, ov = BR*2-d; a.x -= nx*ov/2; a.y -= ny*ov/2; b.x += nx*ov/2; b.y += ny*ov/2;
            const dv = (a.vx-b.vx)*nx+(a.vy-b.vy)*ny;
            if(dv>0){ a.vx -= dv*nx; a.vy -= dv*ny; b.vx += dv*nx; b.vy += dv*ny; api.sfx('tap'); }
          }
        }
        balls.forEach(b=>{
          if(!b.alive) return;
          for(const p of pockets){ if(Math.hypot(b.x-p[0],b.y-p[1])<17){
            b.alive = false; b.vx = b.vy = 0;
            if(b.cue){ scratched = true; api.sfx('bad'); api.toast('Blanche empochée !'); }
            else { pocketed++; score += 10; api.setScore(score); api.sfx('good'); info(); }
            break; } }
        });
      }
      const f = Math.pow(.38,dt);
      balls.forEach(b=>{ if(!b.alive) return; b.vx *= f; b.vy *= f; const sp = Math.hypot(b.vx,b.vy); if(sp<7){ b.vx = b.vy = 0; } });
    }
    function endShot(){
      moving = false;
      if(scratched){ scratched = false; cue.alive = true; cue.x = W/2; cue.y = 385; cue.vx = cue.vy = 0; let t = 0; while(balls.some(b=>b!==cue && b.alive && Math.hypot(b.x-cue.x,b.y-cue.y)<BR*2.2) && t<20){ cue.y -= 6; t++; } }
      info();
      if(pocketed>=6){ const bonus = shots*15; score += bonus; api.setScore(score); api.sfx('win'); api.end(score,{ win:true, title:'Table nettoyée !', msg:'Bonus : '+bonus+' points pour '+shots+' coup(s) restant(s).' }); }
      else if(shots<=0) api.end(score,{ title:'Plus de coups', msg:pocketed+' boule(s) empochée(s) sur 6.' });
    }
    function draw(){
      g.fillStyle = '#5b3a1e'; g.fillRect(0,0,W,H); g.fillStyle = '#0f7a4a'; g.fillRect(M-6,M-6,W-2*M+12,H-2*M+12); g.fillStyle = '#17b068'; g.fillRect(M,M,W-2*M,H-2*M);
      g.fillStyle = '#0a0a0a'; pockets.forEach(p=>{ g.beginPath(); g.arc(p[0],p[1],17,0,TAU); g.fill(); });
      balls.forEach(b=>{ if(!b.alive) return; g.fillStyle = 'rgba(0,0,0,.25)'; g.beginPath(); g.arc(b.x+2,b.y+2,BR,0,TAU); g.fill(); g.fillStyle = b.col; g.beginPath(); g.arc(b.x,b.y,BR,0,TAU); g.fill(); g.fillStyle = 'rgba(255,255,255,.55)'; g.beginPath(); g.arc(b.x-3,b.y-3,3,0,TAU); g.fill(); });
      if(drag && !moving && cue.alive){
        const dx = cue.x-drag.x, dy = cue.y-drag.y, len = Math.hypot(dx,dy), p = Math.min(1,len/140);
        if(len>6){ g.strokeStyle = `rgba(255,255,255,${.4+p*.5})`; g.lineWidth = 2; g.setLineDash([6,6]); g.beginPath(); g.moveTo(cue.x,cue.y); g.lineTo(cue.x+dx/len*(120+p*120),cue.y+dy/len*(120+p*120)); g.stroke(); g.setLineDash([]);
          g.strokeStyle = '#d9a066'; g.lineWidth = 5; g.beginPath(); g.moveTo(cue.x-dx/len*14,cue.y-dy/len*14); g.lineTo(cue.x-dx/len*(14+p*70+30),cue.y-dy/len*(14+p*70+30)); g.stroke(); }
      }
    }
    api.on(api.root,'pointerdown',e=>{ if(moving || api.ended || !cue.alive) return; const p = c.pos(e); if(Math.hypot(p.x-cue.x,p.y-cue.y)<60) drag = p; });
    api.on(api.root,'pointermove',e=>{ if(drag) drag = c.pos(e); });
    api.on(window,'pointerup',()=>{
      if(!drag || moving) { drag = null; return; }
      const dx = cue.x-drag.x, dy = cue.y-drag.y, len = Math.hypot(dx,dy); drag = null;
      if(len<12) return; const sp = Math.min(1,len/140)*900; cue.vx = dx/len*sp; cue.vy = dy/len*sp; shots--; moving = true; api.sfx('shoot'); info();
    });
    api.loop(dt=>{ if(moving){ physics(dt); if(!balls.some(b=>b.alive && (b.vx||b.vy))) endShot(); } draw(); });
    SCCG.lab._billard = { balls:()=>balls, shots:()=>shots, moving:()=>moving, cue:()=>cue, pocketed:()=>pocketed }; // (accès pour les tests)
    rack(); info(); draw();
  }
});

/* ---------------------------------------------------------- BULLES (bubble shooter) */
R({ id:'bulles', name:'Bulles', emoji:'🫧', cat:'Réflexion', hue:200,
  desc:'Tire des bulles et fais éclater les groupes de même couleur.',
  how:"Vise avec ton doigt et relâche pour tirer une bulle. Quand 3 bulles ou plus de la même couleur se touchent, elles éclatent ! Les bulles qui ne tiennent plus au plafond tombent aussi. Une nouvelle rangée descend régulièrement : ne laisse pas les bulles atteindre le bas !",
  create(api){
    const W = 320, H = 480, BR = 16, RH = BR*1.732, NCOL = 10, MAXR = 13, c = api.canvas(W,H), g = c.g;
    const COLS = ['#ef4444','#f2c94c','#22c55e','#3b82f6','#a855f7'];
    let rows = [], shift = 0, shots = 0, score = 0, cur, nxt, fly = null, aim = Math.PI/2, level = 1;
    const par = r=> (r+shift)%2;
    const cols = r=> par(r) ? NCOL-1 : NCOL;
    const posX = (r,cc)=> BR + cc*BR*2 + (par(r)? BR : 0);
    const posY = r=> BR + r*RH;
    const mkRow = ()=> Array.from({length:NCOL},()=>rnd(5));
    function get(r,cc){ if(r<0||r>=rows.length||cc<0||cc>=cols(r)) return -2; return rows[r][cc]; }
    function neigh(r,cc){
      const o = par(r) ? [[0,-1],[0,1],[-1,0],[-1,1],[1,0],[1,1]] : [[0,-1],[0,1],[-1,-1],[-1,0],[1,-1],[1,0]];
      return o.map(d=>[r+d[0],cc+d[1]]).filter(p=>p[0]>=0&&p[0]<rows.length&&p[1]>=0&&p[1]<cols(p[0]));
    }
    function colorsLeft(){ const s = {}; rows.forEach(r=>r.forEach(v=>{ if(v>=0) s[v] = 1; })); const k = Object.keys(s).map(Number); return k.length ? k : [0,1,2]; }
    function newBall(){ return pick(colorsLeft()); }
    function setup(){
      rows = []; shift = 0; for(let r=0;r<5+Math.min(3,level);r++){ const row = mkRow(); if(par(r)) row[NCOL-1] = -1; rows.push(row); } cur = newBall(); nxt = newBall(); fly = null;
    }
    function addRow(){ shift++; const row = mkRow(); if(par(0)) row[NCOL-1] = -1; rows.unshift(row); }
    function snap(x,y){
      let r = clamp(Math.round((y-BR)/RH),0,MAXR+1); while(rows.length<=r) rows.push(Array(NCOL).fill(-1).map((v,i)=>(i===NCOL-1&&par(rows.length))? -1 : -1));
      let best = null, bd = 1e9;
      for(let rr=Math.max(0,r-1); rr<=Math.min(rows.length-1,r+1); rr++) for(let cc=0;cc<cols(rr);cc++){ if(rows[rr][cc]>=0) continue; const d = Math.hypot(posX(rr,cc)-x,posY(rr)-y); if(d<bd){ bd = d; best = [rr,cc]; } }
      return best;
    }
    function land(){
      const cell = snap(fly.x,fly.y); const col = fly.col; fly = null; if(!cell){ return; }
      rows[cell[0]][cell[1]] = col; api.sfx('tap');
      const seen = {}, grp = [], st = [cell]; seen[cell.join(',')] = 1;
      while(st.length){ const p = st.pop(); grp.push(p); neigh(p[0],p[1]).forEach(n=>{ const k = n.join(','); if(!seen[k] && rows[n[0]][n[1]]===col){ seen[k] = 1; st.push(n); } }); }
      let popped = 0;
      if(grp.length>=3){ grp.forEach(p=>{ rows[p[0]][p[1]] = -1; }); popped = grp.length; score += popped*10; api.sfx('pop'); }
      // bulles flottantes
      const conn = {}, st2 = []; for(let cc=0;cc<cols(0);cc++) if(rows[0][cc]>=0){ conn['0,'+cc] = 1; st2.push([0,cc]); }
      while(st2.length){ const p = st2.pop(); neigh(p[0],p[1]).forEach(n=>{ const k = n.join(','); if(!conn[k] && rows[n[0]][n[1]]>=0){ conn[k] = 1; st2.push(n); } }); }
      let drop = 0; rows.forEach((row,r)=>row.forEach((v,cc)=>{ if(v>=0 && cc<cols(r) && !conn[r+','+cc]){ rows[r][cc] = -1; drop++; } }));
      if(drop){ score += drop*20; api.sfx('win'); }
      api.setScore(score);
      while(rows.length && rows[rows.length-1].every(v=>v<0)) rows.pop();
      shots++; if(shots%6===0 && rows.length) addRow();
      cur = nxt; nxt = newBall();
      if(!rows.length || rows.every(r=>r.every(v=>v<0))){ level++; score += 200; api.setScore(score); api.sfx('win'); api.toast('Tableau nettoyé ! +200'); setup(); }
      else if(rows.length>MAXR || rows.slice(MAXR).some(r=>r.some(v=>v>=0))){ api.sfx('lose'); api.end(score,{ title:'Les bulles débordent !', msg:'Niveau atteint : '+level }); }
      api.setInfo('Niveau '+level);
    }
    function fire(){
      if(fly || api.ended) return; fly = { x:W/2, y:H-30, vx:Math.cos(aim)*640, vy:-Math.sin(aim)*640, col:cur }; api.sfx('shoot');
    }
    function draw(){
      g.fillStyle = '#0d1b2e'; g.fillRect(0,0,W,H);
      g.strokeStyle = 'rgba(239,68,68,.5)'; g.setLineDash([6,6]); g.beginPath(); g.moveTo(0,posY(MAXR-1)+BR); g.lineTo(W,posY(MAXR-1)+BR); g.stroke(); g.setLineDash([]);
      rows.forEach((row,r)=>row.forEach((v,cc)=>{ if(v>=0 && cc<cols(r)){ const x = posX(r,cc), y = posY(r); g.fillStyle = COLS[v]; g.beginPath(); g.arc(x,y,BR-1,0,TAU); g.fill(); g.fillStyle = 'rgba(255,255,255,.4)'; g.beginPath(); g.arc(x-5,y-5,4,0,TAU); g.fill(); } }));
      g.strokeStyle = 'rgba(255,255,255,.35)'; g.setLineDash([4,8]); g.beginPath(); g.moveTo(W/2,H-30); g.lineTo(W/2+Math.cos(aim)*150,H-30-Math.sin(aim)*150); g.stroke(); g.setLineDash([]);
      if(fly){ g.fillStyle = COLS[fly.col]; g.beginPath(); g.arc(fly.x,fly.y,BR-1,0,TAU); g.fill(); }
      g.fillStyle = COLS[cur]; g.beginPath(); g.arc(W/2,H-30,BR-1,0,TAU); g.fill(); g.fillStyle = COLS[nxt]; g.beginPath(); g.arc(50,H-26,10,0,TAU); g.fill(); g.fillStyle = '#fff'; g.font = '700 10px sans-serif'; g.textAlign = 'center'; g.fillText('SUIVANT',50,H-8);
    }
    const setAim = e=>{ const p = c.pos(e); let a = Math.atan2(-(p.y-(H-30)), p.x-W/2); a = clamp(a,.17,Math.PI-.17); aim = a; };
    api.on(api.root,'pointerdown',setAim); api.on(api.root,'pointermove',e=>{ if(e.buttons||e.pressure>0) setAim(e); });
    api.on(window,'pointerup',()=>{ fire(); });
    api.onKey(k=>{ if(k==='left') aim = clamp(aim+.08,.17,Math.PI-.17); else if(k==='right') aim = clamp(aim-.08,.17,Math.PI-.17); else if(k==='space'||k==='up') fire(); });
    api.loop(dt=>{
      if(fly){
        let steps = Math.ceil(640*dt/4);
        for(let i=0;i<steps && fly;i++){
          fly.x += fly.vx*dt/steps; fly.y += fly.vy*dt/steps;
          if(fly.x<BR){ fly.x = BR; fly.vx = Math.abs(fly.vx); } if(fly.x>W-BR){ fly.x = W-BR; fly.vx = -Math.abs(fly.vx); }
          let hit = fly.y<=BR;
          if(!hit) rows.forEach((row,r)=>row.forEach((v,cc)=>{ if(!hit && v>=0 && cc<cols(r) && Math.hypot(posX(r,cc)-fly.x,posY(r)-fly.y)<BR*1.8) hit = true; }));
          if(hit){ land(); break; }
        }
      }
      draw();
    });
    SCCG.lab._bulles = { rows:()=>rows, cols, fire, aim:a=>{ aim = a; }, flying:()=>!!fly, state:()=>({ shots, score, level }) };
    setup(); api.setInfo('Niveau 1'); draw();
  }
});

/* ---------------------------------------------------------- BONBONS (match-3) */
R({ id:'bonbons', name:'Bonbons', emoji:'🍬', cat:'Réflexion', hue:320,
  desc:'Aligne 3 bonbons identiques pour les faire disparaître.',
  how:"Échange deux bonbons voisins (touche-en un puis son voisin, ou glisse ton doigt) pour aligner 3 bonbons identiques ou plus. Les alignements disparaissent et de nouveaux bonbons tombent : les réactions en chaîne rapportent gros ! Tu as 25 échanges.",
  create(api){
    const N = 8, S = 40, W = N*S, c = api.canvas(W,W+50), g = c.g, KINDS = ['🍬','🍭','🍫','🍩','🍓','🍋'];
    const BG = ['#e0457b','#b455d6','#8a5a2f','#f59e0b','#ef4444','#eab308'];
    let grid, sel = null, busy = false, moves = 25, score = 0, flash = [];
    const findMatches = ()=>{
      const m = {};
      for(let r=0;r<N;r++){ let k = 0; while(k<N){ let e = k; while(e+1<N && grid[r][e+1]===grid[r][k] && grid[r][k]>=0) e++; if(e-k>=2) for(let i=k;i<=e;i++) m[r*N+i] = 1; k = e+1; } }
      for(let cc=0;cc<N;cc++){ let k = 0; while(k<N){ let e = k; while(e+1<N && grid[e+1][cc]===grid[k][cc] && grid[k][cc]>=0) e++; if(e-k>=2) for(let i=k;i<=e;i++) m[i*N+cc] = 1; k = e+1; } }
      return Object.keys(m).map(Number);
    };
    const swap = (a,b)=>{ const t = grid[(a/N)|0][a%N]; grid[(a/N)|0][a%N] = grid[(b/N)|0][b%N]; grid[(b/N)|0][b%N] = t; };
    function hasMove(){
      for(let i=0;i<N*N;i++){ for(const d of [1,N]){ const j = i+d; if(d===1 && (i%N)===N-1) continue; if(j>=N*N) continue; swap(i,j); const ok = findMatches().length>0; swap(i,j); if(ok) return true; } }
      return false;
    }
    function fresh(){
      do { grid = Array.from({length:N},()=>Array.from({length:N},()=>rnd(6))); let guard = 0; while(findMatches().length && guard++<200){ findMatches().forEach(i=>{ grid[(i/N)|0][i%N] = rnd(6); }); } } while(!hasMove());
    }
    const info = ()=> api.setInfo('Échanges : '+moves);
    function cascade(chain){
      const m = findMatches();
      if(!m.length){ busy = false; if(moves<=0) return api.end(score,{ title:'Plus d\'échanges !', msg:'Bien joué !' }); if(!hasMove()){ api.toast('Plus de coups : on mélange'); fresh(); } return; }
      flash = m; api.sfx(chain>1 ? 'win' : 'pop'); score += m.length*10*chain; api.setScore(score); if(chain>1) api.toast('Réaction en chaîne x'+chain+' !');
      api.after(280,()=>{
        m.forEach(i=>{ grid[(i/N)|0][i%N] = -1; }); flash = [];
        for(let cc=0;cc<N;cc++){ const col = []; for(let r=N-1;r>=0;r--) if(grid[r][cc]>=0) col.push(grid[r][cc]); while(col.length<N) col.push(rnd(6)); for(let r=N-1,i=0;r>=0;r--,i++) grid[r][cc] = col[i]; }
        api.after(250,()=>cascade(chain+1));
      });
    }
    function trySwap(a,b){
      if(busy || api.ended) return; busy = true; sel = null; swap(a,b);
      if(findMatches().length){ moves--; info(); api.sfx('tap'); cascade(1); }
      else { api.sfx('bad'); api.after(250,()=>{ swap(a,b); busy = false; }); }
    }
    const cellAt = p=>{ const cc = Math.floor(p.x/S), r = Math.floor(p.y/S); return (r>=0&&r<N&&cc>=0&&cc<N) ? r*N+cc : -1; };
    let down = -1;
    api.on(api.root,'pointerdown',e=>{
      if(busy) return; const i = cellAt(c.pos(e)); if(i<0) return; down = i;
      if(sel!==null && sel!==i){ const d = Math.abs(sel-i); if((d===1 && (sel/N|0)===(i/N|0)) || d===N){ const a = sel; down = -1; trySwap(a,i); return; } }
      sel = i; api.sfx('move');
    });
    api.on(api.root,'pointermove',e=>{
      if(busy || down<0 || !(e.buttons||e.pressure>0)) return; const i = cellAt(c.pos(e)); if(i<0 || i===down) return;
      const d = Math.abs(down-i); if((d===1 && (down/N|0)===(i/N|0)) || d===N){ const a = down; down = -1; trySwap(a,i); }
    });
    api.on(window,'pointerup',()=>{ down = -1; });
    api.loop(()=>{
      g.fillStyle = '#2a1330'; g.fillRect(0,0,W,W+50);
      for(let r=0;r<N;r++) for(let cc=0;cc<N;cc++){
        const v = grid[r][cc], x = cc*S, y = r*S, i = r*N+cc; if(v<0) continue;
        g.fillStyle = (r+cc)%2 ? 'rgba(255,255,255,.05)' : 'rgba(255,255,255,.1)'; g.fillRect(x,y,S,S);
        g.globalAlpha = flash.indexOf(i)>=0 ? .35+.3*Math.sin(Date.now()/40) : 1;
        g.fillStyle = BG[v]; rrect(g,x+3,y+3,S-6,S-6,10); g.fill(); g.fillStyle = '#fff'; emoji(g,KINDS[v],x+S/2,y+S/2+1,S*.6); g.globalAlpha = 1;
        if(sel===i){ g.strokeStyle = '#fff'; g.lineWidth = 3; rrect(g,x+2,y+2,S-4,S-4,10); g.stroke(); }
      }
      g.fillStyle = '#f6efe4'; g.font = '700 16px sans-serif'; g.textAlign = 'center'; g.fillText('Score : '+score,W/2,W+30);
    });
    SCCG.lab._bonbons = { grid:()=>grid, trySwap, findMatches, hasMove, busy:()=>busy, moves:()=>moves, score:()=>score };
    fresh(); info();
  }
});

/* ---------------------------------------------------------- GRILLE DE BLOCS */
const SHAPES = [
  [[1]],[[1,1]],[[1],[1]],[[1,1,1]],[[1],[1],[1]],[[1,1,1,1]],[[1],[1],[1],[1]],[[1,1,1,1,1]],[[1],[1],[1],[1],[1]],
  [[1,1],[1,1]],[[1,1,1],[1,1,1],[1,1,1]],[[1,0],[1,1]],[[0,1],[1,1]],[[1,1],[1,0]],[[1,1],[0,1]],
  [[1,0,0],[1,0,0],[1,1,1]],[[0,0,1],[0,0,1],[1,1,1]],[[1,1,1],[1,0,0],[1,0,0]],[[1,1,1],[0,0,1],[0,0,1]],
  [[1,1,1],[0,1,0]],[[0,1],[1,1],[0,1]],[[1,1],[1,1],[1,1]],[[1,1,1],[1,1,1]]
];
SCCG.lab.blocShapes = SHAPES;
R({ id:'grilleblocs', name:'Grille de blocs', emoji:'🟦', cat:'Réflexion', hue:225,
  desc:'Place les formes et complète lignes et colonnes.',
  how:"Fais glisser une forme du bas vers la grille (elle se pose au-dessus de ton doigt pour que tu la voies). Une ligne ou une colonne complète disparaît et rapporte des points. Quand les 3 formes sont posées, 3 nouvelles arrivent. La partie s'arrête quand plus aucune forme ne peut être posée.",
  create(api){
    const W = 320, H = 480, CS = 30, GX = 10, GY = 10, c = api.canvas(W,H), g = c.g, COL = ['#ef4444','#f97316','#eab308','#22c55e','#06b6d4','#3b82f6','#a855f7','#ec4899'];
    let grid = Array.from({length:10},()=>Array(10).fill(-1)), tray = [], drag = null, score = 0, over = false;
    const newTray = ()=>{ tray = [0,1,2].map(()=>{ const i = rnd(SHAPES.length); return { s:SHAPES[i], col:i%COL.length, used:false }; }); };
    const fits = (s,r,cc)=>{ if(r<0||cc<0||r+s.length>10||cc+s[0].length>10) return false; for(let i=0;i<s.length;i++) for(let j=0;j<s[0].length;j++) if(s[i][j] && grid[r+i][cc+j]>=0) return false; return true; };
    const canAny = ()=> tray.some(t=>!t.used && (()=>{ for(let r=0;r<10;r++) for(let cc=0;cc<10;cc++) if(fits(t.s,r,cc)) return true; return false; })());
    const slotX = i=> 20+i*100, slotY = 340;
    const scale = t=> Math.min(1,86/(Math.max(t.s.length,t.s[0].length)*CS));
    function place(t,r,cc){
      let n = 0; t.s.forEach((row,i)=>row.forEach((v,j)=>{ if(v){ grid[r+i][cc+j] = t.col; n++; } }));
      const rowsF = [], colsF = []; for(let i=0;i<10;i++){ if(grid[i].every(v=>v>=0)) rowsF.push(i); if(grid.every(rw=>rw[i]>=0)) colsF.push(i); }
      rowsF.forEach(i=>{ for(let j=0;j<10;j++) grid[i][j] = -1; }); colsF.forEach(j=>{ for(let i=0;i<10;i++) grid[i][j] = -1; });
      const lines = rowsF.length+colsF.length; score += n + (lines ? 10*lines*lines : 0); api.setScore(score);
      api.sfx(lines ? 'line' : 'tap'); if(lines>1) api.toast('Combo x'+lines+' !');
      t.used = true; if(tray.every(x=>x.used)) newTray();
      if(!canAny()){ over = true; api.sfx('lose'); api.end(score,{ title:'Plus de place !', msg:'Bien joué !' }); }
    }
    function drawShape(s,x,y,cs,col,alpha){ g.globalAlpha = alpha||1; g.fillStyle = col; s.forEach((row,i)=>row.forEach((v,j)=>{ if(v){ rrect(g,x+j*cs+1,y+i*cs+1,cs-2,cs-2,4); g.fill(); } })); g.globalAlpha = 1; }
    const target = ()=>{ if(!drag) return null; const t = tray[drag.i], r = Math.round((drag.y-GY)/CS-t.s.length/2), cc = Math.round((drag.x-GX)/CS-t.s[0].length/2); return { r, cc }; };
    function draw(){
      g.fillStyle = '#10182b'; g.fillRect(0,0,W,H); g.fillStyle = '#1b2742'; rrect(g,GX-4,GY-4,CS*10+8,CS*10+8,8); g.fill();
      for(let r=0;r<10;r++) for(let cc=0;cc<10;cc++){ g.fillStyle = grid[r][cc]>=0 ? COL[grid[r][cc]] : ((r+cc)%2 ? '#22304f' : '#26365a'); rrect(g,GX+cc*CS+1,GY+r*CS+1,CS-2,CS-2,4); g.fill(); }
      const tg = target(); if(tg){ const t = tray[drag.i]; if(fits(t.s,tg.r,tg.cc)) drawShape(t.s,GX+tg.cc*CS,GY+tg.r*CS,CS,'#ffffff',.35); }
      tray.forEach((t,i)=>{ if(t.used || (drag && drag.i===i)) return; const sc = scale(t), cs = CS*sc, w = t.s[0].length*cs, h = t.s.length*cs; drawShape(t.s,slotX(i)+(86-w)/2,slotY+(100-h)/2,cs,COL[t.col]); });
      if(drag){ const t = tray[drag.i]; drawShape(t.s,drag.x-t.s[0].length*CS/2,drag.y-t.s.length*CS/2,CS,COL[t.col],.9); }
      if(!tray.some(t=>!t.used)){}
    }
    api.on(api.root,'pointerdown',e=>{ if(over) return; const p = c.pos(e); for(let i=0;i<3;i++){ const t = tray[i]; if(!t.used && p.x>=slotX(i)-6 && p.x<=slotX(i)+96 && p.y>=slotY-10){ drag = { i, x:p.x, y:p.y-60 }; api.sfx('move'); return; } } });
    api.on(api.root,'pointermove',e=>{ if(drag){ const p = c.pos(e); drag.x = p.x; drag.y = p.y-60; } });
    api.on(window,'pointerup',()=>{ if(!drag) return; const t = tray[drag.i], tg = target(); const d = drag; drag = null; if(tg && fits(t.s,tg.r,tg.cc)) place(t,tg.r,tg.cc); else api.sfx('bad'); });
    api.loop(()=>draw());
    SCCG.lab._grille = { grid:()=>grid, tray:()=>tray, place, fits, canAny, score:()=>score };
    api.setScore(0); newTray(); draw();
  }
});

/* ---------------------------------------------------------- ZIGZAG */
R({ id:'zigzag', name:'Zigzag', emoji:'↗️', cat:'Arcade', hue:165,
  desc:'Reste sur le chemin en changeant de direction au bon moment.',
  how:"La boule avance toute seule en diagonale. Touche l'écran (ou la barre espace) pour changer de direction, gauche ↔ droite, au bon moment pour suivre le chemin. Si tu sors du chemin, c'est perdu ! La vitesse augmente peu à peu.",
  create(api){
    const W = 320, H = 480, BY = 340, HALF = 27, c = api.canvas(W,H), g = c.g;
    let verts = [{ x:160, y:0 }], b = { x:160, y:0, d:1 }, cam = 0, dist = 0, score = 0, speed = 170, gems = [];
    function extend(){
      while(verts[verts.length-1].y>b.y-700){
        const v = verts[verts.length-1]; let d = Math.random()<.5 ? 1 : -1; const len = rndf(70,190);
        if(v.x+d*len>W-60) d = -1; else if(v.x+d*len<60) d = 1;
        let nx = clamp(v.x+d*len,60,W-60); const real = Math.abs(nx-v.x) || len;
        verts.push({ x:nx, y:v.y-real });
        if(Math.random()<.35) gems.push({ x:(v.x+nx)/2, y:v.y-real/2, got:false });
      }
    }
    function centerAt(y){
      for(let i=0;i<verts.length-1;i++){ const a = verts[i], bb = verts[i+1]; if(y<=a.y && y>=bb.y){ const t = (a.y-y)/(a.y-bb.y || 1); return a.x+(bb.x-a.x)*t; } }
      return verts[verts.length-1].x;
    }
    const turn = ()=>{ if(api.ended) return; b.d *= -1; api.sfx('tap'); };
    api.on(api.root,'pointerdown',turn); api.onKey(k=>{ if(k==='space'||k==='left'||k==='right'||k==='up') turn(); });
    api.loop(dt=>{
      speed = Math.min(360,170+dist/22); b.y -= speed*dt; b.x += b.d*speed*dt; dist += speed*dt; cam = b.y-BY; extend();
      const cx = centerAt(b.y);
      gems.forEach(gm=>{ if(!gm.got && Math.hypot(gm.x-b.x,gm.y-b.y)<20){ gm.got = true; score += 5; api.sfx('good'); } });
      const s = Math.floor(dist/12)+0; const total = s + gems.filter(x=>x.got).length*5; if(total!==score){ score = total; api.setScore(score); }
      gems = gems.filter(gm=>gm.y<b.y+200);
      if(Math.abs(b.x-cx)>HALF+4){ api.sfx('lose'); api.vibrate(150); api.end(score,{ title:'Tu es sorti du chemin !' }); return; }
      g.fillStyle = '#0e1a2b'; g.fillRect(0,0,W,H);
      g.lineJoin = 'round'; g.lineCap = 'round';
      g.strokeStyle = '#1f6f5c'; g.lineWidth = HALF*2+8; g.beginPath(); verts.forEach((v,i)=>{ const x = v.x, y = v.y-cam; if(i) g.lineTo(x,y); else g.moveTo(x,y); }); g.stroke();
      g.strokeStyle = '#34d399'; g.lineWidth = HALF*2-2; g.beginPath(); verts.forEach((v,i)=>{ const x = v.x, y = v.y-cam; if(i) g.lineTo(x,y); else g.moveTo(x,y); }); g.stroke();
      gems.forEach(gm=>{ if(!gm.got){ g.fillStyle = '#fff'; emoji(g,'💎',gm.x,gm.y-cam,20); } });
      g.fillStyle = '#ffd166'; g.beginPath(); g.arc(b.x,BY,11,0,TAU); g.fill(); g.fillStyle = 'rgba(0,0,0,.2)'; g.beginPath(); g.arc(b.x+3,BY+3,11,0,TAU); g.fill(); g.fillStyle = '#ffd166'; g.beginPath(); g.arc(b.x,BY,11,0,TAU); g.fill();
    });
    SCCG.lab._zigzag = { b:()=>b, verts:()=>verts, turn };
    extend();
  }
});

/* ---------------------------------------------------------- COUTEAUX */
R({ id:'couteaux', name:'Couteaux', emoji:'🔪', cat:'Arcade', hue:0,
  desc:'Plante les couteaux dans la bûche sans toucher les autres.',
  how:"Une bûche tourne. Touche l'écran au bon moment pour lancer un couteau dedans, mais ne touche surtout pas un couteau déjà planté ! Plante tous les couteaux demandés pour passer au niveau suivant. Chaque couteau = +1 point.",
  create(api){
    const W = 320, H = 480, CX = 160, CY = 170, LR = 58, c = api.canvas(W,H), g = c.g;
    let stage = 0, knives = [], need = 0, thrown = 0, rot = 0, t = 0, score = 0, fly = null, over = false, flashT = 0;
    const mod = a=>{ a %= TAU; return a<0 ? a+TAU : a; };
    const angDiff = (a,b)=>{ const d = Math.abs(mod(a)-mod(b)); return Math.min(d,TAU-d); };
    function newStage(){
      stage++; need = 5+Math.min(7,stage); thrown = 0; knives = []; fly = null;
      const pre = Math.min(5,1+Math.floor(stage/2)); for(let i=0;i<pre;i++){ let a, tries = 0; do { a = rndf(0,TAU); tries++; } while(knives.some(k=>angDiff(k,a)<.5) && tries<40); knives.push(a); }
      rot = 0; t = 0; api.setInfo('Niveau '+stage+' • '+(need-thrown)+' couteaux');
    }
    const speedAt = ()=> { const base = 1.6+stage*.18; return (Math.sin(t*(.8+stage*.05))>=0 ? 1 : -1)*base*(.7+.5*Math.abs(Math.sin(t*1.3))); };
    function throwK(){
      if(over || fly || api.ended) return; fly = { y:430, t:0 }; api.sfx('shoot');
    }
    function stick(){
      const a = Math.PI/2-rot; // angle de l'impact dans le repère de la bûche
      if(knives.some(k=>angDiff(k,a)<.2)){ over = true; api.sfx('boom'); api.vibrate(150); flashT = .5; api.after(500,()=>api.end(score,{ title:'Couteau contre couteau !', msg:'Niveau '+stage+'.' })); return; }
      knives.push(a); thrown++; score++; api.setScore(score); api.sfx('good'); api.setInfo('Niveau '+stage+' • '+(need-thrown)+' couteaux');
      if(thrown>=need){ score += 10; api.setScore(score); api.sfx('win'); api.toast('Niveau réussi ! +10'); over = true; api.after(900,()=>{ over = false; newStage(); }); }
    }
    api.on(api.root,'pointerdown',throwK); api.onKey(k=>{ if(k==='space'||k==='up') throwK(); });
    api.loop(dt=>{
      t += dt; if(!over || flashT<=0) rot += speedAt()*dt; if(flashT>0) flashT -= dt;
      if(fly){ fly.t += dt/.12; fly.y = 430-(430-(CY+LR+4))*Math.min(1,fly.t); if(fly.t>=1){ fly = null; stick(); } }
      g.fillStyle = flashT>0 ? '#4a0f0f' : '#2b1d12'; g.fillRect(0,0,W,H);
      g.save(); g.translate(CX,CY); g.rotate(rot);
      knives.forEach(a=>{ g.save(); g.rotate(a-Math.PI/2); g.fillStyle = '#d1d5db'; g.fillRect(-4,LR-2,8,34); g.fillStyle = '#7a4b1c'; g.fillRect(-4,LR+32,8,16); g.restore(); });
      g.fillStyle = '#a0662f'; g.beginPath(); g.arc(0,0,LR,0,TAU); g.fill(); g.strokeStyle = '#6f4420'; g.lineWidth = 3; g.beginPath(); g.arc(0,0,LR-12,0,TAU); g.stroke(); g.beginPath(); g.arc(0,0,LR-28,0,TAU); g.stroke();
      g.restore();
      if(fly){ g.fillStyle = '#d1d5db'; g.fillRect(CX-4,fly.y-20,8,34); g.fillStyle = '#7a4b1c'; g.fillRect(CX-4,fly.y+14,8,16); }
      else if(!over){ g.fillStyle = '#d1d5db'; g.fillRect(CX-4,410,8,34); g.fillStyle = '#7a4b1c'; g.fillRect(CX-4,444,8,16); }
      g.fillStyle = '#f6efe4'; for(let i=0;i<need-thrown;i++){ g.fillRect(20+i*14,H-16,8,12); }
    });
    SCCG.lab._couteaux = { pred:()=>Math.PI/2-(rot+speedAt()*.13), knives:()=>knives, throwK, stage:()=>stage, locked:()=>over||!!fly, angDiff };
    newStage();
  }
});

/* ---------------------------------------------------------- COURSE */
R({ id:'course', name:'Course', emoji:'🏎️', cat:'Arcade', hue:355,
  desc:'Évite les voitures et ramasse les pièces sur 3 voies.',
  how:"Glisse ton doigt à gauche ou à droite (ou touche la moitié gauche / droite de l'écran, ou flèches) pour changer de voie. Évite les autres voitures et ramasse les pièces 🪙. Tu roules de plus en plus vite !",
  create(api){
    const W = 320, H = 480, LW = 80, RX = 40, c = api.canvas(W,H), g = c.g;
    let lane = 1, x = RX+LW*1.5, cars = [], coins = [], dist = 0, speed = 220, sp1 = 0, sp2 = .8, tm = 0, score = 0, bonus = 0;
    const laneX = l=> RX+LW*(l+.5);
    const move = d=>{ if(api.ended) return; const nl = clamp(lane+d,0,2); if(nl!==lane){ lane = nl; api.sfx('move'); } };
    api.swipe(api.root, d=>{ if(d==='left') move(-1); else if(d==='right') move(1); }, { threshold:22 });
    api.on(api.root,'pointerdown',e=>{ const p = c.pos(e); if(Math.abs(p.x-x)>60) move(p.x<x ? -1 : 1); });
    api.onKey(k=>{ if(k==='left') move(-1); else if(k==='right') move(1); });
    api.buttons([{ t:'◀', down:()=>move(-1) },{ t:'▶', down:()=>move(1) }]);
    function drawCar(cx,cy,col,player){ g.fillStyle = 'rgba(0,0,0,.25)'; rrect(g,cx-17,cy-26,38,56,8); g.fill(); g.fillStyle = col; rrect(g,cx-18,cy-28,36,56,8); g.fill(); g.fillStyle = '#cfe9ff'; rrect(g,cx-13,player?cy-16:cy-6,26,16,4); g.fill(); g.fillStyle = '#111'; g.fillRect(cx-21,cy-18,4,12); g.fillRect(cx+17,cy-18,4,12); g.fillRect(cx-21,cy+8,4,12); g.fillRect(cx+17,cy+8,4,12); }
    api.loop(dt=>{
      tm += dt; speed = Math.min(560,220+tm*7); dist += speed*dt; x += (laneX(lane)-x)*Math.min(1,dt*14);
      const sc = Math.floor(dist/40)+bonus; if(sc!==score){ score = sc; api.setScore(score); }
      sp1 -= dt; if(sp1<=0){ const ln = rnd(3); if(!cars.some(cr=>cr.y<120 && cr.l!==ln) || true){ cars.push({ l:ln, y:-60, col:pick(['#3b82f6','#f2c94c','#a855f7','#22c55e','#f97316']), vy:speed*rndf(.35,.6) }); } sp1 = Math.max(.45,1.2-tm*.012); }
      sp2 -= dt; if(sp2<=0){ coins.push({ l:rnd(3), y:-30 }); sp2 = rndf(.8,1.8); }
      cars.forEach(cr=>{ cr.y += (speed-cr.vy)*dt; }); coins.forEach(co=>{ co.y += speed*dt; });
      cars = cars.filter(cr=>cr.y<H+80); coins = coins.filter(co=>co.y<H+30);
      for(const cr of cars){ if(Math.abs(laneX(cr.l)-x)<30 && Math.abs(cr.y-400)<50){ api.sfx('boom'); api.vibrate(180); api.end(score,{ title:'Accident !', msg:'Distance : '+Math.floor(dist/40)+' m' }); return; } }
      coins = coins.filter(co=>{ if(Math.abs(laneX(co.l)-x)<28 && Math.abs(co.y-400)<34){ bonus += 10; api.sfx('good'); return false; } return true; });
      g.fillStyle = '#2f8f4f'; g.fillRect(0,0,W,H); g.fillStyle = '#3b3b44'; g.fillRect(RX,0,LW*3,H);
      g.fillStyle = '#fff'; g.fillRect(RX-3,0,3,H); g.fillRect(RX+LW*3,0,3,H); g.fillStyle = '#ffffff99'; for(let l=1;l<3;l++) for(let y=-40+((dist%80));y<H;y+=80) g.fillRect(RX+LW*l-2,y,4,40);
      coins.forEach(co=>{ g.fillStyle = '#fff'; emoji(g,'🪙',laneX(co.l),co.y,26); });
      cars.forEach(cr=>drawCar(laneX(cr.l),cr.y,cr.col,false)); drawCar(x,400,'#ef4444',true);
    });
    SCCG.lab._course = { cars:()=>cars, lane:()=>lane, move, laneX };
  }
});

/* ---------------------------------------------------------- COUPE-FRUITS */
R({ id:'coupefruits', name:'Coupe-fruits', emoji:'🍉', cat:'Arcade', hue:105,
  desc:'Tranche les fruits qui volent, évite les bombes.',
  how:"Des fruits sont lancés en l'air : glisse ton doigt pour les trancher ! Plusieurs fruits d'un seul coup = bonus. N'effleure surtout pas une bombe 💣 : c'est la fin ! Un fruit qui tombe sans être tranché te coûte une vie ❤️ (3 vies).",
  create(api){
    const W = 320, H = 480, c = api.canvas(W,H), g = c.g, FR = ['🍉','🍊','🍎','🍋','🥝','🍍','🍑'];
    let objs = [], halves = [], trail = [], lives = 3, score = 0, t = 0, spT = 1, last = null, combo = 0;
    const info = ()=> api.setInfo('❤️'.repeat(lives));
    function launch(){
      const n = 1+rnd(Math.min(4,1+Math.floor(t/20)));
      for(let i=0;i<n;i++){ const bomb = Math.random()<Math.min(.25,.08+t*.002); objs.push({ x:rndf(50,W-50), y:H+30, vx:rndf(-70,70), vy:-rndf(560,720), e:bomb?'💣':pick(FR), bomb, r:24, rot:rndf(0,6), vr:rndf(-4,4) }); }
    }
    function slice(o){
      if(o.bomb){ api.sfx('boom'); api.vibrate(200); api.end(score,{ title:'Boum ! Une bombe !' }); return; }
      o.cut = true; combo++; halves.push({ x:o.x, y:o.y, vx:o.vx-90, vy:o.vy, e:o.e, rot:o.rot, vr:-3, side:0 }, { x:o.x, y:o.y, vx:o.vx+90, vy:o.vy, e:o.e, rot:o.rot, vr:3, side:1 });
      score++; api.setScore(score); api.sfx('pop');
    }
    function segHit(a,b,o){
      const dx = b.x-a.x, dy = b.y-a.y, l2 = dx*dx+dy*dy || 1; let tt = ((o.x-a.x)*dx+(o.y-a.y)*dy)/l2; tt = clamp(tt,0,1);
      return Math.hypot(a.x+dx*tt-o.x,a.y+dy*tt-o.y) < o.r+6;
    }
    function trackMove(e){
      const p = c.pos(e); if(last){ combo = 0; for(const o of objs){ if(!o.cut && segHit(last,p,o)){ slice(o); if(api.ended) return; } } if(combo>=3){ score += combo; api.setScore(score); api.toast('Combo x'+combo+' ! +'+combo); } }
      trail.push({ x:p.x, y:p.y, t:0 }); last = p;
    }
    api.on(api.root,'pointerdown',e=>{ last = null; trackMove(e); });
    api.on(api.root,'pointermove',e=>{ if(e.buttons||e.pressure>0) trackMove(e); });
    api.on(window,'pointerup',()=>{ last = null; });
    api.loop(dt=>{
      t += dt; spT -= dt; if(spT<=0){ launch(); spT = Math.max(.7,1.8-t*.02); }
      objs.forEach(o=>{ o.vy += 900*dt; o.x += o.vx*dt; o.y += o.vy*dt; o.rot += o.vr*dt; });
      halves.forEach(h=>{ h.vy += 900*dt; h.x += h.vx*dt; h.y += h.vy*dt; h.rot += h.vr*dt; }); halves = halves.filter(h=>h.y<H+50);
      trail.forEach(p=>{ p.t += dt; }); trail = trail.filter(p=>p.t<.18);
      for(const o of objs){ if(!o.cut && o.y>H+40 && o.vy>0){ o.cut = true; if(!o.bomb){ lives--; api.sfx('bad'); info(); if(lives<=0){ api.end(score,{ title:'Plus de vies !', msg:score+' fruits tranchés.' }); return; } } } }
      objs = objs.filter(o=>!o.cut);
      g.fillStyle = '#3a2412'; g.fillRect(0,0,W,H); g.fillStyle = '#4a301b'; for(let i=0;i<12;i++) g.fillRect(0,i*40,W,2);
      objs.forEach(o=>{ g.save(); g.translate(o.x,o.y); g.rotate(o.rot); g.fillStyle = '#fff'; emoji(g,o.e,0,0,o.bomb?44:50); g.restore(); });
      halves.forEach(h=>{ g.save(); g.translate(h.x,h.y); g.rotate(h.rot); g.beginPath(); if(h.side) g.rect(0,-30,40,60); else g.rect(-40,-30,40,60); g.clip(); g.fillStyle = '#fff'; emoji(g,h.e,0,0,50); g.restore(); });
      if(trail.length>1){ g.lineCap = 'round'; for(let i=1;i<trail.length;i++){ g.strokeStyle = `rgba(255,255,255,${1-trail[i].t/.18})`; g.lineWidth = 6*(1-trail[i].t/.18)+1; g.beginPath(); g.moveTo(trail[i-1].x,trail[i-1].y); g.lineTo(trail[i].x,trail[i].y); g.stroke(); } }
    });
    SCCG.lab._coupe = { objs:()=>objs };
    info();
  }
});

/* ---------------------------------------------------------- ARTILLERIE */
R({ id:'artillerie', name:'Artillerie', emoji:'💥', cat:'Arcade', hue:25,
  desc:'Règle l\'angle et la puissance pour toucher la cible.',
  how:"Touche et fais glisser ton doigt depuis le canon : la direction et la longueur de ta traînée règlent l'angle et la puissance du tir. Relâche pour tirer. Fais attention au vent 🌬️ et au relief ! Touche la cible 🎯 avec le moins d'obus possible. 6 obus par cible.",
  create(api){
    const W = 320, H = 480, c = api.canvas(W,H), g = c.g, GX = 36;
    let heights, enemyX, wind, shells = 6, level = 0, score = 0, drag = null, shell = null, boom = null, hitT = 0;
    const cannonY = ()=> heights[GX]-12;
    function gen(){
      level++; wind = rndf(-1,1)*Math.min(90,25+level*10); shells = 6; shell = null;
      const a = rndf(30,70), b = rndf(.01,.03), ph = rndf(0,6); heights = [];
      for(let x=0;x<=W;x++){ heights[x] = 360-(Math.sin(x*b+ph)*a*.6+Math.sin(x*b*2.3+ph*2)*a*.3)+(x<70?20:0); heights[x] = clamp(heights[x],250,430); }
      enemyX = Math.floor(rndf(190,290)); api.setInfo('Cible '+level+' • obus '+shells);
    }
    const velocity = d=>{ const dx = d.x-GX, dy = d.y-cannonY(), len = Math.min(130,Math.hypot(dx,dy)), a = Math.atan2(dy,dx); return { vx:Math.cos(a)*len*5.2, vy:Math.sin(a)*len*5.2, len, a }; };
    function crater(x,r){ for(let i=Math.max(0,Math.floor(x-r));i<=Math.min(W,Math.ceil(x+r));i++){ const dx = i-x; heights[i] += Math.sqrt(Math.max(0,r*r-dx*dx))*.9; heights[i] = Math.min(heights[i],470); } }
    function fireShell(){
      if(shell || !drag || api.ended) return; const v = velocity(drag); if(v.len<14){ drag = null; return; } if(v.vy>0 && v.len<30){ drag = null; return; }
      shell = { x:GX, y:cannonY(), vx:v.vx, vy:v.vy }; shells--; drag = null; api.sfx('shoot'); api.setInfo('Cible '+level+' • obus '+shells);
    }
    function after(hit){
      if(hit){ const pts = 100+shells*20; score += pts; api.setScore(score); api.sfx('win'); api.toast('Touché ! +'+pts); api.after(1100,gen); }
      else if(shells<=0) api.end(score,{ title:'Plus d\'obus !', msg:(level-1)+' cible(s) détruite(s).' });
    }
    api.on(api.root,'pointerdown',e=>{ if(!shell) drag = c.pos(e); });
    api.on(api.root,'pointermove',e=>{ if(drag && !shell) drag = c.pos(e); });
    api.on(window,'pointerup',fireShell);
    api.loop(dt=>{
      if(boom){ boom.t += dt; if(boom.t>.5) boom = null; }
      if(shell){
        const n = 3; for(let i=0;i<n && shell;i++){
          shell.vx += wind*dt/n; shell.vy += 420*dt/n; shell.x += shell.vx*dt/n; shell.y += shell.vy*dt/n;
          const hx = Math.floor(shell.x);
          if(shell.x<-10 || shell.x>W+10 || shell.y>H+20){ shell = null; after(false); break; }
          if(hx>=0 && hx<=W && shell.y>=heights[hx]){
            const ex = enemyX, hit = Math.abs(shell.x-ex)<24; boom = { x:shell.x, y:shell.y, t:0 }; api.sfx('boom'); api.vibrate(60);
            if(!hit) crater(shell.x,22); shell = null; after(hit); break;
          }
          if(Math.abs(shell.x-enemyX)<16 && Math.abs(shell.y-(heights[enemyX]-14))<20){ boom = { x:shell.x, y:shell.y, t:0 }; shell = null; api.sfx('boom'); after(true); break; }
        }
      }
      const sky = g.createLinearGradient(0,0,0,H); sky.addColorStop(0,'#7ec8f2'); sky.addColorStop(1,'#d9f1ff'); g.fillStyle = sky; g.fillRect(0,0,W,H);
      g.fillStyle = '#6b8f3a'; g.beginPath(); g.moveTo(0,H); for(let x=0;x<=W;x+=2) g.lineTo(x,heights[x]); g.lineTo(W,H); g.closePath(); g.fill(); g.fillStyle = '#8a5a2f'; g.beginPath(); g.moveTo(0,H); for(let x=0;x<=W;x+=2) g.lineTo(x,heights[x]+8); g.lineTo(W,H); g.closePath(); g.fill();
      g.fillStyle = '#fff'; emoji(g,'🎯',enemyX,heights[enemyX]-14,34);
      g.save(); g.translate(GX,cannonY()); g.rotate(drag ? velocity(drag).a : -Math.PI/4); g.fillStyle = '#333'; rrect(g,-4,-6,34,12,4); g.fill(); g.restore(); g.fillStyle = '#555'; g.beginPath(); g.arc(GX,cannonY(),11,0,TAU); g.fill();
      if(drag && !shell){ const v = velocity(drag); let x = GX, y = cannonY(), vx = v.vx, vy = v.vy; g.fillStyle = 'rgba(255,255,255,.7)'; for(let i=0;i<14;i++){ for(let k=0;k<3;k++){ vx += wind*.016/3; vy += 420*.016/3; x += vx*.016/3; y += vy*.016/3; } if(i%2===0){ g.beginPath(); g.arc(x,y,2.5,0,TAU); g.fill(); } } g.fillStyle = '#17304a'; g.font = '700 12px sans-serif'; g.textAlign = 'left'; g.fillText('Puissance '+Math.round(v.len/130*100)+'%',10,H-12); }
      if(shell){ g.fillStyle = '#222'; g.beginPath(); g.arc(shell.x,shell.y,5,0,TAU); g.fill(); }
      if(boom){ g.fillStyle = `rgba(255,170,40,${1-boom.t*2})`; g.beginPath(); g.arc(boom.x,boom.y,10+boom.t*60,0,TAU); g.fill(); }
      g.fillStyle = '#17304a'; g.font = '700 13px sans-serif'; g.textAlign = 'right'; g.fillText('🌬️ '+(wind<0?'⬅️':'➡️')+' '+Math.abs(Math.round(wind)),W-10,22);
    });
    SCCG.lab._arti = { heights:()=>heights, enemyX:()=>enemyX, wind:()=>wind, shells:()=>shells, level:()=>level, GX, cannonY, busy:()=>!!shell };
    gen();
  }
});
})();

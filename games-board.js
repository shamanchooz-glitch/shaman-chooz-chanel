/* ==========================================================
   JEUX DE PLATEAU : Morpion, Puissance 4, Awalé, Dames, Mémoire, 2048
   (contre l'IA du téléphone — rien à brancher)
   ========================================================== */
(function(){
'use strict';
const U = SCCG.util, R = SCCG.register, rnd = U.rnd, shuffle = U.shuffle, pick = U.pick, el = U.el;
U.mmss = s=>{ s = Math.max(0, Math.round(s)); return Math.floor(s/60)+':'+String(s%60).padStart(2,'0'); };

/* ---------------------------------------------------------- MORPION */
R({ id:'morpion', name:'Morpion', emoji:'❌', cat:'Plateau', hue:350, scoreLabel:'Points',
  desc:"Aligne 3 symboles avant l'IA, manche après manche.",
  how:"Touche une case pour poser ton ❌. Victoire : +3 points, match nul : +1. Si tu perds une manche, la partie s'arrête. L'IA devient plus forte à chaque manche !",
  create(api){
    const L = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    const won = (b,p)=> L.find(l=>l.every(i=>b[i]===p));
    const empties = b=> b.map((v,i)=>v?-1:i).filter(i=>i>=0);
    const mm = (b,p)=>{
      if(won(b,'O')) return 10; if(won(b,'X')) return -10;
      const e = empties(b); if(!e.length) return 0;
      let best = p==='O' ? -99 : 99;
      for(const i of e){ b[i]=p; const s = mm(b, p==='O'?'X':'O'); b[i]=''; best = p==='O' ? Math.max(best,s) : Math.min(best,s); }
      return best;
    };
    const board = el('div','g-board'); api.root.appendChild(board); api.fit(board,1);
    board.innerHTML = '<div class="g-grid" style="grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,1fr);">'+'<button class="g-cell"></button>'.repeat(9)+'</div>';
    const cells = [].slice.call(board.querySelectorAll('.g-cell'));
    let b, round = 0, pts = 0, busy = true;
    const draw = line=> cells.forEach((c,i)=>{ c.textContent = b[i]==='X' ? '❌' : b[i]==='O' ? '⭕' : ''; c.style.background = line && line.indexOf(i)>=0 ? 'rgba(127,224,179,.35)' : ''; });
    function finish(res, line){
      busy = true; draw(line);
      if(res==='X'){ pts += 3; api.setScore(pts); api.sfx('win'); api.toast('Manche gagnée ! +3'); api.after(1000,newRound); }
      else if(res==='D'){ pts += 1; api.setScore(pts); api.toast('Match nul +1'); api.after(900,newRound); }
      else api.end(pts,{ title:"L'IA gagne cette manche", msg:'Tu as survécu à '+(round-1)+' manche(s).' });
    }
    function check(){
      let l = won(b,'X'); if(l) return finish('X',l);
      l = won(b,'O'); if(l) return finish('O',l);
      if(!empties(b).length) return finish('D');
      busy = false;
    }
    function aiPlay(){
      const e = empties(b); let m;
      if(Math.random() < Math.max(0, .5 - round*.12)) m = pick(e);
      else { let best=-99, arr=[]; for(const i of e){ b[i]='O'; const s = mm(b,'X'); b[i]=''; if(s>best){ best=s; arr=[i]; } else if(s===best) arr.push(i); } m = pick(arr); }
      b[m] = 'O'; api.sfx('tap'); draw(); check();
    }
    function newRound(){ round++; b = Array(9).fill(''); api.setInfo('Manche '+round); draw(); if(round%2===0){ busy = true; api.after(450,aiPlay); } else busy = false; }
    cells.forEach((c,i)=> api.on(c,'click',()=>{
      if(busy || b[i] || api.ended) return;
      b[i] = 'X'; api.sfx('tap'); draw(); busy = true;
      if(won(b,'X') || !empties(b).length){ check(); return; }
      api.after(380,aiPlay);
    }));
    newRound();
  }
});

/* ---------------------------------------------------------- PUISSANCE 4 */
const C4 = (function(){
  const ROWS = 6, COLS = 7, ORDER = [3,2,4,1,5,0,6];
  const mk = ()=> Array.from({length:ROWS},()=>Array(COLS).fill(0));
  const drop = (b,c,p)=>{ for(let r=ROWS-1;r>=0;r--) if(!b[r][c]){ b[r][c]=p; return r; } return -1; };
  const DIRS = [[0,1],[1,0],[1,1],[1,-1]];
  function winAt(b,r,c,p){
    for(const [dr,dc] of DIRS){
      const cells = [[r,c]];
      for(const s of [1,-1]){ let rr=r+dr*s, cc=c+dc*s; while(rr>=0&&rr<ROWS&&cc>=0&&cc<COLS&&b[rr][cc]===p){ cells.push([rr,cc]); rr+=dr*s; cc+=dc*s; } }
      if(cells.length>=4) return cells;
    }
    return null;
  }
  function heur(b){
    let s = 0;
    for(let r=0;r<ROWS;r++) if(b[r][3]===2) s += 3;
    for(let r=0;r<ROWS;r++) for(let c=0;c<COLS;c++) for(const [dr,dc] of DIRS){
      const r3=r+3*dr, c3=c+3*dc; if(r3<0||r3>=ROWS||c3<0||c3>=COLS) continue;
      let a=0,p=0,e=0;
      for(let k=0;k<4;k++){ const v=b[r+k*dr][c+k*dc]; if(v===2) a++; else if(v===1) p++; else e++; }
      if(a&&p) continue;
      if(a===3) s += 6; else if(a===2) s += 2; if(p===3) s -= 7; else if(p===2) s -= 2;
    }
    return s;
  }
  function minimax(b, depth, alpha, beta, maxi){
    const moves = ORDER.filter(c=>!b[0][c]); if(!moves.length) return 0;
    if(depth===0) return heur(b);
    let best = maxi ? -Infinity : Infinity;
    for(const c of moves){
      const p = maxi ? 2 : 1, r = drop(b,c,p); let v;
      if(winAt(b,r,c,p)) v = (maxi?1:-1)*(100000+depth);
      else v = minimax(b, depth-1, alpha, beta, !maxi);
      b[r][c] = 0;
      if(maxi){ if(v>best) best=v; if(best>alpha) alpha=best; } else { if(v<best) best=v; if(best<beta) beta=best; }
      if(alpha>=beta) break;
    }
    return best;
  }
  function aiPick(b, depth){
    const moves = shuffle(ORDER.filter(c=>!b[0][c])); let best=-Infinity, arr=[];
    for(const c of moves){
      const r = drop(b,c,2); let v;
      if(winAt(b,r,c,2)) v = 1000000; else v = minimax(b, depth-1, -Infinity, Infinity, false);
      b[r][c] = 0;
      if(v>best){ best=v; arr=[c]; } else if(v===best) arr.push(c);
    }
    return pick(arr);
  }
  return { ROWS, COLS, mk, drop, winAt, aiPick };
})();
SCCG.lab.c4 = C4;
R({ id:'puissance4', name:'Puissance 4', emoji:'🔴', cat:'Plateau', hue:215, scoreLabel:'Points',
  desc:"Aligne 4 jetons avant l'IA. Elle apprend vite !",
  how:"Touche une colonne pour y lâcher ton jeton rouge. Aligne 4 jetons (ligne, colonne ou diagonale). Victoire : +5 points, nul : +2. Une défaite met fin à la partie.",
  create(api){
    const board = el('div','g-board c4-board'); api.root.appendChild(board); api.fit(board, 7/6);
    board.innerHTML = '<div class="g-grid" style="grid-template-columns:repeat(7,1fr);grid-template-rows:repeat(6,1fr);">'+'<button class="c4-hole"></button>'.repeat(42)+'</div>';
    const holes = [].slice.call(board.querySelectorAll('.c4-hole'));
    let b, round = 0, pts = 0, busy = true, win = null;
    const draw = ()=> holes.forEach((h,i)=>{
      const r = (i/7)|0, c = i%7, v = b[r][c];
      h.className = 'c4-hole' + (v===1?' p':v===2?' a':'') + (win && win.some(w=>w[0]===r&&w[1]===c) ? ' win' : '');
    });
    function end(res){
      busy = true; draw();
      if(res==='P'){ pts += 5; api.setScore(pts); api.sfx('win'); api.toast('Bravo ! +5'); api.after(1100,newRound); }
      else if(res==='D'){ pts += 2; api.setScore(pts); api.toast('Match nul +2'); api.after(1000,newRound); }
      else api.end(pts,{ title:"L'IA aligne 4 !", msg:'Tu as gagné '+(round-1)+' manche(s) avant de tomber.' });
    }
    function play(c,p){
      const r = C4.drop(b,c,p); if(r<0) return false;
      api.sfx(p===1?'tap':'move');
      win = C4.winAt(b,r,c,p); draw();
      if(win) end(p===1?'P':'A');
      else if(b[0].every(x=>x)) end('D');
      else return true;
      return true;
    }
    function aiTurn(){
      const depth = Math.min(6, 2 + round), mistake = Math.max(0, .35 - round*.08);
      const free = [0,1,2,3,4,5,6].filter(c=>!b[0][c]);
      const c = Math.random() < mistake ? pick(free) : C4.aiPick(b, depth);
      if(play(c,2)) { if(!win && !b[0].every(x=>x)) busy = false; }
    }
    function newRound(){
      round++; b = C4.mk(); win = null; api.setInfo('Manche '+round); draw();
      if(round%2===0){ busy = true; api.after(500,aiTurn); } else busy = false;
    }
    api.on(board,'click',e=>{
      const h = e.target.closest('.c4-hole'); if(!h || busy || api.ended) return;
      const c = holes.indexOf(h) % 7; if(b[0][c]) return;
      busy = true;
      const ok = play(c,1);
      if(ok && !win && !b[0].every(x=>x)) api.after(420,aiTurn);
    });
    newRound();
  }
});

/* ---------------------------------------------------------- AWALÉ */
const AW = (function(){
  function legal(st, side){
    const lo = side*6, oppLo = (1-side)*6; let opp = 0;
    for(let i=oppLo;i<oppLo+6;i++) opp += st.b[i];
    const res = [];
    for(let i=lo;i<lo+6;i++){
      const n = st.b[i]; if(!n) continue;
      if(opp===0 && n < (side===0 ? 6-i : 12-i)) continue; // il faut nourrir l'adversaire
      res.push(i);
    }
    return res;
  }
  function apply(st, i, side){
    const b = st.b.slice(), s = st.s.slice(), seq = [];
    let n = b[i], p = i; b[i] = 0;
    while(n>0){ p = (p+1)%12; if(p===i) continue; b[p]++; seq.push(p); n--; }
    const oLo = (1-side)*6, oHi = oLo+5; let got = 0;
    if(p>=oLo && p<=oHi && (b[p]===2 || b[p]===3)){
      const b2 = b.slice(); let q = p, g = 0;
      while(q>=oLo && q<=oHi && (b2[q]===2 || b2[q]===3)){ g += b2[q]; b2[q] = 0; q--; }
      let left = 0; for(let k=oLo;k<=oHi;k++) left += b2[k];
      if(left>0){ for(let k=0;k<12;k++) b[k] = b2[k]; s[side] += g; got = g; } // pas de "grand chelem"
    }
    return { b, s, last:p, seq, got };
  }
  function evalSt(st){
    let mine = 0, his = 0; for(let i=0;i<6;i++){ his += st.b[i]; mine += st.b[i+6]; }
    return (st.s[1]-st.s[0])*10 + (mine-his)*.6;
  }
  function search(st, depth, a, be, side){
    if(st.s[0]>=25) return -9999; if(st.s[1]>=25) return 9999;
    const mv = legal(st, side);
    if(!mv.length){ const f = st.s.slice(); for(let i=0;i<6;i++) f[0]+=st.b[i]; for(let i=6;i<12;i++) f[1]+=st.b[i]; return (f[1]-f[0])*100; }
    if(depth===0) return evalSt(st);
    let best = side===1 ? -Infinity : Infinity;
    for(const m of mv){
      const v = search(apply(st,m,side), depth-1, a, be, 1-side);
      if(side===1){ if(v>best) best=v; if(best>a) a=best; } else { if(v<best) best=v; if(best<be) be=best; }
      if(a>=be) break;
    }
    return best;
  }
  function aiPick(st, depth){
    const mv = shuffle(legal(st,1)); let best=-Infinity, arr=[];
    for(const m of mv){ const v = search(apply(st,m,1), depth-1, -Infinity, Infinity, 0); if(v>best){ best=v; arr=[m]; } else if(v===best) arr.push(m); }
    return pick(arr);
  }
  return { legal, apply, aiPick };
})();
SCCG.lab.awale = AW;
R({ id:'awale', name:'Awalé', emoji:'🌰', cat:'Plateau', hue:28, scoreLabel:'Points',
  desc:"Le grand jeu de graines d'Afrique, contre l'IA.",
  how:"Tes 6 trous sont en bas. Touche un trou : ses graines sont semées une par une vers la droite (sens inverse des aiguilles d'une montre). Si ta dernière graine tombe chez l'IA dans un trou qui passe à 2 ou 3, tu les gagnes (et ceux d'avant aussi). 25 graines gagnent la manche : +3 points. Une défaite met fin à la partie.",
  create(api){
    const board = el('div','g-board aw-board'); api.root.appendChild(board); api.fit(board, 2.55);
    const order = [11,10,9,8,7,6,0,1,2,3,4,5];
    board.innerHTML = '<div class="g-grid" style="grid-template-columns:repeat(6,1fr);grid-template-rows:repeat(2,1fr);">'+order.map(i=>`<button class="aw-pit ${i<6?'mine':''}" data-i="${i}"></button>`).join('')+'</div>';
    const pits = {}; board.querySelectorAll('.aw-pit').forEach(p=>{ pits[p.dataset.i] = p; });
    let st, round = 0, pts = 0, busy = true, moves = 0;
    const show = (b, last)=>{
      for(let i=0;i<12;i++){ const p = pits[i]; p.textContent = b[i] || ''; p.classList.toggle('last', i===last); p.disabled = i>=6 || !b[i] || busy; }
    };
    const info = ()=> api.setInfo('Toi '+st.s[0]+' • IA '+st.s[1]);
    function finishRound(){
      busy = true; const f = st.s.slice();
      for(let i=0;i<6;i++) f[0] += st.b[i]; for(let i=6;i<12;i++) f[1] += st.b[i];
      st.s = f; st.b = Array(12).fill(0); show(st.b); info();
      if(f[0]>f[1]){ pts += 3; api.setScore(pts); api.sfx('win'); api.toast('Manche gagnée ! +3'); api.after(1400,newRound); }
      else if(f[0]===f[1]){ pts += 1; api.setScore(pts); api.toast('Égalité +1'); api.after(1300,newRound); }
      else api.end(pts,{ title:"L'IA gagne la manche", msg:'Tu as gagné '+(round-1)+' manche(s).' });
    }
    function afterMove(side){
      info();
      if(st.s[0]>=25 || st.s[1]>=25 || moves>150){ finishRound(); return; }
      const next = 1-side;
      if(!AW.legal(st,next).length){ finishRound(); return; }
      if(next===1){ busy = true; show(st.b); api.after(500, aiMove); } else { busy = false; show(st.b); }
    }
    function sow(i, side){
      busy = true; moves++;
      const r = AW.apply(st, i, side), d = st.b.slice(); d[i] = 0; show(d); let k = 0;
      const step = ()=>{
        if(k < r.seq.length){ d[r.seq[k]]++; show(d, r.seq[k]); api.sfx('move'); k++; api.after(190, step); }
        else { st = { b:r.b, s:r.s }; if(r.got){ api.sfx('good'); api.toast('+'+r.got+' graines'); } show(st.b, r.last); afterMove(side); }
      };
      api.after(150, step);
    }
    function aiMove(){ const depth = Math.min(6, 2 + round); const mv = AW.legal(st,1); const m = Math.random() < Math.max(0, .3 - round*.1) ? pick(mv) : AW.aiPick(st, depth); sow(m, 1); }
    function newRound(){
      round++; moves = 0; st = { b:Array(12).fill(4), s:[0,0] }; api.setInfo('Manche '+round); info(); busy = false;
      if(round%2===0){ busy = true; show(st.b); api.after(600, aiMove); } else show(st.b);
    }
    api.on(board,'click',e=>{
      const p = e.target.closest('.aw-pit'); if(!p || busy || api.ended) return;
      const i = +p.dataset.i; if(i>=6 || !AW.legal(st,0).includes(i)){ api.toast('Coup impossible (il faut donner des graines à l\'IA)'); return; }
      sow(i, 0);
    });
    newRound();
  }
});

/* ---------------------------------------------------------- DAMES (règles russes/brésiliennes 8x8) */
const DM = (function(){
  const ok = (r,c)=> r>=0 && r<8 && c>=0 && c<8;
  const DIRS = [[-1,-1],[-1,1],[1,-1],[1,1]];
  const sgn = v=> v>0 ? 1 : -1;
  const enemy = (v,side)=> v!==0 && sgn(v)!==side;
  const promo = (r,side)=> side===1 ? r===0 : r===7;
  function seqs(b, r, c, king, side, caps, path){
    const out = [];
    for(const [dr,dc] of DIRS){
      if(!king){
        const r1=r+dr, c1=c+dc, r2=r+2*dr, c2=c+2*dc;
        if(ok(r2,c2) && enemy(b[r1][c1],side) && caps.indexOf(r1*8+c1)<0 && b[r2][c2]===0){
          const nc = caps.concat(r1*8+c1), np = path.concat([[r2,c2]]);
          const sub = seqs(b, r2, c2, promo(r2,side), side, nc, np);
          if(sub.length) sub.forEach(x=>out.push(x)); else out.push({ path:np, caps:nc });
        }
      } else {
        let rr=r+dr, cc=c+dc;
        while(ok(rr,cc) && b[rr][cc]===0){ rr+=dr; cc+=dc; }
        if(!ok(rr,cc) || !enemy(b[rr][cc],side) || caps.indexOf(rr*8+cc)>=0) continue;
        const nc = caps.concat(rr*8+cc), withSub = [], without = [];
        let lr=rr+dr, lc=cc+dc;
        while(ok(lr,lc) && b[lr][lc]===0){
          const np = path.concat([[lr,lc]]), sub = seqs(b, lr, lc, true, side, nc, np);
          if(sub.length) sub.forEach(x=>withSub.push(x)); else without.push({ path:np, caps:nc });
          lr+=dr; lc+=dc;
        }
        (withSub.length ? withSub : without).forEach(x=>out.push(x));
      }
    }
    return out;
  }
  function moves(b, side){
    const caps = [];
    for(let r=0;r<8;r++) for(let c=0;c<8;c++){
      const v = b[r][c]; if(!v || sgn(v)!==side) continue;
      b[r][c] = 0;
      const s = seqs(b, r, c, Math.abs(v)===2, side, [], []);
      b[r][c] = v;
      s.forEach(x=>caps.push({ from:[r,c], path:x.path, caps:x.caps }));
    }
    if(caps.length) return caps;
    const out = [];
    for(let r=0;r<8;r++) for(let c=0;c<8;c++){
      const v = b[r][c]; if(!v || sgn(v)!==side) continue;
      if(Math.abs(v)===2){
        for(const [dr,dc] of DIRS){ let rr=r+dr, cc=c+dc; while(ok(rr,cc) && b[rr][cc]===0){ out.push({ from:[r,c], path:[[rr,cc]], caps:[] }); rr+=dr; cc+=dc; } }
      } else {
        const dr = side===1 ? -1 : 1;
        for(const dc of [-1,1]){ const rr=r+dr, cc=c+dc; if(ok(rr,cc) && b[rr][cc]===0) out.push({ from:[r,c], path:[[rr,cc]], caps:[] }); }
      }
    }
    return out;
  }
  function apply(b, mv){
    const nb = b.map(row=>row.slice()), r0 = mv.from[0], c0 = mv.from[1], v = nb[r0][c0], side = sgn(v);
    nb[r0][c0] = 0; mv.caps.forEach(k=>{ nb[(k/8)|0][k%8] = 0; });
    let king = Math.abs(v)===2;
    mv.path.forEach(p=>{ if(!king && promo(p[0],side)) king = true; });
    const f = mv.path[mv.path.length-1]; nb[f[0]][f[1]] = side*(king?2:1);
    return nb;
  }
  function ev(b){
    let s = 0;
    for(let r=0;r<8;r++) for(let c=0;c<8;c++){
      const v = b[r][c]; if(!v) continue; const side = sgn(v), k = Math.abs(v)===2;
      let val = k ? 320 : 100 + (side===1 ? 7-r : r)*4;
      if(!k && ((side===1 && r===7) || (side===-1 && r===0))) val += 8;
      val += (3.5-Math.abs(c-3.5))*1.5;
      s += side*val;
    }
    return s;
  }
  function mm(b, d, a, be, side){
    const mv = moves(b, side);
    if(!mv.length) return side===1 ? -9999-d : 9999+d;
    if(d===0) return ev(b);
    let best = side===1 ? -Infinity : Infinity;
    for(const m of mv){
      const v = mm(apply(b,m), d-1, a, be, -side);
      if(side===1){ if(v>best) best=v; if(best>a) a=best; } else { if(v<best) best=v; if(best<be) be=best; }
      if(a>=be) break;
    }
    return best;
  }
  function aiPick(b, depth){
    const mv = shuffle(moves(b,-1)); let best = Infinity, arr = [];
    for(const m of mv){ const v = mm(apply(b,m), depth-1, -Infinity, Infinity, 1); if(v<best){ best=v; arr=[m]; } else if(v===best) arr.push(m); }
    return pick(arr);
  }
  const start = ()=> Array.from({length:8},(_,r)=>Array.from({length:8},(_,c)=> (r+c)%2===1 ? (r<3 ? -1 : r>4 ? 1 : 0) : 0));
  return { moves, apply, aiPick, start };
})();
SCCG.lab.dames = DM;
R({ id:'dames', name:'Dames', emoji:'⚫', cat:'Plateau', hue:30, scoreLabel:'Points',
  desc:"Le jeu de dames classique contre l'IA : prises obligatoires.",
  how:"Tu joues les pions clairs (en bas). Touche un pion puis la case d'arrivée. Les prises sont obligatoires et on peut prendre en arrière. Un pion qui atteint le fond devient dame (♛) et file en diagonale. Victoire : +5 points, nul : +2. Une défaite met fin à la partie.",
  create(api){
    const board = el('div','g-board dm-board'); api.root.appendChild(board); api.fit(board,1);
    board.innerHTML = '<div class="g-grid" style="grid-template-columns:repeat(8,1fr);grid-template-rows:repeat(8,1fr);gap:0;"></div>';
    const grid = board.firstChild;
    let b, sel = null, legal = [], busy = true, round = 0, pts = 0, quiet = 0, lastTo = null;
    function render(){
      const dests = sel ? legal.filter(m=>m.from[0]===sel[0] && m.from[1]===sel[1]).map(m=>m.path[m.path.length-1]) : [];
      let h = '';
      for(let r=0;r<8;r++) for(let c=0;c<8;c++){
        const v = b[r][c], dark = (r+c)%2===1;
        const isSel = sel && sel[0]===r && sel[1]===c, isDest = dests.some(d=>d[0]===r && d[1]===c);
        h += `<button class="dm-sq ${dark?'d':'l'} ${isSel?'sel':''} ${isDest?'dest':''}" data-r="${r}" data-c="${c}">${v ? `<div class="dm-pc ${v>0?'w':'b'}">${Math.abs(v)===2?'♛':''}</div>` : ''}</button>`;
      }
      grid.innerHTML = h;
    }
    function status(){
      let w=0, k=0; b.forEach(row=>row.forEach(v=>{ if(v>0) w++; if(v<0) k++; }));
      api.setInfo('Manche '+round+' • Toi '+w+' – IA '+k);
    }
    function conclude(res){
      busy = true; render();
      if(res==='P'){ pts += 5; api.setScore(pts); api.sfx('win'); api.toast('Victoire ! +5'); api.after(1300,newRound); }
      else if(res==='D'){ pts += 2; api.setScore(pts); api.toast('Partie nulle +2'); api.after(1200,newRound); }
      else api.end(pts,{ title:"L'IA gagne la manche", msg:'Tu as gagné '+(round-1)+' manche(s).' });
    }
    function doMove(m, side){
      const v = b[m.from[0]][m.from[1]];
      if(m.caps.length || Math.abs(v)===1) quiet = 0; else quiet++;
      b = DM.apply(b, m); lastTo = m.path[m.path.length-1];
      api.sfx(m.caps.length ? 'pop' : 'move'); status(); render();
      if(!DM.moves(b,-side).length) return conclude(side===1?'P':'A');
      if(quiet>=40) return conclude('D');
      if(side===1){ busy = true; api.after(450, aiTurn); } else { legal = DM.moves(b,1); busy = false; }
    }
    function aiTurn(){
      const depth = round<2 ? 2 : round<4 ? 3 : 4, mv = DM.moves(b,-1);
      const m = Math.random() < Math.max(0, .35 - round*.12) ? pick(mv) : DM.aiPick(b, depth);
      doMove(m, -1);
    }
    function newRound(){
      round++; b = DM.start(); sel = null; quiet = 0; status();
      if(round%2===0){ busy = true; legal = []; render(); api.after(500, aiTurn); }
      else { legal = DM.moves(b,1); busy = false; render(); }
    }
    api.on(grid,'click',e=>{
      const s = e.target.closest('.dm-sq'); if(!s || busy || api.ended) return;
      const r = +s.dataset.r, c = +s.dataset.c, v = b[r][c];
      if(sel){
        const m = legal.find(x=>x.from[0]===sel[0] && x.from[1]===sel[1] && x.path[x.path.length-1][0]===r && x.path[x.path.length-1][1]===c);
        if(m){ sel = null; doMove(m,1); return; }
      }
      if(v>0 && legal.some(x=>x.from[0]===r && x.from[1]===c)){ sel = [r,c]; render(); }
      else { if(v>0 && legal.length && legal[0].caps.length) api.toast('Prise obligatoire !'); sel = null; render(); }
    });
    newRound();
  }
});

/* ---------------------------------------------------------- MÉMOIRE */
R({ id:'memoire', name:'Mémoire', emoji:'🃏', cat:'Réflexion', hue:265, scoreLabel:'Score',
  desc:'Retrouve toutes les paires. Les niveaux grandissent !',
  how:"Retourne deux cartes à la fois et retrouve les paires. Chaque erreur te coûte une vie ❤️ (8 au départ). Tu gagnes une vie à chaque niveau réussi. Combien de niveaux peux-tu enchaîner ?",
  create(api){
    const EM = ['🐶','🐱','🦁','🐘','🦒','🐢','🐸','🦋','🍎','🍌','🍉','🍇','⚽','🚗','⭐','🌈','🎈','🎁','🥁','🍕'];
    const PAIRS = [4,5,6,8,10,12,15], COLS = [4,5,4,4,5,6,6];
    let level = 0, lives = 8, score = 0, first = null, lock = false, left = 0, cards = [], boardEl = null;
    function build(){
      api.root.innerHTML = ''; const n = PAIRS[Math.min(level,PAIRS.length-1)], cols = COLS[Math.min(level,COLS.length-1)];
      const emojis = shuffle(EM).slice(0, Math.min(n, EM.length)); while(emojis.length<n) emojis.push(pick(EM));
      cards = shuffle(emojis.concat(emojis)); left = n; first = null; lock = false;
      const rows = Math.ceil(cards.length/cols);
      boardEl = el('div','g-board'); api.root.appendChild(boardEl); api.fit(boardEl, cols/rows);
      boardEl.innerHTML = `<div class="g-grid" style="grid-template-columns:repeat(${cols},1fr);grid-template-rows:repeat(${rows},1fr);">${cards.map((e,i)=>`<button class="g-cell" data-i="${i}" style="font-size:calc(var(--u,3px) * ${Math.max(5,18-cols*2)})"></button>`).join('')}</div>`;
      info();
    }
    const info = ()=> api.setInfo('Niveau '+(level+1)+' • '+'❤️'.repeat(Math.max(0,lives)));
    const cell = i => boardEl.querySelector('[data-i="'+i+'"]');
    function show(i,on){ const c = cell(i); c.textContent = on ? cards[i] : ''; c.style.background = on ? 'rgba(242,184,75,.35)' : ''; }
    api.on(api.root,'click',e=>{
      const c = e.target.closest('.g-cell'); if(!c || lock || api.ended) return;
      const i = +c.dataset.i; if(c.dataset.done || i===first) return;
      show(i,true); api.sfx('tap');
      if(first===null){ first = i; return; }
      const a = first; first = null; lock = true;
      if(cards[a]===cards[i]){
        cell(a).dataset.done = 1; c.dataset.done = 1; cell(a).style.background = c.style.background = 'rgba(47,143,95,.55)';
        score += 10; api.setScore(score); api.sfx('good'); left--; lock = false;
        if(left===0){
          score += 50; api.setScore(score); lives = Math.min(8, lives+1); level++; api.sfx('win'); api.toast('Niveau réussi ! +50');
          lock = true; api.after(1000, ()=>{ build(); });
        }
      } else {
        lives--; info(); api.sfx('bad');
        api.after(750, ()=>{
          show(a,false); show(i,false); lock = false;
          if(lives<=0) api.end(score,{ title:'Plus de vies !', msg:'Tu as atteint le niveau '+(level+1)+'.' });
        });
      }
    });
    build();
  }
});

/* ---------------------------------------------------------- 2048 */
const G2048 = (function(){
  const pos = (dir,i,k)=> dir==='left' ? i*4+k : dir==='right' ? i*4+3-k : dir==='up' ? k*4+i : (3-k)*4+i;
  function slide(line){
    const a = line.filter(x=>x), out = []; let gained = 0;
    for(let i=0;i<a.length;i++){ if(a[i]===a[i+1]){ out.push(a[i]*2); gained += a[i]*2; i++; } else out.push(a[i]); }
    while(out.length<4) out.push(0);
    return { out, gained };
  }
  function move(g, dir){
    const n = g.slice(); let gained = 0, moved = false;
    for(let i=0;i<4;i++){
      const line = [0,1,2,3].map(k=>g[pos(dir,i,k)]), r = slide(line); gained += r.gained;
      for(let k=0;k<4;k++){ if(n[pos(dir,i,k)] !== r.out[k]) moved = true; n[pos(dir,i,k)] = r.out[k]; }
    }
    return { g:n, gained, moved };
  }
  const stuck = g=> ['left','right','up','down'].every(d=>!move(g,d).moved);
  return { move, stuck };
})();
SCCG.lab.g2048 = G2048;
R({ id:'2048', name:'2048', emoji:'🔢', cat:'Réflexion', hue:38, scoreLabel:'Score',
  desc:'Fusionne les tuiles pour atteindre 2048.',
  how:"Glisse ton doigt (ou utilise les flèches) pour faire glisser toutes les tuiles. Deux tuiles identiques fusionnent et s'additionnent. Atteins 2048 !",
  create(api){
    let g = Array(16).fill(0), score = 0, won = false;
    const board = el('div','g-board t2048'); api.root.appendChild(board); api.fit(board,1);
    board.innerHTML = '<div class="g-grid" style="grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,1fr);">'+'<div class="tc"></div>'.repeat(16)+'</div>';
    const tcs = [].slice.call(board.querySelectorAll('.tc'));
    function add(){ const e = []; g.forEach((v,i)=>{ if(!v) e.push(i); }); if(e.length) g[pick(e)] = Math.random()<.9 ? 2 : 4; }
    function draw(){ tcs.forEach((t,i)=>{ const v = g[i]; t.textContent = v || ''; t.className = 'tc' + (v ? ' '+(v<=2048?'tv'+v:'tvbig') : '') + (v>=128&&v<1024?' big':'') + (v>=1024?' huge':''); }); }
    function go(dir){
      if(api.ended) return; const r = G2048.move(g,dir); if(!r.moved) return;
      g = r.g; score += r.gained; api.setScore(score); add(); draw(); api.sfx(r.gained ? 'pop' : 'move');
      if(!won && g.some(v=>v>=2048)){ won = true; api.toast('2048 ! Continue pour plus de points'); api.sfx('win'); }
      if(G2048.stuck(g)) api.end(score,{ title:'Plus de mouvement possible', win:won, msg:'Plus grosse tuile : '+Math.max.apply(null,g) });
    }
    api.swipe(api.root, go); api.onKey(k=>{ if(k==='left'||k==='right'||k==='up'||k==='down') go(k); });
    api.buttons([{t:'◀',down:()=>go('left')},{t:'▲',down:()=>go('up')},{t:'▼',down:()=>go('down')},{t:'▶',down:()=>go('right')}]);
    add(); add(); draw();
  }
});
})();

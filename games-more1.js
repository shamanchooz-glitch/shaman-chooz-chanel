/* ==========================================================
   LOT 1 — Stratégie, cartes et dés (14 jeux)
   Othello, Échecs, Gomoku, Allumettes, Jeu des points, Solitaire à pions,
   Serpents & Échelles, Tron, Cartes Couleurs, Yams, Cochon, Haut ou Bas,
   Dominos, Duel de mémoire
   ========================================================== */
(function(){
'use strict';
const U = SCCG.util, rnd = U.rnd, shuffle = U.shuffle, pick = U.pick, el = U.el;
const R = d=>{ d.isNew = true; SCCG.register(d); };
const clamp = (v,a,b)=> Math.max(a, Math.min(b, v));

/* ---------------------------------------------------------- OTHELLO */
const OT = (function(){
  const D = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  const W = [100,-20,10,5,5,10,-20,100, -20,-50,-2,-2,-2,-2,-50,-20, 10,-2,-1,-1,-1,-1,-2,10, 5,-2,-1,-1,-1,-1,-2,5,
             5,-2,-1,-1,-1,-1,-2,5, 10,-2,-1,-1,-1,-1,-2,10, -20,-50,-2,-2,-2,-2,-50,-20, 100,-20,10,5,5,10,-20,100];
  const start = ()=>{ const b = Array(64).fill(0); b[27] = b[36] = -1; b[28] = b[35] = 1; return b; };
  function flips(b,i,p){
    if(b[i]) return []; const r = (i/8)|0, c = i%8, out = [];
    for(const [dr,dc] of D){
      let rr = r+dr, cc = c+dc; const line = [];
      while(rr>=0 && rr<8 && cc>=0 && cc<8 && b[rr*8+cc]===-p){ line.push(rr*8+cc); rr += dr; cc += dc; }
      if(line.length && rr>=0 && rr<8 && cc>=0 && cc<8 && b[rr*8+cc]===p) out.push.apply(out,line);
    }
    return out;
  }
  function moves(b,p){ const m = []; for(let i=0;i<64;i++){ if(b[i]) continue; const f = flips(b,i,p); if(f.length) m.push({ i, f }); } return m; }
  function play(b,m,p){ const nb = b.slice(); nb[m.i] = p; m.f.forEach(k=>{ nb[k] = p; }); return nb; }
  function ev(b){ let s = 0; for(let i=0;i<64;i++) s += W[i]*b[i]; return s + 4*(moves(b,1).length-moves(b,-1).length); }
  function nega(b,d,a,be,p){
    const mv = moves(b,p);
    if(!mv.length){
      if(!moves(b,-p).length){ let s = 0; for(let i=0;i<64;i++) s += b[i]; return s*p*100; }
      return -nega(b,d-1,-be,-a,-p);
    }
    if(d<=0) return ev(b)*p;
    let best = -Infinity;
    for(const m of mv){ const v = -nega(play(b,m,p),d-1,-be,-a,-p); if(v>best) best = v; if(best>a) a = best; if(a>=be) break; }
    return best;
  }
  function aiPick(b,p,depth){
    const mv = shuffle(moves(b,p)); let best = -Infinity, arr = [];
    for(const m of mv){ const v = -nega(play(b,m,p),depth-1,-Infinity,Infinity,-p); if(v>best){ best = v; arr = [m]; } else if(v===best) arr.push(m); }
    return pick(arr);
  }
  return { start, flips, moves, play, aiPick };
})();
SCCG.lab.othello = OT;
R({ id:'othello', name:'Othello', emoji:'⚫', cat:'Plateau', hue:150, scoreLabel:'Points',
  desc:'Encadre les pions adverses pour les retourner.',
  how:"Pose un pion pour encadrer une ou plusieurs lignes de pions adverses : ils sont retournés à ta couleur. Les points verts montrent où tu peux jouer. Qui a le plus de pions à la fin gagne : +5 points. Une défaite met fin à la partie.",
  create(api){
    const board = el('div','g-board'); api.root.appendChild(board); api.fit(board,1);
    board.innerHTML = '<div class="g-grid" style="grid-template-columns:repeat(8,1fr);grid-template-rows:repeat(8,1fr);gap:calc(var(--u,3px)*.6);background:#14532d;padding:calc(var(--u,3px)*.6);">'+'<button class="g-cell" style="background:#2f8f4f;border-radius:2px;"></button>'.repeat(64)+'</div>';
    const cells = [].slice.call(board.querySelectorAll('.g-cell'));
    let b, me, round = 0, pts = 0, busy = true, turn = 1;
    const disc = (v)=> v ? `<div style="width:80%;height:80%;border-radius:50%;background:${v===1?'#111':'#f6efe4'};box-shadow:0 2px 3px rgba(0,0,0,.5);margin:auto;"></div>` : '';
    function draw(){
      const mv = (turn===me && !busy) ? OT.moves(b,me) : [];
      cells.forEach((c,i)=>{ c.innerHTML = disc(b[i]) || (mv.some(m=>m.i===i) ? '<div style="width:22%;height:22%;border-radius:50%;background:rgba(255,255,255,.55);margin:auto;"></div>' : ''); });
      let n1 = 0, n2 = 0; b.forEach(v=>{ if(v===me) n1++; else if(v===-me) n2++; });
      api.setInfo('Manche '+round+' • Toi '+n1+' – IA '+n2);
    }
    function conclude(){
      busy = true; draw(); let n1 = 0, n2 = 0; b.forEach(v=>{ if(v===me) n1++; else if(v===-me) n2++; });
      if(n1>n2){ pts += 5; api.setScore(pts); api.sfx('win'); api.toast('Victoire '+n1+'–'+n2+' ! +5'); api.after(1500,newRound); }
      else if(n1===n2){ pts += 2; api.setScore(pts); api.toast('Égalité +2'); api.after(1400,newRound); }
      else api.end(pts,{ title:"L'IA l'emporte "+n2+'–'+n1, msg:'Tu as gagné '+(round-1)+' manche(s).' });
    }
    function next(){
      const mine = OT.moves(b,turn);
      if(!mine.length){
        if(!OT.moves(b,-turn).length) return conclude();
        api.toast(turn===me ? 'Tu passes ton tour' : "L'IA passe son tour"); turn = -turn; return next();
      }
      if(turn===me){ busy = false; draw(); }
      else { busy = true; draw(); api.after(550, aiTurn); }
    }
    function aiTurn(){
      const mv = OT.moves(b,turn), depth = Math.min(5, 1+round);
      const m = Math.random() < Math.max(0,.4-round*.1) ? pick(mv) : OT.aiPick(b,turn,depth);
      b = OT.play(b,m,turn); api.sfx('tap'); turn = -turn; next();
    }
    function newRound(){ round++; b = OT.start(); me = round%2 ? 1 : -1; turn = 1; next(); }
    cells.forEach((c,i)=> api.on(c,'click',()=>{
      if(busy || turn!==me || api.ended) return; const f = OT.flips(b,i,me); if(!f.length) return;
      b = OT.play(b,{ i, f },me); api.sfx(f.length>2 ? 'pop' : 'tap'); turn = -me; busy = true; draw(); api.after(300,next);
    }));
    newRound();
  }
});

/* ---------------------------------------------------------- ÉCHECS */
const CH = (function(){
  const P=1, N=2, B=3, Rk=4, Q=5, K=6;
  const KN = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]], KG = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  const BD = [[-1,-1],[-1,1],[1,-1],[1,1]], RD = [[-1,0],[1,0],[0,-1],[0,1]];
  const VAL = [0,100,320,330,500,900,0];
  function start(){
    const b = Array(64).fill(0), back = [Rk,N,B,Q,K,B,N,Rk];
    for(let c=0;c<8;c++){ b[c] = -back[c]; b[8+c] = -P; b[48+c] = P; b[56+c] = back[c]; }
    return { b, turn:1, cr:15, ep:-1, half:0 };
  }
  function fromFEN(fen){
    const parts = fen.split(' '), b = Array(64).fill(0); let i = 0;
    parts[0].split('/').forEach(row=>{ for(const ch of row){ if(/\d/.test(ch)) i += +ch; else { const t = 'pnbrqk'.indexOf(ch.toLowerCase())+1; b[i++] = ch===ch.toLowerCase() ? -t : t; } } });
    let cr = 0; const c = parts[2]||'-'; if(c.indexOf('K')>=0) cr |= 1; if(c.indexOf('Q')>=0) cr |= 2; if(c.indexOf('k')>=0) cr |= 4; if(c.indexOf('q')>=0) cr |= 8;
    const ep = parts[3] && parts[3]!=='-' ? (8-parseInt(parts[3][1]))*8 + (parts[3].charCodeAt(0)-97) : -1;
    return { b, turn:parts[1]==='b' ? -1 : 1, cr, ep, half:0 };
  }
  function attacked(b,sq,by){
    const r = (sq/8)|0, c = sq%8;
    const pr = by===1 ? r+1 : r-1;
    if(pr>=0 && pr<8){ for(const dc of [-1,1]){ const cc = c+dc; if(cc>=0 && cc<8 && b[pr*8+cc]===by*P) return true; } }
    for(const [dr,dc] of KN){ const rr=r+dr, cc=c+dc; if(rr>=0&&rr<8&&cc>=0&&cc<8 && b[rr*8+cc]===by*N) return true; }
    for(const [dr,dc] of KG){ const rr=r+dr, cc=c+dc; if(rr>=0&&rr<8&&cc>=0&&cc<8 && b[rr*8+cc]===by*K) return true; }
    for(const [dr,dc] of BD){ let rr=r+dr, cc=c+dc; while(rr>=0&&rr<8&&cc>=0&&cc<8){ const v = b[rr*8+cc]; if(v){ if(v===by*B || v===by*Q) return true; break; } rr+=dr; cc+=dc; } }
    for(const [dr,dc] of RD){ let rr=r+dr, cc=c+dc; while(rr>=0&&rr<8&&cc>=0&&cc<8){ const v = b[rr*8+cc]; if(v){ if(v===by*Rk || v===by*Q) return true; break; } rr+=dr; cc+=dc; } }
    return false;
  }
  function pseudo(st){
    const b = st.b, side = st.turn, out = [];
    const add = (f,t,pc,cap,pr,ep,cs)=>{ out.push({ f, t, pc, cap, pr:pr||0, ep:!!ep, cs:cs||0 }); };
    for(let i=0;i<64;i++){
      const v = b[i]; if(!v || (v>0?1:-1)!==side) continue; const pc = Math.abs(v), r = (i/8)|0, c = i%8;
      if(pc===P){
        const dr = side===1 ? -1 : 1, r1 = r+dr, promo = side===1 ? 0 : 7;
        if(r1>=0 && r1<8 && !b[r1*8+c]){
          if(r1===promo) [Q,Rk,B,N].forEach(p=>add(i,r1*8+c,P,0,p)); else add(i,r1*8+c,P,0);
          const sr = side===1 ? 6 : 1;
          if(r===sr && !b[(r+2*dr)*8+c]) add(i,(r+2*dr)*8+c,P,0);
        }
        for(const dc of [-1,1]){
          const cc = c+dc; if(cc<0||cc>7||r1<0||r1>7) continue; const t = r1*8+cc, tv = b[t];
          if(tv && (tv>0?1:-1)!==side){ if(r1===promo) [Q,Rk,B,N].forEach(p=>add(i,t,P,Math.abs(tv),p)); else add(i,t,P,Math.abs(tv)); }
          else if(!tv && t===st.ep) add(i,t,P,P,0,true);
        }
      } else if(pc===N || pc===K){
        for(const [dr,dc] of (pc===N ? KN : KG)){
          const rr=r+dr, cc=c+dc; if(rr<0||rr>7||cc<0||cc>7) continue; const t = rr*8+cc, tv = b[t];
          if(!tv) add(i,t,pc,0); else if((tv>0?1:-1)!==side) add(i,t,pc,Math.abs(tv));
        }
        if(pc===K){
          const home = side===1 ? 60 : 4, kr = side===1 ? 1 : 4, qr = side===1 ? 2 : 8;
          if(i===home && !attacked(b,home,-side)){
            if((st.cr&kr) && b[home+3]===side*Rk && !b[home+1] && !b[home+2] && !attacked(b,home+1,-side)) add(i,home+2,K,0,0,0,1);
            if((st.cr&qr) && b[home-4]===side*Rk && !b[home-1] && !b[home-2] && !b[home-3] && !attacked(b,home-1,-side)) add(i,home-2,K,0,0,0,2);
          }
        }
      } else {
        const dirs = pc===B ? BD : pc===Rk ? RD : BD.concat(RD);
        for(const [dr,dc] of dirs){
          let rr=r+dr, cc=c+dc;
          while(rr>=0&&rr<8&&cc>=0&&cc<8){ const t = rr*8+cc, tv = b[t]; if(!tv) add(i,t,pc,0); else { if((tv>0?1:-1)!==side) add(i,t,pc,Math.abs(tv)); break; } rr+=dr; cc+=dc; }
        }
      }
    }
    return out;
  }
  function make(st,m){
    const b = st.b.slice(), side = st.turn; let cr = st.cr, ep = -1;
    b[m.f] = 0;
    if(m.ep) b[m.t + (side===1 ? 8 : -8)] = 0;
    b[m.t] = side*(m.pr || m.pc);
    if(m.cs===1){ b[m.t+1] = 0; b[m.t-1] = side*Rk; } else if(m.cs===2){ b[m.t-2] = 0; b[m.t+1] = side*Rk; }
    if(m.pc===K) cr &= side===1 ? ~3 : ~12;
    if(m.f===63||m.t===63) cr &= ~1; if(m.f===56||m.t===56) cr &= ~2; if(m.f===7||m.t===7) cr &= ~4; if(m.f===0||m.t===0) cr &= ~8;
    if(m.pc===P && Math.abs(m.t-m.f)===16) ep = (m.f+m.t)/2;
    return { b, turn:-side, cr, ep, half:(m.pc===P || m.cap) ? 0 : st.half+1 };
  }
  const kingSq = (b,side)=> b.indexOf(side*K);
  const inCheck = (st)=> attacked(st.b, kingSq(st.b,st.turn), -st.turn);
  function legal(st){
    const side = st.turn;
    return pseudo(st).filter(m=>{ const nb = make(st,m); return !attacked(nb.b, kingSq(nb.b,side), -side); });
  }
  function perft(st,d){ if(d===0) return 1; const mv = legal(st); if(d===1) return mv.length; let n = 0; for(const m of mv) n += perft(make(st,m),d-1); return n; }
  function evaluate(b){
    let s = 0;
    for(let i=0;i<64;i++){
      const v = b[i]; if(!v) continue; const side = v>0?1:-1, pc = Math.abs(v), r = (i/8)|0, c = i%8; let x = VAL[pc];
      const cen = 3.5-Math.abs(c-3.5) + 3.5-Math.abs(r-3.5);
      if(pc===P) x += (side===1 ? 6-r : r-1)*6 + cen*2; else if(pc===N||pc===B) x += cen*5; else if(pc===Q) x += cen;
      s += side*x;
    }
    return s;
  }
  const order = (m)=> (m.pr ? 800 : 0) + (m.cap ? VAL[m.cap]*10-VAL[m.pc] : 0);
  function search(st,d,a,be){
    const mv = legal(st);
    if(!mv.length) return inCheck(st) ? -100000-d : 0;
    if(d===0) return evaluate(st.b)*st.turn;
    mv.sort((x,y)=>order(y)-order(x));
    let best = -Infinity;
    for(const m of mv){ const v = -search(make(st,m),d-1,-be,-a); if(v>best) best = v; if(best>a) a = best; if(a>=be) break; }
    return best;
  }
  function aiPick(st,depth){
    const mv = shuffle(legal(st)); mv.sort((x,y)=>order(y)-order(x)); let best = -Infinity, arr = [];
    for(const m of mv){ const v = -search(make(st,m),depth-1,-Infinity,Infinity); if(v>best+1e-9){ best = v; arr = [m]; } else if(Math.abs(v-best)<1e-9) arr.push(m); }
    return pick(arr);
  }
  return { start, fromFEN, legal, make, perft, inCheck, aiPick };
})();
SCCG.lab.chess = CH;
R({ id:'echecs', name:'Échecs', emoji:'♟️', cat:'Plateau', hue:35, scoreLabel:'Points',
  desc:"Le roi des jeux de réflexion, contre l'IA.",
  how:"Tu joues les pièces blanches (en bas). Touche une pièce puis la case d'arrivée (les cases possibles s'allument). Roque et prise en passant sont inclus, un pion qui arrive au bout devient dame. Échec et mat : +5 points, partie nulle : +2. Une défaite met fin à la partie.",
  create(api){
    const board = el('div','g-board dm-board'); api.root.appendChild(board); api.fit(board,1);
    board.innerHTML = '<div class="g-grid" style="grid-template-columns:repeat(8,1fr);grid-template-rows:repeat(8,1fr);gap:0;"></div>';
    const grid = board.firstChild, GL = [0,'♟','♞','♝','♜','♛','♚'];
    let st, sel = -1, legalMv = [], busy = true, round = 0, pts = 0, plies = 0, last = null;
    function render(){
      const dests = sel>=0 ? legalMv.filter(m=>m.f===sel).map(m=>m.t) : []; let h = '';
      const chk = CH.inCheck(st) ? st.b.indexOf(st.turn*6) : -1;
      for(let i=0;i<64;i++){
        const r = (i/8)|0, c = i%8, v = st.b[i], dark = (r+c)%2===1;
        const bg = i===chk ? 'background:#c0392b;' : (last && (i===last[0]||i===last[1]) ? 'background:#c9b458;' : '');
        h += `<button class="dm-sq ${dark?'d':'l'} ${i===sel?'sel':''} ${dests.indexOf(i)>=0?'dest':''}" data-i="${i}" style="${bg}">${v ? `<span style="font-size:calc(var(--u,3px)*9);line-height:1;color:${v>0?'#fff':'#17120c'};text-shadow:${v>0?'0 0 2px #000,0 0 2px #000,0 1px 3px #000':'0 0 2px #fff,0 0 1px #fff'};">${GL[Math.abs(v)]}</span>` : ''}</button>`;
      }
      grid.innerHTML = h;
      api.setInfo('Manche '+round+(chk>=0 ? ' • ÉCHEC !' : ''));
    }
    function conclude(res){
      busy = true; render();
      if(res==='P'){ pts += 5; api.setScore(pts); api.sfx('win'); api.toast('Échec et mat ! +5'); api.after(1500,newRound); }
      else if(res==='D'){ pts += 2; api.setScore(pts); api.toast('Partie nulle +2'); api.after(1400,newRound); }
      else api.end(pts,{ title:'Échec et mat', msg:'Tu as gagné '+(round-1)+' partie(s).' });
    }
    function after(){
      plies++; legalMv = CH.legal(st);
      if(!legalMv.length) return conclude(CH.inCheck(st) ? (st.turn===-1 ? 'P' : 'A') : 'D');
      if(st.half>=100 || plies>260) return conclude('D');
      const pcs = st.b.filter(v=>v && Math.abs(v)!==6); if(!pcs.length || (pcs.length===1 && [2,3].indexOf(Math.abs(pcs[0]))>=0)) return conclude('D');
      if(st.turn===1){ busy = false; render(); } else { busy = true; render(); api.after(350, aiTurn); }
    }
    function aiTurn(){
      const depth = round<2 ? 2 : 3, mv = legalMv;
      const m = Math.random() < Math.max(0,.45-round*.15) ? pick(mv) : CH.aiPick(st,depth);
      st = CH.make(st,m); last = [m.f,m.t]; api.sfx(m.cap ? 'pop' : 'move'); after();
    }
    function newRound(){ round++; st = CH.start(); sel = -1; plies = 0; last = null; after(); }
    api.on(grid,'click',e=>{
      const s = e.target.closest('.dm-sq'); if(!s || busy || api.ended) return; const i = +s.dataset.i, v = st.b[i];
      if(sel>=0){
        const cand = legalMv.filter(m=>m.f===sel && m.t===i);
        if(cand.length){ const m = cand.find(x=>x.pr===5) || cand[0]; sel = -1; st = CH.make(st,m); last = [m.f,m.t]; api.sfx(m.cap ? 'pop' : 'move'); busy = true; after(); return; }
      }
      if(v>0 && legalMv.some(m=>m.f===i)){ sel = i; render(); } else { sel = -1; render(); }
    });
    newRound();
  }
});

/* ---------------------------------------------------------- GOMOKU */
R({ id:'gomoku', name:'Gomoku', emoji:'⭕', cat:'Plateau', hue:20, scoreLabel:'Points',
  desc:'Aligne 5 pions avant l\'IA.',
  how:"Pose tes pions noirs à tour de rôle avec l'IA. Le premier qui aligne 5 pions (ligne, colonne ou diagonale) gagne : +5 points. Bloque l'IA quand elle aligne 3 ou 4 pions ! Une défaite met fin à la partie.",
  create(api){
    const N = 11, board = el('div','g-board'); api.root.appendChild(board); api.fit(board,1);
    board.innerHTML = `<div class="g-grid" style="grid-template-columns:repeat(${N},1fr);grid-template-rows:repeat(${N},1fr);gap:1px;background:#6b4423;padding:2px;border-radius:6px;">${'<button class="g-cell" style="background:#d9b26f;border-radius:0;"></button>'.repeat(N*N)}</div>`;
    const cells = [].slice.call(board.querySelectorAll('.g-cell'));
    let g, round = 0, pts = 0, busy = true, lastMv = -1, winLine = null;
    const DIRS = [[0,1],[1,0],[1,1],[1,-1]];
    function lineWin(i,p){
      const r = (i/N)|0, c = i%N;
      for(const [dr,dc] of DIRS){
        const cs = [i];
        for(const s of [1,-1]){ let rr=r+dr*s, cc=c+dc*s; while(rr>=0&&rr<N&&cc>=0&&cc<N&&g[rr*N+cc]===p){ cs.push(rr*N+cc); rr+=dr*s; cc+=dc*s; } }
        if(cs.length>=5) return cs;
      }
      return null;
    }
    function cellScore(i,p){
      const r = (i/N)|0, c = i%N; let tot = 0;
      for(const [dr,dc] of DIRS){
        let cnt = 1, open = 0;
        for(const s of [1,-1]){ let rr=r+dr*s, cc=c+dc*s; while(rr>=0&&rr<N&&cc>=0&&cc<N&&g[rr*N+cc]===p){ cnt++; rr+=dr*s; cc+=dc*s; } if(rr>=0&&rr<N&&cc>=0&&cc<N&&!g[rr*N+cc]) open++; }
        tot += cnt>=5 ? 100000 : cnt===4 ? (open===2 ? 10000 : 1000) : cnt===3 ? (open===2 ? 1000 : 100) : cnt===2 ? (open===2 ? 100 : 10) : 1;
      }
      return tot;
    }
    function draw(){
      cells.forEach((c,i)=>{
        const v = g[i]; c.innerHTML = v ? `<div style="width:78%;height:78%;border-radius:50%;margin:auto;background:${v===1?'#111':'#f6efe4'};box-shadow:0 1px 3px rgba(0,0,0,.5);${i===lastMv?'outline:2px solid #e74c3c;':''}${winLine&&winLine.indexOf(i)>=0?'outline:3px solid #2f8f5f;':''}"></div>` : '';
      });
      api.setInfo('Manche '+round);
    }
    function conclude(res){
      busy = true; draw();
      if(res==='P'){ pts += 5; api.setScore(pts); api.sfx('win'); api.toast('Cinq alignés ! +5'); api.after(1400,newRound); }
      else if(res==='D'){ pts += 2; api.setScore(pts); api.toast('Plateau plein +2'); api.after(1300,newRound); }
      else api.end(pts,{ title:"L'IA aligne 5 !", msg:'Tu as gagné '+(round-1)+' manche(s).' });
    }
    function aiTurn(){
      const empt = []; for(let i=0;i<N*N;i++) if(!g[i]) empt.push(i);
      if(!empt.length) return conclude('D');
      let m;
      if(Math.random() < Math.max(0,.3-round*.1)) m = pick(empt);
      else {
        const sc = empt.map(i=>({ i, s: cellScore(i,-1)*1.05 + cellScore(i,1) + (8-Math.abs(i%N-5)-Math.abs(((i/N)|0)-5))*.1 }));
        sc.sort((a,b)=>b.s-a.s); const top = sc.filter(x=>x.s>=sc[0].s*.995); m = pick(top).i;
      }
      g[m] = -1; lastMv = m; api.sfx('tap');
      const w = lineWin(m,-1); if(w){ winLine = w; return conclude('A'); }
      busy = false; draw();
    }
    function newRound(){ round++; g = Array(N*N).fill(0); winLine = null; lastMv = -1; busy = false; draw(); if(round%2===0){ busy = true; g[60] = -1; lastMv = 60; draw(); busy = false; } }
    cells.forEach((c,i)=> api.on(c,'click',()=>{
      if(busy || g[i] || api.ended) return; g[i] = 1; lastMv = i; api.sfx('tap'); busy = true;
      const w = lineWin(i,1); if(w){ winLine = w; conclude('P'); return; }
      if(g.every(x=>x)){ conclude('D'); return; }
      draw(); api.after(380,aiTurn);
    }));
    newRound();
  }
});

/* ---------------------------------------------------------- ALLUMETTES (Nim) */
const NIM = {
  aiMove(h){
    // misère : celui qui prend la dernière allumette perd
    const big = h.filter(x=>x>1).length, ones = h.filter(x=>x===1).length;
    let x = 0; h.forEach(v=>{ x ^= v; });
    if(big>=2 || (big===1 && false)){
      if(x!==0){ for(let i=0;i<h.length;i++){ const t = h[i]^x; if(t<h[i]) return { row:i, take:h[i]-t }; } }
    } else if(big===1){
      const i = h.findIndex(v=>v>1); return { row:i, take:h[i]-(ones%2===0 ? 1 : 0) };
    } else {
      const i = h.findIndex(v=>v===1); if(i>=0) return { row:i, take:1 };
    }
    const rows = h.map((v,i)=>v>0?i:-1).filter(i=>i>=0); const i = pick(rows); return { row:i, take:1+rnd(h[i]) };
  }
};
SCCG.lab.nim = NIM;
R({ id:'nim', name:'Allumettes', emoji:'🔥', cat:'Plateau', hue:12, scoreLabel:'Points',
  desc:'Ne prends pas la dernière allumette !',
  how:"À tour de rôle avec l'IA, retire autant d'allumettes que tu veux, mais dans UNE SEULE rangée. Touche une allumette pour choisir celles à retirer (elle et celles à sa droite), puis valide ✔. Celui qui prend la dernière allumette perd ! Victoire : +4 points.",
  create(api){
    let h, sel = null, round = 0, pts = 0, busy = true, mine = true;
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    function draw(){
      wrap.innerHTML = h.map((n,r)=>`<div class="g-line" style="flex-wrap:nowrap;gap:5px;min-height:46px;">${Array.from({length:n},(_,k)=>`<button data-r="${r}" data-k="${k}" style="width:20px;height:46px;border:none;border-radius:4px;background:${sel&&sel.row===r&&k>=sel.from?'#e74c3c':'linear-gradient(#f2b84b,#c97b4a)'};cursor:pointer;touch-action:manipulation;"></button>`).join('')}</div>`).join('');
      api.setInfo('Manche '+round+(sel ? ' • '+(h[sel.row]-sel.from)+' à retirer' : ''));
    }
    function check(who){
      if(h.every(v=>v===0)){
        busy = true;
        if(who==='me'){ api.sfx('lose'); api.end(pts,{ title:"Tu as pris la dernière !", msg:'Tu as gagné '+(round-1)+' manche(s).' }); }
        else { pts += 4; api.setScore(pts); api.sfx('win'); api.toast("L'IA a pris la dernière ! +4"); api.after(1300,newRound); }
        return true;
      }
      return false;
    }
    function aiTurn(){
      let m = Math.random() < Math.max(0,.55-round*.12) ? (()=>{ const rows = h.map((v,i)=>v>0?i:-1).filter(i=>i>=0), i = pick(rows); return { row:i, take:1+rnd(h[i]) }; })() : NIM.aiMove(h);
      h[m.row] -= m.take; sel = null; api.sfx('tap'); draw();
      if(check('ai')) return; busy = false;
    }
    function newRound(){
      round++; const rows = Math.min(5,3+Math.floor(round/2)); h = Array.from({length:rows},(_,i)=>1+rnd(Math.min(9,3+i+round)));
      if(h.every(v=>v===1)) h[0] = 3; sel = null; busy = false; draw();
      if(round%2===0){ busy = true; api.after(600,aiTurn); }
    }
    api.on(wrap,'click',e=>{
      const b = e.target.closest('button'); if(!b || busy || api.ended) return;
      sel = { row:+b.dataset.r, from:+b.dataset.k }; api.sfx('move'); draw();
    });
    api.buttons([{ t:'✔ Retirer', cls:'wide', down:()=>{
      if(!sel || busy) { api.toast('Choisis des allumettes'); return; }
      h[sel.row] = sel.from; sel = null; api.sfx('tap'); draw();
      if(check('me')) return; busy = true; api.after(650,aiTurn);
    } }]);
    newRound();
  }
});

/* ---------------------------------------------------------- JEU DES POINTS */
R({ id:'points', name:'Jeu des points', emoji:'🔲', cat:'Plateau', hue:260, scoreLabel:'Points',
  desc:'Trace des traits et ferme un maximum de carrés.',
  how:"À tour de rôle, relie deux points voisins par un trait (touche entre deux points). Quand tu fermes un carré, il est à toi et tu rejoues ! Celui qui ferme le plus de carrés gagne la manche : +5 points. Une défaite met fin à la partie.",
  create(api){
    const NB = 4, S = 64, PAD = 24, W = NB*S+2*PAD, c = api.canvas(W,W), g = c.g;
    let h, v, own, turn = 1, round = 0, pts = 0, busy = true, last = null;
    const boxSides = (r,cc)=> (h[r][cc]?1:0)+(h[r+1][cc]?1:0)+(v[r][cc]?1:0)+(v[r][cc+1]?1:0);
    function draw(){
      g.fillStyle = '#17120c'; g.fillRect(0,0,W,W);
      for(let r=0;r<NB;r++) for(let q=0;q<NB;q++) if(own[r][q]){ g.fillStyle = own[r][q]===1 ? 'rgba(242,184,75,.45)' : 'rgba(110,198,242,.45)'; g.fillRect(PAD+q*S+3,PAD+r*S+3,S-6,S-6); g.fillStyle = '#fff'; g.font='700 18px sans-serif'; g.textAlign='center'; g.textBaseline='middle'; g.fillText(own[r][q]===1?'T':'IA',PAD+q*S+S/2,PAD+r*S+S/2); }
      g.lineCap = 'round'; g.lineWidth = 6;
      for(let r=0;r<=NB;r++) for(let q=0;q<NB;q++){ g.strokeStyle = h[r][q] ? (h[r][q]===1 ? '#F2B84B' : '#6ec6f2') : 'rgba(255,255,255,.12)'; g.beginPath(); g.moveTo(PAD+q*S+6,PAD+r*S); g.lineTo(PAD+(q+1)*S-6,PAD+r*S); g.stroke(); }
      for(let r=0;r<NB;r++) for(let q=0;q<=NB;q++){ g.strokeStyle = v[r][q] ? (v[r][q]===1 ? '#F2B84B' : '#6ec6f2') : 'rgba(255,255,255,.12)'; g.beginPath(); g.moveTo(PAD+q*S,PAD+r*S+6); g.lineTo(PAD+q*S,PAD+(r+1)*S-6); g.stroke(); }
      g.fillStyle = '#f6efe4'; for(let r=0;r<=NB;r++) for(let q=0;q<=NB;q++){ g.beginPath(); g.arc(PAD+q*S,PAD+r*S,5,0,7); g.fill(); }
      let a = 0, b = 0; own.forEach(row=>row.forEach(x=>{ if(x===1) a++; else if(x===2) b++; })); api.setInfo('Manche '+round+' • Toi '+a+' – IA '+b);
    }
    function claim(type,r,q,who){
      (type==='h' ? h : v)[r][q] = who; api.sfx('tap'); let got = 0;
      const check = (br,bc)=>{ if(br>=0&&br<NB&&bc>=0&&bc<NB && !own[br][bc] && boxSides(br,bc)===4){ own[br][bc] = who; got++; } };
      if(type==='h'){ check(r-1,q); check(r,q); } else { check(r,q-1); check(r,q); }
      if(got) api.sfx('good'); return got;
    }
    function moves(){ const m = []; for(let r=0;r<=NB;r++) for(let q=0;q<NB;q++) if(!h[r][q]) m.push(['h',r,q]); for(let r=0;r<NB;r++) for(let q=0;q<=NB;q++) if(!v[r][q]) m.push(['v',r,q]); return m; }
    function conclude(){
      busy = true; draw(); let a = 0, b = 0; own.forEach(row=>row.forEach(x=>{ if(x===1) a++; else if(x===2) b++; }));
      if(a>b){ pts += 5; api.setScore(pts); api.sfx('win'); api.toast('Manche gagnée '+a+'–'+b+' ! +5'); api.after(1500,newRound); }
      else if(a===b){ pts += 2; api.setScore(pts); api.toast('Égalité +2'); api.after(1400,newRound); }
      else api.end(pts,{ title:"L'IA gagne "+b+'–'+a, msg:'Tu as gagné '+(round-1)+' manche(s).' });
    }
    const full = ()=> own.every(row=>row.every(x=>x));
    function aiTurn(){
      busy = true; let again = true;
      while(again && !full()){
        const mv = moves(); let m = null;
        const wins = mv.filter(x=>{ const [t,r,q] = x; const bs = t==='h' ? [[r-1,q],[r,q]] : [[r,q-1],[r,q]]; return bs.some(([br,bc])=>br>=0&&br<NB&&bc>=0&&bc<NB&&boxSides(br,bc)===3); });
        if(wins.length && Math.random() > Math.max(0,.3-round*.1)) m = pick(wins);
        else {
          const safe = mv.filter(x=>{ const [t,r,q] = x; const bs = t==='h' ? [[r-1,q],[r,q]] : [[r,q-1],[r,q]]; return bs.every(([br,bc])=>!(br>=0&&br<NB&&bc>=0&&bc<NB) || boxSides(br,bc)<2); });
          m = safe.length ? pick(safe) : pick(mv);
        }
        const got = claim(m[0],m[1],m[2],2); again = got>0;
      }
      draw(); if(full()) return conclude(); busy = false;
    }
    function newRound(){
      round++; h = Array.from({length:NB+1},()=>Array(NB).fill(0)); v = Array.from({length:NB},()=>Array(NB+1).fill(0)); own = Array.from({length:NB},()=>Array(NB).fill(0)); busy = false; draw();
      if(round%2===0){ busy = true; api.after(500,aiTurn); }
    }
    api.on(api.root,'pointerdown',e=>{
      if(busy || api.ended) return; const p = c.pos(e); let best = null, bd = 1e9;
      for(let r=0;r<=NB;r++) for(let q=0;q<NB;q++) if(!h[r][q]){ const d = Math.hypot(p.x-(PAD+q*S+S/2),p.y-(PAD+r*S)); if(d<bd){ bd = d; best = ['h',r,q]; } }
      for(let r=0;r<NB;r++) for(let q=0;q<=NB;q++) if(!v[r][q]){ const d = Math.hypot(p.x-(PAD+q*S),p.y-(PAD+r*S+S/2)); if(d<bd){ bd = d; best = ['v',r,q]; } }
      if(!best || bd>S*.5) return;
      const got = claim(best[0],best[1],best[2],1); draw();
      if(full()) return conclude();
      if(!got){ busy = true; api.after(450,aiTurn); }
    });
    newRound();
  }
});

/* ---------------------------------------------------------- SOLITAIRE À PIONS */
R({ id:'peg', name:'Solitaire à pions', emoji:'📍', cat:'Réflexion', hue:30, score:'low', scoreLabel:'Pions', fmt:v=>v+' pion'+(v>1?'s':''),
  desc:'Saute par-dessus les pions pour n\'en garder qu\'un.',
  how:"Un pion peut sauter par-dessus un pion voisin (en ligne droite) vers un trou vide : le pion sauté disparaît. Touche un pion puis le trou d'arrivée. Essaie de ne laisser qu'UN seul pion, idéalement au centre !",
  create(api){
    const map = ['..XXX..','..XXX..','XXXXXXX','XXX.XXX','XXXXXXX','..XXX..','..XXX..'];
    const board = el('div','g-board'); api.root.appendChild(board); api.fit(board,1);
    let g = map.map(r=>r.split('').map(ch=> ch==='.' ? -1 : ch==='X' ? 1 : 0)), sel = null, done = false;
    board.innerHTML = '<div class="g-grid" style="grid-template-columns:repeat(7,1fr);grid-template-rows:repeat(7,1fr);gap:calc(var(--u,3px)*1.2);"></div>';
    const grid = board.firstChild;
    const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
    const jumps = (r,c)=> g[r][c]!==1 ? [] : dirs.filter(([dr,dc])=>{ const r1=r+dr,c1=c+dc,r2=r+2*dr,c2=c+2*dc; return r2>=0&&r2<7&&c2>=0&&c2<7&&g[r1][c1]===1&&g[r2][c2]===0; }).map(([dr,dc])=>[r+2*dr,c+2*dc]);
    const count = ()=> g.reduce((n,row)=>n+row.filter(x=>x===1).length,0);
    const anyMove = ()=>{ for(let r=0;r<7;r++) for(let c=0;c<7;c++) if(jumps(r,c).length) return true; return false; };
    function draw(){
      const dests = sel ? jumps(sel[0],sel[1]) : []; let h = '';
      for(let r=0;r<7;r++) for(let c=0;c<7;c++){
        const v = g[r][c]; if(v<0){ h += '<div></div>'; continue; }
        const isSel = sel && sel[0]===r && sel[1]===c, isD = dests.some(d=>d[0]===r&&d[1]===c);
        h += `<button class="g-cell" data-r="${r}" data-c="${c}" style="border-radius:50%;background:${v===1?(isSel?'#F2B84B':'radial-gradient(circle at 35% 30%,#ff9d6c,#b94a1f)'):'rgba(255,255,255,.12)'};${isD?'box-shadow:0 0 0 3px #7fe0b3 inset;':''}"></button>`;
      }
      grid.innerHTML = h; api.setScore(count());
    }
    api.on(grid,'click',e=>{
      const b = e.target.closest('.g-cell'); if(!b || done) return; const r = +b.dataset.r, c = +b.dataset.c;
      if(sel){
        const d = jumps(sel[0],sel[1]).find(x=>x[0]===r&&x[1]===c);
        if(d){ g[(sel[0]+r)/2][(sel[1]+c)/2] = 0; g[sel[0]][sel[1]] = 0; g[r][c] = 1; sel = null; api.sfx('pop'); draw();
          if(!anyMove()){ done = true; const n = count(); api.end(n,{ win:n===1, title:n===1 ? (g[3][3]===1 ? 'Parfait !' : 'Un seul pion !') : 'Plus de saut possible', msg:n===1 ? '' : n+' pions restent.' }); }
          return; }
      }
      if(g[r][c]===1 && jumps(r,c).length){ sel = [r,c]; api.sfx('move'); } else sel = null; draw();
    });
    draw();
  }
});

/* ---------------------------------------------------------- SERPENTS & ÉCHELLES */
R({ id:'serpents', name:'Serpents & Échelles', emoji:'🐍', cat:'Plateau', hue:100, scoreLabel:'Points',
  desc:'Cours vers la case 100, grimpe les échelles, évite les serpents.',
  how:"Touche « Lancer le dé » pour avancer. Une échelle 🪜 te fait monter, un serpent 🐍 te fait redescendre. Il faut tomber pile sur la case 100 pour gagner ! Course contre l'IA : victoire +3 points, défaite = fin de partie.",
  create(api){
    const SN = { 16:6, 47:26, 49:11, 56:53, 62:19, 64:60, 87:24, 93:73, 95:75, 98:78 }, LD = { 1:38, 4:14, 9:31, 21:42, 28:84, 36:44, 51:67, 71:91, 80:100 };
    const board = el('div','g-board'); api.root.appendChild(board); api.fit(board,1);
    const num = (r,c)=>{ const row = 9-r, base = row*10; return row%2===0 ? base+c+1 : base+10-c; };
    let h = ''; for(let r=0;r<10;r++) for(let c=0;c<10;c++){ const n = num(r,c), m = SN[n] ? `<small style="display:block;font-size:calc(var(--u,3px)*2.6);color:#ffb3a8;">🐍${SN[n]}</small>` : LD[n] ? `<small style="display:block;font-size:calc(var(--u,3px)*2.6);color:#b5f0cc;">🪜${LD[n]}</small>` : ''; h += `<div class="g-cell" id="sl${n}" style="flex-direction:column;font-size:calc(var(--u,3px)*3.3);font-weight:700;border-radius:3px;background:${SN[n]?'rgba(192,57,43,.35)':LD[n]?'rgba(47,143,95,.4)':((r+c)%2?'rgba(255,255,255,.08)':'rgba(255,255,255,.14)')};cursor:default;">${n}${m}<span class="tk" style="position:absolute;font-size:calc(var(--u,3px)*5);"></span></div>`; }
    board.innerHTML = `<div class="g-grid" style="grid-template-columns:repeat(10,1fr);grid-template-rows:repeat(10,1fr);gap:1px;">${h}</div>`;
    board.querySelectorAll('.g-cell').forEach(c=>{ c.style.position = 'relative'; });
    let pos = [0,0], round = 0, pts = 0, busy = false, turn = 0, roll = 0;
    const die = el('div','g-big-text','🎲'); die.style.cssText = 'font-size:34px;'; api.root.parentNode.insertBefore(die, api.root.nextSibling);
    api.on(window,'beforeunload',()=>{});
    function tokens(){ board.querySelectorAll('.tk').forEach(t=>{ t.textContent = ''; }); [0,1].forEach(p=>{ if(pos[p]>0){ const t = board.querySelector('#sl'+pos[p]+' .tk'); t.textContent += p===0 ? '🟡' : '🔵'; } }); api.setInfo('Toi : '+pos[0]+' • IA : '+pos[1]); }
    function move(p,r){
      let t = pos[p]+r;
      if(t>100){ api.toast((p===0?'Tu restes':"L'IA reste")+' en place (il faut 100 pile)'); return next(p,r); }
      pos[p] = t; tokens(); api.sfx('move');
      api.after(450,()=>{
        if(SN[pos[p]]){ pos[p] = SN[pos[p]]; api.sfx('bad'); api.toast('🐍 Serpent !'); tokens(); } else if(LD[pos[p]]){ pos[p] = LD[pos[p]]; api.sfx('good'); api.toast('🪜 Échelle !'); tokens(); }
        api.after(450,()=>{
          if(pos[p]===100){ busy = true;
            if(p===0){ pts += 3; api.setScore(pts); api.sfx('win'); api.toast('Tu gagnes la course ! +3'); api.after(1400,newRound); }
            else api.end(pts,{ title:"L'IA arrive la première", msg:'Tu as gagné '+(round-1)+' course(s).' });
            return; }
          next(p,r);
        });
      });
    }
    function next(p,r){ if(r===6 && pos[p]<100){ api.toast('6 : on rejoue !'); turn = p; } else turn = 1-p; if(turn===1){ busy = true; api.after(700,aiRoll); } else busy = false; }
    function aiRoll(){ const r = 1+rnd(6); die.textContent = '🎲 '+r; api.sfx('tap'); move(1,r); }
    function newRound(){ round++; pos = [0,0]; tokens(); turn = 0; busy = false; die.textContent = '🎲'; api.setInfo('Manche '+round); }
    api.buttons([{ t:'🎲 Lancer le dé', cls:'wide', down:()=>{ if(busy || api.ended) return; busy = true; roll = 1+rnd(6); die.textContent = '🎲 '+roll; api.sfx('tap'); move(0,roll); } }]);
    newRound();
  }
});

/* ---------------------------------------------------------- TRON */
R({ id:'tron', name:'Tron', emoji:'🏍️', cat:'Arcade', hue:190, scoreLabel:'Points',
  desc:'Laisse une traînée de lumière, fais crasher l\'IA.',
  how:"Ta moto laisse un mur de lumière derrière elle. Glisse ton doigt (ou flèches / boutons) pour tourner. Ne touche ni un mur, ni une traînée ! Si l'IA crashe avant toi : +4 points. Elle devient plus rapide à chaque manche.",
  create(api){
    const N = 30, S = 11, c = api.canvas(N*S,N*S), g = c.g;
    let grid, p, a, acc = 0, step = .11, round = 0, pts = 0, over = false;
    const DIR = { left:[-1,0], right:[1,0], up:[0,-1], down:[0,1] };
    function newRound(){
      round++; grid = Array.from({length:N},()=>Array(N).fill(0)); p = { x:5, y:15, d:DIR.right, nd:null }; a = { x:24, y:15, d:DIR.left };
      grid[p.y][p.x] = 1; grid[a.y][a.x] = 2; step = Math.max(.05,.115-round*.01); acc = 0; over = false; api.setInfo('Manche '+round);
    }
    const free = (x,y)=> x>=0&&x<N&&y>=0&&y<N&&!grid[y][x];
    function area(x,y){ const seen = {}; const st = [[x,y]]; let n = 0; seen[x+','+y] = 1; while(st.length && n<160){ const [cx,cy] = st.pop(); n++; for(const d of [[1,0],[-1,0],[0,1],[0,-1]]){ const nx = cx+d[0], ny = cy+d[1], k = nx+','+ny; if(free(nx,ny) && !seen[k]){ seen[k] = 1; st.push([nx,ny]); } } } return n; }
    function aiDir(){
      const opts = [a.d, [a.d[1],-a.d[0]], [-a.d[1],a.d[0]]].filter(d=>free(a.x+d[0],a.y+d[1]));
      if(!opts.length) return a.d;
      if(Math.random() < Math.max(0,.18-round*.04)) return pick(opts);
      let best = null, bs = -1; opts.forEach(d=>{ const s = area(a.x+d[0],a.y+d[1]) + (d===a.d ? 3 : 0) + Math.random(); if(s>bs){ bs = s; best = d; } });
      return best;
    }
    function tick(){
      if(p.nd){ if(!(p.nd[0]===-p.d[0] && p.nd[1]===-p.d[1])) p.d = p.nd; p.nd = null; }
      a.d = aiDir();
      const pn = [p.x+p.d[0],p.y+p.d[1]], an = [a.x+a.d[0],a.y+a.d[1]];
      const pc = !free(pn[0],pn[1]), ac = !free(an[0],an[1]) || (pn[0]===an[0] && pn[1]===an[1]);
      if(!pc){ p.x = pn[0]; p.y = pn[1]; grid[p.y][p.x] = 1; } if(!ac){ a.x = an[0]; a.y = an[1]; grid[a.y][a.x] = 2; }
      if(pc || ac){
        over = true; api.sfx(pc ? 'boom' : 'win');
        if(pc && !ac) api.end(pts,{ title:'Crash !', msg:'Tu as gagné '+(round-1)+' manche(s).' });
        else if(pc && ac){ pts += 1; api.setScore(pts); api.toast('Double crash +1'); api.after(1200,newRound); }
        else { pts += 4; api.setScore(pts); api.toast("L'IA a crashé ! +4"); api.after(1200,newRound); }
      }
    }
    function draw(){
      g.fillStyle = '#05080f'; g.fillRect(0,0,N*S,N*S); g.strokeStyle = 'rgba(80,160,255,.08)'; g.lineWidth = 1;
      for(let i=0;i<=N;i++){ g.beginPath(); g.moveTo(i*S,0); g.lineTo(i*S,N*S); g.stroke(); g.beginPath(); g.moveTo(0,i*S); g.lineTo(N*S,i*S); g.stroke(); }
      for(let y=0;y<N;y++) for(let x=0;x<N;x++) if(grid[y][x]){ g.fillStyle = grid[y][x]===1 ? '#22d3ee' : '#fb923c'; g.fillRect(x*S+1,y*S+1,S-2,S-2); }
      g.fillStyle = '#fff'; g.fillRect(p.x*S+1,p.y*S+1,S-2,S-2); g.fillRect(a.x*S+1,a.y*S+1,S-2,S-2);
    }
    const turn = d=>{ if(DIR[d]) p.nd = DIR[d]; };
    api.loop(dt=>{ if(!over){ acc += dt; while(acc>=step && !over){ acc -= step; tick(); } } draw(); });
    api.swipe(api.root, turn, { continuous:true, threshold:18 }); api.onKey(k=>turn(k));
    api.buttons([{ t:'◀', down:()=>turn('left') },{ t:'▲', down:()=>turn('up') },{ t:'▼', down:()=>turn('down') },{ t:'▶', down:()=>turn('right') }]);
    newRound();
  }
});

/* ---------------------------------------------------------- CARTES COULEURS (type Uno) */
R({ id:'cartes', name:'Cartes Couleurs', emoji:'🃏', cat:'Cartes & dés', hue:5, scoreLabel:'Points',
  desc:'Défausse toutes tes cartes avant l\'IA.',
  how:"Pose une carte de la même couleur ou du même chiffre que celle du dessus. ⛔ fait passer le tour de l'adversaire, +2 lui fait piocher 2 cartes, 🌈 change la couleur. Si tu ne peux pas jouer, pioche. Le premier sans carte gagne : +5 points.",
  create(api){
    const COL = ['#e74c3c','#f2c94c','#2f9e5f','#3b82f6'], NAMES = ['Rouge','Jaune','Vert','Bleu'];
    let deck, disc, hands, cur, turn, round = 0, pts = 0, busy = true, wildPending = null, drewThisTurn = false;
    const wrap = el('div','g-col'); wrap.style.cssText = 'justify-content:space-between;height:100%;max-height:560px;'; api.root.appendChild(wrap);
    function mkDeck(){
      const d = [];
      for(let c=0;c<4;c++){ d.push({ c, v:'0' }); for(let n=1;n<=9;n++){ d.push({ c, v:String(n) }); d.push({ c, v:String(n) }); } for(let k=0;k<2;k++){ d.push({ c, v:'S' }); d.push({ c, v:'+2' }); } }
      for(let k=0;k<4;k++) d.push({ c:-1, v:'W' });
      return shuffle(d);
    }
    const label = x=> x.v==='S' ? '⛔' : x.v==='W' ? '🌈' : x.v;
    const ok = x=> x.c===-1 || x.c===cur.c || x.v===cur.v;
    function drawCard(who){ if(!deck.length){ const top = disc.pop(); deck = shuffle(disc); disc = [top]; } const x = deck.pop(); if(x) hands[who].push(x); return x; }
    const cardHtml = (x,i,small)=> `<button data-i="${i}" style="min-width:${small?34:46}px;height:${small?48:66}px;border-radius:9px;border:2px solid #fff;background:${x.c<0?'conic-gradient(#e74c3c,#f2c94c,#2f9e5f,#3b82f6,#e74c3c)':COL[x.c]};color:${x.c===1?'#2b2118':'#fff'};font-size:${small?15:20}px;font-weight:800;margin:0 2px;cursor:pointer;touch-action:manipulation;${small?'':ok(x)&&turn===0&&!busy?'transform:translateY(-6px);box-shadow:0 0 0 2px #7fe0b3;':''}">${label(x)}</button>`;
    function draw(){
      const top = disc[disc.length-1];
      wrap.innerHTML = `<div class="g-line" style="min-height:52px;">${hands[1].map((x,i)=>`<span style="width:26px;height:38px;border-radius:6px;background:#3a2d20;border:1px solid #fff4;display:inline-block;margin:0 1px;"></span>`).slice(0,14).join('')}<b style="margin-left:6px;">IA : ${hands[1].length}</b></div>
        <div class="g-line" style="align-items:center;gap:14px;"><button id="cdDraw" style="width:54px;height:76px;border-radius:9px;border:2px dashed #fff8;background:#3a2d20;color:#fff;font-weight:800;cursor:pointer;">Piocher</button>
        <div style="width:62px;height:88px;border-radius:11px;border:3px solid #fff;background:${COL[cur.c]};color:${cur.c===1?'#2b2118':'#fff'};display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:800;">${label(top)}</div></div>
        <div class="g-line" style="min-height:26px;"><span style="font-weight:700;">${turn===0?'👉 À toi'+(drewThisTurn?' (tu peux jouer la carte piochée ou passer)':''):"⏳ L'IA joue…"} • Couleur : <span style="color:${COL[cur.c]}">${NAMES[cur.c]}</span></span></div>
        <div class="g-line" style="flex-wrap:nowrap;overflow-x:auto;max-width:100%;padding:8px 2px;justify-content:flex-start;">${hands[0].map((x,i)=>cardHtml(x,i)).join('')}</div>`;
      api.setInfo('Manche '+round);
    }
    function finish(who){
      busy = true; draw();
      if(who===0){ pts += 5; api.setScore(pts); api.sfx('win'); api.toast('Plus de cartes ! +5'); api.after(1400,newRound); }
      else api.end(pts,{ title:"L'IA n'a plus de cartes", msg:'Tu as gagné '+(round-1)+' manche(s).' });
    }
    function applyCard(who,x,color){
      hands[who].splice(hands[who].indexOf(x),1); disc.push(x); cur = { c:x.c<0 ? color : x.c, v:x.v }; api.sfx('tap');
      if(hands[who].length===0) return finish(who);
      const opp = 1-who;
      if(x.v==='S'){ api.toast(who===0?"L'IA passe son tour":'Tu passes ton tour'); next(who); return; }
      if(x.v==='+2'){ drawCard(opp); drawCard(opp); api.toast((opp===0?'Tu piches':"L'IA pioche")+' 2 cartes'); next(who); return; }
      next(opp);
    }
    function next(who){
      turn = who; drewThisTurn = false; draw();
      if(who===1){ busy = true; api.after(900,aiPlay); } else busy = false, draw();
    }
    function aiPlay(){
      const pl = hands[1].filter(ok);
      if(pl.length){
        pl.sort((a,b)=>(b.v==='+2'||b.v==='S'?1:0)-(a.v==='+2'||a.v==='S'?1:0)); let x = Math.random()<.25 ? pick(pl) : pl[0];
        if(x.c===-1 && pl.some(y=>y.c!==-1)) x = pl.find(y=>y.c!==-1);
        const cnt = [0,0,0,0]; hands[1].forEach(y=>{ if(y.c>=0) cnt[y.c]++; }); const col = cnt.indexOf(Math.max.apply(null,cnt));
        applyCard(1,x,col>=0?col:0);
      } else {
        const y = drawCard(1);
        if(y && ok(y)){ api.after(500,()=>{ const cnt = [0,0,0,0]; hands[1].forEach(z=>{ if(z.c>=0) cnt[z.c]++; }); applyCard(1,y,cnt.indexOf(Math.max.apply(null,cnt))); }); }
        else { api.toast("L'IA pioche et passe"); next(0); }
      }
    }
    function newRound(){
      round++; deck = mkDeck(); disc = []; hands = [[],[]]; for(let i=0;i<7;i++){ hands[0].push(deck.pop()); hands[1].push(deck.pop()); }
      let first; do { first = deck.pop(); if(first.c<0 || first.v==='S' || first.v==='+2'){ deck.unshift(first); first = null; } } while(!first);
      disc.push(first); cur = { c:first.c, v:first.v }; wildPending = null; turn = 0; busy = false; drewThisTurn = false;
      if(round%2===0){ turn = 1; busy = true; draw(); api.after(800,aiPlay); } else draw();
    }
    api.on(wrap,'click',e=>{
      if(busy || turn!==0 || api.ended) return;
      if(e.target.closest('#cdDraw')){
        if(drewThisTurn){ next(1); return; }
        drawCard(0); drewThisTurn = true; api.sfx('move');
        const y = hands[0][hands[0].length-1]; draw();
        if(!ok(y)){ api.toast('Pas jouable : tu passes'); busy = true; api.after(700,()=>next(1)); }
        return;
      }
      const b = e.target.closest('[data-i]'); if(!b) return; const x = hands[0][+b.dataset.i];
      if(!ok(x)){ api.sfx('bad'); return; }
      if(x.c===-1){ wildPending = x; showColors(); return; }
      applyCard(0,x,x.c);
    });
    function showColors(){
      busy = true; api.pad.innerHTML = '';
      COL.forEach((c,i)=>{ const b = el('button','gm-key sm'); b.style.background = c; b.textContent = NAMES[i][0]; api.on(b,'click',()=>{ api.pad.innerHTML = ''; const x = wildPending; wildPending = null; busy = false; applyCard(0,x,i); }); api.pad.appendChild(b); });
      api.toast('Choisis une couleur');
    }
    newRound();
  }
});

/* ---------------------------------------------------------- YAMS */
const YAMS = (function(){
  const cnt = d=>{ const c = [0,0,0,0,0,0,0]; d.forEach(x=>{ c[x]++; }); return c; };
  const sum = d=> d.reduce((a,b)=>a+b,0);
  const cats = [
    ['1','Total des 1',d=>cnt(d)[1]*1],['2','Total des 2',d=>cnt(d)[2]*2],['3','Total des 3',d=>cnt(d)[3]*3],
    ['4','Total des 4',d=>cnt(d)[4]*4],['5','Total des 5',d=>cnt(d)[5]*5],['6','Total des 6',d=>cnt(d)[6]*6],
    ['brelan','Brelan (3 identiques)',d=>cnt(d).some(x=>x>=3) ? sum(d) : 0],
    ['carre','Carré (4 identiques)',d=>cnt(d).some(x=>x>=4) ? sum(d) : 0],
    ['full','Full (3 + 2)',d=>{ const c = cnt(d).filter(x=>x>0).sort(); return (c.length===2 && c[0]===2 && c[1]===3) ? 25 : 0; }],
    ['ps','Petite suite (4 de suite)',d=>{ const c = cnt(d); return ([1,2,3].some(s=>c[s]&&c[s+1]&&c[s+2]&&c[s+3])) ? 30 : 0; }],
    ['gs','Grande suite (5 de suite)',d=>{ const c = cnt(d); return ([1,2].some(s=>c[s]&&c[s+1]&&c[s+2]&&c[s+3]&&c[s+4])) ? 40 : 0; }],
    ['yams','Yams (5 identiques)',d=>cnt(d).some(x=>x===5) ? 50 : 0],
    ['chance','Chance (total)',d=>sum(d)]
  ];
  return { cats };
})();
SCCG.lab.yams = YAMS;
R({ id:'yams', name:'Yams', emoji:'🎲', cat:'Cartes & dés', hue:8, scoreLabel:'Score',
  desc:'Le jeu de dés : 13 combinaisons à remplir.',
  how:"Lance les 5 dés (3 lancers maximum par tour). Touche des dés pour les garder avant de relancer. Puis choisis dans la liste la combinaison où marquer tes points (chaque ligne ne sert qu'une fois). Bonus de 35 points si les « totaux » 1 à 6 dépassent 62. 13 tours !",
  create(api){
    let dice = [1,1,1,1,1], held = [false,false,false,false,false], rolls = 0, used = {}, total = 0, done = false;
    api.scroll(true);
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    function upper(){ return YAMS.cats.slice(0,6).reduce((s,c)=>s+(used[c[0]]||0),0); }
    function draw(){
      const face = ['','⚀','⚁','⚂','⚃','⚄','⚅'];
      wrap.innerHTML = `<div class="g-line">${dice.map((d,i)=>`<button data-d="${i}" class="g-chip ${held[i]?'on':''}" style="font-size:44px;padding:2px 6px;line-height:1.1;">${rolls?face[d]:'🎲'}</button>`).join('')}</div>
        <div class="hint" style="color:#f6efe4;margin:0;">${rolls===0?'Lance les dés !':rolls<3?'Touche les dés à garder, puis relance':'Choisis une combinaison'} — lancer ${rolls}/3</div>
        <button id="ymRoll" class="g-chip on" style="font-size:16px;" ${rolls>=3?'disabled style="opacity:.4"':''}>🎲 Lancer</button>
        <div style="width:100%;">${YAMS.cats.map(c=>{ const u = used[c[0]]!==undefined; const pot = rolls? c[2](dice):0; return `<button data-c="${c[0]}" class="g-ans" style="padding:8px 12px;margin:2px 0;display:flex;justify-content:space-between;opacity:${u?.55:1};" ${u||!rolls?'disabled':''}><span>${c[1]}</span><b>${u?used[c[0]]:(rolls?'+'+pot:'–')}</b></button>`; }).join('')}
        <div class="hint" style="color:#f6efe4;text-align:center;">Bonus (≥63 aux totaux) : ${upper()}/63 ${upper()>=63?'✅ +35':''}</div></div>`;
      api.setInfo('Tour '+Math.min(13,Object.keys(used).length+1)+'/13');
    }
    function roll(){
      if(rolls>=3||done) return; dice = dice.map((d,i)=> held[i] && rolls>0 ? d : 1+rnd(6)); rolls++; api.sfx('tap'); draw();
    }
    api.on(wrap,'click',e=>{
      if(done) return; if(e.target.closest('#ymRoll')){ roll(); return; }
      const d = e.target.closest('[data-d]'); if(d){ if(rolls>0 && rolls<3){ held[+d.dataset.d] = !held[+d.dataset.d]; draw(); } return; }
      const c = e.target.closest('[data-c]'); if(!c || !rolls) return;
      const cat = YAMS.cats.find(x=>x[0]===c.dataset.c); used[cat[0]] = cat[2](dice); total = Object.values(used).reduce((s,x)=>s+x,0) + (upper()>=63?35:0);
      api.setScore(total); api.sfx(used[cat[0]]>0 ? 'good' : 'bad'); rolls = 0; held = [false,false,false,false,false]; dice = [1,1,1,1,1];
      if(Object.keys(used).length>=13){ done = true; draw(); api.end(total,{ win:total>=200, title:'Partie terminée', msg:upper()>=63?'Bonus de 35 points obtenu !':'' }); return; }
      draw();
    });
    api.setScore(0); draw();
  }
});

/* ---------------------------------------------------------- COCHON (Pig) */
R({ id:'cochon', name:'Jeu du Cochon', emoji:'🐷', cat:'Cartes & dés', hue:340, scoreLabel:'Points',
  desc:'Tente ta chance aux dés, mais sache t\'arrêter à temps !',
  how:"À ton tour, lance le dé autant de fois que tu veux et accumule les points. Mais si tu fais 1, tu perds tout ce que tu avais accumulé ce tour-là ! Touche « Garder » pour mettre tes points à l'abri. Premier à 50 points gagne la manche : +3 points.",
  create(api){
    let tot = [0,0], turnPts = 0, who = 0, round = 0, pts = 0, busy = true;
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    const info = el('div','g-q'); const diceEl = el('div','g-big-text'); diceEl.style.fontSize = '72px'; wrap.appendChild(diceEl); wrap.appendChild(info);
    const FACE = ['','⚀','⚁','⚂','⚃','⚄','⚅'];
    const status = ()=>{ info.innerHTML = `Toi : <b>${tot[0]}</b> • IA : <b>${tot[1]}</b><br><small>${who===0?'À toi':"L'IA joue"} — points du tour : ${turnPts}</small>`; };
    function win(p){
      busy = true;
      if(p===0){ pts += 3; api.setScore(pts); api.sfx('win'); api.toast('Premier à 50 ! +3'); api.after(1300,newRound); }
      else api.end(pts,{ title:"L'IA atteint 50", msg:'Tu as gagné '+(round-1)+' manche(s).' });
    }
    function bank(p){ tot[p] += turnPts; turnPts = 0; if(tot[p]>=50) return win(p); who = 1-p; status(); if(who===1){ busy = true; api.after(800,aiRoll); } else busy = false; }
    function doRoll(p){
      const r = 1+rnd(6); diceEl.textContent = FACE[r]; api.sfx('tap');
      if(r===1){ api.sfx('bad'); api.toast(p===0?'Un 1 ! Tu perds tes points du tour':"L'IA fait 1 !"); turnPts = 0; who = 1-p; status(); if(who===1){ busy = true; api.after(900,aiRoll); } else busy = false; return false; }
      turnPts += r; status(); return true;
    }
    function aiRoll(){
      const goal = Math.max(14, 24-round*1); if(turnPts>=goal || tot[1]+turnPts>=50){ api.toast("L'IA garde "+turnPts); api.after(500,()=>bank(1)); return; }
      if(doRoll(1)) api.after(750,aiRoll);
    }
    function newRound(){ round++; tot = [0,0]; turnPts = 0; who = round%2 ? 0 : 1; diceEl.textContent = '🎲'; status(); api.setInfo('Manche '+round); if(who===1){ busy = true; api.after(700,aiRoll); } else busy = false; }
    api.buttons([
      { t:'🎲 Lancer', cls:'wide', down:()=>{ if(busy||api.ended) return; doRoll(0); } },
      { t:'✋ Garder', cls:'wide', down:()=>{ if(busy||api.ended||turnPts===0) return; bank(0); } }
    ]);
    newRound();
  }
});

/* ---------------------------------------------------------- HAUT OU BAS */
R({ id:'hautbas', name:'Haut ou Bas', emoji:'🔼', cat:'Cartes & dés', hue:215, scoreLabel:'Score',
  desc:'La prochaine carte sera-t-elle plus haute ou plus basse ?',
  how:"Une carte est affichée. Devine si la suivante sera plus HAUTE ou plus BASSE (l'As est la carte la plus forte). Chaque bonne réponse rapporte des points, de plus en plus en série. Une erreur et c'est fini !",
  create(api){
    const RK = ['2','3','4','5','6','7','8','9','10','V','D','R','As'], SU = ['♠','♥','♦','♣'];
    let deck = [], cur, streak = 0, score = 0, lock = false;
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    const mk = ()=>{ deck = shuffle(Array.from({length:52},(_,i)=>({ r:i%13, s:Math.floor(i/13) }))); };
    const card = x=> `<div style="width:120px;height:170px;border-radius:14px;background:#fff;border:3px solid #ccc;color:${x.s%2===1&&x.s<3?'#c0392b':x.s===2?'#c0392b':'#111'};display:flex;flex-direction:column;align-items:center;justify-content:center;font-weight:800;box-shadow:0 6px 16px rgba(0,0,0,.5);"><span style="font-size:48px;line-height:1">${RK[x.r]}</span><span style="font-size:44px">${SU[x.s]}</span></div>`;
    function show(msg){ wrap.innerHTML = `<div class="g-q">${msg||'La prochaine carte sera…'}</div>${card(cur)}<div class="hint" style="color:#f6efe4;">Série : ${streak}</div>`; }
    function draw1(){ if(!deck.length) mk(); return deck.pop(); }
    function guess(up){
      if(lock||api.ended) return; lock = true; const nx = draw1(); api.sfx('tap');
      if(nx.r===cur.r){ cur = nx; show('Égalité ! On continue'); lock = false; return; }
      const ok = up ? nx.r>cur.r : nx.r<cur.r; cur = nx;
      if(ok){ streak++; score += 10*streak; api.setScore(score); api.sfx('good'); show('✅ Bien vu !'); api.after(700,()=>{ lock = false; show(); }); }
      else { show('❌ Raté !'); api.sfx('lose'); api.end(score,{ title:'Raté !', msg:streak+' bonne'+(streak>1?'s':'')+' réponse'+(streak>1?'s':'')+' de suite.' }); }
    }
    api.buttons([{ t:'🔼 Plus haute', cls:'wide', down:()=>guess(true) },{ t:'🔽 Plus basse', cls:'wide', down:()=>guess(false) }]);
    api.onKey(k=>{ if(k==='up') guess(true); else if(k==='down') guess(false); });
    mk(); cur = draw1(); show();
  }
});

/* ---------------------------------------------------------- DOMINOS */
R({ id:'dominos', name:'Dominos', emoji:'🁣', cat:'Cartes & dés', hue:230, scoreLabel:'Points',
  desc:'Pose tous tes dominos avant l\'IA.',
  how:"Chacun a 7 dominos. Pose un domino dont un côté correspond à l'un des deux bouts de la chaîne. Si tu ne peux pas jouer, pioche dans la pioche. Le premier qui n'a plus de dominos gagne la manche (+5). Si tout est bloqué, celui qui a le moins de points gagne.",
  create(api){
    let hands, bone, chain, round = 0, pts = 0, turn = 0, busy = true, selTile = null, passes = 0;
    api.scroll(true);
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    const dots = n=> ['⬜','1','2','3','4','5','6'][n+0] && String(n);
    const tileHtml = (t,i,cls)=> `<div ${i!==undefined?`data-i="${i}"`:''} class="${cls||''}" style="display:inline-flex;flex-direction:column;align-items:center;justify-content:space-around;width:34px;height:68px;margin:2px;border-radius:7px;background:#f6efe4;color:#17120c;font-weight:800;font-size:17px;border:2px solid ${selTile===i&&i!==undefined?'#e74c3c':'#8a5a2f'};cursor:${i!==undefined?'pointer':'default'};"><span>${t[0]}</span><i style="width:80%;height:2px;background:#8a5a2f;display:block"></i><span>${t[1]}</span></div>`;
    const ends = ()=> chain.length ? [chain[0][0], chain[chain.length-1][1]] : [null,null];
    const fits = t=> !chain.length || t[0]===ends()[0] || t[1]===ends()[0] || t[0]===ends()[1] || t[1]===ends()[1];
    const pip = h=> h.reduce((s,t)=>s+t[0]+t[1],0);
    function draw(){
      wrap.innerHTML = `<div class="hint" style="color:#f6efe4;margin:0;">IA : ${hands[1].length} dominos • Pioche : ${bone.length}</div>
        <div class="g-line" style="max-height:240px;overflow:auto;width:100%;">${chain.map(t=>tileHtml(t)).join('')}</div>
        <div class="hint" style="color:#f6efe4;margin:0;">${turn===0?(hands[0].some(fits)||!chain.length?'👉 À toi : touche un domino':(bone.length?'Aucun coup : touche « Piocher »':'Aucun coup : touche « Passer »')):"⏳ L'IA joue…"}</div>
        <div class="g-line" style="width:100%;">${hands[0].map((t,i)=>tileHtml(t,i,fits(t)&&turn===0?'':'')).join('')}</div>`;
      api.setInfo('Manche '+round);
    }
    function place(t,side){
      if(!chain.length){ chain.push(t); return; }
      const [L,Rr] = ends();
      if(side==='L'){ chain.unshift(t[1]===L ? t : [t[1],t[0]]); } else { chain.push(t[0]===Rr ? t : [t[1],t[0]]); }
    }
    function sides(t){ if(!chain.length) return ['R']; const [L,Rr] = ends(), s = []; if(t[0]===L||t[1]===L) s.push('L'); if(t[0]===Rr||t[1]===Rr) s.push('R'); return s; }
    function conclude(w){
      busy = true; draw();
      if(w===0){ pts += 5; api.setScore(pts); api.sfx('win'); api.toast('Tu as posé tous tes dominos ! +5'); api.after(1500,newRound); }
      else if(w===-1){ pts += 2; api.setScore(pts); api.toast('Égalité +2'); api.after(1400,newRound); }
      else api.end(pts,{ title:"L'IA gagne la manche", msg:'Tu as gagné '+(round-1)+' manche(s).' });
    }
    function afterPlay(who){
      passes = 0; if(!hands[who].length) return conclude(who);
      turn = 1-who; draw(); if(turn===1){ busy = true; api.after(900,aiTurn); } else busy = false;
    }
    function doPass(who){
      passes++; if(passes>=2){ const a = pip(hands[0]), b = pip(hands[1]); return conclude(a<b?0:a>b?1:-1); }
      api.toast(who===0?'Tu passes':"L'IA passe"); turn = 1-who; draw(); if(turn===1){ busy = true; api.after(800,aiTurn); } else busy = false;
    }
    function aiTurn(){
      const pl = hands[1].filter(fits);
      if(pl.length){ pl.sort((a,b)=>(b[0]+b[1])-(a[0]+a[1])); const t = Math.random()<.2 ? pick(pl) : pl[0]; hands[1].splice(hands[1].indexOf(t),1); place(t,pick(sides(t))); api.sfx('tap'); afterPlay(1); return; }
      if(bone.length){ hands[1].push(bone.pop()); api.toast("L'IA pioche"); draw(); api.after(700,aiTurn); return; }
      doPass(1);
    }
    function newRound(){
      round++; const all = []; for(let a=0;a<=6;a++) for(let b=a;b<=6;b++) all.push([a,b]); const s = shuffle(all);
      hands = [s.slice(0,7), s.slice(7,14)]; bone = s.slice(14); chain = []; selTile = null; passes = 0;
      // le plus gros double ouvre
      let best = -1, bw = 0; [0,1].forEach(w=>hands[w].forEach(t=>{ if(t[0]===t[1] && t[0]>best){ best = t[0]; bw = w; } }));
      if(best<0){ hands.forEach((h,w)=>h.forEach(t=>{ if(t[0]+t[1]>best){ best = t[0]+t[1]; bw = w; } })); }
      const op = hands[bw].find(t=> best>=0 && (t[0]===t[1] ? t[0]===best : t[0]+t[1]===best)) || hands[bw][0];
      hands[bw].splice(hands[bw].indexOf(op),1); chain.push(op); turn = 1-bw; busy = turn===1; draw();
      if(turn===1) api.after(900,aiTurn);
    }
    api.on(wrap,'click',e=>{
      if(busy || turn!==0 || api.ended) return; const d = e.target.closest('[data-i]'); if(!d) return;
      const i = +d.dataset.i, t = hands[0][i]; if(!fits(t)){ api.sfx('bad'); return; }
      const s = sides(t);
      if(s.length===2 && ends()[0]!==ends()[1]){ selTile = i; draw(); api.pad.innerHTML = ''; api.buttons([{ t:'◀ À gauche', cls:'wide', down:()=>{ api.pad.innerHTML = ''; hands[0].splice(i,1); selTile = null; place(t,'L'); api.sfx('tap'); afterPlay(0); } },{ t:'À droite ▶', cls:'wide', down:()=>{ api.pad.innerHTML = ''; hands[0].splice(i,1); selTile = null; place(t,'R'); api.sfx('tap'); afterPlay(0); } }]); return; }
      hands[0].splice(i,1); place(t,s[0]); api.sfx('tap'); afterPlay(0);
    });
    api.buttons([{ t:'🁢 Piocher / Passer', cls:'wide', down:()=>{
      if(busy||turn!==0||api.ended) return; if(hands[0].some(fits)){ api.toast('Tu as un coup possible'); return; }
      if(bone.length){ hands[0].push(bone.pop()); api.sfx('move'); draw(); } else doPass(0);
    } }]);
    newRound();
  }
});

/* ---------------------------------------------------------- DUEL DE MÉMOIRE */
R({ id:'duelmemoire', name:'Duel de mémoire', emoji:'🧩', cat:'Réflexion', hue:290, scoreLabel:'Points',
  desc:'Retrouve plus de paires que l\'IA.',
  how:"À tour de rôle avec l'IA, retourne deux cartes. Si c'est une paire, tu la gardes et tu rejoues. Celui qui trouve le plus de paires gagne la manche : +5 points. L'IA a de la mémoire, et elle s'améliore à chaque manche !",
  create(api){
    const EM = ['🐶','🐱','🦁','🐘','🦒','🐢','🐸','🦋','🍎','🍌','🍉','🍇'];
    let cards, shown, mem, score, turn, first, round = 0, pts = 0, busy = true;
    const board = el('div','g-board'); api.root.appendChild(board); api.fit(board,1);
    board.innerHTML = '<div class="g-grid" style="grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,1fr);">'+'<button class="g-cell" style="font-size:calc(var(--u,3px)*14)"></button>'.repeat(16)+'</div>';
    const cells = [].slice.call(board.querySelectorAll('.g-cell'));
    function draw(){ cells.forEach((c,i)=>{ const done = cards[i].done, up = done || shown.indexOf(i)>=0; c.textContent = up ? cards[i].e : ''; c.style.background = done ? (cards[i].by===0?'rgba(242,184,75,.4)':'rgba(110,198,242,.4)') : up ? 'rgba(255,255,255,.3)' : ''; }); api.setInfo('Manche '+round+' • Toi '+score[0]+' – IA '+score[1]); }
    function conclude(){
      busy = true;
      if(score[0]>score[1]){ pts += 5; api.setScore(pts); api.sfx('win'); api.toast('Tu gagnes '+score[0]+'–'+score[1]+' ! +5'); api.after(1500,newRound); }
      else if(score[0]===score[1]){ pts += 2; api.setScore(pts); api.toast('Égalité +2'); api.after(1400,newRound); }
      else api.end(pts,{ title:"L'IA gagne "+score[1]+'–'+score[0], msg:'Tu as gagné '+(round-1)+' manche(s).' });
    }
    const remember = i=>{ if(Math.random() < Math.min(.95,.5+round*.12)) mem[i] = 1; };
    function reveal(i,who,cb){
      shown.push(i); remember(i); api.sfx('tap'); draw();
      if(first===null){ first = i; cb(); return; }
      const a = first; first = null; busy = true;
      if(cards[a].e===cards[i].e){
        api.after(600,()=>{ cards[a].done = cards[i].done = true; cards[a].by = cards[i].by = who; score[who]++; shown = []; api.sfx('good'); draw();
          if(cards.every(c=>c.done)) return conclude(); if(who===0){ busy = false; } else api.after(500,aiTurn); });
      } else {
        api.after(900,()=>{ shown = []; draw(); turn = 1-who; if(turn===1){ api.after(300,aiTurn); } else busy = false; });
      }
    }
    function aiTurn(){
      busy = true; const free = cards.map((c,i)=>c.done?-1:i).filter(i=>i>=0);
      let a = -1, b = -1;
      const seen = free.filter(i=>mem[i]); outer: for(const i of seen) for(const j of seen) if(i<j && cards[i].e===cards[j].e){ a = i; b = j; break outer; }
      if(a<0){ const unknown = free.filter(i=>!mem[i]); a = unknown.length ? pick(unknown) : pick(free); }
      reveal(a,1,()=>{
        api.after(650,()=>{
          if(b<0){ const m = free.find(i=>i!==a && mem[i] && cards[i].e===cards[a].e); if(m!==undefined) b = m; else { const rest = free.filter(i=>i!==a && !mem[i]); b = rest.length ? pick(rest) : pick(free.filter(i=>i!==a)); } }
          reveal(b,1,()=>{});
        });
      });
    }
    function newRound(){
      round++; const e = shuffle(EM).slice(0,8); cards = shuffle(e.concat(e)).map(x=>({ e:x, done:false, by:-1 })); shown = []; mem = {}; score = [0,0]; first = null; turn = round%2 ? 0 : 1; draw();
      if(turn===1){ busy = true; api.after(700,aiTurn); } else busy = false;
    }
    cells.forEach((c,i)=> api.on(c,'click',()=>{ if(busy||turn!==0||cards[i].done||shown.indexOf(i)>=0||api.ended) return; reveal(i,0,()=>{}); }));
    newRound();
  }
});
})();

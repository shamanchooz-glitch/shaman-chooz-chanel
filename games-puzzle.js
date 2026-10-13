/* ==========================================================
   JEUX DE RÉFLEXION : Démineur, Sudoku, Taquin, Lights Out,
   Mastermind, Bataille navale, Tour de Hanoï
   ========================================================== */
(function(){
'use strict';
const U = SCCG.util, R = SCCG.register, rnd = U.rnd, shuffle = U.shuffle, pick = U.pick, el = U.el;

/* ---------------------------------------------------------- DÉMINEUR */
R({ id:'demineur', name:'Démineur', emoji:'💣', cat:'Réflexion', hue:200, score:'low', scoreLabel:'Temps', fmt:v=>v+' s',
  desc:'Découvre le terrain sans toucher une mine.',
  how:"Touche une case pour la creuser. Un chiffre indique combien de mines touchent la case. Pour poser un drapeau 🚩, appuie longtemps sur la case (ou change de mode avec le bouton). Découvre toutes les cases sans mine le plus vite possible !",
  create(api){
    const N = 9, M = 10, T = N*N;
    let mine = Array(T).fill(0), num = Array(T).fill(0), open = Array(T).fill(0), flag = Array(T).fill(0);
    let started = false, t = 0, flagMode = false, over = false, opened = 0, flags = 0, booms = -1;
    const nb = i=>{ const r=(i/N)|0, c=i%N, o=[]; for(let a=-1;a<=1;a++) for(let b=-1;b<=1;b++){ if(!a&&!b) continue; const rr=r+a, cc=c+b; if(rr>=0&&rr<N&&cc>=0&&cc<N) o.push(rr*N+cc); } return o; };
    const board = el('div','g-board'); api.root.appendChild(board); api.fit(board,1);
    board.innerHTML = `<div class="g-grid" style="grid-template-columns:repeat(${N},1fr);grid-template-rows:repeat(${N},1fr);">${'<button class="g-cell ms-cell"></button>'.repeat(T)}</div>`;
    const cells = [].slice.call(board.querySelectorAll('.ms-cell'));
    const COL = ['','#3b82f6','#2f8f5f','#e74c3c','#6d28d9','#b45309','#0891b2','#111','#666'];
    const info = ()=> api.setInfo('🚩 '+(M-flags)+' • '+(flagMode?'mode drapeau':'mode creuser'));
    function draw(){
      cells.forEach((c,i)=>{
        let cls = 'g-cell ms-cell', txt = '', col = '';
        if(open[i]){ cls += ' open'; if(mine[i]){ txt = '💣'; cls += i===booms ? ' boom' : ''; } else if(num[i]){ txt = num[i]; col = COL[num[i]]; } }
        else if(flag[i]) txt = '🚩';
        else if(over && mine[i]) txt = '💣';
        c.className = cls; c.textContent = txt; c.style.color = col;
      });
    }
    function plant(safe){
      const ban = [safe].concat(nb(safe)), cand = [];
      for(let i=0;i<T;i++) if(ban.indexOf(i)<0) cand.push(i);
      shuffle(cand).slice(0,M).forEach(i=>{ mine[i] = 1; });
      for(let i=0;i<T;i++) num[i] = nb(i).filter(j=>mine[j]).length;
    }
    function dig(i){
      if(open[i] || flag[i] || over) return;
      if(!started){ started = true; plant(i); }
      if(mine[i]){
        over = true; booms = i; open[i] = 1; for(let k=0;k<T;k++) if(mine[k] && !flag[k]) open[k] = 1;
        draw(); api.sfx('boom'); api.vibrate(200); api.end(null,{ title:'💥 Boum !', msg:'Tu as touché une mine.' }); return;
      }
      const st = [i];
      while(st.length){
        const k = st.pop(); if(open[k] || flag[k]) continue;
        open[k] = 1; opened++;
        if(!num[k]) nb(k).forEach(j=>{ if(!open[j] && !flag[j]) st.push(j); });
      }
      api.sfx('tap'); draw();
      if(opened >= T-M){ over = true; api.end(t,{ win:true, title:'Terrain déminé !' }); }
    }
    function toggle(i){
      if(open[i] || over) return;
      flag[i] = flag[i] ? 0 : 1; flags += flag[i] ? 1 : -1; api.sfx('move'); api.vibrate(25); info(); draw();
    }
    let press = null;
    api.on(board,'pointerdown',e=>{
      const c = e.target.closest('.ms-cell'); if(!c) return; const i = cells.indexOf(c);
      press = { i, long:false, timer:setTimeout(()=>{ if(press){ press.long = true; toggle(i); } }, 420) };
    });
    const endPress = tap=>{
      if(!press) return; clearTimeout(press.timer); const p = press; press = null;
      if(tap && !p.long){ if(flagMode) toggle(p.i); else dig(p.i); }
    };
    api.on(board,'pointerup',()=>endPress(true));
    api.on(board,'pointerleave',()=>endPress(false)); api.on(board,'pointercancel',()=>endPress(false));
    api.buttons([{ t:'⛏️ Creuser', cls:'wide', down:()=>{ flagMode = !flagMode; api.pad.lastChild.textContent = flagMode ? '🚩 Drapeau' : '⛏️ Creuser'; info(); } }]);
    api.every(1000,()=>{ if(started && !over){ t++; api.setScore(t); } });
    api.setScore(0); info(); draw();
  }
});

/* ---------------------------------------------------------- SUDOKU */
const SD = (function(){
  const pc = x=>{ let n=0; while(x){ n += x&1; x >>= 1; } return n; };
  function used(g,i){
    const r = (i/9)|0, c = i%9; let m = 0;
    for(let k=0;k<9;k++){ m |= 1<<g[r*9+k]; m |= 1<<g[k*9+c]; }
    const br = r-r%3, bc = c-c%3;
    for(let a=0;a<3;a++) for(let b=0;b<3;b++) m |= 1<<g[(br+a)*9+bc+b];
    return m;
  }
  function best(g){
    let bi = -1, bm = 0, bn = 10;
    for(let i=0;i<81;i++) if(!g[i]){ const m = used(g,i), k = 9-pc(m&0x3FE); if(k<bn){ bn=k; bi=i; bm=m; if(k<=1) break; } }
    return { bi, bm, bn };
  }
  function count(grid, limit){
    const g = grid.slice(); let n = 0;
    (function rec(){
      if(n>=limit) return;
      const b = best(g); if(b.bi<0){ n++; return; } if(b.bn===0) return;
      for(let v=1;v<=9;v++) if(!(b.bm&(1<<v))){ g[b.bi] = v; rec(); g[b.bi] = 0; if(n>=limit) return; }
    })();
    return n;
  }
  function fill(g){
    const b = best(g); if(b.bi<0) return true; if(b.bn===0) return false;
    for(const v of shuffle([1,2,3,4,5,6,7,8,9])) if(!(b.bm&(1<<v))){ g[b.bi] = v; if(fill(g)) return true; g[b.bi] = 0; }
    return false;
  }
  function gen(clues){
    const sol = Array(81).fill(0); fill(sol);
    const p = sol.slice(); let removed = 0; const idx = []; for(let i=0;i<81;i++) idx.push(i);
    for(const i of shuffle(idx)){
      if(removed >= 81-clues) break;
      const v = p[i]; p[i] = 0;
      if(count(p,2)!==1) p[i] = v; else removed++;
    }
    return { puzzle:p, solution:sol };
  }
  return { gen, count };
})();
SCCG.lab.sudoku = SD;
R({ id:'sudoku', name:'Sudoku', emoji:'🔟', cat:'Réflexion', hue:170, score:'low', scoreLabel:'Temps', fmt:v=>U.mmss(v),
  desc:'Remplis la grille : chaque chiffre une seule fois.',
  how:"Chaque ligne, chaque colonne et chaque carré de 3×3 doit contenir les chiffres de 1 à 9, une seule fois. Touche une case puis un chiffre. 💡 donne un indice (+30 secondes, 3 maximum). Termine le plus vite possible !",
  create(api){
    api.root.innerHTML = '<p class="hint" style="color:#fff;">Préparation de la grille…</p>';
    api.after(30, ()=>{
      const g = SD.gen(36), puz = g.puzzle, sol = g.solution, v = puz.slice(), fixed = puz.map(x=>x>0);
      let sel = -1, t = 0, hints = 0, done = false;
      api.root.innerHTML = '';
      const board = el('div','g-board sd-grid'); api.root.appendChild(board); api.fit(board,1);
      let h = '';
      for(let i=0;i<81;i++){ const r=(i/9)|0, c=i%9; h += `<button class="g-cell sd-c ${c%3===2&&c<8?'bR':''} ${r%3===2&&r<8?'bB':''}" data-i="${i}"></button>`; }
      board.innerHTML = `<div class="g-grid" style="grid-template-columns:repeat(9,1fr);grid-template-rows:repeat(9,1fr);">${h}</div>`;
      const cells = [].slice.call(board.querySelectorAll('.sd-c'));
      const bad = i=>{
        const x = v[i]; if(!x) return false; const r=(i/9)|0, c=i%9, br=r-r%3, bc=c-c%3;
        for(let k=0;k<9;k++){ if(k!==c && v[r*9+k]===x) return true; if(k!==r && v[k*9+c]===x) return true; }
        for(let a=0;a<3;a++) for(let b=0;b<3;b++){ const j=(br+a)*9+bc+b; if(j!==i && v[j]===x) return true; }
        return false;
      };
      function draw(){
        cells.forEach((c,i)=>{
          c.textContent = v[i] || '';
          c.className = c.className.replace(/ ?(fix|sel|same|bad)/g,'') + (fixed[i]?' fix':'') + (i===sel?' sel':'') + (sel>=0 && v[sel] && v[i]===v[sel] && i!==sel ? ' same' : '') + (!fixed[i] && bad(i) ? ' bad' : '');
        });
      }
      function check(){
        for(let i=0;i<81;i++) if(v[i]!==sol[i]) return;
        done = true; api.end(t,{ win:true, title:'Grille réussie !' });
      }
      function put(n){
        if(done || sel<0 || fixed[sel]) return;
        v[sel] = n; api.sfx(n ? 'tap' : 'move'); draw(); if(n) check();
      }
      api.on(board,'click',e=>{ const c = e.target.closest('.sd-c'); if(!c) return; sel = +c.dataset.i; api.sfx('move'); draw(); });
      const list = [];
      for(let n=1;n<=9;n++) list.push({ t:String(n), cls:'sm', down:()=>put(n) });
      list.push({ t:'⌫', cls:'sm', down:()=>put(0) });
      list.push({ t:'💡', cls:'sm', down:()=>{
        if(done) return; if(hints>=3){ api.toast('Plus d\'indices'); return; }
        let i = sel>=0 && !fixed[sel] && v[sel]!==sol[sel] ? sel : -1;
        if(i<0){ const w = []; for(let k=0;k<81;k++) if(v[k]!==sol[k]) w.push(k); if(!w.length) return; i = pick(w); }
        sel = i; v[i] = sol[i]; fixed[i] = true; hints++; t += 30; api.setScore(t); api.toast('Indice utilisé (+30 s)'); draw(); check();
      } });
      api.buttons(list);
      api.onKey((k)=>{ if(k>='1' && k<='9' && k.length===1) put(+k); else if(k==='backspace' || k==='0') put(0); }, true);
      api.every(1000,()=>{ if(!done){ t++; api.setScore(t); } });
      api.setScore(0); draw();
    });
  }
});

/* ---------------------------------------------------------- TAQUIN */
R({ id:'taquin', name:'Taquin', emoji:'🧩', cat:'Réflexion', hue:320, score:'low', scoreLabel:'Coups', fmt:v=>v+' coups',
  desc:'Remets les tuiles dans l\'ordre de 1 à 15.',
  how:"Touche une tuile alignée avec la case vide pour la faire glisser. Range les nombres de 1 à 15 dans l'ordre, la case vide en bas à droite. Le moins de coups possible !",
  create(api){
    const N = 4; let t = []; for(let i=1;i<N*N;i++) t.push(i); t.push(0);
    let prev = -1;
    for(let k=0;k<220;k++){
      const b = t.indexOf(0), r=(b/N)|0, c=b%N, o = [];
      if(r>0) o.push(b-N); if(r<N-1) o.push(b+N); if(c>0) o.push(b-1); if(c<N-1) o.push(b+1);
      const cand = o.filter(x=>x!==prev), j = pick(cand.length?cand:o); t[b] = t[j]; t[j] = 0; prev = b;
    }
    const solved = ()=> t.every((v,i)=> i===N*N-1 ? v===0 : v===i+1);
    if(solved()){ const b = t.indexOf(0); t[b] = t[b-1]; t[b-1] = 0; }
    let moves = 0, done = false;
    const board = el('div','g-board'); api.root.appendChild(board); api.fit(board,1);
    board.innerHTML = `<div class="g-grid" style="grid-template-columns:repeat(${N},1fr);grid-template-rows:repeat(${N},1fr);">${'<button class="g-cell tq-tile"></button>'.repeat(N*N)}</div>`;
    const cells = [].slice.call(board.querySelectorAll('.tq-tile'));
    const draw = ()=> cells.forEach((c,i)=>{ c.textContent = t[i] || ''; c.className = 'g-cell tq-tile' + (t[i] ? '' : ' blank'); });
    function tap(i){
      if(done) return; const b = t.indexOf(0), r=(i/N)|0, c=i%N, br=(b/N)|0, bc=b%N;
      if(i===b) return;
      if(r===br){ const s = c<bc ? 1 : -1; for(let k=bc;k!==c;k-=s) t[br*N+k] = t[br*N+k-s]; t[i] = 0; }
      else if(c===bc){ const s = r<br ? 1 : -1; for(let k=br;k!==r;k-=s) t[k*N+bc] = t[(k-s)*N+bc]; t[i] = 0; }
      else { api.sfx('bad'); return; }
      moves++; api.setScore(moves); api.sfx('move'); draw();
      if(solved()){ done = true; api.end(moves,{ win:true, title:'Taquin résolu !' }); }
    }
    cells.forEach((c,i)=> api.on(c,'click',()=>tap(i)));
    api.setScore(0); draw();
  }
});

/* ---------------------------------------------------------- LIGHTS OUT */
R({ id:'lightsout', name:'Lumières', emoji:'💡', cat:'Réflexion', hue:48, score:'low', scoreLabel:'Coups', fmt:v=>v+' coups',
  desc:'Éteins toutes les lumières de la grille.',
  how:"Toucher une case change son état et celui de ses 4 voisines (haut, bas, gauche, droite). Éteins toutes les lumières avec le moins de coups possible !",
  create(api){
    const N = 5; let g = Array(N*N).fill(0), moves = 0, done = false;
    const flip = i=>{
      const r=(i/N)|0, c=i%N; g[i] ^= 1;
      if(r>0) g[i-N] ^= 1; if(r<N-1) g[i+N] ^= 1; if(c>0) g[i-1] ^= 1; if(c<N-1) g[i+1] ^= 1;
    };
    const idx = []; for(let i=0;i<N*N;i++) idx.push(i);
    shuffle(idx).slice(0, 8+rnd(4)).forEach(flip);
    if(g.every(x=>!x)) flip(12);
    const board = el('div','g-board'); api.root.appendChild(board); api.fit(board,1);
    board.innerHTML = `<div class="g-grid" style="grid-template-columns:repeat(${N},1fr);grid-template-rows:repeat(${N},1fr);">${'<button class="g-cell"></button>'.repeat(N*N)}</div>`;
    const cells = [].slice.call(board.querySelectorAll('.g-cell'));
    const draw = ()=> cells.forEach((c,i)=>{ c.className = 'g-cell ' + (g[i] ? 'lo-on' : 'lo-off'); });
    cells.forEach((c,i)=> api.on(c,'click',()=>{
      if(done) return; flip(i); moves++; api.setScore(moves); api.sfx('tap'); draw();
      if(g.every(x=>!x)){ done = true; api.end(moves,{ win:true, title:'Tout est éteint !' }); }
    }));
    api.setScore(0); draw();
  }
});

/* ---------------------------------------------------------- MASTERMIND */
R({ id:'mastermind', name:'Code secret', emoji:'🎯', cat:'Réflexion', hue:290, scoreLabel:'Score',
  desc:'Devine la combinaison de 4 couleurs en 10 essais.',
  how:"L'ordinateur cache 4 couleurs (une couleur peut se répéter). Compose ta proposition avec les boutons colorés puis valide ✔. Pastille blanche : bonne couleur bien placée. Pastille rouge : bonne couleur mais mal placée. Moins d'essais = plus de points.",
  create(api){
    const COL = ['#e74c3c','#f2c94c','#2f8f5f','#3b82f6','#a855f7','#f97316'], NAMES = ['🔴','🟡','🟢','🔵','🟣','🟠'], LEN = 4, MAXT = 10;
    const code = Array.from({length:LEN},()=>rnd(6)); const rows = []; let cur = [], done = false; const t0 = Date.now();
    api.scroll(true);
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    function fb(g){
      let exact = 0, mis = 0; const cc = [0,0,0,0,0,0], gc = [0,0,0,0,0,0];
      g.forEach((x,i)=>{ if(x===code[i]) exact++; else { cc[code[i]]++; gc[x]++; } });
      for(let k=0;k<6;k++) mis += Math.min(cc[k],gc[k]);
      return [exact, mis];
    }
    const dots = (arr, empty)=> Array.from({length:LEN},(_,i)=> arr[i]!=null ? `<span class="mm-dot" style="background:${COL[arr[i]]}"></span>` : `<span class="mm-dot" ${empty?'':'style="opacity:.4"'}></span>`).join('');
    function draw(){
      let h = '';
      for(let r=0;r<MAXT;r++){
        if(r<rows.length){
          const f = rows[r].f, pegs = Array.from({length:4},(_,i)=> i<f[0] ? '<i class="b"></i>' : i<f[0]+f[1] ? '<i class="w"></i>' : '<i></i>').join('');
          h += `<div class="mm-row">${dots(rows[r].g,true)}<div class="mm-fb">${pegs}</div></div>`;
        } else if(r===rows.length) h += `<div class="mm-row" style="background:rgba(255,255,255,.07);border-radius:12px;padding:4px 8px;">${dots(cur,true)}<div class="mm-fb"><i></i><i></i><i></i><i></i></div></div>`;
        else h += `<div class="mm-row" style="opacity:.45">${dots([],false)}<div class="mm-fb"><i></i><i></i><i></i><i></i></div></div>`;
      }
      wrap.innerHTML = h; api.setInfo('Essai '+Math.min(rows.length+1,MAXT)+'/'+MAXT);
    }
    function submit(){
      if(done || cur.length<LEN){ if(!done) api.toast('Choisis 4 couleurs'); return; }
      const f = fb(cur); rows.push({ g:cur.slice(), f }); cur = []; api.sfx(f[0]===LEN ? 'win' : 'tap'); draw();
      if(f[0]===LEN){
        done = true; const secs = Math.round((Date.now()-t0)/1000), sc = (MAXT+1-rows.length)*100 + Math.max(0,150-secs);
        api.setScore(sc); api.end(sc,{ win:true, title:'Code craqué !', msg:'En '+rows.length+' essai'+(rows.length>1?'s':'')+'.' });
      } else if(rows.length>=MAXT){
        done = true; api.end(0,{ title:'Raté !', msg:'Le code était : '+code.map(i=>NAMES[i]).join(' ') });
      }
    }
    COL.forEach((c,i)=>{
      const b = el('button','gm-key sm'); b.style.background = c; b.style.minWidth = '46px'; b.setAttribute('aria-label','Couleur '+NAMES[i]);
      api.on(b,'click',()=>{ if(!done && cur.length<LEN){ cur.push(i); api.sfx('tap'); draw(); } }); api.pad.appendChild(b);
    });
    api.buttons([{ t:'⌫', cls:'sm', down:()=>{ cur.pop(); draw(); } },{ t:'✔', cls:'sm', down:submit }]);
    draw();
  }
});

/* ---------------------------------------------------------- BATAILLE NAVALE */
R({ id:'navale', name:'Bataille navale', emoji:'🚢', cat:'Réflexion', hue:205, scoreLabel:'Score',
  desc:"Coule toute la flotte ennemie avant qu'elle coule la tienne.",
  how:"Touche une case de la mer ennemie pour tirer : 💥 touché, • dans l'eau. L'IA tire ensuite sur ta flotte. Le premier qui coule les 5 bateaux gagne. Moins tu tires, plus ton score est élevé !",
  create(api){
    const N = 10, SHIPS = [5,4,3,3,2];
    function layout(){
      const own = Array(N*N).fill(-1), ships = [];
      SHIPS.forEach((len,si)=>{
        for(;;){
          const h = rnd(2)===0, r = rnd(h?N:N-len+1), c = rnd(h?N-len+1:N), cs = [];
          for(let k=0;k<len;k++) cs.push(h ? r*N+c+k : (r+k)*N+c);
          if(cs.every(i=>own[i]<0)){ cs.forEach(i=>{ own[i] = si; }); ships.push({ cells:cs }); break; }
        }
      });
      return { own, ships };
    }
    const en = layout(), me = layout(), eShot = Array(N*N).fill(0), mShot = Array(N*N).fill(0);
    let shots = 0, busy = false, done = false, targets = [];
    api.scroll(true);
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    wrap.innerHTML = '<p class="hint" style="margin:0;color:#f6efe4;">🌊 Mer ennemie — touche pour tirer</p><div class="g-board" id="nvE"></div><p class="hint" style="margin:6px 0 0;color:#f6efe4;">⚓ Ta flotte</p><div class="g-board" id="nvM"></div>';
    const bE = wrap.querySelector('#nvE'), bM = wrap.querySelector('#nvM');
    const grid = ()=> `<div class="g-grid" style="grid-template-columns:repeat(${N},1fr);grid-template-rows:repeat(${N},1fr);gap:1px;">${'<button class="g-cell sh-cell"></button>'.repeat(N*N)}</div>`;
    bE.innerHTML = grid(); bM.innerHTML = grid();
    const cE = [].slice.call(bE.querySelectorAll('.sh-cell')), cM = [].slice.call(bM.querySelectorAll('.sh-cell'));
    function size(){
      const W = Math.min(api.root.clientWidth-24, 340); if(W<=0) return;
      [[bE,W],[bM,Math.round(W*.68)]].forEach(p=>{ p[0].style.width = p[1]+'px'; p[0].style.height = p[1]+'px'; p[0].style.setProperty('--u', (p[1]/100)+'px'); });
    }
    size(); api.after(60,size); api.on(window,'resize',size);
    const sunk = (L,shot,si)=> L.ships[si].cells.every(i=>shot[i]===2);
    function draw(){
      cE.forEach((c,i)=>{
        const s = eShot[i], si = en.own[i]; let cls = 'g-cell sh-cell', t = '';
        if(s===1){ cls += ' miss'; t = '•'; } else if(s===2){ cls += (sunk(en,eShot,si) ? ' sunk' : ' hit'); t = '💥'; }
        c.className = cls; c.textContent = t;
      });
      cM.forEach((c,i)=>{
        const s = mShot[i], si = me.own[i]; let cls = 'g-cell sh-cell', t = '';
        if(s===1){ cls += ' miss'; t = '•'; } else if(s===2){ cls += ' hit'; t = '💥'; } else if(si>=0) cls += ' ship';
        c.className = cls; c.textContent = t;
      });
      const left = L=>L.ships.filter((_,si)=>!sunk(L===en?en:me, L===en?eShot:mShot, si)).length;
      api.setInfo('Ennemi : '+left(en)+' bateaux • Toi : '+left(me));
    }
    const myCellsLeft = ()=> me.own.reduce((n,si,i)=> n + (si>=0 && mShot[i]!==2 ? 1 : 0), 0);
    function aiShoot(){
      let i = -1;
      while(targets.length && i<0){ const k = targets.pop(); if(!mShot[k]) i = k; }
      if(i<0){
        const par = [], all = [];
        for(let k=0;k<N*N;k++) if(!mShot[k]){ all.push(k); if((((k/N)|0)+k%N)%2===0) par.push(k); }
        i = pick(par.length ? par : all);
      }
      if(me.own[i]>=0){
        mShot[i] = 2; api.sfx('boom');
        const r=(i/N)|0, c=i%N;
        shuffle([[r-1,c],[r+1,c],[r,c-1],[r,c+1]]).forEach(p=>{ if(p[0]>=0&&p[0]<N&&p[1]>=0&&p[1]<N && !mShot[p[0]*N+p[1]]) targets.push(p[0]*N+p[1]); });
        if(sunk(me,mShot,me.own[i])) targets = [];
      } else { mShot[i] = 1; api.sfx('tap'); }
      draw();
      if(!myCellsLeft()){ done = true; api.end(0,{ title:'Ta flotte est coulée !', msg:"L'ennemi a gagné cette bataille." }); }
      else busy = false;
    }
    api.on(bE,'click',e=>{
      const c = e.target.closest('.sh-cell'); if(!c || busy || done) return; const i = cE.indexOf(c); if(eShot[i]) return;
      shots++; busy = true;
      if(en.own[i]>=0){ eShot[i] = 2; api.sfx('boom'); if(sunk(en,eShot,en.own[i])) api.toast('Bateau coulé !'); } else { eShot[i] = 1; api.sfx('tap'); }
      draw();
      if(en.ships.every((_,si)=>sunk(en,eShot,si))){
        done = true; const sc = Math.max(10, 300 - shots*2 + myCellsLeft()*3);
        api.setScore(sc); api.end(sc,{ win:true, title:'Flotte ennemie coulée !', msg:'En '+shots+' tirs.' }); return;
      }
      api.after(600, aiShoot);
    });
    draw();
  }
});

/* ---------------------------------------------------------- TOUR DE HANOÏ */
R({ id:'hanoi', name:'Tour de Hanoï', emoji:'🗼', cat:'Réflexion', hue:12, score:'low', scoreLabel:'Coups', fmt:v=>v+' coups',
  desc:'Déplace la tour de 5 disques sur la 3e tige.',
  how:"Déplace tous les disques de la 1re tige vers la 3e. Touche une tige pour prendre son disque du dessus, puis touche la tige d'arrivée. Un disque ne peut jamais être posé sur un disque plus petit. Minimum possible : 31 coups !",
  create(api){
    const D = 5, pegs = [[],[],[]]; for(let s=D;s>=1;s--) pegs[0].push(s);
    let sel = -1, moves = 0, done = false;
    const wrap = el('div'); wrap.style.cssText = 'display:flex;gap:10px;width:100%;max-width:440px;height:min(56vh,330px);'; api.root.appendChild(wrap);
    wrap.innerHTML = '<div class="hn-peg" data-p="0"></div><div class="hn-peg" data-p="1"></div><div class="hn-peg" data-p="2"></div>';
    const els = [].slice.call(wrap.querySelectorAll('.hn-peg'));
    function draw(){
      els.forEach((p,i)=>{
        p.className = 'hn-peg' + (i===sel ? ' sel' : '');
        p.innerHTML = pegs[i].map(s=>`<div class="hn-d" style="width:${28+s*13}%;background:hsl(${s*58},70%,56%)"></div>`).join('');
      });
    }
    els.forEach((p,i)=> api.on(p,'click',()=>{
      if(done) return;
      if(sel<0){ if(pegs[i].length){ sel = i; api.sfx('tap'); draw(); } return; }
      if(sel===i){ sel = -1; draw(); return; }
      const s = pegs[sel][pegs[sel].length-1], top = pegs[i][pegs[i].length-1];
      if(top && top<s){ api.sfx('bad'); api.toast('Impossible : disque plus petit dessous'); sel = -1; draw(); return; }
      pegs[sel].pop(); pegs[i].push(s); sel = -1; moves++; api.setScore(moves); api.sfx('move'); draw();
      if(pegs[2].length===D){ done = true; api.end(moves,{ win:true, title:'Tour déplacée !', msg:moves===31 ? 'Parfait : le minimum !' : 'Minimum possible : 31 coups.' }); }
    }));
    api.setScore(0); draw();
  }
});
})();

/* ==========================================================
   LOT 6 — Réflexes et adresse (8 jeux)
   Cibles, Chrono précis, Main sûre, Tuiles piano, Éclate-bulles,
   Plantation de cacao, Feu tricolore, Pêche
   ========================================================== */
(function(){
'use strict';
const U = SCCG.util, rnd = U.rnd, rndf = U.rndf, shuffle = U.shuffle, pick = U.pick, el = U.el, esc = U.esc, fmtN = U.fmtN;
const R = d=>{ d.isNew = true; SCCG.register(d); };
const clamp = (v,a,b)=> Math.max(a, Math.min(b, v));
const TAU = Math.PI*2;
const rrect = (g,x,y,w,h,r)=>{ g.beginPath(); g.moveTo(x+r,y); g.arcTo(x+w,y,x+w,y+h,r); g.arcTo(x+w,y+h,x,y+h,r); g.arcTo(x,y+h,x,y,r); g.arcTo(x,y,x+w,y,r); g.closePath(); };
const emoji = (g,ch,x,y,size)=>{ g.font = size+'px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(ch,x,y); };

/* ---------------------------------------------------------- CIBLES */
R({ id:'cibles', name:'Cibles', emoji:'🎯', cat:'Réflexes', hue:0,
  desc:'Touche les cibles avant qu\'elles disparaissent.',
  how:"Des cibles apparaissent un peu partout : touche-les avant qu'elles ne disparaissent ! Touche près du centre pour doubler les points. Une cible qui disparaît sans avoir été touchée te coûte une vie ❤️ (3 vies). Ça va de plus en plus vite !",
  create(api){
    const W = 320, H = 480, c = api.canvas(W,H), g = c.g;
    let targets = [], lives = 3, score = 0, t = 0, spT = .6, hits = 0, pops = [];
    const info = ()=> api.setInfo('❤️'.repeat(lives));
    function spawn(){
      const r = rndf(26,38); let x, y, tries = 0;
      do { x = rndf(r+6,W-r-6); y = rndf(r+10,H-r-10); tries++; } while(targets.some(o=>Math.hypot(o.x-x,o.y-y)<o.r+r+6) && tries<30);
      targets.push({ x, y, r, life:Math.max(.8,1.9-t*.012), age:0 });
    }
    api.on(api.root,'pointerdown',e=>{
      if(api.ended) return; const p = c.pos(e);
      for(let i=targets.length-1;i>=0;i--){
        const o = targets[i], d = Math.hypot(p.x-o.x,p.y-o.y);
        if(d<=o.r+4){ const pts = d<o.r*.35 ? 2 : 1; score += pts; hits++; api.setScore(score); api.sfx(pts===2 ? 'win' : 'pop'); api.vibrate(15); pops.push({ x:o.x, y:o.y, t:0, pts }); targets.splice(i,1); return; }
      }
    });
    api.loop(dt=>{
      t += dt; spT -= dt; if(spT<=0 && targets.length<4){ spawn(); spT = Math.max(.35,1-t*.012); }
      for(let i=targets.length-1;i>=0;i--){ const o = targets[i]; o.age += dt;
        if(o.age>=o.life){ targets.splice(i,1); lives--; api.sfx('bad'); api.vibrate(60); info(); if(lives<=0){ api.end(score,{ title:'Trop lent !', msg:hits+' cibles touchées.' }); return; } } }
      pops.forEach(p=>{ p.t += dt; }); pops = pops.filter(p=>p.t<.5);
      g.fillStyle = '#12202f'; g.fillRect(0,0,W,H);
      targets.forEach(o=>{ const k = 1-o.age/o.life; [['#fff',1],['#ef4444',.72],['#fff',.45],['#ef4444',.2]].forEach(([col,f])=>{ g.fillStyle = col; g.beginPath(); g.arc(o.x,o.y,o.r*f,0,TAU); g.fill(); }); g.strokeStyle = '#ffd166'; g.lineWidth = 4; g.beginPath(); g.arc(o.x,o.y,o.r+7,-Math.PI/2,-Math.PI/2+TAU*k); g.stroke(); });
      pops.forEach(p=>{ g.fillStyle = `rgba(255,209,102,${1-p.t*2})`; g.font = '800 22px sans-serif'; g.textAlign = 'center'; g.fillText('+'+p.pts,p.x,p.y-20-p.t*40); });
    });
    SCCG.lab._cibles = { targets:()=>targets };
    info();
  }
});

/* ---------------------------------------------------------- CHRONO PRÉCIS */
R({ id:'chrono', name:'Chrono précis', emoji:'⏱️', cat:'Réflexes', hue:40,
  desc:'Arrête le chrono pile à l\'heure demandée.',
  how:"On te donne un temps cible (par exemple 7,00 secondes). Le chrono démarre mais disparaît au bout d'une seconde ! Touche l'écran quand tu penses que le temps cible est écoulé. Plus tu es proche, plus tu marques (jusqu'à 100 points par manche). 5 manches.",
  create(api){
    let round = 0, target = 0, running = false, t0 = 0, score = 0, shown = true;
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    const big = el('div','g-big-text'); big.style.fontSize = '64px'; const msg = el('div','g-q'); const btn = el('button','g-cell'); btn.style.cssText = 'width:min(70vw,260px);height:min(70vw,260px);border-radius:50%;font-size:24px;background:radial-gradient(circle at 35% 30%,#ffb26b,#c0511f);padding:10px;';
    wrap.appendChild(msg); wrap.appendChild(big); wrap.appendChild(btn);
    const TARGETS = [3,5,7,8,10,12];
    function newRound(){
      round++; target = pick(TARGETS)+pick([0,0,.5]); running = false; shown = true; big.textContent = '0.00'; msg.textContent = 'Manche '+round+'/5 — vise '+target.toFixed(2)+' s'; btn.textContent = 'DÉMARRER'; api.setInfo('Manche '+round+'/5');
    }
    function press(e){
      e.preventDefault(); if(api.ended) return;
      if(!running){ running = true; t0 = performance.now(); btn.textContent = 'STOP !'; api.sfx('tap'); return; }
      const t = (performance.now()-t0)/1000; running = false; const err = Math.abs(t-target), pts = Math.max(0,Math.round(100-err*60));
      score += pts; api.setScore(score); big.textContent = t.toFixed(2); big.style.color = '#F2B84B';
      msg.textContent = err<.05 ? '🎯 Parfait ! +'+pts : err<.3 ? 'Très proche ('+(t>target?'+':'−')+err.toFixed(2)+' s) +'+pts : 'Écart : '+err.toFixed(2)+' s → +'+pts; api.sfx(pts>80 ? 'win' : pts>40 ? 'good' : 'bad'); btn.textContent = '…';
      api.after(1700,()=>{ big.style.color = ''; if(round>=5) api.end(score,{ win:score>=350, title:'Concours terminé !', msg:'Score sur 500.' }); else newRound(); });
    }
    api.on(btn,'pointerdown',press); api.onKey(k=>{ if(k==='space'||k==='enter') press({ preventDefault(){} }); });
    api.every(50,()=>{ if(!running) return; const t = (performance.now()-t0)/1000; if(t<1.2) big.textContent = t.toFixed(2); else if(shown){ shown = false; big.textContent = '?.??'; } });
    SCCG.lab._chrono = { target:()=>target, running:()=>running };
    api.setScore(0); newRound();
  }
});

/* ---------------------------------------------------------- MAIN SÛRE */
R({ id:'mainsure', name:'Main sûre', emoji:'✋', cat:'Réflexes', hue:200,
  desc:'Suis le couloir sans jamais en toucher les bords.',
  how:"Pose ton doigt sur le point de départ 🟢 en bas, puis glisse-le jusqu'en haut en restant DANS le couloir. Si tu touches le bord, tu perds une vie et tu recommences (3 vies). Chaque niveau, le couloir est plus étroit et plus sinueux. Tu as 40 secondes par niveau !",
  create(api){
    const W = 320, H = 480, c = api.canvas(W,H), g = c.g;
    let level = 0, amp, freq, phase, wid, tLeft = 40, lives = 3, score = 0, active = false, fp = null, prog = 0, flash = 0;
    const cx = y=> 160+Math.sin(y*freq+phase)*amp*Math.min(1,(H-y)/120)*Math.min(1,y/80+.3);
    function load(){ level++; amp = Math.min(100,45+level*9); freq = .018+level*.0014; phase = rndf(0,TAU); wid = Math.max(34,70-level*4); tLeft = 40; active = false; fp = null; prog = 0; info(); }
    const info = ()=> api.setInfo('Niveau '+level+' • '+'❤️'.repeat(lives)+' • ⏱️ '+Math.max(0,Math.ceil(tLeft))+' s');
    function hurt(){
      active = false; fp = null; prog = 0; lives--; flash = .35; api.sfx('boom'); api.vibrate(120); info();
      if(lives<=0) api.end(score,{ title:'Plus de vies !', msg:(level-1)+' niveau(x) réussi(s).' });
    }
    api.on(api.root,'pointerdown',e=>{ if(api.ended) return; const p = c.pos(e); if(Math.hypot(p.x-cx(H-24),p.y-(H-24))<46){ active = true; fp = p; prog = 0; api.sfx('tap'); } });
    api.on(api.root,'pointermove',e=>{
      if(!active||api.ended) return; const p = c.pos(e); fp = p;
      if(p.y>H || Math.abs(p.x-cx(p.y))>wid/2-1){ hurt(); return; }
      prog = Math.max(prog,(H-p.y)/H);
      if(p.y<26){ active = false; score += 100+Math.round(tLeft); api.setScore(score); api.sfx('win'); api.toast('Niveau réussi ! +'+(100+Math.round(tLeft))); api.after(800,load); }
    });
    api.on(window,'pointerup',()=>{ if(active){ active = false; fp = null; prog = 0; } });
    api.every(100,()=>{ tLeft -= .1; info(); if(tLeft<=0) api.end(score,{ title:'Temps écoulé !', msg:(level-1)+' niveau(x) réussi(s).' }); });
    api.loop(dt=>{
      if(flash>0) flash -= dt;
      g.fillStyle = flash>0 ? '#4a1010' : '#0f1a2a'; g.fillRect(0,0,W,H);
      g.strokeStyle = '#334a68'; g.lineWidth = wid+10; g.lineCap = 'round'; g.beginPath(); for(let y=H;y>=0;y-=4){ if(y===H) g.moveTo(cx(y),y); else g.lineTo(cx(y),y); } g.stroke();
      g.strokeStyle = '#1b2d47'; g.lineWidth = wid; g.beginPath(); for(let y=H;y>=0;y-=4){ if(y===H) g.moveTo(cx(y),y); else g.lineTo(cx(y),y); } g.stroke();
      g.fillStyle = '#2f8f5f'; g.beginPath(); g.arc(cx(H-24),H-24,16,0,TAU); g.fill(); g.fillStyle = '#fff'; g.font = '700 11px sans-serif'; g.textAlign = 'center'; g.fillText('DÉPART',cx(H-24),H-46);
      g.fillStyle = '#ffd166'; g.fillRect(cx(10)-wid/2,6,wid,8); g.fillStyle = '#fff'; g.fillText('ARRIVÉE',cx(10),30);
      if(fp){ g.fillStyle = '#7fe0b3'; g.beginPath(); g.arc(fp.x,fp.y,8,0,TAU); g.fill(); }
    });
    SCCG.lab._mainsure = { cx, H, level:()=>level, wid:()=>wid };
    api.setScore(0); load();
  }
});

/* ---------------------------------------------------------- TUILES PIANO */
R({ id:'piano', name:'Tuiles piano', emoji:'🎹', cat:'Réflexes', hue:270,
  desc:'Touche seulement les tuiles noires, vite !',
  how:"Des rangées de tuiles défilent vers le bas : dans chaque rangée, UNE seule tuile est noire. Touche-la avant qu'elle ne sorte de l'écran ! Si tu touches une tuile blanche ou si une noire t'échappe, c'est fini. La vitesse augmente à chaque tuile. Chaque tuile = +1 point.",
  create(api){
    const W = 320, H = 480, RHt = 120, c = api.canvas(W,H), g = c.g;
    let rows = [], off = -200, speed = 190, score = 0, dead = false, redFlash = null;
    const NOTE = [262,294,330,349,392,440,494,523];
    function addRow(){ rows.push({ col:rnd(4), done:false }); }
    for(let i=0;i<6;i++) addRow();
    function fail(msg,rowIdx,col){ if(dead) return; dead = true; redFlash = { row:rowIdx, col }; api.sfx('lose'); api.vibrate(150); api.after(500,()=>api.end(score,{ title:msg, msg:score+' tuile'+(score>1?'s':'')+'.' })); }
    function tap(e){
      if(dead||api.ended) return; const p = c.pos(e), col = Math.floor(p.x/(W/4));
      // la rangée i occupe y = H - (i+1)*RHt + off
      for(let i=0;i<rows.length;i++){ const y = H-(i+1)*RHt+off; if(p.y>=y && p.y<y+RHt){
        const r = rows[i]; if(r.done){ return; }
        if(col===r.col){ r.done = true; score++; api.setScore(score); speed = Math.min(620,190+score*5); api.tone(NOTE[score%8],.12,'triangle',.12); api.vibrate(10); }
        else fail('Mauvaise tuile !',i,col);
        return; } }
    }
    api.on(api.root,'pointerdown',tap);
    api.onKey(k=>{
      const lane = { left:0, down:1, up:2, right:3 }[k]; if(lane===undefined || dead || api.ended) return;
      const i = rows.findIndex(r=>!r.done); if(i<0) return; const r = rows[i];
      if(r.col===lane){ r.done = true; score++; api.setScore(score); speed = Math.min(620,190+score*5); api.tone(NOTE[score%8],.12,'triangle',.12); } else fail('Mauvaise tuile !',i,lane);
    });
    SCCG.lab._piano = { rows:()=>rows, off:()=>off, W, H, RHt };
    api.loop(dt=>{
      if(!dead){
        off += speed*dt;
        while(off>=RHt){ off -= RHt; const first = rows.shift(); if(!first.done){ rows.unshift(first); off += RHt; fail('Tuile manquée !',0,first.col); break; } addRow(); }
      }
      g.fillStyle = '#fff'; g.fillRect(0,0,W,H);
      for(let i=0;i<rows.length;i++){ const y = H-(i+1)*RHt+off; if(y>H||y+RHt<0) continue; const r = rows[i];
        g.fillStyle = r.done ? '#9ca3af' : '#111'; g.fillRect(r.col*(W/4)+1,y+1,W/4-2,RHt-2);
        if(redFlash && redFlash.row===i && redFlash.col!==undefined){ g.fillStyle = 'rgba(239,68,68,.8)'; g.fillRect(redFlash.col*(W/4)+1,y+1,W/4-2,RHt-2); } }
      g.strokeStyle = '#e5e7eb'; g.lineWidth = 1; for(let k=1;k<4;k++){ g.beginPath(); g.moveTo(k*W/4,0); g.lineTo(k*W/4,H); g.stroke(); }
      for(let i=0;i<rows.length;i++){ const y = H-(i+1)*RHt+off; g.beginPath(); g.moveTo(0,y); g.lineTo(W,y); g.stroke(); }
    });
    api.setScore(0);
  }
});

/* ---------------------------------------------------------- ÉCLATE-BULLES */
R({ id:'eclatebulles', name:'Éclate-bulles', emoji:'🎈', cat:'Réflexes', hue:330,
  desc:'Fais éclater les bulles qui s\'envolent.',
  how:"Des bulles montent vers le haut de l'écran : touche-les pour les faire éclater ! Les petites bulles rapportent plus. Attention aux bulles noires à pointes ⚫ : ne les touche pas ! Une bulle qui s'échappe par le haut te coûte une vie ❤️ (3 vies).",
  create(api){
    const W = 320, H = 480, c = api.canvas(W,H), g = c.g, COL = ['#f87171','#fbbf24','#34d399','#60a5fa','#a78bfa','#f472b6'];
    let bubs = [], parts = [], lives = 3, score = 0, t = 0, spT = .4;
    const info = ()=> api.setInfo('❤️'.repeat(lives));
    function spawn(){ const bad = Math.random()<Math.min(.2,.05+t*.0015), r = bad ? 26 : rndf(16,42); bubs.push({ x:rndf(r,W-r), y:H+r, r, vy:rndf(40,80)+t*1.4+(46-r), ph:rndf(0,6), col:pick(COL), bad }); }
    function hurt(){ lives--; api.sfx('bad'); api.vibrate(80); info(); if(lives<=0) api.end(score,{ title:'Plus de vies !', msg:score+' points.' }); }
    api.on(api.root,'pointerdown',e=>{
      if(api.ended) return; const p = c.pos(e);
      for(let i=bubs.length-1;i>=0;i--){ const b = bubs[i]; if(Math.hypot(p.x-b.x,p.y-b.y)<=b.r+6){
        bubs.splice(i,1); for(let k=0;k<10;k++){ const a = rndf(0,TAU); parts.push({ x:b.x, y:b.y, vx:Math.cos(a)*rndf(40,140), vy:Math.sin(a)*rndf(40,140), life:.5, col:b.bad?'#555':b.col }); }
        if(b.bad){ api.sfx('boom'); hurt(); } else { const pts = b.r<22 ? 3 : b.r<32 ? 2 : 1; score += pts; api.setScore(score); api.sfx('pop'); api.vibrate(10); }
        return; } }
    });
    api.loop(dt=>{
      t += dt; spT -= dt; if(spT<=0){ spawn(); spT = Math.max(.22,.75-t*.008); }
      for(let i=bubs.length-1;i>=0;i--){ const b = bubs[i]; b.y -= b.vy*dt; b.x += Math.sin(t*2+b.ph)*18*dt;
        if(b.y<-b.r){ bubs.splice(i,1); if(!b.bad){ hurt(); if(api.ended) return; } } }
      parts.forEach(p=>{ p.x += p.vx*dt; p.y += p.vy*dt; p.life -= dt; }); parts = parts.filter(p=>p.life>0);
      const sky = g.createLinearGradient(0,0,0,H); sky.addColorStop(0,'#38bdf8'); sky.addColorStop(1,'#e0f2fe'); g.fillStyle = sky; g.fillRect(0,0,W,H);
      bubs.forEach(b=>{
        if(b.bad){ g.fillStyle = '#222'; g.beginPath(); g.arc(b.x,b.y,b.r,0,TAU); g.fill(); g.strokeStyle = '#222'; g.lineWidth = 4; for(let k=0;k<10;k++){ const a = k/10*TAU+t; g.beginPath(); g.moveTo(b.x+Math.cos(a)*b.r,b.y+Math.sin(a)*b.r); g.lineTo(b.x+Math.cos(a)*(b.r+8),b.y+Math.sin(a)*(b.r+8)); g.stroke(); } g.fillStyle = '#fff'; g.font = '700 18px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('✖',b.x,b.y); }
        else { g.fillStyle = b.col+'cc'; g.beginPath(); g.arc(b.x,b.y,b.r,0,TAU); g.fill(); g.strokeStyle = '#ffffffaa'; g.lineWidth = 2; g.stroke(); g.fillStyle = '#ffffff99'; g.beginPath(); g.arc(b.x-b.r*.35,b.y-b.r*.35,b.r*.22,0,TAU); g.fill(); }
      });
      parts.forEach(p=>{ g.globalAlpha = clamp(p.life*2,0,1); g.fillStyle = p.col; g.beginPath(); g.arc(p.x,p.y,3,0,TAU); g.fill(); }); g.globalAlpha = 1;
    });
    SCCG.lab._eclate = { bubs:()=>bubs };
    info();
  }
});

/* ---------------------------------------------------------- PLANTATION DE CACAO (jeu de clics) */
R({ id:'cacao', name:'Plantation de cacao', emoji:'🍫', cat:'Réflexes', hue:25, scoreLabel:'Cacao récolté',
  desc:'Récolte du cacao et développe ta plantation en 3 minutes.',
  how:"Touche la cabosse 🍫 pour récolter des fèves. Avec tes fèves, achète des améliorations : de meilleurs outils, des ouvriers qui récoltent pour toi, un séchoir, un camion… Récolte le maximum de cacao en 3 minutes !",
  create(api){
    const UP = [
      { id:'machette', n:'Machette affûtée', d:'+1 fève par touche', base:15, k:1.45, tap:1 },
      { id:'ouvrier', n:'Ouvrier', d:'+1 fève / seconde', base:50, k:1.5, auto:1 },
      { id:'secheur', n:'Séchoir solaire', d:'+6 fèves / seconde', base:350, k:1.55, auto:6 },
      { id:'camion', n:'Camion de livraison', d:'+30 fèves / seconde', base:2500, k:1.6, auto:30 },
      { id:'coop', n:'Coopérative', d:'+150 fèves / seconde', base:15000, k:1.65, auto:150 }
    ];
    const lvl = {}; UP.forEach(u=>{ lvl[u.id] = 0; });
    let beans = 0, total = 0, tLeft = 180, acc = 0;
    api.scroll(true);
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    wrap.innerHTML = `<div class="g-big-text" id="cqBeans" style="font-size:36px;">0</div><div class="hint" id="cqRate" style="color:#f6efe4;margin:0;"></div>
      <button id="cqPod" class="g-cell" style="width:150px;height:150px;border-radius:50%;font-size:84px;background:radial-gradient(circle at 35% 30%,#a8672a,#5b3517);touch-action:manipulation;">🍫</button>
      <div id="cqUp" style="width:100%;"></div>`;
    const tapVal = ()=> 1+lvl.machette, rate = ()=> UP.reduce((s,u)=>s+(u.auto||0)*lvl[u.id],0), cost = u=> Math.round(u.base*Math.pow(u.k,lvl[u.id]));
    function draw(){
      wrap.querySelector('#cqBeans').textContent = fmtN(Math.floor(beans))+' 🫘'; wrap.querySelector('#cqRate').textContent = '+'+tapVal()+' par touche • +'+fmtN(rate())+' / seconde';
      wrap.querySelector('#cqUp').innerHTML = UP.map(u=>{ const cc = cost(u), ok = beans>=cc; return `<button data-u="${u.id}" class="g-ans" style="display:flex;justify-content:space-between;align-items:center;margin:4px 0;opacity:${ok?1:.55};"><span><b>${u.n}</b> (niv. ${lvl[u.id]})<br><small>${u.d}</small></span><b>${fmtN(cc)} 🫘</b></button>`; }).join('');
      api.setScore(Math.floor(total)); api.setInfo('⏱️ '+Math.max(0,Math.ceil(tLeft))+' s');
    }
    api.on(wrap,'click',e=>{
      if(api.ended) return;
      if(e.target.closest('#cqPod')){ const v = tapVal(); beans += v; total += v; api.sfx('pop'); api.vibrate(8); draw(); return; }
      const b = e.target.closest('[data-u]'); if(!b) return; const u = UP.find(x=>x.id===b.dataset.u), cc = cost(u);
      if(beans>=cc){ beans -= cc; lvl[u.id]++; api.sfx('good'); draw(); } else api.sfx('bad');
    });
    api.every(100,()=>{
      tLeft -= .1; const gain = rate()*.1; beans += gain; total += gain; acc += .1;
      if(acc>=.5){ acc = 0; draw(); }
      if(tLeft<=0) api.end(Math.floor(total),{ title:'Récolte terminée !', msg:fmtN(Math.floor(total))+' fèves récoltées au total.' });
    });
    api.setScore(0); draw();
  }
});

/* ---------------------------------------------------------- FEU TRICOLORE */
R({ id:'feu', name:'Feu tricolore', emoji:'🚦', cat:'Réflexes', hue:140,
  desc:'Touche au vert, ne touche pas au rouge.',
  how:"Un feu s'allume : si c'est VERT, touche l'écran le plus vite possible. Si c'est ROUGE, ne touche surtout pas ! Toucher au rouge ou rater un vert te coûte une vie ❤️ (3 vies). Le rythme s'accélère. Plus tu réagis vite, plus tu marques.",
  create(api){
    let lives = 3, score = 0, n = 0, state = 'wait', color = null, t0 = 0, cancel = null;
    const box = el('button','g-cell'); box.style.cssText = 'width:min(70vw,280px);height:min(70vw,280px);border-radius:50%;background:#1f2937;font-size:22px;padding:10px;'; api.root.appendChild(box);
    const info = ()=> api.setInfo('❤️'.repeat(lives));
    function hurt(msg){ lives--; api.sfx('bad'); api.vibrate(80); api.toast(msg); info(); if(lives<=0){ api.end(score,{ title:'Plus de vies !', msg:n+' bonne'+(n>1?'s':'')+' réaction'+(n>1?'s':'')+'.' }); return true; } return false; }
    function next(){
      state = 'wait'; color = null; box.style.background = '#1f2937'; box.textContent = '';
      cancel = api.after(rndf(450,1300)*Math.max(.55,1-n*.02),()=>{
        color = Math.random()<.65 ? 'green' : 'red'; state = 'show'; t0 = performance.now(); box.style.background = color==='green' ? '#16a34a' : '#dc2626'; box.textContent = color==='green' ? 'VERT' : 'ROUGE';
        const win = Math.max(520,1050-n*18);
        cancel = api.after(win,()=>{
          if(state!=='show') return; state = 'wait';
          if(color==='green'){ if(hurt('Trop lent !')) return; } else { n++; score += 5; api.setScore(score); api.sfx('good'); }
          next();
        });
      });
    }
    function press(e){
      e.preventDefault(); if(api.ended) return;
      if(state==='show'){
        if(cancel) cancel(); state = 'wait';
        if(color==='green'){ const ms = performance.now()-t0, pts = Math.max(5,Math.round(30-ms/40)); n++; score += pts; api.setScore(score); api.sfx('good'); api.toast(Math.round(ms)+' ms +'+pts); next(); }
        else { if(hurt('Il fallait attendre !')) return; next(); }
      } else if(state==='wait'){ if(cancel) cancel(); if(hurt('Trop tôt !')) return; next(); }
    }
    api.on(box,'pointerdown',press); api.onKey(k=>{ if(k==='space'||k==='enter') press({ preventDefault(){} }); });
    SCCG.lab._feu = { state:()=>state, color:()=>color };
    api.setScore(0); info(); box.textContent = 'Prépare-toi…'; api.after(1100,next);
  }
});

/* ---------------------------------------------------------- PÊCHE */
R({ id:'peche', name:'Pêche', emoji:'🎣', cat:'Réflexes', hue:200,
  desc:'Lance ta ligne au bon moment pour attraper les poissons.',
  how:"Le crochet se balance de gauche à droite. Touche l'écran pour lâcher la ligne : elle descend tout droit et remonte avec ce qu'elle a accroché. Les gros poissons et les poissons dorés rapportent plus. Évite les vieilles bottes 👢 ! Tu as 60 secondes.",
  create(api){
    const W = 320, H = 480, WY = 90, c = api.canvas(W,H), g = c.g;
    let fish = [], hook = { x:160, y:WY, state:'swing', caught:null, dir:1 }, score = 0, tLeft = 60, t = 0, msg = null;
    const KINDS = [ { e:'🐟', v:10, sz:30, sp:70, w:3 }, { e:'🐠', v:20, sz:34, sp:55, w:2 }, { e:'🐡', v:30, sz:40, sp:40, w:1.2 }, { e:'🦈', v:50, sz:52, sp:60, w:.6 }, { e:'👢', v:-15, sz:30, sp:35, w:1 }, { e:'🌟', v:100, sz:30, sp:110, w:.25 } ];
    const total = KINDS.reduce((s,k)=>s+k.w,0);
    function addFish(){ let r = Math.random()*total, k = KINDS[0]; for(const x of KINDS){ if(r<x.w){ k = x; break; } r -= x.w; } const dir = Math.random()<.5 ? 1 : -1; fish.push({ k, x:dir>0 ? -30 : W+30, y:rndf(WY+60,H-40), dir, ph:rndf(0,6) }); }
    for(let i=0;i<7;i++){ addFish(); fish[i].x = rndf(20,W-20); }
    function drop(){ if(hook.state!=='swing'||api.ended) return; hook.state = 'down'; api.sfx('jump'); }
    api.on(api.root,'pointerdown',drop); api.onKey(k=>{ if(k==='space'||k==='down') drop(); });
    api.every(100,()=>{ tLeft -= .1; api.setInfo('⏱️ '+Math.max(0,Math.ceil(tLeft))+' s'); if(tLeft<=0) api.end(score,{ title:'Temps écoulé !', msg:'Belle pêche !' }); });
    api.loop(dt=>{
      t += dt; if(fish.length<9 && Math.random()<dt*1.6) addFish();
      fish.forEach(f=>{ f.x += f.dir*f.k.sp*dt; f.y += Math.sin(t*2+f.ph)*8*dt; }); fish = fish.filter(f=>f.x>-60&&f.x<W+60);
      if(hook.state==='swing'){ hook.x = 160+Math.sin(t*1.7)*120; hook.y = WY; }
      else if(hook.state==='down'){
        hook.y += 330*dt;
        for(const f of fish){ if(Math.abs(f.x-hook.x)<f.k.sz*.5+4 && Math.abs(f.y-hook.y)<f.k.sz*.5+6){ hook.caught = f; fish = fish.filter(x=>x!==f); hook.state = 'up'; api.sfx(f.k.v>0 ? 'good' : 'bad'); break; } }
        if(hook.y>=H-10 && hook.state==='down') hook.state = 'up';
      } else if(hook.state==='up'){
        hook.y -= (hook.caught ? 240 : 380)*dt; if(hook.caught){ hook.caught.x = hook.x; hook.caught.y = hook.y+18; }
        if(hook.y<=WY){ hook.y = WY; if(hook.caught){ const v = hook.caught.k.v; score = Math.max(0,score+v); api.setScore(score); msg = { t:.8, txt:(v>0?'+':'')+v }; if(v>=50) api.sfx('win'); hook.caught = null; } hook.state = 'swing'; }
      }
      if(msg){ msg.t -= dt; if(msg.t<=0) msg = null; }
      const sky = g.createLinearGradient(0,0,0,WY); sky.addColorStop(0,'#fde68a'); sky.addColorStop(1,'#bae6fd'); g.fillStyle = sky; g.fillRect(0,0,W,WY);
      const sea = g.createLinearGradient(0,WY,0,H); sea.addColorStop(0,'#38bdf8'); sea.addColorStop(1,'#0c4a6e'); g.fillStyle = sea; g.fillRect(0,WY,W,H-WY);
      g.fillStyle = '#fff'; emoji(g,'🚤',hook.x,WY-16,40);
      g.strokeStyle = '#fff'; g.lineWidth = 2; g.beginPath(); g.moveTo(hook.x,WY); g.lineTo(hook.x,hook.y); g.stroke();
      fish.forEach(f=>{ g.save(); g.translate(f.x,f.y); if(f.dir>0 && f.k.e!=='👢' && f.k.e!=='🌟') g.scale(-1,1); g.fillStyle = '#fff'; emoji(g,f.k.e,0,0,f.k.sz); g.restore(); });
      if(hook.caught){ g.fillStyle = '#fff'; emoji(g,hook.caught.k.e,hook.x,hook.y+18,hook.caught.k.sz); }
      g.fillStyle = '#e5e7eb'; g.beginPath(); g.arc(hook.x,hook.y+3,5,0,Math.PI); g.stroke();
      if(msg){ g.fillStyle = '#fff'; g.font = '800 26px sans-serif'; g.textAlign = 'center'; g.fillText(msg.txt,hook.x,WY-48-(1-msg.t)*20); }
    });
    SCCG.lab._peche = { fish:()=>fish, hook:()=>hook };
    api.setScore(0);
  }
});
})();

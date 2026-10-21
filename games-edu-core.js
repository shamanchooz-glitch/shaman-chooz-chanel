/* ==========================================================
   LOT ÉDUCATIF — MOTEUR COMMUN (à charger AVANT games-edu1.js … games-edu5.js)
   Il fournit les « mécaniques » de jeu réutilisables : quiz, vrai/faux,
   associations, classement dans l'ordre, tri par catégories, réponse écrite,
   plus grand / plus petit, calcul rapide, mémoire, mots mélangés, dactylo,
   binaire, couleurs, monnaie FCFA…
   Chaque jeu des fichiers games-edu1..5.js n'est qu'une petite ligne de
   données branchée sur une de ces mécaniques. Aucune clé API, tout tourne
   dans le téléphone du joueur.
   ========================================================== */
(function(){
'use strict';
if(!window.SCCG){ console.warn('games-edu-core : le moteur de jeux (games-core.js) est absent.'); return; }
const U = SCCG.util, rnd = U.rnd, shuffle = U.shuffle, pick = U.pick, el = U.el, esc = U.esc;

/* ---------- Nouvelles catégories (ajoutées au filtre de la salle de jeux) ---------- */
['Géographie','Sciences','Culture','Maths & logique','Langue & mots','Métiers & carrière','Argent & vie pratique','Santé & nature','Numérique','Détente']
  .forEach(c=>{ if(U.CATS.indexOf(c) < 0) U.CATS.push(c); });

/* ---------- Petit style propre à ce lot (injecté ici : pas de fichier CSS en plus) ---------- */
(function(){
  if(document.getElementById('edu-css')) return;
  const st = document.createElement('style'); st.id = 'edu-css';
  st.textContent = `
.ed-exp{ width:100%; background:rgba(242,184,75,.14); border:1px solid rgba(242,184,75,.4); border-radius:12px; padding:9px 12px; font-size:13.5px; line-height:1.4; color:#ffe3a3; }
.ed-next{ width:100%; padding:11px; border-radius:12px; border:none; background:#F2B84B; color:#2a1f0e; font-weight:800; font-size:15px; cursor:pointer; touch-action:manipulation; }
.ed-head{ color:#f6efe4; margin:0; font-size:13px; opacity:.9; }
.ed-pairs{ display:grid; grid-template-columns:1fr 1fr; gap:8px; width:100%; max-width:440px; }
.ed-pcol{ display:flex; flex-direction:column; gap:7px; }
.ed-pb{ padding:10px 7px; border-radius:12px; border:2px solid rgba(255,255,255,.16); background:rgba(255,255,255,.08); color:#fff; font-size:13.5px; font-weight:700; min-height:48px; cursor:pointer; touch-action:manipulation; line-height:1.25; }
.ed-pb.sel{ border-color:#F2B84B; background:rgba(242,184,75,.22); }
.ed-pb.ok{ background:#2f8f5f; border-color:#7fe0b3; opacity:.5; pointer-events:none; }
.ed-pb.ko{ animation:gShake .3s; border-color:#ff9c8f; }
.ed-items{ display:flex; flex-wrap:wrap; gap:8px; justify-content:center; width:100%; }
.ed-item{ padding:11px 14px; border-radius:12px; border:2px solid rgba(255,255,255,.18); background:rgba(255,255,255,.09); color:#fff; font-size:15px; font-weight:800; cursor:pointer; touch-action:manipulation; }
.ed-item.used{ opacity:.25; pointer-events:none; }
.ed-item.ko{ animation:gShake .3s; border-color:#ff9c8f; }
.ed-slots{ display:flex; flex-direction:column; gap:5px; width:100%; max-width:380px; }
.ed-slot{ min-height:34px; border-radius:10px; border:2px dashed rgba(255,255,255,.2); padding:6px 10px; font-weight:800; font-size:14px; display:flex; gap:8px; align-items:center; }
.ed-slot.full{ border-style:solid; border-color:#7fe0b3; background:rgba(47,143,95,.3); }
.ed-slot b{ opacity:.6; width:18px; }
.ed-card{ width:100%; max-width:360px; min-height:120px; display:flex; align-items:center; justify-content:center; text-align:center; padding:16px; border-radius:18px; background:rgba(255,255,255,.1); border:2px solid rgba(255,255,255,.2); font-size:24px; font-weight:800; line-height:1.25; }
.ed-bins{ display:grid; gap:8px; width:100%; max-width:420px; }
.ed-bin{ padding:14px 8px; border-radius:14px; border:2px solid rgba(255,255,255,.2); background:rgba(255,255,255,.09); color:#fff; font-size:15px; font-weight:800; cursor:pointer; touch-action:manipulation; }
.ed-bin.ok{ background:#2f8f5f; border-color:#7fe0b3; } .ed-bin.ko{ background:#a8372b; border-color:#ff9c8f; }
.ed-vs{ display:grid; grid-template-columns:1fr 1fr; gap:10px; width:100%; max-width:420px; }
.ed-vb{ padding:18px 8px; border-radius:16px; border:2px solid rgba(255,255,255,.2); background:rgba(255,255,255,.09); color:#fff; font-weight:800; font-size:17px; cursor:pointer; touch-action:manipulation; display:flex; flex-direction:column; gap:6px; align-items:center; line-height:1.2; }
.ed-vb span{ font-size:34px; } .ed-vb small{ font-size:13px; opacity:.95; min-height:16px; color:#ffe3a3; }
.ed-vb.ok{ background:#2f8f5f; border-color:#7fe0b3; } .ed-vb.ko{ background:#a8372b; border-color:#ff9c8f; }
.ed-mem{ display:grid; grid-template-columns:repeat(4,1fr); gap:7px; width:100%; max-width:400px; }
.ed-mc{ aspect-ratio:1/1; border-radius:12px; border:none; background:linear-gradient(135deg,#6c4bd1,#3a2a7a); color:#fff; font-size:12.5px; font-weight:800; padding:3px; cursor:pointer; touch-action:manipulation; line-height:1.15; display:flex; align-items:center; justify-content:center; text-align:center; overflow:hidden; }
.ed-mc.up{ background:#f6efe4; color:#2a1f0e; } .ed-mc.up.big{ font-size:26px; }
.ed-mc.done{ background:#2f8f5f; color:#fff; pointer-events:none; }
.ed-tiles{ display:flex; flex-wrap:wrap; gap:7px; justify-content:center; }
.ed-tile{ width:44px; height:48px; border-radius:11px; border:none; background:#F2B84B; color:#2a1f0e; font-size:22px; font-weight:800; cursor:pointer; touch-action:manipulation; }
.ed-tile.used{ opacity:.2; pointer-events:none; }
.ed-ans-slots{ display:flex; gap:5px; justify-content:center; flex-wrap:wrap; }
.ed-as{ width:36px; height:42px; border-radius:9px; border-bottom:3px solid rgba(255,255,255,.4); font-size:22px; font-weight:800; display:flex; align-items:center; justify-content:center; }
.ed-in{ width:100%; padding:13px; border-radius:12px; border:2px solid rgba(255,255,255,.25); background:rgba(255,255,255,.1); color:#fff; font-size:18px; font-weight:700; text-align:center; outline:none; }
.ed-row2{ display:flex; gap:8px; width:100%; }
.ed-btn2{ flex:1; padding:12px 8px; border-radius:12px; border:2px solid rgba(255,255,255,.2); background:rgba(255,255,255,.09); color:#fff; font-weight:800; font-size:14px; cursor:pointer; touch-action:manipulation; }
.ed-btn2.pri{ background:#F2B84B; border-color:#F2B84B; color:#2a1f0e; }
.ed-coins{ display:flex; flex-wrap:wrap; gap:8px; justify-content:center; width:100%; }
.ed-coin{ min-width:64px; padding:10px 8px; border-radius:12px; border:2px solid rgba(255,255,255,.25); font-weight:800; font-size:14px; color:#fff; cursor:pointer; touch-action:manipulation; background:rgba(255,255,255,.1); }
.ed-coin.bill{ background:linear-gradient(135deg,#3a7d5c,#245a40); border-color:#7fe0b3; min-width:84px; }
.ed-bits{ display:grid; grid-template-columns:repeat(4,1fr); gap:8px; width:100%; max-width:380px; }
.ed-bit{ padding:12px 4px; border-radius:14px; border:2px solid rgba(255,255,255,.2); background:rgba(255,255,255,.08); color:#fff; font-weight:800; font-size:26px; cursor:pointer; display:flex; flex-direction:column; align-items:center; touch-action:manipulation; }
.ed-bit small{ font-size:11px; opacity:.7; } .ed-bit.on{ background:#F2B84B; color:#2a1f0e; border-color:#F2B84B; }
.ed-sw{ width:100%; height:70px; border-radius:14px; border:2px solid rgba(255,255,255,.3); }
.ed-sl{ width:100%; display:flex; align-items:center; gap:8px; font-weight:800; font-size:14px; }
.ed-sl input{ flex:1; }
.ed-type{ width:100%; font-size:18px; line-height:1.55; padding:12px; border-radius:14px; background:rgba(255,255,255,.08); word-break:break-word; }
.ed-type .ok{ color:#7fe0b3; } .ed-type .ko{ color:#ff9c8f; text-decoration:underline; } .ed-type .cur{ background:rgba(242,184,75,.35); border-radius:3px; }
`;
  document.head.appendChild(st);
})();

const EDU = window.EDU = {};
const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const lev = (a,b)=>{ const m=[]; for(let i=0;i<=a.length;i++){ m[i]=[i]; } for(let j=1;j<=b.length;j++) m[0][j]=j;
  for(let i=1;i<=a.length;i++) for(let j=1;j<=b.length;j++) m[i][j] = Math.min(m[i-1][j]+1, m[i][j-1]+1, m[i-1][j-1]+(a[i-1]===b[j-1]?0:1)); return m[a.length][b.length]; };
EDU.norm = norm;

/* ---------- Enregistrement d'un jeu : G(id, nom, emoji, catégorie, teinte, description, mécanique) ---------- */
EDU.G = function(id, name, emoji, cat, hue, desc, fn, extra){
  extra = extra || {};
  const d = { id, name, emoji, cat, hue, desc, how: extra.how || fn.how || desc, create: fn, isNew: true };
  if(fn.noTranslate || extra.translate === false) d.translate = false; else d.translate = true;
  if(fn.scoreLabel) d.scoreLabel = fn.scoreLabel;
  if(extra.scoreLabel) d.scoreLabel = extra.scoreLabel;
  if(SCCG.games.some(g=>g.id === id)){ console.warn('Jeu en double ignoré :', id); return; }
  SCCG.register(d);
};
const withHow = (fn, how, o)=>{ fn.how = how; if(o) Object.assign(fn, o); return fn; };

/* ---------- Bavardage d'encouragement ---------- */
const praise = (good,n)=>{ const r = good/n; return r>=1 ? 'Parfait, sans aucune faute ! 🌟' : r>=.8 ? 'Excellent, tu maîtrises le sujet ! 👏' : r>=.6 ? 'Très bien, continue comme ça ! 💪' : r>=.4 ? 'Pas mal ! Rejoue pour progresser. 📚' : 'Bon début : chaque partie te fait apprendre quelque chose. 🌱'; };

/* ==========================================================
   1. QUIZ (QCM) — aussi utilisé pour vrai/faux, orthographe, intrus…
   Format d'une question : [question, bonne réponse, mauvaise 1, mauvaise 2, …, '~explication (facultative)']
   ========================================================== */
EDU.quizItems = function(bank){
  return bank.map(a=>{
    const exp = a.find((x,i)=> i>0 && typeof x==='string' && x[0]==='~');
    const opts = a.slice(1).filter(x=> !(typeof x==='string' && x[0]==='~'));
    return { q:a[0], c:opts[0], opts, exp: exp ? exp.slice(1) : '' };
  });
};
EDU.quiz = function(bank, o){
  o = o || {};
  const items = EDU.quizItems(bank);
  return withHow(function(api){
    api.scroll(true);
    const N = Math.min(o.n || 10, items.length), T = (o.time || 15) * 1000;
    const qs = shuffle(items).slice(0, N).map(it=>({ q:it.q, c:it.c, exp:it.exp, opts: o.fixed ? it.opts.slice() : shuffle(it.opts) }));
    let i = 0, score = 0, good = 0, tLeft = T, locked = false, advanced = false, cancel = null;
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    function show(){
      const q = qs[i]; locked = false; advanced = false; tLeft = T;
      wrap.innerHTML = `<p class="ed-head">Question ${i+1} / ${qs.length}</p><div class="g-bar"><i id="qbar"></i></div>${o.pre ? `<div class="ed-head">${esc(o.pre)}</div>` : ''}<div class="g-q">${esc(q.q)}</div>` +
        q.opts.map((x,k)=>`<button class="g-ans" data-k="${k}">${esc(x)}</button>`).join('');
      api.setInfo(good + ' ✓');
    }
    function reveal(k){
      const q = qs[i];
      wrap.querySelectorAll('.g-ans').forEach((b,j)=>{ if(q.opts[j] === q.c) b.classList.add('ok'); else if(j === k) b.classList.add('ko'); });
      if(q.exp){ const d = el('div','ed-exp','💡 ' + esc(q.exp)); wrap.appendChild(d); }
      const nb = el('button','ed-next', i+1 >= qs.length ? 'Voir mon résultat ▶' : 'Suivant ▶'); nb.dataset.n = '1'; wrap.appendChild(nb);
    }
    function next(){
      if(advanced) return; advanced = true; if(cancel){ cancel(); cancel = null; }
      i++; if(i >= qs.length) api.end(score, { win: good >= Math.ceil(N*.7), title: good + ' / ' + N + ' bonnes réponses', msg: praise(good, N) }); else show();
    }
    function answer(k){
      if(locked || api.ended) return; locked = true; const ok = qs[i].opts[k] === qs[i].c; reveal(k);
      if(ok){ good++; score += 100 + Math.ceil(tLeft/1000) * 4; api.setScore(score); api.sfx('good'); } else api.sfx('bad');
      api.setInfo(good + ' ✓');
      cancel = api.after(qs[i].exp ? 5200 : 1500, next);
    }
    api.on(wrap,'click',e=>{ const b = e.target.closest('.g-ans'); if(b) return answer(+b.dataset.k); if(e.target.closest('[data-n]')) next(); });
    api.every(100, ()=>{
      if(locked) return; tLeft -= 100; const bar = wrap.querySelector('#qbar'); if(bar) bar.style.width = Math.max(0, tLeft/(T/100)) + '%';
      if(tLeft <= 0){ locked = true; reveal(-1); api.sfx('bad'); api.toast('Temps écoulé !'); cancel = api.after(qs[i].exp ? 5200 : 1500, next); }
    });
    show();
  }, o.how || 'Réponds aux questions : plus tu réponds vite, plus tu gagnes de points (100 points + bonus de rapidité par bonne réponse). Après chaque réponse, une petite explication t\'apprend quelque chose.');
};
/* Vrai / Faux : [affirmation, true|false, explication] */
EDU.tf = function(bank, o){
  o = o || {};
  const b = bank.map(a=>[a[0], a[1] ? 'Vrai' : 'Faux', a[1] ? 'Faux' : 'Vrai', '~' + (a[2] || '')]);
  const f = EDU.quiz(b, Object.assign({ n:12, time:12, fixed:false }, o));
  const g = function(api){ return f(api); };
  g.how = o.how || 'Une affirmation s\'affiche : est-elle vraie ou fausse ? 12 affirmations, 12 secondes chacune. Après chaque réponse, une explication t\'apprend la bonne information.';
  return g;
};
/* Orthographe / choix entre deux formes : [phrase à trou, bonne forme, autre forme, '~règle'] */
EDU.duo = function(bank, o){ return EDU.quiz(bank, Object.assign({ n:12, time:10, fixed:false, how:'Choisis la bonne forme à chaque phrase. 12 phrases, 10 secondes chacune. Une petite règle s\'affiche après chaque réponse.' }, o||{})); };
/* Intrus : [a, b, c, intrus, '~pourquoi'] — trois éléments d'une même famille + un intrus */
EDU.intrus = function(bank, o){
  const b = bank.map(a=>{ const g = a.slice(0,3), odd = a[3], exp = a[4] ? ('~'+a[4].replace(/^~/,'')) : '~'; return ['Quel est l\'intrus ?', odd].concat(g, [exp]); });
  // la question est la même : on affiche les 4 mots dans la question pour que l'intrus soit visible dans les boutons
  return EDU.quiz(b, Object.assign({ n:10, time:14, how:'Parmi quatre mots, un seul n\'appartient pas à la même famille. Trouve l\'intrus ! 10 questions, 14 secondes chacune.' }, o||{}));
};

/* ==========================================================
   2. ASSOCIATIONS : [[gauche, droite], …] — touche un élément à gauche puis son partenaire à droite
   ========================================================== */
EDU.pairs = function(bank, o){
  o = o || {};
  return withHow(function(api){
    api.scroll(true);
    const per = o.per || (bank.length >= 12 ? 6 : Math.max(3, Math.min(5, bank.length)));
    const rounds = Math.max(1, Math.min(o.rounds || 3, Math.floor(bank.length / per)));
    const all = shuffle(bank); let round = 0, score = 0, errs = 0, matched = 0, sel = null, t0 = Date.now();
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    function start(){
      const set = all.slice(round*per, round*per + per); matched = 0; sel = null;
      const L = shuffle(set.map((p,i)=>({ t:p[0], k:i }))), R = shuffle(set.map((p,i)=>({ t:p[1], k:i })));
      wrap.innerHTML = `<p class="ed-head">Manche ${round+1} / ${rounds} — relie chaque élément à son partenaire</p><div class="ed-pairs"><div class="ed-pcol" id="pl">${L.map(x=>`<button class="ed-pb" data-s="l" data-k="${x.k}">${esc(x.t)}</button>`).join('')}</div><div class="ed-pcol" id="pr">${R.map(x=>`<button class="ed-pb" data-s="r" data-k="${x.k}">${esc(x.t)}</button>`).join('')}</div></div>`;
      api.setInfo('Erreurs : ' + errs);
    }
    api.on(wrap,'click',e=>{
      const b = e.target.closest('.ed-pb'); if(!b || api.ended) return;
      const s = b.dataset.s;
      if(!sel || sel.dataset.s === s){ if(sel) sel.classList.remove('sel'); sel = b; b.classList.add('sel'); api.sfx('tap'); return; }
      const a = sel, bb = b; sel = null; a.classList.remove('sel');
      if(a.dataset.k === bb.dataset.k){
        a.classList.add('ok'); bb.classList.add('ok'); matched++; score += 100; api.setScore(score); api.sfx('good');
        if(matched >= per){
          round++;
          if(round >= rounds){ const sec = Math.round((Date.now()-t0)/1000); const bonus = Math.max(0, 300 - sec*3); score += bonus; api.setScore(score);
            api.end(score, { win: errs <= 3, title: 'Toutes les associations sont faites !', msg: errs + ' erreur' + (errs>1?'s':'') + ' • ' + sec + ' secondes (bonus de rapidité : +' + bonus + ')' }); }
          else api.after(700, start);
        }
      } else {
        errs++; score = Math.max(0, score - 30); api.setScore(score); api.sfx('bad'); api.vibrate(40); api.setInfo('Erreurs : ' + errs);
        a.classList.add('ko'); bb.classList.add('ko'); setTimeout(()=>{ a.classList.remove('ko'); bb.classList.remove('ko'); }, 350);
      }
    });
    start();
  }, o.how || 'Deux colonnes : touche un élément à gauche, puis son partenaire à droite. Chaque bonne association rapporte 100 points, chaque erreur en retire 30. Plus tu es rapide, plus tu gagnes de bonus !');
};

/* ==========================================================
   3. ORDRE : [{q:'Classe du plus petit au plus grand', items:[… dans le BON ordre …]}, …]
   ========================================================== */
EDU.order = function(sets, o){
  o = o || {};
  return withHow(function(api){
    api.scroll(true);
    const list = shuffle(sets).slice(0, Math.min(o.n || 5, sets.length));
    let si = 0, score = 0, k = 0, errs = 0, totalErr = 0;
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    function show(){
      const s = list[si]; k = 0; errs = 0;
      let order; do { order = shuffle(s.items.map((t,i)=>({ t, i }))); } while(s.items.length > 2 && order.every((x,j)=>x.i === j));
      wrap.innerHTML = `<p class="ed-head">Série ${si+1} / ${list.length}</p><div class="g-q">${esc(s.q)}</div><div class="ed-slots">${s.items.map((_,j)=>`<div class="ed-slot" id="sl${j}"><b>${j+1}.</b><span></span></div>`).join('')}</div><p class="ed-head">Touche les éléments dans le bon ordre :</p><div class="ed-items">${order.map(x=>`<button class="ed-item" data-i="${x.i}">${esc(x.t)}</button>`).join('')}</div>`;
      api.setInfo('Erreurs : ' + totalErr);
    }
    api.on(wrap,'click',e=>{
      const b = e.target.closest('.ed-item'); if(!b || api.ended) return; const i = +b.dataset.i;
      if(i === k){
        b.classList.add('used'); const sl = wrap.querySelector('#sl'+k); sl.classList.add('full'); sl.querySelector('span').textContent = list[si].items[k]; k++; api.sfx('good');
        if(k >= list[si].items.length){
          score += Math.max(20, 100 - errs*25); api.setScore(score); si++;
          if(si >= list.length) api.end(score, { win: totalErr <= 3, title: 'Bien classé !', msg: totalErr + ' erreur' + (totalErr>1?'s':'') + ' au total.' });
          else api.after(900, show);
        }
      } else { errs++; totalErr++; b.classList.add('ko'); setTimeout(()=>b.classList.remove('ko'), 350); api.sfx('bad'); api.vibrate(40); api.setInfo('Erreurs : ' + totalErr); }
    });
    show();
  }, o.how || 'Une consigne te demande de classer des éléments (du plus petit au plus grand, du plus ancien au plus récent, dans l\'ordre d\'un processus…). Touche-les un par un dans le bon ordre. 100 points par série, moins 25 par erreur.');
};

/* ==========================================================
   4. TRI : bins = ['Mammifères','Oiseaux',…] — items = [[texte, indexDuBac], …]
   ========================================================== */
EDU.sort = function(bins, items, o){
  o = o || {};
  return withHow(function(api){
    const list = shuffle(items).slice(0, Math.min(o.n || 18, items.length));
    let i = 0, score = 0, lives = 3, streak = 0, locked = false, tLeft = 0; const T = (o.time || 8) * 1000;
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    wrap.innerHTML = `<p class="ed-head" id="sp"></p><div class="g-bar"><i id="sbar"></i></div><div class="ed-card" id="scard"></div><div class="ed-bins" style="grid-template-columns:repeat(${bins.length > 3 ? 2 : bins.length},1fr)">${bins.map((b,k)=>`<button class="ed-bin" data-b="${k}">${esc(b)}</button>`).join('')}</div>`;
    const card = wrap.querySelector('#scard'), sp = wrap.querySelector('#sp'), bar = wrap.querySelector('#sbar');
    const hearts = ()=> api.setInfo('❤️'.repeat(lives));
    function show(){ locked = false; tLeft = T; card.textContent = list[i][0]; sp.textContent = 'Élément ' + (i+1) + ' / ' + list.length; wrap.querySelectorAll('.ed-bin').forEach(b=>b.classList.remove('ok','ko')); hearts(); }
    function done(ok){
      if(ok){ streak++; score += 10 + Math.min(10, streak-1)*2; api.setScore(score); api.sfx('good'); }
      else { streak = 0; lives--; api.sfx('bad'); api.vibrate(60); hearts(); }
      if(lives <= 0){ api.end(score, { title:'Plus de vies !', msg:'Tu as classé ' + (i+(ok?1:0)) + ' éléments sur ' + list.length + '.' }); return; }
      i++; if(i >= list.length){ api.end(score, { win:true, title:'Tout est classé !', msg:'Tu as gardé ' + lives + ' vie' + (lives>1?'s':'') + '.' }); return; }
      api.after(ok ? 450 : 1100, show);
    }
    api.on(wrap,'click',e=>{
      const b = e.target.closest('.ed-bin'); if(!b || locked || api.ended) return; locked = true;
      const ok = +b.dataset.b === list[i][1];
      b.classList.add(ok ? 'ok' : 'ko'); if(!ok){ const r = wrap.querySelector('.ed-bin[data-b="'+list[i][1]+'"]'); if(r) r.classList.add('ok'); }
      done(ok);
    });
    api.every(100, ()=>{ if(locked) return; tLeft -= 100; bar.style.width = Math.max(0, tLeft/(T/100)) + '%'; if(tLeft <= 0){ locked = true; api.toast('Trop lent !'); const r = wrap.querySelector('.ed-bin[data-b="'+list[i][1]+'"]'); if(r) r.classList.add('ok'); done(false); } });
    show();
  }, o.how || 'Un élément apparaît : touche vite la bonne catégorie ! Tu as 3 vies ❤️ et quelques secondes par élément. Les bonnes réponses d\'affilée rapportent des points bonus.');
};

/* ==========================================================
   5. RÉPONSE ÉCRITE : [[question, réponse, autre réponse acceptée…], …]
   ========================================================== */
EDU.type = function(bank, o){
  o = o || {};
  return withHow(function(api){
    api.scroll(true);
    const qs = shuffle(bank).slice(0, Math.min(o.n || 10, bank.length)); const T = (o.time || 25) * 1000;
    let i = 0, score = 0, good = 0, tLeft = T, locked = false, hint = false;
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    wrap.innerHTML = `<p class="ed-head" id="tp"></p><div class="g-bar"><i id="tbar"></i></div><div class="g-q" id="tq"></div><div id="th" class="ed-head" style="min-height:18px;font-size:16px;letter-spacing:2px;"></div><input class="ed-in" id="tin" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Ta réponse…"><div class="ed-row2"><button class="ed-btn2" id="thint">💡 Indice</button><button class="ed-btn2 pri" id="tok">Valider ✓</button></div><div id="tfb"></div>`;
    const inp = wrap.querySelector('#tin'), tq = wrap.querySelector('#tq'), tfb = wrap.querySelector('#tfb'), th = wrap.querySelector('#th');
    function show(){ locked = false; hint = false; tLeft = T; inp.value = ''; inp.disabled = false; tfb.innerHTML = ''; th.textContent = ''; tq.textContent = qs[i][0]; wrap.querySelector('#tp').textContent = 'Question ' + (i+1) + ' / ' + qs.length; api.setInfo(good + ' ✓'); try{ inp.focus(); }catch(e){} }
    function accept(v, q){
      const x = norm(v); if(!x) return false;
      return q.slice(1).some(a=>{ const y = norm(a); return x === y || (y.length >= 6 && lev(x,y) <= 1); });
    }
    function finish(ok, timeout){
      locked = true; inp.disabled = true;
      if(ok){ good++; const pts = Math.round((100 + Math.ceil(tLeft/1000)*3) * (hint ? .5 : 1)); score += pts; api.setScore(score); api.sfx('good'); tfb.innerHTML = '<div class="ed-exp" style="background:rgba(47,143,95,.3);color:#d6ffe9;">✅ Bravo ! +' + pts + ' points</div>'; }
      else { api.sfx('bad'); tfb.innerHTML = '<div class="ed-exp">' + (timeout ? '⏱️ Temps écoulé. ' : '❌ Pas tout à fait. ') + 'Réponse : <b>' + esc(qs[i][1]) + '</b></div>'; }
      api.after(ok ? 1100 : 2200, ()=>{ i++; if(i >= qs.length) api.end(score, { win: good >= Math.ceil(qs.length*.7), title: good + ' / ' + qs.length + ' bonnes réponses', msg: praise(good, qs.length) }); else show(); });
    }
    const submit = ()=>{ if(locked || api.ended) return; finish(accept(inp.value, qs[i]), false); };
    api.on(wrap.querySelector('#tok'),'click', submit);
    api.on(inp,'keydown', e=>{ if(e.key === 'Enter'){ e.preventDefault(); submit(); } });
    api.on(wrap.querySelector('#thint'),'click', ()=>{ if(locked) return; hint = true; const a = qs[i][1]; th.textContent = a[0].toUpperCase() + ' ' + a.slice(1).replace(/[^\s'-]/g,'_ ').trim() + '  (' + a.length + ' lettres)'; });
    api.every(100, ()=>{ if(locked) return; tLeft -= 100; wrap.querySelector('#tbar').style.width = Math.max(0, tLeft/(T/100)) + '%'; if(tLeft <= 0) finish(false, true); });
    show();
  }, o.how || 'Écris la réponse au clavier (les accents et les majuscules n\'ont pas d\'importance, une petite faute de frappe est tolérée). Le bouton Indice montre la première lettre mais divise les points par deux.', { noTranslate:true });
};

/* ==========================================================
   6. PLUS GRAND / PLUS PETIT : items = [[nom, valeur, emoji]], o = {ask:'Lequel est le plus haut ?', unit:' m', big:true}
   ========================================================== */
EDU.versus = function(items, o){
  o = o || {};
  const fmt = v => Number(v).toLocaleString('fr-FR') + (o.unit || '');
  return withHow(function(api){
    let lives = 3, score = 0, good = 0, a, b, locked = false, last = null;
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    function round(){
      locked = false;
      let tries = 0; do { a = pick(items); b = pick(items); tries++; } while((a === b || a[1] === b[1] || (last && (a[0] === last || b[0] === last) && tries < 6)) && tries < 40);
      wrap.innerHTML = `<div class="g-q">${esc(o.ask || 'Lequel est le plus grand ?')}</div><div class="ed-vs">${[a,b].map((x,k)=>`<button class="ed-vb" data-k="${k}"><span>${x[2] || '❓'}</span>${esc(x[0])}<small></small></button>`).join('')}</div>`;
      api.setInfo('❤️'.repeat(lives));
    }
    api.on(wrap,'click',e=>{
      const btn = e.target.closest('.ed-vb'); if(!btn || locked || api.ended) return; locked = true;
      const k = +btn.dataset.k, win = (o.small ? (a[1] < b[1]) : (a[1] > b[1])) ? 0 : 1, bs = wrap.querySelectorAll('.ed-vb');
      bs[0].querySelector('small').textContent = fmt(a[1]); bs[1].querySelector('small').textContent = fmt(b[1]);
      bs[win].classList.add('ok'); last = (win ? b : a)[0];
      if(k === win){ good++; score += 10 + Math.min(good, 20); api.setScore(score); api.sfx('good'); }
      else { bs[k].classList.add('ko'); lives--; api.sfx('bad'); api.vibrate(50); api.setInfo('❤️'.repeat(lives)); }
      if(lives <= 0){ api.after(1300, ()=> api.end(score, { title:'Fin de la partie', msg: good + ' bonnes réponses.' })); return; }
      if(good >= 30){ api.after(1300, ()=> api.end(score, { win:true, title:'Quelle culture !', msg:'30 bonnes réponses !' })); return; }
      api.after(1500, round);
    });
    round();
  }, o.how || 'Deux éléments s\'affichent : touche celui qui répond à la question. Tu as 3 vies ❤️. Les valeurs sont des ordres de grandeur arrondis.');
};

/* ==========================================================
   7. CALCUL / QUESTIONS GÉNÉRÉES : gen(niveau) → { q, a, opts?, draw?(ctx,w,h) }
   mode 'numpad' (clavier numérique) ou 'choice' (boutons)
   ========================================================== */
EDU.numOpts = function(a, step, n){
  n = n || 4; step = step || Math.max(1, Math.round(Math.abs(a) * .1));
  const s = new Set([a]); let guard = 0;
  while(s.size < n && guard++ < 60){ const d = (rnd(4)+1) * step * (rnd(2) ? 1 : -1); const v = a + d; if(v >= 0 || a < 0) s.add(v); }
  while(s.size < n) s.add(a + s.size * step + 1);
  return shuffle(Array.from(s));
};
EDU.gen = function(gen, o){
  o = o || {}; const mode = o.mode || 'choice';
  return withHow(function(api){
    api.scroll(true);
    const T0 = o.time || 60; let time = T0, score = 0, good = 0, total = 0, cur = null, locked = false, level = 1, pad = null;
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    wrap.innerHTML = `<p class="ed-head" id="gh"></p><div class="g-bar"><i id="gbar"></i></div><div class="g-q" id="gq"></div><div id="gdraw"></div><div id="gbody" class="g-col" style="gap:8px"></div>`;
    const gq = wrap.querySelector('#gq'), gb = wrap.querySelector('#gbody'), gd = wrap.querySelector('#gdraw'), gh = wrap.querySelector('#gh'), bar = wrap.querySelector('#gbar');
    const head = ()=>{ gh.textContent = '⏱️ ' + Math.max(0, Math.ceil(time)) + ' s • Niveau ' + level + ' • ' + good + ' bonnes réponses'; bar.style.width = Math.max(0, time/(T0/100)) + '%'; };
    function next(){
      locked = false; level = Math.min(o.maxLevel || 5, 1 + Math.floor(good/4)); cur = gen(level);
      gq.style.whiteSpace = 'pre-line'; gq.textContent = cur.q; gd.innerHTML = '';
      if(cur.draw){ const cv = document.createElement('canvas'); const w = cur.w || 240, h = cur.h || 160; cv.width = w*2; cv.height = h*2; cv.style.cssText = 'width:'+w+'px;max-width:100%;height:auto;border-radius:14px;background:#f6efe4;display:block;margin:0 auto;'; const g = cv.getContext('2d'); g.scale(2,2); cur.draw(g, w, h); gd.appendChild(cv); }
      gb.innerHTML = ''; pad = null;
      if(mode === 'numpad'){ pad = numpad(api, gb, v => answer(v)); }
      else { const opts = cur.opts || EDU.numOpts(cur.a); gb.innerHTML = opts.map((x,k)=>`<button class="g-ans" data-k="${k}">${esc(String(x))}</button>`).join(''); gb._opts = opts; }
      head();
    }
    function answer(v){
      if(locked || api.ended) return; locked = true;
      const ok = mode === 'numpad' ? Number(v) === Number(cur.a) : String(v) === String(cur.a);
      total++;
      if(ok){ good++; score += 10 * level; api.setScore(score); api.sfx('good'); if(mode === 'choice'){ const bs = gb.querySelectorAll('.g-ans'); bs.forEach(b=>{ if(b.textContent === String(cur.a)) b.classList.add('ok'); }); } api.after(mode === 'choice' ? 350 : 150, next); }
      else { time -= (o.penalty || 3); api.sfx('bad'); api.vibrate(40); api.toast('Réponse : ' + cur.a); if(mode === 'choice'){ gb.querySelectorAll('.g-ans').forEach(b=>{ if(b.textContent === String(cur.a)) b.classList.add('ok'); else if(b.textContent === String(v)) b.classList.add('ko'); }); } api.after(900, next); }
      head();
    }
    api.on(gb,'click',e=>{ const b = e.target.closest('.g-ans'); if(b) answer(gb._opts[+b.dataset.k]); });
    api.every(1000, ()=>{ time -= 1; head(); if(time <= 0){ locked = true; api.end(score, { win: good >= 10, title:'Temps écoulé !', msg: good + ' bonne' + (good>1?'s':'') + ' réponse' + (good>1?'s':'') + ' sur ' + total + '. Niveau atteint : ' + level + '.' }); } });
    next();
  }, o.how || 'Réponds à un maximum de questions en 60 secondes. Chaque bonne réponse rapporte des points (de plus en plus avec le niveau), chaque erreur te fait perdre 3 secondes. Le niveau monte tous les 4 bonnes réponses.');
};
function numpad(api, wrap, onOk){
  const disp = el('div','g-big-text','…'); disp.style.minHeight = '56px';
  const pd = el('div','g-num'); ['1','2','3','4','5','6','7','8','9','⌫','0','OK'].forEach(k=>{ const b = el('button','',k); b.dataset.k = k; pd.appendChild(b); });
  let val = '';
  const press = k=>{ if(k === '⌫') val = val.slice(0,-1); else if(k === 'OK'){ if(val !== ''){ const v = val; val = ''; disp.textContent = '…'; onOk(v); } return; } else if(val.length < 8) val += k; disp.textContent = val || '…'; };
  api.on(pd,'click', e=>{ const b = e.target.closest('button'); if(b){ api.sfx('tap'); press(b.dataset.k); } });
  api.onKey((k,down)=>{ if(down === false) return; if(/^[0-9]$/.test(k)) press(k); else if(k === 'backspace') press('⌫'); else if(k === 'enter') press('OK'); });
  wrap.appendChild(disp); wrap.appendChild(pd);
}

/* ==========================================================
   8. MÉMOIRE THÉMATIQUE : [[a, b], …] (8 paires tirées au hasard) — retrouve les paires
   ========================================================== */
EDU.memo = function(bank, o){
  o = o || {};
  return withHow(function(api){
    const set = shuffle(bank).slice(0, 8);
    const cards = shuffle(set.flatMap((p,i)=>[{ t:p[0], k:i }, { t:p[1], k:i }]));
    let open = [], moves = 0, found = 0, secs = 0, lock = false;
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    wrap.innerHTML = `<p class="ed-head" id="mh"></p><div class="ed-mem">${cards.map((c,i)=>`<button class="ed-mc" data-i="${i}">❓</button>`).join('')}</div>`;
    const bs = wrap.querySelectorAll('.ed-mc'), mh = wrap.querySelector('#mh');
    const head = ()=>{ mh.textContent = 'Coups : ' + moves + ' • Paires : ' + found + ' / 8 • ' + secs + ' s'; };
    api.every(1000, ()=>{ secs++; head(); });
    api.on(wrap,'click',e=>{
      const b = e.target.closest('.ed-mc'); if(!b || lock || api.ended || b.classList.contains('up') || b.classList.contains('done')) return;
      const i = +b.dataset.i, c = cards[i]; b.textContent = c.t; b.classList.add('up'); if(c.t.length <= 3) b.classList.add('big'); api.sfx('tap'); open.push(i);
      if(open.length === 2){
        moves++; const [x,y] = open; lock = true;
        if(cards[x].k === cards[y].k){ found++; api.sfx('good'); api.after(350, ()=>{ [x,y].forEach(j=>{ bs[j].classList.remove('up'); bs[j].classList.add('done'); }); open = []; lock = false; if(found >= 8){ const sc = Math.max(100, 1000 - moves*20 - secs*3); api.setScore(sc); api.end(sc, { win:true, title:'Toutes les paires trouvées !', msg: moves + ' coups en ' + secs + ' secondes.' }); } }); }
        else { api.sfx('bad'); api.after(900, ()=>{ [x,y].forEach(j=>{ bs[j].textContent = '❓'; bs[j].classList.remove('up','big'); }); open = []; lock = false; }); }
        head();
      }
    });
    head();
  }, o.how || 'Retourne deux cartes à la fois et retrouve les paires (par exemple un mot et son partenaire). Moins tu fais de coups et plus tu es rapide, plus ton score est élevé (maximum 1000).');
};

/* ==========================================================
   9. MOTS MÉLANGÉS : [[mot, indice], …] — remets les lettres dans l'ordre
   ========================================================== */
EDU.scramble = function(bank, o){
  o = o || {};
  return withHow(function(api){
    api.scroll(true);
    const qs = shuffle(bank).slice(0, Math.min(o.n || 8, bank.length)); let i = 0, score = 0, hints = 0, good = 0, filled = [], tiles = [], locked = false;
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    function show(){
      locked = false; filled = []; const w = qs[i][0].toUpperCase(); const letters = w.split('');
      let sh; let tries = 0; do { sh = shuffle(letters.map((ch,k)=>({ ch, k }))); tries++; } while(tries < 20 && sh.every((x,j)=>x.k === j) && letters.length > 2); tiles = sh;
      wrap.innerHTML = `<p class="ed-head">Mot ${i+1} / ${qs.length}</p><div class="g-q">${esc(qs[i][1])}</div><div class="ed-ans-slots" id="as">${letters.map(()=>'<div class="ed-as"></div>').join('')}</div><div class="ed-tiles" id="ts">${sh.map((x,j)=>`<button class="ed-tile" data-j="${j}">${esc(x.ch)}</button>`).join('')}</div><div class="ed-row2"><button class="ed-btn2" id="sback">⌫ Effacer</button><button class="ed-btn2" id="shint">💡 Indice (−30)</button><button class="ed-btn2" id="sskip">Passer ▶</button></div><div id="sfb"></div>`;
      api.setInfo(good + ' ✓');
    }
    const slots = ()=> wrap.querySelectorAll('.ed-as');
    function render(){ const s = slots(); s.forEach((d,k)=>{ d.textContent = filled[k] != null ? tiles[filled[k]].ch : ''; }); wrap.querySelectorAll('.ed-tile').forEach((t,j)=> t.classList.toggle('used', filled.includes(j))); }
    function check(){
      const w = qs[i][0].toUpperCase(); if(filled.length < w.length) return;
      const got = filled.map(j=>tiles[j].ch).join('');
      if(got === w){ locked = true; good++; score += Math.max(30, 100 - hints*30 * 0); api.setScore(score); api.sfx('good'); wrap.querySelector('#sfb').innerHTML = '<div class="ed-exp" style="background:rgba(47,143,95,.3);color:#d6ffe9;">✅ ' + esc(qs[i][0]) + '</div>'; api.after(900, nextWord); }
      else { api.sfx('bad'); slots().forEach(d=>d.classList.add('g-shake')); setTimeout(()=>{ filled = []; render(); slots().forEach(d=>d.classList.remove('g-shake')); }, 450); }
    }
    function nextWord(){ i++; if(i >= qs.length) api.end(score, { win: good >= Math.ceil(qs.length*.7), title: good + ' / ' + qs.length + ' mots trouvés', msg: praise(good, qs.length) }); else show(); }
    api.on(wrap,'click',e=>{
      if(locked || api.ended) return;
      const t = e.target.closest('.ed-tile');
      if(t){ const j = +t.dataset.j; if(!filled.includes(j)){ filled.push(j); api.sfx('tap'); render(); check(); } return; }
      if(e.target.closest('#sback')){ filled.pop(); render(); return; }
      if(e.target.closest('#shint')){ const w = qs[i][0].toUpperCase(); const pos = filled.length; if(pos >= w.length) return; const j = tiles.findIndex((x,jj)=> x.ch === w[pos] && !filled.includes(jj)); if(j >= 0){ filled.push(j); hints++; score = Math.max(0, score - 30); api.setScore(score); render(); check(); } return; }
      if(e.target.closest('#sskip')){ locked = true; wrap.querySelector('#sfb').innerHTML = '<div class="ed-exp">Le mot était : <b>' + esc(qs[i][0]) + '</b></div>'; api.after(1500, nextWord); }
    });
    show();
  }, o.how || 'Les lettres d\'un mot sont mélangées : touche-les dans le bon ordre pour reformer le mot. Un indice t\'aide, mais te coûte 30 points. 8 mots à trouver.', { noTranslate:true });
};

/* ==========================================================
   10. JEUX SPÉCIAUX
   ========================================================== */
/* ---- Dactylo : tape les phrases le plus vite possible, 60 secondes ---- */
EDU.typing = function(phrases, o){
  o = o || {};
  return withHow(function(api){
    api.scroll(true);
    const list = shuffle(phrases); let pi = 0, chars = 0, wrong = 0, time = 60, pos = 0, cur = list[0], inp;
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    wrap.innerHTML = `<p class="ed-head" id="dh"></p><div class="g-bar"><i id="dbar"></i></div><div class="ed-type" id="dt"></div><input class="ed-in" id="din" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Tape ici…"><p class="ed-head">Les accents et les majuscules ne sont pas obligatoires.</p>`;
    inp = wrap.querySelector('#din'); const dt = wrap.querySelector('#dt');
    const base = ch => ch.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    const paint = ()=>{ dt.innerHTML = cur.split('').map((ch,k)=> k < pos ? `<span class="ok">${esc(ch)}</span>` : (k === pos ? `<span class="cur">${esc(ch)}</span>` : esc(ch))).join(''); };
    const head = ()=>{ wrap.querySelector('#dh').textContent = '⏱️ ' + time + ' s • ' + chars + ' caractères • ' + Math.round(chars/5) + ' mots'; wrap.querySelector('#dbar').style.width = (time*100/60) + '%'; api.setScore(chars); };
    api.on(inp,'input', ()=>{
      const v = inp.value; inp.value = '';
      for(const ch of v){
        if(base(ch) === base(cur[pos] || '')){ pos++; chars++; } else { wrong++; api.sfx('bad'); }
        if(pos >= cur.length){ pi++; cur = list[pi % list.length]; pos = 0; api.sfx('good'); }
      }
      paint(); head();
    });
    api.every(1000, ()=>{ time--; head(); if(time <= 0){ const wpm = Math.round(chars/5); api.end(chars, { win: wpm >= 20, title: wpm + ' mots par minute', msg: 'Erreurs de frappe : ' + wrong + '. Un bon rythme de bureau se situe autour de 30 à 40 mots par minute.' }); } });
    paint(); head(); try{ inp.focus(); }catch(e){}
  }, o.how || 'Tape les phrases le plus vite possible pendant 60 secondes (le clavier s\'ouvre tout seul). Ton score est le nombre de caractères tapés correctement : 5 caractères = 1 mot.', { noTranslate:true, scoreLabel:'Caractères' });
};

/* ---- Binaire : règle les 8 interrupteurs pour écrire le nombre demandé ---- */
EDU.binary = function(o){
  o = o || {};
  return withHow(function(api){
    api.scroll(true);
    let time = 60, score = 0, good = 0, target = 0, level = 1; const W = [128,64,32,16,8,4,2,1]; let bits = [0,0,0,0,0,0,0,0], locked = false;
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    wrap.innerHTML = `<p class="ed-head" id="bh"></p><div class="g-bar"><i id="bbar"></i></div><div class="g-q">Écris ce nombre en binaire :</div><div class="g-big-text" id="bt"></div><div class="ed-bits">${W.map((w,k)=>`<button class="ed-bit" data-k="${k}">0<small>${w}</small></button>`).join('')}</div><p class="ed-head" id="bs"></p>`;
    const bb = wrap.querySelectorAll('.ed-bit'), bs = wrap.querySelector('#bs');
    const val = ()=> bits.reduce((s,b,k)=> s + b*W[k], 0);
    const head = ()=>{ wrap.querySelector('#bh').textContent = '⏱️ ' + time + ' s • ' + good + ' réussis'; wrap.querySelector('#bbar').style.width = (time*100/60) + '%'; };
    function next(){ level = Math.min(4, 1 + Math.floor(good/3)); const max = [15,63,127,255][level-1]; do { target = 1 + rnd(max); } while(target === val()); bits = [0,0,0,0,0,0,0,0]; bb.forEach(b=>{ b.classList.remove('on'); b.firstChild.nodeValue = '0'; }); wrap.querySelector('#bt').textContent = target; bs.textContent = 'Ton nombre : 0'; locked = false; head(); }
    api.on(wrap,'click',e=>{
      const b = e.target.closest('.ed-bit'); if(!b || locked || api.ended) return; const k = +b.dataset.k; bits[k] ^= 1; b.classList.toggle('on', !!bits[k]); b.firstChild.nodeValue = String(bits[k]); api.sfx('tap');
      const v = val(); bs.textContent = 'Ton nombre : ' + v;
      if(v === target){ locked = true; good++; score += 10 * level; api.setScore(score); api.sfx('good'); api.after(500, next); }
    });
    api.every(1000, ()=>{ time--; head(); if(time <= 0){ locked = true; api.end(score, { win: good >= 6, title:'Temps écoulé !', msg: good + ' nombres écrits en binaire. Les ordinateurs ne comprennent que 0 et 1 : chaque interrupteur vaut une puissance de 2 (1, 2, 4, 8, 16…).' }); } });
    next();
  }, o.how || 'Un ordinateur compte avec des 0 et des 1. Touche les interrupteurs pour les allumer (1) ou les éteindre (0) : chacun vaut 128, 64, 32, 16, 8, 4, 2 ou 1. Additionne les interrupteurs allumés pour atteindre le nombre demandé. 60 secondes !');
};

/* ---- Mélangeur de couleurs : règle rouge/vert/bleu pour copier la couleur cible ---- */
EDU.colors = function(o){
  o = o || {};
  return withHow(function(api){
    api.scroll(true);
    let round = 0, score = 0; const N = 5; let tg;
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    function show(){
      tg = [rnd(52)*5, rnd(52)*5, rnd(52)*5];
      wrap.innerHTML = `<p class="ed-head">Couleur ${round+1} / ${N}</p><div class="g-q">Copie cette couleur en mélangeant rouge, vert et bleu :</div><div class="ed-sw" style="background:rgb(${tg})"></div><div class="ed-sw" id="mix" style="background:rgb(128,128,128)"></div>
        ${['Rouge','Vert','Bleu'].map((n,k)=>`<div class="ed-sl"><span style="width:52px">${n}</span><input type="range" min="0" max="255" step="1" value="128" data-k="${k}"><b id="v${k}" style="width:34px">128</b></div>`).join('')}<button class="ed-next" id="cok">Valider ✓</button><div id="cfb"></div>`;
      const vals = [128,128,128];
      wrap.querySelectorAll('input[type=range]').forEach(r=> api.on(r,'input', ()=>{ vals[+r.dataset.k] = +r.value; wrap.querySelector('#v'+r.dataset.k).textContent = r.value; wrap.querySelector('#mix').style.background = 'rgb('+vals+')'; }));
      api.on(wrap.querySelector('#cok'),'click', ()=>{
        if(wrap.querySelector('#cok').dataset.d) return; wrap.querySelector('#cok').dataset.d = '1';
        const dist = Math.hypot(vals[0]-tg[0], vals[1]-tg[1], vals[2]-tg[2]), pts = Math.max(0, Math.round(100 - dist/2.2));
        score += pts; api.setScore(score); api.sfx(pts >= 70 ? 'good' : 'bad');
        wrap.querySelector('#cfb').innerHTML = `<div class="ed-exp">Cible : rouge ${tg[0]}, vert ${tg[1]}, bleu ${tg[2]}.<br>Toi : ${vals[0]}, ${vals[1]}, ${vals[2]} → <b>+${pts} points</b><br>💡 Les écrans fabriquent toutes les couleurs en mélangeant de la lumière rouge, verte et bleue.</div>`;
        api.after(3200, ()=>{ round++; if(round >= N) api.end(score, { win: score >= 300, title:'Mélange terminé !', msg:'Score maximum possible : 500.' }); else show(); });
      });
    }
    show();
  }, o.how || 'Une couleur cible s\'affiche. Règle les trois curseurs rouge, vert et bleu pour obtenir la même couleur. Plus tu es proche, plus tu gagnes de points (jusqu\'à 100 par couleur, 5 couleurs).', { noTranslate:true });
};

/* ---- Monnaie FCFA : rends la monnaie avec les pièces et billets ---- */
EDU.change = function(o){
  o = o || {};
  return withHow(function(api){
    api.scroll(true);
    const D = [5000,2000,1000,500,250,100,50,25,10,5], N = 8; let round = 0, score = 0, tot = 0, price = 0, given = 0, secs = 0, tries = 0;
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    const PR = [150,275,325,350,425,625,700,825,975,1450,1675,1975,2300,2650,3250,3750,4425];
    function show(){
      price = pick(PR); given = [500,1000,2000,5000,10000].find(g=>g > price); tot = 0; secs = 0; tries = 0;
      wrap.innerHTML = `<p class="ed-head">Client ${round+1} / ${N}</p><div class="g-q">Le client doit payer <b>${price.toLocaleString('fr-FR')} FCFA</b> et te donne <b>${given.toLocaleString('fr-FR')} FCFA</b>.<br>Rends-lui la monnaie !</div><div class="g-big-text" id="ct">0 FCFA</div><div class="ed-coins">${D.map(d=>`<button class="ed-coin ${d>=1000?'bill':''}" data-d="${d}">${d>=1000?'💵':'🪙'} ${d.toLocaleString('fr-FR')}</button>`).join('')}</div><div class="ed-row2"><button class="ed-btn2" id="cclr">↺ Effacer</button><button class="ed-btn2 pri" id="cval">Valider ✓</button></div><div id="cfb"></div>`;
    }
    const upd = ()=>{ const t = wrap.querySelector('#ct'); if(t) t.textContent = tot.toLocaleString('fr-FR') + ' FCFA'; };
    api.on(wrap,'click',e=>{
      if(api.ended) return; const c = e.target.closest('.ed-coin');
      if(c){ if(wrap.querySelector('#cval').dataset.d) return; tot += +c.dataset.d; api.sfx('tap'); upd(); return; }
      if(e.target.closest('#cclr')){ tot = 0; upd(); return; }
      const v = e.target.closest('#cval'); if(!v || v.dataset.d) return;
      const need = given - price;
      if(tot === need){ v.dataset.d = '1'; const pts = Math.max(30, 100 - secs*2 - tries*25); score += pts; api.setScore(score); api.sfx('good'); wrap.querySelector('#cfb').innerHTML = `<div class="ed-exp" style="background:rgba(47,143,95,.3);color:#d6ffe9;">✅ Exact : ${given.toLocaleString('fr-FR')} − ${price.toLocaleString('fr-FR')} = ${need.toLocaleString('fr-FR')} FCFA. +${pts} points</div>`;
        api.after(1600, ()=>{ round++; if(round >= N) api.end(score, { win: score >= 500, title:'Caisse terminée !', msg:'Rendre la monnaie vite et sans erreur, c\'est un vrai savoir-faire de vendeur et de caissier.' }); else show(); }); }
      else { tries++; tot = 0; upd(); api.sfx('bad'); api.vibrate(50); wrap.querySelector('#cfb').innerHTML = `<div class="ed-exp">❌ Ce n'est pas le bon montant. Astuce : monnaie à rendre = somme donnée − prix à payer.</div>`; }
    });
    api.every(1000, ()=>{ secs++; });
    show();
  }, o.how || 'Tu tiens la caisse d\'une boutique ! Le client paie avec un billet : calcule la monnaie à rendre, puis touche les pièces et billets pour composer le bon montant exact. 8 clients ; plus tu es rapide et précis, plus tu marques.', { noTranslate:true });
};

/* ==========================================================
   Aides de dessin pour les jeux « gen » (horloge, fractions, portée musicale)
   ========================================================== */
EDU.drawClock = (g, w, h, hh, mm)=>{
  const cx = w/2, cy = h/2, R = Math.min(w,h)/2 - 6;
  g.fillStyle = '#fff'; g.strokeStyle = '#2a1f0e'; g.lineWidth = 4; g.beginPath(); g.arc(cx,cy,R,0,Math.PI*2); g.fill(); g.stroke();
  g.fillStyle = '#2a1f0e'; g.font = '800 15px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
  for(let n=1;n<=12;n++){ const a = n/12*Math.PI*2 - Math.PI/2; g.fillText(String(n), cx + Math.cos(a)*(R-17), cy + Math.sin(a)*(R-17)); }
  const hand = (ang, len, wd, col)=>{ g.strokeStyle = col; g.lineWidth = wd; g.lineCap = 'round'; g.beginPath(); g.moveTo(cx,cy); g.lineTo(cx + Math.cos(ang)*len, cy + Math.sin(ang)*len); g.stroke(); };
  hand(((hh%12) + mm/60)/12*Math.PI*2 - Math.PI/2, R*.5, 6, '#2a1f0e'); hand(mm/60*Math.PI*2 - Math.PI/2, R*.78, 4, '#c0392b');
  g.fillStyle = '#2a1f0e'; g.beginPath(); g.arc(cx,cy,5,0,Math.PI*2); g.fill();
};
EDU.drawPie = (g, w, h, num, den)=>{
  const cx = w/2, cy = h/2, R = Math.min(w,h)/2 - 6;
  for(let k=0;k<den;k++){ const a0 = k/den*Math.PI*2 - Math.PI/2, a1 = (k+1)/den*Math.PI*2 - Math.PI/2; g.beginPath(); g.moveTo(cx,cy); g.arc(cx,cy,R,a0,a1); g.closePath(); g.fillStyle = k < num ? '#F2B84B' : '#fff'; g.fill(); g.strokeStyle = '#2a1f0e'; g.lineWidth = 2.5; g.stroke(); }
};
EDU.drawStaff = (g, w, h, idx)=>{ // idx : 0 = Mi (ligne du bas), 1 = Fa, 2 = Sol … clé de Sol
  const top = 38, gap = 14; g.strokeStyle = '#2a1f0e'; g.lineWidth = 1.6;
  for(let i=0;i<5;i++){ g.beginPath(); g.moveTo(10, top + i*gap); g.lineTo(w-10, top + i*gap); g.stroke(); }
  g.fillStyle = '#2a1f0e'; g.font = 'italic 800 54px Georgia, serif'; g.textAlign = 'left'; g.textBaseline = 'alphabetic'; g.fillText('G', 16, top + 3*gap + 8); g.font = '700 10px sans-serif'; g.fillText('clé de Sol', 8, top + 4*gap + 28);
  const y = top + 4*gap - idx*(gap/2), x = w*.64;
  if(idx <= -2){ for(let k=-2; k>=idx; k-=2){ const ly = top + 4*gap - k*(gap/2); g.beginPath(); g.moveTo(x-16, ly); g.lineTo(x+16, ly); g.stroke(); } }
  if(idx >= 10){ for(let k=10; k<=idx; k+=2){ const ly = top + 4*gap - k*(gap/2); g.beginPath(); g.moveTo(x-16, ly); g.lineTo(x+16, ly); g.stroke(); } }
  g.fillStyle = '#c0392b'; g.beginPath(); g.ellipse(x, y, 11, 8, -.3, 0, Math.PI*2); g.fill();
};
EDU.NOTES = ['Do','Ré','Mi','Fa','Sol','La','Si'];
})();

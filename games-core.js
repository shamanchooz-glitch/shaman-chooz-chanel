/* ==========================================================
   SALLE DE JEUX — SHAMAN CHOOZ CHANEL
   Moteur commun : liste des jeux, accès par "Pass Jeux" (même
   paiement que les pass de la chaîne), écran de jeu plein écran,
   sons, classements, et gestion dans l'espace admin.
   Aucun jeu n'a besoin de clé API : tout tourne dans le navigateur.
   Les jeux eux-mêmes sont dans games-board.js, games-arcade.js
   et games-brain.js (chacun s'enregistre avec SCCG.register).
   ========================================================== */
window.SCC_GAMES_BUILD = 14; // numéro de version : vérifié par la page
(function(){
'use strict';

const $ = id => document.getElementById(id);
const esc = s => String(s==null?'':s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const el = (tag, cls, html)=>{ const e=document.createElement(tag); if(cls) e.className=cls; if(html!=null) e.innerHTML=html; return e; };
const digits = s => (window.phoneKey ? phoneKey(s) : String(s||'').replace(/\D/g,''));
const fmtN = n => Number(n).toLocaleString('fr-FR');
const clone = o => JSON.parse(JSON.stringify(o));
const rnd = n => Math.floor(Math.random()*n);
const rndf = (a,b)=> a + Math.random()*(b-a);
const shuffle = a => { const r=a.slice(); for(let i=r.length-1;i>0;i--){ const j=rnd(i+1); const t=r[i]; r[i]=r[j]; r[j]=t; } return r; };
const pick = a => a[rnd(a.length)];
const LS = {
  get(k,d){ try{ const v=localStorage.getItem(k); return v===null?d:JSON.parse(v); }catch(e){ return d; } },
  set(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} },
  del(k){ try{ localStorage.removeItem(k); }catch(e){} }
};
const say = (m,t)=>{ try{ toast(m,t); }catch(e){} };

const CATS = ['Arcade','Sport','Plateau','Cartes & dés','Réflexion','Mots & quiz','Réflexes'];
const DEFAULT_PASSES = {
  gp1:{ name:'1 jour', days:1, price:100 },
  gp2:{ name:'1 semaine', days:7, price:500 },
  gp3:{ name:'1 mois', days:30, price:1500 }
};
const DEFAULT_FREE = { morpion:true, snake:true, memoire:true };

const SCCG = window.SCCG = {
  games: [], passes: clone(DEFAULT_PASSES), settings:{ free:clone(DEFAULT_FREE), hidden:{} },
  session: null, cat:'Tous', q:'', pendingGame:null, lab:{}
};
SCCG.util = { rnd, rndf, shuffle, pick, esc, el, fmtN, LS, CATS };
SCCG.register = function(def){
  if(SCCG.games.some(g=>g.id===def.id)) return;
  def.score = def.score || 'high';
  SCCG.games.push(def);
};
const findGame = id => SCCG.games.find(g=>g.id===id);
const isFree = def => !!SCCG.settings.free[def.id];
SCCG.syncCode = (phone, nc)=>{ if(SCCG.session && digits(SCCG.session.phone)===digits(phone)){ SCCG.session.code = String(nc); LS.set('scc_g_session', SCCG.session); } };
SCCG.hasAccess = ()=> !!(SCCG.session && SCCG.session.expiresAt > Date.now());
SCCG.canPlay = def => isFree(def) || SCCG.hasAccess();

/* ---------- Mise en forme des scores ---------- */
function fmtScore(def, v){
  if(v==null) return '–';
  if(def.fmt) return def.fmt(v);
  return fmtN(v) + (def.unit ? ' '+def.unit : '');
}
const getBest = id => LS.get('scc_g_best_'+id, null);

/* ---------- Son (synthétisé, aucun fichier) ---------- */
let actx = null, muted = LS.get('scc_g_mute', false) === true;
function audio(){
  if(!actx){ try{ actx = new (window.AudioContext||window.webkitAudioContext)(); }catch(e){ actx = null; } }
  if(actx && actx.state === 'suspended'){ try{ actx.resume(); }catch(e){} }
  return actx;
}
function tone(freq, dur, type, vol, slide, delay){
  const a = audio(); if(!a || muted) return;
  try{
    const o = a.createOscillator(), g = a.createGain(), t = a.currentTime + (delay||0);
    o.type = type || 'square';
    o.frequency.setValueAtTime(freq, t);
    if(slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, freq+slide), t+dur);
    g.gain.setValueAtTime(vol==null ? .05 : vol, t);
    g.gain.exponentialRampToValueAtTime(.0001, t+dur);
    o.connect(g); g.connect(a.destination); o.start(t); o.stop(t+dur+.03);
  }catch(e){}
}
const SFX = {
  tap:()=>tone(520,.05), move:()=>tone(300,.04,'triangle',.05), pop:()=>tone(900,.06,'sine',.07,-450),
  good:()=>{ tone(660,.07); tone(880,.1,'square',.05,0,.07); },
  bad:()=>tone(170,.22,'sawtooth',.06,-70), shoot:()=>tone(1000,.09,'square',.035,-700),
  boom:()=>tone(140,.28,'sawtooth',.07,-90), line:()=>{ tone(500,.08,'triangle',.07); tone(800,.12,'triangle',.07,0,.08); },
  win:()=>[523,659,784,1047].forEach((f,i)=>tone(f,.15,'triangle',.07,0,i*.11)),
  lose:()=>[400,330,260,180].forEach((f,i)=>tone(f,.18,'sawtooth',.055,0,i*.13)),
  jump:()=>tone(380,.12,'square',.04,300)
};

/* ==========================================================
   ACCÈS : Pass Jeux (mêmes commandes et même validation que les pass chaîne)
   ========================================================== */
async function verify(phone, code){
  const orders = await DB.get('orders', {});
  const now = Date.now(); let best = null;
  Object.values(orders||{}).forEach(o=>{
    const exp = o.type==='game-pass' ? o.gameExpiresAt : (o.type==='live-pass' ? o.liveExpiresAt : 0);   /* le pass chaîne ouvre aussi les jeux */
    if(exp > now && o.status==='paid' && digits(o.buyerPhone)===digits(phone) && passCodeOf(o)===String(code)){
      if(!best || exp > best.expiresAt) best = { phone, code:String(code), name:o.buyerName||'', expiresAt:exp };
    }
  });
  return best;
}
function setSession(s){
  SCCG.session = s;
  if(s) LS.set('scc_g_session', s); else LS.del('scc_g_session');
}
SCCG.refreshSession = async function(){
  const s = SCCG.session; if(!s) return;
  try{
    const r = await verify(s.phone, s.code);
    setSession(r);
  }catch(e){ /* hors-ligne : on garde l'accès jusqu'à son expiration */ }
  SCCG.renderHub();
};

SCCG.init = async function(){
  if(SCCG._started) return; SCCG._started = true;
  try{
    let p = await DB.get('gamePasses', null);
    if(!p){
      p = clone(DEFAULT_PASSES); Object.values(p).forEach(x=>x.createdAt = Date.now());
      try{ await DB.set('gamePasses', p); }catch(e){}
    }
    SCCG.passes = p;
  }catch(e){ SCCG.passes = clone(DEFAULT_PASSES); }
  try{
    let s = await DB.get('gameSettings', null);
    if(!s){
      s = { v:1, free:clone(DEFAULT_FREE), hidden:{} };
      try{ await DB.set('gameSettings', s); }catch(e){}
    }
    s.free = s.free || {}; s.hidden = s.hidden || {};
    SCCG.settings = s;
  }catch(e){ /* règles Firebase pas encore mises à jour : valeurs par défaut */ }
  const saved = LS.get('scc_g_session', null);
  if(saved && saved.expiresAt > Date.now()) SCCG.session = saved; else if(saved) LS.del('scc_g_session');
  SCCG.bind();
  SCCG.renderHub();
  SCCG.refreshSession();
  setInterval(()=>{ if(SCCG.session && SCCG.session.expiresAt <= Date.now()){ setSession(null); SCCG.renderHub(); } }, 60000);
};
SCCG.onShow = function(){ if(!SCCG._started){ SCCG.init(); return; } SCCG.renderHub(); SCCG.refreshSession(); };

/* ---------- Hub : liste des jeux ---------- */
SCCG.bind = function(){
  const s = $('gmSearch'); if(s) s.addEventListener('input', e=>{ SCCG.q = e.target.value.trim().toLowerCase(); SCCG.renderHub(); });
};
function visibleGames(){ return SCCG.games.filter(g=>!SCCG.settings.hidden[g.id]); }
function timeLeftText(ms){
  const h = Math.ceil(ms/3600000);
  return h >= 24 ? Math.ceil(h/24)+' jour'+(Math.ceil(h/24)>1?'s':'') : Math.max(1,h)+' h';
}
function renderPassCard(){
  const box = $('gmPassCard'); if(!box) return;
  const prices = Object.values(SCCG.passes).map(p=>p.price).filter(n=>isFinite(n));
  const from = prices.length ? Math.min.apply(null, prices) : null;
  if(SCCG.hasAccess()){
    const s = SCCG.session, d = new Date(s.expiresAt);
    box.innerHTML = `<div class="gm-pass-card"><p class="gm-pc-title">✅ Pass Jeux actif</p>
      <p class="gm-pc-sub">Tous les jeux sont débloqués jusqu'au ${d.toLocaleDateString('fr-FR')} à ${d.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})} (reste ${timeLeftText(s.expiresAt-Date.now())}).</p>
      <div class="gm-pass-actions"><button data-a="more">+ Prolonger</button><button class="ghost" data-a="code">🔑 Changer mon code</button><button class="ghost" data-a="out">Se déconnecter</button></div></div>`;
  } else {
    box.innerHTML = `<div class="gm-pass-card off"><p class="gm-pc-title">🎟️ Pass Jeux — tous les jeux, sans limite</p>
      <p class="gm-pc-sub">Quelques jeux sont gratuits. Pour jouer à tous les autres, prends un pass${from!=null?` à partir de <b>${fmtN(from)} FCFA</b>`:''} : paiement mobile money, comme pour les pass de la chaîne.</p>
      <div class="gm-pass-actions"><button data-a="buy">Obtenir un pass</button><button class="ghost" data-a="login">J'ai déjà un pass</button></div></div>`;
  }
  box.querySelectorAll('[data-a]').forEach(b=> b.onclick = ()=>{
    const a = b.dataset.a;
    if(a==='out'){ setSession(null); SCCG.renderHub(); say('Déconnecté.', 'ok'); }
    else if(a==='code'){ uiChangePassCode(SCCG.session.phone, SCCG.session.code); }
    else openPassSheet(null);
  });
}
function renderFilters(){
  const f = $('gmFilters'); if(!f) return;
  const cats = ['Tous'].concat(CATS.filter(c=>visibleGames().some(g=>g.cat===c)));
  f.innerHTML = '<button class="chip" data-rand="1">🎲 Au hasard</button>' + cats.map(c=>`<button class="chip ${c===SCCG.cat?'active':''}" data-c="${esc(c)}">${esc(c)}</button>`).join('');
  f.querySelectorAll('[data-c]').forEach(b=> b.onclick = ()=>{ SCCG.cat = b.dataset.c; SCCG.renderHub(); });
  const rb = f.querySelector('[data-rand]');
  if(rb) rb.onclick = ()=>{ const v = visibleGames(), pl = v.filter(g=>SCCG.canPlay(g)), l = pl.length ? pl : v; if(l.length) SCCG.open(l[rnd(l.length)].id); };
}
SCCG.renderHub = function(){
  const grid = $('gmGrid'); if(!grid) return;
  renderPassCard(); renderFilters();
  let list = visibleGames();
  if(SCCG.cat!=='Tous') list = list.filter(g=>g.cat===SCCG.cat);
  if(SCCG.q) list = list.filter(g=> (g.name+' '+g.desc+' '+g.cat).toLowerCase().includes(SCCG.q));
  const sub = $('gmCount'); if(sub) sub.textContent = visibleGames().length + ' jeux';
  if(!list.length){ grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><div class="big">🎮</div>Aucun jeu trouvé.</div>`; return; }
  grid.innerHTML = list.map(g=>{
    const free = isFree(g), locked = !SCCG.canPlay(g), best = getBest(g.id);
    const h = g.hue==null ? 20 : g.hue;
    return `<button class="gm-tile" data-g="${esc(g.id)}">
      <div class="gm-thumb" style="background:linear-gradient(135deg,hsl(${h},62%,40%),hsl(${(h+55)%360},62%,22%));"><span>${g.emoji}</span>
        ${free ? '<em class="gm-badge free">GRATUIT</em>' : (locked ? '<em class="gm-badge">🔒 Pass</em>' : '')}${g.isNew ? '<em class="gm-badge new">NOUVEAU</em>' : ''}</div>
      <strong>${esc(g.name)}</strong><small>${esc(g.desc)}</small>
      <span class="gm-rec">${best!=null && g.score!=='none' ? '🏅 Record : '+esc(fmtScore(g,best)) : ''}</span></button>`;
  }).join('');
  grid.querySelectorAll('[data-g]').forEach(b=> b.onclick = ()=> SCCG.open(b.dataset.g));
};
SCCG.open = function(id){
  const def = findGame(id); if(!def) return;
  if(SCCG.session && SCCG.session.expiresAt <= Date.now()) setSession(null);
  if(!SCCG.canPlay(def)){ SCCG.pendingGame = id; openPassSheet(def); return; }
  launch(def);
};

/* ---------- Fiche d'achat / connexion du Pass Jeux ---------- */
function openPassSheet(def){
  const sheet = $('productSheet');
  const passes = Object.entries(SCCG.passes).sort((a,b)=>a[1].price-b[1].price);
  let selPass = passes.length ? passes[0][0] : null, selPay = null;
  sheet.innerHTML = `
    <div class="sheet-handle"></div>
    <span class="reel-cat">Pass Jeux</span>
    <h2>${def ? '🔒 '+esc(def.name)+' demande un pass' : '🎟️ Pass Jeux'}</h2>
    <p class="sheet-desc">Un seul pass débloque les ${visibleGames().length} jeux pendant toute sa durée. Ton accès est activé dès que ton paiement est vérifié.</p>
    <p class="field-label">Choisis ta formule</p>
    <div class="gm-opts" id="gmPassOpts"></div>
    <p class="price-tag" id="gmPassPrice" style="margin-top:12px;">—</p>
    ${payMethodsBlock()}
    <p class="field-label">Tes informations</p>
    <input class="input" id="buyerName" placeholder="Ton nom">
    <input class="input" id="buyerPhone" placeholder="Numéro de téléphone / WhatsApp" inputmode="tel">
    <input class="input" id="buyerRef" placeholder="Référence de la transaction">
    <button class="btn btn-primary" id="gmBuyBtn">Confirmer mon achat</button>
    <div style="border-top:1px solid var(--line);margin:20px 0 4px;"></div>
    <p class="field-label" style="margin-top:12px;">J'ai déjà un pass</p>
    <input class="input" id="gmLoginPhone" placeholder="Ton numéro de téléphone" inputmode="tel">
    <input class="input" id="gmLoginCode" placeholder="Ton code d'accès" inputmode="numeric" maxlength="6">
    <button class="btn btn-ghost" id="gmLoginBtn">Me connecter</button>
    <p class="hint" id="gmLoginErr" style="color:var(--danger);"></p>
    <button class="btn btn-ghost" id="cancelSheetBtn">Fermer</button>`;
  const drawOpts = ()=>{
    const box = $('gmPassOpts');
    box.innerHTML = passes.length ? passes.map(([id,p])=>`<button class="gm-opt ${id===selPass?'selected':''}" data-p="${id}">${esc(p.name)}<small>${fmtN(p.price)} FCFA</small></button>`).join('')
      : '<p class="hint">Aucun pass disponible pour l\'instant.</p>';
    box.querySelectorAll('[data-p]').forEach(b=> b.onclick = ()=>{ selPass = b.dataset.p; drawOpts(); });
    const p = SCCG.passes[selPass];
    $('gmPassPrice').textContent = p ? `${fmtN(p.price)} FCFA / ${p.name}` : '—';
  };
  drawOpts();
  wirePayMethodButtons(sheet, id=>{ selPay = id; });
  $('cancelSheetBtn').onclick = closeSheet;
  $('gmBuyBtn').onclick = async ()=>{
    const p = SCCG.passes[selPass];
    const name = $('buyerName').value.trim(), phone = $('buyerPhone').value.trim(), ref = $('buyerRef').value.trim();
    if(!p) return say('Choisis un pass', 'err');
    if(!selPay) return say('Choisis un moyen de paiement', 'err');
    if(!name || !phone || !ref) return say('Remplis tous les champs', 'err');
    const accessCode = await getOrCreateAccessCode(phone), passCode = await getOrCreatePassCode(phone);
    await DB.push('orders', {
      type:'game-pass', passCode, passId:selPass, passName:p.name, passDays:p.days,
      title:`Pass Jeux (${p.name})`, price:p.price,
      payMethod:selPay, buyerName:name, buyerPhone:phone, ref, accessCode,
      status:'pending', createdAt:Date.now()
    });
    showGameCode(passCode);
  };
  $('gmLoginBtn').onclick = async ()=>{
    const phone = $('gmLoginPhone').value.trim(), code = $('gmLoginCode').value.trim(), err = $('gmLoginErr');
    err.textContent = '';
    if(!phone || !code){ err.textContent = 'Entre ton numéro et ton code d\'accès.'; return; }
    let r = null;
    try{ r = await verify(phone, code); }catch(e){}
    if(!r){ err.textContent = "Aucun pass jeux actif trouvé pour ce numéro et ce code. Si tu viens de payer, attends la validation (quelques minutes) puis réessaie."; return; }
    setSession(r); logPassEvent(phone, 'login', 'jeux'); closeSheet(); SCCG.renderHub(); say('Pass activé ! Bon jeu 🎮', 'ok');
    const g = SCCG.pendingGame; SCCG.pendingGame = null; if(g) SCCG.open(g);
  };
  $('sheetOverlay').classList.add('open'); sheet.classList.add('open');
}
function showGameCode(code){
  const sheet = $('productSheet');
  sheet.innerHTML = `
    <div class="sheet-handle"></div>
    <h2>Commande envoyée !</h2><p class="sheet-desc">Ton Pass Jeux sera activé après vérification de ton paiement.</p>
    <div class="pay-number-box" style="display:block;font-size:14px;">
      🔑 Ton code d'accès personnel : <strong style="font-size:22px;letter-spacing:2px;">${esc(code)}</strong><br><br>
      Garde-le précieusement : avec ton numéro de téléphone, il te permet de te connecter à ta salle de jeux (onglet 🎮 Jeux > « J'ai déjà un pass »), sur n'importe quel appareil.
    </div>
    <button class="btn btn-primary" id="closeConfirmBtn" style="margin-top:14px;">OK, j'ai noté mon code</button>`;
  $('closeConfirmBtn').onclick = closeSheet;
}

/* ==========================================================
   ÉCRAN DE JEU
   ========================================================== */
let ov = null, S = null, popBound = false, wake = null;
SCCG._dbg = ()=>S;

function launch(def){
  if(ov) teardown();
  S = { def, best:getBest(def.id), score:null, ended:false, paused:false, started:false, keys:{}, keyFns:[], disp:[], api:null, inst:null, saved:false };
  ov = el('div','gm-ov');
  ov.innerHTML = `
    <div class="gm-top">
      <button class="gm-ic" data-a="quit" aria-label="Quitter">✕</button>
      <div class="gm-title">${def.emoji} ${esc(def.name)}</div>
      <button class="gm-ic" data-a="mute" aria-label="Son">${muted?'🔇':'🔊'}</button>
      <button class="gm-ic" data-a="pause" aria-label="Pause">⏸</button>
    </div>
    <div class="gm-hud"><div><small>${esc(def.scoreLabel||'Score')}</small><b id="gmScore">–</b></div><div class="gm-info" id="gmInfo"></div><div><small>Record</small><b id="gmBest">${esc(fmtScore(def,S.best))}</b></div></div>
    <div class="gm-view" id="gmView" ${def.translate?'':'translate="no"'}></div>
    <div class="gm-pad" id="gmPad"></div>
    <div class="gm-panel" id="gmPanel"></div>`;
  document.body.appendChild(ov);
  document.body.classList.add('gm-open');
  ov.addEventListener('click', onOvClick);
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
  document.addEventListener('visibilitychange', onVis);
  window.addEventListener('blur', onBlur);
  try{ history.pushState({ sccGame:1 }, '', location.href); window.addEventListener('popstate', onPop); popBound = true; }catch(e){}
  try{ if(navigator.wakeLock) navigator.wakeLock.request('screen').then(w=>{ wake = w; }).catch(()=>{}); }catch(e){}
  showStart();
}
function onPop(){ if(ov) teardown(); }
function closeOverlay(){
  if(!ov) return;
  if(popBound && history.state && history.state.sccGame){ history.back(); setTimeout(()=>{ if(ov) teardown(); }, 400); }
  else teardown();
}
function teardown(){
  if(!ov) return;
  stopGame();
  document.removeEventListener('keydown', onKeyDown);
  document.removeEventListener('keyup', onKeyUp);
  document.removeEventListener('visibilitychange', onVis);
  window.removeEventListener('blur', onBlur);
  if(popBound){ window.removeEventListener('popstate', onPop); popBound = false; }
  try{ if(wake){ wake.release(); } }catch(e){} wake = null;
  ov.remove(); ov = null; S = null;
  document.body.classList.remove('gm-open');
  SCCG.renderHub();
}
function stopGame(){
  if(!S) return;
  try{ if(S.inst && S.inst.destroy) S.inst.destroy(); }catch(e){}
  (S.disp||[]).forEach(fn=>{ try{ fn(); }catch(e){} }); S.disp = [];
  const pad = $('gmPad'); if(pad){ pad.querySelectorAll('.gm-key').forEach(k=>clearInterval(k._r)); pad.innerHTML = ''; }
  const v = $('gmView'); if(v){ v.innerHTML = ''; v.className = 'gm-view'; v.removeAttribute('style'); }
  S.inst = null; S.api = null; S.keys = {}; S.keyFns = [];
}
function onVis(){ if(document.hidden) pauseGame(); }
function onBlur(){ if(S && S.started && !S.ended && !S.paused && S.def.pauseOnBlur !== false) pauseGame(); }

/* ---------- Panneaux (départ, pause, fin) ---------- */
function showPanel(html){
  const p = $('gmPanel'); if(!p) return;
  p.innerHTML = html; p.classList.add('show'); p.scrollTop = 0;
}
function hidePanel(){ const p = $('gmPanel'); if(p){ p.classList.remove('show'); p.innerHTML = ''; } }
function showStart(){
  const d = S.def;
  showPanel(`<div class="gm-big">${d.emoji}</div><h2>${esc(d.name)}</h2>
    <p class="gm-how">${esc(d.how||d.desc)}</p>
    ${d.score!=='none' ? `<p class="gm-bestline">${S.best!=null ? '🏅 Ton record : '+esc(fmtScore(d,S.best)) : 'Pas encore de record — à toi de jouer !'}</p>` : ''}
    <button class="gm-btn primary" data-a="play">▶ Jouer</button>
    ${d.score!=='none' ? '<button class="gm-btn" data-a="board">🏆 Classement</button>' : ''}
    <button class="gm-btn" data-a="quit">Retour aux jeux</button>`);
}
function showPause(){
  const d = S.def;
  const canFinish = d.score==='high' && S.score>0 && !S.ended;
  showPanel(`<div class="gm-big">⏸</div><h2>Pause</h2>
    <button class="gm-btn primary" data-a="resume">▶ Reprendre</button>
    <button class="gm-btn" data-a="restart">↻ Recommencer</button>
    ${canFinish ? '<button class="gm-btn" data-a="finish">🏁 Terminer et enregistrer mon score</button>' : ''}
    <button class="gm-btn" data-a="quit">✕ Quitter</button>`);
}
function onOvClick(e){
  const b = e.target.closest('[data-a]'); if(!b || !S) return;
  const a = b.dataset.a;
  audio();
  if(a==='quit') closeOverlay();
  else if(a==='play') startGame();
  else if(a==='again' || a==='restart') startGame();
  else if(a==='resume') resumeGame();
  else if(a==='pause') pauseGame();
  else if(a==='mute'){ muted = !muted; LS.set('scc_g_mute', muted); b.textContent = muted ? '🔇' : '🔊'; }
  else if(a==='finish'){ if(S.api) S.api.end(S.score, { title:'Partie terminée' }); }
  else if(a==='board') showBoardPanel();
  else if(a==='save') saveScore();
}
function pauseGame(){
  if(!S || !S.started || S.ended || S.paused) return;
  S.paused = true;
  try{ if(S.inst && S.inst.pause) S.inst.pause(); }catch(e){}
  showPause();
}
function resumeGame(){
  if(!S || !S.paused) return;
  S.paused = false; hidePanel();
  try{ if(S.inst && S.inst.resume) S.inst.resume(); }catch(e){}
}

/* ---------- Clavier ---------- */
const KEYMAP = { ArrowLeft:'left', ArrowRight:'right', ArrowUp:'up', ArrowDown:'down', ' ':'space', Enter:'enter', Backspace:'backspace', Escape:'esc' };
function normKey(e){
  const m = KEYMAP[e.key]; if(m) return m;
  const k = (e.key||'').toLowerCase();
  if(k==='z'||k==='w') return 'up'; if(k==='q'||k==='a') return 'left'; if(k==='s') return 'down'; if(k==='d') return 'right';
  return k;
}
function onKeyDown(e){
  if(!S) return;
  const tag = (e.target && e.target.tagName || '').toLowerCase();
  if(tag==='input' || tag==='textarea') return;
  if(e.ctrlKey || e.metaKey || e.altKey) return;
  const k = normKey(e);
  if(k==='up'||k==='down'||k==='left'||k==='right'||k==='space') e.preventDefault();
  if(k==='esc'){ if(S.started && !S.ended) pauseGame(); return; }
  if(!S.started || S.paused || S.ended) return;
  S.keys[k] = true;
  S.keyFns.forEach(h=>{ try{ if(h.raw){ if(e.key && e.key.length<=1 || e.key==='Backspace' || e.key==='Enter') h.fn(e.key.length===1 ? e.key.toLowerCase() : normKey(e), true, e); } else h.fn(k, true, e); }catch(err){ console.error(err); } });
}
function onKeyUp(e){
  if(!S) return;
  const k = normKey(e); delete S.keys[k];
  if(!S.started || S.paused || S.ended) return;
  S.keyFns.forEach(h=>{ if(!h.raw){ try{ h.fn(k, false, e); }catch(err){ console.error(err); } } });
}

/* ---------- Démarrage / API donnée à chaque jeu ---------- */
function setScoreText(v){
  const s = $('gmScore'); if(s) s.textContent = v==null ? '–' : (S.def.fmt ? S.def.fmt(v) : fmtN(v));
}
function startGame(){
  const def = S.def;
  stopGame(); hidePanel();
  S.ended = false; S.paused = false; S.started = true; S.saved = false; S.score = (def.score==='low'||def.score==='none') ? null : 0;
  S.disp = []; S.keys = {}; S.keyFns = [];
  setScoreText(S.score); const inf = $('gmInfo'); if(inf) inf.textContent = '';
  const api = buildApi(S); S.api = api;
  audio();
  try{ S.inst = def.create(api) || {}; }
  catch(err){
    console.error(err);
    showPanel(`<div class="gm-big">😕</div><h2>Oups</h2><p class="gm-how">Ce jeu a rencontré un problème. Réessaie, ou choisis un autre jeu.</p><button class="gm-btn primary" data-a="restart">↻ Réessayer</button><button class="gm-btn" data-a="quit">Retour aux jeux</button>`);
    return;
  }
  try{ if(DB.ready) firebase.database().ref('gamePlays/'+def.id).transaction(v=>(v||0)+1).catch(()=>{}); }catch(e){}
}
function buildApi(S){
  const def = S.def, view = $('gmView'), pad = $('gmPad');
  const api = {
    root:view, pad:pad, def,
    get paused(){ return S.paused; }, get ended(){ return S.ended; }, get keys(){ return S.keys; }, get best(){ return S.best; },
    rnd, rndf, shuffle, pick, esc, el,
    sfx(n){ if(SFX[n]) SFX[n](); }, tone,
    vibrate(ms){ try{ if(!muted && navigator.vibrate) navigator.vibrate(ms); }catch(e){} },
    setScore(v){ S.score = v; setScoreText(v); },
    setInfo(h){ const i = $('gmInfo'); if(i) i.innerHTML = h; },
    toast(msg){
      if(!ov) return; const t = el('div','gm-toast', esc(msg)); ov.appendChild(t); setTimeout(()=>t.remove(), 1500);
    },
    scroll(on){ view.classList.toggle('scroll', on!==false); },
    restart(){ startGame(); },
    on(target, type, fn, opts){ target.addEventListener(type, fn, opts); S.disp.push(()=>target.removeEventListener(type, fn, opts)); },
    onKey(fn, raw){ S.keyFns.push({ fn, raw:!!raw }); },
    every(ms, fn){ const id = setInterval(()=>{ if(!S.paused && !S.ended) fn(); }, ms); S.disp.push(()=>clearInterval(id)); return id; },
    after(ms, fn){
      let id; const run = ()=>{ if(S.paused){ id = setTimeout(run, 120); return; } fn(); };
      id = setTimeout(run, ms); S.disp.push(()=>clearTimeout(id)); return ()=>clearTimeout(id);
    },
    loop(fn){
      let last = 0, id = 0, alive = true;
      const tick = t=>{
        if(!alive) return; id = requestAnimationFrame(tick);
        if(!last) last = t; let dt = (t-last)/1000; last = t; if(dt > .05) dt = .05;
        if(S.paused || S.ended) return; fn(dt, t);
      };
      id = requestAnimationFrame(tick);
      const stop = ()=>{ alive = false; cancelAnimationFrame(id); };
      S.disp.push(stop); return stop;
    },
    fit(elm, aspect, margin){
      const m = margin||0;
      const doFit = ()=>{
        const cw = view.clientWidth - 20 - m, ch = view.clientHeight - 12 - m; if(cw<=0 || ch<=0) return;
        const W = Math.floor(Math.min(cw, ch*aspect)), H = Math.floor(W/aspect);
        elm.style.width = W+'px'; elm.style.height = H+'px'; elm.style.setProperty('--u', (W/100)+'px');
      };
      doFit(); requestAnimationFrame(doFit);
      if(window.ResizeObserver){ const ro = new ResizeObserver(doFit); ro.observe(view); S.disp.push(()=>ro.disconnect()); }
      else { window.addEventListener('resize', doFit); S.disp.push(()=>window.removeEventListener('resize', doFit)); }
    },
    canvas(w,h){
      const cv = document.createElement('canvas'), dpr = Math.min(window.devicePixelRatio||1, 2);
      cv.width = Math.round(w*dpr); cv.height = Math.round(h*dpr); cv.className = 'gm-canvas';
      const g = cv.getContext('2d'); g.setTransform(dpr,0,0,dpr,0,0);
      view.appendChild(cv); api.fit(cv, w/h);
      return { cv, g, w, h, pos(e){ const r = cv.getBoundingClientRect(); return { x:(e.clientX-r.left)*w/r.width, y:(e.clientY-r.top)*h/r.height }; } };
    },
    swipe(elm, fn, o){
      o = o || {}; const th = o.threshold || 26; let sx=0, sy=0, on=false, fired=false;
      api.on(elm,'pointerdown', e=>{ on=true; fired=false; sx=e.clientX; sy=e.clientY; });
      api.on(elm,'pointermove', e=>{
        if(!on) return; const dx=e.clientX-sx, dy=e.clientY-sy;
        if(Math.max(Math.abs(dx),Math.abs(dy)) < th) return;
        if(fired && !o.continuous) return; fired = true;
        fn(Math.abs(dx)>Math.abs(dy) ? (dx>0?'right':'left') : (dy>0?'down':'up'));
        if(o.continuous){ sx=e.clientX; sy=e.clientY; }
      });
      api.on(window,'pointerup', ()=>{ on=false; }); api.on(window,'pointercancel', ()=>{ on=false; });
    },
    buttons(list){
      list.forEach(b=>{
        const x = el('button','gm-key '+(b.cls||''), b.t); if(b.label) x.setAttribute('aria-label', b.label);
        const dn = e=>{
          e.preventDefault(); if(S.paused || S.ended) return; x.classList.add('on'); audio();
          if(b.down) b.down(); if(b.repeat){ clearInterval(x._r); x._r = setInterval(()=>{ if(!S.paused && !S.ended) b.down(); }, b.repeat); }
        };
        const up = e=>{ if(e) e.preventDefault(); x.classList.remove('on'); clearInterval(x._r); if(b.up) b.up(); };
        x.addEventListener('pointerdown', dn); x.addEventListener('pointerup', up);
        x.addEventListener('pointerleave', up); x.addEventListener('pointercancel', up);
        pad.appendChild(x);
      });
    },
    end(score, o){
      if(S.ended) return; o = o || {}; S.ended = true;
      const delay = o.delay==null ? 450 : o.delay;
      const id = setTimeout(()=>showOver(score, o), delay); S.disp.push(()=>clearTimeout(id));
    }
  };
  return api;
}

/* ---------- Fin de partie + classement ---------- */
function showOver(score, o){
  if(!S || !ov) return;
  const d = S.def; let rec = false;
  if(score!=null && d.score!=='none' && (d.score==='low' || score>0)){
    if(S.best==null || (d.score==='low' ? score < S.best : score > S.best)){ rec = true; S.best = score; LS.set('scc_g_best_'+d.id, score); }
  }
  const b = $('gmBest'); if(b) b.textContent = fmtScore(d, S.best);
  const canSave = d.score!=='none' && score!=null && (d.score==='low' || score>0);
  S.finalScore = score;
  if(o.win) SFX.win(); else SFX.lose();
  const nick = LS.get('scc_g_nick','') || (SCCG.session && SCCG.session.name ? String(SCCG.session.name).split(' ')[0] : '');
  showPanel(`<div class="gm-big">${o.win ? '🏆' : d.emoji}</div><h2>${esc(o.title || (o.win ? 'Bravo !' : 'Partie terminée'))}</h2>
    ${score!=null && d.score!=='none' ? `<div class="gm-final">${esc(fmtScore(d,score))}</div>` : ''}
    ${rec ? '<p class="gm-newrec">🏅 Nouveau record !</p>' : ''}
    ${o.msg ? `<p class="gm-msg">${esc(o.msg)}</p>` : ''}
    ${canSave ? `<div class="gm-save"><input id="gmNick" maxlength="18" placeholder="Ton pseudo" value="${esc(nick)}"><button data-a="save">Publier</button></div>` : ''}
    ${d.score!=='none' ? '<div class="gm-board" id="gmBoard"><h3>🏆 Classement</h3><p class="hint" style="text-align:center;">Chargement…</p></div>' : ''}
    <div class="gm-row"><button class="gm-btn primary" style="min-width:150px" data-a="again">↻ Rejouer</button><button class="gm-btn" style="min-width:130px" data-a="quit">Quitter</button></div>`);
  if(d.score!=='none') drawBoard();
}
function showBoardPanel(){
  const d = S.def;
  showPanel(`<div class="gm-big">🏆</div><h2>Classement</h2><p class="gm-bestline">${esc(d.name)}</p>
    <div class="gm-board" id="gmBoard"><p class="hint" style="text-align:center;">Chargement…</p></div>
    <button class="gm-btn primary" data-a="back">Retour</button>`);
  const btn = $('gmPanel').querySelector('[data-a="back"]'); if(btn) btn.onclick = showStart;
  drawBoard(true);
}
async function loadBoard(def){
  if(DB.ready){
    const ref = firebase.database().ref('gameScores/'+def.id);
    const q = def.score==='low' ? ref.orderByChild('score').limitToFirst(10) : ref.orderByChild('score').limitToLast(10);
    const snap = await q.get(); const arr = [];
    snap.forEach(c=>{ arr.push(c.val()); });
    arr.sort((a,b)=> def.score==='low' ? a.score-b.score : b.score-a.score);
    return arr;
  }
  return LS.get('scc_g_lb_'+def.id, []);
}
async function drawBoard(noTitle){
  const box = $('gmBoard'); if(!box || !S) return; const d = S.def;
  let rows;
  try{ rows = await loadBoard(d); }catch(e){ if($('gmBoard')) $('gmBoard').innerHTML = '<p class="hint" style="text-align:center;">Classement indisponible pour le moment.</p>'; return; }
  const bx = $('gmBoard'); if(!bx) return;
  const mine = S.mineKey;
  bx.innerHTML = (noTitle ? '' : '<h3>🏆 Classement</h3>') + (rows.length
    ? '<ol>' + rows.map((r,i)=>`<li class="${mine && r.name===mine.name && r.score===mine.score ? 'me' : ''}"><b>${i+1}</b><span>${esc(r.name)}</span><em>${esc(fmtScore(d, r.score))}</em></li>`).join('') + '</ol>'
    : '<p class="hint" style="text-align:center;">Personne n\'a encore publié de score. Sois le premier !</p>');
}
async function saveScore(){
  if(!S || S.saved) return;
  const inp = $('gmNick'); if(!inp) return;
  const name = inp.value.replace(/[<>]/g,'').trim().slice(0,18);
  if(!name){ SCCG.toastIn('Écris ton pseudo.'); return; }
  S.saved = true; LS.set('scc_g_nick', name);
  const d = S.def, row = { name, score:S.finalScore, ts:Date.now() };
  try{
    if(DB.ready) await firebase.database().ref('gameScores/'+d.id).push(row);
    else { const l = LS.get('scc_g_lb_'+d.id, []); l.push(row); l.sort((a,b)=> d.score==='low' ? a.score-b.score : b.score-a.score); LS.set('scc_g_lb_'+d.id, l.slice(0,10)); }
    S.mineKey = row; SCCG.toastIn('Score publié ✅');
    const w = document.querySelector('.gm-save'); if(w) w.remove();
  }catch(e){ S.saved = false; SCCG.toastIn('Publication impossible pour le moment.'); }
  drawBoard();
}
SCCG.toastIn = function(msg){ if(!ov) return; const t = el('div','gm-toast', esc(msg)); ov.appendChild(t); setTimeout(()=>t.remove(), 1700); };

/* ==========================================================
   ADMIN : onglet « 🎮 Jeux »
   ========================================================== */
const RULES_MSG = "Enregistrement refusé par Firebase : mets à jour les règles de la base de données (fichier database.rules.json, voir README — section Jeux).";
async function saveSettings(){
  try{ await DB.set('gameSettings', { v:1, free:SCCG.settings.free, hidden:SCCG.settings.hidden }); return true; }
  catch(e){ say(RULES_MSG, 'err'); return false; }
}
async function savePasses(){
  try{ await DB.set('gamePasses', SCCG.passes); return true; }
  catch(e){ say(RULES_MSG, 'err'); return false; }
}
SCCG.renderAdmin = async function(){
  if(!$('adminTab-games')) return;
  let orders = {}, plays = {};
  try{ orders = await DB.get('orders', {}) || {}; }catch(e){}
  try{ plays = await DB.get('gamePlays', {}) || {}; }catch(e){}
  const now = Date.now();
  const all = Object.values(orders).filter(o=>o.type==='game-pass');
  const paid = all.filter(o=>o.status==='paid');
  const revenue = paid.reduce((s,o)=>s+(o.price||0),0);
  const activePhones = new Set(paid.filter(o=>o.gameExpiresAt>now).map(o=>digits(o.buyerPhone)));
  const pending = all.filter(o=>o.status==='pending').length;
  $('gameStatsCards').innerHTML = `
    <div class="stat-card"><span class="stat-value">${fmtN(revenue)} FCFA</span><span class="stat-label">Revenu pass jeux</span></div>
    <div class="stat-card"><span class="stat-value">${activePhones.size}</span><span class="stat-label">Joueurs avec pass actif</span></div>
    <div class="stat-card"><span class="stat-value">${paid.length}</span><span class="stat-label">Pass vendus</span></div>
    <div class="stat-card"><span class="stat-value">${pending}</span><span class="stat-label">Pass en attente de validation</span></div>`;
  const top = Object.entries(plays).map(([id,n])=>[findGame(id),n]).filter(x=>x[0]).sort((a,b)=>b[1]-a[1]).slice(0,5);
  $('gameTopPlayed').innerHTML = top.length ? top.map(([g,n],i)=>`<p class="hint" style="margin:4px 0;">${i+1}. ${g.emoji} ${esc(g.name)} — ${fmtN(n)} partie${n>1?'s':''}</p>`).join('') : '<p class="hint">Pas encore de parties enregistrées.</p>';
  renderAdminPasses(); renderAdminGameList();
};
function renderAdminPasses(){
  const box = $('adminGamePassesList'); if(!box) return;
  const list = Object.entries(SCCG.passes).sort((a,b)=>a[1].price-b[1].price);
  box.innerHTML = list.length ? list.map(([id,p])=>`
    <div class="order-card"><div class="row"><strong>${esc(p.name)}</strong><span class="hint" style="margin:0;">${fmtN(p.price)} FCFA — ${p.days} jour${p.days>1?'s':''}</span></div>
    <div style="display:flex;gap:8px;margin-top:8px;">
      <button class="btn btn-ghost" style="margin:0;width:auto;padding:8px 14px;" data-gpedit="${id}">✏️ Modifier</button>
      <button class="btn btn-ghost" style="margin:0;width:auto;padding:8px 14px;" data-gpdel="${id}">🗑️ Supprimer</button></div></div>`).join('')
    : '<p class="hint">Aucun pass — ajoute-en un ci-dessous.</p>';
  box.querySelectorAll('[data-gpedit]').forEach(b=> b.onclick = async ()=>{
    const id = b.dataset.gpedit, p = SCCG.passes[id];
    const name = prompt('Nom du pass :', p.name); if(name===null) return;
    const days = parseInt(prompt('Durée en jours :', p.days)); if(isNaN(days) || days<1) return;
    const price = parseInt(prompt('Prix en FCFA :', p.price)); if(isNaN(price) || price<0) return;
    SCCG.passes[id] = Object.assign({}, p, { name, days, price });
    if(await savePasses()){ say('Pass mis à jour.', 'ok'); }
    renderAdminPasses(); SCCG.renderHub();
  });
  box.querySelectorAll('[data-gpdel]').forEach(b=> b.onclick = async ()=>{
    if(Object.keys(SCCG.passes).length <= 1) return say('Il doit rester au moins un pass.', 'err');
    if(!confirm('Supprimer ce pass ? Les joueurs qui l\'ont déjà acheté gardent leur accès jusqu\'à expiration.')) return;
    delete SCCG.passes[b.dataset.gpdel];
    if(await savePasses()) say('Pass supprimé.', 'ok');
    renderAdminPasses(); SCCG.renderHub();
  });
}
SCCG.addPass = async function(){
  const name = $('newGpName').value.trim(), days = parseInt($('newGpDays').value), price = parseInt($('newGpPrice').value);
  if(!name || !days || isNaN(price)) return say('Remplis le nom, la durée et le prix.', 'err');
  SCCG.passes['gp'+Date.now()] = { name, days, price, createdAt:Date.now() };
  if(await savePasses()){ $('newGpName').value=''; $('newGpDays').value=''; $('newGpPrice').value=''; say('Nouveau pass ajouté !', 'ok'); }
  renderAdminPasses(); SCCG.renderHub();
};
function renderAdminGameList(){
  const box = $('adminGamesList'); if(!box) return;
  box.innerHTML = SCCG.games.map(g=>`
    <div class="order-card" style="padding:10px 12px;margin-bottom:8px;">
      <div class="row" style="margin-bottom:4px;"><strong>${g.emoji} ${esc(g.name)}</strong><span class="hint" style="margin:0;">${esc(g.cat)}</span></div>
      <div style="display:flex;gap:18px;">
        <label class="hint" style="margin:0;"><input type="checkbox" data-gfree="${g.id}" ${isFree(g)?'checked':''}> 🎁 Gratuit</label>
        <label class="hint" style="margin:0;"><input type="checkbox" data-ghide="${g.id}" ${SCCG.settings.hidden[g.id]?'checked':''}> 🙈 Masqué</label>
      </div></div>`).join('');
  box.querySelectorAll('[data-gfree]').forEach(c=> c.onchange = async ()=>{
    if(c.checked) SCCG.settings.free[c.dataset.gfree] = true; else delete SCCG.settings.free[c.dataset.gfree];
    await saveSettings(); SCCG.renderHub();
  });
  box.querySelectorAll('[data-ghide]').forEach(c=> c.onchange = async ()=>{
    if(c.checked) SCCG.settings.hidden[c.dataset.ghide] = true; else delete SCCG.settings.hidden[c.dataset.ghide];
    await saveSettings(); SCCG.renderHub();
  });
}
SCCG.setAllFree = async function(on){
  SCCG.settings.free = {}; if(on) SCCG.games.forEach(g=>{ SCCG.settings.free[g.id] = true; });
  await saveSettings(); renderAdminGameList(); SCCG.renderHub();
  say(on ? 'Tous les jeux sont gratuits.' : 'Tous les jeux demandent un pass.', 'ok');
};
})();

/* ACCÈS DE LA CHAÎNE : gratuit / payant (réglage admin) + message important pour les spectateurs.
   Enregistré dans LIVE_SETTINGS.freeAccess = { on, until, message } et LIVE_SETTINGS.notice = { text, ts } (même base que les autres réglages de la chaîne). */
(function(){
'use strict';
const $ = id => document.getElementById(id);
const S = () => (typeof LIVE_SETTINGS !== 'undefined' && LIVE_SETTINGS) || {};
const free = () => { const f = S().freeAccess; return f && f.on && (!f.until || f.until > Date.now()) ? f : null; };
const say = (m, k) => { try{ toast(m, k || 'ok'); }catch(e){} };
const save = () => DB.set('liveSettings', LIVE_SETTINGS);
const when = ts => new Date(ts).toLocaleString('fr-FR', { weekday:'short', day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' });
const esc = s => String(s || '').replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));

/* ---- Côté spectateur : un accès gratuit vaut un pass valide ---- */
const orig = window.liveAccessGranted;
const virtual = f => { if(!LIVE_SESSION) LIVE_SESSION = { phone:'gratuit', code:'', free:true, expiresAt: f.until || Date.now() + 864e5 }; else if(LIVE_SESSION.free) LIVE_SESSION.expiresAt = f.until || Date.now() + 864e5; };   /* session virtuelle : le reste de l'application la lit */
if(typeof orig === 'function') window.liveAccessGranted = function(){ const f = free(); if(f){ virtual(f); return true; } return orig(); };
let wasFree = false;
function viewerSync(){
  const A = $('liveAccessWrap'), P = $('livePlayerWrap'), scr = $('screen-live');
  if(!A || !P || !scr) return;
  let b = $('sccsBanner');
  if(!b){ b = document.createElement('div'); b.id = 'sccsBanner'; b.style.cssText = 'display:none;margin:10px 0;padding:12px;border-radius:14px;background:#d98a4c;color:#fff;font:700 15px/1.4 system-ui,sans-serif;text-align:center'; (A.parentElement || scr).insertBefore(b, A); }
  const f = free(), n = S().notice;
  if(f) virtual(f);
  else if(LIVE_SESSION && LIVE_SESSION.free) LIVE_SESSION = null;
  const paid = !!LIVE_SESSION && !LIVE_SESSION.free && LIVE_SESSION.expiresAt > Date.now();
  const parts = [];
  if(f) parts.push('🎁 Chaîne GRATUITE' + (f.until ? ' jusqu\'au ' + when(f.until) : '') + (f.message ? ' — ' + esc(f.message) : ''));
  if(n && n.text && !(f && f.message === n.text)) parts.push('📣 ' + esc(n.text));
  b.innerHTML = parts.join('<br>'); b.style.display = parts.length ? 'block' : 'none';
  if(!scr.classList.contains('active')) return;
  if(f && !paid && P.style.display !== 'block'){
    wasFree = true; A.style.display = 'none'; P.style.display = 'block';
    try{ checkLiveStatus(); clearInterval(LIVE_STATUS_TIMER); LIVE_STATUS_TIMER = setInterval(checkLiveStatus, 20000); }catch(e){}
  } else if(!f && wasFree && !paid){
    wasFree = false; P.style.display = 'none'; A.style.display = '';
    try{ clearTimeout(PLAYLIST_TIMER); clearInterval(LIVE_STATUS_TIMER); stopPlayback(); }catch(e){}
  }
}
setInterval(viewerSync, 3000);

/* ---- Côté admin : bloc de réglage dans les réglages de la chaîne ---- */
function adminBuild(){
  const btn = $('saveLiveSettingsBtn'); if(!btn || $('faBox')) return;
  const box = document.createElement('div'); box.id = 'faBox';
  box.style.cssText = 'margin:18px 0;padding:14px;border-radius:14px;background:rgba(127,127,127,.12)';
  box.innerHTML = '<p class="field-label" style="margin-top:0">🎁 Chaîne gratuite ou payante</p><p class="hint">Jours de grâce, jours exceptionnels, promotion de ta chaîne et de tes activités : passe la chaîne en gratuit, et ajoute un message pour tous tes spectateurs.</p>'
   + '<p id="faState" style="font-weight:700;margin:8px 0"></p>'
   + '<textarea id="faMsg" rows="3" style="width:100%;box-sizing:border-box;padding:10px;border-radius:10px;border:1px solid #ccc;font:inherit" placeholder="Message pour tes spectateurs (ex : Jour de grâce, la chaîne est offerte jusqu\'à minuit !)"></textarea>'
   + '<p class="hint" style="margin:8px 0 4px">Durée du mode gratuit :</p><select id="faDur" style="width:100%;padding:10px;border-radius:10px"><option value="0">Jusqu\'à ce que je le coupe</option><option value="1">1 heure</option><option value="3">3 heures</option><option value="6">6 heures</option><option value="24">24 heures</option><option value="72">3 jours</option><option value="168">7 jours</option></select>'
   + '<label style="display:block;margin:10px 0"><input type="checkbox" id="faNotif" checked> 📢 Envoyer aussi une notification aux spectateurs</label>'
   + '<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-primary" style="margin:0" id="faOn">🎁 Passer en GRATUIT</button><button class="btn btn-ghost" style="margin:0" id="faOff">🔒 Repasser en PAYANT</button></div>'
   + '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px"><button class="btn btn-ghost" style="margin:0" id="faPub">📣 Publier seulement le message</button><button class="btn btn-ghost" style="margin:0" id="faClr">🧹 Retirer le message</button></div>';
  btn.insertAdjacentElement('beforebegin', box);
  const msg = () => $('faMsg').value.trim();
  const push = text => { LIVE_SETTINGS.notice = { text, ts: Date.now() }; if($('faNotif').checked) LIVE_SETTINGS.announcement = { message: text, ts: Date.now() }; };
  $('faOn').onclick = async () => {
    const h = Number($('faDur').value), m = msg();
    LIVE_SETTINGS.freeAccess = { on:true, until: h ? Date.now() + h * 3600e3 : 0, message: m };
    if(m) push(m); else if($('faNotif').checked) LIVE_SETTINGS.announcement = { message:'🎁 La chaîne est GRATUITE, profite-en !', ts: Date.now() };
    try{ await save(); say('🎁 La chaîne est maintenant GRATUITE pour tout le monde.'); }catch(e){ say('Enregistrement impossible, réessaie.', 'err'); }
    adminState(); viewerSync();
  };
  $('faOff').onclick = async () => {
    LIVE_SETTINGS.freeAccess = { on:false, until:0, message:'' };
    try{ await save(); say('🔒 La chaîne est repassée en PAYANT.'); }catch(e){ say('Enregistrement impossible, réessaie.', 'err'); }
    adminState(); viewerSync();
  };
  $('faPub').onclick = async () => {
    const m = msg(); if(!m) return say('Écris d\'abord ton message.', 'err');
    push(m); try{ await save(); say('📣 Message publié pour tous tes spectateurs.'); }catch(e){ say('Enregistrement impossible, réessaie.', 'err'); }
    adminState(); viewerSync();
  };
  $('faClr').onclick = async () => {
    delete LIVE_SETTINGS.notice; if(LIVE_SETTINGS.freeAccess) LIVE_SETTINGS.freeAccess.message = '';
    try{ await save(); say('Message retiré.'); }catch(e){ say('Enregistrement impossible, réessaie.', 'err'); }
    adminState(); viewerSync();
  };
  adminState();
}
function adminState(){
  const el = $('faState'); if(!el) return; const f = free();
  el.textContent = f ? '🎁 État actuel : GRATUIT' + (f.until ? ' jusqu\'au ' + when(f.until) : ' (jusqu\'à ce que tu le coupes)') : '🔒 État actuel : PAYANT';
}
/* ---- Œil 👁 pour voir / cacher le mot de passe admin (évite les fautes de frappe) ---- */
function eyes(){
  ['newPwInput', 'clientCodeInput', 'liveCodeInput', 'gmLoginCode'].forEach(id => {
    const i = $(id); if(!i || i.dataset.eye) return; i.dataset.eye = '1'; i.type = 'password'; i.setAttribute('autocomplete', 'off');
    const w = document.createElement('div'); w.style.cssText = 'position:relative'; i.parentNode.insertBefore(w, i); w.appendChild(i); i.style.paddingRight = '52px';
    const b = document.createElement('button'); b.type = 'button'; b.title = 'Voir / cacher le mot de passe'; b.textContent = '👁';
    b.style.cssText = 'position:absolute;right:6px;top:50%;transform:translateY(-50%);border:0;background:none;font-size:22px;cursor:pointer;padding:6px';
    b.onclick = () => { const show = i.type === 'password'; i.type = show ? 'text' : 'password'; b.textContent = show ? '🙈' : '👁'; };
    w.appendChild(b);
  });
}
/* ---- Bouton « Changer mon code d'accès » juste sous « Plein écran » (une fois connecté avec un pass) ---- */
function codeBtn(){
  const fs = $('liveFsBtn'); if(!fs) return;
  let b = $('liveChangeCodeBtn');
  if(!b){
    b = document.createElement('button'); b.id = 'liveChangeCodeBtn'; b.type = 'button'; b.className = fs.className; b.style.cssText = fs.style.cssText;
    b.textContent = '🔑 Changer mon code d\'accès';
    b.onclick = () => { try{ uiChangePassCode(LIVE_SESSION.phone, LIVE_SESSION.code); }catch(e){ say('Connecte-toi d\'abord avec ton pass.', 'err'); } };
    fs.insertAdjacentElement('afterend', b);
  }
  b.style.display = (typeof LIVE_SESSION !== 'undefined' && LIVE_SESSION && !LIVE_SESSION.free) ? '' : 'none';
}

/* ---- Admin : codes chaîne + jeux de tous les clients, et journal des connexions / changements ---- */
const dg = s => String(s || '').replace(/\D/g, '');
const dt = ts => ts ? new Date(ts).toLocaleString('fr-FR', { day:'2-digit', month:'2-digit', hour:'2-digit', minute:'2-digit' }) : '—';
let passBusy = false;
function passBuild(){
  const host = $('adminTab-live'); if(!host || $('passAdminBox')) return;
  const b = document.createElement('div'); b.id = 'passAdminBox';
  b.style.cssText = 'margin:0 0 16px;padding:14px;border-radius:14px;background:rgba(127,127,127,.12)';
  b.innerHTML = '<p class="field-label" style="margin:0">🔑 Codes d\'accès chaîne + jeux</p><p class="hint" id="paSum" style="margin:6px 0"></p><div id="paList"></div><p class="field-label" style="margin:14px 0 4px">🕘 Dernières connexions et changements</p><div id="paEv" class="hint"></div>';
  const vb = $('viewersBox'); if(vb) vb.insertAdjacentElement('afterend', b); else host.insertBefore(b, host.firstChild);
}
async function passRefresh(){
  const box = $('passAdminBox'); if(!box || !box.offsetParent || passBusy) return; passBusy = true;
  try{
    const [orders, ev] = await Promise.all([DB.get('orders', {}), DB.get('passEvents', {}).catch(() => ({}))]);
    const by = {}, now = Date.now();
    Object.values(orders || {}).forEach(o => {
      if(!o || (o.type !== 'live-pass' && o.type !== 'game-pass') || o.status !== 'paid') return;
      const k = dg(o.buyerPhone), r = by[k] = by[k] || { name:'', phone:o.buyerPhone, code:'', ch:0, jx:0, chg:0 };
      r.name = o.buyerName || r.name; r.phone = o.buyerPhone;
      if(!r.code || (o.passCodeChangedAt || 0) >= r.chg){ r.code = o.passCode || o.accessCode || r.code; r.chg = o.passCodeChangedAt || r.chg; }
      if(o.type === 'live-pass') r.ch = Math.max(r.ch, o.liveExpiresAt || 0); else r.jx = Math.max(r.jx, o.gameExpiresAt || 0);
    });
    const rows = Object.values(by).sort((a, b) => Math.max(b.ch, b.jx) - Math.max(a.ch, a.jx));
    const act = (t) => t > now ? '✅ jusqu\'au ' + dt(t) : (t ? '⌛ expiré le ' + dt(t) : '—');
    $('paSum').textContent = rows.length + ' client(s) avec pass · chaîne active : ' + rows.filter(r => r.ch > now).length + ' · jeux actifs : ' + rows.filter(r => r.jx > now || r.ch > now).length;
    $('paList').innerHTML = rows.slice(0, 40).map(r => '<div style="padding:8px 0;border-top:1px solid rgba(127,127,127,.25);font-size:14px"><b>' + esc(r.name || 'Sans nom') + '</b> · ' + esc(r.phone) + '<br>🔑 <b style="letter-spacing:1px">' + esc(r.code) + '</b>' + (r.chg ? ' <span class="hint">(changé le ' + dt(r.chg) + ')</span>' : '') + '<br>📺 Chaîne : ' + act(r.ch) + '<br>🎮 Jeux : ' + act(Math.max(r.jx, r.ch)) + '</div>').join('') || '<p class="hint">Aucun pass payé pour l\'instant.</p>';
    const L = { login:'connexion', 'change-code':'changement de code' };
    $('paEv').innerHTML = Object.values(ev || {}).sort((a, b) => (b.ts || 0) - (a.ts || 0)).slice(0, 15).map(e => dt(e.ts) + ' · ' + esc(e.phone) + ' · ' + (L[e.action] || esc(e.action)) + ' (' + esc(e.service) + ')').join('<br>') || 'Rien pour l\'instant.';
  }catch(e){ const l = $('paSum'); if(l) l.textContent = '⚠️ Lecture impossible : vérifie les règles Firebase (passEvents).'; }
  passBusy = false;
}
setInterval(() => { passBuild(); passRefresh(); }, 6000);
setInterval(() => { adminBuild(); adminState(); eyes(); codeBtn(); }, 2000);
})();

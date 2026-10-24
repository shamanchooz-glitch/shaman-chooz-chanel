/* SPECTATEURS EN DIRECT — chaque spectateur qui regarde la chaîne envoie un signal toutes les ~20 s dans Firebase (livePresence/…).
   L'admin voit le nombre en temps réel en haut de l'onglet « Chaîne en direct ». Un signal de plus de 60 s n'est plus compté. */
(function(){
'use strict';
const $ = id => document.getElementById(id);
const fb = () => (window.firebase && firebase.database) ? firebase.database() : null;
const ready = () => typeof DB !== 'undefined' && DB.ready && !!fb();
const ID = 'v' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);

/* ---- Côté spectateur ---- */
let on = false, last = 0;
const watching = () => { const s = $('screen-live'), P = $('livePlayerWrap'); return !!(s && s.classList.contains('active') && P && P.style.display === 'block' && !document.hidden); };
function tick(){
  if(!ready()) return;
  const r = fb().ref('livePresence/' + ID), w = watching();
  if(w && (!on || Date.now() - last > 20000)){
    last = Date.now(); r.set({ t: firebase.database.ServerValue.TIMESTAMP }).catch(() => {});
    if(!on){ on = true; try{ r.onDisconnect().remove(); }catch(e){} }
  } else if(!w && on){ on = false; r.remove().catch(() => {}); }
}
setInterval(tick, 3000);
window.addEventListener('pagehide', () => { if(on && ready()) fb().ref('livePresence/' + ID).remove().catch(() => {}); });

/* ---- Côté admin ---- */
let off = null, snap = {}, offset = 0, peak = 0, denied = false;
function build(){
  const host = $('adminTab-live'); if(!host || $('viewersBox')) return;
  const b = document.createElement('div'); b.id = 'viewersBox';
  b.style.cssText = 'margin:0 0 16px;padding:14px;border-radius:14px;background:rgba(127,127,127,.12);text-align:center';
  b.innerHTML = '<p class="field-label" style="margin:0">👁 Spectateurs en direct</p><div id="vwN" style="font-size:52px;font-weight:800;line-height:1.1;margin:6px 0">–</div><p id="vwS" class="hint" style="margin:0"></p>';
  host.insertBefore(b, host.firstChild);
}
function render(){
  const n = $('vwN'), s = $('vwS'); if(!n) return;
  if(!ready()){ n.textContent = '–'; s.textContent = 'Compteur disponible quand le site est connecté à Firebase.'; return; }
  if(denied){ n.textContent = '–'; s.textContent = '⚠️ Accès refusé : ajoute la règle « livePresence » dans Firebase (voir les instructions).'; return; }
  const now = Date.now() + offset; let c = 0;
  Object.keys(snap).forEach(k => { const t = snap[k] && snap[k].t; if(t && now - t < 60000) c++; });
  peak = Math.max(peak, c);
  n.textContent = c; s.textContent = c === 0 ? 'Personne ne regarde en ce moment.' : (c === 1 ? '1 personne regarde la chaîne' : c + ' personnes regardent la chaîne') + ' · pic depuis l\'ouverture de cette page : ' + peak;
}
function attach(){
  const box = $('viewersBox'), vis = !!(box && box.offsetParent);
  if(vis && !off && ready()){
    const q = fb().ref('livePresence');
    fb().ref('.info/serverTimeOffset').once('value').then(s => { offset = s.val() || 0; }).catch(() => {});
    const cb = s => { snap = s.val() || {}; denied = false; render(); const now = Date.now() + offset;
      Object.keys(snap).forEach(k => { const t = snap[k] && snap[k].t; if(!t || now - t > 300000) q.child(k).remove().catch(() => {}); }); };
    const err = () => { denied = true; render(); };
    q.on('value', cb, err); off = () => q.off('value', cb);
  } else if(!vis && off){ off(); off = null; snap = {}; }
}
setInterval(() => { build(); attach(); render(); }, 2000);
})();

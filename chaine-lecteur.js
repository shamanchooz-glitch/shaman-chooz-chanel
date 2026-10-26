/* ==========================================================
   CHAÎNE — LECTEUR SPECTATEUR (type YouTube) + BOUCLE QUI NE S'ARRÊTE JAMAIS
   Fichier à ajouter tel quel, sans toucher aux autres : voir la ligne à coller dans index.html.
   - Choisir n'importe quel diaporama dans une liste (recherche + catégories)
   - ⏮ précédent · ⏪ −10 s · ⏯ pause · ⏩ +10 s · ⏭ suivant · barre de progression cliquable
   - À la fin d'un diaporama choisi, le suivant démarre tout seul, et la liste repart au début : ça ne s'arrête jamais
   - « Retour à l'antenne » ramène le spectateur sur le direct (la boucle commune 24h/24)
   - Surveillance : si la lecture se bloque (onglet endormi, coupure), elle repart toute seule
   ========================================================== */
(function(){
'use strict';
if(!window.SCCS || !SCCS.playlist) return;
const BOXES = ['#livePlayerWrap .live-player-box', '#adminPreviewBox'], ALL = BOXES.join(',');   /* lecteur des spectateurs + aperçu admin */
const origPlay = SCCS.play, origStop = SCCS.stop;
let free = null, internal = false, miss = 0, LIST = null, ui = null;
const $ = s => document.querySelector(s);
const raw = fn => { internal = true; try{ return fn(); } finally{ internal = false; } };
const fmt = s => { s = Math.max(0, Math.floor(s)); return Math.floor(s/60) + ':' + String(s%60).padStart(2,'0'); };
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const list = () => LIST || (LIST = SCCS.playlist().filter(i => i.type === 'slides'));
const show = id => SCCS.byId[id];
const shown = b => !!b && b.getClientRects().length > 0;   /* vrai aussi en plein écran (position:fixed → offsetParent vide) */
const visibleBox = () => { for(const q of BOXES){ const b = $(q); if(shown(b)) return b; } return null; };
const activeBox = () => { for(const q of BOXES){ const b = $(q); if(shown(b) && b.querySelector('[data-slides],.sccs-frozen')) return b; } return null; };

/* Quand le spectateur a choisi lui-même, la boucle commune ne doit pas lui reprendre l'écran */
SCCS.play = function(host, id, off, opt){
  if(!internal && free && host && host.matches && host.matches(ALL)) return true;
  return origPlay.apply(this, arguments);
};
SCCS.stop = function(host){
  if(!internal && free && host && host.matches && host.matches(ALL)) return;
  return origStop.apply(this, arguments);
};

function liveState(){ try{ return typeof currentPlaylistState === 'function' ? currentPlaylistState() : null; }catch(e){ return null; } }
function now(){
  if(free) return free.paused ? free.ft : (performance.now() - free.t0) / 1000;
  const st = liveState(); return st && st.item.type === 'slides' ? st.offset : 0;
}
function curId(){
  if(free) return free.id;
  const st = liveState(); return st && st.item.type === 'slides' ? st.item.ref : null;
}
function clearFrozen(){ const f = document.querySelector('.sccs-frozen'); if(f) f.remove(); }

function playAt(i, off){
  const L = list(); if(!L.length) return;
  i = ((i % L.length) + L.length) % L.length;
  const it = L[i], box = activeBox() || visibleBox(); if(!box) return;
  free = free || {};
  Object.assign(free, { idx:i, id:it.ref, dur:SCCS.duration(it.ref), t0:performance.now() - off*1000, paused:false });
  clearFrozen();
  raw(() => origPlay.call(SCCS, box, it.ref, off, { main: box.id !== 'adminPreviewBox' }));
  paint();
}
function enterFree(){            /* passe du direct au mode « je choisis », à l'endroit exact du direct */
  if(free) return;
  const st = liveState(), L = list();
  const idx = st && st.item.type === 'slides' ? L.findIndex(x => x.ref === st.item.ref) : 0;
  free = { idx: Math.max(0, idx) };
}
function go(delta){ enterFree(); playAt(free.idx + delta, 0); }
function seekTo(t){
  if(!free){ const id = curId(); if(!id) return; enterFree(); }
  const d = SCCS.duration(free.id || curId()); t = Math.min(Math.max(0, t), d - 1);
  if(free.paused){ free.ft = t; drawFrozen(); } else playAt(free.idx, t);
}
function drawFrozen(){
  const f = document.querySelector('.sccs-frozen canvas'); if(!f) return;
  try{ SCCS.drawFrame(f.getContext('2d'), free.id, free.ft); }catch(e){}
}
function togglePause(){
  if(!curId()) return;
  if(!free){ enterFree(); const st = liveState(); free.id = st.item.ref; free.dur = SCCS.duration(free.id); free.t0 = performance.now() - st.offset*1000; }
  const box = activeBox(); if(!box) return;
  if(free.paused){ playAt(free.idx, free.ft); return; }
  const cv0 = box.querySelector('[data-slides] canvas'), w = cv0 ? cv0.width : 1280, h = cv0 ? cv0.height : 720;
  free.ft = (performance.now() - free.t0) / 1000; free.paused = true;
  raw(() => origStop.call(SCCS, box));
  const d = document.createElement('div'); d.className = 'sccs-frozen';
  d.style.cssText = 'position:relative;width:100%;border-radius:14px;overflow:hidden;background:#000;aspect-ratio:16/9;';
  d.innerHTML = '<canvas width="' + w + '" height="' + h + '" style="display:block;width:100%;height:100%"></canvas><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:64px;color:#fff;text-shadow:0 2px 12px #000;pointer-events:none">⏸</div>';
  box.insertBefore(d, box.firstChild); drawFrozen(); paint();
}
function backToLive(){
  const box = activeBox() || visibleBox(), adm = !!box && box.id === 'adminPreviewBox'; free = null; clearFrozen();
  if(box) raw(() => origStop.call(SCCS, box));
  try{ if(adm && window.ADMINPREVIEW){ ADMINPREVIEW.stop(); ADMINPREVIEW.start(); } else { CURRENT_PLAY_KEY = ''; checkLiveStatus(); } }catch(e){}
  paint();
}

/* ---------- Interface ---------- */
function build(){
  if(ui) return;
  const st = document.createElement('style');
  st.textContent = '#sccsCtl{margin:10px 0;padding:10px;border-radius:14px;background:rgba(127,127,127,.12);display:none;font:600 14px/1.3 system-ui,sans-serif}#sccsCtl .r{display:flex;gap:8px;align-items:center;justify-content:center;margin-top:8px;flex-wrap:wrap}#sccsCtl button{border:0;border-radius:12px;padding:10px 14px;font:700 18px system-ui,sans-serif;background:#d98a4c;color:#fff;cursor:pointer;min-width:48px}#sccsCtl button.b2{background:rgba(127,127,127,.28);color:inherit;font-size:14px}#sccsCtl input[type=range]{flex:1;min-width:0;accent-color:#d98a4c}#sccsCtl .t{font-variant-numeric:tabular-nums;font-size:12px;opacity:.8}#sccsPick{position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.55);display:none}#sccsPick .sh{position:absolute;left:0;right:0;bottom:0;top:6%;background:#fff;color:#222;border-radius:18px 18px 0 0;display:flex;flex-direction:column;padding:12px}#sccsPick input{width:100%;box-sizing:border-box;padding:12px;border-radius:12px;border:1px solid #ccc;font-size:16px}#sccsPick .ch{display:flex;gap:6px;overflow-x:auto;padding:8px 0}#sccsPick .ch b{white-space:nowrap;padding:6px 12px;border-radius:999px;background:#eee;font-size:13px;cursor:pointer}#sccsPick .ch b.on{background:#d98a4c;color:#fff}#sccsPick .ls{flex:1;overflow:auto}#sccsPick .it{display:flex;justify-content:space-between;gap:8px;width:100%;text-align:left;border:0;background:none;border-bottom:1px solid #eee;padding:12px 4px;font-size:15px;color:#222;cursor:pointer}#sccsPick .it.on{background:#fbe9db}#sccsPick small{opacity:.6;white-space:nowrap}';
  document.head.appendChild(st);
  const c = document.createElement('div'); c.id = 'sccsCtl';
  c.innerHTML = '<div id="sccsLbl"></div><div class="r"><span class="t" id="sccsT0">0:00</span><input type="range" id="sccsBar" min="0" max="1000" value="0"><span class="t" id="sccsT1">0:00</span></div><div class="r"><button data-a="prev" title="Précédent">⏮</button><button data-a="-10" title="Reculer 10 s">⏪</button><button data-a="pp" id="sccsPP" title="Pause / lecture">⏸</button><button data-a="+10" title="Avancer 10 s">⏩</button><button data-a="next" title="Suivant">⏭</button></div><div class="r"><button class="b2" data-a="pick">📋 Choisir une vidéo</button><button class="b2" data-a="live" id="sccsLive">🔴 Retour à l\'antenne</button></div>';
  const p = document.createElement('div'); p.id = 'sccsPick';
  p.innerHTML = '<div class="sh"><div style="display:flex;gap:8px"><input id="sccsQ" type="search" placeholder="🔎 Chercher une vidéo…"><button class="b2" data-a="close" style="border:0;border-radius:12px;padding:0 16px;font-size:18px">✕</button></div><div class="ch" id="sccsCh"></div><div class="ls" id="sccsLs"></div></div>';
  document.body.appendChild(p);
  ui = { c, p, bar:c.querySelector('#sccsBar'), drag:false, cat:'' };
  c.addEventListener('click', e => act(e.target.closest('button')));
  p.addEventListener('click', e => { const b = e.target.closest('[data-a],[data-id]'); if(e.target === p) fillClose(); else if(b && b.dataset.id) pickId(b.dataset.id); else if(b) act(b); const ch = e.target.closest('[data-cat]'); if(ch){ ui.cat = ch.dataset.cat; fill(); } });
  $('#sccsQ').addEventListener('input', fill);
  ui.bar.addEventListener('input', () => { ui.drag = true; ui.c.querySelector('#sccsT0').textContent = fmt(ui.bar.value / 1000 * dur()); });
  ui.bar.addEventListener('change', () => { seekTo(ui.bar.value / 1000 * dur()); ui.drag = false; });
  document.addEventListener('keydown', e => {
    if(!ui.c.offsetParent || /INPUT|TEXTAREA/.test((e.target.tagName || '')) && e.target.type !== 'range') return;
    if(e.key === ' ' || e.key === 'k'){ e.preventDefault(); togglePause(); }
    else if(e.key === 'ArrowLeft') seekTo(now() - 10); else if(e.key === 'ArrowRight') seekTo(now() + 10);
    else if(e.key === 'n') go(1); else if(e.key === 'p') go(-1);
  });
}
const dur = () => { const id = curId(); return id ? SCCS.duration(id) : 1; };
function act(b){
  if(!b) return; const a = b.dataset.a;
  try{ act2(a); }catch(e){ const l = ui.c.querySelector('#sccsLbl'); if(l) l.textContent = '⚠️ ' + (e && e.message || e); }
}
function act2(a){
  if(a === 'prev') go(-1); else if(a === 'next') go(1); else if(a === 'pp') togglePause();
  else if(a === '-10') seekTo(now() - 10); else if(a === '+10') seekTo(now() + 10);
  else if(a === 'live') backToLive(); else if(a === 'pick'){ ui.p.style.display = 'block'; fill(); } else if(a === 'close') fillClose();
}
function fillClose(){ ui.p.style.display = 'none'; }
function pickId(id){ enterFree(); playAt(list().findIndex(x => x.ref === id), 0); fillClose(); }
function fill(){
  const q = ($('#sccsQ').value || '').toLowerCase(), cats = [...new Set(SCCS.shows.map(s => s.cat))], cur = curId();
  $('#sccsCh').innerHTML = ['Tout'].concat(cats).map(c => '<b data-cat="' + (c === 'Tout' ? '' : esc(c)) + '" class="' + ((ui.cat || 'Tout') === c ? 'on' : '') + '">' + esc(c) + '</b>').join('');
  $('#sccsLs').innerHTML = list().map(i => show(i.ref)).filter(s => s && (!ui.cat || s.cat === ui.cat) && (!q || s.titre.toLowerCase().includes(q)))
    .map(s => '<button class="it' + (s.id === cur ? ' on' : '') + '" data-id="' + esc(s.id) + '"><span>' + esc(s.titre) + '</span><small>' + esc(s.cat) + ' · ' + fmt(s.dur) + '</small></button>').join('') || '<p>Aucun résultat.</p>';
}
function paint(){
  if(!ui) return;
  const id = curId(), sh = id && show(id), box = activeBox();
  ui.c.style.display = box && sh ? 'block' : 'none'; if(!box || !sh) return;
  if(ui.c.previousElementSibling !== box) box.insertAdjacentElement('afterend', ui.c);   /* la barre se place juste sous le lecteur visible */
  ui.c.querySelector('#sccsLbl').innerHTML = (free ? '▶️ Ton choix : ' : '🔴 En direct : ') + esc(sh.titre);
  ui.c.querySelector('#sccsPP').textContent = free && free.paused ? '▶️' : '⏸';
  ui.c.querySelector('#sccsLive').style.display = free ? '' : 'none';
}
setInterval(() => {                      /* barre de progression + enchaînement automatique */
  if(!ui) build(); if(!ui) return;
  const id = curId(); if(!id) return paint();
  const d = SCCS.duration(id), t = now();
  if(free && !free.paused && t >= d - .05) return go(1);          /* fin → suivant, et on recommence après le dernier : sans fin */
  if(!ui.drag){ ui.bar.value = Math.min(1000, t / d * 1000); ui.c.querySelector('#sccsT0').textContent = fmt(t); }
  ui.c.querySelector('#sccsT1').textContent = fmt(d); paint();
}, 500);
function watchdog(){                      /* si ça se bloque, ça repart tout seul */
  const box = activeBox() || visibleBox(); if(!box || document.hidden) return;
  const has = !!box.querySelector('[data-slides],.sccs-frozen');
  if(free){ if(!has && !free.paused) playAt(free.idx, Math.max(0, now())); return; }
  const st = liveState();
  if(st && st.item.type === 'slides' && !has){ if(++miss >= 2){ miss = 0; try{ if(box.id === 'adminPreviewBox' && window.ADMINPREVIEW){ ADMINPREVIEW.stop(); ADMINPREVIEW.start(); } else { CURRENT_PLAY_KEY = ''; checkLiveStatus(); } }catch(e){} } } else miss = 0;
}
setInterval(watchdog, 4000);
['visibilitychange', 'pageshow', 'focus', 'online'].forEach(ev => window.addEventListener(ev, () => setTimeout(watchdog, 300)));
document.addEventListener('visibilitychange', () => { if(!document.hidden) setTimeout(watchdog, 300); });
})();

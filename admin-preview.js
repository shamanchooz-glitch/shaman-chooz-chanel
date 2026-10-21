/* ==========================================================
   APERÇU DE LA CHAÎNE DANS L'ESPACE ADMINISTRATEUR
   - Tu vois la chaîne exactement comme tes clients (direct ou boucle), sans pass.
   - Bouton « Plein écran » (aussi disponible pour tes clients sous leur lecteur).
   - Le PROGRAMME s'affiche en même temps : programme en cours, heures des
     prochains programmes, durée totale de la boucle.
   Ce fichier s'appuie sur les fonctions de app.js (resolveLiveSource,
   currentPlaylistState, effectivePlaylist…) : il n'invente rien, il montre
   la même chose que ce que reçoivent les spectateurs.
   ========================================================== */
(function(){
'use strict';
const A = window.ADMINPREVIEW = {};
const $ = id => document.getElementById(id);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clock = ms => new Date(ms).toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit' });
const dur = s => { s = Math.round(s); const h = Math.floor(s/3600), m = Math.floor(s%3600/60), r = s%60; return h ? h + ' h ' + String(m).padStart(2,'0') : (m ? m + ' min' + (r ? ' ' + r + ' s' : '') : r + ' s'); };
const mmss = s => { s = Math.max(0, Math.round(s)); return Math.floor(s/60) + ':' + String(s%60).padStart(2,'0'); };

let timer = null, curKey = '', hls = null, cfRes = null, cfAt = 0, cfBusy = false, lastProg = 0, lastPk = '';

/* ---------- Style (injecté ici : pas de fichier CSS en plus) ---------- */
(function(){
  if($('adminpv-css')) return;
  const st = document.createElement('style'); st.id = 'adminpv-css';
  st.textContent = `
#adminPreviewSection{ background:var(--card,#fff); border:1px solid var(--line,#e7dccb); border-radius:16px; padding:14px; margin-bottom:16px; }
#adminPreviewSection h3{ margin:0 0 4px; font-size:17px; }
#adminPreviewBox{ position:relative; background:#000; border-radius:14px; overflow:hidden; }
#adminPreviewIdle{ aspect-ratio:16/9; display:flex; align-items:center; justify-content:center; text-align:center; color:#f6efe4; padding:18px; font-weight:700; line-height:1.4; }
.pv-btns{ display:flex; gap:8px; margin:10px 0 4px; flex-wrap:wrap; }
.pv-btns button{ flex:1; min-width:120px; padding:11px 10px; border-radius:12px; border:2px solid var(--line,#e7dccb); background:var(--card,#fff); font-weight:800; font-size:14px; cursor:pointer; color:inherit; touch-action:manipulation; }
.pv-btns button.pri{ background:#C97B3E; border-color:#C97B3E; color:#fff; }
.pv-prog{ margin-top:10px; border-top:1px solid var(--line,#e7dccb); padding-top:10px; }
.pv-prog h4{ margin:0 0 4px; font-size:15px; }
.pv-row{ display:grid; grid-template-columns:54px 1fr auto; gap:8px; align-items:center; padding:8px 6px; border-bottom:1px solid var(--line,#e7dccb); font-size:13.5px; }
.pv-row.now{ background:rgba(201,123,62,.14); border-radius:10px; font-weight:800; border-bottom-color:transparent; }
.pv-time{ font-weight:800; font-variant-numeric:tabular-nums; }
.pv-dur{ opacity:.7; font-size:12px; white-space:nowrap; }
.pv-tag{ font-size:11px; opacity:.7; display:block; font-weight:600; }
.pv-bar{ height:5px; border-radius:3px; background:rgba(0,0,0,.12); margin:6px 0 0; overflow:hidden; }
.pv-bar i{ display:block; height:100%; background:#C97B3E; width:0; }
.live-player-box .fs-exit{ display:none; position:absolute; top:12px; right:12px; z-index:9; padding:10px 14px; border-radius:12px; border:none; background:rgba(0,0,0,.65); color:#fff; font-weight:800; font-size:14px; cursor:pointer; }
.live-player-box:fullscreen .fs-exit, .live-player-box:-webkit-full-screen .fs-exit, .live-player-box.pseudo-fs .fs-exit{ display:block; }
.live-player-box:fullscreen, .live-player-box:-webkit-full-screen, .live-player-box.pseudo-fs{ background:#000; display:flex; align-items:center; justify-content:center; width:100vw; height:100vh; border-radius:0; }
.live-player-box.pseudo-fs{ position:fixed; inset:0; z-index:99999; }
.live-player-box:fullscreen [data-slides], .live-player-box:-webkit-full-screen [data-slides], .live-player-box.pseudo-fs [data-slides]{ width:min(100vw, calc(100vh * 16 / 9)) !important; border-radius:0 !important; }
.live-player-box:fullscreen video, .live-player-box.pseudo-fs video, .live-player-box:fullscreen iframe, .live-player-box.pseudo-fs iframe{ width:min(100vw, calc(100vh * 16 / 9)) !important; max-height:100vh; border-radius:0 !important; }
.live-player-box:fullscreen .live-indicator, .live-player-box.pseudo-fs .live-indicator{ top:12px; left:12px; }
`;
  document.head.appendChild(st);
})();

/* ---------- Plein écran (vrai plein écran si possible, sinon plein écran « simulé ») ---------- */
function ensureExit(box){
  if(box.querySelector('.fs-exit')) return;
  const b = document.createElement('button'); b.type = 'button'; b.className = 'fs-exit'; b.textContent = '✕ Quitter le plein écran';
  b.onclick = ()=> A.exitFullscreen(box); box.appendChild(b);
}
A.isFullscreen = box => (document.fullscreenElement === box) || (document.webkitFullscreenElement === box) || box.classList.contains('pseudo-fs');
A.fullscreen = function(box){
  if(!box) return; ensureExit(box);
  if(A.isFullscreen(box)) return A.exitFullscreen(box);
  const req = box.requestFullscreen || box.webkitRequestFullscreen;
  if(req){
    try{ const r = req.call(box); if(r && r.catch) r.catch(()=> pseudo(box, true)); return; }catch(e){}
  }
  pseudo(box, true);
};
function pseudo(box, on){ box.classList.toggle('pseudo-fs', on); document.body.style.overflow = on ? 'hidden' : ''; }
A.exitFullscreen = function(box){
  if(box.classList.contains('pseudo-fs')) pseudo(box, false);
  try{ if(document.fullscreenElement && document.exitFullscreen) document.exitFullscreen(); else if(document.webkitFullscreenElement && document.webkitExitFullscreen) document.webkitExitFullscreen(); }catch(e){}
};
document.addEventListener('keydown', e=>{ if(e.key === 'Escape'){ document.querySelectorAll('.live-player-box.pseudo-fs').forEach(b=> pseudo(b, false)); } });

/* ---------- Création de la zone dans l'onglet « Chaîne » de l'admin ---------- */
A.mount = function(){
  const tab = $('adminTab-live'); if(!tab) return;
  if(!$('adminPreviewSection')){
    const sec = document.createElement('div'); sec.id = 'adminPreviewSection';
    sec.innerHTML = `
      <h3>👁️ Aperçu de la chaîne — comme tes clients</h3>
      <p class="hint" style="margin:0 0 10px;">Tu vois ici exactement ce que voient les spectateurs en ce moment (direct ou boucle), sans pass. Les diaporamas tournent en boucle avec les autres programmes.</p>
      <div id="adminPreviewBox" class="live-player-box">
        <video id="adminPreviewVideo" controls playsinline muted style="display:none;width:100%;border-radius:14px;background:#000;"></video>
        <iframe id="adminPreviewFrame" title="Aperçu de la chaîne" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen style="display:none;width:100%;aspect-ratio:16/9;border:0;border-radius:14px;background:#000;"></iframe>
        <div id="adminPreviewIdle">⏳ Chargement de la chaîne…</div>
        <span class="live-indicator" id="adminPreviewIndicator" style="display:none;">🔴 EN DIRECT</span>
      </div>
      <div class="pv-bar"><i id="adminPreviewBar"></i></div>
      <p class="hint" id="adminPreviewStatus" style="margin:8px 0 0;"></p>
      <div class="pv-btns">
        <button class="pri" id="adminPreviewFs" type="button">⛶ Plein écran</button>
        <button id="adminPreviewRefresh" type="button">🔄 Recharger l'aperçu</button>
      </div>
      <div class="pv-prog">
        <h4>📅 Programme de la chaîne</h4>
        <p class="hint" id="adminProgramInfo" style="margin:0 0 6px;"></p>
        <div id="adminProgramList"></div>
      </div>`;
    tab.insertBefore(sec, tab.firstChild);
    $('adminPreviewFs').onclick = ()=> A.fullscreen($('adminPreviewBox'));
    $('adminPreviewRefresh').onclick = ()=>{ stopPlayer(); curKey = ''; cfRes = null; cfAt = 0; tick(); };
  }
  A.start();
};
A.start = function(){ if(timer) return; timer = setInterval(tick, 1000); tick(); };
A.stop = function(){ if(timer){ clearInterval(timer); timer = null; } stopPlayer(); curKey = ''; };

/* ---------- Lecture dans l'aperçu ---------- */
function stopPlayer(){
  const box = $('adminPreviewBox'), v = $('adminPreviewVideo'), fr = $('adminPreviewFrame');
  if(window.SCCS && box) SCCS.stop(box);
  if(hls){ try{ hls.destroy(); }catch(e){} hls = null; }
  if(v){ try{ v.pause(); }catch(e){} v.removeAttribute('src'); v.style.display = 'none'; }
  if(fr){ fr.removeAttribute('src'); fr.style.display = 'none'; }
}
function idle(msg){ const i = $('adminPreviewIdle'); if(i){ i.style.display = 'flex'; i.innerHTML = msg; } const ind = $('adminPreviewIndicator'); if(ind) ind.style.display = 'none'; }
function playing(){ const i = $('adminPreviewIdle'); if(i) i.style.display = 'none'; }
function playEmbed(url){ const fr = $('adminPreviewFrame'), v = $('adminPreviewVideo'); playing(); if(v){ v.pause(); v.removeAttribute('src'); v.style.display = 'none'; } fr.style.display = 'block'; fr.src = url; }
function playVideo(url, offset){
  url = (typeof resolveMediaUrl === 'function') ? resolveMediaUrl(url) : url;
  const v = $('adminPreviewVideo'), fr = $('adminPreviewFrame'); playing(); fr.removeAttribute('src'); fr.style.display = 'none'; v.style.display = 'block';
  if(hls){ try{ hls.destroy(); }catch(e){} hls = null; }
  if(offset > 1) v.addEventListener('loadedmetadata', ()=>{ try{ v.currentTime = offset; }catch(e){} }, { once:true });
  if(/\.m3u8(\?|$)/i.test(url) && window.Hls && Hls.isSupported()){ hls = new Hls(); hls.loadSource(url); hls.attachMedia(v); } else v.src = url;
  v.play().catch(()=>{});
}
function playSlides(id, offset){
  const box = $('adminPreviewBox'); playing(); $('adminPreviewVideo').style.display = 'none'; $('adminPreviewFrame').style.display = 'none';
  if(window.SCCS) SCCS.play(box, id, offset, { main:false });
}

/* ---------- État de la chaîne (même logique que pour les spectateurs) ---------- */
function refreshCloudflare(){
  if(cfBusy || Date.now() - cfAt < 15000) return; cfBusy = true; cfAt = Date.now();
  (async ()=>{
    try{
      if(typeof aiConfigured === 'function' && !aiConfigured()){ cfRes = { kind:'offline', msg:"La chaîne Cloudflare n'est pas encore configurée." }; return; }
      const data = await workerGet('/live/status');
      if(!data.configured) cfRes = { kind:'offline', msg:"La chaîne Cloudflare n'est pas configurée côté serveur relais." };
      else if(data.live) cfRes = { kind:'hls', url:data.hlsUrl };
      else cfRes = (LIVE_SETTINGS.fallbackPlaylist !== false || liveProvider() === 'auto') ? fallbackSource() : { kind:'offline' };
    }catch(e){ cfRes = { kind:'offline', msg:"Impossible de vérifier l'état de la chaîne pour le moment." }; }
    finally{ cfBusy = false; }
  })();
}
function tick(){
  const box = $('adminPreviewBox'), tab = $('adminTab-live');
  if(!box || !tab) return A.stop();
  if(!A.isFullscreen(box) && tab.offsetParent === null) return A.stop();   // onglet caché : on arrête l'aperçu
  const status = $('adminPreviewStatus'), bar = $('adminPreviewBar'), ind = $('adminPreviewIndicator');
  if(LIVE_SETTINGS.maintenanceMode){
    if(curKey !== 'maint'){ stopPlayer(); curKey = 'maint'; }
    idle('🛠️ ' + esc(LIVE_SETTINGS.maintenanceMessage || 'La chaîne est en maintenance : les clients voient ce message.')); status.textContent = 'Mode maintenance activé.'; bar.style.width = '0'; renderProgram(null); return;
  }
  let res; try{ res = resolveLiveSource(); }catch(e){ res = { kind:'offline' }; }
  if(res.kind === 'cloudflare'){ refreshCloudflare(); res = cfRes || (typeof fallbackSource === 'function' ? fallbackSource() : { kind:'offline' }); }
  let st = null;

  if(res.kind === 'embed' || res.kind === 'hls'){
    const key = res.kind + ':' + res.url;
    if(curKey !== key){ stopPlayer(); curKey = key; if(res.kind === 'embed') playEmbed(res.url); else playVideo(res.url, 0); }
    ind.style.display = 'inline-block'; status.innerHTML = '🔴 <b>Direct</b>' + (res.label ? ' — ' + esc(res.label) : '') + ' : tes clients voient ceci.'; bar.style.width = '100%';
    st = (typeof currentPlaylistState === 'function') ? currentPlaylistState() : null; renderProgram(st, true); return;
  }
  if(res.kind === 'playlist'){
    st = currentPlaylistState();
    if(st){
      const key = 'pl:' + st.cycle + ':' + st.idx;
      if(curKey !== key){
        stopPlayer(); curKey = key;
        if(st.item.type === 'youtube') playEmbed(youtubeEmbedUrl(st.item.ref, st.offset));
        else if(st.item.type === 'slides') playSlides(st.item.ref, st.offset);
        else playVideo(st.item.ref, st.offset);
      }
      ind.style.display = 'none';
      status.innerHTML = '🔁 <b>Boucle</b> — maintenant : ' + esc(st.item.title) + ' <span style="opacity:.7">(reste ' + mmss(st.remaining) + ')</span>' + (st.count > 1 ? '<br>⏭️ À suivre : ' + esc(st.next.title) : '');
      bar.style.width = Math.min(100, st.offset / st.item.sec * 100) + '%';
      renderProgram(st); return;
    }
    res = { kind:'offline' };
  }
  if(curKey !== 'off'){ stopPlayer(); curKey = 'off'; }
  idle(res.msg ? '⚠️ ' + esc(res.msg) : '⏸️ ' + esc(LIVE_SETTINGS.offlineMessage || 'Hors antenne pour le moment.'));
  status.textContent = 'Rien n\'est diffusé : ajoute des programmes à la boucle ou active les diaporamas intégrés.'; bar.style.width = '0'; renderProgram(null);
}

/* ---------- Programme (heures de passage) ---------- */
function renderProgram(st, isLive){
  const list = $('adminProgramList'), info = $('adminProgramInfo'); if(!list) return;
  const pk = st ? st.cycle + ':' + st.idx : '';
  if(pk === lastPk && Date.now() - lastProg < 2000 && list.firstChild) return;
  lastPk = pk; lastProg = Date.now();
  if(!st){ list.innerHTML = '<p class="hint">Aucun programme dans la boucle pour le moment.</p>'; info.textContent = ''; return; }
  const items = effectivePlaylist(); const total = items.reduce((t,i)=> t + (i.sec || 0), 0);
  let before = 0; for(let k=0;k<st.idx;k++) before += items[k].sec || 0;
  const cycleStart = Date.now() - (before + st.offset) * 1000, loopEnd = cycleStart + total * 1000;
  let start = Date.now() - st.offset * 1000, idx = st.idx; const rows = [];
  for(let k=0; k<14; k++){ const it = items[idx % items.length]; rows.push({ it, start, k }); start += (it.sec || 0) * 1000; idx++; }
  const nSlides = items.filter(i=>i.type === 'slides').length;
  info.innerHTML = '<b>' + items.length + '</b> programmes en boucle (dont <b>' + nSlides + '</b> diaporamas intégrés) • durée d\'un tour : <b>' + dur(total) + '</b> • le tour recommence vers <b>' + clock(loopEnd) + '</b>' + (isLive ? '<br>🔴 Un direct est actif : la boucle reprendra à la fin du direct.' : '');
  const tag = t => t === 'slides' ? '🎬 Diaporama' : t === 'youtube' ? '▶️ YouTube' : '🎞️ Vidéo';
  list.innerHTML = rows.map(r=>`<div class="pv-row ${r.k === 0 ? 'now' : ''}"><span class="pv-time">${r.k === 0 ? '▶ ' : ''}${clock(r.start)}</span><span>${esc(r.it.title)}<span class="pv-tag">${tag(r.it.type)}${r.k === 0 ? ' • en cours' : ''}</span></span><span class="pv-dur">${dur(r.it.sec || 0)}</span></div>`).join('');
}

/* ---------- Bouton « Plein écran » pour les spectateurs (sous leur lecteur) ---------- */
function initClientButton(){
  const wrap = $('livePlayerWrap'); if(!wrap || $('liveFsBtn')) return;
  const box = wrap.querySelector('.live-player-box'), txt = $('liveStatusText'); if(!box || !txt) return;
  const b = document.createElement('button'); b.type = 'button'; b.id = 'liveFsBtn'; b.className = 'btn btn-ghost'; b.style.cssText = 'margin-top:8px;'; b.textContent = '⛶ Plein écran';
  b.onclick = ()=> A.fullscreen(box); txt.insertAdjacentElement('afterend', b);
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initClientButton); else initClientButton();
})();

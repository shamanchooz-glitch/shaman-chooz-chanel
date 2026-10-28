/* SOURCE DE DIFFUSION « CAMÉRA DU TÉLÉPHONE / DE L'ORDINATEUR » (admin > Chaîne > Réglages de la chaîne > Source de la diffusion).
   - Téléphone : ouvre la caméra arrière (par défaut) ou avant, bouton pour basculer entre les deux.
   - Ordinateur : ouvre la caméra de l'ordinateur ; s'il y en a plusieurs (webcam USB, caméra externe…), une liste permet de choisir.
   - « Démarrer la diffusion » envoie l'image et le son en direct aux spectateurs, de deux façons (choisie automatiquement) :
       1) CLOUDFLARE STREAM (si le relais Cloudflare est configuré : route /live/whip + variables CF_*) → beaucoup de spectateurs.
       2) MODE DIRECT sans Cloudflare (WebRTC de ton appareil vers chaque spectateur, le signal passe par Firebase « cameraLive »)
          → gratuit, jusqu'à MAX_PEERS spectateurs en même temps. Nécessite les règles Firebase de database.rules.json.
   Ce fichier contient aussi la partie « spectateur » du mode direct (window.SCC_CAM_VIEW), utilisée par le lecteur de la chaîne (app.js).
   Nécessite une adresse https:// (obligatoire pour toutes les caméras de navigateur). */
(function(){
'use strict';
const $ = id => document.getElementById(id);
const say = (m, k) => { try{ toast(m, k || 'ok'); }catch(e){} };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const touch = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const MAX_PEERS = 6;                       /* spectateurs maximum en mode direct (sans Cloudflare) */
const VIDEO_KBPS = 800;                    /* débit d'envoi par spectateur en mode direct */
const ICE = [{ urls:'stun:stun.l.google.com:19302' }, { urls:'stun:stun.cloudflare.com:3478' }];
const fbdb = () => (window.firebase && firebase.database) ? firebase.database() : null;
const STAMP = () => firebase.database.ServerValue.TIMESTAMP;
const RULES_MSG = "⚠️ Les règles Firebase doivent être mises à jour : ouvre Firebase > Realtime Database > Règles, colle le contenu du fichier database.rules.json, puis « Publier » (voir README).";
const isDenied = e => e && (e.code === 'PERMISSION_DENIED' || /permission_denied/i.test(String(e.message || e)));

function iceDone(p, ms){
  return new Promise(res => {
    if(p.iceGatheringState === 'complete') return res();
    const t = setTimeout(res, ms), f = () => { if(p.iceGatheringState === 'complete'){ clearTimeout(t); p.removeEventListener('icegatheringstatechange', f); res(); } };
    p.addEventListener('icegatheringstatechange', f);
  });
}

/* =====================================================================
   PARTIE ADMIN : caméra + diffusion
   ===================================================================== */
let stream = null, pc = null, senders = {}, resource = '', facing = 'environment', devId = '';
let live = false, stopping = true, retries = 0, wake = null, tried = false, discTimer = null, busy = false;
let p2p = false, peers = {}, hbTimer = null, reqRef = null, stateRef = null;

function status(t, cls){ const e = $('camStatus'); if(e){ e.textContent = t; e.style.color = cls === 'err' ? '#c0392b' : cls === 'ok' ? '#1e8449' : ''; } }
function errText(e){
  const n = e && e.name;
  if(n === 'NotAllowedError' || n === 'SecurityError') return "⚠️ L'accès à la caméra est refusé. Autorise la caméra pour ce site (icône cadenas de la barre d'adresse, ou Réglages du téléphone), puis réessaie.";
  if(n === 'NotFoundError' || n === 'OverconstrainedError') return "⚠️ Aucune caméra trouvée sur cet appareil (ou la caméra choisie n'est plus branchée).";
  if(n === 'NotReadableError' || n === 'AbortError') return "⚠️ La caméra est utilisée par une autre application. Ferme-la (appareil photo, WhatsApp, autre onglet…) puis appuie sur « Ouvrir la caméra ».";
  return "⚠️ Impossible d'ouvrir la caméra : " + ((e && e.message) || 'erreur inconnue');
}

function build(){
  const box = $('cameraBox'); if(!box || box.dataset.built) return; box.dataset.built = '1';
  box.innerHTML = '<p class="field-label" style="margin-top:12px">📷 Caméra du ' + (touch ? 'téléphone' : 'téléphone / de l\'ordinateur') + '</p>'
   + '<p class="hint">Garde cette page ouverte et l\'écran allumé pendant la diffusion. Les spectateurs voient ton direct sur la chaîne. Sans Cloudflare Stream, la diffusion se fait en « mode direct » (jusqu\'à ' + MAX_PEERS + ' spectateurs en même temps) ; avec Cloudflare Stream, il n\'y a pas de limite.</p>'
   + '<video id="camPreview" autoplay muted playsinline style="width:100%;max-height:340px;border-radius:14px;background:#000;object-fit:contain"></video>'
   + '<p id="camStatus" class="hint" style="font-weight:700;margin:8px 0">Appuie sur « Ouvrir la caméra ».</p>'
   + '<select class="input" id="camDevice" title="Choisir la caméra" style="display:none"></select>'
   + '<label class="hint" style="display:flex;align-items:center;gap:8px;margin:8px 0"><input type="checkbox" id="camMic" checked> 🎤 Envoyer le son (micro)</label>'
   + '<div style="display:flex;gap:8px;flex-wrap:wrap">'
   + '<button type="button" class="btn btn-ghost" id="camOpen" style="margin:0;width:auto">📷 Ouvrir la caméra</button>'
   + '<button type="button" class="btn btn-ghost" id="camFlip" style="margin:0;width:auto;display:' + (touch ? '' : 'none') + '">🔄 Avant / arrière</button>'
   + '<button type="button" class="btn btn-primary" id="camLive" style="margin:0;width:auto">🔴 Démarrer la diffusion</button>'
   + '<button type="button" class="btn btn-ghost" id="camStop" style="margin:0;width:auto;display:none">⏹ Arrêter la diffusion</button></div>';
  $('camOpen').onclick = () => openCamera(true);
  $('camFlip').onclick = flip;
  $('camLive').onclick = goLive;
  $('camStop').onclick = () => stopLive(true);
  $('camDevice').onchange = e => { devId = e.target.value; openCamera(true); };
  $('camMic').onchange = e => {
    const a = stream && stream.getAudioTracks()[0];
    if(a){ a.enabled = e.target.checked; status(e.target.checked ? '🎤 Micro activé.' : '🔇 Micro coupé.'); }
    else if(e.target.checked) openCamera(true);
  };
  if(navigator.mediaDevices && navigator.mediaDevices.addEventListener) navigator.mediaDevices.addEventListener('devicechange', () => { if(stream && !busy) fillDevices(); });
}

/* ---------- Caméra ---------- */
const gum = c => navigator.mediaDevices.getUserMedia(c);
async function getStream(){
  const wantMic = $('camMic').checked, base = { width:{ ideal:1280 }, height:{ ideal:720 }, frameRate:{ ideal:30, max:30 } };
  const audio = wantMic ? { echoCancellation:true, noiseSuppression:true, autoGainControl:true } : false;
  const tries = [];
  if(devId) tries.push({ ...base, deviceId:{ exact:devId } });
  else if(touch){ tries.push({ ...base, facingMode:{ exact:facing } }); tries.push({ ...base, facingMode:{ ideal:facing } }); }
  tries.push(base); tries.push(true);
  let last;
  for(const v of tries){
    try{ return await gum({ video:v, audio }); }catch(e){ last = e; if(e && (e.name === 'NotAllowedError' || e.name === 'SecurityError')) break; if(e && e.name === 'NotReadableError') await sleep(400); }
  }
  if(wantMic){ try{ const s = await gum({ video:true, audio:false }); say('Micro indisponible : la diffusion se fera sans son.', 'err'); return s; }catch(e){ last = e; } }
  throw last;
}
function attach(s){
  const v = $('camPreview'); if(!v) return;
  v.srcObject = s; v.play().catch(() => {});
  const st = (s.getVideoTracks()[0] || { getSettings:() => ({}) }).getSettings();
  v.style.transform = (st.facingMode === 'user' || (!touch && st.facingMode !== 'environment')) ? 'scaleX(-1)' : 'none';   /* aperçu en miroir seulement : les spectateurs voient l'image normale */
}
/* IMPORTANT (téléphones Android) : une seule caméra peut être ouverte à la fois. On libère donc l'ancienne caméra AVANT d'ouvrir la nouvelle ;
   si la nouvelle ne s'ouvre pas, on rouvre l'ancienne pour ne pas laisser un écran noir. */
function release(){ if(stream){ const o = stream; stream = null; o.getTracks().forEach(t => { try{ t.stop(); }catch(e){} }); } }
async function openCamera(manual){
  if(busy) return false; busy = true;
  const prev = { facing, devId }, hadStream = !!stream;
  try{
    if(!window.isSecureContext || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
      status("⚠️ Ce navigateur ou cette adresse ne permet pas d'ouvrir la caméra (il faut une adresse https://).", 'err'); return false;
    }
    status('Ouverture de la caméra…');
    release(); if(hadStream) await sleep(350);   /* laisse le téléphone libérer la caméra */
    let s;
    try{ s = await getStream(); }
    catch(e){
      if(hadStream){   /* retour à la caméra précédente */
        facing = prev.facing; devId = prev.devId;
        try{ const back = await getStream(); swap(back); await fillDevices(); }catch(e2){}
      }
      throw e;
    }
    swap(s);
    await fillDevices();
    if(live && p2p) p2pStatus(); else status(live ? '🔴 EN DIRECT — les spectateurs te voient.' : '✅ Caméra prête. Appuie sur « Démarrer la diffusion » quand tu veux.', 'ok');
    return true;
  }catch(e){ status(errText(e), 'err'); return false; }
  finally{ busy = false; }
}
function swap(s){
  stream = s; attach(s);
  if(pc){   /* en plein direct Cloudflare : on remplace l'image/le son sans couper la diffusion */
    s.getTracks().forEach(t => { const snd = senders[t.kind]; if(snd) snd.replaceTrack(t).catch(() => {}); });
  }
  Object.keys(peers).forEach(k => {   /* en plein direct (mode direct) : idem pour chaque spectateur */
    peers[k].getSenders().forEach(snd => { const kind = snd.track && snd.track.kind; const t = kind && s.getTracks().find(x => x.kind === kind); if(t) snd.replaceTrack(t).catch(() => {}); });
  });
  if((pc || Object.keys(peers).length) && !senders.audio && s.getAudioTracks()[0] && !Object.keys(peers).length) say('Le micro sera pris en compte au prochain démarrage.', 'ok');
  const a = s.getAudioTracks()[0]; if(a) a.enabled = $('camMic').checked;
  s.getVideoTracks().forEach(t => t.addEventListener('ended', () => { if(stream === s) status("⚠️ La caméra s'est arrêtée (débranchée ou prise par une autre application).", 'err'); }));
}
async function fillDevices(){
  const sel = $('camDevice'); if(!sel || !navigator.mediaDevices.enumerateDevices) return;
  try{
    const cams = (await navigator.mediaDevices.enumerateDevices()).filter(d => d.kind === 'videoinput');
    const cur = stream && stream.getVideoTracks()[0] && stream.getVideoTracks()[0].getSettings().deviceId;
    sel.innerHTML = cams.map((d, i) => '<option value="' + d.deviceId + '">' + (d.label || ('Caméra ' + (i + 1))).replace(/[<&]/g, '') + '</option>').join('');
    if(cur && cams.some(d => d.deviceId === cur)) sel.value = cur;
    sel.style.display = cams.length > 1 ? '' : 'none';
  }catch(e){}
}
async function flip(){
  if(busy) return;
  if(!stream && !(await openCamera(true))) return;
  facing = facing === 'user' ? 'environment' : 'user'; devId = '';
  await openCamera(true);
}
function closeCamera(){ release(); const v = $('camPreview'); if(v) v.srcObject = null; }

/* ---------- État du bouton ---------- */
function setLive(on){
  live = on;
  if($('camLive')) $('camLive').style.display = on ? 'none' : '';
  if($('camStop')) $('camStop').style.display = on ? '' : 'none';
  if(on && navigator.wakeLock){ navigator.wakeLock.request('screen').then(w => { wake = w; }).catch(() => {}); }
  if(!on && wake){ try{ wake.release(); }catch(e){} wake = null; }
}
document.addEventListener('visibilitychange', () => { if(live && !document.hidden && navigator.wakeLock) navigator.wakeLock.request('screen').then(w => { wake = w; }).catch(() => {}); });

/* ---------- Diffusion 1 : Cloudflare Stream (WebRTC → WHIP) ---------- */
async function connect(url){
  closePc();
  pc = new RTCPeerConnection({ iceServers:[{ urls:'stun:stun.cloudflare.com:3478' }], bundlePolicy:'max-bundle' });
  const me = pc; senders = {};
  stream.getTracks().forEach(t => {
    const tr = me.addTransceiver(t, { direction:'sendonly', streams:[stream] }); senders[t.kind] = tr.sender;
    if(t.kind === 'video' && tr.setCodecPreferences && window.RTCRtpSender && RTCRtpSender.getCapabilities){   /* Cloudflare Stream demande du H.264 */
      try{ const c = RTCRtpSender.getCapabilities('video').codecs, h = c.filter(x => /h264/i.test(x.mimeType)); if(h.length) tr.setCodecPreferences(h.concat(c.filter(x => !/h264/i.test(x.mimeType)))); }catch(e){}
    }
  });
  me.onconnectionstatechange = () => {
    if(me !== pc || stopping) return;
    const s = me.connectionState;
    if(s === 'connected'){ clearTimeout(discTimer); retries = 0; status('🔴 EN DIRECT (Cloudflare) — les spectateurs te voient avec quelques secondes de décalage.', 'ok'); }
    else if(s === 'disconnected' || s === 'failed'){ clearTimeout(discTimer); discTimer = setTimeout(() => reconnect(url), s === 'failed' ? 200 : 4000); }
  };
  await me.setLocalDescription(await me.createOffer());
  await iceDone(me, 2500);
  const r = await fetch(url, { method:'POST', headers:{ 'Content-Type':'application/sdp' }, body: me.localDescription.sdp });
  if(!r.ok) throw new Error('Le serveur de diffusion a répondu ' + r.status);
  const loc = r.headers.get('Location'); resource = loc ? new URL(loc, url).href : '';
  await me.setRemoteDescription({ type:'answer', sdp: await r.text() });
}
async function reconnect(url){
  if(stopping || !live || !pc) return;
  if(++retries > 6){ status("⚠️ La connexion est perdue. Vérifie ton Internet puis appuie sur « Démarrer la diffusion ».", 'err'); stopLive(false); return; }
  status('🔄 Connexion perdue, nouvelle tentative (' + retries + '/6)…');
  try{ await connect(url); }catch(e){ discTimer = setTimeout(() => reconnect(url), 2000 * retries); }
}
function closePc(){ clearTimeout(discTimer); if(pc){ const p = pc; pc = null; try{ p.onconnectionstatechange = null; p.close(); }catch(e){} } senders = {}; }

/* ---------- Diffusion 2 : mode direct sans Cloudflare (WebRTC vers chaque spectateur, signal via Firebase) ---------- */
function nPeers(){ return Object.keys(peers).length; }
function p2pStatus(){ status('🔴 EN DIRECT (mode direct) — ' + nPeers() + ' spectateur(s) connecté(s), ' + MAX_PEERS + ' au maximum en même temps.', 'ok'); }
async function startP2P(){
  const db = fbdb(); if(!db) throw new Error("Firebase n'est pas disponible sur cette page.");
  stateRef = db.ref('cameraLive/state');
  try{
    await db.ref('cameraLive/req').remove(); await db.ref('cameraLive/ans').remove();
    await stateRef.set({ on:true, hb:STAMP() });
  }catch(e){ throw new Error(isDenied(e) ? RULES_MSG : String(e && e.message || e)); }
  try{ stateRef.onDisconnect().set({ on:false, hb:STAMP() }); }catch(e){}
  clearInterval(hbTimer); hbTimer = setInterval(() => { stateRef.update({ on:true, hb:STAMP() }).catch(() => {}); }, 10000);
  reqRef = db.ref('cameraLive/req');
  reqRef.on('child_added', s => onRequest(s.key, s.val()), e => status(isDenied(e) ? RULES_MSG : '⚠️ ' + (e && e.message), 'err'));
  p2p = true; p2pStatus();
}
function limitBitrate(snd){
  try{ const p = snd.getParameters(); if(!p.encodings || !p.encodings.length) p.encodings = [{}]; p.encodings[0].maxBitrate = VIDEO_KBPS * 1000; snd.setParameters(p).catch(() => {}); }catch(e){}
}
async function onRequest(vid, v){
  const db = fbdb(); if(!db || !p2p || !stream || !v || !v.sdp || peers[vid]) return;
  const R = 'cameraLive/req/' + vid, A = 'cameraLive/ans/' + vid;
  if(nPeers() >= MAX_PEERS){ db.ref(A).set({ full:true }).catch(() => {}); db.ref(R).remove().catch(() => {}); return; }
  const me = new RTCPeerConnection({ iceServers: ICE }); peers[vid] = me;
  const drop = () => { if(peers[vid] === me){ delete peers[vid]; try{ me.close(); }catch(e){} db.ref(A).remove().catch(() => {}); db.ref(R).remove().catch(() => {}); if(p2p) p2pStatus(); } };
  me.onconnectionstatechange = () => {
    const s = me.connectionState;
    if(s === 'connected'){ db.ref(R).remove().catch(() => {}); db.ref(A).remove().catch(() => {}); p2pStatus(); }
    else if(s === 'failed' || s === 'closed') drop();
    else if(s === 'disconnected') setTimeout(() => { if(me.connectionState !== 'connected') drop(); }, 6000);
  };
  setTimeout(() => { if(me.connectionState !== 'connected') drop(); }, 30000);
  try{
    await me.setRemoteDescription({ type:'offer', sdp:v.sdp });
    stream.getTracks().forEach(t => me.addTrack(t, stream));
    await me.setLocalDescription(await me.createAnswer());
    me.getSenders().forEach(snd => { if(snd.track && snd.track.kind === 'video') limitBitrate(snd); });
    await iceDone(me, 2500);
    await db.ref(A).set({ sdp: me.localDescription.sdp });
  }catch(e){ drop(); }
}
function stopP2P(){
  if(!p2p && !stateRef) return;
  p2p = false; clearInterval(hbTimer); hbTimer = null;
  const db = fbdb();
  try{ if(reqRef) reqRef.off(); }catch(e){} reqRef = null;
  Object.keys(peers).forEach(k => { try{ peers[k].close(); }catch(e){} }); peers = {};
  if(db){
    try{ if(stateRef){ stateRef.onDisconnect().cancel(); stateRef.set({ on:false, hb:STAMP() }).catch(() => {}); } }catch(e){}
    db.ref('cameraLive/req').remove().catch(() => {}); db.ref('cameraLive/ans').remove().catch(() => {});
  }
  stateRef = null;
}

/* ---------- Démarrer / arrêter ---------- */
const hasRelay = () => { try{ return typeof aiConfigured === 'function' && aiConfigured() && typeof workerPost === 'function'; }catch(e){ return false; } };
async function goLive(){
  if(live) return;
  if(!stream && !(await openCamera(true))) return;
  stopping = false; retries = 0; $('camLive').disabled = true; status('Connexion au direct…');
  let mode = '', note = '';
  try{
    if(hasRelay()){
      try{
        const idToken = await firebase.auth().currentUser.getIdToken();
        const d = await workerPost('/live/whip', { idToken });
        if(d && d.configured && d.url){ await connect(d.url); mode = 'cloudflare'; }
        else note = "Cloudflare Stream n'est pas configuré : diffusion en mode direct.";
      }catch(e){
        if(String(e && e.message) === 'unauthorized') throw e;
        closePc(); note = "Cloudflare Stream indisponible : diffusion en mode direct.";
      }
    }
    if(!mode){ await startP2P(); mode = 'p2p'; }
    setLive(true);
    /* La source de la chaîne devient « caméra » pour tous les spectateurs, avec le bon mode */
    if(typeof LIVE_SETTINGS !== 'undefined'){
      LIVE_SETTINGS.provider = 'camera'; LIVE_SETTINGS.cameraMode = mode;
      try{ await DB.set('liveSettings', LIVE_SETTINGS); }catch(e){}
    }
    if(mode === 'p2p'){ p2pStatus(); if(note) say(note); }
    else if(pc && pc.connectionState === 'connected') status('🔴 EN DIRECT (Cloudflare) — les spectateurs te voient avec quelques secondes de décalage.', 'ok');
  }catch(e){
    stopping = true; closePc(); stopP2P(); setLive(false);
    const m = String(e && e.message || e);
    status(m === 'unauthorized' ? "⚠️ Reconnecte-toi à l'espace admin puis réessaie." : (m.charAt(0) === '⚠' ? m : '⚠️ ' + m), 'err');
  }
  $('camLive').disabled = false;
}
async function stopLive(user){
  stopping = true; setLive(false);
  const r = resource; resource = ''; closePc(); stopP2P();
  if(r){ try{ await fetch(r, { method:'DELETE' }); }catch(e){} }
  if(user) status('⏹ Diffusion arrêtée. La caméra reste ouverte ; la chaîne repasse sur la boucle de programmes.', 'ok');
}

/* ---------- Surveillance : ouvre la caméra dès que « Caméra » est choisie, la ferme quand une autre source est choisie ---------- */
function tick(){
  const sel = $('liveProviderSelect'), box = $('cameraBox'); if(!sel || !box) return;
  build();
  const on = sel.value === 'camera';
  if(on && box.offsetParent && !stream && !tried){ tried = true; openCamera(false); }   /* « ouvre directement sur la caméra » */
  if(!on){ tried = false; if(live) stopLive(false); if(stream) closeCamera(); }
}
document.addEventListener('change', e => { if(e.target && e.target.id === 'liveProviderSelect' && e.target.value === 'camera'){ tried = true; setTimeout(() => { build(); openCamera(true); }, 0); } });
setInterval(tick, 1200);
window.addEventListener('pagehide', () => { if(live) stopLive(false); closeCamera(); });

/* =====================================================================
   PARTIE SPECTATEUR (mode direct) : window.SCC_CAM_VIEW — appelée par le lecteur de la chaîne (app.js)
   ===================================================================== */
window.SCC_CAM_VIEW = (function(){
  let vpc = null, tok = 0, ref = null, vid = '', timer = null, el = null, fails = 0, offT = null;
  const note = t => { const e = $('liveStatusText'); if(e && t) e.innerHTML += '<br>' + t; };
  const again = () => { try{ CURRENT_PLAY_KEY = ''; }catch(e){} };   /* le prochain contrôle de la chaîne (≈20 s) relance la connexion */
  async function status(){
    const db = fbdb(); if(!db) return { on:false };
    try{
      const [s, o] = await Promise.all([db.ref('cameraLive/state').once('value'), db.ref('.info/serverTimeOffset').once('value')]);
      const v = s.val(); if(!v || !v.on) return { on:false };
      return { on: (Date.now() + (o.val() || 0)) - (v.hb || 0) < 45000 };
    }catch(e){ return { on:false, err:true }; }
  }
  function cleanup(){
    tok++; clearTimeout(timer); clearTimeout(offT);
    if(ref){ try{ ref.off(); }catch(e){} ref = null; }
    const db = fbdb(); if(db && vid){ db.ref('cameraLive/req/' + vid).remove().catch(() => {}); }
    if(vpc){ const p = vpc; vpc = null; try{ p.ontrack = null; p.onconnectionstatechange = null; p.close(); }catch(e){} }
    vid = '';
  }
  async function go(){
    cleanup(); const my = tok; const db = fbdb(); if(!db || !el) return;
    vid = 'v' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
    const me = vpc = new RTCPeerConnection({ iceServers: ICE });
    me.addTransceiver('video', { direction:'recvonly' }); me.addTransceiver('audio', { direction:'recvonly' });
    me.ontrack = e => {
      if(my !== tok) return;
      const ms = (e.streams && e.streams[0]) || (() => { const m = new MediaStream(); m.addTrack(e.track); return m; })();
      el.style.display = 'block'; el.srcObject = ms; el.muted = false;
      el.play().catch(() => { el.muted = true; el.play().catch(() => {}); });
    };
    me.onconnectionstatechange = () => {
      if(my !== tok) return; const s = me.connectionState;
      if(s === 'connected'){ fails = 0; clearTimeout(timer); const d = fbdb(); if(d) d.ref('cameraLive/req/' + vid).remove().catch(() => {}); }
      else if(s === 'failed') retry(); else if(s === 'disconnected') setTimeout(() => { if(my === tok && me.connectionState !== 'connected') retry(); }, 5000);
    };
    try{
      await me.setLocalDescription(await me.createOffer()); await iceDone(me, 2500);
      if(my !== tok) return;
      ref = db.ref('cameraLive/ans/' + vid);
      ref.on('value', async s => {
        const v = s.val(); if(!v || my !== tok || me.signalingState !== 'have-local-offer') return;
        if(v.full){ cleanup(); note('⚠️ Trop de spectateurs en même temps sur ce direct. Réessaie dans un instant.'); again(); return; }
        if(v.sdp){ try{ await me.setRemoteDescription({ type:'answer', sdp:v.sdp }); }catch(e){} }
      });
      await db.ref('cameraLive/req/' + vid).set({ sdp: me.localDescription.sdp, t: Date.now() });
      timer = setTimeout(() => { if(my === tok && me.connectionState !== 'connected') retry(); }, 15000);
    }catch(e){ if(my === tok) retry(); }
  }
  function retry(){
    if(++fails > 3){ cleanup(); note('⚠️ Connexion au direct impossible pour le moment. Nouvel essai dans un instant…'); fails = 0; again(); return; }
    go();
  }
  return {
    status,
    start(video){ el = video; fails = 0; go(); },
    stop(){ cleanup(); if(el){ try{ el.srcObject = null; }catch(e){} } }
  };
})();
})();

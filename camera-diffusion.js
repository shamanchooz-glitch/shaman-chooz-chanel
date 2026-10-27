/* SOURCE DE DIFFUSION « CAMÉRA DU TÉLÉPHONE / DE L'ORDINATEUR » (admin > Chaîne > Réglages de la chaîne > Source de la diffusion).
   - Téléphone : ouvre la caméra arrière (par défaut) ou avant, bouton pour basculer entre les deux.
   - Ordinateur : ouvre la caméra de l'ordinateur ; s'il y en a plusieurs (webcam USB, caméra externe…), une liste permet de choisir.
   - « Démarrer la diffusion » envoie l'image et le son en direct vers le Live Input Cloudflare Stream (WebRTC / WHIP) ;
     les spectateurs le voient sur la chaîne comme n'importe quel direct Cloudflare (HLS). Nécessite le relais Cloudflare (route /live/whip) + variables CF_*.
   Nécessite une adresse https:// (obligatoire pour toutes les caméras de navigateur). */
(function(){
'use strict';
const $ = id => document.getElementById(id);
const say = (m, k) => { try{ toast(m, k || 'ok'); }catch(e){} };
const touch = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
let stream = null, pc = null, senders = {}, resource = '', facing = 'environment', devId = '';
let live = false, stopping = true, retries = 0, wake = null, tried = false, discTimer = null, busy = false;

function status(t, cls){ const e = $('camStatus'); if(e){ e.textContent = t; e.style.color = cls === 'err' ? '#c0392b' : cls === 'ok' ? '#1e8449' : ''; } }
function errText(e){
  const n = e && e.name;
  if(n === 'NotAllowedError' || n === 'SecurityError') return "⚠️ L'accès à la caméra est refusé. Autorise la caméra pour ce site (icône cadenas de la barre d'adresse, ou Réglages du téléphone), puis réessaie.";
  if(n === 'NotFoundError' || n === 'OverconstrainedError') return "⚠️ Aucune caméra trouvée sur cet appareil (ou la caméra choisie n'est plus branchée).";
  if(n === 'NotReadableError' || n === 'AbortError') return "⚠️ La caméra est utilisée par une autre application. Ferme-la puis réessaie.";
  return "⚠️ Impossible d'ouvrir la caméra : " + ((e && e.message) || 'erreur inconnue');
}

/* ---------- Construction du bloc dans les réglages ---------- */
function build(){
  if($('cameraBox')) { if($('cameraBox').dataset.built) return; }
  const box = $('cameraBox'); if(!box || box.dataset.built) return; box.dataset.built = '1';
  box.innerHTML = '<p class="field-label" style="margin-top:12px">📷 Caméra du ' + (touch ? 'téléphone' : 'téléphone / de l\'ordinateur') + '</p>'
   + '<p class="hint">Garde cette page ouverte et l\'écran allumé pendant la diffusion. Les spectateurs voient ton direct sur la chaîne avec quelques secondes de décalage.</p>'
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
  if(navigator.mediaDevices && navigator.mediaDevices.addEventListener) navigator.mediaDevices.addEventListener('devicechange', () => { if(stream) fillDevices(); });
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
    try{ return await gum({ video:v, audio }); }catch(e){ last = e; if(e && (e.name === 'NotAllowedError' || e.name === 'SecurityError')) break; }
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
async function openCamera(manual){
  if(busy) return false; busy = true;
  try{
    if(!window.isSecureContext || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
      status("⚠️ Ce navigateur ou cette adresse ne permet pas d'ouvrir la caméra (il faut une adresse https://).", 'err'); return false;
    }
    status('Ouverture de la caméra…');
    const s = await getStream();
    swap(s);
    await fillDevices();
    status(live ? '🔴 EN DIRECT — les spectateurs te voient.' : '✅ Caméra prête. Appuie sur « Démarrer la diffusion » quand tu veux.', 'ok');
    return true;
  }catch(e){ status(errText(e), 'err'); return false; }
  finally{ busy = false; }
}
function swap(s){
  const old = stream; stream = s; attach(s);
  if(pc){   /* en plein direct : on remplace l'image/le son sans couper la diffusion */
    s.getTracks().forEach(t => { const snd = senders[t.kind]; if(snd) snd.replaceTrack(t).catch(() => {}); });
    if(!senders.audio && s.getAudioTracks()[0]) say('Le micro sera pris en compte au prochain démarrage.', 'ok');
  }
  if(old) old.getTracks().forEach(t => { try{ t.stop(); }catch(e){} });
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
  if(!stream && !(await openCamera(true))) return;
  facing = facing === 'user' ? 'environment' : 'user'; devId = '';
  await openCamera(true);
}
function closeCamera(){ if(stream){ stream.getTracks().forEach(t => { try{ t.stop(); }catch(e){} }); stream = null; } const v = $('camPreview'); if(v) v.srcObject = null; }

/* ---------- Diffusion vers les spectateurs (WebRTC → Cloudflare Stream) ---------- */
function setLive(on){
  live = on;
  if($('camLive')) $('camLive').style.display = on ? 'none' : '';
  if($('camStop')) $('camStop').style.display = on ? '' : 'none';
  if(on && navigator.wakeLock){ navigator.wakeLock.request('screen').then(w => { wake = w; }).catch(() => {}); }
  if(!on && wake){ try{ wake.release(); }catch(e){} wake = null; }
}
document.addEventListener('visibilitychange', () => { if(live && !document.hidden && navigator.wakeLock) navigator.wakeLock.request('screen').then(w => { wake = w; }).catch(() => {}); });
function iceDone(p, ms){
  return new Promise(res => {
    if(p.iceGatheringState === 'complete') return res();
    const t = setTimeout(res, ms), f = () => { if(p.iceGatheringState === 'complete'){ clearTimeout(t); p.removeEventListener('icegatheringstatechange', f); res(); } };
    p.addEventListener('icegatheringstatechange', f);
  });
}
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
    if(s === 'connected'){ clearTimeout(discTimer); retries = 0; status('🔴 EN DIRECT — les spectateurs te voient (avec quelques secondes de décalage).', 'ok'); }
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
  if(stopping || !live) return;
  if(++retries > 6){ status("⚠️ La connexion est perdue. Vérifie ton Internet puis appuie sur « Démarrer la diffusion ».", 'err'); stopLive(false); return; }
  status('🔄 Connexion perdue, nouvelle tentative (' + retries + '/6)…');
  try{ await connect(url); }catch(e){ discTimer = setTimeout(() => reconnect(url), 2000 * retries); }
}
function closePc(){ clearTimeout(discTimer); if(pc){ const p = pc; pc = null; try{ p.onconnectionstatechange = null; p.close(); }catch(e){} } senders = {}; }
async function goLive(){
  if(live) return;
  if(!stream && !(await openCamera(true))) return;
  if(typeof aiConfigured !== 'function' || !aiConfigured()){ status("⚠️ Le serveur relais n'est pas configuré (workerUrl dans ai-config.js). Il est nécessaire pour diffuser aux spectateurs.", 'err'); return; }
  stopping = false; retries = 0; $('camLive').disabled = true; status('Connexion au direct…');
  try{
    const idToken = await firebase.auth().currentUser.getIdToken();
    const d = await workerPost('/live/whip', { idToken });
    if(!d.configured || !d.url) throw new Error("Cloudflare Stream n'est pas configuré (variables CF_API_TOKEN, CF_ACCOUNT_ID, CF_LIVE_INPUT_ID, FIREBASE_API_KEY du Worker)");
    await connect(d.url);
    setLive(true);
    /* La source de la chaîne devient « caméra » pour tous les spectateurs */
    if(typeof LIVE_SETTINGS !== 'undefined' && LIVE_SETTINGS.provider !== 'camera'){ LIVE_SETTINGS.provider = 'camera'; try{ await DB.set('liveSettings', LIVE_SETTINGS); }catch(e){} }
    if(pc && pc.connectionState === 'connected') status('🔴 EN DIRECT — les spectateurs te voient (avec quelques secondes de décalage).', 'ok');
  }catch(e){
    stopping = true; closePc(); setLive(false);
    const m = String(e && e.message || e);
    status('⚠️ ' + (m === 'unauthorized' ? "Reconnecte-toi à l'espace admin puis réessaie." : m === 'whip_unavailable' ? "Ton Live Input Cloudflare n'accepte pas la diffusion WebRTC. Vérifie qu'il est créé dans Cloudflare Stream." : m), 'err');
  }
  $('camLive').disabled = false;
}
async function stopLive(user){
  stopping = true; setLive(false);
  const r = resource; resource = ''; closePc();
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
})();

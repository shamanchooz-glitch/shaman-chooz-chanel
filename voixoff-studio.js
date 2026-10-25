/* STUDIO VOIX OFF — espace administrateur (onglet de la chaîne en direct). Fabrique un fichier vidéo AVEC voix off, à envoyer à un client.
   Voix naturelle par défaut : MeloTTS via ton Worker Cloudflare (gratuit, aucune clé à copier). Secours sans clé API :
   1) 🤖 Voix IA française (Piper, licence MIT) : tourne dans le navigateur, hors ligne après le 1er chargement (~70 Mo, gardé en mémoire de l'appareil).
   2) 🎙 Ma voix : le micro enregistre ta voix pendant que le diaporama défile, avec le texte à lire à l'écran.
   Sources d'image : un diaporama de la liste (synchronisation voix/diapositives automatique) ou une vidéo sans voix off importée (+ texte à dire). Nécessite diapo-export.js. */
(function(){
'use strict';
const $ = id => document.getElementById(id);
let busy = false, TTS = null, last = null, cancelFn = null, cancelP = null, tick = null, t00 = 0, curMsg = '';
const LIM = () => window.SCC_VOIX_LIMITE || 150000;                 /* temps maximum pour une phrase (ms) */
const guard = (p, ms, msg) => Promise.race([p, cancelP, new Promise((_, ko) => setTimeout(() => ko(new Error(msg)), ms))]);
const log = m => { const l = $('voLog'); if(l) l.textContent = 'Détail du moteur : ' + String(m).slice(0, 90); };
const spoken = t => String(t).replace(/SHAMAN\s+CHOOZ\s+PRODUCTION/gi, window.SCC_NOM_PARLE || 'Shaman Tchouze Production').replace(/CHOOZ/gi, 'Tchouze');
const X = () => window.SCC_EXPORT;
const status = m => { curMsg = m; const s = $('voStat'); if(s) s.innerHTML = m + (busy && t00 ? ' <b>— ' + Math.round((Date.now() - t00) / 1000) + ' s</b>' : ''); };
const prog = p => { const b = $('voBar'); if(b){ b.style.display = 'block'; b.value = Math.round(p * 100); } };

/* ---- Voix claire : eSpeak (meSpeak.js), petit programme 100 % navigateur, sans clé, sans gros téléchargement ---- */
let ME = null;
const MB = 'https://cdn.jsdelivr.net/npm/mespeak@2.0.2/', MU = 'https://unpkg.com/mespeak@2.0.2/', MG = 'https://cdn.jsdelivr.net/gh/btopro/mespeak@master/';
async function getJSON(urls, ok, what){            /* essaie plusieurs adresses jusqu'à trouver un fichier valide */
  const errs = [];
  for(const u of urls){
    try{ const r = await guard(fetch(u), 45000, 'trop lent'); if(!r.ok){ errs.push(u.replace(/^https:\/\/[^/]+\//, '') + ' → ' + r.status); continue; } const j = await r.json(); if(ok(j)) return j; errs.push(u.replace(/^https:\/\/[^/]+\//, '') + ' → invalide'); }
    catch(e){ if(/Annulé/.test(e.message)) throw e; errs.push(u.replace(/^https:\/\/[^/]+\//, '') + ' → ' + (e.message || e)); }
  }
  throw new Error(what + ' introuvable (' + errs.join(' ; ') + ')');
}
async function loadMe(){
  if(window.__sccMeSpeak) return window.__sccMeSpeak; if(ME) return ME;
  let m = null, err;
  for(const u of [MB + '+esm', 'https://esm.sh/mespeak@2.0.2']){ try{ const mod = await import(u); m = mod.default || mod.meSpeak || mod; if(m && m.speak) break; m = null; }catch(e){ err = e; } }
  if(!m) throw new Error('Voix claire introuvable : une connexion Internet est nécessaire au 1er chargement. ' + (err && err.message || ''));
  if(!m.isConfigLoaded()){        /* cette version n'a AUCUNE configuration par défaut : il faut la charger, sinon la voix reste muette */
    const f = ['mespeak_config.json', 'src/mespeak_config.json', 'docs/mespeak_config.json'];
    const cfg = await getJSON([MG + 'mespeak_config.json'].concat(f.map(x => MB + x), f.map(x => MU + x)), j => j && typeof j.config === 'string' && typeof j.phontab === 'string' && typeof j.phondata === 'string', 'Configuration de la voix');
    m.loadConfig(cfg);
  }
  if(!m.getDefaultVoice()){
    const v = await getJSON([MB + 'voices/fr.json', MU + 'voices/fr.json', MG + 'voices/fr.json'], j => j && typeof j.voice_id === 'string' && typeof j.voice === 'string', 'Voix française');
    m.loadVoice(v);
  }
  if(!m.isConfigLoaded() || !m.getDefaultVoice()) throw new Error('La voix claire n\'a pas pu être configurée (config : ' + m.isConfigLoaded() + ', voix : ' + (m.getDefaultVoice() || 'aucune') + ').');
  return (ME = m);
}
async function prepareClair(){
  const m = await guard(loadMe(), 120000, 'Le chargement de la voix claire est trop long : vérifie ta connexion Internet.');
  if(!m.speak('Bonjour.', { rawdata:true })) throw new Error('La voix claire ne se lance pas sur cet appareil.');
  return { predict: async x => { const r = m.speak(x, { rawdata:true, voice:'fr', speed:150, pitch:55, amplitude:100, wordgap:1 }); if(!r) throw new Error('La voix claire a renvoyé un son vide.'); return new Blob([r], { type:'audio/wav' }); } };
}

/* ---- Voix naturelle : MeloTTS (Cloudflare Workers AI) via ton Worker — gratuite, AUCUNE clé à copier ---- */
async function prepareCloud(){
  const cfg = (typeof AI_CONFIG !== 'undefined') ? AI_CONFIG : null;
  if(!cfg || !cfg.workerUrl || cfg.workerUrl === 'REMPLACE_MOI') throw new Error('Le relais Cloudflare (workerUrl dans ai-config.js) n\'est pas configuré.');
  const predict = async x => {
    if(typeof firebase === 'undefined' || !firebase.auth().currentUser) throw new Error('Connecte-toi en administrateur, puis réessaie.');
    const idToken = await firebase.auth().currentUser.getIdToken();
    const r = await guard(fetch(cfg.workerUrl + '/admin/tts', { method:'POST', headers:{ 'Content-Type':'application/json' }, body:JSON.stringify({ idToken, text:x }) }), 60000, 'La voix naturelle ne répond pas.');
    const j = await r.json().catch(() => ({}));
    if(j.ok && j.version && !j.audio) throw new Error('Le Worker Cloudflare n\'a pas encore la nouvelle version : colle le nouveau fichier cloudflare-worker.js dans Cloudflare, puis « Déployer ».');
    if(j.configured === false) throw new Error('Il manque, dans le Worker Cloudflare, la liaison « Workers AI » (nom : AI) ou la variable FIREBASE_API_KEY (voir README, étape 18).');
    if(j.error === 'unauthorized') throw new Error('Le Worker ne reconnaît pas ce compte administrateur.');
    if(!r.ok || !j.audio) throw new Error('Voix naturelle indisponible : ' + (j.message || j.error || r.status));
    const bin = atob(j.audio), u = new Uint8Array(bin.length); for(let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    return new Blob([u], { type:'audio/mpeg' });
  };
  await predict('Bonjour.');            /* essai : s'il manque quelque chose, le message est clair et immédiat */
  return { predict };
}

const ORT = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0/dist/';   /* fichiers techniques du moteur vocal (le CDN par défaut de la bibliothèque ne les héberge pas tous) */
async function loadTTS(){
  if(window.__sccPiper) return window.__sccPiper; if(TTS) return TTS;
  const urls = ['https://esm.sh/@realtimex/piper-tts-web@1.1.1', 'https://cdn.jsdelivr.net/npm/@realtimex/piper-tts-web@1.1.1/+esm']; let err;
  for(const u of urls){ try{ TTS = await import(u); return TTS; }catch(e){ err = e; } }
  throw new Error('Moteur de voix introuvable : une connexion Internet est nécessaire au 1er chargement. (' + (err && err.message || err) + ')');
}
async function voiceId(t, q){
  try{ const v = Object.keys(await t.voices()).filter(k => /^fr_FR/.test(k)); return v.find(k => k.endsWith('siwis-' + q)) || v.find(k => k.endsWith('-' + q)) || v[0] || ('fr_FR-siwis-' + q); }catch(e){ return 'fr_FR-siwis-' + q; }
}
async function prepare(q){
  const t = await loadTTS(), id = await voiceId(t, q);
  const dlp = p => { if(p && p.total){ prog(p.loaded / p.total); status('⬇ Téléchargement de la voix : ' + Math.round(p.loaded * 100 / p.total) + ' % (une seule fois, patiente)'); } };
  if(t.TtsSession){
    const s = new t.TtsSession({ voiceId:id, allowLocalModels:true, fallbackStrategy:'cdn', wasmPaths:{ onnxWasm:ORT }, progress:dlp, logger:m => { console.log('Voix IA :', m); log(m); } });
    if(typeof s.init === 'function') await s.init();
    return { predict: x => s.predict(x) };
  }
  if(t.download) await t.download(id, dlp);
  return { predict: x => t.predict({ text:x, voiceId:id }) };
}
async function speak(ctx, text){
  let w; try{ w = await guard(ctx.predict(spoken(text)), LIM(), 'La voix ne répond plus (plus de ' + Math.round(LIM() / 1000) + ' s pour une phrase).'); }catch(e){ if(/Annulé/.test(e.message) || /ne répond plus/.test(e.message)) throw e; w = await guard(ctx.predict(spoken(text)), LIM(), 'La voix ne répond plus.'); }
  const ac = new AudioContext(); const b = await ac.decodeAudioData(await w.arrayBuffer()); ac.close(); return b;
}

/* Enregistre : draw(T, g) dessine l'image à l'instant T ; voices = [{buf, at}] ; mic = flux micro facultatif */
async function rec(total, draw, voices, music, mic, onP){
  const { W, H, pickMime, slug } = X(), cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const g = cv.getContext('2d'), stream = cv.captureStream(30), ac = new (window.AudioContext || window.webkitAudioContext)(), dest = ac.createMediaStreamDestination();
  if(ac.state === 'suspended') await ac.resume();
  draw(0, g); const t0a = ac.currentTime + .15;
  voices.forEach(v => { const s = ac.createBufferSource(); s.buffer = v.buf; s.connect(dest); s.start(t0a + v.at); });
  if(mic){ ac.createMediaStreamSource(mic).connect(dest); }
  if(music) X().music(ac, dest, total, .07);
  dest.stream.getAudioTracks().forEach(t => stream.addTrack(t));
  const mime = pickMime(), chunks = [], r = new MediaRecorder(stream, mime ? { mimeType:mime, videoBitsPerSecond:2500000 } : {});
  r.ondataavailable = e => { if(e.data && e.data.size) chunks.push(e.data); }; const done = new Promise(res => { r.onstop = res; });
  r.start(500); const t0 = performance.now() + 150;
  await new Promise(res => {
    const f = () => { const T = Math.max(0, (performance.now() - t0) / 1000); if(T >= total){ clearInterval(iv); draw(total - .02, g); onP(1); res(); return false; } draw(T, g); onP(T / total); return true; };
    const iv = setInterval(f, 200); (function raf(){ if(f()) requestAnimationFrame(raf); })();
  });
  await new Promise(r2 => setTimeout(r2, 500)); r.stop(); await done; try{ ac.close(); }catch(e){}
  const type = (r.mimeType || mime || 'video/webm').split(';')[0], ext = type.includes('mp4') ? 'mp4' : 'webm';
  return { blob:new Blob(chunks, { type }), ext };
}

async function run(){
  if(busy) return; const M = $('voMode').value, id = $('voShow').value, sh = SCCS.byId[id], mus = $('voMus').checked, file = $('voFile').files[0];
  if(!sh && !file) return alert('Choisis un diaporama.');
  if(!window.MediaRecorder || !HTMLCanvasElement.prototype.captureStream) return alert('Ce navigateur ne sait pas enregistrer de vidéo. Utilise Google Chrome sur ordinateur ou Android.');
  busy = true; $('voGo').disabled = true; $('voDone').style.display = 'none'; $('voStop').style.display = 'block'; t00 = Date.now(); $('voLog').textContent = '';
  cancelP = new Promise((_, ko) => { cancelFn = () => ko(new Error('Annulé.')); }); cancelP.catch(() => {});
  tick = setInterval(() => status(curMsg), 1000);
  try{
    let total, draw, voices = [], mic = null, title = sh ? sh.titre : file.name.replace(/\.[^.]+$/, '');
    if(M === 'ia'){
      const eng = $('voQual').value; let ctx = null;
      if(eng === 'cloud'){ status('🔧 Connexion à la voix naturelle…'); ctx = await guard(prepareCloud(), 90000, 'La voix naturelle ne répond pas.'); prog(0.05); }
      else if(eng !== 'clair'){
        try{
          status('🔧 Préparation de la voix IA naturelle…'); ctx = await guard(prepare(eng), 300000, 'Le téléchargement de la voix IA est trop long.');
          status('🔥 Démarrage de la voix IA naturelle…'); prog(0.05);
          await guard(speak(ctx, 'Bonjour.'), window.SCC_VOIX_DEMARRAGE || 90000, 'La voix IA naturelle ne démarre pas sur cet appareil.');
        }catch(e){ if(/Annulé/.test(e.message)) throw e; ctx = null; status('⚠️ ' + X().esc(e.message) + ' Je passe automatiquement à la voix claire…'); await new Promise(r => setTimeout(r, 1500)); }
      }
      if(!ctx){ status('🔧 Préparation de la voix claire…'); ctx = await prepareClair(); }
      if(file){                                                                       /* vidéo importée + texte à dire */
        const txt = $('voTxt').value.trim(); if(!txt) throw new Error('Écris le texte à dire (zone « Texte à dire »).');
        const v = document.createElement('video'); v.src = URL.createObjectURL(file); v.muted = true; v.playsInline = true; await new Promise((ok, ko) => { v.onloadedmetadata = ok; v.onerror = () => ko(new Error('Vidéo illisible.')); });
        const parts = txt.split(/(?<=[.!?])\s+/).filter(Boolean); let at = .4;
        for(let i = 0; i < parts.length; i++){ status('🔊 Création de la voix ' + (i + 1) + '/' + parts.length); prog((i + 1) / parts.length); const b = await speak(ctx, parts[i]); voices.push({ buf:b, at }); at += b.duration + .35; }
        total = Math.max(v.duration, at + .5); let started = false;
        draw = (T, g) => { if(!started && T > 0){ started = true; v.play().catch(() => {}); } const { W, H } = X(), r = Math.min(W / v.videoWidth, H / v.videoHeight); g.fillStyle = '#000'; g.fillRect(0, 0, W, H); g.drawImage(v, (W - v.videoWidth * r) / 2, (H - v.videoHeight * r) / 2, v.videoWidth * r, v.videoHeight * r); };
      } else {                                                                        /* diaporama : voix synchronisée sur chaque diapositive */
        const sched = []; let S = 0;
        for(let k = 0; k < sh.tl.length; k++){
          status('🔊 Création de la voix ' + (k + 1) + '/' + sh.tl.length); prog((k + 1) / sh.tl.length);
          const it = sh.tl[k], b = await speak(ctx, SCCS.narration(sh, k)), d = Math.max(it.dur, b.duration + .9);
          sched.push({ it, S, d }); voices.push({ buf:b, at:S + .3 }); S += d;
        }
        total = S; draw = (T, g) => { let s = sched[sched.length - 1]; for(const e of sched) if(T < e.S + e.d){ s = e; break; } SCCS.drawFrame(g, id, s.it.start + Math.min(Math.max(0, T - s.S), s.it.dur - .02)); };
      }
    } else {                                                                          /* Ma voix (micro) */
      if(!sh) throw new Error('Pour enregistrer ta voix, choisis un diaporama dans la liste.');
      status('🎙 Autorise le micro…'); mic = await navigator.mediaDevices.getUserMedia({ audio:{ echoCancellation:true, noiseSuppression:true } });
      total = sh.dur; $('voPrompt').style.display = 'block';
      draw = (T, g) => { let k = sh.tl.findIndex(e => T >= e.start && T < e.start + e.dur); if(k < 0) k = sh.tl.length - 1; SCCS.drawFrame(g, id, Math.min(T, sh.dur - .02)); const left = Math.ceil(sh.tl[k].start + sh.tl[k].dur - T); $('voPrompt').innerHTML = '🎙 <b>Parle maintenant</b> (' + left + ' s)<br><span style="font-size:18px">' + X().esc(SCCS.narration(sh, k)) + '</span>'; };
    }
    status('🔴 Enregistrement de la vidéo… garde cette page ouverte'); prog(0);
    const out = await rec(total, draw, voices, mus, mic, prog); if(mic) mic.getTracks().forEach(t => t.stop());
    last = { blob:out.blob, name:X().slug(title) + '-voix-off.' + out.ext, title };
    const d = $('voDone'); d.innerHTML = '✅ <b>' + X().esc(title) + '</b> avec voix off est prête (' + (out.blob.size / 1048576).toFixed(1) + ' Mo, ' + out.ext.toUpperCase() + ').<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px"><button class="btn btn-primary" id="voSave" style="margin:0;width:auto">⬇ Télécharger</button><button class="btn btn-ghost" id="voSend" style="margin:0;width:auto">📤 Envoyer (WhatsApp…)</button></div>';
    d.style.display = 'block'; status('');
    $('voSave').onclick = () => { const a = document.createElement('a'); a.href = URL.createObjectURL(last.blob); a.download = last.name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 4000); };
    $('voSend').onclick = async () => { const f = new File([last.blob], last.name, { type:last.blob.type }); try{ if(navigator.canShare && navigator.canShare({ files:[f] })) await navigator.share({ files:[f], title }); else alert('Touche « Télécharger », puis envoie le fichier depuis WhatsApp.'); }catch(e){} };
    $('voSave').click();
  }catch(err){ const msg = X().esc(err && err.message || err); status('⚠️ ' + msg + (M === 'ia' && !/Annulé/.test(msg) ? '<br>👉 Choisis <b>« 🎙 Ma voix (micro) »</b> : elle marche sur tous les appareils.' : '')); if(M !== 'ia') alert(err && err.message || err); }
  clearInterval(tick); $('voStop').style.display = 'none'; $('voPrompt').style.display = 'none'; $('voGo').disabled = false; busy = false; t00 = 0;
}

function build(){
  const host = $('adminTab-live'); if(!host || $('voBox') || !window.SCC_EXPORT || typeof SCCS === 'undefined') return;
  const b = document.createElement('details'); b.id = 'voBox'; b.style.cssText = 'margin:0 0 16px;padding:14px;border-radius:14px;background:rgba(127,127,127,.12)';
  b.innerHTML = '<summary style="cursor:pointer;font-weight:800">🔊 Studio voix off : vidéo avec voix à envoyer</summary>'
   + '<p class="hint" style="margin:10px 0">Choisis un diaporama (ou importe une vidéo sans voix off) : le studio fabrique une vidéo avec la voix, à envoyer au client.</p>'
   + '<input id="voQ" class="input" type="search" placeholder="🔎 Chercher un diaporama…" style="margin-bottom:8px"><select id="voShow" class="input" style="margin-bottom:8px"></select>'
   + '<select id="voQual" class="input" style="margin-bottom:8px"><option value="cloud">🎙 Voix naturelle française (gratuite, sans clé) — conseillée</option><option value="clair">🔊 Voix robot de secours (tous appareils)</option><option value="low">🤖 Voix IA naturelle rapide (essai, peut ne pas démarrer)</option><option value="medium">🤖 Voix IA naturelle (essai, ordinateur)</option></select>'
   + '<select id="voMode" class="input" style="margin-bottom:8px"><option value="ia">🔊 Voix automatique française</option><option value="mic">🎙 Ma voix (micro)</option></select>'
   + '<details style="margin-bottom:8px"><summary class="hint" style="cursor:pointer">📂 Importer une vidéo sans voix off (facultatif)</summary><input id="voFile" type="file" accept="video/*" style="margin:8px 0;width:100%"><textarea id="voTxt" class="input" rows="4" placeholder="Texte à dire sur cette vidéo (voix IA)"></textarea></details>'
   + '<label style="display:block;margin:6px 0 10px"><input type="checkbox" id="voMus" checked> 🎵 Musique douce en fond</label>'
   + '<button class="btn btn-primary" id="voGo" style="margin:0 0 8px">🎬 Créer la vidéo avec voix off</button>'
   + '<button class="btn btn-ghost" id="voStop" style="margin:0 0 8px;display:none">⏹ Arrêter</button>'
   + '<p id="voStat" class="hint" style="margin:6px 0"></p><p id="voLog" class="hint" style="margin:0 0 6px;font-size:12px;opacity:.7"></p><progress id="voBar" max="100" value="0" style="width:100%;display:none"></progress>'
   + '<div id="voPrompt" style="display:none;margin:8px 0;padding:12px;border-radius:12px;background:#fff;color:#222;font-size:16px;text-align:center"></div>'
   + '<div id="voDone" style="display:none;margin:8px 0;padding:10px;border-radius:10px;background:rgba(60,160,90,.2)"></div>';
  host.appendChild(b);
  const fill = () => { const q = ($('voQ').value || '').toLowerCase(); $('voShow').innerHTML = SCCS.shows.filter(s => !q || s.titre.toLowerCase().includes(q)).slice(0, 120).map(s => '<option value="' + X().esc(s.id) + '">' + X().esc(s.titre) + ' (' + X().fmt(s.dur) + ')</option>').join(''); };
  $('voQ').oninput = fill; fill(); $('voGo').onclick = run; $('voStop').onclick = () => { if(cancelFn) cancelFn(); };
  $('voShow').onchange = () => { const s = SCCS.byId[$('voShow').value]; if(s && !$('voTxt').value) $('voTxt').placeholder = 'Texte à dire (voix IA). Exemple pour ce diaporama : ' + SCCS.narration(s, 1).slice(0, 80) + '…'; };
}
setInterval(build, 2000);
})();

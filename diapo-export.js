/* TÉLÉCHARGER UN DIAPORAMA EN VIDÉO — uniquement dans l'espace administrateur (onglet de la chaîne en direct).
   Chaque diaporama de la boucle est enregistré par le navigateur en fichier vidéo (MP4 si possible, sinon WebM), avec musique douce facultative.
   La voix off n'est pas incluse : un navigateur ne peut pas enregistrer la voix de l'appareil. */
(function(){
'use strict';
const $ = id => document.getElementById(id);
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt = s => Math.floor(s / 60) + ':' + String(Math.round(s % 60)).padStart(2, '0');
const slug = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase().slice(0, 60) || 'diaporama';
const W = 960, H = 540;
let busy = false, last = null;

function pickMime(){
  const c = ['video/mp4;codecs=avc1.42E01E,mp4a.40.2', 'video/mp4;codecs=avc1', 'video/mp4', 'video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'];
  return c.find(m => window.MediaRecorder && MediaRecorder.isTypeSupported(m)) || '';
}
function music(ac, dest, dur){                    /* musique douce : nappes d'accords lents, avec fondu d'entrée et de sortie */
  const out = ac.createGain(), t0 = ac.currentTime; out.connect(dest);
  out.gain.setValueAtTime(0, t0); out.gain.linearRampToValueAtTime(.16, t0 + 2); out.gain.setValueAtTime(.16, Math.max(t0 + 2, t0 + dur - 2)); out.gain.linearRampToValueAtTime(0, t0 + dur);
  const ch = [[261.6, 329.6, 392], [220, 261.6, 329.6], [174.6, 220, 261.6], [196, 246.9, 392]], step = 8;
  for(let s = 0; s * step < dur; s++) ch[s % 4].forEach((f, i) => {
    const o = ac.createOscillator(), g = ac.createGain(), st = t0 + s * step; o.type = i ? 'sine' : 'triangle'; o.frequency.value = f;
    g.gain.setValueAtTime(0, st); g.gain.linearRampToValueAtTime(.3, st + 1.2); g.gain.linearRampToValueAtTime(0, st + step + .6);
    o.connect(g); g.connect(out); o.start(st); o.stop(st + step + .7);
  });
}

async function record(id, withMusic, onProg){
  const sh = SCCS.byId[id], dur = sh.dur, cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const g = cv.getContext('2d'), stream = cv.captureStream(30); let ac = null;
  SCCS.drawFrame(g, id, 0);
  if(withMusic){ try{ ac = new (window.AudioContext || window.webkitAudioContext)(); const d = ac.createMediaStreamDestination(); music(ac, d, dur); d.stream.getAudioTracks().forEach(t => stream.addTrack(t)); }catch(e){ ac = null; } }
  const mime = pickMime(), chunks = [], rec = new MediaRecorder(stream, mime ? { mimeType:mime, videoBitsPerSecond:2500000 } : { videoBitsPerSecond:2500000 });
  rec.ondataavailable = e => { if(e.data && e.data.size) chunks.push(e.data); };
  const done = new Promise(r => { rec.onstop = r; });
  rec.start(500);
  const t0 = performance.now();
  await new Promise(res => {
    const draw = () => { const t = (performance.now() - t0) / 1000; if(t >= dur){ clearInterval(iv); SCCS.drawFrame(g, id, dur - .02); onProg(1); res(); return false; } SCCS.drawFrame(g, id, t); onProg(t / dur); return true; };
    const iv = setInterval(draw, 200);                /* secours si l'onglet passe en arrière-plan */
    (function raf(){ if(draw()) requestAnimationFrame(raf); })();
  });
  await new Promise(r => setTimeout(r, 400)); rec.stop(); await done; if(ac) try{ ac.close(); }catch(e){}
  const type = (rec.mimeType || mime || 'video/webm').split(';')[0], ext = type.includes('mp4') ? 'mp4' : 'webm';
  return { blob:new Blob(chunks, { type }), ext, name:slug(sh.titre) + '.' + ext, title:sh.titre };
}

function build(){
  const host = $('adminTab-live'); if(!host || $('dlBox') || typeof SCCS === 'undefined' || !SCCS.shows) return;
  const b = document.createElement('details'); b.id = 'dlBox'; b.style.cssText = 'margin:0 0 16px;padding:14px;border-radius:14px;background:rgba(127,127,127,.12)';
  const cats = [...new Set(SCCS.shows.map(s => s.cat))];
  b.innerHTML = '<summary style="cursor:pointer;font-weight:800">🎞️ Télécharger un diaporama en vidéo (à envoyer à un client)</summary>'
   + '<p class="hint" style="margin:10px 0">Choisis un diaporama, il est enregistré en fichier vidéo que tu peux envoyer par WhatsApp. L\'enregistrement dure aussi longtemps que le diaporama : garde cette page ouverte et à l\'écran.</p>'
   + '<input id="dlQ" class="input" type="search" placeholder="🔎 Chercher un diaporama…" style="margin-bottom:8px"><select id="dlCat" class="input" style="margin-bottom:8px"><option value="">Toutes les catégories</option>' + cats.map(c => '<option>' + esc(c) + '</option>').join('') + '</select>'
   + '<label style="display:block;margin:6px 0 10px"><input type="checkbox" id="dlMus" checked> 🎵 Ajouter la musique douce</label>'
   + '<div id="dlRun" style="display:none;margin:8px 0;padding:10px;border-radius:10px;background:rgba(217,138,76,.18)"><div id="dlRunT" style="font-weight:700;margin-bottom:6px"></div><progress id="dlBar" max="100" value="0" style="width:100%"></progress></div>'
   + '<div id="dlDone" style="display:none;margin:8px 0;padding:10px;border-radius:10px;background:rgba(60,160,90,.2)"></div>'
   + '<div id="dlList" style="max-height:340px;overflow:auto"></div>';
  host.appendChild(b);
  const fill = () => {
    const q = ($('dlQ').value || '').toLowerCase(), c = $('dlCat').value;
    const L = SCCS.shows.filter(s => (!c || s.cat === c) && (!q || s.titre.toLowerCase().includes(q)));
    $('dlList').innerHTML = L.slice(0, 80).map(s => '<div style="display:flex;gap:8px;align-items:center;justify-content:space-between;padding:8px 0;border-top:1px solid rgba(127,127,127,.25)"><div style="min-width:0"><div style="font-size:14px;font-weight:600">' + esc(s.titre) + '</div><div class="hint">' + esc(s.cat) + ' · ' + fmt(s.dur) + '</div></div><button class="btn btn-primary" data-id="' + esc(s.id) + '" style="margin:0;width:auto;white-space:nowrap">⬇ Vidéo</button></div>').join('') + (L.length > 80 ? '<p class="hint">' + (L.length - 80) + ' autres : précise ta recherche.</p>' : '') || '<p class="hint">Aucun résultat.</p>';
  };
  $('dlQ').oninput = fill; $('dlCat').onchange = fill; fill();
  $('dlList').onclick = async e => {
    const btn = e.target.closest('button[data-id]'); if(!btn) return;
    if(busy) return alert('Un enregistrement est déjà en cours : attends qu\'il se termine.');
    if(!window.MediaRecorder || !HTMLCanvasElement.prototype.captureStream) return alert('Ce navigateur ne sait pas enregistrer de vidéo. Utilise Google Chrome sur ordinateur ou Android.');
    const id = btn.dataset.id, sh = SCCS.byId[id]; busy = true; $('dlDone').style.display = 'none'; $('dlRun').style.display = 'block'; $('dlRunT').textContent = '🔴 Enregistrement : ' + sh.titre;
    try{
      last = await record(id, $('dlMus').checked, p => { $('dlBar').value = Math.round(p * 100); $('dlRunT').textContent = '🔴 Enregistrement : ' + sh.titre + ' (' + Math.round(p * 100) + ' %)'; });
      const mo = (last.blob.size / 1048576).toFixed(1), d = $('dlDone');
      d.innerHTML = '✅ <b>' + esc(last.title) + '</b> est prête (' + mo + ' Mo, ' + last.ext.toUpperCase() + ').<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px"><button class="btn btn-primary" id="dlSave" style="margin:0;width:auto">⬇ Télécharger</button><button class="btn btn-ghost" id="dlSend" style="margin:0;width:auto">📤 Envoyer (WhatsApp…)</button></div>' + (last.ext === 'webm' ? '<p class="hint" style="margin:8px 0 0">Ce navigateur produit du WebM : certains téléphones (iPhone) ne le lisent pas. Avec Chrome récent, tu obtiens du MP4.</p>' : '');
      d.style.display = 'block';
      $('dlSave').onclick = () => { const a = document.createElement('a'); a.href = URL.createObjectURL(last.blob); a.download = last.name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 4000); };
      $('dlSend').onclick = async () => { const f = new File([last.blob], last.name, { type:last.blob.type }); try{ if(navigator.canShare && navigator.canShare({ files:[f] })) await navigator.share({ files:[f], title:last.title }); else alert('Le partage direct n\'est pas disponible ici : touche « Télécharger », puis envoie le fichier depuis WhatsApp.'); }catch(e){} };
      $('dlSave').click();
    }catch(err){ alert('L\'enregistrement a échoué : ' + (err && err.message || err)); }
    $('dlRun').style.display = 'none'; busy = false;
  };
}
setInterval(build, 2000);
})();

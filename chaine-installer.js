/* CHAÎNE EN APPLICATION — lien direct + QR code + bouton « Installer ».
   Lien : …/index.html?app=chaine → ouvre directement la chaîne (gratuite ou avec pass), installable sur téléphone, tablette et ordinateur.
   Admin : carte « QR code et lien de la chaîne » en haut de l'onglet de la chaîne en direct. Nécessite qr-lib.js et manifest-chaine.json. */
(function(){
'use strict';
const $ = id => document.getElementById(id);
const BASE = location.href.split('#')[0].split('?')[0].replace(/[^/]*$/, '');
const LINK = BASE + 'index.html?app=chaine';
const MODE = /[?&]app=chaine/.test(location.search);
const standalone = () => (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const say = (m, k) => { try{ toast(m, k || 'ok'); }catch(e){} };
let evt = null;
window.addEventListener('beforeinstallprompt', e => { evt = e; });
window.addEventListener('appinstalled', () => { evt = null; say('✅ La chaîne est installée !'); });

/* ---- Ouvrir directement la chaîne quand on arrive par le lien / le QR code / l'icône installée ---- */
if(MODE){
  let touched = false, n = 0;
  document.addEventListener('pointerdown', () => { touched = true; }, { once:true, capture:true });
  const t = setInterval(() => {
    const s = $('screen-live');
    if(touched || ++n > 25){ clearInterval(t); return; }
    if(s && !s.classList.contains('active') && typeof showScreen === 'function'){ try{ showScreen('live'); }catch(e){} }
  }, 400);
}

/* ---- QR code ---- */
function drawQR(cv, text, size){
  const m = sccQR(text), n = m.length, q = 4, px = Math.max(2, Math.floor(size / (n + 2 * q))), W = px * (n + 2 * q);
  cv.width = cv.height = W; const g = cv.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, W, W); g.fillStyle = '#000';
  for(let r = 0; r < n; r++) for(let c = 0; c < n; c++) if(m[r][c]) g.fillRect((c + q) * px, (r + q) * px, px, px);
}
function qrPng(){
  const cv = document.createElement('canvas'), tmp = document.createElement('canvas'); drawQR(tmp, LINK, 520);
  cv.width = 640; cv.height = 760; const g = cv.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, 640, 760);
  g.drawImage(tmp, 60, 120, 520, 520); g.fillStyle = '#222'; g.textAlign = 'center';
  g.font = 'bold 34px system-ui, sans-serif'; g.fillText('SHAMAN CHOOZ CHANEL', 320, 62);
  g.font = '26px system-ui, sans-serif'; g.fillText('Scanne pour regarder la chaîne en direct', 320, 100);
  g.font = '22px system-ui, sans-serif'; g.fillText('Installable sur téléphone, tablette et ordinateur', 320, 700);
  return cv.toDataURL('image/png');
}
const copy = async () => { try{ await navigator.clipboard.writeText(LINK); say('🔗 Lien copié !'); }catch(e){ prompt('Copie ce lien :', LINK); } };
const share = () => { const t = 'Regarde SHAMAN CHOOZ CHANEL en direct : ' + LINK; if(navigator.share) navigator.share({ title:'SHAMAN CHOOZ CHANEL', text:'Regarde SHAMAN CHOOZ CHANEL, la chaîne en direct :', url:LINK }).catch(() => {}); else window.open('https://wa.me/?text=' + encodeURIComponent(t), '_blank'); };

/* ---- Installer ---- */
async function install(){
  if(evt){ try{ evt.prompt(); await evt.userChoice; }catch(e){} evt = null; return; }
  if(!MODE){ location.href = LINK; return; }                 /* le navigateur propose l'installation de la chaîne depuis ce lien */
  alert(ios ? 'Sur iPhone / iPad : touche le bouton Partager (le carré avec une flèche), puis « Sur l\'écran d\'accueil ».' : 'Dans le menu de ton navigateur (⋮ ou ⋯), choisis « Installer l\'application » ou « Ajouter à l\'écran d\'accueil ».');
}

/* ---- Carte pour les spectateurs (sur l'écran de la chaîne) : QR code + lien + partager + installer ---- */
function viewerCard(){
  const scr = $('screen-live'); if(!scr || $('chInstall')) return;
  const c = document.createElement('div'); c.id = 'chInstall';
  c.style.cssText = 'margin:28px 0 12px;padding:16px;border-radius:14px;background:rgba(217,138,76,.16);border:1px solid rgba(217,138,76,.5);text-align:center';
  c.innerHTML = '<p style="margin:0 0 6px;font-weight:800">📲 Partage la chaîne</p>'
   + '<p class="hint" style="margin:0 0 10px">Scanne le QR code ou touche le lien : la chaîne s\'ouvre directement. Partage-la à tes parents, amis et visiteurs.</p>'
   + '<canvas id="chQr" style="display:block;margin:0 auto 10px;max-width:100%;border-radius:8px"></canvas>'
   + '<input id="chLinkIn" class="input" readonly style="margin:0 0 10px;text-align:center">'
   + '<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">'
   + '<button class="btn btn-primary" id="chShareBtn" style="margin:0;width:auto">📤 Partager la chaîne</button>'
   + '<button class="btn btn-primary" id="chInstBtn" style="margin:0;width:auto">⬇ Installer la chaîne</button>'
   + '<button class="btn btn-ghost" id="chCopyBtn" style="margin:0;width:auto">🔗 Copier le lien</button>'
   + '<button class="btn btn-ghost" id="chDlBtn" style="margin:0;width:auto">⬇ Image du QR</button></div>';
  scr.appendChild(c);   /* toujours en dernier : on voit d'abord la chaîne, puis on défile vers le QR code */
  drawQR($('chQr'), LINK, 260); $('chLinkIn').value = LINK;
  $('chInstBtn').onclick = install; $('chCopyBtn').onclick = copy; $('chShareBtn').onclick = share;
  $('chDlBtn').onclick = () => { const a = document.createElement('a'); a.href = qrPng(); a.download = 'qr-code-chaine-shaman-chooz.png'; document.body.appendChild(a); a.click(); a.remove(); };
  if(standalone()) $('chInstBtn').style.display = 'none';
}

/* ---- Carte admin : QR code + lien + téléchargement ---- */
function adminCard(){
  const host = $('adminTab-live'); if(!host || $('chAdminQr')) return;
  const b = document.createElement('div'); b.id = 'chAdminQr'; b.style.cssText = 'margin:0 0 16px;padding:14px;border-radius:14px;background:rgba(127,127,127,.12);text-align:center';
  b.innerHTML = '<p class="field-label" style="margin:0">📲 QR code et lien de la chaîne</p><p class="hint" style="margin:6px 0 10px">Tes spectateurs scannent le QR code ou ouvrent le lien : la chaîne s\'ouvre directement (gratuite ou avec pass) et ils peuvent l\'installer.</p><canvas id="chAdminQrCv" style="max-width:100%;border-radius:8px"></canvas>'
   + '<input id="chAdminLink" class="input" readonly style="margin:10px 0;text-align:center"><div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center"><button class="btn btn-primary" id="chaCopy" style="margin:0;width:auto">🔗 Copier le lien</button><button class="btn btn-ghost" id="chaShare" style="margin:0;width:auto">💬 Partager</button><button class="btn btn-ghost" id="chaDl" style="margin:0;width:auto">⬇ Télécharger le QR code</button></div>';
  const vb = $('viewersBox'); if(vb) vb.insertAdjacentElement('afterend', b); else host.insertBefore(b, host.firstChild);
  drawQR($('chAdminQrCv'), LINK, 260); $('chAdminLink').value = LINK;
  $('chaCopy').onclick = copy; $('chaShare').onclick = share;
  $('chaDl').onclick = () => { const a = document.createElement('a'); a.href = qrPng(); a.download = 'qr-code-chaine-shaman-chooz.png'; document.body.appendChild(a); a.click(); a.remove(); };
}
setInterval(() => { if(typeof sccQR !== 'function') return; viewerCard(); adminCard(); { const c = $('chInstall'), p = $('screen-live'); if(c && p && p.lastElementChild !== c) p.appendChild(c); } }, 2000);
window.SCC_CHAINE_LIEN = LINK;
})();

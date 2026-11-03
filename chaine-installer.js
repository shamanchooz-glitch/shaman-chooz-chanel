/* CHAÎNE + JEUX EN APPLICATION — lien direct + QR code + bouton « Partager » + bouton « Installer ».
   Lien : …/?app=chaine → ouvre UNIQUEMENT la chaîne et les jeux (le reste du site est masqué : voir chaine-mode.js), installable sur téléphone, tablette et ordinateur.
   Admin : carte « QR code et lien de la chaîne » en haut de l'onglet de la chaîne en direct. Nécessite qr-lib.js et manifest-chaine.json. */
(function(){
'use strict';
const $ = id => document.getElementById(id);
/* ADRESSE OFFICIELLE DE LA CHAÎNE. Laisse vide : le site détecte tout seul sa vraie adresse en ligne.
   Si un jour ton site change d'adresse (nouveau nom de domaine), colle ici l'adresse complète, ex. 'https://monsite.com/' */
const LIEN_OFFICIEL = '';
function baseUrl(){
  let u = LIEN_OFFICIEL ? String(LIEN_OFFICIEL).replace(/[?#].*$/, '') : (location.protocol + '//' + location.host + location.pathname);
  u = u.replace(/index\.html$/i, '');
  if(!/\/$/.test(u)){ const last = u.split('/').pop(); u = last.indexOf('.') < 0 ? u + '/' : u.replace(/[^/]*$/, ''); }   /* …/mon-site  →  …/mon-site/ */
  if(/^http:\/\//i.test(u) && !/^http:\/\/(localhost|127\.|192\.168\.|10\.)/i.test(u)) u = u.replace(/^http:/i, 'https:');   /* https partout : indispensable pour l'installation, le plein écran et le son */
  return u;
}
const BASE = baseUrl();
const LINK = BASE + '?app=chaine';
const LINK_OK = /^https:\/\//i.test(LINK) && !/^https:\/\/(localhost|127\.|192\.168\.|10\.)/i.test(LINK);   /* faux si le site est ouvert depuis un fichier ou un test local */
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

/* ---- QR code ----
   Fabriqué pour être lu par TOUS les téléphones, récents ou anciens : noir pur sur blanc pur, marge blanche de 4 modules,
   modules de taille entière (jamais flous), protection renforcée (Q) quand elle ne rend pas le code plus serré (sinon M),
   et le lien est écrit en toutes lettres sous l'image téléchargée au cas où l'appareil photo ne lit pas le code. */
function qrMatrix(text){
  const m = sccQR(text, 'M'), q = sccQR(text, 'Q');
  return q.length === m.length ? q : m;   /* plus de protection (Q) seulement si le code n'en devient pas plus serré : gros carrés = lecture facile, même sur un vieux téléphone */
}
function paintQR(g, m, x0, y0, px){
  g.fillStyle = '#000';
  for(let r = 0; r < m.length; r++) for(let c = 0; c < m.length; c++) if(m[r][c]) g.fillRect(x0 + c * px, y0 + r * px, px, px);
}
function drawQR(cv, text, size){
  const m = qrMatrix(text), n = m.length, q = 4, px = Math.max(3, Math.floor(size / (n + 2 * q))), W = px * (n + 2 * q);
  cv.width = cv.height = W; const g = cv.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, W, W);
  paintQR(g, m, q * px, q * px, px);
}
function qrPng(){
  const m = qrMatrix(LINK), n = m.length, q = 4, px = Math.max(8, Math.floor(560 / (n + 2 * q))), side = n * px;
  const CW = 720, x0 = Math.round((CW - side) / 2), y0 = 150, yText = y0 + side + q * px + 20, CH = yText + 120;
  const cv = document.createElement('canvas'); cv.width = CW; cv.height = CH;
  const g = cv.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, CW, CH);
  paintQR(g, m, x0, y0, px);
  g.fillStyle = '#222'; g.textAlign = 'center';
  g.font = 'bold 38px system-ui, Arial, sans-serif'; g.fillText('SHAMAN CHOOZ CHANEL', CW / 2, 62);
  g.font = '28px system-ui, Arial, sans-serif'; g.fillText('Scanne : la chaîne en direct et les jeux', CW / 2, 106);
  let fs = 30; g.font = 'bold ' + fs + 'px system-ui, Arial, sans-serif';
  while(g.measureText(LINK).width > CW - 40 && fs > 14){ fs -= 1; g.font = 'bold ' + fs + 'px system-ui, Arial, sans-serif'; }
  g.fillText(LINK, CW / 2, yText + 10);
  g.font = '22px system-ui, Arial, sans-serif'; g.fillText('Le QR code ne s\'ouvre pas ? Tape ce lien dans ton navigateur.', CW / 2, yText + 56);
  g.fillText('Installable sur téléphone, tablette et ordinateur', CW / 2, yText + 92);
  return cv.toDataURL('image/png');
}
const copy = async () => {
  try{ await navigator.clipboard.writeText(LINK); say('🔗 Lien copié !'); return; }catch(e){}
  try{ const t = document.createElement('textarea'); t.value = LINK; t.style.cssText = 'position:fixed;opacity:0;top:0'; document.body.appendChild(t); t.focus(); t.select(); const ok = document.execCommand('copy'); t.remove(); if(ok){ say('🔗 Lien copié !'); return; } }catch(e){}
  prompt('Copie ce lien :', LINK);
};
const SHARE_TITLE = 'SHAMAN CHOOZ — Chaîne et Jeux', SHARE_TEXT = 'Regarde la chaîne SHAMAN CHOOZ en direct et joue aux jeux :';
/* Partage : ouvre la feuille de partage du téléphone (WhatsApp, SMS, Facebook, Messenger, Telegram, AirDrop…).
   Si le navigateur ne sait pas le faire (ordinateur, vieux navigateur), on affiche notre propre feuille de partage. */
function shareSheet(){
  if($('chShareSheet')) return;
  const e = encodeURIComponent, full = e(SHARE_TEXT + ' ' + LINK);
  const opts = [
    ['💬 WhatsApp', 'https://wa.me/?text=' + full],
    ['📘 Facebook', 'https://www.facebook.com/sharer/sharer.php?u=' + e(LINK)],
    ['✈️ Telegram', 'https://t.me/share/url?url=' + e(LINK) + '&text=' + e(SHARE_TEXT)],
    ['📩 SMS', 'sms:?&body=' + full],
    ['✉️ E-mail', 'mailto:?subject=' + e(SHARE_TITLE) + '&body=' + full]
  ];
  const o = document.createElement('div'); o.id = 'chShareSheet';
  o.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999;background:rgba(0,0,0,.55);display:flex;align-items:flex-end;justify-content:center';
  o.innerHTML = '<div style="width:100%;max-width:480px;background:var(--surface,#fff);color:var(--text,#222);border-radius:18px 18px 0 0;padding:18px 16px calc(18px + env(safe-area-inset-bottom));box-sizing:border-box">'
   + '<p style="margin:0 0 12px;font-weight:800;text-align:center">📤 Partager la chaîne et les jeux</p>'
   + opts.map(x => '<a class="btn btn-ghost" style="display:block;text-align:center;text-decoration:none;margin:0 0 8px" target="_blank" rel="noopener" href="' + x[1] + '">' + x[0] + '</a>').join('')
   + '<button class="btn btn-primary" id="chShCopy" style="margin:0 0 8px">🔗 Copier le lien</button>'
   + '<button class="btn btn-ghost" id="chShClose" style="margin:0">Fermer</button></div>';
  document.body.appendChild(o);
  const close = () => o.remove();
  o.onclick = ev => { if(ev.target === o) close(); };
  $('chShClose').onclick = close; $('chShCopy').onclick = () => { copy(); close(); };
}
const share = async () => {
  const data = { title: SHARE_TITLE, text: SHARE_TEXT, url: LINK };
  if(navigator.share){
    try{ if(navigator.canShare && !navigator.canShare(data)) throw new Error('no'); await navigator.share(data); return; }
    catch(e){ if(e && e.name === 'AbortError') return; }   /* l'utilisateur a fermé la feuille : on s'arrête là */
  }
  shareSheet();
};
const dlQr = () => { const a = document.createElement('a'); a.href = qrPng(); a.download = 'qr-code-chaine-et-jeux-shaman-chooz.png'; document.body.appendChild(a); a.click(); a.remove(); };

/* ---- Installer ---- */
async function install(){
  if(evt){ try{ evt.prompt(); await evt.userChoice; }catch(e){} evt = null; return; }
  if(!MODE){ location.href = LINK; return; }                 /* le navigateur propose l'installation de la chaîne depuis ce lien */
  alert(ios ? 'Sur iPhone / iPad : touche le bouton Partager (le carré avec une flèche), puis « Sur l\'écran d\'accueil ».' : 'Dans le menu de ton navigateur (⋮ ou ⋯), choisis « Installer l\'application » ou « Ajouter à l\'écran d\'accueil ».');
}

/* ---- Carte pour les spectateurs (écrans Chaîne ET Jeux) : QR code + lien + partager + installer ---- */
function viewerCard(scrId, k){
  const scr = $(scrId); if(!scr || $('chInstall' + k)) return;
  const c = document.createElement('div'); c.id = 'chInstall' + k;
  c.style.cssText = 'margin:28px 0 12px;padding:16px;border-radius:14px;background:rgba(217,138,76,.16);border:1px solid rgba(217,138,76,.5);text-align:center';
  c.innerHTML = '<p style="margin:0 0 6px;font-weight:800">📲 Partage la chaîne et les jeux</p>'
   + '<p class="hint" style="margin:0 0 10px">Scanne le QR code ou touche le lien : la chaîne et les jeux s\'ouvrent directement. Partage-les à tes parents, amis et visiteurs.</p>'
   + '<canvas id="chQr' + k + '" style="display:block;margin:0 auto 10px;max-width:100%;height:auto;image-rendering:pixelated;border-radius:8px"></canvas>'
   + '<input id="chLinkIn' + k + '" class="input" readonly style="margin:0 0 10px;text-align:center">'
   + '<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">'
   + '<button class="btn btn-primary" id="chShareBtn' + k + '" style="margin:0;width:auto">📤 Partager</button>'
   + '<button class="btn btn-primary" id="chInstBtn' + k + '" style="margin:0;width:auto">⬇ Installer</button>'
   + '<button class="btn btn-ghost" id="chCopyBtn' + k + '" style="margin:0;width:auto">🔗 Copier le lien</button>'
   + '<button class="btn btn-ghost" id="chDlBtn' + k + '" style="margin:0;width:auto">⬇ Image du QR</button></div>';
  scr.appendChild(c);   /* toujours en dernier : on voit d'abord la chaîne / les jeux, puis on défile vers le QR code */
  drawQR($('chQr' + k), LINK, 260); $('chLinkIn' + k).value = LINK;
  $('chInstBtn' + k).onclick = install; $('chCopyBtn' + k).onclick = copy; $('chShareBtn' + k).onclick = share; $('chDlBtn' + k).onclick = dlQr;
  if(standalone()) $('chInstBtn' + k).style.display = 'none';
}
/* ---- Bouton « Partager » tout en haut de l'écran Chaîne et de l'écran Jeux (un seul geste pour ouvrir le partage du téléphone) ---- */
function topShare(scrId, k){
  const scr = $(scrId); if(!scr || $('chTopShare' + k)) return;
  const sub = scr.querySelector('.section-sub') || scr.querySelector('.section-title'); if(!sub) return;
  const d = document.createElement('div'); d.id = 'chTopShare' + k; d.style.cssText = 'margin:8px 0 12px';
  d.innerHTML = '<button class="btn btn-ghost" style="width:100%;margin:0">📤 Partager la chaîne et les jeux</button>';
  d.querySelector('button').onclick = share;
  sub.insertAdjacentElement('afterend', d);
}

/* ---- Carte admin : QR code + lien + téléchargement ---- */
function adminCard(){
  const host = $('adminTab-live'); if(!host || $('chAdminQr')) return;
  const b = document.createElement('div'); b.id = 'chAdminQr'; b.style.cssText = 'margin:0 0 16px;padding:14px;border-radius:14px;background:rgba(127,127,127,.12);text-align:center';
  b.innerHTML = '<p class="field-label" style="margin:0">📲 QR code et lien de la chaîne + jeux</p><p class="hint" style="margin:6px 0 10px">Tes spectateurs scannent le QR code ou ouvrent le lien : seuls la chaîne et les jeux s\'ouvrent (gratuits ou avec pass). Le reste du site reste caché. Ils peuvent aussi l\'installer.</p><canvas id="chAdminQrCv" style="max-width:100%;height:auto;image-rendering:pixelated;border-radius:8px"></canvas>'
   + '<input id="chAdminLink" class="input" readonly style="margin:10px 0;text-align:center"><div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center"><button class="btn btn-primary" id="chaCopy" style="margin:0;width:auto">🔗 Copier le lien</button><button class="btn btn-ghost" id="chaShare" style="margin:0;width:auto">📤 Partager</button><button class="btn btn-ghost" id="chaDl" style="margin:0;width:auto">⬇ Télécharger le QR code</button></div>';
  const vb = $('viewersBox'); if(vb) vb.insertAdjacentElement('afterend', b); else host.insertBefore(b, host.firstChild);
  drawQR($('chAdminQrCv'), LINK, 260); $('chAdminLink').value = LINK;
  if(!LINK_OK){
    const w = document.createElement('p'); w.className = 'hint'; w.style.cssText = 'color:#c0392b;font-weight:700;margin:0 0 10px';
    w.textContent = '⚠️ Ce lien n\'est pas l\'adresse en ligne de ton site (https). Ouvre ton site depuis son adresse internet officielle, puis reviens ici pour récupérer le bon QR code.';
    $('chAdminQrCv').insertAdjacentElement('beforebegin', w);
  }
  $('chaCopy').onclick = copy; $('chaShare').onclick = share; $('chaDl').onclick = dlQr;
}
/* ---- Bouton « Installer la chaîne » juste sous le bandeau orange (#sccsBanner), visible dès l'ouverture du lien ---- */
function installBar(){
  const A = $('liveAccessWrap'); if(!A || !A.parentElement) return;
  let bar = $('chInstallTop');
  if(standalone()){ if(bar) bar.remove(); return; }
  if(!bar){
    bar = document.createElement('div'); bar.id = 'chInstallTop'; bar.style.cssText = 'margin:8px 0 12px;text-align:center';
    bar.innerHTML = '<button class="btn btn-primary" style="width:100%;margin:0">⬇ Installer la chaîne</button><p class="hint" style="margin:6px 0 0">Un clic : la chaîne s\'ajoute sur ton écran d\'accueil.</p>';
    bar.querySelector('button').onclick = install;
  }
  const b = $('sccsBanner');
  if(b){ if(bar.previousElementSibling !== b) b.after(bar); }
  else if(bar.nextElementSibling !== A) A.parentElement.insertBefore(bar, A);
}
setInterval(() => {
  installBar(); if(typeof sccQR !== 'function') return;
  topShare('screen-live', 'L'); topShare('screen-games', 'G');
  viewerCard('screen-live', 'L'); viewerCard('screen-games', 'G'); adminCard();
  [['screen-live', 'chInstallL'], ['screen-games', 'chInstallG']].forEach(x => { const c = $(x[1]), p = $(x[0]); if(c && p && p.lastElementChild !== c) p.appendChild(c); });
}, 2000);
window.SCC_CHAINE_LIEN = LINK; window.SCC_CHAINE_SHARE = share;
})();

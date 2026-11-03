/* ==========================================================
   CHAÎNE — PLEIN ÉCRAN EN MODE PAYSAGE (téléphones, tablettes, ordinateurs)
   Fichier à ajouter tel quel : voir la ligne à coller dans index.html (après admin-preview.js).
   - « ⛶ Plein écran » : la vidéo passe en paysage et occupe tout l'écran, le plus grand possible.
   - Android / tablettes / ordinateurs : vrai plein écran + verrouillage en paysage quand le navigateur le permet.
   - iPhone ou tout appareil qui ne sait pas passer en paysage : la vidéo est tournée toute seule de 90°
     (il suffit de tourner le téléphone). Si tu tournes le téléphone, la rotation automatique s'enlève.
   - Dans l'appli installée sur l'écran d'accueil : plein écran sans aucun message du navigateur.
   - Boutons discrets en haut à droite (ils se cachent après 3 s, touche l'écran pour les revoir) :
     ↔ Remplir (zoom pour couvrir tout l'écran) · 🔄 Sens (inverse le côté) · ✕ Quitter.
   ========================================================== */
(function(){
'use strict';
const A = window.ADMINPREVIEW; if(!A) return;
let box = null, native = false, flip = false, cover = false, ui = null, hideT = 0;
const touch = () => { try{ return matchMedia('(pointer:coarse)').matches; }catch(e){ return false; } };

(function(){
  if(document.getElementById('scc-paysage-css')) return;
  const st = document.createElement('style'); st.id = 'scc-paysage-css';
  st.textContent = `
.live-player-box.scc-fs{ position:fixed !important; top:0; left:0; z-index:99999; margin:0 !important; padding:0 !important; background:#000; border-radius:0 !important; overflow:hidden; display:flex !important; align-items:center; justify-content:center; width:var(--bw) !important; height:var(--bh) !important; max-width:none !important; }
.live-player-box.scc-rot{ transform-origin:0 0; transform:translateX(var(--vw)) rotate(90deg); }
.live-player-box.scc-rot.scc-flip{ transform:translateY(var(--vh)) rotate(-90deg); }
body .live-player-box.scc-fs [data-slides], body .live-player-box.scc-fs iframe, body .live-player-box.scc-fs .sccs-frozen{ flex:none !important; border-radius:0 !important; max-height:none !important; width:var(--fw) !important; height:var(--fh) !important; }
body .live-player-box.scc-fs video{ flex:none !important; border-radius:0 !important; max-height:none !important; width:var(--bw) !important; height:var(--bh) !important; object-fit:contain; }
body .live-player-box.scc-fs.scc-cover video{ object-fit:cover; }
.scc-fs .fs-exit{ display:none !important; }
.scc-fs .live-indicator{ top:12px; left:12px; }
.scc-bar{ position:absolute; top:10px; right:10px; z-index:9; display:flex; gap:6px; transition:opacity .4s; }
.scc-bar button{ padding:9px 12px; border:none; border-radius:12px; background:rgba(0,0,0,.65); color:#fff; font:800 13px system-ui,sans-serif; cursor:pointer; touch-action:manipulation; }
.scc-bar.off{ opacity:0; pointer-events:none; }`;
  document.head.appendChild(st);
})();

function metrics(){
  if(!box) return;
  const nat = native && fsElement() === box;   /* en vrai plein écran du navigateur, une rotation est ignorée : on ne tourne pas l'image dans ce cas */
  const w = window.innerWidth, h = window.innerHeight, rot = touch() && h > w && !nat;   /* écran en portrait → on tourne la vidéo */
  const s = (k, v) => box.style.setProperty(k, v + 'px');
  const bw = rot ? h : w, bh = rot ? w : h;
  /* image 16/9 : « Tout voir » = elle tient en entier ; « Remplir » = elle couvre tout l'écran (calcul en pixels, lisible par tous les téléphones) */
  const fw = Math.floor(cover ? Math.max(bw, bh * 16 / 9) : Math.min(bw, bh * 16 / 9)), fh = Math.round(fw * 9 / 16);
  s('--vw', w); s('--vh', h); s('--bw', bw); s('--bh', bh); s('--fw', fw); s('--fh', fh);
  box.classList.toggle('scc-rot', rot); box.classList.toggle('scc-flip', rot && flip);
  if(ui) ui.flip.style.display = rot ? '' : 'none';
}
const later = () => { metrics(); setTimeout(metrics, 150); setTimeout(metrics, 500); };
/* Plein écran du navigateur accordé, mais le téléphone est resté en portrait (verrouillage du sens refusé : iPad, certains navigateurs Android) :
   on quitte le plein écran du navigateur et on tourne l'image nous-mêmes pour qu'elle remplisse tout l'écran. */
function portraitFallback(){
  if(!box || !native || fsElement() !== box) return;
  if(touch() && window.innerHeight > window.innerWidth){
    native = false;
    try{
      const ex = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
      const r = ex ? ex.call(document) : null; if(r && r.catch) r.catch(() => {});
    }catch(e){}
    later();
  }
}
function showBar(){
  if(!ui) return; ui.bar.classList.remove('off'); clearTimeout(hideT);
  hideT = setTimeout(() => { if(ui) ui.bar.classList.add('off'); }, 3000);
}
const FS_EVENTS = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'];
const fsElement = () => document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null;
function onFsChange(){
  if(box && native && !fsElement()) A.exitFullscreen();
}
function onKey(e){ if(e.key === 'Escape' && box && !native) A.exitFullscreen(); }

A.isFullscreen = b => !!b && b.classList.contains('scc-fs');

A.fullscreen = function(b){
  if(!b) return;
  if(box) return A.exitFullscreen();
  box = b; flip = false; cover = false; native = false;
  const bar = document.createElement('div'); bar.className = 'scc-bar';
  bar.innerHTML = '<button data-a="cover">↔ Remplir</button><button data-a="flip">🔄 Sens</button><button data-a="exit">✕ Quitter</button>';
  bar.addEventListener('click', e => {
    const a = e.target.closest('button'); if(!a) return; e.stopPropagation(); showBar();
    if(a.dataset.a === 'exit') A.exitFullscreen();
    else if(a.dataset.a === 'flip'){ flip = !flip; metrics(); }
    else { cover = !cover; box.classList.toggle('scc-cover', cover); a.textContent = cover ? '⤢ Tout voir' : '↔ Remplir'; metrics(); }
  });
  b.appendChild(bar); ui = { bar, flip: bar.querySelector('[data-a=flip]') };
  b.classList.add('scc-fs'); document.body.style.overflow = 'hidden'; metrics();
  b.addEventListener('click', showBar);
  window.addEventListener('resize', later); window.addEventListener('orientationchange', later);
  FS_EVENTS.forEach(ev => document.addEventListener(ev, onFsChange));
  document.addEventListener('keydown', onKey);
  const lock = () => { try{ const o = screen.orientation; if(o && o.lock) o.lock('landscape').then(later, () => {}); }catch(e){} };
  /* Appli installée (écran d'accueil) : pas de plein écran du navigateur, donc aucun message « Pour quitter le plein écran… ».
     La vidéo couvre déjà tout l'écran de l'appli. */
  const installed = touch() && (navigator.standalone === true || ['standalone', 'fullscreen', 'minimal-ui'].some(m => { try{ return matchMedia('(display-mode:' + m + ')').matches; }catch(e){ return false; } }));
  const req = installed ? null : (b.requestFullscreen || b.webkitRequestFullscreen || b.mozRequestFullScreen || b.msRequestFullscreen);
  if(installed) lock();
  if(req){
    try{
      native = true; const r = req.call(b);
      if(r && r.then) r.then(() => { lock(); later(); setTimeout(portraitFallback, 800); }, () => { native = false; later(); });
      else { lock(); later(); setTimeout(portraitFallback, 800); }
    }catch(e){ native = false; }
  }
  showBar();
};

A.exitFullscreen = function(){
  if(!box) return;
  const b = box; box = null; clearTimeout(hideT);
  b.classList.remove('scc-fs', 'scc-rot', 'scc-flip', 'scc-cover');
  ['--vw', '--vh', '--bw', '--bh', '--fw', '--fh'].forEach(k => b.style.removeProperty(k));
  b.removeEventListener('click', showBar);
  if(ui){ ui.bar.remove(); ui = null; }
  document.body.style.overflow = '';
  window.removeEventListener('resize', later); window.removeEventListener('orientationchange', later);
  FS_EVENTS.forEach(ev => document.removeEventListener(ev, onFsChange));
  document.removeEventListener('keydown', onKey);
  try{ if(screen.orientation && screen.orientation.unlock) screen.orientation.unlock(); }catch(e){}
  try{
    let r;
    if(fsElement()){
      const ex = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
      if(ex) r = ex.call(document);
    }
    if(r && r.catch) r.catch(() => {});
  }catch(e){}
  native = false;
};
})();

/* MODE « CHAÎNE + JEUX »  ⇄  SITE COMPLET.
   - Lien / QR code …/?app=chaine : seuls la chaîne en direct et la salle de jeux sont accessibles (le reste est caché ET bloqué).
   - Barre sous l'en-tête pour basculer en un clic, sans recharger la page (donc sans se reconnecter à l'admin) :
       • sur le site complet : « 📺 Aller à la chaîne et aux jeux » (visible par tout le monde, c'est la vue publique) ;
       • dans la chaîne + jeux : « 🏠 Aller au site complet » visible UNIQUEMENT pour toi (compte admin connecté sur cet appareil). Les spectateurs qui arrivent par le QR code ne le voient jamais.
   - L'adresse du navigateur suit le mode (avec ou sans ?app=chaine), donc actualiser la page garde le même mode.
   Nécessite chaine-mode.css (dans <head>) et app.js (fonction showScreen). */
(function(){
'use strict';
const OK = ['live', 'games'];
const $ = id => document.getElementById(id);
const html = document.documentElement;
const PARAM = /(^|[?&])app=chaine(&|$)/;
const TITLE0 = document.title;
let tag0 = null, lastSite = 'catalog';
window.SCC_CHAINE_MODE = PARAM.test(location.search.replace(/^\?/, '?'));

/* 1. En mode chaîne, tout écran demandé qui n'est pas la chaîne ou les jeux ramène à la chaîne */
const orig = window.showScreen;
if(typeof orig === 'function'){
  window.showScreen = function(name){ return orig.call(this, (!window.SCC_CHAINE_MODE || OK.indexOf(name) >= 0) ? name : 'live'); };
}
const show = n => { try{ window.showScreen(n); }catch(e){} };
const activeName = () => { const a = document.querySelector('.screen.active'); return a ? a.id.replace(/^screen-/, '') : ''; };

/* 2. Adresse du navigateur : suit le mode */
function setUrl(on){
  try{
    const p = new URLSearchParams(location.search); p.delete('app'); if(on) p.set('app', 'chaine');
    const q = p.toString();
    history.replaceState(null, '', location.pathname + (q ? '?' + q : '') + (on ? '' : location.hash));
  }catch(e){}
}

/* 3. Bascule */
function setMode(on){
  if(on === window.SCC_CHAINE_MODE) return;
  const from = activeName();
  if(on && from && OK.indexOf(from) < 0) lastSite = from;   /* on se souvient d'où on vient (catalogue, tableau de bord admin…) */
  window.SCC_CHAINE_MODE = on;
  html.classList.toggle('chaine-mode', on);
  document.title = on ? 'SHAMAN CHOOZ — Chaîne et Jeux' : TITLE0;
  tagline();
  setUrl(on);
  if(on) show('live');
  else {
    let back = lastSite || 'catalog';
    if((back === 'admin-dash') && typeof ADMIN_LOGGED_IN !== 'undefined' && !ADMIN_LOGGED_IN) back = 'admin-login';
    if(back === 'live' || back === 'games') back = 'catalog';
    show(back);
  }
  button();
  try{ window.scrollTo({ top:0 }); }catch(e){}
}
window.SCC_SET_CHAINE_MODE = setMode; window.SCC_IS_OWNER = () => isOwner();

function tagline(){
  const t = document.querySelector('.tagline'); if(!t) return;
  if(tag0 === null) tag0 = t.textContent;
  t.textContent = window.SCC_CHAINE_MODE ? 'Chaîne en direct • Jeux' : tag0;
}

/* 4. Le propriétaire : compte admin connecté sur cet appareil (session Firebase) */
function isOwner(){
  try{
    if(typeof ADMIN_LOGGED_IN !== 'undefined' && ADMIN_LOGGED_IN) return true;
    const u = window.firebase && firebase.auth && firebase.auth().currentUser;
    if(!u) return false;
    let admin = ''; try{ admin = String(ADMIN_EMAIL || '').trim().toLowerCase(); }catch(e){ admin = ''; }   /* e-mail de l'admin (firebase-config.js) */
    return !admin || String(u.email || '').trim().toLowerCase() === admin;
  }catch(e){ return false; }
}

/* 5. Barre de bascule juste sous l'en-tête (ne serre pas le titre, bien visible sur téléphone) */
function button(){
  const head = document.querySelector('header.channel-band'); if(!head) return;
  let bar = $('modeSwitchBar'), b = $('modeSwitchBtn');
  if(!bar){
    bar = document.createElement('div'); bar.id = 'modeSwitchBar'; bar.style.cssText = 'padding:6px 14px 2px;text-align:center';
    b = document.createElement('button'); b.id = 'modeSwitchBtn'; b.type = 'button'; b.className = 'btn btn-ghost';
    b.style.cssText = 'width:100%;max-width:420px;margin:0 auto;padding:9px 14px;font-size:14px;font-weight:800';
    b.onclick = () => setMode(!window.SCC_CHAINE_MODE);
    bar.appendChild(b); head.insertAdjacentElement('afterend', bar);
  }
  const chaine = window.SCC_CHAINE_MODE;
  b.textContent = chaine ? '🏠 Aller au site complet' : '📺 Aller à la chaîne et aux jeux';
  b.title = chaine ? 'Passer au site complet' : 'Passer à la chaîne et aux jeux';
  b.setAttribute('aria-label', b.title);
  bar.style.display = (chaine && !isOwner()) ? 'none' : '';   /* les spectateurs du QR code ne voient jamais « site complet » */
}

/* 6. Filet de sécurité en mode chaîne : jamais un autre écran que la chaîne ou les jeux */
function guard(){
  if(window.SCC_CHAINE_MODE){
    const a = document.querySelector('.screen.active');
    if(!a || (a.id !== 'screen-live' && a.id !== 'screen-games')) show('live');
    tagline();
  }
  button();
}
if(window.SCC_CHAINE_MODE){
  html.classList.add('chaine-mode'); document.title = 'SHAMAN CHOOZ — Chaîne et Jeux';
  try{ const th = document.querySelector('meta[name="theme-color"]'); if(th) th.content = '#FAF6F0'; }catch(e){}
}
guard();
document.addEventListener('DOMContentLoaded', guard);
window.addEventListener('load', guard);
setInterval(guard, 700);

/* 7. Pas de lien profond vers une vidéo du catalogue (#v=…) en mode chaîne */
window.addEventListener('hashchange', () => { if(window.SCC_CHAINE_MODE){ try{ history.replaceState(null, '', location.pathname + location.search); }catch(e){} } });
})();

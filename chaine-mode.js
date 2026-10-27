/* MODE « CHAÎNE + JEUX » — quand on arrive par le lien ou le QR code de la chaîne (…/?app=chaine),
   seuls la chaîne en direct et la salle de jeux sont accessibles. Le catalogue, « Créer », « Mes vidéos » et l'espace admin sont cachés
   ET bloqués (même si quelqu'un essaie de les ouvrir autrement). Le site complet reste accessible par son adresse normale (sans « ?app=chaine »).
   Nécessite chaine-mode.css, chargé dans <head>, et app.js (fonction showScreen). */
(function(){
'use strict';
if(!/[?&]app=chaine(&|#|$)/.test(location.search)) return;
const OK = ['live', 'games'];
const $ = id => document.getElementById(id);
document.documentElement.classList.add('chaine-mode');
document.title = 'SHAMAN CHOOZ — Chaîne et Jeux';
try{ const th = document.querySelector('meta[name="theme-color"]'); if(th) th.content = '#FAF6F0'; }catch(e){}

/* 1. Tout écran demandé qui n'est pas la chaîne ou les jeux ramène à la chaîne */
const orig = window.showScreen;
if(typeof orig === 'function'){
  window.showScreen = function(name){ return orig.call(this, OK.indexOf(name) >= 0 ? name : 'live'); };
}

/* 2. Filet de sécurité : si un autre écran devient actif (démarrage de l'app, ancienne version, bouton oublié), on revient à la chaîne */
const guard = () => {
  const a = document.querySelector('.screen.active');
  if(!a || (a.id !== 'screen-live' && a.id !== 'screen-games')){ try{ window.showScreen('live'); }catch(e){} }
  const t = document.querySelector('.tagline'); if(t && t.dataset.cm !== '1'){ t.dataset.cm = '1'; t.textContent = 'Chaîne en direct • Jeux'; }
};
guard();
document.addEventListener('DOMContentLoaded', guard);
window.addEventListener('load', guard);
setInterval(guard, 700);

/* 3. Pas de lien profond vers une vidéo du catalogue (#v=…) */
window.addEventListener('hashchange', () => { try{ history.replaceState(null, '', location.pathname + location.search); }catch(e){} });
})();

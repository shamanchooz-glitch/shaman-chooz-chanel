/* ==========================================================
   COMPATIBILITÉ DES ANCIENS TÉLÉPHONES — SHAMAN CHOOZ CHANEL
   À charger EN PREMIER dans index.html (avant tous les autres scripts).
   Ce fichier est volontairement écrit en JavaScript « ancien » (ES5) pour être lu par n'importe quel téléphone.
   Il fait trois choses :
   1. Ajoute les petites fonctions qui manquent aux vieux navigateurs (le reste du site peut alors s'en servir).
   2. Garde l'image de la chaîne en 16/9 sur les téléphones qui ne connaissent pas « aspect-ratio » (vieux iPhone, vieux Android).
   3. Si le site ne démarre pas du tout (navigateur trop ancien ou connexion coupée), affiche un message clair avec le lien
      à copier et un bouton « Réessayer », au lieu d'une page blanche.
   ========================================================== */
(function(){
'use strict';

/* ---- 1. Fonctions manquantes ---- */
function def(obj, name, fn){
  try{
    if(obj[name]) return;
    Object.defineProperty(obj, name, { value: fn, writable: true, configurable: true, enumerable: false });
  }catch(e){}
}
try{
  def(Object, 'assign', function(t){
    if(t == null) throw new TypeError('Cannot convert undefined or null to object');
    var to = Object(t);
    for(var i = 1; i < arguments.length; i++){
      var src = arguments[i];
      if(src != null) for(var k in src) if(Object.prototype.hasOwnProperty.call(src, k)) to[k] = src[k];
    }
    return to;
  });
  def(Object, 'entries', function(o){ var k = Object.keys(o), i = k.length, r = new Array(i); while(i--) r[i] = [k[i], o[k[i]]]; return r; });
  def(Object, 'values', function(o){ var k = Object.keys(o), i = k.length, r = new Array(i); while(i--) r[i] = o[k[i]]; return r; });
  def(String.prototype, 'padStart', function(len, pad){
    var s = String(this); len = len >> 0; pad = pad === undefined ? ' ' : String(pad);
    if(s.length >= len || !pad) return s;
    var add = ''; while(add.length < len - s.length) add += pad;
    return add.slice(0, len - s.length) + s;
  });
  def(String.prototype, 'padEnd', function(len, pad){
    var s = String(this); len = len >> 0; pad = pad === undefined ? ' ' : String(pad);
    if(s.length >= len || !pad) return s;
    var add = ''; while(add.length < len - s.length) add += pad;
    return s + add.slice(0, len - s.length);
  });
  def(String.prototype, 'includes', function(x, from){ return String(this).indexOf(x, from || 0) !== -1; });
  def(String.prototype, 'startsWith', function(x, pos){ pos = pos || 0; return String(this).substr(pos, String(x).length) === String(x); });
  def(String.prototype, 'endsWith', function(x, end){ var s = String(this); if(end === undefined || end > s.length) end = s.length; return s.substring(end - String(x).length, end) === String(x); });
  def(Array.prototype, 'includes', function(x, from){
    var a = this, n = a.length >>> 0, i = from | 0; if(i < 0) i = Math.max(0, n + i);
    for(; i < n; i++){ if(a[i] === x || (x !== x && a[i] !== a[i])) return true; }
    return false;
  });
  if(window.Element){
    var P = Element.prototype;
    def(P, 'matches', P.msMatchesSelector || P.webkitMatchesSelector);
    def(P, 'closest', function(sel){
      var e = this;
      while(e && e.nodeType === 1){ if(e.matches(sel)) return e; e = e.parentElement || e.parentNode; }
      return null;
    });
  }
}catch(e){}

/* ---- 2. « aspect-ratio » : on garde le 16/9 à la main quand le téléphone ne le connaît pas ---- */
var noAR = true;
try{ noAR = !(window.CSS && CSS.supports && (CSS.supports('aspect-ratio', '16 / 9') || CSS.supports('aspect-ratio: 16 / 9'))); }catch(e){}
window.SCC_COMPAT = { aspectRatioManuel: noAR };
if(noAR){
  setInterval(function(){
    try{
      var list = document.querySelectorAll('#liveYoutubeFrame, #adminPreviewBox iframe');
      for(var i = 0; i < list.length; i++){
        var w = list[i].clientWidth;
        if(w > 0) list[i].style.height = Math.round(w * 9 / 16) + 'px';
      }
    }catch(e){}
  }, 500);
}

/* ---- 3. Si le site ne démarre pas : message clair au lieu d'une page blanche ---- */
function lien(){ return location.protocol + '//' + location.host + location.pathname; }
function garde(){
  if(window.SCC_APP_BUILD || document.getElementById('sccCompatGuard')) return;   /* le site a bien démarré : rien à faire */
  var o = document.createElement('div'); o.id = 'sccCompatGuard';
  o.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:2147483000;background:#FAF6F0;color:#222;overflow:auto;-webkit-overflow-scrolling:touch;padding:24px 18px;font:16px/1.5 Arial,Helvetica,sans-serif;text-align:center;box-sizing:border-box';
  var h = document.createElement('div'); h.style.cssText = 'font-size:44px;margin-top:20px'; h.appendChild(document.createTextNode('\uD83D\uDCFA'));
  var t = document.createElement('p'); t.style.cssText = 'font-size:20px;font-weight:bold;margin:10px 0'; t.appendChild(document.createTextNode('La cha\u00EEne n\u2019a pas pu s\u2019ouvrir'));
  var p = document.createElement('p'); p.style.cssText = 'margin:0 0 14px';
  p.appendChild(document.createTextNode('Ton navigateur est peut-\u00EAtre trop ancien, ou la connexion a coup\u00E9. Essaie dans l\u2019ordre :'));
  var ol = document.createElement('ol'); ol.style.cssText = 'text-align:left;max-width:420px;margin:0 auto 16px;padding-left:22px';
  var etapes = [
    'Touche \u00AB R\u00E9essayer \u00BB ci-dessous.',
    'Mets \u00E0 jour ton navigateur (Chrome ou Safari) depuis le Play Store ou les R\u00E9glages du t\u00E9l\u00E9phone.',
    'Ouvre ce lien dans un autre navigateur (Chrome, Firefox, Samsung Internet, Safari) : copie-le avec le bouton ci-dessous.'
  ];
  for(var i = 0; i < etapes.length; i++){ var li = document.createElement('li'); li.style.margin = '6px 0'; li.appendChild(document.createTextNode(etapes[i])); ol.appendChild(li); }
  var inp = document.createElement('input'); inp.type = 'text'; inp.readOnly = true; inp.value = lien() + (/[?&]app=chaine/.test(location.search) ? '?app=chaine' : '');
  inp.style.cssText = 'display:block;width:100%;max-width:420px;margin:0 auto 12px;padding:12px;border:2px solid #d98a4c;border-radius:12px;font-size:15px;text-align:center;box-sizing:border-box;background:#fff;color:#222';
  inp.onclick = function(){ try{ inp.select(); }catch(e){} };
  function bouton(txt, bg, fn){
    var b = document.createElement('button'); b.type = 'button'; b.appendChild(document.createTextNode(txt)); b.onclick = fn;
    b.style.cssText = 'margin:6px;padding:13px 20px;border:0;border-radius:12px;background:' + bg + ';color:#fff;font:bold 16px Arial,Helvetica,sans-serif;cursor:pointer';
    return b;
  }
  var b1 = bouton('\uD83D\uDD04 R\u00E9essayer', '#d98a4c', function(){ location.reload(); });
  var b2 = bouton('\uD83D\uDD17 Copier le lien', '#6b5a4a', function(){
    try{ inp.focus(); inp.select(); inp.setSelectionRange(0, 9999); }catch(e){}
    var ok = false; try{ ok = document.execCommand('copy'); }catch(e){}
    b2.firstChild.nodeValue = ok ? '\u2705 Lien copi\u00E9 !' : '\uD83D\uDD17 Appuie longtemps sur le lien pour le copier';
  });
  o.appendChild(h); o.appendChild(t); o.appendChild(p); o.appendChild(ol); o.appendChild(inp); o.appendChild(b1); o.appendChild(b2);
  (document.body || document.documentElement).appendChild(o);
}
/* On attend la fin du chargement + le contrôle de réparation du site (≈ 2,5 s) avant de décider que le site n'a pas démarré */
window.addEventListener('load', function(){ setTimeout(garde, 4000); });
})();

/* ASSISTANT « DIRECT GRATUIT, SANS CARTE BANCAIRE, SPECTATEURS ILLIMITÉS » (admin > Chaîne > Réglages > Source de la diffusion).
   Aucun service ne laisse envoyer une caméra à un nombre illimité de spectateurs sans que quelqu'un paie la bande passante.
   Les plateformes gratuites (Twitch, YouTube, Kick, Facebook) la paient pour toi, sans carte bancaire : tu filmes avec LEUR application
   (caméra avant/arrière du téléphone, ou webcam de l'ordinateur) et la chaîne affiche leur direct à tes spectateurs, avec ton pass.
   Cet assistant règle la source de la chaîne en un geste (même réglage que « Mes liens de direct ») et donne les boutons « Je suis en direct / Fin du direct ». */
(function(){
'use strict';
const $ = id => document.getElementById(id);
const PF = {
  twitch:   { name:'Twitch', rec:true,  home:'https://www.twitch.tv/', ph:'Nom de ta chaîne Twitch (ex. shamanchooz)',
    steps:["Crée un compte gratuit sur twitch.tv (aucune carte bancaire). Twitch peut demander d'activer la double authentification avec ton numéro de téléphone.","Installe l'application Twitch sur ton téléphone, ouvre-la et choisis « Go Live » / « Diffuser » : tu peux utiliser la caméra avant ou arrière.","Écris ci-dessous le nom de ta chaîne Twitch, puis appuie sur « Utiliser pour la chaîne »."] },
  youtube:  { name:'YouTube', home:'https://studio.youtube.com/', ph:'Lien de ton direct, ou ID de chaîne (UC…)',
    steps:["Utilise ton compte Google (gratuit, aucune carte). Active les directs sur ta chaîne YouTube : une vérification par SMS est demandée, et l'activation peut prendre jusqu'à 24 h.","Sur ordinateur : studio.youtube.com > Créer > Passer en direct > Webcam. Sur téléphone, YouTube demande souvent 50 abonnés pour diffuser avec l'application.","Colle ci-dessous le lien de ton direct ou l'ID de ta chaîne (UC…), puis appuie sur « Utiliser pour la chaîne »."] },
  kick:     { name:'Kick', home:'https://kick.com/', ph:'Nom de ta chaîne Kick',
    steps:["Crée un compte gratuit sur kick.com (aucune carte bancaire).","Installe l'application Kick, ouvre-la et choisis « Go Live » : caméra avant ou arrière.","Écris ci-dessous le nom de ta chaîne Kick, puis appuie sur « Utiliser pour la chaîne »."] },
  facebook: { name:'Facebook', home:'https://www.facebook.com/', ph:'Lien public de ton direct Facebook',
    steps:["Avec ton compte Facebook (gratuit), ouvre l'application et choisis « Vidéo en direct », avec la caméra avant ou arrière, en public.","Une fois le direct lancé, copie le lien public de la vidéo.","Colle-le ci-dessous, puis appuie sur « Utiliser pour la chaîne »."] }
};
const FREE = Object.keys(PF);
let cur = 'twitch';

function build(){
  const cam = $('cameraBox'); if(!cam || $('freeLiveBox')) return;
  const b = document.createElement('div'); b.id = 'freeLiveBox'; b.style.cssText = 'display:none;margin-top:14px;padding:14px;border-radius:14px;background:rgba(30,132,73,.10);border:1px solid rgba(30,132,73,.45)';
  b.innerHTML = '<p class="field-label" style="margin-top:0">👥 Beaucoup de spectateurs — gratuit, sans carte bancaire</p>'
   + '<p class="hint">Aucun service ne permet d\'envoyer ta caméra à un nombre <b>illimité</b> de spectateurs sans que quelqu\'un paie la bande passante. Les plateformes gratuites ci-dessous la paient pour toi, <b>sans carte bancaire</b> : tu filmes avec leur application (caméra avant ou arrière, ou webcam de l\'ordinateur) et la chaîne affiche leur direct, avec ton pass.</p>'
   + '<select class="input" id="flPf">' + FREE.map(k => '<option value="' + k + '">' + PF[k].name + (PF[k].rec ? ' (recommandé sur téléphone)' : '') + '</option>').join('') + '</select>'
   + '<ol class="hint" id="flSteps" style="margin:8px 0 8px 18px;padding:0"></ol>'
   + '<input class="input" id="flLink" placeholder="">'
   + '<div style="display:flex;gap:8px;flex-wrap:wrap">'
   + '<a class="btn btn-ghost" id="flOpen" target="_blank" rel="noopener" style="margin:0;width:auto;text-decoration:none">🔗 Ouvrir</a>'
   + '<button type="button" class="btn btn-primary" id="flUse" style="margin:0;width:auto">✅ Utiliser pour la chaîne</button></div>'
   + '<p class="hint" id="flMsg" style="margin:10px 0 6px;font-weight:700"></p>'
   + '<div id="flLiveRow" style="display:none;gap:8px;flex-wrap:wrap">'
   + '<button type="button" class="btn btn-primary" id="flOn" style="margin:0;width:auto">🔴 Je suis en direct</button>'
   + '<button type="button" class="btn btn-ghost" id="flOff" style="margin:0;width:auto">⏹ Fin du direct</button></div>'
   + '<p class="hint" style="margin-top:10px">Bon à savoir : un direct public sur ces plateformes peut aussi être regardé directement chez elles, sans passer par ton pass. Sur YouTube, choisis « Non répertorié » pour que seul le lien intégré à ta chaîne le montre.</p>';
  cam.insertAdjacentElement('afterend', b);
  $('flPf').onchange = e => { cur = e.target.value; render(); };
  $('flUse').onclick = use; $('flOn').onclick = () => setLive(true); $('flOff').onclick = () => setLive(false);
  render();
}
function render(){
  const p = PF[cur];
  $('flSteps').innerHTML = p.steps.map(s => '<li>' + s + '</li>').join('');
  $('flLink').placeholder = p.ph; $('flOpen').href = p.home; $('flOpen').textContent = '🔗 Ouvrir ' + p.name;
  const saved = (typeof getSourceValue === 'function') ? getSourceValue(cur) : '';
  if(saved && !$('flLink').value) $('flLink').value = saved;
  refresh();
}
function refresh(){
  if(typeof LIVE_SETTINGS === 'undefined') return;
  const using = LIVE_SETTINGS.provider === cur && !!(LIVE_SETTINGS.sources || {})[cur];
  $('flLiveRow').style.display = using ? 'flex' : 'none';
  const on = !!LIVE_SETTINGS.liveOn;
  $('flMsg').textContent = using ? (on ? '🔴 La chaîne affiche ton direct ' + PF[cur].name + '.' : '✅ La chaîne est réglée sur ' + PF[cur].name + '. Quand tu démarres ton direct, appuie sur « Je suis en direct ».') : '';
  $('flOn').style.display = on ? 'none' : ''; $('flOff').style.display = on ? '' : 'none';
}
async function persist(){ await DB.set('liveSettings', LIVE_SETTINGS); }
async function use(){
  const raw = $('flLink').value.trim();
  const val = (typeof parseSourceValue === 'function') ? parseSourceValue(cur, raw) : '';
  if(!val){ $('flMsg').textContent = '⚠️ Lien ou nom non reconnu pour ' + PF[cur].name + '. ' + PF[cur].ph + '.'; $('flMsg').style.color = '#c0392b'; return; }
  $('flMsg').style.color = '';
  LIVE_SETTINGS.sources = Object.assign({}, LIVE_SETTINGS.sources || {}, { [cur]: val });
  LIVE_SETTINGS.provider = cur;
  try{ await persist(); }catch(e){ $('flMsg').textContent = "⚠️ Impossible d'enregistrer. Vérifie que tu es connecté à l'admin."; $('flMsg').style.color = '#c0392b'; return; }
  const sel = $('liveProviderSelect'), inp = $('src-' + cur);
  if(inp) inp.value = raw;
  if(sel){ sel.value = cur; try{ updateLiveProviderUI(); }catch(e){} }
  try{ toast('Chaîne réglée sur ' + PF[cur].name + '.', 'ok'); }catch(e){}
  refresh();
}
async function setLive(on){
  LIVE_SETTINGS.liveOn = on;
  const c = $('liveOnCheckbox'); if(c) c.checked = on;
  try{ await persist(); try{ toast(on ? '🔴 Direct affiché aux abonnés.' : '⏹ Direct terminé.', 'ok'); }catch(e){} }
  catch(e){ LIVE_SETTINGS.liveOn = !on; if(c) c.checked = !on; }
  refresh();
}
setInterval(() => {
  const sel = $('liveProviderSelect'); if(!sel) return;
  build(); const b = $('freeLiveBox'); if(!b) return;
  const show = sel.value === 'camera' || FREE.indexOf(sel.value) >= 0;
  b.style.display = show ? 'block' : 'none';
  if(show && FREE.indexOf(sel.value) >= 0 && cur !== sel.value && document.activeElement !== $('flPf')){ cur = sel.value; $('flPf').value = cur; $('flLink').value = ''; render(); }
  if(show) refresh();
}, 1200);
})();

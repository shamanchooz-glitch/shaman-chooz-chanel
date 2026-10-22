/* ==========================================================
   MOTEUR DE DIAPORAMAS VIDÉO — SHAMAN CHOOZ CHANEL
   Chaque « vidéo » est un diaporama animé (fond en mouvement, grands emojis,
   titres, textes qui apparaissent ligne par ligne, transitions, barre de
   progression), dessiné en direct dans le téléphone du spectateur.
   Avantages : aucune vidéo lourde à envoyer sur GitHub, démarrage instantané,
   et tout le monde voit la même image en même temps (lecture synchronisée
   avec l'horloge de la boucle de la chaîne).
   Voix off (voix française du téléphone) + musique douce : le spectateur peut les
   couper avec le bouton 🔊 en haut à droite de l'image.
   Ce fichier ne contient PAS les diaporamas : ils sont dans slides-data-*.js.
   ========================================================== */
(function(){
'use strict';
const W = 960, H = 540;
const PAL = {
  bleu:['#0b2455','#1c6fc0','#8fd0ff'], vert:['#0c3b2a','#1f9d63','#9af0c0'], orange:['#4a1d05','#e0661a','#ffd08a'], violet:['#2a1060','#7a4be0','#d4c0ff'],
  rouge:['#4a0a14','#c8283c','#ffb3bd'], or:['#3b2a05','#c9951a','#ffe9a3'], rose:['#4a0f33','#d63a8f','#ffc2e4'], turquoise:['#073a40','#119aa6','#a3f0f5'],
  nuit:['#0a0f24','#26346b','#b8c6ff'], terre:['#2e1a0c','#9a5b2c','#f2d2a8']
};
const FONT_T = '800 {s}px "Baloo 2","Trebuchet MS","Segoe UI",sans-serif';
const FONT_B = '600 {s}px Inter,"Segoe UI",Roboto,Arial,sans-serif';
const EMO = '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
const f = (tpl, s)=> tpl.replace('{s}', s);
const clamp = (x,a,b)=> Math.max(a, Math.min(b, x));
const ease = x => { x = clamp(x,0,1); return 1 - Math.pow(1-x, 3); };

const SCCS = window.SCCS = { shows:[], byId:{}, PAL, sound:true };
try{ localStorage.removeItem('scc_slides_sound'); }catch(e){}   // le son est toujours activé à chaque visite (on peut le couper le temps d'une séance avec 🔊)

/* ---------- Coordonnées de l'agence (modifiables dans agence-config.js) ---------- */
function agence(){
  const A = window.AGENCE || {};
  const ok = v => v && !/REMPLACE/i.test(String(v));
  const phones = (Array.isArray(A.telephones) ? A.telephones : []).filter(ok).map(String);
  if(!phones.length && ok(A.contact)) phones.push(String(A.contact));
  return {
    nom: ok(A.nom) ? String(A.nom) : '', court: ok(A.court) ? String(A.court) : '', pays: ok(A.pays) ? String(A.pays) : '',
    telephones: phones, email: ok(A.email) ? String(A.email) : '', adresse: ok(A.adresse) ? String(A.adresse) : '',
    siege: ok(A.siege) ? String(A.siege) : '', ville: ok(A.ville) ? String(A.ville) : '',
    slogan: ok(A.slogan) ? String(A.slogan) : 'Recrutement et placement dans tous les secteurs d\'activité'
  };
}
const hasContact = ag => !!(ag.telephones.length || ag.email || ag.adresse || ag.siege);

/* ---------- Déclaration d'un diaporama ---------- */
// SCCS.add(id, titre, categorie, palette, [[emoji, titre, texte], …])
SCCS.add = function(id, titre, cat, pal, slides){
  if(SCCS.byId[id]){ console.warn('Diaporama en double ignoré :', id); return; }
  const sl = slides.map(s=>({ e:s[0], t:s[1], x:s[2] || '' }));
  const sh = { id, titre, cat, pal: PAL[pal] || PAL.bleu, slides: sl, agency: cat === 'Agence' };
  const tl = []; let t = 0; const push = (type, dur, data)=>{ tl.push({ type, start:t, dur, data }); t += dur; };
  push('intro', 4.5, {});
  sl.forEach((s,i)=>{ const words = (s.t + ' ' + s.x).trim().split(/\s+/).length; push('slide', clamp(2.4 + words/2.4, 5.5, 13), { s, i }); });
  push('outro', 5.5, {}); if(sh.agency) push('contact', 15, {});
  sh.tl = tl; sh.dur = t;
  SCCS.shows.push(sh); SCCS.byId[id] = sh;
};
SCCS.duration = id => SCCS.byId[id] ? SCCS.byId[id].dur : 0;

/* Ordre de la boucle : 1 diaporama « Agence » pour 2 diaporamas culture/divertissement (ordre fixe → identique pour tous). */
SCCS.playlist = function(){
  const ag = SCCS.shows.filter(s=>s.agency), ot = SCCS.shows.filter(s=>!s.agency), out = [];
  let i = 0, j = 0;
  while(i < ot.length || j < ag.length){
    for(let k=0;k<2 && i<ot.length;k++) out.push(ot[i++]);
    if(j < ag.length) out.push(ag[j++]);
  }
  return out.map(s=>({ id:'s:' + s.id, title:'🎬 ' + s.titre, type:'slides', ref:s.id, sec:Math.ceil(s.dur), builtin:true }));
};

/* ---------- Dessin ---------- */
const wrapCache = {};
function wrap(g, text, font, maxW){
  const k = font + '|' + maxW + '|' + text; if(wrapCache[k]) return wrapCache[k];
  g.font = font; const words = String(text).split(/\s+/); const lines = []; let cur = '';
  words.forEach(w=>{ const test = cur ? cur + ' ' + w : w; if(g.measureText(test).width > maxW && cur){ lines.push(cur); cur = w; } else cur = test; });
  if(cur) lines.push(cur); return (wrapCache[k] = lines);
}
function fitBody(g, text, maxW, maxH){
  const sizes = [32,29,26,23,21,19];
  for(const s of sizes){ const lines = wrap(g, text, f(FONT_B, s), maxW); if(lines.length * (s*1.38) <= maxH) return { s, lines }; }
  const s = 19; return { s, lines: wrap(g, text, f(FONT_B, s), maxW) };
}
function emoji(g, e, x, y, size){ g.font = size + 'px ' + EMO; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(e, x, y); }
function pill(g, text, x, y, align, bg, fg){
  g.font = f(FONT_B, 15).replace('600','800'); const w = g.measureText(text).width + 26, h = 28; const x0 = align === 'right' ? x - w : x;
  g.fillStyle = bg; g.beginPath(); if(g.roundRect) g.roundRect(x0, y, w, h, 14); else g.rect(x0, y, w, h); g.fill();
  g.fillStyle = fg; g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillText(text, x0 + 13, y + h/2 + 1);
}
function background(g, sh, t){
  const c = sh.pal, grd = g.createLinearGradient(0,0,W,H); grd.addColorStop(0,c[0]); grd.addColorStop(1,c[1]); g.fillStyle = grd; g.fillRect(0,0,W,H);
  for(let i=0;i<7;i++){
    const x = (Math.sin(t*.13 + i*1.7)*.5 + .5) * W, y = (Math.cos(t*.11 + i*2.3)*.5 + .5) * H, r = 60 + ((i*37) % 90);
    g.globalAlpha = .06 + (i%3)*.03; g.fillStyle = c[2]; g.beginPath(); g.arc(x,y,r,0,Math.PI*2); g.fill();
  }
  g.globalAlpha = 1;
  const sx = ((t*70) % (W+500)) - 250, sw = g.createLinearGradient(sx,0,sx+220,H); sw.addColorStop(0,'rgba(255,255,255,0)'); sw.addColorStop(.5,'rgba(255,255,255,.055)'); sw.addColorStop(1,'rgba(255,255,255,0)');
  g.fillStyle = sw; g.fillRect(0,0,W,H);
  const vg = g.createRadialGradient(W/2,H/2,H*.38,W/2,H/2,W*.66); vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(0,0,0,.38)'); g.fillStyle = vg; g.fillRect(0,0,W,H);
}
function glow(g, x, y, r, col, a){ const gr = g.createRadialGradient(x,y,0,x,y,r); gr.addColorStop(0, col); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.globalAlpha = a; g.fillStyle = gr; g.beginPath(); g.arc(x,y,r,0,Math.PI*2); g.fill(); g.globalAlpha = 1; }

function chrome(g, sh, t, idx){
  const c = sh.pal, ag = agence();
  pill(g, 'SHAMAN CHOOZ CHANEL', 22, 18, 'left', 'rgba(0,0,0,.38)', '#fff');
  pill(g, sh.agency ? '💼 Agence' : sh.cat, W - 22, 18, 'right', c[2], c[0]);
  g.fillStyle = 'rgba(0,0,0,.45)'; g.fillRect(0, H-38, W, 38);
  g.fillStyle = '#fff'; g.font = f(FONT_B, 16); g.textAlign = 'left'; g.textBaseline = 'middle';
  const left = sh.agency ? ((ag.court || ag.nom || 'Notre agence') + '  •  Recrutement & placement') : sh.titre;
  g.fillText(left.length > 70 ? left.slice(0,68) + '…' : left, 20, H-19);
  const n = sh.slides.length, cur = idx > 0 && idx <= n ? idx : null;
  if(cur){ g.textAlign = 'right'; g.fillText(cur + ' / ' + n, W-20, H-19); }
  const p = clamp(t / sh.dur, 0, 1); g.fillStyle = c[2]; g.fillRect(0, H-4, W*p, 4);
}

function drawIntro(g, sh, lt, t){
  const e = ease(lt/.8), fade = lt > 4 ? clamp((4.5-lt)/.5,0,1) : 1;
  g.save(); g.globalAlpha = fade; g.translate(W/2, H/2); g.scale(.85 + .15*e, .85 + .15*e); g.translate(-W/2, -H/2);
  glow(g, W/2, 175, 170, sh.pal[2], .35);
  g.fillStyle = '#fff'; emoji(g, sh.slides[0] ? sh.slides[0].e : '🎬', W/2, 168 + Math.sin(t*1.8)*6, 120);
  g.fillStyle = '#fff'; g.textAlign = 'center'; g.textBaseline = 'alphabetic';
  const lines = wrap(g, sh.titre, f(FONT_T, 54), 820).slice(0,3); g.font = f(FONT_T, 54);
  lines.forEach((l,i)=> g.fillText(l, W/2, 290 + i*62));
  const y = 290 + lines.length*62 + 12; g.fillStyle = sh.pal[2]; g.fillRect(W/2 - 70*e, y, 140*e, 5);
  g.font = f(FONT_B, 22); g.fillStyle = 'rgba(255,255,255,.88)'; g.fillText(sh.agency ? 'Notre agence vous accompagne' : sh.cat + ' • à regarder et à partager', W/2, y + 46);
  g.restore();
}

function drawSlide(g, sh, item, lt, t){
  const { s, i } = item.data, dur = item.dur, enter = ease(lt/.6), fade = lt > dur - .45 ? clamp((dur-lt)/.45,0,1) : 1;
  const a = fade * clamp(lt/.3,0,1), left = i % 2 === 0, pal = sh.pal;
  g.save(); g.globalAlpha = a;
  if(left){
    const ox = (1-enter)*-90, cx = 215 + ox, cy = H/2 - 18 + Math.sin(t*1.5)*8;
    glow(g, cx, cy, 175, pal[2], .38);
    g.strokeStyle = 'rgba(255,255,255,.22)'; g.lineWidth = 3; g.beginPath(); g.arc(cx, cy, 128 + Math.sin(t*1.2)*5, 0, Math.PI*2); g.stroke();
    g.fillStyle = '#fff'; g.save(); g.translate(cx,cy); const sc = 1 + .04*Math.sin(t*.9); g.scale(sc,sc); emoji(g, s.e, 0, 0, 148); g.restore();
    const x0 = 410 + (1-enter)*70, wMax = 500;
    const tl = wrap(g, s.t, f(FONT_T, 44), wMax).slice(0,3), body = fitBody(g, s.x, wMax, 290 - tl.length*44);
    const total = tl.length*52 + 32 + body.lines.length*body.s*1.38, y0 = H/2 - total/2 - 8;
    g.fillStyle = '#fff'; g.textAlign = 'left'; g.textBaseline = 'alphabetic'; g.font = f(FONT_T, 44);
    tl.forEach((l,k)=> g.fillText(l, x0, y0 + 42 + k*52));
    const ly = y0 + tl.length*52 + 4; g.fillStyle = pal[2]; g.fillRect(x0, ly, 110*enter, 5);
    g.font = f(FONT_B, body.s);
    body.lines.forEach((l,k)=>{ const al = clamp((lt - .5 - k*.22)/.35,0,1); g.globalAlpha = a*al; g.fillStyle = 'rgba(255,255,255,.95)'; g.fillText(l, x0 + (1-al)*18, ly + 54 + k*body.s*1.38); });
  } else {
    const oy = (1-enter)*50, cy = 128 + Math.sin(t*1.5)*7 + oy;
    glow(g, W/2, cy, 150, pal[2], .38);
    g.fillStyle = '#fff'; g.save(); g.translate(W/2, cy); const sc = 1 + .04*Math.sin(t*.9); g.scale(sc,sc); emoji(g, s.e, 0, 0, 120); g.restore();
    const tl = wrap(g, s.t, f(FONT_T, 42), 820).slice(0,2); g.textAlign = 'center'; g.textBaseline = 'alphabetic'; g.font = f(FONT_T, 42);
    const ty = 232 + oy; g.fillStyle = '#fff'; tl.forEach((l,k)=> g.fillText(l, W/2, ty + k*50));
    const ly = ty + (tl.length-1)*50 + 16; g.fillStyle = pal[2]; g.fillRect(W/2 - 55*enter, ly, 110*enter, 5);
    const body = fitBody(g, s.x, 800, H - 44 - (ly + 30) - 14); g.font = f(FONT_B, body.s);
    body.lines.forEach((l,k)=>{ const al = clamp((lt - .5 - k*.22)/.35,0,1); g.globalAlpha = a*al; g.fillStyle = 'rgba(255,255,255,.95)'; g.fillText(l, W/2, ly + 22 + body.s + k*body.s*1.38 + (1-al)*14); });
  }
  g.restore();
}

function drawOutro(g, sh, lt, t){
  const fade = lt < .3 ? lt/.3 : 1, ag = agence();
  g.save(); g.globalAlpha = fade; g.fillStyle = '#fff'; g.textAlign = 'center'; g.textBaseline = 'alphabetic';
  glow(g, W/2, 140, 150, sh.pal[2], .32);
  emoji(g, sh.agency ? '🤝' : '🎬', W/2, 130 + Math.sin(t*1.8)*6, 96);
  g.textAlign = 'center'; g.textBaseline = 'alphabetic'; g.fillStyle = '#fff';
  if(sh.agency){
    g.font = f(FONT_T, 42); g.fillText('Besoin de talents ? Envie d\'un emploi ?', W/2, 240, 900);
    const lines = wrap(g, ag.nom || 'Contactez notre agence', f(FONT_T, 36), 880).slice(0,3);
    g.font = f(FONT_T, 36); g.fillStyle = sh.pal[2]; lines.forEach((l,k)=> g.fillText(l, W/2, 298 + k*44));
    const y = 298 + lines.length*44 + 14;
    g.font = f(FONT_B, 24); g.fillStyle = '#fff'; g.fillText(ag.slogan, W/2, y, 900);
    g.font = f(FONT_B, 22); g.fillStyle = 'rgba(255,255,255,.85)'; g.fillText(hasContact(ag) ? 'Nos coordonnées dans un instant…' : 'Contactez-nous dès aujourd\'hui !', W/2, y + 40);
  } else {
    g.font = f(FONT_T, 50); g.fillText('Merci d\'avoir regardé !', W/2, 262);
    g.font = f(FONT_B, 26); g.fillStyle = sh.pal[2]; wrap(g, sh.titre, f(FONT_B, 26), 840).slice(0,2).forEach((l,k)=> g.fillText(l, W/2, 318 + k*36));
    g.fillStyle = '#fff'; g.font = f(FONT_B, 24); g.fillText('Un nouveau programme arrive dans un instant…', W/2, 430);
  }
  g.restore();
}
/* Page « Contactez-nous » (diaporamas Agence) : nom, numéros, e-mail, adresse postale, siège */
function drawContact(g, sh, lt, t){
  const ag = agence(), c = sh.pal, fade = lt < .3 ? lt/.3 : (lt > 14.4 ? clamp((15-lt)/.6,0,1) : 1);
  g.save(); g.globalAlpha = fade; g.textAlign = 'center'; g.textBaseline = 'alphabetic';
  g.fillStyle = '#fff'; g.font = f(FONT_T, 40); g.fillText('📞 Contactez-nous', W/2, 98);
  g.fillStyle = c[2]; g.font = f(FONT_T, 26); wrap(g, ag.nom || 'Notre agence de recrutement et de placement', f(FONT_T, 26), 900).slice(0,2).forEach((l,k)=> g.fillText(l, W/2, 140 + k*32));
  let y = 214, n = 0; const reveal = ()=> clamp((lt - .5 - (n++)*.55)/.4, 0, 1);
  const row = (draw)=>{ const al = reveal(); g.globalAlpha = fade*al; draw(al); g.globalAlpha = fade; };
  if(!hasContact(ag)){
    g.fillStyle = '#fff'; g.font = f(FONT_B, 28); g.fillText('Contactez-nous dès aujourd\'hui !', W/2, 300);
  } else {
    if(ag.telephones.length){
      row(al=>{
        if(ag.pays){ g.fillStyle = 'rgba(255,255,255,.8)'; g.font = f(FONT_B, 20); g.fillText(ag.pays, W/2, y); y += 14; }
        g.fillStyle = '#fff'; g.font = f(FONT_T, 30);
        const tel = ag.telephones, per = tel.length > 3 ? Math.ceil(tel.length / 2) : tel.length, ls = [];
        for(let k=0; k<tel.length; k+=per) ls.push((k === 0 ? '📞 ' : '') + tel.slice(k, k+per).join('   •   '));
        ls.forEach((l,k)=> g.fillText(l, W/2, y + 30 + k*40, 900)); y += 30 + ls.length*40 + 2;
      });
    }
    if(ag.email) row(al=>{ g.fillStyle = '#fff'; g.font = f(FONT_T, 28); g.fillText('✉️ ' + ag.email, W/2, y + 24, 900); y += 40; });
    if(ag.adresse) row(al=>{ g.fillStyle = '#fff'; g.font = f(FONT_B, 24); g.fillText('📮 Adresse postale : ' + ag.adresse, W/2, y + 22, 900); y += 36; });
    if(ag.siege) row(al=>{ g.fillStyle = 'rgba(255,255,255,.95)'; g.font = f(FONT_B, 22); const ls = wrap(g, '📍 Siège social : ' + ag.siege, f(FONT_B, 22), 900).slice(0,3); ls.forEach((l,k)=> g.fillText(l, W/2, y + 22 + k*28)); y += 22 + ls.length*28; });
  }
  g.restore();
}

function itemAt(sh, t){ for(let k=0;k<sh.tl.length;k++){ const it = sh.tl[k]; if(t < it.start + it.dur) return k; } return sh.tl.length - 1; }
SCCS.drawFrame = function(g, id, t){
  const sh = SCCS.byId[id]; if(!sh) return;
  t = clamp(t, 0, sh.dur - .001);
  const k = itemAt(sh, t), it = sh.tl[k], lt = t - it.start;
  g.save(); g.clearRect(0,0,W,H); background(g, sh, t);
  if(it.type === 'intro') drawIntro(g, sh, lt, t); else if(it.type === 'outro') drawOutro(g, sh, lt, t); else if(it.type === 'contact') drawContact(g, sh, lt, t); else drawSlide(g, sh, it, lt, t);
  chrome(g, sh, t, it.type === 'slide' ? it.data.i + 1 : ((it.type === 'outro' || it.type === 'contact') ? sh.slides.length : 0));
  g.restore();
};

/* ---------- Journal du son (affiché dans l'admin : Chaîne > Son de la chaîne > Diagnostic) ---------- */
const SLOG = [];
function slog(m){ try{ SLOG.push(new Date().toTimeString().slice(0,8) + ' ' + m); if(SLOG.length > 60) SLOG.shift(); }catch(e){} }
SCCS.diagnostic = function(){
  let talking = 'non'; try{ if(speechSynthesis.speaking || speechSynthesis.pending) talking = 'oui'; }catch(e){}
  return ['version du son : 22/10/2026-B', 'moteur audio : ' + (AC ? AC.state : 'pas encore créé'), 'musique : ' + (MUSIC ? 'en route' : 'arrêtée'),
    'voix en cours : ' + talking, 'voix bloquée : ' + (SPEECH_BLOCKED ? 'oui' : 'non'), 'son demandé : ' + (SCCS.sound ? 'oui' : 'non'),
    'piste silencieuse : ' + (KEEP ? (KEEP.paused ? 'en pause' : 'active') : 'non créée'), '---',
    SLOG.length ? SLOG.join('\n') : '(aucun événement pour le moment : regarde la chaîne 2 ou 3 minutes puis reviens ici)'].join('\n');
};

/* ---------- Voix off (voix française du téléphone) ----------
   Sur Android, couper une phrase en cours puis en lancer une autre aussitôt fait parfois « avaler » la nouvelle
   phrase : c'est ce qui arrivait à la fin d'un diaporama (« un nouveau programme arrive… ») → plus de voix dans le suivant.
   Donc :
   • on ne coupe JAMAIS la voix si elle ne parle pas, et on laisse finir la phrase en cours à la fin d'un diaporama ;
   • quand il faut vraiment couper, on attend que le moteur de voix se calme (0,4 s) avant de relancer ;
   • on garde une référence de la phrase en cours (sinon certains navigateurs la coupent en plein milieu) ;
   • si la voix ne démarre pas, on réessaie toute seule (2 fois) ;
   • si le navigateur la bloque, on retient la phrase et on la relit au prochain toucher. */
let VOICE = null, UTT = null, SAY_SEQ = 0, SAY_T = 0, LAST_TEXT = '', SPEECH_BLOCKED = false, SPEECH_MISS = 0, SPEAKING = false;
function pickVoice(){
  try{
    const vs = window.speechSynthesis.getVoices().filter(v=>/^fr/i.test(v.lang)); if(!vs.length) return null;
    return vs.find(v=>/google|natural|premium|enhanced/i.test(v.name)) || vs[0];
  }catch(e){ return null; }
}
function speechBusy(){ try{ return !!(SPEAKING || speechSynthesis.speaking || speechSynthesis.pending); }catch(e){ return false; } }
function cancelNow(){ try{ speechSynthesis.cancel(); }catch(e){} SPEAKING = false; }
function cancelSpeech(){ SAY_SEQ++; clearTimeout(SAY_T); if('speechSynthesis' in window && speechBusy()){ slog('voix : coupée'); cancelNow(); } }
function speakNow(text, seq, tries){
  if(seq !== SAY_SEQ || !('speechSynthesis' in window)) return;
  try{
    const u = new SpeechSynthesisUtterance(text); u.lang = 'fr-FR'; u.rate = .98; u.volume = 1;
    VOICE = VOICE || pickVoice(); if(VOICE) u.voice = VOICE;
    u.onstart = ()=>{ u.started = true; SPEAKING = true; SPEECH_MISS = 0; if(seq === SAY_SEQ) SPEECH_BLOCKED = false; slog('voix : démarrée'); };
    u.onend = ()=>{ if(UTT === u) SPEAKING = false; slog('voix : terminée'); };
    u.onerror = e=>{
      if(UTT === u) SPEAKING = false;
      const er = e && e.error; if(er && er !== 'canceled' && er !== 'interrupted') slog('voix : erreur ' + er);
      if(er === 'not-allowed' && seq === SAY_SEQ){ SPEECH_BLOCKED = true; clearTimeout(SAY_T); }
    };
    UTT = u;
    if(speechSynthesis.paused) speechSynthesis.resume();
    speechSynthesis.speak(u); slog('voix : lancée (essai ' + (tries + 1) + ')');
    clearTimeout(SAY_T);
    SAY_T = setTimeout(()=>{
      if(seq !== SAY_SEQ || u.started) return;
      slog('voix : n\'a pas démarré');
      if(++SPEECH_MISS >= 2) SPEECH_BLOCKED = true;      // la voix n'a pas démarré 2 fois de suite → on le signale (« Touche l'écran »)
      if(tries < 2){ cancelNow(); SAY_T = setTimeout(()=> speakNow(text, seq, tries + 1), 400); }
    }, 2500);
  }catch(e){}
}
/* say(texte)       → lit la phrase (coupe la précédente si elle parle encore, puis attend 0,4 s).
   say(texte, true) → 1re phrase d'un nouveau diaporama : on laisse d'abord FINIR la phrase en cours (jusqu'à 3 s). */
function say(text, soft){
  if(!('speechSynthesis' in window)) return;
  LAST_TEXT = text; const seq = ++SAY_SEQ; clearTimeout(SAY_T);
  const t0 = performance.now(); let cut = false;
  slog('voix : demandée « ' + text.slice(0, 28) + (text.length > 28 ? '…' : '') + ' »' + (soft ? ' (après la phrase en cours)' : ''));
  const step = ()=>{
    if(seq !== SAY_SEQ) return;
    if(speechBusy()){
      const waited = performance.now() - t0;
      if(soft && waited < 3000){ SAY_T = setTimeout(step, 150); return; }
      if(!cut){ cut = true; cancelNow(); SAY_T = setTimeout(step, 400); return; }
      if(waited < 3500){ SAY_T = setTimeout(step, 150); return; }
    }
    speakNow(text, seq, 0);
  };
  SAY_T = setTimeout(step, 60);
}
const spokenMail = m => m.replace('@', ' arobase ').replace(/\./g, ' point ');
function narration(sh, k){
  const it = sh.tl[k], ag = agence();
  if(it.type === 'intro') return sh.titre + '.';
  if(it.type === 'slide') return it.data.s.t + '. ' + it.data.s.x;
  if(it.type === 'contact'){
    const parts = ['Contactez ' + (ag.court || ag.nom || 'notre agence') + '.'];
    if(ag.telephones.length) parts.push('Appelez le ' + ag.telephones[0] + '.');
    if(ag.email) parts.push('Écrivez-nous à ' + spokenMail(ag.email) + '.');
    if(ag.ville) parts.push('Nous sommes à ' + ag.ville + '.');
    return parts.join(' ');
  }
  return sh.agency ? ('Besoin de talents ? Envie de trouver un emploi ? ' + (ag.court || ag.nom ? 'Contactez ' + (ag.court || ag.nom) + '.' : 'Contactez notre agence.')) : 'Merci d\'avoir regardé. Un nouveau programme arrive dans un instant.';
}

/* ---------- Écran toujours allumé pendant les diaporamas ----------
   1) API « Wake Lock » (Chrome, Edge, Safari récent, Firefox récent) ;
   2) solution de secours pour les anciens téléphones : une minuscule vidéo invisible en boucle. */
const NS_MP4 = 'AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAM3bW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAAB9AAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAmF0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAAB9AAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAEAAAABAAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAfQAAAAAAABAAAAAAHZbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAAoAAAAUABVxAAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAABhG1pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAURzdGJsAAAAuHN0c2QAAAAAAAAAAQAAAKhhdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAEAAQABIAAAASAAAAAAAAAABFUxhdmM2MC4zMS4xMDIgbGlieDI2NAAAAAAAAAAAAAAAGP//AAAALmF2Y0MBQsAK/+EAFmdCwArcQmwEQAAAAwBAAAADAoPEieABAAVozg8sgAAAABBwYXNwAAAAAQAAAAEAAAAUYnRydAAAAAAAAA4sAAAOLAAAABhzdHRzAAAAAAAAAAEAAAAKAAAIAAAAABxzdHNjAAAAAAAAAAEAAAABAAAACgAAAAEAAAA8c3RzegAAAAAAAAAAAAAACgAAAn0AAAAeAAAAHgAAAB4AAAAeAAAAHgAAAB4AAAAeAAAAHgAAAB4AAAAUc3RjbwAAAAAAAAABAAADZwAAAGJ1ZHRhAAAAWm1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAALWlsc3QAAAAlqXRvbwAAAB1kYXRhAAAAAQAAAABMYXZmNjAuMTYuMTAwAAAACGZyZWUAAAOTbWRhdAAAAl4GBf//WtxF6b3m2Ui3lizYINkj7u94MjY0IC0gY29yZSAxNjQgcjMxMDggMzFlMTlmOSAtIEguMjY0L01QRUctNCBBVkMgY29kZWMgLSBDb3B5bGVmdCAyMDAzLTIwMjMgLSBodHRwOi8vd3d3LnZpZGVvbGFuLm9yZy94MjY0Lmh0bWwgLSBvcHRpb25zOiBjYWJhYz0wIHJlZj0xIGRlYmxvY2s9MTowOjAgYW5hbHlzZT0weDE6MHgxMTEgbWU9aGV4IHN1Ym1lPTcgcHN5PTEgcHN5X3JkPTEuMDA6MC4wMCBtaXhlZF9yZWY9MCBtZV9yYW5nZT0xNiBjaHJvbWFfbWU9MSB0cmVsbGlzPTEgOHg4ZGN0PTAgY3FtPTAgZGVhZHpvbmU9MjEsMTEgZmFzdF9wc2tpcD0xIGNocm9tYV9xcF9vZmZzZXQ9LTIgdGhyZWFkcz0xIGxvb2thaGVhZF90aHJlYWRzPTEgc2xpY2VkX3RocmVhZHM9MCBucj0wIGRlY2ltYXRlPTEgaW50ZXJsYWNlZD0wIGJsdXJheV9jb21wYXQ9MCBjb25zdHJhaW5lZF9pbnRyYT0wIGJmcmFtZXM9MCB3ZWlnaHRwPTAga2V5aW50PTEga2V5aW50X21pbj0xIHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByYz1jcmYgbWJ0cmVlPTAgY3JmPTIzLjAgcWNvbXA9MC42MCBxcG1pbj0wIHFwbWF4PTY5IHFwc3RlcD00IGlwX3JhdGlvPTEuNDAgYXE9MToxLjAwAIAAAAAXZYiEBLyYoAA4oycnJ1111111111114AAAAAaZYiCAX///8PRQABV58nJyddddddddddddeAAAAAaZYiEBf///w9FAAFXnycnJ1111111111114AAAAAaZYiCAX///8PRQABV58nJyddddddddddddeAAAAAaZYiEBf///w9FAAFXnycnJ1111111111114AAAAAaZYiCAX///8PRQABV58nJyddddddddddddeAAAAAaZYiEBf///w9FAAFXnycnJ1111111111114AAAAAaZYiCAX///8PRQABV58nJyddddddddddddeAAAAAaZYiEBf///w9FAAFXnycnJ1111111111114AAAAAaZYiCAX///8PRQABV58nJyddddddddddddeA=', NS_WEBM = 'GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAALCEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHYTbuMU6uEElTDZ1OsggEeTbuMU6uEHFO7a1OsggKs7AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmsirXsYMPQkBNgI1MYXZmNjAuMTYuMTAwV0GNTGF2ZjYwLjE2LjEwMESJiECfQAAAAAAAFlSua8GuAQAAAAAAADjXgQFzxYibogi0l6O0S5yBACK1nIN1bmSIgQCGhVZfVlA4g4EBI+ODhAvrwgDgibCBQLqBQJqBAhJUw2f8c3OgY8CAZ8iaRaOHRU5DT0RFUkSHjUxhdmY2MC4xNi4xMDBzc9ZjwItjxYibogi0l6O0S2fIoUWjh0VOQ09ERVJEh5RMYXZjNjAuMzEuMTAyIGxpYnZweGfIoUWjiERVUkFUSU9ORIeTMDA6MDA6MDIuMDAwMDAwMDAwAB9DtnVBB+eBAKOqgQAAgPACAJ0BKkAAQAAARwiFhYiFhIgCAgAGcDxCYAqyIPcwAP7/q1CAo5aBAMgA0QEAARAQABgAGFgv9AAIjoAAo5aBAZAA0QEAARAQABgAGFgv9AAIjoAAo5aBAlgA0QEAARAQABgAGFgv9AAIjoAAo5aBAyAA0QEAARAQABgAGFgv9AAIjoAAo5aBA+gA0QEAARAQABgAGFgv9AAIjoAAo5aBBLAA0QEAARAQABgAGFgv9AAIjoAAo5aBBXgA0QEAARAQFGAAYWC/0AAiOgAAo5aBBkAA0QEAARAQABgAGFgv9AAIjoAAo5aBBwgA0QEAARAQABgAGFgv9AAIjoAAHFO7a5G7j7OBALeK94EB8YIBn/CBAw==';
let WL = null, WANT_AWAKE = false, NSV = null, REL_T = 0;
function wakeFallbackStart(){
  try{
    if(!NSV){
      NSV = document.createElement('video'); NSV.setAttribute('playsinline',''); NSV.setAttribute('muted',''); NSV.setAttribute('aria-hidden','true'); NSV.muted = true; NSV.loop = true;
      NSV.style.cssText = 'position:fixed;left:0;bottom:0;width:2px;height:2px;opacity:.02;pointer-events:none;z-index:-1;';
      const a = document.createElement('source'); a.src = 'data:video/mp4;base64,' + NS_MP4; a.type = 'video/mp4';
      const b = document.createElement('source'); b.src = 'data:video/webm;base64,' + NS_WEBM; b.type = 'video/webm';
      NSV.appendChild(a); NSV.appendChild(b); document.body.appendChild(NSV);
    }
    const pr = NSV.play(); if(pr && pr.catch) pr.catch(()=>{});
  }catch(e){}
}
function wakeFallbackStop(){ try{ if(NSV) NSV.pause(); }catch(e){} }
async function wakeAcquire(){
  WANT_AWAKE = true; clearTimeout(REL_T);
  if('wakeLock' in navigator){
    if(!WL && document.visibilityState === 'visible'){
      try{ WL = await navigator.wakeLock.request('screen'); WL.addEventListener('release', ()=>{ WL = null; }); }
      catch(e){ WL = null; wakeFallbackStart(); }
    }
  } else wakeFallbackStart();
}
function wakeRelease(){
  WANT_AWAKE = false; clearTimeout(REL_T);
  REL_T = setTimeout(()=>{ if(WANT_AWAKE) return; try{ if(WL) WL.release(); }catch(e){} WL = null; wakeFallbackStop(); }, 4000);   // petit délai : le diaporama suivant démarre presque aussitôt
}
SCCS.awake = ()=> !!WL || (!!NSV && !NSV.paused);

/* ---------- Son : un moteur unique et permanent ----------
   Musique douce générée (aucun fichier audio) + voix off. Le moteur audio est créé une seule fois (dès le premier
   toucher de l'écran, par ex. « Regarder la chaîne ») puis gardé pour toute la boucle. Pour que le son reste actif
   d'un diaporama à l'autre, SANS rien retoucher :
   1) quand un diaporama se termine et que le suivant démarre, la musique continue sans coupure (voir setOwner) ;
   2) un petit « gardien » vérifie toutes les 2 secondes que le moteur audio tourne, et le relance tout seul si le
      téléphone l'a mis en pause (cas fréquent sur Android et iPhone) ;
   3) une piste silencieuse en boucle garde la session audio du téléphone ouverte (elle ne fait aucun bruit) ;
   4) la voix est relancée toute seule si elle n'a pas démarré. */
let AC = null, MASTER = null, MUSIC = 0, NOTE_N = 0, SPEECH_OK = false, KEEP = null, KEEP_URL = '', WD = 0, HAND_T = 0;
const CHORDS = [[220,261.63,329.63],[174.61,220,261.63],[261.63,329.63,392],[196,246.94,293.66]];
function audioCtx(){
  if(AC && AC.state !== 'closed') return AC;
  try{
    const C = window.AudioContext || window.webkitAudioContext; if(!C) return null;
    try{ AC = new C({ latencyHint:'playback' }); }catch(e){ AC = new C(); }
    MASTER = AC.createGain(); MASTER.gain.value = .05; MASTER.connect(AC.destination);
    AC.onstatechange = ()=>{
      if(!AC) return;
      slog('audio : état ' + AC.state);
      if(AC.state === 'running'){ if(MUSIC) noteNow(); }          // le son revient → la musique repart tout de suite
      else if(OWNER) setTimeout(resumeAudio, 300);                 // le téléphone l'a mis en pause → on le relance
    };
  }catch(e){ AC = null; MASTER = null; }
  return AC;
}
function resumeAudio(){
  try{
    if(AC && AC.state === 'closed') audioCtx();                    // fermé par le système → on le recrée
    if(AC && AC.state !== 'running' && AC.resume){ const p = AC.resume(); if(p && p.catch) p.catch(()=>{}); }
  }catch(e){}
}
function audioBlocked(){ return (!!AC && AC.state !== 'running') || SPEECH_BLOCKED; }
function noteNow(){
  try{
    if(!AC || !MASTER || AC.state !== 'running') return;
    const ch = CHORDS[NOTE_N++ % CHORDS.length], t0 = AC.currentTime;
    ch.forEach((fr,i)=>{ const o = AC.createOscillator(), g = AC.createGain(); o.type = i === 0 ? 'triangle' : 'sine'; o.frequency.value = fr / (i === 0 ? 2 : 1);
      g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(.5, t0 + 1.2); g.gain.linearRampToValueAtTime(0, t0 + 4.2); o.connect(g); g.connect(MASTER); o.start(t0); o.stop(t0 + 4.3); });
  }catch(e){}
}
function startMusic(){
  if(MUSIC) return; if(!audioCtx()) return; resumeAudio();
  noteNow(); MUSIC = setInterval(noteNow, 4000); slog('musique : démarrée');
}
function stopMusic(){ if(MUSIC){ clearInterval(MUSIC); MUSIC = 0; slog('musique : arrêtée'); } }

/* Piste silencieuse (1 seconde de silence fabriquée sur place, lue en boucle) : garde la session audio ouverte. */
function silentWavUrl(){
  if(KEEP_URL) return KEEP_URL;
  const n = 8000, buf = new ArrayBuffer(44 + n * 2), v = new DataView(buf);
  const wr = (o, s)=>{ for(let i=0;i<s.length;i++) v.setUint8(o + i, s.charCodeAt(i)); };
  wr(0,'RIFF'); v.setUint32(4, 36 + n*2, true); wr(8,'WAVE'); wr(12,'fmt '); v.setUint32(16,16,true); v.setUint16(20,1,true); v.setUint16(22,1,true);
  v.setUint32(24,8000,true); v.setUint32(28,16000,true); v.setUint16(32,2,true); v.setUint16(34,16,true); wr(36,'data'); v.setUint32(40,n*2,true);
  KEEP_URL = URL.createObjectURL(new Blob([buf], { type:'audio/wav' }));
  return KEEP_URL;
}
function keepPlay(){
  try{
    if(!KEEP){ KEEP = new Audio(); KEEP.src = silentWavUrl(); KEEP.loop = true; KEEP.preload = 'auto'; KEEP.setAttribute('playsinline',''); KEEP.setAttribute('aria-hidden','true'); }
    if(KEEP.paused){ const p = KEEP.play(); if(p && p.catch) p.catch(()=>{}); }
  }catch(e){}
}
function keepStop(){ try{ if(KEEP) KEEP.pause(); }catch(e){} }

/* Le gardien : tant qu'un lecteur est « audible », on vérifie et on relance ce que le téléphone aurait coupé. */
function soundTick(){
  if(!OWNER) return;
  resumeAudio(); keepPlay();
  try{ if('speechSynthesis' in window && speechSynthesis.paused) speechSynthesis.resume(); }catch(e){}
}
function soundStart(){
  try{ if(navigator.audioSession) navigator.audioSession.type = 'playback'; }catch(e){}   // iPhone : le son passe même en mode silencieux
  startMusic(); keepPlay(); if(!WD) WD = setInterval(soundTick, 2000);
}
function soundStop(){ stopMusic(); keepStop(); if(WD){ clearInterval(WD); WD = 0; } }

/* Déblocage du son : les navigateurs exigent un toucher de l'utilisateur. On le prend au tout premier
   toucher (par ex. le bouton « Regarder la chaîne »), puis le son et la voix fonctionnent sans rien redemander. */
function unlock(){
  audioCtx(); resumeAudio(); keepPlay();
  try{
    if('speechSynthesis' in window){
      if(!SPEECH_OK){ const u = new SpeechSynthesisUtterance(' '); u.volume = 0; speechSynthesis.speak(u); SPEECH_OK = true; }
      if(SPEECH_BLOCKED){ SPEECH_BLOCKED = false; if(OWNER && LAST_TEXT) speakNow(LAST_TEXT, ++SAY_SEQ, 0); }   // on relit la phrase qui avait été bloquée
    }
  }catch(e){}
  if(WANT_AWAKE){ wakeAcquire(); }
}
['pointerdown','touchend','click','keydown'].forEach(ev=> document.addEventListener(ev, unlock, { capture:true, passive:true }));
SCCS.unlock = unlock;
const backToLife = ()=>{ if(document.visibilityState === 'visible'){ if(WANT_AWAKE) wakeAcquire(); resumeAudio(); if(OWNER) keepPlay(); } };
document.addEventListener('visibilitychange', backToLife);
window.addEventListener('pageshow', backToLife); window.addEventListener('focus', backToLife);

/* ---------- Lecteurs (plusieurs possibles : écran de la chaîne ET aperçu de l'admin) ----------
   Un seul lecteur à la fois est « audible » (voix + musique) pour que les sons ne se mélangent pas. */
const INST = []; let OWNER = null;
function repaintAll(){ INST.forEach(i=> i.paint && i.paint()); }
/* setOwner(inst)        → ce lecteur devient « audible » (musique + voix).
   setOwner(null)        → coupe tout de suite (bouton 🔇).
   setOwner(null, true)  → changement de diaporama : la phrase en cours se termine, la musique et le moteur audio restent en
                           route 4 secondes, le temps que le diaporama suivant prenne le relais SANS aucune coupure. */
function setOwner(inst, handover){
  if(OWNER === inst){ if(inst) clearTimeout(HAND_T); return; }
  OWNER = inst;
  if(inst){ clearTimeout(HAND_T); soundStart(); inst.lastK = -1; }
  else {
    clearTimeout(HAND_T);
    if(handover){ SAY_SEQ++; clearTimeout(SAY_T); HAND_T = setTimeout(()=>{ if(!OWNER){ cancelSpeech(); soundStop(); } }, 4000); }   // la phrase en cours (fin de l'ancien diaporama) peut se terminer
    else { cancelSpeech(); soundStop(); }
  }
  repaintAll();
}
function stopInst(inst){
  if(inst.raf){ cancelAnimationFrame(inst.raf); inst.raf = 0; }
  if(inst.wrap && inst.wrap.parentNode) inst.wrap.parentNode.removeChild(inst.wrap);
  const k = INST.indexOf(inst); if(k >= 0) INST.splice(k, 1);
  if(OWNER === inst) setOwner(null, inst.main);
  slog('■ ' + (inst.main ? 'chaîne' : 'aperçu admin') + ' : diaporama arrêté');
  if(!INST.length) wakeRelease();
}
/* SCCS.stop()      → arrête tous les lecteurs ;  SCCS.stop(element) → arrête seulement celui de cet élément */
SCCS.stop = function(host){ INST.slice().forEach(i=>{ if(!host || i.host === host) stopInst(i); }); };
/* Réglage « Son » des paramètres de la chaîne (admin) : SCCS.configure({ sound:true|false }).
   Le réglage donne le choix PAR DÉFAUT (activé tant que l'admin ne le change pas). Le spectateur peut ensuite couper
   le son avec 🔊 le temps de sa séance : son choix est respecté jusqu'à ce que l'admin change le réglage. */
let CFG_SOUND = null;
SCCS.configure = function(o){
  if(o && typeof o.sound === 'boolean' && o.sound !== CFG_SOUND){ CFG_SOUND = o.sound; SCCS.sound = o.sound; }
};
SCCS.setSound = function(on){
  SCCS.sound = !!on;
  const m = INST.find(i=>i.main); if(m) setOwner(on ? m : (OWNER === m ? null : OWNER));
};
/* SCCS.play(élément, idDiaporama, décalageEnSecondes, {main:true|false})
   main:true = lecteur des spectateurs (son activé par défaut) ; main:false = aperçu muet par défaut (admin) */
SCCS.play = function(host, id, offset, opt){
  opt = opt || {}; if(host) SCCS.stop(host);
  const sh = SCCS.byId[id]; if(!sh || !host) return false;
  const wr = document.createElement('div'); wr.setAttribute('data-slides','1');
  wr.style.cssText = 'position:relative;width:100%;border-radius:14px;overflow:hidden;background:#000;aspect-ratio:16/9;';
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H; cv.style.cssText = 'display:block;width:100%;height:100%;';
  const btn = document.createElement('button'); btn.type = 'button'; btn.setAttribute('aria-label', 'Activer ou couper le son');
  btn.style.cssText = 'position:absolute;left:12px;top:56px;width:40px;height:40px;border-radius:50%;border:none;background:rgba(0,0,0,.55);color:#fff;font-size:20px;cursor:pointer;z-index:3;';
  const tip = document.createElement('div'); tip.textContent = '🔊 Touche l\'écran pour activer le son';
  tip.style.cssText = 'position:absolute;left:50%;bottom:46px;transform:translateX(-50%);background:rgba(0,0,0,.72);color:#fff;padding:8px 14px;border-radius:999px;font:700 13px/1.2 sans-serif;z-index:4;display:none;pointer-events:none;white-space:nowrap;';
  const inst = { host, wrap:wr, id, sh, main: opt.main !== false, lastK:-1, raf:0, T0: performance.now() - (offset || 0) * 1000 };
  inst.paint = ()=>{ btn.textContent = OWNER === inst ? '🔊' : '🔇'; };
  btn.onclick = ()=>{
    if(OWNER === inst && audioBlocked()){ unlock(); return; }   // le son est « activé » mais le téléphone l'a bloqué : ce toucher le débloque (il ne le coupe pas)
    if(OWNER === inst){ setOwner(null); if(inst.main) SCCS.sound = false; }   // couper le son (le temps de cette séance seulement)
    else { setOwner(inst); if(inst.main) SCCS.sound = true; }
  };
  wr.appendChild(cv); wr.appendChild(btn); wr.appendChild(tip); host.insertBefore(wr, host.firstChild); INST.push(inst);
  wakeAcquire();
  const g = cv.getContext('2d');
  if('speechSynthesis' in window){ try{ speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged = ()=>{ VOICE = pickVoice(); }; }catch(e){} }
  if(inst.main && SCCS.sound) setOwner(inst); else inst.paint();
  slog('▶ ' + (inst.main ? 'chaîne' : 'aperçu admin') + ' : « ' + sh.titre + ' » (son ' + (OWNER === inst ? 'activé' : 'coupé') + ', moteur ' + (AC ? AC.state : 'pas créé') + ')');
  const tick = ()=>{
    if(INST.indexOf(inst) < 0) return;
    const t = clamp((performance.now() - inst.T0)/1000, 0, sh.dur - .001);
    try{ SCCS.drawFrame(g, id, t); }catch(e){ console.warn('diaporama', e); }
    const k = itemAt(sh, t); if(k !== inst.lastK){ const first = inst.lastK < 0; inst.lastK = k; if(OWNER === inst) say(narration(sh, k), first); }
    tip.style.display = (OWNER === inst && audioBlocked()) ? 'block' : 'none';
    inst.raf = requestAnimationFrame(tick);
  };
  inst.raf = requestAnimationFrame(tick);
  return true;
};
})();

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
try{ if(localStorage.getItem('scc_slides_sound') === '0') SCCS.sound = false; }catch(e){}

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

/* ---------- Voix off (voix française du téléphone) ---------- */
let VOICE = null;
function pickVoice(){
  try{
    const vs = window.speechSynthesis.getVoices().filter(v=>/^fr/i.test(v.lang)); if(!vs.length) return null;
    return vs.find(v=>/google|natural|premium|enhanced/i.test(v.name)) || vs[0];
  }catch(e){ return null; }
}
function say(text){
  if(!('speechSynthesis' in window)) return;
  try{
    speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang = 'fr-FR'; u.rate = .98; u.volume = 1;
    VOICE = VOICE || pickVoice(); if(VOICE) u.voice = VOICE; speechSynthesis.speak(u);
  }catch(e){}
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

/* ---------- Musique douce (générée, aucun fichier audio) ---------- */
let AC = null, MASTER = null, MUSIC = 0;
const CHORDS = [[220,261.63,329.63],[174.61,220,261.63],[261.63,329.63,392],[196,246.94,293.66]];
function startMusic(){
  try{
    if(MUSIC) return;
    if(!AC){ const C = window.AudioContext || window.webkitAudioContext; if(!C) return; AC = new C(); MASTER = AC.createGain(); MASTER.gain.value = .05; MASTER.connect(AC.destination); }
    if(AC.state === 'suspended') AC.resume();
    let n = 0; const note = ()=>{
      const ch = CHORDS[n++ % CHORDS.length], t0 = AC.currentTime;
      ch.forEach((fr,i)=>{ const o = AC.createOscillator(), g = AC.createGain(); o.type = i === 0 ? 'triangle' : 'sine'; o.frequency.value = fr / (i === 0 ? 2 : 1);
        g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(.5, t0 + 1.2); g.gain.linearRampToValueAtTime(0, t0 + 4.2); o.connect(g); g.connect(MASTER); o.start(t0); o.stop(t0 + 4.3); });
    };
    note(); MUSIC = setInterval(note, 4000);
  }catch(e){}
}
function stopMusic(){ if(MUSIC){ clearInterval(MUSIC); MUSIC = 0; } try{ if(AC){ AC.close(); } }catch(e){} AC = null; MASTER = null; }

/* ---------- Lecteurs (plusieurs possibles : écran de la chaîne ET aperçu de l'admin) ----------
   Un seul lecteur à la fois est « audible » (voix + musique) pour que les sons ne se mélangent pas. */
const INST = []; let OWNER = null;
function repaintAll(){ INST.forEach(i=> i.paint && i.paint()); }
function setOwner(inst){
  if(OWNER === inst) return; OWNER = inst;
  if(inst){ startMusic(); inst.lastK = -1; } else { try{ if('speechSynthesis' in window) speechSynthesis.cancel(); }catch(e){} stopMusic(); }
  repaintAll();
}
function stopInst(inst){
  if(inst.raf){ cancelAnimationFrame(inst.raf); inst.raf = 0; }
  if(inst.wrap && inst.wrap.parentNode) inst.wrap.parentNode.removeChild(inst.wrap);
  const k = INST.indexOf(inst); if(k >= 0) INST.splice(k, 1);
  if(OWNER === inst) setOwner(null);
}
/* SCCS.stop()      → arrête tous les lecteurs ;  SCCS.stop(element) → arrête seulement celui de cet élément */
SCCS.stop = function(host){ INST.slice().forEach(i=>{ if(!host || i.host === host) stopInst(i); }); };
SCCS.setSound = function(on){
  SCCS.sound = !!on; try{ localStorage.setItem('scc_slides_sound', on ? '1' : '0'); }catch(e){}
  const m = INST.find(i=>i.main); if(m) setOwner(on ? m : (OWNER === m ? null : OWNER));
};
/* SCCS.play(élément, idDiaporama, décalageEnSecondes, {main:true|false})
   main:true = lecteur des spectateurs (son selon leur préférence) ; main:false = aperçu muet par défaut (admin) */
SCCS.play = function(host, id, offset, opt){
  opt = opt || {}; if(host) SCCS.stop(host);
  const sh = SCCS.byId[id]; if(!sh || !host) return false;
  const wr = document.createElement('div'); wr.setAttribute('data-slides','1');
  wr.style.cssText = 'position:relative;width:100%;border-radius:14px;overflow:hidden;background:#000;aspect-ratio:16/9;';
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H; cv.style.cssText = 'display:block;width:100%;height:100%;';
  const btn = document.createElement('button'); btn.type = 'button'; btn.setAttribute('aria-label', 'Activer ou couper le son');
  btn.style.cssText = 'position:absolute;left:12px;top:56px;width:40px;height:40px;border-radius:50%;border:none;background:rgba(0,0,0,.55);color:#fff;font-size:20px;cursor:pointer;z-index:3;';
  const inst = { host, wrap:wr, id, sh, main: opt.main !== false, lastK:-1, raf:0, T0: performance.now() - (offset || 0) * 1000 };
  inst.paint = ()=>{ btn.textContent = OWNER === inst ? '🔊' : '🔇'; };
  btn.onclick = ()=>{
    if(OWNER === inst){
      if(AC && AC.state === 'suspended'){ AC.resume(); inst.lastK = -1; return; }
      setOwner(null); if(inst.main){ SCCS.sound = false; try{ localStorage.setItem('scc_slides_sound','0'); }catch(e){} }
    } else { setOwner(inst); if(inst.main){ SCCS.sound = true; try{ localStorage.setItem('scc_slides_sound','1'); }catch(e){} } }
  };
  wr.appendChild(cv); wr.appendChild(btn); host.insertBefore(wr, host.firstChild); INST.push(inst);
  const g = cv.getContext('2d');
  if('speechSynthesis' in window){ try{ speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged = ()=>{ VOICE = pickVoice(); }; }catch(e){} }
  if(inst.main && SCCS.sound) setOwner(inst); else inst.paint();
  const tick = ()=>{
    if(INST.indexOf(inst) < 0) return;
    const t = clamp((performance.now() - inst.T0)/1000, 0, sh.dur - .001);
    try{ SCCS.drawFrame(g, id, t); }catch(e){ console.warn('diaporama', e); }
    const k = itemAt(sh, t); if(k !== inst.lastK){ inst.lastK = k; if(OWNER === inst) say(narration(sh, k)); }
    inst.raf = requestAnimationFrame(tick);
  };
  inst.raf = requestAnimationFrame(tick);
  return true;
};
})();

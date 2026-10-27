/* ==========================================================
   MOTEUR DE DIAPORAMAS VIDÉO — SHAMAN CHOOZ CHANEL
   Chaque « vidéo » est un diaporama animé (fond en mouvement, grands emojis,
   titres, textes qui apparaissent ligne par ligne, transitions, barre de
   progression), dessiné en direct dans le téléphone du spectateur.
   Avantages : aucune vidéo lourde à envoyer sur GitHub, démarrage instantané,
   et tout le monde voit la même image en même temps (lecture synchronisée
   avec l'horloge de la boucle de la chaîne).
   Voix off (voix française du téléphone) + musique douce : le son reste activé en permanence
   pendant toute la boucle (il ne se coupe plus au changement de diaporama) ; le spectateur peut
   le couper avec le bouton 🔊 en haut à gauche de l'image.
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
/* Photo du responsable (photo-shaman.jpg) : affichée en médaillon dans les diaporamas « Agence » */
const PHOTO = new Image(); PHOTO.src = 'photo-shaman.jpg';
function portrait(g, x, y, r){
  if(!PHOTO.complete || !PHOTO.naturalWidth) return false;
  const nw = PHOTO.naturalWidth, nh = PHOTO.naturalHeight;
  g.save(); g.beginPath(); g.arc(x, y, r, 0, Math.PI*2); g.closePath(); g.clip();
  g.drawImage(PHOTO, nw*.32, nh*.08, nw*.56, nw*.56, x - r, y - r, r*2, r*2);
  g.restore();
  g.lineWidth = Math.max(3, r*.07); g.strokeStyle = '#F2B84B'; g.beginPath(); g.arc(x, y, r, 0, Math.PI*2); g.stroke();
  return true;
}
const clamp = (x,a,b)=> Math.max(a, Math.min(b, x));
const ease = x => { x = clamp(x,0,1); return 1 - Math.pow(1-x, 3); };

const SCCS = window.SCCS = { shows:[], byId:{}, PAL, sound:true, previewSound:false };   // sound = choix du spectateur ; previewSound = choix dans l'aperçu admin (retenu d'un diaporama à l'autre)
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
// SCCS.add(id, titre, categorie, palette, [[emoji, titre, texte], …], { photo:true })   ← 6e paramètre facultatif : affiche ta photo même si ce n'est pas un diaporama « Agence »
const norm = x => String(x).toLowerCase().replace(/\s+/g, ' ').trim();
function buildTl(sh){               /* durée de chaque écran = selon la longueur du texte ; recalculée si un texte est remplacé (SCCS.rebuild) */
  const tl = []; let t = 0; const push = (type, dur, data)=>{ tl.push({ type, start:t, dur, data }); t += dur; };
  push('intro', 4.5, {});
  sh.slides.forEach((s,i)=>{ const words = (s.t + ' ' + s.x).trim().split(/\s+/).length; push('slide', clamp(2.4 + words/2.4, 5.5, 13), { s, i }); });
  push('outro', 5.5, {}); if(sh.agency) push('contact', 15, {});
  sh.tl = tl; sh.dur = t;
}
SCCS.rev = 0;                       /* numéro de révision : change quand des textes sont remplacés (l'ordre de la boucle est alors recalculé) */
SCCS.rebuild = function(sh, quiet){ if(sh) buildTl(sh); if(!quiet) SCCS.rev++; };   /* quiet = ne change pas la révision (utile quand on remplace beaucoup d'écrans d'un coup) */
SCCS.add = function(id, titre, cat, pal, slides, opt){
  if(SCCS.byId[id]){ console.warn('Diaporama en double ignoré :', id); return; }
  const sl = slides.map(s=>({ e:s[0], t:s[1], x:s[2] || '' }));
  const sh = { id, titre, cat, pal: PAL[pal] || PAL.bleu, slides: sl, agency: cat === 'Agence', photo: !!(opt && opt.photo) };
  /* clés d'origine (avant toute variante de texte) : l'ordre de la boucle ne dépend que d'elles, donc il reste identique pour tout le monde */
  sh.k = { gab: sl.map(x => norm(x.t)).join('/'), tit: norm(titre), con: sl.map(x => norm(x.t + '|' + x.x)).join('§') };
  buildTl(sh);
  SCCS.shows.push(sh); SCCS.byId[id] = sh;
};
SCCS.duration = id => SCCS.byId[id] ? SCCS.byId[id].dur : 0;

/* Ordre de la boucle (v12) — objectif : sur n'importe quelle heure de diffusion, le spectateur voit des vidéos TOUTES DIFFÉRENTES.
   1) Chaque « gabarit » (même suite de titres de diapos : « Pourquoi nous le faisons / Offrir une vraie chance… ») est réparti
      régulièrement sur TOUTE la boucle, avec un décalage propre à chaque gabarit : ni début de boucle surchargé, ni fin pauvre en variété.
   2) Une passe de lissage choisit ensuite chaque diffusion en évitant de rapprocher : même contenu / même titre (≥ 5 h d'écart),
      même gabarit (≥ 1 h), même famille d'identifiants (pas deux d'affilée), même catégorie (hors « Agence »).
   L'ordre est entièrement déterministe → identique pour tous les spectateurs, et chaque diaporama passe exactement une fois par tour. */
function hash32(str){ let h = 2166136261; for(let i = 0; i < str.length; i++){ h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0) / 4294967296; }
function buildOrder(){
  const info = SCCS.shows.map(s => ({
    s, fam: s.id.split('-')[0], cat: s.cat, ag: !!s.agency, gab: s.k.gab, tit: s.k.tit, con: s.k.con
  }));
  const groups = {};
  info.forEach(o => (groups[o.gab] = groups[o.gab] || []).push(o));
  Object.keys(groups).forEach(k => { const g = groups[k], phi = hash32(k); g.forEach((o, j) => { o.pos = (j + phi) / g.length; o.tie = hash32(o.s.id); }); });
  const rem = info.slice().sort((a, b) => a.pos - b.pos || a.tie - b.tie), out = [], N = info.length;
  const size = { con:{}, tit:{}, gab:{}, fam:{} };
  info.forEach(o => { ['con', 'tit', 'gab', 'fam'].forEach(k => { size[k][o[k]] = (size[k][o[k]] || 0) + 1; }); });
  const last = { con:{}, tit:{}, gab:{}, fam:{}, cat:{} }, WIN = 90;
  /* distance d'écart exigée = la plus grande possible, mais jamais plus que ce que la taille du groupe permet (sinon on ne pourrait pas la tenir) */
  const pen = (k, o, p, lim, w) => { const l = Math.min(lim, .7 * N / size[k][o[k]]); if(l < 2) return 0; const d = o[k] in last[k] ? p - last[k][o[k]] : 1e9; return d < l ? w * (1 - d / l) + w * .25 : 0; };
  while(rem.length){
    const p = out.length; let best = 0, bestPen = Infinity;
    for(let c = 0, n = Math.min(WIN, rem.length); c < n; c++){
      const o = rem[c];
      const v = c * .5 + pen('con', o, p, 300, 1000) + pen('tit', o, p, 300, 800) + pen('gab', o, p, 60, 500) + pen('fam', o, p, 5, 250)
              + (o.ag ? 0 : (o.cat in last.cat && p - last.cat[o.cat] < 3 ? 120 * (1 - (p - last.cat[o.cat]) / 3) + 30 : 0));
      if(v < bestPen){ bestPen = v; best = c; }
    }
    const o = rem.splice(best, 1)[0]; out.push(o);
    last.con[o.con] = last.tit[o.tit] = last.gab[o.gab] = last.fam[o.fam] = last.cat[o.cat] = p;
  }
  return out.map(o => o.s);
}
let PL_CACHE = null, PL_N = '';      /* l'ordre est calculé une seule fois (et recalculé si des diaporamas s'ajoutent) : la lecture le consulte souvent */
SCCS.playlist = function(){
  const sig = SCCS.shows.length + ':' + SCCS.rev;
  if(!PL_CACHE || PL_N !== sig){
    PL_CACHE = buildOrder().map(s => ({ id:'s:' + s.id, title:'🎬 ' + s.titre, type:'slides', ref:s.id, sec:Math.ceil(s.dur), builtin:true }));
    PL_N = sig;
  }
  return PL_CACHE.slice();
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
  if((sh.agency || sh.photo) && cur) portrait(g, W-96, H-19, 24);
}

function drawIntro(g, sh, lt, t){
  const e = ease(lt/.8), fade = lt > 4 ? clamp((4.5-lt)/.5,0,1) : 1;
  g.save(); g.globalAlpha = fade; g.translate(W/2, H/2); g.scale(.85 + .15*e, .85 + .15*e); g.translate(-W/2, -H/2);
  glow(g, W/2, 175, 170, sh.pal[2], .35);
  g.fillStyle = '#fff'; if(!((sh.agency || sh.photo) && portrait(g, W/2, 168 + Math.sin(t*1.8)*4, 84))) emoji(g, sh.slides[0] ? sh.slides[0].e : '🎬', W/2, 168 + Math.sin(t*1.8)*6, 120);
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
  if(!((sh.agency || sh.photo) && portrait(g, W/2, 128, 64))) emoji(g, sh.agency ? '🤝' : '🎬', W/2, 130 + Math.sin(t*1.8)*6, 96);
  g.textAlign = 'center'; g.textBaseline = 'alphabetic'; g.fillStyle = '#fff';
  if(sh.agency){
    g.font = f(FONT_T, 42); g.fillText('Besoin de travailler ? Envie d\'un emploi ?', W/2, 240, 900);
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
  if(sh.agency) portrait(g, W-76, 88, 36);
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
let CUR_UTT = null, SAY_T = 0;
function cancelSpeech(){ clearTimeout(SAY_T); CUR_UTT = null; try{ if('speechSynthesis' in window) speechSynthesis.cancel(); }catch(e){} }
function say(text){
  if(!('speechSynthesis' in window)) return;
  try{
    const ss = speechSynthesis; clearTimeout(SAY_T);
    const busy = ss.speaking || ss.pending;
    if(busy) ss.cancel();                                   // on ne coupe que s'il y a vraiment une phrase en cours
    const u = new SpeechSynthesisUtterance(String(text).replace(/SHAMAN\s+CHOOZ\s+PRODUCTION/gi, window.SCC_NOM_PARLE || 'Shaman Tchouze Production').replace(/CHOOZ/gi, 'Tchouze')); u.lang = 'fr-FR';
    try{ const vs = speechSynthesis.getVoices(); const v = vs.find(x=> /^fr[-_]FR/i.test(x.lang) && /google|microsoft|natural|online/i.test(x.name)) || vs.find(x=> /^fr/i.test(x.lang)); if(v) u.voice = v; }catch(e){} u.rate = .98; u.volume = 1;
    VOICE = VOICE || pickVoice(); if(VOICE) u.voice = VOICE;
    u.onend = ()=>{ if(CUR_UTT === u) CUR_UTT = null; };
    u.onerror = e=>{ if(CUR_UTT === u) CUR_UTT = null; if(e && e.error === 'not-allowed') SPEECH_OK = false; };   // refusée : on redébloquera au prochain toucher
    CUR_UTT = u;                                            // référence gardée : sinon certains navigateurs coupent la voix en route
    SAY_T = setTimeout(()=>{ try{ if(ss.paused) ss.resume(); ss.speak(u); }catch(e){} }, busy ? 120 : 0);
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
    if(ag.ville) parts.push('Nous sommes à ' + String(ag.ville).replace(/Yopougon Niangon( Académie)?/gi, 'Yopougon Académie') + '.');
    return parts.join(' ');
  }
  return sh.agency ? ('Besoin de travailler ? Envie de trouver un emploi ? ' + (ag.court || ag.nom ? 'Contactez ' + (ag.court || ag.nom) + '.' : 'Contactez notre agence.')) : 'Merci d\'avoir regardé. Un nouveau programme arrive dans un instant.';
}

SCCS.narration = narration;   /* utilisé par le studio de voix off (espace admin) */

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

/* ---------- Session audio permanente (musique + voix) ----------
   Le son appartient à la SESSION de la chaîne, pas à chaque diaporama :
   - un seul contexte audio, créé au premier toucher puis gardé ouvert pendant toute la boucle ;
   - un signal inaudible et une piste silencieuse tournent en continu : le navigateur ne met plus le son en veille entre deux diaporamas ;
   - la musique n'est JAMAIS coupée au changement de diaporama : le suivant la reprend sans interruption
     (elle ne s'arrête que si le spectateur appuie sur 🔊, ou si la boucle passe sur une vidéo YouTube / un fichier vidéo) ;
   - un « gardien » vérifie toutes les 2 secondes que le son est bien actif et le relance tout seul si le navigateur l'a mis en pause. */
const INST = []; let OWNER = null;
let AC = null, MASTER = null, MUSIC = 0, SPEECH_OK = false, HB = null, KEEP = null, KEEP_PRIMED = false, WATCH = 0, DROP_T = 0;
const CHORDS = [[220,261.63,329.63],[174.61,220,261.63],[261.63,329.63,392],[196,246.94,293.66]];
function audioCtx(){
  if(AC) return AC;
  try{
    const C = window.AudioContext || window.webkitAudioContext; if(!C) return null;
    AC = new C(); MASTER = AC.createGain(); MASTER.gain.value = .05; MASTER.connect(AC.destination);
    AC.onstatechange = ()=>{ if(AC && AC.state !== 'running' && INST.length) resumeAudio(); };   // le navigateur l'a mis en pause → on le relance aussitôt
    HB = AC.createOscillator(); const hg = AC.createGain(); hg.gain.value = .0004; HB.frequency.value = 40; HB.connect(hg); hg.connect(AC.destination); HB.start();   // signal inaudible, permanent
  }catch(e){ AC = null; }
  return AC;
}
function resumeAudio(){
  try{ if(AC && AC.state !== 'running' && AC.resume){ const p = AC.resume(); if(p && p.catch) p.catch(()=>{}); return p; } }catch(e){}
  return null;
}
/* Piste silencieuse (1 s, en boucle) : garde la page « en lecture audio » (utile surtout sur iPhone/iPad). */
function keepStart(){
  try{
    if(!KEEP){
      const n = 8000, b = new Uint8Array(44 + n), dv = new DataView(b.buffer), w = (o,t)=>{ for(let i=0;i<t.length;i++) b[o+i] = t.charCodeAt(i); };
      w(0,'RIFF'); dv.setUint32(4, 36 + n, true); w(8,'WAVE'); w(12,'fmt '); dv.setUint32(16,16,true); dv.setUint16(20,1,true); dv.setUint16(22,1,true);
      dv.setUint32(24,8000,true); dv.setUint32(28,8000,true); dv.setUint16(32,1,true); dv.setUint16(34,8,true); w(36,'data'); dv.setUint32(40,n,true); b.fill(128, 44);
      KEEP = new Audio(URL.createObjectURL(new Blob([b], { type:'audio/wav' }))); KEEP.loop = true; KEEP.setAttribute('playsinline',''); KEEP.preload = 'auto';
    }
    if(KEEP.paused){ const p = KEEP.play(); if(p && p.catch) p.catch(()=>{}); }
  }catch(e){}
}
function keepStop(){ try{ if(KEEP && !KEEP.paused) KEEP.pause(); }catch(e){} }
function startMusic(){
  if(MUSIC) return; const ac = audioCtx(); if(!ac) return; keepStart();
  let n = 0;
  const note = ()=>{
    if(!AC || AC.state !== 'running') return;
    const ch = CHORDS[n++ % CHORDS.length], t0 = AC.currentTime;
    ch.forEach((fr,i)=>{ const o = AC.createOscillator(), g = AC.createGain(); o.type = i === 0 ? 'triangle' : 'sine'; o.frequency.value = fr / (i === 0 ? 2 : 1);
      g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(.5, t0 + 1.2); g.gain.linearRampToValueAtTime(0, t0 + 4.2); o.connect(g); g.connect(MASTER); o.start(t0); o.stop(t0 + 4.3); });
  };
  note();
  const p = resumeAudio(); if(p && p.then) p.then(note).catch(()=>{});   // si le contexte était en pause, la 1re note part dès qu'il repart (avant : attente de 4 s)
  MUSIC = setInterval(note, 4000);
}
function stopMusic(){ if(MUSIC){ clearInterval(MUSIC); MUSIC = 0; } }
function soundOff(){ cancelSpeech(); stopMusic(); keepStop(); }

/* Gardien : tant qu'un lecteur a le son, on vérifie que tout tourne et on relance ce qui s'est arrêté. */
function guard(){
  if(!INST.length){ clearInterval(WATCH); WATCH = 0; return; }
  if(!OWNER) return;
  resumeAudio();
  if(!MUSIC) startMusic();
  if(KEEP && KEEP.paused) keepStart();
  try{ if('speechSynthesis' in window && speechSynthesis.paused) speechSynthesis.resume(); }catch(e){}
}
function guardStart(){ if(!WATCH) WATCH = setInterval(guard, 2000); }

/* Déblocage du son : les navigateurs exigent un toucher de l'utilisateur. On le prend au tout premier
   toucher (par ex. le bouton « Regarder la chaîne »), puis le son et la voix fonctionnent sans rien redemander. */
function unlock(){
  audioCtx(); resumeAudio();
  if(!KEEP_PRIMED){ KEEP_PRIMED = true; keepStart(); if(!OWNER) keepStop(); } else if(OWNER) keepStart();
  try{ if(!SPEECH_OK && 'speechSynthesis' in window){ const u = new SpeechSynthesisUtterance(' '); u.volume = 0; speechSynthesis.speak(u); SPEECH_OK = true; } }catch(e){}
  if(WANT_AWAKE){ wakeAcquire(); }
}
['pointerdown','touchend','click','keydown'].forEach(ev=> document.addEventListener(ev, unlock, { capture:true, passive:true }));
SCCS.unlock = unlock;
const comeBack = ()=>{ if(document.visibilityState === 'visible'){ if(WANT_AWAKE) wakeAcquire(); resumeAudio(); if(OWNER) keepStart(); } };
document.addEventListener('visibilitychange', comeBack); window.addEventListener('pageshow', comeBack); window.addEventListener('focus', comeBack);

/* ---------- Lecteurs (plusieurs possibles : écran de la chaîne ET aperçu de l'admin) ----------
   Un seul lecteur à la fois est « audible » (voix + musique) pour que les sons ne se mélangent pas. */
function repaintAll(){ INST.forEach(i=> i.paint && i.paint()); }
function setOwner(inst){
  clearTimeout(DROP_T); DROP_T = 0;                         // un nouveau lecteur reprend le son : on annule la coupure prévue
  if(OWNER === inst){ if(inst) guardStart(); return; }
  OWNER = inst;
  if(inst){ startMusic(); inst.lastK = -1; guardStart(); } else soundOff();
  repaintAll();
}
function stopInst(inst){
  if(inst.raf){ cancelAnimationFrame(inst.raf); inst.raf = 0; }
  if(inst.wrap && inst.wrap.parentNode) inst.wrap.parentNode.removeChild(inst.wrap);
  const k = INST.indexOf(inst); if(k >= 0) INST.splice(k, 1);
  if(OWNER === inst){
    // Fin d'un diaporama : on ne coupe PAS le son tout de suite. Le diaporama suivant démarre dans la foulée et reprend
    // la musique sans coupure. Si rien ne reprend le son dans les 3,5 s (la boucle passe sur une autre vidéo), on l'arrête.
    OWNER = null; repaintAll(); clearTimeout(DROP_T);
    DROP_T = setTimeout(()=>{ DROP_T = 0; if(!OWNER) soundOff(); }, 3500);
  }
  if(!INST.length) wakeRelease();
}
/* SCCS.stop()      → arrête tous les lecteurs ;  SCCS.stop(element) → arrête seulement celui de cet élément */
SCCS.stop = function(host){ INST.slice().forEach(i=>{ if(!host || i.host === host) stopInst(i); }); };
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
    const on = OWNER !== inst;                               // le choix du spectateur est retenu pour tous les diaporamas suivants (le temps de la séance)
    if(inst.main) SCCS.sound = on; else SCCS.previewSound = on;
    setOwner(on ? inst : null);
  };
  wr.appendChild(cv); wr.appendChild(btn); wr.appendChild(tip); host.insertBefore(wr, host.firstChild); INST.push(inst);
  wakeAcquire();
  const g = cv.getContext('2d');
  if('speechSynthesis' in window){ try{ speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged = ()=>{ VOICE = pickVoice(); }; }catch(e){} }
  const mainHasSound = INST.some(i=> i.main && OWNER === i);
  if(inst.main ? SCCS.sound : (SCCS.previewSound && !mainHasSound)) setOwner(inst); else inst.paint();   // chaque nouveau diaporama reprend le choix de la séance
  const tick = ()=>{
    if(INST.indexOf(inst) < 0) return;
    const t = clamp((performance.now() - inst.T0)/1000, 0, sh.dur - .001);
    try{ SCCS.drawFrame(g, id, t); }catch(e){ console.warn('diaporama', e); }
    const k = itemAt(sh, t); if(k !== inst.lastK){ inst.lastK = k; if(OWNER === inst) say(narration(sh, k)); }
    tip.style.display = (OWNER === inst && AC && AC.state !== 'running') ? 'block' : 'none';
    inst.raf = requestAnimationFrame(tick);
  };
  inst.raf = requestAnimationFrame(tick);
  return true;
};
})();

/* ==========================================================
   STUDIO CLIPS PUB — SHAMAN CHOOZ CHANEL
   Le nouveau studio est la page « studio-clips.html » (photos de fond, voix off, musique,
   vidéo à télécharger, chaîne en boucle). Ici, dans Admin > 🔴 Chaîne, on garde seulement :
   – un bouton qui ouvre le nouveau studio ;
   – la lecture des anciens clips déjà enregistrés dans Firebase (liveSettings/studioClips),
     pour qu'ils continuent de tourner dans la chaîne (tu peux les retirer avec 🗑).
   ========================================================== */
(function(){
'use strict';
if(!window.SCCS || !SCCS.add) return;
const $ = id => document.getElementById(id);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const PAL = {dore:['#1a0e04','#f5a623','#ffd98a','#ff7a1a'],neon:['#07041a','#00e5ff','#ff2bd6','#7a5cff'],aqua:['#021a24','#17b8d8','#9be7ff','#2ee59d'],luxe:['#0a0a0a','#d4af37','#f5e6b0','#8c6d1f'],fete:['#25062a','#ff4f9a','#ffb03a','#6ee7ff']};

/* ---------- Rendu (s'adapte à la taille du canevas : 16:9 dans la chaîne, vertical possible) ---------- */
function cam(c,p,W,H){ const e = p*p*(3-2*p); switch(c){ case'zin':return[1+.3*e,0,0,0]; case'zout':return[1.3-.3*e,0,0,0]; case'panL':return[1.25,(.5-e)*.1*W,0,0]; case'panR':return[1.25,(e-.5)*.1*W,0,0]; case'tilt':return[1.25,0,(.5-e)*.08*H,0]; default:return[1.3,0,0,(e-.5)*.05]; } }
function bg(g,i,tm,P,W,H){ const a = P[1+i%3], b = P[1+(i+1)%3], gx = W*(.5+.3*Math.sin(tm*.4+i*2)), gy = H*(.35+.15*Math.cos(tm*.3+i)), r = g.createRadialGradient(gx,gy,20,gx,gy,Math.max(W,H)*.9);
  r.addColorStop(0,a+'cc'); r.addColorStop(.5,b+'55'); r.addColorStop(1,P[0]); g.fillStyle = P[0]; g.fillRect(0,0,W,H); g.fillStyle = r; g.fillRect(0,0,W,H); }
function light(g,i,tm,P,A,W,H,u){ g.globalCompositeOperation = 'lighter';
  if(A==='dore'||A==='luxe') for(let k=0;k<5;k++){ g.save(); g.translate(W*.9,-40); g.rotate(.1+k*.2+Math.sin(tm*.5+k)*.06); const l = g.createLinearGradient(0,0,0,H*1.2); l.addColorStop(0,P[2]+'55'); l.addColorStop(1,P[2]+'00'); g.fillStyle = l; g.fillRect((-26-k*6)*u,0,(52+k*12)*u,H*1.4); g.restore(); }
  if(A==='neon') for(let k=0;k<3;k++){ const y = H*(.2+.3*k)+Math.sin(tm+k)*30*u, l = g.createLinearGradient(0,y-60*u,0,y+60*u), c = P[1+k%3]; l.addColorStop(0,c+'00'); l.addColorStop(.5,c+'66'); l.addColorStop(1,c+'00'); g.fillStyle = l; g.fillRect(0,y-60*u,W,120*u); }
  for(let k=0;k<22;k++){ const sd = k*7.31+i*3.1, x = (Math.sin(sd)*.5+.5)*W+Math.sin(tm*.4+sd)*30*u, y = H+40-((tm*(.02+(k%5)*.012)*H+k*97)%(H+80)), r = (14+(k%6)*9)*u, c = P[1+k%3], q = g.createRadialGradient(x,y,0,x,y,r);
    q.addColorStop(0,c+'88'); q.addColorStop(1,c+'00'); g.fillStyle = q; g.beginPath(); g.arc(x,y,r,0,7); g.fill(); } }
function wrapT(g,t,mw){ const L = []; let l = ''; t.split(' ').forEach(x => { const n = l ? l+' '+x : x; if(g.measureText(n).width > mw && l){ L.push(l); l = x; } else l = n; }); L.push(l); return L; }
function drawClip(g, sh, t){
  const c = sh.clip, W = g.canvas.width, H = g.canvas.height, u = Math.min(W,H)/540, P = PAL[c.amb] || PAL.dore, port = H > W;
  t = Math.max(0, Math.min(t, sh.dur - .001)); let k = sh.tl.findIndex(it => t < it.start + it.dur); if(k < 0) k = sh.tl.length - 1;
  const it = sh.tl[k], el = t - it.start, p = Math.min(1, el/it.dur), sc = c.sc[k], [z,x,y,r] = cam(sc[1],p,W,H);
  g.save(); g.setTransform(1,0,0,1,0,0); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over'; g.clearRect(0,0,W,H);
  g.save(); g.translate(W/2+x,H/2+y); g.rotate(r); g.scale(z,z); g.translate(-W/2,-H/2); bg(g,k,t,P,W,H); light(g,k,t,P,c.amb,W,H,u); g.restore(); g.globalCompositeOperation = 'source-over';
  const v = g.createRadialGradient(W/2,H/2,H*.3,W/2,H/2,Math.max(W,H)*.7); v.addColorStop(0,'rgba(0,0,0,0)'); v.addColorStop(1,'rgba(0,0,0,.6)'); g.fillStyle = v; g.fillRect(0,0,W,H);
  const cw = Math.min(W-60*u, port ? W-80*u : 620*u); let fs, L;
  for(const s of [44,36,30,26]){ fs = s*u; g.font = `900 ${fs}px "Baloo 2","Arial Black",Impact,sans-serif`; L = wrapT(g, sc[0], cw); if(L.length <= (port?6:4)) break; }
  const lh = fs*1.3, y0 = H*(port?.66:.6) - L.length*lh/2, N = sc[0].split(' ').length; let n = 0;
  g.textBaseline = 'middle'; g.textAlign = 'left'; g.fillStyle = P[1]; g.fillRect(W/2-30*u,y0-lh,60*u,6*u);
  L.forEach((ln,li) => { let px = (W-g.measureText(ln).width)/2; ln.split(' ').forEach(w => { const a = Math.max(0,Math.min(1,p/.6*N-n++)); if(a > 0){ g.globalAlpha = a; g.fillStyle = '#fff'; g.shadowColor = 'rgba(0,0,0,.75)'; g.shadowBlur = 14*u; g.fillText(w,px,y0+li*lh+(1-a)*18*u); } px += g.measureText(w+' ').width; }); });
  g.globalAlpha = 1; g.shadowBlur = 0; g.font = `700 ${16*u}px Inter,sans-serif`; g.fillStyle = 'rgba(255,255,255,.8)'; g.fillText('SHAMAN CHOOZ CHANEL', 20*u, 28*u);
  g.fillStyle = 'rgba(255,255,255,.25)'; g.fillRect(0,H-4*u,W,4*u); g.fillStyle = P[1]; g.fillRect(0,H-4*u,W*t/sh.dur,4*u);
  g.fillStyle = '#000'; g.globalAlpha = Math.max(0,1-el/.35); g.fillRect(0,0,W,H); g.restore();
}
const origDraw = SCCS.drawFrame;
SCCS.drawFrame = function(g,id,t){ const sh = SCCS.byId[id]; if(sh && sh.clip) return drawClip(g,sh,t); return origDraw.apply(this,arguments); };

/* ---------- Enregistrement des clips dans le moteur (ils rejoignent la boucle) ---------- */
function fix(sh){ const c = sh.clip; let t = 0; sh.tl = c.sc.map((s,i) => { const it = { type:'slide', start:t, dur:s[2], data:{ s:sh.slides[i], i } }; t += s[2]; return it; }); sh.dur = t; }
const rb = SCCS.rebuild; SCCS.rebuild = function(sh){ const r = rb.apply(this,arguments); if(sh && sh.clip) fix(sh); return r; };
function reg(c, draft){
  const id = draft ? 'clip-draft' : c.id; if(draft) delete SCCS.byId[id];
  SCCS.add(id, c.titre || 'Clip pub', 'Clips pub', 'bleu', c.sc.map(s => ['🎬', s[0], '']));
  const sh = SCCS.byId[id]; if(!sh) return null; sh.clip = c; fix(sh);
  if(draft){ const i = SCCS.shows.indexOf(sh); if(i >= 0) SCCS.shows.splice(i,1); }
  return sh;
}
function unreg(id){ const sh = SCCS.byId[id]; if(!sh) return; delete SCCS.byId[id]; const i = SCCS.shows.indexOf(sh); if(i >= 0) SCCS.shows.splice(i,1); }
let CL = {};
function sync(map){
  map = map || {}; let ch = false;
  Object.keys(CL).forEach(id => { if(!map[id]){ unreg(id); ch = true; } });
  Object.keys(map).forEach(id => { const c = map[id]; if(!c || !c.sc) return; if(!CL[id] || CL[id].ts !== c.ts){ unreg(id); c.id = id; reg(c); ch = true; } });
  CL = map; if(ch){ SCCS.rev++; try{ localStorage.sccClips = JSON.stringify(map); }catch(e){} drawList(); }
}
function remote(){ try{ return (typeof LIVE_SETTINGS !== 'undefined' && LIVE_SETTINGS && LIVE_SETTINGS.studioClips) || null; }catch(e){ return null; } }
try{ sync(JSON.parse(localStorage.sccClips || '{}')); }catch(e){}
setInterval(() => { const r = remote(); if(r) sync(r); }, 8000);
addEventListener('load', () => { const r = remote(); if(r) sync(r); setTimeout(() => { const q = remote(); if(q) sync(q); }, 4000); });

/* ---------- Section admin ---------- */
function prev(c){ const box = $('csBox'); if(!box || !c) return; const sh = reg(c, true); if(!sh) return; box.style.display = 'block'; SCCS.play(box, 'clip-draft', 0, { main:false }); box.scrollIntoView({ behavior:'smooth', block:'center' }); }
function drawList(){ const el = $('csList'); if(!el) return; const ids = Object.keys(CL), old = $('csOld'); if(old) old.style.display = ids.length ? 'block' : 'none';
  el.innerHTML = ids.map(id => `<div style="display:flex;gap:8px;align-items:center;padding:8px 0;border-top:1px solid var(--line,#e7e7e7)"><b style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">🎞️ ${esc(CL[id].titre)}</b><button class="chip" data-cs="p:${id}">▶</button><button class="chip" data-cs="d:${id}">🗑</button></div>`).join(''); }
function del(id){ if(!confirm('Retirer ce clip de la chaîne ?')) return; const map = Object.assign({}, CL); delete map[id];
  try{ LIVE_SETTINGS.studioClips = Object.keys(map).length ? map : null; }catch(e){}
  Promise.resolve(DB.update('liveSettings', { studioClips: Object.keys(map).length ? map : null })).then(() => sync(map)); }
function build(){ const host = $('adminTab-live'); if(!host || $('clipStudio')) return;
  host.insertAdjacentHTML('afterbegin', `<div id="clipStudio" style="margin-bottom:22px;padding-bottom:18px;border-bottom:1px solid var(--line,#e7e7e7)">
<p class="field-label" style="margin-top:0">🎞️ Studio Clips pub — voix off incluse, gratuit</p>
<p class="hint">Décris ta pub : scènes, lumière, mouvement de caméra, photos de fond, voix off et musique. Tu peux la lancer, la télécharger en vidéo ou l'enregistrer dans ta chaîne. Le studio s'ouvre dans une page à part.</p>
<a class="btn btn-primary" href="studio-clips.html" target="_blank" rel="noopener" style="display:block;text-align:center;text-decoration:none">🎬 Ouvrir le Studio Clips</a>
<div id="csOld" style="display:none"><p class="field-label">Anciens clips dans la chaîne</p><div id="csList"></div>
<div id="csBox" class="live-player-box" style="display:none;margin-top:10px"></div></div></div>`);
  $('csList').addEventListener('click', e => { const b = e.target.closest('[data-cs]'); if(!b) return; const [a,id] = b.dataset.cs.split(':'), c = CL[id]; if(!c) return;
    if(a === 'p') prev(c); else if(a === 'd') del(id); });
  drawList();
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();

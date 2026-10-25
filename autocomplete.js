/* ==========================================================
   AUTOCOMPLÉTION DES CHAMPS DE RECHERCHE — partout dans l'appli
   Dès les premières lettres, une liste de mots (puis de titres complets) s'affiche.
   On touche une proposition : le champ se remplit et la recherche se lance toute seule.
   Champs gérés : vidéos (catalogue client et admin), jeux, commandes, abonnés.
   Tout nouveau champ de recherche (placeholder « 🔎 … » ou type="search") est géré automatiquement.
   ========================================================== */
(function(){
'use strict';
const norm = s => String(s == null ? '' : s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const lists = fn => { try{ return (fn() || []).filter(Boolean).map(String); }catch(e){ return []; } };

/* Sources de mots par champ (lues au moment de la saisie, donc toujours à jour) */
const catalogTxt = () => Object.values(CATALOG).flatMap(v => [v.title, v.cat]);
const SRC = {
  catalogSearchInput: catalogTxt,
  adminCatalogSearch: catalogTxt,
  adminOrderSearch: () => Object.values(ORDERS).flatMap(o => [o.buyerName, o.buyerPhone, o.ref, o.title]),
  liveSubSearch: () => activeLivePassOrders().flatMap(([, o]) => [o.buyerName, o.buyerPhone]),
  gmSearch: () => SCCG.games.flatMap(g => [g.name, g.cat])
};
/* Champ inconnu (ajouté plus tard) : on propose les titres des vidéos, diaporamas et jeux */
const FALLBACK = () => [].concat(
  lists(catalogTxt),
  lists(() => SCCS.shows.map(s => s.titre)),
  lists(() => SCCG.games.map(g => g.name))
);

function suggest(inp){
  const raw = inp.value, q = norm(raw.trim());
  if(!q) return [];
  const parts = raw.split(/\s+/), last = norm(parts[parts.length - 1] || '');
  if(!last) return [];
  const head = parts.slice(0, -1).join(' ');
  const texts = lists(SRC[inp.id] || FALLBACK);
  const out = [], seen = new Set([q]);
  const add = (label, value, phrase) => { const k = norm(value); if(seen.has(k) || out.length >= 8) return; seen.add(k); out.push({ label, value, phrase }); };

  /* 1) Les mots qui commencent par les lettres tapées (les plus fréquents d'abord) */
  const freq = new Map();
  texts.forEach(t => t.split(/[\s'’,;:!?()«»"“”/|–—-]+/).forEach(w => {
    w = w.replace(/^[.]+|[.]+$/g, '');
    if(w.length > 1 && norm(w).startsWith(last)){ const k = norm(w), o = freq.get(k) || { w, n: 0 }; o.n++; freq.set(k, o); }
  }));
  [...freq.values()].sort((a, b) => b.n - a.n || a.w.localeCompare(b.w, 'fr')).slice(0, 5)
    .forEach(o => add(o.w, (head ? head + ' ' : '') + o.w, false));

  /* 2) Les titres / noms complets qui contiennent ce qui est tapé */
  const ph = [...new Set(texts)].filter(t => t.length > 3 && norm(t).includes(q))
    .sort((a, b) => (norm(b).startsWith(q) - norm(a).startsWith(q)) || a.length - b.length);
  ph.slice(0, 4).forEach(t => add(t, t, true));
  return out;
}

/* ---- Liste déroulante (une seule pour toute l'appli) ---- */
const box = document.createElement('div');
box.className = 'acx'; box.setAttribute('role', 'listbox');
let cur = null, items = [], sel = -1, quiet = false;

function place(){
  if(!cur) return;
  const r = cur.getBoundingClientRect();
  box.style.left = r.left + 'px'; box.style.width = r.width + 'px';
  const below = innerHeight - r.bottom;
  if(below < 170 && r.top > below){ box.style.top = 'auto'; box.style.bottom = (innerHeight - r.top + 4) + 'px'; }
  else { box.style.bottom = 'auto'; box.style.top = (r.bottom + 4) + 'px'; }
}
function hide(){ box.classList.remove('on'); sel = -1; }
function mark(i){ [...box.children].forEach((c, j) => c.classList.toggle('sel', j === i)); sel = i; }
function pick(it){
  if(!cur) return;
  cur.value = it.value;
  quiet = true; cur.dispatchEvent(new Event('input', { bubbles: true })); quiet = false;   /* relance la recherche existante */
  hide(); cur.focus();
}
function show(inp){
  cur = inp; items = suggest(inp);
  if(!items.length){ hide(); return; }
  box.textContent = '';
  const q = inp.value.trim().split(/\s+/).pop().length;
  items.forEach((it, i) => {
    const d = document.createElement('div');
    d.className = 'acx-i' + (it.phrase ? ' ph' : ''); d.setAttribute('role', 'option');
    const at = it.phrase ? norm(it.label).indexOf(norm(inp.value.trim())) : 0, n = it.phrase ? inp.value.trim().length : q;
    if(at >= 0){
      d.append(it.label.slice(0, at));
      const b = document.createElement('b'); b.textContent = it.label.slice(at, at + n); d.append(b);
      d.append(it.label.slice(at + n));
    } else d.textContent = it.label;
    d.addEventListener('pointerdown', e => { e.preventDefault(); pick(it); });   /* garde le clavier ouvert */
    box.appendChild(d);
  });
  sel = -1; place(); box.classList.add('on');
}

function attach(inp){
  if(inp._acx) return; inp._acx = 1;
  inp.setAttribute('autocomplete', 'off'); inp.setAttribute('autocapitalize', 'off'); inp.setAttribute('spellcheck', 'false');
  inp.addEventListener('input', () => { if(!quiet) show(inp); });
  inp.addEventListener('focus', () => { if(inp.value.trim()) show(inp); });
  inp.addEventListener('blur', () => setTimeout(() => { if(cur === inp) hide(); }, 150));
  inp.addEventListener('keydown', e => {
    if(!box.classList.contains('on') || cur !== inp) return;
    if(e.key === 'ArrowDown'){ e.preventDefault(); mark((sel + 1) % items.length); }
    else if(e.key === 'ArrowUp'){ e.preventDefault(); mark((sel - 1 + items.length) % items.length); }
    else if(e.key === 'Enter' && sel >= 0){ e.preventDefault(); pick(items[sel]); }
    else if(e.key === 'Escape') hide();
  });
}
const SEL = 'input[type="search"],input[placeholder^="🔎"],input[id$="Search"],input[id$="SearchInput"]';
const scan = () => document.querySelectorAll(SEL).forEach(attach);

function init(){
  document.body.appendChild(box);
  scan();
  let t = null;
  new MutationObserver(() => { clearTimeout(t); t = setTimeout(scan, 300); }).observe(document.body, { childList: true, subtree: true });
  addEventListener('resize', place);
  addEventListener('scroll', () => { if(box.classList.contains('on')) place(); }, true);
}
if(document.body) init(); else document.addEventListener('DOMContentLoaded', init);
})();

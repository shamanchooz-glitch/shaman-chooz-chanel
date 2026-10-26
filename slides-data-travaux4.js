/* DIAPORAMAS LOT 4 — 190 vidéos générées par code (calcul, mesures, argent FCFA, tables), avec ta photo. À charger après slides-data-travaux3.js */
(function(){
if(!window.SCCS) return;
let cat = 'Maths pour tous', k = 0;
const P = ['bleu','vert','orange','violet','rouge','or','rose','turquoise','nuit','terre'];
const f = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g,' ');
const z = (v,s,j,m,o) => 1 + (((v+1) * (s*3 + j + 1) * ((o||0) + 7) + v*11 + s*5 + j*3) % m);   /* nombre « au hasard » mais toujours le même */
const D = (id, t, e, g) => SCCS.add(id, t, cat, P[(k++) % 10], [0,1,2,3].map(s => { const r = [0,1,2].map(j => g(s,j));
  return [e, 'Série '+(s+1), 'Calcule : ' + r.map(x=>x[0]).join(' · ') + '. Réponses : ' + r.map(x=>x[1]).join(' · ') + '.']; }), { photo:true });

/* 1. Calcul mental, niveaux 6 à 15 (40 vidéos) */
cat = 'Maths pour tous';
[['Additions','➕',(a,b)=>[a+' + '+b, a+b]],['Soustractions','➖',(a,b)=>[(a+b)+' − '+b, a]],['Multiplications','✖️',(a,b)=>[a+' × '+b, a*b]],['Divisions','➗',(a,b)=>[(a*b)+' ÷ '+b, a]]].forEach((o,oi) => {
  for(let L = 6; L <= 15; L++){ const m = (oi < 2 ? [200,300,500,700,1000,1500,2000,3000,5000,10000] : [16,18,20,25,30,35,40,50,60,99])[L-6];
    D('ty-calc'+oi+'-'+L, o[0]+' — niveau '+L, o[1], (s,j)=> o[2](z(L,s,j,m,oi), z(L,s,j+3,m,oi+2))); } });
/* 2. Suites de n en n (18) */
for(let n = 2; n <= 19; n++) D('ty-suite'+n, 'Suite de '+n+' en '+n, '📈', (s,j)=>{ const a = z(n,s,j,20); return [a+', '+(a+n)+', '+(a+2*n)+', ?', a+3*n]; });
/* 3. Ajouter et soustraire n (38) */
for(let n = 2; n <= 20; n++){
  D('ty-plus'+n, 'Ajouter '+n, '➕', (s,j)=>{ const a = z(n,s,j,100); return [a+' + '+n, a+n]; });
  D('ty-moins'+n, 'Retrancher '+n, '➖', (s,j)=>{ const a = n + z(n,s,j,100); return [a+' − '+n, a-n]; }); }
/* 4. Compléter à N (7), doubles et moitiés par niveau (12), multiplier par 10 (1) */
[10,20,50,100,200,500,1000].forEach(N => D('ty-comp'+N, 'Compléter à '+N, '🎯', (s,j)=>{ const a = z(N,s,j,N-1); return [a+' + ? = '+N, N-a]; }));
[20,50,100,500,1000,5000].forEach((M,i) => {
  D('ty-dbl'+i, 'Doubles jusqu\'à '+M, '2️⃣', (s,j)=>{ const x = z(M,s,j,M); return ['Le double de '+x, 2*x]; });
  D('ty-moit'+i, 'Moitiés jusqu\'à '+2*M, '½', (s,j)=>{ const x = 2*z(M,s,j,M); return ['La moitié de '+x, x/2]; }); });
D('ty-x10', 'Multiplier par 10', '🔟', (s,j)=>{ const x = z(10,s,j,99); return [x+' × 10', x*10]; });
D('ty-x100', 'Multiplier par 100', '💯', (s,j)=>{ const x = z(100,s,j,99); return [x+' × 100', f(x*100)]; });
/* 5. Tables de multiplication de 13 à 20 (8), carrés, cubes, racines, multiples (5) */
for(let n = 13; n <= 20; n++) SCCS.add('ty-table'+n, 'Table de multiplication de '+n, cat, P[(k++) % 10],
  [0,1,2,3].map(g => ['✖️','Table de '+n+' ('+(g*3+1)+' à '+(g*3+3)+')', [1,2,3].map(j => n+' × '+(g*3+j)+' = '+n*(g*3+j)).join(' · ')]), { photo:true });
D('ty-carres1', 'Les carrés de 1 à 12', '⬛', (s,j)=>{ const b = 1+(s*3+j)%12; return [b+'²', b*b]; });
D('ty-carres2', 'Les carrés de 13 à 25', '⬛', (s,j)=>{ const b = 13+(s*3+j)%13; return [b+'²', b*b]; });
D('ty-cubes', 'Les cubes de 1 à 10', '🧊', (s,j)=>{ const b = 1+(s*3+j)%10; return [b+'³', b*b*b]; });
D('ty-racines', 'Les racines carrées', '√', (s,j)=>{ const b = 2+(s*3+j)%14; return ['√'+(b*b), b]; });
[['Triple',3],['Quadruple',4],['Quintuple',5]].forEach(d => D('ty-'+d[0].toLowerCase(), 'Le '+d[0].toLowerCase()+' d\'un nombre', '🔢', (s,j)=>{ const x = z(d[1],s,j,50); return ['Le '+d[0].toLowerCase()+' de '+x, d[1]*x]; }));
/* 6. Aire et périmètre (6) */
[10,20,50].forEach(m => {
  D('ty-aire'+m, 'Aire du rectangle (≤ '+m+' m)', '▭', (s,j)=>{ const a = 1+z(m,s,j,m-1), b = 1+z(m,s,j+3,m-1); return ['Rectangle '+a+' m sur '+b+' m : aire en m²', a*b]; });
  D('ty-per'+m, 'Périmètre du carré (≤ '+m+' m)', '🔲', (s,j)=>{ const a = 1+z(m,s,j,m-1); return ['Carré de côté '+a+' m : périmètre en m', 4*a]; }); });

/* 7. Mesures : conversions d'unités (20) */
cat = 'Mesures';
[['km','m',1000],['m','cm',100],['kg','g',1000],['L','mL',1000],['h','min',60],['min','s',60],['jours','heures',24],['semaines','jours',7],['cm','mm',10],['t','kg',1000]].forEach((c,i) => {
  D('ty-cv'+i+'a', 'Convertir : '+c[0]+' en '+c[1], '📏', (s,j)=>{ const x = 1 + z(i,s,j,20); return [x+' '+c[0]+' = ? '+c[1], f(x*c[2])]; });
  D('ty-cv'+i+'b', 'Convertir : '+c[1]+' en '+c[0], '📏', (s,j)=>{ const x = 1 + z(i+5,s,j,20); return [f(x*c[2])+' '+c[1]+' = ? '+c[0], x]; }); });

/* 8. Argent et vie pratique en FCFA (32) */
cat = 'Argent et vie pratique';
[200,500,1000,2000,5000,10000].forEach((N,i) => [0,1].forEach(v => D('ty-mon'+N+'-'+v, 'Rendre la monnaie sur '+f(N)+' F'+(v ? ' (série 2)' : ''), '💵', (s,j)=>{ const p = 50 * z(i+v*6,s,j,N/50 - 1); return ['Achat de '+f(p)+' F, je donne '+f(N)+' F : monnaie', f(N-p)+' F']; })));
[5,10,15,20,25,30,40,50,75].forEach(r => D('ty-pc'+r, r+' % d\'un montant', '％', (s,j)=>{ const p = 40 * z(r,s,j,25); return [r+' % de '+f(p)+' F', f(p*r/100)+' F']; }));
[[5,10],[10,20],[12,30],[15,40],[20,50],[25,60]].forEach((c,i) => D('ty-prix'+i, 'Prix total des articles (niveau '+(i+1)+')', '🛍️', (s,j)=>{ const n = 1+z(i,s,j,c[0]), p = 25*z(i,s,j+4,c[1]); return [n+' articles à '+f(p)+' F', f(n*p)+' F']; }));
for(let n = 2; n <= 6; n++) D('ty-part'+n, 'Partager entre '+n+' personnes', '🤝', (s,j)=>{ const v = 100 * z(n,s,j,10); return [f(n*v)+' F partagés entre '+n+' personnes', f(v)+' F chacun']; });
})();

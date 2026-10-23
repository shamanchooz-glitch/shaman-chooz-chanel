/* LOT 10 — jeux générés par code (calcul mental par niveaux, argent, métiers). À charger APRÈS slides-data-metiers.js */
(function(){
'use strict';
if(!window.EDU) return;
const U = SCCG.util, ri = (a,b)=> a + U.rnd(b - a + 1), G = EDU.G;
const MA = 'Maths & logique', AR = 'Argent & vie pratique', ME = 'Métiers & carrière';
const NUM = (id,name,emo,cat,desc,gen,how)=> G(id,name,emo,cat,(id.length*47)%360,desc, EDU.gen(gen,{ mode:'numpad', how: how || 'Tape le résultat puis OK. 60 secondes, chaque erreur coûte du temps.' }));
const fmt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g,' ');

for(let n = 2; n <= 12; n++) NUM('e10div'+n,'Divisions par '+n,'➗',MA,'Divise par '+n+' le plus vite possible.',()=>{ const b = ri(2,12); return { q:(n*b)+' ÷ '+n+' = ?', a:b }; });
[20,30,40,50,60,70,80,90].forEach(t=> NUM('e10dz'+t,'Multiplier par '+t,'✖️',MA,'Multiplie par '+t+' sans te tromper.',()=>{ const b = ri(2,9); return { q:t+' × '+b+' = ?', a:t*b }; }));
[20,30,50,75,100,150,200,300,500,750,1000,2000,5000,10000].forEach(N=>{
  NUM('e10add'+N,'Additions jusqu\'à '+fmt(N),'➕',MA,'Additionne des nombres jusqu\'à '+fmt(N)+'.',()=>{ const a = ri(1,N-1), b = ri(1,N-a); return { q:a+' + '+b+' = ?', a:a+b }; });
  NUM('e10sou'+N,'Soustractions jusqu\'à '+fmt(N),'➖',MA,'Soustrais des nombres jusqu\'à '+fmt(N)+'.',()=>{ const a = ri(2,N), b = ri(1,a-1); return { q:a+' − '+b+' = ?', a:a-b }; });
});
[5,8,10,12,15].forEach(n=> NUM('e10car'+n,'Les carrés de 1 à '+n,'🔲',MA,'Calcule des carrés jusqu\'à '+n+'.',()=>{ const a = ri(2,n); return { q:a+'² = ?', a:a*a }; }));
[200,500,1000,2000,5000,10000].forEach(B=> NUM('e10mon'+B,'Monnaie sur '+fmt(B)+' FCFA','💵',AR,'Le client donne '+fmt(B)+' FCFA : rends-lui la monnaie.',()=>{ const p = ri(1,B/25-1)*25; return { q:'Achat de '+fmt(p)+' FCFA, payé avec '+fmt(B)+' FCFA. Monnaie ?', a:B-p }; },'Tape la monnaie à rendre en FCFA puis OK.'));
[2,3,4,5,6,7,8,9,10,12].forEach(k=> NUM('e10tot'+k,'Total de '+k+' articles','🛒',AR,'Calcule le prix de '+k+' articles identiques.',()=>{ const p = ri(2,40)*25; return { q:k+' articles à '+fmt(p)+' FCFA l\'un = ? FCFA', a:k*p }; },'Tape le total en FCFA puis OK.'));
[['moitié',2],['tiers',3],['quart',4],['cinquième',5],['sixième',6],['huitième',8],['dixième',10]].forEach(f=> NUM('e10fra'+f[1],'Le '+f[0]+' d\'un nombre','🍰',MA,'Calcule le '+f[0]+' de plusieurs nombres.',()=>{ const b = ri(2,20); return { q:'Le '+f[0]+' de '+(f[1]*b)+' = ?', a:b }; }));
[10,20,50,100,200,500,1000,10000].forEach(N=> NUM('e10cpl'+N,'Compléments à '+fmt(N),'🎯',MA,'Combien manque-t-il pour atteindre '+fmt(N)+' ?',()=>{ const a = ri(1,N/ (N>20?5:2) -1) * (N>=100?5:1); const x = Math.min(a,N-1); return { q:'Pour aller de '+x+' à '+fmt(N)+', il manque ?', a:N-x }; }));
[10,100,1000].forEach(m=> NUM('e10x'+m,'Multiplier par '+fmt(m),'🔟',MA,'Multiplie par '+fmt(m)+' sans calculatrice.',()=>{ const a = ri(2,99); return { q:a+' × '+fmt(m)+' = ?', a:a*m }; }));
[10,25,50,100,250,500,1000].forEach(N=>{
  NUM('e10dbl'+N,'Doubles jusqu\'à '+fmt(N),'2️⃣',MA,'Calcule le double de nombres jusqu\'à '+fmt(N)+'.',()=>{ const a = ri(1,N); return { q:'Le double de '+a+' = ?', a:2*a }; });
  NUM('e10moi'+N,'Moitiés jusqu\'à '+fmt(N),'½',MA,'Calcule la moitié de nombres pairs jusqu\'à '+fmt(N*2)+'.',()=>{ const a = ri(1,N); return { q:'La moitié de '+(2*a)+' = ?', a:a }; });
});

/* ---- Métiers : Devine le métier (QCM) et Vrai/faux, par groupes de 7 ---- */
const MT = window.SCC_METIERS || [], pick = (k,j)=> MT[(k + j) % MT.length];
for(let g = 0; g < Math.floor(MT.length / 7); g++){
  const grp = MT.slice(g*7, g*7 + 7);
  G('e10met'+(g+1),'Devine le métier '+(g+1),'🧰',ME,(g*83)%360,'Quel métier correspond aux missions décrites ?', EDU.quiz(grp.map((m,i)=>{
    const wrong = [3,7,11].map(d=> pick(g*7 + i, d).nom).filter(x=> x !== m.nom);
    return ['Quel métier consiste à '+m.T[0]+', '+m.T[1]+' et '+m.T[2]+' ?', m.nom].concat(wrong.slice(0,3), ['~'+m.C]);
  })));
  const tf = []; grp.forEach((m,i)=>{ const o = pick(g*7 + i, 5);
    tf.push([m.nom+' : '+m.T[1]+'.', true, 'C\'est une mission courante de ce métier.']);
    if(o.nom !== m.nom) tf.push([m.nom+' : '+o.T[0]+'.', false, 'Cette mission relève plutôt du métier de '+o.nom.toLowerCase()+'.']); });
  G('e10vf'+(g+1),'Vrai ou faux : métiers '+(g+1),'✅',ME,(g*83+40)%360,'Cette mission appartient-elle bien à ce métier ?', EDU.tf(tf));
}
})();

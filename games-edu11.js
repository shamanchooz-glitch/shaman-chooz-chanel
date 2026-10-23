/* LOT 11 — 76 jeux générés par code. À charger APRÈS games-edu10.js et slides-data-metiers3.js */
(function(){
'use strict';
if(!window.EDU) return;
const U = SCCG.util, ri = (a,b)=> a + U.rnd(b - a + 1), G = EDU.G;
const MA = 'Maths & logique', AR = 'Argent & vie pratique', ME = 'Métiers & carrière';
const fmt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g,' ');
const NUM = (id,name,emo,cat,desc,gen,how)=> G(id,name,emo,cat,(id.length*53+id.charCodeAt(id.length-1))%360,desc, EDU.gen(gen,{ mode:'numpad', how: how || 'Tape le résultat puis OK. 60 secondes, chaque erreur coûte du temps.' }));

for(let n = 13; n <= 20; n++) NUM('e11tab'+n,'Table de '+n,'✖️',MA,'Apprends la table de '+n+'.',()=>{ const b = ri(2,12); return { q:n+' × '+b+' = ?', a:n*b }; });
[5,10,15,20,25,30,40,50].forEach(r=> NUM('e11rem'+r,'Remise de '+r+' %','🏷️',AR,'Calcule le montant d\'une remise de '+r+' %.',()=>{ const p = ri(1,40)*100; return { q:r+' % de remise sur '+fmt(p)+' FCFA = ? FCFA', a:p*r/100 }; },'Tape le montant de la remise en FCFA puis OK.'));
[['km','m',1000],['m','cm',100],['kg','g',1000],['L','mL',1000],['h','min',60],['min','s',60],['jours','heures',24],['semaines','jours',7],['cm','mm',10],['m','mm',1000]].forEach((c,i)=> NUM('e11cv'+i,'Convertir : '+c[0]+' → '+c[1],'📏',MA,'Convertis des '+c[0]+' en '+c[1]+'.',()=>{ const a = ri(2,25); return { q:a+' '+c[0]+' = ? '+c[1], a:a*c[2] }; }));
[5,10,12,20].forEach(n=>{
  NUM('e11air'+n,'Aire du rectangle (≤ '+n+')','▭',MA,'Aire = longueur × largeur.',()=>{ const a = ri(2,n), b = ri(2,n); return { q:'Rectangle de '+a+' m sur '+b+' m : aire en m² ?', a:a*b }; });
  NUM('e11per'+n,'Périmètre du rectangle (≤ '+n+')','🔲',MA,'Périmètre = 2 × (longueur + largeur).',()=>{ const a = ri(2,n), b = ri(2,n); return { q:'Rectangle de '+a+' m sur '+b+' m : périmètre en m ?', a:2*(a+b) }; });
});
[5,10,15].forEach(n=> NUM('e11car'+n,'Aire du carré (≤ '+n+')','⬜',MA,'Aire du carré = côté × côté.',()=>{ const a = ri(2,n); return { q:'Carré de côté '+a+' m : aire en m² ?', a:a*a }; }));
[500,1000,2000,5000,10000].forEach(B=> NUM('e11bil'+B,'Billets de '+fmt(B)+' FCFA','💴',AR,'Combien de billets de '+fmt(B)+' FCFA ?',()=>{ const k = ri(2,20); return { q:fmt(k*B)+' FCFA = combien de billets de '+fmt(B)+' FCFA ?', a:k }; },'Tape le nombre de billets puis OK.'));
[2,3,4,5,6,10].forEach(k=> NUM('e11pu'+k,'Prix d\'un article (lot de '+k+')','🧮',AR,'Retrouve le prix d\'un seul article.',()=>{ const p = ri(2,40)*25; return { q:k+' articles coûtent '+fmt(k*p)+' FCFA. Prix d\'un article ?', a:p }; },'Tape le prix d\'un article en FCFA puis OK.'));
[2,3,4,5,6,7,8,9,10,11,12,15,20,25,50].forEach(n=> NUM('e11sui'+n,'Suites de '+n+' en '+n,'🔢',MA,'Trouve le nombre suivant de la suite.',()=>{ const a = ri(1,20); return { q:a+' , '+(a+n)+' , '+(a+2*n)+' , ?', a:a+3*n }; },'Tape le nombre suivant puis OK.'));
[10,25,50,100,250,500].forEach(N=> NUM('e11tri'+N,'Triples jusqu\'à '+fmt(N),'3️⃣',MA,'Calcule le triple de nombres jusqu\'à '+fmt(N)+'.',()=>{ const a = ri(1,N); return { q:'Le triple de '+a+' = ?', a:3*a }; }));
[['dizaine',10],['centaine',100],['millier',1000]].forEach(r=> NUM('e11arr'+r[1],'Arrondir à la '+r[0],'🎯',MA,'Arrondis à la '+r[0]+' la plus proche.',()=>{ let x; do{ x = ri(r[1]+1, r[1]*30); }while(x % r[1] === r[1]/2); return { q:'Arrondis '+fmt(x)+' à la '+r[0]+' près', a:Math.round(x/r[1])*r[1] }; }));

/* ---- Métiers 29 à 44 : Devine le métier + Vrai ou faux ---- */
const MT = window.SCC_METIERS || [];
[28,36].forEach((s,g)=>{
  const grp = MT.slice(s, s + 8); if(grp.length < 4) return;
  G('e11met'+(g+1),'Devine le métier '+(g+5),'🧰',ME,(g*97+200)%360,'Quel métier correspond aux missions décrites ?', EDU.quiz(grp.map((m,i)=>{
    const w = [3,7,11].map(d=> MT[(s + i + d) % MT.length].nom).filter(x=> x !== m.nom);
    return ['Quel métier consiste à '+m.T[0]+', '+m.T[1]+' et '+m.T[2]+' ?', m.nom].concat(w.slice(0,3), ['~'+m.C]);
  })));
  const tf = []; grp.forEach((m,i)=>{ const o = MT[(s + i + 5) % MT.length];
    tf.push([m.nom+' : '+m.T[1]+'.', true, 'C\'est une mission courante de ce métier.']);
    if(o.nom !== m.nom) tf.push([m.nom+' : '+o.T[0]+'.', false, 'Cette mission relève plutôt du métier de '+o.nom.toLowerCase()+'.']); });
  G('e11vf'+(g+1),'Vrai ou faux : métiers '+(g+5),'✅',ME,(g*97+240)%360,'Cette mission appartient-elle bien à ce métier ?', EDU.tf(tf));
});
})();

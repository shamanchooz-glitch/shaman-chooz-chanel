/* LOT 12 — jeux éducatifs générés par code. À charger APRÈS games-edu11.js (déjà prévu dans index.html). */
(function(){
'use strict';
if(!window.EDU) return;
const U = SCCG.util, ri = (a,b)=> a + U.rnd(b - a + 1), G = EDU.G;
const MA = 'Maths & logique', GE = 'Géographie', LM = 'Langue & mots', AR = 'Argent & vie pratique', SN = 'Santé & nature';
const H = id => (id.length * 53 + id.charCodeAt(id.length - 1) * 7) % 360;
const mix = a => a.slice().sort(()=> Math.random() - .5);
const NUM = (id,name,emo,cat,desc,gen,how)=> G(id,name,emo,cat,H(id),desc, EDU.gen(gen,{ mode:'numpad', how: how || 'Tape le résultat puis OK. 60 secondes, chaque erreur coûte du temps.' }));

/* ---------- Calcul (numpad) ---------- */
for(let n = 2; n <= 12; n++){
  NUM('e12div'+n,'Divisions par '+n,'➗',MA,'Divise par '+n+'.',()=>{ const b = ri(2,12); return { q:(n*b)+' ÷ '+n+' = ?', a:b }; });
  NUM('e12tr'+n,'Table de '+n+' à trous','❓',MA,'Trouve le nombre manquant.',()=>{ const b = ri(2,12); return { q:n+' × ? = '+(n*b), a:b }; });
}
[10,20,50,100,1000].forEach(N=> NUM('e12cp'+N,'Complète à '+N,'🎯',MA,'Quel nombre manque pour arriver à '+N+' ?',()=>{ const a = ri(1,N-1); return { q:a+' + ? = '+N, a:N-a }; }));
[10,100,1000].forEach(m=>{
  NUM('e12ad'+m,'Additions jusqu\'à '+m,'➕',MA,'Additionne vite.',()=>{ const a = ri(1,m), b = ri(1,m); return { q:a+' + '+b+' = ?', a:a+b }; });
  NUM('e12su'+m,'Soustractions jusqu\'à '+m,'➖',MA,'Soustrais vite.',()=>{ const a = ri(2,m), b = ri(1,a); return { q:a+' − '+b+' = ?', a:a-b }; });
  NUM('e12x'+m,'Multiplier par '+m,'✖️',MA,'Multiplie par '+m+'.',()=>{ const a = ri(2,99); return { q:a+' × '+m+' = ?', a:a*m }; });
});
[['Double',2],['Triple',3],['Quadruple',4],['Quintuple',5]].forEach(d=> NUM('e12m'+d[1],d[0]+' d\'un nombre','🔢',MA,'Calcule le '+d[0].toLowerCase()+'.',()=>{ const x = ri(2,60); return { q:'Le '+d[0].toLowerCase()+' de '+x+' = ?', a:x*d[1] }; }));
NUM('e12moit','Moitié d\'un nombre','½',MA,'Trouve la moitié.',()=>{ const x = 2 * ri(1,200); return { q:'La moitié de '+x+' = ?', a:x/2 }; });
NUM('e12carre','Les carrés','⬛',MA,'Calcule le carré.',()=>{ const b = ri(2,15); return { q:b+'² = ?', a:b*b }; });
[500,1000,2000,5000].forEach(N=> NUM('e12mon'+N,'Rendre la monnaie sur '+N+' F','💵',AR,'Calcule la monnaie à rendre.',()=>{ const p = ri(1,N/50 - 1) * 50; return { q:'Achat de '+p+' F, le client donne '+N+' F. Monnaie = ? F', a:N-p }; },'Tape la monnaie en FCFA puis OK.'));
for(let n = 2; n <= 9; n++) NUM('e12su'+'ite'+n,'Suite de '+n+' en '+n,'📈',MA,'Trouve le nombre suivant de la suite.',()=>{ const a = ri(1,20); return { q:a+', '+(a+n)+', '+(a+2*n)+', '+(a+3*n)+', ?', a:a+4*n }; });

/* ---------- Capitales (4 groupes × 3 jeux) ---------- */
const CAP = {
 'Afrique de l\'Ouest':[['Côte d\'Ivoire','Yamoussoukro'],['Sénégal','Dakar'],['Mali','Bamako'],['Ghana','Accra'],['Togo','Lomé'],['Bénin','Porto-Novo'],['Burkina Faso','Ouagadougou'],['Niger','Niamey'],['Guinée','Conakry']],
 'Afrique (autres régions)':[['Cameroun','Yaoundé'],['Gabon','Libreville'],['Tchad','N\'Djamena'],['Kenya','Nairobi'],['Éthiopie','Addis-Abeba'],['Égypte','Le Caire'],['Maroc','Rabat'],['Nigeria','Abuja'],['Angola','Luanda'],['Algérie','Alger']],
 'Europe':[['France','Paris'],['Italie','Rome'],['Espagne','Madrid'],['Allemagne','Berlin'],['Portugal','Lisbonne'],['Belgique','Bruxelles'],['Royaume-Uni','Londres'],['Suisse','Berne']],
 'Monde':[['Japon','Tokyo'],['Chine','Pékin'],['Inde','New Delhi'],['Brésil','Brasília'],['Canada','Ottawa'],['États-Unis','Washington'],['Argentine','Buenos Aires'],['Mexique','Mexico']]
};
Object.keys(CAP).forEach((k,i)=>{
  const L = CAP[k], mk = rev => L.map(p=>{ const w = mix(L.filter(x=> x[0] !== p[0])).slice(0,3).map(x=> rev ? x[0] : x[1]);
    return [rev ? p[1]+' est la capitale de quel pays ?' : 'Quelle est la capitale de : '+p[0]+' ?', rev ? p[0] : p[1]].concat(w); });
  G('e12cap'+i,'Capitales : '+k,'🏛️',GE,H('cap'+i),'Retrouve la capitale de chaque pays.', EDU.quiz(mk(false)));
  G('e12pays'+i,'Quel pays ? '+k,'🗺️',GE,H('pays'+i),'Retrouve le pays de chaque capitale.', EDU.quiz(mk(true)));
  G('e12cpa'+i,'Associer pays et capitales : '+k,'🔗',GE,H('cpa'+i),'Associe chaque pays à sa capitale.', EDU.pairs(L));
});

/* ---------- Langue : contraires ---------- */
const CT = [['grand','petit'],['chaud','froid'],['jour','nuit'],['monter','descendre'],['riche','pauvre'],['ouvrir','fermer'],['plein','vide'],['lourd','léger'],['rapide','lent'],['propre','sale'],['commencer','finir'],['facile','difficile']];
G('e12ctq','Les contraires (quiz)','↔️',LM,40,'Trouve le contraire de chaque mot.', EDU.quiz(CT.map(c=> ['Quel est le contraire de « '+c[0]+' » ?', c[1]].concat(mix(CT.filter(x=> x !== c)).slice(0,3).map(x=> x[1]))))); 
G('e12ctp','Associer les contraires','🔗',LM,80,'Associe chaque mot à son contraire.', EDU.pairs(CT));
G('e12cts','Contraires mélangés','🔀',LM,120,'Remets les lettres du contraire dans l\'ordre.', EDU.scramble(CT.map(c=> [c[1].toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''), 'Contraire de « '+c[0]+' »'])));

/* ---------- Nounous, ménage, enfants ---------- */
G('e12vfm','Ménage : vrai ou faux','🧹',AR,200,'Les bons gestes pour entretenir la maison.', EDU.tf([
 ['On commence le ménage d\'une pièce par le sol.',false,'On commence par le haut : la poussière tombe vers le bas, le sol se fait en dernier.'],
 ['On peut mélanger la javel avec d\'autres produits.',false,'C\'est dangereux : le mélange dégage un gaz toxique.'],
 ['Il faut changer souvent l\'éponge de cuisine.',true,'Une éponge sale est pleine de microbes.'],
 ['Les produits ménagers se rangent à portée des enfants.',false,'Ils se rangent en hauteur, bien fermés.'],
 ['On trie le linge blanc et le linge de couleur.',true,'Cela évite que les couleurs déteignent.'],
 ['On vide la poubelle de la cuisine chaque jour.',true,'Cela évite les odeurs, les mouches et les cafards.']]));
G('e12vfe','Sécurité des enfants : vrai ou faux','🧒',SN,160,'Ce qu\'une nounou doit savoir pour protéger un enfant.', EDU.tf([
 ['On peut laisser un bébé seul dans le bain quelques secondes.',false,'Jamais, même une seconde.'],
 ['L\'eau du bain de bébé doit être tiède, autour de 37 °C.',true,'On la teste avec le coude ou un thermomètre.'],
 ['Les queues de casseroles se tournent vers l\'extérieur.',false,'On les tourne vers l\'intérieur pour qu\'un enfant ne les attrape pas.'],
 ['On jette le lait que bébé n\'a pas fini.',true,'Le reste du biberon ne se garde pas.'],
 ['On se lave les mains avant de préparer un biberon.',true,'C\'est la première règle d\'hygiène.'],
 ['Les médicaments peuvent rester sur la table.',false,'Ils se rangent en hauteur, hors de portée.']]));
G('e12ordm','Ordre du ménage','🧽',AR,30,'Classe les étapes dans le bon ordre.', EDU.order([
 { q:'Nettoyer une pièce, dans l\'ordre :', items:['Enlever les toiles d\'araignée','Épousseter les meubles','Balayer','Laver le sol'] },
 { q:'Faire sa lessive, dans l\'ordre :', items:['Trier le linge','Laver','Rincer','Étendre'] },
 { q:'Laver la vaisselle, dans l\'ordre :', items:['Enlever les restes','Laver les verres','Laver les assiettes','Laver les casseroles'] }]));
G('e12ordb','Ordre : le bain de bébé','🛁',SN,200,'Classe les gestes du bain dans le bon ordre.', EDU.order([
 { q:'Le bain de bébé, dans l\'ordre :', items:['Préparer serviette et vêtements','Tester l\'eau','Laver doucement','Sécher et habiller'] },
 { q:'Préparer un biberon, dans l\'ordre :', items:['Se laver les mains','Mettre l\'eau tiédie','Ajouter la poudre de lait','Vérifier la chaleur sur le poignet'] }]));
})();

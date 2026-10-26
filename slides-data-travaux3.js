/* DIAPORAMAS LOT 3 — tables, capitales, calcul mental, mesures, recettes (avec ta photo). À charger après slides-data-travaux2.js */
(function(){
if(!window.SCCS) return;
let cat = 'Maths pour tous', k = 0;
const C = c => { cat = c; };
const P = ['bleu','vert','orange','violet','rouge','or','rose','turquoise','nuit','terre'];
const S = (id, t, pal, sl) => SCCS.add(id, t, cat, pal || P[(k++) % 10], sl, { photo:true });
const R = (id, t, pal, a) => S(id, t, pal, [['🛒','Les ingrédients',a[0]],['🔪','Préparer',a[1]],['🔥','Cuisson',a[2]],['🍽️','Servir',a[3]]]);

/* Tables de multiplication de 2 à 12 */
for(let n = 2; n <= 12; n++) S('tx-table'+n, 'Table de multiplication de '+n, null,
  [0,1,2,3].map(g => ['✖️','Table de '+n+' ('+(g*3+1)+' à '+(g*3+3)+')', [1,2,3].map(j => n+' × '+(g*3+j)+' = '+n*(g*3+j)).join(' · ')]));

/* Calcul mental : 4 opérations × 5 niveaux, série d'exercices avec réponses */
const OP = [
  ['Additions','➕',(a,b)=>[a+' + '+b, a+b], [10,20,50,100,500]],
  ['Soustractions','➖',(a,b)=>[(a+b)+' − '+b, a], [10,20,50,100,500]],
  ['Multiplications','✖️',(a,b)=>[a+' × '+b, a*b], [5,8,10,12,15]],
  ['Divisions','➗',(a,b)=>[(a*b)+' ÷ '+b, a], [5,8,10,12,15]]];
OP.forEach((o,oi) => [1,2,3,4,5].forEach(L => {
  const m = o[3][L-1];
  S('tx-calc'+oi+'-'+L, o[0]+' — niveau '+L, null, [0,1,2,3].map(s => {
    const r = [0,1,2].map(j => o[2](1 + (L*13 + s*7 + j*5 + 3) % m, 1 + (L*11 + s*3 + j*7 + 5) % m));
    return [o[1], 'Série '+(s+1), 'Calcule dans ta tête : ' + r.map(x=>x[0]).join(' · ') + '. Réponses : ' + r.map(x=>x[1]).join(' · ') + '.'];
  }));
}));

/* Capitales : 8 vidéos de 4 questions */
C('Jeux-quiz');
const CAP = 'Côte d\'Ivoire:Yamoussoukro,Sénégal:Dakar,Mali:Bamako,Ghana:Accra,Togo:Lomé,Bénin:Porto-Novo,Burkina Faso:Ouagadougou,Niger:Niamey,Guinée:Conakry,Cameroun:Yaoundé,Gabon:Libreville,Tchad:N\'Djamena,Kenya:Nairobi,Éthiopie:Addis-Abeba,Égypte:Le Caire,Maroc:Rabat,Nigeria:Abuja,Angola:Luanda,Algérie:Alger,France:Paris,Italie:Rome,Espagne:Madrid,Allemagne:Berlin,Portugal:Lisbonne,Belgique:Bruxelles,Royaume-Uni:Londres,Suisse:Berne,Japon:Tokyo,Chine:Pékin,Inde:New Delhi,Brésil:Brasília,Canada:Ottawa'.split(',').map(x=>x.split(':'));
for(let i = 0; i < 8; i++) S('tx-cap'+(i+1), 'Quiz des capitales '+(i+1), null,
  CAP.slice(i*4, i*4+4).map((p,j) => ['🏛️','Question '+(j+1),'Quelle est la capitale de : '+p[0]+' ? Réponse : '+p[1]+'.']));

C('Culture générale');
const CT = [['grand','petit'],['chaud','froid'],['jour','nuit'],['monter','descendre'],['riche','pauvre'],['ouvrir','fermer'],['plein','vide'],['lourd','léger'],['rapide','lent'],['propre','sale'],['commencer','finir'],['facile','difficile']];
S('tx-contraires','Les contraires', null, [0,1,2,3].map(s => ['↔️','Contraires '+(s+1), CT.slice(s*3, s*3+3).map(c => c[0]+' ↔ '+c[1]).join(' · ')]));
S('tx-longueur','Les mesures de longueur','bleu',[['📏','Les unités','Le kilomètre (km), le mètre (m), le centimètre (cm) et le millimètre (mm).'],['🔁','Les liens','1 km = 1 000 m ; 1 m = 100 cm ; 1 cm = 10 mm.'],['🚶','Exemples','Une porte mesure environ 2 m. Un stylo mesure environ 15 cm.'],['🧮','Un petit calcul','3 km = 3 000 m. 2 m = 200 cm.']]);
S('tx-masse','Les mesures de poids','orange',[['⚖️','Les unités','La tonne (t), le kilogramme (kg) et le gramme (g).'],['🔁','Les liens','1 t = 1 000 kg ; 1 kg = 1 000 g.'],['🍚','Exemples','Un sac de riz pèse souvent 5 kg, 25 kg ou 50 kg. Un œuf pèse environ 60 g.'],['🧮','Un petit calcul','2 kg = 2 000 g. 3 000 kg = 3 t.']]);
S('tx-capacite','Les mesures de capacité','turquoise',[['🥛','Les unités','Le litre (L), le décilitre (dL), le centilitre (cL) et le millilitre (mL).'],['🔁','Les liens','1 L = 10 dL = 100 cL = 1 000 mL.'],['🍼','Exemples','Un biberon contient environ 250 mL. Une bouteille d\'eau fait souvent 1,5 L.'],['🧮','Un petit calcul','2 L = 2 000 mL. 500 mL = la moitié d\'un litre.']]);
S('tx-temps','Les mesures du temps','violet',[['⏰','Les unités','La seconde, la minute, l\'heure, le jour, la semaine, le mois et l\'année.'],['🔁','Les liens','1 minute = 60 secondes ; 1 heure = 60 minutes ; 1 jour = 24 heures.'],['📅','Le calendrier','1 semaine = 7 jours ; 1 année = 12 mois, soit 365 jours (366 les années bissextiles).'],['🧮','Un petit calcul','2 heures = 120 minutes. 3 semaines = 21 jours.']]);

C('Recettes simples');
R('tx-r-fruits','Salade de fruits','rose',['Banane, orange, mangue, papaye, un peu de sucre et de citron.','Lave les fruits, épluche-les et coupe-les en petits morceaux.','Pas de cuisson : mélange les fruits avec le jus de citron et un peu de sucre.','Laisse 30 minutes au frais et sers bien froid.']);
R('tx-r-soupe','Soupe de légumes','vert',['Carottes, pommes de terre, oignon, poireau, huile, sel, eau.','Épluche et coupe tous les légumes en petits dés.','Fais revenir l\'oignon, ajoute les légumes et l\'eau, puis cuis 30 minutes à feu doux.','Mixe ou écrase un peu, goûte et sers bien chaud.']);
R('tx-r-rizgras','Riz au gras simple','rouge',['Riz, oignon, concentré de tomate, huile, cube, sel, eau.','Lave le riz. Hache l\'oignon.','Fais revenir l\'oignon et le concentré dans l\'huile, ajoute l\'eau et le cube, puis le riz. Cuis à feu doux 20 minutes.','Remue doucement et sers chaud avec du poulet ou du poisson.']);
R('tx-r-pain','Pain perdu','or',['Pain rassis, 2 œufs, 1/2 litre de lait, sucre, un peu d\'huile.','Coupe le pain en tranches. Bats les œufs avec le lait et le sucre.','Trempe chaque tranche et fais-la dorer 2 minutes de chaque côté dans la poêle huilée.','Sers chaud avec du sucre ou du miel.']);
R('tx-r-igname','Igname frite','orange',['Igname, huile, sel.','Épluche l\'igname, lave-la et coupe-la en bâtonnets.','Fais frire dans l\'huile chaude 8 à 10 minutes, jusqu\'à ce qu\'elle soit dorée.','Égoutte, sale et sers avec une sauce pimentée.']);
R('tx-r-oeufs','Œufs durs parfaits','terre',['Des œufs et de l\'eau froide.','Mets les œufs dans une casserole et couvre-les d\'eau froide.','Porte à ébullition, puis compte 10 minutes de cuisson.','Passe-les sous l\'eau froide, écale et sers avec du sel ou en salade.']);
})();

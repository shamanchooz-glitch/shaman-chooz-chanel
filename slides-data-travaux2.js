/* DIAPORAMAS LOT 2 — quiz, recettes, astuces, histoires (avec ta photo). Modifie les textes librement. */
(function(){
if(!window.SCCS) return;
let cat = 'Jeux-quiz';
const C = c => { cat = c; };
const S = (id, t, pal, sl) => SCCS.add(id, t, cat, pal, sl, { photo:true });
/* Quiz : une diapositive pour la question, puis une pour la réponse (le spectateur a le temps de réfléchir) */
const Q = (id, t, pal, e, qs) => S(id, t, pal, [].concat(...qs.map((q,i) => [[e, 'Question ' + (i+1), q[0]], ['✅', 'Réponse ' + (i+1), q[1]]])));
const R = (id, t, pal, a) => S(id, t, pal, [['🛒','Les ingrédients',a[0]],['🔪','Préparer',a[1]],['🔥','Cuisson',a[2]],['🍽️','Servir',a[3]]]);

C('Jeux-quiz');
Q('tw-q-afrique','Quiz géographie de l\'Afrique','vert','🌍',[
 ['Quelle est la capitale du Sénégal ?','Dakar.'],['Quelle est la capitale du Ghana ?','Accra.'],
 ['Quel fleuve traverse l\'Égypte ?','Le Nil.'],['Quel est le plus grand pays d\'Afrique par sa superficie ?','L\'Algérie.']]);
Q('tw-q-ci2','Quiz Côte d\'Ivoire (2)','orange','🇨🇮',[
 ['Quel pays est à l\'est de la Côte d\'Ivoire ?','Le Ghana.'],['Quel océan borde le sud du pays ?','L\'océan Atlantique.'],
 ['Quelle est la langue officielle ?','Le français.'],['Qui fut le premier président du pays ?','Félix Houphouët-Boigny.']]);
Q('tw-q-planetes','Quiz des planètes (enfants)','nuit','🪐',[
 ['Quelle planète est la plus proche du Soleil ?','Mercure.'],['Combien de planètes dans le système solaire ?','Huit.'],
 ['Quelle planète est appelée la planète rouge ?','Mars.'],['Quel gaz respirons-nous pour vivre ?','L\'oxygène.']]);
Q('tw-q-tables','Quiz tables de multiplication','bleu','✖️',[
 ['Combien font 9 × 6 ?','54.'],['Combien font 8 × 7 ?','56.'],['Combien font 144 ÷ 12 ?','12.'],['Quelle est la moitié de 90 ?','45.']]);
Q('tw-q-formes','Quiz formes et couleurs (enfants)','rose','🔷',[
 ['Combien de côtés a un triangle ?','Trois.'],['Combien de côtés a un carré ?','Quatre.'],
 ['Combien de côtés a un hexagone ?','Six.'],['Combien de couleurs a l\'arc-en-ciel ?','Sept.']]);
Q('tw-q-sante','Quiz santé et corps','rose','🩺',[
 ['Quelle vitamine le soleil nous aide-t-il à fabriquer ?','La vitamine D.'],['Combien de dents a un adulte ?','32.'],
 ['Quel organe filtre le sang ?','Les reins.'],['Combien de secondes faut-il pour bien se laver les mains ?','Au moins 20 secondes.']]);
Q('tw-q-histoire','Quiz d\'histoire','terre','📜',[
 ['Qui a marché le premier sur la Lune ?','Neil Armstrong, en 1969.'],['En quelle année s\'est terminée la Seconde Guerre mondiale ?','1945.'],
 ['Qui fut libéré en 1990 après 27 ans de prison en Afrique du Sud ?','Nelson Mandela.'],['Quel pays a offert la statue de la Liberté aux États-Unis ?','La France.']]);
Q('tw-q-animaux2','Quiz des animaux (2)','orange','🦁',[
 ['Quel mammifère peut voler ?','La chauve-souris.'],['Combien de cœurs a une pieuvre ?','Trois.'],
 ['Quel oiseau géant ne vole pas et vit en Afrique ?','L\'autruche.'],['Quel animal est surnommé le roi de la savane ?','Le lion.']]);
Q('tw-q-fruits','Quiz fruits et légumes','vert','🍎',[
 ['Quel fruit est jaune et courbé ?','La banane.'],['Quel légume fait pleurer quand on le coupe ?','L\'oignon.'],
 ['Botaniquement, la tomate est un fruit ou un légume ?','Un fruit.'],['Quel arbre donne l\'huile de palme ?','Le palmier à huile.']]);
Q('tw-q-menage','Quiz hygiène et ménage','turquoise','🧽',[
 ['Quelle température pour le bain d\'un bébé ?','Environ 37 °C.'],['Peut-on mélanger la javel avec d\'autres produits ?','Non, jamais : c\'est dangereux.'],
 ['Par où commence-t-on le ménage d\'une pièce ?','Par le haut, le sol en dernier.'],['Où range-t-on les produits ménagers ?','Hors de portée des enfants.']]);
Q('tw-q-culture','Quiz culture pour grandes personnes','nuit','🎓',[
 ['Qui a peint la Joconde ?','Léonard de Vinci.'],['Quelle est la plus haute montagne du monde ?','L\'Everest.'],
 ['Quelle est la capitale du Brésil ?','Brasília.'],['Combien de joueurs par équipe sur le terrain au football ?','Onze.']]);
Q('tw-q-sport','Quiz sport','or','⚽',[
 ['Quel pays a gagné la Coupe du monde 2022 ?','L\'Argentine.'],['Quel pays a remporté la CAN jouée en 2024 ?','La Côte d\'Ivoire.'],
 ['Combien de minutes dure un match de football ?','90 minutes.'],['Combien de points vaut un panier à trois points au basket ?','Trois.']]);
Q('tw-q-langue','Quiz de français','violet','🔤',[
 ['Quel est le contraire de « grand » ?','Petit.'],['Quel est le pluriel de « cheval » ?','Chevaux.'],
 ['Quel est le féminin de « acteur » ?','Actrice.'],['Combien de lettres compte l\'alphabet ?','26.']]);
Q('tw-q-argent','Quiz petits calculs d\'argent','or','💰',[
 ['Que veut dire FCFA ?','Franc de la Communauté Financière Africaine.'],['Combien font 10 % de 5 000 F ?','500 F.'],
 ['Quelle est la moitié de 12 000 F ?','6 000 F.'],['Quelle bonne habitude aide à économiser ?','Mettre un peu de côté dès qu\'on est payé.']]);

C('Recettes simples');
R('tw-r-spaghetti','Spaghettis à la sauce tomate','rouge',['Spaghettis, tomates ou concentré, oignon, ail, huile, sel.','Hache l\'oignon et l\'ail, écrase les tomates.','Cuis les pâtes 10 minutes dans l\'eau salée. Fais revenir oignon et ail, ajoute la tomate, mijote 15 minutes.','Égoutte les pâtes, mélange à la sauce et sers chaud.']);
R('tw-r-puree','Purée de pommes de terre','or',['Pommes de terre, lait, beurre ou huile, sel.','Épluche et coupe en morceaux.','Cuis dans l\'eau salée 20 minutes, jusqu\'à ce qu\'elles soient tendres, puis égoutte.','Écrase avec un peu de lait chaud et de beurre. Sers avec du poisson ou du poulet.']);
R('tw-r-salade','Salade de tomates et concombre','vert',['Tomates, concombre, oignon, huile, citron, sel.','Lave bien les légumes et coupe-les en rondelles.','Pas de cuisson : prépare juste la sauce avec huile, citron et sel.','Mélange et sers frais, tout de suite.']);
R('tw-r-gateau','Gâteau au yaourt facile','rose',['1 yaourt, 3 pots de farine, 2 pots de sucre, 3 œufs, 1/2 pot d\'huile, 1 sachet de levure.','Mélange yaourt, sucre et œufs, puis ajoute l\'huile, la farine et la levure.','Verse dans un moule huilé et cuis 35 minutes à four moyen (180 °C).','Laisse tiédir, démoule et coupe en parts.']);
R('tw-r-crepes','Crêpes simples','orange',['250 g de farine, 3 œufs, 1/2 litre de lait, une pincée de sel, un peu d\'huile.','Mélange farine, œufs et sel, ajoute le lait petit à petit pour éviter les grumeaux.','Verse une louche de pâte dans la poêle huilée, 1 minute de chaque côté.','Sers avec du sucre, du miel ou de la confiture.']);
R('tw-r-niebe','Haricots niébé en sauce','terre',['Haricots niébé, oignon, tomate, huile, sel, piment.','Trempe les haricots 2 heures et rince-les.','Fais-les cuire 45 minutes à 1 heure dans l\'eau. Prépare une sauce d\'oignon et de tomate, ajoute-la aux haricots.','Laisse mijoter 10 minutes et sers avec du riz ou du pain.']);
R('tw-r-gingembre','Jus de gingembre','or',['Gingembre frais, citron, sucre, eau.','Lave et épluche le gingembre, puis écrase-le ou mixe-le avec un peu d\'eau.','Pas de cuisson : filtre le jus avec un linge propre.','Ajoute eau, sucre et citron, mets au frais et sers bien froid.']);
R('tw-r-bouillie','Bouillie de maïs pour le matin','orange',['Farine de maïs, eau, sucre, un peu de lait.','Délaye la farine dans un peu d\'eau froide pour éviter les grumeaux.','Verse dans l\'eau bouillante en remuant, laisse cuire 10 minutes à feu doux.','Sucre selon le goût, ajoute du lait et sers chaud.']);

C('Trucs et astuces');
S('tw-a-vitres','Des vitres qui brillent','bleu',[['🪟','Le mélange','Mélange eau et un peu de vinaigre blanc dans un pulvérisateur.'],['🧽','Nettoyer','Frotte la vitre avec un chiffon doux pour enlever la poussière.'],['📰','Essuyer','Essuie avec du papier journal ou un chiffon propre, sans laisser de traces.'],['☁️','Bon moment','Évite de nettoyer en plein soleil, le produit sèche trop vite.']]);
S('tw-a-frigo','Supprimer les mauvaises odeurs du frigo','turquoise',[['🧊','Vider et trier','Jette ce qui est abîmé ou périmé.'],['🧼','Nettoyer','Lave les étagères à l\'eau savonneuse, rince et sèche bien.'],['🍋','Absorber','Mets un demi-citron ou un petit bol de bicarbonate au fond du frigo.'],['🥡','Fermer les plats','Couvre toujours les aliments pour garder les odeurs à l\'intérieur.']]);
S('tw-a-repassage','Bien repasser sans abîmer','violet',[['🏷️','Lire l\'étiquette','Les points sur l\'étiquette indiquent la bonne température du fer.'],['💧','Légèrement humide','Repasse le linge encore un peu humide, c\'est plus facile.'],['🔄','À l\'envers','Repasse les tissus délicats et foncés à l\'envers.'],['⚠️','Sécurité','Ne laisse jamais un fer branché sans surveillance, surtout avec des enfants.']]);
S('tw-a-eau','Économiser l\'eau et l\'électricité','vert',[['🚿','Robinet','Ferme le robinet quand tu te brosses les dents ou savonnes la vaisselle.'],['💡','Lumières','Éteins les lampes en quittant une pièce.'],['🔌','Appareils','Débranche chargeurs et appareils que tu n\'utilises pas.'],['💰','Résultat','Ces petits gestes réduisent la facture à la fin du mois.']]);
S('tw-a-cafards','Éloigner cafards et fourmis','terre',[['🍞','Ne rien laisser','Range la nourriture dans des boîtes fermées et ne laisse pas de miettes.'],['🗑️','Poubelle','Vide-la chaque jour et garde-la fermée.'],['🧹','Nettoyer','Lave le sol et la cuisine tous les jours, surtout le soir.'],['🕳️','Boucher les entrées','Bouche les fissures où ils passent et sèche les endroits humides.']]);
S('tw-a-placard','Ranger un placard en 4 étapes','orange',[['📦','Tout sortir','Vide le placard et nettoie les étagères.'],['🗂️','Trier','Fais 3 tas : je garde, je donne, je jette.'],['🧺','Regrouper','Range ensemble ce qui va ensemble : draps avec draps, serviettes avec serviettes.'],['✅','Facile à trouver','Mets ce que tu utilises le plus à hauteur des yeux.']]);

C('Histoires enfants');
S('tw-h-lion','Le lion et la petite souris','or',[['🦁','Le lion s\'endort','Un lion dort à l\'ombre. Une petite souris lui court sur la patte et le réveille.'],['🐭','Elle demande pardon','Le lion va l\'écraser, mais la souris dit : « Laisse-moi partir, un jour je t\'aiderai. »'],['🕸️','Le piège','Plus tard, le lion est pris dans un filet de chasseurs. La souris ronge les cordes une par une.'],['🤝','Libre !','Le lion est libre. Moralité : même les petits peuvent aider les grands.']]);
S('tw-h-coq','Le coq qui voulait chanter la nuit','orange',[['🐓','Le coq pressé','Le coq Pako veut chanter la nuit pour devenir célèbre.'],['😴','Le village dort','À minuit, il chante fort. Tout le village se réveille, fatigué et fâché.'],['🌅','Le bon moment','Une vieille poule lui dit : « Chaque chose a son heure. Ton chant est beau au lever du soleil. »'],['🌟','Il comprend','Pako chante à l\'aube et tout le monde l\'applaudit. Moralité : chaque chose en son temps.']]);
S('tw-h-baobab','Awa et la graine de baobab','vert',[['🌱','Une petite graine','Awa reçoit une graine de baobab et la plante, mais le grand arbre ne pousse pas tout de suite.'],['💧','Elle arrose','Chaque matin, Awa arrose sa graine avec patience, même quand elle ne voit rien.'],['🌿','Une pousse','Au bout de quelques semaines, une petite pousse verte sort de la terre.'],['🌳','Un grand arbre','Des années plus tard, l\'arbre donne de l\'ombre au village. Moralité : la patience fait grandir les belles choses.']]);
S('tw-h-calebasse','Les deux amis et la calebasse','terre',[['🥣','Une calebasse de riz','Yao et Moussa trouvent une calebasse remplie de riz et veulent chacun la garder.'],['⚖️','Ils se disputent','Ils crient, ils tirent, et la calebasse tombe : le riz se répand par terre.'],['🐔','Les poules arrivent','Les poules du voisin mangent tout le riz pendant qu\'ils se disputent.'],['💬','Ils comprennent','Ils rient et se promettent de partager la prochaine fois. Moralité : partager vaut mieux que se disputer.']]);
})();

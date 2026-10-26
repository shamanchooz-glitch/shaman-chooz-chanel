/* ==========================================================
   DIAPORAMAS LOT 1 — nounous, ménage, histoires d'enfants, quiz, culture générale, astuces, recettes
   Chaque ligne : S(identifiant, titre, palette, [[emoji, titre, texte], …]) ; la catégorie se change avec C('…')
   Ces vidéos affichent ta photo (photo-shaman.jpg). Tu peux modifier les textes librement.
   ========================================================== */
(function(){
if(!window.SCCS) return;
let cat = 'Nounous et ménage';
const C = c => { cat = c; };
const S = (id, t, pal, sl) => SCCS.add(id, t, cat, pal, sl, { photo:true });

/* ---------- Nounous, servantes, filles de ménage, gouvernantes ---------- */
C('Nounous et ménage');
S('tv-bain-bebe','Le bain de bébé en toute sécurité','turquoise',[
 ['🛁',"Préparer avant",'Rassemble serviette, savon doux et vêtements propres avant de remplir la baignoire. Ne laisse jamais bébé seul, même une seconde.'],
 ['🌡️',"Tester l'eau",'L\'eau doit être tiède, autour de 37 °C. Teste avec le coude ou un thermomètre, jamais avec la main seulement.'],
 ['🤲',"Bien tenir bébé",'Soutiens sa tête et son cou avec une main. Lave doucement, du visage vers les pieds, et plie bien les petits plis.'],
 ['🧸',"Sécher et habiller",'Enveloppe-le vite dans la serviette, sèche sans frotter, surtout les plis, puis habille-le au chaud.']
]);
S('tv-biberon','Préparer un biberon propre','rose',[
 ['🧼',"Se laver les mains",'Lave-toi les mains au savon avant de toucher le biberon, la tétine ou le lait.'],
 ['🍼',"Biberon bien propre",'Lave le biberon et la tétine à l\'eau chaude savonneuse avec un goupillon, puis rince très bien.'],
 ['💧',"Eau et dosage",'Utilise de l\'eau bouillie puis tiédie. Respecte exactement le nombre de mesures indiqué sur la boîte de lait.'],
 ['🤚',"Vérifier la chaleur",'Verse quelques gouttes sur ton poignet : le lait doit être tiède. Jette ce que bébé n\'a pas fini.']
]);
S('tv-securite-enfant','Sécurité des enfants à la maison','rouge',[
 ['🔌',"Prises et fils",'Couvre les prises avec des cache-prises et range les fils électriques hors de portée.'],
 ['🧴',"Produits dangereux",'Javel, pétrole et médicaments se rangent en hauteur, bien fermés, loin de la cuisine.'],
 ['🍲',"Cuisine",'Tourne les queues de casseroles vers l\'intérieur. Un enfant ne reste jamais seul près du feu.'],
 ['👀',"Toujours surveiller",'Escaliers, balcons, seaux d\'eau et piscines sont des dangers. Garde l\'enfant toujours à vue.']
]);
S('tv-salon','Nettoyer le salon dans le bon ordre','bleu',[
 ['🪟',"De haut en bas",'Commence par les toiles d\'araignée, les ventilateurs et les étagères, la poussière tombe vers le bas.'],
 ['🧽',"Les meubles",'Passe un chiffon légèrement humide sur les tables et les chaises, puis un chiffon sec.'],
 ['🛋️',"Les coussins",'Secoue les coussins dehors, redresse-les et plie les couvertures.'],
 ['🧹',"Le sol en dernier",'Balaye du fond vers la porte, puis lave le sol. Rien ne retombe sur ce que tu as nettoyé.']
]);
S('tv-cuisine-nickel','Une cuisine toujours propre','vert',[
 ['🍳',"Nettoyer après chaque repas",'Essuie le plan de travail et la cuisinière tout de suite : la graisse sèche devient difficile à enlever.'],
 ['🗑️',"Poubelle",'Vide-la chaque jour et lave-la de temps en temps, sinon les mouches et les odeurs arrivent.'],
 ['🧊',"Frigo",'Jette ce qui est périmé chaque semaine et essuie les étagères avec un peu de vinaigre.'],
 ['🧽',"Éponge et torchon",'Change-les souvent : une éponge sale est pleine de microbes.']
]);
S('tv-salle-bain','Toilettes et salle de bain impeccables','turquoise',[
 ['🚽',"Les bons gants",'Mets des gants. Utilise des chiffons différents pour les toilettes et pour le reste de la maison.'],
 ['🧴',"Laisser agir",'Verse le produit, attends 10 minutes, puis frotte. Le produit travaille à ta place.'],
 ['⚠️',"Jamais de mélange",'Ne mélange jamais javel et autres produits : cela dégage un gaz dangereux.'],
 ['💨',"Aérer et sécher",'Ouvre la fenêtre et essuie le sol pour éviter les glissades et l\'humidité.']
]);
S('tv-journee-gouvernante','Organiser sa journée de gouvernante','or',[
 ['🌅',"Le matin",'Aère la maison, prépare le petit-déjeuner et range les chambres avant que la journée commence.'],
 ['📝',"Faire une liste",'Note les tâches du jour : courses, repas, lessive, ménage. Fais d\'abord les plus importantes.'],
 ['🛒',"Gérer les provisions",'Surveille le riz, l\'huile, le savon et le gaz pour prévenir avant la rupture.'],
 ['🤝',"Honnêteté et discrétion",'Une bonne gouvernante est ponctuelle, honnête et discrète. C\'est ce qui fait sa réputation.']
]);
S('tv-accueil-visiteurs','Bien accueillir les visiteurs','violet',[
 ['🙂',"Le sourire",'Salue chaque visiteur avec un sourire et un bonjour poli.'],
 ['🪑',"Proposer une place",'Invite la personne à s\'asseoir et propose un verre d\'eau.'],
 ['📣',"Prévenir la famille",'Va dire à la personne concernée qui est là, sans crier à travers la maison.'],
 ['🚪',"Raccompagner",'À son départ, raccompagne-la jusqu\'à la porte avec un merci et un au revoir.']
]);

/* ---------- Histoires pour enfants ---------- */
C('Histoires enfants');
S('tv-hist-elephant','Le petit éléphant qui disait merci','vert',[
 ['🐘',"Il était une fois",'Dans la savane vivait Tembo, un petit éléphant très gentil, mais qui oubliait toujours de dire merci.'],
 ['🦒',"Le service de Girafe",'Un jour, Girafe cueille pour lui une mangue tout en haut de l\'arbre. Tembo la mange et s\'en va sans un mot.'],
 ['😢',"Girafe est triste",'Girafe baisse la tête : ce n\'est pas la mangue qu\'elle voulait, c\'est un simple merci.'],
 ['🌟',"Tembo comprend",'Tembo revient et dit « Merci, Girafe ! ». Depuis, tout le monde l\'aide avec plaisir. Moralité : un merci rend heureux.']
]);
S('tv-hist-tortue','La tortue et le lièvre','orange',[
 ['🐇',"Le lièvre se vante",'Lièvre se moque de Tortue : « Tu es si lente ! Je gagne la course quand je veux ! »'],
 ['🏁',"La course commence",'Lièvre part comme le vent et laisse Tortue loin derrière. Il décide de dormir un peu sous un arbre.'],
 ['🐢',"Tortue avance",'Tortue ne s\'arrête pas. Pas à pas, doucement, elle dépasse Lièvre endormi.'],
 ['🏆',"Tortue gagne",'Quand Lièvre se réveille, Tortue est déjà arrivée. Moralité : persévérer vaut mieux que se vanter.']
]);
S('tv-hist-pecheur','Kofi et le petit poisson','bleu',[
 ['🎣',"Kofi pêche",'Kofi, un jeune pêcheur, attrape un tout petit poisson. Il veut le garder pour le dîner.'],
 ['🐟',"Le poisson parle",'« Rends-moi à la lagune, dit le poisson. Je grandirai et un jour tu me reprendras plus gros. »'],
 ['🌊',"Kofi réfléchit",'Kofi pense : ce poisson est trop petit pour nourrir ma famille. Il le remet doucement dans l\'eau.'],
 ['🍽️',"La récompense",'Le lendemain, Kofi fait une belle pêche. Moralité : la patience et la générosité sont récompensées.']
]);
S('tv-hist-lampe','La petite lampe de Mariam','or',[
 ['🌙',"La nuit tombe",'Dans son village, Mariam a peur du noir et n\'ose plus sortir de sa case.'],
 ['🪔',"Une petite lampe",'Sa grand-mère lui offre une petite lampe : « La lumière chasse la peur, ma fille. »'],
 ['🚶',"Mariam avance",'Avec sa lampe, Mariam traverse la cour et voit qu\'il n\'y a rien d\'effrayant.'],
 ['✨',"Elle n'a plus peur",'Elle comprend que le courage grandit quand on essaie. Moralité : affronte ta peur, elle devient petite.']
]);
S('tv-hist-singe','Le singe qui disait toujours la vérité','terre',[
 ['🐒',"Le singe Koko",'Koko casse par accident la calebasse de la maman. Il a très peur d\'être grondé.'],
 ['🤥',"Mentir, ce serait facile",'Il pourrait dire que c\'est le chat. Mais il sent son cœur lourd.'],
 ['🗣️',"Il avoue",'Koko va voir sa maman : « C\'est moi, je suis désolé. » Maman le prend dans ses bras.'],
 ['❤️',"La leçon",'Dire la vérité demande du courage, et rend l\'enfant fort. Moralité : la vérité vaut mieux qu\'un mensonge.']
]);

/* ---------- Jeux-quiz (enfants et grandes personnes) ---------- */
C('Jeux-quiz');
S('tv-quiz-animaux','Quiz des animaux (enfants)','orange',[
 ['🐆',"Question 1",'Quel est l\'animal le plus rapide sur terre ? Réponse : le guépard, plus de 100 km/h sur une courte distance.'],
 ['🐘',"Question 2",'Quel est le plus grand animal terrestre ? Réponse : l\'éléphant d\'Afrique.'],
 ['🕷️',"Question 3",'Combien de pattes a une araignée ? Réponse : 8 pattes.'],
 ['🐋',"Question 4",'Quel est le plus grand animal du monde ? Réponse : la baleine bleue.']
]);
S('tv-quiz-calcul','Quiz de calcul mental (enfants)','bleu',[
 ['➕',"Question 1",'Combien font 15 + 27 ? Réponse : 42.'],
 ['✖️',"Question 2",'Combien font 7 × 8 ? Réponse : 56.'],
 ['➖',"Question 3",'Combien font 100 − 37 ? Réponse : 63.'],
 ['🧮',"Question 4",'Combien font 12 × 12 ? Réponse : 144.']
]);
S('tv-quiz-corps','Quiz du corps humain','rose',[
 ['🦴',"Question 1",'Combien d\'os a un adulte ? Réponse : 206 os.'],
 ['👃',"Question 2",'Combien de sens avons-nous ? Réponse : cinq, la vue, l\'ouïe, l\'odorat, le goût et le toucher.'],
 ['❤️',"Question 3",'Quel organe pompe le sang dans tout le corps ? Réponse : le cœur.'],
 ['🫁',"Question 4",'Quel organe nous permet de respirer ? Réponse : les poumons.']
]);
S('tv-quiz-ci','Quiz sur la Côte d\'Ivoire','vert',[
 ['🇨🇮',"Question 1",'Quelle est la capitale politique de la Côte d\'Ivoire ? Réponse : Yamoussoukro.'],
 ['🏙️',"Question 2",'Quelle est la capitale économique ? Réponse : Abidjan.'],
 ['📅',"Question 3",'En quelle année la Côte d\'Ivoire est-elle devenue indépendante ? Réponse : 1960, le 7 août.'],
 ['💰',"Question 4",'Quelle est sa monnaie ? Réponse : le franc CFA (XOF).']
]);
S('tv-quiz-monde','Quiz culture générale (grandes personnes)','nuit',[
 ['🌍',"Question 1",'Combien y a-t-il de continents ? Réponse : sept.'],
 ['🌊',"Question 2",'Quel est le plus grand océan du monde ? Réponse : l\'océan Pacifique.'],
 ['🗼',"Question 3",'Dans quelle ville se trouve la tour Eiffel ? Réponse : à Paris.'],
 ['🌕',"Question 4",'Quel astre tourne autour de la Terre ? Réponse : la Lune.']
]);

/* ---------- Culture générale ---------- */
C('Culture générale');
S('tv-cg-ciel','Pourquoi le ciel est-il bleu ?','bleu',[
 ['☀️',"La lumière du soleil",'La lumière du soleil paraît blanche, mais elle contient toutes les couleurs.'],
 ['🌈',"Les couleurs se séparent",'En traversant l\'air, les petites particules dispersent surtout la lumière bleue dans tout le ciel.'],
 ['🌅',"Le soir",'Au coucher du soleil, la lumière traverse plus d\'air et le ciel devient orange et rouge.'],
 ['💡',"À retenir",'Le ciel est bleu parce que l\'air diffuse la lumière bleue plus que les autres couleurs.']
]);
S('tv-cg-continents','Les sept continents','vert',[
 ['🌍',"Afrique",'Afrique : le deuxième plus grand continent, avec 54 pays reconnus.'],
 ['🌎',"Amériques",'Amérique du Nord et Amérique du Sud : deux continents reliés par un isthme.'],
 ['🌏',"Asie et Europe",'L\'Asie est le plus grand continent et le plus peuplé. L\'Europe est plus petite mais très variée.'],
 ['🐧',"Océanie et Antarctique",'L\'Océanie regroupe l\'Australie et les îles du Pacifique. L\'Antarctique est le continent des glaces.']
]);
S('tv-cg-eau','Le cycle de l\'eau','turquoise',[
 ['☀️',"Évaporation",'Le soleil chauffe la mer, les rivières et la lagune : l\'eau monte dans l\'air en vapeur.'],
 ['☁️',"Condensation",'En montant, la vapeur refroidit et forme des nuages.'],
 ['🌧️',"Précipitations",'Les gouttes deviennent lourdes et tombent en pluie.'],
 ['💧',"Le retour",'L\'eau rejoint les rivières et la mer, et le cycle recommence. L\'eau ne disparaît jamais, elle voyage.']
]);

/* ---------- Trucs et astuces ---------- */
C('Trucs et astuces');
S('tv-astuce-tache','Enlever une tache de gras sur un tissu','orange',[
 ['👕',"Agir vite",'Plus la tache est fraîche, plus elle part facilement. Tamponne sans frotter avec un papier absorbant.'],
 ['🧂',"Poudre absorbante",'Couvre la tache de talc, de maïzena ou de farine pendant 30 minutes pour absorber le gras.'],
 ['🧼',"Savon",'Frotte doucement avec du liquide vaisselle ou du savon, puis laisse agir quelques minutes.'],
 ['💧',"Laver",'Lave ensuite normalement. Vérifie que la tache est partie avant de sécher le vêtement.']
]);
S('tv-astuce-legumes','Garder ses légumes frais plus longtemps','vert',[
 ['🥬',"Les feuilles",'Enveloppe les salades et feuilles vertes dans un linge propre, puis mets-les dans le bas du frigo.'],
 ['🍅',"Les tomates",'Garde les tomates à l\'ombre, la queue vers le bas, sans les entasser.'],
 ['🧅',"Oignons et ail",'Garde-les au sec, à l\'air, loin des pommes de terre.'],
 ['🚫',"Trier",'Retire tout de suite un fruit ou un légume abîmé : il fait pourrir les autres.']
]);
S('tv-astuce-moustiques','Éloigner les moustiques','terre',[
 ['🪣',"Pas d'eau stagnante",'Vide chaque semaine seaux, pneus, vieilles boîtes et soucoupes : les moustiques y pondent.'],
 ['🪟',"Moustiquaire",'Ferme les fenêtres au coucher du soleil ou pose des moustiquaires.'],
 ['🛏️',"Dormir protégé",'Dormir sous une moustiquaire est la meilleure protection contre le paludisme, surtout pour les enfants.'],
 ['🌿',"Le jardin",'Coupe les herbes hautes autour de la maison. Les moustiques s\'y cachent le jour.']
]);

/* ---------- Recettes simples ---------- */
C('Recettes simples');
S('tv-recette-omelette','Omelette aux oignons en 10 minutes','or',[
 ['🥚',"Les ingrédients",'3 œufs, 1 oignon, un peu d\'huile, du sel et du poivre.'],
 ['🧅',"Les oignons",'Coupe l\'oignon en petits morceaux et fais-le revenir 2 minutes dans l\'huile chaude.'],
 ['🍳',"Les œufs",'Bats les œufs avec une pincée de sel, verse-les sur les oignons et laisse cuire à feu moyen.'],
 ['🍽️',"Servir",'Retourne l\'omelette quand le dessous est doré, 2 minutes encore, et sers avec du pain.']
]);
S('tv-recette-riz','Riz à la sauce tomate facile','rouge',[
 ['🍚',"Le riz",'Lave le riz, mets-le dans deux fois son volume d\'eau salée et laisse cuire à feu doux 15 minutes.'],
 ['🍅',"La sauce",'Fais revenir oignon et ail dans l\'huile, ajoute les tomates écrasées et un peu de concentré.'],
 ['🌶️',"L'assaisonnement",'Ajoute sel, cube et piment selon ton goût. Laisse mijoter 15 minutes.'],
 ['🍽️',"Servir chaud",'Sers le riz avec la sauce. Tu peux ajouter du poisson, du poulet ou un œuf.']
]);
S('tv-recette-alloco','Les alloco, bananes plantain frites','orange',[
 ['🍌',"Bien choisir",'Prends des plantains bien mûrs, jaunes avec des taches noires : ils seront plus sucrés.'],
 ['🔪',"Couper",'Épluche et coupe en rondelles ou en morceaux de même épaisseur pour une cuisson régulière.'],
 ['🔥',"Frire",'Plonge dans l\'huile chaude 3 à 4 minutes, jusqu\'à ce qu\'ils soient dorés. Ne remplis pas trop la casserole.'],
 ['🧂',"Égoutter",'Égoutte sur du papier absorbant, ajoute une pincée de sel et sers chaud avec une sauce pimentée.']
]);
S('tv-recette-bissap','Jus de bissap frais','rose',[
 ['🌺',"Les fleurs",'Rince 2 poignées de fleurs d\'hibiscus (bissap), mets-les dans une casserole avec 1,5 litre d\'eau.'],
 ['♨️',"Faire bouillir",'Laisse bouillir 10 minutes, puis éteins le feu et laisse infuser encore 10 minutes.'],
 ['🍯',"Sucrer",'Filtre le jus, ajoute du sucre ou du miel selon le goût, et un peu de menthe ou de citron.'],
 ['🧊',"Servir frais",'Laisse refroidir puis mets au frigo. Sers bien frais, c\'est parfait avec la chaleur.']
]);
})();

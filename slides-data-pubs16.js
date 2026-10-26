/* ==========================================================
   PUBS 16 — RECETTES SIMPLES DE CÔTE D'IVOIRE (30 nouveaux diaporamas avec ta photo)
   Chaque recette = 3 écrans (ingrédients, préparation, astuce) + 1 message final, catégorie « Recettes ».
   Quantités pour environ 4 personnes, recettes de famille simplifiées : chaque maison cuisine à sa façon.
   Ce fichier définit aussi l'outil commun window.SCC_RECIPE, utilisé par pubs17 (Afrique) et pubs18 (Europe et monde).
   Les identifiants commencent par « rc- ».
   Pour ajouter une recette : une ligne R(...) ci-dessous = 1 nouvelle vidéo.
   ========================================================== */
(function(){
if(!window.SCCS) return;
const CLOSE = [
 ['🧩',"Un seul métier","Pour SHAMAN CHOOZ, préparer les repas, faire le ménage et s'occuper des enfants, c'est le même travail."],
 ['🌍',"Nos activités dans le monde","SHAMAN CHOOZ recrute et place du personnel de maison et d'autres métiers, dans tous les secteurs, partout dans le monde."],
 ['📺',"Une chaîne pour toute la famille","Recettes, astuces et savoirs tournent 24h/24. Partagez la chaîne avec vos proches !"],
 ['👩‍🍳',"La cuisine, un beau métier","Faire à manger pour une famille est un travail qui mérite le respect."],
 ['🧼',"Hygiène avant tout","Avant de cuisiner : mains lavées, plan de travail propre, aliments bien lavés et bien cuits."]
];
const PAL = ['orange','or','vert','rose','terre','turquoise','bleu','violet'];
let count = window.SCC_RECIPE_COUNT || 0;
/* SCC_RECIPE(préfixe, lieu, id, titre, ingrédients, préparation, astuce) */
window.SCC_RECIPE = function(pre, lieu, id, titre, ingr, prepa, astuce){
 const k = count++;
 SCCS.add(pre + '-' + id, 'Recette simple : ' + titre + (lieu ? ' (' + lieu + ')' : ''), 'Recettes', PAL[k % PAL.length], [
  ['🛒', 'Ingrédients', ingr],
  ['👩‍🍳', 'Préparation', prepa],
  ['💡', 'Astuce', astuce],
  CLOSE[k % CLOSE.length] ], { photo:true });
};
window.SCC_RECIPE_COUNT = 0;
const R = (id, titre, ingr, prepa, astuce) => SCC_RECIPE('rc', "Côte d'Ivoire", id, titre, ingr, prepa, astuce);

R('riz-tomate', "Riz à la sauce tomate",
 "Riz (400 g), 6 tomates mûres, 1 oignon, 2 c. à soupe d'huile, sel, piment, un cube ou des épices, eau.",
 "Fais revenir l'oignon dans l'huile, ajoute les tomates écrasées et cuis 20 min. Cuis le riz à part dans l'eau salée, puis sers-le avec la sauce.",
 "Rince le riz avant de le cuire pour qu'il soit moins collant.");
R('aloco', "Aloco (bananes plantain frites)",
 "4 bananes plantain bien mûres, huile de friture, sel, oignon et piment pour la sauce.",
 "Épluche les bananes et coupe-les en rondelles en biais. Fais-les dorer dans l'huile chaude, égoutte-les, sale légèrement. Sers avec oignon et piment.",
 "La banane doit être bien jaune, presque tachetée : elle est plus sucrée.");
R('kedjenou', "Kedjenou de poulet",
 "1 poulet en morceaux, 3 tomates, 2 oignons, 1 aubergine, gingembre, ail, piment, sel, un peu d'huile.",
 "Mets tout dans une marmite au couvercle bien fermé, sans eau. Cuis à feu doux environ 1 h en secouant la marmite de temps en temps.",
 "Ne soulève pas le couvercle : la vapeur cuit le poulet dans son jus.");
R('garba', "Garba (thon frit et attiéké)",
 "Attiéké, tranches de thon, farine, huile de friture, oignon, tomate, piment, sel, citron.",
 "Assaisonne le thon, passe-le dans la farine et fais-le frire jusqu'à ce qu'il soit doré. Sers avec l'attiéké, l'oignon, la tomate et le piment.",
 "Chauffe bien l'huile avant d'y mettre le poisson : il absorbe moins de gras.");
R('poisson-braise', "Poisson braisé",
 "Poisson entier nettoyé, ail, oignon, gingembre, piment, citron, sel, huile.",
 "Marine le poisson 30 min avec les épices et le citron. Grille-le sur la braise ou au four, 10 à 15 min de chaque côté.",
 "Le poisson est cuit quand la chair se détache facilement à la fourchette.");
R('sauce-gombo', "Sauce gombo",
 "300 g de gombos, 1 oignon, 2 tomates, poisson fumé ou viande, huile, piment, sel.",
 "Coupe les gombos en rondelles. Cuis l'oignon et les tomates, ajoute le poisson, les gombos et un peu d'eau. Laisse cuire 15 min à feu doux.",
 "Ne cuis pas trop longtemps : les gombos restent verts et fermes.");
R('foutou', "Foutou de banane (version simple)",
 "3 bananes plantain mûres mais fermes, 1 igname (ou du manioc), eau, sel.",
 "Fais bouillir les bananes et l'igname jusqu'à ce qu'ils soient tendres. Pile-les en mouillant le pilon, jusqu'à obtenir une pâte lisse. Forme des boules.",
 "Mouille souvent le pilon et tes mains : la pâte ne colle plus.");
R('sauce-arachide', "Sauce arachide (maafé)",
 "4 c. à soupe de pâte d'arachide, viande ou poulet, 2 tomates, 1 oignon, piment, sel, eau.",
 "Fais revenir la viande avec l'oignon. Ajoute la tomate, l'eau et la pâte d'arachide délayée. Laisse mijoter 30 à 40 min en remuant.",
 "Remue souvent pour que la sauce n'accroche pas au fond de la marmite.");
R('riz-gras', "Riz gras au poulet",
 "Riz, poulet en morceaux, concentré de tomate, 1 oignon, ail, carottes, huile, sel, eau.",
 "Fais dorer le poulet, ajoute l'oignon, la tomate et un peu d'eau. Ajoute le riz lavé et deux fois son volume d'eau. Couvre et cuis 20 min à feu doux.",
 "Garde le feu doux pour que le riz ne brûle pas au fond.");
R('soupe-poisson', "Soupe de poisson",
 "Poisson frais en morceaux, tomate, oignon, aubergine, gombo, piment, gingembre, sel, eau.",
 "Fais bouillir l'eau avec l'oignon, la tomate, le gingembre et le piment. Ajoute le poisson et les légumes. Cuis 20 min à feu doux.",
 "Retire bien les arêtes avant de servir aux enfants.");
R('kaklo', "Kaklo (beignets de banane plantain)",
 "4 bananes plantain très mûres, 2 c. à soupe de farine, sel, gingembre ou piment, huile de friture.",
 "Écrase les bananes, ajoute la farine, le sel et les épices. Forme des petites boules ou galettes et fais-les dorer dans l'huile chaude.",
 "Plus la banane est mûre, plus les beignets sont doux et dorés.");
R('beignets', "Beignets de farine",
 "300 g de farine, 1 c. à café de levure, 3 c. à soupe de sucre, 1 pincée de sel, eau tiède, huile de friture.",
 "Mélange avec l'eau tiède jusqu'à une pâte épaisse. Laisse reposer 30 min. Fais tomber des cuillerées dans l'huile chaude et dore des deux côtés.",
 "Huile ni trop chaude ni trop froide : les beignets cuisent à cœur.");
R('jus-gingembre', "Jus de gingembre frais",
 "200 g de gingembre frais, 1,5 L d'eau propre, sucre, citron.",
 "Épluche et mixe le gingembre avec un peu d'eau. Filtre, ajoute le reste de l'eau, le sucre et le citron. Mets au frais.",
 "Bois-le frais et avec modération, surtout pour les enfants.");
R('bissap', "Bissap (jus d'hibiscus)",
 "2 poignées de fleurs d'hibiscus séchées, 1 L d'eau, sucre, menthe, citron.",
 "Rince les fleurs et fais-les bouillir 10 min. Laisse infuser, filtre, ajoute le sucre et la menthe. Sers bien frais.",
 "Garde-le au frais et bois-le en 2 ou 3 jours maximum.");
R('omelette', "Omelette aux oignons et tomates",
 "4 œufs, 1 oignon, 1 tomate, sel, piment, huile.",
 "Coupe l'oignon et la tomate en petits dés. Bats les œufs avec du sel et mélange avec les légumes. Cuis 4 min de chaque côté dans la poêle huilée.",
 "Une omelette bien cuite est plus sûre pour les petits.");
R('igname', "Igname bouillie et sauce tomate",
 "1 kg d'igname, eau, sel ; pour la sauce : tomates, oignon, huile, piment.",
 "Épluche et coupe l'igname en gros morceaux. Cuis 20 à 25 min dans l'eau salée. Sers avec la sauce tomate à l'oignon.",
 "Pique avec un couteau : s'il rentre sans résistance, c'est cuit.");
R('crudites', "Salade de crudités",
 "Laitue, tomates, concombre, carottes, oignon, huile, citron, sel.",
 "Lave et coupe les légumes. Mélange l'huile, le citron et le sel pour faire la sauce. Assaisonne juste avant de servir.",
 "Lave bien les légumes à l'eau propre avant de les couper.");
R('haricots', "Haricots niébé et riz",
 "300 g de haricots niébé, riz, oignon, tomate, huile, sel, piment.",
 "Fais tremper les haricots 4 h, puis cuis-les environ 45 min. Prépare une sauce d'oignon et de tomate, ajoute les haricots et cuis 10 min. Sers avec du riz.",
 "Jette l'eau de trempage : les haricots se digèrent mieux.");
R('poulet-braise', "Poulet braisé",
 "Poulet en morceaux, ail, oignon, gingembre, moutarde, piment, citron, sel, huile.",
 "Marine le poulet 1 h. Cuis-le sur la braise ou au four chaud pendant 40 à 50 min, en le retournant.",
 "Le poulet est cuit à cœur quand le jus est clair, sans rose.");
R('bouillie-mais', "Bouillie de maïs au lait",
 "4 c. à soupe de farine de maïs, 500 ml d'eau, 250 ml de lait, sucre, 1 pincée de sel.",
 "Délaye la farine dans un peu d'eau froide. Verse dans l'eau bouillante en remuant 10 min. Ajoute le lait et le sucre.",
 "Remue sans arrêt pour éviter les grumeaux.");
R('sauce-claire', "Sauce claire de poisson",
 "Poisson, 2 aubergines, 2 tomates, 1 oignon, gombo, piment, sel, eau.",
 "Fais cuire l'oignon, les tomates et les aubergines coupées. Ajoute le poisson, l'eau et le piment. Mijote 25 min. Sers avec du riz ou de l'igname.",
 "Garde le feu doux : la sauce reste claire et parfumée.");
R('soupe-poulet', "Soupe de poulet",
 "Poulet, carottes, pommes de terre, oignon, ail, gingembre, poireau, sel, poivre, eau.",
 "Fais bouillir le poulet avec l'oignon, l'ail et le gingembre pendant 30 min. Ajoute les carottes et les pommes de terre, puis cuis 20 min.",
 "Retire l'écume du bouillon pour qu'il soit clair et léger.");
R('riz-lait', "Riz au lait",
 "100 g de riz, 1 L de lait, 4 c. à soupe de sucre, vanille ou cannelle, 1 pincée de sel.",
 "Cuis le riz dans le lait à feu doux 30 à 35 min en remuant. Ajoute le sucre et la vanille. Sers tiède ou frais.",
 "Remue souvent pour que le lait n'attache pas au fond.");
R('salade-fruits', "Salade de fruits",
 "Mangue, banane, orange, papaye, ananas, jus d'un citron.",
 "Lave et épluche les fruits. Coupe-les en dés, ajoute le jus de citron et mélange doucement. Mets au frais 30 min.",
 "Le citron évite que les fruits noircissent.");
R('plantain-braise', "Banane plantain braisée",
 "Bananes plantain mûres, piment et arachides pour accompagner.",
 "Grille les bananes avec leur peau sur la braise ou au four, en les retournant, pendant environ 20 min. Épluche et sers chaud.",
 "Garde la peau pendant la cuisson : la chair reste moelleuse.");
R('gateau-banane', "Gâteau à la banane",
 "3 bananes mûres, 200 g de farine, 100 g de sucre, 2 œufs, 80 ml d'huile, 1 sachet de levure.",
 "Écrase les bananes, ajoute les œufs, le sucre et l'huile, puis la farine et la levure. Verse dans un moule huilé et cuis 40 min à 180 °C.",
 "Pique avec un couteau : s'il ressort sec, le gâteau est cuit.");
R('sauce-feuille', "Sauce aux feuilles (épinards)",
 "Épinards ou feuilles locales, poisson fumé, oignon, tomate, huile, piment, sel.",
 "Lave et hache les feuilles. Fais revenir l'oignon et la tomate, ajoute le poisson et les feuilles, puis cuis 15 min.",
 "Lave les feuilles plusieurs fois pour enlever le sable.");
R('spaghetti', "Spaghettis à la sauce tomate",
 "250 g de spaghettis, 5 tomates, 1 oignon, 2 gousses d'ail, huile, sel, un peu de sucre.",
 "Fais cuire la sauce (oignon, ail, tomates) 20 min. Cuis les spaghettis dans l'eau bouillante salée selon le paquet. Mélange.",
 "Une pincée de sucre enlève l'acidité de la tomate.");
R('attieke-garni', "Attiéké garni",
 "Attiéké, tomate, oignon, concombre, huile, citron, sel, poisson ou œuf.",
 "Réchauffe l'attiéké à la vapeur. Garnis avec la tomate, l'oignon et le concombre, ajoute l'huile et le citron. Sers avec du poisson ou un œuf.",
 "Réchauffe-le à la vapeur : il reste moelleux.");
R('jus-orange', "Jus d'orange pressé maison",
 "6 oranges bien mûres, un peu de sucre si besoin.",
 "Lave les oranges, coupe-les en deux et presse-les. Filtre pour retirer les pépins. Sers frais.",
 "Bois-le dans la journée pour garder tous ses bienfaits.");
})();

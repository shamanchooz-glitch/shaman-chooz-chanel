/* ==========================================================
   PUBS 18 — RECETTES SIMPLES D'EUROPE (20) ET DU MONDE ENTIER (20) : 40 nouveaux diaporamas avec ta photo
   Utilise l'outil window.SCC_RECIPE défini dans slides-data-pubs16.js (qui doit être chargé avant).
   Recettes de famille simplifiées, quantités pour environ 4 personnes.
   Les identifiants commencent par « re- » (Europe) et « rm- » (monde).
   Pour ajouter une recette : une ligne E(...) ou M(...) ci-dessous = 1 nouvelle vidéo.
   ========================================================== */
(function(){
if(!window.SCCS || !window.SCC_RECIPE) return;
const E = (id, lieu, titre, ingr, prepa, astuce) => SCC_RECIPE('re', lieu, id, titre, ingr, prepa, astuce);
const M = (id, lieu, titre, ingr, prepa, astuce) => SCC_RECIPE('rm', lieu, id, titre, ingr, prepa, astuce);

/* ---------- Europe ---------- */
E('crepes', "France", "Crêpes",
 "250 g de farine, 3 œufs, 500 ml de lait, 1 c. à soupe de sucre, 1 pincée de sel, 1 c. à soupe d'huile.",
 "Mélange farine, œufs et sel, ajoute le lait petit à petit. Laisse reposer 30 min. Cuis une louche de pâte dans une poêle chaude, 1 min de chaque côté.",
 "Une pâte reposée donne des crêpes plus fines et plus souples.");
E('ratatouille', "France", "Ratatouille",
 "2 courgettes, 1 aubergine, 2 poivrons, 4 tomates, 1 oignon, ail, huile d'olive, thym, sel.",
 "Coupe tous les légumes en dés. Fais revenir l'oignon, ajoute les autres légumes. Couvre et laisse mijoter 40 min à feu doux.",
 "Elle est encore meilleure le lendemain, réchauffée.");
E('gratin', "France", "Gratin dauphinois",
 "1 kg de pommes de terre, 400 ml de crème (ou lait), 1 gousse d'ail, sel, poivre, muscade.",
 "Coupe les pommes de terre en fines rondelles. Frotte le plat avec l'ail, mets les pommes de terre et verse la crème assaisonnée. Cuis 1 h à 170 °C.",
 "Des rondelles fines et régulières cuisent à la même vitesse.");
E('soupe-legumes', "France", "Soupe de légumes",
 "Carottes, pommes de terre, poireaux, navets, oignon, 1,5 L d'eau, sel, poivre, un peu d'huile.",
 "Épluche et coupe les légumes. Fais-les cuire 30 min dans l'eau salée. Mixe ou écrase selon la texture souhaitée.",
 "Ajoute un filet d'huile à la fin pour plus de douceur.");
E('pot-au-feu', "France", "Pot-au-feu",
 "Viande de bœuf à bouillir, carottes, poireaux, navets, pommes de terre, oignon, clou de girofle, sel.",
 "Plonge la viande dans l'eau froide, porte à ébullition et écume. Cuis 2 h à feu doux. Ajoute les légumes pour les 40 dernières minutes.",
 "Le bouillon peut servir de soupe le lendemain.");
E('pates-tomate', "Italie", "Pâtes à la tomate et au basilic",
 "300 g de pâtes, 6 tomates mûres ou 1 boîte de tomates, 2 gousses d'ail, basilic, huile d'olive, sel.",
 "Fais revenir l'ail dans l'huile, ajoute les tomates et cuis 20 min. Cuis les pâtes al dente. Mélange avec la sauce et le basilic.",
 "Garde un peu d'eau de cuisson pour lier la sauce.");
E('minestrone', "Italie", "Minestrone (soupe de légumes)",
 "Carottes, courgettes, pommes de terre, haricots blancs cuits, petites pâtes, tomate, oignon, huile d'olive, sel.",
 "Fais revenir l'oignon, ajoute les légumes en dés et l'eau. Cuis 30 min, ajoute les haricots et les pâtes, puis cuis 10 min.",
 "Les petites pâtes cuisent directement dans la soupe.");
E('pizza', "Italie", "Pizza margherita maison",
 "300 g de farine, 1 sachet de levure de boulanger, eau tiède, sauce tomate, fromage (mozzarella), basilic, huile d'olive, sel.",
 "Pétris farine, levure, sel et eau. Laisse lever 1 h. Étale la pâte, ajoute la sauce et le fromage, cuis 15 min à four très chaud.",
 "Un four bien chaud donne une pâte croustillante.");
E('tortilla', "Espagne", "Tortilla de patatas",
 "4 pommes de terre, 1 oignon, 6 œufs, huile, sel.",
 "Fais cuire les pommes de terre et l'oignon émincés à l'huile, à feu doux. Mélange avec les œufs battus. Cuis dans la poêle 5 min, retourne et cuis encore 4 min.",
 "Retourne la tortilla avec une assiette pour qu'elle ne casse pas.");
E('gazpacho', "Espagne", "Gazpacho (soupe froide)",
 "6 tomates mûres, 1 concombre, 1 poivron, 1 gousse d'ail, huile d'olive, vinaigre, pain, sel.",
 "Mixe tous les ingrédients avec un peu d'eau et un morceau de pain. Rectifie le sel et le vinaigre. Mets au frais 2 h.",
 "Parfait par temps chaud : sers-le bien frais.");
E('paella', "Espagne", "Paella (version simple)",
 "Riz, poulet, poivron, petits pois, oignon, ail, tomate, safran ou curcuma, bouillon, huile, sel.",
 "Fais dorer le poulet, ajoute l'oignon, l'ail et la tomate. Ajoute le riz, le bouillon et le safran. Cuis 20 min sans remuer.",
 "Ne remue pas pendant la cuisson : le riz reste bien détaché.");
E('caldo-verde', "Portugal", "Caldo verde (soupe de pommes de terre et de chou)",
 "4 pommes de terre, 1 oignon, chou vert, ail, huile d'olive, sel, eau.",
 "Fais cuire pommes de terre, oignon et ail 20 min. Mixe. Ajoute le chou coupé en fines lanières, cuis 5 min. Ajoute un filet d'huile d'olive.",
 "Coupe le chou très finement : il cuit en quelques minutes.");
E('morue', "Portugal", "Morue aux pommes de terre et aux œufs",
 "Morue dessalée, pommes de terre, oignon, œufs, persil, huile d'olive, sel, poivre.",
 "Effiloche la morue. Fais frire les pommes de terre en fins bâtonnets. Fais revenir l'oignon, ajoute morue et pommes de terre, puis les œufs battus.",
 "Dessale la morue 24 h dans l'eau en la changeant souvent.");
E('salade-pdt', "Allemagne", "Salade de pommes de terre",
 "1 kg de pommes de terre, 1 oignon, bouillon chaud, vinaigre, huile, moutarde, cornichons, sel, poivre.",
 "Cuis les pommes de terre, épluche et coupe-les en rondelles tièdes. Mélange avec le bouillon, le vinaigre, la moutarde, l'oignon et l'huile.",
 "Assaisonne les pommes de terre encore tièdes : elles absorbent mieux.");
E('frites', "Belgique", "Frites maison",
 "1 kg de pommes de terre, huile de friture, sel.",
 "Coupe les pommes de terre en bâtonnets et sèche-les. Fais-les frire une première fois 5 min à feu moyen, puis une seconde fois à feu vif jusqu'à ce qu'elles soient dorées.",
 "Deux cuissons rendent les frites croustillantes dehors et moelleuses dedans.");
E('salade-grecque', "Grèce", "Salade grecque",
 "Tomates, concombre, oignon rouge, olives, fromage feta, huile d'olive, origan, sel.",
 "Coupe les légumes en gros morceaux. Ajoute les olives et le fromage en cubes. Assaisonne d'huile d'olive, d'origan et d'un peu de sel.",
 "La feta est déjà salée : va doucement avec le sel.");
E('tzatziki', "Grèce", "Tzatziki",
 "2 yaourts nature, 1 concombre, 1 gousse d'ail, huile d'olive, citron, sel, menthe.",
 "Râpe le concombre et presse-le pour enlever l'eau. Mélange avec le yaourt, l'ail écrasé, un filet d'huile et de citron. Sers frais.",
 "Presse bien le concombre : la sauce reste épaisse.");
E('porridge', "Royaume-Uni", "Porridge (bouillie de flocons d'avoine)",
 "6 c. à soupe de flocons d'avoine, 300 ml de lait ou d'eau, une pincée de sel, miel ou fruits.",
 "Verse les flocons dans le lait chaud avec le sel. Cuis 5 min en remuant. Ajoute le miel ou des fruits coupés.",
 "Un petit déjeuner chaud et rassasiant, très simple à préparer.");
E('rosti', "Suisse", "Rösti de pommes de terre",
 "4 pommes de terre cuites la veille, 1 oignon, huile ou beurre, sel, poivre.",
 "Râpe les pommes de terre cuites. Fais chauffer l'huile, ajoute les pommes de terre et salez. Presse en galette et cuis 10 min de chaque côté.",
 "Des pommes de terre cuites la veille se râpent bien et dorent mieux.");
E('borscht', "Europe de l'Est", "Soupe de betterave (borscht)",
 "3 betteraves, 2 pommes de terre, 1 carotte, chou, oignon, tomate, vinaigre ou citron, sel, eau.",
 "Cuis tous les légumes coupés dans l'eau pendant 40 min. Ajoute un filet de vinaigre pour garder la belle couleur. Sers avec du yaourt ou de la crème.",
 "Le vinaigre garde la couleur rouge vif de la soupe.");

/* ---------- Monde ---------- */
M('dal', "Inde", "Dal (lentilles aux épices)",
 "250 g de lentilles corail, 1 oignon, 2 gousses d'ail, gingembre, curcuma, cumin, huile, sel, eau.",
 "Fais revenir l'oignon, l'ail et le gingembre avec les épices. Ajoute les lentilles et l'eau. Cuis 25 min jusqu'à ce que ce soit crémeux. Sers avec du riz.",
 "Rince les lentilles avant de les cuire pour enlever l'écume.");
M('curry', "Inde", "Poulet au curry",
 "Poulet en morceaux, 2 oignons, 2 tomates, ail, gingembre, curry en poudre, yaourt, huile, sel.",
 "Fais revenir l'oignon, l'ail et le gingembre. Ajoute le curry, le poulet et les tomates. Cuis 30 min à feu doux avec un peu d'eau, puis ajoute le yaourt.",
 "Fais revenir les épices dans l'huile pour libérer leurs arômes.");
M('riz-saute', "Chine", "Riz sauté aux légumes et aux œufs",
 "Riz cuit de la veille, 2 œufs, carottes, petits pois, oignon vert, sauce soja, huile, sel.",
 "Fais sauter les légumes dans l'huile très chaude. Pousse sur le côté, brouille les œufs. Ajoute le riz et la sauce soja, puis mélange 3 min.",
 "Le riz de la veille ne colle pas : il est parfait pour sauter.");
M('nouilles', "Chine", "Nouilles sautées aux légumes",
 "250 g de nouilles, carottes, chou, poivron, oignon, ail, sauce soja, huile.",
 "Cuis les nouilles et égoutte-les. Fais sauter les légumes émincés à feu vif avec l'ail. Ajoute les nouilles et la sauce soja, mélange 2 min.",
 "Coupe les légumes en fines lamelles : ils cuisent vite.");
M('onigiri', "Japon", "Onigiri (boules de riz)",
 "Riz rond cuit, sel, garniture (thon, œuf ou légumes), feuilles d'algue (facultatif).",
 "Mouille tes mains et sale-les. Prends du riz tiède, mets un peu de garniture au centre, referme et forme une boule ou un triangle. Enveloppe d'algue.",
 "Mouille tes mains : le riz ne colle pas aux doigts.");
M('miso', "Japon", "Soupe miso",
 "800 ml d'eau, 2 c. à soupe de pâte miso, tofu en dés, oignon vert, algues (facultatif).",
 "Chauffe l'eau avec le tofu et les algues. Hors du feu, délaye le miso. Ajoute l'oignon vert et sers tout de suite.",
 "Ne fais pas bouillir le miso : il perdrait son goût.");
M('tom-yum', "Thaïlande", "Soupe parfumée à la citronnelle",
 "1 L d'eau, 2 tiges de citronnelle, gingembre, citron vert, champignons, crevettes ou poulet, piment, sauce de poisson.",
 "Fais bouillir l'eau avec la citronnelle et le gingembre. Ajoute champignons et crevettes, cuis 5 min. Ajoute le citron vert et la sauce hors du feu.",
 "Ajoute le citron à la fin : il garde toute sa fraîcheur.");
M('rouleaux', "Vietnam", "Rouleaux de printemps",
 "Galettes de riz, vermicelles de riz, salade, carottes, concombre, menthe, crevettes ou œuf, sauce.",
 "Trempe une galette dans l'eau tiède. Garnis avec vermicelles, légumes, herbes et crevettes. Roule en repliant les côtés. Sers avec une sauce.",
 "Ne trempe la galette que quelques secondes : elle continue à ramollir.");
M('pho', "Vietnam", "Soupe de nouilles au poulet",
 "Poulet, nouilles de riz, oignon, gingembre, anis étoilé, sauce de poisson, herbes fraîches, citron vert.",
 "Fais bouillir le poulet avec l'oignon, le gingembre et l'anis étoilé 40 min. Cuis les nouilles à part. Sers le bouillon sur les nouilles avec les herbes.",
 "Un bouillon cuit doucement est clair et très parfumé.");
M('guacamole', "Mexique", "Guacamole",
 "2 avocats mûrs, 1 tomate, 1 oignon, citron vert, coriandre, piment, sel.",
 "Écrase les avocats à la fourchette. Ajoute la tomate et l'oignon en petits dés, le citron, la coriandre, le piment et le sel. Mélange.",
 "Le citron évite que l'avocat noircisse.");
M('tacos', "Mexique", "Tacos au poulet",
 "Tortillas, poulet cuit effiloché, salade, tomate, oignon, fromage, citron, piment, sauce.",
 "Réchauffe les tortillas à la poêle. Garnis avec le poulet, la salade, la tomate et l'oignon. Ajoute du citron et de la sauce.",
 "Prépare les garnitures à l'avance pour que chacun compose son taco.");
M('quesadilla', "Mexique", "Quesadillas au fromage",
 "Tortillas, fromage râpé, haricots ou poulet (facultatif), un peu d'huile.",
 "Mets le fromage sur une tortilla, ajoute la garniture, replie ou couvre avec une seconde tortilla. Dore 2 min de chaque côté jusqu'à ce que le fromage fonde.",
 "Feu moyen : le fromage fond sans que la tortilla brûle.");
M('riz-haricots-br', "Brésil", "Riz et haricots noirs",
 "Riz, haricots noirs cuits, oignon, ail, huile, laurier, sel.",
 "Cuis le riz avec un peu d'ail et d'huile. Fais revenir l'oignon et l'ail, ajoute les haricots et le laurier, mijote 15 min. Sers ensemble.",
 "Écrase quelques haricots dans la sauce : elle devient crémeuse.");
M('pancakes', "États-Unis", "Pancakes",
 "200 g de farine, 1 sachet de levure, 2 c. à soupe de sucre, 1 œuf, 250 ml de lait, une pincée de sel, huile.",
 "Mélange les ingrédients secs, ajoute l'œuf et le lait. Cuis de petites louches dans une poêle chaude jusqu'aux bulles, retourne 1 min.",
 "Ne mélange pas trop la pâte : les pancakes restent moelleux.");
M('houmous', "Liban", "Houmous",
 "250 g de pois chiches cuits, 2 c. à soupe de purée de sésame, 1 gousse d'ail, citron, huile d'olive, sel, eau.",
 "Mixe les pois chiches avec la purée de sésame, l'ail, le citron et un peu d'eau jusqu'à une crème lisse. Ajoute un filet d'huile.",
 "Ajoute l'eau petit à petit pour obtenir la texture voulue.");
M('taboule', "Liban", "Taboulé libanais",
 "Persil frais, menthe, tomates, oignon, boulgour fin, citron, huile d'olive, sel.",
 "Trempe le boulgour avec le jus de citron. Hache finement le persil, la menthe, les tomates et l'oignon. Mélange avec l'huile et le sel.",
 "Beaucoup de persil et peu de boulgour : c'est la clé.");
M('salade-berger', "Turquie", "Salade du berger",
 "Tomates, concombre, oignon, poivron, persil, huile d'olive, citron, sel.",
 "Coupe tous les légumes en petits dés. Ajoute le persil haché. Assaisonne avec l'huile d'olive, le citron et le sel.",
 "Des dés de même taille rendent la salade plus agréable.");
M('kofte', "Turquie", "Köfte (boulettes de viande)",
 "500 g de viande hachée, 1 oignon râpé, persil, cumin, paprika, sel, poivre, un peu de chapelure.",
 "Mélange tous les ingrédients et pétris 5 min. Forme des petites boulettes allongées. Grille ou fais cuire à la poêle 10 min en les retournant.",
 "Mouille tes mains pour former les boulettes sans que ça colle.");
M('riz-haricots-ht', "Haïti", "Riz collé aux haricots",
 "Riz, haricots rouges cuits, oignon, ail, thym, huile, sel, bouillon des haricots.",
 "Fais revenir l'oignon et l'ail, ajoute le bouillon des haricots et le thym. Ajoute le riz, cuis à couvert 20 min. Mélange avec les haricots.",
 "Utilise le bouillon des haricots : il donne beaucoup de goût au riz.");
M('poulet-epice', "Jamaïque", "Poulet épicé à la jamaïcaine",
 "Poulet en morceaux, oignons verts, ail, thym, piment, gingembre, sauce soja, citron vert, huile, sel.",
 "Mixe les oignons verts, l'ail, le thym, le piment, le gingembre, la sauce soja et le citron. Marine le poulet 2 h, puis cuis-le 45 min à 200 °C en le retournant.",
 "Plus la marinade dure, plus la viande est parfumée.");
})();

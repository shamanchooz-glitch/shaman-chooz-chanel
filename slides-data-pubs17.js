/* ==========================================================
   PUBS 17 — RECETTES SIMPLES D'AUTRES PAYS D'AFRIQUE (30 nouveaux diaporamas avec ta photo)
   Utilise l'outil window.SCC_RECIPE défini dans slides-data-pubs16.js (qui doit être chargé avant).
   Recettes de famille simplifiées, quantités pour environ 4 personnes.
   Les identifiants commencent par « ra- ».
   Pour ajouter une recette : une ligne R(...) ci-dessous = 1 nouvelle vidéo.
   ========================================================== */
(function(){
if(!window.SCCS || !window.SCC_RECIPE) return;
const R = (id, lieu, titre, ingr, prepa, astuce) => SCC_RECIPE('ra', lieu, id, titre, ingr, prepa, astuce);

R('thieboudienne', "Sénégal", "Thiéboudienne (riz au poisson)",
 "Riz, poisson en morceaux, 2 tomates, concentré de tomate, oignon, carottes, chou, aubergine, ail, piment, huile, sel.",
 "Fais revenir oignon, ail et tomate, ajoute eau, poisson et légumes. Retire-les cuits. Cuis le riz dans le bouillon restant, puis sers avec poisson et légumes.",
 "Garde le bouillon de cuisson : c'est lui qui donne le goût au riz.");
R('yassa', "Sénégal", "Yassa au poulet",
 "Poulet en morceaux, 6 oignons, 3 citrons, 2 c. à soupe de moutarde, huile, ail, piment, sel.",
 "Marine le poulet avec le citron, la moutarde et l'ail. Grille-le, puis mijote-le avec les oignons émincés pendant 30 min. Sers avec du riz.",
 "Beaucoup d'oignons, cuits doucement, font toute la sauce.");
R('thiakry', "Sénégal", "Thiakry (dessert au mil et au lait caillé)",
 "Couscous de mil précuit, yaourt nature ou lait caillé, sucre, vanille, raisins secs.",
 "Cuis le couscous de mil à la vapeur et laisse refroidir. Mélange avec le yaourt, le sucre, la vanille et les raisins secs. Sers frais.",
 "Prépare-le quelques heures avant : il est meilleur bien frais.");
R('to-mil', "Mali", "Tô de mil",
 "300 g de farine de mil, 1 L d'eau, une pincée de sel ; sauce au choix (gombo, feuilles).",
 "Fais bouillir l'eau. Verse la farine petit à petit en tournant avec une spatule en bois jusqu'à obtenir une pâte lisse et épaisse. Sers avec la sauce.",
 "Verse la farine en pluie et tourne sans arrêt : pas de grumeaux.");
R('zoom-koom', "Burkina Faso", "Zoom-koom (boisson de mil)",
 "4 c. à soupe de farine de mil, 1 L d'eau, gingembre, citron, sucre.",
 "Délaye la farine dans un peu d'eau. Fais cuire 10 min dans le reste de l'eau. Laisse refroidir, ajoute gingembre râpé, citron et sucre.",
 "Bois-la bien fraîche, préparée le jour même.");
R('jollof', "Ghana", "Jollof rice",
 "Riz, 4 tomates mixées, 1 poivron, 1 oignon, concentré de tomate, huile, piment, épices, sel, bouillon.",
 "Mixe tomates, poivron et oignon. Fais cuire cette sauce dans l'huile 15 min. Ajoute le riz lavé et le bouillon, couvre, cuis à feu doux 25 min.",
 "Un couvercle bien fermé donne un riz moelleux et parfumé.");
R('kelewele', "Ghana", "Kelewele (bananes plantain épicées)",
 "3 bananes plantain bien mûres, gingembre râpé, piment en poudre, ail, sel, huile de friture.",
 "Coupe les bananes en dés. Mélange avec le gingembre, l'ail, le piment et le sel. Laisse reposer 10 min, puis fais frire jusqu'à ce qu'ils soient dorés.",
 "Ajuste le piment : très doux pour les enfants.");
R('egusi', "Nigeria", "Soupe egusi",
 "Graines de courge moulues (egusi), feuilles vertes, poisson ou viande, oignon, tomate, huile, piment, sel.",
 "Fais cuire oignon et tomate, ajoute les graines délayées et forme de petits amas. Ajoute la viande ou le poisson, l'eau et les feuilles, cuis 25 min.",
 "Ne remue pas trop au début : les graines forment de petits amas.");
R('puff-puff', "Nigeria", "Puff-puff (petits beignets)",
 "300 g de farine, 1 c. à café de levure, 4 c. à soupe de sucre, une pincée de sel, eau tiède, huile de friture.",
 "Mélange tout avec l'eau tiède jusqu'à une pâte épaisse et souple. Laisse gonfler 1 h. Fais tomber des cuillerées dans l'huile chaude jusqu'à ce qu'elles soient dorées.",
 "Laisse bien lever : les beignets seront plus aériens.");
R('akara', "Nigeria", "Akara (beignets de haricots)",
 "300 g de haricots niébé, 1 oignon, piment, sel, huile de friture.",
 "Trempe les haricots, retire les peaux, mixe avec l'oignon et le piment. Fouette la pâte, puis fais frire des cuillerées dans l'huile chaude.",
 "Fouette longtemps : la pâte devient légère et les beignets gonflent.");
R('ndole', "Cameroun", "Ndolé (version simple)",
 "Feuilles de ndolé (ou épinards), arachides, viande ou crevettes, oignon, ail, huile, sel.",
 "Fais bouillir les feuilles pour enlever l'amertume. Mixe les arachides et fais-les cuire. Ajoute viande ou crevettes, feuilles et oignon frit, cuis 20 min.",
 "Presse bien les feuilles pour une amertume plus douce.");
R('poulet-dg', "Cameroun", "Poulet DG",
 "Poulet en morceaux, bananes plantain, carottes, haricots verts, poivron, oignon, ail, huile, sel.",
 "Fais frire le poulet et les plantains. Fais sauter les légumes avec l'ail. Mélange le tout et laisse mijoter 10 min.",
 "Ne cuis pas trop les légumes : ils restent croquants et colorés.");
R('riz-feuilles', "Guinée", "Riz à la sauce de feuilles",
 "Riz, feuilles (manioc, patate douce ou épinards), poisson fumé, oignon, huile, piment, sel.",
 "Lave et hache les feuilles. Fais-les cuire avec l'oignon, le poisson et un peu d'huile pendant 30 min. Sers avec du riz.",
 "Plus la cuisson est lente, plus la sauce est parfumée.");
R('pondu', "RD Congo", "Pondu (feuilles de manioc)",
 "Feuilles de manioc pilées (ou épinards), poisson fumé, oignon, ail, huile, piment, sel.",
 "Fais bouillir les feuilles pilées 30 min. Ajoute l'oignon, l'ail, le poisson et un peu d'huile. Cuis encore 20 min. Sers avec du riz ou du manioc.",
 "Bien cuites, les feuilles sont tendres et sans amertume.");
R('moambe', "RD Congo", "Poulet à la moambe (version simple)",
 "Poulet, crème de noix de palme (ou pâte d'arachide), oignon, ail, piment, sel.",
 "Fais dorer le poulet avec l'oignon et l'ail. Ajoute la crème de noix de palme et un peu d'eau. Mijote 40 min. Sers avec du riz ou du manioc.",
 "Tu peux remplacer la noix de palme par de la pâte d'arachide.");
R('saka-saka', "Congo-Brazzaville", "Saka-saka au poisson",
 "Feuilles de manioc pilées, poisson fumé ou frais, oignon, ail, huile de palme, sel, piment.",
 "Cuis les feuilles 30 min dans l'eau. Ajoute le poisson, l'oignon, l'ail et l'huile de palme. Mijote 20 min à feu doux.",
 "Garde le feu doux pour que les feuilles ne brûlent pas.");
R('nyembwe', "Gabon", "Poulet nyembwe (version simple)",
 "Poulet, crème de noix de palme, oignon, ail, gingembre, piment, sel.",
 "Fais dorer le poulet avec l'oignon et l'ail. Ajoute la crème de noix de palme et l'eau. Mijote 40 min jusqu'à ce que la sauce épaississe.",
 "Sers avec du manioc ou du riz pour bien profiter de la sauce.");
R('tajine', "Maroc", "Tajine de poulet aux olives et au citron",
 "Poulet, 2 oignons, ail, olives, 1 citron confit (ou citron), gingembre, curcuma, huile d'olive, sel, coriandre.",
 "Fais revenir l'oignon avec les épices, ajoute le poulet et un peu d'eau. Cuis 40 min à couvert. Ajoute olives et citron, cuis encore 10 min.",
 "Cuis à feu doux et à couvert : la viande devient très tendre.");
R('couscous', "Maroc", "Couscous aux sept légumes",
 "Semoule, carottes, courgettes, navets, pois chiches cuits, oignon, courge, viande (facultatif), épices, huile, sel.",
 "Fais cuire les légumes et la viande dans un bouillon épicé. Hydrate la semoule avec de l'eau et un peu d'huile, puis chauffe-la à la vapeur. Sers ensemble.",
 "Égrène la semoule à la fourchette pour éviter les paquets.");
R('harira', "Maroc", "Harira (soupe de légumes et de lentilles)",
 "Lentilles, pois chiches cuits, tomates, oignon, céleri, coriandre, persil, un peu de farine, épices, sel, eau.",
 "Fais cuire tous les légumes et les lentilles dans l'eau avec les épices pendant 40 min. Ajoute un peu de farine délayée pour épaissir.",
 "Un filet de citron avant de servir relève le goût.");
R('the-menthe', "Maroc", "Thé à la menthe",
 "Thé vert, feuilles de menthe fraîche, sucre, eau bouillante.",
 "Rince le thé avec un peu d'eau chaude. Ajoute la menthe, le sucre et l'eau bouillante dans la théière. Laisse infuser 5 min. Sers de haut.",
 "Verser de haut fait mousser le thé : c'est la tradition.");
R('brik', "Tunisie", "Brik à l'œuf",
 "Feuilles de brick, œufs, thon, persil, câpres, citron, huile de friture, sel.",
 "Mets thon, persil et câpres sur une feuille. Casse un œuf dessus, plie en triangle. Fais frire 1 à 2 min de chaque côté.",
 "Ne perce pas la feuille : l'œuf reste coulant à l'intérieur.");
R('mechouia', "Tunisie", "Salade méchouia (poivrons grillés)",
 "3 poivrons, 3 tomates, 1 piment, 2 gousses d'ail, huile d'olive, citron, sel.",
 "Grille poivrons, tomates et piment. Épluche, coupe finement avec l'ail. Mélange avec l'huile d'olive, le citron et le sel.",
 "Épluche les poivrons encore tièdes pour que la peau parte facilement.");
R('koshari', "Égypte", "Koshari",
 "Riz, lentilles, pâtes, sauce tomate, oignons frits, pois chiches cuits, vinaigre, ail, sel.",
 "Cuis séparément riz, lentilles et pâtes. Prépare une sauce tomate à l'ail. Superpose dans un plat, ajoute les pois chiches, la sauce et les oignons frits.",
 "Les oignons bien dorés donnent tout le goût du plat.");
R('ful', "Égypte", "Ful medames (fèves)",
 "Fèves cuites, ail, huile d'olive, citron, cumin, persil, sel, pain.",
 "Réchauffe les fèves avec un peu d'eau. Écrase légèrement, ajoute ail, cumin, huile et citron. Sers avec du persil et du pain.",
 "Un œuf dur à côté fait un repas complet.");
R('misir-wot', "Éthiopie", "Misir wot (lentilles épicées)",
 "250 g de lentilles corail, 2 oignons, 2 gousses d'ail, gingembre, mélange d'épices berbéré, huile, sel.",
 "Fais revenir les oignons, l'ail et le gingembre avec les épices. Ajoute les lentilles et l'eau. Cuis 25 min en remuant jusqu'à une purée épaisse.",
 "Sers avec du pain ou une galette pour manger à la main.");
R('ugali', "Kenya", "Ugali avec du sukuma wiki",
 "Farine de maïs, eau, sel ; chou vert, oignon, tomate, huile.",
 "Fais bouillir l'eau salée, verse la farine et tourne fort jusqu'à une pâte ferme. Fais sauter le chou avec l'oignon et la tomate. Sers ensemble.",
 "Tourne vigoureusement à la spatule pour une pâte bien lisse.");
R('pap', "Afrique du Sud", "Pap avec une sauce de tomates",
 "Farine de maïs, eau, sel ; tomates, oignon, piment, huile.",
 "Cuis la farine dans l'eau salée en remuant jusqu'à ce qu'elle soit épaisse. Prépare la sauce en faisant cuire oignon, tomates et piment. Sers ensemble.",
 "Laisse cuire à feu doux 20 min : le pap n'a plus le goût de farine crue.");
R('romazava', "Madagascar", "Romazava (bouillon de viande et de feuilles)",
 "Viande de bœuf, feuilles (brèdes ou épinards), tomate, oignon, gingembre, ail, huile, sel, eau.",
 "Fais revenir la viande avec l'oignon, la tomate et le gingembre. Ajoute l'eau et cuis 40 min. Ajoute les feuilles et cuis 10 min. Sers avec du riz.",
 "Ajoute les feuilles à la fin pour qu'elles gardent leur couleur.");
R('chapati', "Kenya", "Chapati (galettes)",
 "300 g de farine, 1 c. à soupe d'huile, 1 c. à café de sel, eau tiède, huile pour la poêle.",
 "Pétris farine, sel, huile et eau jusqu'à une pâte souple. Laisse reposer 30 min. Étale en rond, cuis à la poêle 2 min de chaque côté.",
 "Une pâte bien reposée se laisse étaler très facilement.");
})();

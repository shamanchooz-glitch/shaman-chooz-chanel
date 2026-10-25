/* ==========================================================
   PUBS 15 — LA CUISINE PAR PAYS (140 nouveaux diaporamas avec ta photo)
   35 pays × 4 vidéos : « plats à connaître », « petit déjeuner », « goûter et petites faims »
   (catégorie « Cuisine du monde ») et « cuisiner les plats du pays : un savoir-faire de la maison »
   (catégorie « Agence », avec la page « Contactez-nous » à la fin).
   Présentations générales et simples des habitudes de chaque pays : chaque famille cuisine à sa façon.
   Aucune promesse de visa, d'emploi garanti ou de salaire.
   Les identifiants commencent par « cm- » (cuisine du monde) et « cp- » (cuisine, agence).
   Pour ajouter un pays : une ligne P(...) ci-dessous = 4 nouvelles vidéos.
   ========================================================== */
(function(){
if(!window.SCCS) return;
const PAYS = [];
/* P(id, continent, « en … », « de … », [plat 1, description], [plat 2, description], petit déjeuner, goûter / petite faim, ingrédients de base) */
const P = (id, co, en, de, a, b, pd, g, base) => PAYS.push({ id, co, en, de, a, b, pd, g, base });
const AF = '🌍', AM = '🌎', AS = '🌏', EU = '🌍';

/* ---------- Afrique ---------- */
P('ci', AF, "en Côte d'Ivoire", "de Côte d'Ivoire",
 ["L'attiéké avec du poisson braisé","Une semoule de manioc servie avec du poisson grillé, des oignons, de la tomate et du piment."],
 ["Le kedjenou","Un plat de poulet ou de poisson mijoté à l'étouffée avec des légumes, dans un récipient bien fermé."],
 "Pain avec du beurre ou une omelette, café au lait ou bouillie : un petit déjeuner simple et chaud.",
 "L'aloco, des bananes plantain frites, ou des beignets, souvent vendus au coin de la rue.",
 "Le manioc, la banane plantain, l'igname, le riz, la tomate et le piment.");
P('sn', AF, "au Sénégal", "du Sénégal",
 ["Le thiéboudienne","Le grand plat de riz au poisson et aux légumes, très apprécié en famille."],
 ["Le yassa au poulet","Du poulet mariné avec beaucoup d'oignons et du citron, servi avec du riz."],
 "Du pain avec du beurre ou une pâte à tartiner, accompagné de café ou de thé, ou une bouillie à base de mil.",
 "Les fataya, des petits chaussons frits garnis, et les beignets.",
 "Le riz, le poisson, l'oignon, le citron, l'arachide et le mil.");
P('ml', AF, "au Mali", "du Mali",
 ["Le tô et sa sauce","Une pâte épaisse de mil ou de maïs, servie avec une sauce de légumes comme le gombo."],
 ["La sauce d'arachide","Une sauce à base de pâte d'arachide, servie avec du riz et de la viande ou du poisson."],
 "Une bouillie de mil ou de riz, ou du pain avec un peu de beurre, et une boisson chaude.",
 "Des beignets et des fruits de saison comme la mangue.",
 "Le mil, le sorgho, le maïs, le riz, l'arachide et les légumes feuilles.");
P('bf', AF, "au Burkina Faso", "du Burkina Faso",
 ["Le tô avec une sauce","Une pâte de mil, de sorgho ou de maïs, servie avec une sauce aux feuilles ou au gombo."],
 ["Le riz sauce","Du riz accompagné d'une sauce tomate ou d'arachide avec de la viande ou du poisson."],
 "Une bouillie de mil ou de maïs, parfois avec du pain.",
 "Une boisson fraîche à base de mil, ou des fruits de saison.",
 "Le mil, le sorgho, le maïs, le niébé (haricot) et l'arachide.");
P('gh', AF, "au Ghana", "du Ghana",
 ["Le jollof rice","Du riz cuit dans une sauce de tomate, de poivron et d'épices, souvent servi lors des fêtes."],
 ["Le fufu avec une soupe","Une pâte d'igname ou de manioc que l'on mange avec une soupe parfumée."],
 "Une bouillie de céréales épicée ou du pain, avec une boisson chaude.",
 "Le kelewele, des bananes plantain frites et épicées.",
 "L'igname, le manioc, la banane plantain, le riz, la tomate et le piment.");
P('ng', AF, "au Nigeria", "du Nigeria",
 ["Le jollof rice","Un plat de riz à la tomate et aux épices, célèbre dans toute l'Afrique de l'Ouest."],
 ["La soupe egusi","Une soupe à base de graines de courge, souvent servie avec de l'igname pilée."],
 "Les akara, des beignets de haricots, avec une bouillie de maïs.",
 "Les puff-puff, de petits beignets moelleux.",
 "L'igname, les haricots, le riz, le poivron, le piment et le maïs.");
P('cm', AF, "au Cameroun", "du Cameroun",
 ["Le ndolé","Un plat de feuilles légèrement amères, d'arachides et de viande ou de crevettes, souvent servi avec du plantain."],
 ["Le poulet DG","Du poulet accompagné de plantains frits et de légumes variés."],
 "Des beignets avec des haricots et une bouillie, un petit déjeuner très répandu.",
 "Des beignets, des fruits ou du maïs grillé.",
 "Le plantain, le manioc, l'arachide, les feuilles et l'huile de palme.");
P('bj', AF, "au Bénin", "du Bénin",
 ["La pâte de maïs avec une sauce","Une pâte de maïs servie avec une sauce tomate au poisson ou à la viande."],
 ["Le wagashi en sauce","Du fromage peul cuit dans une sauce relevée, très apprécié au Bénin."],
 "Une bouillie de maïs avec des beignets.",
 "Du gari avec des arachides ou du sucre, et des beignets.",
 "Le maïs, l'igname, le manioc, le piment et le poisson.");
P('tg', AF, "au Togo", "du Togo",
 ["La pâte de maïs avec une sauce","Une pâte de maïs que l'on mange avec une sauce de légumes, de poisson ou de viande."],
 ["Le fufu","Une pâte d'igname ou de manioc pilée, servie avec une sauce parfumée."],
 "Une bouillie de maïs, du pain ou des beignets.",
 "Des beignets et des fruits de saison.",
 "Le maïs, l'igname, le manioc, la tomate et l'huile de palme.");
P('gn', AF, "en Guinée", "de Guinée",
 ["Le riz avec une sauce de feuilles","Du riz accompagné d'une sauce de feuilles de manioc ou de patate douce."],
 ["Le poisson braisé avec du riz","Du poisson grillé servi avec du riz et une sauce pimentée."],
 "Du pain avec une omelette ou une bouillie de riz.",
 "Des beignets et des fruits comme l'ananas et la mangue.",
 "Le riz, les feuilles, l'arachide, le poisson et l'huile de palme.");
P('cd', AF, "en RD Congo", "de RD Congo",
 ["Le pondu","Des feuilles de manioc pilées et mijotées, servies avec du riz ou une pâte de manioc."],
 ["Le poulet à la moambe","Du poulet cuit dans une sauce à base de noix de palme."],
 "Du pain avec du beurre ou des beignets, accompagné d'une boisson chaude.",
 "Des beignets, des bananes ou des cacahuètes.",
 "Le manioc, les feuilles de manioc, la banane plantain et l'huile de palme.");
P('cg', AF, "au Congo-Brazzaville", "du Congo-Brazzaville",
 ["Le saka-saka avec du poisson","Des feuilles de manioc pilées, cuites avec du poisson ou de la viande."],
 ["Le poulet moambé","Du poulet cuit dans une sauce à la noix de palme, avec du manioc."],
 "Du pain avec une omelette ou du beurre, et une boisson chaude.",
 "Des beignets et des fruits de saison.",
 "Le manioc (comme la chikwangue), le poisson, les feuilles et la noix de palme.");
P('ga', AF, "au Gabon", "du Gabon",
 ["Le poulet nyembwe","Du poulet cuit dans une sauce à base de noix de palme."],
 ["Le poisson braisé avec du manioc","Du poisson grillé servi avec du bâton de manioc."],
 "Du pain avec du beurre ou une bouillie, et une boisson chaude.",
 "Des fruits de saison et des beignets.",
 "Le manioc, la banane plantain, le poisson et la noix de palme.");
P('ma', AF, "au Maroc", "du Maroc",
 ["Le tajine","Un plat mijoté de viande ou de poulet avec des légumes, cuit dans un plat en terre à couvercle conique."],
 ["Le couscous","De la semoule cuite à la vapeur, servie avec des légumes et de la viande, souvent le vendredi."],
 "Du pain, de l'huile d'olive, du miel ou le msemen (crêpe feuilletée), avec du thé à la menthe.",
 "Le thé à la menthe avec de petits gâteaux.",
 "La semoule, les pois chiches, les olives, les épices et les légumes.");
P('dz', AF, "en Algérie", "d'Algérie",
 ["Le couscous","De la semoule à la vapeur servie avec des légumes et de la viande ou du poulet."],
 ["La chorba","Une soupe épaisse et parfumée, très présente pendant le mois de Ramadan."],
 "Du café au lait avec du pain ou des galettes.",
 "Le makroud, un gâteau de semoule fourré aux dattes.",
 "La semoule, les pois chiches, la tomate, les épices et les dattes.");
P('tn', AF, "en Tunisie", "de Tunisie",
 ["Le couscous","De la semoule à la vapeur avec des légumes et du poisson ou de la viande."],
 ["Le brik","Une feuille croustillante frite, garnie d'œuf, de thon ou de viande."],
 "Du pain avec de l'huile d'olive, des olives, un œuf, et du café ou du thé.",
 "Le bambalouni, un beignet sucré.",
 "La semoule, l'huile d'olive, la harissa, les olives et les légumes.");
P('eg', AF, "en Égypte", "d'Égypte",
 ["Le koshari","Un plat de riz, de lentilles et de pâtes avec une sauce tomate et des oignons frits."],
 ["Le ful medames","Des fèves cuites lentement, assaisonnées d'huile et de citron, mangées avec du pain."],
 "Du ful avec du pain, ou des falafels (appelés ta'amiya).",
 "Le basbousa, un gâteau de semoule sucré.",
 "Les fèves, les lentilles, le riz et le pain.");
P('et', AF, "en Éthiopie", "d'Éthiopie",
 ["L'injera avec un ragoût","Une grande galette souple de teff, servie avec des ragoûts épicés."],
 ["Le doro wat","Un ragoût de poulet épicé, plat des grandes fêtes."],
 "De l'injera ou du pain avec des œufs, et du café.",
 "Le café, préparé lors d'une cérémonie conviviale, avec des grains grillés ou de petits pains.",
 "Le teff, les lentilles, le berbéré (mélange d'épices) et les œufs.");
P('ke', AF, "au Kenya", "du Kenya",
 ["L'ugali avec du sukuma wiki","Une pâte de maïs servie avec du chou vert sauté."],
 ["Le nyama choma","De la viande grillée au feu, très populaire pour les moments en famille."],
 "Le mandazi (beignet léger) avec du thé au lait.",
 "Les mandazi et les fruits de saison.",
 "Le maïs, les haricots, le chou vert et la viande.");
P('za', AF, "en Afrique du Sud", "d'Afrique du Sud",
 ["Le braai","Un grand barbecue en famille ou entre amis."],
 ["Le pap avec une sauce","Une bouillie épaisse de maïs servie avec une sauce épicée ou de la viande."],
 "Une bouillie de maïs chaude ou du pain avec des œufs.",
 "Le vetkoek, un beignet salé ou garni.",
 "Le maïs, la viande, les légumes épicés et le pain.");
P('mg', AF, "à Madagascar", "de Madagascar",
 ["Le romazava","Un bouillon de viande avec des feuilles appelées brèdes, accompagné de riz."],
 ["Le riz avec des brèdes","Le riz est la base du repas, avec un accompagnement de légumes feuilles ou de viande."],
 "Du riz, ou du pain avec du café.",
 "Les mofo gasy, de petits pains sucrés, avec du café ou du thé.",
 "Le riz, les brèdes, le zébu, le gingembre et la tomate.");

/* ---------- Europe ---------- */
P('fr', EU, "en France", "de France",
 ["Le pot-au-feu","De la viande et des légumes mijotés longuement dans un bouillon."],
 ["Le gratin dauphinois","Des pommes de terre cuites au four avec de la crème."],
 "Du pain avec du beurre et de la confiture, avec du café, du chocolat chaud ou du lait.",
 "Une tartine de pain avec du chocolat ou un fruit : le goûter de beaucoup d'enfants.",
 "Le pain, le fromage, le beurre, les légumes et les pommes de terre.");
P('it', EU, "en Italie", "d'Italie",
 ["Les pâtes","Il en existe de très nombreuses formes, servies avec des sauces à la tomate, aux légumes ou à la viande."],
 ["La pizza","Une pâte au four garnie de tomate, de fromage et d'autres ingrédients."],
 "Un café ou un cappuccino avec une petite viennoiserie.",
 "Un fruit, une tartine ou une glace.",
 "Le blé, l'huile d'olive, la tomate, le fromage et les herbes.");
P('es', EU, "en Espagne", "d'Espagne",
 ["La paella","Un plat de riz cuit avec du safran, des légumes, du poisson ou de la viande."],
 ["La tortilla de patatas","Une grosse omelette épaisse aux pommes de terre."],
 "Du pain grillé avec de l'huile d'olive et de la tomate, et un café.",
 "Les churros avec du chocolat chaud.",
 "L'huile d'olive, le riz, la pomme de terre, la tomate et les œufs.");
P('pt', EU, "au Portugal", "du Portugal",
 ["Le bacalhau","De la morue préparée de nombreuses façons, plat très aimé."],
 ["Le caldo verde","Une soupe de pommes de terre et de chou."],
 "Du pain avec du fromage ou du jambon, et un café ou du lait.",
 "Le pastel de nata, une petite pâtisserie à la crème.",
 "La morue, la pomme de terre, le chou, l'huile d'olive et le pain.");

/* ---------- Moyen-Orient ---------- */
P('lb', AS, "au Liban", "du Liban",
 ["Le houmous","Une crème de pois chiches avec de l'huile d'olive et du citron."],
 ["Le taboulé","Une salade fraîche de persil, de tomate et de boulgour."],
 "Le manoushé, un pain plat garni d'herbes et d'huile d'olive.",
 "Des fruits frais ou des fruits secs.",
 "Les pois chiches, le persil, le citron, l'huile d'olive et le boulgour.");
P('tr', AS, "en Turquie", "de Turquie",
 ["Les köfte","Des boulettes de viande grillées ou cuites à la poêle, servies avec du pain et des légumes."],
 ["La pide","Un pain en forme de bateau, garni de viande ou de fromage."],
 "Un grand petit déjeuner : fromage, olives, œuf, tomate, concombre et thé.",
 "Le simit, un pain en anneau aux graines de sésame, avec du thé.",
 "Le blé, le yaourt, l'aubergine, la tomate et la viande.");

/* ---------- Asie ---------- */
P('in', AS, "en Inde", "d'Inde",
 ["Le dal","Un plat de lentilles cuites avec des épices, servi avec du riz ou du pain."],
 ["Le biryani","Du riz parfumé cuit avec des épices et de la viande, du poulet ou des légumes."],
 "Dans le sud, des idli ou des dosa ; dans le nord, des parathas.",
 "Les samosas avec du thé au lait épicé.",
 "Les lentilles, le riz, les épices, les légumes et le yaourt.");
P('cn', AS, "en Chine", "de Chine",
 ["Le riz sauté","Du riz sauté avec des légumes, des œufs et de la viande."],
 ["Les raviolis jiaozi","De petites pâtes farcies, cuites à l'eau ou à la vapeur."],
 "Une bouillie de riz appelée congee, avec des accompagnements variés.",
 "Les baozi, des petits pains cuits à la vapeur.",
 "Le riz, les nouilles, les légumes sautés et la sauce soja.");
P('jp', AS, "au Japon", "du Japon",
 ["Les sushis","Du riz vinaigré garni de poisson cru ou de légumes."],
 ["Le ramen","Une soupe de nouilles avec du bouillon, des légumes et de la viande."],
 "Du riz, une soupe miso et du poisson grillé.",
 "Les onigiri, des boules de riz garnies.",
 "Le riz, le poisson, les algues et le soja.");
P('th', AS, "en Thaïlande", "de Thaïlande",
 ["Le pad thaï","Des nouilles de riz sautées avec des légumes, des œufs et des cacahuètes."],
 ["La soupe tom yum","Une soupe parfumée à la citronnelle, au citron vert et au piment."],
 "Le jok, une bouillie de riz, ou des œufs avec du riz.",
 "Des fruits tropicaux, ou le riz gluant à la mangue.",
 "Le riz, la citronnelle, le piment, le citron vert et la sauce de poisson.");
P('vn', AS, "au Vietnam", "du Vietnam",
 ["Le phở","Une soupe de nouilles de riz au bouillon parfumé, avec des herbes fraîches."],
 ["Les rouleaux de printemps","Des galettes de riz roulées avec des légumes, des herbes et parfois des crevettes."],
 "Un bol de phở ou un banh mi, un sandwich garni dans un petit pain croustillant.",
 "Des fruits frais ou des rouleaux de printemps.",
 "Le riz, les herbes fraîches, la sauce de poisson et les légumes.");

/* ---------- Amériques ---------- */
P('br', AM, "au Brésil", "du Brésil",
 ["La feijoada","Un plat de haricots noirs mijotés avec de la viande, servi avec du riz."],
 ["Le pão de queijo","De petits pains moelleux au fromage."],
 "Du pain, du fromage et du café au lait, avec des fruits.",
 "Le pão de queijo ou des fruits frais.",
 "Les haricots, le riz, le manioc et les fruits tropicaux.");
P('mx', AM, "au Mexique", "du Mexique",
 ["Les tacos","Des galettes de maïs garnies de viande, de légumes et de sauces."],
 ["Les tamales","De la pâte de maïs garnie, enveloppée dans une feuille et cuite à la vapeur."],
 "Des œufs avec des haricots et des tortillas, comme les huevos rancheros.",
 "L'elote, un épi de maïs grillé.",
 "Le maïs, les haricots, le piment et la tomate.");
P('ht', AM, "en Haïti", "d'Haïti",
 ["Le riz djon-djon","Du riz parfumé avec des champignons noirs, un plat de fête."],
 ["Le griot","Des morceaux de porc frits, servis avec du pikliz (légumes épicés au vinaigre)."],
 "Du pain avec du café ou une bouillie de maïs.",
 "Les pâtés (petits chaussons) ou des bananes frites.",
 "Le riz, les haricots, la banane plantain et le piment.");

const CLOSE = [
 ['🧩',"Un seul métier","Pour SHAMAN CHOOZ, préparer les repas, faire le ménage et s'occuper des enfants, c'est le même travail."],
 ['📺',"Une chaîne du monde entier","Des vidéos tournent 24h/24 : cuisines du monde, repas, goûters et métiers. Partagez la chaîne !"],
 ['🌍',"Découvrir le monde par la cuisine","Chaque pays a ses saveurs. Goûter, c'est aussi apprendre à se connaître."],
 ['👩‍🍳',"La cuisine, un beau métier","Faire à manger pour une famille est un travail qui mérite le respect."]
];
const TIPS = [
 ["Un repas, partout pareil pour l'hygiène","Mains propres, eau propre et aliments bien conservés : ces règles valent dans tous les pays."],
 ["Bien cuire","Viande, poisson, œufs et poulet doivent toujours être bien cuits à l'intérieur."],
 ["Laver les fruits et les légumes","Un bon rinçage à l'eau propre protège toute la famille."],
 ["Séparer le cru du cuit","Une planche et un couteau différents pour la viande crue : un geste simple et important."]
];
PAYS.forEach((c, i) => {
 const t = TIPS[i % TIPS.length], cl = CLOSE[i % CLOSE.length];
 /* 1. Plats à connaître */
 SCCS.add('cm-' + c.id + '-plats', "La cuisine " + c.de + " : les plats à connaître", 'Cuisine du monde', 'orange', [
  [c.co, c.a[0], c.a[1]],
  ['🍲', c.b[0], c.b[1]],
  ['🌾', "Les ingrédients de base", c.base],
  cl ], { photo:true });
 /* 2. Petit déjeuner */
 SCCS.add('cm-' + c.id + '-petitdej', "Le petit déjeuner " + c.en, 'Cuisine du monde', 'or', [
  ['🌅', "Le petit déjeuner " + c.en, c.pd],
  ['🍽️', "Chaque pays, ses habitudes", "On prend le petit déjeuner selon les saveurs de chez soi. Découvrir celles des autres, c'est s'ouvrir au monde."],
  ['🙌', t[0], t[1]],
  CLOSE[(i + 1) % CLOSE.length] ], { photo:true });
 /* 3. Goûter et petites faims */
 SCCS.add('cm-' + c.id + '-gouter', "Goûter et petites faims " + c.en, 'Cuisine du monde', 'rose', [
  ['🥨', "Le goûter ou la petite faim " + c.en, c.g],
  ['🧒', "Pour les enfants", "Un goûter simple et pas trop sucré : un fruit, du pain, de l'eau. Les sucreries restent pour de rares occasions."],
  ['⚠️', "Prudence", "On mange assis, sous la surveillance d'un adulte, et on demande toujours aux parents s'il y a des allergies."],
  CLOSE[(i + 2) % CLOSE.length] ], { photo:true });
 /* 4. Cuisiner à la maison : agence */
 SCCS.add('cp-' + c.id + '-cuisiner', "Cuisiner les plats " + c.de + " : un savoir-faire de la maison", 'Agence', 'vert', [
  ['👩‍🍳', "Une cuisine qui s'apprend", "Pour réussir les plats " + c.de + ", il faut connaître les bases : " + c.base.charAt(0).toLowerCase() + c.base.slice(1)],
  ['🏡', "Un savoir-faire de la maison", "Savoir cuisiner les plats de sa famille ou de son pays est un vrai atout pour travailler dans une maison."],
  ['🧩', "Un seul métier", "Pour SHAMAN CHOOZ, la cuisine, le ménage et les enfants forment un même travail à respecter."],
  ['📞', "Contactez SHAMAN CHOOZ", "Familles et employeurs, dites-nous ce que vous cherchez. Candidates, inscrivez-vous : nous étudions chaque dossier sérieusement."] ], { photo:true });
});
})();

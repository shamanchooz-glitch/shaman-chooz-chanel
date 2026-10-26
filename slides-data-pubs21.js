/* ==========================================================
   PUBS 21 — FICHES PAYS (40) ET CULTURE GÉNÉRALE / ÉDUCATION (60) : 100 nouveaux diaporamas avec ta photo
   Fiches pays (catégorie « Géographie ») : capitale, langues, monnaie, région. 28 pays d'Afrique, 8 d'Europe, 4 du reste du monde.
   Culture générale (catégorie « Culture générale ») : science, nature, géographie, histoire, personnages, maths, vie quotidienne,
   pour les enfants comme pour les grandes personnes. Faits simples et bien connus.
   Les capitales, langues et monnaies peuvent évoluer : vérifie de temps en temps si besoin.
   Les identifiants commencent par « fp- » (fiches pays) et « cg- » (culture générale).
   Pour ajouter un pays : une ligne P(...) ; pour ajouter un sujet : une ligne K(...) = 1 nouvelle vidéo.
   ========================================================== */
(function(){
if(!window.SCCS) return;
const PAL = ['bleu','vert','orange','violet','turquoise','or','rose','terre','rouge','nuit'];
const CLOSE = [
 ['🌍',"Nos activités dans le monde","SHAMAN CHOOZ recrute et place du personnel de maison et d'autres métiers, dans tous les secteurs, partout dans le monde."],
 ['📺',"Une chaîne pour apprendre","Géographie, culture générale, recettes et astuces tournent 24h/24. Partagez la chaîne !"],
 ['🧩',"Un seul métier","Pour SHAMAN CHOOZ, faire le ménage, s'occuper des enfants et cuisiner, c'est le même travail."],
 ['📚',"Apprendre fait grandir","Chaque jour, une petite connaissance de plus : pour les enfants comme pour les grandes personnes."]
];
let kp = 0, kk = 0;

/* ---------- Fiches pays ---------- */
/* P(id, nom, émoji, capitale, langues, monnaie, région) */
const P = (id, nom, emo, cap, lang, mon, reg) => SCCS.add('fp-' + id, 'Fiche pays : ' + nom, 'Géographie', PAL[kp % PAL.length], [
 [emo, "La capitale", cap],
 ['🗣️', "Les langues", lang],
 ['💰', "La monnaie et la région", "Monnaie : " + mon + ". Région : " + reg + "."],
 CLOSE[kp++ % CLOSE.length] ], { photo:true });
const AO = "Afrique de l'Ouest", AC = "Afrique centrale", AN = "Afrique du Nord", AE = "Afrique de l'Est", AA = "Afrique australe";
const A = '🌍';

P('ci', "Côte d'Ivoire", A, "La capitale politique est Yamoussoukro et la capitale économique est Abidjan.", "La langue officielle est le français ; on parle aussi de nombreuses langues locales.", "le franc CFA (XOF)", AO);
P('sn', "Sénégal", A, "La capitale du Sénégal est Dakar.", "La langue officielle est le français ; le wolof est très répandu.", "le franc CFA (XOF)", AO);
P('ml', "Mali", A, "La capitale du Mali est Bamako.", "La langue officielle est le français ; le bambara est très parlé.", "le franc CFA (XOF)", AO);
P('bf', "Burkina Faso", A, "La capitale du Burkina Faso est Ouagadougou.", "La langue officielle est le français ; on parle aussi le mooré, le dioula et d'autres langues.", "le franc CFA (XOF)", AO);
P('gh', "Ghana", A, "La capitale du Ghana est Accra.", "La langue officielle est l'anglais ; on parle aussi l'akan, l'éwé et d'autres langues.", "le cédi", AO);
P('ng', "Nigeria", A, "La capitale du Nigeria est Abuja.", "La langue officielle est l'anglais ; on parle aussi le haoussa, le yoruba et l'igbo.", "le naira", AO);
P('cm', "Cameroun", A, "La capitale du Cameroun est Yaoundé.", "Les langues officielles sont le français et l'anglais.", "le franc CFA (XAF)", AC);
P('bj', "Bénin", A, "La capitale officielle est Porto-Novo ; le siège du gouvernement est à Cotonou.", "La langue officielle est le français ; on parle aussi le fon, le yoruba et d'autres langues.", "le franc CFA (XOF)", AO);
P('tg', "Togo", A, "La capitale du Togo est Lomé.", "La langue officielle est le français ; l'éwé et le kabiyé sont très parlés.", "le franc CFA (XOF)", AO);
P('gn', "Guinée", A, "La capitale de la Guinée est Conakry.", "La langue officielle est le français ; on parle aussi le poular, le malinké et le soussou.", "le franc guinéen", AO);
P('ne', "Niger", A, "La capitale du Niger est Niamey.", "La langue officielle est le français ; le haoussa et le zarma sont très parlés.", "le franc CFA (XOF)", AO);
P('td', "Tchad", A, "La capitale du Tchad est N'Djamena.", "Les langues officielles sont le français et l'arabe.", "le franc CFA (XAF)", AC);
P('ga', "Gabon", A, "La capitale du Gabon est Libreville.", "La langue officielle est le français.", "le franc CFA (XAF)", AC);
P('cg', "Congo-Brazzaville", A, "La capitale du Congo est Brazzaville.", "La langue officielle est le français ; le lingala et le kituba sont très parlés.", "le franc CFA (XAF)", AC);
P('cd', "RD Congo", A, "La capitale de la RD Congo est Kinshasa.", "La langue officielle est le français ; le lingala, le swahili, le kikongo et le tshiluba sont des langues nationales.", "le franc congolais", AC);
P('ma', "Maroc", A, "La capitale du Maroc est Rabat.", "Les langues officielles sont l'arabe et l'amazigh ; le français est très utilisé.", "le dirham", AN);
P('dz', "Algérie", A, "La capitale de l'Algérie est Alger.", "Les langues officielles sont l'arabe et l'amazigh ; le français est très utilisé.", "le dinar algérien", AN);
P('tn', "Tunisie", A, "La capitale de la Tunisie est Tunis.", "La langue officielle est l'arabe ; le français est très utilisé.", "le dinar tunisien", AN);
P('eg', "Égypte", A, "La capitale de l'Égypte est Le Caire.", "La langue officielle est l'arabe.", "la livre égyptienne", AN);
P('et', "Éthiopie", A, "La capitale de l'Éthiopie est Addis-Abeba.", "L'amharique est la langue de travail du pays ; on y parle aussi l'oromo, le tigrigna et d'autres langues.", "le birr", AE);
P('ke', "Kenya", A, "La capitale du Kenya est Nairobi.", "Les langues officielles sont le swahili et l'anglais.", "le shilling kényan", AE);
P('tz', "Tanzanie", A, "La capitale de la Tanzanie est Dodoma.", "Le swahili et l'anglais sont les langues officielles.", "le shilling tanzanien", AE);
P('za', "Afrique du Sud", A, "Le pays a trois capitales : Pretoria, Le Cap et Bloemfontein.", "Le pays compte de nombreuses langues officielles, dont le zoulou, le xhosa, l'afrikaans et l'anglais.", "le rand", AA);
P('mg', "Madagascar", A, "La capitale de Madagascar est Antananarivo.", "Les langues officielles sont le malgache et le français.", "l'ariary", "océan Indien, Afrique de l'Est");
P('mr', "Mauritanie", A, "La capitale de la Mauritanie est Nouakchott.", "La langue officielle est l'arabe ; le français est très utilisé.", "l'ouguiya", AO);
P('lr', "Liberia", A, "La capitale du Liberia est Monrovia.", "La langue officielle est l'anglais.", "le dollar libérien", AO);
P('rw', "Rwanda", A, "La capitale du Rwanda est Kigali.", "Les langues officielles sont le kinyarwanda, le français, l'anglais et le swahili.", "le franc rwandais", AE);
P('ao', "Angola", A, "La capitale de l'Angola est Luanda.", "La langue officielle est le portugais.", "le kwanza", AA);
P('fr', "France", '🌍', "La capitale de la France est Paris.", "La langue officielle est le français.", "l'euro", "Europe");
P('it', "Italie", '🌍', "La capitale de l'Italie est Rome.", "La langue officielle est l'italien.", "l'euro", "Europe");
P('es', "Espagne", '🌍', "La capitale de l'Espagne est Madrid.", "La langue officielle de l'État est l'espagnol ; le catalan, le basque et le galicien sont aussi officiels dans leurs régions.", "l'euro", "Europe");
P('pt', "Portugal", '🌍', "La capitale du Portugal est Lisbonne.", "La langue officielle est le portugais.", "l'euro", "Europe");
P('de', "Allemagne", '🌍', "La capitale de l'Allemagne est Berlin.", "La langue officielle est l'allemand.", "l'euro", "Europe");
P('be', "Belgique", '🌍', "La capitale de la Belgique est Bruxelles.", "Les langues officielles sont le néerlandais, le français et l'allemand.", "l'euro", "Europe");
P('ch', "Suisse", '🌍', "La capitale fédérale de la Suisse est Berne.", "Les langues nationales sont l'allemand, le français, l'italien et le romanche.", "le franc suisse", "Europe");
P('gb', "Royaume-Uni", '🌍', "La capitale du Royaume-Uni est Londres.", "La langue principale est l'anglais.", "la livre sterling", "Europe");
P('br', "Brésil", '🌎', "La capitale du Brésil est Brasilia.", "La langue officielle est le portugais.", "le real", "Amérique du Sud");
P('ca', "Canada", '🌎', "La capitale du Canada est Ottawa.", "Les langues officielles sont l'anglais et le français.", "le dollar canadien", "Amérique du Nord");
P('cn', "Chine", '🌏', "La capitale de la Chine est Pékin.", "La langue la plus parlée est le mandarin.", "le yuan (renminbi)", "Asie");
P('in', "Inde", '🌏', "La capitale de l'Inde est New Delhi.", "Les langues officielles de l'État sont le hindi et l'anglais ; le pays compte aussi de nombreuses langues régionales.", "la roupie indienne", "Asie");

/* ---------- Culture générale ---------- */
/* K(id, émoji, titre, question, réponse, à retenir) */
const K = (id, emo, t, q, r, c) => SCCS.add('cg-' + id, 'Culture générale : ' + t, 'Culture générale', PAL[kk % PAL.length], [
 [emo, "Le saviez-vous ?", q],
 ['💡', "La réponse", r],
 ['✅', "À retenir", c],
 CLOSE[kk++ % CLOSE.length] ], { photo:true });

K('eau-planete', '🌊', "L'eau sur la Terre", "Quelle part de la Terre est couverte d'eau ?", "Environ 71 % de la surface de la Terre est recouverte d'eau, surtout par les océans.", "L'eau est précieuse : on ne la gaspille pas.");
K('soleil', '☀️', "Le Soleil", "Le Soleil est-il une planète ?", "Non, c'est une étoile. La Terre tourne autour de lui.", "Sans le Soleil, il n'y aurait ni lumière, ni chaleur, ni vie sur Terre.");
K('lune', '🌙', "La Lune", "En combien de temps la Lune tourne-t-elle autour de la Terre ?", "En environ 27 jours.", "Les phases de la Lune se répètent à peu près chaque mois.");
K('annee', '📅', "L'année", "Pourquoi une année dure-t-elle 365 jours ?", "C'est le temps que met la Terre pour faire un tour autour du Soleil : environ 365 jours un quart.", "On ajoute un jour tous les quatre ans : c'est l'année bissextile.");
K('coeur', '❤️', "Le cœur", "Combien de fois le cœur bat-il en une journée ?", "Environ 100 000 fois chez un adulte.", "L'activité physique régulière renforce le cœur.");
K('os', '🦴', "Les os", "Combien d'os a un adulte ?", "206 os. Un bébé en a davantage, car certains os se soudent en grandissant.", "Le calcium et l'activité physique aident à garder des os solides.");
K('dents', '🦷', "Les dents", "Combien de dents ont les enfants et les adultes ?", "Un enfant a 20 dents de lait ; un adulte peut avoir jusqu'à 32 dents.", "On se brosse les dents matin et soir.");
K('sens', '👀', "Les cinq sens", "Quels sont les cinq sens ?", "La vue, l'ouïe, l'odorat, le goût et le toucher.", "Chaque sens nous aide à comprendre le monde qui nous entoure.");
K('photosynthese', '🌱', "Les plantes", "Comment les plantes fabriquent-elles leur nourriture ?", "Grâce à la lumière du soleil, à l'eau et au gaz carbonique de l'air : c'est la photosynthèse.", "Les plantes rejettent aussi l'oxygène que nous respirons.");
K('abeilles', '🐝', "Les abeilles", "À quoi servent les abeilles ?", "Elles transportent le pollen d'une fleur à l'autre, ce qui aide les plantes à produire des fruits.", "Sans ces insectes, beaucoup de fruits et de légumes disparaîtraient.");
K('pacifique', '🌏', "Les océans", "Quel est le plus grand océan ?", "L'océan Pacifique.", "Il y a cinq océans : Pacifique, Atlantique, Indien, Arctique et Austral.");
K('nil', '🏞️', "Les fleuves", "Quel est l'un des plus longs fleuves du monde ?", "Le Nil, en Afrique, qui traverse notamment l'Égypte.", "Les grands fleuves nourrissent les villes et les champs.");
K('sahara', '🏜️', "Les déserts", "Quel est le plus grand désert chaud du monde ?", "Le Sahara, en Afrique du Nord.", "Il couvre une très grande partie du nord du continent.");
K('kilimandjaro', '⛰️', "Les montagnes d'Afrique", "Quelle est la plus haute montagne d'Afrique ?", "Le Kilimandjaro, en Tanzanie, à environ 5 900 mètres.", "Son sommet est parfois couvert de neige, même près de l'équateur.");
K('everest', '🏔️', "Les montagnes du monde", "Quelle est la plus haute montagne du monde ?", "L'Everest, dans l'Himalaya, à environ 8 850 mètres.", "Seuls des alpinistes très bien préparés atteignent son sommet.");
K('victoria', '🌅', "Les lacs d'Afrique", "Quel est le plus grand lac d'Afrique ?", "Le lac Victoria, partagé entre le Kenya, l'Ouganda et la Tanzanie.", "Des millions de personnes vivent grâce à ses eaux.");
K('congo', '🌊', "Le fleuve Congo", "Quel grand fleuve traverse la RD Congo ?", "Le fleuve Congo, le deuxième plus long d'Afrique après le Nil.", "C'est aussi l'un des fleuves les plus puissants du monde.");
K('elephant', '🐘', "L'éléphant", "Quel est le plus grand animal terrestre ?", "L'éléphant d'Afrique.", "Il vit en famille et peut peser plusieurs tonnes.");
K('baleine', '🐋', "La baleine bleue", "Quel est le plus grand animal du monde ?", "La baleine bleue, qui vit dans les océans.", "Elle se nourrit de très petits animaux appelés krill.");
K('guepard', '🐆', "Le guépard", "Quel est l'animal terrestre le plus rapide ?", "Le guépard, qui peut dépasser 100 km/h sur de courtes distances.", "Il ne peut courir très vite que pendant quelques secondes.");
K('girafe', '🦒', "La girafe", "Combien de vertèbres a le cou d'une girafe ?", "Sept, comme le cou humain, mais beaucoup plus longues.", "La nature utilise souvent le même plan pour des animaux très différents.");
K('cameleon', '🦎', "Le caméléon", "Pourquoi le caméléon change-t-il de couleur ?", "Surtout pour communiquer et réagir à la lumière, à la chaleur et à ses émotions, pas seulement pour se cacher.", "On croyait autrefois que c'était uniquement pour se camoufler.");
K('arc-en-ciel', '🌈', "L'arc-en-ciel", "Combien de couleurs compte-t-on dans un arc-en-ciel ?", "Sept : rouge, orange, jaune, vert, bleu, indigo et violet.", "Il apparaît quand le soleil brille à travers la pluie.");
K('imprimerie', '📖', "L'imprimerie", "Qui a perfectionné l'imprimerie en Europe ?", "Johannes Gutenberg, vers 1450.", "Les livres sont devenus plus nombreux et moins chers.");
K('hieroglyphes', '🏺', "L'écriture des Égyptiens", "Comment écrivaient les anciens Égyptiens ?", "Avec des hiéroglyphes, des dessins qui représentent des sons ou des idées.", "On a pu les déchiffrer grâce à la pierre de Rosette.");
K('pyramides', '🔺', "Les pyramides", "Quel âge ont les pyramides de Gizeh ?", "Plus de 4 500 ans.", "La grande pyramide est la seule des sept merveilles du monde antique encore debout.");
K('afrique54', '🌍', "L'Afrique", "Combien de pays compte l'Afrique ?", "54 pays reconnus par les Nations unies.", "C'est le deuxième plus grand continent, après l'Asie.");
K('langues-afrique', '🗣️', "Les langues d'Afrique", "Combien de langues parle-t-on en Afrique ?", "Environ 2 000, ce qui en fait l'un des continents les plus riches en langues.", "Parler plusieurs langues est un grand atout.");
K('swahili', '🌴', "Le swahili", "Où parle-t-on le swahili ?", "En Afrique de l'Est, notamment au Kenya et en Tanzanie.", "C'est l'une des langues africaines les plus parlées.");
K('francais', '🗣️', "Le français dans le monde", "Où parle-t-on français ?", "Sur plusieurs continents : en Europe, en Afrique, en Amérique et ailleurs.", "En Afrique, de nombreux pays utilisent le français comme langue officielle.");
K('alphabet', '🔤', "L'alphabet", "Combien de lettres compte l'alphabet français ?", "26 lettres : 6 voyelles et 20 consonnes.", "Les voyelles sont a, e, i, o, u et y.");
K('baobab', '🌳', "Le baobab", "Pourquoi le baobab est-il un arbre spécial ?", "Il peut vivre très longtemps et stocker de l'eau dans son immense tronc.", "On l'appelle souvent « l'arbre de vie » en Afrique.");
K('cacao', '🍫', "Le cacao", "Quel pays produit le plus de cacao dans le monde ?", "La Côte d'Ivoire est le premier producteur mondial de cacao.", "Le cacao sert à fabriquer le chocolat.");
K('cafe', '☕', "Le café", "D'où vient le café ?", "Selon la tradition, d'Éthiopie.", "Aujourd'hui, il est cultivé dans de nombreux pays tropicaux.");
K('mandela', '✊', "Nelson Mandela", "Qui était Nelson Mandela ?", "Un homme politique sud-africain, président de 1994 à 1999, prix Nobel de la paix en 1993.", "Il a lutté contre l'apartheid et prôné la réconciliation.");
K('maathai', '🌲', "Wangari Maathai", "Qui est Wangari Maathai ?", "Une Kényane, première femme africaine à recevoir le prix Nobel de la paix, en 2004.", "Le mouvement qu'elle a lancé a fait planter des millions d'arbres.");
K('houphouet', '📜', "L'indépendance de la Côte d'Ivoire", "Qui fut le premier président de la Côte d'Ivoire ?", "Félix Houphouët-Boigny, de 1960 à 1993.", "L'indépendance de la Côte d'Ivoire date du 7 août 1960.");
K('senghor', '📜', "Léopold Sédar Senghor", "Qui était Léopold Sédar Senghor ?", "Un poète et le premier président du Sénégal, devenu indépendant en 1960.", "Il a aussi été élu à l'Académie française.");
K('curie', '🔬', "Marie Curie", "Qui est Marie Curie ?", "Une scientifique qui a reçu deux prix Nobel : en physique (1903) et en chimie (1911).", "Ses recherches ont fait progresser la médecine.");
K('fleming', '💊', "La pénicilline", "Qui a découvert la pénicilline ?", "Alexander Fleming, en 1928.", "Les antibiotiques ont sauvé des millions de vies, mais il faut les utiliser avec prudence et sur avis médical.");
K('telephone', '☎️', "Le téléphone", "Qui est associé à l'invention du téléphone ?", "Alexander Graham Bell, en 1876.", "Aujourd'hui, un téléphone mobile sert aussi d'appareil photo et d'ordinateur de poche.");
K('jo', '🏅', "Les Jeux olympiques", "Quand ont eu lieu les premiers Jeux olympiques modernes ?", "En 1896, à Athènes.", "Les Jeux ont lieu tous les quatre ans.");
K('coupe-monde', '⚽', "La Coupe du monde", "Tous les combien de temps a lieu la Coupe du monde de football ?", "Tous les quatre ans.", "Elle réunit des équipes du monde entier.");
K('couleurs', '🎨', "Les couleurs", "Quelles sont les couleurs primaires en peinture ?", "Le rouge, le jaune et le bleu.", "En les mélangeant, on obtient l'orange, le vert et le violet.");
K('planetes', '🪐', "Les planètes", "Combien y a-t-il de planètes dans le système solaire ?", "Huit : Mercure, Vénus, la Terre, Mars, Jupiter, Saturne, Uranus et Neptune.", "Jupiter est la plus grande.");
K('continents', '🗺️', "Les continents", "Combien de continents y a-t-il ?", "On en compte généralement sept : Afrique, Amérique du Nord, Amérique du Sud, Antarctique, Asie, Europe et Océanie.", "Selon les pays, on les compte parfois différemment.");
K('jour-nuit', '🌓', "Le jour et la nuit", "Pourquoi y a-t-il le jour et la nuit ?", "Parce que la Terre tourne sur elle-même en environ 24 heures.", "Quand un côté est éclairé, l'autre côté est dans la nuit.");
K('saisons', '🍂', "Les saisons", "Pourquoi y a-t-il des saisons ?", "À cause de l'inclinaison de la Terre quand elle tourne autour du Soleil.", "Près de l'équateur, on parle surtout de saison sèche et de saison des pluies.");
K('forme-terre', '🌐', "La forme de la Terre", "La Terre est-elle plate ?", "Non, elle est presque ronde, légèrement aplatie aux pôles.", "Les photos prises depuis l'espace le montrent clairement.");
K('eau-boire', '💧', "Boire de l'eau", "Combien d'eau faut-il boire par jour ?", "Environ 1,5 litre pour un adulte, davantage s'il fait chaud ou si l'on travaille beaucoup.", "Les enfants et les personnes qui travaillent dehors ont besoin de boire souvent.");
K('secondes', '⏱️', "Le temps", "Combien de secondes y a-t-il dans une heure ?", "3 600 : une heure compte 60 minutes, et chaque minute 60 secondes.", "Le temps se mesure en secondes, minutes et heures.");
K('pairs', '🔢', "Les nombres", "Que sont les nombres pairs ?", "Ceux qui se divisent par deux : 2, 4, 6, 8...", "Les nombres impairs ne se divisent pas par deux : 1, 3, 5, 7...");
K('aire', '📐', "Les surfaces", "Comment calculer la surface d'un rectangle ?", "En multipliant la longueur par la largeur. Un rectangle de 5 m sur 3 m a une surface de 15 m².", "Le périmètre, lui, est la longueur du tour de la figure.");
K('pourcentage', '➗', "Les pourcentages", "Que veut dire 50 % ?", "La moitié. Et 25 % veut dire un quart.", "Les pourcentages servent pour les réductions, les taux et les statistiques.");
K('recyclage', '♻️', "Trier les déchets", "Pourquoi faut-il trier les déchets ?", "Pour réutiliser le plastique, le papier, le verre et le métal, et pour réduire la pollution.", "Un petit geste répété par beaucoup de personnes protège la planète.");
K('arbres', '🌳', "Les arbres", "À quoi servent les arbres ?", "Ils donnent de l'ombre, de l'oxygène, des fruits, du bois, et ils protègent le sol.", "Planter un arbre est un beau cadeau pour l'avenir.");
K('pluie', '🌧️', "Le cycle de l'eau", "D'où vient la pluie ?", "L'eau des mers et des rivières s'évapore, forme des nuages, puis retombe en pluie : c'est le cycle de l'eau.", "L'eau voyage sans cesse autour de la planète.");
K('volcan', '🌋', "Les volcans", "Qu'est-ce qu'un volcan ?", "Une ouverture de la Terre par où sortent de la roche fondue, des cendres et des gaz.", "Il existe aussi des volcans en Afrique, comme le mont Cameroun.");
K('monnaie', '💱', "La monnaie", "À quoi sert la monnaie ?", "À échanger plus facilement des biens et des services, au lieu de faire du troc.", "Chaque pays, ou groupe de pays, a sa propre monnaie.");
K('metiers', '🧰', "Les métiers", "Combien de métiers existe-t-il ?", "Des milliers. Chaque métier utile fait fonctionner la société.", "SHAMAN CHOOZ recrute et place dans tous les secteurs : maison, ville, commerce.");
})();

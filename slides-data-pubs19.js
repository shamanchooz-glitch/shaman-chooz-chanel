/* ==========================================================
   PUBS 19 — TRUCS ET ASTUCES : CUISINE (25), MÉNAGE (20), ENFANTS ET FAMILLE (15) = 60 nouveaux diaporamas avec ta photo
   Chaque astuce = 3 écrans (l'astuce, comment faire, à retenir) + 1 message final, catégorie « Astuces ».
   Conseils simples et prudents de la vie quotidienne (hygiène, sécurité) : ce ne sont pas des conseils médicaux.
   Ce fichier définit aussi l'outil commun window.SCC_ASTUCE, utilisé par pubs20.
   Les identifiants commencent par « tc- » (cuisine), « tm- » (ménage), « tf- » (famille).
   Pour ajouter une astuce : une ligne C(...), H(...) ou F(...) ci-dessous = 1 nouvelle vidéo.
   ========================================================== */
(function(){
if(!window.SCCS) return;
const CLOSE = [
 ['🧩',"Un seul métier","Pour SHAMAN CHOOZ, faire le ménage, s'occuper des enfants et cuisiner, c'est le même travail."],
 ['🌍',"Nos activités dans le monde","SHAMAN CHOOZ recrute et place du personnel de maison et d'autres métiers, dans tous les secteurs, partout dans le monde."],
 ['📺',"Une chaîne pour toute la famille","Astuces, recettes et savoirs tournent 24h/24. Partagez la chaîne avec vos proches !"],
 ['🌟',"Un travail qui compte","Les petits gestes de chaque jour font une maison propre, sûre et agréable à vivre."],
 ['🤝',"Pour les familles et les employés","Un bon travail à la maison, c'est du respect, de la confiance et des gestes bien faits."]
];
const PAL = ['bleu','vert','orange','violet','turquoise','or','rose','terre'];
let count = 0;
/* SCC_ASTUCE(préfixe, id, émoji, titre, astuce, comment, à retenir) */
window.SCC_ASTUCE = function(pre, id, emo, titre, a, b, c){
 const k = count++;
 SCCS.add(pre + '-' + id, 'Astuce : ' + titre, 'Astuces', PAL[k % PAL.length], [
  [emo, "L'astuce", a],
  ['🔎', 'Comment faire', b],
  ['✅', 'À retenir', c],
  CLOSE[k % CLOSE.length] ], { photo:true });
};
const C = (id, emo, t, a, b, c) => SCC_ASTUCE('tc', id, emo, t, a, b, c);
const H = (id, emo, t, a, b, c) => SCC_ASTUCE('tm', id, emo, t, a, b, c);
const F = (id, emo, t, a, b, c) => SCC_ASTUCE('tf', id, emo, t, a, b, c);

/* ---------- Cuisine (25) ---------- */
C('citron', '🍋', "Un filet de citron évite que les fruits noircissent",
 "Le jus de citron garde les fruits et l'avocat frais et colorés.",
 "Arrose les bananes, pommes ou avocats coupés avec quelques gouttes de citron et mélange doucement.",
 "Une salade de fruits préparée à l'avance garde ainsi sa belle couleur.");
C('pates', '🍝', "Ne rince pas les pâtes chaudes",
 "L'amidon qui reste sur les pâtes aide la sauce à bien accrocher.",
 "Cuis dans beaucoup d'eau salée, égoutte et mélange tout de suite avec la sauce.",
 "Garde une louche d'eau de cuisson pour lier la sauce si elle est trop épaisse.");
C('riz', '🍚', "Un riz bien détaché",
 "Un riz bien rincé et bien dosé ne colle pas.",
 "Rince le riz jusqu'à ce que l'eau soit plus claire, puis cuis-le avec environ deux fois son volume d'eau, à couvert et à feu doux.",
 "Ne soulève pas le couvercle pendant la cuisson.");
C('oignon', '🧅', "Éviter de pleurer en coupant les oignons",
 "Un oignon bien froid pique moins les yeux.",
 "Mets l'oignon 15 minutes au réfrigérateur avant de le couper et utilise un couteau bien aiguisé.",
 "Un couteau qui coupe bien écrase moins l'oignon et libère moins de gaz.");
C('oeufs', '🥚', "Tester la fraîcheur d'un œuf",
 "Un œuf frais coule au fond d'un verre d'eau.",
 "Plonge l'œuf dans l'eau : au fond et à plat, il est frais ; debout, il est plus vieux ; s'il flotte, il ne se mange plus.",
 "En cas de doute, on ne le consomme pas.");
C('herbes', '🌿', "Garder les herbes fraîches plus longtemps",
 "Les herbes se gardent comme un petit bouquet.",
 "Mets les tiges dans un verre d'eau, ou enveloppe-les dans un linge humide, et range-les au frais.",
 "Change l'eau tous les deux jours.");
C('ail', '🧄', "Éplucher l'ail facilement",
 "Écraser la gousse décolle la peau tout de suite.",
 "Pose la gousse sous le plat d'un grand couteau et appuie avec la paume de la main.",
 "Retire aussi le petit germe vert si l'ail est ancien : il est plus amer.");
C('tomate', '🍅', "Peler une tomate sans effort",
 "Un bain d'eau chaude fait partir la peau.",
 "Plonge la tomate dans l'eau bouillante 1 minute, puis dans l'eau froide. La peau se retire d'elle-même.",
 "Fais une petite croix sur la peau avant de la plonger.");
C('banane-mure', '🍌', "Ne jette pas les bananes très mûres",
 "Les bananes très mûres sont parfaites pour les gâteaux et les beignets.",
 "Écrase-les à la fourchette et ajoute-les à une pâte à gâteau ou à des beignets.",
 "Moins de gaspillage et plus de goût sucré naturel.");
C('pain-rassis', '🍞', "Un pain rassis peut redevenir bon",
 "Un peu d'eau redonne vie à un pain dur.",
 "Passe le pain très vite sous l'eau, puis mets-le 5 à 10 minutes dans un four chaud.",
 "Ou utilise-le pour faire du pain perdu ou de la chapelure.");
C('odeur-poisson', '🐟', "Enlever l'odeur du poisson",
 "Le citron aide à enlever l'odeur du poisson sur les mains et les planches.",
 "Frotte les mains et la planche avec du citron, puis lave à l'eau et au savon.",
 "Utilise une planche réservée au poisson si possible.");
C('huile-friture', '🍳', "Reconnaître une huile prête pour la friture",
 "Un petit test simple montre si l'huile est assez chaude.",
 "Plonge le bout d'une cuillère en bois : si de petites bulles apparaissent, l'huile est prête.",
 "Ne laisse jamais de l'huile chaude sans surveillance.");
C('sel', '🧂', "Saler au bon moment",
 "Goûte avant de saler : on peut toujours en ajouter, mais pas en enlever.",
 "Sale en fin de cuisson pour les sauces et les soupes, qui réduisent et deviennent plus salées.",
 "Les bouillons en cube sont déjà salés.");
C('viande-tendre', '🥩', "Une viande plus tendre",
 "Une cuisson lente rend la viande plus tendre.",
 "Marine la viande avec du citron ou du yaourt, puis cuis à feu doux et à couvert.",
 "Ne perce pas la viande en la retournant : elle garde son jus.");
C('haricots-trempage', '🫘', "Tremper les haricots la veille",
 "Le trempage réduit le temps de cuisson et aide à mieux digérer.",
 "Couvre les haricots d'eau froide pendant la nuit, jette cette eau, puis cuis dans une eau propre.",
 "Les haricots doivent toujours être bien cuits.");
C('pommes-terre', '🥔', "Cuire les pommes de terre à l'eau froide",
 "Elles cuisent plus régulièrement quand on part de l'eau froide.",
 "Mets-les dans de l'eau froide salée, porte à ébullition et cuis jusqu'à ce qu'un couteau rentre facilement.",
 "Évite de les piquer trop souvent : elles se gorgent d'eau.");
C('legumes-verts', '🥦', "Garder la belle couleur des légumes verts",
 "Une cuisson courte garde les légumes verts colorés et croquants.",
 "Plonge-les dans l'eau bouillante salée 3 à 5 minutes, puis dans l'eau froide.",
 "Ils gardent aussi plus de richesses.");
C('restes', '🥘', "Bien conserver les restes",
 "Un plat cuit ne doit pas rester longtemps à température ambiante.",
 "Laisse refroidir un peu, couvre et mets au frais dans les deux heures. Consomme dans les deux jours.",
 "Réchauffe jusqu'à ce que le plat soit très chaud.");
C('decongeler', '❄️', "Décongeler sans risque",
 "Décongèle toujours au réfrigérateur ou au four, jamais sur le plan de travail.",
 "Sors la viande ou le poisson la veille et pose-les dans un plat pour récupérer le jus.",
 "Ne recongèle pas un aliment décongelé.");
C('planches', '🔪', "Séparer le cru du cuit",
 "Une planche pour la viande crue, une autre pour le reste.",
 "Lave la planche et le couteau à l'eau chaude et au savon après la viande crue.",
 "Cette habitude protège toute la famille.");
C('piment', '🌶️', "Manipuler le piment sans danger",
 "Le piment brûle les yeux et la peau.",
 "Lave-toi les mains après avoir coupé du piment et ne te touche pas les yeux. Utilise des gants si tu en as.",
 "Pour les enfants, mets très peu de piment ou laisse-le à part.");
C('gingembre', '🫚', "Râper le gingembre facilement",
 "Le gingembre congelé se râpe très facilement.",
 "Mets le gingembre au congélateur, puis râpe-le directement sans l'éplucher.",
 "Il se conserve ainsi plusieurs semaines.");
C('riz-reste', '🍚', "Attention au riz cuit laissé dehors",
 "Le riz cuit laissé longtemps à température ambiante peut devenir dangereux.",
 "Refroidis-le vite, mets-le au frais et réchauffe-le jusqu'à ce qu'il soit très chaud une seule fois.",
 "Ne garde pas le riz cuit plus de 24 heures.");
C('poulet-cru', '🍗', "Ne rince pas le poulet cru",
 "Rincer le poulet cru fait voler les microbes autour de l'évier.",
 "Cuis-le bien : la cuisson tue les microbes. Lave-toi les mains et le plan de travail après l'avoir touché.",
 "Le poulet doit être cuit à cœur, sans rose.");
C('economie-gaz', '🔥', "Cuisiner en économisant le feu",
 "Un couvercle et des morceaux plus petits réduisent le temps de cuisson.",
 "Couvre les casseroles et baisse le feu dès que l'eau bout. Coupe les aliments en morceaux réguliers.",
 "Moins de gaz ou de charbon utilisé, et la cuisine reste plus fraîche.");

/* ---------- Ménage (20) ---------- */
H('vitres', '🪟', "Des vitres propres avec du vinaigre",
 "Le vinaigre blanc dilué nettoie bien les vitres.",
 "Mélange moitié vinaigre, moitié eau. Passe sur la vitre, puis essuie avec un chiffon sec et propre.",
 "Évite le plein soleil : le produit sèche trop vite et laisse des traces.");
H('casserole-brulee', '🍲', "Nettoyer une casserole brûlée",
 "Le bicarbonate aide à décoller le fond brûlé.",
 "Remplis la casserole d'eau avec une cuillère de bicarbonate, fais bouillir 10 minutes, laisse tiédir et frotte.",
 "Laisse tremper plutôt que de frotter fort.");
H('planche-citron', '🍋', "Nettoyer une planche à découper",
 "Le citron et le sel nettoient et désodorisent la planche.",
 "Frotte la planche avec du gros sel et un demi-citron, puis rince à l'eau chaude.",
 "Sèche-la bien avant de la ranger.");
H('balayer', '🧹', "Balayer avant de laver",
 "Balayer d'abord évite de pousser la saleté avec l'eau.",
 "Passe le balai du fond de la pièce vers la porte, puis lave avec une serpillière bien essorée.",
 "Une serpillière trop mouillée laisse le sol glissant.");
H('haut-bas', '🪜', "Nettoyer du haut vers le bas",
 "La poussière tombe : on commence toujours par le haut.",
 "Nettoie d'abord les étagères et les meubles, puis les surfaces basses, et enfin le sol.",
 "Tu évites de refaire deux fois le même travail.");
H('chiffons', '🧽', "Un chiffon par usage",
 "Utiliser les mêmes chiffons partout répand les microbes.",
 "Garde un chiffon pour la cuisine, un pour les toilettes et la salle de bain, un pour la poussière.",
 "Lave les chiffons à l'eau chaude régulièrement.");
H('javel', '⚠️', "Ne jamais mélanger les produits d'entretien",
 "Certains mélanges dégagent des gaz dangereux.",
 "Ne mélange jamais l'eau de Javel avec du vinaigre, de l'ammoniaque ou d'autres produits. Aère la pièce.",
 "Garde les produits dans leur flacon d'origine et hors de portée des enfants.");
H('linge-blanc', '☀️', "Le soleil pour le linge blanc",
 "Le soleil aide à blanchir et à désinfecter le linge.",
 "Après lavage, étends le linge blanc au grand soleil, à l'envers pour les couleurs.",
 "Rentre-le dès qu'il est sec.");
H('tache-huile', '👕', "Une tache d'huile sur un tissu",
 "Une poudre absorbante enlève l'huile avant le lavage.",
 "Pose de la farine ou du talc sur la tache pendant 15 minutes, puis lave au savon.",
 "Agis vite : une tache fraîche part plus facilement.");
H('repassage', '👔', "Repasser plus facilement",
 "Un vêtement légèrement humide se repasse mieux.",
 "Vaporise un peu d'eau ou repasse juste après l'essorage. Commence par les parties petites : col et manches.",
 "Vérifie toujours l'étiquette pour la bonne température.");
H('matelas', '🛏️', "Aérer les matelas et les draps",
 "L'air et le soleil gardent le lit sain.",
 "Retourne le matelas régulièrement et aère-le dehors quand c'est possible. Change les draps chaque semaine.",
 "Un lit propre aide à mieux dormir.");
H('moisissure', '🚿', "Éviter la moisissure dans la salle de bain",
 "L'humidité fait apparaître la moisissure.",
 "Aère après chaque douche, essuie les surfaces et sèche les serviettes à l'air.",
 "Nettoie les endroits touchés avec un produit adapté, en gardant la pièce aérée.");
H('frigo', '🧊', "Nettoyer le réfrigérateur chaque semaine",
 "Un frigo propre garde mieux les aliments.",
 "Retire les aliments périmés, lave les étagères à l'eau tiède et au savon, puis sèche.",
 "Range le cru en bas et le cuit en haut.");
H('serpilliere', '🪣', "Laver le sol sans trop d'eau",
 "Une serpillière bien essorée sèche vite et évite les glissades.",
 "Utilise de l'eau tiède avec un peu de savon, essore bien, et change l'eau quand elle devient grise.",
 "Mets un panneau ou préviens les enfants si le sol est mouillé.");
H('planning', '📅', "Un planning de ménage pour la semaine",
 "Répartir les tâches évite les grosses journées épuisantes.",
 "Choisis une pièce ou une tâche principale par jour : salon le lundi, cuisine le mardi, linge le mercredi...",
 "Un petit travail régulier vaut mieux qu'un gros nettoyage rare.");
H('poubelle', '🗑️', "Vider et laver la poubelle",
 "Une poubelle propre limite les odeurs et les insectes.",
 "Vide-la chaque jour, lave-la de temps en temps à l'eau et au savon et laisse-la sécher.",
 "Ferme toujours le couvercle.");
H('eponge', '🧽', "Changer régulièrement l'éponge",
 "Une éponge humide garde les microbes.",
 "Rince-la après chaque usage, presse-la et laisse-la sécher. Change-la toutes les une à deux semaines.",
 "Ne l'utilise pas sur les sols ni pour les toilettes.");
H('moustiques', '🦟', "Limiter les moustiques à la maison",
 "Les moustiques se développent dans l'eau qui stagne.",
 "Vide régulièrement les seaux, soucoupes et vieux pneus. Couvre les récipients d'eau. Utilise une moustiquaire.",
 "Une maison sans eau stagnante, c'est moins de moustiques.");
H('chaussures', '👟', "Laisser les chaussures à la porte",
 "Les chaussures ramènent la saleté de la rue dans la maison.",
 "Installe un coin pour les chaussures près de l'entrée, avec un petit tapis.",
 "Le sol reste propre plus longtemps, surtout là où jouent les enfants.");
H('ranger', '🧺', "Une place pour chaque chose",
 "Une maison rangée se nettoie plus vite.",
 "Remets chaque objet à sa place après usage. Garde un petit panier pour les objets à ranger.",
 "Dix minutes de rangement par jour changent beaucoup de choses.");

/* ---------- Enfants et famille (15) ---------- */
F('coucher', '🌙', "Une routine du coucher",
 "Des gestes réguliers aident l'enfant à s'endormir.",
 "Fais toujours la même chose : dents, pyjama, histoire, câlin, lumière éteinte à la même heure.",
 "Un enfant rassuré dort mieux.");
F('repas-enfants', '🍽️', "Proposer sans forcer",
 "Forcer un enfant à manger crée des tensions.",
 "Propose un petit peu de chaque aliment, reste calme et donne l'exemple en mangeant avec lui.",
 "Il faut parfois plusieurs essais avant qu'il accepte un aliment.");
F('compliments', '👏', "Encourager plutôt que gronder",
 "Un compliment sincère motive plus qu'une punition.",
 "Remarque ce que l'enfant fait bien : « Tu as bien rangé tes jouets, bravo ! ».",
 "L'enfant a envie de recommencer quand il se sent apprécié.");
F('jeux', '🎲', "Des jeux simples sans écran",
 "Quelques objets suffisent pour bien jouer.",
 "Cache-cache, jeu de mémoire, dessin, chansons, construction avec des boîtes : tout est possible.",
 "Jouer avec l'enfant renforce la confiance.");
F('lecture', '📚', "Dix minutes de lecture par jour",
 "Lire ensemble développe le langage et l'imagination.",
 "Choisis un petit livre, un journal pour enfants ou raconte une histoire inventée.",
 "Même dix minutes par jour suffisent.");
F('devoirs', '✏️', "Un coin calme pour les devoirs",
 "Un endroit calme aide à se concentrer.",
 "Prépare une table propre, de la lumière, sans télévision. Reste disponible pour aider sans faire à sa place.",
 "Termine par un petit encouragement.");
F('dire-non', '🛑', "Dire non calmement",
 "Un non dit calmement est plus efficace qu'un cri.",
 "Mets-toi à la hauteur de l'enfant, explique en une phrase simple et propose une autre solution.",
 "Reste cohérent : le même interdit chaque jour.");
F('produits', '🧴', "Produits dangereux hors de portée",
 "Les produits d'entretien et les médicaments sont dangereux pour les petits.",
 "Range-les en hauteur ou dans un placard fermé, toujours dans leur flacon d'origine.",
 "Si un enfant en a avalé, appelle tout de suite les secours ou un médecin.");
F('eau-danger', '🌊', "Jamais un enfant seul près de l'eau",
 "Un enfant peut se noyer dans très peu d'eau, même dans un seau.",
 "Reste à portée de bras d'un petit enfant près d'un seau, d'une bassine, d'une rivière ou de la mer.",
 "Vide les seaux et les bassines après usage.");
F('electricite', '🔌', "Prises et fils électriques",
 "Les prises attirent les petits doigts.",
 "Couvre les prises avec des protections et range les fils hors de portée.",
 "Ne laisse jamais un enfant manipuler des appareils branchés.");
F('chaleur', '☀️', "Protéger l'enfant de la chaleur",
 "Un enfant déshydraté se fatigue vite.",
 "Fais-le boire de l'eau régulièrement, mets-lui un chapeau et reste à l'ombre aux heures chaudes.",
 "Ne laisse jamais un enfant seul dans une voiture fermée.");
F('bain', '🛁', "Vérifier l'eau du bain",
 "Une eau trop chaude peut brûler la peau d'un enfant.",
 "Teste l'eau avec ton coude ou l'intérieur du poignet avant de mettre l'enfant.",
 "Ne quitte jamais l'enfant pendant le bain.");
F('jouets', '🧸', "Ranger les jouets ensemble",
 "Ranger peut devenir un jeu.",
 "Mets de la musique et propose un défi : « Qui range le plus de cubes en une chanson ? ».",
 "L'enfant apprend ainsi l'ordre et la responsabilité.");
F('ecrans', '📱', "Limiter les écrans",
 "Trop d'écrans fatigue les yeux et le sommeil.",
 "Fixe un temps précis avec les parents, évite les écrans pendant les repas et avant de dormir.",
 "Propose une activité à la place : dessin, jeu, promenade.");
F('colere', '😤', "Calmer une colère d'enfant",
 "Respirer ensemble calme l'enfant et l'adulte.",
 "Reste près de lui, parle doucement et propose de respirer lentement : « On souffle comme une bougie ».",
 "Parle de ce qui s'est passé quand le calme est revenu.");
})();

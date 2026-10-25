/* ==========================================================
   PUBS 14 — LE GOÛTER DES ENFANTS (60 nouveaux diaporamas éducatifs avec ta photo)
   20 sujets × 3 publics (les enfants / les parents / les nounous et employé(e)s de maison) = 60 diaporamas.
   Conseils simples et prudents (hygiène, équilibre, sécurité) : ce ne sont pas des conseils médicaux.
   En cas d'allergie ou de maladie de l'enfant, on demande toujours l'avis d'un médecin.
   Catégorie « Goûter » : ces vidéos se mélangent aux autres sur toute la boucle 24h/24.
   Les identifiants commencent par « rg- ».
   Pour ajouter un sujet : une ligne T(...) ci-dessous = 3 nouvelles vidéos (enfants, parents, nounous).
   ========================================================== */
(function(){
if(!window.SCCS) return;
const AUD = [
 { p:'e', lab:'Goûter des enfants', kid:true,  pal:'rose' },
 { p:'p', lab:'Parents', kid:false, pal:'orange' },
 { p:'n', lab:'Nounous et employé(e)s de maison', kid:false, pal:'vert' }
];
const TH = [];
/* T(id, titre, écrans(v) → 3 écrans [émoji, titre, texte]) ; v(version enfants, version adultes) */
const T = (id, ti, sl) => TH.push({ id, ti, sl });

T('mains', "Se laver les mains avant le goûter", v=>[
 ['🙌',"Mains propres",v("Avant de goûter, lave tes mains avec de l'eau et du savon.","Faites laver les mains de l'enfant avec de l'eau propre et du savon avant le goûter.")],
 ['🌳',"Après les jeux","La terre, les jouets et les animaux portent des microbes : on se lave les mains après avoir joué."],
 ['🧼',"Le geste complet","Frotter les paumes, le dos des mains, entre les doigts et sous les ongles, puis bien rincer."]]);
T('fruit', "Un fruit de saison pour le goûter", v=>[
 ['🍌',"Le fruit, un goûter facile","Banane, mangue, orange, pastèque, pomme, papaye : on choisit selon la saison et le pays."],
 ['🧽',"Bien laver les fruits",v("Demande à un adulte de rincer le fruit à l'eau propre avant de le manger.","Rincez toujours les fruits à l'eau propre, même ceux qu'on épluche.")],
 ['🌈',"Changer de fruit","Varier les fruits donne des goûts et des richesses différents."]]);
T('eau', "De l'eau pour accompagner le goûter", v=>[
 ['💧',"L'eau d'abord",v("L'eau propre est la meilleure boisson pour le goûter.","L'eau propre reste la meilleure boisson à proposer pour le goûter.")],
 ['🍹',"Jus et sodas : attention","Les jus très sucrés et les sodas contiennent beaucoup de sucre. Un jus de fruit pressé peut être dilué avec de l'eau."],
 ['🫗',"Une gourde propre","Utiliser une bouteille ou une gourde propre, bien fermée, pour emporter l'eau."]]);
T('tartine', "Une tartine simple pour le goûter", v=>[
 ['🍞',"Le pain, un classique","Une tranche de pain avec un peu de beurre, de fromage ou de banane écrasée est un goûter simple et rassasiant."],
 ['🥖',"Pain frais","Choisir un pain frais, bien conservé, à l'abri des mouches."],
 ['🍴',"Pas trop garni","Une petite quantité de garniture suffit : le goûter n'est pas un deuxième repas."]]);
T('laitage', "Lait, yaourt ou fromage au goûter", v=>[
 ['🥛',"Un laitage pour le goûter","Lait, yaourt ou fromage apportent du calcium aux enfants qui les tolèrent bien."],
 ['❄️',"Bien conservés","Les produits laitiers se gardent au frais. Un yaourt resté longtemps au soleil ne se mange plus."],
 ['📅',"Regarder la date","Vérifier la date limite avant de donner un produit laitier à un enfant."]]);
T('horaire', "Quelle heure pour le goûter ?", v=>[
 ['🕓',"Au milieu de l'après-midi","Le goûter se prend souvent vers quatre heures, entre le déjeuner et le dîner."],
 ['🍽️',"Pas trop près du dîner","Un goûter trop tard coupe l'appétit pour le repas du soir."],
 ['⏰',"Un rythme régulier","Les enfants aiment les habitudes : un goûter à peu près à la même heure chaque jour."]]);
T('portions', "La bonne portion de goûter", v=>[
 ['⚖️',"Petit mais suffisant",v("Mange ton goûter jusqu'à ne plus avoir faim, pas plus.","Une petite portion suffit : un fruit et un morceau de pain, par exemple.")],
 ['🥄',"Pas à la place du repas","Le goûter aide à tenir jusqu'au dîner, il ne remplace pas un repas."],
 ['👶',"Selon l'âge","Un tout-petit mange beaucoup moins qu'un grand enfant : on s'adapte à chacun."]]);
T('sucre', "Moins de sucre au goûter", v=>[
 ['🍬',"Bonbons et gâteaux : de temps en temps","Les sucreries font plaisir, mais on les garde pour de rares occasions."],
 ['🦷',"Prendre soin des dents",v("Après les sucreries, bois de l'eau. Brosse-toi les dents le soir.","Après un goûter sucré, proposer de l'eau. Le brossage du soir protège les dents.")],
 ['🍊',"Des goûts naturels","Un fruit frais est sucré naturellement et plus riche pour le corps."]]);
T('boite', "La boîte à goûter pour l'école", v=>[
 ['🎒',"Une boîte simple","Un fruit, un morceau de pain, une bouteille d'eau : une boîte à goûter facile à préparer."],
 ['🌡️',"À l'abri de la chaleur","Ne pas laisser la boîte au soleil : certains aliments se gâtent vite quand il fait chaud."],
 ['🍎',"Un peu de variété","Changer le contenu de la boîte d'un jour à l'autre garde l'envie de manger."]]);
T('maison', "Un goûter fait maison", v=>[
 ['🧁',"Fait avec soin","Un gâteau à la banane, une galette ou une bouillie peu sucrée se préparent facilement à la maison."],
 ['🥣',"Moins de sucre, plus de goût","Faire soi-même permet de choisir les ingrédients et de limiter le sucre."],
 ['👩‍🍳',v("Tu peux aider","Cuisiner avec l'enfant"),v("Tu peux aider à peser, mélanger ou décorer, avec un adulte à côté de toi.","Laisser l'enfant participer apprend le plaisir de faire à manger.")]]);
T('arachides', "Arachides et fruits secs : attention aux petits", v=>[
 ['🥜',"Un risque d'étouffement","Les arachides et les noix entières peuvent faire s'étouffer les enfants de moins de quatre ans."],
 ['🔨',"Les écraser ou les éviter","Pour les petits, on écrase finement ou on évite. Pour les plus grands, on surveille."],
 ['👀',"Toujours surveiller","Un enfant qui mange doit toujours être regardé par un adulte."]]);
T('couper', "Bien couper les aliments pour les petits", v=>[
 ['🔪',"Des petits morceaux","Raisins, carottes crues, saucisses : on les coupe en petits morceaux ou en lamelles pour les tout-petits."],
 ['🍇',"Raisins en deux","Les raisins entiers sont dangereux pour les petits : on les coupe toujours en deux."],
 ['🧑‍🍳',"Aliments mous","Pour les plus jeunes, choisir des aliments mous ou bien cuits."]]);
T('assis', "Manger assis, sans courir", v=>[
 ['🪑',"Assis pour goûter",v("Mange assis, sans courir ni sauter avec la nourriture dans la bouche.","Faire asseoir l'enfant pour manger évite de s'étouffer.")],
 ['🐢',"Doucement","Bien mâcher et avaler avant de reprendre une bouchée."],
 ['👀',"Un adulte à proximité","Rester près des enfants pendant le goûter : c'est la règle de sécurité numéro un."]]);
T('allergies', "Allergies : demander avant de donner", v=>[
 ['⚠️',"Les allergies existent",v("Ne partage pas ton goûter sans demander si ton ami a une allergie.","Certains enfants ont des allergies : demandez toujours aux parents avant de donner un aliment.")],
 ['📞',"Poser la question","Avant tout aliment nouveau, demander aux parents ce que l'enfant peut manger."],
 ['🏥',"En cas de doute","Si un enfant se sent mal après avoir mangé, prévenir un adulte tout de suite et chercher de l'aide médicale."]]);
T('sans-ecran', "Un goûter sans écran", v=>[
 ['📵',"Écran éteint",v("Pendant le goûter, laisse le téléphone et la télévision de côté.","Éteindre les écrans pendant le goûter aide l'enfant à bien manger.")],
 ['🗣️',"Un moment pour parler","Le goûter est un bon moment pour raconter sa journée."],
 ['😊',"Plus de plaisir","On savoure mieux quand on fait attention à ce qu'on mange."]]);
T('hygiene-boite', "Boîtes et gourdes : toujours propres", v=>[
 ['🧽',"Laver chaque jour","Laver la boîte et la gourde à l'eau chaude et au savon après chaque usage."],
 ['☀️',"Bien sécher","Laisser sécher à l'air avant de refermer, pour éviter les mauvaises odeurs."],
 ['👃',"Sentir avant de remplir","Une odeur désagréable : on relave avant de remettre un aliment."]]);
T('rue', "Goûter acheté dans la rue : bien choisir", v=>[
 ['🛍️',"Choisir un vendeur propre","Regarder si le vendeur a les mains propres et si les aliments sont couverts."],
 ['🔥',"Plutôt chaud et frais","Un aliment cuit tout de suite ou un fruit frais est un meilleur choix qu'un plat resté longtemps dehors."],
 ['💧',"Eau propre","Boire de l'eau en bouteille fermée ou de l'eau qu'on sait propre."]]);
T('partage', "Partager son goûter", v=>[
 ['🤝',"Le plaisir de partager",v("Partager avec un ami, c'est gentil, mais demande d'abord s'il peut le manger.","Partager le goûter apprend la générosité, avec l'accord des parents.")],
 ['👫',"Apprendre ensemble","Manger avec d'autres enfants donne envie de goûter de nouveaux aliments."],
 ['🙏',"Dire merci","Un petit merci à celui ou celle qui a préparé le goûter."]]);
T('sport', "Le goûter après les jeux et le sport", v=>[
 ['⚽',"Reprendre des forces","Après avoir couru, un fruit et de l'eau font du bien."],
 ['💧',"Boire d'abord","Il faut boire de l'eau, surtout quand il fait chaud."],
 ['🛑',"Pas pendant la course","On s'assoit et on reprend son souffle avant de manger."]]);
T('metier', "Préparer le goûter : un vrai métier de la maison", v=>[
 ['🧑‍🍳',"Cuisiner pour les enfants","Préparer un goûter propre et équilibré demande du soin et de l'organisation."],
 ['🧩',"Un seul métier","Pour SHAMAN CHOOZ, la cuisine, le ménage et les enfants font partie du même travail."],
 ['🌟',"Un travail à respecter","Celles et ceux qui prennent soin des enfants méritent notre respect et notre merci."]]);

/* Dernier écran selon le public (un message par sujet) */
const KID = [
 ['📺',"Une chaîne pour toi","Des vidéos tournent 24h/24 : repas, goûters, métiers et jeux. Regarde-les avec tes parents !"],
 ['🌟',"Bravo !","Tu apprends de bonnes habitudes : c'est comme ça qu'on grandit en pleine forme."],
 ['👨‍👩‍👧',"En famille","Montre cette vidéo à ta famille et à tes amis."],
 ['🧩',"Un seul métier","Pour SHAMAN CHOOZ, préparer à manger, ranger la maison et s'occuper des enfants, c'est le même travail."]
];
const PAR = [
 ['👨‍👩‍👧',"Conseil aux parents","Expliquez à la personne qui garde vos enfants ce qu'ils aiment et ce qu'ils ne peuvent pas manger."],
 ['📝',"Des consignes claires","Écrire les horaires et les habitudes du goûter évite les malentendus avec la nounou."],
 ['🤝',"Un travail à deux","Parents et nounou travaillent ensemble pour le bien-être de l'enfant."],
 ['🔎',"SHAMAN CHOOZ recrute et place","Notre agence rapproche les familles et les personnes de maison, dans le respect de chacun."]
];
const NOU = [
 ['🧑‍🍳',"Conseil aux nounous","Demandez aux parents les habitudes de l'enfant, ses goûts et ses allergies."],
 ['🧼',"Hygiène avant tout","Mains propres, ustensiles propres, aliments bien conservés : c'est la base du métier."],
 ['🌟',"Un métier utile","S'occuper du goûter des enfants est une vraie responsabilité, faite avec cœur."],
 ['🧩',"Un seul métier","Pour SHAMAN CHOOZ, ménage, enfants et cuisine forment un même travail à respecter."]
];
AUD.forEach((A, ai) => TH.forEach((t, ti) => {
 const v = (k, a) => A.kid ? k : (a === undefined ? k : a);
 let sl = t.sl(v);
 const pool = A.kid ? KID : (A.p === 'p' ? PAR : NOU);
 sl = sl.concat([ pool[(ti + ai) % pool.length] ]);
 const title = A.kid ? 'Goûter des enfants — ' + t.ti : A.lab + ' — ' + t.ti;
 SCCS.add('rg-' + A.p + '-' + t.id, title, 'Goûter', A.pal, sl, { photo:true });
}));
})();

/* ==========================================================
   PUBS 12 — LES REPAS : PETIT DÉJEUNER, DÉJEUNER, DÎNER (120 nouveaux diaporamas éducatifs avec ta photo)
   3 repas × 2 publics (enfants / grandes personnes) × 20 sujets = 120 diaporamas.
   Conseils simples et prudents (hygiène, équilibre, habitudes) : ce ne sont pas des conseils médicaux.
   Message de SHAMAN CHOOZ : préparer les repas fait partie du même travail que le ménage et les enfants.
   Catégorie « Repas » : ces vidéos se mélangent aux autres sur toute la boucle 24h/24.
   Les identifiants commencent par « rp- ».
   Pour ajouter un sujet : une ligne T(...) ci-dessous = 6 nouvelles vidéos (3 repas × 2 publics).
   ========================================================== */
(function(){
if(!window.SCCS) return;
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const MEALS = [
 { p:'pdj', nm:'petit déjeuner', le:'le petit déjeuner', du:'du petit déjeuner', au:'au petit déjeuner', q:'le matin', e:'🌅', pal:'or',
   foods:"pain, œuf, bouillie, fruits, lait ou boisson chaude", tip:"Le matin, le corps a besoin d'énergie pour bien commencer la journée." },
 { p:'dej', nm:'déjeuner', le:'le déjeuner', du:'du déjeuner', au:'au déjeuner', q:'à midi', e:'☀️', pal:'orange',
   foods:"riz, attiéké, igname ou banane plantain, avec poisson, viande ou haricots, et des légumes", tip:"À midi, c'est le grand repas qui donne des forces pour l'après-midi." },
 { p:'din', nm:'dîner', le:'le dîner', du:'du dîner', au:'au dîner', q:'le soir', e:'🌙', pal:'nuit',
   foods:"soupe, légumes, riz ou purée léger, avec un peu de poisson ou un œuf", tip:"Le soir, un repas léger aide à mieux se reposer pendant la nuit." }
];
const AUD = [
 { p:'e', lab:'Pour les enfants', v:(k,a)=>k, tu:true },
 { p:'a', lab:'Pour les grandes personnes', v:(k,a)=>a, tu:false }
];
const CLOSE = [
 ['🧩',"Un seul métier","Pour SHAMAN CHOOZ, préparer les repas, faire le ménage et s'occuper des enfants, c'est le même travail."],
 ['📺',"Une chaîne pour toute la famille","Des vidéos tournent 24h/24 : repas, métiers, savoirs et jeux. Partage la chaîne !"],
 ['🍲',"La cuisine, un beau métier","Faire à manger pour une famille est un travail qui mérite le respect."],
 ['🤝',"SHAMAN CHOOZ recrute et place","Notre agence rapproche les familles et les personnes de maison, dans tous les secteurs."],
 ['❤️',"Merci à celles et ceux qui cuisinent","Chaque jour, ils font vivre les familles avec des repas préparés avec soin."],
 ['🌍',"Partout dans le monde","Dans tous les pays, on se retrouve autour d'un bon repas préparé avec amour."]
];
const TH = [];
/* T(id, titre(M,A), écrans(M,A) → 3 écrans [émoji, titre, texte]) ; A.v(version enfants, version adultes) */
const T = (id, ti, sl) => TH.push({ id, ti, sl });

T('mains', (M,A)=>`Se laver les mains avant ${M.le}`, (M,A)=>[
 ['🙌',"Mains propres, ventre content",A.v("Avant de manger, lave tes mains avec de l'eau et du savon.","Avant de passer à table, lavez vos mains avec de l'eau propre et du savon.")],
 ['⏱️',"Frotter assez longtemps","Frotte les paumes, le dos des mains, entre les doigts et sous les ongles, pendant environ vingt secondes."],
 ['🧼',"Pourquoi c'est important",`Les mains transportent des microbes. ${M.tip} Un repas pris avec des mains propres protège toute la famille.`]]);
T('eau', (M,A)=>`Boire de l'eau propre avec ${M.le}`, (M,A)=>[
 ['💧',"L'eau, première boisson",A.v("L'eau propre est la meilleure boisson pour grandir en bonne forme.","L'eau propre reste la meilleure boisson de tous les jours.")],
 ['🥤',"Attention aux boissons sucrées","Les jus très sucrés et les sodas contiennent beaucoup de sucre. Gardons-les pour de rares occasions."],
 ['🫗',"Une eau bien conservée",`Garde l'eau de ${M.le} dans un récipient propre et fermé, à l'abri de la poussière et des mouches.`]]);
T('assiette', (M,A)=>`L'assiette équilibrée ${M.du}`, (M,A)=>[
 ['🍽️',"Trois parties dans l'assiette","Un féculent pour l'énergie, une source de protéines pour grandir et se réparer, des légumes ou des fruits pour la vitalité."],
 ['🥘',`Idées pour ${M.le}`,`${cap(M.q)}, on peut préparer : ${M.foods}.`],
 ['🌈',"Varier chaque jour",A.v("Change de plats d'un jour à l'autre : ton corps aime la variété.","Variez les plats d'un jour à l'autre : c'est bon pour le corps et pour le plaisir.")]]);
T('fruits', (M,A)=>`Fruits et légumes de toutes les couleurs ${M.q}`, (M,A)=>[
 ['🍊',"Chaque couleur compte","Orange, vert, rouge, jaune : les fruits et légumes de différentes couleurs apportent des richesses différentes."],
 ['🥬',"Bien les laver","Rince toujours les fruits et les légumes à l'eau propre, surtout ceux qu'on mange crus."],
 ['🍌',"Un petit plus à chaque repas",A.v(`Essaie d'ajouter un fruit ou un légume à ${M.le}.`,`Essayez d'ajouter un fruit ou un légume à ${M.le}.`)]]);
T('lentement', (M,A)=>`Manger lentement ${M.le}`, (M,A)=>[
 ['🐢',"Prendre son temps",A.v("Mange doucement, sans te presser. Ton ventre a besoin de temps pour dire « j'ai assez mangé ».","Mangez sans vous presser : le corps met un peu de temps à sentir qu'il est rassasié.")],
 ['😋',"Bien mâcher","Mâcher longtemps aide à mieux digérer et à apprécier le goût des aliments."],
 ['🗣️',"Un moment pour parler","Manger lentement laisse aussi le temps de se parler en famille."]]);
T('portions', (M,A)=>`Les bonnes portions ${M.du}`, (M,A)=>[
 ['⚖️',"Ni trop, ni trop peu",A.v("Mange quand tu as faim et arrête-toi quand tu n'as plus faim.","Servez-vous une portion raisonnable, puis resservez-vous seulement si vous avez encore faim.")],
 ['🥄',"Servir petit, resservir si besoin","Il vaut mieux remplir une petite assiette et se resservir que gaspiller."],
 ['🌟',`Selon l'âge et l'activité`,`Chacun n'a pas les mêmes besoins. ${M.tip}`]]);
T('table', (M,A)=>`Mettre la table pour ${M.le}`, (M,A)=>[
 ['🍴',"Une belle table",A.v("Aide à mettre les assiettes, les verres et les cuillères sur la table.","Dresser la table, même simplement, rend le repas plus agréable pour tous.")],
 ['🧽',"Une table propre","Essuie la table avant et après le repas avec un chiffon propre."],
 ['🪑',"Chacun à sa place","S'asseoir ensemble, c'est se donner du temps les uns pour les autres."]]);
T('merci', (M,A)=>`Dire merci avant et après ${M.le}`, (M,A)=>[
 ['🙏',"Remercier",A.v("Dis merci à celui ou celle qui a préparé le repas.","Un simple merci fait chaud au cœur de celui ou celle qui a cuisiné.")],
 ['🤝',"Partager",`Partager ${M.le} avec les autres apprend la générosité.`],
 ['❤️',"Respecter la nourriture","On ne joue pas avec la nourriture : beaucoup de personnes ont travaillé pour qu'elle arrive dans l'assiette."]]);
T('sans-ecran', (M,A)=>`Sans téléphone ni télévision pendant ${M.le}`, (M,A)=>[
 ['📵',"Un repas sans écran",A.v("Pendant que tu manges, laisse le téléphone et la télévision de côté.","Éteindre les écrans pendant le repas aide à mieux profiter de chaque bouchée.")],
 ['👀',"Faire attention à ce qu'on mange","Sans écran, on sent mieux le goût et on sait mieux quand on n'a plus faim."],
 ['👨‍👩‍👧',"Se retrouver en famille","Le repas est l'un des rares moments où toute la famille se retrouve."]]);
T('horaires', (M,A)=>`Des horaires réguliers pour ${M.le}`, (M,A)=>[
 ['⏰',"Chaque repas à son heure",`${cap(M.q)}, essayons de manger à peu près à la même heure chaque jour.`],
 ['🚫',"Éviter de sauter les repas",A.v("Ne saute pas tes repas : ton corps a besoin d'énergie tout au long de la journée.","Sauter un repas fatigue et donne souvent envie de grignoter n'importe quoi ensuite.")],
 ['🌙',"Chaque repas son rôle",M.tip]]);
T('sucre-sel', (M,A)=>`Peu de sucre, peu de sel, peu de friture ${M.au}`, (M,A)=>[
 ['🧂',"Le sel en petite quantité","Goûte avant de resaler : une cuisine trop salée n'est pas bonne pour tout le monde."],
 ['🍬',"Le sucre avec modération","Trop de bonbons et de gâteaux coupent l'appétit et abîment les dents."],
 ['🍳',"La friture de temps en temps","Les plats bouillis, grillés ou mijotés sont de bons choix pour tous les jours."]]);
T('cuisson', (M,A)=>`Bien cuire les aliments ${M.du}`, (M,A)=>[
 ['🔥',"Cuire à cœur","Le poulet, le poisson, la viande et les œufs doivent être bien cuits à l'intérieur."],
 ['🔪',"Séparer le cru du cuit","Utilise une planche et un couteau différents pour la viande crue, puis lave-les."],
 ['👩‍🍳',A.v("Un adulte à côté de toi","Sécurité en cuisine"),A.v("Les enfants ne touchent jamais seuls au feu, à l'huile chaude ou aux casseroles brûlantes.","Tournez les queues de casseroles vers l'intérieur et éloignez les enfants du feu.")]]);
T('conservation', (M,A)=>`Bien conserver les restes ${M.du}`, (M,A)=>[
 ['🫙',"Couvrir et fermer","Un plat resté ouvert attire les mouches et les microbes. Couvre-le toujours."],
 ['❄️',"Au frais rapidement","Ne laisse pas un plat cuit traîner trop longtemps, surtout quand il fait chaud."],
 ['🗑️',"En cas de doute, on jette","Mauvaise odeur, goût étrange ou moisissure : il vaut mieux ne pas manger."]]);
T('courses', (M,A)=>`Bien choisir ses courses pour ${M.le}`, (M,A)=>[
 ['🛒',"Faire une liste","Écris ce qu'il faut avant de partir au marché : on évite d'acheter ce dont on n'a pas besoin."],
 ['🍅',"Les produits de saison","Les fruits et légumes de saison sont souvent plus frais et moins chers."],
 ['👀',"Bien regarder","Vérifie la fraîcheur : couleur, odeur, date de fin de vente pour les produits emballés."]]);
T('aider', (M,A)=>`Aider à préparer ${M.le}`, (M,A)=>[
 ['🧑‍🍳',A.v("Toi aussi, tu peux aider","Partager les tâches"),A.v("Laver les légumes, mettre la table, ranger : chacun peut aider à son niveau.","Quand chacun participe à la préparation, le repas est plus léger pour tous.")],
 ['🤗',"Apprendre en faisant","Faire à manger ensemble apprend la patience, l'organisation et la propreté."],
 ['🏡',"Un esprit d'équipe","Dans une maison, tout le monde compte : c'est ensemble qu'on réussit les repas."]]);
T('gouts', (M,A)=>`Goûter de nouveaux aliments ${M.au}`, (M,A)=>[
 ['🥣',"Oser goûter",A.v("Goûte un petit peu de chaque plat, même si tu ne connais pas encore.","Goûter un nouvel aliment, une fois, puis une autre fois, permet souvent de l'aimer.")],
 ['🍠',"Les saveurs de chez nous","Les plats de notre région sont souvent riches et variés : apprenons à les apprécier."],
 ['🌍',"Découvrir d'autres cuisines","Chaque pays a ses recettes : goûter, c'est aussi découvrir le monde."]]);
T('proteines', (M,A)=>`Les protéines ${M.au} : poisson, œuf, haricots`, (M,A)=>[
 ['🐟',"Pour grandir et se réparer","Le poisson, les œufs, la viande, les haricots et les arachides apportent des protéines."],
 ['🥚',"Variété avant tout","On peut alterner poisson, œufs et légumes secs selon le budget et les habitudes de la famille."],
 ['🍲',`Au menu ${M.du}`,`Idées simples : ${M.foods}.`]]);
T('menu-semaine', (M,A)=>`Préparer le menu de la semaine : ${M.le}`, (M,A)=>[
 ['📝',"Planifier","Écris le menu de la semaine : on gagne du temps et de l'argent."],
 ['🗓️',"Un plat différent chaque jour","Alterner les plats évite de manger toujours la même chose."],
 ['✅',"Moins de stress","Quand on sait à l'avance ce qu'on prépare, on cuisine plus calmement."]]);
T('gaspillage', (M,A)=>`Ne pas gaspiller ${M.le}`, (M,A)=>[
 ['♻️',"Chaque aliment compte","Des personnes ont travaillé pour produire cette nourriture : ne la jetons pas sans raison."],
 ['🥗',"Réutiliser les restes","Un reste bien conservé peut devenir un nouveau plat, avec des légumes frais."],
 ['🍽️',"Se servir raisonnablement",A.v("Prends ce que tu peux manger, tu pourras toujours en reprendre.","Servez les portions petit à petit pour éviter les restes inutiles.")]]);
T('metier', (M,A)=>`Préparer ${M.le} : un vrai métier de la maison`, (M,A)=>[
 ['👩‍🍳',"Cuisiner, c'est un métier","Préparer les repas d'une famille demande du savoir-faire, de la propreté et de l'organisation."],
 ['🧩',"Un seul métier","Pour SHAMAN CHOOZ, la cuisine, le ménage et les enfants font partie du même travail."],
 ['🌟',"Un travail à respecter","Celles et ceux qui font à manger pour les autres méritent notre respect et notre merci."]]);

/* Version « vous » pour les grandes personnes (les textes sont écrits en « tu » par défaut) */
const VOUS = [["Frotte ","Frottez "],["Rince ","Rincez "],["Utilise ","Utilisez "],["lave-les","lavez-les"],["Couvre-le","Couvrez-le"],["Ne laisse pas","Ne laissez pas"],["Écris ","Écrivez "],["Vérifie ","Vérifiez "],["Goûte ","Goûtez "],["Garde l'eau","Gardez l'eau"],["Essuie ","Essuyez "],["Partage la chaîne","Partagez la chaîne"],["Garde ","Gardez "]];
const vous = x => VOUS.reduce((a, r) => a.split(r[0]).join(r[1]), x);
AUD.forEach(A => MEALS.forEach((M, mi) => TH.forEach((t, ti) => {
 let sl = t.sl(M, A).concat([ CLOSE[(mi * 3 + ti + (A.tu ? 0 : 2)) % CLOSE.length] ]);
 if(!A.tu) sl = sl.map(x => [x[0], x[1], vous(x[2])]);
 const title = A.lab + ' : ' + t.ti(M, A);
 SCCS.add('rp-' + M.p + '-' + A.p + '-' + t.id, title, 'Repas', M.pal, sl, { photo:true });
})));
})();

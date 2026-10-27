/* ==========================================================
   PUBS 22 — SHAMAN CHOOZ EXPLIQUE LA MAISON : 300 nouveaux diaporamas avec ta photo
   150 vidéos « comment bien faire » : ménage (24), rangement (20), lessive (20), vaisselle (16), douches et WC (20),
        jardin (20), garage (15), logement indépendant pour les visiteurs (15).
   100 vidéos pour encourager les filles de ménage, nounous, servantes de maison et gouvernantes de domicile à bien faire leur travail
        (4 métiers × 25 sujets).
   50 vidéos sur le respect entre employeurs et employés (25 pour les employeurs, 25 pour les employés).
   SHAMAN CHOOZ parle à la première personne (« Moi, SHAMAN CHOOZ, je vous explique… »). Tout est dit simplement.
   Les identifiants commencent par « tm- tr- tl- tv- td- tj- tg- tk- » (comment faire), « te- » (encouragement), « tp- » (respect).
   Pour ajouter un conseil : une ligne T('tm', titre, étapes, astuce) = 1 nouvelle vidéo.
   ========================================================== */
(function(){
if(!window.SCCS) return;
const PAL = ['orange','vert','bleu','rose','violet','turquoise','or','terre','rouge','nuit'];
const CLOSE = [
 ['📞',"Besoin de personnel de maison ?","SHAMAN CHOOZ recrute et place des filles de ménage, nounous, servantes et gouvernantes, partout dans le monde."],
 ['📺',"Partagez la chaîne","Moi, SHAMAN CHOOZ, je vous explique chaque jour une chose simple. Partagez la chaîne avec vos proches."],
 ['🧩',"Un seul métier","Pour SHAMAN CHOOZ, faire le ménage, s'occuper des enfants et cuisiner, c'est le même travail."],
 ['🤝',"Respect et travail bien fait","Un travail bien fait et un respect mutuel : c'est la clé d'une maison heureuse."]
];
let kc = 0;

/* ---------- 1. Comment bien faire (150) ---------- */
const TOP = {
 tm:{cat:'Ménage',emo:'🧹',why:["Une maison propre protège la santé de toute la famille.","Un ménage bien fait donne de la joie à ceux qui vivent dans la maison.","Quand on connaît les bons gestes, on travaille mieux et on se fatigue moins."]},
 tr:{cat:'Rangement',emo:'📦',why:["Une maison bien rangée fait gagner du temps chaque jour.","Quand chaque chose a sa place, on retrouve tout facilement.","Le rangement donne une maison calme et agréable à vivre."]},
 tl:{cat:'Lessive',emo:'👕',why:["Des habits propres et bien soignés durent beaucoup plus longtemps.","Une bonne lessive protège la peau et garde les couleurs.","Bien laver le linge, c'est prendre soin de toute la famille."]},
 tv:{cat:'Vaisselle',emo:'🍽️',why:["Une vaisselle bien lavée évite les microbes et les maladies.","Une cuisine propre commence par une vaisselle faite à temps.","Avec les bons gestes, la vaisselle se fait vite et bien."]},
 td:{cat:'Douches et WC',emo:'🚿',why:["Les douches et les WC propres protègent contre les maladies.","Une salle d'eau propre donne une bonne image de la maison.","Bien entretenir ces pièces évite les mauvaises odeurs et la moisissure."]},
 tj:{cat:'Jardin',emo:'🌳',why:["Un jardin bien entretenu rend la maison belle et accueillante.","Un jardin propre éloigne les moustiques et les serpents.","Prendre soin du jardin, c'est prendre soin de l'air que l'on respire."]},
 tg:{cat:'Garage',emo:'🚗',why:["Un garage bien tenu protège la voiture et les outils.","Un garage rangé est un garage plus sûr pour tout le monde.","Entretenir le garage évite les accidents et les pertes de temps."]},
 tk:{cat:'Logement visiteurs',emo:'🛏️',why:["Un logement prêt fait très bonne impression sur les visiteurs.","Un visiteur bien accueilli n'oublie jamais la maison.","Un logement indépendant bien entretenu est toujours prêt à recevoir."]}
};
const cnt = {};
const T = (k, titre, steps, tip) => { const o = TOP[k]; const n = cnt[k] = (cnt[k] || 0) + 1;
  SCCS.add(k + '-' + n, 'Comment bien ' + titre.charAt(0).toLowerCase() + titre.slice(1), o.cat, PAL[kc++ % PAL.length], [
    [o.emo, "Pourquoi c'est important", "Moi, SHAMAN CHOOZ, je vous explique simplement. " + o.why[n % 3]],
    [o.emo, "Les étapes", steps],
    ['💡', "L'astuce de SHAMAN CHOOZ", tip],
    CLOSE[kc % CLOSE.length] ], { photo:true }); };

/* --- Ménage (24) --- */
T('tm',"Balayer sans soulever la poussière","Ouvrez la fenêtre. Balayez doucement du fond de la pièce vers la porte, en gardant le balai près du sol. Ramassez avec la pelle.","Avant de balayer, passez un chiffon légèrement humide sur les plinthes : la poussière ne s'envole plus.");
T('tm',"Laver le sol à la serpillière","Balayez d'abord. Préparez un seau d'eau avec un peu de savon. Essorez bien la serpillière, puis lavez en reculant vers la sortie.","Changez l'eau quand elle devient sale : un sol lavé avec de l'eau sale reste sale.");
T('tm',"Dépoussiérer les meubles","Prenez un chiffon propre et doux. Commencez par le haut du meuble, puis descendez. Soulevez les objets, essuyez dessous, reposez-les.","Pliez le chiffon en quatre : quand une face est sale, tournez-la et utilisez la suivante.");
T('tm',"Nettoyer les vitres sans traces","Passez de l'eau avec un peu de savon, puis séchez avec un chiffon propre ou du papier journal, en faisant des mouvements réguliers.","Ne nettoyez jamais les vitres en plein soleil : elles sèchent trop vite et laissent des traces.");
T('tm',"Faire le ménage dans le bon ordre","Commencez par aérer. Dépoussiérez de haut en bas, nettoyez les meubles, puis balayez, et laissez le sol pour la fin.","Finissez toujours par la pièce où vous sortez de la maison : vous ne marchez pas sur le sol propre.");
T('tm',"Nettoyer la cuisine après le repas","Rangez les restes, lavez la vaisselle, essuyez la table et le plan de travail, nettoyez la cuisinière, puis balayez et lavez le sol.","Essuyez tout de suite les taches : une tache fraîche part facilement, une tache sèche demande beaucoup d'efforts.");
T('tm',"Nettoyer le salon","Rangez les objets, secouez les coussins, dépoussiérez les meubles et la télévision, passez l'aspirateur ou le balai, puis lavez le sol.","Éloignez les fauteuils pour nettoyer dessous : c'est là que la poussière s'accumule le plus.");
T('tm',"Nettoyer la chambre à coucher","Aérez, retirez les draps, dépoussiérez les meubles, nettoyez le sol sous le lit, puis remettez des draps propres.","Regardez sous le lit une fois par semaine : la poussière cachée fait tousser pendant la nuit.");
T('tm',"Changer les draps","Retirez les draps sales, secouez le matelas, tendez le drap propre aux quatre coins, puis mettez la housse de couette et les taies.","Changez les draps une fois par semaine, et plus souvent s'il fait très chaud.");
T('tm',"Faire le lit proprement","Tendez le drap sans plis, tirez la couverture bien droite, secouez les oreillers et placez-les au centre.","Faire le lit en 2 minutes dès le matin donne une chambre ordonnée toute la journée.");
T('tm',"Nettoyer les escaliers et les couloirs","Balayez marche par marche en descendant. Lavez avec peu d'eau pour ne pas rendre les marches glissantes. Essuyez la rampe.","Posez un panneau « sol mouillé » : la sécurité des enfants et des personnes âgées passe avant tout.");
T('tm',"Nettoyer les fenêtres et les rebords","Enlevez la poussière avec une brosse, lavez les rebords avec de l'eau savonneuse, rincez et séchez bien.","Pensez aux petits coins avec un vieux pinceau ou une brosse à dents.");
T('tm',"Enlever les toiles d'araignée","Avec un balai doux ou un chiffon enroulé sur un manche, prenez la toile dans les coins du plafond et dans les angles des murs.","Faites-le avant de balayer : tout ce qui tombe sera ramassé avec le reste.");
T('tm',"Nettoyer les ventilateurs","Débranchez toujours d'abord. Essuyez les pales avec un chiffon humide, une par une, puis la grille. Séchez avant de rebrancher.","Un ventilateur propre rafraîchit mieux et ne renvoie pas la poussière dans la pièce.");
T('tm',"Nettoyer le réfrigérateur","Débranchez. Sortez les aliments, lavez les étagères avec de l'eau savonneuse, rincez, séchez, remettez les aliments en jetant les périmés.","Mettez un petit bol de bicarbonate au fond du réfrigérateur pour chasser les mauvaises odeurs.");
T('tm',"Nettoyer la cuisinière","Quand elle est froide, retirez les grilles, lavez-les à l'eau chaude, nettoyez la surface avec une éponge et séchez.","Nettoyez la cuisinière chaque jour : le gras ancien devient très dur à enlever.");
T('tm',"Nettoyer les poubelles","Videz, lavez avec de l'eau chaude et du savon, frottez avec une brosse, rincez, laissez sécher au soleil.","Mettez un sac propre à chaque fois : la poubelle reste propre plus longtemps.");
T('tm',"Chasser les mauvaises odeurs","Aérez largement. Cherchez la source : poubelle, évier, chaussures, linge humide. Nettoyez la source, pas seulement la pièce.","Un citron coupé ou du marc de café sec dans une coupelle absorbe les odeurs.");
T('tm',"Nettoyer les portes et les poignées","Essuyez les portes avec un chiffon humide, frottez les poignées avec de l'eau savonneuse, puis séchez.","Les poignées sont touchées par toute la famille : nettoyez-les chaque jour.");
T('tm',"Nettoyer les miroirs","Vaporisez un peu d'eau savonneuse ou de vinaigre blanc dilué sur le chiffon, pas sur le miroir. Frottez en cercles, séchez.","Terminez avec un chiffon sec en faisant de haut en bas : le miroir brille.");
T('tm',"Nettoyer le carrelage et les joints","Balayez, lavez avec de l'eau savonneuse, frottez les joints avec une vieille brosse, rincez et séchez.","Un peu de bicarbonate sur une brosse humide redonne leur éclat aux joints.");
T('tm',"Faire un ménage rapide en 30 minutes","Aérez, ramassez ce qui traîne, dépoussiérez les surfaces visibles, balayez les pièces principales, lavez la cuisine et la salle d'eau.","Mettez de la musique et un minuteur : le temps passe vite et on travaille avec plaisir.");
T('tm',"Le grand ménage du week-end","Choisissez une pièce par heure. Déplacez les meubles, lavez les murs bas, nettoyez sous les lits et derrière les canapés.","Faites une liste. Cochez chaque tâche terminée : vous voyez votre progrès.");
T('tm',"Utiliser les produits en toute sécurité","Lisez l'étiquette, portez des gants, ne mélangez jamais deux produits, aérez la pièce et gardez les produits hors de portée des enfants.","Ne mélangez jamais la javel avec un autre produit : le mélange peut créer un gaz dangereux.");

/* --- Rangement (20) --- */
T('tr',"Ranger la cuisine","Regroupez les casseroles, les assiettes et les verres par catégorie. Mettez en haut ce qu'on utilise le moins, en bas le plus lourd.","Collez une petite étiquette sur chaque étagère : tout le monde sait où ranger.");
T('tr',"Ranger les placards","Videz le placard, jetez ce qui est cassé ou périmé, lavez l'étagère, puis remettez les objets par famille.","Mettez devant ce qu'on utilise chaque jour, au fond ce qu'on utilise rarement.");
T('tr',"Ranger la chambre des enfants","Faites une caisse pour les peluches, une pour les voitures, une pour les jeux de société. Les enfants rangent avec vous.","Transformez le rangement en jeu : « Qui range le plus vite ? »");
T('tr',"Ranger les jouets","Triez : jouets en bon état, jouets cassés à jeter, jouets à donner. Rangez par type dans des boîtes bien visibles.","Laissez au maximum une boîte de jouets sortie à la fois, pour éviter le désordre.");
T('tr',"Ranger l'armoire et les vêtements","Pliez les vêtements, rangez les pantalons ensemble, les chemises ensemble, le linge de corps dans les tiroirs du bas.","Mettez les vêtements de saison devant et les autres au fond.");
T('tr',"Ranger les chaussures","Nettoyez les chaussures, faites-les sécher, rangez-les par paires sur une étagère ou dans un meuble près de l'entrée.","Rangez les chaussures des enfants en bas : ils pourront les prendre seuls.");
T('tr',"Ranger le salon","Replacez coussins et télécommandes, rassemblez les journaux, remettez les objets à leur place avant de nettoyer.","Faites un tour de salon de 5 minutes chaque soir : le lendemain, tout est prêt.");
T('tr',"Ranger les papiers importants","Mettez les papiers dans une chemise ou une boîte : identité, santé, école, factures. Une chemise par sujet.","Écrivez le nom du sujet sur chaque chemise pour retrouver un papier en dix secondes.");
T('tr',"Ranger l'entrée de la maison","Prévoyez un endroit pour les chaussures, les clés et les sacs. Rangez ce qui est sorti dès l'arrivée.","Un petit crochet pour les clés évite de les chercher chaque matin.");
T('tr',"Ranger la salle de bain","Rangez les brosses à dents, les savons et les serviettes. Jetez les produits finis ou périmés.","Gardez les produits dangereux dans un endroit fermé, hors de portée des enfants.");
T('tr',"Ranger les produits d'entretien","Regroupez tous les produits dans un même placard. Gardez-les dans leur bouteille d'origine, avec l'étiquette.","Rangez les produits en bas, loin des aliments, mais fermez toujours l'accès aux enfants.");
T('tr',"Ranger le garde-manger","Mettez les anciens produits devant, les nouveaux derrière. Fermez bien les sacs de riz, de sucre et de farine.","Notez la date d'ouverture sur les paquets : on ne gaspille plus.");
T('tr',"Ranger le linge propre","Pliez les draps, les serviettes et les habits dès qu'ils sont secs. Rangez-les par personne ou par type.","Mettez les serviettes du bas vers le haut : les plus anciennes servent d'abord.");
T('tr',"Ranger les tiroirs","Videz le tiroir, jetez ce qui est inutile, mettez des petites boîtes pour séparer les objets.","Un tiroir plein est un tiroir en désordre : gardez de la place libre.");
T('tr',"Faire le tri et le débarras","Faites trois tas : je garde, je donne, je jette. Soyez honnête : si vous n'avez pas utilisé quelque chose depuis un an, donnez-le.","Faites le tri une petite zone à la fois, sinon on se décourage.");
T('tr',"Ranger les livres et les cahiers","Rangez par taille ou par sujet. Mettez les livres des enfants à leur hauteur.","Rangez les cahiers de l'école près du lieu de devoirs pour gagner du temps.");
T('tr',"Ranger le bureau","Gardez sur la table seulement ce que vous utilisez. Rangez stylos, papiers et chargeurs dans des boîtes.","Videz la corbeille et rangez le bureau avant de partir : le lendemain commence bien.");
T('tr',"Ranger les valises et les sacs","Videz-les, aérez-les, lavez l'intérieur si besoin, puis mettez-les à plat ou l'une dans l'autre dans un endroit sec.","Laissez un morceau de savon dans la valise pour une bonne odeur.");
T('tr',"Ranger avant de dormir","Faites le tour de la maison : jouets, vaisselle, coussins, chaussures. Dix minutes suffisent.","Un dernier regard à la cuisine : une cuisine rangée donne un réveil agréable.");
T('tr',"Une place pour chaque chose","Donnez à chaque objet sa place. Expliquez la place à toute la famille et remettez toujours l'objet au même endroit.","Quand on remet un objet à sa place tout de suite, on n'a plus de grand rangement à faire.");

/* --- Lessive (20) --- */
T('tl',"Trier le linge avant de laver","Faites trois tas : blanc, couleurs claires, couleurs foncées. Mettez à part les vêtements fragiles et très sales.","Videz toujours les poches : un stylo ou un papier peut abîmer tout le linge.");
T('tl',"Laver le linge à la main","Faites tremper dans l'eau savonneuse, frottez les parties sales, rincez deux ou trois fois à l'eau claire, puis essorez.","Rincez jusqu'à ce que l'eau soit claire : le savon qui reste irrite la peau.");
T('tl',"Utiliser la machine à laver","Triez, videz les poches, ne remplissez pas trop le tambour, mettez la bonne dose de lessive et choisissez le bon programme.","Laissez la main de place dans le tambour : le linge doit pouvoir bouger.");
T('tl',"Bien doser la lessive","Suivez la dose écrite sur le paquet. Trop de lessive abîme le linge et laisse des traces sur la peau.","Pour peu de linge, utilisez moins de lessive : plus n'est pas mieux.");
T('tl',"Enlever les taches d'huile","Mettez du talc ou de la farine sur la tache fraîche, laissez agir, brossez, puis lavez avec du savon.","Agissez vite : une tache fraîche part bien plus facilement.");
T('tl',"Enlever les taches de sauce et de nourriture","Rincez à l'eau froide, frottez avec un peu de savon, puis lavez normalement.","N'utilisez pas d'eau chaude au début : elle fixe la tache dans le tissu.");
T('tl',"Laver le linge blanc","Lavez les blancs seuls. Laissez-les tremper avec de la lessive, frottez les taches, puis séchez au soleil.","Le soleil est le meilleur blanchisseur naturel : étendez le linge blanc au soleil.");
T('tl',"Laver les vêtements de couleur","Retournez-les, lavez à l'eau froide ou tiède avec peu de lessive, puis séchez à l'ombre.","Faites sécher les couleurs à l'envers et à l'ombre pour garder leur éclat.");
T('tl',"Laver les vêtements délicats","Utilisez de l'eau tiède et un savon doux. Ne tordez pas : pressez doucement et étendez à plat.","Lisez l'étiquette dans le vêtement : elle indique la température et le séchage.");
T('tl',"Faire sécher le linge au soleil","Secouez chaque pièce avant de l'étendre. Mettez le linge bien droit avec des pinces. Rentrez avant la pluie.","Les chemises sèchent mieux sur des cintres, les pantalons par la ceinture.");
T('tl',"Bien repasser","Triez par tissu, commencez par les plus fragiles, repassez à l'envers, suivez le fil du tissu. Débranchez à la fin.","Ne laissez jamais le fer posé sur le linge, et gardez-le loin des enfants.");
T('tl',"Bien plier le linge","Étalez, rabattez les côtés, pliez en deux, puis en trois. Faites des piles régulières pour gagner de la place.","Pliez les serviettes de la même façon : le placard est plus beau et plus facile à ranger.");
T('tl',"Laver les draps","Retirez les draps chaque semaine. Lavez à l'eau chaude si le tissu le permet, séchez au soleil, repassez ou pliez.","Séchez bien les draps avant de les ranger : l'humidité donne une mauvaise odeur.");
T('tl',"Laver les serviettes","Lavez à chaud avec peu de lessive. Évitez l'adoucissant : il empêche la serviette d'absorber l'eau.","Séchez-les bien au soleil : elles seront douces et sans odeur.");
T('tl',"Laver les vêtements de bébé","Utilisez un savon doux, sans parfum fort. Rincez très bien. Lavez à part des vêtements des adultes.","Passez le bout du doigt dans la lessive pour vérifier : si elle pique, rincez encore.");
T('tl',"Laver les chaussettes et le linge de corps","Retournez-les, lavez à l'eau chaude si possible, avec un bon savon. Faites sécher au soleil.","Rangez les chaussettes par paires pour ne jamais en perdre.");
T('tl',"Laver les jeans","Retournez le jean, lavez à l'eau froide, séchez à l'envers, à l'ombre, pour garder la couleur.","Ne lavez pas le jean trop souvent : il garde sa forme plus longtemps.");
T('tl',"Éviter que les couleurs déteignent","Lavez séparément les couleurs vives pendant les premiers lavages. Faites un test avec un petit morceau mouillé sur un tissu blanc.","Ajoutez un peu de sel dans l'eau du premier lavage pour fixer la couleur.");
T('tl',"Chasser l'odeur d'humidité du linge","Ne laissez jamais le linge mouillé dans la machine ou le seau. Étendez dès la fin du lavage, au soleil et au grand air.","Un peu de vinaigre blanc dans le dernier rinçage chasse l'odeur.");
T('tl',"Ranger le linge après la lessive","Rangez le linge bien sec et bien plié. Mettez les vêtements de chacun au même endroit.","Aérez le placard régulièrement et mettez un petit sachet parfumé.");

/* --- Vaisselle (16) --- */
T('tv',"Faire la vaisselle dans le bon ordre","Commencez par les verres, puis les couverts, les assiettes, les plats, et enfin les casseroles les plus sales.","Changez l'eau quand elle devient grasse : la vaisselle sera vraiment propre.");
T('tv',"Préparer la vaisselle avant de la laver","Retirez les restes dans la poubelle, rincez à l'eau claire, mettez les casseroles sales à tremper.","Un trempage de dix minutes fait gagner beaucoup de temps de frottement.");
T('tv',"Laver les casseroles brûlées","Mettez de l'eau et du savon, chauffez doucement, laissez tiédir, puis frottez avec une éponge. Pour le plus tenace, laissez tremper la nuit.","Une cuillère de bicarbonate dans l'eau aide à décoller le fond brûlé.");
T('tv',"Laver les poêles et les casseroles grasses","Essuyez d'abord le gras avec du papier, lavez à l'eau chaude avec du savon, rincez, puis séchez tout de suite.","Séchez les poêles sur le feu doux une minute pour éviter la rouille.");
T('tv',"Laver les couteaux en sécurité","Lavez les couteaux un par un, manche vers vous, lame vers l'extérieur. Ne les laissez jamais cachés dans l'eau.","Séchez et rangez les couteaux tout de suite, hors de portée des enfants.");
T('tv',"Avoir des verres brillants","Lavez les verres en premier, dans de l'eau propre. Rincez à l'eau claire et séchez avec un chiffon sec.","Un peu de vinaigre blanc dans l'eau de rinçage fait briller les verres.");
T('tv',"Laver la vaisselle en plastique","Utilisez de l'eau tiède et un savon doux. Évitez l'eau trop chaude qui déforme le plastique.","Séchez bien le plastique avant de le ranger pour éviter les mauvaises odeurs.");
T('tv',"Bien essuyer et sécher la vaisselle","Laissez égoutter, puis essuyez avec un torchon propre. Rangez quand tout est bien sec.","Changez de torchon chaque jour : un torchon sale donne des microbes à la vaisselle.");
T('tv',"Garder une éponge propre","Rincez l'éponge après chaque utilisation, pressez-la, laissez-la sécher. Changez-la dès qu'elle sent mauvais.","Une éponge sale rend la vaisselle sale : changez-la souvent.");
T('tv',"Nettoyer l'évier","Après la vaisselle, retirez les restes du filtre, lavez l'évier avec du savon, rincez à l'eau claire et séchez le robinet.","Versez de l'eau très chaude dans le tuyau de temps en temps pour éviter les bouchons.");
T('tv',"Faire la vaisselle après chaque repas","Ne laissez pas la vaisselle s'accumuler. Lavez après le repas pendant que les restes sont encore mous.","Un évier vide la nuit empêche les cafards et les mauvaises odeurs.");
T('tv',"Laver les grands plats et les marmites","Faites tremper avec de l'eau chaude et du savon. Utilisez une grosse éponge et frottez en cercles.","Posez les marmites sur un tapis ou un torchon pour ne pas rayer l'évier.");
T('tv',"Économiser l'eau en lavant la vaisselle","Remplissez une bassine d'eau savonneuse et une autre d'eau de rinçage. Ne laissez pas le robinet ouvert.","L'eau économisée, c'est de l'argent économisé pour toute la maison.");
T('tv',"Enlever le gras sur la vaisselle","Utilisez de l'eau chaude et une bonne dose de savon. Essuyez le gras avec du papier avant de laver.","Ne versez jamais de l'huile dans l'évier : elle bouche les tuyaux.");
T('tv',"Laver les biberons","Rincez après chaque usage, lavez avec une brosse spéciale et du savon, rincez longtemps, faites sécher à l'envers.","Les biberons doivent être très propres : lavez-les toujours avec soin.");
T('tv',"Ranger la vaisselle propre","Rangez les assiettes par pile, les verres à l'envers, les couverts séparés, les casseroles en bas.","Ne rangez jamais de la vaisselle mouillée : elle moisit et sent mauvais.");

/* --- Douches et WC (20) --- */
T('td',"Nettoyer la douche","Mouillez les murs et le sol, appliquez un produit adapté, frottez avec une brosse, rincez bien, puis séchez avec une raclette.","Séchez les murs de la douche après chaque utilisation : le calcaire ne s'installe pas.");
T('td',"Enlever la moisissure des joints","Frottez avec une vieille brosse à dents et un produit adapté, rincez bien, aérez et séchez complètement.","Gardez la salle de bain bien aérée : la moisissure aime l'humidité.");
T('td',"Enlever le calcaire des robinets","Enveloppez le robinet avec un chiffon imbibé de vinaigre blanc pendant une heure, frottez, rincez et séchez.","Essuyez les robinets chaque jour pour éviter que le calcaire s'installe.");
T('td',"Nettoyer le rideau de douche","Retirez-le, lavez-le avec de l'eau savonneuse ou en machine, rincez et suspendez-le pour qu'il sèche à l'air libre.","Écartez le rideau après la douche : il sèche vite et ne moisit pas.");
T('td',"Déboucher et nettoyer le siphon","Retirez le couvercle, enlevez cheveux et saletés avec des gants, lavez à l'eau chaude et remettez en place.","Retirez les cheveux après chaque douche pour éviter que l'eau ne remonte.");
T('td',"Nettoyer la cuvette des WC","Mettez un produit sous le bord, laissez agir quelques minutes, frottez avec la brosse, puis tirez la chasse.","Utilisez une brosse réservée aux WC et rien d'autre.");
T('td',"Nettoyer la lunette et l'abattant","Prenez un chiffon réservé aux WC, nettoyez le dessus, le dessous et les charnières, puis séchez.","Nettoyez la lunette chaque jour : c'est la partie la plus touchée.");
T('td',"Entretenir la brosse de WC","Rincez la brosse en tirant la chasse, laissez-la sécher, lavez le support de temps en temps avec du produit.","Changez la brosse quand elle est usée ou abîmée.");
T('td',"Nettoyer le sol des WC","Balayez d'abord, lavez avec un seau et une serpillière réservés aux WC, puis rincez et séchez.","Terminez toujours par les WC : on ne ramène pas les microbes dans le reste de la maison.");
T('td',"Chasser les mauvaises odeurs des WC","Nettoyez la cuvette et le sol, aérez la pièce, vérifiez la chasse d'eau et le tuyau.","Une fenêtre ouverte ou un petit désodorisant naturel (citron, menthe) aide beaucoup.");
T('td',"Ne jamais mélanger les produits","Utilisez un seul produit à la fois. Rincez à l'eau claire avant d'en utiliser un autre.","Javel et autres produits mélangés peuvent créer un gaz toxique : restez prudent.");
T('td',"Se protéger avec des gants","Portez des gants pour les WC, d'autres pour la cuisine. Lavez-vous bien les mains après le travail.","Gardez des gants de couleurs différentes pour ne pas les confondre.");
T('td',"Aérer la salle de bain","Ouvrez la porte et la fenêtre après chaque douche. Mettez le ventilateur si vous en avez un.","L'air qui circule empêche la moisissure et les mauvaises odeurs.");
T('td',"Nettoyer le lavabo","Mouillez, frottez avec une éponge et du savon, rincez, nettoyez le robinet, puis séchez avec un chiffon.","Pensez à nettoyer aussi le bouchon et le trop-plein, où la saleté se cache.");
T('td',"Nettoyer le miroir de la salle de bain","Utilisez un chiffon humide avec un peu de savon, séchez avec un chiffon propre pour éviter les traces.","Passez une seconde fois quand le miroir est sec pour qu'il brille.");
T('td',"Gérer les serviettes de la salle de bain","Mettez une serviette par personne, suspendez-la pour qu'elle sèche, lavez-la souvent.","Une serviette humide mise en boule sent mauvais en quelques heures.");
T('td',"Entretenir les tapis de salle de bain","Secouez le tapis dehors, lavez-le chaque semaine, faites-le bien sécher au soleil.","Un tapis mouillé est dangereux et sent mauvais : séchez-le toujours.");
T('td',"Un planning pour les douches et les WC","Nettoyez les WC chaque jour, la douche deux fois par semaine, un grand nettoyage une fois par semaine.","Un petit nettoyage régulier évite les gros efforts.");
T('td',"Nettoyer la baignoire","Mouillez, étalez un produit doux, frottez avec une éponge, rincez à l'eau claire et séchez avec un chiffon.","Utilisez un chiffon doux pour ne pas rayer la baignoire.");
T('td',"Utiliser des seaux et chiffons séparés","Gardez un chiffon et un seau pour les WC, d'autres pour la douche, d'autres pour la cuisine. Marquez-les de couleurs.","Séparer les chiffons évite de transporter les microbes d'une pièce à l'autre.");

/* --- Jardin (20) --- */
T('tj',"Arroser le jardin","Arrosez tôt le matin ou le soir, à la base des plantes, pas sur les feuilles. Donnez de l'eau lentement pour qu'elle pénètre.","Un arrosage profond deux fois par semaine vaut mieux qu'un peu d'eau tous les jours.");
T('tj',"Couper l'herbe","Choisissez un jour sec. Coupez régulièrement, sans raser l'herbe trop court. Ramassez l'herbe coupée.","Aiguisez la lame : une lame qui coupe bien garde la pelouse en bonne santé.");
T('tj',"Désherber le jardin","Arrachez les mauvaises herbes après la pluie, avec la racine. Ne les laissez pas faire de graines.","Désherber un peu chaque jour est plus facile qu'un grand désherbage une fois par mois.");
T('tj',"Tailler les arbustes","Prenez un sécateur propre et bien aiguisé. Coupez les branches mortes, puis donnez la forme voulue.","Coupez un peu en biais pour que l'eau de pluie coule et que la plante cicatrise.");
T('tj',"Ramasser les feuilles","Ramassez à la main ou au râteau. Mettez-les au compost ou dans un sac.","Ne laissez pas les feuilles sur les allées : elles peuvent faire glisser.");
T('tj',"Faire du compost","Mettez dans un bac les épluchures, les feuilles sèches et l'herbe coupée. Remuez de temps en temps.","Le compost prêt est un excellent engrais gratuit pour le jardin.");
T('tj',"Planter des légumes","Préparez la terre, faites des petits trous, plantez les graines ou les jeunes plants, arrosez doucement.","Plantez des légumes que votre famille mange déjà : rien ne se perd.");
T('tj',"Choisir un engrais naturel","Mélangez du compost, des feuilles mortes et un peu de cendre de bois. Étalez autour des plantes.","Un engrais naturel nourrit la terre pour longtemps.");
T('tj',"Entretenir les plantes en pot","Arrosez quand la terre est sèche à un doigt de profondeur. Retirez les feuilles mortes. Tournez le pot vers la lumière.","Mettez une soucoupe sous le pot, mais videz-la pour éviter l'eau stagnante.");
T('tj',"Prendre soin des fleurs","Retirez les fleurs fanées, arrosez le matin, ajoutez un peu d'engrais, protégez du soleil très fort.","Couper les fleurs fanées fait pousser de nouvelles fleurs.");
T('tj',"Protéger les plantes du soleil","Mettez un voile ou un petit abri sur les jeunes plants aux heures les plus chaudes. Arrosez tôt le matin.","Un peu de paille autour du pied garde l'humidité de la terre.");
T('tj',"Éviter les moustiques dans le jardin","Videz les seaux, pots et pneus qui gardent l'eau. Changez l'eau des soucoupes et des bassins chaque semaine.","Les moustiques naissent dans l'eau stagnante : supprimez-la, ils disparaissent.");
T('tj',"Entretenir la clôture et le portail","Vérifiez les poteaux, resserrez les vis, nettoyez, repeignez si besoin. Huilez la serrure et les charnières.","Une clôture en bon état protège les enfants et éloigne les voleurs.");
T('tj',"Nettoyer les allées et la cour","Balayez, enlevez les herbes entre les dalles, lavez à l'eau avec un peu de savon si besoin.","Faites-le tôt le matin, quand il fait encore frais.");
T('tj',"Entretenir les outils de jardin","Lavez la terre, séchez, huilez un peu les parties en métal, puis rangez à l'abri de la pluie.","Un outil propre dure dix ans de plus.");
T('tj',"Entretenir une haie","Taillez deux fois par an, plus large en bas qu'en haut pour que la lumière arrive partout.","Mettez un cordeau tendu pour tailler bien droit.");
T('tj',"Entretenir la pelouse","Coupez régulièrement, arrosez, enlevez les mauvaises herbes, ajoutez un peu d'engrais au début de la saison des pluies.","Évitez de marcher sur l'herbe toute mouillée : elle s'abîme.");
T('tj',"Prendre soin des arbres fruitiers","Arrosez en saison sèche, enlevez les branches mortes, ramassez les fruits tombés pour éviter les insectes.","Mettez un paillage autour du tronc pour garder l'humidité.");
T('tj',"Gérer les déchets du jardin","Séparez les feuilles et l'herbe pour le compost. Mettez les branches dures dans un coin pour le sèchage.","Ne brûlez pas les déchets trop près de la maison ou des arbres.");
T('tj',"Sécurité dans le jardin","Rangez les outils tranchants, portez des gants et des chaussures fermées, faites attention aux serpents et aux insectes.","Regardez toujours où vous mettez les mains avant de ramasser quelque chose.");

/* --- Garage (15) --- */
T('tg',"Ranger les outils du garage","Accrochez les gros outils au mur, rangez les petits dans des boîtes. Dessinez la forme de chaque outil à sa place.","Quand tout a sa place, on voit tout de suite ce qui manque.");
T('tg',"Balayer et nettoyer le garage","Dégagez le sol, balayez en commençant par le fond, ramassez les déchets, puis lavez si le sol le permet.","Faites-le avec les portes ouvertes pour que la poussière sorte.");
T('tg',"Enlever les taches d'huile au sol","Couvrez la tache avec du sable ou de la sciure, laissez absorber, balayez, puis lavez avec du savon et de l'eau chaude.","Agissez dès que la tache apparaît : plus elle sèche, plus elle est difficile à enlever.");
T('tg',"Installer des étagères","Fixez des étagères solides au mur. Mettez le plus lourd en bas, le plus léger en haut. Utilisez des boîtes numérotées.","Notez sur chaque boîte ce qu'elle contient : on gagne du temps.");
T('tg',"Nettoyer l'intérieur de la voiture","Videz la voiture, secouez les tapis, passez l'aspirateur ou le balai, nettoyez le tableau de bord et les sièges.","Gardez un petit sac poubelle dans la voiture pour éviter le désordre.");
T('tg',"Laver la voiture","Mouillez, savonnez avec une éponge douce en commençant par le toit, rincez à l'eau claire, séchez avec un chiffon doux.","Lavez à l'ombre : le soleil fait sécher le savon et laisse des traces.");
T('tg',"Surveiller les pneus","Regardez régulièrement la forme du pneu, l'usure et la pression. Un pneu en mauvais état est dangereux.","Faites contrôler les pneus avant un long voyage.");
T('tg',"Ranger les produits dangereux","Mettez peinture, essence et produits chimiques dans un endroit fermé, loin des enfants et de la chaleur, dans leurs bidons d'origine.","Ne mettez jamais de produit dangereux dans une bouteille d'eau.");
T('tg',"Mettre de la lumière dans le garage","Installez une lampe solide, vérifiez les fils, changez les ampoules grillées. Gardez une lampe de secours.","Un garage bien éclairé est plus sûr et on y travaille mieux.");
T('tg',"Éloigner les rats et les insectes","Gardez le garage propre, fermez les sacs de nourriture, bouchez les trous, enlevez les cartons inutiles.","Les rats aiment le désordre : le garage rangé les éloigne.");
T('tg',"Gérer les déchets du garage","Séparez métal, plastique, carton et déchets dangereux. Videz régulièrement et ne laissez rien s'accumuler.","Faites un tour de garage chaque semaine pour ne pas accumuler.");
T('tg',"Préparer une caisse à outils","Rassemblez un marteau, un tournevis, des pinces, un mètre, des clous et du ruban. Mettez-les dans une caisse fermée.","Rangez la caisse à un endroit connu de tous.");
T('tg',"Aérer le garage","Ouvrez les portes, laissez circuler l'air, surtout après un travail de peinture ou un moteur allumé.","Ne laissez jamais le moteur tourner dans un garage fermé : l'air devient dangereux.");
T('tg',"Éviter les risques d'incendie","Éloignez les produits inflammables des sources de chaleur, évitez les prises surchargées, gardez un extincteur ou un seau de sable.","Un garage rangé et propre brûle moins facilement.");
T('tg',"Faire un tri du garage","Faites trois tas : je garde, je donne, je jette. Rangez ce que vous gardez par famille.","Faites le tri une petite zone à la fois, en une heure.");

/* --- Logement indépendant pour les visiteurs (15) --- */
T('tk',"Préparer le logement avant l'arrivée des visiteurs","Aérez, balayez, lavez le sol, nettoyez la salle d'eau et la cuisine, faites le lit avec des draps propres et vérifiez l'eau et la lumière.","Faites le tour du logement avec une liste : rien n'est oublié.");
T('tk',"Faire un lit accueillant","Draps propres, couverture ou couette propre, oreillers moelleux. Un petit mot de bienvenue sur le lit fait plaisir.","Mettez une serviette pliée au pied du lit : le visiteur se sent attendu.");
T('tk',"Préparer les serviettes et les produits d'accueil","Mettez une serviette de bain et une serviette de main par personne, du savon, du papier toilette, une brosse à dents neuve si possible.","Rangez tout dans la salle de bain avant l'arrivée : le visiteur n'a rien à demander.");
T('tk',"Nettoyer la salle d'eau avant l'arrivée","Nettoyez douche, lavabo, WC et sol. Mettez du papier toilette et du savon. Vérifiez que l'eau coule bien.","Terminez en aérant et en séchant : pas d'odeur d'humidité pour l'arrivée.");
T('tk',"Aérer le logement","Ouvrez portes et fenêtres au moins une heure avant l'arrivée. Fermez les moustiquaires pour éviter les insectes.","Un logement bien aéré sent bon et paraît plus accueillant.");
T('tk',"Préparer la cuisine du logement","Nettoyez, vérifiez la vaisselle, les verres, le gaz ou la plaque, l'eau potable. Laissez un peu de café, de thé et de sucre.","Mettez une bouteille d'eau fraîche : un petit geste très apprécié.");
T('tk',"Un petit accueil chaleureux","Un mot de bienvenue, quelques fruits, de l'eau, un petit explicatif des clés et du wifi. L'accueil commence avant l'arrivée.","Un sourire à l'arrivée vaut mieux que mille explications.");
T('tk',"Remettre les clés et expliquer le logement","Donnez les clés en main propre. Montrez l'eau, l'électricité, les lumières et les règles. Laissez un numéro de téléphone.","Expliquez avec des mots simples : le visiteur se sent à l'aise.");
T('tk',"Éviter les mauvaises odeurs","Aérez, nettoyez les poubelles, vérifiez les siphons, lavez le linge et les rideaux, séchez bien la salle d'eau.","Un petit désodorisant naturel (citron, citronnelle) suffit.");
T('tk',"Nettoyer le logement après le départ des visiteurs","Retirez le linge, videz les poubelles, nettoyez la salle d'eau et la cuisine, balayez, lavez et vérifiez que rien n'est cassé.","Faites vite après le départ : le logement est prêt pour les prochains visiteurs.");
T('tk',"Installer des moustiquaires","Vérifiez qu'elles ne sont pas trouées. Réparez ou remplacez. Fermez-les le soir.","Une bonne nuit de sommeil, c'est le premier confort du visiteur.");
T('tk',"Vérifier l'eau et l'électricité","Ouvrez les robinets, vérifiez la chasse d'eau, allumez les lampes, testez les prises et le ventilateur.","Faites cela la veille de l'arrivée pour avoir le temps de réparer.");
T('tk',"Préparer une liste de contrôle","Écrivez : sol propre, lit fait, salle d'eau propre, eau et lumière, clés, accueil. Cochez chaque ligne.","Une liste de contrôle rend le travail sûr et rapide.");
T('tk',"Ranger les affaires de la maison avant l'arrivée","Retirez les objets personnels et de valeur. Laissez de la place dans les placards et sur les étagères.","Fermez à clé ce que vous ne voulez pas partager.");
T('tk',"Entretenir régulièrement un logement vide","Même vide, aérez chaque semaine, balayez, ouvrez l'eau quelques minutes, vérifiez le toit et les prises.","Un logement qu'on entretient reste prêt à tout moment.");

/* ---------- 2. Encourager les employées de maison (100) ---------- */
const ROLES = [
 { p:'m', pal:'orange', n:'fille de ménage', les:'les filles de ménage', le:'la fille de ménage', gest:"balayer, laver, ranger et désinfecter chaque pièce", duo:"la propreté et l'ordre de la maison" },
 { p:'n', pal:'rose', n:'nounou', les:'les nounous', le:'la nounou', gest:"jouer avec les enfants, les nourrir, les laver et les rassurer", duo:"le bien-être et la sécurité des enfants" },
 { p:'s', pal:'vert', n:'servante de maison', les:'les servantes de maison', le:'la servante de maison', gest:"tenir la maison du matin au soir : propreté, linge, courses et repas", duo:"le bon fonctionnement de la maison" },
 { p:'g', pal:'bleu', n:'gouvernante de domicile', les:'les gouvernantes de domicile', le:'la gouvernante de domicile', gest:"organiser la maison, guider le personnel et veiller à tout", duo:"l'harmonie de toute la maison" }
];
/* sujets : [titre, texte 1, texte 2] — {les} {le} {n} {gest} {duo} sont remplacés */
const SUJ = [
 ["Un travail bien fait fait grandir","Moi, SHAMAN CHOOZ, je le dis haut et fort pour {les} : chaque travail bien fait vous rend plus forte et plus fière.","{le} qui travaille avec soin gagne la confiance de toute la famille."],
 ["Soyez fière de votre métier","Le métier de {n} est un vrai métier. Il demande du courage, de la force et du coeur.","Quand on est fière de son métier, on le fait avec joie et on est respectée."],
 ["Soyez toujours à l'heure","Arriver à l'heure montre le respect pour la famille et pour votre travail.","{les} à l'heure donnent confiance et obtiennent de bonnes recommandations."],
 ["Soyez honnête","L'honnêteté est la première qualité d'une {n}. Ne touchez jamais à ce qui ne vous appartient pas.","Une personne honnête garde sa place et son nom pour toute la vie."],
 ["La propreté, c'est votre force","Soyez propre sur vous : habits propres, mains lavées, cheveux bien coiffés.","Une personne propre inspire confiance et fait un meilleur travail."],
 ["Faites votre travail avec le sourire","Un sourire change l'ambiance de la maison. Les enfants et les adultes le sentent.","Même quand c'est dur, un sourire aide à tenir et à bien travailler."],
 ["Apprenez chaque jour quelque chose","Posez des questions, regardez les bons gestes, essayez de faire mieux chaque jour.","Plus vous apprenez, plus vous pouvez demander une bonne place."],
 ["Écoutez bien les consignes","Écoutez, répétez ce que vous avez compris. Si vous n'avez pas compris, demandez.","Poser une question est un signe d'intelligence, pas de faiblesse."],
 ["Parlez poliment","Dites bonjour, merci, s'il vous plaît. Parlez calmement, même quand vous n'êtes pas d'accord.","Les mots polis ouvrent toutes les portes."],
 ["Prenez soin de la maison comme de la vôtre","Traitez les affaires de la maison avec soin : ne cassez pas, ne gaspillez pas.","Un respect des objets montre un respect des personnes."],
 ["Soyez attentive aux enfants","Regardez, écoutez, protégez les enfants. Ne les laissez jamais seuls en danger.","La sécurité des enfants passe avant tout, même avant le travail de la maison."],
 ["Gardez les secrets de la maison","Ce qui se passe dans la maison reste dans la maison. Ne racontez pas la vie privée de la famille.","La discrétion donne la confiance et la confiance donne la durée."],
 ["Prenez soin de votre santé","Mangez, dormez, lavez-vous les mains et allez voir le médecin quand vous êtes malade.","Pour bien travailler, il faut d'abord prendre soin de soi."],
 ["Ne soyez pas jalouse des autres","Chacune a sa place et son talent. Aidez les autres plutôt que de les comparer à vous.","Un bon esprit d'équipe rend toute la maison plus heureuse."],
 ["Dites la vérité, même si c'est difficile","Si vous avez cassé quelque chose, dites-le tout de suite. Une erreur avouée se pardonne.","Mentir fait perdre la confiance, dire la vérité la fait gagner."],
 ["Travaillez avec méthode","Faites une liste, travaillez par ordre, finissez une chose avant de commencer la suivante.","La méthode fait gagner du temps et donne un travail de qualité."],
 ["Gardez votre calme","Quand quelqu'un crie, ne criez pas. Respirez, restez calme et répondez poliment.","Rester calme est une force, pas une faiblesse."],
 ["Ayez confiance en vous","Vous savez faire beaucoup de choses. Reconnaissez vos qualités et montrez-les.","Quand on croit en soi, les autres y croient aussi."],
 ["Économisez avec sagesse","Mettez un peu de côté chaque mois, même une petite somme, pour vos projets et vos urgences.","Une personne qui épargne construit un avenir plus sûr."],
 ["Apprenez à lire, écrire et compter","Prenez quelques minutes par jour pour apprendre. Lire et compter ouvre beaucoup de portes.","Plus vous savez, plus vous pouvez choisir et progresser."],
 ["Aimez les enfants et la maison","Quand on aime ce que l'on fait, tout devient plus facile. Le coeur fait la différence.","Les enfants sentent l'amour : ils vous le rendent."],
 ["Ayez de la patience","La patience calme les enfants, les adultes et les mauvaises journées.","Un moment difficile passe : la patience reste."],
 ["Un bon départ pour la journée","Levez-vous à l'heure, lavez-vous, mangez, préparez-vous. Une bonne journée commence tôt.","Quand on commence bien, on travaille bien."],
 ["Un travail honnête honore votre famille","Votre travail aide vos parents, vos enfants et votre pays. Il est une source de fierté.","Aucun travail honnête n'est petit."],
 ["Rêvez grand et avancez pas à pas","Fixez-vous un but : apprendre, économiser, trouver une meilleure place. Avancez chaque jour.","Les grands changements commencent par de petites habitudes."]
];
SUJ.forEach((s, si) => ROLES.forEach(r => {
  const f = t => t.replace(/\{les\}/g, r.les).replace(/\{le\}/g, r.le.charAt(0).toUpperCase() + r.le.slice(1)).replace(/\{n\}/g, r.n).replace(/\{gest\}/g, r.gest).replace(/\{duo\}/g, r.duo).replace(/(^|[.!?] )([a-zà-ü])/g, (m,a,b)=>a+b.toUpperCase());
  const emo = ['🌟','💪','⏰','🤲','🧼','😊','📚','👂','🗣️','🏠','👶','🤐','❤️‍🩹','🤝','✅','📋','🧘','🦋','💰','✏️','💗','⏳','🌅','🏅','🚀'][si];
  SCCS.add('te' + r.p + '-' + (si + 1), s[0] + ' — pour ' + r.les, 'Encouragement', PAL[(si + ROLES.indexOf(r)) % PAL.length], [
    [emo, 'SHAMAN CHOOZ vous parle', f(s[1])],
    ['💬', "Pensez-y", f(s[2])],
    ['🤝', "Votre rôle", "Moi, SHAMAN CHOOZ, je sais que " + r.les + " ont un rôle essentiel : " + r.gest + ". Cela donne " + r.duo + "."],
    CLOSE[(si + ROLES.indexOf(r)) % CLOSE.length] ], { photo:true });
}));

/* ---------- 3. Respect entre employeurs et employés (50) ---------- */
const RESP_EMPLOYEUR = [
 ["Dites bonjour avec respect","Employeurs, saluez toujours votre employée avec un bonjour et un sourire. C'est le début d'un bon travail.","Un salut sincère est gratuit et vaut mieux qu'un cadeau."],
 ["Expliquez clairement le travail","Dites exactement ce que vous attendez : les tâches, les horaires, les règles de la maison.","Une consigne claire évite les erreurs et les disputes."],
 ["Payez à temps","Moi, SHAMAN CHOOZ, je rappelle : payez le salaire à la date convenue. Le salaire est un droit.","Quand on paie à temps, on est respecté et le travail est mieux fait."],
 ["Respectez les horaires de repos","Donnez les temps de pause, le repos du soir et le jour de repos convenu.","Une employée reposée travaille mieux et reste plus longtemps."],
 ["Ne criez jamais","Parlez calmement, même si vous êtes fâché. Les cris font peur et ne règlent rien.","Un reproche dit calmement se comprend, un cri se craint."],
 ["Ne faites jamais de violence","Aucune violence n'est permise : ni coups, ni insultes, ni menaces. Tout le monde a droit au respect.","La loi protège toute personne, même dans une maison."],
 ["Donnez à manger et à boire","Une employée a besoin de bien manger pour bien travailler. Partagez les repas ou prévoyez une nourriture suffisante.","Le respect, c'est aussi donner l'eau et la nourriture."],
 ["Prévoyez un lieu de repos correct","Si l'employée dort dans la maison, donnez-lui un lit propre, un endroit calme et la possibilité de se laver.","Une personne bien logée travaille avec joie."],
 ["Soignez-la si elle est malade","Laissez l'employée se soigner et aidez-la, si possible, à aller voir un médecin.","Une employée bien soignée revient vite et reste fidèle."],
 ["Dites merci","Remerciez après un travail bien fait. Un simple « merci » encourage plus qu'un reproche.","Un mot gentil donne envie de bien faire demain."],
 ["Corrigez avec gentillesse","Si le travail n'est pas bien fait, expliquez, montrez, laissez essayer à nouveau.","On apprend mieux dans la patience que dans la peur."],
 ["Respectez sa vie privée","Ne fouillez pas ses affaires et ne posez pas de questions inutiles sur sa vie privée.","Chacun a droit à son intimité."],
 ["Respectez sa famille","Laissez l'employée téléphoner à sa famille et rendre visite à ses proches dans les temps prévus.","Une personne en paix avec sa famille travaille mieux."],
 ["Ne mettez pas de travail en plus sans le dire","Si vous demandez un travail supplémentaire, parlez-en et payez-le s'il le faut.","Le respect des règles convenues donne une relation durable."],
 ["Faites confiance, sans accuser","Avant d'accuser, cherchez la vérité calmement. Une accusation injuste blesse très profondément.","Une confiance donnée est souvent rendue."],
 ["Ayez un contrat ou un accord clair","Écrivez ou dites clairement : salaire, horaires, jours de repos, tâches. Gardez une trace de l'accord.","Un accord clair protège l'employeur et l'employée."],
 ["Respectez la religion de l'employée","Laissez le temps de prier ou de pratiquer sa religion, selon ce qui est convenu.","Le respect de la foi est un respect de la personne."],
 ["Respectez son origine et sa culture","D'où que vienne l'employée, elle mérite le même respect. Ne vous moquez jamais de sa langue ou de ses habitudes.","Le respect ne dépend ni de la couleur, ni de la langue, ni de l'origine."],
 ["Aidez-la à progresser","Donnez-lui la possibilité d'apprendre : lire, écrire, un nouveau savoir-faire.","Une employée qui progresse devient une employée précieuse."],
 ["Écoutez ses problèmes","Prenez cinq minutes pour écouter ce qui ne va pas. Parfois, un petit problème se règle facilement.","Une oreille attentive évite beaucoup de ruptures."],
 ["Ne comparez pas les personnes","Chaque employée a sa manière de travailler. Ne la comparez pas aux autres devant tout le monde.","Un encouragement personnel vaut mieux qu'une comparaison."],
 ["Donnez des habits de travail et du matériel","Fournissez des gants, des produits adaptés et des outils en bon état pour que le travail soit sûr.","Un bon matériel protège la santé et améliore le travail."],
 ["Reconnaissez le bon travail","Une prime, un jour de congé en plus ou un petit cadeau montrent que vous voyez ses efforts.","Un travail reconnu est un travail renouvelé."],
 ["Parlez en toute politesse","Dites « s'il vous plaît » et « merci ». Évitez les mots durs et les insultes.","On obtient plus par la politesse que par la force."],
 ["Une bonne maison est une maison respectueuse","Une maison où chacun se respecte est une maison heureuse. L'employeur donne l'exemple.","Quand l'employeur respecte, l'employée respecte aussi."]
];
const RESP_EMPLOYE = [
 ["Respectez votre employeur","Employées, saluez poliment, parlez avec respect, même quand vous n'êtes pas d'accord.","Le respect revient toujours à celui qui le donne."],
 ["Arrivez à l'heure","Moi, SHAMAN CHOOZ, je dis : l'heure convenue est une promesse. Arrivez à l'heure et prévenez en cas de retard.","Un travail qui commence à l'heure donne confiance."],
 ["Faites le travail demandé avec soin","Faites ce qui est demandé, correctement, jusqu'au bout, même quand personne ne regarde.","Le bon travail parle de vous, plus fort que les mots."],
 ["Dites la vérité sur vos erreurs","Si vous avez cassé ou oublié quelque chose, dites-le avec honnêteté. L'erreur se répare, le mensonge reste.","La franchise protège votre place."],
 ["Gardez la discrétion sur la maison","Ne racontez pas ce que vous voyez et entendez dans la maison. La vie privée de la famille est précieuse.","Un secret bien gardé est une preuve de confiance."],
 ["Soyez honnête avec l'argent et les objets","Ne prenez rien sans permission, même petit. Si vous trouvez un objet, rendez-le.","L'honnêteté est votre meilleur diplôme."],
 ["Respectez la famille de l'employeur","Soyez poli avec tous : parents, enfants, visiteurs. Chacun mérite le respect.","Respecter tout le monde rend la vie plus facile."],
 ["Parlez calmement en cas de désaccord","Si quelque chose ne va pas, demandez à parler calmement, au bon moment. Évitez de crier ou de bouder.","Un problème bien expliqué se règle plus vite."],
 ["Demandez quand vous ne comprenez pas","Il n'y a pas de honte à demander. Mieux vaut poser une question que faire une erreur.","Poser des questions, c'est apprendre."],
 ["Respectez les règles de la maison","Chaque maison a ses règles : horaires, repas, visites, téléphone. Respectez-les.","Les règles claires évitent les disputes."],
 ["Prenez soin des affaires de la maison","Utilisez les appareils et les produits avec soin. Prévenez si quelque chose est abîmé.","Prendre soin des affaires, c'est prendre soin de sa place."],
 ["Utilisez le téléphone avec raison","Utilisez votre téléphone pendant les pauses, pas pendant que vous travaillez ou que vous surveillez les enfants.","Un travail sans distraction est un travail sûr."],
 ["Ne parlez pas mal de votre employeur","Si vous avez un problème, parlez-en directement. N'en parlez pas à tout le monde.","Les paroles reviennent toujours à ceux qui sont concernés."],
 ["Protégez les enfants en toute situation","Surveillez, écoutez, avertissez les parents si un enfant est malade ou en danger.","Pour un parent, rien n'est plus précieux que son enfant."],
 ["Ayez une bonne hygiène","Lavez-vous, portez des habits propres, lavez-vous les mains avant de préparer les repas.","L'hygiène protège la famille et vous-même."],
 ["Prévenez en cas d'absence","Si vous êtes malade ou si vous avez un problème, prévenez le plus tôt possible.","Prévenir est un signe de respect."],
 ["Parlez de vos besoins avec respect","Salaire, repos, santé : parlez-en calmement, au bon moment. On trouve plus facilement une solution.","Un besoin bien expliqué est souvent bien compris."],
 ["Soyez reconnaissante","Remerciez pour l'aide et les gestes gentils. La reconnaissance crée des liens durables.","Un « merci » sincère ne coûte rien."],
 ["Apprenez les habitudes de la maison","Chaque famille a ses goûts : repas, ordre, horaires. Apprenez-les pour mieux servir.","Connaître la famille, c'est mieux travailler."],
 ["Gardez vos promesses","Si vous dites que vous le ferez, faites-le. Chaque promesse tenue construit la confiance.","Une promesse tenue vaut plus que mille paroles."],
 ["Soyez loyale","Restez fidèle à votre employeur tant que vous travaillez pour lui. Si vous voulez partir, prévenez à l'avance.","Partir dans le respect garde les portes ouvertes."],
 ["Gardez la maison en sécurité","Fermez les portes et les fenêtres, ne laissez pas entrer des inconnus, surveillez le gaz et l'électricité.","La sécurité de la maison est aussi la vôtre."],
 ["Faites des progrès","Montrez que vous voulez progresser : apprendre une nouvelle recette, un nouveau geste.","Une employée qui avance gagne plus de confiance."],
 ["Avancez ensemble","Employeur et employée avancent ensemble : l'un donne du travail, l'autre donne du soin.","Quand chacun fait sa part, tout le monde gagne."],
 ["Respect des deux côtés","Moi, SHAMAN CHOOZ, je le répète : employeurs et employés doivent se respecter mutuellement.","Le respect mutuel est la base de tout bon travail."]
];
RESP_EMPLOYEUR.forEach((s, i) => SCCS.add('tp-e' + (i + 1), 'Respect : ' + s[0] + ' (pour les employeurs)', 'Respect au travail', PAL[i % PAL.length], [
  ['🤝', 'SHAMAN CHOOZ vous parle', s[1]],
  ['💬', "Pensez-y", s[2]],
  ['⚖️', "Le respect mutuel", "Moi, SHAMAN CHOOZ, je le dis : les employés et les employeurs doivent se respecter mutuellement. Le respect se donne et se reçoit."],
  CLOSE[i % CLOSE.length] ], { photo:true }));
RESP_EMPLOYE.forEach((s, i) => SCCS.add('tp-w' + (i + 1), 'Respect : ' + s[0] + ' (pour les employés)', 'Respect au travail', PAL[(i + 3) % PAL.length], [
  ['🤝', 'SHAMAN CHOOZ vous parle', s[1]],
  ['💬', "Pensez-y", s[2]],
  ['⚖️', "Le respect mutuel", "Moi, SHAMAN CHOOZ, je le dis : les employés et les employeurs doivent se respecter mutuellement. Le respect se donne et se reçoit."],
  CLOSE[(i + 2) % CLOSE.length] ], { photo:true }));
})();

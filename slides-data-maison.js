/* ==========================================================
   DIAPORAMAS « MAISON & QUOTIDIEN » (20) — travaux domestiques, hygiène, sécurité à la maison
   Chaque ligne : S(identifiant, titre, palette, [[emoji, titre, texte], …])
   Palettes : bleu, vert, orange, violet, rouge, or, rose, turquoise, nuit, terre
   Ces vidéos affichent ta photo (voir « photo » dans agence-config.js).
   Tu peux modifier les textes librement (garde les guillemets et les virgules).
   ========================================================== */
(function(){
if(!window.SCCS) return;
const S = (id, t, pal, sl)=> SCCS.add(id, t, 'Maison', pal, sl, { photo:true });

S('mq-lessive','Faire sa lessive correctement','bleu',[
 ['🧺',"Trier le linge","Sépare le blanc, les couleurs claires et les couleurs foncées. Les vêtements neufs de couleur vive déteignent souvent."],
 ['🏷️',"Lire l'étiquette","Elle indique la température maximale, le séchage et le repassage. Un tissu délicat n'aime pas l'eau très chaude."],
 ['🧼',"La bonne dose","Trop de lessive laisse des traces et irrite la peau. Suis la dose indiquée sur le paquet."],
 ['🫧',"Bien rincer","Un rinçage complet enlève les restes de savon. Pense aussi à vider les poches avant de laver !"],
 ['☀️',"Sécher au bon endroit","Étends dans un endroit aéré. Retourne les vêtements foncés à l'envers pour garder leurs couleurs."]
]);
S('mq-vaisselle','Laver la vaisselle dans le bon ordre','turquoise',[
 ['🍽️',"Préparer","Retire les restes de nourriture et fais tremper ce qui est collé."],
 ['🥛',"Commencer par le plus propre","On lave d'abord les verres et les tasses, puis les couverts."],
 ['🍲',"Finir par le plus gras","Assiettes, puis casseroles et plats gras. Change l'eau quand elle devient très sale."],
 ['🚿',"Rincer à l'eau propre","Le savon qui reste donne mauvais goût aux aliments."],
 ['🧽',"Égoutter et sécher","Laisse sécher à l'air ou essuie avec un torchon propre. Lave aussi l'éponge souvent."]
]);
S('mq-cuisine-hygiene','Cuisiner proprement et sans risque','orange',[
 ['🙌',"D'abord, les mains","Lave-toi les mains au savon avant de cuisiner, et après avoir touché de la viande crue."],
 ['🔪',"Séparer le cru du cuit","Utilise une planche et un couteau différents pour la viande crue. Cela évite de transmettre des microbes."],
 ['🍗',"Cuire à cœur","Le poulet et la viande hachée doivent être bien cuits à l'intérieur."],
 ['🥬',"Laver fruits et légumes","Rince-les à l'eau propre, surtout ceux qu'on mange crus."],
 ['🧽',"Nettoyer au fur et à mesure","Plan de travail, torchons et éponges propres : une cuisine propre protège toute la famille."]
]);
S('mq-conservation','Bien conserver les aliments','vert',[
 ['❄️',"Le froid ralentit les microbes","Un réfrigérateur autour de 4 °C garde mieux les aliments. Évite de l'ouvrir trop souvent."],
 ['🍲',"Les restes, vite au frais","Ne laisse pas un plat cuit traîner plus de 2 heures, et encore moins s'il fait très chaud."],
 ['🫙',"Couvrir et fermer","Des récipients fermés, c'est moins de mouches, d'odeurs et de microbes."],
 ['📅',"Premier entré, premier sorti","Place les produits les plus anciens devant : tu les consommes avant qu'ils se gâtent."],
 ['🗑️',"En cas de doute, on jette","Mauvaise odeur, moisissure, boîte de conserve gonflée : n'y goûte pas."]
]);
S('mq-menage','Faire le ménage dans le bon ordre','violet',[
 ['🪟',"1. Aérer","Ouvre les fenêtres : l'air frais chasse la poussière et les odeurs."],
 ['🧹',"2. Du haut vers le bas","Commence par les toiles d'araignée et les meubles hauts : la poussière tombe vers le sol."],
 ['🧽',"3. Les surfaces","Nettoie les tables, les plans de travail et les poignées avec un chiffon propre."],
 ['🪣',"4. Le sol en dernier","Balaie ou aspire, puis lave. Ainsi, tu ne salis pas deux fois."],
 ['✅',"5. Ranger le matériel","Rince les chiffons, vide le seau et fais sécher : ton matériel reste propre."]
]);
S('mq-sdb','Une salle de bain propre, sans moisissure','turquoise',[
 ['🚿',"Aérer chaque jour","L'humidité fait naître la moisissure. Ouvre la fenêtre après la douche."],
 ['🧴',"Laisser agir le produit","Applique le produit, attends quelques minutes, puis frotte : tu fournis moins d'effort."],
 ['🪥',"Les endroits oubliés","Joints, robinets, bonde et poignées : c'est là que les microbes s'installent."],
 ['⚠️',"Ne mélange jamais les produits","L'eau de Javel mélangée à d'autres produits peut dégager des gaz toxiques. Un produit à la fois."],
 ['🧻',"Sécher pour finir","Une surface sèche reste propre plus longtemps et évite les traces."]
]);
S('mq-produits','Produits ménagers : la sécurité avant tout','rouge',[
 ['🧪',"Lis l'étiquette","Les pictogrammes expliquent le danger. Respecte la dose et le mode d'emploi."],
 ['🚫',"Ne mélange pas","L'eau de Javel mélangée à un autre produit peut libérer un gaz dangereux."],
 ['🧒',"Hors de portée des enfants","Range-les en hauteur ou sous clé, jamais à côté de la nourriture."],
 ['🍾',"Garde l'emballage d'origine","Ne verse jamais un produit toxique dans une bouteille d'eau ou de jus."],
 ['🧤',"Gants et aération","Protège tes mains, aère la pièce et rince-toi les yeux à l'eau claire en cas d'éclaboussure."]
]);
S('mq-moustiques','Se protéger des moustiques','vert',[
 ['💧',"Vider l'eau stagnante","Seaux, pneus, vases, boîtes : le moustique pond dans l'eau immobile. Vide-les chaque semaine."],
 ['🛏️',"Dormir sous moustiquaire","Une moustiquaire imprégnée protège pendant la nuit, surtout les enfants et les femmes enceintes."],
 ['🪟',"Fermer l'accès","Grillages aux fenêtres, portes fermées au coucher du soleil."],
 ['🌿',"Nettoyer autour de la maison","Herbes hautes et déchets gardent l'eau de pluie et abritent les moustiques."],
 ['🩺',"Fièvre : consulter vite","Fièvre, frissons, fatigue : va au centre de santé pour un test. Ne te soigne pas au hasard."]
]);
S('mq-eau','Rendre l\'eau plus sûre à boire','bleu',[
 ['🪣',"D'abord, filtrer","Passe l'eau trouble dans un tissu propre : cela retire les saletés visibles."],
 ['🔥',"Faire bouillir","Un bouillon d'au moins une minute tue la plupart des microbes."],
 ['🧴',"Ou la traiter","Des produits de traitement de l'eau existent : respecte la dose et le temps d'attente."],
 ['🫙',"Stocker proprement","Récipient propre et couvert, avec un robinet ou une louche propre. Pas de mains dans l'eau !"],
 ['🧼',"Et toujours les mains propres","Se laver les mains au savon avant de manger protège contre bien des maladies."]
]);
S('mq-electricite','Économiser l\'électricité à la maison','or',[
 ['💡',"Éclairage LED","Une ampoule LED consomme beaucoup moins qu'une ampoule classique et dure plus longtemps."],
 ['🔌',"Débrancher","Chargeurs et appareils en veille consomment un peu en continu. Débranche ce que tu n'utilises pas."],
 ['🧊',"Le réfrigérateur","Ouvre-le le moins possible, ne mets pas de plat chaud dedans et dégivre-le régulièrement."],
 ['👕',"Repasser en une fois","Regroupe le repassage : le fer ne chauffe qu'une seule fois."],
 ['🌞',"Profite du jour","Ouvre les rideaux et sèche le linge au soleil : lumière et chaleur gratuites."]
]);
S('mq-repassage','Repasser sans abîmer le linge','rose',[
 ['🏷️',"Lis le symbole du fer","Un, deux ou trois points : ils indiquent la température maximale du tissu."],
 ['💧',"Linge légèrement humide","Les plis partent plus vite quand le tissu est un peu humide."],
 ['🧵',"Tissus fragiles d'abord","Commence par les tissus qui craignent la chaleur, puis monte en température."],
 ['👔',"Dans le bon ordre","Col, manches, puis le reste de la chemise. Retourne les tissus foncés pour les repasser."],
 ['🧯',"Sécurité","Ne laisse jamais un fer branché sans surveillance, surtout avec des enfants."]
]);
S('mq-rangement','Ranger sa maison sans stress','violet',[
 ['🗂️',"Une place pour chaque chose","Ce qui a sa place se range vite et se retrouve facilement."],
 ['📦',"Trier : garder, donner, jeter","Ce que tu n'utilises plus peut aider quelqu'un d'autre."],
 ['⏱️',"10 minutes par jour","Un petit effort régulier vaut mieux qu'un grand ménage épuisant."],
 ['🧺',"Paniers et boîtes","Étiquette-les : tu sais tout de suite ce qu'il y a dedans."],
 ['👨‍👩‍👧',"Tout le monde participe","Chacun range ses affaires : la maison reste agréable pour tous."]
]);
S('mq-nuisibles','Éloigner cafards et rongeurs','terre',[
 ['🍞',"Fermer la nourriture","Pain, sucre, riz : garde-les dans des boîtes bien fermées."],
 ['🗑️',"Poubelle couverte","Sors-la chaque jour : les déchets attirent cafards, rats et mouches."],
 ['🍽️',"Pas de vaisselle sale la nuit","Les restes de nourriture sont un festin pour les nuisibles."],
 ['🧱',"Boucher les fissures","Trous dans les murs, dessous de portes : bouche-les pour fermer le passage."],
 ['🧹',"Propreté régulière","Nettoie derrière et sous les meubles, et évite les tas de cartons ou de linge."]
]);
S('mq-enfants','La sécurité des petits à la maison','orange',[
 ['🧪',"Produits et médicaments en hauteur","Un enfant goûte tout ce qu'il trouve. Range hors de portée, sous clé si possible."],
 ['🔌',"Prises et fils","Cache les prises et ne laisse pas traîner de câbles à portée de main."],
 ['🔥',"Cuisine et chaleur","Manches des casseroles tournés vers le mur, enfants loin du feu et du fer à repasser."],
 ['💧',"L'eau, danger silencieux","Ne laisse jamais un petit enfant seul près d'un seau, d'une bassine ou d'une rivière."],
 ['👀',"Surveiller et expliquer","Garde un œil sur eux et explique calmement ce qui est dangereux."]
]);
S('mq-trousse','Une petite trousse de premiers secours','rouge',[
 ['🩹',"Pansements et compresses","Pour protéger les petites plaies après les avoir nettoyées."],
 ['🧴',"Savon et désinfectant","Nettoie d'abord la plaie à l'eau propre et au savon."],
 ['🌡️',"Thermomètre","Il permet de vérifier une fièvre et de décider d'aller consulter."],
 ['✂️',"Ciseaux et gants","Des ciseaux propres et des gants à usage unique pour soigner proprement."],
 ['📞',"Numéros utiles","Note près de la trousse le numéro du centre de santé et des urgences de ta zone."]
]);
S('mq-brulure','Brûlure légère : les bons réflexes','rouge',[
 ['🚿',"Refroidir tout de suite","Passe la brûlure sous l'eau fraîche du robinet pendant au moins 10 minutes."],
 ['💍',"Retirer ce qui serre","Bagues, bracelets : enlève-les avant que la zone ne gonfle."],
 ['🚫',"Pas de beurre ni de dentifrice","Ces remèdes de grand-mère retiennent la chaleur et favorisent l'infection."],
 ['🫧',"Ne perce pas les cloques","La peau protège la plaie. Couvre avec un pansement propre."],
 ['🏥',"Quand consulter ?","Si la brûlure est grande, sur le visage ou les mains, ou touche un enfant, va au centre de santé."]
]);
S('mq-riz','Réussir la cuisson du riz','or',[
 ['🍚',"Bien rincer","Rince le riz à l'eau claire pour enlever l'excès d'amidon : les grains seront bien séparés."],
 ['⚖️',"La bonne quantité d'eau","Pour du riz blanc long grain, compte en général environ deux fois son volume d'eau, selon le paquet."],
 ['🔥',"Feu doux et couvercle","Quand l'eau frémit, baisse le feu et couvre."],
 ['🚫',"Ne soulève pas le couvercle","La vapeur fait la cuisson : l'ouvrir trop tôt la ralentit."],
 ['⏳',"Laisser reposer","Éteins le feu et attends 5 à 10 minutes avant de remuer à la fourchette."]
]);
S('mq-gaz','Utiliser la bouteille de gaz en sécurité','orange',[
 ['🔥',"Toujours debout","Place la bouteille bien droite, sur un sol stable, dans un endroit aéré."],
 ['🔧',"Vérifier le tuyau et le joint","Un tuyau craquelé ou un joint usé doit être remplacé."],
 ['🫧',"Chercher une fuite à l'eau savonneuse","Si des bulles apparaissent, il y a une fuite. Jamais avec une flamme !"],
 ['🚪',"En cas d'odeur de gaz","Ferme le robinet, ouvre les fenêtres, n'allume aucune flamme ni interrupteur et éloigne-toi."],
 ['🌙',"Fermer après usage","Ferme le robinet de la bouteille après la cuisson et avant de dormir."]
]);
S('mq-courses','Faire ses courses malin','vert',[
 ['📝',"Une liste avant de partir","Note ce qu'il te faut : tu évites les achats inutiles."],
 ['🍽️',"Pas le ventre vide","On achète plus quand on a faim. Mange un peu avant de partir."],
 ['⚖️',"Comparer au poids","Regarde le prix au kilo ou au litre, pas seulement le prix de l'emballage."],
 ['🍅',"Produits de saison","Les fruits et légumes de saison sont plus frais, plus savoureux et souvent moins chers."],
 ['🧾',"Garder le reçu","Il prouve l'achat et permet de suivre tes dépenses."]
]);
S('mq-potager','Un petit potager à la maison','vert',[
 ['☀️',"Un endroit ensoleillé","La plupart des légumes ont besoin de plusieurs heures de soleil par jour."],
 ['🌱',"Des plantes faciles pour commencer","Gombo, piment, aubergine, menthe… et des plantes que ta famille aime manger."],
 ['💧',"Arroser matin ou soir","Moins d'eau s'évapore. Arrose au pied de la plante."],
 ['🍂',"Le compost","Épluchures de légumes et feuilles mortes se transforment en engrais naturel."],
 ['🐝',"Respecter les petits alliés","Abeilles et coccinelles aident ton jardin. Évite les produits qui les tuent."]
]);
})();

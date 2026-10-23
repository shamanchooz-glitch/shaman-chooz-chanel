/* LOT 1 — 8 nouveaux diaporamas. Même format que slides-data-maison.js : S(id, titre, palette, [[emoji, titre, texte], …]) */
(function(){
if(!window.SCCS) return;
const M = (id,t,p,s)=> SCCS.add(id,t,'Maison',p,s,{photo:true});
const V = (id,t,p,s)=> SCCS.add(id,t,'Ville & commerce',p,s,{photo:true});

M('l1-gaz','Bonbonne de gaz : les bons réflexes','orange',[
 ['🔥',"Installer au bon endroit","Place la bonbonne debout, dans un endroit aéré, loin de toute flamme et de la chaleur."],
 ['🔧',"Vérifier le tuyau","Contrôle le tuyau et les joints. Un tuyau craquelé ou périmé doit être changé."],
 ['🫧',"Chercher une fuite à l'eau savonneuse","Passe de l'eau savonneuse sur les raccords : des bulles signalent une fuite. Jamais avec une flamme !"],
 ['🚪',"En cas d'odeur de gaz","Ferme le gaz, ouvre portes et fenêtres, n'allume ni lumière ni flamme, et sors."],
 ['🌙',"Fermer après usage","Ferme toujours le robinet de la bonbonne après avoir cuisiné, surtout pour la nuit."]
]);
M('l1-economies','Économiser l\'eau et l\'électricité','turquoise',[
 ['💡',"Éteindre en sortant","Une pièce vide n'a pas besoin de lumière. Éteins aussi ventilateur et télévision."],
 ['🚿',"Un robinet qui goutte coûte cher","Répare les fuites : de petites gouttes perdent beaucoup d'eau à la fin du mois."],
 ['🧊',"Soigner le réfrigérateur","Ouvre-le le moins possible et ne mets pas de plats chauds dedans."],
 ['🔌',"Débrancher les chargeurs","Un chargeur branché consomme encore un peu. Débranche-le quand le téléphone est chargé."],
 ['💰',"Noter ses factures","Compare tes factures chaque mois pour repérer une hausse et en trouver la cause."]
]);
M('l1-rangement','Ranger sa maison en 5 étapes','vert',[
 ['📦',"Tout sortir d'un seul endroit","Commence par un seul tiroir ou une seule étagère, pas par toute la maison."],
 ['🗂️',"Trier en trois tas","Garder, donner, jeter. Ce que tu n'as pas utilisé depuis un an peut souvent partir."],
 ['🧼',"Nettoyer l'espace vide","Profites-en pour dépoussiérer avant de remettre les affaires."],
 ['🏷️',"Donner une place à chaque chose","Ce qui a sa place se retrouve vite et se range tout seul."],
 ['⏰',"Dix minutes par jour","Un petit rangement quotidien évite le grand désordre du week-end."]
]);
V('l1-caisse','Tenir sa caisse sans erreur','or',[
 ['💵',"Compter le fond de caisse","Chaque matin, compte l'argent de départ et note la somme."],
 ['🧮',"Rendre la monnaie en comptant","Pars du prix et monte jusqu'à la somme donnée : 700 pour un achat de 650 se rend en 50, tout simplement."],
 ['🧾',"Noter chaque vente","Un cahier ou une application te montre ce qui se vend le mieux."],
 ['🔍',"Se méfier des faux billets","Regarde et touche le billet, et compare-le avec un vrai."],
 ['🌙',"Faire le bilan du soir","Compare l'argent en caisse avec les ventes notées. Une différence se corrige tout de suite."]
]);
V('l1-accueil','Bien accueillir un client','rose',[
 ['😊',"Le sourire d'abord","Salue le client dans les premières secondes, même si tu es occupé."],
 ['👂',"Écouter avant de proposer","Laisse le client dire ce qu'il cherche, puis conseille-le."],
 ['🗣️',"Parler simplement","Utilise des mots clairs et donne les prix sans détour."],
 ['🙏',"Gérer un client mécontent","Écoute sans te défendre, excuse-toi si besoin, puis propose une solution."],
 ['🤝',"Dire merci et inviter à revenir","Un client bien reçu revient et parle de toi autour de lui."]
]);
V('l1-prix','Fixer le bon prix de vente','violet',[
 ['🧾',"Compter tous les coûts","Achat du produit, transport, emballage, loyer du stand : tout compte."],
 ['➕',"Ajouter ta marge","La marge est ce qui reste pour toi. Sans marge, tu travailles pour rien."],
 ['👀',"Regarder les autres vendeurs","Compare avec les prix autour de toi pour rester dans la bonne zone."],
 ['⭐',"Valoriser la qualité","Un meilleur service ou un meilleur produit permet de vendre un peu plus cher."],
 ['📈',"Revoir ses prix","Quand tes coûts montent, ajuste tes prix. Fais-le en expliquant au client."]
]);
SCCS.add('ag-l1-nounou','Recruter une nounou de confiance','Agence','rose',[
 ['👶',"Définir ton besoin","Âge des enfants, horaires, tâches : plus c'est clair, plus le choix est facile."],
 ['📋',"Vérifier le parcours","Expérience, références et pièces d'identité doivent être contrôlées."],
 ['💬',"Un entretien en face à face","Observe la patience, le sens des responsabilités et la manière de parler aux enfants."],
 ['🗓️',"Une période d'essai","Un essai de quelques jours permet de voir si le courant passe avec la famille."],
 ['🤝',"Confie-toi à une agence","Nous présélectionnons des profils sérieux et nous t'accompagnons dans le placement."]
],{ photo:true });
SCCS.add('l1-corps','Le saviez-vous ? Le corps humain','Divertissement','nuit',[
 ['🦴',"206 os","Un adulte a 206 os, alors qu'un bébé en a beaucoup plus à la naissance, car certains se soudent en grandissant."],
 ['❤️',"Un cœur infatigable","Il bat environ 100 000 fois par jour et envoie le sang dans tout le corps."],
 ['💧',"Beaucoup d'eau","Plus de la moitié du poids d'un adulte est de l'eau. D'où l'importance de bien boire."],
 ['🖐️',"Des empreintes uniques","Les empreintes digitales sont propres à chaque personne, même chez les vrais jumeaux."],
 ['🧠',"Le cerveau ne s'arrête jamais","Il travaille même pendant le sommeil pour trier et ranger les souvenirs."]
],{ photo:true });
})();

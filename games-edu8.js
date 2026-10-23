/* LOT 8 — 8 nouveaux jeux éducatifs (même mécanique que games-edu7.js : EDU.quiz = QCM, EDU.tf = vrai/faux) */
(function(){
'use strict';
if(!window.EDU) return;
const G = EDU.G, V = 'Argent & vie pratique', S = 'Santé & nature';

G('e8gaz','Bonbonne de gaz : sécurité','🔥',V,20,'Vrai ou faux ? Les bons gestes pour utiliser le gaz sans danger.', EDU.tf([
 ["Une bonbonne de gaz doit rester debout.",true,"Couchée, elle peut laisser sortir du gaz liquide."],
 ["On cherche une fuite de gaz avec une flamme.",false,"Jamais : on utilise de l'eau savonneuse et on regarde s'il y a des bulles."],
 ["Il faut fermer le robinet après la cuisine.",true,"Cela évite toute fuite pendant la nuit."],
 ["En cas d'odeur de gaz, on allume la lumière pour mieux voir.",false,"Une étincelle peut tout enflammer : ouvre les fenêtres et sors."],
 ["On peut ranger la bonbonne près du feu.",false,"La chaleur augmente la pression et le danger."]
]));
G('e8monnaie','Caisse et monnaie','💵',V,50,'Rends la monnaie sans te tromper.', EDU.quiz([
 ["Un client paie 650 FCFA avec 1 000 FCFA. Combien rends-tu ?","350 FCFA","450 FCFA","250 FCFA","400 FCFA","~1 000 − 650 = 350."],
 ["Un article coûte 1 200 FCFA. Le client donne 2 000 FCFA. Monnaie ?","800 FCFA","700 FCFA","900 FCFA","600 FCFA"],
 ["Tu vends 3 sachets à 250 FCFA. Total ?","750 FCFA","650 FCFA","700 FCFA","850 FCFA","~3 × 250 = 750."],
 ["Que faire d'abord en début de journée ?","Compter le fond de caisse","Fermer la caisse","Rendre la monnaie","Changer les prix"]
]));
G('e8energie','Économies d\'eau et d\'électricité','💡',V,60,'Vrai ou faux ? Réduis tes factures au quotidien.', EDU.tf([
 ["Un robinet qui goutte peut faire perdre beaucoup d'eau.",true,"Sur un mois, les petites gouttes s'additionnent."],
 ["Mettre un plat chaud dans le réfrigérateur est une bonne idée.",false,"Il force l'appareil à travailler plus et consomme davantage."],
 ["Éteindre la lumière en quittant une pièce fait économiser.",true,"Une lampe allumée dans une pièce vide est de l'argent perdu."],
 ["Ouvrir souvent le réfrigérateur n'a aucun effet.",false,"Le froid s'échappe et l'appareil consomme plus pour refroidir."]
]));
G('e8secours','Premiers secours','🩹',S,0,'Les bons réflexes en cas de petit accident.', EDU.quiz([
 ["Que faire sur une petite brûlure ?","La passer sous l'eau fraîche plusieurs minutes","Mettre du beurre","Percer les cloques","La couvrir de dentifrice","~L'eau fraîche calme la douleur et limite les dégâts."],
 ["Une plaie saigne. Que faire en premier ?","Appuyer dessus avec un linge propre","Laisser saigner","Frotter fort","Mettre de la terre"],
 ["Quelqu'un fait un malaise. Que faire ?","L'allonger et appeler les secours","Le secouer","Lui donner à manger","Le laisser debout"],
 ["Quand appeler les secours ?","Quand la personne est en danger grave","Jamais","Seulement le soir","Après une semaine"]
]));
G('e8mains','Hygiène des mains','🧼',S,120,'Vrai ou faux ? Un geste simple qui protège toute la famille.', EDU.tf([
 ["Se laver les mains avant de manger protège des microbes.",true,"Les mains touchent beaucoup d'objets avant le repas."],
 ["Un rinçage rapide à l'eau suffit toujours.",false,"Le savon est nécessaire pour bien nettoyer."],
 ["On se lave les mains après être allé aux toilettes.",true,"C'est un des moments les plus importants."],
 ["Il faut se frotter les mains au moins vingt secondes avec du savon.",true,"Entre les doigts et sous les ongles aussi."]
]));
G('e8cv','CV et entretien','📄',V,200,'Prépare-toi à décrocher un emploi.', EDU.quiz([
 ["Combien de pages pour un CV simple ?","Une page","Dix pages","Aucune","Cinq pages","~Un CV clair et court se lit plus vite."],
 ["Que faut-il faire avant un entretien ?","Se renseigner sur l'entreprise","Rien","Arriver en retard","Éteindre son téléphone après"],
 ["Que faire si tu ne connais pas la réponse ?","Rester calme et expliquer comment tu chercherais","Inventer n'importe quoi","Te taire","Partir"],
 ["Quelle attitude donne confiance ?","Être poli, ponctuel et sincère","Couper la parole","Mentir sur son expérience","Regarder son téléphone"]
]));
G('e8corps','Le corps humain','🫀',S,300,'Vrai ou faux ? Découvre les secrets de ton corps.', EDU.tf([
 ["Un adulte a 206 os.",true,"Ils se soudent en partie pendant la croissance."],
 ["Le cœur bat seulement quelques fois par jour.",false,"Il bat environ 100 000 fois par jour."],
 ["Plus de la moitié du poids d'un adulte est de l'eau.",true,"Il faut donc penser à bien boire."],
 ["Les empreintes digitales sont les mêmes chez tout le monde.",false,"Elles sont uniques à chaque personne."]
]));
G('e8client','Accueillir un client','🛍️',V,330,'Les bons réflexes pour fidéliser tes clients.', EDU.quiz([
 ["Quelle est la première chose à faire quand un client arrive ?","Le saluer avec le sourire","L'ignorer","Finir son téléphone","Lui demander de patienter sans rien dire"],
 ["Un client est mécontent. Que faire ?","L'écouter puis proposer une solution","Lui répondre sur le même ton","Partir","Lui donner tort tout de suite"],
 ["Pourquoi annoncer les prix clairement ?","Cela crée la confiance","Cela fait fuir","C'est inutile","C'est interdit"]
]));
})();

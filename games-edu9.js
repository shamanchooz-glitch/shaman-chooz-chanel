/* LOT 9 — 9 nouveaux jeux éducatifs (même mécanique que games-edu8.js : EDU.quiz = QCM, EDU.tf = vrai/faux) */
(function(){
'use strict';
if(!window.EDU) return;
const G = EDU.G, V = 'Argent & vie pratique', S = 'Santé & nature';

G('e9incendie','Prévenir l\'incendie','🧯',S,5,'Vrai ou faux ? Les bons réflexes pour éviter le feu à la maison.', EDU.tf([
 ["On peut laisser une bougie allumée en sortant.",false,"Une bougie seule peut tout enflammer : éteins-la avant de partir."],
 ["Brancher beaucoup d'appareils sur une seule multiprise est sans risque.",false,"Les fils chauffent quand on les surcharge."],
 ["Les allumettes doivent être rangées hors de portée des enfants.",true,"Un enfant ne mesure pas le danger du feu."],
 ["Il faut connaître deux sorties dans sa maison.",true,"Si l'une est bloquée, l'autre permet de s'échapper."],
 ["En cas d'incendie, on retourne chercher ses affaires.",false,"Sors d'abord et donne l'alerte : une vie vaut plus que des objets."]
]));
G('e9sommeil','Bien dormir','😴',S,230,'Vrai ou faux ? Les habitudes qui aident à mieux dormir.', EDU.tf([
 ["Se coucher à des heures régulières aide à mieux dormir.",true,"Le corps s'habitue à un rythme stable."],
 ["Regarder son téléphone au lit aide à s'endormir plus vite.",false,"La lumière des écrans peut retarder l'endormissement."],
 ["Un repas très lourd juste avant de dormir est idéal.",false,"Il peut gêner la digestion et le sommeil."],
 ["Une chambre aérée et calme favorise le sommeil.",true,"Moins de bruit et de lumière, plus de confort."]
]));
G('e9stock','Gérer son stock','📦',V,90,'Évite les pertes et les ruptures dans ton commerce.', EDU.quiz([
 ["Que veut dire « premier entré, premier sorti » ?","Vendre d'abord les produits les plus anciens","Vendre d'abord les plus récents","Ne jamais vendre","Tout jeter"],
 ["Pourquoi faire un inventaire régulier ?","Savoir exactement ce qu'il reste","Perdre du temps","Cacher ses ventes","Changer les prix"],
 ["Un produit ne se vend pas depuis des mois. Que faire ?","Baisser son prix ou arrêter de le commander","En acheter encore plus","L'oublier","Le cacher"],
 ["Où ranger des sacs de farine ?","Au sec, loin des rongeurs","Dehors sous la pluie","Dans l'eau","Au soleil direct"]
]));
G('e9enligne','Vendre en ligne','📱',V,265,'Vrai ou faux ? Les bons réflexes pour vendre sur Internet.', EDU.tf([
 ["Une photo nette et bien éclairée donne confiance.",true,"Le client ne peut pas toucher le produit : il compte sur l'image."],
 ["Il faut répondre rapidement aux messages des clients.",true,"Un client qui attend va souvent voir ailleurs."],
 ["On peut donner son code secret de paiement si le client insiste.",false,"Ne le donne jamais, à personne."],
 ["On peut livrer avant d'avoir vérifié le paiement.",false,"Vérifie d'abord que l'argent est bien arrivé."]
]));
G('e9alimentation','Bien manger','🥗',S,140,'Les bases d\u2019une alimentation saine.', EDU.quiz([
 ["Que donnent surtout les fruits et les légumes ?","Des vitamines et des fibres","Rien du tout","Uniquement du sucre","Du poison"],
 ["Quel est le meilleur choix pour étancher la soif ?","L'eau propre","Les boissons très sucrées","Le sirop pur","L'alcool"],
 ["Pourquoi manger varié ?","Pour recevoir tous les nutriments nécessaires","Pour dépenser plus","Pour manger moins","Ça ne change rien"],
 ["Que faire avec le sucre et le sel ?","En consommer avec modération","En manger beaucoup","Les mélanger","Les boire"]
]));
G('e9animaux','Animaux étonnants','🐘',S,30,'Vrai ou faux ? Découvre des faits surprenants sur les animaux.', EDU.tf([
 ["Le guépard est le plus rapide des animaux terrestres.",true,"Mais il ne maintient sa vitesse que sur de courtes distances."],
 ["La girafe a beaucoup plus de vertèbres du cou que l'humain.",false,"Elle en a sept, comme nous, mais elles sont très longues."],
 ["La pieuvre a trois cœurs.",true,"Deux pour les branchies, un pour le reste du corps."],
 ["Les bosses du chameau sont remplies d'eau.",false,"Elles stockent surtout de la graisse."],
 ["L'éléphant est le plus grand animal terrestre.",true,"Il vit en groupes familiaux très soudés."]
]));
G('e9securite','Sécurité au travail','🦺',V,350,'Vrai ou faux ? Les réflexes qui évitent les accidents.', EDU.tf([
 ["Porter les protections adaptées (gants, chaussures) réduit les risques.",true,"Elles protègent des coupures, chutes d'objets et produits."],
 ["Courir sur un sol mouillé est sans danger.",false,"Le risque de chute est très élevé."],
 ["Il faut signaler un danger à son responsable.",true,"Un danger signalé peut être corrigé avant l'accident."],
 ["Mélanger des produits ménagers est une bonne idée.",false,"Certains mélanges dégagent des gaz dangereux."]
]));
G('e9mesures','Mesures et conversions','📏',V,180,'Les conversions du quotidien.', EDU.quiz([
 ["Combien de mètres dans 1 kilomètre ?","1 000","100","10","10 000"],
 ["Combien de grammes dans 1 kilogramme ?","1 000","100","10","500"],
 ["Combien de minutes dans 1 heure ?","60","100","30","24"],
 ["Combien de centimètres dans 1 mètre ?","100","10","1 000","60"],
 ["Combien de millilitres dans 1 litre ?","1 000","100","10","500"]
]));
G('e9fractions','Les fractions du quotidien','🍰',V,40,'Moitié, quart, trois quarts : calcule vite.', EDU.quiz([
 ["La moitié de 50 ?","25","20","30","15"],
 ["Le quart de 80 ?","20","40","16","25"],
 ["Les trois quarts de 100 ?","75","50","25","34"],
 ["Le tiers de 90 ?","30","45","20","60"],
 ["La moitié de 1 200 FCFA ?","600 FCFA","300 FCFA","400 FCFA","1 000 FCFA"]
]));
})();

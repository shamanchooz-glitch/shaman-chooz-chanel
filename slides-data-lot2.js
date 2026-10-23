/* LOT 2 — 9 nouveaux diaporamas (même format que slides-data-lot1.js) */
(function(){
if(!window.SCCS) return;
const M = (id,t,p,s)=> SCCS.add(id,t,'Maison',p,s,{photo:true});
const V = (id,t,p,s)=> SCCS.add(id,t,'Ville & commerce',p,s,{photo:true});
const A = (id,t,p,s)=> SCCS.add(id,t,'Agence',p,s,{photo:true});

M('l2-incendie','Éviter l\'incendie à la maison','rouge',[
 ['🕯️',"Ne jamais laisser une flamme seule","Bougie, lampe à pétrole, cuisine : éteins avant de sortir ou de dormir."],
 ['🔌',"Attention aux prises surchargées","Trop d'appareils sur une multiprise font chauffer les fils. Débranche ce qui ne sert pas."],
 ['👶',"Allumettes et briquets hors de portée","Range-les en hauteur, loin des enfants."],
 ['🧯',"Savoir où est l'extinction","Garde de l'eau ou un extincteur près de la cuisine, et apprends à t'en servir."],
 ['🚪',"Prévoir la sortie","Connais deux issues, ne bloque jamais la porte et donne l'alerte à voix haute."]
]);
M('l2-sommeil','Mieux dormir : 5 habitudes','nuit',[
 ['⏰',"Des horaires réguliers","Se coucher et se lever à peu près à la même heure aide le corps à s'organiser."],
 ['📵',"Éteindre les écrans","La lumière du téléphone retarde l'endormissement. Pose-le un moment avant de dormir."],
 ['🍽️',"Dîner léger","Un repas trop lourd ou trop tard peut gêner le sommeil."],
 ['🛏️',"Une chambre calme et aérée","Moins de bruit et de lumière, et de l'air frais, pour une meilleure nuit."],
 ['🏃',"Bouger dans la journée","Une activité physique régulière aide à s'endormir plus facilement."]
]);
M('l2-congelateur','Entretenir son congélateur','turquoise',[
 ['🧊',"Dégivrer régulièrement","Une couche de givre épaisse fait consommer plus et prend de la place."],
 ['📐',"Laisser de l'espace derrière","L'appareil doit pouvoir évacuer sa chaleur : ne le colle pas au mur."],
 ['📦',"Ne pas trop le remplir","L'air froid doit circuler. Range par catégories pour retrouver vite."],
 ['🏷️',"Étiqueter avec la date","Note le contenu et la date de congélation pour consommer dans l'ordre."],
 ['⚡',"En cas de coupure","Garde la porte fermée : le froid se conserve beaucoup plus longtemps."]
]);
V('l2-lancer','Lancer un petit commerce : 5 questions','or',[
 ['🎯',"Que vais-je vendre ?","Choisis un produit ou un service dont les gens ont besoin autour de toi."],
 ['👥',"Qui sont mes clients ?","Voisins, travailleurs, étudiants : connaître ses clients aide à bien choisir."],
 ['💰',"Combien me faut-il pour démarrer ?","Liste le stock, le matériel et le local, puis ajoute une petite réserve."],
 ['📍',"Où m'installer ?","Un bon passage vaut souvent mieux qu'un grand espace."],
 ['📒',"Comment suivre mes comptes ?","Dès le premier jour, note ce qui entre et ce qui sort."]
]);
V('l2-enligne','Vendre en ligne : les bases','violet',[
 ['📸',"De belles photos","Une photo nette, bien éclairée, donne confiance."],
 ['✍️',"Une description claire","Dis la taille, l'état, le prix et la ville. Évite les phrases floues."],
 ['⏱️',"Répondre vite","Un client qui attend longtemps va voir ailleurs."],
 ['🚚',"Annoncer la livraison","Précise les zones, les délais et les frais avant la commande."],
 ['🛡️',"Rester prudent","Ne donne jamais ton code secret. Vérifie le paiement avant de livrer."]
]);
V('l2-stock','Tenir son stock sans pertes','terre',[
 ['📋',"Faire l'inventaire","Compte ton stock régulièrement et note les quantités."],
 ['📅',"Premier entré, premier sorti","Vends d'abord les produits les plus anciens, surtout les denrées."],
 ['🔔',"Fixer un seuil d'alerte","Quand un produit descend sous un seuil, il est temps de recommander."],
 ['🧱',"Bien ranger","Protège de l'humidité, de la chaleur et des rongeurs."],
 ['📉',"Repérer ce qui ne se vend pas","Un produit qui dort coûte de l'argent : baisse son prix ou arrête-le."]
]);
A('ag-l2-menagere','Recruter une aide ménagère de confiance','turquoise',[
 ['🏠',"Dire ce que tu attends","Tâches, jours, horaires et règles de la maison : sois précis dès le départ."],
 ['📋',"Vérifier le parcours","Références, expérience et pièces d'identité méritent un contrôle sérieux."],
 ['🤝',"Un entretien sincère","Parle franchement du travail et écoute les attentes de la personne."],
 ['🗓️',"Un essai encadré","Quelques jours d'essai montrent si le travail et le courant passent."],
 ['✅',"Passer par une agence","Nous sélectionnons des profils sérieux et suivons le placement avec vous."]
]);
A('ag-l2-entretien','Recruter un agent d\'entretien et de jardinage','vert',[
 ['🌿',"Préciser le besoin","Jardin, cour, nettoyage de locaux : un besoin clair attire le bon profil."],
 ['🧰',"Matériel et savoir-faire","Demande ce qu'il maîtrise : taille, arrosage, produits, outils."],
 ['📋',"Contrôler le sérieux","Références, ponctualité et honnêteté comptent autant que la force physique."],
 ['🤝',"Fixer les règles","Horaires, rémunération et sécurité doivent être connus de tous."],
 ['✅',"Passer par une agence","Nous présentons des candidats vérifiés et nous aidons à bien démarrer."]
]);
SCCS.add('l2-animaux','Le saviez-vous ? Les animaux','Divertissement','orange',[
 ['🐘',"Le géant des terres","L'éléphant est le plus grand animal terrestre, et il vit en famille très unie."],
 ['🐆',"Le plus rapide","Le guépard est le plus rapide des animaux terrestres, mais il ne tient pas longtemps."],
 ['🦒',"Un long cou","La girafe a le même nombre de vertèbres du cou que nous : sept, mais beaucoup plus longues."],
 ['🐪',"Les bosses du chameau","Elles stockent surtout de la graisse, pas de l'eau, qui sert de réserve d'énergie."],
 ['🐙',"Trois cœurs","La pieuvre possède trois cœurs : deux pour les branchies, un pour le reste du corps."]
],{ photo:true });
})();

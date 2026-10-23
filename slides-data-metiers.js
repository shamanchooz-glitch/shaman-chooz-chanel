/* MÉTIERS — 28 métiers × 3 vidéos = 84 diaporamas générés par code (recrutement, découverte du métier, qualités).
   Pour ajouter un métier : une ligne dans M ci-dessous = 3 nouvelles vidéos + (jeux : voir games-edu10.js, qui lit window.SCC_METIERS). */
(function(){
if(!window.SCCS) return;
const M = [
['🔧','un plombier','Plombier','dépanner les fuites|poser des sanitaires|entretenir les canalisations','rapide|honnête|soigneux','Coupe toujours l\'eau avant une réparation.'],
['💡','un électricien','Électricien','installer les prises et l\'éclairage|réparer les pannes|vérifier la sécurité du réseau','rigoureux|prudent|compétent','Coupe le courant avant toute intervention.'],
['🧱','un maçon','Maçon','monter des murs|couler du béton|réaliser des fondations','endurant|précis|ponctuel','Respecte les dosages et le temps de séchage.'],
['🎨','un peintre en bâtiment','Peintre en bâtiment','préparer les murs|appliquer les couleurs|réaliser les finitions','minutieux|patient|propre','Bien préparer le mur fait la moitié du travail.'],
['🪚','un menuisier','Menuisier','fabriquer des meubles|poser des portes et fenêtres|réparer le bois','adroit|créatif|précis','Mesure deux fois, coupe une fois.'],
['🟫','un carreleur','Carreleur','poser des carreaux|préparer les sols|soigner les joints','patient|minutieux|endurant','Un sol bien nivelé donne un beau carrelage.'],
['🔥','un soudeur','Soudeur','assembler des pièces métalliques|réaliser des portails et grilles|réparer des structures','concentré|prudent|habile','Porte toujours masque et gants de protection.'],
['🚗','un mécanicien auto','Mécanicien auto','diagnostiquer une panne|faire la vidange|changer les pièces usées','curieux|rigoureux|honnête','Explique clairement au client ce qui est réparé.'],
['🚕','un chauffeur','Chauffeur','conduire en sécurité|respecter les horaires|entretenir le véhicule','ponctuel|calme|responsable','Vérifie le véhicule avant chaque départ.'],
['🛵','un coursier livreur','Coursier livreur','retirer et livrer des colis|respecter les délais|encaisser en toute sécurité','rapide|fiable|poli','Confirme l\'adresse avant de partir.'],
['🛡️','un agent de sécurité','Agent de sécurité','surveiller un site|contrôler les accès|donner l\'alerte en cas de problème','vigilant|disponible|calme','Note chaque incident dans un cahier de ronde.'],
['🧹','un agent d\'entretien','Agent d\'entretien','nettoyer les locaux|entretenir les sanitaires|gérer les produits de nettoyage','soigneux|ponctuel|discret','Ne mélange jamais deux produits différents.'],
['🏠','une aide ménagère','Aide ménagère','faire le ménage|laver et repasser le linge|ranger la maison','fiable|organisée|discrète','Demande dès le départ la liste des tâches.'],
['👶','une nounou','Nounou','garder les enfants|préparer les repas|organiser les jeux et les siestes','patiente|attentive|responsable','Ne laisse jamais un enfant seul près d\'un danger.'],
['🍳','un cuisinier','Cuisinier','préparer les repas|gérer les stocks de denrées|respecter l\'hygiène','créatif|propre|organisé','Lave-toi les mains avant chaque préparation.'],
['🍽️','un serveur','Serveur','accueillir les clients|prendre les commandes|servir à table','souriant|rapide|poli','Répète la commande pour éviter les erreurs.'],
['🥖','un boulanger-pâtissier','Boulanger-pâtissier','pétrir la pâte|cuire le pain et les gâteaux|respecter les recettes','matinal|précis|propre','Pèse les ingrédients avec soin.'],
['🧵','un couturier','Couturier','prendre les mesures|couper et coudre|réaliser les retouches','minutieux|créatif|patient','Prends les mesures deux fois avant de couper.'],
['💇','un coiffeur','Coiffeur','couper et coiffer|réaliser des tresses et soins|accueillir la clientèle','créatif|à l\'écoute|propre','Désinfecte tes outils entre deux clients.'],
['💅','une esthéticienne','Esthéticienne','faire les soins du visage|poser les vernis|conseiller les clientes','douce|propre|attentive','Respecte les règles d\'hygiène à chaque soin.'],
['🛍️','un vendeur','Vendeur','conseiller les clients|présenter les produits|tenir le rayon','aimable|à l\'écoute|honnête','Connais bien tes produits et leurs prix.'],
['💵','un caissier','Caissier','encaisser les ventes|rendre la monnaie|tenir la caisse à jour','honnête|attentif|rapide','Compte la caisse au début et à la fin.'],
['📊','un comptable','Comptable','tenir les comptes|préparer les factures|suivre les dépenses','rigoureux|discret|organisé','Garde toutes les pièces justificatives.'],
['🗂️','une secrétaire','Secrétaire','accueillir les visiteurs|gérer l\'agenda|classer les documents','organisée|discrète|polie','Note chaque message avec la date et l\'heure.'],
['🌿','un jardinier','Jardinier','tailler et arroser|entretenir les pelouses|planter fleurs et arbres','patient|endurant|soigneux','Arrose tôt le matin ou en fin de journée.'],
['👔','un blanchisseur','Blanchisseur','laver et sécher le linge|repasser|plier et livrer','soigneux|ponctuel|honnête','Lis l\'étiquette de chaque vêtement.'],
['🛎️','une réceptionniste','Réceptionniste','accueillir les clients|répondre au téléphone|gérer les réservations','souriante|organisée|polie','Garde un ton aimable même quand il y a du monde.'],
['❄️','un frigoriste','Frigoriste','installer des climatiseurs|dépanner des frigos|faire l\'entretien','méthodique|prudent|compétent','Nettoie régulièrement les filtres.'],
['💻','un technicien informatique','Technicien informatique','dépanner des ordinateurs|installer les logiciels|sécuriser les données','logique|patient|curieux','Fais une sauvegarde avant toute réparation.']
];
window.SCC_METIERS = M.map(m=>({ art:m[1], nom:m[2], T:m[3].split('|'), Q:m[4].split('|'), C:m[5] }));
const cap = s => s.charAt(0).toUpperCase() + s.slice(1), lc = s => s.charAt(0).toLowerCase() + s.slice(1);
M.forEach((m,i)=>{
  const e = m[0], art = m[1], nom = m[2], T = m[3].split('|'), Q = m[4].split('|'), C = m[5], n = i + 1;
  SCCS.add('ag-m'+n, 'Recruter ' + art, 'Agence', ['bleu','vert','orange','violet','turquoise','or'][i % 6], [
    ['🔎',"Définir le besoin","Tu cherches " + art + " ? Décris clairement les tâches : " + T.join(', ') + "."],
    [e,"Ce que fait ce professionnel", cap(T[0]) + ", " + T[1] + " et " + T[2] + "."],
    ['⭐',"Les qualités à chercher", cap(Q[0]) + ", " + Q[1] + " et " + Q[2] + " : voilà ce qui fait la différence."],
    ['📋',"Bien vérifier", "Demande des références et vérifie le travail réalisé. " + C],
    ['🤝',"Passer par une agence","Nous présélectionnons des candidats sérieux et nous suivons le placement avec toi."]
  ], { photo:true });
  SCCS.add('m-'+n, 'Le métier de ' + lc(nom) + ' : ce qu\'on fait', 'Métiers', ['terre','or','bleu','vert','rose','nuit'][i % 6], [
    [e, nom, "Un métier utile au quotidien, dans les quartiers comme en ville."],
    ['🛠️',"Les missions courantes", cap(T[0]) + ", " + T[1] + " et " + T[2] + "."],
    ['💡',"Le conseil du pro", C],
    ['⭐',"Ce qu'il faut avoir", cap(Q[0]) + ", " + Q[1] + " et " + Q[2] + "."],
    ['🚀',"Et toi ?","Ce métier t'intéresse ? Apprends auprès d'un professionnel et construis ton expérience pas à pas."]
  ], { photo:true });
  SCCS.add('q-'+n, nom + ' : les qualités qui font la différence', 'Métiers', ['violet','turquoise','rouge','orange','vert','bleu'][i % 6], [
    ['⭐',cap(Q[0]),"Dans ce métier, être " + Q[0] + " inspire confiance et fidélise les clients."],
    ['⭐',cap(Q[1]),"Être " + Q[1] + " se remarque vite et fait parler de toi en bien."],
    ['⭐',cap(Q[2]),"Être " + Q[2] + " t'aide à progresser et à durer dans le métier."],
    ['💡',"Le conseil du pro", C],
    ['🤝',"Ton placement","Notre agence t'aide à trouver des offres adaptées à ton profil."]
  ], { photo:true });
});
})();

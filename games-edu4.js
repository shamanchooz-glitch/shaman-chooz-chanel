/* ==========================================================
   LOT ÉDUCATIF 4 — Santé & nature (5), Métiers & carrière (15)
   Nécessite games-edu-core.js (chargé avant).
   ========================================================== */
(function(){
'use strict';
if(!window.EDU) return;
const G = EDU.G;

/* ---------------------------------------------------------- SANTÉ & NATURE */
G('eanafrique','Animaux d\'Afrique','🦒','Santé & nature',38,'Lions, éléphants, girafes… découvre la faune africaine.', EDU.quiz([
 ["Quel est le plus grand animal terrestre ?","L'éléphant d'Afrique","La girafe","Le rhinocéros","L'hippopotame"],
 ["Quel animal terrestre est le plus rapide ?","Le guépard","Le lion","Le zèbre","L'antilope"],
 ["Quel animal est le plus grand par sa hauteur ?","La girafe","L'éléphant","Le chameau","L'autruche"],
 ["Combien de bosses a un dromadaire ?","Une","Deux","Trois","Aucune"],
 ["Quel animal d'Afrique a des rayures noires et blanches ?","Le zèbre","Le lion","Le buffle","L'hyène"],
 ["Quel animal vit surtout dans l'eau et sur les berges, avec une énorme bouche ?","L'hippopotame","Le rhinocéros","Le léopard","La girafe"],
 ["Quel est le plus grand oiseau du monde ?","L'autruche","L'aigle","Le pélican","Le flamant rose","~L'autruche ne vole pas, mais elle court très vite."],
 ["Quel animal est surnommé « le vaisseau du désert » ?","Le dromadaire","Le zèbre","La girafe","L'éléphant"],
 ["Quel grand singe vit dans les forêts d'Afrique ?","Le gorille","L'orang-outan","Le koala","Le panda"],
 ["Quel animal d'Afrique porte une ou deux cornes sur le nez ?","Le rhinocéros","L'éléphant","Le zèbre","L'autruche"],
 ["Que mange surtout la girafe ?","Des feuilles d'arbres, surtout d'acacias","De la viande","Du poisson","Des insectes"],
 ["Chez les lions, qui chasse le plus souvent pour le groupe ?","Les lionnes","Les lions mâles","Les lionceaux","Aucun, ils mangent des fruits"],
 ["Le parc du Serengeti, célèbre pour ses grandes migrations, se trouve en…","Tanzanie","Côte d'Ivoire","Mali","Maroc"],
 ["Dans quel pays se trouve le parc national de Taï, grande forêt tropicale protégée ?","La Côte d'Ivoire","Le Kenya","La Namibie","L'Égypte"],
 ["L'okapi, cousin de la girafe, vit dans quel pays ?","La RD Congo","Le Maroc","Le Sénégal","L'Afrique du Sud"]
]));

G('eplantes','Plantes et cultures','🌱','Santé & nature',100,'Cacao, manioc, karité, baobab : les plantes qui nous nourrissent.', EDU.quiz([
 ["De quelle plante tire-t-on le chocolat ?","Du cacaoyer","Du caféier","De l'hévéa","Du palmier"],
 ["Quel arbre donne le caoutchouc ?","L'hévéa","Le baobab","Le manguier","Le cocotier"],
 ["L'attiéké est fabriqué à partir de quelle racine ?","Le manioc","L'igname","La patate douce","La pomme de terre"],
 ["Quelle plante produit le café ?","Le caféier","Le cacaoyer","Le cotonnier","Le karité"],
 ["D'où vient l'huile de palme ?","Du palmier à huile","Du cocotier","De l'arachide","Du sésame"],
 ["Dans quelle culture utilise-t-on des rizières ?","Le riz","Le blé","Le maïs","Le manioc"],
 ["Que produit l'anacardier ?","Des noix de cajou","Des cacahuètes","Des noix de coco","Des dattes"],
 ["Quelle plante donne le coton ?","Le cotonnier","Le cacaoyer","L'hévéa","Le bananier"],
 ["Quel est le rôle des abeilles pour les fleurs ?","Elles transportent le pollen (pollinisation)","Elles les mangent","Elles les arrosent","Elles les colorent"],
 ["Que fabrique-t-on à partir des noix du karité ?","Du beurre de karité","Du sucre","Du café","Du sel"],
 ["De quoi une plante a-t-elle besoin pour grandir ?","Lumière, eau et air","Seulement du sable","Seulement de l'huile","Uniquement de la chaleur"],
 ["Quel arbre géant d'Afrique peut stocker de l'eau dans son tronc ?","Le baobab","Le manguier","Le cocotier","L'oranger"],
 ["À quoi sert l'irrigation ?","À apporter de l'eau aux cultures","À couper les arbres","À chasser les oiseaux","À ramasser les fruits"],
 ["Le compost est fait à partir de…","Déchets organiques (épluchures, feuilles)","Plastiques","Métaux","Verre"],
 ["Quelle plante est la source de sucre dans les pays tropicaux ?","La canne à sucre","Le baobab","Le manioc","Le café"]
]));

G('erecyclage','Tri des déchets','♻️','Santé & nature',130,'Papier, verre, plastique ou compost ? Trie vite les déchets !', EDU.sort(['📰 Papier / carton','🍾 Verre','🧴 Plastique','🍌 Compost'],[
 ["Journal",0],["Carton d'emballage",0],["Cahier usagé",0],["Magazine",0],["Enveloppe",0],["Boîte à œufs en carton",0],
 ["Bocal en verre",1],["Bouteille en verre",1],["Pot de confiture vide",1],["Flacon de parfum en verre",1],
 ["Bouteille d'eau en plastique",2],["Sachet plastique",2],["Bidon d'huile vide",2],["Pot de yaourt",2],["Brosse à dents",2],["Seau cassé",2],
 ["Épluchures de légumes",3],["Restes de fruits",3],["Feuilles mortes",3],["Coquilles d'œufs",3],["Marc de café",3]
]));

G('eenergies','Énergies','🔋','Santé & nature',55,'Renouvelable ou non renouvelable ? Classe les sources d\'énergie.', EDU.sort(['☀️ Renouvelable','⛽ Non renouvelable'],[
 ["Soleil",0],["Vent",0],["Barrage hydraulique",0],["Géothermie (chaleur du sol)",0],["Vagues et marées",0],["Biogaz (déchets organiques)",0],
 ["Pétrole",1],["Charbon",1],["Gaz naturel",1],["Uranium (nucléaire)",1],["Essence",1],["Fioul",1]
],{ how:'Une source d\'énergie apparaît : est-elle renouvelable (elle se reconstitue naturellement : soleil, vent, eau…) ou non renouvelable (elle s\'épuise : pétrole, charbon, gaz…) ? 3 vies ❤️.' }));

G('eroute','Sécurité routière','🚦','Santé & nature',0,'Feux, panneaux, casque, ceinture : les règles qui sauvent des vies.', EDU.quiz([
 ["Que signifie un feu rouge ?","Arrêt obligatoire","Ralentir seulement","Passer vite","Klaxonner"],
 ["Que faire avant de traverser une route ?","Regarder des deux côtés","Fermer les yeux","Courir sans regarder","Téléphoner"],
 ["Que faut-il porter à moto ou à scooter ?","Un casque attaché","Une casquette","Un chapeau","Rien"],
 ["À quoi sert la ceinture de sécurité ?","À réduire les blessures en cas de choc","À tenir les bagages","À décorer la voiture","À rien"],
 ["Où doivent marcher les piétons quand il y a un trottoir ?","Sur le trottoir","Au milieu de la route","Sur la ligne blanche","Derrière les voitures"],
 ["Où faut-il traverser la route ?","Sur un passage piéton","N'importe où en courant","Dans un virage","Entre deux voitures"],
 ["Un panneau triangulaire à bord rouge indique…","Un danger","Une obligation","Un parking","Une information touristique"],
 ["Un panneau rond à bord rouge indique en général…","Une interdiction ou une limitation","Un restaurant","Une station-service","Un hôpital"],
 ["Un panneau rond bleu indique en général…","Une obligation","Une interdiction","Un danger","Un parking payant"],
 ["Que se passe-t-il quand la route est mouillée ?","La distance de freinage augmente","La voiture freine mieux","Rien ne change","La route devient plus sûre"],
 ["Peut-on tenir son téléphone en main en conduisant ?","Non, c'est dangereux","Oui, c'est sans risque","Seulement la nuit","Seulement en ville"],
 ["Si on a bu de l'alcool, on doit…","Ne pas conduire","Conduire doucement","Conduire la nuit seulement","Mettre de la musique forte"],
 ["La nuit à vélo, que faut-il avoir ?","Des feux ou des éléments réfléchissants","Un chapeau","Un klaxon seulement","Rien du tout"]
]));

/* ---------------------------------------------------------- MÉTIERS & CARRIÈRE */
G('equelmetier','Quel est ce métier ?','🧑‍🔧','Métiers & carrière',30,'On décrit un métier : à toi de le deviner !', EDU.quiz([
 ["Il répare les fuites d'eau et installe les robinets.","Plombier","Électricien","Maçon","Peintre"],
 ["Elle soigne les malades, fait les pansements et les piqûres.","Infirmière","Comptable","Coiffeuse","Pilote"],
 ["Il construit des murs avec des briques ou des parpaings.","Maçon","Plombier","Cuisinier","Chauffeur"],
 ["Elle apprend à lire et à compter aux élèves.","Enseignante","Infirmière","Vendeuse","Secrétaire"],
 ["Il conduit un camion pour transporter des marchandises.","Chauffeur routier","Pilote","Soudeur","Gardien"],
 ["Il cultive les champs et élève des animaux.","Agriculteur","Maçon","Banquier","Électricien"],
 ["Elle prépare les repas dans un restaurant.","Cuisinière","Couturière","Coiffeuse","Comptable"],
 ["Il installe et répare l'électricité dans les maisons.","Électricien","Plombier","Menuisier","Peintre"],
 ["Elle tient les comptes et prépare les bilans d'une entreprise.","Comptable","Serveuse","Infirmière","Chauffeur"],
 ["Il défend ses clients devant un tribunal.","Avocat","Plombier","Pompier","Cuisinier"],
 ["Il surveille un lieu pour protéger les personnes et les biens.","Agent de sécurité","Serveur","Jardinier","Dentiste"],
 ["Elle conseille les clients et leur vend des produits.","Vendeuse","Pilote","Soudeuse","Infirmière"],
 ["Il crée des programmes et des applications.","Développeur informatique","Maçon","Boulanger","Plombier"],
 ["Elle coupe et coiffe les cheveux.","Coiffeuse","Couturière","Comptable","Institutrice"],
 ["Il fabrique et répare des meubles en bois.","Menuisier","Soudeur","Maçon","Électricien"],
 ["Elle recherche et sélectionne les candidats pour les entreprises.","Chargée de recrutement","Comptable","Cuisinière","Infirmière"],
 ["Il pilote un avion.","Pilote","Chauffeur routier","Gardien","Plombier"],
 ["Elle accueille les clients à la réception d'un hôtel.","Réceptionniste","Cuisinière","Soudeuse","Maçonne"],
 ["Il assemble des pièces de métal avec un poste à souder.","Soudeur","Menuisier","Peintre","Jardinier"]
]));

G('eoutils','Outils du métier','🧰','Métiers & carrière',25,'À quel métier appartient chaque outil ?', EDU.pairs([
 ["Stéthoscope","Médecin"],["Truelle","Maçon"],["Clé à molette","Plombier"],["Machine à coudre","Couturier"],["Ciseaux et peigne","Coiffeur"],["Tableau et craie","Enseignant"],
 ["Volant et pédales","Chauffeur"],["Casserole","Cuisinier"],["Testeur de tension","Électricien"],["Rabot","Menuisier"],["Pinceau et rouleau","Peintre"],["Calculatrice","Comptable"],
 ["Tracteur","Agriculteur"],["Poste à souder","Soudeur"],["Balance","Commerçant"]
]));

G('eentretien','Entretien d\'embauche','🤝','Métiers & carrière',45,'Les bons réflexes pour réussir un entretien.', EDU.quiz([
 ["Quand faut-il arriver à un entretien d'embauche ?","Quelques minutes en avance","À l'heure pile, sans marge","En retard, c'est normal","Une heure avant"],
 ["Quelle tenue choisir pour un entretien ?","Une tenue propre et adaptée au poste","Une tenue de plage","Une tenue de sport","Aucune importance"],
 ["On te dit « Parlez-moi de vous ». Que faire ?","Présenter brièvement mon parcours, mes qualités et ma motivation","Dire « Je n'ai rien à dire »","Raconter toute ma vie en détail","Demander le salaire tout de suite"],
 ["Que faire avant l'entretien ?","Me renseigner sur l'entreprise et le poste","Rien du tout","Critiquer l'entreprise","Dormir très tard"],
 ["Tu ne sais pas répondre à une question. Que faire ?","Rester calme et honnête, et expliquer comment je chercherais la réponse","Inventer une réponse","Me fâcher","Quitter la salle"],
 ["À la fin de l'entretien, que peut-on faire ?","Poser une ou deux questions sur le poste et remercier","Partir sans rien dire","Demander à finir plus tôt","Critiquer les questions"],
 ["Que faire de son téléphone pendant l'entretien ?","L'éteindre ou le mettre en silencieux","Répondre aux appels","Jouer dessus","Le poser sur la table et le regarder"],
 ["Peut-on mentir sur son CV ?","Non : tout peut être vérifié et on perd la confiance","Oui, tout le monde le fait","Oui, si c'est un petit mensonge","Seulement pour les diplômes"],
 ["Après l'entretien, que peut-on faire ?","Envoyer un court message de remerciement","Appeler dix fois par jour","Ne plus jamais répondre","Critiquer l'entreprise en ligne"],
 ["Comment parler de son ancien employeur ?","Avec respect, sans le critiquer","En disant du mal de lui","En se moquant","En racontant ses secrets"],
 ["« Quel est votre point faible ? » : que répondre ?","Un vrai point faible et comment j'essaie de progresser","Je n'en ai aucun","Je suis parfait","Je ne veux pas répondre"],
 ["Que faut-il apporter à l'entretien ?","Une copie du CV et les documents demandés","Rien","Des jouets","Un ami pour répondre à ma place"]
]));

G('ecv','CV et lettre de motivation','📄','Métiers & carrière',20,'Vrai ou faux ? Les règles d\'un bon dossier de candidature.', EDU.tf([
 ["Un CV doit être clair et tenir en général sur une ou deux pages.",true,"Un recruteur lit vite : l'essentiel doit sauter aux yeux."],
 ["Il faut mettre en avant les compétences liées au poste visé.",true,"Adapter son CV à l'offre augmente les chances d'être retenu."],
 ["Il est bon de lister tous ses petits emplois, même sans aucun rapport avec le poste.",false,"Mieux vaut garder ce qui est utile pour le poste visé."],
 ["Les fautes d'orthographe dans un CV ne posent aucun problème.",false,"Elles donnent une mauvaise image de sérieux. Il faut se relire ou se faire relire."],
 ["Un CV doit comporter des coordonnées pour être contacté (téléphone, e-mail).",true,"Sans moyen de contact, le recruteur ne peut pas te proposer d'entretien."],
 ["On peut inventer un diplôme si on n'en a pas.",false,"C'est un mensonge qui peut être découvert, avec de graves conséquences."],
 ["Il est utile d'adapter son CV à chaque offre d'emploi.",true,"Chaque poste demande des qualités différentes."],
 ["Une adresse e-mail sérieuse (prénom.nom) donne une meilleure image qu'un pseudo fantaisiste.",true,"Cette première impression compte."],
 ["Les expériences se listent de la plus récente à la plus ancienne.",true,"Le recruteur voit tout de suite ce que tu fais en ce moment."],
 ["La lettre de motivation explique pourquoi on veut ce poste dans cette entreprise.",true,"Elle complète le CV avec ta motivation."],
 ["On peut envoyer la même lettre de motivation, sans changement, à toutes les entreprises.",false,"Une lettre personnalisée montre que tu t'intéresses vraiment à l'entreprise."],
 ["Relire son CV avant de l'envoyer permet d'éviter des erreurs.",true,"Une seconde lecture fait gagner des points de crédibilité."],
 ["Des polices de caractères très fantaisistes rendent le CV plus lisible.",false,"Une police simple et lisible est préférable."],
 ["Des références d'anciens employeurs peuvent renforcer une candidature.",true,"À condition d'avoir leur accord avant de donner leurs coordonnées."]
]));

G('esoftskills','Savoir-être au travail','🌟','Métiers & carrière',50,'Que ferais-tu dans cette situation de travail ?', EDU.quiz([
 ["Un collègue a du mal sur une tâche. Que fais-tu ?","Je lui propose mon aide si j'ai le temps","Je me moque de lui","Je l'ignore","Je dis à tout le monde qu'il est nul"],
 ["Tu es en retard à cause d'un imprévu. Que fais-tu ?","Je préviens mon responsable dès que possible","Je ne dis rien","J'arrive sans m'excuser","Je ne viens pas du tout"],
 ["Tu as fait une erreur au travail. Que fais-tu ?","Je le dis vite et je propose de la corriger","Je la cache","J'accuse un collègue","Je pars"],
 ["Un client est mécontent. Que fais-tu ?","Je l'écoute calmement et je cherche une solution","Je lui réponds sur le même ton","Je lui tourne le dos","Je raccroche"],
 ["Tu ne comprends pas une consigne. Que fais-tu ?","Je demande poliment des précisions","Je fais au hasard","Je ne fais rien","Je copie un collègue sans savoir"],
 ["Que veut dire « avoir l'esprit d'équipe » ?","Travailler avec les autres pour un but commun","Travailler seul sans parler","Faire passer ses intérêts avant tout","Éviter tous les collègues"],
 ["Que veut dire « être ponctuel » ?","Arriver à l'heure prévue","Arriver quand on veut","Arriver très en retard","Ne jamais venir"],
 ["Un collègue te fait une critique constructive. Tu…","L'écoutes et essaies d'en tirer des leçons","Te fâches","Cries","Ne lui parles plus"],
 ["Qu'est-ce que l'autonomie ?","Savoir avancer seul sur ses tâches, en demandant de l'aide si besoin","Ne jamais écouter les conseils","Attendre qu'on fasse tout à sa place","Ne jamais poser de question"],
 ["Tu as fini ton travail plus tôt que prévu. Tu…","Proposes ton aide ou prends une autre tâche utile","Dors","Joues sur ton téléphone","Pars sans prévenir"],
 ["Pourquoi la politesse compte-t-elle au travail ?","Elle crée de bonnes relations avec collègues et clients","Elle ne sert à rien","Elle fait perdre du temps","Elle est interdite"],
 ["Tu connais une information confidentielle de l'entreprise. Tu…","Ne la partages pas à l'extérieur","La publies sur les réseaux","La racontes à tes amis","La vends"]
]));

G('esecurite','Sécurité au travail','🦺','Métiers & carrière',50,'Casque, gants, chaussures : les bons réflexes de sécurité.', EDU.quiz([
 ["À quoi sert un casque de chantier ?","À protéger la tête des chutes d'objets","À avoir chaud","À faire joli","À écouter de la musique"],
 ["Que porte-t-on pour des travaux très bruyants ?","Des bouchons ou un casque antibruit","Des lunettes de soleil","Un chapeau","Rien"],
 ["Pourquoi porter des chaussures de sécurité ?","Protéger les pieds des chocs et des objets lourds","Marcher plus vite","Faire de l'effet","Rester au chaud"],
 ["Comment soulever une charge lourde sans se blesser ?","En pliant les jambes et en gardant le dos droit","En se penchant dos rond","En sautant","En la lançant"],
 ["À quoi servent les gants de travail ?","À protéger les mains","À se cacher","À faire du sport","À rien"],
 ["Que faire en cas de danger repéré au travail ?","Le signaler à son responsable","L'ignorer","Le cacher","Attendre un accident"],
 ["Que signifie un panneau vert avec un bonhomme qui court vers une porte ?","Sortie de secours","Zone de jeux","Restaurant","Interdit de courir"],
 ["Que signifie un triangle jaune avec un point d'exclamation ?","Attention, danger","Pause déjeuner","Sortie","Zone de repos"],
 ["Comment éteindre un feu d'origine électrique ?","Avec un extincteur adapté, pas avec de l'eau","Avec de l'eau","Avec un chiffon mouillé","En soufflant"],
 ["Il y a un sol mouillé et glissant. Que faire ?","Le signaler avec un panneau et le sécher","Rien du tout","Courir dessus","Mettre de l'huile"],
 ["Pourquoi porter des lunettes de protection ?","Éviter les projections (étincelles, poussières, produits)","Mieux voir la télé","Paraître plus sérieux","Se protéger du froid"],
 ["Avant d'utiliser une machine, il faut…","Savoir l'utiliser et vérifier qu'elle est sûre","L'essayer au hasard","Retirer les protections","Fermer les yeux"]
]));

G('erh','Vocabulaire du recrutement','📋','Métiers & carrière',15,'CDI, CDD, préavis, placement… associe chaque terme à sa définition.', EDU.pairs([
 ["CDI","Contrat à durée indéterminée"],["CDD","Contrat à durée déterminée"],["CV","Document qui présente le parcours d'un candidat"],["RH","Ressources humaines"],["Intérim","Missions de travail temporaire"],
 ["Stage","Période de formation en entreprise"],["Préavis","Délai avant de quitter un poste"],["Période d'essai","Temps pour vérifier que le poste convient"],["Fiche de paie","Document détaillant le salaire"],
 ["Congés payés","Vacances rémunérées"],["Poste vacant","Emploi à pourvoir"],["Candidature","Demande pour obtenir un emploi"],["Placement","Mise en relation d'un candidat avec un employeur"],["Intégration","Accueil d'un nouvel employé"]
]));

G('esecteurs','Secteurs d\'activité','🏭','Métiers & carrière',200,'Primaire, secondaire ou tertiaire ? Classe les activités.', EDU.sort(['🌾 Primaire (nature)','🏭 Secondaire (fabrication)','🏪 Tertiaire (services)'],[
 ["Agriculture",0],["Élevage",0],["Pêche",0],["Exploitation minière",0],["Exploitation forestière",0],
 ["Industrie textile",1],["Construction (BTP)",1],["Usine agroalimentaire",1],["Fabrication de meubles",1],["Production d'électricité",1],["Fabrication de ciment",1],
 ["Commerce",2],["Banque",2],["Enseignement",2],["Santé",2],["Transport",2],["Tourisme",2],["Informatique (services)",2],["Coiffure",2],["Restauration",2]
],{ how:'Primaire : on prélève dans la nature (agriculture, pêche, mines). Secondaire : on transforme et on fabrique (industrie, construction). Tertiaire : on rend des services (commerce, santé, banque…). Classe chaque activité ! 3 vies ❤️.' }));

G('ebtp','Métiers du bâtiment','🏗️','Métiers & carrière',35,'Qui fait quoi sur un chantier ?', EDU.pairs([
 ["Maçon","Monte les murs"],["Électricien","Installe le courant"],["Plombier","Installe l'eau et les canalisations"],["Carreleur","Pose des carreaux au sol et aux murs"],["Peintre en bâtiment","Peint murs et plafonds"],
 ["Menuisier","Fabrique portes, fenêtres et meubles"],["Ferrailleur","Prépare les armatures en fer du béton"],["Conducteur d'engins","Pilote bulldozers et grues"],["Chef de chantier","Dirige le travail de l'équipe"],
 ["Architecte","Dessine les plans du bâtiment"],["Topographe","Mesure et trace le terrain"],["Couvreur","Pose la toiture"],["Soudeur","Assemble des pièces en métal"]
]));

G('esante','Métiers de la santé','🏥','Métiers & carrière',0,'Qui soigne quoi ? Associe le métier à son rôle.', EDU.pairs([
 ["Médecin","Pose un diagnostic et prescrit"],["Infirmier","Fait les soins et les pansements"],["Sage-femme","Accompagne les naissances"],["Pharmacien","Délivre et explique les médicaments"],["Dentiste","Soigne les dents"],
 ["Kinésithérapeute","Rééduque par le mouvement"],["Aide-soignant","Aide aux soins quotidiens et à la toilette"],["Technicien de radiologie","Réalise les radiographies"],["Biologiste","Analyse les prélèvements au laboratoire"],
 ["Ambulancier","Transporte les patients"],["Opticien","Adapte les lunettes à la vue"],["Psychologue","Écoute et accompagne les personnes"]
]));

G('ehotel','Hôtellerie et restauration','🏨','Métiers & carrière',335,'Réception, salle, cuisine : les métiers et le vocabulaire de l\'accueil.', EDU.quiz([
 ["Qui accueille les clients à leur arrivée à l'hôtel ?","Le réceptionniste","Le sommelier","Le jardinier","Le chauffeur"],
 ["Qui nettoie et prépare les chambres ?","Le personnel d'étage","Le sommelier","Le comptable","Le serveur"],
 ["Que fait un serveur ?","Prend les commandes et apporte les plats","Prépare tous les plats","Répare la plomberie","Conduit les clients"],
 ["Qui dirige la cuisine d'un restaurant ?","Le chef de cuisine","Le réceptionniste","Le bagagiste","Le sommelier"],
 ["Comment appelle-t-on la personne qui porte les bagages des clients ?","Le bagagiste","Le sommelier","Le plongeur","Le gouvernant"],
 ["Que signifie « check-in » ?","L'arrivée et l'enregistrement du client","Le départ du client","Le ménage","Le repas"],
 ["Que signifie « check-out » ?","Le départ du client et le règlement de la note","L'arrivée","La réservation","Le petit-déjeuner"],
 ["Qu'est-ce qu'une pension complète ?","La chambre et tous les repas de la journée","Seulement la chambre","Seulement le petit-déjeuner","Une chambre gratuite"],
 ["Un client se plaint. Que faire ?","L'écouter calmement et proposer une solution","Lui répondre sèchement","L'ignorer","Appeler la police"],
 ["Pourquoi l'hygiène est-elle essentielle en cuisine ?","Éviter les intoxications alimentaires","Faire joli","Gagner du temps","Faire plaisir au voisin"],
 ["Que fait un sommelier ?","Il conseille et sert les vins et boissons","Il construit des meubles","Il fait le ménage","Il conduit les clients"],
 ["Manger « à la carte » signifie…","Choisir ses plats un par un","Manger sans payer","Manger sur un plateau commun","Manger debout"]
]));

G('ebureau','Bureautique','🖥️','Métiers & carrière',210,'Raccourcis clavier, logiciels, fichiers : le b.a.-ba du bureau.', EDU.quiz([
 ["Quel raccourci permet de copier ?","Ctrl + C","Ctrl + V","Ctrl + Z","Ctrl + S"],
 ["Quel raccourci permet de coller ?","Ctrl + V","Ctrl + C","Ctrl + X","Ctrl + P"],
 ["Quel raccourci permet d'annuler la dernière action ?","Ctrl + Z","Ctrl + Y","Ctrl + A","Ctrl + N"],
 ["Quel raccourci permet d'enregistrer ?","Ctrl + S","Ctrl + P","Ctrl + C","Ctrl + F"],
 ["Quel raccourci permet d'imprimer ?","Ctrl + P","Ctrl + S","Ctrl + I","Ctrl + M"],
 ["Quel logiciel sert surtout à écrire des lettres ?","Un traitement de texte (Word)","Un tableur","Un navigateur","Un lecteur de musique"],
 ["Quel logiciel sert à faire des calculs dans des tableaux ?","Un tableur (Excel)","Un traitement de texte","Un antivirus","Un lecteur vidéo"],
 ["Quel logiciel permet de créer des diapositives pour une présentation ?","PowerPoint (ou Google Slides)","Excel","Paint","Calculatrice"],
 ["Quel format de fichier garde la mise en page quel que soit l'appareil ?","Le PDF","Le MP3","Le ZIP","Le EXE"],
 ["Que fait la formule =SOMME(A1:A5) dans un tableur ?","Additionne les cellules de A1 à A5","Multiplie les cellules","Efface les cellules","Compte les lettres"],
 ["Qu'est-ce qu'une pièce jointe dans un e-mail ?","Un fichier envoyé avec le message","Un message supprimé","La signature","Le destinataire"],
 ["Pourquoi ranger ses fichiers dans des dossiers ?","Pour les retrouver facilement","Pour ralentir l'ordinateur","Pour les cacher","Pour les supprimer"],
 ["Que signifie « Cc » dans un e-mail ?","Envoyer une copie à une autre personne","Crypter le message","Corriger le message","Compresser le message"],
 ["Quelle extension a un document Word moderne ?",".docx",".xlsx",".pptx",".mp4"]
]));

G('emailpro','Courriel professionnel','📧','Métiers & carrière',220,'Les bonnes manières pour écrire un e-mail à un employeur ou un client.', EDU.quiz([
 ["Que doit contenir l'objet d'un e-mail professionnel ?","Un titre court qui résume le sujet","Rien du tout","Une blague","Un long paragraphe"],
 ["Quelle formule de politesse convient à la fin d'un e-mail professionnel ?","« Cordialement »","« Salut à plus »","« Bisous »","« Yo »"],
 ["Pour écrire à une personne inconnue, la bonne formule d'appel est…","« Bonjour Madame, Monsieur, »","« Salut mec »","« Hé ! »","Aucune formule"],
 ["Écrire un e-mail entièrement en MAJUSCULES, c'est…","Comme crier : à éviter","Plus poli","Obligatoire","Plus clair"],
 ["Avant d'envoyer un e-mail, il faut…","Le relire et vérifier le destinataire","L'envoyer sans le lire","Ajouter beaucoup de photos","Écrire en rouge"],
 ["Pourquoi faut-il éviter « Répondre à tous » sans nécessité ?","Pour ne pas surcharger la boîte de personnes non concernées","C'est interdit","C'est trop rapide","Cela coûte de l'argent"],
 ["Tu ne peux pas répondre tout de suite. Que faire ?","Accuser réception et dire quand je répondrai","Ne jamais répondre","Effacer le message","Répondre « oui » sans lire"],
 ["Quelle adresse e-mail fait le plus sérieux pour une candidature ?","prenom.nom@…","superboy2000@…","jetaime@…","lolmdr@…"],
 ["Les émojis dans un premier e-mail à un employeur sont…","À éviter","Obligatoires","Très appréciés","Indispensables"],
 ["Quand on joint un fichier, il faut…","L'annoncer dans le texte et vérifier qu'il est bien joint","Ne rien dire","L'envoyer vide","Le renommer au hasard"],
 ["Au téléphone professionnel, on commence par…","Se présenter et saluer poliment","Raccrocher","Chanter","Demander un cadeau"]
]));

G('epriorites','Gestion du temps','🗓️','Métiers & carrière',140,'Urgent ? Important ? Apprends à classer tes tâches comme un pro.', EDU.sort(['🔥 Urgent et important','📅 Important, pas urgent','⚡ Urgent, peu important','🗑️ Ni urgent ni important'],[
 ["Réparer la panne qui bloque la production",0],["Répondre à un client prêt à partir",0],["Rendre un dossier demandé pour ce soir",0],["Soigner une blessure grave au travail",0],
 ["Préparer une formation pour le mois prochain",1],["Planifier ses objectifs de la semaine",1],["Mettre à jour son CV",1],["Apprendre une nouvelle compétence utile",1],["Faire du sport pour sa santé",1],
 ["Répondre à un appel non essentiel",2],["Participer à une réunion peu utile",2],["Répondre à un message sans importance",2],
 ["Regarder des vidéos pendant le travail",3],["Trier de vieux papiers sans importance",3],["Parcourir des notifications de jeux",3]
],{ how:'La méthode des priorités : Urgent et important = à faire tout de suite ; Important mais pas urgent = à planifier ; Urgent mais peu important = à déléguer ou faire vite ; Ni urgent ni important = à éviter. Classe chaque tâche ! 3 vies ❤️.' }));

G('edactylo','Dactylo pro','⌨️','Métiers & carrière',160,'Tape le plus vite possible pendant 60 secondes, comme une secrétaire pro.', EDU.typing([
 'Bonjour, je vous écris pour postuler au poste de comptable.',
 'Veuillez trouver ci-joint mon curriculum vitae.',
 'Je reste à votre disposition pour un entretien.',
 'La ponctualité est une qualité très appréciée en entreprise.',
 'Notre agence met en relation les entreprises et les talents.',
 'Merci de confirmer la réception de ce message.',
 'La réunion aura lieu demain à neuf heures dans la grande salle.',
 'Le travail en équipe permet d\'obtenir de meilleurs résultats.',
 'Un bon recrutement commence par une bonne description du poste.',
 'Je vous remercie de l\'attention portée à ma candidature.',
 'Le client est au centre de notre travail de chaque jour.',
 'Chaque journée est une occasion d\'apprendre quelque chose de nouveau.',
 'Il faut du courage pour commencer et de la patience pour réussir.',
 'Les marchés ouvrent leurs portes au lever du soleil.'
]));
})();

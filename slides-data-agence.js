/* ==========================================================
   DIAPORAMAS « AGENCE » (36) — recrutement et placement, tous secteurs
   Chaque ligne : S(identifiant, titre, 'Agence', palette, [[emoji, titre, texte], …])
   Palettes : bleu, vert, orange, violet, rouge, or, rose, turquoise, nuit, terre
   Tu peux modifier les textes librement (garde les guillemets et les virgules).
   ========================================================== */
(function(){
if(!window.SCCS) return;
const S = (id, t, pal, sl)=> SCCS.add(id, t, 'Agence', pal, sl);

S('ag-presentation','Notre agence en une minute','bleu',[
 ['🤝','Qui sommes-nous ?','Une agence de recrutement et de placement qui met en relation les entreprises et les candidats.'],
 ['🌍','Tous les secteurs d\'activité','Bâtiment, santé, commerce, hôtellerie, transport, informatique, administration, services : nous travaillons dans tous les domaines.'],
 ['👥','Pour les candidats','Nous écoutons votre parcours, valorisons vos compétences et vous présentons aux employeurs qui cherchent votre profil.'],
 ['🏢','Pour les entreprises','Vous nous confiez votre besoin, nous sélectionnons les candidats les mieux adaptés à votre poste.'],
 ['⭐','Nos valeurs','Écoute, sérieux, respect et confidentialité : chaque personne mérite une vraie chance.']
]);
S('ag-candidats','Candidats : comment ça marche ?','vert',[
 ['📝','1. Je me présente','Je transmets mon CV et mes informations : mon parcours, mes compétences, le type de poste recherché.'],
 ['💬','2. Nous échangeons','Un échange permet de mieux me connaître : mes objectifs, mes disponibilités, mes points forts.'],
 ['🎯','3. On me propose des offres','L\'agence me présente aux employeurs dont les besoins correspondent à mon profil.'],
 ['🤝','4. Je rencontre l\'employeur','Je passe l\'entretien, préparé et accompagné par l\'agence.'],
 ['📈','5. Un suivi après l\'embauche','L\'agence reste à l\'écoute pour que l\'intégration se passe bien.']
]);
S('ag-entreprises','Entreprises : un recrutement simple','orange',[
 ['📣','1. Vous exprimez votre besoin','Poste, missions, compétences, durée, lieu : vous nous décrivez le profil recherché.'],
 ['🔎','2. Nous recherchons','Nous interrogeons notre base de candidats et lançons la recherche de profils adaptés.'],
 ['✅','3. Nous présélectionnons','Entretiens et vérification des parcours : vous ne rencontrez que des candidats pertinents.'],
 ['🤝','4. Vous choisissez','Vous recevez une sélection de candidats et décidez en toute liberté.'],
 ['🧭','5. Nous accompagnons','Nous restons disponibles après l\'embauche pour faciliter l\'intégration.']
]);
S('ag-btp','Recruter dans le bâtiment et les travaux publics','terre',[
 ['🏗️','Un secteur qui construit l\'avenir','Maisons, routes, immeubles, ponts : le bâtiment a besoin de personnel qualifié et motivé.'],
 ['👷','Les profils recherchés','Maçons, carreleurs, plombiers, électriciens, peintres, ferrailleurs, conducteurs d\'engins, chefs de chantier.'],
 ['🦺','La sécurité d\'abord','Casque, gants, chaussures de sécurité : un bon professionnel respecte toujours les règles de sécurité.'],
 ['📸','Candidats : montrez vos réalisations','Des photos de chantiers terminés et des références valent souvent mieux qu\'un long discours.'],
 ['🏢','Employeurs : décrivez le chantier','Durée, lieu, outils fournis, niveau d\'expérience : plus l\'offre est précise, plus la sélection est juste.']
]);
S('ag-sante','Recruter dans la santé et l\'aide à la personne','turquoise',[
 ['🏥','Des métiers au service des autres','Cliniques, hôpitaux, pharmacies, laboratoires : la santé a besoin de personnes compétentes et humaines.'],
 ['🩺','Les profils recherchés','Infirmiers, aides-soignants, sages-femmes, techniciens de laboratoire, pharmaciens, agents d\'accueil, aides à domicile.'],
 ['🧼','Les qualités essentielles','Sens de l\'écoute, rigueur, hygiène irréprochable, discrétion et respect des patients.'],
 ['📄','Des documents à jour','Diplômes, attestations et autorisations nécessaires doivent être prêts avant la candidature.'],
 ['💙','Notre engagement','Présenter des candidats sérieux, dont le parcours a été vérifié avec soin.']
]);
S('ag-hotel','Recruter dans l\'hôtellerie et la restauration','rouge',[
 ['🏨','Le métier de l\'accueil','Hôtels, restaurants, maquis, traiteurs : le client doit se sentir bienvenu du premier au dernier instant.'],
 ['👩‍🍳','Les profils recherchés','Cuisiniers, serveurs, réceptionnistes, personnel d\'étage, barmen, plongeurs, chefs de rang.'],
 ['😊','Le sourire fait la différence','Politesse, présentation soignée et sens du contact comptent autant que les compétences techniques.'],
 ['🧽','Hygiène et sécurité alimentaire','Propreté, respect de la chaîne du froid et organisation de la cuisine sont indispensables.'],
 ['🕐','Des horaires particuliers','Soirs, week-ends, jours de fête : ce secteur demande de la disponibilité et de l\'endurance.']
]);
S('ag-transport','Recruter dans le transport et la logistique','bleu',[
 ['🚚','Faire circuler les marchandises','Transporter, stocker, livrer : sans logistique, rien n\'arrive à temps sur les marchés et dans les magasins.'],
 ['🧑‍✈️','Les profils recherchés','Chauffeurs, livreurs, magasiniers, caristes, gestionnaires de stock, agents de transit, dispatcheurs.'],
 ['🪪','Les documents indispensables','Permis adapté au véhicule, papiers en règle et dossier à jour sont demandés par les employeurs.'],
 ['🛑','La sécurité routière','Respect du code de la route, repos suffisant et véhicule bien entretenu : la sécurité de tous en dépend.'],
 ['⏰','La ponctualité avant tout','Dans ce métier, une livraison en retard peut coûter cher : fiabilité et organisation sont essentielles.']
]);
S('ag-commerce','Recruter dans le commerce et la vente','or',[
 ['🛍️','Au contact des clients','Boutiques, supermarchés, marchés, distribution : la vente recrute toute l\'année.'],
 ['🧾','Les profils recherchés','Vendeurs, caissiers, responsables de rayon, commerciaux, merchandisers, gestionnaires de boutique.'],
 ['🤝','Les qualités d\'un bon vendeur','Sens de l\'écoute, honnêteté, bonne présentation et envie de conseiller sincèrement.'],
 ['🔢','Savoir compter vite','Rendre la monnaie sans erreur, tenir une caisse, suivre un stock : le calcul est un atout.'],
 ['🎯','Résultats et objectifs','Les employeurs apprécient les candidats qui savent expliquer ce qu\'ils ont réussi à vendre.']
]);
S('ag-it','Recruter dans l\'informatique et le numérique','nuit',[
 ['💻','Un secteur en pleine croissance','Sites web, applications, réseaux, sécurité, support : les entreprises ont de plus en plus besoin de compétences numériques.'],
 ['🧑‍💻','Les profils recherchés','Développeurs, techniciens de support, administrateurs réseau, graphistes, community managers, analystes de données.'],
 ['📂','Candidats : présentez vos projets','Un portfolio, un site réalisé ou une application créée prouvent vos compétences mieux qu\'un titre.'],
 ['📚','Apprendre en continu','Les outils changent vite : les employeurs apprécient ceux qui se forment régulièrement.'],
 ['🔐','Rigueur et confidentialité','Les données des entreprises sont précieuses : honnêteté et discrétion sont indispensables.']
]);
S('ag-finance','Recruter dans la banque, la finance et l\'assurance','violet',[
 ['🏦','Un secteur de confiance','Banques, microfinance, assurances, cabinets comptables : on y gère l\'argent des autres avec sérieux.'],
 ['📊','Les profils recherchés','Comptables, assistants comptables, conseillers clientèle, caissiers, gestionnaires de portefeuille, contrôleurs de gestion.'],
 ['🔒','Rigueur et confidentialité','Précision dans les chiffres et discrétion absolue sont des qualités de base.'],
 ['💬','Le sens du conseil','Expliquer simplement un produit financier à un client est une compétence très appréciée.'],
 ['🧮','Maîtriser les outils','Tableur, logiciel de comptabilité, règles de base de la gestion : à mettre en avant dans le CV.']
]);
S('ag-agri','Recruter dans l\'agriculture et l\'agroalimentaire','vert',[
 ['🌾','Nourrir les populations','Champs, plantations, élevages, usines de transformation : ce secteur fait vivre des millions de familles.'],
 ['🚜','Les profils recherchés','Ouvriers agricoles, techniciens agricoles, conducteurs de machines, contrôleurs qualité, responsables d\'exploitation.'],
 ['🥫','La transformation','Cacao, café, anacarde, fruits, poissons : transformer sur place crée des emplois et de la valeur.'],
 ['🧪','Qualité et hygiène','Respect des normes, traçabilité et propreté sont essentiels, surtout pour les produits alimentaires.'],
 ['🌦️','Un métier de terrain','Endurance, sens de l\'observation et respect de la nature font les bons professionnels.']
]);
S('ag-education','Recruter dans l\'éducation et la formation','turquoise',[
 ['🎓','Transmettre le savoir','Écoles, centres de formation, cours particuliers : enseigner, c\'est préparer l\'avenir.'],
 ['🧑‍🏫','Les profils recherchés','Enseignants, formateurs, animateurs, éducateurs, surveillants, secrétaires d\'établissement.'],
 ['❤️','Les qualités d\'un bon enseignant','Patience, clarté, écoute et capacité à encourager chaque élève.'],
 ['📘','Se tenir à jour','Méthodes pédagogiques et outils numériques évoluent : un bon formateur continue d\'apprendre.'],
 ['🏫','Employeurs : précisez le public','Âge des élèves, matières, volume horaire : ces détails permettent de trouver la bonne personne.']
]);
S('ag-securite','Recruter dans la sécurité et le gardiennage','nuit',[
 ['🛡️','Protéger les personnes et les biens','Entreprises, résidences, commerces, événements : la sécurité rassure et prévient les problèmes.'],
 ['🔦','Les profils recherchés','Agents de sécurité, gardiens, rondiers, agents d\'accueil et de contrôle d\'accès.'],
 ['🧠','Les qualités essentielles','Vigilance, sang-froid, honnêteté, discrétion et respect des consignes.'],
 ['🤐','La confiance avant tout','On confie un site et ses clés à une personne fiable : le parcours est donc vérifié avec soin.'],
 ['🚨','Savoir réagir','Alerter, protéger, rester calme : former le personnel aux bons gestes est un vrai plus.']
]);
S('ag-industrie','Recruter dans l\'industrie et la maintenance','orange',[
 ['🏭','Fabriquer et réparer','Usines, ateliers, chaînes de production : l\'industrie transforme les matières en produits utiles.'],
 ['🔧','Les profils recherchés','Opérateurs de production, mécaniciens, soudeurs, électromécaniciens, techniciens de maintenance, conducteurs de ligne.'],
 ['⚙️','La maintenance, un métier clé','Une machine bien entretenue tombe moins en panne : les bons techniciens sont très recherchés.'],
 ['🦺','Sécurité et procédures','Respect strict des consignes, port des protections et travail en équipe protègent tout le monde.'],
 ['📐','Précision et rigueur','Lire un plan, mesurer, contrôler la qualité : ces compétences font la différence.']
]);
S('ag-domicile','Recruter dans les services à la personne','rose',[
 ['🏠','Un service de confiance','Ménage, garde d\'enfants, aide à domicile, jardinage, cuisine : ces métiers entrent dans l\'intimité des familles.'],
 ['🧹','Les profils recherchés','Aides ménagères, nounous, gardes de personnes âgées, jardiniers, cuisiniers à domicile, chauffeurs privés.'],
 ['🔍','Un recrutement soigné','Entretien approfondi, références et vérification du parcours : la confiance se construit dès le départ.'],
 ['📜','Un cadre clair','Missions, horaires, jours de repos et rémunération doivent être expliqués avant le début du travail.'],
 ['🌸','Respect mutuel','Un bon travail repose sur le respect, la politesse et une communication franche des deux côtés.']
]);
S('ag-admin','Recruter dans l\'administration et le secrétariat','bleu',[
 ['🗂️','Le cœur de l\'organisation','Courriers, rendez-vous, dossiers, accueil : une entreprise bien organisée a besoin d\'un bon secrétariat.'],
 ['🖥️','Les profils recherchés','Secrétaires, assistants de direction, standardistes, archivistes, agents d\'accueil, assistants administratifs.'],
 ['⌨️','Les outils à maîtriser','Traitement de texte, tableur, courriel professionnel, classement : à mentionner clairement dans le CV.'],
 ['📞','Soigner la communication','Une voix aimable au téléphone et des courriels clairs donnent une excellente image de l\'entreprise.'],
 ['🕒','Organisation et discrétion','Gérer son temps, prioriser les tâches et garder les informations confidentielles : des qualités clés.']
]);
S('ag-communication','Recruter dans la communication et le marketing','violet',[
 ['📣','Faire connaître et faire aimer','Affiches, réseaux sociaux, vidéos, événements : la communication donne de la visibilité aux entreprises.'],
 ['🎨','Les profils recherchés','Chargés de communication, graphistes, photographes, vidéastes, community managers, rédacteurs.'],
 ['📸','Le portfolio, votre meilleur CV','Montrez vos plus belles réalisations : affiches, photos, vidéos, pages de réseaux sociaux animées.'],
 ['✍️','Écrire juste','Un message clair, sans faute et adapté au public est une compétence très recherchée.'],
 ['📈','Mesurer les résultats','Savoir lire des statistiques et en tirer des idées est un grand atout.']
]);
S('ag-energie','Recruter dans l\'énergie, l\'eau et l\'environnement','vert',[
 ['⚡','Un secteur essentiel','Électricité, eau potable, énergie solaire, assainissement : ces services touchent la vie de chacun.'],
 ['☀️','Les profils recherchés','Électriciens, techniciens solaires, plombiers, agents d\'assainissement, techniciens de réseau, conducteurs de travaux.'],
 ['🔌','Des gestes précis','Respecter les normes de sécurité électrique et les procédures évite les accidents.'],
 ['🌍','Des métiers d\'avenir','Les énergies renouvelables et la gestion de l\'eau créent de nouveaux emplois chaque année.'],
 ['🎓','Se former aux nouvelles techniques','Une formation courte en énergie solaire peut ouvrir de belles opportunités.']
]);
S('ag-tourisme','Recruter dans le tourisme et l\'événementiel','orange',[
 ['🧳','Faire vivre de beaux moments','Voyages, séminaires, mariages, concerts : l\'événementiel et le tourisme rassemblent les gens.'],
 ['🎉','Les profils recherchés','Guides, agents de voyage, hôtesses, animateurs, organisateurs d\'événements, techniciens son et lumière.'],
 ['🗺️','La connaissance du terrain','Histoire, culture, sites à visiter : un bon guide transmet sa passion.'],
 ['📋','L\'organisation, clé du succès','Planning, budget, fournisseurs, imprévus : un événement réussi se prépare minutieusement.'],
 ['🌟','Le sens du service','Accueillir avec le sourire et résoudre les problèmes avec calme font la réputation d\'un professionnel.']
]);
S('ag-beaute','Recruter dans la beauté et le bien-être','rose',[
 ['💇','Prendre soin des autres','Coiffure, esthétique, maquillage, massage : un secteur où le talent et la confiance comptent beaucoup.'],
 ['💅','Les profils recherchés','Coiffeurs, coiffeuses, esthéticiennes, maquilleuses, barbiers, masseurs, réceptionnistes de salon.'],
 ['🧴','Hygiène irréprochable','Outils propres, mains lavées, produits de qualité : l\'hygiène protège les clients et votre réputation.'],
 ['📷','Montrez votre travail','Des photos avant-après et des avis de clients satisfaits convainquent facilement un employeur.'],
 ['🤗','L\'art de mettre à l\'aise','Écouter les envies du client et le conseiller honnêtement fidélise une clientèle.']
]);
S('ag-artisanat','Recruter dans l\'artisanat et les métiers manuels','terre',[
 ['🪡','Le savoir-faire des mains','Couture, menuiserie, mécanique, soudure, tapisserie : l\'artisanat crée de beaux objets utiles.'],
 ['🛠️','Les profils recherchés','Couturiers, menuisiers, mécaniciens, soudeurs, tapissiers, cordonniers, ébénistes, sérigraphes.'],
 ['🧵','La qualité d\'abord','Un travail soigné, des finitions propres et le respect des délais font la réputation d\'un artisan.'],
 ['👥','Transmettre le métier','Les artisans expérimentés forment souvent des apprentis : une bonne façon de se perfectionner.'],
 ['💼','Passer de l\'atelier à l\'entreprise','Votre savoir-faire est précieux : l\'agence vous aide à le présenter aux bons employeurs.']
]);
S('ag-cadres','Recruter des cadres et des responsables','or',[
 ['👔','Des postes à responsabilité','Directeurs, responsables RH, chefs de projet, managers : ces recrutements engagent l\'avenir de l\'entreprise.'],
 ['🔍','Une recherche approfondie','Analyse du poste, recherche ciblée, entretiens détaillés et vérification des références.'],
 ['🤫','Confidentialité garantie','Certains recrutements doivent rester discrets : l\'agence respecte la confidentialité des deux parties.'],
 ['🧩','Le bon profil, la bonne culture','Les compétences comptent, mais l\'adéquation avec les valeurs de l\'entreprise aussi.'],
 ['🤝','Un accompagnement sur mesure','Définition du poste, conseils sur l\'offre, suivi de l\'intégration : un partenariat complet.']
]);
S('ag-cv5','5 règles pour un bon CV','bleu',[
 ['📄','1. Rester clair et court','Une ou deux pages suffisent. Le recruteur lit vite : l\'essentiel doit apparaître immédiatement.'],
 ['🎯','2. Adapter à chaque offre','Mettez en avant les expériences et compétences qui correspondent au poste visé.'],
 ['📅','3. Du plus récent au plus ancien','Listez vos expériences et formations en commençant par la plus récente.'],
 ['✏️','4. Zéro faute','Relisez-vous, faites-vous relire : les fautes donnent une mauvaise image de sérieux.'],
 ['📞','5. Des coordonnées valides','Téléphone joignable et adresse e-mail sérieuse (prénom.nom) : sans contact, pas d\'entretien.']
]);
S('ag-entretien6','Réussir son entretien d\'embauche','vert',[
 ['🔎','1. Se renseigner','Avant l\'entretien, informez-vous sur l\'entreprise, ses activités et le poste proposé.'],
 ['👔','2. Soigner sa présentation','Une tenue propre et adaptée au métier montre votre sérieux et votre respect.'],
 ['⏰','3. Arriver en avance','Quelques minutes d\'avance vous permettent d\'être calme et de ne pas stresser.'],
 ['🗣️','4. Parler avec assurance','Écoutez bien les questions, répondez clairement, avec des exemples concrets de vos réussites.'],
 ['❓','5. Poser des questions','Interrogez l\'employeur sur les missions et l\'équipe : cela montre votre motivation.'],
 ['🙏','6. Remercier','Terminez en remerciant poliment. Un petit message de remerciement après l\'entretien est apprécié.']
]);
S('ag-lettre','Écrire une lettre de motivation efficace','orange',[
 ['✉️','À quoi sert-elle ?','Elle explique pourquoi vous voulez ce poste dans cette entreprise, ce que le CV ne dit pas.'],
 ['🏢','Parler de l\'entreprise','Montrez que vous la connaissez : ses produits, ses valeurs, ce qui vous attire chez elle.'],
 ['💪','Mettre vos atouts en avant','Choisissez deux ou trois qualités ou réussites en lien avec le poste, avec un exemple pour chacune.'],
 ['✍️','Style simple et poli','Phrases courtes, vocabulaire clair, formule de politesse adaptée : pas besoin d\'en faire trop.'],
 ['🔄','Une lettre par offre','Une lettre copiée-collée se remarque. Personnalisez toujours le nom de l\'entreprise et du poste.']
]);
S('ag-erreurs','5 erreurs à éviter sur un CV','rouge',[
 ['❌','Des fautes d\'orthographe','Un mot mal écrit peut faire écarter un bon candidat : relisez toujours à voix haute.'],
 ['❌','Un CV trop long','Dix pages découragent le lecteur. Gardez l\'essentiel et ce qui est utile pour le poste.'],
 ['❌','Mentir ou exagérer','Tout peut être vérifié. Un mensonge découvert fait perdre toute confiance.'],
 ['❌','Une adresse e-mail fantaisiste','Préférez prénom.nom à un pseudo amusant : le premier contact compte.'],
 ['❌','Oublier de se relire','Dates incohérentes, numéro erroné, nom de l\'entreprise inexact : vérifiez chaque détail avant d\'envoyer.']
]);
S('ag-veille','La veille de l\'entretien : la check-list','nuit',[
 ['📋','Relire l\'offre d\'emploi','Repérez les compétences demandées et préparez un exemple concret pour chacune.'],
 ['🧳','Préparer ses documents','CV imprimé, pièce d\'identité, diplômes et attestations utiles : mettez tout dans un dossier propre.'],
 ['🗺️','Vérifier le trajet','Lieu, durée du trajet, transport : prévoyez une marge pour les imprévus.'],
 ['👗','Préparer sa tenue','Choisissez la tenue la veille : propre, repassée, adaptée au poste.'],
 ['😴','Bien dormir','Un esprit reposé répond mieux aux questions : couchez-vous à une heure raisonnable.']
]);
S('ag-qualites','Les qualités humaines que les employeurs recherchent','violet',[
 ['⏰','La ponctualité','Arriver à l\'heure, c\'est respecter l\'équipe et le travail à faire.'],
 ['🤝','L\'esprit d\'équipe','Savoir collaborer, partager l\'information et aider un collègue en difficulté.'],
 ['🧠','L\'envie d\'apprendre','Ceux qui posent des questions et progressent rapidement sont très appréciés.'],
 ['🙏','La politesse','Un bonjour, un merci et un ton respectueux créent de bonnes relations avec tous.'],
 ['🛠️','Le sens des responsabilités','Assumer ses tâches, reconnaître ses erreurs et chercher des solutions inspirent confiance.'],
 ['💬','La communication','Dire clairement ce qu\'on comprend, ce qu\'on fait et ce dont on a besoin.']
]);
S('ag-salaire','Parler de salaire sereinement','or',[
 ['📊','Se renseigner avant','Comparez les rémunérations habituelles du métier et de la région pour avoir un repère réaliste.'],
 ['🧮','Connaître sa valeur','Faites la liste de vos compétences, de votre expérience et de ce que vous apportez.'],
 ['⏳','Choisir le bon moment','Laissez d\'abord l\'employeur découvrir vos atouts. Le salaire se discute en général plus tard.'],
 ['💬','Rester ouvert','Proposer une fourchette plutôt qu\'un chiffre unique permet de discuter sans se bloquer.'],
 ['📝','Tout confirmer par écrit','Salaire, horaires et avantages doivent être clairs dans le contrat avant de commencer.']
]);
S('ag-essai','Réussir sa période d\'essai','turquoise',[
 ['🌱','Un temps pour se découvrir','La période d\'essai permet à l\'employeur et à vous de vérifier que le poste convient.'],
 ['⏰','Soigner sa ponctualité','Arrivez à l\'heure, respectez les pauses et prévenez en cas d\'imprévu.'],
 ['👂','Écouter et observer','Les premiers jours, observez comment l\'équipe travaille et demandez des explications au besoin.'],
 ['📝','Prendre des notes','Noter les consignes évite de poser plusieurs fois la même question.'],
 ['🙋','Demander un retour','Au bout de quelques semaines, demandez poliment à votre responsable comment vous pouvez progresser.']
]);
S('ag-pourquoi','Pourquoi passer par une agence de recrutement ?','bleu',[
 ['⏱️','Un gain de temps','Passer des annonces, trier des dizaines de candidatures et mener les entretiens prend beaucoup de temps.'],
 ['🗃️','Un réseau de candidats','Une agence dispose d\'une base de profils déjà rencontrés et prêts à être proposés.'],
 ['✅','Une présélection sérieuse','Vous ne rencontrez que des candidats dont le profil correspond vraiment à votre besoin.'],
 ['🤫','La confidentialité','Vous pouvez recruter ou remplacer un poste sans l\'annoncer publiquement.'],
 ['🧭','Un accompagnement','Conseils sur le profil, l\'offre et l\'intégration du nouvel employé : vous n\'êtes pas seul.']
]);
S('ag-poste','Bien définir un profil de poste','terre',[
 ['📋','Pourquoi c\'est important','Un poste mal décrit attire de mauvais candidats et fait perdre du temps à tout le monde.'],
 ['🎯','Les missions principales','Listez clairement ce que la personne devra faire chaque jour et chaque semaine.'],
 ['🧰','Les compétences nécessaires','Distinguez ce qui est indispensable de ce qui est un plus, pour ne pas écarter de bons profils.'],
 ['📍','Les conditions de travail','Lieu, horaires, durée du contrat, rémunération : soyez transparent dès le début.'],
 ['🌟','La personnalité recherchée','Autonome, rigoureux, sociable ? Précisez les qualités humaines qui comptent pour l\'équipe.']
]);
S('ag-fideliser','Fidéliser ses employés','rose',[
 ['❤️','Pourquoi fidéliser ?','Garder un bon employé coûte moins cher et profite plus à l\'entreprise que d\'en recruter sans cesse.'],
 ['🗣️','Écouter','Des échanges réguliers permettent de comprendre les besoins et de régler les problèmes tôt.'],
 ['💰','Rémunérer équitablement','Un salaire juste et payé à temps est la base de la confiance.'],
 ['📈','Offrir des perspectives','Formations, responsabilités nouvelles, évolution possible : chacun veut progresser.'],
 ['👏','Reconnaître le travail','Un merci sincère et des encouragements motivent plus qu\'on ne le croit.']
]);
S('ag-integration','Bien accueillir un nouvel employé','vert',[
 ['👋','Le premier jour compte','Présentez l\'équipe, les locaux et les règles de fonctionnement dès l\'arrivée.'],
 ['🧑‍🤝‍🧑','Désigner un référent','Une personne de confiance répond aux questions et accompagne les premières semaines.'],
 ['📘','Expliquer les missions','Objectifs, outils, consignes de sécurité : tout doit être clair dès le début.'],
 ['📅','Prévoir des points réguliers','Un court échange chaque semaine permet d\'ajuster et de rassurer le nouveau venu.'],
 ['🎉','Créer un climat positif','Un bon accueil donne envie de bien travailler et de rester longtemps.']
]);
S('ag-courage','Chercher un emploi sans se décourager','orange',[
 ['🌅','Chaque jour est une chance','Chercher un emploi est un vrai travail : organisez votre journée et gardez un rythme.'],
 ['📝','Fixer de petits objectifs','Envoyer trois candidatures par jour, appeler un contact, mettre à jour son CV : avancez pas à pas.'],
 ['🔁','Apprendre des refus','Un refus n\'est pas un échec personnel. Demandez un retour si possible et ajustez votre approche.'],
 ['🤝','Ne pas rester isolé','Parlez de votre recherche à vos proches, anciens collègues et amis : une piste peut venir de là.'],
 ['💪','Prendre soin de soi','Dormir, bouger, manger correctement : votre énergie se voit pendant les entretiens.']
]);
S('ag-reconversion','Se reconvertir professionnellement','violet',[
 ['🔄','Changer de métier, c\'est possible','Beaucoup de personnes changent de voie après quelques années, par choix ou par nécessité.'],
 ['🧩','Repérer ses compétences transférables','Organisation, relation client, rigueur, gestion d\'équipe : elles servent dans presque tous les secteurs.'],
 ['🔎','Explorer le nouveau métier','Rencontrez des professionnels, faites un stage d\'observation, informez-vous sur les débouchés.'],
 ['📚','Se former','Une formation courte ou une certification peut suffire pour entrer dans un nouveau domaine.'],
 ['🚀','Oser et persévérer','Les débuts demandent de la patience, mais une reconversion réussie redonne de l\'énergie.']
]);
S('ag-premier','Premier emploi : conseils aux jeunes diplômés','turquoise',[
 ['🎓','Valoriser sa formation','Stages, projets, travaux de groupe, bénévolat : tout ce qui montre vos compétences compte.'],
 ['🌱','Accepter de commencer petit','Un premier poste, même modeste, donne de l\'expérience et ouvre des portes.'],
 ['📣','Utiliser son réseau','Anciens professeurs, maîtres de stage, camarades : parlez de votre recherche autour de vous.'],
 ['🧾','Préparer des documents propres','Un CV simple, une lettre personnalisée et une adresse e-mail sérieuse font bonne impression.'],
 ['🧠','Montrer sa motivation','Les employeurs recrutent volontiers un jeune qui veut apprendre et s\'investit.']
]);
S('ag-reseau','Développer son réseau professionnel','nuit',[
 ['🌐','Pourquoi un réseau ?','Beaucoup d\'emplois se trouvent par recommandation : plus on connaît de personnes, plus on a d\'opportunités.'],
 ['☕','Rencontrer des gens','Salons, formations, associations, événements : allez à la rencontre des professionnels de votre domaine.'],
 ['💼','Soigner son profil en ligne','Un profil professionnel complet, avec photo sérieuse et description claire, vous rend visible.'],
 ['🙏','Donner avant de demander','Partagez une information utile, félicitez un contact : un réseau se construit sur la réciprocité.'],
 ['📆','Entretenir ses contacts','Un petit message de temps en temps garde le lien vivant.']
]);
S('ag-formation','Se former pendant qu\'on cherche un emploi','bleu',[
 ['📚','Transformer l\'attente en progrès','Pendant la recherche, chaque nouvelle compétence augmente vos chances.'],
 ['💻','Des cours gratuits en ligne','De nombreuses plateformes proposent des cours gratuits en bureautique, langues, gestion et informatique.'],
 ['🗣️','Pratiquer une langue','L\'anglais est demandé dans de nombreux secteurs : quelques minutes par jour suffisent pour progresser.'],
 ['🤲','Faire du bénévolat','Aider une association permet de rester actif et d\'acquérir de l\'expérience concrète.'],
 ['📜','Garder une trace','Notez vos formations et attestations : elles enrichiront votre CV.']
]);
S('ag-visio','Passer un entretien par téléphone ou en visio','or',[
 ['📱','Un vrai entretien','Même à distance, l\'entretien compte autant qu\'une rencontre en personne.'],
 ['🔌','Tester sa technique','Batterie chargée, connexion stable, micro et caméra vérifiés : faites un essai avant l\'heure.'],
 ['🤫','Choisir un lieu calme','Un endroit silencieux, bien éclairé, sans interruption, permet d\'être concentré.'],
 ['👔','Soigner sa présentation','Habillez-vous comme pour une rencontre en face à face : cela aide à se mettre dans l\'ambiance.'],
 ['🙂','Sourire et parler clairement','Votre voix et votre sourire transmettent votre motivation, même à travers l\'écran.']
]);
S('ag-offre','Comprendre une offre d\'emploi','terre',[
 ['🔍','Lire l\'offre en entier','Titre du poste, missions, profil recherché, conditions : chaque partie contient des indices.'],
 ['✅','Repérer l\'essentiel','Séparez les compétences indispensables des qualités souhaitées. Vous n\'avez pas besoin de tout cocher pour postuler.'],
 ['🗂️','Comprendre le contrat proposé','CDI, CDD, intérim, stage : sachez quel type de contrat est proposé et pour quelle durée.'],
 ['🧐','Se méfier des offres douteuses','Une offre qui demande de l\'argent avant l\'embauche est une arnaque : fuyez.'],
 ['📨','Répondre selon la consigne','Envoyez exactement les documents demandés, à la bonne adresse et avant la date limite.']
]);
S('ag-interim','Les missions temporaires : un tremplin','rouge',[
 ['⏳','Qu\'est-ce qu\'une mission temporaire ?','Un travail pour une durée limitée : remplacement, surcroît d\'activité, saison ou projet particulier.'],
 ['🚪','Une porte d\'entrée','Elle permet de découvrir une entreprise et de se faire connaître sans attendre un poste à long terme.'],
 ['🧰','Un moyen d\'acquérir de l\'expérience','Plusieurs missions variées enrichissent le CV et montrent votre capacité d\'adaptation.'],
 ['📈','Parfois un début de carrière','Un employeur satisfait peut proposer un contrat plus long à une personne qui a fait ses preuves.'],
 ['📄','Bien lire les conditions','Durée, horaires, rémunération et lieu doivent être clairs avant de s\'engager.']
]);
})();

/* ==========================================================
   DIAPORAMAS « SAVOIRS 2 » (48) — Santé, Argent, Numérique, Nature, Langues,
   Développement personnel, Divertissement
   Chaque ligne : S(identifiant, titre, catégorie, palette, [[emoji, titre, texte], …])
   ========================================================== */
(function(){
if(!window.SCCS) return;
const S = SCCS.add;

/* ------------------------------------------------------------ SANTÉ & BIEN-ÊTRE */
S('sa-eau','Boire de l\'eau : pourquoi c\'est vital','Santé','turquoise',[
 ['💧','Le corps est fait d\'eau','Environ 60 % du corps d\'un adulte est de l\'eau : elle est présente dans toutes nos cellules.'],
 ['🌡️','Elle règle la température','En transpirant, le corps se rafraîchit : il faut ensuite remplacer l\'eau perdue.'],
 ['⚠️','Les signes de manque d\'eau','Soif, bouche sèche, urine foncée, fatigue ou maux de tête peuvent indiquer qu\'on ne boit pas assez.'],
 ['🥤','Boire régulièrement','Boire un peu tout au long de la journée, et davantage quand il fait chaud ou après un effort.'],
 ['🚰','Une eau propre','Boire une eau potable, filtrée ou bouillie protège des maladies liées à l\'eau souillée.']
]);
S('sa-sommeil','Bien dormir : 5 conseils','Santé','nuit',[
 ['🕘','1. Des horaires réguliers','Se coucher et se lever à peu près aux mêmes heures aide le corps à trouver son rythme.'],
 ['🌙','2. Une chambre calme','Un endroit sombre, aéré et silencieux favorise un sommeil de qualité.'],
 ['📵','3. Moins d\'écran le soir','La lumière des écrans et les messages retardent l\'endormissement : posez le téléphone avant de dormir.'],
 ['☕','4. Attention aux excitants','Le café, le thé fort et les repas très lourds en fin de journée peuvent gêner le sommeil.'],
 ['🏃','5. Bouger dans la journée','Une activité physique régulière aide à mieux dormir la nuit.']
]);
S('sa-manger','Manger équilibré','Santé','vert',[
 ['🥗','La variété avant tout','Aucun aliment ne contient tout ce dont le corps a besoin : il faut varier les repas.'],
 ['🍎','Des fruits et légumes','Ils apportent vitamines, minéraux et fibres : à chaque repas si possible.'],
 ['🍠','Des féculents','Riz, igname, manioc, mil, maïs, pain : ils donnent l\'énergie nécessaire pour la journée.'],
 ['🐟','Des protéines','Poisson, œufs, viande, haricots, lentilles, arachides : elles aident à construire et réparer le corps.'],
 ['🧂','Limiter le trop','Moins de sucre, de sel et de fritures, c\'est mieux pour le cœur et la santé.']
]);
S('sa-mains','Se laver les mains : les bons gestes','Santé','bleu',[
 ['🕒','Quand se laver les mains ?','Avant de manger ou de cuisiner, après les toilettes, après avoir toussé, éternué ou touché des déchets.'],
 ['🧼','De l\'eau et du savon','Mouillez, savonnez bien : le savon aide à décoller les microbes.'],
 ['🖐️','Frotter partout','Paumes, dos des mains, entre les doigts, ongles et poignets : ne rien oublier.'],
 ['⏱️','Pendant 20 secondes','C\'est à peu près la durée d\'une chanson fredonnée deux fois.'],
 ['🧻','Rincer et sécher','Rincez à l\'eau propre et séchez avec un linge propre ou à l\'air libre.']
]);
S('sa-bouger','Bouger au quotidien','Santé','orange',[
 ['🚶','Marcher plus','Marcher d\'un bon pas, monter les escaliers, descendre un arrêt plus tôt : chaque pas compte.'],
 ['⏰','Combien de temps ?','Pour un adulte, l\'Organisation mondiale de la santé recommande au moins 150 minutes d\'activité modérée par semaine.'],
 ['💃','Choisir ce qui plaît','Danse, football, vélo, course, jeux : on bouge plus longtemps quand on s\'amuse.'],
 ['❤️','Bon pour le cœur','L\'activité physique régulière renforce le cœur, les os et les muscles.'],
 ['😊','Bon pour le moral','Bouger aide à mieux dormir et à se sentir moins stressé.']
]);
S('sa-stress','Gérer son stress : 5 techniques simples','Santé','violet',[
 ['🌬️','1. Respirer lentement','Inspirez par le nez, expirez doucement par la bouche : répétez cinq fois pour calmer le corps.'],
 ['🚶‍♂️','2. Marcher un peu','Quelques minutes de marche dehors aident à faire redescendre la tension.'],
 ['🗣️','3. En parler','Partager ce qui nous préoccupe avec un proche de confiance allège souvent le poids.'],
 ['📝','4. Faire une liste','Écrire ce qu\'il y a à faire et choisir une seule priorité rend les choses moins écrasantes.'],
 ['🩺','5. Demander de l\'aide','Si le stress dure et empêche de vivre normalement, parlez-en à un professionnel de santé.']
]);
S('sa-soleil','Protéger sa peau du soleil','Santé','or',[
 ['☀️','Le soleil, ami et ennemi','Il apporte la vitamine D, mais trop d\'exposition abîme la peau.'],
 ['🧢','Se couvrir','Chapeau, lunettes de soleil et vêtements légers qui couvrent les bras et les jambes.'],
 ['🌳','Chercher l\'ombre','Évitez de rester au soleil aux heures les plus chaudes, surtout en milieu de journée.'],
 ['🧴','De la crème solaire','Appliquez-en régulièrement, surtout si vous avez la peau claire ou si vous restez dehors longtemps.'],
 ['💧','Boire beaucoup','En plein soleil, le corps perd de l\'eau plus vite : buvez régulièrement.']
]);
S('sa-palu','Prévenir le paludisme','Santé','rouge',[
 ['🦟','Une piqûre de moustique','Le paludisme est transmis par la piqûre de certains moustiques, les anophèles.'],
 ['🛏️','Dormir sous moustiquaire','Une moustiquaire imprégnée, bien installée, protège pendant la nuit.'],
 ['🪣','Supprimer l\'eau stagnante','Les moustiques pondent dans l\'eau : videz seaux, pneus, pots et récipients qui traînent.'],
 ['🌡️','Fièvre : consulter vite','En cas de fièvre, rendez-vous rapidement dans un centre de santé : ne pas attendre ni se soigner seul.'],
 ['🤱','Protéger les plus fragiles','Les jeunes enfants et les femmes enceintes sont plus exposés aux formes graves.']
]);

/* ------------------------------------------------------------ ARGENT & ENTREPRENEURIAT */
S('ar-epargne','Épargner : par où commencer ?','Argent','or',[
 ['🐷','Pourquoi épargner ?','Mettre de l\'argent de côté permet de faire face à un imprévu ou de réaliser un projet.'],
 ['🎯','Fixer un objectif','Un téléphone, du matériel de travail, un loyer d\'avance : un but précis donne du courage.'],
 ['🔢','Commencer petit','Même une petite somme mise de côté régulièrement finit par grandir.'],
 ['🏦','Choisir un endroit sûr','Compte d\'épargne, coopérative ou groupe d\'épargne fiable : évitez de garder tout l\'argent sur soi.'],
 ['⚠️','Se méfier des promesses faciles','Un placement qui promet de multiplier l\'argent très vite cache souvent une arnaque.']
]);
S('ar-budget','Faire un budget en 4 étapes','Argent','vert',[
 ['💰','1. Noter ses revenus','Salaire, ventes, aides : listez tout ce qui rentre chaque mois.'],
 ['🧾','2. Noter ses dépenses','Loyer, nourriture, transport, communication, santé, loisirs : écrivez tout, même les petites sommes.'],
 ['⚖️','3. Comparer','Si les dépenses dépassent les revenus, il faut réduire certaines dépenses ou augmenter les revenus.'],
 ['🐷','4. Prévoir l\'épargne','Mettez d\'abord un petit montant de côté, puis dépensez ce qui reste intelligemment.']
]);
S('ar-momo','Éviter les arnaques au mobile money','Argent','rouge',[
 ['🔐','Le code secret reste secret','Ne donnez jamais votre code PIN : ni à un ami, ni à un agent, ni à une personne qui vous appelle.'],
 ['📞','Méfiance aux faux appels','Un faux agent vous appelle pour « débloquer votre compte » : raccrochez et contactez vous-même le service officiel.'],
 ['🎁','Les fausses promesses de gains','Un message qui annonce un gain et demande des frais pour le recevoir est une arnaque.'],
 ['🔎','Vérifier avant d\'envoyer','Contrôlez le numéro et le nom du bénéficiaire avant de valider un transfert.'],
 ['🧾','Garder les preuves','Conservez les messages de confirmation de vos opérations : ils servent en cas de problème.']
]);
S('ar-commerce','Créer son petit commerce en 5 étapes','Argent','orange',[
 ['💡','1. Trouver une bonne idée','Quel besoin autour de vous n\'est pas encore bien satisfait ? Commencez par observer.'],
 ['👥','2. Connaître ses clients','Qui va acheter ? Combien peuvent-ils payer ? Où les trouver ?'],
 ['🧮','3. Calculer ses coûts','Achat des produits, transport, local, emballage : notez toutes les dépenses pour fixer un prix juste.'],
 ['🛒','4. Commencer petit','Testez avec un petit stock avant d\'investir plus. Corrigez ce qui ne marche pas.'],
 ['📒','5. Tenir ses comptes','Notez chaque vente et chaque dépense dans un cahier : c\'est la clé pour savoir si on gagne de l\'argent.']
]);
S('ar-benefice','Comprendre le bénéfice','Argent','bleu',[
 ['🛍️','Chiffre d\'affaires','C\'est le total de l\'argent encaissé grâce aux ventes.'],
 ['🧾','Les coûts','Prix d\'achat des produits, transport, loyer, électricité, salaires : tout ce qu\'on dépense pour vendre.'],
 ['➖','Le bénéfice','Bénéfice = ventes moins coûts. C\'est ce qui reste réellement dans votre poche.'],
 ['🔢','Un exemple simple','J\'achète un article 800 FCFA et je le vends 1 000 FCFA : mon bénéfice est de 200 FCFA par article.'],
 ['⚠️','Ne pas tout dépenser','Gardez une partie du bénéfice pour renouveler le stock et faire grandir l\'activité.']
]);
S('ar-habitudes','Les habitudes des entrepreneurs qui réussissent','Argent','violet',[
 ['📒','Ils notent tout','Ventes, dépenses, stock : ils savent où va l\'argent.'],
 ['👂','Ils écoutent leurs clients','Leurs retours permettent d\'améliorer le produit ou le service.'],
 ['🔁','Ils persévèrent','Ils apprennent de leurs échecs et recommencent, mieux préparés.'],
 ['🤝','Ils respectent leurs engagements','Livrer à l\'heure, tenir ses promesses et payer ses fournisseurs construit la confiance.'],
 ['📚','Ils continuent d\'apprendre','Formations, lectures, conseils d\'autres entrepreneurs : le savoir donne de l\'avance.']
]);
S('ar-temps','Bien gérer son temps','Argent','nuit',[
 ['📋','Faire une liste','Écrire ce qu\'il y a à faire libère l\'esprit et évite d\'oublier.'],
 ['🔥','Distinguer urgent et important','L\'urgent presse maintenant, l\'important compte pour l\'avenir : ne confondez pas les deux.'],
 ['🧩','Découper les gros projets','Un grand objectif devient facile quand on le divise en petites étapes.'],
 ['📵','Limiter les distractions','Mettre le téléphone de côté pendant le travail augmente beaucoup la concentration.'],
 ['😌','Prévoir des pauses','Un cerveau reposé travaille mieux : faites de courtes pauses régulières.']
]);
S('ar-emprunt','Emprunter avec prudence','Argent','terre',[
 ['🤝','Emprunter, c\'est s\'engager','Une somme empruntée doit toujours être remboursée, souvent avec des intérêts.'],
 ['🎯','Pour quoi emprunter ?','Mieux vaut emprunter pour un projet qui rapportera de l\'argent que pour une dépense passagère.'],
 ['🧮','Calculer sa capacité','Vérifiez que vous pourrez rembourser chaque mois sans vous mettre en difficulté.'],
 ['📜','Lire le contrat','Montant, durée, intérêts, frais : tout doit être clair avant de signer.'],
 ['🚫','Se méfier des offres miracles','Des prêts très faciles avec des conditions floues peuvent cacher des pièges.']
]);

/* ------------------------------------------------------------ NUMÉRIQUE & IA */
S('nu-ia','L\'intelligence artificielle expliquée simplement','Numérique','nuit',[
 ['🤖','Qu\'est-ce que l\'IA ?','Un programme informatique capable de réaliser des tâches qui demandent habituellement de l\'intelligence humaine.'],
 ['📚','Elle apprend par l\'exemple','On lui montre un très grand nombre d\'exemples, et elle repère des régularités.'],
 ['🖼️','Ce qu\'elle sait faire','Reconnaître des images, comprendre et produire du texte, traduire, recommander des vidéos.'],
 ['⚠️','Elle peut se tromper','Une réponse de l\'IA n\'est pas toujours exacte : il faut vérifier les informations importantes.'],
 ['🔒','Protéger ses données','Ne partagez jamais vos mots de passe, codes ou documents d\'identité avec un outil en ligne.']
]);
S('nu-mdp','Des mots de passe solides','Numérique','bleu',[
 ['🔑','Pourquoi c\'est important','Un mot de passe faible, c\'est comme une porte fermée par une simple ficelle.'],
 ['📏','Long et varié','Au moins 12 caractères avec lettres, chiffres et symboles : plus c\'est long, plus c\'est solide.'],
 ['🚫','Éviter l\'évident','Pas de 123456, ni votre prénom, ni votre date de naissance.'],
 ['🔁','Un mot de passe par compte','Si un site est piraté, les autres comptes restent protégés.'],
 ['✅','La double vérification','Activez-la dès que c\'est possible : un code supplémentaire protège encore mieux.']
]);
S('nu-fake','Reconnaître une fausse information','Numérique','rouge',[
 ['📰','Les fausses nouvelles existent','Elles se diffusent vite, surtout quand elles choquent ou font peur.'],
 ['🔎','Chercher la source','Qui a publié cette information ? Un média connu ou un compte anonyme ?'],
 ['🧐','Comparer','Cherchez la même information sur d\'autres sites fiables avant de la croire.'],
 ['😠','Se méfier des émotions fortes','Un message qui vous met en colère ou vous pousse à partager vite doit éveiller le doute.'],
 ['⏸️','Réfléchir avant de partager','Partager une fausse information peut faire du mal, même sans le vouloir.']
]);
S('nu-internet','Comment fonctionne Internet ?','Numérique','turquoise',[
 ['🌐','Un réseau mondial','Internet relie des millions d\'ordinateurs et d\'appareils dans le monde entier.'],
 ['🌊','Des câbles sous la mer','La plus grande partie du trafic international passe par des câbles posés au fond des océans.'],
 ['🖥️','Des serveurs','Les sites web et les applications sont stockés sur de puissants ordinateurs appelés serveurs.'],
 ['📍','Des adresses','Chaque site a une adresse. Votre navigateur la demande et affiche la page.'],
 ['📶','Wi-Fi et réseau mobile','Ils servent à connecter votre téléphone au réseau, sans fil.']
]);
S('nu-batterie','5 astuces pour économiser la batterie','Numérique','orange',[
 ['🔆','1. Baisser la luminosité','L\'écran est l\'un des plus gros consommateurs d\'énergie.'],
 ['📴','2. Fermer les applications inutiles','Celles qui tournent en arrière-plan vident la batterie.'],
 ['🔕','3. Couper les notifications inutiles','Moins de notifications, moins d\'écran allumé.'],
 ['📡','4. Couper le Wi-Fi ou le Bluetooth','Désactivez-les quand vous ne vous en servez pas.'],
 ['🔋','5. Recharger intelligemment','Évitez de laisser descendre la batterie à zéro très souvent et utilisez un chargeur de qualité.']
]);
S('nu-metiers','Les métiers du numérique','Numérique','violet',[
 ['💻','Développeur','Il écrit les programmes et les applications que nous utilisons chaque jour.'],
 ['🎨','Designer','Il imagine les écrans, les logos et les interfaces pour qu\'ils soient beaux et faciles à utiliser.'],
 ['🛡️','Spécialiste en cybersécurité','Il protège les systèmes et les données contre les attaques et les arnaques.'],
 ['📊','Analyste de données','Il lit les chiffres pour aider les entreprises à prendre de bonnes décisions.'],
 ['🧰','Technicien support','Il dépanne les utilisateurs et répare ordinateurs, réseaux et téléphones.']
]);

/* ------------------------------------------------------------ NATURE & ENVIRONNEMENT */
S('na-forets','Les forêts d\'Afrique','Nature','vert',[
 ['🌳','Un trésor naturel','Les forêts abritent des animaux, des plantes, des remèdes et offrent du bois et des fruits.'],
 ['🌍','La forêt du bassin du Congo','C\'est la deuxième plus grande forêt tropicale du monde, après l\'Amazonie.'],
 ['🦍','Un refuge pour la faune','Gorilles, chimpanzés, éléphants de forêt et d\'innombrables oiseaux y vivent.'],
 ['🪓','Des menaces','Exploitation excessive, feux et défrichement détruisent chaque année de grandes surfaces de forêt.'],
 ['🌱','Les protéger et replanter','Reboiser, utiliser le bois avec modération et respecter les aires protégées sont des gestes utiles.']
]);
S('na-recycler','Recycler : les bons gestes','Nature','turquoise',[
 ['♻️','Réduire d\'abord','Le meilleur déchet est celui qu\'on ne produit pas : refuser les sacs inutiles, réparer, réutiliser.'],
 ['📰','Le papier et le carton','Ils peuvent être collectés et recyclés pour fabriquer de nouveaux produits.'],
 ['🍾','Le verre','Bouteilles et bocaux peuvent être réutilisés ou recyclés de nombreuses fois.'],
 ['🧴','Le plastique','Il met très longtemps à disparaître : mieux vaut le collecter plutôt que l\'abandonner dans la nature.'],
 ['🍌','Les déchets organiques','Épluchures et restes de végétaux peuvent devenir du compost pour nourrir le jardin.']
]);
S('na-eau','Économiser l\'eau','Nature','bleu',[
 ['🚰','Une ressource précieuse','L\'eau douce utilisable ne représente qu\'une toute petite partie de l\'eau de la planète.'],
 ['🪥','Fermer le robinet','Pendant le brossage des dents ou le savonnage, un robinet ouvert gaspille beaucoup d\'eau.'],
 ['🔧','Réparer les fuites','Un robinet qui goutte peut perdre des centaines de litres par mois.'],
 ['🪣','Récupérer l\'eau de pluie','Elle sert à arroser les plantes ou à nettoyer, sans puiser dans les réserves potables.'],
 ['🌱','Arroser au bon moment','Tôt le matin ou le soir, l\'eau s\'évapore moins vite.']
]);
S('na-energies','Les énergies renouvelables','Nature','or',[
 ['☀️','L\'énergie solaire','Les panneaux transforment la lumière du soleil en électricité. L\'Afrique est très ensoleillée.'],
 ['🌬️','L\'énergie éolienne','Le vent fait tourner de grandes pales qui produisent du courant.'],
 ['💧','L\'énergie hydraulique','Les barrages utilisent la force de l\'eau pour produire de l\'électricité.'],
 ['🌋','La géothermie','La chaleur du sous-sol peut chauffer des bâtiments ou produire de l\'électricité.'],
 ['🌍','Pourquoi les choisir ?','Elles se renouvellent naturellement et polluent beaucoup moins que le charbon ou le pétrole.']
]);
S('na-abeilles','Les abeilles, petites héroïnes','Nature','orange',[
 ['🐝','Des travailleuses infatigables','Dans une ruche, des milliers d\'abeilles se partagent les tâches : récolter, nettoyer, protéger, nourrir.'],
 ['🌸','La pollinisation','En allant de fleur en fleur, elles transportent le pollen et permettent aux fruits et aux graines de se former.'],
 ['🍯','Le miel','Elles transforment le nectar des fleurs en miel pour nourrir la ruche.'],
 ['👑','Une reine par ruche','La reine pond les œufs : sans elle, la colonie ne peut pas se renouveler.'],
 ['⚠️','Des abeilles menacées','Pesticides, perte des fleurs et maladies les fragilisent. Planter des fleurs les aide.']
]);
S('na-animaux','5 records des animaux d\'Afrique','Nature','terre',[
 ['🐘','Le plus grand animal terrestre','L\'éléphant d\'Afrique peut peser plusieurs tonnes.'],
 ['🐆','Le plus rapide','Le guépard peut atteindre environ 100 kilomètres à l\'heure en quelques secondes.'],
 ['🦒','Le plus haut','La girafe peut mesurer près de 5 mètres de haut.'],
 ['🦤','Le plus grand oiseau','L\'autruche ne vole pas, mais elle peut courir à environ 70 kilomètres à l\'heure.'],
 ['🦛','Le roi des rivières','L\'hippopotame passe ses journées dans l\'eau et sort pour brouter la nuit.']
]);
S('na-baobab','Le baobab, arbre de vie','Nature','terre',[
 ['🌳','Un géant de la savane','Son tronc énorme et ses branches qui ressemblent à des racines en font un arbre inoubliable.'],
 ['💧','Un réservoir naturel','Son tronc peut stocker de grandes quantités d\'eau pour survivre à la saison sèche.'],
 ['⏳','Une vie très longue','Certains baobabs vivent plusieurs siècles.'],
 ['🍈','Un fruit nourrissant','Le fruit du baobab, appelé pain de singe, est riche en vitamine C.'],
 ['🏘️','L\'arbre de la communauté','Sous son ombre, on se retrouve, on discute et on raconte des histoires.']
]);

/* ------------------------------------------------------------ LANGUES & MOTS */
S('la-francais','5 pièges du français à éviter','Langues','rose',[
 ['✍️','a ou à ?','« Il a un livre » : on peut dire « il avait ». « Je vais à l\'école » : on ne peut pas.'],
 ['✍️','et ou est ?','« Il est fatigué » : on peut dire « il était ». « Marie et Paul » : « et » relie deux mots.'],
 ['✍️','on ou ont ?','« On mange » : on peut dire « nous mangeons ». « Ils ont faim » : on peut dire « ils avaient ».'],
 ['✍️','son ou sont ?','« Son chat » : le chat de lui. « Ils sont contents » : on peut dire « ils étaient ».'],
 ['✍️','ce ou se ?','« Ce livre » : on montre. « Il se lave » : le verbe se laver.']
]);
S('la-proverbes','Proverbes africains et leur sagesse','Langues','or',[
 ['🤝','Seul on va plus vite, ensemble on va plus loin','Le travail d\'équipe permet d\'aller plus loin que l\'effort individuel.'],
 ['👨‍👩‍👧','Il faut tout un village pour élever un enfant','L\'éducation est l\'affaire de toute la communauté.'],
 ['🐘','Quand les éléphants se battent, c\'est l\'herbe qui souffre','Les conflits des puissants font souffrir les plus faibles.'],
 ['🔨','C\'est en forgeant qu\'on devient forgeron','C\'est en pratiquant régulièrement qu\'on progresse.'],
 ['🐦','Petit à petit, l\'oiseau fait son nid','Avec de la patience, on réussit même les grands projets.']
]);
S('la-anglais','Apprendre l\'anglais : 5 conseils','Langues','bleu',[
 ['⏱️','1. Un peu chaque jour','Quinze minutes par jour valent mieux qu\'une longue séance par semaine.'],
 ['🎧','2. Écouter beaucoup','Chansons, films, vidéos et radios en anglais habituent l\'oreille.'],
 ['🗣️','3. Parler sans peur','On progresse en essayant, même avec des erreurs. Personne ne parle parfaitement dès le début.'],
 ['📓','4. Noter les mots utiles','Gardez un petit carnet de vocabulaire pour votre métier et votre vie quotidienne.'],
 ['🤝','5. Trouver un partenaire','Un ami avec qui pratiquer rend l\'apprentissage plus motivant.']
]);
S('la-bonjour','Dire bonjour dans le monde','Langues','violet',[
 ['🇫🇷','Bonjour','En français, on dit « bonjour » le jour et « bonsoir » le soir.'],
 ['🇬🇧','Hello','En anglais, c\'est « hello ». « Good morning » veut dire « bonjour » le matin.'],
 ['🇪🇸','Hola','En espagnol, on dit « hola » : simple et chaleureux.'],
 ['🇰🇪','Jambo','En swahili, on peut dire « jambo » ou « habari » pour saluer.'],
 ['🇯🇵','Konnichiwa','En japonais, « konnichiwa » veut dire « bonjour » dans la journée.'],
 ['🇩🇪','Guten Tag','En allemand, « guten Tag » signifie « bonne journée ».']
]);
S('la-oral','Parler en public sans trembler','Langues','rouge',[
 ['😮‍💨','Le trac est normal','Presque tout le monde est stressé avant de parler en public, même les orateurs expérimentés.'],
 ['📝','Préparer l\'essentiel','Trois idées principales suffisent : un début clair, un milieu simple, une conclusion forte.'],
 ['🗣️','S\'entraîner à voix haute','Répétez devant un miroir ou un ami : votre voix sera plus assurée le jour J.'],
 ['👀','Regarder le public','Fixez quelques personnes bienveillantes à tour de rôle : cela crée du contact.'],
 ['🌬️','Respirer et ralentir','Parler plus lentement et marquer des pauses donne de l\'assurance et aide à se faire comprendre.']
]);

/* ------------------------------------------------------------ DÉVELOPPEMENT PERSONNEL */
S('dp-smart','Se fixer des objectifs SMART','Motivation','vert',[
 ['🎯','Pourquoi se fixer des objectifs ?','Un objectif clair donne une direction et de l\'énergie pour avancer.'],
 ['🔍','S comme Spécifique','« Je veux apprendre à écrire un CV » est plus précis que « je veux m\'améliorer ».'],
 ['📏','M comme Mesurable','Comment saurez-vous que c\'est réussi ? Un chiffre ou un résultat visible aide.'],
 ['⛰️','A et R : Atteignable et Réaliste','Un objectif ambitieux mais possible, compte tenu de votre temps et de vos moyens.'],
 ['🗓️','T comme Temporel','Fixez une date limite : sans date, le projet reste un souhait.']
]);
S('dp-confiance','Gagner en confiance en soi','Motivation','orange',[
 ['🌟','La confiance se construit','Personne n\'en possède naturellement beaucoup : elle grandit avec les petites réussites.'],
 ['📝','Noter ses réussites','Écrivez chaque jour une chose bien faite : le cerveau retient mieux le positif.'],
 ['🚶','Oser un petit pas','Faites régulièrement quelque chose qui vous met légèrement mal à l\'aise : la peur diminue.'],
 ['🤗','Se parler gentiment','Ne dites pas à vous-même ce que vous ne diriez pas à un ami.'],
 ['🧍','Soigner sa posture','Se tenir droit, respirer calmement et sourire aident à se sentir plus fort.']
]);
S('dp-apprendre','Apprendre à apprendre','Motivation','nuit',[
 ['🧠','Le cerveau est un muscle','Plus on l\'entraîne, plus il apprend facilement.'],
 ['🔁','Répéter à intervalles','Revoir une notion le lendemain, puis une semaine après, la grave durablement dans la mémoire.'],
 ['🗣️','Expliquer à quelqu\'un','Pour vérifier qu\'on a compris, il suffit de l\'expliquer simplement à un ami.'],
 ['✍️','Prendre des notes','Écrire avec ses propres mots aide à comprendre et à retenir.'],
 ['😴','Dormir pour retenir','Le sommeil joue un rôle important dans la mémorisation.']
]);
S('dp-erreurs','Faire de ses erreurs une force','Motivation','terre',[
 ['❗','Se tromper est humain','Toute personne qui apprend ou entreprend fait des erreurs.'],
 ['🔍','Comprendre ce qui s\'est passé','Posez-vous la question : qu\'est-ce qui a mal fonctionné et pourquoi ?'],
 ['🛠️','Corriger et recommencer','Une erreur analysée devient une leçon précieuse pour la prochaine fois.'],
 ['🙏','Assumer','Reconnaître une erreur avec honnêteté inspire le respect et la confiance.'],
 ['🌱','Grandir','Ceux qui réussissent le mieux sont souvent ceux qui ont le plus essayé et appris de leurs échecs.']
]);
S('dp-matin','Les bonnes habitudes du matin','Motivation','or',[
 ['⏰','Se lever à heure fixe','Un réveil régulier met le corps et l\'esprit en rythme.'],
 ['💧','Boire un verre d\'eau','Après la nuit, le corps a besoin de s\'hydrater.'],
 ['🧘','Quelques minutes de calme','Respirer, réfléchir, prier ou simplement se poser aide à bien commencer.'],
 ['🍳','Un vrai petit-déjeuner','Une alimentation équilibrée donne de l\'énergie pour la matinée.'],
 ['📋','Fixer ses trois priorités','Choisissez les trois tâches les plus importantes de la journée.']
]);
S('dp-bambou','L\'histoire du bambou','Motivation','vert',[
 ['🎋','Une histoire que l\'on raconte','On dit qu\'on plante une graine de bambou et qu\'on l\'arrose chaque jour.'],
 ['⏳','Des années sans rien voir','Pendant longtemps, rien ne sort de terre. On pourrait croire que cela ne marche pas.'],
 ['🌱','Sous la terre, tout travaille','Pendant ce temps, les racines grandissent et se renforcent en profondeur.'],
 ['🚀','Puis tout s\'accélère','Quand la tige apparaît enfin, elle pousse très vite, parce que les racines sont prêtes.'],
 ['💪','La leçon','Ne vous découragez pas si les résultats tardent : votre persévérance construit vos racines.']
]);

/* ------------------------------------------------------------ DIVERTISSEMENT */
S('fu-records','Records du monde étonnants','Divertissement','rouge',[
 ['🏙️','Le plus haut bâtiment','La tour Burj Khalifa, à Dubaï, mesure environ 828 mètres de haut.'],
 ['🕳️','L\'endroit le plus profond','La fosse des Mariannes, dans l\'océan Pacifique, descend à environ 11 kilomètres.'],
 ['🐋','Le plus grand animal','La baleine bleue peut mesurer près de 30 mètres : c\'est le plus grand animal connu.'],
 ['🐆','Le plus rapide sur terre','Le guépard peut atteindre environ 100 kilomètres à l\'heure sur de courtes distances.'],
 ['🐢','Une vie très longue','Certaines tortues géantes peuvent vivre plus de 150 ans.']
]);
S('fu-animaux','Le saviez-vous ? Les animaux','Divertissement','orange',[
 ['🐙','Le poulpe a trois cœurs','Deux cœurs envoient le sang aux branchies, un troisième l\'envoie dans le reste du corps.'],
 ['🐬','Les dauphins dorment à moitié','Ils laissent une moitié de leur cerveau en éveil pour continuer à remonter respirer.'],
 ['🦒','La girafe dort très peu','Elle ne dort souvent que quelques heures par jour, par petites périodes.'],
 ['🐦','Le colibri bat des ailes très vite','Ses ailes bougent des dizaines de fois par seconde et il peut voler sur place.'],
 ['🐘','L\'éléphant ne saute pas','Malgré sa force, l\'éléphant est l\'un des rares mammifères incapables de sauter.']
]);
S('fu-corps','Le saviez-vous ? Le corps humain','Divertissement','rose',[
 ['☝️','Des empreintes uniques','Les empreintes digitales sont différentes pour chaque personne, même pour les jumeaux.'],
 ['👁️','On cligne souvent des yeux','On cligne des yeux environ quinze à vingt fois par minute.'],
 ['💅','Des ongles qui poussent','Les ongles des mains poussent plus vite que ceux des pieds.'],
 ['🍽️','Un estomac costaud','L\'estomac produit un acide très puissant pour digérer les aliments, tout en se protégeant lui-même.'],
 ['😴','Un tiers de notre vie','Nous passons environ un tiers de notre vie à dormir.']
]);
S('fu-devinettes1','Devinettes en famille (1)','Divertissement','violet',[
 ['❓','Première devinette','Qu\'est-ce qui a des dents mais ne mord pas ?'],
 ['✅','La réponse','Un peigne !'],
 ['❓','Deuxième devinette','Plus on en prend, plus on en laisse. De quoi s\'agit-il ?'],
 ['✅','La réponse','Des pas !'],
 ['❓','Troisième devinette','Qu\'est-ce qui monte et descend sans jamais bouger ?'],
 ['✅','La réponse','Un escalier !']
]);
S('fu-devinettes2','Devinettes en famille (2)','Divertissement','turquoise',[
 ['❓','Première devinette','J\'ai des villes mais pas de maisons, des fleuves mais pas d\'eau. Que suis-je ?'],
 ['✅','La réponse','Une carte géographique !'],
 ['❓','Deuxième devinette','Qu\'est-ce qui est plein de trous, mais retient l\'eau ?'],
 ['✅','La réponse','Une éponge !'],
 ['❓','Troisième devinette','Qu\'est-ce qui a un cou, mais pas de tête ?'],
 ['✅','La réponse','Une bouteille !']
]);
S('fu-foot','Le football en 6 chiffres','Divertissement','vert',[
 ['⚽','11 joueurs par équipe','Chaque équipe aligne onze joueurs sur le terrain, gardien de but compris.'],
 ['⏱️','90 minutes','Un match dure deux mi-temps de 45 minutes, plus le temps additionnel.'],
 ['🏆','Une Coupe du monde tous les 4 ans','Le grand rendez-vous mondial réunit les meilleures équipes nationales.'],
 ['📖','17 lois du jeu','Hors-jeu, fautes, corners : les règles sont les mêmes partout dans le monde.'],
 ['🟨','Cartons jaunes et rouges','Le jaune est un avertissement, le rouge signifie l\'expulsion du joueur.'],
 ['🌍','Le sport le plus populaire','Du quartier au stade, le football se joue sur tous les continents.']
]);
S('fu-musique','La musique du monde','Divertissement','rose',[
 ['🎶','La kora','Un instrument à 21 cordes d\'Afrique de l\'Ouest, joué par les griots.'],
 ['🥁','Le djembé','Un tambour en forme de gobelet, joué avec les mains, au rythme entraînant.'],
 ['🎹','Le piano','Il possède 88 touches et peut jouer à la fois la mélodie et l\'accompagnement.'],
 ['🎸','La guitare','Utilisée dans le monde entier, du folk au rock en passant par les rythmes africains.'],
 ['🎻','Le violon','Un instrument à cordes frottées, au son très expressif.']
]);
S('fu-cuisine','Cuisine du monde','Divertissement','orange',[
 ['🐟','L\'attiéké-poisson','Un grand classique de Côte d\'Ivoire : semoule de manioc fermentée servie avec du poisson grillé.'],
 ['🍚','Le thiéboudienne','Plat emblématique du Sénégal : riz au poisson et aux légumes.'],
 ['🍛','Le riz jollof','Un riz à la tomate très apprécié dans de nombreux pays d\'Afrique de l\'Ouest.'],
 ['🥘','Le couscous','Semoule de blé servie avec des légumes et de la viande, très répandue au Maghreb.'],
 ['🍕','La pizza','Une spécialité italienne devenue célèbre dans le monde entier.'],
 ['🍣','Les sushis','Plat japonais à base de riz vinaigré et de poisson ou de légumes.']
]);
})();

/* ==========================================================
   LOT ÉDUCATIF 7 — Maison, commerce, Côte d'Ivoire, santé, nature et détente (22 jeux)
   Nécessite games-edu-core.js (chargé avant).
   Chaque jeu est une petite ligne de données branchée sur une mécanique du moteur :
   EDU.quiz (QCM), EDU.tf (vrai/faux), EDU.pairs (associations), EDU.order (remettre dans l'ordre), EDU.sort (tri).
   Format d'une question de quiz : [question, bonne réponse, mauvaise 1, mauvaise 2, mauvaise 3, '~explication (facultative)']
   Format d'une affirmation vrai/faux : [affirmation, true ou false, explication]
   ========================================================== */
(function(){
'use strict';
if(!window.EDU) return;
const G = EDU.G;

/* ---------------------------------------------------------- MAISON & VIE PRATIQUE */
G('e7lessive','Lessive et entretien du linge','🧺','Argent & vie pratique',200,'Vrai ou faux ? Les bons gestes pour laver, sécher et soigner le linge.', EDU.tf([
 ["On peut laver ensemble du linge blanc et des vêtements neufs de couleurs vives.",false,"Les couleurs vives neuves peuvent déteindre sur le blanc : on trie par couleurs."],
 ["Lire l'étiquette d'entretien d'un vêtement avant de le laver est une bonne habitude.",true,"Elle indique la température maximale et le type de séchage ou de repassage."],
 ["Surcharger la machine à laver donne un linge plus propre.",false,"Le linge a besoin de place pour bouger et bien se rincer."],
 ["Mettre plus de lessive que nécessaire lave toujours mieux.",false,"Trop de lessive laisse des traces et irrite la peau : on suit la dose indiquée."],
 ["Il faut vider les poches avant de laver un vêtement.",true,"Papiers, pièces et stylos peuvent abîmer le linge ou la machine."],
 ["Le plein soleil peut faire passer les couleurs foncées.",true,"On retourne les vêtements foncés à l'envers pour les faire sécher."],
 ["L'eau très chaude convient à tous les tissus.",false,"Les tissus délicats peuvent rétrécir ou se déformer."],
 ["Il vaut mieux traiter une tache rapidement, avant qu'elle ne sèche.",true,"Une tache fraîche part beaucoup plus facilement."],
 ["L'eau de Javel peut s'utiliser sans précaution sur tous les tissus blancs.",false,"Il faut suivre l'étiquette et diluer le produit : il abîme certains tissus comme la laine ou la soie."],
 ["Bien rincer le linge aide à éliminer les restes de savon.",true,"Le savon qui reste sur le tissu peut irriter la peau."],
 ["Un vêtement mouillé enfermé dans un sac plastique ne risque rien.",false,"L'humidité enfermée favorise les moisissures et les mauvaises odeurs."],
 ["Étendre le linge dans un endroit aéré le fait sécher plus vite.",true,"L'air qui circule emporte l'humidité."]
]));

G('e7cuisinehyg','Hygiène en cuisine','🍳','Santé & nature',25,'Les bons réflexes pour cuisiner proprement et éviter les intoxications.', EDU.quiz([
 ["Avant de cuisiner, que faut-il faire en premier ?","Se laver les mains au savon","Allumer le feu","Sortir toutes les casseroles","Goûter les ingrédients"],
 ["Pourquoi utiliser une planche à découper différente pour la viande crue ?","Pour ne pas transmettre de microbes aux autres aliments","Pour que la viande soit plus tendre","Pour gagner du temps","Pour économiser le savon","~Les microbes de la viande crue peuvent passer sur les aliments qu'on mange sans cuisson."],
 ["À quelle température garder le réfrigérateur ?","Environ 4 °C","Environ 12 °C","Environ 18 °C","Environ 25 °C","~Le froid ralentit la multiplication des microbes."],
 ["Combien de temps peut-on laisser un plat cuit à température ambiante ?","Le moins possible : pas plus de 2 heures","Toute la journée","Toute la nuit","Trois jours","~Au-delà de 2 heures, et moins encore s'il fait très chaud, les microbes se multiplient dangereusement."],
 ["Quelle viande doit être cuite à cœur ?","Le poulet et la viande hachée","Aucune","Seulement le poisson","Seulement la viande en gros morceaux"],
 ["Que faire d'un aliment qui sent mauvais ou qui est moisi ?","Le jeter","En enlever un petit morceau et manger le reste","Le faire chauffer plus longtemps","Le donner à un enfant"],
 ["Comment décongeler de la viande en toute sécurité ?","Au réfrigérateur","Sur le plan de travail toute la journée","Au soleil","Près du feu"],
 ["Comment nettoyer les fruits et légumes mangés crus ?","À l'eau propre, en les frottant","On ne les lave pas","À l'eau de Javel pure","Avec de l'essence"],
 ["Un torchon sale et humide peut…","Propager des microbes : on le change souvent","Désinfecter la table","Ne présenter aucun risque","Se laver une fois par an"],
 ["Pourquoi ne pas goûter avec la cuillère puis la remettre dans la marmite ?","Elle transporte des microbes de la bouche dans le plat","Elle change le goût","Elle devient trop chaude","Ça ne pose aucun problème"],
 ["Où ranger la viande crue dans le réfrigérateur ?","En bas, bien couverte","En haut, au-dessus des aliments prêts à manger","Sur la porte, sans protection","N'importe où","~Elle ne doit pas goutter sur les autres aliments."],
 ["Vous avez une plaie à la main avant de cuisiner. Que faire ?","La couvrir avec un pansement propre ou des gants","Rien","Mettre de l'huile dessus","Cuisiner plus vite"]
]));

G('e7conserv','Bien conserver les aliments','🥫','Santé & nature',165,'Vrai ou faux ? Frigo, restes, dates limites : conserve sans gaspiller et sans risque.', EDU.tf([
 ["Les restes doivent être mis au frais assez vite après le repas.",true,"Plus ils restent à température ambiante, plus les microbes se multiplient."],
 ["On peut recongeler sans risque un aliment décongelé à température ambiante.",false,"Les microbes ont pu se multiplier pendant la décongélation."],
 ["Les aliments cuits doivent être conservés dans des récipients couverts ou fermés.",true,"Pour les protéger des microbes, des mouches et des odeurs."],
 ["Tous les fruits et légumes se conservent mieux au réfrigérateur.",false,"La banane, l'igname ou l'oignon, par exemple, se gardent mieux au sec et à température ambiante."],
 ["Il faut regarder la date limite de consommation des produits emballés.",true,"Après la date, certains produits peuvent devenir dangereux."],
 ["Une boîte de conserve très gonflée peut être consommée sans danger.",false,"Une boîte bombée peut contenir des bactéries dangereuses : on la jette."],
 ["Ranger les produits les plus anciens devant aide à éviter le gaspillage.",true,"C'est la règle « premier entré, premier sorti »."],
 ["Le séchage, le fumage et le sel sont de vieux moyens de conserver les aliments.",true,"Le poisson fumé ou séché en est un bon exemple."],
 ["Le riz cuit peut passer la nuit à température ambiante sans problème.",false,"Des bactéries peuvent s'y développer : il vaut mieux le refroidir vite et le mettre au frais."],
 ["Le congélateur détruit tous les microbes.",false,"Le froid les endort seulement : ils repartent à la décongélation."],
 ["Le pain se garde mieux dans un endroit sec et aéré.",true,"L'humidité favorise les moisissures."],
 ["Noter la date sur les restes rangés au frais est une bonne idée.",true,"On évite d'oublier et de manger un plat trop ancien."]
]));

G('e7produits','Produits ménagers : sécurité','🧴','Santé & nature',350,'Vrai ou faux ? Utilise et range les produits d\'entretien sans danger.', EDU.tf([
 ["On peut mélanger de l'eau de Javel avec un autre produit nettoyant pour plus d'efficacité.",false,"Mélangée à certains produits, elle dégage des gaz toxiques. On n'associe jamais les produits."],
 ["Il faut aérer la pièce quand on utilise des produits d'entretien forts.",true,"Les vapeurs peuvent irriter les yeux et la gorge."],
 ["On peut verser un produit toxique dans une bouteille d'eau vide pour gagner de la place.",false,"Quelqu'un, surtout un enfant, pourrait le boire par erreur. On garde l'emballage d'origine."],
 ["Les produits ménagers doivent être rangés hors de portée des enfants.",true,"Ils sont dangereux en cas d'avalement ou de contact avec les yeux."],
 ["Porter des gants protège les mains des produits agressifs.",true,"Certains produits abîment la peau."],
 ["Si quelqu'un avale un produit ménager, il faut le faire vomir tout de suite.",false,"Il ne faut pas faire vomir : on appelle les secours ou on va au centre de santé avec l'emballage."],
 ["Les pictogrammes sur les étiquettes donnent des informations sur les dangers du produit.",true,"Ils disent comment utiliser et ranger le produit."],
 ["On peut utiliser un spray inflammable près d'une flamme si on fait attention.",false,"Les aérosols peuvent s'enflammer ou exploser."],
 ["Si un produit éclabousse les yeux, il faut rincer abondamment à l'eau propre.",true,"On rince longuement, puis on demande un avis médical."],
 ["Le vinaigre peut détartrer, mais il ne se mélange pas à l'eau de Javel.",true,"Ce mélange libère du chlore, un gaz dangereux."],
 ["Plus on met de produit, plus c'est propre.",false,"La dose prévue suffit : en excès, le produit laisse des traces et pollue l'eau."],
 ["On peut verser des produits chimiques dans la nature ou dans la rivière sans conséquence.",false,"Ils polluent l'eau et le sol, et abîment les animaux et les plantes."]
]));

G('e7menage','Ménage : le bon ordre','🧹','Argent & vie pratique',280,'Remets les étapes du ménage, de la vaisselle ou de la lessive dans le bon ordre.', EDU.order([
 { q:'Ménage d\'une pièce, dans le bon ordre :', items:['Aérer la pièce','Dépoussiérer en haut','Essuyer les meubles','Balayer ou aspirer','Laver le sol'] },
 { q:'Laver la vaisselle, dans le bon ordre :', items:['Retirer les restes','Laver les verres','Laver assiettes et couverts','Laver les casseroles','Rincer et égoutter'] },
 { q:'Laver le linge à la main, dans le bon ordre :', items:['Trier le linge','Tremper et savonner','Frotter','Rincer','Essorer et étendre'] },
 { q:'Préparer un repas, dans le bon ordre :', items:['Se laver les mains','Laver les aliments','Couper et préparer','Cuire','Servir'] },
 { q:'Nettoyer une salle de bain, dans le bon ordre :', items:['Aérer','Appliquer le produit','Laisser agir','Frotter et rincer','Sécher'] },
 { q:'Faire un lit, dans le bon ordre :', items:['Retirer les draps sales','Poser le drap du dessous','Poser la couverture','Mettre les taies d\'oreiller','Lisser le tout'] }
]));

G('e7vocab','Mots du commerce','🏪','Argent & vie pratique',45,'Associe chaque mot du commerce à sa définition.', EDU.pairs([
 ["Stock","Marchandises disponibles"],["Bénéfice","Gain après les dépenses"],["Facture","Document qui détaille une vente"],["Devis","Prix annoncé avant le travail"],
 ["Fournisseur","Celui qui vend les produits à revendre"],["Remise","Réduction sur le prix"],["Reçu","Preuve de paiement"],["Inventaire","Comptage de tout le stock"],
 ["Clientèle","Ensemble des clients"],["Chiffre d'affaires","Total des ventes sur une période"],["Marge","Prix de vente moins prix d'achat"],["Crédit","Achat payé plus tard"]
]));

/* ---------------------------------------------------------- MÉTIERS & CARRIÈRE */
G('e7clientserv','Le client est roi','🛍️','Métiers & carrière',20,'Que faire face à un client ? Choisis le bon réflexe.', EDU.quiz([
 ["Un client entre dans votre boutique. Que faites-vous d'abord ?","Je le salue avec le sourire","Je continue mon téléphone","J'attends qu'il parle","Je lui tourne le dos"],
 ["Un client est en colère à cause d'un retard. Meilleure première réaction ?","L'écouter calmement sans l'interrompre","Lui répondre sur le même ton","Lui dire que ce n'est pas votre problème","L'ignorer"],
 ["Vous ne connaissez pas la réponse à sa question. Vous…","Dites que vous allez vous renseigner et revenez avec la réponse","Inventez une réponse","Changez de sujet","Partez sans rien dire"],
 ["Pourquoi un client satisfait est-il précieux ?","Il revient et parle de vous autour de lui","Il paie moins","Il demande plus de réductions","Il ne joue aucun rôle"],
 ["Un client attend depuis longtemps. Que faire ?","S'excuser et le servir au plus vite","Ne rien dire","Lui dire de revenir demain","Le faire attendre encore"],
 ["Un produit vendu est défectueux. Bon réflexe ?","Proposer une solution : échange ou réparation","Refuser sans l'écouter","Accuser le client","Se cacher"],
 ["Au téléphone, comment bien commencer ?","Saluer, se présenter et proposer son aide","Répondre « allô, quoi ? »","Raccrocher vite","Parler très bas"],
 ["Qu'est-ce qui rend un commerce accueillant ?","Propreté, sourire et prix affichés","Désordre","Musique très forte","Visage fermé et silence"],
 ["Un client hésite entre deux produits. Vous…","Posez des questions sur ses besoins pour l'aider à choisir","Choisissez à sa place","Le poussez vers le plus cher","Perdez patience"],
 ["Quelle attitude faut-il éviter avec un client ?","Lui couper la parole","L'écouter","Le remercier","Lui sourire"],
 ["Comment montrer à un client que vous respectez son temps ?","Être rapide, organisé et ponctuel","Le faire patienter sans explication","Arriver en retard au rendez-vous","Ne pas répondre à ses messages"],
 ["Après une vente, que faire pour fidéliser ?","Remercier et noter ce que le client aime","L'oublier","Augmenter le prix","Ne plus lui répondre"]
]));

G('e7secteurs','Quel secteur d\'activité ?','🧭','Métiers & carrière',215,'Classe chaque métier dans son secteur d\'activité, vite !', EDU.sort(['🏥 Santé','🏗️ Bâtiment','🛒 Commerce','🚚 Transport'],[
 ["Infirmier(ère)",0],["Sage-femme",0],["Pharmacien(ne)",0],["Médecin",0],["Aide-soignant(e)",0],
 ["Maçon",1],["Plombier",1],["Carreleur",1],["Peintre en bâtiment",1],["Ferrailleur",1],
 ["Caissier(ère)",2],["Vendeur(se)",2],["Gérant de boutique",2],["Commerçant(e)",2],["Chef de rayon",2],
 ["Chauffeur routier",3],["Livreur",3],["Pilote de ligne",3],["Conducteur de taxi",3],["Capitaine de navire",3]
]));

G('e7entretien','Entretien d\'embauche','🤝','Métiers & carrière',150,'Que répondre ? Que faire ? Réussis ton entretien d\'embauche.', EDU.quiz([
 ["Quelle tenue choisir pour un entretien ?","Une tenue propre, soignée et adaptée au poste","Une tenue de plage","Une tenue de nuit","Peu importe"],
 ["À quelle heure arriver à l'entretien ?","Quelques minutes en avance","Après l'heure","Une heure en retard","Quand on veut"],
 ["On vous dit : « Parlez-moi de vous. » Que répondre ?","Résumer son parcours, ses compétences et sa motivation","Raconter toute sa vie privée","Dire « je n'ai rien à dire »","Critiquer son ancien patron"],
 ["Comment parler de son ancien employeur ?","Avec respect, même si l'expérience a été difficile","En dire du mal","Raconter ses disputes","Se moquer de lui"],
 ["Pourquoi se renseigner sur l'entreprise avant l'entretien ?","Pour montrer son intérêt et répondre précisément","Pour la critiquer","Ce n'est pas utile","Pour faire peur"],
 ["Que faire de son téléphone pendant l'entretien ?","L'éteindre ou le mettre en silencieux","Répondre aux appels","Jouer dessus","Filmer sans prévenir"],
 ["Vous ne connaissez pas la réponse à une question. Vous…","Restez honnête et expliquez comment vous chercheriez la solution","Mentez","Vous taisez et partez","Vous fâchez"],
 ["Quel bon réflexe à la fin de l'entretien ?","Remercier et poser une question sur le poste","Partir sans un mot","Demander des congés tout de suite","Critiquer les bureaux"],
 ["Comment parler de ses défauts ?","Citer un point à améliorer et ce que l'on fait pour progresser","Dire qu'on n'en a aucun","Citer un défaut grave","Refuser de répondre"],
 ["Que faut-il apporter ?","Son CV, ses diplômes et une pièce d'identité","Rien","Des amis","Son animal"],
 ["Le regard et le sourire pendant l'entretien…","Montrent la confiance et l'écoute","Ne servent à rien","Sont interdits","Doivent être évités"],
 ["Après l'entretien, on peut…","Envoyer un court message de remerciement","Appeler toutes les heures","Disparaître","Critiquer l'entreprise sur les réseaux"]
]));

/* ---------------------------------------------------------- CÔTE D'IVOIRE & CULTURE */
G('e7ci','Culture ivoirienne','🇨🇮','Culture',30,'Quiz sur la Côte d\'Ivoire : histoire, villes, plats et symboles.', EDU.quiz([
 ["Quelle est la langue officielle de la Côte d'Ivoire ?","Le français","L'anglais","Le baoulé","Le dioula"],
 ["Quelle est la capitale économique du pays ?","Abidjan","Yamoussoukro","Bouaké","Korhogo"],
 ["Quel produit agricole est la grande spécialité du pays ?","Le cacao","Le blé","Le thé","Les pommes","~La Côte d'Ivoire est l'un des tout premiers producteurs mondiaux de cacao."],
 ["En quelle année la Côte d'Ivoire est-elle devenue indépendante ?","1960","1945","1975","1990","~Le 7 août 1960."],
 ["Qui fut le premier président de la Côte d'Ivoire ?","Félix Houphouët-Boigny","Nelson Mandela","Kwame Nkrumah","Léopold Sédar Senghor"],
 ["Quelles sont les couleurs du drapeau ivoirien ?","Orange, blanc et vert","Rouge, jaune et vert","Bleu, blanc et rouge","Noir, jaune et rouge"],
 ["Quel est le surnom de l'équipe nationale de football ?","Les Éléphants","Les Lions","Les Aigles","Les Panthères"],
 ["Quel plat est fait à base de semoule de manioc ?","L'attiéké","L'alloco","Le kédjenou","Le foutou","~L'attiéké accompagne souvent le poisson braisé."],
 ["Comment appelle-t-on la banane plantain frite ?","L'alloco","L'attiéké","Le garba","Le placali"],
 ["Quelle lagune borde la ville d'Abidjan ?","La lagune Ébrié","Le lac Tchad","Le lac Victoria","Le fleuve Niger"],
 ["Quelle ville ivoirienne est classée au patrimoine mondial de l'UNESCO ?","Grand-Bassam","Bouaké","Daloa","Man"],
 ["Quel parc national ivoirien protège une grande forêt tropicale classée par l'UNESCO ?","Le parc national de Taï","Le parc du Serengeti","Le parc Kruger","Le parc de Yellowstone"]
]));

G('e7villesci','Villes de Côte d\'Ivoire','🗺️','Géographie',110,'Associe chaque ville ivoirienne à sa particularité.', EDU.pairs([
 ["Abidjan","Capitale économique"],["Yamoussoukro","Capitale politique"],["Bouaké","Grande ville du centre"],["Korhogo","Grande ville du nord"],
 ["San-Pédro","Grand port du sud-ouest"],["Grand-Bassam","Ville historique classée UNESCO"],["Man","Ville de l'ouest entourée de montagnes"],
 ["Daloa","Grande ville du centre-ouest"],["Abengourou","Ville de l'est, près du Ghana"],["Odienné","Ville du nord-ouest"]
]));

G('e7plats','Saveurs d\'Afrique de l\'Ouest','🍲','Culture',20,'Associe chaque plat ou boisson à sa description.', EDU.pairs([
 ["Attiéké","Semoule de manioc"],["Alloco","Banane plantain frite"],["Kédjenou","Poulet mijoté à l'étouffée"],["Foutou","Pâte pilée de banane, igname ou manioc"],
 ["Garba","Attiéké servi avec du thon frit"],["Sauce graine","Sauce à la noix de palme"],["Placali","Pâte de manioc fermenté"],["Riz gras","Riz cuit dans une sauce tomate"],
 ["Bissap","Boisson de fleurs d'hibiscus"],["Gombo","Légume-fruit qui donne une sauce gluante"]
]));

G('e7instruments','Instruments d\'Afrique','🥁','Culture',40,'Associe chaque instrument africain à sa description.', EDU.pairs([
 ["Djembé","Tambour en forme de gobelet"],["Kora","Instrument à 21 cordes et grande calebasse"],["Balafon","Xylophone en bois avec calebasses"],
 ["Tama","Tambour d'aisselle qui « parle »"],["Flûte peule","Flûte traditionnelle des éleveurs peuls"],["Shekere","Calebasse entourée d'un filet de perles"],
 ["N'goni","Luth traditionnel à cordes pincées"],["Sanza","Lamelles pincées avec les pouces"],["Dundun","Grand tambour à deux peaux"],["Gankogui","Double cloche en fer"]
]));

G('e7animaux','Animaux d\'Afrique','🦒','Sciences',95,'Quiz sur les animaux d\'Afrique et leurs records.', EDU.quiz([
 ["Quel est l'animal terrestre le plus lourd ?","L'éléphant d'Afrique","La girafe","Le rhinocéros","Le lion","~La girafe est la plus haute, mais l'éléphant est le plus lourd."],
 ["Quel est l'animal terrestre le plus rapide ?","Le guépard","Le lion","L'éléphant","Le zèbre","~Il peut dépasser 100 km/h sur de courtes distances."],
 ["Quel est le plus grand oiseau du monde ?","L'autruche","L'aigle","Le flamant","La cigogne","~Elle ne vole pas, mais elle court très vite."],
 ["Quel animal est couvert d'écailles et se roule en boule ?","Le pangolin","Le hérisson","Le porc-épic","Le fennec","~Le pangolin est un mammifère couvert d'écailles."],
 ["Quel grand félin vit en groupe familial ?","Le lion","Le guépard","Le léopard","Le jaguar","~Le lion est le seul grand félin à vivre en groupe stable."],
 ["Quel petit renard du désert a de grandes oreilles pour se rafraîchir ?","Le fennec","Le loup","L'ours","Le koala"],
 ["Quel animal est le seul parent vivant de la girafe ?","L'okapi","Le zèbre","L'antilope","Le buffle"],
 ["Où vit l'hippopotame pygmée, présent en Côte d'Ivoire ?","Dans les forêts humides, près de l'eau","Dans le désert","Sur la banquise","Au sommet des montagnes enneigées"],
 ["Que mangent surtout les gorilles ?","Des plantes : feuilles, tiges et fruits","Uniquement de la viande","Des poissons","Des insectes seulement"],
 ["Les rayures d'un zèbre sont-elles identiques à celles d'un autre zèbre ?","Non, elles sont uniques, comme des empreintes","Oui, toutes pareilles","Elles disparaissent avec l'âge","Elles changent chaque jour"],
 ["Combien de temps dure la gestation d'une éléphante ?","Environ 22 mois","Environ 3 mois","Environ 9 mois","Environ 5 ans"],
 ["Quel animal ressemble à un tronc flottant dans les fleuves d'Afrique ?","Le crocodile du Nil","La girafe","Le zèbre","Le lion"]
]));

/* ---------------------------------------------------------- SANTÉ, EAU, ÉNERGIE, NUMÉRIQUE */
G('e7groupes','Groupes d\'aliments','🥗','Santé & nature',125,'Énergie, protéines, légumes ou fruits ? Range chaque aliment dans sa famille.', EDU.sort(['⚡ Énergie','💪 Protéines','🥬 Légumes','🍊 Fruits'],[
 ["Riz",0],["Igname",0],["Manioc",0],["Banane plantain",0],["Pain",0],["Maïs",0],["Patate douce",0],
 ["Poisson",1],["Œuf",1],["Niébé (haricots)",1],["Poulet",1],["Viande de bœuf",1],
 ["Épinards",2],["Gombo",2],["Aubergine",2],["Chou",2],["Carotte",2],["Feuilles de manioc",2],
 ["Mangue",3],["Orange",3],["Papaye",3],["Ananas",3],["Goyave",3],["Pastèque",3]
]));

G('e7moustique','Moustiques et paludisme','🦟','Santé & nature',140,'Vrai ou faux ? Protège-toi et protège ta famille.', EDU.tf([
 ["Les moustiques pondent leurs œufs dans l'eau stagnante.",true,"Seaux, pneus, vases et gouttières bouchées peuvent devenir des nids."],
 ["Il suffit de vider les récipients d'eau une fois par an.",false,"Il faut le faire chaque semaine, avant que les larves ne deviennent des moustiques."],
 ["Dormir sous une moustiquaire imprégnée protège du paludisme.",true,"Surtout la nuit, quand les moustiques anophèles piquent."],
 ["Le paludisme se transmet par la piqûre de certains moustiques.",true,"C'est le moustique anophèle femelle qui transmet le parasite."],
 ["On attrape le paludisme en touchant une personne malade.",false,"Il ne se transmet pas par simple contact, mais par la piqûre d'un moustique infecté."],
 ["Une fièvre avec frissons demande un avis médical rapide en zone de paludisme.",true,"Un test rapide permet de confirmer la maladie et de la traiter à temps."],
 ["Les moustiques ne piquent jamais en journée.",false,"Certains, comme les moustiques Aedes, piquent surtout le jour."],
 ["Les grillages aux fenêtres aident à limiter les piqûres.",true,"Ils empêchent les moustiques d'entrer dans la maison."],
 ["Herbes hautes et détritus autour de la maison attirent les moustiques.",true,"Ils s'y reposent et l'eau de pluie s'y accumule."],
 ["Les vêtements longs et couvrants limitent les piqûres.",true,"Surtout au coucher du soleil et la nuit."],
 ["Se soigner tout seul avec n'importe quel médicament est une bonne idée.",false,"Seul un traitement adapté, conseillé par un professionnel de santé, est efficace."],
 ["Les enfants et les femmes enceintes sont particulièrement fragiles face au paludisme.",true,"Ils doivent être suivis de près."]
]));

G('e7eau','Eau potable','🚰','Santé & nature',195,'Vrai ou faux ? Comment boire une eau plus sûre.', EDU.tf([
 ["Faire bouillir l'eau au moins une minute aide à tuer la plupart des microbes.",true,"On compte le temps à partir des gros bouillons."],
 ["Une eau claire est toujours propre à boire.",false,"Des microbes invisibles peuvent s'y trouver."],
 ["Il faut conserver l'eau potable dans un récipient propre et couvert.",true,"Pour éviter qu'elle ne soit contaminée de nouveau."],
 ["Passer l'eau dans un tissu propre retire les saletés visibles.",true,"Mais cela ne tue pas les microbes : il faut ensuite la faire bouillir ou la traiter."],
 ["Plonger des mains sales dans le seau d'eau potable est sans danger.",false,"On verse l'eau avec une louche propre ou un robinet."],
 ["Les produits de traitement de l'eau peuvent la rendre plus sûre.",true,"À condition de respecter la dose et le temps d'attente indiqués."],
 ["On peut boire l'eau d'une rivière sans la traiter si elle coule vite.",false,"Une eau courante peut aussi contenir des microbes."],
 ["Se laver les mains au savon aide à éviter la diarrhée.",true,"Surtout avant de manger et après les toilettes."],
 ["Nettoyer régulièrement les seaux et les réservoirs d'eau est inutile.",false,"Des algues et des microbes peuvent s'y développer."],
 ["Il faut boire de l'eau tout au long de la journée, surtout quand il fait chaud.",true,"Le corps perd de l'eau en transpirant."],
 ["L'eau de pluie recueillie sur un toit sale est forcément potable.",false,"Elle peut contenir des saletés et des microbes : il faut la filtrer et la traiter."],
 ["Les enfants peuvent boire l'eau des flaques s'ils ont très soif.",false,"Cette eau est très souvent contaminée."]
]));

G('e7elec','Économiser l\'énergie à la maison','💡','Argent & vie pratique',55,'Vrai ou faux ? Les bons gestes pour réduire ta facture d\'électricité.', EDU.tf([
 ["Une ampoule LED consomme moins qu'une ampoule classique.",true,"Elle consomme beaucoup moins d'électricité et dure plus longtemps."],
 ["Un chargeur branché sans téléphone ne consomme absolument rien.",false,"Il consomme un peu en continu : mieux vaut le débrancher."],
 ["Ouvrir souvent la porte du réfrigérateur le fait consommer davantage.",true,"Il doit refroidir de nouveau l'air qui entre."],
 ["Mettre un plat très chaud directement au réfrigérateur est une bonne idée.",false,"Cela réchauffe l'intérieur : on laisse d'abord refroidir un peu, sans dépasser 2 heures."],
 ["Éteindre la lumière en quittant une pièce permet d'économiser de l'argent.",true,"Chaque heure d'éclairage inutile coûte."],
 ["Repasser beaucoup de vêtements d'un coup consomme moins que repasser un par un.",true,"Le fer ne chauffe qu'une seule fois."],
 ["Dégivrer régulièrement le congélateur aide à le garder efficace.",true,"Une couche de givre épaisse gêne le froid."],
 ["Plus on règle un climatiseur bas, moins il consomme.",false,"Plus l'écart avec la température extérieure est grand, plus il consomme."],
 ["Couvrir les casseroles pendant la cuisson économise du gaz ou du charbon.",true,"La cuisson est plus rapide."],
 ["Débrancher les appareils inutilisés aide à réduire la facture.",true,"Beaucoup d'appareils consomment en veille."],
 ["Sécher le linge au soleil coûte de l'électricité.",false,"Le soleil est gratuit !"],
 ["Une télévision en veille ne consomme jamais d'électricité.",false,"Elle consomme un peu tant qu'elle reste branchée."]
]));

G('e7whatsapp','Arnaques sur WhatsApp et réseaux','🛡️','Numérique',335,'Vrai ou faux ? Reconnais les pièges et protège ton compte.', EDU.tf([
 ["On peut donner à un inconnu le code à 6 chiffres reçu par SMS pour WhatsApp.",false,"Ce code permet de prendre le contrôle de ton compte : il est strictement personnel."],
 ["Un message qui annonce un gros gain à un jeu où tu n'as pas joué est suspect.",true,"Les arnaqueurs appâtent avec de faux cadeaux."],
 ["Un « ami » qui demande de l'argent en urgence doit être vérifié par un appel.",true,"Son compte a peut-être été piraté."],
 ["Cliquer sur n'importe quel lien reçu est sans danger.",false,"Un lien piégé peut voler tes informations."],
 ["Mettre son numéro de carte bancaire sur son profil, c'est pratique et sans risque.",false,"Ne partage jamais tes informations bancaires."],
 ["Activer la vérification en deux étapes protège mieux ton compte.",true,"Un code secret supplémentaire est demandé pour te connecter."],
 ["Un vrai service client ne te demande jamais ton code secret ou ton PIN.",true,"Banque, opérateur ou plateforme ne les demandent pas par message."],
 ["Un message d'« opérateur » qui dit que ton compte sera fermé si tu ne cliques pas est forcément vrai.",false,"Vérifie auprès du service officiel avant toute action."],
 ["Partager une rumeur non vérifiée est un acte sans conséquence.",false,"Une fausse information peut faire du mal à des personnes réelles."],
 ["Il vaut mieux vérifier l'identité d'un vendeur avant de payer à l'avance en ligne.",true,"Cherche des avis et privilégie le paiement à la livraison quand c'est possible."],
 ["Les réglages de confidentialité permettent de limiter ce que voient les inconnus.",true,"Photo de profil, statut, dernière connexion : tu choisis qui peut les voir."],
 ["Les mises à jour de l'application ne servent à rien.",false,"Elles corrigent des failles de sécurité."]
]));

G('e7jardin','Potager et jardinage','🌱','Santé & nature',100,'Quiz pour devenir un bon jardinier : sol, eau, compost et plantes.', EDU.quiz([
 ["De quoi une plante a-t-elle besoin pour pousser ?","De lumière, d'eau et d'un sol riche","Seulement de sable","D'obscurité totale","De glace"],
 ["À quel moment arroser pour limiter l'évaporation ?","Tôt le matin ou en fin de journée","En plein midi","Jamais","Seulement à minuit"],
 ["Que peut-on mettre dans un compost ?","Des épluchures de légumes et des feuilles mortes","Du plastique","Du verre","Des piles"],
 ["À quoi sert le compost ?","À enrichir le sol naturellement","À chasser les nuages","À colorer l'eau","À remplacer l'eau"],
 ["Pourquoi pailler le sol (le couvrir de paille ou de feuilles) ?","Pour garder l'humidité et limiter les mauvaises herbes","Pour attirer la pluie","Pour colorer les fruits","Pour attirer les cafards"],
 ["Que faire des mauvaises herbes ?","Les enlever, car elles volent l'eau et les nutriments","Les arroser davantage","Les laisser envahir le jardin","Leur donner de l'engrais"],
 ["Pourquoi faire alterner les cultures d'une saison à l'autre ?","Pour garder le sol en bonne santé et limiter les maladies","Pour changer la couleur de la terre","Pour fatiguer les plantes","Ce n'est pas utile"],
 ["Quel est le rôle des abeilles au jardin ?","Elles pollinisent les fleurs","Elles creusent des trous","Elles mangent les racines","Elles arrosent"],
 ["Quelle partie de la plante absorbe l'eau du sol ?","Les racines","Les fleurs","Les fruits","Les épines"],
 ["Quelles plantes enrichissent le sol en azote ?","Les légumineuses, comme le niébé","Le gombo","Le piment","La salade"],
 ["Pourquoi espacer les plants à la plantation ?","Pour qu'ils aient assez de lumière, d'eau et d'air","Pour que ça fasse joli","Pour qu'ils se gênent","Pour attirer les fourmis"],
 ["Quel outil sert à retourner la terre ?","La houe ou la bêche","Le marteau","La scie","Le tournevis"]
]));

/* ---------------------------------------------------------- DÉTENTE & LOGIQUE */
G('e7jeuxtrad','Jeux traditionnels africains','♟️','Détente',60,'Awalé, marelle, osselets… Teste tes connaissances sur les jeux d\'hier et d\'aujourd\'hui.', EDU.quiz([
 ["Quel jeu de stratégie utilise des graines dans des trous creusés dans une planche ?","L'awalé","Les échecs","Le Monopoly","Le Scrabble"],
 ["Combien de joueurs jouent à l'awalé ?","Deux","Quatre","Dix","Un seul"],
 ["Combien de trous contient un plateau d'awalé classique ?","12","6","24","48","~Deux rangées de six trous, une par joueur."],
 ["Combien de graines au départ dans un awalé classique ?","48","12","24","100","~Quatre graines dans chacun des douze trous."],
 ["Pour gagner à l'awalé, il faut…","Capturer le plus de graines","Cacher ses graines","Jouer le plus vite possible","Avoir le plus de pions"],
 ["Quelle qualité est la plus utile à l'awalé ?","Anticiper les coups de l'adversaire","La force physique","La chance seule","Le bruit"],
 ["Quel jeu consiste à lancer un caillou sur des cases dessinées au sol puis à sauter ?","La marelle","Le football","Le tennis","Les dames"],
 ["Quel jeu consiste à lancer et à rattraper de petits cailloux ou osselets ?","Les osselets","Le tir à l'arc","Le basket","Le ping-pong"],
 ["Quel jeu oppose deux équipes qui tirent chacune sur une corde ?","Le tir à la corde","La course en sac","Le saut en longueur","La pétanque"],
 ["Que développe surtout la corde à sauter ?","L'endurance et la coordination","La mémoire des dates","La lecture","Le calcul"],
 ["À quoi servent les jeux traditionnels de groupe ?","À jouer ensemble, apprendre et transmettre la culture","À se disputer","À s'isoler","À ne rien faire"],
 ["Pourquoi l'awalé développe-t-il l'esprit ?","Il demande de réfléchir, compter et anticiper","Il fait perdre la mémoire","Il remplace les devoirs","Il n'apprend rien"]
]));

G('e7logique','Énigmes de logique','🧩','Maths & logique',260,'Attention aux pièges ! Résous ces petites énigmes de logique.', EDU.quiz([
 ["Si 3 chats attrapent 3 souris en 3 minutes, combien de chats faut-il pour attraper 100 souris en 100 minutes ?","3","100","33","300","~Chaque chat attrape une souris toutes les 3 minutes : en 100 minutes, 3 chats en attrapent environ 100."],
 ["Un fermier a 17 moutons. Tous sauf 9 meurent. Combien lui en reste-t-il ?","9","8","17","0","~« Tous sauf 9 » veut dire que 9 sont vivants."],
 ["Quel nombre vient ensuite : 2, 4, 8, 16, … ?","32","24","30","20","~On double à chaque fois."],
 ["Un père et son fils ont 50 ans à eux deux. Le père a 40 ans de plus que le fils. Quel âge a le fils ?","5 ans","10 ans","15 ans","20 ans","~5 + 45 = 50 et 45 − 5 = 40."],
 ["Combien font 10 + 10 × 10 ?","110","200","1 000","100","~On calcule la multiplication d'abord : 10 × 10 = 100, puis 10 + 100."],
 ["Une bouteille et son bouchon coûtent 1 100 FCFA. La bouteille coûte 1 000 FCFA de plus que le bouchon. Combien coûte le bouchon ?","50 FCFA","100 FCFA","500 FCFA","1 000 FCFA","~Bouchon 50 + bouteille 1 050 = 1 100, et 1 050 − 50 = 1 000."],
 ["Je suis léger, pourtant même l'homme le plus fort ne peut pas me retenir longtemps. Qui suis-je ?","Le souffle","Le vent","Un nuage","La fumée","~Personne ne peut retenir son souffle très longtemps."],
 ["Quel mois de l'année compte 28 jours ?","Tous les mois","Février seulement","Janvier","Aucun","~Tous les mois ont au moins 28 jours."],
 ["Combien de fois peut-on soustraire 5 de 25 ?","Une seule fois","Cinq fois","Vingt fois","Zéro fois","~Après la première soustraction, il ne reste plus 25."],
 ["Qu'est-ce qui est le plus lourd : 1 kg de plumes ou 1 kg de fer ?","Ils pèsent pareil","Le fer","Les plumes","On ne peut pas savoir"],
 ["Un train électrique roule vers l'est. Vers où va la fumée ?","Il n'y a pas de fumée","Vers l'est","Vers l'ouest","Vers le haut","~Un train électrique ne produit pas de fumée."],
 ["Un escargot grimpe un mur de 5 m : 3 m le jour, il redescend de 2 m la nuit. En combien de jours atteint-il le sommet ?","3 jours","5 jours","2 jours","10 jours","~Au 3e jour, il monte de 3 m et atteint le sommet avant la nuit."]
]));

})();

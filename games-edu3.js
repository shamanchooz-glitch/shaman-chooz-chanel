/* ==========================================================
   LOT ÉDUCATIF 3 — Culture (5), Langue & mots (10), Santé & nature (5)
   Nécessite games-edu-core.js (chargé avant).
   ========================================================== */
(function(){
'use strict';
if(!window.EDU) return;
const G = EDU.G, U = SCCG.util, rnd = U.rnd, pick = U.pick, shuffle = U.shuffle;

/* ---------------------------------------------------------- CULTURE */
G('emonuments','Monuments du monde','🗼','Culture',210,'Associe chaque monument à son pays.', EDU.pairs([
 ["Tour Eiffel","France"],["Colisée","Italie"],["Pyramides de Gizeh","Égypte"],["Taj Mahal","Inde"],["Grande Muraille","Chine"],["Statue de la Liberté","États-Unis"],
 ["Machu Picchu","Pérou"],["Christ Rédempteur","Brésil"],["Sagrada Família","Espagne"],["Big Ben","Royaume-Uni"],["Basilique Notre-Dame de la Paix","Côte d'Ivoire"],
 ["Monument de la Renaissance africaine","Sénégal"],["Grande Mosquée de Djenné","Mali"],["Acropole","Grèce"],["Angkor Vat","Cambodge"],["Opéra de Sydney","Australie"]
]));

G('emytho','Mythologie grecque','⚡','Culture',280,'Dieux, héros et monstres des légendes de la Grèce antique.', EDU.quiz([
 ["Qui est le roi des dieux grecs ?","Zeus","Hadès","Apollon","Hermès"],
 ["Quel dieu règne sur les mers ?","Poséidon","Zeus","Arès","Hermès"],
 ["Quelle déesse est celle de la sagesse ?","Athéna","Aphrodite","Héra","Artémis"],
 ["Quel dieu règne sur le monde des morts ?","Hadès","Zeus","Poséidon","Apollon"],
 ["Quel héros a accompli douze travaux ?","Héraclès (Hercule)","Ulysse","Thésée","Persée"],
 ["Quel monstre avait des serpents à la place des cheveux ?","La Méduse","La Sirène","Le Cyclope","Le Minotaure"],
 ["Quel dieu, aux sandales ailées, est le messager des dieux ?","Hermès","Arès","Apollon","Dionysos"],
 ["Quelle déesse est celle de l'amour et de la beauté ?","Aphrodite","Athéna","Héra","Déméter"],
 ["Sur quelle montagne vivaient les dieux grecs ?","Le mont Olympe","Le mont Everest","Le Kilimandjaro","Le Vésuve"],
 ["Quel héros a tué le Minotaure dans le labyrinthe ?","Thésée","Persée","Achille","Ulysse"],
 ["Quelle ruse a permis aux Grecs d'entrer dans la ville de Troie ?","Un immense cheval de bois","Un tunnel secret","Un déguisement en marchands","Un bateau fantôme"],
 ["Quel dieu est celui du Soleil, de la musique et des arts ?","Apollon","Arès","Hadès","Poséidon"],
 ["Quelle déesse est celle de la chasse et de la Lune ?","Artémis","Héra","Athéna","Aphrodite"],
 ["Quelle épopée d'Homère raconte le long voyage de retour d'Ulysse ?","L'Odyssée","L'Iliade","L'Énéide","La Théogonie"],
 ["Quel géant porte le monde sur ses épaules ?","Atlas","Cronos","Prométhée","Hercule"]
]));

G('einstru','Familles d\'instruments','🎷','Culture',320,'Cordes, vents ou percussions ? Classe les instruments.', EDU.sort(['🎻 Cordes','🎺 Vents','🥁 Percussions'],[
 ["Violon",0],["Guitare",0],["Harpe",0],["Violoncelle",0],["Kora",0],["Contrebasse",0],["Ngoni",0],["Banjo",0],
 ["Trompette",1],["Flûte",1],["Clarinette",1],["Saxophone",1],["Trombone",1],["Hautbois",1],["Tuba",1],
 ["Djembé",2],["Balafon",2],["Tam-tam",2],["Xylophone",2],["Timbale",2],["Tambour",2],["Triangle",2],["Cymbales",2]
]));

G('enotes','Lire les notes','🎼','Culture',340,'Quelle est cette note sur la portée (clé de Sol) ?', EDU.gen(function(L){
 const lo = L < 2 ? 0 : L < 4 ? -2 : -2, hi = L < 2 ? 4 : L < 3 ? 8 : 10;
 const idx = lo + rnd(hi - lo + 1), name = EDU.NOTES[((2 + idx) % 7 + 7) % 7];
 const set = new Set([name]); EDU.NOTES.slice().sort(()=>Math.random()-.5).forEach(n=>{ if(set.size < 4) set.add(n); });
 return { q:'Quelle est cette note ?', a:name, opts:shuffle(Array.from(set)), draw:(g,w,h)=>EDU.drawStaff(g,w,h,idx), w:240, h:150 };
},{ how:'Les 5 lignes de la portée avec la clé de Sol : de bas en haut, les lignes sont Mi, Sol, Si, Ré, Fa. Les notes dans les espaces sont Fa, La, Do, Mi. Les 7 notes : Do Ré Mi Fa Sol La Si. Trouve le nom de la note. 60 secondes.' }));

G('epeintres','Peintres et œuvres','🖼️','Culture',350,'Associe chaque œuvre célèbre à son artiste.', EDU.pairs([
 ["La Joconde","Léonard de Vinci"],["La Nuit étoilée","Vincent van Gogh"],["Guernica","Pablo Picasso"],["Le Cri","Edvard Munch"],["Les Nymphéas","Claude Monet"],
 ["La Persistance de la mémoire","Salvador Dalí"],["Le Penseur (sculpture)","Auguste Rodin"],["La Naissance de Vénus","Sandro Botticelli"],["La Jeune Fille à la perle","Johannes Vermeer"],
 ["Le Baiser","Gustav Klimt"],["La Liberté guidant le peuple","Eugène Delacroix"],["La Création d'Adam","Michel-Ange"]
]));

/* ---------------------------------------------------------- LANGUE & MOTS */
G('ehomo','a, à, et, est, on, ont…','✍️','Langue & mots',150,'Choisis le bon petit mot : a/à, et/est, ou/où, on/ont…', EDU.duo([
 ["Il ____ un chien très gentil.","a","à","~« a » vient du verbe avoir : on peut dire « il avait »."],
 ["Je vais ____ l'école à pied.","à","a","~« à » est une préposition : on ne peut pas dire « avait »."],
 ["Pierre ____ Marie vont au marché.","et","est","~« et » relie deux mots. « est » vient du verbe être (« était »)."],
 ["Il ____ fatigué ce soir.","est","et","~On peut dire « il était fatigué » : c'est le verbe être."],
 ["Tu veux du thé ____ du café ?","ou","où","~« ou » = « ou bien ». « où » indique un lieu."],
 ["____ vas-tu en vacances ?","Où","Ou","~« où » avec un accent indique un lieu."],
 ["Ils ____ très faim.","ont","on","~« ont » vient du verbe avoir (« avaient »)."],
 ["____ mange à midi.","On","Ont","~« on » = « nous » ou « quelqu'un »."],
 ["____ chat dort sur le canapé.","Son","Sont","~« son » indique la possession (le chat de lui)."],
 ["Ils ____ contents de te voir.","sont","son","~« sont » vient du verbe être (« étaient »)."],
 ["Il ____ lave les mains avant le repas.","se","ce","~« se » accompagne un verbe (se laver)."],
 ["____ livre est très intéressant.","Ce","Se","~« ce » montre quelque chose (ce livre-ci)."],
 ["Regarde ____ oiseaux, là-bas !","ces","ses","~« ces » sert à montrer. « ses » veut dire « les siens »."],
 ["Elle range ____ affaires dans son sac.","ses","ces","~« ses » = « les siennes » : ce sont ses affaires à elle."],
 ["Mets le sac ____ !","là","la","~« là » avec un accent indique un lieu (ici/là)."],
 ["Il est petit ____ très fort.","mais","mes","~« mais » exprime une opposition."],
 ["J'ai oublié ____ clés.","mes","mais","~« mes » = « les miennes »."],
 ["Il ____ venir demain.","peut","peu","~« peut » vient du verbe pouvoir (« il pouvait »)."],
 ["Il mange très ____ le matin.","peu","peut","~« peu » = « pas beaucoup »."]
]));

G('eaccords','Pluriels, féminins et accords','🔤','Langue & mots',170,'Chevaux, journaux, actrice… la bonne forme à chaque fois.', EDU.quiz([
 ["Pluriel de « un cheval » ?","des chevaux","des chevals","des chevaus","des chevalx"],
 ["Pluriel de « un journal » ?","des journaux","des journals","des journeaux","des journaus"],
 ["Pluriel de « un bijou » ?","des bijoux","des bijous","des bijoues","des bijoutes","~Sept mots en -ou prennent un x : bijou, caillou, chou, genou, hibou, joujou, pou."],
 ["Pluriel de « un pneu » ?","des pneus","des pneux","des pneues","des pneaux"],
 ["Pluriel de « un travail » ?","des travaux","des travails","des travaus","des travailx"],
 ["Pluriel de « un nez » ?","des nez","des nezs","des nezes","des neux","~Les mots qui finissent par s, x ou z ne changent pas au pluriel."],
 ["Pluriel de « un œil » ?","des yeux","des œils","des œilx","des yeuxs"],
 ["Pluriel de « madame » ?","mesdames","madames","mesdame","madamès"],
 ["Les fleurs sont ____.","belles","beaux","belle","bel"],
 ["Ces filles sont ____ de leur travail.","contentes","contents","content","contante"],
 ["Elles ont ____ des mangues.","mangé","mangées","mangés","mangée","~Avec l'auxiliaire avoir, le participe passé ne s'accorde pas avec le sujet."],
 ["Le féminin de « un acteur » est…","une actrice","une acteuse","une acteure","une acteuze"],
 ["Le féminin de « un boulanger » est…","une boulangère","une boulangeuse","une boulangerre","une boulange"],
 ["Le féminin de « un roi » est…","une reine","une roie","une roine","une rois"],
 ["Le féminin de « un copain » est…","une copine","une copaine","une copinne","une copain"],
 ["Pluriel de « un cadeau » ?","des cadeaux","des cadeaus","des cadeaues","des cadeaux's"]
]));

G('econjug','Conjugaison','📝','Langue & mots',100,'Présent, passé, futur : choisis la bonne forme du verbe.', EDU.quiz([
 ["Hier, nous ____ du riz.","avons mangé","mangeons","mangerons","mangions"],
 ["Demain, je ____ au marché.","irai","vais","allais","suis allé"],
 ["Quand j'étais petit, je ____ au foot tous les jours.","jouais","ai joué","jouerai","jouer"],
 ["Elles ____ très faim.","ont","sont","avons","ai"],
 ["À l'imparfait : « Nous ____ contents. »","étions","sommes","serons","étaient"],
 ["Futur de « faire » à la 1re personne du singulier :","je ferai","je faisais","je fais","je fis"],
 ["Impératif de « être » à la 2e personne du singulier :","sois","es","étais","seras"],
 ["Participe passé du verbe « prendre » :","pris","prit","prendu","prenu"],
 ["Participe passé du verbe « voir » :","vu","voyu","voyé","vois"],
 ["Participe passé du verbe « boire » :","bu","boit","buvé","boivu"],
 ["Présent de « aller » : « Ils ____ au champ. »","vont","allent","vais","va"],
 ["Présent de « pouvoir » : « Nous ____ venir. »","pouvons","pouvont","pouvez","peuvent"],
 ["Présent de « dire » : « Vous ____ la vérité. »","dites","disez","disent","dit"],
 ["Futur de « être » : « Tu ____ prêt demain. »","seras","serais","es","étais"],
 ["Passé composé : « Elle ____ au marché. »","est allée","a allé","est allé","a allée"]
]));

G('esynonymes','Synonymes','🟰','Langue & mots',60,'Associe chaque mot à un mot de sens proche.', EDU.pairs([
 ["Content","Heureux"],["Beau","Joli"],["Grand","Immense"],["Petit","Minuscule"],["Peur","Frayeur"],["Rapide","Véloce"],["Fatigué","Épuisé"],["Maison","Demeure"],
 ["Voiture","Automobile"],["Commencer","Débuter"],["Finir","Terminer"],["Regarder","Observer"],["Triste","Malheureux"],["Courageux","Brave"],["Intelligent","Malin"],["Difficile","Ardu"],["Ami","Camarade"]
]));

G('econtraires','Contraires','↔️','Langue & mots',200,'Associe chaque mot à son contraire.', EDU.pairs([
 ["Chaud","Froid"],["Grand","Petit"],["Haut","Bas"],["Rapide","Lent"],["Jour","Nuit"],["Ouvrir","Fermer"],["Monter","Descendre"],["Plein","Vide"],["Riche","Pauvre"],
 ["Facile","Difficile"],["Avant","Après"],["Début","Fin"],["Courageux","Peureux"],["Gentil","Méchant"],["Sec","Humide"],["Vrai","Faux"],["Fort","Faible"],["Joie","Tristesse"]
]));

G('eproverbes','Proverbes','📜','Langue & mots',30,'Termine le proverbe. Sagesse d\'Afrique et d\'ailleurs.', EDU.quiz([
 ["Petit à petit, ____","l'oiseau fait son nid","le lion fait sa tanière","la fourmi fait son chemin","l'éléphant fait sa route"],
 ["Qui ne risque rien ____","n'a rien","gagne tout","perd tout","dort bien"],
 ["L'union fait ____","la force","la paix","le bruit","le marché"],
 ["Chassez le naturel, ____","il revient au galop","il s'en va","il dort","il parle"],
 ["Tel père, ____","tel fils","tel ami","tel chef","tel voisin"],
 ["Après la pluie, ____","le beau temps","la grêle","le vent","la nuit"],
 ["Rien ne sert de courir, ____","il faut partir à point","il faut dormir","il faut sauter","il faut crier"],
 ["Mieux vaut tard que ____","jamais","tôt","souvent","beaucoup"],
 ["Qui sème le vent ____","récolte la tempête","récolte le blé","a chaud","s'envole"],
 ["L'habit ne fait pas ____","le moine","le chef","le riche","le marché"],
 ["Pierre qui roule ____","n'amasse pas mousse","fait du bruit","tombe toujours","va vite"],
 ["Il ne faut pas vendre la peau de l'ours ____","avant de l'avoir tué","avant la pluie","sans balance","au marché"],
 ["Proverbe africain : « Seul on va plus vite, ensemble ____ »","on va plus loin","on perd du temps","on se fatigue","on dort"],
 ["Proverbe africain : « Il faut tout un village pour ____ »","élever un enfant","construire un pont","trouver de l'eau","vendre du riz"],
 ["Proverbe : « C'est en forgeant ____ »","qu'on devient forgeron","qu'on devient riche","qu'on a chaud","qu'on fait du bruit"],
 ["Les petits ruisseaux font ____","les grandes rivières","les petites flaques","les grands lacs","les longs chemins"]
]));

G('eexpress','Expressions françaises','💬','Langue & mots',340,'Que veut dire vraiment cette expression ?', EDU.quiz([
 ["« Avoir le cafard » signifie…","Être triste","Avoir un insecte","Avoir faim","Être pressé"],
 ["« Poser un lapin » signifie…","Ne pas venir à un rendez-vous","Offrir un animal","Faire un cadeau","Cuisiner du lapin"],
 ["« Casser les pieds à quelqu'un » signifie…","Le déranger, l'ennuyer","Lui faire mal aux pieds","Lui offrir des chaussures","Le faire danser"],
 ["« Avoir un chat dans la gorge » signifie…","Avoir la voix enrouée","Aimer les chats","Avoir faim","Avoir peur"],
 ["« Tomber dans les pommes » signifie…","S'évanouir","Cueillir des fruits","Faire une chute de vélo","Se disputer"],
 ["« Coûter les yeux de la tête » signifie…","Coûter très cher","Faire mal aux yeux","Ne rien coûter","Être gratuit"],
 ["« Appeler un chat un chat » signifie…","Dire les choses franchement","Aimer les animaux","Se tromper de nom","Parler à voix basse"],
 ["« Avoir la main verte » signifie…","Savoir bien s'occuper des plantes","Avoir peint sa main","Être malade","Aimer le vert"],
 ["« Être dans la lune » signifie…","Être distrait","Voyager dans l'espace","Dormir dehors","Être très riche"],
 ["« Mettre son grain de sel » signifie…","Donner son avis sans qu'on le demande","Saler un plat","Cuisiner vite","Acheter du sel"],
 ["« Prendre ses jambes à son cou » signifie…","S'enfuir en courant","Se faire un massage","Faire du yoga","S'habiller vite"],
 ["« Avoir le cœur sur la main » signifie…","Être généreux","Être malade du cœur","Être timide","Avoir peur"],
 ["« Il pleut des cordes » signifie…","Il pleut très fort","Il y a du vent","Il pleut un peu","On vend des cordes"],
 ["« Être sur son 31 » signifie…","Être très bien habillé","Avoir 31 ans","Être en retard","Être fatigué"],
 ["« Marcher sur des œufs » signifie…","Avancer avec beaucoup de prudence","Casser des œufs","Faire une omelette","Courir vite"]
]));

G('eanglais','Anglais de tous les jours','🇬🇧','Langue & mots',230,'Associe chaque mot français à sa traduction anglaise.', EDU.pairs([
 ["Chat","Cat"],["Maison","House"],["Eau","Water"],["Merci","Thank you"],["Bonjour","Hello"],["Livre","Book"],["École","School"],["Ami","Friend"],["Pomme","Apple"],
 ["Voiture","Car"],["Rouge","Red"],["Manger","To eat"],["Nuit","Night"],["Famille","Family"],["Travail","Work"],["Soleil","Sun"],["Écrire","To write"],["Argent (monnaie)","Money"]
]));

G('eanglaispro','Anglais du travail','🏢','Langue & mots',215,'Les mots anglais à connaître pour chercher un emploi.', EDU.pairs([
 ["Entretien d'embauche","Job interview"],["Lettre de motivation","Cover letter"],["Curriculum vitæ","Resume"],["Salaire","Salary"],["Employeur","Employer"],["Employé","Employee"],
 ["Équipe","Team"],["Réunion","Meeting"],["Date limite","Deadline"],["Compétences","Skills"],["Expérience","Experience"],["Candidat","Candidate"],["Recrutement","Recruitment"],["Contrat","Contract"],["Congés","Time off"],["Chef, responsable","Manager"]
]));

G('emotsmetier','Mots du métier','🛠️','Langue & mots',25,'Retrouve le métier grâce à son indice et à ses lettres mélangées.', EDU.scramble([
 ['PLOMBIER','Il répare les tuyaux et les robinets'],['MACON','Il construit des murs'],['ELECTRICIEN','Il installe le courant et les lampes'],['MECANICIEN','Il répare les moteurs'],
 ['INFIRMIER','Il soigne les malades et fait les pansements'],['CHAUFFEUR','Il conduit des passagers ou des marchandises'],['COMPTABLE','Il tient les comptes d\'une entreprise'],
 ['SECRETAIRE','Elle organise les rendez-vous et le courrier'],['CUISINIER','Il prépare les repas au restaurant'],['COIFFEUSE','Elle coupe et coiffe les cheveux'],['COUTURIER','Il confectionne des vêtements'],
 ['MENUISIER','Il fabrique des meubles en bois'],['AGRICULTEUR','Il cultive la terre'],['ENSEIGNANT','Il apprend à lire et à compter aux élèves'],['SOUDEUR','Il assemble des pièces de métal'],
 ['GARDIEN','Il surveille et protège un lieu'],['VENDEUR','Il conseille et vend des produits'],['SERVEUR','Il apporte les plats aux clients'],['INGENIEUR','Il conçoit des machines ou des ouvrages'],
 ['PHARMACIEN','Il prépare et conseille les médicaments'],['LIVREUR','Il apporte les colis chez les clients'],['JARDINIER','Il entretient les plantes et les pelouses']
]));

G('eleoula','Le, la, un, une ?','🔠','Langue & mots',80,'Masculin ou féminin ? Choisis le bon petit mot.', EDU.duo([
 ["____ soleil brille aujourd'hui.","Le","La","~Soleil est un nom masculin."],
 ["____ lune éclaire la nuit.","La","Le","~Lune est un nom féminin."],
 ["____ table est dans la cuisine.","La","Le"],
 ["____ problème est résolu.","Le","La","~Problème est masculin, comme système ou théorème."],
 ["Nous traversons ____ mer.","la","le"],
 ["Il a écrit au ____ tableau.","le","la"],
 ["Il y a ____ arbre dans la cour.","un","une"],
 ["Je vois ____ étoile brillante.","une","un"],
 ["Elle mange ____ orange.","une","un"],
 ["Il utilise ____ ordinateur.","un","une"],
 ["Elle va dans ____ école.","une","un"],
 ["Nous habitons dans ____ village.","un","une"],
 ["Je bois de ____ eau.","l'","le","~Eau est féminin : « une eau », mais on dit « l'eau » devant une voyelle."],
 ["Ils visitent ____ île.","une","un","~Île est un nom féminin."],
 ["On cherche ____ hôtel.","un","une"],
 ["Il y a ____ erreur dans le texte.","une","un","~Erreur est féminin."],
 ["C'est ____ bon exemple.","un","une","~Exemple est masculin."],
 ["J'ai trouvé ____ insecte.","un","une","~Insecte est masculin."]
],{ n:12, time:10, how:'En français, chaque nom est masculin ou féminin. Choisis le bon petit mot (le/la, un/une) pour compléter chaque phrase. 12 phrases, 10 secondes chacune.' }));

/* ---------------------------------------------------------- SANTÉ & NATURE */
G('enutri','Groupes d\'aliments','🥗','Santé & nature',110,'Fruits, légumes, féculents ou protéines ? Range chaque aliment.', EDU.sort(['🍎 Fruits','🥬 Légumes','🍚 Féculents','🍗 Protéines'],[
 ["Mangue",0],["Banane douce",0],["Orange",0],["Papaye",0],["Ananas",0],["Goyave",0],["Pastèque",0],
 ["Carotte",1],["Épinards",1],["Chou",1],["Aubergine",1],["Gombo",1],["Haricots verts",1],["Salade",1],["Oignon",1],
 ["Riz",2],["Manioc",2],["Igname",2],["Pomme de terre",2],["Pain",2],["Pâtes",2],["Mil",2],["Maïs",2],["Patate douce",2],["Banane plantain",2],["Attiéké",2],
 ["Poisson",3],["Poulet",3],["Œuf",3],["Lentilles",3],["Bœuf",3],["Arachides",3],["Pois chiches",3]
]));

G('ehygiene','Hygiène et santé','🧼','Santé & nature',170,'Vrai ou faux ? Les bons réflexes pour rester en forme.', EDU.tf([
 ["Se laver les mains avec du savon aide à éviter la propagation des microbes.",true,"Il faut frotter au moins 20 secondes, entre les doigts et sous les ongles."],
 ["Un simple rinçage à l'eau suffit à éliminer tous les microbes des mains.",false,"Le savon est nécessaire pour décoller et éliminer les microbes."],
 ["Il faut se brosser les dents au moins deux fois par jour.",true,"Le matin et le soir, pendant environ deux minutes."],
 ["Les antibiotiques soignent les infections causées par des virus, comme la grippe.",false,"Les antibiotiques agissent seulement sur les bactéries, pas sur les virus."],
 ["Dormir suffisamment aide le corps et le cerveau à récupérer.",true,"Le sommeil aide à mémoriser, à grandir et à se défendre contre les maladies."],
 ["Les fruits et légumes font partie d'une alimentation équilibrée.",true,"Ils apportent des vitamines, des minéraux et des fibres."],
 ["On peut boire sans danger l'eau de n'importe quelle rivière.",false,"L'eau non traitée peut contenir des microbes dangereux. Il faut la filtrer ou la traiter."],
 ["Les moustiques peuvent transmettre le paludisme.",true,"Certains moustiques, les anophèles, transmettent le parasite du paludisme."],
 ["Dormir sous une moustiquaire aide à se protéger du paludisme.",true,"Surtout si elle est imprégnée d'insecticide et bien installée."],
 ["Le soleil ne peut jamais abîmer la peau.",false,"Trop de soleil provoque des coups de soleil. Chapeau, ombre et eau sont conseillés."],
 ["On doit couvrir sa bouche quand on tousse ou éternue.",true,"Avec un mouchoir ou le pli du coude, pour ne pas transmettre les microbes."],
 ["Les vaccins aident le corps à se préparer contre certaines maladies.",true,"Ils entraînent les défenses naturelles sans provoquer la maladie."],
 ["Un aliment tombé par terre reste propre si on le ramasse très vite.",false,"Les microbes se déposent immédiatement : il vaut mieux le laver ou le jeter."],
 ["Faire du sport régulièrement est bon pour le cœur.",true,"Une activité physique régulière protège le cœur et le moral."],
 ["Pour un médicament, il faut suivre les conseils du médecin ou du pharmacien.",true,"La dose et la durée du traitement comptent autant que le médicament."]
]));

G('esecours','Premiers secours','🩹','Santé & nature',0,'Les bons gestes de base en cas de petit accident (notions, pas une formation).', EDU.quiz([
 ["Devant une personne blessée, que faut-il vérifier d'abord ?","Que la zone est sûre pour soi et pour elle","Qu'elle a mangé","Qu'elle sait lire","Qu'il fait nuit"],
 ["En cas d'accident grave, qui faut-il alerter ?","Les secours (numéro d'urgence du pays)","Un voisin seulement","Personne","Le journal"],
 ["Pour une brûlure légère, que faire d'abord ?","La passer sous l'eau fraîche","Mettre du beurre","Mettre de l'huile","Percer les cloques","~L'eau fraîche (pas glacée) pendant plusieurs minutes calme la brûlure. Pas de beurre ni d'huile."],
 ["En cas de saignement de nez, la tête doit être…","Penchée légèrement vers l'avant","Renversée en arrière","Cachée sous une couverture","Secouée"],
 ["Pour arrêter le saignement d'une plaie, on…","Appuie fermement dessus avec un linge propre","Frotte la plaie","Met de la terre","Laisse saigner"],
 ["Que trouve-t-on dans une trousse de premiers secours ?","Compresses, désinfectant et pansements","Bonbons et jouets","Cuillères et assiettes","Piles et ampoules"],
 ["En cas de coup de chaleur, la personne doit être…","Mise à l'ombre et rafraîchie","Couverte d'une couverture chaude","Obligée de courir","Laissée au soleil"],
 ["Une personne inconsciente qui respire doit être placée…","En position latérale de sécurité (sur le côté)","Debout","Assise sur une chaise","Sur le ventre, bras en l'air"],
 ["Faut-il donner à boire à une personne inconsciente ?","Non, jamais","Oui, beaucoup","Seulement du sucre","Oui, de l'eau chaude"],
 ["Une petite flamme prend dans une casserole d'huile. Que faire ?","La couvrir avec un couvercle","Jeter de l'eau","Souffler dessus","La déplacer en courant","~L'eau sur l'huile enflammée provoque une grosse flamme dangereuse : il faut étouffer le feu."],
 ["En cas d'incendie dans un bâtiment, on…","Sort vite sans prendre l'ascenseur","Prend l'ascenseur","Se cache sous un lit","Ouvre toutes les fenêtres et reste"],
 ["Après une entorse de cheville, on pense à…","L'immobiliser et appliquer du froid (protégé)","Courir pour l'échauffer","La masser fort tout de suite","La tremper dans l'eau très chaude"]
],{ how:'Des notions de base pour réagir en cas de petit accident. Ce jeu ne remplace pas une formation aux premiers secours : en cas d\'urgence, appelle toujours les secours. 10 questions, 15 secondes chacune.' }));

G('evitamines','Vitamines et aliments','🍊','Santé & nature',35,'Quel aliment apporte quelle vitamine ou quel minéral ?', EDU.pairs([
 ["Vitamine C","Orange et citron"],["Vitamine A","Carotte"],["Calcium","Lait et yaourt"],["Fer","Lentilles"],["Vitamine D","Soleil"],["Oméga-3","Poissons gras"],
 ["Potassium","Banane"],["Fibres","Céréales complètes"],["Iode","Sel iodé"],["Magnésium","Arachides et noix"],["Protéines","Œufs et viande"],["Vitamine K","Épinards"],["Vitamine B12","Produits d'origine animale"]
]));
})();

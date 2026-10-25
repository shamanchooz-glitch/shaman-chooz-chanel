/* ==========================================================
   PUBS 9/10 — GOUVERNANTE DE DOMICILE & CUISINE (40 nouveaux diaporamas pubs avec ta photo)
   Partie 1 : la gouvernante de domicile résidentiel (organisation, équipe, budget, sécurité, confiance).
   Partie 2 : la cuisine de la maison (bases, plats du quotidien, hygiène, budget, repas des enfants).
   Rappel du message de SHAMAN CHOOZ : ménage, enfants et cuisine = un seul et même métier.
   Chaque diaporama = 4 écrans + 1 écran « appel à l'action » ajouté automatiquement, puis la page « Contactez-nous ».
   C(...) = pour les candidat(e)s • E(...) = pour les employeurs / familles
   Les identifiants commencent par « pk- ».
   ========================================================== */
(function(){
if(!window.SCCS) return;
let k = 3;
const PC = ["Postulez dès aujourd'hui","Inscrivez-vous maintenant","Votre place vous attend","Appelez-nous","Faites le premier pas"];
const PE = ["Parlons de votre besoin","Confiez-nous votre recherche","Contactez-nous","Un appel suffit","Recrutons ensemble"];
const C = (id,t,p,sl,cta)=> SCCS.add('pk-'+id, t, 'Agence', p, sl.concat([['📞', PC[k++ % PC.length], cta]]), { photo:true });
const E = (id,t,p,sl,cta)=> SCCS.add('pk-'+id, t, 'Agence', p, sl.concat([['📞', PE[k++ % PE.length], cta]]), { photo:true });

/* ---------- La gouvernante de domicile ---------- */
C('role-gouvernante',"Gouvernante de domicile : un métier de responsabilité",'or',[
 ['🏛️',"Le cœur de la maison","La gouvernante veille à ce que tout fonctionne : propreté, repas, enfants, personnel, courses."],
 ['📋',"Organiser et suivre","Elle prépare le planning, vérifie le travail et fait le lien avec l'employeur."],
 ['🧩',"Un même métier","Pour SHAMAN CHOOZ, ménage, enfants et cuisine se rejoignent : la gouvernante les coordonne."],
 ['🌟',"Un parcours possible","Beaucoup commencent par un poste simple et progressent avec l'expérience."]
],"Vous rêvez d'évoluer ? Parlons de votre parcours.");

C('equipe-maison',"Diriger une petite équipe à la maison",'bleu',[
 ['👥',"Répartir les tâches","Chacun doit savoir ce qu'il fait, à quelle heure et avec qui."],
 ['🗣️',"Des consignes claires","Parlez poliment, expliquez simplement, vérifiez que c'est compris."],
 ['🤝',"Respecter chaque personne","Une équipe respectée travaille avec plus de cœur."],
 ['👏',"Féliciter","Un mot d'encouragement vaut souvent plus qu'une critique."]
],"Vous avez le sens des responsabilités ? Rejoignez notre agence.");

C('planning-personnel',"Faire un planning clair pour la maison",'violet',[
 ['🗓️',"Un tableau de la semaine","Quelles tâches, quels jours, quelles heures, quelle personne ?"],
 ['⏱️',"Prévoir le temps","Tenez compte du temps réel que demande chaque tâche."],
 ['🔄',"Alterner","Alternez travaux lourds et tâches plus légères."],
 ['✅',"Ajuster","Si un planning ne marche pas, on le corrige ensemble."]
],"Organisée et méthodique ? Les familles vous cherchent.");

C('inventaire-maison',"Faire l'inventaire de la maison",'terre',[
 ['📝',"Noter ce qu'il y a","Vaisselle, linge, produits, appareils : une liste claire évite les pertes."],
 ['🔎',"Vérifier régulièrement","Un contrôle régulier permet de voir ce qui manque ou s'abîme."],
 ['📦',"Ranger par catégories","Plus c'est bien rangé, plus c'est facile à retrouver."],
 ['🗣️',"Informer l'employeur","Dites ce qu'il faut racheter avant la rupture."]
],"Précise et rigoureuse ? Inscrivez-vous à notre agence.");

C('budget-maison',"Gérer le budget de la maison avec rigueur",'turquoise',[
 ['💰',"L'argent de la famille","Quand on gère les courses, on gère de l'argent qui n'est pas le sien : c'est une grande confiance."],
 ['🧾',"Garder les tickets","Notez et conservez les justificatifs."],
 ['📊',"Comparer les prix","Marché, boutique, grande surface : cherchez le meilleur rapport qualité-prix."],
 ['🗣️',"Rendre des comptes","Un petit récapitulatif régulier rassure l'employeur."]
],"Honnête et organisée ? Une famille a besoin de vous.");

C('marche-fournisseurs',"Bien acheter : marché et fournisseurs",'vert',[
 ['🛒',"Faire une liste","Évitez les achats inutiles : partez avec une liste."],
 ['👀',"Vérifier la fraîcheur","Poisson, viande, légumes : regardez, sentez, choisissez avec soin."],
 ['🤝',"De bonnes relations","Avec des vendeurs de confiance, vous gagnez en qualité et en prix."],
 ['❄️',"Rentrer vite","Les produits frais doivent aller au frais sans traîner."]
],"Vous savez faire les courses ? Contactez-nous.");

C('accueil-visiteur',"Accueillir un visiteur avec élégance",'rose',[
 ['🚪',"Un accueil chaleureux","Saluez avec le sourire, proposez de l'eau ou une boisson."],
 ['👔',"Une tenue soignée","Une tenue propre inspire confiance."],
 ['📞',"Prévenir la famille","Annoncez le visiteur avant de le faire entrer."],
 ['🔒',"Rester prudente","Ne donnez pas d'informations privées à un inconnu."]
],"Accueillante et sérieuse ? Rejoignez notre agence.");

C('gestion-linge-maison',"Gérer le linge de maison",'bleu',[
 ['🛏️',"Draps, serviettes, nappes","Chaque pièce a son linge : comptez-le, entretenez-le, rangez-le."],
 ['🔁',"Un roulement","Alternez les jeux de draps pour qu'ils s'usent moins vite."],
 ['🧼',"Taches et réparations","Traitez les taches vite et recousez les petits accrocs."],
 ['📋',"Savoir ce qui manque","Une liste du linge évite les mauvaises surprises."]
],"Soigneuse avec le linge ? Faites-le savoir.");

C('pannes-signaler',"Signaler les petites pannes à temps",'orange',[
 ['🔧',"Voir avant la grosse panne","Robinet qui fuit, prise qui chauffe, porte qui grince : agir vite coûte moins cher."],
 ['📸',"Décrire clairement","Dites ce qui se passe, depuis quand, et à quel endroit."],
 ['⚠️',"Sécurité d'abord","Ne touchez pas à l'électricité sans être sûre."],
 ['📞',"Appeler la bonne personne","Électricien, plombier ou employeur : suivez le circuit prévu."]
],"Vous avez l'œil pour la maison ? Inscrivez-vous.");

C('recevoir-artisan',"Recevoir un artisan chez la famille",'nuit',[
 ['🛠️',"Accueillir poliment","Demandez son nom, l'objet de sa visite et vérifiez avec l'employeur."],
 ['👀',"Rester présente","Accompagnez-le sans le gêner, surtout dans les pièces privées."],
 ['🧹',"Protéger la maison","Couvrez les meubles et ouvrez le chemin."],
 ['📝',"Rendre compte","Dites à l'employeur ce qui a été fait."]
],"Responsable et vigilante ? Rejoignez-nous.");

C('securite-residence',"Sécurité d'une résidence : bons réflexes",'rouge',[
 ['🔐',"Fermer systématiquement","Portes, fenêtres, portail : prenez l'habitude."],
 ['🚫',"Pas d'inconnus","Ne faites pas entrer quelqu'un sans accord."],
 ['📵',"Ne rien divulguer","Ne parlez pas des horaires de la famille à des inconnus."],
 ['📞',"Numéros utiles","Gardez à portée les numéros de la famille et des secours."]
],"Vigilante et fiable : voilà ce que les familles cherchent.");

C('gerer-conflits',"Régler un conflit calmement",'violet',[
 ['🕊️',"Respirer d'abord","Ne réagissez pas dans la colère : attendez d'être calme."],
 ['👂',"Écouter les deux côtés","Un désaccord vient souvent d'un malentendu."],
 ['🗣️',"Parler des faits","Dites ce qui s'est passé, sans insulter."],
 ['🤝',"Chercher une solution","Proposez un arrangement raisonnable pour tous."]
],"Savoir dialoguer est une force. Rejoignez notre agence.");

C('former-nouvelle',"Accueillir et former une nouvelle employée",'turquoise',[
 ['🌱',"Une première journée douce","Présentez la maison, la famille et les consignes importantes."],
 ['👀',"Montrer, puis laisser faire","Faites ensemble la première fois, puis observez."],
 ['💬',"Encourager les questions","Mieux vaut demander que se tromper."],
 ['🏅',"Prendre le temps","Une bonne formation évite beaucoup de problèmes ensuite."]
],"Vous savez transmettre votre expérience ? Contactez-nous.");

C('rapport-hebdo',"Un petit rapport par semaine",'or',[
 ['📄',"Ce qui a été fait","Courses, entretien, rendez-vous, réparations."],
 ['⚠️',"Ce qui pose problème","Un produit épuisé, une panne, une difficulté avec un enfant."],
 ['📌',"Ce qu'il faut décider","Proposez des solutions pour faciliter le choix de l'employeur."],
 ['🤝',"La confiance grandit","Un suivi régulier rassure et valorise votre travail."]
],"Rigoureuse et claire : un atout recherché. Inscrivez-vous.");

E('residence-secondaire',"Une résidence secondaire bien gardée",'terre',[
 ['🏡',"Elle vit même en votre absence","Aération, jardin, linge, sécurité : une résidence demande un suivi régulier."],
 ['🔑',"Une personne de confiance","Un gardien ou une gouvernante peut veiller sur les lieux."],
 ['📋',"Des consignes écrites","Visites, contrôles, contacts utiles : tout est noté."],
 ['📞',"Nous vous présentons des profils","Parlons de vos besoins pour cette mission."]
],"Confiez-nous la recherche. Appelez notre agence.");

E('quand-recruter-gouvernante',"Quand recruter une gouvernante ?",'bleu',[
 ['🏠',"Une grande maison","Plusieurs pièces, plusieurs personnes, beaucoup de tâches à suivre."],
 ['👥',"Du personnel à coordonner","Une personne de confiance peut organiser et superviser."],
 ['⏳',"Vous manquez de temps","Une gouvernante vous permet de vous concentrer sur votre famille et votre travail."],
 ['🔍',"Nous cherchons le bon profil","Expérience, caractère, disponibilités : nous vous accompagnons dans le choix."]
],"Une gouvernante pour votre maison ? Parlons-en.");

/* ---------- La cuisine ---------- */
C('riz-reussi',"Réussir le riz, simplement",'orange',[
 ['🍚',"Bien le laver","Rincez le riz à l'eau claire pour enlever l'excès d'amidon."],
 ['💧',"Le bon dosage","Respectez la quantité d'eau : le riz doit être cuit, jamais collé."],
 ['🔥',"Feu doux","Couvrez et laissez cuire doucement sans soulever sans cesse le couvercle."],
 ['🍽️',"Servir chaud","Aérez à la fourchette pour un riz léger et bien détaché."]
],"Vous cuisinez avec soin ? Les familles vous attendent.");

C('bases-sauces',"Les bases d'une bonne sauce",'rouge',[
 ['🧅',"Commencer par les arômes","Oignon, ail, piment, selon les goûts de la famille."],
 ['🍅',"Cuire lentement","Une sauce prend du goût quand elle mijote."],
 ['🧂',"Assaisonner par étapes","Goûtez, ajustez, recommencez."],
 ['👶',"Adapter pour les enfants","Moins de piment et moins de sel pour les petits, selon les consignes des parents."]
],"Le goût de votre cuisine peut vous ouvrir des portes. Contactez-nous.");

C('soupes-legumes',"Une bonne soupe de légumes",'vert',[
 ['🥕',"Des légumes lavés","Lavez, épluchez si besoin et coupez en morceaux égaux."],
 ['🍲',"Cuisson douce","Ajoutez d'abord ce qui cuit lentement, puis le reste."],
 ['🧂',"Peu de sel","On peut toujours en rajouter à table."],
 ['🍽️',"Un repas complet","Avec du pain ou du riz, c'est nourrissant et économique."]
],"Cuisine saine et économique : un vrai atout. Inscrivez-vous.");

C('poisson-frais',"Choisir et préparer le poisson frais",'turquoise',[
 ['🐟',"Reconnaître la fraîcheur","Œil brillant, chair ferme, bonne odeur de mer."],
 ['❄️',"Garder au froid","Le poisson ne doit pas rester longtemps hors du frais."],
 ['🧼',"Bien nettoyer","Lavez le poisson, la planche et le couteau après usage."],
 ['🔥',"Bien cuire","Une cuisson complète protège la santé de la famille."]
],"Vous maîtrisez la cuisine du poisson ? Faites-le savoir.");

C('poulet-cuisson',"Cuire le poulet à cœur",'orange',[
 ['🍗',"Une viande à cuire entièrement","Le poulet ne doit pas rester rose à l'intérieur."],
 ['🔪',"Planche séparée","Utilisez une planche et un couteau pour la viande crue, puis lavez-les."],
 ['🧼',"Se laver les mains","Après avoir touché de la viande crue, on lave ses mains et le plan de travail."],
 ['🥗',"Accompagner","Légumes, riz ou plantain : un repas équilibré."]
],"La bonne cuisine est une affaire de sérieux. Rejoignez-nous.");

C('haricots-legumineuses',"Haricots et légumineuses : nourrissants et économiques",'terre',[
 ['🫘',"De la force pour pas cher","Haricots, lentilles, pois : ils rassasient et nourrissent."],
 ['💧',"Les faire tremper","Un trempage permet de gagner du temps et de mieux les cuire."],
 ['🍲',"Bien cuire","Ils doivent être tendres, jamais durs."],
 ['😋',"Les associer","Avec du riz, du plantain ou du pain, c'est un repas complet."]
],"Cuisine simple, goût généreux. Inscrivez-vous.");

C('feculents-locaux',"Igname, manioc, banane plantain : les bons féculents",'or',[
 ['🍠',"Des aliments d'énergie","Ils donnent de la force pour la journée."],
 ['🔪',"Bien éplucher et laver","Une bonne préparation est la clé d'un plat réussi."],
 ['🔥',"Cuire correctement","Bouilli, frit ou pilé : suivez les habitudes de la maison."],
 ['⚖️',"Varier les repas","Associez-les à des légumes, du poisson, de la viande ou des légumineuses."]
],"Vous connaissez la cuisine d'ici et d'ailleurs ? Contactez-nous.");

C('petit-dejeuner',"Le petit-déjeuner de la famille",'rose',[
 ['🌅',"Bien démarrer","Un petit-déjeuner donne l'énergie du matin, surtout aux enfants."],
 ['🥖',"Simple et varié","Pain, bouillie, fruits, œufs : on alterne selon les goûts."],
 ['⏰',"Préparer à l'avance","Une table dressée la veille fait gagner du temps."],
 ['😊',"Une ambiance douce","Un matin calme met toute la famille de bonne humeur."]
],"Vous préparez bien le matin ? Les familles vous attendent.");

C('bouillies-purees',"Bouillies et purées pour les petits",'bleu',[
 ['🥣',"Texture adaptée","Plus lisse pour les plus petits, plus épaisse en grandissant."],
 ['🧼',"Hygiène très stricte","Mains, casseroles et cuillères impeccables."],
 ['🌡️',"Vérifier la température","Goûtez ou testez avant de servir pour éviter les brûlures."],
 ['👪',"Suivre les consignes","Les parents et le médecin décident des aliments à donner."]
],"Soigneuse avec les petits ? Rejoignez notre agence.");

C('boissons-maison',"Des boissons maison propres et fraîches",'turquoise',[
 ['🍹',"Fruits frais","Bien lavés, ils donnent de bonnes boissons maison."],
 ['🚰',"Eau potable","Utilisez toujours de l'eau propre, bouillie ou filtrée si besoin."],
 ['🧊',"Garder au frais","Une boisson chaude et sucrée tourne vite dans la chaleur."],
 ['🍬',"Peu de sucre","C'est meilleur pour la santé des enfants et des adultes."]
],"Vous aimez préparer de bonnes choses ? Parlons-en.");

C('menu-semaine',"Planifier le menu de la semaine",'violet',[
 ['📆',"Penser à l'avance","Un menu évite le stress du « qu'est-ce qu'on mange ? »."],
 ['🥦',"Varier","Légumes, féculents, protéines : chaque jour un peu de tout."],
 ['🛒',"Faire une liste","Les courses deviennent plus rapides et moins coûteuses."],
 ['🗣️',"Demander l'avis de la famille","Chacun aime sentir que ses goûts comptent."]
],"Organisée en cuisine ? Les familles recrutent. Inscrivez-vous.");

C('cuisine-petit-budget',"Bien manger avec un petit budget",'nuit',[
 ['💶',"Acheter de saison","Les produits de saison sont meilleurs et moins chers."],
 ['🍲',"Cuisiner des plats complets","Un plat unique bien préparé nourrit toute la famille."],
 ['♻️',"Ne rien gaspiller","Utilisez les restes dans une autre recette."],
 ['🤝',"Dialoguer avec l'employeur","Parlez du budget et des priorités pour bien organiser les courses."]
],"Ingénieuse et économe : un grand talent. Rejoignez-nous.");

C('couteau-securite',"Manier un couteau en sécurité",'rouge',[
 ['🔪',"Un couteau bien aiguisé","Un couteau qui coupe bien glisse moins."],
 ['🪵',"Une planche stable","Posez un torchon humide dessous pour éviter qu'elle glisse."],
 ['🖐️',"Les doigts rentrés","Guidez l'aliment avec les doigts repliés."],
 ['👶',"Hors de portée des enfants","Rangez les couteaux en hauteur, jamais à portée des petits."]
],"La sécurité en cuisine, c'est un réflexe. Contactez notre agence.");

C('epices-equilibre',"Assaisonner avec équilibre",'orange',[
 ['🌶️',"Goûter avant d'ajouter","Les épices se dosent peu à peu."],
 ['🧂',"Le sel avec mesure","Trop de sel fatigue : mieux vaut en mettre peu."],
 ['🌿',"Des herbes pour le goût","Persil, ail, gingembre, thym : ils parfument sans excès."],
 ['👶',"Les enfants d'abord","Servez-leur une portion peu épicée, si les parents le souhaitent."]
],"Vous savez parfumer un plat ? Inscrivez-vous.");

C('plats-sans-viande',"Des plats sans viande, riches en goût",'vert',[
 ['🥬',"Légumes et légumineuses","Ils peuvent être savoureux et nourrissants."],
 ['🥚',"Œufs, poisson, fromage","Selon les habitudes de la famille."],
 ['🍽️',"Respecter les choix","Certaines familles ne mangent pas de viande, ou pas de porc : posez la question."],
 ['😊',"Le plaisir d'abord","Un plat bien préparé plaît à tous."]
],"Vous respectez les habitudes de chaque famille ? Rejoignez-nous.");

C('regime-famille',"Respecter le régime d'un membre de la famille",'turquoise',[
 ['📋',"Demander clairement","Qui ne peut pas manger quoi ? Pourquoi ? Pendant combien de temps ?"],
 ['⚕️',"Suivre les consignes du médecin","On n'improvise jamais un régime."],
 ['🍽️',"Préparer à part si besoin","Éviter les mélanges avec les aliments interdits."],
 ['⚠️',"Prudence sur les allergies","En cas de doute, ne servez pas et demandez."]
],"Attentive et rigoureuse en cuisine ? Les familles vous attendent.");

C('repas-emporter',"Préparer un repas à emporter",'bleu',[
 ['🍱',"Un repas pratique","Pour l'école ou le travail, il doit rester bon et sûr."],
 ['🧊',"Garder la fraîcheur","Boîte propre et bien fermée, éviter les aliments qui tournent vite."],
 ['🧼',"Hygiène","Mains propres et récipients lavés."],
 ['🙂',"Penser au plaisir","Un petit mot ou une couleur en plus font toujours plaisir."]
],"Vous pensez à tout ? Voilà ce qui plaît aux familles.");

C('patisserie-simple',"Beignets et gâteaux simples",'rose',[
 ['🍩',"Un plaisir à partager","Un gâteau fait maison réchauffe les cœurs."],
 ['⚖️',"Bien mesurer","En pâtisserie, les quantités comptent."],
 ['🔥',"Surveiller la cuisson","L'huile chaude et le four demandent toute votre attention."],
 ['👶',"Éloigner les enfants","Pas d'enfant près de l'huile ou du four chaud."]
],"Vous avez des recettes qui plaisent ? Faites-le savoir.");

C('plat-fete',"Un plat de fête sans stress",'or',[
 ['🎉',"S'y prendre à l'avance","Préparez les courses et ce qui peut l'être la veille."],
 ['📝',"Un plan minute par minute","Notez les heures pour chaque étape."],
 ['👥',"Demander de l'aide","Il y a toujours quelque chose à confier à quelqu'un."],
 ['🍽️',"Servir avec fierté","La présentation donne de la valeur à votre travail."]
],"Les familles recrutent avant les fêtes. Contactez-nous.");

C('ranger-cuisine',"Ranger placards, épices et ustensiles",'terre',[
 ['🗄️',"Chaque chose à sa place","On gagne du temps quand on sait où est tout."],
 ['🏷️',"Étiqueter","Épices, farines, riz : une étiquette évite les confusions."],
 ['📅',"Vérifier les dates","Les produits périmés doivent être retirés."],
 ['🧼',"Un nettoyage régulier","Placards propres, moins d'insectes."]
],"Une cuisine organisée est une cuisine agréable. Rejoignez-nous.");

C('plats-autres-pays',"Apprendre les plats d'autres pays",'nuit',[
 ['🌍',"Un monde de saveurs","Chaque pays a ses recettes, ses épices et ses habitudes."],
 ['📖',"Apprendre avec curiosité","Demandez à la famille de vous expliquer ses plats préférés."],
 ['👩‍🍳',"S'adapter","Les familles apprécient qu'on essaie de refaire leurs plats."],
 ['✈️',"Une ouverture sur le monde","Notre agence met en relation employeurs et employés de nombreux pays."]
],"Curieuse et ouverte ? Rejoignez notre agence.");

C('assiette-presentee',"Présenter une assiette avec goût",'violet',[
 ['🍽️',"On mange d'abord avec les yeux","Un plat bien présenté donne envie."],
 ['🎨',"Des couleurs","Un peu de vert, de rouge, de jaune : le plat est plus joli."],
 ['🧼',"Un bord propre","Essuyez le bord de l'assiette avant de servir."],
 ['😊',"Servir avec le sourire","Un bon service complète un bon repas."]
],"Le soin du détail fait la différence. Contactez-nous.");

C('cuisiner-avec-enfants',"Cuisiner avec les enfants : jeu et sécurité",'orange',[
 ['👧',"Des petites tâches","Laver les fruits, remuer, verser avec aide : chaque enfant peut participer."],
 ['🔥',"Loin du feu","Plaques, huile et couteaux restent réservés aux adultes."],
 ['🤗',"Un moment de complicité","Cuisiner ensemble crée des souvenirs."],
 ['🧩',"Enfants et cuisine réunis","Encore un exemple : pour SHAMAN CHOOZ, tout est un seul métier."]
],"Vous aimez partager la cuisine avec les enfants ? Inscrivez-vous.");

C('economie-combustible',"Cuisiner en économisant gaz, charbon et électricité",'vert',[
 ['🔥',"Couvrir les casseroles","Un couvercle réduit le temps de cuisson et l'énergie utilisée."],
 ['🥘',"Préparer avant d'allumer","Légumes lavés et coupés, ingrédients prêts : le feu ne brûle pas pour rien."],
 ['🍲',"Cuire plusieurs choses ensemble","Utilisez la chaleur au maximum quand c'est possible."],
 ['⚠️',"Toujours en sécurité","Éteignez bien, ne laissez jamais le feu sans surveillance, éloignez les enfants."]
],"Économe et prudente ? Les familles apprécient. Rejoignez-nous.");
})();

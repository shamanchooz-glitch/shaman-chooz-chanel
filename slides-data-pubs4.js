/* ==========================================================
   PUBS 4/5 — MONDE ENTIER + TOUS LES SECTEURS (40 diaporamas pubs avec ta photo)
   20 diaporamas « partout dans le monde » (mise en relation internationale, départ en sécurité, papiers, contrat)
   et 20 diaporamas « tous les secteurs » (restauration, hôtellerie, commerce, sécurité, transport, bâtiment…).
   ========================================================== */
(function(){
if(!window.SCCS) return;
let k = 4;
const PC = ["Postulez dès aujourd'hui","Inscrivez-vous maintenant","Votre place vous attend","Appelez-nous","Faites le premier pas"];
const PE = ["Parlons de votre besoin","Confiez-nous votre recherche","Contactez-nous","Un appel suffit","Recrutons ensemble"];
const C = (id,t,p,sl,cta)=> SCCS.add('pd-'+id, t, 'Agence', p, sl.concat([['📞', PC[k++ % PC.length], cta]]), { photo:true });
const E = (id,t,p,sl,cta)=> SCCS.add('pd-'+id, t, 'Agence', p, sl.concat([['📞', PE[k++ % PE.length], cta]]), { photo:true });

/* ---------- Partout dans le monde ---------- */
E('monde-entier',"Employeurs et employés : partout dans le monde",'bleu',[
 ['🌍',"Un seul réseau","Moi, SHAMAN CHOOZ, je mets en relation les employeurs et les employés dans tous les pays du monde."],
 ['🏠',"Pour les maisons","Fille de ménage, nounou, servante de maison, gouvernante, cuisinier : des profils pour chaque famille."],
 ['🏢',"Pour les entreprises","Commerces, hôtels, restaurants, bureaux, chantiers : tous les secteurs ont besoin de bras."],
 ['🤝',"Un lien de confiance","Notre rôle : rapprocher les bonnes personnes, avec des échanges clairs."]
],"Où que vous soyez, parlons de votre projet.");

C('tous-pays',"Votre talent peut voyager dans tous les pays",'turquoise',[
 ['🧳',"Sans frontières","Les familles et les entreprises recherchent du personnel sur tous les continents."],
 ['🌟',"Votre savoir-faire","Ménage, enfants, cuisine, commerce, sécurité : ces compétences sont demandées partout."],
 ['📚',"Se préparer","Bien comprendre le poste, le pays et les conditions avant de décider."],
 ['🛂',"Dans le respect des lois","Un départ réussi se prépare avec des papiers en règle."]
],"Parlez-nous de votre projet, nous vous guidons.");

C('afrique-opportunites',"Afrique : des opportunités près de chez vous",'vert',[
 ['🌍',"Travailler sur le continent","Dans beaucoup de villes africaines, les familles et les entreprises recrutent."],
 ['🚌',"Plus proche, plus simple","Travailler dans la région facilite souvent le voyage, la langue et les démarches."],
 ['🏘️',"Rester près des siens","Une place proche de la famille permet de garder le contact."],
 ['🎯',"Choisir selon vos besoins","Ville, pays, secteur : dites-nous ce que vous préférez."]
],"Votre prochaine place est peut-être plus proche que vous ne le pensez.");

E('quatre-continents',"Afrique, Europe, Amérique, Asie : un seul réseau",'violet',[
 ['🗺️',"Plusieurs continents","Les besoins en personnel de maison et en personnel d'entreprise existent partout."],
 ['🔄',"Des échanges","Employeurs d'un côté, candidats de l'autre : nous aidons à les relier."],
 ['🕐',"Des fuseaux différents","Nous organisons des échanges à distance, par téléphone ou en visioconférence."],
 ['✅',"Une démarche claire","Chaque étape est expliquée aux deux parties."]
],"Employeur ou candidat, rejoignez le réseau SHAMAN CHOOZ.");

C('papiers-regle',"Passeport et papiers en règle",'terre',[
 ['🛂',"Un passeport valide","Vérifiez sa date de validité avant de penser à un départ."],
 ['📄',"Les documents du pays","Chaque pays a ses règles : informez-vous auprès des autorités officielles."],
 ['📁',"Des copies","Gardez des copies de vos papiers, séparées des originaux."],
 ['🛡️',"Toujours dans la légalité","Un voyage légal vous protège, vous et votre famille."]
],"Avant de partir, informez-vous bien. Notre agence vous conseille.");

C('visa-permis',"Visa et permis de travail : toujours en règle",'nuit',[
 ['📑',"Deux choses à vérifier","Pouvez-vous entrer dans le pays ? Pouvez-vous y travailler légalement ?"],
 ['🏛️',"Les sources officielles","Ambassades, consulats et ministères sont les bonnes sources d'information."],
 ['🚫',"Se méfier des raccourcis","Un faux papier ou un passage illégal peut vous causer de graves problèmes."],
 ['🤝',"Un employeur sérieux","Un employeur honnête respecte la loi et vous aide dans les démarches."]
],"Une démarche légale est une démarche sûre. Parlons-en.");

C('contrat-avant-depart',"Le contrat avant le départ",'or',[
 ['✍️',"Toujours un contrat","Ne partez jamais sans avoir lu et compris les conditions de travail."],
 ['📋',"Ce qu'il doit dire","Missions, horaires, salaire, repos, logement, durée et droits."],
 ['🗣️',"Dans une langue comprise","Demandez une explication si quelque chose n'est pas clair."],
 ['📦',"Garder son exemplaire","Conservez une copie sur vous et une copie auprès d'un proche."]
],"Un contrat clair, c'est un départ serein. Contactez notre agence.");

C('fausses-offres',"Attention aux fausses offres d'emploi",'rouge',[
 ['⚠️',"Les arnaques existent","Certaines personnes publient de fausses offres pour tromper ceux qui cherchent du travail."],
 ['🚩',"Signes d'alerte","Salaire trop beau pour être vrai, pas de contrat, pression pour partir vite."],
 ['🔍',"Vérifier","Demandez le nom de l'employeur, son adresse, et cherchez des avis."],
 ['🛑',"Dans le doute, stoppez","Parlez-en à un proche et à des personnes de confiance avant tout départ."]
],"Soyez vigilant. Une offre sérieuse supporte les questions.");

C('trop-argent',"Méfiez-vous de ceux qui demandent trop d'argent",'rouge',[
 ['💸',"Une règle de prudence","Un recruteur sérieux explique clairement chaque frais, s'il y en a."],
 ['🧾',"Un reçu pour tout paiement","Ne payez jamais sans reçu écrit mentionnant clairement la raison du paiement."],
 ['🤨',"Les promesses magiques","Si on vous promet un travail garanti contre de l'argent immédiat, restez prudent."],
 ['🗣️',"Posez des questions","Un vrai professionnel répond sans se fâcher."]
],"Chez SHAMAN CHOOZ, la transparence est une règle. Posez-nous toutes vos questions.");

C('garder-passeport',"Gardez toujours votre passeport",'bleu',[
 ['🛂',"Votre document personnel","Votre passeport vous appartient : personne n'a le droit de le garder à votre place."],
 ['🚫',"Refuser la confiscation","Si un employeur le réclame, c'est un signal d'alerte."],
 ['🔐',"Un endroit sûr","Gardez-le en sécurité et gardez-en une copie sur votre téléphone."],
 ['📞',"Demander de l'aide","Si votre passeport vous est retiré, contactez immédiatement votre ambassade."]
],"Votre liberté commence par vos papiers. Informez-vous avec notre agence.");

C('famille-informee',"Informez toujours votre famille",'rose',[
 ['👨‍👩‍👧',"Ne partez jamais dans le secret","Vos proches doivent savoir où vous allez et avec qui."],
 ['📍',"Donner les détails","Nom de l'employeur, adresse, numéro de téléphone, date du départ."],
 ['📲',"Rester en contact","Appelez régulièrement pour donner de vos nouvelles."],
 ['🆘',"En cas de souci","Votre famille pourra réagir vite et alerter les bonnes personnes."]
],"Un départ bien partagé est un départ plus sûr. Parlons-en.");

C('verifier-employeur',"Vérifier son futur employeur",'violet',[
 ['🔎',"Se renseigner","Qui est-il ? Où habite-t-il ? Qui peut vous parler de lui ?"],
 ['🗣️',"Un échange direct","Demandez à lui parler par téléphone ou en visio avant de vous décider."],
 ['👀',"Les signes de sérieux","Il répond clairement, propose un contrat et respecte la loi."],
 ['📝',"Garder les preuves","Conservez les messages et les promesses faites par écrit."]
],"Choisir un employeur de confiance, c'est choisir son avenir. Nous vous aidons.");

C('culture-adapter',"S'adapter à une nouvelle culture",'orange',[
 ['🌏',"Chaque pays est différent","Nourriture, politesse, horaires, façons de parler : tout peut changer."],
 ['👂',"Observer et écouter","Les premières semaines, regardez beaucoup et demandez des explications."],
 ['🤝',"Respecter sans se perdre","Respectez les habitudes locales tout en gardant votre dignité et vos valeurs."],
 ['😊',"Rester ouvert","La curiosité est la meilleure alliée de celui qui voyage."]
],"Un bon départ passe par une bonne préparation. Contactez notre agence.");

C('langue-pays',"Apprendre la langue du pays",'turquoise',[
 ['🗣️',"La clé de l'intégration","Parler la langue du pays vous aide à travailler, à vous faire des amis et à vous sentir bien."],
 ['📱',"Commencer avant de partir","Applications, vidéos, cours en ligne : quelques mots par jour suffisent."],
 ['📖',"Les mots du quotidien","Bonjour, merci, s'il vous plaît, combien, où : un petit vocabulaire utile."],
 ['🎧',"Écouter beaucoup","Chansons, radios et films aident à s'habituer aux sons."]
],"Apprenez aujourd'hui, voyagez demain. Parlez-nous de votre projet.");

C('comprendre-salaire-etranger',"Comprendre son salaire à l'étranger",'or',[
 ['💱',"Monnaie et change","Comprenez la valeur de la monnaie du pays avant de comparer les salaires."],
 ['🏠',"Le coût de la vie","Logement, repas, transport : calculez ce qu'il vous restera chaque mois."],
 ['📊',"Comparer honnêtement","Un salaire élevé dans un pays cher n'est pas toujours meilleur qu'un salaire modeste ailleurs."],
 ['✍️',"Tout par écrit","Montants, date de paiement, retenues éventuelles : tout doit être clair."]
],"Faites vos comptes avant de décider. Notre agence vous accompagne.");

C('envoyer-argent-securite',"Envoyer de l'argent à sa famille en sécurité",'vert',[
 ['📲',"Services reconnus","Utilisez des services de transfert officiels, connus et sécurisés."],
 ['🧾',"Garder les preuves","Reçus et messages de confirmation protègent en cas de problème."],
 ['👤',"Informer le destinataire","Prévenez toujours la personne qui reçoit pour éviter les erreurs."],
 ['🔒',"Ne donnez jamais vos codes","Vos codes secrets ne se communiquent à personne, jamais."]
],"Gagner de l'argent, c'est bien. Le protéger, c'est mieux. Contactez-nous.");

C('prevoir-retour',"Prévoir son retour et son avenir",'terre',[
 ['🔙',"Penser au retour","Même loin, gardez en tête ce que vous voulez faire en revenant."],
 ['🏗️',"Construire un projet","Maison, terrain, petite entreprise : votre travail à l'étranger peut financer vos rêves."],
 ['🏦',"Mettre de côté","Une épargne régulière rend le retour plus facile."],
 ['🤝',"Garder le contact","Restez en lien avec votre agence et votre réseau."]
],"Un bon départ est celui qui prépare le retour. Parlons de votre avenir.");

E('recruter-a-distance',"Employeur à l'étranger : recruter à distance",'nuit',[
 ['💻',"Recruter sans se déplacer","Appels, visioconférences et messages permettent de choisir sans voyager."],
 ['📋',"Un dossier clair","Nous vous présentons les profils avec leurs expériences et disponibilités."],
 ['🤝',"Un accord précis","Missions, salaire, conditions : tout est écrit avant l'arrivée."],
 ['🌐',"Un partenaire fiable","SHAMAN CHOOZ rapproche employeurs et employés dans tous les pays du monde."]
],"Recrutez malin, recrutez sans frontière. Contactez notre agence.");

C('entretien-visio',"Entretien en visioconférence : mode d'emploi",'bleu',[
 ['📹',"Préparer l'endroit","Choisissez un lieu calme, bien éclairé, avec une bonne connexion."],
 ['📱',"Vérifier le matériel","Téléphone chargé, micro et caméra testés quelques minutes avant."],
 ['😊',"Regarder la caméra","Souriez, parlez lentement et regardez devant vous."],
 ['📝',"Avoir de quoi noter","Un petit carnet pour écrire les informations importantes."]
],"Un entretien à distance, c'est possible. Nous vous préparons.");

/* ---------- Tous les secteurs ---------- */
E('secteur-restauration',"Restaurants : serveurs, cuisiniers, plongeurs",'orange',[
 ['🍽️',"Un secteur qui recrute","Restaurants, maquis et traiteurs ont besoin de personnel motivé tout au long de l'année."],
 ['👨‍🍳',"En cuisine","Cuisiniers, commis, plongeurs : des postes pour tous les niveaux."],
 ['🛎️',"En salle","Serveurs, hôtes, barmen : sourire et rapidité sont essentiels."],
 ['🧼',"L'hygiène d'abord","Propreté et respect des règles : la base d'un bon restaurant."]
],"Vous recrutez pour votre restaurant ? Nous cherchons les bons profils.");

E('secteur-hotellerie',"Hôtels : réception, étages, bagagistes",'violet',[
 ['🏨',"L'accueil d'abord","Réceptionnistes, agents d'accueil et standardistes donnent la première image de l'hôtel."],
 ['🛏️',"Les étages","Femmes de chambre et gouvernantes d'étage font briller les chambres."],
 ['🧳',"Les bagagistes","Un bon accueil commence par un bon coup de main."],
 ['🌟',"Un service de qualité","Un personnel formé et souriant fait revenir les clients."]
],"Hôtel, auberge ou résidence : parlons de vos besoins en personnel.");

E('secteur-commerce',"Boutiques et supermarchés : vendeurs, caissiers",'rouge',[
 ['🛍️',"Le commerce bouge","Boutiques, marchés, supérettes et supermarchés recrutent régulièrement."],
 ['💳',"Caissiers","Honnêteté, rapidité et sourire sont les maîtres mots."],
 ['🏷️',"Vendeurs et conseillers","Savoir accueillir, conseiller et fidéliser les clients."],
 ['📦',"Magasiniers","Réception, rangement et inventaire : un poste clé dans tout commerce."]
],"Votre commerce a besoin d'une équipe fiable ? Contactez-nous.");

E('secteur-securite',"Sécurité : gardiens et agents",'nuit',[
 ['🛡️',"Protéger les lieux","Maisons, entreprises, boutiques et chantiers ont besoin de gardiens attentifs."],
 ['👀',"Vigilance","Rondes, contrôle des entrées, surveillance : un travail de sérieux et de concentration."],
 ['🤝',"Courtoisie","Un bon agent est ferme et poli à la fois."],
 ['📋',"Rapports clairs","Noter ce qui s'est passé et alerter en cas de besoin."]
],"Vous cherchez un gardien de confiance ? Nous vous présentons des candidats.");

E('secteur-transport',"Chauffeurs et livreurs",'bleu',[
 ['🚗',"Conduire avec sérieux","Chauffeurs de famille, d'entreprise ou de taxi : prudence et ponctualité."],
 ['🏍️',"Livraison","Coursiers à moto ou à vélo : rapidité, honnêteté et respect du code de la route."],
 ['🧭',"Connaître la ville","Bien connaître les routes évite les retards et les détours."],
 ['🪪',"Permis en règle","Un conducteur sérieux possède toujours des papiers valides."]
],"Chauffeur ou livreur, trouvez votre place avec notre agence.");

E('secteur-btp',"Bâtiment : maçons, peintres, électriciens",'terre',[
 ['🏗️',"Construire","Les chantiers recrutent des maçons, ferrailleurs, carreleurs et manœuvres."],
 ['🎨',"Finitions","Peintres, plâtriers et menuisiers donnent le dernier éclat aux maisons."],
 ['⚡',"Électricité et plomberie","Des techniciens qualifiés pour les installations et dépannages."],
 ['🦺',"Sécurité sur le chantier","Casque, chaussures et consignes : la sécurité d'abord."]
],"Chantiers petits ou grands : nous cherchons vos équipes.");

E('secteur-beaute',"Beauté : coiffeurs et esthéticiennes",'rose',[
 ['💇',"Coiffure","Coiffeurs et coiffeuses recherchés pour salons et domiciles."],
 ['💅',"Esthétique","Manucure, soins du visage, massages : un secteur en croissance."],
 ['🧴',"Hygiène","Matériel désinfecté et produits de qualité : l'image d'un bon salon."],
 ['😍',"Accueil client","Savoir écouter pour satisfaire chaque client."]
],"Salon de beauté ? Parlons de vos besoins en personnel.");

E('secteur-sante',"Santé : aides-soignants et auxiliaires",'turquoise',[
 ['🏥',"Prendre soin des autres","Cliniques, maisons de retraite et familles cherchent des auxiliaires de soin."],
 ['💗',"Patience et respect","Un métier qui demande de l'écoute et de la douceur."],
 ['🧼',"Hygiène stricte","Mains propres, matériel propre et gestes sûrs."],
 ['📚',"Des compétences","Diplômes ou formations utiles pour exercer en toute sécurité."]
],"Santé et aide à la personne : nous cherchons des profils sérieux.");

E('secteur-bureaux',"Bureaux : secrétaires et agents d'accueil",'or',[
 ['💼',"Le visage de l'entreprise","Secrétaires et agents d'accueil donnent la première impression."],
 ['📞',"Répondre au téléphone","Politesse, clarté et efficacité : les trois piliers."],
 ['🗂️',"Organisation","Classer, planifier, suivre les dossiers : un poste clé."],
 ['💻',"Bureautique","Maîtriser un ordinateur est un grand atout."]
],"Votre entreprise recrute ? Nous cherchons votre prochain collaborateur.");

E('secteur-entretien-locaux',"Entretien des bureaux et des locaux",'vert',[
 ['🏢',"Des lieux propres","Bureaux, écoles, boutiques et ateliers ont besoin d'un entretien régulier."],
 ['🧹',"Des équipes organisées","Une équipe d'entretien bien coordonnée travaille vite et bien."],
 ['🧴',"Les bons produits","Chaque surface a son produit : vitres, sols, sanitaires, mobilier."],
 ['⏰',"Horaires flexibles","Matin tôt ou soir : nous nous adaptons à votre activité."]
],"Des locaux impeccables, une équipe fiable. Parlons de votre besoin.");

E('secteur-agricole',"Agriculture : ouvriers agricoles",'terre',[
 ['🌾',"La terre nourrit","Plantations, fermes et maraîchages recherchent des bras toute l'année."],
 ['🚜',"Plusieurs postes","Ouvriers, conducteurs d'engins, techniciens, surveillants de plantation."],
 ['☀️',"Un travail exigeant","Courage, endurance et sens du travail en équipe."],
 ['🌱',"Un secteur d'avenir","Nourrir la population restera toujours une priorité."]
],"Vous gérez une exploitation ? Nous cherchons vos futurs ouvriers.");

E('secteur-usine',"Usine et production",'nuit',[
 ['🏭',"Des chaînes de production","Opérateurs, manutentionnaires et contrôleurs qualité sont toujours recherchés."],
 ['🦺',"Respecter les consignes","Équipement de protection et règles de sécurité sont obligatoires."],
 ['⏱️',"Travailler en équipe","Ponctualité et esprit d'équipe font avancer la production."],
 ['📈',"Évoluer","Un bon opérateur peut devenir chef d'équipe."]
],"Votre usine recrute ? Nous présentons des profils motivés.");

E('secteur-evenementiel',"Événements : traiteurs, animateurs, hôtes",'violet',[
 ['🎊',"Réussir un événement","Mariages, conférences, concerts et soirées demandent une grosse organisation."],
 ['🍴',"Traiteurs et serveurs","Un service rapide et soigné fait toute la différence."],
 ['🎤',"Animateurs et DJ","De l'ambiance pour que chacun profite."],
 ['🧑‍🤝‍🧑',"Hôtes et hôtesses","Accueillir, orienter, renseigner les invités."]
],"Un événement en préparation ? Nous formons votre équipe.");

E('secteur-jardinage',"Jardiniers et paysagistes",'vert',[
 ['🌳',"Des espaces verts","Villas, hôtels et entreprises veulent des jardins bien entretenus."],
 ['✂️',"Taille et entretien","Tondre, tailler, arroser et planter avec méthode."],
 ['🌺',"Un œil créatif","Choisir les plantes et organiser les espaces avec goût."],
 ['💧',"Économiser l'eau","Arroser au bon moment, avec la bonne quantité."]
],"Un jardin qui respire, une équipe qui travaille bien. Contactez-nous.");

E('secteur-couture',"Couture et mode",'rose',[
 ['🧵',"Du fil à l'aiguille","Couturières et tailleurs créent et retouchent pour les familles et les boutiques."],
 ['👗',"La mode","Stylistes, modélistes, vendeurs de tissus : un secteur riche en talents."],
 ['📏',"La précision","Mesurer, couper, assembler : la qualité fait la réputation."],
 ['🎓',"Se former","Un bon atelier est aussi une bonne école."]
],"Atelier de couture ou boutique de mode ? Parlons de vos recrutements.");

E('secteur-mecanique',"Mécaniciens et techniciens",'bleu',[
 ['🔧',"Réparer et entretenir","Garages, ateliers et entreprises cherchent des mécaniciens compétents."],
 ['🔌',"Techniciens","Climatisation, froid, électricité auto, électronique : des métiers très demandés."],
 ['🧰',"Les bons outils","Un bon technicien prend soin de son matériel."],
 ['📈',"Un métier d'avenir","Les besoins en réparation ne diminuent jamais."]
],"Un atelier à renforcer ? Nous cherchons le bon technicien.");

E('secteur-numerique',"Informatique et numérique",'nuit',[
 ['💻',"Le numérique partout","Entreprises, écoles et commerces ont besoin de compétences informatiques."],
 ['🌐',"Sites et réseaux","Développeurs, techniciens réseau, community managers : des profils recherchés."],
 ['🛠️',"Dépannage","Un bon technicien informatique est précieux pour chaque entreprise."],
 ['🎯',"Travailler à distance","Beaucoup de postes peuvent se faire de n'importe quel pays."]
],"Votre entreprise a besoin de compétences numériques ? Contactez notre agence.");

E('secteur-tous',"Tous les secteurs, un seul numéro",'or',[
 ['🌐',"Un partenaire unique","Domestique, urbain, commercial : nous couvrons tous les secteurs d'activité."],
 ['🧩',"Un seul interlocuteur","Un seul appel pour les besoins de la maison comme ceux de l'entreprise."],
 ['🌍',"Partout dans le monde","Nous rapprochons employeurs et employés dans tous les pays."],
 ['🚀',"Prêt à avancer","Dites-nous ce que vous cherchez et nous commençons."]
],"Tous les secteurs, tous les pays, un seul numéro. Appelez-nous.");

E('secteur-education',"Soutien scolaire et enseignement à domicile",'bleu',[
 ['📚',"Aider les enfants à réussir","Beaucoup de parents cherchent un répétiteur ou une répétitrice pour leurs enfants."],
 ['✏️',"Plusieurs matières","Français, mathématiques, anglais, sciences : chaque matière a ses besoins."],
 ['🧑‍🏫',"Patience et méthode","Expliquer calmement et encourager : la clé de la réussite d'un élève."],
 ['🏠',"À domicile","Le cours à la maison rassure l'enfant et facilite l'organisation de la famille."]
],"Besoin d'un répétiteur ? Ou envie d'enseigner ? Parlons-en.");

E('secteur-petits-metiers',"Petits métiers urbains : tout le monde a sa place",'terre',[
 ['🏙️',"La ville vit de ses métiers","Lavandières, coursiers, vendeurs, livreurs, cireurs, réparateurs : la ville a besoin de tous."],
 ['🧑‍🔧',"Des savoir-faire utiles","Chaque petit métier rend un grand service aux habitants."],
 ['📈',"Des débuts modestes","Beaucoup d'entrepreneurs ont commencé par un petit métier bien fait."],
 ['🤝',"Un coup de pouce","Nous aidons à relier ces talents aux personnes qui en ont besoin."]
],"Votre petit métier mérite une grande clientèle. Contactez-nous.");

E('secteur-tourisme',"Tourisme : guides, chauffeurs, accompagnateurs",'turquoise',[
 ['🧭',"Faire découvrir un pays","Guides et accompagnateurs font aimer les lieux qu'ils connaissent."],
 ['🚐',"Transport touristique","Chauffeurs de minibus et de taxis : sécurité et accueil."],
 ['🗣️',"Parler plusieurs langues","Les touristes apprécient les personnes qui parlent leur langue."],
 ['📸',"Une belle image","Un bon accueil laisse un souvenir qui revient en conseils et en nouveaux visiteurs."]
],"Vous travaillez dans le tourisme ? Parlons de vos recrutements.");
})();

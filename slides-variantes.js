/* ==========================================================
   VARIANTES DE TEXTES — SHAMAN CHOOZ CHANEL
   Rôle : éviter que la même phrase revienne dans des dizaines de diaporamas.
   Les phrases de conclusion, d'appel à l'action et de présentation de l'agence qui étaient recopiées à l'identique
   sont remplacées ici par plusieurs formulations différentes, distribuées dans l'ORDRE DE DIFFUSION de la boucle :
   deux passages proches dans le temps n'ont donc pas la même phrase.
   Ce fichier se charge APRÈS tous les slides-data-*.js (voir index.html). Il ne supprime aucun diaporama.
   Pour changer ou ajouter une phrase : modifie les listes ci-dessous (garde les guillemets et les virgules).
   Chaque variante = [ émoji, titre, texte ].
   ========================================================== */
(function(){
'use strict';
if(!window.SCCS || !SCCS.rebuild || !SCCS.playlist) return;

const POOLS = {

/* « Ménage, enfants, cuisine : un seul métier » — le message de SHAMAN CHOOZ, dit de 28 façons */
UNSEUL: [
 ['🧩',"Un seul métier","Pour SHAMAN CHOOZ, faire le ménage, s'occuper des enfants et cuisiner, c'est un seul et même travail."],
 ['🏡',"Toute la maison","Ménage, enfants, repas : une bonne employée de maison sait tout faire, et c'est un seul métier."],
 ['👶',"Enfants et maison","Veiller sur les enfants et garder la maison propre vont ensemble : c'est le même travail."],
 ['🍲',"La cuisine aussi","Préparer le repas de la famille fait partie du même métier que le ménage et les enfants."],
 ['💬',"SHAMAN CHOOZ le dit","Fille de ménage, nounou, servante, gouvernante : nous disons que c'est un même travail à respecter."],
 ['🤲',"Un travail qui compte","Grâce à ce travail, des familles vivent mieux et des enfants grandissent en sécurité."],
 ['📣',"Valorisons ce métier","Le travail domestique mérite le respect, comme tous les autres métiers."],
 ['🧹',"Un même savoir-faire","Nettoyer, rassurer un enfant, servir un bon plat : ces gestes demandent le même sérieux et le même cœur."],
 ['🌅',"Du matin au soir","De la première tâche au dernier rangement, la maison vit grâce à une personne attentive."],
 ['🌿',"Le cœur de la maison","Quand la maison est propre, les enfants rassurés et le repas prêt, toute la famille respire."],
 ['🎯',"Pas de petit travail","Il n'y a pas de petit travail à la maison : chaque geste compte pour le confort de la famille."],
 ['🧺',"Tout se tient","Le linge propre, le repas chaud et l'enfant en sécurité dépendent les uns des autres : c'est un seul travail."],
 ['💡',"Notre conviction","Selon SHAMAN CHOOZ, séparer le ménage, les enfants et la cuisine n'a pas de sens : c'est une même mission."],
 ['🌍',"Un métier universel","Partout dans le monde, des personnes prennent soin d'une maison : ce métier mérite la même considération."],
 ['🤝',"Respect des deux côtés","Un employeur qui respecte son employée de maison, et une employée qui travaille bien : voilà la base."],
 ['🧸',"Prendre soin","Prendre soin de la maison, des enfants et des repas, c'est prendre soin de la famille tout entière."],
 ['🔑',"Une confiance totale","On confie sa maison, ses enfants et sa cuisine : ce travail demande confiance et honnêteté."],
 ['🛠️',"Un vrai métier","Le travail domestique s'apprend, se perfectionne et mérite d'être reconnu comme un vrai métier."],
 ['🌺',"Fierté du travail bien fait","Une maison accueillante et des enfants heureux : voilà la fierté d'une employée de maison."],
 ['📖',"Apprendre chaque jour","On progresse en ménage, en cuisine et auprès des enfants : c'est un même métier qui s'apprend toute la vie."],
 ['⚖️',"Le même respect","Pour SHAMAN CHOOZ, aucune tâche de la maison ne vaut moins qu'une autre : toutes méritent le même respect."],
 ['🕊️',"Une maison paisible","Une maison bien tenue, des enfants soignés, des repas préparés : voilà le calme qu'apporte ce travail."],
 ['📞',"Des familles comptent sur vous","Chaque jour, des familles font confiance à des personnes de maison sérieuses, courageuses et dynamiques."],
 ['🌱',"Un métier qui ouvre des portes","Une employée de maison fiable est souvent recommandée : le sérieux ouvre de nouvelles chances."],
 ['🍽️',"À table !","Faire à manger, c'est aussi ranger, nettoyer et veiller sur les petits : tout se tient dans une maison."],
 ['🏅',"Un travail digne","Ménage, enfants, cuisine : un travail digne, utile, qui fait vivre des familles entières."],
 ['🧭',"Une même direction","Ménage, enfants ou repas : on poursuit toujours le même but, le bien-être de la maison."],
 ['✨',"Un métier à valoriser","Disons-le ensemble : être employée de maison est un vrai métier, à respecter et à valoriser."]
],

/* La cuisine, un métier qui mérite le respect */
CUISINE: [
 ['👩',"La cuisine, un beau métier","Faire à manger pour une famille est un travail qui mérite le respect."],
 ['🍲',"Merci à celles et ceux qui cuisinent","Chaque jour, ils font vivre les familles avec des repas préparés avec soin."],
 ['🔥',"Derrière chaque repas","Derrière chaque repas, quelqu'un a lavé, coupé, surveillé la cuisson et servi : merci à lui."],
 ['🥘',"Un savoir-faire précieux","Réussir un plat pour toute une famille demande de l'organisation, de la propreté et du cœur."],
 ['🧂',"Le goût du travail bien fait","Un bon repas, c'est l'équilibre des saveurs, la patience et l'attention de celui qui cuisine."],
 ['🍚',"Nourrir une famille","Préparer à manger chaque jour pour les siens ou pour les autres est une vraie responsabilité."],
 ['👏',"Respect aux cuisiniers","Cuisinière de maison, cuisinier de restaurant : tous méritent notre estime et notre merci."],
 ['⏰',"Se lever pour les autres","Beaucoup de cuisiniers commencent tôt pour que le repas soit prêt à l'heure : leur travail compte."],
 ['🧼',"Propreté et sérieux","Mains lavées, ustensiles propres, aliments bien cuits : bien cuisiner, c'est aussi protéger la santé."],
 ['🌶️',"Un métier qui se transmet","Les recettes de famille passent de génération en génération : la cuisine est un trésor."],
 ['🍽️',"Du plaisir partagé","Un repas bien préparé rapproche : on se retrouve, on se parle, on se sent bien."],
 ['👨',"Cuisiner, c'est un métier","Préparer les repas d'une famille demande du savoir-faire, de la propreté et de l'organisation."],
 ['🙏',"Un travail à respecter","Celles et ceux qui font à manger pour les autres méritent notre respect et notre merci."],
 ['🌟',"La cuisine qui fait vivre","Un cuisinier sérieux fait vivre sa famille et rend heureux ceux qu'il nourrit."]
],

/* Présentation de l'agence */
ACTIVITES: [
 ['🌍',"Nos activités dans le monde","SHAMAN CHOOZ recrute et place du personnel de maison et d'autres métiers, dans tous les secteurs, partout dans le monde."],
 ['🤝',"SHAMAN CHOOZ recrute et place","Notre agence rapproche les familles et les personnes de maison, dans tous les secteurs."],
 ['🗺️',"Des besoins partout","Familles, hôtels, commerces, entreprises : des employeurs cherchent du personnel sérieux dans de nombreux pays."],
 ['🔗',"Employeurs et employés","Nous mettons en relation ceux qui cherchent du personnel et ceux qui cherchent un emploi, où qu'ils soient."],
 ['🏢',"Tous les secteurs","Maison, cuisine, sécurité, commerce, bâtiment, santé : nous recrutons et plaçons dans tous les domaines."],
 ['📱',"Le monde à portée de téléphone","Un message suffit pour présenter votre besoin ou votre profil à notre agence."],
 ['🌐',"Sans frontières","Notre agence travaille avec des employeurs et des candidats de plusieurs pays."],
 ['💼',"Des profils variés","Domestiques, urbains, commerciaux : nous accompagnons des personnes aux parcours très différents."],
 ['🏠',"De la maison à l'entreprise","Des particuliers aux sociétés, nous répondons à chaque besoin en personnel avec sérieux."],
 ['🚀',"Nous recrutons","Honnêtes, sérieux, courageux, dynamiques : ce sont les qualités que nous cherchons chez chaque candidat."],
 ['📋',"Prestations de services","Recrutement, placement, mise en relation : notre agence vous accompagne pas à pas."],
 ['🤲',"Une agence à l'écoute","Que vous cherchiez un emploi ou du personnel, nous prenons le temps d'écouter votre demande."],
 ['🌟',"Un engagement","Chaque dossier est étudié avec sérieux : nous ne promettons ni visa, ni salaire, ni emploi garanti."],
 ['🎯',"Mise en relation","Nous présélectionnons les candidatures et les demandes pour proposer les meilleures rencontres."]
],

/* Promotion de la chaîne */
CHAINE: [
 ['📺',"Une chaîne du monde entier","Des vidéos tournent 24h/24 : cuisines du monde, repas, goûters et métiers. Partagez la chaîne !"],
 ['📚',"Une chaîne pour apprendre","Géographie, culture générale, recettes et astuces tournent 24h/24. Partagez la chaîne !"],
 ['👪',"Une chaîne pour toute la famille","Recettes, astuces et savoirs tournent 24h/24. Partagez la chaîne avec vos proches !"],
 ['🔁',"Toujours en direct","La chaîne ne s'arrête jamais : jour et nuit, de nouvelles vidéos s'enchaînent."],
 ['📲',"Regardez où vous voulez","Sur votre téléphone, à la maison ou en route : la chaîne est toujours à portée de main."],
 ['💡',"Apprendre chaque jour","Une idée, une astuce, une recette, un métier : chaque vidéo vous apprend quelque chose."],
 ['📢',"Faites-la connaître","Parlez de la chaîne à vos voisins, vos amis, vos collègues : plus on est nombreux, mieux c'est."],
 ['🌙',"Jour et nuit","Même la nuit, la chaîne continue : retrouvez-nous à tout moment de la journée."],
 ['🧠',"Des vidéos utiles","Cuisine, santé, métiers, culture : des sujets variés pour chaque membre de la famille."],
 ['🎬',"Un programme qui change","Les vidéos se suivent et ne se ressemblent pas : revenez plusieurs fois par jour."],
 ['🤗',"Pour tous les âges","Des enfants aux grands-parents, chacun trouve des vidéos qui l'intéressent."],
 ['💬',"Dites-nous ce que vous aimez","Votre avis nous aide à choisir de nouveaux sujets : écrivez-nous."],
 ['🔔',"Restez avec nous","Gardez la chaîne allumée : la prochaine vidéo commence dans quelques instants."],
 ['🌍',"Une communauté","Des spectateurs de nombreux pays suivent la chaîne : bienvenue dans la famille !"]
],

APPRENDRE: [
 ['🌱',"Apprendre fait grandir","Chaque jour, une petite connaissance de plus : pour les enfants comme pour les grandes personnes."],
 ['📖',"Curieux de tout","Poser des questions, chercher, comprendre : la curiosité fait avancer à tout âge."],
 ['🧩',"Petit à petit","Une nouvelle idée chaque jour, et en un an on en sait beaucoup plus."],
 ['🔭',"Ouvrir son esprit","Découvrir un pays, une histoire, un métier : c'est voir le monde un peu plus grand."],
 ['👪',"Apprendre ensemble","Regarder en famille, en parler à table : on retient mieux quand on partage."],
 ['💡',"Le savoir est une richesse","Ce que l'on apprend reste avec nous, et personne ne peut nous l'enlever."],
 ['🗣️',"Parlez-en","Racontez à quelqu'un ce que vous venez d'apprendre : c'est la meilleure façon de s'en souvenir."],
 ['🎓',"Jamais trop tard","On peut apprendre à tout âge : un enfant, un parent, un grand-père, tous gagnent à découvrir."]
],

/* Appel à l'action — candidats */
CTA_CAND: [
 ['✍️',"Inscrivez-vous maintenant","Inscrivez-vous : nous étudions chaque dossier sérieusement."],
 ['🙋',"Postulez dès aujourd'hui","Parlez-nous de votre projet. Nous cherchons avec vous."],
 ['🚪',"Votre place vous attend","Appelez l'agence, nous répondons à vos questions."],
 ['👣',"Faites le premier pas","Nous vous écoutons et nous vous guidons pas à pas."],
 ['📞',"Appelez-nous","Un conseil, une orientation : contactez SHAMAN CHOOZ."],
 ['🌅',"Votre avenir commence ici","Faites le premier pas : appelez-nous."],
 ['📝',"Présentez votre profil","Dites-nous ce que vous savez faire et ce que vous cherchez : nous étudions votre demande."],
 ['🤲',"Nous vous écoutons","Chaque parcours compte : racontez-nous le vôtre, en toute honnêteté."],
 ['💪',"Osez candidater","Un peu de courage, un dossier honnête, et l'agence vous accompagne dans vos démarches."],
 ['📲',"Un message suffit","Écrivez ou appelez l'agence : nos coordonnées sont à la fin de cette vidéo."],
 ['🌍',"Où que vous soyez","Candidates et candidats de tous les pays peuvent s'inscrire auprès de l'agence."],
 ['🔎',"On cherche pour vous","Nous étudions votre profil et cherchons des offres qui peuvent lui correspondre."],
 ['⭐',"Montrez ce que vous valez","Sérieux, ponctualité, envie d'apprendre : voilà ce que les employeurs regardent."],
 ['🧭',"Besoin d'un conseil ?","Une orientation, une question sur les démarches : l'agence est là pour répondre."],
 ['🎒',"Prêt à commencer ?","Préparez votre CV, vos références, et contactez SHAMAN CHOOZ."],
 ['🔥',"Lancez-vous","Le travail bien fait ouvre des portes : présentez-vous à l'agence dès aujourd'hui."],
 ['🕊️',"En toute confiance","Vos informations sont traitées avec discrétion et sérieux."],
 ['🏁',"C'est le moment","Chaque jour compte : contactez l'agence et parlez-nous de votre situation."],
 ['👥',"Avec vous, pas à pas","De la première prise de contact au placement éventuel, nous restons à l'écoute."],
 ['📣',"Parlez-en autour de vous","Une amie, un voisin, un cousin cherche un travail ? Dites-lui de contacter l'agence."]
],

/* Appel à l'action — employeurs */
CTA_EMP: [
 ['🗣️',"Parlons de votre besoin","Dites-nous ce que vous cherchez, nous cherchons avec vous."],
 ['📂',"Confiez-nous votre recherche","Décrivez votre besoin, nous cherchons le bon profil."],
 ['📞',"Contactez-nous","Famille, hôtel, commerce : appelez l'agence."],
 ['☎️',"Un appel suffit","Nous étudions votre demande avec sérieux."],
 ['🤝',"Recrutons ensemble","Un appel suffit pour commencer."],
 ['🏢',"Entreprises et particuliers","Quelle que soit votre taille, dites-nous qui vous cherchez : nous étudions chaque demande."],
 ['📋',"Un besoin précis ?","Missions, horaires, lieu : précisez-les, nous cherchons des candidats vérifiés."],
 ['⏱️',"Gagnez du temps","Nous présélectionnons les candidatures pour vous éviter des recherches interminables."],
 ['🔍',"Des profils vérifiés","Expérience, références, sérieux : nous contrôlons avant de vous présenter quelqu'un."],
 ['🌍',"Où que vous soyez","Employeurs de tous les pays : contactez l'agence, nos coordonnées suivent cette vidéo."]
],

/* Cuisine (agence « cp ») */
CTA_CP: [
 ['📞',"Contactez SHAMAN CHOOZ","Familles et employeurs, dites-nous ce que vous cherchez. Candidates, inscrivez-vous : nous étudions chaque dossier sérieusement."],
 ['📲',"Un message suffit","Employeurs, décrivez votre besoin. Candidats, présentez votre profil : l'agence vous répond."],
 ['🤝',"Mettons-nous en relation","Vous cherchez une cuisinière, ou un emploi de cuisinière ? Écrivez-nous, nous étudions votre demande."],
 ['🍳',"Une cuisinière de confiance ?","Familles, hôtels, restaurants : dites-nous qui vous cherchez. Candidates, présentez-vous."],
 ['🙋',"Vous savez cuisiner ?","Inscrivez-vous à l'agence : nous écoutons votre parcours et vos objectifs, sans promesse irréaliste."],
 ['📋',"Décrivez votre besoin","Horaires, repas à préparer, lieu : plus votre demande est claire, mieux nous trouvons le bon profil."],
 ['🌍',"Où que vous soyez","Familles et candidates de tous les pays : contactez l'agence, nous vous répondons."],
 ['☎️',"Appelez l'agence","Une question sur le placement ou le recrutement ? Nos coordonnées sont juste après ce diaporama."],
 ['✍️',"Inscrivez-vous","Un dossier clair, des informations vraies, un peu de motivation : c'est ce qu'il faut pour commencer."],
 ['🎯',"Passez à l'action","Employeurs, candidats : le premier pas, c'est un message. Retrouvez nos contacts à la fin de la vidéo."]
],

SAVOIR_CP: [
 ['🏡',"Un savoir-faire de la maison","Savoir cuisiner les plats de sa famille ou de son pays est un vrai atout pour travailler dans une maison."],
 ['🍲',"Des plats qui font la différence","Maîtriser quelques bonnes recettes de base rassure les familles qui recrutent."],
 ['🧼',"Cuisiner proprement","Hygiène, rangement, cuissons maîtrisées : ce sont des qualités très appréciées en cuisine."],
 ['🧂',"Savoir doser","Un repas réussi demande de goûter, d'ajuster et de ne pas gaspiller."],
 ['📋',"Organiser les repas","Prévoir les courses, planifier les menus et respecter les horaires : cela fait partie du métier."],
 ['🌍',"Plusieurs cuisines","Connaître des plats de différents pays est un plus pour travailler avec des familles variées."],
 ['🥗',"Des repas équilibrés","Un féculent, une source de protéines et des légumes : une base simple pour bien nourrir une famille."],
 ['⏱️',"Gérer son temps","Une bonne cuisinière organise ses cuissons pour que tout soit prêt en même temps."],
 ['🤲',"Respecter les goûts","Chaque famille a ses habitudes : une bonne cuisinière écoute et s'adapte."],
 ['🎓',"Toujours apprendre","Essayer de nouvelles recettes et demander conseil aide à progresser en cuisine."]
],

/* Métiers : fiches « agence » (ag), « Et toi ? » (m), « Ton placement » (q), « Besoin de ce profil ? » (qz), « Vrai ! » (vf) */
AGENCE: [
 ['🏢',"Passer par une agence","Nous présélectionnons des candidats sérieux et nous suivons le placement avec toi."],
 ['🤝',"Pourquoi une agence ?","Une agence présélectionne, vérifie les références et vous fait gagner du temps."],
 ['🔎',"Des candidats vérifiés","Avant de vous présenter un profil, nous contrôlons l'expérience et le sérieux."],
 ['📞',"Un seul interlocuteur","Vous expliquez votre besoin une fois : nous nous occupons de chercher et de présélectionner."],
 ['⏳',"Moins d'attente","Nous gérons les candidatures pour que vous receviez seulement les profils qui conviennent."],
 ['🛡️',"Plus de confiance","Un candidat présenté par une agence a déjà passé une première vérification."],
 ['📋',"Un suivi après le placement","Nous restons disponibles après le début du travail, au cas où une question se pose."],
 ['🧭',"Un avis pour décider","Nous vous conseillons sur le profil et les conditions pour éviter les malentendus."],
 ['🌍',"Partout dans le monde","Notre agence travaille avec des employeurs et des candidats de plusieurs pays."],
 ['✅',"Confiez-nous la recherche","Dites-nous le métier, les horaires et le lieu : nous cherchons avec vous."]
],
ETOI: [
 ['🙋',"Et toi ?","Ce métier t'intéresse ? Apprends auprès d'un professionnel et construis ton expérience pas à pas."],
 ['🌱',"Envie d'apprendre ?","Observe, pose des questions et entraîne-toi : chaque jour te rend un peu meilleur dans ce métier."],
 ['🎯',"Pourquoi pas toi ?","Avec du sérieux et de la patience, tu peux apprendre ce métier et progresser."],
 ['🎓',"Trouve un guide","Un professionnel expérimenté peut t'apprendre les bons gestes et t'éviter des erreurs."],
 ['📚',"Commence petit","Apprends d'abord les bases, puis prends de la confiance : tout le monde a débuté ainsi."],
 ['💪',"Du courage","Un métier s'apprend avec du courage, de la ponctualité et l'envie de bien faire."],
 ['🔍',"Renseigne-toi","Avant de te lancer, parle à des personnes qui font ce métier pour savoir à quoi t'attendre."],
 ['📝',"Prépare ton parcours","Note ce que tu sais déjà faire : c'est le début d'un bon dossier de candidature."],
 ['🕐',"Prends ton temps","Choisir un métier mérite réflexion : informe-toi, essaie, puis décide."],
 ['🚀',"Passe à l'action","Si ce métier te plaît, commence à t'entraîner dès aujourd'hui."]
],
PLACEMENT: [
 ['🤝',"Ton placement","Notre agence t'aide à trouver des offres adaptées à ton profil."],
 ['📋',"Ton dossier","Prépare un CV clair et des références vraies : nous étudions ton dossier avec sérieux."],
 ['🔎',"Des offres adaptées","Nous cherchons des employeurs qui correspondent à ton expérience et à ta disponibilité."],
 ['🤲',"Une mise en relation","Quand une offre convient, nous organisons la rencontre avec l'employeur."],
 ['📞',"Reste joignable","Garde ton téléphone chargé : l'agence peut t'appeler pour un entretien."],
 ['🧭',"Un conseil, une orientation","Une question sur ton projet ? Contacte l'agence, nous t'orientons."],
 ['🌍',"Partout dans le monde","Les offres que nous recevons viennent de plusieurs pays : présente-toi."],
 ['✅',"Sans fausse promesse","Nous ne promettons ni emploi garanti ni salaire : nous étudions ton profil sérieusement."],
 ['📈',"Un suivi","Après le placement, nous restons disponibles pour t'écouter si besoin."],
 ['✍️',"Inscris-toi","Un dossier honnête et de la motivation : c'est le bon début."]
],
BESOIN: [
 ['🏢',"Besoin de ce profil ?","Notre agence recrute et place des candidats vérifiés dans ce métier."],
 ['📞',"Vous cherchez ?","Décrivez-nous le poste : nous cherchons des candidats dans ce métier."],
 ['🔎',"Des candidats sérieux","Nous présélectionnons selon l'expérience, les références et la motivation."],
 ['⏱️',"Gagnez du temps","Nous traitons les candidatures pour vous présenter seulement les profils utiles."],
 ['🤝',"Une mise en relation","Nous organisons la rencontre entre vous et le candidat qui convient."],
 ['📋',"Un besoin clair","Missions, horaires et lieu : plus c'est précis, meilleur est le choix."],
 ['🛡️',"Plus de confiance","Nous contrôlons les informations avant toute présentation de candidat."],
 ['🌍',"Où que vous soyez","Notre agence aide employeurs et candidats de plusieurs pays."],
 ['📲',"Contactez l'agence","Un appel ou un message suffit pour commencer votre recherche."],
 ['✅',"Confiez-nous la recherche","Nous étudions votre demande avec sérieux et cherchons le bon profil."]
],
VRAI: [
 ['✅',"Vrai !","C'est bien l'une des missions courantes de ce métier."],
 ['👏',"Bonne réponse !","Cette mission fait bien partie du quotidien de ce métier."],
 ['✔️',"Exact !","C'est une tâche que l'on rencontre souvent dans ce métier."],
 ['🎯',"Tu as bon !","Voilà bien l'une des missions de ce professionnel."],
 ['🌟',"Bravo !","Cette phrase est vraie : elle décrit une mission courante de ce métier."],
 ['💡',"C'est juste","Cette activité fait vraiment partie du métier."],
 ['🙌',"Oui, c'est vrai","Ce professionnel a bien cette mission dans son travail de tous les jours."],
 ['📌',"Retiens-le","Oui : c'est une vraie mission de ce métier, à retenir."],
 ['🥳',"Bien vu !","Tu connais bien ce métier : cette mission est courante."],
 ['🔔',"Correct","Cette phrase décrit correctement une mission de ce métier."]
],

/* Cuisine du monde : petit déjeuner, goûter, hygiène */
CM_HAB: [
 ['🍽️',"Chaque pays, ses habitudes","On prend le petit déjeuner selon les saveurs de chez soi. Découvrir celles des autres, c'est s'ouvrir au monde."],
 ['🌅',"Bien commencer la journée","Le petit déjeuner donne de l'énergie : on le prend calmement, sans se presser, quand c'est possible."],
 ['🥣',"Simple ou copieux","Selon les régions, le matin est léger ou copieux : il n'y a pas une seule bonne façon de bien déjeuner."],
 ['💧',"Boire de l'eau","Avec le petit déjeuner, n'oublions pas un verre d'eau : le corps en a besoin dès le réveil."],
 ['👪',"Un repas à partager","Quand c'est possible, prendre le petit déjeuner en famille crée un beau moment avant la journée."],
 ['🍞',"Des produits de la région","Pain, fruits, céréales, lait, thé : chaque région utilise ce qu'elle produit et ce qu'elle aime."],
 ['🧂',"Moins de sucre","Un petit déjeuner trop sucré donne vite faim : on peut alterner avec du pain, des œufs ou des fruits."],
 ['🌍',"Curieux de saveurs","Goûter le petit déjeuner d'un autre pays, c'est découvrir comment vivent les autres."],
 ['⏰',"Prévoir le matin","Préparer un peu la veille aide à ne pas partir le ventre vide quand on est pressé."],
 ['🙏',"Merci à celui qui le prépare","Derrière le petit déjeuner, il y a quelqu'un qui s'est levé tôt : pensons à le remercier."]
],
CM_ENF: [
 ['🧒',"Pour les enfants","Un goûter simple et pas trop sucré : un fruit, du pain, de l'eau. Les sucreries restent pour de rares occasions."],
 ['🍌',"Un fruit d'abord","Une banane, une orange, une mangue : un fruit est un goûter facile et plein de vitamines."],
 ['💧',"Bien s'hydrater","Après l'école ou les jeux, un verre d'eau vaut mieux qu'une boisson très sucrée."],
 ['🥖',"Du pain, simplement","Du pain avec un peu de beurre ou de pâte d'arachide suffit pour tenir jusqu'au repas."],
 ['🍬',"Les sucreries, rarement","Bonbons et gâteaux très sucrés coupent l'appétit : gardons-les pour les grandes occasions."],
 ['🕓',"À heure régulière","Un goûter pris à la même heure évite de grignoter toute la journée."],
 ['👀',"Choisir avec les enfants","Laisser l'enfant choisir entre deux fruits l'aide à aimer ce qui est bon pour lui."],
 ['🧼',"Mains propres","Avant de goûter, on se lave les mains : un geste simple qui protège toute la famille."],
 ['🍽️',"Une petite portion","Une petite part suffit : l'enfant doit encore avoir faim pour le repas du soir."],
 ['😄',"Manger ensemble","Un goûter pris à plusieurs devient un moment agréable, avec des histoires et des rires."]
],
CM_PRUD: [
 ['⚠️',"Prudence","On mange assis, sous la surveillance d'un adulte, et on demande toujours aux parents s'il y a des allergies."],
 ['🧒',"Bien assis","Un enfant qui mange en courant ou en riant peut s'étouffer : on s'assoit pour manger."],
 ['👀',"Un adulte à côté","Pour les petits, un adulte reste près d'eux pendant le goûter."],
 ['🥜',"Attention aux allergies","Arachides, œufs, lait : on demande aux parents avant de donner un aliment à un enfant d'une autre famille."],
 ['✂️',"Couper en petits morceaux","Raisins, saucisses, fruits durs : on les coupe en petits morceaux pour les jeunes enfants."],
 ['☀️',"Bien conserver","Un goûter laissé longtemps au soleil peut s'abîmer : on le garde au frais et couvert."],
 ['🚰',"Eau propre","On boit de l'eau propre ; en cas de doute, on la fait bouillir ou on la filtre."],
 ['👃',"Aliments frais","On vérifie l'odeur et l'aspect : en cas de doute, on ne le donne pas à l'enfant."],
 ['🧼',"Hygiène avant tout","Mains lavées, ustensiles propres et plan de travail net : trois gestes de base."],
 ['📞',"En cas de problème","Si un enfant se sent mal après avoir mangé, on prévient vite les parents et on demande de l'aide."]
],
CM_MONDE: [
 ['🌍',"Découvrir le monde par la cuisine","Chaque pays a ses saveurs. Goûter, c'est aussi apprendre à se connaître."],
 ['🥘',"Un voyage sans bouger","Un plat nouveau, c'est un petit voyage : on apprend l'histoire et les habitudes d'un pays."],
 ['🌶️',"Des saveurs différentes","Doux, épicé, acide, fumé : chaque cuisine a son caractère, et toutes méritent le respect."],
 ['🤝',"Se rapprocher","Partager un repas avec quelqu'un d'un autre pays, c'est déjà mieux se comprendre."],
 ['🍲',"Cuisiner ensemble","Essayer une recette d'ailleurs en famille, c'est apprendre et s'amuser en même temps."],
 ['📖',"Des recettes qui racontent","Un plat raconte souvent le climat, les récoltes et la vie d'un peuple."],
 ['🙏',"Merci aux cuisiniers","Partout dans le monde, des cuisiniers font vivre les traditions de leurs régions."],
 ['🎒',"Voyager par l'assiette","Pas besoin de partir loin : la cuisine du monde commence dans votre propre cuisine."]
],
CM_HYG: [
 ['🧼',"Un repas, partout pareil pour l'hygiène","Mains propres, eau propre et aliments bien conservés : ces règles valent dans tous les pays."],
 ['🔥',"Bien cuire","Viande, poisson, œufs et poulet doivent toujours être bien cuits à l'intérieur."],
 ['🥗',"Laver les fruits et les légumes","Un bon rinçage à l'eau propre protège toute la famille."],
 ['🔪',"Séparer le cru du cuit","Une planche et un couteau différents pour la viande crue : un geste simple et important."],
 ['❄️',"Au frais","Les restes se rangent vite au frais : plus ils attendent, plus ils s'abîment."],
 ['🧽',"Surfaces propres","Un plan de travail lavé avant et après la cuisine évite beaucoup de problèmes."],
 ['🚿',"Se laver les mains","Avant de cuisiner et après avoir touché de la viande crue : on se lave toujours les mains."],
 ['📅',"Vérifier la date","Un produit emballé se vérifie : date, odeur, aspect. En cas de doute, on ne le mange pas."],
 ['💧',"De l'eau sûre","Pour boire et cuisiner, on utilise une eau propre : en cas de doute, on la fait bouillir."],
 ['🍗',"Cuire à cœur","Un poulet doit être cuit jusqu'au centre : on vérifie qu'il n'y a plus de partie rosée."],
 ['🥣',"Couvrir les plats","Un plat couvert est protégé des mouches et de la poussière."],
 ['🗑️',"Jeter ce qui est douteux","Mauvaise odeur, moisissure, goût étrange : on jette sans hésiter."]
],
REPAS_MONDE: [
 ['🌍',"Partout dans le monde","Dans tous les pays, on se retrouve autour d'un bon repas préparé avec amour."],
 ['🍽️',"La table rassemble","Quel que soit le pays, le repas est un moment où l'on se retrouve et où l'on se parle."],
 ['👥',"Un même plaisir","D'un continent à l'autre, le plaisir de partager un repas est le même."],
 ['💞',"Cuisiner avec amour","Un plat préparé avec soin rend heureux ceux qui le mangent, partout dans le monde."],
 ['🥗',"Chaque table a son histoire","Les plats racontent les habitudes, la région et la famille de ceux qui les préparent."],
 ['🕯️',"Un moment précieux","Se mettre à table ensemble, c'est se donner du temps les uns aux autres."],
 ['🌾',"Des produits de la terre","Partout, les repas viennent du travail des paysans, des marchands et des cuisiniers."],
 ['🥣',"Merci pour le repas","Dans chaque pays, on pense à remercier ceux qui ont préparé et servi le repas."]
],
HYG_RC: [
 ['🧼',"Hygiène avant tout","Avant de cuisiner : mains lavées, plan de travail propre, aliments bien lavés et bien cuits."],
 ['🔥',"Cuire à cœur","Viande, poulet, poisson et œufs se mangent bien cuits : c'est la meilleure protection."],
 ['🧽',"Cuisine propre","Ustensiles lavés, plan de travail essuyé, déchets jetés : la cuisine reste saine."],
 ['🥗',"Laver avant d'utiliser","Fruits et légumes se rincent à l'eau propre, même s'ils paraissent propres."],
 ['❄️',"Conserver correctement","Un plat cuit ne reste pas des heures dehors : on le couvre et on le range au frais."],
 ['🚰',"Une eau sûre","Pour cuisiner, on utilise une eau propre : en cas de doute, on la fait bouillir."]
]
};

/* [ réserve de variantes, familles concernées ('*' = toutes), titres d'écran concernés ] */
const PZPJ = 'pzm pzn pzs pzg pzp pjm pjn pjs pjg pjp';
const AUTRES = 'tc tm tf ts tg rc ra re rm rg rp cm cp fp cg';
const RULES = [
 ['UNSEUL', PZPJ, ["Un seul métier","Toute la maison","Enfants et maison","La cuisine aussi","SHAMAN CHOOZ le dit","Un travail qui compte","Valorisons ce métier","Partout dans le monde"]],
 ['UNSEUL', AUTRES, ["Un seul métier","Un travail qui compte","Pour les familles et les employés","Toute la maison","Enfants et maison","La cuisine aussi","SHAMAN CHOOZ le dit","Valorisons ce métier"]],
 ['CUISINE', 'rp rg rc ra re rm cm cp tc tm tf ts tg', ["La cuisine, un beau métier","Merci à celles et ceux qui cuisinent","Cuisiner, c'est un métier","Un travail à respecter"]],
 ['ACTIVITES', '*', ["Nos activités dans le monde","SHAMAN CHOOZ recrute et place"]],
 ['ACTIVITES', 'pzm pzn pzs pzg pzp', ["Dans tous les pays"]],
 ['CHAINE', '*', ["Une chaîne du monde entier","Une chaîne pour apprendre","Une chaîne pour toute la famille"]],
 ['APPRENDRE', 'fp cg', ["Apprendre fait grandir"]],
 ['CTA_CAND', PZPJ, ["Inscrivez-vous maintenant","Postulez dès aujourd'hui","Votre place vous attend","Faites le premier pas","Appelez-nous","Votre avenir commence ici"]],
 ['CTA_EMP', 'pzm pzn pzs pzg pzp', ["Parlons de votre besoin","Confiez-nous votre recherche","Contactez-nous","Un appel suffit","Recrutons ensemble"]],
 ['CTA_CP', 'cp', ["Contactez SHAMAN CHOOZ"]],
 ['SAVOIR_CP', 'cp', ["Un savoir-faire de la maison"]],
 ['AGENCE', 'ag', ["Passer par une agence"]],
 ['ETOI', 'm', ["Et toi ?"]],
 ['PLACEMENT', 'q', ["Ton placement"]],
 ['BESOIN', 'qz', ["Besoin de ce profil ?"]],
 ['VRAI', 'vf', ["Vrai !"]],
 ['CM_HAB', 'cm', ["Chaque pays, ses habitudes"]],
 ['CM_ENF', 'cm', ["Pour les enfants"]],
 ['CM_PRUD', 'cm', ["Prudence"]],
 ['CM_MONDE', 'cm', ["Découvrir le monde par la cuisine"]],
 ['CM_HYG', 'cm', ["Un repas, partout pareil pour l'hygiène","Bien cuire","Laver les fruits et les légumes","Séparer le cru du cuit"]],
 ['REPAS_MONDE', 'rp', ["Partout dans le monde"]],
 ['HYG_RC', 'rc ra re rm', ["Hygiène avant tout"]]
].map(r => ({ pool:r[0], fam:r[1] === '*' ? null : new Set(r[1].split(' ')), titles:new Set(r[2]) }));

/* Famille « pro » (20 secteurs × 10 thèmes) : le texte d'origine + 2 autres formulations, par titre d'écran */
const PRO_ALT = {
 "Un dossier vérifié":["Avant de présenter un candidat, nous vérifions son parcours, ses références et son sérieux.","Chaque dossier est examiné : ce qui est écrit doit être vrai et pouvoir être confirmé."],
 "Des savoir-faire utiles":["Nous demandons aux candidats de décrire des tâches précises qu'ils savent faire.","Un bon dossier parle de gestes concrets, pas seulement de bonnes intentions."],
 "Du foyer à l'entreprise":["Familles, boutiques, hôtels, entreprises : chaque employeur a son besoin, et nous l'écoutons.","Que le besoin soit à la maison ou en entreprise, la méthode reste la même : écouter, vérifier, proposer."],
 "Une qualité qui rassure":["Un placement réussi se prépare : nous prenons le temps de comparer avant de proposer.","Mieux vaut un bon choix un peu plus lent qu'un mauvais choix trop rapide."],
 "Pourquoi nous le faisons":["Un emploi stable aide une famille à se nourrir, se loger et envoyer ses enfants à l'école.","Nous croyons que le travail honnête redonne confiance et ouvre l'avenir."],
 "Offrir une vraie chance":["Chacun mérite d'être écouté, quel que soit son parcours : la motivation compte beaucoup.","Nous donnons à chaque candidat sérieux la possibilité d'être présenté à des employeurs."],
 "Rassurer les employeurs":["Confier sa maison ou son commerce n'est pas simple : nous aidons à choisir sereinement.","Un employeur tranquille, c'est un candidat bien choisi dès le départ."],
 "Grandir ensemble":["Notre plus belle récompense : un employeur satisfait et un employé heureux de travailler.","Chaque collaboration réussie nous encourage à continuer."],
 "Une énergie qui se voit":["Courage, dynamisme, honnêteté : c'est l'esprit de toute notre équipe.","Chaque jour, nous travaillons avec énergie pour des rencontres qui durent."],
 "Toujours chercher mieux":["Nous testons, corrigeons et améliorons nos méthodes pour mieux servir chaque client.","Ce qui marche, nous le gardons ; ce qui peut être mieux, nous le changeons."],
 "Le numérique à votre service":["Un message, une photo de document, un appel : le téléphone simplifie les démarches.","Grâce à internet, un candidat et un employeur éloignés peuvent entrer en contact."],
 "Des démarches plus rapides":["Nous expliquons chaque étape pour que personne ne reste sans nouvelles.","Des étapes simples et un suivi clair : on gagne du temps."],
 "Des prestations adaptées":["Les règles et les habitudes changent d'un pays à l'autre : nous adaptons notre service.","Un besoin en ville n'est pas celui d'un village : nous tenons compte du contexte."],
 "Une agence qui évolue":["Notre agence grandit et apprend de chaque expérience.","Nos idées nouvelles naissent de vos questions et de vos besoins."],
 "Dire la vérité":["Mieux vaut dire ce que l'on sait faire et ce que l'on apprend encore : cela évite les déceptions.","Une réponse honnête à l'entretien vaut mieux qu'une promesse impossible à tenir."],
 "Des engagements clairs":["Chacun sait ce qu'on attend de lui avant de commencer : cela évite les conflits.","Ce qui est dit au départ est ce qui doit être respecté ensuite."],
 "Respect et confidentialité":["Vos documents et vos coordonnées restent confidentiels.","Nous gardons pour nous ce que vous nous confiez."],
 "Une relation durable":["Quand on se dit la vérité, la collaboration dure plus longtemps.","La confiance se gagne chaque jour, des deux côtés."],
 "Ponctualité et sérieux":["Être à l'heure, c'est déjà montrer qu'on respecte son employeur.","Un employé qui tient parole gagne vite la confiance."],
 "Dynamiques et motivés":["Savoir écouter une consigne et la mettre en pratique : voilà un vrai atout.","Un nouveau lieu, de nouvelles habitudes : les candidats dynamiques s'y adaptent avec courage."],
 "Toujours apprendre":["On n'a jamais fini d'apprendre : demander conseil, c'est de l'intelligence.","Chaque jour apporte une petite leçon : ceux qui la retiennent avancent."],
 "Le travail qui ouvre des portes":["Le sérieux se remarque : un bon employé est souvent recommandé à d'autres familles ou entreprises.","Un travail bien fait aujourd'hui peut mener à une belle opportunité demain."],
 "Sans frontières":["Notre agence reçoit des demandes de plusieurs pays et des candidatures de tous horizons.","Les besoins en personnel existent partout : nous aidons à les rapprocher."],
 "Relier employeurs et employés":["La distance ne doit pas empêcher une belle rencontre professionnelle.","Un employeur d'un pays, un candidat d'un autre : nous facilitons la prise de contact."],
 "Un contact simple":["Écrivez-nous en quelques lignes : nous revenons vers vous.","Pas de démarche compliquée : un premier message et la discussion commence."],
 "Une aide à chaque étape":["Chaque question trouve une réponse, du premier échange jusqu'à la suite du placement.","Nous vous accompagnons dans vos démarches, étape après étape."],
 "Vous nous contactez":["Un appel ou un message : vous nous dites qui vous êtes et ce que vous cherchez.","Première étape : vous nous parlez de votre projet, simplement."],
 "Nous étudions la demande":["Nous lisons votre demande, vérifions les informations et cherchons ce qui peut convenir.","Deuxième étape : nous comparons les besoins et les profils."],
 "Nous présélectionnons":["Nous gardons uniquement ce qui correspond vraiment à la demande.","Troisième étape : un tri sérieux pour ne proposer que le meilleur."],
 "Mise en relation":["Employeur et candidat font connaissance : nous facilitons la première rencontre.","Quatrième étape : la rencontre, pour que chacun pose ses questions."],
 "Placement et suivi":["Quand le travail commence, nous restons à votre écoute si une question se pose.","Dernière étape : le suivi, pour que tout se passe bien dans la durée."],
 "Soyez ponctuel":["Prévoyez le trajet à l'avance : arriver en retard laisse une mauvaise impression.","Un candidat à l'heure montre qu'il respecte le temps des autres."],
 "Préparez un CV clair":["Une page lisible suffit : où vous avez travaillé, ce que vous savez faire, comment vous joindre.","Ne mentez jamais sur votre CV : tout peut être vérifié."],
 "Soignez votre présentation":["Des vêtements propres et un visage souriant rassurent tout de suite.","Votre tenue n'a pas besoin d'être luxueuse : elle doit être propre et soignée."],
 "Parlez avec honnêteté":["Dites simplement ce que vous maîtrisez : on apprécie la sincérité.","Dire ce que l'on ne sait pas encore faire, c'est montrer de l'humilité et l'envie d'apprendre."],
 "Restez poli et motivé":["Dites bonjour, écoutez, remerciez : la politesse ouvre beaucoup de portes.","Montrez votre motivation : un candidat qui veut apprendre est vite apprécié."],
 "Décrivez bien le poste":["Plus le poste est bien décrit, plus il est facile de trouver la bonne personne.","Notez les tâches, les horaires et le lieu avant de commencer la recherche."],
 "Communiquez":["Un mot d'encouragement quand le travail est bien fait motive beaucoup.","Dites clairement vos attentes, et acceptez aussi les questions de votre employé."],
 "Respectez vos engagements":["Ce qui est promis doit être tenu : horaires, jours de repos, paiement à la date prévue.","Respecter la parole donnée est la meilleure façon d'être respecté."],
 "Fidélisez vos équipes":["Du respect et de la considération donnent envie de rester et de bien travailler.","Un employé qui se sent estimé s'investit davantage."],
 "Vous cherchez un emploi ?":["Parlez-nous de votre expérience et de ce que vous espérez trouver.","Candidates et candidats, venez présenter votre profil à l'agence."],
 "Où que vous soyez":["Quel que soit votre pays, vous pouvez nous écrire.","Notre agence accompagne des clients dans de nombreux pays."],
 "Honnêteté, sérieux, courage":["Trois qualités guident nos choix : honnêteté, sérieux et courage.","Nous présentons des personnes honnêtes, sérieuses et courageuses."],
 "Passez à l'action":["Nos coordonnées s'affichent juste après : notez-les et écrivez-nous.","Un message aujourd'hui peut être le début d'une belle collaboration."]
};

/* ---------- Application : on parcourt les diaporamas DANS L'ORDRE DE DIFFUSION et on distribue les variantes en tournant ---------- */
try{
  const order = SCCS.playlist().map(i => SCCS.byId[i.ref]).filter(Boolean);
  const count = {}, proCount = {};
  let nb = 0;
  order.forEach(sh => {
    const fam = sh.id.split('-')[0], used = new Set(); let changed = false;
    sh.slides.forEach(sl => {
      const rule = RULES.find(r => r.titles.has(sl.t) && (!r.fam || r.fam.has(fam)));
      if(rule){
        const pool = POOLS[rule.pool]; if(!pool || !pool.length) return;
        let n = count[rule.pool] = (count[rule.pool] || 0), k = 0;
        while(k < pool.length && used.has(rule.pool + ':' + ((n + k) % pool.length))) k++;
        const idx = (n + k) % pool.length; used.add(rule.pool + ':' + idx);
        count[rule.pool] = n + 1 + k;
        const v = pool[idx]; sl.e = v[0]; sl.t = v[1]; sl.x = v[2]; changed = true; nb++;
        return;
      }
      if(fam === 'pro' && PRO_ALT[sl.t]){
        const n = proCount[sl.t] = (proCount[sl.t] || 0) + 1, r = (n - 1) % 3;
        if(r > 0){ sl.x = PRO_ALT[sl.t][r - 1]; changed = true; nb++; }
      }
    });
    if(changed) SCCS.rebuild(sh, true);
  });
  SCCS.rebuild();      /* nouvelle révision : l'ordre de la boucle est recalculé avec les durées à jour (l'ordre lui-même ne change pas) */
  SCCS.variantes = nb;
}catch(e){ console.warn('Variantes de textes ignorées :', e); }
})();

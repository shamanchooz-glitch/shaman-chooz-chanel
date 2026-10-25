/* ==========================================================
   PUBS 11 — LES MÉTIERS DE LA MAISON : UN SEUL MÉTIER (200 nouveaux diaporamas avec ta photo)
   5 métiers (fille de ménage, nounou, servante de maison, gouvernante de domicile, aide familiale polyvalente)
   × 40 sujets = 200 diaporamas. Message de SHAMAN CHOOZ : ménage de la maison, enfants et cuisine = un même travail.
   Aucune promesse de visa, d'emploi garanti ou de salaire : les règles dépendent de chaque pays.
   Chaque diaporama = 4 écrans + 1 écran « appel à l'action », puis la page « Contactez-nous » (ajoutée par le moteur).
   Les identifiants commencent par « pzm-, pzn-, pzs-, pzg-, pzp- » (un préfixe par métier).
   Pour ajouter un sujet : une ligne A(...) ci-dessous = 5 nouvelles vidéos (une par métier).
   ========================================================== */
(function(){
if(!window.SCCS) return;
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const ROLES = [
 { p:'pzm', pal:'orange', n:'fille de ménage', les:'les filles de ménage', le:'la fille de ménage', un:'une fille de ménage', gest:"balayer, laver, ranger et désinfecter chaque pièce", duo:"la propreté et l'ordre de la maison", qual:'soigneuse' },
 { p:'pzn', pal:'rose', n:'nounou', les:'les nounous', le:'la nounou', un:'une nounou', gest:"jouer avec les enfants, les nourrir, les laver et les rassurer", duo:"le bien-être et la sécurité des enfants", qual:'attentive' },
 { p:'pzs', pal:'vert', n:'servante de maison', les:'les servantes de maison', le:'la servante de maison', un:'une servante de maison', gest:"tenir la maison du matin au soir : propreté, linge, courses et repas", duo:"le bon fonctionnement de la maison", qual:'fiable' },
 { p:'pzg', pal:'bleu', n:'gouvernante de domicile', les:'les gouvernantes de domicile', le:'la gouvernante de domicile', un:'une gouvernante de domicile', gest:"organiser le travail, les horaires et les achats de toute la maison", duo:"la bonne marche de toute la résidence", qual:'organisée' },
 { p:'pzp', pal:'turquoise', n:'aide familiale polyvalente', les:'les aides familiales polyvalentes', le:"l'aide familiale polyvalente", un:'une aide familiale polyvalente', gest:"faire le ménage, s'occuper des enfants et préparer les repas", duo:"la vie de toute la famille", qual:'adaptable' }
];
const PC = ["Postulez dès aujourd'hui","Inscrivez-vous maintenant","Votre place vous attend","Appelez-nous","Faites le premier pas"];
const PE = ["Parlons de votre besoin","Confiez-nous votre recherche","Contactez-nous","Un appel suffit","Recrutons ensemble"];
const XC = ["Parlez-nous de votre projet. Nous cherchons avec vous.","Inscrivez-vous : nous étudions chaque dossier sérieusement.","Appelez l'agence, nous répondons à vos questions.","Un conseil, une orientation : contactez SHAMAN CHOOZ.","Nous vous écoutons et nous vous guidons pas à pas."];
const XE = ["Dites-nous ce que vous cherchez, nous cherchons avec vous.","Décrivez votre besoin, nous cherchons le bon profil.","Famille, hôtel, commerce : appelez l'agence.","Nous étudions votre demande avec sérieux.","Un appel suffit pour commencer."];
/* Dernier écran de contenu : le message « un seul métier » (varie selon le métier et le sujet) */
const CL = [
 ['🧩',"Un seul métier","Pour SHAMAN CHOOZ, faire le ménage de la maison, s'occuper des enfants et préparer les repas, c'est le même travail."],
 ['🏡',"Toute la maison","Ménage, enfants, cuisine : une bonne employée de maison sait tout faire, et cela reste un seul métier."],
 ['👶',"Enfants et maison","S'occuper des enfants et garder la maison propre vont ensemble : c'est un même travail."],
 ['🍲',"La cuisine aussi","Préparer le repas de la famille fait partie du même métier que le ménage et les enfants."],
 ['💬',"SHAMAN CHOOZ le dit","Fille de ménage, nounou, servante, gouvernante : nous disons que c'est un même travail à respecter."],
 ['🌍',"Partout dans le monde","Dans tous les pays, des familles ont besoin de personnes de confiance pour la maison et les enfants."],
 ['🤲',"Un travail qui compte","Grâce à ce travail, des familles vivent mieux et des enfants grandissent en sécurité."],
 ['📣',"Valorisons ce métier","Le travail domestique mérite le respect, comme tous les autres métiers."]
];
const CE = [
 ['🧩',"Un seul métier","Pour SHAMAN CHOOZ, ménage, enfants et cuisine forment un même travail : parlez-en clairement avec votre employée."],
 ['🌍',"Dans tous les pays","Notre agence met en relation employeurs et employés partout dans le monde."],
 ['🛡️',"Chaque pays a ses règles","Renseignez-vous sur la loi du travail de votre pays : contrat, horaires, jours de repos."],
 ['🤝',"Sérieux des deux côtés","Un bon employeur et une bonne employée construisent ensemble une relation de confiance."],
 ['💬',"SHAMAN CHOOZ le dit","Fille de ménage, nounou, servante, gouvernante : un même travail, à respecter."]
];
const ANG = [];
/* A(id, public C=candidat(e)s / E=employeurs, titre(R), écrans(R) → 3 écrans [émoji, titre, texte]) */
const A = (id, aud, ti, sl) => ANG.push({ id, aud, ti, sl });

A('un-vrai-metier','C', R=> `${cap(R.le)} : un vrai métier`, R=>[
 ['🌟',"Un métier respectable",`Être ${R.n} est un vrai travail, utile à toutes les familles.`],
 ['🛠️',"Un vrai savoir-faire",`${cap(R.le)} sait ${R.gest}. Ce savoir-faire a de la valeur.`],
 ['💪',"Un travail sérieux","Il demande de la force, de la patience et du cœur chaque jour."]]);
A('meme-travail','C', R=> `Ménage, enfants, cuisine : ${R.n}, c'est le même travail`, R=>[
 ['🧹',"Le ménage",`Garder la maison propre, c'est le premier geste de ${R.le}.`],
 ['👶',"Les enfants","Veiller sur les enfants, c'est prendre soin de la maison vivante."],
 ['🍲',"La cuisine","Préparer à manger pour la famille complète le même travail."]]);
A('fierte','C', R=> `Soyez fière d'être ${R.n}`, R=>[
 ['🌺',"La fierté du travail bien fait","Chaque pièce rangée, chaque enfant rassuré, chaque repas servi mérite le respect."],
 ['🏅',"Votre valeur",`${cap(R.le)} veille sur ${R.duo}. Ce n'est pas un petit travail.`],
 ['🗣️',"Dites-le avec fierté","Votre métier fait vivre des familles entières."]]);
A('confiance','C', R=> `La confiance, première qualité de ${R.le}`, R=>[
 ['🔑',"On vous confie une maison","Entrer chez les gens demande une grande confiance."],
 ['🤲',"Être digne de confiance",`Une ${R.n} ${R.qual} respecte les affaires et la vie privée de la famille.`],
 ['⭐',"La confiance se construit","Jour après jour, par le travail honnête et la parole tenue."]]);
A('ponctualite','C', R=> `Ponctualité : ${R.n}, arrivez à l'heure`, R=>[
 ['⏰',"L'heure, c'est le respect","Arriver à l'heure montre que vous respectez la famille."],
 ['📱',"Un retard ? Prévenez","Un simple message évite bien des malentendus."],
 ['🌅',"Préparez la veille","Vêtements, transport, repas : un bon départ commence la veille."]]);
A('tenue-image','C', R=> `Tenue propre, image sérieuse : conseils pour ${R.le}`, R=>[
 ['👚',"Une tenue simple et propre","Des vêtements propres et pratiques donnent confiance dès le premier regard."],
 ['🧼',"Le soin de soi","Mains propres, ongles courts, cheveux attachés : c'est essentiel auprès des enfants et en cuisine."],
 ['😊',"Un sourire sincère","Le sourire ouvre toutes les portes de la maison."]]);
A('politesse','C', R=> `Politesse et respect dans la maison`, R=>[
 ['🙏',"Les mots qui comptent","Bonjour, merci, s'il vous plaît : trois mots qui changent l'ambiance."],
 ['👂',"Savoir écouter",`${cap(R.le)} écoute les consignes avant d'agir.`],
 ['🕊️',"Rester calme","Même fatiguée, on parle avec respect et on demande de l'aide si besoin."]]);
A('discretion','C', R=> `Discrétion : ce qui se passe à la maison reste à la maison`, R=>[
 ['🤫',"Une règle d'or","On ne raconte pas la vie de la famille à l'extérieur."],
 ['📵',"Photos et réseaux","Ne publiez jamais la maison ni les enfants sans l'accord des parents."],
 ['🛡️',"Protéger la famille","En protégeant la vie privée de la famille, vous protégez aussi votre réputation."]]);
A('honnetete','C', R=> `Honnêteté : une valeur qui ouvre des portes`, R=>[
 ['💯',"Dire la vérité","Un oubli ? Une casse ? Dites-le simplement : l'honnêteté rassure."],
 ['🧾',"Les courses, c'est clair","Gardez les tickets et rendez la monnaie exacte."],
 ['🌟',"La bonne réputation","Une employée honnête est recommandée par ses employeurs."]]);
A('premiere-journee','C', R=> `Votre première journée comme ${R.n}`, R=>[
 ['🚪',"Arrivez en avance","Prenez le temps de découvrir la maison et de vous présenter."],
 ['📝',"Posez vos questions","Quelles tâches ? Quels horaires ? Quelles règles pour les enfants et la cuisine ?"],
 ['🌱',"Commencez doucement","Chaque famille a ses habitudes : observez, puis faites bien."]]);
A('entretien','C', R=> `Réussir son entretien de ${R.n}`, R=>[
 ['🗓️',"Se préparer","Relisez vos expériences et pensez à ce que vous savez faire."],
 ['🗨️',"Parler simplement","Expliquez ce que vous savez faire, sans mentir ni exagérer."],
 ['❓',"Poser aussi ses questions","Horaires, jours de repos, tâches : c'est normal de demander."]]);
A('papiers','C', R=> `Préparer ses papiers et références`, R=>[
 ['🪪',"Des papiers en règle","Pièce d'identité valide et documents demandés dans votre pays."],
 ['📇',"Des références","Le nom et le numéro d'anciens employeurs rassurent une nouvelle famille."],
 ['📂',"Tout rassembler","Un dossier simple et propre vous fait gagner du temps."]]);
A('contrat','C', R=> `Un contrat clair avant de commencer`, R=>[
 ['📜',"Mettre par écrit","Tâches, horaires, repos : ce qui est écrit évite les disputes."],
 ['🔍',"Bien lire","Demandez qu'on vous explique ce que vous ne comprenez pas."],
 ['⚖️',"Chaque pays a ses règles","Renseignez-vous sur la loi du travail de l'endroit où vous travaillez."]]);
A('horaires-repos','C', R=> `Horaires et jours de repos : en parler dès le début`, R=>[
 ['🕘',"Les horaires","Savoir à quelle heure on commence et on termine évite la fatigue inutile."],
 ['🛌',"Le repos compte","Un bon repos permet de mieux s'occuper des enfants et de la maison."],
 ['🤝',"S'entendre ensemble","Un accord clair dès le départ rend le travail plus agréable."]]);
A('formation','C', R=> `Apprendre chaque jour pour progresser`, R=>[
 ['📚',"Toujours apprendre",`${cap(R.le)} apprend sans cesse de nouvelles recettes, gestes et astuces.`],
 ['👀',"Observer les meilleurs","Regardez comment travaillent les personnes expérimentées."],
 ['📈',"Grandir avec l'expérience","Plus vous savez, plus votre travail est apprécié."]]);
A('securite-maison','C', R=> `Sécurité à la maison : les bons réflexes de ${R.le}`, R=>[
 ['⚠️',"Produits dangereux","Rangez les produits d'entretien hors de portée des enfants."],
 ['🔥',"Cuisine et feu","Ne laissez jamais une casserole sans surveillance, surtout avec des enfants."],
 ['🚑',"Savoir quoi faire","Gardez à portée les numéros d'urgence et apprenez les gestes de premiers secours."]]);
A('hygiene','C', R=> `Hygiène : des gestes simples qui protègent`, R=>[
 ['🧼',"Se laver les mains","Avant de cuisiner, après les toilettes, après le ménage : toujours."],
 ['🧽',"Séparer le propre et le sale","Utilisez des chiffons différents pour la cuisine et pour les sanitaires."],
 ['🥗',"Des aliments bien conservés","Couvrir, ranger et vérifier les dates évite de rendre malade."]]);
A('cuisine-base','C', R=> `La cuisine fait partie du métier`, R=>[
 ['🍳',"Cuisiner pour la famille","Un repas chaud et propre fait plaisir à toute la maison."],
 ['📝',"Demander les goûts","Chaque famille a ses habitudes, ses interdits et ses plats préférés."],
 ['⏲️',"S'organiser","Préparer les légumes à l'avance permet de finir à l'heure."]]);
A('courses-budget','C', R=> `Faire les courses et gérer un petit budget`, R=>[
 ['🛒',"Une liste claire","Écrivez ce qu'il faut acheter avant de partir."],
 ['💰',"Respecter le budget","Comparez les prix et gardez les tickets."],
 ['🥬',"Bien choisir","Fruits et légumes frais, produits non périmés : regardez toujours."]]);
A('linge','C', R=> `Le linge : laver, sécher, repasser, ranger`, R=>[
 ['👕',"Trier avant de laver","Blanc, couleurs, fragile : on sépare pour ne pas abîmer."],
 ['☀️',"Bien sécher","Le linge sec évite l'odeur d'humidité, surtout en saison des pluies."],
 ['🧺',"Plier et ranger","Un linge bien plié se retrouve vite et dure plus longtemps."]]);
A('organisation','C', R=> `S'organiser pour tout faire sans se fatiguer`, R=>[
 ['📋',"Une liste par jour","Ce qui est écrit est plus facile à faire."],
 ['🔄',"Dans le bon ordre",`Pour ${R.gest}, commencez par le plus important.`],
 ['⏳',"Garder du temps","Prévoyez une petite pause : on travaille mieux reposée."]]);
A('prendre-soin-de-soi','C', R=> `Prendre soin de soi pour bien travailler`, R=>[
 ['💧',"Boire de l'eau","Boire régulièrement aide à tenir toute la journée."],
 ['🍚',"Bien manger","Un vrai repas donne de la force pour le travail de la maison."],
 ['😴',"Dormir assez","Le sommeil est la meilleure réserve d'énergie."]]);
A('communication','C', R=> `Bien communiquer avec la famille`, R=>[
 ['💬',"Parler franchement","Dites ce qui est clair et ce qui ne l'est pas."],
 ['🙋',"Demander quand on ne sait pas","Mieux vaut poser une question que de se tromper."],
 ['🤝',"Régler les soucis calmement","On en parle au bon moment, sans crier ni s'énerver."]]);
A('langues','C', R=> `Parler la langue de la famille`, R=>[
 ['🗣️',"Comprendre se prépare","Quelques mots de la langue de la famille facilitent tout."],
 ['📖',"Apprendre un peu chaque jour","Notez les mots utiles : cuisine, enfants, produits, horaires."],
 ['🌍',"Un atout partout","Parler plusieurs langues ouvre de nombreuses possibilités."]]);
A('travailler-ailleurs','C', R=> `Travailler dans une autre ville ou un autre pays : bien se renseigner`, R=>[
 ['🧳',"Se renseigner d'abord","Loi du travail, papiers, logement : chaque lieu a ses règles."],
 ['👨‍👩‍👧',"En parler à ses proches","Une décision importante se prend avec calme et conseils."],
 ['🛡️',"Avancer avec une agence sérieuse","SHAMAN CHOOZ vous oriente, sans promesse irréaliste."]]);
A('fausses-promesses','C', R=> `Attention aux fausses promesses d'emploi`, R=>[
 ['🚨',"Méfiance","Une promesse d'emploi trop belle pour être vraie doit vous alerter."],
 ['💸',"Ne payez jamais sans comprendre","Demandez toujours un reçu et des explications claires."],
 ['📞',"Vérifiez l'agence","Un vrai professionnel répond à vos questions et vous donne ses coordonnées."]]);
A('respect-metier','C', R=> `Un travail qui mérite le respect`, R=>[
 ['🏠',"Sans elle, la maison s'arrête","Les familles peuvent travailler grâce à celles qui tiennent la maison."],
 ['🌍',"Un métier reconnu partout","Dans le monde entier, on cherche des personnes de confiance pour ce travail."],
 ['🙌',"Respectons-nous","Ce métier se fait avec courage, et chacun doit en parler avec respect."]]);
A('evoluer','C', R=> `Évoluer dans le métier avec l'expérience`, R=>[
 ['🪜',"Un travail qui évolue","Avec le temps, on peut passer d'aide à responsable de la maison."],
 ['🎓',"Se former","Cuisine, soins aux enfants, organisation : chaque savoir compte."],
 ['⭐',"Garder ses recommandations","Un bon employeur est votre meilleure référence."]]);
A('famille-choisir','E', R=> `Une famille cherche ${R.un} : comment choisir ?`, R=>[
 ['🔎',"Définir son besoin",`Ménage, enfants, repas, tenue de la maison : listez ce que ${R.le} devra faire.`],
 ['🧐',"Les qualités à regarder",`Cherchez une personne ${R.qual}, honnête et fiable.`],
 ['📞',"Prendre des références","Parler à d'anciens employeurs aide à choisir sereinement."]]);
A('respect-employe','E', R=> `Employeurs : respectez celle qui travaille chez vous`, R=>[
 ['🤝',"Un travail, pas une faveur",`Le travail de ${R.le} mérite des conditions justes.`],
 ['🍽️',"Des repas et du repos","Prévoir le repos et les repas évite la fatigue et les tensions."],
 ['🗣️',"Parler avec politesse","Un ton calme et poli donne un meilleur travail."]]);
A('contrat-ecrit','E', R=> `Employeurs : un contrat écrit protège tout le monde`, R=>[
 ['📜',"Écrire ce qui est convenu","Tâches, horaires, repos, période d'essai : tout doit être clair."],
 ['⚖️',"Suivre la loi locale","Chaque pays a ses règles : renseignez-vous avant de recruter."],
 ['🛡️',"Éviter les disputes","Un accord écrit protège la famille comme l'employée."]]);
A('remuneration-juste','E', R=> `Une rémunération juste, décidée ensemble`, R=>[
 ['💬',"En parler franchement","Fixez la rémunération et le jour de paiement dès le départ."],
 ['📅',"Payer à la date prévue","Un paiement régulier crée la confiance."],
 ['🌟',"Un travail bien reconnu",`Quand ${R.le} est respectée, elle travaille mieux et plus longtemps.`]]);
A('periode-essai','E', R=> `La période d'essai : bien commencer ensemble`, R=>[
 ['🌱',"Un bon départ","Quelques jours d'essai permettent de se connaître."],
 ['👀',"Observer sans presser","Laissez le temps de comprendre vos habitudes."],
 ['🗒️',"Faire un point","Dites ce qui va bien et ce qui doit changer."]]);
A('consignes','E', R=> `Donner des consignes claires dès le premier jour`, R=>[
 ['📋',"Une liste simple","Écrivez les tâches du jour et de la semaine."],
 ['🍲',"Les habitudes de la maison","Goûts, interdits, heures des repas : expliquez-les."],
 ['👶',"Les règles pour les enfants","Sorties, repas, sommeil, écrans : dites ce que vous attendez."]]);
A('confier-maison','E', R=> `Confier sa maison : la confiance se construit`, R=>[
 ['🔑',"Un pas après l'autre","Donnez d'abord de petites responsabilités, puis davantage."],
 ['🤲',"Montrer de la confiance",`${cap(R.le)} qui se sent respectée veille sur ${R.duo}.`],
 ['📞',"Rester joignable","Un numéro pour les urgences rassure tout le monde."]]);
A('monde-employeurs','E', R=> `Employeurs du monde entier : parlons de votre besoin`, R=>[
 ['🌍',"Partout dans le monde","Familles, résidences, hôtels, commerces : le besoin de personnel est présent partout."],
 ['🔎',"Un besoin précis",`Dites-nous quel profil de ${R.n} vous cherchez.`],
 ['📲',"Un seul contact","SHAMAN CHOOZ vous répond et étudie votre demande."]]);
A('mise-en-relation','E', R=> `Nous mettons en relation employeurs et employés`, R=>[
 ['🔗',"Notre rôle","Nous rapprochons ceux qui cherchent et ceux qui offrent leur travail."],
 ['📝',"Un dossier sérieux","Nous écoutons le besoin de la famille et le profil de la candidate."],
 ['🌐',"Dans tous les pays","Chaque pays a ses règles : nous vous conseillons avec prudence."]]);
A('parole-shaman','C', R=> `SHAMAN CHOOZ le dit : ${R.n}, un métier à valoriser`, R=>[
 ['📣',"Le message de SHAMAN CHOOZ","Je le dis clairement : le travail de la maison mérite d'être valorisé."],
 ['🧩',"Même travail","Faire le ménage de la maison, s'occuper des enfants et cuisiner : pour moi, c'est un seul travail."],
 ['❤️',"Merci à toutes celles qui le font",`Merci à ${R.les} et à toutes celles qui font vivre les familles.`]]);
A('suivre-chaine','C', R=> `Suivez la chaîne SHAMAN CHOOZ 24h/24 : conseils pour ${R.le}`, R=>[
 ['📺',"Une chaîne pour vous","Des vidéos tournent en continu : conseils, métiers, savoirs et jeux."],
 ['🔔',"Des conseils chaque jour",`Des idées simples pour mieux faire votre métier de ${R.n}.`],
 ['📲',"Partagez la chaîne","Envoyez-la à celles et ceux qui cherchent du travail ou du personnel."]]);
A('contact-agence','E', R=> `Contactez SHAMAN CHOOZ aujourd'hui : ${R.n}`, R=>[
 ['📞',"Un appel suffit","Expliquez-nous votre situation, employeur ou candidate."],
 ['🗂️',"Nous étudions votre dossier","Besoin, profil, disponibilité : nous cherchons le bon rapprochement."],
 ['🌟',"Avec sérieux et respect","Une agence qui respecte les familles et les employées."]]);

ROLES.forEach((R, ri) => ANG.forEach((a, ai) => {
 const e = a.aud === 'E', k = ri * 7 + ai;
 const sl = a.sl(R).concat([ e ? CE[k % CE.length] : CL[k % CL.length], ['📞', (e ? PE : PC)[k % 5], (e ? XE : XC)[k % 5]] ]);
 let ti = a.ti(R), low = ti.toLowerCase();
 if(!low.includes(R.n) && !low.includes(R.le.replace(/^(la |l')/, ''))) ti += ' — ' + cap(R.n);   /* un titre unique par métier */
 SCCS.add(R.p + '-' + a.id, ti, 'Agence', R.pal, sl, { photo:true });
}));
})();

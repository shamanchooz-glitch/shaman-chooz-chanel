/* ==========================================================
   PUBS 13 — JEUNES : AIMER LE TRAVAIL (80 nouveaux diaporamas avec ta photo)
   5 métiers (fille de ménage, nounou, servante de maison, gouvernante de domicile, aide familiale polyvalente)
   × 16 sujets = 80 diaporamas qui encouragent les jeunes à aimer le travail.
   Message de SHAMAN CHOOZ : ménage de la maison, enfants et cuisine = un même travail.
   Aucune promesse de visa, d'emploi garanti ou de salaire : les règles dépendent de chaque pays.
   Chaque diaporama = 3 écrans + 1 message « un seul métier » + 1 appel à l'action, puis « Contactez-nous » (ajouté par le moteur).
   Les identifiants commencent par « pjm-, pjn-, pjs-, pjg-, pjp- ».
   Pour ajouter un sujet : une ligne J(...) ci-dessous = 5 nouvelles vidéos (une par métier).
   ========================================================== */
(function(){
if(!window.SCCS) return;
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const ROLES = [
 { p:'pjm', pal:'orange', n:'fille de ménage', les:'les filles de ménage', le:'la fille de ménage', gest:"balayer, laver, ranger et désinfecter chaque pièce" },
 { p:'pjn', pal:'rose', n:'nounou', les:'les nounous', le:'la nounou', gest:"jouer avec les enfants, les nourrir, les laver et les rassurer" },
 { p:'pjs', pal:'vert', n:'servante de maison', les:'les servantes de maison', le:'la servante de maison', gest:"tenir la maison du matin au soir : propreté, linge, courses et repas" },
 { p:'pjg', pal:'bleu', n:'gouvernante de domicile', les:'les gouvernantes de domicile', le:'la gouvernante de domicile', gest:"organiser le travail, les horaires et les achats de toute la maison" },
 { p:'pjp', pal:'turquoise', n:'aide familiale polyvalente', les:'les aides familiales polyvalentes', le:"l'aide familiale polyvalente", gest:"faire le ménage, s'occuper des enfants et préparer les repas" }
];
const CL = [
 ['🧩',"Un seul métier","Pour SHAMAN CHOOZ, faire le ménage de la maison, s'occuper des enfants et préparer les repas, c'est le même travail."],
 ['💬',"SHAMAN CHOOZ le dit","Jeunes, aimez le travail : ménage, enfants et cuisine, c'est un seul travail qui mérite le respect."],
 ['🏡',"Toute la maison","Un jeune qui apprend à tout faire à la maison construit une base solide pour la vie."],
 ['🌍',"Partout dans le monde","Dans tous les pays, des familles ont besoin de personnes sérieuses pour la maison et les enfants."],
 ['🤲',"Un travail qui compte","Grâce à ce travail, des familles vivent mieux et des enfants grandissent en sécurité."]
];
const XC = [
 "Parlez-nous de votre projet. Nous vous écoutons et nous vous guidons.",
 "Inscrivez-vous : nous étudions chaque dossier sérieusement.",
 "Appelez l'agence, nous répondons à vos questions.",
 "Un conseil, une orientation : contactez SHAMAN CHOOZ.",
 "Faites le premier pas : appelez-nous."
];
const PC = ["Appelez-nous","Inscrivez-vous maintenant","Faites le premier pas","Postulez dès aujourd'hui","Votre avenir commence ici"];
const JS = [];
/* J(id, titre(R), écrans(R) → 3 écrans [émoji, titre, texte]) */
const J = (id, ti, sl) => JS.push({ id, ti, sl });

J('aimer-travail', R=>`Jeunes, apprenez à aimer le travail : ${R.le}`, R=>[
 ['❤️',"Aimer ce qu'on fait","On devient bon dans ce qu'on fait avec cœur. L'amour du travail s'apprend jour après jour."],
 ['🛠️',"Un vrai savoir-faire",`${cap(R.le)} sait ${R.gest}. Cela s'apprend et cela a de la valeur.`],
 ['🌟',"La fierté du travail bien fait","Quand on termine bien sa tâche, on se sent fort et utile."]]);
J('meme-travail', R=>`Ménage, enfants, cuisine : un seul travail pour ${R.le}`, R=>[
 ['🧹',"Le ménage","Une maison propre et rangée rend toute la famille heureuse."],
 ['👶',"Les enfants","Prendre soin des enfants, c'est aussi un travail sérieux et plein d'amour."],
 ['🍲',"La cuisine","Préparer les repas fait partie du même travail : il faut de l'hygiène et de l'organisation."]]);
J('pas-honte', R=>`Aucune honte à être ${R.n}`, R=>[
 ['🌟',"Un métier honorable","Aucun travail honnête n'est petit. Chaque métier fait avancer la société."],
 ['🙌',"Se respecter soi-même","Celui ou celle qui travaille avec sérieux mérite le respect de tous."],
 ['📣',"Marchez la tête haute","Ce que vous faites compte pour les familles qui vous font confiance."]]);
J('premier-travail', R=>`Votre premier travail : on apprend tout, ${R.n}`, R=>[
 ['🌱',"Tout le monde débute","Personne ne sait tout au premier jour. On apprend en regardant et en essayant."],
 ['👂',"Écouter et poser des questions","Si vous ne comprenez pas, demandez calmement : c'est une preuve de sérieux."],
 ['📈',"Chaque jour un peu mieux","Avec la pratique, les gestes deviennent faciles et rapides."]]);
J('patience', R=>`La patience, force de ${R.le}`, R=>[
 ['⏳',"Prendre son temps","Les belles choses demandent du temps : une maison propre, un enfant calme, un bon repas."],
 ['😌',"Rester calme","Quand on est fatigué, respirer profondément aide à répondre avec douceur."],
 ['🌈',"La patience paie","Les employeurs apprécient quelqu'un de calme, qui garde le sourire."]]);
J('se-lever', R=>`Se lever tôt pour bien commencer : conseil pour ${R.le}`, R=>[
 ['🌅',"Un bon départ","Se lever à l'heure donne le temps de se préparer sans stress."],
 ['😴',"Dormir assez","Un corps reposé travaille mieux : couchez-vous à une heure raisonnable."],
 ['⏰',"Être à l'heure","Arriver à l'heure montre le respect pour la famille qui vous attend."]]);
J('finir', R=>`Finir ce qu'on commence : l'habitude de ${R.le}`, R=>[
 ['✅',"Aller jusqu'au bout","Un travail commencé doit être terminé : c'est ce qui donne confiance."],
 ['📋',"Faire une liste","Écrire ses tâches aide à ne rien oublier."],
 ['🏁',"La satisfaction du travail fini","Voir une maison en ordre à la fin de la journée donne de la fierté."]]);
J('equipe', R=>`Travailler en équipe dans la maison : ${R.le}`, R=>[
 ['🤝',"Chacun son rôle","Dans une grande maison, plusieurs personnes travaillent : bien s'entendre rend tout plus facile."],
 ['💬',"Bien communiquer","Dites clairement ce que vous faites et ce dont vous avez besoin."],
 ['🎉',"Réussir ensemble","Une équipe unie fait vivre une belle maison."]]);
J('respect', R=>`Respect et politesse : la clé de ${R.le}`, R=>[
 ['🙏',"Dire bonjour, merci, s'il vous plaît","Ces mots simples ouvrent beaucoup de portes."],
 ['👴',"Respecter les aînés","Dans la famille où vous travaillez, chacun mérite votre respect."],
 ['🔒',"Discrétion","Ce qui se passe à la maison reste à la maison."]]);
J('maison-ecole', R=>`Les petits travaux à la maison : la première école de ${R.le}`, R=>[
 ['🧺',"Apprendre dès l'enfance","Ranger sa chambre, laver ses habits, aider à la cuisine : ce sont des leçons de vie."],
 ['👨‍👩‍👧',"Les parents guident","Les parents peuvent montrer les gestes simples, avec patience."],
 ['🌟',"Une bonne base","Ceux qui savent tenir une maison savent aussi s'organiser pour la vie."]]);
J('garcons-filles', R=>`Filles et garçons peuvent tous faire le ménage et la cuisine`, R=>[
 ['⚖️',"Le travail de la maison est pour tous","Balayer, cuisiner, s'occuper des enfants : filles et garçons peuvent apprendre ces gestes."],
 ['👦',"Les garçons aussi","Un garçon qui sait faire à manger et ranger devient un adulte autonome."],
 ['👧',"Les filles aussi","Une fille qui apprend un métier et s'organise construit son avenir."]]);
J('gagner-honnete', R=>`Gagner sa vie honnêtement : le choix de ${R.le}`, R=>[
 ['🛡️',"Un travail honnête","Gagner sa vie par son travail est une fierté que personne ne peut enlever."],
 ['🧠',"Se méfier des raccourcis","Les promesses trop faciles cachent souvent des pièges. Renseignez-vous toujours."],
 ['🏠',"Construire pas à pas","Un travail sérieux et régulier permet de bâtir sa vie petit à petit."]]);
J('progresser', R=>`Chaque jour, un peu mieux : évoluer comme ${R.le}`, R=>[
 ['📈',"Progresser","Observez, posez des questions, demandez à apprendre de nouvelles tâches."],
 ['🎓',"Se former","Les gestes d'hygiène, de sécurité et de cuisine s'apprennent. Apprendre ne s'arrête jamais."],
 ['⭐',"L'expérience compte","Avec le temps, la confiance grandit et de nouvelles responsabilités peuvent arriver."]]);
J('exemple', R=>`Soyez un bon exemple pour les plus jeunes : ${R.le}`, R=>[
 ['👀',"On vous regarde","Les petits frères, petites sœurs et voisins regardent vos habitudes."],
 ['🌱',"Montrer par l'action","Un jeune qui travaille avec sérieux donne envie aux autres de faire pareil."],
 ['📣',"Transmettre","Partagez ce que vous avez appris : c'est ainsi que les métiers se transmettent."]]);
J('rever-grand', R=>`Rêver grand, commencer petit : l'histoire de ${R.le}`, R=>[
 ['🌠',"Avoir un rêve","Chacun peut rêver d'une vie meilleure : le travail est un pas pour y arriver."],
 ['🪜',"Marche après marche","On monte un escalier une marche à la fois. Chaque jour de travail compte."],
 ['💪',"Ne pas abandonner","Les difficultés passent. Ceux qui persévèrent avancent."]]);
J('agence', R=>`SHAMAN CHOOZ vous accompagne : ${R.n}`, R=>[
 ['🔎',"Nous écoutons","Parlez-nous de votre parcours et de ce que vous savez faire."],
 ['🗂️',"Nous étudions votre dossier","Nous cherchons des familles et des employeurs qui correspondent à votre profil."],
 ['🌍',"Dans tous les secteurs","Maison, ville, commerce : notre agence travaille avec sérieux, sans fausse promesse."]]);

ROLES.forEach((R, ri) => JS.forEach((j, ji) => {
 const k = ri * 3 + ji;
 const sl = j.sl(R).concat([ CL[k % CL.length], ['📞', PC[k % PC.length], XC[k % XC.length]] ]);
 let ti = j.ti(R), low = ti.toLowerCase();
 if(!low.includes(R.n) && !low.includes(R.le.replace(/^(la |l')/, ''))) ti += ' — ' + cap(R.n);
 SCCS.add(R.p + '-' + j.id, ti, 'Agence', R.pal, sl, { photo:true });
}));
})();

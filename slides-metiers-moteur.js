/* ==========================================================
   MÉTIERS 300 — MOTEUR (à charger AVANT slides-data-metiers4.js … slides-data-metiers9.js)
   Ce fichier transforme chaque ligne « métier » en UN diaporama avec ta photo (7 ou 8 écrans) :
   présentation simple du métier, missions, qualités, « comment bien faire », avantages,
   encouragement aux jeunes et appel final de SHAMAN CHOOZ (recrutement et placement partout dans le monde).
   5 modèles d'écrans différents + des phrases d'encouragement et de conclusion variées :
   les 300 vidéos ne se ressemblent pas et tournent en boucle avec toutes les autres.

   Une ligne = un métier = une vidéo :
   [ émoji, « une/un … », « Nom du métier », « Description simple (une phrase) »,
     « mission 1|mission 2|mission 3 » (verbes à l'infinitif), « qualité 1|qualité 2|qualité 3 »,
     « Conseil pour bien faire (phrase à l'impératif) », « Avantage du métier (une phrase) » ]
   Les identifiants sont de la forme jm-1, jb-1, jc-1, jv-1, jx-1, jq-1 (un préfixe par thème).
   ========================================================== */
(function(){
if(!window.SCCS) return;
const cap = s => s.charAt(0).toUpperCase() + s.slice(1), lc = s => /^[A-ZÀ-ÖØ-Þ]{2}/.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1);   /* garde les sigles (DJ…) */
const de = s => /^[aeiouyhàâäéèêëîïôöûüœ]/i.test(s) ? "d'" + s : "de " + s;
const PAL = ['orange','vert','bleu','rose','violet','turquoise','or','terre','rouge','nuit'];

/* Phrases d'encouragement aux jeunes ({met} = « le métier de … », {Met} = même chose avec majuscule, {art} = « un/une … ») */
const YOUTH = [
 "Jeune, n'aie pas honte de choisir {met} : c'est un travail honorable, et les personnes sérieuses sont toujours recherchées.",
 "Il n'y a pas de sot métier. Si {met} t'attire, apprends auprès d'un professionnel et avance pas à pas.",
 "Dès que tu as l'âge de travailler, tu peux commencer petit, apprendre chaque jour et grandir dans {met}.",
 "À toi de jouer ! Demande conseil à un adulte de confiance, observe un bon professionnel et lance-toi sans crainte.",
 "Beaucoup de jeunes réussissent en partant de zéro. Avec du sérieux et de la patience, tu peux réussir dans {met}.",
 "Ne reste pas à attendre : apprendre {met}, c'est se donner une vraie chance de gagner sa vie dignement.",
 "Avec l'accord de tes parents, et sans abandonner tes études ni ta formation, tu peux découvrir {met} auprès d'un pro.",
 "Chaque grand professionnel a commencé comme débutant. {Met} s'apprend avec du courage et de la régularité.",
 "Pas besoin de tout comprendre le premier jour. Pose des questions, regarde, essaie, et progresse dans {met}.",
 "Choisir {met}, c'est choisir de rendre service et d'être fier de son travail. Les jeunes courageux y ont leur place.",
 "Si tu hésites, va voir un professionnel et regarde-le travailler une journée : tu sauras vite si {met} te plaît.",
 "Ton jeune âge n'est pas un problème : ce qui compte, c'est ton sérieux, ta ponctualité et l'envie d'apprendre.",
 "Un métier appris, c'est une sécurité pour demain. {Met} peut devenir ton point de départ.",
 "Ensemble, faisons grandir la jeunesse : {met} est une belle porte d'entrée vers l'indépendance.",
 "Quand tu auras l'âge légal de travailler, présente-toi avec le sourire et le goût du travail bien fait : on te fera confiance."
];
/* Phrases de conclusion (SHAMAN CHOOZ : recrutement et placement partout dans le monde) */
const CLOSE = [
 "SHAMAN CHOOZ recrute et place des candidats sérieux dans le monde entier. Tu cherches {art} ? Contacte-nous.",
 "Moi, SHAMAN CHOOZ, je mets en relation les employeurs et les personnes qui cherchent du travail, dans de nombreux pays.",
 "Tu veux travailler dans ce métier ? Fais-toi connaître auprès de SHAMAN CHOOZ : nous t'aidons à trouver une place adaptée.",
 "Employeurs et candidats : SHAMAN CHOOZ vous rapproche, avec sérieux, partout où vous êtes.",
 "Besoin de personnel qualifié ? SHAMAN CHOOZ présélectionne et place des professionnels fiables, ici et ailleurs.",
 "Partage cette vidéo avec un jeune qui cherche sa voie : {met} peut changer sa vie.",
 "Chaque jour, SHAMAN CHOOZ t'explique un métier simplement. Reste sur la chaîne et partage-la autour de toi.",
 "SHAMAN CHOOZ place du personnel pour les travaux domestiques, urbains et commerciaux, partout dans le monde.",
 "Un bon recrutement commence par une bonne rencontre. SHAMAN CHOOZ prépare cette rencontre avec soin.",
 "Tu es employeur ? Respecte ton personnel. Tu es employé ? Travaille avec honnêteté. SHAMAN CHOOZ vous accompagne.",
 "De la maison à la ville, du ménage au commerce : SHAMAN CHOOZ cherche la bonne personne pour chaque besoin.",
 "Cherche, apprends, progresse. SHAMAN CHOOZ t'oriente vers {met}, étape par étape.",
 "Tous les métiers honnêtes méritent le respect, des plus simples aux plus techniques. SHAMAN CHOOZ le répète chaque jour.",
 "Un métier, c'est une fierté. SHAMAN CHOOZ aide les jeunes et les adultes à entrer dans l'emploi, partout dans le monde."
];

let K = 0;   /* compteur général : fait tourner les phrases d'encouragement et de conclusion d'un diaporama à l'autre */
window.SCC_JOBS = {
  count: 0,
  add: function(prefix, rows){
    rows.forEach((r, i) => {
      const n = i + 1, k = K++;
      const e = r[0], art = r[1], nom = r[2], d = r[3], T = r[4].split('|'), Q = r[5].split('|'), B = r[6], A = r[7];
      const met = 'le métier ' + de(lc(nom)), Met = cap(met);
      const fill = s => s.replace(/\{met\}/g, met).replace(/\{Met\}/g, Met).replace(/\{art\}/g, art);
      const tasks = T.some(t => / et /.test(t)) ? T.join(", ") : T[0] + ", " + T[1] + " et " + T[2];   /* évite « … et … et … » quand une mission contient déjà « et » */
      const qua = "Pour réussir, il faut être " + Q[0] + ", " + Q[1] + " et " + Q[2] + ".";
      const youth = fill(YOUTH[(k * 4 + (k % 5)) % YOUTH.length]), close = fill(CLOSE[(k * 3 + 1) % CLOSE.length]);
      const g = k % 5, pal = PAL[k % PAL.length];
      let title, S;
      if(g === 0){
        title = 'Devenir ' + lc(nom) + ' : bien faire et réussir';
        S = [[e,"Un métier à connaître","Moi, SHAMAN CHOOZ, je te présente " + art + ". " + d],
             ['🛠️',"Ce que l'on fait","Les missions courantes : " + tasks + "."],
             ['⭐',"Les qualités utiles",qua],
             ['✅',"Pour bien faire",B],
             ['🌟',"Les avantages",A],
             ['💪',"À toi de jouer",youth],
             ['🤝',"Avec SHAMAN CHOOZ",close]];
      } else if(g === 1){
        title = nom + ' : le bon réflexe du métier';
        S = [['✅',"Le bon réflexe","Dans " + met + ", voici le réflexe qui change tout. " + B],
             [e,"De quoi s'agit-il ?",nom + " : " + lc(d)],
             ['🛠️',"Les gestes du métier","Voici ce qu'on fait chaque jour : " + tasks + "."],
             ['⭐',"Ce qu'il faut avoir",qua],
             ['🌟',"Pourquoi c'est un bon choix",A],
             ['🚀',"Place à la jeunesse",youth],
             ['📞',"Besoin de ce profil ?",close]];
      } else if(g === 2){
        title = 'Sais-tu ce que fait ' + art + ' ?';
        S = [['🤔',"Tu connais ce métier ?","Sais-tu ce que fait " + art + " ? Reste avec moi, SHAMAN CHOOZ : je t'explique simplement."],
             [e,"La réponse",d],
             ['🛠️',"Les tâches du jour","On peut te demander de " + tasks + "."],
             ['⭐',"Ton profil idéal",qua],
             ['💡',"Le secret du travail bien fait",B],
             ['🎁',"Ce que ce métier t'apporte",A],
             ['💪',"Courage, les jeunes",youth],
             ['🤝',"SHAMAN CHOOZ à tes côtés",close]];
      } else if(g === 3){
        title = 'Le conseil de SHAMAN CHOOZ : ' + lc(nom);
        S = [['💡',"Le conseil de SHAMAN CHOOZ","Moi, SHAMAN CHOOZ, je te donne un conseil pour réussir dans " + met + ". " + B],
             [e,"Un métier utile",d],
             ['🛠️',"Au travail, chaque jour","Chaque jour, tu peux avoir à " + tasks + "."],
             ['🌟',"Ce que tu y gagnes",A],
             ['⭐',"Les qualités qui font la différence",qua],
             ['💪',"Jeunes, osez",youth],
             ['🤝',"SHAMAN CHOOZ recrute",close]];
      } else {
        title = 'Jeunes : pourquoi choisir ' + met + ' ?';
        S = [['🎯',"Pour les jeunes","Tu cherches ta voie ? Moi, SHAMAN CHOOZ, je te propose de découvrir " + met + "."],
             [e,"Concrètement",d],
             ['🛠️',"Les missions","Tu apprendras à " + tasks + "."],
             ['✅',"Bien faire",B],
             ['⭐',"Tes qualités",qua],
             ['🌟',"Les points forts du métier",A],
             ['💪',"Lance-toi",youth],
             ['🤝',"SHAMAN CHOOZ t'accompagne",close]];
      }
      SCCS.add(prefix + '-' + n, title, 'Métiers', pal, S, { photo:true });
      SCC_JOBS.count++;
    });
  }
};
})();

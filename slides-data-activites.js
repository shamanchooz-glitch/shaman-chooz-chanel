/* ==========================================================
   ACTIVITÉS — « 200 IDÉES POUR ÊTRE AUTONOME » : le moteur qui fabrique les vidéos
   Il prend les 200 activités et les budgets de chaque pays (activites-pays.js)
   et crée UNE vidéo par activité et par monnaie, avec ta photo :
     • Activités 1 à 100   (slides-data-activites1.js à 4.js)  → 6 écrans + page « Contactez-nous » de l'agence :
         1. l'idée (SHAMAN CHOOZ la présente)       4. « Avec le 3e budget »
         2. « Avec le 1er budget »                   5. Vendre, épargner, évoluer
         3. « Avec le 2e budget »                    6. Un conseil de SHAMAN CHOOZ (tourne sur 8 conseils)
     • Activités 101 à 200 (slides-data-activites5.js à 8.js) → 7 écrans + page « Contactez-nous » de l'agence :
         les mêmes 5 premiers écrans, puis  6. Le conseil de SHAMAN CHOOZ propre à l'activité
         et  7. un conseil général de réussite (tourne sur 12 conseils ; 4 conseils de plus pour la zone FCFA : statut d'entreprenant, cahier de recettes, aides officielles, arnaques)
   Ce fichier doit être chargé APRÈS slides-engine.js, activites-pays.js et slides-data-activites1.js … 8.js (voir index.html).
   Pour ajouter une activité : ajoute une ligne dans l'un des fichiers slides-data-activites1.js … 8.js.
   Pour ajouter / corriger une monnaie : modifie activites-pays.js. Pour limiter les pays diffusés : ligne ACT_ACTIFS dans activites-pays.js
   (par exemple  window.ACT_ACTIFS = ['fcfa'];  pour ne diffuser que la Côte d'Ivoire et la zone FCFA).
   Identifiants : « acfcfa-001 » … « acfcfa-200 » (FCFA), « acngn-001 » … (nairas), etc.
   ========================================================== */
(function(){
if(!window.SCCS || !window.ACT100 || !window.ACT_PAYS) return;
if(window.ACT100.length !== 100) console.warn('Activités : ' + window.ACT100.length + ' activités chargées au lieu de 100 (vérifie slides-data-activites1.js … 4.js).');

const PAL = ['orange','vert','bleu','rose','violet','turquoise','or','terre','rouge','nuit'];
const fmt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/* Conseil final des activités 1 à 100 : 8 variantes, distribuées en tournant (une vidéo sur huit finit par l'appel à l'agence) */
const CONSEILS = [
 ['📒',"Note tout dans un cahier","Chaque soir, écris ce que tu as dépensé et ce que tu as vendu. Ce qui reste, c'est ton bénéfice. Mets-en une partie de côté."],
 ['🐷',"Épargne avant de dépenser","Mets de côté une petite part de chaque vente avant de dépenser le reste. C'est comme ça qu'on passe d'un petit budget à un vrai commerce."],
 ['📺',"Partage cette vidéo","Envoie-la à un ami ou à une amie qui veut devenir autonome. Moi, SHAMAN CHOOZ, je publie chaque jour de nouvelles idées sur la chaîne."],
 ['🤝',"Le sérieux paie","Sois honnête, ponctuel et propre. Un client content revient et en amène d'autres : c'est ta meilleure publicité."],
 ['📞',"Besoin d'un emploi ?","SHAMAN CHOOZ recrute et place des jeunes dans tous les secteurs d'activité. Contacte l'agence : les coordonnées arrivent juste après."],
 ['💡',"Commence petit, vois grand","N'attends pas d'avoir beaucoup d'argent pour démarrer. Commence avec ce que tu as, apprends, puis agrandis petit à petit."],
 ['⚠️',"Attention aux arnaques","Ne donne jamais d'argent à quelqu'un qui promet de te faire gagner beaucoup, très vite. Un vrai travail se construit pas à pas."],
 ['🎯',"Fixe-toi un objectif","Choisis un but clair : un montant à épargner chaque mois, ou un matériel à acheter. Un objectif te garde motivé."]
];

/* Conseil général de réussite des activités 101 à 200 : 12 conseils pour tous les pays (basés sur les bonnes pratiques des petits commerces
   et sur les règles d'hygiène de la FAO pour les aliments de rue) */
const CONSEILS2 = [
 ['💼',"Sépare ton argent","Garde l'argent de ton activité dans une boîte ou un compte à part, sans le mélanger avec tes dépenses personnelles. C'est comme ça qu'on voit ce qu'on gagne vraiment."],
 ['🧪',"Teste avant d'agrandir","Pendant deux à quatre semaines, vends peu de produits dans un ou deux quartiers et note tout. Quand tu sais ce qui marche, tu peux investir davantage."],
 ['🧮',"Calcule ton vrai bénéfice","Ce que tu encaisses n'est pas ce que tu gagnes. Enlève ce que tu as acheté, le transport, les pertes et les invendus : le reste est ton vrai bénéfice."],
 ['📓',"Attention au crédit","Si tu vends à crédit, écris le nom, le montant et la date de paiement. Limite le crédit à quelques clients sûrs : trop de crédit peut vider ta caisse."],
 ['📦',"Pas trop de stock","Un stock qui dort, c'est de l'argent qui dort. Achète en petite quantité, réachète quand tout est vendu, et garde ton argent en mouvement."],
 ['🧼',"La propreté fait vendre","Une eau propre, des mains lavées et des produits couverts donnent confiance à tes clients. Si tu vends à manger, protège tes aliments de la poussière et du soleil."],
 ['⭐',"Écoute tes clients","Demande à chaque client ce qu'il aime et ce qu'il changerait. Un petit mot gentil et un suivi après la vente le font revenir."],
 ['🌱',"Deux quartiers d'abord","Sers très bien deux quartiers avant d'en viser dix. Une bonne réputation près de chez toi vaut mieux qu'une grande publicité."],
 ['🏆',"Ne lâche pas","Les premiers jours sont parfois lents. Beaucoup de grands commerçants ont commencé avec presque rien : ce qui fait la différence, c'est de continuer."],
 ['🤲',"Apprends de ceux qui savent","Va voir quelqu'un qui fait déjà ce métier et pose-lui tes questions. Un bon conseil gratuit peut t'éviter des mois d'erreurs."],
 ['🎯',"Trois produits bien choisis","Commence avec trois produits que tu connais bien plutôt que dix que tu connais mal. Tu comprends mieux tes clients et tu perds moins."],
 ['📱',"Mets de côté sur ton mobile","Garde une petite part de chaque gain sur ton compte d'argent mobile, en lieu sûr. Tu l'utiliseras pour acheter plus de marchandise ou pour une urgence."]
];

/* Conseils de plus pour la Côte d'Ivoire et la zone FCFA (pays de l'OHADA : statut d'« entreprenant » prévu par l'Acte uniforme sur le droit commercial général) */
const CONSEILS_FCFA = [
 ['📝',"Déclare ton activité","Dans les pays de l'OHADA, dont la Côte d'Ivoire, tu peux déclarer ton petit commerce comme « entreprenant » : c'est un statut simple. En Côte d'Ivoire, renseigne-toi au CEPICI."],
 ['📒',"Le cahier des recettes","Un entreprenant note chaque jour ses recettes et ses dépenses dans un cahier. Prends cette habitude dès maintenant : c'est la base d'un commerce solide."],
 ['🏛️',"Cherche l'aide officielle","En Côte d'Ivoire, l'État soutient parfois des projets de jeunes. Démarre déjà ton activité, tiens bien tes comptes, et renseigne-toi auprès de l'Agence Emploi Jeunes ou de ta mairie."],
 ['⚠️',"Ne paie pas pour un financement","Méfie-toi de ceux qui te demandent de l'argent pour te « faire obtenir » un financement ou un emploi. Les démarches sérieuses ne s'achètent pas : vérifie auprès des services officiels."]
];

/* Zones : « AO » = Afrique de l'Ouest (monnaies de cette liste) */
const AO = ['fcfa','ngn','ghs','gnf','sle','lrd','gmd'];

let k = 0;
const actifs = Array.isArray(window.ACT_ACTIFS) ? window.ACT_ACTIFS : null;

/* ---------- Activités 1 à 100 (inchangé) ---------- */
window.ACT_PAYS.forEach(p => {
  if(actifs && actifs.indexOf(p.id) < 0) return;
  const B = p.budgets.map(fmt);
  window.ACT100.forEach((a, i) => {
    if(!a || a.length < 8) return;
    const id = 'ac' + p.id + '-' + String(i + 1).padStart(3, '0');
    const titre = a[1] + ' : démarre avec ' + B[0] + ' ' + p.unite;
    const c = CONSEILS[k++ % CONSEILS.length];
    SCCS.add(id, titre, 'Agence', PAL[i % PAL.length], [
      [a[0], a[1], "Moi, SHAMAN CHOOZ, je te propose cette idée pour " + p.lieu + ". " + a[2]],
      ['💰', 'Avec ' + B[0] + ' ' + p.unite, a[3]],
      ['💰', 'Avec ' + B[1] + ' ' + p.unite, a[4]],
      ['💰', 'Avec ' + B[2] + ' ' + p.unite, a[5]],
      ['📈', 'Vendre, épargner, évoluer', a[6] + ' ' + a[7]],
      c
    ], { photo:true });
  });
});

/* ---------- Activités 101 à 200 (nouvelles : 7 écrans) ---------- */
const NOUV = Array.isArray(window.ACT200) ? window.ACT200 : [];
if(NOUV.length && NOUV.length !== 100) console.warn('Activités : ' + NOUV.length + ' nouvelles activités chargées au lieu de 100 (vérifie slides-data-activites5.js … 8.js).');
const concerne = (a, id) => { const z = a[9]; if(!Array.isArray(z) || !z.length) return true; return z.indexOf(id) >= 0 || (z.indexOf('AO') >= 0 && AO.indexOf(id) >= 0); };
let k2 = 0;
window.ACT_PAYS.forEach(p => {
  if(actifs && actifs.indexOf(p.id) < 0) return;
  const B = p.budgets.map(fmt);
  const pool = p.id === 'fcfa' ? CONSEILS2.concat(CONSEILS_FCFA) : CONSEILS2;
  NOUV.forEach((a, i) => {
    if(!a || a.length < 9 || !concerne(a, p.id)) return;
    const id = 'ac' + p.id + '-' + String(101 + i).padStart(3, '0');
    const titre = a[1] + ' : démarre avec ' + B[0] + ' ' + p.unite;
    const c = pool[k2++ % pool.length];
    SCCS.add(id, titre, 'Agence', PAL[(100 + i) % PAL.length], [
      [a[0], a[1], "Moi, SHAMAN CHOOZ, je te propose cette idée. " + a[2]],
      ['💰', 'Avec ' + B[0] + ' ' + p.unite, a[3]],
      ['💰', 'Avec ' + B[1] + ' ' + p.unite, a[4]],
      ['💰', 'Avec ' + B[2] + ' ' + p.unite, a[5]],
      ['📈', 'Vendre, puis évoluer', a[6] + ' ' + a[7]],
      ['💡', 'Le conseil de SHAMAN CHOOZ', a[8]],
      c
    ], { photo:true });
  });
});
})();

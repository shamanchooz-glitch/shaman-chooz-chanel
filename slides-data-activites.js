/* ==========================================================
   ACTIVITÉS — « 100 IDÉES POUR ÊTRE AUTONOME » : le moteur qui fabrique les vidéos
   Il prend les 100 activités (slides-data-activites1.js à 4.js) et les budgets de chaque pays (activites-pays.js)
   et crée UNE vidéo par activité et par monnaie, avec ta photo (6 écrans + page « Contactez-nous » de l'agence) :
     1. l'idée (SHAMAN CHOOZ la présente)       4. « Avec le 3e budget »
     2. « Avec le 1er budget »                   5. Vendre, épargner, évoluer
     3. « Avec le 2e budget »                    6. Un conseil de SHAMAN CHOOZ (tourne sur 8 conseils)
   Ce fichier doit être chargé APRÈS slides-engine.js, activites-pays.js et slides-data-activites1.js … 4.js (voir index.html).
   Pour ajouter une activité : ajoute une ligne dans l'un des fichiers slides-data-activites1.js … 4.js.
   Pour ajouter / corriger une monnaie : modifie activites-pays.js. Pour limiter les pays diffusés : ligne ACT_ACTIFS dans activites-pays.js.
   Identifiants : « acfcfa-001 » … « acfcfa-100 » (FCFA), « acngn-001 » … (nairas), etc.
   ========================================================== */
(function(){
if(!window.SCCS || !window.ACT100 || !window.ACT_PAYS) return;
if(window.ACT100.length !== 100) console.warn('Activités : ' + window.ACT100.length + ' activités chargées au lieu de 100 (vérifie slides-data-activites1.js … 4.js).');

const PAL = ['orange','vert','bleu','rose','violet','turquoise','or','terre','rouge','nuit'];
const fmt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/* Conseil final : 8 variantes, distribuées en tournant (une vidéo sur huit finit par l'appel à l'agence) */
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

let k = 0;
const actifs = Array.isArray(window.ACT_ACTIFS) ? window.ACT_ACTIFS : null;

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
})();

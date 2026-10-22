/* ==========================================================
   DIAPORAMAS « AGENCE PRO » (200) — 20 secteurs d'activité × 10 thèmes
   Prestations de services, recrutement et placement de personnel (domestique, urbain, commercial),
   compétences, motivations, innovation, mise en relation employeurs / employés dans le monde entier.
   Ils s'ajoutent à la boucle de la chaîne avec les autres diaporamas (la photo, la voix off et la page
   « Contactez-nous » sont gérées par slides-engine.js et agence-config.js).
   Pour changer un texte : modifie les listes SECTEURS et THEMES ci-dessous (garde les guillemets et les virgules).
   {s} = nom du secteur, {m} = métiers du secteur.
   ========================================================== */
(function(){
if(!window.SCCS) return;
const SECTEURS = [
 ['ménage et travaux domestiques','🏠','ménagères, aides à domicile, repasseuses'],
 ['cuisine et restauration','🍳','cuisiniers, serveurs, aides de cuisine'],
 ['sécurité et gardiennage','🛡️','gardiens, agents de sécurité, veilleurs'],
 ['transport et chauffeurs','🚗','chauffeurs, coursiers, conducteurs'],
 ['jardinage et espaces verts','🌿','jardiniers, paysagistes, agents d\'entretien'],
 ['garde d\'enfants','🧒','nounous, éducatrices, baby-sitters'],
 ['aide aux personnes âgées','🤝','auxiliaires de vie, garde-malades'],
 ['commerce et vente','🛒','vendeurs, caissiers, commerciaux'],
 ['hôtellerie et accueil','🏨','réceptionnistes, femmes de chambre, bagagistes'],
 ['bâtiment et construction','🏗️','maçons, peintres, plombiers, électriciens'],
 ['logistique et livraison','📦','magasiniers, livreurs, manutentionnaires'],
 ['administration et secrétariat','🗂️','secrétaires, assistants, agents d\'accueil'],
 ['comptabilité et finance','📊','comptables, caissiers, gestionnaires'],
 ['informatique et numérique','💻','techniciens, développeurs, community managers'],
 ['santé et soins','🩺','aides-soignants, infirmiers, agents de santé'],
 ['éducation et formation','📚','enseignants, répétiteurs, formateurs'],
 ['agriculture et élevage','🌾','ouvriers agricoles, éleveurs, conducteurs d\'engins'],
 ['couture et artisanat','🧵','couturiers, tailleurs, artisans'],
 ['beauté et coiffure','💇','coiffeurs, esthéticiennes, maquilleurs'],
 ['événementiel et animation','🎉','animateurs, traiteurs, décorateurs']
];
const THEMES = [
 ['Nos compétences en {s}',[
  ['🎯','Des profils sélectionnés','Nous recherchons des {m} dont le parcours correspond vraiment au besoin.'],
  ['📋','Un dossier vérifié','Expérience, références et sérieux sont contrôlés avant toute présentation.'],
  ['🛠️','Des savoir-faire utiles','Chaque candidat met en avant ce qu\'il sait faire concrètement.'],
  ['🏡','Du foyer à l\'entreprise','Nous répondons aux besoins des particuliers comme des commerces et des sociétés.'],
  ['⭐','Une qualité qui rassure','Un bon placement commence par un bon choix : nous prenons le temps de le faire.']]],
 ['Nos motivations en {s}',[
  ['💛','Pourquoi nous le faisons','Parce qu\'un travail honnête change une vie et fait vivre une famille.'],
  ['🌱','Offrir une vraie chance','Chaque candidat motivé mérite d\'être écouté et présenté aux bons employeurs.'],
  ['🤝','Rassurer les employeurs','Nous voulons que chaque employeur trouve des personnes de confiance.'],
  ['📈','Grandir ensemble','Quand le candidat et l\'employeur réussissent, notre travail a du sens.'],
  ['🔥','Une énergie qui se voit','Nous avançons avec courage, sérieux et envie de bien faire.']]],
 ['Innover en {s}',[
  ['💡','Toujours chercher mieux','Nous améliorons sans cesse notre façon de recruter et de placer du personnel.'],
  ['📱','Le numérique à votre service','Nous utilisons le téléphone et internet pour rapprocher candidats et employeurs.'],
  ['⚡','Des démarches plus rapides','Moins d\'attente, plus de clarté : vous savez où en est votre dossier.'],
  ['🧭','Des prestations adaptées','Chaque pays, chaque secteur et chaque besoin ont leurs particularités.'],
  ['🚀','Une agence qui évolue','Nous testons de nouvelles idées pour mieux vous servir, pays après pays.']]],
 ['L\'honnêteté avant tout : {s}',[
  ['🔍','La confiance se construit','Nous plaçons des {m} honnêtes, sérieux et respectueux.'],
  ['🗣️','Dire la vérité','Un bon candidat annonce clairement son expérience et ses disponibilités.'],
  ['📝','Des engagements clairs','Missions, horaires et conditions sont expliqués avant le début du travail.'],
  ['🔒','Respect et confidentialité','Les informations personnelles sont traitées avec discrétion.'],
  ['⚖️','Une relation durable','L\'honnêteté des deux côtés évite les malentendus et fidélise.']]],
 ['Courage et dynamisme en {s}',[
  ['💪','Des personnes courageuses','Les {m} que nous présentons aiment le travail bien fait.'],
  ['⏰','Ponctualité et sérieux','Arriver à l\'heure et tenir ses promesses font la différence.'],
  ['🏃','Dynamiques et motivés','Ils s\'adaptent vite aux consignes et aux nouveaux environnements.'],
  ['📚','Toujours apprendre','Poser des questions et progresser chaque jour ouvre de belles portes.'],
  ['🌟','Le travail qui ouvre des portes','Un employé fiable est souvent recommandé et recontacté.']]],
 ['{s} : partout dans le monde',[
  ['🌍','Sans frontières','Nous recrutons et plaçons du personnel dans de nombreux pays.'],
  ['🔗','Relier employeurs et employés','Que vous soyez ici ou à l\'autre bout du monde, nous créons le contact.'],
  ['🗺️','Des besoins partout','Le secteur « {s} » recherche des {m} dans toutes les régions.'],
  ['📞','Un contact simple','Un message suffit pour expliquer votre besoin ou présenter votre profil.'],
  ['🤲','Une aide à chaque étape','De la première prise de contact jusqu\'au placement, nous restons à l\'écoute.']]],
 ['Comment ça marche en {s} ?',[
  ['1️⃣','Vous nous contactez','Vous expliquez votre besoin ou présentez votre profil.'],
  ['2️⃣','Nous étudions la demande','Nous vérifions les informations et cherchons les meilleures correspondances.'],
  ['3️⃣','Nous présélectionnons','Seuls les profils ou les offres qui conviennent sont retenus.'],
  ['4️⃣','Mise en relation','Nous organisons la rencontre entre l\'employeur et le candidat.'],
  ['5️⃣','Placement et suivi','Après le démarrage, nous restons disponibles en cas de besoin.']]],
 ['Conseils aux candidats : {s}',[
  ['🕘','Soyez ponctuel','Arriver à l\'heure à l\'entretien montre déjà votre sérieux.'],
  ['📄','Préparez un CV clair','Écrivez des informations vraies : parcours, compétences, contacts.'],
  ['😊','Soignez votre présentation','Une tenue propre et un sourire sincère créent une bonne première impression.'],
  ['🎤','Parlez avec honnêteté','Expliquez ce que vous savez faire et ce que vous voulez apprendre.'],
  ['🙏','Restez poli et motivé','Le respect et l\'envie d\'apprendre séduisent tous les employeurs.']]],
 ['Conseils aux employeurs : {s}',[
  ['📣','Décrivez bien le poste','Missions, horaires, lieu et conditions doivent être clairs dès le départ.'],
  ['🤝','Accueillez bien','Un bon accueil aide vos {m} à s\'intégrer et à bien travailler.'],
  ['💬','Communiquez','Expliquez ce que vous attendez et dites merci quand c\'est bien fait.'],
  ['💰','Respectez vos engagements','Un salaire versé à temps et un contrat respecté créent la confiance.'],
  ['🌳','Fidélisez vos équipes','Une personne bien traitée reste plus longtemps et travaille mieux.']]],
 ['Rejoignez-nous : {s}',[
  ['🙋','Vous cherchez un emploi ?','Présentez-vous : nous écoutons votre parcours et vos objectifs.'],
  ['🏢','Vous cherchez du personnel ?','Dites-nous qui vous cherchez : nous avons des profils dans le secteur « {s} ».'],
  ['🌍','Où que vous soyez','Nous aidons candidats et employeurs dans le monde entier.'],
  ['✅','Honnêteté, sérieux, courage','Ce sont les qualités que nous recherchons chez chaque personne que nous plaçons.'],
  ['📞','Passez à l\'action','Contactez-nous dès aujourd\'hui : voici nos coordonnées juste après ce diaporama.']]]
];
const PAL = ['bleu','vert','orange','violet','rouge','or','rose','turquoise','nuit','terre'];
SECTEURS.forEach((sec, si)=>{
  THEMES.forEach((th, ti)=>{
    const f = t => t.replace(/\{s\}/g, sec[0]).replace(/\{m\}/g, sec[2]);
    let titre = f(th[0]); titre = titre.charAt(0).toUpperCase() + titre.slice(1);
    SCCS.add('pro-' + (si + 1) + '-' + (ti + 1), titre, 'Agence', PAL[(si + ti) % PAL.length],
      th[1].map((s, k) => [k === 0 ? sec[1] : s[0], f(s[1]), f(s[2])]));
  });
});
})();

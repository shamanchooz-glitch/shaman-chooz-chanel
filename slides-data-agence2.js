/* ==========================================================
   DIAPORAMAS « AGENCE — PUBS » (13) — prestations de l'agence : personnel de maison, entretien,
   sécurité, chauffeurs, artisans, aide aux seniors, commerce, événements…
   Chaque ligne : S(identifiant, titre, palette, [[emoji, titre, texte], …])
   Ces vidéos affichent ta photo (voir « photo » dans agence-config.js) et se terminent
   automatiquement par la page « Contactez-nous » avec les coordonnées de agence-config.js.
   Palettes : bleu, vert, orange, violet, rouge, or, rose, turquoise, nuit, terre
   ========================================================== */
(function(){
if(!window.SCCS) return;
const S = (id, t, pal, sl)=> SCCS.add(id, t, 'Agence', pal, sl, { photo:true });

S('ap-employe-maison','Employé(e) de maison : trouvez la perle rare','bleu',[
 ['🏠',"Une maison bien tenue","Ménage, linge, repas, courses : un employé de confiance vous rend la vie plus légère."],
 ['🔎',"Nous cherchons pour vous","Dites-nous vos besoins : horaires, tâches, logé ou non. Nous recherchons les profils adaptés."],
 ['✅',"Des candidats sélectionnés","Nous rencontrons les candidats et regardons leur parcours avant de vous les présenter."],
 ['🤝',"Un accord clair","Missions, horaires et conditions sont précisés dès le départ pour éviter les malentendus."],
 ['📞',"Parlons de votre besoin","Contactez notre agence : nous vous guidons pas à pas."]
]);
S('ap-nounou','Nounou et garde d\'enfants de confiance','rose',[
 ['👶',"Vos enfants, notre priorité","Nous recherchons des personnes douces, patientes et responsables."],
 ['📋',"Précisez le profil","Âge des enfants, horaires, expérience souhaitée : plus c'est précis, mieux c'est."],
 ['🧾',"Entretien et expérience","Nous échangeons avec les candidats et regardons leur expérience auprès des enfants."],
 ['🧸',"Bien démarrer","Une période d'adaptation permet à l'enfant, à la famille et à la nounou de se connaître."],
 ['📞',"Contactez-nous","Une garde de confiance, c'est un vrai soulagement pour les parents."]
]);
S('ap-cuisinier','Cuisinier(ère) à domicile','orange',[
 ['👨‍🍳',"Des repas faits maison","Un cuisinier à domicile prépare les repas selon vos goûts et votre budget."],
 ['🥘',"Cuisine locale ou variée","Plats ivoiriens, africains ou internationaux selon vos envies."],
 ['🧼',"L'hygiène avant tout","Nous recherchons des candidats sérieux, soigneux et respectueux des règles d'hygiène."],
 ['📅',"Pour tous vos besoins","Repas quotidiens, réceptions, événements familiaux : dites-nous ce qu'il vous faut."],
 ['📞',"Parlons-en","Contactez notre agence pour recevoir des profils adaptés."]
]);
S('ap-entretien','Femmes de ménage et agents d\'entretien','turquoise',[
 ['🧹',"Une propreté irréprochable","Maisons, bureaux, boutiques : des agents d'entretien sérieux et organisés."],
 ['⏰',"À votre rythme","Quelques heures par semaine ou à temps plein : nous nous adaptons à votre besoin."],
 ['🧽',"Des personnes motivées","Nous recherchons des candidats appliqués, ponctuels et discrets."],
 ['🏢',"Pour les entreprises aussi","Bureaux, commerces, hôtels : un entretien régulier donne une bonne image."],
 ['📞',"Contactez-nous","Dites-nous votre besoin et nous cherchons le bon profil."]
]);
S('ap-gardien','Gardiens et agents de sécurité','nuit',[
 ['🛡️',"Protéger vos biens et vos proches","Un gardien attentif rassure toute la famille ou toute l'équipe."],
 ['🏠',"Domicile, commerce, chantier","Nous recrutons pour des lieux et des horaires variés, de jour comme de nuit."],
 ['🧭',"Qualités recherchées","Vigilance, sérieux, bonne présentation et respect des consignes."],
 ['📋',"Un besoin précis ?","Précisez les horaires, le lieu et les missions : nous vous proposons des profils adaptés."],
 ['📞',"Appelez-nous","Une équipe à votre écoute pour vous aider à bien recruter."]
]);
S('ap-chauffeur','Chauffeurs professionnels','bleu',[
 ['🚗',"Un chauffeur de confiance","Pour votre famille, votre entreprise ou vos livraisons."],
 ['📄',"Des papiers à jour","Permis valide et expérience : nous demandons les documents essentiels."],
 ['🚦',"Prudence et ponctualité","Conduite sûre, respect du code de la route et sens du service."],
 ['🗺️',"Bonne connaissance de la ville","Un bon chauffeur sait gérer les trajets et les imprévus."],
 ['📞',"Parlons de votre besoin","Contactez l'agence : nous cherchons le bon profil pour vous."]
]);
S('ap-artisans','Artisans et hommes à tout faire','terre',[
 ['🔧',"Plomberie, électricité, peinture","Des réparations à la maison ? Nous vous aidons à trouver des professionnels."],
 ['🏗️',"Maçons, carreleurs, menuisiers","Pour construire, rénover ou aménager : des artisans qualifiés."],
 ['💬',"Décrivez votre projet","Plus votre besoin est clair, plus vite nous trouvons la bonne personne."],
 ['🧾',"Demandez un devis","Un prix annoncé avant le travail évite les mauvaises surprises."],
 ['📞',"Contactez notre agence","Nous mettons en relation clients et artisans sérieux."]
]);
S('ap-seniors','Aide aux personnes âgées','vert',[
 ['👵',"Prendre soin de nos aînés","Une aide à domicile apporte confort, sécurité et compagnie."],
 ['🍲',"Un soutien au quotidien","Repas, hygiène, courses, accompagnement aux rendez-vous."],
 ['❤️',"Des qualités humaines","Patience, respect, écoute : nous recherchons ces qualités avant tout."],
 ['👨‍👩‍👧',"Rassurer la famille","Savoir un proche bien entouré apporte la tranquillité."],
 ['📞',"Contactez-nous","Nous vous aidons à trouver la personne adaptée."]
]);
S('ap-commerce','Vendeurs, caissiers et commerciaux','orange',[
 ['🛒',"Faites grandir vos ventes","Un bon vendeur accueille, conseille et fidélise les clients."],
 ['💵',"Des caissiers fiables","Rigueur, honnêteté et sens des chiffres pour une caisse bien tenue."],
 ['📈',"Des commerciaux motivés","Prospection, suivi des clients, objectifs : nous cherchons des profils dynamiques."],
 ['🎯',"Un profil sur mesure","Dites-nous quel est votre produit et qui est votre clientèle."],
 ['📞',"Recrutons ensemble","Contactez l'agence pour présenter votre besoin."]
]);
S('ap-evenement','Du personnel pour vos événements','rose',[
 ['🎉',"Mariage, baptême, anniversaire","Serveurs, hôtesses, aides de cuisine : le personnel qu'il faut pour que tout se passe bien."],
 ['📅',"Pour un jour ou plus","Missions ponctuelles ou de plusieurs jours : nous nous adaptons."],
 ['👔',"Une bonne présentation","Tenue soignée, ponctualité et sourire au rendez-vous."],
 ['🧭',"Prévoyez à l'avance","Plus tôt vous nous contactez, plus la préparation est facile."],
 ['📞',"Contactez-nous","Dites-nous la date, le lieu et le nombre d'invités."]
]);
S('ap-engagements','Nos engagements','or',[
 ['🤝',"Écoute","Nous prenons le temps de comprendre votre besoin ou votre projet professionnel."],
 ['⚡',"Réactivité","Nous répondons vite et vous tenons informé de l'avancement."],
 ['🔒',"Confidentialité","Vos informations sont traitées avec respect et discrétion."],
 ['🎯',"Des profils adaptés","Nous cherchons la bonne personne pour le bon poste."],
 ['👥',"Une agence à votre écoute","Notre équipe vous accompagne avant, pendant et après le recrutement."]
]);
S('ap-jeunes','Jeunes : on vous accompagne vers l\'emploi','violet',[
 ['🎓',"Pas encore d'expérience ?","Tout le monde a commencé quelque part : vos qualités comptent aussi."],
 ['📝',"Un CV, même simple","Nous vous aidons à présenter votre parcours, vos formations et vos points forts."],
 ['💬',"Préparer l'entretien","Savoir se présenter et répondre aux questions donne de l'assurance."],
 ['🚀',"Premiers postes, premières missions","Stages, missions temporaires, emplois : on cherche ensemble."],
 ['📞',"Venez nous voir","Contactez l'agence : votre avenir commence par un premier pas."]
]);
S('ap-urgence','Besoin urgent de personnel ?','rouge',[
 ['🚨',"Un poste à pourvoir vite ?","Nous savons que certains besoins ne peuvent pas attendre."],
 ['📞',"Appelez-nous directement","Plus votre demande est précise, plus vite nous pouvons agir."],
 ['🗂️',"Notre base de candidats","Nous consultons notre base pour proposer rapidement des profils."],
 ['🤝',"Entretien et sélection","Vous rencontrez des candidats déjà présélectionnés."],
 ['✅',"Tous les secteurs d'activité","Comptable, vendeur, agent d'entretien, gardien… nous recrutons dans tous les domaines."]
]);
})();

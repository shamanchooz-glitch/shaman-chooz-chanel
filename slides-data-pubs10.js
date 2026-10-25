/* ==========================================================
   PUBS 10/10 — LE MONDE ENTIER, LES MÉTIERS URBAINS ET COMMERCIAUX, LES EMPLOYEURS (40 nouveaux diaporamas)
   Régions du monde, métiers de la ville et du commerce, employeurs qui recrutent, confiance et sérieux.
   Aucune promesse de visa, d'emploi garanti ou de salaire : les règles dépendent de chaque pays.
   Chaque diaporama = 4 écrans + 1 écran « appel à l'action » ajouté automatiquement, puis la page « Contactez-nous ».
   C(...) = pour les candidat(e)s • E(...) = pour les employeurs / familles
   Les identifiants commencent par « pw- ».
   ========================================================== */
(function(){
if(!window.SCCS) return;
let k = 4;
const PC = ["Postulez dès aujourd'hui","Inscrivez-vous maintenant","Votre place vous attend","Appelez-nous","Faites le premier pas"];
const PE = ["Parlons de votre besoin","Confiez-nous votre recherche","Contactez-nous","Un appel suffit","Recrutons ensemble"];
const C = (id,t,p,sl,cta)=> SCCS.add('pw-'+id, t, 'Agence', p, sl.concat([['📞', PC[k++ % PC.length], cta]]), { photo:true });
const E = (id,t,p,sl,cta)=> SCCS.add('pw-'+id, t, 'Agence', p, sl.concat([['📞', PE[k++ % PE.length], cta]]), { photo:true });

/* ---------- Les régions du monde ---------- */
C('afrique-ouest',"Afrique de l'Ouest : des maisons et des commerces qui recrutent",'orange',[
 ['🌍',"Une région dynamique","Dans les grandes villes d'Afrique de l'Ouest, beaucoup de familles et de commerces cherchent du personnel."],
 ['🏠',"Maison, enfants, cuisine","Fille de ménage, nounou, servante de maison ou gouvernante : des besoins existent partout."],
 ['📜',"Chaque pays a ses règles","Contrat, horaires et papiers diffèrent : renseignez-vous toujours."],
 ['🤝',"Nous vous orientons","Notre agence met en relation employeurs et employés avec sérieux."]
],"Parlez-nous de votre projet. Nous cherchons avec vous.");

C('afrique-centrale',"Afrique centrale : de nouvelles opportunités à saisir",'vert',[
 ['🌿',"Des villes qui grandissent","Plus de familles actives, plus de besoin d'aide à la maison."],
 ['🧩',"Un seul métier","Pour SHAMAN CHOOZ, ménage, enfants et cuisine forment un même travail à valoriser."],
 ['📋',"Préparer son dossier","Papiers en règle, références, disponibilités : tout compte."],
 ['🛡️',"Prudence","Ne payez jamais pour une promesse d'emploi trop belle pour être vraie."]
],"Inscrivez-vous : nous étudions chaque dossier sérieusement.");

C('afrique-est-sud',"Afrique de l'Est et du Sud : des besoins réels",'turquoise',[
 ['🌅',"Des familles variées","Villes, résidences, hôtels et commerces : le besoin de personnel est présent."],
 ['🗣️',"Des langues à connaître","Parler la langue locale ou l'anglais peut aider beaucoup."],
 ['📑',"Un cadre légal","Renseignez-vous sur les règles de travail de chaque pays."],
 ['🤲',"Nous accompagnons","L'agence vous écoute et vous conseille avec honnêteté."]
],"Un projet de travail ? Contactez notre agence.");

C('maghreb',"Maghreb : tenir une maison avec sérieux",'terre',[
 ['🕌',"Des traditions fortes","Familles, accueil et cuisine ont une grande place dans la vie de la maison."],
 ['🍲',"Cuisine appréciée","Savoir bien cuisiner est un vrai atout."],
 ['🤝',"Respect mutuel","Respecter les habitudes de la famille et être respectée en retour."],
 ['📜',"Papiers et règles","Informez-vous bien avant tout projet de travail."]
],"Notre agence vous écoute et vous oriente. Appelez-nous.");

C('europe-maison',"Europe : les familles cherchent aussi de l'aide",'bleu',[
 ['🏙️',"Des vies très chargées","Beaucoup de parents travaillent et cherchent du soutien pour la maison et les enfants."],
 ['📑',"Des règles précises","Papiers, contrat et déclaration de travail sont très encadrés."],
 ['🗣️',"Les langues comptent","Le français, l'anglais ou la langue du pays facilitent l'intégration."],
 ['🛡️',"Prudence","Vérifiez toujours qui vous recrute avant de partir."]
],"Un projet à l'étranger ? Parlons-en sérieusement.");

C('golfe-moyen-orient',"Golfe et Moyen-Orient : bien se renseigner avant tout",'or',[
 ['🌆',"Une demande importante","Dans plusieurs pays, des familles recherchent du personnel de maison."],
 ['📜',"Contrat et lois","Les règles sont strictes : lisez et comprenez votre contrat."],
 ['🛂',"Garder ses papiers","Vos documents personnels vous appartiennent, ne les remettez jamais sans raison."],
 ['📞',"Rester en contact","Gardez le contact avec votre famille et avec l'agence."]
],"Vérifiez toujours avant de partir. Nous pouvons vous conseiller.");

C('amerique-nord',"Amérique du Nord : un marché exigeant",'nuit',[
 ['🍁',"Des conditions encadrées","Les règles d'immigration et de travail sont strictes."],
 ['📚',"Se préparer","Expérience, langue et références jouent un grand rôle."],
 ['🧩',"Polyvalence appréciée","Une personne capable de tenir la maison et de s'occuper des enfants est recherchée."],
 ['⚖️',"Rester dans la légalité","Passer par des voies officielles protège votre avenir."]
],"Un projet sérieux mérite de bons conseils. Contactez-nous.");

C('amerique-latine',"Amérique latine et Caraïbes : la maison au cœur de la vie",'rose',[
 ['🌴',"Des familles chaleureuses","Cuisine, enfants et maison forment souvent le centre de la vie familiale."],
 ['🍽️',"Les saveurs locales","S'adapter aux plats de la famille fait la différence."],
 ['🗣️',"La langue","Apprendre quelques mots d'espagnol, de portugais ou de créole aide beaucoup."],
 ['📜',"Se renseigner","Les règles varient d'un pays à l'autre."]
],"Parlons de votre projet avec honnêteté. Appelez-nous.");

C('asie-pacifique',"Asie et Pacifique : sérieux et préparation",'violet',[
 ['🌏',"De grandes villes","Beaucoup de familles ont besoin d'aide à la maison."],
 ['📖',"Comprendre la culture","Respecter les coutumes de la famille facilite le travail."],
 ['📝',"Un contrat compris","Prenez le temps de comprendre chaque ligne avant de signer."],
 ['🤝',"Rester entourée","Informez un proche de votre projet et de vos démarches."]
],"Avant de partir, informez-vous bien. Notre agence peut vous écouter.");

/* ---------- Métiers urbains et commerciaux ---------- */
C('vendeuse-boutique',"Vendeuse en boutique : un métier de contact",'rose',[
 ['🛍️',"L'accueil d'abord","Un sourire et un bonjour sincère donnent envie d'acheter."],
 ['👗',"Connaître les produits","Savoir expliquer et conseiller rassure le client."],
 ['🧼',"Une boutique propre","Rayons rangés et sols nets : la présentation compte."],
 ['🤝',"Honnêteté","Un client bien conseillé revient."]
],"Souriante et avenante ? Les commerces recrutent. Inscrivez-vous.");

C('caissiere-fiable',"Caissière : fiable et rigoureuse",'bleu',[
 ['💵',"Compter avec précision","Une caisse juste, c'est un commerce sain."],
 ['🧾',"Remettre le ticket","Un justificatif évite les malentendus."],
 ['😊',"Rester aimable","Même quand il y a la queue, un sourire calme les clients."],
 ['🔒',"Honnêteté absolue","La confiance se perd en un instant et se gagne sur des années."]
],"Rigoureuse et honnête ? Des commerces vous attendent.");

C('serveur-restaurant',"Serveur ou serveuse : l'art du service",'orange',[
 ['🍽️',"Accueillir","Installer les clients, apporter le menu, proposer une boisson."],
 ['📝',"Prendre la commande avec soin","Répéter pour être sûre : une erreur coûte du temps."],
 ['🏃‍♀️',"Être rapide et calme","Marcher vite sans courir, servir sans se précipiter."],
 ['😊',"Le sourire fait la différence","Un bon service fidélise les clients."]
],"Le service vous plaît ? Restaurants et maquis recrutent.");

C('livreur-coursier',"Livreur et coursier : fiable et ponctuel",'terre',[
 ['🛵',"Respecter les délais","Un colis livré à temps, c'est un client content."],
 ['🗺️',"Connaître les quartiers","Bien se repérer fait gagner du temps."],
 ['🦺',"Prudence sur la route","Casque, vitesse raisonnable, respect du code."],
 ['🤝',"Politesse","Le contact avec le client compte autant que la livraison."]
],"Vous connaissez bien la ville ? Des employeurs vous cherchent.");

C('accueil-reception',"Accueil et réception : le premier visage de l'entreprise",'turquoise',[
 ['🏢',"Une première impression","L'accueil donne le ton de toute l'entreprise."],
 ['📞',"Répondre au téléphone","Voix claire, politesse, notes précises."],
 ['👔',"Tenue soignée","Une apparence propre inspire confiance."],
 ['📋',"Organisation","Orienter les visiteurs, noter les rendez-vous, rester calme."]
],"Bien parler et bien accueillir ? Des entreprises recrutent.");

C('magasinier-stock',"Magasinier : tenir le stock avec précision",'vert',[
 ['📦',"Ranger logiquement","Chaque produit à sa place permet de gagner du temps."],
 ['📊',"Compter régulièrement","Un inventaire évite les pertes."],
 ['🦺',"Porter correctement","Protégez votre dos et demandez de l'aide pour les charges lourdes."],
 ['📝',"Noter les entrées et sorties","La rigueur est la base de ce métier."]
],"Sérieux et organisé ? Des commerces cherchent des magasiniers.");

C('gardien-residence',"Gardien de résidence : vigilance et sens de l'accueil",'nuit',[
 ['🏠',"Veiller sur la résidence","Portail, courrier, visiteurs : tout passe par vous."],
 ['👀',"Rester attentif","Signalez ce qui paraît anormal."],
 ['🤝',"Courtoisie","Salutations et respect envers les habitants."],
 ['📞',"Garder les numéros utiles","En cas de souci, vous savez qui appeler."]
],"Fiable et vigilant ? Rejoignez notre agence.");

C('chauffeur-famille',"Chauffeur de famille : prudence et discrétion",'bleu',[
 ['🚗',"Un véhicule propre","Intérieur net, plein fait, papiers à jour."],
 ['⏰',"Ponctualité","Les horaires de la famille et des enfants sont importants."],
 ['🤫',"Discrétion","Ce qui se dit dans la voiture reste dans la voiture."],
 ['🛡️',"Sécurité","Respect du code, ceinture, vitesse mesurée."]
],"Conducteur prudent et ponctuel ? Les familles vous attendent.");

C('aide-cuisine-resto',"Aide-cuisinier : apprendre un beau métier",'rouge',[
 ['🧑‍🍳',"On commence par les bases","Éplucher, couper, préparer, nettoyer."],
 ['🧼',"Hygiène stricte","Mains lavées, plan de travail net : dans une cuisine de restaurant, c'est la règle."],
 ['⏱️',"Travailler en équipe","On s'entraide, on communique, on garde son calme."],
 ['📈',"Évoluer","Avec le temps, on peut devenir cuisinier."]
],"Vous aimez la cuisine ? Restaurants et hôtels recrutent.");

C('nettoyage-commerces',"Entretien des commerces et des bureaux",'turquoise',[
 ['🏬',"Un lieu propre attire","Clients et employés apprécient les espaces nets."],
 ['🧽',"Tâches régulières","Sols, vitres, sanitaires, poubelles : tout se planifie."],
 ['🌅',"Horaires particuliers","Souvent tôt le matin ou le soir : c'est à prévoir."],
 ['🧩',"Les mêmes gestes","Ce que vous savez faire à la maison est aussi utile ici."]
],"Le ménage est votre force ? Entreprises et commerces recrutent.");

C('petit-commerce',"Aider dans un petit commerce",'or',[
 ['🏪',"Le cœur du quartier","Beaucoup de familles font vivre une boutique, un kiosque ou un étal."],
 ['🤲',"Aider avec sérieux","Servir, ranger, compter, accueillir : tout compte."],
 ['💬',"Parler aux clients","La confiance du quartier se construit petit à petit."],
 ['🌱',"Apprendre le commerce","Une bonne expérience peut ouvrir la voie à son propre projet."]
],"Vous aimez le contact avec les gens ? Parlez-nous de vous.");

C('secretariat-bureau',"Assistant(e) administratif(ve) : l'organisation au bureau",'violet',[
 ['🗂️',"Classer, trier, retrouver","Un bureau bien tenu fait gagner du temps à tous."],
 ['✉️',"Écrire clairement","Messages courts, polis et précis."],
 ['📱',"Outils numériques","Savoir utiliser un téléphone et un ordinateur est un vrai atout."],
 ['⏰',"Respecter les délais","On compte sur vous pour tenir l'agenda."]
],"Organisée et sérieuse ? Des entreprises vous attendent.");

C('vente-terrain',"Agent commercial : aller vers les clients",'orange',[
 ['🚶',"Aller à la rencontre","Présenter les produits, écouter les besoins, proposer."],
 ['🗣️',"Parler simplement","Expliquer clairement, sans exagérer."],
 ['📈',"Objectifs réalistes","Se fixer des buts et suivre ses résultats."],
 ['🤝',"Honnêteté","Un client satisfait revient et recommande."]
],"Vous avez le sens du contact ? Découvrez nos offres.");

/* ---------- Employeurs qui recrutent ---------- */
E('entreprise-recruter',"Entreprises : recrutez plus facilement",'bleu',[
 ['🏢',"Vous avez un besoin précis","Accueil, vente, entretien, magasin, sécurité, restauration : dites-nous le poste."],
 ['🔍',"Nous cherchons les profils","Nous étudions les candidatures et préparons les rencontres."],
 ['⏱️',"Gagnez du temps","Vous rencontrez des personnes déjà présentées et orientées."],
 ['🤝',"Un suivi si besoin","Nous restons disponibles après la mise en relation."]
],"Entreprises, parlons de votre recrutement. Appelez-nous.");

E('commercant-recruter',"Commerçants : trouvez une personne de confiance",'terre',[
 ['🏪',"Votre commerce a besoin d'aide","Vendeuse, caissière, aide-magasin : le bon choix compte."],
 ['🔒',"La confiance avant tout","Vous confiez votre caisse et vos clients : le choix doit être sérieux."],
 ['📋',"Définir le poste","Horaires, tâches, rémunération : mieux vaut tout préciser."],
 ['🧑‍🤝‍🧑',"Nous vous accompagnons","Nous cherchons le profil qui vous convient."]
],"Commerçants, contactez notre agence.");

E('hotel-resto-recruter',"Hôtels et restaurants : un personnel motivé",'orange',[
 ['🏨',"Du personnel à tous les niveaux","Réception, service, cuisine, entretien : chaque poste compte."],
 ['⏰',"Des horaires variés","Nous tenons compte de vos besoins et des disponibilités des candidats."],
 ['😊',"Un bon service","Un personnel souriant et formé fidélise la clientèle."],
 ['📞',"Parlez-nous de vos besoins","Nous cherchons ensemble les bons profils."]
],"Hôtels et restaurants, rejoignez-nous.");

E('diaspora-maison-pays',"Vous vivez à l'étranger : une maison à surveiller au pays",'violet',[
 ['🌍',"Loin mais attentif","Vous avez une maison, des parents ou des enfants au pays."],
 ['🔑',"Une personne de confiance","Gardienne, gouvernante ou aide ménagère : choisissez avec soin."],
 ['📱',"Rester en contact","Messages réguliers, photos, nouvelles : la distance se gère."],
 ['🤝',"Nous vous aidons à chercher","Parlons de votre projet et de vos priorités."]
],"Vous êtes loin ? Nous cherchons pour vous. Appelez-nous.");

E('expat-arrivee',"Nouvel arrivant dans un pays : une aide pour la maison",'turquoise',[
 ['✈️',"Beaucoup de choses à gérer","Installation, école, démarches : le temps manque."],
 ['🏠',"Une aide à la maison","Ménage, enfants, cuisine : une personne peut vous soulager."],
 ['🌐',"Comprendre les usages locaux","Salaire, horaires, congés : renseignez-vous sur les pratiques du pays."],
 ['🧩',"Une personne polyvalente","Selon SHAMAN CHOOZ, ménage, enfants et cuisine forment un même métier."]
],"Nous vous aidons à trouver quelqu'un de confiance.");

E('famille-demenage',"Vous déménagez ? Pensez au personnel de maison",'or',[
 ['📦',"Un moment chargé","Cartons, rangement, nouvelle maison : le travail s'accumule."],
 ['🧹',"Un coup de main","Nettoyer, installer, ranger : une aide change tout."],
 ['👶',"Les enfants aussi","Un déménagement les perturbe : une présence rassurante aide."],
 ['📋',"Définir la durée","Mission ponctuelle ou durable : dites-nous."]
],"Besoin d'aide pour votre nouvelle maison ? Contactez-nous.");

E('couple-actif',"Couple actif : retrouvez du temps pour vous",'rose',[
 ['👫',"Deux emplois, une maison","Concilier travail, enfants et tâches ménagères est un défi."],
 ['⏳',"Du temps retrouvé","Une personne de confiance libère vos soirées et vos week-ends."],
 ['🍲',"Un foyer apaisé","Repas prêts, maison propre, enfants suivis."],
 ['🔍',"Nous cherchons","Nous trouvons un profil adapté à votre rythme."]
],"Retrouvez du temps en famille. Appelez-nous.");

E('bureau-personnel',"Cabinets et petites entreprises : un bureau bien tenu",'nuit',[
 ['🩺',"Cabinets, études, ateliers","Un bureau propre et accueillant rassure clients et patients."],
 ['🧹',"Un entretien régulier","Une personne fiable assure l'ordre et la propreté."],
 ['☕',"Accueil des visiteurs","Café, eau, orientation : de petites attentions importantes."],
 ['📋',"Définir les horaires","Avant, après ou pendant les heures d'ouverture, c'est à préciser."]
],"Confiez-nous le recrutement du personnel de votre bureau.");

E('ecole-privee-personnel',"Écoles et garderies : recruter du personnel de confiance",'vert',[
 ['🏫',"Des enfants à protéger","Le personnel doit être sérieux, bienveillant et attentif."],
 ['🧽',"Locaux propres","Salles, sanitaires et cour : l'hygiène est essentielle."],
 ['🍲',"Cantine et repas","Cuisine soignée, propreté stricte."],
 ['🤝',"Un recrutement attentif","Nous étudions chaque candidature avec soin."]
],"Établissements, parlons de votre recrutement.");

E('residence-immeuble',"Résidences et immeubles : gardiens et entretien",'terre',[
 ['🏢',"Un lieu partagé","Gardien, agent d'entretien, jardinier : chaque rôle compte."],
 ['👀',"Un lieu sûr","Un gardien vigilant rassure les habitants."],
 ['🧽',"Parties communes propres","Escaliers, couloirs, cours : un entretien régulier."],
 ['📞',"Nous trouvons les profils","Dites-nous vos besoins et vos horaires."]
],"Résidences et syndics, contactez notre agence.");

/* ---------- Confiance et sérieux ---------- */
E('fiche-poste-claire',"Une fiche de poste claire : la base d'un bon recrutement",'or',[
 ['📋',"Décrire le poste","Quelles tâches ? Quels horaires ? Quel lieu ?"],
 ['🎯',"Les qualités recherchées","Expérience, langue, caractère, disponibilité."],
 ['💶',"Les conditions","Rémunération, repos, éventuel logement, durée."],
 ['🧑‍🤝‍🧑',"Gagner du temps","Un poste bien décrit attire les bons candidats."]
],"Nous vous aidons à rédiger votre besoin. Contactez-nous.");

E('verifier-profil',"Vérifier un profil avant de recruter",'rouge',[
 ['🔎',"Poser des questions","Expériences passées, raisons du départ, disponibilités."],
 ['📞',"Demander des références","Appelez d'anciens employeurs si possible."],
 ['🪪',"Vérifier l'identité","Une pièce d'identité valable est un bon point de départ."],
 ['🤝',"Un essai","Une période d'essai permet de confirmer le choix."]
],"Recrutez avec méthode. Notre agence vous aide.");

E('essai-partout',"La période d'essai : bonne pour les deux côtés",'turquoise',[
 ['🧪',"Se découvrir","L'employeur voit le travail, l'employée voit la famille."],
 ['📅',"Une durée précise","Fixez ensemble la durée et les règles."],
 ['💬',"Faire le point","Un échange régulier évite les malentendus."],
 ['🏁',"Décider sereinement","À la fin, chacun choisit en connaissance de cause."]
],"Une bonne relation commence par un bon cadre. Contactez-nous.");

C('donnees-personnelles',"Vos informations personnelles : parlons-en avec prudence",'nuit',[
 ['🔒',"Elles sont précieuses","Nom, contact et pièces d'identité sont des données sensibles."],
 ['🤝',"Les donner à qui ?","À une agence sérieuse, dans un but clair."],
 ['🚫',"Jamais sur un site douteux","Méfiez-vous des messages trop pressants."],
 ['❓',"Posez vos questions","À quoi serviront vos informations ? Qui les verra ?"]
],"Chez nous, vous pouvez poser toutes vos questions.");

C('contact-simple',"Nous contacter est simple",'vert',[
 ['📞',"Par téléphone","Appelez-nous directement aux numéros affichés à l'écran."],
 ['💬',"Par message","Écrivez-nous en expliquant simplement votre besoin."],
 ['📍',"Sur place","Vous pouvez aussi vous présenter à notre adresse."],
 ['⏰',"Aux heures d'accueil","Venez avec une pièce d'identité et vos références si vous en avez."]
],"Faites le premier pas. Nous vous répondons.");

E('suivi-apres-placement',"Après le placement, nous restons à l'écoute",'rose',[
 ['🌟',"Un premier succès","Une personne a démarré chez vous : c'est une étape importante."],
 ['📞',"Prendre des nouvelles","Un petit échange permet de voir si tout va bien."],
 ['🛠️',"Régler les petits problèmes","Mieux vaut en parler tôt que de les laisser grandir."],
 ['🏅',"Un résultat durable","L'objectif est une collaboration qui dure."]
],"Un bon placement se construit dans la durée. Parlons-en.");

E('eviter-arnaques-employeur',"Employeurs : méfiez-vous aussi des arnaques",'rouge',[
 ['⚠️',"Des faux profils existent","Papiers douteux, histoires trop belles, demandes d'argent."],
 ['🔍',"Vérifier avant de s'engager","Prenez le temps de contrôler les informations."],
 ['💶',"Pas d'argent à l'avance","Ne payez rien à une personne que vous n'avez pas rencontrée."],
 ['🤝',"Passer par une agence","Une agence sérieuse présente des profils étudiés."]
],"Recrutez en confiance avec notre agence. Contactez-nous.");

C('tout-secteurs-mondial',"Tous les secteurs, tous les pays : une seule agence",'or',[
 ['🌐',"Notre ambition","Mettre en relation des employeurs et des employés dans tous les secteurs d'activité."],
 ['🏠',"Une grande place à la maison","Ménage, enfants et cuisine : un même métier, dit SHAMAN CHOOZ."],
 ['🏙️',"Et la ville aussi","Commerce, restauration, accueil, sécurité, entretien et bien d'autres."],
 ['🛡️',"Dans le respect des lois","Chaque pays a ses règles : nous vous encourageons à les respecter."]
],"Inscrivez-vous, quel que soit votre métier. Contactez-nous.");
})();

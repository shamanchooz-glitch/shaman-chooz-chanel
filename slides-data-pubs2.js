/* ==========================================================
   PUBS 2/5 — POUR LES CANDIDAT(E)S (40 diaporamas pubs avec ta photo)
   Comment postuler, se présenter, les qualités qui comptent, ses droits, évoluer dans le métier :
   filles de ménage, nounous, servantes de maison, gouvernantes, cuisinières.
   ========================================================== */
(function(){
if(!window.SCCS) return;
let k = 2;
const PC = ["Postulez dès aujourd'hui","Inscrivez-vous maintenant","Votre place vous attend","Appelez-nous","Faites le premier pas"];
const C = (id,t,p,sl,cta)=> SCCS.add('pd-'+id, t, 'Agence', p, sl.concat([['📞', PC[k++ % PC.length], cta]]), { photo:true });

C('postuler-3-etapes',"Comment postuler en trois étapes",'bleu',[
 ['1️⃣',"Première étape : nous contacter","Appelez ou écrivez à notre agence et dites-nous quel travail vous cherchez à la maison."],
 ['2️⃣',"Deuxième étape : parler de vous","Nous prenons vos informations : expérience, disponibilités, lieu où vous habitez."],
 ['3️⃣',"Troisième étape : la mise en relation","Nous vous présentons à des familles qui cherchent un profil comme le vôtre."],
 ['🎉',"Et ensuite ?","Vous rencontrez la famille, vous vous mettez d'accord, et vous commencez."]
],"Rien de compliqué : un appel suffit pour lancer votre inscription.");

C('papiers-entretien',"Les papiers à préparer avant l'entretien",'terre',[
 ['🪪',"Une pièce d'identité","Elle prouve qui vous êtes : gardez-la propre et en bon état."],
 ['📸',"Une photo récente","Une photo nette et sérieuse aide les familles à vous reconnaître."],
 ['📝',"Vos coordonnées","Un numéro de téléphone qui fonctionne et une adresse précise sont essentiels."],
 ['📚',"Vos références","Si possible, le nom et le numéro d'un ancien employeur qui peut vous recommander."]
],"Préparez ces éléments et contactez notre agence pour bien démarrer.");

C('reussir-entretien',"Réussir son entretien",'violet',[
 ['🕘',"Arriver à l'heure","Arrivez un peu en avance : cela montre déjà votre sérieux."],
 ['🗣️',"Parler clairement","Répondez simplement et honnêtement : on préfère la vérité à une belle histoire."],
 ['🙂',"Rester naturelle","Un sourire, un regard franc et une voix calme rassurent beaucoup."],
 ['❓',"Poser vos questions","Horaires, tâches, repos, salaire : n'hésitez pas à demander."]
],"Besoin d'être guidée avant un entretien ? Contactez notre agence.");

C('bien-presenter',"Bien se présenter à un entretien",'turquoise',[
 ['👗',"Une tenue propre","Pas besoin d'être riche : des vêtements propres, repassés et simples suffisent."],
 ['💇',"Des cheveux soignés","Un aspect net et soigné donne une bonne première impression."],
 ['👟',"Des chaussures propres","Les détails comptent : un bon employeur remarque tout."],
 ['😊',"Une attitude positive","Votre sourire et votre politesse parlent avant même vos mots."]
],"Avec de la préparation, vous serez prête. Nous sommes là pour vous aider.");

C('sans-cv',"Pas de CV ? Parlez de votre expérience",'or',[
 ['📄',"Le CV n'est pas obligatoire","Pour les métiers de la maison, votre savoir-faire compte plus qu'une feuille de papier."],
 ['🗣️',"Racontez simplement","Dites ce que vous avez déjà fait : ménage, enfants, repas, lessive."],
 ['📅',"Précisez les durées","Combien de temps avez-vous travaillé et où ? Cela rassure les familles."],
 ['🤝',"Nous vous aidons","Nous pouvons noter votre parcours avec vous pour le présenter correctement."]
],"Pas de CV ? Pas de problème. Venez simplement nous parler.");

C('sans-diplome',"Pas de diplôme ? Pas de problème",'vert',[
 ['🎓',"Le diplôme n'est pas tout","Dans une maison, on vous juge d'abord sur votre sérieux et votre travail."],
 ['🧠',"Les bons gestes comptent","Savoir laver, cuisiner, ranger et garder des enfants s'apprend aussi dans la vie."],
 ['🌟',"Montrez vos qualités","Honnêteté, ponctualité, propreté et gentillesse valent beaucoup."],
 ['🚪',"Des portes ouvertes","Beaucoup de familles préfèrent une personne sérieuse à une personne diplômée."]
],"Venez comme vous êtes, avec votre courage. Notre agence vous écoute.");

C('jeune-adulte',"Jeunes adultes : démarrez votre vie active",'orange',[
 ['🌅',"Un premier revenu","Un travail à la maison peut être votre premier pas vers l'autonomie."],
 ['📚',"Rester ambitieux","Tout en travaillant, continuez à apprendre : un métier, une langue, une formation."],
 ['🧭',"Bien choisir sa famille","Une famille respectueuse et claire sur les conditions compte énormément."],
 ['🔓',"Vers l'avenir","Chaque expérience vous prépare à de plus grandes responsabilités."]
],"Majeur et motivé ? Contactez notre agence pour votre première place.");

C('maman-seule',"Maman seule : un revenu pour vos enfants",'rose',[
 ['👩‍👧',"Un courage immense","Élever seule ses enfants demande de la force : votre travail est précieux."],
 ['⏰',"Des horaires adaptés","Certaines familles acceptent des horaires compatibles avec la vie de vos enfants."],
 ['💶',"Un salaire régulier","Un emploi stable aide à payer l'école, la nourriture et le logement."],
 ['🤲',"Notre soutien","Dites-nous vos contraintes : nous cherchons une place qui vous convient."]
],"Votre famille compte sur vous. Nous comptons sur vous aussi. Appelez-nous.");

C('changer-de-metier',"Changer de métier pour travailler à la maison",'nuit',[
 ['🔄',"Un nouveau départ","Vous voulez changer de travail ? Les métiers de la maison sont toujours demandés."],
 ['🧳',"Vos anciennes compétences","Organisation, relation avec les gens, sens des responsabilités : tout est utile."],
 ['🏡',"Un cadre plus calme","Travailler dans une maison, avec peu de personnes, convient à beaucoup de gens."],
 ['🌱',"Se former","Un peu de formation sur la cuisine, l'hygiène ou les enfants vous aide à démarrer."]
],"Prêt pour un nouveau départ ? Parlons-en ensemble.");

C('profil-nounou',"Le profil de la nounou idéale",'rose',[
 ['💗',"Elle aime les enfants","On voit tout de suite si une personne aime vraiment les enfants."],
 ['🛡️',"Elle est vigilante","Elle surveille, anticipe les dangers et reste toujours présente."],
 ['🧼',"Elle est propre","Mains propres, jouets propres, biberons propres : l'hygiène est essentielle."],
 ['🗨️',"Elle communique","Elle raconte aux parents ce qui s'est passé dans la journée."]
],"Ce profil est le vôtre ? Une famille vous attend. Appelez-nous.");

C('nounou-premier-jour',"Nounou : bien réussir le premier jour",'turquoise',[
 ['🚪',"Arriver avec le sourire","Le premier jour, une bonne attitude installe la confiance."],
 ['📝',"Écouter les consignes","Horaires des repas, de la sieste, allergies : notez tout par écrit."],
 ['🧒',"Apprivoiser l'enfant","Prenez le temps de jouer et de parler doucement pour qu'il vous connaisse."],
 ['📞',"Garder les numéros","Notez le numéro des parents et celui d'une personne à contacter en cas d'urgence."]
],"Un bon départ fait une longue collaboration. Contactez notre agence.");

C('nounou-bebe-bases',"Prendre soin d'un bébé : les bases",'rose',[
 ['🍼',"Les repas","Toujours respecter les consignes des parents et laver les biberons avec soin."],
 ['🛏️',"Le sommeil","Faire dormir un bébé sur le dos, dans un lit propre et dégagé."],
 ['🧷',"Le change","Changer régulièrement, nettoyer avec douceur, bien se laver les mains ensuite."],
 ['👶',"Ne jamais le laisser seul","Un bébé ne doit jamais être laissé sans surveillance, même quelques instants."]
],"Passionnée par les bébés ? Notre agence cherche des familles pour vous.");

C('profil-menage',"Le profil d'une fille de ménage appréciée",'bleu',[
 ['⏰',"Elle est ponctuelle","Elle arrive à l'heure et prévient en cas de problème."],
 ['🧽',"Elle est minutieuse","Elle n'oublie ni les coins ni les petits détails."],
 ['🔑',"Elle est digne de confiance","Elle respecte les objets et la vie privée de la famille."],
 ['💬',"Elle sait communiquer","Elle signale ce qui manque et propose des solutions."]
],"Vous correspondez à ce profil ? Inscrivez-vous à notre agence.");

C('organiser-finir',"S'organiser pour finir à temps",'orange',[
 ['📋',"Faire une liste","Écrivez les tâches du jour : vous n'oublierez rien."],
 ['⬆️',"Du haut vers le bas","Nettoyez d'abord le haut des meubles, puis les surfaces, puis le sol."],
 ['🧹',"Du fond vers la porte","Balayez et lavez en reculant vers la sortie, pour ne pas salir ce qui est déjà propre."],
 ['⏱️',"Garder du temps","Gardez toujours quelques minutes à la fin pour vérifier votre travail."]
],"Une bonne organisation vous rend plus rapide et plus appréciée. Rejoignez-nous.");

C('qualites-servante',"Servante de maison : les qualités qui comptent",'terre',[
 ['💪',"Du courage","Le travail est physique : il faut de l'énergie et de la persévérance."],
 ['🧭',"Du sens des priorités","Savoir ce qui est urgent et ce qui peut attendre."],
 ['🤐',"De la discrétion","Ne pas répéter ce qui se passe dans la famille."],
 ['❤️',"Du cœur","Une personne douce et attentive devient vite indispensable."]
],"Courage, discrétion et cœur : c'est ce que cherchent nos familles. Contactez-nous.");

C('devenir-gouvernante',"Devenir gouvernante de domicile",'or',[
 ['🏅',"Une place de confiance","La gouvernante est la personne sur qui toute la famille s'appuie."],
 ['📚',"Plusieurs compétences","Ménage, cuisine, enfants, gestion des stocks et direction du personnel."],
 ['🧑‍🏫',"Apprendre de plusieurs familles","Chaque expérience vous apprend une nouvelle façon de gérer une maison."],
 ['📈',"Une meilleure situation","Les gouvernantes expérimentées sont mieux rémunérées et très recherchées."]
],"La gouvernance vous intéresse ? Parlez-nous de votre ambition.");

C('gouvernante-gere',"La gouvernante gère toute la maison",'violet',[
 ['🗂️',"Elle planifie","Menus de la semaine, courses, horaires du personnel : tout est prévu."],
 ['📦',"Elle surveille les stocks","Produits d'entretien, nourriture, linge : rien ne manque."],
 ['🧑‍🤝‍🧑',"Elle encadre","Elle explique le travail aux autres employés avec calme et justesse."],
 ['🏡',"Elle rassure","La famille se repose sur elle comme sur une personne de confiance."]
],"Prête à diriger une maison ? Notre agence a des familles qui cherchent une gouvernante.");

C('atouts-cuisiniere',"Cuisinière à domicile : vos atouts",'orange',[
 ['👩‍🍳',"Un vrai métier","Cuisiner chaque jour pour une famille demande de la rigueur et de la créativité."],
 ['🍽️',"Varier les menus","Changer de plats chaque jour évite la lassitude et fait plaisir à tous."],
 ['🧼',"Une cuisine impeccable","Plan de travail propre, ustensiles lavés, aliments bien rangés."],
 ['🥘',"Connaître les goûts","Chaque famille a ses préférences : écoutez-les pour les satisfaire."]
],"La cuisine est votre passion ? Faites-en votre métier avec notre agence.");

C('cuisine-locale-atout',"Savoir cuisiner local : un vrai atout",'terre',[
 ['🍛',"Les plats du pays","Attiéké, riz sauce, foutou, kédjenou : les familles adorent les bons plats locaux."],
 ['🌶️',"Les bonnes épices","Doser le piment et les épices pour que tout le monde puisse se régaler."],
 ['🥬',"Des produits frais","Acheter frais et de saison donne plus de goût et coûte souvent moins cher."],
 ['🧑‍🍳',"Des plats bien présentés","Une belle présentation donne encore plus envie de manger."]
],"Votre cuisine fait des heureux ? Une famille vous attend.");

C('autres-cuisines',"Apprendre d'autres cuisines",'rouge',[
 ['🌍',"Un monde de saveurs","Pâtes, salades, grillades, plats européens ou asiatiques : tout peut s'apprendre."],
 ['📺',"Où apprendre","Observer, demander à des personnes expérimentées, essayer à la maison."],
 ['🍳',"Un avantage","Savoir varier les cuisines ouvre la porte à de meilleures places."],
 ['🎯',"Rester soi-même","Garder vos spécialités tout en apprenant : c'est votre richesse."]
],"Cuisine d'ici ou d'ailleurs : valorisez votre talent avec notre agence.");

C('langues-portes',"Les langues ouvrent des portes",'bleu',[
 ['🗣️',"Parler plusieurs langues","Français, anglais, langues locales : plus vous en parlez, plus vous avez de choix."],
 ['🏨',"Des places plus variées","Les familles internationales apprécient les personnes qui parlent plusieurs langues."],
 ['🎧',"S'entraîner chaque jour","Écouter la radio, parler avec des amis, apprendre quelques mots chaque jour."],
 ['🌍',"Voyager","Une langue de plus, c'est un pays de plus où vous pouvez travailler."]
],"Vous parlez plusieurs langues ? Dites-le-nous, c'est un atout.");

C('francais-anglais',"Parler français et anglais",'nuit',[
 ['🇫🇷',"Le français","Parler correctement aide à comprendre les consignes et à se faire comprendre."],
 ['🇬🇧',"L'anglais","Une base d'anglais est précieuse pour les familles qui viennent de l'étranger."],
 ['📱',"Des outils simples","Des applications, des vidéos et des cahiers peuvent vous aider à apprendre."],
 ['💬',"Oser parler","On progresse en parlant : ne soyez pas timide, les erreurs font partie de l'apprentissage."]
],"Un petit effort en langues, de grandes opportunités. Parlons-en.");

C('connaitre-droits',"Connaître vos droits au travail",'vert',[
 ['⚖️',"Vous avez des droits","Un travail à la maison n'enlève aucun droit : respect, repos et rémunération."],
 ['📜',"Un accord clair","Il est important de savoir à l'avance les tâches, les horaires et le salaire."],
 ['🛑',"Dire non à l'abus","Aucun employeur n'a le droit de vous maltraiter, de vous insulter ou de vous frapper."],
 ['📞',"Demander de l'aide","En cas de difficulté, parlez à un proche de confiance ou à notre agence."]
],"Votre dignité n'est pas négociable. Nous sommes à vos côtés.");

C('parler-salaire',"Parler du salaire sans gêne",'or',[
 ['💰',"Un sujet normal","Demander combien vous serez payée est légitime, c'est même la première question."],
 ['📅',"Quand et comment","Précisez la date du paiement et la façon dont vous serez payée."],
 ['🧮',"Comprendre ce qui est inclus","Logement, repas, transport : demandez ce qui est prévu en plus."],
 ['✍️',"Garder une trace","Un papier ou un message qui confirme l'accord évite les malentendus."]
],"Pas de gêne à avoir : posez vos questions à notre agence.");

C('repos-metier',"Le repos fait partie du métier",'turquoise',[
 ['😴',"Se reposer, c'est important","Un corps fatigué travaille moins bien : le repos protège votre santé."],
 ['📆',"Un jour par semaine","Convenez dès le départ de votre jour de repos."],
 ['🍽️',"Des pauses","Prenez le temps de manger et de boire pendant la journée."],
 ['🌴',"Des congés","Parlez des congés possibles et de la façon de les prendre."]
],"Un bon accord prévoit le repos. Trouvons-le ensemble.");

C('sante-travail',"Rester en bonne santé au travail",'rose',[
 ['💧',"Boire de l'eau","Buvez régulièrement, surtout quand il fait chaud."],
 ['🍚',"Bien manger","Un repas équilibré donne l'énergie nécessaire pour la journée."],
 ['🏥',"Se soigner","Ne restez pas malade : dites-le et allez vous faire soigner."],
 ['🧤',"Se protéger","Gants, chaussures adaptées, bonne posture : de petits gestes qui évitent les blessures."]
],"Votre santé est votre capital. Prenez-en soin et inscrivez-vous chez nous.");

C('proteger-dos',"Protéger son dos en faisant le ménage",'terre',[
 ['🦴',"Un dos fragile","Se pencher et porter toute la journée fatigue le dos."],
 ['🧎',"Plier les genoux","Pour ramasser, pliez les genoux plutôt que de vous courber."],
 ['🧹',"Des outils adaptés","Un manche assez long pour la serpillière et le balai vous évite de vous baisser."],
 ['🔄',"Alterner","Changez de position et faites de courtes pauses pour soulager le corps."]
],"Un métier durable commence par un corps en bonne santé. Contactez-nous.");

C('ne-pas-melanger',"Ne jamais mélanger les produits d'entretien",'rouge',[
 ['⚠️',"Un vrai danger","Mélanger certains produits peut créer des gaz toxiques et vous rendre malade."],
 ['🧴',"Un produit à la fois","Utilisez un seul produit à la fois et rincez bien avant d'en utiliser un autre."],
 ['🏷️',"Lire l'étiquette","Chaque produit a son mode d'emploi : lisez-le et respectez-le."],
 ['🌬️',"Aérer","Ouvrez les fenêtres pendant le nettoyage pour respirer un air plus sain."]
],"Travailler en sécurité, c'est travailler mieux. Rejoignez notre agence.");

C('respecter-famille',"Respecter la famille qui vous accueille",'violet',[
 ['🏡',"Chaque maison est différente","Chaque famille a ses habitudes, sa culture, sa religion : respectez-les."],
 ['🗝️',"Demander avant d'utiliser","Téléphone, ordinateur, affaires personnelles : on demande toujours d'abord."],
 ['🍽️',"À table","Mangez selon l'accord prévu et dites merci pour les repas partagés."],
 ['💞',"Une bonne entente","Le respect crée la confiance, et la confiance crée la durée."]
],"Respectueux, vous serez toujours bien accueilli. Contactez notre agence.");

C('savoir-dire-non',"Savoir dire non poliment",'bleu',[
 ['🙅',"Poser ses limites","Si une demande dépasse ce qui était prévu, vous pouvez en discuter calmement."],
 ['🗣️',"Choisir ses mots","« Je comprends votre besoin, mais ce n'était pas prévu : pouvons-nous en parler ? »"],
 ['⚖️',"Rester juste","Quand les tâches augmentent, le salaire et les horaires peuvent aussi être revus."],
 ['🤝',"Dialoguer","Un bon dialogue règle presque tous les problèmes."]
],"Une relation saine, c'est une relation claire. Notre agence vous accompagne.");

C('probleme-parlez',"En cas de problème, parlez",'nuit',[
 ['🗨️',"Ne gardez pas tout pour vous","Un souci au travail se règle mieux quand on en parle vite."],
 ['👂',"D'abord à l'employeur","Dites calmement ce qui ne va pas, avec des exemples précis."],
 ['📞',"Ensuite à l'agence","Si le problème persiste, contactez-nous : nous pouvons aider à trouver une solution."],
 ['🛟',"Votre sécurité d'abord","Si vous êtes en danger, quittez les lieux et appelez un proche ou les autorités."]
],"Vous n'êtes jamais seule. Gardez notre numéro avec vous.");

C('epargner-un-peu',"Mettre un peu d'argent de côté",'or',[
 ['🐷',"Petit à petit","Même une petite somme mise de côté chaque mois devient grande avec le temps."],
 ['📒',"Noter ses dépenses","Savoir où part l'argent aide à mieux le gérer."],
 ['🏦',"Un endroit sûr","Un compte ou un service d'épargne protège mieux votre argent qu'une cachette."],
 ['🎯',"Un objectif","Une formation, un terrain, une petite activité : donnez un but à votre épargne."]
],"Un bon revenu, une bonne épargne, un bel avenir. Commençons ensemble.");

C('aider-famille',"Aider sa famille au village",'vert',[
 ['🏘️',"Un soutien précieux","Beaucoup d'employés de maison aident leurs parents et leurs enfants restés au village."],
 ['📲',"Envoyer en sécurité","Les services de transfert mobile sont pratiques, rapides et sûrs."],
 ['🧾',"Garder les preuves","Conservez toujours les messages de confirmation des envois."],
 ['💬',"Rester en contact","Un appel régulier aide à tenir le coup quand on est loin de chez soi."]
],"Travaillez pour ceux que vous aimez. Notre agence vous aide à démarrer.");

C('devenir-patronne',"Un jour, ouvrir sa propre activité",'orange',[
 ['🌟',"Un rêve possible","Beaucoup de personnes ont commencé comme employées avant de créer leur propre activité."],
 ['🧠',"Apprendre le métier","Chez un employeur, on apprend l'organisation, la clientèle et la gestion."],
 ['💼',"Idées d'activités","Service traiteur, entretien de maisons, garde d'enfants, couture, coiffure."],
 ['🤝',"S'entourer","Un bon réseau et de bons conseils aident à réussir."]
],"Votre histoire commence par une première place. Contactez notre agence.");

C('se-former-gagner',"Se former pour gagner plus",'turquoise',[
 ['🎓',"La formation paie","Une formation en cuisine, soins de bébé ou hygiène vous rend plus compétitive."],
 ['📱',"Apprendre partout","Des vidéos, des conseils, des ateliers : on peut apprendre chez soi."],
 ['📜',"Prouver ses acquis","Un petit certificat ou une recommandation rassure les familles."],
 ['💵',"Un meilleur salaire","Des compétences en plus, c'est souvent plus de valeur et plus de revenus."]
],"Envie d'évoluer ? Dites-nous ce que vous voulez apprendre.");

C('premier-emploi-mode',"Votre premier emploi : mode d'emploi",'rose',[
 ['🌸',"Respirez","Le premier emploi fait peur à tout le monde : c'est normal."],
 ['👂',"Observer et écouter","Regardez comment la maison fonctionne et demandez ce que vous ne savez pas."],
 ['📝',"Noter les consignes","Un petit carnet vous aide à retenir ce que l'on vous demande."],
 ['🏁',"Persévérer","Au bout de deux ou trois semaines, tout devient plus facile."]
],"Nous vous accompagnons pour votre premier pas. Appelez-nous.");

C('rester-motivee',"Rester motivée dans le métier",'nuit',[
 ['🔥',"Garder la flamme","Certains jours sont durs : pensez à ce pour quoi vous travaillez."],
 ['🏆',"Fêter les petites victoires","Un compliment, une journée bien réussie, une tâche accomplie : savourez-les."],
 ['🤗',"Parler à des collègues","Partager ses expériences aide à se sentir moins seule."],
 ['🚀',"Voir plus loin","Chaque jour vous rapproche d'un objectif plus grand."]
],"Votre courage mérite une belle place. Contactez notre agence.");

C('un-pas-reussite',"Toutes les réussites commencent par un pas",'violet',[
 ['👣',"Le premier pas","Personne ne réussit sans commencer : décidez-vous aujourd'hui."],
 ['🔑',"Ouvrir la porte","Une inscription, un appel, un message : c'est ce qui change tout."],
 ['🌍',"De grandes possibilités","Des familles, dans votre ville et dans le monde entier, cherchent du personnel."],
 ['🙌',"Vous en êtes capable","Avec du courage et du sérieux, vous irez loin."]
],"Faites le premier pas dès maintenant. Notre agence vous attend.");

C('se-demarquer',"Se démarquer des autres candidates",'terre',[
 ['⭐',"Faire la différence","Parmi de nombreuses candidates, les familles retiennent celles qui se distinguent par leur sérieux."],
 ['📞',"Répondre vite","Répondre rapidement aux appels montre que vous êtes motivée."],
 ['📝',"Être précise","Donnez des informations claires sur votre expérience et vos disponibilités."],
 ['🌞',"Être positive","Une attitude joyeuse et disponible fait gagner la préférence."]
],"Soyez la candidate que l'on n'oublie pas. Inscrivez-vous.");

C('inscription-simple',"Inscrivez-vous : c'est simple",'or',[
 ['📱',"Par téléphone","Appelez-nous directement et dites-nous quel emploi vous intéresse."],
 ['✉️',"Par e-mail","Vous pouvez aussi nous écrire en précisant votre nom, votre expérience et votre ville."],
 ['📍',"Sur place","Venez nous rencontrer à notre siège : nous vous accueillerons avec plaisir."],
 ['🌍',"Pour partout","Nous mettons en relation employeurs et employés dans tous les pays du monde."]
],"Les coordonnées s'affichent à la fin de cette vidéo : appelez dès maintenant.");
})();

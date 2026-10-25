/* ==========================================================
   PUBS 3/5 — POUR LES EMPLOYEURS ET LES FAMILLES (40 diaporamas pubs avec ta photo)
   Bien recruter, bien accueillir, bien garder son personnel de maison : fille de ménage, nounou,
   servante de maison, gouvernante de domicile, cuisinier(ère) — et situations de vie (bébé, expatriés, seniors…).
   ========================================================== */
(function(){
if(!window.SCCS) return;
let k = 3;
const PE = ["Parlons de votre besoin","Confiez-nous votre recherche","Contactez-nous","Un appel suffit","Recrutons ensemble"];
const E = (id,t,p,sl,cta)=> SCCS.add('pd-'+id, t, 'Agence', p, sl.concat([['📞', PE[k++ % PE.length], cta]]), { photo:true });

E('decrire-poste',"Décrire clairement le poste à pourvoir",'bleu',[
 ['📝',"Un besoin bien décrit","Plus votre demande est claire, plus vite nous trouvons la bonne personne."],
 ['🏠',"Votre maison","Nombre de pièces, de personnes, présence d'enfants ou d'animaux : dites-nous tout."],
 ['🧹',"Les missions","Ménage, lessive, repassage, cuisine, garde d'enfants : listez ce que vous attendez."],
 ['⏰',"Les horaires","Jours de travail, heure d'arrivée, heure de départ, jour de repos."]
],"Dites-nous votre besoin en quelques minutes. Nous lançons la recherche.");

E('liste-taches',"Faire la liste des tâches",'turquoise',[
 ['📋',"Écrire pour éviter l'oubli","Une liste évite les malentendus : tout le monde sait ce qui est attendu."],
 ['⭐',"Les tâches principales","Celles qui comptent le plus pour vous : propreté, repas, enfants."],
 ['➕',"Les tâches occasionnelles","Grand ménage, vitres, réceptions : à prévoir à part."],
 ['🗣️',"En parler ensemble","Une liste discutée avec la candidate est mieux acceptée."]
],"Besoin d'aide pour la rédiger ? Notre agence vous guide.");

E('fixer-horaires',"Fixer les horaires dès le départ",'orange',[
 ['🕖',"Heure d'arrivée","Précisez l'heure à laquelle vous souhaitez que la journée commence."],
 ['🕔',"Heure de fin","Une heure de départ claire respecte la vie personnelle de votre employée."],
 ['⚠️',"Heures supplémentaires","Prévoyez comment elles seront comptées et payées."],
 ['🤝',"Un équilibre","Des horaires justes rendent le travail durable pour les deux côtés."]
],"Clarifiez tout avant de commencer. Nous vous aidons à le faire.");

E('salaire-juste',"Proposer un salaire juste",'or',[
 ['💶',"Un travail complet","Ménage, enfants et cuisine représentent beaucoup de travail : il mérite une rémunération équitable."],
 ['🔍',"Se renseigner","Comparez avec ce que paient les familles autour de vous."],
 ['📅',"Payer à date fixe","Une date de paiement respectée crée une relation de confiance."],
 ['🎁',"Petits gestes","Un repas, un transport, une prime de fête : cela compte beaucoup."]
],"Un salaire juste, un travail soigné. Parlez-en avec notre agence.");

E('accord-ecrit',"Un accord écrit protège tout le monde",'violet',[
 ['📜',"Écrire l'essentiel","Missions, horaires, salaire, repos : couchez-les sur une simple feuille."],
 ['✍️',"Signer à deux","Employeur et employée gardent chacun un exemplaire."],
 ['🛡️',"Prévenir les conflits","En cas de désaccord, le papier rappelle ce qui avait été convenu."],
 ['🤲',"Un signe de respect","Un accord écrit montre que vous prenez votre employée au sérieux."]
],"Nous vous aidons à clarifier les termes de la collaboration.");

E('periode-essai',"La période d'essai : pour bien se connaître",'vert',[
 ['🧪',"Un temps pour tester","Quelques jours ou semaines permettent de voir si l'entente fonctionne."],
 ['👀',"Observer","Regardez la propreté, la ponctualité, la relation avec les enfants."],
 ['💬',"Dialoguer","Dites ce qui va et ce qui doit s'améliorer, avec calme."],
 ['✅',"Décider ensemble","À la fin, chacun décide librement de continuer ou non."]
],"Un essai réussi fait un long partenariat. Contactez notre agence.");

E('accueillir-employee',"Bien accueillir la nouvelle employée",'rose',[
 ['🌸',"Un sourire d'abord","Un accueil chaleureux met l'employée en confiance dès le premier jour."],
 ['🏠',"Présenter la maison","Montrez les pièces, les produits, le matériel et les endroits à éviter."],
 ['👨‍👩‍👧',"Présenter la famille","Présentez les enfants et les habitudes de chacun."],
 ['🥤',"Penser à son confort","Un verre d'eau, un repas, un endroit pour poser ses affaires."]
],"Accueillez bien, vous serez bien servi. Nous vous accompagnons.");

E('premiers-jours',"Les premiers jours : tout montrer",'nuit',[
 ['👣',"Faire ensemble","Les premiers jours, travaillez ensemble pour montrer vos méthodes."],
 ['📖',"Expliquer les habitudes","Menus préférés, façons de plier le linge, ordre de rangement."],
 ['🧠',"Laisser le temps","Personne ne connaît votre maison dès le premier jour."],
 ['👍',"Encourager","Un compliment sincère donne confiance et motive."]
],"Une bonne intégration, c'est la clé. Nous restons à vos côtés.");

E('respecter-personnel',"Respecter son personnel de maison",'terre',[
 ['🤝',"Une personne, pas un outil","Votre employée est un être humain avec sa famille, ses sentiments et sa fatigue."],
 ['🗣️',"Un ton respectueux","Parlez avec politesse : un « s'il vous plaît » et un « merci » font des merveilles."],
 ['🚫',"Jamais de violence","Aucune insulte, aucune menace, aucun coup : jamais."],
 ['🌟',"Un bon exemple","Les enfants apprennent le respect en voyant comment vous traitez les autres."]
],"Un employé respecté travaille mieux et reste plus longtemps. Parlons-en.");

E('repos-conges',"Jours de repos et congés",'turquoise',[
 ['😴',"Le repos est nécessaire","Un employé reposé est plus attentif, plus gentil et plus efficace."],
 ['📆',"Un jour fixe par semaine","Choisissez ensemble un jour de repos régulier."],
 ['🌴',"Prévoir des congés","Discutez de leur durée et de la façon de les organiser."],
 ['🔄',"Anticiper le remplacement","Pensez à qui s'occupera de la maison pendant l'absence."]
],"Une organisation claire évite les tensions. Notre agence vous aide.");

E('loger-employee',"Loger son employée : bien préparer",'bleu',[
 ['🛏️',"Une chambre correcte","Un lit propre, de l'air et de l'intimité : le minimum pour bien dormir."],
 ['🚿',"Un accès à l'eau et aux toilettes","Hygiène et dignité vont ensemble."],
 ['🔑',"Des règles claires","Heures de sortie, visites, utilisation de la maison : discutez-en à l'avance."],
 ['💬',"Respecter l'intimité","La chambre de l'employée est son espace personnel."]
],"Vous proposez un logement ? Précisez-le à notre agence, cela intéresse beaucoup de candidates.");

E('presenter-nounou',"Présenter la nounou aux enfants",'rose',[
 ['🧸',"Préparer les enfants","Expliquez-leur qu'une nouvelle personne va les aider et jouer avec eux."],
 ['🤗',"Une présentation douce","Laissez-les se découvrir avec calme et sans pression."],
 ['⏳',"Des journées d'adaptation","Commencez par quelques heures ensemble avant une journée complète."],
 ['💞',"Rassurer","L'enfant doit sentir que vous avez confiance en cette personne."]
],"Une bonne transition rassure les petits comme les grands. Nous vous guidons.");

E('consignes-enfants',"Donner les consignes pour les enfants",'violet',[
 ['📋',"Les repas","Heures, quantités, préférences : écrivez ce que l'enfant aime ou refuse."],
 ['🛌',"Le sommeil","Heures de sieste et de coucher, rituels avant le sommeil."],
 ['📵',"Les écrans","Précisez si l'enfant peut regarder la télévision ou utiliser un téléphone, et combien de temps."],
 ['📞',"Les urgences","Laissez les numéros du médecin, des parents et d'un proche."]
],"Des consignes claires font une garde sereine. Parlez à notre agence.");

E('allergies-regimes',"Signaler allergies et régimes alimentaires",'rouge',[
 ['🥜',"Informer sur les allergies","Dites tout de suite si un membre de la famille est allergique à un aliment."],
 ['🥗',"Les régimes","Régime spécial, jeûne, aliments interdits : prévenez la personne qui cuisine."],
 ['🏷️',"Écrire la liste","Une liste affichée dans la cuisine évite les erreurs."],
 ['👩‍🍳',"Former la cuisinière","Montrez la préparation de vos plats habituels les premiers jours."]
],"Votre santé passe avant tout. Nous cherchons un profil qui respecte ces règles.");

E('partager-recettes',"Partager vos recettes de famille",'orange',[
 ['📖',"Votre cuisine est unique","Chaque famille a ses plats préférés et sa façon de les préparer."],
 ['👩‍🍳',"Cuisiner ensemble","Faire un plat avec votre employée la première semaine est très efficace."],
 ['📝',"Noter les quantités","Un petit carnet de recettes de la maison facilite la suite."],
 ['😋',"Un résultat meilleur","Votre employée apprendra vite à cuisiner comme vous l'aimez."]
],"Une cuisinière qui apprend vite et qui aime cuisiner ? Nous la cherchons pour vous.");

E('bons-produits',"Fournir de bons produits et du matériel",'vert',[
 ['🧴',"Des produits adaptés","Un bon nettoyant et un bon savon facilitent le travail."],
 ['🧹',"Du matériel en bon état","Balai, seau, éponges, fer à repasser : un bon outil fait gagner du temps."],
 ['🧤',"Des gants","Fournir des gants protège les mains de votre employée."],
 ['💡',"Un résultat plus propre","Un bon matériel donne un meilleur résultat, avec moins d'effort."]
],"Bien équipée, votre employée donnera le meilleur d'elle-même.");

E('eviter-surcharge',"Éviter la surcharge de travail",'terre',[
 ['⚖️',"Trop de tâches fatiguent","Une personne qui fait tout, tout le temps, finit par s'épuiser."],
 ['📊',"Répartir","Étalez les grandes tâches sur la semaine plutôt que de tout demander le même jour."],
 ['🙂',"Écouter la fatigue","Si votre employée semble épuisée, parlez-lui et ajustez le planning."],
 ['🤝',"Un équilibre durable","Une charge raisonnable garde votre employée motivée longtemps."]
],"Un travail équilibré fait une relation durable. Parlons-en.");

E('parler-regulierement',"Parler régulièrement avec son employée",'turquoise',[
 ['💬',"Un petit point chaque semaine","Quelques minutes pour dire ce qui va bien et ce qui peut être amélioré."],
 ['👂',"Écouter aussi","Votre employée peut avoir de bonnes idées pour mieux organiser la maison."],
 ['❓',"Poser des questions","Comment vous sentez-vous ? Avez-vous besoin de quelque chose ?"],
 ['🌟',"Résoudre vite","Un petit problème parlé tout de suite ne devient pas un gros problème."]
],"La communication est la clé. Notre agence est là aussi pour vous aider.");

E('compliments-motivent',"Les compliments motivent",'or',[
 ['👏',"Dire merci","Un simple merci donne envie de continuer à bien faire."],
 ['🏅',"Remarquer les efforts","Quand le travail est bien fait, dites-le clairement."],
 ['📈',"Plus de motivation","Une personne valorisée donne plus d'elle-même."],
 ['🎉',"Une ambiance positive","Une maison où l'on se parle avec gentillesse est plus agréable pour tous."]
],"Un employé heureux est un employé fidèle. Trouvons-le ensemble.");

E('corriger-calme',"Corriger avec calme",'nuit',[
 ['🧘',"Respirer d'abord","Quand quelque chose ne va pas, attendez d'être calme avant d'en parler."],
 ['🔎',"Parler du fait, pas de la personne","Dites ce qui doit changer, sans humilier ni insulter."],
 ['🧑‍🏫',"Montrer comment faire","Montrez la bonne façon plutôt que de simplement critiquer."],
 ['🤝',"Terminer sur du positif","Rappelez ce qui va bien pour garder la confiance."]
],"Une bonne relation passe par un bon dialogue. Nous vous conseillons.");

E('garder-longtemps',"Garder une bonne employée longtemps",'bleu',[
 ['🔒',"La stabilité","Changer souvent de personnel fatigue la famille et les enfants."],
 ['💰',"Un salaire à temps","Payer correctement et régulièrement est le meilleur moyen de la garder."],
 ['❤️',"De la considération","Remercier, respecter, écouter : de petits gestes qui font toute la différence."],
 ['📚',"L'aider à progresser","Une petite formation ou un encouragement montrent que vous croyez en elle."]
],"Fidélisez les bonnes personnes. Notre agence vous y aide.");

E('primes-petits-gestes',"Primes et petits gestes",'rose',[
 ['🎁',"Un petit plus","Un cadeau de fin d'année ou une prime après un bon mois est toujours apprécié."],
 ['🍽️',"Partager un repas","Un repas bien servi après un grand ménage est un vrai geste de respect."],
 ['🚌',"Aider pour le transport","Une participation au transport soulage beaucoup de budgets."],
 ['🎂',"Souhaiter les fêtes","Anniversaire, fêtes religieuses : un petit mot suffit."]
],"Les petits gestes construisent les grandes fidélités. Parlons de votre recrutement.");

E('prevoir-remplacement',"Prévoir un remplacement pendant les congés",'terre',[
 ['🔄',"Une maison qui continue","Une absence ne doit pas désorganiser toute la maison."],
 ['👥',"Une personne de secours","Gardez le contact d'une remplaçante de confiance."],
 ['📅',"Prévenir à l'avance","Dites assez tôt à votre agence quand vous aurez besoin d'une remplaçante."],
 ['🤲',"Nous vous aidons","Notre agence cherche pour vous une personne temporaire."]
],"Besoin d'une remplaçante ? Un appel et nous cherchons.");

E('demander-references',"Demander des références",'violet',[
 ['📞',"Appeler d'anciens employeurs","Les anciens employeurs sont les mieux placés pour parler du sérieux d'une candidate."],
 ['❓',"Quoi demander","Est-elle ponctuelle ? Honnête ? Douce avec les enfants ? Pourquoi a-t-elle quitté ?"],
 ['🔍',"Se fier à plusieurs avis","Deux ou trois avis valent mieux qu'un seul."],
 ['🛡️',"Une démarche prudente","Vérifier rassure tout le monde et protège votre foyer."]
],"Notre agence vous aide à connaître le parcours des candidats avant de choisir.");

E('questions-candidat',"Les bonnes questions à poser au candidat",'turquoise',[
 ['🧾',"Son expérience","Où avez-vous déjà travaillé ? Pendant combien de temps ? Pour quelles tâches ?"],
 ['⏰',"Ses disponibilités","À quelle heure pouvez-vous commencer ? Pouvez-vous rester le soir ?"],
 ['🍲',"Ses compétences","Que savez-vous cuisiner ? Comment gérez-vous les enfants ?"],
 ['🎯',"Ses attentes","Qu'attendez-vous de ce poste ? Quel salaire envisagez-vous ?"]
],"Nous préparons ces échanges avec vous. Contactez notre agence.");

E('urgence-personnel',"Besoin urgent d'une personne ?",'rouge',[
 ['🚨',"Un imprévu arrive","Départ soudain, naissance, déménagement : parfois, il faut vite quelqu'un."],
 ['⚡',"Nous agissons vite","Dites-nous votre urgence et nous cherchons parmi nos candidats disponibles."],
 ['🧩',"Une solution temporaire","Nous pouvons aussi chercher une personne pour quelques jours ou semaines."],
 ['📞',"Appelez maintenant","Plus tôt vous nous prévenez, plus vite nous avançons."]
],"Besoin urgent ? Appelez-nous tout de suite.");

E('famille-nombreuse',"Famille nombreuse : un personnel complet",'orange',[
 ['👨‍👩‍👧‍👦',"Beaucoup de monde","Plus on est nombreux, plus le linge, les repas et les enfants demandent du travail."],
 ['🧑‍🤝‍🧑',"Une équipe","Une gouvernante, une nounou et une cuisinière peuvent se partager les missions."],
 ['📋',"Bien répartir","Chacun connaît ses tâches pour que la maison tourne sans désordre."],
 ['💡',"Ou une personne complète","Pour certaines familles, une personne polyvalente suffit amplement."]
],"Dites-nous la taille de votre famille, nous proposons le bon équilibre.");

E('bebe-arrive',"Un bébé arrive : préparez l'aide",'rose',[
 ['🍼',"Une grande joie","L'arrivée d'un bébé change tout dans la maison."],
 ['😴',"Des nuits courtes","Se faire aider permet de récupérer et de profiter du bébé."],
 ['🧺',"Du linge, des repas","Avec un bébé, le linge et les repas augmentent : une aide est précieuse."],
 ['🔍',"Anticiper","Cherchez une nounou avant la naissance pour vous y habituer."]
],"Bébé arrive bientôt ? Anticipez avec notre agence.");

E('maman-reprise',"Maman reprend le travail : trouver la bonne nounou",'bleu',[
 ['💼',"Reprendre le travail","Beaucoup de mamans reprennent leur activité après quelques mois."],
 ['🏠',"À la maison ou à l'extérieur","Une nounou à domicile permet à l'enfant de rester dans son cadre habituel."],
 ['🧸',"Prévoir l'adaptation","Quelques jours ensemble avant la reprise rassurent bébé et maman."],
 ['💞',"Faire confiance","Une bonne nounou, c'est une vraie tranquillité d'esprit."]
],"Maman, nous cherchons avec vous la nounou de confiance.");

E('expatrie-confiance',"Expatrié : trouver du personnel de confiance",'nuit',[
 ['✈️',"Nouveau pays, nouvelles habitudes","S'installer à l'étranger, c'est aussi chercher du personnel de maison fiable."],
 ['🌍',"Un réseau sur plusieurs pays","SHAMAN CHOOZ met en relation employeurs et employés dans tous les pays du monde."],
 ['🗣️',"Des langues","Nous tenons compte des langues parlées dans votre foyer."],
 ['📋',"Des conditions claires","Missions, horaires, salaire : tout est précisé avant l'embauche."]
],"Vous venez d'arriver ? Contactez-nous pour trouver votre personnel de maison.");

E('villa-residence',"Villa et résidence : la gouvernante",'or',[
 ['🏡',"Une grande demeure","Une villa avec jardin, plusieurs pièces et du personnel demande une vraie coordination."],
 ['🗝️',"La gouvernante","Elle organise les équipes, les stocks et le planning de la maison."],
 ['🧑‍🌾',"Jardin et entretien","Nous pouvons aussi chercher jardinier, gardien, chauffeur."],
 ['📈',"Une maison qui brille","Un bon encadrement donne une résidence toujours impeccable."]
],"Une résidence bien tenue commence par la bonne gouvernante. Contactez-nous.");

E('maison-hotes',"Maisons d'hôtes et petits hôtels",'vert',[
 ['🛎️',"Des clients à accueillir","Chambres prêtes, linge propre, petit déjeuner soigné : c'est la clé du succès."],
 ['🧹',"Un personnel d'étage","Des personnes sérieuses pour le ménage des chambres et des parties communes."],
 ['🍳',"Un petit déjeuner","Un cuisinier ou une cuisinière qui prépare un accueil gourmand."],
 ['⭐',"Une bonne réputation","Un personnel fiable fait revenir les clients."]
],"Vous gérez une maison d'hôtes ? Parlons de votre personnel.");

E('diaspora-parents',"Diaspora : une aide pour vos parents au pays",'terre',[
 ['🌍',"Loin mais présent","Vous vivez à l'étranger et vos parents sont restés au pays ? Vous pouvez leur offrir une aide."],
 ['🧓',"Une présence au quotidien","Ménage, repas, courses : une personne de confiance soulage vos parents."],
 ['📱',"Rester informé","Un contact régulier avec l'employée vous rassure de loin."],
 ['💞',"Un geste d'amour","C'est une façon concrète de prendre soin de ceux qui vous ont élevé."]
],"Nous cherchons pour vos parents une personne sérieuse et douce.");

E('aide-parents-ages',"Une aide pour vos parents âgés",'turquoise',[
 ['👵',"Garder son autonomie","Avec un peu d'aide, vos parents peuvent rester dans leur maison."],
 ['🍲',"Repas et propreté","Une personne qui cuisine, nettoie et accompagne les gestes quotidiens."],
 ['💬',"De la compagnie","Une présence bienveillante lutte contre la solitude."],
 ['🛡️',"Une confiance indispensable","Nous cherchons des personnes patientes et respectueuses."]
],"Prenez soin de vos aînés avec notre aide. Contactez notre agence.");

E('etudiants-aide',"Étudiants : une aide-ménagère à temps partiel",'violet',[
 ['🎓',"Peu de temps, beaucoup à faire","Entre cours et examens, le ménage devient vite difficile à gérer."],
 ['⏱️',"Quelques heures par semaine","Une aide à temps partiel suffit souvent pour garder un logement propre."],
 ['🧺',"Linge et repas","Lessive, repassage, repas simples : tout peut être prévu à l'avance."],
 ['💶',"Un budget adapté","Quelques heures seulement, un coût plus facile à gérer."]
],"Étudiants, gagnez du temps pour réussir. Parlons de votre besoin.");

E('convalescence-aide',"Convalescence : une aide à la maison",'rose',[
 ['🛋️',"Se reposer","Après une opération ou une maladie, le repos est essentiel."],
 ['🍲',"Des repas préparés","Une personne qui cuisine et fait le ménage permet de se concentrer sur la guérison."],
 ['🧺',"Les tâches du quotidien","Courses, lessive, entretien : tout est pris en charge."],
 ['🙏',"Une présence rassurante","Une personne douce et attentive aide à mieux traverser cette période."]
],"Une aide temporaire pour mieux récupérer. Appelez notre agence.");

E('fetes-receptions',"Fêtes et réceptions : du personnel d'appoint",'orange',[
 ['🎉',"Un grand jour","Mariage, baptême, anniversaire : l'événement demande beaucoup de bras."],
 ['🍽️',"Service et cuisine","Aides en cuisine, serveurs, personnel de nettoyage avant et après la fête."],
 ['🧼',"Maison remise en ordre","Une équipe qui range pendant que vous profitez de vos invités."],
 ['📅',"Réservez à l'avance","Plus tôt vous nous prévenez, mieux nous préparons l'équipe."]
],"Une fête sans stress, c'est possible. Parlez-nous de votre événement.");

E('teletravail-maison',"Télétravail : une maison qui fonctionne",'nuit',[
 ['💻',"Travailler de chez soi","Quand on travaille à la maison, le ménage et les repas prennent beaucoup de temps."],
 ['🧹',"Déléguer","Une aide à la maison vous libère pour vous concentrer sur votre activité."],
 ['🍲',"Des repas prêts","Un déjeuner préparé, c'est une pause vraiment reposante."],
 ['🏠',"Un cadre calme","Une maison bien tenue favorise la concentration et la productivité."]
],"Gagnez en sérénité. Confiez-nous votre recherche.");

E('gagner-temps-famille',"Gagner du temps pour votre famille",'vert',[
 ['⏳',"Le temps est précieux","Moins de tâches ménagères, plus de moments avec vos enfants."],
 ['🎲',"Plus de jeux, moins de corvées","Passez vos soirées à jouer et à discuter, pas à laver et repasser."],
 ['🧘',"Moins de fatigue","Partager la charge de la maison réduit le stress des parents."],
 ['💞',"Une famille plus unie","Le temps gagné devient du temps de qualité ensemble."]
],"Offrez-vous le temps de vivre. Contactez notre agence.");

E('pourquoi-agence',"Pourquoi passer par une agence ?",'bleu',[
 ['🔍',"Un tri fait pour vous","Nous recevons les candidats et présentons ceux qui correspondent à votre besoin."],
 ['⏱️',"Un gain de temps","Pas besoin de multiplier annonces, appels et entretiens."],
 ['🤝',"Un accompagnement","Nous restons disponibles pour vous conseiller avant et après la mise en relation."],
 ['🌍',"Un réseau international","SHAMAN CHOOZ travaille dans tous les secteurs d'activité et dans tous les pays du monde."]
],"Confiez votre recherche à une agence qui vous écoute. Appelez-nous.");
})();

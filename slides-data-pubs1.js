/* ==========================================================
   PUBS 1/5 — « UN SEUL MÉTIER » (40 diaporamas pubs avec ta photo)
   Message de SHAMAN CHOOZ : faire le ménage de la maison, s'occuper des enfants et préparer les repas,
   c'est un seul et même travail. Fille de ménage, nounou, servante de maison, gouvernante de domicile.
   Chaque diaporama = 4 écrans + 1 écran « appel à l'action » ajouté automatiquement, puis la page
   « Contactez-nous » (coordonnées de agence-config.js) et la voix « Besoin de travailler ? … ».
   C(...) = pour les candidat(e)s • E(...) = pour les employeurs / familles
   ========================================================== */
(function(){
if(!window.SCCS) return;
let k = 0;
const PC = ["Postulez dès aujourd'hui","Inscrivez-vous maintenant","Votre place vous attend","Appelez-nous","Faites le premier pas"];
const PE = ["Parlons de votre besoin","Confiez-nous votre recherche","Contactez-nous","Un appel suffit","Recrutons ensemble"];
const C = (id,t,p,sl,cta)=> SCCS.add('pd-'+id, t, 'Agence', p, sl.concat([['📞', PC[k++ % PC.length], cta]]), { photo:true });
const E = (id,t,p,sl,cta)=> SCCS.add('pd-'+id, t, 'Agence', p, sl.concat([['📞', PE[k++ % PE.length], cta]]), { photo:true });

C('meme-metier',"Moi, SHAMAN CHOOZ, je le dis : un seul métier",'bleu',[
 ['🏠',"Une maison, un seul métier","Moi, SHAMAN CHOOZ, je le dis : faire le ménage, s'occuper des enfants et préparer les repas, c'est un seul et même travail."],
 ['🧹',"Le ménage","Une maison propre, des chambres rangées, du linge soigné : c'est ce qui rend un foyer agréable à vivre."],
 ['👶',"Les enfants","Les accompagner, les nourrir, les rassurer : c'est prendre soin de ce que la famille a de plus précieux."],
 ['🍲',"La cuisine","Préparer de bons repas, c'est donner de la force à toute la famille, chaque jour."]
],"Vous savez tenir une maison ? Notre agence vous met en relation avec des familles qui cherchent exactement cela.");

C('fille-menage-fiere',"Fille de ménage : un métier dont on peut être fier",'turquoise',[
 ['🧼',"Un travail qui compte","Sans vous, la maison ne tient pas : vous apportez l'ordre, la propreté et le calme à toute la famille."],
 ['🤝',"Un métier respectable","Selon SHAMAN CHOOZ, tenir une maison est un vrai métier, qui mérite respect, confiance et un salaire clair."],
 ['🍽️',"Pas seulement le ménage","Beaucoup de familles cherchent quelqu'un qui sache aussi aider avec les enfants et la cuisine."],
 ['📈',"Une porte vers mieux","Avec du sérieux, on devient aide-ménagère confirmée, puis gouvernante de maison."]
],"Vous êtes fille de ménage ou voulez le devenir ? Inscrivez-vous auprès de notre agence.");

C('nounou-plus',"Nounou : bien plus que garder des enfants",'rose',[
 ['👶',"Plus qu'une garde","Une nounou veille sur les enfants, mais aussi sur leur chambre, leurs vêtements et leurs repas."],
 ['🍼',"Les repas des petits","Préparer un biberon, une bouillie ou un bon plat pour l'enfant fait partie du même travail."],
 ['🧸',"Une chambre bien rangée","Des jouets rangés et une chambre propre donnent aux enfants un cadre sain pour grandir."],
 ['💞',"Un métier de cœur","Selon SHAMAN CHOOZ, la nounou qui fait tout cela avec amour est une vraie gouvernante du foyer."]
],"Nounou expérimentée ou débutante motivée, notre agence cherche des familles pour vous.");

C('servante-coeur',"Servante de maison : le cœur du foyer",'terre',[
 ['🏡',"Le cœur de la maison","La servante de maison tient le foyer debout : ménage, linge, repas et soin des enfants."],
 ['⏰',"Une journée bien remplie","Du lever au coucher de la famille, elle organise son temps pour que tout soit prêt à l'heure."],
 ['🌟',"Un vrai savoir-faire","Savoir tout faire demande de l'expérience, de la rigueur et beaucoup de cœur : un talent à reconnaître."],
 ['💬',"Un accord clair","Tâches, horaires, repos et salaire : tout se dit dès le début, pour une relation de confiance."]
],"Vous cherchez une place de servante de maison ? Contactez notre agence, nous cherchons avec vous.");

C('gouvernante-complet',"Gouvernante de domicile : le métier complet",'or',[
 ['🗝️',"La responsable de la maison","La gouvernante de domicile résidentiel gère le quotidien : propreté, repas, enfants et organisation."],
 ['📋',"Elle organise","Elle prépare les menus, surveille le linge, les courses, les stocks et le travail du reste du personnel."],
 ['👨‍👩‍👧',"Elle rassure","Les parents partent travailler l'esprit tranquille : la maison et les enfants sont entre de bonnes mains."],
 ['🎓',"Un métier qui s'apprend","Avec de la pratique, une fille de ménage ou une nounou peut devenir gouvernante."]
],"Vous voulez évoluer vers la gouvernance de maison ? Parlez-nous de votre parcours.");

E('tout-en-un',"Le personnel de maison tout-en-un",'vert',[
 ['🧩',"Trois besoins, une personne","Ménage, enfants, cuisine : pour SHAMAN CHOOZ, c'est un seul métier, celui de prendre soin d'un foyer."],
 ['⏱️',"Plus simple pour vous","Un seul interlocuteur à la maison, une seule organisation, moins de démarches pour la famille."],
 ['🔍',"Nous cherchons le bon profil","Nous étudions votre besoin et cherchons une personne capable d'assurer ces trois missions."],
 ['🤝',"Un cadre clair","Missions, horaires, salaire et repos sont précisés dès le départ, pour que chacun s'y retrouve."]
],"Vous cherchez une personne pour tenir toute la maison ? Confiez-nous votre recherche.");

C('pourquoi-separer',"Ménage et enfants : pourquoi séparer ?",'violet',[
 ['❓',"Une question simple","Quand on s'occupe d'une maison, peut-on vraiment séparer le ménage, les enfants et la cuisine ?"],
 ['🔗',"Tout se tient","Les enfants mangent, jouent et dorment dans une maison propre : tout est lié, tout se fait ensemble."],
 ['🗣️',"Moi, SHAMAN CHOOZ, je dis","C'est le même travail : prendre soin de la maison et de ceux qui y vivent."],
 ['✅',"Une personne complète","Les familles apprécient celle qui sait tout faire avec sérieux, et savent la respecter."]
],"Vous êtes cette personne complète ? Rejoignez notre agence.");

C('cuisiner-enfants',"Cuisiner pour les enfants, c'est les élever",'orange',[
 ['🥣',"Nourrir, c'est éduquer","Un enfant bien nourri grandit en bonne santé, apprend mieux et sourit davantage."],
 ['🥕',"Cuisiner avec soin","Choisir de bons ingrédients, bien laver, bien cuire : ces gestes protègent toute la famille."],
 ['🧽',"La cuisine reste propre","Nettoyer le plan de travail et la vaisselle fait partie du repas : tout est un seul travail."],
 ['😊',"Un moment de joie","Un repas préparé avec amour fait de la maison un endroit où l'on se sent bien."]
],"Vous aimez cuisiner et prendre soin des enfants ? Notre agence a des familles pour vous.");

C('menage-cuisine',"Le ménage et la cuisine vont ensemble",'turquoise',[
 ['🍳',"Une cuisine, une maison","On ne peut pas bien cuisiner dans une maison sale, ni bien nettoyer sans penser aux repas."],
 ['🧴',"Les bons gestes","Nettoyer, ranger, préparer, servir : tout s'enchaîne naturellement dans la journée."],
 ['📆',"Une bonne organisation","Quand on s'organise bien, le ménage et les repas se font sans courir."],
 ['💡',"L'avis de SHAMAN CHOOZ","Une personne qui sait faire les deux est précieuse pour toutes les familles."]
],"Ménage et cuisine : mettez vos deux talents à profit grâce à notre agence.");

E('trois-piliers',"Un foyer équilibré repose sur trois piliers",'bleu',[
 ['🏛️',"Trois piliers","Une maison propre, des enfants bien suivis et des repas préparés à l'heure : voilà un foyer équilibré."],
 ['👩‍🍳',"Une seule personne ?","Selon SHAMAN CHOOZ, c'est un seul et même métier : celui de tenir la maison avec cœur."],
 ['🧭',"Nous vous guidons","Nous vous aidons à définir les missions et à choisir le profil qui convient à votre famille."],
 ['⚖️',"Un cadre juste","Salaire, horaires et repos : tout est discuté clairement avec le candidat."]
],"Trouvons ensemble la personne qui prendra soin de votre maison.");

C('valeur-travail',"Le travail de la maison a une vraie valeur",'or',[
 ['💎',"Un travail précieux","Chaque jour, des milliers de familles comptent sur celles et ceux qui tiennent leur maison."],
 ['🗣️',"Moi, SHAMAN CHOOZ, je dis","Ménage, enfants, cuisine : ce métier mérite autant de respect que n'importe quel autre."],
 ['💰',"Une juste rémunération","Un travail complet se discute et se paie clairement : c'est la base d'une relation saine."],
 ['🙌',"Tête haute","Vous apportez le confort, la santé et la tranquillité : soyez fier de ce que vous faites."]
],"Faites reconnaître votre valeur : inscrivez-vous à notre agence.");

C('respect-base',"Le respect, base du travail à domicile",'rouge',[
 ['🤲',"Le respect dans les deux sens","Dans une maison, l'employeur et l'employé se doivent le respect, chaque jour."],
 ['🗣️',"Bien parler","Un bonjour, un merci, un ton calme : ces petits mots changent toute l'ambiance."],
 ['👀',"Respecter la vie privée","On ne raconte pas à l'extérieur ce qui se passe dans la famille qui nous accueille."],
 ['🏠',"Respecter la maison","Prendre soin des objets comme s'ils étaient les nôtres montre qu'on est sérieux."]
],"Vous êtes sérieux et respectueux ? Notre agence vous recommande aux familles.");

C('competences-or',"Vos compétences de maison valent de l'or",'or',[
 ['🥇',"Vous savez déjà beaucoup","Laver, repasser, cuisiner, garder les enfants : ces savoirs sont très recherchés."],
 ['📣',"Osez les dire","Dans un entretien, citez tout ce que vous savez faire, même si vous l'avez appris en famille."],
 ['🧠',"Tout s'apprend","Ce que vous ne savez pas encore, vous pouvez l'apprendre avec de la motivation."],
 ['🌍',"Des familles partout","Dans toutes les villes et tous les pays, des familles cherchent des personnes comme vous."]
],"Valorisez vos compétences : parlez-en à notre agence.");

C('polyvalence-atout',"Polyvalente : votre meilleur atout",'vert',[
 ['🎯',"Savoir tout faire","Une personne polyvalente est choisie plus vite, car elle répond à plusieurs besoins à la fois."],
 ['🧹',"Ménage","Entretenir les pièces, le linge et la vaisselle avec méthode."],
 ['🧒',"Enfants","Accompagner, surveiller, nourrir et rassurer les plus petits."],
 ['🍛',"Cuisine","Préparer des repas simples, sains et bien présentés."]
],"Ménage, enfants, cuisine : montrez tout votre talent. Contactez notre agence.");

E('famille-complete',"Les familles cherchent une personne complète",'rose',[
 ['🏡',"Un besoin fréquent","De plus en plus de familles veulent une seule personne pour le ménage, les enfants et les repas."],
 ['🔍',"Un profil précis","Nous prenons le temps de comprendre vos habitudes, vos enfants et vos attentes."],
 ['📞',"Un suivi","Nous restons à votre écoute après la mise en relation pour que tout se passe bien."],
 ['🤝',"Confiance des deux côtés","Une bonne entente se construit avec de la clarté et du respect."]
],"Décrivez-nous la personne qu'il vous faut, nous la cherchons.");

E('un-recrutement',"Un seul recrutement pour toute la maison",'nuit',[
 ['1️⃣',"Un seul dossier","Plutôt que de chercher trois personnes, cherchez une personne qui sait tout faire."],
 ['⏳',"Du temps gagné","Moins d'annonces, moins d'entretiens : nous faisons le tri pour vous."],
 ['🏠',"Une maison mieux gérée","Une seule personne qui connaît toute la maison évite les oublis et les malentendus."],
 ['✅',"Votre décision","Nous vous présentons des profils : c'est vous qui choisissez en toute liberté."]
],"Un seul appel, et nous lançons votre recherche.");

C('shaman-explique',"SHAMAN CHOOZ vous explique ce métier",'violet',[
 ['🎙️',"Je vous le dis simplement","Moi, SHAMAN CHOOZ, je dis que s'occuper de la maison, c'est s'occuper de la vie de toute une famille."],
 ['🧩',"Les trois parties","Ménage, enfants et cuisine ne s'opposent pas : ce sont les trois visages d'un même travail."],
 ['🌱',"Pour celles qui débutent","Même si vous n'avez jamais été employée, vos gestes de tous les jours sont déjà des compétences."],
 ['🚀',"Pour avancer","Notre agence vous présente aux familles qui cherchent exactement ce que vous savez faire."]
],"Écoutez mon conseil : inscrivez-vous et laissez-nous vous placer.");

C('journee-type',"Une journée type à la maison",'orange',[
 ['🌅',"Le matin","Réveil des enfants, petit déjeuner, préparation pour l'école : la journée démarre dans la bonne humeur."],
 ['🧽',"Dans la matinée","Ménage des pièces, vaisselle, lessive : la maison retrouve son éclat."],
 ['🍽️',"À midi","Repas préparé, enfants servis, cuisine rangée : un temps fort de la journée."],
 ['🌙',"L'après-midi et le soir","Linge, courses, devoirs, dîner et coucher : tout s'enchaîne avec calme."]
],"Cette journée vous ressemble ? Nous avons des familles qui l'attendent.");

C('matin-maison',"Le matin : réveil, petit déjeuner, école",'or',[
 ['⏰',"Se lever tôt","Une bonne journée commence par une bonne organisation, tôt le matin."],
 ['🥖',"Petit déjeuner","Pain, lait, fruits ou bouillie : les enfants partent le ventre plein et l'esprit tranquille."],
 ['🎒',"Départ à l'école","Cartable prêt, uniforme propre, goûter prévu : rien n'est oublié."],
 ['🛏️',"Les chambres","Une fois la maison calme, on aère et on range les chambres."]
],"Vous aimez les matins bien organisés ? Contactez notre agence.");

C('midi-maison',"À midi : le repas et le rangement",'terre',[
 ['🍲',"Un repas chaud","À midi, un plat chaud, simple et copieux redonne de l'énergie à toute la famille."],
 ['🥤',"Boire de l'eau propre","Une eau propre à table protège la santé des enfants comme des grands."],
 ['🧼',"On range en même temps","Nettoyer pendant que ça cuit : on gagne du temps et la cuisine reste agréable."],
 ['😴',"Un moment de repos","Après le repas, un petit temps calme prépare l'après-midi."]
],"Cuisiner et ranger avec méthode : c'est votre force ? Inscrivez-vous.");

C('apres-midi-maison',"L'après-midi : enfants, linge, courses",'turquoise',[
 ['🧺',"Le linge","Trier, laver, étendre, plier : un linge propre et rangé, c'est un foyer soigné."],
 ['📚',"Les enfants rentrent","Goûter, douche, devoirs : les enfants ont besoin d'une présence douce et attentive."],
 ['🛒',"Les courses","Acheter l'essentiel au bon prix et prévoir les repas de demain."],
 ['📝',"Un petit compte rendu","Dire à la famille ce qui a été fait installe la confiance."]
],"Vous savez gérer votre après-midi ? Nos familles seront ravies de vous accueillir.");

C('soir-maison',"Le soir : dîner, bain, coucher",'nuit',[
 ['🍛',"Le dîner","Un repas léger et savoureux, pris en famille, termine bien la journée."],
 ['🛁',"Le bain","Pour les petits, le bain est un moment de calme et de douceur."],
 ['📖',"L'histoire du soir","Un conte, une chanson, une caresse : les enfants s'endorment rassurés."],
 ['🌟',"Un travail accompli","Une maison propre, des enfants heureux : la fierté d'une journée bien remplie."]
],"Un métier de cœur vous attend. Appelez notre agence.");

E('semaine-organisee',"Une semaine bien organisée à la maison",'bleu',[
 ['🗓️',"Un planning clair","Lundi le linge, mardi les chambres, mercredi les courses : un planning simple évite la fatigue."],
 ['📋',"Des repères pour tous","Chacun sait ce qui est attendu, les horaires sont respectés et la maison tourne bien."],
 ['🔄',"Souple si besoin","Les imprévus arrivent : un bon planning se modifie facilement avec un peu de dialogue."],
 ['🤝',"Ensemble","Employeur et employée peuvent le préparer ensemble dès les premiers jours."]
],"Nous vous aidons à bien démarrer. Contactez notre agence.");

C('logee-ou-non',"Logée ou non logée : vous choisissez",'vert',[
 ['🛌',"Deux possibilités","Certaines familles proposent le logement, d'autres préfèrent une personne qui rentre chez elle le soir."],
 ['🏘️',"Vos préférences comptent","Dites-nous ce qui vous convient : proche de chez vous, logée, ou en journée seulement."],
 ['📍',"Le trajet","Une place proche de votre domicile vous fait gagner du temps et de l'argent."],
 ['📜',"Tout clarifier","Chambre, repas, repos et horaires : chaque point doit être précisé avant de commencer."]
],"Dites-nous ce que vous recherchez : nous cherchons la famille qui vous convient.");

C('temps-plein-partiel',"Temps plein ou quelques heures",'orange',[
 ['⏳',"À votre rythme","Certaines personnes veulent un emploi à plein temps, d'autres quelques heures par jour ou par semaine."],
 ['👩‍🎓',"Pour tous les profils","Étudiante, mère de famille, retraitée : chacun peut trouver un rythme adapté."],
 ['💼',"Plusieurs familles","Avec des horaires partagés, on peut parfois travailler pour deux familles."],
 ['📅',"Des horaires respectés","Des heures claires protègent votre temps et celui de votre employeur."]
],"Précisez vos disponibilités à notre agence, nous trouvons la bonne place.");

C('debutante-oser',"Débutante ? Vous pouvez commencer",'rose',[
 ['🌸',"Tout le monde débute","Chaque bonne employée a eu un premier jour : l'important est d'être motivée et sérieuse."],
 ['🧠',"Apprendre vite","En observant, en posant des questions et en répétant, on progresse très vite."],
 ['🙋',"Posez vos questions","Une bonne employée demande quand elle ne sait pas : c'est une preuve de sérieux."],
 ['🏁',"Le premier pas","Une première expérience ouvre toutes les portes pour la suite de votre parcours."]
],"Pas d'expérience ? Parlez-nous de vous. Nous vous présentons à des familles patientes.");

C('experience-compte',"Votre expérience compte",'terre',[
 ['📚',"Des années de pratique","Si vous avez déjà travaillé dans une maison, c'est un grand avantage à mettre en avant."],
 ['🗒️',"Parlez de vos missions","Ménage, nounou, cuisine, repassage : listez tout ce que vous avez déjà fait."],
 ['📞',"Des références","Le nom d'un ancien employeur qui peut vous recommander rassure beaucoup les familles."],
 ['🏆',"Une meilleure place","Plus d'expérience, c'est souvent une meilleure place et une meilleure rémunération."]
],"Mettez votre expérience au service d'une famille : contactez notre agence.");

C('evoluer-gouvernante',"Évoluer : d'aide-ménagère à gouvernante",'or',[
 ['🪜',"Un chemin possible","On peut commencer comme aide-ménagère, puis devenir nounou, cuisinière, puis gouvernante."],
 ['📈',"Chaque étape compte","Chaque nouvelle compétence augmente votre valeur auprès des familles."],
 ['🎓',"Se former","Observer, apprendre de nouvelles recettes et de nouvelles méthodes vous fait grandir."],
 ['👑',"Responsable de maison","La gouvernante coordonne tout le foyer et peut diriger d'autres employés."]
],"Construisez votre carrière à la maison avec notre agence.");

C('confiance-valeur',"La confiance, valeur numéro un",'bleu',[
 ['🔐',"Une maison confiée","Une famille vous confie sa maison, ses enfants et ses affaires : c'est un grand honneur."],
 ['💡',"Mériter cette confiance","Être honnête, ponctuel et clair sur ce que l'on fait chaque jour."],
 ['🙊',"Ne rien cacher","En cas d'erreur ou de casse, le dire tout de suite montre qu'on est digne de confiance."],
 ['🌟',"La récompense","Une famille satisfaite garde longtemps sa bonne employée et la recommande."]
],"Votre honnêteté est votre plus belle recommandation. Parlons-en.");

C('discretion-maison',"Discrétion : ce qu'on voit à la maison, on le garde",'nuit',[
 ['🤫',"Un secret professionnel","Ce qui se passe dans la famille reste dans la famille : c'est la règle d'or."],
 ['📵',"Sur les réseaux","Pas de photos ni de vidéos de la maison ou des enfants publiées sans accord."],
 ['🚪',"Les visiteurs","On ne fait entrer personne sans l'autorisation de l'employeur."],
 ['🏅',"Un vrai professionnel","La discrétion est ce qui distingue les meilleures employées de maison."]
],"Vous êtes discrète et fiable ? Les familles vous attendent.");

C('honnetete-premiere',"Honnêteté : la première qualité",'vert',[
 ['💚',"La base de tout","Une personne honnête est recommandée de famille en famille."],
 ['🧾',"Courses et argent","Rendre la monnaie et les tickets, noter les dépenses : tout est transparent."],
 ['🔎',"Des objets retrouvés","Un bijou ou un billet oublié, on le rapporte tout de suite à son propriétaire."],
 ['🌈',"Une conscience tranquille","Travailler honnêtement, c'est dormir en paix et avancer sans peur."]
],"Vous êtes honnête et courageux ? Rejoignez notre agence.");

C('sourire-difference',"Le sourire fait la différence",'rose',[
 ['😊',"Un sourire qui ouvre","Un bon sourire et un « bonjour » chaleureux changent l'ambiance d'une maison."],
 ['🗨️',"Une bonne humeur","Même dans les journées chargées, rester aimable donne envie de vous garder."],
 ['🧒',"Pour les enfants","Les enfants adorent les personnes douces et joyeuses."],
 ['🏡',"Une maison heureuse","La bonne humeur de celle qui travaille se sent dans toute la maison."]
],"Vous avez le sourire et l'envie de bien faire ? Inscrivez-vous.");

C('ponctualite-regle',"Ponctualité : être là à l'heure",'turquoise',[
 ['⌚',"À l'heure, toujours","Arriver à l'heure montre le respect que vous portez à la famille."],
 ['🚌',"Prévoir le trajet","Partir un peu plus tôt évite les retards dus aux embouteillages ou à la pluie."],
 ['📱',"Prévenir en cas de retard","Un message ou un appel à l'avance est toujours apprécié."],
 ['🏁',"Un exemple","La ponctualité est l'une des premières qualités que les employeurs regardent."]
],"Soyez ponctuel, nous nous occupons du reste. Contactez-nous.");

C('proprete-personnelle',"Propreté personnelle, propreté de la maison",'bleu',[
 ['🚿',"Soi-même d'abord","Une tenue propre et des mains lavées inspirent confiance dès la première minute."],
 ['👐',"Les mains","On se lave les mains avant de cuisiner, après les toilettes et après le ménage."],
 ['👕',"Une tenue adaptée","Des vêtements simples, propres et pratiques sont idéaux pour travailler à la maison."],
 ['🏠',"Un exemple pour les enfants","Une personne soignée montre aux enfants les bonnes habitudes d'hygiène."]
],"Une personne soignée trouve plus vite une place. Contactez notre agence.");

C('patience-enfants',"Patience avec les enfants",'rose',[
 ['🧡',"Une grande qualité","Les enfants testent, pleurent, courent : la patience est un vrai talent."],
 ['🗣️',"Parler calmement","On explique avec douceur, sans crier : l'enfant comprend mieux et se sent respecté."],
 ['🎲',"Occuper intelligemment","Jeux, dessins, histoires : un enfant occupé est un enfant heureux."],
 ['🙏',"Jamais de violence","Les enfants se protègent, se respectent et ne se frappent jamais."]
],"Patiente et douce ? Les parents vous attendent. Parlez à notre agence.");

C('apprendre-chaque-jour',"Apprendre tous les jours",'violet',[
 ['📖',"Toujours progresser","Chaque jour à la maison est une occasion d'apprendre une nouvelle technique ou une nouvelle recette."],
 ['👂',"Écouter les conseils","Les remarques de l'employeur, bien reçues, vous rendent meilleure."],
 ['🧪',"Essayer de nouvelles méthodes","Un nouveau produit, une astuce de rangement : testez avec prudence."],
 ['🌱',"Grandir dans le métier","Celles qui apprennent le plus deviennent les plus recherchées."]
],"Envie de progresser dans votre métier ? Notre agence vous accompagne.");

C('respectee-maison',"Être respectée dans la maison où l'on travaille",'or',[
 ['👑',"Une place reconnue","Vous méritez d'être appelée par votre nom, remerciée et traitée avec égard."],
 ['🛌',"Un vrai repos","Une pause, un repas et un temps de repos font partie d'un bon accord."],
 ['🗨️',"Pouvoir parler","Si quelque chose ne va pas, vous devez pouvoir en parler calmement à votre employeur."],
 ['🤝',"Une relation saine","Le respect ne s'achète pas : il se construit chaque jour des deux côtés."]
],"Trouvez une famille qui vous respecte grâce à notre agence.");

C('hommes-aussi',"Les hommes aussi travaillent à la maison",'terre',[
 ['👨‍🍳',"Cuisinier à domicile","Beaucoup de familles cherchent un cuisinier compétent et propre."],
 ['🧑‍🔧',"Homme à tout faire","Petites réparations, jardin, entretien de la cour : un homme polyvalent est très recherché."],
 ['🚗',"Chauffeur de famille","Conduire les enfants à l'école et la famille en ville demande sérieux et prudence."],
 ['🧹',"Aide-ménager","Le ménage n'est pas réservé aux femmes : les hommes sérieux ont leur place."]
],"Messieurs, vous êtes bienvenus. Inscrivez-vous à notre agence.");

C('aide-seniors-maison',"Aide à domicile pour les personnes âgées",'vert',[
 ['👵',"Un métier humain","Accompagner une personne âgée demande de la douceur, de l'écoute et du respect."],
 ['🍲',"Repas et ménage","Préparer les repas, tenir la maison propre et aider aux gestes de la vie courante."],
 ['💬',"Tenir compagnie","Parler, écouter et sourire : pour beaucoup de seniors, c'est déjà un grand soutien."],
 ['🏡',"Rester chez soi","Une aide à domicile permet aux personnes âgées de rester dans leur maison, entourées."]
],"Vous avez le cœur pour ce métier ? Contactez notre agence.");

C('slogan-trois-talents',"Un métier, trois talents, une agence",'bleu',[
 ['🧹',"Premier talent : le ménage","Rendre une maison propre, claire et agréable à vivre."],
 ['👶',"Deuxième talent : les enfants","Les garder, les rassurer, les aider à grandir avec douceur."],
 ['🍲',"Troisième talent : la cuisine","Préparer des repas sains et savoureux pour toute la famille."],
 ['🌍',"Une agence pour vous placer","SHAMAN CHOOZ met en relation employeurs et employés dans tous les pays du monde."]
],"Trois talents, un seul numéro : appelez notre agence.");
})();

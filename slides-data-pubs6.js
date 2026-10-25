/* ==========================================================
   PUBS 6/10 — LA PAROLE DE SHAMAN CHOOZ (40 nouveaux diaporamas pubs avec ta photo)
   Ton message à toi : ménage, enfants et cuisine = un seul et même travail. Respect du métier,
   conseils aux familles et aux candidates, valeurs de l'agence.
   Chaque diaporama = 4 écrans + 1 écran « appel à l'action » ajouté automatiquement, puis la page
   « Contactez-nous » (coordonnées de agence-config.js).
   C(...) = pour les candidat(e)s • E(...) = pour les employeurs / familles
   Les identifiants commencent par « ps- » : ils sont répartis sur toute la boucle avec les autres pubs.
   ========================================================== */
(function(){
if(!window.SCCS) return;
let k = 2;
const PC = ["Postulez dès aujourd'hui","Inscrivez-vous maintenant","Votre place vous attend","Appelez-nous","Faites le premier pas"];
const PE = ["Parlons de votre besoin","Confiez-nous votre recherche","Contactez-nous","Un appel suffit","Recrutons ensemble"];
const C = (id,t,p,sl,cta)=> SCCS.add('ps-'+id, t, 'Agence', p, sl.concat([['📞', PC[k++ % PC.length], cta]]), { photo:true });
const E = (id,t,p,sl,cta)=> SCCS.add('ps-'+id, t, 'Agence', p, sl.concat([['📞', PE[k++ % PE.length], cta]]), { photo:true });

C('meme-travail',"Moi, SHAMAN CHOOZ : maison, enfants, cuisine, même travail",'bleu',[
 ['🏠',"Je le répète","Moi, SHAMAN CHOOZ, je dis que faire le ménage, s'occuper des enfants et cuisiner, c'est un seul et même travail."],
 ['❤️',"Un même but","Dans les trois cas, on prend soin d'une famille : son confort, sa santé et sa tranquillité."],
 ['🧠',"Un même savoir-faire","Organisation, propreté, patience et attention : ce sont les mêmes qualités qui servent dans toute la maison."],
 ['✨',"Pour vous","Si vous savez faire un peu de tout à la maison, vous avez déjà ce que les familles cherchent."]
],"Inscrivez-vous : nous vous présentons aux familles qui ont besoin de vous.");

C('pas-trois-metiers',"Je ne vois pas trois métiers, j'en vois un",'violet',[
 ['1️⃣',"Un seul métier","Pour moi, SHAMAN CHOOZ, la fille de ménage, la nounou, la servante de maison et la gouvernante font le même métier."],
 ['🔗',"Tout est lié","Quand la maison est propre, que les enfants sont bien suivis et que le repas est prêt, la famille respire."],
 ['🙋‍♀️',"Vous n'avez pas à choisir","Une personne qui sait tenir la maison peut très bien s'occuper aussi des enfants et de la cuisine."],
 ['🎯',"Notre rôle","Nous cherchons ensemble le poste qui correspond à vos forces et à vos envies."]
],"Dites-nous ce que vous savez faire, nous trouvons la famille qu'il vous faut.");

C('tient-la-maison',"Celle qui tient la maison tient la famille",'or',[
 ['🗝️',"Un rôle central","Dans une maison, il y a toujours une personne sur qui tout le monde compte. C'est un rôle très important."],
 ['🌅',"Du lever au coucher","Réveiller, nourrir, ranger, rassurer : une journée à la maison demande de l'énergie et du cœur."],
 ['🏅',"Un vrai mérite","Ce travail demande de la force, de l'organisation et du sens des responsabilités."],
 ['🤝',"Soyez reconnue","Chez nous, ce travail est respecté, présenté avec fierté et discuté avec honnêteté."]
],"Votre travail mérite d'être reconnu. Rejoignez notre agence.");

C('cuisine-amour',"Préparer un repas, c'est prendre soin des siens",'orange',[
 ['🍲',"Plus qu'un plat","Un bon repas donne de la force aux enfants, aux parents et à tous ceux qui vivent dans la maison."],
 ['⏰',"À l'heure, avec soin","Préparer les repas à temps, c'est aussi organiser la journée de toute la famille."],
 ['🧼',"Propre et sain","Mains lavées, aliments bien lavés, ustensiles propres : la bonne cuisine commence par l'hygiène."],
 ['🧩',"Une partie du même travail","Pour SHAMAN CHOOZ, cuisiner fait partie du même métier que le ménage et les enfants."]
],"Vous aimez cuisiner ? Des familles vous attendent. Appelez notre agence.");

C('enfants-foyer',"Les enfants font partie de la maison",'rose',[
 ['👧',"Ils vivent dans la maison","Les enfants mangent, jouent, dorment et apprennent à la maison. Ils font partie du même foyer que le ménage et la cuisine."],
 ['👀',"Un œil attentif","Celle qui tient la maison voit aussi ce que font les petits : elle les protège naturellement."],
 ['🎈',"Du temps pour eux","Une maison bien organisée laisse plus de temps pour jouer, écouter et rassurer les enfants."],
 ['🌈',"Un même cœur","On ne s'occupe pas de la même façon d'un sol et d'un enfant, mais c'est le même cœur qui travaille."]
],"Vous aimez les enfants et la maison ? Inscrivez-vous chez nous.");

C('menage-respect',"Une maison propre, un foyer respecté",'turquoise',[
 ['🧹',"La propreté rassure","Dans une maison bien entretenue, on dort mieux, on mange mieux et on reçoit avec fierté."],
 ['🏡',"Le soin des détails","Un coin rangé, un linge bien plié, une table propre : les petits détails font la différence."],
 ['📈',"Un travail visible","Le résultat du ménage se voit tout de suite, et la famille le remarque et l'apprécie."],
 ['🧩',"Au cœur du métier","Pour SHAMAN CHOOZ, le ménage est le premier visage d'un même travail à la maison."]
],"Le ménage est votre force ? Faites-vous connaître des familles par notre agence.");

C('aucune-honte',"Aucune honte à travailler à la maison",'terre',[
 ['💪',"Un travail honnête","Gagner sa vie par un travail honnête est toujours une fierté, quel que soit le métier."],
 ['🌍',"Partout dans le monde","Dans tous les pays, des familles ont besoin de personnes de confiance pour leur maison."],
 ['🚫',"Ne vous laissez pas rabaisser","Votre travail a de la valeur, et vous avez droit au respect, comme n'importe qui."],
 ['🌟',"Je suis à vos côtés","Moi, SHAMAN CHOOZ, je dis qu'il n'y a pas de petit métier quand il est fait avec sérieux."]
],"Marchez la tête haute. Nous vous mettons en relation avec des familles respectueuses.");

E('aux-familles',"Message aux familles qui recrutent",'bleu',[
 ['🏠',"Chère famille","Vous cherchez une personne pour la maison, les enfants ou la cuisine ? Dites-nous simplement ce dont vous avez besoin."],
 ['🧭',"Nous vous guidons","Nous vous aidons à définir les missions, les horaires et le profil de la personne qui vous convient."],
 ['🔍',"Une recherche sérieuse","Nous étudions les candidatures et nous vous présentons des personnes qui correspondent à votre demande."],
 ['🤝',"Un cadre juste","Chaque mission, chaque horaire et chaque repos sont clarifiés dès le départ pour éviter les malentendus."]
],"Contactez notre agence : nous cherchons pour vous la personne de confiance.");

C('aux-candidates',"Message à celles qui cherchent du travail",'rose',[
 ['💌',"Chère candidate","Vous cherchez un travail à la maison : ménage, enfants, cuisine ? Vous êtes à la bonne place."],
 ['📝',"Inscription simple","Donnez-nous votre nom, vos contacts, votre quartier et ce que vous savez faire."],
 ['👀',"Nous cherchons pour vous","Nous présentons votre profil aux familles et aux employeurs qui recrutent."],
 ['🌱',"Pas besoin d'être parfaite","Le sérieux, l'honnêteté et l'envie d'apprendre comptent autant que l'expérience."]
],"Appelez-nous, nous vous recevons et nous écoutons votre histoire.");

E('ce-que-nous-faisons',"Ce que fait notre agence, simplement",'vert',[
 ['🌐',"Mise en relation","Nous mettons en relation des employeurs et des personnes qui cherchent du travail, dans de nombreux secteurs."],
 ['🏠',"Une grande place à la maison","Fille de ménage, nounou, servante de maison, gouvernante de domicile : c'est le cœur de notre travail."],
 ['🗂️',"Nous organisons","Nous recevons les candidatures, nous rencontrons les personnes et nous préparons les rencontres."],
 ['🔒',"Dans la clarté","Nous restons honnêtes sur les conditions et sur ce que nous pouvons faire ou non."]
],"Besoin de personnel ou de travail ? Contactez-nous.");

C('mission-claire',"Une mission claire, un travail serein",'nuit',[
 ['📋',"Savoir ce qu'on attend","Ménage, enfants, cuisine, courses : mieux vaut que tout soit dit dès le début."],
 ['🗣️',"En parler librement","Posez vos questions à l'employeur avant de commencer : c'est normal et c'est sérieux."],
 ['⚖️',"Des conditions justes","Horaires, repos, salaire : un bon accord protège la famille et protège l'employée."],
 ['🧘',"Un travail plus serein","Quand tout est clair, on travaille avec confiance et sans mauvaise surprise."]
],"Nous vous aidons à bien démarrer. Inscrivez-vous dès maintenant.");

C('polyvalence-force',"Savoir tout faire : votre grande force",'orange',[
 ['🧰',"Une boîte à outils","Cuisiner, nettoyer, laver, s'occuper d'un enfant : chaque savoir-faire est un outil de plus."],
 ['🔄',"S'adapter vite","Une personne polyvalente s'adapte à toutes les situations de la maison."],
 ['💼',"Plus d'offres possibles","Plus vous savez faire de choses, plus de familles peuvent avoir besoin de vous."],
 ['📣',"Faites-le savoir","Dites clairement à l'agence tout ce que vous savez faire, même les petites choses."]
],"Vous savez tout faire à la maison ? Faites-le savoir : inscrivez-vous.");

C('travail-noble',"Un travail noble, un métier utile",'or',[
 ['👑',"Un métier utile","Grâce à vous, des parents peuvent travailler, des enfants sont bien gardés et des maisons restent accueillantes."],
 ['🏛️',"Une place dans la société","Le travail de la maison soutient les autres métiers : sans lui, beaucoup de familles ne pourraient pas avancer."],
 ['🎓',"On peut y progresser","Avec l'expérience, on devient plus autonome, plus sûre, plus demandée."],
 ['✊',"Soyez fière","Chaque jour, vous rendez un vrai service. C'est une fierté, pas une honte."]
],"Un travail utile vous attend. Appelez notre agence.");

C('merci-maison',"Merci à celles qui font vivre nos maisons",'rose',[
 ['🙏',"Merci","Moi, SHAMAN CHOOZ, je dis merci à toutes celles qui lavent, cuisinent, gardent et rassurent chaque jour."],
 ['🌅',"On ne vous voit pas toujours","Beaucoup de choses sont faites avant que la famille se réveille. Ce travail est précieux."],
 ['💬',"Dire merci compte","Un merci sincère donne du courage. Familles, n'oubliez pas de le dire."],
 ['🤲',"Nous sommes là","Notre agence vous accompagne pour trouver une place où l'on vous respecte."]
],"Vous méritez une maison qui vous respecte. Inscrivez-vous.");

C('courage-jeune',"Jeune fille courageuse, ton avenir commence",'turquoise',[
 ['🌱',"Tu peux commencer petit","Un premier travail à la maison peut ouvrir la porte à de belles opportunités."],
 ['📚',"Tu apprends beaucoup","Gérer une maison enseigne l'organisation, la responsabilité et le sens du service."],
 ['👩‍👧',"Demande des conseils","Une personne plus expérimentée peut t'expliquer les bons gestes. Écoute et pose des questions."],
 ['🚀',"Garde le cap","Avec du sérieux et de la persévérance, tu peux faire ton chemin."]
],"Tu cherches ta première place ? Viens nous voir avec une personne de confiance.");

C('cuisine-enfants-liens',"Cuisiner pour les enfants : un lien qui compte",'vert',[
 ['🥣',"Adapter les repas","Les enfants ont besoin de plats simples, bien cuits, pas trop épicés et adaptés à leur âge."],
 ['👩‍🍳',"Écouter les parents","Chaque famille a ses habitudes, ses interdits et ses préférences : demandez-les toujours."],
 ['😋',"Donner envie de manger","Des couleurs, de bonnes odeurs, une jolie assiette : les petits mangent mieux quand c'est agréable."],
 ['🧩',"Ménage, enfants, cuisine","Pour SHAMAN CHOOZ, c'est une illustration parfaite : tout se rejoint dans un seul métier."]
],"Aimez-vous cuisiner pour les enfants ? Rejoignez-nous.");

C('presence-rassurante',"Une présence rassurante dans la maison",'bleu',[
 ['🧸',"Les enfants ont besoin de repères","Une personne calme et régulière à la maison aide les enfants à se sentir en sécurité."],
 ['🕊️',"Parler doucement","Une voix douce et des règles claires font souvent plus que les cris."],
 ['🔁',"La régularité","Mêmes heures de repas, de sieste et de jeux : les enfants aiment savoir ce qui vient après."],
 ['🏠',"Toute la maison en profite","Quand l'ambiance est calme, le ménage et la cuisine se font aussi plus facilement."]
],"Vous êtes calme et attentionnée ? Des familles vous cherchent.");

E('maison-vivante',"Une maison vivante a besoin d'une personne fiable",'terre',[
 ['⏳',"Vous manquez de temps","Travail, déplacements, études : à la maison, il y a toujours quelque chose à faire."],
 ['🧑‍🤝‍🧑',"Une personne de confiance","La bonne personne apporte de l'ordre, de la douceur et du temps libre pour votre famille."],
 ['🔎',"Nous cherchons le bon profil","Nous tenons compte de vos priorités : enfants, cuisine, propreté, horaires, logement."],
 ['📈',"Un recrutement mieux préparé","Un besoin bien expliqué conduit à un meilleur choix, pour vous et pour l'employée."]
],"Parlez-nous de votre maison : nous cherchons la personne qui lui convient.");

C('apprendre-sur-le-tas',"Apprendre tout en travaillant",'violet',[
 ['🛠️',"On apprend par la pratique","La plupart des gestes de la maison s'apprennent en les faisant, avec de l'attention."],
 ['👂',"Écouter les consignes","Chaque famille a sa manière de faire. Écoutez, demandez et notez si besoin."],
 ['🔁',"Répéter pour progresser","Un geste répété devient une habitude, puis une compétence."],
 ['🌟',"Chaque jour compte","Même si vous débutez, chaque journée de travail vous rend plus solide."]
],"Débutante ou expérimentée, il y a une place pour vous. Contactez-nous.");

C('ne-pas-comparer',"Ne vous comparez pas, avancez à votre rythme",'nuit',[
 ['🛤️',"Chaque parcours est différent","Certaines ont plus d'expérience, d'autres débutent : chacune a sa route."],
 ['🌼',"Vos qualités sont uniques","Votre douceur, votre rapidité ou votre cuisine peuvent faire la différence."],
 ['🏆',"Fixez de petits objectifs","Apprendre une nouvelle recette, améliorer le rangement : chaque progrès compte."],
 ['💬',"Parlez de vos envies","Dites à l'agence ce que vous voulez faire et ce que vous voulez apprendre."]
],"Venez comme vous êtes, nous cherchons avec vous la bonne place.");

C('meme-respect-tous',"Le même respect pour tous les métiers",'or',[
 ['⚖️',"Tous les métiers comptent","Médecin, commerçant, chauffeur, nounou : chaque métier fait avancer la société."],
 ['🪞',"Le respect se mérite et se donne","On respecte quelqu'un pour son sérieux, pas pour son titre."],
 ['🏡',"À la maison aussi","Le travail de la maison mérite la même considération que tout autre travail."],
 ['📢',"Moi, SHAMAN CHOOZ, je le dis","Respecter celle qui tient votre maison, c'est respecter votre famille."]
],"Rejoignez une agence qui respecte les métiers de la maison.");

C('metier-monde',"Partout dans le monde, des maisons ont besoin de vous",'turquoise',[
 ['🗺️',"Un besoin universel","Dans tous les pays, il y a des familles qui cherchent de l'aide pour la maison."],
 ['✈️',"Des opportunités possibles","Notre agence peut mettre en relation employeurs et employés dans de nombreux pays."],
 ['📜',"Dans le respect des lois","Pour travailler à l'étranger, il faut respecter les lois et les papiers de chaque pays."],
 ['🛡️',"Prudence avant tout","Ne payez jamais pour une promesse floue. Posez toujours des questions."]
],"Un projet de travail ? Parlons-en sérieusement avec notre agence.");

C('oser-formation',"Oser apprendre pour mieux travailler",'orange',[
 ['🎒',"Se former","Un cours de cuisine, de premiers gestes pour les bébés ou de nettoyage peut vous ouvrir plus de portes."],
 ['📖',"Lire et comprendre","Savoir lire les étiquettes des produits et les consignes protège votre santé et vos affaires."],
 ['🤗',"S'inspirer des plus anciennes","Beaucoup de personnes expérimentées donnent d'excellents conseils."],
 ['💪',"Un atout en plus","Chaque compétence apprise est un point fort de plus dans votre dossier."]
],"Dites-nous ce que vous aimeriez apprendre. Nous vous écoutons.");

C('confiance-commence',"La confiance commence par l'honnêteté",'vert',[
 ['🔑',"On vous confie une maison","Entrer dans la maison de quelqu'un est un acte de confiance."],
 ['🤐',"Garder la discrétion","Ce qui se passe dans la maison reste dans la maison."],
 ['🧾',"Dire la vérité","Un objet cassé ? Un oubli ? Il vaut mieux le dire tout de suite."],
 ['🌟',"Une réputation solide","Avec le temps, votre sérieux devient votre meilleure recommandation."]
],"Vous êtes honnête et sérieuse ? Notre agence a besoin de vous connaître.");

E('parole-donnee',"Tenir sa parole : un principe des deux côtés",'bleu',[
 ['🗣️',"La parole compte","Ce qui est promis doit être tenu : horaires, tâches, repos, paiement."],
 ['📝',"Écrire, c'est protéger","Un accord clair, écrit et compris par tous évite beaucoup de conflits."],
 ['🤝',"Respect des deux côtés","L'employeur respecte l'employée, l'employée respecte la maison : c'est ainsi que ça marche."],
 ['📞',"Nous restons disponibles","En cas de question, l'agence peut vous aider à clarifier les choses."]
],"Bâtissons une relation de confiance dès le début. Contactez-nous.");

E('simplicite-recrutement',"Recruter simplement, sans vous compliquer la vie",'or',[
 ['1️⃣',"Vous expliquez","Dites-nous qui vous cherchez et ce que vous attendez."],
 ['2️⃣',"Nous cherchons","Nous étudions les candidatures et préparons les rencontres."],
 ['3️⃣',"Vous rencontrez","Vous échangez avec les personnes présentées et vous choisissez."],
 ['4️⃣',"Vous démarrez","Vous précisez ensemble le cadre de travail et la mission commence."]
],"Quatre étapes simples. Appelez-nous pour la première.");

E('chaque-famille-differente',"Chaque famille est différente, nous écoutons la vôtre",'rose',[
 ['👨‍👩‍👧‍👦',"Votre famille d'abord","Petite ou grande, avec ou sans bébé, en ville ou en résidence : votre situation est unique."],
 ['🎯',"Des besoins précis","Plutôt ménage, plutôt enfants, plutôt cuisine, ou les trois : nous adaptons la recherche."],
 ['🏘️',"Un profil adapté","Logée ou non, temps plein ou partiel : nous cherchons selon vos conditions."],
 ['🤲',"À votre écoute","Votre avis compte à chaque étape."]
],"Racontez-nous votre situation, nous cherchons la bonne personne.");

C('chaque-candidate-unique',"Chaque candidate est unique, nous vous écoutons",'violet',[
 ['🌸',"Votre histoire compte","Votre parcours, vos envies et vos contraintes comptent pour trouver une bonne place."],
 ['🗓️',"Vos disponibilités","Nous notons vos horaires possibles et le type de poste que vous recherchez."],
 ['🏠',"Logée ou non","Dites-nous si vous cherchez un poste avec ou sans logement."],
 ['🤝',"Un bon accord","Notre but est que votre travail se passe bien, pour vous et pour la famille."]
],"Présentez-vous à notre agence, nous vous accueillons avec respect.");

C('patience-recherche',"Un bon placement demande un peu de patience",'terre',[
 ['⏳',"Prendre le temps","Trouver la bonne famille, comme la bonne employée, ne se fait pas toujours en une journée."],
 ['🔍',"Bien choisir","Un choix réfléchi évite les départs rapides et les déceptions."],
 ['📱',"Restez joignable","Gardez votre téléphone chargé et répondez quand l'agence vous appelle."],
 ['🌱',"La patience paie","Les bons placements viennent souvent à ceux qui restent sérieux et disponibles."]
],"Inscrivez-vous maintenant et restez joignable : nous vous appelons.");

C('pas-attendre-chance',"N'attendez pas la chance, allez la chercher",'orange',[
 ['🚪',"Frapper à la bonne porte","Les opportunités arrivent plus souvent quand on fait le premier pas."],
 ['📞',"Un simple appel","Une démarche simple peut changer votre situation."],
 ['🧳',"Préparez-vous","Pensez à vos pièces, à vos références et à vos disponibilités."],
 ['✨',"Croyez en vous","Vous avez déjà des compétences : les familles ont besoin d'elles."]
],"Ne restez pas chez vous à attendre. Appelez notre agence aujourd'hui.");

C('fiere-pas-seule',"Fière de votre métier, jamais seule",'nuit',[
 ['👭',"Beaucoup font ce métier","Des milliers de femmes et d'hommes travaillent dans les maisons du monde entier."],
 ['🗨️',"Parlez de vos difficultés","Un souci au travail ? Ne le gardez pas pour vous, parlez à une personne de confiance."],
 ['🧑‍🏫',"Demandez conseil","Une question sur vos droits, vos horaires ou votre salaire est légitime."],
 ['🤲',"Nous restons à l'écoute","L'agence peut vous aider à clarifier une situation."]
],"Vous n'êtes pas seule. Nous sommes là pour vous accompagner.");

E('employeurs-justes',"Merci aux employeurs justes et respectueux",'or',[
 ['🙌',"Un exemple à suivre","Payer à l'heure, respecter les repos et parler poliment : voilà un bon employeur."],
 ['💬',"Bien communiquer","Expliquer calmement ce que l'on attend aide l'employée à bien travailler."],
 ['🎁',"Valoriser le travail","Un remerciement, un petit geste ou un encouragement donnent envie de bien faire."],
 ['🔁',"Une relation durable","Une employée respectée reste souvent plus longtemps et travaille avec plus de cœur."]
],"Recrutez avec nous et bâtissez une relation durable.");

E('equite-sens',"L'équité : une bonne base pour la maison",'turquoise',[
 ['⚖️',"Ce qui est juste","Le salaire, les horaires et les repos doivent correspondre au travail demandé."],
 ['📏',"Des tâches raisonnables","Demander ménage, enfants et cuisine à la fois est possible si on le précise et qu'on organise bien."],
 ['🛏️',"Du repos","Une personne reposée travaille mieux et reste plus attentive."],
 ['🤝',"Discuter ensemble","Si la charge est trop lourde, on en parle et on ajuste."]
],"Nous vous aidons à fixer un cadre équilibré. Appelez-nous.");

C('bonne-ambiance',"Une bonne ambiance, une maison qui respire",'rose',[
 ['😊',"Le sourire","Un bonjour sincère change l'humeur de toute la maison."],
 ['🎶',"Travailler avec joie","Une chanson douce, un mot gentil : l'ambiance influence le travail."],
 ['🕊️',"Éviter les conflits","Quand un désaccord arrive, parlez calmement et sans élever la voix."],
 ['🏠',"Un foyer apaisé","Là où règne le respect, tout le monde est plus à l'aise, y compris les enfants."]
],"Vous apportez de la bonne humeur ? Les familles vous cherchent.");

C('transmettre-valeurs',"Transmettre de bonnes valeurs aux enfants",'bleu',[
 ['📖',"Les enfants imitent","Ils regardent comment on parle, comment on range, comment on respecte les autres."],
 ['🧹',"Apprendre à ranger","Un enfant qui range son coin apprend déjà l'ordre et la responsabilité."],
 ['🙏',"Dire merci, s'il vous plaît","Les mots polis s'apprennent par l'exemple, chaque jour."],
 ['🏡',"Un même foyer","Ménage, enfants et cuisine se rejoignent pour construire un foyer solide."]
],"Aidez les familles à élever leurs enfants. Rejoignez-nous.");

C('gestes-anciens',"Les gestes appris des anciennes valent de l'or",'terre',[
 ['👵',"Un savoir précieux","Beaucoup de bons gestes viennent de nos mères et de nos grands-mères."],
 ['🍲',"Des recettes qui durent","Les plats de famille et les astuces de cuisine passent de génération en génération."],
 ['🧺',"Des astuces simples","Plier le linge, conserver les aliments, entretenir la maison : tout cela est un vrai savoir-faire."],
 ['📣',"Valorisez-les","Dites-nous vos astuces : elles intéressent les familles."]
],"Votre expérience est une richesse. Faites-la connaître par notre agence.");

C('avenir-metier',"L'avenir du métier de la maison",'violet',[
 ['🔮',"Un besoin qui reste","Les familles ont toujours besoin de personnes fiables pour la maison et les enfants."],
 ['📱',"Des outils modernes","Le téléphone et les réseaux permettent de présenter plus facilement les candidatures."],
 ['🎓',"Plus de reconnaissance","Quand on se forme et qu'on s'organise, le métier est mieux considéré."],
 ['🚀',"Soyez actrice du changement","Un travail bien fait ouvre la voie à de meilleures conditions."]
],"Faites partie de l'avenir du métier. Inscrivez-vous.");

C('un-appel-change',"Un simple appel peut tout changer",'or',[
 ['📞',"Un geste facile","Appeler notre agence ne coûte qu'un peu de temps et de courage."],
 ['🗣️',"Parlez simplement","Dites qui vous êtes, où vous habitez et ce que vous cherchez."],
 ['📅',"Un rendez-vous","Nous fixons un moment pour vous recevoir et prendre vos informations."],
 ['🌈',"Une nouvelle étape","Cet appel peut être le début d'un nouveau travail."]
],"Prenez votre téléphone et appelez-nous maintenant.");

E('ensemble-reussir',"Ensemble, réussissons un bon placement",'vert',[
 ['🎯',"Un objectif commun","Une famille satisfaite et une employée épanouie : voilà notre réussite."],
 ['🧑‍🤝‍🧑',"Chacun fait sa part","L'employeur est clair, l'employée est sérieuse, l'agence accompagne."],
 ['📋',"Un suivi si besoin","Si une difficulté apparaît, nous pouvons aider à trouver une solution."],
 ['🌟',"Un résultat durable","Une relation de travail bien démarrée a plus de chances de durer."]
],"Travaillons ensemble. Contactez notre agence dès aujourd'hui.");

C('cap-sur-demain',"Cap sur demain avec SHAMAN CHOOZ",'nuit',[
 ['🧭',"Un nouveau départ","Chaque jour est une occasion de recommencer et d'avancer."],
 ['🏠',"Une place vous attend","Quelque part, une famille cherche exactement quelqu'un comme vous."],
 ['🎙️',"Mon message","Moi, SHAMAN CHOOZ, je dis : faire le ménage, s'occuper des enfants et cuisiner, c'est un même travail à valoriser."],
 ['✨',"À vous de jouer","Prenez contact avec nous : ensemble, nous allons trouver votre place."]
],"Rejoignez la grande famille de notre agence.");
})();

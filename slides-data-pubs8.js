/* ==========================================================
   PUBS 8/10 — NOUNOU & ENFANTS (40 nouveaux diaporamas pubs avec ta photo)
   Le métier de nounou par âge et par étape : bébé, tout-petit, école, jeux, émotions, sécurité, parents.
   Rappel du message de SHAMAN CHOOZ : s'occuper des enfants fait partie du même travail que le ménage et la cuisine.
   Conseils de santé : toujours prudents, avec renvoi vers les parents et le médecin.
   Chaque diaporama = 4 écrans + 1 écran « appel à l'action » ajouté automatiquement, puis la page « Contactez-nous ».
   C(...) = pour les candidat(e)s • E(...) = pour les employeurs / familles
   Les identifiants commencent par « pn- ».
   ========================================================== */
(function(){
if(!window.SCCS) return;
let k = 1;
const PC = ["Postulez dès aujourd'hui","Inscrivez-vous maintenant","Votre place vous attend","Appelez-nous","Faites le premier pas"];
const PE = ["Parlons de votre besoin","Confiez-nous votre recherche","Contactez-nous","Un appel suffit","Recrutons ensemble"];
const C = (id,t,p,sl,cta)=> SCCS.add('pn-'+id, t, 'Agence', p, sl.concat([['📞', PC[k++ % PC.length], cta]]), { photo:true });
const E = (id,t,p,sl,cta)=> SCCS.add('pn-'+id, t, 'Agence', p, sl.concat([['📞', PE[k++ % PE.length], cta]]), { photo:true });

/* ---------- Bébés ---------- */
C('nouveau-ne',"Prendre soin d'un nouveau-né : les bases",'rose',[
 ['👶',"Un tout petit être fragile","Un nouveau-né a besoin de douceur, de calme et d'attention constante."],
 ['🤲',"Soutenir la tête","Tenez toujours sa tête et son cou quand vous le portez."],
 ['🧼',"Hygiène avant tout","Lavez-vous les mains avant de le toucher, et gardez son environnement propre."],
 ['📞',"Suivre les consignes","Les parents et le médecin donnent les règles : une nounou les applique et pose des questions."]
],"Vous aimez les tout-petits ? Les familles ont besoin de vous.");

C('pleurs-bebe',"Pourquoi bébé pleure-t-il ?",'bleu',[
 ['😢',"Pleurer, c'est parler","Un bébé pleure parce qu'il a faim, sommeil, froid, chaud ou besoin de réconfort."],
 ['🔍',"Chercher la cause","Vérifiez le biberon, la couche, la température et le confort."],
 ['🫂',"Rassurer","Une voix douce, un câlin et un peu de calme aident beaucoup."],
 ['🩺',"En cas de doute","Si l'enfant semble malade ou si les pleurs ne s'arrêtent pas, prévenez les parents tout de suite."]
],"Patiente et attentive ? Rejoignez notre agence.");

C('sommeil-bebe',"Un sommeil sûr pour bébé",'nuit',[
 ['🌙',"Un espace calme","Une chambre aérée, une température agréable et peu de bruit aident le bébé à dormir."],
 ['🛏️',"Un lit simple et sûr","Suivez les consignes des parents et du médecin pour la position et la literie."],
 ['👀',"Rester attentive","Vérifiez régulièrement que l'enfant dort bien."],
 ['🔁',"Des habitudes régulières","Mêmes horaires et mêmes gestes rassurent les petits."]
],"Votre vigilance est précieuse. Inscrivez-vous chez nous.");

C('premiers-aliments',"Les premiers aliments de bébé",'orange',[
 ['🥣',"Un pas après l'autre","Les nouveaux aliments se donnent selon l'avis des parents et du médecin."],
 ['🍌',"Un aliment à la fois","On observe comment l'enfant réagit avant d'en essayer un autre."],
 ['🧼',"Hygiène stricte","Mains, ustensiles et bols doivent être bien propres."],
 ['🧩',"Cuisine et enfants","Ici, la cuisine et l'enfant sont une seule mission : preuve que tout est un même métier."]
],"Vous savez préparer à manger pour les petits ? Faites-le savoir.");

C('portage-securite',"Porter et poser un bébé en sécurité",'turquoise',[
 ['🤱',"Un geste maîtrisé","Portez toujours l'enfant avec fermeté et douceur."],
 ['🚫',"Jamais seul en hauteur","Ne laissez jamais un bébé seul sur un lit, un canapé ou une table."],
 ['🪑',"Les sièges et les poussettes","Attachez-le toujours, même pour quelques minutes."],
 ['📣',"Concentration","Évitez le téléphone quand vous le portez ou quand vous le nourrissez."]
],"Des mains sûres, un grand cœur. Rejoignez-nous.");

C('changer-couche',"Changer une couche proprement",'vert',[
 ['🧷',"Tout préparer d'abord","Couche propre, lingettes ou eau, serviette : tout doit être à portée de main."],
 ['🧼',"Nettoyer doucement","De l'avant vers l'arrière, avec douceur et sans frotter."],
 ['🤲',"Garder une main sur l'enfant","Ne le quittez jamais des yeux ni des mains sur la table."],
 ['🙌',"Se laver les mains","Toujours, après chaque change."]
],"Vous connaissez les gestes essentiels ? Venez nous voir.");

/* ---------- Tout-petits ---------- */
C('premiers-pas',"Accompagner les premiers pas",'or',[
 ['👣',"Un grand moment","Le premier pas est une étape magique pour l'enfant et pour la famille."],
 ['🏠',"Sécuriser l'espace","Retirez les objets dangereux, protégez les coins et les escaliers."],
 ['👏',"Encourager sans forcer","Chaque enfant avance à son rythme : félicitez, ne comparez pas."],
 ['📱',"Prévenir les parents","Les parents aiment savoir quand leur enfant fait un nouveau progrès."]
],"Vous aimez accompagner les progrès des petits ? Inscrivez-vous.");

C('premiers-mots',"Aider l'enfant à parler",'violet',[
 ['🗣️',"Parler beaucoup","Racontez ce que vous faites : « Je lave la tasse, tu veux de l'eau ? »"],
 ['📖',"Chanter et raconter","Comptines et histoires enrichissent le vocabulaire."],
 ['👂',"Écouter","Laissez l'enfant s'exprimer, même avec des mots imparfaits."],
 ['🌍',"Plusieurs langues","Parler la langue de la maison et une autre est un vrai avantage."]
],"Vous aimez raconter des histoires ? Les enfants vous attendent.");

C('proprete-enfant',"Apprendre la propreté avec patience",'turquoise',[
 ['🚽',"Chaque enfant son rythme","Il n'y a pas d'âge parfait : l'enfant doit être prêt."],
 ['🧸',"Dédramatiser","Un accident n'est pas une faute : restez calme et rassurante."],
 ['🏅',"Féliciter","Un sourire et un encouragement donnent confiance."],
 ['👪',"Suivre la méthode des parents","Pour que l'enfant ne soit pas perdu, suivez la méthode choisie par la famille."]
],"Patience et douceur : deux grandes qualités. Rejoignez-nous.");

C('repas-tout-petit',"Les repas des tout-petits",'orange',[
 ['🍽️',"Manger assis","L'enfant mange mieux à table, sans courir ni jouer."],
 ['🍲',"Petits morceaux","Coupez les aliments pour éviter qu'il s'étouffe."],
 ['🥤',"Boire de l'eau","Proposez de l'eau propre aux heures utiles."],
 ['😊',"Un moment agréable","Parlez, souriez, évitez les cris : le repas doit rester un bon moment."]
],"Cuisine et enfants vont ensemble. Découvrez nos offres.");

C('peur-noir',"Quand l'enfant a peur",'nuit',[
 ['🌑',"La peur est normale","Beaucoup d'enfants ont peur du noir, des bruits ou d'être seuls."],
 ['💡',"Rassurer simplement","Une petite lumière, une voix douce et une présence suffisent souvent."],
 ['🙅',"Ne pas se moquer","Se moquer d'une peur la rend plus forte."],
 ['📢',"En parler aux parents","Ils peuvent aussi vous donner des conseils."]
],"L'écoute des enfants, c'est un talent. Faites-vous connaître.");

C('colere-enfant',"Gérer la colère d'un enfant",'rouge',[
 ['😡',"Une colère, ça passe","Les enfants apprennent à gérer ce qu'ils ressentent : ils ont besoin d'aide."],
 ['🧘',"Rester calme","Baissez la voix, respirez, et ne criez pas."],
 ['🗣️',"Mettre des mots","« Je vois que tu es en colère. Dis-moi ce qui se passe. »"],
 ['🏠',"Même ligne que les parents","Appliquez les règles de la maison pour que l'enfant ait des repères clairs."]
],"Un cœur patient fait toute la différence. Inscrivez-vous.");

C('partage-disputes',"Quand les enfants se disputent",'terre',[
 ['👧👦',"Frères et sœurs","Les disputes entre enfants sont courantes et font partie de l'apprentissage."],
 ['⚖️',"Écouter les deux","Laissez chacun raconter, sans prendre parti trop vite."],
 ['🤝',"Réparer","Apprenez-leur à s'excuser et à faire la paix."],
 ['🚨',"Si c'est dangereux","Séparez-les et prévenez les parents si besoin."]
],"Vous gardez votre calme face aux enfants ? Contactez-nous.");

/* ---------- Jeux, éveil, école ---------- */
C('jeux-interieur',"Jeux à l'intérieur quand il pleut",'bleu',[
 ['🏠',"La pluie n'arrête pas le plaisir","Cache-cache, mimes, construction avec des coussins : on s'amuse sans rien acheter."],
 ['🎭',"Faire semblant","Jouer à la dînette ou au marché développe l'imagination."],
 ['🧩',"Puzzles et dessins","Calmes, ils apprennent la concentration."],
 ['🧹',"Ranger ensemble","Finir le jeu en rangeant apprend l'ordre."]
],"Créative et pleine d'idées ? Les familles vous cherchent.");

C('jeux-exterieur',"Jeux dehors : bouger en sécurité",'vert',[
 ['⚽',"Courir et sauter","Les enfants ont besoin de dépenser leur énergie."],
 ['🌤️',"Éviter les heures chaudes","Préférez le début ou la fin de journée, avec de l'eau à portée."],
 ['👀',"Ne jamais quitter des yeux","Les accidents sont rapides, surtout près de la route ou de l'eau."],
 ['🧴',"Protéger du soleil","Chapeau, ombre, eau propre : de bons réflexes."]
],"Dynamique et attentive ? Inscrivez-vous.");

C('histoires-soir',"L'heure de l'histoire",'violet',[
 ['📚',"Un rituel qui rassure","Une histoire avant de dormir apaise les enfants."],
 ['🎙️',"Donner de la voix","Changez de ton pour chaque personnage : les enfants adorent."],
 ['🌍',"Des contes de chez nous","Raconter les histoires de votre culture transmet un trésor."],
 ['😴',"Finir doucement","Terminez dans le calme pour préparer le sommeil."]
],"Vous racontez bien ? Des enfants vous attendent.");

C('chansons-comptines',"Chanter avec les enfants",'rose',[
 ['🎵',"La musique réjouit","Une chanson simple change l'ambiance en quelques secondes."],
 ['👐',"Les gestes","Chanter en faisant des gestes aide l'enfant à retenir."],
 ['🧠',"Un outil d'apprentissage","Les comptines enseignent les chiffres, les couleurs et les parties du corps."],
 ['🧩',"Même au ménage","Chanter en rangeant ou en cuisinant rend tout plus joyeux."]
],"La musique dans la maison, c'est un plus. Rejoignez-nous.");

C('devoirs-methode',"Aider aux devoirs avec méthode",'or',[
 ['📘',"Un coin calme","Une table, de la lumière et pas de télévision."],
 ['⏰',"Commencer tôt","Après le goûter, avant la fatigue du soir."],
 ['🧠',"Expliquer sans faire à la place","Guidez l'enfant, laissez-le chercher."],
 ['📣',"Informer les parents","Signalez les difficultés ou les leçons à revoir."]
],"Vous savez accompagner les enfants dans leurs études ? Contactez-nous.");

C('chemin-ecole',"Le chemin de l'école en sécurité",'orange',[
 ['🎒',"Tout préparer la veille","Cartable, uniforme, repas : le matin se passe plus calmement."],
 ['🚸',"Regarder avant de traverser","Tenez la main des petits et montrez le bon exemple."],
 ['⏱️',"Arriver à l'heure","Partez un peu plus tôt pour éviter de courir."],
 ['🤝',"Respecter les consignes de l'école","Qui peut récupérer l'enfant ? Quelles heures ? Les parents précisent tout."]
],"Ponctuelle et vigilante ? Les familles ont besoin de vous.");

C('gouter-sain',"Un goûter sain et simple",'turquoise',[
 ['🍎',"Des fruits de saison","Ils sont bons, peu chers et pleins de vitamines."],
 ['🥖',"Du pain, de la banane, des cacahuètes","Selon les habitudes de la famille et sans allergie connue."],
 ['🚰',"De l'eau d'abord","Limitez les boissons très sucrées."],
 ['🧼',"Mains propres","Toujours avant de manger."]
],"Vous préparez de bons goûters ? Rejoignez notre agence.");

C('ecrans-limite',"Les écrans : où mettre la limite ?",'nuit',[
 ['📺',"Pas trop longtemps","Trop d'écran fatigue les yeux et empêche de jouer ou de dormir."],
 ['👪',"Suivre les règles de la famille","Chaque famille décide du temps et du contenu."],
 ['🎨',"Proposer autre chose","Dessin, jeu, promenade : il y a beaucoup d'alternatives."],
 ['🌙',"Pas avant de dormir","Un temps calme sans écran aide à mieux s'endormir."]
],"Vous savez occuper les enfants autrement ? Inscrivez-vous.");

C('sorties-parc',"Sorties au parc : les bons réflexes",'vert',[
 ['🌳',"Préparer","Eau, chapeau, change, petit goûter : le sac est prêt."],
 ['👀',"Rester proche","Un enfant peut disparaître en quelques secondes dans un lieu public."],
 ['👐',"Respecter les autres","Attendre son tour et partager les jeux se pratique au parc."],
 ['✅',"Demander l'autorisation","Prévenez les parents si vous sortez avec l'enfant."]
],"Responsable et attentive ? Nous avons des familles pour vous.");

C('transport-enfant',"Déplacer un enfant : taxi, bus, voiture",'bleu',[
 ['🚗',"Le trajet demande de la vigilance","Gardez l'enfant à vos côtés et attachez-le si possible."],
 ['🧳',"Prendre l'essentiel","Eau, couches, vêtement de rechange, numéro des parents."],
 ['🚫',"Pas de risque","Jamais seul dans un véhicule, même quelques instants."],
 ['📞',"Garder le contact","Prévenez les parents de l'arrivée ou d'un retard."]
],"Fiable et prudente ? Nous cherchons des personnes comme vous.");

/* ---------- Relation avec les enfants ---------- */
C('gouter-reconfort',"Rassurer un enfant triste",'rose',[
 ['😔',"Un chagrin compte","Même pour une petite chose, la tristesse d'un enfant est réelle."],
 ['🫂',"Être présente","Un câlin, une écoute, un peu de temps."],
 ['🗣️',"Mettre des mots","Aidez-le à dire ce qu'il ressent."],
 ['📣',"En parler aux parents","Si le chagrin dure, informez-les avec délicatesse."]
],"Votre douceur compte. Rejoignez notre agence.");

C('poser-limites',"Poser des limites avec bienveillance",'terre',[
 ['🚧',"Les règles sécurisent","Un enfant sait mieux se comporter quand les règles sont claires."],
 ['🗣️',"Expliquer pourquoi","Une règle comprise est mieux respectée."],
 ['🔁',"Rester cohérente","Ne changez pas de règle selon l'humeur."],
 ['🏠',"Même cadre à la maison","Suivez la ligne des parents pour éviter les confusions."]
],"Un cadre ferme et doux : un atout de nounou. Inscrivez-vous.");

C('felicitations-enfants',"Encourager un enfant sans exagérer",'or',[
 ['🌟',"Remarquer l'effort","« Tu as essayé, bravo ! » vaut mieux que « tu es le meilleur ! »"],
 ['🎯',"Des compliments précis","Dites ce qui est bien : « J'aime comment tu as rangé tes jouets. »"],
 ['🌱',"La confiance grandit","Un enfant encouragé ose davantage."],
 ['🚫',"Sans comparer","Chaque enfant a son rythme."]
],"Vous savez motiver les enfants ? Contactez-nous.");

C('autonomie-enfant',"Apprendre l'autonomie aux enfants",'turquoise',[
 ['🧦',"S'habiller seul","On commence par les gestes simples, avec patience."],
 ['🍽️',"Mettre la table","Un petit rôle à chaque repas donne confiance."],
 ['🧺',"Ranger ses affaires","Le ménage et l'enfant se rejoignent ici."],
 ['🌟',"Fierté","L'enfant est fier de dire « je l'ai fait tout seul »."]
],"Vous aimez aider les enfants à grandir ? Venez nous voir.");

C('politesse-enfants',"Enseigner la politesse",'violet',[
 ['🙏',"Merci, s'il vous plaît","Ces mots s'apprennent par l'exemple, chaque jour."],
 ['👋',"Dire bonjour","Saluer les adultes avec respect fait partie de l'éducation."],
 ['👂',"Écouter les autres","Ne pas couper la parole se travaille petit à petit."],
 ['🏡',"Un foyer agréable","La politesse rend toute la maison plus douce."]
],"Votre exemple éduque les enfants. Rejoignez notre agence.");

C('enfants-differents',"Chaque enfant est différent",'bleu',[
 ['🎈',"Un caractère à découvrir","Certains sont calmes, d'autres très actifs : chacun a sa personnalité."],
 ['👀',"Observer","Notez ce qu'il aime, ce qui le fatigue et ce qui le rassure."],
 ['🤲',"S'adapter","Vous n'agissez pas de la même façon avec un enfant timide et un enfant énergique."],
 ['🗣️',"Partager avec les parents","Vos observations les aident beaucoup."]
],"Observatrice et attentive ? Les familles vous attendent.");

/* ---------- Sécurité et santé (prudence) ---------- */
C('securite-maison-petits',"Une maison sûre pour les petits",'rouge',[
 ['⚠️',"Les dangers cachés","Produits ménagers, médicaments, prises, escaliers, objets pointus."],
 ['🔒',"Mettre hors de portée","Rangez ce qui est dangereux en hauteur ou sous clé."],
 ['🍳',"Casseroles et plaques","Tournez les manches vers l'intérieur et ne laissez jamais un enfant seul en cuisine."],
 ['🚫',"Aucun risque","Quand on est responsable d'un enfant, on anticipe toujours."]
],"La sécurité des enfants est notre priorité commune. Rejoignez-nous.");

C('medicaments-regle',"Médicaments : une règle d'or",'rouge',[
 ['💊',"Jamais sans accord","Ne donnez jamais un médicament à un enfant sans l'accord des parents ou du médecin."],
 ['📝',"Suivre l'ordonnance","Dose, horaires, durée : respectez exactement les indications."],
 ['🔒',"Hors de portée","Rangez toujours les médicaments en hauteur, bien fermés."],
 ['📞',"Au moindre doute","Appelez les parents ou le médecin."]
],"Sérieuse et prudente : un vrai atout. Inscrivez-vous.");

C('enfant-malade',"Quand l'enfant n'est pas bien",'turquoise',[
 ['🌡️',"Observer les signes","Fatigue, fièvre, vomissements, refus de manger : notez ce que vous voyez."],
 ['📞',"Prévenir tout de suite","Informez les parents sans attendre."],
 ['🏥',"Urgence","En cas de gravité, appelez les secours et les parents."],
 ['🛌',"Rester auprès de lui","Votre présence calme l'enfant en attendant les consignes."]
],"Vous gardez la tête froide ? Rejoignez-nous.");

C('eau-securite',"L'eau : un danger à ne pas sous-estimer",'bleu',[
 ['🪣',"Seaux et bassines","Un enfant peut se noyer dans très peu d'eau."],
 ['🏊',"Pas de baignade sans adulte","Surveillance directe, sans téléphone ni distraction."],
 ['🚿',"Le bain","Ne quittez jamais un enfant dans le bain, même une seconde."],
 ['🚧',"Éloigner les enfants","Fermez l'accès aux puits, piscines et réservoirs."]
],"La vigilance sauve des vies. Rejoignez notre agence.");

C('mains-hygiene-enfants',"L'hygiène des enfants au quotidien",'vert',[
 ['🧼',"Les mains","Avant de manger, après les toilettes, après avoir joué dehors."],
 ['🦷',"Les dents","Brossez-les matin et soir si les parents l'ont demandé."],
 ['🛁',"Toilette régulière","Eau propre et douce, selon l'âge et le climat."],
 ['👕',"Vêtements propres","Changez un enfant mouillé ou sale rapidement."]
],"L'hygiène, c'est votre priorité ? Parlez-en à notre agence.");

/* ---------- Parents et nounou ---------- */
E('trouver-nounou',"Trouver la nounou idéale",'or',[
 ['🔍',"Définir vos besoins","Âge des enfants, horaires, présence ou non le soir : soyez précis."],
 ['💬',"Rencontrer","Observez comment la personne parle aux enfants et à vous."],
 ['📋',"Poser des questions","Expérience, gestes de premiers secours, habitudes de vie."],
 ['🤝',"Un essai","Une période d'essai permet de vérifier que tout se passe bien."]
],"Nous vous aidons à trouver la nounou qui vous convient. Contactez-nous.");

E('premier-jour-nounou-parents',"Le premier jour avec la nounou : préparer les parents",'violet',[
 ['📝',"Écrire les consignes","Repas, siestes, médicaments, numéros utiles."],
 ['🧸',"Présenter l'enfant","Ses habitudes, ses peurs, ses objets de réconfort."],
 ['⏱️',"Prévoir un temps ensemble","Restez un peu pour que l'enfant s'habitue."],
 ['📱',"Rester joignable","Donnez les numéros pour toute question."]
],"Préparez bien l'arrivée de la nounou. Parlons de votre besoin.");

E('nounou-ou-creche',"Nounou à domicile : ses avantages",'rose',[
 ['🏠',"À la maison","L'enfant reste dans son cadre habituel, avec ses repères."],
 ['⏰',"Des horaires adaptés","Plus de souplesse pour les parents qui travaillent."],
 ['👀',"Une attention personnalisée","La nounou se consacre à un ou quelques enfants."],
 ['🧩',"Un plus pour la maison","Selon l'accord, elle peut aussi aider pour le ménage et la cuisine, un même métier selon SHAMAN CHOOZ."]
],"Une nounou pour votre foyer ? Appelez-nous.");

C('nounou-ado',"S'occuper des plus grands et des ados",'nuit',[
 ['🧑‍🎓',"Un autre type de présence","Les ados ont besoin de repères et de respect, pas de surveillance excessive."],
 ['🗣️',"Écouter sans juger","Un adulte de confiance est précieux à cet âge."],
 ['📚',"Rythme de l'école","Aide aux devoirs, repas à l'heure, couchers raisonnables."],
 ['📞',"Informer les parents","Signalez ce qui vous inquiète avec tact."]
],"Vous êtes à l'aise avec tous les âges ? Rejoignez notre agence.");

C('nounou-polyvalente-fin',"Nounou, ménage et cuisine : la même mission",'orange',[
 ['🧩',"Un seul métier","SHAMAN CHOOZ le dit : s'occuper des enfants, tenir la maison et cuisiner forment un même travail."],
 ['⚖️',"Bien s'organiser","Quand les enfants dorment ou sont à l'école, la maison peut avancer."],
 ['📋',"Les missions précisées","Tout est expliqué au départ : horaires, tâches, priorités."],
 ['🌟',"Un vrai plus","Une personne polyvalente est plus facile à placer et plus appréciée."]
],"Vous êtes polyvalente ? Les familles vous attendent.");

C('vacances-enfants',"Occuper les enfants pendant les vacances",'turquoise',[
 ['🏖️',"Des journées bien remplies","Sans école, les enfants ont besoin d'un rythme et d'activités."],
 ['🗓️',"Un petit programme","Un moment pour jouer, un pour lire, un pour aider à la maison, un pour se reposer."],
 ['🎨',"Créer ensemble","Dessin, pâte à modeler, jeux de société : peu de matériel, beaucoup de plaisir."],
 ['🤝',"Valider avec les parents","Chaque famille a ses règles : demandez ce qui est permis."]
],"Les familles cherchent de l'aide pendant les vacances. Inscrivez-vous.");
})();

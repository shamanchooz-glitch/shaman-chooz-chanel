/* ==========================================================
   DIAPORAMAS « DIVERTISSEMENT & CULTURE » (10) — devinettes, culture ivoirienne et africaine
   Chaque ligne : S(identifiant, titre, palette, [[emoji, titre, texte], …])
   Ces vidéos affichent ta photo (voir « photo » dans agence-config.js).
   Palettes : bleu, vert, orange, violet, rouge, or, rose, turquoise, nuit, terre
   ========================================================== */
(function(){
if(!window.SCCS) return;
const S = (id, t, pal, sl)=> SCCS.add(id, t, 'Divertissement', pal, sl, { photo:true });

S('dv-devinettes3','Devinettes en famille (3)','violet',[
 ['❓',"Première devinette","Qu'est-ce qui est plein de trous mais retient l'eau ?"],
 ['✅',"La réponse","Une éponge !"],
 ['❓',"Deuxième devinette","J'ai des villes mais pas de maisons, des rivières mais pas d'eau. Que suis-je ?"],
 ['✅',"La réponse","Une carte géographique !"],
 ['❓',"Troisième devinette","Qu'est-ce qui t'appartient mais que les autres utilisent plus que toi ?"],
 ['✅',"La réponse","Ton prénom !"],
 ['❓',"Quatrième devinette","Qu'est-ce qui voyage tout autour du monde en restant dans son coin ?"],
 ['✅',"La réponse","Un timbre !"]
]);
S('dv-devinettes4','Devinettes en famille (4)','turquoise',[
 ['❓',"Première devinette","Qu'est-ce qui mouille en séchant ?"],
 ['✅',"La réponse","Une serviette !"],
 ['❓',"Deuxième devinette","Qu'est-ce qui se casse dès qu'on prononce son nom ?"],
 ['✅',"La réponse","Le silence !"],
 ['❓',"Troisième devinette","Qu'est-ce qui grandit quand on lui enlève des choses ?"],
 ['✅',"La réponse","Un trou !"],
 ['❓',"Quatrième devinette","Qu'est-ce qui est toujours devant nous mais qu'on ne peut jamais voir ?"],
 ['✅',"La réponse","L'avenir !"]
]);
S('dv-langues-ci','Les langues de Côte d\'Ivoire','orange',[
 ['🗣️',"Un pays, de nombreuses langues","La Côte d'Ivoire compte plus de soixante langues, parlées par différents peuples."],
 ['🇫🇷',"Le français, langue officielle","Il est utilisé à l'école, dans l'administration et dans les médias."],
 ['🤝',"Le dioula, langue de commerce","Très répandu sur les marchés et dans les échanges, dans le pays et dans la sous-région."],
 ['💬',"Le nouchi","Un argot né à Abidjan, qui mélange le français et des langues locales et qui évolue sans cesse."],
 ['🌍',"Une richesse à préserver","Chaque langue transmet des histoires, des proverbes et une façon de voir le monde."]
]);
S('dv-can','La Coupe d\'Afrique des Nations en 5 faits','vert',[
 ['🏆',"Une compétition née en 1957","La CAN réunit les meilleures sélections africaines de football."],
 ['👑',"L'Égypte, recordwoman","Elle détient le plus grand nombre de titres, avec sept victoires."],
 ['🐘',"Les Éléphants, champions","La Côte d'Ivoire a gagné la CAN en 2015, puis lors de l'édition 2023 qu'elle organisait à domicile."],
 ['🥅',"Des finales à suspense","Certaines finales se jouent aux tirs au but, comme celle de 2015."],
 ['🌍',"Un rendez-vous de joie","Chants, couleurs et ambiance : la CAN rassemble tout un continent."]
]);
S('dv-danses','Rythmes et danses d\'Afrique de l\'Ouest','rose',[
 ['🥁',"Le rythme, cœur de la musique","Percussions et chants portent les fêtes, les cérémonies et les histoires."],
 ['🕺',"Le zouglou","Né sur les campus universitaires d'Abidjan au début des années 1990, il raconte la vie quotidienne avec humour."],
 ['💃',"Le coupé-décalé","Un style de musique et de danse devenu très populaire en Côte d'Ivoire et au-delà."],
 ['👘',"Des traditions variées","Chaque région a ses danses, ses costumes et ses instruments."],
 ['🌍',"Des musiques qui voyagent","Afrobeats, rumba, highlife… les rythmes africains inspirent le monde entier."]
]);
S('dv-jeux-trad','Les jeux traditionnels africains','terre',[
 ['♟️',"L'awalé","Un jeu de stratégie pour deux joueurs : on déplace des graines dans des trous creusés dans une planche."],
 ['🎲',"Réfléchir et anticiper","L'awalé demande de compter, de planifier et de prévoir les coups de l'adversaire."],
 ['🪨',"La marelle et les osselets","Des jeux d'adresse qui se jouent avec des cailloux ou de petits objets."],
 ['🪢',"Corde à sauter et tir à la corde","Ils développent l'endurance, la coordination et l'esprit d'équipe."],
 ['👨‍👩‍👧‍👦',"Jouer ensemble","Ces jeux se transmettent de génération en génération et rapprochent petits et grands."]
]);
S('dv-instruments','Les instruments de musique d\'Afrique','or',[
 ['🥁',"Le djembé","Un tambour en forme de gobelet, joué à mains nues, né en Afrique de l'Ouest."],
 ['🎶',"La kora","Un instrument à cordes muni d'une grande calebasse, joué notamment par les griots."],
 ['🎹',"Le balafon","Un xylophone en bois dont les lames résonnent grâce à des calebasses."],
 ['🗣️',"Le tambour d'aisselle","Appelé tama, il peut « parler » : on change le son en serrant ou en relâchant les cordes."],
 ['🎵',"La sanza","Un petit instrument à lamelles que l'on pince avec les pouces, au son doux et cristallin."]
]);
S('dv-cuisine-ci','Les saveurs de Côte d\'Ivoire','orange',[
 ['🍚',"L'attiéké","Une semoule de manioc fermenté, servie avec du poisson ou du poulet braisé."],
 ['🍌',"L'alloco","De la banane plantain frite, souvent accompagnée d'une sauce pimentée."],
 ['🍗',"Le kédjenou","Un plat de poulet et de légumes mijoté à l'étouffée, dans une marmite fermée."],
 ['🌶️',"Les sauces","Sauce graine, sauce gombo, sauce feuille… chaque famille a ses recettes."],
 ['🤲',"Partager le repas","Manger ensemble est un moment de convivialité et de transmission."]
]);
S('dv-animaux-ci','Animaux de la forêt ivoirienne','vert',[
 ['🌳',"Le parc national de Taï","L'un des derniers grands massifs de forêt tropicale primaire d'Afrique de l'Ouest, classé au patrimoine mondial de l'UNESCO."],
 ['🦛',"L'hippopotame pygmée","Un petit cousin de l'hippopotame, discret, qui vit dans les forêts humides d'Afrique de l'Ouest."],
 ['🐒',"Les chimpanzés","Ils vivent en groupe et utilisent des outils, comme des pierres pour casser des noix."],
 ['🐘',"Les éléphants de forêt","Plus petits que ceux de la savane, ils aident à disperser les graines et à faire pousser la forêt."],
 ['🌍',"Protéger la nature","Préserver les forêts, c'est protéger les animaux, l'eau et notre avenir."]
]);
S('dv-records','Records d\'Afrique','bleu',[
 ['🌊',"Le Nil","Un fleuve très long, souvent cité comme le plus long du monde, qui rejoint la Méditerranée."],
 ['🏜️',"Le Sahara","Le plus grand désert chaud de la planète, presque aussi vaste que les États-Unis."],
 ['⛰️',"Le Kilimandjaro","Son sommet, à environ 5 895 m, est le point culminant de l'Afrique."],
 ['🏞️',"Le lac Victoria","Le plus grand lac d'Afrique, partagé entre l'Ouganda, la Tanzanie et le Kenya."],
 ['👥',"Le Nigeria","Le pays le plus peuplé du continent africain."]
]);
})();

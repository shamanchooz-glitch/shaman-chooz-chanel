/* ==========================================================
   LOT ÉDUCATIF 1 — Géographie (12 jeux) et Sciences (8 jeux)
   Nécessite games-edu-core.js (chargé avant).
   ========================================================== */
(function(){
'use strict';
if(!window.EDU) return;
const G = EDU.G, shuffle = SCCG.util.shuffle;

/* ---------------------------------------------------------- GÉOGRAPHIE */
G('ecapafrique','Capitales d\'Afrique','🌍','Géographie',140,'Retrouve la capitale de 10 pays africains.', EDU.quiz([
 ["Capitale du Sénégal ?","Dakar","Thiès","Saint-Louis","Ziguinchor"],
 ["Capitale du Mali ?","Bamako","Tombouctou","Gao","Ségou"],
 ["Capitale du Burkina Faso ?","Ouagadougou","Bobo-Dioulasso","Koudougou","Banfora"],
 ["Capitale du Ghana ?","Accra","Kumasi","Tamale","Takoradi"],
 ["Capitale du Nigeria ?","Abuja","Lagos","Kano","Ibadan","~Abuja est la capitale depuis 1991. Lagos reste la plus grande ville du pays."],
 ["Capitale du Cameroun ?","Yaoundé","Douala","Garoua","Bafoussam"],
 ["Capitale du Kenya ?","Nairobi","Mombasa","Kisumu","Nakuru"],
 ["Capitale de l'Éthiopie ?","Addis-Abeba","Gondar","Harar","Mekele"],
 ["Capitale de l'Égypte ?","Le Caire","Alexandrie","Louxor","Assouan"],
 ["Capitale du Maroc ?","Rabat","Casablanca","Marrakech","Fès","~Casablanca est la plus grande ville, mais la capitale est Rabat."],
 ["Capitale de la Tanzanie ?","Dodoma","Dar es Salaam","Arusha","Zanzibar","~Dodoma est la capitale officielle ; Dar es Salaam est la plus grande ville."],
 ["Capitale de la RD Congo ?","Kinshasa","Lubumbashi","Goma","Kisangani"],
 ["Capitale du Gabon ?","Libreville","Port-Gentil","Franceville","Lambaréné"],
 ["Capitale de Madagascar ?","Antananarivo","Toamasina","Mahajanga","Fianarantsoa"],
 ["Capitale du Togo ?","Lomé","Kara","Sokodé","Atakpamé"],
 ["Capitale du Bénin ?","Porto-Novo","Cotonou","Parakou","Abomey","~Porto-Novo est la capitale ; Cotonou est la plus grande ville et la capitale économique."],
 ["Capitale de la Tunisie ?","Tunis","Sfax","Sousse","Kairouan"],
 ["Capitale de l'Algérie ?","Alger","Oran","Constantine","Annaba"],
 ["Capitale du Rwanda ?","Kigali","Butare","Gisenyi","Ruhengeri"],
 ["Capitale de la Zambie ?","Lusaka","Ndola","Kitwe","Livingstone"],
 ["Capitale de la Guinée ?","Conakry","Kankan","Labé","Nzérékoré"],
 ["Capitale du Niger ?","Niamey","Zinder","Maradi","Agadez"],
 ["Capitale de l'Angola ?","Luanda","Huambo","Lobito","Benguela"],
 ["Capitale politique de la Côte d'Ivoire ?","Yamoussoukro","Abidjan","Bouaké","San-Pédro","~Yamoussoukro est la capitale politique ; Abidjan est la capitale économique."]
]));

G('eafouest','Afrique de l\'Ouest','🌴','Géographie',160,'Fleuves, monnaies, villes et trésors de l\'Afrique de l\'Ouest.', EDU.quiz([
 ["Quel fleuve traverse le Mali et le Niger ?","Le Niger","Le Sénégal","La Volta","Le Congo"],
 ["Quel pays d'Afrique de l'Ouest est le plus peuplé ?","Le Nigeria","Le Ghana","La Côte d'Ivoire","Le Mali"],
 ["Quel pays a pour monnaie le cédi ?","Le Ghana","Le Nigeria","Le Togo","Le Liberia"],
 ["Quelle monnaie est partagée par 8 pays d'Afrique de l'Ouest ?","Le franc CFA (XOF)","Le naira","Le cédi","Le dalasi","~Ce sont le Bénin, le Burkina Faso, la Côte d'Ivoire, la Guinée-Bissau, le Mali, le Niger, le Sénégal et le Togo."],
 ["Quel pays n'a aucune côte maritime ?","Le Mali","Le Togo","Le Bénin","Le Ghana"],
 ["Capitale du Liberia ?","Monrovia","Freetown","Conakry","Banjul"],
 ["Capitale de la Sierra Leone ?","Freetown","Monrovia","Banjul","Bissau"],
 ["Quel est le plus petit pays d'Afrique continentale ?","La Gambie","Le Togo","Le Bénin","La Sierra Leone"],
 ["Capitale de la Guinée-Bissau ?","Bissau","Banjul","Praia","Bamako"],
 ["Quel pays d'Afrique de l'Ouest est un archipel ?","Le Cap-Vert","La Gambie","Le Togo","Le Ghana"],
 ["Quel immense lac de retenue se trouve au Ghana ?","Le lac Volta","Le lac Tchad","Le lac Victoria","Le lac Kossou"],
 ["Quel grand lac de barrage se trouve en Côte d'Ivoire ?","Le lac de Kossou","Le lac Volta","Le lac Tchad","Le lac Nasser"],
 ["Quel grand désert borde l'Afrique de l'Ouest au nord ?","Le Sahara","Le Kalahari","Le Namib","Le Gobi"],
 ["Dans quel pays se trouve la ville de Tombouctou ?","Le Mali","Le Niger","Le Sénégal","Le Burkina Faso"],
 ["L'île de Gorée, symbole de la mémoire de la traite des esclaves, se trouve près de quelle capitale ?","Dakar","Accra","Abidjan","Lomé"],
 ["Le parc du W s'étend sur le Niger, le Burkina Faso et…","Le Bénin","Le Mali","Le Togo","Le Ghana"],
 ["Quelle ville ivoirienne abrite la basilique Notre-Dame de la Paix ?","Yamoussoukro","Bouaké","Abidjan","Daloa"],
 ["Quel pays est le premier producteur mondial de cacao ?","La Côte d'Ivoire","Le Ghana","Le Brésil","L'Indonésie"],
 ["Quelle est la langue officielle du Ghana ?","L'anglais","Le français","Le portugais","L'arabe"],
 ["Quelle est la langue officielle du Cap-Vert ?","Le portugais","Le français","L'anglais","L'espagnol"],
 ["Banjul est la capitale de quel pays ?","La Gambie","La Guinée","Le Sénégal","Le Liberia"]
]));

G('ereliefs','Reliefs et océans','🏔️','Géographie',200,'Montagnes, fleuves, déserts et océans du monde.', EDU.quiz([
 ["Quelle est la plus haute montagne du monde ?","L'Everest","Le K2","Le Kilimandjaro","Le Mont Blanc"],
 ["Quel est le plus haut sommet d'Afrique ?","Le Kilimandjaro","Le Mont Kenya","Le Mont Cameroun","Le Toubkal","~Le Kilimandjaro, en Tanzanie, culmine à environ 5 895 mètres."],
 ["Quel est le plus long fleuve d'Afrique ?","Le Nil","Le Congo","Le Niger","Le Zambèze"],
 ["Quel est le plus grand désert chaud du monde ?","Le Sahara","Le Gobi","Le Kalahari","Le désert d'Arabie"],
 ["Quel est le plus grand océan ?","L'océan Pacifique","L'océan Atlantique","L'océan Indien","L'océan Arctique"],
 ["Quel océan borde la côte de l'Afrique de l'Ouest ?","L'océan Atlantique","L'océan Pacifique","L'océan Indien","L'océan Arctique"],
 ["Quel est le plus grand lac d'Afrique par sa superficie ?","Le lac Victoria","Le lac Tchad","Le lac Tanganyika","Le lac Malawi"],
 ["Les chutes Victoria se trouvent sur quel fleuve ?","Le Zambèze","Le Congo","Le Niger","Le Nil"],
 ["Quel est le plus long fleuve d'Europe ?","La Volga","Le Danube","Le Rhin","La Seine"],
 ["Quelle est la plus grande île du monde ?","Le Groenland","Madagascar","Bornéo","Sumatra"],
 ["Quelle mer sépare l'Afrique de l'Europe ?","La Méditerranée","La mer Rouge","La mer Noire","La mer Caspienne"],
 ["Dans quelle mer flotte-t-on facilement tant l'eau est salée ?","La mer Morte","La mer Rouge","La mer Baltique","La mer Noire"],
 ["Quel est le fleuve au plus grand débit du monde ?","L'Amazone","Le Nil","Le Mississippi","Le Yangzi Jiang"],
 ["Quelle grande chaîne de montagnes traverse l'Amérique du Sud ?","Les Andes","Les Alpes","Les Rocheuses","L'Atlas"],
 ["Quelle chaîne de montagnes se trouve au Maroc, en Algérie et en Tunisie ?","L'Atlas","Les Andes","Les Alpes","L'Himalaya"],
 ["Quel est le plus petit océan ?","L'océan Arctique","L'océan Indien","L'océan Atlantique","L'océan Pacifique"],
 ["Le canal de Suez relie la Méditerranée à quelle mer ?","La mer Rouge","La mer Noire","La mer Baltique","La mer du Nord"],
 ["Le Mont Blanc se trouve dans quelle chaîne de montagnes ?","Les Alpes","Les Pyrénées","Les Andes","L'Atlas"]
]));

(function(){
  const OPTS = ['Afrique','Asie','Europe','Amérique du Sud','Amérique du Nord','Océanie'];
  const C = (p,c)=> ["Sur quel continent se trouve : " + p + " ?", c].concat(shuffle(OPTS.filter(x=>x!==c)).slice(0,3));
  G('econtinents','Pays et continents','🗺️','Géographie',180,'Sur quel continent se trouve chaque pays ?', EDU.quiz([
    C('le Brésil','Amérique du Sud'), C('le Japon','Asie'), C('le Kenya','Afrique'), C('l\'Australie','Océanie'), C('le Canada','Amérique du Nord'),
    C('la Norvège','Europe'), C('l\'Inde','Asie'), C('l\'Argentine','Amérique du Sud'), C('le Mexique','Amérique du Nord'), C('la Nouvelle-Zélande','Océanie'),
    C('la Pologne','Europe'), C('le Vietnam','Asie'), C('le Pérou','Amérique du Sud'), C('le Maroc','Afrique'), C('l\'Italie','Europe'),
    C('l\'Indonésie','Asie'), C('le Chili','Amérique du Sud'), C('le Ghana','Afrique'), C('la Colombie','Amérique du Sud'), C('la Thaïlande','Asie'),
    C('l\'Éthiopie','Afrique'), C('la Suède','Europe'), C('Cuba','Amérique du Nord'), C('les Fidji','Océanie')
  ]));
})();

G('ecapitales','Capitales du monde','🏛️','Géographie',30,'Écris la capitale de chaque pays.', EDU.type([
 ["Capitale de la France ?","Paris"],["Capitale de l'Espagne ?","Madrid"],["Capitale de l'Italie ?","Rome"],["Capitale de l'Allemagne ?","Berlin"],
 ["Capitale du Royaume-Uni ?","Londres"],["Capitale du Portugal ?","Lisbonne"],["Capitale du Japon ?","Tokyo"],["Capitale de la Chine ?","Pékin","Beijing"],
 ["Capitale de l'Inde ?","New Delhi","Delhi"],["Capitale de la Russie ?","Moscou"],["Capitale du Brésil ?","Brasilia"],["Capitale de l'Argentine ?","Buenos Aires"],
 ["Capitale du Canada ?","Ottawa"],["Capitale des États-Unis ?","Washington","Washington DC"],["Capitale de l'Australie ?","Canberra"],["Capitale de la Turquie ?","Ankara"],
 ["Capitale de l'Égypte ?","Le Caire","Caire"],["Capitale du Maroc ?","Rabat"],["Capitale de l'Algérie ?","Alger"],["Capitale du Sénégal ?","Dakar"],
 ["Capitale du Ghana ?","Accra"],["Capitale du Mali ?","Bamako"],["Capitale du Kenya ?","Nairobi"],["Capitale de l'Éthiopie ?","Addis-Abeba","Addis Abeba"],
 ["Capitale de la Grèce ?","Athènes"],["Capitale de la Suisse ?","Berne"],["Capitale de la Belgique ?","Bruxelles"],["Capitale des Pays-Bas ?","Amsterdam"],
 ["Capitale du Mexique ?","Mexico"],["Capitale de Cuba ?","La Havane","Havane"],["Capitale de la Corée du Sud ?","Séoul"],["Capitale de la Thaïlande ?","Bangkok"],
 ["Capitale du Cameroun ?","Yaoundé"],["Capitale du Gabon ?","Libreville"],["Capitale du Togo ?","Lomé"],["Capitale du Nigeria ?","Abuja"]
]));

G('edrapeaux','Drapeaux par continent','🚩','Géographie',350,'Classe les pays dans le bon continent, vite !', EDU.sort(['🌍 Afrique','🌏 Asie','🌍 Europe','🌎 Amériques'],[
 ["🇨🇮 Côte d'Ivoire",0],["🇸🇳 Sénégal",0],["🇬🇭 Ghana",0],["🇳🇬 Nigeria",0],["🇰🇪 Kenya",0],["🇲🇦 Maroc",0],["🇪🇬 Égypte",0],["🇿🇦 Afrique du Sud",0],
 ["🇯🇵 Japon",1],["🇮🇳 Inde",1],["🇨🇳 Chine",1],["🇹🇭 Thaïlande",1],["🇰🇷 Corée du Sud",1],["🇻🇳 Vietnam",1],
 ["🇫🇷 France",2],["🇮🇹 Italie",2],["🇩🇪 Allemagne",2],["🇪🇸 Espagne",2],["🇵🇹 Portugal",2],["🇵🇱 Pologne",2],["🇸🇪 Suède",2],
 ["🇧🇷 Brésil",3],["🇨🇦 Canada",3],["🇲🇽 Mexique",3],["🇦🇷 Argentine",3],["🇨🇴 Colombie",3],["🇺🇸 États-Unis",3],["🇨🇱 Chili",3]
]));

G('epeuple','Plus peuplé ?','👥','Géographie',270,'Quel pays compte le plus d\'habitants ? (valeurs arrondies)', EDU.versus([
 ["🇳🇬 Nigeria",225,"🇳🇬"],["🇪🇹 Éthiopie",126,"🇪🇹"],["🇪🇬 Égypte",112,"🇪🇬"],["🇨🇩 RD Congo",102,"🇨🇩"],["🇹🇿 Tanzanie",67,"🇹🇿"],["🇿🇦 Afrique du Sud",60,"🇿🇦"],
 ["🇰🇪 Kenya",55,"🇰🇪"],["🇩🇿 Algérie",46,"🇩🇿"],["🇲🇦 Maroc",37,"🇲🇦"],["🇬🇭 Ghana",34,"🇬🇭"],["🇨🇮 Côte d'Ivoire",29,"🇨🇮"],["🇨🇲 Cameroun",28,"🇨🇲"],
 ["🇸🇳 Sénégal",18,"🇸🇳"],["🇹🇬 Togo",9,"🇹🇬"],["🇮🇳 Inde",1430,"🇮🇳"],["🇨🇳 Chine",1410,"🇨🇳"],["🇺🇸 États-Unis",335,"🇺🇸"],["🇮🇩 Indonésie",277,"🇮🇩"],
 ["🇧🇷 Brésil",216,"🇧🇷"],["🇯🇵 Japon",124,"🇯🇵"],["🇷🇺 Russie",144,"🇷🇺"],["🇲🇽 Mexique",128,"🇲🇽"],["🇫🇷 France",68,"🇫🇷"],["🇩🇪 Allemagne",84,"🇩🇪"]
],{ ask:'Quel pays compte le plus d\'habitants ?', unit:' millions' }));

G('ehaut','Plus haut sommet ?','⛰️','Géographie',210,'Quelle montagne est la plus haute ?', EDU.versus([
 ["Everest",8849,"🏔️"],["K2",8611,"🏔️"],["Aconcagua",6961,"⛰️"],["Denali",6190,"⛰️"],["Kilimandjaro",5895,"🌋"],["Elbrouz",5642,"⛰️"],["Mont Kenya",5199,"⛰️"],
 ["Mont Blanc",4806,"🏔️"],["Toubkal",4167,"⛰️"],["Mont Cameroun",4040,"🌋"],["Mont Fuji",3776,"🗻"],["Pic de l'Aneto",3404,"⛰️"],["Ben Nevis",1345,"⛰️"],["Vésuve",1281,"🌋"]
],{ ask:'Quel sommet est le plus haut ?', unit:' m' }));

G('efuseaux','Fuseaux horaires','🕐','Géographie',50,'Quelle heure est-il à l\'autre bout du monde ?', EDU.gen(function(level){
 const C = [["Abidjan",0],["Dakar",0],["Accra",0],["Lagos",1],["Kinshasa",1],["Johannesburg",2],["Nairobi",3],["Addis-Abeba",3],["Moscou",3],["Dubaï",4],["Bangkok",7],["Pékin",8],["Singapour",8],["Tokyo",9]];
 let a, b; do { a = C[SCCG.util.rnd(C.length)]; b = C[SCCG.util.rnd(C.length)]; } while(a[1] === b[1]);
 const h = 6 + SCCG.util.rnd(16), r = ((h + b[1] - a[1]) % 24 + 24) % 24, f = x => ((x%24+24)%24) + ' h';
 const set = new Set([f(r)]); [1,-1,2,-2,3,-3].forEach(d=>{ if(set.size < 4) set.add(f(r + d)); });
 return { q:'Il est ' + h + ' h à ' + a[0] + '. Quelle heure est-il à ' + b[0] + ' ?', a:f(r), opts:shuffle(Array.from(set)) };
},{ how:'Chaque ville a un décalage horaire par rapport à Abidjan (heure UTC/GMT) : Lagos +1 h, Nairobi +3 h, Pékin +8 h, Tokyo +9 h… Calcule l\'heure dans l\'autre ville. 60 secondes, chaque erreur coûte 3 secondes.', maxLevel:1 }));

G('epaysmel','Pays mélangés','🔀','Géographie',90,'Remets les lettres du pays dans l\'ordre.', EDU.scramble((function(){
 return ['MALI','TOGO','GHANA','KENYA','NIGER','GABON','TCHAD','BENIN','ANGOLA','ZAMBIE','RWANDA','OUGANDA','NIGERIA','MAROC','TUNISIE','ALGERIE','LIBERIA','BURUNDI','MALAWI','NAMIBIE','SOMALIE','GAMBIE','SENEGAL','CAMEROUN','ETHIOPIE'].map(w=>[w,'Un pays d\'Afrique']);
})()));

G('emonnaies','Pays et monnaies','💱','Géographie',120,'Associe chaque pays à sa monnaie.', EDU.pairs([
 ["Nigeria","Naira"],["Ghana","Cédi"],["Kenya","Shilling kényan"],["Maroc","Dirham"],["Égypte","Livre égyptienne"],["Afrique du Sud","Rand"],
 ["Japon","Yen"],["Royaume-Uni","Livre sterling"],["États-Unis","Dollar américain"],["Inde","Roupie"],["Chine","Yuan"],["Suisse","Franc suisse"],
 ["Brésil","Real"],["Côte d'Ivoire","Franc CFA"],["Tanzanie","Shilling tanzanien"],["Éthiopie","Birr"],["Russie","Rouble"],["Gambie","Dalasi"]
]));

G('elangues','Pays et langues','🗣️','Géographie',300,'Quelle est la langue principale de chaque pays ?', EDU.pairs([
 ["Brésil","Portugais"],["Mexique","Espagnol"],["Allemagne","Allemand"],["Italie","Italien"],["Japon","Japonais"],["Russie","Russe"],
 ["Turquie","Turc"],["Éthiopie","Amharique"],["Pays-Bas","Néerlandais"],["Grèce","Grec"],["Pologne","Polonais"],["Suède","Suédois"],
 ["Thaïlande","Thaï"],["Vietnam","Vietnamien"],["Corée du Sud","Coréen"],["Hongrie","Hongrois"],["Tanzanie","Swahili"],["Chine","Chinois (mandarin)"]
]));

/* ---------------------------------------------------------- SCIENCES */
G('esysteme','Système solaire','🪐','Sciences',260,'Planètes, étoiles et exploration spatiale.', EDU.quiz([
 ["Combien y a-t-il de planètes dans le Système solaire ?","8","9","7","10"],
 ["Quelle est la plus grande planète ?","Jupiter","Saturne","Neptune","La Terre"],
 ["Quelle planète est la plus proche du Soleil ?","Mercure","Vénus","Mars","La Terre"],
 ["Quelle planète est surnommée la planète rouge ?","Mars","Vénus","Jupiter","Mercure"],
 ["Quelle planète est célèbre pour ses anneaux ?","Saturne","Mars","Mercure","La Terre"],
 ["Quelle est la planète la plus chaude ?","Vénus","Mercure","Mars","Jupiter","~Vénus est plus chaude que Mercure à cause de son atmosphère épaisse qui retient la chaleur (effet de serre)."],
 ["Quelle est la planète la plus éloignée du Soleil ?","Neptune","Uranus","Saturne","Pluton"],
 ["Combien de temps la Terre met-elle pour faire le tour du Soleil ?","Environ 365 jours","24 heures","30 jours","7 jours"],
 ["En combien de temps la Terre tourne-t-elle sur elle-même ?","Environ 24 heures","365 jours","Un mois","12 heures"],
 ["Comment s'appelle notre galaxie ?","La Voie lactée","Andromède","Orion","Sirius"],
 ["Qui a été le premier humain à marcher sur la Lune ?","Neil Armstrong","Buzz Aldrin","Youri Gagarine","John Glenn","~C'était en juillet 1969, pendant la mission Apollo 11."],
 ["Qui a été le premier humain dans l'espace ?","Youri Gagarine","Neil Armstrong","Alan Shepard","Valentina Terechkova","~Youri Gagarine a fait le tour de la Terre le 12 avril 1961."],
 ["Pluton est aujourd'hui classée comme…","Planète naine","Planète géante","Étoile","Satellite","~Depuis 2006, Pluton est une planète naine."],
 ["Une éclipse de Soleil se produit quand…","La Lune passe entre la Terre et le Soleil","La Terre passe entre la Lune et le Soleil","Le Soleil s'éteint un instant","Mars passe devant la Lune"],
 ["Combien de temps la lumière du Soleil met-elle pour arriver sur Terre ?","Environ 8 minutes","Environ 8 secondes","Environ 8 heures","Environ 8 jours"],
 ["Quelle planète possède la Grande Tache rouge, une tempête géante ?","Jupiter","Mars","Saturne","Vénus"]
]));

G('eplanetes','Ordre des planètes','🌌','Sciences',240,'Classe les planètes selon la distance ou la taille.', EDU.order([
 { q:'Du plus proche au plus éloigné du Soleil :', items:['Mercure','Vénus','Terre','Mars'] },
 { q:'Du plus proche au plus éloigné du Soleil :', items:['Mars','Jupiter','Saturne','Uranus'] },
 { q:'Du plus proche au plus éloigné du Soleil :', items:['Terre','Mars','Jupiter','Neptune'] },
 { q:'Du plus proche au plus éloigné du Soleil :', items:['Mercure','Terre','Saturne','Neptune'] },
 { q:'Du plus proche au plus éloigné du Soleil :', items:['Vénus','Mars','Jupiter','Uranus','Neptune'] },
 { q:'Du plus petit au plus grand diamètre :', items:['Mercure','Mars','Vénus','Terre'] },
 { q:'Du plus petit au plus grand diamètre :', items:['Terre','Neptune','Saturne','Jupiter'] },
 { q:'Du plus petit au plus grand diamètre :', items:['Mars','Terre','Uranus','Jupiter'] }
]));

G('ecorps','Corps humain','🫀','Sciences',0,'Organes, os, sens : découvre ton corps.', EDU.quiz([
 ["Quel organe pompe le sang dans tout le corps ?","Le cœur","Le foie","Les poumons","L'estomac"],
 ["Combien d'os compte le squelette d'un adulte ?","206","106","306","150"],
 ["Quels organes servent à respirer ?","Les poumons","Les reins","Le foie","Le cœur"],
 ["Quel est le plus grand organe du corps humain ?","La peau","Le foie","Le cerveau","L'intestin"],
 ["Combien de dents a un adulte (avec les dents de sagesse) ?","32","28","36","24"],
 ["Quel organe produit la bile ?","Le foie","Les reins","Le cœur","La rate"],
 ["Quels organes filtrent le sang et fabriquent l'urine ?","Les reins","Les poumons","Le foie","L'estomac"],
 ["À quoi servent surtout les globules rouges ?","À transporter l'oxygène","À combattre les microbes","À digérer","À faire grandir les os"],
 ["Quel est le plus long os du corps ?","Le fémur","Le tibia","L'humérus","La côte"],
 ["Combien de sens a-t-on classiquement ?","5","3","7","9","~La vue, l'ouïe, l'odorat, le goût et le toucher."],
 ["Quelle vitamine la peau fabrique-t-elle grâce au soleil ?","La vitamine D","La vitamine C","La vitamine A","La vitamine K"],
 ["Quelle partie de l'œil, colorée, règle la quantité de lumière ?","L'iris","La cornée","Le cristallin","La rétine"],
 ["Quelle proportion approximative du corps adulte est faite d'eau ?","Environ 60 %","Environ 20 %","Environ 40 %","Environ 90 %"],
 ["Quel organe se trouve dans le crâne ?","Le cerveau","Le cœur","Le foie","L'estomac"],
 ["Dans quelle partie de l'oreille se trouve l'organe de l'équilibre ?","L'oreille interne","Le pavillon","Le tympan","Le lobe"]
]));

G('ephysique','Physique du quotidien','⚡','Sciences',55,'Vrai ou faux ? Des phénomènes que tu vois tous les jours.', EDU.tf([
 ["Le son peut voyager dans le vide spatial.",false,"Le son a besoin d'air ou de matière pour se propager. Dans le vide de l'espace, il n'y a pas de son."],
 ["L'eau bout à 100 °C au niveau de la mer.",true,"En altitude, elle bout à une température un peu plus basse."],
 ["La lumière va plus vite que le son.",true,"C'est pour ça qu'on voit l'éclair avant d'entendre le tonnerre."],
 ["Dans le vide, une plume et un marteau tombent à la même vitesse.",true,"Sans air, il n'y a pas de frottement : tous les objets tombent pareil."],
 ["Un aimant attire le fer.",true,"Le fer, le nickel et le cobalt sont attirés par les aimants."],
 ["L'huile se mélange facilement à l'eau.",false,"L'huile est moins dense que l'eau et ne se mélange pas : elle flotte."],
 ["Les nuages sont faits de minuscules gouttes d'eau ou de cristaux de glace.",true,"Quand elles grossissent et deviennent lourdes, elles tombent en pluie."],
 ["La glace flotte sur l'eau.",true,"En gelant, l'eau prend plus de place : la glace est moins dense que l'eau liquide."],
 ["Un arc-en-ciel apparaît quand la lumière traverse des gouttes d'eau.",true,"La lumière blanche est décomposée en couleurs, comme avec un prisme."],
 ["Le métal conduit bien l'électricité.",true,"C'est pour cela que les fils électriques sont en cuivre."],
 ["La Lune produit sa propre lumière.",false,"La Lune reflète la lumière du Soleil, elle ne brille pas toute seule."],
 ["L'air est composé en majorité d'oxygène.",false,"L'air contient environ 78 % d'azote et 21 % d'oxygène."],
 ["Le bois conduit bien l'électricité.",false,"Le bois sec est un isolant."],
 ["Un gaz qu'on chauffe se dilate.",true,"C'est le principe du ballon à air chaud."],
 ["Un thermomètre mesure la pression.",false,"Il mesure la température. La pression se mesure avec un baromètre ou un manomètre."],
 ["Les objets plus lourds tombent toujours plus vite dans l'air.",false,"C'est surtout la forme et le frottement de l'air qui comptent : une feuille de papier froissée tombe plus vite que dépliée."]
]));

G('eelements','Symboles chimiques','⚗️','Sciences',280,'Associe chaque élément chimique à son symbole.', EDU.pairs([
 ["Hydrogène","H"],["Oxygène","O"],["Carbone","C"],["Azote","N"],["Fer","Fe"],["Or","Au"],["Argent","Ag"],["Sodium","Na"],["Calcium","Ca"],
 ["Cuivre","Cu"],["Plomb","Pb"],["Hélium","He"],["Potassium","K"],["Soufre","S"],["Zinc","Zn"],["Chlore","Cl"],["Aluminium","Al"],["Mercure","Hg"]
]));

G('evertebres','Famille d\'animaux','🐘','Sciences',100,'Mammifère, oiseau, reptile ou poisson ? Attention aux pièges !', EDU.sort(['🐘 Mammifères','🦅 Oiseaux','🐍 Reptiles','🐟 Poissons'],[
 ["Lion",0],["Dauphin",0],["Chauve-souris",0],["Éléphant",0],["Baleine",0],["Singe",0],["Girafe",0],
 ["Aigle",1],["Autruche",1],["Perroquet",1],["Pingouin",1],["Hibou",1],["Poule",1],
 ["Crocodile",2],["Serpent",2],["Tortue",2],["Lézard",2],["Caméléon",2],
 ["Requin",3],["Thon",3],["Hippocampe",3],["Sardine",3],["Carpe",3],["Tilapia",3]
]));

G('echaine','Chaînes alimentaires','🦁','Sciences',130,'Remets les maillons de la chaîne alimentaire dans l\'ordre.', EDU.order([
 { q:'Qui est mangé par qui ? De la plante au grand prédateur :', items:['Herbe','Sauterelle','Grenouille','Serpent','Aigle'] },
 { q:'Qui est mangé par qui ? Du plus petit au plus grand :', items:['Plancton','Petit poisson','Grand poisson','Requin'] },
 { q:'Qui est mangé par qui ? Dans la savane :', items:['Herbe','Zèbre','Lion'] },
 { q:'Qui est mangé par qui ? Dans le champ :', items:['Graine','Souris','Serpent','Aigle'] },
 { q:'Qui est mangé par qui ? Dans le jardin :', items:['Feuille','Chenille','Oiseau','Chat'] },
 { q:'Qui est mangé par qui ? Au bord de la rivière :', items:['Algue','Têtard','Poisson','Héron'] }
]));

G('eunites','Unités de mesure','📏','Sciences',70,'Associe chaque grandeur à son unité.', EDU.pairs([
 ["Longueur","Mètre"],["Masse","Kilogramme"],["Temps","Seconde"],["Température","Degré Celsius"],["Volume d'un liquide","Litre"],["Vitesse d'une voiture","Kilomètre par heure"],
 ["Énergie","Joule"],["Puissance","Watt"],["Fréquence","Hertz"],["Force","Newton"],["Tension électrique","Volt"],["Pression","Pascal"]
]));
})();

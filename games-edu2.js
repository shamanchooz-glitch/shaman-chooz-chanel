/* ==========================================================
   LOT ÉDUCATIF 2 — Sciences (3), Maths & logique (12), Culture/Histoire (5)
   Nécessite games-edu-core.js (chargé avant).
   ========================================================== */
(function(){
'use strict';
if(!window.EDU) return;
const G = EDU.G, U = SCCG.util, rnd = U.rnd, pick = U.pick, shuffle = U.shuffle;
const ri = (a,b)=> a + rnd(b - a + 1);
const uniq4 = (correct, extras)=>{ const s = new Set([String(correct)]); extras.forEach(x=>{ if(s.size < 4) s.add(String(x)); }); let k = 1; while(s.size < 4){ s.add(String(correct) + ' ' + '.'.repeat(k++)); } return shuffle(Array.from(s)); };

/* ---------------------------------------------------------- SCIENCES */
G('einventions','Inventions et inventeurs','💡','Sciences',48,'Qui a inventé quoi ? Associe l\'invention à son auteur.', EDU.pairs([
 ["Téléphone","Alexander Graham Bell"],["Imprimerie à caractères mobiles","Johannes Gutenberg"],["Pénicilline","Alexander Fleming"],["Vaccin contre la rage","Louis Pasteur"],
 ["Dynamite","Alfred Nobel"],["Premier vol motorisé","Les frères Wright"],["Cinématographe","Les frères Lumière"],["Théorie de la relativité","Albert Einstein"],
 ["Pile électrique","Alessandro Volta"],["Radium et polonium","Marie Curie"],["Machine à vapeur perfectionnée","James Watt"],["Ampoule électrique pratique","Thomas Edison"],
 ["Paratonnerre","Benjamin Franklin"],["Loi de la gravitation","Isaac Newton"]
]));

G('eeau','Eau, météo et climat','🌦️','Sciences',195,'Évaporation, nuages, pluie, climat : comprends la météo.', EDU.quiz([
 ["Comment s'appelle le passage de l'eau liquide à la vapeur ?","L'évaporation","La condensation","La solidification","La fusion"],
 ["Que devient la vapeur d'eau quand elle refroidit dans le ciel ?","Elle se condense en gouttelettes (nuages)","Elle disparaît pour toujours","Elle se transforme en sable","Elle devient de l'oxygène"],
 ["Quel instrument mesure la quantité de pluie tombée ?","Le pluviomètre","Le thermomètre","Le baromètre","L'anémomètre"],
 ["Quel instrument mesure la vitesse du vent ?","L'anémomètre","Le pluviomètre","Le baromètre","Le thermomètre"],
 ["Quel instrument mesure la pression de l'air ?","Le baromètre","Le thermomètre","Le pluviomètre","L'anémomètre"],
 ["Quelle part de la surface de la Terre est couverte d'eau ?","Environ 70 %","Environ 30 %","Environ 50 %","Environ 90 %"],
 ["Près de l'équateur, le climat est généralement…","Chaud toute l'année","Glacial toute l'année","Très froid l'hiver","Sans aucune pluie"],
 ["Quel gaz les plantes absorbent-elles pour fabriquer leur nourriture ?","Le dioxyde de carbone","Le dioxyde de soufre","Le méthane","L'hélium","~C'est la photosynthèse : les plantes captent la lumière, l'eau et le dioxyde de carbone, et rejettent de l'oxygène."],
 ["Quelle est la principale cause du réchauffement climatique actuel ?","Les gaz à effet de serre émis par les activités humaines","Le Soleil qui grossit","Les volcans uniquement","La Lune"],
 ["Qu'est-ce qui provoque surtout les marées ?","L'attraction de la Lune","Le vent","Les poissons","La chaleur du sable"],
 ["Quelle part de l'eau de la Terre est de l'eau douce ?","Environ 3 %","Environ 30 %","Environ 50 %","Environ 10 %","~Presque toute l'eau de la Terre est salée : il faut donc économiser l'eau potable."],
 ["Comment appelle-t-on de petites boules de glace qui tombent du ciel ?","La grêle","La rosée","Le brouillard","Le givre"],
 ["Quand l'eau gèle à 0 °C, elle devient…","Solide (glace)","Gazeuse","Plus chaude","De l'huile"],
 ["Une longue période sans pluie provoque…","Une sécheresse","Une inondation","Un cyclone","Une avalanche"],
 ["Comment s'appelle le trajet permanent de l'eau entre mer, ciel et terre ?","Le cycle de l'eau","Le cycle du feu","La chaîne alimentaire","La rotation lunaire"]
]));

G('ecouleurs','Mélangeur de couleurs','🎨','Sciences',320,'Mélange rouge, vert et bleu pour copier la couleur cible.', EDU.colors());

/* ---------------------------------------------------------- MATHS & LOGIQUE */
G('edoubles','Doubles, moitiés, triples','✖️','Maths & logique',15,'Calcule vite avec le clavier : doubles, moitiés, triples…', EDU.gen(function(L){
 let n, q, a;
 const k = ri(1, Math.min(L,5));
 if(k === 1){ n = ri(6, 25); q = 'Le double de ' + n + ' ?'; a = n*2; }
 else if(k === 2){ n = ri(4, 50)*2; q = 'La moitié de ' + n + ' ?'; a = n/2; }
 else if(k === 3){ n = ri(11, 60); q = 'Le triple de ' + n + ' ?'; a = n*3; }
 else if(k === 4){ n = ri(5, 40)*4; q = 'Le quart de ' + n + ' ?'; a = n/4; }
 else { n = ri(25, 120); q = 'Le double de ' + n + ' ?'; a = n*2; }
 return { q, a };
},{ mode:'numpad', how:'Un calcul s\'affiche (le double, la moitié, le triple, le quart…). Tape la réponse avec le clavier numérique puis OK. 60 secondes, chaque erreur coûte 3 secondes. Le niveau monte tous les 4 bonnes réponses.' }));

G('epourcent','Pourcentages malins','％','Maths & logique',340,'Calcule 10 %, 25 %, 50 %… de nombres du quotidien.', EDU.gen(function(L){
 const P = [[10,50],[50,10],[25,20],[20,25],[10,20],[75,25],[5,20],[15,20]];
 const pct = pick(P.slice(0, Math.min(P.length, 2 + L*1)))[0];
 const base = pick([20,40,60,80,100,120,140,160,180,200,240,300,400,500,600,800,1000,1200,2000]);
 const a = base*pct/100;
 return { q: pct + ' % de ' + base.toLocaleString('fr-FR') + ' FCFA, ça fait combien ?', a: a.toLocaleString('fr-FR') + ' FCFA', opts: uniq4(a.toLocaleString('fr-FR') + ' FCFA', [(a*2), Math.round(a/2), a+base/10, Math.max(1,a-base/20)].map(x=>Math.round(x).toLocaleString('fr-FR')+' FCFA')) };
},{ how:'Un pourcentage d\'une somme en FCFA : choisis la bonne réponse. Astuces : 10 % = diviser par 10 ; 50 % = la moitié ; 25 % = le quart. 60 secondes.' }));

G('efractions','Fractions en images','🍕','Maths & logique',25,'Quelle fraction du disque est colorée ?', EDU.gen(function(L){
 const den = pick(L < 2 ? [2,4] : L < 4 ? [3,4,5,6] : [4,5,6,8,10]);
 const num = ri(1, den-1), a = num + '/' + den;
 const wrong = new Set(); while(wrong.size < 3){ const d2 = pick([2,3,4,5,6,8,10]), n2 = ri(1, d2-1), s = n2 + '/' + d2; if(s !== a && n2/d2 !== num/den) wrong.add(s); }
 return { q:'Quelle fraction du disque est colorée ?', a, opts: shuffle([a].concat(Array.from(wrong))), draw:(g,w,h)=>EDU.drawPie(g,w,h,num,den), w:170, h:170 };
},{ how:'Un disque est découpé en parts égales, certaines sont colorées. Choisis la fraction qui correspond : le nombre de parts colorées en haut, le nombre total de parts en bas.' }));

(function(){
 const toR = n=>{ const m = [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']]; let s = ''; m.forEach(([v,c])=>{ while(n >= v){ s += c; n -= v; } }); return s; };
 G('eromains','Chiffres romains','🏛️','Maths & logique',35,'Traduis les chiffres romains et les nombres.', EDU.gen(function(L){
  const max = [10,39,99,399,1999][Math.min(4,L-1)]; const n = ri(2, max);
  if(rnd(2)){ const a = toR(n); const ex = [n+1, n-1, n+5, n-5, n+10, n+2].filter(x=>x>0 && x !== n).map(toR); return { q:'Que vaut ' + a + ' ?', a:String(n), opts: uniq4(n, [n+1,n-1,n+5,n+10,n-5].filter(x=>x>0)) }; }
  const a = toR(n); const ex = [n+1, n-1, n+5, n-5, n+10, n+2, n-10].filter(x=>x>0 && x !== n).map(toR);
  return { q:'Comment écrit-on ' + n + ' en chiffres romains ?', a, opts: uniq4(a, shuffle(ex)) };
 },{ how:'I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000. Un petit chiffre placé avant un grand se soustrait (IV = 4, IX = 9). Choisis la bonne réponse. 60 secondes.' }));
})();

G('ebinaire','Binaire','💻','Maths & logique',210,'Écris des nombres avec des 0 et des 1, comme un ordinateur.', EDU.binary());

G('esuites','Suites logiques','🔢','Maths & logique',100,'Trouve le terme suivant : nombres et lettres.', EDU.gen(function(L){
 const t = ri(1, Math.min(6, 1 + L));
 let seq, a;
 if(t === 1){ const d = ri(2,5), s = ri(1,10); seq = [0,1,2,3].map(i=>s + i*d); a = s + 4*d; }
 else if(t === 2){ const s = ri(1,5); seq = [s, s*2, s*4, s*8]; a = s*16; }
 else if(t === 3){ const s = ri(1,4); seq = [1,2,3,4].map(i=>(i+s-1)*(i+s-1)); a = (4+s)*(4+s); }
 else if(t === 4){ const d = ri(5,12), s = ri(60,100); seq = [0,1,2,3].map(i=>s - i*d); a = s - 4*d; }
 else if(t === 5){ const L0 = ri(0,5), st = ri(1,3), A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; seq = [0,1,2,3].map(i=>A[L0 + i*st]); const nx = A[L0 + 4*st]; if(!nx) return { q:'Complète la suite : 2, 4, 6, 8, ?', a:'10', opts:['9','10','12','11'] }; return { q:'Complète la suite : ' + seq.join(', ') + ', ?', a:nx, opts: uniq4(nx, [A[L0+4*st+1]||'Z', A[L0+4*st-1], A[L0+3*st+st+2]||'Y']) }; }
 else { seq = [1,1,2,3,5]; a = 8; if(rnd(2)){ seq = [2,3,5,8,13]; a = 21; } }
 return { q:'Complète la suite : ' + seq.join(', ') + ', ?', a:String(a), opts: uniq4(a, [a+1, a-1, a+2, a*2, a-3].filter(x=>x>0)) };
},{ how:'Une suite de nombres ou de lettres suit une règle (on ajoute toujours la même chose, on double, on met au carré…). Trouve le terme suivant. 60 secondes.' }));

G('eaire','Aire et périmètre','📐','Maths & logique',160,'Calcule l\'aire et le périmètre de formes simples.', EDU.gen(function(L){
 const t = ri(1, Math.min(5, 2 + L));
 if(t === 1){ const a = ri(3,12), b = ri(2,9); return { q:'Un rectangle mesure ' + a + ' m de long et ' + b + ' m de large. Quelle est son aire (en m²) ?', a:a*b }; }
 if(t === 2){ const a = ri(3,15); return { q:'Un carré a un côté de ' + a + ' m. Quel est son périmètre (en m) ?', a:4*a }; }
 if(t === 3){ const a = ri(3,12), b = ri(2,9); return { q:'Un rectangle mesure ' + a + ' m sur ' + b + ' m. Quel est son périmètre (en m) ?', a:2*(a+b) }; }
 if(t === 4){ const a = ri(3,12); return { q:'Un carré a un côté de ' + a + ' m. Quelle est son aire (en m²) ?', a:a*a }; }
 const b = ri(2,10)*2, h = ri(3,12); return { q:'Un triangle a une base de ' + b + ' m et une hauteur de ' + h + ' m. Quelle est son aire (en m²) ?', a:b*h/2 };
},{ mode:'numpad', how:'Aire d\'un rectangle = longueur × largeur ; périmètre = 2 × (longueur + largeur) ; aire d\'un triangle = base × hauteur ÷ 2. Tape ta réponse. 60 secondes.' }));

G('econv','Conversions','🔄','Maths & logique',175,'Kilomètres, grammes, litres, minutes : convertis vite.', EDU.gen(function(L){
 const T = [['km','m',1000],['kg','g',1000],['L','mL',1000],['h','min',60],['min','s',60],['m','cm',100],['jours','heures',24],['semaines','jours',7]];
 const t = pick(T.slice(0, Math.min(T.length, 3 + L))); const n = ri(2,9); const a = n*t[2];
 const f = x => x.toLocaleString('fr-FR') + ' ' + t[1];
 return { q:'Combien font ' + n + ' ' + t[0] + ' en ' + t[1] + ' ?', a:f(a), opts: uniq4(f(a), [a*10, a/10, a*2, a+t[2], Math.round(a/2)].filter(x=>Number.isInteger(x) && x > 0).map(f)) };
},{ how:'1 km = 1000 m ; 1 kg = 1000 g ; 1 L = 1000 mL ; 1 h = 60 min ; 1 min = 60 s ; 1 m = 100 cm ; 1 jour = 24 h ; 1 semaine = 7 jours. Choisis la bonne conversion. 60 secondes.' }));

G('epremiers','Nombres premiers','🔍','Maths & logique',290,'Un nombre premier n\'a que deux diviseurs : 1 et lui-même. Trouve-le !', EDU.gen(function(L){
 const max = [30,50,80,120,200][Math.min(4,L-1)];
 const isP = n=>{ if(n < 2) return false; for(let i=2;i*i<=n;i++) if(n%i===0) return false; return true; };
 let p; do { p = ri(2,max); } while(!isP(p));
 const bad = new Set(); while(bad.size < 3){ const c = ri(4,max); if(!isP(c)) bad.add(c); }
 return { q:'Quel nombre est premier ?', a:String(p), opts: shuffle([String(p)].concat(Array.from(bad).map(String))) };
},{ how:'Un nombre premier se divise seulement par 1 et par lui-même (2, 3, 5, 7, 11, 13…). Parmi quatre nombres, un seul est premier : trouve-le ! 60 secondes.' }));

G('eequation','Équations','❓','Maths & logique',5,'Trouve la valeur de x.', EDU.gen(function(L){
 const t = ri(1, Math.min(5, L + 1)); const x = ri(2, 12);
 if(t === 1){ const a = ri(2,15); return { q:'x + ' + a + ' = ' + (x+a) + '   →   x = ?', a:x }; }
 if(t === 2){ const a = ri(2,9); return { q:a + ' × x = ' + (a*x) + '   →   x = ?', a:x }; }
 if(t === 3){ const a = ri(2,15), b = ri(2,12); return { q:'x − ' + a + ' = ' + b + '   →   x = ?', a:a+b }; }
 if(t === 4){ const a = ri(2,6), b = ri(1,15); return { q:a + ' × x + ' + b + ' = ' + (a*x+b) + '   →   x = ?', a:x }; }
 const a = ri(2,6), b = ri(1,10); return { q:a + ' × x − ' + b + ' = ' + (a*x-b) + '   →   x = ?', a:x };
},{ mode:'numpad', how:'Une équation s\'affiche : trouve la valeur de x. Astuce : fais l\'opération inverse (si on a ajouté 5, on retire 5 ; si on a multiplié par 3, on divise par 3). Tape la réponse. 60 secondes.' }));

G('emoyenne','Moyenne','📊','Maths & logique',230,'Calcule la moyenne de plusieurs notes.', EDU.gen(function(L){
 const n = ri(3, Math.min(6, 2 + L)); const m = ri(6, 18); const arr = []; let s = 0;
 for(let i=0;i<n-1;i++){ const v = Math.max(1, m + ri(-4,4)); arr.push(v); s += v; }
 const last = n*m - s; if(last < 1){ arr.push(m); arr[0] = Math.max(1, arr[0]); const sum = arr.reduce((p,c)=>p+c,0); return { q:'Quelle est la moyenne de ' + arr.join(', ') + ' ? (arrondie à l\'entier)', a:Math.round(sum/arr.length) }; }
 arr.push(last);
 return { q:'Quelle est la moyenne de ' + shuffle(arr).join(', ') + ' ?', a:m };
},{ mode:'numpad', how:'La moyenne = la somme de tous les nombres ÷ le nombre de valeurs. Exemple : (8 + 10 + 12) ÷ 3 = 10. Tape la moyenne demandée. 60 secondes.' }));

G('eheure','Lire l\'heure','⏰','Maths & logique',60,'Quelle heure indique l\'horloge ?', EDU.gen(function(L){
 const mins = L < 2 ? [0,30] : L < 3 ? [0,15,30,45] : [0,5,10,15,20,25,30,35,40,45,50,55];
 const hh = ri(1,12), mm = pick(mins); const f = (h,m)=> h + ' h' + (m ? ' ' + (m < 10 ? '0' + m : m) : '');
 const set = new Set([f(hh,mm)]); [[hh%12+1,mm],[(hh+10)%12+1,mm],[hh,(mm+30)%60],[hh,(mm+15)%60],[Math.max(1,(mm/5)||1),hh*5%60]].forEach(([h,m])=>{ if(set.size < 4) set.add(f(h,m)); });
 let g = 1; while(set.size < 4) set.add(f((hh+g)%12+1, mm)), g++;
 return { q:'Quelle heure indique cette horloge ? (petite aiguille = heures, grande aiguille rouge = minutes)', a:f(hh,mm), opts:shuffle(Array.from(set)), draw:(g,w,h)=>EDU.drawClock(g,w,h,hh,mm), w:170, h:170 };
},{ how:'Regarde l\'horloge : la petite aiguille noire indique les heures, la grande aiguille rouge indique les minutes (chaque chiffre = 5 minutes). Choisis la bonne heure. 60 secondes.' }));

/* ---------------------------------------------------------- CULTURE / HISTOIRE */
G('eafhist','Histoire de l\'Afrique','🌍','Culture',20,'Empires, héros et indépendances : l\'histoire du continent.', EDU.quiz([
 ["Quelle civilisation africaine antique est célèbre pour ses pyramides le long du Nil ?","L'Égypte antique","Carthage","L'empire du Mali","Le royaume d'Aksoum"],
 ["Quel empereur du Mali est célèbre pour sa richesse et son pèlerinage à La Mecque en 1324 ?","Mansa Moussa","Soundiata Keïta","Samory Touré","Askia Mohammed"],
 ["Qui est le fondateur de l'empire du Mali au XIIIe siècle ?","Soundiata Keïta","Mansa Moussa","Sonni Ali Ber","Béhanzin"],
 ["Quelle ville du Mali était un grand centre de savoir au Moyen Âge ?","Tombouctou","Kayes","Mopti","Sikasso"],
 ["Les ruines du Grand Zimbabwe se trouvent dans quel pays ?","Le Zimbabwe","Le Kenya","L'Éthiopie","Le Mali"],
 ["Quel royaume d'Afrique de l'Ouest était célèbre pour ses guerrières, les « amazones » ?","Le Dahomey","L'empire ashanti","L'empire du Mali","Le royaume du Kongo"],
 ["Où se trouvait l'ancien empire ashanti ?","Dans l'actuel Ghana","Au Kenya","En Égypte","En Angola"],
 ["Qui fut le premier président du Ghana indépendant ?","Kwame Nkrumah","Nelson Mandela","Léopold Sédar Senghor","Jomo Kenyatta"],
 ["Qui fut le premier président de la Côte d'Ivoire ?","Félix Houphouët-Boigny","Henri Konan Bédié","Laurent Gbagbo","Alassane Ouattara"],
 ["Qui fut le premier président du Sénégal ?","Léopold Sédar Senghor","Abdou Diouf","Macky Sall","Kwame Nkrumah"],
 ["En quelle année Nelson Mandela est-il devenu président de l'Afrique du Sud ?","1994","1980","1990","2000"],
 ["Contre quel système Nelson Mandela a-t-il lutté ?","L'apartheid","Le colonialisme belge","L'esclavage antique","La monarchie"],
 ["Qui était Thomas Sankara ?","Un président du Burkina Faso","Un roi du Mali","Un explorateur portugais","Un président du Togo"],
 ["Quel pays africain a vaincu l'armée italienne à Adoua en 1896 ?","L'Éthiopie","Le Ghana","Le Kenya","Le Sénégal","~Cette victoire a fait de l'Éthiopie un symbole de résistance à la colonisation."],
 ["Que décidait la Conférence de Berlin (1884-1885) ?","Les règles du partage colonial de l'Afrique","L'indépendance des pays africains","La fin de la Première Guerre mondiale","La création de l'ONU"],
 ["En quelle année la Côte d'Ivoire est-elle devenue indépendante ?","1960","1957","1963","1975"],
 ["En quelle année le Ghana est-il devenu indépendant, premier pays d'Afrique subsaharienne à y parvenir ?","1957","1960","1963","1950"],
 ["Qui était Samory Touré ?","Un chef qui a résisté à la conquête coloniale française","Un empereur du Mali médiéval","Un explorateur européen","Un premier ministre du Ghana"]
]));

G('eindep','Indépendances africaines','🕊️','Culture',350,'Associe chaque pays à son année d\'indépendance.', EDU.pairs([
 ["Maroc","1956"],["Ghana","1957"],["Guinée","1958"],["Côte d'Ivoire","1960"],["Algérie","1962"],["Kenya","1963"],["Zambie","1964"],["Gambie","1965"],
 ["Botswana","1966"],["Angola","1975"],["Djibouti","1977"],["Zimbabwe","1980"],["Namibie","1990"],["Soudan du Sud","2011"],["Libye","1951"]
]));

G('efrise','Frise chronologique','⏳','Culture',30,'Classe les grands événements du plus ancien au plus récent.', EDU.order([
 { q:'Du plus ancien au plus récent :', items:['Construction des pyramides de Gizeh','Fondation légendaire de Rome','Empire du Mali de Soundiata Keïta','Voyage de Christophe Colomb','Révolution française'] },
 { q:'Du plus ancien au plus récent :', items:['Imprimerie de Gutenberg','Révolution française','Premier vol des frères Wright','Première Guerre mondiale','Premiers pas sur la Lune'] },
 { q:'Du plus ancien au plus récent :', items:['Indépendance du Ghana','Indépendance de la Côte d\'Ivoire','Création de l\'OUA','Mandela président','Création de l\'Union africaine'] },
 { q:'Du plus ancien au plus récent :', items:['Invention du téléphone','Premier film des frères Lumière','Découverte de la pénicilline','Lancement du World Wide Web','Premier iPhone'] },
 { q:'Du plus ancien au plus récent :', items:['Chute de l\'Empire romain d\'Occident','Couronnement de Charlemagne','Pèlerinage de Mansa Moussa','Chute de Constantinople','Vasco de Gama aux Indes'] },
 { q:'Du plus ancien au plus récent :', items:['Début de la Seconde Guerre mondiale','Création de l\'ONU','Premiers pas sur la Lune','Chute du mur de Berlin','Euro en circulation'] }
]));

G('ecivil','Grandes civilisations','🏺','Culture',40,'Incas, Égyptiens, Romains, Mayas… qui a construit quoi ?', EDU.quiz([
 ["Quelle civilisation a construit le Machu Picchu ?","Les Incas","Les Mayas","Les Aztèques","Les Romains"],
 ["Quel peuple a inventé l'écriture cunéiforme en Mésopotamie ?","Les Sumériens","Les Égyptiens","Les Grecs","Les Mayas"],
 ["Quel peuple a construit le Colisée à Rome ?","Les Romains","Les Grecs","Les Perses","Les Égyptiens"],
 ["Qui a construit les pyramides de Gizeh ?","Les anciens Égyptiens","Les Romains","Les Incas","Les Phéniciens"],
 ["Quelle civilisation antique a créé les Jeux olympiques ?","Les Grecs","Les Romains","Les Égyptiens","Les Perses"],
 ["Comment s'appelle l'écriture de l'Égypte antique faite de dessins ?","Les hiéroglyphes","Le cunéiforme","L'alphabet latin","Le braille"],
 ["Quelle civilisation d'Amérique centrale a bâti Chichén Itzá ?","Les Mayas","Les Incas","Les Romains","Les Vikings"],
 ["Quel ancien royaume, dans l'actuel Soudan, a bâti de nombreuses pyramides ?","Le royaume de Koush (Nubie)","Carthage","L'empire du Mali","Le Dahomey","~Les pyramides nubiennes de Méroé sont nombreuses et plus petites que celles d'Égypte."],
 ["Quelle cité d'Afrique du Nord fut la grande rivale de Rome ?","Carthage","Alexandrie","Tombouctou","Gao"],
 ["Quel empire était dirigé par Gengis Khan ?","L'Empire mongol","L'Empire romain","L'Empire ottoman","L'empire du Mali"],
 ["Quel peuple vivait à Tenochtitlan, l'actuelle Mexico ?","Les Aztèques","Les Incas","Les Égyptiens","Les Perses"],
 ["Quel peuple a inventé la démocratie à Athènes ?","Les Grecs","Les Romains","Les Mayas","Les Mongols"],
 ["Dans quel pays se trouvent les églises creusées dans le roc de Lalibela ?","L'Éthiopie","Le Maroc","Le Ghana","L'Angola"]
]));

G('epersos','Personnages célèbres','⭐','Culture',55,'Associe chaque personnage à ce qui l\'a rendu célèbre.', EDU.pairs([
 ["Marie Curie","Radioactivité"],["Nelson Mandela","Lutte contre l'apartheid"],["Albert Einstein","Relativité"],["Léonard de Vinci","Peintre et inventeur"],["Mozart","Musique classique"],
 ["Cheikh Anta Diop","Historien sénégalais"],["Wangari Maathai","Planter des arbres (prix Nobel de la paix)"],["Miriam Makeba","Chanteuse sud-africaine"],["Pelé","Football"],
 ["Usain Bolt","Course de vitesse"],["Mansa Moussa","Empereur du Mali"],["Isaac Newton","Gravitation"],["Louis Pasteur","Vaccins"],["Victor Hugo","Les Misérables"],["Chinua Achebe","Le monde s'effondre"]
]));
})();

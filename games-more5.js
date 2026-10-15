/* ==========================================================
   LOT 5 — Culture générale et savoir (8 jeux)
   Drapeaux, Capitales, Animaux, Vrai ou Faux, Quiz Foot,
   Quiz Sciences, Quiz Histoire, Tables de multiplication
   ========================================================== */
(function(){
'use strict';
const U = SCCG.util, rnd = U.rnd, shuffle = U.shuffle, pick = U.pick, el = U.el, esc = U.esc;
const R = d=>{ d.isNew = true; SCCG.register(d); };

/* ---------- Données ---------- */
const FLAG = cc=> String.fromCodePoint.apply(null, cc.split('').map(ch=>0x1F1E6+ch.charCodeAt(0)-65));
const COUNTRIES = [
  ['CI',"Côte d'Ivoire"],['FR','France'],['SN','Sénégal'],['ML','Mali'],['BF','Burkina Faso'],['GH','Ghana'],['NG','Nigeria'],['CM','Cameroun'],['MA','Maroc'],['DZ','Algérie'],
  ['TN','Tunisie'],['EG','Égypte'],['KE','Kenya'],['ET','Éthiopie'],['ZA','Afrique du Sud'],['CD','RD Congo'],['GA','Gabon'],['TG','Togo'],['BJ','Bénin'],['NE','Niger'],
  ['GN','Guinée'],['MR','Mauritanie'],['MG','Madagascar'],['TZ','Tanzanie'],['UG','Ouganda'],['AO','Angola'],['BR','Brésil'],['AR','Argentine'],['US','États-Unis'],['CA','Canada'],
  ['MX','Mexique'],['CO','Colombie'],['CL','Chili'],['GB','Royaume-Uni'],['DE','Allemagne'],['IT','Italie'],['ES','Espagne'],['PT','Portugal'],['BE','Belgique'],['CH','Suisse'],
  ['NL','Pays-Bas'],['SE','Suède'],['NO','Norvège'],['PL','Pologne'],['RU','Russie'],['TR','Turquie'],['CN','Chine'],['JP','Japon'],['KR','Corée du Sud'],['IN','Inde'],
  ['ID','Indonésie'],['SA','Arabie saoudite'],['AU','Australie'],['NZ','Nouvelle-Zélande'],['GR','Grèce'],['IE','Irlande'],['UA','Ukraine'],['PK','Pakistan']
];
const CAPITALS = [
  ["Côte d'Ivoire",'Yamoussoukro'],['France','Paris'],['Sénégal','Dakar'],['Mali','Bamako'],['Burkina Faso','Ouagadougou'],['Ghana','Accra'],['Nigeria','Abuja'],['Cameroun','Yaoundé'],
  ['Maroc','Rabat'],['Algérie','Alger'],['Tunisie','Tunis'],['Égypte','Le Caire'],['Kenya','Nairobi'],['Éthiopie','Addis-Abeba'],['RD Congo','Kinshasa'],['Congo (Brazzaville)','Brazzaville'],
  ['Gabon','Libreville'],['Togo','Lomé'],['Niger','Niamey'],['Guinée','Conakry'],['Mauritanie','Nouakchott'],['Madagascar','Antananarivo'],['Ouganda','Kampala'],['Angola','Luanda'],
  ['Sierra Leone','Freetown'],['Libéria','Monrovia'],['Gambie','Banjul'],['Rwanda','Kigali'],['Zambie','Lusaka'],['Zimbabwe','Harare'],['Mozambique','Maputo'],['Brésil','Brasilia'],
  ['Argentine','Buenos Aires'],['États-Unis','Washington'],['Canada','Ottawa'],['Mexique','Mexico'],['Colombie','Bogota'],['Chili','Santiago'],['Royaume-Uni','Londres'],['Allemagne','Berlin'],
  ['Italie','Rome'],['Espagne','Madrid'],['Portugal','Lisbonne'],['Belgique','Bruxelles'],['Suisse','Berne'],['Pays-Bas','Amsterdam'],['Suède','Stockholm'],['Norvège','Oslo'],
  ['Pologne','Varsovie'],['Russie','Moscou'],['Turquie','Ankara'],['Chine','Pékin'],['Japon','Tokyo'],['Corée du Sud','Séoul'],['Inde','New Delhi'],['Arabie saoudite','Riyad'],
  ['Australie','Canberra'],['Nouvelle-Zélande','Wellington'],['Grèce','Athènes'],['Irlande','Dublin'],['Ukraine','Kiev'],['Pakistan','Islamabad']
];
const ANIMALS = [
  ['🦁','Lion'],['🐘','Éléphant'],['🦒','Girafe'],['🦓','Zèbre'],['🦏','Rhinocéros'],['🦛','Hippopotame'],['🐒','Singe'],['🦍','Gorille'],['🐊','Crocodile'],['🐍','Serpent'],
  ['🐢','Tortue'],['🦎','Lézard'],['🐸','Grenouille'],['🐟','Poisson'],['🐬','Dauphin'],['🐋','Baleine'],['🦈','Requin'],['🐙','Pieuvre'],['🦀','Crabe'],['🦋','Papillon'],
  ['🐝','Abeille'],['🐞','Coccinelle'],['🕷️','Araignée'],['🦂','Scorpion'],['🐓','Coq'],['🦆','Canard'],['🦅','Aigle'],['🦉','Hibou'],['🦜','Perroquet'],['🐧','Pingouin'],
  ['🦩','Flamant rose'],['🐑','Mouton'],['🐐','Chèvre'],['🐄','Vache'],['🐎','Cheval'],['🐖','Cochon'],['🐇','Lapin'],['🐕','Chien'],['🐈','Chat'],['🐫','Chameau'],
  ['🦘','Kangourou'],['🐨','Koala'],['🐼','Panda'],['🐻','Ours'],['🦊','Renard'],['🐺','Loup'],['🦔','Hérisson'],['🐿️','Écureuil'],['🦇','Chauve-souris'],['🐜','Fourmi'],
  ['🐌','Escargot'],['🐅','Tigre'],['🐆','Léopard'],['🦌','Cerf']
];
const TF = [
  ["Le Nil traverse l'Égypte.",true],["L'eau bout à 100 °C au niveau de la mer.",true],["Abidjan est la capitale économique de la Côte d'Ivoire.",true],["Un triangle a trois côtés.",true],
  ["La Terre tourne autour du Soleil.",true],["Les baleines sont des mammifères.",true],["Le cœur humain a quatre cavités.",true],["Le Sahara est un désert.",true],["L'araignée a huit pattes.",true],
  ["Le Kilimandjaro se trouve en Tanzanie.",true],["Les dauphins respirent avec des poumons.",true],["La Lune est un satellite naturel de la Terre.",true],["Au football, une équipe a 11 joueurs sur le terrain.",true],
  ["Le français est une langue romane.",true],["Une année bissextile compte 366 jours.",true],["Le chocolat est fabriqué à partir de fèves de cacao.",true],["Le symbole chimique de l'or est Au.",true],
  ["Les chauves-souris sont des mammifères.",true],["Le Soleil est une étoile.",true],["La girafe est le plus grand animal terrestre.",true],["Yamoussoukro est la capitale politique de la Côte d'Ivoire.",true],
  ["7 × 8 = 56",true],["La Joconde a été peinte par Léonard de Vinci.",true],["L'Everest est la plus haute montagne du monde.",true],["Napoléon Bonaparte a été empereur des Français.",true],
  ["Le Pacifique est le plus grand océan du monde.",true],["Un hexagone a 6 côtés.",true],["L'oxygène est indispensable à la respiration humaine.",true],["Le mercure est liquide à température ambiante.",true],
  ["Le Soleil tourne autour de la Terre.",false],["Les chauves-souris sont des oiseaux.",false],["Le Nil se jette dans l'océan Atlantique.",false],["L'araignée est un insecte.",false],
  ["Un hexagone a 5 côtés.",false],["La capitale de l'Australie est Sydney.",false],["L'eau est composée d'oxygène et d'azote.",false],["Le Sahara se trouve en Amérique du Sud.",false],
  ["La Côte d'Ivoire est devenue indépendante en 1975.",false],["Le cœur est situé dans la tête.",false],["Pluton est l'une des 8 planètes du système solaire.",false],["Un kilomètre fait 100 mètres.",false],
  ["Le français est la langue la plus parlée du monde.",false],["L'Arctique est un désert chaud.",false],["9 × 6 = 56",false],["Le Brésil se trouve en Afrique.",false],["Les dauphins sont des poissons.",false],
  ["La Terre est plate.",false],["La Lune produit sa propre lumière.",false],["Paris est la capitale de l'Italie.",false],["Le cacao est cultivé principalement en Antarctique.",false],["Une année compte 10 mois.",false],
  ["Le Pacifique est le plus petit océan du monde.",false],["Les abeilles produisent du lait.",false],["Au football, les joueurs de champ peuvent jouer le ballon à la main.",false],
  ["Le Kilimandjaro se trouve au Kenya.",false],["Le Canada est un pays d'Afrique.",false],["Le diamant est une matière très tendre.",false]
];
const QFOOT = [
  ["Combien de joueurs par équipe sont sur le terrain au football ?",'11','10','9','12'],
  ["Quel pays a gagné la Coupe du monde 2018 ?",'La France','La Croatie','La Belgique','Le Brésil'],
  ["Quel pays a gagné la Coupe du monde 2022 ?",'L\'Argentine','La France','Le Maroc','La Croatie'],
  ["Qui a remporté la Coupe d'Afrique des Nations 2023 (jouée en 2024) ?",'La Côte d\'Ivoire','Le Nigeria','L\'Égypte','Le Sénégal'],
  ["Combien de fois la Côte d'Ivoire a-t-elle gagné la CAN (jusqu'en 2023) ?",'3 fois','1 fois','2 fois','4 fois'],
  ["Quel pays a gagné le plus de Coupes du monde ?",'Le Brésil','L\'Allemagne','L\'Italie','L\'Argentine'],
  ["Quel joueur est surnommé « CR7 » ?",'Cristiano Ronaldo','Karim Benzema','Kylian Mbappé','Neymar'],
  ["Quel club joue au stade Santiago Bernabéu ?",'Le Real Madrid','Le FC Barcelone','Manchester United','Le Bayern Munich'],
  ["De quel pays vient Lionel Messi ?",'L\'Argentine','Le Brésil','L\'Espagne','L\'Uruguay'],
  ["Combien de Coupes du monde le Brésil a-t-il gagnées ?",'5','4','3','6'],
  ["Quel attaquant ivoirien a marqué le tir au but décisif de la finale de la Ligue des champions 2012 avec Chelsea ?",'Didier Drogba','Yaya Touré','Salomon Kalou','Wilfried Bony'],
  ["Combien de minutes dure un match de football (hors prolongation) ?",'90','80','100','120'],
  ["Quelle couleur de carton exclut un joueur du terrain ?",'Rouge','Jaune','Bleu','Vert'],
  ["Quel pays a organisé la Coupe du monde 2010, la première en Afrique ?",'L\'Afrique du Sud','L\'Égypte','Le Maroc','Le Nigeria'],
  ["Quel pays a organisé la Coupe du monde 2022 ?",'Le Qatar','La Russie','Le Brésil','L\'Allemagne'],
  ["Quel est le surnom de l'équipe nationale du Sénégal ?",'Les Lions de la Teranga','Les Éléphants','Les Super Eagles','Les Lions Indomptables'],
  ["Quel est le surnom de l'équipe nationale du Cameroun ?",'Les Lions Indomptables','Les Éléphants','Les Aigles de Carthage','Les Pharaons'],
  ["Quel est le surnom de l'équipe nationale du Nigeria ?",'Les Super Eagles','Les Lions de l\'Atlas','Les Black Stars','Les Étalons'],
  ["Quel est le surnom de l'équipe nationale du Maroc ?",'Les Lions de l\'Atlas','Les Fennecs','Les Panthères','Les Léopards'],
  ["Quel pays a remporté la Coupe du monde 1998 ?",'La France','Le Brésil','L\'Italie','L\'Allemagne'],
  ["Quel pays a remporté la première CAN en 1957 ?",'L\'Égypte','Le Ghana','Le Soudan','L\'Éthiopie'],
  ["Quel pays a gagné l'Euro 2016 ?",'Le Portugal','La France','L\'Allemagne','L\'Espagne'],
  ["Quel pays a remporté la CAN 2021 (jouée en 2022) ?",'Le Sénégal','L\'Égypte','Le Cameroun','L\'Algérie'],
  ["Quel pays a gagné la Coupe du monde 2014 ?",'L\'Allemagne','L\'Argentine','Les Pays-Bas','Le Brésil'],
  ["Quel pays a remporté la CAN 2019 ?",'L\'Algérie','Le Sénégal','Le Nigeria','Madagascar'],
  ["Quel joueur a remporté 8 Ballons d'or (jusqu'en 2023) ?",'Lionel Messi','Cristiano Ronaldo','Michel Platini','Johan Cruyff']
];
const QSCI = [
  ["Quelle est la planète la plus chaude du système solaire ?",'Vénus','Mercure','Mars','Jupiter'],
  ["Quel est le gaz le plus abondant de l'atmosphère terrestre ?",'L\'azote','L\'oxygène','Le dioxyde de carbone','L\'hydrogène'],
  ["Combien d'os compte le squelette d'un adulte ?",'206','150','300','412'],
  ["Quelle est la vitesse approximative de la lumière ?",'300 000 km/s','30 000 km/s','3 000 km/s','3 000 000 km/s'],
  ["Quel est le symbole chimique du sodium ?",'Na','S','So','Sd'],
  ["Quel organe produit l'insuline ?",'Le pancréas','Le foie','Le rein','L\'estomac'],
  ["Quelle partie de la plante absorbe l'eau du sol ?",'Les racines','Les feuilles','Les fleurs','La tige'],
  ["Quelle planète est célèbre pour ses anneaux ?",'Saturne','Mars','Mercure','Vénus'],
  ["Quelle est la plus petite unité du vivant ?",'La cellule','L\'organe','Le tissu','L\'atome'],
  ["De quoi le Soleil est-il principalement composé ?",'D\'hydrogène et d\'hélium','De fer','D\'oxygène','De charbon'],
  ["Combien de dents a un adulte (dentition complète) ?",'32','28','36','24'],
  ["Quel scientifique est associé à la chute de la pomme et à la gravité ?",'Isaac Newton','Albert Einstein','Galilée','Marie Curie'],
  ["À quelle température l'eau gèle-t-elle (au niveau de la mer) ?",'0 °C','10 °C','−10 °C','32 °C'],
  ["Quel métal est liquide à température ambiante ?",'Le mercure','Le fer','Le plomb','L\'aluminium'],
  ["Quel est l'organe principal de la respiration ?",'Les poumons','Le cœur','Le foie','L\'estomac'],
  ["Quelle est la formule chimique du dioxyde de carbone ?",'CO2','CO','O2','H2O'],
  ["Quelle est l'unité de mesure de la force ?",'Le newton','Le watt','Le joule','Le volt'],
  ["Quelle planète est la plus éloignée du Soleil ?",'Neptune','Uranus','Saturne','Pluton'],
  ["Comment s'appelle le processus par lequel les plantes fabriquent leur nourriture grâce à la lumière ?",'La photosynthèse','La digestion','La respiration','La germination'],
  ["Quelle vitamine la peau fabrique-t-elle grâce au soleil ?",'La vitamine D','La vitamine C','La vitamine A','La vitamine B12'],
  ["Quel est le plus grand organe du corps humain ?",'La peau','Le foie','Le cerveau','L\'intestin'],
  ["Comment s'appelle la galaxie qui contient notre système solaire ?",'La Voie lactée','Andromède','Le Triangle','Orion'],
  ["Quel mammifère pond des œufs ?",'L\'ornithorynque','Le kangourou','Le koala','Le dauphin'],
  ["Quelle est la température normale du corps humain ?",'37 °C','30 °C','42 °C','25 °C'],
  ["Combien de planètes compte le système solaire ?",'8','7','9','10']
];
const QHIST = [
  ["En quelle année la Côte d'Ivoire est-elle devenue indépendante ?",'1960','1958','1963','1975'],
  ["Qui fut le premier président de la Côte d'Ivoire ?",'Félix Houphouët-Boigny','Henri Konan Bédié','Laurent Gbagbo','Alassane Ouattara'],
  ["En quelle année a eu lieu la prise de la Bastille ?",'1789','1815','1848','1700'],
  ["Quel explorateur a atteint l'Amérique en 1492 ?",'Christophe Colomb','Vasco de Gama','Magellan','Marco Polo'],
  ["En quelle année a pris fin la Seconde Guerre mondiale ?",'1945','1939','1918','1950'],
  ["Quelle civilisation a construit les pyramides de Gizeh ?",'Les Égyptiens','Les Romains','Les Grecs','Les Mayas'],
  ["Qui fut le premier homme dans l'espace en 1961 ?",'Youri Gagarine','Neil Armstrong','Buzz Aldrin','Alan Shepard'],
  ["Quel empire ouest-africain était dirigé par Mansa Moussa ?",'L\'empire du Mali','L\'empire du Ghana','L\'empire songhaï','Le royaume ashanti'],
  ["Qui a été sacré empereur des Français en 1804 ?",'Napoléon Bonaparte','Louis XIV','Charlemagne','Louis XVI'],
  ["Quel pays a offert la statue de la Liberté aux États-Unis ?",'La France','L\'Angleterre','L\'Espagne','L\'Italie'],
  ["En quelle année le mur de Berlin est-il tombé ?",'1989','1975','1991','1961'],
  ["Qui est devenu président d'Afrique du Sud en 1994 après la fin de l'apartheid ?",'Nelson Mandela','Desmond Tutu','Thabo Mbeki','Jacob Zuma'],
  ["Quel navire a coulé en 1912 après avoir heurté un iceberg ?",'Le Titanic','Le Lusitania','Le Bismarck','Le Queen Mary'],
  ["En quelle année a commencé la Première Guerre mondiale ?",'1914','1905','1920','1939'],
  ["Quel héros a dirigé la révolution haïtienne contre l'esclavage ?",'Toussaint Louverture','Simón Bolívar','Samory Touré','Patrice Lumumba'],
  ["Quelle reine d'Égypte était l'alliée de Jules César ?",'Cléopâtre','Néfertiti','Hatchepsout','Isis'],
  ["Quel peuple a bâti la cité de Machu Picchu ?",'Les Incas','Les Aztèques','Les Mayas','Les Olmèques'],
  ["En quelle année l'esclavage a-t-il été définitivement aboli en France ?",'1848','1789','1802','1905'],
  ["Qui a découvert la pénicilline ?",'Alexander Fleming','Louis Pasteur','Marie Curie','Robert Koch'],
  ["Quel président américain a mené le pays pendant la guerre de Sécession ?",'Abraham Lincoln','George Washington','Theodore Roosevelt','John F. Kennedy'],
  ["En quelle année l'homme a-t-il marché sur la Lune pour la première fois ?",'1969','1959','1975','1965'],
  ["Quel royaume avait pour capitale Abomey ?",'Le Dahomey','L\'Ashanti','Le Mali','Le royaume du Kongo'],
  ["Quelle ville a été ensevelie par l'éruption du Vésuve en 79 ?",'Pompéi','Rome','Athènes','Carthage'],
  ["Quel peuple Jules César dirigeait-il ?",'Les Romains','Les Grecs','Les Gaulois','Les Égyptiens'],
  ["Quel écrivain a écrit « Les Misérables » ?",'Victor Hugo','Émile Zola','Molière','Alexandre Dumas']
];
SCCG.lab.data5 = { COUNTRIES, CAPITALS, ANIMALS, TF, QFOOT, QSCI, QHIST, FLAG };

/* ---------- Moteur de questions réutilisable ---------- */
function makeAsker(api, wrap){
  let cur = null;
  function finish(k){
    cur.locked = true; const q = cur.q, ok = k>=0 && q.opts[k]===q.c, rem = cur.t, cb = cur.cb;
    wrap.querySelectorAll('.g-ans').forEach((b,j)=>{ if(q.opts[j]===q.c) b.classList.add('ok'); else if(j===k) b.classList.add('ko'); });
    api.sfx(ok ? 'good' : 'bad'); if(!ok) api.vibrate(40);
    api.after(ok ? 650 : 1300,()=>cb(ok,rem,k<0));
  }
  api.on(wrap,'click',e=>{ const b = e.target.closest('.g-ans'); if(!b||!cur||cur.locked||api.ended) return; finish(+b.dataset.k); });
  api.every(100,()=>{
    if(!cur||cur.locked) return; cur.t -= 100; const bar = wrap.querySelector('#qbar'); if(bar) bar.style.width = Math.max(0,cur.t/cur.time*100)+'%';
    if(cur.t<=0) finish(-1);
  });
  return { ask(q,time,cb){
    cur = { q, time, t:time, locked:false, cb };
    const head = q.big ? `<div class="g-big-text" style="font-size:84px;">${q.q}</div>` : `<div class="g-q">${esc(q.q)}</div>`;
    wrap.innerHTML = `${q.top?`<p class="hint" style="color:#f6efe4;margin:0;">${esc(q.top)}</p>`:''}<div class="g-bar"><i id="qbar"></i></div>${head}${q.opts.map((o,i)=>`<button class="g-ans" data-k="${i}" ${q.center?'style="text-align:center;"':''}>${esc(o)}</button>`).join('')}`;
  } };
}
/* partie à vies : on enchaîne les questions jusqu'à 3 erreurs */
function livesGame(api, nextQ, time, label){
  api.scroll(true);
  const wrap = el('div','g-col'); api.root.appendChild(wrap); const A = makeAsker(api, wrap);
  let lives = 3, score = 0, good = 0, streak = 0;
  const info = ()=> api.setInfo('❤️'.repeat(lives)+(streak>1?' • 🔥 '+streak:''));
  function next(){
    A.ask(nextQ(good), time, (ok,rem)=>{
      if(ok){ good++; streak++; score += 100+Math.ceil(rem/1000)*4+Math.min(streak,10)*5; api.setScore(score); }
      else { lives--; streak = 0; }
      info(); if(lives<=0) api.end(score,{ title:'Plus de vies !', msg:good+' bonne'+(good>1?'s':'')+' réponse'+(good>1?'s':'')+(label?' ('+label+')':'')+'.' }); else next();
    });
  }
  info(); next();
}
/* série de 10 questions */
function fixedGame(api, bank, n){
  api.scroll(true);
  const qs = shuffle(bank).slice(0,n).map(a=>({ q:a[0], c:a[1], opts:shuffle(a.slice(1)) }));
  const wrap = el('div','g-col'); api.root.appendChild(wrap); const A = makeAsker(api, wrap);
  let i = 0, score = 0, good = 0;
  function next(){
    if(i>=qs.length) return api.end(score,{ win:good>=Math.ceil(n*.7), title:good+' / '+n+' bonnes réponses' });
    const q = Object.assign({ top:'Question '+(i+1)+' / '+n }, qs[i]);
    A.ask(q,15000,(ok,rem)=>{ if(ok){ good++; score += 100+Math.ceil(rem/1000)*4; api.setScore(score); } i++; next(); });
  }
  next();
}
const others = (list,k,c,n)=> shuffle(list.filter(x=>x[k]!==c)).slice(0,n||3).map(x=>x[k]);
const mkQ = (pool,qi,ai,kind)=>{ const it = pick(pool), c = it[ai]; return { q:kind(it), c, opts:shuffle([c].concat(others(pool,ai,c))), center:true }; };

/* ---------------------------------------------------------- DRAPEAUX */
R({ id:'drapeaux', name:'Drapeaux', emoji:'🏳️', cat:'Mots & quiz', hue:10, translate:true,
  desc:'À quel pays appartient ce drapeau ?',
  how:"Un drapeau s'affiche : choisis le bon pays parmi 4 propositions. Tu as 10 secondes par drapeau et 3 vies. Plus tu réponds vite et plus tu enchaînes, plus tu marques de points ! (Si les drapeaux n'apparaissent pas sur ton appareil, tu verras des lettres : c'est le code du pays.)",
  create(api){
    let bag = shuffle(COUNTRIES), idx = 0;
    livesGame(api, ()=>{
      if(idx>=bag.length){ bag = shuffle(COUNTRIES); idx = 0; }
      const it = bag[idx++], c = it[1];
      return { q:FLAG(it[0]), big:true, c, opts:shuffle([c].concat(others(COUNTRIES,1,c))), center:true };
    }, 10000);
  }
});

/* ---------------------------------------------------------- CAPITALES */
R({ id:'capitales', name:'Capitales', emoji:'🏙️', cat:'Mots & quiz', hue:200, translate:true,
  desc:'Quelle est la capitale de ce pays ?',
  how:"Un pays s'affiche : retrouve sa capitale parmi 4 propositions. 10 secondes par question, 3 vies. Plus tu es rapide et plus tu enchaînes de bonnes réponses, plus tu gagnes de points !",
  create(api){
    let bag = shuffle(CAPITALS), idx = 0;
    livesGame(api, ()=>{
      if(idx>=bag.length){ bag = shuffle(CAPITALS); idx = 0; }
      const it = bag[idx++], c = it[1];
      return { q:'Quelle est la capitale de : '+it[0]+' ?', c, opts:shuffle([c].concat(others(CAPITALS,1,c))), center:true };
    }, 10000);
  }
});

/* ---------------------------------------------------------- ANIMAUX */
R({ id:'animaux', name:'Animaux', emoji:'🦁', cat:'Mots & quiz', hue:35, translate:true,
  desc:'Quel est cet animal ?',
  how:"Un animal s'affiche en image : trouve son nom parmi 4 propositions. 8 secondes par animal, 3 vies. Enchaîne les bonnes réponses pour marquer un maximum de points !",
  create(api){
    let bag = shuffle(ANIMALS), idx = 0;
    livesGame(api, ()=>{
      if(idx>=bag.length){ bag = shuffle(ANIMALS); idx = 0; }
      const it = bag[idx++], c = it[1];
      return { q:it[0], big:true, c, opts:shuffle([c].concat(others(ANIMALS,1,c))), center:true };
    }, 8000);
  }
});

/* ---------------------------------------------------------- VRAI OU FAUX */
R({ id:'vraifaux', name:'Vrai ou Faux', emoji:'✅', cat:'Mots & quiz', hue:130, translate:true,
  desc:'Vrai ou faux ? Décide vite !',
  how:"Une affirmation s'affiche : est-elle VRAIE ou FAUSSE ? Réponds en 8 secondes. 3 vies. Plus tu réponds vite et plus tu enchaînes de bonnes réponses, plus tu marques !",
  create(api){
    let bag = shuffle(TF), idx = 0;
    livesGame(api, ()=>{
      if(idx>=bag.length){ bag = shuffle(TF); idx = 0; }
      const it = bag[idx++];
      return { q:it[0], c:it[1] ? 'Vrai' : 'Faux', opts:['Vrai','Faux'], center:true };
    }, 8000);
  }
});

/* ---------------------------------------------------------- QUIZ FOOT / SCIENCES / HISTOIRE */
R({ id:'quizfoot', name:'Quiz Foot', emoji:'⚽', cat:'Mots & quiz', hue:120, translate:true,
  desc:'10 questions sur le football africain et mondial.',
  how:"Réponds à 10 questions sur le football en 15 secondes chacune. Bonne réponse = 100 points + un bonus de rapidité. 7 bonnes réponses ou plus = victoire !",
  create(api){ fixedGame(api,QFOOT,10); }
});
R({ id:'quizsciences', name:'Quiz Sciences', emoji:'🔬', cat:'Mots & quiz', hue:190, translate:true,
  desc:'10 questions sur le corps humain, l\'espace et la nature.',
  how:"Réponds à 10 questions de sciences en 15 secondes chacune. Bonne réponse = 100 points + un bonus de rapidité. 7 bonnes réponses ou plus = victoire !",
  create(api){ fixedGame(api,QSCI,10); }
});
R({ id:'quizhistoire', name:'Quiz Histoire', emoji:'📜', cat:'Mots & quiz', hue:30, translate:true,
  desc:'10 questions sur l\'histoire de l\'Afrique et du monde.',
  how:"Réponds à 10 questions d'histoire en 15 secondes chacune. Bonne réponse = 100 points + un bonus de rapidité. 7 bonnes réponses ou plus = victoire !",
  create(api){ fixedGame(api,QHIST,10); }
});

/* ---------------------------------------------------------- TABLES DE MULTIPLICATION */
R({ id:'tables', name:'Tables de multiplication', emoji:'✖️', cat:'Mots & quiz', hue:260, scoreLabel:'Points',
  desc:'Récite tes tables, le plus vite possible.',
  how:"Une multiplication s'affiche : tape le résultat avec le pavé numérique. Tu as 60 secondes. Une bonne réponse rapporte des points (plus si tu enchaînes), une erreur te fait perdre 3 secondes. Les tables vont de 2 à 12.",
  create(api){
    let a, b, typed = '', score = 0, streak = 0, tLeft = 60, n = 0;
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    const q = el('div','g-big-text'); const out = el('div','g-big-text'); out.style.cssText = 'color:#F2B84B;min-height:52px;'; wrap.appendChild(q); wrap.appendChild(out);
    const box = el('div','g-num'); wrap.appendChild(box);
    const show = ()=>{ q.textContent = a+' × '+b+' = ?'; out.textContent = typed || '…'; };
    function gen(){ a = 2+rnd(11); b = 2+rnd(11); typed = ''; show(); }
    function submit(){
      if(!typed) return;
      if(+typed===a*b){ streak++; n++; score += 10+Math.min(streak,10); api.setScore(score); api.sfx('good'); gen(); }
      else { streak = 0; tLeft = Math.max(0,tLeft-3); api.sfx('bad'); api.vibrate(60); out.classList.add('g-shake'); api.after(300,()=>out.classList.remove('g-shake')); typed = ''; show(); }
    }
    function key(k){
      if(api.ended) return;
      if(k==='back'){ typed = typed.slice(0,-1); show(); } else if(k==='ok') submit();
      else if(typed.length<3){ typed += k; show(); if(typed.length===String(a*b).length) submit(); }
    }
    ['1','2','3','4','5','6','7','8','9','⌫','0','✔'].forEach(k=>{ const bt = el('button',null,k); api.on(bt,'click',()=>{ api.sfx('tap'); key(k==='⌫' ? 'back' : k==='✔' ? 'ok' : k); }); box.appendChild(bt); });
    api.onKey(k=>{ if(k.length===1 && k>='0' && k<='9') key(k); else if(k==='backspace') key('back'); else if(k==='enter') key('ok'); }, true);
    api.every(100,()=>{ tLeft -= .1; api.setInfo('⏱️ '+Math.max(0,Math.ceil(tLeft))+' s'+(streak>1?' • 🔥 '+streak:'')); if(tLeft<=0) api.end(score,{ title:'Temps écoulé !', msg:n+' bonne'+(n>1?'s':'')+' réponse'+(n>1?'s':'')+'.' }); });
    api.setScore(0); gen();
  }
});
})();

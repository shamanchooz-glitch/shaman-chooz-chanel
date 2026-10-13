/* ==========================================================
   JEUX DE MOTS, QUIZ, CALCUL ET RÉFLEXES
   Quiz, Pendu, Mot du jour, Calcul mental, Plus ou moins, Réflexes,
   Simon, Pierre-feuille-ciseaux, Couleurs, Anagramme, Chiffres,
   Tap-tap, Intrus, Ordre
   ========================================================== */
(function(){
'use strict';
const U = SCCG.util, R = SCCG.register, rnd = U.rnd, rndf = U.rndf, shuffle = U.shuffle, pick = U.pick, el = U.el, esc = U.esc;

/* ---------- Données ---------- */
const WORDS = ['ELEPHANT','CROCODILE','ORDINATEUR','TELEPHONE','BANANE','MANGUE','ABIDJAN','FOOTBALL','MAISON','VOITURE','ECOLE','MARCHE','POISSON','PLANTAIN','ATTIEKE','PIROGUE','SAVANE','TAMBOUR','GIRAFE','HIPPOPOTAME','CHAMPION','MUSIQUE','FAMILLE','AMITIE','LIBERTE','SOLEIL','MONTAGNE','RIVIERE','FORET','VILLAGE','CAPITALE','PAYSAGE','BATEAU','AVION','BICYCLETTE','LUNETTES','CHAUSSURE','CHAPEAU','PANTALON','CHEMISE','BIBLIOTHEQUE','CAHIER','CRAYON','TABLEAU','PROFESSEUR','ETUDIANT','HOPITAL','MEDECIN','INFIRMIER','CUISINE','CHAISE','FENETRE','JARDIN','FLEUR','ARBRE','PAPILLON','ABEILLE','SERPENT','TORTUE','PERROQUET','CAMEROUN','SENEGAL','AFRIQUE','EUROPE','PLANETE','GALAXIE','ETOILE','TONNERRE','ORAGE','NUAGE','VENDREDI','SAMEDI','DIMANCHE','JANVIER','FEVRIER','DECEMBRE','ARGENT','TRAVAIL','VACANCES','CINEMA','TELEVISION','JOURNAL','MESSAGE','CHANSON','DANSE','BASKET','TENNIS','NATATION','ATHLETISME','VICTOIRE','COURAGE','SAGESSE','PATIENCE','VOYAGE','AVENTURE','TRESOR','MYSTERE','CHOCOLAT','GATEAU','BONBON','FROMAGE','TOMATE','OIGNON','PIMENT','ARACHIDE','MANIOC','IGNAME','POULET'];
const WORDS5 = ['AVION','BANDE','CHIEN','CHAUD','DANSE','ECOLE','FLEUR','FORET','FRUIT','GARDE','HEURE','JAMBE','MONDE','NUAGE','PIANO','PLAGE','POIRE','POMME','PORTE','RADIO','REINE','ROUGE','SABLE','SALLE','SAUCE','TABLE','TERRE','TIGRE','TRAIN','VERRE','VIVRE','ZEBRE','ARBRE','BALLE','BARBE','BOULE','BRUIT','CARTE','CHAMP','COEUR','CORPS','COURS','DROIT','FAIRE','FERME','FILLE','FOULE','FRERE','GENOU','GLACE','GRAND','HERBE','HOTEL','JOUER','JUSTE','LIVRE','LOURD','MAMAN','NOIRE','OMBRE','ORAGE','PAIRE','PATTE','PLUIE','POUCE','ROUTE','SCENE','SOEUR','SOUPE','SPORT','STYLO','SUCRE','TASSE','TEMPS','TOUCHE','CHAISE'].filter(w=>w.length===5);
const QUIZ = [
  ['Quelle est la capitale politique de la Côte d\'Ivoire ?','Yamoussoukro','Abidjan','Bouaké','San-Pédro'],
  ['Quelle est la capitale économique de la Côte d\'Ivoire ?','Abidjan','Yamoussoukro','Daloa','Korhogo'],
  ['En quelle année la Côte d\'Ivoire est-elle devenue indépendante ?','1960','1958','1963','1975'],
  ['Qui fut le premier président de la Côte d\'Ivoire ?','Félix Houphouët-Boigny','Henri Konan Bédié','Laurent Gbagbo','Alassane Ouattara'],
  ['Quelle monnaie est utilisée en Côte d\'Ivoire ?','Le franc CFA','Le cedi','Le naira','Le dirham'],
  ['Comment surnomme-t-on l\'équipe nationale de football de Côte d\'Ivoire ?','Les Éléphants','Les Lions','Les Aigles','Les Super Eagles'],
  ['Quel pays est le premier producteur de cacao au monde ?','La Côte d\'Ivoire','Le Brésil','L\'Indonésie','Le Mexique'],
  ['L\'attiéké est fabriqué à partir de quelle plante ?','Le manioc','L\'igname','Le maïs','Le riz'],
  ['Quel fleuve traverse l\'Égypte ?','Le Nil','Le Niger','Le Congo','Le Zambèze'],
  ['Quel est le plus haut sommet d\'Afrique ?','Le Kilimandjaro','Le mont Kenya','Le mont Cameroun','Le Toubkal'],
  ['Quel est le plus grand désert chaud du monde ?','Le Sahara','Le Kalahari','Le Gobi','L\'Atacama'],
  ['Quelle est la capitale du Sénégal ?','Dakar','Bamako','Conakry','Banjul'],
  ['Quelle est la capitale du Mali ?','Bamako','Niamey','Ouagadougou','Nouakchott'],
  ['Quelle est la capitale du Burkina Faso ?','Ouagadougou','Bobo-Dioulasso','Niamey','Lomé'],
  ['Quelle est la capitale du Nigeria ?','Abuja','Lagos','Kano','Accra'],
  ['Quelle est la capitale du Ghana ?','Accra','Kumasi','Lomé','Cotonou'],
  ['Quelle est la capitale du Cameroun ?','Yaoundé','Douala','Garoua','Libreville'],
  ['Quelle est la capitale du Kenya ?','Nairobi','Mombasa','Kampala','Dodoma'],
  ['Quelle est la capitale de l\'Égypte ?','Le Caire','Alexandrie','Louxor','Khartoum'],
  ['Quel pays africain a pour capitale Addis-Abeba ?','L\'Éthiopie','Le Kenya','La Tanzanie','Le Soudan'],
  ['Qui fut le premier président de l\'Afrique du Sud démocratique ?','Nelson Mandela','Desmond Tutu','Thabo Mbeki','Jacob Zuma'],
  ['Combien de pays compte l\'Afrique (reconnus par l\'ONU) ?','54','48','60','52'],
  ['Quel est le plus grand pays d\'Afrique par la superficie ?','L\'Algérie','Le Soudan','La RD Congo','La Libye'],
  ['Quel est le plus long fleuve d\'Afrique ?','Le Nil','Le Congo','Le Niger','Le Zambèze'],
  ['Combien de fois la Côte d\'Ivoire a-t-elle remporté la Coupe d\'Afrique des Nations ?','3 fois','1 fois','2 fois','4 fois'],
  ['Quel attaquant ivoirien a marqué le tir au but décisif de la finale de la Ligue des champions 2012 avec Chelsea ?','Didier Drogba','Yaya Touré','Salomon Kalou','Wilfried Bony'],
  ['Quelle est la langue officielle de la Côte d\'Ivoire ?','Le français','L\'anglais','Le baoulé','Le dioula'],
  ['Quel animal figure sur les armoiries de la Côte d\'Ivoire ?','L\'éléphant','Le lion','L\'aigle','Le léopard'],
  ['Quelles sont les couleurs du drapeau ivoirien ?','Orange, blanc, vert','Rouge, jaune, vert','Bleu, blanc, rouge','Vert, blanc, noir'],
  ['Quelle est la formule chimique de l\'eau ?','H2O','CO2','O2','NaCl'],
  ['Quelle est la planète la plus proche du Soleil ?','Mercure','Vénus','Mars','La Terre'],
  ['Quelle est la plus grande planète du système solaire ?','Jupiter','Saturne','Neptune','La Terre'],
  ['Combien de planètes compte le système solaire ?','8','7','9','10'],
  ['Combien de cavités compte le cœur humain ?','4','2','3','5'],
  ['Quel gaz les plantes absorbent-elles pour la photosynthèse ?','Le dioxyde de carbone','L\'oxygène','L\'azote','L\'hydrogène'],
  ['Quel est l\'os le plus long du corps humain ?','Le fémur','Le tibia','L\'humérus','Le radius'],
  ['À quelle température l\'eau bout-elle au niveau de la mer ?','100 °C','90 °C','120 °C','80 °C'],
  ['Quel est le plus grand océan du monde ?','L\'océan Pacifique','L\'océan Atlantique','L\'océan Indien','L\'océan Arctique'],
  ['Combien de côtés a un hexagone ?','6','5','7','8'],
  ['Quel organe pompe le sang dans le corps ?','Le cœur','Le foie','Les poumons','Le rein'],
  ['Quelle planète est surnommée la planète rouge ?','Mars','Vénus','Jupiter','Mercure'],
  ['Quel est le symbole chimique de l\'or ?','Au','Ag','Or','Fe'],
  ['Quel est le plus rapide des animaux terrestres ?','Le guépard','Le lion','L\'antilope','Le cheval'],
  ['Quel est le plus grand animal terrestre ?','L\'éléphant d\'Afrique','La girafe','Le rhinocéros','L\'hippopotame'],
  ['Combien de jours compte une année non bissextile ?','365','364','366','360'],
  ['Combien font 12 × 12 ?','144','124','134','154'],
  ['Quelle est la racine carrée de 81 ?','9','8','7','11'],
  ['Combien de degrés mesure un angle droit ?','90','45','180','60'],
  ['Combien font 15 % de 200 ?','30','15','20','25'],
  ['Quelle est la capitale de la France ?','Paris','Lyon','Marseille','Bordeaux'],
  ['Quel pays a pour capitale Tokyo ?','Le Japon','La Chine','La Corée du Sud','La Thaïlande'],
  ['En quelle année l\'homme a-t-il marché sur la Lune pour la première fois ?','1969','1959','1975','1965'],
  ['Qui a peint la Joconde ?','Léonard de Vinci','Michel-Ange','Picasso','Van Gogh'],
  ['En quelle année a débuté la Révolution française ?','1789','1815','1848','1700'],
  ['Quelle est la plus haute montagne du monde ?','L\'Everest','Le K2','Le Kilimandjaro','Le mont Blanc'],
  ['Quelle est la capitale du Brésil ?','Brasilia','Rio de Janeiro','São Paulo','Salvador'],
  ['Quelle est la capitale de l\'Australie ?','Canberra','Sydney','Melbourne','Perth'],
  ['Quel pays a gagné la Coupe du monde de football en 2022 ?','L\'Argentine','La France','Le Brésil','La Croatie'],
  ['Quel pays a gagné la Coupe du monde de football en 2018 ?','La France','La Croatie','La Belgique','L\'Allemagne'],
  ['Quelle langue compte le plus de locuteurs natifs dans le monde ?','Le chinois mandarin','L\'anglais','L\'espagnol','Le français'],
  ['Dans quel pays se trouvent les pyramides de Gizeh ?','L\'Égypte','Le Mexique','Le Soudan','Le Maroc'],
  ['Quel continent est le plus peuplé ?','L\'Asie','L\'Afrique','L\'Europe','L\'Amérique'],
  ['Combien de joueurs d\'une équipe de football sont sur le terrain ?','11','10','9','12'],
  ['Combien de minutes dure un match de football (sans prolongation) ?','90','80','100','120'],
  ['Quel sport pratique-t-on à Roland-Garros ?','Le tennis','Le golf','Le football','Le rugby'],
  ['Combien d\'anneaux compte le drapeau olympique ?','5','4','6','7'],
  ['Quelle couleur obtient-on en mélangeant du bleu et du jaune ?','Le vert','L\'orange','Le violet','Le marron'],
  ['Combien y a-t-il de secondes dans une heure ?','3 600','360','6 000','60'],
  ['Quel est le contraire de « lent » ?','Rapide','Long','Petit','Fort'],
  ['Quel est le pluriel de « cheval » ?','Chevaux','Chevals','Chevaus','Chevauxs'],
  ['Quel instrument de musique africain est un tambour joué avec les mains, très répandu en Afrique de l\'Ouest ?','Le djembé','Le violon','Le piano','La flûte traversière'],
  ['Quel est le plus petit pays du monde ?','Le Vatican','Monaco','Saint-Marin','Malte'],
  ['Combien de lettres compte l\'alphabet français ?','26','24','25','28'],
  ['Quel animal est surnommé le roi de la savane ?','Le lion','Le tigre','L\'ours','Le loup']
];
SCCG.lab.data = { WORDS, WORDS5, QUIZ };

/* pavé numérique + clavier physique */
function numpad(api, root, onKey){
  const box = el('div','g-num'); root.appendChild(box);
  ['1','2','3','4','5','6','7','8','9','⌫','0','✔'].forEach(k=>{
    const b = el('button',null,k); api.on(b,'click',()=>{ api.sfx('tap'); onKey(k==='⌫' ? 'back' : k==='✔' ? 'ok' : k); }); box.appendChild(b);
  });
  api.onKey(k=>{ if(k.length===1 && k>='0' && k<='9') onKey(k); else if(k==='backspace') onKey('back'); else if(k==='enter') onKey('ok'); }, true);
}
const AZERTY = ['AZERTYUIOP','QSDFGHJKLM','WXCVBN'];
function keyboard(api, root, onLetter, extra){
  const kb = el('div','g-kb'); root.appendChild(kb);
  AZERTY.forEach((row,ri)=>{
    const r = el('div','g-kbrow'); kb.appendChild(r);
    if(ri===2 && extra && extra.enter){ const b = el('button','g-k wide','⏎'); b.dataset.k = 'enter'; r.appendChild(b); }
    row.split('').forEach(ch=>{ const b = el('button','g-k',ch); b.dataset.k = ch; r.appendChild(b); });
    if(ri===2 && extra && extra.back){ const b = el('button','g-k wide','⌫'); b.dataset.k = 'back'; r.appendChild(b); }
  });
  api.on(kb,'click',e=>{ const b = e.target.closest('.g-k'); if(b) onLetter(b.dataset.k); });
  api.onKey(k=>{
    if(k.length===1 && /[a-z]/.test(k)) onLetter(k.toUpperCase()); else if(k==='backspace') onLetter('back'); else if(k==='enter') onLetter('enter');
  }, true);
  return kb;
}

/* ---------------------------------------------------------- QUIZ */
R({ id:'quiz', name:'Quiz Culture', emoji:'❓', cat:'Mots & quiz', hue:45, translate:true,
  desc:'10 questions : Afrique, sciences, sport, monde.',
  how:"Réponds à 10 questions en 15 secondes chacune. Plus tu réponds vite, plus tu gagnes de points (100 points + bonus de rapidité par bonne réponse).",
  create(api){
    api.scroll(true);
    const qs = shuffle(QUIZ).slice(0,10).map(a=>({ q:a[0], c:a[1], opts:shuffle(a.slice(1)) }));
    let i = 0, score = 0, good = 0, tLeft = 15000, locked = false;
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    function show(){
      const q = qs[i]; locked = false; tLeft = 15000;
      wrap.innerHTML = `<p class="hint" style="color:#f6efe4;margin:0;">Question ${i+1} / ${qs.length}</p><div class="g-bar"><i id="qbar"></i></div><div class="g-q">${esc(q.q)}</div>` + q.opts.map((o,k)=>`<button class="g-ans" data-k="${k}">${esc(o)}</button>`).join('');
    }
    function reveal(k){
      const q = qs[i];
      wrap.querySelectorAll('.g-ans').forEach((b,j)=>{ if(q.opts[j]===q.c) b.classList.add('ok'); else if(j===k) b.classList.add('ko'); });
    }
    function next(){ i++; if(i>=qs.length) api.end(score,{ win:good>=7, title:good+' / '+qs.length+' bonnes réponses' }); else show(); }
    function answer(k){
      if(locked || api.ended) return; locked = true; const ok = qs[i].opts[k]===qs[i].c; reveal(k);
      if(ok){ good++; score += 100+Math.ceil(tLeft/1000)*4; api.setScore(score); api.sfx('good'); } else api.sfx('bad');
      api.after(1300,next);
    }
    api.on(wrap,'click',e=>{ const b = e.target.closest('.g-ans'); if(b) answer(+b.dataset.k); });
    api.every(100,()=>{
      if(locked) return; tLeft -= 100; const bar = wrap.querySelector('#qbar'); if(bar) bar.style.width = Math.max(0,tLeft/150)+'%';
      if(tLeft<=0){ locked = true; reveal(-1); api.sfx('bad'); api.toast('Temps écoulé !'); api.after(1300,next); }
    });
    show();
  }
});

/* ---------------------------------------------------------- PENDU */
R({ id:'pendu', name:'Pendu', emoji:'🔤', cat:'Mots & quiz', hue:340, scoreLabel:'Points',
  desc:'Devine le mot lettre par lettre.',
  how:"Touche les lettres pour deviner le mot caché. 7 erreurs et c'est perdu ! Chaque mot trouvé rapporte des points (plus si tu fais peu d'erreurs), puis un nouveau mot arrive.",
  create(api){
    const MAX = 7; let list = shuffle(WORDS), idx = 0, word, found, errs, score = 0, lock = false;
    api.scroll(true);
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    wrap.innerHTML = `<svg viewBox="0 0 120 120" width="150" height="150" style="flex-shrink:0">
      <g stroke="#f6efe4" stroke-width="4" stroke-linecap="round" fill="none">
        <path id="pd1" d="M10 112 H70"/><path id="pd2" d="M30 112 V10 H85 V24"/>
        <circle id="pd3" cx="85" cy="34" r="10"/><path id="pd4" d="M85 44 V74"/>
        <path id="pd5" d="M85 52 L70 66 M85 52 L100 66"/><path id="pd6" d="M85 74 L72 98"/><path id="pd7" d="M85 74 L98 98"/></g></svg>
      <div class="pd-word" id="pdWord"></div><div id="pdInfo" class="hint" style="color:#f6efe4;margin:0;"></div>`;
    const kb = keyboard(api, wrap, letter);
    const keyEl = ch=> kb.querySelector('[data-k="'+ch+'"]');
    function draw(){
      for(let k=1;k<=MAX;k++){ const p = wrap.querySelector('#pd'+k); if(p) p.style.display = errs>=k ? '' : 'none'; }
      wrap.querySelector('#pdWord').textContent = word.split('').map(c=>found[c] ? c : '_').join(' ');
      wrap.querySelector('#pdInfo').textContent = 'Erreurs : '+errs+' / '+MAX;
    }
    function newWord(){
      if(idx>=list.length){ list = shuffle(WORDS); idx = 0; }
      word = list[idx++]; found = {}; errs = 0; lock = false;
      kb.querySelectorAll('.g-k').forEach(k=>{ k.classList.remove('hit','miss','used'); }); draw();
    }
    function letter(ch){
      if(lock || api.ended || ch.length!==1) return; const k = keyEl(ch); if(!k || k.classList.contains('used')) return;
      k.classList.add('used');
      if(word.indexOf(ch)>=0){ found[ch] = 1; k.classList.add('hit'); api.sfx('tap'); } else { errs++; k.classList.add('miss'); api.sfx('bad'); }
      draw();
      if(word.split('').every(c=>found[c])){ lock = true; score += 10+(MAX-errs)*5; api.setScore(score); api.sfx('win'); api.toast('Bien joué ! +'+(10+(MAX-errs)*5)); api.after(1100,newWord); }
      else if(errs>=MAX){ lock = true; api.end(score,{ title:'Pendu !', msg:'Le mot était : '+word }); }
    }
    newWord();
  }
});

/* ---------------------------------------------------------- MOT DU JOUR */
R({ id:'mots', name:'Mot secret', emoji:'🟩', cat:'Mots & quiz', hue:130, scoreLabel:'Points',
  desc:'Trouve le mot de 5 lettres en 6 essais.',
  how:"Écris un mot de 5 lettres et valide avec ⏎. 🟩 lettre bien placée, 🟨 lettre présente mais mal placée, ⬛ absente. Tu as 6 essais par mot. Trouve vite pour gagner plus de points, puis un nouveau mot arrive !",
  create(api){
    const L = 5, T = 6; let list = shuffle(WORDS5), idx = 0, target, rows, cur, score = 0, lock = false;
    api.scroll(true);
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    const grid = el('div'); wrap.appendChild(grid);
    const kb = keyboard(api, wrap, key, { enter:true, back:true });
    const keyEl = ch=> kb.querySelector('[data-k="'+ch+'"]');
    function grade(g){
      const res = Array(L).fill('miss'), left = {};
      for(let i=0;i<L;i++){ if(g[i]===target[i]) res[i] = 'hit'; else left[target[i]] = (left[target[i]]||0)+1; }
      for(let i=0;i<L;i++) if(res[i]!=='hit' && left[g[i]]>0){ res[i] = 'near'; left[g[i]]--; }
      return res;
    }
    function draw(){
      let h = '';
      for(let r=0;r<T;r++){
        h += '<div class="wd-row">';
        for(let c=0;c<L;c++){
          if(r<rows.length) h += `<div class="wd-c ${rows[r].res[c]}">${rows[r].g[c]}</div>`;
          else if(r===rows.length) h += `<div class="wd-c">${cur[c]||''}</div>`;
          else h += '<div class="wd-c"></div>';
        }
        h += '</div>';
      }
      grid.innerHTML = h; api.setInfo('Essai '+Math.min(rows.length+1,T)+'/'+T);
    }
    function newWord(){
      if(idx>=list.length){ list = shuffle(WORDS5); idx = 0; }
      target = list[idx++]; rows = []; cur = ''; lock = false;
      kb.querySelectorAll('.g-k').forEach(k=>{ k.classList.remove('hit','near','miss'); }); draw();
    }
    function key(k){
      if(lock || api.ended) return;
      if(k==='back'){ cur = cur.slice(0,-1); draw(); return; }
      if(k==='enter'){
        if(cur.length<L){ api.toast('5 lettres, s\'il te plaît'); return; }
        const res = grade(cur); rows.push({ g:cur, res });
        cur.split('').forEach((ch,i)=>{ const e = keyEl(ch); if(!e) return; if(res[i]==='hit') e.className = 'g-k hit'; else if(res[i]==='near' && !e.classList.contains('hit')) e.className = 'g-k near'; else if(!e.classList.contains('hit') && !e.classList.contains('near')) e.className = 'g-k miss'; });
        const won = cur===target; cur = ''; draw(); api.sfx(won ? 'win' : 'tap');
        if(won){ lock = true; const pts = (T+1-rows.length)*50; score += pts; api.setScore(score); api.toast('Trouvé ! +'+pts); api.after(1300,newWord); }
        else if(rows.length>=T){ lock = true; api.end(score,{ title:'Raté !', msg:'Le mot était : '+target }); }
        return;
      }
      if(k.length===1 && cur.length<L){ cur += k; api.sfx('tap'); draw(); }
    }
    newWord();
  }
});

/* ---------------------------------------------------------- CALCUL MENTAL */
R({ id:'calcul', name:'Calcul mental', emoji:'➕', cat:'Mots & quiz', hue:15, scoreLabel:'Points',
  desc:'Un maximum de calculs en 60 secondes.',
  how:"Résous un maximum de calculs en 60 secondes avec le pavé numérique. Chaque bonne réponse rapporte des points, et enchaîner les bonnes réponses donne un bonus. Les calculs deviennent de plus en plus difficiles.",
  create(api){
    let a, b, op, ans, typed = '', score = 0, streak = 0, n = 0, tLeft = 60000;
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    const q = el('div','g-big-text'); const out = el('div','g-big-text'); out.style.minHeight = '52px'; out.style.color = '#F2B84B';
    wrap.appendChild(q); wrap.appendChild(out);
    function gen(){
      if(n<5){ op = '+'; a = 1+rnd(20); b = 1+rnd(20); ans = a+b; }
      else if(n<10){ op = rnd(2) ? '+' : '−'; a = 10+rnd(40); b = 1+rnd(Math.min(a,40)); ans = op==='+' ? a+b : a-b; }
      else if(n<16){ op = '×'; a = 2+rnd(8); b = 2+rnd(8); ans = a*b; }
      else { const t = rnd(3); if(t===0){ op = '+'; a = 20+rnd(80); b = 20+rnd(80); ans = a+b; } else if(t===1){ op = '−'; a = 40+rnd(80); b = 10+rnd(a-20); ans = a-b; } else { op = '×'; a = 3+rnd(10); b = 3+rnd(10); ans = a*b; } }
      typed = ''; show();
    }
    const show = ()=>{ q.textContent = a+' '+op+' '+b+' = ?'; out.textContent = typed || '…'; };
    function submit(){
      if(!typed) return;
      if(+typed===ans){ streak++; score += 10+Math.min(streak,10); api.setScore(score); api.sfx('good'); n++; gen(); }
      else { streak = 0; api.sfx('bad'); api.vibrate(60); out.classList.add('g-shake'); api.after(300,()=>out.classList.remove('g-shake')); typed = ''; show(); }
    }
    numpad(api, wrap, k=>{
      if(api.ended) return;
      if(k==='back'){ typed = typed.slice(0,-1); show(); }
      else if(k==='ok') submit();
      else if(typed.length<4){ typed += k; show(); if(typed.length===String(ans).length) submit(); }
    });
    api.every(100,()=>{ tLeft -= 100; api.setInfo('⏱️ '+Math.ceil(tLeft/1000)+' s'+(streak>1?' • 🔥 '+streak:'')); if(tLeft<=0) api.end(score,{ title:'Temps écoulé !', msg:n+' bonne'+(n>1?'s':'')+' réponse'+(n>1?'s':'') }); });
    gen();
  }
});

/* ---------------------------------------------------------- PLUS OU MOINS */
R({ id:'plusmoins', name:'Plus ou moins', emoji:'🎲', cat:'Mots & quiz', hue:200, scoreLabel:'Points',
  desc:'Devine le nombre secret en peu d\'essais.',
  how:"L'ordinateur pense à un nombre. Propose un nombre et il te dit s'il est plus grand ou plus petit. Trouve-le avant la fin de tes essais : à chaque manche réussie, l'intervalle s'agrandit !",
  create(api){
    let round = 0, max, secret, tries, left, typed = '', score = 0, lock = false;
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    const msg = el('div','g-q'); const out = el('div','g-big-text'); out.style.color = '#F2B84B'; wrap.appendChild(msg); wrap.appendChild(out);
    const show = ()=>{ out.textContent = typed || '…'; api.setInfo('Essais restants : '+left); };
    function newRound(){
      round++; max = 50+round*50; secret = 1+rnd(max); tries = Math.ceil(Math.log2(max))+1; left = tries; typed = ''; lock = false;
      msg.textContent = 'Un nombre entre 1 et '+max; show();
    }
    function submit(){
      if(!typed || lock) return; const g = +typed; typed = '';
      if(g<1 || g>max){ api.toast('Entre 1 et '+max); show(); return; }
      left--;
      if(g===secret){ lock = true; const pts = (left+1)*10+round*5; score += pts; api.setScore(score); api.sfx('win'); msg.textContent = '🎉 Trouvé ! +'+pts; api.after(1300,newRound); show(); return; }
      api.sfx('tap'); msg.textContent = g<secret ? '⬆️ Plus grand que '+g : '⬇️ Plus petit que '+g;
      if(left<=0){ lock = true; api.end(score,{ title:'Perdu !', msg:'Le nombre était '+secret }); }
      show();
    }
    numpad(api, wrap, k=>{
      if(lock || api.ended) return;
      if(k==='back'){ typed = typed.slice(0,-1); show(); } else if(k==='ok') submit(); else if(typed.length<4){ typed += k; show(); }
    });
    newRound();
  }
});

/* ---------------------------------------------------------- RÉFLEXES */
R({ id:'reflexes', name:'Test de réflexes', emoji:'⚡', cat:'Réflexes', hue:60, score:'low', scoreLabel:'Moyenne', fmt:v=>v+' ms',
  desc:'À quelle vitesse réagis-tu ? 5 essais.',
  how:"Attends que l'écran passe au vert, puis touche-le le plus vite possible. Si tu touches trop tôt, l'essai recommence. Ton score est la moyenne de 5 essais (en millisecondes) : plus c'est bas, mieux c'est !",
  create(api){
    const box = el('button','g-cell'); box.style.cssText = 'width:100%;max-width:420px;height:min(55vh,360px);border-radius:24px;font-size:22px;padding:20px;'; api.root.appendChild(box);
    let state = 'idle', t0 = 0, times = [], cancel = null;
    function paint(bg,txt){ box.style.background = bg; box.textContent = txt; }
    function arm(){
      state = 'wait'; paint('#a8372b','Attends le vert…'); api.setInfo('Essai '+(times.length+1)+' / 5');
      cancel = api.after(1500+rnd(2800),()=>{ state = 'go'; t0 = performance.now(); paint('#2f8f5f','TOUCHE !'); });
    }
    api.on(box,'pointerdown',e=>{
      e.preventDefault(); if(api.ended) return;
      if(state==='wait'){ if(cancel) cancel(); state = 'early'; api.sfx('bad'); paint('#555','Trop tôt ! Touche pour recommencer'); }
      else if(state==='go'){
        const ms = Math.round(performance.now()-t0); times.push(ms); api.sfx('good');
        const avg = Math.round(times.reduce((s,x)=>s+x,0)/times.length); api.setScore(avg);
        if(times.length>=5){ state = 'done'; api.end(avg,{ win:avg<350, title:'Moyenne : '+avg+' ms', msg:'Tes temps : '+times.join(' • ')+' ms' }); }
        else { state = 'show'; paint('#2b6cb0', ms+' ms — touche pour continuer'); }
      }
      else if(state==='early' || state==='show' || state==='idle') arm();
    });
    paint('#2b6cb0','Touche pour commencer');
  }
});

/* ---------------------------------------------------------- SIMON */
R({ id:'simon', name:'Simon', emoji:'🎵', cat:'Réflexes', hue:300, scoreLabel:'Série',
  desc:'Mémorise et répète la suite de couleurs.',
  how:"Regarde et écoute la suite de couleurs, puis répète-la dans le même ordre en touchant les boutons. À chaque tour, une couleur de plus ! Une erreur et c'est fini.",
  create(api){
    const COL = ['#2f8f5f','#c0392b','#d4a017','#2b6cb0'], FQ = [392,330,262,196];
    const board = el('div','g-board'); api.root.appendChild(board); api.fit(board,1);
    board.innerHTML = '<div class="g-grid" style="grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:calc(var(--u,3px)*3);">'+COL.map((c,i)=>`<button class="sm-btn" data-i="${i}" style="background:${c}" aria-label="Couleur ${i+1}"></button>`).join('')+'</div>';
    const btns = [].slice.call(board.querySelectorAll('.sm-btn'));
    let seq = [], pos = 0, busy = true;
    function flash(i,ms){ btns[i].classList.add('lit'); api.tone(FQ[i],ms/1000,'sine',.12); api.after(ms,()=>btns[i].classList.remove('lit')); }
    function play(){
      busy = true; pos = 0; api.setInfo('Regarde…'); let k = 0; const gap = Math.max(260,520-seq.length*18), on = Math.max(180,360-seq.length*12);
      const step = ()=>{ if(k>=seq.length){ busy = false; api.setInfo('À toi !'); return; } flash(seq[k],on); k++; api.after(gap,step); };
      api.after(700,step);
    }
    function add(){ seq.push(rnd(4)); play(); }
    btns.forEach((b,i)=> api.on(b,'pointerdown',e=>{
      e.preventDefault(); if(busy || api.ended) return; flash(i,200);
      if(seq[pos]!==i){ busy = true; api.sfx('lose'); api.end(seq.length-1,{ title:'Raté !', msg:'Tu as répété '+(seq.length-1)+' tour'+(seq.length>2?'s':'')+'.' }); return; }
      pos++;
      if(pos>=seq.length){ api.setScore(seq.length); busy = true; api.after(700,add); }
    }));
    api.setScore(0); add();
  }
});

/* ---------------------------------------------------------- PIERRE-FEUILLE-CISEAUX */
R({ id:'pfc', name:'Pierre-Feuille-Ciseaux', emoji:'✌️', cat:'Réflexes', hue:180, scoreLabel:'Victoires',
  desc:'Le classique, contre un adversaire rusé.',
  how:"Choisis ✊ pierre, ✋ feuille ou ✌️ ciseaux. La pierre bat les ciseaux, les ciseaux battent la feuille, la feuille bat la pierre. Une victoire = +1 point, une défaite = −1 vie ❤️ (3 vies).",
  create(api){
    const E = ['✊','✋','✌️'], NAMES = ['Pierre','Feuille','Ciseaux'];
    let lives = 3, score = 0, last = -1, lock = false;
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    wrap.innerHTML = '<div id="pfRes" class="g-big-text" style="min-height:130px;font-size:64px;">❔ vs ❔</div><div id="pfMsg" class="g-q">Fais ton choix !</div><div class="g-line" id="pfBtns"></div>';
    const res = wrap.querySelector('#pfRes'), msg = wrap.querySelector('#pfMsg'), bs = wrap.querySelector('#pfBtns');
    E.forEach((e,i)=>{ const b = el('button','g-chip',e); b.style.cssText = 'font-size:44px;padding:12px 22px;'; b.setAttribute('aria-label',NAMES[i]); api.on(b,'click',()=>play(i)); bs.appendChild(b); });
    const info = ()=> api.setInfo('❤️'.repeat(lives));
    function play(p){
      if(lock || api.ended) return; lock = true;
      let ai = rnd(3); if(last>=0 && Math.random()<.4) ai = (last+1)%3; last = p;
      res.textContent = E[p]+' vs '+E[ai];
      if(p===ai){ msg.textContent = 'Égalité !'; api.sfx('tap'); }
      else if((p+2)%3===ai){ score++; api.setScore(score); msg.textContent = 'Gagné ! 🎉'; api.sfx('good'); }
      else { lives--; info(); msg.textContent = 'Perdu…'; api.sfx('bad'); }
      if(lives<=0){ api.end(score,{ title:'Plus de vies !', msg:score+' victoire'+(score>1?'s':'') }); return; }
      api.after(900,()=>{ lock = false; res.textContent = '❔ vs ❔'; msg.textContent = 'Fais ton choix !'; });
    }
    info();
  }
});

/* ---------------------------------------------------------- COULEURS (Stroop) */
R({ id:'couleurs', name:'Couleurs piégées', emoji:'🎨', cat:'Réflexes', hue:330, scoreLabel:'Points',
  desc:'Quelle est la couleur de l\'encre ? Pas du mot !',
  how:"Un mot de couleur s'affiche, mais écrit dans une autre couleur. Touche le NOM de la couleur de l'encre (pas celle qui est écrite !). Tu as 30 secondes. Bonne réponse +10, erreur −5.",
  create(api){
    const C = [['ROUGE','#e74c3c'],['BLEU','#3b82f6'],['VERT','#2f9e5f'],['JAUNE','#f2c94c'],['VIOLET','#a855f7']];
    let score = 0, ink = 0, tLeft = 30000;
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    wrap.innerHTML = '<div class="g-big-text" id="clWord" style="font-size:56px;min-height:90px;"></div><div class="g-col" id="clOpts" style="gap:8px;"></div>';
    const word = wrap.querySelector('#clWord'), opts = wrap.querySelector('#clOpts');
    function next(){
      const w = rnd(C.length); ink = rnd(C.length); if(Math.random()<.25) ink = w;
      word.textContent = C[w][0]; word.style.color = C[ink][1];
      const names = shuffle(C.map((c,i)=>i)).slice(0,4); if(names.indexOf(ink)<0) names[rnd(4)] = ink;
      opts.innerHTML = names.map(i=>`<button class="g-ans" data-i="${i}" style="text-align:center;">${C[i][0]}</button>`).join('');
    }
    api.on(opts,'click',e=>{
      const b = e.target.closest('.g-ans'); if(!b || api.ended) return;
      if(+b.dataset.i===ink){ score += 10; api.sfx('good'); } else { score = Math.max(0,score-5); api.sfx('bad'); api.vibrate(50); }
      api.setScore(score); next();
    });
    api.every(100,()=>{ tLeft -= 100; api.setInfo('⏱️ '+Math.ceil(tLeft/1000)+' s'); if(tLeft<=0) api.end(score,{ title:'Temps écoulé !' }); });
    next();
  }
});

/* ---------------------------------------------------------- ANAGRAMME */
R({ id:'anagramme', name:'Mots mélangés', emoji:'🔀', cat:'Mots & quiz', hue:250, scoreLabel:'Points',
  desc:'Remets les lettres dans le bon ordre.',
  how:"Les lettres d'un mot sont mélangées. Touche-les dans le bon ordre pour reformer le mot. Touche une lettre placée pour la retirer. Tu as 90 secondes : trouve un maximum de mots !",
  create(api){
    let list = shuffle(WORDS.filter(w=>w.length<=8)), idx = 0, word, tiles, placed, score = 0, tLeft = 90000, n = 0;
    api.scroll(true);
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    wrap.innerHTML = '<div class="g-line" id="amSlots" style="min-height:58px;"></div><div class="g-line" id="amTiles"></div><div class="g-line"><button class="g-chip" id="amSkip">⏭️ Passer (−5)</button><button class="g-chip" id="amClear">↺ Effacer</button></div>';
    const slots = wrap.querySelector('#amSlots'), tl = wrap.querySelector('#amTiles');
    function draw(){
      slots.innerHTML = word.split('').map((_,i)=> placed[i]!=null ? `<button class="g-chip on" data-s="${i}" style="min-width:42px;font-size:22px;">${tiles[placed[i]]}</button>` : `<span class="g-chip" style="min-width:42px;font-size:22px;opacity:.35;">·</span>`).join('');
      tl.innerHTML = tiles.map((t,i)=> placed.indexOf(i)>=0 ? '<span class="g-chip" style="visibility:hidden;min-width:42px;font-size:22px;">·</span>' : `<button class="g-chip" data-t="${i}" style="min-width:42px;font-size:22px;">${t}</button>`).join('');
    }
    function newWord(){
      if(idx>=list.length){ list = shuffle(list); idx = 0; }
      word = list[idx++]; let t; do { t = shuffle(word.split('')); } while(t.join('')===word);
      tiles = t; placed = Array(word.length).fill(null); draw();
    }
    function check(){
      if(placed.some(p=>p==null)) return;
      const guess = placed.map(p=>tiles[p]).join('');
      if(guess===word){ n++; const pts = 10+word.length*3; score += pts; api.setScore(score); api.sfx('win'); api.toast('+'+pts); newWord(); }
      else { api.sfx('bad'); api.vibrate(60); slots.classList.add('g-shake'); api.after(350,()=>{ slots.classList.remove('g-shake'); placed = Array(word.length).fill(null); draw(); }); }
    }
    api.on(tl,'click',e=>{ const b = e.target.closest('[data-t]'); if(!b || api.ended) return; const k = placed.indexOf(null); if(k<0) return; placed[k] = +b.dataset.t; api.sfx('tap'); draw(); check(); });
    api.on(slots,'click',e=>{ const b = e.target.closest('[data-s]'); if(!b || api.ended) return; placed[+b.dataset.s] = null; draw(); });
    api.on(wrap.querySelector('#amClear'),'click',()=>{ placed = Array(word.length).fill(null); draw(); });
    api.on(wrap.querySelector('#amSkip'),'click',()=>{ if(api.ended) return; score = Math.max(0,score-5); api.setScore(score); newWord(); });
    api.every(100,()=>{ tLeft -= 100; api.setInfo('⏱️ '+Math.ceil(tLeft/1000)+' s'); if(tLeft<=0) api.end(score,{ title:'Temps écoulé !', msg:n+' mot'+(n>1?'s':'')+' trouvé'+(n>1?'s':'') }); });
    newWord();
  }
});

/* ---------------------------------------------------------- MÉMOIRE DES CHIFFRES */
R({ id:'chiffres', name:'Mémoire des chiffres', emoji:'🧠', cat:'Réflexion', hue:195, scoreLabel:'Niveau',
  desc:'Retiens une suite de chiffres de plus en plus longue.',
  how:"Une suite de chiffres s'affiche quelques secondes. Mémorise-la, puis écris-la avec le pavé numérique. À chaque réussite, la suite s'allonge d'un chiffre. Une erreur et c'est fini !",
  create(api){
    let len = 3, seq = '', typed = '', phase = 'show', score = 0;
    const wrap = el('div','g-col'); api.root.appendChild(wrap);
    const big = el('div','g-big-text'); big.style.cssText = 'font-size:46px;letter-spacing:6px;min-height:64px;'; const msg = el('div','g-q'); wrap.appendChild(msg); wrap.appendChild(big);
    function round(){
      seq = ''; for(let i=0;i<len;i++) seq += rnd(10); typed = ''; phase = 'show';
      msg.textContent = 'Mémorise !'; big.textContent = seq; big.style.color = '#F2B84B'; api.setInfo('Suite de '+len+' chiffres');
      api.after(900+len*550,()=>{ phase = 'type'; msg.textContent = 'À toi : écris la suite'; big.textContent = '…'; big.style.color = '#fff'; });
    }
    function submit(){
      if(+typed.length<len) return;
      if(typed===seq){ score = len-2; api.setScore(score); api.sfx('good'); len++; phase = 'wait'; msg.textContent = 'Bravo !'; big.textContent = '✅'; api.after(800,round); }
      else { phase = 'wait'; api.sfx('lose'); api.end(score,{ title:'Raté !', msg:'La suite était : '+seq }); }
    }
    numpad(api, wrap, k=>{
      if(phase!=='type' || api.ended) return;
      if(k==='back') typed = typed.slice(0,-1); else if(k==='ok'){ submit(); return; } else if(typed.length<len) typed += k;
      big.textContent = typed || '…'; if(typed.length===len) submit();
    });
    api.setScore(0); round();
  }
});

/* ---------------------------------------------------------- TAP-TAP */
R({ id:'taptap', name:'Tap-tap', emoji:'👆', cat:'Réflexes', hue:10,
  desc:'Combien de touches en 10 secondes ?',
  how:"Touche le gros bouton le plus vite possible ! Le chrono de 10 secondes démarre à ta première touche. Utilise plusieurs doigts si tu veux !",
  create(api){
    let taps = 0, started = false, tLeft = 10000;
    const b = el('button','g-cell'); b.style.cssText = 'width:min(80vw,340px);height:min(80vw,340px);border-radius:50%;background:radial-gradient(circle at 35% 30%,#ffb26b,#c0511f);font-size:30px;box-shadow:0 8px 0 #7a2f10;'; b.textContent = 'TOUCHE !'; api.root.appendChild(b);
    api.on(b,'pointerdown',e=>{ e.preventDefault(); if(api.ended || tLeft<=0) return; started = true; taps++; api.setScore(taps); api.sfx('tap'); b.style.transform = 'translateY(4px)'; api.after(60,()=>{ b.style.transform = ''; }); });
    api.every(100,()=>{
      if(!started) return; tLeft -= 100; api.setInfo('⏱️ '+(tLeft/1000).toFixed(1)+' s');
      if(tLeft<=0){ api.end(taps,{ title:'Temps écoulé !', msg:(taps/10).toFixed(1)+' touches par seconde' }); }
    });
    api.setScore(0); api.setInfo('⏱️ 10.0 s');
  }
});

/* ---------------------------------------------------------- INTRUS */
R({ id:'intrus', name:"Trouve l'intrus", emoji:'🔍', cat:'Réflexes', hue:160, scoreLabel:'Points',
  desc:'Repère le symbole qui n\'est pas comme les autres.',
  how:"Dans la grille, un seul symbole est légèrement différent des autres. Touche-le le plus vite possible ! La grille grandit au fil du jeu. Tu as 40 secondes. Une erreur te coûte 3 secondes.",
  create(api){
    const PAIRS = [['😀','😃'],['🙂','🙃'],['🍎','🍏'],['🐶','🐕'],['🐱','🐈'],['🌕','🌝'],['🔵','🟣'],['🍊','🍑'],['🧡','❤️'],['😊','😄'],['⭐','🌟'],['🔴','🟠']];
    let found = 0, tLeft = 40000, odd = 0, n = 3, wrap = el('div','g-board');
    api.root.appendChild(wrap); api.fit(wrap,1);
    function build(){
      n = Math.min(7,3+Math.floor(found/3)); const p = pick(PAIRS), a = rnd(2) ? p[0] : p[1], b = a===p[0] ? p[1] : p[0];
      odd = rnd(n*n); const fs = Math.max(4, 18-n*1.8);
      wrap.innerHTML = `<div class="g-grid" style="grid-template-columns:repeat(${n},1fr);grid-template-rows:repeat(${n},1fr);">${Array.from({length:n*n},(_,i)=>`<button class="g-cell" data-i="${i}" style="font-size:calc(var(--u,3px)*${fs})">${i===odd?b:a}</button>`).join('')}</div>`;
    }
    api.on(wrap,'click',e=>{
      const c = e.target.closest('.g-cell'); if(!c || api.ended) return;
      if(+c.dataset.i===odd){ found++; api.setScore(found*10); api.sfx('good'); build(); }
      else { tLeft -= 3000; api.sfx('bad'); api.vibrate(60); wrap.classList.add('g-shake'); api.after(300,()=>wrap.classList.remove('g-shake')); }
    });
    api.every(100,()=>{ tLeft -= 100; api.setInfo('⏱️ '+Math.max(0,Math.ceil(tLeft/1000))+' s'); if(tLeft<=0) api.end(found*10,{ title:'Temps écoulé !', msg:found+' intrus trouvés' }); });
    build();
  }
});

/* ---------------------------------------------------------- ORDRE (table de Schulte) */
R({ id:'ordre', name:"Tape dans l'ordre", emoji:'🔢', cat:'Réflexes', hue:230, score:'low', scoreLabel:'Temps', fmt:v=>(v/10).toFixed(1)+' s',
  desc:'Touche les nombres de 1 à 25 le plus vite possible.',
  how:"Les nombres de 1 à 25 sont mélangés dans la grille. Touche-les dans l'ordre croissant, le plus vite possible. Le chrono démarre dès que tu commences.",
  create(api){
    const board = el('div','g-board'); api.root.appendChild(board); api.fit(board,1);
    const nums = shuffle(Array.from({length:25},(_,i)=>i+1));
    board.innerHTML = `<div class="g-grid" style="grid-template-columns:repeat(5,1fr);grid-template-rows:repeat(5,1fr);">${nums.map(n=>`<button class="g-cell" data-n="${n}" style="font-size:calc(var(--u,3px)*8)">${n}</button>`).join('')}</div>`;
    let next = 1, t = 0, started = false;
    api.on(board,'click',e=>{
      const c = e.target.closest('.g-cell'); if(!c || api.ended) return;
      if(+c.dataset.n!==next){ api.sfx('bad'); c.classList.add('g-shake'); api.after(300,()=>c.classList.remove('g-shake')); return; }
      started = true; c.style.background = 'rgba(47,143,95,.5)'; c.style.color = 'rgba(255,255,255,.4)'; api.sfx('tap'); next++;
      api.setInfo('Prochain : '+Math.min(next,25));
      if(next>25) api.end(t,{ win:true, title:'Terminé !' });
    });
    api.every(100,()=>{ if(started){ t++; api.setScore(t); } });
    api.setScore(0); api.setInfo('Prochain : 1');
  }
});
})();

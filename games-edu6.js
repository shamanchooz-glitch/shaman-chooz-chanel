/* ==========================================================
   LOT ÉDUCATIF 6 — 200 jeux éducatifs et instructifs (aucune clé API)
   Calcul mental (40), Tables de multiplication (12), Pourcentages (8), Suites logiques (20),
   Calcul de l'heure (20), Capitales (20), Drapeaux (20), Mémoire pays (20),
   Mots mélangés des métiers (20), Savoir-être professionnel (10 quiz + 10 vrai/faux).
   Nécessite games-edu-core.js (chargé avant). Chaque jeu est branché sur une mécanique existante.
   ========================================================== */
(function(){
'use strict';
if(!window.EDU) return;
const EG = EDU.G, U = SCCG.util, rnd = U.rnd, shuffle = U.shuffle;
const ri = (a,b)=> a + rnd(b - a + 1);
let N = 0;
const G = (name, emoji, cat, desc, fn)=>{ N++; EG('x6-' + N, name, emoji, cat, (N * 37) % 360, desc, fn); };

/* ---------------- Données ---------------- */
const P = 'CI:Yamoussoukro:Côte d\'Ivoire,FR:Paris:France,SN:Dakar:Sénégal,ML:Bamako:Mali,BF:Ouagadougou:Burkina Faso,GH:Accra:Ghana,NG:Abuja:Nigeria,TG:Lomé:Togo,BJ:Porto-Novo:Bénin,CM:Yaoundé:Cameroun,GA:Libreville:Gabon,MA:Rabat:Maroc,DZ:Alger:Algérie,TN:Tunis:Tunisie,EG:Le Caire:Égypte,KE:Nairobi:Kenya,ZA:Pretoria:Afrique du Sud,ET:Addis-Abeba:Éthiopie,CD:Kinshasa:RD Congo,CG:Brazzaville:Congo,GN:Conakry:Guinée,NE:Niamey:Niger,TD:N\'Djamena:Tchad,MG:Antananarivo:Madagascar,US:Washington:États-Unis,CA:Ottawa:Canada,BR:Brasilia:Brésil,AR:Buenos Aires:Argentine,GB:Londres:Royaume-Uni,DE:Berlin:Allemagne,ES:Madrid:Espagne,IT:Rome:Italie,PT:Lisbonne:Portugal,BE:Bruxelles:Belgique,CH:Berne:Suisse,TR:Ankara:Turquie,SA:Riyad:Arabie saoudite,AE:Abou Dhabi:Émirats arabes unis,IN:New Delhi:Inde,CN:Pékin:Chine,JP:Tokyo:Japon'.split(',').map(x=>x.split(':'));
const flag = c => String.fromCodePoint.apply(null, c.split('').map(x=>127397 + x.charCodeAt(0)));
const PAYS = P.map(x=>x[2]), CAPS = P.map(x=>x[1]);
const others = (arr, x)=> shuffle(arr.filter(y=>y !== x)).slice(0, 3);
const slice = (k, step, n)=> Array.from({length:n}, (_,j)=> P[(k*step + j) % P.length]);

const METIERS = 'MENAGERE:Elle entretient et range la maison,CUISINIER:Il prépare les repas,CHAUFFEUR:Il conduit des passagers ou des marchandises,JARDINIER:Il entretient les plantes et les pelouses,GARDIEN:Il surveille et protège un lieu,NOUNOU:Elle garde et s\'occupe des enfants,VENDEUR:Il propose et vend des produits aux clients,CAISSIER:Il encaisse les paiements,SECRETAIRE:Elle organise les rendez-vous et le courrier,COMPTABLE:Il tient les comptes d\'une entreprise,MACON:Il construit des murs,PLOMBIER:Il répare les tuyaux et les robinets,ELECTRICIEN:Il installe le courant et les lampes,COUTURIERE:Elle confectionne des vêtements,COIFFEUR:Il coupe et coiffe les cheveux,LIVREUR:Il apporte les commandes aux clients,INFIRMIER:Il soigne les malades,MAITRESSE:Elle enseigne aux enfants,SERVEUR:Il sert les clients au restaurant,MANAGER:Il dirige et organise une équipe,CONSEILLER:Il écoute et guide les clients,TECHNICIEN:Il installe et répare des appareils,EMPLOYEUR:Il offre un travail et paie un salaire,CANDIDAT:Il cherche un emploi,CONTRAT:Il fixe les règles entre employeur et employé,ENTRETIEN:Rencontre pour parler d\'un poste,COMPETENCE:Ce que l\'on sait bien faire,HONNETE:Qui dit toujours la vérité,COURAGE:La force de continuer malgré la difficulté,DYNAMIQUE:Plein d\'énergie,SERIEUX:Qui fait son travail avec soin,PLACEMENT:Aider une personne à trouver un poste,RECRUTEUR:Il cherche et choisit des candidats,FORMATION:Apprentissage d\'un métier,CARRIERE:Le parcours professionnel d\'une vie,SALAIRE:L\'argent reçu pour son travail,EXPERIENCE:Ce que l\'on a déjà appris en travaillant,PONCTUEL:Qui arrive toujours à l\'heure,MOTIVATION:L\'envie de réussir'.split(',').map(x=>x.split(':'));

const Q = 'Que faire si tu arrives en retard ?|Prévenir et t\'excuser|Ne rien dire|Mentir;Un employé honnête…|dit la vérité|cache ses erreurs|prend sans demander;Pour un entretien, il faut…|être ponctuel et poli|arriver très en retard|rester silencieux;Un bon CV est…|clair et vrai|rempli de mensonges|illisible;Tu casses un objet chez ton employeur :|tu le dis tout de suite|tu fuis|tu accuses un collègue;Le respect du contrat, c\'est…|tenir ses engagements|faire ce qu\'on veut|ignorer les horaires;Face à un client mécontent :|rester calme et à l\'écoute|crier|partir;Pour bien travailler en équipe :|s\'entraider|cacher les informations|critiquer tout le monde;Un employeur sérieux…|paie à temps|retarde les salaires|change le contrat sans prévenir;Une bonne qualité au travail :|le courage|la paresse|la ruse;Pour apprendre un nouveau métier :|poser des questions|faire semblant de savoir|abandonner;Tu trouves de l\'argent perdu au travail :|tu le rends|tu le gardes|tu le caches;La sécurité au travail, c\'est…|respecter les consignes|les ignorer|courir partout;Une tenue au travail doit être…|propre et adaptée|sale|négligée;Pour réussir, il faut…|persévérer|se décourager vite|attendre sans agir;Le téléphone pendant le service :|on l\'utilise le moins possible|on joue sans arrêt|on filme tout le monde'.split(';').map(x=>x.split('|'));

/* ---------------- 1. Calcul mental (40) ---------------- */
[['+','additions'],['−','soustractions'],['×','multiplications'],['÷','divisions']].forEach(op=>{
  for(let L = 1; L <= 10; L++){
    G('Calcul ' + op[0] + ' — niveau ' + L, '🧮', 'Maths & logique', 'Des ' + op[1] + ' de niveau ' + L + ' : calcule vite avec le clavier.', EDU.gen(function(l){
      const M = 5 * L + 2 * l; let a, b, q, r;
      if(op[0] === '+'){ a = ri(1,M); b = ri(1,M); q = a + ' + ' + b + ' = ?'; r = a + b; }
      else if(op[0] === '−'){ a = ri(5,M+5); b = ri(1,a); q = a + ' − ' + b + ' = ?'; r = a - b; }
      else if(op[0] === '×'){ a = ri(2,4+L); b = ri(2,5+Math.min(l,5)); q = a + ' × ' + b + ' = ?'; r = a * b; }
      else { b = ri(2,5+Math.min(L,6)); r = ri(2,5+L); a = b * r; q = a + ' ÷ ' + b + ' = ?'; }
      return { q, a:r };
    },{ mode:'numpad', how:'Un calcul s\'affiche. Tape la réponse avec le clavier numérique puis OK. 60 secondes ; le niveau monte quand tu réussis.' }));
  }
});

/* ---------------- 2. Tables de multiplication (12) ---------------- */
for(let t = 2; t <= 13; t++){
  G('Table de ' + t, '✖️', 'Maths & logique', 'Révise la table de ' + t + ' le plus vite possible.', EDU.gen(function(){
    const b = ri(2,12); return { q: t + ' × ' + b + ' = ?', a: t * b };
  },{ mode:'numpad', how:'Tape le résultat de la multiplication puis OK. 60 secondes, chaque erreur coûte du temps.' }));
}

/* ---------------- 3. Pourcentages (8) ---------------- */
[10,20,25,50,5,30,75,15].forEach(p=>{
  G(p + ' % d\'un nombre', '💯', 'Maths & logique', 'Calcule ' + p + ' % de plusieurs nombres.', EDU.gen(function(){
    const n = ri(1,20) * 20; return { q: p + ' % de ' + n + ' = ?', a: n * p / 100 };
  },{ mode:'numpad', how:'Calcule le pourcentage demandé et tape la réponse puis OK. 60 secondes.' }));
});

/* ---------------- 4. Suites logiques (20) ---------------- */
for(let k = 0; k < 20; k++){
  G('Suite logique ' + (k + 1), '🔢', 'Maths & logique', k % 2 ? 'Trouve le nombre suivant (on multiplie à chaque fois).' : 'Trouve le nombre suivant (on ajoute à chaque fois).', EDU.gen(function(l){
    const a = ri(1,9);
    if(k % 2 === 0){ const d = ri(2, 3 + k + l); return { q: a + ', ' + (a+d) + ', ' + (a+2*d) + ', ' + (a+3*d) + ', … ?', a: a + 4*d }; }
    const m = 2 + ri(0,1); return { q: a + ', ' + a*m + ', ' + a*m*m + ', ' + a*m*m*m + ', … ?', a: a*m*m*m*m };
  },{ mode:'numpad', how:'Observe la suite de nombres, trouve la règle et tape le nombre suivant puis OK. 60 secondes.' }));
}

/* ---------------- 5. Calcul de l'heure (20) ---------------- */
const fh = t => Math.floor(t/60) % 24 + 'h' + String(t % 60).padStart(2,'0');
for(let k = 0; k < 20; k++){
  G('L\'heure à calculer ' + (k + 1), '⏰', 'Maths & logique', 'Quelle heure sera-t-il dans quelques minutes ?', EDU.gen(function(){
    const t = ri(6,20) * 60 + 5 * ri(0,11), d = 5 * ri(2,18), a = fh(t + d), w = new Set([a]);
    while(w.size < 4){ w.add(fh(t + d + 5 * ri(-6,6))); }
    return { q: 'Il est ' + fh(t) + '. Dans ' + d + ' minutes, il sera…', a, opts: shuffle(Array.from(w)) };
  },{ how:'Calcule l\'heure demandée et choisis la bonne réponse. 60 secondes.' }));
}

/* ---------------- 6. Capitales (20) ---------------- */
for(let k = 0; k < 20; k++){
  const sens = k % 2, set = slice(k, 3, 12);
  G('Capitales du monde ' + (k + 1), '🏛️', 'Géographie', sens ? 'De quel pays cette ville est-elle la capitale ?' : 'Retrouve la capitale de chaque pays.', EDU.quiz(set.map(p=> sens
    ? [p[1] + ' est la capitale de quel pays ?', p[2]].concat(others(PAYS, p[2]))
    : ['Quelle est la capitale : ' + p[2] + ' ?', p[1]].concat(others(CAPS, p[1]))), { n:10, time:12 }));
}

/* ---------------- 7. Drapeaux (20) ---------------- */
for(let k = 0; k < 20; k++){
  G('Drapeaux du monde ' + (k + 1), '🚩', 'Géographie', 'À quel pays appartient ce drapeau ?', EDU.quiz(slice(k, 2, 12).map(p=>
    ['À quel pays appartient ce drapeau ? ' + flag(p[0]), p[2]].concat(others(PAYS, p[2]))), { n:10, time:12 }));
}

/* ---------------- 8. Mémoire pays (20) ---------------- */
for(let k = 0; k < 20; k++){
  const flags = k % 2;
  G('Mémoire ' + (flags ? 'drapeaux' : 'capitales') + ' ' + (Math.floor(k/2) + 1), flags ? '🚩' : '🏛️', 'Géographie', flags ? 'Associe chaque drapeau à son pays.' : 'Associe chaque pays à sa capitale.',
    EDU.memo(slice(k, 3, 12).map(p=> flags ? [flag(p[0]), p[2]] : [p[2], p[1]])));
}

/* ---------------- 9. Mots mélangés des métiers (20) ---------------- */
for(let k = 0; k < 20; k++){
  G('Mots du travail ' + (k + 1), '🔤', 'Langue & mots', 'Remets les lettres dans l\'ordre : métiers et mots du monde du travail.', EDU.scramble(
    Array.from({length:12}, (_,j)=> METIERS[(k * 2 + j * 3) % METIERS.length]), { n:8 }));
}

/* ---------------- 10. Savoir-être professionnel (20) ---------------- */
for(let k = 0; k < 10; k++){
  G('Savoir-être pro ' + (k + 1), '🤝', 'Métiers & carrière', 'Quel est le bon réflexe au travail ?',
    EDU.quiz(Array.from({length:8}, (_,j)=>{ const q = Q[(k * 3 + j * 2) % Q.length]; return [q[0], q[1], q[2], q[3], '~Le bon réflexe : ' + q[1] + '.']; }), { n:8, time:15 }));
}
const TF = [];
Q.forEach(q=>{ TF.push([q[0] + ' → ' + q[1], true, 'Oui, c\'est le bon réflexe.']); TF.push([q[0] + ' → ' + q[2], false, 'Non : le bon réflexe est « ' + q[1] + ' ».']); TF.push([q[0] + ' → ' + q[3], false, 'Non : le bon réflexe est « ' + q[1] + ' ».']); });
for(let k = 0; k < 10; k++){
  G('Vrai ou faux : bons réflexes ' + (k + 1), '✅', 'Métiers & carrière', 'Vrai ou faux ? Les bonnes attitudes en milieu professionnel.', EDU.tf(shuffle(TF).slice(0, 14), { n:12 }));
}
})();

/* ==========================================================
   LOT ÉDUCATIF 5 — Argent & vie pratique (9), Numérique (7), Détente (4)
   Nécessite games-edu-core.js (chargé avant).
   ========================================================== */
(function(){
'use strict';
if(!window.EDU) return;
const G = EDU.G, U = SCCG.util, rnd = U.rnd, pick = U.pick, shuffle = U.shuffle;
const ri = (a,b)=> a + rnd(b - a + 1);
const fcfa = n => Number(n).toLocaleString('fr-FR') + ' FCFA';
const uniq4 = (correct, extras)=>{ const s = new Set([String(correct)]); extras.forEach(x=>{ if(s.size < 4) s.add(String(x)); }); let k = 1; while(s.size < 4){ s.add(String(correct) + ' ' + '.'.repeat(k++)); } return shuffle(Array.from(s)); };

/* ---------------------------------------------------------- ARGENT & VIE PRATIQUE */
G('emonnaie','Rendu de monnaie','💵','Argent & vie pratique',130,'Tiens la caisse : rends la monnaie en FCFA, pièce par pièce.', EDU.change());

G('ebudget','Besoin, envie ou épargne ?','🐷','Argent & vie pratique',330,'Range chaque dépense dans la bonne case de ton budget.', EDU.sort(['🏠 Besoin','🎁 Envie','🐷 Épargne'],[
 ["Loyer",0],["Nourriture de base",0],["Eau et électricité",0],["Transport pour aller travailler",0],["Médicaments prescrits",0],["Frais de scolarité",0],
 ["Dernier téléphone à la mode",1],["Repas dans un restaurant chic",1],["Troisième paire de chaussures de marque",1],["Jeux vidéo",1],["Abonnement de streaming",1],["Sortie au cinéma",1],
 ["Mettre de côté pour un projet",2],["Fonds pour les urgences",2],["Cotisation d'épargne collective (tontine)",2],["Compte d'épargne",2],["Épargne pour acheter du matériel de travail",2]
],{ how:'Un besoin est indispensable pour vivre ou travailler ; une envie est agréable mais pas indispensable ; l\'épargne, c\'est l\'argent mis de côté pour plus tard. Classe chaque dépense ! 3 vies ❤️.' }));

G('eremise','Remises et soldes','🏷️','Argent & vie pratique',20,'Calcule le prix à payer après une remise.', EDU.gen(function(L){
 const price = pick([2000,4000,5000,8000,10000,12000,15000,20000,25000,40000]);
 const pct = pick(L < 2 ? [10,50] : L < 4 ? [10,20,25,50] : [10,15,20,25,30,50]); const pay = price - price*pct/100;
 if(price*pct % 100 !== 0) return { q:'Un article coûte 10 000 FCFA. Remise de 20 %. Combien paies-tu ?', a:fcfa(8000), opts:shuffle([fcfa(8000),fcfa(9000),fcfa(2000),fcfa(7500)]) };
 return { q:'Un article coûte ' + fcfa(price) + '. Remise de ' + pct + ' %. Combien paies-tu ?', a:fcfa(pay), opts:uniq4(fcfa(pay), [fcfa(price*pct/100), fcfa(price - pct*10), fcfa(price + price*pct/100), fcfa(price - price*pct/200)]) };
},{ how:'Une remise de 10 % = on enlève le dixième du prix ; 50 % = la moitié ; 25 % = le quart. Calcule le prix final à payer. Attention : ne confonds pas le prix final avec le montant de la remise ! 60 secondes.' }));

G('einterets','Épargne et intérêts','🏦','Argent & vie pratique',150,'Calcule les intérêts d\'une épargne (intérêts simples).', EDU.gen(function(L){
 const P = pick([20000,50000,100000,200000,500000]), r = pick(L < 2 ? [2,5,10] : [2,4,5,10]), y = ri(1, Math.min(3, L + 1));
 return { q:'Tu places ' + fcfa(P) + ' à ' + r + ' % d\'intérêt simple par an, pendant ' + y + ' an' + (y>1?'s':'') + '. Combien d\'intérêts gagnes-tu au total (en FCFA) ?', a:P*r*y/100 };
},{ mode:'numpad', how:'Intérêts simples = somme placée × taux ÷ 100 × nombre d\'années. Exemple : 100 000 FCFA à 5 % pendant 2 ans = 100 000 × 5 ÷ 100 × 2 = 10 000 FCFA. Tape la réponse en FCFA (sans espaces). 60 secondes.' }));

G('eprixquant','Prix et quantités','🛒','Argent & vie pratique',35,'Calcule le total de tes courses au marché.', EDU.gen(function(L){
 const items = [['kg de riz',[600,650,700,750,800]],['kg de tomates',[400,500,600,800]],['kg de poisson',[1500,2000,2500,3000]],['litres d\'huile',[1000,1250,1500]],['kg d\'oignons',[300,400,500]],['kg de bananes',[200,250,300]],['pains',[100,150,200]],['kg de viande',[2500,3000,3500]]];
 const it = pick(items), p = pick(it[1]), n = ri(2, Math.min(12, 3 + L*2));
 return { q:n + ' ' + it[0] + ' à ' + p.toLocaleString('fr-FR') + ' FCFA l\'unité. Combien paies-tu au total (en FCFA) ?', a:n*p };
},{ mode:'numpad', how:'Prix total = quantité × prix unitaire. Tape le total en FCFA (sans espaces). 60 secondes, chaque erreur coûte 3 secondes.' }));

G('efinance','Vocabulaire de l\'argent','📖','Argent & vie pratique',100,'Épargne, crédit, inflation… associe chaque mot à sa définition.', EDU.pairs([
 ["Épargne","Argent mis de côté"],["Revenu","Argent qu'on reçoit"],["Dépense","Argent qu'on dépense"],["Budget","Plan de ses revenus et dépenses"],["Crédit","Somme empruntée à rembourser"],["Intérêt","Prix d'un emprunt ou gain d'une épargne"],
 ["Inflation","Hausse générale des prix"],["Dette","Somme qu'on doit rembourser"],["Bénéfice","Gain après avoir payé les coûts"],["Facture","Document qui demande un paiement"],["Salaire","Paiement du travail effectué"],["Taux de change","Valeur d'une monnaie dans une autre"]
]));

G('emobile','Mobile money : bons réflexes','📱','Argent & vie pratique',150,'Vrai ou faux ? Protège ton argent et évite les arnaques.', EDU.tf([
 ["Ton code secret (PIN) de mobile money doit rester secret, même avec un ami ou un agent.",true,"Personne de sérieux ne te demandera jamais ton code secret."],
 ["Un « agent du service client » qui t'appelle pour avoir ton code et « débloquer ton compte » est digne de confiance.",false,"C'est une arnaque classique : raccroche et contacte toi-même le service client officiel."],
 ["Un message annonçant que tu as gagné une grosse somme, à condition de payer des frais, est probablement une arnaque.",true,"On ne paie jamais pour recevoir un gain : n'envoie rien et ne clique sur aucun lien."],
 ["Avant de valider un transfert, on peut vérifier le numéro et le nom du destinataire.",true,"Une erreur d'un chiffre envoie l'argent à quelqu'un d'autre."],
 ["Il est prudent de garder les messages de confirmation de ses transactions.",true,"Ils servent de preuve en cas de problème."],
 ["On peut prêter son téléphone déverrouillé à un inconnu, sans le surveiller.",false,"Il pourrait voir ou utiliser tes applications et ton argent."],
 ["En cas d'erreur de numéro lors d'un envoi, il faut vite contacter le service client de l'opérateur.",true,"Plus on agit vite, plus on a de chances de récupérer l'argent."],
 ["Un lien reçu par SMS qui demande tes identifiants de paiement est forcément sûr.",false,"Les faux liens servent à voler tes informations."],
 ["Changer régulièrement son code PIN et éviter 1234 ou sa date de naissance améliore la sécurité.",true,"Un code facile à deviner est un code facile à voler."],
 ["Tu peux faire confiance à un inconnu qui te promet de multiplier ton argent très vite.",false,"Les promesses de gains faciles cachent souvent une arnaque."],
 ["Écrire son code PIN au dos de son téléphone est une bonne façon de ne pas l'oublier.",false,"Si le téléphone est perdu ou volé, ton argent est en danger."],
 ["Les frais d'un transfert peuvent varier selon le montant et l'opérateur.",true,"Regarde toujours les frais affichés avant de confirmer."]
]));

G('eentrepr','Entrepreneuriat','🚀','Argent & vie pratique',20,'Client, bénéfice, concurrence : le vocabulaire de celui qui crée son activité.', EDU.quiz([
 ["Qu'est-ce qu'un client ?","Une personne qui achète un produit ou un service","Une personne qui vend","Un employé","Un voisin"],
 ["Qu'est-ce que le chiffre d'affaires ?","Le total des ventes","Le total des dépenses","Le salaire du patron","Le nombre d'employés"],
 ["Qu'est-ce que le bénéfice ?","Ce qu'il reste quand on retire les coûts des ventes","Le total des ventes","Le prix d'achat","Le loyer"],
 ["Pourquoi faire un budget avant de lancer une activité ?","Pour prévoir les coûts et les gains","Pour faire joli","Pour payer des impôts en moins","Pour copier un voisin"],
 ["Qu'est-ce qu'un business plan ?","Un document qui décrit son projet, ses clients et ses finances","Un contrat de mariage","Un jeu de société","Une carte de visite"],
 ["Quelle question faut-il se poser d'abord avant de créer un produit ?","À quel besoin répond-il ?","De quelle couleur sera-t-il ?","Combien de photos poster ?","Qui sera jaloux ?"],
 ["Que veut dire « fidéliser un client » ?","Faire en sorte qu'il revienne acheter","Le chasser","Lui vendre une seule fois","L'oublier"],
 ["Qu'est-ce que la concurrence ?","Les autres entreprises qui vendent la même chose","Les clients","Les employés","Les fournisseurs"],
 ["Pourquoi noter ses ventes et ses dépenses ?","Pour savoir si on gagne de l'argent","Pour remplir un cahier","Pour rien","Pour faire peur aux clients"],
 ["Qu'est-ce qu'un fournisseur ?","Celui qui fournit les produits ou matières nécessaires","Celui qui achète","Celui qui travaille la nuit","Celui qui fait de la publicité"],
 ["Qu'est-ce qu'un investissement ?","Une somme dépensée aujourd'hui pour gagner plus demain","Une dépense inutile","Un cadeau","Une dette"],
 ["Qu'est-ce qu'une marque ?","Un nom ou un symbole qui identifie les produits d'une entreprise","Une tache sur un mur","Un prix","Une taxe"]
]));

G('ebenefice','Calcul du bénéfice','💰','Argent & vie pratique',45,'Prix d\'achat, prix de vente : combien gagnes-tu ?', EDU.gen(function(L){
 const buy = pick([200,300,400,500,600,800,1000,1500,2000]), margin = pick([50,100,150,200,250,300,500]), sell = buy + margin;
 if(L < 3){ return { q:'Tu achètes un article ' + fcfa(buy) + ' et tu le vends ' + fcfa(sell) + '. Quel est ton bénéfice sur cet article (en FCFA) ?', a:margin }; }
 const n = ri(3, 20); if(L < 5) return { q:'Tu achètes ' + n + ' articles à ' + fcfa(buy) + ' pièce et tu les vends ' + fcfa(sell) + ' pièce. Quel est ton bénéfice total (en FCFA) ?', a:n*margin };
 const fr = pick([500,1000,2000]); return { q:'Tu achètes ' + n + ' articles à ' + fcfa(buy) + ' pièce, tu paies ' + fcfa(fr) + ' de transport, et tu les vends ' + fcfa(sell) + ' pièce. Quel est ton bénéfice net (en FCFA) ?', a:n*margin - fr };
},{ mode:'numpad', how:'Bénéfice = prix de vente − prix d\'achat (− les autres frais). Pour plusieurs articles, multiplie le bénéfice d\'un article par le nombre d\'articles. Tape la réponse en FCFA. 60 secondes.' }));

/* ---------------------------------------------------------- NUMÉRIQUE */
G('ecyber','Sécurité en ligne','🔐','Numérique',210,'Vrai ou faux ? Protège tes comptes et tes données.', EDU.tf([
 ["Un bon mot de passe est long et mélange lettres, chiffres et symboles.",true,"Plus il est long et varié, plus il est difficile à deviner."],
 ["Utiliser le même mot de passe partout est une bonne idée.",false,"Si un site est piraté, tous tes autres comptes sont en danger."],
 ["On peut partager son mot de passe avec ses amis proches.",false,"Un mot de passe est personnel, comme une clé de maison."],
 ["Un e-mail qui demande de cliquer d'urgence pour « vérifier ton compte » peut être une arnaque (hameçonnage).",true,"Va toi-même sur le site officiel au lieu de cliquer sur le lien."],
 ["Les mises à jour du téléphone corrigent souvent des failles de sécurité.",true,"Les installer protège ton appareil."],
 ["Le cadenas dans la barre d'adresse (https) signifie que la connexion est chiffrée.",true,"Mais attention : il ne garantit pas que le site est honnête."],
 ["Ce qu'on publie en ligne peut être copié et rester visible très longtemps.",true,"Réfléchis avant de publier une photo ou une information privée."],
 ["Il est prudent d'accepter toutes les demandes d'amis de personnes inconnues.",false,"Tu ne sais pas qui se cache derrière un profil."],
 ["La double authentification (code envoyé par SMS ou application) renforce la protection d'un compte.",true,"Même si quelqu'un trouve ton mot de passe, il lui manque le code."],
 ["Une application téléchargée sur un site inconnu est toujours sans danger.",false,"Mieux vaut passer par les magasins d'applications officiels."],
 ["Il vaut mieux ne pas publier publiquement son adresse ou son numéro de téléphone.",true,"Ces informations peuvent être utilisées par des escrocs."],
 ["Un antivirus ou la protection intégrée du téléphone peut aider à détecter des logiciels malveillants.",true,"Il faut le garder à jour."]
]));

G('einfo','Vocabulaire informatique','🧠','Numérique',260,'Navigateur, cloud, pare-feu… associe chaque mot à son rôle.', EDU.pairs([
 ["Navigateur","Programme pour visiter des sites web"],["Moteur de recherche","Outil pour trouver des pages web"],["Mot de passe","Code secret pour accéder à un compte"],["Clé USB","Mémoire portable pour transporter des fichiers"],
 ["Wi-Fi","Connexion Internet sans fil"],["Écran tactile","Écran qu'on commande avec les doigts"],["Imprimante","Machine qui met un document sur papier"],["Application","Programme installé sur un téléphone"],
 ["Cloud","Stockage de fichiers sur Internet"],["Pare-feu","Protection contre les accès non autorisés"],["Sauvegarde","Copie de sécurité de ses fichiers"],["Logiciel","Programme informatique"],
 ["Télécharger","Copier un fichier depuis Internet vers son appareil"],["Mise à jour","Nouvelle version qui corrige et améliore"]
]));

G('eraccourcis','Raccourcis clavier','⌨️','Numérique',0,'Ctrl + C, Ctrl + Z… associe chaque raccourci à son action.', EDU.pairs([
 ["Ctrl + C","Copier"],["Ctrl + V","Coller"],["Ctrl + X","Couper"],["Ctrl + Z","Annuler"],["Ctrl + A","Tout sélectionner"],["Ctrl + S","Enregistrer"],["Ctrl + P","Imprimer"],
 ["Ctrl + F","Rechercher un mot"],["Alt + Tab","Changer de fenêtre"],["Ctrl + N","Nouveau document"],["Ctrl + B","Mettre en gras"],["Ctrl + U","Souligner"],["F5","Actualiser la page"]
]));

G('ereseaux','Internet et réseaux sociaux','🌐','Numérique',200,'Fake news, spam, streaming : comprends le web et les réseaux.', EDU.quiz([
 ["Que signifie « www » ?","World Wide Web","Web Wide World","Wide World Wire","West World Web"],
 ["Qu'est-ce qu'un navigateur web ?","Un programme pour visiter des sites (Chrome, Firefox…)","Un jeu vidéo","Un câble","Un moteur de voiture"],
 ["Que signifie URL ?","L'adresse d'une page web","Un mot de passe","Un virus","Un type de téléphone"],
 ["Qu'est-ce qu'un hashtag ?","Un mot précédé de # pour classer un sujet","Un virus","Un câble","Une photo"],
 ["On se moque de toi en ligne (cyberharcèlement). Que faire ?","En parler à un adulte de confiance, bloquer et signaler","Répondre par des insultes","Ne rien dire jamais","Supprimer son téléphone sans rien dire"],
 ["Une « fake news » est…","Une fausse information présentée comme vraie","Une vraie information","Un jeu","Une photo floue"],
 ["Comment vérifier une information surprenante ?","Chercher la source et la comparer avec des sites fiables","La partager vite","La croire sans réfléchir","La copier-coller"],
 ["Que veut dire « streaming » ?","Regarder ou écouter en continu sans télécharger le fichier entier","Télécharger un film","Imprimer un document","Éteindre un appareil"],
 ["Que veut dire « télécharger » ?","Copier un fichier depuis Internet vers son appareil","Envoyer un colis","Réparer un téléphone","Effacer un mot de passe"],
 ["Un « spam » est…","Un message non sollicité envoyé en masse","Un message de ta famille","Une photo","Un mot de passe"],
 ["Que fait un moteur de recherche ?","Il aide à trouver des pages web","Il répare les ordinateurs","Il réchauffe les appareils","Il fabrique des e-mails"],
 ["À quoi sert un émoji ?","À exprimer une émotion ou une idée en image","À crypter un message","À accélérer Internet","À appeler les secours"]
]));

G('eia','IA et technologies','🤖','Numérique',270,'Intelligence artificielle, algorithmes, drones : les mots de la technologie.', EDU.quiz([
 ["Que veut dire « IA » ?","Intelligence artificielle","Internet appliqué","Informatique avancée","Image animée"],
 ["Qu'est-ce qu'un algorithme ?","Une suite d'instructions pour résoudre un problème","Un virus","Un câble","Un écran"],
 ["Qu'est-ce qu'un robot ?","Une machine programmée pour effectuer des tâches","Un animal","Un fruit","Un métal précieux"],
 ["Que signifie GPS ?","Système mondial de positionnement par satellites","Gros programme sonore","Générateur de photos","Guide pour smartphone"],
 ["Que fait un assistant vocal ?","Il répond à la voix et exécute des commandes","Il imprime les photos","Il répare les routes","Il cuisine"],
 ["Une IA peut-elle se tromper ?","Oui : il faut vérifier les informations importantes","Jamais","Seulement le lundi","Seulement en anglais"],
 ["À quoi servent les satellites de télécommunication ?","À transmettre des signaux (TV, téléphone, Internet)","À fabriquer des nuages","À chauffer la Terre","À éclairer les routes"],
 ["La 5G est…","Une génération de réseau mobile plus rapide","Un type de batterie","Un jeu vidéo","Un navigateur"],
 ["Que sont les « données personnelles » ?","Des informations qui permettent d'identifier quelqu'un","Des chiffres au hasard","Des mots de passe d'un jeu","Des photos de paysages"],
 ["Que peut faire une imprimante 3D ?","Fabriquer des objets couche par couche","Voler","Cuisiner","Réparer un téléphone"],
 ["Qu'est-ce qu'un drone ?","Un appareil volant piloté à distance","Un petit poisson","Un clavier","Un serveur"],
 ["Quelle technologie transforme la lumière du soleil en électricité ?","Les panneaux photovoltaïques","Les éoliennes","Les batteries au plomb","Les moteurs diesel"],
 ["Que veut dire « open source » ?","Dont le code est public et peut être étudié ou modifié","Qui est gratuit pour toujours","Qui est interdit","Qui est secret"]
]));

G('eprog','Que vaut x ? (code)','👩‍💻','Numérique',120,'Lis un mini-programme et trouve le résultat, comme un développeur.', EDU.gen(function(L){
 const t = ri(1, Math.min(5, L + 1));
 if(t === 1){ const a = ri(2,9), b = ri(2,9); return { q:'x = ' + a + ' ; x = x + ' + b + ' ; Que vaut x ?', a:a+b }; }
 if(t === 2){ const a = ri(2,9), b = ri(2,6); return { q:'x = ' + a + ' ; y = ' + b + ' ; z = x × y ; Que vaut z ?', a:a*b }; }
 if(t === 3){ const n = ri(3,6), a = ri(2,5); return { q:'x = 0 ; répéter ' + n + ' fois : x = x + ' + a + ' ; Que vaut x ?', a:n*a }; }
 if(t === 4){ const x = ri(3,9), th = ri(4,7); return { q:'x = ' + x + ' ; si x > ' + th + ' alors y = 10, sinon y = 2 ; Que vaut y ?', a: x > th ? 10 : 2 }; }
 const a = ri(2,5), b = ri(2,5); return { q:'x = ' + a + ' ; y = ' + b + ' ; x = x + y ; y = x − y ; Que vaut y ?', a:a };
},{ mode:'numpad', how:'Un mini-programme s\'affiche : « ; » sépare les instructions, « × » multiplie. Exécute-le dans ta tête et tape la valeur finale demandée. 60 secondes, le niveau monte tous les 4 bonnes réponses.' }));

(function(){
 const M = {A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..'};
 const show = c => c.replace(/\./g,'•').replace(/-/g,'—').split('').join(' ');
 const L1 = 'ETIANMSURWDKGO'.split(''), ALL = Object.keys(M);
 G('emorse','Code Morse','📡','Numérique',50,'Déchiffre les lettres en code Morse (points et traits).', EDU.gen(function(L){
  const pool = L < 3 ? L1 : ALL; const ch = pick(pool);
  const set = new Set([ch]); while(set.size < 4) set.add(pick(pool));
  return { q:'Quelle lettre correspond à ce code Morse ?\n' + show(M[ch]), a:ch, opts:shuffle(Array.from(set)) };
 },{ how:'Le code Morse écrit les lettres avec des points (•) et des traits (—) : E = •  T = —  A = • —  S = • • •  O = — — —. Le signal de détresse SOS s\'écrit • • • — — — • • •. Trouve la lettre correspondant au code. 60 secondes.' }));
})();

/* ---------------------------------------------------------- DÉTENTE */
G('edevinettes','Devinettes','🧩','Détente',300,'Des devinettes à réfléchir… et à partager en famille !', EDU.quiz([
 ["Qu'est-ce qui a des dents mais ne mord pas ?","Un peigne","Un lion","Un crocodile","Un livre"],
 ["Plus on en prend, plus on en laisse. Qu'est-ce que c'est ?","Des pas","Des bonbons","De l'eau","Du riz"],
 ["Qu'est-ce qui monte et descend sans bouger ?","Un escalier","Un oiseau","Un ballon","Un avion"],
 ["J'ai des villes mais pas de maisons, des fleuves mais pas d'eau. Que suis-je ?","Une carte","Un jardin","Un livre","Un puzzle"],
 ["Qu'est-ce qui t'appartient, mais que les autres utilisent plus que toi ?","Ton prénom","Ton lit","Ton sac","Ton chapeau"],
 ["Qu'est-ce qui est plein de trous mais retient l'eau ?","Une éponge","Un seau percé","Un filet","Un panier"],
 ["Qu'est-ce qui voyage partout en restant dans son coin ?","Un timbre","Un nuage","Un oiseau","Un bateau"],
 ["Qu'est-ce qui a un cou mais pas de tête ?","Une bouteille","Un arbre","Une chaise","Une porte"],
 ["Qu'est-ce qu'on peut casser sans jamais le toucher ?","Une promesse","Un verre","Un œuf","Une assiette"],
 ["Il a quatre pieds mais il ne marche pas. Que suis-je ?","Une table","Un chat","Un cheval","Un chien"],
 ["Quel mois de l'année a 28 jours ?","Tous les mois","Février seulement","Janvier","Aucun"],
 ["Qu'est-ce qui court toujours mais ne marche jamais ?","Un fleuve","Un enfant","Un lion","Un coureur"],
 ["Qu'est-ce qui devient plus grand quand on en retire ?","Un trou","Un gâteau","Un sac","Une montagne"]
]));

G('eemoji','Emoji mystère','😀','Détente',50,'Que racontent ces emojis ? Devine le mot ou l\'idée.', EDU.quiz([
 ["🌧️ ☂️","Un jour de pluie","Un jour de fête","Un jour de marché","Un jour de neige"],
 ["📚 ✏️ 🏫","L'école","L'hôpital","Le stade","Le marché"],
 ["🚑 🏥","L'hôpital","La banque","La plage","L'aéroport"],
 ["🎂 🎈 🎁","Un anniversaire","Un enterrement","Un voyage","Un examen"],
 ["⚽ 🏆","Une coupe de football","Un marché","Un voyage","Un anniversaire"],
 ["🌙 ⭐","La nuit","Le matin","L'école","Le marché"],
 ["👨‍🍳 🍲","Un cuisinier","Un médecin","Un pilote","Un maçon"],
 ["📱 💬","Un message","Un voyage","Un repas","Un colis"],
 ["🚗 ⛽","Une station-service","Un hôpital","Un cinéma","Une école"],
 ["🎤 🎶","Un concert","Un match","Un examen","Un marché"],
 ["🔥 🚒","Les pompiers","La police","Le médecin","Le cuisinier"],
 ["💍 👰 🤵","Un mariage","Un voyage","Une naissance","Un match"],
 ["☀️ 🏖️","Des vacances à la plage","Un jour de pluie","Un examen","Un match"],
 ["🐘 🌍","Un éléphant d'Afrique","Un lion d'Asie","Un chat","Un poisson"]
],{ how:'Des emojis racontent quelque chose : trouve la bonne idée parmi les propositions. 10 questions, 15 secondes chacune.' }));

G('equisuis','Qui suis-je ?','🕵️','Détente',130,'Devine le personnage, l\'objet ou l\'animal grâce aux indices.', EDU.quiz([
 ["Je brille dans le ciel la nuit et je change de forme chaque mois.","La Lune","Le Soleil","Une étoile filante","Un avion"],
 ["Je suis un fruit jaune et courbé que les singes adorent.","La banane","La mangue","L'ananas","Le citron"],
 ["Je suis un métier : j'éteins les incendies.","Pompier","Facteur","Boulanger","Maçon"],
 ["Je suis un continent : l'Égypte, le Kenya et le Ghana sont chez moi.","L'Afrique","L'Asie","L'Europe","L'Océanie"],
 ["Je suis un instrument à cordes d'Afrique de l'Ouest, avec 21 cordes.","La kora","Le djembé","Le balafon","La flûte"],
 ["Je suis un instrument de percussion en forme de gobelet, on me joue avec les mains.","Le djembé","La kora","La trompette","Le violon"],
 ["Je suis un organe qui bat des dizaines de milliers de fois par jour.","Le cœur","Le foie","L'estomac","Le poumon"],
 ["Je suis un outil de bureau avec des touches sur lesquelles on tape.","Un clavier","Une règle","Une agrafeuse","Une gomme"],
 ["Je suis un grand fleuve d'Afrique et je traverse l'Égypte.","Le Nil","Le Niger","Le Congo","Le Zambèze"],
 ["Je suis un gaz que les êtres vivants respirent et que les plantes produisent.","L'oxygène","Le plomb","Le fer","Le sucre"],
 ["Je suis un oiseau qui ne vole pas et qui vit près des pôles.","Le manchot","Le perroquet","L'aigle","Le moineau"],
 ["Je suis un petit insecte qui fabrique du miel.","L'abeille","La fourmi","Le moustique","La mouche"],
 ["Je suis un instrument qui mesure la température.","Le thermomètre","Le baromètre","Le chronomètre","Le mètre"]
]));

G('ememanimaux','Mémoire des animaux','🐾','Détente',140,'Retrouve chaque animal en dessin et son nom.', EDU.memo([
 ['🦁','Lion'],['🐘','Éléphant'],['🦒','Girafe'],['🐊','Crocodile'],['🦓','Zèbre'],['🦏','Rhinocéros'],['🐒','Singe'],['🦜','Perroquet'],['🐍','Serpent'],['🐢','Tortue'],['🦅','Aigle'],['🐪','Dromadaire']
]));
})();

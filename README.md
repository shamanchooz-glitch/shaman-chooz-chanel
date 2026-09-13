# SHAMAN CHOOZ CHANEL — Guide de mise en ligne

## Ce que contient ce dossier
- `version.json` — à mettre à jour (change juste le numéro) à chaque nouvelle mise en ligne, pour que tes clients voient le bandeau "Nouvelle version disponible" (étape 10)
- `index.html`, `style.css`, `app.js`, `sw.js`, `manifest.json` — le site
- `firebase-config.js` — à remplir avec tes clés Firebase (étape 2) et ton e-mail admin (étape 9)
- `database.rules.json` — règles de sécurité à publier dans la console Firebase (étape 9)
- `ai-config.js` — à remplir avec l'adresse de ton serveur relais IA (étape 5)
- `cloudflare-worker.js` — le code du serveur relais qui appelle Kling (mouvement) et JSON2Video (assemblage final) pour générer les vidéos IA (étape 5)
- `icon-192.png`, `icon-512.png` — ta photo, utilisée comme icône du site

## État actuel du site
✅ **C'est un vrai site internet** : une seule adresse web, qui s'ouvre dans n'importe quel navigateur (Chrome, Safari, Firefox, Edge...) sur téléphone, tablette ou ordinateur
✅ **Installable en PWA partout** : une bannière propose l'installation sur Android/Chrome/Edge/ordinateur (installation en un clic) ; sur iPhone (Safari bloque l'installation automatique — c'est une restriction d'Apple, pas un manque du site), la bannière explique le geste "Partager > Sur l'écran d'accueil"
✅ **QR code + lien de partage** : dans Admin > Réglages, un QR code et un bouton "Partager" prêts à coller sur tes réseaux sociaux
✅ Catalogue de 16 vidéos de démonstration — prêtes à recevoir de vraies vidéos
✅ Vidéo "Animation simple" gratuite et automatique (texte → dessin animé basique + musique)
✅ **Nouveau : deux styles de vidéo IA, jusqu'à 10 minutes, branchés sur JSON2Video**
  - 🎬 **Vidéo réaliste** : mouvement généré par IA (Kling), assemblé automatiquement en plusieurs séquences (générées en parallèle) pour atteindre la durée choisie (5 secondes à 10 minutes)
  - 🖼️ **Vidéo pub / diaporama** : n'importe quel autre type de vidéo (publicité, diaporama photo, annonce, témoignage) — images (les tiennes ou générées par IA), texte, voix off et musique, jusqu'à 10 minutes. Ce n'est plus limité aux vidéos dessin animé.
  - Le prix est calculé **automatiquement** selon la durée choisie (coût réel du service IA + ta marge, déjà inclus) — le client peut donc commander librement la durée qu'il veut, dans la limite proposée
  - Dans les deux cas : le client décrit/écrit sa vidéo, choisit la durée avec un curseur, le prix se calcule tout seul, et la vidéo se génère automatiquement après paiement (voir étape 5 — nécessite une configuration supplémentaire de ta part)
✅ Paiement : Wave, MTN, Moov, Orange (Côte d'Ivoire) + Wave International/Wise (étranger), validation manuelle par toi
✅ Espace admin protégé par mot de passe avec œil 👁 pour afficher/masquer
✅ Ta photo cliquable en haut à gauche, plein écran au clic
⏳ Tant que Firebase n'est pas branché, le site fonctionne en mode démo local sur un seul appareil
⏳ Tant que le relais IA (étape 5) n'est pas branché, l'onglet "Vidéo IA réaliste" reste visible mais désactivé avec un message clair
⏳ Paiement automatique sans validation manuelle : nécessite un compte CinetPay/PayDunya (à voir plus tard)

## Étape 1 — Créer le dépôt GitHub
1. Va sur github.com, connecte-toi avec ton compte
2. Crée un nouveau dépôt, nomme-le par exemple `shaman-chooz-chanel`
3. Mets-le en **Public**
4. Upload tous les fichiers de ce dossier (glisser-déposer ou "Add file > Upload files")
5. Dans **Settings > Pages**, choisis la branche `main` et le dossier `/root`, puis Save
6. Ton site sera disponible à une adresse du type `https://tonpseudo.github.io/shaman-chooz-chanel/`

## Étape 2 — Créer et connecter Firebase (pour la synchronisation)
1. Va sur https://console.firebase.google.com
2. Clique "Ajouter un projet", nomme-le `shaman-chooz-chanel`
3. Une fois créé, clique l'icône `</>` pour ajouter une "application Web"
4. Copie les valeurs affichées (apiKey, projectId, etc.)
5. Ouvre le fichier `firebase-config.js` sur GitHub, clique le crayon ✏️ pour éditer
6. Remplace chaque `"REMPLACE_MOI"` par tes vraies valeurs, puis "Commit changes"
7. Dans le menu Firebase à gauche, va dans **Realtime Database > Créer une base de données**, choisis "Mode test" pour démarrer
8. Recharge ton site en ligne — l'écran Réglages > État de connexion doit afficher "Connecté à Firebase"

## Étape 3 — Ajouter tes vraies vidéos
1. Ouvre ton site, va dans l'onglet **Admin**, connecte-toi avec ton mot de passe
2. Onglet **Catalogue** : colle le lien de chaque vidéo (YouTube en mode "non-listé", Google Drive avec partage activé, ou lien Firebase Storage)
3. Tu peux aussi ajouter de nouvelles vidéos avec "+ Ajouter une vidéo au catalogue"

## Étape 4 — Gérer les commandes et paiements
1. Un client commande une vidéo et colle sa référence de paiement
2. Tu vérifies la réception sur ton téléphone mobile money (Wave, MTN, Moov ou Orange)
3. Dans **Admin > Commandes**, clique "✓ Valider" — le client peut alors voir/générer sa vidéo depuis l'onglet "Mes vidéos" en entrant son numéro de téléphone

## Étape 5 — Activer les vidéos IA (JSON2Video + Kling) — étape technique importante
**Ce qu'il faut savoir avant de te lancer, en toute honnêteté :**
- **JSON2Video est le moteur qui assemble toutes les vidéos IA** du site (images, texte, voix off, musique, transitions, carton de fin "SHAMAN CHOOZ CHANEL"). Il est **obligatoire** pour activer les deux onglets vidéo IA.
- **fal.ai (Kling)** n'est nécessaire que si tu veux activer le style "🎬 Vidéo réaliste" (mouvement généré par IA). Le style "🖼️ Vidéo pub / diaporama" fonctionne avec JSON2Video seul — pas besoin de Kling pour celui-là.
- Ces deux services (environ 30-90 FCFA/seconde pour Kling, tarification à l'usage pour JSON2Video) n'acceptent pas le paiement par mobile money — il faut une **carte bancaire internationale** (ou une carte virtuelle en dollars, que certaines fintechs/banques en ligne permettent d'obtenir même sans compte bancaire classique). C'est toi qui alimentes ces comptes pour payer le coût réel de chaque génération ; le prix que paie le client (mobile money) couvre ensuite ce coût + ta marge.
- Les clés secrètes de ces services ne doivent jamais être mises directement dans le site (n'importe qui pourrait les voir et les utiliser à tes frais). Il faut donc un petit serveur intermédiaire — j'ai préparé son code (`cloudflare-worker.js`), à installer une seule fois sur **Cloudflare Workers** (gratuit pour commencer), entièrement depuis un navigateur, pas besoin d'ordinateur spécialisé.

**Étapes :**
1. Crée un compte sur https://json2video.com, récupère ta clé API (**obligatoire**)
2. (Optionnel — seulement pour le style "vidéo réaliste") Crée un compte sur https://fal.ai, ajoute un moyen de paiement, récupère ta clé API dans "API Keys"
3. Crée un compte sur https://dash.cloudflare.com (gratuit)
4. Workers & Pages > Créer une application > Créer un Worker, nomme-le `shaman-chooz-video-ia`
5. Ouvre "Modifier le code" / "Quick Edit", efface tout le contenu, colle le contenu du fichier `cloudflare-worker.js`
6. Va dans Settings > Variables and Secrets > Ajoute :
   - `JSON2VIDEO_KEY` = ta clé JSON2Video (coche "Chiffrer/Encrypt") — **obligatoire**
   - `FAL_KEY` = ta clé fal.ai (coche "Chiffrer/Encrypt") — seulement si tu actives le style réaliste
7. Clique "Déployer" — Cloudflare te donne une adresse du type `https://shaman-chooz-video-ia.tonpseudo.workers.dev`
8. Colle cette adresse dans `ai-config.js`, à la place de `"REMPLACE_MOI"`, puis mets à jour ce fichier sur GitHub
9. Recharge ton site : les onglets "Vidéo IA" deviennent actifs

**Limites actuelles à connaître (ce sont les limites réelles des services, pas des limites artificielles) :**
- Les deux styles de vidéo IA vont maintenant jusqu'à **10 minutes (600 secondes)** — c'est le maximum autorisé par le plan JSON2Video "Professional" (~50$/mois). Si un jour tu veux aller au-delà, il suffit de passer au plan "Startup" (~100$/mois) chez JSON2Video, qui supprime totalement cette limite de durée, puis d'augmenter `maxDurationSec` dans `ai-config.js`
- Pour le style réaliste, chaque séquence de mouvement Kling fait 5 à 10 secondes (limite technique de Kling) ; au-delà, plusieurs séquences sont générées **en parallèle** puis assemblées automatiquement par JSON2Video (transitions incluses). ⏱️ Plus la vidéo demandée est longue, plus il y a de séquences à générer, donc plus l'attente est longue et plus le coût réel (et donc le prix facturé) est élevé
- Le style "pub / diaporama" peut créer n'importe quel type de vidéo (annonce, diaporama, témoignage, publicité...), pas seulement des dessins animés — avec tes propres photos ou des images générées par IA. Sa limite pratique : chaque scène (= chaque ligne de texte) ne peut pas dépasser 300 secondes, donc pour une vidéo très longue, ajoute plusieurs lignes de texte
- Si tu ne renseignes pas `FAL_KEY`, l'onglet "🎬 Vidéo réaliste" reste visible mais désactivé ; l'onglet "🖼️ Vidéo pub / diaporama" fonctionne quand même dès que `JSON2VIDEO_KEY` est configurée
- La qualité dépend des modèles IA utilisés ; certains résultats peuvent nécessiter d'être régénérés

## Étape 6 — Payer JSON2Video et fal.ai sans carte bancaire classique, avec la carte virtuelle Wave
**Bonne nouvelle : tu n'as pas besoin d'une carte bancaire classique.** Depuis fin 2025, Wave Côte d'Ivoire propose une **carte Visa virtuelle**, gratuite, directement dans l'application Wave, en partenariat avec Visa et une banque partenaire (Orabank/Ecobank). Elle est faite exactement pour ce genre de paiement en ligne à l'international (abonnements, services numériques...).

**Comment l'activer :**
1. Assure-toi que ton compte Wave est **identifié** (KYC). Si ce n'est pas déjà fait, rends-toi chez un agent Wave près de chez toi avec ta pièce d'identité (CNI, passeport...) — c'est gratuit et rapide
2. Ouvre ton application Wave, cherche la section **"Carte virtuelle"** (ou "Carte Visa")
3. Active-la : ça se fait gratuitement, en 2 clics, directement dans l'app
4. Approvisionne la carte en transférant de l'argent depuis ton solde Wave vers la carte (comme un virement interne)
5. Utilise le numéro de carte, la date d'expiration et le CVV affichés dans l'app pour payer sur json2video.com et fal.ai — le montant en FCFA de ton solde Wave est converti automatiquement en dollars ($) au moment du paiement

**Points importants à connaître avant de t'en servir pour JSON2Video/fal.ai :**
- La carte est **entièrement virtuelle** : impossible de l'utiliser dans un magasin physique, mais parfaite pour le paiement en ligne (Amazon, Netflix, et donc json2video.com/fal.ai)
- Elle ne peut **pas recevoir de virement/remboursement directement** — les remboursements passent par ton solde Wave habituel
- **Recommandation importante pour éviter les échecs de paiement** : préfère les formules **"prépayées / recharge unique"** (one-time top-up) plutôt que les **abonnements mensuels automatiques**, aussi bien sur JSON2Video (option "Pre-paid plans", ex: 120 minutes de vidéo pour 49,95$) que sur fal.ai (crédit à l'usage). En effet, un abonnement mensuel essaie de prélever automatiquement chaque mois : si ta carte virtuelle n'a pas assez de solde exactement ce jour-là, le paiement échoue. Avec une recharge unique, tu approvisionnes ta carte juste avant d'acheter le crédit dont tu as besoin, tu contrôles donc totalement la dépense
- Cette solution fonctionne pour toi (administrateur, pour payer les services IA) **et** pour tes clients partout dans le monde grâce aux moyens de paiement déjà prévus sur le site (Wave International/Wise pour l'étranger) — les deux circuits sont indépendants : tes clients paient en mobile money/Wave International, toi tu paies fal.ai/JSON2Video en dollars avec ta carte virtuelle Wave, et le site fait automatiquement la différence de prix (ta marge)

## Étape 7 — Paiement des clients (Côte d'Ivoire + international) avec tes vrais numéros
Le site utilise maintenant tes numéros réels :
- **Wave** : 07 48 93 56 86 — Wave accepte directement les transferts envoyés depuis l'étranger, ce numéro fonctionne donc pour tous les clients, en Côte d'Ivoire comme à l'international.
- **MTN Money** : 05 74 53 36 36
- **Moov Money** : 01 73 77 39 39
- **Orange Money** : 07 49 97 09 18

Pour MTN/Moov/Orange, un client à l'étranger peut envoyer de l'argent vers ces numéros via un service de transfert international vers mobile money (Wari, Ria, WorldRemit, Sendwave, etc.) — le site l'indique automatiquement au client une fois son moyen de paiement choisi. Toi, tu gardes exactement le même rôle qu'avant : tu reçois la notification de paiement, tu vérifies dans ton application (Wave, MTN, Moov ou Orange) que l'argent est bien arrivé, puis tu valides la commande dans ton espace admin — rien n'est débité ou validé automatiquement sans ton accord.

## Étape 8 — Traduction du site et des vidéos dans toutes les langues
**Deux traductions différentes, bien séparées :**

**1. Traduction du SITE (menus, boutons, textes de l'interface)**
Un sélecteur de langue est maintenant présent en haut du site (à côté de l'icône "Mes vidéos"). Il utilise le service gratuit Google Traduction pour traduire instantanément toute l'interface dans la langue choisie par le visiteur — plus de 25 langues sont proposées, dont le swahili, l'amharique, le haoussa, le yoruba et le bengali en plus des grandes langues mondiales. Rien à configurer de ton côté, ça fonctionne automatiquement dès la mise en ligne.

**2. Traduction des VIDÉOS (texte affiché + voix off)**
Sur les vidéos "Animation simple" et "Pub / diaporama" (client et admin), un sélecteur "Langue de la vidéo" permet de choisir dans quelle langue le texte et la voix off seront générés (23 langues). Concrètement :
- Le texte que tu/le client écris est automatiquement traduit (via le serveur relais, service de traduction gratuit MyMemory)
- La voix off utilise une voix IA dans la langue choisie (ex: voix anglaise pour une vidéo en anglais)
- Le style visuel (image générée par IA) reste basé sur le texte d'origine en français, pour garder la meilleure qualité d'image

**⚠️ Point de vigilance technique** : les noms des voix IA (Azure) que j'ai utilisés pour les langues les plus courantes (français, anglais, espagnol, arabe, chinois, portugais...) sont bien établis et fiables. Pour quelques langues moins courantes (swahili, amharique, zoulou), Microsoft renomme parfois ses voix — si une vidéo dans une de ces langues affiche une erreur de génération, ouvre `app.js`, cherche `const LANGUAGES = [` tout en haut du fichier, et vérifie/corrige le nom de la voix concernée en comparant avec la liste officielle : https://json2video.com/ai-voices/azure/voices/

**Limite à connaître** : le service de traduction gratuit (MyMemory) a une limite d'usage quotidienne raisonnable pour un site de cette taille. Si un jour le site devient très fréquenté et que les traductions commencent à échouer, il faudra passer à un service de traduction payant (DeepL ou Google Translate API) — dis-le-moi si ça arrive, l'adaptation du code est simple (une seule fonction à changer dans `cloudflare-worker.js`).

## Étape 9 — Sécuriser vraiment la base de données et l'espace admin
Jusqu'ici, ta base de données était ouverte en lecture/écriture à quiconque connaîtrait son adresse technique, et le mot de passe admin était juste une valeur stockée dans la base elle-même — pas une vraie protection. Voici comment la sécuriser correctement, sans rien casser sur le site.

**1. Créer un vrai compte admin (Firebase Authentication)**
1. Console Firebase > ton projet > menu de gauche "Build" > **"Authentication"** > "Get started"
2. Onglet **"Sign-in method"** > active **"E-mail/Mot de passe"**
3. Onglet **"Users"** > **"Add user"** :
   - E-mail : par exemple `admin@shamanchoozchanel.com` (ou une adresse à toi)
   - Mot de passe : celui que tu veux utiliser pour te connecter à l'espace admin du site
4. Ouvre `firebase-config.js`, modifie la ligne `const ADMIN_EMAIL = "..."` pour qu'elle corresponde **exactement** à l'e-mail choisi à l'étape 3, puis mets à jour ce fichier sur GitHub

Ensuite, connecte-toi à l'espace admin du site avec le mot de passe choisi (le site utilise `ADMIN_EMAIL` automatiquement en coulisses, tu n'as que le mot de passe à taper, comme avant).

**2. Remplacer les règles ouvertes par de vraies règles**
1. Console Firebase > **Realtime Database** > onglet **"Règles"**
2. Efface tout, colle le contenu du fichier `database.rules.json` fourni, puis **"Publier"**

Avec ces règles :
- Le catalogue ne peut être modifié que par toi, une fois connecté à l'espace admin
- N'importe qui peut toujours passer commande (normal, c'est le but du site)
- Mais personne d'autre que toi ne peut faire passer une commande de "en attente" à "payée" — seul un paiement que **tu valides toi-même** dans l'espace admin peut débloquer une vidéo

**Limite honnête à connaître** : le site n'ayant pas de compte client individuel (les commandes sont juste identifiées par nom/téléphone), une personne malveillante connaissant l'adresse technique de la base pourrait encore modifier des détails d'une commande existante (sans jamais pouvoir la faire passer en "payée" toute seule, ni toucher au catalogue). C'est un compromis raisonnable pour un site sans système de comptes clients ; si tu veux un jour une sécurité complète par client, il faudrait ajouter un vrai système de comptes (bien plus de travail).

## Étape 10 — Nouvelles fonctionnalités : mises à jour automatiques, code client modifiable
**1. Bandeau "Nouvelle version disponible" pour tes clients — 100% automatique**
Un robot GitHub (fichier `.github/workflows/update-version.yml`) met à jour `version.json` tout seul à chaque fois que tu modifies et republies un fichier du site. **Tu n'as plus rien à faire manuellement.** Les clients déjà en train d'utiliser le site (ou qui l'ont installé sur leur écran d'accueil) voient alors automatiquement un petit bandeau "✨ Nouvelle version disponible" avec un bouton pour recharger. Voir Étape 11 ci-dessous pour l'activer (une seule chose à vérifier dans les réglages GitHub).

**2. Le client peut changer son propre code d'accès**
Sur l'écran "Mes vidéos", une fois connecté avec son numéro + son code actuel, un bouton "🔑 Changer mon code d'accès" apparaît. Ça génère un nouveau code à 6 chiffres, l'ancien devient aussitôt invalide, et le nouveau s'affiche clairement à l'écran pour qu'il le note.

**3. Rafraîchissement automatique de "Mes vidéos"**
Tant qu'un client reste sur l'écran "Mes vidéos", la liste se met à jour toute seule toutes les 15 secondes — utile s'il attend que tu valides son paiement, il voit le changement de statut sans avoir à retaper son numéro et son code.

**4. Mot de passe admin** : déjà en place depuis l'étape 9 (Firebase Authentication) — tu peux le changer à tout moment dans Réglages > "Changer le mot de passe", dans ton espace admin.

## Étape 11 — Activer le robot de mise à jour automatique (une seule fois)
Le fichier `.github/workflows/update-version.yml` a besoin d'une autorisation pour pouvoir republier `version.json` à ta place :
1. Sur GitHub, ouvre ton dépôt (repository)
2. **Settings** (Réglages du dépôt, pas ceux de ton compte) > **Actions** > **General**
3. Descends jusqu'à **"Workflow permissions"**
4. Choisis **"Read and write permissions"**, puis **"Save"**

C'est tout, à faire une seule fois. Ensuite, à chaque mise à jour que tu publies sur GitHub (n'importe quel fichier sauf `version.json` lui-même), un petit robot ("GitHub Actions") se déclenche automatiquement en quelques secondes et republie `version.json` avec l'heure exacte de la mise à jour — c'est ce qui déclenche le bandeau chez tes clients. Tu peux suivre son activité dans l'onglet **"Actions"** de ton dépôt (une coche verte ✅ = ça a marché).

## Étape 12 — 10 nouvelles fonctionnalités ajoutées au site
1. **Mise à jour automatique** (étape 11 ci-dessus) — plus rien à faire manuellement
2. **Recherche instantanée** dans le catalogue (tape un mot, les résultats se filtrent en direct)
3. **Favoris ❤️** : chaque client peut "cœurer" les vidéos qu'il aime, retrouvées dans un onglet dédié (enregistré sur son appareil, pas besoin de compte)
4. **Badge "🆕 Nouveau"** affiché automatiquement sur les vidéos ajoutées au catalogue depuis moins de 7 jours
5. **Compteur de vues** sur chaque vidéo du catalogue (preuve sociale : "128 vues") — ⚠️ nécessite de republier `database.rules.json` mis à jour dans Firebase (Realtime Database > Règles > coller le nouveau contenu > Publier), sinon le compteur ne s'incrémentera pas
6. **Partage en un clic** : bouton qui ouvre WhatsApp/Facebook/Messages directement (utilise le partage natif du téléphone)
7. **Lien direct vers une vidéo précise** : pratique pour partager une vidéo exacte sur les réseaux au lieu du site entier
8. **Notification automatique** quand une commande passe à "payée" pendant que le client garde l'onglet ouvert
9. **Chargement des images optimisé** (lazy loading + effet de chargement fluide) — le site se sent plus rapide, surtout avec une connexion lente
10. **Bouton "remonter en haut"** avec défilement fluide sur les longues listes

## Étape 13 — 16 nouvelles fonctionnalités de gestion pour l'espace admin
Cette fois, l'accent est mis sur une gestion plus approfondie de ton activité, côté admin :

1. **📊 Tableau de bord des statistiques de vente** — nouvel onglet "Stats" (premier onglet de ton espace admin) : chiffre d'affaires, nombre de commandes validées, panier moyen, commandes en attente, vidéos IA générées ce mois-ci — avec un filtre par période (aujourd'hui / 7 jours / ce mois / tout)
2. **📈 Graphique des ventes des 7 derniers jours** (petit graphique en barres, directement dans le tableau de bord)
3. **🏆 Top 5 des vidéos les plus vendues**
4. **👁️ Top 5 des vidéos les plus vues**
5. **🎬 Répartition du chiffre d'affaires par type de vidéo** (catalogue / sur mesure / IA réaliste / IA pub-diaporama)
6. **📂 Répartition du chiffre d'affaires par catégorie** de vidéo
7. **🔍 Recherche et filtres dans les commandes** admin (par nom, téléphone, référence, ou statut)
8. **📤 Export CSV de toutes les commandes** (ouvrable dans Excel/Google Sheets, pratique pour ta comptabilité)
9. **🗑️ Suppression d'une commande** (nettoyage des doublons ou tests)
10. **💬 Bouton WhatsApp direct** sur chaque commande, pour contacter le client en un clic
11. **🧾 Historique client** : voir en un clic toutes les commandes passées par un même client et le total dépensé
12. **✏️ Modifier une vidéo du catalogue** (titre, catégorie, prix) sans avoir à la supprimer et recréer
13. **📋 Dupliquer une vidéo du catalogue** (pratique pour créer une variante rapidement)
14. **🔍 Recherche dans le catalogue admin** (par titre ou catégorie)
15. **🔔 Badge de commandes en attente** sur l'onglet "Admin" en bas de l'écran — visible même avant de te connecter, pour savoir d'un coup d'œil s'il y a des paiements à valider
16. **🕐 Suivi de la dernière connexion admin** — affiché en haut de l'onglet Réglages, pratique pour repérer une connexion inhabituelle

⚠️ Republie bien `database.rules.json` (mis à jour, une nouvelle entrée `lastAdminLogin` a été ajoutée) dans Firebase > Realtime Database > Règles > Publier.

## Étape 14 — Vidéos gratuites (vitrine) et chaîne en direct

### 🎁 Vidéos gratuites — pour donner envie
Dans ton espace admin (Catalogue), chaque vidéo a maintenant un bouton **"🎁 Marquer gratuite"**. Elles apparaissent dans une section **"Vidéos gratuites du jour"** en haut du catalogue (en défilement horizontal, comme sur les grandes plateformes vidéo), avec un bouton "Envie de la même chose ?" qui pousse le visiteur à commander.

**La sélection change automatiquement chaque jour, toute seule** : le site affiche **jusqu'à 30 vidéos gratuites**, choisies et mélangées au hasard parmi toutes celles que tu as marquées "gratuite" — cette sélection (et leur ordre) se renouvelle chaque nouvelle journée, sans que tu aies quoi que ce soit à faire.

⚠️ **Point important à bien comprendre** : le système peut afficher jusqu'à 30 vidéos, mais il ne peut montrer que des vidéos qui existent réellement dans ton catalogue et que tu as marquées gratuites — il ne peut pas en inventer. Pour profiter pleinement de cette rotation sur 30 vidéos, il te faut donc marquer **au moins 30 vidéos comme gratuites** (si tu en as moins, le site en affiche autant qu'il en existe, ce qui reste très bien).

**Comment obtenir facilement beaucoup de vidéos gratuites, pour un public du monde entier :**
- Utilise le constructeur de vidéo admin ("🎬 Générer et ajouter au catalogue") pour créer rapidement des vidéos courtes et variées (styles différents, langues différentes — le site prend en charge 23 langues, voir plus haut), et coche "🎁 Vidéo gratuite" à la création
- Varie les catégories (anniversaire, entreprise, pub, témoignage...) et les langues pour attirer des visiteurs de différents pays
- Chaque vidéo IA générée a un coût réel chez toi (JSON2Video/fal.ai) — pense à des vidéos courtes (10-20 secondes) pour que ta vitrine gratuite reste peu coûteuse à produire

### 🔴 Chaîne en direct — diffuser comme une chaîne de télé
Ta chaîne fonctionne avec **Cloudflare Stream** (le service utilisé par de nombreux sites professionnels pour la vidéo en direct). Le principe : tu diffuses depuis ton téléphone (avec une application gratuite), et le site retransmet en direct à tous tes visiteurs dans le monde, contre un petit pass payant.

**Mise en place (une seule fois) :**
1. Sur https://dash.cloudflare.com, ouvre **Stream** dans le menu de gauche (active-le si demandé — Cloudflare demande une carte, la carte virtuelle Wave fonctionne comme pour JSON2Video/fal.ai)
2. Va dans **Live Inputs** → **"Create Live Input"** → donne-lui un nom (ex: "Chaîne SHAMAN CHOOZ")
3. Cloudflare t'affiche : une **URL RTMPS** (le serveur d'envoi) et une **clé de stream** (Stream Key) — note-les précieusement, c'est comme un mot de passe de diffusion
4. Repère aussi le **Live Input ID** (affiché sur cette même page) et ton **"customer code"** (visible dans l'URL de lecture, ex: `customer-XXXXXXXX.cloudflarestream.com` — la partie XXXXXXXX)
5. Sur https://dash.cloudflare.com → **Mon profil** → **API Tokens** → crée un token avec la permission **"Stream: Edit"**, note-le

**Sur Cloudflare Workers** (ton serveur relais existant), ajoute 4 nouvelles variables (Settings > Variables) :
- `CF_API_TOKEN` = le token créé à l'instant (coche "Encrypt")
- `CF_ACCOUNT_ID` = l'identifiant de ton compte Cloudflare (visible dans l'URL du tableau de bord ou dans la barre latérale)
- `CF_LIVE_INPUT_ID` = le Live Input ID de l'étape 4
- `CF_CUSTOMER_CODE` = le code de l'étape 4

**Pour diffuser en direct depuis ton téléphone :**
1. Installe une application gratuite de streaming RTMP, par exemple **"Larix Broadcaster"** (gratuite, Android/iPhone)
2. Dans l'application, entre l'**URL RTMPS** et la **clé de stream** obtenues à l'étape 3
3. Appuie sur "Démarrer la diffusion" — ton flux arrive sur Cloudflare, qui le retransmet aussitôt à tous les clients ayant un pass actif
4. Dès que tu arrêtes, le site affiche automatiquement "Hors antenne" (vérification toutes les 20 secondes)

**Pour tes visiteurs :** ils choisissent un pass (1 jour / 1 semaine / 1 mois — prix modifiables dans `live-config.js`), paient comme pour une vidéo classique, tu valides leur paiement dans l'espace admin (comme d'habitude), et ils accèdent à la chaîne avec leur numéro + code d'accès personnel (le même système que pour "Mes vidéos").

⚠️ **Honnêteté sur la sécurité** : l'accès est protégé par le couple téléphone + code (comme le reste du site), mais l'adresse technique du flux vidéo n'est pas chiffrée avec un système de "jetons signés" avancé (une amélioration possible mais plus complexe, disponible plus tard si besoin — dis-le-moi). En clair : c'est une protection raisonnable contre l'accès casual, pas un verrou à toute épreuve contre quelqu'un de très déterminé à partager le lien.

⚠️ **Coût** : Cloudflare Stream facture à la minute diffusée + à la minute regardée (environ 1$ pour 1000 minutes regardées, très abordable). Le prix des pass dans `live-config.js` a été fixé bas exprès (voir le fichier) pour rester rentable tout en étant accessible partout.

## Étape 15 — Gérer ta chaîne comme un vrai producteur, depuis l'espace admin
Ton espace admin a maintenant un onglet **"🔴 Chaîne"**, avec tout ce qu'il faut pour piloter ta chaîne sans jamais toucher au code :

**Gestion des pass (illimités)**
1. Prix, durée et nom **entièrement libres** — crée autant de pass que tu veux (ex: "3 jours", "Week-end VIP", "2 semaines"...), modifie-les ou supprime-les à tout moment
2. Un client qui a déjà acheté un pass garde son accès même si tu supprimes ce pass ensuite

**Suivi et gestion des abonnés**
3. Statistiques dédiées : revenu total de la chaîne, nombre d'abonnés actuellement actifs, nombre total de pass vendus, formule la plus populaire
4. Liste complète des abonnés, avec recherche par nom ou téléphone
5. Prolonger l'accès d'un client de 7 jours en un clic (ex: geste commercial, souci technique de son côté)
6. Révoquer l'accès d'un client immédiatement (ex: paiement frauduleux)
7. Contacter un abonné directement sur WhatsApp depuis sa fiche
8. Export CSV de tous les abonnés (pour ta comptabilité)

**Contrôle de la diffusion**
9. Champ "Programme actuel" — affiché aux spectateurs (ex: "Ce soir : présentation de nos nouveautés")
10. Message "hors antenne" personnalisable (au lieu d'un texte figé)
11. Mode maintenance — coupe temporairement l'accès à la chaîne avec un message de ton choix
12. Bouton "📢 Annoncer que je suis en direct" — notifie les visiteurs qui ont l'onglet Chaîne ouvert au moment où tu commences à diffuser
13. Indicateur "🔴 EN DIRECT" avec pastille clignotante, visible dès que Cloudflare détecte ta diffusion

**Replays (rediffusions)**
14. Cloudflare Stream enregistre automatiquement chaque direct — retrouve-les dans l'onglet Chaîne de l'admin
15. Rendre un replay **public** (regardable sans pass, pour attirer de nouveaux abonnés) ou le garder réservé aux abonnés payants
16. Les replays publics apparaissent automatiquement pour tous les visiteurs sur l'écran "Chaîne", en défilement horizontal

**Autres**
17. Répartition des ventes par formule de pass (dans les statistiques générales de l'onglet 📊 Stats)
18. Le chiffre d'affaires de la chaîne est intégré à tes statistiques globales du site
19. Système de code d'accès réutilisé (le même téléphone + code que "Mes vidéos") — pas de système de compte supplémentaire à gérer
20. Tri automatique des pass par prix côté visiteur, pour une présentation toujours claire

⚠️ **Fichier `live-config.js` devenu inutile** : les prix sont maintenant gérés entièrement depuis l'admin et stockés dans Firebase. Tu peux le supprimer de GitHub si tu veux (le site fonctionne sans lui) — je l'ai laissé avec un simple mot expliquant pourquoi, au cas où.

⚠️ **Republie `database.rules.json`** (mis à jour, deux nouvelles entrées `livePasses` et `liveSettings`) dans Firebase > Realtime Database > Règles > Publier — sinon la gestion des pass ne fonctionnera pas.

## Pour aller plus loin (Phase 3)
- **Paiement 100% automatique** (sans validation manuelle) : ouvrir un compte marchand CinetPay ou PayDunya
- **Sous-titres automatiques et voix supplémentaires** : JSON2Video prend en charge d'autres langues et voix (voir sa documentation) si tu veux élargir l'offre
- **Vidéos de plus de 10 minutes** : passer au plan JSON2Video "Startup" (supprime la limite de durée) puis augmenter `maxDurationSec` dans `ai-config.js`

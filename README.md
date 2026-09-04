# SHAMAN CHOOZ CHANEL — Guide de mise en ligne

## Ce que contient ce dossier
- `index.html`, `style.css`, `app.js`, `sw.js`, `manifest.json` — le site
- `firebase-config.js` — à remplir avec tes clés Firebase (étape 2)
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

## Pour aller plus loin (Phase 3)
- **Paiement 100% automatique** (sans validation manuelle) : ouvrir un compte marchand CinetPay ou PayDunya
- **Sous-titres automatiques et voix supplémentaires** : JSON2Video prend en charge d'autres langues et voix (voir sa documentation) si tu veux élargir l'offre
- **Vidéos de plus de 10 minutes** : passer au plan JSON2Video "Startup" (supprime la limite de durée) puis augmenter `maxDurationSec` dans `ai-config.js`

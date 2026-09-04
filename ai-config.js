// ============================================================
// CONFIGURATION VIDÉO IA — À REMPLIR PAR TOI (voir README.md, étape 5)
// ============================================================
// "workerUrl" est l'adresse de ton petit serveur (Cloudflare Worker)
// qui appelle les services de génération vidéo IA à ta place, en
// gardant tes clés secrètes (fal.ai / Kling + JSON2Video).
//
// Le site propose maintenant DEUX styles de vidéo IA :
//  - "realiste"  : mouvement généré par IA (Kling), plusieurs séquences
//                  assemblées automatiquement par JSON2Video jusqu'à
//                  60 secondes, avec transitions et carton de fin.
//  - "template"  : n'importe quel autre type de vidéo (publicité,
//                  diaporama photo, annonce, témoignage...) construite
//                  par JSON2Video : images (les tiennes ou générées par
//                  IA), texte, voix off, musique — jusqu'à 60 secondes.
//
// Tant que "workerUrl" vaut "REMPLACE_MOI", les deux onglets "Vidéo IA"
// restent visibles mais désactivés, avec un message clair pour le client.
// ============================================================

const AI_CONFIG = {
  workerUrl: "REMPLACE_MOI",

  // Durée min/max proposée au client, pour les deux styles de vidéo IA.
  // 600s (10 minutes) correspond au maximum du plan JSON2Video "Professional"
  // (~50$/mois). Si tu passes un jour au plan "Startup" (~100$/mois),
  // JSON2Video n'impose plus AUCUNE limite de durée : tu peux alors
  // augmenter maxDurationSec ici autant que tu veux (ex: 1800 pour 30 min).
  minDurationSec: 5,
  maxDurationSec: 600,
  stepDurationSec: 5,

  // Style "réaliste" (mouvement IA via Kling, assemblé par JSON2Video)
  // — plus cher car chaque seconde de mouvement généré par IA coûte plus cher
  pricePerSecondRealisteFCFA: 150,

  // Style "pub / diaporama" (JSON2Video seul : images + voix off + musique)
  // — moins cher, pas de génération de mouvement IA
  pricePerSecondTemplateFCFA: 60,

  baseFeeFCFA: 300
};

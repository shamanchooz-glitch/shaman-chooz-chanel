// ============================================================
// SERVICE WORKER — SHAMAN CHOOZ CHANEL
// ============================================================
// Rôle : permettre au site de s'ouvrir instantanément (même avec une
// connexion faible) en gardant en mémoire les fichiers principaux du site
// sur l'appareil de chaque visiteur, et de fonctionner en PWA installable.
//
// ⚠️ Si tu modifies index.html, style.css ou app.js, change le numéro de
// version ci-dessous (ex: "scc-v2" -> "scc-v3") pour que les visiteurs
// reçoivent bien la nouvelle version au lieu de l'ancienne mise en cache.
// ============================================================

const CACHE_NAME = 'scc-v46';

const APP_SHELL = [
  './',
  './index.html',
  './style.css',
  './games.css',
  './app.js',
  './test-voix.html',
  './chaine-lecteur.js',
  './chaine-acces.js',
  './slides-data-metiers3.js',
  './games-edu11.js',
  './slides-data-travaux.js',
  './slides-data-pubs1.js',
  './slides-data-pubs2.js',
  './slides-data-pubs3.js',
  './slides-data-pubs4.js',
  './slides-data-pubs5.js',
  './slides-data-pubs6.js',
  './slides-data-pubs7.js',
  './slides-data-pubs8.js',
  './slides-data-pubs9.js',
  './slides-data-pubs10.js',
  './slides-data-pubs11.js',
  './slides-data-pubs12.js',
  './slides-data-pubs13.js',
  './slides-data-pubs14.js',
  './slides-data-pubs15.js',
  './autocomplete.js',
  './games-edu12.js',
  './chaine-spectateurs.js',
  './qr-lib.js',
  './chaine-installer.js',
  './diapo-export.js',
  './voixoff-studio.js',
  './manifest-chaine.json',
  './games-core.js',
  './games-board.js',
  './games-puzzle.js',
  './games-arcade.js',
  './games-brain.js',
  './games-more1.js',
  './games-more2.js',
  './games-more3.js',
  './games-more4.js',
  './games-more5.js',
  './games-more6.js',
  './games-edu-core.js',
  './games-edu1.js',
  './games-edu2.js',
  './games-edu3.js',
  './games-edu4.js',
  './games-edu5.js',
  './games-edu6.js',
  './games-edu7.js',
  './games-edu8.js',
  './games-edu9.js',
  './agence-config.js',
  './slides-engine.js',
  './admin-preview.js',
  './slides-data-agence.js',
  './slides-data-savoirs1.js',
  './slides-data-savoirs2.js',
  './slides-data-pro.js',
  './slides-data-maison.js',
  './slides-data-ville.js',
  './slides-data-agence2.js',
  './slides-data-detente.js',
  './slides-data-lot1.js',
  './slides-data-lot2.js',
  './slides-data-metiers.js',
  './slides-data-metiers2.js',
  './games-edu10.js',
  './photo-shaman.jpg',
  './firebase-config.js',
  './ai-config.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// ---- Installation : met en cache l'app shell ----
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      // "reload" = on va chercher les fichiers directement sur le serveur (jamais une vieille copie en mémoire du navigateur)
      .then((cache) => Promise.all(APP_SHELL.map((u) =>
        fetch(new Request(u, { cache: 'reload' })).then((r) => (r.ok ? cache.put(u, r) : null)).catch(() => null)
      )))
      .then(() => self.skipWaiting())
  );
});

// ---- Activation : supprime les anciens caches ----
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ---- Récupération des fichiers ----
// Stratégie : "réseau d'abord" pour les pages/scripts du site (pour avoir
// toujours les dernières commandes/catalogue à jour), avec le cache comme
// solution de secours si le réseau est indisponible (mode hors-ligne).
// Les requêtes vers Firebase, Google Traduction et les vidéos externes
// passent directement par le réseau (jamais mises en cache).
self.addEventListener('fetch', (event) => {
  const req = event.request;

  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Ne jamais intercepter les appels vers Firebase, Google, les CDN externes
  // ou le relais IA : ils doivent toujours passer par le réseau en direct.
  if (url.origin !== self.location.origin) return;

  // Les vidéos (dossier videos/, .mp4, .webm, .m3u8) et les lectures partielles
  // (Range) passent toujours directement par le réseau, sans mise en cache.
  if (url.pathname.endsWith('/studio-episodes.js') || url.pathname.includes('/videos/') || /\.(mp4|webm|m3u8|ts)$/i.test(url.pathname) || req.headers.has('range')) return;

  event.respondWith(
    fetch(req, { cache: 'no-cache' })
      .then((networkResponse) => {
        const copy = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        return networkResponse;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }).then((cached) => cached || caches.match('./index.html')))
  );
});

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

const CACHE_NAME = 'scc-v2';

const APP_SHELL = [
  './',
  './index.html',
  './style.css',
  './app.js',
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
      .then((cache) => cache.addAll(APP_SHELL))
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

  event.respondWith(
    fetch(req)
      .then((networkResponse) => {
        const copy = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        return networkResponse;
      })
      .catch(() => caches.match(req).then((cached) => cached || caches.match('./index.html')))
  );
});

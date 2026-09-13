// ============================================================
// CONFIGURATION CHAÎNE EN DIRECT — à remplir par toi (voir README, étape 14)
// ============================================================
// Ta chaîne fonctionne avec Cloudflare Stream (le même genre de service que
// Twitch/YouTube Live en coulisses : tu diffuses depuis ton téléphone, le
// site retransmet en direct à tous tes visiteurs, partout dans le monde).
//
// Tant que ces informations ne sont pas configurées côté serveur relais
// (cloudflare-worker.js), l'onglet "Chaîne" reste visible mais affiche
// "Chaîne pas encore configurée".
// ============================================================

const LIVE_CONFIG = {
  // Prix des pass d'accès à la chaîne en direct — volontairement bas pour
  // rester accessible à tous, dans tous les pays.
  priceDayFCFA: 150,
  priceWeekFCFA: 700,
  priceMonthFCFA: 2000
};

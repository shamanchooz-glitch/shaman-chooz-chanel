// ============================================================
// CONFIGURATION FIREBASE — tes vraies valeurs (copiées depuis la console Firebase)
// ============================================================
// Ce fichier connecte le site à ta base de données Firebase (Realtime Database),
// pour que les commandes et le catalogue soient synchronisés entre TOUS les
// appareils (toi en tant qu'admin, et tous tes clients, partout dans le monde).
//
// ✅ L'URL de ta Realtime Database est renseignée ci-dessous
// (https://shaman-chooz-chanel-default-rtdb.firebaseio.com), copiée depuis
// ta console Firebase. Recharge ton site : Réglages > État de connexion
// doit maintenant afficher "Connecté à Firebase".
//
// ⚠️ "Mode test" laisse la base de données ouverte en lecture/écriture pendant
// 30 jours, puis se verrouille automatiquement. Avant l'échéance (ou tout de
// suite si tu préfères), va dans Realtime Database > onglet "Règles" et mets :
//   { "rules": { ".read": true, ".write": true } }
// puis "Publier". Ce n'est pas une sécurité par mot de passe (n'importe qui
// connaissant l'adresse technique pourrait théoriquement lire/écrire), mais
// c'est suffisant pour démarrer ; on pourra renforcer plus tard si besoin.
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyAp1jArqGKoQTkD2gHnuMTXsXqAruOBwPM",
  authDomain: "shaman-chooz-chanel.firebaseapp.com",
  databaseURL: "https://shaman-chooz-chanel-default-rtdb.firebaseio.com",
  projectId: "shaman-chooz-chanel",
  storageBucket: "shaman-chooz-chanel.firebasestorage.app",
  messagingSenderId: "843747202551",
  appId: "1:843747202551:web:54f42ecf3695705e0b4af2"
};

firebase.initializeApp(firebaseConfig);
window.SCC_FIREBASE_READY = true;

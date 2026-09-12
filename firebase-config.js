// ============================================================
// CONFIGURATION FIREBASE — tes vraies valeurs (copiées depuis la console Firebase)
// ============================================================
// Ce fichier connecte le site à ta base de données Firebase (Realtime Database),
// pour que les commandes et le catalogue soient synchronisés entre TOUS les
// appareils (toi en tant qu'admin, et tous tes clients, partout dans le monde).

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

// ============================================================
// COMPTE ADMIN (protège vraiment ton espace admin et ta base de données)
// ============================================================
// Depuis que la base de données utilise de vraies règles de sécurité (voir
// database.rules.json), la connexion à ton espace admin passe par un vrai
// compte "Firebase Authentication" — plus fiable qu'un simple mot de passe
// stocké dans la base.
//
// ⚠️ À FAIRE UNE SEULE FOIS, dans la console Firebase :
// 1. Va sur https://console.firebase.google.com > ton projet "shaman-chooz-chanel"
// 2. Menu de gauche > "Build" > "Authentication" > "Get started" (Commencer)
// 3. Onglet "Sign-in method" > active le fournisseur "E-mail/Mot de passe"
// 4. Onglet "Users" (Utilisateurs) > "Add user" (Ajouter un utilisateur) :
//      - E-mail : exactement la même adresse que ADMIN_EMAIL ci-dessous
//      - Mot de passe : celui que tu utiliseras pour te connecter à l'espace admin du site
// 5. Modifie la ligne ADMIN_EMAIL ci-dessous pour qu'elle corresponde EXACTEMENT
//    à l'e-mail que tu as utilisé à l'étape 4, puis mets à jour ce fichier sur GitHub
//
// Ensuite, dans l'espace admin du site, connecte-toi avec le mot de passe que tu as
// choisi à l'étape 4 (le champ "pseudo/e-mail" n'existe pas sur le site : c'est cet
// ADMIN_EMAIL qui est utilisé automatiquement en coulisses).
const ADMIN_EMAIL = "admin@shamanchoozchanel.com"; // ⚠️ à remplacer par l'e-mail que tu as créé à l'étape 4

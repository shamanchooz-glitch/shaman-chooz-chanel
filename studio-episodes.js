// ============================================================
// MES ÉPISODES (mini-série avec voix off française)
// ============================================================
// Chaque épisode = 10 scènes. Chaque scène a :
//   prompt = la description de l'image (en anglais, pour le générateur)
//   voice  = la phrase de voix off en français (11 mots maximum = clip de 5 s)
// Pour ajouter un épisode : ajoute un bloc { title, scenes: [ {prompt, voice}, ... ] }.
// Ce fichier est chargé directement par le site : tu peux le remplacer seul sur GitHub.
// ============================================================
window.STUDIO_EPISODES = [
  {
    title: "Épisode 1 – La plomberie",
    scenes: [
      { prompt: "A water drop leaking from a kitchen tap into a sink, close-up, slow motion", voice: "Un robinet qui fuit, ça arrive à tout le monde." },
      { prompt: "A smiling West African plumber in blue overalls and a yellow cap arrives at a front door with a toolbox, a happy homeowner welcomes him", voice: "Avec SHAMAN CHOOZ, un plombier se déplace chez vous, simplement." },
      { prompt: "The plumber in blue overalls and yellow cap kneels under a kitchen sink and inspects the pipes with a flashlight", voice: "Il regarde d'abord où se trouve le problème, calmement." },
      { prompt: "The plumber in blue overalls and yellow cap explains the repair to the smiling homeowner, pointing at the pipe", voice: "Puis il vous explique clairement ce qu'il va faire." },
      { prompt: "Close-up of hands tightening a pipe fitting with a wrench", voice: "Il répare la fuite avec les bons outils." },
      { prompt: "The plumber in blue overalls and yellow cap turns on the tap to test it, clean water flowing", voice: "Il vérifie que tout fonctionne avant de partir." },
      { prompt: "A clean bright modern kitchen with a dry shiny sink, sunlight through the window", voice: "Votre cuisine redevient propre, sèche et agréable." },
      { prompt: "The relieved homeowner smiling in the clean kitchen, giving a thumbs up", voice: "Plus de stress, plus d'eau qui coule partout." },
      { prompt: "A person paying on a smartphone at home, smiling, no brand logos", voice: "Vous choisissez le service et vous payez par Mobile Money." },
      { prompt: "A sunny African city street at golden hour, slow aerial movement, calm and welcoming", voice: "SHAMAN CHOOZ : vos services à portée de main." }
    ]
  }
];

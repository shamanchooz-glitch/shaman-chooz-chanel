/* ==========================================================
   PUBS 20 — TRUCS ET ASTUCES : HYGIÈNE ET SANTÉ (10), MAISON ET ARGENT (10), EMPLOI DE MAISON (20) = 40 nouveaux diaporamas avec ta photo
   Utilise l'outil window.SCC_ASTUCE défini dans slides-data-pubs19.js (qui doit être chargé avant).
   Conseils simples et prudents de la vie quotidienne : ce ne sont pas des conseils médicaux, financiers ou juridiques.
   Les 20 astuces « emploi » sont dans la catégorie « Agence » : elles se terminent par la page « Contactez-nous ».
   Aucune promesse de visa, d'emploi garanti ou de salaire : les règles dépendent de chaque pays.
   Les identifiants commencent par « ts- » (santé), « tg- » (argent), « tj- » (candidats), « te- » (employeurs).
   Pour ajouter une astuce : une ligne S(...), G(...), J(...) ou X(...) ci-dessous = 1 nouvelle vidéo.
   ========================================================== */
(function(){
if(!window.SCCS || !window.SCC_ASTUCE) return;
const S = (id, emo, t, a, b, c) => SCC_ASTUCE('ts', id, emo, t, a, b, c);
const G = (id, emo, t, a, b, c) => SCC_ASTUCE('tg', id, emo, t, a, b, c);

/* ---------- Hygiène et santé (10) ---------- */
S('mains', '🙌', "Les moments clés pour se laver les mains",
 "Se laver les mains au bon moment protège toute la famille.",
 "Lave-toi les mains avant de cuisiner ou de manger, après les toilettes, après avoir touché des déchets ou des animaux, et en rentrant.",
 "Eau et savon pendant environ 20 secondes.");
S('dents', '🦷', "Brosser les dents matin et soir",
 "Un brossage régulier protège les dents et les gencives.",
 "Brosse-toi les dents deux fois par jour, environ deux minutes, avec une brosse propre et un dentifrice adapté à l'âge.",
 "Évite de manger sucré juste avant de dormir.");
S('ongles', '💅', "Des ongles courts et propres",
 "Les ongles longs gardent la saleté et les microbes.",
 "Coupe les ongles régulièrement et brosse-les avec de l'eau et du savon, surtout avant de cuisiner.",
 "C'est important pour ceux qui s'occupent des repas et des enfants.");
S('eau-propre', '💧', "Rendre l'eau plus sûre",
 "En cas de doute, on peut faire bouillir l'eau avant de la boire.",
 "Fais bouillir l'eau pendant au moins une minute, laisse refroidir et garde-la dans un récipient propre et fermé.",
 "Ne plonge jamais les mains sales dans l'eau de boisson.");
S('moustiquaire', '🦟', "Dormir sous une moustiquaire",
 "La moustiquaire protège des piqûres pendant la nuit.",
 "Installe-la bien, sans trous, et rentre les bords sous le matelas. Répare les petits trous.",
 "En cas de fièvre, consulte un centre de santé sans attendre.");
S('soleil', '🧴', "Se protéger du soleil",
 "Un soleil trop fort fatigue et brûle la peau.",
 "Porte un chapeau, cherche l'ombre aux heures les plus chaudes et bois de l'eau régulièrement.",
 "Pense aussi à protéger les enfants.");
S('sommeil', '😴', "Bien dormir pour bien travailler",
 "Le sommeil redonne des forces au corps et à l'esprit.",
 "Couche-toi à une heure régulière, évite le téléphone au lit et dors dans un endroit calme.",
 "Un enfant d'âge scolaire a besoin d'environ 9 à 11 heures de sommeil.");
S('fruits-legumes', '🥕', "Des fruits et des légumes chaque jour",
 "Les fruits et les légumes aident le corps à rester en forme.",
 "Essaie d'en manger à chaque repas, de plusieurs couleurs, et lave-les à l'eau propre.",
 "Les fruits de saison sont souvent les moins chers.");
S('bouger', '🏃', "Bouger un peu chaque jour",
 "Marcher et bouger fait du bien au corps et à l'humeur.",
 "Marche, danse, joue avec les enfants ou fais des étirements pendant environ 30 minutes par jour.",
 "Si tu ne peux pas faire 30 minutes d'un coup, fais plusieurs petites séances.");
S('brulure', '🔥', "Petite brûlure : les bons gestes",
 "L'eau fraîche aide à soulager une petite brûlure.",
 "Passe la zone sous l'eau fraîche (pas glacée) pendant 10 à 20 minutes. Ne mets ni beurre, ni huile, ni dentifrice.",
 "Pour une brûlure étendue ou sur un enfant, consulte un médecin rapidement.");

/* ---------- Maison et argent (10) ---------- */
G('liste-courses', '📝', "Faire une liste de courses",
 "Une liste évite d'acheter ce dont on n'a pas besoin.",
 "Regarde ce qu'il reste à la maison, écris ce qui manque et suis la liste au marché.",
 "Tu gagnes du temps et tu dépenses moins.");
G('budget', '📒', "Noter les dépenses de la maison",
 "Écrire ses dépenses aide à mieux comprendre où va l'argent.",
 "Note chaque jour ce que tu dépenses dans un cahier : nourriture, transport, factures.",
 "À la fin du mois, tu vois où tu peux économiser.");
G('mettre-de-cote', '🐷', "Mettre un peu de côté",
 "Une petite somme mise de côté régulièrement aide en cas de problème.",
 "Décide d'un petit montant à mettre de côté dès que tu reçois de l'argent, même une toute petite somme.",
 "Régularité vaut mieux que grosse somme une fois.");
G('comparer-prix', '🏷️', "Comparer les prix",
 "Le même produit peut coûter moins cher ailleurs.",
 "Regarde les prix dans deux ou trois endroits avant de gros achats, sans oublier la qualité.",
 "Un produit moins cher mais de mauvaise qualité peut coûter plus cher à la fin.");
G('produits-saison', '🍉', "Acheter les produits de saison",
 "Les fruits et légumes de saison sont plus frais et moins chers.",
 "Renseigne-toi auprès des vendeurs sur ce qui est abondant en ce moment.",
 "Tu peux aussi sécher ou conserver certains produits.");
G('gaspillage', '♻️', "Réduire le gaspillage de nourriture",
 "Jeter de la nourriture, c'est jeter de l'argent.",
 "Prépare les bonnes quantités, conserve bien les restes et réutilise-les dans de nouveaux plats.",
 "Un plat bien conservé peut devenir le repas du lendemain.");
G('electricite', '💡', "Économiser l'électricité",
 "Quelques gestes simples réduisent la facture.",
 "Éteins les lumières et les appareils que tu n'utilises pas, ouvre les fenêtres le jour et ferme bien le frigo.",
 "Débranche les chargeurs une fois le téléphone chargé.");
G('planifier-repas', '📅', "Planifier les repas de la semaine",
 "Savoir à l'avance ce qu'on prépare fait gagner du temps et de l'argent.",
 "Écris un menu simple pour la semaine, fais les courses en fonction et prépare à l'avance ce qui peut l'être.",
 "Moins de stress et moins de gaspillage.");
G('arnaques', '🛡️', "Se méfier des arnaques",
 "Les promesses trop belles cachent souvent des pièges.",
 "Ne donne jamais ton code secret ou tes papiers à quelqu'un que tu ne connais pas. Renseigne-toi avant de payer quoi que ce soit.",
 "Demande conseil à une personne de confiance avant de décider.");
G('entretien-affaires', '🧰', "Entretenir ses affaires pour qu'elles durent",
 "Un objet bien entretenu dure plus longtemps.",
 "Nettoie, range et répare vite les petits défauts : une chaussure, un vêtement, un appareil.",
 "Un petit entretien évite un gros achat.");

/* ---------- Emploi de maison : candidats (10) et employeurs (10) — catégorie « Agence » ---------- */
const PAL = ['bleu','vert','orange','violet','turquoise','or','rose','terre'];
let k = 0;
const CTA_J = [
 "Candidates et candidats : contactez SHAMAN CHOOZ, nous étudions chaque dossier sérieusement.",
 "Parlez-nous de votre parcours : nous vous écoutons et vous orientons.",
 "Inscrivez-vous auprès de l'agence : un conseil, une orientation, un suivi sérieux.",
 "Faites le premier pas : appelez SHAMAN CHOOZ."
];
const CTA_E = [
 "Familles et employeurs : dites-nous ce que vous cherchez, nous vous aidons à recruter.",
 "Besoin de personnel de maison ? Contactez SHAMAN CHOOZ.",
 "Notre agence rapproche les familles et les personnes de confiance, dans le respect de chacun.",
 "Parlez-nous de votre besoin : nous étudions chaque demande sérieusement."
];
const J = (pre, id, emo, t, a, b, c, cta) => SCCS.add(pre + '-' + id, t, 'Agence', PAL[k++ % PAL.length], [
 [emo, "L'astuce", a], ['🔎', 'Comment faire', b], ['✅', 'À retenir', c], ['📞', 'SHAMAN CHOOZ vous accompagne', cta] ], { photo:true });
const X = (id, emo, t, a, b, c) => J('te', id, emo, "Astuce pour les employeurs : " + t, a, b, c, CTA_E[k % CTA_E.length]);
const Jc = (id, emo, t, a, b, c) => J('tj', id, emo, "Astuce pour les candidats : " + t, a, b, c, CTA_J[k % CTA_J.length]);

Jc('cv', '📄', "Un CV simple et clair",
 "Un CV d'une page, clair et honnête, suffit pour commencer.",
 "Note ton nom, ton contact, tes expériences, tes qualités et ce que tu sais faire : ménage, cuisine, enfants, repassage.",
 "Écris seulement ce qui est vrai : l'honnêteté inspire confiance.");
Jc('entretien-heure', '⏰', "Arriver à l'heure à l'entretien",
 "Arriver à l'heure est la première preuve de sérieux.",
 "Prépare ton trajet la veille et pars en avance pour ne pas être stressé.",
 "Préviens si tu as un empêchement.");
Jc('se-presenter', '🙋', "Bien se présenter",
 "Une présentation simple, polie et souriante fait bonne impression.",
 "Dis bonjour, donne ton nom, parle calmement de ton expérience et de ce que tu aimes faire.",
 "Regarde la personne dans les yeux et écoute bien les questions.");
Jc('tenue', '👚', "Une tenue propre et simple",
 "Une tenue propre et soignée montre du respect.",
 "Choisis des vêtements propres et confortables, des cheveux et des ongles soignés.",
 "Pas besoin d'habits chers : la propreté suffit.");
Jc('questions', '❓', "Poser les bonnes questions",
 "Poser des questions montre que tu es sérieux.",
 "Demande les horaires, les tâches exactes, le jour de repos, le lieu de travail et les conditions de logement s'il y en a.",
 "Note les réponses pour t'en souvenir.");
Jc('honnetete', '🤝', "Être honnête sur ses compétences",
 "Mieux vaut dire ce qu'on sait vraiment faire.",
 "Si tu ne sais pas faire quelque chose, dis que tu peux apprendre.",
 "Les employeurs apprécient quelqu'un qui apprend vite et dit la vérité.");
Jc('contrat', '📝', "Demander un accord écrit",
 "Un accord écrit protège le travailleur et la famille.",
 "Demande que les tâches, les horaires, le salaire et le jour de repos soient notés clairement.",
 "Garde une copie en lieu sûr.");
Jc('papiers', '🗂️', "Garder ses papiers en sécurité",
 "Tes papiers d'identité t'appartiennent.",
 "Garde-les sur toi ou dans un endroit sûr et fais-en des copies.",
 "Ne laisse jamais personne les garder à ta place.");
Jc('arnaque-emploi', '🛡️', "Se méfier des promesses trop belles",
 "Un emploi garanti contre de l'argent doit te faire réfléchir.",
 "Renseigne-toi sur l'agence ou la personne, demande des explications claires et parle-en à un proche de confiance avant de signer ou de payer.",
 "Si quelque chose est flou, demande des explications.");
Jc('apprendre', '🎓', "Apprendre chaque jour",
 "Chaque jour de travail est une occasion d'apprendre.",
 "Observe, demande comment faire et note ce que tu apprends. Avec le temps, tu deviens plus rapide.",
 "Un bon travailleur ne cesse jamais d'apprendre.");

X('definir-taches', '📋', "Définir clairement les tâches",
 "Des tâches claires évitent les malentendus.",
 "Écris la liste de ce que vous attendez : ménage, cuisine, enfants, linge, courses.",
 "Expliquez aussi les horaires et le jour de repos.");
X('horaires-repos', '⏳', "Fixer les horaires et le jour de repos",
 "Un travailleur reposé travaille mieux.",
 "Convenez ensemble des horaires, des pauses et d'un jour de repos par semaine.",
 "Respectez les règles de votre pays.");
X('salaire-clair', '💶', "Convenir clairement de la rémunération",
 "Une rémunération claire crée la confiance.",
 "Parlez ensemble du montant, de la date de paiement et des éventuelles primes avant de commencer.",
 "Payez toujours à la date prévue.");
X('premier-jour', '🏠', "Bien accueillir le premier jour",
 "Un bon accueil donne confiance dès le début.",
 "Présentez la maison, la famille, les habitudes, les produits et les règles de sécurité.",
 "Laissez du temps pour apprendre.");
X('accord-ecrit', '📝', "Mettre l'accord par écrit",
 "Un écrit protège la famille et le travailleur.",
 "Notez les tâches, les horaires, la rémunération et la durée de l'essai, et donnez une copie à chacun.",
 "Renseignez-vous sur les règles de votre pays.");
X('respect-repos', '😌', "Respecter les pauses et les repas",
 "Une personne bien traitée est plus motivée et plus fidèle.",
 "Prévoyez du temps pour manger et se reposer, dans un endroit propre.",
 "Le respect est la base d'une bonne relation.");
X('references', '🔍', "Vérifier les références",
 "Vérifier avant d'embaucher rassure tout le monde.",
 "Demandez les contacts d'anciens employeurs et prenez le temps d'un entretien sérieux.",
 "Passez par une agence sérieuse si vous préférez être accompagné.");
X('periode-essai', '🧪', "Prévoir une période d'essai",
 "Une période d'essai permet de se connaître.",
 "Convenez d'une durée claire, puis faites le point ensemble sur ce qui va bien et ce qui peut être amélioré.",
 "Soyez clairs et bienveillants dans vos retours.");
X('formation', '🎓', "Montrer comment on fait",
 "Chaque famille a ses habitudes : il faut les expliquer.",
 "Montrez les gestes une première fois, notez les recettes, les produits à utiliser et les consignes pour les enfants.",
 "Un travailleur bien formé est plus à l'aise.");
X('communication', '💬', "Parler avec respect et calme",
 "Une bonne communication évite beaucoup de problèmes.",
 "Parlez calmement, remerciez, corrigez avec bienveillance et écoutez les remarques.",
 "Une réunion courte chaque semaine aide à ajuster.");
})();

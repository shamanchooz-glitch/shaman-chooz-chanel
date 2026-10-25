/* ==========================================================
   PUBS 5/5 — SAVOIR-FAIRE DU FOYER (40 diaporamas pubs avec ta photo)
   Petites leçons utiles liées au métier : enfants, cuisine et hygiène, ménage et linge, organisation,
   accueil, et motivation. Elles montrent le sérieux de l'agence et donnent de bons réflexes.
   ========================================================== */
(function(){
if(!window.SCCS) return;
let k = 1;
const PC = ["Postulez dès aujourd'hui","Inscrivez-vous maintenant","Votre place vous attend","Appelez-nous","Faites le premier pas"];
const PE = ["Parlons de votre besoin","Confiez-nous votre recherche","Contactez-nous","Un appel suffit","Recrutons ensemble"];
const C = (id,t,p,sl,cta)=> SCCS.add('pd-'+id, t, 'Agence', p, sl.concat([['📞', PC[k++ % PC.length], cta]]), { photo:true });
const E = (id,t,p,sl,cta)=> SCCS.add('pd-'+id, t, 'Agence', p, sl.concat([['📞', PE[k++ % PE.length], cta]]), { photo:true });

/* ---------- Les enfants ---------- */
C('bain-bebe',"Le bain du bébé en toute sécurité",'turquoise',[
 ['🛁',"Préparer avant","Rassemblez serviette, savon doux et vêtements propres avant de commencer."],
 ['🌡️',"Une eau tiède","Vérifiez la température avec le coude : elle doit être agréable, jamais chaude."],
 ['🤲',"Ne jamais lâcher","Un bébé dans l'eau ne reste jamais seul, pas même une seconde."],
 ['🧣',"Bien sécher","Séchez doucement, surtout dans les plis, puis habillez rapidement pour éviter le froid."]
],"Un bébé en sécurité, c'est une famille tranquille. Rejoignez notre agence.");

C('biberon-propre',"Préparer un biberon proprement",'rose',[
 ['🧼',"Les mains d'abord","Lavez-vous toujours les mains avant de toucher un biberon."],
 ['🍼',"Un biberon propre","Lavez et rincez bien le biberon et la tétine après chaque utilisation."],
 ['📏',"Respecter les doses","Suivez exactement les indications des parents ou du médecin."],
 ['⏲️',"Ne pas garder","Un biberon préparé ne se garde pas longtemps : mieux vaut en refaire un nouveau."]
],"L'hygiène des petits, c'est notre priorité. Contactez notre agence.");

C('lavage-mains',"Se laver les mains : le geste numéro un",'bleu',[
 ['🙌',"Un geste qui protège","Se laver les mains évite beaucoup de maladies chez les enfants et les adultes."],
 ['🕒',"Quand le faire","Avant de cuisiner, avant de manger, après les toilettes, après le ménage."],
 ['🧽',"Bien frotter","Savon, paumes, dos des mains, doigts, ongles : au moins vingt secondes."],
 ['👶',"Apprendre aux enfants","Faites-en un jeu, avec une chanson, pour qu'ils prennent l'habitude."]
],"Les petits gestes font les grandes protections. Parlons de votre recrutement.");

C('heure-sieste',"L'heure de la sieste",'nuit',[
 ['😴',"Le repos des petits","Les enfants ont besoin de dormir pour grandir et rester de bonne humeur."],
 ['🌙',"Un cadre calme","Rideaux tirés, bruit réduit, chambre aérée : tout aide à s'endormir."],
 ['🧸',"Un rituel","Une chanson douce, un doudou, un câlin : les rituels rassurent."],
 ['👀',"Rester attentif","Vérifiez de temps en temps que l'enfant dort bien, sans le déranger."]
],"Une nounou attentive est précieuse. Inscrivez-vous chez nous.");

C('jeux-apprendre',"Jouer pour apprendre : idées pour les enfants",'orange',[
 ['🎨',"Dessiner et colorier","Une feuille et des crayons suffisent pour occuper un enfant et développer sa créativité."],
 ['🔢',"Compter en jouant","Compter les pas, les fruits, les jouets : les chiffres deviennent un jeu."],
 ['📖',"Raconter des histoires","Lire ou inventer des contes développe le langage et l'imagination."],
 ['🏃',"Bouger","Courses, danses et jeux de balle dépensent l'énergie des petits."]
],"Vous savez animer les enfants ? Les familles vous cherchent.");

C('aider-devoirs',"Aider les enfants avec les devoirs",'violet',[
 ['📚',"Un moment calme","Choisissez un endroit tranquille, loin de la télévision."],
 ['🗒️',"Lire les consignes","Aidez l'enfant à comprendre avant de répondre à sa place."],
 ['👏',"Encourager","Félicitez les efforts, même quand tout n'est pas parfait."],
 ['🤝',"Rester en lien avec les parents","Signalez les difficultés pour que la famille puisse agir."]
],"Un bon accompagnement scolaire fait la différence. Contactez-nous.");

C('caprice-enfant',"Quand l'enfant fait un caprice",'terre',[
 ['😤',"Rester calme","Un enfant en colère a besoin d'un adulte patient, pas d'un adulte énervé."],
 ['🗣️',"Parler doucement","Baissez la voix et dites simplement ce que vous attendez de lui."],
 ['🧩',"Comprendre pourquoi","Fatigue, faim, jalousie : il y a souvent une raison derrière un caprice."],
 ['🚫',"Pas de violence","Jamais de coups ni d'insultes : on explique et on guide."]
],"La douceur éduque mieux que la force. Rejoignez notre agence.");

C('securite-enfant',"Sécurité : ce qu'un enfant ne doit pas toucher",'rouge',[
 ['🔥',"Cuisine et feu","Éloignez les enfants des casseroles chaudes, du gaz et du fer à repasser."],
 ['🔌',"Électricité","Les prises et les fils doivent rester hors de portée."],
 ['🧴',"Produits dangereux","Rangez les produits d'entretien et les médicaments en hauteur."],
 ['🚪',"Portes et escaliers","Surveillez les marches, les fenêtres et les portes de sortie."]
],"La sécurité des enfants passe par la vigilance. Appelez notre agence.");

C('petite-blessure',"Petite blessure : les bons réflexes",'rose',[
 ['🩹',"Garder son calme","Rassurez l'enfant avec une voix douce."],
 ['💧',"Nettoyer","Lavez la petite plaie avec de l'eau propre, après vous être lavé les mains."],
 ['📞',"Prévenir les parents","Informez toujours la famille de ce qui s'est passé."],
 ['🏥',"Si c'est sérieux","En cas de doute, appelez les parents et les secours sans attendre."]
],"Des personnes responsables pour des familles confiantes. Contactez-nous.");

C('enfant-fievreux',"Enfant fiévreux : prévenir les parents",'turquoise',[
 ['🌡️',"Repérer les signes","Peau chaude, fatigue, enfant qui n'a pas envie de jouer ni de manger."],
 ['📞',"Appeler tout de suite","Prévenez les parents sans attendre : ils décideront de la suite."],
 ['💧',"Faire boire","Proposez de l'eau régulièrement, sans forcer."],
 ['🚫',"Pas de médicament sans accord","Ne donnez jamais un médicament sans l'accord des parents ou du médecin."]
],"La santé des enfants passe avant tout. Nous cherchons des personnes responsables.");

/* ---------- La cuisine ---------- */
C('repas-equilibre-enfants',"Un repas équilibré pour les enfants",'vert',[
 ['🍚',"Des féculents","Riz, igname, banane plantain, pâtes : de l'énergie pour toute la journée."],
 ['🐟',"Des protéines","Poisson, œufs, viande, haricots : pour grandir et se fortifier."],
 ['🥬',"Des légumes","Ils apportent des vitamines et aident à digérer."],
 ['🍊',"Un fruit","Un fruit en fin de repas est un vrai plus pour la santé."]
],"Bien nourrir les enfants, c'est un beau métier. Inscrivez-vous.");

C('fruits-legumes-jour',"Des fruits et légumes chaque jour",'vert',[
 ['🍌',"De la couleur dans l'assiette","Plus les couleurs varient, plus les vitamines sont variées."],
 ['🧼',"Bien laver","Lavez soigneusement fruits et légumes avant de les consommer."],
 ['🥭',"Du local et de saison","Les produits de saison sont plus frais, moins chers et plus savoureux."],
 ['👶',"Donner envie","Présentez-les joliment pour que les enfants aient envie d'y goûter."]
],"Cuisiner sain, c'est possible. Faites-en votre métier avec nous.");

C('eau-propre',"L'eau propre et potable",'bleu',[
 ['💧',"La base de la santé","Une eau propre protège contre de nombreuses maladies."],
 ['🍶',"Des récipients propres","Lavez régulièrement les bouteilles, seaux et fontaines."],
 ['🔥',"Faire bouillir si besoin","Quand on a un doute sur la qualité de l'eau, on la fait bouillir ou on la traite."],
 ['🚰',"Couvrir l'eau","Gardez l'eau de boisson dans un récipient fermé."]
],"Hygiène et santé : voilà ce que cherchent nos employeurs. Parlez-nous de vous.");

C('hygiene-cuisine',"Hygiène dans la cuisine",'orange',[
 ['🧽',"Plan de travail propre","Nettoyez avant et après chaque préparation."],
 ['🔪',"Des ustensiles lavés","Couteaux, planches, casseroles : lavés à l'eau chaude et au savon."],
 ['🗑️',"Les déchets","Videz les poubelles chaque jour et gardez-les fermées."],
 ['🐜',"Chasser les nuisibles","Une cuisine propre et rangée attire moins les insectes et les rongeurs."]
],"Une cuisine propre est la meilleure des cuisines. Rejoignez notre agence.");

C('bien-conserver',"Bien conserver les aliments",'turquoise',[
 ['🧊',"Le froid protège","Mettez rapidement les aliments périssables au réfrigérateur."],
 ['📦',"Fermer et couvrir","Les aliments couverts restent frais plus longtemps."],
 ['📅',"Respecter les dates","Vérifiez les dates et ne gardez pas ce qui paraît douteux."],
 ['🍲',"Réchauffer à cœur","Un plat réchauffé doit l'être jusqu'au cœur, jamais à moitié."]
],"Bien conserver, c'est protéger toute la famille. Contactez-nous.");

C('cru-cuit',"Ne pas mélanger le cru et le cuit",'rouge',[
 ['🥩',"Un risque simple","Le contact entre viande crue et aliments cuits peut rendre malade."],
 ['🔪',"Deux planches","Une planche pour le cru, une autre pour le cuit : c'est plus sûr."],
 ['🧼',"Se laver après","Lavez-vous les mains et les ustensiles après avoir touché de la viande crue."],
 ['🧊',"Séparer au frigo","Rangez la viande crue en bas, dans un récipient fermé."]
],"Les bons réflexes de cuisine font les bons professionnels. Rejoignez-nous.");

C('bien-cuire',"Bien cuire viande et poisson",'terre',[
 ['🍖',"Une cuisson complète","Viande et poisson doivent être bien cuits à cœur pour éviter les intoxications."],
 ['🍗',"La volaille surtout","Le poulet est cuit quand le jus qui s'écoule est clair."],
 ['🥚',"Les œufs","Mieux vaut bien les cuire, surtout pour les jeunes enfants."],
 ['👨‍🍳',"Goûter avec une cuillère propre","Utilisez une cuillère propre à chaque fois que vous goûtez."]
],"Cuisiner en sécurité : voilà le sérieux que nous recommandons.");

C('sans-gaspiller',"Cuisiner sans gaspiller",'or',[
 ['♻️',"Utiliser les restes","Un reste de riz devient une salade, un reste de poisson un beignet."],
 ['📝',"Planifier","Prévoir les repas de la semaine évite d'acheter ce dont on n'a pas besoin."],
 ['🧺',"Bien stocker","Un bon rangement évite que les produits ne se perdent."],
 ['💡',"Une économie réelle","Moins de gaspillage, c'est plus d'argent pour la famille."]
],"Une bonne gestion se remarque et se récompense. Contactez notre agence.");

C('faire-courses',"Faire les courses intelligemment",'vert',[
 ['🛒',"Une liste avant de partir","Notez ce dont vous avez besoin pour ne rien oublier."],
 ['💰',"Comparer les prix","Marché, boutique, supermarché : les prix peuvent varier beaucoup."],
 ['🥕',"Choisir la fraîcheur","Regardez la couleur, l'odeur et la fermeté des produits."],
 ['🧾',"Garder le ticket","Rendez toujours le ticket et la monnaie à votre employeur."]
],"Honnête et organisée ? Nos familles vous attendent.");

E('budget-courses',"Gérer le budget des courses de la maison",'bleu',[
 ['📒',"Un budget clair","Fixez ensemble une somme par semaine ou par mois."],
 ['🧾',"Un carnet de dépenses","Votre employée note ce qu'elle achète pour que tout soit transparent."],
 ['🤝',"De la confiance","Un budget partagé évite les malentendus."],
 ['📈',"Des économies","Une bonne gestion peut faire baisser les dépenses sans sacrifier la qualité."]
],"Nous cherchons des personnes honnêtes et organisées pour vous.");

/* ---------- Le ménage et le linge ---------- */
C('laver-sol',"Laver le sol dans le bon ordre",'turquoise',[
 ['🧹',"Balayer d'abord","On commence toujours par enlever la poussière avant de laver."],
 ['🪣',"Une eau propre","Changez l'eau du seau quand elle devient sale."],
 ['↩️',"Reculer vers la sortie","Lavez en reculant pour ne pas marcher sur le sol propre."],
 ['🌬️',"Laisser sécher","Aérez la pièce et prévenez les enfants pour éviter les glissades."]
],"Un sol propre, une maison agréable. Faites-en votre force. Contactez-nous.");

C('salle-de-bain',"Nettoyer la salle de bain",'bleu',[
 ['🚿',"Un lieu d'hygiène","La salle de bain doit être propre et sèche pour éviter moisissures et mauvaises odeurs."],
 ['🧴',"Bon produit, bon endroit","Un produit pour les sanitaires, un autre pour les surfaces et les carreaux."],
 ['🧤',"Mettre des gants","Protégez vos mains et gardez-les séparées de celles utilisées en cuisine."],
 ['🌬️',"Aérer","Laissez la porte ou la fenêtre ouverte pour que tout sèche."]
],"Le détail fait la qualité. Rejoignez notre agence.");

C('toilettes-propres',"Toilettes propres, famille en bonne santé",'violet',[
 ['🚽',"Une priorité","Des toilettes propres protègent toute la famille contre les infections."],
 ['🧽',"Un matériel dédié","Utilisez des brosses et chiffons réservés aux toilettes, jamais ailleurs."],
 ['🧼',"Se laver les mains","Après chaque nettoyage, lavez-vous bien les mains."],
 ['📅',"Régulièrement","Un petit nettoyage chaque jour vaut mieux qu'un gros de temps en temps."]
],"Le sérieux dans l'hygiène est un atout majeur. Parlons de votre place.");

C('trier-linge',"Trier le linge avant de laver",'rose',[
 ['🧺',"Séparer les couleurs","Blanc, clair, foncé : on ne lave pas tout ensemble."],
 ['🏷️',"Lire les étiquettes","Elles indiquent la température et le type de lavage."],
 ['👶',"Le linge des bébés","À laver séparément, avec un savon doux."],
 ['🔍',"Vérifier les poches","Un papier ou un stylo oubliés peuvent abîmer tout le linge."]
],"Un linge bien traité dure plus longtemps. Contactez notre agence.");

C('repasser-bien',"Repasser sans abîmer",'orange',[
 ['👔',"Régler la température","Chaque tissu a sa chaleur : commencez par les plus délicats."],
 ['💨',"Avec un peu de vapeur","Un linge légèrement humide se repasse plus facilement."],
 ['👗',"Par ordre","Les tissus fins d'abord, puis les tissus épais."],
 ['⚡',"Débrancher","Après usage, débranchez et laissez refroidir hors de portée des enfants."]
],"Repasser, c'est un art. Montrez votre talent avec notre agence.");

C('enlever-taches',"Enlever les taches courantes",'terre',[
 ['🍷',"Agir vite","Une tache fraîche part bien plus facilement qu'une tache ancienne."],
 ['💧',"D'abord l'eau froide","Rincez à l'eau froide avant d'utiliser un produit."],
 ['🧼',"Frotter doucement","Un frottement trop fort peut abîmer le tissu."],
 ['🔎',"Tester avant","Essayez le produit sur un endroit caché du vêtement."]
],"Savoir-faire et patience : deux qualités que nous recherchons. Inscrivez-vous.");

C('anti-moustiques',"Se protéger des moustiques à la maison",'vert',[
 ['🦟',"Un vrai danger","Les moustiques peuvent transmettre des maladies graves."],
 ['🚫',"Supprimer l'eau stagnante","Videz seaux, pots et vieux pneus où l'eau reste immobile."],
 ['🛏️',"Moustiquaires","Dormir sous moustiquaire protège enfants et adultes."],
 ['🪟',"Fermer au bon moment","Fermez fenêtres et portes au crépuscule ou utilisez des grillages."]
],"La santé du foyer commence par de bons réflexes. Rejoignez notre agence.");

C('vitres-brillent',"Des vitres qui brillent",'turquoise',[
 ['🪟',"Un coup d'éclat","Des vitres propres illuminent toute la maison."],
 ['🧴',"Un produit simple","De l'eau et un peu de vinaigre ou de savon suffisent souvent."],
 ['📰',"Bien essuyer","Utilisez un chiffon propre ou un racloir pour éviter les traces."],
 ['☁️',"Choisir son moment","Évitez de nettoyer en plein soleil : le produit sèche trop vite."]
],"Le détail fait la différence. Venez montrer le vôtre.");

C('ranger-place',"Ranger : une place pour chaque chose",'nuit',[
 ['🗃️',"Une place pour tout","Quand chaque objet a sa place, on le retrouve vite."],
 ['⏱️',"Ranger tout de suite","Remettre à sa place après usage évite l'accumulation."],
 ['👶',"Penser aux enfants","Des jouets accessibles et des objets dangereux hors de portée."],
 ['🙂',"Une maison apaisante","Une maison rangée est une maison plus calme."]
],"Un bon rangement, c'est de la tranquillité. Contactez-nous.");

/* ---------- Organisation, accueil, motivation ---------- */
E('planning-semaine',"Un planning de semaine facile à suivre",'bleu',[
 ['📅',"Un jour, une tâche principale","Lundi lessive, mardi chambres, mercredi courses, jeudi cuisine du week-end…"],
 ['✅',"Cocher au fur et à mesure","Une simple liste affichée dans la cuisine suffit."],
 ['🔄',"Ajuster","On adapte selon les imprévus et les besoins de la famille."],
 ['🌟',"Résultat","Moins de stress, plus de régularité, plus de satisfaction."]
],"Nous trouvons pour vous une personne organisée. Appelez-nous.");

E('stock-maison',"Gérer le stock de la maison",'or',[
 ['📦',"Savoir ce qu'il reste","Produits d'entretien, riz, huile, savon : un inventaire régulier évite les ruptures."],
 ['📝',"Une liste d'achats","Notez ce qui manque au fur et à mesure."],
 ['⚖️',"Acheter par quantité raisonnable","Ni trop, ni trop peu : ce qui sert vraiment."],
 ['🗝️',"Un rôle de gouvernante","Gérer les stocks est l'une de ses missions principales."]
],"Vous cherchez une gouvernante qui gère tout ? Parlons-en.");

C('gaz-electricite',"Attention au gaz et à l'électricité",'rouge',[
 ['🔥',"Le gaz","Fermez toujours la bouteille après usage et vérifiez qu'il n'y a pas de fuite."],
 ['🔌',"Les prises","Ne touchez jamais une prise avec les mains mouillées."],
 ['🚒',"Les accidents","En cas de doute, coupez l'arrivée, aérez et prévenez l'employeur."],
 ['👶',"Éloigner les enfants","Interdisez l'accès à la cuisine quand vous cuisinez."]
],"La sécurité à la maison, c'est un professionnalisme. Contactez notre agence.");

C('accueillir-invites',"Accueillir les invités",'rose',[
 ['🚪',"Un sourire à la porte","Un accueil chaleureux donne envie de se sentir chez soi."],
 ['🥤',"Proposer à boire","Un verre d'eau ou un jus est un geste simple et apprécié."],
 ['🪑',"Installer confortablement","Proposez un siège et un endroit où poser les affaires."],
 ['🙏',"Politesse","Un ton calme et poli reflète l'image de toute la maison."]
],"L'accueil est un art. Venez le pratiquer avec nos familles.");

C('dresser-table',"Dresser la table",'terre',[
 ['🍽️',"Les bases","Assiette, verre, couverts : chaque convive a sa place."],
 ['🥄',"Placer correctement","Fourchette à gauche, couteau et cuillère à droite."],
 ['🧻',"Les petits détails","Serviettes, eau fraîche, sel et condiments à portée."],
 ['✨',"Un plus","Une fleur ou une jolie nappe donne une belle ambiance."]
],"Le service à table se prépare : formez-vous avec nous.");

C('servir-elegance',"Servir à table avec élégance",'violet',[
 ['🤵',"Une bonne posture","Dos droit, mains propres, sourire discret."],
 ['🍛',"Servir dans l'ordre","On sert les invités d'abord, puis les membres de la famille."],
 ['🔇',"Rester discret","On sert sans bruit, on enlève les assiettes avec délicatesse."],
 ['👀',"Observer","Un bon service anticipe les besoins avant qu'on les exprime."]
],"Élégance et simplicité : voilà ce qui fait les meilleurs services. Rejoignez-nous.");

C('animaux-maison',"Prendre soin des animaux de la maison",'vert',[
 ['🐕',"Un membre de la famille","Beaucoup de familles ont un chien, un chat ou d'autres animaux."],
 ['🍖',"Nourrir et abreuver","Respectez les horaires et les quantités indiqués par la famille."],
 ['🧼',"Hygiène","Nettoyez les gamelles, les coins de repos et lavez-vous les mains après contact."],
 ['❤️',"Douceur","Un animal bien traité reste calme et en bonne santé."]
],"Vous aimez les animaux ? Précisez-le à notre agence.");

C('cour-jardin',"Entretenir la cour et le jardin",'terre',[
 ['🌿',"Un extérieur soigné","Une cour propre donne une bonne image de la maison."],
 ['🧹',"Balayer régulièrement","Feuilles, poussière et déchets : un petit balai chaque jour suffit."],
 ['💧',"Arroser","Au lever ou au coucher du soleil, pour mieux garder l'eau."],
 ['🐍',"Prudence","Portez des chaussures fermées et regardez où vous mettez les mains."]
],"Une personne polyvalente est toujours la bienvenue. Contactez-nous.");

C('bien-commencer-journee',"Bien commencer sa journée de travail",'orange',[
 ['🌅',"Se préparer le matin","Un bon réveil, un bon petit déjeuner et une tenue propre donnent du courage."],
 ['🙏',"Une pensée positive","Dites-vous que vous allez réussir votre journée."],
 ['🚶',"Arriver sereinement","Partir à temps évite le stress du retard."],
 ['😊',"Un bon bonjour","Un sourire à l'arrivée donne le ton de la journée."]
],"Une journée bien commencée, c'est déjà la moitié du succès. Inscrivez-vous.");

C('chaque-pas',"Chaque pas compte",'bleu',[
 ['👣',"Petit à petit","On ne devient pas gouvernante en un jour : chaque effort vous rapproche du but."],
 ['📈',"Apprendre de ses erreurs","Une erreur est une leçon : elle vous rend plus forte."],
 ['💪',"Garder le cap","Même quand c'est difficile, continuez : les bons moments reviennent."],
 ['🌟',"Croire en soi","Vous avez des qualités uniques : faites-les voir."]
],"Votre prochain pas : appeler notre agence. Faites-le maintenant.");

C('merci-maison',"Merci à celles et ceux qui font vivre nos maisons",'or',[
 ['🙏',"Un grand merci","Moi, SHAMAN CHOOZ, je dis merci à toutes les personnes qui prennent soin des maisons et des enfants."],
 ['❤️',"Un travail d'amour","Sans vous, beaucoup de familles ne pourraient pas travailler, étudier et se reposer."],
 ['🌍',"Dans tous les pays","Du village à la grande ville, vous êtes partout et vous comptez."],
 ['🤝',"Notre engagement","Mettre en relation les bonnes personnes, avec respect et clarté."]
],"À toutes celles et ceux qui travaillent à la maison : notre agence est à vos côtés.");
})();

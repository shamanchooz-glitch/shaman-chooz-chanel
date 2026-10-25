/* ==========================================================
   PUBS 7/10 — FILLE DE MÉNAGE & SERVANTE DE MAISON (40 nouveaux diaporamas pubs avec ta photo)
   Le métier en détail : chaque pièce, chaque saison, le linge, le matériel, les bons réflexes,
   le respect de la famille et de ses affaires. Même message : ménage, enfants et cuisine = un seul métier.
   Chaque diaporama = 4 écrans + 1 écran « appel à l'action » ajouté automatiquement, puis la page « Contactez-nous ».
   C(...) = pour les candidat(e)s • E(...) = pour les employeurs / familles
   Les identifiants commencent par « pf- ».
   ========================================================== */
(function(){
if(!window.SCCS) return;
let k = 0;
const PC = ["Postulez dès aujourd'hui","Inscrivez-vous maintenant","Votre place vous attend","Appelez-nous","Faites le premier pas"];
const PE = ["Parlons de votre besoin","Confiez-nous votre recherche","Contactez-nous","Un appel suffit","Recrutons ensemble"];
const C = (id,t,p,sl,cta)=> SCCS.add('pf-'+id, t, 'Agence', p, sl.concat([['📞', PC[k++ % PC.length], cta]]), { photo:true });
const E = (id,t,p,sl,cta)=> SCCS.add('pf-'+id, t, 'Agence', p, sl.concat([['📞', PE[k++ % PE.length], cta]]), { photo:true });

/* ---------- Pièce par pièce ---------- */
C('chambre-parfaite',"Une chambre bien faite, du lit au sol",'violet',[
 ['🛏️',"Le lit d'abord","Tirez les draps, lissez-les, rangez les oreillers : un lit bien fait change toute la chambre."],
 ['🪟',"Aérer","Ouvrez la fenêtre quelques minutes, même en saison chaude, pour renouveler l'air."],
 ['🧺',"Le linge à sa place","Vêtements sales dans le panier, vêtements propres rangés : la chambre reste claire."],
 ['🧹',"Le sol en dernier","Poussière sur les meubles d'abord, puis balai ou serpillière pour finir."]
],"Vous aimez les chambres bien tenues ? Des familles vous cherchent.");

C('salon-accueillant',"Un salon propre et accueillant",'or',[
 ['🛋️',"La pièce vitrine","Le salon est la pièce où l'on reçoit : c'est elle que les visiteurs voient en premier."],
 ['🧽',"Les surfaces","Tables, étagères et télécommande : un chiffon propre et légèrement humide suffit souvent."],
 ['🪑',"Dessous et derrière","Pensez à nettoyer sous les fauteuils et derrière les meubles, là où la poussière s'accumule."],
 ['🌸',"Une touche finale","Des coussins bien placés et une pièce aérée donnent une impression de fraîcheur."]
],"Un salon impeccable, c'est votre fierté ? Rejoignez notre agence.");

C('cuisine-fond',"Nettoyer la cuisine en profondeur",'orange',[
 ['🍳',"Les plaques et le plan de travail","Retirez les restes, passez de l'eau savonneuse, puis rincez et séchez."],
 ['🚰',"L'évier et les robinets","Frottez les bords et la bonde : c'est là que s'installent les mauvaises odeurs."],
 ['🗑️',"La poubelle","Videz-la souvent, lavez-la régulièrement et mettez toujours un sac propre."],
 ['🧩',"Même métier","Une cuisine propre, c'est du ménage et c'est aussi de la préparation des repas : tout se tient."]
],"La cuisine n'a pas de secret pour vous ? Faites-vous connaître.");

C('refrigerateur-entretien',"Le réfrigérateur : un entretien régulier",'turquoise',[
 ['🧊',"Vider et trier","Sortez les produits périmés ou abîmés, et gardez ceux qui sont encore bons."],
 ['🧽',"Nettoyer les étagères","Eau tiède et un peu de savon, puis bien essuyer : l'humidité favorise les mauvaises odeurs."],
 ['🥫',"Ranger intelligemment","Aliments cuits en haut, viande crue en bas et bien fermée : on évite de mélanger."],
 ['📆',"Une habitude","Un petit passage chaque semaine évite un gros nettoyage plus tard."]
],"Vous avez de bons réflexes d'hygiène ? Les familles les apprécient.");

C('evier-robinets',"Robinets et lavabos brillants",'bleu',[
 ['🚿',"Des détails qui comptent","Un robinet qui brille donne tout de suite une impression de propreté."],
 ['🧴',"Un produit adapté","Utilisez le produit prévu pour la surface, jamais plusieurs produits mélangés."],
 ['🪥',"Les recoins","Une vieille brosse à dents aide à nettoyer les joints et les bords."],
 ['🧻',"Essuyer pour finir","Un coup de chiffon sec évite les traces de calcaire et fait briller."]
],"L'œil du détail est votre force ? Parlons de votre profil.");

C('poussiere-saison-seche',"Contre la poussière de la saison sèche",'terre',[
 ['🌬️',"Un air plus chargé","En saison sèche, la poussière entre plus facilement dans la maison, surtout avec le vent."],
 ['🧽',"Chiffon humide","Passez un chiffon légèrement humide : la poussière reste dessus au lieu de voler."],
 ['🪟',"Fenêtres et rebords","Nettoyez les rebords et les moustiquaires, où la poussière s'accumule vite."],
 ['⏰',"Un petit passage chaque jour","Un nettoyage léger chaque jour est plus facile qu'un grand rattrapage."]
],"Vous connaissez les saisons de la maison ? Inscrivez-vous.");

C('saison-pluies-humidite',"La saison des pluies : attention à l'humidité",'vert',[
 ['🌧️',"L'humidité s'installe","Quand il pleut beaucoup, les murs, le linge et les chaussures sèchent mal."],
 ['🌬️',"Aérer dès que possible","Ouvrez fenêtres et portes dès qu'il y a une éclaircie pour chasser l'humidité."],
 ['🍄',"Surveiller la moisissure","Cherchez les taches noires aux coins et derrière les meubles, et nettoyez-les vite."],
 ['👟',"Faire sécher correctement","Chaussures, serviettes et vêtements doivent sécher complètement avant d'être rangés."]
],"Une bonne gestion de la maison toute l'année : voilà votre atout.");

C('moustiquaire-chambre',"La moustiquaire : un geste simple qui protège",'nuit',[
 ['🦟',"Chaque soir","Vérifiez que la moustiquaire est bien installée, sans trou, et que les bords sont rentrés sous le matelas."],
 ['🩹',"Réparer les trous","Un petit trou suffit à laisser passer les moustiques : signalez-le ou réparez-le."],
 ['🧼',"Laver doucement","Lavez-la de temps en temps selon les consignes, sans l'abîmer."],
 ['👶',"Pensez aux enfants","Les petits sont fragiles : un lit bien protégé rassure toute la famille."]
],"Vous pensez à la santé de la maison ? Rejoignez notre agence.");

C('matelas-draps',"Matelas propres, draps frais",'rose',[
 ['🛌',"Changer les draps","Changez-les régulièrement et plus souvent en cas de chaleur, de maladie ou d'accident."],
 ['☀️',"Aérer le matelas","Au soleil ou à l'air libre quand c'est possible, il reste plus sain."],
 ['🧺',"Bien laver","Lavez les draps selon l'étiquette et faites-les sécher complètement."],
 ['🌙',"Un sommeil agréable","Une chambre fraîche et propre aide toute la famille à bien dormir."]
],"Le soin du linge est votre spécialité ? Faites-le savoir.");

C('rideaux-coussins',"Rideaux et coussins : les oubliés du ménage",'bleu',[
 ['🪟',"Ils prennent la poussière","Les rideaux retiennent beaucoup de poussière et d'odeurs de cuisine."],
 ['🧺',"Laver régulièrement","Décrochez-les et lavez-les selon l'étiquette, en faisant attention aux tissus fragiles."],
 ['🛋️',"Les housses de coussins","Secouez-les dehors et lavez-les quand c'est possible."],
 ['✨',"Un effet immédiat","Des rideaux frais changent l'aspect de toute la pièce."]
],"Le ménage en profondeur vous passionne ? Parlons-en.");

C('canapes-tapis',"Entretenir canapés et tapis",'terre',[
 ['🛋️',"Aspirer ou brosser","Retirez la poussière et les miettes, surtout dans les coins et sous les coussins."],
 ['🧴',"Traiter les taches vite","Une tache fraîche part plus facilement. Tamponnez, ne frottez pas fort."],
 ['🔍',"Tester d'abord","Essayez le produit sur un petit endroit caché avant de nettoyer tout le tissu."],
 ['☀️',"Sécher à l'air","Laissez bien sécher dans un endroit aéré pour éviter l'odeur d'humidité."]
],"Soigneuse et patiente ? Les familles vous attendent.");

C('entree-chaussures',"Un coin d'entrée bien tenu",'or',[
 ['👟',"Chaussures rangées","Un coin pour les chaussures évite de salir toute la maison."],
 ['🧹',"Un petit balai à portée","Un balai ou une serpillière à l'entrée permet de réagir tout de suite."],
 ['🚪',"La première impression","L'entrée donne le ton : un coin propre met tout de suite à l'aise."],
 ['🧒',"Avec les enfants","Apprenez-leur à enlever leurs chaussures : c'est un bon réflexe pour toute la famille."]
],"Vous savez organiser la maison ? Rejoignez notre agence.");

C('poubelles-dechets',"Gérer les déchets de la maison",'vert',[
 ['🗑️',"Des sacs propres","Changez le sac quand il est plein, avant qu'il déborde."],
 ['🚮',"Sortir à l'heure","Respectez les horaires de ramassage ou les consignes de la famille."],
 ['🧼',"Laver la poubelle","Un rinçage régulier supprime les odeurs et les insectes."],
 ['🐜',"Pas de restes ouverts","Gardez les aliments fermés pour ne pas attirer fourmis, cafards et mouches."]
],"Hygiène et propreté, c'est votre métier. Venez nous voir.");

C('cour-terrasse',"Cour, terrasse et balcon : ne pas les oublier",'turquoise',[
 ['🌳',"Un espace de vie","La cour ou la terrasse est souvent utilisée par les enfants et pour recevoir."],
 ['🧹',"Balayer régulièrement","Feuilles, sable et saletés entrent vite dans la maison si on les laisse."],
 ['🪣',"Laver de temps en temps","Un lavage à l'eau et au balai remet l'espace à neuf."],
 ['💧',"Éviter l'eau stagnante","Videz seaux et récipients pour limiter les moustiques."]
],"Aimez-vous que tout soit propre, dedans comme dehors ? Contactez-nous.");

C('ventilateurs-prises',"Ventilateurs et appareils : nettoyer avec prudence",'rouge',[
 ['🔌',"D'abord débrancher","Avant de nettoyer un appareil électrique, débranchez-le toujours."],
 ['🧽',"Chiffon à peine humide","Jamais d'eau qui coule sur les prises ou sur les moteurs."],
 ['💨',"Les pales","Nettoyez les pales d'un ventilateur avec soin, une par une, sans forcer."],
 ['⚠️',"Pas de mains mouillées","Ne touchez jamais une prise avec les mains mouillées."]
],"La sécurité à la maison est votre priorité ? Soyons en contact.");

C('machine-laver-entretien',"Machine à laver : l'utiliser et l'entretenir",'bleu',[
 ['🌀',"Ne pas la surcharger","Trop de linge lave mal et abîme la machine."],
 ['📖',"Lire les consignes","Programmes, températures et doses : suivez les indications de la famille."],
 ['🚪',"Laisser la porte ouverte","Après le lavage, laissez-la entrouverte pour éviter les mauvaises odeurs."],
 ['🧼',"Un nettoyage de temps en temps","Un entretien régulier prolonge la vie de l'appareil."]
],"Vous savez bien utiliser les appareils ? Faites-le savoir.");

C('plier-ranger-linge',"Plier et ranger le linge avec soin",'rose',[
 ['👕',"Plier proprement","Un linge bien plié prend moins de place et reste plus beau."],
 ['🗄️',"Un rangement logique","Chaque personne a son étagère, chaque type de vêtement son emplacement."],
 ['🧦',"Retrouver les paires","Associez les chaussettes dès le séchage pour gagner du temps."],
 ['🧩',"Du temps en plus","Un linge rangé vite laisse du temps pour les enfants et pour la cuisine."]
],"Organisée et rapide ? Les familles vous cherchent. Inscrivez-vous.");

C('laver-main-bien',"Laver à la main, correctement",'turquoise',[
 ['🪣',"Trier d'abord","Séparez blanc, couleurs claires et foncées, même pour un lavage à la main."],
 ['🫧',"Tremper puis frotter","Laissez agir le savon, frottez doucement, surtout aux cols et aux manches."],
 ['🚿',"Bien rincer","Rincez jusqu'à ce que l'eau soit claire, sans mousse."],
 ['☀️',"Étendre à l'ombre ou au soleil","Selon le tissu : le soleil peut faire pâlir les couleurs foncées."]
],"Vous prenez soin du linge comme il faut ? Parlons-en.");

C('linge-enfants',"Le linge des enfants et des bébés",'vert',[
 ['👶',"Un savon doux","La peau des petits est fragile : utilisez un savon doux et bien rincez."],
 ['🧷',"Laver séparément","Si les parents le demandent, lavez le linge de bébé à part."],
 ['🌤️',"Bien sécher","Un vêtement humide ne doit jamais être mis à un enfant."],
 ['🧩',"Ménage et enfants liés","Pour SHAMAN CHOOZ, le soin du linge des enfants montre bien que tout est un seul métier."]
],"Attentive aux petits comme à la maison ? Inscrivez-vous chez nous.");

C('economiser-produits',"Bien doser pour ne pas gaspiller",'orange',[
 ['🧴',"Moins mais mieux","Trop de produit ne nettoie pas mieux : il laisse des traces et coûte plus cher."],
 ['📏',"Respecter les doses","Suivez les indications de l'étiquette et de la famille."],
 ['💧',"L'eau aussi se ménage","Fermez le robinet quand vous n'en avez pas besoin."],
 ['🏆',"Une qualité très appréciée","Les familles aiment celles qui travaillent bien et sans gaspillage."]
],"Votre sens de l'économie est un atout. Présentez-vous à notre agence.");

C('entretenir-materiel',"Prendre soin de son matériel de ménage",'terre',[
 ['🧹',"Balai et serpillière","Rincez-les après chaque usage et laissez-les sécher à l'air."],
 ['🧽',"Éponges et chiffons","Changez-les souvent : une éponge sale étale les microbes."],
 ['🪣',"Seaux propres","Videz et rincez le seau, ne le laissez pas avec de l'eau sale."],
 ['📦',"Un rangement sûr","Rangez produits et matériel hors de portée des enfants."]
],"Du matériel propre, un travail propre. Rejoignez-nous.");

C('proteger-mains',"Protégez vos mains au travail",'rose',[
 ['🧤',"Des gants","Ils protègent la peau des produits, de l'eau chaude et des frottements."],
 ['🥛',"Hydrater","Après le travail, séchez et hydratez vos mains pour éviter les crevasses."],
 ['⚠️',"Les produits forts","Gardez-les à distance du visage et des yeux, et ne les mélangez jamais."],
 ['🩺',"Une irritation ?","Si la peau reste irritée, parlez-en et consultez un professionnel de santé."]
],"Votre santé compte autant que votre travail. Venez nous parler.");

C('pauses-eau',"Boire de l'eau et faire de petites pauses",'bleu',[
 ['💧',"Hydratez-vous","Dans une journée de ménage, on transpire et on perd de l'énergie : buvez de l'eau."],
 ['⏸️',"De vraies pauses","Quelques minutes pour vous asseoir vous permettent de mieux continuer."],
 ['🍽️',"Manger à l'heure","Un repas pris à temps donne de la force pour l'après-midi."],
 ['🗣️',"En parler à l'employeur","Les temps de repos font partie d'un bon accord de travail."]
],"Un travail dans de bonnes conditions, voilà ce que nous cherchons.");

C('vite-et-bien',"Travailler vite sans bâcler",'violet',[
 ['⏱️',"Un ordre efficace","Commencez par la pièce la plus importante ou la plus sale, puis avancez."],
 ['🧠',"Un geste après l'autre","Évitez de courir partout : terminez une zone avant de passer à la suivante."],
 ['🧰',"Tout à portée","Préparez vos produits et chiffons avant de commencer."],
 ['✅',"Vérifier à la fin","Un dernier regard permet de corriger un oubli avant le retour de la famille."]
],"Efficace et soigneuse ? Rejoignez notre agence.");

C('checklist-quotidienne',"Une liste simple pour chaque jour",'or',[
 ['📋',"Écrire ses tâches","Une liste évite les oublis et rassure l'employeur."],
 ['☑️',"Cocher au fur et à mesure","On voit ce qui est fait et ce qu'il reste à faire."],
 ['🧩',"Ménage, enfants, cuisine","Si votre poste couvre les trois, la liste vous aide à tout organiser."],
 ['🏡',"Un foyer bien réglé","Une bonne organisation rend tout le monde plus tranquille."]
],"Organisation et sérieux : voilà ce que les familles recherchent.");

C('grand-menage-mois',"Le grand ménage du mois",'turquoise',[
 ['🗓️',"Un jour dédié","Choisissez un moment calme pour nettoyer ce qu'on ne fait pas chaque jour."],
 ['🪟',"Haut des murs, placards, vitres","Ce sont des zones oubliées qui font la différence."],
 ['📦',"Trier","Jetez ce qui est cassé ou inutile après avoir demandé à la famille."],
 ['🎉',"Quel résultat","Une maison fraîche donne de l'énergie à tous."]
],"Le grand ménage vous motive ? Rencontrons-nous.");

C('preparer-fetes',"Préparer la maison avant les fêtes",'rouge',[
 ['🎄',"Anticiper","Quelques jours avant, on nettoie en profondeur et on prépare les espaces d'accueil."],
 ['🍽️',"Les couverts et la vaisselle","Vérifiez qu'il y a assez de verres, d'assiettes et de linge de table propres."],
 ['🛏️',"Les chambres des invités","Draps propres, serviettes, fenêtres aérées."],
 ['🧩',"Tout se rejoint","Ménage, cuisine et enfants se préparent ensemble pour une belle fête."]
],"Les familles recrutent avant les fêtes. Inscrivez-vous maintenant.");

C('apres-reception',"Remettre la maison en ordre après une réception",'nuit',[
 ['🥂',"Les restes","Rangez d'abord les aliments pour qu'ils ne se gâtent pas."],
 ['🍽️',"La vaisselle","Triez, trempez et lavez dans le bon ordre."],
 ['🧹',"Sols et surfaces","Après le gros, les finitions : tables, sol, poubelles."],
 ['😮‍💨',"Prendre du repos","Un grand effort mérite du repos : parlez-en à l'employeur pour bien l'organiser."]
],"Un bon coup de main après les fêtes ? Contactez-nous.");

E('maison-absence',"Maison vide : qui s'en occupe ?",'bleu',[
 ['✈️',"Vous partez en voyage","Une maison fermée longtemps prend la poussière, l'humidité et parfois des visiteurs indésirables."],
 ['🔑',"Une personne de confiance","Quelqu'un qui passe aérer, nettoyer et surveiller rassure beaucoup."],
 ['📋',"Des consignes écrites","Plantes, courrier, poubelles, fenêtres : tout est noté."],
 ['📞',"Nous cherchons le bon profil","Nous vous présentons des personnes fiables pour cette mission."]
],"Partez l'esprit tranquille. Appelez notre agence.");

C('objets-valeur',"Respecter les objets de la famille",'or',[
 ['🏺',"Certains objets comptent beaucoup","Même s'ils ont l'air simples, certains objets ont une grande valeur pour la famille."],
 ['🤲',"Manipuler avec précaution","Demandez comment nettoyer ce qui est fragile ou précieux."],
 ['💬',"Dire en cas de casse","Un accident peut arriver. Il vaut mieux le dire tout de suite."],
 ['🤝',"La confiance se construit","L'honnêteté renforce la relation avec l'employeur."]
],"Sérieuse et respectueuse ? Rejoignez-nous.");

C('intimite-famille',"Respecter l'intimité de la famille",'violet',[
 ['🔒',"Chacun a sa vie privée","Ne fouillez pas les tiroirs, les téléphones ou les papiers de la famille."],
 ['🤫',"La discrétion","Ce que vous voyez et entendez à la maison n'a pas à être répété à l'extérieur."],
 ['🚪',"Frapper avant d'entrer","Même en travaillant, un petit geste de politesse est très apprécié."],
 ['🏅',"Un signe de professionnalisme","La discrétion fait partie des qualités les plus recherchées."]
],"Votre discrétion est un trésor. Venez nous voir.");

C('tenue-travail',"Une tenue de travail propre et pratique",'turquoise',[
 ['👗',"Pratique et confortable","Des vêtements qui permettent de bouger sans gêne et qui ne risquent pas de s'accrocher."],
 ['👟',"De bonnes chaussures","Elles doivent tenir au sol mouillé et protéger les pieds."],
 ['💇‍♀️',"Cheveux attachés","Surtout en cuisine : c'est plus propre et plus sûr."],
 ['✨',"Une image soignée","Une tenue propre rassure tout de suite l'employeur."]
],"Soignée et sérieuse ? Présentez-vous à notre agence.");

C('rendre-compte',"Rendre compte de son travail simplement",'terre',[
 ['🗣️',"Dire ce qui est fait","Un petit résumé de fin de journée rassure l'employeur."],
 ['📌',"Signaler un problème","Une fuite, un produit fini, un objet cassé : prévenez vite."],
 ['📝',"Garder des notes","Une liste de ce qui manque évite les oublis."],
 ['🤝',"Confiance réciproque","Plus vous êtes claire, plus la confiance grandit."]
],"Communication claire, travail serein. Rejoignez notre agence.");

C('petits-mots-liste',"Courses, liste et petits mots : bien communiquer",'rose',[
 ['🛒',"Une liste claire","Notez ce qui manque à la maison pour ne rien oublier lors des courses."],
 ['💶',"Garder les justificatifs","Les tickets permettent de montrer ce qui a été dépensé."],
 ['📱',"Un message rapide","Un petit message évite de longues explications."],
 ['🧩',"Organisation globale","Une bonne communication est utile pour le ménage, les enfants et la cuisine."]
],"Vous aimez bien faire les choses ? Inscrivez-vous.");

C('eco-gestes',"Les petits gestes qui protègent la maison et la planète",'vert',[
 ['💡',"Éteindre ce qui ne sert pas","Lumière et ventilateur inutiles coûtent cher."],
 ['🚰',"Économiser l'eau","Fermez le robinet pendant que vous frottez."],
 ['♻️',"Réutiliser","Certains pots et bouteilles peuvent servir de nouveau, si la famille est d'accord."],
 ['🌍',"Un exemple pour les enfants","Les petits apprennent en voyant ce que vous faites."]
],"Des gestes simples, un grand effet. Rejoignez notre agence.");

C('gerer-cles',"Gérer les clés de la maison avec sérieux",'nuit',[
 ['🔑',"Une grande responsabilité","Avoir les clés d'une maison est un signe de confiance."],
 ['🚪',"Toujours fermer","Fermez portes et fenêtres comme demandé, même pour une courte absence."],
 ['🚫',"Ne pas prêter","Ne donnez jamais les clés à quelqu'un d'autre sans autorisation."],
 ['📣',"En cas de perte","Prévenez immédiatement l'employeur."]
],"La confiance se gagne par la rigueur. Présentez-vous à notre agence.");

C('carnet-references',"Un carnet pour garder vos références",'orange',[
 ['📒',"Notez vos expériences","Où avez-vous travaillé, pendant combien de temps, pour quel type de poste ?"],
 ['📞',"Contacts de référence","Avec l'accord des personnes, gardez un numéro d'ancien employeur."],
 ['🏆',"Vos points forts","Notez ce que vous faites bien : cuisine, enfants, repassage, organisation."],
 ['🗂️',"Plus simple à l'inscription","Un carnet à jour aide l'agence à mieux vous présenter."]
],"Venez avec votre carnet. Nous le lirons avec attention.");

C('fiere-resultat',"Regarder son travail avec fierté",'or',[
 ['🌟',"Chaque pièce est une réussite","Une maison bien tenue est le résultat de vos efforts."],
 ['📸',"Gardez en tête le résultat","Un sol brillant, un lit impeccable, une famille contente : voilà ce qui compte."],
 ['🙏',"Votre travail est précieux","Il permet à la famille de vivre dans de bonnes conditions."],
 ['🏠',"Même métier, même fierté","Ménage, enfants, cuisine : SHAMAN CHOOZ le dit, c'est un seul métier honorable."]
],"Soyez fière de votre métier. Rejoignez notre agence.");

C('sols-differents',"Chaque sol demande sa méthode",'terre',[
 ['🧱',"Carrelage","Balayez, lavez à l'eau savonneuse, rincez et séchez pour éviter les glissades."],
 ['🪵',"Bois et parquet","Peu d'eau, un chiffon bien essoré : trop d'eau abîme le bois."],
 ['🏗️',"Ciment et sols bruts","Frottez avec une brosse dure, puis rincez abondamment."],
 ['👀',"Demander avant de nettoyer","Chaque famille a ses produits et ses habitudes : une question évite une erreur."]
],"Vous savez adapter votre travail à chaque maison ? Contactez-nous.");

C('chasser-odeurs',"Chasser les mauvaises odeurs de la maison",'vert',[
 ['👃',"Chercher la cause","Une odeur vient souvent d'une poubelle, d'un linge humide ou d'une bonde sale."],
 ['🌬️',"Aérer d'abord","L'air frais est la première solution, tous les jours."],
 ['🍋',"Des astuces simples","Du citron, du vinaigre ou du bicarbonate peuvent aider selon l'endroit : demandez l'accord de la famille."],
 ['🧼',"Nettoyer à la source","Le plus efficace reste de supprimer ce qui sent mauvais, pas de le cacher."]
],"Une maison qui sent bon, c'est votre signature. Rejoignez-nous.");
})();

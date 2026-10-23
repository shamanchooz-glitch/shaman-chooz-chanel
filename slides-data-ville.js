/* ==========================================================
   DIAPORAMAS « VILLE & COMMERCE » (20) — activités urbaines, commerce, petits métiers
   Chaque ligne : S(identifiant, titre, palette, [[emoji, titre, texte], …])
   Palettes : bleu, vert, orange, violet, rouge, or, rose, turquoise, nuit, terre
   Ces vidéos affichent ta photo (voir « photo » dans agence-config.js).
   Tu peux modifier les textes librement (garde les guillemets et les virgules).
   ========================================================== */
(function(){
if(!window.SCCS) return;
const S = (id, t, pal, sl)=> SCCS.add(id, t, 'Ville & commerce', pal, sl, { photo:true });

S('vc-prix','Fixer le bon prix de vente','bleu',[
 ['🧮',"Connaître ses coûts","Prix d'achat, transport, emballage, loyer : compte tout ce que tu dépenses pour vendre."],
 ['➕',"Ajouter une marge","La marge, c'est ce qui reste après les coûts : c'est ton gain et ce qui fait vivre ton activité."],
 ['👀',"Regarder les prix autour","Compare avec les autres vendeurs, sans te contenter de les copier."],
 ['👥',"Penser au client","Un bon prix est juste pour lui et rentable pour toi."],
 ['🔁',"Revoir régulièrement","Quand tes coûts changent, ton prix doit changer aussi."]
]);
S('vc-accueil','Bien accueillir un client','orange',[
 ['😊',"Le sourire d'abord","En quelques secondes, le client sent s'il est le bienvenu."],
 ['👋',"Saluer","Un « bonjour » franc, même si tu es occupé, montre du respect."],
 ['👂',"Écouter ce qu'il cherche","Laisse-le parler et pose des questions simples avant de proposer."],
 ['🤝',"Conseiller honnêtement","Propose ce qui lui convient vraiment, pas seulement le plus cher."],
 ['🙏',"Remercier","Un merci et un « à bientôt » : le client se souvient de la dernière impression."]
]);
S('vc-fidelisation','Fidéliser sa clientèle','vert',[
 ['🔁',"Un client fidèle vaut de l'or","Il revient, il achète plus souvent et il parle de toi autour de lui."],
 ['📒',"Retenir ses préférences","Note ce qu'il aime, sa taille, ses habitudes : il se sent reconnu."],
 ['🎁',"De petites attentions","Un geste commercial, une remise de fidélité, un petit cadeau de temps en temps."],
 ['📞',"Garder le contact","Un message pour annoncer l'arrivée d'un nouveau produit."],
 ['⭐',"La qualité avant tout","Un produit de qualité et un service fiable : voilà la meilleure fidélisation."]
]);
S('vc-stock','Gérer son stock simplement','terre',[
 ['📋',"Faire l'inventaire","Compte régulièrement ce que tu as : tu sais ce qui manque et ce qui dort."],
 ['🔥',"Repérer les produits qui partent vite","Garde-en toujours en réserve pour ne pas tomber en rupture."],
 ['📅',"Surveiller les dates","Les produits périssables doivent être vendus avant leur date limite."],
 ['🧱',"Bien ranger","Un stock rangé et propre se vérifie plus vite et s'abîme moins."],
 ['✍️',"Tout noter","Entrées et sorties dans un cahier : tu évites les pertes et les oublis."]
]);
S('vc-caisse','Tenir son cahier de caisse','or',[
 ['📒',"Un cahier simple","Date, ce que tu vends, ce que tu dépenses : une ligne par opération."],
 ['➕',"Les entrées","Chaque vente ou paiement reçu s'écrit le jour même."],
 ['➖',"Les sorties","Achats de marchandises, transport, factures : note aussi les petites dépenses."],
 ['🧮',"Faire le point chaque soir","Argent en caisse = argent de départ + entrées − sorties."],
 ['👛',"Séparer perso et pro","Ne mélange pas l'argent de ton commerce et celui de ta famille."]
]);
S('vc-vitrine','Soigner sa vitrine ou son étal','rose',[
 ['🧼',"Propre et net","Un étal propre donne confiance, surtout pour les aliments."],
 ['💡',"Bien éclairé et visible","Les clients doivent voir facilement tes produits, même de loin."],
 ['🏷️',"Prix affichés","Un prix clairement indiqué évite les hésitations et les disputes."],
 ['⭐',"Produits phares à hauteur des yeux","Place ce que tu veux vendre en premier au niveau du regard."],
 ['🔄',"Changer régulièrement","Une présentation renouvelée attire de nouveau l'attention."]
]);
S('vc-whatsapp','Vendre grâce à WhatsApp et aux réseaux','vert',[
 ['📸',"De belles photos","Une photo claire et bien éclairée vend mieux qu'un long texte."],
 ['📝',"Un catalogue clair","Nom du produit, prix, taille ou quantité, lieu de retrait ou de livraison."],
 ['⚡',"Répondre vite","Un client qui attend trop longtemps va voir ailleurs."],
 ['🛡️',"Prudence au paiement","Vérifie toujours le message de confirmation officiel avant de remettre la marchandise."],
 ['⭐',"Montrer les clients satisfaits","Avec leur accord, partage leurs avis : la confiance attire de nouveaux clients."]
]);
S('vc-client-colere','Gérer un client mécontent','rouge',[
 ['👂',"Écouter sans interrompre","Laisse-le exprimer sa colère : souvent, il veut d'abord être entendu."],
 ['😌',"Rester calme","Ne réponds pas sur le même ton. Respire et parle doucement."],
 ['🙏',"Reconnaître le problème","« Je comprends, je suis désolé » : ces mots calment beaucoup de situations."],
 ['🛠️',"Proposer une solution","Échange, remboursement, réparation ou geste commercial, selon tes règles."],
 ['📈',"Apprendre de l'erreur","Chaque plainte montre ce qu'on peut améliorer."]
]);
S('vc-negociation','Négocier avec respect','orange',[
 ['🎯',"Savoir ce que l'on veut","Connais ton prix minimum avant de commencer."],
 ['👂',"Écouter l'autre","Comprends ses besoins : tu trouveras plus facilement un accord."],
 ['🤝',"Chercher le gagnant-gagnant","Un bon accord laisse les deux côtés satisfaits."],
 ['🙂',"Rester poli","Le respect garde la relation, même si on ne s'accorde pas."],
 ['✍️',"Confirmer l'accord","Rappelle le prix, la quantité et le délai pour éviter tout malentendu."]
]);
S('vc-transport','Se déplacer en ville en sécurité','bleu',[
 ['🚌',"Choisir un transport fiable","Bus, taxis, gbakas : préfère les véhicules en bon état et bien identifiés."],
 ['👜',"Rester attentif","Garde ton sac devant toi et ton téléphone discret."],
 ['🕒',"Prévoir son trajet","Pars tôt pour éviter de courir. Prévois la monnaie pour payer."],
 ['🚶',"À pied : être vu","Traverse sur les passages piétons, regarde des deux côtés et ne marche pas les yeux rivés sur ton téléphone."],
 ['📲',"Prévenir un proche","Si tu rentres tard, dis à quelqu'un où tu es et quand tu arrives."]
]);
S('vc-securite-rue','Rester en sécurité dans la rue','nuit',[
 ['👜',"Sac fermé, devant toi","Dans la foule, garde tes affaires contre toi."],
 ['📱',"Téléphone discret","Évite de le sortir à tout moment dans une rue encombrée."],
 ['💡',"Chemins éclairés","Le soir, choisis les rues animées et bien éclairées."],
 ['💵',"Peu d'argent sur soi","N'expose pas de grosses sommes d'argent."],
 ['📞',"Savoir demander de l'aide","Repère un commerce ouvert, un poste de police ou une personne de confiance."]
]);
S('vc-marche','Réussir au marché','terre',[
 ['📍',"Choisir son emplacement","Un endroit passant et visible attire plus de clients."],
 ['🥬',"La fraîcheur d'abord","Des produits frais et bien présentés se vendent plus vite."],
 ['🧼',"Hygiène irréprochable","Mains propres, produits à l'abri de la poussière et des mouches."],
 ['📢',"Se faire remarquer poliment","Un accueil chaleureux et une voix claire attirent sans déranger."],
 ['🧾',"Compter tôt, compter juste","Note ce que tu achètes et ce que tu vends pour savoir si tu gagnes."]
]);
S('vc-livreur','Le métier de livreur','turquoise',[
 ['⏱️',"Ponctualité","Le client compte sur toi : annonce ton retard à l'avance si besoin."],
 ['📦',"Emballage soigné","Un colis bien fermé et bien protégé arrive en bon état."],
 ['🗺️',"Vérifier l'adresse","Un appel avant d'arriver évite de tourner en rond."],
 ['🪖',"Sécurité routière","Casque à moto, respect du code de la route : ta santé passe avant la vitesse."],
 ['😊',"Courtoisie","Un sourire et un merci donnent une bonne image de l'entreprise."]
]);
S('vc-restaurant','Lancer un petit restaurant (maquis)','orange',[
 ['📋',"Un menu simple","Peu de plats, mais bien faits : c'est plus facile à gérer et à vendre."],
 ['📍',"Bien choisir l'emplacement","Près des bureaux, des écoles ou des gares : là où passent tes clients."],
 ['🧼',"Hygiène et propreté","Mains lavées, eau propre, aliments protégés : c'est la clé de la confiance."],
 ['🧮',"Calculer le coût de chaque plat","Ingrédients, gaz ou charbon, temps de travail : sans calcul, on perd de l'argent."],
 ['⭐',"Soigner l'accueil","Un bon plat et un bon sourire font revenir les clients."]
]);
S('vc-couture','Réussir dans la couture','rose',[
 ['📏',"Des mesures précises","Une prise de mesures soignée évite les retouches."],
 ['📅',"Respecter les délais","Annonce une date réaliste et tiens parole, surtout avant les fêtes."],
 ['📒',"Noter chaque commande","Nom du client, modèle, mesures, avance reçue, date de livraison."],
 ['🎨',"Se démarquer","Un style personnel et de belles finitions te font remarquer."],
 ['📸',"Montrer ton travail","Les photos de tes créations (avec l'accord des clients) sont ta meilleure publicité."]
]);
S('vc-coiffure','Un salon de coiffure qui fidélise','violet',[
 ['🧼',"Outils désinfectés","Peignes, ciseaux et tondeuses propres entre chaque client."],
 ['😊',"Accueil chaleureux","Un salon agréable donne envie de revenir."],
 ['🗓️',"Un cahier de rendez-vous","Moins d'attente, moins de désordre, plus de clients satisfaits."],
 ['💬',"Écouter la demande","Regarde des exemples avec le client et valide le résultat avant de commencer."],
 ['🌟',"Se perfectionner","Suis les nouvelles techniques et les formations : la qualité attire."]
]);
S('vc-momo','Encaisser par mobile money : les bons réflexes','or',[
 ['📱',"Attendre le message officiel","Le SMS de confirmation de l'opérateur fait foi, pas une capture d'écran."],
 ['🔐',"Ne jamais donner son code secret","Personne n'a besoin de ton code PIN, pas même quelqu'un qui se dit agent."],
 ['🔎',"Vérifier le montant et le numéro","Une erreur arrive vite : compare avant de remettre la marchandise."],
 ['🚫',"Méfie-toi des fausses preuves","Des arnaqueurs montrent de faux écrans de paiement. Vérifie sur ton propre téléphone."],
 ['🧾',"Garder une trace","Note le paiement dans ton cahier, avec la date et l'heure."]
]);
S('vc-facture','Faire une facture ou un devis simple','bleu',[
 ['🏷️',"Les informations de base","Nom de l'entreprise, adresse, téléphone, date et numéro de la facture."],
 ['👤',"Le client","Nom du client et, si besoin, son adresse ou son contact."],
 ['📃',"Le détail","Produit ou service, quantité, prix unitaire : tout doit être clair."],
 ['🧮',"Le total","Additionne bien chaque ligne. Indique ce qui est déjà payé et ce qui reste à payer."],
 ['📅',"Le devis avant le travail","Il annonce le prix et la durée : le client sait à quoi s'attendre."]
]);
S('vc-marketing','Se faire connaître dans son quartier','rouge',[
 ['🪧',"Une enseigne visible","Un nom clair et lisible sur ta boutique ou ton étal."],
 ['🗣️',"Le bouche-à-oreille","Un client satisfait est ta meilleure publicité."],
 ['🪪',"Une carte de visite","Nom, activité, numéro : facile à donner et à garder."],
 ['🎉',"Des offres de lancement","Une promotion pour l'ouverture ou une occasion spéciale attire la curiosité."],
 ['📱',"Les réseaux sociaux","Un compte avec des photos régulières te rend visible bien au-delà de ta rue."]
]);
S('vc-telephone','Répondre au téléphone comme un pro','turquoise',[
 ['📞',"Décrocher avec le sourire","Le sourire s'entend dans la voix."],
 ['🏢',"Se présenter","Dis le nom de l'entreprise et ton prénom, puis : « Comment puis-je vous aider ? »"],
 ['👂',"Écouter et noter","Écris le nom, le numéro et la demande pendant que la personne parle."],
 ['🗣️',"Parler clairement","Voix posée, mots simples, sans avaler les syllabes."],
 ['🙏',"Conclure poliment","Résume ce qui a été dit, remercie et laisse le client raccrocher en premier."]
]);
})();

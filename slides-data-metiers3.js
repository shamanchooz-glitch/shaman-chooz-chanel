/* MÉTIERS 3 — 16 nouveaux métiers × 4 vidéos (recrutement, découverte, qualités, quiz) + 44 vidéos « Vrai ou faux » sur les 44 métiers.
   Les 16 métiers sont ajoutés à window.SCC_METIERS (lu ensuite par games-edu11.js). */
(function(){
if(!window.SCCS || !window.SCC_METIERS) return;
const N = [
['🚿','un laveur de voitures','Laveur de voitures','laver l\'extérieur|nettoyer l\'intérieur|lustrer et finir','soigneux|rapide|poli','Utilise des chiffons propres pour ne pas rayer la peinture.'],
['📱','un technicien téléphonie','Technicien téléphonie','réparer les écrans|changer les batteries|configurer et débloquer','minutieux|honnête|patient','Sauvegarde les données avant toute réparation.'],
['📷','un photographe','Photographe','faire des portraits|couvrir des événements|retoucher les images','créatif|ponctuel|à l\'écoute','Vérifie la lumière avant chaque prise de vue.'],
['🎤','un animateur d\'événements','Animateur d\'événements','présenter les cérémonies|animer le public|coordonner le programme','souriant|énergique|organisé','Prépare un programme minuté avec les organisateurs.'],
['🥘','un traiteur','Traiteur','préparer les plats|organiser les buffets|livrer sur place','organisé|propre|ponctuel','Respecte la chaîne du froid pour les denrées fragiles.'],
['🎈','un décorateur','Décorateur','choisir les thèmes|installer les décors|ranger après l\'événement','créatif|méthodique|ponctuel','Repère le lieu avant le jour de la fête.'],
['🏍️','un conducteur de moto-taxi','Conducteur de moto-taxi','transporter des passagers|connaître les quartiers|entretenir sa moto','prudent|ponctuel|courtois','Porte un casque et propose-en un à ton passager.'],
['🛠️','un mécanicien moto','Mécanicien moto','faire la vidange|régler les freins|changer les pneus','rigoureux|honnête|rapide','Contrôle les freins avant de rendre la moto.'],
['📚','un professeur particulier','Professeur particulier','expliquer les leçons|suivre les progrès|préparer les examens','patient|pédagogue|ponctuel','Adapte-toi au rythme de l\'élève.'],
['🍹','un barman','Barman','préparer les boissons|servir les clients|tenir le bar propre','souriant|rapide|propre','Mesure les quantités pour limiter les pertes.'],
['📦','un magasinier','Magasinier','recevoir les marchandises|ranger le stock|faire l\'inventaire','organisé|honnête|attentif','Note chaque entrée et chaque sortie.'],
['👞','un cordonnier','Cordonnier','réparer les chaussures|changer les semelles|cirer et finir','minutieux|patient|adroit','Nettoie bien la surface avant de coller.'],
['☀️','un installateur solaire','Installateur solaire','poser des panneaux|raccorder les batteries|entretenir l\'installation','rigoureux|prudent|compétent','Travaille toujours avec un équipement de sécurité en hauteur.'],
['🖥️','un assistant administratif','Assistant administratif','saisir les documents|classer les dossiers|préparer les courriers','rigoureux|discret|organisé','Sauvegarde ton travail régulièrement.'],
['🙋','un agent d\'accueil','Agent d\'accueil','accueillir les visiteurs|orienter les personnes|répondre aux questions','souriant|patient|poli','Garde un ton calme avec tout le monde.'],
['🏪','un gérant de boutique','Gérant de boutique','gérer le stock|encadrer le personnel|suivre les ventes','organisé|juste|ouvert','Fixe des objectifs clairs à ton équipe.']
].map(m=>({ e:m[0], art:m[1], nom:m[2], T:m[3].split('|'), Q:m[4].split('|'), C:m[5] }));
const cap = s => s.charAt(0).toUpperCase() + s.slice(1), lc = s => s.charAt(0).toLowerCase() + s.slice(1);
const P = ['bleu','vert','orange','violet','turquoise','or','rose','terre'], mis = m => cap(m.T[0]) + ", " + m.T[1] + " et " + m.T[2] + ".", qua = m => cap(m.Q[0]) + ", " + m.Q[1] + " et " + m.Q[2] + ".";
N.forEach((m,k)=>{
  const n = 29 + k, p = P[k % 8], e = m.e;
  SCCS.add('ag-m'+n, 'Recruter ' + m.art, 'Agence', p, [['🔎',"Définir le besoin","Tu cherches " + m.art + " ? Décris clairement les tâches : " + m.T.join(', ') + "."],[e,"Ce que fait ce professionnel",mis(m)],['⭐',"Les qualités à chercher",qua(m)],['📋',"Bien vérifier","Demande des références et vérifie le travail réalisé. " + m.C],['🤝',"Passer par une agence","Nous présélectionnons des candidats sérieux et nous suivons le placement avec toi."]], { photo:true });
  SCCS.add('m-'+n, 'Le métier de ' + lc(m.nom) + ' : ce qu\'on fait', 'Métiers', p, [[e,m.nom,"Un métier utile au quotidien, dans les quartiers comme en ville."],['🛠️',"Les missions courantes",mis(m)],['💡',"Le conseil du pro",m.C],['⭐',"Ce qu'il faut avoir",qua(m)],['🚀',"Et toi ?","Ce métier t'intéresse ? Apprends auprès d'un professionnel et construis ton expérience pas à pas."]], { photo:true });
  SCCS.add('q-'+n, m.nom + ' : les qualités qui font la différence', 'Métiers', p, [['⭐',cap(m.Q[0]),"Dans ce métier, être " + m.Q[0] + " inspire confiance et fidélise les clients."],['⭐',cap(m.Q[1]),"Être " + m.Q[1] + " se remarque vite et fait parler de toi en bien."],['⭐',cap(m.Q[2]),"Être " + m.Q[2] + " t'aide à progresser et à durer dans le métier."],['💡',"Le conseil du pro",m.C],['🤝',"Ton placement","Notre agence t'aide à trouver des offres adaptées à ton profil."]], { photo:true });
  SCCS.add('qz-'+n, 'Devine le métier ! n°'+n, 'Métiers', p, [['🤔',"Devine le métier !","Quel métier consiste à " + m.T[0] + ", " + m.T[1] + " et " + m.T[2] + " ?"],['💡',"Un indice","Ce professionnel doit être " + m.Q[0] + ", " + m.Q[1] + " et " + m.Q[2] + "."],['✅',"La réponse : " + m.nom,cap(m.art) + " fait exactement ce travail."],['📌',"À retenir",m.C],['🤝',"Besoin de ce profil ?","Notre agence recrute et place des candidats vérifiés dans ce métier."]], { photo:true });
  SCC_METIERS.push(m);
});
SCC_METIERS.forEach((m,i)=>{ const o = SCC_METIERS[(i + 5) % SCC_METIERS.length];
  SCCS.add('vf-'+(i+1), 'Vrai ou faux : ' + lc(m.nom), 'Métiers', P[i % 8], [
    ['🤔',"Vrai ou faux ?","« " + m.nom + " : " + m.T[0] + ". » Qu'en penses-tu ?"],
    ['✅',"Vrai !","C'est bien l'une des missions courantes de ce métier."],
    ['🤔',"Et celle-ci ?","« " + m.nom + " : " + o.T[0] + ". » Vrai ou faux ?"],
    ['❌',"Faux !","Cette mission relève plutôt du métier de " + lc(o.nom) + "."],
    ['💡',"À retenir",m.C]], { photo:true });
});
})();

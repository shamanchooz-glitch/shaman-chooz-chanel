/* MÉTIERS 2 — 28 vidéos « Devine le métier ! » générées à partir de la liste de slides-data-metiers.js */
(function(){
if(!window.SCCS || !window.SCC_METIERS) return;
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
SCC_METIERS.forEach((m,i)=>{
  SCCS.add('qz-'+(i+1), 'Devine le métier ! n°'+(i+1), 'Métiers', ['orange','violet','turquoise','or','rose','vert'][i % 6], [
    ['🤔',"Devine le métier !","Quel métier consiste à "+m.T[0]+", "+m.T[1]+" et "+m.T[2]+" ?"],
    ['💡',"Un indice","Ce professionnel doit être "+m.Q[0]+", "+m.Q[1]+" et "+m.Q[2]+"."],
    ['✅',"La réponse : "+m.nom,cap(m.art)+" fait exactement ce travail."],
    ['📌',"À retenir",m.C],
    ['🤝',"Besoin de ce profil ?","Notre agence recrute et place des candidats vérifiés dans ce métier."]
  ], { photo:true });
});
})();

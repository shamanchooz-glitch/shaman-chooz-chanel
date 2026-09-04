/**
 * SHAMAN CHOOZ CHANEL — relais de génération vidéo IA
 * -----------------------------------------------------
 * Ce petit programme tourne sur Cloudflare Workers (gratuit pour commencer).
 * Il reçoit les demandes du site, appelle les services de vidéo IA
 * (Kling via fal.ai, et JSON2Video) en gardant tes clés secrètes à l'abri,
 * et renvoie le résultat au site. Il ne garde AUCUNE information en
 * mémoire entre deux appels (le site s'occupe de suivre l'avancement).
 *
 * INSTALLATION (depuis un téléphone ou un ordinateur, dans un navigateur) :
 * 1. Crée un compte sur https://dash.cloudflare.com (gratuit)
 * 2. Crée un compte sur https://json2video.com, récupère ta clé API
 *    (obligatoire — c'est ce service qui assemble toutes les vidéos IA)
 * 3. (Optionnel, seulement pour le style "vidéo réaliste") Crée un compte
 *    sur https://fal.ai, ajoute un moyen de paiement (carte bancaire
 *    classique ou carte virtuelle en dollars — voir README.md pour les
 *    options si tu n'as pas de carte internationale), puis crée une clé
 *    API ("API Keys" dans ton compte)
 * 4. Sur Cloudflare : Workers & Pages > Créer une application > Worker
 * 5. Nomme-le par exemple "shaman-chooz-video-ia"
 * 6. Ouvre "Modifier le code" (Quick Edit), efface tout, colle ce fichier entier
 * 7. Va dans Settings > Variables > "Add variable" (coche "Encrypt") :
 *      Nom : JSON2VIDEO_KEY  → Valeur : ta clé JSON2Video (obligatoire)
 *      Nom : FAL_KEY         → Valeur : ta clé fal.ai (seulement si tu
 *                              actives le style "vidéo réaliste")
 * 8. Clique "Déployer"
 * 9. Copie l'URL donnée (ex: https://shaman-chooz-video-ia.tonpseudo.workers.dev)
 * 10. Colle cette URL dans "workerUrl" du fichier ai-config.js de ton site
 */

const FAL_MODEL_ENDPOINT = "https://queue.fal.run/fal-ai/kling-video/v3/standard/text-to-video";
const JSON2VIDEO_API = "https://api.json2video.com/v2/movies";

function corsHeaders(){
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}
function json(data, status = 200){
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders() }
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }

    /* ---------- 1) Génération d'une séquence de mouvement IA (Kling / fal.ai) ---------- */
    /* Utilisé seulement par le style "vidéo réaliste". Chaque séquence dure 5 ou 10 secondes. */
    if (url.pathname === "/kling/submit" && request.method === "POST") {
      if (!env.FAL_KEY) return json({ error: "Le style vidéo réaliste n'est pas activé (clé FAL_KEY manquante)." }, 400);
      const { prompt, duration } = await request.json();
      const falRes = await fetch(FAL_MODEL_ENDPOINT, {
        method: "POST",
        headers: { "Authorization": `Key ${env.FAL_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt, duration: String(duration || 5) })
      });
      const data = await falRes.json();
      if (!falRes.ok) return json({ error: data }, 500);
      return json({ request_id: data.request_id });
    }

    if (url.pathname === "/kling/status" && request.method === "GET") {
      if (!env.FAL_KEY) return json({ error: "Le style vidéo réaliste n'est pas activé (clé FAL_KEY manquante)." }, 400);
      const id = url.searchParams.get("id");
      const statusRes = await fetch(
        `https://queue.fal.run/fal-ai/kling-video/requests/${id}/status`,
        { headers: { "Authorization": `Key ${env.FAL_KEY}` } }
      );
      const statusData = await statusRes.json();

      if (statusData.status === "COMPLETED") {
        const resultRes = await fetch(
          `https://queue.fal.run/fal-ai/kling-video/requests/${id}`,
          { headers: { "Authorization": `Key ${env.FAL_KEY}` } }
        );
        const resultData = await resultRes.json();
        const videoUrl = resultData?.video?.url || null;
        return json({ status: "COMPLETED", videoUrl });
      }
      if (statusData.status === "ERROR") return json({ status: "ERROR", message: statusData.error || "Erreur Kling" });
      return json({ status: statusData.status || "IN_PROGRESS" });
    }

    /* ---------- 2) Assemblage final de la vidéo (JSON2Video) ---------- */
    /* Utilisé par les DEUX styles : c'est JSON2Video qui construit le fichier final
       (transitions, texte, voix off, musique, carton de fin) à partir du script JSON
       préparé par le site (app.js). Le site n'a jamais besoin de connaître ta clé. */
    if (url.pathname === "/json2video/create" && request.method === "POST") {
      if (!env.JSON2VIDEO_KEY) return json({ error: "JSON2Video n'est pas activé (clé JSON2VIDEO_KEY manquante)." }, 400);
      const movie = await request.json();
      const j2vRes = await fetch(JSON2VIDEO_API, {
        method: "POST",
        headers: { "x-api-key": env.JSON2VIDEO_KEY, "Content-Type": "application/json" },
        body: JSON.stringify(movie)
      });
      const data = await j2vRes.json();
      if (!j2vRes.ok || !data.project) return json({ error: data }, 500);
      return json({ project: data.project });
    }

    if (url.pathname === "/json2video/status" && request.method === "GET") {
      if (!env.JSON2VIDEO_KEY) return json({ error: "JSON2Video n'est pas activé (clé JSON2VIDEO_KEY manquante)." }, 400);
      const project = url.searchParams.get("project");
      const statusRes = await fetch(`${JSON2VIDEO_API}?project=${encodeURIComponent(project)}`, {
        headers: { "x-api-key": env.JSON2VIDEO_KEY }
      });
      const data = await statusRes.json();
      const movie = data.movie || {};
      if (movie.status === "error") return json({ status: "error", message: movie.message || "Erreur JSON2Video" });
      return json({ status: movie.status || "running", url: movie.url || null, duration: movie.duration || null });
    }

    /* ---------- 3) Traduction du texte (pour la voix off multilingue) ---------- */
    /* Utilise MyMemory (gratuit, sans clé). Limite raisonnable pour un usage normal du site ;
       si le volume de traductions devient important, remplacer par une clé DeepL ou Google Translate payante. */
    if (url.pathname === "/translate" && request.method === "POST") {
      const { texts, target } = await request.json();
      const results = [];
      for (const t of (texts || [])) {
        try {
          const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(t)}&langpair=fr|${target}`);
          const data = await res.json();
          results.push(data?.responseData?.translatedText || t);
        } catch (e) {
          results.push(t); // en cas d'échec, on garde le texte d'origine plutôt que de bloquer la vidéo
        }
      }
      return json({ translations: results });
    }

    return json({ ok: true, message: "SHAMAN CHOOZ CHANEL — relais vidéo IA actif (Kling + JSON2Video + traduction)." });
  }
};

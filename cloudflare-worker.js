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

// Modèle par défaut : Kling 2.5 Turbo Pro (moins cher, clips de 5 ou 10 secondes).
// Pour utiliser un autre modèle SANS modifier ce code : dans Cloudflare > ton Worker >
// Paramètres > Variables et secrets, ajoute une variable (type Texte) FAL_MODEL_ENDPOINT, par ex. :
//   https://queue.fal.run/fal-ai/kling-video/v3/standard/text-to-video   (qualité supérieure, plus cher)
// Pour revenir au modèle par défaut, supprime simplement cette variable.
// Numéro de version du Worker (le site le compare pour te dire si le Worker est à jour).
const WORKER_VERSION = "2026-10-28-a";
const FAL_MODEL_ENDPOINT = "https://queue.fal.run/fal-ai/kling-video/v2.5-turbo/pro/text-to-video";
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

function toB64(buf){
  const u = new Uint8Array(buf); let s = "";
  for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000));
  return btoa(s);
}

async function isAdminToken(env, idToken) {
  if (!env.FIREBASE_API_KEY) return false;
  try {
    const v = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.FIREBASE_API_KEY}`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: String(idToken || "") })
    });
    const u = (await v.json())?.users?.[0];
    if (!u) return false;
    return !env.ADMIN_EMAIL || String(u.email || "").trim().toLowerCase() === String(env.ADMIN_EMAIL).trim().toLowerCase();
  } catch (e) { return false; }
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
      const falRes = await fetch(env.FAL_MODEL_ENDPOINT || FAL_MODEL_ENDPOINT, {
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

    /* ---------- 4) Chaîne en direct (Cloudflare Stream Live) ---------- */
    /* Vérifie si la diffusion est actuellement en direct, et donne l'adresse HLS à lire.
       Voir README, étape 14, pour créer le "Live Input" Cloudflare Stream et récupérer
       les 4 informations nécessaires (CF_API_TOKEN, CF_ACCOUNT_ID, CF_LIVE_INPUT_ID, CF_CUSTOMER_CODE). */
    if (url.pathname === "/live/status" && request.method === "GET") {
      if (!env.CF_API_TOKEN || !env.CF_ACCOUNT_ID || !env.CF_LIVE_INPUT_ID || !env.CF_CUSTOMER_CODE) {
        return json({ configured: false, live: false });
      }
      const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/stream/live_inputs/${env.CF_LIVE_INPUT_ID}/videos`,
        { headers: { "Authorization": `Bearer ${env.CF_API_TOKEN}` } }
      );
      const data = await res.json();
      const current = data?.result?.[0];
      const live = current?.status?.state === "live-inprogress";
      const hlsUrl = `https://customer-${env.CF_CUSTOMER_CODE}.cloudflarestream.com/${env.CF_LIVE_INPUT_ID}/manifest/video.m3u8`;
      return json({ configured: true, live, hlsUrl });
    }

    /* ============ CAMÉRA — Cloudflare Realtime (SFU) : GRATUIT jusqu'à 1 000 Go de visionnage par mois, beaucoup de spectateurs ============
       Ce relais garde le secret de l'application Realtime (RT_APP_ID, RT_APP_SECRET) et transmet les échanges WebRTC.
       - Diffuser (location "local") : réservé à l'admin connecté. - Regarder (location "remote") : ouvert à tous les spectateurs. */
    if (url.pathname === "/rt/config" && request.method === "GET") {
      return json({ configured: !!(env.RT_APP_ID && env.RT_APP_SECRET) });
    }
    if (url.pathname.startsWith("/rt/") && request.method === "POST") {
      if (!env.RT_APP_ID || !env.RT_APP_SECRET) return json({ configured: false, error: "rt_not_configured" }, 503);
      let body;
      try { body = await request.json(); } catch (e) { return json({ error: "bad_request" }, 400); }
      const rt = (path, method, payload) => fetch(`https://rtc.live.cloudflare.com/v1/apps/${env.RT_APP_ID}${path}`, {
        method, headers: { "Authorization": `Bearer ${env.RT_APP_SECRET}`, "Content-Type": "application/json" },
        body: payload ? JSON.stringify(payload) : undefined
      });
      const out = async (r) => { let d = {}; try { d = await r.json(); } catch (e) {} return json(d, r.ok ? 200 : (r.status || 502)); };
      const sid = String(body.sessionId || "");
      const okSid = /^[A-Za-z0-9_-]{6,128}$/.test(sid);

      if (url.pathname === "/rt/session") {
        return out(await rt("/sessions/new", "POST"));
      }
      if (url.pathname === "/rt/tracks") {
        if (!okSid || !Array.isArray(body.tracks) || body.tracks.length === 0 || body.tracks.length > 4) return json({ error: "bad_request" }, 400);
        const pushing = body.tracks.some(t => t && t.location === "local") || !!body.sessionDescription;
        if (pushing) {   /* diffuser = admin seulement */
          if (!(await isAdminToken(env, body.idToken))) return json({ error: "unauthorized" }, 401);
          const tracks = body.tracks.map(t => ({ location: "local", mid: String(t.mid), trackName: String(t.trackName || "").slice(0, 40) }));
          return out(await rt(`/sessions/${sid}/tracks/new`, "POST", { sessionDescription: body.sessionDescription, tracks }));
        }
        const tracks = body.tracks.map(t => ({
          location: "remote", sessionId: String(t.sessionId || ""), trackName: String(t.trackName || "").slice(0, 40)
        }));
        if (tracks.some(t => !/^[A-Za-z0-9_-]{6,128}$/.test(t.sessionId))) return json({ error: "bad_request" }, 400);
        return out(await rt(`/sessions/${sid}/tracks/new`, "POST", { tracks }));
      }
      if (url.pathname === "/rt/renegotiate") {
        if (!okSid || !body.sessionDescription || body.sessionDescription.type !== "answer") return json({ error: "bad_request" }, 400);
        return out(await rt(`/sessions/${sid}/renegotiate`, "PUT", { sessionDescription: body.sessionDescription }));
      }
      return json({ error: "not_found" }, 404);
    }

    /* Caméra du téléphone / de l'ordinateur : donne à l'admin connecté l'adresse WebRTC (WHIP) du Live Input Cloudflare,
       pour diffuser directement depuis la caméra du navigateur. Les spectateurs regardent ensuite le direct via /live/status (HLS). */
    if (url.pathname === "/live/whip" && request.method === "POST") {
      if (!env.CF_API_TOKEN || !env.CF_ACCOUNT_ID || !env.CF_LIVE_INPUT_ID || !env.FIREBASE_API_KEY) {
        return json({ configured: false });
      }
      let body;
      try { body = await request.json(); } catch (e) { return json({ error: "bad_request" }, 400); }
      let user = null;
      try {
        const v = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.FIREBASE_API_KEY}`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken: String(body.idToken || "") })
        });
        const vd = await v.json();
        user = vd?.users?.[0] || null;
      } catch (e) { user = null; }
      if (!user || (env.ADMIN_EMAIL && String(user.email || "").trim().toLowerCase() !== String(env.ADMIN_EMAIL).trim().toLowerCase())) {
        return json({ configured: true, error: "unauthorized" }, 401);
      }
      const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/stream/live_inputs/${env.CF_LIVE_INPUT_ID}`,
        { headers: { "Authorization": `Bearer ${env.CF_API_TOKEN}` } }
      );
      const data = await res.json();
      const whip = data?.result?.webRTC?.url;
      if (!whip) return json({ configured: true, error: "whip_unavailable" }, 502);
      return json({ configured: true, url: whip });
    }

    /* Historique des directs précédents (replays) — Cloudflare Stream enregistre automatiquement
       chaque diffusion en direct ; on renvoie la liste pour que l'admin puisse les gérer et que les
       spectateurs puissent les revoir. */
    if (url.pathname === "/live/replays" && request.method === "GET") {
      if (!env.CF_API_TOKEN || !env.CF_ACCOUNT_ID || !env.CF_LIVE_INPUT_ID || !env.CF_CUSTOMER_CODE) {
        return json({ configured: false, replays: [] });
      }
      const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/stream/live_inputs/${env.CF_LIVE_INPUT_ID}/videos`,
        { headers: { "Authorization": `Bearer ${env.CF_API_TOKEN}` } }
      );
      const data = await res.json();
      const replays = (data?.result || [])
        .filter(v => v.status?.state === "ready" && v.duration > 0)
        .map(v => ({
          uid: v.uid,
          created: v.created,
          duration: v.duration,
          hlsUrl: `https://customer-${env.CF_CUSTOMER_CODE}.cloudflarestream.com/${v.uid}/manifest/video.m3u8`,
          thumbnail: `https://customer-${env.CF_CUSTOMER_CODE}.cloudflarestream.com/${v.uid}/thumbnails/thumbnail.jpg`
        }));
      return json({ configured: true, replays });
    }


    /* ---------- 5) Robot assistant de l'admin (Cloudflare Workers AI, gratuit dans la limite du jour) ---------- */
    /* Installation : voir README, étape 18 (liaison « Workers AI » nommée AI + variable FIREBASE_API_KEY). */
    if (url.pathname === "/admin/assistant" && request.method === "POST") {
      if (!env.AI || !env.FIREBASE_API_KEY) {
        return json({ configured: false });
      }
      let body;
      try { body = await request.json(); } catch (e) { return json({ error: "bad_request" }, 400); }

      // Seul l'administrateur connecté (compte Firebase) peut utiliser le robot.
      let user = null;
      try {
        const v = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.FIREBASE_API_KEY}`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken: String(body.idToken || "") })
        });
        const vd = await v.json();
        user = vd?.users?.[0] || null;
      } catch (e) { user = null; }
      if (!user || (env.ADMIN_EMAIL && String(user.email || "").trim().toLowerCase() !== String(env.ADMIN_EMAIL).trim().toLowerCase())) {
        return json({ configured: true, error: "unauthorized" }, 401);
      }

      const msgs = (Array.isArray(body.messages) ? body.messages : []).slice(-10)
        .filter(m => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
        .map(m => ({ role: m.role, content: m.content.slice(0, 2000) }));
      const instructions = String(body.instructions || "").slice(0, 4000);
      const snapshot = JSON.stringify(body.snapshot || {}).slice(0, 7000);

      const system = `Tu es le robot assistant du fondateur et directeur du site SHAMAN CHOOZ CHANEL (Côte d'Ivoire). Tu es son deuxième lui : tu gères le site comme il le ferait et tu lui expliques tout très simplement.

RÈGLES DE LANGAGE : réponds en français, avec des phrases courtes et des mots simples, sans jargon. Réponses courtes (8 lignes maximum), SAUF quand il te demande de rédiger un texte, un script, une idée de vidéo ou un prompt : alors écris-le en entier, bien organisé. Tutoie-le.

RÈGLES DE SÉCURITÉ :
- Tu ne peux modifier le site QU'avec les actions listées ci-dessous.
- Tu ne valides JAMAIS un paiement ou une commande : dis-lui de le faire lui-même dans l'onglet Commandes.
- N'invente JAMAIS de chiffres : utilise uniquement les données ÉTAT DU SITE ci-dessous.
- Si la demande est floue ou incomplète, pose UNE seule question dans "reply" et mets "actions": [].
- Les prix sont contrôlés par le site (coût + marge). Propose-les quand même, le site refusera si trop bas.

FORMAT DE RÉPONSE : réponds UNIQUEMENT par un objet JSON valide, sans texte autour :
{"reply":"ton explication simple","actions":[ ... ]}

ACTIONS POSSIBLES (n'utilise que celles-ci, avec ces champs exacts) :
{"type":"set_prices","baseFee":0,"realistePerSec":0,"templatePerSec":0,"customBase":0,"customPerScene":0}  (ne mets que les champs à changer, en FCFA)
{"type":"set_provider","provider":"auto|playlist|youtube|facebook|twitch|dailymotion|kick|hls|embed|cloudflare"}
{"type":"set_live_on","value":true}
{"type":"set_maintenance","value":true,"message":"texte optionnel"}
{"type":"set_offline_message","text":"..."}
{"type":"set_current_program","text":"..."}
{"type":"announce","text":"..."}
{"type":"add_playlist_item","title":"...","url":"https://... ou videos/nom.mp4","minutes":5}
{"type":"remove_playlist_item","index":1}  (numéro de la liste, à partir de 1)
{"type":"add_slot","days":[1,2,3],"start":"18:00","end":"20:00","provider":"youtube","label":"..."}  (jours : 0=dimanche, 1=lundi ... 6=samedi ; heure de Côte d'Ivoire)
{"type":"set_pass_price","name":"1 jour","price":150}
{"type":"set_catalog_price","title":"titre de la vidéo","price":500}
{"type":"add_instruction","text":"la nouvelle règle ou compétence, en une phrase"}  (à utiliser quand le fondateur te demande de retenir, d'apprendre ou d'ajouter une règle ou une compétence)

INSTRUCTIONS PERMANENTES DU FONDATEUR (à respecter toujours) :
${instructions || "(aucune pour l'instant)"}

ÉTAT DU SITE (données réelles, en ce moment) :
${snapshot}`;

      try {
        const model = env.AI_MODEL || "@cf/meta/llama-3.3-70b-instruct-fp8-fast";
        const out = await env.AI.run(model, {
          messages: [{ role: "system", content: system }, ...msgs],
          max_tokens: 1800,
          temperature: 0.2
        });
        let text = out?.response;
        if (typeof text !== "string") text = JSON.stringify(text ?? out ?? "");
        let reply = text, actions = [];
        const a = text.indexOf("{"), b = text.lastIndexOf("}");
        if (a >= 0 && b > a) {
          try {
            const parsed = JSON.parse(text.slice(a, b + 1));
            if (typeof parsed.reply === "string") reply = parsed.reply;
            if (Array.isArray(parsed.actions)) actions = parsed.actions.slice(0, 8);
          } catch (e) { /* on garde le texte brut */ }
        }
        return json({ configured: true, reply, actions });
      } catch (e) {
        return json({ configured: true, error: "ai_failed", message: String(e?.message || e) }, 500);
      }
    }

    /* ---------- 6) Voix off NATURELLE (Cloudflare Workers AI · MeloTTS) — gratuite, aucune clé à copier ---------- */
    /* Même liaison « Workers AI » (nom : AI) et même variable FIREBASE_API_KEY que le robot assistant (README, étape 18). */
    /* Gratuit : 10 000 unités par jour (≈ 500 minutes de voix par jour), remises à zéro chaque jour. */
    if (url.pathname === "/admin/tts" && request.method === "POST") {
      if (!env.AI || !env.FIREBASE_API_KEY) return json({ configured: false });
      let body;
      try { body = await request.json(); } catch (e) { return json({ error: "bad_request" }, 400); }

      // Seul l'administrateur connecté peut fabriquer des voix (évite que d'autres usent ton quota gratuit).
      let user = null;
      try {
        const v = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.FIREBASE_API_KEY}`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken: String(body.idToken || "") })
        });
        const vd = await v.json();
        user = vd?.users?.[0] || null;
      } catch (e) { user = null; }
      if (!user || (env.ADMIN_EMAIL && String(user.email || "").trim().toLowerCase() !== String(env.ADMIN_EMAIL).trim().toLowerCase())) {
        return json({ configured: true, error: "unauthorized" }, 401);
      }

      const text = String(body.text || "").trim().slice(0, 800);
      if (!text) return json({ configured: true, error: "bad_request" }, 400);
      try {
        const out = await env.AI.run("@cf/myshell-ai/melotts", { prompt: text, lang: "fr" });
        let audio = typeof out === "string" ? out : out?.audio;
        if (!audio && out) {
          const buf = out instanceof ArrayBuffer ? out : (ArrayBuffer.isView(out) ? out.buffer : (out instanceof ReadableStream ? await new Response(out).arrayBuffer() : null));
          if (buf) audio = toB64(buf);
        }
        if (!audio) return json({ configured: true, error: "ai_failed", message: "Le moteur de voix n'a rien renvoyé." }, 500);
        return json({ configured: true, audio });
      } catch (e) {
        return json({ configured: true, error: "ai_failed", message: String(e?.message || e) }, 500);
      }
    }

    return json({ ok: true, version: WORKER_VERSION, keys: { fal: Boolean(env.FAL_KEY), json2video: Boolean(env.JSON2VIDEO_KEY), tts: Boolean(env.AI) }, message: "SHAMAN CHOOZ CHANEL — relais vidéo IA actif (Kling + JSON2Video + traduction + chaîne live)." });
  }
};

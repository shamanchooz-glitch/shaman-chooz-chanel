/* ==========================================================
   SHAMAN CHOOZ CHANEL — logique principale
   ========================================================== */

/* ---------- Petite couche base de données ----------
   Utilise Firebase Realtime Database si configuré (firebase-config.js),
   sinon retombe sur le stockage local de l'appareil (mode démo,
   pas de synchronisation entre appareils tant que Firebase n'est pas branché). */
const DB = {
  ready: !!window.SCC_FIREBASE_READY,
  ref(path){ return firebase.database().ref(path); },
  async get(path, fallback){
    if(this.ready){
      const snap = await this.ref(path).get();
      return snap.exists() ? snap.val() : fallback;
    }
    const raw = localStorage.getItem('scc_'+path);
    return raw ? JSON.parse(raw) : fallback;
  },
  async set(path, value){
    if(this.ready) return this.ref(path).set(value);
    localStorage.setItem('scc_'+path, JSON.stringify(value));
  },
  async push(path, value){
    if(this.ready){
      const r = this.ref(path).push();
      await r.set(value);
      return r.key;
    }
    const list = await this.get(path, {});
    const key = 'k' + Date.now() + Math.floor(Math.random()*999);
    list[key] = value;
    await this.set(path, list);
    return key;
  },
  async update(path, value){
    if(this.ready) return this.ref(path).update(value);
    const current = await this.get(path, {});
    await this.set(path, {...current, ...value});
  },
  async remove(path){
    if(this.ready) return this.ref(path).remove();
    const parts = path.split('/');
    const key = parts.pop();
    const parentPath = parts.join('/');
    const current = await this.get(parentPath, {});
    delete current[key];
    await this.set(parentPath, current);
  }
};

/* ---------- Utilitaires ---------- */
function toast(msg, type=''){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show ' + type;
  setTimeout(()=> t.className = 'toast ' + type, 2600);
}
function fcfa(n){ return n.toLocaleString('fr-FR') + ' FCFA'; }
function placeholderThumb(seedHue, emoji){
  return `<svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g${seedHue}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsl(${seedHue},70%,32%)"/>
      <stop offset="100%" stop-color="hsl(${(seedHue+60)%360},70%,18%)"/>
    </linearGradient></defs>
    <rect width="200" height="250" fill="url(#g${seedHue})"/>
    <text x="50%" y="54%" font-size="54" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
  </svg>`;
}

/* ---------- Catalogue de démarrage (à remplir par l'admin) ---------- */
const SEED_CATALOG = [
  {cat:'Contes pour enfants', emoji:'🧸', hue:280, title:'Le petit lion courageux', price:500, desc:"Un conte animé pour les tout-petits sur le courage et l'amitié. Durée ~3 min."},
  {cat:'Contes pour enfants', emoji:'🌙', hue:250, title:'L\'histoire du soir de Kofi', price:500, desc:"Une berceuse animée pour accompagner les enfants avant de dormir."},
  {cat:'Contes pour enfants', emoji:'🐘', hue:200, title:"L'éléphant qui a perdu sa trompe", price:500, desc:"Une aventure animée pleine de couleurs pour les enfants curieux."},
  {cat:'Anniversaire', emoji:'🎂', hue:330, title:'Joyeux anniversaire personnalisé', price:1000, desc:"Une animation avec le prénom et l'âge de la personne fêtée. Idéal à partager sur WhatsApp/Statut."},
  {cat:'Anniversaire', emoji:'🎈', hue:20, title:'Fête surprise en dessin animé', price:1000, desc:"Une courte vidéo festive et colorée pour souhaiter un anniversaire."},
  {cat:'Mariage', emoji:'💍', hue:340, title:'Faire-part animé "Oui je le veux"', price:1500, desc:"Une invitation de mariage sous forme de dessin animé élégant."},
  {cat:'Mariage', emoji:'💐', hue:300, title:'Remerciements de mariage animés', price:1500, desc:"Une carte de remerciement animée à envoyer après la cérémonie."},
  {cat:'Publicité & Entreprise', emoji:'📢', hue:45, title:'Pub animée pour petite entreprise', price:3000, desc:"Présente ton produit ou service en 30 secondes de dessin animé percutant."},
  {cat:'Publicité & Entreprise', emoji:'🏪', hue:35, title:"Ouverture de boutique — annonce animée", price:3000, desc:"Annonce l'ouverture de ton commerce avec une vidéo dynamique."},
  {cat:'Motivation', emoji:'🔥', hue:15, title:'Lève-toi et fonce', price:800, desc:"Une capsule animée de motivation matinale pour bien démarrer la journée."},
  {cat:'Motivation', emoji:'🚀', hue:265, title:'Objectifs 2026', price:800, desc:"Une vidéo animée inspirante pour se fixer des objectifs clairs."},
  {cat:'Comédie', emoji:'😂', hue:50, title:"Le voisin bruyant", price:700, desc:"Un sketch animé humoristique inspiré du quotidien ivoirien."},
  {cat:'Comédie', emoji:'🤣', hue:55, title:'Au marché avec Tantie Rose', price:700, desc:"Une scène comique animée pleine de répliques savoureuses."},
  {cat:'Clip musical', emoji:'🎵', hue:190, title:'Clip animé — rythme coupé-décalé', price:2000, desc:"Anime les paroles de ta chanson avec des personnages en mouvement."},
  {cat:'Clip musical', emoji:'🎤', hue:210, title:'Clip animé — slow romantique', price:2000, desc:"Une mise en image douce et animée pour un titre romantique."},
  {cat:'Éducatif', emoji:'📚', hue:150, title:'Apprendre les chiffres en dessin animé', price:600, desc:"Vidéo éducative animée pour apprendre à compter en s'amusant."}
];

let CATALOG = {};
let ORDERS = {};
let SELECTED_CATEGORY = 'Toutes';
let SELECTED_ITEM = null;
let SELECTED_PAY = null;
let ADMIN_LOGGED_IN = false;
let SEARCH_QUERY = '';
let FAVORITES = JSON.parse(localStorage.getItem('scc_favorites') || '[]');
let LAST_KNOWN_STATUSES = {};
let ORDER_SEARCH = '';
let ORDER_STATUS_FILTER = 'all';
let STATS_RANGE = 'today';
const NEW_BADGE_MS = 7 * 24 * 3600 * 1000; // 7 jours

const PAY_METHODS = [
  {id:'wave', label:'Wave', number:'07 48 93 56 86', note:"Reçoit aussi les transferts internationaux directement (Wave accepte l'argent envoyé depuis l'étranger)."},
  {id:'mtn', label:'MTN Money', number:'05 74 53 36 36', note:"Depuis l'étranger : utilise un service de transfert international vers mobile money (Wari, Ria, WorldRemit, Sendwave...) en indiquant ce numéro."},
  {id:'moov', label:'Moov Money', number:'01 73 77 39 39', note:"Depuis l'étranger : utilise un service de transfert international vers mobile money (Wari, Ria, WorldRemit, Sendwave...) en indiquant ce numéro."},
  {id:'orange', label:'Orange Money', number:'07 49 97 09 18', note:"Depuis l'étranger : utilise un service de transfert international vers mobile money (Wari, Ria, WorldRemit, Sendwave...) en indiquant ce numéro."}
];

/* Bloc HTML réutilisé par les 3 fiches de commande du site (catalogue, vidéo simple, vidéo IA).
   Un seul numéro Côte d'Ivoire par moyen de paiement, valable pour les clients locaux ET internationaux. */
function payMethodsBlock(){
  return `
    <p class="field-label">Moyen de paiement (Côte d'Ivoire et international)</p>
    <div class="pay-grid">${PAY_METHODS.map(p=>`<button class="pay-option" data-pay="${p.id}">${p.label}</button>`).join('')}</div>
    <div class="pay-number-box" style="display:none;"></div>
  `;
}
/* Câble les boutons de moyen de paiement d'une fiche : sélectionne, affiche le numéro à qui envoyer l'argent, et appelle onSelect(payId) */
function wirePayMethodButtons(sheet, onSelect){
  const box = sheet.querySelector('.pay-number-box');
  sheet.querySelectorAll('.pay-option').forEach(btn=>{
    btn.onclick = ()=>{
      sheet.querySelectorAll('.pay-option').forEach(b=>b.classList.remove('selected'));
      btn.classList.add('selected');
      onSelect(btn.dataset.pay);
      const method = PAY_METHODS.find(p=>p.id===btn.dataset.pay);
      if(box && method){
        box.style.display = 'block';
        box.innerHTML = `📲 Envoie le montant exact via <strong>${method.label}</strong> à : <strong>${method.number}</strong><br><span style="opacity:.85;">${method.note}</span><br>Puis colle la référence de la transaction reçue ci-dessous.`;
      }
    };
  });
}

/* ==========================================================
   VIDÉO SUR MESURE — moteur d'animation + export
   (animation canvas simple + musique générée + voix de
   prévisualisation navigateur ; pas de voix dans le fichier
   exporté, c'est une limite technique des navigateurs)
   ========================================================== */
/* ==========================================================
   LANGUES DISPONIBLES — traduction du texte + voix off dans la langue choisie.
   Chaque entrée : code, nom affiché, et voix Azure (féminine/masculine) utilisées par JSON2Video.
   ⚠️ Les noms de voix Azure évoluent parfois. Si une langue ne fonctionne pas (erreur à la
   génération), vérifie/compare le nom exact ici : https://json2video.com/ai-voices/azure/voices/
   puis corrige la ligne correspondante ci-dessous.
   ========================================================== */
const LANGUAGES = [
  { code:'fr', name:'🇫🇷 Français',            f:'fr-FR-DeniseNeural',   m:'fr-FR-HenriNeural' },
  { code:'en', name:'🇬🇧 Anglais',             f:'en-US-JennyNeural',    m:'en-US-GuyNeural' },
  { code:'es', name:'🇪🇸 Espagnol',            f:'es-ES-ElviraNeural',   m:'es-ES-AlvaroNeural' },
  { code:'pt', name:'🇵🇹 Portugais',           f:'pt-BR-FranciscaNeural',m:'pt-BR-AntonioNeural' },
  { code:'de', name:'🇩🇪 Allemand',            f:'de-DE-KatjaNeural',    m:'de-DE-ConradNeural' },
  { code:'it', name:'🇮🇹 Italien',             f:'it-IT-ElsaNeural',     m:'it-IT-DiegoNeural' },
  { code:'nl', name:'🇳🇱 Néerlandais',         f:'nl-NL-ColetteNeural',  m:'nl-NL-MaartenNeural' },
  { code:'ru', name:'🇷🇺 Russe',               f:'ru-RU-SvetlanaNeural', m:'ru-RU-DmitryNeural' },
  { code:'tr', name:'🇹🇷 Turc',                f:'tr-TR-EmelNeural',     m:'tr-TR-AhmetNeural' },
  { code:'pl', name:'🇵🇱 Polonais',            f:'pl-PL-AgnieszkaNeural',m:'pl-PL-MarekNeural' },
  { code:'uk', name:'🇺🇦 Ukrainien',           f:'uk-UA-PolinaNeural',   m:'uk-UA-OstapNeural' },
  { code:'ar', name:'🇸🇦 Arabe',               f:'ar-SA-ZariyahNeural',  m:'ar-SA-HamedNeural' },
  { code:'zh', name:'🇨🇳 Chinois (mandarin)',  f:'zh-CN-XiaoxiaoNeural', m:'zh-CN-YunxiNeural' },
  { code:'ja', name:'🇯🇵 Japonais',            f:'ja-JP-NanamiNeural',   m:'ja-JP-KeitaNeural' },
  { code:'ko', name:'🇰🇷 Coréen',              f:'ko-KR-SunHiNeural',    m:'ko-KR-InJoonNeural' },
  { code:'hi', name:'🇮🇳 Hindi',               f:'hi-IN-SwaraNeural',    m:'hi-IN-MadhurNeural' },
  { code:'vi', name:'🇻🇳 Vietnamien',          f:'vi-VN-HoaiMyNeural',   m:'vi-VN-NamMinhNeural' },
  { code:'th', name:'🇹🇭 Thaï',                f:'th-TH-PremwadeeNeural',m:'th-TH-NiwatNeural' },
  { code:'id', name:'🇮🇩 Indonésien',          f:'id-ID-GadisNeural',    m:'id-ID-ArdiNeural' },
  { code:'sv', name:'🇸🇪 Suédois',             f:'sv-SE-SofieNeural',    m:'sv-SE-MattiasNeural' },
  { code:'sw', name:'🌍 Swahili',              f:'sw-KE-ZuriNeural',     m:'sw-KE-RafikiNeural' },
  { code:'am', name:'🌍 Amharique',            f:'am-ET-MekdesNeural',   m:'am-ET-AmehaNeural' },
  { code:'zu', name:'🌍 Zoulou',               f:'zu-ZA-ThandoNeural',   m:'zu-ZA-ThembaNeural' }
];
function getLangVoice(langCode, gender){
  const lang = LANGUAGES.find(l=>l.code===langCode) || LANGUAGES[0];
  return gender === 'm' ? lang.m : lang.f;
}
/* Traduit une liste de lignes de texte vers la langue choisie, via le serveur relais (worker).
   Si la langue cible est le français (langue d'écriture du site), aucune traduction n'est faite. */
async function translateLines(lines, targetLangCode){
  if(!targetLangCode || targetLangCode === 'fr') return lines;
  try{
    const { translations } = await workerPost('/translate', { texts: lines, target: targetLangCode });
    return translations && translations.length === lines.length ? translations : lines;
  } catch(e){ return lines; } // en cas d'échec de traduction, on garde le texte original plutôt que de bloquer la vidéo
}

const CUSTOM_PALETTES = {
  pop:  { bg:['#FF6F5E','#FFC24B'], shape:'#3B1E77', accent:'#fff' },
  nuit: { bg:['#0B1B4D','#1a0f3d'], shape:'#FFD84B', accent:'#fff' },
  feu:  { bg:['#7A1E1E','#FF6F5E'], shape:'#FFD84B', accent:'#fff' }
};
let customVisualStyle = 'pop';
let customGender = 'f';
let customLanguage = 'fr';
let customVoices = [];

function scenesFromScript(text){ return text.split(/\n+/).map(s=>s.trim()).filter(Boolean); }
function customPrice(scenes){ return 800 + Math.max(0, scenes.length-1) * 250; }

function drawCustomScene(ctx, canvas, t, sceneIndex, text, duration, visualStyle){
  const W = canvas.width, H = canvas.height;
  const pal = CUSTOM_PALETTES[visualStyle] || CUSTOM_PALETTES.pop;
  const progress = t / duration;
  const grad = ctx.createLinearGradient(0,0,W, H + Math.sin(t*0.001)*100);
  grad.addColorStop(0, pal.bg[0]); grad.addColorStop(1, pal.bg[1]);
  ctx.fillStyle = grad; ctx.fillRect(0,0,W,H);
  for(let i=0;i<18;i++){
    const seed = i*997 + sceneIndex*131;
    const px = (Math.sin(seed + t*0.0006)*0.5+0.5) * W;
    const py = ((t*0.05 + seed*13) % (H+40)) - 20;
    const r = 2 + (seed % 5);
    ctx.globalAlpha = 0.25 + 0.25*Math.sin(t*0.003+seed);
    ctx.fillStyle = pal.accent;
    ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI*2); ctx.fill();
  }
  ctx.globalAlpha = 1;
  const cx = W/2, cy = H/2 - 20, bob = Math.sin(t*0.006)*8;
  ctx.fillStyle = pal.shape;
  ctx.beginPath(); ctx.arc(cx, cy+bob, 70, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.beginPath(); ctx.arc(cx-24, cy+bob-10, 10, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx+24, cy+bob-10, 10, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#000';
  ctx.beginPath(); ctx.arc(cx-24, cy+bob-10, 4, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx+24, cy+bob-10, 4, 0, Math.PI*2); ctx.fill();
  const mouth = 6 + Math.abs(Math.sin(t*0.02))*14;
  ctx.fillStyle = '#fff';
  ctx.beginPath(); ctx.ellipse(cx, cy+bob+28, 18, mouth, 0, 0, Math.PI*2); ctx.fill();
  const fade = Math.min(1, progress*4);
  ctx.globalAlpha = fade; ctx.fillStyle = '#fff';
  ctx.font = "bold 26px 'Baloo 2', sans-serif"; ctx.textAlign = 'center';
  wrapCustomText(ctx, text, W/2, H - 60, W - 80, 30);
  ctx.globalAlpha = 1;
}
function wrapCustomText(ctx, text, x, y, maxWidth, lineHeight){
  const words = text.split(' '); let line = '', lines = [];
  words.forEach(w=>{
    const test = line + w + ' ';
    if(ctx.measureText(test).width > maxWidth && line){ lines.push(line); line = w + ' '; }
    else line = test;
  });
  lines.push(line);
  const startY = y - (lines.length-1)*lineHeight;
  lines.forEach((l,i)=> ctx.fillText(l.trim(), x, startY + i*lineHeight));
}
function populateLanguageSelects(){
  const opts = LANGUAGES.map(l=>`<option value="${l.code}">${l.name}</option>`).join('');
  ['customLanguageSelect','templateLanguageSelect','adminSimpleLanguageSelect','adminTemplateLanguageSelect'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.innerHTML = opts;
  });
}
function loadCustomVoices(){
  const voices = speechSynthesis.getVoices();
  const fr = voices.filter(v=>v.lang.startsWith('fr'));
  customVoices = fr.length ? fr : voices;
  const sel = document.getElementById('customVoiceSelect');
  if(sel) sel.innerHTML = customVoices.map((v,i)=>`<option value="${i}">${v.name} (${v.lang})</option>`).join('');
}
let customPreviewing = false;
async function previewCustomVideo(){
  const scenes = scenesFromScript(document.getElementById('customScript').value);
  if(scenes.length===0) return toast('Écris ton texte d\'abord.', 'err');
  if(customPreviewing){ speechSynthesis.cancel(); customPreviewing = false; return; }
  customPreviewing = true;
  const canvas = document.getElementById('customStage');
  const ctx = canvas.getContext('2d');
  for(let s=0; s<scenes.length && customPreviewing; s++){
    const text = scenes[s];
    const estDuration = Math.max(1800, text.length * 70);
    const startTime = performance.now();
    const utter = new SpeechSynthesisUtterance(text);
    const sel = document.getElementById('customVoiceSelect');
    if(customVoices[sel.value]) utter.voice = customVoices[sel.value];
    utter.lang = 'fr-FR';
    speechSynthesis.speak(utter);
    await new Promise(resolve=>{
      function frame(now){
        const t = now - startTime;
        drawCustomScene(ctx, canvas, t, s, text, estDuration, customVisualStyle);
        if(t < estDuration && customPreviewing) requestAnimationFrame(frame);
        else resolve();
      }
      requestAnimationFrame(frame);
    });
  }
  customPreviewing = false;
}
/* Construit le script JSON2Video de l'Animation simple : fond coloré animé + texte + VOIX OFF intégrée.
   C'est ce qui garantit que la voix est bien présente dans le fichier vidéo final téléchargeable,
   sans que le client ait besoin d'un logiciel de montage (CapCut, InShot...) pour l'ajouter après coup. */
async function buildSimpleMovie(order){
  const originalLines = scenesFromScript(order.script);
  const lines = await translateLines(originalLines, order.language);
  const pal = CUSTOM_PALETTES[order.visualStyle] || CUSTOM_PALETTES.pop;
  const voice = getLangVoice(order.language || 'fr', order.gender || 'f');
  const sceneList = lines.map(line=>{
    const duration = Math.max(2.5, Math.min(20, Math.round(line.length / 12) + 2));
    return {
      duration,
      transition: { style:'fade', duration:0.4 },
      background: { color: pal.bg[0] },
      elements: [
        { type:'text', text: line, style:'001', duration },
        { type:'voice', model:'azure', voice, text: line, duration }
      ]
    };
  });
  sceneList.push(watermarkScene());
  return { resolution:'full-hd', scenes: sceneList };
}

function updateCustomPriceTag(){
  const scenes = scenesFromScript(document.getElementById('customScript').value);
  document.getElementById('customPriceTag').textContent = fcfa(customPrice(scenes.length ? scenes : ['x']));
}

/* ---------- Commande d'une vidéo sur mesure ---------- */
function openCustomOrderSheet(){
  const scenes = scenesFromScript(document.getElementById('customScript').value);
  if(scenes.length===0) return toast('Écris ton texte d\'abord.', 'err');
  const price = customPrice(scenes);
  const sheet = document.getElementById('productSheet');
  sheet.innerHTML = `
    <div class="sheet-handle"></div>
    <span class="reel-cat">Vidéo sur mesure</span>
    <h2>${scenes.length} scène(s)</h2>
    <p class="price-tag">${fcfa(price)}</p>
    <p class="sheet-desc">Ta vidéo (avec sa voix intégrée) sera générée automatiquement dès que ton paiement sera validé.</p>
    ${payMethodsBlock()}
    <p class="field-label">Tes informations</p>
    <input class="input" id="buyerName" placeholder="Ton nom">
    <input class="input" id="buyerPhone" placeholder="Numéro de téléphone / WhatsApp" inputmode="tel">
    <input class="input" id="buyerRef" placeholder="Référence de la transaction">
    <p class="hint">Colle la référence reçue après ton paiement mobile money.</p>
    <button class="btn btn-primary" id="submitCustomOrderBtn">Confirmer ma commande</button>
    <button class="btn btn-ghost" id="cancelSheetBtn">Annuler</button>
  `;
  let selectedPay = null;
  wirePayMethodButtons(sheet, (id)=>{ selectedPay = id; });
  document.getElementById('cancelSheetBtn').onclick = closeSheet;
  document.getElementById('submitCustomOrderBtn').onclick = async ()=>{
    const name = document.getElementById('buyerName').value.trim();
    const phone = document.getElementById('buyerPhone').value.trim();
    const ref = document.getElementById('buyerRef').value.trim();
    if(!selectedPay) return toast('Choisis un moyen de paiement', 'err');
    if(!name || !phone || !ref) return toast('Remplis tous les champs', 'err');
    const accessCode = await getOrCreateAccessCode(phone);
    await DB.push('orders', {
      type:'custom', title: `Vidéo sur mesure (${scenes.length} scènes)`, price,
      script: document.getElementById('customScript').value,
      visualStyle: customVisualStyle, gender: customGender, language: customLanguage,
      payMethod: selectedPay, buyerName: name, buyerPhone: phone, ref, accessCode,
      status:'pending', createdAt: Date.now()
    });
    showAccessCodeConfirmation(accessCode);
  };
  document.getElementById('sheetOverlay').classList.add('open');
  sheet.classList.add('open');
}

/* ==========================================================
   VIDÉO IA — via un petit serveur relais (Cloudflare Worker) qui appelle
   Kling (par fal.ai) et JSON2Video en gardant les clés secrètes en sécurité.
   Payant à l'usage : le prix affiché est calculé selon la durée choisie.

   Deux styles, harmonisés sur le même moteur d'assemblage JSON2Video :
   - "realiste" : mouvement généré par IA (Kling), plusieurs séquences de
     5-10s assemblées automatiquement jusqu'à 60 secondes.
   - "template" : tout autre type de vidéo (pub, diaporama, annonce,
     témoignage...) — images (fournies ou générées par IA) + texte +
     voix off + musique, jusqu'à 60 secondes. C'est ce style qui permet
     de générer n'importe quel type de vidéo, pas seulement des dessins animés.
   ========================================================== */
let aiRealisteDuration = 10;
let templateDuration = 20;
let templateGender = 'f';
let templateVoiceOn = true;
let templateLanguage = 'fr';
let templateFormat = 'horizontal';

function aiConfigured(){ return AI_CONFIG && AI_CONFIG.workerUrl && AI_CONFIG.workerUrl !== 'REMPLACE_MOI'; }
function aiRealistePrice(durationSec){ return AI_CONFIG.baseFeeFCFA + durationSec * AI_CONFIG.pricePerSecondRealisteFCFA; }
function aiTemplatePrice(durationSec){ return AI_CONFIG.baseFeeFCFA + durationSec * AI_CONFIG.pricePerSecondTemplateFCFA; }

async function workerPost(path, body){
  const res = await fetch(AI_CONFIG.workerUrl + path, {
    method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)
  });
  const data = await res.json();
  if(!res.ok || data.error) throw new Error(typeof data.error === 'string' ? data.error : 'Erreur du serveur relais');
  return data;
}
async function workerGet(path){
  const res = await fetch(AI_CONFIG.workerUrl + path);
  const data = await res.json();
  if(!res.ok || data.error) throw new Error(typeof data.error === 'string' ? data.error : 'Erreur du serveur relais');
  return data;
}

function updateAiRealistePriceTag(){
  const tag = document.getElementById('aiRealisteePriceTag');
  const warn = document.getElementById('aiRealisteSetupWarning');
  const btn = document.getElementById('aiRealisteOrderBtn');
  if(!aiConfigured()){
    tag.textContent = '—'; warn.style.display = 'block';
    warn.textContent = "La génération vidéo IA n'est pas encore activée sur ce site (voir README.md, étape 5).";
    btn.disabled = true; return;
  }
  warn.style.display = 'none'; btn.disabled = false;
  tag.textContent = fcfa(aiRealistePrice(aiRealisteDuration));
}
function updateAiTemplatePriceTag(){
  const tag = document.getElementById('aiTemplatePriceTag');
  const warn = document.getElementById('aiTemplateSetupWarning');
  const btn = document.getElementById('aiTemplateOrderBtn');
  if(!aiConfigured()){
    tag.textContent = '—'; warn.style.display = 'block';
    warn.textContent = "La génération vidéo IA n'est pas encore activée sur ce site (voir README.md, étape 5).";
    btn.disabled = true; return;
  }
  warn.style.display = 'none'; btn.disabled = false;
  tag.textContent = fcfa(aiTemplatePrice(templateDuration));
}

function openOrderPaymentSheet(order){
  const sheet = document.getElementById('productSheet');
  sheet.innerHTML = `
    <div class="sheet-handle"></div>
    <span class="reel-cat">${order.title}</span>
    <h2>Ta vidéo sur mesure</h2>
    <p class="price-tag">${fcfa(order.price)}</p>
    <p class="sheet-desc">Générée automatiquement après validation de ton paiement (voix incluse). Compte quelques minutes de génération.</p>
    ${payMethodsBlock()}
    <p class="field-label">Tes informations</p>
    <input class="input" id="buyerName" placeholder="Ton nom">
    <input class="input" id="buyerPhone" placeholder="Numéro de téléphone / WhatsApp" inputmode="tel">
    <input class="input" id="buyerRef" placeholder="Référence de la transaction">
    <button class="btn btn-primary" id="submitAiOrderBtn">Confirmer ma commande</button>
    <button class="btn btn-ghost" id="cancelSheetBtn">Annuler</button>
  `;
  let selectedPay = null;
  wirePayMethodButtons(sheet, (id)=>{ selectedPay = id; });
  document.getElementById('cancelSheetBtn').onclick = closeSheet;
  document.getElementById('submitAiOrderBtn').onclick = async ()=>{
    const name = document.getElementById('buyerName').value.trim();
    const phone = document.getElementById('buyerPhone').value.trim();
    const ref = document.getElementById('buyerRef').value.trim();
    if(!selectedPay) return toast('Choisis un moyen de paiement', 'err');
    if(!name || !phone || !ref) return toast('Remplis tous les champs', 'err');
    const accessCode = await getOrCreateAccessCode(phone);
    await DB.push('orders', {
      ...order, payMethod: selectedPay, buyerName: name, buyerPhone: phone, ref, accessCode,
      status:'pending', createdAt: Date.now()
    });
    showAccessCodeConfirmation(accessCode);
  };
  document.getElementById('sheetOverlay').classList.add('open');
  sheet.classList.add('open');
}

function openAiRealisteOrderSheet(){
  const prompt = document.getElementById('aiPrompt').value.trim();
  if(!prompt) return toast('Décris la vidéo que tu veux d\'abord.', 'err');
  openOrderPaymentSheet({
    type:'ai', aiMode:'realiste',
    title:`Vidéo IA réaliste (${aiRealisteDuration}s)`, price: aiRealistePrice(aiRealisteDuration),
    aiPrompt: prompt, aiDuration: aiRealisteDuration
  });
}
function openAiTemplateOrderSheet(){
  const script = document.getElementById('templateScript').value.trim();
  if(!script) return toast('Écris ton texte d\'abord (une ligne = une scène).', 'err');
  const images = document.getElementById('templateImages').value.split('\n').map(s=>s.trim()).filter(Boolean);
  const musicUrl = document.getElementById('templateMusicUrl').value.trim();
  openOrderPaymentSheet({
    type:'ai', aiMode:'template',
    title:`Vidéo IA pub/diaporama (${templateDuration}s)`, price: aiTemplatePrice(templateDuration),
    templateScript: script, templateImages: images,
    templateVoice: templateVoiceOn ? 'avec' : 'aucune', gender: templateGender, language: templateLanguage,
    templateMusicUrl: musicUrl, templateFormat, templateDuration
  });
}

/* ---------- Construction du script JSON2Video ---------- */
function splitIntoClips(totalSec){
  const clips = []; let remaining = totalSec;
  while(remaining > 0){ const d = Math.min(10, remaining); clips.push(d); remaining -= d; }
  return clips;
}
function watermarkScene(){
  return { duration: 2, elements: [
    { type:'text', text:'SHAMAN CHOOZ CHANEL', style:'001' }
  ]};
}
function buildRealisteMovie(clipUrls, clipDurations){
  return {
    resolution: 'full-hd',
    scenes: [
      ...clipUrls.map((url,i)=>({
        duration: clipDurations[i],
        transition: i>0 ? { style:'fade', duration:0.5 } : undefined,
        elements: [ { type:'video', src:url, duration: clipDurations[i] } ]
      })),
      watermarkScene()
    ]
  };
}
async function buildTemplateMovie(order){
  const originalLines = order.templateScript.split('\n').map(s=>s.trim()).filter(Boolean);
  const translatedLines = await translateLines(originalLines, order.language);
  const images = order.templateImages || [];
  const nbScenes = originalLines.length;
  // JSON2Video limite chaque scène à 300 secondes maximum : avec peu de lignes de texte
  // et une durée totale très longue, on plafonne donc la durée par scène.
  const perScene = Math.min(300, Math.max(3, Math.round(order.templateDuration / nbScenes)));
  const vertical = order.templateFormat === 'vertical';
  const voice = getLangVoice(order.language || 'fr', order.gender || 'f');
  const scenes = originalLines.map((originalLine, i)=>{
    const displayLine = translatedLines[i] || originalLine;
    const elements = [];
    if(images[i]){
      elements.push({ type:'image', src: images[i], duration: perScene, resize:'cover' });
    } else {
      // Le prompt d'image IA reste dans le texte d'origine (meilleure qualité de résultat),
      // seuls le texte affiché et la voix off sont traduits dans la langue choisie.
      elements.push({ type:'image', model:'freepik-classic', prompt: originalLine, duration: perScene, resize:'cover', 'aspect-ratio': vertical ? 'vertical' : 'horizontal' });
    }
    elements.push({ type:'text', text: displayLine, style:'001', duration: perScene });
    if(order.templateVoice !== 'aucune'){
      elements.push({ type:'voice', model:'azure', voice, text: displayLine, duration: perScene });
    }
    return { duration: perScene, transition: i>0 ? { style:'fade', duration:0.5 } : undefined, elements };
  });
  scenes.push(watermarkScene());
  const movie = vertical
    ? { resolution:'custom', width:1080, height:1920, scenes }
    : { resolution:'full-hd', scenes };
  if(order.templateMusicUrl){
    movie.elements = [ { type:'audio', src: order.templateMusicUrl, volume: 0.2 } ];
  }
  return movie;
}

/* ---------- Assemblage final via JSON2Video (commun aux deux styles) ---------- */
async function renderMovieAndWait(movie, onStatus){
  const { project } = await workerPost('/json2video/create', movie);
  let attempts = 0;
  while(attempts < 300){ // jusqu'à 20 minutes d'attente, pour les vidéos longues
    await new Promise(r=>setTimeout(r, 4000));
    attempts++;
    const data = await workerGet('/json2video/status?project=' + encodeURIComponent(project));
    if(onStatus) onStatus(data.status);
    if(data.status === 'done') return data.url;
    if(data.status === 'error') throw new Error(data.message || 'Erreur JSON2Video');
  }
  throw new Error('timeout');
}

async function runAiGeneration(order){
  const sheet = document.getElementById('productSheet');
  sheet.innerHTML = `
    <div class="sheet-handle"></div>
    <h2>Génération de ta vidéo IA</h2>
    <p class="sheet-desc" id="aiGenStatus">Envoi de la demande…</p>
    <div id="aiVideoWrap"></div>
    <button class="btn btn-ghost" id="cancelSheetBtn">Fermer</button>
  `;
  document.getElementById('cancelSheetBtn').onclick = closeSheet;
  document.getElementById('sheetOverlay').classList.add('open');
  sheet.classList.add('open');
  const statusEl = document.getElementById('aiGenStatus');
  try{
    let movie;
    if(order.aiMode === 'realiste'){
      // Les séquences sont générées en parallèle (et non l'une après l'autre) pour que
      // les vidéos longues (plusieurs dizaines de séquences) ne prennent pas des heures.
      const clipDurations = splitIntoClips(order.aiDuration);
      const total = clipDurations.length;
      let completed = 0;
      const updateProgress = ()=>{ if(statusEl) statusEl.textContent = `Génération des séquences… (${completed}/${total} prête${completed>1?'s':''})`; };
      updateProgress();
      const generateClip = async (duration, index)=>{
        const { request_id } = await workerPost('/kling/submit', { prompt: order.aiPrompt, duration });
        let tries = 0;
        while(tries < 90){
          await new Promise(r=>setTimeout(r, 4000));
          tries++;
          const data = await workerGet('/kling/status?id=' + encodeURIComponent(request_id));
          if(data.status === 'ERROR') throw new Error(data.message || `Erreur sur la séquence ${index+1}`);
          if(data.status === 'COMPLETED' && data.videoUrl){ completed++; updateProgress(); return data.videoUrl; }
        }
        throw new Error('timeout séquence ' + (index+1));
      };
      const clipUrls = await Promise.all(clipDurations.map((d,i)=>generateClip(d,i)));
      if(statusEl) statusEl.textContent = 'Assemblage final de la vidéo…';
      movie = buildRealisteMovie(clipUrls, clipDurations);
    } else {
      if(statusEl) statusEl.textContent = 'Construction de la vidéo…';
      movie = await buildTemplateMovie(order);
    }
    const videoUrl = await renderMovieAndWait(movie, (status)=>{
      if(statusEl) statusEl.textContent = `Assemblage en cours… (${status})`;
    });
    if(statusEl) statusEl.textContent = 'Vidéo prête !';
    document.getElementById('aiVideoWrap').innerHTML = `
      <video src="${videoUrl}" controls style="width:100%;border-radius:12px;margin-top:10px;"></video>
      <a class="btn btn-teal" href="${videoUrl}" download style="margin-top:10px;">📥 Télécharger ma vidéo</a>`;
    await DB.update(`orders/${order.__id}`, { videoUrl });
  } catch(e){
    if(statusEl) statusEl.textContent = "Une erreur est survenue. Contacte l'administrateur, ta commande reste enregistrée.";
  }
}

/* ---------- Initialisation ---------- */
async function init(){
  document.getElementById('firebaseStatusText').textContent = DB.ready
    ? "Connecté à Firebase — synchronisé sur tous les appareils."
    : "Mode démo local (Firebase pas encore configuré) — voir firebase-config.js.";

  CATALOG = await DB.get('catalog', null);
  if(!CATALOG){
    CATALOG = {};
    SEED_CATALOG.forEach((v,i)=>{ CATALOG['seed'+i] = {...v, videoUrl:''}; });
    await DB.set('catalog', CATALOG);
  }
  ORDERS = await DB.get('orders', {});
  updateAdminDot();

  LIVE_PASSES = await DB.get('livePasses', null);
  if(!LIVE_PASSES){
    LIVE_PASSES = {
      p1: { name:'1 jour', days:1, price:150, createdAt: Date.now() },
      p2: { name:'1 semaine', days:7, price:700, createdAt: Date.now() },
      p3: { name:'1 mois', days:30, price:2000, createdAt: Date.now() }
    };
    await DB.set('livePasses', LIVE_PASSES);
  }
  LIVE_SETTINGS = await DB.get('liveSettings', null);
  if(!LIVE_SETTINGS){
    LIVE_SETTINGS = { offlineMessage:'Hors antenne pour le moment — reviens plus tard !', currentProgram:'', maintenanceMode:false, maintenanceMessage:'' };
    await DB.set('liveSettings', LIVE_SETTINGS);
  }
  LAST_SEEN_ANNOUNCEMENT_TS = LIVE_SETTINGS.announcement?.ts || 0;

  renderFilters();
  renderCatalog();
  renderFreeVideos();
  bindEvents();
  registerSW();
  startUpdateChecks();

  // Lien direct vers une vidéo précise (partagée via #v=id) : ouvre directement sa fiche
  const hashMatch = location.hash.match(/^#v=(.+)$/);
  if(hashMatch && CATALOG[hashMatch[1]]) openProductSheet(hashMatch[1]);
}

/* ---------- Rendu catalogue ---------- */
function renderFilters(){
  const cats = ['Toutes', ...new Set(Object.values(CATALOG).map(v=>v.cat))];
  const el = document.getElementById('filters');
  el.innerHTML = cats.map(c=>`<button class="chip ${c===SELECTED_CATEGORY?'active':''}" data-cat="${c}">${c}</button>`).join('')
    + `<button class="chip ${SELECTED_CATEGORY==='__favoris__'?'active':''}" data-cat="__favoris__">❤️ Favoris</button>`;
  el.querySelectorAll('.chip').forEach(btn=>{
    btn.onclick = ()=>{ SELECTED_CATEGORY = btn.dataset.cat; renderFilters(); renderCatalog(); };
  });
}
function toggleFavorite(id){
  const i = FAVORITES.indexOf(id);
  if(i>=0) FAVORITES.splice(i,1); else FAVORITES.push(id);
  localStorage.setItem('scc_favorites', JSON.stringify(FAVORITES));
  renderCatalog();
}
/* ---------- Vidéos gratuites (vitrine) : sélection qui change automatiquement chaque jour ---------- */
function hashStr(s){ let h=0; for(let i=0;i<s.length;i++){ h=(h<<5)-h+s.charCodeAt(i); h|=0; } return h; }
function mulberry32(seed){
  return function(){
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function seededShuffle(arr, seed){
  const rand = mulberry32(seed);
  const a = [...arr];
  for(let i=a.length-1;i>0;i--){ const j = Math.floor(rand()*(i+1)); [a[i],a[j]] = [a[j],a[i]]; }
  return a;
}
const FREE_VIDEOS_MAX = 30; // nombre maximum affiché — le système en montre autant que possible, jusqu'à cette limite
function renderFreeVideos(){
  const wrap = document.getElementById('freeVideosSection');
  if(!wrap) return;
  const freeItems = Object.entries(CATALOG).filter(([,v])=> v.free && v.videoUrl);
  if(freeItems.length===0){ wrap.innerHTML=''; return; }
  const today = new Date();
  const seed = hashStr(`${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`);
  // On mélange TOUJOURS l'ensemble des vidéos gratuites (pas seulement les 30 affichées) avec la graine du jour,
  // puis on prend les 30 premières : ainsi, s'il y a plus de 30 vidéos gratuites, la sélection ET leur ordre
  // changent chaque jour tout seuls, sans aucune action de l'admin.
  const picked = seededShuffle(freeItems, seed).slice(0, FREE_VIDEOS_MAX);
  wrap.innerHTML = `
    <p class="field-label" style="margin:0 0 8px;">🎁 Vidéos gratuites du jour (${picked.length}) — offertes par SHAMAN CHOOZ CHANEL</p>
    <div class="free-videos-row">
      ${picked.map(([id,v])=>`
        <div class="reel-card free-video-card" data-freeid="${id}">
          <div class="reel-thumb">
            ${placeholderThumb(v.hue, v.emoji)}
            <span class="free-badge" style="position:absolute;top:8px;left:8px;">🎁 Gratuit</span>
            <div class="reel-play"><span>▶</span></div>
          </div>
          <div class="reel-body"><p class="reel-title">${v.title}</p></div>
        </div>`).join('')}
    </div>
    <button class="btn btn-ghost" id="freeVideosCta" style="margin-top:10px;">✨ Envie de la même chose ? Commande la tienne !</button>
  `;
  wrap.querySelectorAll('[data-freeid]').forEach(card=>{ card.onclick = ()=> playFreeVideo(card.dataset.freeid); });
  document.getElementById('freeVideosCta').onclick = ()=> showScreen('custom');
}
function playFreeVideo(id){
  const v = CATALOG[id];
  const sheet = document.getElementById('productSheet');
  sheet.innerHTML = `
    <div class="sheet-handle"></div>
    <span class="free-badge">🎁 Gratuit</span>
    <h2>${v.title}</h2>
    <video src="${v.videoUrl}" controls autoplay style="width:100%;border-radius:12px;margin:10px 0;"></video>
    <p class="sheet-desc">Cette vidéo est offerte à titre d'exemple. Toi aussi, crée la tienne !</p>
    <button class="btn btn-primary" id="freeCtaBtn">🎨 Créer ma vidéo</button>
    <button class="btn btn-ghost" id="cancelSheetBtn">Fermer</button>
  `;
  document.getElementById('freeCtaBtn').onclick = ()=>{ closeSheet(); showScreen('custom'); };
  document.getElementById('cancelSheetBtn').onclick = closeSheet;
  document.getElementById('sheetOverlay').classList.add('open');
  sheet.classList.add('open');
}

function renderCatalog(){
  const grid = document.getElementById('catalogGrid');
  let entries = Object.entries(CATALOG).filter(([,v])=>
    SELECTED_CATEGORY==='Toutes' || (SELECTED_CATEGORY==='__favoris__' ? false : v.cat===SELECTED_CATEGORY)
  );
  if(SELECTED_CATEGORY==='__favoris__'){
    entries = Object.entries(CATALOG).filter(([id])=> FAVORITES.includes(id));
  }
  if(SEARCH_QUERY){
    const q = SEARCH_QUERY.toLowerCase();
    entries = entries.filter(([,v])=> v.title.toLowerCase().includes(q) || v.cat.toLowerCase().includes(q));
  }
  if(entries.length===0){
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><div class="big">🎬</div>${SELECTED_CATEGORY==='__favoris__' ? "Tu n'as pas encore de favoris — appuie sur le ❤️ d'une vidéo pour l'ajouter." : "Aucune vidéo trouvée."}</div>`;
    return;
  }
  grid.innerHTML = entries.map(([id,v],i)=>{
    const isNew = v.createdAt && (Date.now() - v.createdAt) < NEW_BADGE_MS;
    const isFav = FAVORITES.includes(id);
    return `
    <div class="reel-card" data-id="${id}">
      <div class="reel-thumb">
        ${placeholderThumb(v.hue, v.emoji)}
        <span class="reel-ep">Ép. ${String(i+1).padStart(2,'0')}</span>
        ${isNew ? '<span class="reel-badge-new">🆕 Nouveau</span>' : ''}
        <button class="reel-fav ${isFav?'active':''}" data-fav="${id}" aria-label="Favori">❤</button>
        <div class="reel-play"><span>▶</span></div>
      </div>
      <div class="reel-body">
        <span class="reel-cat">${v.cat}</span>
        <p class="reel-title">${v.title}</p>
        <p class="reel-price">${fcfa(v.price)} <small>/ vidéo</small></p>
        <p class="hint" style="margin:2px 0 0;">👁️ ${v.views||0} vue${(v.views||0)>1?'s':''}</p>
      </div>
    </div>`;
  }).join('');
  grid.querySelectorAll('.reel-card').forEach(card=>{
    card.onclick = (e)=>{ if(e.target.closest('.reel-fav')) return; openProductSheet(card.dataset.id); };
  });
  grid.querySelectorAll('.reel-fav').forEach(btn=>{
    btn.onclick = (e)=>{ e.stopPropagation(); toggleFavorite(btn.dataset.fav); };
  });
}

/* ---------- Fiche produit + commande ---------- */
function openProductSheet(id){
  SELECTED_ITEM = id; SELECTED_PAY = null;
  const v = CATALOG[id];
  // Compteur de vues : incrémenté à chaque ouverture de fiche (affiché dès la prochaine actualisation)
  v.views = (v.views||0) + 1;
  DB.update(`catalog/${id}`, { views: v.views }).catch(()=>{});
  history.replaceState(null, '', '#v=' + id); // lien direct vers cette vidéo précise
  const sheet = document.getElementById('productSheet');
  sheet.innerHTML = `
    <div class="sheet-handle"></div>
    <span class="reel-cat">${v.cat}</span>
    <h2>${v.title}</h2>
    <p class="price-tag">${fcfa(v.price)}</p>
    <p class="sheet-desc">${v.desc}</p>
    <button class="btn btn-ghost" id="shareBtn" style="margin:0 0 12px;">📤 Partager cette vidéo</button>

    ${payMethodsBlock()}

    <p class="field-label">Tes informations</p>
    <input class="input" id="buyerName" placeholder="Ton nom">
    <input class="input" id="buyerPhone" placeholder="Numéro de téléphone / WhatsApp" inputmode="tel">
    <input class="input" id="buyerRef" placeholder="Référence de la transaction">
    <p class="hint">Colle la référence reçue après ton paiement mobile money. Ta vidéo sera débloquée après vérification (généralement rapide).</p>

    <button class="btn btn-primary" id="submitOrderBtn">Confirmer ma commande</button>
    <button class="btn btn-ghost" id="cancelSheetBtn">Annuler</button>
  `;
  document.getElementById('shareBtn').onclick = ()=> shareItem(v, id);
  wirePayMethodButtons(sheet, (id)=>{ SELECTED_PAY = id; });
  document.getElementById('cancelSheetBtn').onclick = closeSheet;
  document.getElementById('submitOrderBtn').onclick = submitOrder;
  document.getElementById('sheetOverlay').classList.add('open');
  sheet.classList.add('open');
}
/* Partage natif (WhatsApp, Messages, etc.) avec lien direct vers cette vidéo précise.
   Si le téléphone/navigateur ne propose pas de partage natif, on copie le lien à la place. */
async function shareItem(v, id){
  const url = location.origin + location.pathname + '#v=' + id;
  const text = `${v.title} — ${fcfa(v.price)} sur SHAMAN CHOOZ CHANEL`;
  if(navigator.share){
    try{ await navigator.share({ title: v.title, text, url }); } catch(e){ /* annulé par l'utilisateur */ }
  } else {
    try{ await navigator.clipboard.writeText(url); toast('Lien copié !', 'ok'); } catch(e){ toast(url, 'ok'); }
  }
}
function closeSheet(){
  document.getElementById('sheetOverlay').classList.remove('open');
  document.getElementById('productSheet').classList.remove('open');
  if(location.hash.startsWith('#v=')) history.replaceState(null, '', location.pathname);
}
async function submitOrder(){
  const name = document.getElementById('buyerName').value.trim();
  const phone = document.getElementById('buyerPhone').value.trim();
  const ref = document.getElementById('buyerRef').value.trim();
  if(!SELECTED_PAY) return toast('Choisis un moyen de paiement', 'err');
  if(!name || !phone || !ref) return toast('Remplis tous les champs', 'err');

  const v = CATALOG[SELECTED_ITEM];
  const accessCode = await getOrCreateAccessCode(phone);
  await DB.push('orders', {
    itemId: SELECTED_ITEM, title: v.title, price: v.price,
    payMethod: SELECTED_PAY, buyerName: name, buyerPhone: phone, ref, accessCode,
    status: 'pending', createdAt: Date.now()
  });
  showAccessCodeConfirmation(accessCode);
}

/* ---------- Espace client : mes vidéos ---------- */
/* Donne à un client un code d'accès personnel (6 chiffres), lié à son numéro de téléphone.
   Si ce numéro a déjà commandé, on réutilise le même code (pour qu'un seul code retrouve
   toutes ses commandes) ; sinon on en génère un nouveau. */
async function getOrCreateAccessCode(phone){
  const orders = await DB.get('orders', {});
  const existing = Object.values(orders).find(o => o.buyerPhone === phone && o.accessCode);
  if(existing) return existing.accessCode;
  return String(Math.floor(100000 + Math.random() * 900000));
}

/* Permet à un client de changer son code d'accès (ex: s'il pense qu'un tiers l'a vu).
   Met à jour toutes ses commandes existantes (identifiées par téléphone + ancien code)
   avec un nouveau code. Retourne le nouveau code, ou null si le code actuel était incorrect. */
async function changeAccessCode(phone, oldCode){
  const orders = await DB.get('orders', {});
  const mineIds = Object.entries(orders).filter(([,o]) => o.buyerPhone === phone && o.accessCode === oldCode).map(([id])=>id);
  if(mineIds.length === 0) return null;
  const newCode = String(Math.floor(100000 + Math.random() * 900000));
  for(const id of mineIds){ await DB.update(`orders/${id}`, { accessCode: newCode }); }
  return newCode;
}

/* Affiche le code d'accès dans la fiche (persistant, contrairement au toast qui disparaît vite) */
function showAccessCodeConfirmation(code, context){
  const sheet = document.getElementById('productSheet');
  const intro = context === 'change'
    ? `<h2>Code d'accès mis à jour !</h2><p class="sheet-desc">L'ancien code ne fonctionne plus.</p>`
    : `<h2>Commande envoyée !</h2><p class="sheet-desc">Ta vidéo sera débloquée après vérification de ton paiement.</p>`;
  sheet.innerHTML = `
    <div class="sheet-handle"></div>
    ${intro}
    <div class="pay-number-box" style="display:block;font-size:14px;">
      🔑 Ton code d'accès personnel : <strong style="font-size:22px;letter-spacing:2px;">${code}</strong><br><br>
      Garde-le précieusement : avec ton numéro de téléphone, il te permet de retrouver et regarder tes vidéos dans "Mes vidéos". Sans ce code, personne d'autre ne peut voir tes vidéos.
    </div>
    <button class="btn btn-primary" id="closeConfirmBtn" style="margin-top:14px;">OK, j'ai noté mon code</button>
  `;
  document.getElementById('closeConfirmBtn').onclick = closeSheet;
  document.getElementById('sheetOverlay').classList.add('open');
  sheet.classList.add('open');
}

async function lookupClientOrders(){
  const phone = document.getElementById('clientPhoneInput').value.trim();
  const code = document.getElementById('clientCodeInput').value.trim();
  ORDERS = await DB.get('orders', {});
  const list = document.getElementById('clientOrdersList');
  const changeBtn = document.getElementById('changeCodeBtn');
  if(!phone || !code){ list.innerHTML=''; changeBtn.style.display='none'; return; }
  const mine = Object.entries(ORDERS).filter(([,o])=> o.buyerPhone === phone && o.accessCode === code);
  if(mine.length===0){
    list.innerHTML = `<div class="empty-state"><div class="big">📭</div>Aucune commande trouvée pour ce numéro et ce code. Vérifie les deux informations (le code t'a été communiqué après ta commande).</div>`;
    changeBtn.style.display='none';
    return;
  }
  changeBtn.style.display='block';
  // Notifie le client si une de ses commandes vient d'être validée (statut passé à "paid")
  // depuis la dernière vérification — utile pendant qu'il garde l'onglet ouvert en arrière-plan.
  if('Notification' in window && Notification.permission === 'default') Notification.requestPermission();
  mine.forEach(([id,o])=>{
    const prev = LAST_KNOWN_STATUSES[id];
    if(prev && prev !== 'paid' && o.status === 'paid' && 'Notification' in window && Notification.permission === 'granted'){
      new Notification('SHAMAN CHOOZ CHANEL', { body: `Ta commande "${o.title}" est validée — ta vidéo est prête !` });
    }
    LAST_KNOWN_STATUSES[id] = o.status;
  });
  list.innerHTML = mine.sort((a,b)=>b[1].createdAt-a[1].createdAt).map(([id,o])=>`
    <div class="order-card">
      <div class="row"><strong>${o.title}</strong>
        <span class="status-pill status-${o.status==='paid'?'paid':o.status==='rejected'?'rejected':'pending'}">
          ${o.status==='paid'?'Débloquée':o.status==='rejected'?'Refusée':'En attente'}
        </span>
      </div>
      <div class="row" style="margin-bottom:0;">
        <span class="hint" style="margin:0;">${fcfa(o.price)} • ${o.payMethod}</span>
        ${o.status==='paid' && o.type!=='custom' && CATALOG[o.itemId] && CATALOG[o.itemId].videoUrl
          ? `<a class="btn btn-teal" style="width:auto;margin:0;padding:8px 14px;font-size:12.5px;" target="_blank" href="${CATALOG[o.itemId].videoUrl}">▶ Regarder</a>`
          : ''}
        ${o.status==='paid' && (o.type==='custom'||o.type==='ai') && !o.videoUrl
          ? `<button class="btn btn-teal" style="width:auto;margin:0;padding:8px 14px;font-size:12.5px;" data-generate="${id}">🎬 Générer ma vidéo</button>`
          : ''}
        ${o.status==='paid' && (o.type==='custom'||o.type==='ai') && o.videoUrl
          ? `<a class="btn btn-teal" style="width:auto;margin:0;padding:8px 14px;font-size:12.5px;" target="_blank" href="${o.videoUrl}">▶ Regarder</a>`
          : ''}
      </div>
    </div>`).join('');
  list.querySelectorAll('[data-generate]').forEach(btn=>{
    btn.onclick = ()=>{
      const id = btn.dataset.generate;
      const order = {...ORDERS[id], __id:id};
      if(order.type === 'custom') runSimpleGeneration(order);
      else runAiGeneration(order);
    };
  });
}
async function runSimpleGeneration(order){
  const sheet = document.getElementById('productSheet');
  sheet.innerHTML = `
    <div class="sheet-handle"></div>
    <h2>Génération de ta vidéo</h2>
    <p class="sheet-desc" id="genStatus">Préparation…</p>
    <div id="genVideoWrap"></div>
    <button class="btn btn-ghost" id="cancelSheetBtn">Fermer</button>
  `;
  document.getElementById('cancelSheetBtn').onclick = closeSheet;
  document.getElementById('sheetOverlay').classList.add('open');
  sheet.classList.add('open');
  const statusEl = document.getElementById('genStatus');
  try{
    const movie = await buildSimpleMovie(order);
    const videoUrl = await renderMovieAndWait(movie, (status)=>{
      if(statusEl) statusEl.textContent = `Génération en cours… (${status})`;
    });
    if(statusEl) statusEl.textContent = 'Vidéo prête ! (avec sa voix intégrée)';
    document.getElementById('genVideoWrap').innerHTML = `
      <video src="${videoUrl}" controls style="width:100%;border-radius:12px;margin-top:10px;"></video>
      <a class="btn btn-teal" href="${videoUrl}" download style="margin-top:10px;">📥 Télécharger ma vidéo</a>`;
    await DB.update(`orders/${order.__id}`, { videoUrl });
  } catch(e){
    if(statusEl) statusEl.textContent = "Une erreur est survenue. Contacte l'administrateur, ta commande reste enregistrée.";
  }
}

/* Enregistre et affiche la date/heure de la dernière connexion admin (utile pour repérer
   une connexion suspecte si quelqu'un d'autre accédait à l'espace admin). */
async function recordAdminLogin(){
  const now = Date.now();
  const previous = await DB.get('lastAdminLogin', null);
  await DB.set('lastAdminLogin', now).catch(()=>{});
  const el = document.getElementById('lastLoginInfo');
  if(el){
    el.textContent = previous
      ? `Dernière connexion précédente : ${new Date(previous).toLocaleString('fr-FR')}`
      : 'Première connexion enregistrée.';
  }
}

/* ---------- Admin : connexion ---------- */
/* Depuis que la base de données est protégée par de vraies règles Firebase, la connexion
   admin utilise Firebase Authentication (voir firebase-config.js pour créer ce compte).
   Sans Firebase connecté, un mot de passe de démonstration local reste disponible pour tester. */
async function adminLogin(){
  const pw = document.getElementById('adminPwInput').value;
  const errEl = document.getElementById('adminLoginError');
  errEl.textContent = '';
  const onSuccess = ()=>{
    ADMIN_LOGGED_IN = true;
    document.getElementById('adminPwInput').value = '';
    showScreen('admin-dash');
    renderAdminOrders();
    renderAdminCatalog();
    renderAdminStats();
    recordAdminLogin();
  };
  if(DB.ready){
    if(typeof firebase.auth !== 'function'){
      errEl.textContent = "Erreur technique : le module d'authentification Firebase ne s'est pas chargé (vérifie que index.html contient bien la ligne firebase-auth-compat.js, et essaie de recharger la page).";
      return;
    }
    try{
      await firebase.auth().signInWithEmailAndPassword(ADMIN_EMAIL, pw);
      onSuccess();
    } catch(e){
      const messages = {
        'auth/operation-not-allowed': "La connexion par e-mail/mot de passe n'est pas activée dans Firebase (Authentication > Sign-in method > active \"E-mail/Mot de passe\").",
        'auth/user-not-found': `Aucun utilisateur avec l'e-mail ${ADMIN_EMAIL} n'existe dans Firebase Authentication (vérifie qu'il a bien été créé, sans espace ni faute de frappe).`,
        'auth/invalid-email': "L'adresse ADMIN_EMAIL dans firebase-config.js n'est pas valide.",
        'auth/wrong-password': 'Mot de passe incorrect.',
        'auth/invalid-credential': 'Mot de passe incorrect (ou utilisateur introuvable — vérifie ton compte dans Firebase Authentication).',
        'auth/too-many-requests': 'Trop de tentatives : attends quelques minutes puis réessaie.'
      };
      errEl.textContent = messages[e.code] || ('Erreur de connexion : ' + (e.code || e.message));
    }
  } else {
    if(pw === 'Shaman123chooz') onSuccess();
    else errEl.textContent = 'Mot de passe incorrect. (Mode démo local : Shaman123chooz)';
  }
}
/* Convertit un numéro de téléphone (formats variés) en lien WhatsApp cliquable */
function waLink(phone){
  let digits = (phone||'').replace(/\D/g,'');
  if(digits.startsWith('00')) digits = digits.slice(2);
  if(digits.startsWith('0') && digits.length===10) digits = '225' + digits.slice(1); // format ivoirien local
  return `https://wa.me/${digits}`;
}

/* ---------- Admin : statistiques de vente ---------- */
function rangeCutoff(range){
  if(range==='today'){ const d=new Date(); d.setHours(0,0,0,0); return d.getTime(); }
  if(range==='week') return Date.now() - 7*24*3600*1000;
  if(range==='month'){ const d=new Date(); d.setDate(1); d.setHours(0,0,0,0); return d.getTime(); }
  return 0; // tout
}
function renderAdminStats(){
  ORDERS = ORDERS || {};
  const cutoff = rangeCutoff(STATS_RANGE);
  const paid = Object.values(ORDERS).filter(o=> o.status==='paid' && o.createdAt >= cutoff);
  const revenue = paid.reduce((s,o)=>s+(o.price||0),0);
  const count = paid.length;
  const avg = count ? Math.round(revenue/count) : 0;
  const pendingCount = Object.values(ORDERS).filter(o=>o.status==='pending').length;
  const monthCutoff = rangeCutoff('month');
  const aiThisMonth = Object.values(ORDERS).filter(o=> o.status==='paid' && o.createdAt>=monthCutoff && (o.type==='ai'||o.type==='custom')).length;

  document.getElementById('statsCards').innerHTML = `
    <div class="stat-card"><span class="stat-value">${fcfa(revenue)}</span><span class="stat-label">Chiffre d'affaires</span></div>
    <div class="stat-card"><span class="stat-value">${count}</span><span class="stat-label">Commandes validées</span></div>
    <div class="stat-card"><span class="stat-value">${fcfa(avg)}</span><span class="stat-label">Panier moyen</span></div>
    <div class="stat-card"><span class="stat-value">${pendingCount}</span><span class="stat-label">En attente</span></div>
    <div class="stat-card"><span class="stat-value">${aiThisMonth}</span><span class="stat-label">Vidéos IA ce mois</span></div>
  `;

  drawStatsChart();

  const soldCount = {};
  Object.values(ORDERS).filter(o=>o.status==='paid' && o.itemId).forEach(o=>{
    soldCount[o.itemId] = soldCount[o.itemId] || { count:0, revenue:0, title:(CATALOG[o.itemId]?.title || o.title) };
    soldCount[o.itemId].count++; soldCount[o.itemId].revenue += (o.price||0);
  });
  const topSold = Object.values(soldCount).sort((a,b)=>b.count-a.count).slice(0,5);
  document.getElementById('statsTopSold').innerHTML = topSold.length
    ? topSold.map((s,i)=>`<p class="hint" style="margin:4px 0;">${i+1}. ${s.title} — ${s.count} vente${s.count>1?'s':''} (${fcfa(s.revenue)})</p>`).join('')
    : `<p class="hint">Aucune vente pour l'instant.</p>`;

  const topViewed = Object.entries(CATALOG).sort((a,b)=>(b[1].views||0)-(a[1].views||0)).slice(0,5);
  document.getElementById('statsTopViewed').innerHTML = topViewed.length
    ? topViewed.map(([,v],i)=>`<p class="hint" style="margin:4px 0;">${i+1}. ${v.title} — ${v.views||0} vue${(v.views||0)>1?'s':''}</p>`).join('')
    : `<p class="hint">Pas encore de données.</p>`;

  const types = { 'Catalogue':0, 'Vidéo sur mesure':0, 'Vidéo IA réaliste':0, 'Vidéo IA pub/diaporama':0, 'Pass chaîne':0 };
  const typeRevenue = { 'Catalogue':0, 'Vidéo sur mesure':0, 'Vidéo IA réaliste':0, 'Vidéo IA pub/diaporama':0, 'Pass chaîne':0 };
  paid.forEach(o=>{
    let key = 'Catalogue';
    if(o.type==='custom') key = 'Vidéo sur mesure';
    else if(o.type==='ai' && o.aiMode==='realiste') key = 'Vidéo IA réaliste';
    else if(o.type==='ai' && o.aiMode==='template') key = 'Vidéo IA pub/diaporama';
    else if(o.type==='live-pass') key = 'Pass chaîne';
    types[key]++; typeRevenue[key]+=(o.price||0);
  });
  document.getElementById('statsByType').innerHTML = Object.keys(types).map(k=>
    `<p class="hint" style="margin:4px 0;">${k} : ${types[k]} commande${types[k]>1?'s':''} — ${fcfa(typeRevenue[k])}</p>`
  ).join('');

  const catRevenue = {};
  paid.filter(o=>o.itemId).forEach(o=>{
    const cat = CATALOG[o.itemId]?.cat || 'Autre';
    catRevenue[cat] = (catRevenue[cat]||0) + (o.price||0);
  });
  const catEntries = Object.entries(catRevenue).sort((a,b)=>b[1]-a[1]);
  document.getElementById('statsByCategory').innerHTML = catEntries.length
    ? catEntries.map(([cat,rev])=>`<p class="hint" style="margin:4px 0;">${cat} — ${fcfa(rev)}</p>`).join('')
    : `<p class="hint">Pas encore de ventes catalogue.</p>`;
}
function drawStatsChart(){
  const canvas = document.getElementById('statsChart');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const days = [];
  for(let i=6;i>=0;i--){
    const d = new Date(); d.setDate(d.getDate()-i); d.setHours(0,0,0,0);
    days.push(d.getTime());
  }
  const totals = days.map(dayStart=>{
    const dayEnd = dayStart + 24*3600*1000;
    return Object.values(ORDERS).filter(o=>o.status==='paid' && o.createdAt>=dayStart && o.createdAt<dayEnd).reduce((s,o)=>s+(o.price||0),0);
  });
  const max = Math.max(...totals, 1);
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0,0,w,h);
  const gap = w / totals.length;
  const barW = gap * 0.55;
  const pink = getComputedStyle(document.documentElement).getPropertyValue('--pink').trim() || '#C97B4A';
  const muted = getComputedStyle(document.documentElement).getPropertyValue('--muted').trim() || '#7A6C58';
  totals.forEach((val,i)=>{
    const barH = (val/max) * (h-30);
    const x = i*gap + (gap-barW)/2;
    const y = h - barH - 20;
    ctx.fillStyle = pink;
    if(ctx.roundRect){ ctx.beginPath(); ctx.roundRect(x,y,barW,Math.max(barH,2),4); ctx.fill(); }
    else ctx.fillRect(x,y,barW,Math.max(barH,2));
    ctx.fillStyle = muted;
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(new Date(days[i]).toLocaleDateString('fr-FR',{weekday:'short'}), x+barW/2, h-6);
  });
}

/* ---------- Admin : gestion de la chaîne en direct (pass, abonnés, réglages, replays) ---------- */
function activeLivePassOrders(){
  return Object.entries(ORDERS).filter(([,o])=> o.type==='live-pass' && o.status==='paid');
}
async function renderAdminLiveTab(){
  ORDERS = await DB.get('orders', {});
  renderAdminLiveStats();
  renderAdminLivePasses();
  renderLiveSubscribers();
  document.getElementById('currentProgramInput').value = LIVE_SETTINGS.currentProgram || '';
  document.getElementById('offlineMessageInput').value = LIVE_SETTINGS.offlineMessage || '';
  document.getElementById('maintenanceModeCheckbox').checked = !!LIVE_SETTINGS.maintenanceMode;
  document.getElementById('maintenanceMessageInput').value = LIVE_SETTINGS.maintenanceMessage || '';
}
function renderAdminLiveStats(){
  const all = activeLivePassOrders();
  const now = Date.now();
  const activeNow = all.filter(([,o])=> o.liveExpiresAt > now);
  const revenue = all.reduce((s,[,o])=>s+(o.price||0),0);
  const byPass = {};
  all.forEach(([,o])=>{ byPass[o.passName] = (byPass[o.passName]||0)+1; });
  const topPass = Object.entries(byPass).sort((a,b)=>b[1]-a[1])[0];
  document.getElementById('liveStatsCards').innerHTML = `
    <div class="stat-card"><span class="stat-value">${fcfa(revenue)}</span><span class="stat-label">Revenu total chaîne</span></div>
    <div class="stat-card"><span class="stat-value">${activeNow.length}</span><span class="stat-label">Abonnés actifs</span></div>
    <div class="stat-card"><span class="stat-value">${all.length}</span><span class="stat-label">Pass vendus (total)</span></div>
    <div class="stat-card"><span class="stat-value">${topPass ? topPass[0] : '—'}</span><span class="stat-label">Formule la plus vendue</span></div>
  `;
}
function renderAdminLivePasses(){
  const el = document.getElementById('adminLivePassesList');
  const passes = Object.entries(LIVE_PASSES).sort((a,b)=>a[1].price-b[1].price);
  el.innerHTML = passes.length ? passes.map(([id,p])=>`
    <div class="order-card">
      <div class="row"><strong>${p.name}</strong><span class="hint" style="margin:0;">${fcfa(p.price)} — ${p.days} jour${p.days>1?'s':''}</span></div>
      <div style="display:flex; gap:8px; margin-top:8px;">
        <button class="btn btn-ghost" style="margin:0;width:auto;padding:8px 14px;" data-editpass="${id}">✏️ Modifier</button>
        <button class="btn btn-ghost" style="margin:0;width:auto;padding:8px 14px;" data-deletepass="${id}">🗑️ Supprimer</button>
      </div>
    </div>`).join('') : `<p class="hint">Aucun pass pour l'instant — ajoute-en un ci-dessous.</p>`;
  el.querySelectorAll('[data-editpass]').forEach(btn=>{
    btn.onclick = async ()=>{
      const id = btn.dataset.editpass; const p = LIVE_PASSES[id];
      const name = prompt('Nom du pass :', p.name); if(name===null) return;
      const days = parseInt(prompt('Durée en jours :', p.days)); if(isNaN(days)) return;
      const price = parseInt(prompt('Prix en FCFA :', p.price)); if(isNaN(price)) return;
      LIVE_PASSES[id] = { ...p, name, days, price };
      await DB.set('livePasses', LIVE_PASSES);
      renderAdminLivePasses(); renderAdminLiveStats();
      toast('Pass mis à jour.', 'ok');
    };
  });
  el.querySelectorAll('[data-deletepass]').forEach(btn=>{
    btn.onclick = async ()=>{
      if(Object.keys(LIVE_PASSES).length <= 1) return toast('Il doit rester au moins un pass disponible.', 'err');
      if(!confirm('Supprimer ce pass ? Les abonnés qui l\'ont déjà acheté gardent leur accès jusqu\'à expiration.')) return;
      delete LIVE_PASSES[btn.dataset.deletepass];
      await DB.set('livePasses', LIVE_PASSES);
      renderAdminLivePasses(); renderAdminLiveStats();
      toast('Pass supprimé.', 'ok');
    };
  });
}
async function addLivePass(){
  const name = document.getElementById('newPassName').value.trim();
  const days = parseInt(document.getElementById('newPassDays').value);
  const price = parseInt(document.getElementById('newPassPrice').value);
  if(!name || !days || isNaN(price)) return toast('Remplis le nom, la durée et le prix.', 'err');
  const id = 'pass'+Date.now();
  LIVE_PASSES[id] = { name, days, price, createdAt: Date.now() };
  await DB.set('livePasses', LIVE_PASSES);
  document.getElementById('newPassName').value = '';
  document.getElementById('newPassDays').value = '';
  document.getElementById('newPassPrice').value = '';
  renderAdminLivePasses(); renderAdminLiveStats();
  toast('Nouveau pass ajouté !', 'ok');
}
let LIVE_SUB_SEARCH = '';
function renderLiveSubscribers(){
  const el = document.getElementById('liveSubscribersList');
  let entries = activeLivePassOrders();
  if(LIVE_SUB_SEARCH){
    const q = LIVE_SUB_SEARCH.toLowerCase();
    entries = entries.filter(([,o])=> (o.buyerName||'').toLowerCase().includes(q) || (o.buyerPhone||'').includes(q));
  }
  entries.sort((a,b)=>b[1].liveExpiresAt - a[1].liveExpiresAt);
  if(entries.length===0){ el.innerHTML = `<p class="hint">Aucun abonné trouvé.</p>`; return; }
  const now = Date.now();
  el.innerHTML = entries.map(([id,o])=>{
    const active = o.liveExpiresAt > now;
    return `
    <div class="order-card">
      <div class="row"><strong>${o.buyerName}</strong>
        <span class="status-pill status-${active?'paid':'rejected'}">${active?'Actif':'Expiré'}</span>
      </div>
      <p class="hint" style="margin:2px 0 8px;">${o.buyerPhone} • ${o.passName} • Expire le ${new Date(o.liveExpiresAt).toLocaleDateString('fr-FR')}</p>
      <div style="display:flex; gap:8px; flex-wrap:wrap;">
        <button class="btn btn-ghost" style="margin:0;width:auto;padding:8px 14px;" data-extend="${id}">➕ +7 jours</button>
        <button class="btn btn-ghost" style="margin:0;width:auto;padding:8px 14px;" data-revoke="${id}">🚫 Révoquer</button>
        <a class="btn btn-ghost" style="margin:0;width:auto;padding:8px 14px;" href="${waLink(o.buyerPhone)}" target="_blank">💬 WhatsApp</a>
      </div>
    </div>`;
  }).join('');
  el.querySelectorAll('[data-extend]').forEach(btn=>{
    btn.onclick = async ()=>{
      const id = btn.dataset.extend; const o = ORDERS[id];
      const newExpiry = Math.max(o.liveExpiresAt, Date.now()) + 7*24*3600*1000;
      await DB.update(`orders/${id}`, { liveExpiresAt: newExpiry });
      ORDERS[id].liveExpiresAt = newExpiry;
      renderLiveSubscribers(); renderAdminLiveStats();
      toast('Accès prolongé de 7 jours.', 'ok');
    };
  });
  el.querySelectorAll('[data-revoke]').forEach(btn=>{
    btn.onclick = async ()=>{
      if(!confirm("Révoquer l'accès de ce client à la chaîne ?")) return;
      const id = btn.dataset.revoke;
      await DB.update(`orders/${id}`, { liveExpiresAt: Date.now() - 1000 });
      ORDERS[id].liveExpiresAt = Date.now() - 1000;
      renderLiveSubscribers(); renderAdminLiveStats();
      toast('Accès révoqué.', 'ok');
    };
  });
}
function exportLiveCsv(){
  const rows = [['Nom','Téléphone','Pass','Prix (FCFA)','Achat le','Expire le','Statut']];
  activeLivePassOrders().forEach(([,o])=>{
    rows.push([o.buyerName, o.buyerPhone, o.passName, o.price, new Date(o.createdAt).toLocaleString('fr-FR'), new Date(o.liveExpiresAt).toLocaleString('fr-FR'), o.liveExpiresAt>Date.now()?'Actif':'Expiré']);
  });
  const csv = rows.map(r => r.map(v => `"${String(v??'').replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF'+csv], { type:'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `abonnes-chaine-${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
}
async function saveLiveSettings(){
  LIVE_SETTINGS.currentProgram = document.getElementById('currentProgramInput').value.trim();
  LIVE_SETTINGS.offlineMessage = document.getElementById('offlineMessageInput').value.trim();
  LIVE_SETTINGS.maintenanceMode = document.getElementById('maintenanceModeCheckbox').checked;
  LIVE_SETTINGS.maintenanceMessage = document.getElementById('maintenanceMessageInput').value.trim();
  await DB.set('liveSettings', LIVE_SETTINGS);
  toast('Réglages de la chaîne enregistrés.', 'ok');
}
async function announceLive(){
  await DB.update('liveSettings', { announcement: { message: 'SHAMAN CHOOZ CHANEL est en direct maintenant !', ts: Date.now() } });
  LIVE_SETTINGS.announcement = { message: 'SHAMAN CHOOZ CHANEL est en direct maintenant !', ts: Date.now() };
  toast('Annonce envoyée aux visiteurs présents sur l\'onglet Chaîne.', 'ok');
}
async function loadAdminReplays(){
  const el = document.getElementById('adminReplaysList');
  el.innerHTML = `<p class="hint">Chargement...</p>`;
  try{
    const data = await workerGet('/live/replays');
    if(!data.configured){ el.innerHTML = `<p class="hint">Chaîne pas encore configurée (voir README, étape 14).</p>`; return; }
    if(data.replays.length===0){ el.innerHTML = `<p class="hint">Aucun replay pour l'instant.</p>`; return; }
    const publicIds = LIVE_SETTINGS.publicReplays || [];
    el.innerHTML = data.replays.map(r=>{
      const isPublic = publicIds.includes(r.uid);
      const mins = Math.round(r.duration/60);
      return `
      <div class="order-card">
        <div class="row"><strong>${new Date(r.created).toLocaleDateString('fr-FR')}</strong><span class="hint" style="margin:0;">${mins} min</span></div>
        <div style="display:flex; gap:8px; margin-top:8px;">
          <a class="btn btn-ghost" style="margin:0;width:auto;padding:8px 14px;" href="${r.hlsUrl}" target="_blank">▶ Voir</a>
          <button class="btn btn-ghost" style="margin:0;width:auto;padding:8px 14px;" data-togglepublic="${r.uid}">${isPublic ? '🔒 Rendre réservé aux abonnés' : '🌍 Rendre public (visible sans pass)'}</button>
        </div>
      </div>`;
    }).join('');
    el.querySelectorAll('[data-togglepublic]').forEach(btn=>{
      btn.onclick = async ()=>{
        const uid = btn.dataset.togglepublic;
        let list = LIVE_SETTINGS.publicReplays || [];
        if(list.includes(uid)) list = list.filter(x=>x!==uid); else list = [...list, uid];
        LIVE_SETTINGS.publicReplays = list;
        await DB.update('liveSettings', { publicReplays: list });
        loadAdminReplays();
        toast('Mis à jour.', 'ok');
      };
    });
  } catch(e){ el.innerHTML = `<p class="hint">Erreur de chargement des replays.</p>`; }
}

async function renderAdminOrders(){
  ORDERS = await DB.get('orders', {});
  updateAdminDot();
  const el = document.getElementById('adminOrdersList');
  let entries = Object.entries(ORDERS).sort((a,b)=>b[1].createdAt-a[1].createdAt);
  if(ORDER_STATUS_FILTER !== 'all'){
    entries = entries.filter(([,o])=> (o.status||'pending') === ORDER_STATUS_FILTER);
  }
  if(ORDER_SEARCH){
    const q = ORDER_SEARCH.toLowerCase();
    entries = entries.filter(([,o])=> (o.buyerName||'').toLowerCase().includes(q) || (o.buyerPhone||'').includes(q) || (o.ref||'').toLowerCase().includes(q) || (o.title||'').toLowerCase().includes(q));
  }
  if(entries.length===0){ el.innerHTML = `<div class="empty-state"><div class="big">🗂️</div>Aucune commande trouvée.</div>`; return; }
  el.innerHTML = entries.map(([id,o])=>`
    <div class="order-card">
      <div class="row"><strong>${o.title}</strong>
        <span class="status-pill status-${o.status==='paid'?'paid':o.status==='rejected'?'rejected':'pending'}">
          ${o.status==='paid'?'Validée':o.status==='rejected'?'Refusée':'En attente'}
        </span>
      </div>
      <p class="hint" style="margin:2px 0 8px;">${o.buyerName} • ${o.buyerPhone} • ${o.payMethod} • Réf: ${o.ref}${o.accessCode ? ` • Code client : <strong>${o.accessCode}</strong>` : ''}</p>
      ${o.type==='custom' ? `<p class="hint" style="margin:0 0 8px;white-space:pre-line;">📝 ${o.script}</p>` : ''}
      <div style="display:flex; gap:8px; flex-wrap:wrap;">
        ${o.status==='pending' ? `
          <button class="btn btn-teal" style="margin:0;width:auto;padding:8px 14px;" data-validate="${id}">✓ Valider</button>
          <button class="btn btn-danger" style="margin:0;width:auto;padding:8px 14px;" data-reject="${id}">✕ Refuser</button>` : ''}
        <a class="btn btn-ghost" style="margin:0;width:auto;padding:8px 14px;" href="${waLink(o.buyerPhone)}" target="_blank">💬 WhatsApp</a>
        <button class="btn btn-ghost" style="margin:0;width:auto;padding:8px 14px;" data-history="${id}">🧾 Historique client</button>
        <button class="btn btn-ghost" style="margin:0;width:auto;padding:8px 14px;" data-delete="${id}">🗑️</button>
      </div>
    </div>`).join('');
  el.querySelectorAll('[data-validate]').forEach(b=> b.onclick = ()=> validateOrder(b.dataset.validate));
  el.querySelectorAll('[data-reject]').forEach(b=> b.onclick = ()=> updateOrderStatus(b.dataset.reject,'rejected'));
  el.querySelectorAll('[data-history]').forEach(b=>{
    b.onclick = ()=>{
      const phone = ORDERS[b.dataset.history].buyerPhone;
      const clientOrders = Object.values(ORDERS).filter(o=>o.buyerPhone===phone);
      const totalSpent = clientOrders.filter(o=>o.status==='paid').reduce((s,o)=>s+(o.price||0),0);
      const lines = clientOrders.sort((a,b)=>b.createdAt-a.createdAt)
        .map(o=>`• ${new Date(o.createdAt).toLocaleDateString('fr-FR')} — ${o.title} (${o.status==='paid'?'validée':o.status==='rejected'?'refusée':'en attente'})`).join('\n');
      alert(`Client : ${phone}\n${clientOrders.length} commande(s) au total — ${fcfa(totalSpent)} dépensés\n\n${lines}`);
    };
  });
  el.querySelectorAll('[data-delete]').forEach(b=>{
    b.onclick = async ()=>{
      if(!confirm('Supprimer définitivement cette commande ?')) return;
      await DB.remove(`orders/${b.dataset.delete}`);
      renderAdminOrders();
      toast('Commande supprimée.', 'ok');
    };
  });
}
function updateAdminDot(){
  const dot = document.getElementById('adminDot');
  if(!dot) return;
  const pending = Object.values(ORDERS).filter(o=>o.status==='pending').length;
  dot.classList.toggle('show', pending > 0);
}
function exportOrdersCsv(){
  const rows = [['Date','Titre','Client','Téléphone','Moyen de paiement','Référence','Statut','Prix (FCFA)','Code client']];
  Object.values(ORDERS).sort((a,b)=>b.createdAt-a.createdAt).forEach(o=>{
    rows.push([
      new Date(o.createdAt).toLocaleString('fr-FR'), o.title, o.buyerName, o.buyerPhone,
      o.payMethod, o.ref, o.status, o.price, o.accessCode||''
    ]);
  });
  const csv = rows.map(r => r.map(v => `"${String(v??'').replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF'+csv], { type:'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `commandes-shaman-chooz-${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
}
async function validateOrder(id){
  const o = ORDERS[id];
  if(o.type === 'live-pass'){
    const days = o.passDays || 1;
    await DB.update(`orders/${id}`, { status:'paid', liveExpiresAt: Date.now() + days*24*3600*1000 });
    toast('Pass chaîne validé !', 'ok');
    renderAdminOrders();
    return;
  }
  if(o.type === 'custom' || o.type === 'ai'){ await updateOrderStatus(id, 'paid'); return; }
  const item = CATALOG[o.itemId];
  if(!item.videoUrl){
    const url = prompt(`Aucun lien vidéo n'est encore associé à "${item.title}".\nColle le lien de la vidéo (YouTube non-listé, Google Drive, Firebase Storage...) pour cette vidéo :`);
    if(url){ item.videoUrl = url.trim(); await DB.set('catalog', CATALOG); }
  }
  await updateOrderStatus(id, 'paid');
}
async function updateOrderStatus(id, status){
  await DB.update(`orders/${id}`, {status});
  toast(status==='paid' ? 'Commande validée !' : 'Commande refusée.', status==='paid'?'ok':'err');
  renderAdminOrders();
}

/* ---------- Admin : catalogue ---------- */
let ADMIN_CATALOG_SEARCH = '';
function renderAdminCatalog(){
  const el = document.getElementById('adminCatalogList');
  let entries = Object.entries(CATALOG);
  if(ADMIN_CATALOG_SEARCH){
    const q = ADMIN_CATALOG_SEARCH.toLowerCase();
    entries = entries.filter(([,v])=> v.title.toLowerCase().includes(q) || v.cat.toLowerCase().includes(q));
  }
  el.innerHTML = entries.map(([id,v])=>`
    <div class="order-card">
      <div class="row"><strong>${v.title}</strong><span class="hint" style="margin:0;">${fcfa(v.price)}</span></div>
      <p class="hint" style="margin:2px 0 8px;">${v.cat} • 👁️ ${v.views||0} vue${(v.views||0)>1?'s':''}${v.free ? ' • 🎁 Gratuite' : ''}</p>
      <input class="input" style="margin-bottom:8px;" placeholder="Lien de la vidéo (YouTube non-listé, Drive, etc.)" value="${v.videoUrl||''}" data-videourl="${id}">
      <div style="display:flex; gap:8px; flex-wrap:wrap;">
        <button class="btn btn-ghost" style="margin:0;width:auto;padding:8px 14px;" data-savevideo="${id}">💾 Enregistrer le lien</button>
        <button class="btn btn-ghost" style="margin:0;width:auto;padding:8px 14px;" data-editvideo="${id}">✏️ Modifier</button>
        <button class="btn btn-ghost" style="margin:0;width:auto;padding:8px 14px;" data-duplicatevideo="${id}">📋 Dupliquer</button>
        <button class="btn btn-ghost" style="margin:0;width:auto;padding:8px 14px;" data-togglefree="${id}">${v.free ? '🚫 Retirer des gratuites' : '🎁 Marquer gratuite'}</button>
        <button class="btn btn-ghost" style="margin:0;width:auto;padding:8px 14px;" data-deletevideo="${id}">🗑️ Supprimer</button>
      </div>
    </div>`).join('');
  el.querySelectorAll('[data-togglefree]').forEach(btn=>{
    btn.onclick = async ()=>{
      const id = btn.dataset.togglefree;
      CATALOG[id].free = !CATALOG[id].free;
      await DB.set('catalog', CATALOG);
      renderAdminCatalog(); renderFreeVideos();
      toast(CATALOG[id].free ? 'Vidéo marquée gratuite.' : 'Vidéo retirée des gratuites.', 'ok');
    };
  });
  el.querySelectorAll('[data-savevideo]').forEach(btn=>{
    btn.onclick = async ()=>{
      const id = btn.dataset.savevideo;
      const input = el.querySelector(`[data-videourl="${id}"]`);
      CATALOG[id].videoUrl = input.value.trim();
      await DB.set('catalog', CATALOG);
      toast('Lien enregistré.', 'ok');
    };
  });
  el.querySelectorAll('[data-editvideo]').forEach(btn=>{
    btn.onclick = async ()=>{
      const id = btn.dataset.editvideo;
      const v = CATALOG[id];
      const title = prompt('Titre :', v.title); if(title===null) return;
      const cat = prompt('Catégorie :', v.cat); if(cat===null) return;
      const price = parseInt(prompt('Prix en FCFA :', v.price)); if(isNaN(price)) return;
      CATALOG[id] = {...v, title, cat, price};
      await DB.set('catalog', CATALOG);
      renderAdminCatalog(); renderFilters(); renderCatalog(); renderFreeVideos();
      toast('Vidéo mise à jour.', 'ok');
    };
  });
  el.querySelectorAll('[data-duplicatevideo]').forEach(btn=>{
    btn.onclick = async ()=>{
      const src = CATALOG[btn.dataset.duplicatevideo];
      const id = 'v'+Date.now();
      CATALOG[id] = {...src, title: src.title + ' (copie)', createdAt: Date.now(), views:0};
      await DB.set('catalog', CATALOG);
      renderAdminCatalog(); renderFilters(); renderCatalog(); renderFreeVideos();
      toast('Vidéo dupliquée — modifie-la si besoin.', 'ok');
    };
  });
  el.querySelectorAll('[data-deletevideo]').forEach(btn=>{
    btn.onclick = async ()=>{
      if(!confirm('Supprimer définitivement cette vidéo du catalogue ?')) return;
      delete CATALOG[btn.dataset.deletevideo];
      await DB.set('catalog', CATALOG);
      renderAdminCatalog(); renderFilters(); renderCatalog(); renderFreeVideos();
      toast('Vidéo supprimée.', 'ok');
    };
  });
}
async function addNewVideo(){
  const title = prompt('Titre de la vidéo (lien externe déjà hébergé ailleurs) :'); if(!title) return;
  const cat = prompt('Catégorie :', 'Divers') || 'Divers';
  const price = parseInt(prompt('Prix en FCFA :', '1000')) || 1000;
  const free = confirm('Marquer cette vidéo comme gratuite (vitrine, pour attirer les visiteurs) ?');
  const id = 'v'+Date.now();
  CATALOG[id] = {title, cat, price, desc:'', emoji:'🎬', hue:Math.floor(Math.random()*360), videoUrl:'', createdAt: Date.now(), views:0, free};
  await DB.set('catalog', CATALOG);
  renderAdminCatalog(); renderFilters(); renderCatalog(); renderFreeVideos();
  toast('Vidéo ajoutée au catalogue.', 'ok');
}

/* ---------- Admin : créer une vidéo (3 styles) et la publier directement dans le catalogue ---------- */
let adminStyle = 'simple';
let adminSimpleGender = 'f';
let adminSimpleLanguage = 'fr';
let adminSimpleVisual = 'pop';
let adminRealisteDuration = 10;
let adminTemplateGender = 'f';
let adminTemplateVoiceOn = true;
let adminTemplateLanguage = 'fr';
let adminTemplateFormat = 'horizontal';
let adminTemplateDuration = 20;

function updateAdminPriceTag(){
  const tag = document.getElementById('adminNewPriceTag');
  if(!aiConfigured()){ tag.textContent = '—'; return; }
  if(adminStyle === 'simple'){
    const scenes = scenesFromScript(document.getElementById('adminSimpleScript').value);
    tag.textContent = fcfa(customPrice(scenes.length ? scenes : ['x']));
  } else if(adminStyle === 'realiste'){
    tag.textContent = fcfa(aiRealistePrice(adminRealisteDuration));
  } else {
    tag.textContent = fcfa(aiTemplatePrice(adminTemplateDuration));
  }
}

async function adminGenerateAndPublish(){
  const title = document.getElementById('adminNewTitle').value.trim();
  const cat = document.getElementById('adminNewCat').value.trim() || 'Divers';
  if(!title) return toast('Donne un titre à la vidéo.', 'err');
  if(!aiConfigured()) return toast("La génération vidéo IA n'est pas encore activée (voir README, étape 5).", 'err');

  const statusEl = document.getElementById('adminNewStatus');
  const btn = document.getElementById('adminGenerateBtn');
  btn.disabled = true;

  try{
    let movie, price;
    if(adminStyle === 'simple'){
      const script = document.getElementById('adminSimpleScript').value.trim();
      if(!script) throw new Error('Écris le texte de la vidéo.');
      const scenes = scenesFromScript(script);
      price = customPrice(scenes);
      movie = await buildSimpleMovie({ script, visualStyle: adminSimpleVisual, gender: adminSimpleGender, language: adminSimpleLanguage });
    } else if(adminStyle === 'realiste'){
      const prompt_ = document.getElementById('adminRealistePrompt').value.trim();
      if(!prompt_) throw new Error('Décris la vidéo à générer.');
      price = aiRealistePrice(adminRealisteDuration);
      const clipDurations = splitIntoClips(adminRealisteDuration);
      const total = clipDurations.length; let completed = 0;
      statusEl.textContent = `Génération des séquences… (0/${total})`;
      const generateClip = async (duration, index)=>{
        const { request_id } = await workerPost('/kling/submit', { prompt: prompt_, duration });
        let tries = 0;
        while(tries < 90){
          await new Promise(r=>setTimeout(r, 4000)); tries++;
          const data = await workerGet('/kling/status?id=' + encodeURIComponent(request_id));
          if(data.status === 'ERROR') throw new Error(data.message || `Erreur séquence ${index+1}`);
          if(data.status === 'COMPLETED' && data.videoUrl){ completed++; statusEl.textContent = `Génération des séquences… (${completed}/${total})`; return data.videoUrl; }
        }
        throw new Error('timeout séquence ' + (index+1));
      };
      const clipUrls = await Promise.all(clipDurations.map((d,i)=>generateClip(d,i)));
      statusEl.textContent = 'Assemblage final…';
      movie = buildRealisteMovie(clipUrls, clipDurations);
    } else {
      const script = document.getElementById('adminTemplateScript').value.trim();
      if(!script) throw new Error('Écris le texte de la vidéo.');
      const images = document.getElementById('adminTemplateImages').value.split('\n').map(s=>s.trim()).filter(Boolean);
      const musicUrl = document.getElementById('adminTemplateMusicUrl').value.trim();
      price = aiTemplatePrice(adminTemplateDuration);
      statusEl.textContent = 'Construction de la vidéo…';
      movie = await buildTemplateMovie({ templateScript: script, templateImages: images, templateVoice: adminTemplateVoiceOn ? 'avec' : 'aucune', templateMusicUrl: musicUrl, templateFormat: adminTemplateFormat, templateDuration: adminTemplateDuration, gender: adminTemplateGender, language: adminTemplateLanguage });
    }

    const videoUrl = await renderMovieAndWait(movie, (status)=>{ statusEl.textContent = `Assemblage en cours… (${status})`; });
    statusEl.textContent = 'Vidéo prête ! Ajout au catalogue…';

    const id = 'v'+Date.now();
    CATALOG[id] = { title, cat, price, desc:'', emoji:'🎬', hue:Math.floor(Math.random()*360), videoUrl, createdAt: Date.now(), views:0, free: document.getElementById('adminNewFree').checked };
    await DB.set('catalog', CATALOG);
    renderAdminCatalog(); renderFilters(); renderCatalog(); renderFreeVideos();
    statusEl.textContent = '';
    document.getElementById('adminNewTitle').value = '';
    document.getElementById('adminNewCat').value = '';
    document.getElementById('adminNewFree').checked = false;
    toast('Vidéo générée et ajoutée au catalogue ! Prix : ' + fcfa(price), 'ok');
  } catch(e){
    statusEl.textContent = "Erreur : " + (e.message || 'la génération a échoué.');
  } finally {
    btn.disabled = false;
  }
}

/* ---------- Navigation ---------- */
let CLIENT_REFRESH_TIMER = null;
let LIVE_STATUS_TIMER = null;
let LIVE_PASSES = {};       // pass gérés par l'admin : { id: {name, days, price} }
let LIVE_SETTINGS = {};     // réglages de la chaîne : { offlineMessage, currentProgram, maintenanceMode, announcement }
let SELECTED_LIVE_PASS_ID = null;
let LIVE_SESSION = null; // { phone, code, expiresAt } une fois l'accès vérifié

function renderLivePassSwatches(){
  const wrap = document.getElementById('livePassSwatches');
  if(!wrap) return;
  const passes = Object.entries(LIVE_PASSES).sort((a,b)=>a[1].price-b[1].price);
  if(passes.length===0){ wrap.innerHTML = `<p class="hint">Aucun pass disponible pour l'instant.</p>`; return; }
  if(!SELECTED_LIVE_PASS_ID || !LIVE_PASSES[SELECTED_LIVE_PASS_ID]) SELECTED_LIVE_PASS_ID = passes[0][0];
  wrap.innerHTML = passes.map(([id,p])=>`<button class="pay-option ${id===SELECTED_LIVE_PASS_ID?'selected':''}" data-pass="${id}">${p.name}</button>`).join('');
  wrap.querySelectorAll('.pay-option').forEach(btn=>{
    btn.onclick = ()=>{
      wrap.querySelectorAll('.pay-option').forEach(b=>b.classList.remove('selected'));
      btn.classList.add('selected');
      SELECTED_LIVE_PASS_ID = btn.dataset.pass;
      updateLivePriceTag();
    };
  });
  updateLivePriceTag();
}
function updateLivePriceTag(){
  const tag = document.getElementById('livePricetag');
  const p = LIVE_PASSES[SELECTED_LIVE_PASS_ID];
  if(tag) tag.textContent = p ? `${fcfa(p.price)} / ${p.name}` : '—';
}
function liveAccessGranted(){ return !!LIVE_SESSION && LIVE_SESSION.expiresAt > Date.now(); }

function openLivePassOrderSheet(){
  const p = LIVE_PASSES[SELECTED_LIVE_PASS_ID];
  if(!p) return toast('Aucun pass sélectionné.', 'err');
  const sheet = document.getElementById('productSheet');
  sheet.innerHTML = `
    <div class="sheet-handle"></div>
    <span class="reel-cat">Pass chaîne — ${p.name}</span>
    <h2>Accès à la chaîne en direct</h2>
    <p class="price-tag">${fcfa(p.price)}</p>
    <p class="sheet-desc">Ton accès sera activé dès que ton paiement sera vérifié — avec un code que tu pourras réutiliser (comme pour "Mes vidéos").</p>
    ${payMethodsBlock()}
    <p class="field-label">Tes informations</p>
    <input class="input" id="buyerName" placeholder="Ton nom">
    <input class="input" id="buyerPhone" placeholder="Numéro de téléphone / WhatsApp" inputmode="tel">
    <input class="input" id="buyerRef" placeholder="Référence de la transaction">
    <button class="btn btn-primary" id="submitLiveOrderBtn">Confirmer mon achat</button>
    <button class="btn btn-ghost" id="cancelSheetBtn">Annuler</button>
  `;
  let selectedPay = null;
  wirePayMethodButtons(sheet, (id)=>{ selectedPay = id; });
  document.getElementById('cancelSheetBtn').onclick = closeSheet;
  document.getElementById('submitLiveOrderBtn').onclick = async ()=>{
    const name = document.getElementById('buyerName').value.trim();
    const phone = document.getElementById('buyerPhone').value.trim();
    const ref = document.getElementById('buyerRef').value.trim();
    if(!selectedPay) return toast('Choisis un moyen de paiement', 'err');
    if(!name || !phone || !ref) return toast('Remplis tous les champs', 'err');
    const accessCode = await getOrCreateAccessCode(phone);
    await DB.push('orders', {
      type:'live-pass', passId: SELECTED_LIVE_PASS_ID, passName: p.name, passDays: p.days,
      title:`Pass chaîne (${p.name})`, price: p.price,
      payMethod: selectedPay, buyerName: name, buyerPhone: phone, ref, accessCode,
      status:'pending', createdAt: Date.now()
    });
    showAccessCodeConfirmation(accessCode);
  };
  document.getElementById('sheetOverlay').classList.add('open');
  sheet.classList.add('open');
}

async function liveLogin(){
  const phone = document.getElementById('livePhoneInput').value.trim();
  const code = document.getElementById('liveCodeInput').value.trim();
  const errEl = document.getElementById('liveLoginError');
  errEl.textContent = '';
  ORDERS = await DB.get('orders', {});
  const validPass = Object.values(ORDERS).find(o =>
    o.type==='live-pass' && o.buyerPhone===phone && o.accessCode===code && o.status==='paid' && o.liveExpiresAt > Date.now()
  );
  if(!validPass){
    errEl.textContent = "Aucun pass actif trouvé pour ce numéro et ce code. Vérifie les informations, ou achète un pass ci-dessous.";
    return;
  }
  LIVE_SESSION = { phone, code, expiresAt: validPass.liveExpiresAt };
  document.getElementById('liveAccessWrap').style.display = 'none';
  document.getElementById('livePlayerWrap').style.display = 'block';
  checkLiveStatus();
  clearInterval(LIVE_STATUS_TIMER);
  LIVE_STATUS_TIMER = setInterval(checkLiveStatus, 20000);
}

let hlsInstance = null;
async function checkLiveStatus(){
  const statusText = document.getElementById('liveStatusText');
  const indicator = document.getElementById('liveIndicator');
  const video = document.getElementById('livePlayer');
  if(LIVE_SETTINGS.maintenanceMode){
    if(statusText) statusText.textContent = "🛠️ " + (LIVE_SETTINGS.maintenanceMessage || "La chaîne est temporairement en maintenance. Reviens bientôt !");
    indicator.style.display = 'none';
    return;
  }
  if(!aiConfigured()){
    if(statusText) statusText.textContent = "La chaîne n'est pas encore configurée (voir README, étape 14).";
    return;
  }
  try{
    const data = await workerGet('/live/status');
    if(!data.configured){
      if(statusText) statusText.textContent = "La chaîne n'est pas encore configurée côté serveur relais.";
      return;
    }
    const programLine = LIVE_SETTINGS.currentProgram ? `📺 ${LIVE_SETTINGS.currentProgram}<br>` : '';
    if(data.live){
      indicator.style.display = 'inline-block';
      statusText.innerHTML = `${programLine}🔴 En direct — accès valable jusqu'au ${new Date(LIVE_SESSION.expiresAt).toLocaleDateString('fr-FR')}`;
      if(video.dataset.src !== data.hlsUrl){
        video.dataset.src = data.hlsUrl;
        if(window.Hls && Hls.isSupported()){
          if(hlsInstance) hlsInstance.destroy();
          hlsInstance = new Hls();
          hlsInstance.loadSource(data.hlsUrl);
          hlsInstance.attachMedia(video);
        } else if(video.canPlayType('application/vnd.apple.mpegurl')){
          video.src = data.hlsUrl;
        }
        video.play().catch(()=>{});
      }
    } else {
      indicator.style.display = 'none';
      const offMsg = LIVE_SETTINGS.offlineMessage || 'Hors antenne pour le moment — reviens plus tard !';
      statusText.innerHTML = `${programLine}⏸️ ${offMsg} (accès valable jusqu'au ${new Date(LIVE_SESSION.expiresAt).toLocaleDateString('fr-FR')})`;
      if(hlsInstance){ hlsInstance.destroy(); hlsInstance = null; }
      video.removeAttribute('src'); video.dataset.src = '';
    }
  } catch(e){
    if(statusText) statusText.textContent = "Impossible de vérifier l'état de la chaîne pour le moment.";
  }
}

let LAST_SEEN_ANNOUNCEMENT_TS = 0;
async function checkLiveAnnouncement(){
  try{
    LIVE_SETTINGS = await DB.get('liveSettings', LIVE_SETTINGS);
    const ann = LIVE_SETTINGS.announcement;
    if(ann && ann.ts > LAST_SEEN_ANNOUNCEMENT_TS){
      LAST_SEEN_ANNOUNCEMENT_TS = ann.ts;
      if('Notification' in window){
        if(Notification.permission === 'default') await Notification.requestPermission();
        if(Notification.permission === 'granted') new Notification('SHAMAN CHOOZ CHANEL', { body: ann.message });
      }
    }
  } catch(e){ /* pas grave */ }
}
async function renderClientReplays(){
  const wrap = document.getElementById('clientReplaysSection');
  if(!wrap) return;
  if(!aiConfigured()){ wrap.innerHTML=''; return; }
  try{
    const data = await workerGet('/live/replays');
    const publicIds = LIVE_SETTINGS.publicReplays || [];
    const publicReplays = (data.replays||[]).filter(r=>publicIds.includes(r.uid));
    if(publicReplays.length===0){ wrap.innerHTML=''; return; }
    wrap.innerHTML = `
      <p class="field-label">🎬 Replays disponibles (accès libre)</p>
      <div class="free-videos-row">
        ${publicReplays.map(r=>`
          <div class="reel-card free-video-card" data-replay="${r.hlsUrl}">
            <div class="reel-thumb"><img src="${r.thumbnail}" style="width:100%;height:100%;object-fit:cover;" loading="lazy"><div class="reel-play"><span>▶</span></div></div>
            <div class="reel-body"><p class="reel-title">${new Date(r.created).toLocaleDateString('fr-FR')}</p></div>
          </div>`).join('')}
      </div>
    `;
    wrap.querySelectorAll('[data-replay]').forEach(card=>{
      card.onclick = ()=>{
        const sheet = document.getElementById('productSheet');
        sheet.innerHTML = `<div class="sheet-handle"></div><h2>Replay</h2><video src="${card.dataset.replay}" controls autoplay style="width:100%;border-radius:12px;"></video><button class="btn btn-ghost" id="cancelSheetBtn" style="margin-top:10px;">Fermer</button>`;
        document.getElementById('cancelSheetBtn').onclick = closeSheet;
        document.getElementById('sheetOverlay').classList.add('open');
        sheet.classList.add('open');
      };
    });
  } catch(e){ wrap.innerHTML=''; }
}

function showScreen(name){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  if(name==='catalog'){ document.getElementById('screen-catalog').classList.add('active'); document.querySelector('[data-tab="catalog"]').classList.add('active'); }
  if(name==='client'){ document.getElementById('screen-client').classList.add('active'); document.querySelector('[data-tab="client"]').classList.add('active'); }
  if(name==='custom'){ document.getElementById('screen-custom').classList.add('active'); document.querySelector('[data-tab="custom"]').classList.add('active'); }
  if(name==='admin-login'){ document.getElementById('screen-admin-login').classList.add('active'); document.querySelector('[data-tab="admin"]').classList.add('active'); }
  if(name==='admin-dash'){ document.getElementById('screen-admin-dash').classList.add('active'); document.querySelector('[data-tab="admin"]').classList.add('active'); }
  if(name==='live'){ document.getElementById('screen-live').classList.add('active'); document.querySelector('[data-tab="live"]').classList.add('active'); }

  // Sur l'écran "Mes vidéos", on réactualise automatiquement toutes les 15s pour que le
  // client voie sans rien faire quand sa commande passe de "en attente" à "débloquée".
  clearInterval(CLIENT_REFRESH_TIMER);
  if(name==='client'){
    CLIENT_REFRESH_TIMER = setInterval(()=>{
      if(document.getElementById('clientPhoneInput').value.trim() && document.getElementById('clientCodeInput').value.trim()){
        lookupClientOrders();
      }
    }, 15000);
  }

  // Sur l'écran "Chaîne", on vérifie toutes les 20s si la diffusion est en direct ou non
  clearInterval(LIVE_STATUS_TIMER);
  if(name==='live'){
    renderLivePassSwatches();
    renderClientReplays();
    checkLiveAnnouncement();
    if(liveAccessGranted()) checkLiveStatus();
    LIVE_STATUS_TIMER = setInterval(()=>{
      checkLiveAnnouncement();
      if(liveAccessGranted()) checkLiveStatus();
    }, 20000);
  }
}

function bindEvents(){
  document.querySelectorAll('.tab').forEach(tab=>{
    tab.onclick = ()=>{
      const t = tab.dataset.tab;
      if(t==='admin') showScreen(ADMIN_LOGGED_IN ? 'admin-dash' : 'admin-login');
      else showScreen(t);
    };
  });
  document.getElementById('ordersShortcut').onclick = ()=> showScreen('client');

  document.getElementById('catalogSearchInput').addEventListener('input', e=>{
    SEARCH_QUERY = e.target.value.trim();
    renderCatalog();
  });

  // Bouton flottant "remonter en haut" : apparaît après un peu de défilement
  const backToTop = document.getElementById('backToTopBtn');
  window.addEventListener('scroll', ()=>{
    backToTop.classList.toggle('show', window.scrollY > 400);
  });
  backToTop.onclick = ()=> window.scrollTo({ top:0, behavior:'smooth' });

  document.getElementById('avatarBtn').onclick = ()=> document.getElementById('lightbox').classList.add('open');
  document.getElementById('closeLightbox').onclick = ()=> document.getElementById('lightbox').classList.remove('open');
  document.getElementById('sheetOverlay').onclick = closeSheet;

  document.getElementById('clientLookupBtn').onclick = lookupClientOrders;
  document.getElementById('changeCodeBtn').onclick = async ()=>{
    const phone = document.getElementById('clientPhoneInput').value.trim();
    const code = document.getElementById('clientCodeInput').value.trim();
    const newCode = await changeAccessCode(phone, code);
    if(!newCode) return toast('Erreur : reconnecte-toi avec ton code actuel avant de le changer.', 'err');
    document.getElementById('clientCodeInput').value = newCode;
    showAccessCodeConfirmation(newCode, 'change');
    lookupClientOrders();
  };

  document.getElementById('liveLoginBtn').onclick = liveLogin;
  document.getElementById('liveBuyBtn').onclick = openLivePassOrderSheet;

  document.getElementById('addPassBtn').onclick = addLivePass;
  document.getElementById('exportLiveCsvBtn').onclick = exportLiveCsv;
  document.getElementById('liveSubSearch').addEventListener('input', e=>{
    LIVE_SUB_SEARCH = e.target.value.trim();
    renderLiveSubscribers();
  });
  document.getElementById('saveLiveSettingsBtn').onclick = saveLiveSettings;
  document.getElementById('announceLiveBtn').onclick = announceLive;
  document.getElementById('loadReplaysBtn').onclick = loadAdminReplays;

  document.getElementById('goCustomBtn').onclick = ()=> showScreen('custom');
  loadCustomVoices();
  speechSynthesis.onvoiceschanged = loadCustomVoices;
  populateLanguageSelects();
  document.getElementById('customLanguageSelect').addEventListener('change', e=>{ customLanguage = e.target.value; });
  document.querySelectorAll('#customFinalVoiceSwatches .pay-option').forEach(btn=>{
    btn.onclick = ()=>{ document.querySelectorAll('#customFinalVoiceSwatches .pay-option').forEach(b=>b.classList.remove('selected')); btn.classList.add('selected'); customGender = btn.dataset.gender; };
  });
  document.querySelectorAll('#customStyleSwatches .pay-option').forEach(btn=>{
    btn.onclick = ()=>{ document.querySelectorAll('#customStyleSwatches .pay-option').forEach(b=>b.classList.remove('selected')); btn.classList.add('selected'); customVisualStyle = btn.dataset.style; };
  });
  document.getElementById('customScript').addEventListener('input', updateCustomPriceTag);
  updateCustomPriceTag();
  document.getElementById('customPreviewBtn').onclick = previewCustomVideo;
  document.getElementById('customOrderBtn').onclick = openCustomOrderSheet;

  document.querySelectorAll('[data-mode]').forEach(btn=>{
    btn.onclick = ()=>{
      document.querySelectorAll('[data-mode]').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.dataset.mode;
      document.getElementById('customMode-simple').style.display = mode==='simple' ? 'block' : 'none';
      document.getElementById('customMode-ai-realiste').style.display = mode==='ai-realiste' ? 'block' : 'none';
      document.getElementById('customMode-ai-template').style.display = mode==='ai-template' ? 'block' : 'none';
      if(mode==='ai-realiste') updateAiRealistePriceTag();
      if(mode==='ai-template') updateAiTemplatePriceTag();
    };
  });
  ['aiDurationRange','templateDurationRange'].forEach(id=>{
    const el = document.getElementById(id);
    el.min = AI_CONFIG.minDurationSec; el.max = AI_CONFIG.maxDurationSec; el.step = AI_CONFIG.stepDurationSec;
  });
  document.getElementById('aiDurationRange').addEventListener('input', (e)=>{
    aiRealisteDuration = parseInt(e.target.value);
    document.getElementById('aiDurationLabel').textContent = aiRealisteDuration;
    updateAiRealistePriceTag();
  });
  document.getElementById('aiRealisteOrderBtn').onclick = openAiRealisteOrderSheet;
  updateAiRealistePriceTag();

  document.getElementById('templateDurationRange').addEventListener('input', (e)=>{
    templateDuration = parseInt(e.target.value);
    document.getElementById('templateDurationLabel').textContent = templateDuration;
    updateAiTemplatePriceTag();
  });
  document.getElementById('templateLanguageSelect').addEventListener('change', e=>{ templateLanguage = e.target.value; });
  document.querySelectorAll('#templateVoiceSwatches .pay-option').forEach(btn=>{
    btn.onclick = ()=>{
      document.querySelectorAll('#templateVoiceSwatches .pay-option').forEach(b=>b.classList.remove('selected'));
      btn.classList.add('selected');
      if(btn.dataset.gender === 'aucune'){ templateVoiceOn = false; }
      else { templateVoiceOn = true; templateGender = btn.dataset.gender; }
    };
  });
  document.querySelectorAll('#templateFormatSwatches .pay-option').forEach(btn=>{
    btn.onclick = ()=>{
      document.querySelectorAll('#templateFormatSwatches .pay-option').forEach(b=>b.classList.remove('selected'));
      btn.classList.add('selected');
      templateFormat = btn.dataset.format;
    };
  });
  document.getElementById('aiTemplateOrderBtn').onclick = openAiTemplateOrderSheet;
  updateAiTemplatePriceTag();

  setupInstallBanner();
  setupShareTools();

  document.getElementById('adminLoginBtn').onclick = adminLogin;
  document.getElementById('eyeToggle').onclick = ()=>{
    const inp = document.getElementById('adminPwInput');
    inp.type = inp.type === 'password' ? 'text' : 'password';
    document.getElementById('eyeToggle').textContent = inp.type === 'password' ? '👁' : '🙈';
  };
  document.getElementById('adminPwInput').addEventListener('keydown', e=>{ if(e.key==='Enter') adminLogin(); });
  document.getElementById('adminLogoutBtn').onclick = ()=>{ ADMIN_LOGGED_IN = false; if(DB.ready) firebase.auth().signOut(); showScreen('catalog'); };

  document.querySelectorAll('[data-admintab]').forEach(btn=>{
    btn.onclick = ()=>{
      document.querySelectorAll('[data-admintab]').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      ['stats','orders','catalog','live','settings'].forEach(name=>{
        document.getElementById('adminTab-'+name).style.display = (name===btn.dataset.admintab) ? 'block' : 'none';
      });
      if(btn.dataset.admintab === 'stats') renderAdminStats();
      if(btn.dataset.admintab === 'live') renderAdminLiveTab();
    };
  });
  document.getElementById('addVideoBtn').onclick = addNewVideo;

  document.getElementById('adminOrderSearch').addEventListener('input', e=>{
    ORDER_SEARCH = e.target.value.trim();
    renderAdminOrders();
  });
  document.querySelectorAll('#orderStatusFilters .chip').forEach(btn=>{
    btn.onclick = ()=>{
      document.querySelectorAll('#orderStatusFilters .chip').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      ORDER_STATUS_FILTER = btn.dataset.orderstatus;
      renderAdminOrders();
    };
  });
  document.getElementById('exportCsvBtn').onclick = exportOrdersCsv;
  document.getElementById('adminCatalogSearch').addEventListener('input', e=>{
    ADMIN_CATALOG_SEARCH = e.target.value.trim();
    renderAdminCatalog();
  });
  document.querySelectorAll('#statsRangeFilters .chip').forEach(btn=>{
    btn.onclick = ()=>{
      document.querySelectorAll('#statsRangeFilters .chip').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      STATS_RANGE = btn.dataset.range;
      renderAdminStats();
    };
  });

  /* Câblage du constructeur de vidéo admin (3 styles → catalogue, prix auto) */
  document.querySelectorAll('[data-adminstyle]').forEach(btn=>{
    btn.onclick = ()=>{
      document.querySelectorAll('[data-adminstyle]').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      adminStyle = btn.dataset.adminstyle;
      ['simple','realiste','template'].forEach(s=>{
        document.getElementById('adminStyle-'+s).style.display = (s===adminStyle) ? 'block' : 'none';
      });
      updateAdminPriceTag();
    };
  });
  document.getElementById('adminSimpleScript').addEventListener('input', updateAdminPriceTag);
  document.getElementById('adminSimpleLanguageSelect').addEventListener('change', e=>{ adminSimpleLanguage = e.target.value; });
  document.querySelectorAll('#adminSimpleVoiceSwatches .pay-option').forEach(btn=>{
    btn.onclick = ()=>{ document.querySelectorAll('#adminSimpleVoiceSwatches .pay-option').forEach(b=>b.classList.remove('selected')); btn.classList.add('selected'); adminSimpleGender = btn.dataset.gender; };
  });
  document.querySelectorAll('#adminSimpleStyleSwatches .pay-option').forEach(btn=>{
    btn.onclick = ()=>{ document.querySelectorAll('#adminSimpleStyleSwatches .pay-option').forEach(b=>b.classList.remove('selected')); btn.classList.add('selected'); adminSimpleVisual = btn.dataset.style; };
  });
  document.getElementById('adminRealisteDurationRange').addEventListener('input', (e)=>{
    adminRealisteDuration = parseInt(e.target.value);
    document.getElementById('adminRealisteDurationLabel').textContent = adminRealisteDuration;
    updateAdminPriceTag();
  });
  document.getElementById('adminTemplateScript').addEventListener('input', updateAdminPriceTag);
  document.getElementById('adminTemplateLanguageSelect').addEventListener('change', e=>{ adminTemplateLanguage = e.target.value; });
  document.querySelectorAll('#adminTemplateVoiceSwatches .pay-option').forEach(btn=>{
    btn.onclick = ()=>{
      document.querySelectorAll('#adminTemplateVoiceSwatches .pay-option').forEach(b=>b.classList.remove('selected'));
      btn.classList.add('selected');
      if(btn.dataset.gender === 'aucune'){ adminTemplateVoiceOn = false; }
      else { adminTemplateVoiceOn = true; adminTemplateGender = btn.dataset.gender; }
    };
  });
  document.querySelectorAll('#adminTemplateFormatSwatches .pay-option').forEach(btn=>{
    btn.onclick = ()=>{ document.querySelectorAll('#adminTemplateFormatSwatches .pay-option').forEach(b=>b.classList.remove('selected')); btn.classList.add('selected'); adminTemplateFormat = btn.dataset.format; };
  });
  document.getElementById('adminTemplateDurationRange').addEventListener('input', (e)=>{
    adminTemplateDuration = parseInt(e.target.value);
    document.getElementById('adminTemplateDurationLabel').textContent = adminTemplateDuration;
    updateAdminPriceTag();
  });
  ['adminRealisteDurationRange','adminTemplateDurationRange'].forEach(id=>{
    const el = document.getElementById(id);
    el.min = AI_CONFIG.minDurationSec; el.max = AI_CONFIG.maxDurationSec; el.step = AI_CONFIG.stepDurationSec;
  });
  document.getElementById('adminGenerateBtn').onclick = adminGenerateAndPublish;
  updateAdminPriceTag();

  document.getElementById('changePwBtn').onclick = async ()=>{
    const val = document.getElementById('newPwInput').value.trim();
    if(val.length < 6) return toast('6 caractères minimum.', 'err');
    if(!DB.ready) return toast("Connecte Firebase pour pouvoir changer le mot de passe (voir firebase-config.js).", 'err');
    try{
      await firebase.auth().currentUser.updatePassword(val);
      document.getElementById('newPwInput').value='';
      toast('Mot de passe mis à jour.', 'ok');
    } catch(e){
      toast("Erreur : déconnecte-toi puis reconnecte-toi avant de changer le mot de passe.", 'err');
    }
  };
}

/* ---------- Détection automatique des mises à jour du site ----------
   Compare version.json au fil du temps : si l'admin a mis à jour ce fichier
   (à faire à chaque mise à jour du site, voir version.json), un bandeau propose
   au client de recharger la page pour recevoir la nouvelle version. */
let SITE_VERSION_SEEN = null;
async function checkForUpdates(){
  try{
    const res = await fetch('version.json?t=' + Date.now(), { cache:'no-store' });
    const data = await res.json();
    if(SITE_VERSION_SEEN === null){ SITE_VERSION_SEEN = data.v; return; }
    if(data.v !== SITE_VERSION_SEEN) showUpdateBanner();
  } catch(e){ /* pas grave, on réessaiera au prochain cycle */ }
}
function showUpdateBanner(){
  if(document.getElementById('updateBanner')) return;
  const b = document.createElement('div');
  b.id = 'updateBanner';
  b.className = 'update-banner';
  b.innerHTML = `✨ Une nouvelle version du site est disponible. <button id="updateReloadBtn">Actualiser</button>`;
  document.body.appendChild(b);
  document.getElementById('updateReloadBtn').onclick = ()=> location.reload();
}
function startUpdateChecks(){
  checkForUpdates(); // fixe la version de référence au chargement
  setInterval(checkForUpdates, 5 * 60 * 1000); // revérifie toutes les 5 minutes
  document.addEventListener('visibilitychange', ()=>{ if(!document.hidden) checkForUpdates(); });
}

function registerSW(){
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  }
}

/* ---------- Installation PWA (tous navigateurs) ---------- */
let deferredInstallPrompt = null;
function setupInstallBanner(){
  const banner = document.getElementById('installBanner');
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  if(isStandalone) return;
  if(localStorage.getItem('scc_install_dismissed')==='1') return;

  window.addEventListener('beforeinstallprompt', (e)=>{
    e.preventDefault();
    deferredInstallPrompt = e;
    banner.classList.add('show');
  });
  const isIOS = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
  if(isIOS){
    banner.querySelector('span').textContent = "📲 Installe ce site : appuie sur Partager, puis \"Sur l'écran d'accueil\"";
    document.getElementById('installBtn').style.display = 'none';
    banner.classList.add('show');
  }
  document.getElementById('installBtn').onclick = async ()=>{
    if(deferredInstallPrompt){ deferredInstallPrompt.prompt(); await deferredInstallPrompt.userChoice; deferredInstallPrompt = null; }
    banner.classList.remove('show');
  };
  document.getElementById('installDismiss').onclick = ()=>{
    banner.classList.remove('show');
    localStorage.setItem('scc_install_dismissed','1');
  };
}

/* ---------- QR code + lien de partage (espace admin) ---------- */
function setupShareTools(){
  const url = window.location.href.split('#')[0];
  document.getElementById('shareLinkInput').value = url;
  document.getElementById('copyLinkBtn').onclick = async ()=>{
    await navigator.clipboard.writeText(url);
    toast('Lien copié !', 'ok');
  };
  document.getElementById('shareLinkBtn').onclick = async ()=>{
    if(navigator.share){
      try{ await navigator.share({ title:'SHAMAN CHOOZ CHANEL', text:'Découvre mes vidéos dessins animés !', url }); }
      catch(e){}
    } else {
      await navigator.clipboard.writeText(url);
      toast('Lien copié — colle-le sur tes réseaux sociaux.', 'ok');
    }
  };
  document.querySelectorAll('[data-admintab]').forEach(btn=>{
    if(btn.dataset.admintab==='settings'){
      btn.addEventListener('click', ()=>{
        const box = document.getElementById('qrCodeBox');
        if(box && !box.hasChildNodes() && window.QRCode){
          new QRCode(box, { text:url, width:180, height:180 });
        }
      });
    }
  });
}

init();

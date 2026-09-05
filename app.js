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
  }
};

/* ---------- Utilitaires ---------- */
function toast(msg, type=''){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show ' + type;
  setTimeout(()=> t.className = 'toast ' + type, 2600);
}
async function sha256(text){
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
}
function fcfa(n){ return n.toLocaleString('fr-FR') + ' FCFA'; }
function esc(str){
  return String(str==null?'':str).replace(/[&<>"']/g, (c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
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
    <input class="input" id="buyerPin" placeholder="Code secret à 4 chiffres (à retenir !)" inputmode="numeric" maxlength="4">
    <p class="hint">Ce code te sera redemandé avec ton numéro pour retrouver ta vidéo — personne d'autre ne pourra y accéder sans lui.</p>
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
    const pin = document.getElementById('buyerPin').value.trim();
    if(!selectedPay) return toast('Choisis un moyen de paiement', 'err');
    if(!name || !phone || !ref) return toast('Remplis tous les champs', 'err');
    if(!/^\d{4}$/.test(pin)) return toast('Le code secret doit être 4 chiffres', 'err');
    await DB.push('orders', {
      type:'custom', title: `Vidéo sur mesure (${scenes.length} scènes)`, price,
      script: document.getElementById('customScript').value,
      visualStyle: customVisualStyle, gender: customGender, language: customLanguage,
      payMethod: selectedPay, buyerName: name, buyerPhone: phone, ref,
      pinHash: await sha256(pin),
      status:'pending', createdAt: Date.now()
    });
    closeSheet();
    toast('Commande envoyée ! Ta vidéo se génèrera automatiquement après validation.', 'ok');
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
    <input class="input" id="buyerPin" placeholder="Code secret à 4 chiffres (à retenir !)" inputmode="numeric" maxlength="4">
    <p class="hint">Ce code te sera redemandé avec ton numéro pour retrouver ta vidéo — personne d'autre ne pourra y accéder sans lui.</p>
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
    const pin = document.getElementById('buyerPin').value.trim();
    if(!selectedPay) return toast('Choisis un moyen de paiement', 'err');
    if(!name || !phone || !ref) return toast('Remplis tous les champs', 'err');
    if(!/^\d{4}$/.test(pin)) return toast('Le code secret doit être 4 chiffres', 'err');
    await DB.push('orders', {
      ...order, payMethod: selectedPay, buyerName: name, buyerPhone: phone, ref,
      pinHash: await sha256(pin),
      status:'pending', createdAt: Date.now()
    });
    closeSheet();
    toast('Commande envoyée ! Génération automatique après validation.', 'ok');
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

  firebase.auth().onAuthStateChanged(user => { ADMIN_LOGGED_IN = !!user; });

  renderFilters();
  renderCatalog();
  bindEvents();
  registerSW();
}

/* ---------- Rendu catalogue ---------- */
function renderFilters(){
  const cats = ['Toutes', ...new Set(Object.values(CATALOG).map(v=>v.cat))];
  const el = document.getElementById('filters');
  el.innerHTML = cats.map(c=>`<button class="chip ${c===SELECTED_CATEGORY?'active':''}" data-cat="${c}">${c}</button>`).join('');
  el.querySelectorAll('.chip').forEach(btn=>{
    btn.onclick = ()=>{ SELECTED_CATEGORY = btn.dataset.cat; renderFilters(); renderCatalog(); };
  });
}
function renderCatalog(){
  const grid = document.getElementById('catalogGrid');
  const entries = Object.entries(CATALOG).filter(([,v])=> SELECTED_CATEGORY==='Toutes' || v.cat===SELECTED_CATEGORY);
  if(entries.length===0){ grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><div class="big">🎬</div>Aucune vidéo dans cette catégorie pour l'instant.</div>`; return; }
  grid.innerHTML = entries.map(([id,v],i)=>`
    <div class="reel-card" data-id="${id}">
      <div class="reel-thumb">
        ${placeholderThumb(v.hue, v.emoji)}
        <span class="reel-ep">Ép. ${String(i+1).padStart(2,'0')}</span>
        <div class="reel-play"><span>▶</span></div>
      </div>
      <div class="reel-body">
        <span class="reel-cat">${v.cat}</span>
        <p class="reel-title">${v.title}</p>
        <p class="reel-price">${fcfa(v.price)} <small>/ vidéo</small></p>
      </div>
    </div>`).join('');
  grid.querySelectorAll('.reel-card').forEach(card=>{
    card.onclick = ()=> openProductSheet(card.dataset.id);
  });
}

/* ---------- Fiche produit + commande ---------- */
function openProductSheet(id){
  SELECTED_ITEM = id; SELECTED_PAY = null;
  const v = CATALOG[id];
  const sheet = document.getElementById('productSheet');
  sheet.innerHTML = `
    <div class="sheet-handle"></div>
    <span class="reel-cat">${v.cat}</span>
    <h2>${v.title}</h2>
    <p class="price-tag">${fcfa(v.price)}</p>
    <p class="sheet-desc">${v.desc}</p>

    ${payMethodsBlock()}

    <p class="field-label">Tes informations</p>
    <input class="input" id="buyerName" placeholder="Ton nom">
    <input class="input" id="buyerPhone" placeholder="Numéro de téléphone / WhatsApp" inputmode="tel">
    <input class="input" id="buyerRef" placeholder="Référence de la transaction">
    <input class="input" id="buyerPin" placeholder="Code secret à 4 chiffres (à retenir !)" inputmode="numeric" maxlength="4">
    <p class="hint">Ce code te sera redemandé avec ton numéro pour retrouver tes vidéos — choisis-en un que tu n'oublieras pas, personne d'autre ne pourra voir tes vidéos sans lui.</p>
    <p class="hint">Colle la référence reçue après ton paiement mobile money. Ta vidéo sera débloquée après vérification (généralement rapide).</p>

    <button class="btn btn-primary" id="submitOrderBtn">Confirmer ma commande</button>
    <button class="btn btn-ghost" id="cancelSheetBtn">Annuler</button>
  `;
  wirePayMethodButtons(sheet, (id)=>{ SELECTED_PAY = id; });
  document.getElementById('cancelSheetBtn').onclick = closeSheet;
  document.getElementById('submitOrderBtn').onclick = submitOrder;
  document.getElementById('sheetOverlay').classList.add('open');
  sheet.classList.add('open');
}
function closeSheet(){
  document.getElementById('sheetOverlay').classList.remove('open');
  document.getElementById('productSheet').classList.remove('open');
}
async function submitOrder(){
  const name = document.getElementById('buyerName').value.trim();
  const phone = document.getElementById('buyerPhone').value.trim();
  const ref = document.getElementById('buyerRef').value.trim();
  const pin = document.getElementById('buyerPin').value.trim();
  if(!SELECTED_PAY) return toast('Choisis un moyen de paiement', 'err');
  if(!name || !phone || !ref) return toast('Remplis tous les champs', 'err');
  if(!/^\d{4}$/.test(pin)) return toast('Le code secret doit être 4 chiffres', 'err');

  const v = CATALOG[SELECTED_ITEM];
  await DB.push('orders', {
    itemId: SELECTED_ITEM, title: v.title, price: v.price,
    payMethod: SELECTED_PAY, buyerName: name, buyerPhone: phone, ref,
    pinHash: await sha256(pin),
    status: 'pending', createdAt: Date.now()
  });
  closeSheet();
  toast('Commande envoyée ! Tu seras débloqué après vérification.', 'ok');
}

/* ---------- Espace client : mes vidéos ---------- */
let clientOrdersListener = null;
let clientKnownStatuses = {};

async function lookupClientOrders(){
  const phone = document.getElementById('clientPhoneInput').value.trim();
  const pin = document.getElementById('clientPinInput').value.trim();
  const list = document.getElementById('clientOrdersList');
  if(clientOrdersListener){ firebase.database().ref('orders').off('value', clientOrdersListener); clientOrdersListener = null; }
  if(!phone || !pin){ list.innerHTML=''; return; }
  if(!/^\d{4}$/.test(pin)){ list.innerHTML = `<div class="empty-state"><div class="big">🔒</div>Le code secret doit être à 4 chiffres.</div>`; return; }
  ORDERS = await DB.get('orders', {});
  const pinHash = await sha256(pin);
  const mine = Object.entries(ORDERS).filter(([,o])=> o.buyerPhone === phone && (!o.pinHash || o.pinHash === pinHash));
  const wrongPin = Object.entries(ORDERS).some(([,o])=> o.buyerPhone === phone && o.pinHash && o.pinHash !== pinHash);
  if(mine.length===0 && wrongPin){ list.innerHTML = `<div class="empty-state"><div class="big">🔒</div>Numéro trouvé, mais code secret incorrect.</div>`; return; }
  if(mine.length===0){ list.innerHTML = `<div class="empty-state"><div class="big">📭</div>Aucune commande trouvée pour ce numéro.</div>`; return; }
  mine.forEach(([id,o])=>{ clientKnownStatuses[id] = o.status; });
  renderClientOrdersList(mine);

  // Suivi en direct : dès qu'une commande passe à "payée", le client est prévenu
  // automatiquement (toast + notification si autorisée), sans avoir à rafraîchir.
  if(DB.ready){
    if(window.Notification && Notification.permission === 'default') Notification.requestPermission();
    clientOrdersListener = (snap)=>{
      ORDERS = snap.val() || {};
      const mine2 = Object.entries(ORDERS).filter(([,o])=> o.buyerPhone === phone && (!o.pinHash || o.pinHash === pinHash));
      mine2.forEach(([id,o])=>{
        if(clientKnownStatuses[id] && clientKnownStatuses[id] !== 'paid' && o.status === 'paid'){
          toast(`🎉 Ta commande "${o.title}" est prête !`, 'ok');
          if(window.Notification && Notification.permission === 'granted'){
            new Notification('SHAMAN CHOOZ CHANEL', { body: `Ta commande "${o.title}" est prête !`, icon: 'icon-192.png' });
          }
        }
        clientKnownStatuses[id] = o.status;
      });
      renderClientOrdersList(mine2);
    };
    firebase.database().ref('orders').on('value', clientOrdersListener);
  }
}

function renderClientOrdersList(mine){
  const list = document.getElementById('clientOrdersList');
  list.innerHTML = mine.sort((a,b)=>b[1].createdAt-a[1].createdAt).map(([id,o])=>`
    <div class="order-card">
      <div class="row"><strong>${esc(o.title)}</strong>
        <span class="status-pill status-${o.status==='paid'?'paid':o.status==='rejected'?'rejected':'pending'}">
          ${o.status==='paid'?'Débloquée':o.status==='rejected'?'Refusée':'En attente'}
        </span>
      </div>
      <div class="row" style="margin-bottom:0;">
        <span class="hint" style="margin:0;">${fcfa(o.price)} • ${esc(o.payMethod)}</span>
        ${o.status==='paid' && o.type!=='custom' && CATALOG[o.itemId] && CATALOG[o.itemId].videoUrl
          ? `<a class="btn btn-teal" style="width:auto;margin:0;padding:8px 14px;font-size:12.5px;" target="_blank" href="${esc(CATALOG[o.itemId].videoUrl)}">▶ Regarder</a>`
          : ''}
        ${o.status==='paid' && (o.type==='custom'||o.type==='ai') && !o.videoUrl
          ? `<button class="btn btn-teal" style="width:auto;margin:0;padding:8px 14px;font-size:12.5px;" data-generate="${id}">🎬 Générer ma vidéo</button>`
          : ''}
        ${o.status==='paid' && (o.type==='custom'||o.type==='ai') && o.videoUrl
          ? `<a class="btn btn-teal" style="width:auto;margin:0;padding:8px 14px;font-size:12.5px;" target="_blank" href="${esc(o.videoUrl)}">▶ Regarder</a>`
          : ''}
      </div>
    </div>`).join('') + `
    <button class="btn btn-ghost" id="changePinBtn" style="margin-top:14px;">🔑 Changer mon code secret</button>`;
  document.getElementById('changePinBtn').onclick = changeClientPin;
  list.querySelectorAll('[data-generate]').forEach(btn=>{
    btn.onclick = ()=>{
      const id = btn.dataset.generate;
      const order = {...ORDERS[id], __id:id};
      if(order.type === 'custom') runSimpleGeneration(order);
      else runAiGeneration(order);
    };
  });
}
async function changeClientPin(){
  const phone = document.getElementById('clientPhoneInput').value.trim();
  const oldPin = document.getElementById('clientPinInput').value.trim();
  ORDERS = await DB.get('orders', {});
  const oldHash = await sha256(oldPin);
  const ids = Object.entries(ORDERS).filter(([,o])=> o.buyerPhone===phone && (!o.pinHash || o.pinHash===oldHash)).map(([id])=>id);
  if(ids.length===0) return toast('Numéro ou code incorrect', 'err');
  const newPin = (prompt('Choisis ton nouveau code secret à 4 chiffres :') || '').trim();
  if(!newPin) return;
  if(!/^\d{4}$/.test(newPin)) return toast('Le code doit être 4 chiffres', 'err');
  const newHash = await sha256(newPin);
  await Promise.all(ids.map(id => DB.update(`orders/${id}`, { pinHash: newHash })));
  document.getElementById('clientPinInput').value = newPin;
  toast('Ton code secret a été changé !', 'ok');
  lookupClientOrders();
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

/* ---------- Admin : connexion ---------- */
async function adminLogin(){
  const email = document.getElementById('adminEmailInput').value.trim();
  const pw = document.getElementById('adminPwInput').value;
  const errEl = document.getElementById('adminLoginError');
  if(!email || !pw){ errEl.textContent = 'Entre ton email et ton mot de passe.'; return; }
  try{
    await firebase.auth().signInWithEmailAndPassword(email, pw);
    ADMIN_LOGGED_IN = true;
    errEl.textContent = '';
    document.getElementById('adminPwInput').value = '';
    showScreen('admin-dash');
    renderAdminOrders();
    renderAdminCatalog();
  } catch(e){
    if(e.code === 'auth/invalid-credential' || e.code === 'auth/wrong-password' || e.code === 'auth/user-not-found'){
      errEl.textContent = 'Email ou mot de passe incorrect.';
    } else if(e.code === 'auth/too-many-requests'){
      errEl.textContent = 'Trop de tentatives, réessaie dans un instant.';
    } else {
      errEl.textContent = "Connexion impossible. Vérifie que le compte admin est bien créé dans Firebase (Authentication > Utilisateurs).";
    }
  }
}
async function renderAdminOrders(){
  ORDERS = await DB.get('orders', {});
  const el = document.getElementById('adminOrdersList');
  const entries = Object.entries(ORDERS).sort((a,b)=>b[1].createdAt-a[1].createdAt);
  if(entries.length===0){ el.innerHTML = `<div class="empty-state"><div class="big">🗂️</div>Aucune commande pour l'instant.</div>`; return; }
  el.innerHTML = entries.map(([id,o])=>`
    <div class="order-card">
      <div class="row"><strong>${o.title}</strong>
        <span class="status-pill status-${o.status==='paid'?'paid':o.status==='rejected'?'rejected':'pending'}">
          ${o.status==='paid'?'Validée':o.status==='rejected'?'Refusée':'En attente'}
        </span>
      </div>
      <p class="hint" style="margin:2px 0 8px;">${esc(o.buyerName)} • ${esc(o.buyerPhone)} • ${esc(o.payMethod)} • Réf: ${esc(o.ref)}</p>
      ${o.type==='custom' ? `<p class="hint" style="margin:0 0 8px;white-space:pre-line;">📝 ${esc(o.script)}</p>` : ''}
      ${o.status==='pending' ? `
        <div style="display:flex; gap:8px;">
          <button class="btn btn-teal" style="margin:0;" data-validate="${id}">✓ Valider</button>
          <button class="btn btn-danger" style="margin:0;" data-reject="${id}">✕ Refuser</button>
        </div>` : ''}
      <div style="display:flex; gap:8px; margin-top:8px;">
        <button class="btn btn-ghost" style="margin:0;padding:8px 14px;font-size:12.5px;" data-resetpin="${esc(o.buyerPhone)}">🔑 Réinitialiser son code secret</button>
      </div>
    </div>`).join('');
  el.querySelectorAll('[data-validate]').forEach(b=> b.onclick = ()=> validateOrder(b.dataset.validate));
  el.querySelectorAll('[data-reject]').forEach(b=> b.onclick = ()=> updateOrderStatus(b.dataset.reject,'rejected'));
  el.querySelectorAll('[data-resetpin]').forEach(b=> b.onclick = ()=> adminResetPin(b.dataset.resetpin));
}
async function adminResetPin(phone){
  if(!confirm(`Réinitialiser le code secret de ${phone} ?\nLe client pourra en choisir un nouveau à sa prochaine visite (sans avoir besoin de l'ancien).`)) return;
  ORDERS = await DB.get('orders', {});
  const ids = Object.entries(ORDERS).filter(([,o])=> o.buyerPhone===phone).map(([id])=>id);
  await Promise.all(ids.map(id => DB.update(`orders/${id}`, { pinHash: null })));
  toast('Code secret réinitialisé.', 'ok');
  renderAdminOrders();
}
async function validateOrder(id){
  const o = ORDERS[id];
  if(o.type === 'custom'){ await updateOrderStatus(id, 'paid'); return; }
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

/* ---------- Admin : statistiques ---------- */
async function renderAdminStats(){
  ORDERS = await DB.get('orders', {});
  const el = document.getElementById('adminStatsContent');
  const all = Object.values(ORDERS);
  const paid = all.filter(o=>o.status==='paid');
  const pending = all.filter(o=>o.status==='pending' || !o.status);
  const rejected = all.filter(o=>o.status==='rejected');
  const revenue = paid.reduce((sum,o)=> sum + (o.price||0), 0);

  const counts = {};
  paid.forEach(o=>{ const key = o.title || 'Vidéo sur mesure'; counts[key] = (counts[key]||0) + 1; });
  const top = Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,5);

  el.innerHTML = `
    <div class="order-card">
      <div class="row"><strong>💰 Chiffre d'affaires (validé)</strong><span class="hint" style="margin:0;">${fcfa(revenue)}</span></div>
    </div>
    <div class="order-card">
      <div class="row"><strong>✓ Commandes validées</strong><span class="hint" style="margin:0;">${paid.length}</span></div>
      <div class="row"><strong>⏳ En attente</strong><span class="hint" style="margin:0;">${pending.length}</span></div>
      <div class="row" style="margin-bottom:0;"><strong>✕ Refusées</strong><span class="hint" style="margin:0;">${rejected.length}</span></div>
    </div>
    ${top.length ? `<div class="order-card">
      <p class="field-label" style="margin-top:0;">🏆 Les plus vendues</p>
      ${top.map(([title,n],i)=>`<div class="row" style="margin-bottom:${i===top.length-1?'0':'6px'};"><span>${esc(title)}</span><span class="hint" style="margin:0;">${n} vente${n>1?'s':''}</span></div>`).join('')}
    </div>` : ''}
  `;
}

/* ---------- Admin : catalogue ---------- */
function renderAdminCatalog(){
  const el = document.getElementById('adminCatalogList');
  el.innerHTML = Object.entries(CATALOG).map(([id,v])=>`
    <div class="order-card">
      <div class="row"><strong>${v.title}</strong><span class="hint" style="margin:0;">${fcfa(v.price)}</span></div>
      <p class="hint" style="margin:2px 0 8px;">${v.cat}</p>
      <input class="input" style="margin-bottom:8px;" placeholder="Lien de la vidéo (YouTube non-listé, Drive, etc.)" value="${v.videoUrl||''}" data-videourl="${id}">
      <button class="btn btn-ghost" style="margin:0;" data-savevideo="${id}">Enregistrer le lien</button>
    </div>`).join('');
  el.querySelectorAll('[data-savevideo]').forEach(btn=>{
    btn.onclick = async ()=>{
      const id = btn.dataset.savevideo;
      const input = el.querySelector(`[data-videourl="${id}"]`);
      CATALOG[id].videoUrl = input.value.trim();
      await DB.set('catalog', CATALOG);
      toast('Lien enregistré.', 'ok');
    };
  });
}
async function addNewVideo(){
  const title = prompt('Titre de la vidéo (lien externe déjà hébergé ailleurs) :'); if(!title) return;
  const cat = prompt('Catégorie :', 'Divers') || 'Divers';
  const price = parseInt(prompt('Prix en FCFA :', '1000')) || 1000;
  const id = 'v'+Date.now();
  CATALOG[id] = {title, cat, price, desc:'', emoji:'🎬', hue:Math.floor(Math.random()*360), videoUrl:''};
  await DB.set('catalog', CATALOG);
  renderAdminCatalog(); renderFilters(); renderCatalog();
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
    CATALOG[id] = { title, cat, price, desc:'', emoji:'🎬', hue:Math.floor(Math.random()*360), videoUrl };
    await DB.set('catalog', CATALOG);
    renderAdminCatalog(); renderFilters(); renderCatalog();
    statusEl.textContent = '';
    document.getElementById('adminNewTitle').value = '';
    document.getElementById('adminNewCat').value = '';
    toast('Vidéo générée et ajoutée au catalogue ! Prix : ' + fcfa(price), 'ok');
  } catch(e){
    statusEl.textContent = "Erreur : " + (e.message || 'la génération a échoué.');
  } finally {
    btn.disabled = false;
  }
}

/* ---------- Navigation ---------- */
function showScreen(name){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  if(name==='catalog'){ document.getElementById('screen-catalog').classList.add('active'); document.querySelector('[data-tab="catalog"]').classList.add('active'); }
  if(name==='client'){ document.getElementById('screen-client').classList.add('active'); document.querySelector('[data-tab="client"]').classList.add('active'); }
  if(name==='custom'){ document.getElementById('screen-custom').classList.add('active'); document.querySelector('[data-tab="custom"]').classList.add('active'); }
  if(name==='admin-login'){ document.getElementById('screen-admin-login').classList.add('active'); document.querySelector('[data-tab="admin"]').classList.add('active'); }
  if(name==='admin-dash'){ document.getElementById('screen-admin-dash').classList.add('active'); document.querySelector('[data-tab="admin"]').classList.add('active'); }
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

  document.getElementById('avatarBtn').onclick = ()=> document.getElementById('lightbox').classList.add('open');
  document.getElementById('closeLightbox').onclick = ()=> document.getElementById('lightbox').classList.remove('open');
  document.getElementById('sheetOverlay').onclick = closeSheet;

  document.getElementById('clientLookupBtn').onclick = lookupClientOrders;

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
  document.getElementById('adminEmailInput').addEventListener('keydown', e=>{ if(e.key==='Enter') adminLogin(); });
  document.getElementById('adminPwInput').addEventListener('keydown', e=>{ if(e.key==='Enter') adminLogin(); });
  document.getElementById('adminLogoutBtn').onclick = async ()=>{
    await firebase.auth().signOut();
    ADMIN_LOGGED_IN = false;
    showScreen('catalog');
  };

  document.querySelectorAll('[data-admintab]').forEach(btn=>{
    btn.onclick = ()=>{
      document.querySelectorAll('[data-admintab]').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      ['orders','catalog','stats','settings'].forEach(name=>{
        document.getElementById('adminTab-'+name).style.display = (name===btn.dataset.admintab) ? 'block' : 'none';
      });
      if(btn.dataset.admintab==='stats') renderAdminStats();
      if(btn.dataset.admintab==='settings'){
        const user = firebase.auth().currentUser;
        document.getElementById('adminAccountEmail').textContent = user ? `Connecté en tant que ${user.email}` : '';
      }
    };
  });
  document.getElementById('addVideoBtn').onclick = addNewVideo;

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

  document.getElementById('sendPwResetBtn').onclick = async ()=>{
    const user = firebase.auth().currentUser;
    if(!user || !user.email) return toast("Impossible de trouver l'email du compte.", 'err');
    try{
      await firebase.auth().sendPasswordResetEmail(user.email);
      toast('Email envoyé à ' + user.email, 'ok');
    } catch(e){
      toast("Erreur lors de l'envoi de l'email.", 'err');
    }
  };
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

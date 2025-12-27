/* ==========================================================
   Pour Passport — flawless GitHub Pages build
   - Filters: Park / Area / Type / Search / Signature-only
   - Per drink: tried, fav, rating, note
   - Photo upload per drink: IndexedDB (local-only)
   - Export/Import: progress + drink list
   - Add Drink modal
   ========================================================== */

"use strict";

/* ---------- Constants ---------- */
const PROGRESS_KEY = "pp_progress_v1";
const DRINKS_KEY    = "pp_drinks_v1";

/* ---------- Default Drink List (signature-first) ---------- */
/* You can IMPORT a bigger list anytime without rewriting code. */
const DEFAULT_DRINKS = [
  // ======================
  // EPCOT — MEXICO
  // ======================
  { id:"ep-mex-avocado", park:"EPCOT", area:"Mexico", name:"Avocado Margarita", location:"La Cava del Tequila", type:"Cocktail", tags:["signature","must-try","creamy"], signature:true },
  { id:"ep-mex-cucumber", park:"EPCOT", area:"Mexico", name:"Cucumber Margarita", location:"La Cava del Tequila", type:"Cocktail", tags:["signature","refreshing"], signature:true },
  { id:"ep-mex-mangofire", park:"EPCOT", area:"Mexico", name:"Mango Fire Margarita", location:"La Cava del Tequila", type:"Cocktail", tags:["signature","spicy"], signature:true },
  { id:"ep-mex-tequilaflight", park:"EPCOT", area:"Mexico", name:"Tequila Flight", location:"La Cava del Tequila", type:"Wine/Spirits", tags:["signature","tasting"], signature:true },
  { id:"ep-mex-frozenclassic", park:"EPCOT", area:"Mexico", name:"Classic Frozen Margarita", location:"Mexico Margarita Bar", type:"Frozen", tags:["signature","iconic"], signature:true },

  // ======================
  // EPCOT — NORWAY
  // ======================
  { id:"ep-nor-vikingcoffee", park:"EPCOT", area:"Norway", name:"Frozen Viking Coffee", location:"Kringla Bakeri og Kafe", type:"Cocktail", tags:["signature","iconic","coffee"], signature:true },
  { id:"ep-nor-aquavit", park:"EPCOT", area:"Norway", name:"Aquavit Cocktail", location:"Norway Pavilion", type:"Cocktail", tags:["signature","unique"], signature:true },
  { id:"ep-nor-spikedcider", park:"EPCOT", area:"Norway", name:"Spiked Frozen Apple Cider", location:"Norway Pavilion", type:"Frozen", tags:["signature","sweet"], signature:true },

  // ======================
  // EPCOT — CHINA
  // ======================
  { id:"ep-chn-tipsyducks", park:"EPCOT", area:"China", name:"Tipsy Ducks in Love", location:"Joy of Tea", type:"Cocktail", tags:["signature","iconic","coffee"], signature:true },
  { id:"ep-chn-kungfupunch", park:"EPCOT", area:"China", name:"Kung Fu Punch", location:"Joy of Tea", type:"Cocktail", tags:["signature","fruity"], signature:true },
  { id:"ep-chn-dragonbutterfly", park:"EPCOT", area:"China", name:"Dragon Butterfly", location:"Joy of Tea", type:"Cocktail", tags:["signature","boba"], signature:true },
  { id:"ep-chn-tsingtao", park:"EPCOT", area:"China", name:"Tsingtao Beer", location:"China Pavilion Cart", type:"Beer", tags:["classic"], signature:true },

  // ======================
  // EPCOT — GERMANY
  // ======================
  { id:"ep-ger-grapefruit", park:"EPCOT", area:"Germany", name:"Grapefruit Beer (Schöfferhofer)", location:"Sommerfest / Beer Cart", type:"Beer", tags:["signature","fan-favorite"], signature:true },
  { id:"ep-ger-beerflight", park:"EPCOT", area:"Germany", name:"German Beer Flight", location:"Biergarten", type:"Beer", tags:["signature","tasting"], signature:true },
  { id:"ep-ger-hefe", park:"EPCOT", area:"Germany", name:"Hefeweizen", location:"Germany Beer Cart", type:"Beer", tags:["classic"], signature:true },
  { id:"ep-ger-pils", park:"EPCOT", area:"Germany", name:"Pilsner", location:"Germany Beer Cart", type:"Beer", tags:["crisp"], signature:true },

  // ======================
  // EPCOT — ITALY
  // ======================
  { id:"ep-ita-italianmarg", park:"EPCOT", area:"Italy", name:"Italian Margarita", location:"Italy Pavilion Bar", type:"Cocktail", tags:["signature","fan-favorite"], signature:true },
  { id:"ep-ita-aperolspritz", park:"EPCOT", area:"Italy", name:"Aperol Spritz", location:"Italy Pavilion Bar", type:"Wine/Spirits", tags:["signature","bubbly"], signature:true },
  { id:"ep-ita-negroni", park:"EPCOT", area:"Italy", name:"Negroni", location:"Italy Pavilion Bar", type:"Cocktail", tags:["signature","classic"], signature:true },
  { id:"ep-ita-prosecco", park:"EPCOT", area:"Italy", name:"Prosecco", location:"Italy Pavilion Bar", type:"Wine/Spirits", tags:["bubbly"], signature:true },

  // ======================
  // EPCOT — USA (American Adventure)
  // ======================
  { id:"ep-usa-bourbonlemon", park:"EPCOT", area:"USA", name:"Bourbon Lemonade", location:"American Adventure Outdoor Bar", type:"Cocktail", tags:["signature","refreshing"], signature:true },
  { id:"ep-usa-whiskeysour", park:"EPCOT", area:"USA", name:"Whiskey Sour", location:"American Adventure Outdoor Bar", type:"Cocktail", tags:["classic"], signature:true },
  { id:"ep-usa-beerflight", park:"EPCOT", area:"USA", name:"American Craft Beer Flight", location:"American Adventure Outdoor Bar", type:"Beer", tags:["tasting"], signature:true },

  // ======================
  // EPCOT — JAPAN
  // ======================
  { id:"ep-jpn-tokyosunset", park:"EPCOT", area:"Japan", name:"Tokyo Sunset", location:"Garden House Sake", type:"Cocktail", tags:["signature","fan-favorite"], signature:true },
  { id:"ep-jpn-violetsake", park:"EPCOT", area:"Japan", name:"Violet Sake", location:"Garden House Sake", type:"Wine/Spirits", tags:["signature","photo-worthy"], signature:true },
  { id:"ep-jpn-kirinfrozen", park:"EPCOT", area:"Japan", name:"Kirin Frozen Draft", location:"Garden House Sake", type:"Beer", tags:["signature","unique"], signature:true },
  { id:"ep-jpn-sakeflight", park:"EPCOT", area:"Japan", name:"Sake Flight", location:"Garden House Sake", type:"Wine/Spirits", tags:["signature","tasting"], signature:true },

  // ======================
  // EPCOT — MOROCCO
  // ======================
  { id:"ep-mor-moroccanmule", park:"EPCOT", area:"Morocco", name:"Moroccan Mule", location:"Spice Road Table Bar", type:"Cocktail", tags:["signature","refreshing"], signature:true },
  { id:"ep-mor-pommimosa", park:"EPCOT", area:"Morocco", name:"Pomegranate Mimosa", location:"Spice Road Table Bar", type:"Wine/Spirits", tags:["signature","bubbly"], signature:true },
  { id:"ep-mor-sangria", park:"EPCOT", area:"Morocco", name:"House Sangria", location:"Spice Road Table Bar", type:"Wine/Spirits", tags:["signature","fruity"], signature:true },

  // ======================
  // EPCOT — FRANCE
  // ======================
  { id:"ep-fra-grandmarnier", park:"EPCOT", area:"France", name:"Grand Marnier Orange Slush", location:"Les Vins des Chefs de France", type:"Frozen", tags:["signature","iconic"], signature:true },
  { id:"ep-fra-greygs", park:"EPCOT", area:"France", name:"Grey Goose Citron Slush", location:"Les Vins des Chefs de France", type:"Frozen", tags:["signature","refreshing"], signature:true },
  { id:"ep-fra-kirroyale", park:"EPCOT", area:"France", name:"Kir Royale", location:"France Pavilion", type:"Wine/Spirits", tags:["signature","bubbly"], signature:true },
  { id:"ep-fra-champflight", park:"EPCOT", area:"France", name:"Champagne Flight", location:"France Pavilion", type:"Wine/Spirits", tags:["signature","tasting"], signature:true },

  // ======================
  // EPCOT — UNITED KINGDOM
  // ======================
  { id:"ep-uk-snakebite", park:"EPCOT", area:"UK", name:"Snake Bite", location:"Rose & Crown", type:"Beer", tags:["signature","iconic"], signature:true },
  { id:"ep-uk-welshdragon", park:"EPCOT", area:"UK", name:"Welsh Dragon", location:"Rose & Crown", type:"Cocktail", tags:["signature","fan-favorite"], signature:true },
  { id:"ep-uk-pimms", park:"EPCOT", area:"UK", name:"Pimm’s Cup", location:"Rose & Crown", type:"Cocktail", tags:["signature","refreshing"], signature:true },
  { id:"ep-uk-blacktan", park:"EPCOT", area:"UK", name:"Black & Tan", location:"Rose & Crown", type:"Beer", tags:["classic"], signature:true },
  { id:"ep-uk-ciderblackcurrant", park:"EPCOT", area:"UK", name:"Cider & Blackcurrant", location:"Rose & Crown", type:"Beer", tags:["signature","sweet"], signature:true },

  // ======================
  // EPCOT — CANADA
  // ======================
  { id:"ep-can-ottawaapple", park:"EPCOT", area:"Canada", name:"Ottawa Apple", location:"Popcorn in Canada", type:"Cocktail", tags:["signature","maple"], signature:true },
  { id:"ep-can-icewine", park:"EPCOT", area:"Canada", name:"Ice Wine", location:"Canada Pavilion", type:"Wine/Spirits", tags:["signature","sweet"], signature:true },
  { id:"ep-can-beerflight", park:"EPCOT", area:"Canada", name:"Canadian Beer Flight", location:"Canada Pavilion", type:"Beer", tags:["signature","tasting"], signature:true },

  // ======================
  // EPCOT — “Festival Booth” bucket (optional but useful)
  // ======================
  { id:"ep-fest-seasonal-1", park:"EPCOT", area:"Festival Booths", name:"Festival Exclusive Cocktail (Seasonal)", location:"Festival Booth", type:"Cocktail", tags:["seasonal","limited"], signature:true },
  { id:"ep-fest-seasonal-2", park:"EPCOT", area:"Festival Booths", name:"Festival Exclusive Frozen Drink (Seasonal)", location:"Festival Booth", type:"Frozen", tags:["seasonal","limited"], signature:true },
];
  

/* ---------- State ---------- */
let drinks = loadDrinkList();
let progress = loadProgress();

/* ---------- DOM Helpers ---------- */
const $ = (id) => document.getElementById(id);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function setView(name){
  $$(".tab").forEach(t => t.classList.toggle("active", t.dataset.view === name));
  $$(".view").forEach(v => v.classList.add("hidden"));
  $("view-" + name).classList.remove("hidden");

  // render on view switch
  if(name === "browse") renderBrowse();
  if(name === "checklist") renderChecklist();
  if(name === "favorites") renderFavorites();
}

/* ---------- Persistence ---------- */
function loadProgress(){
  try{
    const raw = localStorage.getItem(PROGRESS_KEY);
    const obj = raw ? JSON.parse(raw) : null;
    return obj && typeof obj === "object" ? obj : { perDrink:{} };
  }catch{
    return { perDrink:{} };
  }
}
function saveProgress(){
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  refreshStats();
}
function loadDrinkList(){
  try{
    const raw = localStorage.getItem(DRINKS_KEY);
    const list = raw ? JSON.parse(raw) : null;
    if(Array.isArray(list) && list.length) return normalizeDrinks(list);
    return normalizeDrinks(DEFAULT_DRINKS);
  }catch{
    return normalizeDrinks(DEFAULT_DRINKS);
  }
}
function saveDrinkList(){
  localStorage.setItem(DRINKS_KEY, JSON.stringify(drinks));
  rebuildFilters();
  refreshStats();
}

/* ---------- Normalize + Safety ---------- */
function normalizeDrinks(list){
  const seen = new Set();
  const cleaned = [];
  for(const d of list){
    if(!d || typeof d !== "object") continue;
    const park = (d.park || "").trim() || "EPCOT";
    const area = (d.area || "").trim() || "Unknown";
    const name = (d.name || "").trim() || "Unnamed Drink";
    const location = (d.location || "").trim() || "Unknown Venue";
    const type = (d.type || "").trim() || "Cocktail";
    const tags = Array.isArray(d.tags) ? d.tags.map(x=>String(x).trim()).filter(Boolean) : [];
    const signature = !!d.signature;

    const id = String(d.id || "").trim() || makeId(park, area, name, location);
    if(seen.has(id)) continue;
    seen.add(id);

    cleaned.push({ id, park, area, name, location, type, tags, signature });
  }
  return cleaned;
}
function makeId(park, area, name, location){
  return (park+"-"+area+"-"+name+"-"+location)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g,"-")
    .replace(/(^-|-$)/g,"")
    .slice(0, 80);
}
function pFor(id){
  if(!progress.perDrink[id]){
    progress.perDrink[id] = { tried:false, fav:false, rating:0, note:"" };
  }
  return progress.perDrink[id];
}

/* ---------- IndexedDB Photos (local-only) ---------- */
const DB_NAME = "pp_photos_db";
const DB_STORE = "photos";

function openDB(){
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if(!db.objectStoreNames.contains(DB_STORE)){
        db.createObjectStore(DB_STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
async function setPhoto(drinkId, blob){
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, "readwrite");
    tx.objectStore(DB_STORE).put(blob, drinkId);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
async function getPhoto(drinkId){
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, "readonly");
    const req = tx.objectStore(DB_STORE).get(drinkId);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

/* ---------- Placeholder thumb ---------- */
function placeholderDataURI(label){
  const safe = (label || "Drink").replace(/&/g,"and");
  const svg =
`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="450">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#9b7bff" stop-opacity="0.85"/>
      <stop offset="0.6" stop-color="#52e5ff" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#ff5da2" stop-opacity="0.40"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <text x="50%" y="52%" font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="900" text-anchor="middle" fill="rgba(10,10,18,0.70)">
    ${safe}
  </text>
  <text x="50%" y="64%" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="800" text-anchor="middle" fill="rgba(10,10,18,0.55)">
    Tap Add Photo
  </text>
</svg>`;
  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

/* ---------- Filters ---------- */
function uniqueSorted(arr){
  return Array.from(new Set(arr)).filter(Boolean).sort((a,b)=>a.localeCompare(b));
}

function rebuildFilters(){
  const parks = ["All Parks", ...uniqueSorted(drinks.map(d=>d.park))];
  $("fPark").innerHTML = parks.map(p=>`<option>${escapeHtml(p)}</option>`).join("");

  const types = ["All Types", ...uniqueSorted(drinks.map(d=>d.type))];
  $("fType").innerHTML = types.map(t=>`<option>${escapeHtml(t)}</option>`).join("");

  // Area depends on park selection
  rebuildAreas();

  // Checklist chips
  const chipWrap = $("checkChips");
  chipWrap.innerHTML = "";
  parks.forEach((p, idx) => {
    const label = idx===0 ? "All" : p;
    const b = document.createElement("button");
    b.className = "chip" + (idx===0 ? " active" : "");
    b.textContent = label;
    b.addEventListener("click", () => {
      $$("#checkChips .chip").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      renderChecklist(p);
    });
    chipWrap.appendChild(b);
  });

  // Modal selects
  $("mPark").innerHTML = uniqueSorted(drinks.map(d=>d.park)).map(p=>`<option>${escapeHtml(p)}</option>`).join("");
  const modalTypes = uniqueSorted(drinks.map(d=>d.type));
  $("mType").innerHTML = modalTypes.map(t=>`<option>${escapeHtml(t)}</option>`).join("");

  // Quick chips on home
  renderQuickChips();
}

function rebuildAreas(){
  const park = $("fPark").value || "All Parks";
  let areas = ["All Areas"];
  if(park === "All Parks"){
    areas = ["All Areas", ...uniqueSorted(drinks.map(d=>d.area))];
  }else{
    areas = ["All Areas", ...uniqueSorted(drinks.filter(d=>d.park===park).map(d=>d.area))];
  }
  $("fArea").innerHTML = areas.map(a=>`<option>${escapeHtml(a)}</option>`).join("");
}

function getFiltered(){
  const park = $("fPark").value || "All Parks";
  const area = $("fArea").value || "All Areas";
  const type = $("fType").value || "All Types";
  const sigOnly = $("fSignature").checked;
  const q = ($("fSearch").value || "").trim().toLowerCase();

  return drinks.filter(d => {
    if(park !== "All Parks" && d.park !== park) return false;
    if(area !== "All Areas" && d.area !== area) return false;
    if(type !== "All Types" && d.type !== type) return false;
    if(sigOnly && !d.signature) return false;
    if(q){
      const hay = `${d.name} ${d.location} ${d.park} ${d.area} ${d.type} ${(d.tags||[]).join(" ")}`.toLowerCase();
      if(!hay.includes(q)) return false;
    }
    return true;
  });
}

/* ---------- Rendering ---------- */
function renderBrowse(){
  const list = getFiltered();
  $("resultsTitle").textContent = "Browse";
  $("resultsSub").textContent = `${list.length} drinks`;
  const grid = $("gridBrowse");
  grid.innerHTML = "";
  list.forEach(d => grid.appendChild(drinkCard(d)));
}

function renderChecklist(filterPark="All Parks"){
  const items = drinks.filter(d => {
    const p = pFor(d.id);
    const active = p.tried || p.fav || p.rating>0 || (p.note && p.note.trim());
    if(!active) return false;
    if(filterPark !== "All Parks" && d.park !== filterPark) return false;
    return true;
  });

  const grid = $("gridChecklist");
  grid.innerHTML = "";
  if(items.length === 0){
    grid.innerHTML = `<div class="card"><h2 class="card-title">Nothing yet</h2><p class="muted">Go Browse and start checking off signature drinks 🍹</p></div>`;
    return;
  }
  items.forEach(d => grid.appendChild(drinkCard(d)));
}

function renderFavorites(){
  const items = drinks.filter(d => pFor(d.id).fav);
  const grid = $("gridFav");
  grid.innerHTML = "";
  if(items.length === 0){
    grid.innerHTML = `<div class="card"><h2 class="card-title">No favorites yet</h2><p class="muted">Tap “Fav” on any drink you want to repeat.</p></div>`;
    return;
  }
  items.forEach(d => grid.appendChild(drinkCard(d)));
}

function drinkCard(d){
  const p = pFor(d.id);

  const card = document.createElement("div");
  card.className = "card drink";

  const thumb = document.createElement("div");
  thumb.className = "thumb";

  const img = document.createElement("img");
  img.alt = `${d.name} photo`;
  img.src = placeholderDataURI(d.name);

  getPhoto(d.id).then(blob => {
    if(blob) img.src = URL.createObjectURL(blob);
  });

  const badge = document.createElement("div");
  badge.className = "badge";
  badge.textContent = `${d.park} • ${d.area}${d.signature ? " • ⭐" : ""}`;

  thumb.appendChild(img);
  thumb.appendChild(badge);

  const body = document.createElement("div");
  body.className = "body";

  const title = document.createElement("div");
  title.className = "title";
  title.textContent = d.name;

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.textContent = `${d.location} • ${d.type}`;

  const tags = document.createElement("div");
  tags.className = "tags";
  (d.tags||[]).slice(0,4).forEach(t => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = t;
    tags.appendChild(span);
  });

  const row = document.createElement("div");
  row.className = "row";

  const buttons = document.createElement("div");
  buttons.className = "buttons";

  const bTried = document.createElement("button");
  bTried.className = "iconbtn" + (p.tried ? " on" : "");
  bTried.textContent = p.tried ? "✅ Tried" : "☐ Try";
  bTried.addEventListener("click", () => {
    p.tried = !p.tried;
    saveProgress();
    rerenderActiveView();
  });

  const bFav = document.createElement("button");
  bFav.className = "iconbtn heart" + (p.fav ? " on" : "");
  bFav.textContent = p.fav ? "❤️ Fav" : "♡ Fav";
  bFav.addEventListener("click", () => {
    p.fav = !p.fav;
    saveProgress();
    rerenderActiveView();
  });

  const bPhoto = document.createElement("button");
  bPhoto.className = "iconbtn";
  bPhoto.textContent = "📷 Add Photo";
  bPhoto.addEventListener("click", async () => {
    const blob = await pickAndCompress();
    if(blob){
      await setPhoto(d.id, blob);
      rerenderActiveView();
    }
  });

  buttons.appendChild(bTried);
  buttons.appendChild(bFav);
  buttons.appendChild(bPhoto);

  const stars = document.createElement("div");
  stars.className = "stars";
  for(let i=1;i<=5;i++){
    const s = document.createElement("span");
    s.className = "star" + (p.rating >= i ? " on" : "");
    s.textContent = "★";
    s.title = `Rate ${i}`;
    s.addEventListener("click", () => {
      p.rating = (p.rating === i) ? 0 : i; // click same star to clear
      saveProgress();
      rerenderActiveView();
    });
    stars.appendChild(s);
  }

  row.appendChild(buttons);
  row.appendChild(stars);

  const note = document.createElement("textarea");
  note.placeholder = "Notes: taste, vibes, would you get it again…";
  note.value = p.note || "";
  note.addEventListener("input", debounce(() => {
    p.note = note.value;
    saveProgress();
  }, 200));

  body.appendChild(title);
  body.appendChild(meta);
  body.appendChild(tags);
  body.appendChild(row);
  body.appendChild(note);

  card.appendChild(thumb);
  card.appendChild(body);

  return card;
}

function rerenderActiveView(){
  refreshStats();
  const active = document.querySelector(".tab.active")?.dataset.view || "home";
  if(active === "browse") renderBrowse();
  if(active === "checklist") renderChecklist(getActiveChecklistPark());
  if(active === "favorites") renderFavorites();
}

function getActiveChecklistPark(){
  const activeChip = document.querySelector("#checkChips .chip.active");
  if(!activeChip) return "All Parks";
  const txt = activeChip.textContent.trim();
  return txt === "All" ? "All Parks" : txt;
}

/* ---------- Quick chips ---------- */
function renderQuickChips(){
  const wrap = $("quickChips");
  if(!wrap) return;
  wrap.innerHTML = "";

  const chips = [
    { label:"EPCOT • Signature Only", fn: () => { goBrowse({park:"EPCOT", sig:true}); } },
    { label:"Mexico", fn: () => { goBrowse({park:"EPCOT", area:"Mexico"}); } },
    { label:"France", fn: () => { goBrowse({park:"EPCOT", area:"France"}); } },
    { label:"UK", fn: () => { goBrowse({park:"EPCOT", area:"UK"}); } },
    { label:"Germany", fn: () => { goBrowse({park:"EPCOT", area:"Germany"}); } },
    { label:"Canada", fn: () => { goBrowse({park:"EPCOT", area:"Canada"}); } },
  ];

  for(const c of chips){
    const b = document.createElement("button");
    b.className = "chip";
    b.textContent = c.label;
    b.addEventListener("click", c.fn);
    wrap.appendChild(b);
  }
}

function goBrowse({park="All Parks", area="All Areas", type="All Types", sig=false}={}){
  setView("browse");
  $("fPark").value = park;
  rebuildAreas();
  $("fArea").value = area;
  $("fType").value = type;
  $("fSignature").checked = sig;
  $("fSearch").value = "";
  renderBrowse();
}

/* ---------- Photo pick + compress ---------- */
async function pickAndCompress(){
  const input = $("photoPicker");
  input.value = "";
  input.click();

  return new Promise((resolve) => {
    input.onchange = async () => {
      const file = input.files && input.files[0];
      if(!file){ resolve(null); return; }
      const blob = await compressImage(file, 1200, 0.82);
      resolve(blob);
    };
  });
}

function compressImage(file, maxSize=1200, quality=0.82){
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let w = img.width, h = img.height;
      const scale = Math.min(1, maxSize / Math.max(w, h));
      w = Math.round(w * scale);
      h = Math.round(h * scale);

      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);

      canvas.toBlob((blob) => {
        URL.revokeObjectURL(url);
        resolve(blob || file);
      }, "image/jpeg", quality);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(file);
    };

    img.src = url;
  });
}

/* ---------- Export / Import ---------- */
function downloadJSON(filename, data){
  const blob = new Blob([JSON.stringify(data, null, 2)], { type:"application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href), 2000);
}

$("btnExportProgress").addEventListener("click", () => {
  downloadJSON("pour-passport-progress.json", {
    version: 1,
    exportedAt: new Date().toISOString(),
    progress
  });
});

$("importProgress").addEventListener("change", async (e) => {
  const file = e.target.files && e.target.files[0];
  e.target.value = "";
  if(!file) return;
  try{
    const txt = await file.text();
    const data = JSON.parse(txt);
    if(!data || !data.progress || !data.progress.perDrink) throw new Error("Invalid progress file");
    progress = data.progress;
    saveProgress();
    rerenderActiveView();
    alert("Progress imported.");
  }catch{
    alert("Could not import progress. Make sure it's a file exported from this app.");
  }
});

$("btnExportDrinks").addEventListener("click", () => {
  downloadJSON("pour-passport-drinks.json", {
    version: 1,
    exportedAt: new Date().toISOString(),
    drinks
  });
});

$("importDrinks").addEventListener("change", async (e) => {
  const file = e.target.files && e.target.files[0];
  e.target.value = "";
  if(!file) return;
  try{
    const txt = await file.text();
    const data = JSON.parse(txt);
    if(!data || !Array.isArray(data.drinks)) throw new Error("Invalid drink list");
    drinks = normalizeDrinks(data.drinks);
    saveDrinkList();
    rerenderActiveView();
    alert(`Drink list imported (${drinks.length} drinks).`);
  }catch{
    alert("Could not import drink list. Make sure it's a file exported from this app.");
  }
});

/* ---------- Reset ---------- */
$("btnReset").addEventListener("click", () => {
  const ok = confirm("Reset checklist, ratings, notes, and favorites? (Photos stay on the device.)");
  if(!ok) return;
  progress = { perDrink:{} };
  saveProgress();
  rerenderActiveView();
});

/* ---------- Modal: Add Drink ---------- */
function openModal(){
  $("modalAdd").classList.remove("hidden");
}
function closeModal(){
  $("modalAdd").classList.add("hidden");
}
$("btnAddDrink").addEventListener("click", () => {
  // Fill modal defaults
  const parks = uniqueSorted(drinks.map(d=>d.park));
  $("mPark").innerHTML = parks.map(p=>`<option>${escapeHtml(p)}</option>`).join("");
  if(parks.includes("EPCOT")) $("mPark").value = "EPCOT";

  const types = uniqueSorted(drinks.map(d=>d.type));
  $("mType").innerHTML = types.map(t=>`<option>${escapeHtml(t)}</option>`).join("");
  if(types.includes("Cocktail")) $("mType").value = "Cocktail";

  $("mArea").value = "";
  $("mName").value = "";
  $("mLocation").value = "";
  $("mTags").value = "";
  $("mSignature").checked = true;

  openModal();
});
$("btnCloseModal").addEventListener("click", closeModal);
$("btnModalCancel").addEventListener("click", closeModal);
$("modalAdd").addEventListener("click", (e) => {
  if(e.target === $("modalAdd")) closeModal();
});

$("btnModalSave").addEventListener("click", () => {
  const park = $("mPark").value.trim();
  const area = $("mArea").value.trim();
  const name = $("mName").value.trim();
  const location = $("mLocation").value.trim();
  const type = $("mType").value.trim();
  const tags = $("mTags").value.split(",").map(x=>x.trim()).filter(Boolean);
  const signature = $("mSignature").checked;

  if(!park || !area || !name || !location || !type){
    alert("Please fill Park, Area, Name, Location, and Type.");
    return;
  }

  const id = makeId(park, area, name, location);
  if(drinks.some(d => d.id === id)){
    alert("That drink already exists (same Park/Area/Name/Location).");
    return;
  }

  drinks.unshift({ id, park, area, name, location, type, tags, signature });
  saveDrinkList();
  closeModal();
  goBrowse({ park, area, type:"All Types", sig:false });
});

/* ---------- Filter events ---------- */
$("fPark").addEventListener("change", () => {
  rebuildAreas();
  renderBrowse();
});
$("fArea").addEventListener("change", renderBrowse);
$("fType").addEventListener("change", renderBrowse);
$("fSignature").addEventListener("change", renderBrowse);
$("fSearch").addEventListener("input", debounce(renderBrowse, 120));
$("btnClear").addEventListener("click", () => {
  $("fPark").value = "All Parks";
  rebuildAreas();
  $("fType").value = "All Types";
  $("fSignature").checked = false;
  $("fSearch").value = "";
  renderBrowse();
});

/* ---------- Tabs ---------- */
$$(".tab").forEach(btn => {
  btn.addEventListener("click", () => setView(btn.dataset.view));
});

/* ---------- Home buttons ---------- */
$("btnStartEpcot").addEventListener("click", () => goBrowse({ park:"EPCOT", sig:true }));
$("btnBrowseAll").addEventListener("click", () => goBrowse({ park:"All Parks", sig:false }));

/* ---------- Stats ---------- */
function refreshStats(){
  $("statTotal").textContent = String(drinks.length);

  const vals = Object.values(progress.perDrink || {});
  const tried = vals.filter(x => x.tried).length;
  const fav = vals.filter(x => x.fav).length;
  const ratings = vals.map(x=>x.rating).filter(n => n > 0);
  const avg = ratings.length ? (ratings.reduce((a,b)=>a+b,0) / ratings.length) : null;

  $("statTried").textContent = String(tried);
  $("statFav").textContent = String(fav);
  $("statAvg").textContent = avg ? avg.toFixed(1) : "—";
}

/* ---------- Utilities ---------- */
function debounce(fn, ms){
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(()=>fn(...args), ms);
  };
}
function escapeHtml(s){
  return String(s)
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");
}

/* ---------- Boot ---------- */
function boot(){
  refreshStats();
  // Set filter defaults
  rebuildFilters();
  $("fPark").value = "All Parks";
  rebuildAreas();
  $("fType").value = "All Types";
  $("fSignature").checked = false;

  // Ensure browse loads if user clicks browse
  renderBrowse();

  // Start at Home
  setView("home");
}
boot();
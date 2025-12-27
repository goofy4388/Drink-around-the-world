/* ===========================
Park Day Drinkers — MVP
Local-only photos via IndexedDB
Ratings/notes/checklist via localStorage
=========================== */

const STORAGE_KEY = "pdd_state_v1";

/** ---- Sample data (you can expand anytime) ----
* Safe approach: DO NOT include copyrighted photos.
* Use placeholders + user uploads.
*/
const DRINKS = [
// EPCOT (World Showcase)
{ id:"ep-mex-1", park:"EPCOT", area:"Mexico", name:"Frozen Margarita", location:"La Cava / outdoor bar", type:"Frozen", tags:["sweet","refreshing"] },
{ id:"ep-nor-1", park:"EPCOT", area:"Norway", name:"Viking Coffee", location:"Kringla Bakeri", type:"Cocktail", tags:["coffee","strong"] },
{ id:"ep-jpn-1", park:"EPCOT", area:"Japan", name:"Sake Flight", location:"Sake Bar", type:"Wine/Spirits", tags:["smooth","tasting"] },
{ id:"ep-fra-1", park:"EPCOT", area:"France", name:"Orange Slush", location:"Les Vins des Chefs", type:"Frozen", tags:["citrus","fan-favorite"] },
{ id:"ep-uk-1", park:"EPCOT", area:"UK", name:"Snakebite", location:"Rose & Crown Pub", type:"Beer", tags:["classic","pub"] },
{ id:"ep-can-1", park:"EPCOT", area:"Canada", name:"Maple Bourbon Smash", location:"Canada pavilion bar", type:"Cocktail", tags:["bourbon","sweet"] },

// Magic Kingdom
{ id:"mk-1", park:"Magic Kingdom", area:"Main Street / Lounge", name:"Resort-Hopper Old Fashioned", location:"Lounge nearby", type:"Cocktail", tags:["bourbon","smooth"] },

// Hollywood Studios
{ id:"hs-1", park:"Hollywood Studios", area:"Galaxy / Bars", name:"Fuzzy Tauntaun (style)", location:"Cantina-style bar", type:"Cocktail", tags:["fun","citrus"] },

// Animal Kingdom
{ id:"ak-1", park:"Animal Kingdom", area:"Africa / Harambe", name:"Safari Cooler", location:"Outdoor bar", type:"Cocktail", tags:["tropical","refreshing"] },

// Disney Springs
{ id:"ds-1", park:"Disney Springs", area:"Springs", name:"Signature Sangria", location:"Wine bar", type:"Wine/Spirits", tags:["fruity","shareable"] },
];

const PARKS = ["All Parks","EPCOT","Magic Kingdom","Hollywood Studios","Animal Kingdom","Disney Springs"];
const EPCOT_AREAS = ["All Areas","Mexico","Norway","China","Germany","Italy","USA","Japan","Morocco","France","UK","Canada"];
const DEFAULT_AREAS = ["All Areas"];

/** ---------- State ---------- */
const state = loadState();

/** ---------- IndexedDB for photos ---------- */
const DB_NAME = "pdd_photos_db";
const DB_STORE = "photos"; // key: drinkId, value: blob

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

async function deletePhoto(drinkId){
const db = await openDB();
return new Promise((resolve, reject) => {
const tx = db.transaction(DB_STORE, "readwrite");
tx.objectStore(DB_STORE).delete(drinkId);
tx.oncomplete = () => resolve();
tx.onerror = () => reject(tx.error);
});
}

/** ---------- Helpers ---------- */
function loadState(){
try{
const raw = localStorage.getItem(STORAGE_KEY);
if(!raw) return { perDrink:{} };
const parsed = JSON.parse(raw);
if(!parsed || typeof parsed !== "object") return { perDrink:{} };
if(!parsed.perDrink) parsed.perDrink = {};
return parsed;
}catch{
return { perDrink:{} };
}
}
function saveState(){
localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
refreshStats();
}
function sFor(id){
if(!state.perDrink[id]) state.perDrink[id] = { checked:false, fav:false, rating:0, note:"" };
return state.perDrink[id];
}
function countTried(){
return Object.values(state.perDrink).filter(x => x.checked).length;
}
function countFav(){
return Object.values(state.perDrink).filter(x => x.fav).length;
}
function avgRating(){
const ratings = Object.values(state.perDrink).map(x => x.rating).filter(n => n > 0);
if(ratings.length === 0) return null;
const sum = ratings.reduce((a,b)=>a+b,0);
return (sum / ratings.length);
}

function el(id){ return document.getElementById(id); }
function qs(sel){ return document.querySelector(sel); }
function qsa(sel){ return [...document.querySelectorAll(sel)]; }

function setView(view){
qsa(".tab").forEach(t => t.classList.toggle("active", t.dataset.view === view));
qsa(".view").forEach(v => v.classList.add("hidden"));
el(`view-${view}`).classList.remove("hidden");
}

/** ---------- UI: Tabs ---------- */
qsa(".tab").forEach(btn => {
btn.addEventListener("click", () => {
setView(btn.dataset.view);
if(btn.dataset.view === "browse") renderBrowse();
if(btn.dataset.view === "checklist") renderChecklist();
if(btn.dataset.view === "favorites") renderFavorites();
});
});

/** ---------- Quick chips ---------- */
const QUICK = [
{ label:"EPCOT • Frozen", park:"EPCOT", type:"Frozen" },
{ label:"EPCOT • Cocktails", park:"EPCOT", type:"Cocktail" },
{ label:"Magic Kingdom", park:"Magic Kingdom" },
{ label:"Studios", park:"Hollywood Studios" },
{ label:"Springs", park:"Disney Springs" },
];

function renderQuickChips(){
const wrap = el("quickChips");
wrap.innerHTML = "";
QUICK.forEach(c => {
const b = document.createElement("button");
b.className = "chip";
b.textContent = c.label;
b.addEventListener("click", () => {
el("fPark").value = c.park || "All Parks";
rebuildAreas();
el("fType").value = c.type || "All Types";
el("fSearch").value = "";
setView("browse");
renderBrowse();
});
wrap.appendChild(b);
});

const checkWrap = el("checkChips");
checkWrap.innerHTML = "";
PARKS.slice(0).forEach((p, idx) => {
const label = idx===0 ? "All" : p;
const b = document.createElement("button");
b.className = "chip";
b.textContent = label;
b.addEventListener("click", () => {
qsa("#checkChips .chip").forEach(x => x.classList.remove("active"));
b.classList.add("active");
renderChecklist(p);
});
if(idx===0) b.classList.add("active");
checkWrap.appendChild(b);
});
}

/** ---------- Filters ---------- */
function initFilters(){
// Park
const fPark = el("fPark");
fPark.innerHTML = PARKS.map(p => `<option>${p}</option>`).join("");
fPark.value = "All Parks";

// Type
const types = ["All Types", ...new Set(DRINKS.map(d => d.type))];
const fType = el("fType");
fType.innerHTML = types.map(t => `<option>${t}</option>`).join("");
fType.value = "All Types";

// Area
rebuildAreas();

fPark.addEventListener("change", () => { rebuildAreas(); renderBrowse(); });
el("fArea").addEventListener("change", renderBrowse);
fType.addEventListener("change", renderBrowse);
el("fSearch").addEventListener("input", debounce(renderBrowse, 120));

el("btnClearFilters").addEventListener("click", () => {
fPark.value = "All Parks";
rebuildAreas();
fType.value = "All Types";
el("fSearch").value = "";
renderBrowse();
});
}

function rebuildAreas(){
const park = el("fPark").value;
const fArea = el("fArea");

let areas = DEFAULT_AREAS;
if(park === "EPCOT") areas = EPCOT_AREAS;
else if(park !== "All Parks") {
// build areas dynamically for that park
const set = new Set(DRINKS.filter(d => d.park === park).map(d => d.area));
areas = ["All Areas", ...[...set].sort()];
}

fArea.innerHTML = areas.map(a => `<option>${a}</option>`).join("");
fArea.value = "All Areas";
}

function debounce(fn, ms){
let t;
return (...args) => {
clearTimeout(t);
t = setTimeout(()=>fn(...args), ms);
};
}

function filteredDrinks(){
const park = el("fPark").value;
const area = el("fArea").value;
const type = el("fType").value;
const q = (el("fSearch").value || "").trim().toLowerCase();

return DRINKS.filter(d => {
if(park !== "All Parks" && d.park !== park) return false;
if(area !== "All Areas" && d.area !== area) return false;
if(type !== "All Types" && d.type !== type) return false;
if(q){
const hay = `${d.name} ${d.location} ${d.park} ${d.area} ${d.type} ${(d.tags||[]).join(" ")}`.toLowerCase();
if(!hay.includes(q)) return false;
}
return true;
});
}

/** ---------- Rendering drink cards ---------- */
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
<filter id="b" x="-20%" y="-20%" width="140%" height="140%">
<feGaussianBlur stdDeviation="18"/>
</filter>
</defs>
<rect width="100%" height="100%" fill="url(#g)"/>
<circle cx="180" cy="110" r="110" fill="white" opacity="0.20" filter="url(#b)"/>
<circle cx="720" cy="90" r="140" fill="white" opacity="0.14" filter="url(#b)"/>
<circle cx="540" cy="360" r="180" fill="white" opacity="0.12" filter="url(#b)"/>
<text x="50%" y="52%" font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="900" text-anchor="middle" fill="rgba(10,10,18,0.70)">
${safe}
</text>
<text x="50%" y="64%" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="800" text-anchor="middle" fill="rgba(10,10,18,0.55)">
Tap “Add Photo” to upload your own
</text>
</svg>`;
return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

function drinkCard(drink, { compact=false } = {}){
const st = sFor(drink.id);

const card = document.createElement("div");
card.className = "card drink";

// Thumb
const thumb = document.createElement("div");
thumb.className = "thumb";
const img = document.createElement("img");
img.alt = `${drink.name} photo`;

// Load photo from IndexedDB (async)
img.src = placeholderDataURI(drink.name);
getPhoto(drink.id).then(blob => {
if(blob){
img.src = URL.createObjectURL(blob);
}
});

const badge = document.createElement("div");
badge.className = "thumb-tag";
badge.textContent = `${drink.park} • ${drink.area}`;

thumb.appendChild(img);
thumb.appendChild(badge);

// Body
const body = document.createElement("div");
body.className = "drink-body";

const title = document.createElement("div");
title.className = "drink-title";
title.textContent = drink.name;

const meta = document.createElement("div");
meta.className = "drink-meta";
meta.textContent = `${drink.location} • ${drink.type}`;

const tags = document.createElement("div");
tags.className = "tags";
(drink.tags || []).slice(0,3).forEach(t => {
const pill = document.createElement("span");
pill.className = "tag";
pill.textContent = t;
tags.appendChild(pill);
});

// Actions row
const row = document.createElement("div");
row.className = "row";

const actions = document.createElement("div");
actions.className = "actions";

const btnCheck = document.createElement("button");
btnCheck.className = "iconbtn";
btnCheck.textContent = st.checked ? "✅ Tried" : "☐ Try";
if(st.checked) btnCheck.classList.add("on");
btnCheck.addEventListener("click", () => {
st.checked = !st.checked;
saveState();
renderCurrentViews();
});

const btnFav = document.createElement("button");
btnFav.className = "iconbtn heart";
btnFav.textContent = st.fav ? "❤️ Fav" : "♡ Fav";
if(st.fav) btnFav.classList.add("on");
btnFav.addEventListener("click", () => {
st.fav = !st.fav;
saveState();
renderCurrentViews();
});

const btnPhoto = document.createElement("button");
btnPhoto.className = "iconbtn";
btnPhoto.textContent = "📷 Add Photo";
btnPhoto.addEventListener("click", async () => {
await pickPhotoFor(drink.id);
renderCurrentViews();
});

actions.appendChild(btnCheck);
actions.appendChild(btnFav);
actions.appendChild(btnPhoto);

// Stars
const stars = document.createElement("div");
stars.className = "stars";
for(let i=1;i<=5;i++){
const s = document.createElement("span");
s.className = "star" + (st.rating >= i ? " on" : "");
s.textContent = "★";
s.title = `Rate ${i}`;
s.addEventListener("click", () => {
st.rating = (st.rating === i) ? 0 : i; // click again to clear
saveState();
renderCurrentViews();
});
stars.appendChild(s);
}

row.appendChild(actions);
row.appendChild(stars);

// Notes
const note = document.createElement("textarea");
note.placeholder = "Add your notes: taste, vibes, would you get it again…";
note.value = st.note || "";
note.addEventListener("input", debounce(() => {
st.note = note.value;
saveState();
}, 250));

body.appendChild(title);
body.appendChild(meta);
body.appendChild(tags);
body.appendChild(row);
if(!compact) body.appendChild(note);

card.appendChild(thumb);
card.appendChild(body);

return card;
}

/** ---------- Photo picking & compression ---------- */
let photoTargetDrinkId = null;

async function pickPhotoFor(drinkId){
photoTargetDrinkId = drinkId;
const picker = el("photoPicker");
picker.value = "";
picker.click();

return new Promise((resolve) => {
picker.onchange = async () => {
const file = picker.files && picker.files[0];
if(!file){ resolve(); return; }

// Compress image so it saves reliably (important for “no hiccups”)
const blob = await compressImage(file, 1200, 0.82);
await setPhoto(drinkId, blob);
resolve();
};
});
}

function compressImage(file, maxSize = 1200, quality = 0.82){
return new Promise((resolve) => {
const img = new Image();
const url = URL.createObjectURL(file);
img.onload = () => {
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

let w = img.width;
let h = img.height;

// scale down
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
img.onerror = () => resolve(file);
img.src = url;
});
}

/** ---------- Views ---------- */
function renderBrowse(){
const list = filteredDrinks();
el("resultsTitle").textContent = "Browse";
el("resultsSub").textContent = `${list.length} drinks`;

const grid = el("drinkGrid");
grid.innerHTML = "";
list.forEach(d => grid.appendChild(drinkCard(d)));
}

function renderChecklist(filterPark = "All Parks"){
const items = DRINKS.filter(d => {
const st = sFor(d.id);
const active = st.checked || st.fav || st.rating > 0 || (st.note && st.note.trim());
if(!active) return false;
if(filterPark !== "All Parks" && d.park !== filterPark) return false;
return true;
});

const grid = el("checkGrid");
grid.innerHTML = "";
if(items.length === 0){
const empty = document.createElement("div");
empty.className = "card";
empty.innerHTML = `<h2 class="card-title">Nothing yet</h2><p class="muted">Go browse drinks and start checking them off 🍹</p>`;
grid.appendChild(empty);
return;
}
items.forEach(d => grid.appendChild(drinkCard(d)));
}

function renderFavorites(){
const items = DRINKS.filter(d => sFor(d.id).fav);
const grid = el("favGrid");
grid.innerHTML = "";
if(items.length === 0){
const empty = document.createElement("div");
empty.className = "card";
empty.innerHTML = `<h2 class="card-title">No favorites yet</h2><p class="muted">Tap “Fav” on any drink you want to repeat.</p>`;
grid.appendChild(empty);
return;
}
items.forEach(d => grid.appendChild(drinkCard(d)));
}

function renderCurrentViews(){
refreshStats();
const active = qs(".tab.active")?.dataset.view || "home";
if(active === "browse") renderBrowse();
if(active === "checklist") renderChecklist();
if(active === "favorites") renderFavorites();
}

/** ---------- Stats ---------- */
function refreshStats(){
el("statTried").textContent = String(countTried());
el("statFav").textContent = String(countFav());
const avg = avgRating();
el("statAvg").textContent = avg ? avg.toFixed(1) : "—";
}

/** ---------- Export/Import/Reset ---------- */
el("btnExport").addEventListener("click", () => {
// Note: photos are NOT included (they’re stored in IndexedDB locally)
const payload = {
version: 1,
exportedAt: new Date().toISOString(),
perDrink: state.perDrink
};
const blob = new Blob([JSON.stringify(payload, null, 2)], { type:"application/json" });
const a = document.createElement("a");
a.href = URL.createObjectURL(blob);
a.download = "park-day-drinkers-backup.json";
a.click();
setTimeout(()=>URL.revokeObjectURL(a.href), 2000);
});

el("importFile").addEventListener("change", async (e) => {
const file = e.target.files && e.target.files[0];
if(!file) return;
try{
const txt = await file.text();
const data = JSON.parse(txt);
if(!data || !data.perDrink) throw new Error("Invalid backup");
state.perDrink = data.perDrink;
saveState();
alert("Backup imported! (Photos stay on the device that uploaded them.)");
renderCurrentViews();
}catch{
alert("Could not import that file. Make sure it’s a backup exported from this app.");
}finally{
e.target.value = "";
}
});

el("btnReset").addEventListener("click", async () => {
if(!confirm("Reset checklist/ratings/notes? (Photos remain unless you clear browser storage.)")) return;
state.perDrink = {};
saveState();
renderCurrentViews();
});

/** ---------- Home buttons ---------- */
el("btnStartEpcot").addEventListener("click", () => {
setView("browse");
el("fPark").value = "EPCOT";
rebuildAreas();
el("fType").value = "All Types";
el("fSearch").value = "";
renderBrowse();
});
el("btnBrowseAll").addEventListener("click", () => {
setView("browse");
el("fPark").value = "All Parks";
rebuildAreas();
el("fType").value = "All Types";
el("fSearch").value = "";
renderBrowse();
});

/** ---------- Boot ---------- */
renderQuickChips();
initFilters();
refreshStats();

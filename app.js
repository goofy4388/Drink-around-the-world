// ===== PASSWORD GATE (Drink Around The World) =====
// Change your password here:
const PAGE_PASSWORD = "EPCOT2026!";

document.addEventListener("DOMContentLoaded", () => {
  const lockScreen = document.getElementById("lockScreen");
  const input = document.getElementById("passwordInput");
  const unlockBtn = document.getElementById("unlockBtn");
  const clearBtn = document.getElementById("clearAccessBtn");
  const err = document.getElementById("lockError");

  // Already unlocked on this device?
  if (localStorage.getItem("datw_unlocked") === "yes") {
    lockScreen.style.display = "none";
  }

  function showError(on){
    err.style.display = on ? "block" : "none";
  }

  function unlock(){
    const val = (input.value || "").trim();
    if (val === PAGE_PASSWORD){
      localStorage.setItem("datw_unlocked", "yes");
      lockScreen.style.display = "none";
      showError(false);
      input.value = "";
    } else {
      showError(true);
      input.focus();
      input.select();
    }
  }

  unlockBtn.addEventListener("click", unlock);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") unlock();
  });

  clearBtn.addEventListener("click", () => {
    localStorage.removeItem("datw_unlocked");
    lockScreen.style.display = "flex";
    showError(false);
    input.value = "";
    input.focus();
  });
});
/* Drink Around the World Passport (EPCOT World Showcase)
   - 11 countries
   - 10 signature-style drinks per country (110 total)
   - Filters, checklist, favorites, photos
   - No export/import
*/

const STORAGE_KEY = "datw_passport_v1";

/* World Showcase order (used for country dropdown) */
const SHOWCASE_ORDER = [
  "Mexico","Norway","China","Germany","Italy","American Adventure",
  "Japan","Morocco","France","United Kingdom","Canada"
];

/* Curated “signature-style / fan-favorite” checklist targets.
   Menus rotate — if a name shifts, your checklist still makes sense.
*/
const DRINKS = [
  // =========================
  // MEXICO (10)
  // =========================
  { id:"mex-01", park:"EPCOT", country:"Mexico", type:"Cocktail", name:"Avocado Margarita", location:"La Cava del Tequila", askFor:"Avocado Margarita (creamy avocado margarita)." },
  { id:"mex-02", park:"EPCOT", country:"Mexico", type:"Cocktail", name:"Cucumber Margarita", location:"La Cava del Tequila", askFor:"Cucumber Margarita (refreshing, crisp)." },
  { id:"mex-03", park:"EPCOT", country:"Mexico", type:"Cocktail", name:"Mango-Chili Margarita (Spicy)", location:"La Cava del Tequila", askFor:"The spicy mango/chili margarita option." },
  { id:"mex-04", park:"EPCOT", country:"Mexico", type:"Cocktail", name:"Tamarind Margarita", location:"La Cava del Tequila", askFor:"Tamarind margarita (sweet-tart)." },
  { id:"mex-05", park:"EPCOT", country:"Mexico", type:"Cocktail", name:"Mezcal Margarita (Smoky)", location:"La Cava del Tequila", askFor:"Mezcal margarita (smoky tequila cousin)." },
  { id:"mex-06", park:"EPCOT", country:"Mexico", type:"Frozen", name:"Classic Frozen Margarita", location:"Mexico Margarita Bar", askFor:"Classic frozen margarita from the outdoor bar." },
  { id:"mex-07", park:"EPCOT", country:"Mexico", type:"Frozen", name:"Frozen Mango Margarita", location:"Mexico Margarita Bar", askFor:"Frozen mango margarita." },
  { id:"mex-08", park:"EPCOT", country:"Mexico", type:"Frozen", name:"Frozen Strawberry Margarita", location:"Mexico Margarita Bar", askFor:"Frozen strawberry margarita." },
  { id:"mex-09", park:"EPCOT", country:"Mexico", type:"Spirits/Flight", name:"Tequila Flight", location:"La Cava del Tequila", askFor:"A tequila flight (ask for their current set)." },
  { id:"mex-10", park:"EPCOT", country:"Mexico", type:"Spirits/Flight", name:"Mezcal Flight", location:"La Cava del Tequila", askFor:"A mezcal flight (ask what’s available)." },

  // =========================
  // NORWAY (10)
  // =========================
  { id:"nor-01", park:"EPCOT", country:"Norway", type:"Coffee", name:"Viking Coffee", location:"Kringla Bakeri / Norway pavilion", askFor:"Viking Coffee (coffee + spirits + cream)." },
  { id:"nor-02", park:"EPCOT", country:"Norway", type:"Coffee", name:"Frozen Viking Coffee", location:"Kringla Bakeri / Norway pavilion", askFor:"Frozen Viking Coffee version (if offered)." },
  { id:"nor-03", park:"EPCOT", country:"Norway", type:"Cocktail", name:"Lingonberry Vodka Cocktail", location:"Norway pavilion", askFor:"Lingonberry vodka cocktail option." },
  { id:"nor-04", park:"EPCOT", country:"Norway", type:"Cocktail", name:"Aquavit Cocktail", location:"Norway pavilion", askFor:"Aquavit-based cocktail (ask current build)." },
  { id:"nor-05", park:"EPCOT", country:"Norway", type:"Cocktail", name:"Aquavit & Tonic", location:"Norway pavilion", askFor:"Aquavit mixed with tonic/citrus." },
  { id:"nor-06", park:"EPCOT", country:"Norway", type:"Beer", name:"Scandinavian Beer (Seasonal)", location:"Norway pavilion", askFor:"What Scandinavian beer is available today." },
  { id:"nor-07", park:"EPCOT", country:"Norway", type:"Cider", name:"Nordic Apple Cider", location:"Norway pavilion", askFor:"Ask what Nordic-style cider is available." },
  { id:"nor-08", park:"EPCOT", country:"Norway", type:"Cocktail", name:"Berry Spritz (pavilion style)", location:"Norway pavilion", askFor:"A berry-forward spritz option (if offered)." },
  { id:"nor-09", park:"EPCOT", country:"Norway", type:"Wine", name:"Norwegian-Style Mulled Wine (Seasonal)", location:"Norway pavilion", askFor:"Seasonal mulled wine/gløgg style (if offered)." },
  { id:"nor-10", park:"EPCOT", country:"Norway", type:"Spirits/Flight", name:"Aquavit Tasting/Flight (if available)", location:"Norway pavilion", askFor:"Ask if there’s an aquavit tasting/flight." },

  // =========================
  // CHINA (10)
  // =========================
  { id:"chn-01", park:"EPCOT", country:"China", type:"Frozen", name:"Tipsy Ducks in Love", location:"Joy of Tea", askFor:"Tipsy Ducks in Love (tea + coffee + chocolate)." },
  { id:"chn-02", park:"EPCOT", country:"China", type:"Cocktail", name:"Kung Fu Punch", location:"Joy of Tea", askFor:"Kung Fu Punch (if on the menu today)." },
  { id:"chn-03", park:"EPCOT", country:"China", type:"Cocktail", name:"Lychee Vodka Cocktail", location:"Joy of Tea", askFor:"Lychee vodka cocktail option." },
  { id:"chn-04", park:"EPCOT", country:"China", type:"Cocktail", name:"Dragonfruit Cocktail (if available)", location:"Joy of Tea", askFor:"Dragonfruit cocktail (seasonal/rotating)." },
  { id:"chn-05", park:"EPCOT", country:"China", type:"Wine", name:"Plum Wine", location:"China pavilion", askFor:"Chilled plum wine." },
  { id:"chn-06", park:"EPCOT", country:"China", type:"Beer", name:"Tsingtao Lager", location:"China cart", askFor:"Tsingtao beer." },
  { id:"chn-07", park:"EPCOT", country:"China", type:"Beer", name:"China Beer (Rotating)", location:"China cart", askFor:"Ask what other beer is available besides Tsingtao." },
  { id:"chn-08", park:"EPCOT", country:"China", type:"Cocktail", name:"Ginger-Lime Cocktail (pavilion style)", location:"Joy of Tea", askFor:"A ginger/lime cocktail option (if offered)." },
  { id:"chn-09", park:"EPCOT", country:"China", type:"Wine", name:"Chinese Rice Wine (if available)", location:"China pavilion", askFor:"Ask if there’s a rice wine/pour available." },
  { id:"chn-10", park:"EPCOT", country:"China", type:"Spirits/Flight", name:"Spirits Tasting (if available)", location:"China pavilion", askFor:"Ask if any tasting/flight is offered today." },

  // =========================
  // GERMANY (10)
  // =========================
  { id:"deu-01", park:"EPCOT", country:"Germany", type:"Beer", name:"Schöfferhofer Grapefruit Hefeweizen", location:"Germany Beer Cart", askFor:"Schöfferhofer Grapefruit (fan favorite)." },
  { id:"deu-02", park:"EPCOT", country:"Germany", type:"Beer", name:"Paulaner Hefe-Weizen", location:"Germany Beer Cart", askFor:"Paulaner Hefe-Weizen." },
  { id:"deu-03", park:"EPCOT", country:"Germany", type:"Beer", name:"Warsteiner Pilsner", location:"Germany Beer Cart", askFor:"Warsteiner Pilsner." },
  { id:"deu-04", park:"EPCOT", country:"Germany", type:"Beer", name:"Radler (Beer + Lemonade)", location:"Germany Beer Cart", askFor:"Ask if a Radler is available." },
  { id:"deu-05", park:"EPCOT", country:"Germany", type:"Beer", name:"Dunkel / Dark Lager (if available)", location:"Germany Beer Cart", askFor:"Ask for a Dunkel/dark lager option." },
  { id:"deu-06", park:"EPCOT", country:"Germany", type:"Beer", name:"German Beer Flight (if available)", location:"Biergarten", askFor:"Ask if they offer a German beer flight." },
  { id:"deu-07", park:"EPCOT", country:"Germany", type:"Wine", name:"German Riesling", location:"Germany pavilion", askFor:"German Riesling pour." },
  { id:"deu-08", park:"EPCOT", country:"Germany", type:"Wine", name:"German Pinot Noir (if available)", location:"Germany pavilion", askFor:"Ask for a German red wine option." },
  { id:"deu-09", park:"EPCOT", country:"Germany", type:"Spirits/Flight", name:"German Schnapps (if available)", location:"Germany pavilion", askFor:"Ask if any schnapps pour is offered." },
  { id:"deu-10", park:"EPCOT", country:"Germany", type:"Spirits/Flight", name:"German Spirits Tasting (if available)", location:"Germany pavilion", askFor:"Ask if any tasting/flight is available." },

  // =========================
  // ITALY (10)
  // =========================
  { id:"ita-01", park:"EPCOT", country:"Italy", type:"Cocktail", name:"Aperol Spritz", location:"Italy Pavilion Bar", askFor:"Aperol Spritz." },
  { id:"ita-02", park:"EPCOT", country:"Italy", type:"Cocktail", name:"Bellini", location:"Italy Pavilion Bar", askFor:"Bellini (peach + sparkling)." },
  { id:"ita-03", park:"EPCOT", country:"Italy", type:"Cocktail", name:"Negroni", location:"Italy Pavilion Bar", askFor:"Negroni (gin + Campari + vermouth)." },
  { id:"ita-04", park:"EPCOT", country:"Italy", type:"Cocktail", name:"Limoncello Cocktail", location:"Italy Pavilion Bar", askFor:"Limoncello-based cocktail." },
  { id:"ita-05", park:"EPCOT", country:"Italy", type:"Wine", name:"Prosecco", location:"Italy pavilion", askFor:"Prosecco pour." },
  { id:"ita-06", park:"EPCOT", country:"Italy", type:"Wine", name:"Chianti (if available)", location:"Italy pavilion", askFor:"Chianti red wine." },
  { id:"ita-07", park:"EPCOT", country:"Italy", type:"Wine", name:"Pinot Grigio (if available)", location:"Italy pavilion", askFor:"Pinot Grigio." },
  { id:"ita-08", park:"EPCOT", country:"Italy", type:"Beer", name:"Peroni Lager", location:"Italy pavilion", askFor:"Peroni." },
  { id:"ita-09", park:"EPCOT", country:"Italy", type:"Cocktail", name:"Italian Margarita (if available)", location:"Italy pavilion", askFor:"Ask if an Italian Margarita is offered." },
  { id:"ita-10", park:"EPCOT", country:"Italy", type:"Spirits/Flight", name:"Amaro / Digestif Pour (if available)", location:"Italy pavilion", askFor:"Ask if any amaro/digestif is available." },

  // =========================
  // AMERICAN ADVENTURE (10)
  // =========================
  { id:"usa-01", park:"EPCOT", country:"American Adventure", type:"Cocktail", name:"Moonshine Sour", location:"American pavilion", askFor:"Moonshine Sour / featured moonshine cocktail." },
  { id:"usa-02", park:"EPCOT", country:"American Adventure", type:"Cocktail", name:"Tennessee Lemonade", location:"American pavilion", askFor:"Tennessee Lemonade (whiskey + lemonade style)." },
  { id:"usa-03", park:"EPCOT", country:"American Adventure", type:"Cocktail", name:"Bourbon Smash", location:"American pavilion", askFor:"Bourbon smash / seasonal bourbon cocktail." },
  { id:"usa-04", park:"EPCOT", country:"American Adventure", type:"Cocktail", name:"Bourbon Old Fashioned (if available)", location:"American pavilion", askFor:"Ask if an Old Fashioned is available." },
  { id:"usa-05", park:"EPCOT", country:"American Adventure", type:"Beer", name:"American Craft Beer (Rotating)", location:"American pavilion", askFor:"Ask what craft beer is on rotation." },
  { id:"usa-06", park:"EPCOT", country:"American Adventure", type:"Beer", name:"IPA (Rotating)", location:"American pavilion", askFor:"Ask for the IPA option if offered." },
  { id:"usa-07", park:"EPCOT", country:"American Adventure", type:"Cider", name:"Hard Cider (Seasonal)", location:"American pavilion", askFor:"Ask what hard cider is available." },
  { id:"usa-08", park:"EPCOT", country:"American Adventure", type:"Wine", name:"Sparkling Wine / Bubbly (if available)", location:"American pavilion", askFor:"Ask for a sparkling wine option." },
  { id:"usa-09", park:"EPCOT", country:"American Adventure", type:"Spirits/Flight", name:"Bourbon Flight (if available)", location:"American pavilion", askFor:"Ask if a bourbon flight is offered." },
  { id:"usa-10", park:"EPCOT", country:"American Adventure", type:"Spirits/Flight", name:"Moonshine Tasting/Flight (if available)", location:"American pavilion", askFor:"Ask if any moonshine tasting/flight is offered." },

  // =========================
  // JAPAN (10)
  // =========================
  { id:"jpn-01", park:"EPCOT", country:"Japan", type:"Cocktail", name:"Tokyo Sunset", location:"Japan pavilion bar", askFor:"Tokyo Sunset cocktail." },
  { id:"jpn-02", park:"EPCOT", country:"Japan", type:"Cocktail", name:"Violet Sake", location:"Japan pavilion bar", askFor:"Violet Sake cocktail." },
  { id:"jpn-03", park:"EPCOT", country:"Japan", type:"Wine", name:"Sake Flight (if available)", location:"Japan pavilion", askFor:"Ask if a sake flight is offered." },
  { id:"jpn-04", park:"EPCOT", country:"Japan", type:"Wine", name:"Nigori Sake (if available)", location:"Japan pavilion", askFor:"Ask for nigori (cloudy) sake." },
  { id:"jpn-05", park:"EPCOT", country:"Japan", type:"Wine", name:"Junmai Sake (if available)", location:"Japan pavilion", askFor:"Ask for a junmai sake pour." },
  { id:"jpn-06", park:"EPCOT", country:"Japan", type:"Beer", name:"Kirin Ichiban", location:"Japan pavilion", askFor:"Kirin Ichiban." },
  { id:"jpn-07", park:"EPCOT", country:"Japan", type:"Beer", name:"Sapporo (if available)", location:"Japan pavilion", askFor:"Ask if Sapporo is available." },
  { id:"jpn-08", park:"EPCOT", country:"Japan", type:"Frozen", name:"Yuzu Citrus Slush (if available)", location:"Japan pavilion", askFor:"Ask if yuzu citrus slush is available." },
  { id:"jpn-09", park:"EPCOT", country:"Japan", type:"Cocktail", name:"Plum Wine Cocktail (if available)", location:"Japan pavilion", askFor:"Ask if any plum wine cocktail is offered." },
  { id:"jpn-10", park:"EPCOT", country:"Japan", type:"Cocktail", name:"Japanese Whisky Highball (if available)", location:"Japan pavilion", askFor:"Ask for a whisky highball option." },

  // =========================
  // MOROCCO (10)
  // =========================
  { id:"mar-01", park:"EPCOT", country:"Morocco", type:"Cocktail", name:"Pomegranate Mimosa", location:"Morocco pavilion", askFor:"Pomegranate Mimosa." },
  { id:"mar-02", park:"EPCOT", country:"Morocco", type:"Cocktail", name:"Moroccan Mule", location:"Morocco pavilion", askFor:"Moroccan Mule (ginger + citrus style)." },
  { id:"mar-03", park:"EPCOT", country:"Morocco", type:"Wine", name:"Moroccan Sangria (if available)", location:"Morocco pavilion", askFor:"Ask if sangria is available." },
  { id:"mar-04", park:"EPCOT", country:"Morocco", type:"Wine", name:"Rosé (pavilion pour)", location:"Morocco pavilion", askFor:"Ask for the rosé option." },
  { id:"mar-05", park:"EPCOT", country:"Morocco", type:"Wine", name:"Red Blend (pavilion pour)", location:"Morocco pavilion", askFor:"Ask for the red wine option." },
  { id:"mar-06", park:"EPCOT", country:"Morocco", type:"Beer", name:"Moroccan Beer (if available)", location:"Morocco pavilion", askFor:"Ask what beer is available here." },
  { id:"mar-07", park:"EPCOT", country:"Morocco", type:"Cocktail", name:"Mint Tea Cocktail (if available)", location:"Morocco pavilion", askFor:"Ask if there’s a mint tea cocktail." },
  { id:"mar-08", park:"EPCOT", country:"Morocco", type:"Cocktail", name:"Citrus Cooler Cocktail (if available)", location:"Morocco pavilion", askFor:"Ask for the citrus cooler-style cocktail." },
  { id:"mar-09", park:"EPCOT", country:"Morocco", type:"Spirits/Flight", name:"Moroccan Spirits Pour (if available)", location:"Morocco pavilion", askFor:"Ask if any spirits pour/tasting is offered." },
  { id:"mar-10", park:"EPCOT", country:"Morocco", type:"Spirits/Flight", name:"Wine Flight (if available)", location:"Morocco pavilion", askFor:"Ask if a wine flight is available." },

  // =========================
  // FRANCE (10)
  // =========================
  { id:"fra-01", park:"EPCOT", country:"France", type:"Frozen", name:"Grand Marnier Orange Slush", location:"France slush stand", askFor:"Grand Marnier Orange Slush (classic)." },
  { id:"fra-02", park:"EPCOT", country:"France", type:"Frozen", name:"Grey Goose Citron Slush", location:"France slush stand", askFor:"Grey Goose Citron Slush." },
  { id:"fra-03", park:"EPCOT", country:"France", type:"Frozen", name:"Orange Slush (Non-alcoholic version, if available)", location:"France slush stand", askFor:"Ask if a non-alcoholic orange slush is available." },
  { id:"fra-04", park:"EPCOT", country:"France", type:"Wine", name:"Champagne (Sparkling)", location:"France pavilion", askFor:"A champagne/sparkling pour." },
  { id:"fra-05", park:"EPCOT", country:"France", type:"Wine", name:"Kir Royale (if available)", location:"France pavilion", askFor:"Ask if Kir Royale is available." },
  { id:"fra-06", park:"EPCOT", country:"France", type:"Wine", name:"Rosé (pavilion pour)", location:"France pavilion", askFor:"Ask for the rosé option." },
  { id:"fra-07", park:"EPCOT", country:"France", type:"Wine", name:"Bordeaux / Red Pour (if available)", location:"France pavilion", askFor:"Ask for a Bordeaux/red option." },
  { id:"fra-08", park:"EPCOT", country:"France", type:"Beer", name:"Kronenbourg 1664", location:"France pavilion", askFor:"Kronenbourg 1664." },
  { id:"fra-09", park:"EPCOT", country:"France", type:"Cocktail", name:"French 75 (if available)", location:"France pavilion", askFor:"Ask if a French 75-style cocktail is offered." },
  { id:"fra-10", park:"EPCOT", country:"France", type:"Spirits/Flight", name:"Champagne Flight (if available)", location:"France pavilion", askFor:"Ask if a champagne flight is available." },

  // =========================
  // UNITED KINGDOM (10)
  // =========================
  { id:"uk-01", park:"EPCOT", country:"United Kingdom", type:"Cocktail", name:"Pimm’s Cup", location:"Rose & Crown", askFor:"Pimm’s Cup." },
  { id:"uk-02", park:"EPCOT", country:"United Kingdom", type:"Cider", name:"Snake Bite (if available)", location:"Rose & Crown", askFor:"Ask if Snake Bite is available." },
  { id:"uk-03", park:"EPCOT", country:"United Kingdom", type:"Beer", name:"Harp Lager", location:"Rose & Crown", askFor:"Harp Lager." },
  { id:"uk-04", park:"EPCOT", country:"United Kingdom", type:"Beer", name:"Guinness (if available)", location:"Rose & Crown", askFor:"Ask if Guinness is available." },
  { id:"uk-05", park:"EPCOT", country:"United Kingdom", type:"Beer", name:"Bass Ale (if available)", location:"Rose & Crown", askFor:"Ask if Bass is on tap." },
  { id:"uk-06", park:"EPCOT", country:"United Kingdom", type:"Cider", name:"Strongbow Cider (if available)", location:"Rose & Crown", askFor:"Ask for Strongbow cider." },
  { id:"uk-07", park:"EPCOT", country:"United Kingdom", type:"Cocktail", name:"Welsh Dragon (if available)", location:"Rose & Crown", askFor:"Ask if Welsh Dragon is available." },
  { id:"uk-08", park:"EPCOT", country:"United Kingdom", type:"Wine", name:"Sparkling / Bubbly (if available)", location:"UK pavilion", askFor:"Ask for a sparkling wine option." },
  { id:"uk-09", park:"EPCOT", country:"United Kingdom", type:"Beer", name:"UK Pale Ale (Rotating)", location:"Rose & Crown", askFor:"Ask what pale ale is on rotation." },
  { id:"uk-10", park:"EPCOT", country:"United Kingdom", type:"Spirits/Flight", name:"Scotch / Whisky Pour (if available)", location:"UK pavilion", askFor:"Ask if there’s a Scotch/whisky pour." },

  // =========================
  // CANADA (10)
  // =========================
  { id:"can-01", park:"EPCOT", country:"Canada", type:"Cocktail", name:"Ottawa Apple", location:"Canada pavilion", askFor:"Ottawa Apple (classic Canada cocktail)." },
  { id:"can-02", park:"EPCOT", country:"Canada", type:"Wine", name:"Ice Wine (if available)", location:"Canada pavilion", askFor:"Ask if ice wine is available." },
  { id:"can-03", park:"EPCOT", country:"Canada", type:"Beer", name:"Moosehead Lager (if available)", location:"Canada pavilion", askFor:"Ask for Moosehead Lager." },
  { id:"can-04", park:"EPCOT", country:"Canada", type:"Beer", name:"Labatt Blue (if available)", location:"Canada pavilion", askFor:"Ask for Labatt Blue." },
  { id:"can-05", park:"EPCOT", country:"Canada", type:"Beer", name:"Canadian Craft Beer (Rotating)", location:"Canada pavilion", askFor:"Ask what Canadian craft beer is offered." },
  { id:"can-06", park:"EPCOT", country:"Canada", type:"Cocktail", name:"Maple Cocktail (pavilion style)", location:"Canada pavilion", askFor:"Ask for the maple-forward cocktail." },
  { id:"can-07", park:"EPCOT", country:"Canada", type:"Cocktail", name:"Crown & Apple (pavilion style)", location:"Canada pavilion", askFor:"Ask for a whisky + apple style drink." },
  { id:"can-08", park:"EPCOT", country:"Canada", type:"Cider", name:"Canadian Apple Cider (if available)", location:"Canada pavilion", askFor:"Ask if a Canadian cider is available." },
  { id:"can-09", park:"EPCOT", country:"Canada", type:"Wine", name:"Rosé (pavilion pour)", location:"Canada pavilion", askFor:"Ask for the rosé option." },
  { id:"can-10", park:"EPCOT", country:"Canada", type:"Spirits/Flight", name:"Ice Wine Flight (if available)", location:"Canada pavilion", askFor:"Ask if any ice wine tasting/flight is offered." },
];

// -------------------------
// APP STATE
// -------------------------
const state = loadState();

const els = {
  tabs: Array.from(document.querySelectorAll(".tab")),
  views: {
    browse: document.getElementById("viewBrowse"),
    checklist: document.getElementById("viewChecklist"),
    favorites: document.getElementById("viewFavorites"),
    info: document.getElementById("viewInfo"),
  },
  filterCountry: document.getElementById("filterCountry"),
  filterType: document.getElementById("filterType"),
  filterSearch: document.getElementById("filterSearch"),
  btnClearFilters: document.getElementById("btnClearFilters"),
  btnReset: document.getElementById("btnReset"),
  statusText: document.getElementById("statusText"),
  overallCompletion: document.getElementById("overallCompletion"),
  countryCompletion: document.getElementById("countryCompletion"),
};

init();

function init(){
  setupTabs();
  setupFilters();
  setupReset();
  renderAll();
  setStatus("Ready.");
}

function setupTabs(){
  els.tabs.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      els.tabs.forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");

      Object.values(els.views).forEach(v=>v.classList.remove("active"));
      els.views[btn.dataset.tab].classList.add("active");

      renderAll();
    });
  });
}

function setupFilters(){
  const countriesSet = new Set(DRINKS.map(d=>d.country));
  const countries = SHOWCASE_ORDER.filter(c => countriesSet.has(c));

  for(const c of countries){
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    els.filterCountry.appendChild(opt);
  }

  els.filterCountry.addEventListener("change", renderAll);
  els.filterType.addEventListener("change", renderAll);
  els.filterSearch.addEventListener("input", debounce(renderAll, 150));

  els.btnClearFilters.addEventListener("click", ()=>{
    els.filterCountry.value = "ALL";
    els.filterType.value = "ALL";
    els.filterSearch.value = "";
    renderAll();
  });
}

function setupReset(){
  els.btnReset.addEventListener("click", ()=>{
    const ok = confirm("Reset checklist, favorites, and photos on this device?");
    if(!ok) return;
    state.tried = {};
    state.favs = {};
    state.photos = {};
    saveState();
    renderAll();
    setStatus("Reset complete.");
  });
}

function renderAll(){
  const filtered = getFilteredDrinks();

  renderGrid(els.views.browse, filtered);
  renderGrid(els.views.checklist, filtered);
  renderGrid(els.views.favorites, filtered.filter(d => !!state.favs[d.id]));

  updateCompletionUI();
  saveState();
}

function getFilteredDrinks(){
  const country = els.filterCountry.value;
  const type = els.filterType.value;
  const q = (els.filterSearch.value || "").trim().toLowerCase();

  return DRINKS.filter(d=>{
    if(country !== "ALL" && d.country !== country) return false;
    if(type !== "ALL" && d.type !== type) return false;
    if(q){
      const hay = `${d.name} ${d.country} ${d.location} ${d.askFor} ${d.type}`.toLowerCase();
      if(!hay.includes(q)) return false;
    }
    return true;
  });
}

function renderGrid(rootEl, drinks){
  rootEl.innerHTML = "";

  if(!drinks.length){
    rootEl.innerHTML = `<div class="infoCard"><b>No results.</b> Try clearing filters.</div>`;
    return;
  }

  const wrap = document.createElement("div");
  wrap.className = "grid";

  const tpl = document.getElementById("drinkCardTpl");

  drinks.forEach(d=>{
    const node = tpl.content.cloneNode(true);

    const nameEl = node.querySelector(".drinkName");
    const metaEl = node.querySelector(".drinkMeta");
    const typePill = node.querySelector(".typePill");
    const countryPill = node.querySelector(".countryPill");
    const locPill = node.querySelector(".locPill");
    const askFor = node.querySelector(".askFor");

    const triedChk = node.querySelector(".triedChk");
    const starBtn = node.querySelector(".starBtn");
    const star = node.querySelector(".star");

    const photoBtn = node.querySelector(".photoBtn");
    const photoFile = node.querySelector(".photoFile");
    const photoWrap = node.querySelector(".photoPreviewWrap");
    const photoPreview = node.querySelector(".photoPreview");
    const removePhotoBtn = node.querySelector(".removePhotoBtn");

    nameEl.textContent = d.name;
    metaEl.textContent = `${d.country} • ${d.location}`;
    typePill.textContent = d.type;
    countryPill.textContent = d.country;
    locPill.textContent = d.location;
    askFor.textContent = d.askFor;

    // Tried
    triedChk.checked = !!state.tried[d.id];
    triedChk.addEventListener("change", ()=>{
      if(triedChk.checked) state.tried[d.id] = 1;
      else delete state.tried[d.id];
      setStatus(triedChk.checked ? "Checked off!" : "Unchecked.");
      saveState();
      updateCompletionUI();
    });

    // Favorite
    const isFav = !!state.favs[d.id];
    if(isFav){
      starBtn.classList.add("fav");
      star.textContent = "★";
    }
    starBtn.addEventListener("click", ()=>{
      const nowFav = !state.favs[d.id];
      if(nowFav) state.favs[d.id] = 1;
      else delete state.favs[d.id];
      setStatus(nowFav ? "Added to favorites." : "Removed from favorites.");
      saveState();
      renderAll(); // keeps Favorites tab accurate instantly
    });

    // Photo
    const photoData = state.photos[d.id];
    if(photoData){
      photoWrap.classList.remove("hidden");
      photoPreview.src = photoData;
    }

    photoBtn.addEventListener("click", ()=> photoFile.click());
    photoFile.addEventListener("change", async ()=>{
      const file = photoFile.files?.[0];
      if(!file) return;
      const dataUrl = await fileToDataURL(file);
      state.photos[d.id] = dataUrl;
      saveState();
      setStatus("Photo saved on this device.");
      renderAll();
    });

    removePhotoBtn.addEventListener("click", ()=>{
      delete state.photos[d.id];
      saveState();
      setStatus("Photo removed.");
      renderAll();
    });

    wrap.appendChild(node);
  });

  rootEl.appendChild(wrap);
}

function updateCompletionUI(){
  const total = DRINKS.length;
  const triedTotal = Object.values(state.tried).filter(Boolean).length;
  els.overallCompletion.textContent = `${triedTotal}/${total}`;

  const selected = els.filterCountry.value;
  if(selected === "ALL"){
    els.countryCompletion.textContent = "All Countries";
  } else {
    const countryDrinks = DRINKS.filter(d => d.country === selected);
    const triedCountry = countryDrinks.filter(d => !!state.tried[d.id]).length;
    els.countryCompletion.textContent = `${selected}: ${triedCountry}/${countryDrinks.length}`;
  }
}

function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return { tried:{}, favs:{}, photos:{} };
    const obj = JSON.parse(raw);
    return {
      tried: obj.tried || {},
      favs: obj.favs || {},
      photos: obj.photos || {}
    };
  }catch{
    return { tried:{}, favs:{}, photos:{} };
  }
}

function saveState(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function setStatus(msg){
  els.statusText.textContent = msg;
}

function debounce(fn, ms){
  let t;
  return (...args)=>{
    clearTimeout(t);
    t = setTimeout(()=>fn(...args), ms);
  };
}

function fileToDataURL(file){
  return new Promise((resolve, reject)=>{
    const r = new FileReader();
    r.onload = ()=> resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}
/* Phase One: EPCOT World Showcase ONLY
   - Filters work
   - Checklist saves
   - Favorites saves
   - Photo upload saves (local)
   - Backup export/import works
*/

const DRINKS = [
  // MEXICO (5–7)
  { id:"mex-avo", park:"EPCOT", country:"Mexico", type:"Cocktail", name:"Avocado Margarita", location:"La Cava del Tequila", askFor:"“Avocado Margarita” (the creamy avocado one)." },
  { id:"mex-cuc", park:"EPCOT", country:"Mexico", type:"Cocktail", name:"Cucumber Margarita", location:"La Cava del Tequila", askFor:"“Cucumber Margarita” (refreshing + crisp)." },
  { id:"mex-pec", park:"EPCOT", country:"Mexico", type:"Cocktail", name:"Pineapple Margarita (Pavilion Style)", location:"Outdoor bar near Mexico pavilion", askFor:"A pineapple-forward margarita (frozen if available)." },
  { id:"mex-pal", park:"EPCOT", country:"Mexico", type:"Cocktail", name:"Paloma (Grapefruit + Tequila)", location:"Mexico pavilion bar", askFor:"A tequila paloma / grapefruit tequila drink." },
  { id:"mex-hor", park:"EPCOT", country:"Mexico", type:"Frozen", name:"Horchata Margarita (if available)", location:"Mexico pavilion", askFor:"Ask if there’s a horchata-style margarita today." },
  { id:"mex-jal", park:"EPCOT", country:"Mexico", type:"Cocktail", name:"Jalapeño Margarita (Spicy)", location:"La Cava del Tequila", askFor:"Ask for the spicy/jalapeño margarita option (if offered today)." },
  { id:"mex-tam", park:"EPCOT", country:"Mexico", type:"Cocktail", name:"Tamarind Margarita (Sweet-Tart)", location:"La Cava del Tequila", askFor:"Ask if they have a tamarind margarita (sweet-tart) on the menu." },
  { id:"mex-pas", park:"EPCOT", country:"Mexico", type:"Cocktail", name:"Passion Fruit Margarita", location:"La Cava del Tequila", askFor:"Ask for a passion fruit margarita option (sometimes seasonal/rotating)." },
  { id:"mex-mzn", park:"EPCOT", country:"Mexico", type:"Frozen", name:"Frozen Mezcal Margarita (Smoky)", location:"Mexico Margarita Bar", askFor:"Ask for a mezcal-based margarita (smoky) — frozen if available." },
  { id:"mex-pbl", park:"EPCOT", country:"Mexico", type:"Cocktail", name:"Pineapple Mezcal (Smoky Pineapple)", location:"La Cava del Tequila", askFor:"Ask for a smoky pineapple mezcal cocktail (often a rotating specialty)." },

  // NORWAY
  { id:"nor-vik", park:"EPCOT", country:"Norway", type:"Cocktail", name:"Viking Coffee", location:"Kringla Bakeri / pavilion area", askFor:"“Viking Coffee” (coffee + spirits + cream)." },
  { id:"nor-fvk", park:"EPCOT", country:"Norway", type:"Frozen", name:"Frozen Viking Coffee (if available)", location:"Norway pavilion", askFor:"Ask if there’s a frozen version of Viking Coffee." },
  { id:"nor-ein", park:"EPCOT", country:"Norway", type:"Beer", name:"Einstök (Icelandic) Beer", location:"Norway pavilion drink stand", askFor:"Einstök beer options (varies by season)." },
  { id:"nor-aqu", park:"EPCOT", country:"Norway", type:"Cocktail", name:"Aquavit Cocktail (pavilion style)", location:"Norway pavilion bar", askFor:"Ask for an aquavit-based cocktail option." },
  { id:"nor-lin", park:"EPCOT", country:"Norway", type:"Cocktail", name:"Lingonberry Cocktail (pavilion style)", location:"Norway pavilion", askFor:"Ask for a lingonberry-forward cocktail option." },
  { id:"nor-vik2", park:"EPCOT", country:"Norway", type:"Cocktail", name:"Frozen Viking Coffee", location:"Kringla Bakeri og Kafe", askFor:"Ask specifically for the Frozen Viking Coffee version." },
  { id:"nor-lin2", park:"EPCOT", country:"Norway", type:"Cocktail", name:"Lingonberry Vodka Cocktail", location:"Norway Pavilion", askFor:"Ask for the lingonberry vodka cocktail option." },
  { id:"nor-aqu2", park:"EPCOT", country:"Norway", type:"Cocktail", name:"Aquavit & Tonic", location:"Norway Pavilion", askFor:"Ask for aquavit mixed with tonic or citrus." },
  { id:"nor-cid2", park:"EPCOT", country:"Norway", type:"Cider", name:"Nordic Apple Cider", location:"Norway Pavilion", askFor:"Ask what Nordic-style cider is available." },
  { id:"nor-bee2", park:"EPCOT", country:"Norway", type:"Beer", name:"Seasonal Scandinavian Beer", location:"Norway Pavilion", askFor:"Ask what Scandinavian beer is currently offered." },

  // CHINA
  { id:"chn-tdl", park:"EPCOT", country:"China", type:"Frozen", name:"Tipsy Ducks in Love", location:"Joy of Tea", askFor:"“Tipsy Ducks in Love” (tea + coffee + chocolate + spirits)." },
  { id:"chn-kfp", park:"EPCOT", country:"China", type:"Cocktail", name:"Kung Fu Punch (if available)", location:"China pavilion bar", askFor:"Ask if Kung Fu Punch is on the menu today." },
  { id:"chn-tsg", park:"EPCOT", country:"China", type:"Beer", name:"Tsingtao Beer", location:"China pavilion drink cart", askFor:"Tsingtao (lager) or seasonal options." },
  { id:"chn-plw", park:"EPCOT", country:"China", type:"Wine", name:"Plum Wine", location:"China pavilion", askFor:"Plum wine (served chilled)." },
  { id:"chn-lyc", park:"EPCOT", country:"China", type:"Cocktail", name:"Lychee Cocktail (pavilion style)", location:"China pavilion", askFor:"Ask for the lychee-based cocktail option." },
  { id:"chn-tdl2", park:"EPCOT", country:"China", type:"Frozen", name:"Tipsy Ducks in Love (Classic)", location:"Joy of Tea", askFor:"Ask for Tipsy Ducks in Love (coffee + tea + chocolate)." },
  { id:"chn-lyc2", park:"EPCOT", country:"China", type:"Cocktail", name:"Lychee Vodka Cocktail", location:"Joy of Tea", askFor:"Ask for the lychee vodka cocktail." },
  { id:"chn-kfp2", park:"EPCOT", country:"China", type:"Cocktail", name:"Kung Fu Punch", location:"Joy of Tea", askFor:"Ask if Kung Fu Punch is available today." },
  { id:"chn-plm2", park:"EPCOT", country:"China", type:"Wine", name:"Plum Wine", location:"China Pavilion", askFor:"Ask for chilled plum wine." },
  { id:"chn-tsg2", park:"EPCOT", country:"China", type:"Beer", name:"Tsingtao Lager", location:"China Pavilion Cart", askFor:"Ask for Tsingtao beer." },

    // GERMANY
  { id:"deu-sgf", park:"EPCOT", country:"Germany", type:"Beer", name:"Schöfferhofer Grapefruit Hefeweizen", location:"Germany Beer Cart", askFor:"“Schöfferhofer Grapefruit” (super popular)." },
  { id:"deu-pau", park:"EPCOT", country:"Germany", type:"Beer", name:"Paulaner Hefe-Weizen", location:"Germany Beer Cart", askFor:"Paulaner (classic wheat beer)." },
  { id:"deu-war", park:"EPCOT", country:"Germany", type:"Beer", name:"Warsteiner Pilsner", location:"Germany Beer Cart", askFor:"Warsteiner (pilsner)." },
  { id:"deu-rad", park:"EPCOT", country:"Germany", type:"Beer", name:"Radler (if available)", location:"Germany Beer Cart", askFor:"Ask if a Radler is available today." },
  { id:"deu-rie", park:"EPCOT", country:"Germany", type:"Wine", name:"Riesling (pavilion style)", location:"Germany pavilion", askFor:"A German Riesling pour (dry or semi-sweet)." },
  { id:"ger-grf2", park:"EPCOT", country:"Germany", type:"Beer", name:"Schöfferhofer Grapefruit Hefeweizen", location:"Germany Beer Cart", askFor:"Ask for Schöfferhofer Grapefruit." },
  { id:"ger-hef2", park:"EPCOT", country:"Germany", type:"Beer", name:"Paulaner Hefe-Weizen", location:"Germany Beer Cart", askFor:"Ask for Paulaner Hefe-Weizen." },
  { id:"ger-pil2", park:"EPCOT", country:"Germany", type:"Beer", name:"Warsteiner Pilsner", location:"Germany Beer Cart", askFor:"Ask for Warsteiner Pilsner." },
  { id:"ger-rad2", park:"EPCOT", country:"Germany", type:"Beer", name:"Radler (Beer + Lemonade)", location:"Germany Beer Cart", askFor:"Ask if a Radler is available." },
  { id:"ger-wne2", park:"EPCOT", country:"Germany", type:"Wine", name:"German Riesling", location:"Germany Pavilion", askFor:"Ask for a German Riesling." },
  
  // ITALY
  { id:"ita-lim", park:"EPCOT", country:"Italy", type:"Cocktail", name:"Limoncello Margarita (if available)", location:"Italy pavilion bar", askFor:"Ask if the Limoncello Margarita is available." },
  { id:"ita-bel", park:"EPCOT", country:"Italy", type:"Cocktail", name:"Bellini", location:"Italy pavilion", askFor:"“Bellini” (peach + sparkling wine)." },
  { id:"ita-apo", park:"EPCOT", country:"Italy", type:"Cocktail", name:"Aperol Spritz", location:"Italy pavilion", askFor:"Aperol Spritz (classic Italian)." },
  { id:"ita-per", park:"EPCOT", country:"Italy", type:"Beer", name:"Peroni", location:"Italy pavilion", askFor:"Peroni lager." },
  { id:"ita-pro", park:"EPCOT", country:"Italy", type:"Wine", name:"Prosecco", location:"Italy pavilion", askFor:"Prosecco (sparkling)." },
  { id:"ita-apo2", park:"EPCOT", country:"Italy", type:"Cocktail", name:"Aperol Spritz", location:"Italy Pavilion Bar", askFor:"Ask for an Aperol Spritz." },
  { id:"ita-bel2", park:"EPCOT", country:"Italy", type:"Cocktail", name:"Bellini", location:"Italy Pavilion Bar", askFor:"Ask for a peach Bellini." },
  { id:"ita-lim2", park:"EPCOT", country:"Italy", type:"Cocktail", name:"Limoncello Cocktail", location:"Italy Pavilion Bar", askFor:"Ask for the limoncello-based cocktail." },
  { id:"ita-pro2", park:"EPCOT", country:"Italy", type:"Wine", name:"Prosecco", location:"Italy Pavilion", askFor:"Ask for Prosecco." },
  { id:"ita-per2", park:"EPCOT", country:"Italy", type:"Beer", name:"Peroni Lager", location:"Italy Pavilion", askFor:"Ask for Peroni." },
 
   // AMERICA (The American Adventure)
  { id:"usa-mss", park:"EPCOT", country:"American Adventure", type:"Cocktail", name:"Moonshine Sour (pavilion style)", location:"American pavilion", askFor:"Ask for the moonshine sour / featured moonshine drink." },
  { id:"usa-ten", park:"EPCOT", country:"American Adventure", type:"Cocktail", name:"Tennessee Lemonade (pavilion style)", location:"American pavilion", askFor:"Ask for a Tennessee lemonade (whiskey + lemonade style)." },
  { id:"usa-bou", park:"EPCOT", country:"American Adventure", type:"Cocktail", name:"Bourbon Smash (pavilion style)", location:"American pavilion", askFor:"Ask for the bourbon smash / seasonal bourbon cocktail." },
  { id:"usa-cra", park:"EPCOT", country:"American Adventure", type:"Cider", name:"Hard Cider (seasonal)", location:"American pavilion", askFor:"Ask what hard cider is available today." },
  { id:"usa-flt", park:"EPCOT", country:"American Adventure", type:"Beer", name:"US Craft Beer (rotating)", location:"American pavilion", askFor:"Ask for the rotating craft beer option." },
  { id:"usa-msh2", park:"EPCOT", country:"American Adventure", type:"Cocktail", name:"Moonshine Sour", location:"American Pavilion", askFor:"Ask for the featured moonshine sour." },
  { id:"usa-ten2", park:"EPCOT", country:"American Adventure", type:"Cocktail", name:"Tennessee Lemonade", location:"American Pavilion", askFor:"Ask for Tennessee Lemonade." },
  { id:"usa-bbn2", park:"EPCOT", country:"American Adventure", type:"Cocktail", name:"Bourbon Smash", location:"American Pavilion", askFor:"Ask for the bourbon smash." },
  { id:"usa-cft2", park:"EPCOT", country:"American Adventure", type:"Beer", name:"American Craft Beer", location:"American Pavilion", askFor:"Ask what craft beer is on rotation." },
  { id:"usa-cdr2", park:"EPCOT", country:"American Adventure", type:"Cider", name:"American Hard Cider", location:"American Pavilion", askFor:"Ask what hard cider is available." },
 
   // JAPAN
  { id:"jpn-tok", park:"EPCOT", country:"Japan", type:"Cocktail", name:"Tokyo Sunset", location:"Japan pavilion bar", askFor:"“Tokyo Sunset” (sweet + citrusy cocktail)." },
  { id:"jpn-vio", park:"EPCOT", country:"Japan", type:"Cocktail", name:"Violet Sake", location:"Japan pavilion bar", askFor:"“Violet Sake” cocktail." },
  { id:"jpn-yuz", park:"EPCOT", country:"Japan", type:"Frozen", name:"Yuzu Citrus Slush (if available)", location:"Japan pavilion", askFor:"Ask if there’s a yuzu citrus slush today." },
  { id:"jpn-kir", park:"EPCOT", country:"Japan", type:"Beer", name:"Kirin Ichiban", location:"Japan pavilion", askFor:"Kirin Ichiban (lager)." },
  { id:"jpn-sak", park:"EPCOT", country:"Japan", type:"Wine", name:"Sake Flight (if available)", location:"Japan pavilion", askFor:"Ask if a sake flight is available." },
  { id:"jpn-tok2", park:"EPCOT", country:"Japan", type:"Cocktail", name:"Tokyo Sunset", location:"Japan Pavilion Bar", askFor:"Ask for the Tokyo Sunset cocktail." },
  { id:"jpn-vio2", park:"EPCOT", country:"Japan", type:"Cocktail", name:"Violet Sake", location:"Japan Pavilion Bar", askFor:"Ask for Violet Sake." },
  { id:"jpn-yuz2", park:"EPCOT", country:"Japan", type:"Frozen", name:"Yuzu Citrus Slush", location:"Japan Pavilion", askFor:"Ask if the yuzu citrus slush is available." },
  { id:"jpn-kir2", park:"EPCOT", country:"Japan", type:"Beer", name:"Kirin Ichiban", location:"Japan Pavilion", askFor:"Ask for Kirin Ichiban." },
  { id:"jpn-sak2", park:"EPCOT", country:"Japan", type:"Wine", name:"Sake Flight", location:"Japan Pavilion", askFor:"Ask if a sake flight is offered." },
  
  // MOROCCO
  { id:"mar-pom", park:"EPCOT", country:"Morocco", type:"Cocktail", name:"Pomegranate Mimosa", location:"Morocco pavilion bar", askFor:"“Pomegranate Mimosa” (super common favorite)." },
  { id:"mar-sng", park:"EPCOT", country:"Morocco", type:"Wine", name:"Moroccan Sangria (if available)", location:"Morocco pavilion", askFor:"Ask if sangria is available today." },
  { id:"mar-mul", park:"EPCOT", country:"Morocco", type:"Cocktail", name:"Moroccan Mule (pavilion style)", location:"Morocco pavilion", askFor:"Ask for the mule-style cocktail in Morocco." },
  { id:"mar-cas", park:"EPCOT", country:"Morocco", type:"Beer", name:"Casablanca Beer (if available)", location:"Morocco pavilion", askFor:"Ask if Casablanca beer is available." },
  { id:"mar-ros", park:"EPCOT", country:"Morocco", type:"Wine", name:"Rosé (pavilion pour)", location:"Morocco pavilion", askFor:"Ask for the rosé wine option." },
  { id:"mar-pom2", park:"EPCOT", country:"Morocco", type:"Cocktail", name:"Pomegranate Mimosa", location:"Morocco Pavilion", askFor:"Ask for the pomegranate mimosa." },
  { id:"mar-mul2", park:"EPCOT", country:"Morocco", type:"Cocktail", name:"Moroccan Mule", location:"Morocco Pavilion", askFor:"Ask for the Moroccan Mule." },
  { id:"mar-sng2", park:"EPCOT", country:"Morocco", type:"Wine", name:"Moroccan Sangria", location:"Morocco Pavilion", askFor:"Ask if sangria is available." },
  { id:"mar-ros2", park:"EPCOT", country:"Morocco", type:"Wine", name:"Moroccan Rosé", location:"Morocco Pavilion", askFor:"Ask for rosé wine." },
  { id:"mar-bee2", park:"EPCOT", country:"Morocco", type:"Beer", name:"Moroccan Beer", location:"Morocco Pavilion", askFor:"Ask what Moroccan beer is offered." },
 
   // FRANCE
  { id:"fra-gms", park:"EPCOT", country:"France", type:"Frozen", name:"Grand Marnier Orange Slush", location:"France slush stand", askFor:"“Grand Marnier Slush” (the classic)." },
  { id:"fra-gys", park:"EPCOT", country:"France", type:"Frozen", name:"Grey Goose Citron Slush", location:"France slush stand", askFor:"Grey Goose slush (lemon/citrus style)." },
  { id:"fra-kir", park:"EPCOT", country:"France", type:"Wine", name:"Kir Royale (if available)", location:"France pavilion", askFor:"Ask if Kir Royale is available." },
  { id:"fra-166", park:"EPCOT", country:"France", type:"Beer", name:"Kronenbourg 1664", location:"France pavilion", askFor:"Kronenbourg 1664 (French beer)." },
  { id:"fra-chm", park:"EPCOT", country:"France", type:"Wine", name:"Champagne (pavilion pour)", location:"France pavilion", askFor:"Ask for champagne / sparkling wine." },
  { id:"fra-gms2", park:"EPCOT", country:"France", type:"Frozen", name:"Grand Marnier Orange Slush", location:"France Slush Stand", askFor:"Ask for the Grand Marnier slush." },
  { id:"fra-gys2", park:"EPCOT", country:"France", type:"Frozen", name:"Grey Goose Citron Slush", location:"France Slush Stand", askFor:"Ask for the Grey Goose citron slush." },
  { id:"fra-kir2", park:"EPCOT", country:"France", type:"Wine", name:"Kir Royale", location:"France Pavilion", askFor:"Ask if Kir Royale is available." },
  { id:"fra-chm2", park:"EPCOT", country:"France", type:"Wine", name:"Champagne", location:"France Pavilion", askFor:"Ask for champagne." },
  { id:"fra-1662", park:"EPCOT", country:"France", type:"Beer", name:"Kronenbourg 1664", location:"France Pavilion", askFor:"Ask for Kronenbourg 1664." },
  
  // UNITED KINGDOM
  { id:"uk-pim", park:"EPCOT", country:"United Kingdom", type:"Cocktail", name:"Pimm’s Cup", location:"UK pavilion pub/bar", askFor:"“Pimm’s Cup” (classic UK pavilion favorite)." },
  { id:"uk-sna", park:"EPCOT", country:"United Kingdom", type:"Cider", name:"Snake Bite (if available)", location:"UK pavilion pub/bar", askFor:"Ask if Snake Bite is offered today." },
  { id:"uk-har", park:"EPCOT", country:"United Kingdom", type:"Beer", name:"Harp Lager", location:"UK pavilion pub/bar", askFor:"Harp Lager." },
  { id:"uk-bas", park:"EPCOT", country:"United Kingdom", type:"Beer", name:"Bass Ale (if available)", location:"UK pavilion pub/bar", askFor:"Ask if Bass is on tap today." },
  { id:"uk-cid", park:"EPCOT", country:"United Kingdom", type:"Cider", name:"Strongbow Cider (if available)", location:"UK pavilion pub/bar", askFor:"Ask if Strongbow is available." },
  { id:"uk-pim2", park:"EPCOT", country:"United Kingdom", type:"Cocktail", name:"Pimm’s Cup", location:"Rose & Crown", askFor:"Ask for Pimm’s Cup." },
  { id:"uk-snk2", park:"EPCOT", country:"United Kingdom", type:"Cider", name:"Snake Bite", location:"Rose & Crown", askFor:"Ask if Snake Bite is available." },
  { id:"uk-har2", park:"EPCOT", country:"United Kingdom", type:"Beer", name:"Harp Lager", location:"Rose & Crown", askFor:"Ask for Harp Lager." },
  { id:"uk-bas2", park:"EPCOT", country:"United Kingdom", type:"Beer", name:"Bass Ale", location:"Rose & Crown", askFor:"Ask if Bass Ale is on tap." },
  { id:"uk-str2", park:"EPCOT", country:"United Kingdom", type:"Cider", name:"Strongbow Cider", location:"Rose & Crown", askFor:"Ask for Strongbow." },
  
  // CANADA
  { id:"can-ott", park:"EPCOT", country:"Canada", type:"Cocktail", name:"Ottawa Apple", location:"Canada pavilion bar", askFor:"“Ottawa Apple” (the classic Canada cocktail)." },
  { id:"can-ice", park:"EPCOT", country:"Canada", type:"Wine", name:"Ice Wine (if available)", location:"Canada pavilion", askFor:"Ask if they’re serving ice wine." },
  { id:"can-moo", park:"EPCOT", country:"Canada", type:"Beer", name:"Moosehead Lager (if available)", location:"Canada pavilion", askFor:"Ask if Moosehead is available today." },
  { id:"can-lab", park:"EPCOT", country:"Canada", type:"Beer", name:"Labatt Blue (if available)", location:"Canada pavilion", askFor:"Ask if Labatt is available." },
  { id:"can-map", park:"EPCOT", country:"Canada", type:"Cocktail", name:"Maple Cocktail (pavilion style)", location:"Canada pavilion", askFor:"Ask for the maple-forward cocktail option." },
  { id:"can-ott2", park:"EPCOT", country:"Canada", type:"Cocktail", name:"Ottawa Apple", location:"Canada Pavilion", askFor:"Ask for the Ottawa Apple." },
  { id:"can-ice2", park:"EPCOT", country:"Canada", type:"Wine", name:"Ice Wine", location:"Canada Pavilion", askFor:"Ask if ice wine is available." },
  { id:"can-moo2", park:"EPCOT", country:"Canada", type:"Beer", name:"Moosehead Lager", location:"Canada Pavilion", askFor:"Ask for Moosehead Lager." },
  { id:"can-lab2", park:"EPCOT", country:"Canada", type:"Beer", name:"Labatt Blue", location:"Canada Pavilion", askFor:"Ask for Labatt Blue." },
  { id:"can-map2", park:"EPCOT", country:"Canada", type:"Cocktail", name:"Maple Cocktail", location:"Canada Pavilion", askFor:"Ask for the maple-forward cocktail." },
];

const STORAGE_KEY = "ws_passport_v1";

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
  statusText: document.getElementById("statusText"),


  btnReset: document.getElementById("btnReset"),
};

init();

function init(){
  setupTabs();
  setupFilters();
  renderAll();
  setStatus("Ready.");
}

function setupTabs(){
  els.tabs.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      els.tabs.forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");

      Object.values(els.views).forEach(v=>v.classList.remove("active"));
      const id = btn.dataset.tab;
      els.views[id].classList.add("active");

      // re-render the specific view for safety
      renderAll();
    });
  });
}

function setupFilters(){
  // Build country list (all 11)
  const countries = Array.from(new Set(DRINKS.map(d=>d.country)));
  countries.sort((a,b)=>a.localeCompare(b));

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


  els.btnReset.addEventListener("click", ()=>{
    const ok = confirm("Reset everything (checklist, favorites, photos)?");
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

  renderGrid(els.views.browse, filtered, {mode:"browse"});
  renderGrid(els.views.checklist, filtered, {mode:"checklist"});

  const favs = filtered.filter(d => !!state.favs[d.id]);
  renderGrid(els.views.favorites, favs, {mode:"favorites"});

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

function renderGrid(rootEl, drinks, {mode}){
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

    const card = node.querySelector(".card");
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

    // tried state
    triedChk.checked = !!state.tried[d.id];
    triedChk.addEventListener("change", ()=>{
      state.tried[d.id] = triedChk.checked ? 1 : 0;
      setStatus(triedChk.checked ? "Checked off!" : "Unchecked.");
      saveState();
      // If in favorites view, keep stable
      renderAll();
    });

    // favorite state
    const isFav = !!state.favs[d.id];
    if(isFav){
      starBtn.classList.add("fav");
      star.textContent = "★";
    }
    starBtn.addEventListener("click", ()=>{
      const nowFav = !state.favs[d.id];
      state.favs[d.id] = nowFav ? 1 : 0;
      if(!nowFav) delete state.favs[d.id];
      setStatus(nowFav ? "Added to favorites." : "Removed from favorites.");
      saveState();
      renderAll();
    });

    // photo state
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

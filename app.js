// ── Themes ───────────────────────────────────────────────────────────────────
const THEMES = {
  teamrocket:   { label:"Team Rocket",    emoji:"🚀", color:"#E63946" },
  eeveelutions: { label:"Eeveelutions",   emoji:"🌈", color:"#C084FC" },
  pink:         { label:"Pink Page",      emoji:"🩷", color:"#FFAFCC" },
  green:        { label:"Green & Nature", emoji:"🌿", color:"#34D399" },
  psyduck:      { label:"Psyduck",        emoji:"🦆", color:"#FFE135" },
  pikachu:      { label:"Pikachu",        emoji:"⚡", color:"#FFE135" },
  sleeping:     { label:"Sleeping",       emoji:"💤", color:"#818CF8" },
  water:        { label:"Water & Ocean",  emoji:"🌊", color:"#48CAE4" },
};

const RARITY_COLORS = {
  "Special Illustration Rare":"#F59E0B","Hyper Rare":"#FFAFCC",
  "Illustration Rare":"#818CF8","Art Rare":"#34D399","Ultra Rare":"#48CAE4",
  "Double Rare":"#60A5FA","Super Rare":"#A78BFA","ACE SPEC Rare":"#F472B6",
  "Shiny Ultra Rare":"#E879F9","Shiny Rare":"#C084FC","Trainer Gallery":"#F97316",
  "Amazing Rare":"#10B981","Radiant Rare":"#FCD34D","Triple Rare":"#FBBF24",
  "Character Rare":"#F87171","Character Super Rare":"#FB923C",
  "Special Art Rare":"#818CF8","K Rare":"#A3E635","Promo":"#C084FC",
  "Rare Holo":"#94A3B8","Rare":"#94A3B8","Uncommon":"#6EE7B7","Common":"#64748B",
  "Shiny Rare (CN)":"#C084FC","Art Rare (CN)":"#34D399","RR (CN)":"#60A5FA",
};

// ── Theme keywords for auto-suggest ──────────────────────────────────────────
const THEME_KEYWORDS = {
  teamrocket:   ["rocket","giovanni","jessie","james","meowth","ariana","petrel","archer","grunt","n's","iono","zoroark","houndoom","weezing","raticate","dugtrio","zapdos","wobbuffet","mimikyu","spidops"],
  eeveelutions: ["eevee","vaporeon","jolteon","flareon","espeon","umbreon","leafeon","glaceon","sylveon"],
  pink:         ["clefairy","clefable","wigglytuff","jigglypuff","snubbull","flaaffy","mew","chansey","blissey","meloetta","flamigo","swablu","mr. mime","exeggcute","starmie","fezandipiti","lillie"],
  green:        ["bulbasaur","ivysaur","venusaur","tangela","chikorita","applin","dolliv","budew","roselia","roserade","shuckle","starly","forest","venomoth","oddish","bellsprout"],
  psyduck:      ["psyduck","golduck","misty"],
  pikachu:      ["pikachu","pichu","raichu","pachirisu","emolga","dedenne"],
  sleeping:     ["snorlax","slakoth","slaking","jigglypuff","drowzee","hypno","komala","skwovet","lechonk","hoothoot","noctowl","vulpix","magby"],
  water:        ["poliwhirl","poliwrath","horsea","seadra","vaporeon","lapras","wailord","wailmer","piplup","prinplup","empoleon","goldeen","seaking","suicune","articuno","drampa","primarina","frogadier"],
};

function suggestTheme(cardName) {
  if (!cardName) return null;
  const lower = cardName.toLowerCase();
  for (const [theme, keywords] of Object.entries(THEME_KEYWORDS)) {
    if (keywords.some(kw => lower.includes(kw))) return theme;
  }
  return null;
}

// ── Default pages with varied span layouts ────────────────────────────────────
const DEFAULT_PAGES = [
  { id:1, theme:"teamrocket", label:"Team Rocket — Page 1", pct:0, slots:[
    {type:"print",name:"Team Rocket hideout art",search:"Team Rocket hideout Pokemon anime art",url:"",span:{cols:1,rows:2}},
    {type:"card",name:"Team Rocket's Giovanni",cardId:null},
    {type:"card",name:"Team Rocket's Ariana",cardId:null},
    {type:"card",name:"Team Rocket's Meowth",cardId:null},
    {type:"span",anchorIdx:0},
    {type:"card",name:"N's Zoroark ex",cardId:null},
    {type:"card",name:"Team Rocket's Mimikyu",cardId:null},
    {type:"card",name:"Team Rocket's Houndoom",cardId:null},
    {type:"card",name:"Houndour IR",cardId:null},
    {type:"card",name:"Mightyena IR",cardId:null},
    {type:"print",name:"Jessie James Meowth art",search:"Jessie James Meowth Team Rocket anime art",url:"",span:{cols:2,rows:1}},
    {type:"span",anchorIdx:10},
  ]},
  { id:2, theme:"teamrocket", label:"Team Rocket — Page 2", pct:0, slots:[
    {type:"card",name:"Team Rocket's Dugtrio",cardId:null},
    {type:"card",name:"Team Rocket's Wobbuffet",cardId:null},
    {type:"card",name:"Team Rocket's Petrel",cardId:null},
    {type:"card",name:"Team Rocket's Raticate",cardId:null},
    {type:"print",name:"Team Rocket blasting off",search:"Team Rocket blasting off sky anime art",url:"",span:{cols:4,rows:1}},
    {type:"span",anchorIdx:4},
    {type:"span",anchorIdx:4},
    {type:"span",anchorIdx:4},
    {type:"card",name:"N's Reshiram",cardId:null},
    {type:"card",name:"N's Zekrom",cardId:null},
    {type:"card",name:"Team Rocket's Zapdos",cardId:null},
    {type:"card",name:"Team Rocket's Spidops",cardId:null},
  ]},
  { id:3, theme:"eeveelutions", label:"Eeveelutions", pct:0, slots:[
    {type:"print",name:"All Eeveelutions panorama",search:"all eeveelutions group illustration art",url:"",span:{cols:2,rows:2}},
    {type:"span",anchorIdx:0},
    {type:"card",name:"Leafeon IR",cardId:null},
    {type:"card",name:"Eevee Full Art",cardId:null},
    {type:"span",anchorIdx:0},
    {type:"span",anchorIdx:0},
    {type:"card",name:"Eevee Promo",cardId:null},
    {type:"card",name:"Espeon IR",cardId:null},
    {type:"print",name:"Espeon Umbreon moonlight",search:"Espeon Umbreon together moonlight illustration art",url:"",span:{cols:2,rows:1}},
    {type:"span",anchorIdx:8},
    {type:"card",name:"Umbreon IR",cardId:null},
    {type:"card",name:"Vaporeon IR",cardId:null},
  ]},
  { id:4, theme:"pink", label:"Pink Page", pct:0, slots:[
    {type:"card",name:"Clefairy IR",cardId:null},
    {type:"card",name:"Wigglytuff IR",cardId:null},
    {type:"card",name:"Meloetta IR",cardId:null},
    {type:"card",name:"Flamigo IR",cardId:null},
    {type:"card",name:"Swablu IR",cardId:null},
    {type:"card",name:"Exeggcute IR",cardId:null},
    {type:"print",name:"Clefairy moon art",search:"Clefairy moon night pink pastel illustration",url:"",span:{cols:2,rows:1}},
    {type:"span",anchorIdx:6},
    {type:"card",name:"Mr. Mime IR",cardId:null},
    {type:"card",name:"Fezandipiti ex",cardId:null},
    {type:"print",name:"Lillie pink floral art",search:"Lillie Pokemon trainer pink floral illustration",url:"",span:{cols:2,rows:1}},
    {type:"span",anchorIdx:10},
  ]},
  { id:5, theme:"green", label:"Green & Nature", pct:0, slots:[
    {type:"card",name:"Bulbasaur IR",cardId:null},
    {type:"print",name:"Venusaur forest art",search:"Venusaur lush forest botanical illustration",url:"",span:{cols:3,rows:1}},
    {type:"span",anchorIdx:1},
    {type:"span",anchorIdx:1},
    {type:"card",name:"Tangela IR",cardId:null},
    {type:"card",name:"Forest of Vitality",cardId:null},
    {type:"card",name:"Applin IR",cardId:null},
    {type:"card",name:"Dolliv IR",cardId:null},
    {type:"print",name:"Chikorita meadow art",search:"Chikorita meadow Gen 2 illustration art",url:"",span:{cols:2,rows:1}},
    {type:"span",anchorIdx:8},
    {type:"card",name:"Budew IR",cardId:null},
    {type:"card",name:"Snorunt IR",cardId:null},
  ]},
  { id:6, theme:"psyduck", label:"Psyduck", pct:0, slots:[
    {type:"card",name:"Psyduck Art Rare",cardId:null},
    {type:"print",name:"Psyduck rainy day art",search:"Psyduck rain puddle sad melancholy aesthetic illustration",url:"",span:{cols:3,rows:1}},
    {type:"span",anchorIdx:1},
    {type:"span",anchorIdx:1},
    {type:"print",name:"Psyduck headache art",search:"Psyduck headache confused cute art",url:"",span:{cols:2,rows:1}},
    {type:"span",anchorIdx:4},
    {type:"print",name:"Misty and Psyduck art",search:"Misty Psyduck Pokemon anime together illustration",url:"",span:{cols:2,rows:1}},
    {type:"span",anchorIdx:6},
    {type:"print",name:"Psyduck bathtub art",search:"Psyduck bathtub rubber duck cute cozy art",url:"",span:{cols:2,rows:1}},
    {type:"span",anchorIdx:8},
    {type:"print",name:"Psyduck vintage retro art",search:"Psyduck vintage retro 90s anime style illustration",url:"",span:{cols:2,rows:1}},
    {type:"span",anchorIdx:10},
  ]},
  { id:7, theme:"pikachu", label:"Pikachu", pct:0, slots:[
    {type:"card",name:"Pikachu ex UR",cardId:null},
    {type:"card",name:"Surfing Pikachu VMAX",cardId:null},
    {type:"print",name:"Pikachu forest sitting",search:"Pikachu sitting forest peaceful illustration art",url:"",span:{cols:2,rows:2}},
    {type:"span",anchorIdx:2},
    {type:"card",name:"Pachirisu IR",cardId:null},
    {type:"card",name:"Pikachu Shiny",cardId:null},
    {type:"span",anchorIdx:2},
    {type:"span",anchorIdx:2},
    {type:"print",name:"Pikachu Ash together",search:"Pikachu Ash Ketchum together anime illustration art",url:"",span:{cols:4,rows:1}},
    {type:"span",anchorIdx:8},
    {type:"span",anchorIdx:8},
    {type:"span",anchorIdx:8},
  ]},
  { id:8, theme:"sleeping", label:"Sleeping Pokémon", pct:0, slots:[
    {type:"card",name:"Snorlax Promo",cardId:null},
    {type:"card",name:"Skwovet IR",cardId:null},
    {type:"card",name:"Slakoth IR",cardId:null},
    {type:"card",name:"Lechonk IR",cardId:null},
    {type:"card",name:"Vulpix IR",cardId:null},
    {type:"card",name:"Magby IR",cardId:null},
    {type:"card",name:"Hoothoot IR",cardId:null},
    {type:"print",name:"Snorlax cozy sleeping",search:"Snorlax sleeping cozy forest illustration",url:"",span:{cols:1,rows:2}},
    {type:"print",name:"Jigglypuff singing art",search:"Jigglypuff singing everyone sleeping art",url:"",span:{cols:2,rows:1}},
    {type:"span",anchorIdx:8},
    {type:"print",name:"Eevee sleeping art",search:"Eevee sleeping cozy blanket illustration",url:"",span:{cols:1,rows:1}},
    {type:"span",anchorIdx:7},
  ]},
  { id:9, theme:"water", label:"Water & Ocean", pct:0, slots:[
    {type:"card",name:"Poliwhirl IR",cardId:null},
    {type:"card",name:"Horsea IR",cardId:null},
    {type:"card",name:"Wailord ex",cardId:null},
    {type:"card",name:"Drampa AR",cardId:null},
    {type:"print",name:"Ocean Pokémon panorama",search:"ocean Pokemon underwater illustration panorama art",url:"",span:{cols:2,rows:1}},
    {type:"span",anchorIdx:4},
    {type:"card",name:"Primarina AR",cardId:null},
    {type:"card",name:"Goldeen IR",cardId:null},
    {type:"card",name:"Piplup IR",cardId:null},
    {type:"card",name:"Suicune Promo",cardId:null},
    {type:"print",name:"Lapras ocean portrait",search:"Lapras ocean sunset sailing illustration",url:"",span:{cols:2,rows:1}},
    {type:"span",anchorIdx:10},
  ]},
];

// Load any custom themes saved by user
try {
  const custom = JSON.parse(localStorage.getItem("michi_custom_themes") || "{}");
  Object.assign(THEMES, custom);
} catch(e) {}

// ── State ────────────────────────────────────────────────────────────────────
function loadState() {
  try {
    const pages      = JSON.parse(localStorage.getItem("michi_pages") || "null");
    const collection = JSON.parse(localStorage.getItem("michi_collection") || "[]");
    return { pages: pages || DEFAULT_PAGES, collection };
  } catch(e) { return { pages: DEFAULT_PAGES, collection: [] }; }
}
function saveState() {
  localStorage.setItem("michi_pages",      JSON.stringify(state.pages));
  localStorage.setItem("michi_collection", JSON.stringify(state.collection));
}
const state = loadState();
let currentPage = 0;
let editingSlot = null;

// ── Helpers ──────────────────────────────────────────────────────────────────
function rc(rarity) { return RARITY_COLORS[rarity] || "#6B6B8F"; }
function tc(theme)  { return THEMES[theme]?.color  || "#818CF8"; }
function te(theme)  { return THEMES[theme]?.emoji  || "📄"; }
function getCardById(id) { return state.collection.find(c => c.id === id); }

function getAnchorSlot(slots, slot) {
  return slot.type === "span" ? slots[slot.anchorIdx] : slot;
}
function cardDisplayName(slot) {
  if (slot.type === "span") return "";
  if (slot.cardId) { const c = getCardById(slot.cardId); return c ? c.name : slot.name; }
  return slot.name || "";
}
function slotImage(slot) {
  if (slot.cardId) { const c = getCardById(slot.cardId); return c?.image || null; }
  if (slot.type === "print" && slot.url) return slot.url;
  return null;
}
function slotLabel(slot) {
  if (slot.cardId) { const c = getCardById(slot.cardId); return c ? c.name : slot.name; }
  return slot.name || "";
}
function calcPct(pg) {
  const nonSpan = pg.slots.filter(s => s.type !== "span");
  const filled  = nonSpan.filter(s => s.type === "card" || (s.type === "print" && s.url)).length;
  return Math.round((filled / nonSpan.length) * 100);
}
function showToast(msg) {
  const t = document.createElement("div");
  t.className = "toast"; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}
function innerFallback(slot, i) {
  const icon = slot.type === "print" ? "🖨️" : slot.type === "card" ? "🃏" : "＋";
  const name = slotLabel(slot) || ("slot " + (i + 1));
  return `<div class="pocket-inner"><div class="pocket-icon">${icon}</div><div class="pocket-name">${name.split(" ").slice(0,4).join(" ")}</div></div>`;
}

// ── Tab switching ────────────────────────────────────────────────────────────
document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
  });
});

// ── Page management ──────────────────────────────────────────────────────────
function deletePage(pageIdx) {
  if (state.pages.length <= 1) { showToast("Can't delete the last page"); return; }
  if (!confirm('Delete "' + state.pages[pageIdx].label + '" page?')) return;
  state.pages.splice(pageIdx, 1);
  if (currentPage >= state.pages.length) currentPage = state.pages.length - 1;
  saveState(); renderPages();
}

function addPage(themeId) {
  const theme = THEMES[themeId]; if (!theme) return;
  const newId = Math.max(...state.pages.map(p => p.id)) + 1;
  state.pages.push({ id:newId, theme:themeId, label:theme.label, pct:0,
    slots: Array(12).fill(null).map(() => ({ type:"empty" })) });
  currentPage = state.pages.length - 1;
  saveState(); renderPages();
  showToast(theme.emoji + " " + theme.label + " page added");
}

function openAddPageModal() {
  const modal = document.getElementById("add-page-modal");
  const grid  = document.getElementById("add-page-theme-grid");
  const createDiv = document.getElementById("add-page-create-theme");
  grid.innerHTML = "";

  // Find themes with unassigned cards (suggest at top)
  const assignedIds = new Set();
  state.pages.forEach(pg => pg.slots.forEach(s => { if (s.cardId) assignedIds.add(s.cardId); }));
  const waiting = {};
  state.collection.forEach(c => {
    if (c.theme && !assignedIds.has(c.id)) waiting[c.theme] = (waiting[c.theme]||0) + 1;
  });

  // Suggested themes first
  const suggested = Object.entries(waiting).sort((a,b)=>b[1]-a[1]).map(([id])=>id);
  const allThemes = [...new Set([...suggested, ...Object.keys(THEMES)])];

  allThemes.forEach(id => {
    const theme = THEMES[id]; if (!theme) return;
    const count = waiting[id] || 0;
    const btn = document.createElement("button");
    btn.style.cssText = `display:flex;flex-direction:column;align-items:center;padding:10px 6px;border:2px solid ${theme.color};color:${theme.color};background:${count>0?theme.color+"22":"transparent"};border-radius:10px;cursor:pointer;gap:3px;font-size:11px;font-weight:600;position:relative`;
    btn.innerHTML = `<span style="font-size:20px">${theme.emoji}</span>${theme.label}${count>0?`<span style="font-size:9px;opacity:0.8">${count} waiting</span>`:""}`;
    btn.addEventListener("click", () => { modal.classList.add("hidden"); addPage(id); });
    grid.appendChild(btn);
  });

  // Create new theme section
  if (createDiv) createDiv.style.display = "block";

  document.getElementById("add-page-backdrop").onclick = () => modal.classList.add("hidden");
  document.getElementById("new-theme-cancel").onclick  = () => modal.classList.add("hidden");
  document.getElementById("new-theme-create").onclick  = () => {
    const label = document.getElementById("new-theme-name").value.trim();
    const emoji = document.getElementById("new-theme-emoji-input").value.trim() || "⭐";
    const color = document.getElementById("new-theme-color-input").value;
    if (!label) { showToast("Enter a theme name"); return; }
    const id = label.toLowerCase().replace(/[^a-z0-9]/g,"");
    if (THEMES[id]) { showToast("Theme already exists"); return; }
    THEMES[id] = { label, emoji, color };
    try { localStorage.setItem("michi_custom_themes", JSON.stringify(THEMES)); } catch(e){}
    modal.classList.add("hidden");
    addPage(id);
  };
  modal.classList.remove("hidden");
}

// ── Auto-arrange ─────────────────────────────────────────────────────────────
function autoSlotCollection() {
  if (!state.collection.length) { showToast("Upload some cards first!"); return; }
  const used = new Set();
  // Sort cards by price descending within each theme
  const byTheme = {};
  state.collection.forEach(c => {
    if (!c.theme) return;
    if (!byTheme[c.theme]) byTheme[c.theme] = [];
    byTheme[c.theme].push(c);
  });
  Object.values(byTheme).forEach(arr => arr.sort((a,b) => parseFloat(b.price||0) - parseFloat(a.price||0)));
  // Assign to pages
  state.pages.forEach(pg => {
    const cards = byTheme[pg.theme] || [];
    let ci = 0;
    pg.slots.forEach((slot, i) => {
      if (slot.type !== "card") return;
      while (ci < cards.length && used.has(cards[ci].id)) ci++;
      if (ci < cards.length) {
        slot.cardId = cards[ci].id;
        slot.name   = cards[ci].name;
        used.add(cards[ci].id);
        ci++;
      }
    });
    pg.pct = calcPct(pg);
  });
  saveState(); renderPages();
  showToast("Auto-arranged " + used.size + " cards across " + state.pages.length + " pages");
}

// ── Theme suggestions ────────────────────────────────────────────────────────
function renderSuggestions() {
  const container = document.getElementById("theme-suggestions");
  if (!container) return;
  const assignedIds = new Set();
  state.pages.forEach(pg => pg.slots.forEach(s => { if (s.cardId) assignedIds.add(s.cardId); }));
  const waiting = {};
  state.collection.forEach(c => {
    if (c.theme && !assignedIds.has(c.id)) waiting[c.theme] = (waiting[c.theme]||0) + 1;
  });
  const suggestions = Object.entries(waiting)
    .filter(([theme]) => !state.pages.some(p => p.theme === theme))
    .sort((a,b) => b[1]-a[1]).slice(0,3);
  if (!suggestions.length) { container.style.display = "none"; return; }
  container.style.display = "block";
  container.innerHTML = `<div style="font-size:11px;color:var(--muted);font-weight:700;margin-bottom:6px">💡 Suggested pages</div>` +
    suggestions.map(([themeId, count]) => {
      const theme = THEMES[themeId]; if (!theme) return "";
      return `<div style="display:flex;align-items:center;gap:8px;padding:7px 10px;border:1px solid ${theme.color}33;border-radius:8px;margin-bottom:5px">
        <span style="flex:1;font-size:12px;font-weight:600">${theme.emoji} ${theme.label}</span>
        <span style="font-size:10px;color:${theme.color};font-weight:700">${count} card${count>1?"s":""} waiting</span>
        <button data-theme="${themeId}" class="suggest-add-btn" style="background:${theme.color}33;border:1px solid ${theme.color}55;color:${theme.color};border-radius:6px;padding:3px 8px;font-size:11px;cursor:pointer">+ Add page</button>
      </div>`;
    }).join("");
  container.querySelectorAll(".suggest-add-btn").forEach(btn => {
    btn.addEventListener("click", () => addPage(btn.dataset.theme));
  });
}

// ── Pages tab ────────────────────────────────────────────────────────────────
function renderPages() {
  const pills = document.getElementById("page-pills");
  pills.innerHTML = "";
  state.pages.forEach((pg, i) => {
    const btn = document.createElement("button");
    btn.className = "page-pill" + (i === currentPage ? " active" : "");
    btn.textContent = te(pg.theme) + " Pg " + pg.id;
    if (i === currentPage) {
      const c = tc(pg.theme);
      btn.style.borderColor = c; btn.style.color = c; btn.style.background = c + "22";
    }
    btn.addEventListener("click", () => { currentPage = i; renderPages(); });
    pills.appendChild(btn);
  });

  renderSuggestions();

  const pg = state.pages[currentPage];
  const color = tc(pg.theme);
  const pct   = calcPct(pg);
  const cardCount  = pg.slots.filter(s => s.type === "card").length;
  const printCount = pg.slots.filter(s => s.type === "print").length;
  const emptyCount = pg.slots.filter(s => s.type === "empty").length;

  document.getElementById("page-view").innerHTML = `
    <div class="page-header">
      <div style="flex:1">
        <span class="page-theme-badge" style="background:${color}22;border:1px solid ${color}44;color:${color}">
          ${te(pg.theme)} ${pg.label}
        </span>
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:${color}"></div></div>
        <p class="progress-label">${pct}% complete</p>
        <div style="display:flex;gap:6px;margin-top:8px;flex-wrap:wrap">
          <button onclick="autoSlotCollection()" style="background:none;border:1px solid #34D39955;color:#34D399;border-radius:6px;padding:5px 12px;font-size:12px;cursor:pointer">✨ Auto-arrange</button>
          <button onclick="openAddPageModal()" style="background:none;border:1px solid #818CF855;color:#818CF8;border-radius:6px;padding:5px 12px;font-size:12px;cursor:pointer">＋ Add page</button>
          <button onclick="deletePage(${currentPage})" style="background:none;border:1px solid #F8717133;color:#F87171;border-radius:6px;padding:5px 12px;font-size:12px;cursor:pointer">🗑 Delete</button>
        </div>
      </div>
      <div class="page-stats">
        <div class="stat-box"><div class="stat-num" style="color:#818CF8">${cardCount}</div><div class="stat-lbl">Cards</div></div>
        <div class="stat-box"><div class="stat-num" style="color:#C084FC">${printCount}</div><div class="stat-lbl">Prints</div></div>
        <div class="stat-box"><div class="stat-num" style="color:#6B6B8F">${emptyCount}</div><div class="stat-lbl">Empty</div></div>
      </div>
    </div>
    <div class="binder-wrap">
      <div class="binder-label">Page Preview — tap any pocket to edit</div>
      <div class="binder-grid" id="binder-grid" style="border:2px solid ${color}33"></div>
    </div>
    <div class="slot-list">
      <div class="binder-label">Slots</div>
      <div class="slot-grid" id="slot-grid"></div>
    </div>
  `;

  // Build pockets
  const grid = document.getElementById("binder-grid");
  pg.slots.forEach((slot, i) => {
    if (slot.type === "span") return; // spans not added to DOM
    const anchor = getAnchorSlot(pg.slots, slot);
    const div = document.createElement("div");
    div.className = "pocket" + (slot.type==="card"?" is-card":slot.type==="print"?" is-print":"");
    // Apply span
    if (slot.type === "print" && slot.span) {
      if (slot.span.cols > 1) div.style.gridColumn = "span " + slot.span.cols;
      if (slot.span.rows > 1) div.style.gridRow    = "span " + slot.span.rows;
      div.style.aspectRatio = "unset";
      div.style.height      = "100%";
    }
    div.addEventListener("click", () => openSlotModal(currentPage, i));
    const img = slotImage(anchor);
    if (img) {
      const el = document.createElement("img");
      el.src = img; el.alt = slotLabel(anchor);
      el.onerror = () => { el.remove(); div.innerHTML = innerFallback(slot, i); };
      div.appendChild(el);
    } else {
      div.innerHTML = innerFallback(slot, i);
    }
    if (slot.type === "print") {
      const badge = document.createElement("div");
      badge.className = "pocket-badge" + (slot.url ? " done" : "");
      badge.textContent = slot.url ? "✓" : "PRINT";
      div.appendChild(badge);
    }
    grid.appendChild(div);
  });

  // Build slot list
  const slotGrid = document.getElementById("slot-grid");
  pg.slots.forEach((slot, i) => {
    if (slot.type === "span") return;
    const div = document.createElement("div");
    div.className = "slot-item";
    const label = slotLabel(slot);
    div.innerHTML = `
      <span class="slot-icon">${slot.type==="print"?"🖨️":slot.type==="card"?"🃏":"○"}</span>
      <span class="slot-name ${label?"filled":""}">${label||"Slot "+(i+1)}</span>
      ${slot.type==="print"&&slot.url?'<span class="slot-done">✓</span>':""}
    `;
    div.addEventListener("click", () => openSlotModal(currentPage, i));
    slotGrid.appendChild(div);
  });

  // Set grid height dynamically so all rows are equal
  // (width / 4 cols) * (3.5/2.5 card ratio) * 3 rows + gaps
  requestAnimationFrame(() => {
    const grid = document.getElementById("binder-grid");
    if (grid) {
      const w = grid.clientWidth - 20; // subtract padding
      const cellW = (w - 7*3) / 4;    // 3 gaps between 4 cols
      const cellH = cellW * (3.5/2.5);
      grid.style.gridTemplateRows = `repeat(3, ${cellH}px)`;
    }
  });

  document.getElementById("collection-count").textContent = state.collection.length + " cards";
}

// ── Slot modal ───────────────────────────────────────────────────────────────
const modal        = document.getElementById("modal");
const typeBtns     = document.querySelectorAll(".type-btn");
const cardFields   = document.getElementById("modal-card-fields");
const printFields  = document.getElementById("modal-print-fields");
const cardSelect   = document.getElementById("modal-card-select");
const printName    = document.getElementById("modal-print-name");
const printSearch  = document.getElementById("modal-print-search");
const printUrl     = document.getElementById("modal-print-url");
const printPreview = document.getElementById("modal-print-preview");
const pinterestLnk = document.getElementById("pinterest-link");
const googleLnk    = document.getElementById("google-link");
let modalType = "card";

function openSlotModal(pageIdx, slotIdx) {
  editingSlot = { pageIdx, slotIdx };
  const slot = state.pages[pageIdx].slots[slotIdx];
  document.getElementById("modal-title").textContent = `Slot ${slotIdx+1} — Page ${state.pages[pageIdx].id}`;
  modalType = (slot.type === "card" || slot.type === "print") ? slot.type : "empty";
  updateModalType(modalType);
  cardSelect.innerHTML = '<option value="">-- Choose from your collection --</option>';
  state.collection.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = c.name + (c.set ? ` (${c.set})` : "");
    if (c.id === slot.cardId) opt.selected = true;
    cardSelect.appendChild(opt);
  });
  printName.value   = slot.name   || "";
  printSearch.value = slot.search || "";
  printUrl.value    = slot.url    || "";
  // Set span selector
  const spanSel = document.getElementById("modal-span-size");
  if (spanSel) {
    const current = slot.span ? `${slot.span.cols}x${slot.span.rows}` : "1x1";
    for (let i = 0; i < spanSel.options.length; i++) {
      if (spanSel.options[i].value === current) { spanSel.selectedIndex = i; break; }
    }
  }
  updatePinterestLink(); updatePrintPreview();
  modal.classList.remove("hidden");
}

function updateModalType(type) {
  modalType = type;
  typeBtns.forEach(b => b.classList.toggle("active", b.dataset.type === type));
  cardFields.classList.toggle("hidden",  type !== "card");
  printFields.classList.toggle("hidden", type !== "print");
}
function updatePinterestLink() {
  const q = printSearch.value || printName.value || "";
  pinterestLnk.href = `https://pinterest.com/search/pins/?q=${encodeURIComponent(q)}`;
  googleLnk.href    = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(q+" pokemon art")}`;
}
function updatePrintPreview() {
  const url = printUrl.value.trim();
  if (url) { printPreview.src=url; printPreview.classList.remove("hidden"); printPreview.onerror=()=>printPreview.classList.add("hidden"); }
  else { printPreview.classList.add("hidden"); }
}

document.getElementById("modal-backdrop").addEventListener("click", () => modal.classList.add("hidden"));
document.getElementById("modal-cancel").addEventListener("click",   () => modal.classList.add("hidden"));
typeBtns.forEach(btn => btn.addEventListener("click", () => updateModalType(btn.dataset.type)));
printSearch.addEventListener("input", updatePinterestLink);
printUrl.addEventListener("input",    updatePrintPreview);

document.getElementById("modal-save").addEventListener("click", () => {
  if (!editingSlot) return;
  const { pageIdx, slotIdx } = editingSlot;
  const slots = state.pages[pageIdx].slots;
  const slot  = slots[slotIdx];
  const wasSpanning = slot.type === "print" && slot.span && (slot.span.cols > 1 || slot.span.rows > 1);

  if (modalType === "card") {
    const card  = cardSelect.value ? state.collection.find(c => c.id == cardSelect.value) : null;
    slot.type   = "card";
    slot.cardId = card ? card.id : null;
    slot.name   = card ? card.name : slot.name;
    delete slot.span;
  } else if (modalType === "print") {
    slot.type   = "print";
    slot.name   = printName.value.trim()   || slot.name;
    slot.search = printSearch.value.trim();
    slot.url    = printUrl.value.trim();
    // Apply span size
    const spanSel = document.getElementById("modal-span-size");
    if (spanSel && spanSel.value) {
      const [cols, rows] = spanSel.value.split("x").map(Number);
      const oldSpan = slot.span || {cols:1,rows:1};
      slot.span = {cols, rows};
      // If span changed, rebuild span slots
      const pg = state.pages[editingSlot.pageIdx];
      const slotIdx = editingSlot.slotIdx;
      // First free any existing spans for this anchor
      pg.slots.forEach((s, i) => {
        if (s.type === "span" && s.anchorIdx === slotIdx) pg.slots[i] = {type:"empty"};
      });
      // Now fill new spans from adjacent empty slots
      if (cols > 1 || rows > 1) {
        const col0 = slotIdx % 4;
        const row0 = Math.floor(slotIdx / 4);
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (r === 0 && c === 0) continue; // anchor itself
            const targetIdx = (row0 + r) * 4 + (col0 + c);
            if (targetIdx < pg.slots.length && pg.slots[targetIdx].type === "empty") {
              pg.slots[targetIdx] = {type:"span", anchorIdx:slotIdx};
            }
          }
        }
      }
    } else if (!slot.span) {
      slot.span = {cols:1, rows:1};
    }
  } else {
    slot.type = "empty"; slot.cardId = null; slot.url = "";
    delete slot.span;
  }

  // Free span slots when converting away from a spanning print
  if (wasSpanning && modalType !== "print") {
    slots.forEach((s, i) => {
      if (s.type === "span" && s.anchorIdx === slotIdx) {
        slots[i] = { type: "empty" };
      }
    });
  }

  saveState(); modal.classList.add("hidden");
  renderPages(); renderPrints();
});

// ── Collection tab ───────────────────────────────────────────────────────────
function renderCollection() {
  const list  = document.getElementById("collection-list");
  const total = document.getElementById("coll-total");
  document.getElementById("collection-count").textContent = state.collection.length + " cards";
  total.textContent = state.collection.length + " cards in collection";

  if (!state.collection.length) {
    list.innerHTML = `<div style="text-align:center;padding:48px 24px;color:var(--muted)"><div style="font-size:48px;margin-bottom:12px;opacity:.4">🃏</div><p>No cards yet — upload some on the Upload tab</p></div>`;
    return;
  }

  const order  = Object.keys(RARITY_COLORS);
  const groups = {};
  state.collection.forEach(c => {
    const r = c.rarity || "Unknown";
    if (!groups[r]) groups[r] = [];
    groups[r].push(c);
  });

  list.innerHTML = "";
  [...order, ...Object.keys(groups).filter(r => !order.includes(r))].forEach(rarity => {
    if (!groups[rarity]) return;
    const color = rc(rarity);
    const section = document.createElement("div");
    section.className = "rarity-group";
    section.innerHTML = `<div class="rarity-header">
      <span class="rarity-badge" style="color:${color};background:${color}22;border-color:${color}44">${rarity}</span>
      <span class="rarity-count">${groups[rarity].length} card${groups[rarity].length!==1?"s":""}</span>
    </div>`;
    groups[rarity].forEach(card => {
      const item = document.createElement("div");
      item.className = "collection-card";
      item.style.borderLeftColor = color;
      const suggested = !card.theme ? suggestTheme(card.name) : null;
      item.innerHTML = `
        ${card.image?`<img class="coll-img" src="${card.image}" alt="${card.name}" />`:`<div class="coll-img"></div>`}
        <div class="coll-info">
          <div class="coll-name">${card.name}</div>
          <div class="coll-set">${card.set||""}${card.set&&card.rarity?" · ":""}<span style="color:${color};font-size:10px">${card.rarity||""}</span></div>
          ${suggested?`<div style="font-size:10px;color:${tc(suggested)};margin-top:2px">💡 Suggested: ${te(suggested)} ${THEMES[suggested].label}</div>`:""}
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
          ${card.qty>1?`<span style="background:#F59E0B22;border:1px solid #F59E0B44;color:#F59E0B;border-radius:99px;padding:2px 7px;font-size:10px;font-weight:700">×${card.qty}</span>`:""}
          <div class="coll-price">${card.price?"$"+parseFloat(card.price).toFixed(2):""}</div>
          <button class="edit-card-btn" data-id="${card.id}" style="background:none;border:1px solid var(--border);border-radius:6px;color:var(--muted);padding:4px 8px;font-size:11px;cursor:pointer">Edit</button>
        </div>
      `;
      item.querySelector(".edit-card-btn").addEventListener("click", () => openCardEditModal(card.id));
      section.appendChild(item);
    });
    list.appendChild(section);
  });
}

document.getElementById("clear-collection").addEventListener("click", () => {
  if (confirm("Clear entire collection? Cannot be undone.")) {
    state.collection = []; saveState(); renderCollection(); renderPages();
    showToast("Collection cleared");
  }
});

// ── Card edit modal ──────────────────────────────────────────────────────────
function openCardEditModal(cardId) {
  const card  = state.collection.find(c => c.id === cardId); if (!card) return;
  const modal = document.getElementById("card-edit-modal");
  const img   = document.getElementById("ce-img-preview");
  if (card.image) { img.src=card.image; img.classList.remove("hidden"); } else { img.classList.add("hidden"); }
  document.getElementById("ce-name").value  = card.name  || "";
  document.getElementById("ce-set").value   = card.set   || "";
  document.getElementById("ce-price").value = card.price || "";
  const rarSel = document.getElementById("ce-rarity");
  for (let i=0; i<rarSel.options.length; i++) {
    if (rarSel.options[i].value===card.rarity||rarSel.options[i].text===card.rarity) { rarSel.selectedIndex=i; break; }
  }
  const themeSel = document.getElementById("ce-theme");
  for (let i=0; i<themeSel.options.length; i++) {
    if (themeSel.options[i].value===card.theme) { themeSel.selectedIndex=i; break; }
  }
  // Show suggested theme if unassigned
  const suggestedDiv = document.getElementById("ce-theme-suggest");
  if (suggestedDiv) {
    const suggested = !card.theme ? suggestTheme(card.name) : null;
    if (suggested) {
      suggestedDiv.style.display = "block";
      suggestedDiv.innerHTML = `<button onclick="document.getElementById('ce-theme').value='${suggested}'" style="background:${tc(suggested)}22;border:1px solid ${tc(suggested)}44;color:${tc(suggested)};border-radius:6px;padding:4px 10px;font-size:11px;cursor:pointer">💡 Use ${te(suggested)} ${THEMES[suggested].label}</button>`;
    } else { suggestedDiv.style.display = "none"; }
  }
  document.getElementById("ce-backdrop").onclick = () => modal.classList.add("hidden");
  document.getElementById("ce-cancel").onclick   = () => modal.classList.add("hidden");
  document.getElementById("ce-save").onclick = () => {
    card.name  = document.getElementById("ce-name").value.trim();
    card.set   = document.getElementById("ce-set").value.trim();
    card.rarity= document.getElementById("ce-rarity").value;
    card.price = document.getElementById("ce-price").value;
    card.theme = document.getElementById("ce-theme").value;
    saveState(); modal.classList.add("hidden");
    renderCollection(); renderPages(); showToast("Card updated");
  };
  document.getElementById("ce-delete").onclick = () => {
    if (!confirm(`Delete "${card.name}"?`)) return;
    state.collection = state.collection.filter(c => c.id !== cardId);
    saveState(); modal.classList.add("hidden");
    renderCollection(); renderPages(); showToast("Card deleted");
  };
  modal.classList.remove("hidden");
}

// ── Prints tab ───────────────────────────────────────────────────────────────
function renderPrints() {
  const seen = new Set(); const prints = [];
  state.pages.forEach(pg => {
    pg.slots.forEach(slot => {
      if (slot.type!=="print"||!slot.name||seen.has(slot.name)) return;
      seen.add(slot.name);
      prints.push({ ...slot, pageLabel:pg.label });
    });
  });
  document.getElementById("prints-count").textContent =
    `${prints.length} prints · ${prints.filter(p=>p.url).length} with image URLs · 4×6 glossy`;
  const list = document.getElementById("prints-list");
  list.innerHTML = "";
  prints.forEach(p => {
    const div = document.createElement("div");
    div.className = "print-item";
    div.innerHTML = `
      <div>
        <div class="print-name">${p.url?"✅ ":""}${p.name}</div>
        <div class="print-meta">🔍 ${p.search||p.name}</div>
        <div class="print-meta">${p.pageLabel} · 7×9.5 cm · 4×6 glossy</div>
      </div>
      <a class="print-find" href="https://pinterest.com/search/pins/?q=${encodeURIComponent(p.search||p.name)}" target="_blank" rel="noreferrer">📌 Find</a>
    `;
    list.appendChild(div);
  });
  document.getElementById("copy-prints").onclick = () => {
    const text = prints.map(p=>`${p.name}\nSearch: ${p.search||p.name}\nPage: ${p.pageLabel}\nSize: 7x9.5cm\n`).join("\n");
    navigator.clipboard.writeText(text).then(()=>showToast("Copied!"));
  };
}

// ── Init ─────────────────────────────────────────────────────────────────────
renderPages();
renderCollection();
renderPrints();

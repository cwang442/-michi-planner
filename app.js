// ── Themes ─────────────────────────────────────────────────────────────────
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
  "Special Illustration Rare": "#F59E0B",
  "Illustration Rare":         "#818CF8",
  "Art Rare":                  "#34D399",
  "Ultra Rare":                "#48CAE4",
  "Double Rare":               "#60A5FA",
  "Hyper Rare":                "#FFAFCC",
  "Super Rare":                "#A78BFA",
  "ACE SPEC Rare":             "#F472B6",
  "Promo":                     "#C084FC",
  "Rare":                      "#94A3B8",
  "Common":                    "#64748B",
};

// ── Default pages — empty slots, no hardcoded cards ────────────────────────
const DEFAULT_PAGES = [
  { id:1, theme:"teamrocket", label:"Team Rocket — Page 1", pct:0, slots:[
    {type:"card",cardId:null,name:""},{type:"card",cardId:null,name:""},
    {type:"card",cardId:null,name:""},{type:"card",cardId:null,name:""},
    {type:"card",cardId:null,name:""},{type:"card",cardId:null,name:""},
    {type:"card",cardId:null,name:""},{type:"card",cardId:null,name:""},
    {type:"print",name:"Team Rocket hideout art",search:"Team Rocket hideout Pokemon anime art",url:""},
    {type:"print",name:"Jessie James Meowth art",search:"Jessie James Meowth Team Rocket anime art",url:""},
    {type:"card",cardId:null,name:""},{type:"card",cardId:null,name:""},
  ]},
  { id:2, theme:"teamrocket", label:"Team Rocket — Page 2", pct:0, slots:[
    {type:"card",cardId:null,name:""},{type:"card",cardId:null,name:""},
    {type:"card",cardId:null,name:""},{type:"card",cardId:null,name:""},
    {type:"card",cardId:null,name:""},{type:"card",cardId:null,name:""},
    {type:"print",name:"Team Rocket blasting off",search:"Team Rocket blasting off sky anime art",url:""},
    {type:"print",name:"N trainer art",search:"N trainer Pokemon Black White art",url:""},
    {type:"print",name:"Team Rocket R logo",search:"Team Rocket R logo dark aesthetic art",url:""},
    {type:"card",cardId:null,name:""},{type:"card",cardId:null,name:""},
    {type:"card",cardId:null,name:""},
  ]},
  { id:3, theme:"eeveelutions", label:"Eeveelutions", pct:0, slots:[
    {type:"card",cardId:null,name:""},{type:"card",cardId:null,name:""},
    {type:"card",cardId:null,name:""},
    {type:"print",name:"Vaporeon art",search:"Vaporeon watercolour aesthetic art",url:""},
    {type:"print",name:"Flareon art",search:"Flareon cozy fire illustration art",url:""},
    {type:"print",name:"Espeon art",search:"Espeon moonlight psychic art",url:""},
    {type:"print",name:"Umbreon art",search:"Umbreon night stars illustration art",url:""},
    {type:"print",name:"Sylveon art",search:"Sylveon fairy ribbon illustration art",url:""},
    {type:"print",name:"Glaceon art",search:"Glaceon ice snow illustration art",url:""},
    {type:"print",name:"All Eeveelutions",search:"all eeveelutions group illustration art",url:""},
    {type:"print",name:"Espeon + Umbreon",search:"Espeon Umbreon together illustration art",url:""},
    {type:"print",name:"Eevee cozy art",search:"Eevee cozy forest illustration art",url:""},
  ]},
  { id:4, theme:"pink", label:"Pink Page", pct:0, slots:[
    {type:"card",cardId:null,name:""},{type:"card",cardId:null,name:""},
    {type:"card",cardId:null,name:""},{type:"card",cardId:null,name:""},
    {type:"card",cardId:null,name:""},{type:"card",cardId:null,name:""},
    {type:"card",cardId:null,name:""},{type:"card",cardId:null,name:""},
    {type:"card",cardId:null,name:""},{type:"card",cardId:null,name:""},
    {type:"card",cardId:null,name:""},
    {type:"print",name:"Clefairy moon art",search:"Clefairy moon night pink pastel illustration",url:""},
  ]},
  { id:5, theme:"green", label:"Green & Nature", pct:0, slots:[
    {type:"card",cardId:null,name:""},{type:"card",cardId:null,name:""},
    {type:"card",cardId:null,name:""},{type:"card",cardId:null,name:""},
    {type:"card",cardId:null,name:""},{type:"card",cardId:null,name:""},
    {type:"card",cardId:null,name:""},{type:"card",cardId:null,name:""},
    {type:"card",cardId:null,name:""},{type:"card",cardId:null,name:""},
    {type:"print",name:"Venusaur forest art",search:"Venusaur lush forest botanical illustration",url:""},
    {type:"print",name:"Chikorita meadow art",search:"Chikorita meadow Gen 2 illustration art",url:""},
  ]},
  { id:6, theme:"psyduck", label:"Psyduck", pct:0, slots:[
    {type:"card",cardId:null,name:""},
    {type:"print",name:"Psyduck rain art",search:"Psyduck rain puddle sad aesthetic art",url:""},
    {type:"print",name:"Psyduck headache art",search:"Psyduck headache confused illustration",url:""},
    {type:"print",name:"Psyduck bathtub art",search:"Psyduck bathtub rubber duck cute art",url:""},
    {type:"print",name:"Golduck art",search:"Golduck cool blue illustration art",url:""},
    {type:"print",name:"Psyduck river art",search:"Psyduck floating river water illustration",url:""},
    {type:"print",name:"Psyduck cloudy art",search:"Psyduck cloudy overcast day illustration",url:""},
    {type:"print",name:"Psyduck sleeping art",search:"Psyduck sleeping napping cute art",url:""},
    {type:"print",name:"Psyduck + Misty art",search:"Psyduck Misty Pokemon anime illustration",url:""},
    {type:"print",name:"Psyduck chibi art",search:"Psyduck kawaii chibi cute art",url:""},
    {type:"print",name:"Psyduck window art",search:"Psyduck rainy window cozy illustration",url:""},
    {type:"print",name:"Psyduck retro art",search:"Psyduck vintage retro 90s illustration",url:""},
  ]},
  { id:7, theme:"pikachu", label:"Pikachu", pct:0, slots:[
    {type:"card",cardId:null,name:""},{type:"card",cardId:null,name:""},
    {type:"card",cardId:null,name:""},{type:"card",cardId:null,name:""},
    {type:"print",name:"Pikachu forest art",search:"Pikachu sitting forest illustration art",url:""},
    {type:"print",name:"Pikachu sleeping art",search:"Pikachu sleeping peaceful cute illustration",url:""},
    {type:"print",name:"Pikachu rain art",search:"Pikachu rain umbrella cozy illustration",url:""},
    {type:"print",name:"Pikachu + Ash art",search:"Pikachu Ash together Pokemon anime art",url:""},
    {type:"print",name:"Pichu baby art",search:"Pichu baby cute illustration art",url:""},
    {type:"print",name:"Pikachu ketchup art",search:"Pikachu ketchup bottle sleeping cute art",url:""},
    {type:"print",name:"Pikachu vintage art",search:"Pikachu vintage Gen 1 1996 illustration",url:""},
    {type:"print",name:"Raichu evolution art",search:"Raichu Pikachu Pichu evolution chart art",url:""},
  ]},
  { id:8, theme:"sleeping", label:"Sleeping Pokémon", pct:0, slots:[
    {type:"card",cardId:null,name:""},{type:"card",cardId:null,name:""},
    {type:"card",cardId:null,name:""},{type:"card",cardId:null,name:""},
    {type:"card",cardId:null,name:""},{type:"card",cardId:null,name:""},
    {type:"card",cardId:null,name:""},
    {type:"print",name:"Snorlax cozy art",search:"Snorlax sleeping cozy forest illustration",url:""},
    {type:"print",name:"Jigglypuff art",search:"Jigglypuff singing everyone sleeping art",url:""},
    {type:"print",name:"Cleffa stars art",search:"Cleffa sleeping stars night illustration",url:""},
    {type:"print",name:"Eevee sleeping art",search:"Eevee sleeping cozy blanket illustration",url:""},
    {type:"print",name:"Drowzee dream art",search:"Drowzee Hypno dreaming psychic illustration",url:""},
  ]},
  { id:9, theme:"water", label:"Water & Ocean", pct:0, slots:[
    {type:"card",cardId:null,name:""},{type:"card",cardId:null,name:""},
    {type:"card",cardId:null,name:""},{type:"card",cardId:null,name:""},
    {type:"card",cardId:null,name:""},{type:"card",cardId:null,name:""},
    {type:"card",cardId:null,name:""},{type:"card",cardId:null,name:""},
    {type:"card",cardId:null,name:""},
    {type:"print",name:"Magikarp koi art",search:"Magikarp koi ocean illustration art",url:""},
    {type:"print",name:"Vaporeon ocean art",search:"Vaporeon ocean waves swimming illustration",url:""},
    {type:"print",name:"Lapras sunset art",search:"Lapras ocean sunset sailing illustration",url:""},
  ]},
];

const DEFAULT_PRINTS = [
  { id:1, theme:"teamrocket",   label:"Team Rocket — Page 1",  slots:[
    {type:"print",name:"Team Rocket Hideout art",   search:"Team Rocket hideout Pokemon anime art"},
    {type:"print",name:"Jessie James Meowth art",   search:"Jessie James Meowth Team Rocket anime art"},
  ]},
  { id:2, theme:"teamrocket",   label:"Team Rocket — Page 2",  slots:[
    {type:"print",name:"Team Rocket blasting off",  search:"Team Rocket blasting off sky anime art"},
    {type:"print",name:"N trainer art",             search:"N trainer Pokemon Black White art"},
    {type:"print",name:"Team Rocket R logo",        search:"Team Rocket R logo dark aesthetic art"},
  ]},
  { id:3, theme:"eeveelutions", label:"Eeveelutions",          slots:[
    {type:"print",name:"Vaporeon art",              search:"Vaporeon watercolour aesthetic art"},
    {type:"print",name:"Flareon art",               search:"Flareon cozy fire illustration art"},
    {type:"print",name:"Jolteon art",               search:"Jolteon electric illustration art"},
    {type:"print",name:"Espeon art",                search:"Espeon moonlight psychic art"},
    {type:"print",name:"Umbreon art",               search:"Umbreon night stars illustration art"},
    {type:"print",name:"Sylveon art",               search:"Sylveon fairy ribbon illustration art"},
    {type:"print",name:"Glaceon art",               search:"Glaceon ice snow illustration art"},
    {type:"print",name:"All Eeveelutions",          search:"all eeveelutions group illustration art"},
  ]},
  { id:4, theme:"pink",         label:"Pink Page",             slots:[
    {type:"print",name:"Clefairy moon art",         search:"Clefairy moon night pink pastel illustration"},
  ]},
  { id:5, theme:"green",        label:"Green & Nature",        slots:[
    {type:"print",name:"Venusaur forest art",       search:"Venusaur lush forest botanical illustration"},
    {type:"print",name:"Chikorita meadow art",      search:"Chikorita meadow Gen 2 illustration art"},
  ]},
  { id:6, theme:"psyduck",      label:"Psyduck",               slots:[
    {type:"print",name:"Psyduck rain art",          search:"Psyduck rain puddle sad aesthetic art"},
    {type:"print",name:"Psyduck headache art",      search:"Psyduck headache confused illustration"},
    {type:"print",name:"Psyduck bathtub art",       search:"Psyduck bathtub rubber duck cute art"},
    {type:"print",name:"Psyduck + Misty art",       search:"Psyduck Misty Pokemon anime illustration"},
    {type:"print",name:"Psyduck chibi art",         search:"Psyduck kawaii chibi cute art"},
  ]},
  { id:7, theme:"pikachu",      label:"Pikachu",               slots:[
    {type:"print",name:"Pikachu forest art",        search:"Pikachu sitting forest illustration art"},
    {type:"print",name:"Pikachu sleeping art",      search:"Pikachu sleeping peaceful cute illustration"},
    {type:"print",name:"Pikachu + Ash art",         search:"Pikachu Ash together Pokemon anime art"},
    {type:"print",name:"Raichu evolution art",      search:"Raichu Pikachu Pichu evolution chart art"},
  ]},
  { id:8, theme:"sleeping",     label:"Sleeping Pokémon",      slots:[
    {type:"print",name:"Snorlax cozy art",          search:"Snorlax sleeping cozy forest illustration"},
    {type:"print",name:"Jigglypuff art",            search:"Jigglypuff singing everyone sleeping art"},
    {type:"print",name:"Eevee sleeping art",        search:"Eevee sleeping cozy blanket illustration"},
  ]},
  { id:9, theme:"water",        label:"Water & Ocean",         slots:[
    {type:"print",name:"Magikarp koi art",          search:"Magikarp koi ocean illustration art"},
    {type:"print",name:"Vaporeon ocean art",        search:"Vaporeon ocean waves swimming illustration"},
    {type:"print",name:"Lapras sunset art",         search:"Lapras ocean sunset sailing illustration"},
  ]},
];

// ── Storage ─────────────────────────────────────────────────────────────────
function loadState() {
  try {
    return {
      pages:      JSON.parse(localStorage.getItem("michi_pages"))      || DEFAULT_PAGES,
      collection: JSON.parse(localStorage.getItem("michi_collection")) || [],
    };
  } catch(e) {
    return { pages: DEFAULT_PAGES, collection: [] };
  }
}

function saveState() {
  localStorage.setItem("michi_pages",      JSON.stringify(state.pages));
  localStorage.setItem("michi_collection", JSON.stringify(state.collection));
}

const state = loadState();
let currentPage = 0;

// ── Helpers ──────────────────────────────────────────────────────────────────
function rc(rarity) { return RARITY_COLORS[rarity] || "#6B6B8F"; }
function tc(theme)  { return THEMES[theme]?.color  || "#818CF8"; }
function te(theme)  { return THEMES[theme]?.emoji  || "📄"; }
function getCard(id){ return state.collection.find(c => c.id === id); }

function slotImage(slot) {
  if (slot.cardId) { const c = getCard(slot.cardId); return c?.image || null; }
  if (slot.type === "print") return slot.url || null;
  return null;
}

function slotLabel(slot) {
  if (slot.cardId) { const c = getCard(slot.cardId); return c?.name || slot.name || ""; }
  return slot.name || "";
}

function calcPct(page) {
  const filled = page.slots.filter(s => s.type === "card" && s.cardId || s.type === "print").length;
  return Math.round((filled / page.slots.length) * 100);
}

// ── Tab switching ────────────────────────────────────────────────────────────
document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
    if (btn.dataset.tab === "collection") renderCollection();
    if (btn.dataset.tab === "prints")     renderPrints();
  });
});


// ── Auto-slot: assign collection cards to themed pages ──────────────────────
// Michi Method rules:
// - Cards go into slots typed "card" on their matching theme page
// - Print slots are pre-reserved and never overwritten by cards
// - Multiple pages of same theme fill sequentially
// - Unthemed cards stay unassigned

function autoSlotCollection() {
  // Step 1: Reset all card slots to empty (keep print slots intact)
  state.pages.forEach(pg => {
    pg.slots.forEach(slot => {
      if (slot.type === "card") {
        slot.cardId = null;
        slot.name = "";
      }
    });
  });

  // Step 2: Build a map of theme -> available card slots across all pages
  const themeSlots = {}; // theme -> [{pageIdx, slotIdx}]
  state.pages.forEach((pg, pageIdx) => {
    if (!themeSlots[pg.theme]) themeSlots[pg.theme] = [];
    pg.slots.forEach((slot, slotIdx) => {
      if (slot.type === "card" || slot.type === "empty") {
        themeSlots[pg.theme].push({ pageIdx, slotIdx });
      }
    });
  });

  // Step 3: Sort collection by price descending (highest value cards first)
  const sorted = [...state.collection].sort((a, b) => parseFloat(b.price||0) - parseFloat(a.price||0));

  // Step 4: Assign cards to matching theme slots
  const used = new Set();
  sorted.forEach(card => {
    if (!card.theme) return;
    const slots = themeSlots[card.theme];
    if (!slots) return;
    const available = slots.find(s => {
      const slot = state.pages[s.pageIdx].slots[s.slotIdx];
      return !slot.cardId && (slot.type === "card" || slot.type === "empty");
    });
    if (!available) return;
    const slot = state.pages[available.pageIdx].slots[available.slotIdx];
    slot.type = "card";
    slot.cardId = card.id;
    slot.name = card.name;
    used.add(card.id);
  });

  // Step 5: Recalculate completion %
  state.pages.forEach(pg => { pg.pct = calcPct(pg); });

  saveState();
  renderPages();
  showToast(`Auto-arranged ${used.size} cards across ${state.pages.length} pages`);
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
      btn.style.cssText = `border-color:${tc(pg.theme)};color:${tc(pg.theme)};background:${tc(pg.theme)}22`;
    }
    btn.addEventListener("click", () => { currentPage = i; renderPages(); });
    pills.appendChild(btn);
  });

  const pg = state.pages[currentPage];
  const pct = calcPct(pg);
  const color = tc(pg.theme);
  const cardCount  = pg.slots.filter(s => s.type === "card").length;
  const printCount = pg.slots.filter(s => s.type === "print").length;
  const emptyCount = pg.slots.filter(s => s.type === "empty" || !s.type).length;

  // Auto-arrange button
  let autoBtn = document.getElementById("auto-arrange-btn");
  if (!autoBtn) {
    autoBtn = document.createElement("button");
    autoBtn.id = "auto-arrange-btn";
    autoBtn.className = "btn-ghost";
    autoBtn.style.cssText = "font-size:11px;padding:5px 12px;margin-bottom:10px;width:100%";
    autoBtn.textContent = "✨ Auto-arrange cards by theme";
    autoBtn.addEventListener("click", () => {
      if (state.collection.length === 0) { showToast("Upload some cards first!"); return; }
      autoSlotCollection();
    });
    document.getElementById("page-pills").after(autoBtn);
  }

  document.getElementById("page-view").innerHTML = `
    <div class="page-header">
      <div style="flex:1">
        <span class="page-theme-badge" style="background:${color}22;border:1px solid ${color}44;color:${color}">
          ${te(pg.theme)} ${pg.label}
        </span>
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:${color}"></div></div>
        <p class="progress-label">${pct}% complete</p>
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

  // Pockets
  const grid = document.getElementById("binder-grid");
  pg.slots.forEach((slot, i) => {
    const div = document.createElement("div");
    const img = slotImage(slot);
    div.className = "pocket" + (slot.type==="card"?" is-card":slot.type==="print"?" is-print":"");
    div.addEventListener("click", () => openSlotModal(currentPage, i));

    if (img) {
      const el = document.createElement("img");
      el.src = img; el.alt = slotLabel(slot);
      el.onerror = () => { el.remove(); div.insertAdjacentHTML("beforeend", pocketInner(slot, i)); };
      div.appendChild(el);
    } else {
      div.innerHTML = pocketInner(slot, i);
    }

    if (slot.type === "print") {
      const badge = document.createElement("div");
      badge.className = "pocket-badge" + (slot.url ? " done" : "");
      badge.textContent = slot.url ? "✓" : "PRINT";
      div.appendChild(badge);
    }
    grid.appendChild(div);
  });

  // Slot list
  const slotGrid = document.getElementById("slot-grid");
  pg.slots.forEach((slot, i) => {
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

  document.getElementById("collection-count").textContent = state.collection.length + " cards";
}

function pocketInner(slot, i) {
  const icon = slot.type==="print"?"🖨️":slot.type==="card"?"🃏":"＋";
  const name = (slotLabel(slot)||"slot "+(i+1)).split(" ").slice(0,4).join(" ");
  return `<div class="pocket-inner"><div class="pocket-icon">${icon}</div><div class="pocket-name">${name}</div></div>`;
}

// ── Collection tab ───────────────────────────────────────────────────────────
function renderCollection() {
  const list  = document.getElementById("collection-list");
  const total = document.getElementById("coll-total");
  total.textContent = state.collection.length + " cards";
  document.getElementById("collection-count").textContent = state.collection.length + " cards";

  if (!state.collection.length) {
    list.innerHTML = `<div style="text-align:center;padding:48px 24px;color:var(--muted)"><div style="font-size:48px;margin-bottom:12px;opacity:.4">🃏</div><p>No cards yet — upload some on the Upload tab</p></div>`;
    return;
  }

  // Group by rarity order
  const order = ["Special Illustration Rare","Art Rare","Ultra Rare","Illustration Rare","Double Rare","Hyper Rare","Super Rare","ACE SPEC Rare","Promo","Rare","Common"];
  const groups = {};
  state.collection.forEach(c => {
    const key = c.rarity || "Unknown";
    if (!groups[key]) groups[key] = [];
    groups[key].push(c);
  });

  list.innerHTML = "";
  [...order, ...Object.keys(groups).filter(r => !order.includes(r))].forEach(rarity => {
    if (!groups[rarity]) return;
    const color = rc(rarity);
    const section = document.createElement("div");
    section.className = "rarity-group";
    section.innerHTML = `
      <div class="rarity-header">
        <span class="rarity-badge" style="color:${color};background:${color}22;border-color:${color}44">${rarity}</span>
        <span class="rarity-count">${groups[rarity].length} card${groups[rarity].length!==1?"s":""}</span>
      </div>
    `;
    groups[rarity].forEach(card => {
      const item = document.createElement("div");
      item.className = "collection-card";
      item.style.borderLeftColor = color;
      item.style.cursor = "pointer";
      item.innerHTML = `
        ${card.image ? `<img class="coll-img" src="${card.image}" alt="${card.name}" />` : `<div class="coll-img"></div>`}
        <div class="coll-info">
          <div class="coll-name">${card.name}</div>
          <div class="coll-set">${card.set||""}${card.set&&card.rarity?" · ":""}<span style="color:${color};font-size:10px">${card.rarity||""}</span></div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
          <div class="coll-price">${card.price?"$"+parseFloat(card.price).toFixed(2):""}</div>
          <button class="edit-card-btn" data-id="${card.id}" style="background:none;border:1px solid var(--border);border-radius:6px;color:var(--muted);padding:4px 8px;font-size:11px;cursor:pointer">Edit</button>
        </div>
      `;
      item.querySelector(".edit-card-btn").addEventListener("click", e => {
        e.stopPropagation();
        openCardEditModal(card.id);
      });
      section.appendChild(item);
    });
    list.appendChild(section);
  });
}

document.getElementById("clear-collection").addEventListener("click", () => {
  if (confirm("Clear your entire collection? This cannot be undone.")) {
    state.collection = [];
    saveState();
    renderCollection();
    renderPages();
  }
});

// ── Prints tab ───────────────────────────────────────────────────────────────
function renderPrints() {
  const allPrints = [];
  const seen = new Set();
  // Collect prints from page slots
  state.pages.forEach(pg => {
    pg.slots.forEach(slot => {
      if (slot.type === "print" && slot.name && !seen.has(slot.name)) {
        seen.add(slot.name);
        allPrints.push({ ...slot, pageLabel: pg.label });
      }
    });
  });
  // Also add default print suggestions not yet in pages
  DEFAULT_PRINTS.forEach(dp => {
    dp.slots.forEach(slot => {
      if (!seen.has(slot.name)) {
        seen.add(slot.name);
        allPrints.push({ ...slot, pageLabel: dp.label });
      }
    });
  });

  document.getElementById("prints-count").textContent =
    `${allPrints.length} prints · ${allPrints.filter(p=>p.url).length} with image URLs · 4×6 glossy`;

  const list = document.getElementById("prints-list");
  list.innerHTML = "";
  allPrints.forEach(p => {
    const div = document.createElement("div");
    div.className = "print-item";
    div.innerHTML = `
      <div>
        <div class="print-name">${p.url?"✅ ":""}${p.name}</div>
        <div class="print-meta">🔍 ${p.search||p.name}</div>
        <div class="print-meta">${p.pageLabel} · 7×9.5 cm · 4×6 glossy</div>
      </div>
      <a class="print-find" href="https://pinterest.com/search/pins/?q=${encodeURIComponent(p.search||p.name)}"
        target="_blank" rel="noreferrer">📌 Find</a>
    `;
    list.appendChild(div);
  });

  document.getElementById("copy-prints").onclick = () => {
    const text = allPrints.map(p => `${p.name}\nSearch: ${p.search||p.name}\nPage: ${p.pageLabel}\nSize: 7x9.5cm\n`).join("\n");
    navigator.clipboard.writeText(text).then(() => showToast("Copied!"));
  };
}

// ── Card edit modal (collection tab) ────────────────────────────────────────
function openCardEditModal(cardId) {
  const card = getCard(cardId);
  if (!card) return;

  const modal = document.getElementById("card-edit-modal");
  modal.classList.remove("hidden");

  document.getElementById("ce-name").value   = card.name   || "";
  document.getElementById("ce-set").value    = card.set    || "";
  document.getElementById("ce-price").value  = card.price  || "";

  // Rarity select
  const rarSel = document.getElementById("ce-rarity");
  rarSel.value = card.rarity || "Illustration Rare";

  // Theme select
  const themeSel = document.getElementById("ce-theme");
  themeSel.value = card.theme || "";

  // Image preview
  const preview = document.getElementById("ce-img-preview");
  if (card.image) { preview.src = card.image; preview.classList.remove("hidden"); }
  else { preview.classList.add("hidden"); }

  document.getElementById("ce-save").onclick = () => {
    card.name   = document.getElementById("ce-name").value.trim();
    card.set    = document.getElementById("ce-set").value.trim();
    card.rarity = rarSel.value;
    card.price  = document.getElementById("ce-price").value;
    card.theme  = themeSel.value;
    saveState();
    modal.classList.add("hidden");
    renderCollection();
    renderPages();
    showToast("Card updated!");
  };

  document.getElementById("ce-delete").onclick = () => {
    if (!confirm(`Remove "${card.name}" from your collection?`)) return;
    state.collection = state.collection.filter(c => c.id !== cardId);
    // Also unassign from any page slots
    state.pages.forEach(pg => pg.slots.forEach(slot => {
      if (slot.cardId === cardId) { slot.cardId = null; slot.type = "empty"; }
    }));
    saveState();
    modal.classList.add("hidden");
    renderCollection();
    renderPages();
    showToast("Card removed.");
  };

  document.getElementById("ce-cancel").onclick = () => modal.classList.add("hidden");
  document.getElementById("ce-backdrop").onclick = () => modal.classList.add("hidden");
}

// ── Slot modal (pages tab) ───────────────────────────────────────────────────
let editingSlot = null;

function openSlotModal(pageIdx, slotIdx) {
  editingSlot = { pageIdx, slotIdx };
  const slot  = state.pages[pageIdx].slots[slotIdx];
  const modal = document.getElementById("modal");

  document.getElementById("modal-title").textContent = `Edit Slot ${slotIdx+1} — Page ${state.pages[pageIdx].id}`;

  // Set type buttons
  const currentType = slot.type || "empty";
  updateModalType(currentType);

  // Populate card select from collection
  const cardSelect = document.getElementById("modal-card-select");
  cardSelect.innerHTML = '<option value="">-- Choose from your collection --</option>';

  if (!state.collection.length) {
    cardSelect.innerHTML = '<option value="">No cards yet — upload some first</option>';
  } else {
    // Group by theme for easier browsing
    const byTheme = {};
    state.collection.forEach(c => {
      const group = c.theme || "Unassigned";
      if (!byTheme[group]) byTheme[group] = [];
      byTheme[group].push(c);
    });
    Object.entries(byTheme).sort().forEach(([theme, cards]) => {
      const grp = document.createElement("optgroup");
      grp.label = (THEMES[theme]?.emoji||"") + " " + (THEMES[theme]?.label||theme);
      cards.sort((a,b)=>a.name.localeCompare(b.name)).forEach(c => {
        const opt = document.createElement("option");
        opt.value = c.id;
        opt.textContent = c.name + (c.set ? ` — ${c.set}` : "");
        if (c.id === slot.cardId) opt.selected = true;
        grp.appendChild(opt);
      });
      cardSelect.appendChild(grp);
    });
  }

  // Print fields
  document.getElementById("modal-print-name").value   = slot.name   || "";
  document.getElementById("modal-print-search").value = slot.search || "";
  document.getElementById("modal-print-url").value    = slot.url    || "";
  updatePinterestLink();
  updatePrintPreview();

  modal.classList.remove("hidden");
}

function updateModalType(type) {
  document.querySelectorAll(".type-btn").forEach(b => b.classList.toggle("active", b.dataset.type === type));
  document.getElementById("modal-card-fields").classList.toggle("hidden", type !== "card");
  document.getElementById("modal-print-fields").classList.toggle("hidden", type !== "print");
  document.getElementById("modal-card-fields").dataset.currentType = type;
}

function updatePinterestLink() {
  const q = document.getElementById("modal-print-search").value || document.getElementById("modal-print-name").value || "";
  document.getElementById("pinterest-link").href = `https://pinterest.com/search/pins/?q=${encodeURIComponent(q)}`;
}

function updatePrintPreview() {
  const url = document.getElementById("modal-print-url").value.trim();
  const preview = document.getElementById("modal-print-preview");
  if (url) { preview.src = url; preview.classList.remove("hidden"); preview.onerror = () => preview.classList.add("hidden"); }
  else preview.classList.add("hidden");
}

document.querySelectorAll(".type-btn").forEach(btn => {
  btn.addEventListener("click", () => updateModalType(btn.dataset.type));
});
document.getElementById("modal-print-search").addEventListener("input", updatePinterestLink);
document.getElementById("modal-print-url").addEventListener("input", updatePrintPreview);
document.getElementById("modal-backdrop").addEventListener("click", () => document.getElementById("modal").classList.add("hidden"));
document.getElementById("modal-cancel").addEventListener("click", () => document.getElementById("modal").classList.add("hidden"));

document.getElementById("modal-save").addEventListener("click", () => {
  if (!editingSlot) return;
  const { pageIdx, slotIdx } = editingSlot;
  const slot = state.pages[pageIdx].slots[slotIdx];
  const activeType = document.querySelector(".type-btn.active")?.dataset.type || "empty";

  if (activeType === "card") {
    const selVal = document.getElementById("modal-card-select").value;
    const card   = selVal ? state.collection.find(c => String(c.id) === String(selVal)) : null;
    slot.type    = "card";
    slot.cardId  = card ? card.id : null;
    slot.name    = card ? card.name : "";
    slot.url     = undefined;
  } else if (activeType === "print") {
    slot.type    = "print";
    slot.cardId  = null;
    slot.name    = document.getElementById("modal-print-name").value.trim();
    slot.search  = document.getElementById("modal-print-search").value.trim();
    slot.url     = document.getElementById("modal-print-url").value.trim();
  } else {
    slot.type    = "empty";
    slot.cardId  = null;
    slot.name    = "";
    slot.url     = undefined;
  }

  saveState();
  document.getElementById("modal").classList.add("hidden");
  renderPages();
  renderPrints();
});

// ── Toast ─────────────────────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.createElement("div");
  t.className = "toast"; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add("show"), 10);
  setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 300); }, 3000);
}

// ── Init ──────────────────────────────────────────────────────────────────────
renderPages();
renderCollection();
renderPrints();

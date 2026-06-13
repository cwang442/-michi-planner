// ── State ──────────────────────────────────────────────────────────────────
const THEMES = {
  teamrocket: { label:"Team Rocket",    emoji:"🚀", color:"#E63946" },
  eeveelutions:{ label:"Eeveelutions", emoji:"🌈", color:"#C084FC" },
  pink:        { label:"Pink Page",     emoji:"🩷", color:"#FFAFCC" },
  green:       { label:"Green & Nature",emoji:"🌿", color:"#34D399" },
  psyduck:     { label:"Psyduck",       emoji:"🦆", color:"#FFE135" },
  pikachu:     { label:"Pikachu",       emoji:"⚡", color:"#FFE135" },
  sleeping:    { label:"Sleeping",      emoji:"💤", color:"#818CF8" },
  water:       { label:"Water & Ocean", emoji:"🌊", color:"#48CAE4" },
};

const RARITY_COLORS = {
  SIR:"#F59E0B", IR:"#818CF8", AR:"#34D399",
  UR:"#48CAE4", Promo:"#C084FC", "Hyper Rare":"#FFAFCC",
  SAR:"#F59E0B", Rare:"#94A3B8"
};

const DEFAULT_PAGES = [
  { id:1, theme:"teamrocket", label:"Team Rocket — Page 1", pct:83,
    slots:[
      {type:"card",name:"Team Rocket's Giovanni",cardId:null},
      {type:"card",name:"Team Rocket's Ariana",cardId:null},
      {type:"card",name:"N's Zoroark ex",cardId:null},
      {type:"card",name:"Iono's Bellibolt ex",cardId:null},
      {type:"card",name:"Team Rocket's Meowth",cardId:null},
      {type:"card",name:"Team Rocket's Mimikyu",cardId:null},
      {type:"card",name:"Team Rocket's Houndoom",cardId:null},
      {type:"card",name:"Team Rocket's Weezing",cardId:null},
      {type:"print",name:"Team Rocket Hideout art",search:"Team Rocket hideout Pokemon anime art",url:""},
      {type:"print",name:"Jessie James Meowth art",search:"Jessie James Meowth Team Rocket anime art",url:""},
      {type:"card",name:"Houndour IR",cardId:null},
      {type:"card",name:"Mightyena IR",cardId:null},
    ]},
  { id:2, theme:"teamrocket", label:"Team Rocket — Page 2", pct:75,
    slots:[
      {type:"card",name:"Team Rocket's Dugtrio",cardId:null},
      {type:"card",name:"Team Rocket's Wobbuffet",cardId:null},
      {type:"card",name:"Team Rocket's Petrel",cardId:null},
      {type:"card",name:"Team Rocket's Raticate",cardId:null},
      {type:"card",name:"Team Rocket's Zapdos",cardId:null},
      {type:"card",name:"N's Reshiram",cardId:null},
      {type:"card",name:"N's Zekrom",cardId:null},
      {type:"card",name:"N's Zorua",cardId:null},
      {type:"card",name:"Iono's Wattrel",cardId:null},
      {type:"print",name:"Team Rocket blasting off",search:"Team Rocket blasting off sky anime art",url:""},
      {type:"print",name:"N trainer art",search:"N trainer Pokemon Black White art",url:""},
      {type:"print",name:"Team Rocket R logo",search:"Team Rocket R logo dark aesthetic art",url:""},
    ]},
  { id:3, theme:"eeveelutions", label:"Eeveelutions", pct:25,
    slots:[
      {type:"card",name:"Leafeon (CN)",cardId:null},
      {type:"card",name:"Eevee (CN Full Art)",cardId:null},
      {type:"card",name:"Eevee SV Promo",cardId:null},
      {type:"print",name:"Vaporeon art",search:"Vaporeon watercolour aesthetic art",url:""},
      {type:"print",name:"Flareon art",search:"Flareon cozy fire illustration art",url:""},
      {type:"print",name:"Jolteon art",search:"Jolteon electric illustration art",url:""},
      {type:"print",name:"Espeon art",search:"Espeon moonlight psychic art",url:""},
      {type:"print",name:"Umbreon art",search:"Umbreon night stars illustration art",url:""},
      {type:"print",name:"Sylveon art",search:"Sylveon fairy ribbon illustration art",url:""},
      {type:"print",name:"Glaceon art",search:"Glaceon ice snow illustration art",url:""},
      {type:"print",name:"Espeon + Umbreon",search:"Espeon Umbreon together illustration art",url:""},
      {type:"print",name:"All Eeveelutions",search:"all eeveelutions group illustration art",url:""},
    ]},
  { id:4, theme:"pink", label:"Pink Page", pct:92,
    slots:[
      {type:"card",name:"Clefairy IR",cardId:null},
      {type:"card",name:"Mega Clefable ex",cardId:null},
      {type:"card",name:"Lillie's Clefairy ex",cardId:null},
      {type:"card",name:"Wigglytuff IR",cardId:null},
      {type:"card",name:"Mega Starmie ex",cardId:null},
      {type:"card",name:"Fezandipiti ex",cardId:null},
      {type:"card",name:"Meloetta IR",cardId:null},
      {type:"card",name:"Flamigo IR",cardId:null},
      {type:"card",name:"Swablu IR",cardId:null},
      {type:"card",name:"Exeggcute IR",cardId:null},
      {type:"card",name:"Mr. Mime IR",cardId:null},
      {type:"print",name:"Clefairy moon art",search:"Clefairy moon night pink pastel illustration",url:""},
    ]},
  { id:5, theme:"green", label:"Green & Nature", pct:75,
    slots:[
      {type:"card",name:"Bulbasaur IR",cardId:null},
      {type:"card",name:"Ivysaur IR",cardId:null},
      {type:"card",name:"Tangela IR",cardId:null},
      {type:"card",name:"Forest of Vitality",cardId:null},
      {type:"card",name:"Applin IR",cardId:null},
      {type:"card",name:"Shuckle IR",cardId:null},
      {type:"card",name:"Dolliv IR",cardId:null},
      {type:"card",name:"Budew IR",cardId:null},
      {type:"card",name:"Cynthia's Roserade",cardId:null},
      {type:"card",name:"Starly IR",cardId:null},
      {type:"print",name:"Venusaur forest art",search:"Venusaur lush forest botanical illustration",url:""},
      {type:"print",name:"Chikorita meadow art",search:"Chikorita meadow Gen 2 illustration art",url:""},
    ]},
  { id:6, theme:"psyduck", label:"Psyduck", pct:8,
    slots:[
      {type:"card",name:"Psyduck Art Rare",cardId:null},
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
  { id:7, theme:"pikachu", label:"Pikachu", pct:33,
    slots:[
      {type:"card",name:"Pikachu ex UR",cardId:null},
      {type:"card",name:"Surfing Pikachu VMAX",cardId:null},
      {type:"card",name:"Pikachu Shiny CN",cardId:null},
      {type:"card",name:"Pachirisu IR",cardId:null},
      {type:"print",name:"Pikachu forest art",search:"Pikachu sitting forest illustration art",url:""},
      {type:"print",name:"Pikachu sleeping art",search:"Pikachu sleeping peaceful cute illustration",url:""},
      {type:"print",name:"Pikachu rain art",search:"Pikachu rain umbrella cozy illustration",url:""},
      {type:"print",name:"Pikachu + Ash art",search:"Pikachu Ash together Pokemon anime art",url:""},
      {type:"print",name:"Pichu baby art",search:"Pichu baby cute illustration art",url:""},
      {type:"print",name:"Pikachu ketchup art",search:"Pikachu ketchup bottle sleeping cute art",url:""},
      {type:"print",name:"Pikachu vintage art",search:"Pikachu vintage Gen 1 1996 illustration",url:""},
      {type:"print",name:"Raichu evolution art",search:"Raichu Pikachu Pichu evolution chart art",url:""},
    ]},
  { id:8, theme:"sleeping", label:"Sleeping Pokémon", pct:58,
    slots:[
      {type:"card",name:"Snorlax Promo",cardId:null},
      {type:"card",name:"Skwovet IR",cardId:null},
      {type:"card",name:"Slakoth IR",cardId:null},
      {type:"card",name:"Lechonk IR",cardId:null},
      {type:"card",name:"Vulpix IR",cardId:null},
      {type:"card",name:"Magby IR",cardId:null},
      {type:"card",name:"Hoothoot IR",cardId:null},
      {type:"print",name:"Snorlax cozy art",search:"Snorlax sleeping cozy forest illustration",url:""},
      {type:"print",name:"Jigglypuff art",search:"Jigglypuff singing everyone sleeping art",url:""},
      {type:"print",name:"Cleffa stars art",search:"Cleffa sleeping stars night illustration",url:""},
      {type:"print",name:"Eevee sleeping art",search:"Eevee sleeping cozy blanket illustration",url:""},
      {type:"print",name:"Drowzee dream art",search:"Drowzee Hypno dreaming psychic illustration",url:""},
    ]},
  { id:9, theme:"water", label:"Water & Ocean", pct:75,
    slots:[
      {type:"card",name:"Poliwhirl IR",cardId:null},
      {type:"card",name:"Horsea IR",cardId:null},
      {type:"card",name:"Piplup IR",cardId:null},
      {type:"card",name:"Wailord IR",cardId:null},
      {type:"card",name:"Frogadier IR",cardId:null},
      {type:"card",name:"Goldeen IR",cardId:null},
      {type:"card",name:"Suicune EB Promo",cardId:null},
      {type:"card",name:"Articuno IR",cardId:null},
      {type:"card",name:"Drampa JP AR",cardId:null},
      {type:"print",name:"Magikarp koi art",search:"Magikarp koi ocean illustration art",url:""},
      {type:"print",name:"Vaporeon ocean art",search:"Vaporeon ocean waves swimming illustration",url:""},
      {type:"print",name:"Lapras sunset art",search:"Lapras ocean sunset sailing illustration",url:""},
    ]},
];

// ── Storage helpers ────────────────────────────────────────────────────────
function loadState() {
  try {
    const pages = JSON.parse(localStorage.getItem("michi_pages") || "null");
    const collection = JSON.parse(localStorage.getItem("michi_collection") || "[]");
    return {
      pages: pages || DEFAULT_PAGES,
      collection
    };
  } catch(e) {
    return { pages: DEFAULT_PAGES, collection: [] };
  }
}

function saveState() {
  localStorage.setItem("michi_pages", JSON.stringify(state.pages));
  localStorage.setItem("michi_collection", JSON.stringify(state.collection));
}

// ── App state ───────────────────────────────────────────────────────────────
const state = loadState();
let currentPage = 0;
let pendingImages = [];
let editingSlot = null; // {pageIdx, slotIdx}

// ── Helpers ─────────────────────────────────────────────────────────────────
function rc(rarity) { return RARITY_COLORS[rarity] || "#6B6B8F"; }
function tc(theme)  { return THEMES[theme]?.color || "#818CF8"; }
function te(theme)  { return THEMES[theme]?.emoji || "📄"; }
function getCardById(id) { return state.collection.find(c => c.id === id); }

function cardDisplayName(slot) {
  if (slot.cardId) {
    const card = getCardById(slot.cardId);
    return card ? card.name : slot.name;
  }
  return slot.name;
}

function cardImage(slot) {
  if (slot.cardId) {
    const card = getCardById(slot.cardId);
    return card?.image || null;
  }
  return null;
}

// ── Tab switching ───────────────────────────────────────────────────────────
document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
  });
});

// ── Pages tab ───────────────────────────────────────────────────────────────
function renderPages() {
  // Pills
  const pills = document.getElementById("page-pills");
  pills.innerHTML = "";
  state.pages.forEach((pg, i) => {
    const btn = document.createElement("button");
    btn.className = "page-pill" + (i === currentPage ? " active" : "");
    btn.textContent = te(pg.theme) + " Pg " + pg.id;
    btn.style.borderColor = i === currentPage ? tc(pg.theme) : "";
    btn.style.color = i === currentPage ? tc(pg.theme) : "";
    btn.style.background = i === currentPage ? tc(pg.theme) + "22" : "";
    btn.addEventListener("click", () => { currentPage = i; renderPages(); });
    pills.appendChild(btn);
  });

  renderSuggestions();

  // Page view
  const pg = state.pages[currentPage];
  const view = document.getElementById("page-view");
  const color = tc(pg.theme);
  const cardCount  = pg.slots.filter(s => s.type === "card").length;
  const printCount = pg.slots.filter(s => s.type === "print").length;
  const emptyCount = pg.slots.filter(s => s.type === "empty" || !s.type).length;

  view.innerHTML = `
    <div class="page-header">
      <div style="flex:1">
        <span class="page-theme-badge" style="background:${color}22;border:1px solid ${color}44;color:${color}">
          ${te(pg.theme)} ${pg.label}
        </span>
        <div class="progress-bar">
          <div class="progress-fill" style="width:${pg.pct}%;background:${color}"></div>
        </div>
        <p class="progress-label">${pg.pct}% complete</p>
      </div>
      <div style="display:flex;gap:6px;margin-top:8px">
        <button onclick="addPage(state.pages[currentPage].theme)" style="background:none;border:1px solid #818CF855;color:#818CF8;border-radius:6px;padding:5px 12px;font-size:12px;cursor:pointer">＋ Add page</button>
        <button onclick="deletePage(currentPage)" style="background:none;border:1px solid #F8717133;color:#F87171;border-radius:6px;padding:5px 12px;font-size:12px;cursor:pointer">🗑 Delete</button>
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
      <div class="binder-label">Slot breakdown</div>
      <div class="slot-grid" id="slot-grid"></div>
    </div>
  `;

  // Pockets
  const grid = document.getElementById("binder-grid");
  pg.slots.forEach((slot, i) => {
    const div = document.createElement("div");
    div.className = "pocket" + (slot.type === "card" ? " is-card" : slot.type === "print" ? " is-print" : "");
    div.addEventListener("click", () => openModal(currentPage, i));

    const img = cardImage(slot) || (slot.type === "print" ? slot.url : null);
    if (img) {
      const el = document.createElement("img");
      el.src = img;
      el.alt = cardDisplayName(slot);
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

  // Slot list
  const slotGrid = document.getElementById("slot-grid");
  pg.slots.forEach((slot, i) => {
    const div = document.createElement("div");
    div.className = "slot-item";
    div.innerHTML = `
      <span class="slot-icon">${slot.type === "print" ? "🖨️" : slot.type === "card" ? "🃏" : "○"}</span>
      <span class="slot-name ${slot.name ? "filled" : ""}">${cardDisplayName(slot) || "Slot " + (i+1)}</span>
      ${slot.type === "print" && slot.url ? '<span class="slot-done">✓</span>' : ""}
    `;
    div.addEventListener("click", () => openModal(currentPage, i));
    slotGrid.appendChild(div);
  });
}

function innerFallback(slot, i) {
  const icon = slot.type === "print" ? "🖨️" : slot.type === "card" ? "🃏" : "＋";
  const name = cardDisplayName(slot) || ("slot " + (i+1));
  return `<div class="pocket-inner"><div class="pocket-icon">${icon}</div><div class="pocket-name">${name.split(" ").slice(0,4).join(" ")}</div></div>`;
}

// ── Collection tab ──────────────────────────────────────────────────────────
function renderCollection() {
  const list = document.getElementById("collection-list");
  const total = document.getElementById("coll-total");
  const badge = document.getElementById("collection-count");

  total.textContent = state.collection.length + " cards in collection";
  badge.textContent = state.collection.length + " cards";

  if (!state.collection.length) {
    list.innerHTML = `<div style="text-align:center;padding:48px 24px;color:var(--muted)"><div style="font-size:48px;margin-bottom:12px;opacity:.4">🃏</div><p>No cards yet — upload some on the Upload tab</p></div>`;
    return;
  }

  // Group by rarity
  const order = ["SIR","AR","UR","IR","Promo","Hyper Rare","SAR","Shiny UR","Shiny","Rare"];
  const groups = {};
  state.collection.forEach(c => {
    if (!groups[c.rarity]) groups[c.rarity] = [];
    groups[c.rarity].push(c);
  });

  list.innerHTML = "";
  [...order, ...Object.keys(groups).filter(r => !order.includes(r))].forEach(rarity => {
    if (!groups[rarity]) return;
    const color = rc(rarity);
    const div = document.createElement("div");
    div.className = "rarity-group";
    div.innerHTML = `
      <div class="rarity-header">
        <span class="rarity-badge" style="color:${color};background:${color}22;border-color:${color}44">${rarity}</span>
        <span class="rarity-count">${groups[rarity].length} card${groups[rarity].length !== 1 ? "s" : ""}</span>
      </div>
    `;
    groups[rarity].forEach(card => {
      const item = document.createElement("div");
      item.className = "collection-card";
      item.style.borderLeftColor = color;
      item.innerHTML = `
        ${card.image ? `<img class="coll-img" src="${card.image}" alt="${card.name}" />` : `<div class="coll-img"></div>`}
        <div class="coll-info">
          <div class="coll-name">${card.name}</div>
          <div class="coll-set">${card.set || ""}</div>
        </div>
        <div class="coll-price">${card.price ? "$" + parseFloat(card.price).toFixed(2) : ""}</div>
      `;
      div.appendChild(item);
    });
    list.appendChild(div);
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

// ── Upload tab ──────────────────────────────────────────────────────────────
const uploadBtn  = document.getElementById("upload-btn");
const fileInput  = document.getElementById("file-input");
const previewDiv = document.getElementById("upload-preview");
const cardForm   = document.getElementById("card-form");

uploadBtn.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", e => handleFiles(e.target.files));

const uploadZone = document.getElementById("upload-zone");
uploadZone.addEventListener("dragover", e => { e.preventDefault(); uploadZone.classList.add("drag-over"); });
uploadZone.addEventListener("dragleave", () => uploadZone.classList.remove("drag-over"));
uploadZone.addEventListener("drop", e => { e.preventDefault(); uploadZone.classList.remove("drag-over"); handleFiles(e.dataTransfer.files); });

function handleFiles(files) {
  Array.from(files).filter(f => f.type.startsWith("image/")).forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      pendingImages.push({ url: e.target.result, name: file.name });
      renderUploadPreview();
      cardForm.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
  });
}

function renderUploadPreview() {
  previewDiv.innerHTML = "";
  pendingImages.forEach((img, i) => {
    const wrap = document.createElement("div");
    wrap.className = "preview-thumb";
    wrap.innerHTML = `<img src="${img.url}" alt="${img.name}" /><button>×</button>`;
    wrap.querySelector("button").addEventListener("click", () => {
      pendingImages.splice(i, 1);
      renderUploadPreview();
      if (!pendingImages.length) cardForm.classList.add("hidden");
    });
    previewDiv.appendChild(wrap);
  });
}

document.getElementById("save-card").addEventListener("click", () => {
  const name  = document.getElementById("card-name").value.trim();
  const set   = document.getElementById("card-set").value.trim();
  const rarity= document.getElementById("card-rarity").value;
  const price = document.getElementById("card-price").value;
  const theme = document.getElementById("card-theme").value;

  if (!name) { alert("Please enter a card name."); return; }

  const card = {
    id: Date.now() + Math.random(),
    name, set, rarity, price, theme,
    image: pendingImages[0]?.url || null
  };

  state.collection.push(card);
  saveState();

  // Reset
  pendingImages = [];
  previewDiv.innerHTML = "";
  cardForm.classList.add("hidden");
  document.getElementById("card-name").value = "";
  document.getElementById("card-set").value = "";
  document.getElementById("card-price").value = "";
  document.getElementById("card-theme").value = "";
  fileInput.value = "";

  renderCollection();
  renderPages();
  alert(`"${card.name}" added to your collection!`);
});

document.getElementById("cancel-card").addEventListener("click", () => {
  pendingImages = [];
  previewDiv.innerHTML = "";
  cardForm.classList.add("hidden");
  fileInput.value = "";
});

// ── Prints tab ──────────────────────────────────────────────────────────────
function renderPrints() {
  const seen = new Set();
  const prints = [];
  state.pages.forEach(pg => {
    pg.slots.forEach(slot => {
      if (slot.type !== "print" || !slot.name || seen.has(slot.name)) return;
      seen.add(slot.name);
      prints.push({ ...slot, pageLabel: pg.label });
    });
  });

  document.getElementById("prints-count").textContent =
    `${prints.length} prints · ${prints.filter(p => p.url).length} with image URLs · 4×6 glossy`;

  const list = document.getElementById("prints-list");
  list.innerHTML = "";
  prints.forEach(p => {
    const div = document.createElement("div");
    div.className = "print-item";
    div.innerHTML = `
      <div>
        <div class="print-name">${p.url ? "✅ " : ""}${p.name}</div>
        <div class="print-meta">🔍 ${p.search || p.name}</div>
        <div class="print-meta">${p.pageLabel} · 7×9.5 cm · 4×6 glossy</div>
      </div>
      <a class="print-find" href="https://pinterest.com/search/pins/?q=${encodeURIComponent(p.search || p.name)}"
        target="_blank" rel="noreferrer">📌 Find</a>
    `;
    list.appendChild(div);
  });

  document.getElementById("copy-prints").onclick = () => {
    const text = prints.map(p =>
      `${p.name}\
Search: ${p.search || p.name}\
Page: ${p.pageLabel}\
Size: 7x9.5cm\
`
    ).join("\
");
    navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard!"));
  };
}

// ── Modal ───────────────────────────────────────────────────────────────────
const modal       = document.getElementById("modal");
const modalTitle  = document.getElementById("modal-title");
const modalBdrop  = document.getElementById("modal-backdrop");
const typeBtns    = document.querySelectorAll(".type-btn");
const cardFields  = document.getElementById("modal-card-fields");
const printFields = document.getElementById("modal-print-fields");
const cardSelect  = document.getElementById("modal-card-select");
const printName   = document.getElementById("modal-print-name");
const printSearch = document.getElementById("modal-print-search");
const printUrl    = document.getElementById("modal-print-url");
const printPreview= document.getElementById("modal-print-preview");
const pinterestLnk= document.getElementById("pinterest-link");

let modalType = "card";

function openModal(pageIdx, slotIdx) {
  editingSlot = { pageIdx, slotIdx };
  const slot = state.pages[pageIdx].slots[slotIdx];
  modalTitle.textContent = `Edit Slot ${slotIdx + 1} — Page ${state.pages[pageIdx].id}`;

  // Set type
  modalType = slot.type || "empty";
  updateModalType(modalType);

  // Populate card select
  cardSelect.innerHTML = '<option value="">-- Choose card --</option>';
  state.collection.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = c.name + (c.set ? ` (${c.set})` : "");
    if (c.id === slot.cardId) opt.selected = true;
    cardSelect.appendChild(opt);
  });
  if (slot.type === "card" && slot.name && !slot.cardId) {
    // Show name as hint
  }

  printName.value   = slot.name || "";
  printSearch.value = slot.search || "";
  printUrl.value    = slot.url || "";
  updatePinterestLink();
  updatePrintPreview();

  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  editingSlot = null;
}

modalBdrop.addEventListener("click", closeModal);
document.getElementById("modal-cancel").addEventListener("click", closeModal);

typeBtns.forEach(btn => {
  btn.addEventListener("click", () => updateModalType(btn.dataset.type));
});

function updateModalType(type) {
  modalType = type;
  typeBtns.forEach(b => b.classList.toggle("active", b.dataset.type === type));
  cardFields.classList.toggle("hidden",  type !== "card");
  printFields.classList.toggle("hidden", type !== "print");
}

printSearch.addEventListener("input", updatePinterestLink);
printUrl.addEventListener("input", updatePrintPreview);

function updatePinterestLink() {
  const q = printSearch.value || printName.value || "";
  pinterestLnk.href = `https://pinterest.com/search/pins/?q=${encodeURIComponent(q)}`;
}

function updatePrintPreview() {
  const url = printUrl.value.trim();
  if (url) {
    printPreview.src = url;
    printPreview.classList.remove("hidden");
    printPreview.onerror = () => printPreview.classList.add("hidden");
  } else {
    printPreview.classList.add("hidden");
  }
}

document.getElementById("modal-save").addEventListener("click", () => {
  if (!editingSlot) return;
  const { pageIdx, slotIdx } = editingSlot;
  const slot = state.pages[pageIdx].slots[slotIdx];

  if (modalType === "card") {
    const selectedId = cardSelect.value ? parseFloat(cardSelect.value) : null;
    const card = selectedId ? state.collection.find(c => c.id == cardSelect.value) : null;
    slot.type   = "card";
    slot.cardId = card ? card.id : null;
    slot.name   = card ? card.name : slot.name;
  } else if (modalType === "print") {
    slot.type   = "print";
    slot.name   = printName.value.trim() || slot.name;
    slot.search = printSearch.value.trim();
    slot.url    = printUrl.value.trim();
  } else {
    slot.type   = "empty";
    slot.cardId = null;
    slot.url    = "";
  }

  saveState();
  closeModal();
  renderPages();
  renderPrints();
});


// ── Page management ───────────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.createElement("div");
  t.textContent = msg;
  t.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#1A1A2E;color:#E2E2F0;border:1px solid #2d2d48;border-radius:8px;padding:8px 16px;font-size:12px;z-index:999;pointer-events:none;white-space:nowrap";
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

function deletePage(pageIdx) {
  if (state.pages.length <= 1) { showToast("Can't delete the last page"); return; }
  const pg = state.pages[pageIdx];
  if (!confirm('Delete "' + pg.label + '" page?')) return;
  state.pages.splice(pageIdx, 1);
  if (currentPage >= state.pages.length) currentPage = state.pages.length - 1;
  saveState();
  renderPages();
}

function addPage(themeId) {
  const theme = THEMES[themeId];
  if (!theme) return;
  const newId = Math.max(...state.pages.map(p => p.id)) + 1;
  state.pages.push({
    id: newId,
    theme: themeId,
    label: theme.label,
    pct: 0,
    slots: Array(12).fill(null).map(() => ({ type: "empty" }))
  });
  currentPage = state.pages.length - 1;
  saveState();
  renderPages();
  showToast(theme.emoji + " " + theme.label + " page added");
}

function renderSuggestions() {
  const container = document.getElementById("theme-suggestions");
  if (!container) return;

  // Find themes that have unassigned cards but no page
  const assignedIds = new Set();
  state.pages.forEach(pg => pg.slots.forEach(s => { if (s.cardId) assignedIds.add(s.cardId); }));

  const waiting = {};
  state.collection.forEach(c => {
    if (c.theme && !assignedIds.has(c.id)) {
      waiting[c.theme] = (waiting[c.theme] || 0) + 1;
    }
  });

  const suggestions = Object.entries(waiting)
    .filter(([theme]) => !state.pages.some(p => p.theme === theme))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  if (!suggestions.length) {
    container.style.display = "none";
    return;
  }

  container.style.display = "block";
  container.innerHTML = '<div style="font-size:11px;color:var(--muted);font-weight:700;margin-bottom:6px">💡 Suggested pages</div>' +
    suggestions.map(([themeId, count]) => {
      const theme = THEMES[themeId];
      if (!theme) return "";
      return '<div style="display:flex;align-items:center;gap:8px;padding:7px 10px;border:1px solid ' + theme.color + '33;border-radius:8px;margin-bottom:5px">' +
        '<span style="flex:1;font-size:12px;font-weight:600">' + theme.emoji + ' ' + theme.label + '</span>' +
        '<span style="font-size:10px;color:' + theme.color + ';font-weight:700">' + count + ' card' + (count>1?'s':'') + ' waiting</span>' +
        '<button data-theme="' + themeId + '" class="suggest-add-btn" style="background:' + theme.color + '33;border:1px solid ' + theme.color + '55;color:' + theme.color + ';border-radius:6px;padding:3px 8px;font-size:11px;cursor:pointer">+ Add page</button>' +
        '</div>';
    }).join("");

  // Wire up the add buttons
  container.querySelectorAll(".suggest-add-btn").forEach(btn => {
    btn.addEventListener("click", () => addPage(btn.dataset.theme));
  });
}

// ── Init ────────────────────────────────────────────────────────────────────
renderPages();
renderCollection();
renderPrints();
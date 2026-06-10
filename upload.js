// ── Collectr Screenshot Parser ────────────────────────────────────────────
// Reads card data from Collectr app screenshots using Tesseract.js OCR
// Screenshots are 1290x2796, 2-column grid, 3 rows visible

const COLLECTR = {
  // Card image boundaries (the art portion of each cell)
  COL: [[12, 635], [655, 1278]],
  ROW: [[370, 765], [1145, 1540], [1920, 2315]],

  // Full cell boundaries (includes name, set, rarity, price text below image)
  CELL_ROW: [[170, 790], [940, 1560], [1710, 2340]],
};

const RARITY_PATTERNS = [
  "Special Illustration Rare",
  "Illustration Rare",
  "Art Rare",
  "Ultra Rare",
  "Hyper Rare",
  "Promo",
  "Rare",
];

// Crop a region from an image and return a data URL
function cropRegion(imgEl, x1, y1, x2, y2) {
  const canvas = document.createElement("canvas");
  canvas.width  = x2 - x1;
  canvas.height = y2 - y1;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(imgEl, x1, y1, x2 - x1, y2 - y1, 0, 0, x2 - x1, y2 - y1);
  return canvas.toDataURL("image/jpeg", 0.85);
}

// Resize an image element to max dimension, return data URL
function resizeImg(imgEl, maxW, maxH) {
  const scale = Math.min(maxW / imgEl.naturalWidth, maxH / imgEl.naturalHeight, 1);
  const w = Math.round(imgEl.naturalWidth  * scale);
  const h = Math.round(imgEl.naturalHeight * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  canvas.getContext("2d").drawImage(imgEl, 0, 0, w, h);
  return canvas.toDataURL("image/jpeg", 0.9);
}

// Load a data URL into an Image element
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload  = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Extract rarity from a text block
function extractRarity(text) {
  for (const r of RARITY_PATTERNS) {
    if (text.toLowerCase().includes(r.toLowerCase())) return r;
  }
  return "IR";
}

// Extract price from text (looks for $XX.XX CAD pattern)
function extractPrice(text) {
  const m = text.match(/\$\s*([\d,]+\.?\d*)\s*(?:CAD)?/);
  if (m) return m[1].replace(",", "");
  return "";
}

// Extract card name — first non-empty line that isn't a price or rarity
function extractName(lines) {
  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    if (/^\$/.test(t)) continue;
    if (/^\d/.test(t)) continue;
    if (t.length < 2) continue;
    if (RARITY_PATTERNS.some(r => t.toLowerCase().includes(r.toLowerCase()))) continue;
    if (/near mint|lightly played|moderately/i.test(t)) continue;
    if (/holofoil|qty|cad|\%/i.test(t)) continue;
    return t;
  }
  return "";
}

// Extract set name — line after card name, before rarity
function extractSet(lines, nameIdx) {
  for (let i = nameIdx + 1; i < lines.length; i++) {
    const t = lines[i].trim();
    if (!t) continue;
    if (RARITY_PATTERNS.some(r => t.toLowerCase().includes(r.toLowerCase()))) break;
    if (/near mint|lightly played|\$|qty|cad|\%/i.test(t)) continue;
    if (t.length > 2) return t;
  }
  return "";
}

// Parse OCR text from one card cell into structured data
function parseCardText(rawText) {
  const lines = rawText.split("\n").map(l => l.trim()).filter(Boolean);
  const name   = extractName(lines);
  const nameIdx= lines.findIndex(l => l.trim() === name);
  const set    = extractSet(lines, nameIdx);
  const rarity = extractRarity(rawText);
  const price  = extractPrice(rawText);
  return { name, set, rarity, price };
}

// Main: process a single Collectr screenshot file
// Returns array of { name, set, rarity, price, image (data URL of card art) }
async function processCollectrScreenshot(file, onProgress) {
  onProgress("Loading image...", 5);

  const url = await new Promise(res => {
    const r = new FileReader();
    r.onload = e => res(e.target.result);
    r.readAsDataURL(file);
  });

  const img = await loadImage(url);
  const W = img.naturalWidth, H = img.naturalHeight;

  // Detect if this looks like a Collectr screenshot (tall portrait, 2 columns)
  const isCollectr = W >= 600 && H >= 1200 && H > W * 1.5;

  if (!isCollectr) {
    // Single card photo — treat as one card, let user fill details
    onProgress("Single card detected", 90);
    return [{
      name: "", set: "", rarity: "IR", price: "",
      image: resizeImg(img, 300, 420),
      manual: true
    }];
  }

  onProgress("Detecting card positions...", 10);

  // Scale factor in case image dimensions differ from 1290x2796
  const scaleX = W / 1290;
  const scaleY = H / 2796;

  const results = [];

  // Load Tesseract lazily
  onProgress("Loading text recognition...", 20);

  // We'll OCR the text region below each card image
  // Text region = from bottom of card image to bottom of cell
  const positions = [];
  for (let row = 0; row < COLLECTR.ROW.length; row++) {
    for (let col = 0; col < COLLECTR.COL.length; col++) {
      const [cx1, cx2] = COLLECTR.COL[col];
      const [ry1, ry2] = COLLECTR.ROW[row];
      const [cy1, cy2] = COLLECTR.CELL_ROW[row];

      // Scaled coords
      const sx1 = Math.round(cx1 * scaleX), sx2 = Math.round(cx2 * scaleX);
      const sry1= Math.round(ry1 * scaleY), sry2= Math.round(ry2 * scaleY);
      const scy2= Math.round(cy2 * scaleY);

      // Card art crop
      const artUrl = cropRegion(img, sx1, sry1, sx2, sry2);

      // Text region (below art, within cell)
      const textUrl = cropRegion(img, sx1, sry2, sx2, scy2);

      positions.push({ row, col, artUrl, textUrl });
    }
  }

  onProgress("Reading card names...", 30);

  // Use Tesseract to OCR each text region
  const { createWorker } = Tesseract;
  const worker = await createWorker("eng", 1, {
    logger: () => {},
  });

  for (let i = 0; i < positions.length; i++) {
    const pos = positions[i];
    const pct = 30 + Math.round((i / positions.length) * 60);
    onProgress(`Reading card ${i + 1} of ${positions.length}...`, pct);

    try {
      const { data } = await worker.recognize(pos.textUrl);
      const parsed = parseCardText(data.text);

      // Only include if we got a name (skip blank/bottom-cut cells)
      if (parsed.name && parsed.name.length > 1) {
        results.push({
          ...parsed,
          image: pos.artUrl,
          manual: false,
        });
      }
    } catch(e) {
      // Skip cells that fail
    }
  }

  await worker.terminate();
  onProgress("Done!", 100);

  return results;
}

// ── Upload UI ─────────────────────────────────────────────────────────────
function initUploadTab() {
  const dropZone   = document.getElementById("upload-zone");
  const fileInput  = document.getElementById("file-input");
  const uploadBtn  = document.getElementById("upload-btn");
  const progressWrap = document.getElementById("ocr-progress");
  const progressBar  = document.getElementById("ocr-bar");
  const progressMsg  = document.getElementById("ocr-msg");
  const reviewWrap = document.getElementById("review-wrap");
  const reviewList = document.getElementById("review-list");
  const confirmBtn = document.getElementById("confirm-cards");
  const retryBtn   = document.getElementById("retry-upload");

  let pendingCards = [];

  function setProgress(msg, pct) {
    progressMsg.textContent  = msg;
    progressBar.style.width  = pct + "%";
  }

  async function handleFile(file) {
    if (!file.type.startsWith("image/")) return;

    // Show progress
    progressWrap.classList.remove("hidden");
    reviewWrap.classList.add("hidden");
    confirmBtn.classList.add("hidden");
    retryBtn.classList.add("hidden");
    setProgress("Starting...", 0);

    try {
      pendingCards = await processCollectrScreenshot(file, setProgress);

      if (!pendingCards.length) {
        setProgress("No cards detected. Try a clearer screenshot.", 100);
        return;
      }

      // Show review UI
      progressWrap.classList.add("hidden");
      renderReview(pendingCards);
      reviewWrap.classList.remove("hidden");
      confirmBtn.classList.remove("hidden");
      retryBtn.classList.remove("hidden");

    } catch(e) {
      setProgress("Error: " + e.message, 0);
    }
  }

  function renderReview(cards) {
    reviewList.innerHTML = "";
    cards.forEach((card, i) => {
      const div = document.createElement("div");
      div.className = "review-card";
      div.innerHTML = `
        <img class="review-img" src="${card.image}" alt="${card.name}" />
        <div class="review-fields">
          <input class="review-input" data-i="${i}" data-field="name"   value="${escHtml(card.name)}"   placeholder="Card name" />
          <input class="review-input" data-i="${i}" data-field="set"    value="${escHtml(card.set)}"    placeholder="Set name" />
          <div class="review-row">
            <select class="review-select" data-i="${i}" data-field="rarity">
              ${RARITY_PATTERNS.map(r => `<option ${r === card.rarity ? "selected" : ""}>${r}</option>`).join("")}
            </select>
            <input class="review-input price-input" data-i="${i}" data-field="price" value="${escHtml(card.price)}" placeholder="Price CAD" />
          </div>
          <select class="review-select" data-i="${i}" data-field="theme">
            <option value="">-- Theme --</option>
            <option value="teamrocket">🚀 Team Rocket</option>
            <option value="eeveelutions">🌈 Eeveelutions</option>
            <option value="pink">🩷 Pink Page</option>
            <option value="green">🌿 Green & Nature</option>
            <option value="psyduck">🦆 Psyduck</option>
            <option value="pikachu">⚡ Pikachu</option>
            <option value="sleeping">💤 Sleeping</option>
            <option value="water">🌊 Water & Ocean</option>
          </select>
          <button class="remove-review-card" data-i="${i}">Remove</button>
        </div>
      `;
      reviewList.appendChild(div);
    });

    // Live edit listeners
    reviewList.querySelectorAll("[data-field]").forEach(el => {
      el.addEventListener("input", () => {
        const i = parseInt(el.dataset.i);
        pendingCards[i][el.dataset.field] = el.value;
      });
      el.addEventListener("change", () => {
        const i = parseInt(el.dataset.i);
        pendingCards[i][el.dataset.field] = el.value;
      });
    });

    reviewList.querySelectorAll(".remove-review-card").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = parseInt(btn.dataset.i);
        pendingCards.splice(i, 1);
        renderReview(pendingCards);
        if (!pendingCards.length) {
          reviewWrap.classList.add("hidden");
          confirmBtn.classList.add("hidden");
        }
      });
    });
  }

  function escHtml(s) {
    return (s || "").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
  }

  confirmBtn.addEventListener("click", () => {
    let added = 0;
    pendingCards.forEach(card => {
      if (!card.name.trim()) return;
      // Check for duplicate
      const exists = state.collection.some(c =>
        c.name.toLowerCase() === card.name.toLowerCase() &&
        c.set.toLowerCase()  === (card.set || "").toLowerCase()
      );
      if (!exists) {
        state.collection.push({
          id:     Date.now() + Math.random(),
          name:   card.name.trim(),
          set:    card.set.trim(),
          rarity: card.rarity,
          price:  card.price,
          theme:  card.theme || "",
          image:  card.image,
        });
        added++;
      }
    });

    saveState();
    renderCollection();
    renderPages();

    // Reset upload tab
    pendingCards = [];
    reviewWrap.classList.add("hidden");
    confirmBtn.classList.add("hidden");
    retryBtn.classList.add("hidden");
    fileInput.value = "";

    // Switch to collection tab
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
    document.querySelector('[data-tab="collection"]').classList.add("active");
    document.getElementById("tab-collection").classList.add("active");
    renderCollection();

    showToast(`${added} card${added !== 1 ? "s" : ""} added to your collection!`);
  });

  retryBtn.addEventListener("click", () => {
    reviewWrap.classList.add("hidden");
    confirmBtn.classList.add("hidden");
    retryBtn.classList.add("hidden");
    fileInput.value = "";
    pendingCards = [];
  });

  uploadBtn.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", e => {
    if (e.target.files[0]) handleFile(e.target.files[0]);
  });
  dropZone.addEventListener("dragover",  e => { e.preventDefault(); dropZone.classList.add("drag-over"); });
  dropZone.addEventListener("dragleave", () => dropZone.classList.remove("drag-over"));
  dropZone.addEventListener("drop",      e => { e.preventDefault(); dropZone.classList.remove("drag-over"); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); });
}

// ── Toast notification ──────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add("show"), 10);
  setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 300); }, 3000);
}

// Kick off when DOM is ready
document.addEventListener("DOMContentLoaded", initUploadTab);

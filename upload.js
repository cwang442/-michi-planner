// ── Michi Planner — Upload & Scan ─────────────────────────────────────────
const API_URL = "https://michi-planner-api.onrender.com/scan";

const RARITY_PATTERNS = [
  "Special Illustration Rare",
  "Illustration Rare",
  "Art Rare",
  "Ultra Rare",
  "Hyper Rare",
  "Promo",
  "Rare",
];

// Resize image to max dimension using canvas, return { base64, mediaType, url }
function resizeImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = e => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const MAX = 1024;
        let w = img.width, h = img.height;
        if (w > MAX || h > MAX) {
          if (w > h) { h = Math.round(h * MAX / w); w = MAX; }
          else { w = Math.round(w * MAX / h); h = MAX; }
        }
        const canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        resolve({
          base64: dataUrl.split(",")[1],
          mediaType: "image/jpeg",
          url: e.target.result, // original for display
        });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// Crop card art region from a screenshot
function cropCard(originalUrl, col, row) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const W = img.naturalWidth, H = img.naturalHeight;
      const scaleX = W / 1290, scaleY = H / 2796;
      const COL = [[12,635],[655,1278]];
      const ROW = [[370,765],[1145,1540],[1920,2315]];
      const [x1,x2] = COL[col];
      const [y1,y2] = ROW[row];
      const sx1 = Math.round(x1*scaleX), sx2 = Math.round(x2*scaleX);
      const sy1 = Math.round(y1*scaleY), sy2 = Math.round(y2*scaleY);
      const canvas = document.createElement("canvas");
      canvas.width = sx2-sx1; canvas.height = sy2-sy1;
      canvas.getContext("2d").drawImage(img, sx1, sy1, sx2-sx1, sy2-sy1, 0, 0, sx2-sx1, sy2-sy1);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => resolve(null);
    img.src = originalUrl;
  });
}

// Detect layout type from image dimensions
function detectLayout(img) {
  const W = img.naturalWidth, H = img.naturalHeight;
  if (W > H) return "ipad";     // landscape = iPad 5-col
  if (H > W * 1.4) return "phone"; // tall portrait = phone 2-col
  return "unknown";
}

function escHtml(s) {
  return (s||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
}

// ── Upload UI ──────────────────────────────────────────────────────────────
function initUploadTab() {
  const dropZone    = document.getElementById("upload-zone");
  const fileInput   = document.getElementById("file-input");
  const uploadBtn   = document.getElementById("upload-btn");
  const progressWrap= document.getElementById("ocr-progress");
  const progressBar = document.getElementById("ocr-bar");
  const progressMsg = document.getElementById("ocr-msg");
  const reviewWrap  = document.getElementById("review-wrap");
  const reviewTitle = document.getElementById("review-title");
  const reviewList  = document.getElementById("review-list");
  const confirmBtn  = document.getElementById("confirm-cards");
  const retryBtn    = document.getElementById("retry-upload");
  const queueInfo   = document.getElementById("queue-info");

  let pendingCards = [];
  let selectedFiles = [];

  function setProgress(msg, pct) {
    progressMsg.textContent = msg;
    progressBar.style.width = pct + "%";
  }

  function showProgress() {
    progressWrap.classList.remove("hidden");
    reviewWrap.classList.add("hidden");
    confirmBtn.classList.add("hidden");
    retryBtn.classList.add("hidden");
  }

  function showReview() {
    progressWrap.classList.add("hidden");
    reviewWrap.classList.remove("hidden");
    confirmBtn.classList.remove("hidden");
    retryBtn.classList.remove("hidden");
  }

  async function processFiles(files) {
    const imageFiles = Array.from(files).filter(f => f.type.startsWith("image/"));
    if (!imageFiles.length) return;

    selectedFiles = imageFiles;
    showProgress();
    setProgress(`Loading ${imageFiles.length} screenshot${imageFiles.length>1?"s":""}...`, 5);
    pendingCards = [];

    // Process up to 5 at a time
    const batches = [];
    for (let i = 0; i < imageFiles.length; i += 5) {
      batches.push(imageFiles.slice(i, i+5));
    }

    let totalCards = 0;

    for (let b = 0; b < batches.length; b++) {
      const batch = batches[b];
      const pctBase = 5 + Math.round((b / batches.length) * 80);
      setProgress(`Resizing batch ${b+1} of ${batches.length}...`, pctBase);

      // Resize all images in this batch
      const resized = await Promise.all(batch.map(f => resizeImage(f)));

      setProgress(`Scanning batch ${b+1} of ${batches.length} with AI...`, pctBase + 10);

      try {
        setProgress(`Sending batch ${b+1} to AI...`, pctBase + 8);
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            images: resized.map(r => ({ base64: r.base64, mediaType: r.mediaType }))
          })
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Server error ${response.status}: ${errText.slice(0,100)}`);
        }

        const data = await response.json();

        if (data.error) throw new Error(data.error);
        if (!data.cards || !data.cards.length) {
          setProgress(`Batch ${b+1}: no cards found — ${data.raw||"empty response"}`, pctBase + 10);
          continue;
        }

        setProgress(`Cropping card images...`, pctBase + 20);

        // For each detected card, find and crop its image
        // We know the Collectr grid layout so we can match by position
        const cardsWithImages = await enrichWithImages(data.cards, resized);
        pendingCards.push(...cardsWithImages);
        totalCards += cardsWithImages.length;

      } catch(e) {
        console.error("Batch error:", e);
        setProgress(`Warning: batch ${b+1} failed — ${e.message}`, pctBase);
        await new Promise(r => setTimeout(r, 1000));
      }
    }

    if (!pendingCards.length) {
      setProgress("No cards found in this image. Check that your API key is active and try again.", 100);
      retryBtn.classList.remove("hidden");
      return;
    }

    setProgress(`Found ${totalCards} cards!`, 100);
    reviewTitle.textContent = `Review ${pendingCards.length} detected card${pendingCards.length>1?"s":""}`;
    renderReview(pendingCards);
    showReview();
  }

  // Detect if image looks like a Collectr grid screenshot
  function detectCollectrLayout(img) {
    const W = img.naturalWidth, H = img.naturalHeight;
    const isLandscape = W > H;
    const ratio = W / H;
    // Phone Collectr: tall portrait ~1290x2796, ratio ~0.46, H > W*1.8
    if (!isLandscape && W >= 600 && H >= 1200 && H > W * 1.8) return "phone";
    // iPad Collectr: landscape ~2752x2064, ratio ~1.33, very high res
    // Distinguish from binder photos by requiring high pixel count (>4MP) + ~4:3 ratio
    if (isLandscape && W >= 2400 && H >= 1800 && ratio > 1.2 && ratio < 1.5) return "ipad";
    return null; // not a Collectr grid
  }

  // Match detected cards to images
  async function enrichWithImages(cards, resizedImages) {
    const allCrops = [];

    for (const resized of resizedImages) {
      const img = new Image();
      await new Promise(r => { img.onload = r; img.src = resized.url; });

      const W = img.naturalWidth, H = img.naturalHeight;
      const layout = detectCollectrLayout(img);

      if (layout === "phone") {
        // Phone Collectr: 2 columns, known grid positions
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 2; col++) {
            const crop = await cropCard(resized.url, col, row);
            if (crop) allCrops.push(crop);
          }
        }
      } else if (layout === "ipad") {
        // iPad Collectr: 5 columns, measured coordinates
        const colW = Math.floor(W / 5);
        const headerH = 95;
        const rowH = Math.floor((H - headerH) / 3);
        const artH = Math.floor(rowH * 0.52);
        const padX = Math.floor(colW * 0.04);
        const padY = Math.floor(rowH * 0.02);
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 5; col++) {
            const x1 = col * colW + padX;
            const x2 = (col + 1) * colW - padX;
            const y1 = headerH + row * rowH + padY;
            const y2 = headerH + row * rowH + artH;
            const crop = await cropRegionFromUrl(resized.url, x1, y1, x2, y2);
            if (crop) allCrops.push(crop);
          }
        }
      } else {
        // Not a Collectr grid — physical card, binder, single card image, etc.
        // Use the full image as the thumbnail for every detected card
        // (all cards from this image share the same source photo)
        for (let i = 0; i < cards.length; i++) {
          allCrops.push(resized.url);
        }
      }
    }

    return cards.map((card, i) => ({
      ...card,
      image: allCrops[i] || resizedImages[0]?.url || null,
      theme: guessTheme(card.name),
    }));
  }

  // Crop any arbitrary region from a URL
  function cropRegionFromUrl(url, x1, y1, x2, y2) {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = x2-x1; canvas.height = y2-y1;
        canvas.getContext("2d").drawImage(img, x1, y1, x2-x1, y2-y1, 0, 0, x2-x1, y2-y1);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = () => resolve(null);
      img.src = url;
    });
  }

  // Auto-guess theme based on card name
  function guessTheme(name) {
    const n = (name || "").toLowerCase();
    if (/team rocket|giovanni|ariana|petrel|wobbuffet|meowth|mimikyu|houndoom|weezing|dugtrio|raticate|zapdos|jesse|james/.test(n)) return "teamrocket";
    if (/n's zoroark|n's reshiram|n's zekrom|n's zorua|iono|bellibolt|wattrel/.test(n)) return "teamrocket";
    if (/leafeon|vaporeon|jolteon|flareon|espeon|umbreon|glaceon|sylveon|eevee/.test(n)) return "eeveelutions";
    if (/clefairy|clefable|wigglytuff|starmie|fezandipiti|meloetta|flamigo|swablu|exeggcute|mr. mime|togekiss/.test(n)) return "pink";
    if (/bulbasaur|ivysaur|venusaur|tangela|applin|shuckle|dolliv|budew|roserade|starly|chikorita/.test(n)) return "green";
    if (/psyduck|golduck/.test(n)) return "psyduck";
    if (/pikachu|raichu|pichu|pachirisu/.test(n)) return "pikachu";
    if (/snorlax|slakoth|slaking|lechonk|skwovet|vulpix|magby|hoothoot|jigglypuff|drowzee/.test(n)) return "sleeping";
    if (/poliwhirl|horsea|piplup|wailord|frogadier|goldeen|suicune|articuno|drampa|lapras|vaporeon|magikarp/.test(n)) return "water";
    return "";
  }

  function renderReview(cards) {
    reviewList.innerHTML = "";
    cards.forEach((card, i) => {
      const isDupe = state.collection.some(c =>
        c.name.toLowerCase() === (card.name||"").toLowerCase() &&
        (c.set||"").toLowerCase() === (card.set||"").toLowerCase()
      );
      const div = document.createElement("div");
      div.className = "review-card" + (isDupe ? " review-dupe" : "");
      div.innerHTML = `
        <img class="review-img" src="${card.image||""}" alt="${escHtml(card.name)}"
          onerror="this.style.background='#1A1A2E';this.removeAttribute('src')" />
        <div class="review-fields">
          ${isDupe ? `<div class="dupe-warning">⚠️ Already in collection — add anyway or remove</div>` : ""}
          <input class="review-input" placeholder="Card name *" value="${escHtml(card.name)}" />
          <input class="review-input" placeholder="Set name" value="${escHtml(card.set)}" />
          <div class="review-row">
            <select class="review-select">
              ${RARITY_PATTERNS.map(r=>`<option ${r===card.rarity?"selected":""}>${r}</option>`).join("")}
            </select>
            <input class="review-input price-input" placeholder="Price CAD" value="${escHtml(card.price)}" />
          </div>
          <select class="review-select theme-select">
            <option value="">-- Theme --</option>
            <option value="teamrocket"  ${card.theme==="teamrocket"?"selected":""}>🚀 Team Rocket</option>
            <option value="eeveelutions"${card.theme==="eeveelutions"?"selected":""}>🌈 Eeveelutions</option>
            <option value="pink"        ${card.theme==="pink"?"selected":""}>🩷 Pink Page</option>
            <option value="green"       ${card.theme==="green"?"selected":""}>🌿 Green & Nature</option>
            <option value="psyduck"     ${card.theme==="psyduck"?"selected":""}>🦆 Psyduck</option>
            <option value="pikachu"     ${card.theme==="pikachu"?"selected":""}>⚡ Pikachu</option>
            <option value="sleeping"    ${card.theme==="sleeping"?"selected":""}>💤 Sleeping</option>
            <option value="water"       ${card.theme==="water"?"selected":""}>🌊 Water & Ocean</option>
          </select>
          <button class="remove-review-card">Remove</button>
        </div>
      `;

      // Live sync inputs to pendingCards
      const inputs = div.querySelectorAll(".review-input");
      inputs[0].addEventListener("input", e => pendingCards[i].name   = e.target.value);
      inputs[1].addEventListener("input", e => pendingCards[i].set    = e.target.value);
      inputs[2].addEventListener("input", e => pendingCards[i].price  = e.target.value);
      div.querySelector(".review-select").addEventListener("change", e => pendingCards[i].rarity = e.target.value);
      div.querySelector(".theme-select").addEventListener("change",  e => pendingCards[i].theme  = e.target.value);
      div.querySelector(".remove-review-card").addEventListener("click", () => {
        pendingCards.splice(i, 1);
        renderReview(pendingCards);
        if (!pendingCards.length) { reviewWrap.classList.add("hidden"); confirmBtn.classList.add("hidden"); }
      });

      reviewList.appendChild(div);
    });
  }

  confirmBtn.addEventListener("click", () => {
    let added = 0;
    pendingCards.forEach(card => {
      if (!card.name?.trim()) return;
      // Check for existing — increment qty if duplicate, add new if not
      const existing = state.collection.find(c =>
        c.name.toLowerCase() === card.name.trim().toLowerCase() &&
        (c.set||"").toLowerCase() === (card.set||"").trim().toLowerCase()
      );
      if (existing) {
        existing.qty = (existing.qty || 1) + 1;
      } else {
        state.collection.push({
          id:     Date.now() + Math.random(),
          name:   card.name.trim(),
          set:    (card.set||"").trim(),
          rarity: card.rarity || "IR",
          price:  card.price  || "",
          theme:  card.theme  || "",
          image:  card.image  || null,
          qty:    1,
        });
      }
      added++;
    });

    saveState();
    renderCollection();
    renderPages();
    pendingCards = [];
    selectedFiles = [];
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
    showToast(`${added} card${added!==1?"s":""} added to your collection!`);
  });

  retryBtn.addEventListener("click", () => {
    pendingCards = [];
    selectedFiles = [];
    reviewWrap.classList.add("hidden");
    confirmBtn.classList.add("hidden");
    retryBtn.classList.add("hidden");
    progressWrap.classList.add("hidden");
    fileInput.value = "";
  });

  uploadBtn.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", e => { if (e.target.files.length) processFiles(e.target.files); });
  dropZone.addEventListener("dragover",  e => { e.preventDefault(); dropZone.classList.add("drag-over"); });
  dropZone.addEventListener("dragleave", () => dropZone.classList.remove("drag-over"));
  dropZone.addEventListener("drop",      e => { e.preventDefault(); dropZone.classList.remove("drag-over"); if (e.dataTransfer.files.length) processFiles(e.dataTransfer.files); });
}

// ── Toast ──────────────────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add("show"), 10);
  setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 300); }, 3000);
}

document.addEventListener("DOMContentLoaded", initUploadTab);

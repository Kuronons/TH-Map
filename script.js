// ---------------- MAP ----------------
const map = L.map("map", {
  crs: L.CRS.Simple,
  minZoom: -2
});
const bounds = [[0, 0], [4096, 4096]];
L.imageOverlay("worldmap.png", bounds).addTo(map);
map.fitBounds(bounds);

// ---------------- LAYERS ----------------
const layers = {
  fruits:          L.layerGroup(),
  stone:           L.layerGroup(),
  crystal:         L.layerGroup(),
  creatures:       L.layerGroup(),
  magicalVisitors: L.layerGroup()
};

// ---------------- FRUIT COLOURS ----------------
const fruitColors = {
  // Persistent
  "Azureberry":        "#2196f3", // bright blue
  "Ghost Berry":       "#e8e4dc", // off-white
  // Spring
  "Skydrop Berry":     "#1b3a6e", // midnight blue
  "Nightshade Berry":  "#1a0033", // darkest purple
  "Emberberry":        "#e8a020", // orange-yellow
  "Bloodberry":        "#6b0a0a", // dark red
  "Greenwhistle Apple":"#8db87a", // pale forest green
  // Summer
  "Solberry":          "#a0621a", // autumn bronze
  "Nightblush Berry":  "#5c1a2e", // muted burgundy
  "Tigermelon":        "#2d6b2d", // rich green
  "Velvenight Berry":  "#0d0d2b", // blue-black
  "Heartgleam":        "#7a1a1a", // muted dark red
  "Honeycran Berry":   "#8b5e1a", // golden brown
  "Sunapple":          "#cc1f1f", // vibrant red
  // Fall
  "Mirthshade":        "#5b1a8b", // rich purple
  "Mireberry":         "#1a4d1a", // forest green
  "Mellowspike":       "#c8e88a", // pale lime green
  "Scarletip":         "#4d0000", // darkest red
  "Seafallow Berry":   "#0a0a2e", // darkest midnight blue
  "Amberburst":        "#d4a800", // gold-yellow
  "Amberfall Apple":   "#c87800", // amber
  // Winter
  "Velvitfrost Berry": "#6a3a8b", // wintery purple
  "Twilipuff":         "#d8c8f0", // pale purple
  "Faepeach":          "#f5c8d0", // soft pink
  "Frostgleam":        "#a8d4f0", // light blue
  "Icerose Berry":     "#b30000", // crimson
  "Lunabright":        "#a8e8c8", // mint green
  "Frostveil Apple":   "#c8e8f5", // icy blue
  // Coming later
  "Royal Peach":       "#f5a0b8"  // pink
};

// ---------------- ACTIVE SEASON ----------------
let activeSeason = "spring";
let activeFruit = ""; // empty = show all fruits for the season

// ---------------- DRAW FRUITS ----------------
function drawFruits() {
  layers.fruits.clearLayers();

  fruitLocations.forEach(location => {
    let fruitName, color;

    if (location.type === "persistent") {
      // Always show, regardless of season
      fruitName = location.fruit;
      color = fruitColors[fruitName] || "#aaaaaa";
      L.circleMarker(location.coords, {
        radius: 6, fillColor: color, color: "#222", weight: 1, fillOpacity: 0.9
      })
      .bindPopup(`<b>${fruitName}</b><br><i>Year-round</i>`)
      .addTo(layers.fruits);

    } else if (location.type === "seasonal") {
      if (activeSeason === "all") {
        // Hide seasonal locations when "All Year" is selected
        return;
      } else {
        // Show only the fruit for the active season
        fruitName = location.fruits[activeSeason];
        if (!fruitName) return;
        // If a specific fruit filter is active, skip non-matching locations
        if (activeFruit && fruitName !== activeFruit) return;
        color = fruitColors[fruitName] || "#aaaaaa";
        L.circleMarker(location.coords, {
          radius: 6, fillColor: color, color: "#222", weight: 1, fillOpacity: 0.9
        })
        .bindPopup(`<b>${fruitName}</b>`)
        .addTo(layers.fruits);
      }
    }
  });
}
drawFruits();

// ---------------- DRAW STONE ----------------
function drawStone() {
  layers.stone.clearLayers();
  stoneLocations.forEach(location => {
    L.circleMarker(location.coords, {
      radius: 6, fillColor: "#a89070", color: "#222", weight: 1, fillOpacity: 0.9
    }).bindPopup("<b>Stone</b>").addTo(layers.stone);
  });
}
drawStone();

// ---------------- DRAW CRYSTAL ----------------
function drawCrystal() {
  layers.crystal.clearLayers();
  crystalLocations.forEach(location => {
    (location.crystals || []).forEach(name => {
      const type = crystalTypes[name] || { color: "#a78bfa", info: null };
      const popup = type.info
        ? `<b>${name}</b><br><i>⚠️ ${type.info}</i>`
        : `<b>${name}</b>`;
      L.circleMarker(location.coords, {
        radius: 6, fillColor: type.color, color: "#222", weight: 1, fillOpacity: 0.9
      }).bindPopup(popup).addTo(layers.crystal);
    });
  });
}
drawCrystal();

// ---------------- DRAW CREATURES ----------------
const CREATURE_RADIUS = 150;

function drawCreatures() {
  layers.creatures.clearLayers();
  creatureLocations.forEach(location => {
    L.circle(location.coords, {
      radius: location.radius || CREATURE_RADIUS,
      color: "#e05252",
      weight: 1.5,
      opacity: 0.6,
      fillColor: "#e05252",
      fillOpacity: 0.08
    }).addTo(layers.creatures);

    (location.creatures || []).forEach(name => {
      const type = creatureTypes[name] || { color: "#e05252", resource: name, icon: null, crafting: "" };
      const iconHtml = type.icon
        ? `<img src="${type.icon}" style="width:40px;height:40px;object-fit:contain;display:block;margin:0 auto 6px auto;">`
        : "";
      const resourceHtml = type.resource
        ? `<span style="font-size:12px;color:#444;">${type.resource}</span>`
        : "";
      const infoHtml = type.info
        ? `<div style="margin-top:4px;font-size:12px;color:#888;font-style:italic;">${type.info}</div>`
        : "";
      const craftingHtml = type.crafting
        ? `<div style="margin-top:6px;font-size:11px;color:#666;"><b>Used in:</b> ${type.crafting}</div>`
        : "";
      const popupHtml = `
        <div style="text-align:center;min-width:120px;">
          ${iconHtml}
          <b style="font-size:13px;">${name}</b><br>
          ${resourceHtml}${infoHtml}${craftingHtml}
        </div>`;
      L.circleMarker(location.coords, {
        radius: 6, fillColor: type.color, color: "#222", weight: 1, fillOpacity: 0.9
      }).bindPopup(popupHtml).addTo(layers.creatures);
    });
  });
}
drawCreatures();

// ---------------- LAYER TOGGLES ----------------
const toggleMap = {
  "toggle-fruits":     layers.fruits,
  "toggle-stone":      layers.stone,
  "toggle-crystal":    layers.crystal,
  "toggle-creatures":  layers.creatures
};
const redrawFns = {
  "toggle-fruits":    drawFruits,
  "toggle-stone":     drawStone,
  "toggle-crystal":   drawCrystal,
  "toggle-creatures": drawCreatures
};

Object.entries(toggleMap).forEach(([id, layer]) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener("change", function () {
    clearSearchHighlights();
    if (this.checked) {
      if (redrawFns[id]) redrawFns[id]();
      map.addLayer(layer);
    } else {
      map.removeLayer(layer);
    }
  });
});

// ---------------- SEASON FILTER ----------------
document.querySelectorAll(".season-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    // Set active season
    document.querySelectorAll(".season-btn").forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    activeSeason = this.dataset.season;
    activeFruit = "";

    // Show/hide dropdowns
    document.querySelectorAll(".fruit-dropdown").forEach(d => d.classList.remove("open"));
    const dropdown = document.getElementById("dropdown-" + activeSeason);
    if (dropdown) dropdown.classList.add("open");

    // Reset fruit filter buttons
    document.querySelectorAll(".fruit-filter-btn").forEach(b => b.classList.remove("active"));

    drawFruits();
  });
});

// ---------------- FRUIT FILTER ----------------
document.querySelectorAll(".fruit-filter-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".fruit-filter-btn").forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    activeFruit = this.dataset.fruit; // empty string = show all
    drawFruits();
  });
});

// ---------------- COORD CAPTURE ----------------
const coordBox = document.getElementById("coord-display");

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => showCopied())
      .catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const el = document.createElement("textarea");
  el.value = text;
  el.style.position = "fixed";
  el.style.opacity = "0";
  document.body.appendChild(el);
  el.focus();
  el.select();
  try {
    document.execCommand("copy");
    showCopied();
  } catch (err) {
    console.warn("Copy failed:", err);
  }
  document.body.removeChild(el);
}

function showCopied() {
  coordBox.dataset.prev = coordBox.textContent;
  coordBox.textContent = "✓ Copied!";
  coordBox.classList.add("copied");
  setTimeout(() => {
    coordBox.textContent = coordBox.dataset.prev;
    coordBox.classList.remove("copied");
  }, 1200);
}

map.on("click", e => {
  const lat = Math.round(e.latlng.lat);
  const lng = Math.round(e.latlng.lng);
  const coordText = `[${lat}, ${lng}]`;
  coordBox.textContent = coordText;
  copyToClipboard(coordText);
  console.log(coordText);
});

// ---------------- SEARCH ----------------
let highlightCircle = null;

function buildSearchIndex() {
  const index = [];

  // Fruits — collect all locations per fruit name
  const fruitMap = {};
  fruitLocations.forEach(location => {
    if (location.type === "persistent") {
      const name = location.fruit;
      if (!fruitMap[name]) fruitMap[name] = [];
      fruitMap[name].push(location.coords);
    } else if (location.type === "seasonal") {
      Object.entries(location.fruits).forEach(([season, name]) => {
        if (!fruitMap[name]) fruitMap[name] = [];
        fruitMap[name].push(location.coords);
      });
    }
  });
  Object.entries(fruitMap).forEach(([name, allCoords]) => {
    index.push({ label: name, category: "Fruit", allCoords });
  });

  // Crystals — collect all locations per crystal name
  const crystalMap = {};
  crystalLocations.forEach(location => {
    (location.crystals || []).forEach(name => {
      if (!crystalMap[name]) crystalMap[name] = [];
      crystalMap[name].push(location.coords);
    });
  });
  Object.entries(crystalMap).forEach(([name, allCoords]) => {
    index.push({ label: name, category: "Crystal", allCoords });
  });

  // Creatures — collect all coords per creature name and resource name
  const creatureMap = {};
  const resourceMap = {};
  creatureLocations.forEach(location => {
    (location.creatures || []).forEach(name => {
      const type = creatureTypes[name];
      if (!creatureMap[name]) creatureMap[name] = [];
      creatureMap[name].push(location.coords);
      if (type && type.resource) {
        if (!resourceMap[type.resource]) resourceMap[type.resource] = [];
        resourceMap[type.resource].push(location.coords);
      }
    });
  });
  Object.entries(creatureMap).forEach(([name, allCoords]) => {
    index.push({ label: name, category: "Creature", allCoords });
  });
  Object.entries(resourceMap).forEach(([resource, allCoords]) => {
    index.push({ label: resource, category: "Resource", allCoords });
  });

  return index;
}

// Track search highlight layers so we can clear them
let searchHighlightLayers = [];

function clearSearchHighlights() {
  searchHighlightLayers.forEach(l => map.removeLayer(l));
  searchHighlightLayers = [];
}

function highlightAllCoords(allCoords, category, label) {
  clearSearchHighlights();

  // Hide all layers
  Object.values(layers).forEach(l => map.removeLayer(l));

  // Build a temporary layer with only the matching markers
  const tempLayer = L.layerGroup().addTo(map);
  searchHighlightLayers.push(tempLayer);

  allCoords.forEach(coords => {
    // Draw the matching marker
    let color = "#aaaaaa";
    let popupHtml = `<b>${label}</b>`;

    if (category === "Fruit") {
      color = fruitColors[label] || "#aaaaaa";
      L.circleMarker(coords, {
        radius: 6, fillColor: color, color: "#222", weight: 1, fillOpacity: 0.9
      }).bindPopup(popupHtml).addTo(tempLayer);
    } else if (category === "Crystal") {
      const ctype = crystalTypes[label] || { color: "#a78bfa", info: null };
      color = ctype.color;
      popupHtml = ctype.info ? `<b>${label}</b><br><i>⚠️ ${ctype.info}</i>` : `<b>${label}</b>`;
      L.circleMarker(coords, {
        radius: 6, fillColor: color, color: "#222", weight: 1, fillOpacity: 0.9
      }).bindPopup(popupHtml).addTo(tempLayer);
    } else if (category === "Creature" || category === "Resource") {
      // Find the creature name from label
      const creatureName = category === "Resource"
        ? Object.keys(creatureTypes).find(k => creatureTypes[k].resource === label)
        : label;
      const ctype = creatureTypes[creatureName] || { color: "#e05252" };
      color = ctype.color;

      // Draw spawn radius circle
      L.circle(coords, {
        radius: 150,
        color: "#e05252", weight: 1.5, opacity: 0.6,
        fillColor: "#e05252", fillOpacity: 0.08
      }).addTo(tempLayer);

      const iconHtml = ctype.icon ? `<img src="${ctype.icon}" style="width:40px;height:40px;object-fit:contain;display:block;margin:0 auto 6px auto;">` : "";
      const resourceHtml = ctype.resource ? `<span style="font-size:12px;color:#444;">${ctype.resource}</span>` : "";
      const infoHtml = ctype.info ? `<div style="margin-top:4px;font-size:12px;color:#888;font-style:italic;">${ctype.info}</div>` : "";
      const craftingHtml = ctype.crafting ? `<div style="margin-top:6px;font-size:11px;color:#666;"><b>Used in:</b> ${ctype.crafting}</div>` : "";
      popupHtml = `<div style="text-align:center;min-width:120px;">${iconHtml}<b style="font-size:13px;">${creatureName}</b><br>${resourceHtml}${infoHtml}${craftingHtml}</div>`;

      L.circleMarker(coords, {
        radius: 6, fillColor: color, color: "#222", weight: 1, fillOpacity: 0.9
      }).bindPopup(popupHtml).addTo(tempLayer);
    }

    // Pulse highlight ring
    const ring = L.circleMarker(coords, {
      radius: 16, color: "#ffffff", weight: 3,
      fillColor: "#ffffff", fillOpacity: 0.2, opacity: 1
    }).addTo(map);
    searchHighlightLayers.push(ring);
  });

  // Fit map to matching markers
  if (allCoords.length === 1) {
    map.setView(allCoords[0], 1);
  } else {
    const latLngs = allCoords.map(c => L.latLng(c[0], c[1]));
    map.fitBounds(L.latLngBounds(latLngs).pad(0.3));
  }

  // Fade rings after 3 seconds (keep markers)
  setTimeout(() => {
    searchHighlightLayers.forEach(l => {
      if (l !== tempLayer) map.removeLayer(l);
    });
    searchHighlightLayers = searchHighlightLayers.filter(l => l === tempLayer);
  }, 3000);
}

function restoreAllLayers() {
  Object.entries(toggleMap).forEach(([id, layer]) => {
    const checkbox = document.getElementById(id);
    if (checkbox && checkbox.checked) {
      if (redrawFns[id]) redrawFns[id]();
      map.addLayer(layer);
    }
  });
}

const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

searchInput.addEventListener("input", function () {
  const query = this.value.trim().toLowerCase();
  searchResults.innerHTML = "";

  if (query.length < 2) {
    searchResults.style.display = "none";
    return;
  }

  const index = buildSearchIndex();
  const matches = index.filter(e => e.label.toLowerCase().includes(query));

  // Deduplicate by label + category
  const seen = new Set();
  const unique = matches.filter(e => {
    const key = e.label + e.category;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  if (unique.length === 0) {
    searchResults.style.display = "none";
    return;
  }

  unique.slice(0, 10).forEach(result => {
    const item = document.createElement("div");
    item.className = "search-result-item";
    item.innerHTML = `<span class="search-result-label">${result.label}</span><span class="search-result-category">${result.category}</span>`;
    item.addEventListener("click", () => {
      highlightAllCoords(result.allCoords, result.category, result.label);
      searchResults.style.display = "none";
      searchInput.value = result.label;
    });
    searchResults.appendChild(item);
  });

  searchResults.style.display = "block";
});

// Clear search: restore all layers and highlights when input is cleared
searchInput.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    searchInput.value = "";
    searchResults.style.display = "none";
    clearSearchHighlights();
    restoreAllLayers();
  }
});

// Hide results when clicking outside
document.addEventListener("click", e => {
  if (!document.getElementById("search-wrapper").contains(e.target)) {
    searchResults.style.display = "none";
  }
});

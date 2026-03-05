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
  fruits:    L.layerGroup(),
  stone:     L.layerGroup(),
  crystal:   L.layerGroup(),
  creatures: L.layerGroup()
};

// ---------------- FRUIT COLOURS ----------------
const fruitColors = {
  "Azureberry":        "#2196f3",
  "Ghost Berry":       "#e8e4dc",
  "Skydrop Berry":     "#1b3a6e",
  "Nightshade Berry":  "#1a0033",
  "Emberberry":        "#e8a020",
  "Bloodberry":        "#6b0a0a",
  "Greenwhistle Apple":"#8db87a",
  "Solberry":          "#a0621a",
  "Nightblush Berry":  "#5c1a2e",
  "Tigermelon":        "#2d6b2d",
  "Velvenight Berry":  "#0d0d2b",
  "Heartgleam":        "#7a1a1a",
  "Honeycran Berry":   "#8b5e1a",
  "Sunapple":          "#cc1f1f",
  "Mirthshade":        "#5b1a8b",
  "Mireberry":         "#1a4d1a",
  "Mellowspike":       "#c8e88a",
  "Scarletip":         "#4d0000",
  "Seafallow Berry":   "#0a0a2e",
  "Amberburst":        "#d4a800",
  "Amberfall Apple":   "#c87800",
  "Velvitfrost Berry": "#6a3a8b",
  "Twilipuff":         "#d8c8f0",
  "Faepeach":          "#f5c8d0",
  "Frostgleam":        "#a8d4f0",
  "Icerose Berry":     "#b30000",
  "Lunabright":        "#a8e8c8",
  "Frostveil Apple":   "#c8e8f5",
  "Royal Peach":       "#f5a0b8"
};

// ---------------- ACTIVE SEASON / FILTER ----------------
let activeSeason = "spring";
let activeFruit = "";

// ---------------- DRAW FUNCTIONS ----------------
function drawFruits() {
  layers.fruits.clearLayers();
  fruitLocations.forEach(location => {
    if (location.type === "persistent") {
      const name = location.fruit;
      const color = fruitColors[name] || "#aaaaaa";
      L.circleMarker(location.coords, {
        radius: 6, fillColor: color, color: "#222", weight: 1, fillOpacity: 0.9
      }).bindPopup(`<b>${name}</b><br><i>Year-round</i>`).addTo(layers.fruits);

    } else if (location.type === "seasonal") {
      if (activeSeason === "all") return;
      const name = location.fruits[activeSeason];
      if (!name) return;
      if (activeFruit && name !== activeFruit) return;
      const color = fruitColors[name] || "#aaaaaa";
      L.circleMarker(location.coords, {
        radius: 6, fillColor: color, color: "#222", weight: 1, fillOpacity: 0.9
      }).bindPopup(`<b>${name}</b>`).addTo(layers.fruits);
    }
  });
}

function drawStone() {
  layers.stone.clearLayers();
  stoneLocations.forEach(location => {
    L.circleMarker(location.coords, {
      radius: 6, fillColor: "#a89070", color: "#222", weight: 1, fillOpacity: 0.9
    }).bindPopup("<b>Stone</b>").addTo(layers.stone);
  });
}

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

function makeCreaturePopup(name) {
  const type = creatureTypes[name] || { color: "#e05252" };
  const iconHtml     = type.icon     ? `<img src="${type.icon}" style="width:40px;height:40px;object-fit:contain;display:block;margin:0 auto 6px auto;">` : "";
  const resourceHtml = type.resource ? `<span style="font-size:12px;color:#444;">${type.resource}</span>` : "";
  const infoHtml     = type.info     ? `<div style="margin-top:4px;font-size:12px;color:#888;font-style:italic;">${type.info}</div>` : "";
  const craftingHtml = type.crafting ? `<div style="margin-top:6px;font-size:11px;color:#666;"><b>Used in:</b> ${type.crafting}</div>` : "";
  return `<div style="text-align:center;min-width:120px;">${iconHtml}<b style="font-size:13px;">${name}</b><br>${resourceHtml}${infoHtml}${craftingHtml}</div>`;
}

function drawCreatures() {
  layers.creatures.clearLayers();
  creatureLocations.forEach(location => {
    L.circle(location.coords, {
      radius: location.radius || 150,
      color: "#e05252", weight: 1.5, opacity: 0.6,
      fillColor: "#e05252", fillOpacity: 0.08
    }).addTo(layers.creatures);

    (location.creatures || []).forEach(name => {
      const type = creatureTypes[name] || { color: "#e05252" };
      L.circleMarker(location.coords, {
        radius: 6, fillColor: type.color, color: "#222", weight: 1, fillOpacity: 0.9
      }).bindPopup(makeCreaturePopup(name)).addTo(layers.creatures);
    });
  });
}

// Draw all layers on startup (not added to map yet — checkboxes control visibility)
drawFruits();
drawStone();
drawCrystal();
drawCreatures();

// ---------------- LAYER TOGGLES ----------------
const toggleMap = {
  "toggle-fruits":    layers.fruits,
  "toggle-stone":     layers.stone,
  "toggle-crystal":   layers.crystal,
  "toggle-creatures": layers.creatures
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
      redrawFns[id]();
      map.addLayer(layer);
    } else {
      map.removeLayer(layer);
    }
  });
});

// ---------------- SEASON FILTER ----------------
document.querySelectorAll(".season-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".season-btn").forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    activeSeason = this.dataset.season;
    activeFruit = "";
    document.querySelectorAll(".fruit-dropdown").forEach(d => d.classList.remove("open"));
    const dropdown = document.getElementById("dropdown-" + activeSeason);
    if (dropdown) dropdown.classList.add("open");
    document.querySelectorAll(".fruit-filter-btn").forEach(b => b.classList.remove("active"));
    drawFruits();
  });
});

// ---------------- FRUIT FILTER ----------------
document.querySelectorAll(".fruit-filter-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".fruit-filter-btn").forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    activeFruit = this.dataset.fruit;
    drawFruits();
  });
});

// ---------------- COORD CAPTURE REMOVED ----------------

// ---------------- HOME MARKER ----------------
L.marker([2912, 2288], {
  icon: L.divIcon({
    html: '🏠',
    className: 'home-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  })
}).bindPopup("<b>Your Shop</b>").addTo(map);

// ---------------- SEARCH ----------------
let searchHighlightLayers = [];

function clearSearchHighlights() {
  searchHighlightLayers.forEach(l => map.removeLayer(l));
  searchHighlightLayers = [];
}

function restoreAllLayers() {
  Object.entries(toggleMap).forEach(([id, layer]) => {
    const checkbox = document.getElementById(id);
    if (checkbox && checkbox.checked) {
      redrawFns[id]();
      map.addLayer(layer);
    }
  });
}

function buildSearchIndex() {
  const index = [];

  // Fruits
  const fruitMap = {};
  fruitLocations.forEach(location => {
    if (location.type === "persistent") {
      if (!fruitMap[location.fruit]) fruitMap[location.fruit] = [];
      fruitMap[location.fruit].push(location.coords);
    } else if (location.type === "seasonal") {
      Object.values(location.fruits).forEach(name => {
        if (!fruitMap[name]) fruitMap[name] = [];
        fruitMap[name].push(location.coords);
      });
    }
  });
  Object.entries(fruitMap).forEach(([name, allCoords]) => {
    index.push({ label: name, category: "Fruit", allCoords });
  });

  // Crystals
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

  // Creatures + resources
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
  Object.entries(resourceMap).forEach(([name, allCoords]) => {
    index.push({ label: name, category: "Resource", allCoords });
  });

  return index;
}

function highlightAllCoords(allCoords, category, label) {
  clearSearchHighlights();

  // Hide all layers
  Object.values(layers).forEach(l => map.removeLayer(l));

  // Build temp layer with only matching markers
  const tempLayer = L.layerGroup().addTo(map);
  searchHighlightLayers.push(tempLayer);

  allCoords.forEach(coords => {
    if (category === "Fruit") {
      const color = fruitColors[label] || "#aaaaaa";
      L.circleMarker(coords, {
        radius: 6, fillColor: color, color: "#222", weight: 1, fillOpacity: 0.9
      }).bindPopup(`<b>${label}</b>`).addTo(tempLayer);

    } else if (category === "Crystal") {
      const ctype = crystalTypes[label] || { color: "#a78bfa", info: null };
      const popup = ctype.info ? `<b>${label}</b><br><i>⚠️ ${ctype.info}</i>` : `<b>${label}</b>`;
      L.circleMarker(coords, {
        radius: 6, fillColor: ctype.color, color: "#222", weight: 1, fillOpacity: 0.9
      }).bindPopup(popup).addTo(tempLayer);

    } else if (category === "Creature" || category === "Resource") {
      const creatureName = category === "Resource"
        ? Object.keys(creatureTypes).find(k => creatureTypes[k].resource === label)
        : label;
      const ctype = creatureTypes[creatureName] || { color: "#e05252" };
      L.circle(coords, {
        radius: 150, color: "#e05252", weight: 1.5, opacity: 0.6,
        fillColor: "#e05252", fillOpacity: 0.08
      }).addTo(tempLayer);
      L.circleMarker(coords, {
        radius: 6, fillColor: ctype.color, color: "#222", weight: 1, fillOpacity: 0.9
      }).bindPopup(makeCreaturePopup(creatureName)).addTo(tempLayer);
    }

    // Pulse ring
    const ring = L.circleMarker(coords, {
      radius: 16, color: "#ffffff", weight: 3, fillColor: "#ffffff", fillOpacity: 0.2, opacity: 1
    }).addTo(map);
    searchHighlightLayers.push(ring);
  });

  // Fit map
  if (allCoords.length === 1) {
    map.setView(allCoords[0], 1);
  } else {
    map.fitBounds(L.latLngBounds(allCoords.map(c => L.latLng(c[0], c[1]))).pad(0.3));
  }

  // Fade rings after 3s, keep markers
  setTimeout(() => {
    searchHighlightLayers.forEach(l => { if (l !== tempLayer) map.removeLayer(l); });
    searchHighlightLayers = searchHighlightLayers.filter(l => l === tempLayer);
  }, 3000);
}

const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

searchInput.addEventListener("input", function () {
  const query = this.value.trim().toLowerCase();
  searchResults.innerHTML = "";
  if (query.length < 2) { searchResults.style.display = "none"; return; }

  const index = buildSearchIndex();
  const seen = new Set();
  const unique = index.filter(e => {
    if (!e.label.toLowerCase().includes(query)) return false;
    const key = e.label + e.category;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  if (unique.length === 0) { searchResults.style.display = "none"; return; }

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

searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    searchInput.value = "";
    searchResults.style.display = "none";
    clearSearchHighlights();
    restoreAllLayers();
  }
});

document.addEventListener("click", e => {
  if (!document.getElementById("search-wrapper").contains(e.target)) {
    searchResults.style.display = "none";
  }
});

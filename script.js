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
  fruits: L.layerGroup().addTo(map),
  stone: L.layerGroup().addTo(map),
  ore: L.layerGroup().addTo(map),
  creatures: L.layerGroup().addTo(map),
  magicalVisitors: L.layerGroup().addTo(map)
};

// ---------------- FRUIT COLOURS ----------------
const fruitColors = {
  "Azureberry":       "#4cc9f0",
  "Sunapple":         "#ffd166",
  "Ghost Berry":      "#dddddd",
  "Bloodberry":       "#e63946",
  "Emberberry":       "#ff8800",
  "Nightshade Berry": "#560bad",
  "Skydrop":          "#4895ef",
  "Heartgleam":       "#ff6b9d",
  "Honeycran":        "#f4a261",
  "Nightblush":       "#c77dff",
  "Solberry":         "#ffb703",
  "Tigermelon":       "#fb8500",
  "Velvenight":       "#6a0572",
  "Amberburst":       "#e9c46a",
  "Mellowspike":      "#a8dadc",
  "Mireberry":        "#6d6875",
  "Mirthshade":       "#b5838d",
  "Scarletip":        "#e76f51",
  "Seafallow":        "#52b788",
  "Faepeach":         "#ffccd5",
  "Frostgleam":       "#caf0f8",
  "Icerose":          "#90e0ef",
  "Lunabright":       "#e2cfee",
  "Twilipuff":        "#bde0fe",
  "Velvitfrost":      "#dde5b6"
};

// ---------------- RESOURCE COLOURS ----------------
const stoneColor         = "#a89070";
const oreColor           = "#c0c0c0";
const creatureColor      = "#e05252";
const magicalVisitorColor = "#c77dff";

// ---------------- ACTIVE SEASON ----------------
let activeSeason = "all";

// ---------------- DRAW FRUITS ----------------
function drawFruits() {
  layers.fruits.clearLayers();

  fruitLocations.forEach(location => {
    // Collect the right fruits for the active season
    let fruitsToShow = [...location.fruits.all];
    if (activeSeason !== "all" && location.fruits[activeSeason]) {
      fruitsToShow = [...fruitsToShow, ...location.fruits[activeSeason]];
    }
    if (activeSeason === "all") {
      Object.values(location.fruits).flat().forEach(f => {
        if (!fruitsToShow.includes(f)) fruitsToShow.push(f);
      });
    }

    fruitsToShow.forEach(fruit => {
      const color = fruitColors[fruit] || "#aaaaaa";
      L.circleMarker(location.coords, {
        radius: 6,
        fillColor: color,
        color: "#222",
        weight: 1,
        fillOpacity: 0.9
      })
      .bindPopup(`<b>${fruit}</b>`)
      .addTo(layers.fruits);
    });
  });
}
drawFruits();

// ---------------- DRAW STONE ----------------
stoneLocations.forEach(location => {
  const items = location.stones || [];
  L.circleMarker(location.coords, {
    radius: 6,
    fillColor: stoneColor,
    color: "#222",
    weight: 1,
    fillOpacity: 0.9
  })
  .bindPopup(`<b>Stone</b><br>${items.join("<br>")}`)
  .addTo(layers.stone);
});

// ---------------- DRAW ORE ----------------
oreLocations.forEach(location => {
  const items = location.ores || [];
  L.circleMarker(location.coords, {
    radius: 6,
    fillColor: oreColor,
    color: "#222",
    weight: 1,
    fillOpacity: 0.9
  })
  .bindPopup(`<b>Ore</b><br>${items.join("<br>")}`)
  .addTo(layers.ore);
});

// ---------------- DRAW CREATURES ----------------
creatureLocations.forEach(location => {
  const items = location.creatures || [];
  L.circleMarker(location.coords, {
    radius: 6,
    fillColor: creatureColor,
    color: "#222",
    weight: 1,
    fillOpacity: 0.9
  })
  .bindPopup(`<b>Creatures</b><br>${items.join("<br>")}`)
  .addTo(layers.creatures);
});

// ---------------- DRAW MAGICAL VISITORS ----------------
magicalVisitorLocations.forEach(location => {
  const items = location.visitors || [];
  L.circleMarker(location.coords, {
    radius: 6,
    fillColor: magicalVisitorColor,
    color: "#222",
    weight: 1,
    fillOpacity: 0.9
  })
  .bindPopup(`<b>Magical Visitor</b><br>${items.join("<br>")}`)
  .addTo(layers.magicalVisitors);
});

// ---------------- LAYER TOGGLES ----------------
const toggleMap = {
  "toggle-fruits":           layers.fruits,
  "toggle-stone":            layers.stone,
  "toggle-ore":              layers.ore,
  "toggle-creatures":        layers.creatures,
  "toggle-magical-visitors": layers.magicalVisitors
};

Object.entries(toggleMap).forEach(([id, layer]) => {
  document.getElementById(id).addEventListener("change", function () {
    this.checked ? map.addLayer(layer) : map.removeLayer(layer);
  });
});

// ---------------- SEASON FILTER ----------------
document.querySelectorAll(".season-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".season-btn").forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    activeSeason = this.dataset.season;
    drawFruits();
  });
});

// ---------------- COORD CAPTURE ----------------
const coordBox = document.getElementById("coord-display");

map.on("click", e => {
  const lat = Math.round(e.latlng.lat);
  const lng = Math.round(e.latlng.lng);
  const coordText = `[${lat}, ${lng}]`;

  coordBox.textContent = coordText;

  navigator.clipboard?.writeText(coordText).catch(() => {});

  console.log(coordText);
});

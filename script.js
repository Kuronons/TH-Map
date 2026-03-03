const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -2
});

const bounds = [[0,0], [4096,4096]];
const image = L.imageOverlay('worldmap.png', bounds).addTo(map);
map.fitBounds(bounds);

const layers = {
  village: L.layerGroup().addTo(map),
  resource: L.layerGroup().addTo(map),
  creature: L.layerGroup().addTo(map),
  magic: L.layerGroup().addTo(map),
  quest: L.layerGroup().addTo(map)
};

let currentSeason = "spring";

function buildFruitPopup(location) {

  const allFruit = location.fruits.all || [];
  const seasonal = location.fruits[currentSeason] || [];

  const combined = [...allFruit, ...seasonal];

  const list = combined
    .map(f => `<li>${f}</li>`)
    .join("");

  return `
    <b>Fruit Node</b>
    <ul>${list}</ul>
  `;
}

const fruitColors = {

  Azureberry: "#6a5cff",
  Sunapple: "#ffb703",
  "Ghost Berry": "#d6d6ff",

  Bloodberry: "#b3003c",
  Emberberry: "#ff5733",
  "Nightshade Berry": "#3b0a45",
  Skydrop: "#4cc9f0",

  Heartgleam: "#ff4d6d",
  Honeycran: "#ff9f1c",
  Nightblush: "#c9184a",
  Solberry: "#ffd60a",
  Tigermelon: "#ff7f11",
  Velvenight: "#560bad",

  Amberburst: "#ff8800",
  Mellowspike: "#c77dff",
  Mireberry: "#5f0f40",
  Mirthshade: "#7209b7",
  Scarletip: "#d00000",
  Seafallow: "#0077b6",

  Faepeach: "#ffcad4",
  Frostgleam: "#90dbf4",
  Icerose: "#caf0f8",
  Lunabright: "#e0aaff",
  Twilipuff: "#b8c0ff",
  Velvitfrost: "#a0c4ff"
};

// === Coordinate Capture Tool ===

map.on('click', function (e) {

  if (!e.latlng) return;

  const x = Math.round(e.latlng.lng);
  const y = Math.round(e.latlng.lat);

  const coords = `x: ${x}, y: ${y}`;

  console.log(coords);
  navigator.clipboard.writeText(coords);

  if (window.clickMarker) {
    map.removeLayer(window.clickMarker);
  }

  window.clickMarker = L.circleMarker([y, x], {
    radius: 6
  })
  .addTo(map)
  .bindPopup(coords)
  .openPopup();

});

function getActiveFruits(location) {
  const allFruit = location.fruits.all || [];
  const seasonal = location.fruits[currentSeason] || [];
  return [...allFruit, ...seasonal];
}

fruitLocations.forEach(location => {

  const fruitsHere = getActiveFruits(location);

  fruitsHere.forEach(fruit => {

    L.circleMarker(location.coords, {
      radius: 6,
      fillColor: fruitColors[fruit] || "#ffffff",
      color: "#222",
      weight: 1,
      fillOpacity: 0.95
    })
    .bindPopup(`<b>${fruit}</b><br>Fruit Node`)
    .addTo(map);

  });


function getActiveFruits(location) {

  const allFruit = location.fruits.all || [];
  const seasonal = location.fruits[currentSeason] || [];

  return [...allFruit, ...seasonal];
}



document.querySelectorAll("#sidebar input[type=checkbox]")
  .forEach(box => {
    box.addEventListener("change", function() {
      const category = this.dataset.category;
      if (this.checked) {
        map.addLayer(layers[category]);
      } else {
        map.removeLayer(layers[category]);
      }
    });
  });


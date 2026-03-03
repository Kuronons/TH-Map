// ---------------- MAP ----------------
const map = L.map("map", {
  crs: L.CRS.Simple,
  minZoom: -2
});

const bounds = [[0,0],[4096,4096]];

L.imageOverlay("worldmap.png", bounds).addTo(map);

map.fitBounds(bounds);


// ---------------- LAYERS ----------------
const layers = {
  fruits: L.layerGroup().addTo(map)
};


// ---------------- FRUIT COLOURS ----------------
const fruitColors = {
  "Azureberry": "#4cc9f0",
  "Sunapple": "#ffd166",
  "Ghost Berry": "#dddddd",
  "Bloodberry": "#e63946",
  "Emberberry": "#ff8800",
  "Nightshade Berry": "#560bad",
  "Skydrop": "#4895ef"
};


// ---------------- DRAW FRUITS ----------------
fruitLocations.forEach(location => {

  Object.values(location.fruits)
    .flat()
    .forEach(fruit => {

      if (!fruitColors[fruit]) return;

      L.circleMarker(location.coords, {
        radius: 6,
        fillColor: fruitColors[fruit],
        color: "#222",
        weight: 1,
        fillOpacity: 0.9
      })
      .bindPopup(`<b>${fruit}</b>`)
      .addTo(layers.fruits);

    });

});


// ---------------- LEGEND TOGGLE ----------------
document
  .getElementById("toggle-fruits")
  .addEventListener("change", function () {

    if (this.checked) {
      map.addLayer(layers.fruits);
    } else {
      map.removeLayer(layers.fruits);
    }
});


// ---------------- CLICK COORD CAPTURE ----------------
map.on("click", e => {
  console.log(
    `[${Math.round(e.latlng.lat)}, ${Math.round(e.latlng.lng)}]`
  );
});

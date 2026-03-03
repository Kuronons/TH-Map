const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -2
});

const bounds = [[0,0],[4096,4096]];

L.imageOverlay('worldmap.png', bounds).addTo(map);

map.fitBounds(bounds);


// --- Fruit colour dots ---
const fruitColors = {
  "Azureberry": "#4cc9f0",
  "Sunapple": "#ffd166",
  "Ghost Berry": "#cdb4db",
  "Bloodberry": "#e63946",
  "Emberberry": "#ff6b6b",
  "Nightshade Berry": "#560bad",
  "Skydrop": "#4895ef"
};


// --- Render fruits ---
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
      .bindPopup(fruit)
      .addTo(map);

    });

});


// --- Coordinate capture ---
map.on("click", function(e) {
  console.log(
    `coords: [${e.latlng.lat.toFixed(0)}, ${e.latlng.lng.toFixed(0)}]`
  );
});

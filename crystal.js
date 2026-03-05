// Crystal types and their special spawn conditions
const crystalTypes = {
  "Lavendrite":     { color: "#c084fc", info: null },
  "Blue Sky":       { color: "#38bdf8", info: null },
  "Dragon's Blood": { color: "#dc2626", info: null },
  "Fernbrite":      { color: "#4ade80", info: null },
  "Honeyglow":      { color: "#fbbf24", info: null },
  "Lunacite":       { color: "#e2e8f0", info: "Bright unicorn event on the Full Moon" },
  "Dark Lunacite":  { color: "#4c1d95", info: "Dark unicorn event on the New Moon" },
  "Starshard":      { color: "#f0abfc", info: "Meteor strike random event" }
};

const crystalLocations = [
  { id: 1, coords: [1870, 1828], crystals: ["Lavendrite"] },
  { id: 2, coords: [2203, 3498], crystals: ["Lavendrite"] },
  { id: 3, coords: [2284, 3646], crystals: ["Lavendrite"] },

  { id: 4, coords: [2477, 819], crystals: ["Blue Sky"] },
  { id: 5, coords: [2341, 823], crystals: ["Blue Sky"] },
  { id: 6, coords: [2598, 3720], crystals: ["Blue Sky"] },

  { id: 7, coords: [1255, 2695], crystals: ["Dragon's Blood"] },
  { id: 8, coords: [1267, 2746], crystals: ["Dragon's Blood"] },
  { id: 9, coords: [1214, 2784], crystals: ["Dragon's Blood"] },

  { id: 10, coords: [2539, 3267], crystals: ["Fernbrite"] },
  { id: 11, coords: [2561, 3359], crystals: ["Fernbrite"] },
  { id: 12, coords: [3167, 2024], crystals: ["Fernbrite"] },
  { id: 13, coords: [2970, 392], crystals: ["Fernbrite"] },
  { id: 14, coords: [3034, 332], crystals: ["Fernbrite"] },
  { id: 15, coords: [3171, 565], crystals: ["Fernbrite"] },
  { id: 16, coords: [3171, 616], crystals: ["Fernbrite"] },
];

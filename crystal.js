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
  { id: 1, coords: [1870, 1828], crystals: ["Lavendrite"] }
];

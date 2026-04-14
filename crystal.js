// Crystal types and their special spawn conditions
const crystalTypes = {
  "Lavendrite":     { color: "#c9a0dc", info: null },                                        // lavender
  "Blue Sky":       { color: "#00aaff", info: null },                                        // bright blue
  "Dragon's Blood": { color: "#ff1a1a", info: null },                                        // bright red
  "Fernbrite":      { color: "#00dd44", info: null },                                        // bright green
  "Honeyglow":      { color: "#f5c400", info: null },                                        // honey yellow
  "Lunacite":       { color: "#ffe0ec", info: "Bright unicorn event on the Full Moon" },     // very pale pink
  "Dark Lunacite":  { color: "#b39ddb", info: "Dark unicorn event on the New Moon" },        // pastel dark purple
  "Starshard":      { color: "#f0d080", info: "Meteor strike random event" }                 // light gold
};

const crystalLocations = [
  { id: 1, coords: [1870, 1828], crystals: ["Lavendrite"] },
  { id: 2, coords: [2203, 3498], crystals: ["Lavendrite"] },
  { id: 3, coords: [2284, 3646], crystals: ["Lavendrite"] },
  { id: 30, coords: [1850, 1840], crystals: ["Lavendrite"] },

  { id: 4, coords: [2477, 819], crystals: ["Blue Sky"] },
  { id: 5, coords: [2341, 823], crystals: ["Blue Sky"] },
  { id: 6, coords: [2598, 3720], crystals: ["Blue Sky"] },
  { id: 28, coords: [2152, 868], crystals: ["Blue Sky"] },
  { id: 29, coords: [2656, 3487], crystals: ["Blue Sky"] },

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

  { id: 17, coords: [2360, 3628], crystals: ["Honeyglow"] },
  { id: 18, coords: [2512, 3704], crystals: ["Honeyglow"] },
  { id: 19, coords: [2302, 3690], crystals: ["Honeyglow"] },
  { id: 20, coords: [3557, 1730], crystals: ["Honeyglow"] },
  { id: 21, coords: [3607, 1706], crystals: ["Honeyglow"] },
  { id: 22, coords: [3655, 1745], crystals: ["Honeyglow"] },
  { id: 23, coords: [3667, 1790], crystals: ["Honeyglow"] },
  { id: 24, coords: [3584, 1798], crystals: ["Honeyglow"] },
  { id: 31, coords: [3580, 1768], crystals: ["Honeyglow"] },
  { id: 32, coords: [3620, 1820], crystals: ["Honeyglow"] },

  { id: 25, coords: [2934, 2495], crystals: ["Lunacite"] },

  { id: 26, coords: [2836, 2480], crystals: ["Dark Lunacite"] },

  { id: 27, coords: [3037, 2726], crystals: ["Starshard"] }
];

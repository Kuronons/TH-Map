// ---------------- FRUIT TYPES ----------------
// Seasonal rotations — same location, fruit changes by season
const seasonalGroups = [
  { spring: "Ghost Berry",      summer: "Solberry",         fall: "Mirthshade",      winter: "Velvitfrost Berry" },
  { spring: "Azureberry",       summer: "Nightblush Berry", fall: "Mireberry",       winter: "Twilipuff" },
  { spring: "Skydrop Berry",    summer: "Tigermelon",       fall: "Mellowspike",     winter: "Faepeach" },
  { spring: "Nightshade Berry", summer: "Velvenight Berry", fall: "Scarletip",       winter: "Frostgleam" },
  { spring: "Emberberry",       summer: "Heartgleam",       fall: "Seafallow Berry", winter: "Icerose Berry" },
  { spring: "Bloodberry",       summer: "Honeycran Berry",  fall: "Amberburst",      winter: "Lunabright" }
];

// Persistent fruits — present all year at these locations
// Azureberry and Ghost Berry have persistent locations separate from their seasonal ones
const fruitLocations = [
  // PERSISTENT:
  { id: 1, coords: [2349, 818],  type: "persistent", fruit: "Azureberry" },
  { id: 2, coords: [2239, 873],  type: "persistent", fruit: "Azureberry" },
  { id: 3, coords: [2302, 1251], type: "persistent", fruit: "Azureberry" },
  { id: 4, coords: [2166, 1118], type: "persistent", fruit: "Azureberry" },
  { id: 5, coords: [2626, 2456], type: "persistent", fruit: "Ghost Berry" },
  { id: 6, coords: [2697, 2376], type: "persistent", fruit: "Ghost Berry" },
  { id: 7, coords: [2585, 2356], type: "persistent", fruit: "Ghost Berry" },

  // SEASONAL:
  { id: 8,  coords: [2942, 2344], type: "seasonal", fruits: { spring: "Ghost Berry", summer: "Solberry", fall: "Mirthshade", winter: "Velvitfrost Berry" } },
  { id: 9,  coords: [2986, 2274], type: "seasonal", fruits: { spring: "Ghost Berry", summer: "Solberry", fall: "Mirthshade", winter: "Velvitfrost Berry" } },
  { id: 10, coords: [2965, 2250], type: "seasonal", fruits: { spring: "Ghost Berry", summer: "Solberry", fall: "Mirthshade", winter: "Velvitfrost Berry" } },
  { id: 11, coords: [2842, 2287], type: "seasonal", fruits: { spring: "Ghost Berry", summer: "Solberry", fall: "Mirthshade", winter: "Velvitfrost Berry" } },
  { id: 12, coords: [2851, 2507], type: "seasonal", fruits: { spring: "Ghost Berry", summer: "Solberry", fall: "Mirthshade", winter: "Velvitfrost Berry" } },
  { id: 13, coords: [2624, 2184], type: "seasonal", fruits: { spring: "Ghost Berry", summer: "Solberry", fall: "Mirthshade", winter: "Velvitfrost Berry" } },
  { id: 14,  coords: [2716, 2024], type: "seasonal", fruits: { spring: "Ghost Berry", summer: "Solberry", fall: "Mirthshade", winter: "Velvitfrost Berry" } },
  { id: 15,  coords: [2703, 1895], type: "seasonal", fruits: { spring: "Ghost Berry", summer: "Solberry", fall: "Mirthshade", winter: "Velvitfrost Berry" } },
  { id: 16, coords: [2879, 1366], type: "seasonal", fruits: { spring: "Ghost Berry", summer: "Solberry", fall: "Mirthshade", winter: "Velvitfrost Berry" } },
  { id: 17, coords: [3059, 2259], type: "seasonal", fruits: { spring: "Ghost Berry", summer: "Solberry", fall: "Mirthshade", winter: "Velvitfrost Berry" } },
  { id: 18, coords: [3093, 2281], type: "seasonal", fruits: { spring: "Ghost Berry", summer: "Solberry", fall: "Mirthshade", winter: "Velvitfrost Berry" } },
  { id: 19, coords: [3070, 2214], type: "seasonal", fruits: { spring: "Ghost Berry", summer: "Solberry", fall: "Mirthshade", winter: "Velvitfrost Berry" } },
  { id: 20,  coords: [3114, 2251], type: "seasonal", fruits: { spring: "Ghost Berry", summer: "Solberry", fall: "Mirthshade", winter: "Velvitfrost Berry" } },
  { id: 21,  coords: [1930, 2621], type: "seasonal", fruits: { spring: "Ghost Berry", summer: "Solberry", fall: "Mirthshade", winter: "Velvitfrost Berry" } },
  { id: 22, coords: [1883, 2607], type: "seasonal", fruits: { spring: "Ghost Berry", summer: "Solberry", fall: "Mirthshade", winter: "Velvitfrost Berry" } },

  { id: 23,  coords: [3011, 2527], type: "seasonal", fruits: { spring: "Azureberry", summer: "Nightblush Berry", fall: "Mireberry", winter: "Twilipuff" } },
  { id: 24,  coords: [3056, 2546], type: "seasonal", fruits: { spring: "Azureberry", summer: "Nightblush Berry", fall: "Mireberry", winter: "Twilipuff" } },
  { id: 25,  coords: [2834, 2063], type: "seasonal", fruits: { spring: "Azureberry", summer: "Nightblush Berry", fall: "Mireberry", winter: "Twilipuff" } },
  { id: 26,  coords: [2420, 2580], type: "seasonal", fruits: { spring: "Azureberry", summer: "Nightblush Berry", fall: "Mireberry", winter: "Twilipuff" } },
  { id: 27,  coords: [2478, 2576], type: "seasonal", fruits: { spring: "Azureberry", summer: "Nightblush Berry", fall: "Mireberry", winter: "Twilipuff" } },
  { id: 28,  coords: [2607, 3700], type: "seasonal", fruits: { spring: "Azureberry", summer: "Nightblush Berry", fall: "Mireberry", winter: "Twilipuff" } },
  { id: 29,  coords: [2662, 3482], type: "seasonal", fruits: { spring: "Azureberry", summer: "Nightblush Berry", fall: "Mireberry", winter: "Twilipuff" } },
  { id: 30,  coords: [2551, 3372], type: "seasonal", fruits: { spring: "Azureberry", summer: "Nightblush Berry", fall: "Mireberry", winter: "Twilipuff" } },
  { id: 31,  coords: [2730, 1680], type: "seasonal", fruits: { spring: "Azureberry", summer: "Nightblush Berry", fall: "Mireberry", winter: "Twilipuff" } },
  { id: 32,  coords: [2746, 1562], type: "seasonal", fruits: { spring: "Azureberry", summer: "Nightblush Berry", fall: "Mireberry", winter: "Twilipuff" } },
  { id: 33,  coords: [2702, 1472], type: "seasonal", fruits: { spring: "Azureberry", summer: "Nightblush Berry", fall: "Mireberry", winter: "Twilipuff" } },
  { id: 34,  coords: [2646, 864], type: "seasonal", fruits: { spring: "Azureberry", summer: "Nightblush Berry", fall: "Mireberry", winter: "Twilipuff" } },
  { id: 35,  coords: [2732, 1019], type: "seasonal", fruits: { spring: "Azureberry", summer: "Nightblush Berry", fall: "Mireberry", winter: "Twilipuff" } },
  { id: 36,  coords: [2765, 1101], type: "seasonal", fruits: { spring: "Azureberry", summer: "Nightblush Berry", fall: "Mireberry", winter: "Twilipuff" } },
  { id: 37,  coords: [1960, 1940], type: "seasonal", fruits: { spring: "Azureberry", summer: "Nightblush Berry", fall: "Mireberry", winter: "Twilipuff" } },
  { id: 38,  coords: [1936, 2032], type: "seasonal", fruits: { spring: "Azureberry", summer: "Nightblush Berry", fall: "Mireberry", winter: "Twilipuff" } },
  { id: 39,  coords: [1897, 2048], type: "seasonal", fruits: { spring: "Azureberry", summer: "Nightblush Berry", fall: "Mireberry", winter: "Twilipuff" } },
  { id: 40,  coords: [1849, 2041], type: "seasonal", fruits: { spring: "Azureberry", summer: "Nightblush Berry", fall: "Mireberry", winter: "Twilipuff" } },
  { id: 41,  coords: [1821, 2917], type: "seasonal", fruits: { spring: "Azureberry", summer: "Nightblush Berry", fall: "Mireberry", winter: "Twilipuff" } },

  { id: 42,  coords: [3064, 2584], type: "seasonal", fruits: { spring: "Skydrop Berry", summer: "Tigermelon", fall: "Mellowspike", winter: "Faepeach" } },
  { id: 43,  coords: [3043, 2644], type: "seasonal", fruits: { spring: "Skydrop Berry", summer: "Tigermelon", fall: "Mellowspike", winter: "Faepeach" } },
  { id: 44,  coords: [3145, 2632], type: "seasonal", fruits: { spring: "Skydrop Berry", summer: "Tigermelon", fall: "Mellowspike", winter: "Faepeach" } },
  { id: 45,  coords: [3102, 2696], type: "seasonal", fruits: { spring: "Skydrop Berry", summer: "Tigermelon", fall: "Mellowspike", winter: "Faepeach" } },
  { id: 46,  coords: [3130, 2787], type: "seasonal", fruits: { spring: "Skydrop Berry", summer: "Tigermelon", fall: "Mellowspike", winter: "Faepeach" } },
  { id: 47,  coords: [3103, 2824], type: "seasonal", fruits: { spring: "Skydrop Berry", summer: "Tigermelon", fall: "Mellowspike", winter: "Faepeach" } },
  { id: 48,  coords: [3000, 2915], type: "seasonal", fruits: { spring: "Skydrop Berry", summer: "Tigermelon", fall: "Mellowspike", winter: "Faepeach" } },
  { id: 49,  coords: [2814, 2868], type: "seasonal", fruits: { spring: "Skydrop Berry", summer: "Tigermelon", fall: "Mellowspike", winter: "Faepeach" } },
  { id: 50,  coords: [2843, 2692], type: "seasonal", fruits: { spring: "Skydrop Berry", summer: "Tigermelon", fall: "Mellowspike", winter: "Faepeach" } },
  { id: 51,  coords: [2297, 1615], type: "seasonal", fruits: { spring: "Skydrop Berry", summer: "Tigermelon", fall: "Mellowspike", winter: "Faepeach" } },
  { id: 52,  coords: [2225, 1432], type: "seasonal", fruits: { spring: "Skydrop Berry", summer: "Tigermelon", fall: "Mellowspike", winter: "Faepeach" } },
  { id: 53,  coords: [2181, 1510], type: "seasonal", fruits: { spring: "Skydrop Berry", summer: "Tigermelon", fall: "Mellowspike", winter: "Faepeach" } },
  { id: 54,  coords: [2215, 1696], type: "seasonal", fruits: { spring: "Skydrop Berry", summer: "Tigermelon", fall: "Mellowspike", winter: "Faepeach" } },
  { id: 55,  coords: [2179, 1740], type: "seasonal", fruits: { spring: "Skydrop Berry", summer: "Tigermelon", fall: "Mellowspike", winter: "Faepeach" } },
  { id: 56,  coords: [2069, 1753], type: "seasonal", fruits: { spring: "Skydrop Berry", summer: "Tigermelon", fall: "Mellowspike", winter: "Faepeach" } },
  { id: 57,  coords: [2138, 1595], type: "seasonal", fruits: { spring: "Skydrop Berry", summer: "Tigermelon", fall: "Mellowspike", winter: "Faepeach" } },
  { id: 58,  coords: [2184, 1842], type: "seasonal", fruits: { spring: "Skydrop Berry", summer: "Tigermelon", fall: "Mellowspike", winter: "Faepeach" } },



];

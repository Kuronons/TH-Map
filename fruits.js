// ---------------- FRUIT TYPES ----------------
// Seasonal rotations — same location, fruit changes by season
const seasonalGroups = [
  { spring: "Ghost Berry",      summer: "Solberry",        fall: "Mirthshade",   winter: "Velvitfrost Berry" },
  { spring: "Azureberry",       summer: "Nightblush Berry", fall: "Mireberry",    winter: "Twilipuff" },
  { spring: "Skydrop Berry",    summer: "Tigermelon",      fall: "Mellowspike",  winter: "Faepeach" },
  { spring: "Nightshade Berry", summer: "Velvenight Berry", fall: "Scarletip",    winter: "Frostgleam" },
  { spring: "Emberberry",       summer: "Heartgleam",      fall: "Seafallow Berry", winter: "Icerose Berry" },
  { spring: "Bloodberry",       summer: "Honeycran Berry",  fall: "Amberburst",   winter: "Lunabright" }
];

// Persistent fruits — present all year at these locations
// Azureberry and Ghost Berry have persistent locations separate from their seasonal ones

const fruitLocations = [
  // PERSISTENT example:
  { id: 1, coords: [2349, 818], type: "persistent", fruit: "Azureberry" },
  { id: 2, coords: [2239, 873], type: "persistent", fruit: "Azureberry" },
  { id: 3, coords: [2302, 1251], type: "persistent", fruit: "Azureberry" },
  { id: 4, coords: [2166, 1118], type: 2persistent", fruit: "Azureberry" }

  // SEASONAL example:
  // { id: 2, coords: [x, y], type: "seasonal", fruits: {
  //   spring: "Ghost Berry",
  //   summer: "Solberry",
  //   fall:   "Mirthshade",
  //   winter: "Velvitfrost Berry"
  // }}
];

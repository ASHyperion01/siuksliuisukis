let selectedItem = null;
let correct = 0;
let total = 0;

/* DIDELIS ŠIUKŠLIŲ POOL */
const trashPool = {
  plastic: [
    "🥤","🧴","🛍️","🍶","🧃","🪥","🧼","🥡","🍼","🧋","🪣"
  ],
  paper: [
    "📄","📦","📰","📃","📘","📙","📗","📕","📒","✉️","🗞️"
  ],
  organic: [
    "🍌","🍎","🥕","🍞","🍕","🥬","🍉","🍇","🍓","🥔","🥑","🍆"
  ],
  metal: [
    "🥫","🪙","🔩","⚙️","🔧","🗝️","🛠️","🔗"
  ],
  glass: [
    "🍾","🥛","🍷","🍸","🫙","🥂","🧪"
  ],
  electronics: [
    "📱","🔋","💡","🖥️","⌨️","🖱️","🎧","📀","📷","📺","🔌"
  ]
};

/* LYGIŲ KIEKIAI – DAUG */
const levelConfig = {
  easy: {
    plastic: 5,
    paper: 5,
    organic: 5,
    metal: 3
  },
  medium: {
    plastic: 6,
    paper: 6,
    organic: 6,
    metal: 4,
    glass: 4
  },
  hard: {
    plastic: 7,
    paper: 7,
    organic: 7,
    metal: 5,
    glass: 5,
    electronics: 6
  }
};

const bins = [
  { name: "Plastikas", type: "plastic" },
  { name: "Popierius", type: "paper" },
  { name: "Organinės", type: "organic" },
  { name: "Metalas", type: "metal" },
  { name: "Stiklas", type: "glass" },
  { name: "Elektronika", type: "electronics" }
];

/* ATSITIKTINĖ TVARKA */
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

/* GENERUOJA LYGI */
function generateLevel(level) {
  let items = [];

  for (let type in levelConfig[level]) {
    const count = levelConfig[level][type];
    const shuffledIcons = shuffle([...trashPool[type]]);

    shuffledIcons.slice(0, count).forEach(icon => {
      items.push({ icon, type });
    });
  }

  return shuffle(items);
}

/* STARTAS */
function startGame(level) {
  document.getElementById("level-select").classList.add("hidden");

  const trashArea = document.getElementById("trash");
  const binsArea = document.getElementById("bins");

  trashArea.innerHTML = "";
  binsArea.innerHTML = "";

  correct = 0;
  total = 0;

  const trashItems = generateLevel(level);

  trashItems.forEach(item => {
    total++;
    const div = document.createElement("div");
    div.className = "trash-item";
    div.textContent = item.icon;
    div.onclick = () => selectedItem = item;
    trashArea.appendChild(div);
  });

  bins.forEach(bin => {
    const div = document.createElement("div");
    div.className = "bin";
    div.textContent = bin.name;
    div.onclick = () => {
      if (!selectedItem) return;
      if (selectedItem.type === bin.type) {
        correct++;
        selectedItem = null;
        trashArea.removeChild(trashArea.firstChild);
      }
    };
    binsArea.appendChild(div);
  });
}

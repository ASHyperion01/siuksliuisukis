let selectedItem = null;
let correct = 0;
let total = 0;

const trashPool = {
  plastic: ["🥤","🧴","🛍️","🍶","🧃","🪥","🧼","🥡","🍼","🧋","🪣"],
  paper: ["📄","📦","📰","📃","📘","📙","📗","📕","📒","✉️","🗞️"],
  organic: ["🍌","🍎","🥕","🍞","🍕","🥬","🍉","🍇","🍓","🥔","🥑","🍆"],
  metal: ["🥫","🪙","🔩","⚙️","🔧","🗝️","🛠️","🔗"],
  glass: ["🍾","🥛","🍷","🍸","🫙","🥂","🧪"],
  electronics: ["📱","🔋","💡","🖥️","⌨️","🖱️","🎧","📀","📷","📺","🔌"]
};

const levelConfig = {
  easy: { plastic:5, paper:5, organic:5, metal:3 },
  medium: { plastic:6, paper:6, organic:6, metal:4, glass:4 },
  hard: { plastic:7, paper:7, organic:7, metal:5, glass:5, electronics:6 }
};

const bins = [
  { name: "Plastikas", type: "plastic" },
  { name: "Popierius", type: "paper" },
  { name: "Organinės", type: "organic" },
  { name: "Metalas", type: "metal" },
  { name: "Stiklas", type: "glass" },
  { name: "Elektronika", type: "electronics" }
];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function generateLevel(level) {
  let items = [];
  for (let type in levelConfig[level]) {
    const count = levelConfig[level][type];
    const shuffledIcons = shuffle([...trashPool[type]]);
    shuffledIcons.slice(0,count).forEach(icon => {
      items.push({ icon, type });
    });
  }
  return shuffle(items);
}

function startGame(level) {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  document.getElementById("level-title").textContent = `Lygis: ${level.charAt(0).toUpperCase() + level.slice(1)}`;

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
    div.onclick = () => {
      if(selectedItem) selectedItem.div.classList.remove("selected");
      selectedItem = { ...item, div };
      div.classList.add("selected");
    };
    trashArea.appendChild(div);
  });

  bins.forEach(bin => {
    const div = document.createElement("div");
    div.className = "bin";
    div.textContent = bin.name;
    div.onclick = () => {
      if(!selectedItem) return;
      if(selectedItem.type === bin.type) {
        correct++;
        trashArea.removeChild(selectedItem.div);
        selectedItem = null;
      } else {
        // neteisingas pasirinkimas
        selectedItem.div.classList.remove("selected");
        div.classList.add("error");
        setTimeout(()=>div.classList.remove("error"), 400);
        selectedItem = null;
      }
    };
    binsArea.appendChild(div);
  });
}

function finishGame() {
  document.getElementById("game").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("score").textContent = `Teisingai: ${correct} iš ${total} šiukšlių`;
}

function resetGame() {
  document.getElementById("result").classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
  selectedItem = null;
  correct = 0;
  total = 0;
}

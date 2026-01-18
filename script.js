let selectedItem = null;
let correct = 0;
let total = 0;

const levels = {
  easy: [
    // PLASTIKAS
    { icon: "🥤", type: "plastic" },
    { icon: "🧴", type: "plastic" },
    { icon: "🛍️", type: "plastic" },

    // POPIERIUS
    { icon: "📄", type: "paper" },
    { icon: "📦", type: "paper" },
    { icon: "📰", type: "paper" },

    // ORGANINĖS
    { icon: "🍌", type: "organic" },
    { icon: "🍎", type: "organic" },
    { icon: "🥕", type: "organic" },

    // METALAS (1, kad būtų labai lengva)
    { icon: "🥫", type: "metal" }
  ],

  medium: [
    { icon: "🥤", type: "plastic" },
    { icon: "🧴", type: "plastic" },
    { icon: "📄", type: "paper" },
    { icon: "📦", type: "paper" },
    { icon: "🍌", type: "organic" },
    { icon: "🍎", type: "organic" },
    { icon: "🥫", type: "metal" },
    { icon: "🍾", type: "glass" }
  ],

  hard: [
    { icon: "🥤", type: "plastic" },
    { icon: "🧴", type: "plastic" },
    { icon: "📄", type: "paper" },
    { icon: "📦", type: "paper" },
    { icon: "🍌", type: "organic" },
    { icon: "🍎", type: "organic" },
    { icon: "🥫", type: "metal" },
    { icon: "🍾", type: "glass" },
    { icon: "📱", type: "electronics" },
    { icon: "🔋", type: "electronics" },
    { icon: "💡", type: "electronics" }
  ]
};

const bins = [
  { name: "Plastikas", type: "plastic" },
  { name: "Popierius", type: "paper" },
  { name: "Organinės", type: "organic" },
  { name: "Metalas", type: "metal" },
  { name: "Stiklas", type: "glass" },
  { name: "Elektronika", type: "electronics" }
];

function startGame(level) {
  document.getElementById("level-select").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  document.getElementById("level-title").innerText = "Lygis: " + level;

  correct = 0;
  selectedItem = null;

  const itemsDiv = document.getElementById("items");
  const binsDiv = document.getElementById("bins");

  itemsDiv.innerHTML = "";
  binsDiv.innerHTML = "";

  total = levels[level].length;

  levels[level].forEach(item => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerText = item.icon;
    div.dataset.type = item.type;

    div.onclick = () => {
      document.querySelectorAll(".item").forEach(i =>
        i.classList.remove("selected")
      );
      div.classList.add("selected");
      selectedItem = div;
    };

    itemsDiv.appendChild(div);
  });

  bins.forEach(bin => {
    const div = document.createElement("div");
    div.className = "bin";
    div.innerText = bin.name;

    div.onclick = () => {
      if (!selectedItem) return;

      if (selectedItem.dataset.type === bin.type) {
        correct++;
      }

      selectedItem.remove();
      selectedItem = null;
    };

    binsDiv.appendChild(div);
  });
}

function finishGame() {
  document.getElementById("game").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("score").innerText =
    `Teisingai: ${correct} iš ${total}`;
}

function resetGame() {
  document.getElementById("result").classList.add("hidden");
  document.getElementById("level-select").classList.remove("hidden");
}

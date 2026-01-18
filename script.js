let selectedItem = null;
let correct = 0;
let total = 0;

const levels = {
  easy: [
    { img: "images/plastic.png", type: "plastic" },
    { img: "images/paper.png", type: "paper" }
  ],
  medium: [
    { img: "images/plastic.png", type: "plastic" },
    { img: "images/paper.png", type: "paper" },
    { img: "images/banana.png", type: "organic" }
  ],
  hard: [
    { img: "images/plastic.png", type: "plastic" },
    { img: "images/paper.png", type: "paper" },
    { img: "images/banana.png", type: "organic" },
    { img: "images/can.png", type: "metal" },
    { img: "images/bottle.png", type: "plastic" }
  ]
};

const bins = [
  { name: "Plastikas", type: "plastic" },
  { name: "Popierius", type: "paper" },
  { name: "Organinės", type: "organic" },
  { name: "Metalas", type: "metal" }
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
    div.dataset.type = item.type;

    const img = document.createElement("img");
    img.src = item.img;

    div.appendChild(img);

    div.onclick = () => {
      document.querySelectorAll(".item").forEach(i => i.classList.remove("selected"));
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

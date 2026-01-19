window.addEventListener("DOMContentLoaded", () => {

let selectedItem = null;
let correct = 0;
let total = 0;
let mistakes = [];

const trashPool = {
  plastic:["🛍️","🧴","🥡","🧋"],
  paper:["📄","📦","📰"],
  organic:["🍌","🍎","🥕","🥬","🍉"],
  metal:["🥫","🔩","🪙"],
  glass:["🍾","🥛","🥂"],
  electronics:["📱","💻","🎧"]
};

const levelConfig = {
  easy:{plastic:3,paper:3,organic:4},
  medium:{plastic:4,paper:4,organic:4,metal:3,glass:3},
  hard:{plastic:5,paper:4,organic:5,metal:4,glass:4,electronics:4}
};

const bins = [
  {name:"Plastikas",type:"plastic"},
  {name:"Popierius",type:"paper"},
  {name:"Organinės",type:"organic"},
  {name:"Metalas",type:"metal"},
  {name:"Stiklas",type:"glass"},
  {name:"Elektronika",type:"electronics"}
];

function shuffle(arr){ return arr.sort(()=>Math.random()-0.5); }

function generateLevel(level){
  let items=[];
  for(let type in levelConfig[level]){
    shuffle([...trashPool[type]])
      .slice(0, levelConfig[level][type])
      .forEach(icon => items.push({icon,type}));
  }
  return shuffle(items);
}

window.startGame = function(level){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("game").classList.add("active");

  document.getElementById("level-title").textContent =
    "Lygis: " + level.toUpperCase();

  const trashArea = document.getElementById("trash");
  const binsArea = document.getElementById("bins");
  trashArea.innerHTML = "";
  binsArea.innerHTML = "";

  correct = 0;
  mistakes = [];
  selectedItem = null;

  const items = generateLevel(level);
  total = items.length;

  items.forEach(item=>{
    const div = document.createElement("div");
    div.className = "trash-item";
    div.textContent = item.icon;
    div.dataset.type = item.type;
    div.onclick = ()=>{
      document.querySelectorAll(".trash-item").forEach(i=>i.classList.remove("selected"));
      selectedItem = div;
      div.classList.add("selected");
    };
    trashArea.appendChild(div);
  });

  bins.forEach(bin=>{
    if(!levelConfig[level][bin.type]) return;
    const div = document.createElement("div");
    div.className = "bin";
    div.textContent = bin.name;
    div.onclick = ()=>{
      if(!selectedItem) return;

      selectedItem.classList.add("removed");

      if(selectedItem.dataset.type === bin.type){
        correct++;
      } else {
        mistakes.push(`${selectedItem.textContent} → ${bin.name}`);
        div.classList.add("error");
        setTimeout(()=>div.classList.remove("error"),300);
      }

      setTimeout(()=>selectedItem.remove(),300);
      selectedItem = null;
    };
    binsArea.appendChild(div);
  });
}

window.finishGame = function(){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("result").classList.add("active");

  let text = `Teisingai: ${correct} / ${total}\n\n`;
  text += mistakes.length ? "Klaidos:\n" + mistakes.join("\n") : "Puikiai! 🎉";
  document.getElementById("score").textContent = text;
}

window.resetGame = function(){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("start-screen").classList.add("active");
}

});

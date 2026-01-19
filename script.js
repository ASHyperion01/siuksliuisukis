window.addEventListener("DOMContentLoaded", () => {

let selected = null;
let correct = 0;
let total = 0;
let mistakes = [];

const trashPool = {
  plastic: ["🛍️","🧴","🥡","🧋","🪥","🧃"],
  paper: ["📄","📦","📰","📃","📘"],
  organic: ["🍌","🍎","🥕","🥬","🍉","🥑","🍞"],
  metal: ["🥫","🔩","🪙","🛠️"],
  glass: ["🍾","🥛","🥂","🫙"],
  electronics: ["📱","💻","🖥️","⌨️","🖱️","🔋","🎧","📀"]
};

const levelConfig = {
  easy: { plastic:3, paper:3, organic:4 },                // 10
  medium: { plastic:4, paper:4, organic:4, metal:3 },     // 15
  hard: { plastic:6, paper:5, organic:6, metal:5, glass:4, electronics:6 } // 32
};

const bins = [
  {name:"Plastikas", type:"plastic"},
  {name:"Popierius", type:"paper"},
  {name:"Organinės", type:"organic"},
  {name:"Metalas", type:"metal"},
  {name:"Stiklas", type:"glass"},
  {name:"Elektronika", type:"electronics"}
];

function shuffle(arr){ return arr.sort(()=>Math.random()-0.5); }

function generate(level){
  let out=[];
  for(let type in levelConfig[level]){
    shuffle([...trashPool[type]])
      .slice(0, levelConfig[level][type])
      .forEach(icon => out.push({icon,type}));
  }
  return shuffle(out);
}

window.startGame = function(level){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("game").classList.add("active");

  document.getElementById("level-title").textContent =
    `Lygis: ${level.toUpperCase()}`;

  const trashEl = document.getElementById("trash");
  const binEl = document.getElementById("bins");
  trashEl.innerHTML = "";
  binEl.innerHTML = "";

  selected = null;
  correct = 0;
  mistakes = [];

  const items = generate(level);
  total = items.length;

  items.forEach(i=>{
    const d = document.createElement("div");
    d.className = "trash-item";
    d.textContent = i.icon;
    d.dataset.type = i.type;
    d.onclick = ()=>{
      document.querySelectorAll(".trash-item").forEach(t=>t.classList.remove("selected"));
      d.classList.add("selected");
      selected = d;
    };
    trashEl.appendChild(d);
  });

  bins.forEach(b=>{
    if(!levelConfig[level][b.type]) return;
    const d = document.createElement("div");
    d.className = "bin";
    d.textContent = b.name;
    d.onclick = ()=>{
      if(!selected) return;

      selected.classList.add("removed");

      if(selected.dataset.type === b.type){
        correct++;
      } else {
        mistakes.push(`${selected.textContent} → ${b.name}`);
        d.classList.add("error");
        setTimeout(()=>d.classList.remove("error"),300);
      }

      setTimeout(()=>selected.remove(),300);
      selected = null;
    };
    binEl.appendChild(d);
  });
}

window.finishGame = function(){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("result").classList.add("active");

  let txt = `Teisingai: ${correct} / ${total}\n\n`;
  txt += mistakes.length ? "Klaidos:\n"+mistakes.join("\n") : "Puikiai! 🎉";
  document.getElementById("score").textContent = txt;
}

window.resetGame = function(){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("start-screen").classList.add("active");
}

});

window.addEventListener("DOMContentLoaded", () => {

let selected = null;
let correct = 0;
let total = 0;
let mistakes = [];
let spawnIndex = 0;
let spawnList = [];

const trashPool = {
  plastic: ["🛍️","🧴","🥡","🧋","🪥","🧃","🧼","🪣"],
  paper: ["📄","📦","📰","📘","📕","📗"],
  organic: ["🍌","🍎","🥕","🥬","🍉","🥑","🍞","🍗","🥚"],
  metal: ["🥫","🔩","🪙","🛠️","🔧"],
  glass: ["🍾","🥛","🥂","🫙","🥃"],
  electronics: ["📱","💻","🖥️","⌨️","🖱️","🔋","🎧","📀","📷"]
};

const levelConfig = {
  easy: { plastic:4, paper:3, organic:5 },                 // 12
  medium: { plastic:6, paper:5, organic:6, metal:5 },      // 22
  hard: { plastic:8, paper:7, organic:9, metal:8, glass:7, electronics:10 } // 49
};

const bins = [
  {name:"Plastikas", type:"plastic"},
  {name:"Popierius", type:"paper"},
  {name:"Organinės", type:"organic"},
  {name:"Metalas", type:"metal"},
  {name:"Stiklas", type:"glass"},
  {name:"Elektronika", type:"electronics"}
];

function shuffle(a){ return a.sort(()=>Math.random()-0.5); }

function generate(level){
  let out=[];
  for(let type in levelConfig[level]){
    shuffle([...trashPool[type]])
      .slice(0, levelConfig[level][type])
      .forEach(icon => out.push({icon,type}));
  }
  return shuffle(out);
}

function spawnNext(){
  if(spawnIndex >= spawnList.length) return;
  const item = spawnList[spawnIndex++];
  const d = document.createElement("div");
  d.className = "trash-item spawn";
  d.textContent = item.icon;
  d.dataset.type = item.type;
  d.onclick = ()=>{
    document.querySelectorAll(".trash-item").forEach(t=>t.classList.remove("selected"));
    d.classList.add("selected");
    selected = d;
  };
  document.getElementById("trash").appendChild(d);
  setTimeout(spawnNext, 180);
}

window.startGame = function(level){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("game").classList.add("active");

  document.getElementById("trash").innerHTML = "";
  document.getElementById("bins").innerHTML = "";
  document.getElementById("level-title").textContent = `Lygis: ${level.toUpperCase()}`;

  selected = null;
  correct = 0;
  mistakes = [];

  spawnIndex = 0;
  spawnList = generate(level);
  total = spawnList.length;

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
    document.getElementById("bins").appendChild(d);
  });

  spawnNext();
}

window.finishGame = function(){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("result").classList.add("active");

  let txt = `Teisingai: ${correct} / ${total}\n\n`;
  txt += mistakes.length ? "Klaidos:\n" + mistakes.join("\n") : "Puikiai! 🌟";
  document.getElementById("score").textContent = txt;
}

window.resetGame = function(){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("start-screen").classList.add("active");
}

});

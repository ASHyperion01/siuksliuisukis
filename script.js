window.addEventListener("DOMContentLoaded", () => {

let selected = null;
let correct = 0;
let total = 0;
let queue = [];
const MAX_VISIBLE = 4; // kiek šiukšlių vienu metu

const trashPool = {
  plastic: [
    {img:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Plastic_bag_icon.svg/512px-Plastic_bag_icon.svg.png"},
    {img:"https://cdn-icons-png.flaticon.com/512/2910/2910766.png"},
    {img:"https://cdn-icons-png.flaticon.com/512/2907/2907240.png"}
  ],
  paper: [
    {img:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Newspaper_icon.svg/512px-Newspaper_icon.svg.png"},
    {img:"https://cdn-icons-png.flaticon.com/512/337/337946.png"},
    {img:"https://cdn-icons-png.flaticon.com/512/2910/2910769.png"}
  ],
  organic: [
    {img:"https://cdn-icons-png.flaticon.com/512/2910/2910768.png"},
    {img:"https://cdn-icons-png.flaticon.com/512/2910/2910767.png"},
    {img:"https://cdn-icons-png.flaticon.com/512/2909/2909278.png"}
  ],
  electronics: [
    {img:"https://cdn-icons-png.flaticon.com/512/833/833314.png"},
    {img:"https://cdn-icons-png.flaticon.com/512/3659/3659899.png"}
  ]
};

const levelConfig = {
  easy: {plastic:3, paper:3, organic:4},
  medium: {plastic:4, paper:4, organic:4, electronics:2},
  hard: {plastic:5, paper:5, organic:5, electronics:4}
};

const bins = [
  {name:"Plastikas", type:"plastic"},
  {name:"Popierius", type:"paper"},
  {name:"Organinės", type:"organic"},
  {name:"Elektronika", type:"electronics"}
];

function shuffle(a){ return a.sort(()=>Math.random()-0.5); }

function generate(level){
  let out=[];
  for(let t in levelConfig[level]){
    shuffle([...trashPool[t]])
      .slice(0, levelConfig[level][t])
      .forEach(i=>out.push({...i,type:t}));
  }
  return shuffle(out);
}

function renderTrash(){
  const trash = document.getElementById("trash");
  trash.innerHTML = "";

  queue.slice(0, MAX_VISIBLE).forEach((item,index)=>{
    const d = document.createElement("div");
    d.className = "trash-item";
    d.dataset.index = index;
    d.dataset.type = item.type;

    const img = document.createElement("img");
    img.src = item.img;
    d.appendChild(img);

    d.onclick = ()=>{
      document.querySelectorAll(".trash-item").forEach(t=>t.classList.remove("selected"));
      d.classList.add("selected");
      selected = d;
    };

    trash.appendChild(d);
  });
}

window.startGame = function(level){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("game").classList.add("active");
  correct = 0;
  selected = null;
  queue = generate(level);
  total = queue.length;

  renderTrash();

  const binsEl = document.getElementById("bins");
  binsEl.innerHTML = "";
  bins.forEach(b=>{
    if(!levelConfig[level][b.type]) return;
    const d = document.createElement("div");
    d.className = "bin";
    d.textContent = b.name;
    d.onclick = ()=>{
      if(!selected) return;
      const index = parseInt(selected.dataset.index);
      const realItem = queue[index];
      if(realItem.type === b.type) correct++;
      queue.splice(index,1);
      selected = null;
      renderTrash();
    };
    binsEl.appendChild(d);
  });
}

window.finishGame = function(){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("result").classList.add("active");
  document.getElementById("score").textContent =
    `Teisingai: ${correct} / ${total}`;
}

window.resetGame = function(){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("start-screen").classList.add("active");
}
});

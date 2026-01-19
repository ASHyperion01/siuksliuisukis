window.addEventListener("DOMContentLoaded", () => {

let selected = null;
let correct = 0;
let total = 0;
let queue = [];
const MAX_VISIBLE = 4; // kiek šiukšlių matosi vienu metu

const trashPool = {
  plastic: [
    {img:"https://images.squarespace-cdn.com/content/v1/5d3178f5c443690001caace9/1678859744004-BOMG3CF0079ZV2LIDL3P/KB-PA-3030.jpg"},
    {img:"https://naturaliosidejos.lt/1604-large_default/perfumed-liquid-soap-500ml-tobacco-oak.jpg"},
    {img:"https://m.media-amazon.com/images/I/51zMzLXAsqL.jpg"},
    {img:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Bubble_Tea.png/250px-Bubble_Tea.png"},
    {img:"https://5.imimg.com/data5/CJ/LM/MM/SELLER-47837534/plastic-tooth-brush.jpg"}
  ],
  paper: [
    {img:"https://static.vecteezy.com/system/resources/thumbnails/011/643/706/small/business-newspaper-isolated-on-white-background-daily-newspaper-mock-up-concept-photo.jpg"},
    {img:"https://sadlers.co.uk/cdn/shop/files/AJ728A.jpg?v=1753784030&width=800"},
    {img:"https://sugarpaper.com/cdn/shop/files/NBK75_LargeSpiralNotebook_Black_Cover.jpg"}
  ],
  organic: [
    {img:"https://media.istockphoto.com/id/2168768239/photo/half-peeled-and-eaten-banana-open-banana-isolated-on-white-background.jpg"},
    {img:"https://media.istockphoto.com/id/119104612/photo/apple-core-isolated-on-white.jpg"},
    {img:"https://media.istockphoto.com/id/106497460/photo/bite-out-of-a-fresh-carrot.jpg"}
  ],
  electronics: [
    {img:"https://img.freepik.com/premium-vector/broken-phone_105325-508.jpg"},
    {img:"https://cdn11.bigcommerce.com/s-a8bv6/images/stencil/1280x1280/products/426/288/Duracell_C__55045.1398448564.jpg"}
  ]
};

const levelConfig = {
  easy: {plastic:4, paper:3, organic:3},
  medium: {plastic:5, paper:4, organic:4, electronics:2},
  hard: {plastic:6, paper:5, organic:5, electronics:4}
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

  queue.slice(0, MAX_VISIBLE).forEach(item=>{
    const d = document.createElement("div");
    d.className = "trash-item";
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

      const index = [...document.querySelectorAll(".trash-item")].indexOf(selected);
      const realItem = queue[index];

      if(realItem.type === b.type){
        correct++;
      }

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

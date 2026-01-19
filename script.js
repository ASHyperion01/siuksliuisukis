window.addEventListener("DOMContentLoaded", () => {

let selected = null;
let correct = 0;
let total = 0;
let mistakes = [];
let queue = [];

const trashPool = {
  plastic: [
    {name:"Shopping bag", img:"https://images.squarespace-cdn.com/content/v1/5d3178f5c443690001caace9/1678859744004-BOMG3CF0079ZV2LIDL3P/KB-PA-3030.jpg"},
    {name:"Soap bottle", img:"https://naturaliosidejos.lt/1604-large_default/perfumed-liquid-soap-500ml-tobacco-oak.jpg"},
    {name:"Plastic food box", img:"https://m.media-amazon.com/images/I/51zMzLXAsqL.jpg"},
    {name:"Bubble tea", img:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Bubble_Tea.png/250px-Bubble_Tea.png"},
    {name:"Toothbrush", img:"https://5.imimg.com/data5/CJ/LM/MM/SELLER-47837534/plastic-tooth-brush.jpg"},
    {name:"Juice pack", img:"https://gulbele.lt/5295-large_default/apelsinu-sultys-elmenhorster-100-1-l.jpg"},
    {name:"Plastic bucket", img:"https://www.kenpoly.com/wp-content/smush-webp/2024/07/ITM.0000915_mileybucket_20.all_.jpg.webp"}
  ],
  paper: [
    {name:"Newspaper", img:"https://static.vecteezy.com/system/resources/thumbnails/011/643/706/small/business-newspaper-isolated-on-white-background-daily-newspaper-mock-up-concept-photo.jpg"},
    {name:"Cardboard box", img:"https://sadlers.co.uk/cdn/shop/files/AJ728A.jpg?v=1753784030&width=800"},
    {name:"Book", img:"https://t4.ftcdn.net/jpg/06/08/97/79/360_F_608977940_9T9cE9mavckeAM4pDU0Mzz1OLcmwLBVP.jpg"},
    {name:"Notebook", img:"https://sugarpaper.com/cdn/shop/files/NBK75_LargeSpiralNotebook_Black_Cover.jpg?v=1702681330&width=1920"}
  ],
  organic: [
    {name:"Banana", img:"https://media.istockphoto.com/id/2168768239/photo/half-peeled-and-eaten-banana-open-banana-isolated-on-white-background.jpg"},
    {name:"Apple", img:"https://media.istockphoto.com/id/119104612/photo/apple-core-isolated-on-white.jpg"},
    {name:"Carrot", img:"https://media.istockphoto.com/id/106497460/photo/bite-out-of-a-fresh-carrot.jpg"},
    {name:"Bread", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREuQVFrePUat4v80X45rDog5KFS5xbPutVug&s"}
  ],
  metal: [
    {name:"Can", img:"https://www.taroscentras.lt/wp-content/uploads/nr.13.png"},
    {name:"Screw", img:"https://www.varztupasaulis.lt/static/photo/f5a5b754-bb4e-11e5-85bb-000c299e27fc.jpg"},
    {name:"Tool", img:"https://img.freepik.com/free-photo/single-tool-isolated-with-copy-space_1194-637905.jpg"}
  ],
  glass: [
    {name:"Bottle", img:"https://img.esanitex.net/image/cfa2c03d-bd22-42e0-b335-ae4ceef7082f.jpg"},
    {name:"Glass", img:"https://assets.manufactum.de/p/067/067835/67835_01.jpg"}
  ],
  electronics: [
    {name:"Broken phone", img:"https://img.freepik.com/premium-vector/broken-phone_105325-508.jpg"},
    {name:"Broken computer", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYx0LJ3dKl57WKT8biGpkoTDB1EDUdVTYsyQ&s"},
    {name:"Battery", img:"https://cdn11.bigcommerce.com/s-a8bv6/images/stencil/1280x1280/products/426/288/Duracell_C__55045.1398448564.jpg"}
  ]
};

const levelConfig = {
  easy: {plastic:4, paper:3, organic:3},            // 10
  medium: {plastic:5, paper:4, organic:4, metal:3},
  hard: {plastic:7, paper:6, organic:6, metal:5, glass:4, electronics:6}
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
  for(let t in levelConfig[level]){
    shuffle([...trashPool[t]])
      .slice(0, levelConfig[level][t])
      .forEach(i=>out.push({...i,type:t}));
  }
  return shuffle(out);
}

function spawnNext(){
  if(queue.length === 0) return;
  const item = queue.shift();
  const d = document.createElement("div");
  d.className = "trash-item";
  d.dataset.type = item.type;

  const img = document.createElement("img");
  img.src = item.img;
  img.alt = item.name;

  d.appendChild(img);

  d.onclick = ()=>{
    document.querySelectorAll(".trash-item").forEach(t=>t.classList.remove("selected"));
    d.classList.add("selected");
    selected = d;
  };

  document.getElementById("trash").appendChild(d);
}

window.startGame = function(level){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("game").classList.add("active");

  document.getElementById("trash").innerHTML="";
  document.getElementById("bins").innerHTML="";

  correct=0; mistakes=[]; selected=null;
  queue = generate(level);
  total = queue.length;

  spawnNext();

  bins.forEach(b=>{
    if(!levelConfig[level][b.type]) return;
    const d=document.createElement("div");
    d.className="bin";
    d.textContent=b.name;
    d.onclick=()=>{
      if(!selected) return;

      if(selected.dataset.type===b.type){
        correct++;
      } else {
        mistakes.push(b.name);
      }

      selected.remove();
      selected=null;
      spawnNext();
    };
    document.getElementById("bins").appendChild(d);
  });
}

window.finishGame=function(){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("result").classList.add("active");
  document.getElementById("score").textContent =
    `Teisingai: ${correct} / ${total}`;
}

window.resetGame=function(){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("start-screen").classList.add("active");
}

});

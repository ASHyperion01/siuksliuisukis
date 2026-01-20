let trashItems = [];
let currentIndex = 0;
let correct = 0;
let total = 0;
let history = [];

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
    {img:"https://sugarpaper.com/cdn/shop/files/NBK75_LargeSpiralNotebook_Black_Cover.jpg"},
    {img:"https://allcitycandy.com/cdn/shop/products/a5214c3a-8860-4d09-aab4-70524e7a0921.8ccd57d5e98c67f93544c8a059fe15b9.jpg?v=1632837195"}
  ],

  organic: [
    {img:"https://media.istockphoto.com/id/146805514/photo/banana-skin.jpg"},
    {img:"https://thumbs.dreamstime.com/b/eaten-apple-close-up-white-background-isolated-136817997.jpg"},
    {img:"https://www.allthatgrows.in/cdn/shop/products/Carrot-Orange.jpg?v=1598079671"},
    {img:"https://www.veggipedia.nl/_next/image?url=https://veggipedia-cms.production.taks.zooma.cloud/assets/Uploads/Products/Aardappel-groenten-Veggipedia.png"},
    {img:"https://media.istockphoto.com/id/172205213/photo/chicken-drumstick-with-bite-missing.jpg"}
  ],

  electronics: [
    {img:"https://img.freepik.com/premium-vector/broken-phone_105325-508.jpg"},
    {img:"https://cdn11.bigcommerce.com/s-a8bv6/images/stencil/1280x1280/products/426/288/Duracell_C__55045.1398448564.jpg"},
    {img:"https://store.hp.com/app/assets/images/uploads/prod/top-3-ways-computer-screen-repair-hero1551994969454.png"},
    {img:"https://www.cnet.com/a/img/resize/f9414cf6d3a45cc61861fd15cc8dadd52d701975/hub/2016/04/22/b9d00103-f05f-426a-9de9-af1f4d189541/recycle-old-cables-chargers.jpg"}
  ],

  glass: [
    {img:"https://sansdrinks.com.au/cdn/shop/files/Buy-1920-Wines-Non-Alcoholic-Sparkling-Shiraz-Sansdrinks-37080272339168.jpg"},
    {img:"https://assets.manufactum.de/p/067/067835/67835_01.jpg"},
    {img:"https://cdn11.bigcommerce.com/s-xizoo/images/stencil/original/products/1042/4014/ECO12GB__23886.1707332829.jpg"},
    {img:"https://media.royaldesign.co.uk/6/spiegelau-salute-red-wine-glass-set-of-4-55-cl-13?w=800"},
    {img:"https://cdn.pixabay.com/photo/2017/06/15/23/56/mirror-frame-2407292_640.png"},
    {img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxLoLS9gof52cqQ9pAv28_rQ-iA9EdDI3kYQ"}
  ]
};

const levelConfig = {
  easy:   {plastic:3, paper:3, organic:3, glass:2},
  medium: {plastic:4, paper:4, organic:4, electronics:2, glass:3},
  hard:   {plastic:5, paper:5, organic:5, electronics:4, glass:4}
};

const bins = [
  {name:"Plastikas", type:"plastic"},
  {name:"Popierius", type:"paper"},
  {name:"Organinės atliekos", type:"organic"},
  {name:"Elektronika", type:"electronics"},
  {name:"Stiklas", type:"glass"}
];

function shuffle(arr){
  return arr.sort(() => Math.random() - 0.5);
}

function generate(level){
  let items = [];
  for (let type in levelConfig[level]) {
    shuffle([...trashPool[type]])
      .slice(0, levelConfig[level][type])
      .forEach(i => items.push({...i, type}));
  }
  return shuffle(items);
}

function showTrash(){
  document.getElementById("trash-img").src =
    trashItems[currentIndex].img;
}

window.startGame = function(level){
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById("game").classList.add("active");

  document.getElementById("level-title").textContent =
    "Lygis: " + level.charAt(0).toUpperCase() + level.slice(1);

  trashItems = generate(level);
  total = trashItems.length;
  currentIndex = 0;
  correct = 0;
  history = [];

  const binsEl = document.getElementById("bins");
  binsEl.innerHTML = "";

  bins.forEach(b => {
    if (!levelConfig[level][b.type]) return;
    const div = document.createElement("div");
    div.className = "bin";
    div.textContent = b.name;
    div.onclick = () => chooseBin(b.type);
    binsEl.appendChild(div);
  });

  showTrash();
};

function chooseBin(type){
  history.push(currentIndex);
  if (trashItems[currentIndex].type === type) correct++;
  currentIndex++;

  if (currentIndex >= trashItems.length) finishGame();
  else showTrash();
}

window.previousTrash = function(){
  if (history.length === 0) return;
  currentIndex = history.pop();
  showTrash();
};

function finishGame(){
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById("result").classList.add("active");
  document.getElementById("score").textContent =
    `Teisingai surūšiuota: ${correct} iš ${total}`;
};

window.resetGame = function(){
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById("start-screen").classList.add("active");
};

let selected = null;
let correct = 0;
let total = 0;
let trashItems = [];

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
    {img:"https://media.istockphoto.com/id/146805514/photo/banana-skin.jpg?s=612x612&w=0&k=20&c=yJwjbj8l671Y8WGeASM-1vnZ1HRsKLoVmtJk2IeY3DA="},
    {img:"https://thumbs.dreamstime.com/b/eaten-apple-close-up-white-background-isolated-eaten-apple-close-up-white-isolated-136817997.jpg"},
    {img:"https://www.allthatgrows.in/cdn/shop/products/Carrot-Orange.jpg?v=1598079671"}
  ],
  electronics: [
    {img:"https://img.freepik.com/premium-vector/broken-phone_105325-508.jpg"},
    {img:"https://cdn11.bigcommerce.com/s-a8bv6/images/stencil/1280x1280/products/426/288/Duracell_C__55045.1398448564.jpg"}
  ],
  glass: [
    {img:"https://sansdrinks.com.au/cdn/shop/files/Buy-1920-Wines-Non-Alcoholic-Sparkling-Shiraz-Sansdrinks-37080272339168.jpg?v=1755851767"},
    {img:"https://assets.manufactum.de/p/067/067835/67835_01.jpg/drinking-glass-jus.jpg"},
    {img:"https://cdn11.bigcommerce.com/s-xizoo/images/stencil/original/products/1042/4014/ECO12GB__23886.1707332829.jpg"},
    {img:"https://media.royaldesign.co.uk/6/spiegelau-salute-red-wine-glass-set-of-4-55-cl-13?w=800&quality=80"}
  ]
};

const levelConfig = {
  easy:{plastic:3,paper:3,organic:3,glass:2},
  medium:{plastic:4,paper:4,organic:4,electronics:2,glass:3},
  hard:{plastic:5,paper:5,organic:5,electronics:4,glass:4}
};

const bins=[
  {name:"Plastikas",type:"plastic"},
  {name:"Popierius",type:"paper"},
  {name:"Organinės",type:"organic"},
  {name:"Elektronika",type:"electronics"},
  {name:"Stiklas",type:"glass"}
];

function shuffle(a){return a.sort(()=>Math.random()-0.5)}

function generate(level){
  let items=[];
  for(let t in levelConfig[level]){
    shuffle([...trashPool[t]]).slice(0,levelConfig[level][t]).forEach(i=>items.push({...i,type:t}));
  }
  return shuffle(items);
}

function renderTrash(){
  const trash=document.getElementById("trash");
  trash.innerHTML="";
  trashItems.forEach((item,index)=>{
    const d=document.createElement("div");
    d.className="trash-item";
    d.dataset.type=item.type;

    const img=document.createElement("img");
    img.src=item.img;
    d.appendChild(img);

    d.onclick=()=>{
      document.querySelectorAll(".trash-item").forEach(t=>t.classList.remove("selected"));
      d.classList.add("selected");
      selected=d;
    };

    trash.appendChild(d);
    setTimeout(()=>d.classList.add("show"), index*100);
  });
}

window.startGame=function(level){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("game").classList.add("active");
  document.getElementById("level-title").textContent=`Lygis: ${level.charAt(0).toUpperCase()+level.slice(1)}`;
  correct=0;
  selected=null;
  trashItems=generate(level);
  total=trashItems.length;
  renderTrash();

  const binsEl=document.getElementById("bins");
  binsEl.innerHTML="";
  bins.forEach(b=>{
    if(!levelConfig[level][b.type]) return;
    const d=document.createElement("div");
    d.className="bin";
    d.textContent=b.name;
    d.onclick=()=>{
      if(!selected) return;
      if(selected.dataset.type===b.type) correct++;
      selected.remove();
      selected=null;
    };
    binsEl.appendChild(d);
  });
}

window.finishGame=function(){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("result").classList.add("active");
  document.getElementById("score").textContent=`Teisingai: ${correct} / ${total}`;
}

window.resetGame=function(){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("start-screen").classList.add("active");
}

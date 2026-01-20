let trashItems=[];
let currentIndex=0;
let correct=0;
let total=0;
let history=[];
let mistakes=[];

const explanations={
  plastic:"Plastikas suyra labai lėtai ir turi būti perdirbamas atskirai.",
  paper:"Popierius lengvai perdirbamas, jei nėra užterštas.",
  organic:"Organinės atliekos suyra natūraliai ir gali tapti kompostu.",
  electronics:"Elektronikoje yra pavojingų medžiagų.",
  glass:"Stiklas perdirbamas neribotą kiekį kartų."
};

const trashPool={
  plastic:[
    {img:"https://allcitycandy.com/cdn/shop/products/a5214c3a-8860-4d09-aab4-70524e7a0921.8ccd57d5e98c67f93544c8a059fe15b9.jpg?v=1632837195"},
    {img:"https://naturaliosidejos.lt/1604-large_default/perfumed-liquid-soap-500ml-tobacco-oak.jpg"},
    {img:"https://m.media-amazon.com/images/I/51zMzLXAsqL.jpg"},
    {img:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Bubble_Tea.png/250px-Bubble_Tea.png"},
    {img:"https://5.imimg.com/data5/CJ/LM/MM/SELLER-47837534/plastic-tooth-brush.jpg"}
  ],
  paper:[
    {img:"https://static.vecteezy.com/system/resources/thumbnails/011/643/706/small/business-newspaper-isolated-on-white-background-daily-newspaper-mock-up-concept-photo.jpg"},
    {img:"https://sadlers.co.uk/cdn/shop/files/AJ728A.jpg?v=1753784030&width=800"},
    {img:"https://sugarpaper.com/cdn/shop/files/NBK75_LargeSpiralNotebook_Black_Cover.jpg"},
    {img:"https://images.squarespace-cdn.com/content/v1/5d3178f5c443690001caace9/1678859744004-BOMG3CF0079ZV2LIDL3P/KB-PA-3030.jpg"}
  ],
  organic:[
    {img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLWh-E-5rCitwZiTaKzesMB6kupUh0TRu1FQ&s"},
    {img:"https://thumbs.dreamstime.com/b/eaten-apple-close-up-white-background-isolated-136817997.jpg"},
    {img:"https://www.allthatgrows.in/cdn/shop/products/Carrot-Orange.jpg?v=1598079671"}
  ],
  electronics:[
    {img:"https://img.freepik.com/premium-vector/broken-phone_105325-508.jpg"},
    {img:"https://cdn11.bigcommerce.com/s-a8bv6/images/stencil/1280x1280/products/426/288/Duracell_C__55045.1398448564.jpg"}
  ],
  glass:[
    {img:"https://sansdrinks.com.au/cdn/shop/files/Buy-1920-Wines-Non-Alcoholic-Sparkling-Shiraz-Sansdrinks-37080272339168.jpg?v=1755851767"},
    {img:"https://assets.manufactum.de/p/067/067835/67835_01.jpg/drinking-glass-jus.jpg"},
    {img:"https://cdn11.bigcommerce.com/s-xizoo/images/stencil/original/products/1042/4014/ECO12GB__23886.1707332829.jpg"},
    {img:"https://media.royaldesign.co.uk/6/spiegelau-salute-red-wine-glass-set-of-4-55-cl-13?w=800&quality=80"}
  ]
};

const levelConfig={
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

function shuffle(a){return a.sort(()=>Math.random()-0.5);}

function generate(level){
  let items=[];
  for(let t in levelConfig[level]){
    shuffle([...trashPool[t]]).slice(0,levelConfig[level][t]).forEach(i=>items.push({...i,type:t}));
  }
  return shuffle(items);
}

function showTrash(){
  const imgEl=document.getElementById("trash-img");
  if(!imgEl) return;
  imgEl.src=trashItems[currentIndex].img;
  imgEl.width=400;
  imgEl.height=400;
}

window.startGame=function(level){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("game").classList.add("active");
  document.getElementById("level-title").textContent=`Lygis: ${level.charAt(0).toUpperCase()+level.slice(1)}`;

  trashItems=generate(level);
  total=trashItems.length;
  currentIndex=0;
  correct=0;
  history=[];
  mistakes=[];

  const binsEl=document.getElementById("bins");
  binsEl.innerHTML="";
  bins.forEach(b=>{
    if(!levelConfig[level][b.type]) return;
    const d=document.createElement("div");
    d.className="bin";
    d.textContent=b.name;
    d.onclick=()=>chooseBin(b.type);
    binsEl.appendChild(d);
  });

  showTrash();
};

function chooseBin(type){
  history.push(currentIndex);
  if(trashItems[currentIndex].type===type) correct++;
  else mistakes.push({img:trashItems[currentIndex].img,correct:trashItems[currentIndex].type});
  currentIndex++;
  if(currentIndex>=trashItems.length) finishGame();
  else showTrash();
}

window.previousTrash=function(){
  if(history.length===0) return;
  currentIndex=history.pop();
  showTrash();
};

function finishGame(){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("result").classList.add("active");

  document.getElementById("score").textContent=`Teisingai: ${correct} / ${total}`;
  const mistakesDiv=document.getElementById("mistakes");
  mistakesDiv.innerHTML="";

  if(correct===total){
    document.getElementById("result-title").textContent="Šaunuolis! 🎉";
    startConfetti();
  } else {
    document.getElementById("result-title").textContent="Rezultatas";
    mistakes.forEach(m=>{
      const p=document.createElement("p");
      p.innerHTML=`<img src="${m.img}" style="width:50px;vertical-align:middle;margin-right:5px;"> Tinkamai turėjo būti: <b>${m.correct}</b> (${explanations[m.correct]})`;
      mistakesDiv.appendChild(p);
    });
  }
}

window.resetGame=function(){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("start-screen").classList.add("active");
};

function startConfetti(){
  const canvas=document.getElementById("confetti");
  const ctx=canvas.getContext("2d");
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
  let particles=[];
  for(let i=0;i<200;i++){
    particles.push({
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height,
      r:Math.random()*6+4,
      d:Math.random()*20+10,
      color:`hsl(${Math.random()*360},100%,50%)`,
      tilt:Math.random()*10-5
    });
  }
  let angle=0;
  let startTime=Date.now();
  function draw(){
    const elapsed=(Date.now()-startTime)/1000;
    if(elapsed>5) return; // tik 5s
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
      ctx.beginPath();
      ctx.fillStyle=p.color;
      ctx.fillRect(p.x,p.y,p.r,p.r);
      ctx.closePath();
      p.x+=Math.sin(angle)*2;
      p.y+=Math.cos(angle+p.d)+1+p.r/2;
      if(p.y>canvas.height){p.y=-10;p.x=Math.random()*canvas.width;}
    });
    angle+=0.02;
    requestAnimationFrame(draw);
  }
  draw();
}

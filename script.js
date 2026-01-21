let trashItems = [], currentIndex = 0, correct = 0, total = 0, history = [], mistakes = [];

const explanations = {
  plastic:"Plastikas suyra labai lėtai ir turi būti perdirbamas atskirai.",
  paper:"Popierius lengvai perdirbamas, jei nėra užterštas.",
  organic:"Organinės atliekos suyra natūraliai ir gali tapti kompostu.",
  electronics:"Elektronikoje yra pavojingų medžiagų.",
  glass:"Stiklas perdirbamas neribotą kiekį kartų.",
  bulky:"Didžiagabaritės atliekos turi būti specialiai perdirbamos."
};

// --- TRASH POOL ---
const trashPool = {
  plastic:[
    {img:"https://allcitycandy.com/cdn/shop/products/a5214c3a-8860-4d09-aab4-70524e7a0921.8ccd57d5e98c67f93544c8a059fe15b9.jpg?v=1632837195"},
    {img:"https://naturaliosidejos.lt/1604-large_default/perfumed-liquid-soap-500ml-tobacco-oak.jpg"},
    {img:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Bubble_Tea.png/250px-Bubble_Tea.png"},
    {img:"https://5.imimg.com/data5/CJ/LM/MM/SELLER-47837534/plastic-tooth-brush.jpg"},
    {img:"https://kitstore.s57.cdn-upgates.com/_cache/2/a/2af5c373dbe23fdd00e9e3ddfcb81972-42163-1.jpg"},
    {img:"https://bellroy-product-images.imgix.net//bellroy_dot_com_gallery_image/USD/PCXE-GRA-107/0"}
  ],
  paper:[
    {img:"https://static.vecteezy.com/system/resources/thumbnails/011/643/706/small/business-newspaper-isolated-on-white-background-daily-newspaper-mock-up-concept-photo.jpg"},
    {img:"https://sadlers.co.uk/cdn/shop/files/AJ728A.jpg?v=1753784030&width=800"},
    {img:"https://sugarpaper.com/cdn/shop/files/NBK75_LargeSpiralNotebook_Black_Cover.jpg"},
    {img:"https://images.squarespace-cdn.com/content/v1/5d3178f5c443690001caace9/1678859744004-BOMG3CF0079ZV2LIDL3P/KB-PA-3030"},
    {img:"https://m.media-amazon.com/images/I/51zMzLXAsqL.jpg"}
  ],
  organic:[
    {img:"https://preview.free3d.com/img/2015/05/1876171187512411691/jvskip50.jpg"},
    {img:"https://koro.imgix.net/media/6a/02/4f/1653292044/KAUGU_001-02.jpg?w=3000&auto=format,compress&fit=max&cs=srgb"},
    {img:"https://media.istockphoto.com/id/146805514/photo/banana-skin.jpg?s=612x612&w=0&k=20&c=yJwjbj8l671Y8WGeASM-1vnZ1HRsKLoVmtJk2IeY3DA="},
    {img:"https://thumbs.dreamstime.com/b/eaten-apple-close-up-white-background-isolated-136817997.jpg"},
    {img:"https://www.allthatgrows.in/cdn/shop/products/Carrot-Orange.jpg?v=1598079671"}
  ],
  electronics:[
    {img:"https://m.media-amazon.com/images/I/61XmhmEup8L._AC_SL1000_.jpg"},
    {img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1MwkxMbU7_tkvqCdounLlr1PXcBf3KtaGhA&s"},
    {img:"https://cdn11.bigcommerce.com/s-8vy557m296/images/stencil/original/products/342/4555/30_SMC2266KS_3QR_WEB__24717.1740693309.JPG?c=2"},
    {img:"https://i.redd.it/raajbqqtrpq41.jpg"}
  ],
  glass:[
    {img:"https://sansdrinks.com.au/cdn/shop/files/Buy-1920-Wines-Non-Alcoholic-Sparkling-Shiraz-Sansdrinks-37080272339168.jpg?v=1755851767"},
    {img:"https://assets.manufactum.de/p/067/067835/67835_01.jpg/drinking-glass-jus.jpg"},
    {img:"https://cdn11.bigcommerce.com/s-xizoo/images/stencil/original/products/1042/4014/ECO12GB__23886.1707332829.jpg"},
    {img:"https://media.royaldesign.co.uk/6/spiegelau-salute-red-wine-glass-set-of-4-55-cl-13?w=800&quality=80"},
    {img:"https://cdn.pixabay.com/photo/2017/06/15/23/56/mirror-frame-2407292_640.png"},
    {img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxLoLS9gof52cqQ9pAv28_rQ-iA9EdDI3kYQ&s"}
  ],
  bulky:[
    {img:"https://5.imimg.com/data5/FW/FG/MY-20864985/car-rear-bumper-500x500.jpg"},
    {img:"https://primaline.eu/wp-content/uploads/2025/08/europal-e1754981395149.jpg"},
    {img:"https://www.baldinis.lt/image/cache/catalog/Spintos/IMG_20220225_102459_1-1200x1111.jpg"},
    {img:"https://www.pirtims.lt/wp-content/uploads/2025/04/langas-pirciai.jpg"},
    {img:"https://www.alsoda.lt/images/uploader/pa/padanga-20x1000-10-1.jpg"},
    {img:"https://weld.lt/media/products/GX200UT2SXE5OH_1.jpg"},
    {img:"https://images.kaina24.lt/5909/67/kompiuterio-korpusas-darkflash-ds900-baltas.jpg"}
  ]
};

const levelConfig = {
  easy:{plastic:4,paper:4,organic:4,electronics:2,glass:2},
  medium:{plastic:5,paper:5,organic:4,electronics:3,glass:3},
  hard:{plastic:5,paper:5,organic:5,electronics:4,glass:4,bulky:3}
};

const bins = [
  {name:"Plastikas", type:"plastic"},
  {name:"Popierius", type:"paper"},
  {name:"Organinės", type:"organic"},
  {name:"Elektronika", type:"electronics"},
  {name:"Stiklas", type:"glass"},
  {name:"Didžiagabaritės", type:"bulky"}
];

function shuffle(a){return a.sort(()=>Math.random()-0.5);}

// --- GENERATE UNIQUE TRASH ---
function generate(level){
  let items = [];
  for(let type in levelConfig[level]){
    const count = levelConfig[level][type];
    const pool = shuffle([...trashPool[type]]);
    for(let i=0; i<Math.min(count,pool.length); i++){
      items.push({...pool[i], type});
    }
  }
  return shuffle(items);
}

// --- START GAME WITH FADE ---
function startGame(level){
  const fadeDiv = document.createElement('div');
  fadeDiv.style.position='fixed';
  fadeDiv.style.top='0';
  fadeDiv.style.left='0';
  fadeDiv.style.width='100%';
  fadeDiv.style.height='100%';
  fadeDiv.style.background='black';
  fadeDiv.style.opacity='0';
  fadeDiv.style.transition='opacity 0.5s';
  fadeDiv.style.zIndex='9999';
  document.body.appendChild(fadeDiv);

  fadeDiv.style.opacity='1';
  setTimeout(()=>{
    document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
    document.getElementById("game").classList.add("active");
    document.getElementById("level-title").textContent=`Lygis: ${level.charAt(0).toUpperCase()+level.slice(1)}`;

    trashItems = generate(level);
    total = trashItems.length;
    currentIndex = 0;
    correct = 0;
    mistakes = [];
    history = [];

    const binsEl = document.getElementById("bins");
    binsEl.innerHTML="";
    bins.forEach(b=>{
      if(!levelConfig[level][b.type]) return;
      const d=document.createElement("div");
      d.className="bin";
      d.textContent=b.name;
      d.onclick=()=>chooseBin(b.type);
      binsEl.appendChild(d);
    });

    renderTrash();
    const bgMusic = document.getElementById("bgMusic");
    bgMusic.volume = 0.65;
    if(bgMusic.paused) bgMusic.play();

    fadeDiv.style.opacity='0';
    setTimeout(()=>fadeDiv.remove(), 500);
  },500);
}

// --- RENDER TRASH ---
function renderTrash(){
  const trashContainer = document.getElementById("trash");
  trashContainer.innerHTML="";
  if(currentIndex >= trashItems.length) return;
  const item = trashItems[currentIndex];
  const div = document.createElement("div");
  div.className = "trash-item";
  const img = document.createElement("img");
  img.src = item.img;
  div.appendChild(img);
  trashContainer.appendChild(div);
}

// --- CHOOSE BIN ---
function chooseBin(type){
  const item = trashItems[currentIndex];
  if(item.type === type) correct++;
  else mistakes.push({img:item.img, correct:item.type});
  history.push(currentIndex);
  currentIndex++;
  if(currentIndex >= trashItems.length) finishGame();
  else renderTrash();
}

// --- REWIND ---
function previousTrash(){
  if(history.length === 0) return;
  currentIndex = history.pop();
  renderTrash();
}

// --- FINISH ---
function finishGame(){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("result").classList.add("active");

  const percent = Math.round(correct/total*100);
  let msg = "";
  if(percent < 10) msg="Išmok rūšiuoti!";
  else if(percent < 20) msg="10% tikslumas";
  else if(percent < 30) msg="20% tikslumas";
  else if(percent < 40) msg="30% tikslumas";
  else if(percent < 50) msg="40% tikslumas";
  else if(percent < 60) msg="50% tikslumas";
  else if(percent < 70) msg="60% tikslumas";
  else if(percent < 80) msg="70% tikslumas";
  else if(percent < 90) msg="80% tikslumas";
  else if(percent < 100) msg="90% tikslumas";
  else msg="Puiku! 100% 🎉";

  document.getElementById("score").textContent=`Teisingai: ${correct} / ${total} (${msg})`;

  const mistakesDiv = document.getElementById("mistakes");
  mistakesDiv.innerHTML="";
  mistakes.forEach(m=>{
    const p = document.createElement("p");
    p.innerHTML=`<img src="${m.img}" style="width:50px;"> Tinkamai turėjo būti: <b>${m.correct}</b> (${explanations[m.correct]})`;
    mistakesDiv.appendChild(p);
  });

  startConfetti();
}

// --- RESET ---
function resetGame(){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("start-screen").classList.add("active");

  const bgMusic = document.getElementById("bgMusic");
  bgMusic.pause();
  bgMusic.currentTime = 0;

  trashItems = [];
  currentIndex = 0;
  correct = 0;
  total = 0;
  history = [];
  mistakes = [];
}

// --- CONFETTI WITH FADE OUT ---
function startConfetti(){
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const confetti = [];
  for(let i=0;i<150;i++){
    confetti.push({
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height- canvas.height,
      r:Math.random()*6+2,
      d:Math.random()*50+10,
      color:`hsl(${Math.random()*360},100%,50%)`,
      tilt:Math.random()*10-10
    });
  }
  let angle=0;
  let alpha = 1;
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.globalAlpha = alpha;
    confetti.forEach(f=>{
      ctx.beginPath();
      ctx.lineWidth=f.r;
      ctx.strokeStyle=f.color;
      ctx.moveTo(f.x+f.tilt+f.r/2,f.y);
      ctx.lineTo(f.x+f.tilt,f.y+f.tilt+f.r/2);
      ctx.stroke();
      f.y += (Math.cos(angle+f.d)+1+f.r/2)/2;
      f.x += Math.sin(angle);
      if(f.y>canvas.height){f.y=0;f.x=Math.random()*canvas.width;}
    });
    angle += 0.01;
    requestAnimationFrame(draw);
  }
  draw();
  setTimeout(()=>{
    let fadeInterval = setInterval(()=>{
      alpha -= 0.02;
      if(alpha <= 0){
        alpha = 0;
        clearInterval(fadeInterval);
      }
    },30);
  },5000);
}




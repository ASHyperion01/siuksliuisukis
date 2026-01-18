document.addEventListener("DOMContentLoaded", () => {
  let selectedItem = null;
  let correct = 0;
  let total = 0;
  let mistakes = [];

  // Logiškai teisingos šiukšlės
  const trashPool = {
    plastic:["🛍️","🧴","🥡","🧋"],
    paper:["📄","📦","📰"],
    organic:["🍌","🍎","🥕","🥬","🍉","🥑","🥔"],
    metal:["🥫","🪙","🔩"],
    glass:["🍾","🥛","🥂","🥃","🍼"], // pieno butelis, stiklas į stiklas
    electronics:["📱","💡","💻","🎧","📀"]
  };

  const levelConfig = {
    easy:{plastic:4,paper:3,organic:4,metal:2},
    medium:{plastic:5,paper:4,organic:5,metal:3,glass:3},
    hard:{plastic:6,paper:5,organic:6,metal:4,glass:4,electronics:4}
  };

  const bins = [
    {name:"Plastikas",type:"plastic"},
    {name:"Popierius",type:"paper"},
    {name:"Organinės",type:"organic"},
    {name:"Metalas",type:"metal"},
    {name:"Stiklas",type:"glass"},
    {name:"Elektronika",type:"electronics"}
  ];

  function shuffle(array){ return array.sort(()=>Math.random()-0.5); }

  function generateLevel(level){
    let items=[];
    for(let type in levelConfig[level]){
      const count=levelConfig[level][type];
      const shuffled=shuffle([...trashPool[type]]);
      shuffled.slice(0,count).forEach(icon=>{ items.push({icon,type}); });
    }
    return shuffle(items);
  }

  window.startGame = function(level){
    document.getElementById("start-screen").classList.remove("active");
    document.getElementById("game").classList.add("active");
    document.getElementById("result").classList.remove("active");

    document.getElementById("level-title").textContent = `Lygis: ${level.charAt(0).toUpperCase()+level.slice(1)}`;

    const trashArea = document.getElementById("trash");
    const binsArea = document.getElementById("bins");
    trashArea.innerHTML = "";
    binsArea.innerHTML = "";
    correct = 0;
    total = 0;
    mistakes = [];
    selectedItem = null;

    const trashItems = generateLevel(level);
    total = trashItems.length;

    trashItems.forEach(item=>{
      const div = document.createElement("div");
      div.className = "trash-item drop";
      div.textContent = item.icon;
      div.dataset.type = item.type;
      div.onclick = () => {
        if(selectedItem) selectedItem.classList.remove("selected");
        selectedItem = div;
        div.classList.add("selected");
      };
      trashArea.appendChild(div);
    });

    bins.forEach(bin=>{
      const div = document.createElement("div");
      div.className = "bin";
      div.textContent = bin.name;
      div.onclick = () => {
        if(!selectedItem) return;

        // animacija: move į bin
        selectedItem.style.transition = "transform 0.3s ease, opacity 0.3s ease";
        const rectBin = div.getBoundingClientRect();
        const rectTrash = selectedItem.getBoundingClientRect();
        const dx = rectBin.left - rectTrash.left;
        const dy = rectBin.top - rectTrash.top;
        selectedItem.style.transform = `translate(${dx}px, ${dy}px) scale(0.3)`;
        selectedItem.style.opacity = "0";
        setTimeout(()=>selectedItem.remove(), 300);

        if(selectedItem.dataset.type === bin.type){
          correct++;
        } else {
          mistakes.push(`${selectedItem.textContent} neteisingai įdėta į "${bin.name}"`);
          div.classList.add("error");
          setTimeout(()=>div.classList.remove("error"),400);
        }
        selectedItem = null;
      };
      binsArea.appendChild(div);
    });
  }

  window.finishGame = function(){
    document.getElementById("game").classList.remove("active");
    document.getElementById("result").classList.add("active");

    let feedbackText = `Teisingai: ${correct} iš ${total} šiukšlių.\n`;
    feedbackText += mistakes.length > 0 ? "Klaidos:\n" + mistakes.join("\n") : "Puikiai! Nėra klaidų!";
    document.getElementById("score").textContent = feedbackText;
  }

  window.resetGame = function(){
    document.getElementById("result").classList.remove("active");
    document.getElementById("start-screen").classList.add("active");

    document.getElementById("trash").innerHTML = "";
    document.getElementById("bins").innerHTML = "";

    selectedItem = null;
    correct = 0;
    total = 0;
    mistakes = [];
  }
});

const levels = {
  lengvas: ['🥤', '🍎', '📄'],
  vidutinis: ['🥤', '🍎', '📄', '🥫', '🍌'],
  sunkus: ['🥤', '🍎', '📄', '🥫', '🍌', '🍋', '🍂', '🧴']
};

const bins = {
  'Plastikas': ['🥤', '🧴'],
  'Organinės': ['🍎', '🍌', '🍋', '🍂'],
  'Popierius': ['📄'],
  'Metalas': ['🥫']
};

let currentItems = [];
let correctCount = 0;

function startGame(level) {
  document.getElementById('level-select').classList.add('hidden');
  document.getElementById('game').classList.remove('hidden');
  document.getElementById('level-title').innerText = `Lygis: ${level}`;
  
  currentItems = [...levels[level]];
  correctCount = 0;

  renderItems();
  renderBins();
}

function renderItems() {
  const container = document.getElementById('items-container');
  container.innerHTML = '';
  currentItems.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('item');
    div.innerText = item;
    div.setAttribute('draggable', 'true');
    div.dataset.item = item;
    
    div.addEventListener('dragstart', e => {
      e.dataTransfer.setData('item', item);
    });

    container.appendChild(div);
  });
}

function renderBins() {
  const container = document.getElementById('bins-container');
  container.innerHTML = '';
  for (let binName in bins) {
    const div = document.createElement('div');
    div.classList.add('bin');
    div.innerText = binName;

    div.addEventListener('dragover', e => e.preventDefault());

    div.addEventListener('dragenter', () => div.classList.add('hovered'));
    div.addEventListener('dragleave', () => div.classList.remove('hovered'));

    div.addEventListener('drop', e => {
      e.preventDefault();
      div.classList.remove('hovered');
      const item = e.dataTransfer.getData('item');
      if (bins[binName].includes(item)) {
        correctCount++;
      }
      // Pašalina item iš ekrano
      const items = document.querySelectorAll('.item');
      items.forEach(el => {
        if (el.dataset.item === item) el.remove();
      });
    });

    container.appendChild(div);
  }
}

function finishGame() {
  document.getElementById('game').classList.add('hidden');
  document.getElementById('result').classList.remove('hidden');
  document.getElementById('score').innerText = `Teisingai padėjai: ${correctCount} iš ${currentItems.length}`;
}

function resetGame() {
  document.getElementById('result').classList.add('hidden');
  document.getElementById('level-select').classList.remove('hidden');
}

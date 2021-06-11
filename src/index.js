const container = document.querySelector('.container');
let spawnDivs = document.createElement('div');
let spawnQuantity = 16;

propagateGrid();

container.style.display = 'grid';

function propagateGrid() {
  for (i = 0; i < spawnQuantity; i++) {
    container.appendChild(spawnDivs);
  }
}

import './styles/reset.scss';
import './styles/main.scss';

let container = document.querySelector('.container');
let gridWidth = 1;
let gridColumnQuantity = gridWidth ** 2;
let divSpawns;
let spawnSize = 25 / gridWidth;

propagateGrid();

styleGrid();

function propagateGrid() {
  for (let i = 0; i < gridColumnQuantity; i++) {
    divSpawns = document.createElement('div');
    container.appendChild(divSpawns);
    divSpawns.style.width = `${spawnSize}vw`;
    divSpawns.style.height = `${spawnSize}vw`;
  }
}

function styleGrid() {
  container.style.display = 'grid';
  container.style.gridTemplateColumns = `repeat(${gridWidth}, 1fr)`;
}

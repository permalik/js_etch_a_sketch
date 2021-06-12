import './styles/reset.scss';
import './styles/main.scss';

const container = document.querySelector('.container');
const colorOptions = document.querySelectorAll('.color-option');
var color;

propagateGrid(10);

colorOptions.forEach((colorOption) => {
  colorOption.addEventListener('click', selectColorPen);
});

function propagateGrid(gridWidth) {
  let gridColumnQuantity = gridWidth ** 2;
  for (let i = 0; i < gridColumnQuantity; i++) {
    let divSpawns = document.createElement('div');
    let spawnSize = 25 / gridWidth;
    container.style.display = 'grid';
    container.style.gridTemplateColumns = `repeat(${gridWidth}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${gridWidth}, 1fr)`;
    container.appendChild(divSpawns);
    divSpawns.style.width = `${spawnSize}vw`;
    divSpawns.style.height = `${spawnSize}vw`;
  }

  var pixels = container.querySelectorAll('div');
  pixels.forEach((pixel) => {
    pixel.addEventListener('mouseover', toggleColor);
  });
}

function selectColorPen(e) {
  switch (e.target.dataset.color) {
    case 'rainbow':
      color = 'rainbow';
      break;
    case 'greyscale':
      color = 'greyscale';
      break;
    case 'eraser':
      color = 'eraser';
      break;
    case 'black':
      color = 'black';
      break;
  }
}

function toggleColor() {
  switch (color) {
    case 'greyscale':
      if (this.style.backgroundColor.match(/rgba/)) {
        let opacityIterator = Number(this.style.backgroundColor.slice(-4, -1));
        if (opacityIterator <= 0.9) {
          this.style.backgroundColor = `rgba(0, 0, 0, ${opacityIterator + 0.1})`;
          this.classList.add('greyscale');
        }
      } else if (this.classList == 'greyscale' && this.style.backgroundColor == 'rgb(0, 0, 0)') {
        return;
      } else {
        this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
      }
      break;
    case 'rainbow':
      this.style.backgroundColor = randomColor();
      this.classList.remove('greyscale');
      break;
    case 'eraser':
      this.style.backgroundColor = '#ffffff';
      this.classList.remove('greyscale');
      break;
    case 'black':
      this.style.backgroundColor = '#000000';
      this.classList.remove('greyscale');
      break;
  }
}

function randomColor() {
  let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

  if (randomColor.length < 7) {
    randomColor = randomColor + '0'.repeat(7 - randomColor.length);
  }
  return randomColor;
}

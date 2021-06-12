import './styles/reset.scss';
import './styles/main.scss';

const container = document.querySelector('.container');
const colorOptions = document.querySelectorAll('.color-option');
const shakeClear = document.querySelector('[data-color="shake"]');
const sizeControl = document.querySelector('.size-control');
var color;
var widthInput = 10;

window.addEventListener('load', () => {
  propagateGrid(widthInput);
});

sizeControl.addEventListener('click', () => {
  widthInput = selectWidth();
  resetGrid();
  propagateGrid(widthInput);
});

colorOptions.forEach((colorOption) => {
  colorOption.addEventListener('click', selectColorPen);
});

shakeClear.addEventListener('click', () => {
  addShakeAnimation();
  var pixels = container.querySelectorAll('div');
  setTimeout(() => {
    pixels.forEach((pixel) => {
      pixel.style.backgroundColor = '#ffffff';
    });
  }, 6);
  setTimeout(() => {
    resetShakeAnimation();
  }, 3000);
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

function addShakeAnimation() {
  container.style.animation = 'shake 1s linear';
}

function resetShakeAnimation() {
  container.style.removeProperty('animation');
}

function selectWidth() {
  do {
    var customWidth = parseInt(window.prompt('Choose grid size (from 1 to 100 inclusive):'));

    if (customWidth < 1) {
      customWidth = parseInt(window.prompt('Too small, try again...Choose grid size (from 1 to 100 inclusive):'));
    } else if (customWidth > 100) {
      customWidth = parseInt(window.prompt('Too large, try again...Choose grid size (from 1 to 100 inclusive):'));
    }
  } while (isNaN(customWidth) || customWidth < 1 || customWidth > 100);
  return customWidth;
}

function resetGrid() {
  let pixels = container.querySelectorAll('div');
  pixels.forEach((pixel) => {
    container.removeChild(pixel);
  });
}

import { debounce } from './utils.js';
const controls = document.querySelector('.img-upload__scale');
const scaleValueInput = document.querySelector('.scale__control--value');
const pictureContainer = document.querySelector('.img-upload__preview');

const Scale = {
  MAX: 100,
  MIN: 25,
  STEP: 25,
};

let scaleValue = Scale.MAX;
scaleValueInput.value = `${scaleValue}%`;

const resizePicture = (val) => {
  pictureContainer.style.transform = `scale(${val}%)`;
};

const setResize = (increment) => {
  scaleValue = parseInt(scaleValueInput.value, 10) + (Scale.STEP * increment);

  if (scaleValue < Scale.MIN || scaleValue > Scale.MAX) {
    return;
  }

  scaleValueInput.value = `${scaleValue}%`;
  resizePicture(scaleValue);
};

const controlButtonsClickHandler = debounce((evt) => {
  if(evt.target.classList.contains('scale__control--smaller')) {
    setResize(-1);
  } else if (evt.target.classList.contains('scale__control--bigger')) {
    setResize(1);
  }
});

controls.addEventListener('click', controlButtonsClickHandler);

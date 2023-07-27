const controlSmaller = document.querySelector('.scale__control--smaller');
const controlBigger = document.querySelector('.scale__control--bigger');
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

const scaleDecrement = () => {
  if (scaleValue > Scale.MIN) {
    scaleValue -= Scale.STEP;
    scaleValueInput.value = `${scaleValue}%`;
    resizePicture(scaleValue);
  }
};

const scaleIncrement = () => {
  if (scaleValue < Scale.MAX) {
    scaleValue += Scale.STEP;
    scaleValueInput.value = `${scaleValue}%`;
    resizePicture(scaleValue);
  }
};

controlSmaller.addEventListener('click', scaleDecrement);
controlBigger.addEventListener('click', scaleIncrement);

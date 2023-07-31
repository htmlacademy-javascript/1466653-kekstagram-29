import { Effects } from './picture-effects-settings.js';

const picture = document.querySelector('.img-upload__preview img');
const effectsContainer = document.querySelector('.effects');
const sliderContainer = document.querySelector('.effect-level');
const slider = sliderContainer.querySelector('.effect-level__slider');
const sliderInput = sliderContainer.querySelector('.effect-level__value');

let selectedEffect = Effects.none;
let selectedEffectValue = Effects.none.min;
const getEffectTitle = () => `${selectedEffect.filter}(${selectedEffectValue}${selectedEffect.unit ?? ''})`;

const effectChangeHandler = (evt) => {
  selectedEffect = Effects[evt.target.value];
  sliderContainer.classList.remove('hidden');
  picture.style.filter = `${getEffectTitle()}`;
  sliderInput.value = selectedEffectValue;

  if(evt.target.value === 'none') {
    sliderContainer.classList.add('hidden');
    picture.style.filter = Effects.none.filter;
    selectedEffectValue = selectedEffect.min;
  }

  slider.noUiSlider.updateOptions({
    range: {
      min: selectedEffect.min,
      max: selectedEffect.max,
    },
    start: selectedEffect.max,
    step: selectedEffect.step,
  });
};

const updateSliderHandler = () => {
  selectedEffectValue = slider.noUiSlider.get();
  picture.style.filter = `${getEffectTitle()}`;
  sliderInput.value = selectedEffectValue;
};

const createSlider = () => {
  noUiSlider.create(slider, {
    range: {
      min: selectedEffect.min,
      max: selectedEffect.max,
    },
    start: selectedEffect.min,
    step: selectedEffect.step,
    connect: 'lower',
  });

  sliderContainer.classList.add('hidden');
  effectsContainer.addEventListener('change', effectChangeHandler);
  slider.noUiSlider.on('update', updateSliderHandler);
};

const removeSlider = () => {
  slider.noUiSlider.destroy();
  effectsContainer.removeEventListener('change', effectChangeHandler);
};

export {createSlider, removeSlider};

import { Effects } from './picture-effects-settings.js';

const picture = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.effect-level');
const effectsContainer = document.querySelector('.effects');
const effectsSlider = document.querySelector('.effect-level__slider');
const effectInput = document.querySelector('.effect-level__value');

let selectedEffect = Effects.none;
let selectedEffectValue = Effects.none.min;
const getEffectTitle = () => `${selectedEffect.filter}(${selectedEffectValue}${selectedEffect.unit ?? ''})`;

noUiSlider.create(effectsSlider, {
  range: {
    min: selectedEffect.min,
    max: selectedEffect.max,
  },
  start: selectedEffect.min,
  step: selectedEffect.step,
  connect: 'lower',
});

const effectChangeHandler = (evt) => {
  selectedEffect = Effects[evt.target.value];
  sliderContainer.classList.remove('hidden');
  selectedEffectValue = selectedEffect.min;
  picture.style.filter = `${getEffectTitle()}`;
  effectInput.value = selectedEffectValue;

  if(evt.target.value === 'none') {
    sliderContainer.classList.add('hidden');
    picture.style.filter = Effects.none.filter;
  }

  effectsSlider.noUiSlider.updateOptions({
    range: {
      min: selectedEffect.min,
      max: selectedEffect.max,
    },
    start: selectedEffect.min,
    step: selectedEffect.step,
  });
};

const updateSliderHandler = () => {
  selectedEffectValue = effectsSlider.noUiSlider.get();
  picture.style.filter = `${getEffectTitle()}`;
  effectInput.value = selectedEffectValue;
};

effectsContainer.addEventListener('change', effectChangeHandler);
effectsSlider.noUiSlider.on('update', updateSliderHandler);

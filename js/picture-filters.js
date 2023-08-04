import { shuffleArray, isButton } from './utils.js';

const RANDOM_PICTURES_COUNT = 10;
const BUTTON_ACTIVE_CLASS = 'img-filters__button--active';
const filtersForm = document.querySelector('.img-filters__form');

const filters = {
  'filter-default': (pictures) => pictures.slice(),
  'filter-discussed': (pictures) => pictures.slice().sort((a, b) => (b.comments.length - a.comments.length)),
  'filter-random': (pictures) => shuffleArray(pictures.slice()).slice(0, RANDOM_PICTURES_COUNT),
};

const setActiveFilter = (evt) => {
  if(isButton) {
    const selectedButton = filtersForm.querySelector(`.${BUTTON_ACTIVE_CLASS}`);

    if (selectedButton) {
      selectedButton.classList.remove(BUTTON_ACTIVE_CLASS);
    }

    evt.target.classList.add(BUTTON_ACTIVE_CLASS);
  }
};

export { filters, setActiveFilter };

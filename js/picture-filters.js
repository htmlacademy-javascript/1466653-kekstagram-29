import { renderPictures, removePictures } from './picture-thumbnails.js';
import { shuffleArray, isButton, debounce } from './utils.js';
import { pictures } from './main.js';

const filtersForm = document.querySelector('.img-filters__form');

const RANDOM_PICTURES_COUNT = 10;
const BUTTON_ACTIVE_CLASS = 'img-filters__button--active';

const filters = {
  'filter-default': () => pictures.slice(),
  'filter-discussed': () => pictures.slice().sort((a, b) => (b.comments.length - a.comments.length)),
  'filter-random': () => shuffleArray(pictures.slice()).slice(0, RANDOM_PICTURES_COUNT),
};

const setFilterActive = (evt) => {
  if(isButton) {
    const selectedButton = filtersForm.querySelector(`.${BUTTON_ACTIVE_CLASS}`);

    if (selectedButton) {
      selectedButton.classList.remove(BUTTON_ACTIVE_CLASS);
    }

    evt.target.classList.add(BUTTON_ACTIVE_CLASS);
  }
};

const filterFormClickHandler = debounce((evt) => {
  if(isButton) {
    removePictures();
    renderPictures(filters[evt.target.id]());
  }
});

filtersForm.addEventListener('click', setFilterActive);
filtersForm.addEventListener('click', filterFormClickHandler);

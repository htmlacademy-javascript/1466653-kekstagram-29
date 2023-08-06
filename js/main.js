import './upload-form.js';
import './picture-resize.js';
import './effects-slider.js';
import './picture-preview.js';
import { shuffleArray, debounce } from './utils.js';
import { requestPhotos } from './fetch.js';
import { renderPictures, removePictures } from './picture-thumbnails.js';

const RANDOM_PICTURES_COUNT = 10;

const filtersForm = document.querySelector('.img-filters__form');
let pictures = [];

const filters = {
  'filter-default': () => pictures.slice(),
  'filter-discussed': () => pictures.slice().sort((a, b) => (b.comments.length - a.comments.length)),
  'filter-random': () => shuffleArray(pictures.slice()).slice(0, RANDOM_PICTURES_COUNT),
};

const showServerError = () => {
  const template = document.querySelector('#server-error').content.cloneNode(true);
  document.body.append(template);
};

const loadPictures = (data) => {
  pictures = data.slice();
  renderPictures(pictures);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

const renderFilteredPictures = (evt) => {
  removePictures();
  renderPictures(filters[evt.target.id]());
};

const filterFormClickHandler = debounce((evt) => {
  renderFilteredPictures(evt);
});

filtersForm.addEventListener('click', filterFormClickHandler);

requestPhotos(loadPictures, showServerError);

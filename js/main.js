import './upload-form.js';
import './picture-resize.js';
import './effects-slider.js';
import './picture-preview.js';
import { requestPhotos } from './fetch.js';
import { renderPictures } from './picture-thumbnails.js';
import { sortPicturesByComments, filterRandomPictures } from './picture-filters.js';

// const pictureInput = document.querySelector('.img-upload__input');const pictureChoseInput = document.querySelector('.img-upload__input');
const filters = document.querySelector('.img-filters');
const filterDefault = filters.querySelector('#filter-default');
const filterRandom = filters.querySelector('#filter-random');
const filterDiscussed = filters.querySelector('#filter-discussed');

let pictures = [];

const loadPictures = (data) => {
  pictures = data.slice();
  renderPictures(pictures);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

const showServerError = () => {
  const template = document.querySelector('#server-error').content.cloneNode(true);
  document.body.append(template);
};

const setFiltersInactive = () => {
  filters.querySelectorAll('button').forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });
};

const filterDefaultClickHandler = () => {
  setFiltersInactive();
  filterDefault.classList.add('img-filters__button--active');
  renderPictures(pictures);
};

const filterRandomClickHandler = () => {
  setFiltersInactive();
  filterRandom.classList.add('img-filters__button--active');
  filterRandomPictures(pictures);
};

const filterDiscussedClickHandler = () => {
  setFiltersInactive();
  filterDiscussed.classList.add('img-filters__button--active');
  sortPicturesByComments(pictures);
};

filterDefault.addEventListener('click', filterDefaultClickHandler);
filterRandom.addEventListener('click', filterRandomClickHandler);
filterDiscussed.addEventListener('click', filterDiscussedClickHandler);

requestPhotos(loadPictures, showServerError);

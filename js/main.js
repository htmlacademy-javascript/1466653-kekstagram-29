import './upload-form.js';
import './picture-resize.js';
import './effects-slider.js';
import './picture-preview.js';
import { filters, setActiveFilter } from './picture-filters.js';
import { isButton, debounce } from './utils.js';
import { requestPhotos } from './fetch.js';
import { renderPictures, removePictures } from './picture-thumbnails.js';

const filtersForm = document.querySelector('.img-filters__form');
let pictures = [];

const showServerError = () => {
  const template = document.querySelector('#server-error').content.cloneNode(true);
  document.body.append(template);
};

const loadPictures = (data) => {
  pictures = data.slice();
  renderPictures(pictures);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

const filterFormClickHandler = debounce((evt) => {
  if(isButton) {
    removePictures();
    renderPictures(filters[evt.target.id](pictures));
  }
});

filtersForm.addEventListener('click', setActiveFilter);
filtersForm.addEventListener('click', filterFormClickHandler);

requestPhotos(loadPictures, showServerError);

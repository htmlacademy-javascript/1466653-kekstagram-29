import './upload-form.js';
import './picture-resize.js';
import './effects-slider.js';
import './picture-preview.js';
import './picture-filters.js';
import { requestPhotos } from './fetch.js';
import { renderPictures } from './picture-thumbnails.js';

export let pictures = [];

const loadPictures = (data) => {
  pictures = data.slice();
  renderPictures(pictures);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

const showServerError = () => {
  const template = document.querySelector('#server-error').content.cloneNode(true);
  document.body.append(template);
};

requestPhotos(loadPictures, showServerError);

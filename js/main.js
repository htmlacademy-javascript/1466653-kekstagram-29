import { renderPictures } from './picture-previews.js';
import './upload-form.js';
import './picture-resize.js';
import './effects-slider.js';
import {requestPhotos} from './fetch.js';

let pictures = [];

const loadPictures = (data) => {
  pictures = data.slice();
  renderPictures(pictures);
};

const showServerError = () => {
  const template = document.querySelector('#server-error').content.cloneNode(true);

  document.body.append(template);
};

requestPhotos(loadPictures, showServerError);

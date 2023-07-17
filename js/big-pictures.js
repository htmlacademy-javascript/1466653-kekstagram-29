import { renderComments } from './comments.js';
import { isEscapeKey } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('img');
const commentsContainer = bigPicture.querySelector('.social__comments');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const pictureDescription = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('#picture-cancel');

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // document.removeEventListener('keydown', escapeKeydownHandler);
};

const escapeKeydownHandler = (evt) => {
  if(isEscapeKey(evt)) {
    closeBigPicture();
  }
};

const closeButtonClickHandler = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

const renderBigPicture = (image) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureImage.src = image.url;
  likesCount.textContent = image.likes;
  commentsCount.textContent = image.comments.length;
  pictureDescription.textContent = image.description;

  renderComments(image.comments, commentsContainer);

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  document.addEventListener('keydown', escapeKeydownHandler);
  closeButton.addEventListener('click', closeButtonClickHandler);
};

export { renderBigPicture, closeButtonClickHandler };

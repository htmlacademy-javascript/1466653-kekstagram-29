import { renderComments } from './comments.js';
import { isEscapeKey } from './utils.js';

const COMMENT_COUNT_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const commentsContainer = bigPicture.querySelector('.social__comments');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const pictureDescription = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('#picture-cancel');
const loadButton = bigPicture.querySelector('.comments-loader');

const documentEscapeKeydownHandler = (evt) => {
  if(isEscapeKey(evt)) {
    closeBigPicture();
  }
};

const closeButtonClickHandler = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', documentEscapeKeydownHandler);
}

const renderBigPicture = (image) => {
  const currentComments = image.comments.slice();
  let commentsCounter = COMMENT_COUNT_STEP;

  bigPicture.querySelector('img').src = image.url;
  likesCount.textContent = image.likes;
  commentsCount.textContent = image.comments.length;
  pictureDescription.textContent = image.description;

  renderComments(currentComments, commentsCounter, commentsContainer);

  const loadCommentsClickHandler = () => {
    commentsCounter += COMMENT_COUNT_STEP;
    renderComments(currentComments, commentsCounter, commentsContainer);
  };

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', documentEscapeKeydownHandler);
  closeButton.addEventListener('click', closeButtonClickHandler);
  loadButton.addEventListener('click', loadCommentsClickHandler);
};

export { renderBigPicture, closeButtonClickHandler };

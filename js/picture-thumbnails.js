import { renderBigPicture } from './big-pictures.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPicture = (imageContent, container) => {
  container.querySelector('.picture__likes').textContent = imageContent.likes;
  container.querySelector('.picture__comments').textContent = imageContent.comments.length;
  const pictureImg = container.querySelector('.picture__img');
  pictureImg.src = imageContent.url;
  pictureImg.alt = imageContent.description;

  const pictureClickHandler = (evt) => {
    evt.preventDefault(evt);
    renderBigPicture(imageContent);
  };

  container.addEventListener('click', pictureClickHandler);
};

const renderPictures = (images) => {
  const pictureListFragment = document.createDocumentFragment();

  images.forEach((image) => {
    const picture = pictureTemplate.cloneNode(true);

    renderPicture(image, picture);
    pictureListFragment.append(picture);
  });

  picturesContainer.append(pictureListFragment);
};

const removePictures = () => {
  const picturesList = picturesContainer.getElementsByClassName('picture');
  [...picturesList].forEach((picture) => picture.remove());
};

export {renderPictures, removePictures};

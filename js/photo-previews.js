import { images } from './data.js';

const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureListFragment = document.createDocumentFragment();

images.forEach((image) => {
  const picture = pictureTemplate.cloneNode(true);
  const pictureImg = picture.querySelector('.picture__img');
  const likes = picture.querySelector('.picture__likes');
  const comments = picture.querySelector('.picture__comments');

  pictureImg.src = image.url;
  pictureImg.alt = image.description;
  likes.textContent = image.likes;
  comments.textContent = image.comments.length;

  pictureListFragment.append(picture);
});

pictureContainer.append(pictureListFragment);

const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPicture = (imageContent, container) => {
  const pictureImg = container.querySelector('.picture__img');
  pictureImg.src = imageContent.url;
  pictureImg.alt = imageContent.description;
  container.querySelector('.picture__likes').textContent = imageContent.likes;
  container.querySelector('.picture__comments').textContent = imageContent.comments.length;
};

const renderPictures = (images) => {
  const pictureListFragment = document.createDocumentFragment();

  images.forEach((image) => {
    const picture = pictureTemplate.cloneNode(true);

    renderPicture(image, picture);
    pictureListFragment.append(picture);
  });

  pictureContainer.append(pictureListFragment);
};

export {renderPictures};

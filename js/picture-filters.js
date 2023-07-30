import { renderPictures } from './picture-thumbnails.js';
import { getRandomInteger } from './utils.js';

const RANDOM_PICTURES_COUNT = 10;

const sortPicturesByComments = (images) => {
  const sortedPictures = images.slice();

  sortedPictures.sort((a, b) => {
    if (a.comments.length > b.comments.length) {
      return 1;
    }

    if (a.comments.length < b.comments.length) {
      return -1;
    }

    return 0;
  });

  renderPictures(sortedPictures);
};

const filterRandomPictures = (images) => {
  console.log("консоль", images);

  const randomPictures = [];
  // const randomIndices = [];

  while (randomPictures.length <= RANDOM_PICTURES_COUNT) {
    const randomIndex = getRandomInteger(0, images.length);

    // if (randomIndices.includes(randomIndex)) {
    //   continue;
    // }

    // randomIndices.push(randomIndex);
    randomPictures.push(images[randomIndex]);
  }
  console.log("консоль random", randomPictures);

  renderPictures(randomPictures);
};

export { sortPicturesByComments, filterRandomPictures };

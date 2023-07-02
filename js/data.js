import { getRandomInteger, getRandomArrayElement } from './utils.js';

const imagesLength = 25;
const commentsMaxLength = 30;

const commentTexts = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = [
  'Иван Сергеевич',
  'Варвара Петровна',
  'Джонни Ли',
  'Мария Магдалена',
  'Владимир Владимирович',
  'Михайл Владимирович'
];

const imageDescriptions = [
  'Кекс с печенькой',
  'Кекс за работой',
  'Кекс на отдыхе',
  'Кекс и Барсик',
  'Барсучья жизнь',
  'Кексоводство. Руководство к использованию',
];

const createRandomComment = () => ({
  id: getRandomInteger(1, 100),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(commentTexts),
  name: getRandomArrayElement(names),
});

const getRandomComments = (maxLength) => {
  const randomCommentsNumber = getRandomInteger(1, maxLength);

  return Array.from({length: randomCommentsNumber}, createRandomComment);
};

const createRandomImage = () => ({
  id: getRandomInteger(1, imagesLength),
  url: `photos/${getRandomInteger(1, imagesLength)}.jpg`,
  description: getRandomArrayElement(imageDescriptions),
  likes: getRandomInteger(5, 200),
  comments: getRandomComments(commentsMaxLength),
});

export { createRandomImage };

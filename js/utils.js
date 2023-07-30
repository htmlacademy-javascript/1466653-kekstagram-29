const DEFAULT_TIMEOUT_DELAY = 500;

const isEscapeKey = (evt) => evt.key === 'Escape';
const isButton = (evt) => evt.tagName === 'BUTTON';

const shuffleArray = (array) => {
  const newArray = array.slice();

  for (let i = newArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[randomIndex]] = [newArray[randomIndex], newArray[i]];
  }
  return newArray;
};

const debounce = (callback, timeoutDelay = DEFAULT_TIMEOUT_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, isButton, shuffleArray, debounce};

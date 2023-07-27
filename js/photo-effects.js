const Effects = {
  original: {
    filter: 'none', //(0..1),
    step: 0,
    min: 0,
    max: 1,
  },
  sepia: {
    filter: 'sepia', //(0..1),
    step: .1,
    min: 0,
    max: 1,
  },
  chrome: {
    filter: 'grayscale', //(0..1),
    step: .1,
    min: 0,
    max: 1,
  },
  marvin: {
    filter: 'invert', //(0..100%),
    step: 1, //1%
    min: 0,
    max: 100,
  },
  phobos: {
    filter: 'blur', //(0..3px),
    step: .1,//0.1px
    min: 0,
    max: 3,
  },
  heat: {
    filter: 'brightness', //(0..1),
    step: .1,
    min: 0,
    max: 1,
  },
};

export { Effects };

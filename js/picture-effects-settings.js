const Effects = {
  none: {
    filter: 'none',
    step: 0.1,
    min: 0,
    max: 1,
  },
  sepia: {
    filter: 'sepia',
    step: .1,
    min: 0,
    max: 1,
  },
  chrome: {
    filter: 'grayscale',
    step: .1,
    min: 0,
    max: 1,
  },
  marvin: {
    filter: 'invert',
    step: 1,
    min: 0,
    max: 100,
    unit: '%',
  },
  phobos: {
    filter: 'blur',
    step: .1,
    min: 0,
    max: 3,
    unit: 'px',
  },
  heat: {
    filter: 'brightness',
    step: .1,
    min: 1,
    max: 3,
  },
};

export { Effects };

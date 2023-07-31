const HashtagValid = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 20,
  MAX_NUMBER: 5,
  REGEX: /^#\w{1,19}$/,
};
const DESCRIPTION_MAX_LENGTH = 140;

const ErrorMessage = {
  START_SYMBOL: 'Хештег должен начинаться с символа #',
  MINLENGTH: `Минимальная длина хештега - от ${HashtagValid.MIN_LENGTH} символов (включая #)`,
  MAXLENGTH: `Максимальная длина хештега - ${HashtagValid.MAX_LENGTH} символов (включая #)`,
  MAX_NUMBER: `Введите не более ${HashtagValid.MAX_NUMBER} хештегов`,
  SYMBOLS_INCLUDED: 'Хештег должен содержать только символ # буквы и цифры',
  REPEAT: 'Хештеги не должны повторяться',
  DESCRIPTION_MAXLENGTH: `не больше ${DESCRIPTION_MAX_LENGTH} символов`,
};

let errorAlert = '';

const getErrorMessage = () => errorAlert;

const validateDescription = (value) => {
  if (value.length > DESCRIPTION_MAX_LENGTH) {
    errorAlert = ErrorMessage.DESCRIPTION_MAXLENGTH;
    return false;
  }
  return true ;
};

const validateHashtag = (value) => {
  const hashtags = value.trim().toLowerCase();

  if (!hashtags) {
    return true;
  }

  const hashtagsArray = hashtags.split(/\s+/);

  const rules = [
    {
      notValid: hashtagsArray.some((hashtag) => hashtag[0] !== '#'),
      errorMessage: ErrorMessage.START_SYMBOL,
    },
    {
      notValid: hashtagsArray.some((hashtag) => hashtag.length < HashtagValid.MIN_LENGTH),
      errorMessage: ErrorMessage.MINLENGTH,
    },
    {
      notValid: hashtagsArray.some((hashtag) => hashtag.length >= HashtagValid.MAX_LENGTH),
      errorMessage: ErrorMessage.MAXLENGTH,
    },
    {
      notValid: hashtagsArray.some((hashtag, _, array) => array.indexOf(hashtag) !== array.lastIndexOf(hashtag)),
      errorMessage: ErrorMessage.REPEAT,
    },
    {
      notValid: hashtagsArray.length > HashtagValid.MAX_NUMBER,
      errorMessage: ErrorMessage.MAX_NUMBER,
    },
    {
      notValid: hashtagsArray.some((hashtag) => !HashtagValid.REGEX.test(hashtag)),
      errorMessage: ErrorMessage.SYMBOLS_INCLUDED,
    }
  ];

  return rules.every((rule) => {
    const isNotValid = rule.notValid;

    if(isNotValid) {
      errorAlert = rule.errorMessage;
    }

    return !isNotValid;
  });
};

export { validateHashtag, validateDescription, getErrorMessage };

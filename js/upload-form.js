import { isEscapeKey } from './utils.js';
import { uploadPhoto } from './fetch.js';
// import { pictureChoseInputHandler } from './picture-preview.js';

const form = document.querySelector('.img-upload__form');
const hashtagsInput = form.querySelector('.text__hashtags');
const uploadButton = form.querySelector('.img-upload__submit');
const loadPopup = form.querySelector('.img-upload__overlay');
const uploadInput = form.querySelector('.img-upload__input');
const closeButton = form.querySelector('.img-upload__cancel');
const commentFieldset = form.querySelector('.img-upload__text');
// const pictureChoseInput = document.querySelector('.img-upload__input');

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

const pristine = new Pristine(form, {
  classTo: 'input-validate',
  errorTextParent: 'input-validate',
  errorTextTag: 'small',
  errorTextClass: 'error-message'
});

pristine.addValidator(hashtagsInput, validateHashtag, getErrorMessage, 2, false);

const hashtagInputHandler = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    uploadButton.disabled = false;
    uploadButton.classList.remove('img-upload__submit--disabled');
  } else {
    uploadButton.disabled = true;
    uploadButton.classList.add('img-upload__submit--disabled');
  }
};

const openFormPopup = () => {
  loadPopup.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', documentEscapeKeydownHandler);
};

const closeFormPopup = () => {
  form.reset();
  pristine.reset();
  loadPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', documentEscapeKeydownHandler);
};

const keydownStopPropagationHadler = (evt) => {
  if(isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

function documentEscapeKeydownHandler (evt) {
  if(isEscapeKey(evt)) {
    closeFormPopup();
  }
}

const closeResultPopup = () => {
  const popup = document.querySelector('.success') || document.querySelector('.error');
  document.removeEventListener('keydown', documentEscapeKeydownHandler);
  popup.remove();
};

const showUploadResultPopup = (popup) => {
  popup.querySelector('button').addEventListener('click', closeResultPopup);
  document.addEventListener('keydown', documentEscapeKeydownHandler);
  document.body.append(popup);
};

const showUploadSuccessPopup = () => {
  const popup = document.querySelector('#success').content.cloneNode(true);
  closeFormPopup();
  showUploadResultPopup(popup);
};

const showUploadErrorPopup = () => {
  const popup = document.querySelector('#error').content.cloneNode(true);
  showUploadResultPopup(popup);
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  uploadPhoto(showUploadSuccessPopup, showUploadErrorPopup, new FormData(form));
};

commentFieldset.addEventListener('keydown', keydownStopPropagationHadler);
uploadInput.addEventListener('change', openFormPopup);
closeButton.addEventListener('click', closeFormPopup);
hashtagsInput.addEventListener('input', hashtagInputHandler);
form.addEventListener('submit', formSubmitHandler);

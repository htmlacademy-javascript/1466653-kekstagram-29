import { isEscapeKey } from './utils.js';
import { uploadPhoto } from './fetch.js';
import { validateHashtag, getErrorMessage } from './validate-hashtag.js';

const form = document.querySelector('.img-upload__form');
const hashtagsInput = form.querySelector('.text__hashtags');
const uploadButton = form.querySelector('.img-upload__submit');
const loadPopup = form.querySelector('.img-upload__overlay');
const uploadInput = form.querySelector('.img-upload__input');
const closeButton = form.querySelector('.img-upload__cancel');
const commentFieldset = form.querySelector('.img-upload__text');

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

import { isEscapeKey } from './utils.js';
import { uploadPhoto } from './fetch.js';
import { resizePicture, Scale } from './picture-resize.js';
import { createSlider, removeSlider } from './effects-slider.js';
import { validateHashtag, validateDescription, getErrorMessage } from './validate-hashtag.js';

const form = document.querySelector('.img-upload__form');
const hashtagsInput = form.querySelector('.text__hashtags');
const uploadButton = form.querySelector('.img-upload__submit');
const loadPopup = form.querySelector('.img-upload__overlay');
const uploadInput = form.querySelector('.img-upload__input');
const closeButton = form.querySelector('.img-upload__cancel');
const commentFieldset = form.querySelector('.img-upload__text');
const descriptionInput = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'input-validate',
  errorTextParent: 'input-validate',
  errorTextTag: 'small',
  errorTextClass: 'error-message'
});

pristine.addValidator(hashtagsInput, validateHashtag, getErrorMessage, 2, false);
pristine.addValidator(descriptionInput, validateDescription, getErrorMessage, 2, false);

const validateInputHandler = (evt) => {
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
  createSlider();
  loadPopup.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', formEscapeKeydownHandler);
};

const closeFormPopup = () => {
  form.reset();
  pristine.reset();
  removeSlider();
  loadPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resizePicture(Scale.MAX);
  document.removeEventListener('keydown', formEscapeKeydownHandler);
};

const keydownStopPropagationHadler = (evt) => {
  if(isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const closeResultPopup = () => {
  const popup = document.querySelector('.success') || document.querySelector('.error');
  document.removeEventListener('keydown', popupEscapeKeydownHandler);
  popup.remove();
};

const showUploadResultPopup = (popup) => {
  popup.querySelector('button').addEventListener('click', closeResultPopup);
  document.addEventListener('keydown', popupEscapeKeydownHandler);
  document.body.append(popup);
};

const showSuccessPopup = () => {
  const popup = document.querySelector('#success').content.cloneNode(true);
  closeFormPopup();
  showUploadResultPopup(popup);
};

const showErrorPopup = () => {
  const popup = document.querySelector('#error').content.cloneNode(true);
  showUploadResultPopup(popup);
};

function popupEscapeKeydownHandler (evt) {
  if(isEscapeKey(evt)) {
    closeResultPopup();
  }
}

function formEscapeKeydownHandler (evt) {
  if(isEscapeKey(evt)) {
    closeFormPopup();
  }
}

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  uploadPhoto(showSuccessPopup, showErrorPopup, new FormData(form));
};

commentFieldset.addEventListener('keydown', keydownStopPropagationHadler);
uploadInput.addEventListener('change', openFormPopup);
closeButton.addEventListener('click', closeFormPopup);
form.addEventListener('input', validateInputHandler);
form.addEventListener('submit', formSubmitHandler);

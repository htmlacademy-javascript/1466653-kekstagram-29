import { isEscapeKey } from './utils.js';
import { uploadPhoto } from './fetch.js';
import { resizePicture, Scale } from './picture-resize.js';
import { createSlider, removeSlider } from './effects-slider.js';
import { validateHashtag, validateDescription, getErrorMessage } from './validators.js';

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
  resizePicture(Scale.MAX);
  loadPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', formEscapeKeydownHandler);
};

const uploadFileClickHandler = () => {
  openFormPopup();
};

const closeButtonClickHandler = () => {
  closeFormPopup();
};

const keydownStopPropagationHadler = (evt) => {
  if(isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const closeResultPopup = () => {
  document.removeEventListener('keydown', popupEscapeKeydownHandler);
  document.removeEventListener('click', overlayClickHandler);
  document.querySelector('.popup').remove();
};

const popupButtonClickHandler = () => {
  closeResultPopup();
};

const showUploadResultPopup = (popup) => {
  popup.querySelector('button').addEventListener('click', popupButtonClickHandler);
  document.addEventListener('click', overlayClickHandler);
  document.addEventListener('keydown', popupEscapeKeydownHandler);
  document.body.append(popup);
};

const showSuccessPopup = () => {
  const popup = document.querySelector('#success').content.cloneNode(true);
  closeFormPopup();
  uploadButton.disabled = false;
  showUploadResultPopup(popup);
};

const showErrorPopup = () => {
  const popup = document.querySelector('#error').content.cloneNode(true);
  showUploadResultPopup(popup);
  uploadButton.disabled = false;
};

function popupEscapeKeydownHandler (evt) {
  if(isEscapeKey(evt)) {
    closeResultPopup();
  }
}

function formEscapeKeydownHandler (evt) {
  if(isEscapeKey(evt) && !document.querySelector('.popup')) {
    closeFormPopup();
  }
}

function overlayClickHandler (evt) {
  if (!evt.target.classList.contains('.popup__inner')) {
    closeResultPopup();
  }
}

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  uploadButton.disabled = true;
  uploadPhoto(showSuccessPopup, showErrorPopup, new FormData(form));
};

commentFieldset.addEventListener('keydown', keydownStopPropagationHadler);
uploadInput.addEventListener('change', uploadFileClickHandler);
closeButton.addEventListener('click', closeButtonClickHandler);
form.addEventListener('input', validateInputHandler);
form.addEventListener('submit', formSubmitHandler);

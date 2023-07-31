const PhotoRequest = {
  method: 'GET',
  link: 'https://29.javascript.pages.academy/kekstagram/data',
};

const PhotoUpload = {
  method: 'POST',
  link: 'https://29.javascript.pages.academy/kekstagram',
};

const fetchData = (link, onSuccess, onError, method = 'GET', body) => {
  fetch(link, { method: method, body: body })
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch((err) => onError(err));
};

const requestPhotos = (onSuccess, onError) => {
  fetchData(PhotoRequest.link, onSuccess, onError);
};

const uploadPhoto = (onSuccess, onError, body) => {
  fetchData(PhotoUpload.link, onSuccess, onError, PhotoUpload.method, body);
};

export {requestPhotos, uploadPhoto};

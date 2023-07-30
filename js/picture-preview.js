const pictureInput = document.querySelector('.img-upload__input');
const picturePreview = document.querySelector('.img-upload__preview-img');
const pictureThumbnailPreviews = document.querySelectorAll('.effects__preview');
const IMAGE_TYPES = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

const pictureInputChangeHandler = () => {
  const file = pictureInput.files[0];
  const fileName = file.name.toLowerCase();

  const isMatch = IMAGE_TYPES.some((item) => fileName.endsWith(item));

  if(isMatch) {
    const newUrl = URL.createObjectURL(file);
    picturePreview.src = newUrl;
    pictureThumbnailPreviews.forEach((item) => {
      item.style.backgroundImage = `url('${newUrl}')`;
    });
  }
};

pictureInput.addEventListener('change', pictureInputChangeHandler);

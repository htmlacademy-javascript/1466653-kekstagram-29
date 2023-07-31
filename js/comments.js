const loadButton = document.querySelector('.comments-loader');

const renderComments = (comments, counter, container) => {
  const fragment = document.createDocumentFragment();
  counter = (counter > comments.length) ? comments.length : counter;

  if(counter < comments.length) {
    loadButton.classList.remove('hidden');
  } else {
    loadButton.classList.add('hidden');
  }

  document.querySelector('.social__comment-count').innerHTML = `${counter} из <span class="comments-count">${comments.length}</span> комментариев`;

  const commentsSelected = comments.slice(0, counter);

  commentsSelected.forEach((comment) => {
    const newComment = document.querySelector('.social__comment').cloneNode(true);
    const avatar = newComment.querySelector('.social__picture');
    newComment.querySelector('.social__text').textContent = comment.message;
    avatar.src = comment.avatar;
    avatar.alt = comment.name;
    fragment.append(newComment);
  });

  container.innerHTML = '';
  container.append(fragment);
};

export { renderComments };

const renderComments = (comments, container) => {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const newComment = document.querySelector('.social__comment').cloneNode(true);
    const avatar = newComment.querySelector('.social__picture') ;
    newComment.querySelector('.social__text').textContent = comment.message;
    avatar.src = comment.avatar;
    avatar.alt = comment.name;
    fragment.append(newComment);
  });

  container.innerHTML = '';
  container.append(fragment);
};

export { renderComments };

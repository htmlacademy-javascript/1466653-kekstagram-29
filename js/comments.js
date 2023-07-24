const loadButton = document.querySelector('.comments-loader');

const renderComments = (comments, counter, container) => {
  const fragment = document.createDocumentFragment(); // коробочка для комментов
  // console.log("Counter: ", counter);
  counter = (counter > comments.length) ? comments.length : counter; // что больше - шаг или все комментарии?

  if(counter < comments.length) { // комментариев больше чем шаг загрузки
    loadButton.classList.remove('hidden'); // да, показываем кнопку для подгрузки
  } else {
    loadButton.classList.add('hidden'); // нет, скрываем кнопку за ненадобностью
  }

  document.querySelector('.social__comment-count').textContent = `
    ${counter} из ${comments.length} комментариев
  `;

  const commentsSelected = comments.slice(0, counter);

  commentsSelected.forEach((comment) => {
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

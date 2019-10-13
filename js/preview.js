'use strict';
(function () {
  var bigPicture = document.querySelector('.big-picture');

  var bigPictureImgCancel = document.querySelector('.big-picture__cancel');

  var openBigImageTab = function (elem) {
    var targetPicture = elem.querySelector('.picture__img').src.substring(22);
    for (var i = 0; i < window.pictures.length; i++) {
      if (targetPicture === window.pictures[i].url) {
        bigPicture.classList.remove('hidden');
        document.querySelector('.likes-count').textContent = window.pictures[i].likes;
        bigPicture.querySelector('img').src = window.pictures[i].url;
        document.querySelector('.comments-count').textContent = window.pictures[i].comments.length;
        for (var r = 0; r < window.pictures[i].comments.length; r++) {
          var comment = bigPicture.querySelector('.social__comment');
          comment.textContent = window.pictures[i].comments[r].message;
          bigPicture.querySelector('.social__comments').appendChild(comment);
        }
        bigPicture.querySelector('.social__caption').textContent = window.pictures[i].description;
      }
    }
  };


  var onopenBigImage = function (evt) {
    if (evt.target.classList[0] === 'picture' || evt.target.classList[0] === 'picture__img') {
      if (evt.target.classList[0] === 'picture__img') {
        openBigImageTab(evt.path[1]);
      } else {
        openBigImageTab(evt.target);
      }
    }
  };

  document.querySelector('.pictures').addEventListener('click', onopenBigImage);


  bigPictureImgCancel.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      bigPicture.classList.add('hidden');
    }
  });

})();

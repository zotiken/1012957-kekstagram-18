'use strict';
(function () {
  var bigPicture = document.querySelector('.big-picture');

  var bigPictureImgCancel = document.querySelector('.big-picture__cancel');

  var openBigImageTab = function (elem) {
    bigPicture.classList.remove('hidden');
    document.querySelector('.likes-count').textContent = elem.querySelector('.picture__likes').textContent;
    bigPicture.querySelector('img').src = elem.querySelector('.picture__img').src;
    document.querySelector('.comments-count').textContent = elem.querySelector('.picture__comments').textContent;
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

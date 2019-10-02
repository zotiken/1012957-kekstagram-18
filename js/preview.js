'use strict';
(function () {
  var bigPicture = document.querySelector('.big-picture');

  var bigPictureImgCancel = document.querySelector('.big-picture__cancel');

  var openBigImageTab = function (b, a) {
    b.addEventListener('focus', function (evt) {
      if (evt.target === b) {
        window.data.bigPictureBlockGeneration(a);
      }
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 13) {
        bigPicture.classList.remove('hidden');
      }
    });
  };

  var picture = document.querySelectorAll('.picture');
  for (i = 0; i < picture.length; i++) {
    openBigImageTab(picture[i], window.data.descriptionPhotos[i]);
  }

  var picturesContainer = document.querySelectorAll('.pictures');
  for (var i = 0; i < picturesContainer.length; i++) {
    picturesContainer[i].addEventListener('click', function (evt) {
      mouseClickFun(evt);
    });


    var mouseClickFun = function (param) {
      for (i = 0; i < picturesContainer.length; i++) {
        if (param.target.classList[0] === 'picture__img') {
          bigPicture.classList.remove('hidden');
        }
      }
    };
    picturesContainer[i].removeEventListener('click', function (evt) {
      mouseClickFun(evt);
    });
  }

  bigPictureImgCancel.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      bigPicture.classList.add('hidden');
    }
  });

})();

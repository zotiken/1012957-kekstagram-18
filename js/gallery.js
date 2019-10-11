'use strict';
(function () {

  var templatePicture = document.querySelector('#picture')
    .content.
  querySelector('.picture');


  var pictureBlockGeneration = function (params) {

    var pictureElement = templatePicture.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = params.url;
    pictureElement.querySelector('.picture__likes').textContent = params.likes;
    pictureElement.querySelector('.picture__comments').textContent = params.comments.length;

    return pictureElement;
  };

  var onGetDescriptionPhotos = function (data) {

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(pictureBlockGeneration(data[i]));
    }
    document.querySelector('.pictures').appendChild(fragment);
  };

  window.backend.load('https://js.dump.academy/kekstagram/data', onGetDescriptionPhotos, window.main.errorBlockGeneration);
})();

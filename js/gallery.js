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

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < window.data.descriptionPhotos.length; i++) {
    fragment.appendChild(pictureBlockGeneration(window.data.descriptionPhotos[i]));
  }
  document.querySelector('.pictures').appendChild(fragment);

})();

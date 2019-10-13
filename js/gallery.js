'use strict';
(function () {

  var templatePicture = document.querySelector('#picture')
    .content.
  querySelector('.picture');
  window.pictures = [];
  var picturesBlock = document.querySelector('.pictures');
  var pictureBlockGeneration = function (params) {

    var pictureElement = templatePicture.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = params.url;
    pictureElement.querySelector('.picture__likes').textContent = params.likes;
    pictureElement.querySelector('.picture__comments').textContent = params.comments.length;

    return pictureElement;
  };

  window.sortPictureLikes = function (data) {
    data.sort(function (a, b) {
      return b.likes - a.likes;
    });
    return data;
  };
  window.sortPictureCommit = function (data) {
    data.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return data;
  };
  var clearGallery = function () {
    if (picturesBlock.children.length > 1) {
      var pictureElem = document.querySelectorAll('.picture');
      for (var i = 0; i < pictureElem.length; i++) {
        picturesBlock.removeChild(pictureElem[i]);
      }
    }
  };

  var createGallery = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(pictureBlockGeneration(data[i]));
    }
    document.querySelector('.pictures').appendChild(fragment);
  };

  window.updateGallery = function (data) {
    clearGallery();
    createGallery(data);
  };

  var onGetDescriptionPhotos = function (data) {
    window.pictures = data.slice();
    window.sortPictureLikes(window.pictures);
    window.updateGallery(window.pictures);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  };

  window.backend.load('https://js.dump.academy/kekstagram/data', onGetDescriptionPhotos, window.main.errorBlockGeneration);
})();

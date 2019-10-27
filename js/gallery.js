'use strict';
(function () {

  var templatePicture = document.querySelector('#picture')
    .content.
  querySelector('.picture');
  var picturesBlock = document.querySelector('.pictures');
  var generatePictureBlock = function (params) {

    var pictureNode = templatePicture.cloneNode(true);

    pictureNode.querySelector('.picture__img').src = params.url;
    pictureNode.querySelector('.picture__likes').textContent = params.likes;
    pictureNode.querySelector('.picture__comments').textContent = params.comments.length;

    return pictureNode;
  };

  var sortPictureLikes = function (data) {
    data.sort(function (a, b) {
      return b.likes - a.likes;
    });
    return data;
  };
  var sortPictureCommit = function (data) {
    data.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return data;
  };
  var clearGallery = function () {
    if (picturesBlock.children.length > 1) {
      var pictureElem = document.querySelectorAll('.picture');
      pictureElem.forEach(function (item, i) {
        picturesBlock.removeChild(pictureElem[i]);
      });

    }
  };

  var createGallery = function (data) {
    var fragment = document.createDocumentFragment();
    data.forEach(function (item, i) {
      fragment.appendChild(generatePictureBlock(data[i]));
    });

    document.querySelector('.pictures').appendChild(fragment);
  };

  var updateGallery = function (data) {
    clearGallery();
    createGallery(data);
  };

  var onGetDescriptionPhotos = function (data) {
    window.pictures = data.slice();
    sortPictureLikes(window.pictures);
    updateGallery(window.pictures);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  };

  var onErrorClose = function () {
    window.main.generateErrorBlock();
    document.addEventListener('click', function (evt) {
      if (evt.target.classList[0] === 'error__button') {
        window.onCloseErrorPopUp(evt.path[3]);
      }
      if (evt.target.classList[0] === 'error') {
        window.onCloseErrorPopUp(evt.target);
      }
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        document.querySelector('.error').remove();
      }
    });

  };
  window.backend.load('https://js.dump.academy/kekstagram/data', onGetDescriptionPhotos, onErrorClose);

  window.gallery = {
    sortPictureLikes: sortPictureLikes,
    sortPictureCommit: sortPictureCommit,
    updateGallery: updateGallery
  };

})();

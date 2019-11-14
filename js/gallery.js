'use strict';
(function () {

  var templatePicture = document.querySelector('#picture')
    .content.
  querySelector('.picture');
  var picturesBlock = document.querySelector('.pictures');
  var imgFilters = document.querySelector('.img-filters');

  var generatePictureBlock = function (parameter) {
    var pictureNode = templatePicture.cloneNode(true);
    pictureNode.querySelector('.picture__img').src = parameter.url;
    pictureNode.querySelector('.picture__likes').textContent = parameter.likes;
    pictureNode.querySelector('.picture__comments').textContent = parameter.comments.length;
    return pictureNode;
  };

  var sortByLikes = function (data) {
    data.sort(function (a, b) {
      return b.likes - a.likes;
    });
    return data;
  };
  var sortByComments = function (data) {
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
    picturesBlock.appendChild(fragment);
  };

  var updateGallery = function (data) {
    clearGallery();
    createGallery(data);
  };
  var onGetDescriptionPhotos = function (data) {
    window.pictures = data.slice();
    sortByLikes(window.pictures);
    updateGallery(window.pictures);
    imgFilters.classList.remove('img-filters--inactive');
  };
  var onCloseErrorEsc = function (i) {
    if (i.keyCode === window.main.ESC_KEY_CODE) {
      window.onCloseErrorPopUp(window.errorNode);
      document.removeEventListener('keydown', onCloseErrorEsc);
    }
  };

  var onErrorClose = function () {
    window.main.generateErrorBlock();
    document.addEventListener('click', function (evt) {
      if (evt.target.classList[window.form.ELEMENT_ONE_ARRAY] === 'error__button') {
        window.onCloseErrorPopUp(evt.path[3]);
      }
      if (evt.target.classList[window.form.ELEMENT_ONE_ARRAY] === 'error') {
        window.onCloseErrorPopUp(evt.target);
      }
    });
    document.addEventListener('keydown', onCloseErrorEsc);
  };

  window.backend.load('https://js.dump.academy/kekstagram/data', onGetDescriptionPhotos, onErrorClose);
  window.gallery = {
    sortByLikes: sortByLikes,
    sortByComments: sortByComments,
    onCloseErrorEsc: onCloseErrorEsc,
    updateGallery: updateGallery,
    picturesBlock: picturesBlock
  };

})();

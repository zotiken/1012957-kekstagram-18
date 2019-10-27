'use strict';

(function () {

  var makeRandomValue = function (array) {
    return array[Math.round(Math.random() * (array.length - 1))];
  };

  var getPicturesRandom = function (num) {
    var picturesRandom = [];
    for (var i = 0; i < num; i++) {
      picturesRandom.push(makeRandomValue(window.pictures));
    }
    for (var q = 0; q < picturesRandom.length; q++) {
      for (var r = q + 1; r < picturesRandom.length; r++) {
        if (picturesRandom[q] === picturesRandom[r]) {
          picturesRandom[r] = makeRandomValue(window.pictures);
        }
      }
    }
    return picturesRandom;
  };

  var clearActiveButtons = function (param) {
    var buttons = param.path[1].querySelectorAll('.img-filters__button');
    buttons.forEach(function (item, i) {
      buttons[i].classList.remove('img-filters__button--active');
    });
    param.target.classList.add('img-filters__button--active');
  };

  var onFilterSelect = function (param) {
    switch (param.target.id) {
      case 'filter-popular':
        window.gallery.sortPictureLikes(window.pictures);
        window.gallery.updateGallery(window.pictures);
        clearActiveButtons(param);
        break;
      case 'filter-random':
        window.gallery.updateGallery(getPicturesRandom(10));
        clearActiveButtons(param);
        break;
      case 'filter-discussed':
        window.gallery.sortPictureCommit(window.pictures);
        window.gallery.updateGallery(window.pictures);
        clearActiveButtons(param);
        break;
      default:
        window.gallery.sortPictureLikes(window.pictures);
        window.gallery.updateGallery(window.pictures);
        clearActiveButtons(param);
        break;
    }
  };

  var filtersForm = document.querySelector('.img-filters__form');
  filtersForm.addEventListener('click', window.debounce(function (evt) {
    onFilterSelect(evt);
  }));
})();

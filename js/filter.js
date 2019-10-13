'use strict';

(function () {

  var makeRandomValue = function (array) {
    return array[Math.round(Math.random() * (array.length - 1))];
  };

  var pictureRandom = function (data) {
    var randomList = [];

    for (var i = 0; i < data; i++) {
      randomList.push(makeRandomValue(window.pictures));
    }
    for (var q = 0; q < randomList.length; q++) {
      for (var r = q + 1; r < randomList.length; r++) {
        if (randomList[q] === randomList[r]) {
          randomList[r] = makeRandomValue(window.pictures);
        }
      }
    }
    return randomList;
  };

  var clearActiveButtons = function (param) {
    var Buttons = param.path[1].querySelectorAll('.img-filters__button');
    for (var i = 0; i < Buttons.length; i++) {
      Buttons[i].classList.remove('img-filters__button--active');
    }
    param.target.classList.add('img-filters__button--active');
  };

  var onFilterSelect = function (param) {

    switch (param.target.id) {
      case 'filter-popular':
        window.sortPictureLikes(window.pictures);
        window.updateGallery(window.pictures);
        clearActiveButtons(param);
        break;
      case 'filter-random':
        window.updateGallery(pictureRandom(10));
        clearActiveButtons(param);
        break;
      case 'filter-discussed':
        window.sortPictureCommit(window.pictures);
        window.updateGallery(window.pictures);
        clearActiveButtons(param);
        break;
      default:
        window.sortPictureLikes(window.pictures);
        window.updateGallery(window.pictures);
        clearActiveButtons(param);
        break;
    }
  };

  var filtersForm = document.querySelector('.img-filters__form');
  filtersForm.addEventListener('click', function (evt) {
    window.debounce(onFilterSelect(evt));
  });
})();

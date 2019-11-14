'use strict';

(function () {

  var COUNT_RANDOM_PICTURES = 10;

  var filtersForm = document.querySelector('.img-filters__form');
  var makeRandomValue = function (array) {
    return array[Math.round(Math.random() * (array.length - 1))];
  };

  var getPicturesRandom = function (num) {
    var picturesRandom = [];
    for (var i = window.form.ELEMENT_ONE_ARRAY; i < num; i++) {
      picturesRandom.push(makeRandomValue(window.pictures));
    }
    for (var q = window.form.ELEMENT_ONE_ARRAY; q < picturesRandom.length; q++) {
      for (var r = q + 1; r < picturesRandom.length; r++) {
        if (picturesRandom[q] === picturesRandom[r]) {
          picturesRandom[r] = makeRandomValue(window.pictures);
        }
      }
    }
    return picturesRandom;
  };

  var clearActiveButtons = function (parameter) {
    var buttons = parameter.path[window.preview.SURFACING_STEP_ONE].querySelectorAll('.img-filters__button');
    buttons.forEach(function (item, i) {
      buttons[i].classList.remove('img-filters__button--active');
    });
    parameter.target.classList.add('img-filters__button--active');
  };

  var onFilterSelect = function (parameter) {
    switch (parameter.target.id) {
      case 'filter-popular':
        window.gallery.sortByLikes(window.pictures);
        window.gallery.updateGallery(window.pictures);
        clearActiveButtons(parameter);
        break;
      case 'filter-random':
        window.gallery.updateGallery(getPicturesRandom(COUNT_RANDOM_PICTURES));
        clearActiveButtons(parameter);
        break;
      case 'filter-discussed':
        window.gallery.sortByComments(window.pictures);
        window.gallery.updateGallery(window.pictures);
        clearActiveButtons(parameter);
        break;
      default:
        window.gallery.sortByLikes(window.pictures);
        window.gallery.updateGallery(window.pictures);
        clearActiveButtons(parameter);
        break;
    }
  };

  filtersForm.addEventListener('click', window.debounce(function (evt) {
    onFilterSelect(evt);
  }));

})();

'use strict';
(function () {
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');

  var errorBlockGeneration = function (params) {
    var errorCloneNode = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorCloneNode.cloneNode(true);

    errorElement.querySelector('.error__title').textContent = params;

    var fragment = document.createDocumentFragment();
    fragment.appendChild(errorElement);
    document.body.appendChild(fragment);
  };

  var succesPopUp = document.querySelector('#success').content.querySelector('.success');
  var succesPopUpBlockGeneration = function () {
    var succesPopUpBlock = succesPopUp.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(succesPopUpBlock);
    document.body.appendChild(fragment);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        succesPopUpBlock.remove();
      }
    });

  };

  var onCloseSuccesPopUp = function (elem) {
    elem.remove();
  };
  document.addEventListener('click', function (evt) {
    if (evt.target.classList[0] === 'success__button') {
      onCloseSuccesPopUp(evt.path[2]);
    }
    if (evt.target.classList[0] === 'success') {
      onCloseSuccesPopUp(evt.target.classList[0]);
    }
  });

  window.main = {
    errorBlockGeneration: errorBlockGeneration,
    succesPopUpBlockGeneration: succesPopUpBlockGeneration
  };

})();

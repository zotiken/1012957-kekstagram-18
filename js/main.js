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
  window.main = {
    errorBlockGeneration: errorBlockGeneration
  };

})();

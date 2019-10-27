'use strict';
(function () {
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');

  var generateErrorBlock = function (params) {
    var errorCloneNode = document.querySelector('#error').content.querySelector('.error');
    var errorNode = errorCloneNode.cloneNode(true);

    errorNode.querySelector('.error__title').textContent = params;
    document.body.appendChild(errorNode);
  };

  var successPopUp = document.querySelector('#success').content.querySelector('.success');
  var generateSuccessPopUpBlock = function () {
    var successPopUpBlock = successPopUp.cloneNode(true);
    document.body.appendChild(successPopUpBlock);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        successPopUpBlock.remove();
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
    generateErrorBlock: generateErrorBlock,
    generateSuccessPopUpBlock: generateSuccessPopUpBlock
  };

})();

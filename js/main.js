'use strict';
(function () {
  var ESC_KEY_CODE = 27;
  var MASSIVE_THREE_ELENENT = 2;

  var errorBlock = document.querySelector('#error').content.querySelector('.error');

  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');

  var generateErrorBlock = function (parameter) {
    var errorNode = errorBlock.cloneNode(true);
    errorNode.querySelector('.error__title').textContent = parameter;
    document.body.appendChild(errorNode);
  };
  var successPopUp = document.querySelector('#success').content.querySelector('.success');
  var generateSuccessPopUpBlock = function () {
    var successPopUpBlock = successPopUp.cloneNode(true);
    document.body.appendChild(successPopUpBlock);
    var onRemoveSuccessPopUpBlock = function (i) {
      if (i.keyCode === ESC_KEY_CODE) {
        successPopUpBlock.remove();
      }
      document.removeEventListener('keydown', function (evt) {
        onRemoveSuccessPopUpBlock(evt);
      });
    };

    document.addEventListener('keydown', function (evt) {
      onRemoveSuccessPopUpBlock(evt);
    });

  };

  var onCloseSuccessPopUp = function (element) {
    element.remove();
  };
  document.addEventListener('click', function (evt) {
    if (evt.target.classList[window.form.MASSIVE_FIRST_ELENENT] === 'success__button') {
      onCloseSuccessPopUp(evt.path[MASSIVE_THREE_ELENENT]);
    }
    if (evt.target.classList[window.form.MASSIVE_FIRST_ELENENT] === 'success') {
      onCloseSuccessPopUp(evt.target.classList[window.form.MASSIVE_FIRST_ELENENT]);
    }
  });
  window.main = {
    ESC_KEY_CODE: ESC_KEY_CODE,
    MASSIVE_THREE_ELENENT: MASSIVE_THREE_ELENENT,
    generateErrorBlock: generateErrorBlock,
    generateSuccessPopUpBlock: generateSuccessPopUpBlock,
    errorBlock: errorBlock
  };

})();

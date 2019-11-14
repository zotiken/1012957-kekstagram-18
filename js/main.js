'use strict';
(function () {
  var ESC_KEY_CODE = 27;
  var ELEMENT_THREE_ARRAY = 2;

  var errorBlock = document.querySelector('#error').content.querySelector('.error');
  var successPopUp = document.querySelector('#success').content.querySelector('.success');

  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');

  var generateErrorBlock = function (parameter) {
    window.errorNode = errorBlock.cloneNode(true);
    window.errorNode.querySelector('.error__title').textContent = parameter;
    document.body.appendChild(window.errorNode);
  };
  var generateSuccessPopUpBlock = function () {
    var successPopUpBlock = successPopUp.cloneNode(true);
    document.body.appendChild(successPopUpBlock);
    var onRemoveSuccessPopUpBlock = function (i) {
      if (i.keyCode === ESC_KEY_CODE) {
        successPopUpBlock.remove();
        document.removeEventListener('keydown', function (evt) {
          onRemoveSuccessPopUpBlock(evt);
        });
      }
    };
    document.addEventListener('keydown', function (evt) {
      onRemoveSuccessPopUpBlock(evt);
    });
  };

  var onCloseSuccessPopUp = function (element) {
    element.remove();
  };
  document.addEventListener('click', function (evt) {
    if (evt.target.classList[window.form.ELEMENT_ONE_ARRAY] === 'success__button') {
      onCloseSuccessPopUp(evt.path[ELEMENT_THREE_ARRAY]);
    }
    if (evt.target.classList[window.form.ELEMENT_ONE_ARRAY] === 'success') {
      onCloseSuccessPopUp(evt.target.classList[window.form.ELEMENT_ONE_ARRAY]);
    }
  });
  window.main = {
    ESC_KEY_CODE: ESC_KEY_CODE,
    ELEMENT_THREE_ARRAY: ELEMENT_THREE_ARRAY,
    generateErrorBlock: generateErrorBlock,
    generateSuccessPopUpBlock: generateSuccessPopUpBlock,
  };

})();

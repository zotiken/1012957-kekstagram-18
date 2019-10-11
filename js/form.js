'use strict';
(function () {

  var filter = [
    {
      name: 'grayscale',
      minValue: 0,
      maxValue: 1,
      measure: ''
    },
    {
      name: 'sepia',
      minValue: 0,
      maxValue: 1,
      measure: ''
    },
    {
      name: 'invert',
      minValue: 0,
      maxValue: 100,
      measure: '%'
    },
    {
      name: 'blur',
      minValue: 1,
      maxValue: 3,
      measure: 'px'

    },
    {
      name: 'brightness',
      minValue: 1,
      maxValue: 3,
      measure: ''
    }
  ];

  //  редактор изображения

  var imgUploadOverlay = document.querySelector('.img-upload__overlay');

  // контрол загрузки изображения

  var uploadFile = document.querySelector('#upload-file');

  // иконка закрытия редактор изображения

  var imgUploadCancel = document.querySelector('.img-upload__cancel');


  // открытие редактора при изминении контрола загрузки

  uploadFile.addEventListener('change', function () {
    imgUploadOverlay.classList.remove('hidden');
  });

  imgUploadCancel.addEventListener('click', function () {
    imgUploadOverlay.classList.add('hidden');
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      imgUploadOverlay.classList.add('hidden');
    }
  });

  var Hashtags = [];
  var textHashtags = document.querySelector('.text__hashtags');

  var onValidInputHashtags = function () {
    Hashtags = textHashtags.value.split(' ');
    for (var i = 0; i < Hashtags.length; i++) {
      if (Hashtags[i][0] !== '#') {
        textHashtags.setCustomValidity('хэш-тег начинается с символа # (решётка)');
      } else if (indicateNoSpace(Hashtags[i]) > 1) {
        textHashtags.setCustomValidity('хэш-теги разделяются пробелами');
      } else if (Hashtags[i].length < 2 || Hashtags[i].length > 20) {
        textHashtags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку;');
      } else if (Hashtags.length > 5) {
        textHashtags.setCustomValidity('нельзя указать больше пяти хэш-тегов');
      } else if (lookForDuplicates(Hashtags) > 0) {
        textHashtags.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
      } else {
        textHashtags.setCustomValidity('');
      }
    }
  };

  textHashtags.addEventListener('change', onValidInputHashtags);

  textHashtags.addEventListener('keydown', function (evt) {

    if (evt.keyCode === 27) {

      evt.stopPropagation();
    }
  });

  var lookForDuplicates = function (params) {
    var index = 0;
    for (var i = 0; i < params.length; i++) {
      for (var y = i + 1; y < params.length; y++) {
        if (params[i].toLowerCase() === params[y].toLowerCase()) {
          index++;
        }
      }
    }
    return index;
  };

  var indicateNoSpace = function (param) {
    var index = 0;
    for (var v = 0; v < param.length; v++) {
      if (param[v] === '#') {
        index++;
      }
    }
    return index;
  };


  var textDescription = document.querySelector('.text__description');
  textDescription.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      evt.stopPropagation();
    }
  });

  var imgUpLoadEffects = document.querySelector('.img-upload__effects');

  // пин слайдера редактора

  var effectLevelValue = document.querySelector('.effect-level__value').getAttribute('value');

  var effectLevelPin = document.querySelector('.effect-level__pin');
  window.effectLevelPin = effectLevelPin;

  var effectsItem = document.querySelectorAll('.effects__radio');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelLine = document.querySelector('.effect-level__line');
  // Функция пропорции значения range для фильтра
  var countProportion = function (obj, value) {
    return obj.name + '(' + (((obj.maxValue - obj.minValue) / 100) * value) + obj.measure + ')';
  };

  // --------------------

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var effectLevelLineCoord = effectLevelLine.getBoundingClientRect().x;
    var effectLevelLineWidth = effectLevelLine.getBoundingClientRect().width;
    var effectLevelPinLineX = effectLevelPin.getBoundingClientRect().x;

    var cursorPositionX = evt.clientX;
    var onMouseMove = function (moveEvt) {

      var shift = cursorPositionX - evt.clientX;
      cursorPositionX = moveEvt.clientX;
      effectLevelPin.style.left = Math.round(((effectLevelPinLineX - effectLevelLineCoord + shift + effectLevelPin.offsetWidth / 2) / effectLevelLineWidth) * 100) + '%';

      effectLevelDepth.style.width = effectLevelPin.style.left;

      if (effectLevelPin.style.left <= '0px') {
        effectLevelPin.style.left = 0;
        effectLevelDepth.style.width = effectLevelPin.style.left;

      } else if (parseInt(effectLevelPin.style.left, 10) > 99) {
        effectLevelPin.style.left = '100%';
        effectLevelDepth.style.width = effectLevelPin.style.left;
      }
    };
    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      effectLevelValue = 100;
      effectLevelValue = parseInt(effectLevelPin.style.left, 10);

      if (effectsItem[0].checked) {
        document.querySelector('.img-upload__preview').style.filter = '';
      }

      for (var i = 1; i < effectsItem.length; i++) {
        if (effectsItem[i].checked) {
          document.querySelector('.img-upload__preview').style.filter = countProportion(filter[i - 1], effectLevelValue);
        }
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var applyFilter = function (params) {
    document.querySelector('.img-upload__effect-level').classList.remove('hidden');
    document.querySelector('.img-upload__preview').style.filter = countProportion(filter[params - 1], 100);
  };

  imgUpLoadEffects.addEventListener('input', function (evt) {
    effectLevelPin.style.left = '100%';
    effectLevelDepth.style.width = effectLevelPin.style.left;
    switch (evt.target.id) {
      case 'effect-none':
        document.querySelector('.img-upload__effect-level').classList.add('hidden');
        document.querySelector('.img-upload__preview').style.filter = '';
        break;
      case 'effect-chrome':
        applyFilter(1);
        break;
      case 'effect-sepia':
        applyFilter(2);
        break;
      case 'effect-marvin':
        applyFilter(3);
        break;
      case 'effect-phobos':
        applyFilter(4);
        break;
      case 'effect-heat':
        applyFilter(5);
        break;
    }
  });

  var onSuccessfullySending = function () {
    imgUploadOverlay.classList.add('hidden');
    document.querySelector('.img-upload__form').reset();
    document.querySelector('.effect-level__pin').style.left = '20%';
    effectLevelDepth.style.width = '20%';
    window.main.succesPopUpBlockGeneration();
  };
  var onErrorSending = function () {
    imgUploadForm.classList.add('hidden');
    window.main.errorBlockGeneration();
    var onCloseErrorPopUp = function (elem) {
      elem.remove();
      imgUploadForm.classList.remove('hidden');
    };
    document.addEventListener('click', function (evt) {
      if (evt.target.classList[0] === 'error__button') {
        onCloseErrorPopUp(evt.path[3]);
      }
      if (evt.target.classList[0] === 'error') {
        onCloseErrorPopUp(evt.target);
      }
    });
  };


  var imgUploadForm = document.querySelector('.img-upload__form');
  imgUploadForm.addEventListener('submit', function (evt) {
    window.backend.upLoad('https://js.dump.academy/kekstagrams', onSuccessfullySending, onErrorSending, imgUploadForm);
    evt.preventDefault();
  });


})();

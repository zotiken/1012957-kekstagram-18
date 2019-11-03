'use strict';
(function () {

  var MASSIVE_FIRST_ELENENT = 0;
  var MASSIVE_CORRECT = 1;

  var SURFACING_STEP_THREE = 3;

  // filter index

  var GRAYSCALE = 1;
  var SEPIA = 2;
  var INVERT = 3;
  var BLUR = 4;
  var BRIGHTNESS = 5;

  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
  var imgUploadForm = document.querySelector('.img-upload__form');

  var filters = [
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
  window.imgUploadOverlay = imgUploadOverlay;
  // контрол загрузки изображения

  var uploadFile = document.querySelector('#upload-file');

  // иконка закрытия редактор изображения

  var imgUploadCancel = document.querySelector('.img-upload__cancel');
  var scaleValue = document.querySelector('.scale__control--value');

  var transformValues = function (parameter) {
    imgUploadPreview.style.transform = 'scale(' + (parseInt(parameter.value, 10) / 100) + ')';
  };
  var onDefaultFileValues = function () {
    uploadFile.value = null;
    // uploadFile.removeEventListener('click', onDefaultFileValues);
  };

  var onImgUploadOverlayClose = function () {
    imgUploadOverlay.classList.add('hidden');
    imgUploadCancel.removeEventListener('click', onImgUploadOverlayClose);
  };

  var onImgUploadCancel = function (i) {
    if (i.keyCode === window.main.ESC_KEY_CODE) {
      onImgUploadOverlayClose();
    }
    document.removeEventListener('keydown', onImgUploadCancel);
  };

  var onOpenPopUpForm = function () {
    imgUploadOverlay.classList.remove('hidden');
    transformValues(scaleValue);
    window.previewImage.style.filter = '';
    document.addEventListener('keydown', onImgUploadCancel);
    imgUploadCancel.addEventListener('click', onImgUploadOverlayClose);
  };

  // открытие редактора при изминении контрола загрузки
  uploadFile.addEventListener('click', onDefaultFileValues);
  uploadFile.addEventListener('change', onOpenPopUpForm);

  var hashTags = [];
  var textHashTags = document.querySelector('.text__hashtags');

  var onValidInputHashTags = function () {
    hashTags = textHashTags.value.split(' ');

    hashTags.forEach(function (item, i, arr) {
      if (item[MASSIVE_FIRST_ELENENT] !== '#') {
        textHashTags.setCustomValidity('Хэш-тег начинается с символа # (решётка)');
      } else if (indicateNoSpace(item) > 1) {
        textHashTags.setCustomValidity('Хэш-теги разделяются пробелами');
      } else if (item.length < 2) {
        textHashTags.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
      } else if (item.length < 2 || item.length > 20) {
        textHashTags.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
      } else if (arr.length > 5) {
        textHashTags.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
      } else if (arr.length > 5) {
        textHashTags.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
      } else if (lookForDuplicates(arr) > 0) {
        textHashTags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
      } else {
        textHashTags.setCustomValidity('');
      }
    });
  };

  textHashTags.addEventListener('input', onValidInputHashTags);
  textHashTags.addEventListener('keydown', onOffEsc);

  var lookForDuplicates = function (parameter) {
    var index = 0;
    for (var i = MASSIVE_FIRST_ELENENT; i < parameter.length; i++) {
      for (var y = i + 1; y < parameter.length; y++) {
        if (parameter[i].toLowerCase() === parameter[y].toLowerCase()) {
          index++;
        }
      }
    }
    return index;
  };

  var indicateNoSpace = function (parameter) {
    var index = 0;
    for (var v = MASSIVE_FIRST_ELENENT; v < parameter.length; v++) {
      if (parameter[v] === '#') {
        index++;
      }
    }
    return index;
  };

  var textDescription = document.querySelector('.text__description');
  var onOffEsc = function (i) {
    if (i.keyCode === window.main.ESC_KEY_CODE) {
      i.stopPropagation();
    }
    document.removeEventListener('keydown', onOffEsc);
  };

  textDescription.addEventListener('keydown', onOffEsc);

  // ---- scale module

  var scaleSmaller = document.querySelector('.scale__control--smaller');
  var scaleBigger = document.querySelector('.scale__control--bigger');
  var imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');
  var changeScale = function (parameter) {
    if (parseInt(scaleValue.value, 10) >= 25 && parseInt(scaleValue.value, 10) <= 75 && parameter === '+') {
      scaleValue.value = (parseInt(scaleValue.value, 10) + 25) + '%';
      transformValues(scaleValue);
    } else if (parseInt(scaleValue.value, 10) > 24 && parseInt(scaleValue.value, 10) < 50 && parameter === '-') {
      scaleValue.value = (parseInt(scaleValue.value, 10) - 25) + '%';
      scaleValue.value = 25 + '%';
      transformValues(scaleValue);
    } else if (parseInt(scaleValue.value, 10) >= 50 && parseInt(scaleValue.value, 10) <= 100 && parameter === '-') {
      scaleValue.value = (parseInt(scaleValue.value, 10) - 25) + '%';
      transformValues(scaleValue);
    } else if (parseInt(scaleValue.value, 10) > 75) {
      scaleValue.value = 100 + '%';
      transformValues(scaleValue);
    }
  };
  scaleSmaller.addEventListener('click', function () {
    changeScale('-');
    scaleSmaller.removeEventListener('click', function () {
      changeScale('-');
    });
  });

  scaleBigger.addEventListener('click', function () {
    changeScale('+');
    scaleBigger.removeEventListener('click', function () {
      changeScale('+');
    });
  });

  var imgUpLoadEffects = document.querySelector('.img-upload__effects');

  // пин слайдера редактора

  var effectLevelValue = document.querySelector('.effect-level__value').getAttribute('value');
  var effectLevel = document.querySelector('.img-upload__effect-level');
  var effectLevelPin = document.querySelector('.effect-level__pin');

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

      effectLevelValue = parseInt(effectLevelPin.style.left, 10);

      if (effectsItem[MASSIVE_FIRST_ELENENT].checked) {
        window.previewImage.style.filter = '';
      }

      for (var i = 1; i < effectsItem.length; i++) {
        if (effectsItem[i].checked) {
          window.previewImage.style.filter = countProportion(filters[i - MASSIVE_CORRECT], effectLevelValue);
        }
      }

    };
    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var applyFilter = function (parameter) {
    effectLevel.classList.remove('hidden');
    window.previewImage.style.filter = countProportion(filters[parameter - MASSIVE_CORRECT], 100);
  };

  imgUpLoadEffects.addEventListener('input', function (evt) {
    effectLevelPin.style.left = '100%';
    effectLevelDepth.style.width = effectLevelPin.style.left;
    switch (evt.target.id) {
      case 'effect-none':
        imgUploadEffectLevel.classList.add('hidden');
        window.previewImage.style.filter = '';
        break;
      case 'effect-chrome':
        applyFilter(GRAYSCALE);
        break;
      case 'effect-sepia':
        applyFilter(SEPIA);
        break;
      case 'effect-marvin':
        applyFilter(INVERT);
        break;
      case 'effect-phobos':
        applyFilter(BLUR);
        break;
      case 'effect-heat':
        applyFilter(BRIGHTNESS);
        break;
    }
  });

  var onSuccessfullySending = function () {
    imgUploadOverlay.classList.add('hidden');
    imgUploadForm.reset();
    effectLevelPin.style.left = '20%';
    effectLevelDepth.style.width = '20%';
    window.main.generateSuccessPopUpBlock();
  };
  var onCloseErrorPopUp = function (elem) {
    elem.remove();
    imgUploadForm.classList.remove('hidden');
  };

  var onErrorSending = function () {
    imgUploadForm.classList.add('hidden');
    window.main.generateErrorBlock();
    document.addEventListener('click', function (evt) {
      if (evt.target.classList[MASSIVE_FIRST_ELENENT] === 'error__button') {
        onCloseErrorPopUp(evt.path[SURFACING_STEP_THREE]);
      }
      if (evt.target.classList[MASSIVE_FIRST_ELENENT] === 'error') {
        onCloseErrorPopUp(evt.target);
      }
    });
  };

  imgUploadForm.addEventListener('submit', function (evt) {
    window.backend.upLoad('https://js.dump.academy/kekstagram', onSuccessfullySending, onErrorSending, imgUploadForm);
    evt.preventDefault();
  });

  window.effectLevel = effectLevel;
  window.onCloseErrorPopUp = onCloseErrorPopUp;

  window.form = {
    MASSIVE_FIRST_ELENENT: MASSIVE_FIRST_ELENENT,
  };
})();

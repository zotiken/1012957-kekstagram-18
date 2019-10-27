'use strict';
(function () {

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

  var HashTags = [];
  var textHashTags = document.querySelector('.text__hashtags');

  var onValidInputHashTags = function () {
    HashTags = textHashTags.value.split(' ');

    HashTags.forEach(function (item, i, arr) {
      if (item[0] !== '#') {
        textHashTags.setCustomValidity('хэш-тег начинается с символа # (решётка)');
      } else if (indicateNoSpace(item) > 1) {
        textHashTags.setCustomValidity('хэш-теги разделяются пробелами');
      } else if (item.length < 2) {
        textHashTags.setCustomValidity('хеш-тег не может состоять только из одной решётки');
      } else if (item.length < 2 || item.length > 20) {
        textHashTags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
      } else if (arr.length > 5) {
        textHashTags.setCustomValidity('нельзя указать больше пяти хэш-тегов');
      } else if (arr.length > 5) {
        textHashTags.setCustomValidity('нельзя указать больше пяти хэш-тегов');
      } else if (lookForDuplicates(arr) > 0) {
        textHashTags.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
      } else {
        textHashTags.setCustomValidity('');
      }
    });

  };

  textHashTags.addEventListener('change', onValidInputHashTags);
  textHashTags.addEventListener('keydown', function (evt) {
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

  var onValidInputDescription = function () {
    if (textDescription.value.length > 140) {
      textDescription.setCustomValidity('длина комментария не может составлять больше 140 символов');
    } else {
      textDescription.setCustomValidity('');
    }
  };
  var textDescription = document.querySelector('.text__description');
  textDescription.addEventListener('change', onValidInputDescription);

  textDescription.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      evt.stopPropagation();
    }
  });

  // ---- scale module

  var scaleSmaller = document.querySelector('.scale__control--smaller');
  var scaleBigger = document.querySelector('.scale__control--bigger');
  var scaleValue = document.querySelector('.scale__control--value');
  var imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');
  var changeScale = function (params) {
    if (parseInt(scaleValue.value, 10) >= 25 && parseInt(scaleValue.value, 10) <= 85) {
      scaleValue.value = (parseInt(scaleValue.value, 10) + +(params + '25')) + '%';
      imgUploadPreview.style.transform = 'scale(' + (parseInt(scaleValue.value, 10) / 100) + ')';
    } else if (parseInt(scaleValue.value, 10) >= 0 && parseInt(scaleValue.value, 10) < 25 && params === '+') {
      scaleValue.value = (parseInt(scaleValue.value, 10) + 25) + '%';
      imgUploadPreview.style.transform = 'scale(' + (parseInt(scaleValue.value, 10) / 100) + ')';
    } else if (parseInt(scaleValue.value, 10) >= 85 && parseInt(scaleValue.value, 10) <= 100 && params === '-') {
      scaleValue.value = (parseInt(scaleValue.value, 10) - 25) + '%';
      imgUploadPreview.style.transform = 'scale(' + (parseInt(scaleValue.value, 10) / 100) + ')';
    } else if (parseInt(scaleValue.value, 10) >= 100) {
      scaleValue.value = 100 + '%';
      imgUploadPreview.style.transform = 'scale(' + (parseInt(scaleValue.value, 10) / 100) + ')';
    } else {
      scaleValue.value = 0 + '%';
      imgUploadPreview.style.transform = 'scale(' + (parseInt(scaleValue.value, 10) / 100) + ')';
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

      effectLevelValue = parseInt(effectLevelPin.style.left, 10);

      if (effectsItem[0].checked) {
        window.previewImage.style.filter = '';
      }

      for (var i = 1; i < effectsItem.length; i++) {
        if (effectsItem[i].checked) {
          window.previewImage.style.filter = countProportion(filters[i - 1], effectLevelValue);
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

  var applyFilter = function (params) {
    effectLevel.classList.remove('hidden');
    window.previewImage.style.filter = countProportion(filters[params - 1], 100);
  };

  imgUpLoadEffects.addEventListener('input', function (evt) {
    effectLevelPin.style.left = '100%';
    effectLevelDepth.style.width = effectLevelPin.style.left;
    switch (evt.target.id) {
      case 'effect-none':
        document.querySelector('.img-upload__effect-level').classList.add('hidden');
        window.previewImage.style.filter = '';
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
    window.backend.upLoad('https://js.dump.academy/kekstagram', onSuccessfullySending, onErrorSending, imgUploadForm);
    evt.preventDefault();
  });

  window.effectLevel = effectLevel;
  window.onCloseErrorPopUp = onCloseErrorPopUp;
})();

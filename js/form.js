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
  var effectLevelPin = document.querySelector('.effect-level__pin');


  var effectLevelValue = document.querySelector('.effect-level__value').getAttribute('value');


  var effectsItem = document.querySelectorAll('.effects__radio');


  // Функция пропорции значения range для фильтра
  var countProportion = function (obj, value) {
    return obj.name + '(' + (((obj.maxValue - obj.minValue) / 100) * value) + obj.measure + ')';
  };

  effectLevelPin.addEventListener('mouseup', function () {
    for (var i = 0; i < effectsItem.length; i++) {
      if (effectsItem[0].checked) {
        document.querySelector('.img-upload__preview').style.filter = '';

      }
      if (effectsItem[i].checked) {
        document.querySelector('.img-upload__preview').style.filter = countProportion(filter[i - 1], effectLevelValue);

      }
    }
  });

  var applyFilter = function (params) {
    document.querySelector('.img-upload__effect-level').classList.remove('hidden');
    document.querySelector('.img-upload__preview').style.filter = countProportion(filter[params - 1], 100);
  };

  imgUpLoadEffects.addEventListener('input', function (evt) {
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

})();

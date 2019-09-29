'use strict';
var templatePicture = document.querySelector('#picture')
  .content.
querySelector('.picture');


// document.querySelector('.big-picture').classList.remove('hidden');
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');


var bigPicture = document.querySelector('.big-picture');

var bigPictureImg = document.querySelector('.big-picture__img');
var bigPictureImgCancel = document.querySelector('.big-picture__cancel');

//  редактор изображения

var imgUploadOverlay = document.querySelector('.img-upload__overlay');

// контрол загрузки изображения

var uploadFile = document.querySelector('#upload-file');

// иконка закрытия редактор изображения

var imgUploadCancel = document.querySelector('.img-upload__cancel');

// пин слайдера редактора
var effectLevelPin = document.querySelector('.effect-level__pin');


var effectLevelValue = document.querySelector('.effect-level__value').getAttribute('value');


var effectsItem = document.querySelectorAll('.effects__radio');

var textHashtags = document.querySelector('.text__hashtags');

var Hashtags = [];
var descriptionPhotos = [];
var descriptions = [
  'шедевр',
  'модерн',
  'бездарность'
];

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var names = [
  'Артем',
  'Егор',
  'Timati',
  'Sam',
  'Gogi',
  'Мифодий'
];

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


// Функция пропорции значения range для фильтра
var countProportion = function (obj, value) {
  return obj.name + '(' + (((obj.maxValue - obj.minValue) / 100) * value) + obj.measure + ')';
};

// --------- рандомное елемент массива -----------


var makeRandomValue = function (array) {
  return Math.round(Math.random() * (array.length - 1));
};

// --------- рандомное число с min и  max -----------


var randomInteger = function (min, max) {
  // получить случайное число от min до max
  var rand = min + Math.random() * (max - min);
  return Math.round(rand);
};

// --------- генерация коментариев -----------

var commentsGeneration = function (params) {
  var arr = [];
  for (var i = 0; i < params; i++) {
    arr.push({
      avatar: 'img/avatar-' + randomInteger(1, 6) + '.svg',
      message: comments[makeRandomValue(comments)],
      name: names[makeRandomValue(names)]
    });
  }
  return arr;
};

// --------- генерация описания фото -----------

var generateDescriptionPhoto = function (number) {
  for (var i = 1; i <= number; i++) {
    descriptionPhotos.push({
      url: 'photos/' + i + '.jpg',
      description: descriptions[makeRandomValue(descriptions)],
      likes: randomInteger(15, 200),
      comments: commentsGeneration(randomInteger(1, 2))
    });
  }
};
generateDescriptionPhoto(25);

var pictureBlokGeneration = function (params) {

  var pictureElement = templatePicture.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = params.url;
  pictureElement.querySelector('.picture__likes').textContent = params.likes;
  pictureElement.querySelector('.picture__comments').textContent = params.comments.length;

  return pictureElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < descriptionPhotos.length; i++) {
  fragment.appendChild(pictureBlokGeneration(descriptionPhotos[i]));
}
document.querySelector('.pictures').appendChild(fragment);

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

effectLevelPin.addEventListener('mouseup', function () {
  for (i = 0; i < effectsItem.length; i++) {
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

var indicateNoSpace = function (param) {
  var index = 0;
  for (var v = 0; v < param.length; v++) {
    if (param[v] === '#') {
      index++;
    }
  }
  return index;
};


var lookForDuplicates = function (params) {
  var index = 0;
  for (i = 0; i < params.length; i++) {
    for (var y = i + 1; y < params.length; y++) {
      if (params[i].toLowerCase() === params[y].toLowerCase()) {
        index++;
      }
    }
  }
  return index;
};

var onValidInputHashtags = function () {
  Hashtags = textHashtags.value.split(' ');
  for (i = 0; i < Hashtags.length; i++) {
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

var textDescription = document.querySelector('.text__description');
textDescription.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.stopPropagation();
  }
});

var imgUpLoadEffects = document.querySelector('.img-upload__effects');

imgUpLoadEffects.addEventListener('input', function (evt) {
  if (evt.target.id === 'effect-none') {
    document.querySelector('.img-upload__effect-level').classList.add('hidden');
    document.querySelector('.img-upload__preview').style.filter = '';
  } else if (evt.target.id === 'effect-chrome') {
    applyFilter(1);
  } else if (evt.target.id === 'effect-sepia') {
    applyFilter(2);
  } else if (evt.target.id === 'effect-marvin') {
    applyFilter(3);
  } else if (evt.target.id === 'effect-phobos') {
    applyFilter(4);
  } else if (evt.target.id === 'effect-heat') {
    applyFilter(5);
  }
});

var picturesContainer = document.querySelectorAll('.pictures');
for (i = 0; i < picturesContainer.length; i++) {
  picturesContainer[i].addEventListener('click', function (evt) {
    mouseClickFun(evt);
  });


  var mouseClickFun = function (param) {
    for (i = 0; i < picturesContainer.length; i++) {
      // if (param.target.parentNode === picturesContainer[i]) {
      //   // bigPictureBlockGeneration(descriptionPhotos[i]);
      // } else
      if (param.target.classList[0] === 'picture__img') {
        bigPicture.classList.remove('hidden');
      }
    }
  };
  picturesContainer[i].removeEventListener('click', function (evt) {
    mouseClickFun(evt);
  });
}

var bigPictureBlockGeneration = function (params) {
  document.querySelector('.likes-count').textContent = params.likes;
  bigPictureImg.querySelector('img').src = params.url;
  document.querySelector('.comments-count').textContent = params.comments.length;
  var commentsList = document.querySelector('.social__comments').querySelectorAll('.social__comment');
  for (var o = 0; o < commentsList.length; o++) {
    if (commentsList.length <= params.comments.length) {
      var index = o;
    } else {
      index = 0;
    }
    commentsList[o].querySelector('img').src = 'img/avatar-' + randomInteger(1, 6) + '.svg';
    commentsList[o].querySelector('img').alt = params.comments[index].name;
    commentsList[o].querySelector('.social__text').textContent = params.comments[index].message;
  }

  document.querySelector('.social__caption').textContent = params.description;
};

bigPictureImgCancel.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
});
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    bigPicture.classList.add('hidden');
  }
});

var openBigImageTab = function (b, a) {
  b.addEventListener('focus', function (evt) {
    if (evt.target === b) {
      bigPictureBlockGeneration(a);
    }
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      bigPicture.classList.remove('hidden');
    }
  });
};


var picture = document.querySelectorAll('.picture');

for (i = 0; i < picture.length; i++) {
  openBigImageTab(picture[i], descriptionPhotos[i]);
}

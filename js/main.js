'use strict';
var templatePicture = document.querySelector('#picture')
  .content.
querySelector('.picture');

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


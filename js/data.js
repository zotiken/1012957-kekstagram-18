'use strict';
(function () {

  var bigPictureImg = document.querySelector('.big-picture__img');
  window.bigPictureImg = bigPictureImg;

  var descriptionPhotos = [];
  window.descriptionPhotos = descriptionPhotos;
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


  function bigPictureBlockGeneration(params) {
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
  }

  window.data = {
    descriptionPhotos: descriptionPhotos,
    bigPictureBlockGeneration: bigPictureBlockGeneration,
  };

})();

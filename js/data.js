'use strict';
(function () {

  var bigPictureImg = document.querySelector('.big-picture__img');
  window.bigPictureImg = bigPictureImg;
  var descriptionPhotos = [];

  // --------- рандомное число с min и  max -----------


  var randomInteger = function (min, max) {
    // получить случайное число от min до max
    var rand = min + Math.random() * (max - min);
    return Math.round(rand);
  };


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

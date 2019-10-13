'use strict';
(function () {
  var bigPicture = document.querySelector('.big-picture');

  var bigPictureImgCancel = document.querySelector('.big-picture__cancel');


  var clearListComment = function (params) {
    if (params.length > 1) {
      for (var i = 2; i < params.length; i++) {
        params[i].remove();
      }
    }
  };
  var generateComment = function (param, i, com) {
    clearListComment(com);
    for (var r = 2; r < param; r++) {
      var commentNode = bigPicture.querySelector('.social__comment');
      var copyCommentNode = commentNode.cloneNode(true);
      copyCommentNode.querySelector('.social__picture').src = window.pictures[i].comments[r].avatar;
      copyCommentNode.querySelector('.social__text').textContent = window.pictures[i].comments[r].message;
      var fragment = document.createDocumentFragment();
      fragment.appendChild(copyCommentNode);
      bigPicture.querySelector('.social__comments').appendChild(fragment);
    }
  };

  var openBigImageTab = function (elem) {
    var targetPicture = elem.querySelector('.picture__img').src.substring(22);
    for (var i = 0; i < window.pictures.length; i++) {
      if (targetPicture === window.pictures[i].url) {
        bigPicture.classList.remove('hidden');
        document.querySelector('.likes-count').textContent = window.pictures[i].likes;
        bigPicture.querySelector('img').src = window.pictures[i].url;
        document.querySelector('.comments-count').textContent = window.pictures[i].comments.length;
        window.comment = bigPicture.querySelectorAll('.social__comment');
        window.comment[0].querySelector('.social__picture').src = window.pictures[i].comments[0].avatar;
        window.comment[0].querySelector('.social__text').textContent = window.pictures[i].comments[0].message;
        window.comment[1].querySelector('.social__picture').src = window.pictures[i].comments[1].avatar;
        window.comment[1].querySelector('.social__text').textContent = window.pictures[i].comments[1].message;
        generateComment(5, i, window.comment);
        bigPicture.querySelector('.social__caption').textContent = window.pictures[i].description;
      }
      if (window.pictures[i].comments.length > 5) {
        document.querySelector('.social__comments-loader').classList.remove('visually-hidden');
      }
    }
  };

  document.querySelector('.social__comments-loader').addEventListener('click', function (evt) {
    var urlImg = evt.path[2].querySelector('.big-picture__img').querySelector('img').src.substring(22);
    for (var i = 0; i < window.pictures.length; i++) {
      if (urlImg === window.pictures[i].url) {
        window.comment = bigPicture.querySelectorAll('.social__comment');
        generateComment(window.pictures[i].comments.length, i, window.comment);
        document.querySelector('.social__comments-loader').classList.add('visually-hidden');
      }
    }
  });


  var onopenBigImage = function (evt) {
    if (evt.target.classList[0] === 'picture' || evt.target.classList[0] === 'picture__img') {
      if (evt.target.classList[0] === 'picture__img') {
        openBigImageTab(evt.path[1]);
      } else {
        openBigImageTab(evt.target);
      }
    }
  };

  document.querySelector('.pictures').addEventListener('click', onopenBigImage);


  bigPictureImgCancel.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      bigPicture.classList.add('hidden');
    }
  });

})();

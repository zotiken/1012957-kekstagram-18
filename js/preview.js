'use strict';
(function () {
  var bigPicture = document.querySelector('.big-picture');
  var socialComment = bigPicture.querySelectorAll('.social__comment');
  var bigPictureImgCancel = document.querySelector('.big-picture__cancel');
  var clearListComment = function (params) {
    if (params.length > 1) {
      params.forEach(function (item) {
        item.remove();
      });
    }
  };

  var generateComment = function (param, i, com) {
    clearListComment(com);
    var fragment = new DocumentFragment();
    for (var r = 0; r < param; r++) {
      var copyCommentNode = socialComment[0].cloneNode(true);
      copyCommentNode.querySelector('.social__picture').src = window.pictures[i].comments[r].avatar;
      copyCommentNode.querySelector('.social__picture').alt = window.pictures[i].comments[r].name;
      copyCommentNode.querySelector('.social__text').textContent = window.pictures[i].comments[r].message;
      fragment.append(copyCommentNode);
    }
    bigPicture.querySelector('.social__comments').append(fragment);
  };
  var openBigImageTab = function (elem) {
    var targetPicture = elem.querySelector('.picture__img').src.substring(22);
    window.pictures.forEach(function (item, i) {
      if (targetPicture === item.url) {
        bigPicture.classList.remove('hidden');
        document.querySelector('.likes-count').textContent = item.likes;
        bigPicture.querySelector('img').src = item.url;
        document.querySelector('.comments-count').textContent = item.comments.length;
        var index = (item.comments.length < 5) ? item.comments.length : 5;
        var socialCommentList = bigPicture.querySelectorAll('.social__comment');
        generateComment(index, i, socialCommentList);
        bigPicture.querySelector('.social__caption').textContent = item.description;
        if (item.comments.length >= 5) {
          document.querySelector('.social__comments-loader').classList.remove('visually-hidden');
        }
      }

    });
  };

  document.querySelector('.social__comments-loader').addEventListener('click', function (evt) {
    var urlImg = evt.path[2].querySelector('.big-picture__img').querySelector('img').src.substring(22);
    window.pictures.forEach(function (item, i) {
      if (urlImg === item.url) {
        window.comment = bigPicture.querySelectorAll('.social__comment');
        generateComment(item.comments.length, i, window.comment);
        document.querySelector('.social__comments-loader').classList.add('visually-hidden');
      }
    });

  });

  var onOpenBigImage = function (evt) {
    if (evt.target.classList[0] === 'picture' || evt.target.classList[0] === 'picture__img') {
      document.querySelector('body').classList.add('modal-open');
      var target = (evt.target.classList[0] === 'picture__img') ? evt.path[1] : evt.target;
      openBigImageTab(target);
    }
  };

  document.querySelector('.pictures').addEventListener('click', onOpenBigImage);

  bigPictureImgCancel.addEventListener('click', function () {
    document.querySelector('body').classList.remove('modal-open');
    bigPicture.classList.add('hidden');
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      bigPicture.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
    }
  });

})();

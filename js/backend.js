'use strict';
/* eslint-disable no-console */
(function () {
  var load = function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;
    xhr.open('GET', url);
    xhr.send();
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 304:
          onError();
          break;
        case 404:
          onError();
          break;
        case 500:
          onError();
          break;
      }

      xhr.addEventListener('ontimeout', function () {
        onError('Привышенно время ожидания');
        console.error('Привышенно время ожидания');
      });
    });
  };

  var upLoad = function (url, onLoad, onError, form) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;
    xhr.open('POST', url);
    xhr.send(new FormData(form));
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 304:
          onError('программа времмено неработает');
          break;
        case 404:
          onError('нет соединения');
          break;
        case 500:
          onError('ошибка сервера');
          break;
      }
      console.log(xhr);

      xhr.addEventListener('timeout', function () {
        onError('Привышенно время ожидания');
        console.error('Привышенно время ожидания');
      });
    });
  };

  window.backend = {
    load: load,
    upLoad: upLoad
  };
})();

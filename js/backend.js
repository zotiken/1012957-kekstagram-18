'use strict';
(function () {
  var OK = 200;
  var NOT_FOUND = 404;
  var NOT_MODIFIED = 304;
  var INTERNAL_SERVER_ERROR = 500;
  var TIME_OUT = 10000;

  var load = function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIME_OUT;
    xhr.open('GET', url);
    xhr.send();
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case OK:
          onLoad(xhr.response);
          break;
        case NOT_MODIFIED:
          onError();
          break;
        case NOT_FOUND:
          onError();
          break;
        case INTERNAL_SERVER_ERROR:
          onError();
          break;
      }

      xhr.addEventListener('ontimeout', function () {
        onError('Привышенно время ожидания');
      });
    });
  };

  var upLoad = function (url, onLoad, onError, form) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIME_OUT;
    xhr.open('POST', url);
    xhr.send(new FormData(form));
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case OK:
          onLoad(xhr.response);
          break;
        case NOT_MODIFIED:
          onError('программа времмено неработает');
          break;
        case NOT_FOUND:
          onError('нет соединения');
          break;
        case INTERNAL_SERVER_ERROR:
          onError('ошибка сервера');
          break;
      }

      xhr.addEventListener('timeout', function () {
        onError('Привышенно время ожидания');
      });
    });
  };

  window.backend = {
    load: load,
    upLoad: upLoad
  };
})();

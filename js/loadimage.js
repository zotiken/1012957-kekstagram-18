'use strict';

(function () {
  var IMG_TYPE = ['jpg', 'gif', 'png', 'webp'];
  var imageUpload = document.querySelector('.img-upload__input');
  var previewImage = document.querySelector('.img-upload__preview').querySelector('img');
  imageUpload.addEventListener('change', function () {
    var file = imageUpload.files[0];
    var filename = file.name.toLowerCase();

    var matches = IMG_TYPE.some(function (it) {
      return filename.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        previewImage.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });
})();

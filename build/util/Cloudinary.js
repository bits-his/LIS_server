'use strict';

var _config = require('../config/config');

require('dotenv').config;

var cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'drxkp1erj',
  api_key: '218187136849528',
  api_secret: 'dF879L426Z38DnkBvSKuG_IcSCo'
});

var cloudRoute = function cloudRoute(app) {
  app.post(_config.api + '/cloud/upload', function (req, res) {
    var image = req.body;
    console.log(image);
    cloudinary.uploader.upload('' + image, {
      upload_preset: "myimage"
    }).then(function (uploadedReponse) {
      res.json({ success: true, msg: "Done " + uploadedReponse });
    }).catch(function (error) {
      console.log(error);
      res.status(500).json({ msg: "Error :" + error });
    });
  });
};

module.exports = { cloudinary: cloudinary, cloudRoute: cloudRoute };
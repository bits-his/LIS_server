'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Image = sequelize.define('Image', {
    image_url: DataTypes.STRING

  });

  return Image;
};
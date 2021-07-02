'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Department = sequelize.define('Department', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    location: DataTypes.STRING
  });
  return Department;
};
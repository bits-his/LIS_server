'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var DepartmentUnits = sequelize.define('DepartmentUnits', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    location: DataTypes.STRING
  });
  return DepartmentUnits;
};
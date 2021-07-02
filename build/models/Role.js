'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    code: DataTypes.STRING,
    title: DataTypes.STRING,
    permissions: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  });

  Role.associate = function (models) {
    // associations go here
  };

  return Role;
};
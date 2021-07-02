"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    accessTo: DataTypes.STRING,
    position: DataTypes.STRING,
    department: DataTypes.STRING,
    accessToDept: DataTypes.STRING,
    accessToFiles: DataTypes.STRING,
    signature: DataTypes.STRING
  });

  User.associate = function (models) {
    // associations go here
  };

  return User;
};
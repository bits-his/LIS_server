"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Role = sequelize.define("Comment", {
    ApplicationId: DataTypes.INTEGER,
    tag_no: DataTypes.STRING,
    remark: DataTypes.STRING,
    comment: DataTypes.STRING,
    forward_to: DataTypes.STRING,
    forward_by: DataTypes.STRING,
    status: DataTypes.STRING
  }, { timeStamps: false });

  return Role;
};
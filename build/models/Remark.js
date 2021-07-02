"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Remark = sequelize.define("Remark", { remark: DataTypes.STRING,
    remark_to: DataTypes.STRING,
    remark_by: DataTypes.STRING
  }, { define: { timeStamps: false } });

  return Remark;
};
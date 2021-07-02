"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = function (sequelize, DataTypes) {
  var _sequelize$define;

  var Application = sequelize.define("Application", (_sequelize$define = {
    ack_id: DataTypes.STRING,
    name: DataTypes.STRING,
    application_date: DataTypes.STRING,
    application_type: DataTypes.STRING
  }, _defineProperty(_sequelize$define, "name", DataTypes.STRING), _defineProperty(_sequelize$define, "amount", DataTypes.STRING), _defineProperty(_sequelize$define, "address", DataTypes.STRING), _defineProperty(_sequelize$define, "phone", { type: DataTypes.STRING, unique: false }), _defineProperty(_sequelize$define, "other_info", DataTypes.STRING), _defineProperty(_sequelize$define, "info", DataTypes.STRING), _defineProperty(_sequelize$define, "tp_no", DataTypes.STRING), _defineProperty(_sequelize$define, "image_id", DataTypes.STRING), _defineProperty(_sequelize$define, "plot_no", DataTypes.STRING), _defineProperty(_sequelize$define, "amount_paid", DataTypes.STRING), _defineProperty(_sequelize$define, "reciept_no", DataTypes.STRING), _defineProperty(_sequelize$define, "stage", DataTypes.INTEGER), _defineProperty(_sequelize$define, "status", DataTypes.STRING), _defineProperty(_sequelize$define, "remark", DataTypes.STRING), _defineProperty(_sequelize$define, "forward_to", DataTypes.STRING), _defineProperty(_sequelize$define, "email", { type: DataTypes.STRING, unique: false }), _defineProperty(_sequelize$define, "commissioning", DataTypes.STRING), _defineProperty(_sequelize$define, "forward_by", DataTypes.STRING), _defineProperty(_sequelize$define, "recom_id", DataTypes.INTEGER), _sequelize$define));

  return Application;
};
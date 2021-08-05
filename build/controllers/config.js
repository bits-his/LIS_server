"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _sequelize = require("sequelize");

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("dotenv").config();

var basename = _path2.default.basename(__filename);

var config = {
  username: "postgres",
  password: "dangana2020",
  database: "GIS",
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
var db = {};
var use_query_string = true;
var sequelize = void 0;
if (config.use_env_variable) {
  sequelize = new _sequelize2.default(process.env[config.use_env_variable], config);
  // } else if (use_query_string) {
  //   sequelize = new Sequelize(process.env.DB_CONNECTION_URL, {
  //     dialect: "postgres",
  //     dialectOptions: {
  //       require: true,
  //       rejectUnauthorized: false,
  //     },
  //   });
} else {
  sequelize = new _sequelize2.default(config.database, config.username, config.password, config);
}

_fs2.default.readdirSync(__dirname).filter(function (file) {
  return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
}).forEach(function (file) {
  var model = sequelize["import"](_path2.default.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = _sequelize2.default;

exports.default = db;
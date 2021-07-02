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
var env = process.env.NODE_ENV || 'development';
var basename = _path2.default.basename(__filename);
var config = require(__dirname + '/../config/pgdb.js')[env];
// const config = {
//   username: "hceklbkaubkzja",
//   password: "7bf0e13875c36a4aeb27017bffa7972f166a9fdc4f4ee77b3c3eefdd28ab1852",
//   database: "dalj224b0epnff",
//   host: "ec2-34-193-112-164.compute-1.amazonaws.com",
//   ssl:true,
//   dialect: "postgres",
//   url:'postgres://hceklbkaubkzja:7bf0e13875c36a4aeb27017bffa7972f166a9fdc4f4ee77b3c3eefdd28ab1852@ec2-34-193-112-164.compute-1.amazonaws.com:5432/dalj224b0epnff',
//   //URL.parse('ec2-34-193-112-164.compute-1.amazonaws.com', true).pathname,
//   pool: {
//     max: 5, 
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
//   use_env_variable:false
// };
var db = {};
var use_query_string = false;
var sequelize = void 0;
if (config.use_env_variable) {
  sequelize = new _sequelize2.default(process.env[config.use_env_variable], config);
} else if (use_query_string) {
  sequelize = new _sequelize2.default(process.env.DB_CONNECTION_URL, {
    dialect: "postgres",
    dialectOptions: {
      require: true,
      rejectUnauthorized: false
    }
  });
} else {
  sequelize = new _sequelize2.default(config.database, config.username, config.password, {
    url: config.url,
    host: config.host,
    dialect: config.dialect,
    ssl: config.ssl
  });
}
// sequelize = new Sequelize('postgres://hceklbkaubkzja:7bf0e13875c36a4aeb27017bffa7972f166a9fdc4f4ee77b3c3eefdd28ab1852@ec2-34-193-112-164.compute-1.amazonaws.com:5432/dalj224b0epnff');
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
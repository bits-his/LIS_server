"use strict";

import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
require("dotenv").config();
const env = process.env.NODE_ENV || 'development';
const basename = path.basename(__filename);
const config = require(__dirname + '/../config/pgdb.js')[env];
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
const db = {};
const use_query_string = false;
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
  } else if (use_query_string) {
    sequelize = new Sequelize(process.env.DB_CONNECTION_URL, {
      dialect: "postgres",
      dialectOptions: {
        require: true,
        rejectUnauthorized: false,
      },
    });
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,{
        url:config.url,
        host:config.host,
        dialect:config.db_dialect,
        ssl:config.ssl
    }
  );
}
// sequelize = new Sequelize('postgres://hceklbkaubkzja:7bf0e13875c36a4aeb27017bffa7972f166a9fdc4f4ee77b3c3eefdd28ab1852@ec2-34-193-112-164.compute-1.amazonaws.com:5432/dalj224b0epnff');
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

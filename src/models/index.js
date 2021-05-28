"use strict";

import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
require("dotenv").config();

const basename = path.basename(__filename);

const config = {
  username: "postgres",
  password: "dangana2020",
  database: "lis",
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
const configlast = {
  username: "b1a660636ee11e",
  password: "9cc268a8",
  database: "heroku_8d5b9679140b812",
  host: "us-cdbr-east-02.cleardb.com",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
const config2 = {
  username: "root",
  password: "",
  database: "lis-db",
  host: "127.0.0.1",
  dialect: "mysql",
  // pool: {
  //   max: 5,
  //   min: 0,
  //   acquire: 30000,
  //   idle: 10000,
  // },
};
const db = {};
const use_query_string = true;
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
  // } else if (use_query_string) {
  //   sequelize = new Sequelize(process.env.DB_CONNECTION_URL, {
  //     dialect: "postgres",
  //     dialectOptions: {
  //       require: true,
  //       rejectUnauthorized: false,
  //     },
  //   });
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

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

const { User, Role, Application, Remark, Recommendation } = db;

// User.belongsToMany(Role, { foreignKey: "role_id" });
Role.belongsTo(User, { foreignKey: "" });

Application.hasMany(Remark, { foreignKey: "ApplicationId" });
Remark.belongsTo(Application, { foreignKey: "ApplicationId" });

export default db;

"use strict";

var _passportJwt = require("passport-jwt");

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { placeholder } from "sequelize/types/lib/operators";
var Users = _models2.default.User;

var opts = {};
opts.jwtFromRequest = _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

// create jwt strategy
module.exports = function (passport) {
  passport.use(new _passportJwt.Strategy(opts, function (jwt_payload, done) {
    Users.findOne({ where: { id: jwt_payload.id } }).then(function (user) {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    });
    //   .catch(err => console.log(err));
    // db.sequelize
    //   .query(`SELECT * FROM Users WHERE id='${jwt_payload.id}'`)
    //   .then((found) => {
    //     let user = found[0];
    //     console.log(user);
    //     //check for user
    //     if (user.length) {
    //       return done(null, user[0]);
    //     }
    //     return done(null, false);
    //   })
    //   .catch((err) => console.log(err));
  }));
};
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
// import { placeholder } from "sequelize/types/lib/operators";
import models from "../models";
import db from "../models";
const Users = models.User;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

// create jwt strategy
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Users.findOne({ where: { id: jwt_payload.id } }).then((user) => {
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
    })
  );
};

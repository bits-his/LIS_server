import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import db from "../models";
const User = db.User;

// load input validation
import validateRegisterForm from "../validation/register";
import validateLoginForm from "../validation/login";

// create user
const create = (req, res) => {
  const { errors, isValid } = validateRegisterForm(req.body);
  let {
    name,
    email,
    password,
    position,
    accessTo,
    role,
    department,
    accessToDept,
  } = req.body;
  errors.success = false;

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ where: { email } })
  // .then((user) => {
  // db.sequelize
  //   .query(`SELECT * FROM users WHERE email='${email}'`)
    .then((user) => {
      if (user) {
        return res
          .status(400)
          .json({ success: false, msg: "Email already exists!" });
      } else {
        let newUser = {
          id:null,
          name,
          role: role ? role : "",
          email,
          password,
          position,
          accessTo,
          department,
          accessToDept,
        };
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            User.create(newUser)
            // db.sequelize
            //   .query(
            //     "INSERT INTO `users` ( `name`,`email`,`password`,`role`,`accessTo`,`position`,`department`,`accessToDept`)"+
            //     " VALUES ('${name}','${email}','${hash}','${role}','${accessTo}','${position}','${department}','${accessToDept}')"
            //   )
              .then((newUser) => {
                res.json({ success: true, user:newUser });
              })
              .catch((err) => {
                res.status(500).json({ success: false, msg: err });
              });
          });
        });
      }
    });
};

export const verifyUserToken = (req, res, next) => {
  const authToken = req.headers["authorization"];
  const token = authToken.split(" ")[1];
  // console.log(token)
  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.json({
        success: false,
        msg: "Failed to authenticate token." + err,
      });
    
    }

    const { id } = decoded;
    
    User.findOne({ where: { id } })
  
    .then((user)=>{
      //   res.json({
      //     success: true,
      //     user,
      //   });
      // 
      next()
    })
      .catch((err) => {
        res.status(500).json({ success: false, msg: err });
        console.log(err);
      });
  });
};

const login = (req, res) => {
  const { errors, isValid } = validateLoginForm(req.body);

  // check validation
  if (!isValid) {
    return res
      .status(400)
      .json({ success: false, error: errors, msg: "Fields are required" });
  }

  const { email, password } = req.body;

  // User.findAll({
  //   where: {
  //     email,
  //   },
  // })
  db.sequelize
    .query(`SELECT * FROM users WHERE email='${email}'`)
    .then((found) => {
      let user = found[0];
      console.log(user);
      //check for user
      if (!user.length) {
        errors.success = false;
        errors.msg = "User not found!";
        return res.status(404).json(errors);
      }

      let originalPassword = user[0].password;

      //check for password
      bcrypt
        .compare(password, originalPassword)
        .then((isMatch) => {
          if (isMatch) {
            // user matched
            console.log("matched!");
            const { id, role, role_id } = user[0];
            const payload = {id, role, role_id }; //jwt payload
            // console.log(payload)

            jwt.sign(
              payload,
              "secret",
              {
                expiresIn: 3600,
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token,
                  role: user[0].role,
                  role_id: user[0].role_id,
                });
              }
            );
          } else {
            errors.msg = "Password not correct";
            errors.success = false;
            console.log(errors);
            return res.status(400).json(errors);
          }
        })
        .catch((err) => res.status(500).json({ success: false, msg: err }));
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: err });
      console.log(err);
    });
};

// profile
const profile = (req, res) => {
  User.findOne({ where: { id:req.user.id } })
  .then((user)=>{
      res.json({
        success: true,
        user,
      });
  })
    .catch((err) => {
      res.status(500).json({ success: false, msg: err });
      console.log(err);
    });
}
// fetch all users
const findAllUsers = (req, res) => {
  // User.findAll()
  db.sequelize
    .query(`SELECT * FROM users `)
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => res.status(500).json({ success: false, msg: err }));
};

// fetch user by userId
const findById = (req, res) => {
  const id = req.params.userId;

  // User.findAll({ where: { id } })
  db.sequelize
    .query(`SELECT * FROM users `)
    .then((user) => {
      if (!user.length) {
        return res.json({ msg: "user not found" });
      }
      res.json({ user });
    })
    .catch((err) => res.status(500).json({ err }));
};

// update a user's info
const update = (req, res) => {
  let { firstname, lastname, HospitalId, role, image } = req.body;
  const id = req.params.userId;

  User.update(
    {
      firstname,
      lastname,
      role,
    },
    { where: { id } }
  )
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(500).json({ success: false, msg: err }));
};

// delete a user
const deleteUser = (req, res) => {
  const id = req.params.userId;

  User.destroy({ where: { id } })
    .then(() => res.status.json({ msg: "User has been deleted successfully!" }))
    .catch((err) => res.status(500).json({ msg: "Failed to delete!" }));
};
export const getRole = (req, res) => {
  const { id } = req.user.id;
  db.sequelize
    .query(`CALL get_position()`)
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
};
export const createUser = (req, res) => {
  const {
    firstname,
    lastname,
    username,
    email,
    password,
    role,
    accessTo,
    department,
    position,
  } = req.body;
  console.log(req.body);
  db.sequelize
    .query(
      `INSERT INTO users(department,position, name, role, accessTo, username, email, password) VALUES ("${department}","${position}","${firstname+' '+lastname}","${role}","${accessTo}","${username}","${email}","${password}")`
    )
    .then((results) => res.json({ success: true }))
    .catch((err) => res.status(500).json({ success: false, error:err }));
};
export { create, login, findAllUsers, findById, update, deleteUser, profile };

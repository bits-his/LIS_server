"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.profile = exports.deleteUser = exports.update = exports.findById = exports.findAllUsers = exports.login = exports.create = exports.createUser = exports.getRole = exports.verifyUserToken = undefined;

var _bcryptjs = require("bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

var _register = require("../validation/register");

var _register2 = _interopRequireDefault(_register);

var _login = require("../validation/login");

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _models2.default.User;

// load input validation


// create user
var create = function create(req, res) {
  var _validateRegisterForm = (0, _register2.default)(req.body),
      errors = _validateRegisterForm.errors,
      isValid = _validateRegisterForm.isValid;

  var _req$body = req.body,
      name = _req$body.name,
      email = _req$body.email,
      password = _req$body.password,
      position = _req$body.position,
      accessTo = _req$body.accessTo,
      role = _req$body.role,
      department = _req$body.department,
      accessToDept = _req$body.accessToDept;

  errors.success = false;

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ where: { email: email } })
  // .then((user) => {
  // db.sequelize
  //   .query(`SELECT * FROM users WHERE email='${email}'`)
  .then(function (user) {
    if (user) {
      return res.status(400).json({ success: false, msg: "Email already exists!" });
    } else {
      var newUser = {
        id: null, name: name, role: role ? role : "", email: email, password: password, position: position, accessTo: accessTo, department: department, accessToDept: accessToDept };
      _bcryptjs2.default.genSalt(10, function (err, salt) {
        _bcryptjs2.default.hash(newUser.password, salt, function (err, hash) {
          if (err) throw err;
          newUser.password = hash;
          User.create(newUser)
          // db.sequelize
          //   .query(
          //     "INSERT INTO `users` ( `name`,`email`,`password`,`role`,`accessTo`,`position`,`department`,`accessToDept`)"+
          //     " VALUES ('${name}','${email}','${hash}','${role}','${accessTo}','${position}','${department}','${accessToDept}')"
          //   )
          .then(function (newUser) {
            res.json({ success: true, user: newUser });
          }).catch(function (err) {
            res.status(500).json({ success: false, msg: err });
          });
        });
      });
    }
  });
};

var verifyUserToken = exports.verifyUserToken = function verifyUserToken(req, res, next) {
  var authToken = req.headers["authorization"];
  var token = authToken.split(" ")[1];
  // console.log(token)
  _jsonwebtoken2.default.verify(token, "secret", function (err, decoded) {
    if (err) {
      return res.json({
        success: false, msg: "Failed to authenticate token." + err });
    }

    var id = decoded.id;

    // User.findOne({ where: { id } })

    //   .then((user) => {
    //     //   res.json({
    //     //     success: true,//     //     user,//     //   });
    //     //
    //     next();
    //   })

    _models2.default.sequelize.query("SELECT * FROM  public.\"Users\" WHERE id='" + id + "'").then(function (found) {
      var user = found[0];
      console.log(user);
      //check for user
      if (user.length) {
        res.json({
          success: true, user: user });
        next();
      }
      return done(null, false);
    }).catch(function (err) {
      res.status(500).json({ success: false, msg: err });
      console.log(err);
    });
  });
};

var login = function login(req, res) {
  var _validateLoginForm = (0, _login2.default)(req.body),
      errors = _validateLoginForm.errors,
      isValid = _validateLoginForm.isValid;

  // check validation


  if (!isValid) {
    return res.status(400).json({ success: false, error: errors, msg: "Fields are required" });
  }

  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password;

  // User.findAll({
  //   where: {
  //     email,
  //   },
  // })

  _models2.default.sequelize.query("SELECT * FROM public.\"Users\" WHERE email='" + email + "'").then(function (found) {
    var user = found[0];
    console.log(user);
    //check for user
    if (!user.length) {
      errors.success = false;
      errors.msg = "User not found!";
      return res.status(404).json(errors);
    }

    var originalPassword = user[0].password;

    //check for password
    _bcryptjs2.default.compare(password, originalPassword).then(function (isMatch) {
      if (isMatch) {
        // user matched
        console.log("matched!");
        var _user$ = user[0],
            id = _user$.id,
            role = _user$.role,
            role_id = _user$.role_id;

        var payload = { id: id, role: role, role_id: role_id }; //jwt payload
        // console.log(payload)

        _jsonwebtoken2.default.sign(payload, "secret", {
          expiresIn: 3600 }, function (err, token) {
          res.json({
            success: true, token: "Bearer " + token, role: user[0].role, role_id: user[0].role_id });
        });
      } else {
        errors.msg = "Password not correct";
        errors.success = false;
        console.log(errors);
        return res.status(400).json(errors);
      }
    }).catch(function (err) {
      return res.status(500).json({ success: false, msg: err });
    });
  }).catch(function (err) {
    res.status(500).json({ success: false, msg: err });
    console.log(err);
  });
};

// profile
var profile = function profile(req, res) {
  // User.findOne({ where: { id: req.user.id } })
  //   .then((user) => {
  //     res.json({
  //       success: true,
  //       user,
  //     });
  //   })

  _models2.default.sequelize.query("SELECT * FROM  public.\"Users\" WHERE id='" + req.user.id + "'").then(function (found) {
    var user = found[0];
    console.log(user);
    //check for user
    if (!user) {
      return res.status(404).json({ success: false, msg: "Token not matched" });
    } else {
      res.json({
        success: true, user: user[0] });
    }
  }).catch(function (err) {
    res.status(500).json({ success: false, msg: err });
    console.log(err);
  });
};
// fetch all users
var findAllUsers = function findAllUsers(req, res) {
  // User.findAll()
  _models2.default.sequelize.query("SELECT * FROM  public.\"Users\" ").then(function (user) {
    res.json({ user: user });
  }).catch(function (err) {
    return res.status(500).json({ success: false, msg: err });
  });
};

// fetch user by userId
var findById = function findById(req, res) {
  var id = req.params.userId;

  // User.findAll({ where: { id } })
  _models2.default.sequelize.query("SELECT * FROM  public.\"Users\" ").then(function (user) {
    if (!user.length) {
      return res.json({ msg: "user not found" });
    }
    res.json({ user: user });
  }).catch(function (err) {
    return res.status(500).json({ err: err });
  });
};

// update a user's info
var update = function update(req, res) {
  var _req$body3 = req.body,
      firstname = _req$body3.firstname,
      lastname = _req$body3.lastname,
      HospitalId = _req$body3.HospitalId,
      role = _req$body3.role,
      image = _req$body3.image;

  var id = req.params.userId;

  User.update({
    firstname: firstname, lastname: lastname, role: role }, { where: { id: id } }).then(function (user) {
    return res.status(200).json({ user: user });
  }).catch(function (err) {
    return res.status(500).json({ success: false, msg: err });
  });
};

// delete a user
var deleteUser = function deleteUser(req, res) {
  var id = req.params.userId;

  User.destroy({ where: { id: id } }).then(function () {
    return res.status.json({ msg: "User has been deleted successfully!" });
  }).catch(function (err) {
    return res.status(500).json({ msg: "Failed to delete!" });
  });
};
var getRole = exports.getRole = function getRole(req, res) {
  var id = req.user.id.id;

  _models2.default.sequelize.query("CALL get_position()").then(function (results) {
    return res.json({ success: true, results: results[0] });
  }).catch(function (err) {
    return res.status(500).json({ err: err });
  });
};
var createUser = exports.createUser = function createUser(req, res) {
  var _req$body4 = req.body,
      firstname = _req$body4.firstname,
      lastname = _req$body4.lastname,
      username = _req$body4.username,
      email = _req$body4.email,
      password = _req$body4.password,
      role = _req$body4.role,
      accessTo = _req$body4.accessTo,
      department = _req$body4.department,
      position = _req$body4.position;

  console.log(req.body);
  _models2.default.sequelize.query("INSERT INTO  public.\"Users\"(department,position, name, role, accessTo, username, email, password) VALUES (\"" + department + "\",\"" + position + "\",\"" + (firstname + " " + lastname) + "\",\"" + role + "\",\"" + accessTo + "\",\"" + username + "\",\"" + email + "\",\"" + password + "\")").then(function (results) {
    return res.json({ success: true });
  }).catch(function (err) {
    return res.status(500).json({ success: false, error: err });
  });
};
exports.create = create;
exports.login = login;
exports.findAllUsers = findAllUsers;
exports.findById = findById;
exports.update = update;
exports.deleteUser = deleteUser;
exports.profile = profile;
"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _models = require("./models");

var _models2 = _interopRequireDefault(_models);

var _multer = require("../config/multer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const cloudinary = require('cloudinary');
var _require = require("./util/Cloudinary"),
    cloudinary = _require.cloudinary;

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());

var port = process.env.PORT || 8005; // set the view engine to ejs
app.set("view engine", "ejs");

// make express look in the public directory for assets (css/js/img)
app.use(_express2.default.static(__dirname + "/public"));

app.use((0, _cors2.default)());

// force: true will drop the table if it already exits
// models.sequelize.sync({ force: true }).then(() => {
_models2.default.sequelize.sync().then(function () {
  console.log("Drop and Resync with {force: true}");
});

// passport middleware
app.use(_passport2.default.initialize());

// passport config
require("./config/passport")(_passport2.default);

//default route
app.get("/", function (req, res) {
  return res.send("Hello my World");
});
require("./routes/Director.js")(app);
require("./routes/user.js")(app);
app.post("/api/image/upload", _multer.profileStorage.array("image"), function (req, res) {
  var data = req.files;
  var _req$body = req.body,
      today = _req$body.today,
      form_no = _req$body.form_no,
      application_type = _req$body.application_type,
      application_name = _req$body.application_name,
      amount = _req$body.amount,
      address = _req$body.address,
      phone = _req$body.phone,
      other_Info = _req$body.other_Info,
      tp_no = _req$body.tp_no,
      land_no = _req$body.land_no,
      amount_paid = _req$body.amount_paid,
      reciept_no = _req$body.reciept_no,
      application = _req$body.application,
      email = _req$body.email,
      generate = _req$body.generate,
      forward_by = _req$body.forward_by;

  console.log(req.body);
  _models2.default.sequelize.query("INSERT INTO application_form(application_date,form_no,type,name,amount,address,phone,other_info,tp_no,file_no,amount_paid,reciept_no,status,forward_to,email,commissioning,forward_by) VALUES\n       ('" + today + "','" + form_no + "','" + application_type + "','" + application_name + "','" + amount + "','" + address + "','" + phone + "','" + other_Info + "','" + tp_no + "','" + land_no + "','" + amount_paid + "','" + reciept_no + "','" + application + "','Director Land','" + email + "','" + generate + "','" + forward_by + "')").then(function () {
    if (data) {
      data.forEach(function (item) {
        console.log(data);
        var arr = [];

        arr.push(item.path);
        arr.push(req.body.form_no);
        console.log(arr);
        _models2.default.sequelize.query("INSERT INTO images(id, image_url) VALUES ('" + arr[0] + "')");
      });
    }
  }).then(function (result) {
    _models2.default.sequelize.query("UPDATE INTO application_form SET image_id=" + result["id"] + "')").then().catch(function (err) {
      return res.json({ success: false, err: err });
    });

    if (raresultw) res.json({ success: true, raw: raw });
  }).catch(function (err) {
    return res.json({ success: false, msg: err });
  });
});

app.post("/api/letter/images/upload", _multer.uploadLetter.array("image"), function (req, res) {
  _models2.default.sequelize.query("INSERT INTO letter_of_stakeholder(select_letter_template, selectedcc, remarks) \n        VALUES ('" + req.body.selectLetter + "','" + req.body.selectCC + "','" + req.body.remarks + "')").then(function () {
    var data = req.files;
    if (req.files) {
      data.forEach(function (item) {
        var arr = [];
        arr.push(item.path);
        _models2.default.sequelize.query("INSERT INTO images( image_url) VALUES (\"" + arr + "\")");
      });
    }
  }).then(function (results) {
    return res.json({ success: true, results: results });
  }).catch(function (err) {
    return res.status(500).json({ err: err });
  });
});

app.post("/api/surveyor/images/upload", _multer.surveyor.array("image"), function (req, res) {
  var data = req.files;
  _models2.default.sequelize.query("INSERT INTO surveyor_report(select_letter_template, selectedcc, remarks) VALUES (\"" + req.body.selectFile + "\",\"" + req.body.selectTemplate + "\",\"" + req.body.remarks + "\")").then(function () {
    if (data) {
      data.forEach(function (item) {
        var arr = [];
        arr.push(item.path);
        _models2.default.sequelize.query("INSERT INTO images( image_url) VALUES (\"" + arr + "\")");
      });
    }
  }).then(function (results) {
    return res.json({ success: true, results: results });
  }).catch(function (err) {
    return res.status(500).json({ err: err });
  });
});

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});
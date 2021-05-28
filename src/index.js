import express from "express";
import passport from "passport";
import bodyParser from "body-parser";
import cors from "cors";
import models from "./models";
import { profileStorage, uploadLetter, surveyor } from "../config/multer";
import db from "./models";
// const cloudinary = require('cloudinary');
const { cloudinary } = require("./util/Cloudinary");

const app = express();

app.use(bodyParser.json());

let port = process.env.PORT || 8005; // set the view engine to ejs
app.set("view engine", "ejs");

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + "/public"));

app.use(cors());

// force: true will drop the table if it already exits
// models.sequelize.sync({ force: true }).then(() => {
models.sequelize.sync().then(() => {
  console.log("Drop and Resync with {force: true}");
});

// passport middleware
app.use(passport.initialize());

// passport config
require("./config/passport")(passport);

//default route
app.get("/", (req, res) => res.send("Hello my World"));
require("./routes/Director.js")(app);
require("./routes/user.js")(app);
app.post("/api/image/upload", profileStorage.array("image"), (req, res) => {
  const data = req.files;
  const {
    today,
    form_no,
    application_type,
    application_name,
    amount,
    address,
    phone,
    other_Info,
    tp_no,
    land_no,
    amount_paid,
    reciept_no,
    application,
    email,
    generate,
    forward_by,
  } = req.body;
  console.log(req.body);
  db.sequelize
    .query(
      `INSERT INTO application_form(application_date,form_no,type,name,amount,address,phone,other_info,tp_no,file_no,amount_paid,reciept_no,status,forward_to,email,commissioning,forward_by) VALUES
       ('${today}','${form_no}','${application_type}','${application_name}','${amount}','${address}','${phone}','${other_Info}','${tp_no}','${land_no}','${amount_paid}','${reciept_no}','${application}','Director Land','${email}','${generate}','${forward_by}')`
    )
    .then(() => {
      if (data) {
        data.forEach((item) => {
          console.log(data);
          let arr = [];

          arr.push(item.path);
          arr.push(req.body.form_no);
          console.log(arr);
          db.sequelize.query(
            `INSERT INTO images(id, image_url) VALUES ('${arr[0]}')`
          );
        });
      }
    })
    .then((result) => {
      db.sequelize
        .query(`UPDATE INTO application_form SET image_id=${result["id"]}')`)
        .then()
        .catch((err) => res.json({ success: false, err }));

      if (raresultw) res.json({ success: true, raw });
    })
    .catch((err) => res.json({ success: false, msg: err }));
});

app.post(
  "/api/letter/images/upload",
  uploadLetter.array("image"),
  (req, res) => {
    db.sequelize
      .query(
        `INSERT INTO letter_of_stakeholder(select_letter_template, selectedcc, remarks) 
        VALUES ('${req.body.selectLetter}','${req.body.selectCC}','${req.body.remarks}')`
      )
      .then(() => {
        const data = req.files;
        if (req.files) {
          data.forEach((item) => {
            let arr = [];
            arr.push(item.path);
            db.sequelize.query(
              `INSERT INTO images( image_url) VALUES ("${arr}")`
            );
          });
        }
      })
      .then((results) => res.json({ success: true, results }))
      .catch((err) => res.status(500).json({ err }));
  }
);

app.post("/api/surveyor/images/upload", surveyor.array("image"), (req, res) => {
  const data = req.files;
  db.sequelize
    .query(
      `INSERT INTO surveyor_report(select_letter_template, selectedcc, remarks) VALUES ("${req.body.selectFile}","${req.body.selectTemplate}","${req.body.remarks}")`
    )
    .then(() => {
      if (data) {
        data.forEach((item) => {
          let arr = [];
          arr.push(item.path);
          db.sequelize.query(
            `INSERT INTO images( image_url) VALUES ("${arr}")`
          );
        });
      }
    })
    .then((results) => res.json({ success: true, results }))
    .catch((err) => res.status(500).json({ err }));
});

app.post("/api/image/upload", async (req, res) => {
  try {
    const image = req.body;
    console.log(image);
    const uploadedReponse = await cloudinary.uploader.upload(`${image}`, {
      upload_preset: "myimage",
    });
    console.log(uploadedReponse);
    res.json({ msg: "uploaded" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "not uploaded" });
  }
});

//create a server
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});

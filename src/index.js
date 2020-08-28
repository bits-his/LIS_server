import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import cors from 'cors';
import models from './models';
import { profileStorage, uploadLetter, surveyor } from '../config/multer';
import db from './models';
// const cloudinary = require('cloudinary');
const { cloudinary } = require('./util/Cloudinary');

const app = express();

app.use(bodyParser.json());

let port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

app.use(cors());

// force: true will drop the table if it already exits
// models.sequelize.sync({ force: true }).then(() => {
models.sequelize.sync().then(() => {
  console.log('Drop and Resync with {force: true}');
});

// passport middleware
app.use(passport.initialize());

// passport config
require('./config/passport')(passport);

//default route
app.get('/', (req, res) => res.send('Hello my World'));
require('./routes/Director.js')(app);
require('./routes/user.js')(app);

app.post('/api/image/upload', profileStorage.array('image'), (req, res) => {
  const data = req.files;
  db.sequelize
    .query(
      `INSERT INTO registry(Acknolegment_id, registry_date, tag_no, remarks, file_from, file_to) VALUES ("${req.body.acknowlegment_id}","${req.body.today}","${req.body.tag}","${req.body.remark}","${req.body.from}","${req.body.forwardTo}")`
    )
    .then(() => {
      db.sequelize.query(
        `INSERT INTO remarks(remarks_id,date_of_remarks,tag_no,remarks) VALUES ("${req.body.acknowlegment_id}","${req.body.today}","${req.body.tag}","${req.body.remark}")`
      );
    })
    .then(() => {
      if (data) {
       
        data.forEach((item) => {
          let arr = [];
          arr.push(item.path);
          db.sequelize.query(
            `INSERT INTO image_table( image_url) VALUES ("${arr}")`
          );
        });
      }
    })
    .then((results) => res.json({ success: true, results }))
    .catch((err) => res.json({ success: false, err }));
});

app.post(
  '/api/letter/images/upload',
  uploadLetter.array('image'),
  (req, res) => {
    db.sequelize
      .query(
        `INSERT INTO letter_of_stakeholder(select_letter_template, selectedcc, remarks) VALUES ("${req.body.selectLetter}","${req.body.selectCC}","${req.body.remarks}")`
      )
      .then(() => {
        const data = req.files;
        if (req.files) {
          data.forEach((item) => {
            let arr = [];
            arr.push(item.path);
            db.sequelize.query(
              `INSERT INTO image_table( image_url) VALUES ("${arr}")`
            );
          });
        }
      })
      .then((results) => res.json({ success: true, results: results[0] }))
      .catch((err) => res.status(500).json({ err }));
  }
);

app.post('/api/surveyor/images/upload', surveyor.array('image'), (req, res) => {
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
            `INSERT INTO image_table( image_url) VALUES ("${arr}")`
          );
        });
      }
    })
    .then((results) => res.json({ success: true, results: results[0] }))
    .catch((err) => res.status(500).json({ err }));
});
// app.post('/api/image/upload', async (req, res) => {
//   try {
//     const image = req.body;
//     console.log(image)
//     const uploadedReponse = await cloudinary.uploader.upload(`${image}`,{
//       upload_preset:"myimage"
//     })
//     console.log(uploadedReponse)
//     res.json({msg:'uploaded'})
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({msg:"not uploaded"})
//   }
// });

//create a server
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});

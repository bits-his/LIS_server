import express from "express";
import passport from "passport";
import cors from "cors";
import models from "./models";
// import { profileStorage, uploadLetter, surveyor } from "../config/multer";
// import db from "./models";
// const cloudinary = require('cloudinary');
const { cloudRoute } = require("./util/Cloudinary");

const app = express();

app.use(express.json({limit:'50mb', extended: true, parameterLimit: 50000 }));

let port = process.env.APP_PORT || 8080; // set the view engine to ejs
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
// import other routes
require("./routes/GIS.js")(app);
require("./routes/Director.js")(app);
require("./routes/user.js")(app);
// require("./routes/PostGIS.js")(app);
cloudRoute(app);

// passport config
require("./config/passport")(passport);
//create a server
app.listen(port, function () {
  console.log(`App listening at http://localhost:${port}`);
});

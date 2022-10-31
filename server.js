const express = require('express')
const app = express()
const path = require('path');
require('dotenv').config()
const port = process.env.PORT || 3000
const userRouter = require("./routes/userRouter")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(userRouter)
var indexRouter = require("./routes/index");
// HTTP logger



// Template engine
app.set('view engine', 'pug');
app.set('views', './views');

var logger = require("morgan");
app.get('/register', function (req, res) {
  res.render('register');
})
//

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();


app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));



app.listen(port, () => console.log('> Server is up and running on port : ' + port))

// required libs : mongoose | colors
// run the following command
// npm i mongoose colors
app.use(express.json());
app.use(logger("start"));
app.use(express.urlencoded({ extended: false }));
const colors = require('colors');
const mongoose = require('mongoose')
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log('> Connected...'.bgCyan))
  .catch(err => console.log(`> Error while connecting to mongoDB : ${err.message}`.underline.red))

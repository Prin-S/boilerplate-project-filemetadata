const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");

// Set up multer to handle file upload
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Allows file upload
app.post("/api/fileanalyse", upload.single("upfile"), (req, res, next) => {
  file = req.file;
  next();
}, (req, res) => {
  res.json({name: file.originalname, type: file.mimetype, size: file.size});
});

app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
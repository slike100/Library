// server.js
const express = require('express');
const app = express();
const db = require('./db');
const cors = require('cors');

//The fs module provides an API for interacting with the file system
const fs = require('fs');
const LibraryController = require('./controllers/LibraryController');
const port = process.env.PORT || 3001;

//CORS Access lift (we eventually want to add security using JWT and whitelist our platforms IP's)
app.use(cors());

//Routes to PDF of requirements using file system
app.get('/requirements', (req, res) => {
  var filePath = "/files/requirements.pdf";
// docs for __dirname -> https://nodejs.org/docs/latest/api/modules.html#modules_dirname
// docs for fs -> https://nodejs.org/docs/latest/api/fs.html
  fs.readFile(__dirname + filePath , function (err,data){
      res.contentType("application/pdf");
      res.send(data);
  });
});

//Route for all library API's (pointed to controller)
app.use('/library', LibraryController);

//Create a server that listens on port 8080 of your computer. (https://www.w3schools.com/nodejs/met_server_listen.asp)
app.listen(port, () => console.log(`Listening on port ${port}!`));

//Export Module in Node.js
//The module.exports or exports is a special object which is included in every JS file in the Node.js application by default.
//Module is a variable that represents current module and exports is an object that will be exposed as a module.
module.exports = app;

const express = require('express');
const bodyParser= require('body-parser');
const path = require("path");
const userRoutes = require('./Routes/user');
const chatRoutes = require('./Routes/chat');

const app = express();

require('./Db');

app.use(bodyParser.json());
app.use("/Images/ProfileImage", express.static(path.join("Images/ProfileImage")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);

module.exports = app;

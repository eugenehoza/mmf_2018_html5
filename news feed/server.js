const fs = require('fs');
const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const mongo = require("mongodb").MongoClient;

var urlencodedParser = bodyParser.urlencoded({ extended: false });
const url = "mongodb://localhost:27017/news";

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/html/registration.html');
});

app.post('/', urlencodedParser, (req, res) => {
  var loginDetails = {
    nickname : req.body.nickname,
    password : req.body.password
  };
  if (req.body.nickname.length<5 || req.body.password.length<5) return res.sendStatus(400);
  mongo.connect(url, (err, db) => {
    const dbo = db.db("news")
    const obj = {
      "nickname": loginDetails.nickname,
      "password": loginDetails.password
    }
    dbo.collection("users").insertOne(obj, (err, r) => {
      res.sendFile(__dirname + '/html/registration.html');
      db.close();
    });
  });
  console.log(req.body);
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/html/authorization.html');
});

app.listen(3000, function(){
  console.log('Listen to port 3000!');
});

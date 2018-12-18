const fs = require('fs');
const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const MongoClient = require("mongodb").MongoClient;

var urlencodedParser = bodyParser.urlencoded({ extended: false });
const url = "mongodb://localhost:27017/news";
//------------------------------------------------------------------------------
app.get('/regist', (req, res) => {
  res.sendFile(__dirname + '/html/registration.html');
});

app.post('/regist', urlencodedParser, (req, res) => {
  var registDetails = {
    nickname : req.body.nickname,
    password : req.body.password
  };
  if (req.body.nickname.length<5 || req.body.password.length<5) return res.sendStatus(400);
  MongoClient.connect(url, (err, db) => {
    const dbo = db.db("news")
    const obj = {
      "nickname": registDetails.nickname,
      "password": registDetails.password
    }
    dbo.collection("users").insertOne(obj, (err, r) => {
      res.sendFile(__dirname + '/html/registration.html');
      db.close();
    });
  });
  console.log(req.body);
});
//------------------------------------------------------------------------------
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/html/authorization.html');
});

app.post('/login', urlencodedParser, (req, res) => {
  var loginDetails = {
    nickname : req.body.yourNickname,
    password : req.body.yourPassword
  };
  if (req.body.yourNickname.length<5 || req.body.yourPassword.length<5) return res.sendStatus(400);
  MongoClient.connect(url, (err, db) => {
    const dbo = db.db("news")
    const obj = {
      "nickname": loginDetails.nickname,
      "password": loginDetails.password
    }
    dbo.collection("users").find({$and:[{nickname:loginDetails.nickname}, {password: loginDetails.password}]}).toArray((err, r) => {
      res.send(err || 'ok!');
      db.close();
    });
  });
  console.log(req.body);
});

app.listen(3000, function(){
  console.log('Listen to port 3000!');
});

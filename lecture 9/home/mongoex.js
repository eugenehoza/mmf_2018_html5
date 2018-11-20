const fs = require('fs');
const express = require('express');
const app = express();
const mongo = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/test";

app.get('/', (req, res) => { 
  res.send(fs.readFileSync('index.html', 'utf8'))
});

app.get('/test', (req, res) => { 
  mongo.connect(url, (err, db) => {
    res.send(err || "ok");
    db.close();
  });
});

app.get('/create', (req, res) => { 
  mongo.connect(url, (err, db) => {
    const dbo = db.db("test")
    dbo.createCollection("cars", function(err, r) {
      res.send(err || "created");
      db.close();
    });
  });
});

app.get('/insert', (req, res) => { 
  mongo.connect(url, (err, db) => {
    const dbo = db.db("test")
    const obj = {
      "name": "car " + Math.floor(Math.random()*100), 
      "vin": Math.floor(Math.random()*10000000)
    }
    dbo.collection("cars").insertOne(obj, function(err, r) {
      res.send(err || `inserted ${JSON.stringify(r, null, 4)}`);
      db.close();
    });
  });
});

app.get('/list', (req, res) => { 
  mongo.connect(url, (err, db) => {
    const dbo = db.db("test")
    dbo.collection("cars").find({}).toArray(function(err, r) {
      res.send(err || `returned: ${JSON.stringify(r, null, 4)}`);
      db.close();
    });
  });
});

app.listen(3000, () => console.log('listen 3000'))
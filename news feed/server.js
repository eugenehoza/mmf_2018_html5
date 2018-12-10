const fs = require('fs');
const express = require('express');
const app = express();
const mongo = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/news";

app.get('/', (req, res) => {
  res.send(fs.readFileSync(/*'index.html'*/, 'utf8'))
});

app.listen(5000, function(){
  console.log('Listening port 5000!')
});

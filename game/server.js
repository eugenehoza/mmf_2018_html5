const fs = require('fs');
const express = require('express');
const app = express();
const mongo = require("mongodb").MongoClient;
const PORT = 3000;
const bodyParser = require("body-parser");
const url = "mongodb://localhost:27017/test";

app.use(bodyParser.json());
app.use("/static", express.static("static"))

app.get('/',(req,res) => {
  console.log(1)
    res.send(fs.readFileSync('index.html','utf8'))
});

app.post('/registration', (req,res) => {
  if (req.body) {
    res.send('ok');
  } else {
    res.send('error');
  }
});

app.get('/login', (req,res) => {
  if (req.body) {
    res.send(JSON.stringify({_id: 12312312321}));
  } else {
    res.send('error');
  }
})

app.get('/start', (req,res) => {
  res.send(JSON.stringify({token: 'safasdgdhbfddfghjkoijuhgfdfgh'}));
})

app.post('/finish', (req,res) => {
  if (req.body) {
    res.send('ok');
  } else {
    res.send('error');
  }
})

app.get('/records', (req,res) => {
  let arr = new Array(100).fill({login:'fdsads',time:123213})
  res.send(JSON.stringify(arr));
})

app.get('/records/:id', (req,res) => {
  let arr = new Array(100).fill({login:req.params.id,time:123213})
  res.send(JSON.stringify(arr));
})



app.listen(PORT,()=>console.log(PORT))

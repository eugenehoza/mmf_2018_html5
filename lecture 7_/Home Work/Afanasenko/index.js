var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/button.html');
});

app.get('/addServ', function(req, res){
  var randPort = Math.floor(Math.random()*9000+1000);
  app.listen(randPort);
  res.send('Новый сервер запущен! Порт: ' + randPort);
  console.log('Порт: ' + randPort);
});

console.log('Server was created!')
app.listen(3000);

var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
  res.end('Все прошло успешно!');
});

server.listen(3000, 'localhost');
console.log('+++Просто проверка+++');

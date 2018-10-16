const http = require("http");

const server = http.createServer((req,resp) => 
	{
		resp.writeHead(200, {"Content-Type": "text/plain"});
		console.log("Request");
		resp.end("abcdedf123");
	}
);

server.listen(8081);

console.log("Server started up on 8081");
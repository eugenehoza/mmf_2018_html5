const express =  require('express');
const fs = require("fs");

const app = express();

app.get("/", function(req, res){
  res.write("<p>files list</p>");
  res.write("<ul>");
  const files = fs.readdirSync("files");
  for (const file in files){
    const fileName = files[file];
    res.write("<li><a href='file/"+fileName+"'>" + fileName + "</a>&nbsp;&nbsp;&nbsp;<a href='/file/delete/"+fileName+"'>x</a></li>");
  }
  res.write("</ul>");
  res.send();
});

app.get("/file/:filename", function(req, res){
  console.log("Attempt to file opening " + req.params.filename);
  const data = fs.readFileSync("files/"+req.params.filename);
  res.write(data);
  res.send();
});

app.get("/file/delete/:filename", function(req, res){
  console.log("Attept to delete file "+req.params.filename);
  fs.unlink("files/"+req.params.filename, function(err){
     if (err) throw err;
     res.redirect("/");
  });
});


const server = app.listen(8084, function(){
  console.log("Server was started.");
});

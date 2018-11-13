const express = require('express');
const app = express();
const fs = require('fs');


app.use('/static', express.static('static'));



app.get('/', (req,res)=>{
  res.send(fs.readFileSync('./index.html', 'utf8'))
});

app.listen(3000, ()=> console.log('listen 3000'))

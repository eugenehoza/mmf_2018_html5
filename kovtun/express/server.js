const fs = require('fs');
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

app.use('/static',express.static('static'));
app.use(bodyParser.json());

const data = require('./routes/data.js')
app.use('/data',data)

app.get('/', (req,res)=>{
  res.send(fs.readFileSync('./index.html', 'utf8'))
});

app.get('/last', (req,res)=>{
  res.send(fs.readFileSync('./last.txt', 'utf8'))
});
app.post('/last', (req,res)=>{
  fs.writeFile('./last.txt', req.body.last, (err) => {
    if(err) {
      res.sendStatus(400)
    }
    res.send('ok')
  })

});

app.listen(3000, ()=> console.log('listen 3000'))

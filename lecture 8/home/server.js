const fs = require('fs');
const express = require('express');
const app = express();
const router = express.Router();

const bodyParser = require("body-parser");

app.use('/static',express.static('static'));
app.use(bodyParser.json());

const andrey = require('./routes/andrey.js');
app.use('/andrey',andrey);

const dima = require('./routes/dima.js');
app.use('/dima',dima);

const vladaf = require('./routes/vladaf.js');
app.use('/vladaf',vladaf);

app.get('/', (req,res)=>{
  res.send(fs.readFileSync('./index.html', 'utf8'))
});

app.listen(3000, ()=> console.log('listen 3000'))

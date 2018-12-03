const express = require('express');
// const app = express();
const router = express.Router();
const fs = require('fs');
// const bodyParser = require("body-parser");
// app.use(bodyParser.json());

router.get('/', (req,res) => {
  fs.readdir(__dirname + '/../data', (err, result) => {
    if (err) {
      res.sendStatus(400)
    }
    res.send(result)
  })
})

router.get('/:name', (req,res) => {
  fs.readFile(__dirname + `/../data/${req.params.name}`, 'utf8', (err, result) => {   //name будет как имя файла или любое?
    if (err) {
      res.sendStatus(400)
    }
    res.send(result)   //что за результат передается и куда(обратно в edit(e)?)?
    // result передаётся как текст в xhr который его вызывает, здесь это xhr с гет запросом по адресу '/andrey/:name'

  })
})

router.post('/:name', (req,res) => {
  console.log(req.body.text)
  fs.writeFile(__dirname + `/../data/${req.params.name}`, req.body.text, (err) => {
    if (err) {
      res.sendStatus(400)
    }
    res.send('ok')
  })
})

module.exports = router

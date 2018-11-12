const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
const bodyParser = require("body-parser");
app.use(bodyParser.json());

router.get('/', (req,res) => {
  fs.readdir(__dirname + '/../data', (err, result) => {
    if (err) {
      res.sendStatus(400)
    }
    res.send(result)
  })
})
router.get('/:name', (req,res) => {
  fs.readFile(__dirname + `/../data/${req.params.name}`, 'utf8', (err, result) => {
    if (err) {
      res.sendStatus(400)
    }
    res.send(result)
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

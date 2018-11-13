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
    console.log(result)
    res.send(result)
  })
})
router.get('/:name', (req,res) => {
  fs.readFile(__dirname + `/../data/${req.params.name}`, 'utf8', (err, result) => {
    if (err) {
      res.sendStatus(400)
    }
    res.send({list: result})
  })
})
module.exports = router

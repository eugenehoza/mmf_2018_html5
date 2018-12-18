const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req,res) => {
  fs.readdir(__dirname + '/../data', (err, result) => {
    if (err) {
      res.sendStatus(400)
    }
    res.send(result)
  })
})

router.post('/:name', (req,res) => {
  let stats = fs.statSync(__dirname + `/../data/${req.params.name}`, 'utf8', (err,result) => {
    if (err) {
      res.sendStatus(400)
    }
  })
  res.send(' Имя: ' + req.params.name +
           '\n Путь: ' + 'mmf_2018_html5/lecture 8/home/data' +
           '\n Дата создания: ' + stats.birthtime +
           '\n Дата редактирования: ' + stats.mtime)
})

module.exports = router

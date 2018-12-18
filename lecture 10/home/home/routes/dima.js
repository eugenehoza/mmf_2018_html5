const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/last', (req,res)=>{
  res.send(fs.readFileSync('./last.txt', 'utf8'))
});
router.post('/last', (req,res)=>{
  fs.writeFile('./last.txt', req.body.last, (err) => {
    if(err) {
      res.sendStatus(400)
    }
    res.send('ok')
  })

});
module.exports = router

const fs = require('fs');
const express = require('express');
const sha256 = require('sha256');
const mongo = require("mongodb").MongoClient;
const app = express();
const PORT = 3000;
const MIN_PASSWORD_LENGTH = 8;
const MIN_USER_LENGTH = 8;
const bodyParser = require("body-parser");
const url = "mongodb://localhost:27017/test";
const ObjectID = require('mongodb').ObjectID;

app.use(bodyParser.json());
app.use("/images", express.static("images"))
app.use("/components", express.static("components"))
app.use("/scripts", express.static("scripts"))
app.use("/styles", express.static("styles"))
app.use("/node_modules", express.static("node_modules"))


app.get('/',(req,res) => {
    res.send(fs.readFileSync('index.html','utf8'))
});

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
};
app.use(allowCrossDomain);

app.get('*', (req,res,next) => {
	next()
})

// ------------ гтово
app.post('/registration', (req,res) => {
  if (isValidityUser(req.body)) {
    findAndInsertByLogin(req.body, res)
  } else {
    res.send('error');
  }
});

//готово
app.post('/login', findByLogin)
//готово
app.get('/start', startGame)

app.post('/finish', finishGame)

app.get('/records', (req,res) => {
  mongo.connect(url, (err, db) => {
    const dbo = db.db("test")
    dbo.collection("finished_matches").find({}).toArray(function(err, result) {
      result = result.sort( (a,b) => a.time > b.time)

      dbo.collection("users").find({}).toArray(function(err, users) {
        result = result.map( (e) => {
          e = {
            time: e.time,
            login: users.find(q => ''+q._id === ''+e.user_id).login
          }
          return e
        })
        res.send(result.slice(0,100));
        db.close();
      });

    });
  });
})

app.get('/records/:login', (req,res) => {
  mongo.connect(url, (err, db) => {
    const dbo = db.db("test")
    dbo.collection('users').findOne({login: req.params.login}, (err,r) => {
      dbo.collection("finished_matches").find({}).toArray(function(err, result) {
        result = result.filter( (e) => ''+e.user_id === ''+r._id).sort( (a,b) => a.time > b.time).map(e => ({time:e.time}))
        res.send(result.slice(0,100));
        db.close();
      });
    })
  });
})
//______________________________________________________
function startGame(req,res) {
  insertOneInCollection('begin_matches', {token:sha256(new Date() + 'cards')},res)
}

function finishGame(req,res) {
  findFildAndUpdate('begin_matches',req.body,res)
}
function findFildAndUpdate(nameCollection,newFild, res) {
  mongo.connect(url, (err, db) => {
    const dbo = db.db("test")
    dbo.collection(nameCollection).findOne({_id: ObjectID(newFild.match_id)}, (err,result) => {
      if (result !== null && result.token === newFild.token) {
        insertOneInCollection('finished_matches', {user_id:  ObjectID(newFild.user_id), time: newFild.time}, res)
      } else {
        res.send('error')
        db.close()
      }
    })

  });
}
function isValidityUser(user) {
  if ( !(typeof user.login === 'string') &&
  !(user.login.length >= MIN_USER_LENGTH) ) {
      return false
  } else if ( !(typeof user.password === 'string') &&
    !(user.password.length >= MIN_PASSWORD_LENGTH) ) {
    return false
  }
  return true
}

function findByLogin(req, res) {
  mongo.connect(url, (err, db) => {
    const dbo = db.db("test")
    dbo.collection('users').findOne({login: req.body.login}, (err, result) => {
      if (result !== null &&  result.password === req.body.password) {
        res.send({id:result._id})
      } else {
        res.send('error')
      }
    });
  });
}

function findAndInsertByLogin(user, response) {
  mongo.connect(url, (err, db) => {
    const dbo = db.db("test")
    dbo.collection('users').findOne({login: user.login}, (err, result) => {
      if (result) {
        response.send('error')
      } else {
        insertOneInCollection('users', user, response)
      }
    });
  });
}
function createCollection(nameCollection) {
  mongo.connect(url, (err, db) => {
    const dbo = db.db("test")
    dbo.createCollection(nameCollection, function(err, result) {
      res.send(err || "created");
      db.close();
    });
  });
}
function insertOneInCollection(nameCollection, fild, res) {
  mongo.connect(url, (err, db) => {
    const dbo = db.db("test")
    dbo.collection(nameCollection).insertOne(fild, function(err, result) {
      if ( fild.hasOwnProperty('token') ) {
        res.send(err || {token: fild.token, _id: result.ops[0]._id});
      } else {
        res.send(err || `ok`);
      }
      db.close();
    });
  });
}
function findFild(nameCollection, id) {
  mongo.connect(url, (err, db) => {
    const dbo = db.db("test")
    dbo.collection(nameCollection).find({_id: id}).toArray(function(err, result) {
      res.send(result)
    });
  });
}
//______________________________________________________

app.listen(PORT,()=>console.log(PORT))

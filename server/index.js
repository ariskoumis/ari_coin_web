const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/ari_coin_web';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Setup express endpoints
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/attemptLogin', (req, res) => {
    const user = {
      username: req.query.username,
      password: req.query.password
    };
    var result_val = null;
    
    db.collection("users").findOne({username: user.username}, (err, result) => {
      res.setHeader('Content-Type', 'application/json');

      if (result == null) {
        res.send(JSON.stringify({
          result: 0,
          reason: "no account with that username exists."
        }));
      }
      if (result.password != user.password) {
        res.send(JSON.stringify({
          result: 0,
          reason: "invalid password"
        }));
      } else {
        res.send(JSON.stringify({
          result: 1
        }));
      }
      res.end();
    });
    
});

app.get('/api/createAccount', (req, res) => {
    const user = {
      username: req.query.username,
      password: req.query.password
    };

    db.collection("users").findOne({username: user.username}, (err, result) => {
      res.setHeader('Content-Type', 'application/json');

      if (result != null) {
        res.send(JSON.stringify({
          result: 0,
          reason: "An account with that username already exists."
        }));
      } else {
        db.collection("users").insert(user, (err, result) => {
          res.setHeader('Content-Type', 'application/json');
    
          if (err) { 
            res.send(JSON.stringify({
              result: 0
            }));
          } else {
            if (result.result.ok) { 
              res.send(JSON.stringify({
                result: 1
              }));
            } else {
              res.send(JSON.stringify({
                result: 0
              }));
            }
          }
          res.end();
        });
      }
    });
    
    
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);


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
        db.collection("app_state").insert(
          {
            property: "login_data",
            current_user: user.username,
            logged_in: true
          }
        );
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
              db.collection("app_state").insert(
                {
                  property: "login_data",
                  current_user: user.username,
                  logged_in: true,
                  admin: true
                }
              );

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

app.get('/api/userIsLoggedIn', (req, res) => {
  db.collection("app_state").findOne({property: "login_data"}, (err, result) => {
    res.setHeader('Content-Type', 'application/json');

    if (result == null) {
      res.send(JSON.stringify({
        result: 0,
        reason: "no account with that username exists."
      }));
    } else {
      res.send(JSON.stringify({
        result: 1
      }))
    }
    
    res.end();
  });
});

app.get('/api/getMarketValue', (req, res) => {
  db.collection("app_state").findOne({property: "market_value"}, (err, result) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      result: result.value 
    }));
  })
});

app.get('/api/getMiningCap', (req, res) => {
  db.collection("app_state").findOne({property: "mining_cap"}, (err, result) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      result: result.value 
    }));
  })
});

app.get('/api/updateCoinData', (req, res) => {
  db.collection("app_state").update(
    {property: "market_value"},
    {
      property: "market_value",
      value: +req.query.market_value
    }
  );

  db.collection("app_state").update(
    {property: "mining_cap"},
    {
      property: "mining_cap",
      value: +req.query.mining_cap
    }
  );

  res.send(JSON.stringify({
    result: 1 
  }));
})

app.get('/api/currentUserIsAdmin', (req, res) => {
  db.collection("app_state").findOne({property: "login_data"}, (err, result) => {
    res.setHeader('Content-Type', 'application/json');

      res.send(JSON.stringify({
        result: result.admin
      }));
    
    res.end();
  });
});

app.get('/api/logout', (req, res) =>{
  db.collection("app_state").remove({property: "login_data"});
});


app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);


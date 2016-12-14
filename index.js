var express = require('express');
var app = express();
var mustacheExpress = require('mustache-express');
var bodyParser = require('body-parser');

var Game = require('./game');
var Action = require('./action');

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Host front end app static files...
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('documentation', {});
});

app.post('/games', function(req, res, next) {
  var game = new Game(req.body);
  game.save(function(errors) {
    if (errors) {
      res.json(errors);
    } else {
      res.json(game.document);
    }
  });
});

/*
  This end point is used to make a move.
  We record the action and move dice onto the board.
  Required fields:
  player (Integer) which player moved: should go up one until max. then back to 0
  claimNumber (Integer) number of die claimed (should increment by at least 1)
  claimFace: (Integer) the face of the die claimed (1-6)

  moveNumber (Integer) number of die moved onto the board
  moveFace: (Integer) the face of the die moved onto the board
 */
app.post('/games/claim', function(req, res) {
  Game.find(req.body.id, function(game) {
    Action.add(game, {
      actionType: "claim",
      claimNumber: parseInt(req.body.claimNumber),
      claimFace: parseInt(req.body.claimFace),
      player: parseInt(req.body.player),
      moveFace: parseInt(req.body.moveFace),
      moveNumber: parseInt(req.body.moveNumber),
    }, function() {
      res.json(game);
    });
  });
});

/* this endpoint returns true or false based on whether the last claim exists */
app.post('/games/:id/challenge', function(req, res) {
  Game.find(req.params.id, function(game) {
    Action.add(game, {
      actionType: "challenge",
      player: req.body.player
    }, function(result) {
      res.json(result);
    });
  });
});

/* List all the games */
app.get('/games', function(req, res) {
  Game.all(function(results) {
    res.json(results);
  });
});

/* Get one game by id */
app.get('/games/:id', function(req, res) {
  Game.find(req.params.id, function(game) {
    res.json(game.document);
  });
});

var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening on port %s', port);
});

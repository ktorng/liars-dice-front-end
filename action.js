var Action = function() {}

Action.removeDice = function(game, num, face, player) {
  var numberInHand = this.numberInHand(game.document.playerHands[player], face);

  if (numberInHand < num) {
    return {
      error: "Dice not in hand"
    }
  }
  // Now assume all is peaches

  // can't use filter as we need to remove the "num" instead of all
  for(var i=0; i<num; i++) {
    var index = game.document.playerHands[player].indexOf(face);
    if (index > -1) {
      game.document.playerHands[player].splice(index, 1);
      game.document.board.unshift(face);
    }
  }
  return {};
};

Action.add = function(game, action, cb) {
  game.document.actions.unshift(action);

  if (action.actionType == "claim") {
    // need to move the dice from player to board;
    var result = this.removeDice(game, action.moveNumber, action.moveFace, action.player);
    if (result.errors) {
      cb(result);
    } else {
      game.save(function() {
        cb();
      });
    }
  } else if (action.actionType == "challenge") {
    var result = this.challenge(game, action.challengeNumber, action.challengeFace);
    game.save(function() {
      cb(result);
    });
  }
};

Action.challenge = function(game, num, face) {
  var self = this;

  // add up all of face in all hands and board
  var inPlayerHands = game.document.playerHands.reduce(function(accumulator, currentPlayerHand) {
    return accumulator + self.numberInHand(currentPlayerHand, face);
  }, 0);

  var total = inPlayerHands + this.numberInHand(game.document.board, face);

  return total >= num;
};

Action.numberInHand = function(hand, face) {
  return hand.reduce(function(accumulator, current) {
    if (current == face) {
      return accumulator + 1;
    }
    return accumulator;
  }, 0);
}

module.exports = Action;

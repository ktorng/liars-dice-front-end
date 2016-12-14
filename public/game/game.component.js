'use strict';

angular
  .module('game')
  .component('game', {
    templateUrl: 'game/game.template.html',
    controller: ['Game', '$location',
      function gameController(Game, $location) {
        this.gameId = localStorage.getItem('gameId');
        // default current turn to first player
        this.currentPlayer = 0;
        this.currentHand = [];
        this.game = Game.get({ id: this.gameId }, (data) => {
          console.log(data);
          // if game is in progress, update current player based on length of actions taken
          if (data.actions.length > 0) {
            this.currentPlayer = data.actions.length % data.numPlayers;
          }
          // get hand of current player
          this.currentHand = data.playerHands[this.currentPlayer];
        });

        // redirect to menu
        this.leaveGame = () => {
          $location.path('/menu');
        };
      }
    ]
  });

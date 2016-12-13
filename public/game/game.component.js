'use strict';

angular
  .module('game')
  .component('game', {
    templateUrl: 'game/game.template.html',
    controller: ['Game',
      function gameController(Game) {
        this.gameId = localStorage.getItem('gameId');
        // default current turn to first player
        this.currentTurn = 0;
        this.game = Game.get({ id: this.gameId }, (data) => {
          console.log(data);
          // if game is in progress, update current turn based on length of actions taken
          if (data.actions.length > 0) {
            this.currentTurn = this.game.actions.length % this.game.numPlayers;
          }
        });
      }
    ]
  });

'use strict';

angular
  .module('game')
  .component('game', {
    templateUrl: 'game/game.template.html',
    controller: ['Game',
      function gameController(Game) {
        this.gameId = localStorage.getItem('gameId');
      }
    ]
  });

'use strict';

// register `menu` component, along with its associated template and controller
angular
  .module('menu')
  .component('menu', {
    templateUrl: 'menu/menu.template.html',
    controller: ['Game', '$location',
      function menuController(Game, $location) {
        // default to 5 dice
        this.numDice = 5;

        // use the Game resource to post a new game
        this.createGame = () => {
          Game.save({ numPlayers: this.numPlayers, numDice: this.numDice }, (data) => {
            localStorage.setItem('gameId', data._id);
            $location.path('/game');
          })
        };
      }
    ]
  });

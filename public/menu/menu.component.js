'use strict';

// register `menu` component, along with its associated template and controller
angular
  .module('menu')
  .component('menu', {
    templateUrl: 'menu/menu.template.html',
    controller: ['Game',
      function menuController(Game) {
        this.createGame = () => {
          console.log(this.numPlayers)
        }
      }
    ]
  });

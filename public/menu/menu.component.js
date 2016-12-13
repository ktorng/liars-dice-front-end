'use strict';

// register `menu` component, along with its associated template and controller
angular
  .module('menu')
  .component('menu', {
    templateUrl: 'menu/menu.template.html',
    controller: ['$mdDialog',
      function menuController($mdDialog) {
        this.showInstructionsDialog = () => {
          $mdDialog.show({
            contentElement: '#instructionsDialog',
            clickOutsideToClose: true
          });
        };
      }
    ]
  });

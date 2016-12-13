'use strict';

angular
  .module('toolbar')
  .component('toolbar', {
    templateUrl: 'toolbar/toolbar.template.html',
    controller: ['$mdDialog',
      function toolbarController($mdDialog) {
        this.showInstructionsDialog = () => {
          $mdDialog.show({
            contentElement: '#instructionsDialog',
            clickOutsideToClose: true
          });
        };
      }
    ]
  });

'use strict';

// configure app module
angular
  .module('liarsDice')
  .config([
    '$mdThemingProvider',
    function($mdThemingProvider) {
      $mdThemingProvider
        .theme('default')
        .primaryPalette('teal');
    }
  ])
  .config([
    '$locationProvider',
    '$routeProvider',
    function($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider
        .when('/menu', {
          template: '<menu flex layout="column"></menu>'
        })
        .when('/game', {
          template: '<game flex layout="row"></game>',
          // only load game module if an id exists in local storage
          resolve: {
            check: function($location) {
              if (!localStorage.getItem('gameId')) $location.path('/menu');
            }
          }
        })
        .otherwise({redirectTo: '/menu'});
    }
  ]);

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
        .otherwise({redirectTo: '/menu'});
    }
  ]);

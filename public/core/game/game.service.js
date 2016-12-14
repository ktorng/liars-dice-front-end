'use strict';

angular
  .module('core.game')
  .factory('Game', ['$resource',
    function($resource) {
      return $resource('games/:id', { id: '@_id' });
    }
  ])
  .factory('Claim', ['$resource',
    function($resource) {
      return $resource('games/claim');
    }
  ])
  .factory('Challenge', ['$resource',
    function($resource) {
      return $resource('games/challenge');
    }
  ]);

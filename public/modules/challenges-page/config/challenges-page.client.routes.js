'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
  function($stateProvider) {
    // Users state routing
    $stateProvider.
    state('challenges', {
      url: '/allchallenges',
      templateUrl: 'modules/challenges-page/views/all-challenges.client.view.html'
    });
  }
]);
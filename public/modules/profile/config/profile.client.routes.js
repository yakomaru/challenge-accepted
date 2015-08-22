'use strict';

//Setting up route
angular.module('profile').config(['$stateProvider',
	function($stateProvider) {
		// Profile state routing
		$stateProvider.
		state('friend-search', {
			url: '/friendsearch',
			templateUrl: 'modules/profile/views/friend-search.client.view.html'
		}).
		state('profile', {
			url: '/profile',
			templateUrl: 'modules/profile/views/profile.client.view.html'
		});
	}
]);
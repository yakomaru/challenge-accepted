'use strict';

angular.module('profile').factory('Friendsearch', ['$http',
	function($http) {
		// Friendsearch service logic
		// ...
		var search = function(userName){
      return $http({
        method: 'POST',
        data: {userName: userName},
        url: '/users/friends/search'
      })
      .then(function(response){
      	console.log(response);
        return response.data;
      },
      function(err){
        console.log(err);
      });
    };

		// Public API
		return {
			search: search
			
		};
	}
]);
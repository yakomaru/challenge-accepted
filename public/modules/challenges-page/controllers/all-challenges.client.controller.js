'use strict';

angular.module('challenges-page').controller('AllChallengesController', ['$scope', 'Authentication', 'Todo',
	function($scope, Authentication, Todo, $location) {

    $scope.authentication = Authentication;

    var getAllChallenges = function(){
      Todo.getAllChallenges()
      .then(function(res){
        $scope.allChallenges = [];
        for (var i = 0; i < res.data.length; i++){
            $scope.allChallenges.push(res.data[i]);
          }
      }, function(err){
        console.log(err);
      });

      return $scope.allChallenges;
    };

    getAllChallenges();
  }
]);
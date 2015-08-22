'use strict';

angular.module('profile').controller('ProfileController', ['$scope', 'Authentication', 'Todo',
	function($scope, Authentication, Todo) {
		// Controller Logic
		// ...
    $scope.authentication = Authentication;

      $scope.getUserChallenges = function(){
      Todo.getUserChallenges()
      .then(function(res){
        console.log('getUserChallenges res.data');
        console.log(res.data);
        //sets scope.userChallenges to the array of challenges the user is involved in
        $scope.userChallenges = res.data;
      }, function(err){
        console.log(err);
      })
      .then(function(res){
        //Returns array of all challenges available to user
         Todo.getAllChallenges()
        .then(function(res){
          //filters for challenges already attached to user
          $scope.allChallenges = [];
          for (var i = 0; i < res.data.length; i++){
            var toPush = true;
            for(var j = 0; j < $scope.userChallenges.length; j++){
              if (res.data[i]._id === $scope.userChallenges[j]._id){
                toPush = false;
              }
            }
            if(toPush){
              $scope.allChallenges.push(res.data[i]);
            }
          }
        }, function(err){
          console.log(err);
        });
      });
     };

    $scope.init =function(){
      $scope.getUserChallenges();
    };
    $scope.init();
	}
]);
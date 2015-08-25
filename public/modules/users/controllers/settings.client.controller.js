'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication', 'Todone',
	function($scope, $http, $location, Users, Authentication, Todone) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

    $scope.getUserOrg = function(){
      Todone.getUserOrg()
      .then(function(res){
        // console.log('getUserOrg res.data');
        console.log(res);
        //sets scope.userOrg to the array of challenges the user is involved in
        $scope.userOrg = res.data;
      }, function(err){
        console.log(err);
      })
      .then(function(res){
        //Returns array of all challenges available to user
         Todone.getAllOrg()
        .then(function(res){
          //filters for challenges already attached to user
          $scope.allOrg = [];
          for (var i = 0; i < res.data.length; i++){
            var toPush = true;
            for(var j = 0; j < $scope.userOrg.length; j++){
              if (res.data[i]._id === $scope.userOrg[j]._id){
                toPush = false;
              }
            }
            if(toPush){
              $scope.allOrg.push(res.data[i]);
            }
          }
        }, function(err){
          console.log(err);
        });
      });
     };

    $scope.addOrg = function(index){
      Todone.putUserOrg($scope.allOrg[index]._id)
      .then(function(res){
        $scope.getUserOrg();
      }, function(err){
        console.log(err);
      });
     };

    $scope.newOrg = {
      name: '',
      description: '',
      reward: 'null',
      tasks: []
    };

    $scope.addNewOrgName = function(){
      var data = document.getElementById('nameData').value;
      $scope.newOrg.name = data;
      document.getElementById('taskData').value = '';
    };

    $scope.submitOrg = function(){
      Todone.addOrg($scope.newOrg)
      .then(function(res){
        $location.path('/org-create');
      }, function(err){
        console.log(err);
      });
     };

     $scope.removeOrg = function(id){
      Todone.removeOrg(id);
      console.log('removing challenge');
      $scope.getUserOrg();
    };
    //Initialization function for getting initial user data

    // $scope.orgup = function(index){
    //   Todone.putUserOrg($scope.allOrg[index]._id)
    //   .then(function(res){
    //     $scope.getUserOrg();
    //   }, function(err){
    //     console.log(err);
    //   });
    //  };

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.init = function(){
      $scope.getUserOrg();
    };

    $scope.init();    
	}
]);
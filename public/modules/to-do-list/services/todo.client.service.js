'use strict';

angular.module('to-do-list').factory('Todo', ['$http',
  function($http) {

    //Requests list of user tasks from the server
    var getUserTasks = function(){
      return $http({
        method: 'GET',
        url: '/users/tasks'
      })
      .then(function(response){
        return response;
      },
      function(err){
        console.log(err);
      });
    };

    //retrieves array of user challenges from the db
    var getUserChallenges = function(){
      return $http({
        method: 'GET',
        url: '/users/challenges'
      })
      .then(function(response){
        return response;
      },
      function(err){
        console.log(err);
      });
    };

    //retrieves all available challenges from the db
    var getAllChallenges = function(){
      return $http({
        method: 'GET',
        url: '/challenges'
      })
      .then(function(response){
        return response;
      },
      function(err){
        console.log(err);
      });
    };
    //Adds a challenge to user
    var putUserChallenge = function(id){
      return $http({
        method: 'PUT',
        url: '/users/challenges',
        data: {_id: id}
      })
      .then(function(response){
        return response;
      },
      function(err){
        console.log(err);
      });
    };

    var putUserTask = function(task){
      return $http({
        method: 'PUT',
        url: '/users/tasks',
        data: task
      })
      .then(function(response){
        return response;
      },
      function(err){
        console.log(err);
      });
    };

    //Remove Task
    var removeTask = function(index){
      return $http({
        method: 'POST',
        url: '/users/tasks',
        data: {index: index}
      }).then(function(response){
        return response;
      },
      function(err){
        console.log(err);
      });
    };

    //Change
    var updateUserTask = function(taskId){
      return $http({
        method: 'PUT',
        url: '/users/tasks/update',
        data: {taskId: taskId}
      })

      .then(function(response){
        return response;
      },
      function(err){
        console.log(err);
      });
    };

    var updateChallengeTask = function(taskId, challengeId){
      return $http({
        method: 'PUT',
        url: '/users/tasks/update',
        data: {taskId: String(taskId), challengeId: String(challengeId) }
      })
      .then(function(response){
        return response;
      },
      function(err){
        console.log(err);
      });
    };

    var addChallenge = function(data){
      return $http({
        method: 'PUT',
        url: '/challenges',
        data: data
      })
      .then(function(response){
        return response;
      },function(err){
        console.log(err);
      });
    };

    //Remove Challenge Task
    var removeChallengeTask = function(challengeIndex,index){
      return $http({
        method: 'POST',
        url: '/users/challenges/tasks/remove',
        data: {index: index,
              challengeIndex: challengeIndex}
      })
      .then(function(response){
        return response;
      },function(err){
        console.log(err);
      });
    };

    var removeChallenge = function(index){
      return $http({
        method: 'PUT',
        url: '/users/challenges/remove',
        data: {index: index}
      }).then(function(response){
        return response;
      },function(err){
        console.log(err);
      });
    };

    var checkChallengeComplete = function(index){
      return $http({
        method: 'POST',
        url: '/users/challenges/check',
        data: {index: index}
      }).then(function(response){
        console.log("Http response for checkChallengeComplete" +response);
        return response;
      },function(err){
        console.log(err);
      });
    };

    //curl -H "Content-Type: application/json" -X PUT -d '{"name":"test me","description":"test info","reward":"stuff","tasks":[{"description": "one day", "relativeDate": 1},{"description": "two day", "relativeDate": 2}]}' https://heraapphrr7.herokuapp.com/challenges

    // var removeUserTask = function(id){
    //  return $http({
    //     method: 'PUT',
    //     url: '/users/tasks/remove',
    //     data: {_id: id}
    //   })
    //   .then(function(response){
    //     return response;
    //   },
    //   function(err){
    //     console.log(err);
    //   });
    // };



    // Public API
    return {
      getUserTasks: getUserTasks,
      getUserChallenges: getUserChallenges,
      getAllChallenges: getAllChallenges,
      putUserChallenge: putUserChallenge,
      putUserTask: putUserTask,
      updateUserTask: updateUserTask,
      updateChallengeTask: updateChallengeTask,
      addChallenge: addChallenge,
      removeTask: removeTask,
      removeChallengeTask: removeChallengeTask,
      removeChallenge: removeChallenge,
      checkChallengeComplete: checkChallengeComplete
		};
	}
]);

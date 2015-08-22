'use strict';

angular.module('to-do-list').controller('UserToDoController', ['$scope', 'Authentication', 'Todo', '$location',

  function($scope, Authentication, Todo, $location) {
    // Controller Logic
    $scope.authentication = Authentication;



    //calls Todo.getUserTasks which returns the users tasks
    $scope.getUserTasks = function(){
      Todo.getUserTasks()
      .then(function(res){
        //sets scope.tasks to the array of user tasks
        $scope.tasks = res.data;
        console.log($scope.tasks);
      }, function(err){
        console.log(err);
      });
     };
    //calls Todo.getUserChallenges which returns the array of challenges attached to the user and updates allChallenges
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


    $scope.addChallenge = function(index){
      Todo.putUserChallenge($scope.allChallenges[index]._id)
      .then(function(res){
        $scope.getUserChallenges();
      }, function(err){
        console.log(err);
      });
     };

    $scope.addUserTask = function(){
      var data = document.getElementById('taskData').value;
      var task = {description: data, completed: false, rewards: null};
      Todo.putUserTask(task)
      .then(function(res){
        document.getElementById('taskData').value = '';
        $scope.getUserTasks();
      }, function(err){
        console.log(err);
      });
     };

     $scope.removeTask = function(index){
      Todo.removeTask(index);
      console.log('removing: ' + $scope.tasks[index].description);
      $scope.getUserTasks();
     };

    $scope.completeUserTask = function(index){
      Todo.updateUserTask($scope.tasks[index]._id)
      .then(function(res){
        $scope.getUserTasks();
      },function(err){
        console.log(err);
      });
    };

    $scope.completeChallengeTask = function(index){
      console.log('TASK ID');
      console.log(this.task._id);
      console.log('CHALLENGE ID');
      console.log(this.$parent.challenge._id);
      console.log('COMPLETED STATE BEFORE UPDATE');
      console.log(this.task.completed);
      Todo.updateChallengeTask(this.task._id, this.$parent.challenge._id) //this.task._id === right task
      .then(function(res){
        $scope.getUserChallenges();
      },function(err){
        console.log(err);
      });
    };

    $scope.nextDay = function(){
      $scope.today = new Date();
      $scope.dayModifier++;
      $scope.today.setDate($scope.today.getDate() + $scope.dayModifier);
      $scope.displayDay = $scope.today;
      $scope.prettyDate = $scope.displayDay.toDateString();
    };

    $scope.prevDay = function(){
      $scope.today = new Date();
      $scope.dayModifier--;
      $scope.today.setDate($scope.today.getDate() + $scope.dayModifier);
      $scope.displayDay = $scope.today;
      $scope.prettyDate = $scope.displayDay.toDateString();
    };

    $scope.checkDate = function(day){
      var itemDate = new Date(day);
      if (itemDate.getDate() !== $scope.displayDay.getDate()){
        return false;
      }
      if (itemDate.getMonth() !== $scope.displayDay.getMonth()){
        return false;
      }
      if (itemDate.getFullYear() !== $scope.displayDay.getFullYear()){
        return false;
      }
      else return true;
    };

    $scope.dayModifier = 0;
    $scope.displayDay = new Date();
    $scope.prettyDate = $scope.displayDay.toDateString();

    //Template Data -- This will be separated into another controller later
    $scope.newChallenge = {
      name: '',
      description: '',
      reward: 'null',
      tasks: []
    };

    $scope.addNewChallengeTask = function(){
      //Take a challenge task and push it into new challenge task
      var data = document.getElementById('taskData').value;
      $scope.newChallenge.tasks.push({description: data, relativeDate: $scope.dayModifier});
      document.getElementById('taskData').value = '';
    };

    $scope.addNewChallengeName = function(){
      var data = document.getElementById('nameData').value;
      $scope.newChallenge.name = data;
      document.getElementById('taskData').value = '';
    };

    $scope.checkRelativeDate = function(day){
      if(day === $scope.dayModifier){
        return true;
      }
    };

    $scope.submitChallenge = function(){
      Todo.addChallenge($scope.newChallenge)
      .then(function(res){
        $location.path('/user-to-do');
      }, function(err){
        console.log(err);
      });
     };

    //removeChallengeTasks
      $scope.removeChallengeTask = function(index){
      Todo.removeChallengeTask(index);
      console.log('removing: ' + $scope.tasks[index].description);
      $scope.getUserChallenges();
     };

    //Initialization function for getting initial user data
    $scope.init = function(){
      $scope.getUserTasks();
      $scope.getUserChallenges();
    };

    $scope.init();
  }
]);


///



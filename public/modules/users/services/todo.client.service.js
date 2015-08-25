'use strict';

angular.module('users').factory('Todone',['$http',
  function($http) {

    var getUserOrg = function(){
      return $http({
        method: 'GET',
        url: '/org-create'
      })
      .then(function(response){
        return response;
      },
      function(err){
        console.log(err);
      });
    };

    var getAllOrg = function(){
      return $http({
        url: '/org-create'
      })
      .then(function(response){
        return response;
      },
      function(err){
        console.log(err);
      });
    };

    var putUserOrg = function(id){
      return $http({
        method: 'PUT',
        url: '/org-create',
        data: {_id: id}
      })
      .then(function(response){
        return response;
      },
      function(err){
        console.log(err);
      });
    };


    var addOrg = function(data){
      return $http({
        method: 'PUT',
        url: '/org',
        data: data
      })
      .then(function(response){
        return response;
      },function(err){
        console.log(err);
      });
    };

    var removeOrg = function(index){
      return $http({
        method: 'PUT',
        url: '/org-create',
        data: {index: index}
      }).then(function(response){
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
      getAllOrg: getAllOrg,
      getUserOrg: getUserOrg,
      putUserOrg: putUserOrg,
      addOrg: addOrg,
      removeOrg: removeOrg
		};
	}
]);

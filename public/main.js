var mainApp = angular.module('mainApp', []);
mainApp.controller('mainController', function($scope, $http) {
  $scope.formData = {};
  $scope.value=true;
  $http.get("/dailygoal")
    .success(function(data) {
      $scope.dailygoals = data;
      console.log(data);
    })
    .error(function(data) {
      console.log(data);
    });

  $scope.createGoal = function() {
    $http.post('/dailygoals', $scope.formData)
      .success(function(data) {
        $scope.formData = {};
        $scope.dailygoals = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
    };


    $scope.deleteGoal = function(id) {
      console.log(id);
      $http.delete('/dailygoals/' + id)
        .success(function(data) {
          $scope.dailygoals = data;
          console.log(id);
        })
        .error(function(data) {
          console.log('Error: ');
        });
    };

});

var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function() {
  $http.get('/mywebpage').success(function(response) {
    console.log("I got the data I requested");
    $scope.mywebpage = response;
    $scope.info = "";
  });
};

refresh();

$scope.addInfo = function() {
  console.log($scope.info);
  $http.post('/mywebpage', $scope.info).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/mywebpage/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/mywebpage/' + id).success(function(response) {
    $scope.info = response;
  });
};  

$scope.update = function() {
  console.log($scope.info._id);
  $http.put('/mywebpage/' + $scope.info._id, $scope.info).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.info = "";
}

}]);﻿
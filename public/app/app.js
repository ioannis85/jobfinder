angular.module('app',[])
.controller('testCtrl',function($scope, $http){
$http.get('../api/jobs').then(function(response){
$scope.jobs = response.data;
});
});

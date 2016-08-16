angular.module('app',[])
.controller('testCtrl',function($scope){
$scope.jobs=[
  { title: 'Sales Person', description:'you will fight dragons'},
  { title: 'Accoutant', description:'you will use the keyboard'}];
});

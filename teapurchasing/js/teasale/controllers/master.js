angular.module('teasale').controller('MasterCtrl', function ($scope,$http,$state,coverAuth) {
  //$scope.login=coverAuth.login($scope.user);
  
  $scope.logout = coverAuth.logout;
  $scope.autoLogin = coverAuth.autoLogin;
  $scope.register = coverAuth.register;
  $scope.currentUser = null;
  coverAuth.onCurrentUserChange(function (user) {
    
    $scope.currentUser = user;
   
  });

  coverAuth.autoLogin();
  
});

angular.module('teasale').controller('UserCtrl', function ($location, $state, $scope, $location, $http, coverAuth,$stateParams, Upload) {
    console.log($scope.currentUser);
    if ($scope.currentUser==null) {
        sessionStorage['history'] = $location.path();
        $state.go('login');
    }
    $scope.logout=function(){
      delete localStorage['user'];
      $state.go('login');
    };

    $scope.avatarSource = "/images/userphoto.jpg";

    $scope.readAvatar = function (result) {

        var file = document.getElementById('avatar-student');
        if (typeof FileReader === 'undefined') {
            result.innerHTML = "抱歉，你的浏览器不支持 FileReader";
            input.setAttribute('disabled', 'disabled');
        } else {
            file.addEventListener('change', readFile, false);
        }
    };

    $scope.jumporder = function(){
        $scope.samepage+=1;
        $location.path('/user/order/',reload=true).search({param: null});
        $scope.searchthebook.thename = null; 
    }

    function readFile() {

      Upload.upload({
          url: '/api/image/head/upload?accountId='+$scope.currentUser.account.id,
          data: { 
              picture: this.files[0]
          }
      }).then(function (resp) {
          var getUser={
            method: 'GET',
            url: '/api/customer/'+$scope.currentUser.id,
          }; 
          $http(getUser).then(function (res) {
            $scope.currentUser=res.data.data;
            coverAuth.setCurrentUser($scope.currentUser);
            localStorage['user'] = JSON.stringify($scope.currentUser);
          });
      })
    }
    $scope.searchthebook = {thename: null};
    $scope.samepage=0;
    $scope.searchbook = function() {
      //console.log($location.path());
      if($location.path()=='/user/order/'){
        $scope.samepage+=1;
        $location.path('/user/order/',reload=true).search({param: $scope.searchthebook.thename});
        $scope.searchthebook.thename = null; 
      }
      else{
        if($location.path()=='/user/userfund/'){
          $scope.samepage+=1;
          $location.path('/user/userfund/',reload=true).search({param: $scope.searchthebook.thename});
          $scope.searchthebook.thename = null;  
        }
        else{
          if($location.path()=='/user/usersource/'){
            $scope.samepage+=1;
            $location.path('/user/usersource/',reload=true).search({param: $scope.searchthebook.thename});
            $scope.searchthebook.thename = null;  
          }
          else{
            $location.path('/main/list/',reload=true).search({param: $scope.searchthebook.thename});
            $scope.searchthebook.thename = null;  
          }
        }
      }  
    };
});
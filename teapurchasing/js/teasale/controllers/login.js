angular.module('teasale').controller('LoginCtrl', function ($location,$state, $scope, $http, coverAuth) {
  $scope.login = function() {
    var user = {
      "tel": $scope.user.tel,
      "password": $scope.user.password
    };
    var reqAdd = {
      method: 'POST',
      url: '/api/customer/login',
      data: JSON.stringify(user)
    };
    //console.log($scope.select);
    //console.log(reqAdd);
    $http(reqAdd)
      .success(function(data, header, config, status) {
        if(data.code==500){
          console.log(data);
          alert("用户名或密码错误");
        }
        else{
          if(localStorage['recent2']){
            localStorage.removeItem("recent2");
          };
          if(data.data){
            $scope.currentUser = data.data;
            console.log($scope.currentUser);
            coverAuth.setCurrentUser($scope.currentUser);
            localStorage['user'] = JSON.stringify($scope.currentUser);
            if(!sessionStorage['history']){
              $state.go('main.home', {
                reload: true
              });
            }
            else{
              $location.path(sessionStorage['history']);
            }
          }
          else{
            document.getElementById("login").disabled=false;
            alert('网络错误，请重试');
          }
        }        
      }).error(function(res) {
        document.getElementById("login").disabled=false;
        alert('网络错误');
      });
  };

});

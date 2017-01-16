angular.module('teasale')
.controller('PassChangeCtrl',
function ($scope, $http, $state, $modalInstance, user,$timeout,coverAuth) {
  $scope.user = user;
  $scope.submit = function () {
  		if($scope.password==null||$scope.code==null){
  			alert("请输入密码和验证码");
  		}
  		else{
          var data=
          {
            "password":$scope.password,
            "tel": $scope.user.tel,
            "verificationCode":$scope.code
          };
          console.log(data);
          var reqAdd = {
            method: 'PUT',
            url: '/api/customer/updatePassword',
            data: JSON.stringify(data)
          };
          $http(reqAdd).success(function(data,header,config,status){
            //响应成功
            if(data.code==500){
              console.log(data);
              alert('验证码输入错误');
            }
            else{
              alert('密码修改成功');
              $state.go('login'); 
              $modalInstance.dismiss('cancel');
              //location.reload();
            }
          }).error(function(data,header,config,status){
            alert('网络出错，请重试');
          });
	    }
  };
  $scope.getverification=function(){
    var reqAdd = {
        method: 'GET',
        url: '/api/sendMessage/password?mobile='+$scope.user.tel,
    };
    $http(reqAdd).then(function (res) {
      console.log(res);
      alert("验证码已发送至手机");
    });
  }
});

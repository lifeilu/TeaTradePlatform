angular.module('teasale').controller('PassFindCtrl', function ($location,$state, $scope, $http, coverAuth) {
  $scope.code = "";
  $scope.confirm=function(){
    if(!$scope.user.password||!$scope.user.password2||!$scope.user.tel||!$scope.code){
      alert('请填写所有必须信息');
    }
    else if($scope.user.password2!=$scope.user.password){
      alert('两次密码输入不一致');
    }
    else if(!isphone($scope.user.tel)){
      alert('手机格式错误');
    }
    else{
      var data=
        {
        "password":$scope.user.password,
        "tel": $scope.user.tel,
        "verificationCode":$scope.code
        };
       var reqAdd = {
          method: 'PUT',
          url: '/api/customer/updatePassword',
          data: JSON.stringify(data)
        };
         $http(reqAdd).success(function(data,header,config,status){
          //响应成功
          if(data.code==500){
            console.log(data);
            alert(data.data);
          }
          else{
            alert('密码重置成功');
            $state.go('login'); 
          }
          }).error(function(data,header,config,status){
            alert('网络出错，请重试');
          });
      }
  }

  $scope.getverification=function(phone){
    if(isphone(phone)){
      var reqAdd = {
          method: 'GET',
          url: '/api/sendMessage/password?mobile='+phone,
      };
      //获取手机验证码
      $http(reqAdd).then(function (res) {
        console.log(res);
        alert("验证码已发送至手机");
      });
    }
    else{
      alert('请输入有效手机号');
    }
  }

  function isphone(obj){
    var reg=/^1[0-9]{10}/;
      // if(!reg.test(obj.value)){
      //   return false;
      // }
      if(obj == null || obj.length!=11 || !obj.match(reg)){
        return false;
      }
      return true;
  }
});

angular.module('teasale').controller('RegisterCtrl', function ($location,$state, $scope, $http, coverAuth) {
  $scope.code = "";
  $scope.register=function(){
    if(!$scope.user.nickname||!$scope.user.password||!$scope.user.password2||!$scope.user.tel||!$scope.user.address||!$scope.user.zip||!$scope.user.verificationvar){
      alert('请填写所有必须信息');
    }
    else if($scope.user.password2!=$scope.user.password){
      alert('两次密码输入不一致');
    }
    else if(!isphone($scope.user.tel)){
      alert('手机格式错误');
    }
    else if(!iszip($scope.user.zip)){
      alert('邮编格式错误');
    }    
    else if(!validateCode($scope.user.verificationvar)){
      alert('验证码错误')
    }
    else{
      var data=
        {
        "nickname": $scope.user.nickname,
        "password":$scope.user.password,
        "tel": $scope.user.tel,
        "address": $scope.user.address,
        "zip":$scope.user.zip
        };
       var reqAdd = {
          method: 'POST',
          url: '/api/customer/register',
          data: JSON.stringify(data)
        };
         $http(reqAdd).success(function(data,header,config,status){
          //响应成功
          if(data.code==500){
            console.log(data);
            alert('手机号已被注册');
          }
          else{
            alert('注册成功');
            $state.go('login'); 
          }
          }).error(function(data,header,config,status){
            alert('网络出错，请重试');
          });
      }
  }
  $scope.getverification=function(phone){
    if(isphone(phone)){
      //$scope.verification=false;
      //$scope.vertime=60;
      var reqAdd = {
          method: 'GET',
          url: '/api/sendMessage/password?mobile='+phone,
      };
      //获取手机验证码
      $http(reqAdd).then(function (res) {
        console.log(res);
        $scope.code = res.data.data.code;
        alert("验证码已发送至手机");
      });
    }
    else{
      alert('请输入有效手机号');
    }
  }
  function validateCode(obj){
    if($scope.code==obj){
      return true
    }
    else{
      return false;
    }
  }
  /*var hello=function(){
    if($scope.vertime>0){
      $scope.vertime-=1;
    }
    else{
      $scope.verification=true;
    }
  }*/
  // var phonever=function(phone){
  //   return true;
  // }
  /*function validatePassword(obj) {
    var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    return obj != null && obj.match(reg);
  }*/

  function iszip(obj){
    var reg= /^[1-9][0-9]{5}$/;
      // if(!reg.test(obj.value)){
      //   return false;
      // }
      if(obj == null || obj.length!=6 || !obj.match(reg)){
        return false;
      }
      return true;
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
  function isemail(obj){
     //对电子邮件的验证
              var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
              if(!myreg.test(obj))
              {
                  //alert('提示\n\n请输入有效的E_mail！');
                  
                  return false;
             }
             return true;
  }
  function isvalidusername(obj){
    var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
    return !reg.test(obj);
  }
  $scope.p = '广东';
  $scope.c = '梅州';
  $scope.a = '平远县';
  return $scope.d = '大柘镇';
});

/**
 * Created by lulifei on 16/12/23.
 */
angular.module('myApp')
.controller('RegisterCtrl', function ($scope,$http,$location,baseUrl) {
    $scope.register=function(){
        if(!$scope.user.username||!$scope.user.password||!$scope.user.password2||!$scope.user.tel){
            alert('请填写所有必须信息');
        }
        else if($scope.user.password2!=$scope.user.password){
            alert('两次密码输入不一致');
        }
        else if(!isphone($scope.user.tel)){
            alert('手机格式错误');
        }
        else{
            var data= {
                "name": $scope.user.username,
                "tel": $scope.user.tel,
                "password":$scope.user.password
            };
            var reqAdd = {
                method: 'POST',
                url: baseUrl+'/api/manager/register',
                header: 'Content-Type:application/json',
                data: data
            };
            $http(reqAdd).success(function(data,header,config,status){
                //响应成功
                if(data.code==500){
                    alert('该手机号已注册!');
                }
                else{
                    alert('success!');
                    $location.path('/login');
                    //$state.go('login');
                }
            }).error(function(data,header,config,status){
                //处理响应失败
                //console.log(status);
                alert('短信验证码输入错误，请重新获取');
            });
        }
    };

    function isphone(obj){
        var reg=/^1[0-9]{10}/;
        return(!(obj == null || obj.length!=11 || !obj.match(reg)));
    }
});
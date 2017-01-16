/**
 * Created by lulifei on 16/12/24.
 */
angular.module('myApp')
    .controller('TeasellerAddCtrl', function ($scope,$http,$location,baseUrl) {
        var currentUser = localStorage['user'];
        if(currentUser == null) {
            $location.path('/');
        }
        $scope.sellerRegister = function(){
            var teaseller = {
                "name": $scope.user.name,
                "tel": $scope.user.tel,
                "password": $scope.user.password
            };
            var reqAdd = {
                method: 'POST',
                url: baseUrl + '/api/teaSaler/register',
                header: 'Content-Type:application/json',
                data: teaseller
            };
            $http(reqAdd)
                .success(function(data, config, status) {
                    if(data.data){
                        console.log(data.data);
                        alert('创建成功');
                        $location.path('/teaseller');
                    }
                    // else{
                    //     //document.getElementById("login").disabled=false;
                    //     alert('网络错误，请重试');
                    // }
                }).error(function(data) {
                    if(data.code == 500){
                        alert('该手机号已注册，请登录');
                    }
                    else if(data.code == 400){
                        alert('请求错误'+data.code);
                    }
                    else{
                        alert('网络错误，请重试');
                    }
            });
        }
    });
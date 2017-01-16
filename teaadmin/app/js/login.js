/**
 * Created by lulifei on 16/12/9.
 */
'use strict';
angular.module('myApp')
.controller('LoginCtrl', function ($scope, $http,$location,baseUrl,$rootScope) {
    // $scope.OutShow = false;
    $scope.login = function() {
        if ($scope.tel == null || $scope.password == null) {
            alert('用户名或密码不能为空！');
        }
        else {
            var user = {
                "tel": $scope.tel,
                "password": $scope.password
            };

            var reqAdd = {
                method: 'POST',
                url: baseUrl + '/api/manager/login',
                header: 'Content-Type:application/json',
                data: user
            };

            // console.log(reqAdd);
            $http(reqAdd)
                .success(function (data, $rootheader, config, status) {
                    console.log(data);
                    if (data.code == 500) {
                        alert("用户名和密码不匹配");
                    }
                    else if (data.data) {
                        // console.log(data.data);
                        $rootScope.currentUser = data.data;

                        localStorage['user'] = JSON.stringify($rootScope.currentUser);

                        console.log($rootScope.currentUser);
                        console.log(localStorage['user']);
                        //coverAuth.setCurrentUser($scope.currentUser);
                        // alert('登录成功!');
                        $location.path('/home');
                    }
                    else {
                        console.log(data);
                        alert('网络错误，请重试');
                    }
                }).error(function (data) {
                console.log(data);
                alert('网络错误，请重试');
            });
            // $scope.OutShow = true;
        }
    };
});
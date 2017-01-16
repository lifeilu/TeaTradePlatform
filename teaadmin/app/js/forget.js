/**
 * Created by lulifei on 16/11/21.
 */

'use strict';
angular.module('myApp')
    .controller('ForgetCtrl',function( $scope, $http,$location,baseUrl) {
            $scope.ifshow = true;
            $scope.notshow = false;
            var checkcode;
            var tel;

        $scope.getverification = function () {
            if ($scope.firsttel == null) {
                alert('请输入管理员的电话号码');
            }
            else {
                var reqAdd = {
                    method: 'GET',
                    url: baseUrl + '/api/sendMessage/password?mobile=' + $scope.firsttel,
                };

                // console.log(reqAdd);
                $http(reqAdd)
                    .success(function (data, header, config, status) {
                        if (data.data) {
                            console.log(data.data);
                            tel = data.data.phone;
                            $scope.tel = tel;
                            checkcode = data.data.code;
                            alert('发送成功!');
                        }
                        else {
                            alert('网络错误，请重试');
                        }
                    }).error(function (res) {
                    alert('网络错误，请重试');
                });
            }
        };

        $scope.checkCode = function () {
            if($scope.mycheckcode == null){
                alert('请输入验证码!');
            }
            else if($scope.mycheckcode == checkcode){
                alert('验证码正确');
                $scope.ifshow = false;
                $scope.notshow = true;
            }
            else{
                alert('验证不通过！');
            }
        }


        $scope.forget = function () {
            // alert('set new password success!');
            // $scope.tel = tel;
            if (!$scope.username || !$scope.tel || !$scope.password || !$scope.password2) {
                alert('有字段为空');
            }
            else if ($scope.password != $scope.password2) {
                alert('两次密码输入不一致');
            }
            else {
                var data = {
                    "username": $scope.username,
                    "password": $scope.password,
                    "tel": $scope.tel
                };

                var reqAdd = {
                    method: 'PUT',
                    url: baseUrl + '/api/manager/update',
                    header: 'Content-Type:application/json',
                    data: data
                };

                $http(reqAdd)
                    .success(function (data, header, config, status) {
                    if (data.data) {
                        alert('修改成功!');
                        $location.path('/login');
                    }
                    else {
                        alert('网络错误，请重试');
                    }
                }).error(function (data) {
                    if(data.status == 500){
                        alert("该手机号用户不是管理员！");
                        // $location.path('/register');
                    }
                    else{
                        console.log(data);
                        alert('网络链接障碍');
                    }
                    });
                }
            }
    });



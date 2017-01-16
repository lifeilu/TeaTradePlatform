/**
 * Created by lulifei on 16/12/23.
 */
'use strict';
angular.module('myApp')
    .controller('OrderCtrl',function($scope,$location,$http,baseUrl) {
        var currentUser = localStorage['user'];
        if(currentUser == null) {
            $location.path('/');
        }
        $scope.logout = function(){
            var r = confirm("确认退出？");
            if (r == true) {
                delete localStorage['user'];
                $location.path('/');
            }
            else{
                console.log('取消退出');
            }
        }

        $scope.orderShow = true;
        $scope.orderItemShow = false;
        $scope.itemsByPage = 10;


        $scope.rowCollection = [];
        var reqAdd = {
            method: 'GET',
            url: baseUrl + '/api/orders/search?pageSize=1000'
        };
        $http(reqAdd)
            .success(function (data, config, status) {
                if (data.data) {
                    $scope.rowCollection = data.data.content;
                    $scope.orderNum = data.data.content.length;
                    console.log($scope.rowCollection);
                    // alert('success!');
                }
                else {
                    alert('网络错误，请重试'+ data.data.code);
                }
            }).error(function (res) {
            alert('网络错误' );
        });


        $scope.searchById = function(id){
            $scope.orderShow = false;
            $scope.orderItemShow = true;
            $scope.rowCollection2 = [];
            var reqAdd = {
                method: 'GET',
                url: baseUrl + '/api/orderItems/search/'+id
            };

            $http(reqAdd)
                .success(function (data, config, status) {
                    if (data.data) {
                        $scope.rowCollection2 = data.data;
                        $scope.orderItemNum = data.data.length;
                        console.log($scope.rowCollection2);
                        // alert('success!');
                    }
                    else {
                        alert('网络错误，请重试'+ data.code);
                    }
                }).error(function (res) {
                alert('网络错误' );
            });
        };

        $scope.changeView = function () {
            $scope.orderShow = true;
            $scope.orderItemShow = false;

        }


        $scope.search = function () {
            $scope.rowCollection = [];
            // var myParams = $scope.getParams();
            var reqAdd = {
                method: 'GET',
                url: baseUrl + '/api/orders/search?'
                // url: baseUrl + '/api/orders/search?' + myParams
            };
            $http(reqAdd)
                .success(function (data, config, status) {
                    if (data.data) {
                        $scope.rowCollection = data.data.content;
                        alert('success!');
                    }
                    else {
                        alert('网络错误，请重试'+ data.data.code);
                    }
                }).error(function (res) {
                alert('网络错误' );
            });
        };
    });

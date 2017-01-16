/**
 * Created by lulifei on 16/12/23.
 */
angular.module('myApp')
.controller('ProductCtrl',function ($scope,$location,$http,baseUrl) {
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

    $scope.itemsByPage=5;
    var rowCollection = [];
    var reqAdd = {
        method: 'GET',
        url: baseUrl + '/api/products/search?pageSize=1000'
    };
    $http(reqAdd)
        .success(function(data, config, status) {
            if(data.data) {
                $scope.rowCollection = data.data.content;
                $scope.productNum = data.data.content.length;
                console.log($scope.rowCollection);
            }
            else{
                alert('网络错误，请重试'+data.data.code);
            }
        }).error(function(res) {
        alert('网络错误');
    });

    $scope.search = function(){
        var reqAdd = {
            method: 'GET',
            url: baseUrl + '/api/products/search?pageSize=1000'
        };
        $http(reqAdd)
            .success(function(data, config, status) {
                if(data.data) {
                    $scope.rowCollection = data.data.content;
                }
                else{
                    alert('网络错误，请重试'+data.data.code);
                }
            }).error(function(res) {
            alert('网络错误');
        });
    };
});
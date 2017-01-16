/**
 * Created by lulifei on 17/1/10.
 */
angular.module('myApp')
    .controller('CrowdFundOrderCtrl',function($scope, $location,$http,baseUrl) {
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


        $scope.itemsByPage = 10;
        $scope.rowCollection = [];
        var reqAdd = {
            method: 'GET',
            url: baseUrl + '/api/crowdFundOrders/search'
        };
        $http(reqAdd)
            .success(function (data, config, status) {
                if (data.data) {
                    $scope.rowCollection = data.data.content;
                    $scope.crowdFundOrderNum = data.data.content.length;
                    console.log($scope.rowCollection);
                }
                else {
                    alert('网络错误，请重试'+ data.data.code);
                }
            }).error(function (data) {
            alert('网络错误' );
        });

    });
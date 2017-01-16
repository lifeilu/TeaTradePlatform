/**
 * Created by lulifei on 16/12/7.
 */
angular.module('myApp')
    .filter("mydate", function(){
        return function(input){
            if(input != null){
                var attr = input.split(" ");
                return attr[0];
            }
            else{
                return "时间待定";
            }
        }
    })
.controller('CrowdFundCtrl',function($scope, $http, $location,baseUrl) {
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


    $scope.mainShow = true;
    $scope.eachShow = false;
    $scope.itemsByPage = 10;

    $scope.rowCollection = [];
    // var myParams = $scope.getParams();
    var reqAdd = {
        method: 'GET',
        url: baseUrl + '/api/crowdFund/search?pageSize=1000'
        // url: baseUrl + '/api/orders/search?' + myParams
    };
    $http(reqAdd)
        .success(function (data, config, status) {
            if (data.data) {
                $scope.rowCollection = data.data.content;
                $scope.crowdFundNum = data.data.content.length;
                console.log($scope.rowCollection);
            }
            else {
                alert('网络错误，请重试'+ data.data.code);
            }
        }).error(function (data) {
        alert('网络错误' );
    });

    $scope.search = function () {
        $scope.rowCollection = [];
        // var myParams = $scope.getParams();
        var reqAdd = {
            method: 'GET',
            url: baseUrl + '/api/crowdFund/search?'
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
            }).error(function (data) {
            alert('网络错误' );
        });
    };


    $scope.searchById = function (row) {
        if(row.remainderNum == row.totalNum ){
            alert('该众筹尚无人参与！');
        }
        else{
        $scope.rowCollection2 = [];
        // var myParams = $scope.getParams();
        var reqAdd = {
            method: 'GET',
            url: baseUrl + '/api/crowdFund/participant/'+ row.id
        };
        $http(reqAdd)
            .success(function (data, config, status) {
                if (data.data) {
                    $scope.rowCollection2 = data.data;
                    $scope.CustomerNum = data.data.length;
                    console.log(data.data);
                    // alert('success!');
                }
                else {
                    alert('网络错误，请重试'+ data.data.code);
                }
            }).error(function (data) {
            alert('网络错误' );
        });
        $scope.mainShow = false;
        $scope.eachShow = true;
    }
    };

    $scope.changeView = function () {
        $scope.mainShow = true;
        $scope.eachShow = false;
    }

});
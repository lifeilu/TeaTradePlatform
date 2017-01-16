/**
 * Created by lulifei on 16/12/23.
 */
angular.module('myApp')
.controller('CustomerCtrl', function ( $scope,$location,$http,baseUrl) {
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
        url: baseUrl + '/api/customers/search?pageSize=1000'
    };
    $http(reqAdd)
        .success(function (data, config, status) {
            if (data.data) {
                $scope.rowCollection = data.data.content;
                $scope.customerNum = data.data.content.length;
                console.log($scope.rowCollection);
            }
            else {
                //document.getElementById("login").disabled=false;
                alert('网络错误，请重试');
            }
        }).error(function (res) {
        //document.getElementById("login").disabled=false;
        alert('网络错误，请重试');
    });



    //查询用户详情
    $scope.searchById = function (id) {
        $scope.rowCollection = [];
        var reqAdd = {
            method: 'GET',
            url: baseUrl + '/api/customer/'+ id
        };
        $http(reqAdd)
            .success(function(data, config, status) {
                if(data.data){
                    // $scope.rowCollection = data.data;
                    $scope.rowCollection.push({
                        id : data.data.id,
                        nickname : data.data.nickname,
                        level : data.data.level,
                        address : data.data.address,
                        tel : data.data.tel,
                        money : data.data.money,
                        createDate : data.data.createDate,
                        state : data.data.state,
                        zip : data.data.zip,
                        alive : data.data.alive
                    });
                    // alert('success!');
                    //  $state.go('user-info');
                }
                else{
                    //document.getElementById("login").disabled=false;
                    alert('网络错误，请重试');
                }
            }).error(function(res) {
            //document.getElementById("login").disabled=false;
            alert('网络错误，请重试');
        });
    };

    $scope.getParams = function(){
        var res = '';
        if($scope.nickname) {
            res += 'nickname=' + $scope.nickname;
            if ($scope.level)
                res += '&level=' + $scope.level;
            if ($scope.tel)
                res += '&tel=' + $scope.tel;
        }
        else{
            if ($scope.level){
                res += 'level=' + $scope.level;
                if ($scope.tel)
                    res += '&tel=' + $scope.tel;
            }
            else{
                if ($scope.tel){
                    res += 'tel=' + $scope.tel;
                }
            }
        }
        return res;
    };
    //查询
    $scope.search=function() {
        $scope.rowCollection = [];
        var myParams = $scope.getParams();
        var reqAdd = {
            method: 'GET',
            url: baseUrl + '/api/customers/search?' + myParams
        };
        $http(reqAdd)
            .success(function (data, config, status) {
                if (data.data) {
                    var len = data.data.content.length;
                    var i;
                    $scope.rowCollection = data.data.content;

                    // for(i = 0 ;i< len;i++) {
                    // $scope.rowCollection.push({
                    //     id: data.data.content[i].id,
                    //     level: data.data.content[i].level,
                    //     nickname: data.data.content[i].nickname,
                    //     //  address: data.data.content[i].address,
                    //     tel: data.data.content[i].tel,
                    //     money: data.data.content[i].money,
                    //     //createDate: data.data.content[i].createDate,
                    //     state: data.data.content[i].state,
                    //     //  zip: data.data.content[i].zip,
                    //     alive: data.data.content[i].alive
                    // });
                    // }
                    alert('success!');
                    //  $state.go('user-info');
                }
                else {
                    //document.getElementById("login").disabled=false;
                    alert('网络错误，请重试');
                }
            }).error(function (res) {
            //document.getElementById("login").disabled=false;
            alert('网络错误，请重试');
        });
    }
    $scope.customerRegister = function(){
        //no truly implement.
        alert('add success!');
    };

    //删除客户
    $scope.deleteCustomer = function(row){
        //未添加关联规则判断(比如是否正在进行订单等)
        var index = $scope.rowCollection.indexOf(row);
        if (index !== -1) {
            $scope.rowCollection.splice(index, 1);
        }
        alert('delete success!');
    }

});
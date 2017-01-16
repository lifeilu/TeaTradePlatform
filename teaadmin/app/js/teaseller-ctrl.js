/**
 * Created by lulifei on 16/12/23.
 */
angular.module('myApp')
    .filter("myState", function(){
        return function(input){
            if(input == 0){
                return "未审核";
            }
            else if(input == 1){
                return "已审核";
            }
            else{
                return "不通过";
            }
        }
    })
.controller('TeasellerCtrl', function ($scope,$location,$http,baseUrl) {
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
    $scope.saleShow = false;
    $scope.itemsByPage = 5;

    var reqAdd = {
        method: 'GET',
        url: baseUrl + '/api/teaSalers/search?pageSize=1000'
    };
    $http(reqAdd)
        .success(function(data, config, status) {
            if(data.data){
                $scope.rowCollection = data.data.content;
                $scope.teaSalerNum = data.data.content.length;
                console.log($scope.rowCollection);
            }
            else{
                //document.getElementById("login").disabled=false;
                alert('网络错误，请重试');
            }
        }).error(function(res) {
        //document.getElementById("login").disabled=false;
        alert('网络错误，请重试');
    });


    $scope.searchById = function (id) {
            $scope.rowCollection = [];
            var reqAdd = {
                method: 'GET',
                url: baseUrl + '/api/teaSaler/'+ id
            };
            $http(reqAdd)
                .success(function(data, config, status) {
                    if(data.data){
                        //$scope.rowCollection = data.data;
                        $scope.rowCollection.push({
                            id : data.data.id,
                            name : data.data.name,
                            level : data.data.level,
                            nickname : data.data.nickname,
                            address : data.data.address,
                            tel : data.data.tel,
                            money : data.data.money,
                            createDate : data.data.createDate,
                            idCard : data.data.idCard,
                            licenseUrl : data.data.licenseUrl,
                            state : data.data.state,
                            zip : data.data.zip,
                            alive : data.data.alive,
                            myImage: baseUrl+'/api/image/getByUrl?url='+data.data.licenseUrl
                        });
                        alert('success!');
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
            if($scope.name) {
                res += 'name=' + $scope.name;
                if ($scope.level)
                    res += '&level=' + $scope.level;
                if ($scope.tel)
                    res += '&tel=' + $scope.tel;
                if ($scope.state)
                    res += '&state=' + $scope.state;
            }
            else{
                if ($scope.level){
                    res += 'level=' + $scope.level;
                    if ($scope.tel)
                        res += '&tel=' + $scope.tel;
                    if ($scope.state)
                        res += '&state=' + $scope.state;
                }
                else{
                    if ($scope.tel){
                        res += 'tel=' + $scope.tel;
                        if ($scope.state)
                            res += '&state=' + $scope.state;
                    }
                    else{
                        if ($scope.state)
                            res += 'state=' + $scope.state;
                    }
                }
            }
            return res;
        };
    $scope.search = function(){
            $scope.rowCollection = [];
            var myParams = $scope.getParams();
            var reqAdd = {
                method: 'GET',
                url: baseUrl + '/api/teaSalers/search?'+ myParams
            };
            $http(reqAdd)
                .success(function(data, config, status) {
                    if(data.data){
                        // var len = data.data.content.length;
                        // var i;
                        $scope.rowCollection = data.data.content;
                        console.log($scope.rowCollection);
                        // for(i = 0 ;i< len;i++) {
                        // $scope.rowCollection.push({
                        //     id: data.data.content[i].id,
                        //     name: data.data.content[i].name,
                        //     level: data.data.content[i].level,
                        //     //  nickname: data.data.content[i].nickname,
                        //     //  address: data.data.content[i].address,
                        //     tel: data.data.content[i].tel,
                        //     money: data.data.content[i].money,
                        //     //createDate: data.data.content[i].createDate,
                        //     //  idCard: data.data.content[i].idCard,
                        //     //  licenseUrl: data.data.content[i].licenseUrl,
                        //     state: data.data.content[i].state,
                        //     //  zip: data.data.content[i].zip,
                        //     alive: data.data.content[i].alive
                        // });
                        // }
                        alert('success!');
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


    $scope.deleteSeller = function(row){
        var r = confirm("确认该茶农审批不通过？");
        if (r == true) {
            console.log('设置审批不通过');
            var reqAdd = {
                method: 'PUT',
                url: baseUrl + '/api/teaSaler/delete/' + row.id
                // header: 'Content-Type:application/json'
            };
            $http(reqAdd)
                .success(function (data, config, status) {
                    if (data.code == 200) {
                        alert(data.data);
                        console.log(data.data);
                        var index = $scope.rowCollection.indexOf(row);
                        if (index !== -1) {
                            $scope.rowCollection.splice(index, 1);
                        }
                        // alert('delete success!');
                    }
                    else {
                        //document.getElementById("login").disabled=false;
                        alert(data.data);
                        console.log(data.data);
                    }
                }).error(function (data) {
                //document.getElementById("login").disabled=false;
                console.log(data);
                alert('网络错误，请重试');
            });
        }
        else{
            console.log('取消设置茶农');
        }

        };

    //批量审批茶农
    $scope.approveAll = function(){
        var r = confirm("确认批量审批茶农通过？");
        if (r == true) {
            var requestBody;
            var reqAdd = {
                method: 'GET',
                url: baseUrl + '/api/teaSalers/search?' + 'state=0'
            };
            $http(reqAdd)
                .success(function (data, config, status) {

                    if (data.data.content.length == 0) {
                        alert('没有茶农需要审批！');
                    }
                    else {
                        var len = data.data.content.length;
                        // console.log(len);
                        var i;
                        for (i = 0; i < len; i++) {
                            data.data.content[i].state = 1;
                        }
                        requestBody = data.data.content;
                        console.log(requestBody);
                        // console.log(data.data.content);

                        var reqAdd = {
                            method: 'PUT',
                            url: baseUrl + '/api/teaSalers/approve',
                            header: 'Content-Type:application/json',
                            data: requestBody
                        };
                        $http(reqAdd)
                            .success(function (data, config, status) {
                                if (data.code == 500) {
                                    alert('已审核!');
                                }
                                else {
                                    alert('批量审批成功!');
                                    location.reload();
                                }
                            }).error(function (data) {
                            console.log(data);
                            alert('网络错误，请重试');
                        });
                    }
                }).error(function (data) {
                        console.log(data);
                        alert('网络错误，请重试');
            });
        }
        else{
            console.log('批量审批设置取消');
        }
        };


        $scope.approveByTel = function (row) {
            if(row.state == 1){
                alert('该茶农已经审核通过!')
            }
            else if(row.state == 2) {
                alert('该茶农已审核不通过!');
            }
            else {
                var r = confirm("确认审批该茶农通过？");
                if (r == true) {
                    console.log('确认审批该茶农');
                        var reqAdd = {
                            method: 'GET',
                            url: baseUrl + '/api/teaSalers/search?tel=' + row.tel
                        };
                        $http(reqAdd)
                            .success(function (data, config, status) {
                                data.data.content[0].state = 1;
                                console.log(data.data.content[0]);
                                var reqAdd = {
                                    method: 'PUT',
                                    url: baseUrl + '/api/teaSalers/approve',
                                    header: 'Content-Type:application/json',
                                    data: data.data.content
                                };
                                $http(reqAdd)
                                    .success(function (data, config, status) {
                                        if (data.code == 500) {
                                            alert('已审核!');
                                        }
                                        else {
                                            alert('审批成功!');
                                            location.reload();
                                        }
                                    }).error(function (data) {
                                    console.log(data);
                                    alert('网络错误，请重试');
                                });
                            }).error(function (data) {
                            console.log(data);
                            alert('网络错误，请重试');
                        });
                }
                else {
                    console.log('取消审批该茶农');
                }
            }
        }


        $scope.changeView = function () {
            $scope.mainShow = true;
            $scope.saleShow = false;
        }
        $scope.changeView2 = function () {
            $scope.saleShow = false;
            $scope.chartShow2 = true;
        }
        $scope.changeView3 = function () {
            $scope.mainShow = true;
            $scope.chartShow2 = false;
        }
        $scope.changeView4 = function () {
            $scope.saleShow = true;
            $scope.chartShow2 = false;
        }

    $scope.changeView5 = function () {
        $scope.saleShow = false;
        $scope.chartShow3 = true;
    }
    $scope.changeView6 = function () {
        $scope.mainShow = true;
        $scope.chartShow3 = false;
    }
    $scope.changeView7 = function () {
        $scope.saleShow = true;
        $scope.chartShow3 = false;
    }






    $scope.seeSale = function(row){
            if(row.state == 0){
                alert('该茶农尚未审核!');
            }
            else {
                $scope.mainShow = false;
                $scope.saleShow = true;
                $scope.rowCollection2 = [];
                $scope.labels2 = [];
                $scope.data2 = [];
                $scope.labels3 = [];
                $scope.data3 = [];
                var reqAdd = {
                    method: 'GET',
                    url: baseUrl + '/api/statistics/teasalerProduct?startDate=2016-07-10&endDate=2017-02-14&teaSaler_id=' + row.id
                };
                $http(reqAdd)
                    .success(function (data, config, status) {
                        if (data.data) {
                            console.log(data.data);
                            var object = data.data;
                            for (var obj in object) {
                                // console.log(obj);//山东
                                // console.log(object[obj]["productName"]);
                                // console.log(object[obj]["number"]);
                                $scope.rowCollection2.push({
                                    proId: obj,
                                    productName: object[obj]["productName"],
                                    number: object[obj]["number"]
                                })
                                $scope.labels2.push(object[obj]["productName"]);
                                $scope.data2.push(object[obj]["number"]);

                            }
                            console.log($scope.rowCollection2);
                            console.log($scope.labels2);
                            console.log($scope.data2);

                        }
                        else {
                            alert('网络错误，请重试' + data.data.code);
                        }
                    }).error(function (data) {
                    console.log(data);
                    alert('网络错误');
                })
            };


            $scope.rowCollection3 = [];
            var reqAdd = {
                method: 'GET',
                url: baseUrl + '/api/statistics/teaSalerAllProductTypes?startDate=2016-07-10&endDate=2017-02-14&teaSaler_id='+row.id
            };
            $http(reqAdd)
                .success(function (data, config, status) {
                    if (data.data) {
                        console.log(data.data);
                        var object = data.data;
                        for(var obj in object)
                        {
                            // console.log(obj);//山东
                            // console.log(object[obj]["productName"]);
                            // console.log(object[obj]["number"]);
                            $scope.rowCollection3.push({
                                proId: obj,
                                productName: object[obj]["productName"],
                                number: object[obj]["number"]
                            })
                            $scope.labels3.push(object[obj]["productName"]);
                            $scope.data3.push(object[obj]["number"]);
                        }
                        console.log($scope.rowCollection3);
                        console.log($scope.labels3);
                        console.log($scope.data3);
                    }
                    else {
                        alert('网络错误，请重试'+ data.data.code);
                    }
                }).error(function (data) {
                console.log(data);
                alert('网络错误' );
            });
        }
    });





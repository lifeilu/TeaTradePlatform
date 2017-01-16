/**
 * Created by lulifei on 16/12/23.
 */
angular.module('myApp')
    .controller('AnalysisCtrl',function($scope,baseUrl,$location,$http) {
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
        $scope.rowCollection3 = [];
        $scope.proTotalNum = [];
        $scope.proNames = [];
        // var myParams = $scope.getParams();
        var reqAdd = {
            method: 'GET',
            url: baseUrl + '/api/statistics/searchAllProducts?startDate=2016-07-10&endDate=2017-02-14'
            // url: baseUrl + '/api/statistics/addressSearch?productType_id='+$scope.typeId+'&startDate='+$scope.startTime
            // +'&endDate='+$scope.endTime
        };
        $http(reqAdd)
            .success(function (data, config, status) {
                if (data.data) {
                    console.log(data.data);
                    var object = data.data;
                    var totalProNum = 0;
                    for(var obj in object)
                    {
                        var proNum = 0;
                        console.log(obj);//山东
                        console.log(object[obj]);
                        for(var proType in object[obj]){
                            console.log(object[obj][proType]);

                            $scope.rowCollection3.push({
                                province: obj,
                                productName: object[obj][proType]["productName"],
                                number: object[obj][proType]["number"]
                            })
                            proNum += object[obj][proType]["number"];
                        }
                        totalProNum += proNum;
                        $scope.proTotalNum.push(proNum);
                        $scope.proNames.push(obj);
                        console.log(totalProNum);
                        $scope.rowCollection.push({
                            province: obj,
                            number: proNum,
                            // proPercent: 100*proNum/totalProNum
                        })
                    }
                    $scope.sumPrice =  totalProNum;
                    console.log($scope.rowCollection);
                    console.log($scope.rowCollection3);
                    console.log($scope.proTotalNum);
                    console.log($scope.proNames);
                }
                else {
                    alert('网络错误，请重试'+ data.data.code);
                }
            }).error(function (data) {
            console.log(data);
            alert('网络错误' );
        });


        $scope.rowCollection2 = [];
        $scope.rowCollection4 = [];
        // var myParams = $scope.getParams();
        $scope.totalNum = [];
        $scope.names = [];
        var reqAdd = {
            method: 'GET',
            url: baseUrl + '/api/statistics/allproductTypes?startDate=2016-07-10&endDate=2017-02-14'
            // url: baseUrl + '/api/statistics/addressSearch?productType_id='+$scope.typeId+'&startDate='+$scope.startTime
            // +'&endDate='+$scope.endTime
        };
        $http(reqAdd)
            .success(function (data, config, status) {
                if (data.data) {
                    console.log(data.data);
                    var object = data.data;
                    var totalSalerNum = 0;
                    for(var obj in object)
                    {
                        var num = 0;
                        console.log(obj);//

                        for(var proType in object[obj]["allproductTypes"]){
                            $scope.rowCollection4.push({
                                teaSalerId: obj,
                                teaSalerName:  object[obj]["teaSalerName"],
                                productName: object[obj]["allproductTypes"][proType]["productName"],
                                number: object[obj]["allproductTypes"][proType]["number"]
                            })
                            num += object[obj]["allproductTypes"][proType]["number"];
                        }
                        totalSalerNum += num;
                        // $scope.totalNum.push({
                        //     "teaSalerName":  object[obj]["teaSalerName"],
                        //     "totalNum": num
                        // });
                        $scope.totalNum.push(num);
                        $scope.names.push(object[obj]["teaSalerName"]);
                        $scope.rowCollection2.push({
                            teaSalerId: obj,
                            teaSalerName:  object[obj]["teaSalerName"],
                            number: num
                            // salerPercent: 100*num/totalSalerNum
                        })
                        // console.log(num);
                    }
                    $scope.sumSalePrice =  totalSalerNum;
                    console.log($scope.rowCollection4);
                    console.log($scope.totalNum);
                    console.log($scope.rowCollection2);
                    console.log($scope.names);
                }
                else {
                    alert('网络错误，请重试'+ data.data.code);
                }
            }).error(function (data) {
            console.log(data);
            alert('网络错误' );
        });


        $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];
        // $scope.labels = ["绿茶", "红茶", "乌龙茶", "普洱茶", "碧螺春", "铁观音", "玫瑰花茶"];
        $scope.series = ['Series A'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40]
        ];
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };




        $scope.search = function() {
            console.log($scope.startTime);
            console.log($scope.endTime);
            $scope.rowCollection = [];
            // var myParams = $scope.getParams();
            var reqAdd = {
                method: 'GET',
                // url: baseUrl + '/api/statistics/addressSearch?productType_id=4&startDate=2016-07-10&endDate=2017-02-14'
                url: baseUrl + '/api/statistics/addressSearch?productType_id=' + $scope.typeId + '&startDate=' + $scope.startTime
                + '&endDate=' + $scope.endTime
            };
            $http(reqAdd)
                .success(function (data, config, status) {
                    if (data.data) {
                        console.log(data.data);
                        var object = data.data;
                        for (var obj in object) {
                            console.log(obj);//山东
                            console.log(object[obj]["productName"]);
                            console.log(object[obj]["number"]);
                            $scope.rowCollection.push({
                                province: obj,
                                productName: object[obj]["productName"],
                                number: object[obj]["number"]
                            })
                        }
                        console.log($scope.rowCollection);
                    }
                    else {
                        alert('网络错误，请重试' + data.data.code);
                    }
                }).error(function (data) {
                console.log(data);
                alert('网络错误');
            });
        }
    });
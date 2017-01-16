/**
 * Created by lulifei on 16/12/23.
 */
angular.module('myApp')
.controller('ProductTypeCtrl', function ($scope,$http,$location,Upload,baseUrl) {
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

    $scope.itemsByPage = 5;
    $scope.addShow = false;
    $scope.listShow = true;
    $scope.saleShow = false;
    $scope.chartShow = false;
    $scope.rowCollection = [];
    var reqAdd = {
        method: 'GET',
        url: baseUrl + '/api/productTypes/getAllProductType?state=1&pageSize=1000'
    };
    $http(reqAdd)
        .success(function (data, config, status) {
            if (data.data) {
                $scope.rowCollection = data.data;
                $scope.productTypeNum = data.data.length;
            }
            else {
                alert('网络错误，请重试');
            }
        }).error(function (res) {
        alert('网络错误，请重试');
    });



    $scope.changeView = function(){
        $scope.listShow = false;
        $scope.addShow = true;
    };
    $scope.changeView2 = function(){
        $scope.listShow = true;
        $scope.addShow = false;
    };
    $scope.changeView3 = function(){
        $scope.listShow = true;
        $scope.saleShow = false;
    };
    $scope.changeView4 = function(){
        $scope.listShow = true;
        $scope.chartShow = false;
    };
    $scope.changeView5 = function(){
        $scope.saleShow = false;
        $scope.chartShow = true;
    };
    $scope.changeView6 = function(){
        $scope.saleShow = true;
        $scope.chartShow = false;
    };


    //新增产品类型
    $scope.addProduct = function() {
        //var data= {
        //    "name": $scope.product.name,
        //    "descript": $scope.product.descript,
        //    //to be done!
        //    "file":$scope.product.img
        //};

        if ($scope.product.name == null || $scope.product.descript == null) {
            alert("所填信息为空!");
        }
        else {
            console.log("log file" + $scope.product.img);
            if ($scope.product.img == null) {
                alert('请添加图片！');
            }
            else {
                var myParams = 'name=' + $scope.product.name + '&descript=' + $scope.product.descript;

                Upload.upload({
                    url: baseUrl + '/api/productType/new?' + myParams,
                    data: {
                        "file": $scope.product.img
                    }
                }).success(function (data) {
                    alert('添加成功!');
                    location.reload();


                }).error(function (data) {
                    alert('添加失败!');
                })
            }
        }
    };

    //to be done
    //茶产品类型的修改（单个）
    $scope.typeUpdate = function(row){
        var r = confirm("确认设置产品类型为不可用？");
        if (r == true) {
            console.log('设置不可用');

            var rowCollection = [];
            var data = {
                "id": row.id,
                "state": 0
            };
            rowCollection.push(data);
            var reqAdd = {
                method: 'PUT',
                url: baseUrl + '/api/productTypes/update',
                data: rowCollection
            };
            $http(reqAdd)
                .success(function (data, config, status) {
                    if (data.code == 200) {
                        alert('删除成功!');
                        location.reload();
                    }
                    else {
                        alert('删除失败!');
                    }
                })
                .error(function (res) {
                    //   document.getElementById("login").disabled = false;
                    alert('网络连接错误');
                });
        }
        else{
            console.log('取消设置产品类型不可用');
        }

    };

    //to be done!
    // $scope.deleteType = function(row){
    //     //删除茶农，需要判断是否用户有订单才能删除
    //     var index = $scope.rowCollection.indexOf(row);
    //     if (index !== -1) {
    //         $scope.rowCollection.splice(index, 1);
    //     }
    //     alert('delete success!');
    // };


    $scope.searchProduct = function() {
        $scope.addShow = false;
        $scope.listShow = true;
        $scope.rowCollection = [];
        var reqAdd = {
            method: 'GET',
            url: baseUrl + '/api/productTypes/getAllProductType?state=1'
        };
        $http(reqAdd)
            .success(function (data, config, status) {
                if (data.data) {
                    // var len = data.data.length;
                    // var i;
                    $scope.rowCollection = data.data;
                    // for (i = 0; i < len; i++) {
                    // $scope.rowCollection.push({
                    //     id: data.data[i].id,
                    //     name: data.data[i].name,
                    //     descript: data.data[i].descript,
                    //     url: data.data[i].url,
                    //     state: data.data[i].state,
                    //     alive: data.data[i].alive,
                    //     myImage: baseUrl+'/api/image/getByUrl?url='+data.data[i].url
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

    $scope.seeSale = function (row) {
        $scope.listShow = false;
        $scope.saleShow = true;
        $scope.rowCollection2 = [];
        $scope.labels = [];
        $scope.data = [];
        // var myParams = $scope.getParams();
        var reqAdd = {
            method: 'GET',
            url: baseUrl + '/api/statistics/addressSearch?startDate=2016-07-10&endDate=2017-02-14&productType_id='+row.id
            // url: baseUrl + '/api/statistics/addressSearch?productType_id='+$scope.typeId+'&startDate='+$scope.startTime
            // +'&endDate='+$scope.endTime
        };
        $http(reqAdd)
            .success(function (data, config, status) {
                if (data.data) {
                    console.log(data.data);
                    var object = data.data;
                    for(var obj in object)
                    {
                        console.log(obj);//山东
                        console.log(object[obj]["productName"]);
                        console.log(object[obj]["number"]);
                        $scope.rowCollection2.push({
                            province: obj,
                            productName: object[obj]["productName"],
                            number: object[obj]["number"]
                        })
                        $scope.labels.push(obj);
                        $scope.data.push(object[obj]["number"]);
                    }
                    console.log($scope.rowCollection);
                    console.log($scope.labels);
                    console.log($scope.data);
                    myMap($scope.labels,$scope.data);
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
            // $scope.data = [
            //     [65, 59, 80, 81, 56, 55, 40]
            // ];
            $scope.onClick = function (points, evt) {
                console.log(points, evt);
            };

            $scope.datasetOverride2 = {
                hoverBackgroundColor: ['#45b7cd', '#ff6384', '#ff8e72'],
                hoverBorderColor: ['#45b7cd', '#ff6384', '#ff8e72']
            };

            // Simulate async data update
            // $timeout(function () {
            //     $scope.data = [
            //         [28, 48, 40, 19, 86, 27, 90]
            //     ];
            // }, 3000);
    }


    function myMap(labels,data) {
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(113.975557, 34.443119);
        map.centerAndZoom(point, 5);
        bdGeo(labels,data);

        function bdGeo(labels,data) {
            var i;
            for (i = 0; i < labels.length; i++) {
                var label = labels[i];
                if(label == ("上海"||"北京"||"天津"||"重庆"))
                {
                    label += "市";
                }
                else{
                    label += "省";
                }
                var num = data[i];
                console.log(label + num);
                geocodeSearch(label, num, i)

            }
        }

        function geocodeSearch(label,num,i) {
            var myGeo = new BMap.Geocoder();
            if (i < $scope.labels.length) {
                setTimeout(window.bdGeo, 4000);
            }
            myGeo.getPoint(label, function (point) {
                if (point) {
                    console.log(point.lng, point.lat);
                    // add_point(point, label);
                    // document.getElementById("result").innerHTML += index + "、" + add + ":" + point.lng + "," + point.lat + "</br>";
                    // addMarker(address, new BMap.Label(i + ":" + add, {offset: new BMap.Size(20, -10)}));
                    var marker = new BMap.Marker(new BMap.Point(point.lng, point.lat)); // 创建点
                    map.addOverlay(marker);               // 将标注添加到地图中
                    marker.disableDragging();
                    var opts = {
                        width : 200,     // 信息窗口宽度
                        height: 100,     // 信息窗口高度
                        title : label , // 信息窗口标题
                        // enableMessage:true,//设置允许信息窗发送短息
                        // message:"亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
                    }
                    var infoWindow = new BMap.InfoWindow("销量: "+ num, opts);  // 创建信息窗口对象
                    marker.addEventListener("click", function(){
                        map.openInfoWindow(infoWindow,point); //开启信息窗口
                    });
                }
            }, "合肥市");
        }

    }


        //
        // map.addEventListener("click",function(e){
        //     alert( e.point.lng + ",纬度" + e.point.lat);
        //     // longi = e.point.lng;lat = e.point.lat;
        //     console.log('选中位置：经度'+e.point.lng +',纬度'+e.point.lat);
        //     $scope.longi = e.point.lng;
        //     $scope.lat = e.point.lat;
        //     console.log('赋值后：经度'+$scope.longi +',纬度'+$scope.lat);
        //     add_point(e.point.lng,e.point.lat);
        // });
        //
        // //根据经纬度创建点
        // function add_point(x,y) {
        //     // var point = new BMap.Point(121.4428690000, 31.0320340000);
        //     var marker = new BMap.Marker(new BMap.Point(x, y)); // 创建点
        //     map.addOverlay(marker);               // 将标注添加到地图中
        //     marker.disableDragging();
        // }
        //
        // // 添加带有定位的导航控件
        // var navigationControl = new BMap.NavigationControl({
        //     // 靠左上角位置
        //     anchor: BMAP_ANCHOR_TOP_LEFT,
        //     // LARGE类型
        //     type: BMAP_NAVIGATION_CONTROL_LARGE,
        //     // 启用显示定位
        //     enableGeolocation: true
        // });
        //
        // // 添加定位控件
        // var geolocationControl = new BMap.GeolocationControl();
        // geolocationControl.addEventListener("locationSuccess", function(e){
        //     // 定位成功事件
        //     var address = '';
        //     address += e.addressComponent.province;
        //     address += e.addressComponent.city;
        //     address += e.addressComponent.district;
        //     address += e.addressComponent.street;
        //     address += e.addressComponent.streetNumber;
        //     alert("当前定位地址为：" + address);
        // });
        // geolocationControl.addEventListener("locationError",function(e){
        //     // 定位失败事件
        //     alert(e.message);
        // });
        //
        // map.addControl(navigationControl);
        // map.addControl(geolocationControl);




});

/**
 * Created by lulifei on 17/1/6.
 */
angular.module('myApp')
    .controller('PredictCtrl',function($scope,$timeout,$location,$http,baseUrl) {
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


        // $scope.datas = [][13];
        // $scope.labels = [];
        $scope.testData1=[85,84,85,83,87,86,85,87,83,84,86,85,82];
        $scope.testData2=[480,479,481,478,480,481,482,483,485,486,487,488,481];
        $scope.testData3=[520,521,519,522,523,524,525,526,530,526,525,520,524];
        $scope.testData4=[1000,1050,1020,1010,1000,1020,1030,1040,1050,1060,1070,1080,1025];
        $scope.testData5=[150,160,170,180,160,150,155,165,167,170,165,155,176];
        $scope.testData6=[280, 260,300,320,260,270,280,290,310,300,320,310,297];
        $scope.testData7=[520,500,510,530,525,520,515,510,505,500,510,520,523];
        $scope.testData8=[88,89,90,91,90,89,88,86,87,85,89,90,116];
        //

        $scope.rowCollection = [];
        var reqAdd = {
            method: 'GET',
            url: baseUrl + '/api/products/price/predicte'
        };
        $http(reqAdd)
            .success(function (data, config, status) {
                if (data.data) {
                    var kind = data.data.length;
                    $scope.datas = [kind];
                    var i ;
                    var j ;
                    for( i = 0; i< kind; i++){
                        $scope.datas[i] = [];
                        $scope.oneTea = data.data[i];
                        console.log($scope.oneTea);
                        $scope.onePrice = [];
                        for( j = 0;j<13;j++){
                            $scope.onePrice.push($scope.oneTea[j].price);
                        }
                        $scope.teaType = $scope.oneTea[0].name;
                        $scope.teaProvince = $scope.oneTea[0].province;
                        $scope.teaMark = $scope.oneTea[0].level;
                        $scope.rowCollection.push({
                            "data": $scope.onePrice,
                            "teaType": $scope.oneTea[0].name,
                            "teaProvince": $scope.oneTea[0].province,
                            "teaMark":  $scope.oneTea[0].level,
                            "predictPrice": $scope.oneTea[12].price
                        })



                        // $scope.datas[i] = $scope.data;
                    }

                    console.log($scope.rowCollection);
                    console.log($scope.datas);
                }
                else {
                    alert('网络错误，请重试'+ data.code);
                }
            }).error(function (res) {
            alert('网络错误' );
        });



        // $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];
        $scope.labels = ["2016年1月", "2016年2月", "2016年3月", "2016年4月", "2016年5月", "2016年6月",
            "2016年7月", "2016年8月", "2016年9月", "2016年10月", "2016年11月", "2016年12月","2017年1月"];
        $scope.series = ['碧螺春'];
        // $scope.data = [
        //     [80, 59, 80, 81, 56, 55, 40, 89, 90, 91, 82, 90],
        //     [56, 55, 40, 65, 59, 80, 81, 90, 78, 67, 89, 72]
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
        //         [56, 55, 40, 65, 59, 80, 81, 90, 78, 67, 89, 72],
        //         [65, 59, 80, 81, 56, 55, 40, 89, 90, 91, 82, 90]
        //     ];
        // }, 3000);
    });
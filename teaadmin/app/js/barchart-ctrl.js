/**
 * Created by lulifei on 17/1/6.
 */
angular.module('myApp')
    .controller('LineCtrl', function ($scope, $location,$timeout) {
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

        // $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];


        $scope.testcolor = [
            {
                backgroundColor: "rgba(159,204,0, 0.2)",
                pointBackgroundColor: "rgba(159,204,0, 1)",
                pointHoverBackgroundColor: "rgba(159,204,0, 0.8)",
                borderColor: "rgba(159,204,0, 1)",
                pointBorderColor: '#fff',
                pointHoverBorderColor: "rgba(159,204,0, 1)"
            },"rgba(250,109,33,0.5)","#9a9a9a","rgb(233,177,69)"
        ];
        $scope.testlabel = ["绿茶", "红茶", "乌龙茶", "普洱茶","普洱茶","普洱茶","普洱茶","普洱茶", "普洱茶","普洱茶",
                            "普洱茶","普洱茶","绿茶", "红茶", "乌龙茶", "普洱茶","普洱茶","普洱茶","普洱茶","普洱茶"];
        $scope.testseries = ['Series A', 'Series B', 'Series C', 'Series D'];
        $scope.testdata = [
            [10, 9, 8, 6, 10, 9, 8, 6,10, 9, 8, 6,10, 9, 8, 6,10, 9, 8, 6]
        ];


        $scope.testoption = {
            responsive: true,
            title:{
                display: true,
                text: "统计图"
            },
            scales: {
                xAxes: [{
                    stacked: true,
                    // display: false,
                    // ticks: {
                        // max: 125,
                        // min: -125,
                        // stepSize: 100
                    // }
                }],
                yAxes: [{
                    // stacked: true,
                    display: true,
                    categoryPercentage: 0.9,
                    barPercentage: 0.1,
                    // grid line settings
                    // gridLines: {
                        // offsetGridLines: true
                    // },
                    // display:{
                    //     fontsize: 5
                    // },
                    ticks: {
                        // max: 125,
                        // min: -125,
                        stepSize: 100
                    }
                }]
            }
        };






        $scope.labels = ["绿茶", "红茶", "乌龙茶", "普洱茶", "碧螺春", "铁观音", "玫瑰花茶"];
        $scope.series = ['Series A'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40]
        ];
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };

        $scope.datasetOverride2 = {
            hoverBackgroundColor: ['#45b7cd', '#ff6384', '#ff8e72'],
            hoverBorderColor: ['#45b7cd', '#ff6384', '#ff8e72']
        };

        // Simulate async data update
        $timeout(function () {
            $scope.data = [
                [28, 48, 40, 19, 86, 27, 90]
            ];
        }, 3000);
    });
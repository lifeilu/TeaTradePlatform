/**
 * Created by lulifei on 2016/11/7.
 */
'use strict';
angular.module('myApp', [
    'ngRoute',
    // 'ui.router',
    'ngFileUpload',
    'smart-table',
    'chart.js'
    ])
    .config([
        '$routeProvider','$locationProvider',
        function($routeProvider,$locationProvider){
            $locationProvider.hashPrefix('!');
            $routeProvider
            .when('/',{
                templateUrl: 'views/login.html',
                controller:'LoginCtrl'
            })
            .when('/login',{
                templateUrl: 'views/login.html',
                controller:'LoginCtrl'
            })
            .when('/register',{
                templateUrl: 'views/sign-up.html',
                controller:'RegisterCtrl'
            })
            .when('/forget',{
                templateUrl: 'views/reset-password.html',
                controller:'ForgetCtrl'
             })
            .when('/home',{
                templateUrl:'views/home-page.html',
                controller:'HomeCtrl'
            })
            .when('/customer',{
               templateUrl: 'views/customer-manager.html',
               controller:'CustomerCtrl'
            })
                .when('/customerAdd',{
                    templateUrl: 'views/customer-add.html',
                    controller:'CustomerAddCtrl'
                })
                .when('/teasellerAdd',{
                    templateUrl: 'views/teaseller-add.html',
                    controller:'TeasellerAddCtrl'
                })
            .when('/teaseller',{
               templateUrl: 'views/teaseller-manager.html',
               controller:'TeasellerCtrl'
            })
             .when('/order',{
               templateUrl: 'views/order-manager.html',
               controller:'OrderCtrl'
             })
            .when('/productType',{
                 templateUrl: 'views/product-type-manager.html',
                 controller:'ProductTypeCtrl'
            })
            .when('/product',{
                templateUrl: 'views/product-manager.html',
                controller:'ProductCtrl'
            })
           .when('/userInfo',{
                templateUrl: 'views/user-info.html',
                controller:'UserInfoCtrl'
             })
           .when('/crowdFund',{
                templateUrl: 'views/crowdfund.html',
                controller:'CrowdFundCtrl'
           })
           .when('/crowdSource',{
                templateUrl: 'views/crowdsource.html',
                controller: 'CrowdSourceCtrl'
           })
           .when('/analysis',{
                templateUrl: 'views/data-analysis.html',
                controller:'AnalysisCtrl'
           })
          .when('/barchart',{
              templateUrl: 'views/bar-chart.html',
              controller:'LineCtrl'
          })
          .when('/prediction',{
              templateUrl: 'views/prediction.html',
              controller: 'PredictCtrl'
          })
         .when('/crowdFundOrder',{
             templateUrl: 'views/crowdfundorder.html',
             controller:'CrowdFundOrderCtrl'
         })
         .when('/crowdSourceOrder',{
             templateUrl: 'views/crowdsourceorder.html',
             controller: 'CrowdSourceOrderCtrl'
          })
         .when('/userSim',{
              templateUrl: 'views/usersim.html',
              controller: 'UserSimCtrl',
              cache: 'false'
          })


            .otherwise({redirectTo:'/'});
    }])
    .config(['ChartJsProvider', function (ChartJsProvider) {
        // Configure all charts
        ChartJsProvider.setOptions({
            chartColors: ['blue'],
            responsive: false,
            title:{
                display: false,
                text: "统计图"
            },
            scales: {
                xAes: [{
                    display: false,
                    gridLines: {
                        offsetGridLines: true
                    },
                }],
                yAxes: [{
                    // stacked: true,
                    display: false,
                    categoryPercentage: 0.9,
                    barPercentage: 0.9,
                    // grid line settings
                    gridLines: {
                        offsetGridLines: true
                    },
                    // ticks: {
                    //     max: 125,
                    //     min: -125,
                    //     stepSize: 100
                    // }
                }]
            }
    });




        // // Configure all line charts
        // ChartJsProvider.setOptions('line', {
        //     showLines: false
        // });
    }])
    .constant('baseUrl', 'http://202.120.40.175:17000')
    .filter("myImageUrl", function(baseUrl){
        return function(input){
            if(input == null){
                return  '/images/default.jpeg';
            }
            else{
                return baseUrl  + '/api/image/getByUrl?url=' + input;
            }
        }
    })
    .filter("myAlive", function(){
        return function(input){
            if(input == 0){
                return "已删除";
            }
            else{
                return "未删除";
            }
        }
    })
    .filter("myOrder", function(){
        return function(input){
            if(input == 0){
                return "未完成";
            }
            else if(input == 1){
                return "已付款";
            }
            else if(input == 2){
                return "已完成";
            }
            else if(input == 3){
                return "已取消";
            }
        }
    })
    .filter("mySend", function(){
        return function(input){
            if(input == 0){
                return "未发货";
            }
            else{
                return "已发货";
            }
        }
    })
    .filter("myConfirm", function(){
        return function(input){
            if(input == 0){
                return "未确认";
            }
            else{
                return "已确认";
            }
        }
    })
    .filter("myComment", function(){
        return function(input){
            if(input == 0){
                return "未评价";
            }
            else{
                return "已评价";
            }
        }
    })
    .filter("myFund", function(){
    return function(input){
        if(input == 0){
            return "未支付";
        }
        else if(input == 1){
            return "全支付";
        }
        else{
            return "部分支付";
        }
    }
})
    .filter("fundType", function(){
    return function(input){
        if(input == 0){
            return "现货";
        }
        else{
            return "预售";
        }
    }
})
    .filter("sourceState", function(){
        return function(input){
            if(input == 0){
                return "进行中";
            }
            else if(input ==1){
                return "结算中";
            }
            else if(input == 2){
                return "退款中";
            }
            else if(input ==3){
                return "发货中";
            }
            else if(input ==4){
                return "已完成";
            }
            else{
                return "未成功";
            }
        }
    })
    .filter("starImg", function(){
        return function(input){
            if(input == 1){
                return '/images/1.jpg';
            }
            else if(input ==2){
                return '/images/2.jpg';
            }
            else if(input ==3){
                return '/images/3.jpg';
            }
            else if(input ==4){
                return '/images/4.jpg';
            }
            else{
                return '/images/5.jpg';
            }
        }
    })
    .filter("sourceOrder", function(){
        return function(input){
            if(input == 0){
                return "未完成";
            }
            else if(input == 1){
                return "已发货";
            }
            else if(input == 2){
                return "已收货";
            }
            else if(input == 3){
                return "已取消";
            }
            else if(input ==4){
                return "已成功"
            }
        }
    })
    .filter("salerLevel", function(){
        return function(input){
            if(input == 0){
                return "个体";
            }
            else if(input == 1){
                return "经销商";
            }
        }
    })
    .filter("productState", function(){
        return function(input){
            if(input == 0){
                return "未上架";
            }
            else if(input == 1){
                return "已上架";
            }
            else{
                return "已下架";
            }
        }
    })
;




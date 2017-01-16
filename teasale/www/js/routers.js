/**
 * Created by kubenetes on 16/10/6.
 */
angular.module('tea.routers', [])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("login", {
            url: "/login",
	        cache: false,
	        controller: "loginCtrl",
            templateUrl: "pages/login.html"
        })
	    .state("register",{
		    url: "/register",
		    cache: false,
		    controller: "registerCtrl",
		    templateUrl: "pages/register.html"
	    })
		.state("tabs",{
			url: "/tabs",
			abstract: true,
			templateUrl: "pages/tabs.html",
			controller: function($scope, $ionicTabsDelegate, $ionicHistory){
				$scope.toLeftTab = function(){
					var index = $ionicTabsDelegate.selectedIndex();
					if(index == 0) {
						return;
					}
					else {
						$ionicHistory.nextViewOptions({
							disableBack: true
						});
						$ionicTabsDelegate.$getByHandle("baseTabs").select(index - 1);
						//console.log($ionicHistory.viewHistory());
					}
				}
				$scope.toRightTab = function(){
					var index = $ionicTabsDelegate.selectedIndex();
					if(index == 4) {
						return;
					}
					else {
						$ionicHistory.nextViewOptions({
							disableBack: true
						});
						$ionicTabsDelegate.$getByHandle("baseTabs").select(index + 1);
						//console.log($ionicHistory.viewHistory());
					}

				}
			}
		})
		.state("tabs.product",{
			url: "/product",
			cache: false,
			views: {
				'tabs-product': {
					templateUrl: 'pages/tabsProduct.html',
					controller: "tabsProductCtrl"
				}
			}
		})
	    .state("tabs.zhongchou",{
		    url: "/zhongchou",
		    cache: false,
		    views: {
			    'tabs-zhongchou': {
				    templateUrl: 'pages/tabsZhongchou.html',
				    controller: "tabsZhongchouCtrl"
			    }
		    }
	    })
	    .state("tabs.zhongbao",{
		    url: "/zhongbao",
		    cache: false,
		    views: {
			    'tabs-zhongbao': {
				    templateUrl: 'pages/tabsZhongbao.html',
				    controller: "tabsZhongbaoCtrl"
			    }
		    }
	    })
	    .state("tabs.order",{
		    url: "/order",
		    cache: false,
		    params: {'product': '-1'},
		    views: {
			    'tabs-order': {
				    templateUrl: 'pages/tabsOrder.html',
				    controller: "tabsOrderCtrl"
			    }
		    }
	    })
	    .state("tabs.profile",{
		    url: "/profile",
		    cache: false,
		    views: {
			    'tabs-profile': {
				    templateUrl: 'pages/tabsProfile.html',
				    controller: "tabsProfileCtrl"
			    }
		    }
	    })
	    .state("addProduct",{
		    url: "/addProduct",
		    cache: false,
		    templateUrl: "pages/addProduct.html",
		    controller: "addProductCtrl"
	    })
		.state("modifyProduct",{
			url: "/modifyProduct",
			cache: false,
			templateUrl: "pages/modifyProduct.html",
			controller: "modifyProductCtrl",
			params: {
				modifyProductInfo: null
			}
		});
	$urlRouterProvider.otherwise('/login');
})

angular.module('teasale').controller('PurchaseCtrl', function ($scope,$location,$http,coverAuth,$stateParams,$state) {
	$scope.$watch('currentUser', function () {
		if($scope.currentUser){	
	        var getProduct = {
	          method: 'GET',
	          url: '/api/statistics/newrecommend?customer_id='+$scope.currentUser.id
	        }; 
	        $http(getProduct).then(function (res) {
	        	console.log(res);
	        	if(res.data.data.content.length>4){
	        		$scope.teas = res.data.data.content.slice(0,4);	        		
	        	}
	        	else{
	        		if(res.data.data.content.length==0){
				        var getProduct2 = {
				          method: 'GET',
				          url: '/api/products/commend/rankBySalesVolume'
				        }; 
				        $http(getProduct2).then(function (res) {
				          $scope.teas=res.data.data.slice(0,4);
				        })
	        		}
		        	else{
		        		$scope.teas = res.data.data.content;
		        	}
	        	}

	        })

		}
		else{
	        sessionStorage['history'] = $location.path();
	        $state.go('login');			
		}
	})	
});


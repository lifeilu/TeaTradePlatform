angular.module('teasale').controller('HomeCtrl', function ($scope,$http,coverAuth,$stateParams) {
     
        var getProduct = {
          method: 'GET',
          url: '/api/products/commend/rankBySalesVolume'
        }; 

        var getFund={
          method: 'GET',
          url: '/api/crowdFunds/commend/rankBySalesVolume'
        }; 
        $http(getProduct).then(function (res) {
          if(res.data.code==500){
            $scope.products = [];
          }
          else{
            $scope.products=res.data.data.slice(0,4);            
          }

        })

        $http(getFund).then(function (res) {
          if(res.data.code==500){
            $scope.funds = [];
          }
          else{
            $scope.funds = res.data.data.slice(0,4);            
          }
        })
});
angular.module('teasale').controller('FundCtrl', function ($cacheFactory,$location,$scope,$http,coverAuth,$state) {
  $scope.logout=function(){
      delete localStorage['user'];
      $scope.currentUser = null;
  };
  $scope.login =function(){
    sessionStorage['history'] = $location.path();
    $state.go('login');
  }
  var getProductCategory={
          method: 'GET',
          url: '/api/productTypes/getAllProductType?state=1',
          
  }; 
  $http(getProductCategory).then(function (res) {
          $scope.productcategorys=res.data.data;
          console.log($scope.productcategorys);
  })
  $scope.user = $scope.currentUser;
  
  $scope.searchthebook = {thename: null};
  $scope.samepage=0;
  $scope.searchbook = function() {
    if($location.path()=='/fund/list/'){
      $scope.samepage+=1;
      $location.path('/fund/list/',reload=true).search({param: $scope.searchthebook.thename});
      $scope.searchthebook.thename = null;  
    }
    else{
      $location.path('/fund/list/',reload=true).search({param: $scope.searchthebook.thename});
      $scope.searchthebook.thename = null;  
    }  
  };

  
   
});

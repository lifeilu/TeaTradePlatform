angular.module('teasale').controller('UserSourceCtrl', function ($scope,$http,coverAuth,$stateParams,$modal,$location,$state) {
  $scope.$watch('samepage', function () {
    if ($location.search().param) {
        $scope.keyword = $location.search().param;
    }
    else{
      $scope.keyword = "";
    }
    $scope.nowPage = 1;
    getorder();
    function getorder(){
      $scope.sendpage = $scope.nowPage - 1;
      var readOrder = {
        method: 'GET',
        url: '/api/crowdSourcingOder/search?customerId='+$scope.currentUser.id+'&type=1&teaSalerName='+$scope.keyword+'&pageIndex='+$scope.sendpage
        +'&pageSize=8&sortOrder=DESC',     
      }; 

      $http(readOrder).then(function (res) {
        $scope.orders= res.data.data.content;
        console.log($scope.orders);
        $scope.totalPage = res.data.data.totalPages;
      });
    }
    $scope.confirm = function(order){
      var data = {
        orderId:order.id,
        isConfirm:"1"
      }
      console.log(order);
      var confirmorder = {
        method: 'PUT',
        url: '/api/crowdSourcingOder/update',
        data:data         
      }
      $http(confirmorder).then(function(res){
        console.log(res);
        alert("确认成功");
        $state.reload();
      })
 
    }
    $scope.prev = function()
    {
      $scope.nowPage--;
      getorder();
    };
    $scope.next = function()
    {
      $scope.nowPage++;
      getorder();
    };
    $scope.jump = function(){
      if($scope.page <= $scope.totalPage && $scope.page > 0){
        $scope.nowPage = $scope.page;   
        getorder();   
      }
    }
  });
});
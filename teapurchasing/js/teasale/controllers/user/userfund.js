angular.module('teasale').controller('UserFundCtrl', function ($scope,$http,coverAuth,$stateParams,$modal,$location,$state) {
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
        url: '/api/crowdFundOrders/search?customerId='+$scope.currentUser.id+'&type=1&teaSalerName='+$scope.keyword+'&pageIndex='+$scope.sendpage
        +'&pageSize=8&sortOrder=DESC',     
      }; 

      $http(readOrder).then(function (res) {
        $scope.orders= res.data.data.content;
        console.log($scope.orders);
        $scope.totalPage = res.data.data.totalPages;
      });
    }
    $scope.pay = function(order){
      var data = {
        id:order.id,
      }
      console.log(order);
      var confirmorder = {
        method: 'PUT',
        url: '/api/crowdFundOrder/payUnFinished',
        data:data         
      }
      $http(confirmorder).then(function(res){
        console.log(res);
        if(res.data.code==500){
          alert("余额不足")
        }
        else{
          alert("支付成功"); 
          $state.reload();         
        }
      })
    }
    $scope.confirm = function(order){
      var data = {
        orderId:order.id,
        isConfirm:"1"
      }
      console.log(order);
      var confirmorder = {
        method: 'PUT',
        url: '/api/crowdFundOrder/update',
        data:data         
      }
      $http(confirmorder).then(function(res){
        console.log(res);
        alert("确认成功");
        $state.reload();
      })
 
    }
    $scope.cancel = function(order){
      var data = {
        id:order.id,
      }  
      var cancelorder = {
        method: 'PUT',
        url: '/api/crowdFundOrder/cancel',
        data:data         
      }
      $http(cancelorder).then(function(res){
        console.log(res);
        alert("取消成功");
        $state.reload();
      })    
    }
    $scope.charge = function(order){
       var data = {
        id:order.id
      }    
      var chargeorder = {
        method: 'PUT',
        url: '/api/crowdFundOrder/payRemain',
        data:data            
      }
      $http(chargeorder).then(function(res){
        if(res.data.code==500){
          alert("余额不足")
        }
        else{
          alert("付款成功");
          $state.reload();          
        }

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
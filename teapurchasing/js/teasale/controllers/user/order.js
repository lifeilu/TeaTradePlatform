angular.module('teasale').controller('OrderCtrl', function ($scope,$http,coverAuth,$stateParams,$modal,$location,$state) {
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
        url: '/api/orders/orderItems/search?customerId='+$scope.currentUser.id+'&teaSalerName='+$scope.keyword+'&pageIndex='+$scope.sendpage
        +'&pageSize=5&sortOrder=DESC',     
      }; 

      $http(readOrder).then(function (res) {
        $scope.orders= res.data.data.list;
        $scope.totalPage = res.data.data.totalPage;
        console.log($scope.orders);
      });
    }
    $scope.comment = function(tea){
      console.log($scope.currentUser);
      $modal.open({
        animation:true,
        size:'lg',
        templateUrl: 'partials/user/comment.html',
        controller: 'CommentCtrl',
        resolve: {
          product: function () {
            return tea.id;
          },
          user:function(){
            return $scope.currentUser.id;
          }
        },
      });
    }
    $scope.pay = function(order){
      var data = {
        id:order.orderEn.id,
      }  
      var cancelorder = {
        method: 'PUT',
        url: '/api/order/payUnFinished',
        data:data         
      }
      $http(cancelorder).then(function(res){
        if(res.data.code==500){
          alert("余额不足");
        }
        else{
          alert("支付成功");
          $state.reload();          
        }
      })    
    }
    $scope.cancel = function(order){
      var data = {
        id:order.orderEn.id,
      }  
      var cancelorder = {
        method: 'PUT',
        url: '/api/order/cancel',
        data:data         
      }
      $http(cancelorder).then(function(res){
        console.log(res);
        alert("取消成功");
        $state.reload();
      })    
    }
    $scope.confirm = function(order){
      var data = {
        orderId:order.orderEn.id,
        isConfirm:"1"
      }
      console.log(order);
      var confirmorder = {
        method: 'PUT',
        url: '/api/order/update',
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
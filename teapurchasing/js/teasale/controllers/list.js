angular.module('teasale').controller('ListCtrl', function ($location,$scope,$http,coverAuth,$stateParams) {
    $scope.$watch('samepage', function () {
      if ($location.search().param) {
          $scope.keyword = $location.search().param;
      }
      else{
        $scope.keyword = "";
      }
      $scope.nowPage = 1;
      $scope.highPrice = -1;
      $scope.lowPrice = -1;
      $scope.discount = -1;
      $scope.level = -1;
      getproduct();
      var documentprice = document.getElementById("price1");
      var documentlevel = document.getElementById("level1");
      var documentdiscount = document.getElementById("discount1");
      $scope.price = function(id){
          var value = "price"+id.toString();
          documentprice.className = "";
          documentprice = document.getElementById(value);
          documentprice.className="current";
          if(id==1){
            $scope.highPrice = -1;
            $scope.lowPrice = -1;
          }
          else{
            if(id==2){
              $scope.highPrice = 20;
              $scope.lowPrice = 0;
            }
            else{
              if(id==3){
                $scope.highPrice = 50;
                $scope.lowPrice = 20;
              }
              else{
                if(id==4){
                  $scope.highPrice = 100;
                  $scope.lowPrice = 50;
                }
                else{
                  if(id==5){
                    $scope.highPrice = 200;
                    $scope.lowPrice = 100;
                  }
                  else{
                    $scope.highPrice = -1;
                    $scope.lowPrice = 200;
                  }
                }
              }
            }
          }
          $scope.nowPage = 1;
          getproduct();
      };
      $scope.clevel = function(id){
          var value = "level"+id.toString();
          documentlevel.className = "";
          documentlevel = document.getElementById(value);
          documentlevel.className="current";
          if(id==1){
            $scope.level = -1;
          }
          else{
            $scope.level = id - 1;
          }
          $scope.nowPage = 1;
          getproduct();
      };
      $scope.cdiscount = function(id){
          var value = "discount"+id.toString();
          documentdiscount.className = "";
          documentdiscount = document.getElementById(value);
          documentdiscount.className="current";
          if(id==1){
            $scope.discount = -1;
          }
          else{
            if(id==2){
              $scope.discount = 0.9;
            }
            else{
              if(id==3){
                $scope.discount = 0.7;
              }
              else{
                $scope.discount = 0.5;
              }
            }
          }
          $scope.nowPage = 1;
          getproduct();
      };
      $scope.prev = function()
      {
        $scope.nowPage--;
        getproduct();
      };
      $scope.next = function()
      {
        $scope.nowPage++;
        getproduct();
      };
      $scope.jump = function(){
        if($scope.page <= $scope.totalPage && $scope.page > 0){
          $scope.nowPage = $scope.page;   
          getproduct();   
        }
      }
      function getproduct (){
        $scope.pageindex = $scope.nowPage - 1;
        var requesturl = '/api/products/search?productType_id='+$stateParams.producttype+'&pageSize=16'+'&pageIndex='+$scope.pageindex+'&state=1';
        var readTea = {
          method: 'GET',
          url: requesturl+'&highPrice='+$scope.highPrice+'&lowPrice='+$scope.lowPrice+'&discount='+$scope.discount+'&level='+$scope.level+'&name='+$scope.keyword
        };
        $http(readTea).then(function (res) {
          //console.log(res);
          $scope.teas = res.data.data.content;
          $scope.totalPage = res.data.data.totalPages;
        });      
      }
    });
});
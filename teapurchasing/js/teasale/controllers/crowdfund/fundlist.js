angular.module('teasale').controller('FundListCtrl', function ($location,$scope,$http,coverAuth,$stateParams) {
    $scope.$watch('samepage', function () {
      if ($location.search().param) {
          $scope.keyword = $location.search().param;
      }
      else{
        $scope.keyword = "";
      }
      $scope.nowPage = 1;
      $scope.category = -1;
      $scope.highPrice = -1;
      $scope.lowPrice = -1;
      $scope.lowRemainderNum = -1;
      $scope.highRemainderNum = -1;
      $scope.level = -1;
      getproduct();
      var documentcategory = document.getElementById("category0");
      var documentprice = document.getElementById("price1");
      var documentlevel = document.getElementById("level1");
      var documentremainder = document.getElementById("remainder1");
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
      $scope.ccategory = function(id){
          var value = "category"+id.toString();
          documentcategory.className = "";
          documentcategory = document.getElementById(value);
          documentcategory.className="current";
          $scope.category = id - 1;
          $scope.nowPage = 1;
          getproduct();
      };
      $scope.cremainder = function(id){
          var value = "remainder"+id.toString();
          documentremainder.className = "";
          documentremainder = document.getElementById(value);
          documentremainder.className="current";
          if(id==1){
            $scope.highRemainderNum = -1;
            $scope.lowRemainderNum = -1;
          }
          else{
            if(id==2){
              $scope.highRemainderNum = 20;
              $scope.lowRemainderNum = 0;
            }
            else{
              if(id==3){
                $scope.highRemainderNum = 50;
                $scope.lowRemainderNum = 20;
              }
              else{
                if(id==4){
                  $scope.highRemainderNum = 100;
                  $scope.lowRemainderNum = 50;
                }
                else{
                  $scope.highRemainderNum = -1;
                  $scope.lowRemainderNum = 100;
                }
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
        var requesturl = '/api/crowdFund/search?productType_id='+$stateParams.producttype+'&pageSize=16'+'&pageIndex='+$scope.pageindex+'&name='+$scope.keyword+'&type='+$scope.category+'&state=0';
        var readTea = {
          method: 'GET',
          url: requesturl+'&highUnitMoney='+$scope.highPrice+'&lowUnitMoney='+$scope.lowPrice+'&highRemainderNum='+$scope.highRemainderNum+'&lowRemainderNum='+$scope.lowRemainderNum
        };
        $http(readTea).then(function (res) {
          console.log(res);
          $scope.teas = res.data.data.content;
          $scope.totalPage = res.data.data.totalPages;
        });      
      }
    });
});
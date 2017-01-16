angular.module('teasale').filter('trustHtml', function ($sce) {
              return function (input) {
 
                return $sce.trustAsHtml(input);
                }
              }).controller('FundDetailCtrl', function ($scope,$http, $stateParams,$sce,$location,$state) { 
  $scope.teanum = 1; 
  $scope.myInterval = 5000;
  $scope.slides = [];
  $scope.addnum = function() {
    if($scope.teanum<$scope.tea.remainderNum)
      $scope.teanum += 1;
    else{
      alert("众筹数量不得大于剩余数量");
    }
  }
  $scope.decnum = function() {
    if ($scope.teanum > 1) {
      $scope.teanum -= 1;
    }
  } 
  var getTea={
    method: 'GET',
    url: '/api/crowdFund/searchById?id='+$stateParams.tea,
  }; 
  $http(getTea).then(function (res) {
    console.log(res);
    $scope.tea=res.data.data;
    console.log($scope.tea);
    $scope.remark = $sce.trustAsHtml($scope.tea.product.remark);
    $scope.tea.score = 80;
    $scope.htmlStr = '<i style="width:'+$scope.tea.score+'%"></i>';
    var getslide = {
      method:'GET',
      url:'/api/image/getImageByProduct?product_id='+$scope.tea.product.id
    };
    $scope.slidearray = [];
    $http(getslide).then(function (res2) {
      $scope.slidearray = res2.data.data;
      if($scope.slidearray.length==0){
        var slide = {url:$scope.tea.product.url};
        $scope.slides.push(slide);
      }
      else{
        $scope.slidearray.forEach(function(slide){
          var JSONslide = {url:slide.url};
          $scope.slides.push(JSONslide);
        });
      }
    });
  });
  $scope.fundadd = function(){
    if($scope.tea.remainderNum==0){
      alert("众筹产品已售完");
    }
    else{
      if($scope.tea.state!=0){
        alert("众筹已结束");
      }
      else{
        if ($scope.currentUser==null) {
            sessionStorage['history'] = $location.path();
            $state.go('login');
        }
        else{
          if($scope.teanum>$scope.tea.remainderNum){
            $scope.teanum = $scope.tea.remainderNum;
            alert("众筹数量不得大于剩余数量");
          }
          else{
            $scope.tea.num = $scope.teanum;
            localStorage['fund'] = JSON.stringify($scope.tea);
            $state.go("fund.enroll");          
          }

        }      
      }      
    }
  };
  $scope.levelEnum={
    1:'一般',
    2:'中等',
    3:'上等'
  };

});
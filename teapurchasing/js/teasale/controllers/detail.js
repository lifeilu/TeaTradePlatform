angular.module('teasale').filter('trustHtml', function ($sce) {
              return function (input) {
 
                return $sce.trustAsHtml(input);
                }
              }).controller('DetailCtrl', function ($scope,$http, $stateParams,$sce,$location,$state) {  
  $scope.myInterval = 5000;
  $scope.slides = [];
  $scope.nowPage = 1;
  $scope.addnum = function() {
    $scope.teanum += 1;
  }
  $scope.decnum = function() {
    if ($scope.teanum > $scope.tea.startNum) {
      $scope.teanum -= 1;
    }
    else{
      alert("购买数量不应低于最低数量");
    }
  } 
  function getcomment(){
    $scope.sendpage = $scope.nowPage-1;
    var getCom = {
      method:'GET',
      url:'/api/comment/search?product_id='+$stateParams.tea+"&pageSize=10&pageIndex="+ $scope.sendpage
    };
    $http(getCom).then(function(res){
      $scope.comments = res.data.data.content;
      $scope.totalPage = res.data.data.totalPages;
    });
  }
  var getTea={
    method: 'GET',
    url: '/api/products/getById?id='+$stateParams.tea,
  }; 
  $http(getTea).then(function (res) {
    $scope.tea=res.data.data;
    $scope.teanum = $scope.tea.startNum;
    console.log($scope.tea);
    $scope.remark = $sce.trustAsHtml($scope.tea.remark);
    var getComment={
      method: 'GET',
      url: '/api/products/comment/getById?id='+$stateParams.tea,
    }; 
    $http(getComment).then(function(res){
      $scope.tea.score = res.data.data.averageScore;
      $scope.tea.commentNum = res.data.data.numOfComment;
      $scope.htmlStr = '<i style="width:'+$scope.tea.score+'%"></i>';
      var getslide = {
        method:'GET',
        url:'/api/image/getImageByProduct?product_id='+$stateParams.tea
      };
      console.log($stateParams.tea);
      $scope.slidearray = [];
      $http(getslide).then(function (res2) {
        $scope.slidearray = res2.data.data;
        if($scope.slidearray.length==0){
          var slide = {url:$scope.tea.url};
          $scope.slides.push(slide);
        }
        else{
          $scope.slidearray.forEach(function(slide){
            var JSONslide = {url:slide.url};
            $scope.slides.push(JSONslide);
          });
        }
      });
      getcomment();
    })

  });
  //$scope.comments = [{content:"很好的产品",customer:{nickname:"李桐宇"}}];
  $scope.levelEnum={
    1:'一般',
    2:'中等',
    3:'上等'
  };
  $scope.cartadd = function(){
    if ($scope.currentUser==null) {
        sessionStorage['history'] = $location.path();
        $state.go('login');
    }
    else{
      if($scope.tea.state==2||$scope.tea.type!=0){
        alert("该产品无法购买");
      }
      else{
        if($scope.teanum<$scope.tea.startNum){
          $scope.teanum = $scope.tea.startNum;
          alert("购买数量不应低于最低数量");
        }
        else{
          var reqAdd = {
            method:'POST',
            url:'/api/cart/addToCart?product_id='+$scope.tea.id+'&num='+$scope.teanum+'&price='+$scope.tea.price+'&customer_id='+$scope.currentUser.id
          };
          $http(reqAdd).then(function (res) {
              console.log(res);
              console.log($scope.currentUser);
              alert("添加成功");
          });        
        }        
      }
    }
  };
  $scope.immebuy = function(){
    if ($scope.currentUser==null) {
        sessionStorage['history'] = $location.path();
        $state.go('login');
    }
    else{
      if($scope.tea.state==2||$scope.tea.type!=0){
        alert("该产品无法购买");
      }
      else{
        if($scope.teanum<$scope.tea.startNum){
          $scope.teanum = $scope.tea.startNum;
          alert("购买数量不应低于最低数量");
        }
        else{
          $scope.tea.num = $scope.teanum;
          localStorage['tea'] = JSON.stringify($scope.tea);
          $state.go("main.immebuy");        
        }        
      }

    }
  };
  $scope.prev = function()
  {
    $scope.nowPage--;
    getcomment();
  };
  $scope.next = function()
  {
    $scope.nowPage++;
    getcomment();
  };
  $scope.jump = function(){
    if($scope.page <= $scope.totalPage && $scope.page > 0){
      $scope.nowPage = $scope.page;   
      getproduct();   
    }
  }
});
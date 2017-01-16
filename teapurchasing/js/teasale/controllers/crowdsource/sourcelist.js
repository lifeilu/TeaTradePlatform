angular.module('teasale').controller('SourceListCtrl', function ($scope,$http,coverAuth,$stateParams,$modal,$location,$state) {
      $scope.keyword = "";
      $scope.searchthebook = {thename: null};
      $scope.searchbook = function() {
        $location.path('/sourcelist/',reload=true).search({param: $scope.searchthebook.thename});
        $scope.keyword = $location.search().param; 
        getsource();
      };  
      $scope.nowPage = 1;
      if ($scope.currentUser==null) {
        sessionStorage['history'] = $location.path();
        $state.go('login');
      }
      $scope.logout=function(){
          delete localStorage['user'];
          $scope.currentUser = null;
      };
      $scope.login =function(){
        sessionStorage['history'] = $location.path();
        $state.go('login');
      }
      $scope.cancel = function(source){ 
        var cancelorder = {
          method: 'DELETE',
          url: '/api/crowdSourcing/delete?id='+source.id,
        }
        $http(cancelorder).then(function(res){
          console.log(res);
          alert("取消成功");
          $state.reload();
        })  
      }
      $scope.confirm = function(source){ 
        var cancelorder = {
          method: 'PUT',
          url: '/api/crowdSourcing/confirm?id='+source.id,
        }
        $http(cancelorder).then(function(res){
          console.log(res);
          if(res.data.code==500){
            alert("众包已结束");
          }
          else{
            alert("众包结束成功");
            $state.reload();            
          }
        })  
      }
      getsource();
      function getsource(){
        $scope.sendpage = $scope.nowPage - 1;
        var readOrder = {
          method: 'GET',
          url: '/api/crowdSourcing/search?customer_id='+$scope.currentUser.id+'&productName='+$scope.keyword+'&pageIndex='+$scope.sendpage
          +'&pageSize=5&sortOrder=DESC',     
        }; 

        $http(readOrder).then(function (res) {
          console.log(res);
          $scope.sources= res.data.data.content;
          $scope.totalPage = res.data.data.totalPages;
          console.log($scope.sources);
          $scope.sources.forEach(function(source){
            source.proval = source.remainderNum.toString()+"/"+source.totalNum.toString();
            source.progress = (source.remainderNum/source.totalNum*100).toString()+"%";
          })
        });
      }
      $scope.prev = function()
      {
        $scope.nowPage--;
        getsource();
      };
      $scope.next = function()
      {
        $scope.nowPage++;
        getsource();
      };
      $scope.jump = function(){
        if($scope.page <= $scope.totalPage && $scope.page > 0){
          $scope.nowPage = $scope.page;   
          getsource(); 
        }
      }  
      $scope.stateEnum={
        0:'进行中',
        1:'结算中',
        2:'退款中',
        3:'发货中',
        4:'已完成',
        5:'未成功'
      };
});
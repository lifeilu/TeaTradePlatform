angular.module('teasale').controller('SourceModifyCtrl', function ($scope,$http,coverAuth,$stateParams,$state) {
  Date.prototype.format = function(format){
    var o = {
      "M+" : this.getMonth()+1, //month
      "d+" : this.getDate(),    //day
      "h+" : this.getHours(),   //hour
      "m+" : this.getMinutes(), //minute
      "s+" : this.getSeconds(), //second
      "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
      "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
    (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,
    RegExp.$1.length==1 ? o[k] :
    ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
  }
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
  //$scope.user = $scope.currentUser;
  /*datapicker*/
  $scope.today = new Date();
  $scope.tomorrow = new Date();
  $scope.tomorrow.setDate($scope.tomorrow.getDate() + 1);
  $scope.minDate = $scope.tomorrow;
  $scope.minDate2 = $scope.tomorrow;
  $scope.clear = function () {
    $scope.dt = null;
  };

  $scope.opensend = function($event,options) {
    if($scope.dealDate!=null){
      console.log($scope.dealDate);
      $scope.minDate2 = $scope.dealDate.time;
      console.log($scope.minDate2);
    }
    $event.preventDefault();
    $event.stopPropagation();
    options.opened = true;
  };

  $scope.openfinish = function($event,options) {
    $event.preventDefault();
    $event.stopPropagation();
    options.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy-MM-dd hh:mm:ss', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[1];
  $scope.$dismiss = function () {
    $modalInstance.dismiss('cancel');
  };
  var getSource={
    method: 'GET',
    url: '/api/crowdSourcing/getById?id='+$stateParams.data,
  }; 
  $http(getSource).then(function (res) {
    $scope.source=res.data.data;
    $scope.dealDate = {time:$scope.source.dealDate};
    $scope.deliverDate = {time:$scope.source.deliverDate};
  });
  function isnum(obj){
    if(obj == null||obj <0){
      return false;
    }
    return true;
  }
  $scope.confirm = function(){
    var flag1 = 0;
    var flag2 = 0;
    if($scope.dealDate.time==null||$scope.deliverDate.time==null||!isnum($scope.source.earnest)||!isnum($scope.source.unitNum)||!isnum($scope.source.unitMoney)||!isnum($scope.source.totalNum)){
      alert("请输入正确的众包信息");
    }
    else{
      //console.log($scope.dealDate);
      //console.log($scope.deliverDate);
      if($scope.dealDate.time!=$scope.source.dealDate){
        $scope.source.dealDate = $scope.dealDate.time.format('yyyy-MM-dd hh:mm:ss');
        flag1 = 1;
      }
      else{
        $scope.source.dealDate +=" 12:00:00";
        flag1 = 0;
      }
      if($scope.deliverDate.time!=$scope.source.deliverDate){
        $scope.source.deliverDate = $scope.deliverDate.time.format('yyyy-MM-dd hh:mm:ss');
        flag2 = 1;
      }
      else{
        $scope.source.deliverDate +=" 12:00:00";
        flag2 = 0;
      }
      $scope.source.createDate +=" 12:00:00";
      if($scope.source.dealDate>=$scope.source.deliverDate){
        alert("众包结束时间必须早于发货时间");
        if(flag1 == 0){
          $scope.source.dealDate = $scope.dealDate.time;
        }
        if(flag2 == 0){
          $scope.source.deliverDate = $scope.deliverDate.time;
        }
      }
      else{
        var data = {
          earnest:$scope.source.earnest,
          unitNum:$scope.source.unitNum,
          unitMoney:$scope.source.unitMoney,
          createDate:$scope.source.createDate,
          dealDate:$scope.source.dealDate,
          deliverDate:$scope.source.deliverDate,
          totalNum:$scope.source.totalNum      
        }
        var modifysource = {
          method: 'PUT',
          url: '/api/crowdSourcing/update?id='+$stateParams.data,
          data:data        
        }
        $http(modifysource).then(function(res){
          console.log(res);
          alert("修改成功");
          $state.go("sourcelist");
        })        
      }
       
    } 
  };
});
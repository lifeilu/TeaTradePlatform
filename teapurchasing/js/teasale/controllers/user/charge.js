angular.module('teasale')
.controller('ChargeCtrl',
function ($scope, $http, $state, $modalInstance, user,$timeout,coverAuth) {
  $scope.user = user;
  $scope.submit = function () {
  		if(!ismoney($scope.money)){
  			alert("金额输入错误");
  		}
  		else{
	        var reqAdd = {
	            method: 'GET',
	            url: '/api/account/recharge?money='+$scope.money+'&accountId='+$scope.user.account.id
	        };
	        $http(reqAdd).then(function (res) {
	            $scope.user.account.money= Number($scope.user.account.money) + Number($scope.money);
	            //console.log($scope.currentUser);
	            coverAuth.setCurrentUser($scope.user);
	            localStorage['user'] = JSON.stringify($scope.user);
	            $modalInstance.dismiss('cancel');
	            location.reload();
              alert('充值成功');
	        })
	    }
  };
  function ismoney(obj){
    var reg=/^[0-9]{1,20}$/;
    if(obj == null||!obj.match(reg)||obj <= 0){
      return false;
    }
    return true;
  }
});

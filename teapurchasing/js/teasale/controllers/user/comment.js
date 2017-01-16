angular.module('teasale')
.controller('CommentCtrl',
function ($scope, $http, $state, $modalInstance, product,$timeout,coverAuth,user) {
  $scope.product = product;
  $scope.user = user;
  $scope.submit = function () {
  		if($scope.rate==null||$scope.content==null){
  			alert("请输入评分及评论");
  		}
  		else{
  			var data = {
  				"orderItem_id":$scope.product,
			    "customer_id":$scope.user,
			    "content":$scope.content,
			    "score":$scope.rate * 20
  			}
  			console.log(data);
	        var reqAdd = {
	            method: 'POST',
	            url: '/api/comment/new',
	            data:data
	        };
	        $http(reqAdd).then(function (res) {
	        	alert('评论成功');
	            $modalInstance.dismiss('cancel');
	            location.reload();
	        })
	    }
  };
});

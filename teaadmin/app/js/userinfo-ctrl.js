/**
 * Created by lulifei on 16/12/23.
 */
angular.module("myApp")
    .controller('UserInfoCtrl', function ($scope,$rootScope,$location,$http,Upload,baseUrl) {
        // $scope.currentUser = $rootScope.currentUser;
        var currentUser = localStorage['user'];
        if(currentUser == null) {
            $location.path('/');
        }

        $scope.logout = function(){
            var r = confirm("确认退出？");
            if (r == true) {
                delete localStorage['user'];
                $location.path('/');
            }
            else{
                console.log('取消退出');
            }
        }


        $scope.currentUser = JSON.parse(currentUser);
        console.log($scope.currentUser);

        //上传头像
        $scope.addMyImg = function() {
            console.log("log file" + $scope.myImg);
            // var myParams = 'name='+$scope.product.name+'&descript='+ $scope.product.descript;

            if ($scope.myImg == null) {
                alert('未选定照片!');

            }
            else {
                Upload.upload({
                    url: baseUrl + '/api/image/head/upload?accountId=' + $scope.currentUser.account.id,
                    data: {
                        "picture": $scope.myImg
                    }
                }).success(function (data) {
                    //待做更新账户（接口尚无），返回新的头像
                    alert('上传成功!');

                    var reqAdd = {
                        method: 'GET',
                        url: baseUrl + '/api/manager/' + $scope.currentUser.id
                    };
                    $http(reqAdd)
                        .success(function (data, config, status) {
                            if (data.data) {
                                $scope.currentUser = data.data;
                                localStorage['user'] = JSON.stringify($scope.currentUser);
                                console.log($scope.currentUser);
                            }
                            else {
                                // alert('网络错误，请重试');
                                console.log(data.data);
                            }
                        }).error(function (data) {
                        // alert('网络错误，请重试');
                        console.log(data.data);
                    });

                    // location.reload();
                }).error(function (data) {
                    alert('上传失败!');
                })
            }
        };

        $scope.update = function() {
            if( $scope.modify.password1 == null || $scope.modify.password2 == null){
                alert('输入密码为空!');
            }
            else if( $scope.modify.password1 != $scope.modify.password2){
                alert('两次输入的密码不一致');
            }
            else{
                var data = {
                    "name": $scope.currentUser.name,
                    "password": $scope.modify.password1,
                    "tel": $scope.currentUser.account.tel
                };
                console.log(data);
                var reqAdd = {
                    method: 'PUT',
                    url: baseUrl + '/api/manager/update',
                    header: 'Content-Type:application/json',
                    data: data
                };
                //console.log(reqAdd);
                $http(reqAdd)
                    .success(function (data, header, config, status) {
                        if (data.data) {
                            alert('修改成功!');
                            // $location.path('/home');
                        }
                        else {
                            alert('网络错误，请重试');
                        }
                    }).error(function (data) {
                        console.log(data);
                        alert('网络错误，请重试');
                });
            }
        };
    });
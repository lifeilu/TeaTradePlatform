angular.module('teasale')
    .controller('UserInfoCtrl',
        function (coverAuth,$scope, $http, $state, $timeout,$modal) {
            if ($scope.currentUser) {
                var getUser = {
                    method: 'GET',
                    url: '/api/customer/'+$scope.currentUser.id                       
                }
                $http(getUser).then(function(res){
                    $scope.currentUser = res.data.data;
                    $scope.user = {
                        nickname: $scope.currentUser.nickname,
                        tel: $scope.currentUser.tel,
                        zip: $scope.currentUser.zip,
                        address: $scope.currentUser.address,
                        money:$scope.currentUser.account.money.toFixed(2)
                    };
                    var address = $scope.currentUser.address;
                    var addstrs = address.split(" ");
                    if(addstrs.length!=0){
                        if(addstrs.length==1){
                            $scope.p = addstrs[0];
                        }
                        else{
                            if(addstrs.length==2){
                                $scope.p = addstrs[0];
                                $scope.c = addstrs[1];
                            }
                            else{
                                if(addstrs.length==3){
                                    $scope.p = addstrs[0];
                                    $scope.c = addstrs[1];
                                    $scope.a = addstrs[2];
                                }
                                else{
                                    $scope.p = addstrs[0];
                                    $scope.c = addstrs[1];
                                    $scope.a = addstrs[2];
                                    $scope.d = addstrs[3];                                    
                                }
                            }
                        }
                    }
                });
            }
            function iszip(obj){
                var reg= /^[1-9][0-9]{5}$/;
                  // if(!reg.test(obj.value)){
                  //   return false;
                  // }
                if(obj == null || obj.length!=6 || !obj.match(reg)){
                    return false;
                }
                return true;
            }
            $scope.submit = function () {
                    var data = {
                        "nickname": $scope.user.nickname,
                        "zip": $scope.user.zip,
                        "address": $scope.user.address,
                        "tel":$scope.user.tel,
                    };
                    if($scope.user.zip.length==0||$scope.user.address.length==0||$scope.user.nickname.length==0){
                        alert("请输入所有信息");
                    }
                    else{
                        if(!iszip($scope.user.zip)){
                            alert("邮编格式错误");
                        }
                        else{
                            var reqAdd = {
                                method: 'PUT',
                                url: '/api/customer/update',
                                data: data
                            };
                            $http(reqAdd).then(function (res) {
                                alert('修改成功');
                                $scope.currentUser=res.data.data;
                                console.log($scope.currentUser);
                                coverAuth.setCurrentUser($scope.currentUser);
                                localStorage['user'] = JSON.stringify($scope.currentUser);
                                location.reload();
                            })                            
                        }
                    }

            };
            $scope.giveup = function () {
                $scope.user = {
                    nickname: $scope.currentUser.nickname,
                    zip: $scope.currentUser.zip,
                    tel: $scope.currentUser.tel,
                    address: $scope.currentUser.address,
                    money:$scope.currentUser.account.money.toFixed(2)
                }
                var address = $scope.currentUser.address;
                var addstrs = address.split(" ");
                if(addstrs.length!=0){
                    if(addstrs.length==1){
                        $scope.p = addstrs[0];
                    }
                    else{
                        if(addstrs.length==2){
                            $scope.p = addstrs[0];
                            $scope.c = addstrs[1];
                        }
                        else{
                            if(addstrs.length==3){
                                $scope.p = addstrs[0];
                                $scope.c = addstrs[1];
                                $scope.a = addstrs[2];
                            }
                            else{
                                $scope.p = addstrs[0];
                                $scope.c = addstrs[1];
                                $scope.a = addstrs[2];
                                $scope.d = addstrs[3];                                    
                            }
                        }
                    }
                }
            };
            $scope.charge = function($event){
                    $event.stopPropagation();
                    $modal.open({
                      animation:true,
                      size:'lg',
                      templateUrl: 'partials/user/charge.html',
                      controller: 'ChargeCtrl',
                      resolve: {
                        user: function () {
                          return $scope.currentUser;
                        },

                      },
                    });
            };
            $scope.changepass = function($event){
                    $event.stopPropagation();
                    $modal.open({
                      animation:true,
                      size:'lg',
                      templateUrl: 'partials/user/changepassword.html',
                      controller: 'PassChangeCtrl',
                      resolve: {
                        user: function () {
                          return $scope.currentUser;
                        },

                      },
                    });
            };
        });

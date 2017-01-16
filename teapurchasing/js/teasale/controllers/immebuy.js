angular.module('teasale').controller('ImmeBuyCtrl', function ($scope,$http,coverAuth,$stateParams,$state,$location) {
    if(!localStorage['tea']){
      $state.go('main.list');       
    }
    else{
      $scope.tea = JSON.parse(localStorage['tea']);       
      $scope.allval = $scope.tea.num * $scope.tea.price * $scope.tea.discount;
      $scope.freight = $scope.tea.postage;
      if($scope.currentUser){
        $scope.user = {
          address:$scope.currentUser.address,
          zip:$scope.currentUser.zip,
          tel:$scope.currentUser.tel,
          nickname:$scope.currentUser.nickname
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
      }
      else{
        sessionStorage['history'] = $location.path();
        $state.go('login');
      }
      $scope.$watch('tea', function () {
        $scope.allval = $scope.tea.num * $scope.tea.price * ($scope.tea.discount*100)/100;
        $scope.freight = $scope.tea.postage; 
      },true);
      function iszip(obj){
        var reg= /^[1-9][0-9]{5}$/;
          if(obj == null || obj.length!=6 || !obj.match(reg)){
            return false;
          }
          return true;
      }
      function isphone(obj){
        var reg=/^1[0-9]{10}/;
        if(obj == null || obj.length!=11 || !obj.match(reg)){
          return false;
        }
        return true;
      }
      $scope.addnum = function(){
        $scope.tea.num++;
      };
      $scope.decnum = function(){
        if($scope.tea.num > $scope.tea.startNum){
          $scope.tea.num--;
        }
        else{
          alert("购买数量不应低于最低数量");      
        }
      };
      $scope.submit = function(){
          var data=
          [{
          "teaSalerId":$scope.tea.teaSaler.id,
          "customerId":$scope.currentUser.id,
          "name":$scope.user.nickname,
          "address":$scope.user.address,
          "zip":$scope.user.zip,
          "tel":$scope.user.tel,
          "type":0,
          "createOrderItemModels":[
            {
              productId:$scope.tea.id,
              num:$scope.tea.num
            }
          ]
          }];
          if($scope.tea.num<$scope.tea.startNum){
            $scope.tea.num = $scope.tea.startNum;
            alert("购买数量不应低于最低数量");
          }
          else{
            if($scope.user.zip.length==0||$scope.user.address.length==0||$scope.user.nickname.length==0||$scope.user.tel.length==0){
                alert("请输入所有信息");
            }
            else{
              if(!iszip($scope.user.zip)){
                alert("邮编格式错误");
              }
              else{
                if(!isphone($scope.user.tel)){
                  alert("电话格式错误");
                }
                else{
                  var reqAdd = {
                    method: 'POST',
                    url: '/api/orders/add',
                    data: JSON.stringify(data)
                  };
                  $http(reqAdd).then(function(res){
                    if(res.data.code==200){
                      alert("购买成功");
                      console.log(res);
                      $state.go('main.purchase');            
                    }
                    else{
                      alert(res.data.data.msg);
                    }
                  });   
                }
              }
            }       
          }

      };
    }
});